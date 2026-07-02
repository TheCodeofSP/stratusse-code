export default function AdminStatCard({
  value,
  label,
}) {
  return (
    <div className="paper-card admin-dashboard-overview-card">
      <strong>{value}</strong>

      <span>{label}</span>
    </div>
  );
}