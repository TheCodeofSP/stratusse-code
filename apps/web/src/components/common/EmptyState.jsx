import { Link } from "react-router-dom";

import "./empty-state.scss";

export default function EmptyState({
  icon,
  title,
  text,
  buttonLabel,
  buttonTo,
  variant = "default",
}) {
  return (
    <section className={`empty-state empty-state--${variant}`}>
      {icon && <div className="empty-state__icon">{icon}</div>}

      <h2 className="empty-state__title">{title}</h2>

      <p className="empty-state__text">{text}</p>

      {buttonLabel && buttonTo && (
        <Link to={buttonTo} className="btn btn-primary">
          {buttonLabel}
        </Link>
      )}
    </section>
  );
}
