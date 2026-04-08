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

  // Form Submit with Google Sheets
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
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Submitting...';
    btn.disabled = true;
    
    // Collect form data
    const formData = {
      name: document.getElementById('c-name').value,
      phone: document.getElementById('c-phone').value,
      email: document.getElementById('c-email').value || '',
      roomType: document.getElementById('c-type').value,
      moveInDate: document.getElementById('c-checkin').value || '',
      budget: document.getElementById('c-budget').value || '',
      message: document.getElementById('c-msg').value || ''
    };
    
    // Replace with your Google Apps Script Web App URL
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzrjAyB6jdYe2UJ6K5CEw2sN7eNpI3g7G7T3nFgTmtB7v8PB3BI-PQ5TjN10vaeSvgU/exec';
    
    fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(() => {
      form.style.display = 'none';
      success.classList.add('show');
    })
    .catch(error => {
      console.error('Error:', error);
      btn.innerHTML = originalText;
      btn.disabled = false;
      alert('Something went wrong. Please try again or call us directly.');
    });
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
// Property Cards Data for each sector
const sectorProperties = {
  sector21: {
    name: 'Shivraj Homes – Sector 21',
    badge: 'Sector 21, Gurugram',
    address: 'House No. 337DP, Pocket E, Sector 21, Gurugram',
    popupAddr: 'Sector 21, Gurugram, Haryana 122016',
    price: '₹9,000',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2!2d77.0266!3d28.5021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzA3LjYiTiA3N8KwMDEnMzUuOCJF!5e0!3m2!1sen!2sin!4v1234567890',
    properties: [
      {
        name: 'Shivraj Homes - 21C',
        location: 'Sector 21C, Gurugram',
        price: '₹9,000',
        badge: 'Most Popular',
        image: '1774162250089.png',
        amenities: ['Wi-Fi', 'AC', 'Meals', 'Parking', 'Lift'],
        phone: '+91 96506 03063'
      },
      {
        name: 'Shivraj Homes - Dhundahera',
        location: 'Dhundahera, Gurugram',
        price: '₹8,500',
        badge: 'Budget Friendly',
        image: '1774162263990.png',
        amenities: ['Wi-Fi', 'CCTV', 'Parking', 'Power Backup'],
        phone: '+91 96506 03063'
      }
    ]
  },
  sector22: {
    name: 'Shivraj Homes – Sector 22',
    badge: 'Sector 22, Gurugram',
    address: 'Sector 22, Near Palam Vihar, Gurugram',
    popupAddr: 'Sector 22, Gurugram, Haryana 122015',
    price: '₹9,500',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.5!2d77.0290!3d28.5050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzE4LjAiTiA3N8KwMDEnNDQuMCJF!5e0!3m2!1sen!2sin!4v1234567890',
    properties: [
      {
        name: 'Shivraj Homes - 22A',
        location: 'Sector 22A, Gurugram',
        price: '₹9,500',
        badge: 'Premium',
        image: '1774162307006.png',
        amenities: ['Wi-Fi', 'AC', 'Meals', 'Lift', 'Parking', 'Housekeeping'],
        phone: '+91 96506 03063'
      },
      {
        name: 'Shivraj Homes - 22B',
        location: 'Sector 22B, Gurugram',
        price: '₹9,000',
        badge: 'Best Value',
        image: '1774162320908.png',
        amenities: ['Wi-Fi', 'CCTV', 'Meals', 'Housekeeping', 'Power Backup'],
        phone: '+91 96506 03063'
      },
      {
        name: 'Shivraj Homes - Mullahera',
        location: 'Mullahera, Gurugram',
        price: '₹8,000',
        badge: 'Budget',
        image: '181627717.jpg',
        amenities: ['Wi-Fi', 'Parking', 'Power Backup', 'Water Purifier', 'CCTV'],
        phone: '+91 96506 03063'
      }
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
      {
        name: 'Shivraj Homes - 23A',
        location: 'Sector 23A, Gurugram',
        price: '₹10,000',
        badge: 'New Launch',
        image: '1.jpg',
        amenities: ['Wi-Fi', 'AC', 'Meals', 'Lift', 'Gym Access', 'Parking'],
        phone: '+91 96506 03063'
      }
    ]
  }
};

