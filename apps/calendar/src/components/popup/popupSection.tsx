import { h } from 'preact';

import { cls } from '@src/helpers/css';
import { noop } from '@src/utils/noop';

import type { PropsWithChildren } from '@t/components/common';

interface Props {
  classNames?: string[];
  onClick?: () => void;
}

export function PopupSection({
  children,
  classNames = [],
  onClick = noop,
}: PropsWithChildren<Props>) {
  return (
    <div className={cls('popup-section', ...classNames)} onClick={onClick}>
      {children}
    </div>
  );
}
