document.addEventListener('DOMContentLoaded', () => {
  // ===== NAVIGATION =====
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const modelLinks = document.querySelectorAll('.model-link');
  const models = document.querySelectorAll('.model');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active from all links
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Hide all sections
      sections.forEach(sec => sec.classList.remove('active'));

      // Show the target section
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  modelLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active from all model links
      modelLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Hide all models
      models.forEach(model => model.classList.remove('active'));

      // Show the target model
      const targetId = link.getAttribute('model-target');
      const targetModel = document.getElementById(targetId);
      if (targetModel) {
        targetModel.classList.add('active');
      }
    });
  });

  // Show Profile by default
  document.getElementById('profile').classList.add('active');

  // ===== TYPING ANIMATION =====
  const typingText = document.getElementById('typingText');
  const phrases = [
    'Full-Stack Developer',
    '3D Modeling Enthusiast',
    'Local AI Explorer',
    'Creative Problem Solver'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(type, typingSpeed);
  }
  type();

  // ===== SCROLL PROGRESS =====
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxMedia = document.getElementById('lightboxMedia');
  const lightboxCaption = document.getElementById('lightboxCaption');

  // Add click handlers to images with data-lightbox
  document.querySelectorAll('[data-lightbox="true"]').forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = img.src;
      const alt = img.alt;
      lightboxMedia.innerHTML = `<img src="${src}" alt="${alt}">`;
      lightboxCaption.textContent = alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe timeline items, project cards, and highlight cards
  document.querySelectorAll('.timeline-item, .project-card, .highlight-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(el);
  });

  // Stagger the animations
  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  document.querySelectorAll('.highlight-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
  });
});