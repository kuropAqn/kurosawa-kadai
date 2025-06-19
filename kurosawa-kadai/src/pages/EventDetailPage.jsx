// src/pages/EventDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [joined, setJoined] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // 初期データ取得：イベント情報・参加者数・コメント一覧
  useEffect(() => {
    // イベント情報
    fetch(`/api/events/${id}`)
      .then(res => res.json())
      .then(setEvent)
      .catch(() => setEvent(null));
    // 参加者数
    fetch(`/api/events/${id}/participants/count`)
      .then(res => res.json())
      .then(data => setParticipantsCount(data.count))
      .catch(() => setParticipantsCount(0));
    // コメント一覧
    fetch(`/api/events/${id}/comments`)
      .then(res => res.json())
      .then(setComments)
      .catch(() => setComments([]));
  }, [id]);

  if (!event) return <p>読み込み中…</p>;

  // 参加ボタン押下時
  const handleJoin = () => {
    fetch(`/api/events/${id}/join`, { method: 'POST' })
      .then(res => {
        if (!res.ok) throw new Error();
        setJoined(true);
        // 参加者数を即時更新
        setParticipantsCount(prev => prev + 1);
      })
      .catch(() => alert('参加に失敗しました'));
  };

  // コメント投稿処理（省略、前回例と同じ）
  const handleCommentSubmit = e => { /* ... */ };

  return (
    <div className="event-detail-page">
      <h2>{event.title}</h2>
      <p>
        {event.date} @ {event.location}
      </p>
      <p>{event.description}</p>
      <p>定員：{event.capacity}名</p>
      <p>参加者数：{participantsCount}名</p>

      <button onClick={handleJoin} disabled={joined || participantsCount >= event.capacity}>
        {joined ? '参加済み' : participantsCount >= event.capacity ? '満員' : '参加する'}
      </button>

      {/* コメント欄 */}
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

      <p>
        <Link to="/">← 一覧に戻る</Link>
      </p>
    </div>
  );
}
