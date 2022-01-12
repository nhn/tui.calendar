import { BooleanKeyOfEventModelData } from '@t/events';

export const HALF_OF_POPUP_ARROW_HEIGHT = 8;

export const BOOLEAN_KEYS_OF_EVENT_MODEL_DATA: BooleanKeyOfEventModelData[] = [
  'isPrivate',
  'isAllday',
  'isPending',
  'isFocused',
  'isVisible',
  'isReadOnly',
];

export enum DetailPopupArrowDirection {
  right = 'right',
  left = 'left',
}

export enum FormPopupArrowDirection {
  top = 'top',
  bottom = 'bottom',
}
