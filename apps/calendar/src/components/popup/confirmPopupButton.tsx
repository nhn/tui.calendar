import { FunctionComponent, h } from 'preact';

import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { isFunction } from '@src/utils/type';

interface Props {
  confirm?: () => void;
  isCreationPopup: boolean;
}

const classNames = {
  confirmButton: cls('popup-button', 'popup-confirm'),
};

export const ConfirmPopupButton: FunctionComponent<Props> = ({ confirm, isCreationPopup }) => {
  const { hide } = useDispatch('popup');

  const buttonType = isCreationPopup ? 'Save' : 'Update';

  const onClickHandler = () => {
    hide();

    if (isFunction(confirm)) {
      confirm();
    }
  };

  return (
    <button type="submit" className={classNames.confirmButton} onClick={onClickHandler}>
      <span>{buttonType}</span>
    </button>
  );
};
