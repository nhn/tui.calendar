import { FunctionComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';

import DayView from '@src/components/view/day';
import MonthView from '@src/components/view/month';
import WeekView from '@src/components/view/week';
import { useStore } from '@src/contexts/calendarStore';
import { ViewType } from '@src/model';
import { topLevelStateSelector } from '@src/selectors';

const views: {
  [k in ViewType]: FunctionComponent;
} = {
  month: MonthView,
  week: WeekView,
  day: DayView,
};

const viewSelector = topLevelStateSelector('view');

export const Main: FunctionComponent = () => {
  const { currentView } = useStore(viewSelector);
  const CurrentViewComponent = useMemo(() => views[currentView] || null, [currentView]);

  return <CurrentViewComponent />;
};
