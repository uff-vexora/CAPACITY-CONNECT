import { useState, useEffect } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";

export function Learning({ course, onToggleModuleComplete, onSaveNote, onBack }) {
  if (!course) {
    return (
      <div className="empty-courses">
        <p>No course selected for learning.</p>
        <button className="button dark" onClick={onBack}>
          ← Return to My Courses
        </button>
      </div>
    );
  }

  const modules = course.modules || [];
  const completedModules = course.completedModules || [];

  // Default to first incomplete module, or 0
  const firstIncomplete = modules.findIndex((_, idx) => !completedModules.includes(idx));
  const initialIndex = firstIncomplete !== -1 ? firstIncomplete : 0;

  const [activeModuleIndex, setActiveModuleIndex] = useState(initialIndex);
  const [noteText, setNoteText] = useState("");
  const [noteSavedNotice, setNoteSavedNotice] = useState(false);

  // Sync active lesson when course changes
  useEffect(() => {
    const nextIncomplete = modules.findIndex((_, idx) => !completedModules.includes(idx));
    setActiveModuleIndex(nextIncomplete !== -1 ? nextIncomplete : 0);
  }, [course.id]);

  // Sync note text when active module changes
  useEffect(() => {
    const savedNote = course.notes?.[activeModuleIndex] || "";
    setNoteText(savedNote);
  }, [activeModuleIndex, course.id]);

  const activeModule = modules[activeModuleIndex] || modules[0];
  const isCurrentCompleted = completedModules.includes(activeModuleIndex);

  const handleNoteChange = (e) => {
    const newText = e.target.value;
    setNoteText(newText);
    if (onSaveNote) {
      onSaveNote(course.id, activeModuleIndex, newText);
      setNoteSavedNotice(true);
      setTimeout(() => setNoteSavedNotice(false), 1500);
    }
  };

  const handleToggleCurrent = () => {
    if (onToggleModuleComplete) {
      onToggleModuleComplete(course.id, activeModuleIndex);
    }
  };

  const hasPrevious = activeModuleIndex > 0;
  const hasNext = activeModuleIndex < modules.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) setActiveModuleIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (hasNext) setActiveModuleIndex((prev) => prev + 1);
  };

  return (
    <>
      {onBack && (
        <button className="back-link" onClick={onBack}>
          <Icon name="ArrowLeft" size={15} /> Back to My Courses
        </button>
      )}

      <PageHead kicker="CURRENT LEARNING PATHWAY" title={course.title}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="pill">{course.area}</span>
          <span className="pill" style={{ background: "#e0e7d9", color: "var(--green)" }}>
            {course.progress}% Completed
          </span>
        </div>
      </PageHead>

      <div className="learning-layout">
        {/* Module Sidebar */}
        <aside className="module-panel">
          <p className="eyebrow">COURSE MODULES ({modules.length})</p>
          {modules.map((m, i) => {
            const isDone = completedModules.includes(i);
            const isActive = i === activeModuleIndex;
            return (
              <button
                key={m.id || i}
                className={`${isActive ? "active" : ""} ${isDone ? "completed" : ""}`}
                onClick={() => setActiveModuleIndex(i)}
                style={{
                  background: isActive ? "#dedacb" : undefined,
                  borderLeft: isDone ? "3px solid var(--green)" : isActive ? "3px solid var(--orange)" : undefined,
                }}
              >
                <span>
                  {isDone ? <Icon name="Check" size={14} /> : String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div style={{ fontWeight: isActive ? 600 : 400 }}>{m.title}</div>
                  <small style={{ color: isDone ? "var(--green)" : "var(--muted)" }}>
                    {isDone ? "Completed ✓" : isActive ? "Now playing" : m.duration}
                  </small>
                </div>
              </button>
            );
          })}
        </aside>

        {/* Video & Lesson Content */}
        <section className="lesson">
          {activeModule?.youtubeId ? (
            <div>
              <div className="video-wrapper">
                <iframe
                  className="video-iframe"
                  src={`https://www.youtube.com/embed/${activeModule.youtubeId}?rel=0&modestbranding=1`}
                  title={activeModule.title}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -14, marginBottom: 18 }}>
                <a
                  href={`https://www.youtube.com/watch?v=${activeModule.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-button"
                  style={{ fontSize: 12, display: "inline-flex", alignItems: "center", gap: 5 }}
                >
                  Watch directly on YouTube <Icon name="ExternalLink" size={13} />
                </a>
              </div>
            </div>
          ) : (
            <div className="video">
              <Icon name="Play" size={32} />
              <span>{activeModule?.duration || "Lesson Preview"}</span>
            </div>
          )}

          <p className="eyebrow">
            MODULE {String(activeModuleIndex + 1).padStart(2, "0")} · LESSON {String(activeModuleIndex + 1).padStart(2, "0")} ({activeModule?.duration || "15 min"})
          </p>
          <h2>{activeModule?.title}</h2>
          <p>
            {activeModule?.summary ||
              "Watch this interactive video lesson to build essential role capabilities and practical workplace behaviors."}
          </p>

          <div className="lesson-actions">
            <button
              className="text-button"
              onClick={handlePrevious}
              disabled={!hasPrevious}
              style={{ opacity: hasPrevious ? 1 : 0.4, cursor: hasPrevious ? "pointer" : "default" }}
            >
              ← Previous lesson
            </button>

            <button
              className={`button ${isCurrentCompleted ? "completed-btn" : "warm"}`}
              onClick={handleToggleCurrent}
            >
              {isCurrentCompleted ? (
                <>
                  Completed <Icon name="Check" size={16} />
                </>
              ) : (
                <>
                  Mark complete <Icon name="Check" size={16} />
                </>
              )}
            </button>

            <button
              className="text-button"
              onClick={handleNext}
              disabled={!hasNext}
              style={{ opacity: hasNext ? 1 : 0.4, cursor: hasNext ? "pointer" : "default" }}
            >
              Next lesson →
            </button>
          </div>
        </section>

        {/* Progress, Resources & Notes Panel */}
        <aside className="resource-panel">
          <p className="eyebrow">YOUR PROGRESS</p>
          <b>{course.progress}%</b>
          <div className="bar" style={{ marginTop: 8, marginBottom: 8 }}>
            <i style={{ width: `${course.progress}%` }} />
          </div>
          <small style={{ fontSize: 11, color: "var(--muted)" }}>
            {completedModules.length} of {modules.length} lessons completed
          </small>

          <hr />

          <p className="eyebrow">LESSON RESOURCES</p>
          {activeModule?.resources && activeModule.resources.length > 0 ? (
            activeModule.resources.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <Icon name="ExternalLink" size={13} /> {r.title}
              </a>
            ))
          ) : (
            <small style={{ color: "var(--muted)", fontSize: 12 }}>
              Standard course reference materials provided inside video.
            </small>
          )}

          <hr />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p className="eyebrow" style={{ margin: 0 }}>PERSONAL NOTES</p>
            {noteSavedNotice && <span className="notes-status">Saved ✓</span>}
          </div>
          <textarea
            placeholder="Type your notes for this lesson here… (auto-saves)"
            value={noteText}
            onChange={handleNoteChange}
            style={{ marginTop: 8 }}
          />
        </aside>
      </div>
    </>
  );
}
