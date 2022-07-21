import { h } from 'preact';

import { TimezoneCollapseButton } from '@src/components/timeGrid/timezoneCollapseButton';
import { fireEvent, render } from '@src/test/utils';
import { EventBusImpl } from '@src/utils/eventBus';

import type { ExternalEventTypes } from '@t/eventBus';

describe(`Firing 'clickTimezonesCollapseBtn' event`, () => {
  it(`should fire 'clickTimezonesCollapseBtn when clicked`, () => {
    // Given
    const eventBus = new EventBusImpl<ExternalEventTypes>();
    const handler = jest.fn();
    eventBus.on('clickTimezonesCollapseBtn', handler);

    // When (is collapsed)
    const { container, rerender } = render(<TimezoneCollapseButton isCollapsed={false} />, {
      eventBus,
    });
    const button = container.firstChild as HTMLButtonElement;
    fireEvent.click(button);

    // Then
    expect(handler).toBeCalledWith(false);

    // When (is not collapsed)
    rerender(<TimezoneCollapseButton isCollapsed={true} />);
    fireEvent.click(button);

    // Then
    expect(handler).toBeCalledWith(true);
  });
});
