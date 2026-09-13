import { AppIcon as Icon } from "../../components/AppIcon";
import { Metric } from "../../components/Metric";
import { PageHead } from "../../components/PageHead";

export function AdminDashboard() {
  return (
    <>
      <PageHead
        kicker="ENTERPRISE OVERSIGHT"
        title="Capacity Connect command center"
      >
        <button className="button outline" onClick={() => window.print()}>
          Export summary <Icon name="Download" size={15} />
        </button>
      </PageHead>

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
