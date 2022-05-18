import { h } from 'preact';

import { Template } from '@src/components/template';
import { cls } from '@src/helpers/css';
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

export function EventDetailSectionDetail({ event }: Props) {
  const { location, recurrenceRule, attendees, state, calendarId, body } = event;
  return (
    <div className={classNames.sectionDetail}>
      {location && (
        <div className={classNames.detailItem}>
          <span className={classNames.locationIcon} />
          <span className={classNames.content}>
            <Template template="popupDetailLocation" model={event} as="span" />
          </span>
        </div>
      )}
      {recurrenceRule && (
        <div className={classNames.detailItem}>
          <span className={classNames.repeatIcon} />
          <span className={classNames.content}>
            <Template template="popupDetailRepeat" model={event} as="span" />
          </span>
        </div>
      )}
      {attendees && (
        <div className={classNames.detailItemIndent}>
          <span className={classNames.userIcon} />
          <span className={classNames.content}>
            <Template template="popupDetailUser" model={event} as="span" />
          </span>
        </div>
      )}
      {state && (
        <div className={classNames.detailItem}>
          <span className={classNames.stateIcon} />
          <span className={classNames.content}>
            <Template template="popupDetailState" model={event} as="span" />
          </span>
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
          <span className={classNames.content}>
            <Template template="popupDetailBody" model={event} as="span" />
          </span>
        </div>
      )}
    </div>
  );
}
