/**
 * Diyetisyen Web Sitesi - Ana JavaScript Dosyası
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initContactForm();
  initActiveNavLink();
});

/* ---- Header Scroll Effect ---- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Mobile Menu Toggle ---- */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll Animations ---- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ---- Active Navigation Link ---- */
function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---- Contact Form Validation ---- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name: {
      validate: (v) => v.trim().length >= 2,
      message: 'Ad soyad en az 2 karakter olmalıdır.'
    },
    email: {
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'Geçerli bir e-posta adresi giriniz.'
    },
    phone: {
      validate: (v) => /^[\d\s\-+()]{10,}$/.test(v.trim()),
      message: 'Geçerli bir telefon numarası giriniz.'
    },
    subject: {
      validate: (v) => v !== '',
      message: 'Lütfen bir konu seçiniz.'
    },
    message: {
      validate: (v) => v.trim().length >= 10,
      message: 'Mesaj en az 10 karakter olmalıdır.'
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(fields).forEach(name => {
      const input = form.querySelector(`[name="${name}"]`);
      const group = input.closest('.form-group');
      const errorEl = group.querySelector('.form-error');

      if (!fields[name].validate(input.value)) {
        group.classList.add('error');
        errorEl.textContent = fields[name].message;
        isValid = false;
      } else {
        group.classList.remove('error');
      }
    });

    if (isValid) {
      const successEl = form.querySelector('.form-success');
      successEl.classList.add('show');
      form.reset();

      setTimeout(() => {
        successEl.classList.remove('show');
      }, 5000);
    }
  });

  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('input', () => {
      input.closest('.form-group').classList.remove('error');
    });
  });
}
