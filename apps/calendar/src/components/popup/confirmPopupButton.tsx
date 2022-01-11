import { FunctionComponent, h } from 'preact';

import { cls } from '@src/helpers/css';

interface Props {
  isCreationPopup: boolean;
}

const classNames = {
  confirmButton: cls('popup-button', 'popup-confirm'),
};

export const ConfirmPopupButton: FunctionComponent<Props> = ({ isCreationPopup }) => {
  const buttonType = isCreationPopup ? 'Save' : 'Update';

  return (
    <button type="submit" className={classNames.confirmButton}>
      <span>{buttonType}</span>
    </button>
  );
};
