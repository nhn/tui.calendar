import { LayerPopupState, PopupParamMap } from '@t/store';

export enum PopupType {
  seeMore = 'seeMore',
  creation = 'creation',
  detail = 'detail',
}

export const layerPopup = {
  name: 'layerPopup',
  state: {
    popupType: null,
    param: {},
  } as LayerPopupState,
  actions: {
    show<T extends PopupType>(
      state: LayerPopupState,
      { type, param }: { type: T; param: PopupParamMap[T] }
    ) {
      return { ...state, popupType: type, param };
    },
    hide(state: LayerPopupState) {
      return { ...state, popupType: null };
    },
  },
};
