/**
 * LUCKY EMOJI SPIN — PREMIUM WEB CLIENT (VANILLA ES6)
 * Built with modular event handlers, native hardware-accelerated animations,
 * high-performance Web Audio arpeggiators, static particle canvas, and strict state management.
 */

// ==========================================================================
// 1. MASTER SYNTH AUDIO ENGINE (Web Audio API)
// 100% offline-compatible, high-fidelity browser synthesizer
// ==========================================================================
class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  // Ensure AudioContext is initialized lazily after human gesture
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMute(muteState) {
    this.isMuted = muteState;
  }

  // Simple click / bubble sound
  playClick() {
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch (e) {
      console.warn("Audio Synthesizer Error:", e);
    }
  }

  // Short click / tick sound heard as other reel slides bypass
  playSpinTick() {
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.setValueAtTime(400, this.ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch (e) {}
  }

  // Crisp metallic slap when reel locks in place
  playReelLock() {
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const noiseGain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.08);

      noiseGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  // Dual-tone optimistic ring for Duo Twin match
  playWinTwin() {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      [523.25, 659.25].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + idx * 0.06 + 0.25);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.32);
      });
    } catch (e) {}
  }

  // Massive arpeggio sequence for Triple Super Jackpot
  playWinJackpot() {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major scale arpeggio
      
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        osc.frequency.setValueAtTime(freq * 1.02, now + idx * 0.08 + 0.3);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.4, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
      });
    } catch (e) {}
  }

  // Sparkling chime sweep for Daily claims
  playDailyClaim() {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      for (let i = 0; i < 6; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const frequency = 880 + i * 220;
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, now + i * 0.05);
        gain.gain.setValueAtTime(0.2, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.15);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.18);
      }
    } catch (e) {}
  }

  // Low dull buzzer
  playError() {
    if (this.isMuted) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.setValueAtTime(90, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }
}

const audio = new SoundSynthesizer();

// ==========================================================================
// 2. PARTICLE & CONFETTI PHYSICAL SYSTEMS
// High-efficiency HTML5 canvas rendering loops
// ==========================================================================
class ParticlesEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animationFrameId = null;
    
    if (this.canvas) {
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }
  }

  resizeCanvas() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  addExplosion(x, y, count = 60, type = 'gold') {
    if (!this.canvas || !this.ctx) return;
    const symbols = ['🪙', '⭐', '✨', '💎'];
    const colors = ['#ffbe1a', '#00f2fe', '#00ff88', '#ec4899', '#f43f5e', '#6366f1'];
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      
      this.particles.push({
        x: x || this.canvas.width / 2,
        y: y || this.canvas.height * 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 5 + 2), // Boost upwards
        size: Math.random() * 12 + 8,
        symbol: type === 'gold_only' ? '🪙' : (Math.random() > 0.4 ? symbols[Math.floor(Math.random() * symbols.length)] : null),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        alpha: 1.0,
        decay: Math.random() * 0.015 + 0.012,
        gravity: 0.18,
        bounceCount: 0
      });
    }

    if (!this.animationFrameId) {
      this.tick();
    }
  }

  tick() {
    if (!this.canvas || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.particles.length === 0) {
      this.animationFrameId = null;
      return;
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      // Update Physics
      p.x += p.vx;
      p.vy += p.gravity;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      // Handle ground bouncing
      if (p.y > this.canvas.height - 10 && p.bounceCount < 2) {
        p.vy = -Math.abs(p.vy) * 0.45;
        p.bounceCount++;
      }

      // Render Particle
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.symbol) {
        this.ctx.font = `${p.size}px sans-serif`;
        this.ctx.fillText(p.symbol, -p.size / 2, p.size / 2);
      } else {
        // Draw colored confetti squares
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
      }

      this.ctx.restore();

      // Remove dead items
      if (p.alpha <= 0 || p.x < -50 || p.x > this.canvas.width + 50) {
        this.particles.splice(i, 1);
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.tick());
  }
}

let confettiEngine;

// ==========================================================================
// 3. CORE GLOBAL CONTEXT & STORAGE MODEL (LocalStorage Backup)
// ==========================================================================
const SYMBOLS = ['💎', '⭐', '🍀', '🔥', '⚡', '🎁', '🪙', '🍒', '🍉', '🍋'];

const PAYTABLE = [
  { match: '💎💎💎', rate: 500, label: 'Crystal Jackpot' },
  { match: '⭐⭐⭐', rate: 400, label: 'Celestial Match' },
  { match: '🍀🍀🍀', rate: 350, label: 'Luck Of Clover' },
  { match: '🔥🔥🔥', rate: 300, label: 'Blazing Super' },
  { match: '⚡⚡⚡', rate: 250, label: 'Electro Spin' },
  { match: '🎁🎁🎁', rate: 200, label: 'Prize Unbox' },
  { match: '🪙🪙🪙', rate: 180, label: 'Glittering Gold' },
  { match: '🍒🍒🍒', rate: 150, label: 'Cherry Bounty' },
  { match: '🍉🍉🍉', rate: 120, label: 'Fresh Melon' },
  { match: '🍋🍋🍋', rate: 100, label: 'Citrus Combo' },
  { match: '2-Match', rate: 20, label: 'Duo Twin Bonus' }
];

const PRESET_AVATARS = ['🕵️', '🦊', '🐉', '🦸', '🚀', '💎', '🌟', '🍿', '🔥', '🐯', '🤖', '🎮', '🛸', '🦁'];

// Core Default State
let appState = {
  profile: {
    username: "Pemain Beruntung",
    avatar: "🕵️",
    bio: "Mengejar bintang hoki virtual di modern Lucky Emoji Spin!",
    totalCoins: 1000,
    totalSpins: 0,
    jackpotsWon: 0,
    twinsWon: 0,
    joinDate: "Juni 2026",
    dailyLastClaimed: null
  },
  history: [],
  settings: {
    isMuted: false
  },
  achievements: {
    first_spin: false,
    twin_medal: false,
    jackpot_lord: false,
    wealthy_pioneer: false,
    elite_millionaire: false,
    spin_veteran: false
  }
};

// UI counters to interpolate smooth transitions
let displayCoins = 1000;
let coinsTickTimer = null;
let isSpinning = false;
let activeTab = 'home';
let base64CustomImg = null; // Staged custom profile picture
const SPIN_COST = 10;
let selectedSpinCount = 1;
let currentSessionWins = 0;
let currentRemainingSpins = 0;

