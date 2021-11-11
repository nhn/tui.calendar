import { FunctionComponent, h } from 'preact';

import { ClosePopupButton } from '@src/components/popup/closePopupButton';
import { cls } from '@src/helpers/css';
import { toFormat } from '@src/time/datetime';

import { EventFormPopupParam } from '@t/store';

export const EventFormPopup: FunctionComponent<EventFormPopupParam> = ({
  start,
  end,
  isAllDay = false,
  close,
}) => {
  // @TODO: form popup
  return (
    <div className={cls('popup-container')}>
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
