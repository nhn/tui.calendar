import { getElementRect as getRect } from '@src/utils/dom';
import { isUndefined } from '@src/utils/type';

import { StyleProp } from '@t/components/common';
import { PanelInfo, PanelRect } from '@t/layout';

const styleKeys: Array<keyof PanelInfo> = ['minHeight', 'maxHeight', 'minWidth', 'maxWidth'];

export function getElementRect(element: HTMLElement | null) {
  if (element) {
    return getRect(element);
  }

  return { x: 0, y: 0, width: 0, height: 0 };
}

export function isPanelShown(panel: PanelInfo) {
  return isUndefined(panel.show) || panel.show;
}

function getPanelSide(side: number, maxExpandableSide?: number) {
  return maxExpandableSide ? Math.min(maxExpandableSide, side) : side;
}

export function getPanelStylesFromInfo(panel: PanelInfo) {
  const styles: StyleProp = {};
  const { height, width, overflowX, overflowY, maxExpandableWidth, maxExpandableHeight } = panel;

  if (width) {
    styles.width = getPanelSide(width, maxExpandableWidth);
    styles.height = '100%';
  }
  if (height) {
    styles.width = '100%';
    styles.height = getPanelSide(height, maxExpandableHeight);
  }

  if (overflowX) {
    styles.overflowX = 'auto';
  }
  if (overflowY) {
    styles.overflowY = 'auto';
  }

  styleKeys.forEach((key) => {
    if (panel[key]) {
      styles[key] = panel[key] as keyof PanelInfo;
    }
  });

  return styles;
}

export function getResizeInfoByGrowth(
  panelProps: PanelInfo,
  panelRect: PanelRect,
  growthWidth: number,
  growthHeight: number
) {
  const { minHeight = 0, minWidth = 0 } = panelProps;
  const { width, height } = panelRect;
  const newHeight = Math.max(0, height + growthHeight, minHeight);
  const newWidth = Math.max(0, width + growthWidth, minWidth);
  const shrinkHeight = height - newHeight;
  const shrinkWidth = width - newWidth;

  return {
    newWidth,
    newHeight,
    shrinkHeight,
    shrinkWidth,
  };
}
