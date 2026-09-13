import { AppIcon as Icon } from "./AppIcon";
import { PageHead } from "./PageHead";

export function GenericPage({ page, title, text }) {
  return (
    <>
      <PageHead kicker="CAPACITY CONNECT" title={title} />
      <section className="empty">
        <Icon name="Layers3" size={34} />
        <h2>{page} workspace</h2>
        <p>{text}</p>
        <button className="button outline">View activity</button>
      </section>
    </>
  );
}
