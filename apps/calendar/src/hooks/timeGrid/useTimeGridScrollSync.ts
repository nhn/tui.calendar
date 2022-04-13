import { useTransientUpdate } from '@src/hooks/common/useTransientUpdate';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isPresent } from '@src/utils/type';

import type { DraggingTypes } from '@t/drag';

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

      if (y < offsetTop + scrollBoundary) {
        const scrollDiff = y - (offsetTop + scrollBoundary);
        scrollArea.scrollTop = Math.max(0, scrollArea.scrollTop + scrollDiff);
      } else if (y > layoutHeight - scrollBoundary) {
        const scrollDiff = y - (layoutHeight - scrollBoundary);
        scrollArea.scrollTop = Math.min(offsetHeight, scrollArea.scrollTop + scrollDiff);
      }
    }
  });
}
