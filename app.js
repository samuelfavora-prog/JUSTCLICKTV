/* ==========================================
   JUST CLICK TV - Application Logic
   ========================================== */

// --- DATA STORES ---
const PRODUCTS = [
  // SECTION 1: TV Box + Subscription Packages
  {
    id: 'tvbox-pkg-1',
    category: 'tvbox',
    name: 'JUST CLICK TV 4K Box + Subscription',
    description: 'Ultimate 4K Android TV Box paired with premium international IPTV streaming subscription.',
    basePrice1Yr: 120,
    basePrice2Yr: 199,
    image: 'assets/tv_box.jpg',
    features: ['4K Ultra HD & HDR10 Support', 'Pre-installed App Suite', 'Anti-Freezing 99.9% Uptime', 'Dedicated Remote + AC Adapter Included', '24/7 VIP Customer Support'],
    supportsCountry: true
  },
  // SECTION 2: Smart TV Subscriptions
  {
    id: 'smarttv-sub-1',
    category: 'smarttv',
    name: 'Smart TV Unlimited IPTV Subscription',
    description: 'No hardware needed. Instant activation directly on Samsung, LG, Sony or Android Smart TVs.',
    basePrice1Yr: 75,
    basePrice2Yr: 130,
    image: 'assets/smart_tv_app.jpg',
    features: ['Works on Smart IPTV, IBO Player, TiviMate', '18,000+ Premium Live Channels', 'Electronic Program Guide (EPG)', 'Instant QR Code Setup', 'Multi-device Compatible'],
    supportsCountry: true
  },
  // SECTION 3: Smart TV Movie App
  {
    id: 'movieapp-sub-1',
    category: 'movieapp',
    name: 'JUST CLICK Cinema & VOD App',
    description: 'Dedicated movie app with unlimited access to latest blockbusters, TV series & multi-language VoD.',
    basePrice1Yr: 60,
    basePrice2Yr: 105,
    image: 'assets/movie_app.jpg',
    features: ['60,000+ Movies & TV Series', 'Daily Content Updates', 'Multi-Audio & Subtitles', '4K & Full HD Quality', 'Fast CDN Servers Worldwide'],
    supportsCountry: false
  },
  // SECTION 4: Hardware Store
  {
    id: 'hw-tvbox',
    category: 'hardware',
    name: 'JUST CLICK 4K Android TV Box (Standalone)',
    description: 'High performance quad-core 4K IPTV box with 4GB RAM & 32GB Storage.',
    price: 65,
    image: 'assets/tv_box.jpg',
    features: ['Android TV OS', '4GB RAM / 32GB Storage', 'Dual-Band WiFi + Ethernet', 'Bluetooth 5.0'],
    supportsCountry: false
  },
  {
    id: 'hw-adapter',
    category: 'hardware',
    name: 'Universal 12V 2A AC Adapter',
    description: 'Heavy-duty regulated power supply adapter compatible with all JUST CLICK TV boxes.',
    price: 18,
    image: 'assets/ac_adapter.jpg',
    features: ['Over-voltage protection', '1.5 Meter Cable', 'UK / EU / US Plug Option'],
    supportsCountry: false
  },
  {
    id: 'hw-remote',
    category: 'hardware',
    name: 'JUST CLICK TV Voice & IR Remote',
    description: 'Ergonomic smart remote control with voice search button and learning IR keys.',
    price: 22,
    image: 'assets/tv_remote.jpg',
    features: ['Voice Control Assistant', 'Programmable TV Keys', 'Soft Anti-slip Buttons'],
    supportsCountry: false
  }
];

