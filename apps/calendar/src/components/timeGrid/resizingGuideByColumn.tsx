import { h } from 'preact';

import { GridPositionFinder } from '@t/grid';

export function ResizingGuideByColumn({
  gridPositionFinder,
}: {
  gridPositionFinder: GridPositionFinder;
}) {
  return <div data-testid="GridPositionFinder"></div>;
}
