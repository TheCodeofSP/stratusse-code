import { useEffect, useMemo, useState } from "react";

import { adminDashboardContent } from "../../content/adminDashboard.content.js";
import { adminActionService } from "../../api/adminAction.service.js";
import { getActionDescription } from "../../utils/adminAction.utils.js";

import AdminFilterBar from "../../components/admin/AdminFilterBar.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";

import "../../styles/pages/admin-actions.scss";

export default function AdminActions() {
  const [actions, setActions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const content = adminDashboardContent.actions;

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const data = await adminActionService.getAll();
        setActions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActions();
  }, []);

  const filteredActions = useMemo(() => {
    if (filter === "all") return actions;

    return actions.filter(
      (action) => content.groupByAction[action.actionType] === filter,
    );
  }, [actions, filter, content.groupByAction]);

  if (loading) {
    return <AdminLoading text={content.loading} />;
  }

  return (
    <section className="page-section admin-actions-page">
      <AdminPageHeader
        eyebrow={content.header.eyebrow}
        title={content.header.title}
        subtitle={content.header.subtitle}
      />

      <AdminFilterBar
        filters={Object.entries(content.groups).map(([value, label]) => ({
          value,
          label,
        }))}
        value={filter}
        onChange={setFilter}
        className="admin-actions-filters"
      />

      <div className="admin-actions-list">
        {filteredActions.length === 0 ? (
          <AdminEmptyState text={content.empty} />
        ) : (
          filteredActions.map((action) => (
            <article key={action._id} className="paper-card admin-action-card">
              <div className="admin-action-card__header">
                <span
                  className={`admin-action-badge admin-action-badge--${
                    content.groupByAction[action.actionType] || "all"
                  }`}
                >
                  {content.labels[action.actionType] || action.actionType}
                </span>

                <time>
                  {new Date(action.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>

              <div className="admin-action-card__body">
                <p className="admin-action-description">
                  {getActionDescription(action)}
                </p>

                {action.comment && (
                  <p className="admin-action-comment info-panel info-panel--warningt">
                    “{action.comment}”
                  </p>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
