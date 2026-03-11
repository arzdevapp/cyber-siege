// =====================================================
// WRAITH-KIT TOOL DEFINITIONS
// =====================================================
export const WRAITH_TOOLS = [
    { id: "PROBE", icon: "🔍", name: "PROBE", desc: "Network scanner — discovers ports, services, IPs", cat: "Recon" },
    { id: "CIPHERHACK", icon: "🔐", name: "CIPHERHACK", desc: "Encryption breaker — cracks passwords, decrypts files", cat: "Crypto" },
    { id: "GHOSTWIRE", icon: "📡", name: "GHOSTWIRE", desc: "Packet interceptor — captures and analyzes traffic", cat: "Intercept" },
    { id: "TRACEKILL", icon: "🛡", name: "TRACEKILL", desc: "Anti-detection — erases logs, counters Seeker-Bots", cat: "Stealth" },
    { id: "NEEDLEPOINT", icon: "💉", name: "NEEDLEPOINT", desc: "Precision injector — exploits databases", cat: "Exploit" },
    { id: "LOCKPICK", icon: "🔓", name: "LOCKPICK", desc: "Brute-force cracker — breaks login credentials", cat: "Brute Force" },
    { id: "BACKDOOR", icon: "🚪", name: "BACKDOOR", desc: "Remote access — opens persistent shells", cat: "Access" },
    { id: "BOMBSHELL", icon: "💣", name: "BOMBSHELL", desc: "Payload deployer — injects data, disrupts systems", cat: "Payload" },
    { id: "PHANTOM", icon: "👻", name: "PHANTOM", desc: "Data exfiltration — covert file transfer", cat: "Exfil" },
    { id: "ROOTKIT", icon: "⚡", name: "ROOTKIT", desc: "Privilege escalation — gains root access", cat: "Escalation" },
];

// =====================================================
// FACTIONS
// =====================================================
export const FACTIONS = {
    legion: { id: "legion", name: "LEGION / GHOSTFACE", icon: "👁️", color: "var(--accent)" },
    triads: { id: "triads", name: "NEON DRAGON TRIAD", icon: "🐉", color: "#ff2a55" },  // Red-pink
    wacker: { id: "wacker", name: "WACKER SYNDICATE", icon: "🃏", color: "#f2c94c" },   // Yellow/Gold
    xsec: { id: "xsec", name: "XSEC CORP", icon: "🛡️", color: "var(--accent3)" },     // Cyan
};

