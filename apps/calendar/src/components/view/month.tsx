import { FunctionComponent, h } from 'preact';
import { Ref, useLayoutEffect, useRef, useState } from 'preact/hooks';

import DayGrid from '@src/components/daygrid/dayGrid';
import DayNames from '@src/components/daygrid/dayNames';
import { usePanelContainer } from '@src/components/hooks/panelContainer';
import { useStore } from '@src/components/hooks/store';
import { useTheme } from '@src/components/hooks/theme';
import Panel from '@src/components/panel';
import { MONTH_DAY_NAME_HEIGHT } from '@src/constants/style';
import { TemplateMonthDayName } from '@src/model';
import { getGridInfo, getMonthCalendar, isWeekend } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { capitalizeDayName } from '@src/util/dayName';
import { getSize } from '@src/util/dom';
import { createMousePositionDataGrabber } from '@src/util/monthViewHelper';

import { OptionData } from '@t/store';

function getDayNames(options: OptionData) {
  const { daynames, workweek } = options.month;
  const dayNames: TemplateMonthDayName[] = [];

  daynames.forEach((name, index) => {
    if (!workweek || (workweek && !isWeekend(index))) {
      dayNames.push({
        label: capitalizeDayName(name),
        day: index,
      });
    }
  });

  return dayNames;
}

function useContainerHeight(container: Ref<HTMLDivElement>, dayNameHeight: number) {
  const [gridPanelHeight, setGridPanelHeight] = useState(0);

  useLayoutEffect(() => {
    if (container.current) {
      const { height } = getSize(container.current);

      setGridPanelHeight(height - dayNameHeight);
    }
  }, [container, dayNameHeight]);

  return gridPanelHeight;
}

const Month: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { state: options } = useStore('options');
  const theme = useTheme();

  const gridPanelHeight = useContainerHeight(containerRef, MONTH_DAY_NAME_HEIGHT);
  const panelContainer = usePanelContainer(containerRef, cls('month-daygrid'));

  if (!theme || !options) {
    return null;
  }

  const dayNames = getDayNames(options);
  const renderMonthDate = new Date(); // @TODO: 현재 렌더링된 MonthDate기준으로 계산(prev, next 사용 시 날짜 계산 필요)
  const monthOptions = options.month;
  const calendar = getMonthCalendar(renderMonthDate, monthOptions);
  const { narrowWeekend, startDayOfWeek, workweek } = options.month;
  const { gridInfo } = getGridInfo(dayNames.length, narrowWeekend, startDayOfWeek, workweek);

  const getMouseDataOnMonth = panelContainer
    ? createMousePositionDataGrabber(calendar, gridInfo, panelContainer)
    : () => null;

  return (
    // @TODO: change to layout component
    <div className={cls('month')} ref={containerRef}>
      <Panel name="month-daynames" height={MONTH_DAY_NAME_HEIGHT}>
        <DayNames
          templateType="monthDayname"
          dayNames={dayNames}
          theme={theme.month.dayname}
          options={monthOptions}
          gridInfo={gridInfo}
          type="month"
        />
      </Panel>
      <Panel name="month-daygrid" height={gridPanelHeight}>
        <DayGrid
          options={monthOptions}
          calendar={calendar}
          appContainer={containerRef}
          shouldRenderDefaultPopup={options.useCreationPopup}
          getMousePositionData={getMouseDataOnMonth}
        />
      </Panel>
    </div>
  );
};

export default Month;
