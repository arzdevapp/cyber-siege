import { useState, useRef } from "react";

export default function Notepad({ entries, onAdd }) {
    const [input, setInput] = useState("");
    const [label, setLabel] = useState("NOTE");
    const bottomRef = useRef();

    function addEntry() {
        if (!input.trim()) return;
        onAdd({ type: label, label: label, value: input.trim() });
        setInput("");
    }

    return (
        <div className="notepad">
            <div className="sp-title" style={{ padding: "12px 12px 0" }}>NOTEPAD</div>
            <div style={{ padding: "4px 12px 8px", fontSize: ".6rem", color: "var(--dim)" }}>
                Save IPs, passwords, and clues here
            </div>
            <div className="notepad-entries">
                {entries.length === 0 && (
                    <div style={{ fontSize: ".65rem", color: "var(--dim)", fontStyle: "italic", padding: 8 }}>
                        No entries yet. Discoveries will appear here.
                    </div>
                )}
                {entries.map((e, i) => (
                    <div key={i} className="notepad-entry">
                        <div className="ne-type">{e.type}</div>
                        <div className="ne-label">{e.label}</div>
                        <div className="ne-value">{e.value}</div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
            <div style={{ padding: "6px 8px", borderTop: "1px solid var(--border)" }}>
                <select
                    value={label}
                    onChange={e => setLabel(e.target.value)}
                    style={{
                        width: "100%", marginBottom: 4, background: "#010911", border: "1px solid var(--border)",
                        color: "var(--accent4)", fontFamily: "Orbitron, monospace", fontSize: ".5rem",
                        padding: "4px 6px", letterSpacing: ".15em", outline: "none"
                    }}
                >
                    <option value="NOTE">NOTE</option>
                    <option value="IP ADDRESS">IP ADDRESS</option>
                    <option value="PASSWORD">PASSWORD</option>
                    <option value="USERNAME">USERNAME</option>
                    <option value="KEY">KEY</option>
                </select>
            </div>
            <div className="notepad-input">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addEntry()}
                    placeholder="Type a note..."
                />
                <button onClick={addEntry}>SAVE</button>
            </div>
        </div>
    );
}