// =====================================================
// FACTION CHAT SCRIPTS (Unlocked upon completing certain missions)
// =====================================================
export const COMM_CHANNELS = {
    legion: [
        { unlockAfter: "first-light", sender: "GHOSTFACE", text: "You made it. That EMP wiped out 90% of my data and left my hardware crippled. But you're alive." },
        { unlockAfter: "first-light", sender: "PLAYER", text: "Barely. What now?" },
        { unlockAfter: "first-light", sender: "GHOSTFACE", text: "We rebuild. Then we find out who did this. Reconnect to the Reef and salvage what you can." },
        
        { unlockAfter: "the-reef", sender: "GHOSTFACE", text: "Good job finding PROBE. You'll need it. Did you see that orphan data cache you found?" },
        { unlockAfter: "the-reef", sender: "PLAYER", text: "Yeah. Three different encryption signatures routing through Nova Terra. That's not normal traffic." },
        { unlockAfter: "GHOSTFACE", sender: "GHOSTFACE", text: "Exactly. The Reef was just the highway. The real target is much bigger. Keep digging." },
        
        { unlockAfter: "backbone", sender: "GHOSTFACE", text: "It's worse than I thought. The encrypted data flowing through the backbone... it's military." },
        { unlockAfter: "backbone", sender: "PLAYER", text: "Weapon blueprints?" },
        { unlockAfter: "backbone", sender: "GHOSTFACE", text: "Deployment codes. Someone is staging a silent takeover of Nova Terra's defense grid. You need to crack those secondary nodes." }
    ],
    triads: [
        { unlockAfter: "dead-drop", sender: "RED_LOTUS", text: "Little ghost. We saw your footprint on the relay. You move well." },
        { unlockAfter: "dead-drop", sender: "PLAYER", text: "Who is this?" },
        { unlockAfter: "dead-drop", sender: "RED_LOTUS", text: "The Dragon. We run the black market here. We have a problem with some noisy signals interfering with our drops. We'll pay if you clear them out." },
        
        { unlockAfter: "signal-ghost", sender: "RED_LOTUS", text: "Impressive work. The interference is gone. Our drops are flowing again. We will remember this favor, ghost." }
    ],
    wacker: [
        { unlockAfter: "signal-ghost", sender: "JESTER", text: "Yo yo yo! Heard you've been blowing holes in the Reef's firewall! Whaaaat a mess!" },
        { unlockAfter: "signal-ghost", sender: "PLAYER", text: "Are you... a clown?" },
        { unlockAfter: "signal-ghost", sender: "JESTER", text: "I'm a visionary! Wacker Syndicate at your service! We like chaos. Wanna help us make some in the Clean Room?" },
        
        { unlockAfter: "mad-tea-party", sender: "JESTER", text: "Hahahaha! You actually did it! You blew the lid right off that tea party! Absolute legend!" }
    ],
    xsec: [
        { unlockAfter: "clean-room", sender: "AGENT_SMITH", text: "Attention operative. This is XSEC Cyber-Defense division. We noticed your unsanctioned access." },
        { unlockAfter: "clean-room", sender: "PLAYER", text: "Are you arresting me?" },
        { unlockAfter: "clean-room", sender: "AGENT_SMITH", text: "Negative. Your skills are... adequate. We need a freelancer who doesn't exist on paper to handle a sensitive matter involving the Silk Road sector. Do this for us, and we'll ignore your recent transgressions." },
        
        { unlockAfter: "silk-road", sender: "AGENT_SMITH", text: "Contract fulfilled. We've scrubbed your ID from the intrusion logs. By the way... if you ever happen to run into a hacker named Ghostface, XSEC would pay handsomely for his whereabouts." },
        { unlockAfter: "silk-road", sender: "PLAYER", text: "I'll keep that in mind." }
    ]
};

