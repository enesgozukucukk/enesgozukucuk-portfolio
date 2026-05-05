import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, persona, domain, chatMessages } = await req.json();

  const chatHTML = chatMessages && chatMessages.length > 0
    ? `
      <div style="margin-top:40px; padding-top:32px; border-top:1px solid #e8e7e2;">
        <h2 style="font-family:Georgia,serif;font-size:18px;color:#0d0d0d;margin:0 0 20px;">Interview Transcript</h2>
        ${chatMessages.map((m: { role: string; content: string }) => `
          <div style="margin-bottom:16px;">
            <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:6px;">
              ${m.role === "user" ? "You" : persona.name}
            </div>
            <div style="display:inline-block;padding:10px 14px;background:${m.role === "user" ? "#0d0d0d" : "#e8e7e2"};color:${m.role === "user" ? "#f5f4f0" : "#0d0d0d"};font-size:14px;line-height:1.6;max-width:80%;">
              ${m.content}
            </div>
          </div>
        `).join("")}
      </div>
    `
    : "";

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/></head>
    <body style="margin:0;padding:0;background:#f5f4f0;font-family:Arial,sans-serif;">

      <div style="max-width:600px;margin:0 auto;padding:48px 24px 64px;">

        <!-- Header -->
        <div style="margin-bottom:40px;">
          <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#888;margin-bottom:10px;">
            AI Persona Builder
          </div>
          <div style="font-size:11px;color:#aaa;">
            Built by <a href="https://enesgozukucuk.com" style="color:#aaa;">enesgozukucuk.com</a>
          </div>
        </div>

        <!-- Persona header -->
        <div style="background:#0d0d0d;padding:36px 32px;margin-bottom:2px;">
          <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#555;margin-bottom:12px;">
            ${domain} Persona
          </div>
          <div style="font-size:36px;letter-spacing:2px;color:#f5f4f0;font-family:Georgia,serif;margin-bottom:8px;">
            ${persona.name}
          </div>
          <div style="font-size:13px;color:#888;line-height:1.6;">
            ${persona.age} · ${persona.occupation} · ${persona.location}
          </div>
        </div>

        <!-- Quote -->
        <div style="background:#fff;padding:24px 32px;border-left:4px solid #c8f04a;margin-bottom:2px;font-family:Georgia,serif;font-style:italic;font-size:15px;color:#444;line-height:1.65;">
          "${persona.quote}"
        </div>

        <!-- Bio -->
        <div style="background:#fff;padding:28px 32px;margin-bottom:2px;">
          <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:10px;">About</div>
          <div style="font-size:14px;color:#444;line-height:1.75;">${persona.bio}</div>
        </div>

        <!-- Goals and Frustrations -->
        <div style="display:flex;gap:2px;margin-bottom:2px;">
          <div style="flex:1;background:#fff;padding:24px 28px;">
            <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:12px;">Goals</div>
            ${persona.goals.map((g: string) => `
              <div style="font-size:13px;color:#0d0d0d;padding:6px 0;border-bottom:1px solid #f0efe9;line-height:1.5;display:flex;align-items:flex-start;gap:8px;">
                <span style="color:#c8f04a;font-size:16px;line-height:1;">&#8226;</span>${g}
              </div>
            `).join("")}
          </div>
          <div style="flex:1;background:#fff;padding:24px 28px;">
            <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:12px;">Frustrations</div>
            ${persona.frustrations.map((f: string) => `
              <div style="font-size:13px;color:#0d0d0d;padding:6px 0;border-bottom:1px solid #f0efe9;line-height:1.5;display:flex;align-items:flex-start;gap:8px;">
                <span style="color:#c8f04a;font-size:16px;line-height:1;">&#8226;</span>${f}
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Motivations and Fears -->
        <div style="display:flex;gap:2px;margin-bottom:2px;">
          <div style="flex:1;background:#fff;padding:24px 28px;">
            <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:12px;">Motivations</div>
            ${persona.motivations.map((m: string) => `
              <div style="font-size:13px;color:#0d0d0d;padding:6px 0;border-bottom:1px solid #f0efe9;line-height:1.5;display:flex;align-items:flex-start;gap:8px;">
                <span style="color:#c8f04a;font-size:16px;line-height:1;">&#8226;</span>${m}
              </div>
            `).join("")}
          </div>
          <div style="flex:1;background:#fff;padding:24px 28px;">
            <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:12px;">Fears</div>
            ${persona.fears.map((f: string) => `
              <div style="font-size:13px;color:#0d0d0d;padding:6px 0;border-bottom:1px solid #f0efe9;line-height:1.5;display:flex;align-items:flex-start;gap:8px;">
                <span style="color:#c8f04a;font-size:16px;line-height:1;">&#8226;</span>${f}
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Design Insight -->
        <div style="background:#e8e7e2;padding:24px 28px;border-left:4px solid #c8f04a;margin-bottom:2px;">
          <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:8px;">Design Insight</div>
          <div style="font-size:14px;color:#0d0d0d;line-height:1.6;">${persona.insight}</div>
        </div>

        <!-- Personality -->
        <div style="background:#fff;padding:24px 28px;margin-bottom:2px;">
          <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:12px;">Personality</div>
          <div>
            ${persona.personality.map((t: string) => `
              <span style="display:inline-block;font-size:10px;letter-spacing:1px;text-transform:uppercase;border:1px solid #e8e7e2;padding:4px 10px;color:#888;margin:0 4px 4px 0;">${t}</span>
            `).join("")}
          </div>
        </div>

        ${chatHTML}

        <!-- Buy Me a Coffee -->
        <div style="margin-top:48px;padding:28px 32px;background:#fff;text-align:center;border-top:3px solid #c8f04a;">
          <div style="font-size:13px;color:#555;margin-bottom:6px;line-height:1.6;">
            This persona was built with the AI Persona Builder at enesgozukucuk.com.<br/>
            If it was useful, a coffee helps keep the API running.
          </div>
          <a href="https://buymeacoffee.com/enesgozukucuk"
             style="display:inline-block;margin-top:14px;background:#FFDD00;color:#0d0d0d;font-size:13px;font-weight:600;padding:12px 24px;text-decoration:none;border-radius:4px;">
            Buy Enes a Coffee
          </a>
        </div>

        <!-- Footer -->
        <div style="margin-top:32px;text-align:center;">
          <a href="https://enesgozukucuk.com/tool" style="font-size:11px;color:#aaa;text-decoration:none;">
            enesgozukucuk.com/tool
          </a>
        </div>

      </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: "Persona Builder <onboarding@resend.dev>",
      to: email,
      subject: `Your persona: ${persona.name}`,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}