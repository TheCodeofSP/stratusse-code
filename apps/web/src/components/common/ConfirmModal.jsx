import "./confirm-modal.scss";

export default function ConfirmModal({
  isOpen,
  title,
  text,
  children,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  onConfirm,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div
        className="confirm-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <h2>{title}</h2>

        {text && <p>{text}</p>}

        {children && <div className="confirm-modal__body">{children}</div>}

        <div className="confirm-modal__actions">
          <button className="btn btn-ghost" type="button" onClick={onClose}>
            {cancelLabel}
          </button>

          <button className="btn btn-primary" type="button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
