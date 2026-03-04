import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(null);

  const handleSubmit = async () => {
  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }
  setError("");
  setLoading(true);
  try {
    await onLogin(email, password);
  } catch (err) {
    setError(err.message || "Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.page}>
      <style>{globalStyles}</style>

      {/* Floating petals */}
      {petals.map((p, i) => (
        <div key={i} style={{ ...styles.petal, ...p }}>{p.char}</div>
      ))}

      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.leftInner}>
          <div style={styles.logoMark}>✦</div>
          <h1 style={styles.heroTitle}>
            Happy<br />
            <em>Women's</em><br />
            Day
          </h1>
          <p style={styles.heroSubtitle}>
            You are bold. You are brilliant.<br />
            Today, we celebrate <em>you.</em>
          </p>
          <div style={styles.flowerRow}>
            {["🌸", "🌺", "🌼", "🌸", "🌺"].map((f, i) => (
              <span key={i} style={{ ...styles.flower, animationDelay: `${i * 0.3}s` }}>{f}</span>
            ))}
          </div>
          <div style={styles.tagline}>
            ✦ Create your Vision Board ✦
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>
          {/* Card top accent */}
          <div style={styles.cardAccent} />

          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Welcome Back</h2>
            <p style={styles.formSubtitle}>Sign in to create your vision board</p>
          </div>

          {/* Email Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={{
              ...styles.inputWrapper,
              boxShadow: focused === "email" ? "0 0 0 2px #E8608A60" : "none",
              borderColor: focused === "email" ? "#E8608A" : "#e8ddd5",
            }}>
              <span style={styles.inputIcon}>✉</span>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                style={styles.input}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <div style={{
              ...styles.inputWrapper,
              boxShadow: focused === "password" ? "0 0 0 2px #E8608A60" : "none",
              borderColor: focused === "password" ? "#E8608A" : "#e8ddd5",
            }}>
              <span style={styles.inputIcon}>◈</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={styles.input}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={styles.errorBox}>
              ⚠ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.8 : 1,
              transform: loading ? "scale(0.98)" : "scale(1)",
            }}
          >
            {loading ? (
              <span style={styles.loadingRow}>
                <span style={styles.spinner} />
                Signing in...
              </span>
            ) : (
              <span>Sign In ✦</span>
            )}
          </button>

          {/* Footer note */}
          <p style={styles.footerNote}>
            Don't have an account? Contact Rahul.
          </p>

          {/* Decorative bottom */}
          <div style={styles.cardBottom}>
            {["🌸", "✦", "🌺", "✦", "🌼"].map((s, i) => (
              <span key={i} style={styles.cardBottomSymbol}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const petals = [
  { top: "5%", left: "2%", char: "🌸", fontSize: "28px", animationDuration: "6s", animationDelay: "0s" },
  { top: "15%", left: "8%", char: "✦", fontSize: "18px", color: "#E8608A", animationDuration: "8s", animationDelay: "1s" },
  { top: "75%", left: "3%", char: "🌺", fontSize: "22px", animationDuration: "7s", animationDelay: "2s" },
  { top: "88%", left: "12%", char: "✦", fontSize: "14px", color: "#F4A261", animationDuration: "9s", animationDelay: "0.5s" },
  { top: "45%", left: "5%", char: "🌼", fontSize: "20px", animationDuration: "6.5s", animationDelay: "1.5s" },
];

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Nunito:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  input:focus { outline: none; }
  input::placeholder { color: #c4b8b0; }
  button { cursor: pointer; border: none; background: none; }

  @keyframes floatUp {
    0% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
    50% { transform: translateY(-20px) rotate(10deg); opacity: 1; }
    100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes flowerBounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-8px) scale(1.15); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "'Nunito', sans-serif",
    background: "#fff8f5",
    position: "relative",
    overflow: "hidden",
  },
  petal: {
    position: "fixed",
    animation: "floatUp var(--dur, 7s) ease-in-out infinite",
    pointerEvents: "none",
    zIndex: 0,
  },

  // Left Panel
  leftPanel: {
    flex: "1.1",
    background: "linear-gradient(160deg, #FF6B9D 0%, #E8608A 30%, #C84B6E 60%, #A33055 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 40px",
    position: "relative",
    overflow: "hidden",
  },
  leftInner: {
    position: "relative",
    zIndex: 1,
    animation: "fadeSlideIn 0.8s ease forwards",
  },
  logoMark: {
    fontSize: "32px",
    color: "rgba(255,255,255,0.5)",
    marginBottom: "32px",
    display: "block",
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(48px, 6vw, 80px)",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.05,
    marginBottom: "28px",
  },
  heroSubtitle: {
    fontSize: "17px",
    color: "rgba(255,255,255,0.85)",
    lineHeight: 1.7,
    marginBottom: "40px",
    fontWeight: 300,
  },
  flowerRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "40px",
  },
  flower: {
    fontSize: "28px",
    display: "inline-block",
    animation: "flowerBounce 2s ease-in-out infinite",
  },
  tagline: {
    display: "inline-block",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: "100px",
    fontSize: "13px",
    letterSpacing: "0.1em",
  },

  // Right Panel
  rightPanel: {
    flex: "0.9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 32px",
    background: "#fff8f5",
  },
  formCard: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    borderRadius: "28px",
    padding: "0 0 32px 0",
    boxShadow: "0 20px 60px rgba(232, 96, 138, 0.12), 0 4px 20px rgba(0,0,0,0.06)",
    overflow: "hidden",
    animation: "fadeSlideIn 0.8s ease 0.2s both",
    position: "relative",
  },
  cardAccent: {
    height: "6px",
    background: "linear-gradient(90deg, #FF6B9D, #E8608A, #F4A261, #FF6B9D)",
    backgroundSize: "200% auto",
    animation: "shimmer 3s linear infinite",
  },
  formHeader: {
    padding: "32px 36px 24px",
    borderBottom: "1px solid #fdf0ec",
  },
  formTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "28px",
    fontWeight: 700,
    color: "#2d1f1f",
    marginBottom: "6px",
  },
  formSubtitle: {
    color: "#b09090",
    fontSize: "14px",
  },
  fieldGroup: {
    padding: "20px 36px 0",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "#8a6060",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fdf8f6",
    border: "1.5px solid #e8ddd5",
    borderRadius: "12px",
    padding: "0 16px",
    transition: "all 0.2s ease",
  },
  inputIcon: {
    color: "#E8608A",
    fontSize: "16px",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    background: "none",
    border: "none",
    padding: "14px 0",
    fontSize: "15px",
    color: "#2d1f1f",
    fontFamily: "'Nunito', sans-serif",
  },
  eyeBtn: {
    fontSize: "16px",
    padding: "4px",
    cursor: "pointer",
    background: "none",
    border: "none",
  },
  errorBox: {
    margin: "16px 36px 0",
    background: "#fff0f3",
    border: "1px solid #ffcdd7",
    color: "#c84b6e",
    borderRadius: "10px",
    padding: "10px 16px",
    fontSize: "13px",
  },
  submitBtn: {
    display: "block",
    width: "calc(100% - 72px)",
    margin: "28px 36px 0",
    background: "linear-gradient(135deg, #FF6B9D, #E8608A)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    padding: "16px",
    fontSize: "16px",
    fontWeight: 600,
    fontFamily: "'Nunito', sans-serif",
    letterSpacing: "0.03em",
    transition: "all 0.2s ease",
    boxShadow: "0 6px 20px rgba(232, 96, 138, 0.35)",
    cursor: "pointer",
  },
  loadingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.4)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
  footerNote: {
    textAlign: "center",
    color: "#c4b0b0",
    fontSize: "12.5px",
    marginTop: "20px",
    padding: "0 36px",
  },
  cardBottom: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "28px",
    padding: "0 36px",
  },
  cardBottomSymbol: {
    fontSize: "16px",
    color: "#f4c4d0",
  },
};
