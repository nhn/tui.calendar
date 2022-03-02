import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { dayGridMonthSelectionHelper } from '@src/helpers/gridSelection';
import TZDate from '@src/time/date';

interface Props {
  currentIndex: number;
  weekLength: number;
  weekDates: TZDate[];
  narrowWeekend: boolean;
}

export function AccumulatedGridSelection({
  currentIndex,
  weekLength,
  weekDates,
  narrowWeekend,
}: Props) {
  const gridSelections = useStore(useCallback((state) => state.gridSelection.dayGridMonth, []));

  const gridSelectionDataByRow = gridSelections.map((gridSelection) =>
    dayGridMonthSelectionHelper.calculateSelection(gridSelection, currentIndex, weekLength)
  );

  return (
    <div className={cls('accumulated-grid-selection')}>
      {gridSelectionDataByRow.map((gridSelectionData) =>
        gridSelectionData ? (
          <GridSelection
            gridSelectionData={gridSelectionData}
            weekDates={weekDates}
            narrowWeekend={narrowWeekend}
          />
        ) : null
      )}
    </div>
  );
}
