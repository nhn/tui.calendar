import { cls } from '@src/util/cssHelper';
import TZDate from '@src/time/date';
import { TimeUnit } from '@src/model';

export const className = 'timegrid';
export const prefixer = (selector: string) => cls(selector, `${className}-`);

export const timeFormats: Record<TimeUnit, string> = {
  second: 'HH:mm:ss',
  minute: 'HH:mm',
  hour: 'HH:mm',
  date: 'HH:mm',
  month: 'MM.DD',
  year: 'YYYY.MM.DD'
};

export interface CreationGuideInfo {
  start: TZDate;
  end: TZDate;
  unit: TimeUnit;
  textPosition?: 'top' | 'bottom'; // top is default
  columnIndex?: number;
}
