import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import { KEY } from '@src/constants/keyboard';
import { MINIMUM_DRAG_MOUSE_DISTANCE } from '@src/constants/mouse';
import { useDispatch, useInternalStore } from '@src/contexts/calendarStore';
import { DraggingState } from '@src/slices/dnd';
import { isKeyPressed } from '@src/utils/keyboard';
import { noop } from '@src/utils/noop';
import { isPresent } from '@src/utils/type';

import { DraggingTypes } from '@t/drag';

export interface DragListeners {
  // when press the mouse button
  onInit?: MouseEventListener;
  // when the mouse moving is recognized as a drag
  onDragStart?: MouseEventListener;
  // while dragging
  onDrag?: MouseEventListener;
  // when the mouse button is released while dragging or just after onInit
  onMouseUp?: MouseEventListener;
  // when press the escape key while dragging
  onPressESCKey?: KeyboardEventListener;
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
  const { initDrag, setDraggingState, reset } = useDispatch('dnd');

  // Transient Updates for better performance
  // Reference: https://github.com/pmndrs/zustand#transient-updates-for-often-occuring-state-changes
  const store = useInternalStore();
  const dndSliceRef = useRef(store.getState().dnd);
  useEffect(
    () =>
      store.subscribe((state) => {
        dndSliceRef.current = state.dnd;
      }),
    [store]
  );

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
      onInit?.(e);
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
        onDragStart?.(e);
        setDraggingState({ x: e.clientX, y: e.clientY });

        return;
      }

      setDraggingState({ x: e.clientX, y: e.clientY });
      onDrag?.(e);
    },
    [draggingItemType, onDrag, onDragStart, setDraggingState]
  );

  const handleMouseUp = useCallback<MouseEventListener>(
    (e) => {
      e.stopPropagation();

      if (isStarted) {
        onMouseUp?.(e);
        setStarted(false);
      }
    },
    [isStarted, onMouseUp]
  );

  const handleKeyDown = useCallback<KeyboardEventListener>(
    (e) => {
      if (isKeyPressed(e, KEY.ESCAPE)) {
        onPressESCKey?.(e);
        setStarted(false);
      }
    },
    [onPressESCKey]
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
        reset();
        document.removeEventListener('mousemove', wrappedHandleMouseMove);
        document.removeEventListener('mouseup', wrappedHandleMouseUp);
        document.removeEventListener('keydown', wrappedHandleKeyDown);
      };
    }

    return noop;
  }, [isStarted, reset]);

  return handleMouseDown;
}
