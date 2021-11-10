import TZDate from '@src/time/date';

import { TimeUnit } from '@t/events';

export const className = 'timegrid';
export const addTimeGridPrefix = (selector: string) => `${className}-${selector}`;

export const timeFormats: Record<TimeUnit, string> = {
  second: 'HH:mm:ss',
  minute: 'HH:mm',
  hour: 'HH:mm',
  date: 'HH:mm',
  month: 'MM.DD',
  year: 'YYYY.MM.DD',
};

export interface GridSelectionInfo {
  start: TZDate;
  end: TZDate;
  unit: TimeUnit;
  textPosition?: 'top' | 'bottom'; // top is default
  columnIndex?: number;
}
