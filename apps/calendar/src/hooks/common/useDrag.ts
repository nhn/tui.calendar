import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import { KEY } from '@src/constants/keyboard';
import { MINIMUM_DRAG_MOUSE_DISTANCE } from '@src/constants/mouse';
import { useDispatch, useInternalStore } from '@src/contexts/calendarStore';
import { useTransientUpdate } from '@src/hooks/common/useTransientUpdate';
import { dndSelector } from '@src/selectors';
import type { DndSlice } from '@src/slices/dnd';
import { DraggingState } from '@src/slices/dnd';
import { isKeyPressed } from '@src/utils/keyboard';
import { noop } from '@src/utils/noop';
import { isPresent } from '@src/utils/type';

import type { DraggingTypes } from '@t/drag';
import type { KeyboardEventListener, MouseEventListener } from '@t/util';

type MouseListener = (e: MouseEvent, dndSlice: DndSlice['dnd']) => void;
type KeyboardListener = (e: KeyboardEvent, dndSlice: DndSlice['dnd']) => void;

export interface DragListeners {
  // when press the mouse button
  onInit?: MouseListener;
  // when the mouse moving is recognized as a drag
  onDragStart?: MouseListener;
  // while dragging
  onDrag?: MouseListener;
  // when the mouse button is released while dragging or just after onInit
  onMouseUp?: MouseListener;
  // when press the escape key while dragging
  onPressESCKey?: KeyboardListener;
}

function isLeftClick(buttonNum: number) {
  return buttonNum === 0;
}

function isMouseMoved(initX: number, initY: number, x: number, y: number) {
  return (
    Math.abs(initX - x) >= MINIMUM_DRAG_MOUSE_DISTANCE ||
    Math.abs(initY - y) >= MINIMUM_DRAG_MOUSE_DISTANCE
  );
}

export function useDrag(
  draggingItemType: DraggingTypes,
  { onInit, onDragStart, onDrag, onMouseUp, onPressESCKey }: DragListeners = {}
) {
  const { initDrag, setDragging, cancelDrag, reset } = useDispatch('dnd');

  const store = useInternalStore();
  const dndSliceRef = useRef(store.getState().dnd);
  useTransientUpdate(dndSelector, (dndState) => {
    dndSliceRef.current = dndState;
  });

  const [isStarted, setStarted] = useState(false);

  const handleMouseMoveRef = useRef<MouseEventListener | null>(null);
  const handleMouseUpRef = useRef<MouseEventListener | null>(null);
  const handleKeyDownRef = useRef<KeyboardEventListener | null>(null);

  const handleMouseDown = useCallback<MouseEventListener>(
    (e) => {
      if (!isLeftClick(e.button)) {
        return;
      }

      if (e.currentTarget) {
        (e.currentTarget as HTMLElement).ondragstart = function () {
          return false;
        };
      }

      // prevent text selection on dragging
      e.preventDefault();

      setStarted(true);
      initDrag({
        draggingItemType,
        initX: e.clientX,
        initY: e.clientY,
      });
      onInit?.(e, dndSliceRef.current);
    },
    [onInit, draggingItemType, initDrag]
  );

  const handleMouseMove = useCallback<MouseEventListener>(
    (e) => {
      const {
        initX,
        initY,
        draggingState,
        draggingItemType: currentDraggingItemType,
      } = dndSliceRef.current;

      if (currentDraggingItemType !== draggingItemType) {
        setStarted(false);
        reset();

        return;
      }

      if (
        isPresent(initX) &&
        isPresent(initY) &&
        !isMouseMoved(initX, initY, e.clientX, e.clientY)
      ) {
        return;
      }

      if (draggingState <= DraggingState.INIT) {
        setDragging({ x: e.clientX, y: e.clientY });
        onDragStart?.(e, dndSliceRef.current);

        return;
      }

      setDragging({ x: e.clientX, y: e.clientY });
      onDrag?.(e, dndSliceRef.current);
    },
    [draggingItemType, onDrag, onDragStart, setDragging, reset]
  );

  const handleMouseUp = useCallback<MouseEventListener>(
    (e) => {
      e.stopPropagation();

      if (isStarted) {
        onMouseUp?.(e, dndSliceRef.current);
        setStarted(false);
        reset();
      }
    },
    [isStarted, onMouseUp, reset]
  );

  const handleKeyDown = useCallback<KeyboardEventListener>(
    (e) => {
      if (isKeyPressed(e, KEY.ESCAPE)) {
        setStarted(false);
        cancelDrag();
        onPressESCKey?.(e, dndSliceRef.current);
      }
    },
    [onPressESCKey, cancelDrag]
  );

  useEffect(() => {
    handleMouseMoveRef.current = handleMouseMove;
    handleMouseUpRef.current = handleMouseUp;
    handleKeyDownRef.current = handleKeyDown;
  }, [handleKeyDown, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const wrappedHandleMouseMove: MouseEventListener = (e) => handleMouseMoveRef.current?.(e);
    const wrappedHandleMouseUp: MouseEventListener = (e) => handleMouseUpRef.current?.(e);
    const wrappedHandleKeyDown: KeyboardEventListener = (e) => handleKeyDownRef.current?.(e);

    if (isStarted) {
      document.addEventListener('mousemove', wrappedHandleMouseMove);
      document.addEventListener('mouseup', wrappedHandleMouseUp);
      document.addEventListener('keydown', wrappedHandleKeyDown);

      return () => {
        document.removeEventListener('mousemove', wrappedHandleMouseMove);
        document.removeEventListener('mouseup', wrappedHandleMouseUp);
        document.removeEventListener('keydown', wrappedHandleKeyDown);
      };
    }

    return noop;
  }, [isStarted, reset]);

  return handleMouseDown;
}
