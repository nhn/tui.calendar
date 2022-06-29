# TOAST UI Calendar for React

> This is a React component wrapping [TOAST UI Calendar](https://github.com/nhn/tui.calendar).

[![npm version](https://img.shields.io/npm/v/@toast-ui/react-calendar.svg)](https://www.npmjs.com/package/@toast-ui/react-calendar)

## 🚩 Table of Contents

- [Collect statistics on the use of open source](#collect-statistics-on-the-use-of-open-source)
- [Install](#-install)
  - [Using npm](#using-npm)
- [Usage](#-usage)
  - [Import](#Import)
  - [Props](#props)
  - [Instance Methods](#Instance-Methods)
  - [Getting the root element](#Getting-the-root-element)
  - [Event](#event)
- [Pull Request Steps](#-pull-request-steps)
- [Contributing](#-contributing)
- [License](#-license)

## Collect statistics on the use of open source

React Wrapper of TOAST UI Calendar applies Google Analytics (GA) to collect statistics on the use of open source, in order to identify how widely TOAST UI Calendar is used throughout the world. It also serves as important index to determine the future course of projects. location.hostname (e.g. > “ui.toast.com") is to be collected and the sole purpose is nothing but to measure statistics on the usage. To disable GA, use the `usageStatistics` props like the example below.

```js
<Calendar usageStatistics={false} />
```

Or, include `tui-code-snippet.js` (**v1.4.0** or **later**) and then immediately write the options as follows:

```js
tui.usageStatistics = false;
```

## 💾 Install

### Using npm

```sh
npm install --save @toast-ui/react-calendar
```

## 📊 Usage

### Import

You can use Toast UI Calendar for React as a ECMAScript module or a CommonJS module.

- Using ECMAScript module

```js
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/toastui-calendar.css';

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
```

- Using CommonJS module

```js
var Calendar = require('@toast-ui/react-calendar');
require('@toast-ui/calendar/toastui-calendar.css');

// If you use the default popups, use this.
require('tui-date-picker/dist/tui-date-picker.css');
require('tui-time-picker/dist/tui-time-picker.css');
```

### Props

We are supported in the form of props for [Options of TOAST UI Calendar](https://nhn.github.io/tui.calendar/latest/Options). Each name of props is same options of Toast UI Calendar except `view` is for `defaultView` of option. Additionally, you can set events using `events` of prop.

```js
const myTheme = {
  // Theme object to extends default dark theme.
};

const MyComponent = () => (
  <Calendar
    height="900px"
    calendars={[
      {
        id: '0',
        name: 'Private',
        bgColor: '#9e5fff',
        borderColor: '#9e5fff',
      },
      {
        id: '1',
        name: 'Company',
        bgColor: '#00a9ff',
        borderColor: '#00a9ff',
      },
    ]}
    disableDblClick={true}
    disableClick={false}
    isReadOnly={false}
    month={{ startDayOfWeek: 0 }}
    events={[
      {
        id: '1',
        calendarId: '0',
        title: 'TOAST UI Calendar Study',
        category: 'time',
        dueDateClass: '',
        start: today.toISOString(),
        end: getDate('hours', today, 3, '+').toISOString(),
      },
      {
        id: '2',
        calendarId: '0',
        title: 'Practice',
        category: 'milestone',
        dueDateClass: '',
        start: getDate('date', today, 1, '+').toISOString(),
        end: getDate('date', today, 1, '+').toISOString(),
        isReadOnly: true,
      },
      {
        id: '3',
        calendarId: '0',
        title: 'FE Workshop',
        category: 'allday',
        dueDateClass: '',
        start: getDate('date', today, 2, '-').toISOString(),
        end: getDate('date', today, 1, '-').toISOString(),
        isReadOnly: true,
      },
      {
        id: '4',
        calendarId: '0',
        title: 'Report',
        category: 'time',
        dueDateClass: '',
        start: today.toISOString(),
        end: getDate('hours', today, 1, '+').toISOString(),
      },
    ]}
    template={{
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
    }}
    theme={myTheme}
    timezones={[
      {
        timezoneOffset: 540,
        displayLabel: 'GMT+09:00',
        tooltip: 'Seoul',
      },
      {
        timezoneOffset: -420,
        displayLabel: 'GMT-08:00',
        tooltip: 'Los Angeles',
      },
    ]}
    useDetailPopup={true}
    useFormPopup={true}
    view={selectedView} // You can also set the `defaultView` option.
    week={{
      showTimezoneCollapseButton: true,
      timezonesCollapsed: true,
      eventView: true,
      taskView: true,
    }}
  />
);
```

#### Theme

You can write your own theme object. [Link - See "theme"](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/theme.md)

#### ⚠️ Note for passing props

The calendar component check deep equality of `props` when re-rendered. However, for performance and to avoid unnecessary re-rendering, it's recommended to extract props to the outside of the component or memoize them with `useMemo` when props don't have to be affected by component state changes.

```jsx
const calendars = [
  {
    id: '0',
    name: 'Private',
    bgColor: '#9e5fff',
    borderColor: '#9e5fff',
  },
  {
    id: '1',
    name: 'Company',
    bgColor: '#00a9ff',
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

### Instance Methods

For using [instance methods of TOAST UI Calendar](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/calendar.md#instance-methods), first thing to do is creating Refs of wrapper component using [`createRef()`](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs). But the wrapper component does not provide a way to call instance methods of TOAST UI Calendar directly. Instead, you can call `getInstance()` method of the wrapper component to get the instance, and call the methods on it.

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

### Getting the root element

An instance of the wrapper component also provides a handy method for getting the root element. If you want to manipulate the root element directly, you can call `getRootElement` to get the element.

```js
class MyComponent extends React.Component {
  calendarRef = React.createRef();

  handleClickButton = () => {
    this.calendarRef.current.getRootElement().classList.add('calendar-root');
  };

  render() {
    return (
      <>
        <Calendar ref={this.calendarRef} {...calendarOptions} />
        <button onClick={this.handleClickButton}>Click!</button>
      </>
    );
  }
}
```

### Event

[All the events of TOAST UI Calendar](https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/calendar.md#instance-events) are supported in the form of `on[EventName]` props. The first letter of each event name should be capitalized. For example, for using `mousedown` event you can use `onMousedown` prop like the example below.

```js
class MyComponent extends React.Component {
  handleClickDayName = (ev) => {
    // view : week, day
    console.group('onClickDayName');
    console.log(ev.date);
    console.groupEnd();
  };

  render() {
    return <Calendar onClickDayName={this.handleClickDayName} />;
  }
}
```

## 🔧 Pull Request Steps

TOAST UI products are open source, so you can create a pull request(PR) after you fix issues.
Run npm scripts and develop yourself with the following process.

### Setup

Fork `develop` branch into your personal repository.
Clone it to local computer. Install node modules.
Before starting development, you should check to have any errors.

```sh
$ git clone https://github.com/{your-personal-repo}/[[repo name]].git
$ cd [[repo name]]
$ npm install
```

### Develop

Let's start development!

### Pull Request

Before PR, check to test lastly and then check any errors.
If it has no error, commit and then push it!

For more information on PR's step, please see links of Contributing section.

## 💬 Contributing

- [Code of Conduct](https://github.com/nhn/tui.calendar/blob/main/CODE_OF_CONDUCT.md)
- [Contributing Guide](https://github.com/nhn/tui.calendar/blob/main/CONTRIBUTING.md)
- [Commit Message Convention](https://github.com/nhn/tui.calendar/blob/main/docs/COMMIT_MESSAGE_CONVENTION.md)

## 📜 License

This software is licensed under the [MIT](./LICENSE) © [NHN Cloud](https://github.com/nhn).
