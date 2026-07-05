import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { noteService } from "../../api/note.service.js";
import { notesContent } from "../../content/notes.content.js";
import { seoContent } from "../../content/seo.content.js";

import NoteDetailCard from "../../components/note/NoteDetailCard.jsx";
import NoteCommentSection from "../../components/note/NoteCommentSection.jsx";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import SEO from "../../components/seo/SEO.jsx";

import "../../styles/pages/note-detail.scss";

export default function NoteDetail() {
  const { slug } = useParams();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await noteService.getBySlug(slug);

        setNote(data.note || data);
      } catch (error) {
        console.error(error);

        setError(notesContent.states.detailLoadError);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [slug]);

  if (loading) {
    return <LoadingState text={notesContent.states.detailLoading} />;
  }

  if (error) {
    return <ErrorState text={error} />;
  }

  if (!note) {
    return (
      <section className="page-section">
        <EmptyState
          variant="soft"
          icon={notesContent.emptyState.icon}
          title={notesContent.states.notFoundTitle}
          text={notesContent.states.notFoundText}
        />
      </section>
    );
  }

  return (
    <>
      <SEO
        title={`${note.title}${seoContent.pages.note.titleSuffix}`}
        description={note.excerpt || seoContent.pages.note.description}
        image={seoContent.pages.note.image}
        url={`${seoContent.site.url}/notes/${note.slug}`}
      />
      <section className="page-section">
        <NoteDetailCard note={note} />

        <div className="home-interlude--writing" aria-hidden="true">
          <span />
        </div>

        <NoteCommentSection noteId={note._id} />

        <PageFooterNavigation
          backTo="/notes"
          backLabel="Découvrir une autre Note"
        />
      </section>
    </>
  );
}
