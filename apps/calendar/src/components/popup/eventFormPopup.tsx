import { Fragment, FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { CalendarDropdownMenu } from '@src/components/popup/calendarDropdownMenu';
import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import { ConfirmPopupButton } from '@src/components/popup/confirmPopupButton';
import { StateDropdownMenu } from '@src/components/popup/stateDropdownMenu';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { toFormat } from '@src/time/datetime';
import { noop } from '@src/utils/noop';

import { EventState } from '@t/events';
import { CalendarInfo } from '@t/option';
import { EventFormPopupParam } from '@t/store';

const PopupSection: FunctionComponent<{ classNames?: string[]; onClick?: () => void }> = ({
  children,
  classNames = [],
  onClick = noop,
}) => (
  <div className={cls('popup-section', ...classNames)} onClick={onClick}>
    {children}
  </div>
);

const CalendarSelector: FunctionComponent<{ calendars: CalendarInfo[]; calendarId?: string }> = ({
  calendars,
  calendarId,
}) => {
  const [isOpened, setOpened] = useState(false);
  const onClick = () => setOpened(!isOpened);
  const index = calendars.findIndex(({ id }) => id === calendarId);

  return (
    <PopupSection onClick={onClick} classNames={['dropdown-section', 'calendar-section']}>
      {index !== -1 && calendars.length && (
        <Fragment>
          <button className={cls('popup-section-item', 'popup-button')}>
            <span className={cls('icon', 'dot')} style={{ backgroundColor: 'rgb(158, 95, 255)' }} />
            <span className={cls('content', 'event-calendar')}>My Calendar</span>
            <span className={cls('icon', 'ic-dropdown-arrow')} />
          </button>
          <CalendarDropdownMenu menus={['menu1', 'menu2']} open={isOpened} calendars={calendars} />
        </Fragment>
      )}
    </PopupSection>
  );
};

const TitleInputBox: FunctionComponent = () => {
  return (
    <PopupSection>
      <div className={cls('popup-section-item', 'popup-section-title')}>
        <span className={cls('icon', 'ic-title')} />
        <input className={cls('content')} placeholder="Subject" />
      </div>
      <button className={cls('popup-section-item', 'popup-section-private', 'popup-button')}>
        <span className={cls('icon', 'ic-private')} />
      </button>
    </PopupSection>
  );
};

const LocationInputBox: FunctionComponent = () => {
  return (
    <PopupSection>
      <div className={cls('popup-section-item', 'popup-section-location')}>
        <span className={cls('icon', 'ic-location')} />
        <input className={cls('content')} placeholder="Location" />
      </div>
    </PopupSection>
  );
};

const DatePicker: FunctionComponent = () => {
  return (
    <PopupSection>
      <div className={cls('popup-section-item', 'popup-start-date-picker')}>
        <span className={cls('icon', 'ic-date')} />
        <input className={cls('content')} placeholder="Start date" />
      </div>
      <span className={cls('popup-date-dash')}>-</span>
      <div className={cls('popup-section-item', 'popup-end-date-picker')}>
        <span className={cls('icon', 'ic-date')} />
        <input className={cls('content')} placeholder="End date" />
      </div>
      <div className={cls('popup-section-item', 'popup-section-allday')}>
        <span className={cls('icon', 'ic-checkbox-normal')} />
        <span className={cls('content')}>All day</span>
      </div>
    </PopupSection>
  );
};

const EventStateSelector: FunctionComponent = () => {
  const [isOpened, setOpened] = useState(false);
  const [eventState, setEventState] = useState<EventState>('Busy');
  const onClick = () => setOpened(!isOpened);

  return (
    <PopupSection onClick={onClick} classNames={['dropdown-section', 'state-section']}>
      <button className={cls('popup-section-item', 'popup-button')}>
        <span className={cls('icon', 'ic-state')} />
        <span className={cls('content', 'event-state')}>{eventState}</span>
        <span className={cls('icon', 'ic-dropdown-arrow')} />
      </button>
      {isOpened && <StateDropdownMenu setOpened={setOpened} setEventState={setEventState} />}
    </PopupSection>
  );
};

export const EventFormPopup: FunctionComponent<EventFormPopupParam> = ({
  start,
  end,
  isAllDay = false,
  close,
}) => {
  // @TODO: form popup
  const { calendars } = useStore((state) => state.calendar);

  return (
    <div className={cls('popup-container')}>
      <CalendarSelector calendars={calendars} />
      <TitleInputBox />
      <LocationInputBox />
      <DatePicker />
      <EventStateSelector />
      <ClosePopupButton close={close} />
      <PopupSection>
        <ConfirmPopupButton />
      </PopupSection>
      {/* <div>*/}
      {/*  {toFormat(start, 'YYYY-MM-DD')} ~ {toFormat(end, 'YYYY-MM-DD')}{' '}*/}
      {/*  <label>*/}
      {/*    <input type="checkbox" checked={isAllDay} />*/}
      {/*    All day*/}
      {/*  </label>*/}
      {/* </div>*/}
    </div>
  );
};
