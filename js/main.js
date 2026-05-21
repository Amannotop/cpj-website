// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    navToggle.textContent = isOpen ? '✕' : '☰';
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.textContent = '☰';
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
}, { passive: true });

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Issue topic accordion
document.querySelectorAll('.issue-topic-header').forEach(header => {
  header.addEventListener('click', () => {
    const topic = header.parentElement;
    const wasOpen = topic.classList.contains('open');
    
    // Close all others
    document.querySelectorAll('.issue-topic.open').forEach(t => {
      if (t !== topic) t.classList.remove('open');
    });
    
    topic.classList.toggle('open');
  });
});

// Animated counter
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 1500;
  const step = Math.ceil(target / (duration / 25));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current.toLocaleString() + suffix;
  }, 25);
}

// Intersection observer for counters
const counters = document.querySelectorAll('.stat-number');
if (counters.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// Scroll animations
const animateElements = document.querySelectorAll('.animate-on-scroll');
if (animateElements.length > 0) {
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animateElements.forEach(el => scrollObserver.observe(el));
}

// Join form
const joinForm = document.getElementById('join-form');
if (joinForm) {
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = joinForm.querySelector('[name="name"]').value.trim();
    const email = joinForm.querySelector('[name="email"]').value.trim();
    const city = joinForm.querySelector('[name="city"]').value.trim();

    if (!name || !email || !city) {
      alert('Please fill in all required fields.');
      return;
    }

    const successMsg = document.getElementById('success-msg');
    if (successMsg) {
      successMsg.classList.add('show');
      joinForm.style.display = 'none';
    }

    console.log('Member joined:', { name, email, city });
  });
}

// Contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    const successMsg = document.getElementById('contact-success');
    if (successMsg) {
      successMsg.classList.add('show');
      contactForm.style.display = 'none';
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Touch-friendly: prevent double-tap zoom on buttons
if ('ontouchstart' in window) {
  document.querySelectorAll('.btn, .issue-topic-header, .faq-question').forEach(el => {
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      el.click();
    });
  });
}
