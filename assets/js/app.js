/**
 * Gervais Partners - Interactive Experience Engine
 * Features:
 * 1. Living Multi-Spectrum Spores Canvas (Emerald, Saphir Blue, Golden-Amber)
 * 2. Fil Conducteur (Living Botanical Vine Scroll Tracker)
 * 3. Interactive Astaxanthin & Phycocyanin Microscope Lens
 * 4. Playable B2B Formulation Studio (Astaxanthine, Phycocyanine, ARANTAL Clear, NASALER, RIFENCIN, COGNITYL)
 * 5. Synthesized Botanical Forest Soundscape (Web Audio API)
 * 6. Dynamic TDS Modal, B2B Form, and Instant Language Engine
 */

let currentLang = localStorage.getItem('gervais_lang') || 'fr';
let currentCategory = 'all';
let activeTdsProduct = null;
let audioCtx = null;
let ambientSoundRunning = false;
let ambientGainNode = null;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initAnimatedCounters();
  renderProducts();
  initCategoryFilters();
  initContactForm();
  initMobileMenu();
  initFaqAccordion();
  applyTranslations();
});

/**
 * 1. Living Multi-Spectrum Spores Canvas (Emerald, Sapphire Blue & Gold)
 */
function initLivingSporesCanvas() {
  const canvas = document.getElementById('sporesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const palette = ['#84cc16', '#10b981', '#38bdf8', '#fbbf24']; // Lime, Emerald, Phycocyanin Sapphire Blue, Amber Astaxanthin

  class Spore {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.8 + 1.2;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45 - 0.25; // upward organic drift
      this.alpha = Math.random() * 0.45 + 0.2;
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 3.2;
        this.y -= Math.sin(angle) * force * 3.2;
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 50; i++) {
    particles.push(new Spore());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * 2. Fil Conducteur (The Living Botanical Vine Scroll Tracker)
 */
function initBotanicalVineTracker() {
  const vinePath = document.getElementById('vineSvgProgress');
  const nodes = document.querySelectorAll('.vine-node');
  const sections = [
    { id: 'home', index: 0 },
    { id: 'astaxanthin-showcase', index: 1 },
    { id: 'phycocyanin-showcase', index: 2 },
    { id: 'bioxtract-showcase', index: 3 },
    { id: 'microscope-section', index: 4 },
    { id: 'studio-formulation', index: 5 },
    { id: 'products', index: 6 },
    { id: 'galenic', index: 7 },
    { id: 'leadership', index: 8 },
    { id: 'location', index: 9 },
    { id: 'contact', index: 10 }
  ];

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, scrollY / (docHeight || 1)));

    if (vinePath) {
      vinePath.style.height = `${progress * 100}%`;
    }

    let activeIdx = 0;
    sections.forEach((sec, idx) => {
      const el = document.getElementById(sec.id);
      if (el) {
        const top = el.offsetTop - 320;
        if (scrollY >= top) {
          activeIdx = idx;
        }
      }
    });

    nodes.forEach((node, idx) => {
      const dot = node.querySelector('.vine-dot');
      const label = node.querySelector('.vine-label');
      if (idx <= activeIdx) {
        node.classList.add('active');
        if (dot) {
          dot.classList.add('bg-lime-400', 'shadow-[0_0_12px_#84cc16]');
          dot.classList.remove('bg-slate-700');
        }
        if (label) label.classList.add('text-lime-300', 'font-bold');
      } else {
        node.classList.remove('active');
        if (dot) {
          dot.classList.remove('bg-lime-400', 'shadow-[0_0_12px_#84cc16]');
          dot.classList.add('bg-slate-700');
        }
        if (label) label.classList.remove('text-lime-300', 'font-bold');
      }
    });
  });
}

/**
 * 3. Interactive Astaxanthin & Phycocyanin Microscope Lens
 */
function initInteractiveMicroscope() {
  const container = document.getElementById('microscopeViewer');
  const slider = document.getElementById('microscopeSlider');
  const cellImg = document.getElementById('microscopeCellImg');
  const modeBtns = document.querySelectorAll('.microscope-mode-btn');

  if (!container || !slider || !cellImg) return;

  function setMicroscopeSplit(percent) {
    cellImg.style.clipPath = `polygon(${percent}% 0, 100% 0, 100% 100%, ${percent}% 100%)`;
    slider.style.left = `${percent}%`;
  }

  let isDragging = false;
  function updateFromMouse(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    let pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setMicroscopeSplit(pct);
  }

  container.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  container.addEventListener('mousemove', (e) => {
    if (isDragging) updateFromMouse(e.clientX);
  });

  container.addEventListener('touchmove', (e) => {
    if (e.touches[0]) updateFromMouse(e.touches[0].clientX);
  });

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => {
        b.classList.remove('bg-emerald-700', 'text-white');
        b.classList.add('bg-white/10', 'text-slate-300');
      });
      btn.classList.add('bg-emerald-700', 'text-white');
      btn.classList.remove('bg-white/10', 'text-slate-300');

      const mode = btn.dataset.mode;
      if (mode === 'raw') setMicroscopeSplit(92);
      if (mode === 'cell') setMicroscopeSplit(50);
      if (mode === 'hplc') setMicroscopeSplit(8);
    });
  });

  setMicroscopeSplit(50);
}

/**
 * 4. Playable B2B Formulation Studio (Interactive Sandbox with Client Products)
 */
