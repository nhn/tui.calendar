import { h } from 'preact';

import { addTimeGridPrefix } from '@src/components/timeGrid';
import { useEventBus } from '@src/contexts/eventBus';
import { cls } from '@src/helpers/css';

export function TimezoneCollapseButton({ isCollapsed }: { isCollapsed: boolean }) {
  const eventBus = useEventBus();

  const iconClassName = cls('icon', {
    'ic-arrow-right': isCollapsed,
    'ic-arrow-left': !isCollapsed,
  });

  return (
    <button
      className={cls(addTimeGridPrefix('timezone-collapse-button'))}
      aria-expanded={!isCollapsed}
      onClick={() => eventBus.fire('clickTimezonesCollapseBtn', isCollapsed)}
    >
      <span className={iconClassName} role="img" />
    </button>
  );
}
