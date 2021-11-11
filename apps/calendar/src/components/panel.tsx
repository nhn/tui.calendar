import { Fragment, FunctionComponent, h, VNode } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import { DragPositionInfo } from '@src/components/draggable';
import { PanelResizer } from '@src/components/panelResizer';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { Direction } from '@src/controller/layout';
import {
  DEFAULT_PANEL_HEIGHT,
  getElementRect,
  getPanelStylesFromInfo,
  isPanelShown,
  PanelInfo,
  panelInfoKeys,
  PanelRect,
  Size,
} from '@src/controller/panel';
import { cls } from '@src/helpers/css';
import { weekViewLayoutSelector } from '@src/selectors';
import { WeekGridRows } from '@src/slices/weekViewLayout';
import { noop } from '@src/utils/noop';
import { isNumber, isString } from '@src/utils/type';

export interface Props extends PanelInfo {
  onResizeStart?: (panelName: string) => void;
  onResizeEnd?: (panelName: string, dragPositionInfo: DragPositionInfo) => void;
  onPanelRectUpdated?: (name: string, rect: PanelRect) => void;
}

type Child = VNode<any> | string | number;

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
  const resizerRef = useRef<{ base: HTMLDivElement }>(null);
  const [resizerRect, setResizerRect] = useState<Size>({ width: 0, height: 0 });
  const { dayGridRows } = useStore(weekViewLayoutSelector);
  const { updateDayGridRowHeight } = useDispatch('weekViewLayout');

  const panelResizeEnd = (resizeInfo: DragPositionInfo) => {
    onResizeEnd(name, resizeInfo);

    const panelHeight = Math.max(
      props.minHeight ?? DEFAULT_PANEL_HEIGHT,
      getElementRect(panelRef.current).height + resizeInfo.endY - resizeInfo.startY
    );
    updateDayGridRowHeight({
      rowName: name as WeekGridRows,
      height: panelHeight,
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

  const panelHeight =
    dayGridRows[name as WeekGridRows]?.height ?? props.height ?? DEFAULT_PANEL_HEIGHT;
  const panelWidth =
    dayGridRows[name as WeekGridRows]?.height ?? props.width ?? DEFAULT_PANEL_HEIGHT;
  const styleWithDirection =
    direction === Direction.COLUMN ? { height: panelHeight } : { width: panelWidth };
  const styles = getPanelStylesFromInfo({ ...props, ...styleWithDirection });

  return (
    <Fragment>
      <div ref={panelRef} className={`${cls('panel')} ${cls(name)}`} style={styles}>
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
