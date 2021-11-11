import { ComponentProps, Fragment, FunctionComponent, h } from 'preact';
import { useRef, useState } from 'preact/hooks';

import GridWithMouse from '@src/components/dayGridCommon/gridWithMouse';
import ResizeIcon from '@src/components/events/resizeIcon';
import { useDrag } from '@src/components/hooks/drag';
import Template from '@src/components/template';
import { useDispatch } from '@src/contexts/calendarStore';
import { cls, toPercent, toPx } from '@src/helpers/css';
import { getGridDateIndex } from '@src/helpers/grid';
import EventUIModel from '@src/model/eventUIModel';
import { isNil } from '@src/utils/type';

import { StyleProp } from '@t/components/common';
import { Cells } from '@t/panel';

interface Props {
  uiModel: EventUIModel;
  eventHeight: number;
  headerHeight: number;
  flat?: boolean;
  getMousePositionData?: ComponentProps<typeof GridWithMouse>['getMousePositionData'];
  gridColWidthMap?: string[][];
  cells?: Cells;
}

interface StyleProps {
  uiModel: EventUIModel;
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

function getStyles({ uiModel, eventHeight, headerHeight, flat }: StyleProps) {
  const {
    width,
    left,
    top,
    exceedLeft,
    exceedRight,
    model: { bgColor, borderColor },
  } = uiModel;

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

function getEventColIndex(uiModel: EventUIModel, cells: Cells) {
  const start = getGridDateIndex(uiModel.getStarts(), cells);
  const end = getGridDateIndex(uiModel.getEnds(), cells);

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

const HorizontalEvent: FunctionComponent<Props> = ({
  flat = false,
  uiModel,
  eventHeight,
  headerHeight,
  getMousePositionData,
  gridColWidthMap,
  cells = [],
}) => {
  const { updateEvent } = useDispatch('calendar');

  const [isResizing, setResizing] = useState(false);
  const [resizeGuideStyle, setResizeGuideStyle] = useState<StyleProp | null>(null);
  const lastGridColIndex = useRef<number | null>(null);

  const { dayEventBlockClassName, containerStyle, eventItemStyle, resizeIconStyle } = getStyles({
    uiModel,
    eventHeight,
    headerHeight,
    flat,
  });
  const { start, end } = getEventColIndex(uiModel, cells);
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
          updateEvent({ event: uiModel.model, eventData: { end: targetDate } });
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
        <span className={cls('weekday-event-title')}>
          <Template template="time" model={uiModel.model} />
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

export default HorizontalEvent;
