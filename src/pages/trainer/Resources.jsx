import { useState, useMemo } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";

const DEFAULT_RESOURCES = [
  {
    id: "res-1",
    title: "Situation-Behavior-Impact (SBI) Feedback Framework Toolkit",
    category: "Framework",
    format: "PDF",
    fileSize: "2.4 MB",
    course: "Leadership Essentials",
    downloads: 142,
    dateAdded: "15 Jun 2026",
  },
  {
    id: "res-2",
    title: "DACI Decision-Making Matrix & Responsibility Template",
    category: "Template",
    format: "XLSX",
    fileSize: "1.1 MB",
    course: "Leadership Essentials",
    downloads: 98,
    dateAdded: "22 Jun 2026",
  },
  {
    id: "res-3",
    title: "Executive Bottom-Line-Up-Front (BLUF) Writing Playbook",
    category: "Guide",
    format: "PDF",
    fileSize: "3.8 MB",
    course: "Communication at Work",
    downloads: 185,
    dateAdded: "02 Jul 2026",
  },
  {
    id: "res-4",
    title: "Modern SQL Joins, Window Functions & Optimization Cheat Sheet",
    category: "Cheatsheet",
    format: "PDF",
    fileSize: "1.6 MB",
    course: "Data Analytics & SQL Mastery",
    downloads: 230,
    dateAdded: "18 Jul 2026",
  },
  {
    id: "res-5",
    title: "Sprint Planning & Backlog Refinement Facilitator Kit",
    category: "Toolkit",
    format: "DOCX",
    fileSize: "4.2 MB",
    course: "Agile & Scrum Project Management",
    downloads: 114,
    dateAdded: "04 Aug 2026",
  },
  {
    id: "res-6",
    title: "Enterprise Prompt Engineering Pattern Library & Safety Guidelines",
    category: "Guide",
    format: "PDF",
    fileSize: "2.9 MB",
    course: "Generative AI & Prompt Engineering for Work",
    downloads: 168,
    dateAdded: "12 Aug 2026",
  },
];

export function Resources({ setPage }) {
  const [resources, setResources] = useState(DEFAULT_RESOURCES);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState("");

  // Form
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Guide");
  const [newFormat, setNewFormat] = useState("PDF");
  const [newCourse, setNewCourse] = useState("Leadership Essentials");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.course.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === "all" || r.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [resources, search, selectedCategory]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const item = {
      id: `res-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      format: newFormat,
      fileSize: "1.8 MB",
      course: newCourse,
      downloads: 0,
      dateAdded: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };

    setResources((prev) => [item, ...prev]);
    setShowModal(false);
    setNewTitle("");
    setDownloadNotice(`Added "${item.title}" to repository.`);
    setTimeout(() => setDownloadNotice(""), 3500);
  };

  const handleSimulateDownload = (title) => {
    setDownloadNotice(`Downloading "${title}"...`);
    setTimeout(() => setDownloadNotice(""), 3000);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">CURRICULUM ASSETS</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Instructional Resources &amp; Toolkits</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button dark" onClick={() => setShowModal(true)} title="Upload or link new learning resource">
            <Icon name="PlusCircle" size={15} /> Add Resource
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Central repository for instructional frameworks, reference guides, cheatsheets, and exercise templates provided to cohort learners.
      </p>

      {downloadNotice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "16px 20px", borderRadius: 10, marginBottom: 26, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 260 }}>
          <Icon name="Search" size={16} style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="Search resources by title or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13, outline: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["all", "Framework", "Template", "Guide", "Cheatsheet", "Toolkit"].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`pill ${selectedCategory === cat ? "selected" : ""}`}
              onClick={() => setSelectedCategory(cat)}
              style={{
                cursor: "pointer",
                border: "1px solid var(--line)",
                background: selectedCategory === cat ? "var(--ink)" : "var(--paper)",
                color: selectedCategory === cat ? "#fff" : "var(--ink)",
                padding: "6px 12px",
              }}
            >
              {cat === "all" ? "All Formats" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
        {filtered.map((r) => (
          <div
            key={r.id}
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 22,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span
                  className="pill"
                  style={{
                    background: r.format === "PDF" ? "#faece6" : r.format === "XLSX" ? "#edf7ef" : "#edf1f7",
                    color: r.format === "PDF" ? "var(--rust)" : r.format === "XLSX" ? "var(--green)" : "#2c5282",
                    fontWeight: 700,
                  }}
                >
                  {r.format} · {r.fileSize}
                </span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>{r.downloads} downloads</span>
              </div>

              <h3 style={{ fontSize: "1.1rem", margin: "0 0 8px", color: "var(--ink)", lineHeight: 1.35 }}>{r.title}</h3>
              <small style={{ color: "var(--muted)", display: "block", marginBottom: 16 }}>
                Curriculum: <b>{r.course}</b>
              </small>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 14 }}>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>Added {r.dateAdded}</span>
              <button
                className="button dark"
                style={{ height: 32, fontSize: 12, gap: 5 }}
                onClick={() => handleSimulateDownload(r.title)}
              >
                <Icon name="Download" size={13} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Resource Modal */}
      {showModal && (
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
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              width: "min(500px, 100%)",
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 26,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>ASSET REPOSITORY</p>
                <h3 style={{ margin: "4px 0 0", fontSize: "1.4rem" }}>Add Instructional Resource</h3>
              </div>
              <button onClick={() => setShowModal(false)} style={{ cursor: "pointer", color: "var(--muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Resource Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Executive BLUF Playbook"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  >
                    <option value="Guide">Guide</option>
                    <option value="Framework">Framework</option>
                    <option value="Template">Template</option>
                    <option value="Cheatsheet">Cheatsheet</option>
                    <option value="Toolkit">Toolkit</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Format</label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="XLSX">Excel Spreadsheet</option>
                    <option value="DOCX">Word Document</option>
                    <option value="ZIP">Archive (ZIP)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Associated Curriculum</label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                >
                  <option value="Leadership Essentials">Leadership Essentials</option>
                  <option value="Communication at Work">Communication at Work</option>
                  <option value="Advanced Team Management">Advanced Team Management</option>
                  <option value="Data Analytics & SQL Mastery">Data Analytics &amp; SQL Mastery</option>
                  <option value="Agile & Scrum Project Management">Agile &amp; Scrum Project Management</option>
                  <option value="Full-Stack Web Development Foundations">Full-Stack Web Development Foundations</option>
                  <option value="Generative AI & Prompt Engineering for Work">Generative AI &amp; Prompt Engineering</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button type="button" className="button outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="button dark" style={{ gap: 6 }}>
                  <Icon name="Upload" size={15} /> Upload Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