// Initial Downloads List
let DOWNLOADS = [
  {
    id: 'dl-1',
    name: 'JUST CLICK TV Smart Player',
    type: 'apk',
    size: '34.2 MB',
    version: 'v4.5.1',
    description: 'Official Android APK for TV Boxes and Smart TVs.',
    content: 'JUST CLICK TV APK Binary Installer Payload v4.5.1'
  },
  {
    id: 'dl-2',
    name: 'User Setup & Channel Guide',
    type: 'pdf',
    size: '2.8 MB',
    version: '2026 Manual',
    description: 'Comprehensive PDF manual for Smart TV activation.',
    content: 'JUST CLICK TV OFFICIAL USER SETUP MANUAL 2026'
  },
  {
    id: 'dl-3',
    name: 'Playlist Backup & Codecs Bundle',
    type: 'zip',
    size: '15.4 MB',
    version: 'v2.0',
    description: 'ZIP archive containing hardware codecs and m3u utilities.',
    content: 'JUST CLICK TV CODECS & PLAYLIST ARCHIVE ZIP'
  },
  {
    id: 'dl-4',
    name: 'Web Player Express Launcher',
    type: 'html',
    size: '450 KB',
    version: 'v1.2',
    description: 'Standalone HTML portal for desktop streaming.',
    content: '<!DOCTYPE html><html><head><title>JUST CLICK Web Player</title></head><body><h1>JUST CLICK TV Web Streaming Portal</h1></body></html>'
  },
  {
    id: 'dl-5',
    name: 'Windows Desktop Media Center',
    type: 'software',
    size: '88.5 MB',
    version: 'v3.1',
    description: 'Installer executable for Windows 10/11 PCs.',
    content: 'JUST CLICK TV WINDOWS MEDIA CENTER INSTALLER'
  }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('justclick_cart')) || [];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderTVBoxSection();
  renderSmartTVSection();
  renderMovieAppSection();
  renderHardwareSection();
  renderDownloadsCenter();
  initFAQAccordion();
  initContactForm();
  updateCartUI();
  initWhatsAppButton();
});

// --- NAVIGATION & STICKY HEADER ---
function initNavigation() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile nav when clicking links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });
}

