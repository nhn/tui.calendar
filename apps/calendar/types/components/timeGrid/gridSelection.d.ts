import type TZDate from '@src/time/date';

import { TimeUnit } from '@t/events';

export interface TimeGridSelectionInfo {
  start: TZDate;
  end: TZDate;
  unit: TimeUnit;
  textPosition?: 'top' | 'bottom';
  columnIndex?: number;
}
