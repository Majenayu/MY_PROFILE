const express = require('express');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));
app.use(express.static('public'));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// Cloudinary-backed storages (badges + profile + events)
const badgeStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder:"ayush-badges", allowed_formats:["jpg","jpeg","png","webp","gif"],
    transformation:[{width:300,height:300,crop:"fill",quality:"auto"}] },
});
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder:"ayush-profile", allowed_formats:["jpg","jpeg","png","webp","gif"],
    transformation:[{width:200,height:200,crop:"fill",quality:"auto"}] },
});
const eventStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder:"ayush-events", allowed_formats:["jpg","jpeg","png","webp","gif"],
    transformation:[{quality:"auto", fetch_format:"auto"}] },
});

const memStorage  = multer({ storage: multer.memoryStorage() });
const badgeUpload   = multer({ storage: badgeStorage,   limits:{ fileSize:5*1024*1024 } });
const profileUpload = multer({ storage: profileStorage, limits:{ fileSize:5*1024*1024 } });
const eventUpload   = multer({ storage: eventStorage,   limits:{ fileSize:10*1024*1024 } });

// MongoDB connection with better error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log('📡 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('🔥 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📴 Mongoose disconnected from MongoDB');
});

// Project Schema
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

const Project = mongoose.model('Project', projectSchema);

// Multer configuration for file uploads (memory storage since we use Cloudinary)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});


// ── Achievement / Course / Badge / Profile schemas ──────────────────────────
const achievementSchema = new mongoose.Schema({
  eventName:   { type:String, required:true },
  place:       { type:String, required:true },
  description: { type:String, default:'' },
  priority:    { type:String, enum:['high','medium','low'], default:'medium' },
  photos:      [{ type:String }],
  date:        { type:Date, default:Date.now }
});
const courseSchema = new mongoose.Schema({
  courseName:     { type:String, required:true },
  description:    { type:String, required:true },
  priority:       { type:String, enum:['high','medium','low'], default:'medium' },
  rank:           { type:Number, default:0 },
  certificate:    { type:String, default:'' },
  completionDate: { type:Date, default:Date.now }
});
const badgeSchema = new mongoose.Schema({
  title:    { type:String, required:true, trim:true },
  desc:     { type:String, required:true, trim:true },
  tag:      { type:String, default:"Achievement", trim:true },
  emoji:    { type:String, default:"🏅" },
  color:    { type:String, default:"#00f0ff" },
  imageUrl: { type:String, default:"" },
  imagePublicId: { type:String, default:"" },
  createdAt: { type:Date, default:Date.now },
});
const profileSchema = new mongoose.Schema({
  fullName:   { type:String, required:true, trim:true },
  title:      { type:String, default:"B.Tech · Developer · Builder", trim:true },
  description:{ type:String, required:true, trim:true },
  location:   { type:String, default:"India", trim:true },
  education:  { type:String, default:"B.Tech", trim:true },
  status:     { type:String, default:"open", enum:["open","busy","available","learning"] },
  characterImage: { type:String, default:"https://storage.googleapis.com/anirive-outputs/users/8ENEUTvq42OIhrEJRP0xBvs1bew2/chars/mmuuwver/anims/mmuuyw68/animation.webp" },
  characterImagePublicId: { type:String, default:"" },
  updatedAt:  { type:Date, default:Date.now },
});

// ── Event Schema ─────────────────────────────────────────────────────────────
const teamMemberSchema = new mongoose.Schema({
  name:  { type:String, required:true, trim:true },
  role:  { type:String, required:true, trim:true },
  email: { type:String, default:'', trim:true }
});
const eventSchema = new mongoose.Schema({
  eventName:       { type:String, required:true, trim:true },
  participatedDate:{ type:Date,   required:true },
  description:     { type:String, required:true, trim:true },
  projectLink:     { type:String, default:'' },
  photos:          [{ type:String }],
  teamName:        { type:String, required:true, trim:true },
  teamMembers:     [teamMemberSchema],
  displayOrder:    { type:Number, default:0 },
  createdAt:       { type:Date, default:Date.now },
  updatedAt:       { type:Date, default:Date.now }
});

