const SESSIONS_STORAGE_KEY = "capacity_live_sessions_v1";

export const INITIAL_LIVE_SESSIONS = [
  {
    id: "sess-1",
    title: "Leadership Case Study: DACI Decision-Making in Crisis",
    cohort: "Q3 Operations Cohort (Cohort A)",
    course: "Leadership Essentials",
    date: "Today",
    time: "3:00 PM – 4:15 PM (PST)",
    platform: "Zoom Video Meeting",
    meetingUrl: "https://zoom.us/j/94829104812",
    attendeesCount: 28,
    maxCapacity: 30,
    status: "Starting Soon",
    statusTone: "orange",
    agenda: "Breakdown of the Driver vs Approver roles during an incident escalation. Live breakout group scenario and review.",
  },
  {
    id: "sess-2",
    title: "SQL Window Functions & Recursive Queries Hands-On Lab",
    cohort: "Q3 Analytics & Data Cohort (Cohort B)",
    course: "Data Analytics & SQL Mastery",
    date: "Tomorrow",
    time: "2:00 PM – 3:30 PM (PST)",
    platform: "Google Meet",
    meetingUrl: "https://meet.google.com/qwe-rtyu-iop",
    attendeesCount: 34,
    maxCapacity: 40,
    status: "Confirmed",
    statusTone: "green",
    agenda: "Interactive live query crafting using partition by, rank, and dense_rank on real transactional datasets.",
  },
  {
    id: "sess-3",
    title: "Executive BLUF Communication & Stakeholder Pitching Clinic",
    cohort: "Q2 Enterprise Cross-Functional (Cohort C)",
    course: "Communication at Work",
    date: "Friday, 25 Sep",
    time: "11:00 AM – 12:15 PM (PST)",
    platform: "Microsoft Teams",
    meetingUrl: "https://teams.microsoft.com/l/meetup-join/1992019",
    attendeesCount: 22,
    maxCapacity: 25,
    status: "Confirmed",
    statusTone: "green",
    agenda: "Live 3-minute executive briefings delivered by trainee volunteers with real-time feedback on structure and conciseness.",
  },
  {
    id: "sess-4",
    title: "Generative AI Pattern Prompting & Guardrails Hackathon",
    cohort: "Q3 Engineering & Tech Cohort (Cohort D)",
    course: "Generative AI & Prompt Engineering for Work",
    date: "Next Monday, 28 Sep",
    time: "4:00 PM – 5:30 PM (PST)",
    platform: "Zoom Video Meeting",
    meetingUrl: "https://zoom.us/j/88391024102",
    attendeesCount: 42,
    maxCapacity: 45,
    status: "Confirmed",
    statusTone: "green",
    agenda: "Constructing few-shot system prompts with schema enforcement. Building repeatable workplace prompt workflows.",
  },
];

export function loadLiveSessions() {
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load live sessions:", e);
  }
  return INITIAL_LIVE_SESSIONS;
}

export function saveLiveSessions(sessions) {
  try {
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error("Failed to save live sessions:", e);
  }
}

export function addLiveSession(session) {
  const current = loadLiveSessions();
  const updated = [session, ...current];
  saveLiveSessions(updated);
  return updated;
}
