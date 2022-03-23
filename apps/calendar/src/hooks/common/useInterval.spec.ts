import { useInterval } from '@src/hooks/common/useInterval';
import { renderHook } from '@src/test/utils';

let callback: jest.Mock;
let setIntervalSpy: jest.SpyInstance;

beforeEach(() => {
  callback = jest.fn();
  setIntervalSpy = jest.spyOn(global, 'setInterval');
});

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  callback.mockRestore();
  setIntervalSpy.mockClear();
  jest.clearAllTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

it('should init hook', () => {
  // Given
  const delay = 1000;

  // When
  const { result } = renderHook(() => useInterval(callback, delay));

  // Then
  expect(result.current).toBeUndefined();
  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), delay);
});

it('should not init hook if delay is null', () => {
  // Given
  const delay = null;

  // When
  const { result } = renderHook(() => useInterval(callback, delay));

  // Then
  expect(result.current).toBeUndefined();
  expect(setInterval).not.toHaveBeenCalled();
});

it('should repeatedly call provided callback with a delay', () => {
  // Given
  const delay = 1000;
  renderHook(() => useInterval(callback, delay));

  // When
  jest.advanceTimersByTime(delay);

  // Then
  expect(callback).toHaveBeenCalledTimes(1);

  // When
  jest.advanceTimersByTime(delay);

  // Then
  expect(callback).toHaveBeenCalledTimes(2);
});

it('should update interval if delay changes', () => {
  // Given
  let delay = 1000;
  const { rerender } = renderHook(() => useInterval(callback, delay));

  jest.advanceTimersByTime(delay);
  expect(callback).toHaveBeenCalledTimes(1);

  // When
  delay = 2000;
  rerender();

  // Then
  // New interval should be created. so the callback is not called yet with the previous delay.
  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalledTimes(1);

  // fast-forward remaining time for the new delay.
  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalledTimes(2);
});

it('should stop calling callback if delay is changed to null', () => {
  // Given
  let delay: number | null = 1000;
  const { rerender } = renderHook(() => useInterval(callback, delay));

  jest.advanceTimersByTime(delay);
  expect(callback).toHaveBeenCalledTimes(1);

  // When
  delay = null;
  rerender();

  // Then
  // Even though the time is advanced, the callback is not called.
  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalledTimes(1);
});

it('should stop calling provided callback when unmounted', () => {
  // Given
  const delay = 1000;
  const { unmount } = renderHook(() => useInterval(callback, delay));

  jest.advanceTimersByTime(delay);
  expect(callback).toHaveBeenCalledTimes(1);

  // When
  unmount();
  jest.advanceTimersByTime(delay);

  // Then
  expect(callback).toHaveBeenCalledTimes(1);
});
