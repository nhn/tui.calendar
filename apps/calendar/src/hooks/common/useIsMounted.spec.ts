import { useIsMounted } from '@src/hooks/common/useIsMounted';
import { act, cleanup, renderHook } from '@src/test/utils';

afterEach(cleanup);

it('returns true when the hook is mounted', () => {
  // When
  const { result } = renderHook(() => useIsMounted());

  // Then
  expect(result.current?.()).toBe(true);
});

it('returns false when the hook is unmounted', () => {
  // Given
  const { result, unmount } = renderHook(() => useIsMounted());
  expect(result.current?.()).toBe(true);

  // When
  act(() => {
    unmount();
  });

  // Then
  expect(result.current?.()).toBe(false);
});
