import { PopupType } from '@src/slices/popup';

import type { CalendarState, PopupParamMap } from '@t/store';

export const eventFormPopupParamSelector = (state: CalendarState) => {
  return state.popup[PopupType.Form] as PopupParamMap[PopupType.Form];
};

export const eventDetailPopupParamSelector = (state: CalendarState) => {
  return state.popup[PopupType.Detail] as PopupParamMap[PopupType.Detail];
};

export const seeMorePopupParamSelector = (state: CalendarState) => {
  return state.popup[PopupType.SeeMore] as PopupParamMap[PopupType.SeeMore];
};
