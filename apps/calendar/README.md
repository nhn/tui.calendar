# ![TOAST UI Calendar](https://user-images.githubusercontent.com/26706716/39230183-7f8ff186-48a0-11e8-8d9c-9699d2d0e471.png)

> A JavaScript schedule calendar that is full featured. Now your service just got the customizable calendar.

[![npm](https://img.shields.io/npm/v/tui-calendar.svg)](https://www.npmjs.com/package/@toast-ui/calendar)

## 🚩 Table of Contents

- [TOAST UI Calendar](#)
  - [🚩 Table of Contents](#-table-of-contents)
  - [Collect statistics on the use of open source](#collect-statistics-on-the-use-of-open-source)
  - [💾 Install](#-install)
    - [Via Package Manager](#via-package-manager)
      - [npm](#npm)
    - [Download Source Files](#download-source-files)
  - [🔨 Usage](#-usage)
    - [HTML](#html)
    - [JavaScript](#javascript)
      - [Load](#load)

## 🚧 The new version is coming out

You're now looking at the `main` branch of the latest version of TOAST UI Calendar. You can try [the alpha version](https://github.com/nhn/tui.calendar/releases/tag/v2.0.0-alpha.0) of the new calendar.

```sh
npm install --save @toast-ui/calendar@2.0.0-alpha.1
```

For the current(and legacy) version, Please check out the [`v1` branch](https://github.com/nhn/tui.calendar/tree/v1).

## Collect statistics on the use of open source

TOAST UI Calendar applies Google Analytics (GA) to collect statistics on the use of open source, in order to identify how widely TOAST UI Calendar is used throughout the world. It also serves as important index to determine the future course of projects. location.hostname (e.g. > “ui.toast.com") is to be collected and the sole purpose is nothing but to measure statistics on the usage. To disable GA, use the following `usageStatistics` option when creating a calendar.

To disable GA use the [options](https://nhn.github.io/tui.calendar/2.0.0-alpha/?path=/story/documentation-%ED%95%9C%EA%B5%AD%EC%96%B4-api-%EC%98%B5%EC%85%98--page#usagestatistics):

```js
const calendar = new Calendar('#calendar', {
  usageStatistics: false
});
```

## 💾 Install

TOAST UI products can be used by using the package manager or downloading the source directly.
However, we highly recommend using the package manager.

### Via Package Manager

TOAST UI products are registered in [npm](https://www.npmjs.com/).
You can conveniently install it using the commands provided by each package manager.
When using npm, be sure to use it in the environment [Node.js](https://nodejs.org) is installed.

#### npm

``` sh
$ npm install --save @toast-ui/calendar@v2.0.0-alpha.0
```

### Via Contents Delivery Network (CDN)

🚧 **CDN assets are not provided in alpha.** 🚧

TOAST UI products are available over the CDN powered by [NHN Cloud](https://www.toast.com).

You can use the CDN as below.

Insert style sheet files

```html
<link rel="stylesheet" type="text/css" href="https://uicdn.toast.com/tui-calendar/latest/toastui-calendar.min.css" />

<!-- If you use the default popups, use this. -->
<link rel="stylesheet" type="text/css" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<link rel="stylesheet" type="text/css" href="https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.css" />
```

Insert JavaScript file

```html
<script src="https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.min.js"></script>
<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.min.js"></script>
<script src="https://uicdn.toast.com/tui-calendar/latest/tui-calendar.js"></script>
```

If you want to use a specific version, use the tag name instead of `latest` in the url's path.

The CDN directory has the following structure.

```
tui-calendar/
├─ latest/
│  ├─ tui-calendar.js
│  └─ tui-calendar.min.js
│  └─ tui-calendar.css
│  └─ tui-calendar.min.css
├─ v1.0.0/
│  ├─ ...
```

### Download Source Files

* [Download all sources for each version](https://github.com/nhn/tui.calendar/releases)

## 🔨 Usage

### HTML

Place a `<div></div>` where you want TOAST UI Calendar rendered.

```html
<body>
...
<div id="calendar" style="height: 800px;"></div>
...
</body>
```

### JavaScript

#### Using namespace in browser environment

```javascript
const Calendar = tui.Calendar;
```

#### Using module format in node environment

```javascript
const Calendar = require('tui-calendar'); /* CommonJS */
require("tui-calendar/dist/tui-calendar.css");

// If you use the default popups, use this.
require("tui-date-picker/dist/tui-date-picker.css");
require("tui-time-picker/dist/tui-time-picker.css");
```

```javascript
import Calendar from 'tui-calendar'; /* ES Modules */
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
```

Then you can create a calendar instance with [options](https://nhn.github.io/tui.calendar/2.0.0-alpha/?path=/story/documentation-%ED%95%9C%EA%B5%AD%EC%96%B4-api-%EC%98%B5%EC%85%98--page) to set configuration.

```javascript
const calendar = new Calendar('#calendar', {
  defaultView: 'month',
  taskView: true,
  template: {
    monthDayname: (dayname) => {
      return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    }
    ...
  }
});
```
