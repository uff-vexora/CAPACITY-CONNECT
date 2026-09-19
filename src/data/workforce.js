const WORKFORCE_STORAGE_KEY = "capacity_shared_workforce_v1";

export const INITIAL_WORKFORCE = [
  {
    id: "EMP-101",
    name: "Alex Morgan",
    email: "alex.morgan@capacityconnect.org",
    role: "Operations Associate",
    department: "Regional Operations",
    enrolledCourse: "Leadership Essentials",
    progress: 75,
    assessmentScore: 90,
    competency: "90%",
    status: "Certified",
    statusTone: "green",
    joinedDate: "12 May 2026",
    manager: "Anita Verma",
  },
  {
    id: "EMP-102",
    name: "Sarah Chen",
    email: "sarah.chen@capacityconnect.org",
    role: "Junior Software Engineer",
    department: "Engineering & Tech",
    enrolledCourse: "Full-Stack Web Development Foundations",
    progress: 100,
    assessmentScore: 94,
    competency: "94%",
    status: "Certified",
    statusTone: "green",
    joinedDate: "04 Jun 2026",
    manager: "Dev Academy",
  },
  {
    id: "EMP-103",
    name: "Rahul Sharma",
    email: "rahul.sharma@capacityconnect.org",
    role: "Process Coordinator",
    department: "Regional Operations",
    enrolledCourse: "Communication at Work",
    progress: 50,
    assessmentScore: 68,
    competency: "72%",
    status: "In Progress",
    statusTone: "orange",
    joinedDate: "20 Jun 2026",
    manager: "Anita Verma",
  },
  {
    id: "EMP-104",
    name: "Maria Garcia",
    email: "maria.garcia@capacityconnect.org",
    role: "Data Specialist",
    department: "Analytics & Strategy",
    enrolledCourse: "Data Analytics & SQL Mastery",
    progress: 100,
    assessmentScore: 96,
    competency: "96%",
    status: "Certified",
    statusTone: "green",
    joinedDate: "15 Jul 2026",
    manager: "Vikram Singh",
  },
  {
    id: "EMP-105",
    name: "David Kim",
    email: "david.kim@capacityconnect.org",
    role: "Agile Project Associate",
    department: "Project Management",
    enrolledCourse: "Agile & Scrum Project Management",
    progress: 25,
    assessmentScore: 58,
    competency: "58%",
    status: "Needs Training",
    statusTone: "rust",
    joinedDate: "02 Aug 2026",
    manager: "Vikram Singh",
  },
  {
    id: "EMP-106",
    name: "Anita Deshmukh",
    email: "anita.d@capacityconnect.org",
    role: "Solutions Analyst",
    department: "Engineering & Tech",
    enrolledCourse: "Generative AI & Prompt Engineering for Work",
    progress: 66,
    assessmentScore: 84,
    competency: "84%",
    status: "In Progress",
    statusTone: "orange",
    joinedDate: "18 Aug 2026",
    manager: "AI Research Lab",
  },
  {
    id: "EMP-107",
    name: "Priya Menon",
    email: "priya.m@capacityconnect.org",
    role: "Client Team Lead",
    department: "Customer Success",
    enrolledCourse: "Leadership Essentials",
    progress: 80,
    assessmentScore: 86,
    competency: "86%",
    status: "Certified",
    statusTone: "green",
    joinedDate: "01 Sep 2026",
    manager: "Rohan Mehta",
  },
  {
    id: "EMP-108",
    name: "Arun Patel",
    email: "arun.p@capacityconnect.org",
    role: "Process Engineer",
    department: "Manufacturing & Field",
    enrolledCourse: "Operational Safety Readiness",
    progress: 60,
    assessmentScore: 66,
    competency: "66%",
    status: "Needs Training",
    statusTone: "rust",
    joinedDate: "08 Sep 2026",
    manager: "Priya Nair",
  },
];

export function loadWorkforce() {
  try {
    const raw = localStorage.getItem(WORKFORCE_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load workforce:", e);
  }
  return INITIAL_WORKFORCE;
}

export function saveWorkforce(workforce) {
  try {
    localStorage.setItem(WORKFORCE_STORAGE_KEY, JSON.stringify(workforce));
  } catch (e) {
    console.error("Failed to save workforce:", e);
  }
}

export function addWorkforceMember(member) {
  const current = loadWorkforce();
  const updated = [member, ...current];
  saveWorkforce(updated);
  return updated;
}

export function updateWorkforceMember(id, patch) {
  const current = loadWorkforce();
  const updated = current.map((m) => (m.id === id ? { ...m, ...patch } : m));
  saveWorkforce(updated);
  return updated;
}
