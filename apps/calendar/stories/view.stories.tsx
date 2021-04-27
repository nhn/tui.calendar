import { h, FunctionComponent, RenderableProps } from 'preact';
import Main from '@src/components/view/Main';
import Toolbar from '@src/components/toolbar/toolbar';
import MonthView from '@src/components/view/monthView';
import WeekView from '@src/components/view/weekView';
import DayView from '@src/components/view/dayView';
import { cls } from '@src/util/cssHelper';

export default { title: 'View' };

function Wrapper({ children }: RenderableProps<any>) {
  return (
    <div className={cls('layout')} style={{ overflow: 'hidden', height: '100%' }}>
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
const ToolbarContainerWrapper: FunctionComponent = () => <Toolbar />;

export const main = () => {
  const calendarProps = {
    initialView: 'dayGridMonth',
    components: {
      dayGridMonth,
      timeGridWeek,
      timeGridDay,
      toolbar: {
        component: ToolbarContainerWrapper,
      },
    },
  };

  return (
    <Wrapper>
      <Main {...calendarProps} />
    </Wrapper>
  );
};
