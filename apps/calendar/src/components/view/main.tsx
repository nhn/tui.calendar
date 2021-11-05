import { FunctionComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';

import DayView from '@src/components/view/dayView';
import MonthView from '@src/components/view/monthView';
import WeekView from '@src/components/view/weekView';
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
