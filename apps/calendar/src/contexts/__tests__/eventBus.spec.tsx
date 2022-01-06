import { FunctionComponent, h } from 'preact';
import { useLayoutEffect } from 'preact/hooks';

import { fireEvent, render, screen } from '@testing-library/preact';

import { EventBusProvider, useEventBus } from '@src/contexts/eventBus';
import { EventBus, EventBusImpl } from '@src/utils/eventBus';

describe('Event Bus Context', () => {
  let eventBus: EventBus<any>;
  let mockHandler: jest.Mock;

  const wrapper: FunctionComponent = ({ children }) => (
    <EventBusProvider value={eventBus}>{children}</EventBusProvider>
  );
  const Component: FunctionComponent<{
    handler: (...args: any[]) => any;
    fireOnce?: boolean;
  }> = ({ handler, fireOnce = false }) => {
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
    render(<Component handler={mockHandler} />, { wrapper });

    const fireButton = screen.getByText(/fire event/i);
    fireEvent.click(fireButton);
    fireEvent.click(fireButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });

  it('should fire event once when needed', () => {
    render(<Component handler={mockHandler} fireOnce={true} />, { wrapper });

    const fireButton = screen.getByText(/fire event/i);
    fireEvent.click(fireButton);
    fireEvent.click(fireButton);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('should be able to remove registered event', () => {
    render(<Component handler={mockHandler} />, { wrapper });

    const fireButton = screen.getByText(/fire event/i);
    const removeButton = screen.getByText(/remove event/i);
    fireEvent.click(fireButton);
    fireEvent.click(removeButton);
    fireEvent.click(fireButton);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
