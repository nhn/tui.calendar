import { useCallback, useState } from 'preact/hooks';

import { DEFAULT_PANEL_HEIGHT } from '@src/constants/style';
import { useDispatch } from '@src/contexts/calendarStore';
import { EVENT_HEIGHT } from '@src/helpers/grid';
import type { WeekGridRows } from '@src/slices/layout';

import type { AlldayEventCategory } from '@t/panel';

export function useGridRowHeightController(maxTop: number, category: AlldayEventCategory) {
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isClickedCount, setClickedCount] = useState(false);
  const { updateDayGridRowHeight } = useDispatch('weekViewLayout');

  const onClickExceedCount = useCallback(
    (index: number) => {
      setClickedCount(true);
      setClickedIndex(index);
      updateDayGridRowHeight({
        rowName: category as WeekGridRows,
        height: (maxTop + 1) * EVENT_HEIGHT,
      });
    },
    [category, maxTop, updateDayGridRowHeight]
  );

  const onClickCollapseButton = useCallback(() => {
    setClickedCount(false);
    updateDayGridRowHeight({
      rowName: category as WeekGridRows,
      height: DEFAULT_PANEL_HEIGHT,
    });
  }, [category, updateDayGridRowHeight]);

  return {
    clickedIndex,
    isClickedCount,
    onClickExceedCount,
    onClickCollapseButton,
  };
}
