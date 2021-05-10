import { h, FunctionComponent } from 'preact';
import { cls } from '@src/util/cssHelper';
import { useActions, useStore } from '../hooks/store';
import { PopupType } from '@src/modules/layerPopup';
import TZDate from '@src/time/date';
import { useLayoutEffect, useRef, useState } from 'preact/hooks';
import { getPosition, getSize } from '@src/util/domutil';
import getMousePosition from 'tui-code-snippet/domEvent/getMousePosition';
import { ratio } from '@src/util/math';
import { Size } from '@src/controller/panel';

export interface CellProps {
  date: TZDate | Date;
  dayIndex: number;
  style?: {
    width?: number | string;
    left?: number | string;
    backgroundColor?: string;
    height?: number | string;
    top?: number | string;
  };
  parentContainer?: HTMLDivElement;
  appContainer?: HTMLDivElement;
}

interface CellBarProps {
  type?: 'header' | 'footer'; // @todo enum으로 작성
  exceedCount?: number;
  date: number;
  onClickExceedCount: () => void;
}

interface ExceedCountButtonProps {
  number: number;
  clickHandler: () => void;
  className: string;
}

type SeeMorePopupTheme = {
  titleHeight: string;
  titleMarginBottom: string;
  paddingBottom: string;
};

type SeeMoreOptions = {
  moreLayerSize: { width: number | null; height: number | null };
  scheduleGutter: number;
  scheduleHeight: number;
};

const OUT_PADDING = 5;
const VIEW_MIN_WIDTH = 280;

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
  height += OUT_PADDING; // for border

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
  position: [number, number],
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

  const left = `${leftPos}%`;
  const top = `${topPos}%`;

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

const ExceedCountButton: FunctionComponent<ExceedCountButtonProps> = (props) => {
  const { number, clickHandler, className } = props;

  if (!number) {
    return null;
  }

  // @TODO: 템플릿 적용 필요
  return (
    <button type="button" onClick={clickHandler} className={className}>
      {number} More
    </button>
  );
};

const CellBar: FunctionComponent<CellBarProps> = (props) => {
  const { type = 'header', exceedCount = 0, date, onClickExceedCount } = props;

  // @TODO: date 템플릿 적용 필요 / 오늘 표시 (예: 파란 원)
  return (
    <div className={cls(`grid-cell-${type}`)}>
      <span className={cls('grid-cell-date')}>{date}</span>
      {exceedCount ? (
        <ExceedCountButton
          number={exceedCount}
          clickHandler={onClickExceedCount}
          className={cls('grid-cell-more-events')}
        ></ExceedCountButton>
      ) : null}
    </div>
  );
};

function getExceedCount() {
  return 0; // @TODO: 높이 기준으로 초과 갯수 계산
}

type CommonTheme = {
  backgroundColor: string;
  border: string;
  creationGuide: {
    backgroundColor: string;
    border: string;
  };
  dayname: { color: string };
  holiday: { color: string };
  saturday: { color: string };
  today: { color: string };
};

function getDateColor(dayIndex: number, commonTheme: CommonTheme) {
  const { holiday, saturday, today } = commonTheme;

  if (dayIndex === 0) {
    return holiday.color;
  }

  if (dayIndex === 6) {
    return saturday.color;
  }

  return today.color;
}

type Rect = {
  width: number;
  height: number;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
};

type SeeMoreRectParam = {
  cell: HTMLDivElement;
  grid: HTMLDivElement;
  appContainer: HTMLDivElement;
  theme: SeeMorePopupTheme;
  options: SeeMoreOptions;
  events: Event[];
};

function getSeeMorePopupRect({
  cell,
  grid,
  theme,
  options,
  appContainer,
  events = [],
}: SeeMoreRectParam): Rect {
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

export const Cell: FunctionComponent<CellProps> = (props) => {
  const container = useRef<HTMLDivElement>(null);
  const [popupRect, setPopupRect] = useState<Rect | null>(null);

  const { show } = useActions('layerPopup');
  const { state } = useStore('theme');

  const {
    common: commonTheme,
    month: { moreViewTitle, moreView, schedule: scheduleTheme },
  } = state;

  const { date, dayIndex, style, parentContainer, appContainer } = props;

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
      scheduleGutter: scheduleTheme.height,
      scheduleHeight: scheduleTheme.marginTop,
    };

    if (appContainer && parentContainer) {
      setPopupRect(
        getSeeMorePopupRect({
          cell: container.current,
          grid: parentContainer,
          theme,
          options,
          events: [],
          appContainer,
        })
      );
    }
  }, [parentContainer, appContainer, moreViewTitle, moreView, scheduleTheme]);

  const onOpenSeeMorePopup = () => {
    show({
      type: PopupType.seeMore,
      param: {
        date,
        popupRect,
        events: [], // @TODO: 해당 날짜의 모든 일정 넘기기
      },
    });
  };

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
        onClickExceedCount={onOpenSeeMorePopup}
      />
    </div>
  );
};