// Initialization Helpers
function loadStateFromLocalStorage() {
  try {
    const rawProfile = localStorage.getItem('emoji_spin_profile');
    const rawHistory = localStorage.getItem('emoji_spin_history');
    const rawSettings = localStorage.getItem('emoji_spin_settings');
    const rawAchievements = localStorage.getItem('emoji_spin_achievements');
    
    // Default Join Date based on actual date strings if missing
    const joinYearMonth = new Date().toISOString().slice(0, 7);
    appState.profile.joinDate = joinYearMonth;

    if (rawProfile) {
      appState.profile = { ...appState.profile, ...JSON.parse(rawProfile) };
    }
    if (rawHistory) {
      appState.history = JSON.parse(rawHistory);
    }
    if (rawSettings) {
      appState.settings = { ...appState.settings, ...JSON.parse(rawSettings) };
    }
    if (rawAchievements) {
      appState.achievements = { ...appState.achievements, ...JSON.parse(rawAchievements) };
    }

    displayCoins = appState.profile.totalCoins;
    audio.setMute(appState.settings.isMuted);

  } catch (e) {
    console.warn("Storage sync read exception, initializing defaults", e);
  }
}

// Write to Localstorage safely
function saveStateToLocalStorage() {
  try {
    localStorage.setItem('emoji_spin_profile', JSON.stringify(appState.profile));
    localStorage.setItem('emoji_spin_history', JSON.stringify(appState.history));
    localStorage.setItem('emoji_spin_settings', JSON.stringify(appState.settings));
    localStorage.setItem('emoji_spin_achievements', JSON.stringify(appState.achievements));
  } catch (e) {
    console.error("LocalStorage write crash:", e);
  }
}

// ==========================================================================
// 4. COUNTER TICK NUMBERS INTERPOLATOR
// Soft clicks sound with custom speedup
// ==========================================================================
function updateAnimatedCoinsDisplay() {
  const targetCoins = appState.profile.totalCoins;
  const headerElem = document.getElementById('headerCoinCount');
  
  if (displayCoins === targetCoins) {
    if (headerElem) headerElem.textContent = targetCoins.toLocaleString();
    return;
  }

  if (coinsTickTimer) clearInterval(coinsTickTimer);

  const diff = targetCoins - displayCoins;
  const stepSpeed = Math.ceil(Math.abs(diff) / 18); // complete rolling quickly
  const isIncrementing = diff > 0;

  coinsTickTimer = setInterval(() => {
    if (isIncrementing) {
      displayCoins = Math.min(targetCoins, displayCoins + stepSpeed);
    } else {
      displayCoins = Math.max(targetCoins, displayCoins - stepSpeed);
    }

    if (headerElem) headerElem.textContent = displayCoins.toLocaleString();
    audio.playSpinTick();

    if (displayCoins === targetCoins) {
      clearInterval(coinsTickTimer);
      coinsTickTimer = null;
    }
  }, 24);
}

// Ensure smooth values upon profile edit etc
function forceCoinsUpdateImmediate() {
  displayCoins = appState.profile.totalCoins;
  const headerElem = document.getElementById('headerCoinCount');
  if (headerElem) headerElem.textContent = displayCoins.toLocaleString();
}

// ==========================================================================
// 5. NOTIFICATION TOAST BAR SYSTEMS
// ==========================================================================
function spawnToast(message, type = 'info', title = '') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toastId = 'toast_' + Math.random().toString(36).substr(2, 9);
  const toast = document.createElement('div');
  toast.id = toastId;
  toast.className = `toast-item toast-${type}`;
  
  let emoji = 'ℹ️';
  if (type === 'success') {
    emoji = '🏆';
  } else if (type === 'warn') {
    emoji = '🚨';
  } else if (type === 'error') {
    emoji = '❌';
  }

  toast.innerHTML = `
    <span class="toast-icon">${emoji}</span>
    <div class="toast-content-box">
      ${title ? `<div class="toast-heading">${title}</div>` : ''}
      <p class="toast-message">${message}</p>
    </div>
  `;

  container.appendChild(toast);

  // Sound triggering safely
  if (type === 'error') {
    audio.playError();
  } else if (type === 'success') {
    audio.playWinTwin();
  } else {
    audio.playClick();
  }

  // Self dismiss auto timers
  setTimeout(() => {
    toast.classList.add('exiting');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

// ==========================================================================
// 6. SLOT MACHINE REEL MECHANICAL MATRIX
// ==========================================================================
function setupPaytableNameGrid() {
  const container = document.getElementById('multiplierGrid');
  if (!container) return;
  container.innerHTML = '';

  PAYTABLE.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'paytable-row';
    
    // Calculate display rating based on relative SPIN_COST!
    const activePayout = (row.rate / 10) * SPIN_COST;
    
    // Check if Duo Twin generic row or direct Triple Match
    if (row.match === '2-Match') {
      rowDiv.innerHTML = `
        <div class="paytable-left-area">
          <span class="paytable-type">KECIL Match (2x)</span>
          <div class="paytable-text-desc">2 EMOJI KEMBAR</div>
        </div>
        <span class="paytable-value">+${activePayout.toLocaleString()} Koin</span>
      `;
    } else {
      const symbolsStr = row.match;
      const multiplierLabel = (row.rate / 10) + 'x';
      rowDiv.innerHTML = `
        <div class="paytable-left-area">
          <span class="paytable-type">${row.label} (${multiplierLabel})</span>
          <div class="paytable-emojis">${symbolsStr}</div>
        </div>
        <span class="paytable-value">+${activePayout.toLocaleString()} Koin</span>
      `;
    }
    container.appendChild(rowDiv);
  });
}

function updateBettingControlsUI() {
  const totalCost = SPIN_COST * selectedSpinCount;
  const costLabel = document.getElementById('sessionTotalCost');
  if (costLabel) {
    costLabel.textContent = `🪙 ${totalCost.toLocaleString()} Koin`;
  }
  setupPaytableNameGrid();
}

