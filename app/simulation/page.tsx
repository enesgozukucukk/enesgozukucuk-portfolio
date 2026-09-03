"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  personaId: string;
  name: string;
  content: string;
};

type ConversationData = {
  conversationId: string;
  topic: string;
  messages: Message[];
};

export default function Simulation() {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserRef = useRef<unknown>(null);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [conversation, setConversation] = useState<ConversationData | null>(null);
  const [started, setStarted] = useState(false);

  const startSimulation = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    setConversation(null);
    setShowPanel(false);

    const res = await fetch("/api/agent-conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, turns: 3 }),
    });

    const data = await res.json();
    setConversation(data);
    setLoading(false);
    setStarted(true);
  };

  useEffect(() => {
    if (!started || !conversation || !gameRef.current) return;

    const initPhaser = async () => {
      const Phaser = (await import("phaser")).default;

      if (phaserRef.current) {
        (phaserRef.current as { destroy: () => void }).destroy();
        phaserRef.current = null;
      }

      const messages = conversation.messages;
      let messageIndex = 0;
      let sentenceIndex = 0;
      let conversationActive = false;
      let bubbleTimer = 0;
      const BASE_DURATION = 2000;
      const MS_PER_CHAR = 50;
      const MOVE_SPEED = 80;
      const FRAME_WIDTH = 384;
      const FRAME_HEIGHT = 256;
      const SCALE = 0.18;

      class MainScene extends Phaser.Scene {
        lukas!: Phaser.GameObjects.Sprite;
        electra!: Phaser.GameObjects.Sprite;
        lukasLabel!: Phaser.GameObjects.Text;
        electraLabel!: Phaser.GameObjects.Text;
        lukasBubble!: Phaser.GameObjects.Container;
        electraBubble!: Phaser.GameObjects.Container;
        lukasMoveTarget!: { x: number; y: number };
        electraMoveTarget!: { x: number; y: number };
        phase!: string;

        constructor() {
          super({ key: "MainScene" });
        }

        preload() {
          this.load.image("campus", "/campus_bg.png");
          this.load.spritesheet("lukas", "/lukas_sprite.png", {
            frameWidth: FRAME_WIDTH,
            frameHeight: FRAME_HEIGHT,
          });
          this.load.spritesheet("electra", "/electra_sprite.png", {
            frameWidth: FRAME_WIDTH,
            frameHeight: FRAME_HEIGHT,
          });
        }

        create() {
          const W = this.scale.width;
          const H = this.scale.height;

          const bg = this.add.image(W / 2, H / 2, "campus");
          bg.setDisplaySize(W, H);
          bg.setDepth(0);

          this.anims.create({
            key: "lukas-down",
            frames: this.anims.generateFrameNumbers("lukas", { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1,
          });
          this.anims.create({
            key: "lukas-up",
            frames: this.anims.generateFrameNumbers("lukas", { start: 4, end: 7 }),
            frameRate: 6,
            repeat: -1,
          });
          this.anims.create({
            key: "lukas-left",
            frames: this.anims.generateFrameNumbers("lukas", { start: 8, end: 11 }),
            frameRate: 6,
            repeat: -1,
          });
          this.anims.create({
            key: "lukas-right",
            frames: this.anims.generateFrameNumbers("lukas", { start: 12, end: 15 }),
            frameRate: 6,
            repeat: -1,
          });
          this.anims.create({
            key: "lukas-idle",
            frames: this.anims.generateFrameNumbers("lukas", { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1,
          });

          this.anims.create({
            key: "electra-down",
            frames: this.anims.generateFrameNumbers("electra", { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1,
          });
          this.anims.create({
            key: "electra-up",
            frames: this.anims.generateFrameNumbers("electra", { start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1,
          });
          this.anims.create({
            key: "electra-left",
            frames: this.anims.generateFrameNumbers("electra", { start: 8, end: 11 }),
            frameRate: 5,
            repeat: -1,
          });
          this.anims.create({
            key: "electra-right",
            frames: this.anims.generateFrameNumbers("electra", { start: 12, end: 15 }),
            frameRate: 5,
            repeat: -1,
          });
          this.anims.create({
            key: "electra-idle",
            frames: this.anims.generateFrameNumbers("electra", { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1,
          });

          // Characters on the horizontal path
        this.lukas = this.add.sprite(W * 0.08, H * 0.67, "lukas");
this.lukas.setScale(SCALE);
this.lukas.setDepth(5);
this.lukas.play("lukas-right");

this.electra = this.add.sprite(W * 0.92, H * 0.67, "electra");
this.electra.setScale(SCALE);
this.electra.setDepth(5);
this.electra.play("electra-left");

this.lukasLabel = this.add.text(
  this.lukas.x, this.lukas.y - 30, "Lukas", {
    fontSize: "11px",
    color: "#ffffff",
    fontFamily: "DM Sans, sans-serif",
    backgroundColor: "#4a90d966",
    padding: { x: 5, y: 3 },
  }
).setOrigin(0.5).setDepth(6);

this.electraLabel = this.add.text(
  this.electra.x, this.electra.y - 30, "Electra", {
    fontSize: "11px",
    color: "#ffffff",
    fontFamily: "DM Sans, sans-serif",
    backgroundColor: "#f0a04a66",
    padding: { x: 5, y: 3 },
  }
).setOrigin(0.5).setDepth(6);

this.lukasMoveTarget = { x: W * 0.40, y: H * 0.67 };
this.electraMoveTarget = { x: W * 0.60, y: H * 0.67 };

          this.lukasBubble = this.createBubble(0x1a1a18, 0x4a90d9);
          this.electraBubble = this.createBubble(0x1a1a18, 0xf0a04a);
          this.lukasBubble.setVisible(false);
          this.electraBubble.setVisible(false);

          this.phase = "walking";
        }

        createBubble(bgColor: number, borderColor: number) {
          const container = this.add.container(0, 0);
          const bg = this.add.rectangle(0, 0, 220, 70, bgColor, 0.95);
          bg.setStrokeStyle(2, borderColor);
          const text = this.add.text(0, 0, "", {
            fontSize: "11px",
            color: "#f5f4f0",
            fontFamily: "DM Sans, sans-serif",
            wordWrap: { width: 200 },
            align: "center",
            lineSpacing: 3,
          }).setOrigin(0.5);
          const tail = this.add.triangle(0, 37, -7, 0, 7, 0, 0, 11, bgColor, 0.95);
          container.add([bg, tail, text]);
          container.setDepth(10);
          return container;
        }

        showBubble(
  bubble: Phaser.GameObjects.Container,
  character: Phaser.GameObjects.Sprite,
  text: string,
  side: "left" | "right"
) {
  const W = this.scale.width;
  const textObj = bubble.list[2] as Phaser.GameObjects.Text;
  const bg = bubble.list[0] as Phaser.GameObjects.Rectangle;
  const tail = bubble.list[1] as Phaser.GameObjects.Triangle;
  textObj.setText(text);
  const textW = Math.min(Math.max(textObj.width + 30, 140), 220);
  const textH = textObj.height + 28;
  bg.setSize(textW, textH);
  tail.setY(textH / 2);

  // Keep bubble on screen
  let bx = character.x + (side === "left" ? 90 : -90);
  const halfW = textW / 2 + 10;
  if (bx - halfW < 0) bx = halfW;
  if (bx + halfW > W) bx = W - halfW;

  bubble.setPosition(bx, character.y - 80);
  bubble.setVisible(true);
  bubble.setAlpha(0);
  this.tweens.add({
    targets: bubble,
    alpha: 1,
    duration: 250,
    ease: "Power2",
  });
  bubbleTimer = BASE_DURATION + text.length * MS_PER_CHAR;
}

        hideBubble(bubble: Phaser.GameObjects.Container) {
          this.tweens.add({
            targets: bubble,
            alpha: 0,
            duration: 200,
            ease: "Power2",
            onComplete: () => bubble.setVisible(false),
          });
        }

        splitIntoSentences(text: string): string[] {
          const raw = text.match(/[^.!?]+[.!?]+/g) || [text];
          return raw.map(s => s.trim()).filter(s => s.length > 0);
        }

        moveToward(
  sprite: Phaser.GameObjects.Sprite,
  label: Phaser.GameObjects.Text,
  target: { x: number; y: number },
  delta: number
) {
  const dx = target.x - sprite.x;
  const dy = target.y - sprite.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 4) {
    label.setPosition(sprite.x, sprite.y - 30);
    return true;
  }
  const step = MOVE_SPEED * (delta / 1000);
  sprite.x += (dx / dist) * step;
  sprite.y += (dy / dist) * step;
  label.setPosition(sprite.x, sprite.y - 30);

  const key = sprite.texture.key;
  // Only switch animation if movement in that direction is dominant enough
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  let newAnim = "";
  if (absDx > absDy * 1.5) {
    newAnim = dx > 0 ? `${key}-right` : `${key}-left`;
  } else if (absDy > absDx * 1.5) {
    newAnim = dy > 0 ? `${key}-down` : `${key}-up`;
  } else {
    newAnim = dx > 0 ? `${key}-right` : `${key}-left`;
  }

  if (!sprite.anims.isPlaying || sprite.anims.currentAnim?.key !== newAnim) {
    sprite.play(newAnim);
  }
  return false;
}

        update(_time: number, delta: number) {
          if (this.phase === "walking") {
            const lukasArrived = this.moveToward(
              this.lukas, this.lukasLabel, this.lukasMoveTarget, delta
            );
            const electraArrived = this.moveToward(
              this.electra, this.electraLabel, this.electraMoveTarget, delta
            );

            if (lukasArrived && electraArrived && !conversationActive) {
              conversationActive = true;
              this.lukas.play("lukas-idle");
              this.electra.play("electra-idle");
              this.phase = "talking";
              messageIndex = 0;
              sentenceIndex = 0;
              this.time.delayedCall(600, () => this.nextSentence());
            }
          }

          if (this.phase === "talking" && bubbleTimer > 0) {
            bubbleTimer -= delta;
            if (bubbleTimer <= 0) {
              this.hideBubble(this.lukasBubble);
              this.hideBubble(this.electraBubble);
              this.time.delayedCall(500, () => this.nextSentence());
            }
          }

          if (this.phase === "walking_away") {
            const W = this.scale.width;
            const H = this.scale.height;
            this.moveToward(
  this.lukas, this.lukasLabel,
  { x: W * 0.08, y: H * 0.67 }, delta
);
this.moveToward(
  this.electra, this.electraLabel,
  { x: W * 0.92, y: H * 0.67 }, delta
);
          }
        }

        nextSentence() {
          if (messageIndex >= messages.length) {
            this.phase = "walking_away";
            return;
          }

          const msg = messages[messageIndex];
          const sentences = this.splitIntoSentences(msg.content);

          if (sentenceIndex >= sentences.length) {
            messageIndex++;
            sentenceIndex = 0;
            this.time.delayedCall(700, () => this.nextSentence());
            return;
          }

          const sentence = sentences[sentenceIndex];
          sentenceIndex++;

          if (msg.personaId === "lukas") {
            this.showBubble(this.lukasBubble, this.lukas, sentence, "right");
            this.hideBubble(this.electraBubble);
          } else {
            this.showBubble(this.electraBubble, this.electra, sentence, "left");
            this.hideBubble(this.lukasBubble);
          }
        }
      }

      const config = {
        type: Phaser.AUTO,
        width: gameRef.current!.offsetWidth,
        height: gameRef.current!.offsetHeight,
        transparent: true,
        parent: gameRef.current!,
        scene: MainScene,
        pixelArt: false,
        antialias: true,
      };

      const game = new Phaser.Game(config as Phaser.Types.Core.GameConfig);
      phaserRef.current = game;
    };

    initPhaser();

    return () => {
      if (phaserRef.current) {
        (phaserRef.current as { destroy: () => void }).destroy();
        phaserRef.current = null;
      }
    };
  }, [started, conversation]);

  useEffect(() => {
    if (!phaserRef.current || !gameRef.current) return;
    const game = phaserRef.current as { scale: { resize: (w: number, h: number) => void } };
    game.scale.resize(
      gameRef.current.offsetWidth,
      gameRef.current.offsetHeight
    );
  }, [showPanel]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0d0d; color: #f5f4f0; font-family: 'DM Sans', sans-serif; }
        .sim-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 2rem; border-bottom: 1px solid #1e1e1c;
          background: #0d0d0d;
        }
        .sim-nav-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem;
          letter-spacing: 0.1em; color: #f5f4f0;
        }
        .sim-nav-back {
          font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: #555; text-decoration: none; transition: color 0.2s;
        }
        .sim-nav-back:hover { color: #f5f4f0; }

        .sim-setup {
          max-width: 600px; margin: 4rem auto; padding: 0 2rem; text-align: center;
        }
        .sim-setup-label {
          font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: #555; margin-bottom: 1rem;
        }
        .sim-setup-title {
          font-family: 'DM Serif Display', serif; font-size: 2rem;
          color: #f5f4f0; margin-bottom: 0.75rem; line-height: 1.2;
        }
        .sim-setup-sub {
          font-size: 0.875rem; color: #666; margin-bottom: 2rem; line-height: 1.65;
        }
        .sim-input-row { display: flex; gap: 0; }
        .sim-input {
          flex: 1; padding: 0.85rem 1.25rem; background: #1a1a18;
          border: 1px solid #2a2a28; border-right: none; color: #f5f4f0;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; outline: none;
        }
        .sim-input:focus { border-color: #c8f04a; }
        .sim-input::placeholder { color: #444; }
        .sim-btn {
          background: #c8f04a; color: #0d0d0d; border: none;
          padding: 0.85rem 1.5rem; font-size: 0.75rem; letter-spacing: 0.1em;
          text-transform: uppercase; cursor: pointer; font-weight: 600;
          font-family: 'DM Sans', sans-serif; white-space: nowrap; transition: opacity 0.2s;
        }
        .sim-btn:hover { opacity: 0.85; }
        .sim-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .sim-personas {
          display: flex; gap: 2rem; justify-content: center; margin-top: 2.5rem;
        }
        .sim-persona {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.75rem; color: #555;
        }
        .sim-persona-dot { width: 10px; height: 10px; border-radius: 50%; }

        .sim-game-wrap {
          display: flex; flex-direction: column; height: calc(100vh - 57px);
        }
        .sim-game-header {
          padding: 0.75rem 2rem; background: #111;
          border-bottom: 1px solid #1e1e1c;
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0;
        }
        .sim-topic { font-size: 0.78rem; color: #888; }
        .sim-topic strong { color: #f5f4f0; }
        .sim-header-right { display: flex; gap: 0.75rem; align-items: center; }
        .sim-panel-btn {
          font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: #888; background: none; border: 1px solid #2a2a28;
          padding: 0.35rem 0.85rem; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .sim-panel-btn:hover { border-color: #c8f04a; color: #c8f04a; }
        .sim-restart-btn {
          font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: #888; background: none; border: 1px solid #2a2a28;
          padding: 0.35rem 0.85rem; cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .sim-restart-btn:hover { border-color: #f5f4f0; color: #f5f4f0; }

        .sim-main { display: flex; flex: 1; overflow: hidden; }
        .sim-canvas-wrap {
          flex: 1; position: relative; overflow: hidden;
          background: #2a4a2a;
        }
        .sim-canvas-wrap canvas { width: 100% !important; height: 100% !important; display: block; }

        .sim-panel {
          width: 320px; background: #111; border-left: 1px solid #1e1e1c;
          overflow-y: auto; flex-shrink: 0; display: flex; flex-direction: column;
        }
        .sim-panel-title {
          padding: 1rem 1.25rem; border-bottom: 1px solid #1e1e1c;
          font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: #555;
          position: sticky; top: 0; background: #111;
        }
        .sim-panel-messages { padding: 1rem; display: flex; flex-direction: column; gap: 0.85rem; }
        .sim-panel-msg { display: flex; flex-direction: column; gap: 0.2rem; }
        .sim-panel-name {
          font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .sim-panel-name.lukas { color: #4a90d9; }
        .sim-panel-name.electra { color: #f0a04a; }
        .sim-panel-bubble {
          font-size: 0.82rem; line-height: 1.6; color: #bbb;
          padding: 0.6rem 0.85rem; background: #1a1a18; border-left: 2px solid #2a2a28;
        }
        .sim-panel-msg.lukas .sim-panel-bubble { border-color: #4a90d9; }
        .sim-panel-msg.electra .sim-panel-bubble { border-color: #f0a04a; }

        .sim-loading {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; height: 200px; gap: 1rem;
        }
        .sim-loading-text { font-size: 0.82rem; color: #555; }
        .sim-dots { display: flex; gap: 6px; }
        .sim-dot {
          width: 6px; height: 6px; background: #c8f04a; border-radius: 50%;
          animation: bounce 1.2s ease-in-out infinite;
        }
        .sim-dot:nth-child(2) { animation-delay: 0.2s; }
        .sim-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      <nav className="sim-nav">
        <span className="sim-nav-title">Simulation Room</span>
        <a href="/" className="sim-nav-back">Back to portfolio</a>
      </nav>

      {!started ? (
        <div className="sim-setup">
          <div className="sim-setup-label">Multi-Agent Simulation</div>
          <div className="sim-setup-title">Watch personas talk.</div>
          <div className="sim-setup-sub">
            Set a topic and watch Lukas and Electra have a real conversation about
            university life. Powered by AI and grounded in real research data.
          </div>

          {loading ? (
            <div className="sim-loading">
              <div className="sim-dots">
                <div className="sim-dot" />
                <div className="sim-dot" />
                <div className="sim-dot" />
              </div>
              <div className="sim-loading-text">Generating conversation...</div>
            </div>
          ) : (
            <div className="sim-input-row">
              <input
                className="sim-input"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Barrierefreiheit auf dem Campus..."
                onKeyDown={e => {
                  if (e.key === "Enter") startSimulation();
                }}
              />
              <button
                className="sim-btn"
                onClick={startSimulation}
                disabled={!topic.trim()}
              >
                Start
              </button>
            </div>
          )}

          <div className="sim-personas">
            <div className="sim-persona">
              <div className="sim-persona-dot" style={{ background: "#4a90d9" }} />
              Lukas, Student
            </div>
            <div className="sim-persona">
              <div className="sim-persona-dot" style={{ background: "#f0a04a" }} />
              Electra, Staff
            </div>
          </div>
        </div>
      ) : (
        <div className="sim-game-wrap">
          <div className="sim-game-header">
            <div className="sim-topic">
              Topic: <strong>{conversation?.topic}</strong>
            </div>
            <div className="sim-header-right">
              <button
                className="sim-restart-btn"
                onClick={() => {
                  if (phaserRef.current) {
                    (phaserRef.current as { destroy: () => void }).destroy();
                    phaserRef.current = null;
                  }
                  setStarted(false);
                  setConversation(null);
                  setTopic("");
                  setShowPanel(false);
                }}
              >
                New topic
              </button>
              <button
                className="sim-panel-btn"
                onClick={() => setShowPanel(p => !p)}
              >
                {showPanel ? "Hide transcript" : "Show transcript"}
              </button>
            </div>
          </div>

          <div className="sim-main">
            <div
              className="sim-canvas-wrap"
              ref={gameRef}
              style={{ width: showPanel ? "calc(100% - 320px)" : "100%" }}
            />

            {showPanel && conversation && (
              <div className="sim-panel">
                <div className="sim-panel-title">Transcript</div>
                <div className="sim-panel-messages">
                  {conversation.messages.map((m, i) => (
                    <div key={i} className={`sim-panel-msg ${m.personaId}`}>
                      <div className={`sim-panel-name ${m.personaId}`}>{m.name}</div>
                      <div className="sim-panel-bubble">{m.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}