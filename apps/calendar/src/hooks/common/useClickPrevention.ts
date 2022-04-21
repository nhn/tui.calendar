import { useEffect, useRef } from 'preact/hooks';

import { noop } from '@src/utils/noop';
import { requestTimeout } from '@src/utils/requestTimeout';

// Reference: https://medium.com/trabe/preventing-click-events-on-double-click-with-react-the-performant-way-1416ab03b835
export function useClickPrevention({
  onClick,
  onDblClick,
  delay = 300,
}: {
  onClick: Function;
  onDblClick: Function;
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

  const handleClick = (...arg: any) => {
    cancelScheduledWork();
    requestTimeout(onClick.bind(null, ...arg), delay, registerCancel);
  };

  const handleDblClick = (...arg: any) => {
    cancelScheduledWork();
    onDblClick(...arg);
  };

  return [handleClick, handleDblClick];
}
