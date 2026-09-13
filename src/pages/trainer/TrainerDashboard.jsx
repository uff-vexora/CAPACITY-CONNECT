import { AppIcon as Icon } from "../../components/AppIcon";
import { Metric } from "../../components/Metric";
import { PageHead } from "../../components/PageHead";
import { ScoreBar } from "../../components/ScoreBar";

export function TrainerDashboard({ setPage }) {
  return (
    <>
      <PageHead kicker="INSTRUCTOR PORTAL" title="Trainer overview">
        <button
          className="button dark"
          onClick={() => setPage("Create Course")}
        >
          <Icon name="Plus" size={16} /> Create new course
        </button>
      </PageHead>

      <div className="metric-grid">
        <Metric value="3" label="Active courses" detail="1 published this month" />
        <Metric value="184" label="Enrolled trainees" detail="+28 new this week" />
        <Metric value="89%" label="Assessment completion" detail="Above benchmark" />
        <Metric value="4.8" label="Cohort rating" detail="Based on 64 reviews" />
      </div>

      <div className="dashboard-grid">
        <section className="feature">
          <p className="eyebrow">COHORT PROGRESSION</p>
          <h2>Active curriculum metrics</h2>
          <ScoreBar name="Leadership Essentials (Cohort A)" current={78} target={85} tone="green" />
          <ScoreBar name="Communication at Work (Cohort C)" current={62} target={80} tone="orange" />
          <ScoreBar name="Advanced Team Management" current={45} target={75} tone="rust" />
          <hr />
          <button className="text-button" onClick={() => setPage("Courses")}>
            Manage all courses <Icon name="ArrowRight" size={15} />
          </button>
        </section>

        <section className="feature improvement">
          <p className="eyebrow">QUICK ACTIONS</p>
          <h2>Expand curriculum</h2>
          <p>
            Build new targeted learning pathways based on the latest organizational skill gaps identified in enterprise assessments.
          </p>
          <button
            className="button dark"
            style={{ marginTop: 20 }}
            onClick={() => setPage("Create Course")}
          >
            Launch Course Builder <Icon name="ArrowRight" size={16} />
          </button>
        </section>
      </div>
    </>
  );
}
