import { Fragment, FunctionComponent, h } from 'preact';
import range from 'tui-code-snippet/array/range';

import { cls } from '@src/util/cssHelper';
import { addDate, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { PanelGrid } from '@src/components/panelgrid/panelgrid';
import { PanelTitle } from '@src/components/panelgrid/panelTitle';
import TZDate from '@src/time/date';
import GridEvents from '@src/components/daygrid/gridEvents';
import { DEFAULT_PANEL_HEIGHT } from '@src/controller/panel';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { useCreationGuide } from '@src/components/hooks/creationGuide';
import GridWithMouse from '@src/components/daygrid/gridWithMouse';
import { nullFn } from '@src/util';
import { getLeftAndWidth } from '@src/util/gridHelper';
import CreationGuide from '@src/components/daygrid/creationGuide';

import type { Cells, DayGridEventType } from '@t/panel';
import type { GridGuideInfo } from '@t/components/daygrid/creationGuide';
import type { GridGuideCreationInfo } from '@t/components/daygrid/gridWithMouse';

const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

interface Props {
  type: DayGridEventType;
  events: ScheduleViewModel[];
  cells?: Cells;
  timesWidth?: number;
  timezonesCount?: number;
  height?: number;
  narrowWeekend: boolean;
  getMousePositionData?: (e: MouseEvent) => MousePositionData | null;
  useCreationPopup?: boolean;
}

function getGridInfoList(cells: Cells): GridGuideInfo[][] {
  return [
    cells.map<GridGuideInfo>((cell) => {
      const start = toStartOfDay(cell);
      const end = toEndOfDay(cell);

      return { start, end };
    }),
  ];
}

function renderCreationGuide(
  creationGuide: GridGuideCreationInfo,
  cells: Cells,
  narrowWeekend: boolean
) {
  const { start, end } = creationGuide;
  const { left, width } = getLeftAndWidth(start, end, cells, narrowWeekend);

  return width > 0 ? <CreationGuide {...creationGuide} left={left} width={width} /> : null;
}

export const DayGridEvents: FunctionComponent<Props> = ({
  type = 'milestone',
  events,
  cells = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
  height = DEFAULT_PANEL_HEIGHT,
  narrowWeekend,
  useCreationPopup = false,
  getMousePositionData = nullFn,
}) => {
  const columnWidth = timesWidth * timezonesCount;

  const {
    creationGuide,
    onGuideStart,
    onGuideChange,
    onGuideEnd,
    onGuideCancel,
  } = useCreationGuide(useCreationPopup);
  const gridInfoList = getGridInfoList(cells);

  return (
    <Fragment>
      <PanelTitle width={columnWidth} template={type} model={type} />
      <GridWithMouse
        gridInfoList={gridInfoList}
        onGuideStart={onGuideStart}
        onGuideEnd={onGuideEnd}
        onGuideChange={onGuideChange}
        onGuideCancel={onGuideCancel}
        getMousePositionData={getMousePositionData}
      >
        <div className={cls(`panel-${type}`)}>
          <PanelGrid
            name={type}
            cells={cells}
            events={events}
            height={height}
            options={{ narrowWeekend }}
          />
          <GridEvents
            name={type}
            cells={cells}
            height={height}
            events={events}
            narrowWeekend={narrowWeekend}
            className={cls(`panel-${type}-events`)}
            headerHeight={0}
          />
          {creationGuide ? renderCreationGuide(creationGuide, cells, narrowWeekend) : null}
        </div>
      </GridWithMouse>
    </Fragment>
  );
};
