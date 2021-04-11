import { cloneElement, FunctionComponent, h, isValidElement, toChildArray, VNode } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import Panel, { filterPanels, getPanelPropsList, Props as PanelProps } from '@src/components/panel';
import {
  Direction,
  getLayoutStylesFromInfo,
  layoutPanels,
  PanelSize,
  resizeByAbsoluteMode,
  resizeByRelativeMode,
  ResizeMode,
} from '@src/controller/layout';
import { DragPositionInfo } from '@src/components/draggable';
import { getSize } from '@src/util/domutil';
import { PanelElementRectMap, PanelInfo, PanelRect } from '@src/controller/panel';
import { cls } from '@src/util/cssHelper';

interface Props {
  children: VNode<typeof Panel> | VNode<typeof Panel>[];
  direction?: Direction;
  height?: number;
  width?: number;
  resizeMode?: ResizeMode;
}

type Child = VNode<any> | string | number;
type SizeType = 'width' | 'height' | 'resizerWidth' | 'resizerHeight';

const sizeKeys: Array<SizeType> = ['width', 'height', 'resizerWidth', 'resizerHeight'];

export const Layout: FunctionComponent<Props> = ({
  direction = Direction.COLUMN,
  resizeMode = ResizeMode.RELATIVE,
  children,
  width,
  height,
}) => {
  const [panels, setPanels] = useState<PanelSize[]>([]);
  const panelElementRectMap: PanelElementRectMap = {
    Milestone: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      resizerWidth: 0,
      resizerHeight: 0,
    },
  };
  const ref = useRef<HTMLDivElement>(null);

  const getClassNames = () => {
    const classNames = [cls('layout')];
    if (direction === Direction.ROW) {
      classNames.push(cls('horizontal'));
    }

    return classNames.join(' ');
  };
  const getLayoutPanels = (isResizeMode = false) => {
    const panelInfoList = getPanelInfoList(isResizeMode);
    const sizeByProps = { width, height };
    const elementSize = ref.current ? getSize(ref.current) : sizeByProps;

    return layoutPanels(panelInfoList, {
      direction,
      width: width ?? elementSize.width,
      height: width ?? elementSize.height,
    });
  };
  const updatePanels = (isResizeMode = false) => setPanels(getLayoutPanels(isResizeMode));
  const onResizeEnd = (panelName: string, dragPositionInfo: DragPositionInfo) => {
    const isResizeMode = true;
    if (resizeMode === ResizeMode.RELATIVE) {
      const panelPropsList = getPanelPropsList(filterPanels(toChildArray(children)));
      resizeByRelativeMode(
        panelName,
        direction,
        panelPropsList,
        panelElementRectMap,
        dragPositionInfo
      );
    } else if (resizeMode === ResizeMode.ABSOLUTE) {
      resizeByAbsoluteMode(panelName, panelElementRectMap, dragPositionInfo);
    }

    updatePanels(isResizeMode);
  };
  const onPanelRectUpdated = (panelName: string, panelRect: PanelRect) => {
    panelElementRectMap[panelName] = panelRect;
  };
  const handlers = { onResizeEnd, onPanelRectUpdated };

  const getPanelInfoList = (isResizeMode = false) => {
    return getPanelPropsList(filterPanels(toChildArray(children))).map((panelProps: PanelInfo) => {
      const panelRect = panelElementRectMap[panelProps.name];
      if (panelRect) {
        sizeKeys.forEach((key: SizeType) => {
          if (!panelProps[key] || isResizeMode) {
            panelProps[key] = panelRect[key];
          }
        });
      }

      return panelProps;
    });
  };
  const renderPanel = (child: Child, panelDirection: Direction, size: PanelSize) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        panelDirection,
        ...handlers,
        ...size,
      } as Partial<PanelProps>);
    }

    return child;
  };

  useEffect(() => {
    updatePanels();
  }, [updatePanels]);

  const filteredPanels = filterPanels(toChildArray(children));

  return (
    <div ref={ref} className={getClassNames()} style={getLayoutStylesFromInfo(width, height)}>
      {filteredPanels.map((panel, index) => renderPanel(panel, direction, panels[index]))}
    </div>
  );
};
