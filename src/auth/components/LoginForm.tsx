import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = login(form);

    if (!result.success) {
      setError(result.message ?? "No fue posible iniciar sesión.");
      usernameRef.current?.focus();
      return;
    }

    setError("");
    navigate("/dashboard", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-200">
          Usuario
        </label>
        <input
          ref={usernameRef}
          id="username"
          type="text"
          value={form.username}
          onChange={(event) => setForm({ ...form, username: event.target.value })}
          className="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
          placeholder="Ingresa tu usuario"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          className="w-full rounded-xl border border-slate-700 bg-slate-800/90 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
          placeholder="Ingresa tu contraseña"
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
      >
        Ingresar
      </button>
    </form>
  );
};