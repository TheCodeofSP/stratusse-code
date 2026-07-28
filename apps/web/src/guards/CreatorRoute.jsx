import RouteGuard from "./RouteGuard.jsx";

export default function CreatorRoute({ children }) {
  return (
    <RouteGuard
      canAccess={(user) =>
        user.role === "admin" ||
        (user.role === "creator" && user.isApprovedCreator)
      }
    >
      {children}
    </RouteGuard>
  );
}
