import { useState, useMemo } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { Metric } from "../../components/Metric";

const DEFAULT_TRAINERS = [
  {
    id: "INST-01",
    name: "Anita Verma",
    email: "anita.verma@capacityconnect.org",
    role: "Senior Capability Architect & Lead Facilitator",
    domain: "Leadership & Decision-Making",
    activeCohorts: 4,
    traineesMentored: 218,
    rating: "4.92",
    status: "Active",
    coursesTaught: ["Leadership Essentials", "Advanced Team Management"],
    joinedDate: "15 Jan 2024",
  },
  {
    id: "INST-02",
    name: "Rohan Mehta",
    email: "rohan.mehta@capacityconnect.org",
    role: "Executive Communication & Alignment Coach",
    domain: "Workplace Communication",
    activeCohorts: 3,
    traineesMentored: 185,
    rating: "4.88",
    status: "Active",
    coursesTaught: ["Communication at Work"],
    joinedDate: "02 Mar 2024",
  },
  {
    id: "INST-03",
    name: "Vikram Singh",
    email: "vikram.singh@capacityconnect.org",
    role: "Senior Lean Six Sigma & Agile Master",
    domain: "Process Optimization & Agile",
    activeCohorts: 3,
    traineesMentored: 160,
    rating: "4.91",
    status: "Active",
    coursesTaught: ["Agile & Scrum Project Management"],
    joinedDate: "10 Jun 2024",
  },
  {
    id: "INST-04",
    name: "Priya Nair",
    email: "priya.nair@capacityconnect.org",
    role: "Director of Safety Operations & Audits",
    domain: "Operational Safety & Compliance",
    activeCohorts: 2,
    traineesMentored: 240,
    rating: "4.95",
    status: "Active",
    coursesTaught: ["Operational Safety Readiness"],
    joinedDate: "18 Aug 2023",
  },
  {
    id: "INST-05",
    name: "Dev Academy Faculty",
    email: "dev.academy@capacityconnect.org",
    role: "Technical Engineering Faculty Lead",
    domain: "Software Engineering & Cloud",
    activeCohorts: 2,
    traineesMentored: 210,
    rating: "4.86",
    status: "Active",
    coursesTaught: ["Full-Stack Web Development Foundations"],
    joinedDate: "12 Nov 2024",
  },
  {
    id: "INST-06",
    name: "AI Research Lab",
    email: "ai.lab@capacityconnect.org",
    role: "Applied AI & Automation Research Fellow",
    domain: "Generative AI & Automation",
    activeCohorts: 2,
    traineesMentored: 235,
    rating: "4.93",
    status: "Active",
    coursesTaught: ["Generative AI & Prompt Engineering for Work"],
    joinedDate: "05 Feb 2025",
  },
];

