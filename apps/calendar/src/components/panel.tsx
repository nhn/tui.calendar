import { Fragment, FunctionComponent, h } from 'preact';
import { useCallback, useLayoutEffect } from 'preact/hooks';

import { PanelResizer } from '@src/components/panelResizer';
import { DEFAULT_RESIZER_LENGTH } from '@src/constants/layout';
import { DEFAULT_PANEL_HEIGHT } from '@src/constants/style';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';

import { StyleProp } from '@t/components/common';
import { PanelInfo } from '@t/layout';
import { AlldayEventCategory } from '@t/panel';

export interface Props extends PanelInfo {
  isLast?: boolean;
}

const styleKeys: (keyof PanelInfo)[] = ['minHeight', 'maxHeight', 'minWidth', 'maxWidth'];

function getPanelSide(side: number, maxExpandableSide?: number) {
  return maxExpandableSide ? Math.min(maxExpandableSide, side) : side;
}

function getPanelStylesFromInfo(panel: PanelInfo) {
  const styles: StyleProp = {};
  const { height, width, overflowX, overflowY, maxExpandableWidth, maxExpandableHeight } = panel;

  if (width) {
    styles.width = getPanelSide(width, maxExpandableWidth);
    styles.height = '100%';
  }
  if (height) {
    styles.width = '100%';
    styles.height = getPanelSide(height, maxExpandableHeight);
  }

  if (overflowX) {
    styles.overflowX = 'auto';
  }
  if (overflowY) {
    styles.overflowY = 'auto';
  }

  styleKeys.forEach((key) => {
    if (panel[key]) {
      styles[key] = panel[key] as keyof PanelInfo;
    }
  });

  return styles;
}

export const Panel: FunctionComponent<Props> = (props) => {
  const {
    name,
    height: initialHeight = DEFAULT_PANEL_HEIGHT,
    resizerWidth = DEFAULT_RESIZER_LENGTH,
    resizerHeight = DEFAULT_RESIZER_LENGTH,
    resizable,
    children,
    isLast,
  } = props;

  const { setLastPanelType, updateDayGridRowHeight } = useDispatch('weekViewLayout');
  const { height: dayGridRowHeight } = useStore(
    useCallback((state) => state.weekViewLayout.dayGridRows[name] ?? {}, [name])
  );
  const height = dayGridRowHeight ?? initialHeight;

  useLayoutEffect(() => {
    setLastPanelType(isLast ? name : null);
  });

  useLayoutEffect(() => {
    updateDayGridRowHeight({ rowName: name, height: initialHeight });
  }, [initialHeight, name, updateDayGridRowHeight]);

  const styles = getPanelStylesFromInfo({ ...props, height });

  return (
    <Fragment>
      <div className={cls('panel', name)} style={styles}>
        {children}
      </div>
      {resizable && (
        <PanelResizer
          name={name as AlldayEventCategory}
          width={resizerWidth}
          height={resizerHeight}
        />
      )}
    </Fragment>
  );
};
