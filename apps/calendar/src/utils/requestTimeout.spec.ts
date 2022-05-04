import { noop } from '@src/utils/noop';
import { requestTimeout } from '@src/utils/requestTimeout';

describe('requestTimeout', () => {
  let fn: jest.Mock;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    fn = jest.fn();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should execute the callback function after a specific time.', () => {
    // Given
    const delay = 1000;
    requestTimeout(fn, delay, noop);

    expect(fn).not.toHaveBeenCalled();

    // When
    jest.advanceTimersByTime(delay + 30);

    // Then
    expect(fn).toHaveBeenCalled();
  });

  it('should execute the callback function only one time.', () => {
    // Given
    const delay = 100;
    requestTimeout(fn, delay, noop);

    // When
    jest.advanceTimersByTime(delay * 3);

    // Then
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
