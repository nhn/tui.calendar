import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { DraggingState } from '@src/slices/dnd';
import { isEscapePressed } from '@src/utils/keyboard';
import { noop } from '@src/utils/noop';

import { DraggingTypes } from '@t/drag';
import { CalendarState } from '@t/store';

export interface DragListeners {
  onDragStart?: MouseEventListener;
  onDrag?: MouseEventListener;
  onDragEnd?: MouseEventListener;
  onPressESCKey?: KeyboardEventListener;
}

function isLeftClick(buttonNum: number) {
  return buttonNum === 0;
}

function isDraggingSelector(state: CalendarState) {
  return state.dnd.draggingState > DraggingState.INIT;
}

export function useDrag(
  draggingItemType: DraggingTypes,
  { onDragStart = noop, onDrag = noop, onDragEnd = noop, onPressESCKey = noop }: DragListeners = {}
) {
  const { initDrag, setDraggingState, reset } = useDispatch('dnd');

  const isDragging = useStore(isDraggingSelector);
  const [isStarted, setStarted] = useState(false);

  const onMouseMoveRef = useRef<MouseEventListener | null>(null);
  const onMouseUpRef = useRef<MouseEventListener | null>(null);
  const onKeyDownRef = useRef<KeyboardEventListener | null>(null);

  const onMouseDown = useCallback<MouseEventListener>(
    (e) => {
      if (!isLeftClick(e.button)) {
        return;
      }

      if (e.currentTarget) {
        (e.currentTarget as HTMLElement).ondragstart = function () {
          return false;
        };
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
      if (isStarted) {
        onDragEnd(e);
        setStarted(false);
      }
    },
    [isStarted, onDragEnd]
  );

  const onKeydown = useCallback<KeyboardEventListener>(
    (e) => {
      if (isEscapePressed(e)) {
        onPressESCKey(e);
        setStarted(false);
      }
    },
    [onPressESCKey]
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
