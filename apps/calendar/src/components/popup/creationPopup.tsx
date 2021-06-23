import { FunctionComponent, h } from 'preact';

import CloseButton from '@src/components/popup/closeButton';
import { toFormat } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';

import { CreationPopupParam } from '@t/store';

const CreationPopup: FunctionComponent<CreationPopupParam> = ({
  start,
  end,
  isAllDay = false,
  close,
}) => {
  // @TODO: creation popup
  return (
    <div className={cls('popup-container')}>
      <CloseButton close={close} />
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

export default CreationPopup;
