# TZDate

## Description

TZDate is a custom date class created to handle timezones. When creating an event, the event start date or end date can be specified with TZDate, and the date and time-related values in the calendar API are returned as TZDate.

```js
import Calendar, { TZDate } from '@toast-ui/calendar';

const calendar = new Calendar('#container');
calendar.createEvents([
  {
    id: '1',
    calendarId: 'cal1',
    title: 'event',
    start: new TZDate('2022-06-01T10:00:00'), // TZDate
    end: new TZDate('2022-06-01T11:00:00'), // TZDate
  },
]);

console.log(calendar.getDate()); // TZDate
console.log(calendar.getEvent('1', 'cal1').start); // TZDate
```

## Creating Instance

- Type
  - `new TZDate(date?: number | string | Date | TZDate)`
  - `new TZDate(year: number, monthIndex: number, day?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number)`
- Parameters
  - `date` or individual date and time components: values representing the date and time

TZDate can be created with the following parameters.

1. Without parameters: Without parameters, a TZDate instance with the date and time of creation is created.
2. UNIX timestamp value
3. Timestamp string
4. Individual date and time components
5. Date instance
6. TZDate instance

Except for the TZDate instance, the rest of the parameters are the same as the `Date()` constructor parameters, so refer to [`Date()` constructor parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#parameters) for details.

```js
import { TZDate } from '@toast-ui/calendar';

const now = new TZDate(); // no parameters
const date = new TZDate(1654052400000); // UNIX timestamp value
const date1 = new TZDate('2022-06-01T12:00:00'); // timestamp string
const date2 = new TZDate(2022, 5, 1, 12, 0, 0, 0); // individual date and time components const now1 = new TZDate(new Date()); // Date instance
const now2 = new TZDate(new TZDate()); // TZDate instance
```

## Instance methods

💡 Click on a method to see more detailed explanations and usage examples.

| Method                                  | Description                                                                                                                                    |
| --------------------------------------- |------------------------------------------------------------------------------------------------------------------------------------------------|
| [toString](#tostring)                   | Returns the date and time of the TZDate instance as a string.                                                                                  |
| [toDate](#todate)                       | Returns the date and time of the TZDate instance as a Date object.                                                                             |
| [valueOf](#valueof)                     | Returns the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the TZDate instance.                               |
| [addFullYear](#addfullyear)             | Adds years by a given numeric value.                                                                                                           |
| [addMonth](#addmonth)                   | Adds months by a given numeric value.                                                                                                          |
| [addDate](#adddate)                     | Adds a number of days to a given numeric value.                                                                                                |
| [addHours](#addhours)                   | Adds hours by a given numeric value.                                                                                                           |
| [addMinutes](#addminutes)               | Adds minutes to a given numeric value.                                                                                                         |
| [addSeconds](#addseconds)               | Adds seconds to the given numeric value.                                                                                                       |
| [addMilliseconds](#addmilliseconds)     | Adds milliseconds to a given numeric value.                                                                                                    |
| [getTime](#gettime)                     | Returns the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the TZDate instance.                               |
| [getFullYear](#getfullyear)             | Returns the year of the TZDate instance date and time.                                                                                         |
| [getMonth](#getmonth)                   | Returns the month of the TZDate instance date and time. Month is a zero-based value. (for example, `2` in case of March)                       |
| [getDate](#getdate)                     | Returns the day of the TZDate instance date and time.                                                                                          |
| [getDay](#getday)                       | Returns a numeric value corresponding to the day of the week of the TZDate instance date and time. 0 represents Sunday.                        |
| [getHours](#gethours)                   | Returns the hours of the TZDate instance date and time.                                                                                        |
| [getMinutes](#getminutes)               | Returns the minutes of the TZDate instanc date and timee.                                                                                      |
| [getSeconds](#getseconds)               | Returns the seconds of the TZDate instanc date and timee.                                                                                      |
| [getMilliseconds](#getmilliseconds)     | Returns the milliseconds of the TZDate instanc date and timee.                                                                                 |
| [getTimezoneOffset](#gettimezoneoffset) | Returns the timezone offset of the TZDate instance in minutes.                                                                                 |
| [setWithRaw](#setwithraw)               | Sets the day and time of the TZDate instance with individual date and time components.                                                         |
| [setTime](#settime)                     | Sets the TZDate instance date and time in milliseconds since January 1, 1970 UTC.                                                              |
| [setFullYear](#setfullyear)             | Sets the year and the date of the TZDate instance as a given numeric value.                                                                    |
| [setMonth](#setmonth)                   | Sets the month of the TZDate instance date and time as a given numeric value. Month is a zero-based value. (for example, `2` in case of March) |
| [setDate](#setdate)                     | Sets the date of the TZDate instance date and time as a given numeric value.                                                                   |
| [setHours](#sethours)                   | Sets the hours of the TZDate instance date and time as a given numeric value.                                                                  |
| [setMinutes](#setminutes)               | Sets the minutes of the TZDate instance date and time as a given numeric value.                                                                |
| [setSeconds](#setseconds)               | Sets the seconds of the TZDate instance date and time as a given numeric value.                                                                |
| [setMilliseconds](#setmilliseconds)     | Sets the milliseconds of the TZDate instance as a given numeric value.                                                                         |
| [tz](#tz)                               | Returns a new TZDate instance following the given timezone.                                                                                    |
| [local](#local)                         | Returns a new TZDate instance following the system timezone.                                                                                   |

### toString

- Type: `toString(): string`
- Returns: `string` - a string representing the date and time of the TZDate instance

Returns the TZDate instance date and time as a string. It has the same format as [the `toString()` function of the Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString).

[⬆️ Back to the list](#instance-methods)

### toDate

- Type: `toDate(): Date`
- Returns: `Date` - a Date object representing the date and time of the TZDate instance

Returns the date and time of the TZDate instance as a native Date object.

[⬆️ Back to the list](#instance-methods)

### valueOf

- Type: `valueOf(): number`
- Returns the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the TZDate instance.

Returns the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the TZDate instance.

[⬆️ Back to the list](#instance-methods)

### addFullYear

- Type: `addFullYear(y: number): TZDate`
- Parameters
  - `y` - the number of years to add
- Returns: `TZDate` - changed TZDate

Adds years by a given numeric value. Changes an existing TZDate instance and returns it.

[⬆️ Back to the list](#instance-methods)

### addMonth

- Type: `addFullYear(y: number): TZDate`
- Parameters
  - `y` - the number of years to add
- Returns: `TZDate` - changed TZDate

Adds months by a given numeric value. Changes an existing TZDate instance and returns it.

[⬆️ Back to the list](#instance-methods)

### addDate

- Type: `addDate(d: number): TZDate`
- Parameters
  - `d` - the number of days to append
- Returns: `TZDate` - changed TZDate

Adds a number of days to a given numeric value. Changes an existing TZDate instance and returns it.

[⬆️ Back to the list](#instance-methods)

### addHours

- Type: `addHours(h: number): TZDate`
- Parameters
  - `h` - the number of times to append
- Returns: `TZDate` - changed TZDate

Adds hours by a given numeric value. Changes an existing TZDate instance and returns it.

[⬆️ Back to the list](#instance-methods)

### addMinutes

- Type: `addMinutes(M: number): TZDate`
- Parameters
  - `M` - the number of minutes to add
- Returns: `TZDate` - changed TZDate

Adds minutes to a given numeric value. Changes an existing TZDate instance and returns it.

[⬆️ Back to the list](#instance-methods)

### addSeconds

- Type: `addSeconds(s: number): TZDate`
- Parameters
  - `M` - the number of seconds to add
- Returns: `TZDate` - changed TZDate

Adds seconds to the given numeric value. Changes an existing TZDate instance and returns it.

[⬆️ Back to the list](#instance-methods)

### addMilliseconds

- Type: `addMilliseconds(ms: number): TZDate`
- Parameters
  - `ms` - the number of milliseconds to add
- Returns: `TZDate` - changed TZDate

Adds milliseconds to a given numeric value. Changes an existing TZDate instance and returns it.

[⬆️ Back to the list](#instance-methods)

### getTime

- Type: `getTime(): number`
- Returns the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the TZDate instance.

Returns the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the TZDate instance.

[⬆️ Back to the list](#instance-methods)

### getFullYear

- Type: `getFullYear(): number`
- Returns: `number` - the year of the date and time of the TZDate instance

Returns the year of the TZDate instance date and time.

[⬆️ Back to the list](#instance-methods)

### getMonth

- Type: `getMonth(): number`
- Returns: `number` - the month of the date and time of the TZDate instance

Returns the month of the TZDate instance date and time. Month is a zero-based value. (ex. `2` in case of March)

[⬆️ Back to the list](#instance-methods)

### getDate

- Type: `getDate(): number`
- Returns: `number` - the day of the TZDate instance date and time

Returns the day of the TZDate instance.

[⬆️ Back to the list](#instance-methods)

### getDay

- Type: `getDay(): number`
- Returns: `number` - a numeric value corresponding to the day of the week for the date and time of the TZDate instance

Returns a numeric value corresponding to the day of the week of the TZDate instance date and time. 0 represents Sunday.

[⬆️ Back to the list](#instance-methods)

### getHours

- Type: `getHours(): number`
- Returns: `number` - the hours of the TZDate instance date and time

Returns the hours of the TZDate instance date and time.

[⬆️ Back to the list](#instance-methods)

### getMinutes

- Type: `getMinutes(): number`
- Returns: `number` - the minutes of the TZDate instance date and time

Returns the minutes of the TZDate instance date and time.

[⬆️ Back to the list](#instance-methods)

### getSeconds

- Type: `getSeconds(): number`
- Returns: `number` - the seconds of the date and time of the TZDate instance

Returns the seconds of the TZDate instance date and time.

[⬆️ Back to the list](#instance-methods)

### getMilliseconds

- Type: `getMilliseconds(): number`
- Returns: `number` - the milliseconds of the date and time of the TZDate instance

Returns the milliseconds of the TZDate instance date and time.

[⬆️ Back to the list](#instance-methods)

### getTimezoneOffset

- Type: `getTimezoneOffset(): number`
- Returns: `number` - the timezone offset of the TZDate instance in minutes

Returns the timezone offset of the TZDate instance in minutes.

[⬆️ Back to the list](#instance-methods)

### setWithRaw

- Type: `setWithRaw(y: number, m: number, d: number, h: number, M: number, s: number, ms: number): TZDate`
- Parameters
  - `y` : a year to specify
  - `m` : a month to specify
  - `d` : a day to specify
  - `h` : hours to specify
  - `M` : minutes to specify
  - `s` : seconds to specify
  - `ms` : milliseconds to specify
- Returns: `TZDate` - changed TZDate

Specifies the date and time of the TZDate instance with individual date and time components. Changes an existing TZDate instance and returns it.

[⬆️ Back to the list](#instance-methods)

### setTime

- Type: `setTime(t: number): number`
- Parameters
  - `t` : the number of milliseconds since January 1, 1970 UTC to specify
- Returns: `number` - the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the changed TZDate instance.

Set the TZDate instance date and time with the elapsed time(in milliseconds) since January 1, 1970 UTC. Changes an existing TZDate instance.

[⬆️ Back to the list](#instance-methods)

### setFullYear

- Type: `setFullYear(y: number, m?: number, d?: number): number`
- Parameters
  - `y` : a year to specify
  - `m` : The month to specify. If not specified, the month of the existing TZDate instance date and time is maintained.
  - `d` : The day to specify. If not specified, the day of the existing TZDate instance is maintained.
- Returns: `number` - the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the changed TZDate instance.

Specifies the year of the date and time of the TZDate instance as a given numeric value. You can additionally specify the month and date. Change an existing TZDate instance.

[⬆️ Back to the list](#instance-methods)

### setMonth

- Type: `setMonth(m: number, d?: number): number`
- Parameters
  - `m` : a month to specify
  - `d` : The day to specify. If not specified, the day of the existing TZDate instance is maintained.
- Returns: `number` - the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the changed TZDate instance.

Specifies the month of the date and time of the TZDate instance as a given numeric value. Month is a zero-based value. (for example, `2` in case of March) The day can also be additionally specified. Changes an existing TZDate instance.

[⬆️ Back to the list](#instance-methods)

### setDate

- Type: `addDate(d: number): TZDate`
- Parameters
  - `d` : a day to specify
- Returns: `number` - the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the changed TZDate instance.

Specifies the day of the TZDate instance as a given numeric value. Changes an existing TZDate instance.

[⬆️ Back to the list](#instance-methods)

### setHours

- Type: `setHours(h: number, M?: number, s?: number, ms?: number): number`
- Parameters
  - `h` : hours to specify
  - `M` : minutes to specify. If not specified, the minutes of the existing TZDate instance date and time are maintained.
  - `s` : seconds to specify. If not specified, the seconds of the existing TZDate instance date and time are maintained.
  - `ms` : milliseconds to specify. If not specified, the milliseconds of the old TZDate instance date and time are maintained.
- Returns: `number` - the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the changed TZDate instance.

Specifies the hour of the TZDate instance date and time as a given numeric value. You can additionally specify minutes, seconds, and milliseconds. Changes an existing TZDate instance.TZDate

[⬆️ Back to the list](#instance-methods)

### setMinutes

- Type: `setMinutes(M: number, s?: number, ms?: number): number`
- Parameters
  - `M` : minutes to specify
  - `s` : seconds to specify. If not specified, the seconds of the existing TZDate instance date and time are maintained.
  - `ms` : milliseconds to specify. If not specified, the milliseconds of the old TZDate instance date and time are maintained.
- Returns: `number` - the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the changed TZDate instance.

Specifies the minute of the TZDate instance date and time as a given numeric value. Seconds and milliseconds can be additionally specified. Changes an existing TZDate instance.

[⬆️ Back to the list](#instance-methods)

### setSeconds

- Type: `setSeconds(s: number, ms?: number): number`
- Parameters
  - `s` : seconds to specify
  - `ms` : milliseconds to specify. If not specified, the milliseconds of the old TZDate instance date and time are maintained.
- Returns: `number` - the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the changed TZDate instance.

Specifies the second of the TZDate instance date and time as a given numeric value. You can also specify additional milliseconds. Changes an existing TZDate instance.

[⬆️ Back to the list](#instance-methods)

### setMilliseconds

- Type: `setMilliseconds(ms: number): number`
- Parameters
  - `ms` : milliseconds to specify
- Returns: `number` - the elapsed time (in milliseconds) from January 1, 1970 UTC to the date and time of the changed TZDate instance.

Specifies the number of milliseconds of the date and time of the TZDate instance as a given numeric value. Changes an existing TZDate instance.

[⬆️ Back to the list](#instance-methods)

### tz

- Type: `tz(tzValue: string | 'Local' | number): TZDate`
- Parameters
  - `tzValue` : timezone to specify
- Returns: `TZDate` - a new TZDate instance following the given timezone.

Returns a new TZDate instance following the given timezone. `tzValue` can be specified as the timezone name of the [IANA time zone database](https://www.iana.org/time-zones), the timezone offset numeric value, and `'Local'`. If `'Local'` is specified, the system timezone is followed. It does not change the existing TZDate instance, but returns a new TZDate instance.

[⬆️ Back to the list](#instance-methods)

### local

- Type: `local(tzValue?: string | number): TZDate`
- Parameters
  - `tzValue` : The timezone the TZDate instance follows. If not specified, it is calculated based on the time zone of the TZDate instance.
- Returns: `TZDate` - a new TZDate instance following the system timezone

Returns a new TZDate instance conforming to the system timezone. `tzValue` can be used when the TZDate instance follows a timezone other than the one assigned to it. If there is no `tzValue`, it is calculated based on the time zone of the TZDate instance. It does not change the existing TZDate instance, but returns a new TZDate instance.

[⬆️ Back to the list](#instance-methods)
