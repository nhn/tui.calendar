import { PopupType } from '@src/slices/popup';

import {
  CalendarState,
  EventDetailPopupParam,
  EventFormPopupParam,
  SeeMorePopupParam,
} from '@t/store';

export const eventFormPopupParamSelector = (state: CalendarState) => {
  const isEventFormPopupType = state.popup.type === PopupType.form;

  return (isEventFormPopupType ? state.popup.param : {}) as EventFormPopupParam;
};

export const eventDetailPopupParamSelector = (state: CalendarState) => {
  const isEventDetailPopupType = state.popup.type === PopupType.detail;

  return (isEventDetailPopupType ? state.popup.param : {}) as EventDetailPopupParam;
};

export const seeMorePopupParamSelector = (state: CalendarState) => {
  const isSeeMorePopupType = state.popup.type === PopupType.seeMore;

  return (isSeeMorePopupType ? state.popup.param : {}) as SeeMorePopupParam;
};
