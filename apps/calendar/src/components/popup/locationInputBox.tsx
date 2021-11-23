import { FunctionComponent, h } from 'preact';

import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';

const classNames = {
  popupSectionItem: cls('popup-section-item', 'popup-section-location'),
  locationIcon: cls('icon', 'ic-location'),
  content: cls('content'),
};

export const LocationInputBox: FunctionComponent = () => {
  return (
    <PopupSection>
      <div className={classNames.popupSectionItem}>
        <span className={classNames.locationIcon} />
        <input className={classNames.content} placeholder="Location" />
      </div>
    </PopupSection>
  );
};
