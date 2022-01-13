import { h } from 'preact';

import { cls } from '@src/helpers/css';

interface Props {
  location?: string;
  recurrenceRule?: string;
  attendees?: string[];
  state?: string;
  calendarId?: string;
  body?: string;
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

export function EventDetailSectionDetail({
  location,
  recurrenceRule,
  attendees,
  state,
  calendarId,
  body,
}: Props) {
  return (
    <div className={classNames.sectionDetail}>
      {location && (
        <div className={classNames.detailItem}>
          <span className={classNames.locationIcon} />
          <span className={classNames.content}>{location}</span>
        </div>
      )}
      {recurrenceRule && (
        <div className={classNames.detailItem}>
          <span className={classNames.repeatIcon} />
          <span className={classNames.content}>{recurrenceRule}</span>
        </div>
      )}
      {attendees && (
        <div className={classNames.detailItemIndent}>
          <span className={classNames.userIcon} />
          <span className={classNames.content}>{attendees.join(',')}</span>
        </div>
      )}
      {state && (
        <div className={classNames.detailItem}>
          <span className={classNames.stateIcon} />
          <span className={classNames.content}>{state}</span>
        </div>
      )}
      {calendarId && (
        <div className={classNames.detailItem}>
          <span className={classNames.calendarDotIcon} />
          <span className={classNames.content}>{calendarId}</span>
        </div>
      )}
      {body && (
        <div className={classNames.detailItemSeparate}>
          <span className={classNames.content}>{body}</span>
        </div>
      )}
    </div>
  );
}
