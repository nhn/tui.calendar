import { cls } from '@src/util/cssHelper';
import { FunctionComponent, h, RenderableProps } from 'preact';
import CalendarApp from '@src/prototyping/App';
import MonthView from '@src/prototyping/components/view/MonthView';
import WeekView from '@src/prototyping/components/view/WeekView';
import DayView from '@src/prototyping/components/view/DayView';
import ToolbarContainer from '@src/prototyping/containers/ToolbarContainer';

export default { title: 'Prototyping' };

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
    linkTitle: '월간',
  },
};

const timeGridWeek = {
  component: WeekView,
  router: {
    linkTitle: '주간',
  },
};

const timeGridDay = {
  component: DayView,
  router: {
    linkTitle: '일간',
  },
};
const ToolbarContainerWrapper: FunctionComponent = () => <ToolbarContainer />;

export const app = () => {
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
      <CalendarApp {...calendarProps} />
    </Wrapper>
  );
};
