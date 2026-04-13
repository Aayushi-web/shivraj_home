// ===========================
// COMPLETE JAVASCRIPT - SHIVRAJ HOMES
// ===========================

document.addEventListener('DOMContentLoaded', function() {

  // ==================== NAVBAR & HAMBURGER ====================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger && navMenu) {
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    };
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchstart', toggleMenu);
  }
  
  // ==================== DROPDOWN TOGGLE (MOBILE FRIENDLY) ====================
  const dropdownToggles = document.querySelectorAll('.navbar__dropdown-toggle');
  const dropdowns = document.querySelectorAll('.navbar__dropdown');
  
  dropdownToggles.forEach(toggle => {
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);
    
    const handleToggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const parentDropdown = newToggle.closest('.navbar__dropdown');
      const isOpen = parentDropdown.classList.contains('open');
      
      dropdowns.forEach(d => {
        d.classList.remove('open');
        const btn = d.querySelector('.navbar__dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      
      if (!isOpen) {
        parentDropdown.classList.add('open');
        newToggle.setAttribute('aria-expanded', 'true');
      }
    };
    
    newToggle.addEventListener('click', handleToggle);
    newToggle.addEventListener('touchstart', handleToggle);
  });
  
  // Close dropdown when clicking outside
  const closeAllDropdowns = () => {
    dropdowns.forEach(d => {
      d.classList.remove('open');
      const btn = d.querySelector('.navbar__dropdown-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  };
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar__dropdown')) closeAllDropdowns();
  });
  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.navbar__dropdown')) closeAllDropdowns();
  });
  
  // Active link highlight
  const navLinks = document.querySelectorAll('.navbar__link:not(.navbar__dropdown-toggle)');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // ==================== HERO SLIDESHOW ====================
  const slides = document.querySelectorAll('.hero__slide');
  let currentSlide = 0;
  
  if (slides.length > 0) {
    function nextSlide() {
      const prev = currentSlide;
      currentSlide = (currentSlide + 1) % slides.length;
      slides[prev].classList.remove('active');
      slides[prev].classList.add('exit');
      slides[currentSlide].classList.add('active');
      setTimeout(() => slides[prev].classList.remove('exit'), 800);
    }
    setInterval(nextSlide, 4000);
  }
  
  // ==================== ROOMS SECTION - SCROLL ANIMATION & RIPPLE ====================
  const roomsCards = document.querySelectorAll('.rooms__card');
  
  const roomsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = entry.target.classList.contains('rooms__card--featured') ? 'translateY(-12px)' : 'translateY(0)';
        }, i * 150);
        roomsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  roomsCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transform = 'translateY(30px)';
    roomsObserver.observe(card);
    
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('rooms__ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(196,98,45,0.18);transform:scale(0);animation:roomsRipple 0.55s linear;pointer-events:none;z-index:0;width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;`;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
  
  // Add ripple keyframes
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `@keyframes roomsRipple { to { transform: scale(2.5); opacity: 0; } }`;
  document.head.appendChild(rippleStyle);
  
  // ==================== EXPLORE ROOMS BUTTON ====================
  const exploreBtn = document.querySelector('.hero__btn--primary');
  const roomsSection = document.querySelector('.rooms');
  if (exploreBtn && roomsSection) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      roomsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  
  // ==================== AMENITIES SECTION ====================
  const amenityCards = document.querySelectorAll('.amenities__card');
  const amenityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(amenityCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 60);
        amenityObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  amenityCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    amenityObserver.observe(card);
    
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(196,98,45,0.15);transform:scale(0);animation:amenitiesRipple 0.5s linear;pointer-events:none;z-index:0;width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;`;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
  
  const amenityRippleStyle = document.createElement('style');
  amenityRippleStyle.textContent = `@keyframes amenitiesRipple { to { transform: scale(3); opacity: 0; } }`;
  document.head.appendChild(amenityRippleStyle);
  
  // ==================== WHY CHOOSE US SECTION ====================
  const whyCards = document.querySelectorAll('.why__card');
  const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(whyCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 120);
        whyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  
  whyCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    whyObserver.observe(card);
    
    card.addEventListener('click', function(e) {
      if (e.target.closest('.why__card-cta')) return;
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.12);transform:scale(0);animation:whyRipple 0.55s linear;pointer-events:none;z-index:0;width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;`;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
  
  const whyRippleStyle = document.createElement('style');
  whyRippleStyle.textContent = `@keyframes whyRipple { to { transform: scale(2.5); opacity: 0; } }`;
  document.head.appendChild(whyRippleStyle);
  
  // Animate stats counters
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
  
  // ==================== REVIEWS SLIDER ====================
  const slider = document.getElementById('reviewSlider');
  const prevBtn = document.getElementById('reviewPrev');
  const nextBtn = document.getElementById('reviewNext');
  const dotsWrap = document.getElementById('reviewDots');
  
  if (slider) {
    const reviewCards = slider.querySelectorAll('.reviews__card');
    const total = reviewCards.length;
    let current = 0;
    let autoTimer = null;
    
    const visibleCount = () => window.innerWidth <= 1024 ? 1 : 2;
    
    function buildDots() {
      if (!dotsWrap) return;
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
      if (!dotsWrap) return;
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
    function stopAuto() { if (autoTimer) clearInterval(autoTimer); }
    
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); stopAuto(); startAuto(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
    
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
    
    buildDots();
    goTo(0);
    startAuto();
  }
  
  // ==================== CONTACT FORM ====================
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
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;
      
      setTimeout(() => {
        contactForm.style.display = 'none';
        if (contactSuccess) contactSuccess.classList.add('show');
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1200);
    });
  }
  
  if (contactBack && contactForm && contactSuccess) {
    contactBack.addEventListener('click', () => {
      contactSuccess.classList.remove('show');
      contactForm.style.display = 'flex';
      contactForm.reset();
    });
  }
  
  // Contact form field focus
  document.querySelectorAll('.contact__field input, .contact__field select, .contact__field textarea').forEach(field => {
    field.addEventListener('focus', () => { field.closest('.contact__field').querySelector('label').style.color = '#C4622D'; });
    field.addEventListener('blur', () => { field.closest('.contact__field').querySelector('label').style.color = ''; });
  });
  
  // ==================== LOCATION POPUP & PROPERTY CARDS ====================
  const sectorPropertiesData = {
    sector21: {
      name: 'Shivraj Homes – Sector 21',
      badge: 'Sector 21, Gurugram',
      address: 'House No. 337DP, Pocket E, Sector 21, Gurugram',
      popupAddr: 'Sector 21, Gurugram, Haryana 122016',
      price: '₹9,000',
      mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2!2d77.0266!3d28.5021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzA3LjYiTiA3N8KwMDEnMzUuOCJF!5e0!3m2!1sen!2sin!4v1234567890',
      properties: [
        { name: 'Shivraj Homes - 21C', location: 'Sector 21C, Gurugram', price: '₹9,000', badge: 'Most Popular', image: '1774162250089.png', amenities: ['Wi-Fi', 'AC', 'Meals', 'Parking'], phone: '+91 ' },
        { name: 'Shivraj Homes - Dhundahera', location: 'Dhundahera, Gurugram', price: '₹8,500', badge: 'Budget Friendly', image: '1774162263990.png', amenities: ['Wi-Fi', 'CCTV', 'Parking'], phone: '+91 9217234443' }
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
        { name: 'Shivraj Homes - 22A', location: 'Sector 22A, Gurugram', price: '₹9,500', badge: 'Premium', image: '1774162307006.png', amenities: ['Wi-Fi', 'AC', 'Meals', 'Lift'], phone: '+91 99217234443' },
        { name: 'Shivraj Homes - 22B', location: 'Sector 22B, Gurugram', price: '₹9,000', badge: 'Best Value', image: '1774162320908.png', amenities: ['Wi-Fi', 'CCTV', 'Meals'], phone: '+91 9217234443' },
        { name: 'Shivraj Homes - Mullahera', location: 'Mullahera, Gurugram', price: '₹8,000', badge: 'Budget', image: '181627717.jpg', amenities: ['Wi-Fi', 'Parking', 'Power Backup'], phone: '+91 9217234443' }
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
        { name: 'Shivraj Homes - 23A', location: 'Sector 23A, Gurugram', price: '₹10,000', badge: 'New Launch', image: '1.jpg', amenities: ['Wi-Fi', 'AC', 'Meals', 'Lift'], phone: '+91 9217234443' }
      ]
    }
  };
  
  const locOverlay = document.getElementById('locOverlay');
  const locClose = document.getElementById('locClose');
  const locForm = document.getElementById('locForm');
  const locSuccess = document.getElementById('locSuccess');
  
  window.openLocationPopup = function(key) {
    const data = sectorPropertiesData[key];
    if (!data) return;
    
    const locName = document.getElementById('locName');
    const locAddress = document.getElementById('locAddress');
    const locBadge = document.getElementById('locBadge');
    const locPrice = document.getElementById('locPrice');
    const locPopupAddr = document.getElementById('locPopupAddr');
    const locMap = document.getElementById('locMap');
    
    if (locName) locName.textContent = data.name;
    if (locAddress) locAddress.textContent = data.address;
    if (locBadge) locBadge.textContent = data.badge;
    if (locPrice) locPrice.innerHTML = data.price + '<small>/mo</small>';
    if (locPopupAddr) locPopupAddr.textContent = data.popupAddr;
    if (locMap) locMap.src = data.mapSrc;
    
    const cardsContainer = document.getElementById('locPropertyCards');
    const cardsSection = document.getElementById('propertyCardsSection');
    
    if (cardsContainer && data.properties && data.properties.length > 0) {
      if (cardsSection) cardsSection.style.display = 'block';
      cardsContainer.innerHTML = data.properties.map(prop => `
        <div class="loc-property-card">
          <div class="loc-property-card__image" style="background-image: url('${prop.image}')">
            <span class="loc-property-card__badge">${prop.badge}</span>
          </div>
          <div class="loc-property-card__content">
            <h4 class="loc-property-card__name">${prop.name}</h4>
            <div class="loc-property-card__price">${prop.price}<small>/mo</small></div>
            <div class="loc-property-card__amenities">
              ${prop.amenities.map(a => `<span class="loc-property-card__amenity">${a}</span>`).join('')}
            </div>
            <button class="loc-property-card__btn" onclick="showPropertyContact('${prop.name}', '${prop.phone}')">View Details →</button>
          </div>
        </div>
      `).join('');
    } else if (cardsSection) {
      cardsSection.style.display = 'none';
    }
    
    if (locOverlay) {
      locOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };
  
  window.closeLocationPopup = function() {
    if (locOverlay) {
      locOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };
  
  window.showPropertyContact = function(name, phone) {
    const existing = document.querySelector('.property-contact-popup');
    if (existing) existing.remove();
    
    const popup = document.createElement('div');
    popup.className = 'property-contact-popup';
    popup.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:100000;display:flex;align-items:center;justify-content:center;';
    popup.innerHTML = `
      <div style="background:#fff;border-radius:24px;padding:28px 24px;max-width:320px;width:85%;text-align:center;position:relative;">
        <button onclick="this.closest('.property-contact-popup').remove()" style="position:absolute;top:12px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;">✕</button>
        <div style="font-size:48px;margin-bottom:10px;">🏢</div>
        <h3 style="color:#1E2D5E;margin:10px 0;font-family:Poppins;font-size:1.2rem;">${name}</h3>
        <a href="tel:${phone}" style="display:block;background:#C4622D;color:#fff;padding:12px;border-radius:50px;margin:12px 0;text-decoration:none;font-weight:600;">📞 Call ${phone}</a>
        <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" style="display:block;background:#25D366;color:#fff;padding:12px;border-radius:50px;margin:12px 0;text-decoration:none;font-weight:600;">💬 WhatsApp</a>
        <button onclick="closeLocationPopup(); this.closest('.property-contact-popup').remove(); document.getElementById('contact').scrollIntoView({behavior:'smooth'})" style="background:#1E2D5E;color:#fff;padding:12px;border-radius:50px;border:none;width:100%;font-weight:600;cursor:pointer;">📝 Enquire Now</button>
      </div>
    `;
    document.body.appendChild(popup);
  };
  
  // Attach dropdown item events
  const dropdownItems = document.querySelectorAll('.navbar__dropdown-item');
  dropdownItems.forEach(item => {
    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);
    
    const handleLocationClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = newItem.textContent.trim().toLowerCase();
      let key = 'sector21';
      if (text.includes('sector 21')) key = 'sector21';
      if (text.includes('sector 22')) key = 'sector22';
      if (text.includes('sector 23')) key = 'sector23';
      window.openLocationPopup(key);
      closeAllDropdowns();
    };
    
    newItem.addEventListener('click', handleLocationClick);
    newItem.addEventListener('touchstart', handleLocationClick);
  });
  
  if (locClose) {
    locClose.addEventListener('click', window.closeLocationPopup);
    locClose.addEventListener('touchstart', window.closeLocationPopup);
  }
  
  if (locOverlay) {
    locOverlay.addEventListener('click', function(e) {
      if (e.target === this) window.closeLocationPopup();
    });
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeLocationPopup();
  });
  
    // Location popup form with Google Sheets integration
  if (locForm) {
    locForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let valid = true;
      const nameField = document.getElementById('locNameInput');
      const phoneField = document.getElementById('locPhone');
      
      if (!nameField.value.trim()) {
        nameField.style.borderColor = '#e53e3e';
        nameField.addEventListener('input', () => { nameField.style.borderColor = ''; }, { once: true });
        valid = false;
      }
      if (!phoneField.value.trim()) {
        phoneField.style.borderColor = '#e53e3e';
        phoneField.addEventListener('input', () => { phoneField.style.borderColor = ''; }, { once: true });
        valid = false;
      }
      
      if (!valid) return;
      
      const btn = locForm.querySelector('.loc-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;
      
      // Get current property/sector name
      const currentPropertyName = document.getElementById('locName')?.textContent || 'Unknown Property';
      
      // Collect form data
      const formData = {
        name: document.getElementById('locNameInput').value,
        phone: document.getElementById('locPhone').value,
        email: document.getElementById('locEmail').value || '',
        roomType: document.getElementById('locRoomType').value,
        budget: document.getElementById('locBudget').value || '',
        message: document.getElementById('locMessage').value || '',
        source: 'Location Popup Form',
        property: currentPropertyName,
        timestamp: new Date().toISOString()
      };
      
      // REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxbENPBstQxM_LDQQC2ViWEAmA7O9apJF4-aVHebc3Llu851DGwpTgcImYL3APfNrdo/exec';
      
      // Send data to Google Sheets
      fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .catch(error => console.error('Error sending to Google Sheet:', error));
      
      // Show success message (even if sheet fails, user gets confirmation)
      setTimeout(() => {
        locForm.style.display = 'none';
        if (locSuccess) locSuccess.classList.add('show');
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 1000);
    });
  }
  
  // Location form field focus
  document.querySelectorAll('.loc-field input, .loc-field select, .loc-field textarea').forEach(field => {
    field.addEventListener('focus', () => { field.closest('.loc-field').querySelector('label').style.color = '#C4622D'; });
    field.addEventListener('blur', () => { field.closest('.loc-field').querySelector('label').style.color = ''; });
  });
  
  // Thumbnail switcher
  window.switchImg = function(el) {
    const mainImg = document.getElementById('locMainImg');
    if (mainImg) mainImg.src = el.src;
    document.querySelectorAll('.loc-gallery__thumbs img').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  };
  
  // ==================== WHATSAPP BUTTON FIX ====================
  const waBtn = document.querySelector('.float-wa');
  if (waBtn) {
    waBtn.addEventListener('touchstart', function() {
      setTimeout(() => window.open(this.href, '_blank'), 100);
    });
  }
  
  // ==================== REVIEW BUTTON FIX ====================
  const reviewBtn = document.querySelector('.reviews__add-btn');
  if (reviewBtn) {
    reviewBtn.addEventListener('touchstart', function() {
      setTimeout(() => window.open(this.href, '_blank'), 100);
    });
  }
  
  // ==================== CHATBOT ====================
  const chatbot = document.getElementById('chatbot');
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSend = document.getElementById('chatbotSend');
  const chatbotBadge = document.getElementById('chatbotBadge');
  
  const chatbotResponses = {
    'what rooms are available?': `We offer 3 room types:\n🏠 <b>1RK Studio</b> — ₹14,000/mo\n🛏️ <b>Co-Living Single</b> — ₹13,000/mo\n👥 <b>Double Sharing</b> — ₹9,000/mo\n\nWould you like to book a visit?`,
    'what is the starting price?': `Our rooms start from just <b>₹9,000/month</b> for double sharing.\n\n💡 All prices include housekeeping, Wi-Fi & security. No hidden charges!`,
    'what amenities do you offer?': `We offer <b>20+ premium amenities</b> including:\n📶 High-Speed Wi-Fi\n❄️ AC Rooms\n🍽️ Tasty Meals\n🧹 Daily Housekeeping\n📷 CCTV Security\n🛗 Lift & Parking\n🔋 Power Backup\n🎮 Indoor Games\n...and much more!`,
    'food menu': `🍽️ <b>Our Daily Food Menu</b> 🍽️\n\n<b>Breakfast (8:00 - 10:00 AM):</b>\n🥛 Milk/Cornflakes\n🍞 Bread Butter/Jam\n🌯 Aloo Paratha + Curd\n☕ Tea/Coffee\n\n<b>Lunch (1:00 - 3:00 PM):</b>\n🍚 Steam Rice\n🍛 Dal Tadka\n🥘 Seasonal Vegetable\n🍞 Roti\n🥗 Salad + Pickle\n\n<b>Evening Snacks (5:00 - 6:00 PM):</b>\n☕ Tea/Coffee\n🍪 Biscuits/Namkeen\n🥪 Sometimes Sandwiches/Pakora\n\n<b>Dinner (8:00 - 10:00 PM):</b>\n🍚 Jeera Rice\n🍛 Paneer/Chicken Curry (alternate days)\n🍞 Roti/Naan\n🥗 Salad\n🍨 Dessert (on Sundays)\n\n<b>Special Weekly Items:</b>\n• Monday: Chole Bhature\n• Wednesday: Pav Bhaji\n• Friday: Biryani\n• Sunday: Special Thali + Dessert\n\n🍽️ <i>All meals are home-style, hygienic, and made fresh daily!</i>`,
    'where are you located?': `📍 We have properties across <b>7 prime locations</b>:\n\n• <b>Sector 21C</b>, Dhundahera, Gurugram\n• <b>Sector 22</b>, Gurugram\n• <b>Sector 22A</b>, Gurugram\n• <b>Sector 22B</b>, Gurugram\n• <b>Mullahera</b>, Gurugram\n• <b>Sector 23A</b>, Gurugram\n\n📞 Call us to check availability in your preferred area!`,
    'i want to book a visit': `Great! 🎉 You can book a free visit by calling us:\n📞 <b>+91 9217234443</b>\n📞 <b>+91 82228 87210</b>\n\nOr use the <b>Contact Us</b> form on our website. We'll confirm your slot within 1 hour!`,
    'how do i contact you?': `You can reach us through:\n📞 <b>+91 9217234443</b>\n📧 <b>contact@shivrajhomes.in</b>\n💬 WhatsApp button on the left\n\nWe're available <b>Mon–Sat, 9AM–8PM</b>.`
  };
  const defaultResponse = `Thanks for your message! 😊 Our team will get back to you shortly.\n\nFor immediate help, call us at <b>+91 92172 34443</b> or click the WhatsApp button.`;
  
  if (chatbot && chatbotToggle) {
    function openChat() {
      chatbot.classList.add('open');
      if (chatbotBadge) chatbotBadge.classList.add('hidden');
      if (chatbotInput) chatbotInput.focus();
    }
    
    function closeChat() { chatbot.classList.remove('open'); }
    
    chatbotToggle.addEventListener('click', () => chatbot.classList.contains('open') ? closeChat() : openChat());
    if (chatbotClose) chatbotClose.addEventListener('click', closeChat);
    
    function addMessage(text, sender) {
      if (!chatbotMessages) return;
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
      chatbotMessages.appendChild(msg);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function showTyping() {
      if (!chatbotMessages) return;
      const typing = document.createElement('div');
      typing.classList.add('chatbot__msg', 'chatbot__msg--bot', 'chatbot__typing');
      typing.id = 'typingIndicator';
      typing.innerHTML = `<div class="chatbot__msg-bubble"><span class="chatbot__dot"></span><span class="chatbot__dot"></span><span class="chatbot__dot"></span></div>`;
      chatbotMessages.appendChild(typing);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function hideTyping() {
      const typing = document.getElementById('typingIndicator');
      if (typing) typing.remove();
    }
    
    function sendMessage(text) {
      if (!text.trim()) return;
      addMessage(text, 'user');
      if (chatbotInput) chatbotInput.value = '';
      
      const quickReplies = document.getElementById('quickReplies');
      if (quickReplies) quickReplies.style.display = 'none';
      
      showTyping();
      setTimeout(() => {
        hideTyping();
        const key = text.toLowerCase();
        const reply = chatbotResponses[key] || defaultResponse;
        addMessage(reply, 'bot');
      }, 1200);
    }
    
    if (chatbotSend) chatbotSend.addEventListener('click', () => sendMessage(chatbotInput ? chatbotInput.value : ''));
    if (chatbotInput) chatbotInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(chatbotInput.value); });
    
    document.querySelectorAll('.chatbot__quick-btn').forEach(btn => {
      btn.addEventListener('click', () => sendMessage(btn.dataset.msg));
    });
    
    setTimeout(() => {
      if (!chatbot.classList.contains('open') && chatbotBadge) chatbotBadge.classList.remove('hidden');
    }, 4000);
  }
  
  // ==================== LEAD POPUP ====================
  const authOverlay = document.getElementById('authOverlay');
  const authClose = document.getElementById('authClose');
  const leadSubmit = document.getElementById('leadSubmit');
  const authSuccess = document.getElementById('authSuccess');
  const leadForm = document.getElementById('leadForm');
  const authSuccessClose = document.getElementById('authSuccessClose');
  
  if (authOverlay) {
    setTimeout(() => {
      authOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }, 800);
    
    function closeAuth() {
      authOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    
    if (authClose) authClose.addEventListener('click', closeAuth);
    if (authSuccessClose) authSuccessClose.addEventListener('click', closeAuth);
    authOverlay.addEventListener('click', (e) => { if (e.target === authOverlay) closeAuth(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAuth(); });
  }
  
  if (leadSubmit) {
    leadSubmit.addEventListener('click', () => {
      let valid = true;
      const nameField = document.getElementById('leadName');
      const phoneField = document.getElementById('leadPhone');
      const emailField = document.getElementById('leadEmail');
      
      if (!nameField.value.trim()) {
        nameField.closest('.auth-input-wrap').style.borderColor = '#e53e3e';
        nameField.addEventListener('input', () => { nameField.closest('.auth-input-wrap').style.borderColor = ''; }, { once: true });
        valid = false;
      }
      if (!phoneField.value.trim()) {
        phoneField.closest('.auth-input-wrap').style.borderColor = '#e53e3e';
        phoneField.addEventListener('input', () => { phoneField.closest('.auth-input-wrap').style.borderColor = ''; }, { once: true });
        valid = false;
      }
      if (!emailField.value.trim()) {
        emailField.closest('.auth-input-wrap').style.borderColor = '#e53e3e';
        emailField.addEventListener('input', () => { emailField.closest('.auth-input-wrap').style.borderColor = ''; }, { once: true });
        valid = false;
      }
      
      if (!valid) return;
      
      leadSubmit.textContent = 'Submitting...';
      leadSubmit.disabled = true;
      
      setTimeout(() => {
        if (leadForm) leadForm.style.display = 'none';
        if (authSuccess) authSuccess.classList.add('show');
        leadSubmit.textContent = 'Get Quick Response';
        leadSubmit.disabled = false;
      }, 1000);
    });
  }
  
  // Lead form field focus
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
  
  // ==================== CREATOR NAMES LINKEDIN ====================
  const nameA = document.querySelector('.footer__credits-name--a');
  const nameB = document.querySelector('.footer__credits-name--b');
  
  if (nameA) {
    nameA.style.cursor = 'pointer';
    nameA.addEventListener('click', () => window.open('https://www.linkedin.com/in/mishraaayushi/', '_blank'));
    nameA.addEventListener('touchstart', () => setTimeout(() => window.open('https://www.linkedin.com/in/mishraaayushi/', '_blank'), 100));
  }
  
  if (nameB) {
    nameB.style.cursor = 'pointer';
    nameB.addEventListener('click', () => window.open('https://www.linkedin.com/in/aniwesh-tiwari/', '_blank'));
    nameB.addEventListener('touchstart', () => setTimeout(() => window.open('https://www.linkedin.com/in/aniwesh-tiwari/', '_blank'), 100));
  }
  
  // ==================== BOOK VISIT & CONTACT POPUPS ====================
  const bookVisitBtn = document.querySelector('.hero__btn--secondary');
  const contactCta = document.querySelector('.navbar__cta');
  const talkBtn = document.querySelector('.why__card-cta');
  
  function createQuickPopup(title, subtitle, items) {
    const existing = document.querySelector('.quick-popup-temp');
    if (existing) existing.remove();
    
    const popup = document.createElement('div');
    popup.className = 'quick-popup-temp';
    popup.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:100000;display:flex;align-items:center;justify-content:center;';
    popup.innerHTML = `
      <div style="background:#fff;border-radius:24px;padding:28px 24px;max-width:340px;width:85%;text-align:center;position:relative;">
        <button onclick="this.closest('.quick-popup-temp').remove()" style="position:absolute;top:12px;right:16px;background:none;border:none;font-size:22px;cursor:pointer;">✕</button>
        <div style="font-size:48px;margin-bottom:10px;">${items[0]?.icon || '📞'}</div>
        <h3 style="color:#1E2D5E;margin:10px 0;font-family:Poppins;">${title}</h3>
        <p style="color:#888;margin-bottom:20px;">${subtitle}</p>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${items.map(item => `<a href="${item.href}" style="display:block;background:${item.bg || '#C4622D'};color:#fff;padding:12px;border-radius:50px;text-decoration:none;font-weight:600;">${item.text}</a>`).join('')}
        </div>
      </div>
    `;
    document.body.appendChild(popup);
  }
  
  if (bookVisitBtn) {
    bookVisitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      createQuickPopup('Book a Visit', 'Call us to schedule your free property tour today', [
        { icon: '📞', text: '📞 Call +91 94662 46821', href: 'tel:+919466246821', bg: '#C4622D' },
        { icon: '💬', text: '💬 WhatsApp Us', href: 'https://wa.me/919466246821', bg: '#25D366' }
      ]);
    });
  }
  
  if (contactCta) {
    contactCta.addEventListener('click', (e) => {
      e.preventDefault();
      createQuickPopup('Get In Touch', 'We\'re happy to help you find your perfect room', [
        { text: '📞 Call +91 9217234443', href: 'tel:+919217234443', bg: '#C4622D' },
        { text: '📧 Email contact@shivrajhomes.in', href: 'mailto:contact@shivrajhomes.in', bg: '#1E2D5E' }
      ]);
    });
  }
  
  if (talkBtn) {
    talkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      createQuickPopup('24/7 Support', 'Our team is always here — call us anytime', [
        { text: '📞 Call +91 92206 01420', href: 'tel:+919220601420', bg: '#C4622D' },
        { text: '📞 Alternate +91 92172 34443', href: 'tel:+919217234443', bg: '#1E2D5E' }
      ]);
    });
  }
  
  console.log('Shivraj Homes website loaded successfully!');
  
});