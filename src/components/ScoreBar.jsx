export function ScoreBar({ name, current, target, tone = "green" }) {
  return (
    <div className="score-row">
      <div className="score-top">
        <b>{name}</b>
        <span>
          <strong>{current}%</strong> / {target}% target
        </span>
      </div>
      <div className="bar dual">
        <i className={`fill ${tone}`} style={{ width: `${current}%` }} />
        <em style={{ left: `${target}%` }} />
      </div>
    </div>
  );
}
