import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { Metric } from "../../components/Metric";

const REPORTS_DATA = [
  {
    id: "rep-1",
    title: "Employee Development & Competency Gain",
    summary: "Workforce competency has improved by +5.2% YoY across all 5 operational divisions.",
    icon: "TrendingUp",
    kpi: "+5.2% Gain",
    kpiDetail: "YoY improvement",
    sections: [
      { label: "Engineering & Tech", score: "82%", change: "+6.4%", status: "On Target" },
      { label: "Finance & Risk", score: "85%", change: "+3.8%", status: "On Target" },
      { label: "Customer Success", score: "77%", change: "+5.1%", status: "On Target" },
      { label: "Regional Operations", score: "71%", change: "+4.9%", status: "Accelerating" },
      { label: "Manufacturing & Field", score: "68%", change: "+5.8%", status: "Priority Intervention" },
    ],
    takeaway: "The adoption of modular micro-learning in Engineering and Finance has yielded the strongest gains, with 85% competency compliance.",
  },
  {
    id: "rep-2",
    title: "Training Completion & Velocity",
    summary: "86.4% of assigned learning modules completed on schedule this fiscal quarter.",
    icon: "CheckCircle2",
    kpi: "86.4%",
    kpiDetail: "Completion velocity",
    sections: [
      { label: "Leadership Essentials", score: "88%", change: "+12%", status: "Certified" },
      { label: "Communication at Work", score: "84%", change: "+8%", status: "Active" },
      { label: "Full-Stack Web Development", score: "92%", change: "+15%", status: "Certified" },
      { label: "Data Analytics & SQL Mastery", score: "76%", change: "+4%", status: "In Progress" },
      { label: "Operational Safety Readiness", score: "94%", change: "+6%", status: "Certified" },
    ],
    takeaway: "Safety and Full-Stack tracks exceeded benchmark velocity with over 90% completion within 4 weeks of enrollment.",
  },
  {
    id: "rep-3",
    title: "Assessment Performance & Diagnostics",
    summary: "Average evaluation score calibrated at 86.4% across 640 standardized test attempts.",
    icon: "ClipboardCheck",
    kpi: "86.4%",
    kpiDetail: "Mean pass score",
    sections: [
      { label: "DACI Decision Model Module", score: "74%", change: "-6%", status: "Focus Area" },
      { label: "SQL Multi-Table Joins & Window Functions", score: "78%", change: "-2%", status: "Focus Area" },
      { label: "BLUF Executive Structuring", score: "84%", change: "+4%", status: "Satisfactory" },
      { label: "Hazard Identification Protocols", score: "96%", change: "+8%", status: "Mastery" },
    ],
    takeaway: "Trainee performance remains highest in procedural compliance and safety, while analytical frameworks require facilitator mentoring.",
  },
  {
    id: "rep-4",
    title: "Capability Readiness & Coverage",
    summary: "1,248 employees actively enrolled across 42 certified cohort pathways.",
    icon: "Users",
    kpi: "1,248 Staff",
    kpiDetail: "94% engagement",
    sections: [
      { label: "Active Cohort Batches", score: "14", change: "4 tracks", status: "Active" },
      { label: "Certified Credentials Conferred", score: "348", change: "+42 this mo", status: "Verified" },
      { label: "Instructional Hours Invested", score: "4,180 hrs", change: "+18%", status: "On Track" },
      { label: "Audited Trainer Coverage", score: "100%", change: "6 Faculty", status: "Compliant" },
    ],
    takeaway: "Workforce coverage has expanded by 34% compared to the previous quarter, with zero backlog in certification verification.",
  },
];

