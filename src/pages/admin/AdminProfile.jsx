import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { Metric } from "../../components/Metric";

const DEFAULT_ADMIN_PROFILE = {
  name: "Dr. Alistair Vance",
  title: "Director of Enterprise Learning & Talent Governance",
  department: "Global People Operations & Capability Development",
  organization: "Capacity Connect Enterprise",
  email: "admin@capacityconnect.org",
  phone: "+1 (555) 720-4419",
  location: "New York, NY (Enterprise HQ)",
  roleBadge: "Root Administrator",
  bio: "Lead enterprise architect overseeing organizational competency calibration, capability benchmarking, accredited instructor deployment, and cross-functional capacity planning across global operating divisions.",
};

const AUDIT_LOGS = [
  {
    action: "Calibrated Q3 Enterprise Operations competency benchmark to 80%",
    user: "Dr. Alistair Vance",
    time: "Today · 11:30 AM",
    tone: "green",
    icon: "SlidersHorizontal",
  },
  {
    action: "Verified & audited 42 completed trainee certifications (Batch 2026-A)",
    user: "Dr. Alistair Vance",
    time: "Yesterday · 4:15 PM",
    tone: "green",
    icon: "Award",
  },
  {
    action: "Approved course publication: 'Generative AI & Prompt Engineering for Work'",
    user: "Dr. Alistair Vance",
    time: "2 days ago",
    tone: "orange",
    icon: "CheckCircle2",
  },
  {
    action: "Synchronized enterprise directory roster with Azure Active Directory",
    user: "System Daemon",
    time: "3 days ago",
    tone: "green",
    icon: "RefreshCw",
  },
];

export function AdminProfile({ user, setUser, setPage }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("capacity_admin_profile");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ADMIN_PROFILE;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [notice, setNotice] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    try {
      localStorage.setItem("capacity_admin_profile", JSON.stringify(formData));
      if (setUser) {
        setUser((prev) => ({ ...prev, name: formData.name }));
      }
    } catch (err) {
      console.error(err);
    }
    setIsEditing(false);
    setNotice("Administrator profile updated successfully!");
    setTimeout(() => setNotice(""), 3500);
  };

  return (
    <>
      <div className="page-head" style={{ marginBottom: 18 }}>
        <div>
          <p className="eyebrow">GOVERNANCE &amp; CREDENTIALS</p>
          <h1 style={{ fontSize: "2.3rem", margin: "4px 0 0" }}>Administrator Profile &amp; Governance</h1>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="button outline" onClick={() => setPage && setPage("Reports")} style={{ gap: 6 }}>
            <Icon name="FileBarChart" size={15} /> Audit Reports
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
              background: "var(--ink)",
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
              <span className="pill" style={{ background: "#edf7ef", color: "var(--green)", fontWeight: 700 }}>
                {profile.roleBadge}
              </span>
              <span className="pill" style={{ background: "#f5f3eb", color: "var(--ink)", fontWeight: 500 }}>
                Full System Privileges
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
              <span><Icon name="Shield" size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> <b>Access:</b> Root Admin (SSO Enforced)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Governance Metrics */}
      <div className="metric-grid" style={{ marginBottom: 28 }}>
        <Metric value="1,248" label="Workforce Enrolled" detail="94% engagement rate" />
        <Metric value="6" label="Certified Instructors" detail="100% accredited" />
        <Metric value="42" label="Certified Cohorts" detail="Conferred credentials" />
        <Metric value="99.98%" label="Platform Availability" detail="Tier-4 cloud uptime" />
      </div>

      {/* Security & Compliance Badges */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 10, padding: 22, marginBottom: 26 }}>
        <b style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", display: "block", marginBottom: 12 }}>
          ORGANIZATIONAL SECURITY &amp; COMPLIANCE STATUS
        </b>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {[
            { title: "SOC-2 Type II Certified", status: "Compliant", icon: "ShieldCheck", tone: "green" },
            { title: "ISO 27001 Information Security", status: "Audited 2026", icon: "CheckCircle", tone: "green" },
            { title: "SAML 2.0 / Okta SSO", status: "Active & Enforced", icon: "Key", tone: "green" },
            { title: "GDPR / Global Data Privacy", status: "Verified Compliant", icon: "Lock", tone: "green" },
          ].map((item, idx) => (
            <div key={idx} style={{ background: "#fcfbf7", border: "1px solid var(--line)", padding: "12px 16px", borderRadius: 8, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#edf7ef", color: "var(--green)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Icon name={item.icon} size={16} />
              </div>
              <div>
                <b style={{ fontSize: 13, color: "var(--ink)", display: "block" }}>{item.title}</b>
                <small style={{ color: "var(--green)", fontWeight: 600 }}>{item.status}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log Stream */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 10, padding: 26, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div>
            <p className="eyebrow" style={{ margin: 0 }}>SECURITY AUDIT TRAIL</p>
            <h3 style={{ margin: "4px 0 0", fontSize: "1.3rem" }}>Recent Administrative Actions</h3>
          </div>
          <button className="button outline" style={{ height: 30, fontSize: 11 }} onClick={() => window.print()}>
            Export Audit Log
          </button>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {AUDIT_LOGS.map((log, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                border: "1px solid var(--line)",
                borderRadius: 8,
                background: "#fcfbf7",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: "#edf7ef",
                    color: "var(--green)",
                  }}
                >
                  <Icon name={log.icon} size={15} />
                </div>
                <div>
                  <b style={{ fontSize: 13, color: "var(--ink)" }}>{log.action}</b>
                  <small style={{ display: "block", color: "var(--muted)", fontSize: 11, marginTop: 2 }}>
                    Initiated by {log.user}
                  </small>
                </div>
              </div>

              <span style={{ fontSize: 11, color: "var(--muted)", font: "500 11px 'DM Mono'" }}>{log.time}</span>
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
                <h3 style={{ margin: "4px 0 0", fontSize: "1.4rem" }}>Edit Administrator Details</h3>
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

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Leadership Executive Bio</label>
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
