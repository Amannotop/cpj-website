const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    navToggle.textContent = isOpen ? '✕' : '☰';
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.pageYOffset > 10);
}, { passive: true });

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

document.querySelectorAll('.issue-topic-header').forEach(header => {
  header.addEventListener('click', () => {
    const topic = header.parentElement;
    document.querySelectorAll('.issue-topic.open').forEach(t => {
      if (t !== topic) t.classList.remove('open');
    });
    topic.classList.toggle('open');
  });
});

document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    q.parentElement.classList.toggle('open');
  });
});

function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current.toLocaleString() + suffix;
  }, 25);
}

const counters = document.querySelectorAll('.stat-number');
if (counters.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.count), el.dataset.suffix || '');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

const joinForm = document.getElementById('join-form');
if (joinForm) {
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = joinForm.querySelector('[name="name"]').value.trim();
    const email = joinForm.querySelector('[name="email"]').value.trim();
    const city = joinForm.querySelector('[name="city"]').value.trim();
    if (!name || !email || !city) return alert('Please fill in all required fields.');
    document.getElementById('success-msg').classList.add('show');
    joinForm.style.display = 'none';
  });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();
    if (!name || !email || !message) return alert('Please fill in all required fields.');
    document.getElementById('contact-success').classList.add('show');
    contactForm.style.display = 'none';
  });
}

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('cpj-theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
  const saved = localStorage.getItem('cpj-theme');
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.querySelector('header')?.offsetHeight || 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - offset,
        behavior: 'smooth'
      });
    }
  });
});

if ('ontouchstart' in window) {
  document.querySelectorAll('.btn, .issue-topic-header, .faq-question').forEach(el => {
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      el.click();
    });
  });
}
