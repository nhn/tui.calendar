import { h, FunctionComponent } from 'preact';
import { Ref, useLayoutEffect, useRef, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import MonthDayNames from '@src/components/daygrid/dayNames';
import DayGrid from '@src/components/daygrid/dayGrid';
import { useStore } from '@src/components/hooks/store';
import { MonthOption, TemplateMonthDayName } from '@src/model';
import Panel from '@src/components/panel';
import { getSize } from '@src/util/domutil';
import TZDate from '@src/time/date';
import { arr2dCalendar, isWeekend } from '@src/time/datetime';
import { capitalizeDayName } from '@src/util/dayName';
import { isNumber } from '@src/util/utils';
import { DayNameItem } from '@t/components/daygrid/dayNames';

import { OptionData } from '@t/store';

function getDayNames(
  monthDayNameTemplate: (model: TemplateMonthDayName) => string,
  options: OptionData
) {
  const { daynames, workweek } = options.month;
  const dayNames: DayNameItem[] = [];

  daynames.forEach((name, index) => {
    if (!workweek || (workweek && !isWeekend(index))) {
      dayNames.push({
        name: monthDayNameTemplate({
          label: capitalizeDayName(name),
          day: index,
        }),
        dayIndex: index,
      });
    }
  });

  return dayNames;
}

function getDayNameHeight(height?: string | number) {
  const dayNameHeight = height ?? 0;

  return isNumber(dayNameHeight) ? dayNameHeight : parseFloat(dayNameHeight);
}

function getMonthCalendar(renderMonthDate: Date | TZDate, options: MonthOption) {
  const date = new TZDate(renderMonthDate);
  const {
    startDayOfWeek = 0,
    visibleWeeksCount = 0,
    workweek = false,
    isAlways6Week = true,
  } = options;
  const weekCount = Math.min(visibleWeeksCount, 6);

  return arr2dCalendar(date, {
    startDayOfWeek,
    workweek,
    isAlways6Week: visibleWeeksCount ? false : isAlways6Week,
    visibleWeeksCount: visibleWeeksCount ? weekCount : 0,
  });
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
  const container = useRef<HTMLDivElement>(null);

  const { state } = useStore(['template', 'theme', 'options']);
  const { template, theme, options } = state;

  const dayNameHeight = getDayNameHeight(theme?.month.dayname.height);
  const gridPanelHeight = useContainerHeight(container, dayNameHeight);

  if (!template || !theme || !options) {
    return null;
  }

  const dayNames = getDayNames(template.monthDayname, options);
  const renderMonthDate = new Date(); // @TODO: 현재 렌더링된 MonthDate기준으로 계산(prev, next 사용 시 날짜 계산 필요)
  const monthOptions = options.month;
  const calendar = getMonthCalendar(renderMonthDate, monthOptions);

  return (
    <div className={cls('month')} ref={container}>
      <Panel name="month-daynames" height={dayNameHeight}>
        <MonthDayNames dayNames={dayNames} theme={theme.month.dayname} options={monthOptions} />
      </Panel>
      <Panel name="month-daygrid" height={gridPanelHeight}>
        <DayGrid options={monthOptions} calendar={calendar} appContainer={container} />
      </Panel>
    </div>
  );
};

export default Month;
