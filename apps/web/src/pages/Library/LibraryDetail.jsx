import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { libraryService } from "../../api/library.service.js";
import { libraryContent } from "../../content/library.content.js";

import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";

import LibraryDetailCard from "../../components/library/LibraryDetailCard.jsx";
import LibraryCommentSection from "../../components/library/LibraryCommentSection.jsx";
import PageFooterNavigation from "../../components/navigation/PageFooterNavigation.jsx";

export default function LibraryDetail() {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await libraryService.getPublicById(id);

        setBook(data);
      } catch (error) {
        console.error(error);

        setError(libraryContent.states.detailLoadError);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <LoadingState text={libraryContent.states.detailLoading} />;
  }

  if (error) {
    return <ErrorState text={error} />;
  }

  if (!book) {
    return (
      <section className="page-section">
        <EmptyState
          variant="soft"
          icon={libraryContent.emptyState.icon}
          title={libraryContent.states.notFoundTitle}
          text={libraryContent.states.notFoundText}
        />
      </section>
    );
  }

  return (
    <section className="page-section">
      <LibraryDetailCard book={book} />
      <div className="home-interlude--library" aria-hidden="true">
        <span />
      </div>

      <LibraryCommentSection bookId={book._id} />
      <PageFooterNavigation
        backTo="/library"
        backLabel="Retour à la Bibliothèque"
      />
    </section>
  );
}
