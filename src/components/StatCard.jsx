export function StatCard({ value, label, detail }) {
  return (
    <div className="metric">
      <b>{value}</b>
      <span>{label}</span>
      {detail && <small>{detail}</small>}
    </div>
  );
}
