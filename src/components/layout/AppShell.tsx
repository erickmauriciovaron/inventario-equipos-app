import type { ReactNode } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

export const AppShell = ({ title, description, children }: Props) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
              Sistema de Inventario
            </p>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {description && <p className="text-sm text-slate-500">{description}</p>}
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 px-4 py-2 text-right">
              <p className="text-xs text-slate-500">Sesión iniciada</p>
              <p className="text-sm font-semibold text-slate-800">{user?.fullName}</p>
            </div>
            <button
              onClick={logout}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
};
