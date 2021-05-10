import { h, RenderableProps } from 'preact';
import Main from '@src/components/view/Main';
import Toolbar from '@src/components/toolbar/toolbar';
import MonthView from '@src/components/view/monthView';
import WeekView from '@src/components/view/weekView';
import DayView from '@src/components/view/dayView';
import { cls } from '@src/util/cssHelper';
import { ViewListMap } from '@t/option';

export default { title: 'View' };

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

export const main = () => {
  const components: ViewListMap = {
    dayGridMonth,
    timeGridWeek,
    timeGridDay,
    toolbar: {
      component: Toolbar,
    },
  };

  return (
    <Wrapper>
      <Main initialView="dayGridMonth" components={components} />
    </Wrapper>
  );
};
