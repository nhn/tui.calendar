import { h } from 'preact';
import { useLayoutEffect } from 'preact/hooks';

import { expect } from '@playwright/test';
import { fireEvent, render, screen } from '@testing-library/preact';

import { EventBusProvider, useEventBus } from '@src/contexts/eventBus';
import { EventBus, EventBusImpl } from '@src/utils/eventBus';

import { PropsWithChildren } from '@t/components/common';

describe('Event Bus Context', () => {
  let eventBus: EventBus<any>;
  let mockHandler: jest.Mock;

  const wrapper = ({ children }: PropsWithChildren) => (
    <EventBusProvider value={eventBus}>{children}</EventBusProvider>
  );
  const Component = ({
    handler,
    fireOnce = false,
  }: {
    handler: (...args: any[]) => any;
    fireOnce?: boolean;
  }) => {
    const eb = useEventBus();

    useLayoutEffect(() => {
      eb[fireOnce ? 'once' : 'on']('test', handler);
    }, [eb, fireOnce, handler]);

    return (
      <div>
        <button onClick={() => eb.fire('test')}>Fire Event</button>
        <button onClick={() => eb.off('test')}>Remove Event</button>
      </div>
    );
  };

  beforeEach(() => {
    eventBus = new EventBusImpl<any>();
    mockHandler = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should accessible via "useEventBus" hook', () => {
    // Given
    render(<Component handler={mockHandler} />, { wrapper });

    // When
    const fireButton = screen.getByText(/fire event/i);
    fireEvent.click(fireButton);
    fireEvent.click(fireButton);

    // Then
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });

  it('should fire event once when needed', () => {
    // Given
    render(<Component handler={mockHandler} fireOnce={true} />, { wrapper });

    // When
    const fireButton = screen.getByText(/fire event/i);
    fireEvent.click(fireButton);
    fireEvent.click(fireButton);

    // Then
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('should be able to remove registered event', () => {
    // Given
    render(<Component handler={mockHandler} />, { wrapper });

    // When
    const fireButton = screen.getByText(/fire event/i);
    const removeButton = screen.getByText(/remove event/i);
    fireEvent.click(fireButton);
    fireEvent.click(removeButton);
    fireEvent.click(fireButton);

    // Then
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('should be able to remove a specific handler among registered events', () => {
    // Given
    // Note: jest.fn() is not keeping reference to the handler perhaps because it's a wrapped object.
    // So declared simple function to keep reference.
    let handler1CallingCount = 0;
    let handler2CallingCount = 0;
    const handler1 = () => {
      handler1CallingCount += 1;
    };
    const handler2 = () => {
      handler2CallingCount += 1;
    };

    function MultipleHandlerComponent() {
      const eb = useEventBus();

      useLayoutEffect(() => {
        eb.on('test', handler1);
        eb.on('test', handler2);
      }, [eb]);

      return (
        <div>
          <button onClick={() => eb.fire('test')}>Fire Event</button>
          <button onClick={() => eb.off('test', handler2)}>Remove handler2 Only</button>
        </div>
      );
    }
    render(<MultipleHandlerComponent />, { wrapper });

    // When
    const fireButton = screen.getByText(/fire/i);
    const removeButton = screen.getByText(/remove/i);
    fireEvent.click(fireButton);
    fireEvent.click(removeButton);
    fireEvent.click(fireButton);

    // Then
    expect(handler1CallingCount).toBe(2);
    expect(handler2CallingCount).toBe(1);
  });
});
