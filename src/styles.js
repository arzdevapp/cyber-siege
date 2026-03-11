export const FONT = `@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');`;

export const CSS = `
${FONT}
* { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #020a0f; --panel: #040e17; --border: #0d3a52;
  --accent: #00e5ff; --accent2: #ff3c5f; --accent3: #39ff14; --accent4: #ffd600;
  --text: #b0cfe0; --dim: #2a5f78;
  --glow: 0 0 12px #00e5ff88; --glow2: 0 0 12px #ff3c5f88; --glow3: 0 0 12px #39ff1488;
}
body { background: var(--bg); color: var(--text); font-family: 'Share Tech Mono', monospace; overflow: hidden; }
.scanlines { pointer-events:none; position:fixed; inset:0; z-index:9999; background:repeating-linear-gradient(to bottom,transparent 0,transparent 2px,rgba(0,0,0,.15) 2px,rgba(0,0,0,.15) 4px); }
.screen { width:100vw; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; overflow:hidden; }
.boot-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 50% 60%,#001a2e 0%,#020a0f 70%); }
.boot-grid { position:absolute; inset:0; background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px); background-size:40px 40px; opacity:.3; animation:gP 4s ease-in-out infinite; }
@keyframes gP { 0%,100%{opacity:.2} 50%{opacity:.4} }
.logo-title { font-family:'Orbitron',monospace; font-size:clamp(2rem,7vw,4rem); font-weight:900; letter-spacing:.15em; color:var(--accent); text-shadow:0 0 30px #00e5ff,0 0 60px #00e5ff66; animation:tP 2s ease-in-out infinite; }
@keyframes tP { 0%,100%{text-shadow:0 0 30px #00e5ff,0 0 60px #00e5ff66} 50%{text-shadow:0 0 50px #00e5ff,0 0 100px #00e5ff88} }
.logo-sub { font-family:'Rajdhani',sans-serif; font-size:clamp(.7rem,2vw,1rem); letter-spacing:.5em; color:var(--accent2); margin-top:6px; text-shadow:var(--glow2); }
.boot-btn { margin-top:48px; font-family:'Orbitron',monospace; font-size:.9rem; letter-spacing:.3em; color:var(--accent3); background:transparent; border:1.5px solid var(--accent3); padding:14px 44px; cursor:pointer; box-shadow:0 0 18px #39ff1433; transition:all .2s; animation:bB 1.5s ease-in-out infinite; }
.boot-btn:hover { background:#39ff1422; }
@keyframes bB { 0%,100%{opacity:1} 50%{opacity:.6} }
.corner { position:absolute; width:40px; height:40px; border-color:var(--accent); border-style:solid; opacity:.4; }
.corner-tl{top:20px;left:20px;border-width:2px 0 0 2px} .corner-tr{top:20px;right:20px;border-width:2px 2px 0 0}
.corner-bl{bottom:20px;left:20px;border-width:0 0 2px 2px} .corner-br{bottom:20px;right:20px;border-width:0 2px 2px 0}
.hud-line { position:absolute; font-size:.6rem; color:var(--dim); letter-spacing:.2em; opacity:.6; }
.hud-tl{top:28px;left:72px} .hud-tr{top:28px;right:72px;text-align:right} .hud-bl{bottom:28px;left:72px} .hud-br{bottom:28px;right:72px;text-align:right}
.brief-header { width:100%; background:#020d15; border-bottom:1px solid var(--border); padding:12px 24px; display:flex; align-items:center; justify-content:space-between; }
.brief-title { font-family:'Orbitron',monospace; color:var(--accent); font-size:.85rem; letter-spacing:.3em; }
.brief-body { flex:1; overflow-y:auto; padding:24px; width:100%; max-width:860px; }
.brief-text { font-family:'Rajdhani',sans-serif; font-size:1rem; line-height:1.7; color:var(--text); margin-bottom:16px; }
.btn-primary { font-family:'Orbitron',monospace; font-size:.75rem; letter-spacing:.25em; color:var(--bg); background:var(--accent); border:none; padding:13px 28px; cursor:pointer; transition:all .2s; font-weight:bold; }
.btn-primary:hover { background:#33eeff; }
.btn-secondary { font-family:'Orbitron',monospace; font-size:.75rem; letter-spacing:.25em; color:var(--accent); background:transparent; border:1px solid var(--accent); padding:13px 28px; cursor:pointer; transition:all .2s; }
.btn-secondary:hover { background:#00e5ff11; }
.game-screen { flex-direction:column; padding:0; overflow:hidden; }
.game-topbar { width:100%; background:#020d15; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; padding:8px 16px; flex-shrink:0; z-index:10; }
.game-logo { font-family:'Orbitron',monospace; font-size:.7rem; letter-spacing:.3em; color:var(--accent); }
.stat-row { display:flex; gap:18px; align-items:center; }
.stat { display:flex; align-items:center; gap:6px; font-size:.65rem; }
.stat-label { color:var(--dim); }
.stat-val { color:var(--accent); font-family:'Orbitron',monospace; font-size:.7rem; }
.stat-val.danger { color:var(--accent2); animation:pulse 1s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
.speaker-btn { background:transparent; border:1px solid var(--border); color:var(--accent); font-size:.8rem; cursor:pointer; padding:4px 8px; transition:all .2s; border-radius:2px; }
.speaker-btn:hover { background:var(--border); color:#fff; }
.game-body { flex:1; display:flex; overflow:hidden; min-height:0; }
.side-nav { width:200px; background:#020d15; border-right:1px solid var(--border); display:flex; flex-direction:column; padding:12px 0; flex-shrink:0; }
.nav-section-label { font-size:.55rem; letter-spacing:.4em; color:var(--dim); padding:8px 16px 4px; }
.nav-item { display:flex; align-items:center; gap:10px; padding:10px 16px; cursor:pointer; transition:all .15s; font-size:.75rem; letter-spacing:.1em; color:var(--text); border-left:2px solid transparent; position:relative; }
.nav-item:hover { background:#051828; color:var(--accent); }
.nav-item.active { background:#061d2d; border-left-color:var(--accent); color:var(--accent); }
.nav-item.locked { color:var(--dim); cursor:not-allowed; }
.nav-badge { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:var(--accent2); color:var(--bg); font-size:.5rem; padding:2px 5px; font-family:'Orbitron',monospace; }
.nav-icon { font-size:1rem; width:18px; text-align:center; }
.main-panel { flex:1; display:flex; flex-direction:column; overflow:hidden; min-width:0; }
.side-panel { width:260px; background:#020d15; border-left:1px solid var(--border); display:flex; flex-direction:column; overflow:hidden; flex-shrink:0; }
.sp-section { border-bottom:1px solid var(--border); padding:12px; }
.sp-title { font-size:.55rem; letter-spacing:.4em; color:var(--dim); margin-bottom:10px; }
.alert-bar { position:fixed; top:48px; left:50%; transform:translateX(-50%); z-index:2000; background:#0a0005; border:1px solid var(--accent2); color:var(--accent2); font-family:'Orbitron',monospace; font-size:.7rem; letter-spacing:.2em; padding:10px 24px; box-shadow:var(--glow2); animation:sD .3s; white-space:nowrap; }
@keyframes sD { from{transform:translateX(-50%) translateY(-20px);opacity:0} to{transform:translateX(-50%) translateY(0);opacity:1} }
.modal-overlay { position:fixed; inset:0; background:#000000cc; z-index:1000; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(2px); }
.modal { background:#020d15; border:1px solid var(--accent); max-width:520px; width:90%; padding:28px; position:relative; }
.modal-title { font-family:'Orbitron',monospace; color:var(--accent); font-size:1rem; letter-spacing:.2em; margin-bottom:8px; }
.modal-body { font-family:'Rajdhani',sans-serif; font-size:.95rem; color:var(--text); line-height:1.7; margin-bottom:20px; }
.progress-wrap { margin:10px 0; }
.progress-label { display:flex; justify-content:space-between; font-size:.65rem; letter-spacing:.15em; color:var(--dim); margin-bottom:5px; }
.progress-track { height:4px; background:#0d2535; border-radius:1px; overflow:hidden; }
.progress-fill { height:100%; border-radius:1px; transition:width .4s; }
.pf-cyan{background:var(--accent)} .pf-red{background:var(--accent2)} .pf-green{background:var(--accent3)} .pf-yellow{background:var(--accent4)}
.complete-title { font-family:'Orbitron',monospace; font-size:clamp(1.5rem,4vw,3rem); color:var(--accent3); text-shadow:0 0 30px #39ff14; text-align:center; animation:tP 2s infinite; }

/* ===== NETWORK EXPLORER ===== */
.net-explorer { flex:1; display:flex; flex-direction:column; overflow:hidden; background:#010911; }
.net-topbar { display:flex; align-items:center; gap:10px; padding:10px 16px; border-bottom:1px solid var(--border); background:#020d15; flex-shrink:0; }
.net-topbar-label { font-size:.6rem; letter-spacing:.3em; color:var(--dim); }
.net-topbar-node { font-family:'Orbitron',monospace; font-size:.7rem; color:var(--accent); }
.net-content { flex:1; display:flex; overflow:hidden; }
.net-map-panel { width:220px; border-right:1px solid var(--border); padding:12px; overflow-y:auto; flex-shrink:0; }
.net-map-title { font-size:.55rem; letter-spacing:.4em; color:var(--dim); margin-bottom:10px; }
.node-card { background:#030e18; border:1px solid var(--border); padding:10px; margin-bottom:8px; cursor:pointer; transition:all .2s; }
.node-card:hover { border-color:var(--accent); background:#051828; }
.node-card.connected { border-color:var(--accent3); background:#010f07; box-shadow:var(--glow3); }
.node-card.locked { opacity:.5; }
.node-card.locked:hover { border-color:var(--accent2); }
.node-name { font-family:'Orbitron',monospace; font-size:.6rem; color:#fff; letter-spacing:.1em; margin-bottom:3px; }
.node-ip { font-size:.6rem; color:var(--dim); margin-bottom:4px; }
.node-status { font-size:.55rem; letter-spacing:.15em; }
.node-status.open { color:var(--accent3); }
.node-status.locked { color:var(--accent2); }
.node-status.connected { color:var(--accent); }

.terminal-area { flex:1; display:flex; flex-direction:column; overflow:hidden; min-height:0; }
.term-output { flex:1 1 0; min-height:80px; max-height:40vh; overflow-y:auto; padding:14px; font-family:'Share Tech Mono',monospace; font-size:.78rem; }
.t-line { line-height:1.7; white-space:pre-wrap; word-break:break-all; }
.t-err { color:var(--accent2); }
.t-warn { color:var(--accent4); }
.t-ok { color:var(--accent3); }
.t-cmd { color:#fff; }
.t-dim { color:var(--dim); }
.t-accent { color:var(--accent); }
.t-sys { color:#4a8fa8; }

/* File Browser */
.file-browser { border-top:1px solid var(--border); padding:10px 14px; min-height:60px; max-height:35vh; overflow-y:auto; background:#000d14; flex-shrink:0; }
.file-path { font-size:.6rem; color:var(--dim); letter-spacing:.2em; margin-bottom:8px; padding-bottom:6px; border-bottom:1px solid #0d253544; }
.file-item { display:flex; align-items:center; gap:8px; padding:5px 8px; cursor:pointer; transition:all .15s; font-size:.72rem; border-left:2px solid transparent; }
.file-item:hover { background:#051828; border-left-color:var(--accent); color:var(--accent); }
.file-item .fi-icon { width:16px; text-align:center; flex-shrink:0; }
.file-item.dir .fi-icon { color:var(--accent4); }
.file-item.file .fi-icon { color:var(--dim); }
.file-item.file.has-discovery .fi-icon { color:var(--accent3); }

/* Tool Bar */
.tool-bar { display:flex; flex-wrap:wrap; gap:6px; padding:10px 14px; border-top:1px solid var(--border); background:#020d15; flex-shrink:0; }
.tool-btn { font-family:'Orbitron',monospace; font-size:.55rem; letter-spacing:.15em; padding:6px 12px; cursor:pointer; border:1px solid; transition:all .2s; background:transparent; }
.tool-btn.available { color:var(--accent3); border-color:var(--accent3); }
.tool-btn.available:hover { background:#39ff1422; }
.tool-btn.disabled { color:#1a3a4a; border-color:#0d2535; cursor:not-allowed; }
.tool-btn.highlight { color:var(--accent4); border-color:var(--accent4); animation:bB 1s infinite; }

/* Notepad */
.notepad { display:flex; flex-direction:column; height:100%; }
.notepad-entries { flex:1; overflow-y:auto; padding:8px; }
.notepad-entry { background:#030e18; border:1px solid var(--border); padding:8px; margin-bottom:6px; font-size:.7rem; }
.notepad-entry .ne-type { font-size:.5rem; letter-spacing:.3em; color:var(--accent4); margin-bottom:3px; }
.notepad-entry .ne-label { color:var(--text); font-size:.68rem; margin-bottom:2px; }
.notepad-entry .ne-value { color:var(--accent3); font-family:'Share Tech Mono',monospace; }
.notepad-input { display:flex; gap:6px; padding:8px; border-top:1px solid var(--border); flex-shrink:0; }
.notepad-input input { flex:1; background:#010911; border:1px solid var(--border); color:var(--accent); font-family:'Share Tech Mono',monospace; font-size:.7rem; padding:6px 8px; outline:none; }
.notepad-input input:focus { border-color:var(--accent); }
.notepad-input button { font-family:'Orbitron',monospace; font-size:.5rem; padding:6px 10px; background:var(--accent); color:var(--bg); border:none; cursor:pointer; letter-spacing:.1em; }

/* Password Prompt */
.pw-prompt { position:absolute; inset:0; background:#000000dd; z-index:100; display:flex; align-items:center; justify-content:center; }
.pw-box { background:#020d15; border:1px solid var(--accent2); padding:24px; width:340px; text-align:center; }
.pw-title { font-family:'Orbitron',monospace; font-size:.8rem; color:var(--accent2); letter-spacing:.2em; margin-bottom:12px; }
.pw-input { width:100%; background:#010911; border:1px solid var(--border); color:var(--accent); font-family:'Share Tech Mono',monospace; font-size:.8rem; padding:10px; text-align:center; outline:none; margin-bottom:12px; }
.pw-input:focus { border-color:var(--accent2); }
.pw-error { color:var(--accent2); font-size:.7rem; margin-bottom:8px; }
.pw-buttons { display:flex; gap:8px; justify-content:center; }

/* EMP Sequence */
.emp-overlay { position:fixed; inset:0; z-index:5000; display:flex; align-items:center; justify-content:center; flex-direction:column; }
.emp-flash { position:absolute; inset:0; background:white; animation:empFlash 1.5s ease-out; }
@keyframes empFlash { 0%{opacity:1} 30%{opacity:.8} 100%{opacity:0} }
.emp-content { position:relative; z-index:2; background:#020a0f; padding:40px; max-width:600px; width:90%; text-align:center; border:1px solid var(--accent2); }
.emp-title { font-family:'Orbitron',monospace; font-size:1.2rem; color:var(--accent2); letter-spacing:.3em; margin-bottom:16px; animation:pulse 1s infinite; }
.emp-tool-line { display:flex; justify-content:space-between; padding:4px 0; font-size:.72rem; border-bottom:1px solid #0d253522; }
.emp-tool-name { color:var(--text); }
.emp-tool-status { color:var(--accent2); font-family:'Orbitron',monospace; font-size:.6rem; }
.emp-message { font-family:'Rajdhani',sans-serif; font-size:.95rem; color:var(--text); line-height:1.7; margin-top:16px; text-align:left; }

/* Guided Tutorial */
.guided-hint { background:#0a1400; border:1px solid var(--accent4); border-left:3px solid var(--accent4); padding:10px 14px; margin:8px 14px; font-size:.7rem; animation:bB 2s infinite; }
.guided-label { font-size:.55rem; letter-spacing:.3em; color:var(--accent4); margin-bottom:4px; }
.guided-text { color:var(--text); }

/* Discovery Toast */
.discovery-toast { position:fixed; bottom:80px; left:50%; transform:translateX(-50%); z-index:3000; background:#001a00; border:1px solid var(--accent3); color:var(--accent3); font-family:'Orbitron',monospace; font-size:.7rem; letter-spacing:.2em; padding:12px 24px; box-shadow:var(--glow3); animation:sD .3s; }

@media (max-width:768px) {
  .side-nav { width:52px; }
  .nav-item span:not(.nav-icon) { display:none; }
  .nav-badge,.nav-section-label { display:none; }
  .side-panel { display:none; }
  .net-map-panel { width:160px; }
}
@media (max-width:480px) { .side-nav { display:none; } .net-map-panel { display:none; } }

/* Codec Conversation */
.codec-container { flex:1; display:flex; flex-direction:column; background:#010609; padding:20px 40px; position:relative; width:100%; max-width:860px; margin: 0 auto; justify-content:center; }
.codec-grid { display:flex; gap:20px; justify-content:space-between; align-items:center; margin-bottom:40px; width:100%; }
.codec-portrait-box { display:flex; flex-direction:column; align-items:center; width: 140px; }
.codec-portrait { width:120px; height:150px; border:2px solid var(--dim); background:#03141f; display:flex; align-items:center; justify-content:center; font-size:4rem; box-shadow:0 0 10px #000 inset; opacity:0.3; transition:all 0.3s; }
.codec-portrait.active { opacity:1; border-color:var(--accent3); box-shadow:var(--glow3); animation:scanline-portrait 2s linear infinite; background:repeating-linear-gradient(0deg, #03141f, #03141f 2px, #062b42 2px, #062b42 4px); }
.codec-portrait.active-player { opacity:1; border-color:var(--accent); box-shadow:var(--glow); animation:scanline-portrait 2s linear infinite; background:repeating-linear-gradient(0deg, #03141f, #03141f 2px, #032b42 2px, #032b42 4px); }
.codec-name { font-family:'Orbitron',monospace; font-size:.8rem; color:var(--dim); letter-spacing:.15em; margin-top:10px; padding:4px 10px; background:#020d15; border:1px solid var(--dim); text-align:center; width:100%; }
.codec-name.active { color:var(--accent3); border-color:var(--accent3); }
.codec-name.active-player { color:var(--accent); border-color:var(--accent); }
.codec-freq-box { display:flex; flex-direction:column; align-items:center; justify-content:center; flex:1; }
.codec-freq { font-family:'Share Tech Mono',monospace; font-size:3.5rem; color:#fff; letter-spacing:.1em; text-shadow:0 0 10px #fff8; animation:pulse 2s infinite; font-weight:bold; }
.codec-freq span { color:var(--accent); font-size:1.5rem; vertical-align:super; }
.codec-dialogue-box { background:#020d15; border:1px solid var(--accent); padding:24px; min-height:160px; position:relative; cursor:pointer; border-left:4px solid var(--accent); display:flex; flex-direction:column; justify-content:flex-start; }
.codec-dialogue-box:hover { background:#031826; }
.codec-dialogue-text { font-family:'Share Tech Mono',monospace; font-size:1.2rem; color:#fff; line-height:1.6; }
.codec-prompt { position:absolute; bottom:12px; right:15px; font-family:'Orbitron',monospace; font-size:.65rem; color:var(--accent); animation:pulse 1s infinite; letter-spacing:.2em; }
@keyframes scanline-portrait { 0%{background-position:0 0} 100%{background-position:0 20px} }

/* ===== CINEMATIC INTRO ===== */
.cine-container { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px; position:relative; width:100%; overflow:hidden; }
.cine-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 50% 40%,#001a2e 0%,#010508 70%); }
.cine-vignette { position:absolute; inset:0; background:radial-gradient(ellipse at center,transparent 50%,#000 100%); pointer-events:none; }
.cine-content { position:relative; z-index:2; max-width:700px; width:100%; }
.cine-header { font-family:'Orbitron',monospace; font-size:clamp(.7rem,2vw,1rem); letter-spacing:.5em; color:var(--accent2); text-align:center; margin-bottom:40px; text-shadow:var(--glow2); animation:pulse 2s infinite; }
.cine-para { font-family:'Rajdhani',sans-serif; font-size:clamp(.9rem,2.5vw,1.15rem); color:var(--text); line-height:1.8; margin-bottom:24px; opacity:0; transform:translateY(20px); animation:cineFadeIn .8s ease-out forwards; border-left:2px solid var(--accent); padding-left:16px; }
.cine-para.accent { border-left-color:var(--accent2); }
.cine-para.highlight { border-left-color:var(--accent3); color:#d0e8f0; }
.cine-para em { color:var(--accent); font-style:normal; }
.cine-btn-wrap { text-align:center; margin-top:32px; opacity:0; animation:cineFadeIn .6s ease-out forwards; }
@keyframes cineFadeIn { to { opacity:1; transform:translateY(0); } }
.cine-glitch { position:absolute; top:0; left:0; right:0; height:2px; background:var(--accent); opacity:0; animation:cineGlitch 4s infinite; pointer-events:none; z-index:3; }
@keyframes cineGlitch { 0%,92%,100%{opacity:0;top:0} 93%{opacity:.6;top:20%} 94%{opacity:0;top:20%} 96%{opacity:.4;top:65%} 97%{opacity:0;top:65%} }

/* ===== NAME ENTRY ===== */
.name-container { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px; position:relative; }
.name-content { position:relative; z-index:2; text-align:center; max-width:500px; width:100%; }
.name-label { font-family:'Orbitron',monospace; font-size:clamp(.65rem,1.5vw,.85rem); letter-spacing:.4em; color:var(--accent); margin-bottom:8px; text-shadow:var(--glow); }
.name-sublabel { font-family:'Rajdhani',sans-serif; font-size:.85rem; color:var(--dim); margin-bottom:28px; letter-spacing:.15em; }
.name-input { width:100%; max-width:360px; background:#010911; border:2px solid var(--border); color:var(--accent); font-family:'Share Tech Mono',monospace; font-size:1.2rem; padding:14px 18px; text-align:center; outline:none; letter-spacing:.15em; transition:all .3s; }
.name-input:focus { border-color:var(--accent); box-shadow:0 0 20px #00e5ff33; }
.name-input::placeholder { color:var(--dim); font-size:.8rem; letter-spacing:.2em; }
.name-submit { margin-top:24px; font-family:'Orbitron',monospace; font-size:.8rem; letter-spacing:.3em; color:var(--accent3); background:transparent; border:1.5px solid var(--accent3); padding:12px 40px; cursor:pointer; box-shadow:0 0 14px #39ff1433; transition:all .2s; }
.name-submit:hover { background:#39ff1422; }
.name-submit:disabled { opacity:.3; cursor:not-allowed; }

/* ===== CODE ANIMATION ===== */
.code-anim-container { flex:1; display:flex; flex-direction:column; position:relative; width:100%; overflow:hidden; }
.code-anim-bg { position:absolute; inset:0; background:#020508; }
.code-anim-header { position:relative; z-index:2; padding:16px 24px; border-bottom:1px solid var(--border); background:#010911; display:flex; align-items:center; gap:12px; flex-shrink:0; }
.code-anim-dot { width:8px; height:8px; border-radius:50%; }
.code-anim-dot.red { background:#ff3c5f; }
.code-anim-dot.yellow { background:#ffd600; }
.code-anim-dot.green { background:#39ff14; }
.code-anim-title { font-family:'Orbitron',monospace; font-size:.6rem; letter-spacing:.3em; color:var(--dim); margin-left:8px; }
.code-anim-scroll { position:relative; z-index:2; flex:1; overflow:hidden; padding:16px 24px; }
.code-anim-line { font-family:'Share Tech Mono',monospace; font-size:.72rem; line-height:1.9; white-space:pre-wrap; opacity:0; animation:codeLine .3s ease-out forwards; }
.code-anim-line .kw { color:var(--accent2); }
.code-anim-line .fn { color:var(--accent4); }
.code-anim-line .str { color:var(--accent3); }
.code-anim-line .cm { color:var(--dim); }
.code-anim-line .op { color:var(--accent); }
.code-anim-line .num { color:#c792ea; }
@keyframes codeLine { to { opacity:1; } }
.code-anim-status { position:relative; z-index:2; padding:12px 24px; border-top:1px solid var(--border); background:#010911; flex-shrink:0; }
.code-anim-status-text { font-family:'Orbitron',monospace; font-size:.6rem; letter-spacing:.2em; color:var(--accent3); animation:pulse 1s infinite; }

/* ===== COMMS / MESSAGES ===== */
.comms-sidebar { width: 260px; background: #020d15; border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; }
.comms-header { font-size: .6rem; letter-spacing: .3em; color: var(--dim); padding: 16px; border-bottom: 1px solid var(--border); }
.comms-channel { display: flex; align-items: center; gap: 12px; padding: 14px 16px; cursor: pointer; transition: all .2s; border-left: 2px solid transparent; }
.comms-channel:hover { background: #051828; }
.comms-channel.active { background: #061d2d; border-left-color: var(--accent); }
.comms-icon { font-size: 1.2rem; }
.comms-name { font-family: 'Orbitron', monospace; font-size: .65rem; letter-spacing: .15em; font-weight: bold; }
.comms-chat-area { flex: 1; display: flex; flex-direction: column; background: #010609; overflow: hidden; position: relative; }
.comms-chat-header { font-family: 'Orbitron', monospace; font-size: .7rem; letter-spacing: .2em; padding: 16px; border-bottom: 1px solid var(--border); background: #020a0f; }
.comms-chat-scroll { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.chat-message { max-width: 80%; padding: 14px 18px; position: relative; line-height: 1.6; }
.chat-message.faction { align-self: flex-start; background: #03141f; border-left: 2px solid; border-left-color: inherit; }
.chat-message.player { align-self: flex-end; background: #020d15; border-right: 2px solid var(--dim); text-align: right; }
.chat-sender { font-family: 'Orbitron', monospace; font-size: .6rem; letter-spacing: .1em; margin-bottom: 6px; }
.chat-text { font-family: 'Share Tech Mono', monospace; font-size: .9rem; color: #fff; }
`;