// --- RENDER SECTION 1: TV BOX PACKAGES ---
function renderTVBoxSection() {
  const container = document.getElementById('tvbox-container');
  if (!container) return;

  const product = PRODUCTS.find(p => p.id === 'tvbox-pkg-1');
  const html = `
    <div class="product-card">
      <span class="product-badge">Top Selling</span>
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <ul class="product-features">
          ${product.features.map(f => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> ${f}</li>`).join('')}
        </ul>
        <div class="card-options">
          <label class="option-label">1. Select Subscription Duration</label>
          <div class="duration-pills">
            <button type="button" class="duration-pill active" onclick="selectDuration('tvbox-1', 1, ${product.basePrice1Yr})">1 Year ($${product.basePrice1Yr})</button>
            <button type="button" class="duration-pill" onclick="selectDuration('tvbox-1', 2, ${product.basePrice2Yr})">2 Years ($${product.basePrice2Yr})</button>
          </div>
          <label class="option-label">2. Select Primary Content Package</label>
          <select id="tvbox-1-country" class="custom-select" style="width: 100%;">
            <option value="Global VIP (All Languages)">Global VIP (All Languages)</option>
            <option value="Arabic Package">Arabic Package</option>
            <option value="English Package (UK/US/CA)">English Package (UK/US/CA)</option>
            <option value="Italian Package">Italian Package</option>
            <option value="Indian / South Asian Package">Indian / South Asian Package</option>
            <option value="Turkish Package">Turkish Package</option>
            <option value="Persian Package">Persian Package</option>
            <option value="German Package">German Package</option>
            <option value="African Package">African Package</option>
            <option value="French Package">French Package</option>
            <option value="Spanish Package">Spanish Package</option>
          </select>
        </div>
      </div>
      <div>
        <div class="price-container">
          <span class="price-currency">$</span>
          <span class="price-amount" id="tvbox-1-price">${product.basePrice1Yr}</span>
          <span class="price-period" id="tvbox-1-period">/ 1 Year + Box</span>
        </div>
        <button class="btn btn-gold" style="width:100%;" onclick="addTVBoxToCart('tvbox-pkg-1')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          Add To Cart & Order
        </button>
      </div>
    </div>
  `;
  container.innerHTML = html;
}

// Track duration selections state
const selectionState = {
  'tvbox-1': { duration: 1, price: 120 },
  'smarttv-1': { duration: 1, price: 75 },
  'movieapp-1': { duration: 1, price: 60 }
};

window.selectDuration = function(pkgId, yrs, price) {
  selectionState[pkgId] = { duration: yrs, price: price };
  
  // Update button active state
  const pills = document.querySelectorAll(`[onclick*="${pkgId}"]`);
  pills.forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');

  // Update UI price
  const priceElem = document.getElementById(`${pkgId}-price`);
  const periodElem = document.getElementById(`${pkgId}-period`);
  if (priceElem) priceElem.innerText = price;
  if (periodElem) periodElem.innerText = yrs === 1 ? '/ 1 Year' : '/ 2 Years';
};

window.addTVBoxToCart = function(productId) {
  const country = document.getElementById('tvbox-1-country').value;
  const state = selectionState['tvbox-1'];
  const prod = PRODUCTS.find(p => p.id === productId);

  addToCart({
    id: `${productId}-${state.duration}yr-${country}`,
    name: `${prod.name} (${state.duration} Year)`,
    option: `Country: ${country}`,
    price: state.price,
    image: prod.image,
    qty: 1
  });
};

// --- RENDER SECTION 2: SMART TV SUBSCRIPTIONS ---
function renderSmartTVSection() {
  const container = document.getElementById('smarttv-container');
  if (!container) return;

  const product = PRODUCTS.find(p => p.id === 'smarttv-sub-1');
  const html = `
    <div class="product-card">
      <span class="product-badge">App Only</span>
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <ul class="product-features">
          ${product.features.map(f => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> ${f}</li>`).join('')}
        </ul>
        <div class="card-options">
          <label class="option-label">Duration</label>
          <div class="duration-pills">
            <button type="button" class="duration-pill active" onclick="selectDuration('smarttv-1', 1, ${product.basePrice1Yr})">1 Year ($${product.basePrice1Yr})</button>
            <button type="button" class="duration-pill" onclick="selectDuration('smarttv-1', 2, ${product.basePrice2Yr})">2 Years ($${product.basePrice2Yr})</button>
          </div>
          <label class="option-label">Language / Content Selection</label>
          <select id="smarttv-1-country" class="custom-select" style="width: 100%;">
            <option value="Arabic">Arabic</option>
            <option value="English">English</option>
            <option value="Italian">Italian</option>
            <option value="Indian">Indian</option>
            <option value="Turkish">Turkish</option>
            <option value="Persian">Persian</option>
            <option value="German">German</option>
            <option value="African">African</option>
            <option value="French">French</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
      </div>
      <div>
        <div class="price-container">
          <span class="price-currency">$</span>
          <span class="price-amount" id="smarttv-1-price">${product.basePrice1Yr}</span>
          <span class="price-period" id="smarttv-1-period">/ 1 Year</span>
        </div>
        <button class="btn btn-gold" style="width:100%;" onclick="addSmartTVToCart('smarttv-sub-1')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          Buy Smart TV License
        </button>
      </div>
    </div>
  `;
  container.innerHTML = html;
}

window.addSmartTVToCart = function(productId) {
  const country = document.getElementById('smarttv-1-country').value;
  const state = selectionState['smarttv-1'];
  const prod = PRODUCTS.find(p => p.id === productId);

  addToCart({
    id: `${productId}-${state.duration}yr-${country}`,
    name: `${prod.name} (${state.duration} Year)`,
    option: `Language: ${country}`,
    price: state.price,
    image: prod.image,
    qty: 1
  });
};

// --- RENDER SECTION 3: SMART TV MOVIE APP ---
function renderMovieAppSection() {
  const container = document.getElementById('movieapp-container');
  if (!container) return;

  const product = PRODUCTS.find(p => p.id === 'movieapp-sub-1');
  const html = `
    <div class="product-card">
      <span class="product-badge">Cinema VOD</span>
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <ul class="product-features">
          ${product.features.map(f => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> ${f}</li>`).join('')}
        </ul>
        <div class="card-options">
          <label class="option-label">Subscription Duration</label>
          <div class="duration-pills">
            <button type="button" class="duration-pill active" onclick="selectDuration('movieapp-1', 1, ${product.basePrice1Yr})">1 Year ($${product.basePrice1Yr})</button>
            <button type="button" class="duration-pill" onclick="selectDuration('movieapp-1', 2, ${product.basePrice2Yr})">2 Years ($${product.basePrice2Yr})</button>
          </div>
        </div>
      </div>
      <div>
        <div class="price-container">
          <span class="price-currency">$</span>
          <span class="price-amount" id="movieapp-1-price">${product.basePrice1Yr}</span>
          <span class="price-period" id="movieapp-1-period">/ 1 Year Access</span>
        </div>
        <button class="btn btn-gold" style="width:100%;" onclick="addMovieAppToCart('movieapp-sub-1')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Buy Movie App Access
        </button>
      </div>
    </div>
  `;
  container.innerHTML = html;
}

window.addMovieAppToCart = function(productId) {
  const state = selectionState['movieapp-1'];
  const prod = PRODUCTS.find(p => p.id === productId);

  addToCart({
    id: `${productId}-${state.duration}yr`,
    name: `${prod.name} (${state.duration} Year)`,
    option: '4K Movie & Series Access',
    price: state.price,
    image: prod.image,
    qty: 1
  });
};

// --- RENDER SECTION 4: HARDWARE STORE ---
function renderHardwareSection(filterQuery = '') {
  const container = document.getElementById('hardware-container');
  if (!container) return;

  const hardwareItems = PRODUCTS.filter(p => p.category === 'hardware' && p.name.toLowerCase().includes(filterQuery.toLowerCase()));

  const html = hardwareItems.map(item => `
    <div class="product-card">
      <div class="product-image-wrap">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
      </div>
      <div>
        <h3 class="product-title">${item.name}</h3>
        <p class="product-description">${item.description}</p>
        <ul class="product-features">
          ${item.features.map(f => `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> ${f}</li>`).join('')}
        </ul>
      </div>
      <div>
        <div class="price-container">
          <span class="price-currency">$</span>
          <span class="price-amount">${item.price}</span>
        </div>
        <button class="btn btn-outline-gold" style="width:100%;" onclick="addToCart({ id: '${item.id}', name: '${item.name}', option: 'Hardware Store Item', price: ${item.price}, image: '${item.image}', qty: 1 })">
          Add To Cart
        </button>
      </div>
    </div>
  `).join('');

  container.innerHTML = html || `<p style="color:var(--text-muted); grid-column:1/-1;">No hardware accessories found matching search.</p>`;
}

window.filterHardware = function() {
  const q = document.getElementById('hw-search').value;
  renderHardwareSection(q);
};

// --- RENDER SECTION 5: DOWNLOADS CENTER ---
function renderDownloadsCenter() {
  const container = document.getElementById('downloads-container');
  if (!container) return;

  const html = DOWNLOADS.map(item => {
    const badgeClass = `badge-${item.type}`;
    return `
      <div class="download-card">
        <div class="download-icon-box" onclick="triggerDownload('${item.id}')" style="cursor:pointer;" title="Click image to download">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        </div>
        <div class="download-info">
          <h4 class="download-title">${item.name}</h4>
          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:6px;">${item.description}</p>
          <div class="download-meta">
            <span class="file-badge ${badgeClass}">${item.type}</span>
            <span>Size: ${item.size}</span>
            <span>Version: ${item.version}</span>
          </div>
        </div>
        <button class="btn btn-gold btn-sm" onclick="triggerDownload('${item.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Download
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

