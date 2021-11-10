import { ComponentType } from 'preact';

import { ThemeKeyValue } from '@src/theme/themeProps';

import { EventModelData } from '@t/events';
import { TemplateConfig } from '@t/template';
import { TuiDateConstructor } from '@toast-ui/date';

export interface WeekOption {
  startDayOfWeek?: number;
  daynames?: string[];
  narrowWeekend?: boolean;
  workweek?: boolean;
  showTimezoneCollapseButton?: boolean;
  timezonesCollapsed?: boolean;
  timezones?: TimezoneConfig[];
  hourStart?: number;
  hourEnd?: number;
}

export interface MonthOption {
  daynames?: string[];
  startDayOfWeek?: number;
  narrowWeekend?: boolean;
  visibleWeeksCount?: number;
  isAlways6Week?: boolean;
  workweek?: boolean;
  visibleEventCount?: number;
  moreLayerSize?: {
    width?: string | null;
    height?: string | null;
  };
  grid?: {
    header?: {
      height?: number;
    };
    footer?: {
      height?: number;
    };
  };
  eventFilter?: (event: Required<EventModelData>) => boolean;
}

export interface CustomTimezone {
  dateConstructor?: TuiDateConstructor; // YourCustomDate or LocalDate, UTCDate, MomentDate from @toast-ui/date;
  offset?: number; // If using YourCustomDate or MomentDate
  name?: string; // If using YourCustomDate or MomentDate
}

export interface TimezoneConfig {
  timezoneOffset?: number;
  timezoneName?: string;
  displayLabel?: string;
  tooltip?: string;
}

export interface CalendarColor {
  color?: string;
  bgColor?: string;
  dragBgColor?: string;
  borderColor?: string;
}

export interface CalendarInfo extends CalendarColor {
  id: string;
  name: string;
}

export type ViewType = 'month' | 'week' | 'day';

export interface Option {
  defaultView?: ViewType;
  taskView?: boolean | string[];
  eventView?: boolean | string[];
  theme?: ThemeKeyValue;
  template?: TemplateConfig;
  week?: WeekOption;
  month?: MonthOption;
  calendars?: CalendarInfo[];
  useCreationPopup?: boolean;
  useDetailPopup?: boolean;
  disableDblClick?: boolean;
  disableClick?: boolean;
  isReadOnly?: boolean;
  usageStatistics?: boolean;
  timezone?: CustomTimezone;
}

type Options = Option; // @TODO: Option 정의 필요

interface ViewInfoUserInput {
  component: ComponentType<any>;
  router?: {
    linkTitle: string;
  };
}

type ViewListMap = {
  [key: string]: ViewInfoUserInput;
};
