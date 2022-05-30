import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { HorizontalEventResizeIcon } from '@src/components/events/horizontalEventResizeIcon';
import { Template } from '@src/components/template';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { useLayoutContainer } from '@src/contexts/layoutContainer';
import { cls, toPercent, toPx } from '@src/helpers/css';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/useDrag';
import { useTransientUpdate } from '@src/hooks/common/useTransientUpdate';
import type EventUIModel from '@src/model/eventUIModel';
import { dndSelector, optionsSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { passConditionalProp } from '@src/utils/preact';
import { isNil } from '@src/utils/type';

interface Props {
  uiModel: EventUIModel;
  eventHeight: number;
  headerHeight: number;
  resizingWidth?: string | null;
  flat?: boolean;
  movingLeft?: number | null;
}

type StyleProps = Required<Props> & { isDraggingTarget: boolean };

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
        top: (top - 1) * (eventHeight + margin.vertical) + headerHeight,
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

  const dayEventBlockClassName = `${cls('weekday-event-block')} ${getExceedClassName(
    exceedLeft,
    exceedRight
  )}`;

  return { dayEventBlockClassName, containerStyle, eventItemStyle };
}

function getTestId({ model }: EventUIModel) {
  const calendarId = model.calendarId ? `${model.calendarId}-` : '';
  const id = model.id ? `${model.id}-` : '';

  return `${calendarId}${id}${model.title}`;
}

const classNames = {
  eventBody: cls('weekday-event'),
  eventTitle: cls('weekday-event-title'),
  moveEvent: cls('dragging--move-event'),
  resizeEvent: cls('dragging--resize-horizontal-event'),
};

export function HorizontalEvent({
  flat = false,
  uiModel,
  eventHeight,
  headerHeight,
  resizingWidth = null,
  movingLeft = null,
}: Props) {
  const layoutContainer = useLayoutContainer();

  const { useDetailPopup, isReadOnly: isGloballyReadOnly } = useStore(optionsSelector);
  const { setDraggingEventUIModel } = useDispatch('dnd');
  const { showDetailPopup } = useDispatch('popup');
  const eventBus = useEventBus();

  const [isDraggingTarget, setIsDraggingTarget] = useState<boolean>(false);
  const eventContainerRef = useRef<HTMLDivElement>(null);

  const isDraggableEvent = !isGloballyReadOnly && isNil(resizingWidth) && isNil(movingLeft);
  const { dayEventBlockClassName, containerStyle, eventItemStyle } = getStyles({
    uiModel,
    eventHeight,
    headerHeight,
    flat,
    isDraggingTarget,
    resizingWidth,
    movingLeft,
  });

  const startDragEvent = (className: string) => {
    setDraggingEventUIModel(uiModel);
    layoutContainer?.classList.add(className);
  };
  const endDragEvent = (className: string) => {
    setIsDraggingTarget(false);
    layoutContainer?.classList.remove(className);
  };

  useTransientUpdate(dndSelector, ({ draggingEventUIModel, draggingState }) => {
    if (
      draggingState === DraggingState.DRAGGING &&
      draggingEventUIModel?.cid() === uiModel.cid() &&
      isNil(resizingWidth) &&
      isNil(movingLeft)
    ) {
      setIsDraggingTarget(true);
    } else {
      setIsDraggingTarget(false);
    }
  });

  useEffect(() => {
    if (isDraggableEvent) {
      eventBus.fire('afterRenderEvent', uiModel.model.toEventObject());
    }
    // This effect is only for the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResizeStart = useDrag(DRAGGING_TYPE_CREATORS.resizeEvent('dayGrid', `${uiModel.cid()}`), {
    onDragStart: () => startDragEvent(classNames.resizeEvent),
    onMouseUp: () => endDragEvent(classNames.resizeEvent),
    onPressESCKey: () => endDragEvent(classNames.resizeEvent),
  });
  const onMoveStart = useDrag(DRAGGING_TYPE_CREATORS.moveEvent('dayGrid', `${uiModel.cid()}`), {
    onDragStart: () => startDragEvent(classNames.moveEvent),
    onMouseUp: (e, { draggingState }) => {
      endDragEvent(classNames.moveEvent);

      const isClick = draggingState <= DraggingState.INIT;
      if (isClick && useDetailPopup && eventContainerRef.current) {
        showDetailPopup(
          {
            event: uiModel.model,
            eventRect: eventContainerRef.current.getBoundingClientRect(),
          },
          flat
        );
      }

      eventBus.fire('clickEvent', { event: uiModel.model.toEventObject(), nativeEvent: e });
    },
    onPressESCKey: () => endDragEvent(classNames.moveEvent),
  });

  const handleResizeStart = (e: MouseEvent) => {
    e.stopPropagation();
    onResizeStart(e);
  };

  const handleMoveStart = (e: MouseEvent) => {
    e.stopPropagation();
    onMoveStart(e);
  };

  const { isReadOnly, id, calendarId } = uiModel.model;
  const shouldHideResizeHandler =
    !isDraggableEvent || flat || isDraggingTarget || uiModel.exceedRight || isReadOnly;

  return (
    <div
      className={dayEventBlockClassName}
      style={containerStyle}
      data-testid={passConditionalProp(isDraggableEvent, getTestId(uiModel))}
      data-calendar-id={calendarId}
      data-event-id={id}
      ref={eventContainerRef}
    >
      <div
        className={classNames.eventBody}
        style={eventItemStyle}
        onMouseDown={passConditionalProp(isDraggableEvent, handleMoveStart)}
      >
        <span className={classNames.eventTitle}>
          <Template template="event" param={uiModel.model} />
        </span>
        {shouldHideResizeHandler ? null : (
          <HorizontalEventResizeIcon
            onMouseDown={passConditionalProp(isDraggableEvent, handleResizeStart)}
          />
        )}
      </div>
    </div>
  );
}
