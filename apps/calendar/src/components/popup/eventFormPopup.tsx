import { Fragment, FunctionComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import DatePicker from 'tui-date-picker';

import { CalendarDropdownMenu } from '@src/components/popup/calendarDropdownMenu';
import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import { ConfirmPopupButton } from '@src/components/popup/confirmPopupButton';
import { StateDropdownMenu } from '@src/components/popup/stateDropdownMenu';
import { useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import TZDate from '@src/time/date';
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

const CalendarSelector: FunctionComponent<{ calendars: CalendarInfo[] }> = ({ calendars }) => {
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

const TitleInputBox: FunctionComponent = () => {
  const [isPrivate, setPrivate] = useState(false);

  return (
    <PopupSection>
      <div className={cls('popup-section-item', 'popup-section-title')}>
        <span className={cls('icon', 'ic-title')} />
        <input className={cls('content')} placeholder="Subject" />
      </div>
      <button
        className={cls('popup-section-item', 'popup-section-private', 'popup-button')}
        onClick={() => setPrivate((prev) => !prev)}
      >
        <span className={cls('icon', { 'ic-private': isPrivate, 'ic-public': !isPrivate })} />
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

const DateSelector: FunctionComponent<{ start: TZDate; end: TZDate; isAllday: boolean }> = ({
  start,
  end,
  isAllday: initialIsAllday,
}) => {
  const [isAllday, setAllday] = useState(initialIsAllday);
  const startPickerContainerRef = useRef<HTMLDivElement>(null);
  const startPickerInputRef = useRef<HTMLInputElement>(null);
  const endPickerContainerRef = useRef<HTMLDivElement>(null);
  const endPickerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      startPickerContainerRef.current &&
      startPickerInputRef.current &&
      endPickerContainerRef.current &&
      endPickerInputRef.current
    ) {
      DatePicker.createRangePicker({
        startpicker: {
          date: start.toDate(),
          input: startPickerInputRef.current,
          container: startPickerContainerRef.current,
        },
        endpicker: {
          date: end.toDate(),
          input: endPickerInputRef.current,
          container: endPickerContainerRef.current,
        },
        format: isAllday ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm',
        timePicker: isAllday
          ? false
          : {
              showMeridiem: false,
              usageStatistics: false,
            },
        usageStatistics: false,
      });
    }
  }, [start, end, isAllday]);

  return (
    <PopupSection>
      <div className={cls('popup-section-item', 'popup-start-date-picker')}>
        <span className={cls('icon', 'ic-date')} />
        <input className={cls('content')} placeholder="Start date" ref={startPickerInputRef} />
        <div className={cls('startpicker-container')} ref={startPickerContainerRef} />
      </div>
      <span className={cls('popup-date-dash')}>-</span>
      <div className={cls('popup-section-item', 'popup-end-date-picker')}>
        <span className={cls('icon', 'ic-date')} />
        <input className={cls('content')} placeholder="End date" ref={endPickerInputRef} />
        <div className={cls('endpicker-container')} ref={endPickerContainerRef} />
      </div>
      <div
        className={cls('popup-section-item', 'popup-section-allday')}
        onClick={() => setAllday((prev) => !prev)}
      >
        <span
          className={cls('icon', {
            'ic-checkbox-normal': !isAllday,
            'ic-checkbox-checked': isAllday,
          })}
        />
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
  isAllday = false,
  close,
}) => {
  const { calendars } = useStore((state) => state.calendar);

  return (
    <div className={cls('popup-container')}>
      <CalendarSelector calendars={calendars} />
      <TitleInputBox />
      <LocationInputBox />
      <DateSelector start={start} end={end} isAllday={isAllday} />
      <EventStateSelector />
      <ClosePopupButton close={close} />
      <PopupSection>
        <ConfirmPopupButton />
      </PopupSection>
    </div>
  );
};
