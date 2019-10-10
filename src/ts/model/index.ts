import TZDate from '@src/time/date';
import { ScheduleCategory } from '@src/model/schedule';

export type DateType = Date | string | number | TZDate;

export interface ScheduleData {
  id?: string;
  calendarId?: string;
  title?: string;
  body?: string;
  start?: DateType;
  end?: DateType;
  goingDuration?: number;
  comingDuration?: number;
  isAllDay?: boolean;
  category?: ScheduleCategory;
  dueDateClass?: string;
  location?: string;
  attendees?: string[];
  recurrenceRule?: string;
  isPending?: boolean;
  isFocused?: boolean;
  isVisible?: boolean;
  isReadOnly?: boolean;
  isPrivate?: boolean;
  color?: string;
  bgColor?: string;
  dragBgColor?: string;
  borderColor?: string;
  customStyle?: string;
  state?: string;
  raw?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
