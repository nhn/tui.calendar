import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { Template } from '@src/components/template';
import { DEFAULT_DUPLICATE_EVENT_CID } from '@src/constants/layout';
import { TIME_EVENT_CONTAINER_MARGIN_LEFT } from '@src/constants/style';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { useEventBus } from '@src/contexts/eventBus';
import { useLayoutContainer } from '@src/contexts/layoutContainer';
import { cls, extractPercentPx, getEventColors, toPercent } from '@src/helpers/css';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { useCalendarColor } from '@src/hooks/calendar/useCalendarColor';
import { useDrag } from '@src/hooks/common/useDrag';
import { useTransientUpdate } from '@src/hooks/common/useTransientUpdate';
import type EventUIModel from '@src/model/eventUIModel';
import { dndSelector, optionsSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import type TZDate from '@src/time/date';
import { isPresent, isString } from '@src/utils/type';

import type { StyleProp } from '@t/components/common';
import type { CalendarColor } from '@t/options';

const classNames = {
  time: cls('event-time'),
  content: cls('event-time-content'),
  travelTime: cls('travel-time'),
  resizeHandleX: cls('resize-handler-x'),
  moveEvent: cls('dragging--move-event'),
  resizeEvent: cls('dragging--resize-vertical-event'),
};

interface Props {
  uiModel: EventUIModel;
  isResizingGuide?: boolean;
  nextStartTime?: TZDate | null;
  minHeight?: number;
}

function getMarginLeft(left: number | string) {
  const { percent, px } = extractPercentPx(`${left}`);

  return left > 0 || percent > 0 || px > 0 ? TIME_EVENT_CONTAINER_MARGIN_LEFT : 0;
}

function getContainerWidth(width: number | string, marginLeft: number) {
  if (isString(width)) {
    return width;
  }
  if (width >= 0) {
    return `calc(${toPercent(width)} - ${marginLeft}px)`;
  }

  return '';
}

function getStyles({
  uiModel,
  isDraggingTarget,
  hasNextStartTime,
  calendarColor,
  minHeight,
}: {
  uiModel: EventUIModel;
  isDraggingTarget: boolean;
  hasNextStartTime: boolean;
  calendarColor: CalendarColor;
  minHeight: number;
}) {
  const {
    top,
    left,
    height,
    width,
    duplicateLeft,
    duplicateWidth,
    goingDurationHeight,
    modelDurationHeight,
    comingDurationHeight,
    croppedStart,
    croppedEnd,
  } = uiModel;
  // TODO: check and get theme values
  const travelBorderColor = 'white';
  const borderRadius = 2;
  const defaultMarginBottom = 2;
  const marginLeft = getMarginLeft(left);

  const { color, backgroundColor, borderColor, dragBackgroundColor } = getEventColors(
    uiModel,
    calendarColor
  );
  const containerStyle: StyleProp = {
    width: getContainerWidth(duplicateWidth || width, marginLeft),
    height: `calc(${toPercent(Math.max(height, minHeight))} - ${defaultMarginBottom}px)`,
    top: toPercent(top),
    left: duplicateLeft || toPercent(left),
    borderRadius,
    borderLeft: `3px solid ${borderColor}`,
    marginLeft,
    color,
    backgroundColor: isDraggingTarget ? dragBackgroundColor : backgroundColor,
    opacity: isDraggingTarget ? 0.5 : 1,
    zIndex: hasNextStartTime ? 1 : 0,
  };

  const goingDurationStyle = {
    height: toPercent(goingDurationHeight),
    borderBottom: `1px dashed ${travelBorderColor}`,
  };
  const modelDurationStyle = {
    height: toPercent(modelDurationHeight),
  };
  const comingDurationStyle = {
    height: toPercent(comingDurationHeight),
    borderTop: `1px dashed ${travelBorderColor}`,
  };

  if (croppedStart) {
    containerStyle.borderTopLeftRadius = 0;
    containerStyle.borderTopRightRadius = 0;
  }

  if (croppedEnd) {
    containerStyle.borderBottomLeftRadius = 0;
    containerStyle.borderBottomRightRadius = 0;
  }

  return {
    containerStyle,
    goingDurationStyle,
    modelDurationStyle,
    comingDurationStyle,
  };
}

function isDraggableEvent({
  uiModel,
  isReadOnlyCalendar,
  isDraggingTarget,
  hasNextStartTime,
}: {
  uiModel: EventUIModel;
  isReadOnlyCalendar: boolean;
  isDraggingTarget: boolean;
  hasNextStartTime: boolean;
}) {
  const { model } = uiModel;
  return !isReadOnlyCalendar && !model.isReadOnly && !isDraggingTarget && !hasNextStartTime;
}

// eslint-disable-next-line complexity
export function TimeEvent({
  uiModel,
  nextStartTime,
  isResizingGuide = false,
  minHeight = 0,
}: Props) {
  const {
    useDetailPopup,
    isReadOnly: isReadOnlyCalendar,
    week: weekOptions,
  } = useStore(optionsSelector);
  const calendarColor = useCalendarColor(uiModel.model);
  const { collapseDuplicateEvents } = weekOptions;

  const layoutContainer = useLayoutContainer();
  const { showDetailPopup } = useDispatch('popup');
  const { setDraggingEventUIModel } = useDispatch('dnd');
  const { setSelectedDuplicateEventCid } = useDispatch('weekViewLayout');

  const eventBus = useEventBus();

  const eventContainerRef = useRef<HTMLDivElement>(null);

  const [isDraggingTarget, setIsDraggingTarget] = useState<boolean>(false);

  const { model, goingDurationHeight, modelDurationHeight, comingDurationHeight, croppedEnd } =
    uiModel;
  const { id, calendarId, customStyle } = model;
  const hasNextStartTime = isPresent(nextStartTime);
  const { containerStyle, goingDurationStyle, modelDurationStyle, comingDurationStyle } = getStyles(
    { uiModel, isDraggingTarget, hasNextStartTime, calendarColor, minHeight }
  );
  const isGuide = hasNextStartTime || isResizingGuide;

  useTransientUpdate(dndSelector, ({ draggingEventUIModel, draggingState }) => {
    if (
      draggingState === DraggingState.DRAGGING &&
      draggingEventUIModel?.cid() === uiModel.cid() &&
      !hasNextStartTime &&
      !isResizingGuide
    ) {
      setIsDraggingTarget(true);
    } else {
      setIsDraggingTarget(false);
    }
  });

  useEffect(() => {
    if (!isResizingGuide) {
      eventBus.fire('afterRenderEvent', uiModel.model.toEventObject());
    }
    // This effect is only for the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDragEvent = (className: string) => {
    setDraggingEventUIModel(uiModel);
    layoutContainer?.classList.add(className);
  };
  const endDragEvent = (className: string) => {
    setIsDraggingTarget(false);
    layoutContainer?.classList.remove(className);
  };

  const onMoveStart = useDrag(DRAGGING_TYPE_CREATORS.moveEvent('timeGrid', `${uiModel.cid()}`), {
    onDragStart: () => {
      if (isDraggable) {
        startDragEvent(classNames.moveEvent);
      }
    },
    onMouseUp: (e, { draggingState }) => {
      endDragEvent(classNames.moveEvent);

      const isClick = draggingState <= DraggingState.INIT;
      if (isClick && collapseDuplicateEvents) {
        const selectedDuplicateEventCid =
          uiModel.duplicateEvents.length > 0 ? uiModel.cid() : DEFAULT_DUPLICATE_EVENT_CID;
        setSelectedDuplicateEventCid(selectedDuplicateEventCid);
      }

      if (isClick && useDetailPopup && eventContainerRef.current) {
        showDetailPopup(
          {
            event: uiModel.model,
            eventRect: eventContainerRef.current.getBoundingClientRect(),
          },
          false
        );
      }

      if (isClick) {
        eventBus.fire('clickEvent', { event: uiModel.model.toEventObject(), nativeEvent: e });
      }
    },
    onPressESCKey: () => endDragEvent(classNames.moveEvent),
  });
  const handleMoveStart = (e: MouseEvent) => {
    e.stopPropagation();
    onMoveStart(e);
  };

  const onResizeStart = useDrag(
    DRAGGING_TYPE_CREATORS.resizeEvent('timeGrid', `${uiModel.cid()}`),
    {
      onDragStart: () => startDragEvent(classNames.resizeEvent),
      onMouseUp: () => endDragEvent(classNames.resizeEvent),
      onPressESCKey: () => endDragEvent(classNames.resizeEvent),
    }
  );
  const handleResizeStart = (e: MouseEvent) => {
    e.stopPropagation();
    onResizeStart(e);
  };

  const isDraggable = isDraggableEvent({
    uiModel,
    isReadOnlyCalendar,
    isDraggingTarget,
    hasNextStartTime,
  });
  const shouldShowResizeHandle = isDraggable && !croppedEnd;

  return (
    <div
      data-testid={`${isGuide ? 'guide-' : ''}time-event-${model.title}-${uiModel.cid()}`}
      data-calendar-id={calendarId}
      data-event-id={id}
      className={classNames.time}
      style={{ ...containerStyle, ...customStyle }}
      onMouseDown={handleMoveStart}
      ref={eventContainerRef}
    >
      {goingDurationHeight ? (
        <div className={classNames.travelTime} style={goingDurationStyle}>
          <Template template="goingDuration" param={model} />
        </div>
      ) : null}
      {modelDurationHeight ? (
        <div className={classNames.content} style={modelDurationStyle}>
          <Template
            template="time"
            param={{
              ...model.toEventObject(),
              start: hasNextStartTime ? nextStartTime : model.start,
            }}
          />
        </div>
      ) : null}
      {comingDurationHeight ? (
        <div className={classNames.travelTime} style={comingDurationStyle}>
          <Template template="comingDuration" param={model} />
        </div>
      ) : null}
      {shouldShowResizeHandle ? (
        <div className={classNames.resizeHandleX} onMouseDown={handleResizeStart} />
      ) : null}
    </div>
  );
}
