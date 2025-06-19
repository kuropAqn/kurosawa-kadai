const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

const events = [
  { id: 1, title: '夏祭り', date: '2025-08-01', location: '中央広場', description: '楽しいお祭り', capacity: 100 },
  { id: 2, title: '音楽ワークショップ', date: '2025-08-10', location: 'コミュニティセンター', description: 'ギター体験', capacity: 30 },
];
let participants = { 1: 3, 2: 1 };
let comments = { 1: [], 2: [] };

// API定義
app.get('/', (req, res) => {
  res.send('Hello from API server!');
});
app.get('/api/events', (req, res) => res.json(events));
app.get('/api/events/:id', (req, res) => {
  const ev = events.find(e => e.id === +req.params.id);
  if (!ev) return res.sendStatus(404);
  res.json(ev);
});
app.get('/api/events/:id/participants/count', (req, res) => {
  const cnt = participants[req.params.id] || 0;
  res.json({ count: cnt });
});
app.post('/api/events/:id/join', (req, res) => {
  const id = req.params.id;
  participants[id] = (participants[id] || 0) + 1;
  res.sendStatus(201);
});
app.get('/api/events/:id/comments', (req, res) => {
  res.json(comments[req.params.id] || []);
});
app.post('/api/events/:id/comments', (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  if (!text) return res.sendStatus(400);
  const newComment = { id: Date.now(), text };
  comments[id] = comments[id] || [];
  comments[id].push(newComment);
  res.status(201).json(newComment);
});

// catch-all: API以外のルートはReactのindex.htmlを返す
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
