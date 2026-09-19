import { useState, useMemo } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { Metric } from "../../components/Metric";
import { ScoreBar } from "../../components/ScoreBar";

const DEPARTMENTS_DATA = [
  { name: "Finance & Risk", score: 85, staffCount: 140, lead: "Neha Singh" },
  { name: "Engineering & Tech", score: 82, staffCount: 320, lead: "Dev Academy" },
  { name: "Customer Success", score: 77, staffCount: 180, lead: "Priya Menon" },
  { name: "Regional Operations", score: 71, staffCount: 420, lead: "Rahul Sharma" },
  { name: "Manufacturing & Field", score: 68, staffCount: 188, lead: "Arun Patel" },
];

const DOMAINS_DATA = [
  { domain: "Operational Safety & Compliance", score: 86, target: 90, urgency: "Low", tone: "green" },
  { domain: "Technical Skills & Engineering", score: 80, target: 85, urgency: "Low", tone: "green" },
  { domain: "Workplace Communication & BLUF", score: 71, target: 80, urgency: "Medium", tone: "orange" },
  { domain: "Data Literacy & SQL Analytics", score: 64, target: 75, urgency: "High", tone: "rust" },
  { domain: "Executive Leadership & DACI", score: 58, target: 80, urgency: "High", tone: "rust" },
];

export function Competency() {
  const [targetBenchmark, setTargetBenchmark] = useState(80);
  const [selectedDept, setSelectedDept] = useState("all");
  const [notice, setNotice] = useState("");

  const handleExportCSV = () => {
    const headers = ["Department / Domain", "Current Competency %", "Target Benchmark %", "Gap %", "Status"];
    const rows = [
      ...DEPARTMENTS_DATA.map((d) => [
        `"Dept: ${d.name}"`,
        `${d.score}%`,
        `${targetBenchmark}%`,
        `${d.score - targetBenchmark}%`,
        d.score >= targetBenchmark ? "On Target" : "Below Target",
      ]),
      ...DOMAINS_DATA.map((dm) => [
        `"Domain: ${dm.domain}"`,
        `${dm.score}%`,
        `${dm.target}%`,
        `${dm.score - dm.target}%`,
        dm.score >= dm.target ? "On Target" : "Below Target",
      ]),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "Capacity_Connect_Enterprise_Competency_Matrix.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">CAPABILITY INTELLIGENCE</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Enterprise Competency Analytics</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button outline" onClick={handleExportCSV} title="Export competency matrix to CSV">
            <Icon name="Download" size={15} /> Export Matrix
          </button>
          <button className="button dark" onClick={() => window.print()} title="Print Capability Report">
            <Icon name="Printer" size={15} /> Print Analytics
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Granular diagnostic tracking organizational capability baselines, cross-departmental readiness gaps, and domain mastery attainment across the enterprise.
      </p>

      {/* Target Benchmark Calibration Bar */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "18px 24px", borderRadius: 10, marginBottom: 26, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <b style={{ fontSize: 14, color: "var(--ink)" }}>Organizational Target Benchmark: {targetBenchmark}%</b>
          <small style={{ display: "block", color: "var(--muted)", fontSize: 12 }}>
            Adjust the minimum competency threshold to re-calibrate enterprise compliance across all operating units.
          </small>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {[75, 80, 85, 90].map((bm) => (
            <button
              key={bm}
              type="button"
              className={`pill ${targetBenchmark === bm ? "selected" : ""}`}
              onClick={() => {
                setTargetBenchmark(bm);
                setNotice(`Calibrated organization benchmark target to ${bm}%.`);
                setTimeout(() => setNotice(""), 3000);
              }}
              style={{
                cursor: "pointer",
                border: "1px solid var(--line)",
                background: targetBenchmark === bm ? "var(--ink)" : "#faf8f2",
                color: targetBenchmark === bm ? "#fff" : "var(--ink)",
                padding: "6px 14px",
                font: "600 12px 'DM Mono'",
              }}
            >
              {bm}% Threshold
            </button>
          ))}
        </div>
      </div>

      {notice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <Metric value="76.8%" label="Enterprise Competency" detail="+5.2% YoY gain" />
        <Metric value="-3.2%" label="Net Benchmark Gap" detail={`Against ${targetBenchmark}% target`} />
        <Metric value="3 of 5" label="Departments on Target" detail="Operations is priority" />
        <Metric value="1,248" label="Employees Evaluated" detail="Standardized baseline" />
      </div>

      {/* Department Breakdown Grid */}
      <div className="dashboard-grid" style={{ marginBottom: 30 }}>
        {/* Department Bars */}
        <section className="feature">
          <div className="section-top">
            <div>
              <p className="eyebrow">OPERATING DIVISIONS</p>
              <h2 style={{ fontSize: "1.4rem", margin: "4px 0 16px" }}>Department Competency vs Target</h2>
            </div>
            <span className="pill" style={{ font: "600 11px 'DM Mono'" }}>Target: {targetBenchmark}%</span>
          </div>

          <div className="department-bars">
            {DEPARTMENTS_DATA.map((d) => {
              const gap = d.score - targetBenchmark;
              const isOnTarget = gap >= 0;
              return (
                <div key={d.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                    <span>
                      <b>{d.name}</b> <small style={{ color: "var(--muted)" }}>({d.staffCount} staff)</small>
                    </span>
                    <span style={{ font: "600 12px 'DM Mono'", color: isOnTarget ? "var(--green)" : "var(--rust)" }}>
                      {d.score}% ({isOnTarget ? `+${gap}%` : `${gap}%`})
                    </span>
                  </div>
                  <i>
                    <em style={{ width: `${d.score}%`, background: isOnTarget ? "var(--green)" : "var(--orange)" }} />
                  </i>
                </div>
              );
            })}
          </div>

          <hr style={{ margin: "20px 0 14px" }} />
          <small style={{ color: "var(--muted)", lineHeight: 1.45 }}>
            Regional Operations and Manufacturing represent 608 staff requiring targeted training pathways to hit the {targetBenchmark}% threshold.
          </small>
        </section>

        {/* Competency Domains */}
        <section className="feature">
          <div className="section-top">
            <div>
              <p className="eyebrow">DOMAIN BENCHMARKS</p>
              <h2 style={{ fontSize: "1.4rem", margin: "4px 0 16px" }}>Core Competency Areas</h2>
            </div>
            <span className="pill" style={{ background: "#edf7ef", color: "var(--green)", fontWeight: 600 }}>Calibrated</span>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {DOMAINS_DATA.map((item) => (
              <ScoreBar
                key={item.domain}
                name={item.domain}
                current={item.score}
                target={item.target}
                tone={item.tone}
              />
            ))}
          </div>

          <hr style={{ margin: "20px 0 14px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--muted)" }}>
            <span>Largest Organizational Deficit:</span>
            <b style={{ color: "var(--rust)" }}>Executive Leadership (-22%)</b>
          </div>
        </section>
      </div>
    </>
  );
}
