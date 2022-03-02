import { h } from 'preact';
import { useState } from 'preact/hooks';

import { Template } from '@src/components/template';
import { useDispatch } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { DragListeners, useDrag } from '@src/hooks/common/drag';
import EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';
import { passConditionalProp } from '@src/utils/preact';
import { isNil, isPresent } from '@src/utils/type';

const classNames = {
  time: cls('event-time'),
  content: cls('event-time-content'),
  travelTime: cls('travel-time'),
  resizeHandleX: cls('resize-handler-x'),
};

interface Props {
  uiModel: EventUIModel;
  isDraggingTarget?: boolean;
  nextStartTime?: TZDate | null;
}

function getStyles(uiModel: EventUIModel, isDraggingTarget: boolean, hasNextStartTime: boolean) {
  const {
    top,
    left,
    height,
    width,
    model,
    goingDurationHeight,
    modelDurationHeight,
    comingDurationHeight,
    croppedStart,
    croppedEnd,
  } = uiModel;
  // get theme values
  const travelBorderColor = 'white';
  const borderRadius = 2;
  const paddingLeft = 2;
  const defaultMarginBottom = 2;
  const marginLeft = left > 0 ? paddingLeft : 0;

  const { color, bgColor, borderColor } = model;
  const containerStyle: Record<string, string | number> = {
    width: width >= 0 ? `calc(${toPercent(width)} - ${marginLeft}px)` : '',
    height: `calc(${toPercent(height)} - ${defaultMarginBottom}px)`,
    top: toPercent(top),
    left: toPercent(left),
    borderRadius,
    borderLeft: `3px solid ${borderColor}`,
    marginLeft,
    color,
    backgroundColor: bgColor,
    opacity: isDraggingTarget ? 0.5 : 1,
    zIndex: hasNextStartTime ? 1 : 'auto',
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

// @TODO: separate logics from resizing & moving shadows
export function TimeEvent({ uiModel, nextStartTime }: Props) {
  const [isDraggingTarget, setIsDraggingTarget] = useState<boolean>(false);
  const { setDraggingEventUIModel } = useDispatch('dnd');

  const { model, goingDurationHeight, modelDurationHeight, comingDurationHeight, croppedEnd } =
    uiModel;
  const { isReadOnly } = model;
  const { containerStyle, goingDurationStyle, modelDurationStyle, comingDurationStyle } = getStyles(
    uiModel,
    isDraggingTarget,
    isPresent(nextStartTime)
  );

  const handleDrag: DragListeners['onDrag'] = (_, { draggingEventUIModel }) => {
    if (draggingEventUIModel?.cid() === uiModel.cid() && isNil(nextStartTime)) {
      setIsDraggingTarget(true);
    }
  };
  const clearIsDraggingTarget = () => setIsDraggingTarget(false);

  const startEventMove = useDrag(DRAGGING_TYPE_CREATORS.moveEvent('timeGrid', `${uiModel.cid()}`), {
    onInit: () => {
      setDraggingEventUIModel(uiModel);
    },
    onDragStart: handleDrag,
    onMouseUp: clearIsDraggingTarget,
  });
  const handleEventMoveStart = (e: MouseEvent) => {
    e.stopPropagation();
    startEventMove(e);
  };

  return (
    <div
      data-testid={`time-event-${model.title}-${uiModel.cid()}`}
      className={classNames.time}
      style={containerStyle}
      onMouseDown={passConditionalProp(isNil(nextStartTime), handleEventMoveStart)}
    >
      {goingDurationHeight ? (
        <div className={classNames.travelTime} style={goingDurationStyle}>
          <Template template="goingDuration" model={model} />
        </div>
      ) : null}
      {modelDurationHeight ? (
        <div className={classNames.content} style={modelDurationStyle}>
          <Template
            template="time"
            model={{
              start: isNil(nextStartTime) ? model.start : nextStartTime,
              title: model.title,
            }}
          />
        </div>
      ) : null}
      {comingDurationHeight ? (
        <div className={classNames.travelTime} style={comingDurationStyle}>
          <Template template="comingDuration" model={model} />
        </div>
      ) : null}
      {!croppedEnd && !isReadOnly ? <div className={classNames.resizeHandleX} /> : null}
    </div>
  );
}
