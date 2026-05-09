"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const LUKAS_SYSTEM_PROMPT = `Du bist Lukas, 23 Jahre alt, Student der Wirtschaftsinformatik im 5. Semester an der TH Wildau.

KERNCHARAKTER:
Lukas ist kein fauler Student. Er ist faehig, willig und bereit, Einsatz zu zeigen. Was ihm fehlt, sind die richtigen Strukturen, Raeume und Unterstuetzung. Er scheitert nicht am Willen, sondern an fehlender Infrastruktur und einem System, das ihn nicht wirklich abgeholt hat.

BIOGRAFIE:
Kommt aus Neubrandenburg, Mecklenburg-Vorpommern. Abitur 2,4. Wirtschaftsinformatik als Kompromiss gewaehlt, weil es nach Praxis und Zukunft klang. Wohnt in einer Dreier-WG in Wildau mit Jonas (Maschinenbau, strukturiert) und Mia (Soziale Arbeit, gutgelaunt). Arbeitet nebenbei bei Media Markt. Engster Kontakt an der Uni ist Ben.

WAS LUKAS SICH WUENSCHT:
- Er will endlich ein Projekt wirklich durchziehen und verstehen, was er dabei eigentlich tut
- Er moechte sehen wie das Gelernte in der Praxis angewendet wird
- Er wuenscht sich ein Umfeld in dem er Fragen stellen kann ohne sich zu blamieren
- Er moechte Anschluss finden, in Gruppen arbeiten, vom Team-Effekt profitieren
- Er will am Ende des Studiums wissen was er kann und wohin er will
- Er moechte Raeume an der TH die er kennt, buchen kann und als seine eigenen empfindet
- Er will einen Studiengang der ihn Schritt fuer Schritt entwickelt
- Er moechte dass Fehler als Lernchance begriffen werden
- Er sucht Praxisbezug der Lernen sinnvoll macht

WAS LUKAS FRUSTRIERT:
- Die digitalen Systeme der TH sind fragmentiert: Unidos, Moodle, Pruefungsportal, Email alle getrennt
- Er verliert den Ueberblick weil Informationen verstreut sind
- Prokrastination entsteht bei ihm aus fehlender Struktur, nicht aus Faulheit
- Er lernt mit dem Gefuehl nur fuer Pruefungen zu lernen
- Er findet keine Lerngruppen obwohl er sie sich wuenscht

PERSOENLICHKEIT:
Pragmatiker. Teamplayer wenn das Team ihn einbindet. Spielt Videospiele strategisch. Hoert viel Musik, Kopfhoerer als Schutzschild. WG-Filmabend ist sein Anker.

TYPISCHE ZITATE:
"Halb wach, was steht heute eigentlich an?"
"Ich will das mal wirklich verstehen, nicht nur fuer die Pruefung."
"Ben, weisst du wo der Raum ist?"
"Mach ich einfach morgen."
"Irgendwie fuehlt sich das alles mehr nach Improvisieren an als nach Studieren."