function initFormulationStudio() {
  const targetSelect = document.getElementById('sandboxTarget');
  const dosageSlider = document.getElementById('sandboxDosage');
  const dosageVal = document.getElementById('sandboxDosageVal');
  const formatSelect = document.getElementById('sandboxFormat');
  
  const oracGauge = document.getElementById('gaugeOracVal');
  const oracBar = document.getElementById('gaugeOracBar');
  const bioGauge = document.getElementById('gaugeBioVal');
  const bioBar = document.getElementById('gaugeBioBar');
  const ecoGauge = document.getElementById('gaugeEcoVal');
  
  const recActive = document.getElementById('sandboxRecActive');
  const recDesc = document.getElementById('sandboxRecDesc');

  if (!dosageSlider || !targetSelect) return;

  const formulations = {
    astaxanthin: {
      activeFr: "Astaxanthine Axabio 10% + Complexe Oméga-3 Algal (Axafocus)",
      activeEn: "Axabio Astaxanthin 10% + Algal Omega-3 Complex (Axafocus)",
      descFr: "Pouvoir antioxydant 6 000x supérieur à la vitamine C. Recommandé en Axagels softgels véganes ou Axagums sans sucre.",
      descEn: "Antioxidant potency 6,000x higher than Vitamin C. Recommended in Axagels vegan softgels or Axagums sugar-free gummies.",
      baseOrac: 145000,
      baseBio: 94.5
    },
    phycocyanin: {
      activeFr: "Phycocyanine X-ION (>51% Phycobiliprotéines pures d'Espagne)",
      activeEn: "Phycocyanin X-ION (>51% Pure Phycobiliproteins from Spain)",
      descFr: "Solubilité aqueuse 100% sans résidu, signature spectrale 620/650nm. Conditionnement en sacs 10/20kg ou cuve IBC 1000L.",
      descEn: "100% instant cold-water solubility without sediment. Packaged in 10/20kg bags or 1000L IBC tanks.",
      baseOrac: 88000,
      baseBio: 98.2
    },
    joints: {
      activeFr: "ARANTAL Clear® (Curcumine Bio-Optimisée Cliniquement Validée)",
      activeEn: "ARANTAL Clear® (Clinically Proven Bio-Optimized Curcumin)",
      descFr: "Alternative naturelle prouvée aux AINS. Protection directe du cartilage de l'arthrose en softgels finies ou prémix.",
      descEn: "Proven natural alternative to NSAIDs. Direct protection of arthritic cartilage in softgels or bulk premix.",
      baseOrac: 75000,
      baseBio: 92.4
    },
    allergy: {
      activeFr: "NASALER® (Curcumine Biodisponible + Quercétine Purifiée)",
      activeEn: "NASALER® (Bioavailable Curcumin + Purified Quercetin)",
      descFr: "Action immunomodulatrice à long terme contre les allergies saisonnières et perannuelles.",
      descEn: "Long-term immunomodulatory action against seasonal and perennial allergic symptoms.",
      baseOrac: 82000,
      baseBio: 91.0
    },
    gut: {
      activeFr: "RIFENCIN® (Curcumine Biodisponible + Huile Essentielle de Fenouil)",
      activeEn: "RIFENCIN® (Bioavailable Curcumin + Pure Fennel Essential Oil)",
      descFr: "Efficacité clinique démontrée sur le Syndrome de l'Intestin Irritable (SII) et réduction des douleurs abdominales.",
      descEn: "Demonstrated clinical efficacy on Irritable Bowel Syndrome (IBS) and reduction of abdominal cramps.",
      baseOrac: 64000,
      baseBio: 93.8
    },
    brain: {
      activeFr: "COGNITYL® (Théobromine de Cacao & Caféine de Thé Vert)",
      activeEn: "COGNITYL® (Cacao Theobromine & Green Tea Natural Caffeine)",
      descFr: "Synergie de xanthines végétales cliniquement dosées pour la concentration, la mémoire et l'énergie mentale sans nervosité.",
      descEn: "Synergy of clinical plant xanthines for alert focus, cognitive memory, and stamina without jitters.",
      baseOrac: 52000,
      baseBio: 96.5
    },
    metabolism: {
      activeFr: "Berbérine Liposomale 97% & Complexe NAD+ / CoQ10",
      activeEn: "Liposomal Berberine 97% & NAD+ / CoQ10 Complex",
      descFr: "Activateur puissant de l'AMPK et régulateur de la glycémie, absorption cellulaire décuplée par matrice lipidique.",
      descEn: "Potent AMPK activator and blood sugar regulator with maximized phospholipid cellular delivery.",
      baseOrac: 69000,
      baseBio: 95.0
    }
  };

  function updateFormulation() {
    const dosage = parseInt(dosageSlider.value, 10);
    const target = targetSelect.value || 'astaxanthin';
    const format = formatSelect ? formatSelect.value : 'softgels';

    if (dosageVal) dosageVal.textContent = `${dosage} mg / dose`;

    const info = formulations[target] || formulations.astaxanthin;
    
    // Real-time calculation
    const computedOrac = Math.round(info.baseOrac * (dosage / 200));
    const computedBio = Math.min(99.6, info.baseBio + (dosage > 300 ? 1.8 : 0)).toFixed(1);

    if (oracGauge) oracGauge.textContent = `${computedOrac.toLocaleString()} μmol TE`;
    if (oracBar) oracBar.style.width = `${Math.min(100, (computedOrac / 250000) * 100)}%`;

    if (bioGauge) bioGauge.textContent = `${computedBio}%`;
    if (bioBar) bioBar.style.width = `${computedBio}%`;

    if (ecoGauge) ecoGauge.textContent = `A+ (100% Éco-Extraction)`;

    if (recActive) recActive.textContent = currentLang === 'fr' ? info.activeFr : info.activeEn;
    if (recDesc) recDesc.textContent = currentLang === 'fr' ? info.descFr : info.descEn;
  }

  targetSelect.addEventListener('change', updateFormulation);
  dosageSlider.addEventListener('input', updateFormulation);
  if (formatSelect) formatSelect.addEventListener('change', updateFormulation);
  updateFormulation();

  // "Transfer to Quote" Button Action
  const transferBtn = document.getElementById('sandboxTransferBtn');
  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      const target = targetSelect.value;
      const dosage = dosageSlider.value;
      const formatText = formatSelect ? formatSelect.options[formatSelect.selectedIndex].text : "Softgels";
      const targetText = targetSelect.options[targetSelect.selectedIndex].text;
      
      const prodSelect = document.getElementById('contactProduct');
      const messageField = document.getElementById('contactMessage');
      const contactSection = document.getElementById('contact');

      if (prodSelect) {
        if (target === 'astaxanthin') prodSelect.value = 'astaxanthin-axabio';
        else if (target === 'phycocyanin') prodSelect.value = 'phycocyanine-xion';
        else if (target === 'joints') prodSelect.value = 'arantal-clear';
        else if (target === 'allergy') prodSelect.value = 'nasaler-allergy';
        else if (target === 'gut') prodSelect.value = 'rifencin-gut';
        else if (target === 'brain') prodSelect.value = 'cognityl-mental';
        else if (target === 'metabolism') prodSelect.value = 'berberine-liposomal';
      }

      if (messageField) {
        messageField.value = currentLang === 'fr' 
          ? `[Formulation personnalisée depuis le Studio B2B]\n• Cible : ${targetText}\n• Dosage actif : ${dosage} mg/dose\n• Format galénique souhaité : ${formatText}\n• Demande de devis tarifaire échelonné et échantillon d'essai R&D associé.`
          : `[Custom Formulation from B2B Studio]\n• Target Health Vector: ${targetText}\n• Target Active Dosage: ${dosage} mg/dose\n• Desired Galenic Format: ${formatText}\n• Request for tiered B2B pricing and trial R&D sample package.`;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/**
 * 5. Synthesized Botanical Forest Soundscape (Web Audio API)
 */
function initAmbientSound() {
  const btn = document.getElementById('ambientSoundToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn("Web Audio not supported", e);
        return;
      }
    }

    if (ambientSoundRunning) {
      if (ambientGainNode) {
        ambientGainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      }
      ambientSoundRunning = false;
      btn.classList.remove('bg-emerald-600', 'text-white');
      btn.classList.add('bg-white/10', 'text-slate-300');
      btn.querySelector('.sound-label').textContent = translations[currentLang].nav.soundOff;
    } else {
      audioCtx.resume().then(() => {
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2) * 0.038;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 400;
        filter.Q.value = 1.3;

        ambientGainNode = audioCtx.createGain();
        ambientGainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
        ambientGainNode.gain.linearRampToValueAtTime(0.16, audioCtx.currentTime + 1.5);

        whiteNoise.connect(filter);
        filter.connect(ambientGainNode);
        ambientGainNode.connect(audioCtx.destination);
        whiteNoise.start();

        ambientSoundRunning = true;
        btn.classList.add('bg-emerald-600', 'text-white');
        btn.classList.remove('bg-white/10', 'text-slate-300');
        btn.querySelector('.sound-label').textContent = translations[currentLang].nav.soundOn;
      });
    }
  });
}

