export default function AdminFilterBar({
  filters,
  value,
  onChange,
  className = "admin-filter-bar",
}) {
  return (
    <div className={className}>
      {filters.map((item) => (
        <button
          key={item.value}
          className={`btn ${
            value === item.value ? "btn-primary" : "btn-secondary"
          }`}
          type="button"
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}