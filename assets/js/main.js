/* ===========================
   BIM-SIGN — Main JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', function () {

  // ===========================
  // Navbar scroll effect
  // ===========================
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('nav-links');
  const navToggle = document.getElementById('nav-toggle');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navToggle) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  });

  // ===========================
  // Active nav link on scroll
  // ===========================
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightActiveSection() {
    let scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navAnchors.forEach(function (a) {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection, { passive: true });

  // ===========================
  // Scroll animations (Intersection Observer)
  // ===========================
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    animatedElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ===========================
  // Counter animation
  // ===========================
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const value = Math.round(eased * target);

      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        // Add suffix if needed
        const suffix = el.getAttribute('data-suffix');
        if (suffix) {
          el.textContent = target.toLocaleString() + suffix;
        }
      }
    }

    requestAnimationFrame(update);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  // ===========================
  // Download button handler
  // ===========================
  var fullBtn = document.getElementById('download-full');
  if (fullBtn) {
    fullBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.open('https://drive.google.com/drive/folders/1xRXKqcONB4fHpRZZRKYGf3K8-irMRvKQ?usp=sharing', '_blank');
    });
  }

  // Also handle hero download button
  var heroBtn = document.getElementById('hero-download-btn');
  if (heroBtn) {
    heroBtn.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('download').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ===========================
  // Particle Background
  // ===========================
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let width, height;

    function resizeCanvas() {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 15000), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 212, 255, ' + (0.08 * (1 - dist / 150)) + ')';
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(function (p) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, ' + p.opacity + ')';
        ctx.fill();
      });
    }

    function updateParticles() {
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });
    }

    function animateParticles() {
      updateParticles();
      drawParticles();
      animationId = requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener('resize', function () {
      resizeCanvas();
      createParticles();
    });

    // Pause animation when hero is not visible
    if ('IntersectionObserver' in window) {
      const heroSection = document.querySelector('.hero');
      const heroObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          if (!animationId) animateParticles();
        } else {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      }, { threshold: 0.1 });

      if (heroSection) heroObserver.observe(heroSection);
    }
  }

  // ===========================
  // Smooth scroll for anchor links
  // ===========================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
