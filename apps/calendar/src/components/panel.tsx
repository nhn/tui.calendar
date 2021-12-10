import { Fragment, FunctionComponent, h } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import { PanelResizer } from '@src/components/panelResizer';
import { DEFAULT_RESIZER_LENGTH, Direction } from '@src/constants/layout';
import { PANEL_HEIGHT } from '@src/constants/style';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getElementRect, getPanelStylesFromInfo } from '@src/controller/panel';
import { cls } from '@src/helpers/css';
import { weekViewLayoutSelector } from '@src/selectors';
import { WeekGridRows } from '@src/slices/weekViewLayout';
import { noop } from '@src/utils/noop';
import { isNumber } from '@src/utils/type';

import { PanelInfo, PanelRect, RectSize } from '@t/layout';
import { AlldayEventCategory } from '@t/panel';

export interface DragPositionInfo {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface Props extends PanelInfo {
  onResizeStart?: (panelName: string) => void;
  onResizeEnd?: (panelName: string, dragPositionInfo: DragPositionInfo) => void;
  onPanelRectUpdated?: (name: string, rect: PanelRect) => void;
  isLast?: boolean;
}

// type Child = VNode | string | number;

export const Panel: FunctionComponent<Props> = (props) => {
  const {
    direction = Direction.COLUMN,
    onResizeStart = noop,
    onResizeEnd = noop,
    onPanelRectUpdated,
    name,
    resizerWidth = DEFAULT_RESIZER_LENGTH,
    resizerHeight = DEFAULT_RESIZER_LENGTH,
    resizable,
    children,
    isLast,
  } = props;

  console.log(isLast);

  const panelRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<{ base: HTMLDivElement }>(null);
  const [resizerRect, setResizerRect] = useState<RectSize>({ width: 0, height: 0 });
  const { dayGridRows } = useStore(weekViewLayoutSelector);
  const { updateDayGridRowHeight } = useDispatch('weekViewLayout');

  const panelResizerWidth = Math.max(resizerWidth, resizerRect.width);
  const panelResizerHeight = Math.max(resizerHeight, resizerRect.height);

  // const panelResizeEnd = (resizeInfo: DragPositionInfo) => {
  //   onResizeEnd(name, resizeInfo);
  //
  //   const panelHeight = Math.max(
  //     props.minHeight ?? PANEL_HEIGHT,
  //     getElementRect(panelRef.current).height + resizeInfo.endY - resizeInfo.startY
  //   );
  //   updateDayGridRowHeight({
  //     rowName: name as WeekGridRows,
  //     height: panelHeight,
  //   });
  // };

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

  const panelHeight = dayGridRows[name as WeekGridRows]?.height ?? props.height ?? PANEL_HEIGHT;
  const panelWidth = dayGridRows[name as WeekGridRows]?.height ?? props.width ?? PANEL_HEIGHT;
  const styleWithDirection =
    direction === Direction.COLUMN ? { height: panelHeight } : { width: panelWidth };
  const styles = getPanelStylesFromInfo({ ...props, ...styleWithDirection });

  return (
    <Fragment>
      <div ref={panelRef} className={`${cls('panel')} ${cls(name)}`} style={styles}>
        {children}
      </div>
      {resizable && (
        <PanelResizer
          ref={resizerRef}
          name={name as AlldayEventCategory}
          direction={direction}
          width={panelResizerWidth}
          height={panelResizerHeight}
        />
      )}
    </Fragment>
  );
};

// function isPanel(child: Child): child is VNode<PanelInfo> {
//   if (isString(child) || isNumber(child)) {
//     return false;
//   }
//
//   return child.type === Panel;
// }

// function getPanelInfo(panel: Child): PanelInfo {
//   if (isString(panel) || isNumber(panel)) {
//     return {} as PanelInfo;
//   }
//
//   const { props } = panel;
//   const panelInfo = {} as PanelInfo;
//
//   panelInfoKeys.forEach((key) => {
//     if (props) {
//       panelInfo[key] = props[key];
//     }
//   });
//
//   return panelInfo;
// }

// export function filterPanels(children: Child[] = []): VNode<PanelInfo>[] {
//   return children.filter(isPanel).filter((child) => isPanelShown(child.props));
// }

// export function getPanelPropsList(children: ComponentChildren) {
//   const panels = toChildArray(children);
//
//   return panels?.map((panel) => getPanelInfo(panel));
// }
