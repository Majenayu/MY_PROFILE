// ════════════════════════════════════════════════════════════
//  ADD / EDIT PROJECT — add-project.js
// ════════════════════════════════════════════════════════════
const TECH_OPTIONS = [
  // Frontend
  'HTML','CSS','JavaScript','TypeScript','React','Vue.js','Angular','Svelte',
  'Next.js','Nuxt.js','Gatsby','jQuery','Bootstrap','Tailwind CSS',
  'Material-UI','Chakra UI','Sass','Styled Components','Webpack','Vite',
  // Backend
  'Node.js','Express.js','Python','Django','Flask','FastAPI','Java',
  'Spring Boot','PHP','Laravel','Ruby','Ruby on Rails','C#','.NET',
  'Go','Rust','Kotlin','Scala','Deno','Bun',
  // Databases
  'MongoDB','MySQL','PostgreSQL','SQLite','Redis','Firebase','Supabase',
  'DynamoDB','Cassandra','Neo4j','InfluxDB','Elasticsearch',
  // Cloud & DevOps
  'AWS','Google Cloud','Azure','Docker','Kubernetes','Jenkins',
  'GitHub Actions','GitLab CI','Terraform','Ansible','Nginx','Vercel','Netlify',
  // Mobile
  'React Native','Flutter','Swift','Ionic','Cordova',
  // Tools
  'Git','Babel','ESLint','Jest','Cypress','Selenium','Postman',
  'Figma','GraphQL','REST API','Socket.io','WebRTC','OpenAI API','LangChain',
  'TensorFlow','PyTorch','Pandas','NumPy','OpenCV'
];

let selectedTech  = [];
let imageFile     = null;
let editProjectId = null;

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  renderTechGrid(TECH_OPTIONS);
  setupListeners();
  loadEditData();
});

// ── Render tech grid ──
function renderTechGrid(options) {
  const grid = document.getElementById('techGrid');
  grid.innerHTML = '';
  options.forEach(tech => {
    const chip = document.createElement('div');
    chip.className = 'tech-chip' + (selectedTech.includes(tech) ? ' selected' : '');
    chip.textContent = tech;
    chip.dataset.tech = tech;
    chip.addEventListener('click', () => toggleTech(tech, chip));
    grid.appendChild(chip);
  });
}

// ── Toggle tech ──
function toggleTech(tech, chipEl) {
  if (selectedTech.includes(tech)) {
    selectedTech = selectedTech.filter(t => t !== tech);
    if (chipEl) chipEl.classList.remove('selected');
  } else {
    selectedTech.push(tech);
    if (chipEl) chipEl.classList.add('selected');
  }
  renderSelectedTags();
}

function renderSelectedTags() {
  const container = document.getElementById('selectedTags');
  container.innerHTML = '';
  selectedTech.forEach(t => {
    const tag = document.createElement('div');
    tag.className = 'selected-tag';
    tag.innerHTML = `${t}<button class="rm-tag" data-t="${t}">×</button>`;
    tag.querySelector('.rm-tag').addEventListener('click', () => {
      toggleTech(t, document.querySelector(`.tech-chip[data-tech="${t}"]`));
    });
    container.appendChild(tag);
  });
}

// ── Tech search ──
function setupListeners() {
  const searchEl = document.getElementById('techSearch');
  const clearBtn = document.getElementById('techClearBtn');
  const descTA   = document.getElementById('projDescInput');
  const descCnt  = document.getElementById('descCount');

  searchEl.addEventListener('input', () => {
    const q = searchEl.value.toLowerCase().trim();
    document.querySelectorAll('.tech-chip').forEach(chip => {
      const match = !q || chip.dataset.tech.toLowerCase().includes(q);
      chip.classList.toggle('hidden', !match);
    });
  });

  clearBtn.addEventListener('click', () => {
    searchEl.value = '';
    document.querySelectorAll('.tech-chip').forEach(c => c.classList.remove('hidden'));
    searchEl.focus();
  });

  descTA.addEventListener('input', () => {
    descCnt.textContent = `${descTA.value.length} / 500`;
  });

  // Custom tech
  document.getElementById('addCustomBtn').addEventListener('click', addCustomTech);
  document.getElementById('customTechInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); addCustomTech(); }
  });

  // File upload
  const uploadZone = document.getElementById('uploadZone');
  const fileInput  = document.getElementById('projImageInput');
  const previewDiv = document.getElementById('filePreview');
  const previewImg = document.getElementById('previewImg');

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    handleFileSelect(file);
  });

  uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('dragover'); });
  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
  uploadZone.addEventListener('drop', e => {
    e.preventDefault(); uploadZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFileSelect(file);
  });

  document.getElementById('removeImgBtn').addEventListener('click', () => {
    imageFile = null; fileInput.value = '';
    previewDiv.style.display = 'none';
    uploadZone.style.display = '';
  });

  // Form submit
  document.getElementById('submitBtn').addEventListener('click', submitProject);

  // Reset
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('Reset all fields?')) {
      document.getElementById('projNameInput').value     = '';
      document.getElementById('projDescInput').value     = '';
      document.getElementById('projWebsiteInput').value  = '';
      document.getElementById('projGithubInput').value   = '';
      document.getElementById('projHardwareInput').value = '';
      document.getElementById('projSoftwareInput').value = '';
      document.getElementById('projPriorityInput').value = '0';
      descCnt.textContent = '0 / 500';
      selectedTech = [];
      renderTechGrid(TECH_OPTIONS);
      renderSelectedTags();
      imageFile = null; fileInput.value = '';
      previewDiv.style.display = 'none';
      uploadZone.style.display = '';
    }
  });
}

