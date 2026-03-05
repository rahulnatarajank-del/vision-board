import { useState, useEffect } from "react";
import html2canvas from "html2canvas";

const questions = [
  {
    id: "skill",
    icon: "✦",
    label: "A skill you want to master",
    placeholder: "e.g. Public speaking, Machine learning, Painting...",
    color: "#FF6B9D",
  },
  {
    id: "role",
    icon: "♛",
    label: "A role or position you dream of",
    placeholder: "e.g. CTO, Entrepreneur, Lead Architect...",
    color: "#E8608A",
  },
  {
    id: "strengths",
    icon: "❋",
    label: "Your top strengths",
    placeholder: "e.g. Empathy, Problem-solving, Leadership...",
    color: "#F4A261",
  },
  {
    id: "values",
    icon: "◈",
    label: "What values drive you?",
    placeholder: "e.g. Integrity, Growth, Family, Balance...",
    color: "#FF6B9D",
  },
  {
    id: "place",
    icon: "⊕",
    label: "A place you dream of visiting or working from",
    placeholder: "e.g. Bali, Tokyo, a mountain cabin...",
    color: "#E8608A",
  },
  {
    id: "superpower",
    icon: "⚡",
    label: "A superpower you wish you had at work",
    placeholder: "e.g. Never-ending energy, Read minds, Infinite focus...",
    color: "#F4A261",
  },
  {
    id: "outside_work",
    icon: "✿",
    label: "Something you want to achieve outside of work",
    placeholder: "e.g. Run a marathon, Write a book, Travel 10 countries...",
    color: "#FF6B9D",
  },
  {
    id: "cause",
    icon: "♥",
    label: "A cause or mission close to your heart",
    placeholder: "e.g. Women in tech, Climate change, Mental health...",
    color: "#E8608A",
  },
  {
    id: "future_self",
    icon: "✉",
    label: "How do you want to feel in the future?",
    placeholder: "e.g. Confident, free, peaceful, successful and loved...",
    color: "#F4A261",
  },
];

