import ConfirmModal from "../common/ConfirmModal.jsx";

export default function AdminModerationModal({
  isOpen,
  title,
  text,
  onClose,
  onConfirm,
}) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      title={title}
      text={text}
      confirmLabel="Supprimer"
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
