// ===========================
// NAVBAR
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

const dropdowns = document.querySelectorAll('.navbar__dropdown');

dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.navbar__dropdown-toggle');

  toggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    dropdowns.forEach(d => {
      d.classList.remove('open');
      d.querySelector('.navbar__dropdown-toggle').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      dropdown.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  const menu = dropdown.querySelector('.navbar__dropdown-menu');
  menu.addEventListener('click', function(e) { e.stopPropagation(); });
});

document.addEventListener('click', function() {
  dropdowns.forEach(d => {
    d.classList.remove('open');
    d.querySelector('.navbar__dropdown-toggle').setAttribute('aria-expanded', 'false');
  });
});

const navLinks = document.querySelectorAll('.navbar__link:not(.navbar__dropdown-toggle)');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ===========================
// HERO SLIDESHOW
// ===========================

const slides = document.querySelectorAll('.hero__slide');
let currentSlide = 0;

function nextSlide() {
  const prev = currentSlide;
  currentSlide = (currentSlide + 1) % slides.length;
  slides[prev].classList.remove('active');
  slides[prev].classList.add('exit');
  slides[currentSlide].classList.add('active');
  setTimeout(() => { slides[prev].classList.remove('exit'); }, 800);
}

if (slides.length > 0) setInterval(nextSlide, 4000);

