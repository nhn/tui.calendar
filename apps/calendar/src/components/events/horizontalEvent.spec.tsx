import { h } from 'preact';

import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { initCalendarStore } from '@src/contexts/calendarStore';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { dragAndDrop, render, screen } from '@src/test/utils';
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
        start: new Date(2020, 0, 1, 10, 0),
        end: new Date(2020, 0, 1, 12, 0),
      })
    );
    const props = {
      uiModel,
      eventHeight: 30,
      headerHeight: 0,
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
    const { rerender } = render(<HorizontalEvent {...props} />, { eventBus });

    // Then
    expect(handler).toBeCalledWith(props.uiModel.model.toEventObject());

    // When rerender
    handler.mockReset();
    rerender(<HorizontalEvent {...props} />);

    // Then
    expect(handler).not.toBeCalled();
  });

  it(`should not fire 'afterRenderEvent' when the component is working as a drag & drop interaction guide element`, () => {
    // Given
    const { props, eventBus, handler } = setup();
    const propsWithResizingWidth = {
      ...props,
      resizingWidth: '100px',
    };
    const propsWithMovingLeft = {
      ...props,
      movingLeft: 100,
    };

    // When (resizingWidth)
    const { rerender } = render(<HorizontalEvent {...propsWithResizingWidth} />, { eventBus });

    // Then
    expect(handler).not.toBeCalled();

    // When (movingLeft)
    rerender(<HorizontalEvent {...propsWithMovingLeft} />);

    // Then
    expect(handler).not.toBeCalled();
  });
});

describe('Apply customStyle', () => {
  it('should apply customStyle when the EventModel has the customStyle object', () => {
    // Given
    const customStyle = {
      textDecoration: 'line-through',
    };
    const uiModel = new EventUIModel(
      new EventModel({
        id: '1',
        title: 'style-test',
        start: new Date(2020, 0, 1, 10, 0),
        end: new Date(2020, 0, 1, 12, 0),
        customStyle,
      })
    );
    const props = {
      uiModel,
      eventHeight: 30,
      headerHeight: 0,
    };
    const testId = '1-style-test';

    // When
    render(<HorizontalEvent {...props} />);

    // Then
    const container = screen.getByTestId(testId);
    expect(container).toHaveStyle(customStyle);
  });
});

describe('Color values', () => {
  const calendarId = 'cal1';
  const title = 'style-test';
  const calendarColors = {
    color: '#ff0000',
    borderColor: '#ff0000',
    backgroundColor: '#ff0000',
    dragBackgroundColor: '#ff0000',
  };
  const store = initCalendarStore({
    calendars: [
      {
        id: calendarId,
        name: calendarId,
        ...calendarColors,
      },
    ],
  });

  it('should apply calendar color values to the event', () => {
    // Given
    const uiModel = new EventUIModel(
      new EventModel({
        id: '1',
        calendarId,
        title,
        start: new Date(2020, 0, 1, 10, 0),
        end: new Date(2020, 0, 1, 12, 0),
      })
    );
    const props = {
      uiModel,
      eventHeight: 30,
      headerHeight: 0,
    };

    // When
    render(<HorizontalEvent {...props} />, { store });

    // Then
    const container = screen.getByTestId(new RegExp(title));
    expect(container.children[0]).toHaveStyle({
      color: calendarColors.color,
      backgroundColor: calendarColors.backgroundColor,
      borderLeft: `3px solid ${calendarColors.borderColor}`,
    });
  });

  it('should apply color properties of the event model overriding calendar color values', () => {
    // Given
    const eventColors = {
      color: '#6f53d4',
      backgroundColor: '#6f53d4',
      borderColor: '#6f53d4',
      dragBackgroundColor: '#6f53d4',
    };

    const uiModel = new EventUIModel(
      new EventModel({
        id: '1',
        calendarId,
        title,
        start: new Date(2020, 0, 1, 10, 0),
        end: new Date(2020, 0, 1, 12, 0),
        ...eventColors,
      })
    );
    const props = {
      uiModel,
      eventHeight: 30,
      headerHeight: 0,
    };

    // When
    render(<HorizontalEvent {...props} />, { store });

    // Then
    const container = screen.getByTestId(new RegExp(title));
    expect(container.children[0]).toHaveStyle({
      color: eventColors.color,
      backgroundColor: eventColors.backgroundColor,
      borderLeft: `3px solid ${eventColors.borderColor}`,
    });
  });

  it('should apply the dragBackgroundColor value to the dragging event', () => {
    // Given
    const eventColors = {
      color: '#6f53d4',
      backgroundColor: '#6f53d4',
      borderColor: '#6f53d4',
      dragBackgroundColor: '#fb96f6',
    };

    const uiModel = new EventUIModel(
      new EventModel({
        id: '1',
        calendarId,
        title,
        start: new Date(2020, 0, 1, 10, 0),
        end: new Date(2020, 0, 1, 12, 0),
        ...eventColors,
      })
    );
    const props = {
      uiModel,
      eventHeight: 30,
      headerHeight: 0,
    };
    const getEventItemElement = () =>
      screen.getByTestId(new RegExp(title))?.children?.[0] as HTMLElement;

    // When
    render(<HorizontalEvent {...props} />, { store });
    dragAndDrop({
      element: getEventItemElement(),
      targetPosition: {
        clientX: 100,
        clientY: 100,
      },
      hold: true,
    });

    // Then
    expect(getEventItemElement()).toHaveStyle({
      color: eventColors.color,
      backgroundColor: eventColors.dragBackgroundColor,
      borderLeft: `3px solid ${eventColors.borderColor}`,
    });
  });
});
