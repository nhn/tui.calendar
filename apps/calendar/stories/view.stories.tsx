import { h, RenderableProps } from 'preact';

import Toolbar from '@src/components/toolbar/toolbar';
import DayView from '@src/components/view/dayView';
import Main from '@src/components/view/Main';
import MonthView from '@src/components/view/monthView';
import WeekView from '@src/components/view/weekView';
import { cls } from '@src/util/cssHelper';

import { ViewListMap } from '@t/option';

import { createStore } from '@stories/util/providerWrapper';

import { createRandomEventModelsForMonth } from './util/randomEvents';

export default { title: 'View' };

const store = createStore({});
const style = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 5,
  top: 5,
};

function Wrapper({ children }: RenderableProps<any>) {
  return (
    <div className={cls('layout')} style={style}>
      {children}
    </div>
  );
}

const dayGridMonth = {
  component: MonthView,
  router: {
    linkTitle: 'Monthly',
  },
};

const timeGridWeek = {
  component: WeekView,
  router: {
    linkTitle: 'Weekly',
  },
};

const timeGridDay = {
  component: DayView,
  router: {
    linkTitle: 'Daily',
  },
};

function createEvents() {
  const events = createRandomEventModelsForMonth();

  store.dispatch('dataStore/clearSchedules');

  if (events.length) {
    store.dispatch('dataStore/createSchedules', { events });
  }
}

export const main = () => {
  const components: ViewListMap = {
    dayGridMonth,
    timeGridWeek,
    timeGridDay,
    toolbar: {
      component: Toolbar,
    },
  };

  createEvents();

  return (
    <Wrapper>
      <Main initialView="dayGridMonth" components={components} store={store} />
    </Wrapper>
  );
};
