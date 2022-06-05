import { DEFAULT_EVENT_COLORS } from '@src/constants/style';
import type EventUIModel from '@src/model/eventUIModel';
import { isString } from '@src/utils/type';

import type { CalendarColor } from '@t/options';

export const CSS_PREFIX = 'toastui-calendar-';

interface ClassNameDictionary {
  [id: string]: boolean | undefined | null;
}

type ClassNameValue = string | ClassNameDictionary | undefined | null;

export function cls(...args: ClassNameValue[]): string {
  const result: string[] = [];

  args.forEach((arg) => {
    if (!arg) {
      return;
    }

    if (isString(arg)) {
      result.push(arg);
    } else {
      Object.keys(arg).forEach((className) => {
        if (arg[className]) {
          result.push(className);
        }
      });
    }
  });

  return result.map((str: string) => `${CSS_PREFIX}${str}`).join(' ');
}

export function toPercent(value: number) {
  return `${value}%`;
}

export function toPx(value: number) {
  return `${value}px`;
}

// eslint-disable-next-line complexity
export function getEventItemColors(uiModel: EventUIModel, calendarColor: CalendarColor) {
  const eventColors = uiModel.model.getColors();

  return {
    color: eventColors.color ?? calendarColor.color ?? DEFAULT_EVENT_COLORS.color,
    borderColor:
      eventColors.borderColor ?? calendarColor.borderColor ?? DEFAULT_EVENT_COLORS.borderColor,
    backgroundColor:
      eventColors.backgroundColor ??
      calendarColor.backgroundColor ??
      DEFAULT_EVENT_COLORS.backgroundColor,
    dragBackgroundColor:
      eventColors.dragBackgroundColor ??
      calendarColor.dragBackgroundColor ??
      DEFAULT_EVENT_COLORS.dragBackgroundColor,
  };
}
