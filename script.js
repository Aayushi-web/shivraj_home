// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Dropdown toggle
const dropdowns = document.querySelectorAll('.navbar__dropdown');

dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.navbar__dropdown-toggle');

  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = dropdown.classList.contains('open');

    // Close all first
    dropdowns.forEach(d => {
      d.classList.remove('open');
      d.querySelector('.navbar__dropdown-toggle').setAttribute('aria-expanded', 'false');
    });

    // If it wasn't open, open it
    if (!isOpen) {
      dropdown.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Prevent clicks inside dropdown menu from closing it
  const menu = dropdown.querySelector('.navbar__dropdown-menu');
  menu.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', function() {
  dropdowns.forEach(d => {
    d.classList.remove('open');
    d.querySelector('.navbar__dropdown-toggle').setAttribute('aria-expanded', 'false');
  });
});

// Active link highlight
const navLinks = document.querySelectorAll('.navbar__link:not(.navbar__dropdown-toggle)');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.rooms__card');

  // Scroll fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = entry.target.classList.contains('rooms__card--featured')
            ? 'translateY(-12px)' : 'translateY(0)';
        }, i * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });

  // Ripple effect
  cards.forEach(card => {
    card.addEventListener('click', function (e) {
      const existing = card.querySelector('.rooms__ripple');
      if (existing) existing.remove();

      const ripple = document.createElement('span');
      ripple.classList.add('rooms__ripple');
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top  = `${e.clientY - rect.top  - size / 2}px`;
      card.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // Inject ripple styles
  const style = document.createElement('style');
  style.textContent = `
    .rooms__ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(196, 98, 45, 0.18);
      transform: scale(0);
      animation: roomsRipple 0.55s linear;
      pointer-events: none;
      z-index: 0;
    }
    .rooms__card--featured .rooms__ripple {
      background: rgba(255, 255, 255, 0.10);
    }
    @keyframes roomsRipple {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

});
const exploreBtn = document.querySelector('.hero__btn--primary');
const roomsSection = document.querySelector('.rooms');

if (exploreBtn && roomsSection) {
  exploreBtn.addEventListener('click', function (e) {
    e.preventDefault();
    roomsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.amenities__card');

  // Scroll fade-in with stagger
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(cards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('amenities--visible');
        }, index * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));

  // Ripple on click
  cards.forEach(card => {
    card.addEventListener('click', function (e) {
      const existing = card.querySelector('.amenities__ripple');
      if (existing) existing.remove();

      const ripple = document.createElement('span');
      ripple.classList.add('amenities__ripple');
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width  = ripple.style.height = `${size}px`;
      ripple.style.left   = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top    = `${e.clientY - rect.top  - size / 2}px`;
      card.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

});
document.addEventListener('DOMContentLoaded', () => {

  const cards = document.querySelectorAll('.why__card');

  // Scroll fade-in with stagger
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(cards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.35s ease';
          entry.target.classList.add('why--visible');
        }, index * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(card => observer.observe(card));

  // Ripple on click
  cards.forEach(card => {
    card.addEventListener('click', function (e) {
      if (e.target.closest('.why__card-cta')) return;
      const existing = card.querySelector('.why__ripple');
      if (existing) existing.remove();
      const ripple = document.createElement('span');
      ripple.classList.add('why__ripple');
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width  = ripple.style.height = `${size}px`;
      ripple.style.left   = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top    = `${e.clientY - rect.top  - size / 2}px`;
      card.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // Animate stats counter
  const stats = document.querySelectorAll('.why__stat span');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => countObserver.observe(stat));

  function animateCount(el) {
    const text = el.textContent.trim();
    const numMatch = text.match(/[\d.]+/);
    if (!numMatch) return;
    const endVal  = parseFloat(numMatch[0]);
    const suffix  = text.replace(numMatch[0], '');
    const isFloat = numMatch[0].includes('.');
    const steps   = 40;
    const increment = endVal / steps;
    let current = 0, step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, endVal);
      el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
      if (step >= steps) clearInterval(timer);
    }, 1200 / steps);
  }

});
document.addEventListener('DOMContentLoaded', () => {

  const slider   = document.getElementById('reviewSlider');
  const prevBtn  = document.getElementById('reviewPrev');
  const nextBtn  = document.getElementById('reviewNext');
  const dotsWrap = document.getElementById('reviewDots');

  if (!slider) return;

  const cards = slider.querySelectorAll('.reviews__card');
  const total = cards.length;
  let current   = 0;
  let autoTimer = null;

  const visibleCount = () => window.innerWidth <= 1024 ? 1 : 2;

  function buildDots() {
    dotsWrap.innerHTML = '';
    const pages = total - visibleCount() + 1;
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.classList.add('reviews__dot');
      if (i === current) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    dotsWrap.querySelectorAll('.reviews__dot')
      .forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function getCardWidth() {
    const gap = parseInt(getComputedStyle(slider).gap) || 24;
    return cards[0].offsetWidth + gap;
  }

  function goTo(index) {
    const pages = total - visibleCount() + 1;
    current = Math.max(0, Math.min(index, pages - 1));
    slider.style.transform = `translateX(-${current * getCardWidth()}px)`;
    updateDots();
  }

  function next() { goTo(current + 1 >= total - visibleCount() + 1 ? 0 : current + 1); }
  function prev() { goTo(current - 1 < 0 ? total - visibleCount() : current - 1); }

  function startAuto() { stopAuto(); autoTimer = setInterval(next, 3500); }
  function stopAuto()  { if (autoTimer) clearInterval(autoTimer); }

  nextBtn.addEventListener('click', () => { next(); stopAuto(); startAuto(); });
  prevBtn.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // Touch swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  });

  // Resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { current = 0; buildDots(); goTo(0); }, 200);
  });

  // Animate bars
  const bars = document.querySelectorAll('.reviews__bar-fill');
  bars.forEach(bar => {
    const target = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => { bar.style.width = target; }, 400);
  });

  // Init
  buildDots();
  goTo(0);
  startAuto();

});
document.addEventListener('DOMContentLoaded', () => {

  const form    = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');
  const backBtn = document.getElementById('contactBack');

  if (!form) return;

  // Form Submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#e53e3e';
        field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
        valid = false;
      }
    });
    if (!valid) return;
    const btn = form.querySelector('.contact__submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');
    }, 1200);
  });

  // Back Button
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      success.classList.remove('show');
      form.style.display = 'flex';
      form.reset();
      const btn = form.querySelector('.contact__submit');
      btn.innerHTML = `Send Enquiry <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
      btn.disabled = false;
    });
  }

  // Label focus color
  document.querySelectorAll('.contact__field input, .contact__field select, .contact__field textarea').forEach(field => {
    field.addEventListener('focus', () => { field.closest('.contact__field').querySelector('label').style.color = '#C4622D'; });
    field.addEventListener('blur',  () => { field.closest('.contact__field').querySelector('label').style.color = ''; });
  });

  // Scroll fade-in
  const section = document.querySelector('.contact__body');
  if (section) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 }).observe(section);
  }

});
// Hero Slideshow — left to right animation
const slides = document.querySelectorAll('.hero__slide');
let currentSlide = 0;

