import TimezoneDate, { getTimezoneOffset, setTimezoneOffset } from '@src/time/timezoneDate';

describe('TimezoneDate argument type test', () => {
  it('createFromDate() can create an instance from Date instance', () => {
    const tzDate = TimezoneDate.createFromDate(new Date());

    expect(tzDate.date).not.toBeNull();
    expect(tzDate.date instanceof Date).toBe(true);
  });

  it('can create an instance from multiple arguments like (2020, 1, 7, 11, 47, 23, 222) and Date constructor', () => {
    const tzDate = new TimezoneDate(2020, 1, 7, 11, 47, 23, 222);

    expect(tzDate.date).not.toBeNull();
    expect(tzDate.date instanceof Date).toBe(true);
  });

  it(`If no arguments, it should have Date.now`, () => {
    const tzDate = new TimezoneDate();

    expect(tzDate.date).not.toBeNull();
    expect(tzDate.date instanceof Date).toBe(true);
  });

  it('can create an instance fromm TimezoneDate instance', () => {
    const tzDate = new TimezoneDate(2020, 1, 7, 11, 47, 23, 222);
    const tzDate2 = new TimezoneDate(tzDate);

    expect(tzDate.date.getTime()).toBe(tzDate2.date.getTime());
  });

  it(`should throw error when creating an instance from Date instance`, () => {
    expect(() => new TimezoneDate(new Date())).toThrowError();
    expect(() => new TimezoneDate(1)).toThrowError();
  });

  it(`If arguments is invalid date instance, 'valid' property should return false or return true`, () => {
    const tzDate = TimezoneDate.createFromDate(new Date('invalid'));

    expect(tzDate.valid).toBe(false);
    expect(new TimezoneDate().valid).toBe(true);
  });
});

describe('TimezoneDate', () => {
  const currentTimezoneOffset = new Date().getTimezoneOffset();

  beforeEach(() => {
    setTimezoneOffset(currentTimezoneOffset);
  });

  it('getTimezoneOffset() should returns timezone offset of TimezoneDate and Date', () => {
    const tzDate = new TimezoneDate();
    const tzDateOffset = getTimezoneOffset(tzDate);
    const dateOffset = getTimezoneOffset(new Date(tzDate.date.getTime()));
    expect(tzDateOffset).toBe(dateOffset);
  });

  it('setTimezoneOffset() should change timezone offset based on utc', () => {
    // const timezoneOff
    const tzDate = new TimezoneDate();
  });
});
