import { h, FunctionComponent } from 'preact';
import { useCallback, useLayoutEffect, useRef, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { useActions, useStore } from '@src/components/hooks/store';
import { PopupType } from '@src/modules/layerPopup';
import TZDate from '@src/time/date';
import { getPosition, getSize } from '@src/util/domutil';
import { ratio } from '@src/util/math';
import { Size } from '@src/controller/panel';
import { Day } from '@src/time/datetime';
import CellBar from '@src/components/daygrid/cellBar';
import { PopupRect } from '@t/store';
import { toPercent } from '@src/util/units';
import { getMousePosition } from '@src/util/domEvent';

const OUT_PADDING = 5;
const VIEW_MIN_WIDTH = 280;

interface CellProps {
  date: TZDate | Date;
  dayIndex: Day;
  style?: {
    width?: CSSValue;
    left?: CSSValue;
    backgroundColor?: string;
    height?: CSSValue;
    top?: CSSValue;
  };
  parentContainer?: HTMLDivElement;
  appContainer?: HTMLDivElement;
}

function getSeeMorePopupSize(
  styles: SeeMorePopupTheme,
  options: SeeMoreOptions,
  cell: HTMLDivElement,
  grid: HTMLDivElement,
  events: Event[]
): Size {
  const minHeight = getSize(grid).height + OUT_PADDING * 2;
  let width: number = cell.offsetWidth + OUT_PADDING * 2;

  const { moreLayerSize, scheduleGutter, scheduleHeight } = options;
  const { width: layerWidth, height: layerHeight } = moreLayerSize;

  let height;
  const maxVisibleSchedulesInLayer = 10;
  const { titleHeight, titleMarginBottom, paddingBottom } = styles;

  width = Math.max(width, VIEW_MIN_WIDTH);
  height = parseFloat(titleHeight);
  height += parseFloat(titleMarginBottom);

  if (events.length <= maxVisibleSchedulesInLayer) {
    height += (scheduleGutter + scheduleHeight) * events.length;
  } else {
    height += (scheduleGutter + scheduleHeight) * maxVisibleSchedulesInLayer;
  }
  height += parseFloat(paddingBottom);
  height += OUT_PADDING;

  if (layerWidth) {
    width = layerWidth;
  }

  if (layerHeight) {
    height = layerHeight;
  }

  if (isNaN(height) || height < minHeight) {
    height = minHeight;
  }

  return { width, height };
}

function getSeeMorePopupPosition(
  position: [positionX: number, positionY: number],
  popupSize: Size,
  appContainerSize: Size
) {
  const { width: containerWidth, height: containerHeight } = appContainerSize;
  const [leftPos, topPos] = position;
  const { width, height } = popupSize;

  const calWidth = (leftPos * containerWidth) / 100;
  const calHeight = (topPos * containerHeight) / 100;
  const isOverWidth = calWidth + width >= containerWidth;
  const isOverHeight = calHeight + height >= containerHeight;

  const left = toPercent(leftPos);
  const top = toPercent(topPos);

  if (isOverWidth && isOverHeight) {
    return {
      right: 0,
      bottom: 0,
    };
  }

  if (!isOverWidth && isOverHeight) {
    return {
      left,
      bottom: 0,
    };
  }

  if (isOverWidth && !isOverHeight) {
    return {
      right: 0,
      top,
    };
  }

  return { left, top };
}

function getExceedCount() {
  return 0; // @TODO: 높이 기준으로 초과 갯수 계산
}

function getDateColor(dayIndex: Day, commonTheme: CommonTheme) {
  const { holiday, saturday, today } = commonTheme;

  if (dayIndex === Day.SUN) {
    return holiday.color;
  }

  if (dayIndex === Day.SAT) {
    return saturday.color;
  }

  return today.color;
}

function getSeeMorePopupRect({
  cell,
  grid,
  theme,
  options,
  appContainer,
  events = [],
}: SeeMoreRectParam): PopupRect {
  const popupSize = getSeeMorePopupSize(theme, options, cell, grid, events);
  const appContainerSize = getSize(appContainer);

  const pos = getMousePosition(
    {
      clientX: getPosition(cell).x,
      clientY: getPosition(grid).y,
    } as MouseEvent,
    appContainer
  );

  let left = pos[0] - OUT_PADDING;
  let top = pos[1] - OUT_PADDING;

  left = ratio(appContainerSize.width, 100, left);
  top = ratio(appContainerSize.height, 100, top);

  const popupPosition = getSeeMorePopupPosition([left, top], popupSize, appContainerSize);

  return { ...popupSize, ...popupPosition };
}

function usePopupRect(
  monthTheme: MonthTheme,
  parentContainer?: HTMLDivElement,
  appContainer?: HTMLDivElement
) {
  const container = useRef<HTMLDivElement>(null);
  const [popupRect, setPopupRect] = useState<PopupRect | null>(null);
  const { moreViewTitle, moreView, schedule: scheduleTheme } = monthTheme;

  useLayoutEffect(() => {
    const { marginBottom, height } = moreViewTitle;
    const { paddingBottom } = moreView;

    const theme: SeeMorePopupTheme = {
      titleHeight: height,
      titleMarginBottom: marginBottom,
      paddingBottom,
    };

    const options: SeeMoreOptions = {
      moreLayerSize: { width: null, height: null },
      scheduleGutter: parseFloat(scheduleTheme.height),
      scheduleHeight: parseFloat(scheduleTheme.marginTop),
    };

    if (appContainer && parentContainer) {
      const rect = getSeeMorePopupRect({
        cell: container.current,
        grid: parentContainer,
        theme,
        options,
        events: [],
        appContainer,
      });

      setPopupRect(rect);
    }
  }, [parentContainer, appContainer, moreViewTitle, moreView, scheduleTheme]);

  return { popupRect, container };
}

export const Cell: FunctionComponent<CellProps> = (props) => {
  const { show } = useActions('layerPopup');
  const { state } = useStore('theme');

  const { common: commonTheme } = state;
  const { date, dayIndex, style, parentContainer, appContainer } = props;

  const { popupRect, container } = usePopupRect(state.month, parentContainer, appContainer);

  const onOpenSeeMorePopup1 = useCallback(() => {
    if (popupRect) {
      show({
        type: PopupType.seeMore,
        param: {
          date,
          popupRect,
          events: [], // @TODO: 해당 날짜의 모든 일정 넘기기
        },
      });
    }
  }, [date, popupRect, show]);

  const exceedCount = getExceedCount();

  return (
    <div
      className={cls('daygrid-cell')}
      style={{ ...style, color: getDateColor(dayIndex, commonTheme) }}
      ref={container}
    >
      <CellBar
        exceedCount={exceedCount}
        date={date.getDate()}
        onClickExceedCount={onOpenSeeMorePopup1}
      />
    </div>
  );
};
