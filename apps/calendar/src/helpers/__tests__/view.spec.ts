import { createGridPositionFinder, GridPositionFinder } from '@src/helpers/view';
import { noop } from '@src/utils/noop';

import { GridPosition } from '@t/grid';

describe('createGridPositionFinder', () => {
  const container = document.createElement('div');
  let finder: GridPositionFinder;

  function assertGridPosition(results: GridPosition[], expected: GridPosition[]) {
    expect(results.length).toBe(expected.length);
    results.forEach((result, index) => {
      expect(result).toEqual(expected[index]);
    });
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be null returning function if container is null', () => {
    // Given
    finder = createGridPositionFinder({
      columnsCount: 7,
      rowsCount: 6,
      container: null,
    });

    // When
    const result = finder({ clientX: 100, clientY: 100 });

    // Then
    expect(result).toBeNull();
  });

  it('should return null if mouse position is out of container', () => {
    // Given
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 100,
      height: 100,
      toJSON: noop,
    });

    finder = createGridPositionFinder({
      columnsCount: 7,
      rowsCount: 6,
      container,
    });

    const wrongCases = [
      { clientX: -1, clientY: -1 },
      { clientX: -1, clientY: 50 },
      { clientX: 50, clientY: -1 },
      { clientX: 50, clientY: 101 },
      { clientX: 101, clientY: 101 },
      { clientX: 101, clientY: 50 },
      { clientX: 101, clientY: -1 },
      { clientX: 50, clientY: -1 },
    ];

    // When
    const results = wrongCases.map(({ clientX, clientY }) => finder({ clientX, clientY }));

    // Then
    results.forEach((result) => expect(result).toBeNull());
  });

  it('should calculate x & y coords in grid in month', () => {
    // Given
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 70,
      height: 100,
      toJSON: noop,
    });
    finder = createGridPositionFinder({
      columnsCount: 7,
      rowsCount: 2,
      container,
    });
    const cases = [
      {
        clientX: 9,
        clientY: 20,
        expected: {
          x: 0,
          y: 0,
        },
      },
      {
        clientX: 55,
        clientY: 60,
        expected: {
          x: 5,
          y: 1,
        },
      },
    ];

    // When
    const results = cases.map(({ clientX, clientY }) => finder({ clientX, clientY }));

    // Then
    assertGridPosition(
      results as GridPosition[],
      cases.map(({ expected }) => expected)
    );
  });

  it('should calculate x & y coords in grid in week', () => {
    // Given
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 560,
      height: 100,
      toJSON: noop,
    });

    finder = createGridPositionFinder({
      columnsCount: 7,
      rowsCount: 1,
      container,
    });

    const cases = [
      {
        clientX: 0,
        clientY: 20,
        expected: {
          x: 0,
          y: 0,
        },
      },
      {
        clientX: 100,
        clientY: 40,
        expected: {
          x: 1,
          y: 0,
        },
      },
      {
        clientX: 390,
        clientY: 50,
        expected: {
          x: 4,
          y: 0,
        },
      },
      {
        clientX: 500,
        clientY: 60,
        expected: {
          x: 6,
          y: 0,
        },
      },
    ];

    // When
    const results = cases.map(({ clientX, clientY }) => finder({ clientX, clientY }));

    // Then
    assertGridPosition(
      results as GridPosition[],
      cases.map(({ expected }) => expected)
    );
  });

  it('should calculate x & y coords in grid in time grid', () => {
    // Given
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 700,
      height: 960,
      toJSON: noop,
    });

    finder = createGridPositionFinder({
      columnsCount: 7,
      rowsCount: 48,
      container,
    });

    const cases = [
      {
        clientX: 0,
        clientY: 0,
        expected: {
          x: 0,
          y: 0,
        },
      },
      {
        clientX: 250,
        clientY: 130,
        expected: {
          x: 2,
          y: 6,
        },
      },
      {
        clientX: 450,
        clientY: 230,
        expected: {
          x: 4,
          y: 11,
        },
      },
      {
        clientX: 650,
        clientY: 450,
        expected: {
          x: 6,
          y: 22,
        },
      },
      {
        clientX: 700,
        clientY: 720,
        expected: {
          x: 6,
          y: 36,
        },
      },
      {
        clientX: 700,
        clientY: 730,
        expected: {
          x: 6,
          y: 36,
        },
      },
      {
        clientX: 700,
        clientY: 935,
        expected: {
          x: 6,
          y: 46,
        },
      },
      {
        clientX: 700,
        clientY: 960,
        expected: {
          x: 6,
          y: 47,
        },
      },
    ];

    // When
    const results = cases.map(({ clientX, clientY }) =>
      finder({
        clientX,
        clientY,
      })
    );

    // Then
    assertGridPosition(
      results as GridPosition[],
      cases.map(({ expected }) => expected)
    );
  });
});
