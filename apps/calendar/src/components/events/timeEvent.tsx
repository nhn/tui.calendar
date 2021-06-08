import { FunctionComponent, h } from 'preact';

import { Template } from '@src/components/template';
import { cls } from '@src/util/cssHelper';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { toPercent } from '@src/util/units';

const classNames = {
  time: cls('event-time'),
  content: cls('event-time-content'),
  travelTime: cls('travel-time'),
  resizeHandleX: cls('resize-handler-x'),
};

interface Props {
  eventModels: ScheduleViewModel;
}

function getStyles(viewModel: ScheduleViewModel) {
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
  } = viewModel;
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

export const TimeEvent: FunctionComponent<Props> = ({ eventModels }) => {
  const {
    model,
    goingDurationHeight,
    modelDurationHeight,
    comingDurationHeight,
    croppedEnd,
  } = eventModels;
  const { isReadOnly } = model;
  const { containerStyle, goingDurationStyle, modelDurationStyle, comingDurationStyle } = getStyles(
    eventModels
  );

  return (
    <div className={classNames.time} style={containerStyle}>
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
};
