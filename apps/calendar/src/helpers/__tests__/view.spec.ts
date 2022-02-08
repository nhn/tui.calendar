import { createMousePositionDataGrabber, MousePositionDataGrabber } from '@src/helpers/view';
import { noop } from '@src/utils/noop';

describe('createMousePositionDataGrabber', () => {
  const container = document.createElement('div');
  let grabber: MousePositionDataGrabber;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('In Month', () => {
    it('should calculate gridX and gridY', () => {
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

      grabber = createMousePositionDataGrabber({
        columnsCount: 7,
        rowsCount: 2,
        container,
      });
      const cases = [
        {
          clientX: 9,
          clientY: 20,
          expected: {
            gridX: 0,
            gridY: 0,
          },
        },
        {
          clientX: 55,
          clientY: 60,
          expected: {
            gridX: 5,
            gridY: 1,
          },
        },
      ];

      // When
      const results = cases.map(({ clientX, clientY }) => grabber({ clientX, clientY }));

      // Then
      results.forEach((result, index) => {
        expect(result).toEqual({
          ...cases[index].expected,
          x: cases[index].clientX,
          y: cases[index].clientY,
        });
      });
    });
  });

  describe('In Week', () => {
    it('should calculate gridX and gridY', () => {
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

      grabber = createMousePositionDataGrabber({
        columnsCount: 7,
        rowsCount: 1,
        container,
      });

      const cases = [
        {
          clientX: 0,
          clientY: 20,
          expected: {
            gridX: 0,
            gridY: 0,
          },
        },
        {
          clientX: 100,
          clientY: 40,
          expected: {
            gridX: 1,
            gridY: 0,
          },
        },
        {
          clientX: 390,
          clientY: 50,
          expected: {
            gridX: 4,
            gridY: 0,
          },
        },
        {
          clientX: 500,
          clientY: 60,
          expected: {
            gridX: 6,
            gridY: 0,
          },
        },
      ];

      // When
      const results = cases.map(({ clientX, clientY }) => grabber({ clientX, clientY }));

      // Then
      results.forEach((result, index) => {
        expect(result).toEqual({
          ...cases[index].expected,
          x: cases[index].clientX,
          y: cases[index].clientY,
        });
      });
    });
  });

  describe('In TimeGrid', () => {
    it('should calculate gridX and gridY', () => {
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

      grabber = createMousePositionDataGrabber({
        columnsCount: 7,
        rowsCount: 48,
        container,
      });

      const cases = [
        {
          clientX: 0,
          clientY: 0,
          expected: {
            gridX: 0,
            gridY: 0,
          },
        },
        {
          clientX: 250,
          clientY: 130,
          expected: {
            gridX: 2,
            gridY: 6,
          },
        },
        {
          clientX: 450,
          clientY: 230,
          expected: {
            gridX: 4,
            gridY: 11,
          },
        },
        {
          clientX: 650,
          clientY: 450,
          expected: {
            gridX: 6,
            gridY: 22,
          },
        },
        {
          clientX: 700,
          clientY: 720,
          expected: {
            gridX: 6,
            gridY: 36,
          },
        },
        {
          clientX: 700,
          clientY: 730,
          expected: {
            gridX: 6,
            gridY: 36,
          },
        },
        {
          clientX: 700,
          clientY: 935,
          expected: {
            gridX: 6,
            gridY: 46,
          },
        },
        {
          clientX: 700,
          clientY: 960,
          expected: {
            gridX: 6,
            gridY: 47,
          },
        },
      ];

      // When
      const results = cases.map(({ clientX, clientY }) =>
        grabber({
          clientX,
          clientY,
        })
      );

      // Then
      results.forEach((result, index) => {
        expect(result).toEqual({
          ...cases[index].expected,
          x: cases[index].clientX,
          y: cases[index].clientY,
        });
      });
    });
  });
});
