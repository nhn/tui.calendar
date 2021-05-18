import { closest } from '@src/util/domutil';

describe('Dom Util', () => {
  it('closest', () => {
    const div = document.createElement('div');
    div.classList.add('depth-0');

    const div1 = document.createElement('div');
    div1.classList.add('depth-1');

    const div2 = document.createElement('div');
    div2.classList.add('depth-2');

    div1.appendChild(div2);
    div.appendChild(div1);

    expect(closest(div2, '.depth-0')).toEqual(div);
    expect(closest(div2, '.depth-1')).toEqual(div1);
    expect(closest(div, '.no-depth')).toBe(null);
  });
});
