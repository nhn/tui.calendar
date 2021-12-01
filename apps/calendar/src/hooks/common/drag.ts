import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import { isEscapePressed } from '@src/utils/keyboard';
import { noop } from '@src/utils/noop';

import { DraggingTypes } from '@t/drag';

export interface DragListeners {
  onDragStart?: MouseEventListener;
  onDrag?: MouseEventListener;
  onDragEnd?: MouseEventListener;
  onPressESCKey?: KeyboardEventListener;
}

function isLeftClick(buttonNum: number) {
  return buttonNum === 0;
}

export function useDrag(
  draggingItemType: DraggingTypes,
  { onDragStart = noop, onDrag = noop, onDragEnd = noop, onPressESCKey = noop }: DragListeners = {}
) {
  const { initDrag, setDraggingState, endDrag, reset } = useDispatch('dnd');

  const { draggingState } = useStore(dndSelector);
  const isDragging = draggingState > DraggingState.INIT;
  const [isStarted, setStarted] = useState(false);

  const onMouseMoveRef = useRef<MouseEventListener | null>(null);
  const onMouseUpRef = useRef<MouseEventListener | null>(null);
  const onKeyDownRef = useRef<KeyboardEventListener | null>(null);

  const onMouseDown = useCallback<MouseEventListener>(
    (e) => {
      if (!isLeftClick(e.button)) {
        return;
      }

      setStarted(true);
      initDrag({
        draggingItemType,
        initX: e.clientX,
        initY: e.clientY,
      });
    },
    [draggingItemType, initDrag]
  );

  const onMouseMove = useCallback<MouseEventListener>(
    (e) => {
      // prevent text selection on dragging
      e.preventDefault();

      if (!isDragging) {
        onDragStart(e);
        setDraggingState({ x: e.clientX, y: e.clientY });

        return;
      }

      setDraggingState({ x: e.clientX, y: e.clientY });
      onDrag(e);
    },
    [isDragging, onDrag, onDragStart, setDraggingState]
  );

  const onMouseUp = useCallback<MouseEventListener>(
    (e) => {
      if (isDragging) {
        onDragEnd(e);
        endDrag();
        setStarted(false);
      }
    },
    [endDrag, isDragging, onDragEnd]
  );

  const onKeydown = useCallback<KeyboardEventListener>(
    (e) => {
      if (isEscapePressed(e)) {
        onPressESCKey(e);
        reset();
        setStarted(false);
      }
    },
    [onPressESCKey, reset]
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
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('keydown', handleKeydown);

      return () => {
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
