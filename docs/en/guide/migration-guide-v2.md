# v2 Migration Guide

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
  - [Rename package and files](#rename-package-and-files)
  - [Change the structure of CDN directories](#change-the-structure-of-cdn-directories)
- [Browser Compatibility Range (IE >= 11)](#browser-compatibility-range-ie--11)
- [API migration](#api-migration)
  - [Change term from `schedule` to `event`](#change-term-from-schedule-to-event)
  - [Terms like `currentTimeIndicator` and `currentTimeLine` are changed to `nowIndicator`](#terms-like-currenttimeindicator-and-currenttimeline-are-changed-to-nowindicator)
  - [Feature Improvements](#feature-improvements)
    - [Rendering optimization](#rendering-optimization)
    - [Theme improvement](#theme-improvement)
    - [View related type improvement](#view-related-type-improvement)
    - [Improved taskView and eventView types](#improved-taskview-and-eventview-types)
  - [Changes](#changes)
    - [Option changes](#option-changes)
    - [Instance methods](#instance-methods)
    - [Instance events](#instance-events)
    - [Template changes](#template-changes)
  - [Removals](#removals)
    - [Rendering-related parameter changes](#rendering-related-parameter-changes)

## Overview

TOAST UI Calendar v2.0, which uses [preact](https://preactjs.com/) to render calendars more efficiently, has been released. In v2, we have improved the bundle size and upgraded to a modern development environment, laying the groundwork for making it easy to add other features. We provide a migration guide for better understanding of users who use Calendar.

## Installation

### Rename package and files

The package name has been changed from `tui-calendar` to `@toast-ui/calendar`.

```sh
# v1
npm install tui-calendar@<version> # 1.x legacy version

# v2
npm install @toast-ui/calendar # latest version
npm install @toast-ui/calendar@<version> # specific version since 2.0
```

Also, the filenames have been changed from `tui-calendar` to `toastui-calendar`.

```js
/* ES6 module in Node.js environment */
// v1
import Calendar from 'tui-calendar';
import "tui-calendar/dist/tui-calendar.min.css";

// v2
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
```

```html
<!-- CDN -->
<!-- v1 -->
<link rel="stylesheet" href="https://uicdn.toast.com/tui-calendar/latest/tui-calendar.min.css" />
<script src="https://uicdn.toast.com/tui-calendar/latest/tui-calendar.min.js"></script>

<!-- v2 -->
<link rel="stylesheet" href="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.css" />
<script src="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.js"></script>
```

### Change the structure of CDN directories

The directory structure and bundle file names of the CDN have been changed. In v1, the files named `tui-calendar` were in the `tui-calendar` folder like `https://uicdn.toast.com/tui-calendar/latest/tui-calendar.js`. However, from v2, the files named `toastui-calendar` are in the `calendar` folder like `https://uicdn.toast.com/calendar/latest/toastui-calendar.js`.

The CDN address used in v1 is maintained, but the files inside `/tui-calendar/latest/` are the latest version of v1, not the latest version of TOAST UI Calendar. If you need to use the latest version, you should use the files in the `/calendar/latest/`.

```sh
- uicdn.toast.com/
  ├─ tui-calendar/ # v1
  │  ├─ latest     # the latest version of v1
  │  │  ├─ tui-calendar.css
  │  │  ├─ tui-calendar.js
  │  │  ├─ tui-calendar.min.css
  │  │  ├─ tui-calendar.min.js
  │  ├─ v1.0.0/    # specific version of v1
  │  │  ├─ ...
  ├─ calendar/     # since v2
  │  ├─ latest     # the latest version
  │  │  ├─ toastui-calendar.css
  │  │  ├─ toastui-calendar.js
  │  │  ├─ toastui-calendar.min.css
  │  │  ├─ toastui-calendar.min.js
  │  │  ├─ toastui-calendar.ie11.js
  │  │  ├─ toastui-calendar.ie11.min.js
  │  │  │  toastui-calendar.mjs
  │  ├─ v2.0.0/    # specific version since v2
  │  │  ├─ ...
```

## Browser Compatibility Range (IE >= 11)

From v2, the supported browser range is changed to *Internet Explorer 11 or* later. In v1, Internet Explorer 9 or higher browsers were supported, but the scope of support was changed for the use of the latest development environment and [preact](https://preactjs.com/) X (version 10).

The default bundle provides stable support for the latest two versions of the modern browsers. However, the default bundle does not include a polyfill for IE 11, so to support IE 11 or a legacy browser below a certain level, you need to add the IE 11 bundle that includes a polyfill as follows. Since the bundle size of IE 11 is about 30% larger than that of the default bundle, you must take care not to increase the bundle size unnecessarily by considering the range of support.

```ts
import Calendar from '@toast-ui/calendar/ie11';
```

## API migration

The APIs that require migration to use v2 are as follows.

- [Options](../apis/options.md)
- [Theme](../apis/theme.md)
- [Instance events](../apis/calendar.md#instance-events)
- [Instance methods](../apis/calendar.md#instance-methods)

The migration scope is largely divided into _feature improvements_, _changes_, and _removals_.

- [Feature improvements](#feature-improvements) : APIs with improved or newly added features
- [Changes](#changes) : APIs whose functionality is maintained but whose name, type, etc. have been changed
- [Removals](#removals) : APIs removed as unnecessary or spec out

In v2, the `creationGuide` representing the area when selecting a date or time has been changed to `gridSelection`. The term `vpanelSplitter` that controls each panel has been changed to `panelResizer`. Terms that are not unified like `daygrid` or `dayGridSchedule` are unified like `dayGrid` or `timeGrid`.

### Change term from `schedule` to `event`

In v2, the name was changed from `schedule` to `event` to match the meaning of events in the calendar. In addition to renaming, all related APIs such as instance methods including `schedule` and instance events have been changed as `event`.

### Terms like `currentTimeIndicator` and `currentTimeLine` are changed to `nowIndicator`

In v1, `currentTimeIndicator` and `currentTimeLine` are used interchangeably as terms representing the current timeline. In v2, this was unified as `nowIndicator`.

### Feature Improvements

#### Rendering optimization

In v1, rendering of the calendar was handled as direct DOM manipulation. As a result, unnecessary rendering could occur whenever the calendar was manipulated.

In v2, [preact](https://preactjs.com/) was introduced to improve rendering speed by reducing unnecessary rendering using virtual DOM and to support server-side rendering (SSR) in future. Accordingly, parameters such as `force` and `silent` that control rendering when using the instance method have been removed, and rendering is controlled according to the internal state of the calendar, making it impossible to control rendering when using the instance method.

#### Theme improvement

[Theme](../apis/theme.md) feature is improved. It has been improved from the method of designating the theme with the string key value concatenated with `.`, to the method using the nested object. Accordingly, the `setTheme` method has also been improved in a way that receives and processes nested objects as parameters. More details can be found in [Theme](../apis/theme.md).

```ts
// v1
calendar.setTheme({
  'common.dayName.color': '#333',
});
```

```ts
// v2
calendar.setTheme({
  common: {
    dayName: {
      color: '#333',
    },
  },
});
```

The following properties used in v1 have been removed or renamed from the theme. All the theme values except for the various color values and the width of the left area of each panel of the weekly/daily view have been removed.

- `month.dayname.height`
- `month.dayname.paddingLeft`
- `month.dayname.paddingRight`
- `month.dayname.fontSize`
- `month.dayname.fontWeight`
- `month.dayname.textAlign`
- `month.day.fontSize`
- All of `month.schedule` related properties
- `month.moreView.paddingBottom`
- `month.moreViewTitle.height`
- `month.moreViewTitle.marginBottom`
- `month.moreViewTitle.borderBottom`
- `month.moreViewTitle.padding`
- `month.moreViewList.padding`
- `week.dayname.height`
- `week.dayname.paddingLeft`
- `week.dayname.textAlign`
- `week.vpanelSplitter.height`
- `week.vpanelSplitter.border` -> `week.panelResizer.border`
- `week.daygridLeft.paddingRight`
- `week.timegridLeft.fontSize`
- `week.timegridLeftTimezoneLabel.height`
- `week.timegridOneHour.height`
- `week.timegridHalfHour.height`
- `week.timegridHalfHour.borderBottom` -> `week.timeGridHalfHourLine.borderBottm`
- `week.timegridHorizontalLine.borderBottom` -> `week.timeGridHourLine.borderBottom`
- `week.timegrid.paddingRight`
- All of `week.timegridSchedule` related properties
- `week.currentTime` -> `week.nowIndicatorLabel`
- `week.currentTime.fontSize`
- `week.currentTime.fontWeight`
- `week.currentTimeLinePast` -> `week.nowIndicatorPast`
- `week.currentTimeLineBullet` -> `week.nowIndicatorBullet`
- `week.currentTimeLineToday` -> `week.nowIndicatorToday`
- `week.currentTimeLineFuture` -> `week.nowIndicatorFuture`
- `week.pastTime.fontWeight`
- `week.futureTime.fontWeight`
- `week.creationGuide.fontSize`
- `week.creationGuide.fontWeight`
- All of `week.dayGridSchedule` related properties

The removed theme value can be applied using CSS instead. The following is the CSS file associated with the removed theme value.

| Removed theme values                                             | Associated file location                                         |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| Related to <code>month.dayname</code>                            | [dayNames.css](/apps/calendar/src/css/daygrid/dayNames.css)      |
| Related to <code>month.schedule</code>                           | [dayGrid.css](/apps/calendar/src/css/daygrid/dayGrid.css)        |
| Related to <code>month.moreView</code>                           | [seeMore.css](/apps/calendar/src/css/popup/seeMore.css)          |
| Related to <code>week.dayname</code>                             | [dayNames.css](/apps/calendar/src/css/daygrid/dayNames.css)      |
| Related to <code>week.dayGridLeft</code>                         | [allday.css](/apps/calendar/src/css/panel/allday.css)            |
| Related to <code>week.timeGridLeft</code>                        | [timeColumn.css](/apps/calendar/src/css/timegrid/timeColumn.css) |
| Related to <code>week.timegridSchedule</code>                    | [time.css](/apps/calendar/src/css/events/time.css)               |
| Related to <code>week.gridSelection</code> (creationGuide in v1) | [column.css](/apps/calendar/src/css/timegrid/column.css)         |
| Related to <code>week.dayGridSchedule</code>                     | [dayGrid.css](/apps/calendar/src/css/daygrid/dayGrid.css)        |

#### View related type improvement

The parameters and return types of the instance methods related to the view are now clearer. The types of views used in the calendar are divided into three views: monthly view(`month`), weekly view(`week`), and daily view(`day`).

| Method                   | Changes                                                         |
| ------------------------ |-----------------------------------------------------------------|
| <code>changeView</code>  | Improved the type of the view name parameter you want to change |
| <code>getViewName</code> | Improved the type of returned view name                         |

#### Improved taskView and eventView types

In the weekly/daily view, the types of the `taskView` option indicating whether to display the `milestone` and `task` panels and the `eventView` option indicating whether to display the `allday` and `time` panels have become clearer.

```ts
const calendar = new Calendar('#calendar', {
  week: {
    taskView: ['task'],
    eventView: ['time'],
  },
});
```

### Changes

#### Option changes

The options below have been moved within the options object or moved to the theme.

| Options                           | Changes                                              | Additional information                                       |
|-----------------------------------| ---------------------------------------------------- | ------------------------------------------------------------ |
| options.taskView                  | options.week.taskView                                |                                                              |
| options.eventView                 | options.week.eventView                               |                                                              |
| options.disableDblClick           | options.gridSelection.enableDblClick                 | Default changed from <code>false</code> to <code>true</code> |
| options.disableClick              | options.gridSelection.enableClick                    | Default changed from <code>false</code> to <code>true</code> |
| options.timezone.offsetCalculator | options.timezone.customOffsetCalculator              |                                                              |
| options.month.grid                | Moved to [theme](../apis/theme.md)                   |                                                              |
| options.month.moreLayerSize       | Moved to [theme](../apis/theme.md)                   |                                                              |
| options.month.isAlways6Week       | Changed to <code>options.month.isAlways6Weeks</code> |                                                              |
| options.month.daynames            | Changed to <code>options.month.dayNames</code>       |                                                              |
| options.week.daynames             | Changed to <code>options.week.dayNames</code>        |                                                              |

#### Instance methods

As the name of `creation popup` in v1 is changed to `form popup` in v2, the instance method `openCreationPopup` that opens a popup is also changed to `openFormPopup`.

```ts
// v1
calendar.openCreationPopup(schedule);
```

```ts
// v2
calendar.openFormPopup(event);
```

The `toggleSchedules` instance method of v1 that makes events with a specific calendar ID invisible or visible has been changed to `setCalendarVisibility` with a more precise meaning. The following is an example of hiding events which has their calendarId property as `'1'`.

```ts
// v1
calendar.toggleSchedules('1', true);
```

```ts
// v2
calendar.setCalendarVisibility('1', false);
```

#### Instance events

The v1 `clickMore` instance event has been changed to `clickMoreEventsBtn` with a clearer meaning.

```ts
// v1
calendar.on('clickMore', (event) => {
  console.log(event.date, event.target);
});
```

```ts
// v2
calendar.on('clickMoreEventsBtn', (event) => {
  console.log(event.date, event.target);
});
```

#### Template changes

v1's `timegridCurrentTime` has been renamed to `timegridNowIndicatorLabel`.

### Removals

In v2, support for [bower](https://bower.io/) and support for `jquery plugin` have been discontinued.

#### Rendering-related parameter changes

The `force`, `silent`, or `immediately` parameters of the following instance methods have been removed. Since v2 uses the rendering method through [preact](https://preactjs.com/), the parameters that can artificially control rendering have been removed.

- `changeView`
- `clear`
- `createEvents` ( `createSchedules` in v1)
- `deleteEvent` ( `deleteSchedule` in v1 )
- `render`
- `setCalendarColor`
- `setOptions`
- `updateEvent`
