import { ComponentChildren, ComponentProps, h, toChildArray } from 'preact';
import { forwardRef } from 'preact/compat';
import { useLayoutEffect, useMemo } from 'preact/hooks';

import { Panel } from '@src/components/panel';
import { useDispatch } from '@src/contexts/calendarStore';
import { LayoutContainerRefProvider } from '@src/contexts/layoutContainerRef';
import { cls, toPercent } from '@src/helpers/css';
import { useMergedRef } from '@src/hooks/common/mergedRef';
import { noop } from '@src/utils/noop';
import { isNil, isNumber, isString } from '@src/utils/type';

import { StyleProp } from '@t/components/common';

interface Props {
  height?: number;
  width?: number;
  className?: string;
  children: ComponentChildren;
}

function getLayoutStylesFromInfo(width?: number, height?: number) {
  const styles: StyleProp = { height: toPercent(100) };

  if (width) {
    styles.width = width;
  }
  if (height) {
    styles.height = height;
  }

  return styles;
}

// @TODO: consider `direction` and `resizeMode`
export const Layout = forwardRef<HTMLDivElement, Props>(
  ({ children, width, height, className = '' }, forwardedRef) => {
    const containerRef = useMergedRef<HTMLDivElement>(forwardedRef);
    const { setLastPanelType, updateLayoutHeight } = useDispatch('weekViewLayout');

    const layoutClassName = useMemo(() => `${cls('layout')} ${className}`, [className]);

    useLayoutEffect(() => {
      const layoutElement = containerRef.current;

      if (layoutElement) {
        const onResizeWindow = () => updateLayoutHeight(layoutElement.offsetHeight);

        onResizeWindow();
        window.addEventListener('resize', onResizeWindow);

        return () => window.removeEventListener('resize', onResizeWindow);
      }

      return noop;
    }, [containerRef, updateLayoutHeight]);

    useLayoutEffect(() => {
      const childArray = toChildArray(children);
      const lastChild = childArray[childArray.length - 1];

      if (!isString(lastChild) && !isNumber(lastChild) && !isNil(lastChild)) {
        setLastPanelType((lastChild.props as unknown as ComponentProps<typeof Panel>).name);
      }
    }, [children, setLastPanelType]);

    return (
      <LayoutContainerRefProvider value={containerRef}>
        <div
          ref={containerRef}
          className={layoutClassName}
          style={getLayoutStylesFromInfo(width, height)}
        >
          {children}
        </div>
      </LayoutContainerRefProvider>
    );
  }
);

Layout.displayName = 'Layout';
