import { register, unregister } from 'timezone-mock';

import { initCalendarStore } from '@src/contexts/calendarStore';
import { useTZConverter } from '@src/hooks/timezone/useTZConverter';
import { renderHook } from '@src/test/utils';
import TZDate from '@src/time/date';

import type { Options } from '@t/options';

beforeEach(() => {
  register('UTC');
});

afterEach(() => {
  unregister();
});

describe('When it has customOffsetCalculator', () => {
  const customOffsetCalculator = jest.fn().mockImplementation((timezoneName, timestamp) => {
    if (timezoneName === 'UTC') {
      return 0;
    }

    if (timezoneName === 'America/New_York') {
      return -360; // It's mocked and impossible value because New York is UTC -4~-5.
    }

    return new Date(timestamp).getTimezoneOffset();
  });

  it('should convert TZDate following customOffsetCalculator', () => {
    // Given
    const timezoneName = 'America/New_York';
    const options: Options = {
      timezone: {
        customOffsetCalculator,
        zones: [
          {
            timezoneName,
          },
        ],
      },
    };
    const store = initCalendarStore(options);
    const date = new TZDate('2022-05-22T06:00:00Z');

    // When
    const { result } = renderHook(() => useTZConverter(), { store });

    // Then
    expect(result.current?.(timezoneName, date)?.toDate()).toEqual(
      new TZDate('2022-05-22T00:00:00Z').toDate()
    );
  });
});

describe('When it does not have customOffsetCalculator', () => {
  it('should convert TZDate following Intl.DateTimeFormat', () => {
    // Given
    const timezoneName = 'America/New_York';
    const options: Options = {
      timezone: {
        zones: [
          {
            timezoneName,
          },
        ],
      },
    };
    const store = initCalendarStore(options);
    const date = new TZDate('2022-05-22T06:00:00Z');

    // When
    const { result } = renderHook(() => useTZConverter(), { store });

    // Then
    expect(result.current?.(timezoneName, date)?.toDate()).toEqual(
      new TZDate('2022-05-22T02:00:00Z').toDate() // in EDT (UTC -4)
    );
  });
});
