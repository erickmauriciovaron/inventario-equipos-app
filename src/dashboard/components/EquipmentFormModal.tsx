import { useEffect, useReducer, useRef, type FormEvent } from 'react';
import type { Equipment, EquipmentFormData } from '../../types/equipment';
import { equipmentFormReducer } from '../reducer/equipmentFormReducer';
import { EQUIPMENT_STATUSES, EQUIPMENT_TYPES, INITIAL_FORM } from '../utils/constants';

interface Props {
  mode: 'create' | 'edit';
  selectedEquipment: Equipment | null;
  error: string;
  onClose: () => void;
  onCreate: (form: EquipmentFormData) => { success: boolean; message?: string };
  onUpdate: (id: string, form: EquipmentFormData) => { success: boolean; message?: string };
}

export const EquipmentFormModal = ({
  mode,
  selectedEquipment,
  error,
  onClose,
  onCreate,
  onUpdate,
}: Props) => {
  const [formState, dispatch] = useReducer(
    equipmentFormReducer,
    selectedEquipment
      ? {
          nombre: selectedEquipment.nombre,
          tipo: selectedEquipment.tipo,
          marca: selectedEquipment.marca,
          modelo: selectedEquipment.modelo,
          serial: selectedEquipment.serial,
          estado: selectedEquipment.estado,
          usuarioAsignado: selectedEquipment.usuarioAsignado,
          ubicacion: selectedEquipment.ubicacion,
        }
      : INITIAL_FORM,
  );

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedEquipment) {
      dispatch({
        type: 'SET_FORM',
        payload: {
          nombre: selectedEquipment.nombre,
          tipo: selectedEquipment.tipo,
          marca: selectedEquipment.marca,
          modelo: selectedEquipment.modelo,
          serial: selectedEquipment.serial,
          estado: selectedEquipment.estado,
          usuarioAsignado: selectedEquipment.usuarioAsignado,
          ubicacion: selectedEquipment.ubicacion,
        },
      });
    } else {
      dispatch({ type: 'RESET', payload: INITIAL_FORM });
    }
  }, [selectedEquipment]);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === 'create') {
      onCreate(formState);
      return;
    }

    if (selectedEquipment) {
      onUpdate(selectedEquipment.id, formState);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 px-4 py-8">
      <div className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
              {mode === 'create' ? 'Nuevo registro' : 'Edición'}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {mode === 'create' ? 'Agregar equipo' : 'Editar equipo'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Completa la información principal del equipo de cómputo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cerrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Nombre del equipo</label>
              <input
                ref={firstInputRef}
                type="text"
                value={formState.nombre}
                onChange={(event) =>
                  dispatch({ type: 'SET_FIELD', field: 'nombre', value: event.target.value })
                }
                className="input-base"
                placeholder="Ejemplo: Portátil Contabilidad 01"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Tipo de equipo</label>
              <select
                value={formState.tipo}
                onChange={(event) =>
                  dispatch({ type: 'SET_FIELD', field: 'tipo', value: event.target.value })
                }
                className="input-base"
              >
                {EQUIPMENT_TYPES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Marca</label>
              <input
                type="text"
                value={formState.marca}
                onChange={(event) =>
                  dispatch({ type: 'SET_FIELD', field: 'marca', value: event.target.value })
                }
                className="input-base"
                placeholder="Ejemplo: Lenovo"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Modelo</label>
              <input
                type="text"
                value={formState.modelo}
                onChange={(event) =>
                  dispatch({ type: 'SET_FIELD', field: 'modelo', value: event.target.value })
                }
                className="input-base"
                placeholder="Ejemplo: ThinkPad E14"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Serial</label>
              <input
                type="text"
                value={formState.serial}
                onChange={(event) =>
                  dispatch({ type: 'SET_FIELD', field: 'serial', value: event.target.value })
                }
                className="input-base"
                placeholder="Ejemplo: ABC12345"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Estado</label>
              <select
                value={formState.estado}
                onChange={(event) =>
                  dispatch({ type: 'SET_FIELD', field: 'estado', value: event.target.value })
                }
                className="input-base"
              >
                {EQUIPMENT_STATUSES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Usuario asignado</label>
              <input
                type="text"
                value={formState.usuarioAsignado}
                onChange={(event) =>
                  dispatch({ type: 'SET_FIELD', field: 'usuarioAsignado', value: event.target.value })
                }
                className="input-base"
                placeholder="Ejemplo: Carlos Pérez"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Ubicación</label>
              <input
                type="text"
                value={formState.ubicacion}
                onChange={(event) =>
                  dispatch({ type: 'SET_FIELD', field: 'ubicacion', value: event.target.value })
                }
                className="input-base"
                placeholder="Ejemplo: Oficina principal"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              {mode === 'create' ? 'Guardar equipo' : 'Actualizar equipo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
