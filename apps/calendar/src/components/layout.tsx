import { cloneElement, ComponentChildren, FunctionComponent, h, toChildArray } from 'preact';
import { useLayoutEffect, useMemo, useRef } from 'preact/hooks';

import { useDispatch } from '@src/contexts/calendarStore';
import { getLayoutStylesFromInfo } from '@src/controller/layout';
import { cls } from '@src/helpers/css';
import { isNil, isNumber, isString } from '@src/utils/type';

interface Props {
  height?: number;
  width?: number;
  className?: string;
}

// @TODO: consider `direction` and `resizeMode`
export const Layout: FunctionComponent<Props> = ({ children, width, height, className = '' }) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const { updateLayoutHeight } = useDispatch('weekViewLayout');

  const layoutClassName = useMemo(() => `${cls('layout')} ${className}`, [className]);

  useLayoutEffect(() => {
    if (layoutRef.current) {
      updateLayoutHeight(layoutRef.current.offsetHeight);
    }
  }, [updateLayoutHeight]);

  const renderChildren = (componentChildren: ComponentChildren) => {
    const childArray = toChildArray(componentChildren);
    const lastIndex = childArray.length - 1;

    return childArray.map((child, index) => {
      if (isString(child) || isNumber(child) || isNil(child)) {
        return child;
      }

      return cloneElement(child, { isLast: index === lastIndex });
    });
  };

  return (
    <div ref={layoutRef} className={layoutClassName} style={getLayoutStylesFromInfo(width, height)}>
      {renderChildren(children)}
    </div>
  );
};
