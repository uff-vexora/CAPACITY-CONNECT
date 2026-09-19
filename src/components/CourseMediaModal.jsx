import { useState, useEffect } from "react";
import { AppIcon as Icon } from "./AppIcon";

export function CourseMediaModal({ course, initialModuleIndex = 0, onClose }) {
  const [activeIdx, setActiveIdx] = useState(initialModuleIndex);
  const [copied, setCopied] = useState(false);
  const [qcStatusMap, setQcStatusMap] = useState({});
  const [notice, setNotice] = useState("");

  const modules = course?.modules || [];
  const currentModule = modules[activeIdx] || modules[0] || {};
  const currentYoutubeId = currentModule.youtubeId || "u4ZoJKF_VuA";

  // Load persistent QC review status for this course
  useEffect(() => {
    if (!course?.id) return;
    try {
      const stored = localStorage.getItem(`capacity_course_media_qc_${course.id}`);
      if (stored) {
        setQcStatusMap(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, [course?.id]);

  const saveQcStatus = (moduleId, status) => {
    if (!course?.id) return;
    const updated = { ...qcStatusMap, [moduleId]: status };
    setQcStatusMap(updated);
    try {
      localStorage.setItem(`capacity_course_media_qc_${course.id}`, JSON.stringify(updated));
    } catch {
      // Ignore
    }
    setNotice(`Updated QC audit status for "${currentModule.title}" to: ${status}`);
    setTimeout(() => setNotice(""), 4000);
  };

  const handleCopyLink = () => {
    const url = `https://www.youtube.com/watch?v=${currentYoutubeId}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportManifest = () => {
    const timestamp = new Date().toISOString().slice(0, 10);
    const headers = ["Module #", "Lesson Title", "Duration", "Video Provider", "YouTube Asset ID", "Video URL", "QC Review Status"];
    const rows = modules.map((m, i) => {
      const qc = qcStatusMap[m.id] || "Verified & Approved";
      return [
        `"Module ${i + 1}"`,
        `"${(m.title || "").replace(/"/g, '""')}"`,
        `"${m.duration || "N/A"}"`,
        `"YouTube Enterprise Video Stream"`,
        `"${m.youtubeId || "N/A"}"`,
        `"https://www.youtube.com/watch?v=${m.youtubeId || ""}"`,
        `"${qc}"`,
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${(course.title || "Course").replace(/[^a-zA-Z0-9]/g, "_")}_Video_Media_Manifest_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotice("Course video media manifest exported as CSV.");
    setTimeout(() => setNotice(""), 4000);
  };

  const currentQc = qcStatusMap[currentModule.id] || "Verified & Approved";

  if (!course) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(18, 20, 16, 0.85)",
        backdropFilter: "blur(5px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "min(1080px, 100%)",
          maxHeight: "92vh",
          background: "var(--paper)",
          border: "1px solid var(--line)",
          borderRadius: 12,
          boxShadow: "0 20px 48px rgba(0,0,0,0.35)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Studio Top Header */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid var(--line)",
            background: "#faf8f2",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "3px 7px",
                  borderRadius: 4,
                  background: "var(--ink)",
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Media & Video Inspector
              </span>
              <span className="pill" style={{ fontSize: 11, padding: "2px 8px" }}>{course.area}</span>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>Facilitator: <b>{course.trainer}</b></span>
            </div>
            <h2 style={{ fontSize: "1.35rem", margin: 0, color: "var(--ink)", display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="Video" size={20} style={{ color: "var(--green)" }} />
              {course.title}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              className="button outline"
              onClick={handleExportManifest}
              style={{ height: 34, fontSize: 12, gap: 5 }}
              title="Download video media asset catalog (CSV)"
            >
              <Icon name="Download" size={14} /> Export Manifest
            </button>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--muted)",
                cursor: "pointer",
                padding: 6,
                display: "grid",
                placeItems: "center",
                borderRadius: 6,
              }}
              title="Close inspector"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Feedback Alert Notice */}
        {notice && (
          <div
            style={{
              background: "#edf7ef",
              borderBottom: "1px solid #cce5d2",
              padding: "10px 24px",
              color: "#2d5e36",
              fontSize: 12,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon name="CheckCircle2" size={16} />
            <span>{notice}</span>
          </div>
        )}

        {/* Studio Body: Two Columns */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            overflowY: "auto",
          }}
        >
          {/* Left Column: Video Player Stage */}
          <div
            style={{
              padding: 24,
              borderRight: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              background: "#ffffff",
            }}
          >
            {/* Active Lesson Title & Meta Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Lesson {activeIdx + 1} of {modules.length}
                </span>
                <h3 style={{ margin: "2px 0 0", fontSize: "1.15rem", color: "var(--ink)" }}>{currentModule.title}</h3>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span className="pill" style={{ font: "600 11px 'DM Mono'" }}>
                  <Icon name="Clock" size={12} style={{ verticalAlign: "middle", marginRight: 3 }} />
                  {currentModule.duration || "15 min"}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: 4,
                    background: currentQc.includes("Needs") ? "#fff3e0" : "#edf7ef",
                    color: currentQc.includes("Needs") ? "var(--orange)" : "var(--green)",
                    border: `1px solid ${currentQc.includes("Needs") ? "#ffe0b2" : "#cce5d2"}`,
                  }}
                >
                  <Icon name={currentQc.includes("Needs") ? "AlertCircle" : "CheckCircle2"} size={12} style={{ verticalAlign: "middle", marginRight: 4 }} />
                  {currentQc}
                </span>
              </div>
            </div>

            {/* Video Player Box */}
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%", // 16:9 Aspect Ratio
                background: "#161814",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
              }}
            >
              <iframe
                key={currentYoutubeId}
                src={`https://www.youtube-nocookie.com/embed/${currentYoutubeId}?rel=0&autoplay=0&modestbranding=1&controls=1`}
                title={currentModule.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>

            {/* Video Spec & Technical Data Strip */}
            <div
              style={{
                background: "#faf8f2",
                border: "1px solid var(--line)",
                borderRadius: 8,
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>SOURCE ASSET ID:</span>
                  <code style={{ fontSize: 12, background: "#fff", padding: "2px 8px", borderRadius: 4, border: "1px solid var(--line)", color: "var(--ink)", fontWeight: 700 }}>
                    {currentYoutubeId}
                  </code>
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button
                    className="button outline"
                    onClick={handleCopyLink}
                    style={{ height: 28, fontSize: 11, gap: 4, padding: "0 10px" }}
                    title="Copy direct video URL"
                  >
                    <Icon name={copied ? "Check" : "Copy"} size={12} />
                    {copied ? "Copied Link!" : "Copy Link"}
                  </button>

                  <a
                    href={`https://www.youtube.com/watch?v=${currentYoutubeId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="button outline"
                    style={{ height: 28, fontSize: 11, gap: 4, padding: "0 10px", textDecoration: "none", color: "var(--ink)" }}
                    title="Open stream in separate tab"
                  >
                    <Icon name="ExternalLink" size={12} /> YouTube
                  </a>
                </div>
              </div>

              {/* Lesson Overview / Script notes */}
              {currentModule.summary && (
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10 }}>
                  <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, display: "block", marginBottom: 3 }}>
                    CURRICULUM LEARNING OBJECTIVE &amp; SUMMARY:
                  </span>
                  <p style={{ fontSize: 12, color: "var(--ink)", margin: 0, lineHeight: 1.5 }}>
                    {currentModule.summary}
                  </p>
                </div>
              )}

              {/* Associated Handouts & Resources */}
              {currentModule.resources && currentModule.resources.length > 0 && (
                <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10 }}>
                  <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, display: "block", marginBottom: 6 }}>
                    ATTACHED INSTRUCTIONAL RESOURCES ({currentModule.resources.length}):
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {currentModule.resources.map((res, ri) => (
                      <a
                        key={ri}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: 11,
                          padding: "3px 8px",
                          borderRadius: 4,
                          background: "#ffffff",
                          border: "1px solid var(--line)",
                          color: "var(--ink)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Icon name="FileText" size={12} style={{ color: "var(--green)" }} />
                        {res.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quality Control Review Action Controls */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 10,
                background: "#f7f5ed",
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid var(--line)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Icon name="ShieldCheck" size={15} style={{ color: "var(--green)" }} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>Facilitator &amp; Admin Audit Status:</span>
              </div>

              <div style={{ display: "flex", gap: 6 }}>
                <button
                  type="button"
                  className="button outline"
                  style={{
                    height: 28,
                    fontSize: 11,
                    gap: 4,
                    padding: "0 10px",
                    background: currentQc === "Verified & Approved" ? "var(--ink)" : "#fff",
                    color: currentQc === "Verified & Approved" ? "#fff" : "var(--ink)",
                  }}
                  onClick={() => saveQcStatus(currentModule.id, "Verified & Approved")}
                >
                  <Icon name="Check" size={12} /> Approved
                </button>
                <button
                  type="button"
                  className="button outline"
                  style={{
                    height: 28,
                    fontSize: 11,
                    gap: 4,
                    padding: "0 10px",
                    background: currentQc === "Needs Re-recording" ? "var(--orange)" : "#fff",
                    color: currentQc === "Needs Re-recording" ? "#fff" : "var(--ink)",
                  }}
                  onClick={() => saveQcStatus(currentModule.id, "Needs Re-recording")}
                >
                  <Icon name="AlertTriangle" size={12} /> Needs Edit
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Playlist & Media Specs */}
          <div
            style={{
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              background: "#faf8f2",
            }}
          >
            {/* Playlist Header */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <p className="eyebrow" style={{ margin: 0 }}>COURSE SYLLABUS PLAYLIST</p>
                <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600 }}>
                  {modules.length} {modules.length === 1 ? "Video" : "Videos"}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>
                Click any lesson below to inspect the video stream, duration, and instructional notes.
              </p>
            </div>

            {/* Modules Playlist List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 360, overflowY: "auto", paddingRight: 4 }}>
              {modules.map((m, idx) => {
                const isCurrent = idx === activeIdx;
                const itemQc = qcStatusMap[m.id] || "Verified";

                return (
                  <div
                    key={m.id || idx}
                    onClick={() => setActiveIdx(idx)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 8,
                      background: isCurrent ? "var(--paper)" : "#ffffff",
                      border: isCurrent ? "2px solid var(--ink)" : "1px solid var(--line)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      boxShadow: isCurrent ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    {/* Index or Play Icon */}
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: isCurrent ? "var(--ink)" : "#f0eee6",
                        color: isCurrent ? "#fff" : "var(--muted)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      {isCurrent ? <Icon name="Play" size={12} /> : idx + 1}
                    </div>

                    {/* Module Title and Meta */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                        <b
                          style={{
                            fontSize: 13,
                            color: isCurrent ? "var(--ink)" : "#3a3c36",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: 1.3,
                          }}
                        >
                          {m.title}
                        </b>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: "var(--muted)",
                            fontFamily: "'DM Mono', monospace",
                            flexShrink: 0,
                          }}
                        >
                          {m.duration || "15m"}
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, fontSize: 11, color: "var(--muted)" }}>
                        <span>ID: <code style={{ fontSize: 10 }}>{m.youtubeId}</code></span>
                        <span>·</span>
                        <span style={{ color: itemQc.includes("Needs") ? "var(--orange)" : "var(--green)" }}>
                          {itemQc}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Technical Specification Matrix */}
            <div
              style={{
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: 8,
                padding: "16px",
              }}
            >
              <p className="eyebrow" style={{ margin: "0 0 10px" }}>STREAMING &amp; ENCODING TELEMETRY</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 14px", fontSize: 12 }}>
                <div>
                  <span style={{ color: "var(--muted)", display: "block", fontSize: 11 }}>RESOLUTION</span>
                  <b>1080p FHD (16:9)</b>
                </div>
                <div>
                  <span style={{ color: "var(--muted)", display: "block", fontSize: 11 }}>ENCODING</span>
                  <b>H.264 / AAC 48kHz</b>
                </div>
                <div>
                  <span style={{ color: "var(--muted)", display: "block", fontSize: 11 }}>ACCESSIBILITY</span>
                  <b>Captions Verified</b>
                </div>
                <div>
                  <span style={{ color: "var(--muted)", display: "block", fontSize: 11 }}>CDN STATUS</span>
                  <b style={{ color: "var(--green)" }}>Active &amp; Globally Cached</b>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ marginTop: "auto", display: "flex", gap: 10 }}>
              <button
                type="button"
                className="button outline"
                style={{ flex: 1, fontSize: 12, height: 36, justifyContent: "center" }}
                onClick={onClose}
              >
                Close Studio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
