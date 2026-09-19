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

const NOTIF_STORAGE_KEY = "capacity_notifications_v1";

export function loadNotifications() {
  try {
    const raw = localStorage.getItem(NOTIF_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load notifications:", e);
  }
  return INITIAL_NOTIFICATIONS;
}

export function saveNotifications(notifications) {
  try {
    localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(notifications));
  } catch (e) {
    console.error("Failed to save notifications:", e);
  }
}
