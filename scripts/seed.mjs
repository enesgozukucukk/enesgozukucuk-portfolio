import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.persona.upsert({
    where: { id: "lukas" },
    update: {},
    create: {
      id: "lukas",
      name: "Lukas",
      systemPrompt: "Lukas Berger, 23, Wirtschaftsinformatik, TH Wildau",
      avatarUrl: "/lukas.png",
    },
  });

  await prisma.persona.upsert({
    where: { id: "electra" },
    update: {},
    create: {
      id: "electra",
      name: "Electra",
      systemPrompt: "Electra Hoffman, 38, Mitarbeiterin TH Wildau, Rollstuhlnutzerin",
      avatarUrl: "/electra.png",
    },
  });

  console.log("Personas seeded.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());