import { cloneElement, FunctionComponent, h, isValidElement, toChildArray, VNode } from 'preact';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';

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
import { getSize } from '@src/util/dom';
import { PanelElementRectMap, PanelInfo, PanelRect } from '@src/controller/panel';
import { cls } from '@src/util/cssHelper';
import { useStore } from '@src/components/hooks/store';
import { noop } from '@src/util';

interface Props {
  children: VNode<typeof Panel> | VNode<typeof Panel>[];
  direction?: Direction;
  height?: number;
  width?: number;
  resizeMode?: ResizeMode;
  refCallback?: (element: HTMLElement) => void;
}

type Child = VNode<any> | string | number;

type SizeType = 'width' | 'height' | 'resizerWidth' | 'resizerHeight';

const sizeKeys: Array<SizeType> = ['width', 'height', 'resizerWidth', 'resizerHeight'];

const defaultLayoutHeight = 500;

export const Layout: FunctionComponent<Props> = ({
  direction = Direction.COLUMN,
  resizeMode = ResizeMode.RELATIVE,
  children,
  width,
  height,
  refCallback = noop,
}) => {
  const [panels, setPanels] = useState<PanelSize[]>([]);
  const panelElementRectMap: PanelElementRectMap = useMemo(() => {
    return {};
  }, []);
  const ref = useRef<HTMLDivElement>(null);
  const {
    actions: { updateLayoutHeight },
  } = useStore('grid');

  const getClassNames = () => {
    const classNames = [cls('layout')];
    if (direction === Direction.ROW) {
      classNames.push(cls('horizontal'));
    }

    return classNames.join(' ');
  };
  const updatePanels = useCallback(
    (isResizeMode = false) => {
      const getPanelInfoList = () => {
        return getPanelPropsList(filterPanels(toChildArray(children))).map(
          (panelProps: PanelInfo) => {
            const panelRect = panelElementRectMap[panelProps.name];
            if (panelRect) {
              sizeKeys.forEach((key: SizeType) => {
                if (!panelProps[key] || isResizeMode) {
                  panelProps[key] = panelRect[key];
                }
              });
            }

            return panelProps;
          }
        );
      };
      const getLayoutPanels = () => {
        const panelInfoList = getPanelInfoList();
        const sizeByProps = { width, height };
        const elementSize = ref.current ? getSize(ref.current) : sizeByProps;

        return layoutPanels(panelInfoList, {
          direction,
          width: width ?? elementSize.width,
          height: height ?? elementSize.height,
        });
      };

      setPanels(getLayoutPanels());
    },
    [children, direction, height, panelElementRectMap, width]
  );
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
  const layoutRefCallback = (layoutRef: HTMLDivElement | null) => {
    if (layoutRef) {
      ref.current = layoutRef;
      refCallback(layoutRef);
    }
  };

  const renderPanel = (child: Child, size: PanelSize) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        direction,
        ...handlers,
        ...size,
      } as Partial<PanelProps>);
    }

    return child;
  };

  useEffect(() => {
    updatePanels();
  }, [updatePanels]);

  useEffect(() => {
    updateLayoutHeight({ height: height ?? defaultLayoutHeight });
  }, [height, updateLayoutHeight]);

  const filteredPanels = filterPanels(toChildArray(children));

  return (
    <div
      ref={layoutRefCallback}
      className={getClassNames()}
      style={getLayoutStylesFromInfo(width, height)}
    >
      {filteredPanels.map((panel, index) => renderPanel(panel, panels[index]))}
    </div>
  );
};
