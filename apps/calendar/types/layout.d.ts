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
