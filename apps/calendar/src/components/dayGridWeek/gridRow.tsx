import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import range from 'tui-code-snippet/array/range';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import GridWithMouse from '@src/components/dayGridCommon/gridWithMouse';
import { GridCell } from '@src/components/dayGridWeek/gridCell';
import HorizontalEvent from '@src/components/events/horizontalEvent';
import { useCreationGuide } from '@src/components/hooks/creationGuide';
import { useDOMNode } from '@src/components/hooks/domNode';
import Panel from '@src/components/panel';
import Template from '@src/components/template';
import { WEEK_EVENT_MARGIN_TOP } from '@src/constants/style';
import { useDispatch } from '@src/contexts/calendarStore';
import { DEFAULT_PANEL_HEIGHT } from '@src/controller/panel';
import { WeekOption } from '@src/model';
import EventUIModel from '@src/model/eventUIModel';
import { WeekGridRows } from '@src/slices/weekViewLayout';
import TZDate from '@src/time/date';
import { addDate, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import {
  EVENT_HEIGHT,
  getExceedCount,
  getGridWidthAndLeftPercentValues,
  isInGrid,
  isWithinHeight,
  TOTAL_WIDTH,
} from '@src/util/gridHelper';
import { toPercent } from '@src/util/units';
import { createMousePositionDataGrabber } from '@src/util/weekViewHelper';

import { GridGuideInfo } from '@t/components/daygrid/creationGuide';
import { Cells, DayGridEventType } from '@t/panel';

type GridRowTitleTemplate = `${DayGridEventType}Title`;

interface Props {
  type: DayGridEventType;
  events: EventUIModel[];
  cells?: Cells;
  timesWidth?: number;
  timezonesCount?: number;
  height?: number;
  options?: WeekOption;
  shouldRenderDefaultPopup?: boolean;
  gridInfo: GridInfo[];
  gridColWidthMap: string[][];
  rowName: string;
}

const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

function getGridInfoList(cells: Cells): GridGuideInfo[][] {
  return [
    cells.map<GridGuideInfo>((cell) => {
      const start = toStartOfDay(cell);
      const end = toEndOfDay(cell);

      return { start, end };
    }),
  ];
}

export const GridRow: FunctionComponent<Props> = ({
  rowName,
  events,
  cells = defaultPanelInfoList,
  type,
  height = DEFAULT_PANEL_HEIGHT,
  options = {},
  gridInfo,
  gridColWidthMap,
  timesWidth = 120,
  timezonesCount = 1,
  shouldRenderDefaultPopup = false,
}) => {
  const [panelContainer, setPanelContainerRef] = useDOMNode<HTMLDivElement>();
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isClickedCount, setClickedCount] = useState(false);
  const { updateDayGridRowHeight } = useDispatch('weekViewLayout');
  // @TODO: get margin value dynamically
  const eventTopMargin = 2;
  const maxTop = Math.max(0, ...events.map(({ top }) => top));
  const { narrowWeekend = false } = options;
  const rowTitleTemplate: GridRowTitleTemplate = `${type}Title`;

  const { widthList, leftList } = getGridWidthAndLeftPercentValues(
    cells,
    narrowWeekend,
    TOTAL_WIDTH
  );
  const columnWidth = timesWidth * timezonesCount;
  const getMousePositionData =
    type === 'allday' && panelContainer
      ? createMousePositionDataGrabber(cells, gridInfo, panelContainer)
      : () => null;

  const { creationGuide, onGuideChange, onGuideEnd, onGuideCancel } =
    useCreationGuide(shouldRenderDefaultPopup);
  const gridInfoList = getGridInfoList(cells);

  const onClickExceedCount = (index: number) => {
    setClickedCount(true);
    setClickedIndex(index);
    updateDayGridRowHeight({
      rowName: type as WeekGridRows,
      height: (maxTop + 1) * EVENT_HEIGHT,
    });
  };
  const onClickCollapseButton = () => {
    setClickedCount(false);
    updateDayGridRowHeight({
      rowName: type as WeekGridRows,
      height: DEFAULT_PANEL_HEIGHT,
    });
  };

  const gridCells = cells.map((cell, index) => {
    const width = toPercent(widthList[index]);
    const left = toPercent(leftList[index]);

    const eventModelsInCell = events.filter(isInGrid(cell));
    const exceedCount = getExceedCount(eventModelsInCell, height, EVENT_HEIGHT + eventTopMargin);
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
  });
  const horizontalEvents = events
    .filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP))
    .map((uiModel) => (
      <HorizontalEvent
        uiModel={uiModel}
        key={`${type}-DayEvent-${uiModel.cid()}`}
        eventHeight={EVENT_HEIGHT}
        headerHeight={0}
        getMousePositionData={getMousePositionData}
        gridColWidthMap={gridColWidthMap}
        cells={cells}
      />
    ));

  return (
    <Panel name={rowName} resizable>
      <div className={cls('panel-title')} style={{ width: columnWidth }}>
        <Template template={rowTitleTemplate} model={type} />
      </div>
      <div className={cls('allday-panel')} ref={setPanelContainerRef}>
        <GridWithMouse
          gridInfoList={gridInfoList}
          onGuideEnd={onGuideEnd}
          onGuideChange={onGuideChange}
          onGuideCancel={onGuideCancel}
          getMousePositionData={getMousePositionData}
        >
          <div className={cls('panel-grid-wrapper')}>{gridCells}</div>
          <GridSelection
            creationGuide={creationGuide}
            cells={cells}
            narrowWeekend={narrowWeekend}
          />
        </GridWithMouse>
        <div className={cls(`panel-${type}-events`)}>{horizontalEvents}</div>
      </div>
    </Panel>
  );
};
