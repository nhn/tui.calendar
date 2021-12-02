import { FunctionComponent, h } from 'preact';

import { EventDetailSectionDetail } from '@src/components/popup/eventDetailSectionDetail';
import { EventDetailSectionHeader } from '@src/components/popup/eventDetailSectionHeader';
import { cls } from '@src/helpers/css';
import TZDate from '@src/time/date';

import { EventDetailPopupParam } from '@t/store';

const classNames = {
  popupContainer: cls('popup-container'),
  detailContainer: cls('detail-container'),
  detailItem: cls('detail-item'),
  detailItemIndent: cls('detail-item', 'detail-item-indent'),
  detailItemSeparate: cls('detail-item', 'detail-item-separate'),
  sectionHeader: cls('popup-section', 'section-header'),
  sectionDetail: cls('popup-section', 'section-detail'),
  sectionButton: cls('popup-section', 'section-button'),
  content: cls('content'),
  eventTitle: cls('event-title'),
  locationIcon: cls('icon', 'ic-location-b'),
  repeatIcon: cls('icon', 'ic-repeat-b'),
  userIcon: cls('icon', 'ic-user-b'),
  stateIcon: cls('icon', 'ic-state-b'),
  calendarDotIcon: cls('icon', 'calendar-dot'),
  editIcon: cls('icon', 'ic-edit'),
  deleteIcon: cls('icon', 'ic-delete'),
  editButton: cls('edit-button'),
  deleteButton: cls('delete-button'),
  verticalLine: cls('vertical-line'),
};

export const EventDetailPopup: FunctionComponent<EventDetailPopupParam> = ({ event = {} }) => {
  const {
    title = '',
    isAllDay = false,
    start = new TZDate(),
    end = new TZDate(),
    location,
    recurrenceRule,
    attendees = [],
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
        {!isReadOnly && (
          <div className={classNames.sectionButton}>
            <button className={classNames.editButton}>
              <span className={classNames.editIcon} />
              <span className={classNames.content}>Edit</span>
            </button>
            <div className={classNames.verticalLine} />
            <button className={classNames.deleteButton}>
              <span className={classNames.deleteIcon} />
              <span className={classNames.content}>Delete</span>
            </button>
          </div>
        )}
      </div>
      <div className={cls('popup-top-line')} style={{ backgroundColor: bgColor }} />
    </div>
  );
};
