import { FunctionComponent, h } from 'preact';

import { cls } from '@src/helpers/css';

const classNames = {
  confirmButton: cls('popup-button', 'popup-confirm'),
};

export const ConfirmPopupButton: FunctionComponent = ({ children }) => (
  <button type="submit" className={classNames.confirmButton}>
    <span>{children}</span>
  </button>
);