function toggleControlsInteractiveState(isEnabled) {
  const spinBtn = document.getElementById('spinBtn');
  if (spinBtn) spinBtn.disabled = !isEnabled;
  
  // Tab links locking
  document.querySelectorAll('.app-nav .nav-item').forEach(button => {
    if (isEnabled) {
      button.style.pointerEvents = 'auto';
      button.style.opacity = '1';
    } else {
      button.style.pointerEvents = 'none';
      button.style.opacity = '0.35';
    }
  });

  // Bet selection segment buttons locking
  document.querySelectorAll('.bet-chip, .spin-count-btn').forEach(btn => {
    if (isEnabled) {
      btn.style.pointerEvents = 'auto';
      btn.style.opacity = '1';
    } else {
      btn.style.pointerEvents = 'none';
      btn.style.opacity = '0.35';
    }
  });
}

function startSpinningSession() {
  if (isSpinning) return;
  
  audio.init();
  
  const totalCost = SPIN_COST * selectedSpinCount;
  
  // Guard check virtual coins balance
  if (appState.profile.totalCoins < totalCost) {
    audio.playError();
    spawnToast(`Koin virtual tidak mencukupi! Diperlukan 🪙 ${totalCost} koin untuk putaran ini.`, "error", "SALDO TIDAK CUKUP");
    return;
  }
  
  // Deduct coins upfront
  appState.profile.totalCoins -= totalCost;
  updateAnimatedCoinsDisplay();
  saveStateToLocalStorage();
  
  isSpinning = true;
  currentSessionWins = 0;
  currentRemainingSpins = selectedSpinCount;
  
  // Disable tab items and configuration segments
  toggleControlsInteractiveState(false);
  
  // Add active spin glow to wheels
  const sltMachine = document.querySelector('.slots-machine');
  if (sltMachine) sltMachine.classList.add('active-glow');
  
  // Kickstart sequential series
  executeNextSequenceSpin();
}

function executeNextSequenceSpin() {
  if (currentRemainingSpins <= 0) {
    finishRunningSession();
    return;
  }
  
  const spinIndex = selectedSpinCount - currentRemainingSpins + 1;
  const spinBtn = document.getElementById('spinBtn');
  const feedText = document.getElementById('spinFeedback');
  
  if (selectedSpinCount > 1) {
    if (spinBtn) {
      spinBtn.querySelector('.btn-content').innerHTML = `⏳ PUTARAN ${spinIndex}/${selectedSpinCount}...`;
    }
    if (feedText) {
      feedText.innerHTML = `<span class="text-sky font-semibold animate-pulse">Menghitung putaran hoki #${spinIndex}...</span>`;
    }
  } else {
    if (spinBtn) {
      spinBtn.querySelector('.btn-content').innerHTML = `⏳ MEMUTAR...`;
    }
    if (feedText) {
      feedText.innerHTML = `<span class="text-secondary">Keberuntungan sedang diacak...</span>`;
    }
  }

  const reelStrips = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
  ];

  // Pick winning combination randomly
  const landingIndex1 = Math.floor(Math.random() * SYMBOLS.length);
  const landingIndex2 = Math.floor(Math.random() * SYMBOLS.length);
  const landingIndex3 = Math.floor(Math.random() * SYMBOLS.length);

  const landingSymbols = [
    SYMBOLS[landingIndex1],
    SYMBOLS[landingIndex2],
    SYMBOLS[landingIndex3]
  ];

  const totalReels = 3;
  let reelsCompleted = 0;

  reelStrips.forEach((strip, reelIdx) => {
    if (!strip) return;
    strip.innerHTML = '';
    
    // Higher cycles for improved blur spinning effects
    const cyclesCount = 18 + reelIdx * 6;
    for (let i = 0; i < cyclesCount; i++) {
      const box = document.createElement('div');
      box.className = 'emoji-box spinning';
      if (i === cyclesCount - 1) {
        box.textContent = landingSymbols[reelIdx];
      } else {
        box.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      }
      strip.appendChild(box);
    }

    const windowHeight = 120;
    const finalTranslation = -(windowHeight * (cyclesCount - 1));
    
    strip.style.transition = 'none';
    strip.style.transform = `translateY(0px)`;
    strip.offsetHeight; // Flush layout

    const duration = 1.0 + reelIdx * 0.4; // SNAPPIER, CLEANER, REELS STOP PROGRESSIVELY
    strip.style.transition = `transform ${duration}s cubic-bezier(0.1, 0.88, 0.22, 1)`;
    strip.style.transform = `translateY(${finalTranslation}px)`;

    // Ticks sound feedback
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      if (tickCount < cyclesCount - 1) {
        audio.playSpinTick();
        tickCount++;
      } else {
        clearInterval(tickInterval);
      }
    }, (duration * 1000) / cyclesCount);

    setTimeout(() => {
      clearInterval(tickInterval);
      audio.playReelLock();
      
      const finalItems = strip.querySelectorAll('.emoji-box');
      if (finalItems.length > 0) {
        const stopBox = finalItems[finalItems.length - 1];
        stopBox.classList.remove('spinning');
        stopBox.classList.add('bounce-effect');
      }

      reelsCompleted++;
      if (reelsCompleted === totalReels) {
        processSequenceSpinResult(landingSymbols);
      }
    }, duration * 1000);
  });
}

function processSequenceSpinResult(symbols) {
  const [s1, s2, s3] = symbols;

  let winAmount = 0;
  let winType = 'lose';
  let titleStr = '';
  let detailStr = '';

  if (s1 === s2 && s2 === s3) {
    const matchStr = s1 + s2 + s3;
    const payRow = PAYTABLE.find(p => p.match === matchStr);
    const baseRate = payRow ? payRow.rate : 100;
    winAmount = (baseRate / 10) * SPIN_COST;
    winType = 'jackpot';
    titleStr = payRow ? payRow.label : 'SUPER TRIPLE MATCH';
    detailStr = `Gila! Tiga simbol hoki ${s1} berbaris sempurna!`;
  } else if (s1 === s2 || s2 === s3 || s1 === s3) {
    winAmount = 2 * SPIN_COST; // Duo Twin is a 2x bet match
    winType = 'twin';
    titleStr = 'DUO TWIN BONUS';
    detailStr = `Mantap! Dua simbol hoki kembar bertautan erat!`;
  }

  // Update game statistics
  appState.profile.totalSpins++;
  if (winType === 'jackpot') {
    appState.profile.jackpotsWon++;
  } else if (winType === 'twin') {
    appState.profile.twinsWon++;
  }

  // Add individual spin win to session overall ledger
  currentSessionWins += winAmount;

  // Append entry line in history
  appendHistoryItem(symbols, winAmount, winType);

  const feedText = document.getElementById('spinFeedback');
  const spinIndex = selectedSpinCount - currentRemainingSpins + 1;
  
  if (winAmount > 0) {
    if (feedText) {
      feedText.innerHTML = `<span class="text-emerald font-bold animate-pulse">Putaran #${spinIndex} Menang +${winAmount.toLocaleString()} Koin! ✨</span>`;
    }
    audio.playWinTwin();
    if (confettiEngine) confettiEngine.addExplosion(null, null, 15, 'mixed');
  } else {
    if (feedText) {
      feedText.innerHTML = `<span class="text-secondary">Putaran #${spinIndex} belum beruntung.</span>`;
    }
  }

  currentRemainingSpins--;

  // Slower sequence transition to let user relish the results
  setTimeout(() => {
    executeNextSequenceSpin();
  }, 1000);
}

