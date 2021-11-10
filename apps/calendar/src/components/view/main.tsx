import { FunctionComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';

import { Day } from '@src/components/view/day';
import { Month } from '@src/components/view/month';
import { Week } from '@src/components/view/week';
import { useStore } from '@src/contexts/calendarStore';
import { viewSelector } from '@src/selectors';

import { ViewType } from '@t/option';

const views: {
  [k in ViewType]: FunctionComponent;
} = {
  month: Month,
  week: Week,
  day: Day,
};

export const Main: FunctionComponent = () => {
  const { currentView } = useStore(viewSelector);
  const CurrentViewComponent = useMemo(() => views[currentView] || (() => null), [currentView]);

  return <CurrentViewComponent />;
};
