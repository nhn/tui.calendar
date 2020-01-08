import { Direction } from '@src/controller/layout';
import { PanelInfo } from '@src/controller/panel';

export const DEFAULT_WEEK_PANELS: PanelInfo[] = [
  {
    name: 'dayname',
    direction: Direction.COLUMN,
    height: 40
  },
  {
    name: 'milestone',
    direction: Direction.COLUMN,
    minHeight: 20,
    maxHeight: 80,
    expandable: true,
    maxExpandableHeight: 210,
    resizable: true
  },
  {
    name: 'task',
    direction: Direction.COLUMN,
    minHeight: 40,
    maxHeight: 120,
    expandable: true,
    maxExpandableHeight: 210,
    resizable: true
  },
  {
    name: 'allday',
    direction: Direction.COLUMN,
    minHeight: 30,
    maxHeight: 80,
    expandable: true,
    maxExpandableHeight: 210,
    resizable: true
  },
  {
    name: 'time',
    direction: Direction.COLUMN,
    autoSize: 1
  }
];
