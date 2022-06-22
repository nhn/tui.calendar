import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { dayGridMonthSelectionHelper } from '@src/helpers/gridSelection';
import type TZDate from '@src/time/date';

interface Props {
  rowIndex: number;
  weekDates: TZDate[];
  narrowWeekend: boolean;
}

export function AccumulatedGridSelection({ rowIndex, weekDates, narrowWeekend }: Props) {
  const gridSelectionDataByRow = useStore(
    useCallback(
      (state) =>
        state.gridSelection.accumulated.dayGridMonth.map((gridSelection) =>
          dayGridMonthSelectionHelper.calculateSelection(gridSelection, rowIndex, weekDates.length)
        ),
      [rowIndex, weekDates]
    )
  );

  return (
    <div className={cls('accumulated-grid-selection')}>
      {gridSelectionDataByRow.map((gridSelectionData) =>
        gridSelectionData ? (
          <GridSelection
            type="accumulated"
            gridSelectionData={gridSelectionData}
            weekDates={weekDates}
            narrowWeekend={narrowWeekend}
          />
        ) : null
      )}
    </div>
  );
}