export function Trainers({ setPage }) {
  const [trainers, setTrainers] = useState(() => {
    try {
      const saved = localStorage.getItem("capacity_admin_trainers");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TRAINERS;
  });

  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [notice, setNotice] = useState("");

  // Form State
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Lead Instructor");
  const [newDomain, setNewDomain] = useState("Leadership & Decision-Making");
  const [newCourse, setNewCourse] = useState("Leadership Essentials");

  const domains = useMemo(() => {
    const list = ["all"];
    trainers.forEach((t) => {
      if (!list.includes(t.domain)) list.push(t.domain);
    });
    return list;
  }, [trainers]);

  const filtered = useMemo(() => {
    return trainers.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase()) ||
        t.domain.toLowerCase().includes(search.toLowerCase()) ||
        t.role.toLowerCase().includes(search.toLowerCase());
      const matchDomain = selectedDomain === "all" || t.domain === selectedDomain;
      return matchSearch && matchDomain;
    });
  }, [trainers, search, selectedDomain]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const created = {
      id: `INST-0${trainers.length + 1}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      domain: newDomain,
      activeCohorts: 1,
      traineesMentored: 0,
      rating: "5.0",
      status: "Active",
      coursesTaught: [newCourse],
      joinedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };

    const updated = [created, ...trainers];
    setTrainers(updated);
    try {
      localStorage.setItem("capacity_admin_trainers", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setShowAddModal(false);
    setNewName("");
    setNewEmail("");
    setNotice(`Added ${created.name} to enterprise instructor faculty!`);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Role", "Specialization Domain", "Active Cohorts", "Trainees Mentored", "Rating", "Courses Taught", "Status", "Joined Date"];
    const rows = trainers.map((t) => [
      `"${t.id}"`,
      `"${t.name}"`,
      `"${t.email}"`,
      `"${t.role}"`,
      `"${t.domain}"`,
      t.activeCohorts,
      t.traineesMentored,
      t.rating,
      `"${t.coursesTaught.join(", ")}"`,
      `"${t.status}"`,
      `"${t.joinedDate}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "Capacity_Connect_Enterprise_Trainers_Faculty.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">FACULTY &amp; INSTRUCTION MANAGEMENT</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Certified Trainers Directory</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button outline" onClick={handleExportCSV} title="Export faculty roster to CSV">
            <Icon name="Download" size={15} /> Export Roster
          </button>
          <button className="button dark" onClick={() => setShowAddModal(true)} style={{ gap: 6 }}>
            <Icon name="UserPlus" size={15} /> Add Instructor
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Oversee certified curriculum facilitators, monitor cohort teaching loads, audit learner evaluation ratings, and assign instructional responsibilities.
      </p>

      {notice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <Metric value={trainers.length.toString()} label="Active Faculty" detail="All credentials verified" />
        <Metric value="4.91 / 5.0" label="Avg. Learner Rating" detail="Based on 640 evaluations" />
        <Metric value="16" label="Assigned Cohorts" detail="Full curriculum coverage" />
        <Metric value="1,248" label="Workforce Reach" detail="Active learners guided" />
      </div>

      {/* Search & Filter Bar */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "16px 20px", borderRadius: 10, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 260 }}>
          <Icon name="Search" size={16} style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="Search trainers by name, domain, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13, outline: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {domains.map((d) => (
            <button
              key={d}
              type="button"
              className={`pill ${selectedDomain === d ? "selected" : ""}`}
              onClick={() => setSelectedDomain(d)}
              style={{
                cursor: "pointer",
                border: "1px solid var(--line)",
                background: selectedDomain === d ? "var(--ink)" : "var(--paper)",
                color: selectedDomain === d ? "#fff" : "var(--ink)",
                padding: "6px 12px",
              }}
            >
              {d === "all" ? "All Domains" : d}
            </button>
          ))}
        </div>
      </div>

      {/* Trainers Table */}
      <div className="table-wrap" style={{ borderRadius: 10 }}>
        <table>
          <thead>
            <tr>
              <th>INSTRUCTOR</th>
              <th>SPECIALIZATION &amp; ROLE</th>
              <th>COHORTS</th>
              <th>TRAINEES</th>
              <th>RATING</th>
              <th>STATUS</th>
              <th style={{ textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#d98045", color: "#fff", display: "grid", placeItems: "center", font: "700 13px 'DM Mono'", flexShrink: 0 }}>
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <b style={{ fontSize: 14 }}>{t.name}</b>
                      <small style={{ color: "var(--muted)", fontSize: 11 }}>{t.email}</small>
                    </div>
                  </div>
                </td>

                <td>
                  <div>
                    <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{t.domain}</span>
                    <small style={{ color: "var(--muted)", fontSize: 11 }}>{t.role}</small>
                  </div>
                </td>

                <td>
                  <span style={{ fontSize: 13, font: "600 12px 'DM Mono'" }}>{t.activeCohorts} Active</span>
                </td>

                <td>
                  <span style={{ fontSize: 13 }}>{t.traineesMentored}</span>
                </td>

                <td>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#b8702b" }}>
                    ★ {t.rating}
                  </span>
                </td>

                <td>
                  <span className="pill" style={{ background: "#edf7ef", color: "var(--green)", fontWeight: 600, fontSize: 11, padding: "2px 8px" }}>
                    {t.status}
                  </span>
                </td>

                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                    <button
                      className="button outline"
                      style={{ height: 30, fontSize: 11, padding: "0 10px", gap: 4 }}
                      onClick={() => setSelectedTrainer(t)}
                      title="Inspect instructor portfolio and courses"
                    >
                      <Icon name="Eye" size={12} /> Inspect
                    </button>
                    <button
                      className="button outline"
                      style={{ height: 30, fontSize: 11, padding: "0 10px", gap: 4 }}
                      onClick={() => {
                        setNotice(`Sent synchronization ping to ${t.name}.`);
                        setTimeout(() => setNotice(""), 3000);
                      }}
                    >
                      <Icon name="Send" size={12} /> Message
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspect Trainer Modal */}
      {selectedTrainer && (
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
          onClick={() => setSelectedTrainer(null)}
        >
          <div
            style={{
              width: "min(560px, 100%)",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 28,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#d98045", color: "#fff", display: "grid", placeItems: "center", font: "700 16px 'DM Mono'", flexShrink: 0 }}>
                  {selectedTrainer.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ margin: 0, fontSize: "1.4rem", color: "var(--ink)" }}>{selectedTrainer.name}</h3>
                    <span className="pill" style={{ background: "#edf7ef", color: "var(--green)", fontWeight: 600 }}>Active Faculty</span>
                  </div>
                  <small style={{ color: "var(--muted)", fontSize: 12 }}>{selectedTrainer.email} · ID: {selectedTrainer.id}</small>
                </div>
              </div>
              <button onClick={() => setSelectedTrainer(null)} style={{ cursor: "pointer", color: "var(--muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div style={{ background: "#faf8f2", border: "1px solid var(--line)", padding: "12px 14px", borderRadius: 8 }}>
                <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>ROLE &amp; DOMAIN</span>
                <b style={{ fontSize: 13, color: "var(--ink)" }}>{selectedTrainer.domain}</b>
                <small style={{ display: "block", color: "var(--muted)", fontSize: 11 }}>{selectedTrainer.role}</small>
              </div>

              <div style={{ background: "#faf8f2", border: "1px solid var(--line)", padding: "12px 14px", borderRadius: 8 }}>
                <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>FACULTY METRICS</span>
                <b style={{ fontSize: 13, color: "#b8702b" }}>★ {selectedTrainer.rating} Rating</b>
                <small style={{ display: "block", color: "var(--muted)", fontSize: 11 }}>
                  {selectedTrainer.activeCohorts} Active Cohorts · {selectedTrainer.traineesMentored} Trainees
                </small>
              </div>
            </div>

            <div style={{ background: "#fcfbf7", border: "1px solid var(--line)", borderRadius: 8, padding: 18, marginBottom: 20 }}>
              <b style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", display: "block", marginBottom: 10 }}>
                CURRICULUMS FACILITATED ({selectedTrainer.coursesTaught.length})
              </b>
              <div style={{ display: "grid", gap: 8 }}>
                {selectedTrainer.coursesTaught.map((c, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#faf9f4", borderRadius: 6, border: "1px solid #e7e5dc" }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}><Icon name="BookOpen" size={14} style={{ verticalAlign: "middle", marginRight: 6 }} /> {c}</span>
                    <span className="pill" style={{ fontSize: 10, padding: "2px 6px" }}>Core Track</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 16 }}>
              <small style={{ color: "var(--muted)" }}>Faculty Member since {selectedTrainer.joinedDate}</small>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="button outline" onClick={() => setSelectedTrainer(null)}>
                  Close
                </button>
                <button
                  type="button"
                  className="button dark"
                  style={{ gap: 6 }}
                  onClick={() => {
                    setNotice(`Assigned new cohort track to ${selectedTrainer.name}!`);
                    setTimeout(() => setNotice(""), 3500);
                    setSelectedTrainer(null);
                  }}
                >
                  <Icon name="Plus" size={14} /> Assign New Cohort
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Trainer Modal */}
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
              width: "min(520px, 100%)",
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 28,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>FACULTY EXPANSION</p>
                <h3 style={{ margin: "4px 0 0", fontSize: "1.4rem" }}>Onboard Certified Trainer</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} style={{ cursor: "pointer", color: "var(--muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Kavi Raman"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. kavi.r@capacityconnect.org"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Role Title</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Domain</label>
                  <select
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  >
                    <option value="Leadership & Decision-Making">Leadership &amp; Decision-Making</option>
                    <option value="Workplace Communication">Workplace Communication</option>
                    <option value="Process Optimization & Agile">Process Optimization &amp; Agile</option>
                    <option value="Operational Safety & Compliance">Operational Safety</option>
                    <option value="Software Engineering & Cloud">Software Engineering</option>
                    <option value="Generative AI & Automation">Generative AI</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Initial Curriculum Pathway</label>
                <input
                  type="text"
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button type="button" className="button outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="button dark" style={{ gap: 6 }}>
                  <Icon name="Check" size={15} /> Confirm Onboarding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
