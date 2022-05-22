import { useCallback } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { customOffsetCalculatorSelector } from '@src/selectors/timezone';
import type TZDate from '@src/time/date';
import { isPresent } from '@src/utils/type';

export function useTZConverter() {
  const customOffsetCalculator = useStore(customOffsetCalculatorSelector);

  const hasCustomOffsetCalculator = isPresent(customOffsetCalculator);

  return useCallback(
    (timezoneName: string, tzDate: TZDate) =>
      tzDate.tz(
        hasCustomOffsetCalculator
          ? customOffsetCalculator(timezoneName, tzDate.getTime())
          : timezoneName
      ),
    [customOffsetCalculator, hasCustomOffsetCalculator]
  );
}
