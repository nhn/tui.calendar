import { FunctionComponent, h } from 'preact';

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

export const LocationInputBox: FunctionComponent<Props> = ({ location }) => (
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
