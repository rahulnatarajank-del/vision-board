import { useState } from "react";

export default function ChangePasswordPage({ onPasswordChanged, userEmail }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(null);

  const passwordRules = [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
    { label: "One number", test: (p) => /[0-9]/.test(p) },
    { label: "One special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
  ];

  const allRulesPassed = passwordRules.every((r) => r.test(newPassword));
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  const handleSubmit = async () => {
    setError("");
    if (!currentPassword) return setError("Please enter your current password.");
    if (!allRulesPassed) return setError("New password does not meet all requirements.");
    if (!passwordsMatch) return setError("Passwords do not match.");
    setLoading(true);
    try {
      await onPasswordChanged(currentPassword, newPassword);
    } catch (err) {
      setError(err.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <style>{globalStyles}</style>

      {floaters.map((f, i) => (
        <div key={i} style={{ ...styles.floater, ...f }}>{f.char}</div>
      ))}

      {/* Top Banner */}
      <div style={styles.topBanner}>
        <span style={styles.bannerText}>🌸 Women's Day Vision Board &nbsp;✦&nbsp; One last step before you begin! 🌺</span>
      </div>

      {/* Main Card */}
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.cardRainbow} />

          <div style={styles.iconCircle}>🔐</div>

          <h1 style={styles.title}>Set Your Password</h1>
          <p style={styles.subtitle}>
            This is your first login! Please set a new personal password to secure your account.
          </p>

          {userEmail && (
            <div style={styles.emailBadge}>✉ {userEmail}</div>
          )}

          {/* Current Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Current (Temporary) Password</label>
            <div style={{
              ...styles.inputWrapper,
              borderColor: focused === "current" ? "#E8608A" : "#f0e6e0",
              boxShadow: focused === "current" ? "0 0 0 3px #E8608A20" : "none",
            }}>
              <span style={styles.icon}>🔑</span>
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter temporary password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                onFocus={() => setFocused("current")}
                onBlur={() => setFocused(null)}
                style={styles.input}
              />
              <button onClick={() => setShowCurrent(!showCurrent)} style={styles.eyeBtn}>
                {showCurrent ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>New Password</label>
            <div style={{
              ...styles.inputWrapper,
              borderColor: focused === "new" ? "#E8608A" : "#f0e6e0",
              boxShadow: focused === "new" ? "0 0 0 3px #E8608A20" : "none",
            }}>
              <span style={styles.icon}>✦</span>
              <input
                type={showNew ? "text" : "password"}
                placeholder="Create a strong password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={() => setFocused("new")}
                onBlur={() => setFocused(null)}
                style={styles.input}
              />
              <button onClick={() => setShowNew(!showNew)} style={styles.eyeBtn}>
                {showNew ? "🙈" : "👁"}
              </button>
            </div>

            {/* Password Rules */}
            {newPassword.length > 0 && (
              <div style={styles.rulesBox}>
                {passwordRules.map((rule, i) => {
                  const passed = rule.test(newPassword);
                  return (
                    <div key={i} style={styles.ruleRow}>
                      <span style={{ ...styles.ruleDot, background: passed ? "#4CAF50" : "#e0d0cc" }} />
                      <span style={{ ...styles.ruleText, color: passed ? "#4CAF50" : "#b09090" }}>
                        {rule.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Confirm New Password</label>
            <div style={{
              ...styles.inputWrapper,
              borderColor: confirmPassword
                ? passwordsMatch ? "#4CAF50" : "#E8608A"
                : focused === "confirm" ? "#E8608A" : "#f0e6e0",
              boxShadow: focused === "confirm" ? "0 0 0 3px #E8608A20" : "none",
            }}>
              <span style={styles.icon}>✓</span>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFocused("confirm")}
                onBlur={() => setFocused(null)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={styles.input}
              />
              <button onClick={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                {showConfirm ? "🙈" : "👁"}
              </button>
            </div>
            {confirmPassword && (
              <p style={{ ...styles.matchNote, color: passwordsMatch ? "#4CAF50" : "#E8608A" }}>
                {passwordsMatch ? "✓ Passwords match!" : "✗ Passwords do not match"}
              </p>
            )}
          </div>

          {error && <div style={styles.errorBox}>⚠ {error}</div>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ ...styles.submitBtn, opacity: loading ? 0.85 : 1 }}
          >
            {loading ? (
              <span style={styles.loadingRow}>
                <span style={styles.spinner} /> Setting password...
              </span>
            ) : (
              "Set Password & Continue 🌸"
            )}
          </button>

          <p style={styles.footerNote}>
            After setting your password you'll be taken to your Women's Day Vision Board ✦
          </p>
        </div>
      </div>
    </div>
  );
}

const floaters = [
  { top: "8%", left: "3%", char: "🌸", fontSize: "32px", animationDuration: "6s" },
  { top: "20%", right: "4%", char: "✦", fontSize: "20px", color: "#E8608A", animationDuration: "8s", animationDelay: "1s" },
  { top: "60%", left: "2%", char: "🌺", fontSize: "26px", animationDuration: "7s", animationDelay: "2s" },
  { top: "80%", right: "3%", char: "🌼", fontSize: "24px", animationDuration: "6.5s", animationDelay: "0.5s" },
  { top: "45%", right: "2%", char: "✦", fontSize: "14px", color: "#F4A261", animationDuration: "9s", animationDelay: "1.5s" },
];

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  input:focus { outline: none; }
  input::placeholder { color: #c4b0b0; }
  button { cursor: pointer; border: none; background: none; }
  @keyframes floatUp {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
    50% { transform: translateY(-18px) rotate(8deg); opacity: 1; }
  }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes bannerScroll {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
`;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #fff8f5 0%, #ffeef5 50%, #fff5ee 100%)",
    fontFamily: "'Nunito', sans-serif",
    position: "relative", overflow: "hidden", paddingBottom: "60px",
  },
  floater: {
    position: "fixed",
    animation: "floatUp var(--dur, 7s) ease-in-out infinite",
    pointerEvents: "none", zIndex: 0,
  },
  topBanner: {
    background: "linear-gradient(90deg, #FF6B9D, #E8608A, #F4A261)",
    padding: "10px 0", overflow: "hidden", whiteSpace: "nowrap",
  },
  bannerText: {
    display: "inline-block", color: "#fff",
    fontSize: "13px", letterSpacing: "0.08em", fontWeight: 600,
    padding: "0 40px",
    animation: "bannerScroll 18s linear infinite",
  },
  container: {
    display: "flex", justifyContent: "center", alignItems: "center",
    minHeight: "calc(100vh - 44px)", padding: "40px 20px",
    position: "relative", zIndex: 1,
  },
  card: {
    background: "#ffffff", borderRadius: "32px",
    padding: "0 0 40px 0", width: "100%", maxWidth: "480px",
    boxShadow: "0 24px 64px rgba(232,96,138,0.14), 0 4px 24px rgba(0,0,0,0.06)",
    overflow: "hidden", animation: "fadeSlideIn 0.7s ease forwards",
  },
  cardRainbow: {
    height: "7px",
    background: "linear-gradient(90deg, #FF6B9D, #FFB347, #FFD700, #90EE90, #87CEEB, #D4A5C9, #FF6B9D)",
    backgroundSize: "200% auto", animation: "shimmer 4s linear infinite",
  },
  iconCircle: {
    width: "72px", height: "72px",
    background: "linear-gradient(135deg, #fff0f5, #ffe4f0)",
    borderRadius: "50%", display: "flex",
    alignItems: "center", justifyContent: "center",
    fontSize: "32px", margin: "32px auto 20px",
    boxShadow: "0 4px 16px rgba(232,96,138,0.15)",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "28px", fontWeight: 700,
    color: "#2d1f1f", textAlign: "center", marginBottom: "10px",
  },
  subtitle: {
    color: "#b09090", fontSize: "14px", textAlign: "center",
    lineHeight: 1.6, padding: "0 36px", marginBottom: "20px",
  },
  emailBadge: {
    display: "block", margin: "0 36px 24px",
    background: "#fff5f8", border: "1px solid #ffd6e4",
    color: "#E8608A", borderRadius: "10px",
    padding: "10px 16px", fontSize: "13px", textAlign: "center",
  },
  fieldGroup: { padding: "0 36px 20px" },
  label: {
    display: "block", fontSize: "12px", fontWeight: 700,
    color: "#8a6060", letterSpacing: "0.07em",
    textTransform: "uppercase", marginBottom: "8px",
  },
  inputWrapper: {
    display: "flex", alignItems: "center", gap: "10px",
    background: "#fdf8f6", border: "1.5px solid #f0e6e0",
    borderRadius: "12px", padding: "0 14px", transition: "all 0.2s ease",
  },
  icon: { fontSize: "16px", flexShrink: 0 },
  input: {
    flex: 1, background: "none", border: "none",
    padding: "14px 0", fontSize: "15px",
    color: "#2d1f1f", fontFamily: "'Nunito', sans-serif",
  },
  eyeBtn: { fontSize: "16px", padding: "4px", flexShrink: 0 },
  rulesBox: {
    marginTop: "12px", background: "#fdf8f6",
    borderRadius: "10px", padding: "12px 16px",
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px",
  },
  ruleRow: { display: "flex", alignItems: "center", gap: "7px" },
  ruleDot: { width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0, transition: "background 0.3s ease" },
  ruleText: { fontSize: "12px", transition: "color 0.3s ease" },
  matchNote: { fontSize: "12px", marginTop: "8px", paddingLeft: "4px", transition: "color 0.3s ease" },
  errorBox: {
    margin: "0 36px 16px", background: "#fff0f3",
    border: "1px solid #ffcdd7", color: "#c84b6e",
    borderRadius: "10px", padding: "10px 16px", fontSize: "13px",
  },
  submitBtn: {
    display: "block", width: "calc(100% - 72px)",
    margin: "8px 36px 0",
    background: "linear-gradient(135deg, #FF6B9D, #E8608A)",
    color: "#fff", border: "none", borderRadius: "14px",
    padding: "16px", fontSize: "15px", fontWeight: 700,
    fontFamily: "'Nunito', sans-serif", letterSpacing: "0.02em",
    cursor: "pointer", boxShadow: "0 6px 20px rgba(232,96,138,0.35)",
    transition: "all 0.2s ease",
  },
  loadingRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" },
  spinner: {
    width: "16px", height: "16px",
    border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff",
    borderRadius: "50%", display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
  footerNote: {
    textAlign: "center", color: "#c4b0b0",
    fontSize: "12px", marginTop: "20px",
    padding: "0 36px", lineHeight: 1.6,
  },
};