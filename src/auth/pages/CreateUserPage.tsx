import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const CreateUserPage = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "user" as "admin" | "user",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const result = registerUser(form);

    if (!result.success) {
      setError(result.message ?? "No fue posible crear el usuario.");
      return;
    }

    setMessage("Usuario creado correctamente.");
    setForm({
      fullName: "",
      username: "",
      password: "",
      role: "user",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Crear usuario</h1>
            <p className="mt-2 text-sm text-slate-500">
              Registra nuevos usuarios para acceder al sistema.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Volver
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Nombre completo
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Nombre completo"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Usuario
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Nombre de usuario"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              placeholder="Contraseña"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Rol
            </label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as "admin" | "user" })
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Guardar usuario
          </button>
        </form>
      </div>
    </div>
  );
};