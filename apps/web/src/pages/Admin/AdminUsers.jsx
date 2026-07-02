import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { adminUserService } from "../../api/adminUser.service.js";
import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminFilterBar from "../../components/admin/AdminFilterBar.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";

import "../../styles/pages/admin-users.scss";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const content = adminDashboardContent.users;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminUserService.getAll();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !search ||
      user.pseudo?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "deleted") return user.isDeleted;
    if (filter === "all") return true;

    return user.role === filter && !user.isDeleted;
  });

  const getUserStatus = (user) => {
    if (user.isDeleted) return content.status.deleted;
    return content.status[user.role] || content.status.observer;
  };

  if (loading) {
    return <AdminLoading text={content.loading} />;
  }

  return (
    <section className="page-section admin-users-page">
      <AdminPageHeader
        title={content.header.title}
        subtitle={content.header.subtitle}
      />

      <div className="form-group">
        <input
          className="form-select"
          type="text"
          placeholder={content.search.placeholder}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <AdminFilterBar
        filters={content.filters}
        value={filter}
        onChange={setFilter}
        className="admin-users-filter"
      />

      <div className="admin-users-grid">
        {filteredUsers.length === 0 ? (
          <AdminEmptyState text="Aucun membre à afficher." />
        ) : (
          filteredUsers.map((user) => (
            <Link
              key={user._id}
              to={`/admin/users/${user._id}`}
              className={`paper-card admin-user-card admin-card admin-card-hover admin-card-accent ${
                user.isDeleted ? "is-deleted" : ""
              }`}
            >
              <div className="admin-user-header">
                <div>
                  <h3>{user.pseudo}</h3>
                  <p>{user.email}</p>
                </div>

                <StatusBadge
                  label={getUserStatus(user).label}
                  variant={getUserStatus(user).variant}
                />
              </div>

              <div className="admin-user-meta">
                {user.isDeleted ? (
                  <>
                    {user.deletedAt && (
                      <p className="text-muted">
                        {content.card.deletedAtPrefix}{" "}
                        {new Date(user.deletedAt).toLocaleDateString("fr-FR")}
                      </p>
                    )}

                    {user.deletionComment && (
                      <p className="admin-user-deletion-comment info-panel info-panel--danger">
                        “{user.deletionComment}”
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p>
                      {content.card.registeredAtPrefix}{" "}
                      {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                    </p>

                    {user.creatorApproval?.isApproved && (
                      <div className="admin-user-approved">
                        <p>{content.card.approvedCreator}</p>

                        <span>
                          {content.card.approvedByPrefix}{" "}
                          {user.creatorApproval?.approvedBy?.pseudo ||
                            content.card.fallbackAdmin}
                        </span>

                        <span>
                          {new Date(
                            user.creatorApproval?.approvedAt,
                          ).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Link>
          ))
        )}
      </div>

      <PageFooterNavigation
        backTo={content.footer.backTo}
        backLabel={content.footer.backLabel}
      />
    </section>
  );
}
