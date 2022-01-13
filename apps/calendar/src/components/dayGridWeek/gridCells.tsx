import { Fragment, h } from 'preact';

import { GridCell } from '@src/components/dayGridWeek/gridCell';
import { toPercent } from '@src/helpers/css';
import {
  EVENT_HEIGHT,
  getExceedCount,
  getGridWidthAndLeftPercentValues,
  isInGrid,
  TOTAL_WIDTH,
} from '@src/helpers/grid';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';

interface Props {
  uiModels: EventUIModel[];
  row: TZDate[];
  narrowWeekend: boolean;
  height: number;
  clickedIndex: number;
  isClickedCount: boolean;
  onClickExceedCount: (index: number) => void;
  onClickCollapseButton: () => void;
}

export function GridCells({
  uiModels,
  row,
  narrowWeekend,
  height,
  clickedIndex,
  isClickedCount,
  onClickExceedCount,
  onClickCollapseButton,
}: Props) {
  // @TODO: get margin value dynamically
  const eventTopMargin = 2;
  const { widthList, leftList } = getGridWidthAndLeftPercentValues(row, narrowWeekend, TOTAL_WIDTH);

  return (
    <Fragment>
      {row.map((cell, index) => {
        const width = toPercent(widthList[index]);
        const left = toPercent(leftList[index]);

        const uiModelsInCell = uiModels.filter(isInGrid(cell));
        const exceedCount = getExceedCount(uiModelsInCell, height, EVENT_HEIGHT + eventTopMargin);
        const isClickedIndex = index === clickedIndex;

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
          />
        );
      })}
    </Fragment>
  );
}
