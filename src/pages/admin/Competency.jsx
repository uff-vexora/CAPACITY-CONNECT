import { PageHead } from "../../components/PageHead";
import { ScoreBar } from "../../components/ScoreBar";
export function Competency() {
  return (
    <>
      <PageHead kicker="COMPETENCY ANALYTICS" title="See capability patterns" />
      <div className="dashboard-grid">
        <section className="feature chart">
          <p className="eyebrow">DEPARTMENT-WISE COMPETENCY</p>
          <h2>Current average vs target</h2>
          <div className="department-bars">
            {[
              ["Operations", 72],
              ["Manufacturing", 67],
              ["Finance", 76],
              ["Customer Success", 74],
            ].map(([x, v]) => (
              <div key={x}>
                <span>{x}</span>
                <i>
                  <em style={{ width: v + "%" }} />
                </i>
                <b>{v}%</b>
              </div>
            ))}
          </div>
        </section>
        <section className="feature">
          <p className="eyebrow">TRAINING COMPLETION</p>
          <h2>By learning pathway</h2>
          <ScoreBar name="Safety readiness" current={81} target={85} />
          <ScoreBar name="Communication" current={62} target={80} />
          <ScoreBar name="Data literacy" current={48} target={75} />
        </section>
      </div>
    </>
  );
}
