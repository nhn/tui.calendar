import { useEffect, useRef } from 'preact/hooks';

import { noop } from '@src/utils/noop';
import { requestTimeout } from '@src/utils/requestTimeout';

// Reference: https://medium.com/trabe/preventing-click-events-on-double-click-with-react-the-performant-way-1416ab03b835
export function useClickPrevention({
  onClick,
  onDblClick,
  delay = 300,
}: {
  onClick: (e: MouseEvent) => void;
  onDblClick: (e: MouseEvent) => void;
  delay?: number;
}) {
  const cancelCallback = useRef<Function>(noop);
  const registerCancel = (fn: Function) => {
    cancelCallback.current = fn;
  };
  const cancelScheduledWork = () => {
    cancelCallback.current();
  };

  // Cancels the current scheduled work before the "unmount"
  useEffect(() => cancelScheduledWork, []);

  const handleClick = (e: MouseEvent) => {
    cancelScheduledWork();
    requestTimeout(onClick.bind(null, e), delay, registerCancel);
  };

  const handleDblClick = (e: MouseEvent) => {
    cancelScheduledWork();
    onDblClick(e);
  };

  return [handleClick, handleDblClick];
}
