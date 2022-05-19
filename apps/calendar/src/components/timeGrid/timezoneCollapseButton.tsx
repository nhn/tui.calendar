import { h } from 'preact';

import { addTimeGridPrefix } from '@src/components/timeGrid';
import { cls } from '@src/helpers/css';

export function TimezoneCollapseButton({ isCollapsed }: { isCollapsed: boolean }) {
  const iconClassName = cls('icon', {
    'ic-arrow-right': isCollapsed,
    'ic-arrow-left': !isCollapsed,
  });

  return (
    <button
      className={cls(addTimeGridPrefix('timezone-collapse-button'))}
      aria-expanded={!isCollapsed}
    >
      <span className={iconClassName} role="img" />
    </button>
  );
}
