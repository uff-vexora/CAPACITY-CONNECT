import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
export function Certificates() {
  return (
    <>
      <PageHead kicker="RECOGNITION" title="Your earned certificates" />
      <div className="certificate-grid">
        {["Operational Safety Readiness", "Process Excellence Foundations"].map(
          (c, i) => (
            <article key={c}>
              <Icon name="Award" size={34} />
              <p className="eyebrow">CERTIFICATE OF COMPLETION</p>
              <h2>{c}</h2>
              <p>
                {i ? "Technical competency" : "Safety competency"} · Completed{" "}
                {i ? "03 Jul 2026" : "18 Aug 2026"}
              </p>
              <small>Trainer: {i ? "Vikram Singh" : "Priya Nair"}</small>
              <button className="text-button">View certificate →</button>
            </article>
          ),
        )}
      </div>
    </>
  );
}
