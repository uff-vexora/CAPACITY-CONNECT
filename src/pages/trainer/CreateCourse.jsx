import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";

export function CourseForm({ setPage }) {
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("Leadership");
  const [level, setLevel] = useState("Intermediate");
  const [duration, setDuration] = useState("4 weeks");
  const [trainer, setTrainer] = useState("Anita Verma");
  const [overview, setOverview] = useState("");
  const [outcomes, setOutcomes] = useState("");

  const [modules, setModules] = useState([
    {
      id: "mod-1",
      title: "Foundations & Executive Context",
      duration: "15 min",
      youtubeId: "u4ZoJKF_VuA",
      summary: "Overview of core methodologies and practical workplace frameworks.",
    },
    {
      id: "mod-2",
      title: "Tactical Execution & Implementation",
      duration: "18 min",
      youtubeId: "rDkXwTuBsXY",
      summary: "Applying principles to real enterprise workflows and team deliverables.",
    },
  ]);

  const [notice, setNotice] = useState("");

  const handleAddModule = () => {
    setModules((prev) => [
      ...prev,
      {
        id: `mod-${prev.length + 1}`,
        title: `Module ${prev.length + 1}: Practical Application`,
        duration: "15 min",
        youtubeId: "aircAruvnKk",
        summary: "Hands-on guided application and exercise review.",
      },
    ]);
  };

  const handleRemoveModule = (idx) => {
    if (modules.length <= 1) return;
    setModules((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleModuleChange = (idx, field, value) => {
    setModules((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !overview.trim()) {
      alert("Please fill in course title and description.");
      return;
    }

    const courseId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const newCourse = {
      id: courseId || `course-${Date.now()}`,
      title: title.trim(),
      area,
      level,
      duration,
      trainer,
      progress: 0,
      enrolled: false,
      reason: `Built to address identified ${area.toLowerCase()} gaps in your profile.`,
      overview: overview.trim(),
      outcomes: outcomes.trim() ? outcomes.split("\n").filter((l) => l.trim()) : [
        "Master foundational competencies aligned with capability standards.",
        "Apply tactical frameworks directly to day-to-day deliverables.",
        "Complete hands-on video modules and verified assessments.",
      ],
      modules: modules.map((m, i) => ({
        id: i + 1,
        title: m.title,
        duration: m.duration,
        youtubeId: m.youtubeId || "u4ZoJKF_VuA",
        summary: m.summary,
        resources: [{ title: "Curriculum Reference Guide", url: "#" }],
      })),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("capacity_custom_courses") || "[]");
      existing.unshift(newCourse);
      localStorage.setItem("capacity_custom_courses", JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setNotice(`Successfully published "${newCourse.title}"! Redirecting to catalog...`);
    setTimeout(() => {
      if (setPage) setPage("Courses");
    }, 1200);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">COURSE CREATION STUDIO</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Build Targeted Learning Program</h1>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {setPage && (
            <button className="button outline" onClick={() => setPage("Courses")}>
              ← Back to Catalog
            </button>
          )}
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Design a structured curriculum pathway with verified video modules, learning outcomes, and assessment alignment.
      </p>

      {notice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "14px 20px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="CheckCircle2" size={18} />
          <b>{notice}</b>
        </div>
      )}

      <form className="course-form" onSubmit={handleSubmit} style={{ maxWidth: 900, borderRadius: 10 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600 }}>Course Title</label>
          <input
            required
            placeholder="e.g. Cross-Functional Strategic Alignment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600 }}>Competency Area</label>
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option>Leadership</option>
            <option>Communication</option>
            <option>Technical Skills</option>
            <option>Data &amp; Operations</option>
            <option>Delivery &amp; Agile</option>
            <option>AI &amp; Innovation</option>
            <option>Safety &amp; Compliance</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600 }}>Curriculum Level</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option>Foundation</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600 }}>Duration</label>
          <input
            placeholder="e.g. 4 weeks"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="full">
          <label style={{ fontSize: 12, fontWeight: 600 }}>Lead Facilitator / Trainer</label>
          <input
            placeholder="e.g. Anita Verma"
            value={trainer}
            onChange={(e) => setTrainer(e.target.value)}
          />
        </div>

        <div className="full">
          <label style={{ fontSize: 12, fontWeight: 600 }}>Course Overview &amp; Capability Focus</label>
          <textarea
            required
            placeholder="Describe the competency outcomes and why this curriculum was designed..."
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            style={{ minHeight: 90 }}
          />
        </div>

        <div className="full">
          <label style={{ fontSize: 12, fontWeight: 600 }}>Learning Outcomes (1 per line)</label>
          <textarea
            placeholder="Master cross-team negotiation protocols...&#10;Implement objective feedback frameworks...&#10;Lead continuous delivery cycles..."
            value={outcomes}
            onChange={(e) => setOutcomes(e.target.value)}
            style={{ minHeight: 85 }}
          />
        </div>

        {/* Interactive Module Builder */}
        <div className="full modules-editor" style={{ borderTop: "1px solid var(--line)", paddingTop: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <b style={{ fontSize: 15 }}>Curriculum Video Modules ({modules.length})</b>
              <small style={{ color: "var(--muted)" }}>Each module features a verified YouTube instructional video</small>
            </div>
            <button type="button" className="button outline" onClick={handleAddModule} style={{ height: 32, fontSize: 12, gap: 5 }}>
              <Icon name="Plus" size={14} /> Add Module
            </button>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {modules.map((mod, idx) => (
              <div
                key={mod.id || idx}
                style={{
                  background: "#faf9f4",
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                  padding: 16,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr auto",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 4 }}>
                    Module {idx + 1} Title
                  </label>
                  <input
                    type="text"
                    value={mod.title}
                    onChange={(e) => handleModuleChange(idx, "title", e.target.value)}
                    placeholder="Module title"
                    style={{ margin: 0, padding: 8, fontSize: 13 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 4 }}>
                    YouTube Video ID (11 chars)
                  </label>
                  <input
                    type="text"
                    value={mod.youtubeId}
                    onChange={(e) => handleModuleChange(idx, "youtubeId", e.target.value)}
                    placeholder="e.g. u4ZoJKF_VuA"
                    style={{ margin: 0, padding: 8, fontSize: 13 }}
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => handleRemoveModule(idx)}
                    disabled={modules.length <= 1}
                    style={{
                      color: modules.length <= 1 ? "#aaa" : "var(--rust)",
                      padding: 8,
                      cursor: modules.length <= 1 ? "not-allowed" : "pointer",
                      marginTop: 18,
                    }}
                    title="Remove module"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="full" style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 10 }}>
          {setPage && (
            <button type="button" className="button outline" onClick={() => setPage("Courses")}>
              Cancel
            </button>
          )}
          <button type="submit" className="button dark" style={{ gap: 8, padding: "10px 24px" }}>
            Publish Course to Catalog <Icon name="CheckCircle2" size={16} />
          </button>
        </div>
      </form>
    </>
  );
}
