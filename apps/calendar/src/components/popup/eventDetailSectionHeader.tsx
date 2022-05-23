import { h } from 'preact';

import { Template } from '@src/components/template';
import { cls } from '@src/helpers/css';
import type EventModel from '@src/model/eventModel';

interface Props {
  event: EventModel;
}

const classNames = {
  sectionHeader: cls('popup-section', 'section-header'),
  content: cls('content'),
  eventTitle: cls('event-title'),
};

export function EventDetailSectionHeader({ event }: Props) {
  return (
    <div className={classNames.sectionHeader}>
      <div className={classNames.eventTitle}>
        <Template template="popupDetailTitle" param={event} as="span" />
      </div>
      <div className={classNames.content}>
        <Template template="popupDetailDate" param={event} as="span" />
      </div>
    </div>
  );
}