// =====================================================
// MISSION METADATA — All 20 missions
// =====================================================
export const MISSIONS = [
    { id: "first-light", num: 1, name: "FIRST LIGHT", subtitle: "The Routine", faction: "legion", icon: "🌅", nodes: 2, act: 1, toolReward: null, unlocks: "the-reef" },
    { id: "the-reef", num: 2, name: "THE REEF", subtitle: "Data Crumbs", faction: "legion", icon: "🪸", nodes: 3, act: 1, toolReward: "PROBE", unlocks: "dead-drop" },
    { id: "dead-drop", num: 3, name: "DEAD DROP", subtitle: "Encrypted Whispers", faction: "legion", icon: "📦", nodes: 3, act: 1, toolReward: "CIPHERHACK", unlocks: "signal-ghost" },
    { id: "signal-ghost", num: 4, name: "SIGNAL GHOST", subtitle: "Three Voices", faction: "triads", icon: "📻", nodes: 4, act: 1, toolReward: "GHOSTWIRE", unlocks: "clean-room" },
    { id: "clean-room", num: 5, name: "CLEAN ROOM", subtitle: "First Contact", faction: "wacker", icon: "🧹", nodes: 4, act: 1, toolReward: "TRACEKILL", unlocks: "backbone" },
    { id: "backbone", num: 6, name: "BACKBONE", subtitle: "The Watchers", faction: "legion", icon: "🦴", nodes: 5, act: 2, toolReward: "NEEDLEPOINT", unlocks: "iron-curtain" },
    { id: "iron-curtain", num: 7, name: "IRON CURTAIN", subtitle: "War Machines", faction: "legion", icon: "⚙️", nodes: 5, act: 2, toolReward: "LOCKPICK", unlocks: "silk-road" },
    { id: "silk-road", num: 8, name: "SILK ROAD", subtitle: "Manufactured Truth", faction: "xsec", icon: "🕸", nodes: 6, act: 2, toolReward: "BACKDOOR", unlocks: "the-handshake" },
    { id: "the-handshake", num: 9, name: "THE HANDSHAKE", subtitle: "The Deal", faction: "legion", icon: "🤝", nodes: 6, act: 2, toolReward: null, unlocks: "mad-tea-party" },
    { id: "mad-tea-party", num: 10, name: "MAD TEA PARTY", subtitle: "Four Hats", faction: "wacker", icon: "🎩", nodes: 7, act: 2, toolReward: "BOMBSHELL", unlocks: "crown-jewels" },
    { id: "crown-jewels", num: 11, name: "CROWN JEWELS", subtitle: "The Legislature", faction: "legion", icon: "👑", nodes: 7, act: 3, toolReward: "PHANTOM", unlocks: "factory-floor" },
    { id: "factory-floor", num: 12, name: "FACTORY FLOOR", subtitle: "Assembly Line", faction: "wacker", icon: "🏭", nodes: 8, act: 3, toolReward: null, unlocks: "market-crash" },
    { id: "market-crash", num: 13, name: "MARKET CRASH", subtitle: "Falling Numbers", faction: "triads", icon: "📉", nodes: 8, act: 3, toolReward: "ROOTKIT", unlocks: "ghost-story" },
    { id: "ghost-story", num: 14, name: "GHOST STORY", subtitle: "The Truth", faction: "legion", icon: "👤", nodes: 9, act: 3, toolReward: null, unlocks: "the-traitor" },
    { id: "the-traitor", num: 15, name: "THE TRAITOR", subtitle: "Red Hat", faction: "legion", icon: "🎭", nodes: 9, act: 3, toolReward: null, unlocks: "blackout" },
    { id: "blackout", num: 16, name: "BLACKOUT", subtitle: "Blind the Watchers", faction: "legion", icon: "🔌", nodes: 8, act: 4, toolReward: null, unlocks: "scorched-earth" },
    { id: "scorched-earth", num: 17, name: "SCORCHED EARTH", subtitle: "Melt the Forge", faction: "legion", icon: "🔥", nodes: 9, act: 4, toolReward: null, unlocks: "free-press" },
    { id: "free-press", num: 18, name: "FREE PRESS", subtitle: "Truth Broadcast", faction: "legion", icon: "📺", nodes: 9, act: 4, toolReward: null, unlocks: "falling-bridge" },
    { id: "falling-bridge", num: 19, name: "FALLING BRIDGE", subtitle: "Stop the War", faction: "legion", icon: "🌉", nodes: 10, act: 4, toolReward: null, unlocks: "ghost-protocol" },
    { id: "ghost-protocol", num: 20, name: "GHOST PROTOCOL", subtitle: "Who Are You?", faction: "legion", icon: "💀", nodes: 10, act: 4, toolReward: null, unlocks: null },
];

// =====================================================
// Helper: filesystem entry type checks
// =====================================================
export function isFile(entry) {
    return typeof entry === "string" || (typeof entry === "object" && entry !== null && "_c" in entry);
}
export function getFileContent(entry) {
    if (typeof entry === "string") return entry;
    if (entry && entry._c) return entry._c;
    return "";
}
export function getDirEntries(dir) {
    if (!dir || typeof dir !== "object") return [];
    return Object.keys(dir).filter(k => !k.startsWith("_"));
}

