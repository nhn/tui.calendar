/**
 * @fileoverview Drag handler for calendar.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import {
  cloneElement,
  Component,
  ComponentChild,
  Fragment,
  h,
  isValidElement,
  toChildArray,
  VNode,
} from 'preact';

import { Direction } from '@src/controller/layout';
import { getOffsetParentPos, getOffsetParentRect } from '@src/util/dom';
import { limit } from '@src/util/math';

const DISTANCE = 10;

type Styles = Record<string, string | number>;
export interface DragPositionInfo {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface Props {
  direction?: Direction;
  renderDragElement: () => VNode<any>;
  onDragStart?: () => void;
  onDrag?: () => void;
  onDragEnd?: (dragPositionInfo: DragPositionInfo) => void;
}

interface State {
  x: number;
  y: number;
  isMoved: boolean;
}

export class Draggable extends Component<Props, State> {
  state: State = {
    x: 0,
    y: 0,
    isMoved: false,
  };

  handlers = {
    onMouseDown: this.onMouseDown.bind(this),
    onMouseMove: this.onMouseMove.bind(this),
    onMouseUp: this.onMouseUp.bind(this),
  };

  /**
   * dragging distance in pixel between mousedown and firing dragStart events
   */
  distance = 0;

  startX = 0;

  startY = 0;

  minX = 0;

  minY = 0;

  maxX = 0;

  maxY = 0;

  dragStartFired = false;

  toggleDragEvent(toBind: boolean) {
    const { onMouseMove, onMouseUp } = this.handlers;

    if (toBind) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }

  clearData() {
    this.distance = 0;
    this.dragStartFired = false;

    this.setState({ isMoved: false });
  }

  onMouseDown(e: MouseEvent) {
    // only primary button can start drag. 0 is primary button value.
    if (e.button !== 0) {
      return;
    }

    const [startX, startY] = getOffsetParentPos(e);
    const rect = getOffsetParentRect(e);

    this.startX = startX;
    this.startY = startY;
    this.minX = 0;
    this.minY = 0;
    this.maxX = rect.width;
    this.maxY = rect.height;

    this.clearData();
    this.toggleDragEvent(true);
    this.updateDragPosition(e);
  }

  onMouseMove(e: MouseEvent) {
    // prevent automatic scrolling.
    e.preventDefault();

    if (this.distance < DISTANCE) {
      this.distance += 1;

      return;
    }

    if (!this.state.isMoved) {
      this.setState({ isMoved: true });
    }

    if (!this.dragStartFired) {
      this.dragStartFired = true;

      if (this.props.onDragStart) {
        this.props.onDragStart();
      }

      return;
    }

    this.updateDragPosition(e);

    if (this.props.onDrag) {
      this.props.onDrag();
    }
  }

  onMouseUp(e: MouseEvent) {
    if (this.state.isMoved && this.props.onDragEnd) {
      const { startX, startY, maxX, maxY } = this;
      const [endX, endY] = getOffsetParentPos(e);

      this.props.onDragEnd({
        startX,
        startY,
        endX: Math.min(endX, maxX),
        endY: Math.min(endY, maxY),
      });
    }
    this.clearData();
    this.toggleDragEvent(false);
  }

  updateDragPosition(e: MouseEvent) {
    const { direction } = this.props;
    const { minX, minY, maxX, maxY } = this;
    let [x, y] = getOffsetParentPos(e);

    x = limit(x, [minX], [maxX]);
    y = limit(y, [minY], [maxY]);

    if (direction === Direction.ROW) {
      this.setState({ x });
    } else if (direction === Direction.COLUMN) {
      this.setState({ y });
    } else {
      this.setState({ x, y });
    }
  }

  isDragStarted() {
    return this.state.isMoved;
  }

  makeDragElement(child: ComponentChild) {
    const { onMouseDown } = this.handlers;
    if (isValidElement(child)) {
      return cloneElement(child, { onMouseDown });
    }

    if (!child) {
      return null;
    }

    return <div onMouseDown={onMouseDown}>{child}</div>;
  }

  render() {
    const { children, renderDragElement } = this.props;

    const draggingStyles: Styles = {
      position: 'absolute',
    };

    if (this.isDragStarted()) {
      draggingStyles.left = this.state.x;
      draggingStyles.top = this.state.y;
    }

    const cloned = this.makeDragElement(toChildArray(children)[0]);
    let dragElement = this.isDragStarted() ? renderDragElement() : null;
    if (dragElement) {
      dragElement = cloneElement(dragElement, {
        style: {
          ...dragElement.props.style,
          ...draggingStyles,
        },
      });
    }

    return (
      <Fragment>
        {cloned}
        {dragElement || null}
      </Fragment>
    );
  }
}
