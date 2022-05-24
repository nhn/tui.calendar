import { h } from 'preact';

import { TimeEvent } from '@src/components/events/timeEvent';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { render } from '@src/test/utils';
import TZDate from '@src/time/date';
import { EventBusImpl } from '@src/utils/eventBus';

import type { ExternalEventTypes } from '@t/eventBus';

describe(`Firing 'afterRenderEvent'`, () => {
  function setup() {
    const eventBus = new EventBusImpl<ExternalEventTypes>();
    const handler = jest.fn();
    eventBus.on('afterRenderEvent', handler);
    const uiModel = EventUIModel.create(
      new EventModel({
        id: '1',
        start: new Date('2022-05-19T09:00:00'),
        end: new Date('2022-05-19T10:00:00'),
      })
    );
    const props = {
      uiModel,
      nextStartTime: new TZDate('2022-05-19T11:00:00'),
    };

    return {
      props,
      eventBus,
      handler,
    };
  }

  it(`should fire 'afterRenderEvent' when only the component is mounted`, () => {
    // Given
    const { props, eventBus, handler } = setup();

    // When
    const { rerender } = render(<TimeEvent {...props} />, { eventBus });

    // Then
    expect(handler).toBeCalledWith(props.uiModel.model);

    // When (re-render)
    handler.mockReset();
    rerender(<TimeEvent {...props} />);

    // Then
    expect(handler).not.toBeCalled();
  });

  it(`should not fire 'afterRenderEvent' when the component is working as a drag & drop interaction guide element`, () => {
    // Given
    const { props, eventBus, handler } = setup();

    // When
    render(<TimeEvent {...props} isResizingGuide={true} />, { eventBus });

    // Then
    expect(handler).not.toBeCalled();
  });
});
