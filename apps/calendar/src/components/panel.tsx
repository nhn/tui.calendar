import { h, Component, Fragment, createRef, VNode } from 'preact';
import isString from 'tui-code-snippet/type/isString';
import isNumber from 'tui-code-snippet/type/isNumber';
import { cls } from '@src/util/cssHelper';
import { noop } from '@src/util';
import { PanelResizer } from '@src/components/panelResizer';
import { DragPositionInfo } from '@src/components/draggable';
import { Direction } from '@src/controller/layout';
import {
  PanelInfo,
  PanelRect,
  Size,
  panelInfoKeys,
  getElementRect,
  isPanelShown,
  getPanelStylesFromInfo,
} from '@src/controller/panel';
import { Milestone } from '@src/components/panel/milestone';

export interface Props extends PanelInfo {
  onResizeStart?: (panelName: string) => void;
  onResizeEnd?: (panelName: string, dragPositionInfo: DragPositionInfo) => void;
  onPanelRectUpdated?: (name: string, rect: PanelRect) => void;
}

type Child = VNode<any> | string | number;

const className = cls('panel');

export default class Panel extends Component<Props> {
  static defaultProps = {
    direction: Direction.COLUMN,
    onResizeStart: noop,
    onResizeEnd: noop,
  };

  panelRef = createRef();

  resizerRef = createRef();

  panelRect: PanelRect = { x: 0, y: 0, width: 0, height: 0, resizerWidth: 0, resizerHeight: 0 };

  resizerRect: Size = { width: 0, height: 0 };

  handlers = {
    onResizeStart: this.onResizeStart.bind(this),
    onResizeEnd: this.onResizeEnd.bind(this),
  };

  componentDidMount() {
    this.updateElementRect();
  }

  componentDidUpdate() {
    this.updateElementRect();
  }

  getResizerElementSize() {
    let width = 0;
    let height = 0;

    if (this.resizerRef.current) {
      const { direction } = this.props;
      const resizerRect = getElementRect(this.resizerRef.current.base);
      width += direction === Direction.COLUMN ? 0 : resizerRect.width;
      height += direction === Direction.ROW ? 0 : resizerRect.height;

      this.resizerRect = resizerRect;
    }

    return {
      width,
      height,
    };
  }

  updateElementRect() {
    if (!this.props.onPanelRectUpdated) {
      return;
    }

    const panelRect = getElementRect(this.panelRef.current);
    const { x, y, width, height } = panelRect;
    const { width: resizerWidth, height: resizerHeight } = this.getResizerElementSize();

    this.panelRect = {
      x,
      y,
      width,
      height,
      resizerWidth,
      resizerHeight,
    };

    this.props.onPanelRectUpdated(this.props.name, this.panelRect);
  }

  onResizeStart() {
    if (!this.props.onResizeStart) {
      return;
    }

    this.props.onResizeStart(this.props.name);
  }

  onResizeEnd(resizeInfo: DragPositionInfo) {
    if (!this.props.onResizeEnd) {
      return;
    }

    this.props.onResizeEnd(this.props.name, resizeInfo);
  }

  getPanelResizer() {
    const { direction = Direction.COLUMN, resizerWidth, resizerHeight } = this.props;
    let width;
    let height;

    if (isNumber(resizerWidth)) {
      width = Math.max(resizerWidth, this.resizerRect.width);
    }

    if (isNumber(resizerHeight)) {
      height = Math.max(resizerHeight, this.resizerRect.height);
    }

    return (
      <PanelResizer
        ref={this.resizerRef}
        direction={direction}
        width={width}
        height={height}
        {...this.handlers}
      />
    );
  }

  render() {
    const { resizable, children } = this.props;
    const styles = getPanelStylesFromInfo(this.props);

    return (
      <Fragment>
        <div ref={this.panelRef} className={className} style={styles}>
          {children}
        </div>
        {resizable ? this.getPanelResizer() : null}
      </Fragment>
    );
  }
}

function isPanel(child: Child): child is VNode<PanelInfo> {
  if (isString(child) || isNumber(child)) {
    return false;
  }

  return child.type === Panel || child.type === Milestone;
}

function getPanelInfo(panel: VNode<PanelInfo>): PanelInfo {
  const { props } = panel;
  const panelInfo: any = {};

  panelInfoKeys.forEach((key) => {
    if (props) {
      panelInfo[key] = props[key];
    }
  });

  return panelInfo;
}

export function filterPanels(children: Child[] = []): VNode<PanelInfo>[] {
  return children.filter(isPanel).filter((child) => isPanelShown(child.props));
}

export function getPanelPropsList(panels: VNode<PanelInfo>[]) {
  return panels.map((panel) => getPanelInfo(panel));
}