const Achievement = mongoose.model('Achievement', achievementSchema);
const Course      = mongoose.model('Course',      courseSchema);
const Badge       = mongoose.model('Badge',       badgeSchema);
const Profile     = mongoose.model('Profile',     profileSchema);
const EventModel  = mongoose.model('Event',       eventSchema);

// ── Visitor counter schema ──────────────────────────────────────────────────
const visitorSchema = new mongoose.Schema({
  key:     { type:String, required:true, unique:true },
  total:   { type:Number, default:0 },    // total pageviews
  unique:  { type:Number, default:0 },    // unique visitors (by IP+UA hash)
  seen:    { type:[String], default:[] }, // recent visitor hashes (cap 5000)
  updated: { type:Date,   default:Date.now }
});
const Visitor = mongoose.model('Visitor', visitorSchema);

// ── Helper: upload buffer to Cloudinary ─────────────────────────────────────
async function uploadBuffer(buffer, mimetype, folder, prefix) {
  const r = await cloudinary.uploader.upload(
    `data:${mimetype};base64,${buffer.toString("base64")}`,
    { folder, resource_type:"auto",
      public_id:`${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,9)}`,
      overwrite:true }
  );
  return r.secure_url;
}

// ── Page Routes ───────────────────────────────────────────────────────────────

// Admin login / dashboard (files live next to server.js)
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Profile editor & add-project (files at root alongside server.js)
app.get('/profile-editor', (req, res) => {
  res.sendFile(path.join(__dirname, 'profile-editor.html'));
});
app.get('/add-project', (req, res) => {
  res.sendFile(path.join(__dirname, 'add-project.html'));
});

