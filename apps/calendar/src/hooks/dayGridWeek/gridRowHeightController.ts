import { useState } from 'preact/hooks';

import { DEFAULT_PANEL_HEIGHT } from '@src/constants/style';
import { useDispatch } from '@src/contexts/calendarStore';
import { EVENT_HEIGHT } from '@src/helpers/grid';
import { WeekGridRows } from '@src/slices/layout';

import { AlldayEventCategory } from '@t/panel';

export function useGridRowHeightController(maxTop: number, category: AlldayEventCategory) {
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isClickedCount, setClickedCount] = useState(false);
  const { updateDayGridRowHeight } = useDispatch('weekViewLayout');

  const onClickExceedCount = (index: number) => {
    setClickedCount(true);
    setClickedIndex(index);
    updateDayGridRowHeight({
      rowName: category as WeekGridRows,
      height: (maxTop + 1) * EVENT_HEIGHT,
    });
  };
  const onClickCollapseButton = () => {
    setClickedCount(false);
    updateDayGridRowHeight({
      rowName: category as WeekGridRows,
      height: DEFAULT_PANEL_HEIGHT,
    });
  };

  return {
    clickedIndex,
    isClickedCount,
    onClickExceedCount,
    onClickCollapseButton,
  };
}
