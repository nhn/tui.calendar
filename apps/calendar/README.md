# ![TOAST UI Calendar](https://user-images.githubusercontent.com/26706716/39230183-7f8ff186-48a0-11e8-8d9c-9699d2d0e471.png)

> A JavaScript calendar that is full featured. Now your service just got the customizable calendar.

[![npm](https://img.shields.io/npm/v/@toast-ui/calendar.svg)](https://www.npmjs.com/package/@toast-ui/calendar)
[![license](https://img.shields.io/github/license/nhn/tui.calendar.svg)](https://github.com/nhn/tui.calendar/blob/master/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.calendar/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
[![code with hearth by NHN Cloud](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-NHN_Cloud-ff1414.svg)](https://github.com/nhn)

## 🚩 Table of Contents

- [📙 Documents](#-documents)
- [Collect statistics on the use of open source](#collect-statistics-on-the-use-of-open-source)
- [💾 Install](#-install)
  - [Using npm](#using-npm)
  - [Via Contents Delivery Network (CDN)](#via-contents-delivery-network-cdn)
  - [Download Source Files](#download-source-files)
- [📅 Usage](#-usage)
  - [Load](#load)
  - [Implement](#implement)
- [🔧 Pull Request Steps](#-pull-request-steps)
  - [Setup](#setup)
  - [Develop](#develop)
  - [Pull Request](#pull-request)
- [💬 Contributing](#-contributing)
- [📜 License](#-license)

## 📙 Documents

- [English](/docs/README.md)
- [Korean](/docs/ko/README.md)

## Collect statistics on the use of open source

TOAST UI Calendar applies Google Analytics (GA) to collect statistics on the use of open source, in order to identify how widely TOAST UI Calendar is used throughout the world. It also serves as important index to determine the future course of projects. location.hostname (e.g. > “ui.toast.com") is to be collected and the sole purpose is nothing but to measure statistics on the usage.

To disable GA, set the [`usageStatistics` option](/docs/en/apis/options.md#usagestatistics) to `false`:

```js
const calendar = new Calendar('#calendar', {
  usageStatistics: false
});
```

## 💾 Install

### Using npm

```sh
npm install --save @toast-ui/calendar
```

### Via Contents Delivery Network (CDN)

TOAST UI products are available over the CDN powered by [NHN Cloud](https://www.toast.com).

```html
<link rel="stylesheet" href="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.css" />
<script src="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.js"></script>

<!-- To get bundle file for legacy browser -->
<!-- <script src="https://uicdn.toast.com/calendar /latest/toastui-calendar.ie11.min.js"></script> -->

<!-- Import as es module -->
<!-- <script type="module" src="https:// uicdn.toast.com/calendar/latest/toastui-calendar.mjs"></script> -->
```

If you want to use a specific version, use the tag name instead of `latest` in the url's path.

The CDN directory has the following structure.

```
- uicdn.toast.com/
  ├─ calendar/
  │  ├─ latest
  │  │  ├─ toastui-calendar.css
  │  │  ├─ toastui-calendar.js
  │  │  ├─ toastui-calendar.min.css
  │  │  ├─ toastui-calendar.min.js
  │  │  ├─ toastui-calendar.ie11.js
  │  │  ├─ toastui-calendar.ie11.min.js
  │  │  │  toastui-calendar.mjs
  │  ├─ v2.0.0/
```

### Download Source Files

- [Download all sources for each version](https://github.com/nhn/tui.calendar/releases)

## 📅 Usage

### Load

TOAST UI Calendar can be instantiated through the constructor function. There are three ways to access the constructor function depending on the environment.

```js
/* ES6 module in Node.js environment */
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
```

```js
/* CommonJS in Node.js environment */
const Calendar = require('@toast-ui/calendar');
require('@toast-ui/calendar/dist/toastui-calendar.min.css');
```

```js
/* in the browser environment namespace */
const Calendar = tui.Calendar;
```

### Implement

```html
<div id="calendar" style="height: 800px"></div>
```

```javascript
const calendar = new Calendar('#calendar', {
  defaultView: 'week',
  template: {
    time(event) {
      const { start, end, title } = event;

      return `<span style="color: white;">${formatTime(start)}~${formatTime(end)} ${title}</span>`;
    },
    allday(event) {
      return `<span style="color: gray;">${event.title}</span>`;
    },
  },
  calendars: [
    {
      id: 'cal1',
      name: 'Personal',
      backgroundColor: '#03bd9e',
    },
    {
      id: 'cal2',
      name: 'Work',
      backgroundColor: '#00a9ff',
    },
  ],
});
```

## 🔧 Pull Request Steps

TOAST UI products are open source, so you can create a pull request(PR) after you fix issues.
Run npm scripts and develop yourself with the following process.

### Setup

Fork `main` branch into your personal repository.
Clone it to local computer. Install node modules.
Before starting development, you should check to have any errors.

``` sh
git clone https://github.com/{your-personal-repo}/[[repo name]].git
cd [[repo name]]
npm install
```

### Develop

Let's start development!

### Pull Request

Before PR, check to test lastly and then check any errors.
If it has no error, commit and then push it!

For more information on PR's step, please see links of Contributing section.

## 💬 Contributing

- [Code of Conduct](/CODE_OF_CONDUCT.md)
- [Contributing Guidelines](/CONTRIBUTING.md)
- [Commit Message Convention](/docs/COMMIT_MESSAGE_CONVENTION.md)

## 📜 License

This software is licensed under the [MIT](/LICENSE) © [NHN Cloud](https://github.com/nhn).
