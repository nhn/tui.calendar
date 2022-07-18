import type { ComponentType } from 'preact';

import type { DeepPartial } from 'ts-essentials';

import type { EventObject, EventObjectWithDefaultValues } from '@t/events';
import type { TemplateConfig } from '@t/template';
import type { ThemeState } from '@t/theme';

export type EventView = 'allday' | 'time';
export type TaskView = 'milestone' | 'task';

export interface CollapseDuplicateEventsOptions {
  getDuplicateEvents: (
    targetEvent: EventObjectWithDefaultValues,
    events: EventObjectWithDefaultValues[]
  ) => EventObjectWithDefaultValues[];
  getMainEvent: (events: EventObjectWithDefaultValues[]) => EventObjectWithDefaultValues;
}

export interface WeekOptions {
  startDayOfWeek?: number;
  dayNames?: [string, string, string, string, string, string, string] | [];
  narrowWeekend?: boolean;
  workweek?: boolean;
  showNowIndicator?: boolean;
  showTimezoneCollapseButton?: boolean;
  timezonesCollapsed?: boolean;
  hourStart?: number;
  hourEnd?: number;
  eventView?: boolean | EventView[];
  taskView?: boolean | TaskView[];
  collapseDuplicateEvents?: boolean | Partial<CollapseDuplicateEventsOptions>;
}

export interface MonthOptions {
  dayNames?: [string, string, string, string, string, string, string] | [];
  startDayOfWeek?: number;
  narrowWeekend?: boolean;
  visibleWeeksCount?: number;
  isAlways6Weeks?: boolean;
  workweek?: boolean;
  visibleEventCount?: number;
}

export interface GridSelectionOptions {
  enableDblClick?: boolean;
  enableClick?: boolean;
}

export interface TimezoneConfig {
  timezoneName: string;
  displayLabel?: string;
  tooltip?: string;
}

export interface TimezoneOptions {
  zones?: TimezoneConfig[];
  customOffsetCalculator?: (timezoneName: string, timestamp: number) => number;
}

export interface CalendarColor {
  color?: string;
  backgroundColor?: string;
  dragBackgroundColor?: string;
  borderColor?: string;
}

export interface CalendarInfo extends CalendarColor {
  id: string;
  name: string;
}

export type ViewType = 'month' | 'week' | 'day';

export interface Options {
  defaultView?: ViewType;
  theme?: DeepPartial<ThemeState>;
  template?: TemplateConfig;
  week?: WeekOptions;
  month?: MonthOptions;
  calendars?: CalendarInfo[];
  useFormPopup?: boolean;
  useDetailPopup?: boolean;
  gridSelection?: boolean | GridSelectionOptions;
  isReadOnly?: boolean;
  usageStatistics?: boolean;
  eventFilter?: (event: EventObject) => boolean;
  timezone?: TimezoneOptions;
}

export interface ViewInfoUserInput {
  component: ComponentType<any>;
  router?: {
    linkTitle: string;
  };
}

export type ViewListMap = {
  [key: string]: ViewInfoUserInput;
};
