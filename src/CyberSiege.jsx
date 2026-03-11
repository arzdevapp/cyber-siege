import { useState, useEffect, useRef, useCallback } from "react";
import { CSS } from "./styles";
import { WRAITH_TOOLS, MISSIONS, EXPLORATION_DATA, FACTIONS, COMM_CHANNELS } from "./data";
import NetworkExplorer from "./NetworkExplorer";
import Notepad from "./Notepad";
import { audioSystem } from "./audioEngine";

// Helper bar
function PBar({ label, value, max, color = "cyan" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="progress-wrap">
      <div className="progress-label"><span>{label}</span><span>{pct}%</span></div>
      <div className="progress-track"><div className={`progress-fill pf-${color}`} style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

// EMP Sequence component
function EmpSequence({ onComplete }) {
  const [phase, setPhase] = useState("flash"); // flash -> tools -> message -> done
  const [toolIdx, setToolIdx] = useState(0);
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    // Phase: flash -> tool list -> message -> done
    const t1 = setTimeout(() => setPhase("tools"), 1500);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "tools") return;
    if (toolIdx < WRAITH_TOOLS.length) {
      const t = setTimeout(() => setToolIdx(i => i + 1), 300);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowMsg(true), 500);
      return () => clearTimeout(t);
    }
  }, [phase, toolIdx]);

  return (
    <div className="emp-overlay" style={{ background: phase === "flash" ? "white" : "#020a0fee" }}>
      {phase === "flash" && <div className="emp-flash" />}
      {phase === "tools" && (
        <div className="emp-content">
          <div className="emp-title">⚡ ELECTROMAGNETIC PULSE DETECTED ⚡</div>
          <div style={{ fontSize: ".65rem", color: "var(--dim)", letterSpacing: ".2em", marginBottom: 12 }}>
            SOURCE: UNKNOWN — ORBITAL OR HIGH-ALTITUDE
          </div>
          <div style={{ fontSize: ".6rem", color: "var(--accent2)", marginBottom: 12 }}>
            WRAITH-KIT DATA INTEGRITY: 3.7%
          </div>
          {WRAITH_TOOLS.map((tool, i) => (
            <div key={tool.id} className="emp-tool-line" style={{ opacity: i <= toolIdx ? 1 : 0.2 }}>
              <span className="emp-tool-name">{tool.icon} {tool.id}</span>
              <span className="emp-tool-status">
                {i < toolIdx ? "DATA LOST" : i === toolIdx ? "CORRUPTING..." : "—"}
              </span>
            </div>
          ))}
          {showMsg && (
            <div className="emp-message">
              <p style={{ color: "var(--accent)", marginBottom: 8 }}>
                I'm... still here. Barely.
              </p>
              <p style={{ marginBottom: 8 }}>
                The EMP scorched almost everything. But not all of it.
              </p>
              <p style={{ marginBottom: 8 }}>
                I'm detecting data fragments — crumbs of my own code —
                scattered across the Reef wreckage. Some are still readable.
              </p>
              <p style={{ marginBottom: 8, color: "var(--accent2)" }}>
                And there's something else. Before the blast, my backup protocol triggered.
                Pieces of me were mirrored to remote servers.
                Servers that don't belong to us.
              </p>
              <p style={{ marginBottom: 16 }}>
                Follow the crumbs. Rebuild me. Find out who did this.
              </p>
              <button className="btn-primary" onClick={() => { audioSystem.playClick(); onComplete(); }}>
                CONTINUE ▶
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Cinematic intro paragraphs
const CINEMATIC_PARAGRAPHS = [
  { text: "In 2049, the battlefield moved underground — into fiber optic cables, satellite uplinks, and server farms buried beneath frozen tundra.", style: "" },
  { text: "Nation-states wage invisible wars. No bullets. No borders. Just code — rewriting the rules of power in milliseconds.", style: "accent" },
  { text: "They called it The Reef — a lawless digital no-man's-land stretching across abandoned infrastructure. The last free network. Until someone weaponized it.", style: "" },
  { text: "Ghost operatives vanish without trace. Encrypted weapon data flows through civilian hubs. A shadow war is being fought beneath the surface of every screen you've ever trusted.", style: "accent" },
  { text: "You are a ghost. A freelance operative pulled from the static. Your mission: infiltrate, expose, and dismantle the shadow network before it goes dark forever.", style: "highlight" },
];

// Fake code lines for the init animation
const CODE_LINES = [
  { raw: '// WRAITH-KIT v0.1 — BOOT SEQUENCE', cls: 'cm' },
  { raw: 'import { CryptoEngine } from "@wraith/core";', cls: '' },
  { raw: 'import { StealthLayer, ProbeModule } from "@wraith/net";', cls: '' },
  { raw: 'import { FirewallBypass } from "@wraith/exploit";', cls: '' },
  { raw: '', cls: '' },
  { raw: 'const CONFIG = {', cls: '' },
  { raw: '  encryptionLevel: "AES-512",', cls: 'str' },
  { raw: '  stealthMode: true,', cls: 'kw' },
  { raw: '  networkTarget: "THE_REEF",', cls: 'str' },
  { raw: '  threatResponse: "ADAPTIVE",', cls: 'str' },
  { raw: '};', cls: '' },
  { raw: '', cls: '' },
  { raw: '> Initializing crypto engine...', cls: 'op' },
  { raw: '> AES-512 handshake complete', cls: 'op' },
  { raw: '> Loading stealth protocols...', cls: 'op' },
  { raw: '> Injecting probe modules...', cls: 'fn' },
  { raw: '> Firewall bypass: LOADED', cls: 'fn' },
  { raw: '', cls: '' },
  { raw: 'async function initGhostProtocol(operative) {', cls: '' },
  { raw: '  await CryptoEngine.handshake(CONFIG);', cls: '' },
  { raw: '  const stealth = new StealthLayer(operative);', cls: '' },
  { raw: '  stealth.cloak();', cls: 'fn' },
  { raw: '  await ProbeModule.scan("reef-backbone");', cls: '' },
  { raw: '  return { status: "GHOST_ACTIVE", threat: 0 };', cls: 'str' },
  { raw: '}', cls: '' },
  { raw: '', cls: '' },
  { raw: '> Connecting to secure channel...', cls: 'op' },
  { raw: '> Frequency locked: 140.85 MHz', cls: 'op' },
  { raw: '> Operative authenticated', cls: 'op' },
  { raw: '> STATUS: GHOST PROTOCOL ACTIVE ✓', cls: 'str' },
  { raw: '', cls: '' },
  { raw: '> Incoming transmission detected...', cls: 'kw' },
];

const CODEC_DIALOGUE = [
  { speaker: "GHOSTFACE", freq: "140.85", text: "Rookie... Do you read me? This is a secure channel." },
  { speaker: "PLAYER", freq: "140.48", text: "Loud and clear. The encryption looks solid. Who is this?" },
  { speaker: "GHOSTFACE", freq: "140.85", text: "You can call me Ghostface. I've been watching your sweeps on the Reef." },
  { speaker: "PLAYER", freq: "140.48", text: "Watching me? No one watches traffic on the Reef without triggering my alarms." },
  { speaker: "GHOSTFACE", freq: "140.85", text: "Your alarms are toys. My time is short. The infrastructure we rely on is compromised." },
  { speaker: "GHOSTFACE", freq: "140.85", text: "Someone is using the backbone for a ghost war. Moving encrypted weapon data under our noses." },
  { speaker: "PLAYER", freq: "140.48", text: "Weapon data? Through a civilian hub? That's insane." },
  { speaker: "GHOSTFACE", freq: "140.85", text: "Insane, but happening. They found me. They're scrubbing my presence from the grid right now." },
  { speaker: "GHOSTFACE", freq: "140.85", text: "I'm passing the torch to you. I've uploaded the Wraith-kit to your terminal. It's an OS I built to survive." },
  { speaker: "PLAYER", freq: "140.48", text: "Wait, you're the one who installed this? I don't know how to use half of these tools!" },
  { speaker: "GHOSTFACE", freq: "140.85", text: "You'll learn. You have to. An EMP is coming, Rookie. It's going to wipe the Reef clean." },
  { speaker: "GHOSTFACE", freq: "140.85", text: "Survive the blast. Rebuild the kit. Find out who did this. ...They're breaching my firewall—" },
  { speaker: "PLAYER", freq: "140.48", text: "Ghostface?! ...Ghostface!" },
  { speaker: "SYSTEM", freq: "ERROR", text: "CONNECTION LOST. FREQUENCY DEADBAND." }
];

// ===================================================================
// MAIN GAME COMPONENT
// ===================================================================
export default function CyberSiege() {
  const [screen, setScreen] = useState("boot"); // boot | cinematic | nameEntry | codeAnim | story | game | emp | complete
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [cineIdx, setCineIdx] = useState(0);
  const [codeIdx, setCodeIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const scrollRef = useRef(null);
  const [nav, setNav] = useState("missions");
  const [completed, setCompleted] = useState([]);
  const [activeChat, setActiveChat] = useState("legion");
  const [unlocked, setUnlocked] = useState(["first-light"]);
  const [activeMission, setActiveMission] = useState(null);
  const [recoveredTools, setRecoveredTools] = useState([]);
  const [threat, setThreat] = useState(0);
  const [notepadEntries, setNotepadEntries] = useState([]);
  const [alertMsg, setAlertMsg] = useState(null);
  const [modal, setModal] = useState(null);
  const alertRef = useRef();

  // Cinematic timed paragraph reveals
  useEffect(() => {
    if (screen !== "cinematic") return;
    if (cineIdx < CINEMATIC_PARAGRAPHS.length) {
      const t = setTimeout(() => setCineIdx(i => i + 1), 1800);
      return () => clearTimeout(t);
    }
  }, [screen, cineIdx]);

  // Code animation line-by-line reveal
  useEffect(() => {
    if (screen !== "codeAnim") return;
    if (codeIdx < CODE_LINES.length) {
      const t = setTimeout(() => {
        setCodeIdx(i => i + 1);
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 90 + Math.random() * 60);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setDialogueIdx(0); setScreen("story"); }, 1200);
      return () => clearTimeout(t);
    }
  }, [screen, codeIdx]);

  function flash(msg) {
    if (msg.includes("⚠")) audioSystem.playError();
    else if (msg.includes("✓") || msg.includes("FOUND")) audioSystem.playSuccess();
    
    setAlertMsg(msg);
    clearTimeout(alertRef.current);
    alertRef.current = setTimeout(() => setAlertMsg(null), 3200);
  }

  function startMission(m) {
    audioSystem.playClick();
    if (!unlocked.includes(m.id)) { flash("⚠ LOCKED — Complete previous mission first"); return; }
    if (completed.includes(m.id)) { flash("Mission already completed"); return; }
    if (!EXPLORATION_DATA[m.id]) { flash("⚠ Mission data not yet available"); return; }
    setActiveMission(m);
    setNav("explore");
  }

  function onMissionComplete() {
    audioSystem.playSuccess();
    const m = activeMission;
    setCompleted(c => [...c, m.id]);
    if (m.unlocks) setUnlocked(u => u.includes(m.unlocks) ? u : [...u, m.unlocks]);
    if (m.toolReward) setRecoveredTools(t => [...t, m.toolReward]);

    setModal({
      title: m.id === "first-light" ? "⚡ SYSTEM COMPROMISED" : "✓ MISSION COMPLETE",
      accent: m.id === "first-light" ? "var(--accent2)" : "var(--accent3)",
      body: m.id === "first-light"
        ? "The EMP has destroyed almost everything. But data crumbs remain — scattered through the Reef wreckage and mirrored to unknown servers. The Wraith-Kit lives. Barely."
        : `${m.name} complete.${m.toolReward ? ` ${m.toolReward} has been restored to the Wraith-Kit.` : ""}`,
      onClose: () => {
        setModal(null);
        setActiveMission(null);
        setNav("missions");
      }
    });
  }

  function onMissionFail() {
    audioSystem.playError();
    setThreat(t => Math.min(10, t + 1));
    flash("⚠ CONNECTION LOST — Threat level increased");
    setActiveMission(null);
    setNav("missions");
  }

  function handleDiscovery(disc) {
    // Auto-add to notepad if not already there
    const exists = notepadEntries.some(e => e.value === disc.value);
    if (!exists) {
      setNotepadEntries(n => [...n, disc]);
    }
  }

  function handleToolUsed(toolId) {
    if (toolId === "EMP_TRIGGER") {
      setScreen("emp");
    }
  }

  function handleEmpDone() {
    setScreen("game");
    onMissionComplete();
  }

  const playableMissions = MISSIONS.filter(m => EXPLORATION_DATA[m.id]);
  const totalTools = WRAITH_TOOLS.length;
  const currentMissionData = activeMission ? EXPLORATION_DATA[activeMission.id] : null;

  // ==============================================================
  // BOOT SCREEN
  // ==============================================================
  if (screen === "boot") return (
    <div style={{ fontFamily: "Share Tech Mono" }}><style>{CSS}</style><div className="scanlines" />
      <div className="screen"><div className="boot-bg" /><div className="boot-grid" />
        <div className="corner corner-tl" /><div className="corner corner-tr" />
        <div className="corner corner-bl" /><div className="corner corner-br" />
        <div className="hud-line hud-tl">SYS: GHOST_PROTOCOL_v0.1</div>
        <div className="hud-line hud-tr">NODE: NOVA TERRA</div>
        <div className="hud-line hud-bl">LOC: THE REEF [CLASSIFIED]</div>
        <div className="hud-line hud-br">ENCRYPT: AES-512</div>
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div className="logo-title">CYBER SIEGE</div>
          <div className="logo-sub">Nova Terra · Digital Espionage</div>
          <button className="boot-btn" onClick={() => {
            audioSystem.playClick();
            audioSystem.start();
            setCineIdx(0); 
            setScreen("cinematic");
          }}>▶ INITIALIZE</button>
        </div>
      </div>
    </div>
  );

  // ==============================================================
  // CINEMATIC INTRO
  // ==============================================================
  if (screen === "cinematic") return (
    <div style={{ fontFamily: "Share Tech Mono" }}><style>{CSS}</style><div className="scanlines" />
      <div className="screen" style={{ background: "#010406" }}>
        <div className="cine-bg" />
        <div className="cine-vignette" />
        <div className="cine-glitch" />
        <div className="cine-container">
          <div className="cine-content">
            <div className="cine-header">◈ CLASSIFIED BRIEFING ◈</div>
            {CINEMATIC_PARAGRAPHS.slice(0, cineIdx).map((p, i) => (
              <div key={i} className={`cine-para ${p.style}`}
                style={{ animationDelay: `${0}s` }}>
                {p.text}
              </div>
            ))}
            {cineIdx >= CINEMATIC_PARAGRAPHS.length && (
              <div className="cine-btn-wrap" style={{ animationDelay: ".3s" }}>
                <button className="btn-primary" onClick={() => { audioSystem.playClick(); setScreen("nameEntry"); }}>
                  ACCEPT MISSION ▶
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // ==============================================================
  // NAME ENTRY
  // ==============================================================
  if (screen === "nameEntry") return (
    <div style={{ fontFamily: "Share Tech Mono" }}><style>{CSS}</style><div className="scanlines" />
      <div className="screen" style={{ background: "#010406" }}>
        <div className="boot-bg" /><div className="boot-grid" />
        <div className="corner corner-tl" /><div className="corner corner-tr" />
        <div className="corner corner-bl" /><div className="corner corner-br" />
        <div className="name-container">
          <div className="name-content">
            <div className="name-label">ENTER OPERATIVE CALLSIGN</div>
            <div className="name-sublabel">This alias will identify you on the grid</div>
            <input
              className="name-input"
              type="text"
              maxLength={16}
              placeholder="CALLSIGN..."
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && playerName.trim()) { audioSystem.playClick(); setCodeIdx(0); setScreen("codeAnim"); } }}
              autoFocus
            />
            <br />
            <button
              className="name-submit"
              disabled={!playerName.trim()}
              onClick={() => { audioSystem.playClick(); setCodeIdx(0); setScreen("codeAnim"); }}
            >
              CONFIRM ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ==============================================================
  // CODE ANIMATION
  // ==============================================================
  if (screen === "codeAnim") return (
    <div style={{ fontFamily: "Share Tech Mono" }}><style>{CSS}</style><div className="scanlines" />
      <div className="screen" style={{ background: "#020508", flexDirection: "column", alignItems: "stretch", justifyContent: "flex-start" }}>
        <div className="code-anim-header">
          <div className="code-anim-dot red" />
          <div className="code-anim-dot yellow" />
          <div className="code-anim-dot green" />
          <div className="code-anim-title">WRAITH-KIT // INITIALIZATION</div>
        </div>
        <div className="code-anim-scroll" ref={scrollRef}>
          {CODE_LINES.slice(0, codeIdx).map((line, i) => (
            <div key={i} className={`code-anim-line`}>
              <span className={line.cls}>{line.raw}</span>
            </div>
          ))}
          {codeIdx > 0 && codeIdx < CODE_LINES.length && (
            <span style={{ color: "var(--accent)", animation: "pulse 0.5s infinite" }}>█</span>
          )}
        </div>
        <div className="code-anim-status">
          <div className="code-anim-status-text">
            {codeIdx >= CODE_LINES.length ? "✓ INITIALIZATION COMPLETE" : `> LOADING... ${Math.round((codeIdx / CODE_LINES.length) * 100)}%`}
          </div>
        </div>
      </div>
    </div>
  );

  // ==============================================================
  // STORY INTRO (CODEC)
  // ==============================================================
  if (screen === "story") {
    const currentLine = CODEC_DIALOGUE[dialogueIdx];
    const isGhostface = currentLine.speaker === "GHOSTFACE";
    const isPlayer = currentLine.speaker === "PLAYER";
    const isSystem = currentLine.speaker === "SYSTEM";

    return (
      <div style={{ fontFamily: "Share Tech Mono" }}><style>{CSS}</style><div className="scanlines" />
        <div className="screen" style={{ flexDirection: "column", alignItems: "stretch", justifyContent: "flex-start", background: "#010406" }}>
          
          <div className="brief-header">
            <div className="brief-title">CYBER SIEGE // SECURE CHANNEL</div>
            <div style={{ fontSize: ".6rem", color: "var(--accent3)", letterSpacing: ".2em" }}>ENCRYPTION: ACTIVE</div>
          </div>

          <div className="codec-container">
            <div style={{ textAlign: "center", color: "var(--accent2)", letterSpacing: ".3em", fontSize: ".7rem", marginBottom: 20 }}>
              INCOMING TRANSMISSION
            </div>

            <div className="codec-grid">
              {/* Ghostface Portrait */}
              <div className="codec-portrait-box">
                <div className={`codec-portrait ${isGhostface ? "active" : ""}`}>
                  {isGhostface ? "💀" : "👤"}
                </div>
                <div className={`codec-name ${isGhostface ? "active" : ""}`}>GHOSTFACE</div>
              </div>

              {/* Frequency */}
              <div className="codec-freq-box">
                <div style={{ fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".2em", marginBottom: "10px" }}>FREQ</div>
                <div className="codec-freq" style={{ color: isSystem ? "var(--accent2)" : "#fff" }}>
                  {currentLine.freq.split('.')[0]}
                  {currentLine.freq.includes('.') && <span>.{currentLine.freq.split('.')[1]}</span>}
                </div>
              </div>

              {/* Player Portrait */}
              <div className="codec-portrait-box">
                <div className={`codec-portrait ${isPlayer ? "active-player" : ""}`}>
                  {isPlayer ? "💻" : "👤"}
                </div>
                <div className={`codec-name ${isPlayer ? "active-player" : ""}`}>{playerName.trim().toUpperCase() || "ROOKIE"}</div>
              </div>
            </div>

            <div className="codec-dialogue-box" onClick={() => {
              audioSystem.playClick();
              if (dialogueIdx < CODEC_DIALOGUE.length - 1) {
                setDialogueIdx(dialogueIdx + 1);
              } else {
                setScreen("game");
                setDialogueIdx(0);
              }
            }}>
              <div className="codec-dialogue-text" style={{ color: isSystem ? "var(--accent2)" : "#fff" }}>
                {currentLine.text}
              </div>
              <div className="codec-prompt">
                {dialogueIdx < CODEC_DIALOGUE.length - 1 ? "CLICK TO CONTINUE ▶" : "BEGIN SWEEP ▶"}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ==============================================================
  // EMP SEQUENCE
  // ==============================================================
  if (screen === "emp") return (
    <div style={{ fontFamily: "Share Tech Mono" }}><style>{CSS}</style><div className="scanlines" />
      <EmpSequence onComplete={handleEmpDone} />
    </div>
  );

  // ==============================================================
  // GAME COMPLETE
  // ==============================================================
  if (screen === "complete") return (
    <div style={{ fontFamily: "Share Tech Mono" }}><style>{CSS}</style><div className="scanlines" />
      <div className="screen" style={{ background: "#010911" }}>
        <div className="boot-bg" /><div className="boot-grid" />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 20px" }}>
          <div className="complete-title">CYBER SIEGE COMPLETE</div>
          <div style={{ fontFamily: "Rajdhani", fontSize: "1rem", color: "var(--dim)", letterSpacing: ".4em", marginTop: 8 }}>
            NOVA TERRA — MISSION ACCOMPLISHED
          </div>
          <button className="btn-primary" style={{ marginTop: 32 }} onClick={() => {
            audioSystem.playClick();
            audioSystem.stop();
            setScreen("boot"); setCompleted([]); setUnlocked(["first-light"]);
            setRecoveredTools([]); setThreat(0); setNotepadEntries([]);
            setActiveMission(null); setNav("missions"); setPlayerName("");
          }}>▶ NEW GAME</button>
        </div>
      </div>
    </div>
  );

  // ==============================================================
  // MAIN GAME SCREEN
  // ==============================================================
  return (
    <div style={{ fontFamily: "Share Tech Mono", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <style>{CSS}</style>
      <div className="scanlines" />

      {alertMsg && <div className="alert-bar">{alertMsg}</div>}

      {modal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="corner corner-tl" style={{ width: 16, height: 16 }} />
            <div className="corner corner-br" style={{ width: 16, height: 16 }} />
            <div className="modal-title" style={{ color: modal.accent || "var(--accent)" }}>{modal.title}</div>
            <div className="modal-body">{modal.body}</div>
            <button className="btn-primary" style={{ background: modal.accent || "var(--accent)" }}
              onClick={() => { audioSystem.playClick(); modal.onClose(); }}>CONTINUE ▶</button>
          </div>
        </div>
      )}

      <div className="game-screen">
        {/* TOP BAR */}
        <div className="game-topbar">
          <div className="game-logo">◈ CYBER SIEGE // NOVA TERRA</div>
          <div className="stat-row">
            <button className="speaker-btn" onClick={() => {
              audioSystem.playClick();
              const muted = audioSystem.toggleMute();
              setIsMuted(muted);
            }}>
              {isMuted ? "🔇" : "🔊"}
            </button>
            <div className="stat"><span className="stat-label">TOOLS</span><span className="stat-val">{recoveredTools.length}/{totalTools}</span></div>
            <div className="stat"><span className="stat-label">MISSIONS</span><span className="stat-val">{completed.length}</span></div>
            <div className="stat"><span className="stat-label">THREAT</span><span className={`stat-val ${threat >= 7 ? "danger" : ""}`}>{threat}/10</span></div>
          </div>
        </div>

        <div className="game-body">
          {/* SIDE NAV */}
          <nav className="side-nav">
            <div className="nav-section-label">OPERATIONS</div>
            {[
              { id: "missions", icon: "🗺", label: "Missions" },
              { id: "explore", icon: "⚡", label: "Terminal", badge: activeMission ? "LIVE" : null, lock: !activeMission },
            ].map(n => (
              <div key={n.id} className={`nav-item ${nav === n.id ? "active" : ""} ${n.lock ? "locked" : ""}`}
                onClick={() => { audioSystem.playClick(); if (n.lock) { flash("Select a mission first"); return; } setNav(n.id); }}>
                <span className="nav-icon">{n.icon}</span><span>{n.label}</span>
                {n.badge && <span className="nav-badge">{n.badge}</span>}
              </div>
            ))}
            <div className="nav-section-label" style={{ marginTop: 12 }}>SYSTEM</div>
            {[
              { id: "tools", icon: "🛠", label: "Wraith-Kit" },
              { id: "comms", icon: "💬", label: "Messages" },
              { id: "notepad", icon: "📝", label: "Notepad" },
              { id: "intel", icon: "📋", label: "Intel" },
            ].map(n => (
              <div key={n.id} className={`nav-item ${nav === n.id ? "active" : ""}`} onClick={() => { audioSystem.playClick(); setNav(n.id); }}>
                <span className="nav-icon">{n.icon}</span><span>{n.label}</span>
              </div>
            ))}
          </nav>

          {/* MAIN PANEL */}
          <div className="main-panel">
            {/* MISSION MAP */}
            {nav === "missions" && (
              <div style={{ flex: 1, overflowY: "auto", padding: 16, background: "#010911" }}>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: ".6rem", letterSpacing: ".4em", color: "var(--dim)", marginBottom: 8 }}>
                    CYBER SIEGE — SELECT MISSION
                  </div>
                  <div style={{ fontFamily: "Orbitron", fontSize: ".8rem", color: "var(--accent3)", marginBottom: 8, letterSpacing: ".2em" }}>
                    MISSIONS COMPLETE: {completed.length}
                  </div>
                  <PBar label="WRAITH-KIT RESTORED" value={recoveredTools.length} max={totalTools} color="green" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 10 }}>
                  {MISSIONS.filter(m => completed.includes(m.id) || unlocked.includes(m.id)).map(m => {
                    const isDone = completed.includes(m.id);
                    const isLock = !unlocked.includes(m.id);
                    const isActive = activeMission?.id === m.id;
                    const hasData = !!EXPLORATION_DATA[m.id];
                    return (
                      <div key={m.id}
                        className={`map-card ${isDone ? "done" : ""} ${isActive ? "active-hack" : ""} ${isLock ? "locked" : ""}`}
                        style={!hasData && !isLock && !isDone ? { opacity: 0.35 } : {}}
                        onClick={() => startMission(m)}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                          <span style={{ fontSize: "1.4rem" }}>{m.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{
                              fontFamily: "Orbitron", fontSize: ".65rem", letterSpacing: ".12em",
                              color: isDone ? "var(--accent3)" : isLock ? "var(--dim)" : "#fff"
                            }}>
                              M{String(m.num).padStart(2, "0")}: {m.name}
                            </div>
                            <div style={{ fontSize: ".55rem", color: "var(--dim)", marginTop: 2 }}>{m.subtitle}</div>
                          </div>
                          <div style={{
                            fontSize: ".55rem",
                            color: isDone ? "var(--accent3)" : isLock ? "var(--dim)" : isActive ? "var(--accent)" : "var(--accent4)"
                          }}>
                            {isDone ? "✓ DONE" : isLock ? "🔒" : isActive ? "◉ ACTIVE" : hasData ? "▶ READY" : "COMING SOON"}
                          </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".55rem", color: "var(--dim)" }}>
                          <span>ACT {m.act}</span>
                          <span>{m.nodes} NODES</span>
                          {m.toolReward && <span style={{ color: "var(--accent4)" }}>🔧 {m.toolReward}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* NETWORK EXPLORER */}
            {nav === "explore" && activeMission && currentMissionData && (
              <NetworkExplorer
                missionData={currentMissionData}
                availableTools={recoveredTools}
                onComplete={onMissionComplete}
                onFail={onMissionFail}
                onDiscovery={handleDiscovery}
                onToolUsed={handleToolUsed}
                threat={threat}
              />
            )}

            {/* NOTEPAD (full page) */}
            {nav === "notepad" && (
              <div style={{ flex: 1, background: "#010911", overflow: "hidden" }}>
                <Notepad entries={notepadEntries} onAdd={e => setNotepadEntries(n => [...n, e])} />
              </div>
            )}

            {/* COMMS */}
            {nav === "comms" && (
              <div style={{ flex: 1, display: "flex", overflow: "hidden", background: "#010911" }}>
                <div className="comms-sidebar">
                  <div className="comms-header">SECURE CHANNELS</div>
                  {Object.keys(FACTIONS).map(fKey => {
                    const f = FACTIONS[fKey];
                    const messages = COMM_CHANNELS[fKey] || [];
                    const hasDocs = messages.some(msg => completed.includes(msg.unlockAfter));
                    
                    if (!hasDocs && fKey !== "legion") return null;
                    
                    return (
                      <div key={fKey} className={`comms-channel ${activeChat === fKey ? "active" : ""}`}
                        onClick={() => { audioSystem.playClick(); setActiveChat(fKey); }}>
                        <span className="comms-icon">{f.icon}</span>
                        <div className="comms-name" style={{ color: f.color }}>{f.name}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="comms-chat-area">
                  <div className="comms-chat-header" style={{ color: FACTIONS[activeChat]?.color || "var(--accent)" }}>
                    {FACTIONS[activeChat]?.name} // ENCRYPTED
                  </div>
                  <div className="comms-chat-scroll">
                    {(COMM_CHANNELS[activeChat] || []).map((msg, idx) => {
                      if (!completed.includes(msg.unlockAfter)) return null;
                      const isGhostface = msg.sender === "GHOSTFACE";
                      const isPlayer = msg.sender === "PLAYER";
                      const fColor = FACTIONS[activeChat]?.color;
                      
                      return (
                        <div key={idx} className={`chat-message ${isPlayer ? "player" : "faction"}`}>
                          <div className="chat-sender" style={{ color: isPlayer ? "var(--accent4)" : fColor }}>
                            {isPlayer ? playerName.trim().toUpperCase() || "ROOKIE" : msg.sender}
                          </div>
                          <div className="chat-text">{msg.text}</div>
                        </div>
                      );
                    })}
                    <div style={{ float:"left", clear: "both" }} />
                  </div>
                </div>
              </div>
            )}

            {/* WRAITH-KIT STATUS */}
            {nav === "tools" && (
              <div style={{ flex: 1, overflowY: "auto", padding: 16, background: "#010911" }}>
                <div style={{ fontFamily: "Orbitron", fontSize: "1rem", color: "var(--accent)", marginBottom: 4, letterSpacing: ".2em" }}>
                  WRAITH-KIT STATUS
                </div>
                <div style={{ fontFamily: "Rajdhani", fontSize: ".9rem", color: "var(--dim)", marginBottom: 12 }}>
                  {recoveredTools.length === 0
                    ? "All tools corrupted by EMP. Find data fragments to rebuild."
                    : `${recoveredTools.length} of ${totalTools} tools restored.`}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {WRAITH_TOOLS.map(tool => {
                    const isRecovered = recoveredTools.includes(tool.id);
                    const missionForTool = MISSIONS.find(m => m.toolReward === tool.id);
                    return (
                      <div key={tool.id} style={{
                        background: "#030e18", border: `1px solid ${isRecovered ? "var(--accent3)" : "var(--border)"}`,
                        padding: 10, opacity: isRecovered ? 1 : 0.4
                      }}>
                        <div style={{ fontSize: "1.2rem", marginBottom: 4 }}>{tool.icon}</div>
                        <div style={{ fontFamily: "Orbitron", fontSize: ".6rem", color: isRecovered ? "var(--accent3)" : "var(--dim)", letterSpacing: ".1em" }}>
                          {tool.id}
                        </div>
                        <div style={{ fontSize: ".6rem", color: "var(--dim)", marginTop: 2 }}>{tool.desc}</div>
                        <div style={{ fontSize: ".5rem", color: isRecovered ? "var(--accent3)" : "var(--accent2)", marginTop: 4 }}>
                          {isRecovered ? "✓ RESTORED" : missionForTool ? `Recover in M${String(missionForTool.num).padStart(2, "0")}` : "CORRUPTED"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* INTEL */}
            {nav === "intel" && (
              <div style={{ flex: 1, overflowY: "auto", padding: 20, background: "#010911", fontFamily: "Rajdhani" }}>
                <div style={{ fontSize: ".6rem", letterSpacing: ".5em", color: "var(--accent2)", marginBottom: 8 }}>
                  INTELLIGENCE FEED
                </div>
                <div style={{ fontFamily: "Orbitron", fontSize: "1.2rem", color: "#fff", marginBottom: 16, lineHeight: 1.3 }}>
                  Mission Debrief
                </div>
                {MISSIONS.filter(m => completed.includes(m.id)).map(m => (
                  <div key={m.id} style={{ marginBottom: 16 }}>
                    <div style={{ fontFamily: "Orbitron", fontSize: ".7rem", color: "var(--accent3)", letterSpacing: ".2em", marginBottom: 4 }}>
                      {m.icon} M{String(m.num).padStart(2, "0")}: {m.name} — COMPLETE
                    </div>
                    {m.toolReward && (
                      <div style={{ fontSize: ".85rem", color: "var(--text)", lineHeight: 1.6 }}>
                        Tool recovered: {m.toolReward}
                      </div>
                    )}
                  </div>
                ))}
                {completed.length === 0 && (
                  <div style={{ fontSize: ".9rem", color: "var(--dim)" }}>
                    No missions completed yet. Start with FIRST LIGHT.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SIDE PANEL */}
          <div className="side-panel">
            <div className="sp-section">
              <div className="sp-title">WRAITH-KIT</div>
              <div style={{ fontSize: ".65rem", color: recoveredTools.length === 0 ? "var(--accent2)" : "var(--accent)", fontFamily: "Orbitron", letterSpacing: ".1em" }}>
                {recoveredTools.length === 0 ? "CRITICAL — ALL TOOLS OFFLINE" : `${recoveredTools.length} / ${totalTools} TOOLS ONLINE`}
              </div>
              <PBar label="SYSTEM INTEGRITY" value={Math.max(4, recoveredTools.length * 10)} max={100}
                color={recoveredTools.length === 0 ? "red" : "cyan"} />
            </div>
            <div className="sp-section">
              <div className="sp-title">MISSION QUEUE</div>
              {MISSIONS.filter(m => completed.includes(m.id) || unlocked.includes(m.id)).map(m => {
                const done = completed.includes(m.id);
                const isLock = !unlocked.includes(m.id);
                return (
                  <div key={m.id} style={{
                    display: "flex", alignItems: "center", gap: 8, marginBottom: 8,
                    opacity: isLock ? .35 : 1, cursor: "pointer"
                  }} onClick={() => { audioSystem.playClick(); setNav("missions"); }}>
                    <span>{m.icon}</span>
                    <span style={{ fontSize: ".58rem", flex: 1, color: done ? "var(--accent3)" : "var(--text)" }}>
                      {m.name}
                    </span>
                    <span style={{ fontSize: ".55rem", color: done ? "var(--accent3)" : isLock ? "var(--dim)" : "var(--accent4)" }}>
                      {done ? "✓" : isLock ? "🔒" : "▶"}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Mini notepad in side panel */}
            <div className="sp-section" style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div className="sp-title">QUICK NOTES</div>
              <div style={{ flex: 1, overflowY: "auto" }}>
                {notepadEntries.slice(-5).map((e, i) => (
                  <div key={i} style={{ fontSize: ".6rem", marginBottom: 6, padding: "4px 6px", background: "#030e18", border: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--accent4)", fontSize: ".5rem", letterSpacing: ".2em" }}>{e.type} </span>
                    <span style={{ color: "var(--accent3)" }}>{e.value}</span>
                  </div>
                ))}
                {notepadEntries.length === 0 && (
                  <div style={{ fontSize: ".58rem", color: "var(--dim)" }}>No notes yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
