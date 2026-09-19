export const DEFAULT_USER = {
  name: "Alex Morgan",
  email: "alex.morgan@organization.com",
  role: "trainee",
  department: "Regional Operations",
  designation: "Operations Associate",
  experience: "4 years",
  qualifications: "B.Tech, Industrial Engineering",
  skills: ["Operations", "Safety", "Process improvement", "Team Leadership"],
  interests: "People leadership, team coordination, AI workflows",
  bio: "Operations professional focusing on capacity development, cross-functional team delivery, and automated workflow optimizations.",
};

export const DEFAULT_SETTINGS = {
  learning: {
    dailyGoalMinutes: 30,
    autoPlayNext: true,
    playbackSpeed: "1.0x",
    enableCaptions: false,
    remindFrequency: "daily",
  },
  notifications: {
    emailCourseUpdates: true,
    emailAssessmentAlerts: true,
    emailCertificateEarned: true,
    weeklyLearningDigest: true,
    browserPushNotifications: false,
  },
  appearance: {
    compactCourseView: false,
    autoCollapseSidebarOnVideo: false,
    highContrastMode: false,
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeoutHours: 8,
  },
};

const USER_STORAGE_KEY = "capacity_user_profile_v2";
const SETTINGS_STORAGE_KEY = "capacity_user_settings_v2";

export function loadUserProfile() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load user profile:", e);
  }
  return DEFAULT_USER;
}

export function saveUserProfile(user) {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to save user profile:", e);
  }
}

export function loadUserSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    console.error("Failed to load user settings:", e);
  }
  return DEFAULT_SETTINGS;
}

export function saveUserSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save user settings:", e);
  }
}
