import Month from '@src/factory/month';

describe('View/Month', () => {
  it('Month view', () => {
    const data = 1;

    expect(data).toBe(1);

    // import test
    const month = new Month(document.createElement('div'));

    expect(month.render() instanceof Month).toBe(true);
  });
});
