# Getting Started

## Table of Contents

- [Install Vue 2](#install-vue-2)
- [Installation](#installation)
  - [Using the package manager](#using-the-package-manager)
    - [npm](#npm)
- [How to use the calendar](#how-to-use-the-calendar)
  - [JavaScript](#javascript)
    - [Importing modules](#importing-modules)
    - [Loading bundle files for legacy browsers](#loading-bundle-files-for-legacy-browsers)
  - [CSS](#css)
- [Vue](#vue)
  - [Props](#props)
  - [Events](#events)
  - [Methods](#methods)
    - [getRootElement](#getrootelement)
    - [getInstance](#getinstance)
- [Basic usage](#basic-usage)
  - [Disable to collect hostname for Google Analytics(GA)](#disable-to-collect-hostname-for-google-analyticsga)

## Install Vue 2

To use TOAST UI Calendar for Vue, [Vue 2](https://v2.vuejs.org/) should be installed. Vue 3 is not supported.

## Installation

TOAST UI products can be used by using the package manager or by directly downloading the source code. However, it is recommended to use a package manager.

### Using the package manager

TOAST UI products are registered in the [npm](https://www.npmjs.com/) package registry. You can easily install packages using CLI tools provided by each package manager. To use npm, you need to install [Node.js](https://nodejs.org) in advance.

#### npm

```sh
npm install @toast-ui/vue-calendar # latest version
npm install @toast-ui/vue-calendar@<version> # specific version
```

## How to use the calendar

### JavaScript

#### Importing modules

There are three ways to import TOAST UI Calendar for Vue depending on the environment.

```js
/* ES6 module in Node.js environment */
import Calendar from '@toast-ui/vue-calendar';
```

```js
/* CommonJS in Node.js environment */
const Calendar = require('@toast-ui/vue-calendar');
```

```js
/* in the browser environment namespace */
const Calendar = tui.VueCalendar;
```

#### Loading bundle files for legacy browsers

TOAST UI Calendar for Vue provides a separate bundle file for legacy browsers. The basic bundle provides stable support for the latest two versions of the modern browser. However, the basic bundle does not include a polyfill for IE11, so to support IE11 or similar level of legacy browsers, you need to add the IE11 bundle that includes a polyfill as follows.

Since the bundle size of IE11 is about 2x larger than that of the default bundle, you must take care not to increase the bundle size unnecessarily by considering the range of support.

```js
/* ES6 module in Node.js environment */
import Calendar from '@toast-ui/vue-calendar/ie11';
```

```js
/* CommonJS in Node.js environment */
const Calendar = require('@toast-ui/vue-calendar/ie11');
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

## Vue

You can load a calendar component and add it to the `components` in your component or Vue instance.

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

### Props

TOAST UI Calendar for Vue provide props for [options of TOAST UI Calendar](/docs/en/apis/options.md). Each name of props is same with options of Toast UI Calendar except `view` is for `defaultView`.

Additionally, it provides a `events` prop to add events.

```html
<template>
  <Calendar
    style="height: 800px"
    :view="view"
    :use-detail-popup="true"
    :month="month"
    :calendars="calendars"
    :events="events"
  />
</template>

<script>
import Calendar from '@toast-ui/vue-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

export default {
  name: 'YourComponent',
  components: {
    Calendar,
  },
  data() {
    return {
      view: 'month',
      month: {
        dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        visibleWeeksCount: 3,
      },
      calendars: [{ id: 'cal1', name: 'Personal' }],
      events: [
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
      ],
    };
  },
};
</script>
```

### Events

You can use the `v-on` directive to handle the calendar instance events. For more information such as the parameters of each event, see [TOAST UI Calendar Instance Events](/docs/en/apis/calendar.md#instance-events).

```html
<template>
  <Calendar
    style="height: 800px"
    ref="calendar"
    @selectDateTime="onSelectDateTime"
    @beforeCreateSchedule="onBeforeCreateSchedule"
  />
</template>

<script>
import Calendar from '@toast-ui/vue-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

export default {
  name: 'YourComponent',
  components: {
    Calendar,
  },
  methods: {
    onSelectDateTime({ start, end }) {
      alert(`Select ${start} ~ ${end}`);
    },
    onBeforeCreateSchedule(event) {
      const calendarInstance = this.$refs.calendar.getInstance();
      calendarInstance.createEvents([
        {
          ...event,
          id: uuid(),
        }
      ]);
    },
  },
};
</script>
```

### Methods

💡 Click on a method to see more detailed explanations and usage examples.

| Method | Description |
| --- | --- |
| [getRootElement](#getrootelement) | Return the element on which the calendar is mounted. |
| [getInstance](#getinstance) | Return the calendar instance. |

#### getRootElement

- Type: `getRootElement(): HTMLDivElement`
- Returns: `HTMLDivElement` - the element on which the calendar is mounted

Return the element on which the calendar is mounted.

#### getInstance

- Type: `getInstance(): Calendar`
- Returns: `Calendar` - the calendar instance

Return the calendar instance. You can use this to call the [calendar instance methods](/docs/en/apis/calendar.md#instance-methods).

```html
<template>
  <Calendar
    style="height: 800px"
    ref="calendar"
  />
</template>

<script>
import Calendar from '@toast-ui/vue-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

export default {
  name: 'YourComponent',
  components: {
    Calendar,
  },
  computed: {
    calendarInstance() {
      return this.$refs.calendar.getInstance();
    }
  },
  mounted() {
    this.calendarInstance.setDate('2022-06-29T12:30:00');
  }
};
</script>
```

## Basic usage

### Disable to collect hostname for Google Analytics(GA)

[TOAST UI Calendar](https://github.com/nhn/tui.calendar) applies [GA](https://analytics.google.com/analytics/web/) to collect statistics on open source usage to see how widespread it is around the world. This serves as an important indicator to determine the future progress of the project. It collects `location.hostname` (e.g. "ui.toast.com") and is only used to measure usage statistics.

To disable GA, set the [`usageStatistics` prop](/docs/en/apis/options.md#usagestatistics) to `false`:

```html
<template>
  <Calendar :usage-statistics="false"/>
</template>
```
