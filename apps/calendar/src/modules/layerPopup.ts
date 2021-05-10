import { LayerPopupState } from '@t/store';

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
    show(state: LayerPopupState, { type, param }: { type: PopupType; param: any }) {
      return { ...state, popupType: type, param };
    },
    hide(state: LayerPopupState) {
      return { ...state, popupType: null };
    },
  },
};
