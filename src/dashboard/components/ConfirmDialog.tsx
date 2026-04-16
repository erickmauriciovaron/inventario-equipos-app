interface Props {
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog = ({ title, description, onCancel, onConfirm }: Props) => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm text-slate-600">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
