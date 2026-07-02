export default function AdminPageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <header className="page-header">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}

      <h1>{title}</h1>

      {subtitle && <p className="text-muted">{subtitle}</p>}

      {children}
    </header>
  );
}