function nextSlide() {
  const prev = currentSlide;
  currentSlide = (currentSlide + 1) % slides.length;

  slides[prev].classList.remove('active');
  slides[prev].classList.add('exit');

  slides[currentSlide].classList.add('active');

  setTimeout(() => {
    slides[prev].classList.remove('exit');
  }, 800);
}

setInterval(nextSlide, 4000);
const locationData = {
  gurugram: {
    name:      'Shivraj Homes – Sector 21',
    badge:     'Sector 21, Gurugram',
    address:   'House No. 337DP, Pocket E, Sector 21, Gurugram',
    popupAddr: 'Sector 21, Gurugram, Haryana 122016',
    price:     '₹9,000',
    mapSrc:    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2!2d77.0266!3d28.5021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzA3LjYiTiA3N8KwMDEnMzUuOCJF!5e0!3m2!1sen!2sin!4v1234567890',
  },
  delhi: {
    name:      'Shivraj Homes – Delhi',
    badge:     'South Delhi',
    address:   'Green Park, South Delhi, Delhi',
    popupAddr: 'Green Park, New Delhi, Delhi 110016',
    price:     '₹11,000',
    mapSrc:    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.5!2d77.2090!3d28.5562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMzJzIyLjMiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1234567890',
  },
  noida: {
    name:      'Shivraj Homes – Noida',
    badge:     'Sector 62, Noida',
    address:   'Sector 62, Noida, Uttar Pradesh',
    popupAddr: 'Sector 62, Noida, Uttar Pradesh 201309',
    price:     '₹10,000',
    mapSrc:    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1!2d77.3650!3d28.6270!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzM3LjIiTiA3N8KwMjEnNTQuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
  },
  faridabad: {
    name:      'Shivraj Homes – Faridabad',
    badge:     'Sector 15, Faridabad',
    address:   'Sector 15, Faridabad, Haryana',
    popupAddr: 'Sector 15, Faridabad, Haryana 121007',
    price:     '₹8,500',
    mapSrc:    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.5!2d77.3178!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI0JzMyLjAiTiA3N8KwMTknMDQuMSJF!5e0!3m2!1sen!2sin!4v1234567890',
  },
};

