import { FunctionComponent, h } from 'preact';

import { cls } from '@src/helpers/css';
import { noop } from '@src/utils/noop';

interface Props {
  classNames?: string[];
  onClick?: () => void;
}

export const PopupSection: FunctionComponent<Props> = ({
  children,
  classNames = [],
  onClick = noop,
}) => (
  <div className={cls('popup-section', ...classNames)} onClick={onClick}>
    {children}
  </div>
);
