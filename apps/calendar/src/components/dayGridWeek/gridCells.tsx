import { Fragment, h } from 'preact';
import { memo } from 'preact/compat';

import { GridCell } from '@src/components/dayGridWeek/gridCell';
import { toPercent } from '@src/helpers/css';
import {
  EVENT_HEIGHT,
  getExceedCount,
  getGridWidthAndLeftPercentValues,
  isInGrid,
  TOTAL_WIDTH,
} from '@src/helpers/grid';
import type EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';

interface Props {
  uiModels: EventUIModel[];
  weekDates: TZDate[];
  narrowWeekend: boolean;
  height: number;
  clickedIndex: number;
  isClickedCount: boolean;
  onClickExceedCount: (index: number) => void;
  onClickCollapseButton: () => void;
}

export const GridCells = memo(function GridCells({
  uiModels,
  weekDates,
  narrowWeekend,
  height,
  clickedIndex,
  isClickedCount,
  onClickExceedCount,
  onClickCollapseButton,
}: Props) {
  // @TODO: get margin value dynamically
  const eventTopMargin = 2;
  const { widthList, leftList } = getGridWidthAndLeftPercentValues(
    weekDates,
    narrowWeekend,
    TOTAL_WIDTH
  );
  const lastCellIndex = weekDates.length - 1;

  return (
    <Fragment>
      {weekDates.map((cell, index) => {
        const width = toPercent(widthList[index]);
        const left = toPercent(leftList[index]);

        const uiModelsInCell = uiModels.filter(isInGrid(cell));
        const exceedCount = getExceedCount(uiModelsInCell, height, EVENT_HEIGHT + eventTopMargin);
        const isClickedIndex = index === clickedIndex;
        const isLastCell = index === lastCellIndex;

        return (
          <GridCell
            key={`panel-grid-${cell.getDate()}`}
            width={width}
            left={left}
            index={index}
            exceedCount={exceedCount}
            isClicked={isClickedCount}
            onClickExceedCount={onClickExceedCount}
            isClickedIndex={isClickedIndex}
            onClickCollapseButton={onClickCollapseButton}
            isLastCell={isLastCell}
          />
        );
      })}
    </Fragment>
  );
});
