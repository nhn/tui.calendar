import { PanelInfo } from '@t/layout';

export enum Direction {
  COLUMN,
  ROW,
}

export enum ResizeMode {
  RELATIVE,
  ABSOLUTE,
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
