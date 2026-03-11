import { useState, useEffect, useRef, useCallback } from "react";
import { WRAITH_TOOLS, isFile, getFileContent, getDirEntries } from "./data";
import { audioSystem } from "./audioEngine";

export default function NetworkExplorer({
    missionData, availableTools, onComplete, onFail, onDiscovery, onToolUsed, threat
}) {
    const [connectedNode, setConnectedNode] = useState(null);
    const [path, setPath] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [lines, setLines] = useState([
        { t: "accent", v: `WRAITH-KIT // MISSION: ${missionData.objective}` },
        { t: "dim", v: "─".repeat(50) },
    ]);
    const [pwPrompt, setPwPrompt] = useState(null);
    const [pwInput, setPwInput] = useState("");
    const [pwError, setPwError] = useState("");
    const [tutStep, setTutStep] = useState(0);
    const [objectivesFound, setObjectivesFound] = useState([]);
    const [discoveryToast, setDiscoveryToast] = useState(null);
    const [typing, setTyping] = useState(false);
    const [decryptedFiles, setDecryptedFiles] = useState([]);
    const endRef = useRef();
    const toastRef = useRef();
    const isTutorial = !!missionData.tutorial;

    useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

    const showToast = useCallback((msg) => {
        setDiscoveryToast(msg);
        clearTimeout(toastRef.current);
        toastRef.current = setTimeout(() => setDiscoveryToast(null), 3000);
    }, []);

    function addLines(newLines, cb) {
        setTyping(true);
        let i = 0;
        const tick = () => {
            if (i >= newLines.length) { setTyping(false); cb?.(); return; }
            setLines(l => [...l, newLines[i]]);
            i++;
            setTimeout(tick, 40 + Math.random() * 25);
        };
        tick();
    }

    // Get the filesystem entry at the current path
    function getAtPath(node, p) {
        let current = node.fs;
        for (const seg of p) {
            if (!current || typeof current !== "object") return null;
            current = current[seg];
        }
        return current;
    }

    function connectToNode(nodeId) {
        const node = missionData.nodes.find(n => n.id === nodeId);
        if (!node) return;
        if (node.locked) {
            setPwPrompt(node);
            setPwInput("");
            setPwError("");
            return;
        }
        doConnect(node);
    }

    function doConnect(node) {
        setConnectedNode(node);
        setPath([]);
        setSelectedFile(null);
        addLines([
            { t: "dim", v: "" },
            { t: "cmd", v: `> CONNECT ${node.ip} (${node.name})` },
            { t: "ok", v: `[CONNECTED] ${node.name} — ${node.desc}` },
            { t: "dim", v: "Type 'ls' equivalent — browse the filesystem below." },
        ]);
    }

    function submitPassword() {
        if (!pwPrompt) return;
        if (pwInput === pwPrompt.password) {
            audioSystem.playSuccess();
            const node = { ...pwPrompt, locked: false };
            // Update the mission data's node to unlocked
            const idx = missionData.nodes.findIndex(n => n.id === node.id);
            if (idx >= 0) missionData.nodes[idx].locked = false;
            setPwPrompt(null);
            setPwInput("");
            doConnect(missionData.nodes[idx] || node);
            showToast("🔓 ACCESS GRANTED");
        } else {
            audioSystem.playError();
            setPwError("ACCESS DENIED — Wrong password");
            addLines([{ t: "err", v: `[DENIED] Authentication failed for ${pwPrompt.name}` }]);
        }
    }

    function navigateTo(name) {
        if (!connectedNode) return;
        const entry = getAtPath(connectedNode, [...path, name]);
        if (entry === undefined || entry === null) return;

        if (isFile(entry)) {
            setSelectedFile(name);
            const content = getFileContent(entry);
            const isEnc = typeof entry === "object" && entry._encrypted && !decryptedFiles.includes([...path, name].join("/"));
            addLines([
                { t: "cmd", v: `> cat ${[...path, name].join("/")}` },
                { t: isEnc ? "warn" : "dim", v: isEnc ? "[ENCRYPTED FILE — Use CIPHERHACK to decrypt]" : `--- ${name} ---` },
            ]);
            // Check if this file is a mission objective
            if (missionData.objectives) {
                const obj = missionData.objectives.find(o => o.file === name && o.node === connectedNode.id && !objectivesFound.includes(o.id));
                if (obj) {
                    audioSystem.playSuccess();
                    setObjectivesFound(prev => [...prev, obj.id]);
                    showToast(`📦 FRAGMENT FOUND: ${name}`);
                    addLines([
                        { t: "dim", v: "" },
                        { t: "ok", v: `[FRAGMENT FOUND] ${name}` },
                    ]);
                    // Check if all objectives complete
                    const allFound = missionData.objectives.every(o =>
                        [...objectivesFound, obj.id].includes(o.id)
                    );
                    if (allFound) {
                        setTimeout(() => {
                            addLines(missionData.completionText || [{ t: "ok", v: "[MISSION COMPLETE]" }], () => {
                                setTimeout(() => onComplete(), 2000);
                            });
                        }, 500);
                    }
                }
            }
        } else {
            // It's a directory
            setPath(p => [...p, name]);
            setSelectedFile(null);
            addLines([{ t: "cmd", v: `> cd ${name}/` }]);
        }
    }

    function goUp() {
        if (path.length === 0) return;
        setPath(p => p.slice(0, -1));
        setSelectedFile(null);
        addLines([{ t: "cmd", v: "> cd .." }]);
    }

    function disconnect() {
        setConnectedNode(null);
        setPath([]);
        setSelectedFile(null);
        addLines([
            { t: "dim", v: "" },
            { t: "warn", v: "[DISCONNECTED]" },
        ]);
    }

    function useTool(toolId) {
        if (typing) return;
        if (isTutorial) {
            // Guided mode — only accept the correct tool for the current step
            const step = missionData.tutorial[tutStep];
            if (!step || step.tool !== toolId) {
                audioSystem.playError();
                addLines([{ t: "warn", v: `[WRAITH-KIT] Not the right tool for this step. ${step ? `Try ${step.tool}.` : ""}` }]);
                return;
            }
            // If step requires a specific file to be selected
            if (step.requireFile && selectedFile !== step.requireFile) {
                audioSystem.playError();
                addLines([{ t: "warn", v: `[WRAITH-KIT] Navigate to ${step.requireFile} first.` }]);
                return;
            }
            // If step requires being on a specific node
            if (step.node && (!connectedNode || connectedNode.id !== step.node)) {
                audioSystem.playError();
                addLines([{ t: "warn", v: `[WRAITH-KIT] Connect to the right node first.` }]);
                return;
            }
            // Execute step
            addLines(step.output, () => {
                if (step.discovery) {
                    onDiscovery(step.discovery);
                    showToast(`📋 ${step.discovery.type}: ${step.discovery.value}`);
                }
                // Decrypt file if CIPHERHACK was used
                if (toolId === "CIPHERHACK" && step.requireFile) {
                    const filePath = [...path, step.requireFile].join("/");
                    setDecryptedFiles(prev => [...prev, filePath]);
                }
                if (step.afterText) {
                    setTimeout(() => {
                        addLines([{ t: "dim", v: "" }, { t: "accent", v: step.afterText }]);
                    }, 300);
                }
                if (step.triggersEMP) {
                    onToolUsed("EMP_TRIGGER");
                    return;
                }
                setTutStep(s => s + 1);
                onToolUsed(toolId);
            });
        } else {
            // Free mode — use tool on current context
            switch (toolId) {
                case "PROBE":
                    if (!connectedNode) {
                        audioSystem.playError();
                        addLines([{ t: "warn", v: "[PROBE] Connect to a node first." }]);
                        return;
                    }
                    addLines([
                        { t: "cmd", v: `> PROBE — Scanning ${connectedNode.name}...` },
                        { t: "dim", v: "Discovering ports and services..." },
                        { t: "ok", v: `[SCAN] ${connectedNode.name} (${connectedNode.ip})` },
                        { t: "ok", v: `[SCAN] Filesystem: ${Object.keys(connectedNode.fs).length} root directories` },
                        { t: "ok", v: "[PROBE COMPLETE]" },
                    ]);
                    break;
                case "CIPHERHACK":
                    if (selectedFile) {
                        const entry = getAtPath(connectedNode, [...path, selectedFile]);
                        if (entry && typeof entry === "object" && entry._encrypted) {
                            audioSystem.playSuccess();
                            const filePath = [...path, selectedFile].join("/");
                            setDecryptedFiles(prev => [...prev, filePath]);
                            addLines([
                                { t: "cmd", v: `> CIPHERHACK — Decrypting ${selectedFile}...` },
                                { t: "ok", v: "[DECRYPTED]" },
                            ]);
                        } else {
                            audioSystem.playError();
                            addLines([{ t: "warn", v: "[CIPHERHACK] This file is not encrypted." }]);
                        }
                    } else {
                        audioSystem.playError();
                        addLines([{ t: "warn", v: "[CIPHERHACK] Select an encrypted file first." }]);
                    }
                    break;
                default:
                    addLines([
                        { t: "cmd", v: `> ${toolId} — Executing...` },
                        { t: "ok", v: `[${toolId}] Operation complete.` },
                    ]);
            }
            onToolUsed(toolId);
        }
    }

    // Current directory contents
    const currentDir = connectedNode ? getAtPath(connectedNode, path) : null;
    const dirEntries = currentDir && !isFile(currentDir) ? getDirEntries(currentDir) : [];

    // Current file content for viewer
    const fileContent = (() => {
        if (!selectedFile || !connectedNode) return null;
        const entry = getAtPath(connectedNode, [...path, selectedFile]);
        if (!entry) return null;
        const filePath = [...path, selectedFile].join("/");
        if (typeof entry === "object" && entry._encrypted) {
            return decryptedFiles.includes(filePath) ? entry._decrypted : entry._c;
        }
        return getFileContent(entry);
    })();

    // Tutorial hint
    const tutHint = isTutorial && missionData.tutorial[tutStep] ? missionData.tutorial[tutStep] : null;

    // Determine which tools to show
    const toolsToShow = isTutorial
        ? WRAITH_TOOLS // Show all tools in tutorial
        : WRAITH_TOOLS.filter(t => availableTools.includes(t.id));

    const tClass = { cmd: "t-cmd", ok: "t-ok", err: "t-err", warn: "t-warn", dim: "t-dim", accent: "t-accent", sys: "t-sys" };

    return (
        <div className="net-explorer" style={{ position: "relative" }}>
            {/* Password prompt overlay */}
            {pwPrompt && (
                <div className="pw-prompt">
                    <div className="pw-box">
                        <div className="pw-title">🔒 {pwPrompt.name}</div>
                        <div style={{ fontSize: ".7rem", color: "var(--dim)", marginBottom: 12 }}>
                            Enter password to connect
                        </div>
                        {pwError && <div className="pw-error">{pwError}</div>}
                        <input
                            className="pw-input"
                            type="text"
                            value={pwInput}
                            onChange={e => setPwInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && submitPassword()}
                            placeholder="Password..."
                            autoFocus
                        />
                        <div className="pw-buttons">
                            <button className="btn-secondary" style={{ fontSize: ".6rem", padding: "8px 16px" }}
                                onClick={() => setPwPrompt(null)}>CANCEL</button>
                            <button className="btn-primary" style={{ fontSize: ".6rem", padding: "8px 16px" }}
                                onClick={submitPassword}>CONNECT</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Discovery toast */}
            {discoveryToast && <div className="discovery-toast">{discoveryToast}</div>}

            {/* Top bar */}
            <div className="net-topbar">
                <span className="net-topbar-label">NODE:</span>
                <span className="net-topbar-node">
                    {connectedNode ? `${connectedNode.name} (${connectedNode.ip})` : "DISCONNECTED"}
                </span>
                {connectedNode && (
                    <button className="btn-secondary" style={{ marginLeft: "auto", fontSize: ".55rem", padding: "4px 10px" }}
                        onClick={disconnect}>DISCONNECT</button>
                )}
            </div>

            <div className="net-content">
                {/* Network map panel */}
                <div className="net-map-panel">
                    <div className="net-map-title">NETWORK MAP</div>
                    {missionData.nodes.map(node => (
                        <div
                            key={node.id}
                            className={`node-card ${connectedNode?.id === node.id ? "connected" : ""} ${node.locked ? "locked" : ""}`}
                            onClick={() => !typing && (connectedNode?.id === node.id ? null : connectToNode(node.id))}
                        >
                            <div className="node-name">{node.name}</div>
                            <div className="node-ip">{node.ip}</div>
                            <div className={`node-status ${connectedNode?.id === node.id ? "connected" : node.locked ? "locked" : "open"}`}>
                                {connectedNode?.id === node.id ? "◉ CONNECTED" : node.locked ? "🔒 LOCKED" : "○ OPEN"}
                            </div>
                        </div>
                    ))}

                    {/* Mission objectives */}
                    {missionData.objectives && (
                        <div style={{ marginTop: 16 }}>
                            <div className="net-map-title">OBJECTIVES</div>
                            {missionData.objectives.map(obj => (
                                <div key={obj.id} style={{
                                    fontSize: ".62rem", padding: "4px 0", display: "flex", gap: 6, alignItems: "flex-start",
                                    color: objectivesFound.includes(obj.id) ? "var(--accent3)" : "var(--dim)"
                                }}>
                                    <span>{objectivesFound.includes(obj.id) ? "✓" : "○"}</span>
                                    <span>{obj.desc}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Terminal + File browser area */}
                <div className="terminal-area">
                    {/* Tutorial hint */}
                    {tutHint && !typing && (
                        <div className="guided-hint">
                            <div className="guided-label">WRAITH-KIT GUIDE — STEP {tutStep + 1}/{missionData.tutorial.length}</div>
                            <div className="guided-text">{tutHint.instruction}</div>
                        </div>
                    )}

                    {/* Terminal output */}
                    <div className="term-output">
                        {lines.map((l, i) => (
                            <div key={i} className={`t-line ${l && l.t ? tClass[l.t] : ""}`}>{l ? l.v : ""}</div>
                        ))}
                        {typing && <div className="t-line t-dim">▌</div>}
                        <div ref={endRef} />
                    </div>

                    {/* File browser */}
                    {connectedNode && !typing && (
                        <div className="file-browser">
                            <div className="file-path">
                                /{path.join("/")}
                                {selectedFile && `/${selectedFile}`}
                            </div>

                            {/* File content viewer */}
                            {fileContent && (
                                <div style={{
                                    background: "#000d14", border: "1px solid var(--border)",
                                    padding: 10, marginBottom: 8, fontSize: ".7rem", whiteSpace: "pre-wrap",
                                    maxHeight: 120, overflowY: "auto", lineHeight: 1.6,
                                    color: "var(--text)", fontFamily: "Share Tech Mono, monospace"
                                }}>
                                    {fileContent}
                                </div>
                            )}

                            {/* Directory listing */}
                            {path.length > 0 && (
                                <div className="file-item dir" onClick={goUp}>
                                    <span className="fi-icon">↩</span>
                                    <span>..</span>
                                </div>
                            )}
                            {dirEntries.map(name => {
                                const entry = currentDir[name];
                                const isF = isFile(entry);
                                const isObj = missionData.objectives?.find(o => o.file === name && o.node === connectedNode.id);
                                return (
                                    <div
                                        key={name}
                                        className={`file-item ${isF ? "file" : "dir"} ${isObj ? "has-discovery" : ""}`}
                                        onClick={() => navigateTo(name)}
                                        style={selectedFile === name ? { background: "#051828", borderLeftColor: "var(--accent)" } : {}}
                                    >
                                        <span className="fi-icon">{isF ? "📄" : "📁"}</span>
                                        <span>{name}</span>
                                        {isF && typeof entry === "object" && entry._encrypted && !decryptedFiles.includes([...path, name].join("/")) && (
                                            <span style={{ marginLeft: "auto", fontSize: ".5rem", color: "var(--accent2)" }}>🔒 ENC</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Tool bar */}
                    <div className="tool-bar">
                        <span style={{ fontSize: ".5rem", color: "var(--dim)", letterSpacing: ".2em", alignSelf: "center", marginRight: 4 }}>
                            TOOLS:
                        </span>
                        {toolsToShow.map(tool => {
                            const isAvail = isTutorial || availableTools.includes(tool.id);
                            const isHighlight = tutHint && tutHint.tool === tool.id;
                            return (
                                <button
                                    key={tool.id}
                                    className={`tool-btn ${isHighlight ? "highlight" : isAvail ? "available" : "disabled"}`}
                                    onClick={() => isAvail && useTool(tool.id)}
                                    disabled={!isAvail || typing}
                                    title={tool.desc}
                                >
                                    {tool.icon} {tool.id}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
