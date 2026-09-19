import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { Metric } from "../../components/Metric";
import { PageHead } from "../../components/PageHead";

export function AdminDashboard() {
  const [notice, setNotice] = useState("");

  const handleExportSummary = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const rows = [
      ["CAPACITY CONNECT - ENTERPRISE COMMAND CENTER EXECUTIVE SUMMARY"],
      [`Generated Date`, timestamp],
      [`Governance Authority`, "Enterprise Administrator"],
      [],
      ["--- KEY EXECUTIVE METRICS ---"],
      ["Metric", "Value", "Context"],
      ["Total Workforce Enrolled", "1,248", "94% active participation"],
      ["Average Competency", "76%", "+5.2% YoY gain"],
      ["Net Skill Gap", "13%", "Leadership is organizational priority"],
      ["Certified Cohorts", "42", "3 pending audit verification"],
      [],
      ["--- DEPARTMENTAL COMPETENCY BENCHMARKS ---"],
      ["Department", "Baseline Score (%)", "Status"],
      ["Engineering", "82%", "Exceeds Target"],
      ["Finance & Risk", "85%", "Exceeds Target"],
      ["Customer Success", "77%", "On Target"],
      ["Operations", "71%", "Requires Upskilling"],
      ["Manufacturing", "68%", "Priority Intervention"],
      [],
      ["--- PRIORITY TRAINING DEFICITS ---"],
      ["Competency Area", "Severity", "Impact Percentage"],
      ["Leadership Deficit", "High", "65% Deficit"],
      ["Data Analysis & Querying", "Medium", "52% Deficit"],
      ["Cross-Departmental Comms", "Medium", "40% Deficit"],
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `CapacityConnect_Command_Center_Summary_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotice("Executive summary report exported and downloaded successfully (CSV).");
    setTimeout(() => setNotice(""), 5000);
  };

  return (
    <>
      <PageHead
        kicker="ENTERPRISE OVERSIGHT"
        title="Capacity Connect command center"
      >
        <button className="button outline" onClick={handleExportSummary} title="Download command center executive summary">
          Export summary <Icon name="Download" size={15} />
        </button>
      </PageHead>

      {notice && (
        <div
          style={{
            background: "#edf7ef",
            border: "1px solid #cce5d2",
            padding: "12px 18px",
            borderRadius: 8,
            color: "#2d5e36",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          <Icon name="CheckCircle2" size={18} />
          <span>{notice}</span>
        </div>
      )}

      <div className="metric-grid">
        <Metric value="1,248" label="Total workforce enrolled" detail="94% active" />
        <Metric value="76%" label="Average competency" detail="+5.2% YoY gain" />
        <Metric value="13%" label="Net skill gap" detail="Leadership is priority" />
        <Metric value="42" label="Certified cohorts" detail="3 pending audit" />
      </div>

      <div className="admin-grid">
        <section className="feature">
          <p className="eyebrow">ORGANIZATION BENCHMARK</p>
          <h2>Competency by department</h2>
          <div className="department-bars">
            {[
              ["Engineering", 82],
              ["Operations", 71],
              ["Manufacturing", 68],
              ["Customer Success", 77],
              ["Finance & Risk", 85],
            ].map(([dept, score]) => (
              <div key={dept}>
                <span>{dept}</span>
                <i>
                  <em style={{ width: `${score}%` }} />
                </i>
                <b>{score}%</b>
              </div>
            ))}
          </div>
        </section>

        <section className="feature">
          <p className="eyebrow">PRIORITY INTERVENTIONS</p>
          <h2>Urgent training needs</h2>
          <div className="org-gap">
            <span>Leadership Deficit</span>
            <div className="bar">
              <i className="rust" style={{ width: "65%" }} />
            </div>
            <b>High</b>
          </div>
          <div className="org-gap">
            <span>Data Analysis</span>
            <div className="bar">
              <i className="orange" style={{ width: "52%" }} />
            </div>
            <b>Med</b>
          </div>
          <div className="org-gap">
            <span>Cross-team Comms</span>
            <div className="bar">
              <i className="sage" style={{ width: "40%" }} />
            </div>
            <b>Med</b>
          </div>
          <hr />
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
            Automated recommendations are synchronized across all 3 active learning cohorts.
          </p>
        </section>
      </div>
    </>
  );
}
