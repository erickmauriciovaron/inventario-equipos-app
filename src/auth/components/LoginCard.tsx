import { LoginForm } from "./LoginForm";
import bgGif from "../../assets/gif.gif";

export const LoginCard = () => {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgGif})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-md">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">
              Acceso al sistema
            </p>

            <h1 className="mt-3 text-3xl font-bold text-white">
              Iniciar sesión
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Ingresa tus credenciales para acceder al inventario.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};