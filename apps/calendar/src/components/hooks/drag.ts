import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import { noop } from '@src/util';
import { ESCAPE, isKey } from '@src/util/keycode';

export type MouseEventListener = (e: MouseEvent) => void;
type KeyboardEventListener = (e: KeyboardEvent) => void;

export interface DragListeners {
  onDragStart?: MouseEventListener;
  onDrag?: MouseEventListener;
  onDragEnd?: MouseEventListener;
  onClick?: MouseEventListener;
  onCancel?: () => void;
}

function isLeftClick(buttonNum: number) {
  return buttonNum === 0;
}

export const MINIMUM_MOVE_DETECTION_DISTANCE = 3;

export function useDrag({
  onDragStart = noop,
  onDrag = noop,
  onDragEnd = noop,
  onClick = noop,
  onCancel = noop,
}: DragListeners) {
  const [isStarted, setStarted] = useState(false);
  const movedDistanceRef = useRef(0);
  const isDraggingRef = useRef(false);

  const onMouseMoveRef = useRef<MouseEventListener | null>(null);
  const onMouseUpRef = useRef<MouseEventListener | null>(null);
  const onKeyDownRef = useRef<KeyboardEventListener | null>(null);

  const resetState = useCallback(() => {
    movedDistanceRef.current = 0;
    isDraggingRef.current = false;
    setStarted(false);
  }, []);

  const onMouseDown = useCallback<MouseEventListener>(
    (e) => {
      if (!isLeftClick(e.button)) {
        return;
      }

      resetState();
      setStarted(true);
    },
    [resetState]
  );

  const onMouseMove = useCallback<MouseEventListener>(
    (e) => {
      // prevent automatic scrolling.
      e.preventDefault();

      if (movedDistanceRef.current < MINIMUM_MOVE_DETECTION_DISTANCE) {
        movedDistanceRef.current += 1;

        return;
      }

      if (!isDraggingRef.current) {
        isDraggingRef.current = true;
        onDragStart(e);

        return;
      }

      onDrag(e);
    },
    [onDrag, onDragStart]
  );

  const onMouseUp = useCallback<MouseEventListener>(
    (e) => {
      if (isDraggingRef.current) {
        onDragEnd(e);
      } else {
        onClick(e);
      }

      resetState();
    },
    [onClick, onDragEnd, resetState]
  );

  const onKeydownESC = useCallback<KeyboardEventListener>(
    (e) => {
      if (isKey(e, ESCAPE)) {
        if (isDraggingRef.current) {
          onCancel();
        }

        resetState();
      }
    },
    [onCancel, resetState]
  );

  useEffect(() => {
    onMouseMoveRef.current = onMouseMove;
    onMouseUpRef.current = onMouseUp;
    onKeyDownRef.current = onKeydownESC;
  }, [onKeydownESC, onMouseMove, onMouseUp]);

  useEffect(() => {
    const handleMouseMove: MouseEventListener = (e) => onMouseMoveRef.current?.(e);
    const handleMouseUp: MouseEventListener = (e) => onMouseUpRef.current?.(e);
    const handleKeydown: KeyboardEventListener = (e) => onKeyDownRef.current?.(e);

    if (isStarted) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('keyup', handleKeydown);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('keydown', handleKeydown);
      };
    }

    return noop;
  }, [isStarted]);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onKeydown: onKeydownESC,
  };
}
