import { useState, useMemo } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { loadAssessmentResults } from "../../data/assessments";

// Defined organizational benchmark roles
const BENCHMARK_ROLES = {
  associate: {
    id: "associate",
    title: "Operations Associate (Current Baseline)",
    experience: "1-2 Years",
    description: "Standard operational delivery, core compliance, and foundational workplace coordination.",
    benchmarks: {
      "Leadership": 80,
      "Communication": 75,
      "Technical Skills": 85,
      "Data & Workflow": 82,
      "Safety & Compliance": 90,
    },
  },
  senior: {
    id: "senior",
    title: "Senior Operations Lead (Promotion Target)",
    experience: "3-5 Years",
    description: "Cross-functional dependency management, operational quality audits, and junior mentoring.",
    benchmarks: {
      "Leadership": 88,
      "Communication": 85,
      "Technical Skills": 90,
      "Data & Workflow": 90,
      "Safety & Compliance": 95,
    },
  },
  manager: {
    id: "manager",
    title: "Operations Manager / Team Lead",
    experience: "5+ Years",
    description: "Full strategic ownership, resource planning, executive alignment, and performance coaching.",
    benchmarks: {
      "Leadership": 95,
      "Communication": 92,
      "Technical Skills": 85,
      "Data & Workflow": 92,
      "Safety & Compliance": 95,
    },
  },
};

