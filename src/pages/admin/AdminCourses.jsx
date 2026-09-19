import { useState, useMemo } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { Metric } from "../../components/Metric";
import { getAllCatalogCourses, saveCourseStatus } from "../../data/courses";
import { CourseMediaModal } from "../../components/CourseMediaModal";

export function AdminCourses({ setPage, onSelectCourse }) {
  const [courses, setCourses] = useState(() => getAllCatalogCourses());

  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [notice, setNotice] = useState("");
  const [mediaModalCourse, setMediaModalCourse] = useState(null);
  const [mediaInitialModuleIndex, setMediaInitialModuleIndex] = useState(0);

  const areas = useMemo(() => {
    const list = ["all"];
    courses.forEach((c) => {
      if (!list.includes(c.area)) list.push(c.area);
    });
    return list;
  }, [courses]);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        (c.trainer || "").toLowerCase().includes(search.toLowerCase()) ||
        c.area.toLowerCase().includes(search.toLowerCase());
      const matchArea = selectedArea === "all" || c.area === selectedArea;
      return matchSearch && matchArea;
    });
  }, [courses, search, selectedArea]);

  const toggleStatus = (id) => {
    const target = courses.find((c) => c.id === id);
    const current = target?.status || "Published";
    const next = current === "Published" ? "Archived" : "Published";
    saveCourseStatus(id, next);
    setCourses(getAllCatalogCourses());
    setNotice(`Curriculum status updated to ${next} across all workspaces.`);
    setTimeout(() => setNotice(""), 3000);
  };

  const handleExportCSV = () => {
    const headers = ["Course Title", "Track Area", "Level", "Duration", "Lead Facilitator", "Modules Count", "Status"];
    const rows = courses.map((c) => [
      `"${c.title}"`,
      `"${c.area}"`,
      `"${c.level}"`,
      `"${c.duration}"`,
      `"${c.trainer}"`,
      c.modules?.length || 0,
      `"${statusMap[c.id] || "Published"}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "Capacity_Connect_Enterprise_Courses_Catalog.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">CURRICULUM GOVERNANCE</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Enterprise Course Catalog</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button outline" onClick={handleExportCSV} title="Export course catalog to CSV">
            <Icon name="Download" size={15} /> Export Catalog
          </button>
          <button
            className="button dark"
            onClick={() => {
              setNotice("Curriculum authoring studio opened in Trainer workspace.");
              setTimeout(() => setNotice(""), 3000);
            }}
            style={{ gap: 6 }}
          >
            <Icon name="PlusCircle" size={15} /> Add Curriculum
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Enterprise-wide governance for accredited competency tracks, modular lesson outlines, trainer assignments, and organization enrollment policies.
      </p>

      {notice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <Metric value={courses.length.toString()} label="Accredited Tracks" detail="Standardized syllabus" />
        <Metric value="1,248" label="Enrolled Learners" detail="Across 5 departments" />
        <Metric value="86.4%" label="Average Completion" detail="+4.2% YoY velocity" />
        <Metric value="42" label="Certified Batches" detail="Audited credentials" />
      </div>

      {/* Filters Bar */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "16px 20px", borderRadius: 10, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 260 }}>
          <Icon name="Search" size={16} style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="Search courses, tracks, or facilitators..."
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

      {/* Course Cards */}
      <div style={{ display: "grid", gap: 18 }}>
        {filtered.map((c) => {
          const status = c.status || "Published";
          const isExpanded = expandedId === c.id;

          return (
            <div
              key={c.id || c.title}
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
                    <span className="pill">{c.area}</span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 3,
                        background: status === "Published" ? "#edf7ef" : "#fdf2e9",
                        color: status === "Published" ? "var(--green)" : "var(--orange)",
                      }}
                    >
                      {status}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>Level: <b>{c.level}</b></span>
                  </div>

                  <h3 style={{ fontSize: "1.35rem", margin: "0 0 6px", color: "var(--ink)" }}>{c.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5, margin: "0 0 14px", maxWidth: 720 }}>
                    {c.overview || c.reason}
                  </p>

                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--muted)", flexWrap: "wrap" }}>
                    <span><Icon name="Clock" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> {c.duration}</span>
                    <span><Icon name="Layers" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> {c.modules?.length || 0} Lessons</span>
                    <span><Icon name="UserRound" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> Lead Facilitator: <b>{c.trainer}</b></span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    className="button dark"
                    style={{ height: 34, fontSize: 12, gap: 5 }}
                    onClick={() => {
                      setMediaModalCourse(c);
                      setMediaInitialModuleIndex(0);
                    }}
                    title="Open professional media inspector to review videos and audit streams"
                  >
                    <Icon name="Video" size={14} /> Review Media
                  </button>

                  <button
                    className="button outline"
                    style={{ height: 34, fontSize: 12, gap: 5 }}
                    onClick={() => {
                      if (onSelectCourse) onSelectCourse(c.id, "Course Details");
                    }}
                    title="Preview course syllabus and video player as a learner"
                  >
                    <Icon name="PlayCircle" size={14} /> Learner Preview
                  </button>

                  <button
                    className="button outline"
                    style={{ height: 34, fontSize: 12, gap: 5 }}
                    onClick={() => setExpandedId(isExpanded ? null : c.id)}
                  >
                    <Icon name={isExpanded ? "ChevronUp" : "List"} size={14} />
                    {isExpanded ? "Hide Syllabus" : "Inspect Syllabus"}
                  </button>

                  <button
                    className="button outline"
                    style={{ height: 34, fontSize: 12, gap: 5 }}
                    onClick={() => toggleStatus(c.id)}
                  >
                    <Icon name={status === "Published" ? "Archive" : "Check"} size={14} />
                    {status === "Published" ? "Archive Track" : "Activate"}
                  </button>
                </div>
              </div>

              {/* Expanded Syllabus Outline */}
              {isExpanded && (
                <div style={{ marginTop: 20, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
                  <b style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", display: "block", marginBottom: 12 }}>
                    STANDARDIZED SYLLABUS ({c.modules?.length || 0} LESSONS)
                  </b>

                  <div style={{ display: "grid", gap: 10 }}>
                    {(c.modules || []).map((mod, idx) => (
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
                              ID: {mod.youtubeId}
                            </span>
                          )}
                          <button
                            type="button"
                            className="button outline"
                            style={{ height: 26, fontSize: 11, gap: 4, padding: "0 8px" }}
                            onClick={() => {
                              setMediaModalCourse(c);
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