document.addEventListener('DOMContentLoaded', () => {

  const overlay  = document.getElementById('locOverlay');
  const closeBtn = document.getElementById('locClose');
  const form     = document.getElementById('locForm');
  const success  = document.getElementById('locSuccess');

  if (!overlay) return;

  function openPopup(key) {
    const data = locationData[key] || locationData.gurugram;
    document.getElementById('locName').textContent      = data.name;
    document.getElementById('locAddress').textContent   = data.address;
    document.getElementById('locBadge').textContent     = data.badge;
    document.getElementById('locPrice').innerHTML       = data.price + '<small>/mo</small>';
    document.getElementById('locPopupAddr').textContent = data.popupAddr;
    document.getElementById('locMap').src               = data.mapSrc;
    if (form) { form.reset(); form.style.display = 'flex'; success.classList.remove('show'); }
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

  // Hook navbar dropdown items
  document.querySelectorAll('.navbar__dropdown-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const text = item.textContent.trim().toLowerCase();
      let key = 'gurugram';
      if (text.includes('delhi'))     key = 'delhi';
      if (text.includes('noida'))     key = 'noida';
      if (text.includes('faridabad')) key = 'faridabad';
      openPopup(key);
      document.querySelectorAll('.navbar__dropdown').forEach(d => d.classList.remove('open'));
    });
  });

  // Form submit
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.loc-submit');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        form.style.display = 'none';
        success.classList.add('show');
      }, 1000);
    });
  }

  // Thumbnail switcher
  window.switchImg = function(el) {
    document.getElementById('locMainImg').src = el.src;
    document.querySelectorAll('.loc-gallery__thumbs img').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  };

  // Label focus color
  document.querySelectorAll('.loc-field input, .loc-field select, .loc-field textarea').forEach(field => {
    field.addEventListener('focus', () => { field.closest('.loc-field').querySelector('label').style.color = '#C4622D'; });
    field.addEventListener('blur',  () => { field.closest('.loc-field').querySelector('label').style.color = ''; });
  });

});
// ===========================
// INTERACTIONS — All Buttons
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. CONTACT US button → popup email & phone
  // =============================================
  const contactBtn = document.querySelector('.navbar__cta');

  const contactPopup = document.createElement('div');
  contactPopup.id = 'contactQuickPopup';
  contactPopup.innerHTML = `
    <div class="quick-popup__backdrop"></div>
    <div class="quick-popup__box">
      <button class="quick-popup__close" id="closeContactPopup">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="quick-popup__icon">📞</div>
      <h3 class="quick-popup__title">Get In Touch</h3>
      <p class="quick-popup__sub">We're happy to help you find your perfect room</p>
      <div class="quick-popup__items">
        <a href="tel:+919650603063" class="quick-popup__item">
          <span class="quick-popup__item-icon">📱</span>
          <div>
            <small>Call Us</small>
            <span>+91 96506 03063</span>
          </div>
        </a>
        <a href="tel:+918222887210" class="quick-popup__item">
          <span class="quick-popup__item-icon">📱</span>
          <div>
            <small>Alternate</small>
            <span>+91 82228 87210</span>
          </div>
        </a>
        <a href="mailto:contact@shivrajhomes.in" class="quick-popup__item">
          <span class="quick-popup__item-icon">✉️</span>
          <div>
            <small>Email Us</small>
            <span>contact@shivrajhomes.in</span>
          </div>
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(contactPopup);

  if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      contactPopup.classList.add('quick-popup--open');
    });
  }

  document.getElementById('closeContactPopup').addEventListener('click', () => {
    contactPopup.classList.remove('quick-popup--open');
  });

  contactPopup.querySelector('.quick-popup__backdrop').addEventListener('click', () => {
    contactPopup.classList.remove('quick-popup--open');
  });

  // =============================================
  // 2. EXPLORE ROOMS → scroll to rooms section
  // =============================================
  const exploreBtn = document.querySelector('.hero__btn--primary');
  const roomsSection = document.querySelector('.rooms');

  if (exploreBtn && roomsSection) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      roomsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // =============================================
  // 3. BOOK A VISIT → popup phone numbers
  // =============================================
  const bookBtn = document.querySelector('.hero__btn--secondary');

  const bookPopup = document.createElement('div');
  bookPopup.id = 'bookVisitPopup';
  bookPopup.innerHTML = `
    <div class="quick-popup__backdrop"></div>
    <div class="quick-popup__box">
      <button class="quick-popup__close" id="closeBookPopup">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="quick-popup__icon">🏠</div>
      <h3 class="quick-popup__title">Book a Visit</h3>
      <p class="quick-popup__sub">Call us to schedule your free property tour today</p>
      <div class="quick-popup__items">
        <a href="tel:+919466246821" class="quick-popup__item">
          <span class="quick-popup__item-icon">📱</span>
          <div>
            <small>Primary</small>
            <span>+91 94662 46821</span>
          </div>
        </a>
        <a href="tel:+919466246821" class="quick-popup__item">
          <span class="quick-popup__item-icon">📱</span>
          <div>
            <small>Alternate</small>
            <span>+91 9466246821</span>
          </div>
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(bookPopup);

  if (bookBtn) {
    bookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      bookPopup.classList.add('quick-popup--open');
    });
  }

  document.getElementById('closeBookPopup').addEventListener('click', () => {
    bookPopup.classList.remove('quick-popup--open');
  });

  bookPopup.querySelector('.quick-popup__backdrop').addEventListener('click', () => {
    bookPopup.classList.remove('quick-popup--open');
  });

  // =============================================
  // 4. ABOUT US navbar link → scroll to why section
  // =============================================
  const navLinks = document.querySelectorAll('.navbar__link');
  navLinks.forEach(link => {
    if (link.textContent.trim().toLowerCase() === 'about us') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const whySection = document.querySelector('.why');
        if (whySection) whySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  // =============================================
  // 5. TALK TO US button → popup phone number
  // =============================================
  const talkBtn = document.querySelector('.why__card-cta');

  const talkPopup = document.createElement('div');
  talkPopup.id = 'talkPopup';
  talkPopup.innerHTML = `
    <div class="quick-popup__backdrop"></div>
    <div class="quick-popup__box">
      <button class="quick-popup__close" id="closeTalkPopup">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="quick-popup__icon">💬</div>
      <h3 class="quick-popup__title">24/7 Support</h3>
      <p class="quick-popup__sub">Our team is always here — call us anytime</p>
      <div class="quick-popup__items">
        <a href="tel:+91946624821" class="quick-popup__item">
          <span class="quick-popup__item-icon">📱</span>
          <div>
            <small>Support Line</small>
            <span>+91 946624821</span>
          </div>
        </a>
        <a href="tel:+91946624821" class="quick-popup__item">
          <span class="quick-popup__item-icon">📱</span>
          <div>
            <small>Alternate</small>
            <span>+91 946624821 </span>
          </div>
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(talkPopup);

  if (talkBtn) {
    talkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      talkPopup.classList.add('quick-popup--open');
    });
  }

  document.getElementById('closeTalkPopup').addEventListener('click', () => {
    talkPopup.classList.remove('quick-popup--open');
  });

  talkPopup.querySelector('.quick-popup__backdrop').addEventListener('click', () => {
    talkPopup.classList.remove('quick-popup--open');
  });

  // =============================================
  // 6. CREATOR NAMES → LinkedIn links
  // =============================================
  const nameA = document.querySelector('.footer__credits-name--a');
  const nameB = document.querySelector('.footer__credits-name--b');

  if (nameA) {
    nameA.style.cursor = 'pointer';
    nameA.title = 'View Aayushi on LinkedIn';
    nameA.addEventListener('click', () => {
      window.open('https://www.linkedin.com/in/aayushi', '_blank');
    });
  }

  if (nameB) {
    nameB.style.cursor = 'pointer';
    nameB.title = 'View Aniwesh on LinkedIn';
    nameB.addEventListener('click', () => {
      window.open('https://www.linkedin.com/in/aniwesh', '_blank');
    });
  }

  // =============================================
  // Close all popups on Escape key
  // =============================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.quick-popup--open')
        .forEach(p => p.classList.remove('quick-popup--open'));
    }
  });

});
window.open('https://www.linkedin.com/in/mishraaayushi_/'); // ← replace with Aayushi's real URL
window.open('https://www.linkedin.com/in/aniwesh-tiwari'); // ← replace with Aniwesh's real URL