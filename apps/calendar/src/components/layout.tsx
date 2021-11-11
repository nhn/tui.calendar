import { cloneElement, FunctionComponent, h, isValidElement, toChildArray, VNode } from 'preact';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { DragPositionInfo } from '@src/components/draggable';
import { filterPanels, getPanelPropsList, Props as PanelProps } from '@src/components/panel';
import { Direction, ResizeMode } from '@src/constants/layout';
import {
  getLayoutStylesFromInfo,
  layoutPanels,
  resizeByAbsoluteMode,
  resizeByRelativeMode,
} from '@src/controller/layout';
import { cls } from '@src/helpers/css';
import { getSize } from '@src/utils/dom';

import { PanelElementRectMap, PanelInfo, PanelRect, PanelSize } from '@t/layout';

interface Props {
  direction?: Direction;
  height?: number;
  width?: number;
  resizeMode?: ResizeMode;
  classNames?: string[];
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
  classNames = [],
}) => {
  const [panels, setPanels] = useState<PanelSize[]>([]);
  const panelElementRectMap: PanelElementRectMap = useMemo(() => {
    return {};
  }, []);
  const ref = useRef<HTMLDivElement>(null);
  const filteredPanels = filterPanels(toChildArray(children));

  const getClassNames = () => {
    const layoutClassNames = [cls('layout')];
    if (direction === Direction.ROW) {
      layoutClassNames.push(cls('horizontal'));
    }

    return layoutClassNames.concat(classNames).join(' ');
  };
  const updatePanels = useCallback(
    (isResizeMode = false) => {
      const getPanelInfoList = () => {
        return getPanelPropsList(filteredPanels).map((panelProps: PanelInfo) => {
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
    [filteredPanels, direction, height, panelElementRectMap, width]
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

  const renderPanel = (child: Child, size: PanelSize) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        direction,
        onResizeEnd,
        onPanelRectUpdated,
        ...size,
      } as Partial<PanelProps>);
    }

    return child;
  };

  useEffect(() => {
    updatePanels();
  }, [updatePanels]);

  return (
    <div ref={ref} className={getClassNames()} style={getLayoutStylesFromInfo(width, height)}>
      {filteredPanels.map((panel, index) => renderPanel(panel, panels[index]))}
    </div>
  );
};
