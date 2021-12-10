import { cloneElement, ComponentChildren, FunctionComponent, h, toChildArray } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';

import { Direction, ResizeMode } from '@src/constants/layout';
import { getLayoutStylesFromInfo } from '@src/controller/layout';
import { cls } from '@src/helpers/css';
import { isNil, isNumber, isString } from '@src/utils/type';

import { PanelElementRectMap, PanelSize } from '@t/layout';

interface Props {
  direction?: Direction;
  height?: number;
  width?: number;
  resizeMode?: ResizeMode;
  classNames?: string[];
}

// type Child = VNode<any> | string | number;

// type SizeType = 'width' | 'height' | 'resizerWidth' | 'resizerHeight';

// const sizeKeys: Array<SizeType> = ['width', 'height', 'resizerWidth', 'resizerHeight'];

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
  // const filteredPanels = useMemo(() => filterPanels(toChildArray(children)), [children]);

  const className = useMemo(
    () =>
      cls(...classNames, 'layout', {
        horizontal: direction === Direction.ROW,
      }),
    [classNames, direction]
  );

  // const updatePanels = useCallback(
  //   (isResizeMode = false) => {
  //     const getPanelInfoList = () => {
  //       return getPanelPropsList(filteredPanels).map((panelProps: PanelInfo) => {
  //         const panelRect = panelElementRectMap[panelProps.name];
  //         if (panelRect) {
  //           sizeKeys.forEach((key: SizeType) => {
  //             if (!panelProps[key] || isResizeMode) {
  //               panelProps[key] = panelRect[key];
  //             }
  //           });
  //         }
  //
  //         return panelProps;
  //       });
  //     };
  //     const getLayoutPanels = () => {
  //       const panelInfoList = getPanelInfoList();
  //       const sizeByProps = { width, height };
  //       const elementSize = ref.current ? getSize(ref.current) : sizeByProps;
  //
  //       return layoutPanels(panelInfoList, {
  //         direction,
  //         width: width ?? elementSize.width,
  //         height: height ?? elementSize.height,
  //       });
  //     };
  //
  //     setPanels(getLayoutPanels());
  //   },
  //   [direction, filteredPanels, height, panelElementRectMap, width]
  // );
  // const onResizeEnd = (panelName: string, dragPositionInfo: DragPositionInfo) => {
  //   const isResizeMode = true;
  //   if (resizeMode === ResizeMode.RELATIVE) {
  //     const panelPropsList = getPanelPropsList(filterPanels(toChildArray(children)));
  //     resizeByRelativeMode(
  //       panelName,
  //       direction,
  //       panelPropsList,
  //       panelElementRectMap,
  //       dragPositionInfo
  //     );
  //   } else if (resizeMode === ResizeMode.ABSOLUTE) {
  //     resizeByAbsoluteMode(panelName, panelElementRectMap, dragPositionInfo);
  //   }
  //
  //   updatePanels(isResizeMode);
  // };
  // const onPanelRectUpdated = (panelName: string, panelRect: PanelRect) => {
  //   panelElementRectMap[panelName] = panelRect;
  // };

  // const renderPanel = (child: Child, size: PanelSize) => {
  //   if (isValidElement(child)) {
  //     console.log(
  //       'valid',
  //       child,
  //       cloneElement(child, {
  //         direction,
  //         onResizeEnd,
  //         onPanelRectUpdated,
  //         ...size,
  //       } as Partial<PanelProps>)
  //     );
  //
  //     return cloneElement(child, {
  //       direction,
  //       onResizeEnd,
  //       onPanelRectUpdated,
  //       ...size,
  //     } as Partial<PanelProps>);
  //   }
  //
  //   return child;
  // };

  // useEffect(() => {
  //   updatePanels();
  // }, [updatePanels]);

  const renderChildren = (componentChildren: ComponentChildren) => {
    const childrenArray = toChildArray(componentChildren);
    const lastIndex = childrenArray.length - 1;

    return childrenArray.map((child, index) => {
      if (isString(child) || isNumber(child) || isNil(child)) {
        return child;
      }

      return cloneElement(child, { isLast: index === lastIndex });
    });
  };

  return (
    <div ref={ref} className={className} style={getLayoutStylesFromInfo(width, height)}>
      {/* {children}*/}
      {renderChildren(children)}
      {/* {filteredPanels.map((panel, index) => renderPanel(panel, panels[index]))}*/}
    </div>
  );
};
