import moment from 'moment-timezone';
import MomentDate from '../src/momentDate';

describe('MomentDate based on moment-timezone', () => {
  beforeEach(() => {
    MomentDate.setMoment(moment);
  });

  test('setTimezoneName() should set a timezone name if having moment-timezone', () => {
    const timezoneName = 'US/Pacific';
    const pst = 480;
    const pdt = 420;
    const jun = new MomentDate('2020-06-01T00:00:00').setTimezoneName(timezoneName);
    const dec = new MomentDate('2020-12-01T00:00:00').setTimezoneName(timezoneName);
    const utc = new MomentDate('2020-12-01T00:00:00').setTimezoneName('Etc/UTC');

    expect(jun.getTimezoneOffset()).toBe(pdt);
    expect(dec.getTimezoneOffset()).toBe(pst);
    expect(utc.getTimezoneOffset()).toBe(0);
  });
});
