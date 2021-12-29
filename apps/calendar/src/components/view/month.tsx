import { FunctionComponent, h } from 'preact';
import { useLayoutEffect, useMemo, useState } from 'preact/hooks';

import GridHeader from '@src/components/dayGridCommon/gridHeader';
import { DayGridMonth } from '@src/components/dayGridMonth/dayGridMonth';
import { Layout } from '@src/components/layout';
import { Panel } from '@src/components/panel';
import { MONTH_DAY_NAME_HEIGHT } from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/theme';
import { cls } from '@src/helpers/css';
import { capitalizeDayName } from '@src/helpers/dayName';
import { createDateMatrixOfMonth } from '@src/helpers/grid';
import { useDOMNode } from '@src/hooks/common/domNode';
import { optionsSelector } from '@src/selectors';
import { getGridInfo, isWeekend } from '@src/time/datetime';
import { getSize } from '@src/utils/dom';

import { MonthOptions } from '@t/options';
import { CalendarStore } from '@t/store';
import { TemplateMonthDayName } from '@t/template';

function getDayNames(options: CalendarStore['options']) {
  const { daynames, workweek } = options.month as Required<MonthOptions>;
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

function useContainerHeight(container: HTMLDivElement | null, dayNameHeight: number) {
  const [gridPanelHeight, setGridPanelHeight] = useState(0);

  useLayoutEffect(() => {
    if (container) {
      const { height } = getSize(container);

      setGridPanelHeight(height - dayNameHeight);
    }
  }, [container, dayNameHeight]);

  return gridPanelHeight;
}

export const Month: FunctionComponent = () => {
  const [container, containerRef] = useDOMNode<HTMLDivElement>();

  const options = useStore(optionsSelector);
  const theme = useTheme();

  const gridPanelHeight = useContainerHeight(container, MONTH_DAY_NAME_HEIGHT);

  const dayNames = getDayNames(options);
  const monthOptions = options.month as Required<MonthOptions>;
  const { narrowWeekend, startDayOfWeek, workweek } = monthOptions;

  const dateMatrix = useMemo(
    // @TODO: 현재 렌더링된 MonthDate기준으로 계산(prev, next 사용 시 날짜 계산 필요)
    () => createDateMatrixOfMonth(new Date(), monthOptions),
    [monthOptions]
  );
  const { gridInfo } = useMemo(
    () => getGridInfo(dayNames.length, narrowWeekend, startDayOfWeek, workweek),
    [dayNames.length, narrowWeekend, startDayOfWeek, workweek]
  );

  return (
    <Layout className={cls('month')} ref={containerRef}>
      <Panel name="month-daynames" initialHeight={MONTH_DAY_NAME_HEIGHT}>
        <GridHeader
          templateType="monthDayname"
          dayNames={dayNames}
          theme={theme.month.dayname}
          options={monthOptions}
          gridInfo={gridInfo}
          type="month"
        />
      </Panel>
      <Panel name="month-daygrid" initialHeight={gridPanelHeight}>
        <DayGridMonth options={monthOptions} dateMatrix={dateMatrix} gridInfo={gridInfo} />
      </Panel>
    </Layout>
  );
};
