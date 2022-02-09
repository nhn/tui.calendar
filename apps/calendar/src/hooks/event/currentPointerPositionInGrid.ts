import { useEffect, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { dndSelector } from '@src/selectors';
import { isPresent } from '@src/utils/type';

import { GridPosition, GridPositionFinder } from '@t/grid';

export function useCurrentPointerPositionInGrid(
  gridPositionFinder: GridPositionFinder
): [GridPosition | null, () => void] {
  const { x, y } = useStore(dndSelector);
  const [currentGridPos, setCurrentGridPos] = useState<GridPosition | null>(null);

  const clearCurrentGridPos = () => setCurrentGridPos(null);

  useEffect(() => {
    const hasDraggingCoords = isPresent(x) && isPresent(y);

    if (hasDraggingCoords) {
      const gridPosition = gridPositionFinder({ clientX: x, clientY: y });
      if (gridPosition) {
        setCurrentGridPos(gridPosition);
      }
    }
  }, [gridPositionFinder, x, y]);

  return [currentGridPos, clearCurrentGridPos];
}
