import { h } from 'preact';
import type { ChangeEventHandler } from 'preact/compat';

import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';
import type { FormStateDispatcher } from '@src/hooks/popup/useFormState';
import { FormStateActionType } from '@src/hooks/popup/useFormState';
import { useStringOnlyTemplate } from '@src/hooks/template/useStringOnlyTemplate';

interface Props {
  location?: string;
  formStateDispatch: FormStateDispatcher;
}

const classNames = {
  popupSectionItem: cls('popup-section-item', 'popup-section-location'),
  locationIcon: cls('icon', 'ic-location'),
  content: cls('content'),
};

export function LocationInputBox({ location, formStateDispatch }: Props) {
  const locationPlaceholder = useStringOnlyTemplate({
    template: 'locationPlaceholder',
    defaultValue: 'Location',
  });

  const handleLocationChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    formStateDispatch({ type: FormStateActionType.setLocation, location: e.currentTarget.value });
  };

  return (
    <PopupSection>
      <div className={classNames.popupSectionItem}>
        <span className={classNames.locationIcon} />
        <input
          name="location"
          className={classNames.content}
          placeholder={locationPlaceholder}
          value={location}
          onChange={handleLocationChange}
        />
      </div>
    </PopupSection>
  );
}
