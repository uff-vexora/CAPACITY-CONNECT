import { useState, useMemo } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { Metric } from "../../components/Metric";

const INITIAL_EMPLOYEES = [
  {
    id: "EMP-101",
    name: "Rahul Sharma",
    email: "rahul.s@capacityconnect.org",
    department: "Regional Operations",
    role: "Operations Associate",
    competency: "72%",
    status: "In Progress",
    enrolledCourse: "Communication at Work",
    joinedDate: "12 May 2026",
    manager: "Anita Verma",
  },
  {
    id: "EMP-102",
    name: "Priya Menon",
    email: "priya.m@capacityconnect.org",
    department: "Customer Success",
    role: "Client Team Lead",
    competency: "78%",
    status: "On Track",
    enrolledCourse: "Leadership Essentials",
    joinedDate: "04 Jun 2026",
    manager: "Rohan Mehta",
  },
  {
    id: "EMP-103",
    name: "Arun Patel",
    email: "arun.p@capacityconnect.org",
    department: "Manufacturing",
    role: "Process Engineer",
    competency: "66%",
    status: "Needs Training",
    enrolledCourse: "Operational Safety Readiness",
    joinedDate: "20 Jun 2026",
    manager: "Priya Nair",
  },
  {
    id: "EMP-104",
    name: "Neha Singh",
    email: "neha.s@capacityconnect.org",
    department: "Finance & Risk",
    role: "Senior Financial Analyst",
    competency: "82%",
    status: "On Track",
    enrolledCourse: "Data Analytics & SQL Mastery",
    joinedDate: "15 Jul 2026",
    manager: "Vikram Singh",
  },
  {
    id: "EMP-105",
    name: "Sarah Chen",
    email: "sarah.c@capacityconnect.org",
    department: "Engineering",
    role: "Junior Software Engineer",
    competency: "94%",
    status: "Certified",
    enrolledCourse: "Full-Stack Web Development Foundations",
    joinedDate: "02 Aug 2026",
    manager: "Dev Academy",
  },
  {
    id: "EMP-106",
    name: "Alex Morgan",
    email: "alex.m@capacityconnect.org",
    department: "Regional Operations",
    role: "Operations Lead",
    competency: "90%",
    status: "Certified",
    enrolledCourse: "Leadership Essentials",
    joinedDate: "18 Aug 2026",
    manager: "Anita Verma",
  },
  {
    id: "EMP-107",
    name: "Maria Garcia",
    email: "maria.g@capacityconnect.org",
    department: "Analytics & Strategy",
    role: "Data Specialist",
    competency: "96%",
    status: "Certified",
    enrolledCourse: "Data Analytics & SQL Mastery",
    joinedDate: "01 Sep 2026",
    manager: "Vikram Singh",
  },
  {
    id: "EMP-108",
    name: "David Kim",
    email: "david.k@capacityconnect.org",
    department: "Project Management",
    role: "Agile Project Associate",
    competency: "58%",
    status: "Needs Training",
    enrolledCourse: "Agile & Scrum Project Management",
    joinedDate: "08 Sep 2026",
    manager: "Vikram Singh",
  },
];

