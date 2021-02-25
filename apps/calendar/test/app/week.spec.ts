import Week from '@src/factory/week';

describe('View/Week', () => {
  it('Week view', () => {
    // import test
    const week = new Week(document.createElement('div'));

    expect(week.renderToString()).toBe('<h2>Week View</h2>');
  });
});
