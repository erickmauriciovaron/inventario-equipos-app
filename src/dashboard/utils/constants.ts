import type { Equipment, EquipmentStatus } from '../../types/equipment';

export const EQUIPMENT_STORAGE_KEY = 'inventory-equipment-list';

export const EQUIPMENT_TYPES = [
  'Portátil',
  'Escritorio',
  'Impresora',
  'Monitor',
  'UPS',
  'Servidor',
  'Tablet',
  'Otro',
] as const;

export const EQUIPMENT_STATUSES: EquipmentStatus[] = [
  'Activo',
  'En mantenimiento',
  'Dado de baja',
];

export const INITIAL_FORM = {
  nombre: '',
  tipo: 'Portátil',
  marca: '',
  modelo: '',
  serial: '',
  estado: 'Activo' as EquipmentStatus,
  usuarioAsignado: '',
  ubicacion: '',
};

export const DEFAULT_EQUIPMENT: Equipment[] = [
  {
    id: crypto.randomUUID(),
    nombre: 'Portátil Administración 01',
    tipo: 'Portátil',
    marca: 'Lenovo',
    modelo: 'ThinkPad E14',
    serial: 'LEN-ADM-001',
    estado: 'Activo',
    usuarioAsignado: 'Laura Gómez',
    ubicacion: 'Oficina Administrativa',
    fechaRegistro: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    nombre: 'Impresora Bodega',
    tipo: 'Impresora',
    marca: 'HP',
    modelo: 'LaserJet Pro M404',
    serial: 'HP-BOD-404',
    estado: 'En mantenimiento',
    usuarioAsignado: 'Área Logística',
    ubicacion: 'Bodega Principal',
    fechaRegistro: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    nombre: 'Monitor Gerencia',
    tipo: 'Monitor',
    marca: 'Dell',
    modelo: 'P2422H',
    serial: 'DEL-GER-2422',
    estado: 'Activo',
    usuarioAsignado: 'Gerencia General',
    ubicacion: 'Sala Gerencia',
    fechaRegistro: new Date().toISOString(),
  },
];