function handleFileSelect(file) {
  if (!file || !file.type.startsWith('image/')) return;
  if (file.size > 5 * 1024 * 1024) { showToast('Image must be under 5MB', 'err'); return; }
  imageFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('previewImg').src = e.target.result;
    document.getElementById('filePreview').style.display = '';
    document.getElementById('uploadZone').style.display  = 'none';
  };
  reader.readAsDataURL(file);
}

function addCustomTech() {
  const input = document.getElementById('customTechInput');
  const tech  = input.value.trim();
  if (!tech) return;
  if (selectedTech.includes(tech)) {
    showToast(`"${tech}" already selected`, 'err'); return;
  }
  // Add to grid if not there
  const existing = document.querySelector(`.tech-chip[data-tech="${tech}"]`);
  if (!existing) {
    TECH_OPTIONS.push(tech);
    const grid = document.getElementById('techGrid');
    const chip = document.createElement('div');
    chip.className = 'tech-chip';
    chip.textContent = tech;
    chip.dataset.tech = tech;
    chip.addEventListener('click', () => toggleTech(tech, chip));
    grid.appendChild(chip);
    toggleTech(tech, chip);
  } else {
    toggleTech(tech, existing);
  }
  input.value = '';
}

// ── Submit ──
async function submitProject() {
  const name = document.getElementById('projNameInput').value.trim();
  const desc = document.getElementById('projDescInput').value.trim();

  if (!name) { showToast('Project name is required', 'err'); return; }
  if (!desc)  { showToast('Description is required', 'err'); return; }
  if (!selectedTech.length) { showToast('Select at least one technology', 'err'); return; }

  const btn = document.getElementById('submitBtn');
  btn.classList.add('loading'); btn.disabled = true;

  const fd = new FormData();
  fd.append('name',        name);
  fd.append('description', desc);
  fd.append('website',     document.getElementById('projWebsiteInput').value.trim());
  fd.append('github',      document.getElementById('projGithubInput').value.trim());
  fd.append('hardware',    document.getElementById('projHardwareInput').value.trim());
  fd.append('software',    document.getElementById('projSoftwareInput').value.trim());
  fd.append('priority',    document.getElementById('projPriorityInput').value || '0');
  fd.append('techStack',   JSON.stringify(selectedTech));
  if (imageFile) fd.append('previewImage', imageFile);

  try {
    const url    = editProjectId ? `/api/projects/${editProjectId}` : '/api/projects';
    const method = editProjectId ? 'PUT' : 'POST';
    const res    = await fetch(url, { method, body: fd });
    const data   = await res.json();

    if (res.ok && (data._id || data.name)) {
      showToast(editProjectId ? '✓ Project updated!' : '✓ Project added!', 'ok');
      setTimeout(() => window.location.href = '/', 1400);
    } else {
      showToast('Error: ' + (data.error || 'Failed to save'), 'err');
    }
  } catch(e) {
    showToast('Network error — try again', 'err');
  }

  btn.classList.remove('loading'); btn.disabled = false;
}

// ── Load edit data ──
async function loadEditData() {
  const params = new URLSearchParams(window.location.search);
  editProjectId = params.get('edit');
  if (!editProjectId) return;

  document.getElementById('pageTitle').textContent  = 'Edit Project';
  document.getElementById('submitLabel').textContent = 'Update Project';

  try {
    const res  = await fetch(`/api/projects/${editProjectId}`);
    if (!res.ok) return;
    const p = await res.json();

    document.getElementById('projNameInput').value     = p.name        || '';
    document.getElementById('projDescInput').value     = p.description || '';
    document.getElementById('projWebsiteInput').value  = p.website     || '';
    document.getElementById('projGithubInput').value   = p.github      || '';
    document.getElementById('projHardwareInput').value = p.hardware    || '';
    document.getElementById('projSoftwareInput').value = p.software    || '';
    document.getElementById('projPriorityInput').value = p.priority    || 0;
    document.getElementById('descCount').textContent   = `${(p.description || '').length} / 500`;

    if (p.techStack && p.techStack.length) {
      selectedTech = [...p.techStack];
      // Add custom techs that don't exist in default list
      p.techStack.forEach(t => {
        if (!TECH_OPTIONS.includes(t)) TECH_OPTIONS.push(t);
      });
      renderTechGrid(TECH_OPTIONS);
      renderSelectedTags();
    }

    if (p.previewImage) {
      document.getElementById('previewImg').src        = p.previewImage;
      document.getElementById('filePreview').style.display = '';
      document.getElementById('uploadZone').style.display  = 'none';
    }
  } catch(e) {
    console.error('Error loading project for edit:', e);
  }
}

// ── Toast ──
function showToast(msg, type = 'ok') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast ${type}`;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}