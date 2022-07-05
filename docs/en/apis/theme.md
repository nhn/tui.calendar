# Theme

## Description

You can apply the theme you want by changing the color and background color. You can freely change the theme through the `setTheme` method.

```js
// Setting the theme while creating an instance
const calendar = new Calendar('#container', {
  theme: {
    week: {
      today: {
        color: 'blue',
      },
    },
  },
});

// Change the theme of an instance with the setTheme method
calendar.setTheme({
  week: {
    today: {
      color: 'red',
    },
  },
});
```

## Theme Object

The theme object is a nested object divided into three parts: `common` for whole application, `week` for weekly/daily view, and `month` for monthly view. All values are CSS string values to the corresponding properties.

```ts
interface ThemeObject {
  common: CommonTheme;
  week: WeekTheme;
  month: MonthTheme;
}
```

### Common Theme

```ts
interface CommonTheme {
  backgroundColor: string;
  border: string;
  gridSelection: {
    backgroundColor: string;
    border: string;
  };
  dayName: { color: string };
  holiday: { color: string };
  saturday: { color: string };
  today: { color: string };
}
```

| Theme                                      | Default value                       | Description                  |
| ------------------------------------------ | ----------------------------------- | ---------------------------- |
| [backgroundColor](#common-backgroundcolor) | <code>'white'</code>                | Background color of calendar |
| [border](#common-border)                   | <code>'1px solid #e5e5e5'</code>    | Border of calendar           |
| [gridSelection](#common-gridselection)     | <code>DEFAULT_GRID_SELECTION</code> | Selected date/time area      |
| [dayName](#common-dayname)                 | <code>{ color: '#333' }</code>      | Day of the week              |
| [holiday](#common-holiday)                 | <code>{ color: '#ff4040' }</code>   | Holiday                      |
| [saturday](#common-saturday)               | <code>{ color: '#333' }</code>      | Saturday                     |
| [today](#common-today)                     | <code>{ color: '#fff' }</code>      | The current day              |

```ts
const DEFAULT_GRID_SELECTION = {
  backgroundColor: 'rgba(81, 92, 230, 0.05)',
  border: '1px solid #515ce6',
};
```

### Week Theme

```ts
interface WeekTheme {
  dayName: {
    borderLeft: string;
    borderTop: string;
    borderBottom: string;
    backgroundColor: string;
  };
  dayGrid: {
    borderRight: string;
    backgroundColor: string;
  };
  dayGridLeft: {
    borderRight: string;
    backgroundColor: string;
    width: string;
  };
  timeGrid: { borderRight: string };
  timeGridLeft: {
    borderRight: string;
    backgroundColor: string;
    width: string;
  };
  timeGridLeftAdditionalTimezone: { backgroundColor: string };
  timeGridHalfHour: { borderBottom: string };
  nowIndicatorLabel: { color: string };
  nowIndicatorPast: { border: string };
  nowIndicatorBullet: { backgroundColor: string };
  nowIndicatorToday: { border: string };
  nowIndicatorFuture: { border: string };
  pastTime: { color: string };
  futureTime: { color: string };
  weekend: { backgroundColor: string };
  today: { color: string; backgroundColor: string };
  pastDay: { color: string };
  panelResizer: { border: string };
  gridSelection: { color: string };
}
```

| Theme                                                                  | Default value                                      | Description                                                                                                               |
| ---------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [dayName](#week-dayname)                                               | <code>DEFAULT_WEEK_DAYNAME</code>                  | Day of the week                                                                                                           |
| [dayGrid](#week-daygrid)                                               | <code>DEFAULT_DAY_GRID</code>                      | Each cell in the panel in weekly/daily view                                                                               |
| [dayGridLeft](#week-daygridleft)                                       | <code>DEFAULT_DAY_GRID_LEFT</code>                 | In the weekly/daily view, the area on the left side of the panel                                                          |
| [timeGrid](#week-timegrid)                                             | <code>{ borderRight: '1px solid #e5e5e5' }</code>  | Timed event area in weekly/daily view                                                                                     |
| [timeGridLeft](#week-timegridleft)                                     | <code>DEFAULT_TIME_GRID_LEFT</code>                | The left side of the timed event area in the weekly/daily view                                                            |
| [timeGridLeftAdditionalTimezone](#week-timegridleftadditionaltimezone) | <code>{ backgroundColor: 'white' }</code>          | Sub-time zone displayed on the left side of the timed event area in the weekly/daily view                                 |
| [timeGridHalfHourLine](#week-timegridhalfhourline)                     | <code>{ borderBottom: '1px solid #e5e5e5' }</code> | In the weekly/daily view, dividing line of every 30 minutes of an hour in the timed event area.                           |
| [timeGridHourLine](#week-timegridhourline)                             | <code>{ borderBottom: '1px solid #e5e5e5' }</code> | In the weekly/daily view, dividing line of every hour in the timed event area.                                            |
| [nowIndicatorLabel](#week-nowindicatorlabel)                           | <code>{ color: '#515ce6' }</code>                  | Current time text displayed on the current time indicator                                                                 |
| [nowIndicatorPast](#week-nowindicatorpast)                             | <code>{ border: '1px dashed #515ce6' }</code>      | The line representing past of the current time indicator                                                                  |
| [nowIndicatorBullet](#week-nowindicatorbullet)                         | <code>{ backgroundColor: '#515ce6' }</code>        | The dot representing today’s column of the current time indicator                                                         |
| [nowIndicatorToday](#week-nowindicatortoday)                           | <code>{ border: '1px solid #515ce6' }</code>       | The line representing today of the current time indicator                                                                 |
| [nowIndicatorFuture](#week-nowindicatorfuture)                         | <code>{ border: 'none' }</code>                    | The line representing future of the current time indicator                                                                |
| [pastTime](#week-pasttime)                                             | <code>{ color: '#bbb' }</code>                     | The past time displayed on the left side of the timed event area in the weekly/daily view                                 |
| [futureTime](#week-futuretime)                                         | <code>{ color: '#333' }</code>                     | Future time displayed on the left side of the timed event area in the weekly/daily view                                   |
| [weekend](#week-weekend)                                               | <code>{ backgroundColor: 'inherit' }</code>        | Weekend column in timed event area in weekly/daily view                                                                   |
| [today](#week-today)                                                   | <code>DEFAULT_TODAY</code>                         | Today column of timed event area in weekly/daily view (color is applied to dayName, backgroundColor is applied to column) |
| [pastDay](#week-pastday)                                               | <code>{ color: '#bbb' }</code>                     | Past days in weekly/daily view                                                                                            |
| [panelResizer](#week-panelresizer)                                     | <code>{ border: '1px solid #e5e5e5' }</code>       | Panel resizing component                                                                                                  |
| [gridSelection](#week-gridselection)                                   | <code>{ color: '#515ce6' }</code>                  | Selected date/time in weekly/daily view                                                                                   |

```ts
const DEFAULT_WEEK_DAYNAME = {
  borderLeft: 'none',
  borderTop: '1px solid #e5e5e5',
  borderBottom: '1px solid #e5e5e5',
  backgroundColor: 'inherit',
};

const DEFAULT_DAY_GRID = {
  borderRight: '1px solid #e5e5e5',
  backgroundColor: 'inherit',
};

const DEFAULT_DAY_GRID_LEFT = {
  borderRight: '1px solid #e5e5e5',
  backgroundColor: 'inherit',
  width: '72px',
};

const DEFAULT_TIME_GRID_LEFT = {
  backgroundColor: 'inherit',
  borderRight: '1px solid #e5e5e5',
  width: '72px',
};

const DEFAULT_TODAY = {
  color: 'inherit',
  backgroundColor: 'rgba(81, 92, 230, 0.05)',
};
```

### Month Theme

```ts
interface MonthTheme {
  dayExceptThisMonth: { color: string };
  dayName: {
    borderLeft: string;
    backgroundColor: string;
  };
  holidayExceptThisMonth: { color: string };
  moreView: {
    backgroundColor: string;
    border: string;
    boxShadow: string;
    width: number | null,
    height: number | null,
  };
  moreViewTitle: {
    backgroundColor: string;
  };
  weekend: { backgroundColor: string };
  gridCell: {
    headerHeight: number | null;
    footerHeight: number | null;
  };
}
```

| Theme                                                   | Default value                                         | Description                                           |
| ------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| [dayExceptThisMonth](#month-dayexceptthismonth)         | <code>{ color: 'rgba(51, 51, 51, 0.4)' }</code>       | Days except this month                                |
| [holidayExceptThisMonth](#month-holidayexceptthismonth) | <code>{ color: 'rgba(255, 64, 64, 0.4)' }</code>      | Holidays except this month                            |
| [dayName](#month-dayname)                               | <code>DEFAULT_MONTH_DAYNAME</code>                    | Day of the week                                       |
| [moreView](#month-moreview)                             | <code>DEFAULT_MORE_VIEW</code>                        | ‘More events’ popup of monthly view                   |
| [moreViewTitle](#month-moreviewtitle)                   | <code>{ backgroundColor: 'inherit' }</code>           | Header area of ‘more events’ popup of monthly view    |
| [weekend](#month-weekend)                               | <code>{ backgroundColor: 'inherit' }</code>           | Weekend cell in monthly view                          |
| [gridCell](#month-gridcell)                             | <code>{ headerHeight: 31, footerHeight: null }</code> | Header and footer height of all cells in monthly view |

```ts
const DEFAULT_MONTH_DAYNAME = {
  borderLeft: 'none',
  backgroundColor: 'inherit',
};

const DEFAULT_MORE_VIEW = {
  border: '1px solid #d5d5d5',
  boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  width: null,
  height: null,
};
```

## Usage examples

### common

#### common-backgroundColor

Specifies the background color. The default value is `'white'`.

```js
calendar.setTheme({
  common: {
    backgroundColor: 'black',
  },
});
```

[⬆️ Back to the list](#common-theme)

#### common-border

Specifies the border. The default value is `'1px solid #e5e5e5'`.

```js
calendar.setTheme({
  common: {
    border: '1px dotted #e5e5e5',
  },
});
```

[⬆️ Back to the list](#common-theme)

#### common-gridSelection

Specifies the background color and border of the date/time selection. The default value is `'rgba(81, 92, 230, 0.05)'` for `backgroundColor` and `'1px solid #515ce6'` for `border`.

| Default                                                                       | Example                                                                      |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| ![common-gridSelection-default](../../assets/common-gridSelection-before.png) | ![common-gridSelection-example](../../assets/common-gridSelection-after.png) |

```js
calendar.setTheme({
  common: {
    gridSelection: {
      backgroundColor: 'rgba(81, 230, 92, 0.05)',
      border: '1px dotted #515ce6',
    },
  },
});
```

[⬆️ Back to the list](#common-theme)

#### common-dayName

Specifies the color of the day of the week. The default value is `'#333'`.

| Default                                                           | Example                                                          |
| ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| ![common-dayname-default](../../assets/common-dayName-before.png) | ![common-dayname-example](../../assets/common-dayName-after.png) |

```js
calendar.setTheme({
  common: {
    dayName: {
      color: '#515ce6',
    },
  },
});
```

[⬆️ Back to the list](#common-theme)

#### common-holiday

Specifies the holiday color. The default value is `'#ff4040'`.

| Default                                                           | Example                                                          |
| ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| ![common-holiday-default](../../assets/common-holiday-before.png) | ![common-holiday-example](../../assets/common-holiday-after.png) |

```js
calendar.setTheme({
  common: {
    holiday: {
      color: 'rgba(255, 64, 64, 0.5)',
    },
  },
});
```

[⬆️ Back to the list](#common-theme)

#### common-saturday

Specifies the color of Saturday. The default value is `'#333'`.

| Default                                                             | Example                                                            |
| ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| ![common-saturday-default](../../assets/common-saturday-before.png) | ![common-saturday-example](../../assets/common-saturday-after.png) |

```js
calendar.setTheme({
  common: {
    saturday: {
      color: 'rgba(64, 64, 255, 0.5)',
    },
  },
});
```

[⬆️ Back to the list](#common-theme)

#### common-today

Specifies the color of today. The default value is `'#fff'`.

| Default                                                       | Example                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------ |
| ![common-today-default](../../assets/common-today-before.png) | ![common-today-example](../../assets/common-today-after.png) |

```js
calendar.setTheme({
  common: {
    today: {
      color: 'grey',
    },
  },
});
```

[⬆️ Back to the list](#common-theme)

### week

#### week-dayName

Specifies the day of the week/daily view. You can specify the left, top, and bottom border and `background` colors with `borderLeft`, `borderTop`, `borderBottom`, and `backgroundColor`. The default values are `'none'`, `'1px solid #e5e5e5'`, `'1px solid #e5e5e5'`, and `'inherit'`.

| Default                                                       | Example                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------ |
| ![week-dayname-default](../../assets/week-dayName-before.png) | ![week-dayname-example](../../assets/week-dayName-after.png) |

```js
calendar.setTheme({
  week: {
    dayName: {
      borderLeft: 'none',
      borderTop: '1px dotted red',
      borderBottom: '1px dotted red',
      backgroundColor: 'rgba(81, 92, 230, 0.05)',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-dayGrid

Specifies the cell of each panel of the weekly/daily view. You can specify the right border and background color with `borderRight` and `backgroundColor`, and the default values are `'1px solid #e5e5e5'` and `'inherit'`. When the background color is changed, the background color of the columns except for weekends will be changed.

| Default                                                       | Example                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------ |
| ![week-dayGrid-default](../../assets/week-dayGrid-before.png) | ![week-dayGrid-example](../../assets/week-dayGrid-after.png) |

```js
calendar.setTheme({
  week: {
    dayGrid: {
      borderRight: 'none',
      backgroundColor: 'rgba(81, 92, 230, 0.05)',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-dayGridLeft

Specifies the left area of each panel in the weekly/daily view. You can specify the right border, background color, and width with `borderRight`, and width, and the default values are `'1px solid #e5e5e5'` and `'inherit'`, and `'72px'`.

| Default                                                               | Example                                                              |
| --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| ![week-dayGridLeft-default](../../assets/week-dayGridLeft-before.png) | ![week-dayGridLeft-example](../../assets/week-dayGridLeft-after.png) |

```js
calendar.setTheme({
  week: {
    dayGridLeft: {
      borderRight: 'none',
      backgroundColor: 'rgba(81, 92, 230, 0.05)',
      width: '144px',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-timeGrid

Specifies the timed event area in the weekly/daily view. You can specify the right border with `borderRight` and the default value is `'1px solid #e5e5e5'`.

| Default                                                         | Example                                                        |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| ![week-timeGrid-default](../../assets/week-timeGrid-before.png) | ![week-timeGrid-example](../../assets/week-timeGrid-after.png) |

```js
calendar.setTheme({
  week: {
    timeGrid: {
      borderRight: '1px solid #e5e5e5',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-timeGridLeft

Specifies the left side of the timed event area in the weekly/daily view. You can specify the right border, background color, and width with `borderRight`, `backgroundColor`, and `width`. The default values are `'1px solid #e5e5e5'`, `'inherit'`, and `'72px'`.

| Default                                                                 | Example                                                                |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ![week-timeGridLeft-default](../../assets/week-timeGridLeft-before.png) | ![week-timeGridLeft-example](../../assets/week-timeGridLeft-after.png) |

```js
calendar.setTheme({
  week: {
    timeGridLeft: {
      borderRight: 'none',
      backgroundColor: 'rgba(81, 92, 230, 0.05)',
      width: '144px',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-timeGridLeftAdditionalTimezone

Specifies sub-time zones displayed in the left area of the timed event area in the weekly/daily view. The background color can be specified with `backgroundColor`, and the default value is `'white'`.

| Default                                                                                                     | Example                                                                                                    |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ![week-timeGridLeftAdditionalTimezone-default](../../assets/week-timeGridLeftAdditionalTimezone-before.png) | ![week-timeGridLeftAdditionalTimezone-example](../../assets/week-timeGridLeftAdditionalTimezone-after.png) |

```js
calendar.setTheme({
  week: {
    timeGridLeftAdditionalTimezone: {
      backgroundColor: '#e5e5e5',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-timeGridHalfHourLine

In the weekly/daily view, specifies the dividing line of every 30 minutes of an hour in the timed event area. You can specify the bottom border with `borderBottom`, and the default value is `'none'`.

| Default                                                                                 | Example                                                                                |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| ![week-timeGridHalfHourLine-default](../../assets/week-timeGridHalfHourLine-before.png) | ![week-timeGridHalfHourLine-example](../../assets/week-timeGridHalfHourLine-after.png) |

```js
calendar.setTheme({
  week: {
    timeGridHalfHourLine: {
      borderBottom: '1px dotted #e5e5e5',
    },
  },
});
```

#### week-timeGridHourLine

In the weekly/daily view, specifies dividing line of every hour in the timed event area. You can specify the bottom border with `borderBottom`, and the default value is `'none'`.

| Default                                                                         | Example                                                                        |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![week-timeGridHourLine-default](../../assets/week-timeGridHourLine-before.png) | ![week-timeGridHourLine-example](../../assets/week-timeGridHourLine-after.png) |

```js
calendar.setTheme({
  week: {
    timeGridHourLine: {
      borderBottom: '1px solid #f9f9f9',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-nowIndicatorLabel

Specifies the current time text displayed on the current time indicator. You can specify the text color with `color`, and the default value is `'#515ce6'`.

| Default                                                                           | Example                                                                          |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![week-nowIndicatorLabel-default](../../assets/week-nowIndicatorLabel-before.png) | ![week-nowIndicatorLabel-example](../../assets/week-nowIndicatorLabel-after.png) |

```js
calendar.setTheme({
  week: {
    nowIndicatorLabel: {
      color: 'red',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-nowIndicatorPast

Specifies a line representing past of the current time indicator. You can specify the border of the line with `border`, and the default value is `'1px dashed #515ce6'`.

| Default                                                                         | Example                                                                        |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![week-nowIndicatorPast-default](../../assets/week-nowIndicatorPast-before.png) | ![week-nowIndicatorPast-example](../../assets/week-nowIndicatorPast-after.png) |

```js
calendar.setTheme({
  week: {
    nowIndicatorPast: {
      border: '1px dashed red',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-nowIndicatorBullet

Specifies the point displayed for today's date on the current time indicator. The background color can be specified with `backgroundColor`, and the default value is `'#515ce6'`.

| Default                                                                             | Example                                                                            |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| ![week-nowIndicatorBullet-default](../../assets/week-nowIndicatorBullet-before.png) | ![week-nowIndicatorBullet-example](../../assets/week-nowIndicatorBullet-after.png) |

```js
calendar.setTheme({
  week: {
    nowIndicatorBullet: {
      backgroundColor: '#515ce6',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-nowIndicatorToday

Specifies the line representing today in the current time indicator. You can specify the border of the line with `border`, and the default value is `'1px solid #515ce6'`.

| Default                                                                           | Example                                                                          |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![week-nowIndicatorToday-default](../../assets/week-nowIndicatorToday-before.png) | ![week-nowIndicatorToday-example](../../assets/week-nowIndicatorToday-after.png) |

```js
calendar.setTheme({
  week: {
    nowIndicatorToday: {
      border: '1px solid red',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-nowIndicatorFuture

Specifies a line representing future from the current time indicator. You can specify the border of the line with `border`, and the default value is `'none'`.

| Default                                                                             | Example                                                                            |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| ![week-nowIndicatorFuture-default](../../assets/week-nowIndicatorFuture-before.png) | ![week-nowIndicatorFuture-example](../../assets/week-nowIndicatorFuture-after.png) |

```js
calendar.setTheme({
  week: {
    nowIndicatorFuture: {
      border: '1px solid red',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-pastTime

Specifies the past time displayed in the left area of the timed event area in the weekly/daily view. You can specify the text color with `color`, and the default value is `'#bbb'`.

| Default                                                         | Example                                                        |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| ![week-pastTime-default](../../assets/week-pastTime-before.png) | ![week-pastTime-example](../../assets/week-pastTime-after.png) |

```js
calendar.setTheme({
  week: {
    pastTime: {
      color: 'red',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-futureTime

Specifies the future time displayed in the left area of the timed event area in the weekly/daily view. You can specify the text color with `color`, and the default value is `'#333'`.

| Default                                                             | Example                                                            |
| ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| ![week-futureTime-default](../../assets/week-futureTime-before.png) | ![week-futureTime-example](../../assets/week-futureTime-after.png) |

```js
calendar.setTheme({
  week: {
    futureTime: {
      color: 'red',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-weekend

Specifies weekend columns of the timed event area in the weekly/daily view. The background color can be specified with `backgroundColor`, and the default value is `'inherit'`.

| Default                                                       | Example                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------ |
| ![week-weekend-default](../../assets/week-weekend-before.png) | ![week-weekend-example](../../assets/week-weekend-after.png) |

```js
calendar.setTheme({
  week: {
    weekend: {
      backgroundColor: 'rgba(255, 64, 64, 0.05)',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-today

Specifies today's column of timed event area in weekly/daily view. You can specify text color with `color` and background color with `backgroundColor`. The default values are `'inherit'` and `'rgba(81, 92, 230, 0.05)'`. `color` is applied to the day of the week and `backgroundColor` is applied to the column.

| Default                                                   | Example                                                  |
| --------------------------------------------------------- | -------------------------------------------------------- |
| ![week-today-default](../../assets/week-today-before.png) | ![week-today-example](../../assets/week-today-after.png) |

```js
calendar.setTheme({
  week: {
    today: {
      color: '#e5e5e5',
      backgroundColor: 'rgba(229, 229, 229, 0.05)',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-pastDay

Specify the past day in the weekly/daily view. You can specify the text color with `color`, and the default value is `'#bbb'`.

| Default                                                       | Example                                                      |
| ------------------------------------------------------------- | ------------------------------------------------------------ |
| ![week-pastDay-default](../../assets/week-pastDay-before.png) | ![week-pastDay-example](../../assets/week-pastDay-after.png) |

```js
calendar.setTheme({
  week: {
    pastDay: {
      color: 'grey',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-panelResizer

Specifies the panel resizing component. You can specify a border with `border`, and the default value is `'1px solid #e5e5e5'`.

| Default                                                                 | Example                                                                |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ![week-panelResizer-default](../../assets/week-panelResizer-before.png) | ![week-panelResizer-example](../../assets/week-panelResizer-after.png) |

```js
calendar.setTheme({
  week: {
    panelResizer: {
      border: '1px dotted #e5e5e5',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

#### week-gridSelection

Specifies the date/time selection in the weekly/daily view. You can specify the text color with `color`, and the default value is `'#515ce6'`.

| Default                                                                   | Example                                                                  |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| ![week-gridSelection-default](../../assets/week-gridSelection-before.png) | ![week-gridSelection-example](../../assets/week-gridSelection-after.png) |

```js
calendar.setTheme({
  week: {
    gridSelection: {
      color: 'grey',
    },
  },
});
```

[⬆️ Back to the list](#week-theme)

### month

#### month-dayExceptThisMonth

Specifies a different month from the current month. You can specify the text color with `color`, and the default value is `'rgba(51, 51, 51, 0.4)'`.

| Default                                                                               | Example                                                                              |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| ![month-dayExceptThisMonth-default](../../assets/month-dayExceptThisMonth-before.png) | ![month-dayExceptThisMonth-example](../../assets/month-dayExceptThisMonth-after.png) |

```js
calendar.setTheme({
  month: {
    dayExceptThisMonth: {
      color: 'grey',
    },
  },
});
```

[⬆️ Back to the list](#month-theme)

#### month-holidayExceptThisMonth

Specifies holiday that is in different months from the current month. You can specify the text color with `color`, and the default value is `'rgba(255, 64, 64, 0.4)'`.

| Default                                                                                       | Example                                                                                      |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| ![month-holidayExceptThisMonth-default](../../assets/month-holidayExceptThisMonth-before.png) | ![month-holidayExceptThisMonth-example](../../assets/month-holidayExceptThisMonth-after.png) |

```js
calendar.setTheme({
  month: {
    holidayExceptThisMonth: {
      color: 'blue',
    },
  },
});
```

[⬆️ Back to the list](#month-theme)

#### month-dayName

Specify the day of the week. You can specify the left border and background color with `borderLeft` and `backgroundColor`, and the default values are `'none'` and `'inherit'` respectively.

| Default                                                         | Example                                                        |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| ![month-dayname-default](../../assets/month-dayName-before.png) | ![month-dayname-example](../../assets/month-dayName-after.png) |

```js
calendar.setTheme({
  month: {
    dayName: {
      borderLeft: 'none',
      backgroundColor: 'rgba(51, 51, 51, 0.4)',
    },
  },
});
```

[⬆️ Back to the list](#month-theme)

#### month-moreView

Specifies the ‘more events’ pop-up of the monthly view. You can specify border, shadow, and background color with `border`, `boxShadow`, and `backgroundColor`, and the default values are `'1px solid #d5e5e5'`, `'0 2px 6px 0 rgba(0, 0, 0, 0.1)'`, `'white'`.

You can also set the size of the popup by specifying `width` and `height` values. The size of the popup can be input only as a pixel value, and it must be entered as a `number` type.

| Default                                                           | Example                                                          |
| ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| ![month-moreView-default](../../assets/month-moreView-before.png) | ![month-moreView-example](../../assets/month-moreView-after.png) |

```js
calendar.setTheme({
  month: {
    moreView: {
      border: '1px solid grey',
      boxShadow: '0 2px 6px 0 grey',
      backgroundColor: 'white',
      width: 320,
      height: 200,
    },
  },
});
```

[⬆️ Back to the list](#month-theme)

#### month-moreViewTitle

Specifies the header area of the 'more events' pop-up of the monthly view. The background color can be specified with `backgroundColor`, and the default value is `'inherit'`.

| Default                                                                     | Example                                                                    |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![month-moreViewTitle-default](../../assets/month-moreViewTitle-before.png) | ![month-moreViewTitle-example](../../assets/month-moreViewTitle-after.png) |

```js
calendar.setTheme({
  month: {
    moreViewTitle: {
      backgroundColor: 'grey',
    },
  },
});
```

[⬆️ Back to the list](#month-theme)

#### month-weekend

Specifies the weekend cell of the monthly view. The background color can be specified with `backgroundColor`, and the default value is `'inherit'`.

| Default                                                         | Example                                                        |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| ![month-weekend-default](../../assets/month-weekend-before.png) | ![month-weekend-example](../../assets/month-weekend-after.png) |

```js
calendar.setTheme({
  month: {
    weekend: {
      backgroundColor: 'rgba(255, 64, 64, 0.4)',
    },
  },
});
```

#### month-gridCell

Specifies the header and footer height of each cell of the monthly view. By default, the footer is inactive, so to use the footer, an arbitrary `number` type value must be passed.

The default value of `headerHeight` is `31`, and the default value of `footerHeight` is `null`.

⚠️ If the property value is `null`, the header or footer is not displayed.

| Default                                                          | Example                                                        |
| ---------------------------------------------------------------- | -------------------------------------------------------------- |
| ![month-gridCell-before](../../assets/month-gridCell-before.png) | ![month-gridCell-after](../../assets/month-gridCell-after.png) |

```js
calendar.setTheme({
  month: {
    gridCell: {
      footerHeight: 31,
    },
  },
});
```

[⬆️ Back to the list](#month-theme)
