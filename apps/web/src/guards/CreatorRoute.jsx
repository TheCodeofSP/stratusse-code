import { Navigate } from "react-router-dom";

export default function CreatorRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAllowed =
    user.role === "admin" ||
    (user.role === "creator" && user.isApprovedCreator);

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return children;
}