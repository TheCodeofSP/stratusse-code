import { Link } from "react-router-dom";

import { navigationFooterContent } from "../../content/navigation-footer.content.js";

import "../../styles/components/page-footer-navigation.scss";

export default function PageFooterNavigation({
  backTo,
  backLabel,
  homeLabel = navigationFooterContent.homeLabel,
}) {
  return (
    <nav
      className={`page-footer-navigation ${
        !backTo ? "page-footer-navigation--home-only" : ""
      }`}
    >
      {backTo && (
        <Link className="btn btn-secondary" to={backTo}>
          ← {backLabel}
        </Link>
      )}

      <Link className="btn btn-primary" to="/">
        {homeLabel}
      </Link>
    </nav>
  );
}