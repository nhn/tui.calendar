import { Fragment, FunctionComponent, h } from 'preact';
import { useCallback, useLayoutEffect } from 'preact/hooks';

import { PanelResizer } from '@src/components/panelResizer';
import { DEFAULT_RESIZER_LENGTH, Direction } from '@src/constants/layout';
import { DEFAULT_PANEL_HEIGHT } from '@src/constants/style';
import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { getPanelStylesFromInfo } from '@src/controller/panel';
import { cls } from '@src/helpers/css';

import { PanelInfo } from '@t/layout';
import { AlldayEventCategory } from '@t/panel';

export interface Props extends PanelInfo {
  isLast?: boolean;
}

export const Panel: FunctionComponent<Props> = (props) => {
  const {
    direction = Direction.COLUMN,
    name,
    width: initialWidth = DEFAULT_PANEL_HEIGHT,
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
  const width = dayGridRowHeight ?? initialWidth;

  useLayoutEffect(() => {
    setLastPanelType(isLast ? name : null);
  });

  useLayoutEffect(() => {
    updateDayGridRowHeight({ rowName: name, height: initialHeight });
  }, [initialHeight, name, updateDayGridRowHeight]);

  const styleWithDirection = direction === Direction.COLUMN ? { height } : { width };
  const styles = getPanelStylesFromInfo({ ...props, ...styleWithDirection });

  return (
    <Fragment>
      <div className={cls('panel', name)} style={styles}>
        {children}
      </div>
      {resizable && (
        <PanelResizer
          name={name as AlldayEventCategory}
          direction={direction}
          width={resizerWidth}
          height={resizerHeight}
        />
      )}
    </Fragment>
  );
};
