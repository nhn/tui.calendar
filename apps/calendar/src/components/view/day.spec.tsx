import { h } from 'preact';

import { render } from '@testing-library/preact';

import { Day } from '@src/components/view/day';
import { DEFAULT_EVENT_PANEL, DEFAULT_TASK_PANEL } from '@src/constants/view';
import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import { EventBusProvider } from '@src/contexts/eventBus';
import { initThemeStore, ThemeProvider } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { EventBusImpl } from '@src/utils/eventBus';
import { isBoolean } from '@src/utils/type';

import type { WeekOptions } from '@t/options';

describe('day', () => {
  function setup(weekOptions: WeekOptions) {
    const eventBus = new EventBusImpl();
    const store = initCalendarStore();
    const theme = initThemeStore();

    store.getState().dispatch.options.setOptions({
      week: weekOptions,
    });

    return render(
      <EventBusProvider value={eventBus}>
        <ThemeProvider store={theme}>
          <StoreProvider store={store}>
            <Day />
          </StoreProvider>
        </ThemeProvider>
      </EventBusProvider>
    );
  }

  describe('eventView and taskView options', () => {
    const cases: WeekOptions[] = [
      { eventView: true, taskView: true },
      { eventView: false, taskView: false },
      { eventView: ['allday'], taskView: ['milestone'] },
      { eventView: ['allday', 'time'], taskView: false },
    ];

    function getExpectedResult({ eventView, taskView }: WeekOptions) {
      const result: {
        milestone?: boolean;
        task?: boolean;
        allday?: boolean;
        time?: boolean;
      } = {};

      DEFAULT_EVENT_PANEL.forEach((eventPanel) => {
        result[eventPanel] = isBoolean(eventView) ? eventView : !!eventView?.includes(eventPanel);
      });

      DEFAULT_TASK_PANEL.forEach((taskPanel) => {
        result[taskPanel] = isBoolean(taskView) ? taskView : !!taskView?.includes(taskPanel);
      });

      return result;
    }

    cases.forEach((weekOptions) => {
      it(`show/hide the panels in the daily view: { eventView: ${weekOptions.eventView}, taskView: ${weekOptions.taskView} }`, () => {
        // Given
        const { container } = setup(weekOptions);

        // When
        // Nothing

        // Then
        const results = getExpectedResult(weekOptions);
        for (const [name, result] of Object.entries(results)) {
          const panel = container.querySelector(`.${cls(name)}`);
          if (result) {
            expect(panel).not.toBeNull();
          } else {
            expect(panel).toBeNull();
          }
        }
      });
    });
  });
});
