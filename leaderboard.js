import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgrgXfq-5DIQVchrhl28oCdwoOlTd1vao",
  authDomain: "syonx-play.firebaseapp.com",
  projectId: "syonx-play",
  storageBucket: "syonx-play.firebasestorage.app",
  messagingSenderId: "138643605475",
  appId: "1:138643605475:web:ca4a5cca49bc269b09c2d6"
};

const leaderboardFirebaseApp = initializeApp(firebaseConfig);
const leaderboardAuth = getAuth(leaderboardFirebaseApp);
const leaderboardDb = getFirestore(leaderboardFirebaseApp);

let leaderboardCurrentUser = null;
let leaderboardIsRegisterMode = false;
let leaderboardUnsubscribe = null;

function readLocalProfileSnapshot() {
  try {
    const raw = localStorage.getItem('emoji_spin_profile');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function leaderboardShowLoggedOut() {
  const out = document.getElementById('leaderboardLoggedOutView');
  const inn = document.getElementById('leaderboardLoggedInView');
  if (out) out.style.display = '';
  if (inn) inn.style.display = 'none';
}

function leaderboardShowLoggedIn() {
  const out = document.getElementById('leaderboardLoggedOutView');
  const inn = document.getElementById('leaderboardLoggedInView');
  if (out) out.style.display = 'none';
  if (inn) inn.style.display = '';
}

function leaderboardOpenLoginModal() {
  const modal = document.getElementById('leaderboardLoginModal');
  if (modal) modal.classList.add('active');
}

function leaderboardCloseLoginModal() {
  const modal = document.getElementById('leaderboardLoginModal');
  if (modal) modal.classList.remove('active');
  const errBox = document.getElementById('leaderboardLoginError');
  if (errBox) errBox.textContent = '';
}

function leaderboardSetError(message) {
  const errBox = document.getElementById('leaderboardLoginError');
  if (errBox) errBox.textContent = message;
}

function leaderboardMapAuthError(code) {
  const map = {
    'auth/invalid-email': 'Format email tidak valid.',
    'auth/user-not-found': 'Akun tidak ditemukan.',
    'auth/wrong-password': 'Password salah.',
    'auth/email-already-in-use': 'Email sudah terdaftar.',
    'auth/weak-password': 'Password minimal 6 karakter.',
    'auth/invalid-credential': 'Email atau password salah.',
    'auth/popup-closed-by-user': 'Login Google dibatalkan.'
  };
  return map[code] || 'Terjadi kesalahan, silakan coba lagi.';
}

async function leaderboardSubmitScoreToFirestore() {
  if (!leaderboardCurrentUser) {
    leaderboardOpenLoginModal();
    return;
  }
  const profile = readLocalProfileSnapshot();
  if (!profile) return;

  const docRef = doc(leaderboardDb, 'leaderboard', leaderboardCurrentUser.uid);
  await setDoc(docRef, {
    username: profile.username || 'Pemain Beruntung',
    totalCoins: profile.totalCoins || 0,
    totalSpins: profile.totalSpins || 0,
    jackpotsWon: profile.jackpotsWon || 0,
    twinsWon: profile.twinsWon || 0,
    updatedAt: Date.now()
  });
}

function leaderboardRenderEntry(rank, data) {
  const item = document.createElement('div');
  item.className = 'history-item';
  const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
  item.innerHTML = `
    <div class="history-left">
      <div class="history-emojis-bubble">${medal}</div>
      <div class="history-info">
        <div class="history-status-label">${data.username || 'Pemain Beruntung'}</div>
        <span class="history-time">${data.totalSpins || 0} spin &middot; ${data.jackpotsWon || 0} jackpot</span>
      </div>
    </div>
    <div class="history-right">
      <div class="history-earn-pill earn-win-triple">🪙 ${(data.totalCoins || 0).toLocaleString()}</div>
    </div>
  `;
  return item;
}

function leaderboardListenToRanking() {
  const container = document.getElementById('leaderboardListContainer');
  if (!container) return;
  if (leaderboardUnsubscribe) leaderboardUnsubscribe();

  const q = query(collection(leaderboardDb, 'leaderboard'), orderBy('totalCoins', 'desc'), limit(50));
  leaderboardUnsubscribe = onSnapshot(q, (snapshot) => {
    container.innerHTML = '';
    if (snapshot.empty) {
      container.innerHTML = '<div class="empty-state animate-fade-in"><div class="empty-state-icon">🏆</div><p>Belum ada pemain di papan peringkat.</p></div>';
      return;
    }
    let rank = 0;
    snapshot.forEach((docSnap) => {
      rank++;
      container.appendChild(leaderboardRenderEntry(rank, docSnap.data()));
    });
  });
}

function leaderboardHandleAuthStateChange(user) {
  leaderboardCurrentUser = user;
  if (user) {
    leaderboardShowLoggedIn();
    leaderboardCloseLoginModal();
    leaderboardListenToRanking();
  } else {
    leaderboardShowLoggedOut();
    if (leaderboardUnsubscribe) {
      leaderboardUnsubscribe();
      leaderboardUnsubscribe = null;
    }
  }
}

function leaderboardSetupEventBindings() {
  const loginBtn = document.getElementById('leaderboardLoginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => leaderboardOpenLoginModal());
  }

  const logoutBtn = document.getElementById('leaderboardLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => signOut(leaderboardAuth));
  }

  const submitBtn = document.getElementById('leaderboardSubmitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => leaderboardSubmitScoreToFirestore());
  }

  const registerToggleBtn = document.getElementById('leaderboardRegisterToggleBtn');
  if (registerToggleBtn) {
    registerToggleBtn.addEventListener('click', () => {
      leaderboardIsRegisterMode = !leaderboardIsRegisterMode;
      const submitTextBtn = document.getElementById('leaderboardEmailSubmitBtn');
      if (submitTextBtn) submitTextBtn.textContent = leaderboardIsRegisterMode ? 'DAFTAR' : 'MASUK';
      registerToggleBtn.textContent = leaderboardIsRegisterMode ? 'Sudah Punya Akun' : 'Daftar Baru';
      leaderboardSetError('');
    });
  }

  const loginForm = document.getElementById('leaderboardLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      leaderboardSetError('');
      const email = document.getElementById('loginEmailInput').value.trim();
      const password = document.getElementById('loginPasswordInput').value;
      try {
        if (leaderboardIsRegisterMode) {
          await createUserWithEmailAndPassword(leaderboardAuth, email, password);
        } else {
          await signInWithEmailAndPassword(leaderboardAuth, email, password);
        }
      } catch (err) {
        leaderboardSetError(leaderboardMapAuthError(err.code));
      }
    });
  }

  const googleBtn = document.getElementById('leaderboardGoogleBtn');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      leaderboardSetError('');
      try {
        await signInWithPopup(leaderboardAuth, new GoogleAuthProvider());
      } catch (err) {
        leaderboardSetError(leaderboardMapAuthError(err.code));
      }
    });
  }
}

function leaderboardBootstrap() {
  leaderboardSetupEventBindings();
  onAuthStateChanged(leaderboardAuth, leaderboardHandleAuthStateChange);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', leaderboardBootstrap);
} else {
  leaderboardBootstrap();
}
