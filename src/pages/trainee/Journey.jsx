import React from "react";
export function Journey() {
  return (
    <div className="mini-journey">
      {[
        "Assessment",
        "Skill gap",
        "Recommendation",
        "Training",
        "Improvement",
      ].map((x, i) => (
        <React.Fragment key={x}>
          <div className={i === 1 ? "current" : ""}>
            <span>{i + 1}</span>
            {x}
          </div>
          {i < 4 && <i>→</i>}
        </React.Fragment>
      ))}
    </div>
  );
}
