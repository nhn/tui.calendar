import { noop } from '@src/utils/noop';

// Reference: https://medium.com/trabe/preventing-click-events-on-double-click-with-react-the-performant-way-1416ab03b835
export function requestTimeout(fn: Function, delay: number, registerCancel: Function) {
  let start: DOMHighResTimeStamp;

  const loop = (timestamp: DOMHighResTimeStamp) => {
    if (!start) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    if (elapsed >= delay) {
      fn();
      registerCancel(noop);

      return;
    }

    const raf = requestAnimationFrame(loop);
    registerCancel(() => cancelAnimationFrame(raf));
  };

  const raf = requestAnimationFrame(loop);
  registerCancel(() => cancelAnimationFrame(raf));
}
