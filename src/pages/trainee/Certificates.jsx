import { useState, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
import { Brand } from "../../components/Brand";
import { DEFAULT_USER } from "../../data/user";
import { loadAssessmentResults } from "../../data/assessments";

export function Certificates({ courses = [], user: initialUser, setPage }) {
  const user = initialUser || DEFAULT_USER;
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedNotice, setCopiedNotice] = useState(false);
  const printRef = useRef(null);

  // Baseline verified certificates
  const baselineCerts = useMemo(
    () => [
      {
        id: "CC-2026-SAFE-0842",
        title: "Operational Safety Readiness",
        area: "Safety & Compliance Competency",
        completedDate: "18 Aug 2026",
        trainer: "Priya Nair",
        trainerTitle: "Director of Safety Operations",
        score: "96%",
        recipient: user.name || "Alex Morgan",
        description:
          "Demonstrated exceptional compliance readiness, industrial hazard identification, and operational protocol execution.",
      },
      {
        id: "CC-2026-PROC-0491",
        title: "Process Excellence Foundations",
        area: "Operations & Continuous Improvement",
        completedDate: "03 Jul 2026",
        trainer: "Vikram Singh",
        trainerTitle: "Senior Lean Six Sigma Master",
        score: "92%",
        recipient: user.name || "Alex Morgan",
        description:
          "Mastered value-stream mapping, root-cause analysis, and standardized workflow optimizations across operational pipelines.",
      },
    ],
    [user.name]
  );

  const assessmentResults = useMemo(() => loadAssessmentResults(), []);

  // Dynamic certificates for courses completed 100% OR passed assessment (>=80%)
  const courseCerts = useMemo(() => {
    return courses
      .filter((c) => c.progress === 100 || (assessmentResults[c.id] && assessmentResults[c.id].passed))
      .map((c) => {
        const assessmentResult = assessmentResults[c.id];
        const displayScore = assessmentResult ? `${assessmentResult.score}%` : "98%";
        const completedDate =
          assessmentResult?.date ||
          new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        return {
          id: `CC-2026-${c.id.replace(/-/g, "").slice(0, 4).toUpperCase()}-9812`,
          title: `${c.title} Mastery`,
          area: `${c.area || "Professional"} Competency`,
          completedDate,
          trainer: c.trainer || "Anita Verma",
          trainerTitle: "Senior Capability Facilitator",
          score: displayScore,
          recipient: user.name || "Alex Morgan",
          description: c.overview || `Demonstrated full modular competence and verified mastery in ${c.title}.`,
        };
      });
  }, [courses, user.name, assessmentResults]);

  const allCertificates = useMemo(() => {
    return [...courseCerts, ...baselineCerts];
  }, [courseCerts, baselineCerts]);

  // Locked / In-Progress courses with progress towards certificate
  const inProgressCerts = useMemo(() => {
    return courses.filter((c) => {
      const isPassed = assessmentResults[c.id]?.passed;
      return !isPassed && c.progress < 100;
    });
  }, [courses, assessmentResults]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyId = (certId) => {
    navigator.clipboard.writeText(certId);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2000);
  };

  const handleDownloadHTML = (cert) => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Certificate - ${cert.title}</title>
  <style>
    body { font-family: 'DM Sans', sans-serif; background: #eae6da; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 20px; }
    .cert-frame { width: 920px; background: #fffefa; border: 12px double #2c362d; padding: 48px 56px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.15); box-sizing: border-box; }
    .logo { font-size: 14px; font-weight: 600; letter-spacing: 2px; color: #4f6b56; text-transform: uppercase; margin-bottom: 24px; }
    .kicker { font-size: 11px; letter-spacing: 3px; color: #6e7168; text-transform: uppercase; margin-bottom: 12px; }
    h1 { font-size: 32px; color: #22251f; margin: 0 0 8px; font-family: Georgia, serif; }
    .recipient-kicker { font-size: 12px; color: #6e7168; font-style: italic; margin: 24px 0 8px; }
    .recipient-name { font-size: 34px; font-weight: 700; color: #1a1c18; border-bottom: 2px solid #dcdcd2; display: inline-block; padding: 0 30px 8px; margin-bottom: 20px; font-family: Georgia, serif; }
    .description { font-size: 15px; line-height: 1.6; color: #50534c; max-width: 680px; margin: 0 auto 30px; }
    .meta-row { display: flex; justify-content: space-around; margin: 30px 0; border-top: 1px solid #dcdcd2; border-bottom: 1px solid #dcdcd2; padding: 15px 0; font-size: 12px; }
    .meta-item b { display: block; font-size: 14px; color: #22251f; margin-top: 4px; }
    .signatures { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; padding: 0 40px; }
    .sig-block { width: 220px; text-align: center; border-top: 1px solid #4f6b56; padding-top: 8px; font-size: 12px; }
    .sig-name { font-family: 'Brush Script MT', cursive, Georgia; font-size: 24px; color: #2c362d; margin-bottom: 4px; }
    .seal { width: 90px; height: 90px; border-radius: 50%; border: 3px dashed #d98045; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; color: #d98045; text-transform: uppercase; margin: 0 auto; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="cert-frame">
    <div class="logo">Capacity Connect Institute of Capability Building</div>
    <div class="kicker">Certificate of Completion &amp; Verified Competency</div>
    <h1>${cert.title}</h1>
    <div class="recipient-kicker">This credential is presented to</div>
    <div class="recipient-name">${cert.recipient}</div>
    <p class="description">${cert.description}</p>
    <div class="meta-row">
      <div class="meta-item"><span>ISSUE DATE</span><b>${cert.completedDate}</b></div>
      <div class="meta-item"><span>CREDENTIAL ID</span><b>${cert.id}</b></div>
      <div class="meta-item"><span>ASSESSED MASTERY</span><b>${cert.score}</b></div>
      <div class="meta-item"><span>VERIFICATION</span><b>OFFICIAL RECORD</b></div>
    </div>
    <div class="signatures">
      <div class="sig-block">
        <div class="sig-name">${cert.trainer}</div>
        <b>${cert.trainer}</b>
        <small style="display:block;color:#6e7168;">${cert.trainerTitle}</small>
      </div>
      <div class="seal">VERIFIED<br>OFFICIAL<br>CREDENTIAL</div>
      <div class="sig-block">
        <div class="sig-name">Dr. K. Raghavan</div>
        <b>Dr. K. Raghavan</b>
        <small style="display:block;color:#6e7168;">VP of Workforce Capability</small>
      </div>
    </div>
  </div>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Certificate-${cert.title.replace(/\s+/g, "_")}-${cert.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHead kicker="ACCREDITED RECOGNITION" title="Your earned certificates">
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="pill-completed" style={{ fontSize: 12 }}>
            <Icon name="Award" size={14} /> {allCertificates.length} Verified Credentials
          </span>
        </div>
      </PageHead>

      {/* Available Earned Certificates Grid */}
      <div className="certificate-grid">
        {allCertificates.map((cert) => (
          <article
            key={cert.id}
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              background: "#e8dfca",
              border: "1px solid #d5c9ae",
              padding: 30,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Icon name="Award" size={34} style={{ color: "var(--rust)" }} />
              <span
                style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: 10,
                  background: "#ded4be",
                  padding: "3px 8px",
                  borderRadius: 2,
                  color: "#5b5446",
                }}
              >
                {cert.id}
              </span>
            </div>

            <p className="eyebrow" style={{ marginTop: 16, marginBottom: 6 }}>
              CERTIFICATE OF COMPLETION
            </p>
            <h2 style={{ fontSize: "1.55rem", margin: "0 0 10px", color: "var(--ink)" }}>{cert.title}</h2>
            <p style={{ color: "#544e43", fontSize: 13, lineHeight: 1.5, margin: "0 0 12px" }}>
              {cert.area} · Completed {cert.completedDate}
            </p>
            <small style={{ color: "#6e685c", fontSize: 12, display: "block" }}>
              Trainer: {cert.trainer} · Mastery: <b>{cert.score}</b>
            </small>

            <div style={{ marginTop: "auto", paddingTop: 20, display: "flex", gap: 12, alignItems: "center" }}>
              <button
                className="button dark"
                onClick={() => setSelectedCert(cert)}
                style={{ fontSize: 12, height: 36 }}
              >
                View Certificate <Icon name="ArrowRight" size={14} />
              </button>
              <button
                className="button outline"
                onClick={() => handleDownloadHTML(cert)}
                title="Download HTML Certificate"
                style={{ fontSize: 12, height: 36, gap: 5 }}
              >
                <Icon name="Download" size={14} /> Download
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* In-Progress Certificates Roadmap */}
      {inProgressCerts.length > 0 && (
        <div style={{ marginTop: 45 }}>
          <p className="eyebrow">UPCOMING CERTIFICATES IN PROGRESS ({inProgressCerts.length})</p>
          <div style={{ display: "grid", gap: 14 }}>
            {inProgressCerts.map((c) => (
              <div
                key={c.id}
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--line)",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 4,
                      background: "#f3ede3",
                      color: "var(--orange)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Icon name="Lock" size={18} />
                  </div>
                  <div>
                    <b style={{ fontSize: 14, color: "var(--ink)" }}>{c.title} Professional Certificate</b>
                    <small style={{ color: "var(--muted)", display: "block", marginTop: 2 }}>
                      {c.modules.length - (c.completedModules?.length || 0)} lessons remaining to unlock credential
                    </small>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 140 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                      <span>Progress</span>
                      <b>{c.progress}%</b>
                    </div>
                    <div className="bar">
                      <i style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                  <button
                    className="button dark"
                    style={{ height: 34, fontSize: 12 }}
                    onClick={() => {
                      localStorage.setItem("capacity_selected_course", c.id);
                      setPage("Learning");
                    }}
                  >
                    Continue <Icon name="ArrowRight" size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Certificate Viewer & Print Modal */}
      {selectedCert &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="certificate-modal-overlay" onClick={() => setSelectedCert(null)}>
            <div
              className="certificate-modal-container"
              onClick={(e) => e.stopPropagation()}
              ref={printRef}
            >
              {/* Modal Controls Toolbar (Sticky at top, never cuts off or hides) */}
              <div className="certificate-modal-toolbar no-print">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="Award" size={20} style={{ color: "var(--orange)" }} />
                <b style={{ fontSize: 14 }}>Official Certificate Credential</b>
                <span style={{ fontSize: 11, color: "#aeb1a5", fontFamily: "DM Mono" }}>{selectedCert.id}</span>
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  className="button dark"
                  onClick={handlePrint}
                  style={{
                    background: "var(--green)",
                    borderColor: "var(--green)",
                    height: 32,
                    fontSize: 12,
                    gap: 6,
                  }}
                  title="Print or Save as PDF"
                >
                  <Icon name="Printer" size={14} /> Print / PDF
                </button>

                <button
                  className="button outline"
                  onClick={() => handleDownloadHTML(selectedCert)}
                  style={{ color: "#fff", borderColor: "#555a4e", height: 32, fontSize: 12, gap: 6 }}
                >
                  <Icon name="Download" size={14} /> Download HTML
                </button>

                <button
                  className="button outline"
                  onClick={() => handleCopyId(selectedCert.id)}
                  style={{ color: "#fff", borderColor: "#555a4e", height: 32, fontSize: 12, gap: 6 }}
                  title="Copy verification ID"
                >
                  <Icon name={copiedNotice ? "Check" : "Copy"} size={14} />
                  {copiedNotice ? "Copied ✓" : "Copy ID"}
                </button>

                <button
                  onClick={() => setSelectedCert(null)}
                  style={{
                    color: "#fff",
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 4,
                    padding: "6px 12px",
                    cursor: "pointer",
                    marginLeft: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 12,
                  }}
                  title="Close viewer"
                >
                  <Icon name="X" size={16} /> Close
                </button>
              </div>
            </div>

            {/* Printable Certificate Frame */}
            <div className="printable-certificate" style={{ padding: "30px" }}>
              <div
                className="certificate-paper"
                style={{
                  background: "#fffefa",
                  border: "12px double #23261f",
                  padding: "45px 50px",
                  textAlign: "center",
                  position: "relative",
                  boxShadow: "inset 0 0 0 2px #c49d48",
                }}
              >
                {/* Organization Seal / Branding */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <Brand />
                </div>

                <div
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "var(--green)",
                    textTransform: "uppercase",
                    marginBottom: 10,
                    fontWeight: 500,
                  }}
                >
                  ACCREDITED WORKFORCE CAPABILITY INSTITUTE
                </div>

                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 28,
                    fontWeight: 500,
                    color: "var(--ink)",
                    margin: "0 0 6px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Certificate of Competence &amp; Mastery
                </div>

                <p style={{ fontStyle: "italic", color: "var(--muted)", fontSize: 13, margin: "16px 0 10px" }}>
                  This official credential is systematically awarded to
                </p>

                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 34,
                    fontWeight: 700,
                    color: "#181a16",
                    borderBottom: "2px solid #d5c9ae",
                    display: "inline-block",
                    padding: "0 40px 8px",
                    marginBottom: 18,
                  }}
                >
                  {selectedCert.recipient}
                </div>

                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "#4a4e44",
                    maxWidth: 620,
                    margin: "0 auto 24px",
                  }}
                >
                  for verified completion of comprehensive modular pathways, role-based benchmark evaluations, and demonstrated capability excellence in <b>{selectedCert.title}</b>.
                </p>

                {/* Metadata Row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 12,
                    borderTop: "1px solid var(--line)",
                    borderBottom: "1px solid var(--line)",
                    padding: "14px 0",
                    margin: "24px 0",
                    fontSize: 11,
                    fontFamily: "DM Mono, monospace",
                  }}
                >
                  <div>
                    <span style={{ color: "var(--muted)", display: "block" }}>ISSUE DATE</span>
                    <strong style={{ color: "var(--ink)", fontSize: 13 }}>{selectedCert.completedDate}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--muted)", display: "block" }}>CREDENTIAL ID</span>
                    <strong style={{ color: "var(--ink)", fontSize: 13 }}>{selectedCert.id}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--muted)", display: "block" }}>ASSESSED SCORE</span>
                    <strong style={{ color: "var(--green)", fontSize: 13 }}>{selectedCert.score} (Mastery)</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--muted)", display: "block" }}>STATUS</span>
                    <strong style={{ color: "var(--green)", fontSize: 13 }}>VERIFIED RECORD</strong>
                  </div>
                </div>

                {/* Signatures & Seal */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginTop: 35,
                    padding: "0 20px",
                  }}
                >
                  {/* Facilitator signature */}
                  <div style={{ width: 190, textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "Georgia, cursive",
                        fontSize: 22,
                        fontStyle: "italic",
                        color: "#242821",
                        marginBottom: 4,
                      }}
                    >
                      {selectedCert.trainer}
                    </div>
                    <div style={{ borderTop: "1px solid #4f6b56", paddingTop: 6, fontSize: 11 }}>
                      <b>{selectedCert.trainer}</b>
                      <small style={{ color: "var(--muted)", fontSize: 10 }}>{selectedCert.trainerTitle}</small>
                    </div>
                  </div>

                  {/* Gold Rosette Seal */}
                  <div
                    style={{
                      width: 82,
                      height: 82,
                      borderRadius: "50%",
                      border: "3px dashed #c49d48",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#997321",
                      fontSize: 8,
                      fontFamily: "DM Mono",
                      fontWeight: "bold",
                      letterSpacing: 1,
                      textAlign: "center",
                      boxShadow: "0 0 10px rgba(196, 157, 72, 0.2)",
                    }}
                  >
                    <span>OFFICIAL</span>
                    <span style={{ fontSize: 10, margin: "2px 0" }}>★ ★ ★</span>
                    <span>CREDENTIAL</span>
                  </div>

                  {/* Director signature */}
                  <div style={{ width: 190, textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "Georgia, cursive",
                        fontSize: 22,
                        fontStyle: "italic",
                        color: "#242821",
                        marginBottom: 4,
                      }}
                    >
                      Dr. K. Raghavan
                    </div>
                    <div style={{ borderTop: "1px solid #4f6b56", paddingTop: 6, fontSize: 11 }}>
                      <b>Dr. K. Raghavan</b>
                      <small style={{ color: "var(--muted)", fontSize: 10 }}>VP of Workforce Capability</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
