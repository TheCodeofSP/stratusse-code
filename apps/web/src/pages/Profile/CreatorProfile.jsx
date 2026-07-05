import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { creatorService } from "../../api/creator.service.js";
import { profileContent } from "../../content/profile.content.js";
import { seoContent } from "../../content/seo.content.js";

import SEO from "../../components/seo/SEO.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import LibraryCard from "../../components/library/LibraryCard.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

import "../../styles/pages/creator-profile.scss";

export default function CreatorProfile() {
  const { pseudo } = useParams();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  const creatorProfileContent = profileContent.creatorProfile;

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const data = await creatorService.getByPseudo(pseudo);

        setCreator(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [pseudo]);

  if (loading) {
    return <LoadingState text={creatorProfileContent.states.loading} />;
  }

  if (!creator) {
    return (
      <section className="page-section">
        <EmptyState
          title={creatorProfileContent.states.notFoundTitle}
          text={creatorProfileContent.states.notFoundText}
        />

        <PageFooterNavigation />
      </section>
    );
  }

  const createdAt = new Date(creator.createdAt).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <SEO
        title={`Les pensées de ${creator.pseudo}${seoContent.pages.creator.titleSuffix}`}
        description={`Découvre les Notes et les Expériences de Lecture partagées par ${creator.pseudo} sur Stratusse.`}
        image={seoContent.pages.creator.image}
        url={`${seoContent.site.url}/creator/${creator.pseudo}`}
      />
      <section className="page-section creator-profile-page">
        <header className="page-header">
          <span className="eyebrow">{creatorProfileContent.eyebrow}</span>

          <h1>
            {creatorProfileContent.hero.titlePrefix} {creator.pseudo}
          </h1>

          <p className="text-muted">
            {creatorProfileContent.hero.introduction}
          </p>

          <p className="text-muted">
            {creatorProfileContent.meta.joinedPrefix} {createdAt}
          </p>
        </header>

        <div className="creator-profile-stats">
          <div className="paper-card creator-profile-stat">
            <strong>{creator.notes.length}</strong>
            <span>{creatorProfileContent.meta.notesShared}</span>
          </div>

          <div className="paper-card creator-profile-stat">
            <strong>{creator.books.length}</strong>
            <span>{creatorProfileContent.meta.readingsShared}</span>
          </div>
        </div>

        <section className="creator-profile-section">
          <div className="creator-profile-section__header">
            <span className="eyebrow">{creatorProfileContent.notes.title}</span>

            <h2>{creatorProfileContent.notes.title}</h2>

            <p>{creatorProfileContent.notes.introduction}</p>
          </div>

          {creator.notes.length === 0 ? (
            <EmptyState
              title={creatorProfileContent.notes.emptyTitle}
              text={creatorProfileContent.notes.emptyText}
            />
          ) : (
            <div className="creator-profile-list">
              {creator.notes.map((note) => (
                <article
                  key={note._id}
                  className="note-card creator-profile-note"
                >
                  <div>
                    <h3>{note.title}</h3>

                    <p>{note.excerpt}</p>
                  </div>

                  <Link
                    className="btn btn-secondary"
                    to={`/notes/${note.slug}`}
                  >
                    {creatorProfileContent.notes.actionLabel}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="creator-profile-section">
          <div className="creator-profile-section__header">
            <span className="eyebrow">
              {creatorProfileContent.readings.title}
            </span>

            <h2>{creatorProfileContent.readings.title}</h2>

            <p>{creatorProfileContent.readings.introduction}</p>
          </div>

          {creator.books.length === 0 ? (
            <EmptyState
              title={creatorProfileContent.readings.emptyTitle}
              text={creatorProfileContent.readings.emptyText}
            />
          ) : (
            <div className="creator-profile-list">
              {creator.books.map((book) => (
                <LibraryCard key={book._id} book={book} />
              ))}
            </div>
          )}
        </section>

        <section className="quote-closing">
          <blockquote>{creatorProfileContent.closing.reflection}</blockquote>

          <footer>{creatorProfileContent.closing.signature}</footer>
        </section>
        <PageFooterNavigation />
      </section>
    </>
  );
}