// =====================================================
// MISSION 1: FIRST LIGHT — Tutorial + EMP
// =====================================================
export const MISSION_1_DATA = {
    id: "first-light",
    objective: "Complete the system sweep, then survive.",
    nodes: [
        {
            id: "reef-relay",
            name: "REEF-RELAY-07",
            ip: "10.44.0.5",
            locked: false,
            password: null,
            desc: "Nova Terra Reef — Public Relay Server",
            fs: {
                home: {
                    admin: {
                        "schedule.txt": "=== REEF MAINTENANCE SCHEDULE ===\nMonday:    Relay cache flush\nTuesday:   Backbone integrity check\nWednesday: MAINT-03 diagnostic run\nThursday:  Packet buffer cleanup\n\nNOTE: MAINT-03 login updated last week.\nNew credentials in the encrypted log.",
                        "maint_access.log.enc": {
                            _c: "[ENCRYPTED — AES-256]\nUse CIPHERHACK to decrypt this file.",
                            _encrypted: true,
                            _decrypted: "=== MAINTENANCE ACCESS LOG ===\nEntry 47: MAINT-03 login credentials updated\n  User: reef_admin\n  Pass: reef_m4int\n  Node: 10.44.0.12\n\nEntry 48: Backbone trunk 7-DELTA showing anomalous traffic.\nLogged for review. Probably nothing."
                        }
                    },
                    guest: {
                        "welcome.txt": "Welcome to the Nova Terra Reef Public Relay.\nThis server handles backbone routing for the Reef district.\n\nFor admin access, contact SysOps."
                    }
                },
                var: {
                    log: {
                        "access.log": "[ 21:04:33 ] Connection from 10.44.0.12 (REEF-MAINT-03)\n[ 21:04:34 ] Auth: reef_admin — OK\n[ 21:12:01 ] Connection from 192.168.1.100 (UNKNOWN)\n[ 21:12:02 ] Auth: FAILED — unknown user\n[ 21:15:44 ] Backbone trunk 7-DELTA traffic spike logged",
                        "system.log": "[ BOOT ] REEF-RELAY-07 initialized\n[ OK   ] nginx started on port 80\n[ OK   ] SSH daemon on port 22\n[ OK   ] MySQL on port 3306\n[ WARN ] Trunk 7-DELTA latency: 340ms (above threshold)"
                    }
                }
            }
        },
        {
            id: "reef-maint",
            name: "REEF-MAINT-03",
            ip: "10.44.0.12",
            locked: true,
            password: "reef_m4int",
            desc: "Nova Terra Reef — Maintenance Hub",
            fs: {
                home: {
                    admin: {
                        "diagnostic.sh": "#!/bin/bash\n# REEF-MAINT-03 Diagnostic Suite\n# Run weekly per schedule\n\necho \"Checking backbone integrity...\"\nping -c 4 10.44.0.5\necho \"Checking SCADA interface...\"\ncurl -s http://localhost:8080/status\necho \"All systems nominal.\"",
                        "todo.txt": "- Fix the intermittent packet loss on trunk 7\n- Update the relay firmware (overdue by 3 months!)\n- Ask SysOps about that weird traffic pattern\n  Could be nothing. Could be a sniffer.\n  Either way, not my problem."
                    }
                },
                config: {
                    "reef.conf": "# REEF-MAINT-03 Configuration\nnode_id=MAINT-03\nbackbone_trunk=7-DELTA\nrelay_partner=10.44.0.5\nscada_bridge=enabled\nfirewall=minimal\n\n# WARNING: This node has direct SCADA bridge access.\n# Do NOT expose to external networks.",
                    "network.map": "=== LOCAL REEF TOPOLOGY ===\n\n  [RELAY-07]---[MAINT-03]\n   10.44.0.5    10.44.0.12\n      |             |\n   backbone     SCADA bridge\n   trunk 7Δ     (restricted)"
                }
            }
        }
    ],
    // Guided tutorial steps for Mission 1
    tutorial: [
        {
            instruction: "Let's start with a scan. Click PROBE.",
            tool: "PROBE",
            node: "reef-relay",
            output: [
                { t: "cmd", v: "> PROBE v1.0 — Scanning REEF-RELAY-07 (10.44.0.5)..." },
                { t: "dim", v: "Discovering ports and services..." },
                { t: "ok", v: "PORT 22/tcp    SSH       OpenSSH 8.9" },
                { t: "ok", v: "PORT 80/tcp    HTTP      nginx/1.22" },
                { t: "ok", v: "PORT 3306/tcp  MySQL     5.7.39" },
                { t: "dim", v: "" },
                { t: "warn", v: "NODE DETECTED: 10.44.0.12 (REEF-MAINT-03)" },
                { t: "ok", v: "[PROBE COMPLETE] 3 ports found, 1 connected node" },
            ],
            discovery: { type: "IP ADDRESS", label: "REEF-MAINT-03", value: "10.44.0.12" },
            afterText: "Good. Now let's look around. Browse the files — check /home/admin.",
        },
        {
            instruction: "There's an encrypted file. Click CIPHERHACK to break it.",
            tool: "CIPHERHACK",
            node: "reef-relay",
            requireFile: "maint_access.log.enc",
            output: [
                { t: "cmd", v: "> CIPHERHACK v1.0 — Breaking AES-256 on maint_access.log.enc..." },
                { t: "dim", v: "Analyzing cipher structure... AES-256-CBC detected" },
                { t: "dim", v: "Running key derivation attack..." },
                { t: "warn", v: "[████████████████] 100% — KEY FOUND" },
                { t: "ok", v: "[DECRYPTED] maint_access.log.enc" },
            ],
            discovery: { type: "PASSWORD", label: "REEF-MAINT-03 Login", value: "reef_m4int" },
            afterText: "We've got the MAINT-03 password. Save it and connect to that node.",
        },
        {
            instruction: "Now let's intercept traffic. Click GHOSTWIRE.",
            tool: "GHOSTWIRE",
            node: "reef-relay",
            output: [
                { t: "cmd", v: "> GHOSTWIRE v1.0 — Capturing on eth0..." },
                { t: "dim", v: "Filter: all traffic on backbone trunk 7-DELTA" },
                { t: "sys", v: "[001] TCP 10.44.0.12 → 10.44.0.5 : HEARTBEAT" },
                { t: "sys", v: "[002] TCP 10.44.0.5  → 10.44.0.12 : ACK" },
                { t: "warn", v: "[003] TCP UNKNOWN → backbone : ENCRYPTED BURST (1.2MB)" },
                { t: "dim", v: "" },
                { t: "ok", v: "[CAPTURED] 847 packets — anomalous traffic on trunk 7-DELTA" },
                { t: "warn", v: "[FLAG] That encrypted burst doesn't match any known Reef protocol." },
            ],
            afterText: "Interesting. Something's using this backbone for traffic that shouldn't be here. Let's cover our tracks before we move on.",
        },
        {
            instruction: "Cover our tracks. Click TRACEKILL.",
            tool: "TRACEKILL",
            node: "reef-relay",
            output: [
                { t: "cmd", v: "> TRACEKILL v1.0 — Scrubbing access logs..." },
                { t: "dim", v: "Removing entries matching our session ID..." },
                { t: "ok", v: "[SCRUBBED] /var/log/access.log — 3 entries removed" },
                { t: "ok", v: "[SPOOFED] Origin masked as routine backbone check" },
                { t: "ok", v: "[CLEAN] No trace of our access remains" },
            ],
            afterText: "Good. Now use that password to connect to REEF-MAINT-03.",
        },
        {
            instruction: "You're in. Click NEEDLEPOINT to pull the node's data.",
            tool: "NEEDLEPOINT",
            node: "reef-maint",
            output: [
                { t: "cmd", v: "> NEEDLEPOINT v1.0 — Extracting node configuration database..." },
                { t: "dim", v: "Querying internal SQLite store..." },
                { t: "ok", v: "[ROW 1] node_id=MAINT-03  type=infrastructure  scada=true" },
                { t: "ok", v: "[ROW 2] relay_partner=RELAY-07  trunk=7-DELTA" },
                { t: "warn", v: "[ROW 3] last_external_access=UNKNOWN  timestamp=21:12:01" },
                { t: "ok", v: "[EXTRACTED] 3 records from node config DB" },
            ],
            afterText: "This node has SCADA bridge access. Let's try some more tools.",
        },
        {
            instruction: "Crack the backup admin auth. Click LOCKPICK.",
            tool: "LOCKPICK",
            node: "reef-maint",
            output: [
                { t: "cmd", v: "> LOCKPICK v1.0 — Brute-forcing secondary auth on MAINT-03..." },
                { t: "dim", v: "Wordlist: nova_terra_common.txt (142,000 entries)" },
                { t: "dim", v: "[ATTEMPT] admin:password1 — FAIL" },
                { t: "dim", v: "[ATTEMPT] admin:reef2031 — FAIL" },
                { t: "ok", v: "[CRACKED] admin:m4int_b4ckup_991 (14 seconds)" },
                { t: "ok", v: "[ACCESS] Backup admin credentials confirmed" },
            ],
            afterText: "Now open a permanent way back in.",
        },
        {
            instruction: "Set up persistent access. Click BACKDOOR.",
            tool: "BACKDOOR",
            node: "reef-maint",
            output: [
                { t: "cmd", v: "> BACKDOOR v1.0 — Installing persistent shell on MAINT-03..." },
                { t: "dim", v: "Injecting reverse shell listener on port 44331..." },
                { t: "ok", v: "[INSTALLED] Backdoor active — can reconnect anytime" },
                { t: "ok", v: "[HIDDEN] Process masked as 'reef_diagnostic_svc'" },
            ],
            afterText: "Let's test the payload system.",
        },
        {
            instruction: "Test the payload system. Click BOMBSHELL.",
            tool: "BOMBSHELL",
            node: "reef-maint",
            output: [
                { t: "cmd", v: "> BOMBSHELL v1.0 — Deploying diagnostic payload to MAINT-03..." },
                { t: "dim", v: "Payload: reef_test_ping.sh (harmless diagnostic)" },
                { t: "ok", v: "[DEPLOYED] Payload executed successfully" },
                { t: "ok", v: "[RESULT] All SCADA endpoints responding — bridge is live" },
            ],
            afterText: "Good. Download the config files before we finish up.",
        },
        {
            instruction: "Download the configs covertly. Click PHANTOM.",
            tool: "PHANTOM",
            node: "reef-maint",
            output: [
                { t: "cmd", v: "> PHANTOM v1.0 — Covert download initiated..." },
                { t: "dim", v: "Tunneling through backbone trunk 7-DELTA..." },
                { t: "ok", v: "[DOWNLOAD] reef.conf (412 bytes)" },
                { t: "ok", v: "[DOWNLOAD] network.map (298 bytes)" },
                { t: "ok", v: "[CLEAN] No transfer logs generated" },
            ],
            afterText: "One last thing. Take full control.",
        },
        {
            instruction: "Take root. Click ROOTKIT.",
            tool: "ROOTKIT",
            node: "reef-maint",
            output: [
                { t: "cmd", v: "> ROOTKIT v1.0 — Escalating privileges on MAINT-03..." },
                { t: "dim", v: "Exploiting kernel module loader..." },
                { t: "ok", v: "[ESCALATED] reef_admin → root" },
                { t: "ok", v: "[ROOT] Full system control on REEF-MAINT-03" },
                { t: "dim", v: "" },
                { t: "accent", v: "You've got root on two Reef nodes." },
                { t: "accent", v: "Not bad for a quiet night, kid." },
                { t: "accent", v: "Don't let it go to your—" },
            ],
            triggersEMP: true,
        },
    ],
};

