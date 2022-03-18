import { useTransientUpdate } from '@src/hooks/common/transientUpdate';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isPresent } from '@src/utils/type';

import { DraggingTypes } from '@t/drag';

function isTimeGridDraggingType(draggingItemType: DraggingTypes | null) {
  return /^(event|gridSelection)\/timeGrid/.test(draggingItemType ?? '');
}

export function useTimeGridScrollSync(scrollArea: HTMLDivElement | null, rowCount: number) {
  useTransientUpdate(dndSelector, ({ y, draggingItemType, draggingState }) => {
    if (
      isPresent(scrollArea) &&
      isTimeGridDraggingType(draggingItemType) &&
      draggingState === DraggingState.DRAGGING &&
      isPresent(y)
    ) {
      const { offsetTop, offsetHeight, scrollHeight } = scrollArea;
      // Set minimum scroll boundary to the height of one row.
      const scrollBoundary = Math.floor(scrollHeight / rowCount);
      const layoutHeight = offsetTop + offsetHeight;

      let scrollDiff: number;
      if (y < offsetTop + scrollBoundary) {
        scrollDiff = y - (offsetTop + scrollBoundary);
        scrollArea.scrollTop = Math.max(0, scrollArea.scrollTop + scrollDiff);
      } else if (y > layoutHeight - scrollBoundary) {
        scrollDiff = y - (layoutHeight - scrollBoundary);
        scrollArea.scrollTop = Math.min(offsetHeight, scrollArea.scrollTop + scrollDiff);
      }
    }
  });
}
