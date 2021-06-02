import type TZDate from '@src/time/date';

export type PanelName = 'milestone' | 'allday' | 'task' | string;

export type SpecialEventType = 'milestone' | 'allday' | 'task';

export type PanelType = 'daygrid' | 'timegrid';

export interface Panel {
  name: PanelName;
  type: PanelType;
  minHeight?: number;
  maxHeight?: number;
  showExpandableButton?: boolean;
  maxExpandableHeight?: number;
  handlers?: ['click', 'creation', 'move', 'resize'];
  show?: boolean;
}

export type Cells = TZDate[];
