import { h } from 'preact';
import { useCallback, useEffect, useState } from 'preact/hooks';

import { CellHeader } from '@src/components/dayGridMonth/cellHeader';
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
import { cls, toPercent } from '@src/helpers/css';
import { getExceedCount } from '@src/helpers/grid';
import { useDOMNode } from '@src/hooks/common/domNode';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { getPosition, getRelativePosition, getSize } from '@src/utils/dom';
import { ratio } from '@src/utils/math';

import { PopupPosition } from '@t/store';

interface Props {
  date: TZDate;
  style?: {
    width?: CSSValue;
    left?: CSSValue;
    backgroundColor?: string;
    height?: CSSValue;
    top?: CSSValue;
  };
  parentContainer?: HTMLDivElement | null;
  events?: EventUIModel[];
  height: number;
}

interface RectSize {
  width: number;
  height: number;
}

function getSeeMorePopupSize(
  grid: HTMLDivElement,
  offsetWidth: number,
  eventLength: number,
  options: SeeMoreOptions
): RectSize {
  const minHeight = getSize(grid).height + MONTH_MORE_VIEW_PADDING * 2;
  let width = offsetWidth + MONTH_MORE_VIEW_PADDING * 2;

  const { moreLayerSize, eventHeight, eventMarginTop } = options;
  const { width: moreViewWidth, height: moreViewHeight } = moreLayerSize;

  const maxDisplayEventCount = 10;

  width = Math.max(width, MONTH_MORE_VIEW_MIN_WIDTH);
  let height =
    MONTH_MORE_VIEW_HEADER_HEIGHT + MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM + MONTH_MORE_VIEW_PADDING;

  if (eventLength <= maxDisplayEventCount) {
    height += (eventHeight + eventMarginTop) * eventLength;
  } else {
    height += (eventHeight + eventMarginTop) * maxDisplayEventCount;
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
      const popupSize = getSeeMorePopupSize(parentContainer, container.offsetWidth, eventLength, {
        moreLayerSize: { width: null, height: null },
        eventHeight: MONTH_EVENT_HEIGHT,
        eventMarginTop: MONTH_EVENT_MARGIN_TOP,
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

export function GridCell({ date, events = [], style, parentContainer, height }: Props) {
  const layoutContainer = useLayoutContainer();
  const { showSeeMorePopup } = useDispatch('popup');

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
    <div className={cls('daygrid-cell')} style={style} ref={containerRefCallback}>
      <CellHeader exceedCount={exceedCount} date={date} onClickExceedCount={onOpenSeeMorePopup} />
    </div>
  );
}
