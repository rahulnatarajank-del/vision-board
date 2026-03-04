import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import VisionBoardForm from "./pages/VisionBoardForm";

const API_BASE = "https://vision-board-backend-9dx6.onrender.com";

const getToken = () => localStorage.getItem("token");
const getUser = () => {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};
const saveSession = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};
const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const PAGES = {
  LOGIN: "login",
  CHANGE_PASSWORD: "change_password",
  WELCOME: "welcome",
  FORM: "form",
};

// ─── WELCOME PAGE ───
function WelcomePage({ user, onContinue }) {
  return (
    <div style={welcomeStyles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Nunito:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes flowerBounce { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-12px) scale(1.2); } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(232,96,138,0.4); } 50% { box-shadow: 0 0 0 16px rgba(232,96,138,0); } }
      `}</style>
      <div style={welcomeStyles.blob1} />
      <div style={welcomeStyles.blob2} />
      <div style={welcomeStyles.card}>
        <div style={welcomeStyles.flowerRow}>
          {["🌸", "🌺", "🌼", "🌸", "🌺", "🌼", "🌸"].map((f, i) => (
            <span key={i} style={{ fontSize: "28px", display: "inline-block", animation: `flowerBounce 2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>{f}</span>
          ))}
        </div>
        <div style={welcomeStyles.badge}>✦ 8th March ✦</div>
        <h1 style={welcomeStyles.title}>
          Happy Women's<br />
          <em style={{ color: "#E8608A" }}>Day!</em>
        </h1>
        <div style={welcomeStyles.nameRow}>
          <span style={{ color: "#b09090" }}>Welcome, </span>
          <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "22px" }}>{user?.name} 🎉</span>
        </div>
        <p style={welcomeStyles.message}>
          Today we celebrate your strength, your dreams, and your brilliance.
          <br /><br />
          You're about to create a <strong>Vision Board</strong> that's uniquely yours —
          powered by AI, inspired by <em>you.</em>
        </p>
        <div style={welcomeStyles.attemptsRow}>
          <div style={welcomeStyles.attemptsBox}>
            <span style={welcomeStyles.attemptsNum}>{user?.attempts_remaining}</span>
            <span style={welcomeStyles.attemptsLabel}>Attempts Available</span>
          </div>
          <div style={welcomeStyles.attemptsBox}>
            <span style={welcomeStyles.attemptsNum}>9</span>
            <span style={welcomeStyles.attemptsLabel}>Images Per Board</span>
          </div>
        </div>
        <button onClick={onContinue} style={welcomeStyles.btn}>
          Create My Vision Board 🌸
        </button>
        <p style={{ color: "#ddc0c8", fontSize: "13px", letterSpacing: "0.1em" }}>✦ You inspire us every day ✦</p>
      </div>
    </div>
  );
}

const welcomeStyles = {
  page: { minHeight: "100vh", background: "linear-gradient(160deg,#fff8f5 0%,#ffeef5 50%,#fff5ee 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Nunito',sans-serif", position: "relative", overflow: "hidden", padding: "40px 20px" },
  blob1: { position: "fixed", top: "-150px", right: "-150px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,#FF6B9D15,transparent 70%)", pointerEvents: "none" },
  blob2: { position: "fixed", bottom: "-200px", left: "-150px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle,#F4A26115,transparent 70%)", pointerEvents: "none" },
  card: { background: "#fff", borderRadius: "32px", padding: "48px 48px 40px", maxWidth: "560px", width: "100%", boxShadow: "0 24px 64px rgba(232,96,138,0.12)", textAlign: "center", animation: "fadeUp 0.8s ease forwards", position: "relative", zIndex: 1 },
  flowerRow: { display: "flex", gap: "10px", justifyContent: "center", marginBottom: "28px" },
  badge: { display: "inline-block", background: "linear-gradient(135deg,#FF6B9D20,#F4A26120)", border: "1px solid #FF6B9D40", color: "#E8608A", borderRadius: "100px", padding: "6px 20px", fontSize: "12px", letterSpacing: "0.12em", fontWeight: 700, marginBottom: "20px" },
  title: { fontFamily: "'Playfair Display',serif", fontSize: "clamp(40px,6vw,60px)", fontWeight: 700, lineHeight: 1.1, color: "#2d1f1f", marginBottom: "20px" },
  nameRow: { marginBottom: "24px", fontSize: "20px" },
  message: { color: "#8a7070", fontSize: "15px", lineHeight: 1.8, marginBottom: "32px" },
  btn: { display: "block", width: "100%", background: "linear-gradient(135deg,#FF6B9D,#E8608A)", color: "#fff", border: "none", borderRadius: "16px", padding: "18px", fontSize: "16px", fontWeight: 700, fontFamily: "'Nunito',sans-serif", cursor: "pointer", marginBottom: "20px", boxShadow: "0 6px 20px rgba(232,96,138,0.35)", animation: "pulse 2.5s ease-in-out infinite" },
  attemptsRow: { display: "flex", gap: "16px", justifyContent: "center", marginBottom: "36px" },
  attemptsBox: { flex: 1, background: "#fff5f8", border: "1px solid #ffd6e4", borderRadius: "16px", padding: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" },
  attemptsNum: { fontFamily: "'Playfair Display',serif", fontSize: "40px", color: "#E8608A", lineHeight: 1 },
  attemptsLabel: { color: "#b09090", fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em" },
};

// ─── MAIN APP ───
export default function App() {
  const [page, setPage] = useState(PAGES.LOGIN);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    const savedUser = getUser();
    if (token && savedUser) {
      setUser(savedUser);
      setPage(savedUser.is_first_login ? PAGES.CHANGE_PASSWORD : PAGES.WELCOME);
    }
  }, []);

  const handleLogin = async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Login failed");
    saveSession(data.access_token, data.user);
    setUser(data.user);
    setPage(data.user.is_first_login ? PAGES.CHANGE_PASSWORD : PAGES.WELCOME);
  };

  const handlePasswordChanged = async (currentPassword, newPassword) => {
    const token = getToken();
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Failed to change password");
    const updatedUser = { ...user, is_first_login: false };
    saveSession(token, updatedUser);
    setUser(updatedUser);
    setPage(PAGES.WELCOME);
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    setPage(PAGES.LOGIN);
  };

  if (page === PAGES.LOGIN) return <LoginPage onLogin={handleLogin} />;
  if (page === PAGES.CHANGE_PASSWORD) return <ChangePasswordPage userEmail={user?.email} onPasswordChanged={handlePasswordChanged} />;
  if (page === PAGES.WELCOME) return <WelcomePage user={user} onContinue={() => setPage(PAGES.FORM)} />;
  if (page === PAGES.FORM) return <VisionBoardForm user={user} onLogout={handleLogout} onAttemptsUpdate={(remaining) => setUser((prev) => ({ ...prev, attempts_remaining: remaining }))} />;
  return null;
}