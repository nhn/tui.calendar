import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

import Calendar from '@src/factory/calendar';

import type { Options } from '@t/options';

export function generateCalendarExample(
  options: Options & { containerHeight?: number },
  calendarManipulation?: (cal: Calendar) => void
) {
  const { containerHeight = 600, ...calendarOptions } = options;
  return function CalendarExample() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const calendarRef = useRef<Calendar>();

    useEffect(() => {
      if (containerRef.current) {
        calendarRef.current = new Calendar(containerRef.current, calendarOptions);

        calendarManipulation?.(calendarRef.current);
      }
    }, []);

    return <div className="container" ref={containerRef} style={{ height: containerHeight }} />;
  };
}