app.get('/event-register', (req, res) => {
  res.sendFile(path.join(__dirname, 'event-register.html'));
});
app.get('/event-display', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'event-display.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});
app.get('/badge-register', (req, res) => {
  res.sendFile(path.join(__dirname, 'badge-register.html'));
});

// Routes
app.get('/api/projects', async (req, res) => {
  try {
    console.log('Fetching projects from database...');
    const projects = await Project.find().sort({ priority: -1, createdAt: -1 });
    console.log(`Found ${projects.length} projects`);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/projects', upload.single('previewImage'), async (req, res) => {
  try {
    let previewImageUrl = '';
    
    if (req.file) {
      // Upload from memory buffer instead of file path
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      previewImageUrl = result.secure_url;
    }

    const project = new Project({
      ...req.body,
      techStack: JSON.parse(req.body.techStack || '[]'),
      previewImage: previewImageUrl
    });

    await project.save();
    console.log('Project saved:', project.name);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/projects/:id', upload.single('previewImage'), async (req, res) => {
  try {
    let updateData = {
      ...req.body,
      techStack: JSON.parse(req.body.techStack || '[]')
    };

    if (req.file) {
      // Upload from memory buffer instead of file path
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      updateData.previewImage = result.secure_url;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    console.log('Project updated:', project.name);
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/projects/:id/priority', async (req, res) => {
  try {
    const { priority } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { priority },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a test route to check if server is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date() });
});

// ── Visitor counter: hit on every page load ──────────────────────────────
app.get('/api/visits', async (req, res) => {
  try {
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
    const ua = (req.headers['user-agent'] || '').slice(0, 160);
    // simple deterministic hash without extra deps
    const hash = require('crypto').createHash('md5').update(ip + '|' + ua).digest('hex');

    let v = await Visitor.findOne({ key: 'main' });
    if (!v) v = new Visitor({ key: 'main', total: 0, unique: 0, seen: [] });

    v.total += 1;
    if (!v.seen.includes(hash)) {
      v.unique += 1;
      v.seen.push(hash);
      // cap the rolling window at 5000 hashes to prevent unbounded growth
      if (v.seen.length > 5000) v.seen = v.seen.slice(-5000);
    }
    v.updated = new Date();
    await v.save();

    res.json({ success: true, total: v.total, unique: v.unique });
  } catch (err) {
    console.error('visits error:', err.message);
    res.json({ success: false, total: 0, unique: 0 });
  }
});

// Read-only variant (doesn't increment) for widgets
app.get('/api/visits/stats', async (req, res) => {
  try {
    const v = await Visitor.findOne({ key: 'main' });
    res.json({ success: true, total: v?.total || 0, unique: v?.unique || 0 });
  } catch (err) {
    res.json({ success: false, total: 0, unique: 0 });
  }
});

// Add a route to check database connection
app.get('/api/db-status', async (req, res) => {
  try {
    const count = await Project.countDocuments();
    res.json({ 
      status: 'Connected to MongoDB', 
      projectCount: count,
      dbState: mongoose.connection.readyState 
    });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});

// ═══════════════════════════════════════════════════════
//  ACHIEVEMENT ROUTES
// ═══════════════════════════════════════════════════════
app.get("/api/achievements", async (req,res) => {
  try { res.json(await Achievement.find().sort({date:-1})); }
  catch(e){ res.status(500).json({error:e.message}); }
});
app.post("/api/achievements", memStorage.array("photos",5), async (req,res) => {
  try {
    const {eventName,place,description,priority,achievementDate} = req.body;
    if(!eventName||!place) return res.status(400).json({error:"Name and place required"});
    const photoUrls = [];
    for(const f of (req.files||[])){
      try { photoUrls.push(await uploadBuffer(f.buffer, f.mimetype, "achievements","ach")); }
      catch(e){ console.error("photo upload:", e.message); }
    }
    const doc = await new Achievement({
      eventName, place, description:description||"",
      priority:priority||"medium", photos:photoUrls,
      date: achievementDate ? new Date(achievementDate) : new Date()
    }).save();
    res.json(doc);
  } catch(e){ res.status(500).json({error:e.message}); }
});
app.put("/api/achievements/:id", async (req,res) => {
  try {
    const {eventName,place,description,priority,achievementDate} = req.body;
    const upd = {};
    if(eventName) upd.eventName=eventName;
    if(place) upd.place=place;
    if(description!==undefined) upd.description=description;
    if(priority) upd.priority=priority;
    if(achievementDate) upd.date=new Date(achievementDate);
    const doc = await Achievement.findByIdAndUpdate(req.params.id, upd, {new:true});
    if(!doc) return res.status(404).json({error:"Not found"});
    res.json(doc);
  } catch(e){ res.status(500).json({error:e.message}); }
});
app.delete("/api/achievements/:id", async (req,res) => {
  try { await Achievement.findByIdAndDelete(req.params.id); res.json({message:"Deleted"}); }
  catch(e){ res.status(500).json({error:e.message}); }
});

// ═══════════════════════════════════════════════════════
//  COURSE ROUTES
// ═══════════════════════════════════════════════════════
app.get("/api/courses", async (req,res) => {
  try { res.json(await Course.find().sort({rank:1, completionDate:-1})); }
  catch(e){ res.status(500).json({error:e.message}); }
});
app.post("/api/courses", memStorage.single("certificate"), async (req,res) => {
  try {
    const {courseName,description,priority,rank,completionDate} = req.body;
    if(!courseName||!description) return res.status(400).json({error:"Name and description required"});
    let certUrl = "";
    if(req.file){ try { certUrl = await uploadBuffer(req.file.buffer, req.file.mimetype, "certificates","cert"); } catch(e){} }
    const doc = await new Course({
      courseName, description, priority:priority||"medium",
      rank:rank?parseInt(rank):0, certificate:certUrl,
      completionDate: completionDate ? new Date(completionDate) : new Date()
    }).save();
    res.json(doc);
  } catch(e){ res.status(500).json({error:e.message}); }
});
app.put("/api/courses/:id", async (req,res) => {
  try {
    const {courseName,description,priority,rank,completionDate} = req.body;
    const upd = {};
    if(courseName) upd.courseName=courseName;
    if(description) upd.description=description;
    if(priority) upd.priority=priority;
    if(rank!==undefined) upd.rank=parseInt(rank);
    if(completionDate) upd.completionDate=new Date(completionDate);
    const doc = await Course.findByIdAndUpdate(req.params.id, upd, {new:true});
    if(!doc) return res.status(404).json({error:"Not found"});
    res.json(doc);
  } catch(e){ res.status(500).json({error:e.message}); }
});
app.delete("/api/courses/:id", async (req,res) => {
  try { await Course.findByIdAndDelete(req.params.id); res.json({message:"Deleted"}); }
  catch(e){ res.status(500).json({error:e.message}); }
});

// ═══════════════════════════════════════════════════════
//  BADGE ROUTES
// ═══════════════════════════════════════════════════════
app.get("/api/badges", async (req,res) => {
  try { res.json({ success:true, badges: await Badge.find().sort({createdAt:-1}) }); }
  catch(err){ res.status(500).json({ success:false, error:err.message }); }
});
app.post("/api/badges", badgeUpload.single("image"), async (req,res) => {
  try {
    const {title,desc,tag,emoji,color} = req.body;
    if(!title||!desc) return res.status(400).json({success:false, error:"Title and description required."});
    const badge = await new Badge({
      title:title.trim(), desc:desc.trim(),
      tag:(tag||"Achievement").trim(), emoji:emoji||"🏅", color:color||"#00f0ff",
      imageUrl: req.file?req.file.path:"",
      imagePublicId: req.file?req.file.filename:"",
    }).save();
    res.json({success:true, badge});
  } catch(err){ res.status(500).json({success:false, error:err.message}); }
});
app.put("/api/badges/:id", badgeUpload.single("image"), async (req,res) => {
  try {
    const {title,desc,tag,emoji,color} = req.body;
    if(!title||!desc) return res.status(400).json({success:false, error:"Title and description required."});
    const badge = await Badge.findById(req.params.id);
    if(!badge) return res.status(404).json({success:false, error:"Badge not found."});
    badge.title=title.trim(); badge.desc=desc.trim();
    badge.tag=(tag||"Achievement").trim(); badge.emoji=emoji||"🏅"; badge.color=color||"#00f0ff";
    if(req.file){
      if(badge.imagePublicId) await cloudinary.uploader.destroy(badge.imagePublicId).catch(()=>{});
      badge.imageUrl=req.file.path; badge.imagePublicId=req.file.filename;
    }
    await badge.save();
    res.json({success:true, badge});
  } catch(err){ res.status(500).json({success:false, error:err.message}); }
});
app.delete("/api/badges/:id", async (req,res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if(!badge) return res.status(404).json({success:false, error:"Badge not found."});
    if(badge.imagePublicId) await cloudinary.uploader.destroy(badge.imagePublicId).catch(()=>{});
    await Badge.findByIdAndDelete(req.params.id);
    res.json({success:true});
  } catch(err){ res.status(500).json({success:false, error:err.message}); }
});

// ═══════════════════════════════════════════════════════
//  PROFILE ROUTES
// ═══════════════════════════════════════════════════════
app.get("/api/profile", async (req,res) => {
  try {
    let profile = await Profile.findOne();
    if(!profile){
      profile = await new Profile({
        fullName:"P G AYUSH RAI", title:"B.Tech · Developer · Builder",
        description:"Passionate Developer & Tech Enthusiast — Creating innovative solutions through code",
        location:"India", education:"B.Tech", status:"open"
      }).save();
    }
    res.json({success:true, profile});
  } catch(err){ res.status(500).json({success:false, error:err.message}); }
});
app.post("/api/profile", profileUpload.single("characterImage"), async (req,res) => {
  try {
    const {fullName,title,description,location,education,status} = req.body;
    if(!fullName||!description) return res.status(400).json({success:false, error:"Full name and description required."});
    let profile = await Profile.findOne();
    if(profile){
      profile.fullName=(fullName).trim();
      profile.title=(title||"B.Tech · Developer · Builder").trim();
      profile.description=description.trim();
      profile.location=(location||"India").trim();
      profile.education=(education||"B.Tech").trim();
      profile.status=status||"open";
      profile.updatedAt=new Date();
      if(req.file){
        if(profile.characterImagePublicId) await cloudinary.uploader.destroy(profile.characterImagePublicId).catch(()=>{});
        profile.characterImage=req.file.path; profile.characterImagePublicId=req.file.filename;
      }
    } else {
      profile = new Profile({
        fullName:fullName.trim(), title:(title||"B.Tech · Developer · Builder").trim(),
        description:description.trim(), location:(location||"India").trim(),
        education:(education||"B.Tech").trim(), status:status||"open",
        characterImage: req.file?req.file.path:"https://storage.googleapis.com/anirive-outputs/users/8ENEUTvq42OIhrEJRP0xBvs1bew2/chars/mmuuwver/anims/mmuuyw68/animation.webp",
        characterImagePublicId: req.file?req.file.filename:"",
      });
    }
    await profile.save();
    res.json({success:true, profile});
  } catch(err){ res.status(500).json({success:false, error:err.message}); }
});

// ═══════════════════════════════════════════════════════
//  EVENT ROUTES
// ═══════════════════════════════════════════════════════
app.get("/api/events", async (req, res) => {
  try {
    const events = await EventModel.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(events);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.get("/api/events/:id", async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch(e) { res.status(500).json({ error: e.message }); }
});

app.post("/api/events", eventUpload.array("photos", 6), async (req, res) => {
  try {
    const { eventName, participatedDate, description, projectLink, teamName, teamMembers, displayOrder } = req.body;
    if (!eventName || !participatedDate || !description || !teamName) {
      return res.status(400).json({ error: "Event name, date, description and team name are required." });
    }
    let parsedMembers = [];
    if (teamMembers) {
      parsedMembers = typeof teamMembers === 'string' ? JSON.parse(teamMembers) : teamMembers;
    }
    const photoUrls = (req.files || []).map(f => f.path);
    const event = await new EventModel({
      eventName, participatedDate: new Date(participatedDate), description,
      projectLink: projectLink || '', photos: photoUrls,
      teamName, teamMembers: parsedMembers,
      displayOrder: parseInt(displayOrder) || 0
    }).save();
    res.status(201).json({ message: 'Event created', event });
  } catch(e) {
    console.error('Error creating event:', e);
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/events/:id", eventUpload.array("photos", 6), async (req, res) => {
  try {
    const { eventName, participatedDate, description, projectLink, teamName, teamMembers, displayOrder, existingPhotos } = req.body;
    let parsedMembers = [];
    if (teamMembers) {
      parsedMembers = typeof teamMembers === 'string' ? JSON.parse(teamMembers) : teamMembers;
    }
    let photoUrls = [];
    if (existingPhotos) {
      photoUrls = typeof existingPhotos === 'string' ? JSON.parse(existingPhotos) : existingPhotos;
    }
    if (req.files && req.files.length > 0) {
      photoUrls = [...photoUrls, ...req.files.map(f => f.path)];
    }
    const updated = await EventModel.findByIdAndUpdate(
      req.params.id,
      {
        eventName, participatedDate: new Date(participatedDate), description,
        projectLink: projectLink || '', photos: photoUrls,
        teamName, teamMembers: parsedMembers,
        displayOrder: parseInt(displayOrder) || 0, updatedAt: new Date()
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event updated', event: updated });
  } catch(e) {
    console.error('Error updating event:', e);
    res.status(500).json({ error: e.message });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    const event = await EventModel.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch(e) { res.status(500).json({ error: e.message }); }
});

// ── Utility ──────────────────────────────────────────
app.delete("/api/clear-all", async (req,res) => {
  try {
    await Promise.all([Achievement.deleteMany({}), Course.deleteMany({})]);
    res.json({message:"Cleared"});
  } catch(e){ res.status(500).json({error:e.message}); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});