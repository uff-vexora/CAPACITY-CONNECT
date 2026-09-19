export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "course",
    icon: "Sparkles",
    title: "New Course Available: Generative AI & Prompt Engineering",
    description: "A new pathway has been added to your catalog to build workplace AI competencies.",
    time: "10m ago",
    read: false,
    targetPage: "Course Details",
    courseId: "ai-prompt-engineering",
  },
  {
    id: "notif-2",
    type: "milestone",
    icon: "TrendingUp",
    title: "Leadership Progress Milestone",
    description: "You've made active progress in Leadership Essentials. Keep going to close your 26% gap.",
    time: "2h ago",
    read: false,
    targetPage: "My Courses",
  },
  {
    id: "notif-3",
    type: "certificate",
    icon: "Award",
    title: "Certificate Generated",
    description: "Your Certificate of Completion for Operational Safety Readiness is ready to view.",
    time: "Yesterday",
    read: false,
    targetPage: "Certificates",
  },
  {
    id: "notif-4",
    type: "assessment",
    icon: "ClipboardCheck",
    title: "Competency Assessment Benchmark",
    description: "Your baseline readiness is assessed at 72%. Review your latest skill breakdown.",
    time: "3 days ago",
    read: true,
    targetPage: "Skill Gap",
  },
  {
    id: "notif-5",
    type: "system",
    icon: "Bell",
    title: "Welcome to Capacity Connect",
    description: "Explore your active pathways, take benchmark assessments, and track capability metrics.",
    time: "1 week ago",
    read: true,
    targetPage: "Dashboard",
  },
];

export const INITIAL_TRAINER_NOTIFICATIONS = [
  {
    id: "tr-notif-1",
    type: "assessment",
    icon: "ClipboardCheck",
    title: "New Assessment Submissions Pending Review",
    description: "3 trainees from Q3 Operations Cohort submitted evaluations for Leadership Essentials.",
    time: "15m ago",
    read: false,
    targetPage: "Assessments",
  },
  {
    id: "tr-notif-2",
    type: "session",
    icon: "Calendar",
    title: "Live Cohort Session Starting Today at 3:00 PM",
    description: "Leadership Case Study: Incident Command & DACI in Crisis starts in 45 minutes on Zoom. 28 trainees RSVP'd.",
    time: "45m ago",
    read: false,
    targetPage: "Live Sessions",
  },
  {
    id: "tr-notif-3",
    type: "certificate",
    icon: "Award",
    title: "Trainee Milestone: Sarah Chen Completed Syllabus",
    description: "Sarah Chen scored 94% on Full-Stack Web Development Foundations and completed 100% of modules.",
    time: "2h ago",
    read: false,
    targetPage: "Trainees",
  },
  {
    id: "tr-notif-4",
    type: "course",
    icon: "TrendingUp",
    title: "Cohort Benchmark Calibrated",
    description: "Q3 Operations Cohort reached 82% average benchmark attainment in Leadership competencies.",
    time: "Yesterday",
    read: true,
    targetPage: "Performance",
  },
  {
    id: "tr-notif-5",
    type: "system",
    icon: "FolderUp",
    title: "Resource Download Surge",
    description: "28 trainees downloaded 'Situation-Behavior-Impact (SBI) Feedback Framework Toolkit' from the repository.",
    time: "2 days ago",
    read: true,
    targetPage: "Resources",
  },
];

export const INITIAL_ADMIN_NOTIFICATIONS = [
  {
    id: "adm-notif-1",
    type: "milestone",
    icon: "TrendingUp",
    title: "Enterprise Benchmark Calibrated",
    description: "Workforce competency improved by +5.2% YoY. Engineering reached 82% benchmark.",
    time: "20m ago",
    read: false,
    targetPage: "Competency",
  },
  {
    id: "adm-notif-2",
    type: "course",
    icon: "BookOpen",
    title: "Curriculum Governance Alert",
    description: "New course 'Generative AI & Prompt Engineering' published by AI Research Lab.",
    time: "1h ago",
    read: false,
    targetPage: "Courses",
  },
  {
    id: "adm-notif-3",
    type: "certificate",
    icon: "Award",
    title: "Cohort Certification Audit Complete",
    description: "42 credentials conferred across Q2 & Q3 cohorts verified for ISO compliance.",
    time: "3h ago",
    read: false,
    targetPage: "Reports",
  },
  {
    id: "adm-notif-4",
    type: "system",
    icon: "Users",
    title: "Workforce Onboarding Wave",
    description: "34 new trainees enrolled into organization pathways this month.",
    time: "Yesterday",
    read: true,
    targetPage: "Users",
  },
  {
    id: "adm-notif-5",
    type: "assessment",
    icon: "ListChecks",
    title: "Priority Training Need Flagged",
    description: "High leadership skill deficit detected in Regional Operations department (84 employees affected).",
    time: "2 days ago",
    read: true,
    targetPage: "Training Needs",
  },
];

const NOTIF_STORAGE_KEY = "capacity_notifications_v1";
const TRAINER_NOTIF_STORAGE_KEY = "capacity_notifications_trainer_v1";
const ADMIN_NOTIF_STORAGE_KEY = "capacity_notifications_admin_v1";

export function loadNotifications(role = "Trainee") {
  const key = role === "Trainer" ? TRAINER_NOTIF_STORAGE_KEY : role === "Admin" ? ADMIN_NOTIF_STORAGE_KEY : NOTIF_STORAGE_KEY;
  const initial = role === "Trainer" ? INITIAL_TRAINER_NOTIFICATIONS : role === "Admin" ? INITIAL_ADMIN_NOTIFICATIONS : INITIAL_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load notifications:", e);
  }
  return initial;
}

export function saveNotifications(notifications, role = "Trainee") {
  const key = role === "Trainer" ? TRAINER_NOTIF_STORAGE_KEY : role === "Admin" ? ADMIN_NOTIF_STORAGE_KEY : NOTIF_STORAGE_KEY;
  try {
    localStorage.setItem(key, JSON.stringify(notifications));
  } catch (e) {
    console.error("Failed to save notifications:", e);
  }
}
