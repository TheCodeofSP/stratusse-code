import "./status-badge.scss";

export default function StatusBadge({ label, variant = "default" }) {
  return (
    <span className={`status-badge status-badge--${variant}`}>{label}</span>
  );
}