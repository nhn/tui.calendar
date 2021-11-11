import { Direction } from '@src/constants/layout';

export interface PanelSize {
  width: number | null;
  height: number | null;
  resizerWidth: number | null;
  resizerHeight: number | null;
}

export interface RectSize {
  width: number;
  height: number;
}

export interface PanelRect extends RectSize {
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

export type PanelElementRectMap = Record<string, PanelRect>;
