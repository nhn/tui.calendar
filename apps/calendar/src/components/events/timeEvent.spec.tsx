import { h } from 'preact';

import { TimeEvent } from '@src/components/events/timeEvent';
import { initCalendarStore } from '@src/contexts/calendarStore';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { dragAndDrop, fireEvent, render, screen } from '@src/test/utils';
import TZDate from '@src/time/date';
import { EventBusImpl } from '@src/utils/eventBus';

import type { ExternalEventTypes } from '@t/eventBus';

describe(`Firing 'clickEvent'`, () => {
  const eventTitle = 'click-event';

  function setup() {
    const eventBus = new EventBusImpl<ExternalEventTypes>();
    const handler = jest.fn();
    eventBus.on('clickEvent', handler);
    const uiModel = new EventUIModel(
      new EventModel({
        id: '1',
        title: eventTitle,
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

  it('should fire event when clicked', () => {
    // Given
    const { eventBus, handler, props } = setup();
    render(<TimeEvent {...props} />, { eventBus });

    // When
    const event = screen.getByText(eventTitle);
    fireEvent.mouseDown(event);
    fireEvent.mouseUp(event);

    // Then
    expect(handler).toBeCalledWith(
      expect.objectContaining({
        event: props.uiModel.model.toEventObject(),
      })
    );
  });

  it('should not fire when dragged', () => {
    // Given
    const { eventBus, handler, props } = setup();
    render(<TimeEvent {...props} />, { eventBus });

    // When
    const event = screen.getByText(eventTitle);
    dragAndDrop({
      element: event,
      targetPosition: {
        clientX: 100,
        clientY: 100,
      },
    });

    // Then
    expect(handler).not.toBeCalled();
  });
});

describe(`Firing 'afterRenderEvent'`, () => {
  function setup() {
    const eventBus = new EventBusImpl<ExternalEventTypes>();
    const handler = jest.fn();
    eventBus.on('afterRenderEvent', handler);
    const uiModel = new EventUIModel(
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
    expect(handler).toBeCalledWith(props.uiModel.model.toEventObject());

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
        start: new Date('2022-06-05T09:00:00'),
        end: new Date('2022-06-05T1100:00'),
        customStyle,
      })
    );

    // When
    render(<TimeEvent uiModel={uiModel} />);

    // Then
    const container = screen.getByTestId(/time-event/);
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
        start: new Date('2022-06-05T09:00:00'),
        end: new Date('2022-06-05T1100:00'),
      })
    );

    // When
    render(<TimeEvent uiModel={uiModel} />, { store });

    // Then
    const container = screen.getByTestId(/time-event/);
    expect(container).toHaveStyle({
      color: calendarColors.color,
      borderColor: `3px solid ${calendarColors.borderColor}`,
      backgroundColor: calendarColors.backgroundColor,
    });
  });

  it('should apply color properties of the event model overriding calendar colors', () => {
    // Given
    const eventColors = {
      color: '#723a5c',
      borderColor: '#723a5c',
      backgroundColor: '#723a5c',
    };
    const uiModel = new EventUIModel(
      new EventModel({
        id: '1',
        calendarId,
        title,
        start: new Date('2022-06-05T09:00:00'),
        end: new Date('2022-06-05T1100:00'),
        ...eventColors,
      })
    );

    // When
    render(<TimeEvent uiModel={uiModel} />, { store });

    // Then
    const container = screen.getByTestId(/time-event/);
    expect(container).toHaveStyle({
      color: eventColors.color,
      borderColor: `3px solid ${eventColors.borderColor}`,
      backgroundColor: eventColors.backgroundColor,
    });
  });

  it('should apply the dragBackgroundColor value to the dragging event', () => {
    // Given
    const uiModel = new EventUIModel(
      new EventModel({
        id: '1',
        calendarId,
        title,
        start: new Date('2022-06-05T09:00:00'),
        end: new Date('2022-06-05T1100:00'),
      })
    );
    const getEventElement = () => screen.getByTestId(/time-event/);

    // When
    render(<TimeEvent uiModel={uiModel} />, { store });
    dragAndDrop({
      element: getEventElement(),
      targetPosition: {
        clientX: 100,
        clientY: 100,
      },
      hold: true,
    });

    // Then
    expect(getEventElement()).toHaveStyle({
      backgroundColor: calendarColors.dragBackgroundColor,
    });
  });
});

describe('isReadOnly', () => {
  it("should be able to show detail popup even if the model's `isReadOnly` property is `true`", () => {
    // Given
    const store = initCalendarStore({
      useDetailPopup: true,
    });
    const eventName = 'readonly-event';
    const uiModel = new EventUIModel(
      new EventModel({
        id: '1',
        title: eventName,
        start: new Date('2022-06-05T09:00:00'),
        end: new Date('2022-06-05T1100:00'),
        isReadOnly: true,
      })
    );
    const showDetailPopupSpy = jest.fn();
    store.getState().dispatch.popup.showDetailPopup = showDetailPopupSpy;

    // When
    render(<TimeEvent uiModel={uiModel} />, { store });

    // Then
    const event = screen.getByText(eventName);
    // NOTE: userEvent.click is not working as expected
    fireEvent.mouseDown(event);
    fireEvent.mouseUp(event);

    expect(showDetailPopupSpy).toHaveBeenCalled();
  });
});
