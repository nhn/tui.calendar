import { h } from 'preact';
import { forwardRef } from 'preact/compat';
import { useMemo } from 'preact/hooks';

import { GridSelection } from '@src/components/timeGrid/gridSelection';
import { cls, toPercent, toPx } from '@src/helpers/css';
import { timeGridSelectionHelper } from '@src/helpers/gridSelection';
import { useGridSelection } from '@src/hooks/gridSelection/gridSelection';
import { isNil } from '@src/utils/type';

import { PropsWithChildren } from '@t/components/common';
import { GridPositionFinder, TimeGridData } from '@t/grid';

export const ColumnsContainerWithGridSelection = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    gridPositionFinder: GridPositionFinder;
    timesWidth: number;
    timeGridData: TimeGridData;
  }>
>(function ColumnsContainerWithGridSelection(
  { children, timeGridData, gridPositionFinder, timesWidth },
  ref
) {
  const { onMouseDown, gridSelection: timeGridSelection } = useGridSelection({
    type: 'timeGrid',
    gridPositionFinder,
    selectionSorter: timeGridSelectionHelper.sortSelection,
    dateGetter: timeGridSelectionHelper.getDateFromCollection,
    dateCollection: timeGridData,
  });

  const gridSelectionProps = useMemo(
    () =>
      timeGridData.columns.map((_, columnIndex) => {
        const gridSelection = timeGridSelectionHelper.calculateSelection(
          timeGridSelection,
          columnIndex
        );

        if (!gridSelection) {
          return null;
        }

        const { startRowIndex, endRowIndex, isStartingColumn, isSelectingMultipleColumns } =
          gridSelection;

        const { top: startRowTop, startTime: startRowStartTime } = timeGridData.rows[startRowIndex];
        const {
          top: endRowTop,
          height: endRowHeight,
          endTime: endRowEndTime,
        } = timeGridData.rows[endRowIndex];

        const gridSelectionHeight = endRowTop + endRowHeight - startRowTop;

        let text = `${startRowStartTime} - ${endRowEndTime}`;
        if (isSelectingMultipleColumns) {
          text = isStartingColumn ? startRowStartTime : '';
        }

        return {
          top: startRowTop,
          height: gridSelectionHeight,
          text,
        };
      }),
    [timeGridData, timeGridSelection]
  );

  return (
    <div
      className={cls('columns')}
      style={{ left: toPx(timesWidth) }}
      ref={ref}
      onMouseDown={onMouseDown}
    >
      {children}
      <div className={cls('timegrid-selections')}>
        {gridSelectionProps.map((prop, columnIndex) => (
          <div
            key={`timegrid-selection-${columnIndex}-${prop?.top}`}
            className={cls('timegrid-selection-column')}
            style={{
              width: toPercent(timeGridData.columns[columnIndex].width),
            }}
          >
            {isNil(prop) ? null : (
              <GridSelection key={`${prop.top}-${prop.height}-${prop.text}`} {...prop} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
