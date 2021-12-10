import produce from 'immer';

import { CalendarStore, PopupParamMap, SetState } from '@t/store';

export enum PopupType {
  seeMore = 'seeMore',
  form = 'form',
  detail = 'detail',
}

type ShowPopupParams<T extends PopupType> = { type: T; param: PopupParamMap[T] };

export type PopupSlice = {
  popup:
    | {
        type: null;
        param: null;
      }
    | {
        type: PopupType;
        param: PopupParamMap[PopupType];
      };
};

export type PopupDispatchers = {
  show: <T extends PopupType>(params: ShowPopupParams<T>) => void;
  hide: () => void;
};

export function createPopupSlice(): PopupSlice {
  return {
    popup: { type: null, param: null },
  };
}

export function createPopupDispatchers(set: SetState<CalendarStore>): PopupDispatchers {
  return {
    show: <T extends PopupType>({ type, param }: ShowPopupParams<T>) =>
      set(
        produce((state) => {
          state.popup = { type, param };
        })
      ),
    hide: () =>
      set(
        produce((state) => {
          state.popup = { type: null, param: null };
        })
      ),
  };
}
