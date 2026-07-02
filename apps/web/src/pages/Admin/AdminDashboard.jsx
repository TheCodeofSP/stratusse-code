import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { adminDashboardService } from "../../api/adminDashboard.service.js";
import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminStatCard from "../../components/admin/AdminStatCard.jsx";

import "../../styles/pages/admin-dashboard.scss";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    notesCount: 0,
    booksCount: 0,
    commentsCount: 0,
    libraryCommentsCount: 0,
    usersCount: 0,
    deletedUsersCount: 0,
    actionsCount: 0,
    creatorRequests: {
      pending: 0,
      approved: 0,
      rejected: 0,
    },
    creatorsCount: 0,
    publishedNotesCount: 0,
    publishedBooksCount: 0,
    pendingCreatorRequestsCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminDashboardService.getStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  const getStatValue = (path) => {
    return path.split(".").reduce((obj, key) => obj?.[key], stats) ?? 0;
  };

  return (
    <section className="page-section admin-dashboard-page">
      <AdminPageHeader
        title={adminDashboardContent.header.title}
        subtitle={adminDashboardContent.header.subtitle}
      />

      <div className="admin-dashboard-overview">
        <AdminStatCard
          value={stats.usersCount}
          label={adminDashboardContent.overview.members}
        />

        <AdminStatCard
          value={stats.creatorsCount}
          label={adminDashboardContent.overview.creators}
        />

        <AdminStatCard
          value={stats.publishedNotesCount}
          label={adminDashboardContent.overview.notes}
        />

        <AdminStatCard
          value={stats.publishedBooksCount}
          label={adminDashboardContent.overview.library}
        />
      </div>

      {stats.pendingCreatorRequestsCount > 0 && (
        <div className="paper-card admin-dashboard-alert">
          <h2>{adminDashboardContent.alert.title}</h2>

          <p>
            {stats.pendingCreatorRequestsCount}{" "}
            {adminDashboardContent.alert.text}
          </p>

          <Link className="btn btn-primary" to={adminDashboardContent.alert.to}>
            {adminDashboardContent.alert.actionLabel}
          </Link>
        </div>
      )}

      <div className="admin-dashboard-category-grid">
        {adminDashboardContent.sections.map((section) => (
          <article key={section.key} className="admin-dashboard-category">
            <div className="admin-dashboard-category__header">
              <div className="admin-dashboard-category__title">
                <span>{section.icon}</span>
                <h2>{section.title}</h2>
              </div>

              <p>{section.description}</p>
            </div>

            <div className="admin-dashboard-category__stats">
              {section.stats.map((stat) => (
                <div key={stat.label} className="admin-dashboard-mini-stat">
                  <strong>{getStatValue(stat.valueKey)}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="admin-dashboard-category__links">
              {section.links.map((link) => (
                <Link key={link.to} to={link.to} className="btn btn-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>

      <PageFooterNavigation />
    </section>
  );
}
