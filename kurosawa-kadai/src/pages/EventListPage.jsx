import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';
// 仮のダミーデータまたは後で services/eventService.js から fetch する
const dummyEvents = [
  { id: 1, title: '夏祭り', date: '2025-08-01', location: '中央広場', description: '焼きそば・たこ焼き出店あり' },
  { id: 2, title: '音楽ワークショップ', date: '2025-08-10', location: 'コミュニティセンター', description: 'ギター演奏体験' },
];

export default function EventListPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 実際は fetch('/api/events') など
    setEvents(dummyEvents);
  }, []);

  return (
    <div className="event-list-page">
      <h2>地域イベント一覧</h2>
       {events.map(ev => (
         <Link key={ev.id} to={`/events/${ev.id}`} style={{ textDecoration: 'none' }}>
           <EventCard event={ev} />
         </Link>
       ))}
    </div>
  );
}
