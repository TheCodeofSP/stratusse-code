import RouteGuard from "./RouteGuard.jsx";

export default function ProtectedRoute({ children }) {
  return <RouteGuard>{children}</RouteGuard>;
}
