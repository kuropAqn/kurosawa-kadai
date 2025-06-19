// src/pages/EventCreatePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EventCreatePage() {
  const navigate = useNavigate();

  // フォームの入力値
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    capacity: '',
  });

  // バリデーションエラー
  const [errors, setErrors] = useState({});

  // input, textarea の onChange ハンドラ
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // バリデーション関数
  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'タイトルは必須です';
    else if (form.title.length > 50) errs.title = 'タイトルは50文字以内で入力してください';

    if (!form.date) errs.date = '開催日は必須です';

    if (!form.location.trim()) errs.location = '場所は必須です';
    else if (form.location.length > 100) errs.location = '場所は100文字以内で入力してください';

    if (!form.description.trim()) errs.description = '説明は必須です';
    else if (form.description.length > 500) errs.description = '説明は500文字以内で入力してください';

    if (!form.capacity) errs.capacity = '定員は必須です';
    else if (isNaN(form.capacity) || Number(form.capacity) <= 0)
      errs.capacity = '正しい人数を入力してください';

    return errs;
  };

  // フォーム送信処理
  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // API に POST
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          date: form.date,
          location: form.location,
          description: form.description,
          capacity: Number(form.capacity),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // 作成成功なら一覧へリダイレクト
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('イベントの作成に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <div className="event-create-page">
      <h2>イベント作成</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* タイトル */}
        <label>
          タイトル<span style={{ color: 'red' }}>※</span>:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            maxLength={50}
          />
        </label>
        {errors.title && <p className="error">{errors.title}</p>}

        {/* 開催日 */}
        <label>
          開催日<span style={{ color: 'red' }}>※</span>:
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>
        {errors.date && <p className="error">{errors.date}</p>}

        {/* 場所 */}
        <label>
          場所<span style={{ color: 'red' }}>※</span>:
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            maxLength={100}
          />
        </label>
        {errors.location && <p className="error">{errors.location}</p>}

        {/* 説明 */}
        <label>
          説明<span style={{ color: 'red' }}>※</span>:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={500}
            rows={5}
          />
        </label>
        {errors.description && <p className="error">{errors.description}</p>}

        {/* 定員 */}
        <label>
          定員<span style={{ color: 'red' }}>※</span>:
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            min={1}
          />
        </label>
        {errors.capacity && <p className="error">{errors.capacity}</p>}

        <button type="submit">作成する</button>
      </form>
    </div>
  );
}
