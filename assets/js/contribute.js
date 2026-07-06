/* ===========================
   BIM-SIGN Contribute — JavaScript
   Gamified recording with download + Google Form upload
   =========================== */

document.addEventListener('DOMContentLoaded', function () {

  // ===========================
  // Gloss Data (sample BIM glosses)
  // ===========================
  const GLOSSES = [
    { id: 'terima-kasih', name: 'TERIMA KASIH', meaning: 'Thank You', xp: 50 },
    { id: 'selamat-pagi', name: 'SELAMAT PAGI', meaning: 'Good Morning', xp: 50 },
    { id: 'selamat-petang', name: 'SELAMAT PETANG', meaning: 'Good Afternoon', xp: 50 },
    { id: 'selamat-malam', name: 'SELAMAT MALAM', meaning: 'Good Night', xp: 50 },
    { id: 'selamat-tinggal', name: 'SELAMAT TINGGAL', meaning: 'Goodbye', xp: 50 },
    { id: 'maaf', name: 'MAAF', meaning: 'Sorry', xp: 50 },
    { id: 'tolong', name: 'TOLONG', meaning: 'Help / Please', xp: 50 },
    { id: 'ya', name: 'YA', meaning: 'Yes', xp: 30 },
    { id: 'tidak', name: 'TIDAK', meaning: 'No', xp: 30 },
    { id: 'saya', name: 'SAYA', meaning: 'I / Me', xp: 30 },
    { id: 'awak', name: 'AWAK', meaning: 'You', xp: 30 },
    { id: 'dia', name: 'DIA', meaning: 'He / She', xp: 30 },
    { id: 'mereka', name: 'MEREKA', meaning: 'They / Them', xp: 40 },
    { id: 'makan', name: 'MAKAN', meaning: 'Eat', xp: 50 },
    { id: 'minum', name: 'MINUM', meaning: 'Drink', xp: 50 },
    { id: 'tidur', name: 'TIDUR', meaning: 'Sleep', xp: 50 },
    { id: 'belajar', name: 'BELAJAR', meaning: 'Study / Learn', xp: 50 },
    { id: 'kerja', name: 'KERJA', meaning: 'Work', xp: 50 },
    { id: 'rumah', name: 'RUMAH', meaning: 'House / Home', xp: 50 },
    { id: 'sekolah', name: 'SEKOLAH', meaning: 'School', xp: 50 },
    { id: 'hospital', name: 'HOSPITAL', meaning: 'Hospital', xp: 50 },
    { id: 'polis', name: 'POLIS', meaning: 'Police', xp: 50 },
    { id: 'doktor', name: 'DOKTOR', meaning: 'Doctor', xp: 50 },
    { id: 'cikgu', name: 'CIKGU', meaning: 'Teacher', xp: 50 },
    { id: 'ibu', name: 'IBU', meaning: 'Mother', xp: 40 },
    { id: 'bapa', name: 'BAPA', meaning: 'Father', xp: 40 },
    { id: 'adik', name: 'ADIK', meaning: 'Younger Sibling', xp: 40 },
    { id: 'abang', name: 'ABANG', meaning: 'Older Brother', xp: 40 },
    { id: 'kakak', name: 'KAKAK', meaning: 'Older Sister', xp: 40 },
    { id: 'kawan', name: 'KAWAN', meaning: 'Friend', xp: 40 },
    { id: 'sayang', name: 'SAYANG', meaning: 'Love / Dear', xp: 50 },
    { id: 'gembira', name: 'GEMBIRA', meaning: 'Happy', xp: 50 },
    { id: 'sedih', name: 'SEDIH', meaning: 'Sad', xp: 50 },
    { id: 'marah', name: 'MARAH', meaning: 'Angry', xp: 50 },
    { id: 'takut', name: 'TAKUT', meaning: 'Scared / Afraid', xp: 50 },
    { id: 'cantik', name: 'CANTIK', meaning: 'Beautiful / Pretty', xp: 50 },
    { id: 'besar', name: 'BESAR', meaning: 'Big / Large', xp: 40 },
    { id: 'kecil', name: 'KECIL', meaning: 'Small', xp: 40 },
    { id: 'panas', name: 'PANAS', meaning: 'Hot', xp: 40 },
    { id: 'sejuk', name: 'SEJUK', meaning: 'Cold', xp: 40 },
    { id: 'air', name: 'AIR', meaning: 'Water', xp: 40 },
    { id: 'nasi', name: 'NASI', meaning: 'Rice', xp: 40 },
    { id: 'kucing', name: 'KUCING', meaning: 'Cat', xp: 50 },
    { id: 'anjing', name: 'ANJING', meaning: 'Dog', xp: 50 },
    { id: 'kereta', name: 'KERETA', meaning: 'Car', xp: 50 },
    { id: 'bas', name: 'BAS', meaning: 'Bus', xp: 40 },
    { id: 'wang', name: 'WANG', meaning: 'Money', xp: 40 },
    { id: 'masa', name: 'MASA', meaning: 'Time', xp: 40 },
    { id: 'hari', name: 'HARI', meaning: 'Day', xp: 30 },
    { id: 'minggu', name: 'MINGGU', meaning: 'Week', xp: 30 },
    { id: 'bulan', name: 'BULAN', meaning: 'Month / Moon', xp: 40 },
    { id: 'tahun', name: 'TAHUN', meaning: 'Year', xp: 30 },
    { id: 'malaysia', name: 'MALAYSIA', meaning: 'Malaysia', xp: 60 },
    { id: 'bahasa', name: 'BAHASA', meaning: 'Language', xp: 50 },
    { id: 'isyarat', name: 'ISYARAT', meaning: 'Sign / Signal', xp: 60 },
    { id: 'pekak', name: 'PEKAK', meaning: 'Deaf', xp: 60 },
    { id: 'faham', name: 'FAHAM', meaning: 'Understand', xp: 50 },
    { id: 'tahu', name: 'TAHU', meaning: 'Know', xp: 40 },
    { id: 'apa', name: 'APA', meaning: 'What', xp: 30 },
    { id: 'siapa', name: 'SIAPA', meaning: 'Who', xp: 30 },
    { id: 'bila', name: 'BILA', meaning: 'When', xp: 30 },
    { id: 'mana', name: 'MANA', meaning: 'Where', xp: 30 },
    { id: 'kenapa', name: 'KENAPA', meaning: 'Why', xp: 30 },
    { id: 'bagaimana', name: 'BAGAIMANA', meaning: 'How', xp: 40 },
  ];

  // Google Form URL — replace with your actual Google Form link
  const GOOGLE_FORM_URL = 'https://forms.gle/67JC9zEq36d7Uzeq5';

  // ===========================
  // State (localStorage)
  // ===========================
  function loadState() {
    try {
      const saved = localStorage.getItem('bim-contribute-state');
      return saved ? JSON.parse(saved) : { recorded: [], xp: 0 };
    } catch (e) {
      return { recorded: [], xp: 0 };
    }
  }

  function saveState() {
    localStorage.setItem('bim-contribute-state', JSON.stringify(state));
  }

  let state = loadState();

  // ===========================
  // Level system
  // ===========================
  const LEVELS = [
    { name: 'Newcomer', minXP: 0, badge: 'bronze', icon: '🌱' },
    { name: 'Contributor', minXP: 200, badge: 'bronze', icon: '🤟' },
    { name: 'Active Signer', minXP: 500, badge: 'silver', icon: '⭐' },
    { name: 'BIM Champion', minXP: 1000, badge: 'gold', icon: '🏆' },
    { name: 'BIM Legend', minXP: 2000, badge: 'diamond', icon: '💎' },
  ];

  function getLevel(xp) {
    let level = LEVELS[0];
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].minXP) {
        level = LEVELS[i];
        break;
      }
    }
    return level;
  }

  function getNextLevel(xp) {
    for (let i = 0; i < LEVELS.length; i++) {
      if (xp < LEVELS[i].minXP) return LEVELS[i];
    }
    return null;
  }

  // ===========================
  // Dashboard update
  // ===========================
  function updateDashboard() {
    document.getElementById('dash-recorded').textContent = state.recorded.length;
    document.getElementById('dash-xp').textContent = state.xp.toLocaleString();
    document.getElementById('dash-remaining').textContent = GLOSSES.length - state.recorded.length;

    const level = getLevel(state.xp);
    const nextLevel = getNextLevel(state.xp);
    const levelEl = document.getElementById('dash-level');
    levelEl.innerHTML = '<span class="level-badge ' + level.badge + '">' + level.icon + ' ' + level.name + '</span>';

    // XP Progress
    const fill = document.getElementById('xp-fill');
    const text = document.getElementById('xp-text');
    if (nextLevel) {
      const prevMin = level.minXP;
      const range = nextLevel.minXP - prevMin;
      const progress = ((state.xp - prevMin) / range) * 100;
      fill.style.width = Math.min(progress, 100) + '%';
      text.textContent = state.xp + ' / ' + nextLevel.minXP + ' XP to ' + nextLevel.name;
    } else {
      fill.style.width = '100%';
      text.textContent = 'MAX LEVEL! 🎉';
    }
  }

  // ===========================
  // Gloss Grid
  // ===========================
  const glossGrid = document.getElementById('gloss-grid');
  const glossSearch = document.getElementById('gloss-search');
  const glossCount = document.getElementById('gloss-count');
  let currentFilter = 'all';

  function renderGlossGrid() {
    const searchTerm = glossSearch.value.toLowerCase().trim();
    let filtered = GLOSSES.filter(function (g) {
      const matchesSearch = g.name.toLowerCase().includes(searchTerm) ||
                            g.meaning.toLowerCase().includes(searchTerm);
      const isRecorded = state.recorded.includes(g.id);
      if (currentFilter === 'pending') return matchesSearch && !isRecorded;
      if (currentFilter === 'recorded') return matchesSearch && isRecorded;
      return matchesSearch;
    });

    glossCount.textContent = 'Showing ' + filtered.length + ' glosses';

    if (filtered.length === 0) {
      glossGrid.innerHTML = '<div class="empty-state">' +
        '<span class="empty-icon">🔍</span>' +
        '<p>No glosses found. Try a different search or filter.</p>' +
        '</div>';
      return;
    }

    glossGrid.innerHTML = filtered.map(function (g) {
      const isRecorded = state.recorded.includes(g.id);
      return '<div class="gloss-card' + (isRecorded ? ' recorded' : '') + '" data-gloss-id="' + g.id + '">' +
        '<div class="gloss-name">' + g.name + '</div>' +
        '<div class="gloss-meaning">' + g.meaning + '</div>' +
        '<div class="gloss-xp">+' + g.xp + ' XP</div>' +
        '</div>';
    }).join('');

    // Attach click handlers
    glossGrid.querySelectorAll('.gloss-card').forEach(function (card) {
      card.addEventListener('click', function () {
        const glossId = this.getAttribute('data-gloss-id');
        const gloss = GLOSSES.find(function (g) { return g.id === glossId; });
        if (gloss) openStudio(gloss);
      });
    });
  }

  // Search
  glossSearch.addEventListener('input', renderGlossGrid);

  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.filter-tab').forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
      currentFilter = this.getAttribute('data-filter');
      renderGlossGrid();
    });
  });

  // ===========================
  // Recording Studio
  // ===========================
  const studioOverlay = document.getElementById('studio-overlay');
  const studioBody = document.getElementById('studio-body');
  const studioActions = document.getElementById('studio-actions');
  const studioClose = document.getElementById('studio-close');
  const studioGlossTitle = document.getElementById('studio-gloss-title');

  let currentGloss = null;
  let currentStep = 1;
  let mediaStream = null;
  let mediaRecorder = null;
  let recordedChunks = [];
  let recordedBlob = null;
  let recordingTimer = null;
  let recordingSeconds = 0;

  function openStudio(gloss) {
    currentGloss = gloss;
    currentStep = 1;
    studioGlossTitle.textContent = gloss.name;
    recordedBlob = null;
    recordedChunks = [];
    studioOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateWizardUI();
    renderStep();
  }

  function closeStudio() {
    studioOverlay.classList.remove('open');
    document.body.style.overflow = '';
    stopCamera();
    if (recordingTimer) clearInterval(recordingTimer);
    currentGloss = null;
    currentStep = 1;
  }

  studioClose.addEventListener('click', closeStudio);
  studioOverlay.addEventListener('click', function (e) {
    if (e.target === studioOverlay) closeStudio();
  });

  // Wizard UI
  function updateWizardUI() {
    document.querySelectorAll('.wizard-step').forEach(function (step) {
      const stepNum = parseInt(step.getAttribute('data-step'));
      step.classList.remove('active', 'completed');
      if (stepNum === currentStep) step.classList.add('active');
      else if (stepNum < currentStep) step.classList.add('completed');
    });
    document.querySelectorAll('.wizard-connector').forEach(function (conn, i) {
      conn.classList.toggle('completed', i + 1 < currentStep);
    });
  }

  // Render step content
  function renderStep() {
    switch (currentStep) {
      case 1: renderStep1(); break;
      case 2: renderStep2(); break;
      case 3: renderStep3(); break;
      case 4: renderStep4(); break;
    }
    updateWizardUI();
  }

  // Step 1 — Prepare
  function renderStep1() {
    studioBody.innerHTML =
      '<div class="gloss-info-display">' +
        '<div class="gloss-big">' + currentGloss.name + '</div>' +
        '<div class="gloss-meaning-big">' + currentGloss.meaning + '</div>' +
        '<ul class="instruction-tips">' +
          '<li>Stand or sit facing the camera with good lighting</li>' +
          '<li>Ensure your upper body and hands are visible in the frame</li>' +
          '<li>Use a plain, solid-colored background if possible</li>' +
          '<li>Perform the sign clearly at a natural speed</li>' +
          '<li>You will have a 3-second countdown before recording begins</li>' +
          '<li>Recording will last up to 10 seconds</li>' +
        '</ul>' +
      '</div>';

    studioActions.innerHTML =
      '<button class="btn btn-ghost" id="btn-cancel">Cancel</button>' +
      '<button class="btn btn-primary" id="btn-next-camera">Start Camera →</button>';

    document.getElementById('btn-cancel').addEventListener('click', closeStudio);
    document.getElementById('btn-next-camera').addEventListener('click', function () {
      currentStep = 2;
      renderStep();
    });
  }

  // Step 2 — Record
  async function renderStep2() {
    studioBody.innerHTML =
      '<div class="camera-wrapper" id="camera-wrapper">' +
        '<video id="camera-preview" autoplay muted playsinline></video>' +
        '<div class="recording-indicator" id="rec-indicator">' +
          '<span class="rec-dot"></span> REC' +
        '</div>' +
        '<div class="recording-timer" id="rec-timer">00:00</div>' +
        '<div class="gloss-overlay">' + currentGloss.name + '</div>' +
        '<div class="countdown-overlay" id="countdown-overlay">' +
          '<div class="countdown-number" id="countdown-number">3</div>' +
        '</div>' +
      '</div>';

    studioActions.innerHTML =
      '<button class="btn btn-ghost" id="btn-back-prepare">← Back</button>' +
      '<button class="btn btn-record" id="btn-start-record">🔴 Start Recording</button>';

    document.getElementById('btn-back-prepare').addEventListener('click', function () {
      stopCamera();
      currentStep = 1;
      renderStep();
    });

    document.getElementById('btn-start-record').addEventListener('click', startCountdownAndRecord);

    // Start camera
    await startCamera();
  }

  async function startCamera() {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false
      });
      var video = document.getElementById('camera-preview');
      if (video) {
        video.srcObject = mediaStream;
      }
    } catch (err) {
      studioBody.innerHTML =
        '<div class="gloss-info-display">' +
          '<div style="font-size: 3rem; margin-bottom: 16px;">📷</div>' +
          '<h4 style="margin-bottom: 8px;">Camera Access Required</h4>' +
          '<p style="color: var(--text-secondary);">Please allow camera access in your browser to record sign language videos.</p>' +
          '<p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 12px;">Error: ' + err.message + '</p>' +
        '</div>';
      studioActions.innerHTML =
        '<button class="btn btn-ghost" id="btn-cancel-cam">Cancel</button>' +
        '<button class="btn btn-primary" id="btn-retry-cam">Retry</button>';
      document.getElementById('btn-cancel-cam').addEventListener('click', closeStudio);
      document.getElementById('btn-retry-cam').addEventListener('click', function () { renderStep(); });
    }
  }

  function stopCamera() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(function (track) { track.stop(); });
      mediaStream = null;
    }
  }

  // Countdown + Recording
  function startCountdownAndRecord() {
    var btn = document.getElementById('btn-start-record');
    if (btn) btn.disabled = true;

    var overlay = document.getElementById('countdown-overlay');
    var countdownNum = document.getElementById('countdown-number');
    overlay.classList.add('active');

    var count = 3;
    countdownNum.textContent = count;

    var countdownInterval = setInterval(function () {
      count--;
      if (count > 0) {
        countdownNum.textContent = count;
      } else {
        clearInterval(countdownInterval);
        overlay.classList.remove('active');
        startRecording();
      }
    }, 1000);
  }

  function startRecording() {
    recordedChunks = [];
    recordingSeconds = 0;

    // Determine supported MIME type
    var mimeType = 'video/webm;codecs=vp9';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'video/webm;codecs=vp8';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'video/mp4';
        }
      }
    }

    try {
      mediaRecorder = new MediaRecorder(mediaStream, { mimeType: mimeType });
    } catch (e) {
      mediaRecorder = new MediaRecorder(mediaStream);
    }

    mediaRecorder.ondataavailable = function (e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = function () {
      recordedBlob = new Blob(recordedChunks, { type: mediaRecorder.mimeType || 'video/webm' });
      stopCamera();
      currentStep = 3;
      renderStep();
    };

    mediaRecorder.start(100); // collect data every 100ms

    // UI updates
    var indicator = document.getElementById('rec-indicator');
    if (indicator) indicator.classList.add('active');

    // Update actions
    studioActions.innerHTML =
      '<div style="font-size: 0.9rem; color: var(--text-muted);">Recording in progress...</div>' +
      '<button class="btn btn-record recording" id="btn-stop-record">⬜ Stop Recording</button>';

    document.getElementById('btn-stop-record').addEventListener('click', stopRecording);

    // Timer
    var timerEl = document.getElementById('rec-timer');
    recordingTimer = setInterval(function () {
      recordingSeconds++;
      var mins = String(Math.floor(recordingSeconds / 60)).padStart(2, '0');
      var secs = String(recordingSeconds % 60).padStart(2, '0');
      if (timerEl) timerEl.textContent = mins + ':' + secs;

      // Auto-stop after 10 seconds
      if (recordingSeconds >= 10) {
        stopRecording();
      }
    }, 1000);
  }

  function stopRecording() {
    if (recordingTimer) {
      clearInterval(recordingTimer);
      recordingTimer = null;
    }
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  }

  // Step 3 — Review
  function renderStep3() {
    var videoURL = URL.createObjectURL(recordedBlob);

    studioBody.innerHTML =
      '<div style="text-align: center; margin-bottom: 16px;">' +
        '<p style="color: var(--text-secondary); margin-bottom: 16px;">Review your recording for <strong style="color: var(--accent-blue);">' + currentGloss.name + '</strong></p>' +
      '</div>' +
      '<div class="camera-wrapper" id="review-wrapper">' +
        '<video id="review-video" src="' + videoURL + '" controls playsinline style="background: #000;"></video>' +
        '<div class="gloss-overlay">' + currentGloss.name + '</div>' +
      '</div>';

    studioActions.innerHTML =
      '<button class="btn btn-ghost" id="btn-retake">🔄 Retake</button>' +
      '<button class="btn btn-success" id="btn-accept">✅ Download &amp; Submit</button>';

    document.getElementById('btn-retake').addEventListener('click', function () {
      URL.revokeObjectURL(videoURL);
      recordedBlob = null;
      recordedChunks = [];
      currentStep = 2;
      renderStep();
    });

    document.getElementById('btn-accept').addEventListener('click', function () {
      // Download the video
      downloadVideo();
      // Mark as recorded, award XP
      if (!state.recorded.includes(currentGloss.id)) {
        state.recorded.push(currentGloss.id);
        state.xp += currentGloss.xp;
        saveState();
      }
      currentStep = 4;
      renderStep();
      URL.revokeObjectURL(videoURL);
    });
  }

  // Download video to local device
  function downloadVideo() {
    if (!recordedBlob) return;
    var ext = recordedBlob.type.includes('mp4') ? 'mp4' : 'webm';
    var filename = 'BIM-SIGN_' + currentGloss.id + '_' + Date.now() + '.' + ext;
    var a = document.createElement('a');
    a.href = URL.createObjectURL(recordedBlob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Note: URL will be revoked after a short delay
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
  }

  // Step 4 — Success + Google Form
  function renderStep4() {
    // Trigger confetti
    launchConfetti();

    studioBody.innerHTML =
      '<div class="success-screen">' +
        '<span class="success-icon">🎉</span>' +
        '<h4>Recording Saved!</h4>' +
        '<p>Your video for <strong style="color: var(--accent-blue);">' + currentGloss.name + '</strong> has been downloaded.</p>' +
        '<div class="xp-earned">+' + currentGloss.xp + ' XP Earned!</div>' +
        '<div style="margin-top: 28px; padding: 20px; background: rgba(0, 191, 165, 0.08); border: 1px solid rgba(0, 191, 165, 0.2); border-radius: 12px;">' +
          '<p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 16px;">📤 <strong style="color: var(--text-primary);">Next Step:</strong> Upload your recorded video through our Google Form to officially contribute to the BIM-SIGN dataset.</p>' +
          '<a href="' + GOOGLE_FORM_URL + '" target="_blank" rel="noopener" class="btn btn-success" style="display: inline-flex;">📋 Open Upload Form</a>' +
        '</div>' +
      '</div>';

    studioActions.innerHTML =
      '<button class="btn btn-ghost" id="btn-record-another">Record Another</button>' +
      '<button class="btn btn-primary" id="btn-done">Done</button>';

    document.getElementById('btn-record-another').addEventListener('click', function () {
      closeStudio();
      updateDashboard();
      renderGlossGrid();
    });

    document.getElementById('btn-done').addEventListener('click', function () {
      closeStudio();
      updateDashboard();
      renderGlossGrid();
    });

    // Update dashboard stats immediately
    updateDashboard();
  }

  // ===========================
  // Confetti Animation
  // ===========================
  function launchConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var particles = [];
    var colors = ['#00d4ff', '#7c4dff', '#ff4081', '#00bfa5', '#ffd700', '#ff6f00'];

    for (var i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.8) * 18 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.3 + Math.random() * 0.2,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }

    var frame = 0;
    var maxFrames = 120;

    function animate() {
      if (frame >= maxFrames) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(function (p) {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - frame / maxFrames);
        p.vx *= 0.99;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      frame++;
      requestAnimationFrame(animate);
    }

    animate();
  }

  // ===========================
  // Scroll Animations
  // ===========================
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ===========================
  // Mobile nav toggle
  // ===========================
  var navToggle = document.getElementById('nav-toggle');
  var navLinksEl = document.getElementById('nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinksEl.classList.toggle('open');
    });
  }

  // ===========================
  // Initialize
  // ===========================
  updateDashboard();
  renderGlossGrid();

});
