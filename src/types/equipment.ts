export type EquipmentStatus = 'Activo' | 'En mantenimiento' | 'Dado de baja';

export interface Equipment {
  id: string;
  nombre: string;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  estado: EquipmentStatus;
  usuarioAsignado: string;
  ubicacion: string;
  fechaRegistro: string;
}

export interface EquipmentFormData {
  nombre: string;
  tipo: string;
  marca: string;
  modelo: string;
  serial: string;
  estado: EquipmentStatus;
  usuarioAsignado: string;
  ubicacion: string;
}
