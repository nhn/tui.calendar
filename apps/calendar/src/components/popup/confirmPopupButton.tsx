import { h } from 'preact';

import { cls } from '@src/helpers/css';

import type { PropsWithChildren } from '@t/components/common';

const classNames = {
  confirmButton: cls('popup-button', 'popup-confirm'),
};

export function ConfirmPopupButton({ children }: PropsWithChildren) {
  return (
    <button type="submit" className={classNames.confirmButton}>
      <span>{children}</span>
    </button>
  );
}