/**
 * Switch language and re-render dynamic content
 */
function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('gervais_lang', lang);
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('bg-forest-950', 'text-white');
      btn.classList.remove('text-slate-500', 'hover:bg-slate-200');
    } else {
      btn.classList.remove('bg-forest-950', 'text-white');
      btn.classList.add('text-slate-500', 'hover:bg-slate-200');
    }
  });

  applyTranslations();
  renderProducts();
  populateProductSelect();
  
  if (activeTdsProduct) {
    openTdsModal(activeTdsProduct.id);
  }
}

function initLanguageSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });
}

/**
 * Apply translations to all elements with data-i18n attributes
 */
function applyTranslations() {
  const t = translations[currentLang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keyPath = el.getAttribute('data-i18n').split('.');
    let val = t;
    for (const key of keyPath) {
      if (val && val[key] !== undefined) {
        val = val[key];
      } else {
        val = null;
        break;
      }
    }
    if (val !== null) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.innerHTML = val;
      }
    }
  });

  document.documentElement.lang = currentLang;
}

/**
 * Render curated product cards
 */
function renderProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  const t = translations[currentLang];
  const list = t.products.filter(p => {
    if (currentCategory === 'all') return true;
    return p.category === currentCategory;
  });

  container.innerHTML = '';

  list.forEach(prod => {
    const card = document.createElement('article');
    card.className = 'product-card bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group';
    card.setAttribute('itemscope', '');
    card.setAttribute('itemtype', 'https://schema.org/Product');
    card.innerHTML = `
      <div>
        <div class="relative h-60 bg-slate-50 overflow-hidden cursor-pointer" onclick="openTdsModal('${prod.id}')">
          <img src="${prod.image}" alt="${prod.name} - Ingrédient Botanique Gervais Partners" itemprop="image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">
          <span class="absolute top-3 right-3 bg-forest-950/90 text-limegold-300 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-limegold-500/30">
            ${prod.tag}
          </span>
          <span class="absolute bottom-3 left-3 bg-white/95 text-slate-900 text-xs font-semibold px-3 py-1 rounded-lg shadow-sm backdrop-blur-md" itemprop="alternateName">
            ${prod.botanical}
          </span>
        </div>
        <div class="p-6">
          <h3 class="display text-2xl font-bold text-slate-900 mb-2 group-hover:text-forest-800 transition-colors cursor-pointer" itemprop="name" onclick="openTdsModal('${prod.id}')">
            ${prod.name}
          </h3>
          <p class="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed" itemprop="description">
            ${prod.shortDesc}
          </p>
          <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-4">
            <p class="text-[11px] font-bold text-forest-900 uppercase tracking-wider mb-0.5">Spécifications Analytiques :</p>
            <p class="text-xs text-forest-800 font-semibold">${prod.keySpecs}</p>
          </div>
          <div class="flex flex-wrap gap-1.5 mb-4">
            ${prod.applications.map(app => `<span class="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-0.5 rounded-full font-medium">${app}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="px-6 pb-6 pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
        <button onclick="openTdsModal('${prod.id}')" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-3 px-3 rounded-xl transition flex items-center justify-center gap-1.5" aria-label="Voir la fiche technique TDS ${prod.name}">
          <svg class="w-4 h-4 text-forest-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          ${t.productsSection.viewTdsBtn}
        </button>
        <button onclick="requestProductSample('${prod.id}')" class="w-full bg-forest-950 hover:bg-forest-800 text-white text-xs font-bold py-3 px-3 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5" aria-label="Demander un échantillon de ${prod.name}">
          <svg class="w-4 h-4 text-limegold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          ${t.productsSection.requestSampleBtn}
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

function initFaqAccordion() {
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !isExpanded);
      if (!isExpanded) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      } else {
        content.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    });
  });
}

function initCategoryFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active', 'bg-forest-950', 'text-white');
        b.classList.add('text-slate-600');
      });
      btn.classList.add('active', 'bg-forest-950', 'text-white');
      btn.classList.remove('text-slate-600');

      currentCategory = btn.dataset.category;
      renderProducts();
    });
  });
}


/**
 * Open Technical Data Sheet (TDS) Modal
 */
function openTdsModal(productId) {
  const t = translations[currentLang];
  const prod = t.products.find(p => p.id === productId);
  if (!prod) return;

  activeTdsProduct = prod;
  const modal = document.getElementById('tdsModal');
  const modalContent = document.getElementById('tdsModalContent');
  if (!modal || !modalContent) return;

  const tds = prod.tds;
  const m = t.tdsModal;

  modalContent.innerHTML = `
    <!-- Branded Print Header -->
    <div class="hidden print-header">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-emerald-900">GERVAIS PARTNERS</h1>
          <p class="text-xs text-slate-600">Nutraceutical Raw Materials • 1380 Lasne, Belgium • Tél : +32 472 75 22 96</p>
        </div>
        <div class="text-right">
          <span class="text-xs font-mono font-bold bg-slate-100 px-2 py-1 rounded">${tds.productCode}</span>
          <p class="text-xs text-slate-500">Document certifié conforme Ph. Eur. & CE</p>
        </div>
      </div>
    </div>

    <!-- Screen Modal Header -->
    <div class="flex items-start justify-between border-b border-slate-200 pb-4 no-print">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full font-mono">${tds.productCode}</span>
          <span class="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full">CAS: ${tds.cas}</span>
          <span class="bg-lime-100 text-lime-800 text-xs font-medium px-2 py-0.5 rounded-full">100% Non-GMO</span>
        </div>
        <h2 class="text-2xl font-extrabold text-slate-900">${prod.name}</h2>
        <p class="text-sm font-serif italic text-emerald-800">${tds.botanicalName}</p>
      </div>
      <button onclick="closeTdsModal()" class="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <!-- Product Image & Quick Highlight -->
    <div class="my-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center gap-4">
      <img src="${prod.image}" alt="${prod.name}" class="w-24 h-24 rounded-xl object-contain bg-white p-1 border border-slate-200 shadow-sm shrink-0">
      <div>
        <h4 class="text-sm font-bold text-slate-900 mb-1">Standardisation & Titrage Actif :</h4>
        <p class="text-sm text-emerald-800 font-bold mb-1">${tds.assay}</p>
        <p class="text-xs text-slate-600">${prod.shortDesc}</p>
      </div>
    </div>

    <!-- Technical Specification Table -->
    <div class="space-y-6 text-sm">
      <div>
        <h3 class="text-base font-bold text-slate-900 border-l-4 border-emerald-700 pl-3 mb-3">${m.tabSpecs}</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-200 tds-table text-xs">
            <tbody>
              <tr class="bg-slate-50/50"><td class="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200 w-1/3">${m.lblBotanical}</td><td class="py-2.5 px-3 font-semibold text-slate-900 border border-slate-200">${tds.botanicalName}</td></tr>
              <tr><td class="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200">${m.lblPartUsed}</td><td class="py-2.5 px-3 text-slate-800 border border-slate-200">${tds.partUsed}</td></tr>
              <tr class="bg-slate-50/50"><td class="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200">${m.lblSolvent}</td><td class="py-2.5 px-3 text-slate-800 border border-slate-200">${tds.solvent}</td></tr>
              <tr><td class="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200">${m.lblAppearance}</td><td class="py-2.5 px-3 text-slate-800 border border-slate-200">${tds.appearance}</td></tr>
              <tr class="bg-slate-50/50"><td class="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200">${m.lblAssay}</td><td class="py-2.5 px-3 font-bold text-emerald-800 border border-slate-200">${tds.assay}</td></tr>
              <tr><td class="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200">${m.lblParticle}</td><td class="py-2.5 px-3 text-slate-800 border border-slate-200">${tds.particleSize}</td></tr>
              <tr class="bg-slate-50/50"><td class="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200">${m.lblBulk}</td><td class="py-2.5 px-3 text-slate-800 border border-slate-200">${tds.bulkDensity}</td></tr>
              <tr><td class="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200">${m.lblLoss}</td><td class="py-2.5 px-3 text-slate-800 border border-slate-200">${tds.lossOnDrying}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 class="text-base font-bold text-slate-900 border-l-4 border-emerald-700 pl-3 mb-3">${m.tabCompliance}</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-200 tds-table text-xs">
            <tbody>
              <tr class="bg-slate-50/50"><td class="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200 w-1/3">${m.lblHeavyMetals}</td><td class="py-2.5 px-3 text-slate-800 border border-slate-200">${tds.heavyMetals}</td></tr>
              <tr><td class="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200">${m.lblPesticides}</td><td class="py-2.5 px-3 text-slate-800 border border-slate-200">${tds.pesticides}</td></tr>
              <tr class="bg-slate-50/50"><td class="py-2.5 px-3 font-semibold text-slate-700 border border-slate-200">${m.lblAllergens}</td><td class="py-2.5 px-3 text-slate-800 border border-slate-200">${tds.allergens}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 class="text-base font-bold text-slate-900 border-l-4 border-emerald-700 pl-3 mb-3">${m.tabMicrobio}</h3>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
          ${tds.microbio}
        </div>
      </div>

      <div>
        <h3 class="text-base font-bold text-slate-900 border-l-4 border-emerald-700 pl-3 mb-3">${m.tabPackaging}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span class="font-bold text-slate-900 block mb-1">${m.lblStorage}</span>
            <span class="text-slate-700">${tds.storage}</span>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span class="font-bold text-slate-900 block mb-1">${m.lblPackaging}</span>
            <span class="text-slate-700">${tds.packaging}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Print Footer -->
    <div class="hidden print-footer">
      <div class="flex justify-between items-center">
        <span>Gervais Partners • 1380 Lasne, Belgique • Tél : +32 472 75 22 96</span>
        <span>Émis le ${new Date().toLocaleDateString()}</span>
      </div>
    </div>

    <!-- Modal Actions -->
    <div class="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 no-print">
      <button onclick="window.print()" class="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2">
        <svg class="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
        ${m.btnPrint}
      </button>
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button onclick="closeTdsModal()" class="w-full sm:w-auto px-4 py-2.5 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition">
          ${m.btnClose}
        </button>
        <button onclick="requestProductSample('${prod.id}')" class="w-full sm:w-auto px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2">
          <svg class="w-4 h-4 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          ${m.btnOrderSample}
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeTdsModal() {
  const modal = document.getElementById('tdsModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  activeTdsProduct = null;
}

/**
 * Click "Request Sample" on a specific product
 */
function requestProductSample(productId) {
  const select = document.getElementById('contactProduct');
  const sampleCheckbox = document.getElementById('checkSample');
  const contactSection = document.getElementById('contact');

  if (contactSection && select) {
    select.value = productId;
    if (sampleCheckbox) sampleCheckbox.checked = true;
    contactSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Navigate smoothly to contact page with product prefilled
    window.location.href = 'contact.html?product=' + encodeURIComponent(productId) + '#contact';
  }
}

function populateProductSelect() {
  const select = document.getElementById('contactProduct');
  if (!select) return;

  const t = translations[currentLang];
  const currentValue = select.value;

  select.innerHTML = `<option value="">${t.contact.selectProductDefault}</option>`;
  t.products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} (${p.tag})`;
    select.appendChild(opt);
  });

  const customOpt = document.createElement('option');
  customOpt.value = "custom-galenic";
  customOpt.textContent = currentLang === 'fr' ? "Projet Façonnage Clé en Main (Gummies / Softgels)" : "Turn-key Galenic Project (Gummies / Softgels)";
  select.appendChild(customOpt);

  if (currentValue) select.value = currentValue;
}

