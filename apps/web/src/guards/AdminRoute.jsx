import RouteGuard from "./RouteGuard.jsx";

export default function AdminRoute({ children }) {
  return (
    <RouteGuard canAccess={(user) => user.role === "admin"}>
      {children}
    </RouteGuard>
  );
}
