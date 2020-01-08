const MIN_TO_MS = 60 * 1000;

export function getTimezoneOffset(date: TimezoneDate | Date = new Date()) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  if (date instanceof TimezoneDate) {
    ({ date } = date);
  }

  const minutes = date.getTimezoneOffset();

  return minutes * MIN_TO_MS;
}

const currentTimezoneOffset = getTimezoneOffset(new Date());
let customTimezoneOffset = currentTimezoneOffset;

export function setTimezoneOffset(minutes: number) {
  customTimezoneOffset = minutes * MIN_TO_MS;
}

function getTimezoneOffsetDiff() {
  return currentTimezoneOffset - customTimezoneOffset;
}

export default class TimezoneDate {
  private _date: Date;

  static createFromDate(date: Date) {
    const tzDate = new TimezoneDate();
    const time = date.getTime();
    const offsetDiff = getTimezoneOffsetDiff();

    tzDate.date.setTime(time + offsetDiff);

    return tzDate;
  }

  constructor(...args: any[]) {
    let date = null;

    if (!args.length) {
      date = new Date();
    } else if (args[0] instanceof TimezoneDate) {
      const [_tzDate] = args;
      date = new Date(_tzDate.date.getTime());
    } else if (args.length > 1) {
      const [year, month] = args;
      date = new Date(year, month, ...args.slice(2));
    } else {
      throw new TypeError(`TimezoneDate doesn't support this type ${args}`);
    }

    this._date = date;
  }

  get date() {
    return this._date;
  }

  get valid() {
    return !isNaN(this.date.getDate());
  }
}
