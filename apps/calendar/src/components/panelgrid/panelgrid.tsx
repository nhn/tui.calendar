import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';
import {
  EVENT_HEIGHT,
  getExceedCount,
  getGridWidthAndLeftPercentValues,
  isInGrid,
  TOTAL_WIDTH,
} from '@src/util/gridHelper';
import { useActions } from '@src/components/hooks/store';
import { DEFAULT_PANEL_HEIGHT } from '@src/controller/panel';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { WeekOption } from '@src/model';

import type { Cells } from '@t/panel';

const DEFAULT_GRID_STYLE = {
  borderLeft: '1px solid #ddd',
};

interface Props {
  name: string;
  cells: Cells;
  events: ScheduleViewModel[];
  height: number;
  options?: WeekOption;
}

interface ExceedCountProps {
  index: number;
  exceedCount: number;
  isClicked: boolean;
  onClick: (exceedCount: number) => void;
}

interface CollapseButtonProps {
  isClicked: boolean;
  isClickedIndex: boolean;
  onClick: () => void;
}

const ExceedCount: FunctionComponent<ExceedCountProps> = ({
  index,
  exceedCount,
  isClicked,
  onClick,
}) => {
  const clickExceedCount = () => onClick(index);
  const style = { display: isClicked ? 'none' : '' };

  return exceedCount && !isClicked ? (
    <span
      className={cls('weekday-exceed-in-week')}
      onClick={clickExceedCount}
      style={style}
    >{`+${exceedCount}`}</span>
  ) : null;
};

const CollapseButton: FunctionComponent<CollapseButtonProps> = ({
  isClicked,
  isClickedIndex,
  onClick,
}) =>
  isClicked && isClickedIndex ? (
    <span className={cls('weekday-exceed-in-week')} onClick={onClick}>
      <i className={cls('collapse-btn')} />
    </span>
  ) : null;

export const PanelGrid: FunctionComponent<Props> = ({
  name,
  cells,
  events,
  height,
  options = {},
}) => {
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isClickedCount, setClickedCount] = useState(false);
  const { narrowWeekend = false } = options;
  const { updatePanelHeight } = useActions('grid');
  // @TODO: set margin value from theme in store
  const eventTopMargin = 2;
  const maxTop = Math.max(0, ...events.map(({ top }) => top));

  const onClickExceedCount = (index: number) => {
    setClickedCount(true);
    setClickedIndex(index);
    updatePanelHeight({
      type: name,
      height: (maxTop + 1) * EVENT_HEIGHT,
    });
  };
  const onClickCollapseButton = () => {
    setClickedCount(false);
    updatePanelHeight({
      type: name,
      height: DEFAULT_PANEL_HEIGHT,
    });
  };

  const { widthList, leftList } = getGridWidthAndLeftPercentValues(
    cells,
    narrowWeekend,
    TOTAL_WIDTH
  );

  const gridCells = cells.map((cell, index) => {
    const width = toPercent(widthList[index]);
    const left = toPercent(leftList[index]);

    const eventModelsInCell = events.filter(isInGrid(cell));
    const exceedCount = getExceedCount(eventModelsInCell, height, EVENT_HEIGHT + eventTopMargin);
    const isClickedIndex = index === clickedIndex;

    return (
      <div
        key={`panel-grid-${cell.getDate()}`}
        className={cls('panel-grid')}
        style={{ ...DEFAULT_GRID_STYLE, width, left }}
      >
        <ExceedCount
          index={index}
          exceedCount={exceedCount}
          isClicked={isClickedCount}
          onClick={onClickExceedCount}
        />
        <CollapseButton
          isClickedIndex={isClickedIndex}
          isClicked={isClickedCount}
          onClick={onClickCollapseButton}
        />
      </div>
    );
  });

  return <div className={cls('panel-grid-wrapper')}>{gridCells}</div>;
};
