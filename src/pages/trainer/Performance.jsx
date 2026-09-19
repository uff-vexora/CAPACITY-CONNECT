import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { Metric } from "../../components/Metric";
import { ScoreBar } from "../../components/ScoreBar";

export function Performance({ setPage }) {
  const [selectedCohort, setSelectedCohort] = useState("q3-ops");

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">CURRICULUM METRICS</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Cohort Performance Analytics</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            style={{ padding: "8px 14px", borderRadius: 6, border: "1px solid var(--line)", background: "var(--paper)", fontSize: 13, outline: "none" }}
          >
            <option value="q3-ops">Q3 2026 Enterprise Operations Cohort</option>
            <option value="q2-tech">Q2 2026 Technical Onboarding Cohort</option>
            <option value="all">All Historical Cohorts</option>
          </select>
          <button className="button outline" onClick={() => window.print()} title="Print Analytics Report">
            <Icon name="Printer" size={15} /> Print Report
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Live telemetry tracking cohort learning pace, competency benchmark attainment, difficult question heatmaps, and credential completion.
      </p>

      {/* Metric Cards */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <Metric value="86.4%" label="Avg. Assessment Score" detail="+4.2% vs previous cohort" />
        <Metric value="78%" label="Curriculum Velocity" detail="On pace for Q3 completion" />
        <Metric value="68" label="Certificates Earned" detail="Demonstrated mastery" />
        <Metric value="4.8/5" label="Learner Satisfaction" detail="Based on 142 evaluations" />
      </div>

      <div className="dashboard-grid" style={{ marginBottom: 30 }}>
        {/* Competency Benchmark Attainment */}
        <section className="feature">
          <div className="section-top">
            <div>
              <p className="eyebrow">BENCHMARK CALIBRATION</p>
              <h2 style={{ fontSize: "1.4rem", margin: "4px 0 16px" }}>Competency Attainment vs Standards</h2>
            </div>
            <span className="pill" style={{ background: "#edf7ef", color: "var(--green)", fontWeight: 600 }}>Cohort A</span>
          </div>

          <ScoreBar name="Operational Safety & Compliance" current={94} target={90} tone="green" />
          <ScoreBar name="Technical Skills & Workflows" current={84} target={85} tone="green" />
          <ScoreBar name="Data Analytics & SQL Foundations" current={76} target={82} tone="orange" />
          <ScoreBar name="Communication at Work" current={78} target={80} tone="orange" />
          <ScoreBar name="Leadership Essentials" current={72} target={80} tone="rust" />

          <hr style={{ margin: "20px 0 16px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)" }}>
            <span>Target Benchmark: 80% Organizational Mastery</span>
            <span style={{ color: "var(--green)", fontWeight: 600 }}>4 of 5 Domains on Target</span>
          </div>
        </section>

        {/* Weekly Engagement Heatmap */}
        <section className="feature">
          <p className="eyebrow">COHORT ACTIVITY</p>
          <h2 style={{ fontSize: "1.4rem", margin: "4px 0 16px" }}>Weekly Video &amp; Lab Hours</h2>
          
          <div style={{ height: 180, display: "flex", alignItems: "flex-end", gap: 20, padding: "0 10px", borderBottom: "1px solid var(--line)", marginBottom: 14 }}>
            {[
              { week: "W1", hours: 42, height: "55%" },
              { week: "W2", hours: 58, height: "75%" },
              { week: "W3", hours: 64, height: "82%" },
              { week: "W4", hours: 78, height: "100%" },
              { week: "W5", hours: 70, height: "90%" },
            ].map((bar) => (
              <div key={bar.week} style={{ flex: 1, textAlign: "center" }}>
                <span style={{ font: "600 11px 'DM Mono'", color: "var(--green)", display: "block", marginBottom: 6 }}>{bar.hours}h</span>
                <div style={{ height: bar.height, background: "var(--green)", borderRadius: "4px 4px 0 0" }} />
                <small style={{ marginTop: 8, display: "block", color: "var(--muted)", font: "10px 'DM Mono'" }}>{bar.week}</small>
              </div>
            ))}
          </div>
          <small style={{ color: "var(--muted)", lineHeight: 1.4 }}>
            Highest study activity recorded on Wednesday &amp; Thursday evenings following video module releases.
          </small>
        </section>
      </div>

      {/* Challenging Concepts & Remediation Heatmap */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "24px 28px", borderRadius: 10 }}>
        <div style={{ marginBottom: 18 }}>
          <p className="eyebrow" style={{ margin: 0 }}>EVALUATION DIAGNOSTICS</p>
          <h2 style={{ fontSize: "1.5rem", margin: "4px 0 0" }}>Most Challenging Evaluation Concepts</h2>
          <p style={{ color: "var(--muted)", fontSize: 13, margin: "4px 0 0" }}>
            Questions where trainee pass rates dipped below the 70% threshold, pinpointing topics needing facilitator emphasis.
          </p>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {[
            {
              topic: "DACI Decision Model (Driver vs Approver)",
              course: "Leadership Essentials",
              missRate: "42% incorrect",
              tip: "Trainees frequently conflate Driver (shepherd) with Approver (veto power). Recommend reviewing Module 2 lesson notes.",
            },
            {
              topic: "Multi-Table LEFT JOIN Null Handling",
              course: "Data Analytics & SQL Mastery",
              missRate: "38% incorrect",
              tip: "Confusion surrounding filtering on NULL in WHERE clauses vs ON conditions. Additional query drills recommended.",
            },
            {
              topic: "BLUF Structuring in Cross-Team Incident Briefs",
              course: "Communication at Work",
              missRate: "31% incorrect",
              tip: "Learners often provide chronological narrative instead of leading with recommendation and impact first.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid var(--line)",
                borderRadius: 8,
                padding: "16px 20px",
                background: "#fcfbf7",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 4 }}>
                  <b style={{ fontSize: 14, color: "var(--ink)" }}>{item.topic}</b>
                  <span className="pill" style={{ background: "#fdeae3", color: "#9e3d1c", fontWeight: 600 }}>{item.missRate}</span>
                </div>
                <small style={{ color: "var(--muted)", fontSize: 12 }}>Curriculum: {item.course}</small>
                <p style={{ margin: "8px 0 0", fontSize: 12, color: "#54574c", lineHeight: 1.45 }}>
                  <Icon name="Lightbulb" size={13} style={{ verticalAlign: "middle", marginRight: 5, color: "var(--orange)" }} />
                  {item.tip}
                </p>
              </div>

              <button
                className="button outline"
                style={{ height: 32, fontSize: 12, gap: 5 }}
                onClick={() => setPage && setPage("Courses")}
              >
                Inspect Curriculum <Icon name="ArrowRight" size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
