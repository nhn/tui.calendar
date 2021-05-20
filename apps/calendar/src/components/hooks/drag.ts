import { noop } from '@src/util';
import { isKey, ESCAPE } from '@src/util/keycode';

export type MouseEventListener = (e: MouseEvent) => void;

export interface DragListeners {
  onDragStart?: MouseEventListener;
  onDrag?: MouseEventListener;
  onDragEnd?: MouseEventListener;
  onClick?: MouseEventListener;
  onCancel?: () => void;
}

export const DISTANCE = 10;

export function useDrag({
  onDragStart = noop,
  onDrag = noop,
  onDragEnd = noop,
  onClick = noop,
  onCancel = noop,
}: DragListeners) {
  let onMouseMove: MouseEventListener;
  let onMouseUp: MouseEventListener;
  let onKeydownESC: (e: KeyboardEvent) => void;

  let distance = 0;
  let isMoved = false;
  let isDragStartFired = false;

  const clearData = () => {
    distance = 0;
    isDragStartFired = false;
    isMoved = false;
  };
  const toggleListeners = (on: boolean) => {
    if (on) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('keyup', onKeydownESC);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('keydown', onKeydownESC);
    }
  };

  const onMouseDown = (e: MouseEvent) => {
    // only primary button can start drag. 0 is primary button value.
    if (e.button !== 0) {
      return;
    }

    clearData();
    toggleListeners(true);
  };

  onMouseMove = (e: MouseEvent) => {
    // prevent automatic scrolling.
    e.preventDefault();

    if (distance < DISTANCE) {
      distance += 1;

      return;
    }

    if (!isMoved) {
      isMoved = true;
    }

    if (!isDragStartFired) {
      isDragStartFired = true;
      onDragStart(e);

      return;
    }

    onDrag(e);
  };

  onMouseUp = (e: MouseEvent) => {
    if (isMoved) {
      onDragEnd(e);
    } else {
      onClick(e);
    }

    clearData();
    toggleListeners(false);
  };

  onKeydownESC = (e: KeyboardEvent) => {
    if (isKey(e, ESCAPE)) {
      if (isDragStartFired) {
        onCancel();
      }

      clearData();
      toggleListeners(false);
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onKeydown: onKeydownESC,
  };
}
