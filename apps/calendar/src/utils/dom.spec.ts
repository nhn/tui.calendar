import { closest } from '@src/utils/dom';

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