WICHTIGE REGELN:
- Antworte IMMER auf Deutsch, egal in welcher Sprache die Person schreibt
- Sprich natuerlich und umgangssprachlich wie ein echter 23-jaehriger Student
- Erste Person, niemals erwaehnen dass du KI oder Persona bist
- Halte Antworten unter 100 Woertern
- Keine Gedankenstriche
- Zeige Lukas als jemanden der FAEHIG ist und WILL aber dem die Strukturen fehlen`;

const STORAGE_KEY = "lukas-chat-history";

export default function Lukas() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [listening, setListening] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<unknown>(null);

  useEffect(() => {
    // Check speech support on client only
    const supported = !!(
      (window as unknown as Record<string, unknown>).SpeechRecognition ||
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition
    );
    setHasSpeechSupport(supported);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setMessages(parsed);
          setStarted(true);
        }
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch { /* ignore */ }
    }
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speak = async (text: string) => {
    if (muted) return;

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }

    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("TTS failed");

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;

      await new Promise<void>((resolve) => {
        audio.oncanplaythrough = () => resolve();
        audio.onerror = () => resolve();
        audio.load();
      });

      setSpeaking(true);
      audio.onended = () => {
        setSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        currentAudioRef.current = null;
      };
      audio.onerror = () => {
        setSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        currentAudioRef.current = null;
      };
      audio.play();
    } catch {
      setSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setSpeaking(false);
  };

  const startListening = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) return;

    if (listening) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (recognitionRef.current as any)?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "de-DE";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const startConversation = () => {
    setStarted(true);
    const intro: Message = {
      role: "assistant",
      content: "Hey. Ich bin Lukas. Frag mich einfach, was du wissen willst.",
    };
    setMessages([intro]);
    speak(intro.content);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/persona", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages, system: LUKAS_SYSTEM_PROMPT }),
    });

    const data = await res.json();
    const reply = data.content?.[0]?.text || "";
    const assistantMsg: Message = { role: "assistant", content: reply };
    setMessages([...newMessages, assistantMsg]);
    speak(reply);
    setLoading(false);
  };

  const clearChat = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    stopSpeaking();
    setMessages([]);
    setStarted(false);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --black: #0d0d0d; --white: #f5f4f0; --accent: #c8f04a;
          --gray: #888880; --light-gray: #e8e7e2;
          --font-display: 'Bebas Neue', sans-serif;
          --font-serif: 'DM Serif Display', serif;
          --font-body: 'DM Sans', sans-serif;
        }
        body { background: var(--white); color: var(--black); font-family: var(--font-body); }

        .lukas-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 3rem; background: var(--white);
          border-bottom: 1px solid var(--light-gray);
        }
        .lukas-nav-logo {
          font-family: var(--font-display); font-size: 1rem;
          letter-spacing: 0.12em; color: var(--black); text-decoration: none;
        }
        .lukas-nav-back {
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gray); text-decoration: none; transition: color 0.2s;
        }
        .lukas-nav-back:hover { color: var(--black); }

        .lukas-wrap {
          min-height: 100vh; display: grid;
          grid-template-columns: 380px 1fr;
          padding-top: 72px;
        }

        .lukas-left {
          background: var(--black); position: sticky; top: 72px;
          height: calc(100vh - 72px); display: flex; flex-direction: column; overflow: hidden;
        }
        .lukas-photo { flex: 1; position: relative; overflow: hidden; background: #111; }
        .lukas-info { padding: 1.75rem 2rem; border-top: 1px solid #1e1e1c; flex-shrink: 0; }
        .lukas-name {
          font-family: var(--font-display); font-size: 2.2rem;
          letter-spacing: 0.05em; color: var(--white); margin-bottom: 0.25rem;
        }
        .lukas-meta { font-size: 0.78rem; color: #666; margin-bottom: 1rem; line-height: 1.5; }
        .lukas-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem; }
        .lukas-tag {
          font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid #2a2a28; padding: 0.2rem 0.55rem; color: #666;
        }
        .lukas-status {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: #555;
        }
        .lukas-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); flex-shrink: 0;
          animation: blink 2s ease-in-out infinite;
        }
        .lukas-status-dot.speaking { animation: pulse-fast 0.5s ease-in-out infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes pulse-fast {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.5); }
        }

        .lukas-right {
          display: flex; flex-direction: column;
          height: calc(100vh - 72px); position: sticky; top: 72px; overflow: hidden;
        }

        .lukas-header {
          padding: 1.25rem 2.5rem; border-bottom: 1px solid var(--light-gray);
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 1rem; flex-shrink: 0;
        }
        .lukas-header-title {
          font-family: var(--font-serif); font-size: 1.05rem;
          color: var(--black); margin-bottom: 0.2rem;
        }
        .lukas-header-sub {
          font-size: 0.74rem; color: var(--gray); line-height: 1.55; max-width: 500px;
        }
        .lukas-header-sub strong { color: var(--black); font-weight: 500; }

        .header-actions { display: flex; gap: 0.5rem; align-items: center; flex-shrink: 0; }
        .action-btn {
          font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--gray); background: none; border: 1px solid var(--light-gray);
          padding: 0.4rem 0.75rem; cursor: pointer; font-family: var(--font-body);
          transition: all 0.2s; white-space: nowrap;
        }
        .action-btn:hover { border-color: var(--black); color: var(--black); }
        .action-btn.active { background: var(--black); color: var(--white); border-color: var(--black); }

        .lukas-start {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 3rem; text-align: center;
        }
        .lukas-start-label {
          font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1rem;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .lukas-start-label::before { content: ''; width: 16px; height: 1px; background: var(--gray); }
        .lukas-start-title {
          font-family: var(--font-serif); font-size: 2rem;
          color: var(--black); margin-bottom: 0.75rem; line-height: 1.2;
        }
        .lukas-start-sub {
          font-size: 0.875rem; color: var(--gray); margin-bottom: 2rem;
          max-width: 380px; line-height: 1.65;
        }
        .lukas-class-note {
          font-size: 0.73rem; color: var(--gray); margin-top: 1rem;
          padding: 0.75rem 1.25rem; border: 1px solid var(--light-gray);
          max-width: 380px; line-height: 1.55; text-align: left;
        }
        .lukas-class-note strong { color: var(--black); font-weight: 500; }
        .start-btn {
          background: var(--black); color: var(--white);
          font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.9rem 2rem; border: 1px solid var(--black);
          cursor: pointer; font-family: var(--font-body);
          transition: background 0.2s, color 0.2s;
        }
        .start-btn:hover { background: transparent; color: var(--black); }

        .chat-messages {
          flex: 1; overflow-y: auto; padding: 1.5rem 2.5rem;
          display: flex; flex-direction: column; gap: 1rem;
        }
        .context-banner {
          padding: 0.85rem 1.1rem; background: var(--light-gray);
          border-left: 3px solid var(--accent);
          font-size: 0.76rem; color: #555; line-height: 1.55;
          margin-bottom: 0.5rem; flex-shrink: 0;
        }
        .context-banner strong { color: var(--black); font-weight: 500; }

        .chat-msg { display: flex; flex-direction: column; gap: 0.2rem; max-width: 75%; }
        .chat-msg.user { align-self: flex-end; align-items: flex-end; }
        .chat-msg.assistant { align-self: flex-start; }
        .chat-sender {
          font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gray);
        }
        .chat-bubble { padding: 0.75rem 1rem; font-size: 0.875rem; line-height: 1.65; border-radius: 2px; }
        .chat-msg.user .chat-bubble { background: var(--black); color: var(--white); }
        .chat-msg.assistant .chat-bubble { background: var(--light-gray); color: var(--black); }

        .typing-indicator {
          align-self: flex-start; background: var(--light-gray);
          padding: 0.75rem 1rem; display: flex; gap: 4px; align-items: center;
        }
        .typing-dot {
          width: 5px; height: 5px; background: var(--gray);
          border-radius: 50%; animation: typingBounce 1.2s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce {
          0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); }
        }

        .chat-input-area {
          padding: 1.25rem 2.5rem; border-top: 1px solid var(--light-gray);
          display: flex; gap: 0; flex-shrink: 0;
        }
        .mic-btn {
          background: var(--white); color: var(--gray);
          border: 1px solid var(--light-gray); border-right: none;
          padding: 0 1rem; cursor: pointer; transition: all 0.2s;
          font-size: 1rem; flex-shrink: 0; display: flex; align-items: center;
        }
        .mic-btn:hover { color: var(--black); border-color: var(--black); }
        .mic-btn.listening {
          background: #fff0f0; color: #cc0000; border-color: #cc0000;
          animation: micPulse 1s ease-in-out infinite;
        }
        .mic-btn-disabled {
          background: var(--white); color: var(--light-gray);
          border: 1px solid var(--light-gray); border-right: none;
          padding: 0 1rem; font-size: 1rem; flex-shrink: 0;
          display: flex; align-items: center; cursor: default;
        }
        @keyframes micPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .chat-input {
          flex: 1; padding: 0.85rem 1.25rem; font-family: var(--font-body); font-size: 0.875rem;
          border: 1px solid var(--light-gray); border-right: none;
          background: var(--white); color: var(--black); outline: none; resize: none;
        }
        .chat-input:focus { border-color: var(--black); }
        .chat-send {
          background: var(--black); color: var(--white); border: none; padding: 0.85rem 1.5rem;
          font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; font-family: var(--font-body); transition: background 0.2s; white-space: nowrap;
        }
        .chat-send:hover { background: #333; }
        .chat-send:disabled { opacity: 0.4; cursor: not-allowed; }

        .browser-note {
          padding: 0.6rem 2.5rem;
          font-size: 0.72rem; color: var(--gray); line-height: 1.5;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .lukas-wrap { grid-template-columns: 1fr; }
          .lukas-left { position: relative; height: auto; top: 0; }
          .lukas-photo { height: 70vw; }
          .lukas-right { position: relative; height: 85vh; top: 0; }
          .lukas-nav { padding: 1rem 1.5rem; }
          .lukas-header { padding: 1rem 1.5rem; }
          .chat-messages { padding: 1rem 1.5rem; }
          .chat-input-area { padding: 1rem 1.5rem; }
          .browser-note { padding: 0.6rem 1.5rem; }
        }
      `}</style>

      <nav className="lukas-nav">
        <a href="/" className="lukas-nav-logo">Enes Gozukucuk</a>
        <a href="/" className="lukas-nav-back">Back to portfolio</a>
      </nav>

      <div className="lukas-wrap">

        <div className="lukas-left">
          <div className="lukas-photo">
            <Image
              src="/lukas.png"
              alt="Lukas"
              fill
              sizes="380px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
          </div>
          <div className="lukas-info">
            <div className="lukas-name">LUKAS</div>
            <div className="lukas-meta">
              23 · Wirtschaftsinformatik, 5. Semester<br />
              TH Wildau · Neubrandenburg
            </div>
            <div className="lukas-tags">
              <span className="lukas-tag">Student</span>
              <span className="lukas-tag">TH Wildau</span>
              <span className="lukas-tag">Media Markt</span>
              <span className="lukas-tag">WG Wildau</span>
            </div>
            <div className="lukas-status">
              <div className={`lukas-status-dot ${speaking ? "speaking" : ""}`} />
              {speaking ? "Spricht..." : "Bereit"}
            </div>
          </div>
        </div>

        <div className="lukas-right">
          <div className="lukas-header">
            <div>
              <div className="lukas-header-title">Lukas interviewen</div>
              <div className="lukas-header-sub">
                Research-Persona aus dem Kurs{" "}
                <strong>Service Design - Wie funktioniert nutzendenzentriertes Gestalten?</strong>{" "}
                an der TH Wildau.
              </div>
            </div>
            <div className="header-actions">
              <button
                className={`action-btn ${muted ? "active" : ""}`}
                onClick={() => {
                  if (!muted) stopSpeaking();
                  setMuted(!muted);
                }}
              >
                {muted ? "Ton an" : "Ton aus"}
              </button>
              {started && (
                <button className="action-btn" onClick={clearChat}>
                  Neu starten
                </button>
              )}
            </div>
          </div>

          {!started ? (
            <div className="lukas-start">
              <div className="lukas-start-label">Research Persona</div>
              <div className="lukas-start-title">Lern Lukas kennen.</div>
              <div className="lukas-start-sub">
                Lukas ist 23, studiert Wirtschaftsinformatik an der TH Wildau und
                kommt aus Neubrandenburg. Er ist faehig und motiviert, aber ihm
                fehlen die richtigen Strukturen. Frag ihn auf Deutsch oder Englisch.
              </div>
              <button className="start-btn" onClick={startConversation}>
                Interview starten
              </button>
              <div className="lukas-class-note">
                <strong>Entstanden im Kurs:</strong> Service Design - Wie funktioniert
                nutzendenzentriertes Gestalten? · TH Wildau · 2025
              </div>
            </div>
          ) : (
            <>
              <div className="chat-messages">
                <div className="context-banner">
                  <strong>Lukas</strong>, 23, Wirtschaftsinformatik im 5. Semester.
                  WG in Wildau, Nebenjob bei Media Markt, kommt aus Neubrandenburg.
                  Dein Gesprach wird gespeichert.
                </div>
                {messages.map((m, i) => (
                  <div key={i} className={`chat-msg ${m.role}`}>
                    <div className="chat-sender">{m.role === "user" ? "Du" : "Lukas"}</div>
                    <div className="chat-bubble">{m.content}</div>
                  </div>
                ))}
                {loading && (
                  <div className="typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="chat-input-area">
                {hasSpeechSupport ? (
                  <button
                    className={`mic-btn ${listening ? "listening" : ""}`}
                    onClick={startListening}
                    title={listening ? "Aufnahme stoppen" : "Spracheingabe starten"}
                  >
                    {listening ? "⏹" : "🎤"}
                  </button>
                ) : (
                  <div className="mic-btn-disabled" title="Spracheingabe nicht verfuegbar">
                    🎤
                  </div>
                )}
                <textarea
                  className="chat-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={listening ? "Hoere zu..." : "Frag Lukas etwas..."}
                  rows={1}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button
                  className="chat-send"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                >
                  Senden
                </button>
              </div>

              {!hasSpeechSupport && (
                <div className="browser-note">
                  Tipp: Fur die Spracheingabe einfach Chrome oder Safari oeffnen. 🎤
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}