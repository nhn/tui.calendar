import produce from 'immer';

import { CalendarState, CalendarStore, PopupParamMap, SetState } from '@t/store';

export enum PopupType {
  seeMore = 'seeMore',
  form = 'form',
  detail = 'detail',
}

export type PopupSlice = {
  popup: {
    [PopupType.seeMore]: PopupParamMap[PopupType.seeMore] | null;
    [PopupType.form]: PopupParamMap[PopupType.form] | null;
    [PopupType.detail]: PopupParamMap[PopupType.detail] | null;
  };
};

export type PopupDispatchers = {
  showSeeMorePopup: (param: PopupParamMap[PopupType.seeMore]) => void;
  showFormPopup: (param: PopupParamMap[PopupType.form]) => void;
  showDetailPopup: (param: PopupParamMap[PopupType.detail], isFlat: boolean) => void;
  hideSeeMorePopup: () => void;
  hideFormPopup: () => void;
  hideDetailPopup: () => void;
  hideAllPopup: () => void;
};

export function createPopupSlice(): PopupSlice {
  return {
    popup: {
      [PopupType.seeMore]: null,
      [PopupType.form]: null,
      [PopupType.detail]: null,
    },
  };
}

export function createPopupDispatchers(set: SetState<CalendarStore>): PopupDispatchers {
  return {
    showSeeMorePopup: (param: PopupParamMap[PopupType.seeMore]) =>
      set(
        produce((state: CalendarState) => {
          state.popup[PopupType.seeMore] = param;
          state.popup[PopupType.form] = null;
          state.popup[PopupType.detail] = null;
        })
      ),
    showFormPopup: (param: PopupParamMap[PopupType.form]) =>
      set(
        produce((state: CalendarState) => {
          state.popup[PopupType.form] = param;
          state.popup[PopupType.seeMore] = null;
          state.popup[PopupType.detail] = null;
        })
      ),
    showDetailPopup: (param: PopupParamMap[PopupType.detail], isFlat) =>
      set(
        produce((state: CalendarState) => {
          state.popup[PopupType.detail] = param;
          state.popup[PopupType.form] = null;
          if (!isFlat) {
            state.popup[PopupType.seeMore] = null;
          }
        })
      ),
    hideSeeMorePopup: () =>
      set(
        produce((state: CalendarState) => {
          state.popup[PopupType.seeMore] = null;
        })
      ),
    hideFormPopup: () =>
      set(
        produce((state: CalendarState) => {
          state.popup[PopupType.form] = null;
        })
      ),
    hideDetailPopup: () =>
      set(
        produce((state: CalendarState) => {
          state.popup[PopupType.detail] = null;
        })
      ),
    hideAllPopup: () =>
      set(
        produce((state: CalendarState) => {
          state.popup[PopupType.seeMore] = null;
          state.popup[PopupType.form] = null;
          state.popup[PopupType.detail] = null;
        })
      ),
  };
}
