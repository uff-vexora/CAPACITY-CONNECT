import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { Metric } from "../../components/Metric";
import { INITIAL_COURSES } from "../../data/courses";

const DEFAULT_TRAINER_PROFILE = {
  name: "Anita Verma",
  title: "Senior Capability Architect & Lead Facilitator",
  department: "Leadership & Organizational Capability",
  organization: "Enterprise Capacity Academy",
  email: "anita.verma@capacityconnect.org",
  phone: "+1 (555) 382-9014",
  location: "San Francisco, CA (Hybrid)",
  rating: "4.92",
  reviewCount: 148,
  officeHours: "Tuesdays & Thursdays · 2:00 PM – 4:30 PM (PST)",
  bio: "Senior organizational development strategist and executive coach with 12+ years of experience leading cross-functional capability acceleration. Specializes in decision frameworks (DACI/RAPID), high-stakes stakeholder alignment, and enterprise leadership benchmarking.",
  specializations: ["Executive Decision-Making", "Cross-Functional Leadership", "Change Management", "Competency Benchmarking", "Facilitation & Mentoring"],
  certifications: [
    { title: "Certified Scrum Professional (CSP)", issuer: "Scrum Alliance", year: "2024" },
    { title: "Lean Six Sigma Black Belt Facilitator", issuer: "ASQ Global", year: "2023" },
    { title: "Stanford Executive Leadership Fellow", issuer: "Stanford GSB", year: "2022" },
    { title: "ISO 9001 Quality & Competency Lead Auditor", issuer: "BSI Global", year: "2021" },
  ],
};

const TRAINEE_REVIEWS = [
  {
    trainee: "Alex Morgan",
    role: "Operations Associate",
    course: "Leadership Essentials",
    rating: 5,
    date: "3 days ago",
    comment: "Anita's breakdown of the DACI decision framework made our team alignment 10x clearer. The real-world case simulations in the live session were invaluable.",
  },
  {
    trainee: "Sarah Chen",
    role: "Junior Software Engineer",
    course: "Advanced Team Management",
    rating: 5,
    date: "1 week ago",
    comment: "Superb facilitator! Her direct feedback during office hours helped me structure our team's retrospective meeting with measurable action items.",
  },
  {
    trainee: "Maria Garcia",
    role: "Data Specialist",
    course: "Leadership Essentials",
    rating: 5,
    date: "2 weeks ago",
    comment: "Clear, engaging, and deeply practical. The module outlines and downloadable SBI feedback toolkits are tools I use daily at work now.",
  },
];

