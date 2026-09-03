import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (sessionId) {
      const existingSession = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
        },
      });

      if (existingSession) {
        return NextResponse.json({
          sessionId: existingSession.id,
          messages: existingSession.messages,
        });
      }
    }

    const lukasPersona = await prisma.persona.upsert({
      where: { id: "lukas" },
      update: {},
      create: {
        id: "lukas",
        name: "Lukas",
        systemPrompt: "Lukas Berger, 23, TH Wildau Student",
        avatarUrl: "/lukas.png",
      },
    });

    const newSession = await prisma.session.create({
  data: {
    personaId: lukasPersona.id,
  },
  include: {
    messages: true,
  },
});

await prisma.message.create({
  data: {
    sessionId: newSession.id,
    role: "assistant",
    content: "Hey. Ich bin Lukas. Frag mich einfach, was du wissen willst.",
  },
});

return NextResponse.json({
  sessionId: newSession.id,
  messages: [{
    role: "assistant",
    content: "Hey. Ich bin Lukas. Frag mich einfach, was du wissen willst.",
  }],
});
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(
      { error: "Failed to create or retrieve session" },
      { status: 500 }
    );
  }
}