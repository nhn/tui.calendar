# TOAST UI Calendar for React

> This is a React component wrapping [TOAST UI Calendar](/apps/calendar).

[![React](https://img.shields.io/badge/react-61dafb.svg)](https://reactjs.org/)
[![npm version](https://img.shields.io/npm/v/@toast-ui/react-calendar.svg)](https://www.npmjs.com/package/@toast-ui/react-calendar)
[![license](https://img.shields.io/github/license/nhn/tui.calendar.svg)](https://github.com/nhn/tui.calendar/blob/master/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.calendar/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
[![code with hearth by NHN Cloud](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-NHN_Cloud-ff1414.svg)](https://github.com/nhn)

## 🚩 Table of Contents

- [📙 Documents](#-documents)
- [Collect statistics on the use of open source](#collect-statistics-on-the-use-of-open-source)
- [💾 Installation](#-installation)
  - [npm](#npm)
- [📅 Usage](#-usage)
  - [Load](#load)
- [🔧 Pull Request Steps](#-pull-request-steps)
  - [Setup](#setup)
  - [Develop](#develop)
  - [Pull Request](#pull-request)
- [💬 Contributing](#-contributing)
- [📜 License](#-license)

## 📙 Documents

- [English](./docs/README.md)
- [Korean](./docs/ko/README.md)

## Collect statistics on the use of open source

TOAST UI Calendar for React applies Google Analytics (GA) to collect statistics on the use of open source, in order to identify how widely TOAST UI Calendar is used throughout the world. It also serves as important index to determine the future course of projects. `location.hostname` (e.g. > “ui.toast.com") is to be collected and the sole purpose is nothing but to measure statistics on the usage.

To disable GA, set the [`usageStatistics` option](/docs/en/apis/options.md#usagestatistics) to `false`:

```jsx
export function MyCalendar() {
  return (
    <div>
      <Calendar usageStatistics={false} />
    </div>
  );
}
```

## 💾 Installation

### npm

```sh
npm install --save @toast-ui/react-calendar
```

## 📅 Usage

### Load

You can use Toast UI Calendar for React as moudule format or namespace.

```js
/* ES6 module in Node.js environment */
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
```

```js
/* CommonJS in Node.js environment */
const Calendar = require('@toast-ui/react-calendar');
require('@toast-ui/calendar/dist/toastui-calendar.min.css');
```

```js
// browser environment namespace
const Calendar = tui.ReactCalendar;
```

## 🔧 Pull Request Steps

TOAST UI products are open source, so you can create a pull request(PR) after you fix issues.
Run npm scripts and develop yourself with the following process.

### Setup

Fork `main` branch into your personal repository.
Clone it to local computer. Install node modules.
Before starting development, you should check to have any errors.

```sh
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
