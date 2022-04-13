import { useCallback, useState } from 'preact/hooks';

import { useTransientUpdate } from '@src/hooks/common/useTransientUpdate';
import { dndSelector } from '@src/selectors';
import { isPresent } from '@src/utils/type';

import type { GridPosition, GridPositionFinder } from '@t/grid';

export function useCurrentPointerPositionInGrid(
  gridPositionFinder: GridPositionFinder
): [GridPosition | null, () => void] {
  const [currentGridPos, setCurrentGridPos] = useState<GridPosition | null>(null);

  useTransientUpdate(dndSelector, (dndState) => {
    if (isPresent(dndState.x) && isPresent(dndState.y)) {
      const gridPosition = gridPositionFinder({
        clientX: dndState.x,
        clientY: dndState.y,
      });
      if (gridPosition) {
        setCurrentGridPos(gridPosition);
      }
    }
  });

  const clearCurrentGridPos = useCallback(() => setCurrentGridPos(null), []);

  return [currentGridPos, clearCurrentGridPos];
}