// Detailed competency definitions and diagnostic sub-skills
const BASE_COMPETENCIES = [
  {
    id: "leadership",
    name: "Leadership",
    baseline: 54,
    assessmentCourseId: "leadership-essentials",
    mappedCourseId: "leadership-essentials",
    mappedCourseTitle: "Leadership Essentials",
    trainer: "Anita Verma",
    duration: "4 lessons · 4 weeks",
    diagnostic: "Primary deficit in cross-team negotiation, SBI feedback delivery, and DACI decision delegation under uncertainty.",
    subSkills: [
      { name: "SBI Constructive Feedback Delivery", score: 48, status: "Needs Focus" },
      { name: "DACI Decision Frameworks", score: 55, status: "Developing" },
      { name: "Psychological Safety & Trust Building", score: 60, status: "Competent" },
      { name: "Cross-Team Dependency Negotiation", score: 52, status: "Needs Focus" },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    baseline: 61,
    assessmentCourseId: "communication-at-work",
    mappedCourseId: "communication-at-work",
    mappedCourseTitle: "Communication at Work",
    trainer: "Rohan Mehta",
    duration: "3 lessons · 3 weeks",
    diagnostic: "Gaps observed in asynchronous document structuring (BLUF), executive status briefs, and de-escalation dialogue.",
    subSkills: [
      { name: "BLUF (Bottom Line Up Front) Structuring", score: 58, status: "Developing" },
      { name: "Active Listening & Paraphrasing", score: 68, status: "Competent" },
      { name: "Stakeholder Expectation Alignment", score: 56, status: "Developing" },
      { name: "Crisis & Risk Communication", score: 62, status: "Competent" },
    ],
  },
  {
    id: "technical",
    name: "Technical Skills",
    baseline: 78,
    assessmentCourseId: "web-development-foundations",
    mappedCourseId: "web-development-foundations",
    mappedCourseTitle: "Full-Stack Web Development Foundations",
    trainer: "Dev Academy",
    duration: "4 lessons · 6 weeks",
    diagnostic: "Strong fundamental web tooling; minor gaps in state management architecture and automated build pipelines.",
    subSkills: [
      { name: "Semantic HTML & Responsive Layouts", score: 86, status: "Strong" },
      { name: "RESTful API Integration", score: 80, status: "Strong" },
      { name: "Component State Architecture", score: 72, status: "Competent" },
      { name: "Continuous Integration & Deployment", score: 74, status: "Competent" },
    ],
  },
  {
    id: "data",
    name: "Data & Workflow",
    baseline: 70,
    assessmentCourseId: "data-analytics-sql",
    mappedCourseId: "data-analytics-sql",
    mappedCourseTitle: "Data Analytics & SQL Mastery",
    trainer: "Vikram Singh",
    duration: "3 lessons · 4 weeks",
    diagnostic: "Proficient in basic aggregations; developmental opportunity in multi-table joins, subqueries, and window functions.",
    subSkills: [
      { name: "SQL Aggregations & Grouping", score: 78, status: "Competent" },
      { name: "Complex Multi-Table JOIN Operations", score: 66, status: "Developing" },
      { name: "Operational Metric Visualizations", score: 74, status: "Competent" },
      { name: "Data Hygiene & Validation", score: 62, status: "Developing" },
    ],
  },
  {
    id: "safety",
    name: "Safety & Compliance",
    baseline: 86,
    assessmentCourseId: null,
    mappedCourseId: null,
    mappedCourseTitle: "Operational Safety Readiness (Verified)",
    trainer: "Priya Nair",
    duration: "Certified Credential",
    diagnostic: "Exceptional operational safety compliance; exceeds organizational threshold across regular audits.",
    subSkills: [
      { name: "Workplace Hazard Identification", score: 92, status: "Mastery" },
      { name: "Standard Operational Protocols", score: 88, status: "Strong" },
      { name: "Incident Reporting Procedures", score: 84, status: "Strong" },
      { name: "Ergonomic & Facility Compliance", score: 80, status: "Strong" },
    ],
  },
];

export function SkillGap({ setPage, onSelectCourse, onGoToAssessment }) {
  // Selected benchmark role
  const [selectedRoleId, setSelectedRoleId] = useState("associate");
  // Expanded drilldown accordion state
  const [expandedRow, setExpandedRow] = useState("leadership");
  // Filter mode
  const [filterPriority, setFilterPriority] = useState("all");

  const activeRole = BENCHMARK_ROLES[selectedRoleId] || BENCHMARK_ROLES.associate;

  // Real-time integration with actual completed assessment results
  const assessmentResults = useMemo(() => {
    return loadAssessmentResults();
  }, []);

  // Compute live competencies with targets and dynamic assessment scores
  const competencies = useMemo(() => {
    const adminTarget = Number(localStorage.getItem("capacity_target_benchmark") || 80);
    return BASE_COMPETENCIES.map((item) => {
      const baseTarget = activeRole.benchmarks[item.name] || 80;
      const target = (selectedRoleId === "associate" && item.name === "Leadership") ? adminTarget : baseTarget;
      // If trainee completed the assessment for this skill, take the higher score
      const testResult = item.assessmentCourseId ? assessmentResults[item.assessmentCourseId] : null;
      const liveCurrent = testResult && testResult.score ? Math.max(item.baseline, testResult.score) : item.baseline;
      const gap = Math.max(0, target - liveCurrent);

      let priority = "low";
      let priorityLabel = "On Track";
      let badgeColor = "#3d7348";
      let badgeBg = "#edf7ef";

      if (gap >= 20) {
        priority = "high";
        priorityLabel = "Critical Gap";
        badgeColor = "#b45538";
        badgeBg = "#fdeae3";
      } else if (gap >= 10) {
        priority = "medium";
        priorityLabel = "Moderate Gap";
        badgeColor = "#d98045";
        badgeBg = "#fdf2e9";
      }

      return {
        ...item,
        current: liveCurrent,
        target,
        gap,
        priority,
        priorityLabel,
        badgeColor,
        badgeBg,
        hasCompletedAssessment: Boolean(testResult?.passed),
      };
    });
  }, [activeRole, assessmentResults]);

  // Summary Metrics
  const totalGapSum = competencies.reduce((acc, c) => acc + c.gap, 0);
  const averageGap = Math.round(totalGapSum / competencies.length);

  // Find biggest deficit
  const primaryDeficit = useMemo(() => {
    return [...competencies].sort((a, b) => b.gap - a.gap)[0];
  }, [competencies]);

  // Filtered list
  const filteredList = useMemo(() => {
    if (filterPriority === "critical") return competencies.filter((c) => c.priority === "high");
    if (filterPriority === "gaps") return competencies.filter((c) => c.gap > 0);
    return competencies;
  }, [competencies, filterPriority]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["Competency Area", "Current Assessed %", "Target Role Benchmark %", "Gap Delta %", "Priority Level", "Recommended Pathway"];
    const rows = competencies.map((c) => [
      `"${c.name}"`,
      `${c.current}%`,
      `${c.target}%`,
      `-${c.gap}%`,
      `"${c.priorityLabel}"`,
      `"${c.mappedCourseTitle || 'Operational Compliance'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Capacity_Connect_Skill_Gap_${selectedRoleId}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleExpand = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Page Head with Dual Export Actions */}
      <div className="page-head" style={{ marginBottom: 20 }}>
        <div>
          <p className="eyebrow">CAPABILITY GAP INTELLIGENCE</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Identified Skill Gaps</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button outline" onClick={() => window.print()} title="Print or save as PDF">
            Print / PDF <Icon name="Printer" size={15} />
          </button>
          <button className="button dark" onClick={handleExportCSV} title="Export CSV for HR & Manager Analysis">
            Export CSV <Icon name="Download" size={15} />
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Granular comparison between your assessed competency baseline and the official target benchmarks established for your role.
      </p>

      {/* Role Benchmark Switcher Card */}
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--line)",
          padding: "20px 24px",
          borderRadius: 10,
          marginBottom: 28,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          <div>
            <span style={{ font: "600 11px 'DM Mono', monospace", color: "var(--muted)", letterSpacing: "0.08em" }}>
              TARGET ROLE BENCHMARK:
            </span>
            <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
              {Object.keys(BENCHMARK_ROLES).map((roleKey) => {
                const r = BENCHMARK_ROLES[roleKey];
                const isSelected = roleKey === selectedRoleId;
                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => setSelectedRoleId(roleKey)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: isSelected ? 600 : 400,
                      background: isSelected ? "var(--ink)" : "#f6f4ee",
                      color: isSelected ? "#fff" : "var(--ink)",
                      border: `1px solid ${isSelected ? "var(--ink)" : "var(--line)"}`,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {r.title}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)", maxWidth: 360, lineHeight: 1.5 }}>
            <Icon name="Compass" size={15} style={{ verticalAlign: "middle", marginRight: 5, color: "var(--green)" }} />
            {activeRole.description}
          </div>
        </div>
      </div>

      {/* Hero Metrics Overview */}
      <section className="gap-hero" style={{ borderRadius: 10, padding: "24px 28px", marginBottom: 30 }}>
        <div>
          <p>OVERALL GAP</p>
          <b style={{ color: averageGap > 15 ? "var(--rust)" : "var(--ink)" }}>{averageGap}%</b>
          <span style={{ fontSize: 11, color: "var(--muted)", display: "block", marginTop: 4 }}>
            Across {competencies.length} competencies
          </span>
        </div>
        <div>
          <p>PRIMARY DEFICIT</p>
          <b style={{ color: "var(--rust)" }}>{primaryDeficit.name}</b>
          <span style={{ fontSize: 11, color: "var(--rust)", display: "block", marginTop: 4 }}>
            -{primaryDeficit.gap}% delta to role target
          </span>
        </div>
        <div className="gap-callout" style={{ borderRadius: 8 }}>
          <span style={{ color: "var(--green)" }}>{competencies.filter((c) => c.priority === "high").length}</span>
          critical gap(s) requiring targeted pathway completion
        </div>
      </section>

      {/* Filter and Table Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ font: "600 11px 'DM Mono', monospace", color: "var(--muted)" }}>FILTER:</span>
          <button
            type="button"
            className={`pill ${filterPriority === "all" ? "selected" : ""}`}
            onClick={() => setFilterPriority("all")}
            style={{ cursor: "pointer", border: "1px solid var(--line)", background: filterPriority === "all" ? "var(--ink)" : "var(--paper)", color: filterPriority === "all" ? "#fff" : "var(--ink)" }}
          >
            All ({competencies.length})
          </button>
          <button
            type="button"
            className="pill"
            onClick={() => setFilterPriority("critical")}
            style={{ cursor: "pointer", border: "1px solid var(--line)", background: filterPriority === "critical" ? "#b45538" : "var(--paper)", color: filterPriority === "critical" ? "#fff" : "var(--ink)" }}
          >
            Critical Only ({competencies.filter((c) => c.priority === "high").length})
          </button>
          <button
            type="button"
            className="pill"
            onClick={() => setFilterPriority("gaps")}
            style={{ cursor: "pointer", border: "1px solid var(--line)", background: filterPriority === "gaps" ? "var(--orange)" : "var(--paper)", color: filterPriority === "gaps" ? "#fff" : "var(--ink)" }}
          >
            Any Gap ({competencies.filter((c) => c.gap > 0).length})
          </button>
        </div>

        <span style={{ fontSize: 12, color: "var(--muted)" }}>
          Click any competency row to view evaluated sub-skills &amp; pathway
        </span>
      </div>

      {/* Interactive Gap List */}
      <div className="gap-list" style={{ marginTop: 0 }}>
        <div className="gap-head" style={{ gridTemplateColumns: "1.4fr 0.6fr 0.6fr 1.4fr 120px" }}>
          <span>COMPETENCY AREA</span>
          <span>CURRENT</span>
          <span>TARGET</span>
          <span>GAP VISUALIZATION</span>
          <span style={{ textAlign: "right" }}>STATUS</span>
        </div>

        {filteredList.map((item) => {
          const isExpanded = expandedRow === item.id;
          return (
            <div
              key={item.id}
              style={{
                borderTop: "1px solid var(--line)",
                background: isExpanded ? "#faf8f2" : "transparent",
                transition: "background 0.15s ease",
              }}
            >
              {/* Row Main View */}
              <div
                className="gap-line"
                onClick={() => toggleExpand(item.id)}
                style={{
                  gridTemplateColumns: "1.4fr 0.6fr 0.6fr 1.4fr 120px",
                  cursor: "pointer",
                  padding: "18px 8px",
                  alignItems: "center",
                }}
                title="Click to toggle sub-skills drilldown"
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon name={isExpanded ? "ChevronDown" : "ChevronRight"} size={16} style={{ color: "var(--muted)", flexShrink: 0 }} />
                  <div>
                    <b style={{ fontSize: 14 }}>{item.name}</b>
                    {item.hasCompletedAssessment && (
                      <span style={{ fontSize: 10, color: "var(--green)", marginLeft: 6, fontWeight: 600 }}>
                        ✓ Assessment Passed
                      </span>
                    )}
                  </div>
                </div>

                <span style={{ fontSize: 14, fontWeight: 500 }}>{item.current}%</span>
                <span style={{ fontSize: 14, color: "var(--muted)" }}>{item.target}%</span>

                {/* Dual Progress Bar */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <strong style={{ minWidth: 36, color: item.gap > 0 ? item.badgeColor : "var(--green)", fontSize: 12 }}>
                    {item.gap > 0 ? `-${item.gap}%` : "Met ✓"}
                  </strong>
                  <div
                    style={{
                      flex: 1,
                      height: 8,
                      background: "#e5e5dc",
                      borderRadius: 4,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Current Score Progress */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${item.current}%`,
                        background: item.priority === "high" ? "var(--rust)" : item.priority === "medium" ? "var(--orange)" : "var(--green)",
                        borderRadius: "4px 0 0 4px",
                      }}
                    />
                    {/* Gap Fill to Target */}
                    {item.gap > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          left: `${item.current}%`,
                          top: 0,
                          bottom: 0,
                          width: `${item.gap}%`,
                          background: "rgba(180, 85, 56, 0.25)",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Priority Status Badge */}
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: item.badgeColor,
                      background: item.badgeBg,
                      padding: "4px 8px",
                      borderRadius: 4,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.priorityLabel}
                  </span>
                </div>
              </div>

              {/* Expandable Drilldown Content */}
              {isExpanded && (
                <div
                  style={{
                    padding: "16px 20px 24px 34px",
                    background: "#f7f5ed",
                    borderTop: "1px dashed #ded8c7",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 13, color: "#484b42", lineHeight: 1.5, margin: "0 0 12px" }}>
                      <strong>Diagnostic Assessment: </strong> {item.diagnostic}
                    </p>
                  </div>

                  {/* Sub-skills Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: 12,
                      marginBottom: 18,
                    }}
                  >
                    {item.subSkills.map((sub) => (
                      <div
                        key={sub.name}
                        style={{
                          background: "#ffffff",
                          border: "1px solid var(--line)",
                          borderRadius: 6,
                          padding: "10px 14px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>
                          <span>{sub.name}</span>
                          <b style={{ color: "var(--ink)" }}>{sub.score}%</b>
                        </div>
                        <div style={{ height: 4, background: "#eceae2", borderRadius: 2, overflow: "hidden" }}>
                          <div
                            style={{
                              width: `${sub.score}%`,
                              height: "100%",
                              background: sub.score >= 80 ? "var(--green)" : sub.score >= 60 ? "var(--orange)" : "var(--rust)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Recommendation for this Competency */}
                  {item.mappedCourseId && (
                    <div
                      style={{
                        background: "#ffffff",
                        border: "1px solid var(--line)",
                        borderRadius: 8,
                        padding: "14px 18px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 12,
                      }}
                    >
                      <div>
                        <span style={{ fontSize: 10, font: "600 10px 'DM Mono'", color: "var(--orange)", letterSpacing: "0.08em" }}>
                          MAPPED ACCELERATION PATHWAY
                        </span>
                        <h4 style={{ margin: "3px 0 2px", fontSize: 14 }}>{item.mappedCourseTitle}</h4>
                        <small style={{ color: "var(--muted)" }}>
                          Facilitated by {item.trainer} · {item.duration}
                        </small>
                      </div>

                      <div style={{ display: "flex", gap: 8 }}>
                        {onSelectCourse && (
                          <button
                            type="button"
                            className="button warm"
                            style={{ height: 34, fontSize: 12, gap: 6 }}
                            onClick={() => onSelectCourse(item.mappedCourseId, "Course Details")}
                          >
                            Launch Course <Icon name="Play" size={13} />
                          </button>
                        )}
                        {onGoToAssessment && (
                          <button
                            type="button"
                            className="button outline"
                            style={{ height: 34, fontSize: 12, gap: 6 }}
                            onClick={() => onGoToAssessment(item.mappedCourseId)}
                          >
                            Test Skill <Icon name="ClipboardCheck" size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Curated Actionable Recommendation Banner */}
      <section className="next-step" style={{ borderRadius: 10, padding: 26, marginTop: 35 }}>
        <Icon name="Sparkles" size={26} style={{ color: "var(--green)", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <p className="eyebrow" style={{ color: "var(--green)" }}>CURATED ACTION ROADMAP</p>
          <h3 style={{ margin: "2px 0 6px", fontSize: "1.25rem" }}>
            Close your largest developmental gap: {primaryDeficit.name} (-{primaryDeficit.gap}%)
          </h3>
          <p style={{ margin: 0, color: "#4f5549", fontSize: 13, lineHeight: 1.5 }}>
            Completing <b>{primaryDeficit.mappedCourseTitle}</b> addresses {primaryDeficit.gap}% of your evaluated deficit against the {activeRole.title} requirement.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {onSelectCourse && (
            <button
              className="button dark"
              onClick={() => onSelectCourse(primaryDeficit.mappedCourseId, "Course Details")}
              style={{ gap: 7 }}
            >
              Start Priority Course <Icon name="ArrowRight" size={15} />
            </button>
          )}
          {setPage && (
            <button
              className="button outline"
              onClick={() => setPage("Recommended")}
              style={{ gap: 6 }}
            >
              All Recommended Courses
            </button>
          )}
        </div>
      </section>
    </>
  );
}
