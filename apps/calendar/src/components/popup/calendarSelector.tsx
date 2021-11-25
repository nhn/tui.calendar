import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { CalendarDropdownMenu } from '@src/components/popup/calendarDropdownMenu';
import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';

import { CalendarInfo } from '@t/option';

interface Props {
  calendars: CalendarInfo[];
}

const classNames = {
  popupSection: ['dropdown-section', 'calendar-section'],
  popupSectionItem: cls('popup-section-item', 'popup-button'),
  dotIcon: cls('icon', 'dot'),
  content: cls('content', 'event-calendar'),
};

export const CalendarSelector: FunctionComponent<Props> = ({ calendars }) => {
  const [isOpened, setOpened] = useState(false);
  const [calendarIndex, setCalendarIndex] = useState(0);
  const onClick = () => setOpened((prev) => !prev);
  const { bgColor, name } = calendars[calendarIndex];

  return (
    <PopupSection onClick={onClick} classNames={classNames.popupSection}>
      <button className={classNames.popupSectionItem}>
        <span className={classNames.dotIcon} style={{ backgroundColor: bgColor }} />
        <span className={classNames.content}>{name}</span>
        <span className={cls('icon', 'ic-dropdown-arrow', { open: isOpened })} />
      </button>
      {isOpened && (
        <CalendarDropdownMenu
          calendars={calendars}
          setOpened={setOpened}
          setCalendarIndex={setCalendarIndex}
        />
      )}
    </PopupSection>
  );
};
