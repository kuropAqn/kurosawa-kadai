// src/pages/EventDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [joined, setJoined] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // ダミー取得 or 実際は fetch(`/api/events/${id}`)
  useEffect(() => {
    // FIXME: API fetch に書き換え
    const ev = dummyEvents.find(e => String(e.id) === id);
    setEvent(ev);
    // comments 初期取得
    fetch(`/api/events/${id}/comments`)
      .then(res => res.json())
      .then(setComments)
      .catch(() => setComments([]));
  }, [id]);

  if (!event) return <p>読み込み中…</p>;

  const handleJoin = () => {
    fetch(`/api/events/${id}/join`, { method: 'POST' })
      .then(res => {
        if (!res.ok) throw new Error();
        setJoined(true);
      })
      .catch(() => alert('参加に失敗しました'));
  };

  const handleCommentSubmit = e => {
    e.preventDefault();
    if (!newComment.trim()) return;
    fetch(`/api/events/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newComment }),
    })
      .then(res => res.json())
      .then(created => {
        setComments(prev => [...prev, created]);
        setNewComment('');
      })
      .catch(() => alert('コメントの投稿に失敗しました'));
  };

  return (
    <div className="event-detail-page">
      <h2>{event.title}</h2>
      <p>{event.date} @ {event.location}</p>
      <p>{event.description}</p>
      <p>定員：{event.capacity}名</p>

      <button onClick={handleJoin} disabled={joined}>
        {joined ? '参加済み' : '参加する'}
      </button>

      <section className="comments">
        <h3>コメント</h3>
        {comments.length === 0 ? (
          <p>まだコメントがありません</p>
        ) : (
          <ul>
            {comments.map(c => (
              <li key={c.id}>{c.text}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            rows={3}
          />
          <button type="submit">投稿</button>
        </form>
      </section>

      <p><Link to="/">← 一覧に戻る</Link></p>
    </div>
  );
}

// ここでは同一ファイルにダミーデータ定義を置いていますが
// 実運用では services/eventService.js などに分離してください。
const dummyEvents = [
  { id: 1, title: '夏祭り', date: '2025-08-01', location: '中央広場', description: '楽しいお祭り', capacity: 100 },
  { id: 2, title: '音楽ワークショップ', date: '2025-08-10', location: 'コミュニティセンター', description: 'ギター体験', capacity: 30 },
];
