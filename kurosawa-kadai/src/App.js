// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EventListPage from './pages/EventListPage';
import EventCreatePage from './pages/EventCreatePage';
import EventDetailPage from './pages/EventDetailPage';

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link to="/">一覧</Link>{' | '}
          <Link to="/events/new">新規作成</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<EventListPage />} />
          <Route path="/events/new" element={<EventCreatePage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          {/* …詳細ページなど他パスも追加可能 */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
