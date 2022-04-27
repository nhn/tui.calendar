import type { ComponentType } from 'preact';

import type { TuiDateConstructor } from '@toast-ui/date';
import type { DeepPartial } from 'ts-essentials';

import type { EventModelData } from '@t/events';
import type { TemplateConfig } from '@t/template';
import type { ThemeState } from '@t/theme';

type EventView = 'allday' | 'time';
type TaskView = 'milestone' | 'task';

export interface WeekOptions {
  startDayOfWeek?: number;
  daynames?: string[];
  narrowWeekend?: boolean;
  workweek?: boolean;
  showTimezoneCollapseButton?: boolean;
  timezonesCollapsed?: boolean;
  timezones?: TimezoneConfig[];
  hourStart?: number;
  hourEnd?: number;
  eventView?: boolean | EventView[];
  taskView?: boolean | TaskView[];
}

export interface MonthOptions {
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

export interface GridSelectionOptions {
  enableDblClick?: boolean;
  enableClick?: boolean;
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

// @TODO: Options 정의 필요
export interface Options {
  defaultView?: ViewType;
  theme?: DeepPartial<ThemeState>;
  template?: TemplateConfig;
  week?: WeekOptions;
  month?: MonthOptions;
  calendars?: CalendarInfo[];
  useCreationPopup?: boolean;
  useDetailPopup?: boolean;
  gridSelection?: boolean | GridSelectionOptions;
  isReadOnly?: boolean;
  usageStatistics?: boolean;
  timezone?: CustomTimezone;
}

interface ViewInfoUserInput {
  component: ComponentType<any>;
  router?: {
    linkTitle: string;
  };
}

type ViewListMap = {
  [key: string]: ViewInfoUserInput;
};
