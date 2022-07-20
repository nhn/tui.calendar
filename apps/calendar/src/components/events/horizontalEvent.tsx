import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { HorizontalEventResizeIcon } from '@src/components/events/horizontalEventResizeIcon';
import { Template } from '@src/components/template';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { useLayoutContainer } from '@src/contexts/layoutContainer';
import { cls, getEventColors, toPercent, toPx } from '@src/helpers/css';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { useCalendarColor } from '@src/hooks/calendar/useCalendarColor';
import { useDrag } from '@src/hooks/common/useDrag';
import { useTransientUpdate } from '@src/hooks/common/useTransientUpdate';
import type EventUIModel from '@src/model/eventUIModel';
import { dndSelector, optionsSelector, viewSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isSameDate } from '@src/time/datetime';
import { passConditionalProp } from '@src/utils/preact';
import { isNil } from '@src/utils/type';

import type { CalendarColor } from '@t/options';

interface Props {
  uiModel: EventUIModel;
  eventHeight: number;
  headerHeight: number;
  resizingWidth?: string | null;
  flat?: boolean;
  movingLeft?: number | null;
}

function getMargins(flat: boolean) {
  return {
    vertical: flat ? 5 : 2,
    horizontal: 8,
  };
}

function getBorderRadius(exceedLeft: boolean, exceedRight: boolean): string {
  const leftBorderRadius = exceedLeft ? 0 : '2px';
  const rightBorderRadius = exceedRight ? 0 : '2px';

  return `${leftBorderRadius} ${rightBorderRadius} ${rightBorderRadius} ${leftBorderRadius}`;
}

function getEventItemStyle({
  uiModel,
  flat,
  eventHeight,
  isDraggingTarget,
  calendarColor,
}: Required<Pick<Props, 'uiModel' | 'flat' | 'eventHeight'>> & {
  isDraggingTarget: boolean;
  calendarColor: CalendarColor;
}) {
  const { exceedLeft, exceedRight } = uiModel;
  const { color, backgroundColor, dragBackgroundColor, borderColor } = getEventColors(
    uiModel,
    calendarColor
  );

  const defaultItemStyle = {
    color,
    backgroundColor: isDraggingTarget ? dragBackgroundColor : backgroundColor,
    borderLeft: exceedLeft ? 'none' : `3px solid ${borderColor}`,
    borderRadius: getBorderRadius(exceedLeft, exceedRight),
    overflow: 'hidden',
    height: eventHeight,
    lineHeight: toPx(eventHeight),
    opacity: isDraggingTarget ? 0.5 : 1,
  };
  const margins = getMargins(flat);

  return flat
    ? {
        marginTop: margins.vertical,
        ...defaultItemStyle,
      }
    : {
        marginLeft: exceedLeft ? 0 : margins.horizontal,
        marginRight: exceedRight ? 0 : margins.horizontal,
        ...defaultItemStyle,
      };
}

function getContainerStyle({
  flat,
  uiModel,
  resizingWidth,
  movingLeft,
  eventHeight,
  headerHeight,
}: Required<Props>) {
  const { top, left, width, model } = uiModel;
  const margins = getMargins(flat);

  const baseStyle = flat
    ? {}
    : {
        width: resizingWidth || toPercent(width),
        left: toPercent(movingLeft ?? left),
        top: (top - 1) * (eventHeight + margins.vertical) + headerHeight,
        position: 'absolute',
      };

  return Object.assign(baseStyle, model.customStyle);
}

function getTestId({ model }: EventUIModel) {
  const calendarId = model.calendarId ? `${model.calendarId}-` : '';
  const id = model.id ? `${model.id}-` : '';

  return `${calendarId}${id}${model.title}`;
}

const classNames = {
  eventBody: cls('weekday-event'),
  eventTitle: cls('weekday-event-title'),
  eventDot: cls('weekday-event-dot'),
  moveEvent: cls('dragging--move-event'),
  resizeEvent: cls('dragging--resize-horizontal-event'),
};

// eslint-disable-next-line complexity
export function HorizontalEvent({
  flat = false,
  uiModel,
  eventHeight,
  headerHeight,
  resizingWidth = null,
  movingLeft = null,
}: Props) {
  const { currentView } = useStore(viewSelector);
  const { useDetailPopup, isReadOnly: isReadOnlyCalendar } = useStore(optionsSelector);

  const { setDraggingEventUIModel } = useDispatch('dnd');
  const { showDetailPopup } = useDispatch('popup');

  const layoutContainer = useLayoutContainer();
  const eventBus = useEventBus();
  const calendarColor = useCalendarColor(uiModel.model);

  const [isDraggingTarget, setIsDraggingTarget] = useState<boolean>(false);
  const eventContainerRef = useRef<HTMLDivElement>(null);

  const { isReadOnly, id, calendarId } = uiModel.model;
  const isDraggableEvent =
    !isReadOnlyCalendar && !isReadOnly && isNil(resizingWidth) && isNil(movingLeft);

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
    onDragStart: () => {
      if (isDraggableEvent) {
        startDragEvent(classNames.moveEvent);
      }
    },
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

      if (isClick) {
        eventBus.fire('clickEvent', { event: uiModel.model.toEventObject(), nativeEvent: e });
      }
    },
    onPressESCKey: () => endDragEvent(classNames.moveEvent),
  });

  const handleResizeStart = (e: MouseEvent) => {
    e.stopPropagation();

    if (isDraggableEvent) {
      onResizeStart(e);
    }
  };

  const handleMoveStart = (e: MouseEvent) => {
    e.stopPropagation();
    onMoveStart(e);
  };

  const isDotEvent =
    !isDraggingTarget &&
    currentView === 'month' &&
    uiModel.model.category === 'time' &&
    isSameDate(uiModel.model.start, uiModel.model.end);
  const shouldHideResizeHandler =
    !isDraggableEvent || flat || isDraggingTarget || uiModel.exceedRight;
  const containerStyle = getContainerStyle({
    uiModel,
    eventHeight,
    headerHeight,
    flat,
    movingLeft,
    resizingWidth,
  });
  const eventItemStyle = getEventItemStyle({
    uiModel,
    flat,
    eventHeight,
    isDraggingTarget,
    calendarColor,
  });

  return (
    <div
      className={cls('weekday-event-block', {
        'weekday-exceed-left': uiModel.exceedLeft,
        'weekday-exceed-right': uiModel.exceedRight,
      })}
      style={containerStyle}
      data-testid={passConditionalProp(isDraggableEvent, getTestId(uiModel))}
      data-calendar-id={calendarId}
      data-event-id={id}
      ref={eventContainerRef}
    >
      <div
        className={classNames.eventBody}
        style={{
          ...eventItemStyle,
          backgroundColor: isDotEvent ? null : eventItemStyle.backgroundColor,
          borderLeft: isDotEvent ? null : eventItemStyle.borderLeft,
        }}
        onMouseDown={handleMoveStart}
      >
        {isDotEvent ? (
          <span
            className={classNames.eventDot}
            style={{ backgroundColor: eventItemStyle.backgroundColor }}
          />
        ) : null}
        <span className={classNames.eventTitle}>
          <Template template={uiModel.model.category} param={uiModel.model} />
        </span>
        {!shouldHideResizeHandler ? (
          <HorizontalEventResizeIcon onMouseDown={handleResizeStart} />
        ) : null}
      </div>
    </div>
  );
}
