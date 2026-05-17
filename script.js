/* ===== PORTFOLIO SCRIPT ===== */

// ===== LOADER =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loaderProgress');
  let width = 0;
  const interval = setInterval(() => {
    width += Math.random() * 15;
    if (width >= 100) {
      width = 100;
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAnimations();
      }, 300);
    }
    progress.style.width = width + '%';
  }, 80);
});

document.body.style.overflow = 'hidden';

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateCursor() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-card, .skill-category, .contact-method').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorFollower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorFollower.classList.remove('hover');
  });
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  handleBackToTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.width = (Math.random() * 3 + 1) + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = ['#6c63ff', '#ff6584', '#43e97b'][Math.floor(Math.random() * 3)];
    container.appendChild(particle);
  }
}
createParticles();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + (el.closest('.stat') ? '+' : '');
  }, 16);
}

// ===== SKILL BARS =====
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate counters when hero stats visible
        if (entry.target.classList.contains('hero-stats')) {
          entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
        }
        // Animate skill bars
        if (entry.target.classList.contains('skills-grid')) {
          setTimeout(animateSkillBars, 300);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });

  // Observe hero stats
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);

  // Observe skills grid
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) observer.observe(skillsGrid);
}

// ===== ADD REVEAL CLASSES =====
function addRevealClasses() {
  const revealEls = [
    { selector: '.about-image-wrapper', cls: 'reveal-left' },
    { selector: '.about-content', cls: 'reveal-right' },
    { selector: '.skill-category', cls: 'reveal' },
    { selector: '.project-card', cls: 'reveal' },
    { selector: '.process-step', cls: 'reveal' },
    { selector: '.contact-info', cls: 'reveal-left' },
    { selector: '.contact-form-wrapper', cls: 'reveal-right' },
    { selector: '.section-header', cls: 'reveal' },
  ];

  revealEls.forEach(({ selector, cls }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add(cls);
      el.style.transitionDelay = (i * 0.1) + 's';
    });
  });
}

// ===== PROJECT FILTERS =====
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name: { el: document.getElementById('name'), error: document.getElementById('nameError') },
    email: { el: document.getElementById('email'), error: document.getElementById('emailError') },
    subject: { el: document.getElementById('subject'), error: document.getElementById('subjectError') },
    message: { el: document.getElementById('message'), error: document.getElementById('messageError') },
  };

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateField(key) {
    const { el, error } = fields[key];
    let valid = true;
    el.classList.remove('error');
    error.textContent = '';

    if (!el.value.trim()) {
      error.textContent = 'This field is required.';
      el.classList.add('error');
      valid = false;
    } else if (key === 'email' && !validateEmail(el.value)) {
      error.textContent = 'Please enter a valid email address.';
      el.classList.add('error');
      valid = false;
    } else if (key === 'name' && el.value.trim().length < 2) {
      error.textContent = 'Name must be at least 2 characters.';
      el.classList.add('error');
      valid = false;
    } else if (key === 'message' && el.value.trim().length < 10) {
      error.textContent = 'Message must be at least 10 characters.';
      el.classList.add('error');
      valid = false;
    }
    return valid;
  }

  // Real-time validation
  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('error')) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allValid = true;
    Object.keys(fields).forEach(key => {
      if (!validateField(key)) allValid = false;
    });

    if (!allValid) return;

    const btn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const successMsg = document.getElementById('formSuccess');

    btn.disabled = true;
    btnText.textContent = 'Sending...';

    // Simulate form submission
    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = 'Send Message';
      form.reset();
      successMsg.classList.add('show');
      setTimeout(() => successMsg.classList.remove('show'), 5000);
    }, 1500);
  });
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn = form.querySelector('button');
    btn.textContent = '✓ Subscribed!';
    btn.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
    }, 3000);
  });
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
function handleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== TILT EFFECT ON PROJECT CARDS =====
function initTiltEffect() {
  document.querySelectorAll('.project-card:not(.future-card)').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -5;
      const rotateY = (x - centerX) / centerX * 5;
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
  const roles = ['Creative Developer', 'UI/UX Designer', 'Full Stack Engineer', 'Problem Solver'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const titleLines = document.querySelectorAll('.title-line');
  if (!titleLines[1]) return;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      titleLines[1].textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      titleLines[1].textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 300;
    }
    setTimeout(type, speed);
  }

  // Start typing after loader
  setTimeout(type, 2000);
}

// ===== INIT ALL =====
function initAnimations() {
  addRevealClasses();
  initScrollReveal();
  initProjectFilters();
  initContactForm();
  initNewsletterForm();
  initTiltEffect();
  initTypingEffect();
}

// ===== PERFORMANCE: Passive scroll listeners =====
window.addEventListener('scroll', () => {}, { passive: true });
