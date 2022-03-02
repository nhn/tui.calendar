import { ComponentProps, h } from 'preact';
import { forwardRef } from 'preact/compat';
import { useMemo } from 'preact/hooks';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import type { AlldayGridRow } from '@src/components/dayGridWeek/alldayGridRow';
import { cls } from '@src/helpers/css';
import { alldayGridRowSelectionHelper } from '@src/helpers/gridSelection';
import { useGridSelection } from '@src/hooks/gridSelection/gridSelection';

import { PropsWithChildren } from '@t/components/common';
import { GridPositionFinder } from '@t/grid';

type Props = Pick<ComponentProps<typeof AlldayGridRow>, 'weekDates'> &
  PropsWithChildren<{
    narrowWeekend: boolean;
    gridPositionFinder: GridPositionFinder;
  }>;

export const ContainerWithGridSelection = forwardRef<HTMLDivElement, Props>(
  function ContainerWithGridSelection(
    { children, gridPositionFinder, weekDates, narrowWeekend },
    ref
  ) {
    const { onMouseDown, gridSelection } = useGridSelection({
      type: 'dayGridWeek',
      gridPositionFinder,
      dateCollection: weekDates,
      selectionSorter: alldayGridRowSelectionHelper.sortSelection,
      dateGetter: alldayGridRowSelectionHelper.getDateFromCollection,
    });

    const calculatedGridSelection = useMemo(
      () => alldayGridRowSelectionHelper.calculateSelection(gridSelection),
      [gridSelection]
    );

    return (
      <div className={cls('allday-panel')} ref={ref} onMouseDown={onMouseDown}>
        {children}
        {calculatedGridSelection ? (
          <GridSelection
            gridSelectionData={calculatedGridSelection}
            weekDates={weekDates}
            narrowWeekend={narrowWeekend}
          />
        ) : null}
      </div>
    );
  }
);