function finishRunningSession() {
  isSpinning = false;
  
  // Turn off glow on reels
  const sltMachine = document.querySelector('.slots-machine');
  if (sltMachine) sltMachine.classList.remove('active-glow');
  
  // Re-enable tabs, buttons and inputs
  toggleControlsInteractiveState(true);
  
  const spinBtn = document.getElementById('spinBtn');
  if (spinBtn) {
    spinBtn.disabled = false;
    spinBtn.querySelector('.btn-content').innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
      SPIN SEKARANG
    `;
  }

  const feedText = document.getElementById('spinFeedback');

  // Check if user completed exactly 20x spin series to grant a special 50 coins bonus
  let bonusCoins = 0;
  if (selectedSpinCount === 20) {
    bonusCoins = 50;
    appState.profile.totalCoins += bonusCoins;
  }

  if (currentSessionWins > 0) {
    // Add overall sum to total virtual coins balance
    appState.profile.totalCoins += currentSessionWins;
    updateAnimatedCoinsDisplay();
    
    if (confettiEngine) confettiEngine.addExplosion(null, null, currentSessionWins > 200 ? 70 : 35, 'mixed');
    
    const title = 'SESI PUTARAN SELESAI!';
    const desc = `Selamat! Anda berhasil mengumpulkan total kemenangan setelah menyelesaikan ${selectedSpinCount} putaran hoki.${bonusCoins > 0 ? ' Anda juga berhak atas Bonus Sesi 20x sebesar +50 Koin!' : ''}`;
    triggerWinEpicPopup(title, desc, currentSessionWins + bonusCoins, currentSessionWins >= (SPIN_COST * 10) ? 'jackpot' : 'twin');
    
    if (feedText) {
      feedText.innerHTML = `<span class="text-emerald font-extrabold text-[13px]">TOTAL MENANG SESI: +${(currentSessionWins + bonusCoins).toLocaleString()} KOIN! 💎</span>`;
    }
  } else {
    updateAnimatedCoinsDisplay();
    if (feedText) {
      feedText.innerHTML = `<span class="text-secondary font-semibold">Selesai. Anda belum beruntung dari ${selectedSpinCount} putaran. ${bonusCoins > 0 ? 'Tapi Anda mendapat Bonus 20x Spin sebesar +50 Koin!' : ''}</span>`;
    }
    if (bonusCoins === 0) {
      audio.playError();
    }
  }

  if (bonusCoins > 0) {
    setTimeout(() => {
      spawnToast("Anda mendapatkan Bonus Sesi 20x sebesar 🎁 +50 Koin Gratis!", "success", "BONUS SESI 20X SPIN");
    }, 1200);
  }

  saveStateToLocalStorage();
  evaluateAchievementsUnlocks();
  updateProfileDashboard();
}

// ==========================================================================
// 7. BIG REWARD EPIC POPUP DIALOG
// ==========================================================================
function triggerWinEpicPopup(title, description, amount, type) {
  const popup = document.getElementById('winEpicPopup');
  const titleTxt = document.getElementById('winPopupType');
  const descTxt = document.getElementById('winPopupDescription');
  const valueTxt = document.getElementById('winPopupAwardedText');
  
  if (titleTxt) titleTxt.textContent = title;
  if (descTxt) descTxt.textContent = description;
  if (valueTxt) valueTxt.textContent = `+${amount}`;

  if (type === 'jackpot') {
    if (titleTxt) titleTxt.className = 'win-combo-title uppercase tracking-widest text-[#fbbf24]';
    audio.playWinJackpot();
  } else {
    if (titleTxt) titleTxt.className = 'win-combo-title uppercase tracking-widest text-[#00f2fe]';
    audio.playWinTwin();
  }

  if (popup) popup.classList.add('active');
}

function dismissWinPopup() {
  const popup = document.getElementById('winEpicPopup');
  if (popup) popup.classList.remove('active');
  audio.playClick();
}

// ==========================================================================
// 8. PAGE: HISTORY & SEARCH / DELETION FILTERS
// ==========================================================================
function appendHistoryItem(emojis, winAmount, type) {
  const item = {
    id: 'spin_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    emojis: emojis,
    winAmount: winAmount,
    type: type,
    timestamp: new Date().toISOString()
  };

  appState.history.unshift(item);
  saveStateToLocalStorage();
}

function formatRelativeTime(isoString) {
  try {
    const d = new Date(isoString);
    const pad = n => String(n).padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  } catch (e) {
    return "Baru saja";
  }
}

function renderHistoryLogs(filterType = 'all', searchQuery = '') {
  const container = document.getElementById('historyListContainer');
  if (!container) return;
  container.innerHTML = '';

  const cleanQuery = searchQuery.trim().toLowerCase();
  
  // Filter core items
  const filtered = appState.history.filter(item => {
    // 1. Filter pill test
    if (filterType !== 'all') {
      if (filterType === 'jackpot' && item.type !== 'jackpot') return false;
      if (filterType === 'twin' && item.type !== 'twin') return false;
      if (filterType === 'lose' && item.type !== 'lose') return false;
    }

    // 2. Search search text test (search in emoji string or win labels)
    if (cleanQuery) {
      const emojiStr = item.emojis.join('');
      const typeStr = item.type.toLowerCase();
      const matchLabel = item.winAmount > 0 ? 'win' : 'lose';
      if (!emojiStr.includes(cleanQuery) && !typeStr.includes(cleanQuery) && !matchLabel.includes(cleanQuery)) {
        return false;
      }
    }

    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state animate-fade-in">
        <div class="empty-state-icon">🗂️</div>
        <p>Belum ada riwayat hoki yang cocok.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const div = document.createElement('div');
    div.className = 'history-item';
    
    let isTriple = item.type === 'jackpot';
    let isDouble = item.type === 'twin';
    
    let stateLabel = '<span class="text-secondary uppercase">ZONK</span>';
    let rewardClass = 'earn-zero';
    
    if (isTriple) {
      stateLabel = '<span class="text-gold font-bold uppercase">🎁 TRIPLE MATCH</span>';
      rewardClass = 'earn-win-triple';
    } else if (isDouble) {
      stateLabel = '<span class="text-sky font-semibold uppercase">⚡ duo math</span>';
      rewardClass = 'earn-win-twin';
    }

    const timeStr = formatRelativeTime(item.timestamp);
    const emojisHtml = item.emojis.join('');

    div.innerHTML = `
      <div class="history-left">
        <div class="history-emojis-bubble">${emojisHtml}</div>
        <div class="history-info">
          <div class="history-status-label">${stateLabel}</div>
          <span class="history-time">${timeStr}</span>
        </div>
      </div>
      <div class="history-right">
        <div class="history-earn-pill ${rewardClass}">+${item.winAmount}</div>
        <button class="delete-item-btn" data-id="${item.id}" title="Hapus Baris">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.8">
            <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `;

    // Attaching single row delete callback
    div.querySelector('.delete-item-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      showCustomConfirmDialog(
        "Hapus Riwayat Putaran",
        "Apakah Anda yakin akan menghapus rekaman putaran tunggal ini?",
        () => {
          appState.history = appState.history.filter(h => h.id !== item.id);
          saveStateToLocalStorage();
          renderHistoryLogs(filterType, searchQuery);
          spawnToast("Baris riwayat putaran berhasil dihapus.", "success");
        }
      );
    });

    container.appendChild(div);
  });
}

// ==========================================================================
// 9. CUSTOM POPUP CONFIRMER (NO UGLY SYNCHRONOUS WINDOW.CONFIRM)
// ==========================================================================
let activeConfirmCallback = null;

function showCustomConfirmDialog(title, message, onConfirm) {
  const modal = document.getElementById('confirmModal');
  if (modal) {
    const cTitle = document.getElementById('confirmTitle');
    const cMessage = document.getElementById('confirmMessage');
    if (cTitle) cTitle.textContent = title;
    if (cMessage) cMessage.textContent = message;
    
    activeConfirmCallback = onConfirm;
    modal.classList.add('active');
    audio.playClick();
  }
}

function closeConfirmDialog() {
  const modal = document.getElementById('confirmModal');
  if (modal) modal.classList.remove('active');
  activeConfirmCallback = null;
  audio.playClick();
}

// ==========================================================================
// 10. PAGE: COINS (DAILY GIFT BOX & BADGES ACHIEVEMENTS)
// ==========================================================================
const DAILY_REWARD_VALUE = 150;

function updateDailyRewardUI() {
  const chest = document.getElementById('dailyChest');
  const countBox = document.getElementById('countdownBox');
  const claimBtn = document.getElementById('claimDailyBtn');
  const navAlert = document.getElementById('navDailyRewardAlert');

  const lastClaimStr = appState.profile.dailyLastClaimed;
  
  if (!lastClaimStr) {
    // New Player never claimed can get free coins instantly
    if (chest) chest.className = "daily-chest can-claim";
    if (countBox) countBox.classList.add('hidden');
    if (claimBtn) claimBtn.disabled = false;
    if (navAlert) navAlert.classList.remove('hidden');
    return;
  }

  const lastClaimed = new Date(lastClaimStr).getTime();
  const nextClaimTime = lastClaimed + (24 * 60 * 60 * 1000); // 24 hours lock
  const now = Date.now();
  const timeDifference = nextClaimTime - now;

  if (timeDifference > 0) {
    // Still locked
    if (chest) {
      chest.className = "daily-chest countdown";
      chest.innerHTML = '<div class="chest-front">🔒</div>';
    }
    if (countBox) countBox.classList.remove('hidden');
    if (claimBtn) claimBtn.disabled = true;
    if (navAlert) navAlert.classList.add('hidden');
    
    // Start ticking down
    tickDailyCountdown(timeDifference);
  } else {
    // Unlocked and ready
    if (chest) {
      chest.className = "daily-chest can-claim";
      chest.innerHTML = '<div class="chest-front">🎁</div>';
    }
    if (countBox) countBox.classList.add('hidden');
    if (claimBtn) claimBtn.disabled = false;
    if (navAlert) navAlert.classList.remove('hidden');
  }
}

let countdownInterval = null;
function tickDailyCountdown(msRemaining) {
  if (countdownInterval) clearInterval(countdownInterval);

  let tempMs = msRemaining;
  const timerText = document.getElementById('dailyCountdownText');

  const updateDisplay = () => {
    if (tempMs <= 0) {
      clearInterval(countdownInterval);
      updateDailyRewardUI();
      spawnToast("🎁 Kotak harian Anda telah terbuka kembali! Ambil koin Anda sekarang!", "success");
      return;
    }

    const hrs = Math.floor(tempMs / (3600 * 1000));
    const mins = Math.floor((tempMs % (3600 * 1000)) / (60 * 1000));
    const secs = Math.floor((tempMs % (60 * 1000)) / 1000);

    const pad = n => String(n).padStart(2, '0');
    if (timerText) timerText.textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    tempMs -= 1000;
  };

  updateDisplay();
  countdownInterval = setInterval(updateDisplay, 1000);
}

function executeDailyRewardClaim() {
  audio.init();
  const lastClaimStr = appState.profile.dailyLastClaimed;
  
  if (lastClaimStr) {
    const lastClaimed = new Date(lastClaimStr).getTime();
    if (Date.now() - lastClaimed < 24 * 60 * 60 * 1000) {
      audio.playError();
      spawnToast("Daily reward masih mengunci, silakan tunggu sisa waktu cooler.", "warn");
      return;
    }
  }

  // Award Coins
  appState.profile.totalCoins += DAILY_REWARD_VALUE;
  appState.profile.dailyLastClaimed = new Date().toISOString();
  saveStateToLocalStorage();
  
  // Confettis pop!
  audio.playDailyClaim();
  if (confettiEngine) confettiEngine.addExplosion(null, null, 40, 'gold_only');
  
  // Custom toast notification detail
  spawnToast(`Peti misteri pecah! Selamat Anda mendapat +${DAILY_REWARD_VALUE} Koin Gratis! ✨`, "success", "HADIAH HARIAN KLAIM");
  
  // Update state loops
  updateAnimatedCoinsDisplay();
  updateDailyRewardUI();
  evaluateAchievementsUnlocks();
  updateProfileDashboard();
}

// ACHIEVEMENTS TRACKER CHECKLISTS
const ACHIEVEMENTS_DATA = {
  first_spin: { key: 'first_spin', emoji: '🎬', title: 'Putaran Pertama', desc: 'Selesaikan spin virtual pertama kali' },
  twin_medal: { key: 'twin_medal', emoji: '✨', title: 'Generasi Kembar', desc: 'Dapatkan kecocokan duo twin dalam gulungan' },
  jackpot_lord: { key: 'jackpot_lord', emoji: '👑', title: 'Dewa Jackpot', desc: 'Menangkan 3x emoji sebaris sempurna' },
  wealthy_pioneer: { key: 'wealthy_pioneer', emoji: '🚀', title: 'Pioneer Koin', desc: 'Miliki saldo 1,500 total koin' },
  elite_millionaire: { key: 'elite_millionaire', emoji: '🛸', title: 'Spesialis Elite', desc: 'Miliki saldo 3,000 total koin' },
  spin_veteran: { key: 'spin_veteran', emoji: '🎓', title: 'Profesor Spin', desc: 'Kumpulkan total 50 kali putaran gulungan' }
};

function renderAchievementsMap() {
  const grid = document.getElementById('achievementsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  Object.values(ACHIEVEMENTS_DATA).forEach(badge => {
    const isUnlocked = appState.achievements[badge.key] === true;
    
    const item = document.createElement('div');
    item.className = `badge-item ${isUnlocked ? 'achieved' : 'locked'}`;
    
    item.innerHTML = `
      <div class="badge-medal-wrapper">${isUnlocked ? badge.emoji : '🔒'}</div>
      <div class="badge-title">${badge.title}</div>
      <p class="badge-desc">${badge.desc}</p>
    `;
    grid.appendChild(item);
  });
}

function evaluateAchievementsUnlocks() {
  let isAnyUnlockedNow = false;

  const tryUnlock = (key, testCondition) => {
    if (appState.achievements[key] === false && testCondition) {
      appState.achievements[key] = true;
      isAnyUnlockedNow = true;
      spawnToast(`🎖️ Medali Pencapaian Baru Terbuka: "${ACHIEVEMENTS_DATA[key].title}"!`, "success", "CHALLENGE COMPLETE!");
    }
  };

  // Conditions
  tryUnlock('first_spin', appState.profile.totalSpins >= 1);
  tryUnlock('twin_medal', appState.profile.twinsWon >= 1);
  tryUnlock('jackpot_lord', appState.profile.jackpotsWon >= 1);
  tryUnlock('wealthy_pioneer', appState.profile.totalCoins >= 1500);
  tryUnlock('elite_millionaire', appState.profile.totalCoins >= 3000);
  tryUnlock('spin_veteran', appState.profile.totalSpins >= 50);

  if (isAnyUnlockedNow) {
    saveStateToLocalStorage();
    renderAchievementsMap();
  }
}

// ==========================================================================
// 11. PAGE: USER PROFILE & DATABASE CUSTOMIZATIONS
// ==========================================================================
function updateProfileDashboard() {
  const uId = document.getElementById('profileUsername');
  const bId = document.getElementById('profileBio');
  const jId = document.getElementById('profileJoinDate');
  const tsId = document.getElementById('statTotalSpins');
  const jwId = document.getElementById('statJackpots');
  const twId = document.getElementById('statTwins');
  const wrId = document.getElementById('statWinRate');
  const avatarContainer = document.getElementById('profileAvatarDisplay');

  if (uId) uId.textContent = appState.profile.username;
  if (bId) bId.textContent = appState.profile.bio;
  if (jId) jId.textContent = appState.profile.joinDate || "Juni 2026";

  // Counters
  if (tsId) tsId.textContent = appState.profile.totalSpins;
  if (jwId) jwId.textContent = appState.profile.jackpotsWon;
  if (twId) twId.textContent = appState.profile.twinsWon;

  // Render Avatar (supports Base64 Custom Image strings or raw Emoji letters)
  if (avatarContainer) {
    const avatarStr = appState.profile.avatar;
    if (avatarStr && avatarStr.startsWith('data:image')) {
      avatarContainer.innerHTML = `<img src="${avatarStr}" alt="Custom Profile Pic">`;
    } else {
      avatarContainer.textContent = avatarStr || "🕵️";
    }
  }

  // WinRate division calculation
  if (wrId) {
    const total = appState.profile.totalSpins;
    const wins = appState.profile.jackpotsWon + appState.profile.twinsWon;
    const rate = total > 0 ? Math.round((wins / total) * 100) : 0;
    wrId.textContent = `${rate}%`;
  }
}

// SETUP EDIT PROFILE MODAL ELEMENTS
function prepareProfileFormModal() {
  const modal = document.getElementById('editProfileModal');
  const presetsGrid = document.getElementById('avatarPresetsGrid');
  
  // Load current values
  const inputUser = document.getElementById('inputUsername');
  const inputBio = document.getElementById('inputBio');
  if (inputUser) inputUser.value = appState.profile.username;
  if (inputBio) inputBio.value = appState.profile.bio;
  
  base64CustomImg = appState.profile.avatar; // Stage existing picture
  renderModalPreviewPicModel();

  // Populate dynamic inline preset selector nodes
  if (presetsGrid) {
    presetsGrid.innerHTML = '';
    PRESET_AVATARS.forEach(preset => {
      const item = document.createElement('div');
      item.className = 'avatar-preset-item';
      item.textContent = preset;
      
      if (preset === base64CustomImg) {
        item.classList.add('active');
      }

      item.addEventListener('click', () => {
        audio.playClick();
        base64CustomImg = preset;
        
        // Update Active class list
        presetsGrid.querySelectorAll('.avatar-preset-item').forEach(p => p.classList.remove('active'));
        item.classList.add('active');
        
        renderModalPreviewPicModel();
      });
      presetsGrid.appendChild(item);
    });
  }

  if (modal) modal.classList.add('active');
  audio.playClick();
}

function renderModalPreviewPicModel() {
  const preview = document.getElementById('modalAvatarPreview');
  if (!preview) return;
  if (base64CustomImg && base64CustomImg.startsWith('data:image')) {
    preview.innerHTML = `<img src="${base64CustomImg}" alt="Avatar Stage">`;
  } else {
    preview.innerHTML = '';
    preview.textContent = base64CustomImg || "🤔";
  }
}

// base64 reader file upload logic
function handleCustomImageUpload(file) {
  if (!file) return;

  if (file.size > 1.2 * 1024 * 1024) {
    spawnToast("Gagal unggah: Ukuran file melampaui batas maksimal 1MB.", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    base64CustomImg = e.target.result;
    renderModalPreviewPicModel();
    
    // Clear preset selection highlights
    const presetsGrid = document.getElementById('avatarPresetsGrid');
    if (presetsGrid) {
      presetsGrid.querySelectorAll('.avatar-preset-item').forEach(p => p.classList.remove('active'));
    }
    
    const statusText = document.getElementById('fileUploadStatus');
    if (statusText) statusText.textContent = "Gambar kustom dimuat ✅";
    spawnToast("Gambar kustom berhasil diproses.", "success");
  };
  reader.onerror = () => {
    spawnToast("Terdapat masalah membaca file gambar.", "error");
  };
  reader.readAsDataURL(file);
}

function saveProfileFormData(e) {
  e.preventDefault();
  
  const inputUser = document.getElementById('inputUsername');
  const inputBio = document.getElementById('inputBio');
  const newUsername = inputUser ? inputUser.value.trim() : "";
  const newBio = inputBio ? inputBio.value.trim() : "";

  if (!newUsername) {
    spawnToast("Kolom nama tidak boleh dikosongkan.", "warn");
    return;
  }

  // Update profile states
  appState.profile.username = newUsername;
  appState.profile.bio = newBio;
  appState.profile.avatar = base64CustomImg;

  saveStateToLocalStorage();
  updateProfileDashboard();
  
  // Close modal
  const modal = document.getElementById('editProfileModal');
  if (modal) modal.classList.remove('active');
  spawnToast("Profil kredensial berhasil disimpan secara permanen.", "success");
}

// RESET APPLICATION STATE UTILITY BUTTON
function hardResetWholeApplicationData() {
  showCustomConfirmDialog(
    "RESET TOTAL ASET GAME",
    "Seluruh koin, pencapaian, riwayat, dan profil Anda akan dihapus permanen. Mulai lembaran baru?",
    () => {
      localStorage.clear();
      appState = {
        profile: {
          username: "Pemain Beruntung",
          avatar: "🕵️",
          bio: "Mengejar bintang hoki virtual di modern Lucky Emoji Spin!",
          totalCoins: 1000,
          totalSpins: 0,
          jackpotsWon: 0,
          twinsWon: 0,
          joinDate: new Date().toISOString().slice(0, 7),
          dailyLastClaimed: null
        },
        history: [],
        settings: {
          isMuted: false
        },
        achievements: {
          first_spin: false,
          twin_medal: false,
          jackpot_lord: false,
          wealthy_pioneer: false,
          elite_millionaire: false,
          spin_veteran: false
        }
      };
      
      saveStateToLocalStorage();
      displayCoins = 1000;
      forceCoinsUpdateImmediate();
      updateProfileDashboard();
      updateDailyRewardUI();
      renderAchievementsMap();
      renderHistoryLogs();
      
      closeConfirmDialog();
      spawnToast("Data game berhasil disetel ulang ke pabrikan.", "success");
      
      // Return to homepage
      switchToTab('home');
    }
  );
}

// ==========================================================================
// 12. TAB SWITCHER CONTROLLER WITH FADE LAYER TRANSITIONS
// ==========================================================================
function switchToTab(tabId) {
  if (isSpinning && tabId !== 'home') {
    spawnToast("Gulungan mesih berputar, silakan tunggu sesaat.", "warn");
    return;
  }

  activeTab = tabId;
  audio.playClick();
  
  // Update footer visual classes
  document.querySelectorAll('.nav-item').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Switch display elements
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });

  const activeSection = document.getElementById(`page${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`);
  if (activeSection) {
    activeSection.classList.add('active');
  }

  // Reload corresponding subviews
  if (tabId === 'history') {
    renderHistoryLogs();
  } else if (tabId === 'coins') {
    updateDailyRewardUI();
    renderAchievementsMap();
  } else if (tabId === 'profile') {
    updateProfileDashboard();
  }
}

// ==========================================================================
// 13. BOOTSTRAPPING SYSTEM LISTENERS
// ==========================================================================
function initializeGameApp() {
  try {
    // Launch Confetti Physics Canvas
    confettiEngine = new ParticlesEngine('particlesCanvas');

    // Load persistent configurations
    loadStateFromLocalStorage();
    setupPaytableNameGrid();
    updateAnimatedCoinsDisplay();

    // 1. Mute/Unmute Switcher
    const updateMuteButtonState = () => {
      const isMuted = appState.settings.isMuted;
      const soundOn = document.getElementById('soundOnIcon');
      const soundOff = document.getElementById('soundOffIcon');
      
      if (soundOn && soundOff) {
        if (isMuted) {
          soundOn.classList.add('hidden');
          soundOff.classList.remove('hidden');
        } else {
          soundOn.classList.remove('hidden');
          soundOff.classList.add('hidden');
        }
      }
    };
    
    updateMuteButtonState();

    const muteToggle = document.getElementById('muteToggle');
    if (muteToggle) {
      muteToggle.addEventListener('click', () => {
        appState.settings.isMuted = !appState.settings.isMuted;
        audio.setMute(appState.settings.isMuted);
        saveStateToLocalStorage();
        
        updateMuteButtonState();
        audio.playClick();
        
        spawnToast(appState.settings.isMuted ? "Mode senyap diaktifkan." : "Efek audio diaktifkan.", "info");
      });
    }

    // 2. Navigation bar clicks
    document.querySelectorAll('.app-nav .nav-item').forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        switchToTab(targetTab);
      });
    });

    // 3. Game interactive handles
    const spinBtn = document.getElementById('spinBtn');
    if (spinBtn) {
      spinBtn.addEventListener('click', (e) => {
        createRippleWaveEffect(e);
        startSpinningSession();
      });
    }

    // Custom Spin Count selector buttons
    document.querySelectorAll('.spin-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        audio.playClick();
        document.querySelectorAll('.spin-count-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSpinCount = parseInt(btn.getAttribute('data-count'), 10);
        updateBettingControlsUI();
      });
    });

    // Load and apply initial state of betting system
    updateBettingControlsUI();

    const dismissBtn = document.getElementById('winPopupDismissBtn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        dismissWinPopup();
      });
    }

    // 4. Custom Drag-and-drop & Manual Character Img load handlers
    const fileInput = document.getElementById('avatarFileInput');
    const fileBtn = document.getElementById('customUploadTrigger');

    if (fileBtn && fileInput) {
      fileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
      });

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleCustomImageUpload(file);
      });
    }

    // 5. Daily claim reward
    const claimDailyBtn = document.getElementById('claimDailyBtn');
    if (claimDailyBtn) {
      claimDailyBtn.addEventListener('click', () => {
        executeDailyRewardClaim();
      });
    }
    const dailyChest = document.getElementById('dailyChest');
    if (dailyChest) {
      dailyChest.addEventListener('click', () => {
        executeDailyRewardClaim();
      });
    }

    // 6. Settings profiles Modal handles
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
      editProfileBtn.addEventListener('click', () => {
        prepareProfileFormModal();
      });
    }

    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
      editProfileForm.addEventListener('submit', (e) => {
        saveProfileFormData(e);
      });
    }

    // 7. Click overlay close buttons
    document.querySelectorAll('.modal-close-btn, [data-modal]').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target === item || item.classList.contains('modal-close-btn') || item.getAttribute('data-modal')) {
          const modalId = item.getAttribute('data-modal') || item.closest('.modal-overlay').id;
          const targetModal = document.getElementById(modalId);
          if (targetModal) {
            targetModal.classList.remove('active');
          }
          audio.playClick();
        }
      });
    });

    // Prevent dialog closing when clicking content card
    document.querySelectorAll('.modal-container').forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });

    // 8. Custom Confirmation Dialog trigger linkages
    const confirmCancelBtn = document.getElementById('confirmCancelBtn');
    if (confirmCancelBtn) {
      confirmCancelBtn.addEventListener('click', () => {
        closeConfirmDialog();
      });
    }
    const confirmConfirmBtn = document.getElementById('confirmConfirmBtn');
    if (confirmConfirmBtn) {
      confirmConfirmBtn.addEventListener('click', () => {
        if (activeConfirmCallback) activeConfirmCallback();
        closeConfirmDialog();
      });
    }

    // Clear all list handler
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => {
        if (appState.history.length === 0) {
          spawnToast("Data riwayat hoki kosong.", "warn");
          return;
        }
        showCustomConfirmDialog(
          "HAPUS RIWAYAT TOTAL",
          "Apakah Anda yakin akan menghapus seluruh rekaman putaran slot hoki Anda tanpa batas?",
          () => {
            appState.history = [];
            saveStateToLocalStorage();
            renderHistoryLogs();
            spawnToast("Daftar tabel riwayat dihanguskan sepenuhnya.", "success");
          }
        );
      });
    }

    const resetAppBtn = document.getElementById('resetAppBtn');
    if (resetAppBtn) {
      resetAppBtn.addEventListener('click', () => {
        hardResetWholeApplicationData();
      });
    }

    // 9. Real-time Search inputs filter loops
    const searchInput = document.getElementById('historySearch');
    if (searchInput) {
      const triggerDebouncedLogsRefresh = () => {
        const searchVal = searchInput.value;
        const activeFilterBtn = document.querySelector('.filter-pill.active');
        const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
        renderHistoryLogs(activeFilter, searchVal);
      };

      searchInput.addEventListener('input', triggerDebouncedLogsRefresh);

      document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          audio.playClick();
          document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          
          const filterType = pill.getAttribute('data-filter');
          const searchVal = searchInput.value;
          renderHistoryLogs(filterType, searchVal);
        });
      });
    }
  } catch (err) {
    console.error("Initialization error caught:", err);
  } finally {
    // 10. Start Simulated progress loader animation
    simulateLoadingProgress();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGameApp);
} else {
  initializeGameApp();
}

// ==========================================================================
// 14. COMPLEMENTARY SHUTTLE LOADER ANIMATOR
// ==========================================================================
function simulateLoadingProgress() {
  const fill = document.getElementById('progressFill');
  const prctText = document.getElementById('loadingPercentText');
  const statusText = document.getElementById('loadingStatusText');
  const splash = document.getElementById('loadingSplash');
  
  const statusLabels = [
    "Menghubungkan slot sensorik...",
    "Mengatur multiplier hoki...",
    "Menyusun tabel diagram modal...",
    "Melumasi filter partikel...",
    "Selesai! Memulai ruang lobby..."
  ];

  let currentPercent = 0;

  const interval = setInterval(() => {
    currentPercent += Math.floor(Math.random() * 8) + 4;
    
    if (currentPercent >= 100) {
      currentPercent = 100;
      clearInterval(interval);
      
      if (fill) fill.style.width = '100%';
      if (prctText) prctText.textContent = '100%';
      if (statusText) statusText.textContent = statusLabels[4];

      setTimeout(() => {
        if (splash) splash.classList.add('hidden');
        // Spark initial welcome alerts
        spawnToast("🎮 Selamat datang kembali! Gulungan premium Lucky Emoji Spin aktif.", "success", "SISTEM ONLINE");
        
        // Render initial alerts in badge indicators
        updateDailyRewardUI();
      }, 500);
    } else {
      if (fill) fill.style.width = `${currentPercent}%`;
      if (prctText) prctText.textContent = `${currentPercent}%`;
      
      const idx = Math.min(statusLabels.length - 2, Math.floor(currentPercent / 25));
      if (statusText) statusText.textContent = statusLabels[idx];
    }
  }, 50);
}

// Ripple waves dispatcher on modern buttons
function createRippleWaveEffect(e) {
  const btn = e.currentTarget;
  const container = btn.querySelector('.btn-ripple-container');
  if (!container) return;

  const rect = btn.getBoundingClientRect();
  const wave = document.createElement('span');
  wave.className = 'ripple-wave';
  
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  wave.style.left = `${x}px`;
  wave.style.top = `${y}px`;
  
  const size = Math.max(rect.width, rect.height) * 2;
  wave.style.width = `${size}px`;
  wave.style.height = `${size}px`;
  
  container.appendChild(wave);
  
  setTimeout(() => {
    wave.remove();
  }, 500);
}