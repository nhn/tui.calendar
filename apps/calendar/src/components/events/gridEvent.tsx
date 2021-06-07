import { h, FunctionComponent } from 'preact';

import ResizeIcon from '@src/components/events/resizeIcon';
import Template from '@src/components/template';

import ScheduleViewModel from '@src/model/scheduleViewModel';
import { toPercent, toPx } from '@src/util/units';
import { cls } from '@src/util/cssHelper';

interface GridEventProps {
  viewModel: ScheduleViewModel;
  eventHeight: number;
  headerHeight: number;
  flat?: boolean;
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

function getStyles({ viewModel, eventHeight, headerHeight, flat = false }: GridEventProps) {
  const {
    width,
    left,
    top,
    exceedLeft,
    exceedRight,
    model: { bgColor, borderColor },
  } = viewModel;

  const margin = getMargin(flat);

  const blockStyle = flat
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

  return { dayEventBlockClassName, blockStyle, eventItemStyle, resizeIconStyle };
}

const GridEvent: FunctionComponent<GridEventProps> = (props) => {
  const { dayEventBlockClassName, blockStyle, eventItemStyle, resizeIconStyle } = getStyles(props);

  const {
    flat = false,
    viewModel: { model },
  } = props;

  return (
    <div className={dayEventBlockClassName} style={blockStyle}>
      <div className={cls('weekday-event')} style={eventItemStyle}>
        <span className={cls('weekday-schedule-title')}>
          <Template template="time" model={model} />
        </span>
        {flat ? null : <ResizeIcon style={resizeIconStyle} />}
      </div>
    </div>
  );
};

export default GridEvent;
