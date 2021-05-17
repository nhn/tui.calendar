import { h, FunctionComponent } from 'preact';

import ScheduleViewModel from '@src/model/scheduleViewModel';
import { toPercent, toPx } from '@src/util/units';
import { cls } from '@src/util/cssHelper';

interface GridEventProps {
  viewModel: ScheduleViewModel;
  eventHeight: number;
  headerHeight: number;
  flat?: boolean;
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
}: EventItemStyleParam) {
  const defualtItemStyle = {
    color: '#333',
    backgroundColor: bgColor,
    borderLeft: exceedLeft ? 'none' : `3px solid ${borderColor}`,
    borderRadius: exceedLeft ? 0 : 2,
    overflow: 'hidden',
  };

  return flat
    ? {
        marginTop: 5,
        ...defualtItemStyle,
      }
    : {
        marginLeft: exceedLeft ? 0 : 8,
        marginRight: exceedRight ? 0 : 8,
        ...defualtItemStyle,
      };
}

function useStyle({ viewModel, eventHeight, headerHeight, flat = false }: GridEventProps) {
  const {
    width,
    left,
    top,
    exceedLeft,
    exceedRight,
    model: { bgColor, borderColor },
  } = viewModel;

  const blockStyle = flat
    ? {}
    : {
        width: toPercent(width),
        left: toPercent(left),
        top: toPx((top - 1) * eventHeight + headerHeight),
        position: 'absolute',
      };

  const eventItemStyle = getEventItemStyle({ flat, exceedLeft, exceedRight, bgColor, borderColor });

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
  const { dayEventBlockClassName, blockStyle, eventItemStyle, resizeIconStyle } = useStyle(props);

  const {
    viewModel: {
      model: { title },
    },
  } = props;

  // @TODO: 일정 타이틀 템플릿 적용
  return (
    <div className={dayEventBlockClassName} style={blockStyle}>
      <div className={cls('weekday-event')} style={eventItemStyle}>
        <span className={cls('weekday-schedule-title')}>{title}</span>
        <span
          className={[cls('weekday-resize-handle'), cls('handle-y')].join(' ')}
          style={{ position: 'absolute', right: 8, cursor: 'col-resize' }}
        >
          <i className={[cls('icon'), cls('ic-handle-y')].join(' ')} style={resizeIconStyle} />
        </span>
      </div>
    </div>
  );
};

export default GridEvent;