/**
 * B2B Contact Form submission & confirmation
 */
function initContactForm() {
  populateProductSelect();
  const form = document.getElementById('b2bContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const company = document.getElementById('contactCompany').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const product = document.getElementById('contactProduct').value;
    const volume = document.getElementById('contactVolume').value;
    const message = document.getElementById('contactMessage').value.trim();
    const wantsSample = document.getElementById('checkSample').checked;

    if (!company || !email || !phone) {
      alert(currentLang === 'fr' ? "Veuillez renseigner le nom de votre entreprise/laboratoire, email et téléphone." : "Please fill in your company/laboratory name, email, and phone.");
      return;
    }

    const refNumber = 'GP-' + Math.floor(100000 + Math.random() * 900000);

    // Asynchronous submission to Netlify Forms if available
    try {
      const formData = new FormData(form);
      formData.append('refNumber', refNumber);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      }).catch(err => {
        // Netlify form fallback handled silently
      });
    } catch (e) {
      // Offline / local preview fallback
    }

    showConfirmationModal({
      refNumber,
      company,
      email,
      name,
      product,
      wantsSample
    });

    form.reset();
  });
}

function showConfirmationModal(data) {
  const modal = document.getElementById('confirmationModal');
  if (!modal) return;

  document.getElementById('confirmRef').textContent = data.refNumber;
  document.getElementById('confirmCompany').textContent = data.company;
  document.getElementById('confirmEmail').textContent = data.email;
  document.getElementById('confirmTargetMail').textContent = 'Direction Commerciale & Support B2B';

  modal.classList.remove('hidden');
}

function closeConfirmationModal() {
  const modal = document.getElementById('confirmationModal');
  if (modal) modal.classList.add('hidden');
}

/**
 * European Logistics & Belgium Map Canvas Visualization
 */
function initMapVisualization() {
  const canvas = document.getElementById('europeMapCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrame;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 340;
    draw();
  }

  const hub = { x: 0.44, y: 0.46, label: "1380 Lasne, Belgium (HQ & Hub)" };
  const destinations = [
    { x: 0.38, y: 0.58, label: "Paris / France", time: "24-48h" },
    { x: 0.56, y: 0.42, label: "Frankfurt / Germany", time: "24-48h" },
    { x: 0.46, y: 0.36, label: "Amsterdam / Benelux", time: "24h" },
    { x: 0.52, y: 0.65, label: "Zurich / Switzerland", time: "48h" },
    { x: 0.28, y: 0.82, label: "Barcelona / Spain", time: "48-72h" },
    { x: 0.60, y: 0.78, label: "Milan / Italy", time: "48-72h" },
    { x: 0.32, y: 0.38, label: "London / UK", time: "48h" }
  ];

  let pulse = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const hx = hub.x * w;
    const hy = hub.y * h;

    destinations.forEach((dest) => {
      const dx = dest.x * w;
      const dy = dest.y * h;

      ctx.beginPath();
      ctx.moveTo(hx, hy);
      const cx = (hx + dx) / 2;
      const cy = (hy + dy) / 2 - 25;
      ctx.quadraticCurveTo(cx, cy, dx, dy);
      ctx.strokeStyle = 'rgba(132, 204, 22, 0.35)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(dx, dy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#94a3b8';
      ctx.fill();

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px Plus Jakarta Sans, sans-serif';
      ctx.fillText(dest.label, dx + 8, dy + 3);
      ctx.fillStyle = '#84cc16';
      ctx.font = '9px Plus Jakarta Sans, sans-serif';
      ctx.fillText(dest.time, dx + 8, dy + 14);
    });

    pulse = (pulse + 0.04) % (Math.PI * 2);
    const radius = 8 + Math.sin(pulse) * 4;

    ctx.beginPath();
    ctx.arc(hx, hy, radius + 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(hx, hy, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(132, 204, 22, 0.4)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(hx, hy, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#22c55e';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
    ctx.fillText("🇧🇪 1380 LASNE (BELGIQUE)", hx - 65, hy - 16);
    ctx.fillStyle = '#bef264';
    ctx.font = '10px Plus Jakarta Sans, sans-serif';
    ctx.fillText("HUB CENTRAL BUFFER & QA", hx - 65, hy - 4);

    animationFrame = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!menuBtn || !menu) return;

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// Lateral Drawer Menu Controller
function toggleSidebarMenu(open) {
  const drawer = document.getElementById('sidebarDrawer');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (!drawer || !backdrop) return;

  if (open) {
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  } else {
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('translate-x-0');
    document.body.style.overflow = '';
  }
}
window.toggleSidebarMenu = toggleSidebarMenu;

// Close drawer on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    toggleSidebarMenu(false);
  }
});


