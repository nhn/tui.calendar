import { Fragment, h } from 'preact';
import { forwardRef } from 'preact/compat';
import { useCallback, useLayoutEffect, useMemo } from 'preact/hooks';

import { PanelResizer } from '@src/components/panelResizer';
import { DEFAULT_RESIZER_LENGTH } from '@src/constants/layout';
import { DEFAULT_PANEL_HEIGHT } from '@src/constants/style';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { isBoolean, isNil } from '@src/utils/type';

import type { PropsWithChildren, StyleProp } from '@t/components/common';
import type { AlldayEventCategory } from '@t/panel';

interface Props {
  name: string;
  overflowY?: boolean;
  overflowX?: boolean;
  show?: boolean;

  autoSize?: number;
  initialHeight?: number;
  initialWidth?: number;
  minHeight?: number;
  minWidth?: number;
  maxHeight?: number;
  maxWidth?: number;

  expandable?: boolean;
  maxExpandableHeight?: number;
  maxExpandableWidth?: number;

  resizable?: boolean | string[];
  resizerHeight?: number;
  resizerWidth?: number;
}

function getPanelSide(side: number, maxExpandableSide?: number) {
  return maxExpandableSide ? Math.min(maxExpandableSide, side) : side;
}

function getPanelStyle({
  initialHeight,
  initialWidth,
  overflowX,
  overflowY,
  maxExpandableWidth,
  maxExpandableHeight,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth,
}: Partial<Props>) {
  const style: StyleProp = {};

  if (initialWidth) {
    style.width = getPanelSide(initialWidth, maxExpandableWidth);
    style.height = '100%';
  }
  if (initialHeight) {
    style.width = '100%';
    style.height = getPanelSide(initialHeight, maxExpandableHeight);
  }

  if (overflowX) {
    style.overflowX = 'auto';
  }
  if (overflowY) {
    style.overflowY = 'auto';
  }

  return { ...style, minHeight, maxHeight, minWidth, maxWidth };
}

export const Panel = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(function Panel(
  {
    name,
    initialWidth = DEFAULT_PANEL_HEIGHT,
    initialHeight = DEFAULT_PANEL_HEIGHT,
    overflowX,
    overflowY,
    maxExpandableWidth,
    maxExpandableHeight,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    resizerWidth = DEFAULT_RESIZER_LENGTH,
    resizerHeight = DEFAULT_RESIZER_LENGTH,
    resizable,
    children,
  },
  ref
) {
  const { updateDayGridRowHeight } = useDispatch('weekViewLayout');
  const { height: dayGridRowHeight } = useStore(
    useCallback((state) => state.weekViewLayout.dayGridRows[name] ?? {}, [name])
  );
  const height = dayGridRowHeight ?? initialHeight;

  useLayoutEffect(() => {
    updateDayGridRowHeight({ rowName: name, height: initialHeight });
  }, [initialHeight, name, updateDayGridRowHeight]);

  const styles = getPanelStyle({
    initialWidth,
    initialHeight: height,
    overflowX,
    overflowY,
    maxExpandableWidth,
    maxExpandableHeight,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
  });

  const isResizable = useMemo(() => {
    if (isNil(resizable) || isBoolean(resizable)) {
      return !!resizable;
    }

    return resizable.includes(name);
  }, [resizable, name]);

  return (
    <Fragment>
      <div className={cls('panel', name)} style={styles} ref={ref}>
        {children}
      </div>
      {isResizable ? (
        <PanelResizer
          name={name as AlldayEventCategory}
          width={resizerWidth}
          height={resizerHeight}
        />
      ) : null}
    </Fragment>
  );
});
