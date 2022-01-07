import {
  CalendarState,
  EventDetailPopupParam,
  EventFormPopupParam,
  SeeMorePopupParam,
} from '@t/store';

export const eventFormPopupParamSelector = (state: CalendarState) =>
  (state.popup.param as EventFormPopupParam) ?? {};

export const eventDetailPopupParamSelector = (state: CalendarState) =>
  (state.popup.param as EventDetailPopupParam) ?? {};

export const seeMorePopupParamSelector = (state: CalendarState) =>
  (state.popup.param as SeeMorePopupParam) ?? {};
