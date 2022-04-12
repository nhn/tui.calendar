import { h } from 'preact';

import { TimeEvent } from '@src/components/events/timeEvent';
import { useTimeGridEventResize } from '@src/hooks/timeGrid/useTimeGridEventResize';
import type EventUIModel from '@src/model/eventUIModel';
import { isNil } from '@src/utils/type';

import type { GridPositionFinder, TimeGridData } from '@t/grid';

export function ResizingGuideByColumn({
  gridPositionFinder,
  totalUIModels,
  columnIndex,
  timeGridData,
}: {
  gridPositionFinder: GridPositionFinder;
  totalUIModels: EventUIModel[][];
  columnIndex: number;
  timeGridData: TimeGridData;
}) {
  const guideUIModel = useTimeGridEventResize({
    gridPositionFinder,
    totalUIModels,
    columnIndex,
    timeGridData,
  });

  if (isNil(guideUIModel)) {
    return null;
  }

  return <TimeEvent uiModel={guideUIModel} isResizingGuide={true} />;
}
