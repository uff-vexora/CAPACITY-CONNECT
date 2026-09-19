import { useState, useMemo } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { getAllCatalogCourses, saveCourseStatus } from "../../data/courses";
import { CourseMediaModal } from "../../components/CourseMediaModal";

export function Courses({ setPage, onSelectCourse }) {
  // Load full catalog with custom courses and shared statuses
  const [courseList, setCourseList] = useState(() => getAllCatalogCourses());

  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [notice, setNotice] = useState("");
  const [mediaModalCourse, setMediaModalCourse] = useState(null);
  const [mediaInitialModuleIndex, setMediaInitialModuleIndex] = useState(0);

  const areas = useMemo(() => {
    const set = new Set(courseList.map((c) => c.area));
    return ["all", ...Array.from(set)];
  }, [courseList]);

  const filtered = useMemo(() => {
    return courseList.filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || (c.trainer || "").toLowerCase().includes(search.toLowerCase());
      const matchArea = selectedArea === "all" || c.area === selectedArea;
      return matchSearch && matchArea;
    });
  }, [courseList, search, selectedArea]);

  const toggleStatus = (courseId) => {
    const currentCourse = courseList.find((c) => c.id === courseId);
    const current = currentCourse?.status || "Published";
    const next = current === "Published" ? "Draft" : "Published";
    saveCourseStatus(courseId, next);
    setCourseList(getAllCatalogCourses());
    setNotice(`Course marked as ${next} across all workspaces.`);
    setTimeout(() => setNotice(""), 3000);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">INSTRUCTOR CATALOG</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Curriculum &amp; Course Management</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            className="button dark"
            onClick={() => setPage("Create Course")}
            style={{ gap: 6 }}
          >
            <Icon name="Plus" size={16} /> Create New Course
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Review active organizational curriculums, inspect modular video syllabus, adjust publication statuses, and configure benchmark modules.
      </p>

      {notice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* Filter and Search */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "16px 20px", borderRadius: 10, marginBottom: 26, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 260 }}>
          <Icon name="Search" size={16} style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="Search course title or trainer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13, outline: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {areas.map((a) => (
            <button
              key={a}
              type="button"
              className={`pill ${selectedArea === a ? "selected" : ""}`}
              onClick={() => setSelectedArea(a)}
              style={{
                cursor: "pointer",
                border: "1px solid var(--line)",
                background: selectedArea === a ? "var(--ink)" : "var(--paper)",
                color: selectedArea === a ? "#fff" : "var(--ink)",
                padding: "6px 12px",
              }}
            >
              {a === "all" ? "All Tracks" : a}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Cards */}
      <div style={{ display: "grid", gap: 18 }}>
        {filtered.map((course) => {
          const status = course.status || "Published";
          const isExpanded = expandedCourseId === course.id;
          const isPublished = status === "Published";

          return (
            <div
              key={course.id || course.title}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: 24,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
                <div style={{ flex: 1, minWidth: 280 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span className="pill">{course.area}</span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 3,
                        background: isPublished ? "#edf7ef" : "#f5f5f0",
                        color: isPublished ? "var(--green)" : "var(--muted)",
                      }}
                    >
                      {status}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>Level: <b>{course.level}</b></span>
                  </div>

                  <h3 style={{ fontSize: "1.35rem", margin: "0 0 6px", color: "var(--ink)" }}>{course.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5, margin: "0 0 14px", maxWidth: 720 }}>
                    {course.overview || course.reason}
                  </p>

                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--muted)", flexWrap: "wrap" }}>
                    <span><Icon name="Clock" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> {course.duration}</span>
                    <span><Icon name="Layers" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> {course.modules?.length || 0} Modules</span>
                    <span><Icon name="UserRound" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> Facilitator: <b>{course.trainer}</b></span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    className="button dark"
                    style={{ height: 34, fontSize: 12, gap: 5 }}
                    onClick={() => {
                      setMediaModalCourse(course);
                      setMediaInitialModuleIndex(0);
                    }}
                    title="Open professional video inspector and media quality review studio"
                  >
                    <Icon name="Video" size={14} /> Review Media
                  </button>

                  <button
                    className="button outline"
                    style={{ height: 34, fontSize: 12, gap: 5 }}
                    onClick={() => {
                      if (onSelectCourse) {
                        onSelectCourse(course.id, "Course Details");
                      }
                    }}
                    title="Preview course video player and lessons as a trainee"
                  >
                    <Icon name="PlayCircle" size={14} /> Learner Preview
                  </button>

                  <button
                    className="button outline"
                    style={{ height: 34, fontSize: 12, gap: 5 }}
                    onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                  >
                    <Icon name={isExpanded ? "ChevronUp" : "List"} size={14} />
                    {isExpanded ? "Hide Modules" : "Inspect Syllabus"}
                  </button>

                  <button
                    className="button outline"
                    style={{ height: 34, fontSize: 12, gap: 5 }}
                    onClick={() => toggleStatus(course.id)}
                  >
                    <Icon name={isPublished ? "EyeOff" : "Eye"} size={14} />
                    {isPublished ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    className="button outline"
                    style={{ height: 34, fontSize: 12, gap: 5 }}
                    onClick={() => setPage && setPage("Assessments")}
                  >
                    <Icon name="ClipboardCheck" size={14} /> View Assessment
                  </button>
                </div>
              </div>

              {/* Expanded Syllabus Outline */}
              {isExpanded && (
                <div style={{ marginTop: 20, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <b style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
                      CURRICULUM SYLLABUS ({course.modules?.length || 0} LESSONS)
                    </b>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    {(course.modules || []).map((mod, idx) => (
                      <div
                        key={mod.id || idx}
                        style={{
                          background: "#faf9f4",
                          border: "1px solid #e7e5dc",
                          borderRadius: 6,
                          padding: "12px 16px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 12,
                          flexWrap: "wrap",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ font: "700 11px 'DM Mono'", width: 22, height: 22, borderRadius: 3, background: "#eae7de", display: "grid", placeItems: "center" }}>
                            {idx + 1}
                          </span>
                          <div>
                            <b style={{ fontSize: 13, color: "var(--ink)" }}>{mod.title}</b>
                            <small style={{ color: "var(--muted)", display: "block", marginTop: 2 }}>{mod.summary}</small>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 11, color: "var(--muted)" }}>{mod.duration || "15 min"}</span>
                          {mod.youtubeId && (
                            <span style={{ fontSize: 10, font: "600 10px 'DM Mono'", color: "var(--green)", background: "#edf7ef", padding: "2px 6px", borderRadius: 3 }}>
                              YouTube: {mod.youtubeId}
                            </span>
                          )}
                          <button
                            type="button"
                            className="button outline"
                            style={{ height: 26, fontSize: 11, gap: 4, padding: "0 8px" }}
                            onClick={() => {
                              setMediaModalCourse(course);
                              setMediaInitialModuleIndex(idx);
                            }}
                            title="Preview this video in media inspector"
                          >
                            <Icon name="Play" size={11} /> Play
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {mediaModalCourse && (
        <CourseMediaModal
          course={mediaModalCourse}
          initialModuleIndex={mediaInitialModuleIndex}
          onClose={() => setMediaModalCourse(null)}
        />
      )}
    </>
  );
}
