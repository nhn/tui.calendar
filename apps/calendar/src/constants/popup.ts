import { cls } from '@src/helpers/css';

import type { BooleanKeyOfEventObject } from '@t/events';

export const SEE_MORE_POPUP_SLOT_CLASS_NAME = cls('see-more-popup-slot');
export const EVENT_FORM_POPUP_SLOT_CLASS_NAME = cls('event-form-popup-slot');
export const EVENT_DETAIL_POPUP_SLOT_CLASS_NAME = cls('event-detail-popup-slot');

export const HALF_OF_POPUP_ARROW_HEIGHT = 8;

export const BOOLEAN_KEYS_OF_EVENT_MODEL_DATA: BooleanKeyOfEventObject[] = [
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
