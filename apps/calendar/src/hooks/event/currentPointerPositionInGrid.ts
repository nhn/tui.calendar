import { useEffect, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { MousePositionDataGrabber } from '@src/helpers/view';
import { dndSelector } from '@src/selectors';
import { isPresent } from '@src/utils/type';

import { GridPosition } from '@t/grid';

export function useCurrentPointerPositionInGrid(
  mousePositionDataGrabber: MousePositionDataGrabber
): [GridPosition | null, () => void] {
  const { x, y } = useStore(dndSelector);
  const [currentGridPos, setCurrentGridPos] = useState<GridPosition | null>(null);

  const clearCurrentGridPos = () => setCurrentGridPos(null);

  useEffect(() => {
    const hasDraggingCoords = isPresent(x) && isPresent(y);

    if (hasDraggingCoords) {
      const data = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);
      if (data) {
        setCurrentGridPos({ x: data.gridX, y: data.gridY });
      }
    }
  }, [mousePositionDataGrabber, x, y]);

  return [currentGridPos, clearCurrentGridPos];
}
