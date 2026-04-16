import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Validando sesión...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
