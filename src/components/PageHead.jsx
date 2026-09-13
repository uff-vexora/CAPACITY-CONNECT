export function PageHead({ kicker, title, children }) {
  return (
    <div className="page-head">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
}
