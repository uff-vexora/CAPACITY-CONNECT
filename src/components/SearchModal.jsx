import { useState, useEffect, useMemo, useRef } from "react";
import { AppIcon as Icon } from "./AppIcon";
import { INITIAL_COURSES } from "../data/courses";

export function SearchModal({ isOpen, onClose, setPage }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent toggles
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Build searchable index
  const allSearchableItems = useMemo(() => {
    const items = [];

    // Platform Pages
    const pages = [
      { id: "page-dash", title: "Dashboard", subtitle: "Trainee overview, readiness ring, priority gaps", category: "Workspace Pages", icon: "LayoutDashboard", type: "page", page: "Dashboard" },
      { id: "page-courses", title: "My Courses", subtitle: "Active enrolled pathways and lesson progress", category: "Workspace Pages", icon: "BookOpen", type: "page", page: "My Courses" },
      { id: "page-rec", title: "Recommended Courses", subtitle: "Curated learning pathways based on skill gap benchmarks", category: "Workspace Pages", icon: "Sparkles", type: "page", page: "Recommended" },
      { id: "page-gap", title: "Skill Gap Analysis", subtitle: "Detailed breakdown of assessed readiness vs target benchmarks", category: "Workspace Pages", icon: "ScanSearch", type: "page", page: "Skill Gap" },
      { id: "page-assess", title: "Competency Assessment", subtitle: "Role competency evaluation questionnaire", category: "Workspace Pages", icon: "ClipboardCheck", type: "page", page: "Assessment" },
      { id: "page-prog", title: "Progress Analytics", subtitle: "Capability measured over time, completed hours", category: "Workspace Pages", icon: "TrendingUp", type: "page", page: "Progress" },
      { id: "page-cert", title: "Certificates", subtitle: "Official credentials earned for completed pathways", category: "Workspace Pages", icon: "Award", type: "page", page: "Certificates" },
      { id: "page-notif", title: "Notifications", subtitle: "Activity center, course alerts, milestone notices", category: "Workspace Pages", icon: "Bell", type: "page", page: "Notifications" },
      { id: "page-prof", title: "My Profile", subtitle: "View and edit personal details, qualifications, competencies", category: "Workspace Pages", icon: "UserRound", type: "page", page: "My Profile" },
      { id: "page-set", title: "Settings", subtitle: "Learning preferences, video playback speed, password, data export", category: "Workspace Pages", icon: "Settings", type: "page", page: "Settings" },
    ];
    items.push(...pages);

    // Courses & Modules
    for (const c of INITIAL_COURSES) {
      items.push({
        id: `course-${c.id}`,
        title: c.title,
        subtitle: `${c.area} · ${c.trainer} · ${c.duration} (${c.modules.length} lessons)`,
        category: "Courses",
        icon: "BookOpen",
        type: "course",
        courseId: c.id,
        targetPage: "Course Details",
      });

      // Modules inside course
      for (const [idx, m] of c.modules.entries()) {
        items.push({
          id: `mod-${c.id}-${m.id}`,
          title: m.title,
          subtitle: `Lesson in ${c.title} (${m.duration})`,
          category: "Lessons & Video Modules",
          icon: "Play",
          type: "lesson",
          courseId: c.id,
          moduleIndex: idx,
          targetPage: "Learning",
        });
      }
    }

    return items;
  }, []);

  // Filtered results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default suggested items
      return [
        allSearchableItems.find((i) => i.title === "My Courses"),
        allSearchableItems.find((i) => i.title === "Leadership Essentials"),
        allSearchableItems.find((i) => i.title === "Generative AI & Prompt Engineering for Work"),
        allSearchableItems.find((i) => i.title === "Competency Assessment"),
        allSearchableItems.find((i) => i.title === "Settings"),
      ].filter(Boolean);
    }

    return allSearchableItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSub = item.subtitle?.toLowerCase().includes(q);
      const matchCat = item.category?.toLowerCase().includes(q);
      return matchTitle || matchSub || matchCat;
    });
  }, [query, allSearchableItems]);

  if (!isOpen) return null;

  const handleSelect = (item) => {
    onClose();
    if (item.type === "course" || item.type === "lesson") {
      try {
        localStorage.setItem("capacity_selected_course", item.courseId);
      } catch (e) {
        console.error(e);
      }
      setPage(item.targetPage || "Course Details");
    } else if (item.type === "page") {
      setPage(item.page);
    }
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* Input Bar */}
        <div className="search-input-wrap">
          <Icon name="Search" size={18} style={{ color: "var(--muted)", flex: "none" }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search courses, lessons, topics, or pages… (e.g. Leadership, SQL, Settings)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ color: "var(--muted)", padding: 4, cursor: "pointer" }}
              title="Clear search"
            >
              <Icon name="X" size={15} />
            </button>
          )}
          <span
            style={{
              fontSize: 10,
              fontFamily: "DM Mono, monospace",
              background: "#eae7dd",
              padding: "2px 6px",
              borderRadius: 3,
              color: "var(--muted)",
            }}
          >
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="search-results-list">
          <div className="search-group-title">
            {!query.trim() ? "SUGGESTED QUICK ACTIONS" : `RESULTS (${results.length})`}
          </div>

          {results.length > 0 ? (
            results.map((item) => (
              <button
                key={item.id}
                className="search-result-item"
                onClick={() => handleSelect(item)}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 4,
                    background: item.type === "lesson" ? "#f4ece1" : item.type === "course" ? "#e1e9db" : "#ecebe4",
                    color: item.type === "lesson" ? "var(--orange)" : item.type === "course" ? "var(--green)" : "var(--ink)",
                    display: "grid",
                    placeItems: "center",
                    flex: "none",
                  }}
                >
                  <Icon name={item.icon} size={15} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <b style={{ fontSize: 13, color: "var(--ink)" }}>{item.title}</b>
                    <span
                      style={{
                        fontSize: 9,
                        fontFamily: "DM Mono, monospace",
                        background: "#ece9df",
                        padding: "1px 5px",
                        color: "var(--muted)",
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <small style={{ fontSize: 11, color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.subtitle}
                  </small>
                </div>

                <Icon name="ChevronRight" size={14} style={{ color: "var(--muted)", flex: "none" }} />
              </button>
            ))
          ) : (
            <div style={{ padding: "35px 20px", textAlign: "center", color: "var(--muted)" }}>
              <Icon name="SearchX" size={28} style={{ marginBottom: 8, opacity: 0.5 }} />
              <p style={{ margin: "0 0 4px", fontSize: 14, color: "var(--ink)", fontWeight: 500 }}>
                No results found for "{query}"
              </p>
              <small>Try searching for "Leadership", "Communication", "Python", or "Assessment".</small>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid var(--line)",
            padding: "9px 20px",
            background: "#faf9f4",
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "var(--muted)",
          }}
        >
          <span>Tip: Click any course or lesson to jump directly to it</span>
          <span><b>ESC</b> to close</span>
        </div>
      </div>
    </div>
  );
}
