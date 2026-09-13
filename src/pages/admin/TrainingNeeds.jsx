import { PageHead } from "../../components/PageHead";
export function TrainingNeeds() {
  let rows = [
    ["Data Analysis", "120 employees", "48%", "75%", "High"],
    ["Leadership", "84 employees", "59%", "80%", "High"],
    ["Communication", "73 employees", "61%", "75%", "Medium"],
    ["Safety", "44 employees", "76%", "90%", "Medium"],
  ];
  return (
    <>
      <PageHead
        kicker="TRAINING REQUIREMENTS"
        title="Where to invest in learning"
      />
      <p className="lead">
        Prioritized from competency gaps, role requirements and employee reach.
      </p>
      <div className="needs-list">
        {rows.map((r) => (
          <div key={r[0]}>
            <div>
              <b>{r[0]}</b>
              <small>{r[1]}</small>
            </div>
            <span>
              <small>Average competency</small>
              <b>{r[2]}</b>
            </span>
            <span>
              <small>Required competency</small>
              <b>{r[3]}</b>
            </span>
            <strong className={r[4].toLowerCase()}>{r[4]}</strong>
            <button className="text-button">Plan training →</button>
          </div>
        ))}
      </div>
    </>
  );
}
