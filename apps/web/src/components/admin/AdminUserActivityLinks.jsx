import { Link } from "react-router-dom";

export default function AdminUserActivityLinks({
  items,
}) {
  return (
    <div className="admin-user-activity-grid">
      {items.map((item) => (
        <Link key={item.to} to={item.to}>
          <strong>{item.count}</strong>

          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}