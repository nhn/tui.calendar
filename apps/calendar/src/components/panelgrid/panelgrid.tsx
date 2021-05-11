import { FunctionComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';
import {
  EVENT_HEIGHT,
  getGridStyleInfo,
  getViewModels,
  isInGrid,
  TOTAL_WIDTH,
} from '@src/event/panelEvent';
import { setViewModelsInfo } from '@src/event/gridEvent';
import Schedule from '@src/model/schedule';
import { toStartOfDay } from '@src/time/datetime';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { PanelActionType, PanelState, PanelStore } from '@src/components/layout';

import type { Cells } from '@t/panel';

const DEFAULT_GRID_STYLE = {
  borderRight: '1px solid #ddd',
};

interface Props {
  name: string;
  cells: Cells;
  events: Schedule[];
  defaultPanelHeight: number;
  options?: PanelState;
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

const isExceededHeight = (panelHeight: number, eventHeight: number) => {
  return ({ top }: ScheduleViewModel) => panelHeight < (top + 1) * eventHeight;
};

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
  defaultPanelHeight,
  options = {},
}) => {
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isClickedCount, setClickedCount] = useState(false);
  const { dispatch } = useContext(PanelStore);
  const { narrowWeekend = false, panelHeight = EVENT_HEIGHT } = options;

  const viewModels = getViewModels(events, cells);
  setViewModelsInfo(viewModels, cells, {});
  const maxTop = Math.max(0, ...viewModels.map(({ top }) => top));

  const onClickExceedCount = (index: number) => {
    setClickedCount(true);
    setClickedIndex(index);
    dispatch({
      type: PanelActionType.UPDATE_PANEL_HEIGHT,
      panelType: name,
      state: {
        panelHeight: (maxTop + 1) * EVENT_HEIGHT,
      },
    });
  };
  const onClickCollapseButton = () => {
    setClickedCount(false);
    dispatch({
      type: PanelActionType.UPDATE_PANEL_HEIGHT,
      panelType: name,
      state: {
        panelHeight: defaultPanelHeight,
      },
    });
  };

  const { widthList, leftList } = getGridStyleInfo(cells, narrowWeekend, TOTAL_WIDTH);

  const gridCells = cells.map((cell, index) => {
    const width = toPercent(widthList[index]);
    const left = toPercent(leftList[index]);

    const gridDate = toStartOfDay(cell);
    const exceedCount = viewModels
      .filter(isExceededHeight(panelHeight, EVENT_HEIGHT))
      .filter(isInGrid(gridDate)).length;
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
