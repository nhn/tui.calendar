import { Fragment, FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { expect } from '@playwright/test';
import { fireEvent, render, screen } from '@testing-library/preact';

import { EventBusProvider } from '@src/contexts/eventBus';
import { useCustomEvent } from '@src/hooks/common/customEvent';
import { EventBus, EventBusImpl } from '@src/utils/eventBus';

describe('useCustomEvent', () => {
  const TEST_EVENT_NAME = 'test';
  let eventBus: EventBus<any>;
  let mockHandler: jest.Mock;

  const wrapper: FunctionComponent = ({ children }) => (
    <EventBusProvider value={eventBus}>{children}</EventBusProvider>
  );
  const Component: FunctionComponent<{
    handler: (...args: any[]) => any;
    fireOnce?: boolean;
  }> = ({ handler, fireOnce = false }) => {
    const fire = useCustomEvent(TEST_EVENT_NAME, handler, fireOnce);

    return <button onClick={fire}>Fire Event</button>;
  };

  beforeEach(() => {
    eventBus = new EventBusImpl<any>();
    mockHandler = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register custom event handler', () => {
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

  it('should unregister custom event handler when the component is unmounted', () => {
    const Parent: FunctionComponent = () => {
      const [isComponentVisible, setIsComponentVisible] = useState(true);

      return (
        <Fragment>
          {isComponentVisible ? <Component handler={mockHandler} /> : null}
          <button onClick={() => setIsComponentVisible(false)}>Unmount component</button>
        </Fragment>
      );
    };

    render(<Parent />, { wrapper });

    const fireButton = screen.getByText(/fire event/i);
    fireEvent.click(fireButton);
    expect(mockHandler).toHaveBeenCalledTimes(1);

    const unmountButton = screen.getByText(/unmount component/i);
    fireEvent.click(unmountButton);

    eventBus.fire(TEST_EVENT_NAME);

    expect(mockHandler).not.toHaveBeenCalledTimes(3);
  });
});
