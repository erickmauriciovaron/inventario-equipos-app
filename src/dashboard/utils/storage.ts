import type { Equipment } from '../../types/equipment';
import { DEFAULT_EQUIPMENT, EQUIPMENT_STORAGE_KEY } from './constants';

export const getStoredEquipment = (): Equipment[] => {
  const stored = localStorage.getItem(EQUIPMENT_STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(DEFAULT_EQUIPMENT));
    return DEFAULT_EQUIPMENT;
  }

  try {
    const parsed = JSON.parse(stored) as Equipment[];

    if (!Array.isArray(parsed)) {
      localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(DEFAULT_EQUIPMENT));
      return DEFAULT_EQUIPMENT;
    }

    return parsed;
  } catch {
    localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(DEFAULT_EQUIPMENT));
    return DEFAULT_EQUIPMENT;
  }
};

export const saveEquipment = (equipment: Equipment[]) => {
  localStorage.setItem(EQUIPMENT_STORAGE_KEY, JSON.stringify(equipment));
};
