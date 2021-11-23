import { FunctionComponent, h } from 'preact';

import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';

export const LocationInputBox: FunctionComponent = () => {
  return (
    <PopupSection>
      <div className={cls('popup-section-item', 'popup-section-location')}>
        <span className={cls('icon', 'ic-location')} />
        <input className={cls('content')} placeholder="Location" />
      </div>
    </PopupSection>
  );
};
