import { useEffect, useState } from "react";

import { adminDashboardContent } from "../../content/adminDashboard.content.js";

import ConfirmModal from "../common/ConfirmModal.jsx";

import "./role-change-modal.scss";

export default function RoleChangeModal({
  isOpen,
  user,
  role,
  onClose,
  onConfirm,
}) {
  const [selectedRole, setSelectedRole] = useState("");
  const [comment, setComment] = useState("");

  const content = adminDashboardContent.roleChangeModal;

  const roleOptions = Object.entries(
    adminDashboardContent.vocabulary?.roles || {},
  ).map(([value, label]) => ({
    value,
    label,
  }));

  useEffect(() => {
    if (isOpen) {
      setSelectedRole(role || user?.role || "observer");
      setComment("");
    }
  }, [isOpen, role, user]);

  const handleConfirm = () => {
    onConfirm(selectedRole, comment);

    setSelectedRole("");
    setComment("");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ConfirmModal
      isOpen={isOpen}
      title={content.title}
      text={`${content.textPrefix} ${user?.pseudo} ${content.textSuffix}`}
      confirmLabel={content.confirmLabel}
      onClose={() => {
        setSelectedRole("");
        setComment("");
        onClose();
      }}
      onConfirm={handleConfirm}
    >
      <div className="role-change-modal">
        <div className="form-group">
          <label className="form-label">{content.newRoleLabel}</label>

          <div className="role-change-modal__current">
            <span>{content.currentRoleLabel}</span>

            <strong>{roleOptions.find((r) => r.value === role)?.label}</strong>
          </div>

          <select
            className="form-select"
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value)}
          >
            {roleOptions.map((roleOption) => (
              <option key={roleOption.value} value={roleOption.value}>
                {roleOption.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">{content.adminCommentLabel}</label>

          <textarea
            className="form-textarea"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder={content.adminCommentPlaceholder}
          />
        </div>
      </div>
    </ConfirmModal>
  );
}
