import { CalendarStore, PopupParamMap, SetState } from '@t/store';

export enum PopupType {
  seeMore = 'seeMore',
  creation = 'creation',
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

export function createPopupSlice(): PopupSlice {
  return {
    popup: { type: null, param: null },
  };
}

export type PopupDispatchers = {
  show: <T extends PopupType>(params: ShowPopupParams<T>) => void;
  hide: () => void;
};

export function createPopupDispatchers(set: SetState<CalendarStore>): PopupDispatchers {
  return {
    show: <T extends PopupType>({ type, param }: ShowPopupParams<T>) =>
      set((state) => ({
        popup: {
          ...state.popup,
          type,
          param,
        },
      })),
    hide: () =>
      set((state) => ({
        popup: {
          ...state.popup,
          type: null,
          param: null,
        },
      })),
  };
}
