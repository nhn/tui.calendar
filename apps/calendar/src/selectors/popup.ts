import { PopupType } from '@src/slices/popup';

import { CalendarState, PopupParamMap } from '@t/store';

export const eventFormPopupParamSelector = (state: CalendarState) => {
  return (state.popup[PopupType.form] ?? {}) as PopupParamMap[PopupType.form];
};

export const eventDetailPopupParamSelector = (state: CalendarState) => {
  return (state.popup[PopupType.detail] ?? {}) as PopupParamMap[PopupType.detail];
};

export const seeMorePopupParamSelector = (state: CalendarState) => {
  return (state.popup[PopupType.seeMore] ?? {}) as PopupParamMap[PopupType.seeMore];
};
