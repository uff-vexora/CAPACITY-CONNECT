const TRAINERS_STORAGE_KEY = "capacity_shared_trainers_v1";

export const INITIAL_TRAINERS = [
  {
    id: "INST-01",
    name: "Anita Verma",
    email: "anita.verma@capacityconnect.org",
    role: "Senior Capability Architect & Lead Facilitator",
    domain: "Leadership & Decision-Making",
    activeCohorts: 4,
    traineesMentored: 218,
    rating: "4.92",
    status: "Active",
    coursesTaught: ["Leadership Essentials", "Advanced Team Management"],
    joinedDate: "15 Jan 2024",
  },
  {
    id: "INST-02",
    name: "Rohan Mehta",
    email: "rohan.mehta@capacityconnect.org",
    role: "Executive Communication & Alignment Coach",
    domain: "Workplace Communication",
    activeCohorts: 3,
    traineesMentored: 185,
    rating: "4.88",
    status: "Active",
    coursesTaught: ["Communication at Work"],
    joinedDate: "02 Mar 2024",
  },
  {
    id: "INST-03",
    name: "Vikram Singh",
    email: "vikram.singh@capacityconnect.org",
    role: "Senior Lean Six Sigma & Agile Master",
    domain: "Process Optimization & Agile",
    activeCohorts: 3,
    traineesMentored: 160,
    rating: "4.91",
    status: "Active",
    coursesTaught: ["Agile & Scrum Project Management"],
    joinedDate: "10 Jun 2024",
  },
  {
    id: "INST-04",
    name: "Priya Nair",
    email: "priya.nair@capacityconnect.org",
    role: "Director of Safety Operations & Audits",
    domain: "Operational Safety & Compliance",
    activeCohorts: 2,
    traineesMentored: 240,
    rating: "4.95",
    status: "Active",
    coursesTaught: ["Operational Safety Readiness"],
    joinedDate: "18 Aug 2023",
  },
  {
    id: "INST-05",
    name: "Dev Academy Faculty",
    email: "dev.academy@capacityconnect.org",
    role: "Technical Engineering Faculty Lead",
    domain: "Software Engineering & Cloud",
    activeCohorts: 2,
    traineesMentored: 210,
    rating: "4.86",
    status: "Active",
    coursesTaught: ["Full-Stack Web Development Foundations"],
    joinedDate: "12 Nov 2024",
  },
  {
    id: "INST-06",
    name: "AI Research Lab",
    email: "ai.lab@capacityconnect.org",
    role: "Applied AI & Automation Research Fellow",
    domain: "Generative AI & Automation",
    activeCohorts: 2,
    traineesMentored: 235,
    rating: "4.93",
    status: "Active",
    coursesTaught: ["Generative AI & Prompt Engineering for Work"],
    joinedDate: "05 Feb 2025",
  },
];

export function loadTrainers() {
  try {
    const raw = localStorage.getItem(TRAINERS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load trainers:", e);
  }
  return INITIAL_TRAINERS;
}

export function saveTrainers(trainers) {
  try {
    localStorage.setItem(TRAINERS_STORAGE_KEY, JSON.stringify(trainers));
  } catch (e) {
    console.error("Failed to save trainers:", e);
  }
}

export function addTrainer(trainer) {
  const current = loadTrainers();
  const updated = [trainer, ...current];
  saveTrainers(updated);
  return updated;
}