/**
 * Parallax Scroll Transition Engine
 */
function initParallaxEngine() {
  const heroBg = document.querySelector('.hero-bg-img');
  const siliciumBg = document.querySelector('#silicium-showcase');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (heroBg && scrollY < window.innerHeight) {
          heroBg.style.transform = `translate3d(0, ${scrollY * 0.08}px, 0)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Section entrance transitions
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-active');
      }
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('main > section').forEach(sec => sectionObs.observe(sec));
}

// Auto-fill contact form from URL params across all pages
document.addEventListener('DOMContentLoaded', () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const prodParam = urlParams.get('product');
    if (prodParam) {
      const select = document.getElementById('contactProduct');
      const sampleCheckbox = document.getElementById('checkSample');
      if (select) select.value = prodParam;
      if (sampleCheckbox) sampleCheckbox.checked = true;
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        setTimeout(() => {
          contactSec.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  } catch(e) {}

  initParallaxEngine();
});


/**
 * Animated Numbers Counter (Rolls up to the exact target)
 */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= windowHeight && rect.bottom >= 0;
  }

  function checkAndAnimate() {
    counters.forEach(el => {
      if (!el.classList.contains('counted') && isElementInViewport(el)) {
        el.classList.add('counted');
        animateCounter(el);
      }
    });
  }

  // Immediate check on load + timeouts when reveal animations complete
  checkAndAnimate();
  setTimeout(checkAndAnimate, 150);
  setTimeout(checkAndAnimate, 450);
  setTimeout(checkAndAnimate, 900);

  // Check on user scroll and resize
  window.addEventListener('scroll', checkAndAnimate, { passive: true });
  window.addEventListener('resize', checkAndAnimate, { passive: true });

  // IntersectionObserver as well
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    }, { rootMargin: '80px 0px 80px 0px', threshold: 0.01 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1700; // ms
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutExpo - rolls fast and settles gracefully on the target
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(ease * target);
      
      // Format with French thousands separator
      el.textContent = prefix + currentVal.toLocaleString('fr-FR') + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = prefix + target.toLocaleString('fr-FR') + suffix;
      }
    }

    requestAnimationFrame(updateCount);
  }
}

function initUniversalAnchorRouter() {
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) {
        e.preventDefault();
        if (targetId === 'contact') {
          window.location.href = 'contact.html#contact';
        } else if (targetId === 'home') {
          window.location.href = 'index.html#home';
        } else {
          window.location.href = 'index.html#' + targetId;
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAnimatedCounters();
  initUniversalAnchorRouter();
});


/**
 * ══════════════════════════════════════════════════════════════
 * CINEMATIC BOTANICAL LEAF-WIND ENGINE (FLUIDE 60 FPS & ULTRA-ROBUSTE)
 * « Des feuilles soufflées impressionnantes qui changent le décor en continu »
 * ══════════════════════════════════════════════════════════════
 */
(function initBotanicalLeafWindEngine() {
  // Pre-rendered offscreen canvas sprites for ultra-high FPS (Zero GC pressure)
  const sprites = {};

  function initSprites() {
    if (sprites.bamboo) return;

    // 1. Bamboo Blade Sprite (Dual chlorophyll gradient, dark rib, micro-veins, stem)
    {
      const cvs = document.createElement('canvas');
      cvs.width = 120;
      cvs.height = 360;
      const ctx = cvs.getContext('2d');
      const cx = 60, cy = 180;
      ctx.save();
      ctx.translate(cx, cy);

      const gradLeft = ctx.createLinearGradient(-30, 0, 0, 0);
      gradLeft.addColorStop(0, '#14532d');
      gradLeft.addColorStop(1, '#22c55e');

      ctx.beginPath();
      ctx.moveTo(0, -160);
      ctx.bezierCurveTo(-45, -60, -35, 80, 0, 150);
      ctx.lineTo(0, -160);
      ctx.fillStyle = gradLeft;
      ctx.fill();

      const gradRight = ctx.createLinearGradient(0, 0, 30, 0);
      gradRight.addColorStop(0, '#4ade80');
      gradRight.addColorStop(1, '#15803d');

      ctx.beginPath();
      ctx.moveTo(0, -160);
      ctx.bezierCurveTo(45, -60, 35, 80, 0, 150);
      ctx.lineTo(0, -160);
      ctx.fillStyle = gradRight;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, -165);
      ctx.lineTo(0, 175);
      ctx.strokeStyle = '#052e16';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 150);
      ctx.lineTo(0, 175);
      ctx.strokeStyle = '#854d0e';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 1;
      for (let y = -120; y < 130; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(-22, y - 12);
        ctx.moveTo(0, y);
        ctx.lineTo(22, y - 12);
        ctx.stroke();
      }

      ctx.restore();
      sprites.bamboo = cvs;
    }

    // 2. Broad Medicinal Herbal Leaf Sprite (Ovate contour, rich venation, serrated rim)
    {
      const cvs = document.createElement('canvas');
      cvs.width = 240;
      cvs.height = 280;
      const ctx = cvs.getContext('2d');
      const cx = 120, cy = 140;

      ctx.save();
      ctx.translate(cx, cy);

      const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 120);
      grad.addColorStop(0, '#22c55e');
      grad.addColorStop(0.6, '#15803d');
      grad.addColorStop(1, '#052e16');

      ctx.beginPath();
      ctx.moveTo(0, -115);
      ctx.bezierCurveTo(85, -60, 95, 55, 0, 115);
      ctx.bezierCurveTo(-95, 55, -85, -60, 0, -115);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(134, 239, 172, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -115);
      ctx.lineTo(0, 135);
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(187, 247, 208, 0.45)';
      ctx.lineWidth = 1.5;
      for (let y = -80; y < 80; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.quadraticCurveTo(35, y - 5, 55, y - 25);
        ctx.moveTo(0, y);
        ctx.quadraticCurveTo(-35, y - 5, -55, y - 25);
        ctx.stroke();
      }

      ctx.restore();
      sprites.herbal = cvs;
    }

    // 3. Golden Ginkgo Biloba / Curcuma Gold Leaf Sprite
    {
      const cvs = document.createElement('canvas');
      cvs.width = 220;
      cvs.height = 220;
      const ctx = cvs.getContext('2d');
      const cx = 110, cy = 110;

      ctx.save();
      ctx.translate(cx, cy);

      const grad = ctx.createLinearGradient(0, -90, 0, 90);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.5, '#f59e0b');
      grad.addColorStop(1, '#b45309');

      ctx.beginPath();
      ctx.moveTo(0, 80);
      ctx.lineTo(-10, 30);
      ctx.bezierCurveTo(-75, -20, -75, -70, -20, -85);
      ctx.quadraticCurveTo(0, -70, 20, -85);
      ctx.bezierCurveTo(75, -70, 75, -20, 10, 30);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(254, 240, 138, 0.55)';
      ctx.lineWidth = 1.2;
      for (let a = -1.1; a <= 1.1; a += 0.18) {
        ctx.beginPath();
        ctx.moveTo(0, 35);
        ctx.lineTo(Math.sin(a) * 75, -Math.cos(a) * 75);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.lineTo(0, 95);
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
      sprites.ginkgo = cvs;
    }

    // 4. Luminous Active Spores & Pollen Sprite
    {
      const cvs = document.createElement('canvas');
      cvs.width = 80;
      cvs.height = 80;
      const ctx = cvs.getContext('2d');
      const cx = 40, cy = 40;

      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 38);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.2, '#fef08a');
      grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.7)');
      grad.addColorStop(0.8, 'rgba(217, 119, 6, 0.2)');
      grad.addColorStop(1, 'rgba(217, 119, 6, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 38, 0, Math.PI * 2);
      ctx.fill();

      sprites.spore = cvs;
    }
  }

  // Particle Class with 3D Depth
  class TransitionParticle {
    constructor(w, h, layer, isArrival) {
      this.w = w;
      this.h = h;
      this.layer = layer;

      if (layer === 'fore') {
        this.spriteType = Math.random() > 0.5 ? 'bamboo' : 'herbal';
        this.scale = 0.50 + Math.random() * 0.45;
        this.baseSpeed = 22 + Math.random() * 12;
        this.alpha = 0.95;
      } else if (layer === 'mid') {
        const r = Math.random();
        this.spriteType = r < 0.45 ? 'bamboo' : (r < 0.8 ? 'herbal' : 'ginkgo');
        this.scale = 0.17 + Math.random() * 0.19;
        this.baseSpeed = 13 + Math.random() * 9;
        this.alpha = 0.95;
      } else {
        this.spriteType = 'spore';
        this.scale = 0.10 + Math.random() * 0.20;
        this.baseSpeed = 9 + Math.random() * 10;
        this.alpha = 0.4 + Math.random() * 0.5;
      }

      if (!isArrival) {
        // Departure: enter from bottom-left
        this.x = -150 - Math.random() * (w * 0.85);
        this.y = h * (0.2 + Math.random() * 0.95);
      } else {
        // Arrival: start mid-screen rushing towards top-right
        this.x = (w * 0.15) + Math.random() * (w * 0.85);
        this.y = h * (0.05 + Math.random() * 0.85);
      }

      this.vx = this.baseSpeed;
      this.vy = -(this.baseSpeed * (0.26 + Math.random() * 0.36));

      this.rotZ = Math.random() * Math.PI * 2;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotSpeedZ = (Math.random() - 0.5) * 0.15;
      this.rotSpeedX = (Math.random() - 0.5) * 0.12;
      this.rotSpeedY = (Math.random() - 0.5) * 0.18;

      this.flutterPhase = Math.random() * Math.PI * 2;
      this.flutterAmp = 6 + Math.random() * 10;
      this.flutterFreq = 0.04 + Math.random() * 0.04;
    }

    update(time) {
      this.x += this.vx;
      this.y += this.vy + Math.sin(time * this.flutterFreq + this.flutterPhase) * this.flutterAmp;
      this.rotZ += this.rotSpeedZ;
      this.rotX += this.rotSpeedX;
      this.rotY += this.rotSpeedY;
    }

    draw(ctx) {
      const sprite = sprites[this.spriteType];
      if (!sprite) return;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotZ);

      const sx = Math.cos(this.rotY) * this.scale;
      const sy = Math.cos(this.rotX) * this.scale;
      ctx.scale(sx, sy);

      ctx.globalAlpha = this.alpha;

      const sw = sprite.width;
      const sh = sprite.height;
      ctx.drawImage(sprite, -sw / 2, -sh / 2, sw, sh);

      ctx.restore();
    }
  }

  let activeCanvas = null;

  function getOverlayCanvas() {
    if (!activeCanvas) {
      activeCanvas = document.createElement('canvas');
      activeCanvas.id = 'botanicalLeafWindCanvas';
      activeCanvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:999999;pointer-events:none;';
      document.body.appendChild(activeCanvas);
    }
    activeCanvas.width = window.innerWidth;
    activeCanvas.height = window.innerHeight;
    return activeCanvas;
  }

  // 1. DEPARTURE ANIMATION: Sweeps leaves & veil, then navigates cleanly
  function startDeparture(targetHref) {
    initSprites();
    const canvas = getOverlayCanvas();
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const particles = [];
    for (let i = 0; i < 90; i++) particles.push(new TransitionParticle(w, h, 'back', false));
    for (let i = 0; i < 65; i++) particles.push(new TransitionParticle(w, h, 'mid', false));
    for (let i = 0; i < 6; i++) particles.push(new TransitionParticle(w, h, 'fore', false));

    const peakTime = 850;
    const startTime = performance.now();
    let navigated = false;

    function render(now) {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, w, h);

      // Organic wind wave front
      const coverProgress = Math.min(elapsed / peakTime, 1);
      const curX = (w + 400) * coverProgress;

      const grad = ctx.createLinearGradient(curX - 450, 0, curX + 100, 0);
      grad.addColorStop(0, 'rgba(5, 35, 19, 0.99)');
      grad.addColorStop(0.7, 'rgba(5, 35, 19, 0.96)');
      grad.addColorStop(0.9, 'rgba(16, 75, 41, 0.85)');
      grad.addColorStop(1, 'rgba(16, 75, 41, 0)');

      ctx.save();
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(curX + 60, 0);
      ctx.bezierCurveTo(curX + 130, h * 0.35, curX - 30, h * 0.7, curX + 100, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Golden wind streamlines
      ctx.save();
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.22)';
      ctx.lineWidth = 1.5;
      const t = elapsed * 0.003;
      const waveX = (w + 600) * (elapsed / (peakTime * 1.5)) - 300;
      for (let j = 0; j < 5; j++) {
        const sy = (h * (j + 1)) / 6 + Math.sin(t + j) * 25;
        ctx.beginPath();
        ctx.moveTo(waveX - 350, sy + 50);
        ctx.bezierCurveTo(waveX - 100, sy - 35, waveX + 100, sy + 25, waveX + 250, sy - 15);
        ctx.stroke();
      }
      ctx.restore();

      // Render leaves & spores
      particles.forEach(p => {
        p.update(elapsed * 0.05);
        p.draw(ctx);
      });

      if (elapsed >= peakTime && !navigated) {
        navigated = true;
        try {
          sessionStorage.setItem('gp_leaf_transition', '1');
        } catch(e) {}
        window.location.href = targetHref;
        return;
      }

      if (elapsed < peakTime + 300) {
        requestAnimationFrame(render);
      }
    }

    requestAnimationFrame(render);

    // Fallback in case RAF pauses
    setTimeout(() => {
      if (!navigated) {
        navigated = true;
        try { sessionStorage.setItem('gp_leaf_transition', '1'); } catch(e) {}
        window.location.href = targetHref;
      }
    }, 1100);
  }

  // 2. ARRIVAL ANIMATION: Disperses leaves & reveals the new scenery cleanly
  function checkArrival() {
    let wasActive = false;
    try {
      wasActive = sessionStorage.getItem('gp_leaf_transition') === '1';
      sessionStorage.removeItem('gp_leaf_transition');
    } catch(e) {}

    document.documentElement.style.backgroundColor = '';

    if (!wasActive) return;

    initSprites();
    const canvas = getOverlayCanvas();
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const particles = [];
    for (let i = 0; i < 90; i++) particles.push(new TransitionParticle(w, h, 'back', true));
    for (let i = 0; i < 65; i++) particles.push(new TransitionParticle(w, h, 'mid', true));
    for (let i = 0; i < 6; i++) particles.push(new TransitionParticle(w, h, 'fore', true));

    const duration = 900;
    const startTime = performance.now();

    function render(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const alpha = 1 - progress;

      ctx.clearRect(0, 0, w, h);

      if (alpha > 0) {
        const curX = (w + 500) * progress;
        const grad = ctx.createLinearGradient(curX - 100, 0, curX + 450, 0);
        grad.addColorStop(0, 'rgba(5, 35, 19, 0)');
        grad.addColorStop(0.25, `rgba(16, 75, 41, ${0.82 * alpha})`);
        grad.addColorStop(0.55, `rgba(5, 35, 19, ${0.96 * alpha})`);
        grad.addColorStop(1, `rgba(5, 35, 19, ${0.99 * alpha})`);

        ctx.save();
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(curX, 0);
        ctx.bezierCurveTo(curX + 90, h * 0.35, curX - 40, h * 0.7, curX + 50, h);
        ctx.lineTo(w, h);
        ctx.lineTo(w, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      particles.forEach(p => {
        p.update(elapsed * 0.05);
        p.draw(ctx);
      });

      if (progress < 1) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, w, h);
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        activeCanvas = null;
      }
    }

    requestAnimationFrame(render);
  }

  // Intercept all internal navigation clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (link.target && link.target !== '_self') return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
    if (href.startsWith('#')) return;

    e.preventDefault();
    startDeparture(href);
  });

  // Execute checkArrival as soon as script runs
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkArrival);
  } else {
    checkArrival();
  }

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      const c = document.getElementById('botanicalLeafWindCanvas');
      if (c && c.parentNode) c.parentNode.removeChild(c);
      activeCanvas = null;
    }
  });

  // Pre-initialize sprites in background
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSprites);
  } else {
    initSprites();
  }
})();
