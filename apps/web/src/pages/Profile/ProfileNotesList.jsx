import { useEffect, useState } from "react";

import { noteService } from "../../api/note.service.js";
import { profileContent } from "../../content/profile.content.js";

import ConfirmModal from "../../components/common/ConfirmModal.jsx";
import ProfileNotesActions from "../../components/profile/ProfileNotesActions.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";

import "../../styles/pages/profile-notes.scss";

export default function ProfileNotesList() {
  const profileNotesContent = profileContent.notesList;
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isUnpublishModalOpen, setIsUnpublishModalOpen] = useState(false);
  const [noteToUnpublish, setNoteToUnpublish] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await noteService.getMine();
        setNotes(data.notes || data);
      } catch (error) {
        console.error(error);
        setError(profileNotesContent.errors.load);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const drafts = notes.filter((note) => note.status === "draft");
  const published = notes.filter((note) => note.status === "published");

  const openUnpublishModal = (noteId) => {
    const note = notes.find((item) => item._id === noteId);

    if (!note) return;

    setNoteToUnpublish(note);
    setIsUnpublishModalOpen(true);
  };

  const handleDelete = async () => {
    if (!noteToDelete?._id) return;

    try {
      await noteService.remove(noteToDelete._id);

      setNotes((prev) => prev.filter((note) => note._id !== noteToDelete._id));

      setIsDeleteModalOpen(false);
      setNoteToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteModal = (noteOrId) => {
    const note =
      typeof noteOrId === "string"
        ? notes.find((item) => item._id === noteOrId)
        : noteOrId;

    if (!note) return;

    setNoteToDelete(note);
    setIsDeleteModalOpen(true);
  };

  const handleUnpublish = async () => {
    if (!noteToUnpublish?._id) return;

    try {
      await noteService.unpublish(noteToUnpublish._id);

      setNotes((prev) =>
        prev.map((note) =>
          note._id === noteToUnpublish._id
            ? { ...note, status: "draft" }
            : note,
        ),
      );

      setIsUnpublishModalOpen(false);
      setNoteToUnpublish(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePublish = async (noteId) => {
    try {
      await noteService.publish(noteId);

      setNotes((prev) =>
        prev.map((note) =>
          note._id === noteId ? { ...note, status: "published" } : note,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <LoadingState text={profileNotesContent.loading} />;
  }

  if (error) {
    return <ErrorState text={error} />;
  }

  if (!notes.length) {
    return (
      <section className="page-section">
        <EmptyState
          icon={profileNotesContent.emptyState.icon}
          title={profileNotesContent.emptyState.title}
          text={profileNotesContent.emptyState.text}
          buttonLabel={profileNotesContent.emptyState.buttonLabel}
          buttonTo={profileNotesContent.emptyState.buttonTo}
        />
      </section>
    );
  }

  return (
    <section className="page-section profile-notes-page">
      <header className="page-header">
        <span className="eyebrow">{profileNotesContent.header.eyebrow}</span>

        <h1>{profileNotesContent.header.title}</h1>

        <p className="text-muted">{profileNotesContent.header.subtitle}</p>
      </header>

      <ProfileNotesActions
        title={profileNotesContent.sections.drafts}
        notes={drafts}
        onDelete={openDeleteModal}
        onPublish={handlePublish}
        onUnpublish={openUnpublishModal}
        cardClassName="note-card"
      />

      <ProfileNotesActions
        title={profileNotesContent.sections.published}
        notes={published}
        onDelete={openDeleteModal}
        onPublish={handlePublish}
        onUnpublish={openUnpublishModal}
        cardClassName="note-card"
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title={profileNotesContent.messages.deleteTitle}
        text={
          noteToDelete
            ? `${profileNotesContent.messages.deleteTextPrefix} "${noteToDelete.title}" ${profileNotesContent.messages.deleteTextSuffix}`
            : ""
        }
        confirmLabel={profileNotesContent.messages.confirmDelete}
        cancelLabel={profileNotesContent.messages.cancelDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setNoteToDelete(null);
        }}
        onConfirm={handleDelete}
      />
      <ConfirmModal
        isOpen={isUnpublishModalOpen}
        title="Remettre cette Note en brouillon ?"
        text={
          noteToUnpublish
            ? `"${noteToUnpublish.title}" a reçu ${
                noteToUnpublish.likedBy?.length || 0
              } réaction(s) et ${noteToUnpublish.commentsCount || 0} commentaire(s). En la remettant en brouillon, elle ne sera plus visible publiquement.`
            : ""
        }
        confirmLabel="Remettre en brouillon"
        cancelLabel="Garder publiée"
        onClose={() => {
          setIsUnpublishModalOpen(false);
          setNoteToUnpublish(null);
        }}
        onConfirm={handleUnpublish}
      />
    </section>
  );
}
