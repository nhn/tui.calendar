import { Fragment, FunctionComponent, h } from 'preact';

import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { useStore } from '@src/contexts/calendarStore';
import { EVENT_HEIGHT, isWithinHeight } from '@src/helpers/grid';
import { useDayGridMonthEventMove } from '@src/hooks/dayGridMonth/dayGridMonthEventMove';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import TZDate from '@src/time/date';

interface Props {
  name: string;
  cells: TZDate[];
  week: number;
  height: number;
  eventHeight?: number;
  events: EventUIModel[];
  narrowWeekend: boolean;
  className: string;
  headerHeight: number;
  eventTopMargin: number;
  gridInfo: GridInfo[];
  mousePositionDataGrabber: (e: MouseEvent) => MousePositionData | null;
}

export const MonthEvents: FunctionComponent<Props> = ({
  height,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className,
  headerHeight,
  eventTopMargin,
  cells,
  week,
  gridInfo,
  mousePositionDataGrabber,
}) => {
  // const { movingEvent, movingLeft } = useDayGridMonthEventMove({
  //   events,
  //   cells,
  //   week,
  //   gridInfo,
  //   mousePositionDataGrabber,
  // });

  // console.log(movingEvent, movingLeft);
  // console.log(cells[0].getDate(), cells[6].getDate());
  const { draggingEventUIModel } = useStore(dndSelector);

  const dayEvents = events
    .filter(isWithinHeight(height - headerHeight, eventHeight + eventTopMargin))
    .map((uiModel) => (
      <HorizontalEvent
        key={`${name}-DayEvent-${uiModel.cid()}`}
        uiModel={uiModel}
        isDraggingTarget={uiModel.cid() === draggingEventUIModel?.cid()}
        eventHeight={eventHeight}
        headerHeight={headerHeight}
      />
    ));

  return (
    <Fragment>
      <div className={className}>{dayEvents}</div>
      {/* {movingEvent && (*/}
      {/*  <HorizontalEvent*/}
      {/*    uiModel={movingEvent}*/}
      {/*    eventHeight={EVENT_HEIGHT}*/}
      {/*    headerHeight={headerHeight}*/}
      {/*    movingLeft={movingLeft}*/}
      {/*  />*/}
      {/* )}*/}
    </Fragment>
  );
};
