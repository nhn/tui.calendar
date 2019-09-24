import Month from '@src/month.tsx';

describe('View/Month', () => {
  it('Month view', () => {
    const data = 1;

    expect(data).toBe(1);

    // import test
    const month = new Month(document.createElement('div'));

    expect(month.renderToString()).toBe('<h2>Month View</h2>');
  });
});
