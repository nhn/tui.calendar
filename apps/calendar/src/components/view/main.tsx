import type { FunctionComponent } from 'preact';
import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { Day } from '@src/components/view/day';
import { Month } from '@src/components/view/month';
import { Week } from '@src/components/view/week';
import { useStore } from '@src/contexts/calendarStore';
import { viewSelector } from '@src/selectors';

import type { ViewType } from '@t/options';

const views: {
  [k in ViewType]: FunctionComponent;
} = {
  month: Month,
  week: Week,
  day: Day,
};

export function Main() {
  const { currentView } = useStore(viewSelector);
  const CurrentViewComponent = useMemo(() => views[currentView] || (() => null), [currentView]);

  return <CurrentViewComponent />;
}
