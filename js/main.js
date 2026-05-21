// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

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
    topic.classList.toggle('open');
  });
});

// Animated counter
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

// Join form
const joinForm = document.getElementById('join-form');
if (joinForm) {
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = joinForm.querySelector('[name="name"]').value;
    const email = joinForm.querySelector('[name="email"]').value;
    const city = joinForm.querySelector('[name="city"]').value;

    if (!name || !email || !city) {
      alert('Please fill in all fields.');
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
    const name = contactForm.querySelector('[name="name"]').value;
    const email = contactForm.querySelector('[name="email"]').value;
    const message = contactForm.querySelector('[name="message"]').value;

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
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
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
