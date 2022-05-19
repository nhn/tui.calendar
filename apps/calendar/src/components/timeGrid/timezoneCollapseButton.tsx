import { h } from 'preact';
import { useState } from 'preact/hooks';

import { addTimeGridPrefix } from '@src/components/timeGrid';
import { cls } from '@src/helpers/css';

export function TimezoneCollapseButton() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const iconClassName = cls('icon', {
    'ic-arrow-right': isCollapsed,
    'ic-arrow-left': !isCollapsed,
  });

  return (
    <button className={cls(addTimeGridPrefix('timezone-collapse-button'))}>
      <span className={iconClassName} />
    </button>
  );
}
