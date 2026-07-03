import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { profileService } from "../../api/profile.service.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import ConfirmModal from "../common/ConfirmModal.jsx";

export default function DeleteAccountSection() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [deletionComment, setDeletionComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setIsSubmitting(true);

      await profileService.deleteMyAccount({
        deletionComment: deletionComment.trim(),
      });

      toast.success(
        "Ton compte a été supprimé. Merci d’avoir fait partie de Stratusse.",
      );

      logout();

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error("Impossible de supprimer le compte.");
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <section className="profile-delete-account">
      <div className="form-group">
        <label className="form-label">
          Pourquoi souhaites-tu supprimer ton compte ?{" "}
          <span className="text-muted">(facultatif)</span>
        </label>

        <textarea
          className="form-textarea"
          maxLength={1000}
          value={deletionComment}
          onChange={(event) => setDeletionComment(event.target.value)}
          placeholder="Tu peux laisser un commentaire si tu le souhaites..."
        />

        <p className="form-helper">{deletionComment.length}/1000 caractères</p>
      </div>
      <div className="btn-one">
        <button
          className="btn btn-danger "
          type="button"
          disabled={isSubmitting}
          onClick={() => setIsModalOpen(true)}
        >
          Supprimer mon compte
        </button>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Est-tu sûr de vouloir supprimer ton compte ?"
        text="Cette action est irréversible. Ton profil sera anonymisé et ton compte désactivé."
        confirmLabel={isSubmitting ? "Suppression..." : "Supprimer mon compte"}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </section>
  );
}
