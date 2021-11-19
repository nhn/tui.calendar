import { FunctionComponent, h } from 'preact';

import ResizeIcon from '@src/components/events/resizeIcon';
import { useDrag } from '@src/components/hooks/drag';
import Template from '@src/components/template';
import { useDispatch } from '@src/contexts/calendarStore';
import { cls, toPercent, toPx } from '@src/helpers/css';
import EventUIModel from '@src/model/eventUIModel';

import { StyleProp } from '@t/components/common';

interface Props {
  uiModel: EventUIModel;
  eventHeight: number;
  headerHeight: number;
  isResizing?: boolean;
  resizingWidth?: string | null;
  flat?: boolean;
}

interface StyleProps {
  uiModel: EventUIModel;
  eventHeight: number;
  headerHeight: number;
  flat: boolean;
  isResizing: boolean;
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
  isResizing,
}: EventItemStyleParam) {
  const defaultItemStyle = {
    color: '#333',
    backgroundColor: bgColor,
    borderLeft: exceedLeft ? 'none' : `3px solid ${borderColor}`,
    borderRadius: exceedLeft ? 0 : 2,
    overflow: 'hidden',
    height: eventHeight,
    lineHeight: toPx(eventHeight),
    opacity: isResizing ? 0.5 : 1,
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

function getStyles({ uiModel, eventHeight, headerHeight, flat, isResizing }: StyleProps) {
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
    isResizing,
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

export const TempHorizontalEvent: FunctionComponent<Props> = ({
  flat = false,
  uiModel,
  eventHeight,
  headerHeight,
  isResizing = false,
  resizingWidth = null,
}) => {
  const { setDraggingState, reset, endDrag } = useDispatch('dnd');
  const { dayEventBlockClassName, containerStyle, eventItemStyle, resizeIconStyle } = getStyles({
    uiModel,
    eventHeight,
    headerHeight,
    flat,
    isResizing,
  });

  const { onMouseDown } = useDrag({
    onDrag: (e) => {
      setDraggingState({
        draggingItemType: `horizontalEvent/${uiModel.cid()}`,
        x: e.clientX,
        y: e.clientY,
      });
    },
    onDragEnd: endDrag,
    onPressESCKey: reset,
  });

  return (
    <EventItem
      containerStyle={resizingWidth ? { ...containerStyle, width: resizingWidth } : containerStyle}
      eventItemStyle={eventItemStyle}
      className={dayEventBlockClassName}
    >
      <span className={cls('weekday-event-title')}>
        <Template template="time" model={uiModel.model} />
      </span>
      {flat || isResizing ? null : (
        <ResizeIcon
          style={resizeIconStyle}
          onMouseDown={(e) => {
            e.stopPropagation();
            onMouseDown(e);
          }}
        />
      )}
    </EventItem>
  );
};
