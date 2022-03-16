import { useTransientUpdate } from '@src/hooks/common/transientUpdate';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isPresent } from '@src/utils/type';

import { DraggingTypes } from '@t/drag';

function isTimeGridDraggingType(draggingItemType: DraggingTypes | null) {
  return /(^event\/timeGrid)|(^gridSelection\/timeGrid)/.test(draggingItemType ?? '');
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
      // arbitrary value to move scroll (px).
      const SCROLL_OFFSET = 10;

      if (y < offsetTop + scrollBoundary) {
        scrollArea.scrollBy(0, -SCROLL_OFFSET);
      } else if (y > layoutHeight - scrollBoundary) {
        scrollArea.scrollBy(0, SCROLL_OFFSET);
      }
    }
  });
}
