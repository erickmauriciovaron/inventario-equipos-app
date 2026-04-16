import type { Equipment } from '../../types/equipment';

interface Props {
  equipment: Equipment[];
  onEdit: (item: Equipment) => void;
  onDelete: (id: string) => void;
}

const getStatusClass = (status: Equipment['estado']) => {
  switch (status) {
    case 'Activo':
      return 'bg-emerald-100 text-emerald-700';
    case 'En mantenimiento':
      return 'bg-amber-100 text-amber-700';
    case 'Dado de baja':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export const EquipmentTable = ({ equipment, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Nombre</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Tipo</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Marca</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Modelo</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Serial</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Estado</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Usuario</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Ubicación</th>
              <th className="px-4 py-3 text-center font-semibold text-slate-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {equipment.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-800">{item.nombre}</td>
                <td className="px-4 py-3 text-slate-600">{item.tipo}</td>
                <td className="px-4 py-3 text-slate-600">{item.marca}</td>
                <td className="px-4 py-3 text-slate-600">{item.modelo}</td>
                <td className="px-4 py-3 text-slate-600">{item.serial}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(item.estado)}`}>
                    {item.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{item.usuarioAsignado}</td>
                <td className="px-4 py-3 text-slate-600">{item.ubicacion}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="rounded-xl bg-sky-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-sky-700"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
