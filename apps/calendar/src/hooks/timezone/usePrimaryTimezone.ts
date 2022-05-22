import { useCallback } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { useTZConverter } from '@src/hooks/timezone/useTZConverter';
import { primaryTimezoneSelector } from '@src/selectors/timezone';
import TZDate from '@src/time/date';

export function usePrimaryTimezone() {
  const primaryTimezoneName = useStore(primaryTimezoneSelector);
  const tzConverter = useTZConverter();

  const getNow = useCallback(() => {
    const now = new TZDate();
    return tzConverter(primaryTimezoneName, now);
  }, [primaryTimezoneName, tzConverter]);

  return [primaryTimezoneName, getNow];
}
