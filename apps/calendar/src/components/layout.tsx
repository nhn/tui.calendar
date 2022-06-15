import type { ComponentChildren, ComponentProps } from 'preact';
import { h, toChildArray } from 'preact';
import { useLayoutEffect, useMemo } from 'preact/hooks';

import type { Panel } from '@src/components/panel';
import { EventDetailPopup } from '@src/components/popup/eventDetailPopup';
import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import { PopupOverlay } from '@src/components/popup/popupOverlay';
import { SeeMoreEventsPopup } from '@src/components/popup/seeMoreEventsPopup';
import { useDispatch } from '@src/contexts/calendarStore';
import { LayoutContainerProvider } from '@src/contexts/layoutContainer';
import { cls, toPercent } from '@src/helpers/css';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import { noop } from '@src/utils/noop';
import { isNil, isNumber, isString } from '@src/utils/type';

import type { PropsWithChildren, StyleProp } from '@t/components/common';

interface Props {
  height?: number;
  width?: number;
  className?: string;
  autoAdjustPanels?: boolean;
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
export function Layout({
  children,
  width,
  height,
  className = '',
  autoAdjustPanels = false,
}: PropsWithChildren<Props>) {
  const [container, containerRefCallback] = useDOMNode<HTMLDivElement>();
  const { setLastPanelType, updateLayoutHeight } = useDispatch('weekViewLayout');

  const layoutClassName = useMemo(() => `${cls('layout')} ${className}`, [className]);

  useLayoutEffect(() => {
    if (container) {
      const onResizeWindow = () => updateLayoutHeight(container.offsetHeight);

      onResizeWindow();
      window.addEventListener('resize', onResizeWindow);

      return () => window.removeEventListener('resize', onResizeWindow);
    }

    return noop;
  }, [container, updateLayoutHeight]);

  useLayoutEffect(() => {
    if (container && autoAdjustPanels) {
      const childArray = toChildArray(children);
      const lastChild = childArray[childArray.length - 1];

      if (!isString(lastChild) && !isNumber(lastChild) && !isNil(lastChild)) {
        setLastPanelType((lastChild.props as unknown as ComponentProps<typeof Panel>).name);
      }
    }
  }, [children, setLastPanelType, autoAdjustPanels, container]);

  return (
    <LayoutContainerProvider value={container}>
      <div
        ref={containerRefCallback}
        className={layoutClassName}
        style={getLayoutStylesFromInfo(width, height)}
      >
        {container ? children : null}
      </div>
      <EventFormPopup />
      <EventDetailPopup />
      <SeeMoreEventsPopup />
      <PopupOverlay />
    </LayoutContainerProvider>
  );
}
