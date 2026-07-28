import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext.jsx";
import LoadingState from "../components/ui/LoadingState.jsx";

export default function RouteGuard({ children, canAccess }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (canAccess && !canAccess(user)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