// =====================================================
// MISSION 2: THE REEF — Recover PROBE
// =====================================================
export const MISSION_2_DATA = {
    id: "the-reef",
    objective: "Find PROBE's code fragment in the Reef wreckage.",
    hint: "The EMP blew open a lot of doors. Start with the damaged relay.",
    nodes: [
        {
            id: "relay-wreck",
            name: "RELAY-07-WRECK",
            ip: "10.44.0.5",
            locked: false,
            password: null,
            desc: "Damaged relay — EMP blew the security wide open",
            fs: {
                home: {
                    admin: {
                        "crash_report.txt": "=== POST-EMP CRASH REPORT ===\nTimestamp: 21:17:44\nEvent: Electromagnetic pulse, source unknown\nDamage: Critical — 94% data corruption\n\nSurviving fragments:\n- Partial system logs (corrupted)\n- Backbone routing table (read-only)\n- Fragment cache: 2 entries detected\n\nNOTE: Emergency backup protocol triggered at 21:17:43\nMirror target: UNKNOWN (external)\n\nSee /recovery/fragments/ for salvageable data.",
                    }
                },
                recovery: {
                    fragments: {
                        "fragment_index.dat": "=== WRAITH-KIT FRAGMENT INDEX ===\nFragment ID: WK-PROBE-001\nStatus: PARTIAL (62% integrity)\nLocation: REEF-CACHE-11 (10.44.0.30)\nAccess: Open (EMP disabled auth)\n\nFragment ID: WK-PROBE-002\nStatus: PARTIAL (38% integrity)\nLocation: REEF-CACHE-11 (10.44.0.30)\nAccess: Open\n\nNOTE: Both fragments needed for reconstruction.\nCombined integrity: 100% — PROBE can be rebuilt.",
                        "routing_table.bak": "=== BACKBONE ROUTING TABLE (PRE-EMP) ===\n10.44.0.5   RELAY-07     [DESTROYED]\n10.44.0.12  MAINT-03     [DESTROYED]\n10.44.0.30  CACHE-11     [STATUS UNKNOWN]\n10.44.0.41  ARCHIVE-02   [STATUS UNKNOWN]\n\nNote: Cache-11 was a temporary data store.\nUsed for overflow during high-traffic events.\nMight still have data if the drives survived the pulse."
                    }
                },
                var: {
                    log: {
                        "emp_event.log": "[21:17:43.001] ALERT: EM field spike detected\n[21:17:43.002] ALERT: Field strength exceeds safe threshold\n[21:17:43.003] EMERGENCY: Initiating backup mirror protocol\n[21:17:43.004] MIRROR: Fragments routing to nearest available nodes\n[21:17:43.005] MIRROR: WK-PROBE → 10.44.0.30\n[21:17:43.006] MIRROR: WK-CIPHER → [EXTERNAL - LOST]\n[21:17:43.007] MIRROR: WK-GHOST → [EXTERNAL - LOST]\n[21:17:43.100] CRITICAL: Power failure. System offline."
                    }
                }
            }
        },
        {
            id: "reef-cache",
            name: "REEF-CACHE-11",
            ip: "10.44.0.30",
            locked: false,
            password: null,
            desc: "Data cache node — EMP-damaged but partially intact",
            fs: {
                data: {
                    cache: {
                        "WK-PROBE-001.frag": "=== WRAITH-KIT FRAGMENT ===\nModule: PROBE (Network Scanner)\nFragment: 1 of 2\nIntegrity: 62%\n\n[BINARY DATA BLOCK]\n0x4E 0x45 0x54 0x53 0x43 0x41 0x4E\n0x50 0x52 0x4F 0x42 0x45 0x2D 0x31\n[END BLOCK]\n\nThis fragment contains PROBE's core scanning engine.\nRequires fragment 002 for full reconstruction.",
                        "WK-PROBE-002.frag": "=== WRAITH-KIT FRAGMENT ===\nModule: PROBE (Network Scanner)\nFragment: 2 of 2\nIntegrity: 38%\n\n[BINARY DATA BLOCK]\n0x53 0x56 0x43 0x44 0x49 0x53 0x43\n0x50 0x52 0x4F 0x42 0x45 0x2D 0x32\n[END BLOCK]\n\nThis fragment contains PROBE's service discovery module.\nCombine with fragment 001 to rebuild PROBE.",
                        "orphan_data.bin": "=== UNIDENTIFIED DATA BLOCK ===\nOrigin: Unknown — possibly Wraith-Kit related\nTimestamp: Pre-EMP\n\nContains partial routing signatures suggesting\nthis cache was used for more than just Reef traffic.\n\nSomeone was routing encrypted data through the Reef backbone.\nThe traffic patterns don't match anything in Nova Terra.\n\nThree distinct encryption signatures detected:\n  - Sig-A: Government-grade (Dominion pattern?)\n  - Sig-B: Military-grade (unknown)\n  - Sig-C: Commercial-grade (financial?)\n\nThis is beyond script-kid territory."
                    }
                },
                config: {
                    "cache.conf": "# REEF-CACHE-11 Configuration\nnode_type=cache\ncapacity=2TB\nstatus=overflow_store\nauth=DISABLED (post-EMP)\n\n# This node was supposed to be decommissioned last month.\n# Nobody bothered. Lucky for us."
                }
            }
        },
        {
            id: "reef-archive",
            name: "REEF-ARCHIVE-02",
            ip: "10.44.0.41",
            locked: true,
            password: "archive_r3boot",
            desc: "Deep archive — requires reboot credentials",
            fs: {
                archive: {
                    "manifesto.log": "=== ARCHIVE-02 DEEP STORAGE ===\nThis archive contains historical Reef backbone data.\nMost of it is routine traffic logs.\n\nBut buried in sector 7 is something else.\nA data pattern that predates the current Reef infrastructure.\nSomeone built a hidden channel through Nova Terra's backbone\nYEARS before the current system was installed.\n\nWhoever did this had root-level access to the entire Reef.\nThat's not script-kid work. That's infrastructure-level.\n\nThe pattern has a signature tag: 'GHOSTFACE-001'\n\nI don't know what that means. But it feels important.",
                    "reboot_log.txt": "=== ARCHIVE-02 REBOOT SEQUENCE ===\nPost-EMP auto-reboot initiated.\nAuth system: DAMAGED — fallback credentials active.\n\nFallback auth: archive_r3boot\n(This was set during initial Reef construction.\n Nobody thought to change it. Classic.)"
                }
            }
        }
    ],
    // For Mission 2, objectives that must be completed
    objectives: [
        { id: "find-frag-1", desc: "Find PROBE fragment 1", file: "WK-PROBE-001.frag", node: "reef-cache", found: false },
        { id: "find-frag-2", desc: "Find PROBE fragment 2", file: "WK-PROBE-002.frag", node: "reef-cache", found: false },
    ],
    completionText: [
        { t: "dim", v: "" },
        { t: "accent", v: "Both PROBE fragments recovered." },
        { t: "accent", v: "Initiating reconstruction..." },
        { t: "dim", v: "" },
        { t: "ok", v: "[REBUILD] Fragment 001: Core scanning engine... OK" },
        { t: "ok", v: "[REBUILD] Fragment 002: Service discovery module... OK" },
        { t: "ok", v: "[COMPILE] Linking modules..." },
        { t: "dim", v: "" },
        { t: "ok", v: "████ PROBE v1.0 — RESTORED ████" },
        { t: "dim", v: "" },
        { t: "accent", v: "One down. Nine to go." },
        { t: "accent", v: "And that orphan data on the cache node..." },
        { t: "accent", v: "Three encryption signatures. Three different sources." },
        { t: "accent", v: "Someone's using Nova Terra as a highway." },
        { t: "accent", v: "We need to find out who. And CIPHERHACK would help." },
    ]
};

// Map mission IDs to their data
export const EXPLORATION_DATA = {
    "first-light": MISSION_1_DATA,
    "the-reef": MISSION_2_DATA,
};
