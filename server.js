const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json());

const majenUpload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 20, fileSize: 12 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    callback(null, ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype));
  },
});

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
  problem: String,
  solution: String,
  contribution: String,
  outcome: String,
  demo: String,
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
  proofUrl: { type: String, default: '' },
  links:       [{ label: String, url: String }],
  date:        { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
const Achievement = mongoose.model('Achievement', achievementSchema);

const majenUploadSchema = new mongoose.Schema({
  dateKey: { type: String, required: true, index: true },
  files: [{
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
  }],
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const MajenUpload = mongoose.model('MajenUpload', majenUploadSchema);

// ── Static files ────────────────────────────────────────────────────────────
app.use('/portfolio', express.static(path.join(__dirname, 'portfolio')));
app.use('/attached_assets', express.static(path.join(__dirname, 'attached_assets')));

// ── Page routes ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'portfolio', 'index.html'));
});

app.get('/Majen', (req, res) => {
  res.sendFile(path.join(__dirname, 'portfolio', 'majen.html'));
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

function getMajenBucket() {
  if (mongoose.connection.readyState !== 1) return null;
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'majenPhotos' });
}

function uploadToGridFs(bucket, file) {
  return new Promise((resolve, reject) => {
    const upload = bucket.openUploadStream(file.originalname, {
      contentType: file.mimetype,
      metadata: { source: 'majen-upload', uploadedAt: new Date() },
    });
    upload.once('error', reject);
    upload.once('finish', () => resolve(upload.id));
    upload.end(file.buffer);
  });
}

app.post('/api/majen/uploads', majenUpload.array('photos', 20), async (req, res) => {
  const bucket = getMajenBucket();
  const dateKey = String(req.body.dateKey || '').trim();
  if (!bucket) return res.status(503).json({ error: 'MongoDB is not connected' });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return res.status(400).json({ error: 'Use an achievement date in YYYY-MM-DD format' });
  if (!req.files?.length) return res.status(400).json({ error: 'Select at least one JPG, PNG, or WebP photo' });

  try {
    const files = [];
    for (const file of req.files) {
      const fileId = await uploadToGridFs(bucket, file);
      files.push({ fileId, filename: file.originalname, contentType: file.mimetype });
    }
    const record = await MajenUpload.create({ dateKey, files });
    res.status(201).json({ id: record.id, dateKey, files: record.files.map((file) => ({ filename: file.filename, url: `/api/majen/photos/${file.fileId}` })) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/majen/uploads', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'MongoDB is not connected' });
  try {
    const uploads = await MajenUpload.find().sort({ dateKey: -1, createdAt: -1 }).lean();
    res.json(uploads.map((upload) => ({
      id: upload._id,
      dateKey: upload.dateKey,
      description: upload.description,
      createdAt: upload.createdAt,
      files: upload.files.map((file) => ({ filename: file.filename, url: `/api/majen/photos/${file.fileId}` })),
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/majen/uploads/:id', async (req, res) => {
  if (mongoose.connection.readyState !== 1 || !mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ error: 'Upload record not found' });
  }
  const description = String(req.body.description || '').trim();
  if (description.length > 2000) return res.status(400).json({ error: 'Description must be 2000 characters or fewer' });
  try {
    const record = await MajenUpload.findByIdAndUpdate(req.params.id, { description }, { new: true, runValidators: true }).lean();
    if (!record) return res.status(404).json({ error: 'Upload record not found' });
    res.json({ id: record._id, dateKey: record.dateKey, description: record.description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/majen/photos/:id', async (req, res) => {
  if (mongoose.connection.readyState !== 1 || !mongoose.isValidObjectId(req.params.id)) return res.sendStatus(404);
  try {
    const bucket = getMajenBucket();
    const file = await mongoose.connection.db.collection('majenPhotos.files').findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    if (!file) return res.sendStatus(404);
    res.set('Content-Type', file.contentType || 'application/octet-stream');
    res.set('Cache-Control', 'private, max-age=3600');
    bucket.openDownloadStream(file._id).on('error', () => res.sendStatus(404)).pipe(res);
  } catch (error) {
    res.sendStatus(404);
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

  // Auto-ping to keep Render free tier awake (every 14m 59s)
  const PING_URL = 'https://pgayushrai.onrender.com/health';
  const PING_INTERVAL = 14 * 60 * 1000 + 59 * 1000; // 14min 59sec
  setInterval(() => {
    const https = require('https');
    https.get(PING_URL, (res) => {
      console.log(`🏓 Keep-alive ping: ${res.statusCode}`);
    }).on('error', (err) => {
      console.log(`🏓 Ping failed: ${err.message}`);
    });
  }, PING_INTERVAL);
  console.log(`   🏓 Auto-ping enabled: ${PING_URL} every ~15min`);
  console.log('');
});
