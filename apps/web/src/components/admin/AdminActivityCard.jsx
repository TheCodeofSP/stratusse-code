export default function AdminActivityCard({
  title,
  children,
}) {
  return (
    <article className="paper-card">
      <h2>{title}</h2>

      {children}
    </article>
  );
}