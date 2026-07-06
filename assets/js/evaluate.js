/* ===========================
   BIM-SIGN Evaluate — JavaScript
   Professional evaluation interface
   =========================== */

document.addEventListener('DOMContentLoaded', function () {

  // ===========================
  // Sample evaluation items
  // (Replace with real data when videos are available)
  // ===========================
  const EVAL_ITEMS = [
    { id: 'EVL-001', gloss: 'TERIMA KASIH', meaning: 'Thank You', method: 'MotionGPT', duration: '2.4s' },
    { id: 'EVL-002', gloss: 'SELAMAT PAGI', meaning: 'Good Morning', method: 'SignGAN', duration: '3.1s' },
    { id: 'EVL-003', gloss: 'MAKAN', meaning: 'Eat', method: 'MotionGPT', duration: '1.8s' },
    { id: 'EVL-004', gloss: 'MINUM', meaning: 'Drink', method: 'MotionGPT', duration: '1.6s' },
    { id: 'EVL-005', gloss: 'TOLONG', meaning: 'Help / Please', method: 'SignGAN', duration: '2.0s' },
    { id: 'EVL-006', gloss: 'MAAF', meaning: 'Sorry', method: 'MotionGPT', duration: '1.9s' },
    { id: 'EVL-007', gloss: 'SAYA', meaning: 'I / Me', method: 'SignGAN', duration: '1.2s' },
    { id: 'EVL-008', gloss: 'RUMAH', meaning: 'House / Home', method: 'MotionGPT', duration: '2.2s' },
    { id: 'EVL-009', gloss: 'SEKOLAH', meaning: 'School', method: 'SignGAN', duration: '2.5s' },
    { id: 'EVL-010', gloss: 'GEMBIRA', meaning: 'Happy', method: 'MotionGPT', duration: '2.8s' },
    { id: 'EVL-011', gloss: 'SEDIH', meaning: 'Sad', method: 'SignGAN', duration: '2.6s' },
    { id: 'EVL-012', gloss: 'IBU', meaning: 'Mother', method: 'MotionGPT', duration: '1.5s' },
    { id: 'EVL-013', gloss: 'BAPA', meaning: 'Father', method: 'SignGAN', duration: '1.4s' },
    { id: 'EVL-014', gloss: 'KAWAN', meaning: 'Friend', method: 'MotionGPT', duration: '1.7s' },
    { id: 'EVL-015', gloss: 'BELAJAR', meaning: 'Study / Learn', method: 'SignGAN', duration: '2.3s' },
  ];

  // ===========================
  // State
  // ===========================
  function loadState() {
    try {
      var saved = localStorage.getItem('bim-eval-state');
      return saved ? JSON.parse(saved) : { evaluator: null, evaluations: {} };
    } catch (e) {
      return { evaluator: null, evaluations: {} };
    }
  }

  function saveState() {
    localStorage.setItem('bim-eval-state', JSON.stringify(state));
  }

  var state = loadState();
  var currentFilter = 'pending';
  var currentItem = null;

  // ===========================
  // DOM Elements
  // ===========================
  var setupSection = document.getElementById('setup-section');
  var evalDashboard = document.getElementById('eval-dashboard');
  var evalForm = document.getElementById('evaluator-form');
  var evalQueue = document.getElementById('eval-queue');
  var wsOverlay = document.getElementById('eval-workspace-overlay');

  // ===========================
  // Init — show setup or dashboard
  // ===========================
  if (state.evaluator) {
    showDashboard();
  } else {
    showSetup();
  }

  // ===========================
  // Setup Form
  // ===========================
  function showSetup() {
    setupSection.style.display = 'block';
    evalDashboard.style.display = 'none';
  }

  function showDashboard() {
    setupSection.style.display = 'none';
    evalDashboard.style.display = 'block';
    updateEvaluatorBar();
    updateStats();
    renderQueue();
  }

  evalForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('eval-name').value.trim();
    var affiliation = document.getElementById('eval-affiliation').value.trim();
    var expertise = document.getElementById('eval-expertise').value;
    var years = document.getElementById('eval-years').value;

    if (!name || !expertise) return;

    state.evaluator = {
      name: name,
      affiliation: affiliation,
      expertise: expertise,
      years: years
    };
    saveState();
    showDashboard();
  });

  // ===========================
  // Evaluator Bar
  // ===========================
  function updateEvaluatorBar() {
    if (!state.evaluator) return;
    var initials = state.evaluator.name.split(' ').map(function (w) { return w[0]; }).join('').toUpperCase().substring(0, 2);
    document.getElementById('eval-avatar').textContent = initials;
    document.getElementById('eval-display-name').textContent = state.evaluator.name;

    var expertiseLabels = {
      'native': 'Native BIM Signer',
      'interpreter': 'Certified Interpreter',
      'educator': 'Sign Language Educator',
      'researcher': 'SL Researcher',
      'learner': 'BIM Learner'
    };
    document.getElementById('eval-display-expertise').textContent =
      (expertiseLabels[state.evaluator.expertise] || state.evaluator.expertise) +
      (state.evaluator.affiliation ? ' • ' + state.evaluator.affiliation : '');
  }

  // ===========================
  // Stats
  // ===========================
  function updateStats() {
    var evaluated = 0, approved = 0, rejected = 0, needsWork = 0;
    for (var key in state.evaluations) {
      evaluated++;
      var status = state.evaluations[key].status;
      if (status === 'approved') approved++;
      else if (status === 'rejected') rejected++;
      else if (status === 'needs-work') needsWork++;
    }
    var remaining = EVAL_ITEMS.length - evaluated;

    document.getElementById('stat-evaluated').textContent = evaluated;
    document.getElementById('stat-approved').textContent = approved;
    document.getElementById('stat-rejected').textContent = rejected;
    document.getElementById('stat-remaining').textContent = remaining;

    // Tab counts
    document.getElementById('tab-pending-count').textContent = remaining;
    document.getElementById('tab-approved-count').textContent = approved;
    document.getElementById('tab-needs-count').textContent = needsWork;
    document.getElementById('tab-rejected-count').textContent = rejected;
  }

  // ===========================
  // Queue Rendering
  // ===========================
  function renderQueue() {
    var items = EVAL_ITEMS.filter(function (item) {
      var evalData = state.evaluations[item.id];
      if (currentFilter === 'pending') return !evalData;
      if (!evalData) return false;
      return evalData.status === currentFilter;
    });

    if (items.length === 0) {
      var emptyMessages = {
        'pending': { icon: '✅', text: 'All items have been evaluated! Great work!' },
        'approved': { icon: '📋', text: 'No approved items yet.' },
        'needs-work': { icon: '📋', text: 'No items marked as needing work.' },
        'rejected': { icon: '📋', text: 'No rejected items.' }
      };
      var msg = emptyMessages[currentFilter] || { icon: '📋', text: 'No items found.' };
      evalQueue.innerHTML =
        '<div class="empty-state">' +
          '<span class="empty-icon">' + msg.icon + '</span>' +
          '<p>' + msg.text + '</p>' +
        '</div>';
      return;
    }

    evalQueue.innerHTML = items.map(function (item) {
      var evalData = state.evaluations[item.id];
      var statusClass = evalData ? evalData.status : 'pending';
      var statusLabel = statusClass === 'needs-work' ? 'Needs Work' : statusClass.charAt(0).toUpperCase() + statusClass.slice(1);

      var ratingDisplay = '';
      if (evalData) {
        ratingDisplay =
          '<span>⭐ ' + evalData.overallRating + '/5</span>';
      }

      return '<div class="eval-queue-card" data-item-id="' + item.id + '">' +
        '<div class="card-top">' +
          '<span class="card-id">' + item.id + '</span>' +
          '<span class="eval-status ' + statusClass + '">' + statusLabel + '</span>' +
        '</div>' +
        '<div class="card-gloss">' + item.gloss + '</div>' +
        '<div class="card-meaning">' + item.meaning + '</div>' +
        '<div class="card-meta">' +
          '<span>🤖 ' + item.method + '</span>' +
          '<span>⏱ ' + item.duration + '</span>' +
          ratingDisplay +
        '</div>' +
      '</div>';
    }).join('');

    // Click handlers
    evalQueue.querySelectorAll('.eval-queue-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var itemId = this.getAttribute('data-item-id');
        var item = EVAL_ITEMS.find(function (i) { return i.id === itemId; });
        if (item) openWorkspace(item);
      });
    });
  }

  // Filter tabs
  document.querySelectorAll('.eval-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.eval-tab').forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
      currentFilter = this.getAttribute('data-filter');
      renderQueue();
    });
  });

  // ===========================
  // Workspace
  // ===========================
  function openWorkspace(item) {
    currentItem = item;
    document.getElementById('ws-gloss-title').textContent = item.gloss + ' (' + item.meaning + ')';
    wsOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Reset ratings
    var existingEval = state.evaluations[item.id];
    if (existingEval) {
      document.getElementById('rating-accuracy').value = existingEval.accuracy || 3;
      document.getElementById('rating-fluency').value = existingEval.fluency || 3;
      document.getElementById('rating-comprehension').value = existingEval.comprehension || 3;
      document.getElementById('rating-overall').value = existingEval.overallRating || 3;
      document.getElementById('eval-comment').value = existingEval.comment || '';
    } else {
      document.getElementById('rating-accuracy').value = 3;
      document.getElementById('rating-fluency').value = 3;
      document.getElementById('rating-comprehension').value = 3;
      document.getElementById('rating-overall').value = 3;
      document.getElementById('eval-comment').value = '';
    }
    updateRatingValues();
  }

  function closeWorkspace() {
    wsOverlay.classList.remove('open');
    document.body.style.overflow = '';
    currentItem = null;
  }

  document.getElementById('ws-close').addEventListener('click', closeWorkspace);
  document.getElementById('ws-cancel').addEventListener('click', closeWorkspace);
  wsOverlay.addEventListener('click', function (e) {
    if (e.target === wsOverlay) closeWorkspace();
  });

  // Rating slider value display
  function updateRatingValues() {
    document.getElementById('val-accuracy').textContent = document.getElementById('rating-accuracy').value;
    document.getElementById('val-fluency').textContent = document.getElementById('rating-fluency').value;
    document.getElementById('val-comprehension').textContent = document.getElementById('rating-comprehension').value;
    document.getElementById('val-overall').textContent = document.getElementById('rating-overall').value;
  }

  document.querySelectorAll('.rating-slider').forEach(function (slider) {
    slider.addEventListener('input', updateRatingValues);
  });

  // Submit evaluation
  function submitEvaluation(status) {
    if (!currentItem) return;

    state.evaluations[currentItem.id] = {
      status: status,
      accuracy: parseInt(document.getElementById('rating-accuracy').value),
      fluency: parseInt(document.getElementById('rating-fluency').value),
      comprehension: parseInt(document.getElementById('rating-comprehension').value),
      overallRating: parseInt(document.getElementById('rating-overall').value),
      comment: document.getElementById('eval-comment').value.trim(),
      timestamp: new Date().toISOString(),
      evaluator: state.evaluator ? state.evaluator.name : 'Anonymous'
    };

    saveState();
    closeWorkspace();
    updateStats();
    renderQueue();
  }

  document.getElementById('ws-approve').addEventListener('click', function () {
    submitEvaluation('approved');
  });

  document.getElementById('ws-improve').addEventListener('click', function () {
    submitEvaluation('needs-work');
  });

  document.getElementById('ws-reject').addEventListener('click', function () {
    submitEvaluation('rejected');
  });

  // ===========================
  // Playback Controls (placeholder)
  // ===========================
  var isLooping = false;
  var currentSpeed = 1;

  document.getElementById('pb-loop').addEventListener('click', function () {
    isLooping = !isLooping;
    this.classList.toggle('active', isLooping);
  });

  document.getElementById('pb-slow').addEventListener('click', function () {
    setSpeed(0.5);
    updateSpeedButtons(this);
  });

  document.getElementById('pb-normal').addEventListener('click', function () {
    setSpeed(1);
    updateSpeedButtons(this);
  });

  document.getElementById('pb-fast').addEventListener('click', function () {
    setSpeed(1.5);
    updateSpeedButtons(this);
  });

  function setSpeed(speed) {
    currentSpeed = speed;
    // Apply to any videos if present
    document.querySelectorAll('.video-panel video').forEach(function (v) {
      v.playbackRate = speed;
    });
  }

  function updateSpeedButtons(active) {
    ['pb-slow', 'pb-normal', 'pb-fast'].forEach(function (id) {
      document.getElementById(id).classList.remove('active');
    });
    active.classList.add('active');
  }

  // Play/Pause
  document.getElementById('pb-play').addEventListener('click', function () {
    var videos = document.querySelectorAll('.video-panel video');
    if (videos.length === 0) return;
    var isPlaying = !videos[0].paused;
    videos.forEach(function (v) {
      if (isPlaying) v.pause();
      else v.play();
    });
    this.textContent = isPlaying ? '▶' : '⏸';
  });

  // Restart
  document.getElementById('pb-restart').addEventListener('click', function () {
    document.querySelectorAll('.video-panel video').forEach(function (v) {
      v.currentTime = 0;
      v.play();
    });
    document.getElementById('pb-play').textContent = '⏸';
  });

  // ===========================
  // Export Functions
  // ===========================
  document.getElementById('export-csv').addEventListener('click', function () {
    exportCSV();
  });

  document.getElementById('export-json').addEventListener('click', function () {
    exportJSON();
  });

  function exportCSV() {
    var lines = ['ID,Gloss,Meaning,Method,Status,Accuracy,Fluency,Comprehension,Overall,Comment,Evaluator,Timestamp'];

    EVAL_ITEMS.forEach(function (item) {
      var evalData = state.evaluations[item.id];
      if (evalData) {
        var comment = (evalData.comment || '').replace(/"/g, '""');
        lines.push([
          item.id,
          item.gloss,
          item.meaning,
          item.method,
          evalData.status,
          evalData.accuracy,
          evalData.fluency,
          evalData.comprehension,
          evalData.overallRating,
          '"' + comment + '"',
          evalData.evaluator,
          evalData.timestamp
        ].join(','));
      }
    });

    var csv = lines.join('\n');
    downloadFile(csv, 'bim-sign-evaluation-results.csv', 'text/csv');
  }

  function exportJSON() {
    var results = {
      evaluator: state.evaluator,
      exportDate: new Date().toISOString(),
      evaluations: []
    };

    EVAL_ITEMS.forEach(function (item) {
      var evalData = state.evaluations[item.id];
      if (evalData) {
        results.evaluations.push({
          itemId: item.id,
          gloss: item.gloss,
          meaning: item.meaning,
          generationMethod: item.method,
          evaluation: evalData
        });
      }
    });

    var json = JSON.stringify(results, null, 2);
    downloadFile(json, 'bim-sign-evaluation-results.json', 'application/json');
  }

  function downloadFile(content, filename, type) {
    var blob = new Blob([content], { type: type });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 3000);
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

});
