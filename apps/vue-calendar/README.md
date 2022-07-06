# TOAST UI Calendar for Vue 2

> This is a Vue component wrapping [TOAST UI Calendar](/apps/calendar/).

[![vue2](https://img.shields.io/badge/vue-2.x-4fc08d.svg)](https://v2.vuejs.org/)
[![npm version](https://img.shields.io/npm/v/@toast-ui/vue-calendar.svg)](https://www.npmjs.com/package/@toast-ui/vue-calendar)
[![license](https://img.shields.io/github/license/nhn/tui.calendar.svg)](https://github.com/nhn/tui.calendar/blob/master/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.calendar/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
[![code with hearth by NHN Cloud](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-NHN_Cloud-ff1414.svg)](https://github.com/nhn)

## 🚩 Table of Contents

- [📙 Documents](#-documents)
- [Collect statistics on the use of open source](#collect-statistics-on-the-use-of-open-source)
- [💾 Install](#-install)
  - [Using npm](#using-npm)
- [📅 Usage](#-usage)
  - [Install Vue 2](#install-vue-2)
  - [Load](#load)
  - [Implement](#implement)
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

TOAST UI Calendar for Vue applies Google Analytics (GA) to collect statistics on the use of open source, in order to identify how widely TOAST UI Calendar is used throughout the world. It also serves as important index to determine the future course of projects. `location.hostname` (e.g. > “ui.toast.com") is to be collected and the sole purpose is nothing but to measure statistics on the usage.

To disable GA, set the [`usageStatistics` option](/docs/en/apis/options.md#usagestatistics) to `false`:

```html
<template>
  <ToastUICalendar :usage-statistics="false" />
</template>
```

## 💾 Install

### Using npm

```sh
npm install --save @toast-ui/vue-calendar
```

## 📅 Usage

### Install Vue 2

To use TOAST UI Calendar for Vue, [Vue 2](https://v2.vuejs.org/) should be installed. Vue 3 is not supported.

### Load

You can use Toast UI Calendar for Vue as moudule format or namespace. Also you can use Single File Component (SFC of Vue).

```js
/* ES6 module in Node.js environment */
import ToastUICalendar from '@toast-ui/vue-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.css';
```

```js
/* CommonJS in Node.js environment */
const Calendar = require('@toast-ui/vue-calendar');
require('@toast-ui/calendar/dist/toastui-calendar.css');
```

```js
// browser environment namespace
const Calendar = tui.VueCalendar;
```

### Implement

```html
<template>
  <Calendar style="height: 800px" />
</template>

<script>
import Calendar from '@toast-ui/vue-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

export default {
  name: 'YourComponent',
  components: {
    Calendar,
  },
};
</script>
```

```js
import Calendar from '@toast-ui/vue-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

new Vue({
  el: '#app',
  components: {
    Calendar,
  },
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
