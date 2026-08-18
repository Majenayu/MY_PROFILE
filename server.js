const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const app = express();

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json());

// MongoDB is optional — portfolio works without it using local fallback data
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.warn('⚠️  MongoDB connection error:', err.message);
    console.warn('⚠️  Running in limited mode (portfolio still available)');
  });
} else {
  console.log('ℹ️  MONGODB_URI not configured — serving portfolio in limited mode');
}

// ── Schemas (only what the portfolio frontend needs) ────────────────────────
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: String,
  description: { type: String, required: true },
  github: String,
  techStack: [String],
  hardware: String,
  software: String,
  priority: { type: Number, default: 0 },
  previewImage: String,
  createdAt: { type: Date, default: Date.now }
});

const achievementSchema = new mongoose.Schema({
  eventName:   { type: String, required: true },
  place:       { type: String, required: true },
  description: { type: String, default: '' },
  priority:    { type: String, enum: ['high','medium','low'], default: 'medium' },
  photos:      [{ type: String }],
  postUrl:     { type: String, default: '' },
  certificateUrl: { type: String, default: '' },
  links:       [{ label: String, url: String }],
  date:        { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
const Achievement = mongoose.model('Achievement', achievementSchema);

// ── Static files ────────────────────────────────────────────────────────────
app.use('/portfolio', express.static(path.join(__dirname, 'portfolio')));
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));

// ── Page routes ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'portfolio', 'index.html'));
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// ── API routes (read-only, used by portfolio frontend) ──────────────────────
app.get('/api/projects', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json([]);
  try {
    const projects = await Project.find().sort({ priority: -1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/achievements', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json([]);
  try {
    res.json(await Achievement.find().sort({ date: -1 }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ── Start ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('========================================');
  console.log('');
  console.log(`   🏠 Portfolio: http://localhost:${PORT}`);
  console.log('');
});
