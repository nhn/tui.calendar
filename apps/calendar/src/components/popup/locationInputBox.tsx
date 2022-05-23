import { h } from 'preact';

import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';
import { useStringOnlyTemplate } from '@src/hooks/template/useStringOnlyTemplate';

interface Props {
  location: string;
}

const classNames = {
  popupSectionItem: cls('popup-section-item', 'popup-section-location'),
  locationIcon: cls('icon', 'ic-location'),
  content: cls('content'),
};

export function LocationInputBox({ location }: Props) {
  const locationPlaceholder = useStringOnlyTemplate({
    template: 'locationPlaceholder',
    defaultValue: 'Location',
  });

  return (
    <PopupSection>
      <div className={classNames.popupSectionItem}>
        <span className={classNames.locationIcon} />
        <input
          name="location"
          className={classNames.content}
          placeholder={locationPlaceholder}
          value={location}
        />
      </div>
    </PopupSection>
  );
}
