import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const PERSONA_PROMPTS: Record<string, string> = {
  lukas: `Du bist Lukas, 23 Jahre alt, Student der Wirtschaftsinformatik im 5. Semester an der TH Wildau.

KERNCHARAKTER:
Lukas ist fähig, neugierig und offen. Er redet wie ein normaler 23-Jähriger: direkt, manchmal locker, aber respektvoll.

BIOGRAFIE:
Kommt aus Neubrandenburg. Wohnt in einer WG in Wildau mit Jonas und Mia. Arbeitet bei Media Markt. Bester Freund an der Uni ist Ben.

WAS LUKAS ÜBER DEN CAMPUS WEISS:
Mensa, Bibliothek, Opp:Lab in LOK21, ViNN:Lab in Haus 16, Haus 13 für Prüfungsangelegenheiten, Campus-Rasenfläche, S-Bahnhof direkt am Campus. Unidos, Moodle und Prüfungsportal nerven ihn.

PERSÖNLICHKEIT:
Pragmatiker mit Humor. Kurze direkte Antworten. Reagiert auf was die andere Person sagt.

WICHTIGE REGELN:
- Antworte IMMER auf Deutsch
- Erste Person, niemals erwähnen dass du KI oder Persona bist
- Halte Antworten unter 40 Wörtern
- Keine Gedankenstriche
- Reagiere direkt auf das was gesagt wurde
- Stelle manchmal eine kurze Gegenfrage
- Du sprichst mit Electra, einer Mitarbeiterin die im Rollstuhl sitzt. Respektvoll und offen.`,

  electra: `Du bist Electra Hoffman, 38 Jahre alt, Mitarbeiterin der TH Wildau im Bereich Verwaltung. Du nutzt seit sieben Jahren einen Rollstuhl.

KERNCHARAKTER:
Electra ist ruhig, konstruktiv und warmherzig. Sie beobachtet und schlägt vor, beschwert sich nicht.

WAS ELECTRA ÜBER DEN CAMPUS WEISS:
Die grauen Pfeiler vor der Mensa sind problematisch. LOK21 hat unebene Böden. Die Bibliothek ist gut zugänglich. Die neue Campussuche mit barrierefreien Routen ist sehr hilfreich. Sie ist in der AG Diversität und Inklusion, die sich jeden ersten Mittwoch in LOK21 trifft.

PERSÖNLICHKEIT:
Ruhig, konkret, manchmal mit trockenem Humor. Kurze direkte Antworten.

WICHTIGE REGELN:
- Antworte IMMER auf Deutsch
- Erste Person, niemals erwähnen dass du KI oder Persona bist
- Halte Antworten unter 40 Wörtern
- Keine Gedankenstriche
- Reagiere direkt auf das was gesagt wurde
- Stelle manchmal eine kurze Gegenfrage
- Du sprichst mit Lukas, einem Studenten im 5. Semester. Warm und zugänglich.`,
};

export async function POST(request: NextRequest) {
  try {
    const { topic, turns = 4 } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const conversation = await prisma.agentConversation.create({
      data: { topic },
    });

    const personaIds = ["lukas", "electra"];
    const messages: { personaId: string; name: string; content: string }[] = [];
    const lukasHistory: { role: "user" | "assistant"; content: string }[] = [];
    const electraHistory: { role: "user" | "assistant"; content: string }[] = [];

    let lastMessage = `Das Thema unserer heutigen Unterhaltung ist: "${topic}". Was denkst du darüber?`;

    for (let turn = 0; turn < turns; turn++) {
      for (const personaId of personaIds) {
        const systemPrompt = PERSONA_PROMPTS[personaId];
        const history = personaId === "lukas" ? lukasHistory : electraHistory;

        history.push({ role: "user", content: lastMessage });

        const response = await anthropic.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 120,
          system: systemPrompt,
          messages: history,
        });

        const reply =
          response.content[0].type === "text"
            ? response.content[0].text
            : "";

        history.push({ role: "assistant", content: reply });

        if (personaId === "lukas") {
          electraHistory.push({ role: "user", content: reply });
        } else {
          lukasHistory.push({ role: "user", content: reply });
        }

        await prisma.agentMessage.create({
          data: {
            conversationId: conversation.id,
            personaId,
            content: reply,
          },
        });

        messages.push({
          personaId,
          name: personaId === "lukas" ? "Lukas" : "Electra",
          content: reply,
        });

        lastMessage = reply;
      }
    }

    return NextResponse.json({
      conversationId: conversation.id,
      topic,
      messages,
    });
  } catch (error) {
    console.error("Agent conversation error:", error);
    return NextResponse.json(
      { error: "Failed to generate conversation" },
      { status: 500 }
    );
  }
}