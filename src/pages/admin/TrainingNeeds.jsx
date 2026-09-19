import { useState, useMemo } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { Metric } from "../../components/Metric";
import { loadTrainers } from "../../data/trainers";

const INITIAL_NEEDS = [
  {
    id: "need-1",
    skill: "Data Literacy & SQL Analytics",
    employeesAffected: 120,
    currentScore: 48,
    targetScore: 75,
    urgency: "High",
    recommendedTrack: "Data Analytics & SQL Mastery",
    leadTrainer: "Vikram Singh",
    budget: "₹48,000",
    status: "Planning Required",
  },
  {
    id: "need-2",
    skill: "Executive Leadership & DACI Decision-Making",
    employeesAffected: 84,
    currentScore: 54,
    targetScore: 80,
    urgency: "High",
    recommendedTrack: "Leadership Essentials",
    leadTrainer: "Anita Verma",
    budget: "₹42,000",
    status: "Cohort Launch Ready",
  },
  {
    id: "need-3",
    skill: "Cross-Departmental BLUF Communication",
    employeesAffected: 73,
    currentScore: 61,
    targetScore: 75,
    urgency: "Medium",
    recommendedTrack: "Communication at Work",
    leadTrainer: "Rohan Mehta",
    budget: "₹30,000",
    status: "Active Pathway",
  },
  {
    id: "need-4",
    skill: "Operational Safety & Incident Protocol",
    employeesAffected: 44,
    currentScore: 76,
    targetScore: 90,
    urgency: "Medium",
    recommendedTrack: "Operational Safety Readiness",
    leadTrainer: "Priya Nair",
    budget: "₹25,000",
    status: "Active Pathway",
  },
  {
    id: "need-5",
    skill: "Generative AI Pattern Prompting & Guardrails",
    employeesAffected: 65,
    currentScore: 50,
    targetScore: 80,
    urgency: "High",
    recommendedTrack: "Generative AI & Prompt Engineering for Work",
    leadTrainer: "AI Research Lab",
    budget: "₹35,000",
    status: "Planning Required",
  },
];

