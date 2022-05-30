import { useCallback } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { useTZConverter } from '@src/hooks/timezone/useTZConverter';
import { primaryTimezoneSelector } from '@src/selectors/timezone';
import type TZDate from '@src/time/date';

export function usePrimaryTimezone(): [string, () => TZDate] {
  const primaryTimezoneName = useStore(primaryTimezoneSelector);
  const tzConverter = useTZConverter();

  const getNow = useCallback(
    () => tzConverter(primaryTimezoneName),
    [primaryTimezoneName, tzConverter]
  );

  return [primaryTimezoneName, getNow];
}