// AUTOMATIC DOWNLOAD ENGINE (Self-contained Blob generator)
window.triggerDownload = function(id) {
  const item = DOWNLOADS.find(d => d.id === id);
  if (!item) return;

  let mimeType = 'text/plain';
  let ext = item.type.toLowerCase();
  
  if (ext === 'apk') mimeType = 'application/vnd.android.package-archive';
  else if (ext === 'pdf') mimeType = 'application/pdf';
  else if (ext === 'zip') mimeType = 'application/zip';
  else if (ext === 'html') mimeType = 'text/html';

  const blob = new Blob([item.content || `JUST CLICK TV DOWNLOADABLE RESOURCE FILE - ${item.name}`], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${item.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`Downloading ${item.name} (${item.type.toUpperCase()})`);
};

// ADMIN DOWNLOAD FILE UPLOADER MODAL
window.openAdminUploadModal = function() {
  document.getElementById('admin-modal').classList.add('active');
};

window.closeAdminUploadModal = function() {
  document.getElementById('admin-modal').classList.remove('active');
};

window.handleAdminFileUpload = function(e) {
  e.preventDefault();
  const name = document.getElementById('admin-file-name').value;
  const type = document.getElementById('admin-file-type').value;
  const desc = document.getElementById('admin-file-desc').value;
  const fileInput = document.getElementById('admin-file-input');

  const file = fileInput.files[0];
  const size = file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : '1.5 MB';

  const newItem = {
    id: `dl-custom-${Date.now()}`,
    name: name,
    type: type,
    size: size,
    version: 'v1.0',
    description: desc,
    content: `JUST CLICK TV CUSTOM UPLOAD FILE: ${name}`
  };

  DOWNLOADS.unshift(newItem);
  renderDownloadsCenter();
  closeAdminUploadModal();
  showToast(`Uploaded new downloadable file: ${name}`);
  document.getElementById('admin-upload-form').reset();
};

// --- CART SYSTEM ---
function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }
  saveCart();
  updateCartUI();
  openCartDrawer();
  showToast(`Added ${item.name} to cart`);
}

