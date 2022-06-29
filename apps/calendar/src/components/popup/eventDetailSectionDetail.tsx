import { h } from 'preact';

import { Template } from '@src/components/template';
import { cls } from '@src/helpers/css';
import { useCalendarById } from '@src/hooks/calendar/useCalendarById';
import type EventModel from '@src/model/eventModel';

interface Props {
  event: EventModel;
}

const classNames = {
  detailItem: cls('detail-item'),
  detailItemIndent: cls('detail-item', 'detail-item-indent'),
  detailItemSeparate: cls('detail-item', 'detail-item-separate'),
  sectionDetail: cls('popup-section', 'section-detail'),
  content: cls('content'),
  locationIcon: cls('icon', 'ic-location-b'),
  repeatIcon: cls('icon', 'ic-repeat-b'),
  userIcon: cls('icon', 'ic-user-b'),
  stateIcon: cls('icon', 'ic-state-b'),
  calendarDotIcon: cls('icon', 'calendar-dot'),
};

// eslint-disable-next-line complexity
export function EventDetailSectionDetail({ event }: Props) {
  const { location, recurrenceRule, attendees, state, calendarId, body } = event;
  const calendar = useCalendarById(calendarId);

  return (
    <div className={classNames.sectionDetail}>
      {location && (
        <div className={classNames.detailItem}>
          <span className={classNames.locationIcon} />
          <span className={classNames.content}>
            <Template template="popupDetailLocation" param={event} as="span" />
          </span>
        </div>
      )}
      {recurrenceRule && (
        <div className={classNames.detailItem}>
          <span className={classNames.repeatIcon} />
          <span className={classNames.content}>
            <Template template="popupDetailRecurrenceRule" param={event} as="span" />
          </span>
        </div>
      )}
      {attendees && (
        <div className={classNames.detailItemIndent}>
          <span className={classNames.userIcon} />
          <span className={classNames.content}>
            <Template template="popupDetailAttendees" param={event} as="span" />
          </span>
        </div>
      )}
      {state && (
        <div className={classNames.detailItem}>
          <span className={classNames.stateIcon} />
          <span className={classNames.content}>
            <Template template="popupDetailState" param={event} as="span" />
          </span>
        </div>
      )}
      {calendar && (
        <div className={classNames.detailItem}>
          <span
            className={classNames.calendarDotIcon}
            style={{
              backgroundColor: calendar?.backgroundColor ?? '',
            }}
          />
          <span className={classNames.content}>{calendar?.name ?? ''}</span>
        </div>
      )}
      {body && (
        <div className={classNames.detailItemSeparate}>
          <span className={classNames.content}>
            <Template template="popupDetailBody" param={event} as="span" />
          </span>
        </div>
      )}
    </div>
  );
}
