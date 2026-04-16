import { useEffect, useMemo, useState } from 'react';
import type { Equipment, EquipmentFormData } from '../../types/equipment';
import { getStoredEquipment, saveEquipment } from '../utils/storage';

const normalize = (value: string) => value.trim().toLowerCase();

export const useEquipment = () => {
  const [equipment, setEquipment] = useState<Equipment[]>(() => getStoredEquipment());
  const [search, setSearch] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    saveEquipment(equipment);
  }, [equipment]);

  const filteredEquipment = useMemo(() => {
    const term = normalize(search);

    if (!term) return equipment;

    return equipment.filter((item) => {
      const values = [
        item.nombre,
        item.tipo,
        item.marca,
        item.modelo,
        item.serial,
        item.estado,
        item.usuarioAsignado,
        item.ubicacion,
      ];

      return values.some((value) => normalize(value).includes(term));
    });
  }, [equipment, search]);

  const stats = useMemo(() => {
    return {
      total: equipment.length,
      activos: equipment.filter((item) => item.estado === 'Activo').length,
      mantenimiento: equipment.filter((item) => item.estado === 'En mantenimiento').length,
      baja: equipment.filter((item) => item.estado === 'Dado de baja').length,
    };
  }, [equipment]);

  const openCreateForm = () => {
    setFormMode('create');
    setSelectedEquipment(null);
    setError('');
    setIsFormOpen(true);
  };

  const openEditForm = (item: Equipment) => {
    setFormMode('edit');
    setSelectedEquipment(item);
    setError('');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedEquipment(null);
    setError('');
  };

  const validateEquipment = (form: EquipmentFormData, currentId?: string) => {
    const requiredFields: Array<keyof EquipmentFormData> = [
      'nombre',
      'tipo',
      'marca',
      'modelo',
      'serial',
      'estado',
      'usuarioAsignado',
      'ubicacion',
    ];

    const emptyField = requiredFields.find((field) => !form[field].trim());

    if (emptyField) {
      return 'Todos los campos son obligatorios.';
    }

    const serialExists = equipment.some(
      (item) => normalize(item.serial) === normalize(form.serial) && item.id !== currentId,
    );

    if (serialExists) {
      return 'Ya existe un equipo con ese serial.';
    }

    return '';
  };

  const createEquipment = (form: EquipmentFormData) => {
    const validationError = validateEquipment(form);

    if (validationError) {
      setError(validationError);
      return { success: false, message: validationError };
    }

    const newEquipment: Equipment = {
      id: crypto.randomUUID(),
      ...form,
      fechaRegistro: new Date().toISOString(),
    };

    setEquipment((current) => [newEquipment, ...current]);
    setError('');
    closeForm();
    return { success: true };
  };

  const updateEquipment = (id: string, form: EquipmentFormData) => {
    const validationError = validateEquipment(form, id);

    if (validationError) {
      setError(validationError);
      return { success: false, message: validationError };
    }

    setEquipment((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              ...form,
            }
          : item,
      ),
    );

    setError('');
    closeForm();
    return { success: true };
  };

  const deleteEquipment = (id: string) => {
    setEquipment((current) => current.filter((item) => item.id !== id));
  };

  return {
    equipment,
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
  };
};
