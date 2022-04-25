import Week from '@src/factory/week';
import { act } from '@src/test/utils';

import { mockWeekViewEvents } from '@stories/mocks/mockWeekViewEvents';

describe('Week Calendar', () => {
  let instance: Week;
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    instance = new Week(container);
    act(() => {
      instance.createEvents(mockWeekViewEvents);
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with the mock events', () => {
    // Given
    // Setup in the `beforeEach` hook

    // Then
    expect(container).not.toBeEmptyDOMElement();
  });
});
