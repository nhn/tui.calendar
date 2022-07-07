import produce from 'immer';

import type { CalendarState, CalendarStore, PopupParamMap, SetState } from '@t/store';

export enum PopupType {
  SeeMore = 'seeMore',
  Form = 'form',
  Detail = 'detail',
}

export type PopupSlice = {
  popup: {
    [PopupType.SeeMore]: PopupParamMap[PopupType.SeeMore] | null;
    [PopupType.Form]: PopupParamMap[PopupType.Form] | null;
    [PopupType.Detail]: PopupParamMap[PopupType.Detail] | null;
  };
};

export type PopupDispatchers = {
  showSeeMorePopup: (param: PopupParamMap[PopupType.SeeMore]) => void;
  showFormPopup: (param: PopupParamMap[PopupType.Form]) => void;
  showDetailPopup: (
    param: PopupParamMap[PopupType.Detail],
    isOpenedInSeeMorePopup: boolean
  ) => void;
  hideSeeMorePopup: () => void;
  hideFormPopup: () => void;
  hideDetailPopup: () => void;
  hideAllPopup: () => void;
};

export function createPopupSlice(): PopupSlice {
  return {
    popup: {
      [PopupType.SeeMore]: null,
      [PopupType.Form]: null,
      [PopupType.Detail]: null,
    },
  };
}

export function createPopupDispatchers(set: SetState<CalendarStore>): PopupDispatchers {
  return {
    showSeeMorePopup: (param: PopupParamMap[PopupType.SeeMore]) =>
      set(
        produce<CalendarState>((state) => {
          state.popup[PopupType.SeeMore] = param;
          state.popup[PopupType.Form] = null;
          state.popup[PopupType.Detail] = null;
        })
      ),
    showFormPopup: (param: PopupParamMap[PopupType.Form]) =>
      set(
        produce<CalendarState>((state) => {
          state.popup[PopupType.Form] = param;
          state.popup[PopupType.SeeMore] = null;
          state.popup[PopupType.Detail] = null;
        })
      ),
    showDetailPopup: (param: PopupParamMap[PopupType.Detail], isOpenedInSeeMorePopup) =>
      set(
        produce<CalendarState>((state) => {
          state.popup[PopupType.Detail] = param;
          state.popup[PopupType.Form] = null;
          if (!isOpenedInSeeMorePopup) {
            state.popup[PopupType.SeeMore] = null;
          }
        })
      ),
    hideSeeMorePopup: () =>
      set(
        produce<CalendarState>((state) => {
          state.popup[PopupType.SeeMore] = null;
        })
      ),
    hideFormPopup: () =>
      set(
        produce<CalendarState>((state) => {
          state.popup[PopupType.Form] = null;
        })
      ),
    hideDetailPopup: () =>
      set(
        produce<CalendarState>((state) => {
          state.popup[PopupType.Detail] = null;
        })
      ),
    hideAllPopup: () =>
      set(
        produce<CalendarState>((state) => {
          state.popup[PopupType.SeeMore] = null;
          state.popup[PopupType.Form] = null;
          state.popup[PopupType.Detail] = null;
        })
      ),
  };
}
