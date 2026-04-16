import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const UsersManagementPage = () => {
  const { user, users, changeUserRole, removeUser } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRoleChange = (userId: string, role: "admin" | "user") => {
    setMessage("");
    setError("");

    const result = changeUserRole(userId, role);

    if (!result.success) {
      setError(result.message ?? "No fue posible actualizar el rol.");
      return;
    }

    setMessage("Rol actualizado correctamente.");
  };

  const handleDelete = (userId: string, username: string) => {
    const confirmed = window.confirm(`¿Deseas eliminar al usuario ${username}?`);
    if (!confirmed) return;

    setMessage("");
    setError("");

    const result = removeUser(userId);

    if (!result.success) {
      setError(result.message ?? "No fue posible eliminar el usuario.");
      return;
    }

    setMessage("Usuario eliminado correctamente.");
  };

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Acceso denegado</h1>
          <p className="mt-3 text-slate-500">
            Solo los administradores pueden gestionar usuarios.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-800"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gestión de usuarios</h1>
            <p className="mt-2 text-sm text-slate-500">
              Administra roles, visualiza usuarios y elimina registros.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/usuarios/nuevo")}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Crear usuario
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Volver
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Nombre
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Usuario
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Rol
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Fecha creación
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {users.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 text-sm text-slate-700">{item.fullName}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">{item.username}</td>
                  <td className="px-4 py-4">
                    <select
                      value={item.role}
                      onChange={(e) =>
                        handleRoleChange(item.id, e.target.value as "admin" | "user")
                      }
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleDelete(item.id, item.username)}
                      disabled={item.id === user.id}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};