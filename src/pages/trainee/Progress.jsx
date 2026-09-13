import { Metric } from "../../components/Metric";
import { PageHead } from "../../components/PageHead";
export function Progress() {
  return (
    <>
      <PageHead
        kicker="DEVELOPMENT PROGRESS"
        title="Capability, measured over time"
      />
      <div className="progress-summary">
        <Metric value="72%" label="Current competency" detail="Up from 52%" />
        <Metric value="3" label="Courses completed" />
        <Metric value="18h" label="Learning time" />
        <Metric value="2" label="Certificates earned" />
      </div>
      <section className="feature chart">
        <div>
          <p className="eyebrow">LEADERSHIP COMPETENCY</p>
          <h2>Progress towards your 80% target</h2>
        </div>
        <div className="chart-bars">
          <i style={{ height: "52%" }}>
            <span>52%</span>
            <small>Before</small>
          </i>
          <i style={{ height: "72%" }}>
            <span>72%</span>
            <small>Today</small>
          </i>
          <i className="target" style={{ height: "80%" }}>
            <span>80%</span>
            <small>Target</small>
          </i>
        </div>
      </section>
    </>
  );
}
