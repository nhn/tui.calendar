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

/**
 * ex)
 * extractPercentPx('calc(100% - 22px)') // { percent: 100, px: -22 }
 * extractPercentPx('100%') // { percent: 100, px: 0 }
 * extractPercentPx('-22px') // { percent: 0, px: -22 }
 */
export function extractPercentPx(value: string) {
  const percentRegexp = /(\d+)%/;
  const percentResult = value.match(percentRegexp);
  const pxRegexp = /(-?)\s?(\d+)px/;
  const pxResult = value.match(pxRegexp);

  return {
    percent: percentResult ? parseInt(percentResult[1], 10) : 0,
    px: pxResult ? parseInt(`${pxResult[1]}${pxResult[2]}`, 10) : 0,
  };
}

export function getEventColors(uiModel: EventUIModel, calendarColor: CalendarColor) {
  const eventColors = uiModel.model.getColors();

  return Object.keys(DEFAULT_EVENT_COLORS).reduce<CalendarColor>((colors, _key) => {
    const key = _key as keyof CalendarColor;
    colors[key] = eventColors[key] ?? calendarColor[key] ?? DEFAULT_EVENT_COLORS[key];

    return colors;
  }, {});
}
