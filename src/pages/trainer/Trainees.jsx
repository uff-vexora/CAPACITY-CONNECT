import { useState, useMemo } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { INITIAL_COURSES } from "../../data/courses";

const INITIAL_TRAINEES = [
  {
    id: "TR-101",
    name: "Alex Morgan",
    email: "alex.morgan@capacityconnect.org",
    role: "Operations Associate",
    department: "Operations & Delivery",
    enrolledCourse: "Leadership Essentials",
    progress: 75,
    assessmentScore: 90,
    status: "Certified",
    statusTone: "green",
    joinedDate: "12 May 2026",
  },
  {
    id: "TR-102",
    name: "Sarah Chen",
    email: "sarah.chen@capacityconnect.org",
    role: "Junior Software Engineer",
    department: "Engineering & Tech",
    enrolledCourse: "Full-Stack Web Development Foundations",
    progress: 100,
    assessmentScore: 94,
    status: "Certified",
    statusTone: "green",
    joinedDate: "04 Jun 2026",
  },
  {
    id: "TR-103",
    name: "Rahul Sharma",
    email: "rahul.sharma@capacityconnect.org",
    role: "Process Coordinator",
    department: "Operations & Delivery",
    enrolledCourse: "Communication at Work",
    progress: 50,
    assessmentScore: 68,
    status: "In Progress",
    statusTone: "orange",
    joinedDate: "20 Jun 2026",
  },
  {
    id: "TR-104",
    name: "Maria Garcia",
    email: "maria.garcia@capacityconnect.org",
    role: "Data Specialist",
    department: "Analytics & Strategy",
    enrolledCourse: "Data Analytics & SQL Mastery",
    progress: 100,
    assessmentScore: 96,
    status: "Certified",
    statusTone: "green",
    joinedDate: "15 Jul 2026",
  },
  {
    id: "TR-105",
    name: "David Kim",
    email: "david.kim@capacityconnect.org",
    role: "Agile Project Associate",
    department: "Project Management",
    enrolledCourse: "Agile & Scrum Project Management",
    progress: 25,
    assessmentScore: 58,
    status: "Needs Focus",
    statusTone: "rust",
    joinedDate: "02 Aug 2026",
  },
  {
    id: "TR-106",
    name: "Anita Deshmukh",
    email: "anita.d@capacityconnect.org",
    role: "Solutions Analyst",
    department: "Engineering & Tech",
    enrolledCourse: "Generative AI & Prompt Engineering for Work",
    progress: 66,
    assessmentScore: 84,
    status: "In Progress",
    statusTone: "orange",
    joinedDate: "18 Aug 2026",
  },
];

