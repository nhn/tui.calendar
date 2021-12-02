import { FunctionComponent, h } from 'preact';

import ResizeIcon from '@src/components/events/resizeIcon';
import Template from '@src/components/template';
import { cls, toPercent, toPx } from '@src/helpers/css';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';
import EventUIModel from '@src/model/eventUIModel';

interface Props {
  uiModel: EventUIModel;
  eventHeight: number;
  headerHeight: number;
  isDraggingTarget?: boolean;
  resizingWidth?: string | null;
  flat?: boolean;
  movingLeft?: number | null;
}

type StyleProps = Required<Props>;

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
  isDraggingTarget,
}: EventItemStyleParam) {
  const defaultItemStyle = {
    color: '#333',
    backgroundColor: bgColor,
    borderLeft: exceedLeft ? 'none' : `3px solid ${borderColor}`,
    borderRadius: exceedLeft ? 0 : 2,
    overflow: 'hidden',
    height: eventHeight,
    lineHeight: toPx(eventHeight),
    opacity: isDraggingTarget ? 0.5 : 1,
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

function getStyles({
  uiModel,
  eventHeight,
  headerHeight,
  flat,
  isDraggingTarget,
  movingLeft,
  resizingWidth,
}: StyleProps) {
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
        width: resizingWidth || toPercent(width),
        left: toPercent(movingLeft ?? left),
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
    isDraggingTarget,
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

export const HorizontalEvent: FunctionComponent<Props> = ({
  flat = false,
  uiModel,
  eventHeight,
  headerHeight,
  isDraggingTarget = false,
  resizingWidth = null,
  movingLeft = null,
}) => {
  const { dayEventBlockClassName, containerStyle, eventItemStyle, resizeIconStyle } = getStyles({
    uiModel,
    eventHeight,
    headerHeight,
    flat,
    isDraggingTarget,
    resizingWidth,
    movingLeft,
  });

  const { onMouseDown: onResizeStart } = useDrag(
    DRAGGING_TYPE_CREATORS.resizeEvent(`${uiModel.cid()}`)
  );
  const { onMouseDown: onMoveStart } = useDrag(
    DRAGGING_TYPE_CREATORS.moveEvent(`${uiModel.cid()}`)
  );

  const handleResizeStart = (e: MouseEvent) => {
    e.stopPropagation();
    onResizeStart(e);
  };

  const handleMoveStart = (e: MouseEvent) => {
    e.stopPropagation();
    onMoveStart(e);
  };

  return (
    <div className={dayEventBlockClassName} style={containerStyle}>
      <div className={cls('weekday-event')} style={eventItemStyle} onMouseDown={handleMoveStart}>
        <span className={cls('weekday-event-title')}>
          <Template template="time" model={uiModel.model} />
        </span>
        {flat || isDraggingTarget ? null : (
          <ResizeIcon style={resizeIconStyle} onMouseDown={handleResizeStart} />
        )}
      </div>
    </div>
  );
};
