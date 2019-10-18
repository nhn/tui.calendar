import Week from '@src/factory/week';

describe('View/Week', () => {
  it('Week view', () => {
    const data = 1;

    expect(data).toBe(1);

    // import test
    const week = new Week(document.createElement('div'));

    expect(week.renderToString()).toBe('<h2>Week View</h2>');
  });
});
