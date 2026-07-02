import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { adminCreatorRequestService } from "../../api/adminCreatorRequest.service.js";
import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import AdminPageHeader from "../../components/admin/AdminPageHeader.jsx";
import AdminLoading from "../../components/admin/AdminLoading.jsx";
import AdminEmptyState from "../../components/admin/AdminEmptyState.jsx";

import "../../styles/pages/admin-creator-request-detail.scss";

export default function AdminCreatorRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [adminComment, setAdminComment] = useState("");
  const [loading, setLoading] = useState(true);

  const content = adminDashboardContent.creatorRequests;

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await adminCreatorRequestService.getById(id);
        setRequest(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  const handleApprove = async () => {
    if (!adminComment.trim()) {
      toast.error(content.decision.required);
      return;
    }

    try {
      await adminCreatorRequestService.approve(id, {
        comment: adminComment.trim(),
      });

      toast.success(content.decision.approveSuccess);
      navigate("/admin/creator-requests");
    } catch (error) {
      console.error(error);
      toast.error(content.decision.approveError);
    }
  };

  const handleReject = async () => {
    if (!adminComment.trim()) {
      toast.error(content.decision.required);
      return;
    }

    try {
      await adminCreatorRequestService.reject(id, {
        rejectionReason: adminComment.trim(),
        comment: adminComment.trim(),
      });

      toast.success(content.decision.rejectSuccess);
      navigate("/admin/creator-requests");
    } catch (error) {
      console.error(error);
      toast.error(content.decision.rejectError);
    }
  };

  if (loading) {
    return <AdminLoading text={content.loading} />;
  }

  if (!request) {
    return (
      <section className="page-section">
        <AdminEmptyState text="Demande introuvable." />
      </section>
    );
  }

  return (
    <section className="page-section admin-request-detail-page">
      <AdminPageHeader
        eyebrow="Demande créateur"
        title={request.user?.pseudo || "Membre"}
        subtitle={request.user?.email}
      >
        <StatusBadge
          label={content.status[request.status]?.label}
          variant={content.status[request.status]?.variant}
        />
      </AdminPageHeader>

      <div className="admin-request-detail-card">
        <section className="admin-request-detail-section">
          <h2>{content.detail.motivation}</h2>
          <p>{request.motivation}</p>
        </section>

        <section className="admin-request-detail-section">
          <h2>{content.detail.writingIntent}</h2>

          <ul>
            {request.writingIntent?.notes && <li>{content.detail.notes}</li>}
            {request.writingIntent?.books && <li>{content.detail.library}</li>}
          </ul>
        </section>

        <section className="admin-request-detail-section">
          <h2>{content.detail.firstContribution}</h2>

          {request.firstContribution?.title && (
            <h3>{request.firstContribution.title}</h3>
          )}

          <p>{request.firstContribution?.content}</p>
        </section>

        <section className="admin-request-detail-section">
          <h2>{content.detail.suggestions}</h2>
          <p>{request.improvementIdeas || content.detail.noSuggestion}</p>
        </section>
      </div>

      {request.status === "pending" && (
        <section className="paper-card admin-request-decision">
          <div className="form-group">
            <label className="form-label">{content.decision.title}</label>

            <textarea
              className="form-textarea"
              placeholder={content.decision.placeholder}
              value={adminComment}
              onChange={(event) => setAdminComment(event.target.value)}
              required
            />
          </div>

          <div className="editor-actions">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleApprove}
            >
              {content.decision.approve}
            </button>

            <button
              className="btn btn-ghost"
              type="button"
              onClick={handleReject}
            >
              {content.decision.reject}
            </button>
          </div>
        </section>
      )}

      <PageFooterNavigation
        backTo="/admin/creator-requests"
        backLabel="Retour aux demandes"
      />
    </section>
  );
}
