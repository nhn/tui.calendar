import { useEffect, useMemo, useRef } from 'preact/hooks';

import { useEventBus } from '@src/contexts/eventBus';
import { useWhen } from '@src/hooks/common/useWhen';
import { useCurrentPointerPositionInGrid } from '@src/hooks/event/useCurrentPointerPositionInGrid';
import { useDraggingEvent } from '@src/hooks/event/useDraggingEvent';
import TZDate from '@src/time/date';
import { isNil, isPresent } from '@src/utils/type';

import type { GridPositionFinder } from '@t/grid';
import type { CellStyle } from '@t/time/datetime';

interface Params {
  rowStyleInfo: CellStyle[];
  gridPositionFinder: GridPositionFinder;
}

export function useAlldayGridRowEventMove({ rowStyleInfo, gridPositionFinder }: Params) {
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: movingEvent,
    clearDraggingEvent,
  } = useDraggingEvent('dayGrid', 'move');
  const startGridXRef = useRef<number | null>(null);

  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const { columnIndex } = currentGridPos ?? {};

  const targetEventStartGridX = useMemo(
    () =>
      isNil(movingEvent) ? null : rowStyleInfo.findIndex(({ left }) => left === movingEvent.left),
    [rowStyleInfo, movingEvent]
  );

  const currentMovingLeft = useMemo(() => {
    if (isNil(columnIndex) || isNil(startGridXRef.current) || isNil(targetEventStartGridX)) {
      return null;
    }

    const newColumnIndex = targetEventStartGridX + columnIndex - startGridXRef.current;

    return newColumnIndex < 0
      ? -rowStyleInfo[-newColumnIndex].left
      : rowStyleInfo[newColumnIndex].left;
  }, [columnIndex, rowStyleInfo, targetEventStartGridX]);

  useEffect(() => {
    if (isNil(startGridXRef.current) && isPresent(columnIndex)) {
      startGridXRef.current = columnIndex;
    }
  }, [columnIndex]);

  useWhen(() => {
    const shouldUpdate =
      !isDraggingCanceled &&
      isPresent(movingEvent) &&
      isPresent(columnIndex) &&
      isPresent(currentMovingLeft) &&
      columnIndex !== startGridXRef.current;

    if (shouldUpdate && isPresent(startGridXRef.current)) {
      const dateOffset = columnIndex - startGridXRef.current;
      const newStartDate = new TZDate(movingEvent.model.getStarts());
      const newEndDate = new TZDate(movingEvent.model.getEnds());
      newStartDate.addDate(dateOffset);
      newEndDate.addDate(dateOffset);

      eventBus.fire('beforeUpdateEvent', {
        event: movingEvent.model.toEventObject(),
        changes: {
          start: newStartDate,
          end: newEndDate,
        },
      });
    }

    clearDraggingEvent();
    clearCurrentGridPos();
    startGridXRef.current = null;
  }, isDraggingEnd);

  return useMemo(
    () => ({
      movingEvent,
      movingLeft: currentMovingLeft,
    }),
    [currentMovingLeft, movingEvent]
  );
}
