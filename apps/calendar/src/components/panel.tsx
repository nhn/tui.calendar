import { Fragment, FunctionComponent, h, VNode } from 'preact';
import { useCallback, useContext, useEffect, useRef, useState } from 'preact/hooks';

import isString from 'tui-code-snippet/type/isString';
import isNumber from 'tui-code-snippet/type/isNumber';
import { cls } from '@src/util/cssHelper';
import { noop } from '@src/util';
import { PanelResizer } from '@src/components/panelResizer';
import { DragPositionInfo } from '@src/components/draggable';
import { Direction } from '@src/controller/layout';
import {
  getElementRect,
  getPanelStylesFromInfo,
  isPanelShown,
  PanelInfo,
  panelInfoKeys,
  PanelRect,
  Size,
} from '@src/controller/panel';
import { PanelStateStore, UPDATE_PANEL_HEIGHT } from '@src/components/layout';

export interface Props extends PanelInfo {
  onResizeStart?: (panelName: string) => void;
  onResizeEnd?: (panelName: string, dragPositionInfo: DragPositionInfo) => void;
  onPanelRectUpdated?: (name: string, rect: PanelRect) => void;
}

type Child = VNode<any> | string | number;

const defaultPanelHeight = 18;

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

  const panelRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const [resizerRect, setResizerRect] = useState<Size>({ width: 0, height: 0 });
  const { state, dispatch } = useContext(PanelStateStore);

  const panelResizeEnd = (resizeInfo: DragPositionInfo) => {
    onResizeEnd(name, resizeInfo);
    dispatch({
      type: UPDATE_PANEL_HEIGHT,
      panelType: name,
      state: {
        panelHeight: getElementRect(panelRef.current).height + resizeInfo.endY - resizeInfo.startY,
      },
    });
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
        onResizeEnd={panelResizeEnd}
      />
    );
  };

  const updateElementRect = useCallback(() => {
    if (!onPanelRectUpdated) {
      return;
    }

    const getResizerElementSize = () => {
      let width = 0;
      let height = 0;

      if (resizerRef.current) {
        setResizerRect(getElementRect(resizerRef.current.base));
        width += direction === Direction.COLUMN ? 0 : resizerRect.width;
        height += direction === Direction.ROW ? 0 : resizerRect.height;
      }

      return { width, height };
    };

    const elementRect = getElementRect(panelRef.current);
    const { width, height } = getResizerElementSize();

    onPanelRectUpdated(name, {
      ...elementRect,
      resizerWidth: width,
      resizerHeight: height,
    });
  }, [direction, name, onPanelRectUpdated, resizerRect.height, resizerRect.width]);

  useEffect(() => {
    updateElementRect();
  }, [updateElementRect]);

  const height = state[name]?.panelHeight ?? defaultPanelHeight;
  const styles = getPanelStylesFromInfo(
    direction === Direction.COLUMN ? { ...props, height } : { ...props, width: height }
  );

  return (
    <Fragment>
      <div ref={panelRef} className={cls('panel')} style={styles}>
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

  return child.type === Panel;
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