export function Trainees({ setPage }) {
  const [trainees, setTrainees] = useState(INITIAL_TRAINEES);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [actionNotice, setActionNotice] = useState("");
  const [traineeFeedback, setTraineeFeedback] = useState("");

  // New trainee form
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Associate Specialist");
  const [newDept, setNewDept] = useState("Operations & Delivery");
  const [newCourse, setNewCourse] = useState("Leadership Essentials");

  const filteredTrainees = useMemo(() => {
    return trainees.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase()) ||
        t.role.toLowerCase().includes(search.toLowerCase());
      const matchDept = selectedDept === "all" || t.department === selectedDept;
      const matchStatus = selectedStatus === "all" || t.status === selectedStatus;
      return matchSearch && matchDept && matchStatus;
    });
  }, [trainees, search, selectedDept, selectedStatus]);

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const created = {
      id: `TR-${Math.floor(100 + Math.random() * 900)}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      department: newDept,
      enrolledCourse: newCourse,
      progress: 0,
      assessmentScore: 0,
      status: "In Progress",
      statusTone: "orange",
      joinedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };

    setTrainees((prev) => [created, ...prev]);
    setShowEnrollModal(false);
    setNewName("");
    setNewEmail("");
    setActionNotice(`Enrolled ${created.name} in ${created.enrolledCourse}!`);
    setTimeout(() => setActionNotice(""), 3500);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Role", "Department", "Enrolled Course", "Progress %", "Assessment Score %", "Status", "Joined Date"];
    const rows = trainees.map((t) => [
      `"${t.id}"`,
      `"${t.name}"`,
      `"${t.email}"`,
      `"${t.role}"`,
      `"${t.department}"`,
      `"${t.enrolledCourse}"`,
      `${t.progress}%`,
      `${t.assessmentScore}%`,
      `"${t.status}"`,
      `"${t.joinedDate}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "Capacity_Connect_Trainees_Cohort_Roster.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">COHORT MANAGEMENT</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Trainee Capability Directory</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button outline" onClick={handleExportCSV} title="Export roster to CSV">
            <Icon name="Download" size={15} /> Export Roster
          </button>
          <button className="button dark" onClick={() => setShowEnrollModal(true)} title="Enroll new trainee">
            <Icon name="UserPlus" size={15} /> Enroll Trainee
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Monitor trainee participation, modular course progress, verified assessment performance, and organizational competency attainment.
      </p>

      {actionNotice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Trainee KPI Summary */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <div className="metric">
          <b>{trainees.length}</b>
          <span>Total Trainees</span>
          <small>Active in current cohort</small>
        </div>
        <div className="metric">
          <b>{trainees.filter((t) => t.status === "Certified").length}</b>
          <span>Certified Credentials</span>
          <small>&gt;80% assessment score</small>
        </div>
        <div className="metric">
          <b>{Math.round(trainees.reduce((acc, t) => acc + t.progress, 0) / trainees.length)}%</b>
          <span>Avg. Pathway Progress</span>
          <small>Across active courses</small>
        </div>
        <div className="metric">
          <b>{trainees.filter((t) => t.status === "Needs Focus").length}</b>
          <span>Priority Interventions</span>
          <small>Targeted mentoring required</small>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "16px 20px", borderRadius: 10, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 260 }}>
          <Icon name="Search" size={16} style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="Search by trainee name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13, outline: "none" }}
          />
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
          >
            <option value="all">All Departments</option>
            <option value="Operations & Delivery">Operations &amp; Delivery</option>
            <option value="Engineering & Tech">Engineering &amp; Tech</option>
            <option value="Analytics & Strategy">Analytics &amp; Strategy</option>
            <option value="Project Management">Project Management</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
          >
            <option value="all">All Statuses</option>
            <option value="Certified">Certified (Passed)</option>
            <option value="In Progress">In Progress</option>
            <option value="Needs Focus">Needs Focus</option>
          </select>
        </div>
      </div>

      {/* Trainee Roster Table */}
      <div className="table-wrap" style={{ borderRadius: 10 }}>
        <table>
          <thead>
            <tr>
              <th>TRAINEE</th>
              <th>DEPARTMENT &amp; ROLE</th>
              <th>ENROLLED COURSE</th>
              <th>PROGRESS</th>
              <th>ASSESSMENT</th>
              <th>STATUS</th>
              <th style={{ textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainees.map((t) => (
              <tr key={t.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#d9a56b", color: "#222", display: "grid", placeItems: "center", font: "600 12px 'DM Mono'", flexShrink: 0 }}>
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
                    <span style={{ fontSize: 13, color: "var(--ink)" }}>{t.role}</span>
                    <small style={{ color: "var(--muted)", fontSize: 11 }}>{t.department}</small>
                  </div>
                </td>

                <td>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{t.enrolledCourse}</span>
                </td>

                <td>
                  <div style={{ width: 110 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                      <span>{t.progress}%</span>
                    </div>
                    <div className="bar" style={{ height: 5 }}>
                      <i style={{ width: `${t.progress}%`, background: t.progress === 100 ? "var(--green)" : "var(--orange)" }} />
                    </div>
                  </div>
                </td>

                <td>
                  <span style={{ fontSize: 13, fontWeight: 600, color: t.assessmentScore >= 80 ? "var(--green)" : t.assessmentScore >= 60 ? "var(--orange)" : "var(--rust)" }}>
                    {t.assessmentScore > 0 ? `${t.assessmentScore}%` : "Pending"}
                  </span>
                </td>

                <td>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "3px 8px",
                      borderRadius: 4,
                      background: t.statusTone === "green" ? "#edf7ef" : t.statusTone === "orange" ? "#fdf2e9" : "#fdeae3",
                      color: t.statusTone === "green" ? "#2d5e36" : t.statusTone === "orange" ? "#b85d3b" : "#9e3d1c",
                    }}
                  >
                    {t.status}
                  </span>
                </td>

                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                    <button
                      className="button outline"
                      style={{ height: 30, fontSize: 11, padding: "0 10px", gap: 4 }}
                      onClick={() => {
                        setSelectedTrainee(t);
                        setTraineeFeedback("");
                      }}
                      title="Inspect trainee profile, module progress, and grade"
                    >
                      <Icon name="Eye" size={12} /> Inspect
                    </button>
                    <button
                      className="button outline"
                      style={{ height: 30, fontSize: 11, padding: "0 10px", gap: 4 }}
                      onClick={() => {
                        setActionNotice(`Reminded ${t.name} regarding ${t.enrolledCourse} assignments.`);
                        setTimeout(() => setActionNotice(""), 3000);
                      }}
                    >
                      <Icon name="Send" size={12} /> Ping
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enroll Trainee Modal */}
      {showEnrollModal && (
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
          onClick={() => setShowEnrollModal(false)}
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
                <p className="eyebrow" style={{ margin: 0 }}>ENROLLMENT</p>
                <h3 style={{ margin: "4px 0 0", fontSize: "1.4rem" }}>Add Trainee to Cohort</h3>
              </div>
              <button onClick={() => setShowEnrollModal(false)} style={{ cursor: "pointer", color: "var(--muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Miller"
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
                  placeholder="e.g. jordan.m@capacityconnect.org"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Role</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  >
                    <option value="Operations & Delivery">Operations &amp; Delivery</option>
                    <option value="Engineering & Tech">Engineering &amp; Tech</option>
                    <option value="Analytics & Strategy">Analytics &amp; Strategy</option>
                    <option value="Project Management">Project Management</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Initial Curriculum Pathway</label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                >
                  {INITIAL_COURSES.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button type="button" className="button outline" onClick={() => setShowEnrollModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="button dark" style={{ gap: 6 }}>
                  <Icon name="Check" size={15} /> Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Trainee Details Modal */}
      {selectedTrainee && (
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
          onClick={() => setSelectedTrainee(null)}
        >
          <div
            style={{
              width: "min(620px, 100%)",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: 28,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    background: "#d9a56b",
                    color: "#222",
                    display: "grid",
                    placeItems: "center",
                    font: "700 15px 'DM Mono'",
                    flexShrink: 0,
                  }}
                >
                  {selectedTrainee.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ margin: 0, fontSize: "1.35rem", color: "var(--ink)" }}>{selectedTrainee.name}</h3>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 4,
                        background: selectedTrainee.statusTone === "green" ? "#edf7ef" : selectedTrainee.statusTone === "orange" ? "#fdf2e9" : "#fdeae3",
                        color: selectedTrainee.statusTone === "green" ? "#2d5e36" : selectedTrainee.statusTone === "orange" ? "#b85d3b" : "#9e3d1c",
                      }}
                    >
                      {selectedTrainee.status}
                    </span>
                  </div>
                  <small style={{ color: "var(--muted)", fontSize: 12 }}>
                    ID: <b>{selectedTrainee.id}</b> · {selectedTrainee.email}
                  </small>
                </div>
              </div>

              <button onClick={() => setSelectedTrainee(null)} style={{ cursor: "pointer", color: "var(--muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Profile Meta Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 20 }}>
              <div style={{ background: "#faf8f2", border: "1px solid var(--line)", padding: "12px 14px", borderRadius: 8 }}>
                <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>ROLE &amp; DEPT</span>
                <b style={{ fontSize: 13, color: "var(--ink)" }}>{selectedTrainee.role}</b>
                <small style={{ display: "block", color: "var(--muted)", fontSize: 11 }}>{selectedTrainee.department}</small>
              </div>

              <div style={{ background: "#faf8f2", border: "1px solid var(--line)", padding: "12px 14px", borderRadius: 8 }}>
                <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>CURRICULUM TRACK</span>
                <b style={{ fontSize: 13, color: "var(--ink)" }}>{selectedTrainee.enrolledCourse}</b>
                <small style={{ display: "block", color: "var(--muted)", fontSize: 11 }}>Joined: {selectedTrainee.joinedDate}</small>
              </div>

              <div style={{ background: "#faf8f2", border: "1px solid var(--line)", padding: "12px 14px", borderRadius: 8 }}>
                <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>EVALUATION SCORE</span>
                <b style={{ fontSize: 15, color: selectedTrainee.assessmentScore >= 80 ? "var(--green)" : selectedTrainee.assessmentScore >= 60 ? "var(--orange)" : "var(--rust)" }}>
                  {selectedTrainee.assessmentScore > 0 ? `${selectedTrainee.assessmentScore}%` : "Pending Attempt"}
                </b>
                <small style={{ display: "block", color: "var(--muted)", fontSize: 11 }}>
                  {selectedTrainee.assessmentScore >= 80 ? "Passed Benchmark (≥80%)" : "Needs Review"}
                </small>
              </div>
            </div>

            {/* Modular Progress Outline */}
            <div style={{ background: "#fcfbf7", border: "1px solid var(--line)", borderRadius: 8, padding: 18, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <b style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>
                  SYLLABUS PROGRESSION ({selectedTrainee.progress}%)
                </b>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{Math.round(selectedTrainee.progress / 25)} of 4 Lessons Completed</span>
              </div>

              <div className="bar" style={{ height: 6, marginBottom: 14 }}>
                <i style={{ width: `${selectedTrainee.progress}%`, background: selectedTrainee.progress === 100 ? "var(--green)" : "var(--orange)" }} />
              </div>

              <div style={{ display: "grid", gap: 8, fontSize: 12 }}>
                {[
                  { name: "Module 1: Principles & Frameworks", done: selectedTrainee.progress >= 25 },
                  { name: "Module 2: Real-World Case Studies & Scenarios", done: selectedTrainee.progress >= 50 },
                  { name: "Module 3: Cross-Team Alignment & Implementation", done: selectedTrainee.progress >= 75 },
                  { name: "Module 4: Diagnostic Assessment & Synthesis", done: selectedTrainee.progress === 100 },
                ].map((mod, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: mod.done ? "var(--ink)" : "var(--muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon name={mod.done ? "CheckCircle2" : "Circle"} size={14} style={{ color: mod.done ? "var(--green)" : "#bbb" }} />
                      {mod.name}
                    </span>
                    <span style={{ font: "500 11px 'DM Mono'", color: mod.done ? "var(--green)" : "var(--muted)" }}>
                      {mod.done ? "Completed" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Facilitator Feedback */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                Send Direct Facilitator Feedback to {selectedTrainee.name}
              </label>

              {/* Quick Prompt Chips */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {[
                  "Great work on completing the syllabus modules!",
                  "Please review the DACI framework lesson before re-testing.",
                  "Approved and recommended for verified credential.",
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTraineeFeedback(chip)}
                    style={{
                      fontSize: 11,
                      background: "#f0eee6",
                      border: "1px solid #dcd9ce",
                      borderRadius: 4,
                      padding: "3px 8px",
                      cursor: "pointer",
                      color: "var(--ink)",
                    }}
                  >
                    + "{chip.slice(0, 32)}..."
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                placeholder="Type personalized instructional advice or assignment feedback..."
                value={traineeFeedback}
                onChange={(e) => setTraineeFeedback(e.target.value)}
                style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13, resize: "vertical" }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, borderTop: "1px solid var(--line)", paddingTop: 16 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="button outline"
                  style={{ height: 32, fontSize: 12, gap: 5 }}
                  onClick={() => {
                    setTrainees((prev) =>
                      prev.map((t) => (t.id === selectedTrainee.id ? { ...t, status: "Certified", statusTone: "green", progress: 100, assessmentScore: Math.max(t.assessmentScore, 88) } : t))
                    );
                    setSelectedTrainee((prev) => ({ ...prev, status: "Certified", statusTone: "green", progress: 100, assessmentScore: Math.max(prev.assessmentScore, 88) }));
                    setActionNotice(`Endorsed official certificate for ${selectedTrainee.name}!`);
                    setTimeout(() => setActionNotice(""), 3500);
                  }}
                >
                  <Icon name="Award" size={14} /> Endorse Credential
                </button>

                <button
                  type="button"
                  className="button outline"
                  style={{ height: 32, fontSize: 12, gap: 5 }}
                  onClick={() => {
                    setActionNotice(`Reset assessment attempt & notified ${selectedTrainee.name} to retake.`);
                    setTimeout(() => setActionNotice(""), 3500);
                  }}
                >
                  <Icon name="RotateCcw" size={13} /> Re-assign Assessment
                </button>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="button outline" onClick={() => setSelectedTrainee(null)}>
                  Close
                </button>
                <button
                  type="button"
                  className="button dark"
                  style={{ gap: 6 }}
                  onClick={() => {
                    if (traineeFeedback.trim()) {
                      setActionNotice(`Sent feedback to ${selectedTrainee.name}: "${traineeFeedback.trim()}"`);
                      setTimeout(() => setActionNotice(""), 3500);
                      setSelectedTrainee(null);
                    } else {
                      alert("Please type feedback or select a quick suggestion chip.");
                    }
                  }}
                >
                  <Icon name="Send" size={14} /> Send Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
