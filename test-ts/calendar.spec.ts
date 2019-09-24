import Calendar from '@src/calendar';

describe('View/Calendar', () => {
  it('Calendar view', () => {
    const data = 1;

    expect(data).toBe(1);

    // import test
    const calendar = new Calendar();

    expect(calendar.render() instanceof Calendar).toBe(true);
  });
});
