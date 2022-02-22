import { h } from 'preact';

import { Template } from '@src/components/template';
import { useDispatch } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import { DRAGGING_TYPE_CREATORS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';
import EventUIModel from '@src/model/eventUIModel';

const classNames = {
  time: cls('event-time'),
  content: cls('event-time-content'),
  travelTime: cls('travel-time'),
  resizeHandleX: cls('resize-handler-x'),
};

interface Props {
  uiModel: EventUIModel;
  isDraggingTarget?: boolean;
}

function getStyles(uiModel: EventUIModel, isDraggingTarget: boolean) {
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

export function TimeEvent({ uiModel, isDraggingTarget = false }: Props) {
  const { setDraggingEventUIModel } = useDispatch('dnd');

  const { model, goingDurationHeight, modelDurationHeight, comingDurationHeight, croppedEnd } =
    uiModel;
  const { isReadOnly } = model;
  const { containerStyle, goingDurationStyle, modelDurationStyle, comingDurationStyle } = getStyles(
    uiModel,
    isDraggingTarget
  );

  const startEventMove = useDrag(DRAGGING_TYPE_CREATORS.moveEvent(`${uiModel.cid()}`), {
    onInit: () => {
      setDraggingEventUIModel(uiModel);
    },
  });
  const handleEventMoveStart = (e: MouseEvent) => {
    e.stopPropagation();
    startEventMove(e);
  };

  return (
    <div className={classNames.time} style={containerStyle} onMouseDown={handleEventMoveStart}>
      {goingDurationHeight ? (
        <div className={classNames.travelTime} style={goingDurationStyle}>
          <Template template="goingDuration" model={model} />
        </div>
      ) : null}
      {modelDurationHeight ? (
        <div className={classNames.content} style={modelDurationStyle}>
          <Template template="time" model={model} />
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