export function TrainingNeeds({ setPage }) {
  const [needs, setNeeds] = useState(INITIAL_NEEDS);
  const [search, setSearch] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [activePlanNeed, setActivePlanNeed] = useState(null);
  const [notice, setNotice] = useState("");

  // Modal form state
  const [assignedTrainer, setAssignedTrainer] = useState("Anita Verma");
  const [cohortSize, setCohortSize] = useState(30);
  const [launchDate, setLaunchDate] = useState("Next Monday");

  const filtered = useMemo(() => {
    return needs.filter((n) => {
      const matchSearch =
        n.skill.toLowerCase().includes(search.toLowerCase()) ||
        n.recommendedTrack.toLowerCase().includes(search.toLowerCase()) ||
        n.leadTrainer.toLowerCase().includes(search.toLowerCase());
      const matchUrgency = selectedUrgency === "all" || n.urgency === selectedUrgency;
      return matchSearch && matchUrgency;
    });
  }, [needs, search, selectedUrgency]);

  const handleLaunchCohort = (e) => {
    e.preventDefault();
    if (!activePlanNeed) return;

    setNeeds((prev) =>
      prev.map((item) =>
        item.id === activePlanNeed.id ? { ...item, status: "Active Pathway" } : item
      )
    );

    setShowPlanModal(false);
    setNotice(`Launched new cohort for ${activePlanNeed.skill} led by ${assignedTrainer}!`);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleExportCSV = () => {
    const headers = ["Competency Gap Area", "Employees Impacted", "Current Baseline", "Target Benchmark", "Urgency Priority", "Curriculum Pathway", "Lead Facilitator", "Allocated Budget", "Status"];
    const rows = needs.map((n) => [
      `"${n.skill}"`,
      n.employeesAffected,
      `${n.currentScore}%`,
      `${n.targetScore}%`,
      `"${n.urgency}"`,
      `"${n.recommendedTrack}"`,
      `"${n.leadTrainer}"`,
      `"${n.budget}"`,
      `"${n.status}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "Capacity_Connect_Enterprise_Training_Needs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">CAPACITY INVESTMENT PRIORITIES</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Enterprise Training Requirements</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button outline" onClick={handleExportCSV} title="Export training requirements to CSV">
            <Icon name="Download" size={15} /> Export Requirements
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Prioritized capability investments derived from workforce competency gaps, departmental mandates, and strategic capacity goals.
      </p>

      {notice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <Metric value="5" label="Identified Gap Areas" detail="3 High urgency" />
        <Metric value="386" label="Impacted Employees" detail="31% of workforce" />
        <Metric value="₹1,80,000" label="Allocated Budget" detail="Fiscal Year 2026" />
        <Metric value="+24%" label="Target Capability Gain" detail="Post-intervention goal" />
      </div>

      {/* Filter and Search Bar */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "16px 20px", borderRadius: 10, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 260 }}>
          <Icon name="Search" size={16} style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="Search training needs by skill, track, or facilitator..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13, outline: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["all", "High", "Medium"].map((u) => (
            <button
              key={u}
              type="button"
              className={`pill ${selectedUrgency === u ? "selected" : ""}`}
              onClick={() => setSelectedUrgency(u)}
              style={{
                cursor: "pointer",
                border: "1px solid var(--line)",
                background: selectedUrgency === u ? "var(--ink)" : "var(--paper)",
                color: selectedUrgency === u ? "#fff" : "var(--ink)",
                padding: "6px 12px",
              }}
            >
              {u === "all" ? "All Priorities" : `${u} Priority`}
            </button>
          ))}
        </div>
      </div>

      {/* Needs Cards */}
      <div style={{ display: "grid", gap: 16 }}>
        {filtered.map((item) => {
          const gap = item.targetScore - item.currentScore;
          return (
            <div
              key={item.id}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: 22,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 4,
                      background: item.urgency === "High" ? "#fdeae3" : "#fdf2e9",
                      color: item.urgency === "High" ? "#9e3d1c" : "#b85d3b",
                    }}
                  >
                    {item.urgency} Urgency
                  </span>
                  <span className="pill">{item.employeesAffected} Employees Impacted</span>
                  <span style={{ fontSize: 11, color: "var(--muted)" }}>Budget: <b>{item.budget}</b></span>
                </div>

                <h3 style={{ fontSize: "1.25rem", margin: "0 0 6px", color: "var(--ink)" }}>{item.skill}</h3>
                <small style={{ color: "var(--muted)", display: "block", marginBottom: 12 }}>
                  Aligned Curriculum: <b>{item.recommendedTrack}</b> · Facilitator: <b>{item.leadTrainer}</b>
                </small>

                <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 12 }}>
                  <span>Current Baseline: <b>{item.currentScore}%</b></span>
                  <span>Target Benchmark: <b>{item.targetScore}%</b></span>
                  <span style={{ color: "var(--rust)", fontWeight: 600 }}>Gap: -{gap}%</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: 4,
                    background: item.status === "Active Pathway" ? "#edf7ef" : "#faf8f2",
                    color: item.status === "Active Pathway" ? "var(--green)" : "var(--muted)",
                    border: "1px solid var(--line)",
                  }}
                >
                  {item.status}
                </span>

                <button
                  className="button dark"
                  style={{ height: 34, fontSize: 12, gap: 5 }}
                  onClick={() => {
                    setActivePlanNeed(item);
                    setAssignedTrainer(item.leadTrainer);
                    setShowPlanModal(true);
                  }}
                >
                  <Icon name="CalendarPlus" size={14} /> Plan Cohort
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plan Cohort Modal */}
      {showPlanModal && activePlanNeed && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(18,20,16,0.75)",
            backdropFilter: "blur(3px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setShowPlanModal(false)}
        >
          <div
            style={{
              width: "min(540px, 100%)",
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 28,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>TRAINING ALLOCATION</p>
                <h3 style={{ margin: "4px 0 0", fontSize: "1.4rem" }}>Plan Cohort Intervention</h3>
              </div>
              <button onClick={() => setShowPlanModal(false)} style={{ cursor: "pointer", color: "var(--muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            <div style={{ background: "#faf8f2", border: "1px solid var(--line)", padding: "14px 16px", borderRadius: 8, marginBottom: 18 }}>
              <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>TARGET COMPETENCY GAP</span>
              <b style={{ fontSize: 14, color: "var(--ink)" }}>{activePlanNeed.skill}</b>
              <small style={{ display: "block", color: "var(--muted)", fontSize: 12, marginTop: 2 }}>
                {activePlanNeed.employeesAffected} employees · Current: {activePlanNeed.currentScore}% → Target: {activePlanNeed.targetScore}%
              </small>
            </div>

            <form onSubmit={handleLaunchCohort}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Lead Facilitator</label>
                <select
                  value={assignedTrainer}
                  onChange={(e) => setAssignedTrainer(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                >
                  {loadTrainers().map((t) => (
                    <option key={t.id} value={t.name}>{t.name} ({t.domain})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Cohort Seat Capacity</label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={cohortSize}
                    onChange={(e) => setCohortSize(Number(e.target.value))}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Kickoff Target Date</label>
                  <input
                    type="text"
                    value={launchDate}
                    onChange={(e) => setLaunchDate(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button type="button" className="button outline" onClick={() => setShowPlanModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="button dark" style={{ gap: 6 }}>
                  <Icon name="Check" size={15} /> Authorize Cohort Launch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
