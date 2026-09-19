import { useState, useMemo } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { COURSE_ASSESSMENTS } from "../../data/assessments";

export function Assessments({ setPage }) {
  const [selectedCourseId, setSelectedCourseId] = useState("leadership-essentials");
  const [inspectingCourseId, setInspectingCourseId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Custom added questions stored in memory / state
  const [customQuestions, setCustomQuestions] = useState({});

  // New question form state
  const [targetCourse, setTargetCourse] = useState("leadership-essentials");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState(0);
  const [newExplanation, setNewExplanation] = useState("");
  const [successNotice, setSuccessNotice] = useState("");

  // Merge base questions with any custom trainer additions
  const activeCourse = useMemo(() => {
    const base = COURSE_ASSESSMENTS[selectedCourseId] || COURSE_ASSESSMENTS["leadership-essentials"];
    const added = customQuestions[selectedCourseId] || [];
    return {
      ...base,
      questions: [...base.questions, ...added],
    };
  }, [selectedCourseId, customQuestions]);

  const allCoursesList = useMemo(() => {
    return Object.keys(COURSE_ASSESSMENTS).map((cId) => {
      const base = COURSE_ASSESSMENTS[cId];
      const added = (customQuestions[cId] || []).length;
      return {
        ...base,
        totalQuestions: base.questions.length + added,
        cohortPassRate: cId === "leadership-essentials" ? "86%" : cId === "communication-at-work" ? "82%" : cId === "web-development-foundations" ? "91%" : "88%",
        totalExaminees: cId === "leadership-essentials" ? 48 : cId === "communication-at-work" ? 36 : 28,
      };
    });
  }, [customQuestions]);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return allCoursesList;
    return allCoursesList.filter((c) =>
      c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skill.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allCoursesList, searchQuery]);

  const handleSaveQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim() || newOptions.some((opt) => !opt.trim())) {
      alert("Please enter a question and all 4 options.");
      return;
    }

    const created = {
      id: `custom-${Date.now()}`,
      skill: COURSE_ASSESSMENTS[targetCourse]?.skill || "General",
      question: newQuestionText.trim(),
      options: [...newOptions],
      correctAnswer: newCorrectAnswer,
      explanation: newExplanation.trim() || "Validated standard competency concept.",
    };

    setCustomQuestions((prev) => ({
      ...prev,
      [targetCourse]: [...(prev[targetCourse] || []), created],
    }));

    setShowAddModal(false);
    setNewQuestionText("");
    setNewOptions(["", "", "", ""]);
    setNewCorrectAnswer(0);
    setNewExplanation("");
    setSuccessNotice(`Added new question to ${COURSE_ASSESSMENTS[targetCourse]?.courseTitle || "Assessment"}!`);
    setTimeout(() => setSuccessNotice(""), 3500);
  };

  const handleExportCSV = () => {
    const headers = ["Course", "Skill Domain", "Question Index", "Question Prompt", "Correct Option", "Explanation"];
    const rows = [];
    Object.keys(COURSE_ASSESSMENTS).forEach((cId) => {
      const c = COURSE_ASSESSMENTS[cId];
      c.questions.forEach((q, idx) => {
        rows.push([
          `"${c.courseTitle}"`,
          `"${c.skill}"`,
          idx + 1,
          `"${q.question.replace(/"/g, '""')}"`,
          `"${q.options[q.correctAnswer].replace(/"/g, '""')}"`,
          `"${(q.explanation || "").replace(/"/g, '""')}"`,
        ]);
      });
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "Capacity_Connect_Assessment_Question_Bank.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">INSTRUCTOR EVALUATION</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Assessments &amp; Question Banks</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button outline" onClick={handleExportCSV} title="Export question bank as CSV">
            <Icon name="Download" size={15} /> Export Banks
          </button>
          <button className="button dark" onClick={() => setShowAddModal(true)} title="Add custom evaluation question">
            <Icon name="PlusCircle" size={15} /> Create Question
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Manage course-aligned benchmark assessments, monitor cohort pass rates, inspect question banks, and define new competency evaluations.
      </p>

      {successNotice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <div className="metric">
          <b>{allCoursesList.length}</b>
          <span>Standard Assessments</span>
          <small>1 per curriculum pathway</small>
        </div>
        <div className="metric">
          <b>{allCoursesList.reduce((acc, c) => acc + c.totalQuestions, 0)}</b>
          <span>Total Bank Questions</span>
          <small>Min. 10 questions per course</small>
        </div>
        <div className="metric">
          <b>80%</b>
          <span>Passing Benchmark</span>
          <small>Industry mastery requirement</small>
        </div>
        <div className="metric">
          <b>86.4%</b>
          <span>Cohort Pass Rate</span>
          <small>Across 180+ examinee attempts</small>
        </div>
      </div>

      {/* Assessment Course Bank Selector */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "18px 22px", borderRadius: 10, marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
          <b style={{ fontSize: 14 }}>Active Curriculum Assessments</b>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Icon name="Search" size={15} style={{ color: "var(--muted)" }} />
            <input
              type="text"
              placeholder="Search assessment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: "1px solid var(--line)", padding: "6px 12px", borderRadius: 6, fontSize: 13, background: "#faf8f2", outline: "none" }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {filteredCourses.map((c) => {
            const isSelected = c.courseId === selectedCourseId;
            return (
              <div
                key={c.courseId}
                onClick={() => setSelectedCourseId(c.courseId)}
                style={{
                  border: `1.5px solid ${isSelected ? "var(--ink)" : "var(--line)"}`,
                  background: isSelected ? "#fcfbf7" : "#ffffff",
                  padding: "16px 18px",
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <span className="pill" style={{ background: isSelected ? "var(--ink)" : "#eeece4", color: isSelected ? "#fff" : "var(--ink)" }}>
                    {c.skill}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--green)" }}>{c.cohortPassRate} Pass Rate</span>
                </div>

                <h3 style={{ fontSize: "1.1rem", margin: "0 0 6px", color: "var(--ink)" }}>{c.courseTitle}</h3>
                <p style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.4, margin: "0 0 12px" }}>{c.description}</p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "var(--muted)", borderTop: "1px solid var(--line)", paddingTop: 10 }}>
                  <span>{c.totalQuestions} Questions · {c.timeMinutes}m</span>
                  <span style={{ color: "var(--ink)", fontWeight: 500 }}>{c.totalExaminees} Examinees</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Assessment Question Bank Inspector */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "24px 28px", borderRadius: 10, marginBottom: 35 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>QUESTION BANK INSPECTOR</p>
            <h2 style={{ fontSize: "1.6rem", margin: "4px 0 0" }}>
              {activeCourse.courseTitle} ({activeCourse.questions.length} Questions)
            </h2>
          </div>
          <button
            className="button dark"
            onClick={() => {
              setTargetCourse(selectedCourseId);
              setShowAddModal(true);
            }}
            style={{ gap: 6 }}
          >
            <Icon name="Plus" size={15} /> Add Question to This Bank
          </button>
        </div>

        {/* Question List Accordion */}
        <div style={{ display: "grid", gap: 16 }}>
          {activeCourse.questions.map((q, qIdx) => {
            const isOpened = inspectingCourseId === q.id || inspectingCourseId === `q-${qIdx}`;
            return (
              <div
                key={q.id || qIdx}
                style={{
                  border: "1px solid var(--line)",
                  background: isOpened ? "#faf8f2" : "#ffffff",
                  borderRadius: 8,
                  padding: "16px 20px",
                }}
              >
                <div
                  onClick={() => setInspectingCourseId(isOpened ? null : (q.id || `q-${qIdx}`))}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    gap: 14,
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ font: "700 11px 'DM Mono'", color: "var(--muted)", background: "#eae7de", padding: "3px 7px", borderRadius: 4 }}>
                      Q{qIdx + 1}
                    </span>
                    <h4 style={{ margin: 0, fontSize: "1.05rem", color: "var(--ink)", lineHeight: 1.4 }}>
                      {q.question}
                    </h4>
                  </div>
                  <Icon name={isOpened ? "ChevronUp" : "ChevronDown"} size={16} style={{ color: "var(--muted)", flexShrink: 0, marginTop: 4 }} />
                </div>

                {isOpened && (
                  <div style={{ marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                    <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = q.correctAnswer === optIdx;
                        return (
                          <div
                            key={optIdx}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "9px 12px",
                              borderRadius: 6,
                              fontSize: 13,
                              border: isCorrect ? "1.5px solid var(--green)" : "1px solid var(--line)",
                              background: isCorrect ? "#edf7ef" : "#ffffff",
                              color: isCorrect ? "#25532c" : "var(--ink)",
                              fontWeight: isCorrect ? 600 : 400,
                            }}
                          >
                            <span style={{ width: 22, height: 22, borderRadius: 3, display: "grid", placeItems: "center", font: "600 11px 'DM Mono'", background: isCorrect ? "var(--green)" : "#eeece4", color: isCorrect ? "#fff" : "var(--ink)" }}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span style={{ flex: 1 }}>{opt}</span>
                            {isCorrect && <span style={{ fontSize: 11, color: "var(--green)", fontWeight: 700 }}>Correct Answer ✓</span>}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div style={{ background: "#f4f1e8", border: "1px solid #ded8c7", padding: "10px 14px", borderRadius: 6, fontSize: 12, color: "#4f5247", display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <Icon name="Info" size={15} style={{ color: "#777a6f", flexShrink: 0, marginTop: 1 }} />
                        <div><strong>Pedagogical Context: </strong>{q.explanation}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Custom Question Modal */}
      {showAddModal && (
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
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              width: "min(680px, 100%)",
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 28,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>AUTHORING SUITE</p>
                <h3 style={{ margin: "4px 0 0", fontSize: "1.4rem" }}>Create Evaluation Question</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} style={{ cursor: "pointer", color: "var(--muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                  Target Assessment Curriculum
                </label>
                <select
                  value={targetCourse}
                  onChange={(e) => setTargetCourse(e.target.value)}
                  style={{ width: "100%", padding: 10, border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                >
                  {Object.keys(COURSE_ASSESSMENTS).map((cId) => (
                    <option key={cId} value={cId}>
                      {COURSE_ASSESSMENTS[cId].courseTitle} ({COURSE_ASSESSMENTS[cId].skill})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                  Question Text / Scenario
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. When a sprint milestone encounters an unpredicted API blocker, what is the best agile response?"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  style={{ width: "100%", padding: 10, border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                  Multiple Choice Options (Select radio for Correct Answer)
                </label>
                <div style={{ display: "grid", gap: 8 }}>
                  {newOptions.map((opt, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={newCorrectAnswer === idx}
                        onChange={() => setNewCorrectAnswer(idx)}
                        title="Mark as correct answer"
                      />
                      <span style={{ font: "600 11px 'DM Mono'", width: 20 }}>{String.fromCharCode(65 + idx)}</span>
                      <input
                        type="text"
                        required
                        placeholder={`Option ${String.fromCharCode(65 + idx)} text`}
                        value={opt}
                        onChange={(e) => {
                          const updated = [...newOptions];
                          updated[idx] = e.target.value;
                          setNewOptions(updated);
                        }}
                        style={{ flex: 1, padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                  Pedagogical Explanation &amp; Rationale
                </label>
                <input
                  type="text"
                  placeholder="Explains why the correct option aligns with capability standards..."
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button type="button" className="button outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="button dark" style={{ gap: 6 }}>
                  <Icon name="Save" size={15} /> Save to Bank
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
