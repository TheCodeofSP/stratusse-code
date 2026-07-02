import { Link } from "react-router-dom";

import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";

import "../../styles/pages/admin-content.scss";

const content = adminDashboardContent.adminContent.home;

export default function AdminContent() {
  return (
    <section className="page-section admin-content-page">
      <AdminPageHeader
        title={content.header.title}
        subtitle={content.header.subtitle}
      />

      <div className="admin-content-grid">
        {content.sections.map((section) => (
          <Link
            key={section.title}
            to={section.link}
            className="admin-content-card"
          >
            <div className="admin-dashboard-category__title">
              <span className="admin-content-icon">{section.icon}</span>

              <h2>{section.title}</h2>
            </div>
            <p className="admin-content-description">{section.description}</p>

            <p className="admin-content-details">{section.details}</p>

            <span className="admin-content-link">{content.actionLabel}</span>
          </Link>
        ))}
      </div>

      <PageFooterNavigation
        backTo={content.footer.backTo}
        backLabel={content.footer.backLabel}
      />
    </section>
  );
}
