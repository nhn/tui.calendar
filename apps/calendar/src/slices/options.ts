import produce from 'immer';

import { DEFAULT_DAY_NAMES } from '@src/helpers/dayName';
import { compare, Day } from '@src/time/datetime';
import { last } from '@src/utils/array';
import { mergeObject } from '@src/utils/object';
import { isBoolean } from '@src/utils/type';

import type { EventObject, EventObjectWithDefaultValues } from '@t/events';
import type {
  CollapseDuplicateEventsOptions,
  GridSelectionOptions,
  Options,
  TimezoneOptions,
} from '@t/options';
import type {
  CalendarMonthOptions,
  CalendarState,
  CalendarStore,
  CalendarWeekOptions,
  SetState,
} from '@t/store';

function initializeCollapseDuplicateEvents(
  options: boolean | Partial<CollapseDuplicateEventsOptions>
): boolean | CollapseDuplicateEventsOptions {
  if (!options) {
    return false;
  }

  const initialCollapseDuplicateEvents = {
    getDuplicateEvents: (
      targetEvent: EventObjectWithDefaultValues,
      events: EventObjectWithDefaultValues[]
    ) =>
      events
        .filter(
          (event: EventObjectWithDefaultValues) =>
            event.title === targetEvent.title &&
            compare(event.start, targetEvent.start) === 0 &&
            compare(event.end, targetEvent.end) === 0
        )
        .sort((a, b) => (a.calendarId > b.calendarId ? 1 : -1)),
    getMainEvent: (events: EventObjectWithDefaultValues[]) => last(events),
  };

  if (isBoolean(options)) {
    return initialCollapseDuplicateEvents;
  }

  return { ...initialCollapseDuplicateEvents, ...options };
}

function initializeWeekOptions(weekOptions: Options['week'] = {}): CalendarWeekOptions {
  const week: CalendarWeekOptions = {
    startDayOfWeek: Day.SUN,
    dayNames: [],
    narrowWeekend: false,
    workweek: false,
    showNowIndicator: true,
    showTimezoneCollapseButton: false,
    timezonesCollapsed: false,
    hourStart: 0,
    hourEnd: 24,
    eventView: true,
    taskView: true,
    collapseDuplicateEvents: false,
    ...weekOptions,
  };

  week.collapseDuplicateEvents = initializeCollapseDuplicateEvents(week.collapseDuplicateEvents);

  return week;
}

function initializeTimezoneOptions(timezoneOptions: Options['timezone'] = {}): TimezoneOptions {
  return {
    zones: [],
    ...timezoneOptions,
  };
}

function initializeMonthOptions(monthOptions: Options['month'] = {}): CalendarMonthOptions {
  const month: CalendarMonthOptions = {
    dayNames: [],
    visibleWeeksCount: 0,
    workweek: false,
    narrowWeekend: false,
    startDayOfWeek: Day.SUN,
    isAlways6Weeks: true,
    visibleEventCount: 6,
    ...monthOptions,
  };

  if (month.dayNames.length === 0) {
    month.dayNames = DEFAULT_DAY_NAMES.slice() as Exclude<CalendarMonthOptions['dayNames'], []>;
  }

  return month;
}

export function initializeGridSelectionOptions(
  options: Options['gridSelection']
): GridSelectionOptions {
  if (isBoolean(options)) {
    return {
      enableDblClick: options,
      enableClick: options,
    };
  }

  return {
    enableDblClick: true,
    enableClick: true,
    ...options,
  };
}

const initialEventFilter = (event: EventObject) => !!event.isVisible;

// TODO: some of options has default values. so it should be `Required` type.
// But it needs a complex type such as `DeepRequired`.
// maybe leveraging library like `ts-essential` might be helpful.
export type OptionsSlice = {
  options: Omit<Required<Options>, 'template' | 'calendars' | 'theme'> & {
    gridSelection: GridSelectionOptions;
  };
};

export type OptionsDispatchers = {
  setOptions: (newOptions: Partial<OptionsSlice['options']>) => void;
};

// eslint-disable-next-line complexity
export function createOptionsSlice(options: Options = {}): OptionsSlice {
  return {
    options: {
      defaultView: options.defaultView ?? 'week',
      useFormPopup: options.useFormPopup ?? false,
      useDetailPopup: options.useDetailPopup ?? false,
      isReadOnly: options.isReadOnly ?? false,
      week: initializeWeekOptions(options.week),
      month: initializeMonthOptions(options.month),
      gridSelection: initializeGridSelectionOptions(options.gridSelection),
      usageStatistics: options.usageStatistics ?? true,
      eventFilter: options.eventFilter ?? initialEventFilter,
      timezone: initializeTimezoneOptions(options.timezone),
    },
  };
}

export function createOptionsDispatchers(set: SetState<CalendarStore>): OptionsDispatchers {
  return {
    setOptions: (newOptions: Partial<OptionsSlice['options']> = {}) =>
      set(
        produce<CalendarState>((state) => {
          if (newOptions.gridSelection) {
            newOptions.gridSelection = initializeGridSelectionOptions(newOptions.gridSelection);
          }

          if (newOptions.week?.collapseDuplicateEvents) {
            newOptions.week.collapseDuplicateEvents = initializeCollapseDuplicateEvents(
              newOptions.week.collapseDuplicateEvents
            );
          }

          mergeObject(state.options, newOptions);
        })
      ),
  };
}
