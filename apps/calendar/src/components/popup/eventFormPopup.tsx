import { FunctionComponent, h } from 'preact';

import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import { ConfirmPopupButton } from '@src/components/popup/confirmPopupButton';
import { cls } from '@src/helpers/css';
import { toFormat } from '@src/time/datetime';

import { EventFormPopupParam } from '@t/store';

const PopupSection: FunctionComponent = ({ children }) => (
  <div className={cls('popup-section')}>{children}</div>
);

const CalendarSelector: FunctionComponent = () => (
  <PopupSection>
    <div>{'캘린더 선택 드롭다운'}</div>
  </PopupSection>
);

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

const EventState: FunctionComponent = () => (
  <PopupSection>
    <div>{'이벤트 상태 선택 드롭다운'}</div>
  </PopupSection>
);

export const EventFormPopup: FunctionComponent<EventFormPopupParam> = ({
  start,
  end,
  isAllDay = false,
  close,
}) => {
  // @TODO: form popup
  return (
    <div className={cls('popup-container')}>
      <CalendarSelector />
      <TitleInputBox />
      <LocationInputBox />
      <DatePicker />
      <EventState />
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