function saveCart() {
  localStorage.setItem('justclick_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const countElem = document.getElementById('cart-count');
  const itemsContainer = document.getElementById('cart-items-container');
  const subtotalElem = document.getElementById('cart-subtotal');

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

  if (countElem) countElem.innerText = totalQty;
  if (subtotalElem) subtotalElem.innerText = `$${subtotal.toFixed(2)}`;

  if (itemsContainer) {
    if (cart.length === 0) {
      itemsContainer.innerHTML = `<p style="color:var(--text-muted); text-align:center; margin-top:40px;">Your shopping cart is empty.</p>`;
    } else {
      itemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-meta">${item.option}</div>
            <div class="cart-item-price">$${item.price} x ${item.qty}</div>
          </div>
          <div style="display:flex; flex-direction:column; gap:4px; align-items:flex-end;">
            <button onclick="changeQty('${item.id}', 1)" style="background:none; border:none; color:var(--gold-primary); cursor:pointer; font-weight:bold;">+</button>
            <button onclick="changeQty('${item.id}', -1)" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:0.8rem;">-</button>
            <button onclick="removeFromCart('${item.id}')" style="background:none; border:none; color:#ff5252; cursor:pointer; font-size:0.75rem; margin-top:4px;">Remove</button>
          </div>
        </div>
      `).join('');
    }
  }
}

window.changeQty = function(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
  }
  saveCart();
  updateCartUI();
};

window.removeFromCart = function(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartUI();
};

window.openCartDrawer = function() {
  document.getElementById('cart-overlay').classList.add('active');
  document.getElementById('cart-drawer').classList.add('active');
};

window.closeCartDrawer = function() {
  document.getElementById('cart-overlay').classList.remove('active');
  document.getElementById('cart-drawer').classList.remove('active');
};

// CHECKOUT MODAL FLOW
window.openCheckoutModal = function() {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }
  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  const summaryElem = document.getElementById('checkout-order-summary');
  
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  
  summaryElem.innerHTML = `
    <div style="margin-bottom:16px;">
      ${cart.map(i => `<div style="display:flex; justify-between; font-size:0.9rem; margin-bottom:6px;"><span>${i.name} (${i.option}) x${i.qty}</span><span style="color:var(--gold-primary); font-weight:bold;">$${i.price * i.qty}</span></div>`).join('')}
    </div>
    <div style="border-top:1px solid var(--gold-border); padding-top:10px; font-weight:bold; font-size:1.1rem; display:flex; justify-content:space-between;">
      <span>Total Amount:</span>
      <span style="color:var(--gold-primary);">$${subtotal.toFixed(2)}</span>
    </div>
  `;

  modal.classList.add('active');
};

window.closeCheckoutModal = function() {
  document.getElementById('checkout-modal').classList.remove('active');
};

window.processCheckout = function(e) {
  e.preventDefault();
  const name = document.getElementById('co-name').value;
  const orderId = `JCT-${Math.floor(100000 + Math.random() * 900000)}`;

  closeCheckoutModal();
  cart = [];
  saveCart();
  updateCartUI();

  // Show Success Confirmation Modal
  const successModal = document.getElementById('success-modal');
  document.getElementById('success-order-id').innerText = orderId;
  document.getElementById('success-customer-name').innerText = name;
  successModal.classList.add('active');
};

window.closeSuccessModal = function() {
  document.getElementById('success-modal').classList.remove('active');
};

// --- SECTION 7: FAQ ACCORDION ---
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// --- SECTION 6: CONTACT FORM & WHATSAPP ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thank you! Your message has been sent successfully.');
    form.reset();
  });
}

function initWhatsAppButton() {
  const btn = document.getElementById('whatsapp-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const msg = encodeURIComponent('Hello JUST CLICK TV Support, I am interested in subscribing to your IPTV services.');
    window.open(`https://wa.me/18005550199?text=${msg}`, '_blank');
  });
}

// --- TOAST NOTIFICATIONS ---
function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${msg}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
