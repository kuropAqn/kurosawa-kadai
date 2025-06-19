// src/pages/EventListPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';

const dummyEvents = [
  { id: 1, title: '夏祭り',        date: '2025-08-01', location: '中央広場', category: 'festival',     description: '楽しいお祭り', capacity: 100 },
  { id: 2, title: '音楽ワークショップ', date: '2025-08-10', location: 'コミュニティセンター', category: 'workshop',    description: 'ギター体験', capacity: 30 },
  { id: 3, title: '自治会ミーティング', date: '2025-07-20', location: '集会所',           category: 'meeting',     description: '地域課題共有', capacity: 50 },
  { id: 4, title: 'ビーチクリーン',    date: '2025-08-05', location: '海岸',             category: 'volunteer',   description: '清掃活動', capacity: 40 },
];

const categories = [
  { value: '', label: 'すべて' },
  { value: 'festival',  label: '祭り'         },
  { value: 'workshop',  label: 'ワークショップ' },
  { value: 'meeting',   label: 'ミーティング'  },
  { value: 'volunteer', label: 'ボランティア'  },
];

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  // フィルタ条件
  const [keyword, setKeyword] = useState('');
  const [date,    setDate]    = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    // 実運用時は fetch('/api/events') で取得
    setEvents(dummyEvents);
  }, []);

  // 絞り込まれたリスト
  const filtered = events.filter(ev => {
    // キーワード: タイトル or 説明に部分一致（大文字小文字は区別しない）
    const key = keyword.trim().toLowerCase();
    if (key && !(
      ev.title.toLowerCase().includes(key) ||
      ev.description.toLowerCase().includes(key)
    )) return false;

    // 日付: 指定があればその日以降
    if (date && ev.date < date) return false;

    // カテゴリ: 指定があれば一致
    if (category && ev.category !== category) return false;

    return true;
  });

  return (
    <div className="event-list-page">
      <h2>地域イベント一覧</h2>

      {/* フィルタフォーム */}
      <div className="filters">
        {/* キーワード */}
        <input
          type="text"
          placeholder="キーワード検索"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />

        {/* 開催日 */}
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        {/* カテゴリ */}
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* 絞り込んだイベント */}
      <div className="event-cards">
        {filtered.length === 0 ? (
          <p>該当するイベントがありません</p>
        ) : (
          filtered.map(ev => (
            <Link key={ev.id} to={`/events/${ev.id}`} style={{ textDecoration: 'none' }}>
              <EventCard event={ev} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
