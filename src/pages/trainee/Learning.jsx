import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";

export function Learning() {
  return (
    <>
      <PageHead kicker="CURRENT LEARNING" title="Leadership Essentials" />
      <div className="learning-layout">
        <aside className="module-panel">
          <p className="eyebrow">COURSE MODULES</p>
          {[
            "Understanding your leadership style",
            "Making decisions with your team",
            "Giving clear, useful feedback",
            "Leading through change",
          ].map((x, i) => (
            <button className={i === 1 ? "active" : ""} key={x}>
              <span>
                {i < 1 ? (
                  <Icon name="Check" size={14} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              {x}
              <small>
                {i === 0 ? "Complete" : i === 1 ? "In progress" : "12 min"}
              </small>
            </button>
          ))}
        </aside>
        <section className="lesson">
          <div className="video">
            <Icon name="Play" size={32} />
            <span>Lesson 2 · 14:20</span>
          </div>
          <p className="eyebrow">MODULE 01 · LESSON 02</p>
          <h2>Making decisions with your team</h2>
          <p>
            Strong leaders create the conditions for good decisions. In this
            lesson, explore when to decide independently, consult the team, or
            build consensus.
          </p>
          <div className="lesson-actions">
            <button className="text-button">← Previous lesson</button>
            <button className="button warm">
              Mark complete <Icon name="Check" size={16} />
            </button>
            <button className="text-button">Next lesson →</button>
          </div>
        </section>
        <aside className="resource-panel">
          <p className="eyebrow">YOUR PROGRESS</p>
          <b>35%</b>
          <div className="bar">
            <i style={{ width: "35%" }} />
          </div>
          <hr />
          <p className="eyebrow">RESOURCES</p>
          <a>Decision-making worksheet</a>
          <a>Team consultation guide</a>
          <hr />
          <p className="eyebrow">NOTES</p>
          <textarea placeholder="Add a note for yourself…" />
        </aside>
      </div>
    </>
  );
}
