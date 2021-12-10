import { FunctionComponent, h } from 'preact';

import { cls } from '@src/helpers/css';
import TZDate from '@src/time/date';
import { isSameDate, toFormat } from '@src/time/datetime';

interface Props {
  title: string;
  isAllday: boolean;
  start: TZDate;
  end: TZDate;
}

const classNames = {
  sectionHeader: cls('popup-section', 'section-header'),
  content: cls('content'),
  eventTitle: cls('event-title'),
};

function getDetailDate(isAllday: boolean, start: TZDate, end: TZDate) {
  const dayFormat = 'YYYY.MM.DD';
  const timeFormat = 'hh:mm tt';
  const detailFormat = `${dayFormat} ${timeFormat}`;
  const startDate = toFormat(start, isAllday ? dayFormat : timeFormat);
  const endDateFormat = isSameDate(start, end) ? timeFormat : detailFormat;

  if (isAllday) {
    return `${startDate}${isSameDate(start, end) ? '' : toFormat(end, dayFormat)}}`;
  }

  return `${toFormat(start, detailFormat)} - ${toFormat(end, endDateFormat)}`;
}

export const EventDetailSectionHeader: FunctionComponent<Props> = ({
  title,
  isAllday,
  start,
  end,
}) => {
  return (
    <div className={classNames.sectionHeader}>
      <div>
        <span className={classNames.eventTitle}>{title}</span>
      </div>
      <div className={classNames.content}>{getDetailDate(isAllday, start, end)}</div>
    </div>
  );
};
