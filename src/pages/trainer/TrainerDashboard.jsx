import { AppIcon as Icon } from "../../components/AppIcon";
import { Metric } from "../../components/Metric";
import { PageHead } from "../../components/PageHead";
import { ScoreBar } from "../../components/ScoreBar";

export function TrainerDashboard({ setPage }) {
  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">INSTRUCTOR PORTAL</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Trainer Overview &amp; Command Center</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            className="button outline"
            onClick={() => setPage("Assessments")}
            style={{ gap: 6 }}
          >
            <Icon name="ClipboardCheck" size={15} /> Question Banks
          </button>
          <button
            className="button dark"
            onClick={() => setPage("Create Course")}
            style={{ gap: 6 }}
          >
            <Icon name="Plus" size={16} /> Create Course
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <Metric value="7" label="Published Courses" detail="4 active cohorts" />
        <Metric value="218" label="Enrolled Trainees" detail="+34 new this month" />
        <Metric value="86.4%" label="Assessment Pass Rate" detail="Min. 80% benchmark" />
        <Metric value="68" label="Credentials Conferred" detail="Verified capability" />
      </div>

      <div className="dashboard-grid" style={{ marginBottom: 30 }}>
        {/* Cohort Progression */}
        <section className="feature">
          <div className="section-top">
            <div>
              <p className="eyebrow">COHORT PROGRESSION</p>
              <h2 style={{ fontSize: "1.4rem", margin: "4px 0 16px" }}>Active Curriculum Tracks</h2>
            </div>
            <span className="pill" style={{ background: "#edf7ef", color: "var(--green)", fontWeight: 600 }}>Live Telemetry</span>
          </div>

          <ScoreBar name="Leadership Essentials (Cohort A)" current={82} target={85} tone="green" />
          <ScoreBar name="Communication at Work (Cohort C)" current={75} target={80} tone="orange" />
          <ScoreBar name="Full-Stack Web Dev (Cohort B)" current={88} target={85} tone="green" />
          <ScoreBar name="Data Analytics & SQL Mastery" current={68} target={80} tone="orange" />

          <hr style={{ margin: "20px 0 16px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <button className="text-button" onClick={() => setPage("Courses")}>
              Manage All 7 Courses <Icon name="ArrowRight" size={15} />
            </button>
            <button className="text-button" onClick={() => setPage("Performance")}>
              View Cohort Analytics <Icon name="BarChart2" size={15} />
            </button>
          </div>
        </section>

        {/* Quick Management Hub */}
        <section className="feature improvement">
          <p className="eyebrow">FACILITATOR HUB</p>
          <h2 style={{ fontSize: "1.4rem", margin: "4px 0 12px" }}>Direct Studio Actions</h2>
          <p style={{ color: "#54574c", fontSize: 13, lineHeight: 1.5, margin: "0 0 18px" }}>
            Design customized curriculum pathways, inspect and expand the 70-question competency bank, and audit trainee roster achievements.
          </p>

          <div style={{ display: "grid", gap: 10, width: "100%" }}>
            <button
              className="button dark"
              style={{ justifyContent: "space-between", width: "100%", height: 38 }}
              onClick={() => setPage("Create Course")}
            >
              <span>Build New Course</span>
              <Icon name="ArrowRight" size={14} />
            </button>

            <button
              className="button outline"
              style={{ justifyContent: "space-between", width: "100%", height: 38, background: "#ffffff" }}
              onClick={() => setPage("Assessments")}
            >
              <span>Inspect Question Banks (70 Qs)</span>
              <Icon name="ClipboardCheck" size={14} />
            </button>

            <button
              className="button outline"
              style={{ justifyContent: "space-between", width: "100%", height: 38, background: "#ffffff" }}
              onClick={() => setPage("Trainees")}
            >
              <span>Trainee Roster &amp; Grades</span>
              <Icon name="Users" size={14} />
            </button>
          </div>
        </section>
      </div>

      {/* Recent Activity Feed */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "24px 28px", borderRadius: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>RECENT EVALUATION ACTIVITY</p>
            <h3 style={{ margin: "4px 0 0", fontSize: "1.3rem" }}>Live Trainee Submissions &amp; Milestone Grants</h3>
          </div>
          <button className="button outline" style={{ height: 30, fontSize: 11 }} onClick={() => setPage("Trainees")}>
            Full Roster
          </button>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {[
            {
              name: "Alex Morgan",
              action: "Passed Benchmark Assessment (90% score)",
              course: "Leadership Essentials",
              time: "Just now",
              icon: "Award",
              tone: "green",
            },
            {
              name: "Sarah Chen",
              action: "Completed Full Modular Syllabus (100%)",
              course: "Full-Stack Web Development",
              time: "2 hours ago",
              icon: "CheckCircle2",
              tone: "green",
            },
            {
              name: "Maria Garcia",
              action: "Verified Credential Conferred (Score 96%)",
              course: "Data Analytics & SQL Mastery",
              time: "Yesterday",
              icon: "Award",
              tone: "green",
            },
            {
              name: "Rahul Sharma",
              action: "Submitted Assessment Attempt (68% score)",
              course: "Communication at Work",
              time: "Yesterday",
              icon: "AlertCircle",
              tone: "orange",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                border: "1px solid var(--line)",
                borderRadius: 8,
                background: "#fcfbf7",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: item.tone === "green" ? "#edf7ef" : "#fdf2e9",
                    color: item.tone === "green" ? "var(--green)" : "var(--orange)",
                  }}
                >
                  <Icon name={item.icon} size={16} />
                </div>
                <div>
                  <b style={{ fontSize: 13, color: "var(--ink)" }}>{item.name}</b>
                  <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 6 }}>{item.action}</span>
                  <small style={{ display: "block", color: "var(--muted)", fontSize: 11, marginTop: 2 }}>
                    Pathway: {item.course}
                  </small>
                </div>
              </div>

              <span style={{ fontSize: 11, color: "var(--muted)", font: "500 11px 'DM Mono'" }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
