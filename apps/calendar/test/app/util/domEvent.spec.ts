import { getRelativePosition } from '@src/util/dom';

describe('domEvent', () => {
  const el = document.createElement('div');

  el.style.position = 'absolute';
  el.style.top = '0';
  el.style.left = '10px';
  el.style.height = '100px';
  el.style.width = '70px';

  it('getMousePosition', () => {
    const getBoundingClientRectSpy = jest.fn(
      () =>
        ({
          width: 100,
          height: 70,
          left: 10,
          top: 10,
        } as DOMRect)
    );
    el.getBoundingClientRect = getBoundingClientRectSpy;

    expect(getRelativePosition([30, 50], el)).toEqual([20, 40]);
  });
});
