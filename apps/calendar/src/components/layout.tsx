import { cloneElement, ComponentChildren, FunctionComponent, h, toChildArray } from 'preact';
import { useLayoutEffect, useMemo, useRef } from 'preact/hooks';

import { Direction, ResizeMode } from '@src/constants/layout';
import { useDispatch } from '@src/contexts/calendarStore';
import { getLayoutStylesFromInfo } from '@src/controller/layout';
import { cls } from '@src/helpers/css';
import { isNil, isNumber, isString } from '@src/utils/type';

interface Props {
  direction?: Direction;
  height?: number;
  width?: number;
  resizeMode?: ResizeMode;
  classNames?: string[];
}

export const Layout: FunctionComponent<Props> = ({
  direction = Direction.COLUMN,
  resizeMode = ResizeMode.RELATIVE,
  children,
  width,
  height,
  classNames = [],
}) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const { updateLayoutHeight } = useDispatch('weekViewLayout');
  // const filteredPanels = useMemo(() => filterPanels(toChildArray(children)), [children]);

  const className = useMemo(
    () =>
      cls(...classNames, 'layout', {
        horizontal: direction === Direction.ROW,
      }),
    [classNames, direction]
  );

  useLayoutEffect(() => {
    if (layoutRef.current) {
      updateLayoutHeight(layoutRef.current.offsetHeight);
    }
  }, [updateLayoutHeight]);

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
    <div ref={layoutRef} className={className} style={getLayoutStylesFromInfo(width, height)}>
      {renderChildren(children)}
    </div>
  );
};
