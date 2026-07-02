import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { adminCreatorRequestService } from "../../api/adminCreatorRequest.service.js";
import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminFilterBar from "../../components/admin/AdminFilterBar.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";

import "../../styles/pages/admin-creator-requests.scss";

export default function AdminCreatorRequests() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const content = adminDashboardContent.creatorRequests;

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const pending = await adminCreatorRequestService.getAll();
      const history = await adminCreatorRequestService.getHistory();

      setRequests([...pending, ...history]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = requests.filter((request) => {
    if (filter === "all") return true;
    return request.status === filter;
  });

  if (loading) {
    return <AdminLoading text={content.loading} />;
  }

  return (
    <section className="page-section admin-creator-page">
      <AdminPageHeader
        title={content.header.title}
        subtitle={content.header.subtitle}
      ></AdminPageHeader>

      <AdminFilterBar
        filters={content.filters}
        value={filter}
        onChange={setFilter}
      />

      <div className="admin-request-grid">
        {filteredRequests.length === 0 ? (
          <AdminEmptyState text="Aucune demande à afficher." />
        ) : (
          filteredRequests.map((request) => (
            <div
              key={request._id}
              className="admin-request-card admin-card admin-card-hover admin-card-accent"
            >
              <div className="admin-request-header">
                <div className="admin-request-user">
                  <h3>{request.user?.pseudo}</h3>
                  <p>{request.user?.email}</p>
                </div>

                <StatusBadge
                  label={content.status[request.status]?.label}
                  variant={content.status[request.status]?.variant}
                />
              </div>

              <p className="admin-request-preview">{request.motivation}</p>

              <Link
                className="btn btn-secondary"
                to={`/admin/creator-requests/${request._id}`}
              >
                {content.card.read}
              </Link>
            </div>
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
