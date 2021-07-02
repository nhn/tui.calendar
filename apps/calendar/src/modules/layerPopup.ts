import { LayerPopupState, PopupParamMap } from '@t/store';

export enum PopupType {
  seeMore = 'seeMore',
  creation = 'creation',
  detail = 'detail',
}

type ShowPopupParams<T extends PopupType> = { type: T; param: PopupParamMap[T] };

export const layerPopup = {
  name: 'layerPopup',
  state: {
    popupType: null,
    param: {},
  } as LayerPopupState,
  actions: {
    show<T extends PopupType>(state: LayerPopupState, { type, param }: ShowPopupParams<T>) {
      return { ...state, popupType: type, param };
    },
    hide(state: LayerPopupState) {
      return { ...state, popupType: null };
    },
  },
};
