import { useState, useMemo, useEffect } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import {
  COURSE_ASSESSMENTS,
  DEFAULT_ASSESSMENT_KEY,
  saveAssessmentResult,
  loadAssessmentResults,
} from "../../data/assessments";

export function Assessment({
  setPage,
  initialCourseId,
  courses = [],
  onSelectCourseAssessment,
}) {
  // Course assessment selection
  const [activeCourseId, setActiveCourseId] = useState(
    initialCourseId || DEFAULT_ASSESSMENT_KEY
  );

  // Sync if initialCourseId changes externally (e.g. from CourseDetails navigation)
  useEffect(() => {
    if (initialCourseId && COURSE_ASSESSMENTS[initialCourseId]) {
      setActiveCourseId(initialCourseId);
      setCurrentIdx(0);
      setAnswers({});
      setIsSubmitted(false);
    }
  }, [initialCourseId]);

  // Load prior stored results
  const [allResults, setAllResults] = useState(() => loadAssessmentResults());

  // Assessment question state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  // Active course assessment data (Instant local lookup, 0ms load time)
  const activeAssessment = useMemo(() => {
    return (
      COURSE_ASSESSMENTS[activeCourseId] ||
      COURSE_ASSESSMENTS[DEFAULT_ASSESSMENT_KEY]
    );
  }, [activeCourseId]);

  const questions = activeAssessment.questions || [];
  const currentQuestion = questions[currentIdx] || questions[0];
  const isLast = currentIdx === questions.length - 1;

  // Answered count calculation
  const answeredCount = useMemo(() => {
    return Object.keys(answers).filter((qId) => answers[qId] !== undefined).length;
  }, [answers]);

  // Switch between courses
  const handleSwitchCourse = (courseId) => {
    if (!COURSE_ASSESSMENTS[courseId]) return;
    setActiveCourseId(courseId);
    setCurrentIdx(0);
    setAnswers({});
    setIsSubmitted(false);
    setSubmittedData(null);
    setConfirmSubmitOpen(false);
    if (onSelectCourseAssessment) {
      onSelectCourseAssessment(courseId);
    }
  };

  // Select an option
  const handleSelectOption = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Submit assessment and compute score
  const handleSubmit = () => {
    setConfirmSubmitOpen(false);

    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const totalCount = questions.length;
    const score = Math.round((correctCount / totalCount) * 100);
    const passed = score >= (activeAssessment.requiredScore || 80);

    const resultRecord = {
      score,
      passed,
      correctCount,
      totalCount,
      answers,
      courseTitle: activeAssessment.courseTitle,
      skill: activeAssessment.skill,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      timestamp: Date.now(),
    };

    // Save locally
    saveAssessmentResult(activeCourseId, resultRecord);
    setAllResults(loadAssessmentResults());
    setSubmittedData(resultRecord);
    setIsSubmitted(true);

    // Save to sessionStorage for compatibility
    try {
      sessionStorage.setItem(
        "capacity_result",
        JSON.stringify({
          overallScore: score,
          passed,
          courseId: activeCourseId,
          courseTitle: activeAssessment.courseTitle,
          correctCount,
          totalCount,
        })
      );
    } catch (e) {
      console.error(e);
    }

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Retake current assessment
  const handleRetake = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
    setSubmittedData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Check if prior passed result exists for current course
  const priorResult = allResults[activeCourseId];

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">COMPETENCY BENCHMARK</p>
          <h1 style={{ fontSize: "2.2rem", margin: "4px 0 0" }}>
            Course Skill Assessments
          </h1>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {setPage && (
            <button
              className="button outline"
              onClick={() => setPage("Course Details")}
              style={{ gap: 6 }}
            >
              <Icon name="BookOpen" size={15} /> Back to Course
            </button>
          )}
          {setPage && (
            <button
              className="button dark"
              onClick={() => setPage("Certificates")}
              style={{ gap: 6 }}
            >
              <Icon name="Award" size={15} /> View Certificates
            </button>
          )}
        </div>
      </div>

      {/* Course Assessment Switcher Tabs */}
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--line)",
          padding: "16px 20px",
          marginBottom: 26,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span
            style={{
              font: "500 11px 'DM Mono', monospace",
              letterSpacing: "0.08em",
              color: "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            SELECT COURSE ASSESSMENT ({Object.keys(COURSE_ASSESSMENTS).length} AVAILABLE)
          </span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>
            Each assessment contains <b>10 competency questions</b> (80% to pass)
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          {Object.keys(COURSE_ASSESSMENTS).map((cId) => {
            const ca = COURSE_ASSESSMENTS[cId];
            const res = allResults[cId];
            const isCurrent = cId === activeCourseId;
            return (
              <button
                key={cId}
                type="button"
                onClick={() => handleSwitchCourse(cId)}
                style={{
                  padding: "10px 14px",
                  borderRadius: 4,
                  fontSize: 13,
                  fontWeight: isCurrent ? 600 : 400,
                  background: isCurrent ? "#23261f" : "#fbfaf6",
                  color: isCurrent ? "#ffffff" : "var(--ink)",
                  border: `1px solid ${isCurrent ? "#23261f" : "var(--line)"}`,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all 0.15s ease",
                  flexShrink: 0,
                }}
              >
                <span>{ca.courseTitle}</span>
                {res?.passed ? (
                  <span
                    style={{
                      fontSize: 11,
                      background: "#3d7348",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: 3,
                      fontWeight: 600,
                    }}
                  >
                    {res.score}% ✓
                  </span>
                ) : res ? (
                  <span
                    style={{
                      fontSize: 11,
                      background: "#b85d3b",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: 3,
                      fontWeight: 600,
                    }}
                  >
                    {res.score}%
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: 11,
                      color: isCurrent ? "#cfd3c7" : "var(--muted)",
                      background: isCurrent ? "#34382e" : "#eae7dd",
                      padding: "2px 6px",
                      borderRadius: 3,
                    }}
                  >
                    10 Qs
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RESULT VIEW (AFTER SUBMISSION) */}
      {isSubmitted && submittedData ? (
        <div className="assessment-card" style={{ maxWidth: 860 }}>
          {/* Hero Outcome Banner */}
          <div
            style={{
              padding: 28,
              border: `2px solid ${submittedData.passed ? "#3d7348" : "#c45b36"}`,
              background: submittedData.passed ? "#edf6ee" : "#faefe9",
              marginBottom: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <span
                style={{
                  font: "600 11px 'DM Mono', monospace",
                  letterSpacing: "0.1em",
                  color: submittedData.passed ? "#2d5e36" : "#9e3d1c",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {submittedData.passed
                  ? "★ BENCHMARK PASSED • CERTIFICATE UNLOCKED"
                  : "ASSESSMENT COMPLETE • BENCHMARK NOT YET MET"}
              </span>
              <h2
                style={{
                  fontSize: "1.8rem",
                  margin: 0,
                  color: "#1a1c18",
                  lineHeight: 1.2,
                }}
              >
                {submittedData.courseTitle}
              </h2>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "#4f5249",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {submittedData.passed
                  ? `Congratulations! You scored ${submittedData.score}%, exceeding the 80% passing mark. Your verified credential is now available.`
                  : `You scored ${submittedData.score}%. An 80% score is required to unlock your verified credential. Review the explanations below and retake whenever you are ready.`}
              </p>
            </div>

            {/* Score Ring / Block */}
            <div
              style={{
                minWidth: 120,
                textAlign: "center",
                padding: "16px 20px",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  font: "700 2.8rem 'DM Mono', monospace",
                  color: submittedData.passed ? "#2d5e36" : "#9e3d1c",
                  lineHeight: 1,
                }}
              >
                {submittedData.score}%
              </div>
              <small
                style={{
                  display: "block",
                  marginTop: 6,
                  color: "var(--muted)",
                  fontSize: 12,
                }}
              >
                {submittedData.correctCount} of {submittedData.totalCount} Correct
              </small>
            </div>
          </div>

          {/* Action Row */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 35,
              flexWrap: "wrap",
            }}
          >
            {submittedData.passed && setPage && (
              <button
                className="button warm"
                onClick={() => setPage("Certificates")}
                style={{ gap: 8, padding: "11px 22px" }}
              >
                <Icon name="Award" size={17} /> View &amp; Download Certificate
              </button>
            )}
            <button
              className="button dark"
              onClick={handleRetake}
              style={{ gap: 8, padding: "11px 20px" }}
            >
              <Icon name="RotateCcw" size={16} /> Retake Assessment
            </button>
            {setPage && (
              <button
                className="button outline"
                onClick={() => setPage("Course Details")}
                style={{ gap: 8, padding: "11px 18px" }}
              >
                <Icon name="BookOpen" size={16} /> Return to Course
              </button>
            )}
          </div>

          {/* Full Question Breakdown & Explanations */}
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 28 }}>
            <div style={{ marginBottom: 20 }}>
              <p className="eyebrow">QUESTION-BY-QUESTION REVIEW ({questions.length} QUESTIONS)</p>
              <h3 style={{ margin: "4px 0 0", fontSize: "1.3rem" }}>
                Detailed Explanations &amp; Answers
              </h3>
            </div>

            <div style={{ display: "grid", gap: 20 }}>
              {questions.map((q, idx) => {
                const userAns = submittedData.answers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div
                    key={q.id || idx}
                    style={{
                      border: `1px solid ${isCorrect ? "#cde3cf" : "#ecd0c5"}`,
                      background: isCorrect ? "#fafdfa" : "#fdfbf9",
                      padding: 22,
                      borderRadius: 4,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 12,
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          font: "600 11px 'DM Mono', monospace",
                          color: "var(--muted)",
                        }}
                      >
                        QUESTION {idx + 1} OF {questions.length}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: isCorrect ? "#2d5e36" : "#a33e1b",
                          background: isCorrect ? "#e2f2e4" : "#fdeae3",
                          padding: "3px 10px",
                          borderRadius: 3,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Icon name={isCorrect ? "CheckCircle2" : "XCircle"} size={14} />
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontSize: "1.05rem",
                        lineHeight: 1.4,
                        margin: "0 0 14px",
                        color: "#1a1c18",
                        fontWeight: 600,
                      }}
                    >
                      {q.question}
                    </h4>

                    {/* Options list showing user selection and correct answer */}
                    <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        const isRightOption = q.correctAnswer === optIdx;

                        let borderStyle = "1px solid var(--line)";
                        let bgStyle = "#ffffff";
                        let textColor = "var(--ink)";

                        if (isRightOption) {
                          borderStyle = "1.5px solid #3d7348";
                          bgStyle = "#edf7ef";
                          textColor = "#1d4724";
                        } else if (isSelected && !isCorrect) {
                          borderStyle = "1.5px solid #c45b36";
                          bgStyle = "#faece6";
                          textColor = "#8f2e10";
                        }

                        return (
                          <div
                            key={optIdx}
                            style={{
                              padding: "10px 14px",
                              border: borderStyle,
                              background: bgStyle,
                              color: textColor,
                              fontSize: 13,
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              borderRadius: 4,
                            }}
                          >
                            <span
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 3,
                                display: "grid",
                                placeItems: "center",
                                font: "500 11px 'DM Mono', monospace",
                                background: isRightOption
                                  ? "#3d7348"
                                  : isSelected && !isCorrect
                                  ? "#c45b36"
                                  : "#e9e7df",
                                color: isRightOption || (isSelected && !isCorrect) ? "#fff" : "var(--ink)",
                                flexShrink: 0,
                              }}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span style={{ flex: 1, lineHeight: 1.4 }}>{opt}</span>
                            {isRightOption && (
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: "#2d5e36",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                              >
                                Correct Answer ✓
                              </span>
                            )}
                            {isSelected && !isCorrect && (
                              <span
                                style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: "#9e3d1c",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 4,
                                }}
                              >
                                Your Selection ✗
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    {q.explanation && (
                      <div
                        style={{
                          background: "#f4f1e8",
                          border: "1px solid #e0dccc",
                          padding: "12px 16px",
                          fontSize: 13,
                          color: "#3a3c35",
                          lineHeight: 1.5,
                          borderRadius: 4,
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <Icon
                          name="Info"
                          size={16}
                          style={{ color: "#75786c", flexShrink: 0, marginTop: 2 }}
                        />
                        <div>
                          <strong style={{ color: "#1a1c18" }}>Explanation: </strong>
                          {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ACTIVE TEST TAKING VIEW */
        <div className="assessment-card" style={{ maxWidth: 860 }}>
          {/* Assessment Meta Header */}
          <div className="assessment-meta" style={{ borderTop: "none", paddingTop: 0 }}>
            <div>
              <span>
                QUESTION <b>{currentIdx + 1} OF {questions.length}</b>
              </span>
              <span style={{ marginLeft: 16 }}>
                DOMAIN: <strong>{currentQuestion.skill || activeAssessment.skill}</strong>
              </span>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
              <span>
                Pass Benchmark: <b>{activeAssessment.requiredScore || 80}%</b>
              </span>
              <span>
                Time limit: <b>~{activeAssessment.timeMinutes || 15} mins</b>
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bar" style={{ margin: "14px 0 22px" }}>
            <i
              style={{
                width: `${((currentIdx + 1) / questions.length) * 100}%`,
                background: "var(--green)",
                transition: "width 0.25s ease",
              }}
            />
          </div>

          {/* Question Quick Jump Matrix (1 to 10) */}
          <div
            style={{
              display: "flex",
              gap: 6,
              alignItems: "center",
              marginBottom: 26,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                font: "500 11px 'DM Mono', monospace",
                color: "var(--muted)",
                marginRight: 6,
              }}
            >
              JUMP TO:
            </span>
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentIdx;
              return (
                <button
                  key={q.id || idx}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 3,
                    fontSize: 12,
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: isCurrent ? 700 : 500,
                    border: isCurrent
                      ? "2px solid #23261f"
                      : isAnswered
                      ? "1px solid #3d7348"
                      : "1px solid var(--line)",
                    background: isCurrent
                      ? "#23261f"
                      : isAnswered
                      ? "#edf7ef"
                      : "var(--paper)",
                    color: isCurrent
                      ? "#ffffff"
                      : isAnswered
                      ? "#1f4a26"
                      : "var(--muted)",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                  }}
                  title={`Question ${idx + 1}: ${isAnswered ? "Answered" : "Unanswered"}`}
                >
                  {idx + 1}
                </button>
              );
            })}
            <span
              style={{
                marginLeft: "auto",
                fontSize: 12,
                color: answeredCount === questions.length ? "var(--green)" : "var(--muted)",
                fontWeight: 500,
              }}
            >
              {answeredCount} of {questions.length} answered
            </span>
          </div>

          {/* Question Prompt */}
          <h2
            style={{
              fontSize: "1.45rem",
              lineHeight: 1.38,
              color: "#1a1c18",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="options" style={{ gap: 12 }}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === index;
              return (
                <button
                  key={option}
                  type="button"
                  className={isSelected ? "selected" : ""}
                  onClick={() => handleSelectOption(currentQuestion.id, index)}
                  style={{
                    padding: "16px 18px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    background: isSelected ? "#edf4eb" : "#ffffff",
                    borderColor: isSelected ? "var(--green)" : "var(--line)",
                  }}
                >
                  <span
                    style={{
                      background: isSelected ? "var(--green)" : "#eeece4",
                      color: isSelected ? "#fff" : "var(--ink)",
                      borderColor: isSelected ? "var(--green)" : "var(--line)",
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.45,
                      color: isSelected ? "#1a1c18" : "#2f312b",
                      fontWeight: isSelected ? 500 : 400,
                    }}
                  >
                    {option}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation and Submit Buttons */}
          <div
            className="assessment-footer"
            style={{
              marginTop: 34,
              borderTop: "1px solid var(--line)",
              paddingTop: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <button
              type="button"
              className="button outline"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(currentIdx - 1)}
              style={{
                opacity: currentIdx === 0 ? 0.4 : 1,
                cursor: currentIdx === 0 ? "not-allowed" : "pointer",
                gap: 6,
              }}
            >
              <Icon name="ArrowLeft" size={16} /> Previous
            </button>

            <div style={{ display: "flex", gap: 10 }}>
              {!isLast ? (
                <button
                  type="button"
                  className="button dark"
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  style={{ gap: 6 }}
                >
                  Next Question <Icon name="ArrowRight" size={16} />
                </button>
              ) : null}

              <button
                type="button"
                className="button warm"
                onClick={() => {
                  if (answeredCount < questions.length) {
                    setConfirmSubmitOpen(true);
                  } else {
                    handleSubmit();
                  }
                }}
                style={{ gap: 6 }}
              >
                Submit Assessment <Icon name="CheckCircle2" size={16} />
              </button>
            </div>
          </div>

          {/* Incomplete Submission Confirmation Modal */}
          {confirmSubmitOpen && (
            <div
              style={{
                marginTop: 22,
                padding: 18,
                background: "#fdf4ef",
                border: "1px solid #e8bcad",
                borderRadius: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 14,
              }}
            >
              <div>
                <b style={{ color: "#a13c19", display: "block" }}>
                  Unanswered Questions Warning
                </b>
                <span style={{ fontSize: 13, color: "#59504b" }}>
                  You have answered {answeredCount} of {questions.length} questions.
                  Unanswered questions will be scored as incorrect.
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="button outline"
                  onClick={() => setConfirmSubmitOpen(false)}
                >
                  Continue Reviewing
                </button>
                <button
                  type="button"
                  className="button dark"
                  onClick={handleSubmit}
                >
                  Confirm &amp; Submit Now
                </button>
              </div>
            </div>
          )}

          {/* Prior Attempt Notice */}
          {priorResult && (
            <div
              style={{
                marginTop: 24,
                padding: "10px 16px",
                background: "#f4f1e8",
                border: "1px solid #e3decb",
                fontSize: 12,
                color: "#4f5248",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                Last attempt for {activeAssessment.courseTitle}:{" "}
                <b>{priorResult.score}%</b> ({priorResult.passed ? "Passed ✓" : "Needs Review"}{" "}
                on {priorResult.date})
              </span>
              <button
                type="button"
                onClick={() => {
                  setSubmittedData(priorResult);
                  setIsSubmitted(true);
                }}
                style={{
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  color: "var(--green)",
                  cursor: "pointer",
                  font: "inherit",
                }}
              >
                View Last Result
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
