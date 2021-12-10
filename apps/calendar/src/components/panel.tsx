import { Fragment, FunctionComponent, h } from 'preact';

import { PanelResizer } from '@src/components/panelResizer';
import { DEFAULT_RESIZER_LENGTH, Direction } from '@src/constants/layout';
import { PANEL_HEIGHT } from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { getPanelStylesFromInfo } from '@src/controller/panel';
import { cls } from '@src/helpers/css';
import { WeekGridRows } from '@src/slices/weekViewLayout';

import { PanelInfo } from '@t/layout';
import { AlldayEventCategory } from '@t/panel';
import { CalendarStore } from '@t/store';

export interface Props extends PanelInfo {
  isLast?: boolean;
}

function panelSelector(name: WeekGridRows) {
  return (state: CalendarStore) => state.weekViewLayout.dayGridRows[name] ?? {};
}

export const Panel: FunctionComponent<Props> = (props) => {
  const {
    direction = Direction.COLUMN,
    name,
    resizerWidth = DEFAULT_RESIZER_LENGTH,
    resizerHeight = DEFAULT_RESIZER_LENGTH,
    resizable,
    children,
    isLast,
  } = props;

  const { height } = useStore(panelSelector(name as WeekGridRows));

  const panelHeight = height ?? props.height ?? PANEL_HEIGHT;
  const panelWidth = height ?? props.width ?? PANEL_HEIGHT;
  const styleWithDirection =
    direction === Direction.COLUMN ? { height: panelHeight } : { width: panelWidth };
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