export default function VisionBoardForm({ user, onLogout, onAttemptsUpdate }) {
  const [formData, setFormData] = useState({});
  const [activeField, setActiveField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [generatedBoard, setGeneratedBoard] = useState(null);

  useEffect(() => {
    if (generatedBoard) {
      window.scrollTo(0, 0);
    }
  }, [generatedBoard]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userName = user?.name?.split(" ")[0] || "You";
  const remainingAttempts = user?.attempts_remaining ?? 3;

  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const filledCount = Object.values(formData).filter((v) => v?.trim()).length;
  const progress = (filledCount / questions.length) * 100;

  const handleSubmit = async () => {
    if (filledCount !== questions.length) return;
    setSubmitted(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://vision-board-backend-9dx6.onrender.com/boards/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("Backend response:", data);

      if (!res.ok) throw new Error(data.detail || "Generation failed");

      if (!data) throw new Error("No data received from server");

      setGeneratedBoard(data);

      // ← ADD THIS DEBUG LINE
      console.log("Response from backend:", data);

      if (!res.ok) throw new Error(data.detail || "Generation failed");

      setGeneratedBoard(data);
      if (onAttemptsUpdate && data?.attempts_remaining !== undefined) {
        onAttemptsUpdate(data.attempts_remaining);
      }
    } catch (err) {
      setSubmitted(false);
      alert("Something went wrong: " + err.message);
    }
  };

  if (submitted && !generatedBoard) {
    return (
      <div style={styles.loadingPage}>
        <style>{globalStyles}</style>
        <div style={styles.blob1} />
        <div style={styles.blob2} />
        <div style={styles.loadingCard}>
          <div style={styles.loadingFlowers}>
            {["🌸", "🌺", "🌼", "🌸", "🌺"].map((f, i) => (
              <span
                key={i}
                style={{
                  fontSize: "28px",
                  display: "inline-block",
                  animation: "flowerBounce 2s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {f}
              </span>
            ))}
          </div>
          <div style={styles.loadingIconCircle}>✦</div>
          <h2 style={styles.loadingTitle}>Creating Your Vision Board</h2>
          <p style={styles.loadingSubtitle}>
            Crafting <strong>{userName}'s Vision Board</strong> just for you...
            <br />This may take a moment 🌸
          </p>
          <div style={styles.loadingDots}>
            <span style={{ ...styles.dot, animationDelay: "0s" }} />
            <span style={{ ...styles.dot, animationDelay: "0.2s" }} />
            <span style={{ ...styles.dot, animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    );
  }

  if (generatedBoard) {
    return (
      <div style={styles.page}>
        <style>{globalStyles}</style>
        <div style={styles.topBanner}>
          <span style={styles.bannerText}>
            🌸 Happy Women's Day &nbsp;✦&nbsp; Your Vision Board is Ready! 🌺
          </span>
        </div>

        <div style={{ padding: "40px", textAlign: "center" }}>
          {/* Title */}
          <div style={styles.greetingBadge}>✦ Your Vision Board is Ready!</div>
          <h1 style={{ ...styles.userName, textAlign: "center", marginTop: "16px" }}>
            <em style={styles.nameHighlight}>{generatedBoard.title}</em>
          </h1>
          <p style={{ color: "#b09090", marginBottom: "40px", fontSize: "15px" }}>
            Remaining attempts: <strong style={{ color: "#E8608A" }}>{generatedBoard?.attempts_remaining ?? remainingAttempts}</strong>
          </p>

          {/* Vision Board Image */}
          <div id="vision-board-grid" style={{
            maxWidth: "780px",
            margin: "0 auto 40px",
            background: "#fff",
            padding: "24px",
            borderRadius: "24px",
            boxShadow: "0 8px 40px rgba(232,96,138,0.12)",
          }}>
            <img
              src={generatedBoard.image_urls[0]}
              alt={generatedBoard.title}
              crossOrigin="anonymous"
              style={{
                width: "100%",
                borderRadius: "16px",
                display: "block",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            {generatedBoard?.attempts_remaining > 0 ? (
              <button
                onClick={() => {
                  setSubmitted(false);
                  setGeneratedBoard(null);
                  setFormData({});
                  window.scrollTo(0, 0);
                }}
                style={{
                  background: "none", border: "1.5px solid #fde8f0",
                  color: "#E8608A", borderRadius: "100px",
                  padding: "14px 32px", fontSize: "14px",
                  fontWeight: 700, cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                🌸 Generate New
              </button>
            ) : (
              <div style={{
                background: "#fff5f8", border: "1px solid #ffd6e4",
                borderRadius: "16px", padding: "16px 32px",
                textAlign: "center",
              }}>
                <p style={{ color: "#E8608A", fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>
                  🌸 All attempts completed!
                </p>
                <p style={{ color: "#b09090", fontSize: "13px" }}>
                  You can still download your vision board below.
                </p>
              </div>
            )}
            <button
              onClick={async () => {
                const el = document.getElementById("vision-board-grid");
                const canvas = await html2canvas(el, { useCORS: true, scale: 2 });
                const link = document.createElement("a");
                link.download = `${generatedBoard.title}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
              }}
              style={{
                background: "linear-gradient(135deg, #FF6B9D, #E8608A)",
                border: "none", color: "#fff", borderRadius: "100px",
                padding: "14px 32px", fontSize: "14px",
                fontWeight: 700, cursor: "pointer",
                fontFamily: "'Nunito', sans-serif",
                boxShadow: "0 6px 20px rgba(232,96,138,0.35)",
              }}
            >
              ⬇ Download Vision Board
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <style>{globalStyles}</style>

      {/* Background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* Top Banner */}
      <div style={styles.topBanner}>
        <span style={styles.bannerText}>
          🌸 Happy Women's Day &nbsp;✦&nbsp; Create your Vision Board &nbsp;✦&nbsp; You are bold, brilliant & unstoppable 🌺
        </span>
      </div>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.greetingBadge}>🌸 Happy Women's Day</div>
          <h1 style={styles.userName}>
            Hello, <em style={styles.nameHighlight}>{userName}</em> 👋
          </h1>
          <p style={styles.headerSubtitle}>
            Fill in your vision board — each answer becomes a beautiful AI-generated image just for you.
          </p>
        </div>

        {/* Attempts Card */}
        <div style={styles.attemptsCard}>
          <div style={styles.attemptsNumber}>{remainingAttempts}</div>
          <div style={styles.attemptsLabel}>Attempts<br />Remaining</div>
          <div style={styles.attemptsBar}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.attemptDot,
                  background: i < remainingAttempts
                    ? "linear-gradient(135deg, #FF6B9D, #F4A261)"
                    : "#f0e6e0",
                }}
              />
            ))}
          </div>
        </div>

        {/* Logout */}
        {onLogout && (
          <button onClick={onLogout} style={styles.logoutBtn}>
            Sign Out
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div style={styles.progressContainer}>
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${progress}%` }} />
        </div>
        <span style={styles.progressText}>{filledCount} of {questions.length} filled</span>
      </div>

      {/* Board Title Preview */}
      <div style={styles.boardTitlePreview}>
        <span style={styles.boardTitleText}>✦ {user?.name}'s Vision Board ✦</span>
      </div>

      {/* Form Grid */}
      <div style={styles.formGrid}>
        {questions.map((q, index) => {
          const isFilled = formData[q.id]?.trim();
          const isActive = activeField === q.id;
          return (
            <div
              key={q.id}
              style={{
                ...styles.fieldCard,
                borderColor: isActive ? q.color : isFilled ? q.color + "80" : "#fde8f0",
                boxShadow: isActive
                  ? `0 0 0 2px ${q.color}30, 0 8px 32px ${q.color}15`
                  : isFilled
                    ? `0 4px 20px ${q.color}15`
                    : "0 2px 12px rgba(232,96,138,0.06)",
              }}
            >
              <div style={styles.fieldHeader}>
                <span style={{ ...styles.fieldIcon, color: q.color }}>{q.icon}</span>
                <span style={{ ...styles.fieldNumber, color: q.color + "60" }}>0{index + 1}</span>
              </div>
              <label style={styles.fieldLabel}>{q.label}</label>
              <textarea
                style={{
                  ...styles.textarea,
                  borderColor: isActive ? q.color + "60" : "#fde8f0",
                }}
                placeholder={q.placeholder}
                value={formData[q.id] || ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
                onFocus={() => setActiveField(q.id)}
                onBlur={() => setActiveField(null)}
                rows={3}
              />
              {isFilled && (
                <div style={{ ...styles.filledBadge, background: q.color + "15", color: q.color }}>
                  ✓ Ready
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", padding: "0 40px 40px" }}>
        {remainingAttempts > 0 ? (
          <>
            <button
              style={{
                ...styles.submitBtn,
                opacity: filledCount === questions.length ? 1 : 0.5,
                cursor: filledCount === questions.length ? "pointer" : "not-allowed",
              }}
              onClick={handleSubmit}
              disabled={filledCount !== questions.length}
            >
              🌸 Generate My Vision Board 🌸
            </button>
            <p style={styles.submitNote}>
              This will use 1 of your {remainingAttempts} remaining attempts
            </p>
          </>
        ) : (
          <div style={{
            background: "#fff5f8",
            border: "1px solid #ffd6e4",
            borderRadius: "16px",
            padding: "24px 32px",
            textAlign: "center",
            maxWidth: "400px",
            margin: "0 auto",
          }}>
            <p style={{ fontSize: "32px", marginBottom: "12px" }}>🌸</p>
            <p style={{ color: "#E8608A", fontWeight: 700, fontSize: "16px", marginBottom: "8px" }}>
              All attempts completed!
            </p>
            <p style={{ color: "#b09090", fontSize: "13px", lineHeight: 1.6 }}>
              You have used all 3 of your attempts. Thank you for participating in our Women's Day Vision Board! 🌺
            </p>
          </div>
        )}
      </div>
    </div >
  );
}

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Nunito:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #fff8f5; }
  textarea:focus { outline: none; }
  textarea::placeholder { color: #d4b8c0; }
  textarea { resize: none; font-family: 'Nunito', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes flowerBounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-10px) scale(1.2); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes bannerScroll {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  @keyframes bounceDot {
    0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
    40% { transform: scale(1); opacity: 1; }
  }
`;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #fff8f5 0%, #ffeef5 50%, #fff5ee 100%)",
    fontFamily: "'Nunito', sans-serif",
    paddingBottom: "80px",
  },
  loadingPage: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #fff8f5 0%, #ffeef5 50%, #fff5ee 100%)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Nunito', sans-serif",
    position: "relative", overflow: "hidden",
  },
  blob1: {
    position: "fixed", top: "-150px", right: "-150px",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, #FF6B9D12, transparent 70%)",
    pointerEvents: "none",
  },
  blob2: {
    position: "fixed", bottom: "-200px", left: "-150px",
    width: "600px", height: "600px", borderRadius: "50%",
    background: "radial-gradient(circle, #F4A26112, transparent 70%)",
    pointerEvents: "none",
  },
  topBanner: {
    background: "linear-gradient(90deg, #FF6B9D, #E8608A, #F4A261)",
    padding: "10px 0", overflow: "hidden", whiteSpace: "nowrap",
  },
  bannerText: {
    display: "inline-block", color: "#fff",
    fontSize: "13px", letterSpacing: "0.08em", fontWeight: 600,
    padding: "0 40px",
    animation: "bannerScroll 22s linear infinite",
  },
  header: {
    display: "flex", alignItems: "flex-start",
    justifyContent: "space-between", flexWrap: "wrap",
    gap: "20px", padding: "40px 40px 20px",
    animation: "fadeUp 0.6s ease forwards",
  },
  headerLeft: { flex: 1 },
  greetingBadge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #FF6B9D20, #F4A26120)",
    border: "1px solid #FF6B9D40",
    color: "#E8608A", padding: "6px 16px",
    borderRadius: "100px", fontSize: "13px",
    letterSpacing: "0.05em", marginBottom: "16px",
  },
  userName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(28px, 4vw, 46px)",
    fontWeight: 700, lineHeight: 1.1,
    color: "#2d1f1f", marginBottom: "10px",
  },
  nameHighlight: { color: "#E8608A" },
  headerSubtitle: {
    color: "#b09090", fontSize: "15px",
    lineHeight: 1.6, maxWidth: "480px",
  },
  attemptsCard: {
    background: "#fff",
    border: "1.5px solid #fde8f0",
    borderRadius: "20px", padding: "20px 28px",
    textAlign: "center", minWidth: "150px",
    boxShadow: "0 4px 20px rgba(232,96,138,0.1)",
  },
  attemptsNumber: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "56px", fontWeight: 700,
    color: "#E8608A", lineHeight: 1,
  },
  attemptsLabel: {
    color: "#c4a0a8", fontSize: "12px",
    letterSpacing: "0.08em", textTransform: "uppercase",
    marginTop: "4px", lineHeight: 1.5,
  },
  attemptsBar: {
    display: "flex", gap: "6px",
    justifyContent: "center", marginTop: "14px",
  },
  attemptDot: {
    width: "10px", height: "10px",
    borderRadius: "50%", transition: "background 0.3s ease",
  },
  logoutBtn: {
    background: "none", border: "1.5px solid #fde8f0",
    color: "#c4a0a8", borderRadius: "10px",
    padding: "8px 18px", fontSize: "13px",
    cursor: "pointer", fontFamily: "'Nunito', sans-serif",
    alignSelf: "flex-start", marginTop: "8px",
    transition: "all 0.2s ease",
  },
  progressContainer: {
    display: "flex", alignItems: "center", gap: "16px",
    padding: "0 40px 20px",
  },
  progressTrack: {
    flex: 1, height: "4px",
    background: "#fde8f0", borderRadius: "100px", overflow: "hidden",
  },
  progressFill: {
    height: "100%", borderRadius: "100px",
    background: "linear-gradient(90deg, #FF6B9D, #F4A261)",
    transition: "width 0.4s ease",
  },
  progressText: {
    color: "#c4a0a8", fontSize: "12px",
    whiteSpace: "nowrap", letterSpacing: "0.05em",
  },
  boardTitlePreview: {
    textAlign: "center", padding: "0 40px 40px",
  },
  boardTitleText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(18px, 2.5vw, 26px)",
    color: "#E8608A", letterSpacing: "0.12em", fontStyle: "italic",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px", padding: "0 40px 40px",
  },
  fieldCard: {
    background: "#ffffff",
    border: "1.5px solid #fde8f0",
    borderRadius: "20px", padding: "24px",
    transition: "all 0.3s ease",
  },
  fieldHeader: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: "12px",
  },
  fieldIcon: { fontSize: "20px" },
  fieldNumber: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "20px",
  },
  fieldLabel: {
    display: "block", fontSize: "14px",
    fontWeight: 600, color: "#6d4c55",
    marginBottom: "12px", lineHeight: 1.4,
  },
  textarea: {
    width: "100%",
    background: "linear-gradient(135deg, #fff8f5, #fff5f8)",
    border: "1.5px solid #fde8f0",
    borderRadius: "12px", color: "#2d1f1f",
    fontSize: "14px", padding: "12px 14px",
    lineHeight: 1.6, transition: "border-color 0.2s ease",
  },
  filledBadge: {
    display: "inline-block", marginTop: "10px",
    padding: "3px 12px", borderRadius: "100px",
    fontSize: "11px", letterSpacing: "0.05em", fontWeight: 700,
  },
  submitContainer: {
    textAlign: "center",
    padding: "0 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  submitHint: {
    color: "#c4a0a8", fontSize: "13px", marginBottom: "16px",
  },
  submitBtn: {
    display: "inline-block",
    background: "linear-gradient(135deg, #FF6B9D, #E8608A)",
    color: "#fff",
    border: "none",
    padding: "18px 56px",
    borderRadius: "100px",
    fontSize: "16px",
    fontWeight: 700,
    fontFamily: "'Nunito', sans-serif",
    letterSpacing: "0.03em",
    boxShadow: "0 6px 24px rgba(232,96,138,0.35)",
    transition: "all 0.2s ease",
    width: "auto",
    maxWidth: "400px",
  },
  submitNote: {
    color: "#c4a0a8", fontSize: "12px", marginTop: "14px",
  },
  loadingCard: {
    background: "#fff", borderRadius: "32px",
    padding: "56px 48px", maxWidth: "480px", width: "100%",
    textAlign: "center",
    boxShadow: "0 24px 64px rgba(232,96,138,0.12)",
    position: "relative", zIndex: 1,
    animation: "fadeUp 0.8s ease forwards",
  },
  loadingFlowers: {
    display: "flex", gap: "10px",
    justifyContent: "center", marginBottom: "28px",
  },
  loadingIconCircle: {
    fontSize: "40px", color: "#E8608A",
    marginBottom: "20px",
  },
  loadingTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "28px", fontWeight: 700,
    color: "#2d1f1f", marginBottom: "14px",
  },
  loadingSubtitle: {
    color: "#b09090", fontSize: "15px",
    lineHeight: 1.7, marginBottom: "36px",
  },
  loadingDots: {
    display: "flex", gap: "10px", justifyContent: "center",
  },
  dot: {
    width: "12px", height: "12px", borderRadius: "50%",
    background: "#E8608A", display: "inline-block",
    animation: "bounceDot 1.4s infinite ease-in-out",
  },
};