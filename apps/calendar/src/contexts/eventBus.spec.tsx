import { h } from 'preact';
import { useLayoutEffect } from 'preact/hooks';

import { EventBusProvider, useEventBus } from '@src/contexts/eventBus';
import { fireEvent, render, screen } from '@src/test/utils';
import type { EventBus } from '@src/utils/eventBus';
import { EventBusImpl } from '@src/utils/eventBus';

import type { PropsWithChildren } from '@t/components/common';

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
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    // Note: jest.fn() is not an instance of `Function`, so we need to wrap it
    // so that EventBus recognize and turn off handlers.
    function wrapMockHandler(mockFn: jest.Mock) {
      return (...args: any[]) => mockFn(...args);
    }
    const wrappedHandler1 = wrapMockHandler(handler1);
    const wrappedHandler2 = wrapMockHandler(handler2);

    function MultipleHandlerComponent() {
      const eb = useEventBus();

      useLayoutEffect(() => {
        eb.on('test', wrappedHandler1);
        eb.on('test', wrappedHandler2);
      }, [eb]);

      return (
        <div>
          <button onClick={() => eb.fire('test')}>Fire Event</button>
          <button onClick={() => eb.off('test', wrappedHandler2)}>Remove handler2 Only</button>
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
    expect(handler1).toHaveBeenCalledTimes(2);
    expect(handler2).toHaveBeenCalledTimes(1);
  });
});
