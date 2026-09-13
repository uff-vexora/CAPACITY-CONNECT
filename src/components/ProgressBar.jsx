export function ProgressBar({ value, tone = "", className = "" }) {
  return (
    <div className={`bar ${className}`}>
      <i className={tone} style={{ width: `${value}%` }} />
    </div>
  );
}