export function Reports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [notice, setNotice] = useState("");

  const handleExportAll = () => {
    const headers = ["Report Title", "Key Metric", "Summary Highlight", "Executive Takeaway"];
    const rows = REPORTS_DATA.map((r) => [
      `"${r.title}"`,
      `"${r.kpi} (${r.kpiDetail})"`,
      `"${r.summary}"`,
      `"${r.takeaway}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "Capacity_Connect_Executive_Organizational_Reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">EXECUTIVE AUDIT &amp; TELEMETRY</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Enterprise Capability Reports</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button outline" onClick={handleExportAll} title="Export executive reports summary">
            <Icon name="Download" size={15} /> Export All (CSV)
          </button>
          <button className="button dark" onClick={() => window.print()} title="Print Executive Dossier">
            <Icon name="Printer" size={15} /> Print Dossier
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Comprehensive capability evidence, training velocity audits, competency gains, and compliance metrics for executive leadership.
      </p>

      {notice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <Metric value="4" label="Standardized Reports" detail="Real-time telemetry" />
        <Metric value="+5.2%" label="Workforce Competency Gain" detail="YoY net growth" />
        <Metric value="86.4%" label="Completion Velocity" detail="On-schedule pace" />
        <Metric value="1,248" label="Total Staff Reach" detail="94% active participation" />
      </div>

      {/* Report Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        {REPORTS_DATA.map((rep) => (
          <article
            key={rep.id}
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#edf7ef", color: "var(--green)", display: "grid", placeItems: "center" }}>
                  <Icon name={rep.icon} size={20} />
                </div>
                <span className="pill" style={{ font: "700 12px 'DM Mono'", background: "#f5f3eb" }}>
                  {rep.kpi}
                </span>
              </div>

              <h2 style={{ fontSize: "1.25rem", margin: "0 0 8px", color: "var(--ink)" }}>{rep.title}</h2>
              <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5, margin: "0 0 16px" }}>
                {rep.summary}
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>{rep.kpiDetail}</span>
              <button className="text-button" onClick={() => setSelectedReport(rep)} style={{ gap: 4 }}>
                View detailed report <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Detailed Report Inspection Modal */}
      {selectedReport && (
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
          onClick={() => setSelectedReport(null)}
        >
          <div
            style={{
              width: "min(640px, 100%)",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 28,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>EXECUTIVE TELEMETRY</p>
                <h3 style={{ margin: "4px 0 0", fontSize: "1.45rem" }}>{selectedReport.title}</h3>
                <small style={{ color: "var(--muted)", fontSize: 12 }}>{selectedReport.summary}</small>
              </div>
              <button onClick={() => setSelectedReport(null)} style={{ cursor: "pointer", color: "var(--muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Granular Breakdown Table */}
            <div style={{ background: "#fcfbf7", border: "1px solid var(--line)", borderRadius: 8, padding: 16, marginBottom: 18 }}>
              <b style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", display: "block", marginBottom: 12 }}>
                GRANULAR COHORT / DEPARTMENT BREAKDOWN
              </b>

              <div style={{ display: "grid", gap: 10 }}>
                {selectedReport.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      background: "#faf9f4",
                      borderRadius: 6,
                      border: "1px solid #e7e5dc",
                      fontSize: 13,
                    }}
                  >
                    <div>
                      <b>{sec.label}</b>
                      <span style={{ fontSize: 11, color: "var(--muted)", marginLeft: 8 }}>({sec.change})</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ font: "700 13px 'DM Mono'" }}>{sec.score}</span>
                      <span className="pill" style={{ fontSize: 10, padding: "1px 6px" }}>{sec.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Takeaway */}
            <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "14px 16px", borderRadius: 8, color: "#2d5e36", marginBottom: 20 }}>
              <b style={{ display: "block", fontSize: 13, marginBottom: 4 }}>
                <Icon name="Lightbulb" size={14} style={{ verticalAlign: "middle", marginRight: 5 }} /> Executive Analysis
              </b>
              <p style={{ margin: 0, fontSize: 12, lineHeight: 1.45 }}>{selectedReport.takeaway}</p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 16 }}>
              <button
                type="button"
                className="button outline"
                style={{ height: 32, fontSize: 12, gap: 5 }}
                onClick={() => {
                  setNotice(`Exported ${selectedReport.title} data to CSV.`);
                  setTimeout(() => setNotice(""), 3000);
                }}
              >
                <Icon name="Download" size={13} /> Export Section Data
              </button>

              <button type="button" className="button dark" onClick={() => setSelectedReport(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
