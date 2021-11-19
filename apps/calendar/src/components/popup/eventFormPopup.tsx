import { FunctionComponent, h } from 'preact';

import { ClosePopupButton } from '@src/components/popup/closePopupButton';
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
      <ClosePopupButton close={close} />
      <div>
        {toFormat(start, 'YYYY-MM-DD')} ~ {toFormat(end, 'YYYY-MM-DD')}{' '}
        <label>
          <input type="checkbox" checked={isAllDay} />
          All day
        </label>
      </div>
    </div>
  );
};
