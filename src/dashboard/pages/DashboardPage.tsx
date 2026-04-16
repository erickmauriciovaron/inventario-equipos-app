import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { CustomHeader } from "../../components/common/CustomHeader";
import { EmptyState } from "../../components/common/EmptyState";
import { StatCard } from "../../components/common/StatCard";
import { AppShell } from "../../components/layout/AppShell";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { EquipmentFormModal } from "../components/EquipmentFormModal";
import { EquipmentTable } from "../components/EquipmentTable";
import { SearchBar } from "../components/SearchBar";
import { useEquipment } from "../hooks/useEquipment";

export const DashboardPage = () => {
  const { user } = useAuth();

  const {
    filteredEquipment,
    search,
    setSearch,
    stats,
    selectedEquipment,
    formMode,
    isFormOpen,
    error,
    openCreateForm,
    openEditForm,
    closeForm,
    createEquipment,
    updateEquipment,
    deleteEquipment,
  } = useEquipment();

  const [equipmentToDelete, setEquipmentToDelete] = useState<string | null>(null);

  return (
    <AppShell title="" description="">
      <section className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <CustomHeader title="Gestión de equipos" description="" />
            {user && (
              <p className="mt-2 text-sm text-slate-500">
                Bienvenido, <span className="font-semibold text-slate-700">{user.fullName}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {user?.role === "admin" && (
              <>
                <Link
                  to="/usuarios"
                  className="rounded-2xl bg-indigo-500 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-600"
                >
                  Ver usuarios
                </Link>

                <Link
                  to="/usuarios/nuevo"
                  className="rounded-2xl bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Crear usuario
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={openCreateForm}
              className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Agregar equipo
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total de equipos" value={stats.total} />
          <StatCard label="Equipos activos" value={stats.activos} />
          <StatCard label="En mantenimiento" value={stats.mantenimiento} />
          <StatCard label="Dados de baja" value={stats.baja} />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <SearchBar
            placeholder="Buscar por nombre, serial, usuario o ubicación"
            onQuery={setSearch}
          />
          {search && (
            <p className="mt-3 text-sm text-slate-500">
              Mostrando resultados para:{" "}
              <span className="font-semibold text-slate-700">{search}</span>
            </p>
          )}
        </div>

        {filteredEquipment.length > 0 ? (
          <EquipmentTable
            equipment={filteredEquipment}
            onEdit={openEditForm}
            onDelete={setEquipmentToDelete}
          />
        ) : (
          <EmptyState
            title="No hay equipos para mostrar"
            description="Agrega un nuevo equipo o ajusta la búsqueda para visualizar registros en el inventario."
          />
        )}
      </section>

      {isFormOpen && (
        <EquipmentFormModal
          mode={formMode}
          selectedEquipment={selectedEquipment}
          error={error}
          onClose={closeForm}
          onCreate={createEquipment}
          onUpdate={updateEquipment}
        />
      )}

      {equipmentToDelete && (
        <ConfirmDialog
          title="Eliminar equipo"
          description="Esta acción eliminará el equipo del inventario almacenado localmente."
          onCancel={() => setEquipmentToDelete(null)}
          onConfirm={() => {
            deleteEquipment(equipmentToDelete);
            setEquipmentToDelete(null);
          }}
        />
      )}
    </AppShell>
  );
};