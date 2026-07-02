import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { adminActionService } from "../../api/adminAction.service.js";
import { getActionDescription } from "../../utils/adminAction.utils.js";
import { adminUserService } from "../../api/adminUser.service.js";
import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import RoleChangeModal from "../../components/admin/RoleChangeModal.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";
import AdminUserActivityLinks from "../../components/admin/AdminUserActivityLinks";

import "../../styles/pages/admin-user-detail.scss";

const roleLabels = adminDashboardContent.vocabulary?.roles || {};

export default function AdminUserDetail() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [actions, setActions] = useState([]);

  const content = adminDashboardContent.userDetail;

  const fetchUserDetail = async () => {
    try {
      const [userData, activityData, actionsData] = await Promise.all([
        adminUserService.getById(id),
        adminUserService.getActivitySummary(id),
        adminActionService.getByUser(id),
      ]);

      setUser(userData);
      setActivity(activityData);
      setActions(actionsData);
    } catch (error) {
      console.error(error);
      toast.error(content.messages.loadError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  const handleRoleChange = async (role, comment = "") => {
    if (!role) return;

    try {
      await adminUserService.updateRole(id, role, comment);

      await fetchUserDetail();

      toast.success(content.messages.roleSuccess);

      setIsRoleModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(content.messages.roleError);
    }
  };

  if (loading) {
    return <AdminLoading text={content.loading} />;
  }

  if (!user) {
    return <p>{content.notFound}</p>;
  }

  return (
    <section className="page-section admin-user-detail-page">
      <AdminPageHeader
        eyebrow={content.header.eyebrow}
        title={user.pseudo}
        subtitle={user.email}
      />

      <div className="admin-user-detail-grid">
        <article className="paper-card admin-user-detail-card">
          <h2>{content.sections.information}</h2>

          <dl className="admin-user-detail-list">
            <div>
              <dt>{content.fields.role}</dt>
              <dd>{roleLabels[user.role] || user.role}</dd>
            </div>

            <div>
              <dt>{content.fields.registeredAt}</dt>
              <dd>{new Date(user.createdAt).toLocaleDateString("fr-FR")}</dd>
            </div>

            <div>
              <dt>{content.fields.emailVerified}</dt>
              <dd>
                {user.isEmailVerified ? content.values.yes : content.values.no}
              </dd>
            </div>

            {user.emailVerifiedAt && (
              <div>
                <dt>{content.fields.emailVerifiedAt}</dt>
                <dd>
                  {new Date(user.emailVerifiedAt).toLocaleDateString("fr-FR")}
                </dd>
              </div>
            )}

            <div>
              <dt>{content.fields.deletedAccount}</dt>
              <dd>{user.isDeleted ? content.values.yes : content.values.no}</dd>
            </div>

            {user.deletedAt && (
              <div>
                <dt>{content.fields.deletedAt}</dt>
                <dd>{new Date(user.deletedAt).toLocaleDateString("fr-FR")}</dd>
              </div>
            )}

            {user.deletionComment && (
              <div>
                <dt>{content.fields.deletionComment}</dt>
                <dd>{user.deletionComment}</dd>
              </div>
            )}
          </dl>
        </article>

        <article className="paper-card admin-user-detail-card">
          <h2>{content.sections.activity}</h2>

          <AdminUserActivityLinks
            items={[
              {
                to: `/admin/users/${id}/notes`,
                count: activity?.notesCount || 0,
                label: content.activity.notes,
              },
              {
                to: `/admin/users/${id}/library`,
                count: activity?.booksCount || 0,
                label: content.activity.library,
              },
              {
                to: `/admin/users/${id}/comments`,
                count: activity?.noteCommentsCount || 0,
                label: content.activity.comments,
              },
              {
                to: `/admin/users/${id}/library-comments`,
                count: activity?.libraryCommentsCount || 0,
                label: content.activity.libraryComments,
              },
            ]}
          />
        </article>

        <article className="paper-card admin-user-detail-card">
          <h2>{content.sections.roleChange}</h2>

          <div className="admin-user-current-role">
            <span className="text-muted">{content.role.current}</span>
            <strong>{roleLabels[user.role] || user.role}</strong>
          </div>

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setIsRoleModalOpen(true)}
          >
            {content.role.changeAction}
          </button>
        </article>

        <article className="paper-card admin-user-detail-card admin-user-history-card">
          <h2>{content.sections.history}</h2>

          {actions.length === 0 ? (
            <AdminEmptyState text={content.history.empty} />
          ) : (
            <div className="admin-user-history-list">
              {actions.slice(0, 5).map((action) => (
                <div key={action._id} className="admin-user-history-item">
                  <div className="admin-user-history-dot" />

                  <div>
                    <h3>{getActionDescription(action)}</h3>

                    <p className="text-muted">
                      {new Date(action.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    {action.comment && (
                      <blockquote>{action.comment}</blockquote>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {actions.length > 5 && (
            <a
              className="btn btn-secondary"
              href={`/admin/users/${id}/actions`}
            >
              {content.history.viewAll}
            </a>
          )}
        </article>
      </div>

      <RoleChangeModal
        isOpen={isRoleModalOpen}
        user={user}
        role={user?.role}
        onClose={() => setIsRoleModalOpen(false)}
        onConfirm={handleRoleChange}
      />

      <PageFooterNavigation
        backTo={content.footer.backTo}
        backLabel={content.footer.backLabel}
      />
    </section>
  );
}
