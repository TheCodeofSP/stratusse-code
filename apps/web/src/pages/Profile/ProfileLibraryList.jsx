import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { libraryService } from "../../api/library.service.js";
import { profileContent } from "../../content/profile.content.js";

import EmptyState from "../../components/common/EmptyState.jsx";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";

import "../../styles/pages/profile-library.scss";

import {
  getReadingStatusLabel,
  getBookUniverseLabel,
} from "../../utils/library.utils";

export default function ProfileLibraryList() {
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const profileLibraryContent = profileContent.libraryList;
  const [error, setError] = useState("");
  const [isUnpublishModalOpen, setIsUnpublishModalOpen] = useState(false);
  const [bookToUnpublish, setBookToUnpublish] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setError("");

      const data = await libraryService.getMine();

      setBooks(data.books || data);
    } catch (error) {
      console.error(error);

      setError(profileLibraryContent.errors.load);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!bookToDelete) return;

    try {
      await libraryService.remove(bookToDelete._id);

      setBooks((prev) => prev.filter((book) => book._id !== bookToDelete._id));

      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteModal = (book) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const handleStatus = async (book, status) => {
    if (status === "published" && book.readingStatus === "to_read") {
      toast.error(profileLibraryContent.messages.toReadCannotPublish);
      return;
    }
    try {
      await libraryService.update(book._id, { status });

      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const drafts = books.filter((book) => book.status === "draft");

  const published = books.filter((book) => book.status === "published");

  const openUnpublishModal = (book) => {
    setBookToUnpublish(book);
    setIsUnpublishModalOpen(true);
  };

  const handleUnpublish = async () => {
    if (!bookToUnpublish?._id) return;

    try {
      await libraryService.update(bookToUnpublish._id, { status: "draft" });

      await fetchBooks();

      setIsUnpublishModalOpen(false);
      setBookToUnpublish(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <LoadingState text={profileLibraryContent.loading} />;
  }
  if (error) {
    return <ErrorState text={error} />;
  }

  if (!books.length) {
    return (
      <section className="page-section">
        <EmptyState
          icon={profileLibraryContent.emptyState.icon}
          title={profileLibraryContent.emptyState.title}
          text={profileLibraryContent.emptyState.text}
          buttonLabel={profileLibraryContent.emptyState.buttonLabel}
          buttonTo={profileLibraryContent.emptyState.buttonTo}
        />
      </section>
    );
  }

  return (
    <section className="page-section profile-library-page">
      <header className="page-header">
        <span className="eyebrow">{profileLibraryContent.header.eyebrow}</span>

        <h1>{profileLibraryContent.header.title}</h1>

        <p className="text-muted">{profileLibraryContent.header.subtitle}</p>
      </header>

      <div className="stack-lg">
        <section className="profile-library-section">
          <h2>
            {profileLibraryContent.sections.drafts}
            <span className="profile-section-count">({drafts.length})</span>
          </h2>

          <div className="stack-md">
            {drafts.map((book) => (
              <div key={book._id} className="library-card profile-book-card">
                <div className="profile-book-badges">
                  <span className="profile-book-badge">
                    {getReadingStatusLabel(book.readingStatus)}
                  </span>

                  <span className="profile-book-badge profile-book-badge--universe">
                    {getBookUniverseLabel(book.universe)}
                  </span>
                </div>
                <h3>{book.title}</h3>

                <p className="profile-book-author">{book.author}</p>

                <div className="profile-book-actions">
                  <Link
                    className="btn btn-secondary"
                    to={`/editor/library/${book._id}`}
                  >
                    {profileLibraryContent.actions.view}
                  </Link>
                  <Link
                    className="btn btn-secondary"
                    to={`/editor/library/${book._id}`}
                  >
                    {profileLibraryContent.actions.edit}
                  </Link>

                  <button
                    className="btn btn-primary"
                    onClick={() => handleStatus(book, "published")}
                  >
                    {profileLibraryContent.actions.publish}
                  </button>

                  <button
                    className="btn btn-ghost"
                    onClick={() => openDeleteModal(book)}
                  >
                    {profileLibraryContent.actions.delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="profile-library-section">
          <h2>
            {profileLibraryContent.sections.published}
            <span className="profile-section-count">({published.length})</span>
          </h2>

          <div className="stack-md">
            {published.map((book) => (
              <div key={book._id} className="library-card profile-book-card">
                <div className="profile-book-badges">
                  <span className="profile-book-badge">
                    {getReadingStatusLabel(book.readingStatus)}
                  </span>

                  <span className="profile-book-badge profile-book-badge--universe">
                    {getBookUniverseLabel(book.universe)}
                  </span>
                </div>
                <h3>{book.title}</h3>

                <p className="profile-book-author">{book.author}</p>

                <div className="profile-book-actions">
                  <Link
                    className="btn btn-secondary"
                    to={`/library/${book._id}`}
                  >
                    {profileLibraryContent.actions.view}
                  </Link>
                  <button
                    className="btn btn-primary"
                    onClick={() => openUnpublishModal(book)}
                  >
                    {profileLibraryContent.actions.unpublish}
                  </button>

                  <button
                    className="btn btn-ghost"
                    onClick={() => openDeleteModal(book)}
                  >
                    {profileLibraryContent.actions.delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title={profileLibraryContent.messages.deleteTitle}
        text={
          bookToDelete
            ? `${profileLibraryContent.messages.deleteTextPrefix} "${bookToDelete.title}" ${profileLibraryContent.messages.deleteTextSuffix}`
            : ""
        }
        confirmLabel={profileLibraryContent.messages.confirmDelete}
        cancelLabel={profileLibraryContent.messages.cancelDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setBookToDelete(null);
        }}
        onConfirm={handleDelete}
      />
      <ConfirmModal
        isOpen={isUnpublishModalOpen}
        title="Remettre cette Lecture en brouillon ?"
        text={
          bookToUnpublish
            ? `"${bookToUnpublish.title}" a reçu ${
                bookToUnpublish.likedBy?.length || 0
              } réaction(s) et ${bookToUnpublish.commentsCount || 0} commentaire(s). En la remettant en brouillon, elle ne sera plus visible publiquement.`
            : ""
        }
        confirmLabel="Remettre en brouillon"
        cancelLabel="Garder publiée"
        onClose={() => {
          setIsUnpublishModalOpen(false);
          setBookToUnpublish(null);
        }}
        onConfirm={handleUnpublish}
      />
    </section>
  );
}
