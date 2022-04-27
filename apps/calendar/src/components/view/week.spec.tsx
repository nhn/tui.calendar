import { h } from 'preact';

import { Week } from '@src/components/view/week';
import { DEFAULT_EVENT_PANEL, DEFAULT_TASK_PANEL } from '@src/constants/view';
import { initCalendarStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { getActivePanels } from '@src/helpers/view';
import { render } from '@src/test/utils';

import type { WeekOptions } from '@t/options';

describe('week', () => {
  function setup(weekOptions: WeekOptions) {
    const store = initCalendarStore();
    store.getState().dispatch.options.setOptions({
      week: weekOptions,
    });

    return render(<Week />, { store });
  }

  describe('eventView and taskView options', () => {
    const cases: WeekOptions[] = [
      { eventView: true, taskView: true },
      { eventView: false, taskView: false },
      { eventView: ['allday'], taskView: ['milestone'] },
      { eventView: ['allday', 'time'], taskView: false },
    ];

    const panels = [...DEFAULT_TASK_PANEL, ...DEFAULT_EVENT_PANEL];

    it.each(cases)(
      'should show/hide the panels in the daily view: { eventView: $eventView, taskView: $eventView }',
      (weekOptions) => {
        // Given
        const { container } = setup(weekOptions);

        // When
        // Nothing

        // Then
        const activePanels = getActivePanels(
          weekOptions.taskView ?? false,
          weekOptions.eventView ?? false
        );
        panels.forEach((panel) => {
          const panelEl = container.querySelector(`.${cls(panel)}`);
          if (activePanels.includes(panel)) {
            expect(panelEl).not.toBeNull();
          } else {
            expect(panelEl).toBeNull();
          }
        });
      }
    );
  });
});
