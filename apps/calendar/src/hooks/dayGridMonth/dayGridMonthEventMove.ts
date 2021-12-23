import { useEffect, useRef, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useDraggingEvent } from '@src/hooks/event/draggingEvent';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isSame } from '@src/time/datetime';
import { isNil } from '@src/utils/type';

import { Cells } from '@t/panel';

interface Params {
  events: EventUIModel[];
  cells: Cells[];
  gridInfo: GridInfo[];
  mousePositionDataGrabber: (e: MouseEvent) => MousePositionData | null;
}

export function useDayGridMonthEventMove({
  events,
  cells,
  gridInfo,
  mousePositionDataGrabber,
}: Params) {
  const { x, y, draggingState } = useStore(dndSelector);
  const { draggingEvent: movingEvent, clearDraggingEvent } = useDraggingEvent(events, 'move');
  const { updateEvent } = useDispatch('calendar');

  const [currentGridPos, setCurrentGridPos] = useState<{ x: number; y: number } | null>(null);

  const tempRef = useRef<EventUIModel | null>(null);
  useEffect(() => {
    tempRef.current = movingEvent ?? null;
  }, [movingEvent]);

  useEffect(() => {
    const hasDraggingCoords = !isNil(x) && !isNil(y);

    // console.log(week, movingEvent, hasDraggingCoords);
    if (!isNil(movingEvent) && hasDraggingCoords) {
      const pos = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);

      if (pos) {
        setCurrentGridPos({ x: pos.gridX, y: pos.gridY });
      }
    }
  }, [mousePositionDataGrabber, movingEvent, x, y]);

  // if (currentGridPos) {
  //   console.log(cells[currentGridPos.y][currentGridPos.x].getDate());
  // }

  // const targetEventStartGridX = isNil(movingEvent)
  //   ? null
  //   : cells.findIndex((cell) => isSame(cell, movingEvent.getStarts()));
  // const targetEventStartGridY = isNil(movingEvent)
  //   ? null
  //   : cells.findIndex((cell) => isSame(cell, movingEvent.getEnds()));
  // const currentMovingLeft = isNil(currentGridPos) ? null : gridInfo[currentGridPos.x].left;

  // console.group();
  // console.log('week', week);
  // console.log('pos', pos);
  // console.log('x, y', x, y);
  // console.log('movingEvent', movingEvent);
  // console.log('currentGridPos', currentGridPos);
  // console.groupEnd();

  useEffect(() => {
    const shouldUpdate =
      draggingState === DraggingState.IDLE && !isNil(movingEvent) && !isNil(currentGridPos);
    //     !isNil(currentMovingLeft) &&
    //     !isNil(targetEventStartGridX) &&
    //     !isNil(targetEventStartGridY) &&

    // console.log(draggingState === DraggingState.IDLE, !isNil(movingEvent), !isNil(currentGridPos));

    if (shouldUpdate) {
      //     const dateOffset =
      //       currentGridPos.x - targetEventStartGridX + 7 * (currentGridPos.y - targetEventStartGridY);
      //     let newStartDate = new TZDate(movingEvent.getStarts());
      //     let newEndDate = new TZDate(movingEvent.getEnds());
      //     newStartDate = newStartDate.addDate(dateOffset);
      //     newEndDate = newEndDate.addDate(dateOffset);
      //
      // console.log(tempRef.current);
      // console.log(gridInfo);
      console.log('shouldUpdate');
      //     // console.log('shouldUpdate', newStartDate.getDate(), newEndDate.getDate());
      //     // console.log('shouldUpdate', targetEventStartGridX, targetEventStartGridY);
      //
      //     updateEvent({
      //       event: movingEvent.model,
      //       eventData: {
      //         start: newStartDate,
      //         end: newEndDate,
      //       },
      //     });
      clearDraggingEvent();
    }
  }, [clearDraggingEvent, currentGridPos, draggingState, movingEvent]);
  // }, [
  //   currentGridPos,
  //   currentMovingLeft,
  //   movingEvent,
  //   targetEventStartGridX,
  //   updateEvent,
  //   clearDraggingEvent,
  //   draggingState,
  //   targetEventStartGridY,
  // ]);

  // const isMovingEventInWeek = currentGridPos?.y === week;
  // if (isMovingEventInWeek) {
  //   console.log(currentGridPos);
  // }
  // const clonedEvent = new EventUIModel(
  //   EventModel.create({
  //     start: cells[currentGridPos?.x ?? 0],
  //     end: new TZDate(cells[currentGridPos?.x ?? 0]).addDate(1),
  //   })
  // );
  // let clonedEvent = null;
  // if (movingEvent && isMovingEventInWeek) {
  //   clonedEvent = EventUIModel.create(EventModel.create(movingEvent.model));
  //   clonedEvent.model.start = cells[currentGridPos?.x ?? 0];
  //   clonedEvent.model.end = cells[currentGridPos?.x ?? 0];
  // }
  //
  // return {
  //   movingEvent: clonedEvent,
  //   movingLeft: currentMovingLeft,
  // };

  let shadowEventUIModel = null;
  if (movingEvent) {
    shadowEventUIModel = EventUIModel.create(movingEvent?.model);
    shadowEventUIModel.top = 1;
    shadowEventUIModel.left = gridInfo[currentGridPos?.x ?? 0].left;
    shadowEventUIModel.width = gridInfo[currentGridPos?.x ?? 0].width;
  }

  return {
    movingEvent: shadowEventUIModel,
    currentGridPos,
  };
}
