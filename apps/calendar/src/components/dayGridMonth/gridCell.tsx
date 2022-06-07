import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import { CellHeader } from '@src/components/dayGridMonth/cellHeader';
import { CellBarType } from '@src/constants/grid';
import {
  MONTH_EVENT_HEIGHT,
  MONTH_EVENT_MARGIN_TOP,
  MONTH_MORE_VIEW_HEADER_HEIGHT,
  MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM,
  MONTH_MORE_VIEW_MIN_WIDTH,
  MONTH_MORE_VIEW_PADDING,
} from '@src/constants/style';
import { useDispatch } from '@src/contexts/calendarStore';
import { useLayoutContainer } from '@src/contexts/layoutContainer';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { getExceedCount } from '@src/helpers/grid';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import type EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';
import { isWeekend } from '@src/time/datetime';
import { getPosition, getRelativePosition, getSize } from '@src/utils/dom';
import { ratio } from '@src/utils/math';

import type { StyleProp } from '@t/components/common';
import type { PopupPosition } from '@t/store';
import type { ThemeState } from '@t/theme';

interface RectSize {
  width: number;
  height: number;
}

type SeeMoreRectParam = {
  cell: HTMLDivElement;
  grid: HTMLDivElement;
  layoutContainer: HTMLDivElement;
  popupSize: { width: number; height: number };
};

function getSeeMorePopupSize({
  grid,
  offsetWidth,
  eventLength,
  layerSize,
}: {
  grid: HTMLDivElement;
  offsetWidth: number;
  eventLength: number;
  layerSize: {
    width: number | null;
    height: number | null;
  };
}): RectSize {
  const minHeight = getSize(grid).height + MONTH_MORE_VIEW_PADDING * 2;
  let width = offsetWidth + MONTH_MORE_VIEW_PADDING * 2;

  const { width: moreViewWidth, height: moreViewHeight } = layerSize;

  const MAX_DISPLAY_EVENT_COUNT = 10;

  width = Math.max(width, MONTH_MORE_VIEW_MIN_WIDTH);
  let height =
    MONTH_MORE_VIEW_HEADER_HEIGHT + MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM + MONTH_MORE_VIEW_PADDING;
  const eventHeight = MONTH_EVENT_HEIGHT + MONTH_EVENT_MARGIN_TOP;

  if (eventLength <= MAX_DISPLAY_EVENT_COUNT) {
    height += eventHeight * eventLength;
  } else {
    height += eventHeight * MAX_DISPLAY_EVENT_COUNT;
  }

  if (moreViewWidth) {
    width = moreViewWidth;
  }

  if (moreViewHeight) {
    height = moreViewHeight;
  }

  if (isNaN(height) || height < minHeight) {
    height = minHeight;
  }

  return { width, height };
}

function getSeeMorePopupPosition(
  position: [positionX: number, positionY: number],
  popupSize: RectSize,
  appContainerSize: RectSize
) {
  const { width: containerWidth, height: containerHeight } = appContainerSize;
  const [leftPos, topPos] = position;
  const { width, height } = popupSize;

  const calendarWidth = (leftPos * containerWidth) / 100;
  const calendarHeight = (topPos * containerHeight) / 100;
  const isOverWidth = calendarWidth + width >= containerWidth;
  const isOverHeight = calendarHeight + height >= containerHeight;

  const left = toPercent(leftPos);
  const top = toPercent(topPos);

  if (isOverWidth) {
    return isOverHeight ? { right: 0, bottom: 0 } : { right: 0, top };
  }

  return isOverHeight ? { left, bottom: 0 } : { left, top };
}

function getSeeMorePopupRect({
  layoutContainer,
  grid,
  cell,
  popupSize,
}: SeeMoreRectParam): PopupPosition {
  const appContainerSize = getSize(layoutContainer);

  const pos = getRelativePosition(
    {
      clientX: getPosition(cell).x,
      clientY: getPosition(grid).y,
    } as MouseEvent,
    layoutContainer
  );

  let left = pos[0] - MONTH_MORE_VIEW_PADDING;
  let top = pos[1] - MONTH_MORE_VIEW_PADDING;

  left = ratio(appContainerSize.width, 100, left);
  top = ratio(appContainerSize.height, 100, top);

  const popupPosition = getSeeMorePopupPosition([left, top], popupSize, appContainerSize);

  return { ...popupSize, ...popupPosition };
}

function usePopupPosition(
  eventLength: number,
  parentContainer?: HTMLDivElement | null,
  layoutContainer?: HTMLDivElement | null
) {
  const [container, containerRefCallback] = useDOMNode<HTMLDivElement>();
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null);

  useEffect(() => {
    if (layoutContainer && parentContainer && container) {
      const popupSize = getSeeMorePopupSize({
        grid: parentContainer,
        offsetWidth: container.offsetWidth,
        eventLength,
        layerSize: {
          width: null,
          height: null,
        },
      });

      const rect = getSeeMorePopupRect({
        cell: container,
        grid: parentContainer,
        layoutContainer,
        popupSize,
      });

      setPopupPosition(rect);
    }
  }, [layoutContainer, container, eventLength, parentContainer]);

  return { popupPosition, containerRefCallback };
}

function weekendBackgroundColorSelector(theme: ThemeState) {
  return theme.month.weekend.backgroundColor;
}

interface Props {
  date: TZDate;
  style?: StyleProp;
  parentContainer?: HTMLDivElement | null;
  events?: EventUIModel[];
  height: number;
}

export function GridCell({ date, events = [], style, parentContainer, height }: Props) {
  const layoutContainer = useLayoutContainer();
  const { showSeeMorePopup } = useDispatch('popup');
  const backgroundColor = useTheme(weekendBackgroundColorSelector);

  const { popupPosition, containerRefCallback } = usePopupPosition(
    events.length,
    parentContainer,
    layoutContainer
  );

  const onOpenSeeMorePopup = useCallback(() => {
    if (popupPosition) {
      showSeeMorePopup({
        date,
        popupPosition,
        events,
      });
    }
  }, [date, events, popupPosition, showSeeMorePopup]);

  const exceedCount = getExceedCount(events, height, MONTH_EVENT_HEIGHT);

  return (
    <div
      className={cls('daygrid-cell')}
      style={{ ...style, backgroundColor: isWeekend(date.getDay()) ? backgroundColor : 'inherit' }}
      ref={containerRefCallback}
    >
      <CellHeader
        type={CellBarType.header}
        exceedCount={exceedCount}
        date={date}
        onClickExceedCount={onOpenSeeMorePopup}
      />
      <CellHeader
        type={CellBarType.footer}
        exceedCount={exceedCount}
        date={date}
        onClickExceedCount={onOpenSeeMorePopup}
      />
    </div>
  );
}
