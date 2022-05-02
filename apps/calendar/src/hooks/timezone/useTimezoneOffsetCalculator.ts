import { useCallback } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { customOffsetCalculatorSelector, primaryTimezoneSelector } from '@src/selectors/timezone';
import type TZDate from '@src/time/date';
import { calculateTimezoneOffset } from '@src/time/timezone';
import { isPresent } from '@src/utils/type';

export function useTimezoneOffsetCalculator() {
  const primaryTimezoneName = useStore(primaryTimezoneSelector);
  const customOffsetCalculator = useStore(customOffsetCalculatorSelector);

  return useCallback(
    (tzDate: TZDate) =>
      isPresent(customOffsetCalculator)
        ? customOffsetCalculator(primaryTimezoneName, tzDate.getTime())
        : calculateTimezoneOffset(tzDate, primaryTimezoneName),
    [customOffsetCalculator, primaryTimezoneName]
  );
}