const locationData = {
  gurugram: sectorProperties.sector21,
  sector21: sectorProperties.sector21,
  sector22: sectorProperties.sector22,
  sector23: sectorProperties.sector23
};

document.addEventListener('DOMContentLoaded', () => {

  const overlay  = document.getElementById('locOverlay');
  const closeBtn = document.getElementById('locClose');
  const form     = document.getElementById('locForm');
  const success  = document.getElementById('locSuccess');

  if (!overlay) return;

  function openPopup(key) {
    const data = locationData[key] || locationData.sector21;
    document.getElementById('locName').textContent      = data.name;
    document.getElementById('locAddress').textContent   = data.address;
    document.getElementById('locBadge').textContent     = data.badge;
    document.getElementById('locPrice').innerHTML       = data.price + '<small>/mo</small>';
    document.getElementById('locPopupAddr').textContent = data.popupAddr;
    document.getElementById('locMap').src               = data.mapSrc;
    
    // Show property cards section and inject cards
    const propertyCardsSection = document.getElementById('propertyCardsSection');
    const propertyCardsContainer = document.getElementById('locPropertyCards');
    
    if (data.properties && data.properties.length > 0) {
      propertyCardsSection.style.display = 'block';
      
      // Generate property cards HTML
      propertyCardsContainer.innerHTML = data.properties.map(prop => `
        <div class="loc-property-card">
          <div class="loc-property-card__image" style="background-image: url('${prop.image}')">
            <span class="loc-property-card__badge">${prop.badge}</span>
          </div>
          <div class="loc-property-card__content">
            <h4 class="loc-property-card__name">${prop.name}</h4>
            <div class="loc-property-card__location">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${prop.location}
            </div>
            <div class="loc-property-card__price">${prop.price}<small>/mo</small></div>
            <div class="loc-property-card__amenities">
              ${prop.amenities.map(a => `<span class="loc-property-card__amenity">${a}</span>`).join('')}
            </div>
            <button class="loc-property-card__btn" onclick="showPropertyContact('${prop.name}', '${prop.phone}')">
              View Details →
            </button>
          </div>
        </div>
      `).join('');
    } else {
      propertyCardsSection.style.display = 'none';
    }
    
    if (form) { form.reset(); form.style.display = 'flex'; success.classList.remove('show'); }
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

// Function to show property contact popup
window.showPropertyContact = function(propertyName, phone) {
  const tempPopup = document.createElement('div');
  tempPopup.className = 'quick-popup--temp';
  tempPopup.style.cssText = 'position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);';
  tempPopup.innerHTML = `
    <div style="background:#fff;border-radius:20px;padding:28px;max-width:320px;text-align:center;">
      <button style="float:right;background:none;border:none;font-size:20px;cursor:pointer;" onclick="this.closest('.quick-popup--temp').remove()">✕</button>
      <div style="font-size:40px;margin-bottom:10px;">🏢</div>
      <h3 style="font-family:Poppins;color:#1E2D5E;margin:10px 0;">${propertyName}</h3>
      <div style="margin:20px 0;">
        <a href="tel:${phone}" style="display:block;background:#C4622D;color:#fff;padding:12px;border-radius:50px;text-decoration:none;margin:10px 0;font-weight:600;">📞 Call ${phone}</a>
        <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" style="display:block;background:#25D366;color:#fff;padding:12px;border-radius:50px;text-decoration:none;margin:10px 0;font-weight:600;">💬 WhatsApp</a>
        <button onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'}); this.closest('.quick-popup--temp').remove(); document.getElementById('locOverlay').classList.remove('open')" style="display:block;background:#1E2D5E;color:#fff;padding:12px;border-radius:50px;border:none;width:100%;font-weight:600;cursor:pointer;">📝 Enquire Now</button>
      </div>
    </div>
  `;
  document.body.appendChild(tempPopup);
};

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
      let key = 'sector21';
      if (text.includes('sector 21')) key = 'sector21';
      if (text.includes('sector 22')) key = 'sector22';
      if (text.includes('sector 23')) key = 'sector23';
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
        <a href="tel:+9192206 01420" class="quick-popup__item">
          <span class="quick-popup__item-icon">📱</span>
          <div>
            <small>Support Line</small>
            <span>+91 92206 01420</span>
          </div>
        </a>
        <a href="tel:+919217234443" class="quick-popup__item">
          <span class="quick-popup__item-icon">📱</span>
          <div>
            <small>Alternate</small>
            <span>+91 92172 34443 </span>
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
      window.open('https://www.linkedin.com/in/mishraaayushi/');
    });
  }

  if (nameB) {
    nameB.style.cursor = 'pointer';
    nameB.title = 'View Aniwesh on LinkedIn';
    nameB.addEventListener('click', () => {
      window.open('https://www.linkedin.com/in/aniwesh-tiwari/');
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
// ===========================
// CHATBOT + WHATSAPP — JS
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  const chatbot       = document.getElementById('chatbot');
  const toggleBtn     = document.getElementById('chatbotToggle');
  const closeBtn      = document.getElementById('chatbotClose');
  const messages      = document.getElementById('chatbotMessages');
  const input         = document.getElementById('chatbotInput');
  const sendBtn       = document.getElementById('chatbotSend');
  const quickReplies  = document.getElementById('quickReplies');
  const badge         = document.getElementById('chatbotBadge');

  if (!chatbot) return;

  // ---- Bot responses ----
  const responses = {
    'what rooms are available?': `We offer 3 room types:\n🏠 <b>1RK Studio</b> — ₹14,000/mo\n🛏️ <b>Co-Living Single</b> — ₹13,000/mo\n👥 <b>Double Sharing</b> — ₹9,000/mo\n\nWould you like to book a visit?`,
    'what is the starting price?': `Our rooms start from just <b>₹9,000/month</b> for double sharing.\n\n💡 All prices include housekeeping, Wi-Fi & security. No hidden charges!`,
    'what amenities do you offer?': `We offer <b>20+ premium amenities</b> including:\n📶 High-Speed Wi-Fi\n❄️ AC Rooms\n🍽️ Tasty Meals\n🧹 Daily Housekeeping\n📷 CCTV Security\n🛗 Lift & Parking\n🔋 Power Backup\n🎮 Indoor Games\n...and much more!`,
    'food menu': `🍽️ <b>Our Daily Food Menu</b> 🍽️\n\n<b>Breakfast (8:00 - 10:00 AM):</b>\n🥛 Milk/Cornflakes\n🍞 Bread Butter/Jam\n🌯 Aloo Paratha + Curd\n☕ Tea/Coffee\n\n<b>Lunch (1:00 - 3:00 PM):</b>\n🍚 Steam Rice\n🍛 Dal Tadka\n🥘 Seasonal Vegetable\n🍞 Roti\n🥗 Salad + Pickle\n<b>Dinner (8:00 - 10:00 PM):</b>\n🍚 Jeera Rice\n🍛 Paneer/Chicken Curry (alternate days)\n🍞 Roti/Naan\n🥗 Salad\n🍨 Dessert (on Sundays)\n\n<b>Special Weekly Items:</b>\n• Monday: Chole Bhature\n• Wednesday: Pav Bhaji\n• Friday: Biryani\n• Sunday: Special Thali + Dessert\n\n🍽️ <i>All meals are home-style, hygienic, and made fresh daily!</i>`,
    'where are you located?': `📍 We have properties across <b>7 prime locations</b>:\n\n• <b>Sector 21C</b>, Dhundahera, Gurugram\n• <b>Sector 22</b>, Gurugram\n• <b>Sector 22A</b>, Gurugram\n• <b>Sector 22B</b>, Gurugram\n• <b>Mullahera</b>, Gurugram\n• <b>Sector 23A</b>, Gurugram\n\n📞 Call us to check availability in your preferred area!`,
    'i want to book a visit': `Great! 🎉 You can book a free visit by calling us:\n📞 <b>+91 96506 03063</b>\n📞 <b>+91 82228 87210</b>\n\nOr use the <b>Contact Us</b> form on our website. We'll confirm your slot within 1 hour!`,
    'how do i contact you?': `You can reach us through:\n📞 <b>+91 9217234443</b>\n📧 <b>contact@shivrajhomes.in</b>\n💬 WhatsApp button on the left\n\nWe're available <b>Mon–Sat, 9AM–8PM</b>.`,
  };

  const defaultResponse = `Thanks for your message! 😊 Our team will get back to you shortly.\n\nFor immediate help, call us at <b>+91 92172 34443</b> or click the WhatsApp button.`;

  // ---- Toggle open/close ----
  function openChat() {
    chatbot.classList.add('open');
    badge.classList.add('hidden');
    input.focus();
  }

  function closeChat() {
    chatbot.classList.remove('open');
  }

  toggleBtn.addEventListener('click', () => {
    chatbot.classList.contains('open') ? closeChat() : openChat();
  });

  closeBtn.addEventListener('click', closeChat);

  // ---- Add message ----
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
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  // ---- Typing indicator ----
  function showTyping() {
    const typing = document.createElement('div');
    typing.classList.add('chatbot__msg', 'chatbot__msg--bot', 'chatbot__typing');
    typing.id = 'typingIndicator';
    typing.innerHTML = `<div class="chatbot__msg-bubble">
      <span class="chatbot__dot"></span>
      <span class="chatbot__dot"></span>
      <span class="chatbot__dot"></span>
    </div>`;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('typingIndicator');
    if (t) t.remove();
  }

  // ---- Send message ----
  function sendMessage(text) {
    if (!text.trim()) return;

    addMessage(text, 'user');
    input.value = '';

    // Hide quick replies after first interaction
    quickReplies.style.display = 'none';

    showTyping();

    setTimeout(() => {
      hideTyping();
      const key = text.toLowerCase();
      const reply = responses[key] || defaultResponse;
      addMessage(reply, 'bot');
    }, 1200);
  }

  sendBtn.addEventListener('click', () => sendMessage(input.value));

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(input.value);
  });

  // ---- Quick reply buttons ----
  document.querySelectorAll('.chatbot__quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sendMessage(btn.dataset.msg);
    });
  });

  // ---- Auto open after 4s with greeting ----
  setTimeout(() => {
    if (!chatbot.classList.contains('open')) {
      badge.classList.remove('hidden');
    }
  }, 4000);

});
document.addEventListener('DOMContentLoaded', () => {

  const overlay      = document.getElementById('authOverlay');
  const closeBtn     = document.getElementById('authClose');
  const leadForm     = document.getElementById('leadForm');
  const successDiv   = document.getElementById('authSuccess');
  const submitBtn    = document.getElementById('leadSubmit');
  const successClose = document.getElementById('authSuccessClose');

  if (!overlay) return;

  // Open after 0.8s
  setTimeout(() => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }, 800);

  function closeAuth() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeAuth);
  successClose && successClose.addEventListener('click', closeAuth);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeAuth(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAuth(); });

  // Submit
  submitBtn.addEventListener('click', () => {
    const name  = document.getElementById('leadName').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();
    const email = document.getElementById('leadEmail').value.trim();

    // Basic validation
    let valid = true;

    [document.getElementById('leadName'),
     document.getElementById('leadPhone'),
     document.getElementById('leadEmail')].forEach(field => {
      if (!field.value.trim()) {
        field.closest('.auth-input-wrap').style.borderColor = '#e53e3e';
        field.addEventListener('input', () => {
          field.closest('.auth-input-wrap').style.borderColor = '';
        }, { once: true });
        valid = false;
      }
    });

    if (!valid) return;

    // Show loading
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    setTimeout(() => {
      leadForm.style.display = 'none';
      successDiv.classList.add('show');
    }, 1000);
  });

  // Label focus color
  document.querySelectorAll('.auth-input-wrap input, .auth-input-wrap textarea').forEach(field => {
    field.addEventListener('focus', () => {
      const label = field.closest('.auth-field')?.querySelector('label');
      if (label) label.style.color = '#C4622D';
    });
    field.addEventListener('blur', () => {
      const label = field.closest('.auth-field')?.querySelector('label');
      if (label) label.style.color = '';
    });
  });

});

window.open('https://www.linkedin.com/in/mishraaayushi/'); 
window.open('https://www.linkedin.com/in/aniwesh-tiwari/');