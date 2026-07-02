import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { adminDashboardContent } from "../../content/adminDashboard.content.js";
import { adminActionService } from "../../api/adminAction.service.js";
import { getActionDescription } from "../../utils/adminAction.utils.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";

import "../../styles/pages/admin-user-actions.scss";

export default function AdminUserActions() {
  const { id } = useParams();

  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  const content = adminDashboardContent.actions.userHistory;

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const data = await adminActionService.getByUser(id);
        setActions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActions();
  }, [id]);

  if (loading) {
    return <AdminLoading text={content.loading} />;
  }

  const targetUser = actions[0]?.targetUser;

  return (
    <section className="page-section admin-user-actions-page">
      <AdminPageHeader
        eyebrow={content.eyebrow}
        title={targetUser?.pseudo || content.fallbackUser}
        subtitle={content.subtitle}
      >
        <Link className="btn btn-secondary" to={content.backToUsersPath}>
          {content.backToUsers}
        </Link>
      </AdminPageHeader>

      <div className="admin-user-actions-list">
        {actions.length === 0 ? (
          <AdminEmptyState text={content.empty} />
        ) : (
          actions.map((action) => (
            <article
              key={action._id}
              className="paper-card admin-user-action-card"
            >
              <h3>{getActionDescription(action)}</h3>

              <p className="text-muted">
                {new Date(action.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              {action.comment && <blockquote>{action.comment}</blockquote>}
            </article>
          ))
        )}
      </div>

      <PageFooterNavigation
        backTo={content.backToUsersPath}
        backLabel={content.backToUsers}
      />
    </section>
  );
}
