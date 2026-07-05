import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext.jsx";
import { profileService } from "../../api/profile.service.js";
import { profileContent } from "../../content/profile.content.js";
import { seoContent } from "../../content/seo.content.js";

import { creatorRequestService } from "../../api/creatorRequest.service";

import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import SEO from "../../components/seo/SEO.jsx";

import "../../styles/pages/profile.scss";

export default function Profile() {
  const { user } = useAuth();

  const [creatorRequest, setCreatorRequest] = useState(null);

  const [stats, setStats] = useState({
    notes: {
      draftsCount: 0,
      publishedCount: 0,
      peopleReached: 0,
      commentsCount: 0,
      reactionsCount: 0,
    },
    books: {
      draftsCount: 0,
      publishedCount: 0,
      peopleInfluenced: 0,
      commentsCount: 0,
      reactionsCount: 0,
    },
  });

  const content = profileContent.profile;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await profileService.getStats();

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCreatorRequest = async () => {
      try {
        const data = await creatorRequestService.getMine();

        const requestData = data?.request || data;

        setCreatorRequest(requestData?.status ? requestData : null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
    fetchCreatorRequest();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <SEO
        title={seoContent.pages.login.title}
        description={seoContent.pages.login.description}
        robots={seoContent.pages.login.robots}
        url={`${seoContent.site.url}/login`}
      />
      <section className="profile-page">
        <div className="paper-card profile-card">
          <div className="stack-md">
            <span className="profile-eyebrow">{content.eyebrow}</span>

            <h1 className="profile-title">{profileContent.page.title}</h1>

            <p className="profile-subtitle text-muted">
              {profileContent.page.subtitle}
            </p>
          </div>

          <div className="profile-activity">
            <div className="profile-info">
              <div>
                <span className="profile-label">{content.labels.pseudo}</span>
                <p>{user?.pseudo || content.fallbacks.notProvided}</p>
              </div>

              <div>
                <span className="profile-label">{content.labels.email}</span>
                <p>{user?.email || content.fallbacks.notProvided}</p>
              </div>
            </div>

            <div>
              <span className="profile-label">{content.labels.role}</span>

              <p>
                {content.roleLabels[user?.role] || content.roleLabels.observer}
              </p>
            </div>

            <div>
              <span className="profile-label">{content.labels.status}</span>

              {user?.role === "observer" && (
                <div className="stack-sm">
                  {creatorRequest?.status === "pending" && (
                    <>
                      <p>
                        {content.creatorRequestStatus.pending.datePrefix}{" "}
                        {formatDate(creatorRequest.createdAt)}
                      </p>

                      <p className="text-muted">
                        {content.creatorRequestStatus.pending.text}
                      </p>
                    </>
                  )}

                  {creatorRequest?.status === "rejected" && (
                    <>
                      <p>
                        {content.creatorRequestStatus.rejected.datePrefix}{" "}
                        {formatDate(
                          creatorRequest.updatedAt || creatorRequest.createdAt,
                        )}
                      </p>

                      <p className="text-muted">
                        {content.creatorRequestStatus.rejected.reasonPrefix}{" "}
                        {creatorRequest.rejectionReason ||
                          content.creatorRequestStatus.rejected.fallbackReason}
                      </p>

                      <Link
                        className="btn btn-secondary"
                        to={content.creatorRequestStatus.rejected.retryTo}
                      >
                        {content.creatorRequestStatus.rejected.retryButton}
                      </Link>
                    </>
                  )}

                  {!creatorRequest && (
                    <>
                      <p>
                        {content.creatorRequestStatus.observer.datePrefix}{" "}
                        {formatDate(user.createdAt)}
                      </p>

                      <Link
                        className="btn btn-primary btn-request-creator-profile"
                        to={content.creatorRequestStatus.observer.requestTo}
                      >
                        {content.creatorRequestStatus.observer.requestButton}
                      </Link>
                    </>
                  )}
                </div>
              )}

              {user?.role === "creator" && (
                <div className="stack-sm">
                  <p>{content.creatorRequestStatus.creator.title}</p>

                  {user?.creatorApproval?.approvedBy && (
                    <p className="text-muted">
                      {content.creatorRequestStatus.creator.approvedByPrefix}{" "}
                      {user.creatorApproval.approvedBy?.pseudo ||
                        user.creatorApproval.approvedBy}
                    </p>
                  )}

                  {user?.creatorApproval?.approvedAt && (
                    <p className="text-muted">
                      {content.creatorRequestStatus.creator.approvedAtPrefix}{" "}
                      {formatDate(user.creatorApproval.approvedAt)}
                    </p>
                  )}
                </div>
              )}

              {user?.role === "admin" && (
                <p>{content.creatorRequestStatus.admin.title}</p>
              )}
            </div>

            <div className="home-interlude" aria-hidden="true">
              <span />
            </div>

            {user?.role === "observer" && (
              <div className="profile-participation-summary paper-card">
                <h2>{content.activity.title}</h2>

                <div className="profile-summary-list">
                  <p>
                    {content.activity.notesPrefix}{" "}
                    <strong>{stats.notes.commentsCount}</strong>{" "}
                    {content.activity.commentsLabel}
                    {stats.notes.commentsCount > 1 ? "s" : ""}{" "}
                    {content.activity.leftLabel}
                    {stats.notes.commentsCount > 1 ? "s" : ""}{" "}
                    {content.activity.andLabel}{" "}
                    <strong>{stats.notes.reactionsCount}</strong>{" "}
                    {content.activity.reactionLabel}
                    {stats.notes.reactionsCount > 1 ? "s" : ""}.
                  </p>

                  <p>
                    {content.activity.libraryPrefix}{" "}
                    <strong>{stats.books.commentsCount}</strong>{" "}
                    {content.activity.commentsLabel}
                    {stats.books.commentsCount > 1 ? "s" : ""}{" "}
                    {content.activity.leftLabel}
                    {stats.books.commentsCount > 1 ? "s" : ""}{" "}
                    {content.activity.andLabel}{" "}
                    <strong>{stats.books.reactionsCount}</strong>{" "}
                    {content.activity.reactionLabel}
                    {stats.books.reactionsCount > 1 ? "s" : ""}.
                  </p>
                </div>
              </div>
            )}

            {(user?.role === "creator" || user?.role === "admin") && (
              <>
                <div className="profile-writing-summary note-card">
                  <h2 className="profile-summary-title">
                    {content.writingStats.notesTitle}
                  </h2>

                  <ul className="profile-summary-list">
                    <li>
                      <strong>{stats.notes.draftsCount}</strong>{" "}
                      {content.writingStats.draftLabel}
                      {stats.notes.draftsCount > 1 ? "s" : ""}{" "}
                      {content.writingStats.pendingLabel}
                    </li>

                    <li>
                      <strong>{stats.notes.publishedCount}</strong>{" "}
                      {content.writingStats.noteLabel}
                      {stats.notes.publishedCount > 1 ? "s" : ""}{" "}
                      {content.writingStats.sharedLabel}
                      {stats.notes.publishedCount > 1 ? "s" : ""}{" "}
                      {content.writingStats.whichLabel}{" "}
                      {stats.notes.publishedCount > 1 ? "ont" : "a"}{" "}
                      {content.writingStats.reachedLabel}{" "}
                      <strong>{stats.notes.peopleReached}</strong>{" "}
                      {content.writingStats.personLabel}
                      {stats.notes.peopleReached > 1 ? "s" : ""}
                    </li>

                    <li>
                      {content.writingStats.commentsPrefix}{" "}
                      <strong>{stats.notes.commentsCount}</strong>{" "}
                      {content.writingStats.occurrencesSuffix}.
                    </li>
                  </ul>
                </div>

                <div className="profile-writing-summary library-card">
                  <h2 className="profile-summary-title">
                    {content.writingStats.libraryTitle}
                  </h2>

                  <ul className="profile-summary-list">
                    <li>
                      <strong>{stats.books.draftsCount}</strong>{" "}
                      {content.writingStats.draftLabel}
                      {stats.books.draftsCount > 1 ? "s" : ""}{" "}
                      {content.writingStats.pendingLabel}
                    </li>

                    <li>
                      <strong>{stats.books.publishedCount}</strong>{" "}
                      {content.writingStats.readingLabel}
                      {stats.books.publishedCount > 1 ? "s" : ""}{" "}
                      {content.writingStats.sharedLabel}
                      {stats.books.publishedCount > 1 ? "s" : ""}{" "}
                      {content.writingStats.whichLabel}{" "}
                      {stats.books.publishedCount > 1 ? "ont" : "a"}{" "}
                      {content.writingStats.reachedLabel}{" "}
                      <strong>{stats.books.peopleInfluenced}</strong>{" "}
                      {content.writingStats.personLabel}
                      {stats.books.peopleInfluenced > 1 ? "s" : ""}
                    </li>

                    <li>
                      {content.writingStats.reactionsPrefix}{" "}
                      <strong>{stats.books.reactionsCount}</strong>{" "}
                      {content.writingStats.occurrencesSuffix}.
                    </li>
                  </ul>
                </div>
              </>
            )}

            <div className="home-interlude" aria-hidden="true">
              <span />
            </div>

            <div className="profile-observer-info">
              <div className="paper-card profile-role-block">
                <h2>{profileContent.roles[user?.role]?.title}</h2>

                <p>{profileContent.roles[user?.role]?.text}</p>
              </div>

              <div className="paper-card profile-role-block">
                <h2>{profileContent.roles[user?.role]?.creatorTitle}</h2>

                <p>{profileContent.roles[user?.role]?.creatorText}</p>
              </div>

              <div className="paper-card profile-role-block">
                <h2>{profileContent.roles[user?.role]?.validationTitle}</h2>

                <p>{profileContent.roles[user?.role]?.validationText}</p>

                {user?.role === "observer" && !creatorRequest && (
                  <Link
                    className="btn btn-primary"
                    to={profileContent.roles.observer.buttonTo}
                  >
                    {profileContent.roles.observer.buttonLabel}
                  </Link>
                )}
              </div>
            </div>

            {(user?.role === "creator" || user?.role === "admin") && (
              <div className="profile-actions">
                <Link
                  className="btn btn-primary"
                  to={content.actions.writingsTo}
                >
                  {content.actions.writings}
                </Link>

                <Link
                  className="btn btn-secondary"
                  to={content.actions.settingsTo}
                >
                  {content.actions.settings}
                </Link>
              </div>
            )}
          </div>
        </div>

        <PageFooterNavigation />
      </section>
    </>
  );
}
