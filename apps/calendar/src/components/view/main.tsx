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

export const Main: FunctionComponent = () => {
  const { currentView } = useStore(topLevelStateSelector('view'));
  const CurrentViewComponent = useMemo(() => views[currentView] || null, [currentView]);

  return <CurrentViewComponent />;
};
