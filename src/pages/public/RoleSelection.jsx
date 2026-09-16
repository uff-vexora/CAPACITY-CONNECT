import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { Brand } from "../../components/Brand";

export function RoleSelection({ role, setPage, setRole }) {
  const [selected, setSelected] = useState(role || "Trainee");

  const roles = [
    {
      id: "Trainee",
      title: "Trainee / Employee",
      desc: "Take competency assessments, track skill gaps, and complete targeted training courses.",
      icon: "UserCheck",
    },
    {
      id: "Trainer",
      title: "Instructor / Trainer",
      desc: "Create courses, manage cohorts, review trainee assessments, and track progress.",
      icon: "GraduationCap",
    },
    {
      id: "Admin",
      title: "Organization Administrator",
      desc: "Enterprise oversight, training needs analysis, user management, and capacity reporting.",
      icon: "ShieldCheck",
    },
  ];

  const handleContinue = () => {
    setRole(selected);
    setPage("Signup");
  };

  return (
    <div className="auth">
      <div className="brand" onClick={() => setPage("Landing")} style={{ cursor: "pointer" }}>
        <Brand />
      </div>
      <button className="back text-button" onClick={() => setPage("Landing")}>
        <Icon name="ArrowLeft" size={16} /> Back to home
      </button>

      <div className="auth-card roles">
        <p className="eyebrow">SELECT WORKSPACE</p>
        <h1>Choose your role</h1>
        <p>Select the workspace you want to create an account for.</p>

        <div>
          {roles.map((r) => {
            const isChosen = selected === r.id;
            return (
              <button
                key={r.id}
                type="button"
                className={`role-choice ${isChosen ? "chosen" : ""}`}
                onClick={() => setSelected(r.id)}
              >
                <Icon name={r.icon} size={24} />
                <span>
                  <b>{r.title}</b>
                  <small>{r.desc}</small>
                </span>
                <Icon name={isChosen ? "CheckCircle2" : "Circle"} size={20} />
              </button>
            );
          })}
        </div>

        <button className="button dark wide" onClick={handleContinue}>
          Enter {selected} Workspace <Icon name="ArrowRight" size={16} />
        </button>
      </div>
    </div>
  );
}
