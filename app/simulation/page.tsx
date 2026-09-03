"use client";

import { useState } from "react";

type Message = {
  personaId: string;
  name: string;
  content: string;
};

export default function Simulation() {
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const startConversation = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    setMessages([]);
    setVisibleCount(0);
    setConversationId(null);

    const res = await fetch("/api/agent-conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, turns: 4 }),
    });

    const data = await res.json();
    const allMessages: Message[] = data.messages || [];
    setMessages(allMessages);
    setConversationId(data.conversationId);
    setLoading(false);

        setVisibleCount(1);
    let count = 1;
    const interval = setInterval(() => {
      count += 1;
      setVisibleCount(count);
      if (count >= allMessages.length) {
        clearInterval(interval);
      }
    }, 8200);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0d0d; color: #f5f4f0; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
        .sim-wrap { max-width: 800px; margin: 0 auto; padding: 3rem 2rem; }
        .sim-title { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem; }
        .sim-sub { font-size: 0.85rem; color: #888; margin-bottom: 2rem; }
        .sim-input-row { display: flex; gap: 0; margin-bottom: 2rem; }
        .sim-input {
          flex: 1; padding: 0.85rem 1.25rem; background: #1a1a18;
          border: 1px solid #2a2a28; border-right: none; color: #f5f4f0;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; outline: none;
        }
        .sim-input:focus { border-color: #c8f04a; }
        .sim-btn {
          background: #c8f04a; color: #0d0d0d; border: none;
          padding: 0.85rem 1.5rem; font-size: 0.75rem; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer; font-weight: 600;
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
        }
        .sim-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .sim-messages { display: flex; flex-direction: column; gap: 1.25rem; }
                .sim-msg {
          display: flex; flex-direction: column; gap: 0.3rem;
          max-width: 75%; opacity: 0; transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .sim-msg.visible { opacity: 1; transform: translateY(0); }
        .sim-msg.lukas.visible { animation: slideLeft 0.6s ease forwards; }
        .sim-msg.electra.visible { animation: slideRight 0.6s ease forwards; }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }        .sim-msg.lukas { align-self: flex-start; }
        .sim-msg.electra { align-self: flex-end; }
        .sim-name {
          font-size: 0.65rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #555;
        }
        .sim-msg.electra .sim-name { text-align: right; }
        .sim-bubble {
          padding: 0.85rem 1.1rem; font-size: 0.875rem; line-height: 1.65;
        }
        .sim-msg.lukas .sim-bubble {
          background: #1a1a18; border-left: 3px solid #c8f04a;
        }
        .sim-msg.electra .sim-bubble {
          background: #0f1f1f; border-right: 3px solid #4ac8f0;
        }
        .sim-loading { color: #555; font-size: 0.875rem; padding: 1rem 0; }
        .sim-typing {
          display: flex; gap: 5px; align-items: center; padding: 0.5rem 0;
        }
        .sim-dot {
          width: 6px; height: 6px; background: #555; border-radius: 50%;
          animation: bounce 1.2s ease-in-out infinite;
        }
        .sim-dot:nth-child(2) { animation-delay: 0.2s; }
        .sim-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .sim-id { font-size: 0.65rem; color: #333; margin-top: 2rem; }
      `}</style>

      <div className="sim-wrap">
        <div className="sim-title">Simulation Room</div>
        <div className="sim-sub">
          Lukas und Electra sprechen über ein Thema. Beobachte ihr Gespräch.
        </div>

        <div className="sim-input-row">
          <input
            className="sim-input"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="Thema eingeben, z.B. Barrierefreiheit auf dem Campus..."
            onKeyDown={e => {
              if (e.key === "Enter") startConversation();
            }}
            disabled={loading}
          />
          <button
            className="sim-btn"
            onClick={startConversation}
            disabled={loading || !topic.trim()}
          >
            {loading ? "Lädt..." : "Starten"}
          </button>
        </div>

        {loading && (
          <div className="sim-loading">
            <div className="sim-typing">
              <div className="sim-dot" />
              <div className="sim-dot" />
              <div className="sim-dot" />
            </div>
            Lukas und Electra bereiten sich vor...
          </div>
        )}

        <div className="sim-messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`sim-msg ${m.personaId} ${i < visibleCount ? "visible" : ""}`}
            >
              <div className="sim-name">{m.name}</div>
              <div className="sim-bubble">{m.content}</div>
            </div>
          ))}
        </div>

        {conversationId && visibleCount >= messages.length && messages.length > 0 && (
          <div className="sim-id">Conversation ID: {conversationId}</div>
        )}
      </div>
    </>
  );
}