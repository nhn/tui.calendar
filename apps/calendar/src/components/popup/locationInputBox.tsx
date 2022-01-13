import { h } from 'preact';

import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';

interface Props {
  location: string;
}

const classNames = {
  popupSectionItem: cls('popup-section-item', 'popup-section-location'),
  locationIcon: cls('icon', 'ic-location'),
  content: cls('content'),
};

export function LocationInputBox({ location }: Props) {
  return (
    <PopupSection>
      <div className={classNames.popupSectionItem}>
        <span className={classNames.locationIcon} />
        <input
          name="location"
          className={classNames.content}
          placeholder="Location"
          value={location}
        />
      </div>
    </PopupSection>
  );
}
