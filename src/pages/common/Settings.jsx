import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { loadUserSettings, saveUserSettings, DEFAULT_SETTINGS } from "../../data/user";

export function Settings({ onBack }) {
  const [settings, setSettings] = useState(() => loadUserSettings());
  const [activeTab, setActiveTab] = useState("learning");
  const [saveStatus, setSaveStatus] = useState(false);

  // Password change form state
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [passwordMsg, setPasswordMsg] = useState("");

  const handleToggle = (category, key) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        [category]: {
          ...prev[category],
          [key]: !prev[category][key],
        },
      };
      saveUserSettings(updated);
      showSavedFeedback();
      return updated;
    });
  };

  const handleSelectChange = (category, key, value) => {
    setSettings((prev) => {
      const updated = {
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value,
        },
      };
      saveUserSettings(updated);
      showSavedFeedback();
      return updated;
    });
  };

  const showSavedFeedback = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwords.current) {
      setPasswordMsg("Please enter your current password.");
      return;
    }
    if (passwords.newPass.length < 6) {
      setPasswordMsg("New password must be at least 6 characters.");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPasswordMsg("New passwords do not match.");
      return;
    }
    setPasswordMsg("Password updated successfully! ✓");
    setPasswords({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setPasswordMsg(""), 3000);
  };

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      platform: "Capacity Connect",
      settings: settings,
      coursesProgress: localStorage.getItem("capacity_user_courses_progress_v2") || "{}",
      notifications: localStorage.getItem("capacity_notifications_v1") || "[]",
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `capacity-connect-transcript-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all settings to default preferences?")) {
      setSettings(DEFAULT_SETTINGS);
      saveUserSettings(DEFAULT_SETTINGS);
      showSavedFeedback();
    }
  };

  return (
    <>
      {onBack && (
        <button className="back-link" onClick={onBack}>
          <Icon name="ArrowLeft" size={15} /> Back
        </button>
      )}

      <PageHead kicker="PREFERENCES & WORKSPACE" title="Settings">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {saveStatus && (
            <span className="pill-completed" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Icon name="Check" size={13} /> Preferences Saved
            </span>
          )}
          <button className="button outline" onClick={handleResetDefaults} title="Reset to default settings">
            Reset Defaults
          </button>
        </div>
      </PageHead>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, borderBottom: "1px solid var(--line)", paddingBottom: 10, flexWrap: "wrap" }}>
        {[
          { id: "learning", label: "Learning & Playback", icon: "BookOpen" },
          { id: "notifications", label: "Notifications & Alerts", icon: "Bell" },
          { id: "appearance", label: "Display & Interface", icon: "Monitor" },
          { id: "security", label: "Security & Passwords", icon: "ShieldCheck" },
          { id: "data", label: "Data & Privacy", icon: "Download" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`button ${isActive ? "dark" : "outline"}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ fontSize: 13, gap: 7 }}
            >
              <Icon name={tab.icon} size={15} /> {tab.label}
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth: 840 }}>
        {/* Tab 1: Learning & Playback */}
        {activeTab === "learning" && (
          <section className="feature" style={{ display: "grid", gap: 20 }}>
            <div>
              <p className="eyebrow">LEARNING TARGETS & HABITS</p>
              <h2>Study Goals & Video Playback</h2>
              <p style={{ color: "var(--muted)", fontSize: 13 }}>
                Configure your daily learning schedule, YouTube player defaults, and pacing.
              </p>
            </div>

            <div style={{ display: "grid", gap: 18, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <b style={{ display: "block", fontSize: 14 }}>Daily Learning Goal</b>
                  <small style={{ color: "var(--muted)" }}>Target minutes allocated to module videos per day</small>
                </div>
                <select
                  value={settings.learning.dailyGoalMinutes}
                  onChange={(e) => handleSelectChange("learning", "dailyGoalMinutes", Number(e.target.value))}
                  style={{ padding: "8px 12px", border: "1px solid var(--line)", background: "var(--paper)" }}
                >
                  <option value={15}>15 minutes / day (Light)</option>
                  <option value={30}>30 minutes / day (Standard)</option>
                  <option value={45}>45 minutes / day (Accelerated)</option>
                  <option value={60}>60 minutes / day (Intensive)</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                <div>
                  <b style={{ display: "block", fontSize: 14 }}>Auto-Play Next Module</b>
                  <small style={{ color: "var(--muted)" }}>Automatically navigate to next lesson after marking complete</small>
                </div>
                <input
                  type="checkbox"
                  checked={settings.learning.autoPlayNext}
                  onChange={() => handleToggle("learning", "autoPlayNext")}
                  style={{ width: 18, height: 18, cursor: "pointer", accentColor: "var(--green)" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                <div>
                  <b style={{ display: "block", fontSize: 14 }}>Default Video Speed</b>
                  <small style={{ color: "var(--muted)" }}>Preferred playback pace for instructional videos</small>
                </div>
                <select
                  value={settings.learning.playbackSpeed}
                  onChange={(e) => handleSelectChange("learning", "playbackSpeed", e.target.value)}
                  style={{ padding: "8px 12px", border: "1px solid var(--line)", background: "var(--paper)" }}
                >
                  <option value="1.0x">1.0x (Normal)</option>
                  <option value="1.25x">1.25x (Recommended)</option>
                  <option value="1.5x">1.5x (Fast)</option>
                  <option value="1.75x">1.75x (Super fast)</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                <div>
                  <b style={{ display: "block", fontSize: 14 }}>Study Reminder Frequency</b>
                  <small style={{ color: "var(--muted)" }}>Schedule automated notification reminders to continue pathways</small>
                </div>
                <select
                  value={settings.learning.remindFrequency}
                  onChange={(e) => handleSelectChange("learning", "remindFrequency", e.target.value)}
                  style={{ padding: "8px 12px", border: "1px solid var(--line)", background: "var(--paper)" }}
                >
                  <option value="daily">Daily morning reminder</option>
                  <option value="weekdays">Weekdays only (Mon - Fri)</option>
                  <option value="weekly">Weekly digest only</option>
                  <option value="none">Disabled</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Notifications */}
        {activeTab === "notifications" && (
          <section className="feature" style={{ display: "grid", gap: 20 }}>
            <div>
              <p className="eyebrow">ALERT CHANNELS & DIGESTS</p>
              <h2>Notification Preferences</h2>
              <p style={{ color: "var(--muted)", fontSize: 13 }}>
                Control how and when Capacity Connect sends notifications and email alerts.
              </p>
            </div>

            <div style={{ display: "grid", gap: 16, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
              {[
                { key: "emailCourseUpdates", title: "New Recommended Course Alerts", desc: "Notify me when fresh courses matching my competency gaps are cataloged." },
                { key: "emailAssessmentAlerts", title: "Assessment Cycle Reminders", desc: "Alerts when scheduled role evaluations or benchmark reviews open." },
                { key: "emailCertificateEarned", title: "Certificate Issuance Notifications", desc: "Instant alert when you complete all modules and a certificate is minted." },
                { key: "weeklyLearningDigest", title: "Weekly Progress Summary Digest", desc: "Receive a Sunday email summarizing time invested, modules completed, and ranking." },
                { key: "browserPushNotifications", title: "In-Browser Push Notifications", desc: "Show desktop banner notifications while using the web application." },
              ].map((item) => (
                <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)", paddingBottom: 14 }}>
                  <div>
                    <b style={{ display: "block", fontSize: 14 }}>{item.title}</b>
                    <small style={{ color: "var(--muted)" }}>{item.desc}</small>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications[item.key]}
                    onChange={() => handleToggle("notifications", item.key)}
                    style={{ width: 18, height: 18, cursor: "pointer", accentColor: "var(--green)" }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Display & Interface */}
        {activeTab === "appearance" && (
          <section className="feature" style={{ display: "grid", gap: 20 }}>
            <div>
              <p className="eyebrow">WORKSPACE CUSTOMIZATION</p>
              <h2>Display & Interface Settings</h2>
              <p style={{ color: "var(--muted)", fontSize: 13 }}>
                Adjust workspace layout density, sidebar behavior, and visual contrast.
              </p>
            </div>

            <div style={{ display: "grid", gap: 16, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)", paddingBottom: 14 }}>
                <div>
                  <b style={{ display: "block", fontSize: 14 }}>Compact Course Cards</b>
                  <small style={{ color: "var(--muted)" }}>Display simplified course rows in My Courses and Recommended lists</small>
                </div>
                <input
                  type="checkbox"
                  checked={settings.appearance.compactCourseView}
                  onChange={() => handleToggle("appearance", "compactCourseView")}
                  style={{ width: 18, height: 18, cursor: "pointer", accentColor: "var(--green)" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)", paddingBottom: 14 }}>
                <div>
                  <b style={{ display: "block", fontSize: 14 }}>Auto-Collapse Sidebar in Video Player</b>
                  <small style={{ color: "var(--muted)" }}>Automatically minimize sidebar when entering video lesson for widescreen mode</small>
                </div>
                <input
                  type="checkbox"
                  checked={settings.appearance.autoCollapseSidebarOnVideo}
                  onChange={() => handleToggle("appearance", "autoCollapseSidebarOnVideo")}
                  style={{ width: 18, height: 18, cursor: "pointer", accentColor: "var(--green)" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--line)", paddingBottom: 14 }}>
                <div>
                  <b style={{ display: "block", fontSize: 14 }}>High-Contrast Text Mode</b>
                  <small style={{ color: "var(--muted)" }}>Enhance contrast across captions, cards, and module outlines</small>
                </div>
                <input
                  type="checkbox"
                  checked={settings.appearance.highContrastMode}
                  onChange={() => handleToggle("appearance", "highContrastMode")}
                  style={{ width: 18, height: 18, cursor: "pointer", accentColor: "var(--green)" }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: Security & Passwords */}
        {activeTab === "security" && (
          <section className="feature" style={{ display: "grid", gap: 24 }}>
            <div>
              <p className="eyebrow">ACCOUNT CREDENTIALS</p>
              <h2>Change Password</h2>
              <p style={{ color: "var(--muted)", fontSize: 13 }}>
                Update your login password to maintain organizational account security.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} style={{ display: "grid", gap: 14, maxWidth: 440 }}>
              <label style={{ fontSize: 13, fontWeight: 500 }}>
                Current Password
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)" }}
                />
              </label>

              <label style={{ fontSize: 13, fontWeight: 500 }}>
                New Password
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={passwords.newPass}
                  onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                  style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)" }}
                />
              </label>

              <label style={{ fontSize: 13, fontWeight: 500 }}>
                Confirm New Password
                <input
                  type="password"
                  placeholder="Repeat new password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)" }}
                />
              </label>

              {passwordMsg && (
                <p style={{ color: passwordMsg.includes("✓") ? "var(--green)" : "var(--rust)", fontSize: 13, margin: "6px 0" }}>
                  {passwordMsg}
                </p>
              )}

              <button type="submit" className="button dark" style={{ width: "fit-content", marginTop: 8 }}>
                Update Password <Icon name="Key" size={15} />
              </button>
            </form>

            <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "10px 0" }} />

            <div>
              <p className="eyebrow">ACTIVE SESSIONS</p>
              <div style={{ background: "#f3f0e6", padding: 16, border: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <b style={{ display: "block", fontSize: 13 }}>Current Browser Session</b>
                  <small style={{ color: "var(--muted)" }}>Windows · Chrome Browser · Active Now</small>
                </div>
                <span className="pill-completed">Online</span>
              </div>
            </div>
          </section>
        )}

        {/* Tab 5: Data & Privacy */}
        {activeTab === "data" && (
          <section className="feature" style={{ display: "grid", gap: 20 }}>
            <div>
              <p className="eyebrow">DATA MANAGEMENT & EXPORT</p>
              <h2>Learning Transcript & Records</h2>
              <p style={{ color: "var(--muted)", fontSize: 13 }}>
                Download an official JSON backup transcript of your completed courses, modules, and notes.
              </p>
            </div>

            <div style={{ display: "grid", gap: 16, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
              <div style={{ background: "#faf8f2", padding: 20, border: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <b style={{ display: "block", fontSize: 14 }}>Export Learning Transcript</b>
                  <small style={{ color: "var(--muted)" }}>Download structured JSON report with all modules and completion timestamps</small>
                </div>
                <button className="button dark" onClick={handleExportData}>
                  <Icon name="Download" size={15} /> Export JSON
                </button>
              </div>

              <div style={{ background: "#fcf6f3", padding: 20, border: "1px solid #ebd7d0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <b style={{ display: "block", fontSize: 14, color: "var(--rust)" }}>Reset Learning Progress Data</b>
                  <small style={{ color: "var(--muted)" }}>Clear local module completions and reset all courses to not started</small>
                </div>
                <button
                  className="button outline"
                  style={{ color: "var(--rust)", borderColor: "var(--rust)" }}
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reset all course progress? This cannot be undone.")) {
                      localStorage.removeItem("capacity_user_courses_progress_v2");
                      window.location.reload();
                    }
                  }}
                >
                  <Icon name="RotateCcw" size={15} /> Reset Progress
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