export function Users() {
  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem("capacity_admin_users");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EMPLOYEES;
  });

  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notice, setNotice] = useState("");

  // Add form state
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDept, setNewDept] = useState("Engineering");
  const [newRole, setNewRole] = useState("Associate Specialist");
  const [newCourse, setNewCourse] = useState("Leadership Essentials");

  const depts = useMemo(() => {
    const set = new Set(employees.map((e) => e.department));
    return ["all", ...Array.from(set)];
  }, [employees]);

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchSearch =
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.role.toLowerCase().includes(search.toLowerCase()) ||
        e.department.toLowerCase().includes(search.toLowerCase());
      const matchDept = selectedDept === "all" || e.department === selectedDept;
      const matchStatus = selectedStatus === "all" || e.status === selectedStatus;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, search, selectedDept, selectedStatus]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const created = {
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: newName.trim(),
      email: newEmail.trim(),
      department: newDept,
      role: newRole,
      competency: "0%",
      status: "In Progress",
      enrolledCourse: newCourse,
      joinedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      manager: "Executive Leadership",
    };

    const updated = [created, ...employees];
    setEmployees(updated);
    try {
      localStorage.setItem("capacity_admin_users", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setShowAddModal(false);
    setNewName("");
    setNewEmail("");
    setNotice(`Enrolled ${created.name} in workforce directory!`);
    setTimeout(() => setNotice(""), 3500);
  };

  const handleExportCSV = () => {
    const headers = ["Employee ID", "Full Name", "Email", "Department", "Role", "Assessed Competency", "Training Status", "Enrolled Pathway", "Joined Date"];
    const rows = employees.map((e) => [
      `"${e.id}"`,
      `"${e.name}"`,
      `"${e.email}"`,
      `"${e.department}"`,
      `"${e.role}"`,
      `"${e.competency}"`,
      `"${e.status}"`,
      `"${e.enrolledCourse}"`,
      `"${e.joinedDate}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "Capacity_Connect_Enterprise_Employees_Directory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">ENTERPRISE WORKFORCE</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Employee Capability Roster</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button outline" onClick={handleExportCSV} title="Export employees to CSV">
            <Icon name="Download" size={15} /> Export Directory
          </button>
          <button className="button dark" onClick={() => setShowAddModal(true)} style={{ gap: 6 }}>
            <Icon name="UserPlus" size={15} /> Add Employee
          </button>
        </div>
      </div>

      <p className="lead" style={{ marginBottom: 24 }}>
        Enterprise directory of enrolled staff across departments, tracking individual competency benchmark scores, learning pathway status, and role alignments.
      </p>

      {notice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <Metric value={employees.length.toString()} label="Total Employees" detail="Active workforce roster" />
        <Metric value="77.4%" label="Avg. Competency" detail="+4.2% YoY gain" />
        <Metric value={employees.filter((e) => e.status === "Certified").length.toString()} label="Certified Mastery" detail="Passed benchmark" />
        <Metric value={employees.filter((e) => e.status === "Needs Training").length.toString()} label="Targeted Interventions" detail="Priority mentoring" />
      </div>

      {/* Search and Filters */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", padding: "16px 20px", borderRadius: 10, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1, minWidth: 260 }}>
          <Icon name="Search" size={16} style={{ color: "var(--muted)" }} />
          <input
            type="text"
            placeholder="Search by name, role, department, or email..."
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
            {depts.filter((d) => d !== "all").map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
          >
            <option value="all">All Statuses</option>
            <option value="Certified">Certified (Passed)</option>
            <option value="On Track">On Track</option>
            <option value="In Progress">In Progress</option>
            <option value="Needs Training">Needs Training</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="table-wrap" style={{ borderRadius: 10 }}>
        <table>
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>DEPARTMENT &amp; ROLE</th>
              <th>ENROLLED PATHWAY</th>
              <th>COMPETENCY</th>
              <th>TRAINING STATUS</th>
              <th style={{ textAlign: "right" }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#e5dccb", color: "#222", display: "grid", placeItems: "center", font: "600 12px 'DM Mono'", flexShrink: 0 }}>
                      {p.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <b style={{ fontSize: 14 }}>{p.name}</b>
                      <small style={{ color: "var(--muted)", fontSize: 11 }}>{p.email}</small>
                    </div>
                  </div>
                </td>

                <td>
                  <div>
                    <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{p.role}</span>
                    <small style={{ color: "var(--muted)", fontSize: 11 }}>{p.department}</small>
                  </div>
                </td>

                <td>
                  <span style={{ fontSize: 13 }}>{p.enrolledCourse}</span>
                </td>

                <td>
                  <strong style={{ fontSize: 14, color: parseInt(p.competency) >= 80 ? "var(--green)" : parseInt(p.competency) >= 70 ? "var(--orange)" : "var(--rust)" }}>
                    {p.competency}
                  </strong>
                </td>

                <td>
                  <span
                    className={
                      "status " +
                      (p.status === "Needs Training" ? "warn" : p.status === "Certified" ? "done" : "")
                    }
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: p.status === "Certified" ? "#edf7ef" : p.status === "Needs Training" ? "#fdeae3" : "#fdf2e9",
                      color: p.status === "Certified" ? "#2d5e36" : p.status === "Needs Training" ? "#9e3d1c" : "#b85d3b",
                    }}
                  >
                    {p.status}
                  </span>
                </td>

                <td style={{ textAlign: "right" }}>
                  <button
                    className="button outline"
                    style={{ height: 30, fontSize: 11, padding: "0 10px", gap: 4 }}
                    onClick={() => setSelectedEmployee(p)}
                  >
                    <Icon name="Eye" size={12} /> Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspect Employee Modal */}
      {selectedEmployee && (
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
          onClick={() => setSelectedEmployee(null)}
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
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#e5dccb", color: "#222", display: "grid", placeItems: "center", font: "700 15px 'DM Mono'", flexShrink: 0 }}>
                  {selectedEmployee.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 style={{ margin: 0, fontSize: "1.35rem", color: "var(--ink)" }}>{selectedEmployee.name}</h3>
                    <span className="pill" style={{ background: "#edf7ef", color: "var(--green)", fontWeight: 600 }}>
                      {selectedEmployee.status}
                    </span>
                  </div>
                  <small style={{ color: "var(--muted)", fontSize: 12 }}>ID: {selectedEmployee.id} · {selectedEmployee.email}</small>
                </div>
              </div>
              <button onClick={() => setSelectedEmployee(null)} style={{ cursor: "pointer", color: "var(--muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div style={{ background: "#faf8f2", border: "1px solid var(--line)", padding: "12px 14px", borderRadius: 8 }}>
                <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>ROLE &amp; DEPT</span>
                <b style={{ fontSize: 13, color: "var(--ink)" }}>{selectedEmployee.role}</b>
                <small style={{ display: "block", color: "var(--muted)", fontSize: 11 }}>{selectedEmployee.department}</small>
              </div>

              <div style={{ background: "#faf8f2", border: "1px solid var(--line)", padding: "12px 14px", borderRadius: 8 }}>
                <span style={{ fontSize: 11, color: "var(--muted)", display: "block" }}>BENCHMARK READINESS</span>
                <b style={{ fontSize: 15, color: parseInt(selectedEmployee.competency) >= 80 ? "var(--green)" : "var(--orange)" }}>
                  {selectedEmployee.competency} Competency
                </b>
                <small style={{ display: "block", color: "var(--muted)", fontSize: 11 }}>Manager: {selectedEmployee.manager}</small>
              </div>
            </div>

            <div style={{ background: "#fcfbf7", border: "1px solid var(--line)", borderRadius: 8, padding: 18, marginBottom: 20 }}>
              <b style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)", display: "block", marginBottom: 10 }}>
                ASSIGNED LEARNING PATHWAY
              </b>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{selectedEmployee.enrolledCourse}</span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>Enrolled {selectedEmployee.joinedDate}</span>
              </div>
              <div className="bar" style={{ height: 6 }}>
                <i style={{ width: `${selectedEmployee.competency}`, background: parseInt(selectedEmployee.competency) >= 80 ? "var(--green)" : "var(--orange)" }} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: 16 }}>
              <button
                type="button"
                className="button outline"
                style={{ height: 32, fontSize: 12, gap: 5 }}
                onClick={() => {
                  setNotice(`Dispatched learning reminder notification to ${selectedEmployee.name}.`);
                  setTimeout(() => setNotice(""), 3500);
                  setSelectedEmployee(null);
                }}
              >
                <Icon name="Send" size={13} /> Send Reminder
              </button>

              <button type="button" className="button dark" onClick={() => setSelectedEmployee(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
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
                <p className="eyebrow" style={{ margin: 0 }}>WORKFORCE ENROLLMENT</p>
                <h3 style={{ margin: "4px 0 0", fontSize: "1.4rem" }}>Add Employee to Platform</h3>
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
                  placeholder="e.g. Jordan Lee"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jordan.l@capacityconnect.org"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Department</label>
                  <select
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Regional Operations">Regional Operations</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Customer Success">Customer Success</option>
                    <option value="Finance & Risk">Finance &amp; Risk</option>
                    <option value="Project Management">Project Management</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Role Title</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Assigned Initial Track</label>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                >
                  <option value="Leadership Essentials">Leadership Essentials</option>
                  <option value="Communication at Work">Communication at Work</option>
                  <option value="Operational Safety Readiness">Operational Safety Readiness</option>
                  <option value="Data Analytics & SQL Mastery">Data Analytics &amp; SQL Mastery</option>
                  <option value="Full-Stack Web Development Foundations">Full-Stack Web Development Foundations</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button type="button" className="button outline" onClick={() => setShowAddModal(false)}>
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
    </>
  );
}
