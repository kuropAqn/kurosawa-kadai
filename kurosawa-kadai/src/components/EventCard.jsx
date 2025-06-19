import React from 'react';

export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>{event.date} @ {event.location}</p>
      <p>{event.description}</p>
    </div>
  );
}