export function TrainerProfile({ user, setUser, setPage, onSelectCourse }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("capacity_trainer_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TRAINER_PROFILE;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [notice, setNotice] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    try {
      localStorage.setItem("capacity_trainer_profile", JSON.stringify(formData));
      if (setUser) {
        setUser((prev) => ({ ...prev, name: formData.name }));
      }
    } catch (err) {
      console.error(err);
    }
    setIsEditing(false);
    setNotice("Trainer profile updated successfully!");
    setTimeout(() => setNotice(""), 3500);
  };

  // Courses led by this trainer
  const facilitatedCourses = INITIAL_COURSES.filter(
    (c) => c.trainer === "Anita Verma" || c.trainer === profile.name || c.id === "leadership-essentials" || c.id === "advanced-team-management"
  );

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">FACILITATOR CREDENTIALS</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Trainer Profile &amp; Teaching Portfolio</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button outline" onClick={() => setPage && setPage("Live Sessions")} style={{ gap: 6 }}>
            <Icon name="Calendar" size={15} /> Live Sessions
          </button>
          <button className="button dark" onClick={() => { setFormData({ ...profile }); setIsEditing(true); }} style={{ gap: 6 }}>
            <Icon name="Edit3" size={15} /> Edit Profile
          </button>
        </div>
      </div>

      {notice && (
        <div style={{ background: "#edf7ef", border: "1px solid #cce5d2", padding: "12px 18px", borderRadius: 8, color: "#2d5e36", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="CheckCircle2" size={18} />
          <span>{notice}</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 10, padding: 28, marginBottom: 26 }}>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              background: "#d98045",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontSize: 28,
              fontFamily: "'DM Mono', monospace",
              fontWeight: 700,
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            {profile.name.split(" ").map((n) => n[0]).join("")}
          </div>

          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
              <h2 style={{ margin: 0, fontSize: "1.75rem", color: "var(--ink)" }}>{profile.name}</h2>
              <span className="pill" style={{ background: "#edf7ef", color: "var(--green)", fontWeight: 600 }}>
                Verified Facilitator
              </span>
              <span style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 4, color: "#b8702b", fontWeight: 600 }}>
                ★ {profile.rating} <span style={{ color: "var(--muted)", fontWeight: 400 }}>({profile.reviewCount} evaluations)</span>
              </span>
            </div>

            <p style={{ margin: "0 0 10px", fontSize: 14, color: "var(--ink)", fontWeight: 500 }}>
              {profile.title} · <span style={{ color: "var(--muted)" }}>{profile.department}</span>
            </p>

            <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--muted)", lineHeight: 1.55, maxWidth: 820 }}>
              {profile.bio}
            </p>

            <div style={{ display: "flex", gap: 20, fontSize: 12, color: "var(--muted)", flexWrap: "wrap" }}>
              <span><Icon name="Mail" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> {profile.email}</span>
              <span><Icon name="Phone" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> {profile.phone}</span>
              <span><Icon name="MapPin" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> {profile.location}</span>
              <span><Icon name="Clock" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> <b>Office Hours:</b> {profile.officeHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Telemetry */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <Metric value="4" label="Active Cohorts" detail="Q2 & Q3 Batches" />
        <Metric value="218" label="Trainees Mentored" detail="Cross-departmental" />
        <Metric value="3" label="Curriculums Led" detail="Syllabus author" />
        <Metric value="86.4%" label="Benchmark Pass Rate" detail="Min. 80% passing" />
      </div>

      {/* Specialization Tags */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 10, padding: 22, marginBottom: 26 }}>
        <b style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", display: "block", marginBottom: 12 }}>
          CORE FACILITATION &amp; SUBJECT COMPETENCIES
        </b>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {profile.specializations.map((spec, i) => (
            <span key={i} className="pill" style={{ background: "#f5f3eb", color: "var(--ink)", fontSize: 12, padding: "6px 12px" }}>
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Two Column Section: Facilitated Curriculums + Certifications */}
      <div className="dashboard-grid" style={{ marginBottom: 30 }}>
        {/* Facilitated Curriculums */}
        <section className="feature">
          <div className="section-top">
            <div>
              <p className="eyebrow">ACTIVE INSTRUCTION</p>
              <h2 style={{ fontSize: "1.4rem", margin: "4px 0 16px" }}>Curriculums Facilitated</h2>
            </div>
            <button className="text-button" onClick={() => setPage && setPage("Courses")}>
              All Courses →
            </button>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {facilitatedCourses.map((c) => (
              <div
                key={c.id}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                  padding: "14px 16px",
                  background: "#fcfbf7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <span className="pill" style={{ fontSize: 10, padding: "1px 6px" }}>{c.area}</span>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>{c.modules?.length || 4} lessons · {c.duration}</span>
                  </div>
                  <b style={{ fontSize: 14, color: "var(--ink)", display: "block" }}>{c.title}</b>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="button outline"
                    style={{ height: 30, fontSize: 11, gap: 4 }}
                    onClick={() => {
                      if (onSelectCourse) onSelectCourse(c.id, "Course Details");
                      else if (setPage) setPage("Courses");
                    }}
                  >
                    <Icon name="Eye" size={13} /> Preview
                  </button>
                  <button
                    className="button dark"
                    style={{ height: 30, fontSize: 11, gap: 4 }}
                    onClick={() => setPage && setPage("Assessments")}
                  >
                    <Icon name="ClipboardCheck" size={13} /> Questions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Credentials & Certifications */}
        <section className="feature">
          <div className="section-top">
            <div>
              <p className="eyebrow">ACCREDITATIONS</p>
              <h2 style={{ fontSize: "1.4rem", margin: "4px 0 16px" }}>Professional Credentials</h2>
            </div>
            <span className="pill" style={{ background: "#edf7ef", color: "var(--green)", fontWeight: 600 }}>Active</span>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {profile.certifications.map((cert, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 14px",
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                  background: "#fcfbf7",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#f2ece1", color: "var(--orange)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                  <Icon name="Award" size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: 13, color: "var(--ink)", display: "block" }}>{cert.title}</b>
                  <small style={{ color: "var(--muted)", fontSize: 11 }}>{cert.issuer} · Issued {cert.year}</small>
                </div>
                <Icon name="CheckCircle" size={15} style={{ color: "var(--green)" }} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Trainee Reviews & Feedback Feed */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 10, padding: 26, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>LEARNER EVALUATIONS</p>
            <h3 style={{ margin: "4px 0 0", fontSize: "1.3rem" }}>Recent Cohort Feedback &amp; Ratings</h3>
          </div>
          <span style={{ font: "600 13px 'DM Mono'", color: "var(--green)" }}>
            Overall Rating: 4.92 / 5.0 ★
          </span>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {TRAINEE_REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid var(--line)",
                borderRadius: 8,
                padding: "16px 18px",
                background: "#fcfbf7",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <b style={{ fontSize: 13, color: "var(--ink)" }}>{rev.trainee}</b>
                  <span style={{ fontSize: 11, color: "var(--muted)" }}>{rev.role} · Course: <b>{rev.course}</b></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#d98045", fontSize: 12 }}>★★★★★</span>
                  <small style={{ color: "var(--muted)", fontSize: 11 }}>{rev.date}</small>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#54574c", lineHeight: 1.5, fontStyle: "italic" }}>
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
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
          onClick={() => setIsEditing(false)}
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <p className="eyebrow" style={{ margin: 0 }}>PROFILE SETTINGS</p>
                <h3 style={{ margin: "4px 0 0", fontSize: "1.4rem" }}>Edit Trainer Profile</h3>
              </div>
              <button onClick={() => setIsEditing(false)} style={{ cursor: "pointer", color: "var(--muted)" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Job Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Office Hours Schedule</label>
                <input
                  type="text"
                  value={formData.officeHours}
                  onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                  placeholder="e.g. Tuesdays & Thursdays · 2:00 PM – 4:30 PM (PST)"
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13 }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Faculty Bio &amp; Philosophy</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--line)", borderRadius: 6, background: "#faf8f2", fontSize: 13, resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button type="button" className="button outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="button dark" style={{ gap: 6 }}>
                  <Icon name="Check" size={15} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
