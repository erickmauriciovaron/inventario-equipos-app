import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../auth/components/ProtectedRoute";
import { CreateUserPage } from "../auth/pages/CreateUserPage";
import { LoginPage } from "../auth/pages/LoginPage";
import { UsersManagementPage } from "../auth/pages/UsersManagementPage";
import { DashboardPage } from "../dashboard/pages/DashboardPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/usuarios/nuevo" element={<CreateUserPage />} />
        <Route path="/usuarios" element={<UsersManagementPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
