import { useState } from "react";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { ScoreBar } from "../../components/ScoreBar";
import { skills } from "../../data/skills";
import { saveUserProfile, DEFAULT_USER } from "../../data/user";
import { api } from "../../api";

export function Profile({ user: initialUser, setUser: setGlobalUser }) {
  const user = initialUser || DEFAULT_USER;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    designation: user.designation || "Operations Associate",
    department: user.department || "Regional Operations",
    experience: user.experience || "4 years",
    qualifications: user.qualifications || "B.Tech, Industrial Engineering",
    skills: Array.isArray(user.skills) ? user.skills.join(", ") : (user.skills || "Operations, Safety, Process improvement"),
    interests: user.interests || "People leadership, team coordination, AI workflows",
    bio: user.bio || "Operations professional focusing on capability development and team performance.",
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const getInitials = (name) => {
    if (!name) return "AM";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const skillsList = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedUser = {
      ...user,
      ...formData,
      skills: skillsList,
    };

    if (setGlobalUser) {
      setGlobalUser(updatedUser);
    }
    saveUserProfile(updatedUser);

    // If authenticated with backend token, sync to server
    if (localStorage.getItem("capacity_token")) {
      try {
        await api.updateMe({
          name: updatedUser.name,
          department: updatedUser.department,
          designation: updatedUser.designation,
          skills: updatedUser.skills,
          experience: updatedUser.experience,
          qualifications: updatedUser.qualifications,
          interests: updatedUser.interests,
        });
      } catch (err) {
        console.error("Backend profile sync note:", err.message);
      }
    }

    setSaveSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const skillsArray = Array.isArray(user.skills)
    ? user.skills
    : typeof user.skills === "string"
      ? user.skills.split(",").map((s) => s.trim())
      : ["Operations", "Safety", "Process improvement"];

  return (
    <>
      <PageHead kicker="PROFESSIONAL PROFILE" title={user.name || "My Profile"}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {saveSuccess && (
            <span className="pill-completed" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Icon name="Check" size={13} /> Profile Updated
            </span>
          )}
          <button
            className={`button ${isEditing ? "outline" : "dark"}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit profile"} <Icon name={isEditing ? "X" : "Pencil"} size={15} />
          </button>
        </div>
      </PageHead>

      {isEditing ? (
        <form onSubmit={handleSave} className="feature" style={{ maxWidth: 840, display: "grid", gap: 20 }}>
          <div>
            <p className="eyebrow">UPDATE CREDENTIALS</p>
            <h2>Edit Profile Details</h2>
            <p style={{ color: "var(--muted)", fontSize: 13 }}>
              Update your name, job role, qualifications, and core competencies.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500 }}>
              Full Name
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)" }}
              />
            </label>

            <label style={{ fontSize: 12, fontWeight: 500 }}>
              Work Email Address
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)" }}
              />
            </label>

            <label style={{ fontSize: 12, fontWeight: 500 }}>
              Designation / Job Title
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)" }}
              />
            </label>

            <label style={{ fontSize: 12, fontWeight: 500 }}>
              Department
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)" }}
              />
            </label>

            <label style={{ fontSize: 12, fontWeight: 500 }}>
              Experience
              <input
                type="text"
                placeholder="e.g. 4 years"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)" }}
              />
            </label>

            <label style={{ fontSize: 12, fontWeight: 500 }}>
              Qualifications
              <input
                type="text"
                placeholder="e.g. B.Tech, Industrial Engineering"
                value={formData.qualifications}
                onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)" }}
              />
            </label>

            <label style={{ fontSize: 12, fontWeight: 500, gridColumn: "1 / -1" }}>
              Skills (comma-separated)
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="Operations, Safety, Team Leadership, Process Improvement"
                style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)" }}
              />
            </label>

            <label style={{ fontSize: 12, fontWeight: 500, gridColumn: "1 / -1" }}>
              Professional Interests
              <input
                type="text"
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                placeholder="People leadership, team coordination, AI workflows"
                style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)" }}
              />
            </label>

            <label style={{ fontSize: 12, fontWeight: 500, gridColumn: "1 / -1" }}>
              Professional Bio / Summary
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                style={{ width: "100%", padding: 10, marginTop: 5, border: "1px solid var(--line)", background: "var(--paper)", resize: "vertical" }}
              />
            </label>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button type="submit" className="button dark">
              Save Profile Changes <Icon name="Check" size={16} />
            </button>
            <button type="button" className="button outline" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-grid">
          <section>
            <div className="profile-top">
              <span className="avatar big">{getInitials(user.name)}</span>
              <div>
                <h2>{user.name}</h2>
                <p>
                  {user.designation || "Operations Associate"} · {user.department || "Regional Operations"}
                </p>
                <small>
                  {user.experience || "4 years"} experience · {user.qualifications || "B.Tech, Industrial Engineering"}
                </small>
              </div>
            </div>

            {user.bio && (
              <p style={{ marginTop: 16, marginBottom: 0, color: "var(--muted)", fontSize: 13, lineHeight: 1.55 }}>
                {user.bio}
              </p>
            )}

            <hr />

            <dl>
              <dt>Skills</dt>
              <dd>
                {skillsArray.map((s) => (
                  <span key={s} className="pill" style={{ marginRight: 6, marginBottom: 6 }}>
                    {s}
                  </span>
                ))}
              </dd>
              <dt>Interests</dt>
              <dd>{user.interests || "People leadership, team coordination, AI workflows"}</dd>
              <dt>Certificates</dt>
              <dd>Operational Safety · Process Excellence Foundations</dd>
              {user.email && (
                <>
                  <dt>Email</dt>
                  <dd>{user.email}</dd>
                </>
              )}
            </dl>
          </section>

          <section className="feature">
            <p className="eyebrow">COMPETENCY SUMMARY</p>
            <h2>
              72<sup>%</sup>
            </h2>
            {skills.map((s) => (
              <ScoreBar key={s.name} {...s} />
            ))}
          </section>
        </div>
      )}
    </>
  );
}
