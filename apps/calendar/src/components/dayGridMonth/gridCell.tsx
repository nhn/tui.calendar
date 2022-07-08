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
import { cls } from '@src/helpers/css';
import { getExceedCount } from '@src/helpers/grid';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import type EventUIModel from '@src/model/eventUIModel';
import { monthMoreViewSelector } from '@src/selectors/theme';
import type TZDate from '@src/time/date';
import { isWeekend } from '@src/time/datetime';
import { getSize } from '@src/utils/dom';

import type { StyleProp } from '@t/components/common';
import type { PopupPosition, Rect } from '@t/store';
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

function getSeeMorePopupPosition(popupSize: RectSize, appContainerSize: Rect, cellRect: Rect) {
  const {
    width: containerWidth,
    height: containerHeight,
    left: containerLeft,
    top: containerTop,
  } = appContainerSize;
  const { width, height } = popupSize;

  // console.group();
  // console.log(containerLeft, containerTop, leftPos, topPos);
  // console.groupEnd();
  // const calendarWidth = (leftPos * containerWidth) / 100;
  // const calendarHeight = (topPos * containerHeight) / 100;
  // const isOverWidth = calendarWidth + width >= containerWidth;
  // const isOverHeight = calendarHeight + height >= containerHeight;
  //
  // const left = toPercent(leftPos);
  // const top = toPercent(topPos);

  // if (isOverWidth) {
  //   return isOverHeight ? { right: 0, bottom: 0 } : { right: 0, top };
  // }

  // return isOverHeight ? { left, bottom: 0 } : { left, top };
  return { left: containerLeft, top: containerTop };
}

function getSeeMorePopupRect({
  layoutContainer,
  grid,
  cell,
  popupSize,
}: SeeMoreRectParam): PopupPosition {
  const containerRect = layoutContainer.getBoundingClientRect();
  const cellRect = cell.getBoundingClientRect();

  console.group();
  console.log(cellRect.left, cellRect.top);
  console.groupEnd();

  // console.group();
  // console.log(pos[0], pos[1]);
  // console.log(left, top);
  // left = ratio(containerRect.width, 100, left);
  // top = ratio(containerRect.height, 100, top);
  // console.log(left, top);
  // console.groupEnd();

  const popupPosition = getSeeMorePopupPosition(popupSize, containerRect, cellRect);

  return { ...popupSize, ...popupPosition };
}

function usePopupPosition(
  eventLength: number,
  parentContainer?: HTMLDivElement | null,
  layoutContainer?: HTMLDivElement | null
) {
  const { width: moreViewWidth, height: moreViewHeight } = useTheme(monthMoreViewSelector);

  const [container, containerRefCallback] = useDOMNode<HTMLDivElement>();
  const [popupPosition, setPopupPosition] = useState<PopupPosition | null>(null);

  useEffect(() => {
    if (layoutContainer && parentContainer && container) {
      const popupSize = getSeeMorePopupSize({
        grid: parentContainer,
        offsetWidth: container.offsetWidth,
        eventLength,
        layerSize: {
          width: moreViewWidth,
          height: moreViewHeight,
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
  }, [layoutContainer, container, eventLength, parentContainer, moreViewWidth, moreViewHeight]);

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
  contentAreaHeight: number;
}

export function GridCell({ date, events = [], style, parentContainer, contentAreaHeight }: Props) {
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

  const exceedCount = getExceedCount(
    events,
    contentAreaHeight,
    MONTH_EVENT_HEIGHT + MONTH_EVENT_MARGIN_TOP
  );

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
