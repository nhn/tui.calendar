import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import { useDispatch } from '@src/contexts/calendarStore';
import { isEscapePressed } from '@src/utils/keyboard';
import { noop } from '@src/utils/noop';

export interface DragListeners {
  onDragStart?: MouseEventListener;
  onDrag?: MouseEventListener;
  onDragEnd?: MouseEventListener;
  onPressESCKey?: KeyboardEventListener;
}

function isLeftClick(buttonNum: number) {
  return buttonNum === 0;
}

export const MINIMUM_MOVE_DISTANCE = 3;

export function useDrag(
  draggingItemType: string,
  { onDragStart = noop, onDrag = noop, onDragEnd = noop, onPressESCKey = noop }: DragListeners = {}
) {
  const { initDrag, setDraggingState, endDrag, reset } = useDispatch('dnd');

  const [isStarted, setStarted] = useState(false);
  const [isDragging, setDragging] = useState(false);
  const movedDistanceRef = useRef(0);

  const onMouseMoveRef = useRef<MouseEventListener | null>(null);
  const onMouseUpRef = useRef<MouseEventListener | null>(null);
  const onKeyDownRef = useRef<KeyboardEventListener | null>(null);

  const resetInternalState = useCallback(() => {
    movedDistanceRef.current = 0;
    setStarted(false);
    setDragging(false);
  }, []);

  const onMouseDown = useCallback<MouseEventListener>(
    (e) => {
      if (!isLeftClick(e.button)) {
        return;
      }

      resetInternalState();
      setStarted(true);
    },
    [resetInternalState]
  );

  const onMouseMove = useCallback<MouseEventListener>(
    (e) => {
      // prevent text selection on dragging
      e.preventDefault();

      if (movedDistanceRef.current < MINIMUM_MOVE_DISTANCE) {
        movedDistanceRef.current += 1;

        return;
      }

      if (!isDragging) {
        setDragging(true);
        initDrag({
          draggingItemType,
          initX: e.clientX,
          initY: e.clientY,
        });
        onDragStart(e);

        return;
      }

      setDraggingState({ draggingItemType, x: e.clientX, y: e.clientY });
      onDrag(e);
    },
    [draggingItemType, isDragging, onDrag, onDragStart, setDraggingState, initDrag]
  );

  const onMouseUp = useCallback<MouseEventListener>(
    (e) => {
      if (isDragging) {
        endDrag();
        onDragEnd(e);
      }

      resetInternalState();
    },
    [endDrag, isDragging, onDragEnd, resetInternalState]
  );

  const onKeydown = useCallback<KeyboardEventListener>(
    (e) => {
      if (isEscapePressed(e)) {
        onPressESCKey(e);
        resetInternalState();
        reset();
      }
    },
    [onPressESCKey, resetInternalState, reset]
  );

  useEffect(() => {
    onMouseMoveRef.current = onMouseMove;
    onMouseUpRef.current = onMouseUp;
    onKeyDownRef.current = onKeydown;
  }, [onKeydown, onMouseMove, onMouseUp]);

  useEffect(() => {
    const handleMouseMove: MouseEventListener = (e) => onMouseMoveRef.current?.(e);
    const handleMouseUp: MouseEventListener = (e) => onMouseUpRef.current?.(e);
    const handleKeydown: KeyboardEventListener = (e) => onKeyDownRef.current?.(e);

    if (isStarted) {
      reset();
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('keydown', handleKeydown);

      return () => {
        reset();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('keydown', handleKeydown);
      };
    }

    return noop;
  }, [isStarted, reset]);

  return {
    isDragging,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onKeydown,
  };
}
