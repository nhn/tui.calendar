import Calendar from '@src/factory/calendar';

describe('View/Calendar', () => {
  it('Calendar view', () => {
    const data = 1;

    expect(data).toBe(1);

    // import test
    const calendar = new Calendar(document.createElement('div'));

    expect(calendar.render() instanceof Calendar).toBe(true);
  });
});
