const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MAILTM = 'https://api.mail.tm';

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Proxy all mail.tm API calls through /api/mail/*
app.get('/api/mail/domains', async (req, res) => {
  try {
    const r = await fetch(`${MAILTM}/domains`);
    res.status(r.status).json(await r.json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/mail/accounts', async (req, res) => {
  try {
    const r = await fetch(`${MAILTM}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    res.status(r.status).json(await r.json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/mail/token', async (req, res) => {
  try {
    const r = await fetch(`${MAILTM}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    res.status(r.status).json(await r.json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/mail/messages', async (req, res) => {
  const auth = req.headers['authorization'];
  try {
    const r = await fetch(`${MAILTM}/messages`, {
      headers: { Authorization: auth }
    });
    res.status(r.status).json(await r.json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/mail/messages/:id', async (req, res) => {
  const auth = req.headers['authorization'];
  try {
    const r = await fetch(`${MAILTM}/messages/${req.params.id}`, {
      headers: { Authorization: auth }
    });
    res.status(r.status).json(await r.json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`TempMail running on port ${PORT}`);
});
