export type AlldayEventCategory = 'milestone' | 'allday' | 'task';

export type PanelType = 'daygrid' | 'timegrid';

export interface Panel {
  name: string;
  type: PanelType;
  minHeight?: number;
  maxHeight?: number;
  showExpandableButton?: boolean;
  maxExpandableHeight?: number;
  handlers?: ['click', 'creation', 'move', 'resize'];
  show?: boolean;
}
