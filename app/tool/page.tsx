"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Phase = "domain" | "personatype" | "naming" | "questionnaire" | "generating" | "persona" | "chat";

type Domain = {
  id: string;
  label: string;
  description: string;
};

type PersonaType = {
  id: string;
  label: string;
  description: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Persona = {
  name: string;
  age: string;
  occupation: string;
  location: string;
  bio: string;
  goals: string[];
  frustrations: string[];
  motivations: string[];
  fears: string[];
  personality: string[];
  quote: string;
  insight: string;
};

const domains: Domain[] = [
  { id: "general", label: "General", description: "Any context or industry" },
  { id: "healthcare", label: "Healthcare", description: "Patients, caregivers, clinicians" },
  { id: "fintech", label: "Fintech", description: "Banking, payments, investing" },
  { id: "education", label: "Education", description: "Students, teachers, institutions" },
  { id: "retail", label: "Retail", description: "Shoppers, brands, e-commerce" },
  { id: "publicservices", label: "Public Services", description: "Citizens, government, NGOs" },
  { id: "b2b", label: "B2B", description: "Businesses selling to businesses" },
  { id: "mobility", label: "Mobility", description: "Transport, logistics, travel" },
];

const domainPersonaTypes: Record<string, PersonaType[]> = {
  general: [
    { id: "end_user", label: "End User", description: "Person who uses the product or service directly" },
    { id: "professional", label: "Professional", description: "Expert or specialist in a field" },
    { id: "manager", label: "Manager", description: "Person with authority and responsibility" },
    { id: "new_user", label: "First-time User", description: "Someone encountering this for the first time" },
    { id: "power_user", label: "Power User", description: "Highly experienced, frequent user" },
    { id: "reluctant_user", label: "Reluctant User", description: "Someone who has to use it but resists" },
  ],
  healthcare: [
    { id: "patient", label: "Patient", description: "Person receiving care or treatment" },
    { id: "caregiver", label: "Caregiver", description: "Family member or informal carer" },
    { id: "clinician", label: "Clinician", description: "Doctor, nurse or clinical practitioner" },
    { id: "admin_health", label: "Administrative Staff", description: "Scheduling, records, billing" },
    { id: "manager_health", label: "Department Manager", description: "Ward or department lead" },
    { id: "elderly_patient", label: "Elderly Patient", description: "Older person navigating healthcare" },
    { id: "chronic", label: "Chronic Condition Patient", description: "Person managing a long-term condition" },
  ],
  fintech: [
    { id: "retail_customer", label: "Retail Customer", description: "Everyday banking and payments user" },
    { id: "small_business", label: "Small Business Owner", description: "Managing finances for a small company" },
    { id: "investor", label: "Investor", description: "Person managing savings or investments" },
    { id: "underbanked", label: "Underbanked Person", description: "Limited access to traditional banking" },
    { id: "compliance", label: "Compliance Officer", description: "Risk and regulatory professional" },
    { id: "fintech_manager", label: "Product Manager", description: "Building financial products" },
  ],
  education: [
    { id: "student", label: "Student", description: "Learner at any level or institution" },
    { id: "lecturer", label: "Lecturer / Teacher", description: "Educator or instructor" },
    { id: "staff_admin", label: "Administrative Staff", description: "Enrollment, paperwork, back-office" },
    { id: "staff_teaching", label: "Teaching Support Staff", description: "Lab assistants, tutors" },
    { id: "staff_org", label: "Organisational Staff", description: "Operations, HR, management" },
    { id: "parent", label: "Parent", description: "Parent of a student" },
    { id: "first_gen", label: "First-generation Student", description: "First in family to attend university" },
  ],
  retail: [
    { id: "frequent_shopper", label: "Frequent Shopper", description: "Regular customer with high loyalty" },
    { id: "bargain_hunter", label: "Bargain Hunter", description: "Price-driven, deal-seeking customer" },
    { id: "impulse_buyer", label: "Impulse Buyer", description: "Emotionally driven purchase decisions" },
    { id: "researcher", label: "Deliberate Researcher", description: "Researches extensively before buying" },
    { id: "store_staff", label: "Store Staff", description: "Frontline retail employee" },
    { id: "retail_manager", label: "Store Manager", description: "Responsible for store performance" },
    { id: "online_shopper", label: "Online Shopper", description: "Primarily shops digitally" },
  ],
  publicservices: [
    { id: "citizen", label: "Citizen", description: "Member of the general public using services" },
    { id: "vulnerable_citizen", label: "Vulnerable Citizen", description: "Person with complex or urgent needs" },
    { id: "frontline_staff", label: "Frontline Staff", description: "Public-facing service worker" },
    { id: "policy_maker", label: "Policy Maker", description: "Decision maker shaping services" },
    { id: "ngo_worker", label: "NGO / Third Sector Worker", description: "Charity or community organisation" },
    { id: "new_arrival", label: "New Arrival / Immigrant", description: "Person navigating unfamiliar systems" },
  ],
  b2b: [
    { id: "buyer", label: "Procurement Buyer", description: "Person responsible for purchasing decisions" },
    { id: "end_user_b2b", label: "End User", description: "Employee who uses the product day to day" },
    { id: "it_manager", label: "IT Manager", description: "Evaluates technical fit and integration" },
    { id: "exec_sponsor", label: "Executive Sponsor", description: "Senior stakeholder who approves budget" },
    { id: "champion", label: "Internal Champion", description: "Advocates for the product internally" },
    { id: "skeptic", label: "Skeptic", description: "Resistant to change or new tools" },
  ],
  mobility: [
    { id: "daily_commuter", label: "Daily Commuter", description: "Travels to work or study regularly" },
    { id: "leisure_traveller", label: "Leisure Traveller", description: "Travels for holidays or personal trips" },
    { id: "business_traveller", label: "Business Traveller", description: "Frequent work-related travel" },
    { id: "driver", label: "Driver / Operator", description: "Provides transport as a service" },
    { id: "logistics_staff", label: "Logistics Staff", description: "Manages goods movement and delivery" },
    { id: "car_free", label: "Car-free Urban Dweller", description: "Relies entirely on public transport" },
  ],
};

const baseQuestions = [
  "Who is this persona? Describe them in a few sentences. Their life situation, where they are, what they do.",
  "What does a typical day look like for them? Walk me through it from morning to evening.",
  "What are they trying to achieve right now, in work, life, or both?",
  "What gets in the way? What frustrates or slows them down most?",
  "How do they make decisions? Do they research extensively, go with gut, ask others?",
  "What do they worry about that they rarely say out loud?",
  "What does success look like for them in one year, and in five?",
];

const domainQuestions: Record<string, string[]> = {
  healthcare: [
    "How do they relate to their health? Proactive, reactive, anxious, dismissive?",
    "What has their experience with healthcare systems been like so far?",
  ],
  fintech: [
    "How do they feel about money? Is it a source of anxiety, control, freedom?",
    "What would make them switch from a financial product they already use?",
  ],
  education: [
    "How do they feel about learning? Is it something they seek out or endure?",
    "What would make them engage more deeply with an educational experience?",
  ],
  retail: [
    "How do they shop? Impulsively, deliberately, socially influenced?",
    "What makes them loyal to a brand or product?",
  ],
  publicservices: [
    "How do they feel about interacting with government or public institutions?",
    "What would make them trust a public institution more?",
  ],
  b2b: [
    "What does their buying process look like? Who else is involved in decisions?",
    "What are the professional risks they are trying to avoid?",
  ],
  mobility: [
    "How do they currently get around and what do they like or hate about it?",
    "How does travel fit into their broader life? Is it a necessity, a pleasure, a stress?",
  ],
  general: [],
};

const personaTypeQuestions: Record<string, string[]> = {
  student: ["What motivates them to keep going when studying gets hard?", "How do they feel about the institution they are part of?"],
  lecturer: ["What does a good teaching day look like for them?", "What institutional pressures affect their work most?"],
  staff_admin: ["What processes take up most of their time?", "Where do they feel the system lets them or others down?"],
  staff_org: ["How do they balance organisational goals with people needs?", "What change would make the biggest difference in their work?"],
  staff_teaching: ["How do they support learners day to day?", "What resources or structures are missing that would help them?"],
  patient: ["How has their condition or situation changed their daily life?", "What do they wish healthcare providers understood about them?"],
  caregiver: ["How does caregiving affect the rest of their life?", "What support do they wish they had?"],
  clinician: ["What does a good patient interaction look like for them?", "Where does the system get in the way of good care?"],
  citizen: ["How do they interact with public services in daily life?", "What would make them feel more heard or included?"],
  buyer: ["How do they justify a purchase decision to their organisation?", "What makes them trust a new vendor?"],
  daily_commuter: ["What is the most frustrating part of their regular journey?", "What would make them change how they travel?"],
  default: [],
};

const followUpMap: Record<number, string> = {
  2: "What would achieving that actually change for them day to day?",
  3: "Can you give a specific example of when that frustration came up?",
  5: "Where does that worry come from? Has something happened to trigger it?",
};

const avatarList = Array.from({ length: 16 }, (_, i) => ({
  id: `avatar-${i + 1}`,
  src: `/avatars/avatar-${i + 1}.jpg`,
  label: `Person ${i + 1}`,
}));

export default function Tool() {
  const [phase, setPhase] = useState<Phase>("domain");
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [selectedPersonaType, setSelectedPersonaType] = useState<PersonaType | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [personaNameInput, setPersonaNameInput] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [followUp, setFollowUp] = useState<string | null>(null);
  const [awaitingFollowUp, setAwaitingFollowUp] = useState(false);
  const [followUpAnswer, setFollowUpAnswer] = useState("");
  const [persona, setPersona] = useState<Persona | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [exportEmail, setExportEmail] = useState("");
  const [exportSent, setExportSent] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("persona-builder-state");
      if (saved) {
        const state = JSON.parse(saved);
        if (state.persona) {
          setPersona(state.persona);
          setSelectedDomain(state.selectedDomain);
          setSelectedPersonaType(state.selectedPersonaType);
          setSelectedAvatar(state.selectedAvatar || null);
          setPhase("persona");
          if (state.chatMessages && state.chatMessages.length > 0) {
            setChatMessages(state.chatMessages);
          }
        }
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const callAPI = async (messages: Message[], system: string) => {
    const res = await fetch("/api/persona", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, system }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "";
  };

  const selectDomain = (domain: Domain) => {
    setSelectedDomain(domain);
    setPhase("personatype");
  };

  const startWithType = (type: PersonaType | null) => {
    setSelectedPersonaType(type);
    setPhase("naming");
  };

  const startQuestionnaire = () => {
    const domainExtra = domainQuestions[selectedDomain?.id || ""] || [];
    const typeExtra = selectedPersonaType
      ? (personaTypeQuestions[selectedPersonaType.id] || personaTypeQuestions.default || [])
      : [];
    setQuestions([...baseQuestions, ...domainExtra, ...typeExtra]);
    setPhase("questionnaire");
  };

  const handleAnswer = () => {
    if (!currentAnswer.trim()) return;
    const newAnswers = [...answers, currentAnswer];
    setAnswers(newAnswers);
    setCurrentAnswer("");
    const isLastQuestion = currentQ + 1 >= questions.length;
    const wordCount = currentAnswer.trim().split(/\s+/).length;
    const hasFollowUp = followUpMap[currentQ] !== undefined && wordCount < 25 && !isLastQuestion;
    if (hasFollowUp) {
      setFollowUp(followUpMap[currentQ]);
      setAwaitingFollowUp(true);
    } else {
      moveToNext(newAnswers);
    }
  };

  const handleFollowUp = () => {
    if (!followUpAnswer.trim()) return;
    const updatedAnswers = [...answers];
    updatedAnswers[updatedAnswers.length - 1] += " " + followUpAnswer;
    setAnswers(updatedAnswers);
    setFollowUpAnswer("");
    setFollowUp(null);
    setAwaitingFollowUp(false);
    moveToNext(updatedAnswers);
  };

  const skipFollowUp = () => {
    setFollowUpAnswer("");
    setFollowUp(null);
    setAwaitingFollowUp(false);
    moveToNext(answers);
  };

  const moveToNext = (currentAnswers: string[]) => {
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      generatePersona(currentAnswers);
    }
  };

  const generatePersona = async (finalAnswers: string[]) => {
    setPhase("generating");
    const qa = questions
      .map((q, i) => `Q: ${q}\nA: ${finalAnswers[i] || "Not answered"}`)
      .join("\n\n");

    const nameInstruction = personaNameInput.trim()
      ? `The persona's name must be: ${personaNameInput.trim()}`
      : `Generate a realistic full name for the persona.`;

    const systemPrompt = `You are an expert service designer. Based on research interview answers, generate a rich persona.

The persona type is: ${selectedPersonaType?.label || "general"}
The domain context is: ${selectedDomain?.label || "general"}
${nameInstruction}

Tailor the persona specifically to this type and domain. No em dashes.

Return ONLY valid JSON, no markdown, no extra text:
{
  "name": "Full realistic name",
  "age": "Age as number",
  "occupation": "Job title or role appropriate for the persona type",
  "location": "City, Country",
  "bio": "2 sentence biography. Specific and human. No em dashes.",
  "goals": ["goal 1", "goal 2", "goal 3"],
  "frustrations": ["frustration 1", "frustration 2", "frustration 3"],
  "motivations": ["motivation 1", "motivation 2"],
  "fears": ["fear 1", "fear 2"],
  "personality": ["trait 1", "trait 2", "trait 3", "trait 4"],
  "quote": "One sentence this person would actually say. Natural, not polished. No em dashes.",
  "insight": "One sharp insight for a product team. Under 30 words. No em dashes."
}`;

    const response = await callAPI(
      [{ role: "user", content: `Interview answers:\n\n${qa}\n\nGenerate the persona.` }],
      systemPrompt
    );

    try {
      const clean = response.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setPersona(parsed);
      setPhase("persona");
      try {
        localStorage.setItem("persona-builder-state", JSON.stringify({
          persona: parsed, selectedDomain, selectedPersonaType, selectedAvatar, chatMessages: [],
        }));
      } catch { /* ignore */ }
    } catch {
      console.error("Failed to parse persona", response);
    }
  };

  const startChat = () => {
    if (!persona) return;
    if (chatMessages.length === 0) {
      const intro: Message = {
        role: "assistant",
        content: `Hi. I am ${persona.name}. ${persona.bio} What would you like to know?`,
      };
      setChatMessages([intro]);
      try {
        localStorage.setItem("persona-builder-state", JSON.stringify({
          persona, selectedDomain, selectedPersonaType, selectedAvatar, chatMessages: [intro],
        }));
      } catch { /* ignore */ }
    }
    setPhase("chat");
  };

  const sendChat = async () => {
    if (!chatInput.trim() || !persona) return;
    setLoading(true);
    const userMsg: Message = { role: "user", content: chatInput };
    const newMessages = [...chatMessages, userMsg];
    setChatMessages(newMessages);
    setChatInput("");

    const systemPrompt = `You are ${persona.name}, a ${persona.age} year old ${persona.occupation}.

Bio: ${persona.bio}
Goals: ${persona.goals.join(", ")}
Frustrations: ${persona.frustrations.join(", ")}
Motivations: ${persona.motivations.join(", ")}
Fears: ${persona.fears.join(", ")}
Personality: ${persona.personality.join(", ")}
Your voice: "${persona.quote}"

Respond as this real person. First person only. Stay in character. Never mention AI. Be natural and conversational. Under 100 words. No em dashes.`;

    const response = await callAPI(newMessages, systemPrompt);
    const assistantMsg: Message = { role: "assistant", content: response };
    const finalMessages = [...newMessages, assistantMsg];
    setChatMessages(finalMessages);
    try {
      localStorage.setItem("persona-builder-state", JSON.stringify({
        persona, selectedDomain, selectedPersonaType, selectedAvatar, chatMessages: finalMessages,
      }));
    } catch { /* ignore */ }
    setLoading(false);
  };

  const sendExport = async () => {
    if (!exportEmail.trim() || !persona) return;
    setExportLoading(true);
    try {
      await fetch("/api/send-persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: exportEmail, persona,
          domain: selectedDomain?.label,
          chatMessages: chatMessages.length > 0 ? chatMessages : [],
        }),
      });
      setExportSent(true);
    } catch (e) { console.error(e); }
    setExportLoading(false);
  };

  const clearSaved = () => {
    try { localStorage.removeItem("persona-builder-state"); } catch { /* ignore */ }
    setPhase("domain");
    setAnswers([]); setCurrentQ(0); setPersona(null); setChatMessages([]);
    setSelectedDomain(null); setSelectedPersonaType(null); setSelectedAvatar(null);
    setPersonaNameInput("");
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

        .tool-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 3rem; background: var(--white);
          border-bottom: 1px solid var(--light-gray);
        }
        .tool-nav-logo {
          font-family: var(--font-display); font-size: 1rem;
          letter-spacing: 0.12em; color: var(--black); text-decoration: none;
        }
        .tool-nav-back {
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gray); text-decoration: none; transition: color 0.2s;
        }
        .tool-nav-back:hover { color: var(--black); }

        .tool-wrap {
          min-height: 100vh; padding: 7rem 3rem 4rem;
          max-width: 860px; margin: 0 auto;
        }

        .phase-label {
          font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .phase-label::before { content: ''; width: 20px; height: 1px; background: var(--gray); }
        .phase-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          line-height: 1.15; margin-bottom: 0.75rem;
        }
        .phase-sub { font-size: 0.95rem; color: var(--gray); margin-bottom: 2.5rem; line-height: 1.6; }

        .breadcrumb {
          font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 2rem;
          display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
        }
        .breadcrumb span { color: var(--black); }

        .domain-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: var(--light-gray); border: 1px solid var(--light-gray);
        }
        .domain-card {
          background: var(--white); padding: 1.75rem 1.5rem;
          cursor: pointer; transition: background 0.2s; border: none; text-align: left;
        }
        .domain-card:hover { background: var(--black); }
        .domain-card:hover .domain-label, .domain-card:hover .domain-desc { color: var(--white); }
        .domain-label {
          font-family: var(--font-display); font-size: 1.4rem;
          letter-spacing: 0.03em; color: var(--black); margin-bottom: 0.4rem; transition: color 0.2s;
        }
        .domain-desc { font-size: 0.78rem; color: var(--gray); transition: color 0.2s; line-height: 1.4; }

        .avatar-section { margin-bottom: 2.5rem; }
        .avatar-section-title {
          font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 1rem;
        }
        .avatar-grid {
          display: grid; grid-template-columns: repeat(8, 1fr); gap: 0.5rem;
        }
        .avatar-btn {
          aspect-ratio: 1; border-radius: 50%; overflow: hidden;
          border: 3px solid transparent; cursor: pointer;
          transition: all 0.2s; background: var(--light-gray); padding: 0;
        }
        .avatar-btn:hover { border-color: var(--gray); }
        .avatar-btn.selected { border-color: var(--accent); }
        .avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 50%; }

        .type-grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 1px; background: var(--light-gray); border: 1px solid var(--light-gray);
          margin-bottom: 1px;
        }
        .type-card {
          background: var(--white); padding: 1.1rem 1.5rem;
          cursor: pointer; transition: background 0.2s; border: none; text-align: left;
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .type-card:hover { background: var(--black); }
        .type-card:hover .type-label, .type-card:hover .type-desc { color: var(--white); }
        .type-label { font-size: 0.9rem; font-weight: 500; color: var(--black); transition: color 0.2s; }
        .type-desc { font-size: 0.74rem; color: var(--gray); transition: color 0.2s; line-height: 1.4; }

        .type-none {
          background: var(--white); padding: 1.1rem 1.5rem;
          border: 1px solid var(--light-gray); cursor: pointer;
          text-align: left; width: 100%; font-family: var(--font-body);
          display: flex; align-items: center; justify-content: space-between;
          transition: background 0.2s; margin-bottom: 1.5rem;
        }
        .type-none:hover { background: var(--light-gray); }
        .type-none-label { font-size: 0.85rem; color: var(--gray); }
        .type-none-arrow { font-size: 0.85rem; color: var(--gray); }

        .naming-wrap { max-width: 480px; }
        .naming-input {
          width: 100%; padding: 1rem 1.25rem; font-family: var(--font-body); font-size: 1rem;
          border: 1px solid var(--light-gray); background: var(--white); color: var(--black);
          outline: none; border-radius: 2px; transition: border-color 0.2s; margin-bottom: 1.5rem;
        }
        .naming-input:focus { border-color: var(--black); }
        .naming-skip { font-size: 0.78rem; color: var(--gray); margin-top: 0.75rem; display: block; }

        .progress-bar {
          height: 2px; background: var(--light-gray);
          margin-bottom: 3rem; border-radius: 1px; overflow: hidden;
        }
        .progress-fill { height: 100%; background: var(--accent); transition: width 0.4s ease; }
        .question-num {
          font-family: var(--font-display); font-size: 5rem;
          line-height: 1; color: var(--light-gray); margin-bottom: 1rem;
        }
        .question-text {
          font-family: var(--font-serif); font-size: 1.5rem;
          line-height: 1.4; margin-bottom: 2rem; color: var(--black);
        }
        .followup-box {
          font-size: 0.9rem; color: var(--black); margin-bottom: 1.5rem;
          padding: 1rem 1.25rem; background: var(--light-gray); border-radius: 2px;
          border-left: 3px solid var(--accent); line-height: 1.6;
        }

        textarea {
          width: 100%; padding: 1rem 1.25rem; font-family: var(--font-body); font-size: 0.95rem;
          border: 1px solid var(--light-gray); background: var(--white); color: var(--black);
          resize: none; outline: none; border-radius: 2px; line-height: 1.6;
          transition: border-color 0.2s; min-height: 120px;
        }
        textarea:focus { border-color: var(--black); }

        .btn-main {
          display: inline-block; background: var(--black); color: var(--white);
          font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.9rem 2rem; border: 1px solid var(--black);
          cursor: pointer; transition: background 0.2s, color 0.2s;
          margin-top: 1rem; font-family: var(--font-body);
        }
        .btn-main:hover { background: transparent; color: var(--black); }
        .btn-main:disabled { opacity: 0.4; cursor: not-allowed; }
        .btn-ghost {
          display: inline-block; background: transparent; color: var(--gray);
          font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 0.9rem 1.5rem; border: none; cursor: pointer;
          margin-top: 1rem; margin-left: 0.5rem; font-family: var(--font-body); transition: color 0.2s;
        }
        .btn-ghost:hover { color: var(--black); }
        .btn-outline {
          display: inline-block; background: transparent; color: var(--black);
          font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.9rem 2rem; border: 1px solid var(--light-gray);
          cursor: pointer; transition: border-color 0.2s;
          margin-top: 1rem; margin-left: 0.75rem; font-family: var(--font-body);
        }
        .btn-outline:hover { border-color: var(--black); }

        .persona-actions {
          display: flex; flex-wrap: wrap; gap: 0.75rem;
          margin-top: 2rem; align-items: center;
        }
        .persona-actions .btn-main { margin-top: 0; }
        .persona-actions .btn-outline { margin-top: 0; margin-left: 0; }
        .persona-actions .btn-ghost { margin-top: 0; margin-left: 0; padding-left: 0; }

        .generating-wrap {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; min-height: 60vh; text-align: center;
        }
        .generating-icon {
          font-family: var(--font-display); font-size: 6rem;
          color: var(--light-gray); margin-bottom: 1.5rem;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .saved-banner {
          background: var(--light-gray); padding: 0.85rem 1.25rem; margin-bottom: 2rem;
          display: flex; align-items: center; justify-content: space-between;
          border-left: 3px solid var(--accent);
        }
        .saved-banner-text { font-size: 0.82rem; color: var(--gray); }
        .saved-banner-clear {
          font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--gray); background: none; border: none; cursor: pointer;
          font-family: var(--font-body); transition: color 0.2s;
        }
        .saved-banner-clear:hover { color: var(--black); }

        /* PERSONA CARD */
        .persona-card { border: 1px solid var(--light-gray); margin-bottom: 2rem; }
        .persona-header {
          background: var(--black); color: var(--white); padding: 0;
          display: grid; grid-template-columns: 180px 1fr;
        }
        .persona-photo {
          position: relative; background: #111; overflow: hidden;
          min-height: 200px;
        }
        .persona-header-right {
          padding: 2rem 2.5rem; display: flex; flex-direction: column; justify-content: flex-end;
        }
        .persona-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
        .persona-badge {
          background: var(--accent); color: var(--black);
          font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.3rem 0.65rem; font-weight: 500;
        }
        .persona-badge.secondary {
          background: transparent; color: #777; border: 1px solid #333;
        }
        .persona-name {
          font-family: var(--font-display); font-size: 2.2rem;
          letter-spacing: 0.03em; margin-bottom: 0.35rem;
        }
        .persona-meta { font-size: 0.8rem; color: #777; }
        .persona-quote {
          padding: 1.5rem 2.5rem; border-bottom: 1px solid var(--light-gray);
          font-family: var(--font-serif); font-style: italic;
          font-size: 1.05rem; line-height: 1.55; color: #444;
        }
        .persona-body { padding: 2rem 2.5rem; }
        .persona-bio { font-size: 0.9rem; line-height: 1.75; color: #555; margin-bottom: 2rem; }
        .persona-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 3rem; margin-bottom: 2rem; }
        .persona-group-title {
          font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 0.6rem;
        }
        .persona-items { display: flex; flex-direction: column; gap: 0.35rem; }
        .persona-item {
          font-size: 0.85rem; color: var(--black); line-height: 1.45;
          display: flex; align-items: flex-start; gap: 0.5rem;
        }
        .persona-item::before {
          content: ''; width: 4px; height: 4px; background: var(--accent);
          border-radius: 50%; flex-shrink: 0; margin-top: 0.42rem;
        }
        .persona-insight {
          background: var(--light-gray); padding: 1.25rem 1.5rem;
          border-left: 3px solid var(--accent); margin-bottom: 1.5rem;
        }
        .persona-insight-label {
          font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--gray); margin-bottom: 0.4rem;
        }
        .persona-insight-text { font-size: 0.875rem; color: var(--black); line-height: 1.55; }
        .persona-traits { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .persona-trait {
          font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase;
          border: 1px solid var(--light-gray); padding: 0.25rem 0.65rem; color: var(--gray);
        }

        /* CHAT - two panel like Lukas */
        .chat-wrap {
          position: fixed; top: 72px; left: 0; right: 0; bottom: 0;
          display: grid; grid-template-columns: 320px 1fr;
          background: var(--white); z-index: 50;
        }
        .chat-left {
          background: var(--black); display: flex; flex-direction: column; overflow: hidden;
        }
        .chat-photo { flex: 1; position: relative; overflow: hidden; background: #111; }
        .chat-info { padding: 1.5rem 1.75rem; border-top: 1px solid #1e1e1c; flex-shrink: 0; }
        .chat-persona-name {
          font-family: var(--font-display); font-size: 1.8rem;
          letter-spacing: 0.05em; color: var(--white); margin-bottom: 0.2rem;
        }
        .chat-persona-meta { font-size: 0.75rem; color: #666; margin-bottom: 0.85rem; line-height: 1.5; }
        .chat-status {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: #555;
        }
        .chat-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); animation: blink 2s ease-in-out infinite; flex-shrink: 0;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .chat-right {
          display: flex; flex-direction: column; overflow: hidden;
        }
        .chat-header {
          padding: 1.25rem 2rem; border-bottom: 1px solid var(--light-gray);
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 1rem; flex-shrink: 0;
        }
        .chat-header-title {
          font-family: var(--font-serif); font-size: 1rem; color: var(--black); margin-bottom: 0.2rem;
        }
        .chat-header-sub { font-size: 0.73rem; color: var(--gray); line-height: 1.5; }
        .chat-header-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }
        .chat-header-btn {
          font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--gray); background: none; border: 1px solid var(--light-gray);
          padding: 0.4rem 0.75rem; cursor: pointer; font-family: var(--font-body);
          transition: all 0.2s; white-space: nowrap;
        }
        .chat-header-btn:hover { border-color: var(--black); color: var(--black); }

        .chat-context-banner {
          padding: 0.75rem 2rem; background: var(--light-gray);
          border-bottom: 1px solid #d8d7d2; flex-shrink: 0;
          font-size: 0.76rem; color: #555; line-height: 1.5;
        }
        .chat-context-banner strong { color: var(--black); font-weight: 500; }

        .chat-messages {
          flex: 1; overflow-y: auto; padding: 1.25rem 2rem;
          display: flex; flex-direction: column; gap: 1rem;
        }
        .chat-msg { display: flex; flex-direction: column; gap: 0.2rem; max-width: 75%; }
        .chat-msg.user { align-self: flex-end; align-items: flex-end; }
        .chat-msg.assistant { align-self: flex-start; }
        .chat-sender { font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gray); }
        .chat-bubble { padding: 0.7rem 1rem; font-size: 0.875rem; line-height: 1.65; border-radius: 2px; }
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
        @keyframes typingBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

        .chat-input-area {
          padding: 1rem 2rem; border-top: 1px solid var(--light-gray);
          display: flex; gap: 0; flex-shrink: 0;
        }
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

        .export-modal-bg {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center; z-index: 200;
        }
        .export-modal {
          background: var(--white); padding: 2.5rem;
          max-width: 420px; width: 90%; border: 1px solid var(--light-gray);
        }
        .export-modal-title {
          font-family: var(--font-serif); font-size: 1.4rem; margin-bottom: 0.5rem; color: var(--black);
        }
        .export-modal-sub { font-size: 0.85rem; color: var(--gray); margin-bottom: 1.5rem; line-height: 1.5; }
        .export-input {
          width: 100%; padding: 0.85rem 1rem; font-family: var(--font-body); font-size: 0.9rem;
          border: 1px solid var(--light-gray); background: var(--white); color: var(--black);
          outline: none; border-radius: 2px; transition: border-color 0.2s; margin-bottom: 1rem;
        }
        .export-input:focus { border-color: var(--black); }
        .export-success { text-align: center; padding: 1rem 0; }
        .export-success-icon {
          font-family: var(--font-display); font-size: 3rem; color: var(--accent);
          display: block; margin-bottom: 0.5rem;
        }
        .export-success-text { font-size: 0.9rem; color: var(--gray); line-height: 1.5; }

        @media (max-width: 768px) {
          .tool-wrap { padding: 6rem 1.5rem 3rem; }
          .domain-grid { grid-template-columns: repeat(2, 1fr); }
          .type-grid { grid-template-columns: 1fr; }
          .avatar-grid { grid-template-columns: repeat(4, 1fr); }
          .persona-cols { grid-template-columns: 1fr; }
          .persona-header { grid-template-columns: 1fr; }
          .persona-photo { height: 200px; }
          .tool-nav { padding: 1rem 1.5rem; }
          .persona-actions { flex-direction: column; align-items: flex-start; }
          .chat-wrap { grid-template-columns: 1fr; }
          .chat-left { height: 40vh; }
        }
      `}</style>

      <nav className="tool-nav">
        <a href="/" className="tool-nav-logo">Enes Gozukucuk</a>
        <a href="/" className="tool-nav-back">Back to portfolio</a>
      </nav>

      {/* CHAT OVERLAY - full screen two panel */}
      {phase === "chat" && persona && (
        <div className="chat-wrap">
          {/* LEFT */}
          <div className="chat-left">
            <div className="chat-photo">
              {selectedAvatar ? (
                <Image
                  src={`/avatars/${selectedAvatar}.jpg`}
                  alt={persona.name}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#1a1a18",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontSize: "4rem", color: "#333",
                  letterSpacing: "0.05em" }}>
                  {persona.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="chat-info">
              <div className="chat-persona-name">{persona.name.toUpperCase()}</div>
              <div className="chat-persona-meta">
                {persona.age} · {persona.occupation}<br />{persona.location}
              </div>
              <div className="chat-status">
                <div className="chat-status-dot" />
                Ready to talk
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="chat-right">
            <div className="chat-header">
              <div>
                <div className="chat-header-title">Interview {persona.name}</div>
                <div className="chat-header-sub">
                  {selectedPersonaType?.label} persona · {selectedDomain?.label} context
                </div>
              </div>
              <div className="chat-header-actions">
                <button className="chat-header-btn" onClick={() => { setShowExport(true); setExportSent(false); }}>
                  Export
                </button>
                <button className="chat-header-btn" onClick={() => setPhase("persona")}>
                  Back to card
                </button>
              </div>
            </div>
            <div className="chat-context-banner">
              <strong>{persona.name}</strong> · {persona.bio}
            </div>
            <div className="chat-messages">
              {chatMessages.map((m, i) => (
                <div key={i} className={`chat-msg ${m.role}`}>
                  <div className="chat-sender">{m.role === "user" ? "You" : persona.name}</div>
                  <div className="chat-bubble">{m.content}</div>
                </div>
              ))}
              {loading && (
                <div className="typing-indicator">
                  <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input-area">
              <textarea
                className="chat-input"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask anything..."
                rows={1}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); }
                }}
              />
              <button className="chat-send" onClick={sendChat} disabled={loading || !chatInput.trim()}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {phase !== "chat" && (
        <div className="tool-wrap">

          {/* DOMAIN */}
          {phase === "domain" && (
            <>
              <div className="phase-label">AI Persona Builder</div>
              <h1 className="phase-title">Build a research-quality persona.</h1>
              <p className="phase-sub">Pick your domain. The questions adapt to your context.</p>
              <div className="domain-grid">
                {domains.map(d => (
                  <button key={d.id} className="domain-card" onClick={() => selectDomain(d)}>
                    <div className="domain-label">{d.label}</div>
                    <div className="domain-desc">{d.description}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* PERSONA TYPE */}
          {phase === "personatype" && (
            <>
              <div className="breadcrumb"><span>{selectedDomain?.label}</span> / Who is this persona?</div>
              <div className="phase-label">Step 2</div>
              <h1 className="phase-title">Who are you designing for?</h1>
              <p className="phase-sub">Choose the type of person. This shapes the depth of questions you will be asked.</p>

              <div className="avatar-section">
                <div className="avatar-section-title">Choose a face for your persona (optional)</div>
                <div className="avatar-grid">
                  {avatarList.map(a => (
                    <button
                      key={a.id}
                      className={`avatar-btn ${selectedAvatar === a.id ? "selected" : ""}`}
                      onClick={() => setSelectedAvatar(selectedAvatar === a.id ? null : a.id)}
                      title={a.label}
                    >
                      <img src={a.src} alt={a.label} className="avatar-img" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="type-grid">
                {(domainPersonaTypes[selectedDomain?.id || "general"] || domainPersonaTypes.general).map(t => (
                  <button key={t.id} className="type-card" onClick={() => startWithType(t)}>
                    <div className="type-label">{t.label}</div>
                    <div className="type-desc">{t.description}</div>
                  </button>
                ))}
              </div>
              <button className="type-none" onClick={() => startWithType(null)}>
                <span className="type-none-label">None of these fit my persona. Skip this step.</span>
                <span className="type-none-arrow">Continue anyway</span>
              </button>
              <button className="btn-ghost" style={{ marginTop: 0, paddingLeft: 0 }} onClick={() => setPhase("domain")}>
                Back to domains
              </button>
            </>
          )}

          {/* NAMING */}
          {phase === "naming" && (
            <>
              <div className="breadcrumb">
                <span>{selectedDomain?.label}</span> /
                <span>{selectedPersonaType?.label || "Custom"}</span> / Name
              </div>
              <div className="phase-label">Optional</div>
              <h1 className="phase-title">Would you like to name your persona?</h1>
              <p className="phase-sub">Give your persona a name to make them feel more real. Leave it blank and we will generate one automatically.</p>
              <div className="naming-wrap">
                <input
                  className="naming-input"
                  type="text"
                  placeholder="e.g. Sarah, Marcus, Dr. Kim..."
                  value={personaNameInput}
                  onChange={e => setPersonaNameInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") startQuestionnaire(); }}
                />
                <button className="btn-main" style={{ marginTop: 0 }} onClick={startQuestionnaire}>
                  {personaNameInput.trim() ? `Start with ${personaNameInput.trim()}` : "Start with a random name"}
                </button>
                <button className="btn-ghost" onClick={() => setPhase("personatype")}>
                  Back
                </button>
              </div>
            </>
          )}

          {/* QUESTIONNAIRE */}
          {phase === "questionnaire" && (
            <>
              <div className="breadcrumb">
                <span>{selectedDomain?.label}</span> /
                <span>{selectedPersonaType?.label || "Custom"}</span> /
                Question {currentQ + 1} of {questions.length}
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(currentQ / questions.length) * 100}%` }} />
              </div>
              <div className="question-num">0{currentQ + 1}</div>
              {!awaitingFollowUp ? (
                <>
                  <div className="question-text">{questions[currentQ]}</div>
                  <textarea
                    value={currentAnswer}
                    onChange={e => setCurrentAnswer(e.target.value)}
                    placeholder="Take your time. The more specific you are, the richer the persona."
                    onKeyDown={e => { if (e.key === "Enter" && e.metaKey) handleAnswer(); }}
                  />
                  <div>
                    <button className="btn-main" onClick={handleAnswer} disabled={!currentAnswer.trim()}>
                      {currentQ + 1 === questions.length ? "Generate Persona" : "Next"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="question-text">{questions[currentQ]}</div>
                  <div className="followup-box">{followUp}</div>
                  <textarea
                    value={followUpAnswer}
                    onChange={e => setFollowUpAnswer(e.target.value)}
                    placeholder="Your answer..."
                  />
                  <div>
                    <button className="btn-main" onClick={handleFollowUp} disabled={!followUpAnswer.trim()}>
                      Continue
                    </button>
                    <button className="btn-ghost" onClick={skipFollowUp}>Skip</button>
                  </div>
                </>
              )}
            </>
          )}

          {/* GENERATING */}
          {phase === "generating" && (
            <div className="generating-wrap">
              <div className="generating-icon">EG</div>
              <div className="phase-label" style={{ justifyContent: "center" }}>Building your persona</div>
              <p className="phase-sub" style={{ maxWidth: 380 }}>
                Synthesising your answers into a research-quality persona.
              </p>
            </div>
          )}

          {/* PERSONA CARD */}
          {phase === "persona" && persona && (
            <>
              <div className="saved-banner">
                <span className="saved-banner-text">Persona saved. It will be here when you come back.</span>
                <button className="saved-banner-clear" onClick={clearSaved}>Clear and start over</button>
              </div>
              <div className="phase-label">Persona Generated</div>
              <h2 className="phase-title" style={{ marginBottom: "2rem" }}>Meet {persona.name}.</h2>
              <div className="persona-card">
                <div className="persona-header">
                  <div className="persona-photo">
                    {selectedAvatar ? (
                      <Image
                        src={`/avatars/${selectedAvatar}.jpg`}
                        alt={persona.name}
                        fill
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "#1a1a18",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-display)", fontSize: "5rem", color: "#333" }}>
                        {persona.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="persona-header-right">
                    <div className="persona-badges">
                      <div className="persona-badge">{selectedDomain?.label}</div>
                      {selectedPersonaType && (
                        <div className="persona-badge secondary">{selectedPersonaType.label}</div>
                      )}
                    </div>
                    <div className="persona-name">{persona.name}</div>
                    <div className="persona-meta">{persona.age} · {persona.occupation} · {persona.location}</div>
                  </div>
                </div>
                <div className="persona-quote">"{persona.quote}"</div>
                <div className="persona-body">
                  <p className="persona-bio">{persona.bio}</p>
                  <div className="persona-cols">
                    <div>
                      <div className="persona-group-title">Goals</div>
                      <div className="persona-items">
                        {persona.goals.map((g, i) => <div className="persona-item" key={i}>{g}</div>)}
                      </div>
                    </div>
                    <div>
                      <div className="persona-group-title">Frustrations</div>
                      <div className="persona-items">
                        {persona.frustrations.map((f, i) => <div className="persona-item" key={i}>{f}</div>)}
                      </div>
                    </div>
                    <div>
                      <div className="persona-group-title">Motivations</div>
                      <div className="persona-items">
                        {persona.motivations.map((m, i) => <div className="persona-item" key={i}>{m}</div>)}
                      </div>
                    </div>
                    <div>
                      <div className="persona-group-title">Fears</div>
                      <div className="persona-items">
                        {persona.fears.map((f, i) => <div className="persona-item" key={i}>{f}</div>)}
                      </div>
                    </div>
                  </div>
                  <div className="persona-insight">
                    <div className="persona-insight-label">Design Insight</div>
                    <div className="persona-insight-text">{persona.insight}</div>
                  </div>
                  <div className="persona-group-title" style={{ marginBottom: "0.6rem" }}>Personality</div>
                  <div className="persona-traits">
                    {persona.personality.map((t, i) => <span className="persona-trait" key={i}>{t}</span>)}
                  </div>
                </div>
              </div>
              <div className="persona-actions">
                <button className="btn-main" onClick={startChat}>
                  {chatMessages.length > 0 ? "Continue interview" : "Interview this persona"}
                </button>
                <button className="btn-outline" onClick={() => { setShowExport(true); setExportSent(false); }}>
                  Export results
                </button>
                <button className="btn-ghost" onClick={clearSaved}>
                  Build another
                </button>
              </div>
            </>
          )}

        </div>
      )}

      {/* EXPORT MODAL */}
      {showExport && (
        <div className="export-modal-bg" onClick={() => setShowExport(false)}>
          <div className="export-modal" onClick={e => e.stopPropagation()}>
            {!exportSent ? (
              <>
                <div className="export-modal-title">Export your persona</div>
                <div className="export-modal-sub">
                  We will send the persona card{chatMessages.length > 0 ? " and your interview transcript" : ""} to your email.
                </div>
                <input
                  className="export-input"
                  type="email"
                  placeholder="your@email.com"
                  value={exportEmail}
                  onChange={e => setExportEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") sendExport(); }}
                />
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <button className="btn-main" style={{ marginTop: 0 }} onClick={sendExport} disabled={exportLoading || !exportEmail.trim()}>
                    {exportLoading ? "Sending..." : "Send"}
                  </button>
                  <button className="btn-ghost" style={{ marginTop: 0, marginLeft: 0 }} onClick={() => setShowExport(false)}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="export-success">
                <span className="export-success-icon">OK</span>
                <div className="export-modal-title">Sent.</div>
                <div className="export-success-text">Check your inbox for {exportEmail}.</div>
                <button className="btn-ghost" style={{ marginTop: "1rem" }} onClick={() => setShowExport(false)}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}