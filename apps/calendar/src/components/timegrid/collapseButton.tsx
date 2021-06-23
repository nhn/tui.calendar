import { FunctionComponent, h } from 'preact';
import { useCallback } from 'preact/hooks';

import { addTimeGridPrefix } from '@src/components/timegrid';
import { noop } from '@src/util';
import { classnames, cls } from '@src/util/cssHelper';

interface Props {
  collapsed: boolean;
  onClick?: (collapsed: boolean) => void;
}

export const CollapseButton: FunctionComponent<Props> = ({ collapsed = false, onClick = noop }) => {
  const iconClassName = classnames(cls('icon'), {
    [cls('ic-arrow-right')]: collapsed,
    [cls('ic-arrow-left')]: !collapsed,
  });
  const memoizedOnClick = useCallback(() => onClick(collapsed), [collapsed, onClick]);

  return (
    <div className={addTimeGridPrefix('collapse-button')} onClick={memoizedOnClick}>
      <span className={iconClassName} />
    </div>
  );
};
