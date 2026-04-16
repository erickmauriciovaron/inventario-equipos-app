import type { EquipmentFormData } from '../../types/equipment';

export type EquipmentFormAction =
  | { type: 'SET_FIELD'; field: keyof EquipmentFormData; value: string }
  | { type: 'SET_FORM'; payload: EquipmentFormData }
  | { type: 'RESET'; payload: EquipmentFormData };

export const equipmentFormReducer = (
  state: EquipmentFormData,
  action: EquipmentFormAction,
): EquipmentFormData => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_FORM':
      return action.payload;
    case 'RESET':
      return action.payload;
    default:
      return state;
  }
};
