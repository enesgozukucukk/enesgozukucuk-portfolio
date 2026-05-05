import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, persona, domain, chatMessages } = await req.json();

  const chatHTML = chatMessages && chatMessages.length > 0
    ? `
      <div style="margin-top:32px;">
        <h2 style="font-family:Georgia,serif;font-size:18px;color:#0d0d0d;margin-bottom:16px;">Interview Transcript</h2>
        ${chatMessages.map((m: { role: string; content: string }) => `
          <div style="margin-bottom:12px;display:flex;flex-direction:column;">
            <span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:4px;">
              ${m.role === "user" ? "You" : persona.name}
            </span>
            <div style="padding:10px 14px;background:${m.role === "user" ? "#0d0d0d" : "#e8e7e2"};color:${m.role === "user" ? "#f5f4f0" : "#0d0d0d"};font-size:14px;line-height:1.6;border-radius:2px;max-width:80%;">
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
    <head><meta charset="utf-8"/></head>
    <body style="margin:0;padding:0;background:#f5f4f0;font-family:'DM Sans',Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:40px 24px;">

        <div style="margin-bottom:32px;">
          <p style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#888;margin:0 0 8px;">
            AI Persona Builder · enesgozukucuk.com
          </p>
          <h1 style="font-family:Georgia,serif;font-size:32px;color:#0d0d0d;margin:0;">
            Meet ${persona.name}.
          </h1>
        </div>

        <div style="background:#0d0d0d;padding:32px;margin-bottom:1px;">
          <div style="font-size:28px;letter-spacing:2px;color:#f5f4f0;font-family:Georgia,serif;margin-bottom:6px;">
            ${persona.name}
          </div>
          <div style="font-size:13px;color:#888;">
            ${persona.age} · ${persona.occupation} · ${persona.location}
          </div>
          <div style="display:inline-block;background:#c8f04a;color:#0d0d0d;font-size:10px;letter-spacing:2px;text-transform:uppercase;padding:4px 10px;margin-top:12px;font-weight:500;">
            ${domain}
          </div>
        </div>

        <div style="background:#fff;padding:24px 32px;border-left:3px solid #c8f04a;margin-bottom:24px;font-family:Georgia,serif;font-style:italic;font-size:16px;color:#444;line-height:1.6;">
          "${persona.quote}"
        </div>

        <div style="background:#fff;padding:32px;margin-bottom:24px;">
          <p style="font-size:14px;line-height:1.75;color:#555;margin:0 0 24px;">${persona.bio}</p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">

            <div style="margin-bottom:20px;">
              <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:8px;">Goals</div>
              ${persona.goals.map((g: string) => `
                <div style="font-size:13px;color:#0d0d0d;padding:4px 0;border-bottom:1px solid #e8e7e2;line-height:1.5;">${g}</div>
              `).join("")}
            </div>

            <div style="margin-bottom:20px;">
              <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:8px;">Frustrations</div>
              ${persona.frustrations.map((f: string) => `
                <div style="font-size:13px;color:#0d0d0d;padding:4px 0;border-bottom:1px solid #e8e7e2;line-height:1.5;">${f}</div>
              `).join("")}
            </div>

            <div style="margin-bottom:20px;">
              <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:8px;">Motivations</div>
              ${persona.motivations.map((m: string) => `
                <div style="font-size:13px;color:#0d0d0d;padding:4px 0;border-bottom:1px solid #e8e7e2;line-height:1.5;">${m}</div>
              `).join("")}
            </div>

            <div style="margin-bottom:20px;">
              <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:8px;">Fears</div>
              ${persona.fears.map((f: string) => `
                <div style="font-size:13px;color:#0d0d0d;padding:4px 0;border-bottom:1px solid #e8e7e2;line-height:1.5;">${f}</div>
              `).join("")}
            </div>

          </div>

          <div style="background:#e8e7e2;padding:16px 20px;border-left:3px solid #c8f04a;margin-top:8px;">
            <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:6px;">Design Insight</div>
            <div style="font-size:13px;color:#0d0d0d;line-height:1.6;">${persona.insight}</div>
          </div>

          <div style="margin-top:20px;">
            <div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-bottom:8px;">Personality</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              ${persona.personality.map((t: string) => `
                <span style="font-size:10px;letter-spacing:1px;text-transform:uppercase;border:1px solid #e8e7e2;padding:4px 10px;color:#888;">${t}</span>
              `).join("")}
            </div>
          </div>
        </div>

        ${chatHTML}

        <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e8e7e2;text-align:center;">
          <p style="font-size:11px;color:#888;margin:0 0 4px;">Generated with the AI Persona Builder</p>
          <a href="https://enesgozukucuk.com/tool" style="font-size:11px;color:#0d0d0d;">enesgozukucuk.com/tool</a>
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