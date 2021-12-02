import { FunctionComponent, h } from 'preact';

import { EventDetailSectionButton } from '@src/components/popup/eventDetailSectionButton';
import { EventDetailSectionDetail } from '@src/components/popup/eventDetailSectionDetail';
import { EventDetailSectionHeader } from '@src/components/popup/eventDetailSectionHeader';
import { cls } from '@src/helpers/css';
import TZDate from '@src/time/date';

import { EventDetailPopupParam } from '@t/store';

const classNames = {
  popupContainer: cls('popup-container'),
  detailContainer: cls('detail-container'),
};

export const EventDetailPopup: FunctionComponent<EventDetailPopupParam> = ({ event = {} }) => {
  const {
    title = '',
    isAllDay = false,
    start = new TZDate(),
    end = new TZDate(),
    location,
    recurrenceRule,
    attendees,
    state,
    calendarId,
    bgColor,
    body,
    isReadOnly,
  } = event;

  return (
    <div className={classNames.popupContainer}>
      <div className={classNames.detailContainer}>
        <EventDetailSectionHeader title={title} isAllday={isAllDay} start={start} end={end} />
        <EventDetailSectionDetail
          location={location}
          recurrenceRule={recurrenceRule}
          attendees={attendees}
          state={state}
          calendarId={calendarId}
          body={body}
        />
        {!isReadOnly && <EventDetailSectionButton />}
      </div>
      <div className={cls('popup-top-line')} style={{ backgroundColor: bgColor }} />
    </div>
  );
};
