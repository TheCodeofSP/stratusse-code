import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { profileService } from "../../api/profile.service.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

const passwordRules = [
  {
    label: "Au moins 8 caractères",
    test: (password) => password.length >= 8,
  },
  {
    label: "Au moins une majuscule",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "Au moins un chiffre",
    test: (password) => /\d/.test(password),
  },
  {
    label: "Au moins un caractère spécial",
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

export default function ChangePasswordForm() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isPasswordValid = passwordRules.every((rule) =>
    rule.test(formData.newPassword),
  );

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!isPasswordValid) {
      setError(
        "Ton nouveau mot de passe doit respecter tous les critères indiqués.",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await profileService.changePassword(formData);

      toast.success(
        "Mot de passe modifié avec succès. Reconnecte-toi avec ton nouveau mot de passe.",
      );

      await logout();

      navigate("/login");
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Impossible de modifier le mot de passe.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="stack-md" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Mot de passe actuel</label>

        <input
          className="form-select"
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Nouveau mot de passe</label>

        <input
          className="form-select"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          minLength={8}
          required
        />

        <ul className="password-rules">
          {passwordRules.map((rule) => {
            const isValid = rule.test(formData.newPassword);

            return (
              <li
                key={rule.label}
                className={isValid ? "password-rule valid" : "password-rule"}
              >
                {isValid ? "✓" : "•"} {rule.label}
              </li>
            );
          })}
        </ul>
      </div>

      {error && <p className="form-error">{error}</p>}
      <div className="btn-one">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting || !isPasswordValid}
        >
          {isSubmitting ? "Modification..." : "Modifier mon mot de passe"}
        </button>
      </div>
    </form>
  );
}