// ===========================
// MAIN DOMContentLoaded
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // ---- ROOMS fade-in & ripple ----
  const roomCards = document.querySelectorAll('.rooms__card');

  const roomObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = entry.target.classList.contains('rooms__card--featured')
            ? 'translateY(-12px)' : 'translateY(0)';
        }, i * 150);
        roomObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  roomCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    card.style.transform = 'translateY(30px)';
    roomObserver.observe(card);

    card.addEventListener('click', function(e) {
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

  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .rooms__ripple {
      position: absolute; border-radius: 50%;
      background: rgba(196, 98, 45, 0.18);
      transform: scale(0);
      animation: roomsRipple 0.55s linear;
      pointer-events: none; z-index: 0;
    }
    .rooms__card--featured .rooms__ripple { background: rgba(255,255,255,0.10); }
    @keyframes roomsRipple { to { transform: scale(2.5); opacity: 0; } }
  `;
  document.head.appendChild(rippleStyle);

  // ---- AMENITIES fade-in & ripple ----
  const amenityCards = document.querySelectorAll('.amenities__card');

  const amenityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(amenityCards).indexOf(entry.target);
        setTimeout(() => { entry.target.classList.add('amenities--visible'); }, index * 60);
        amenityObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  amenityCards.forEach(card => {
    amenityObserver.observe(card);
    card.addEventListener('click', function(e) {
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

  // ---- WHY CARDS fade-in, ripple, counter ----
  const whyCards = document.querySelectorAll('.why__card');

  const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(whyCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.35s ease';
          entry.target.classList.add('why--visible');
        }, index * 120);
        whyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  whyCards.forEach(card => {
    whyObserver.observe(card);
    card.addEventListener('click', function(e) {
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

  const whyStats = document.querySelectorAll('.why__stat span');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCount(entry.target); countObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });

  whyStats.forEach(stat => countObserver.observe(stat));

  function animateCount(el) {
    const text = el.textContent.trim();
    const numMatch = text.match(/[\d.]+/);
    if (!numMatch) return;
    const endVal = parseFloat(numMatch[0]);
    const suffix = text.replace(numMatch[0], '');
    const isFloat = numMatch[0].includes('.');
    const steps = 40;
    const increment = endVal / steps;
    let current = 0, step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, endVal);
      el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
      if (step >= steps) clearInterval(timer);
    }, 1200 / steps);
  }

  // ---- REVIEWS SLIDER ----
  const slider   = document.getElementById('reviewSlider');
  const prevBtn  = document.getElementById('reviewPrev');
  const nextBtn  = document.getElementById('reviewNext');
  const dotsWrap = document.getElementById('reviewDots');

  if (slider) {
    const reviewCards = slider.querySelectorAll('.reviews__card');
    const total = reviewCards.length;
    let current = 0, autoTimer = null;

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
      dotsWrap.querySelectorAll('.reviews__dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function getCardWidth() {
      const gap = parseInt(getComputedStyle(slider).gap) || 24;
      return reviewCards[0].offsetWidth + gap;
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

    let touchStartX = 0;
    slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { current = 0; buildDots(); goTo(0); }, 200);
    });

    const bars = document.querySelectorAll('.reviews__bar-fill');
    bars.forEach(bar => {
      const target = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = target; }, 400);
    });

    buildDots(); goTo(0); startAuto();
  }

  // ---- CONTACT FORM ----
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  const contactBack = document.getElementById('contactBack');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;
      contactForm.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e53e3e';
          field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
          valid = false;
        }
      });
      if (!valid) return;

      const btn = contactForm.querySelector('.contact__submit');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      const formData = {
        name:     document.getElementById('c-name').value,
        phone:    document.getElementById('c-phone').value,
        email:    document.getElementById('c-email').value || '',
        roomType: document.getElementById('c-type').value,
        moveIn:   document.getElementById('c-checkin').value || '',
        budget:   document.getElementById('c-budget').value || '',
        message:  document.getElementById('c-msg').value || '',
        source:   'Contact Page'
      };

      const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzrjAyB6jdYe2UJ6K5CEw2sN7eNpI3g7G7T3nFgTmtB7v8PB3BI-PQ5TjN10vaeSvgU/exec';

      fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).finally(() => {
        contactForm.style.display = 'none';
        contactSuccess.classList.add('show');
      });
    });

    if (contactBack) {
      contactBack.addEventListener('click', () => {
        contactSuccess.classList.remove('show');
        contactForm.style.display = 'flex';
        contactForm.reset();
        const btn = contactForm.querySelector('.contact__submit');
        btn.innerHTML = `Send Enquiry <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
        btn.disabled = false;
      });
    }

    document.querySelectorAll('.contact__field input, .contact__field select, .contact__field textarea').forEach(field => {
      field.addEventListener('focus', () => { field.closest('.contact__field').querySelector('label').style.color = '#C4622D'; });
      field.addEventListener('blur',  () => { field.closest('.contact__field').querySelector('label').style.color = ''; });
    });

    const contactBody = document.querySelector('.contact__body');
    if (contactBody) {
      contactBody.style.opacity = '0';
      contactBody.style.transform = 'translateY(30px)';
      contactBody.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 }).observe(contactBody);
    }
  }

  // ---- LOCATION POPUP ----
  const sectorProperties = {
    sector21: {
      name: 'Shivraj Homes – Sector 21',
      badge: 'Sector 21, Gurugram',
      address: 'House No. 337DP, Pocket E, Sector 21, Gurugram',
      popupAddr: 'Sector 21, Gurugram, Haryana 122016',
      price: '₹9,000',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2!2d77.0266!3d28.5021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzA3LjYiTiA3N8KwMDEnMzUuOCJF!5e0!3m2!1sen!2sin!4v1234567890',
      properties: [
        { name: 'Shivraj Homes - 21C', location: 'Sector 21C, Gurugram', price: '₹9,000', badge: 'Most Popular', image: '1774162250089.png', amenities: ['Wi-Fi','AC','Meals','Parking','Lift'], phone: '+919220601420' },
        { name: 'Shivraj Homes - Dhundahera', location: 'Dhundahera, Gurugram', price: '₹8,500', badge: 'Budget Friendly', image: '1774162263990.png', amenities: ['Wi-Fi','CCTV','Parking','Power Backup'], phone: '+919220601420' }
      ]
    },
    sector22: {
      name: 'Shivraj Homes – Sector 22',
      badge: 'Sector 22, Gurugram',
      address: 'Palam Chowk, Sector 22, Gurugram',
      popupAddr: 'Sector 22, Gurugram, Haryana 122015',
      price: '₹9,500',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.5!2d77.0290!3d28.5050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzE4LjAiTiA3N8KwMDEnNDQuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
      properties: [
        { name: 'Shivraj Homes - 22A', location: 'Sector 22A, Gurugram', price: '₹9,500', badge: 'Premium', image: '1774162307006.png', amenities: ['Wi-Fi','AC','Meals','Lift','Parking','Housekeeping'], phone: '+919220601420' },
        { name: 'Shivraj Homes - 22B', location: 'Sector 22B, Gurugram', price: '₹9,000', badge: 'Best Value', image: '1774162320908.png', amenities: ['Wi-Fi','CCTV','Meals','Housekeeping','Power Backup'], phone: '+919220601420' },
        { name: 'Shivraj Homes - Mullahera', location: 'Mullahera, Gurugram', price: '₹8,000', badge: 'Budget', image: '181627717.jpg', amenities: ['Wi-Fi','Parking','Power Backup','Water Purifier','CCTV'], phone: '+919220601420' }
      ]
    },
    sector23: {
      name: 'Shivraj Homes – Sector 23',
      badge: 'Sector 23, Gurugram',
      address: 'Sector 23A, Gurugram',
      popupAddr: 'Sector 23, Gurugram, Haryana 122017',
      price: '₹10,000',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.0!2d77.0320!3d28.5100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzM2LjAiTiA3N8KwMDEnNTUuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
      properties: [
        { name: 'Shivraj Homes - 23A', location: 'Sector 23A, Gurugram', price: '₹10,000', badge: 'New Launch', image: '1.jpg', amenities: ['Wi-Fi','AC','Meals','Lift','Parking'], phone: '+919220601420' }
      ]
    }
  };

  const overlay  = document.getElementById('locOverlay');
  const locClose = document.getElementById('locClose');
  const locForm  = document.getElementById('locForm');
  const locSuccess = document.getElementById('locSuccess');

  window.switchImg = function(el) {
    document.getElementById('locMainImg').src = el.src;
    document.querySelectorAll('.loc-gallery__thumbs img').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  };

  window.showPropertyContact = function(propertyName, phone) {
    const tempPopup = document.createElement('div');
    tempPopup.style.cssText = 'position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);';
    tempPopup.innerHTML = `
      <div style="background:#fff;border-radius:20px;padding:28px;max-width:320px;width:90%;text-align:center;font-family:Poppins,sans-serif;">
        <div style="font-size:40px;margin-bottom:10px;">🏢</div>
        <h3 style="color:#1E2D5E;margin:10px 0;">${propertyName}</h3>
        <a href="tel:${phone}" style="display:block;background:#C4622D;color:#fff;padding:12px;border-radius:50px;text-decoration:none;margin:10px 0;font-weight:600;">📞 Call Now</a>
        <a href="https://wa.me/${phone.replace(/[^0-9]/g,'')}" target="_blank" style="display:block;background:#25D366;color:#fff;padding:12px;border-radius:50px;text-decoration:none;margin:10px 0;font-weight:600;">💬 WhatsApp</a>
        <button onclick="this.closest('div').parentElement.remove()" style="display:block;background:#1E2D5E;color:#fff;padding:12px;border-radius:50px;border:none;width:100%;font-weight:600;cursor:pointer;margin-top:10px;">Close</button>
      </div>`;
    document.body.appendChild(tempPopup);
    tempPopup.addEventListener('click', e => { if (e.target === tempPopup) tempPopup.remove(); });
  };

  function openLocPopup(key) {
    const data = sectorProperties[key] || sectorProperties.sector21;
    document.getElementById('locName').textContent      = data.name;
    document.getElementById('locAddress').textContent   = data.address;
    document.getElementById('locBadge').textContent     = data.badge;
    document.getElementById('locPrice').innerHTML       = data.price + '<small>/mo</small>';
    document.getElementById('locPopupAddr').textContent = data.popupAddr;
    document.getElementById('locMap').src               = data.mapSrc;

    const section   = document.getElementById('propertyCardsSection');
    const container = document.getElementById('locPropertyCards');

    if (data.properties && data.properties.length > 0) {
      section.style.display = 'block';
      container.innerHTML = data.properties.map(prop => `
        <div class="loc-property-card">
          <div class="loc-property-card__image" style="background-image:url('${prop.image}')">
            <span class="loc-property-card__badge">${prop.badge}</span>
          </div>
          <div class="loc-property-card__content">
            <h4 class="loc-property-card__name">${prop.name}</h4>
            <div class="loc-property-card__location">📍 ${prop.location}</div>
            <div class="loc-property-card__price">${prop.price}<small>/mo</small></div>
            <div class="loc-property-card__amenities">${prop.amenities.map(a => `<span class="loc-property-card__amenity">${a}</span>`).join('')}</div>
            <button class="loc-property-card__btn" onclick="showPropertyContact('${prop.name}','${prop.phone}')">View Details →</button>
          </div>
        </div>`).join('');
    } else {
      section.style.display = 'none';
    }

    if (locForm) { locForm.reset(); locForm.style.display = 'flex'; locSuccess.classList.remove('show'); }
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLocPopup() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (locClose) locClose.addEventListener('click', closeLocPopup);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLocPopup(); });

  if (locForm) {
    locForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = locForm.querySelector('.loc-submit');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => { locForm.style.display = 'none'; locSuccess.classList.add('show'); }, 1000);
    });
  }

  document.querySelectorAll('.loc-field input, .loc-field select, .loc-field textarea').forEach(field => {
    field.addEventListener('focus', () => { const lbl = field.closest('.loc-field')?.querySelector('label'); if (lbl) lbl.style.color = '#C4622D'; });
    field.addEventListener('blur',  () => { const lbl = field.closest('.loc-field')?.querySelector('label'); if (lbl) lbl.style.color = ''; });
  });

  document.querySelectorAll('.navbar__dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const text = this.textContent.trim().toLowerCase();
      let key = 'sector21';
      if (text.includes('22')) key = 'sector22';
      if (text.includes('23')) key = 'sector23';
      openLocPopup(key);
      dropdowns.forEach(d => {
        d.classList.remove('open');
        d.querySelector('.navbar__dropdown-toggle').setAttribute('aria-expanded', 'false');
      });
    });
  });

  // ---- QUICK POPUPS ----
  function createQuickPopup(id, icon, title, sub, items) {
    const popup = document.createElement('div');
    popup.id = id;
    popup.innerHTML = `
      <div class="quick-popup__backdrop"></div>
      <div class="quick-popup__box">
        <button class="quick-popup__close" id="close_${id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="quick-popup__icon">${icon}</div>
        <h3 class="quick-popup__title">${title}</h3>
        <p class="quick-popup__sub">${sub}</p>
        <div class="quick-popup__items">${items}</div>
      </div>`;
    document.body.appendChild(popup);
    popup.querySelector(`#close_${id}`).addEventListener('click', () => popup.classList.remove('quick-popup--open'));
    popup.querySelector('.quick-popup__backdrop').addEventListener('click', () => popup.classList.remove('quick-popup--open'));
    return popup;
  }

  const contactPopup = createQuickPopup('contactQuickPopup', '📞', 'Get In Touch', "We're happy to help you find your perfect room",
    `<a href="tel:+919220601420" class="quick-popup__item"><span class="quick-popup__item-icon">📱</span><div><small>Call Us</small><span>+91 92206 01420</span></div></a>
     <a href="tel:+919217234443" class="quick-popup__item"><span class="quick-popup__item-icon">📱</span><div><small>Alternate</small><span>+91 92172 34443</span></div></a>
     <a href="mailto:contact@shivrajhomes.in" class="quick-popup__item"><span class="quick-popup__item-icon">✉️</span><div><small>Email Us</small><span>contact@shivrajhomes.in</span></div></a>`);

  const bookPopup = createQuickPopup('bookVisitPopup', '🏠', 'Book a Visit', 'Call us to schedule your free property tour today',
    `<a href="tel:+919220601420" class="quick-popup__item"><span class="quick-popup__item-icon">📱</span><div><small>Primary</small><span>+91 92206 01420</span></div></a>
     <a href="tel:+919217234443" class="quick-popup__item"><span class="quick-popup__item-icon">📱</span><div><small>Alternate</small><span>+91 92172 34443</span></div></a>`);

  const talkPopup = createQuickPopup('talkPopup', '💬', '24/7 Support', 'Our team is always here — call us anytime',
    `<a href="tel:+919220601420" class="quick-popup__item"><span class="quick-popup__item-icon">📱</span><div><small>Support Line</small><span>+91 92206 01420</span></div></a>
     <a href="tel:+919217234443" class="quick-popup__item"><span class="quick-popup__item-icon">📱</span><div><small>Alternate</small><span>+91 92172 34443</span></div></a>`);

  const contactNavBtn = document.querySelector('.navbar__cta');
  if (contactNavBtn) contactNavBtn.addEventListener('click', e => { e.preventDefault(); contactPopup.classList.add('quick-popup--open'); });

  const bookBtn = document.querySelector('.hero__btn--secondary');
  if (bookBtn) bookBtn.addEventListener('click', e => { e.preventDefault(); bookPopup.classList.add('quick-popup--open'); });

  const talkBtn = document.querySelector('.why__card-cta');
  if (talkBtn) talkBtn.addEventListener('click', e => { e.preventDefault(); talkPopup.classList.add('quick-popup--open'); });

  // About Us → Why section
  document.querySelectorAll('.navbar__link').forEach(link => {
    if (link.textContent.trim().toLowerCase() === 'about us') {
      link.addEventListener('click', e => {
        e.preventDefault();
        const whySection = document.querySelector('.why');
        if (whySection) whySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  // Explore Rooms → rooms section
  const exploreBtn = document.querySelector('.hero__btn--primary');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('.rooms')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.quick-popup--open').forEach(p => p.classList.remove('quick-popup--open'));
      closeLocPopup();
    }
  });

  // ---- FOOTER CREDITS → LinkedIn ----
  const nameA = document.querySelector('.footer__credits-name--a');
  const nameB = document.querySelector('.footer__credits-name--b');
  if (nameA) { nameA.style.cursor = 'pointer'; nameA.addEventListener('click', () => window.open('https://www.linkedin.com/in/mishraaayushi/', '_blank')); }
  if (nameB) { nameB.style.cursor = 'pointer'; nameB.addEventListener('click', () => window.open('https://www.linkedin.com/in/aniwesh-tiwari/', '_blank')); }

  // ---- LEAD POPUP ----
  const authOverlay  = document.getElementById('authOverlay');
  const authClose    = document.getElementById('authClose');
  const leadForm     = document.getElementById('leadForm');
  const authSuccess  = document.getElementById('authSuccess');
  const leadSubmit   = document.getElementById('leadSubmit');
  const successClose = document.getElementById('authSuccessClose');

  if (authOverlay) {
    setTimeout(() => { authOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }, 800);

    function closeAuth() { authOverlay.classList.remove('open'); document.body.style.overflow = ''; }

    authClose.addEventListener('click', closeAuth);
    if (successClose) successClose.addEventListener('click', closeAuth);
    authOverlay.addEventListener('click', e => { if (e.target === authOverlay) closeAuth(); });

    leadSubmit.addEventListener('click', () => {
      let valid = true;
      ['leadName','leadPhone','leadEmail'].forEach(id => {
        const field = document.getElementById(id);
        if (!field?.value.trim()) {
          field.closest('.auth-input-wrap').style.borderColor = '#e53e3e';
          field.addEventListener('input', () => { field.closest('.auth-input-wrap').style.borderColor = ''; }, { once: true });
          valid = false;
        }
      });
      if (!valid) return;

      const originalHTML = leadSubmit.innerHTML;
      leadSubmit.textContent = 'Submitting...';
      leadSubmit.disabled = true;

      const leadData = {
        name:    document.getElementById('leadName').value.trim(),
        phone:   document.getElementById('leadPhone').value.trim(),
        email:   document.getElementById('leadEmail').value.trim(),
        message: document.getElementById('leadQuery').value.trim(),
        source:  'Lead Popup'
      };

      const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzrjAyB6jdYe2UJ6K5CEw2sN7eNpI3g7G7T3nFgTmtB7v8PB3BI-PQ5TjN10vaeSvgU/exec';

      fetch(SHEET_URL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      }).finally(() => {
        leadForm.style.display = 'none';
        authSuccess.classList.add('show');
      });
    });

    document.querySelectorAll('.auth-input-wrap input, .auth-input-wrap textarea').forEach(field => {
      field.addEventListener('focus', () => { const lbl = field.closest('.auth-field')?.querySelector('label'); if (lbl) lbl.style.color = '#C4622D'; });
      field.addEventListener('blur',  () => { const lbl = field.closest('.auth-field')?.querySelector('label'); if (lbl) lbl.style.color = ''; });
    });
  }

  // ---- CHATBOT ----
  const chatbot      = document.getElementById('chatbot');
  const toggleBtn    = document.getElementById('chatbotToggle');
  const chatCloseBtn = document.getElementById('chatbotClose');
  const chatMessages = document.getElementById('chatbotMessages');
  const chatInput    = document.getElementById('chatbotInput');
  const sendBtn      = document.getElementById('chatbotSend');
  const quickReplies = document.getElementById('quickReplies');
  const badge        = document.getElementById('chatbotBadge');

  if (chatbot) {
    const botResponses = {
      'what rooms are available?': `We offer 3 room types:\n🏠 <b>1RK Studio</b> — ₹14,000/mo\n🛏️ <b>Co-Living</b> — ₹15,000/mo\n👥 <b>Double Sharing</b> — ₹8,000/mo\n\nWould you like to book a visit?`,
      'what is the starting price?': `Our rooms start from just <b>₹8,000/month</b> for double sharing.\n\n💡 All prices include housekeeping, Wi-Fi & security. No hidden charges!`,
      'what amenities do you offer?': `We offer <b>20+ premium amenities</b> including:\n📶 High-Speed Wi-Fi\n❄️ AC Rooms\n🍽️ Tasty Meals\n🧹 Daily Housekeeping\n📷 CCTV Security\n🛗 Lift & Parking\n🔋 Power Backup\n🎮 Indoor Games\n...and much more!`,
      'food menu': `🍽️ <b>Our Daily Food Menu</b>\n\n<b>Breakfast (8-10 AM):</b>\n🥛 Milk/Tea/Coffee\n🍞 Bread Butter or Paratha + Curd\n\n<b>Lunch (1-3 PM):</b>\n🍚 Rice + Dal + Sabzi + Roti + Salad\n\n<b>Dinner (8-10 PM):</b>\n🍚 Rice + Curry + Roti + Salad\n\n<b>Weekly Specials:</b>\n• Friday: Biryani 🍛\n• Sunday: Special Thali + Dessert 🍨\n\n<i>All meals freshly cooked daily!</i>`,
      'where are you located?': `📍 We have properties at <b>6 locations</b>:\n\n• <b>Sector 21C</b>, Dhundahera\n• <b>Sector 22</b>, Gurugram\n• <b>Sector 22A</b>, Gurugram\n• <b>Sector 22B</b>, Gurugram\n• <b>Mullahera</b>, Gurugram\n• <b>Sector 23A</b>, Gurugram\n\n📞 Call us to check availability!`,
      'i want to book a visit': `Great! 🎉 Book a free visit:\n📞 <b>+91 92206 01420</b>\n📞 <b>+91 92172 34443</b>\n\nWe'll confirm your slot within 1 hour!`,
      'how do i contact you?': `Reach us at:\n📞 <b>+91 92206 01420</b>\n📧 <b>contact@shivrajhomes.in</b>\n💬 WhatsApp button on the left\n\nAvailable <b>Mon–Sat, 9AM–8PM</b>.`,
    };

    const defaultResponse = `Thanks for your message! 😊\n\nFor immediate help:\n📞 <b>+91 92172 34443</b>\n💬 WhatsApp button on the left`;

    function openChat()  { chatbot.classList.add('open'); badge.classList.add('hidden'); chatInput.focus(); }
    function closeChat() { chatbot.classList.remove('open'); }

    toggleBtn.addEventListener('click', () => chatbot.classList.contains('open') ? closeChat() : openChat());
    chatCloseBtn.addEventListener('click', closeChat);

    function addMessage(text, sender) {
      const msg = document.createElement('div');
      msg.classList.add('chatbot__msg', `chatbot__msg--${sender}`);
      const bubble = document.createElement('div');
      bubble.classList.add('chatbot__msg-bubble');
      bubble.innerHTML = text.replace(/\n/g, '<br/>');
      const time = document.createElement('span');
      time.classList.add('chatbot__msg-time');
      time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      msg.appendChild(bubble);
      msg.appendChild(time);
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping() {
      const typing = document.createElement('div');
      typing.classList.add('chatbot__msg','chatbot__msg--bot','chatbot__typing');
      typing.id = 'typingIndicator';
      typing.innerHTML = `<div class="chatbot__msg-bubble"><span class="chatbot__dot"></span><span class="chatbot__dot"></span><span class="chatbot__dot"></span></div>`;
      chatMessages.appendChild(typing);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTyping() { const t = document.getElementById('typingIndicator'); if (t) t.remove(); }

    function sendMessage(text) {
      if (!text.trim()) return;
      addMessage(text, 'user');
      chatInput.value = '';
      quickReplies.style.display = 'none';
      showTyping();
      setTimeout(() => {
        hideTyping();
        const reply = botResponses[text.toLowerCase()] || defaultResponse;
        addMessage(reply, 'bot');
      }, 1200);
    }

    sendBtn.addEventListener('click', () => sendMessage(chatInput.value));
    chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(chatInput.value); });
    document.querySelectorAll('.chatbot__quick-btn').forEach(btn => btn.addEventListener('click', () => sendMessage(btn.dataset.msg)));
    setTimeout(() => { if (!chatbot.classList.contains('open')) badge.classList.remove('hidden'); }, 4000);
  }

});