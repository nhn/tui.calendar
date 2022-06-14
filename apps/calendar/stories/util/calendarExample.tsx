import { h } from 'preact';
import { useLayoutEffect, useRef } from 'preact/hooks';

import type { Story } from '@storybook/preact';

import Calendar from '@src/factory/calendar';

import type { Options } from '@t/options';

interface Props {
  options?: Options;
  containerHeight?: number | string;
  onInit?: (instance: Calendar) => void;
}

export type CalendarExampleStory = Story<Props>;

export function CalendarExample({ options, containerHeight = 600, onInit }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<Calendar | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      calendarRef.current = new Calendar(containerRef.current, options);

      // For handling instance after initialization.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.$cal = calendarRef.current;

      onInit?.(calendarRef.current);
    }
  }, [onInit, options]);

  return <div className="container" ref={containerRef} style={{ height: containerHeight }} />;
}
