import { ComponentProps, Fragment, FunctionComponent, h } from 'preact';
import { useRef, useState } from 'preact/hooks';

import GridWithMouse from '@src/components/daygrid/gridWithMouse';
import ResizeIcon from '@src/components/events/resizeIcon';
import { useDrag } from '@src/components/hooks/drag';
import { useActions } from '@src/components/hooks/store';
import Template from '@src/components/template';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { cls } from '@src/util/cssHelper';
import { getGridDateIndex } from '@src/util/gridHelper';
import { toPercent, toPx } from '@src/util/units';
import { isNil } from '@src/util/utils';

import { StyleProp } from '@t/components/common';
import { Cells } from '@t/panel';

interface Props {
  viewModel: ScheduleViewModel;
  eventHeight: number;
  headerHeight: number;
  flat?: boolean;
  getMousePositionData?: ComponentProps<typeof GridWithMouse>['getMousePositionData'];
  gridColWidthMap?: string[][];
  cells?: Cells;
}

interface StyleProps {
  viewModel: ScheduleViewModel;
  eventHeight: number;
  headerHeight: number;
  flat: boolean;
}

function getMargin(flat: boolean) {
  return {
    vertical: flat ? 5 : 2,
    horizontal: 8,
  };
}

function getExceedClassName(exceedLeft: boolean, exceedRight: boolean) {
  const className = [];

  if (exceedLeft) {
    className.push(cls('weekday-exceed-left'));
  }

  if (exceedRight) {
    className.push(cls('weekday-exceed-right'));
  }

  return className.join(' ');
}

function getEventItemStyle({
  flat,
  bgColor,
  borderColor,
  exceedLeft,
  exceedRight,
  eventHeight,
}: EventItemStyleParam) {
  const defaultItemStyle = {
    color: '#333',
    backgroundColor: bgColor,
    borderLeft: exceedLeft ? 'none' : `3px solid ${borderColor}`,
    borderRadius: exceedLeft ? 0 : 2,
    overflow: 'hidden',
    height: eventHeight,
    lineHeight: toPx(eventHeight),
  };
  const margin = getMargin(flat);

  return flat
    ? {
        marginTop: margin.vertical,
        ...defaultItemStyle,
      }
    : {
        marginLeft: exceedLeft ? 0 : margin.horizontal,
        marginRight: exceedRight ? 0 : margin.horizontal,
        ...defaultItemStyle,
      };
}

function getStyles({ viewModel, eventHeight, headerHeight, flat }: StyleProps) {
  const {
    width,
    left,
    top,
    exceedLeft,
    exceedRight,
    model: { bgColor, borderColor },
  } = viewModel;

  const margin = getMargin(flat);

  const containerStyle = flat
    ? {}
    : {
        width: toPercent(width),
        left: toPercent(left),
        top: toPx((top - 1) * (eventHeight + margin.vertical) + headerHeight),
        position: 'absolute',
      };

  const eventItemStyle = getEventItemStyle({
    flat,
    exceedLeft,
    exceedRight,
    bgColor,
    borderColor,
    eventHeight,
  });

  const resizeIconStyle = {
    lineHeight: toPx(18),
  };

  const dayEventBlockClassName = `${cls('weekday-event-block')} ${getExceedClassName(
    exceedLeft,
    exceedRight
  )}`;

  return { dayEventBlockClassName, containerStyle, eventItemStyle, resizeIconStyle };
}

function getEventColIndex(viewModel: ScheduleViewModel, cells: Cells) {
  const start = getGridDateIndex(viewModel.getStarts(), cells);
  const end = getGridDateIndex(viewModel.getEnds(), cells);

  return { start, end };
}

const EventItem: FunctionComponent<{
  containerStyle: StyleProp;
  eventItemStyle: StyleProp;
  className: string;
}> = ({ containerStyle, eventItemStyle, className, children }) => (
  <div className={className} style={containerStyle}>
    <div className={cls('weekday-event')} style={eventItemStyle}>
      {children}
    </div>
  </div>
);

const GridEvent: FunctionComponent<Props> = ({
  flat = false,
  viewModel,
  eventHeight,
  headerHeight,
  getMousePositionData,
  gridColWidthMap,
  cells = [],
}) => {
  const { updateSchedule } = useActions('calendarData');

  const [isResizing, setResizing] = useState(false);
  const [resizeGuideStyle, setResizeGuideStyle] = useState<StyleProp | null>(null);
  const lastGridColIndex = useRef<number | null>(null);

  const { dayEventBlockClassName, containerStyle, eventItemStyle, resizeIconStyle } = getStyles({
    viewModel,
    eventHeight,
    headerHeight,
    flat,
  });
  const { start, end } = getEventColIndex(viewModel, cells);
  const resetResizing = () => {
    setResizing(false);
    setResizeGuideStyle(null);
    lastGridColIndex.current = null;
  };

  const { onMouseDown } = useDrag({
    onDragStart: () => {
      lastGridColIndex.current = end;
      setResizing(true);
    },
    onDrag: (e) => {
      const mousePositionData = getMousePositionData?.(e);
      if (!mousePositionData || !gridColWidthMap || isNil(start)) {
        return;
      }

      const { gridX } = mousePositionData;
      lastGridColIndex.current = gridX;

      if (start <= gridX) {
        setResizeGuideStyle({
          width: gridColWidthMap[start][gridX],
        });
      }
    },
    onDragEnd: () => {
      const { current: gridX } = lastGridColIndex;
      if (!isNil(start) && !isNil(gridX)) {
        if (start <= gridX && end !== gridX) {
          const targetDate = cells[gridX];
          updateSchedule({ event: viewModel.model, eventData: { end: targetDate } });
        }
      }

      resetResizing();
    },
    onPressESCKey: resetResizing,
  });

  return (
    <Fragment>
      <EventItem
        containerStyle={containerStyle}
        eventItemStyle={eventItemStyle}
        className={dayEventBlockClassName}
      >
        <span className={cls('weekday-schedule-title')}>
          <Template template="time" model={viewModel.model} />
        </span>
        {flat ? null : <ResizeIcon style={resizeIconStyle} onMouseDown={onMouseDown} />}
      </EventItem>
      {isResizing ? (
        <EventItem
          containerStyle={{ ...containerStyle, ...resizeGuideStyle }}
          eventItemStyle={eventItemStyle}
          className={dayEventBlockClassName}
        />
      ) : null}
    </Fragment>
  );
};

export default GridEvent;
