import { Fragment, FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { CalendarDropdownMenu } from '@src/components/popup/calendarDropdownMenu';
import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';

import { CalendarInfo } from '@t/option';

interface Props {
  calendars: CalendarInfo[];
}

export const CalendarSelector: FunctionComponent<Props> = ({ calendars }) => {
  const [isOpened, setOpened] = useState(false);
  const [calendarIndex, setCalendarIndex] = useState(0);
  const onClick = () => setOpened((prev) => !prev);
  const { name, bgColor } = calendars[calendarIndex];

  return (
    <PopupSection onClick={onClick} classNames={['dropdown-section', 'calendar-section']}>
      {calendars.length && (
        <Fragment>
          <button className={cls('popup-section-item', 'popup-button')}>
            <span className={cls('icon', 'dot')} style={{ backgroundColor: bgColor }} />
            <span className={cls('content', 'event-calendar')}>{name}</span>
            <span className={cls('icon', 'ic-dropdown-arrow', { open: isOpened })} />
          </button>
          {isOpened && (
            <CalendarDropdownMenu
              calendars={calendars}
              setOpened={setOpened}
              setCalendarIndex={setCalendarIndex}
            />
          )}
        </Fragment>
      )}
    </PopupSection>
  );
};
