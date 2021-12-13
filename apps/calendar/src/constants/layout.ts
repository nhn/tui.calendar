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

export const DEFAULT_RESIZER_LENGTH = 3;

export const DEFAULT_WEEK_PANEL_TYPES = ['milestone', 'task', 'allday'];
