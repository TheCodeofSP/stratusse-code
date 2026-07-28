import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { authService } from "../../api/auth.service.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { authContent } from "../../content/auth.content.js";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const { authenticateWithSession } = useAuth();

  const [error, setError] = useState("");

  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setError(authContent.verifyEmail.invalidTokenError);
        return;
      }

      try {
        const data = await authService.verifyEmail(token);

        authenticateWithSession(data.user);

        toast.success(authContent.verifyEmail.successMessage);

        navigate(authContent.verifyEmail.successRedirectTo);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            authContent.verifyEmail.expiredTokenError,
        );
      }
    };

    verifyEmail();
  }, [token, authenticateWithSession, navigate]);

  if (error) {
    return (
      <section className="page-section">
        <header className="page-header">
          <span className="eyebrow">{authContent.verifyEmail.eyebrow}</span>

          <h1>{authContent.verifyEmail.errorTitle}</h1>

          <p className="text-muted">{error}</p>

          <Link
            className="btn btn-secondary"
            to={authContent.verifyEmail.loginTo}
          >
            {authContent.verifyEmail.loginLabel}
          </Link>
        </header>
      </section>
    );
  }

  return (
    <section className="page-section">
      <header className="page-header">
        <span className="eyebrow">{authContent.verifyEmail.eyebrow}</span>

        <h1>{authContent.verifyEmail.loadingTitle}</h1>

        <p className="text-muted">{authContent.verifyEmail.loadingText}</p>
      </header>
    </section>
  );
}
