import { useState, useMemo } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { Metric } from "../../components/Metric";
import { loadLiveSessions, addLiveSession } from "../../data/liveSessions";

const PAST_SESSIONS = [
  {
    id: "past-1",
    title: "Situation-Behavior-Impact (SBI) Feedback Framework Workshop",
    cohort: "Q3 Operations Cohort (Cohort A)",
    date: "14 Sep 2026",
    duration: "65 minutes",
    attendance: "29 / 30 (96.6%)",
    recordingUrl: "#",
    slidesUrl: "#",
  },
  {
    id: "past-2",
    title: "Cross-Functional Retrospectives & Sprint Velocity Review",
    cohort: "Q3 Project Management Cohort",
    date: "08 Sep 2026",
    duration: "70 minutes",
    attendance: "24 / 25 (96%)",
    recordingUrl: "#",
    slidesUrl: "#",
  },
  {
    id: "past-3",
    title: "Root Cause Analysis: 5-Whys in High-Severity Incidents",
    cohort: "Q2 Enterprise Safety Track",
    date: "28 Aug 2026",
    duration: "80 minutes",
    attendance: "38 / 40 (95%)",
    recordingUrl: "#",
    slidesUrl: "#",
  },
];

export function LiveSessions({ setPage }) {
  const [sessions, setSessions] = useState(() => loadLiveSessions());

  const [activeTab, setActiveTab] = useState("upcoming");
  const [showModal, setShowModal] = useState(false);
  const [notice, setNotice] = useState("");

  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCohort, setNewCohort] = useState("Q3 Operations Cohort (Cohort A)");
  const [newCourse, setNewCourse] = useState("Leadership Essentials");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("2:00 PM – 3:15 PM (PST)");
  const [newPlatform, setNewPlatform] = useState("Zoom Video Meeting");
  const [newUrl, setNewUrl] = useState("https://zoom.us/j/new-session");
  const [newAgenda, setNewAgenda] = useState("");

  const handleCreateSession = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = {
      id: `sess-${Date.now()}`,
      title: newTitle.trim(),
      cohort: newCohort,
      course: newCourse,
      date: newDate || "Next Week",
      time: newTime,
      platform: newPlatform,
      meetingUrl: newUrl,
      attendeesCount: 18,
      maxCapacity: 35,
      status: "Confirmed",
      statusTone: "green",
      agenda: newAgenda || "Interactive cohort workshop covering practical exercises and live Q&A.",
    };

    const updated = addLiveSession(created);
    setSessions(updated);

    setShowModal(false);
    setNewTitle("");
    setNewAgenda("");
    setNotice(`Scheduled "${created.title}" successfully!`);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleCopyLink = (url) => {
    navigator.clipboard?.writeText(url);
    setNotice("Meeting invite link copied to clipboard!");
    setTimeout(() => setNotice(""), 3000);
  };

  const handleLaunchCall = (title, url) => {
    setNotice(`Launching virtual classroom: ${title}...`);
    setTimeout(() => {
      setNotice("");
      window.open(url, "_blank");
    }, 1000);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">COHORT WORKSHOPS &amp; MENTORSHIP</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Live Facilitation Sessions</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button dark" onClick={() => setShowModal(true)} style={{ gap: 6 }}>
            <Icon name="CalendarPlus" size={16} /> Schedule Live Session
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Host interactive virtual workshops, case study simulations, live Q&amp;A clinics, and cohort office hours with your active learners.
      </p>

      {notice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <Metric value={sessions.length.toString()} label="Upcoming Sessions" detail="Across 4 cohorts" />
        <Metric value="126" label="Confirmed Trainee RSVPs" detail="88% engagement rate" />
        <Metric value="95.8%" label="Historical Attendance" detail="Avg. across past labs" />
        <Metric value="18" label="Archived Recordings" detail="Available for replay" />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 22, borderBottom: "1px solid var(--line)", paddingBottom: 10 }}>
        <button
          className={`button ${activeTab === "upcoming" ? "dark" : "outline"}`}
          onClick={() => setActiveTab("upcoming")}
          style={{ fontSize: 13, gap: 6 }}
        >
          <Icon name="Calendar" size={15} /> Upcoming Workshops ({sessions.length})
        </button>
        <button
          className={`button ${activeTab === "past" ? "dark" : "outline"}`}
          onClick={() => setActiveTab("past")}
          style={{ fontSize: 13, gap: 6 }}
        >
          <Icon name="History" size={15} /> Past Recordings &amp; Transcripts ({PAST_SESSIONS.length})
        </button>
      </div>

      {/* Upcoming Sessions List */}
      {activeTab === "upcoming" && (
        <div style={{ display: "grid", gap: 18 }}>
          {sessions.map((sess) => (
            <div
              key={sess.id}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: 24,
                display: "grid",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: 4,
                        background: sess.statusTone === "orange" ? "#fdf2e9" : "#edf7ef",
                        color: sess.statusTone === "orange" ? "var(--orange)" : "var(--green)",
                      }}
                    >
                      {sess.status}
                    </span>
                    <span className="pill">{sess.cohort}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>Curriculum: <b>{sess.course}</b></span>
                  </div>

                  <h3 style={{ fontSize: "1.35rem", margin: "0 0 6px", color: "var(--ink)" }}>{sess.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", maxWidth: 740, lineHeight: 1.5 }}>
                    {sess.agenda}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    className="button outline"
                    style={{ height: 34, fontSize: 12, gap: 5 }}
                    onClick={() => handleCopyLink(sess.meetingUrl)}
                  >
                    <Icon name="Copy" size={13} /> Copy Link
                  </button>

                  <button
                    className="button dark"
                    style={{ height: 34, fontSize: 12, gap: 5, background: sess.statusTone === "orange" ? "var(--orange)" : "var(--ink)" }}
                    onClick={() => handleLaunchCall(sess.title, sess.meetingUrl)}
                  >
                    <Icon name="Video" size={14} /> Launch Virtual Room
                  </button>
                </div>
              </div>

              {/* Session Details Bar */}
              <div
                style={{
                  background: "#fcfbf7",
                  border: "1px solid #eae8df",
                  borderRadius: 6,
                  padding: "12px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 16,
                  fontSize: 12,
                  color: "var(--muted)",
                }}
              >
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <span><Icon name="Calendar" size={14} style={{ verticalAlign: "middle", marginRight: 4, color: "var(--ink)" }} /> <b>{sess.date}</b></span>
                  <span><Icon name="Clock" size={14} style={{ verticalAlign: "middle", marginRight: 4, color: "var(--ink)" }} /> {sess.time}</span>
                  <span><Icon name="Monitor" size={14} style={{ verticalAlign: "middle", marginRight: 4, color: "var(--ink)" }} /> {sess.platform}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name="Users" size={14} style={{ color: "var(--green)" }} />
                  <span>
                    RSVP: <b>{sess.attendeesCount} / {sess.maxCapacity}</b> Trainees Confirmed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Past Sessions List */}
      {activeTab === "past" && (
        <div style={{ display: "grid", gap: 14 }}>
          {PAST_SESSIONS.map((p) => (
            <div
              key={p.id}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span className="pill" style={{ background: "#edf7ef", color: "var(--green)", fontSize: 10, padding: "2px 6px" }}>Recorded</span>
                  <span style={{ fontSize: 11, color: "var(--muted)" }}>{p.cohort} · Delivered on {p.date}</span>
                </div>
                <b style={{ fontSize: 14, color: "var(--ink)", display: "block" }}>{p.title}</b>
                <small style={{ color: "var(--muted)", display: "block", marginTop: 4 }}>
                  Duration: {p.duration} · Trainee Attendance: <b>{p.attendance}</b>
                </small>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="button outline"
                  style={{ height: 32, fontSize: 12, gap: 5 }}
                  onClick={() => {
                    setNotice(`Downloading presentation slide deck for ${p.title}...`);
                    setTimeout(() => setNotice(""), 3000);
                  }}
                >
                  <Icon name="FileText" size={13} /> Slides &amp; Notes
                </button>
                <button
                  className="button dark"
                  style={{ height: 32, fontSize: 12, gap: 5 }}
                  onClick={() => {
                    setNotice(`Streaming session replay for ${p.title}...`);
                    setTimeout(() => setNotice(""), 3000);
                  }}
                >
                  <Icon name="Play" size={13} /> Replay Recording
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule Session Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(18,20,16,0.75)",
            backdropFilter: "blur(3px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              width: "min(560px, 100%)",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 28,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>FACILITATOR SCHEDULING</p>
                <h3 style={{ margin: "4px 0 0", fontSize: "1.4rem" }}>Schedule Cohort Live Session</h3>
              </div>
              <button onClick={() => setShowModal(false)} style={{ cursor: "pointer", color: "var(--muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSession}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Workshop Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Incident Response Simulation & DACI Review"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Target Cohort</label>
                  <select
                    value={newCohort}
                    onChange={(e) => setNewCohort(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  >
                    <option value="Q3 Operations Cohort (Cohort A)">Q3 Operations Cohort (Cohort A)</option>
                    <option value="Q3 Analytics & Data Cohort (Cohort B)">Q3 Analytics &amp; Data Cohort (Cohort B)</option>
                    <option value="Q2 Enterprise Cross-Functional (Cohort C)">Q2 Enterprise Cross-Functional (Cohort C)</option>
                    <option value="Q3 Engineering & Tech Cohort (Cohort D)">Q3 Engineering &amp; Tech Cohort (Cohort D)</option>
                    <option value="All Cohorts Combined">All Cohorts Combined</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Associated Curriculum</label>
                  <select
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  >
                    <option value="Leadership Essentials">Leadership Essentials</option>
                    <option value="Communication at Work">Communication at Work</option>
                    <option value="Data Analytics & SQL Mastery">Data Analytics &amp; SQL Mastery</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="Generative AI for Work">Generative AI for Work</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Session Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Time &amp; Duration</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="e.g. 2:00 PM – 3:15 PM (PST)"
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Platform</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  >
                    <option value="Zoom Video Meeting">Zoom Video Meeting</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                    <option value="In-Person Executive Room">In-Person Executive Room</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Meeting URL / Room</label>
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://zoom.us/j/..."
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Agenda &amp; Exercise Notes</label>
                <textarea
                  rows={3}
                  value={newAgenda}
                  onChange={(e) => setNewAgenda(e.target.value)}
                  placeholder="Outline key topics, case studies, or preparation instructions for trainees..."
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13, resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button type="button" className="button outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="button dark" style={{ gap: 6 }}>
                  <Icon name="CalendarCheck" size={15} /> Confirm &amp; Notify Trainees
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
