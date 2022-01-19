import { h } from 'preact';
import { useRef } from 'preact/hooks';

import { ResizeIcon } from '@src/components/events/resizeIcon';
import { Template } from '@src/components/template';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { cls, toPercent, toPx } from '@src/helpers/css';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';
import EventUIModel from '@src/model/eventUIModel';
import { optionsSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { PopupType } from '@src/slices/popup';

import { CalendarState } from '@t/store';

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

function getTestId({ model }: EventUIModel) {
  const calendarId = model.calendarId ? `${model.calendarId}-` : '';
  const id = model.id ? `${model.id}-` : '';

  return `${calendarId}${id}${model.title}`;
}

function isDraggingSelector(state: CalendarState) {
  return state.dnd.draggingState > DraggingState.INIT;
}

export function HorizontalEvent({
  flat = false,
  uiModel,
  eventHeight,
  headerHeight,
  isDraggingTarget = false,
  resizingWidth = null,
  movingLeft = null,
}: Props) {
  const { dayEventBlockClassName, containerStyle, eventItemStyle, resizeIconStyle } = getStyles({
    uiModel,
    eventHeight,
    headerHeight,
    flat,
    isDraggingTarget,
    resizingWidth,
    movingLeft,
  });
  const { isReadOnly } = uiModel.model;

  const isDragging = useStore(isDraggingSelector);
  const { useDetailPopup } = useStore(optionsSelector);
  const { setDraggingEventUIModel } = useDispatch('dnd');
  const { show } = useDispatch('popup');

  const eventContainerRef = useRef<HTMLDivElement>(null);

  const { onMouseDown: onResizeStart } = useDrag(
    DRAGGING_TYPE_CREATORS.resizeEvent(`${uiModel.cid()}`),
    {
      onDragStart: () => {
        setDraggingEventUIModel(uiModel);
      },
    }
  );
  const { onMouseDown: onMoveStart } = useDrag(
    DRAGGING_TYPE_CREATORS.moveEvent(`${uiModel.cid()}`),
    {
      onDragStart: () => {
        setDraggingEventUIModel(uiModel);
      },
      onDragEnd: () => {
        if (useDetailPopup && !isDragging && eventContainerRef.current) {
          const { top, left, width, height } = eventContainerRef.current.getBoundingClientRect();

          show({
            type: PopupType.detail,
            param: {
              event: uiModel.model,
              eventRect: { top, left, width, height },
            },
          });
        }
      },
    }
  );

  const handleResizeStart = (e: MouseEvent) => {
    e.stopPropagation();
    onResizeStart(e);
  };

  const handleMoveStart = (e: MouseEvent) => {
    e.stopPropagation();
    onMoveStart(e);
  };

  const shouldHideResizeHandler = flat || isDraggingTarget || uiModel.exceedRight || isReadOnly;

  return (
    <div
      className={dayEventBlockClassName}
      style={containerStyle}
      data-test-id={getTestId(uiModel)}
      ref={eventContainerRef}
    >
      <div className={cls('weekday-event')} style={eventItemStyle} onMouseDown={handleMoveStart}>
        <span className={cls('weekday-event-title')}>
          <Template template="time" model={uiModel.model} />
        </span>
        {shouldHideResizeHandler ? null : (
          <ResizeIcon style={resizeIconStyle} onMouseDown={handleResizeStart} />
        )}
      </div>
    </div>
  );
}
