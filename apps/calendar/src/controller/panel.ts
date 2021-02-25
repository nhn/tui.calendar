import isUndefined from 'tui-code-snippet/type/isUndefined';
import { Direction } from '@src/controller/layout';
import { getElementRect as getRect } from '@src/util/domutil';

export type Styles = Record<string, string | number>;
export type PanelElementRectMap = Record<string, PanelRect>;
export interface Size {
  width: number;
  height: number;
}
export interface PanelRect extends Size {
  x: number;
  y: number;
  resizerWidth: number;
  resizerHeight: number;
}
export interface PanelInfo {
  name: string;
  direction?: Direction;
  overflowY?: boolean;
  overflowX?: boolean;
  show?: boolean;

  autoSize?: number;
  height?: number;
  width?: number;
  minHeight?: number;
  minWidth?: number;
  maxHeight?: number;
  maxWidth?: number;

  expandable?: boolean;
  maxExpandableHeight?: number;
  maxExpandableWidth?: number;

  resizable?: boolean;
  resizerHeight?: number;
  resizerWidth?: number;
}

export const panelInfoKeys: Array<keyof PanelInfo> = [
  'name',
  'direction',
  'overflowX',
  'overflowY',
  'height',
  'width',
  'minHeight',
  'minWidth',
  'maxHeight',
  'maxWidth',
  'maxExpandableHeight',
  'maxExpandableWidth',
  'expandable',
  'show',
  'resizable',
  'autoSize',
  'resizerHeight',
  'resizerWidth',
];

export function getElementRect(element: HTMLElement) {
  if (element) {
    return getRect(element);
  }

  return { x: 0, y: 0, width: 0, height: 0 };
}

export function isPanelShown(panel: PanelInfo) {
  return isUndefined(panel.show) || panel.show;
}

export function getPanelStylesFromInfo(panel: PanelInfo) {
  const styles: Styles = {};
  const { height, width, overflowX, overflowY } = panel;

  if (width) {
    styles.width = width;
    styles.height = '100%';
  }
  if (height) {
    styles.height = height;
    styles.width = '100%';
  }
  if (overflowX) {
    styles.overflowX = 'auto';
  }
  if (overflowY) {
    styles.overflowY = 'auto';
  }

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
