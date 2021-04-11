import { h, Fragment, VNode, FunctionComponent } from 'preact';
import { useRef, useEffect } from 'preact/hooks';

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

const Panel: FunctionComponent<Props> = (props) => {
  const {
    direction = Direction.COLUMN,
    onResizeStart = noop,
    onResizeEnd = noop,
    onPanelRectUpdated,
    name,
    resizerWidth,
    resizerHeight,
    resizable,
    children,
  } = props;

  let panelRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    resizerWidth: 0,
    resizerHeight: 0,
  };
  const panelRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  let resizerRect: Size = { width: 0, height: 0 };
  const getResizerElementSize = () => {
    let width = 0;
    let height = 0;

    if (resizerRef.current) {
      resizerRect = getElementRect(resizerRef.current.base);
      width += direction === Direction.COLUMN ? 0 : resizerRect.width;
      height += direction === Direction.ROW ? 0 : resizerRect.height;
    }

    return { width, height };
  };
  const getPanelResizer = () => {
    let width;
    let height;

    if (isNumber(resizerWidth)) {
      width = Math.max(resizerWidth, resizerRect.width);
    }

    if (isNumber(resizerHeight)) {
      height = Math.max(resizerHeight, resizerRect.height);
    }

    return (
      <PanelResizer
        ref={resizerRef}
        direction={direction}
        width={width}
        height={height}
        onResizeStart={() => onResizeStart(name)}
        onResizeEnd={(resizeInfo: DragPositionInfo) => onResizeEnd(name, resizeInfo)}
      />
    );
  };
  const updateElementRect = () => {
    if (!onPanelRectUpdated) {
      return;
    }

    const elementRect = getElementRect(panelRef.current);
    const { width, height } = getResizerElementSize();

    panelRect = {
      ...elementRect,
      resizerWidth: width,
      resizerHeight: height,
    };

    onPanelRectUpdated(name, panelRect);
  };

  useEffect(() => {
    updateElementRect();
  });

  const styles = getPanelStylesFromInfo(props);

  return (
    <Fragment>
      <div ref={panelRef} className={className} style={styles}>
        {children}
      </div>
      {resizable ? getPanelResizer() : null}
    </Fragment>
  );
};

export default Panel;

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
