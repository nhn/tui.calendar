import { h, FunctionComponent } from 'preact';

import ScheduleViewModel from '@src/model/scheduleViewModel';
import { toPercent, toPx } from '@src/util/units';
import { cls } from '@src/util/cssHelper';

interface GridEventProps {
  viewModel: ScheduleViewModel;
  eventHeight: number;
  cellTopHeight: number;
  flat?: boolean;
}

const GridEvent: FunctionComponent<GridEventProps> = ({
  viewModel,
  eventHeight,
  cellTopHeight,
  flat = false,
}) => {
  const {
    width,
    left,
    top,
    exceedRight,
    model: { title, bgColor, borderColor },
  } = viewModel;

  const blockStyle = flat
    ? {}
    : {
        width: toPercent(width),
        left: toPercent(left),
        top: toPx((top - 1) * eventHeight + cellTopHeight),
        position: 'absolute',
      };

  // @TODO: 테마 적용
  const eventItemStyle = flat
    ? {
        color: '#333',
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: bgColor,
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: 2,
        overflow: 'hidden',
      }
    : {
        color: '#333',
        marginLeft: 8,
        marginRight: 8,
        backgroundColor: bgColor,
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: 2,
        overflow: 'hidden',
      };

  const resizeIconStyle = {
    lineHeight: toPx(18),
  };

  const dayEventBlockClassName = `${cls('weekday-event-block')} ${cls(
    exceedRight ? 'weekday-exceed-right' : ''
  )}`;

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
