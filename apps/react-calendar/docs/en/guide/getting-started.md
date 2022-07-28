# Getting Started

## Table of Contents

- [Installation](#installation)
  - [Using the package manager](#using-the-package-manager)
    - [npm](#npm)
- [How to use the calendar](#how-to-use-the-calendar)
  - [JavaScript](#javascript)
    - [Importing modules](#importing-modules)
    - [Loading bundle files for legacy browsers](#loading-bundle-files-for-legacy-browsers)
  - [CSS](#css)
- [React](#react)
  - [Props](#props)
    - [Theme](#theme)
  - [Instance Methods](#instance-methods)
  - [Methods](#methods)
    - [getRootElement](#getrootelement)
    - [getInstance](#getinstance)
- [Basic usage](#basic-usage)
  - [Disable to collect hostname for Google Analytics(GA)](#disable-to-collect-hostname-for-google-analyticsga)
  - [⚠️ Note for passing props](#️-note-for-passing-props)

## Installation

TOAST UI products can be used by using the package manager or by directly downloading the source code. However, it is recommended to use a package manager.

### Using the package manager

TOAST UI products are registered in the [npm](https://www.npmjs.com/) package registry. You can easily install packages using CLI tools provided by each package manager. To use npm, you need to install [Node.js](https://nodejs.org) in advance.

#### npm

```sh
npm install @toast-ui/react-calendar # latest version
npm install @toast-ui/react-calendar@<version> # specific version
```

## How to use the calendar

### JavaScript

#### Importing modules

There are three ways to import TOAST UI Calendar for React depending on the environment.

```js
/* ES6 module in Node.js environment */
import Calendar from '@toast-ui/react-calendar';
```

```js
/* CommonJS in Node.js environment */
const Calendar = require('@toast-ui/react-calendar');
```

```js
/* in the browser environment namespace */
const Calendar = tui.ReactCalendar;
```

#### Loading bundle files for legacy browsers

TOAST UI Calendar for React provides a separate bundle file for legacy browsers. The basic bundle provides stable support for the latest two versions of the modern browser. However, the basic bundle does not include a polyfill for IE11, so to support IE11 or similar level of legacy browsers, you need to add the IE11 bundle that includes a polyfill as follows.

Since the bundle size of IE11 is about 2x larger than that of the default bundle, you must take care not to increase the bundle size unnecessarily by considering the range of support.

```js
/* ES6 module in Node.js environment */
import Calendar from '@toast-ui/react-calendar/ie11';
```

```js
/* CommonJS in Node.js environment */
const Calendar = require('@toast-ui/react-calendar/ie11');
```

### CSS

To use the calendar, you need to add a CSS file of TOAST UI Calendar. You can import CSS files through import and require, or you can import them through CDN.

```js
/* ES6 module in Node.js environment */
import '@toast-ui/calendar/dist/toastui-calendar.min.css'; // Stylesheet for calendar
```

```js
/* CommonJS in Node.js environment */
require('@toast-ui/calendar/dist/toastui-calendar.min.css');
```

```html
<!-- CDN -->
<link rel="stylesheet" href="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.css" />
```

## React

You can load a calendar component and add it to your component.

```jsx
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

export function YourComponent() {
  return (
    <div>
      <Calendar />
    </div>
  );
}
```

### Props

TOAST UI Calendar for React provide props for [options of TOAST UI Calendar](/docs/en/apis/options.md). Each name of props is same with options of Toast UI Calendar except `view` is for `defaultView`.

Additionally, it provides a `events` prop to add events.

```jsx
export function MyComponent() {
  const calendars = [{ id: 'cal1', name: 'Personal' }];
  const initialEvents = [
    {
      id: '1',
      calendarId: 'cal1',
      title: 'Lunch',
      category: 'time',
      start: '2022-06-28T12:00:00',
      end: '2022-06-28T13:30:00',
    },
    {
      id: '2',
      calendarId: 'cal1',
      title: 'Coffee Break',
      category: 'time',
      start: '2022-06-28T15:00:00',
      end: '2022-06-28T15:30:00',
    },
  ];

  const onAfterRenderEvent = (event) => {
    console.log(event.title);
  };

  return (
    <div>
      <Calendar
        height="900px"
        view="month"
        month={{
          dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          visibleWeeksCount: 3,
        }}
        calendars={calendars}
        events={initialEvents}
        onAfterRenderEvent={onAfterRenderEvent}
      />
    </div>
  );
}
```

#### Theme

You can write your own theme object. For more information, refer to [`theme`](/docs/en/apis/theme.md).

### Instance Methods

For using [instance methods of TOAST UI Calendar](/docs/en/apis/calendar.md#instance-methods), first thing to do is creating Refs of wrapper component using [`createRef()`](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs). But the wrapper component does not provide a way to call instance methods of TOAST UI Calendar directly. Instead, you can call `getInstance()` method of the wrapper component to get the instance, and call the methods on it.

```js
const calendarOptions = {
  // sort of option properties.
};

class MyComponent extends React.Component {
  calendarRef = React.createRef();

  handleClickNextButton = () => {
    const calendarInstance = this.calendarRef.current.getInstance();

    calendarInstance.next();
  };

  render() {
    return (
      <>
        <Calendar ref={this.calendarRef} {...calendarOptions} />
        <button onClick={this.handleClickNextButton}>Go next!</button>
      </>
    );
  }
}
```

### Methods

💡 Click on a method to see more detailed explanations and usage examples.

| Method                            | Description                                          |
| --------------------------------- | ---------------------------------------------------- |
| [getRootElement](#getrootelement) | Return the element on which the calendar is mounted. |
| [getInstance](#getinstance)       | Return the calendar instance.                        |

#### getRootElement

- Type: `getRootElement(): HTMLDivElement`
- Returns: `HTMLDivElement` - the element on which the calendar is mounted

Return the element on which the calendar is mounted.

#### getInstance

- Type: `getInstance(): Calendar`
- Returns: `Calendar` - the calendar instance

Return the calendar instance. You can use this to call the [calendar instance methods](/docs/en/apis/calendar.md#instance-methods).

## Basic usage

### Disable to collect hostname for Google Analytics(GA)

[TOAST UI Calendar](https://github.com/nhn/tui.calendar) applies [GA](https://analytics.google.com/analytics/web/) to collect statistics on open source usage to see how widespread it is around the world. This serves as an important indicator to determine the future progress of the project. It collects `location.hostname` (e.g. "ui.toast.com") and is only used to measure usage statistics.

To disable GA, set the [`usageStatistics` prop](/docs/en/apis/options.md#usagestatistics) to `false`:

```jsx
export function MyCalendar() {
  return (
    <div>
      <Calendar usageStatistics={false} />
    </div>
  );
}
```

### ⚠️ Note for passing props

The calendar component check deep equality of `props` when re-rendered. However, for performance and to avoid unnecessary re-rendering, it's recommended to extract props to the outside of the component or memoize them with `useMemo` when props don't have to be affected by component state changes.

```jsx
const calendars = [
  {
    id: '0',
    name: 'Private',
    backgroundColor: '#9e5fff',
    borderColor: '#9e5fff',
  },
  {
    id: '1',
    name: 'Company',
    backgroundColor: '#00a9ff',
    borderColor: '#00a9ff',
  },
];

// Especially avoid to declare the `template` prop inside the component.
const template = {
  milestone(event) {
    return `<span style="color:#fff;background-color: ${event.backgroundColor};">${event.title}</span>`;
  },
  milestoneTitle() {
    return 'Milestone';
  },
  allday(event) {
    return `${event.title}<i class="fa fa-refresh"></i>`;
  },
  alldayTitle() {
    return 'All Day';
  },
};

function MyCalendar() {
  // ...

  return (
    <Calendar
      // ...
      calendars={calendars}
      template={template}
    />
  );
}
```
