import { closest, getRelativePosition } from '@src/utils/dom';

it('closest', () => {
  const depth0 = document.createElement('div');
  depth0.classList.add('depth-0');

  const depth1 = document.createElement('div');
  depth1.classList.add('depth-1');

  const depth2 = document.createElement('div');
  depth2.classList.add('depth-2');

  depth1.appendChild(depth2);
  depth0.appendChild(depth1);

  expect(closest(depth2, '.depth-0')).toEqual(depth0);
  expect(closest(depth2, '.depth-1')).toEqual(depth1);
  expect(closest(depth0, '.no-depth')).toBe(null);
});

describe('domEvent', () => {
  const el = document.createElement('div');

  el.style.position = 'absolute';
  el.style.top = '0';
  el.style.left = '10px';
  el.style.height = '100px';
  el.style.width = '70px';

  it('getMousePosition', () => {
    el.getBoundingClientRect = jest.fn(
      () =>
        ({
          width: 100,
          height: 70,
          left: 10,
          top: 10,
        } as DOMRect)
    );

    expect(getRelativePosition([30, 50], el)).toEqual([20, 40]);
  });
});
