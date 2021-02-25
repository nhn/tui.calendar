# ![TOAST UI Calendar](https://user-images.githubusercontent.com/26706716/39230183-7f8ff186-48a0-11e8-8d9c-9699d2d0e471.png)

> 🍞📅 A JavaScript schedule calendar that is full featured. Now your service just got the customizable calendar.
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![GitHub release](https://img.shields.io/github/release/nhn/tui.calendar.svg)](https://github.com/nhn/tui.calendar/releases/latest)
[![npm](https://img.shields.io/npm/v/tui-calendar.svg)](https://www.npmjs.com/package/tui-calendar)
[![GitHub license](https://img.shields.io/github/license/nhn/tui.calendar.svg)](https://github.com/nhn/tui.calendar/blob/master/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.project-name/labels/help%20wanted)
[![code with hearth by NHN](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-NHN-ff1414.svg)](https://github.com/nhn)

![tui-calendar-demo-nhn-corp](https://user-images.githubusercontent.com/43128697/55609612-0c19db00-57bc-11e9-849b-f42a9bd8c591.gif)


## 📦 Packages

The functionality of TOAST UI Calendar is available when using the Plain JavaScript, React, Vue Component.

- [toast-ui.calendar](https://github.com/nhn/tui.calendar/tree/main/apps/calendar) - Plain JavaScript component implemented by NHN.
- [toast-ui.vue-calendar](https://github.com/nhn/tui.calendar/tree/main/apps/vue-calendar) - **Vue** wrapper component implemented by NHN.
- [toast-ui.react-calendar](https://github.com/nhn/tui.calendar/tree/main/apps/react-calendar) - **React** wrapper component implemented by NHN.

## 📙 Documents

* [Getting Started](https://github.com/nhn/tui.calendar/blob/master/docs/getting-started.md)
* [Tutorials](https://github.com/nhn/tui.calendar/tree/master/docs)
* [APIs](https://nhn.github.io/tui.calendar/latest/Calendar)
- [Getting Started](https://github.com/nhn/tui.calendar/blob/main/docs/en/getting-started.md)
- Tutorials
  - [English](https://github.com/nhn/tui.calendar/blob/main/docs/README.md)
  - [한국어](https://github.com/nhn/tui.calendar/blob/main/docs/ko/README.md)
- [APIs](https://nhn.github.io/tui.calendar/latest/)
- v2.0 Migration Guide
  - [English](https://github.com/nhn/tui.calendar/blob/main/docs/v2.0-migration-guide-en.md)
  - [한국어](https://github.com/nhn/tui.calendar/blob/main/docs/v2.0-migration-guide-ko.md)


## 😍 Why TOAST UI Calendar?
### ✨ How Cool: Monthly, Weekly, Daily and Various View Types.

| Monthly | Weekly |
| --- | --- |
| ![image](https://user-images.githubusercontent.com/26706716/39230396-4d79a592-48a1-11e8-9849-08e80f1bedf6.png) | ![image](https://user-images.githubusercontent.com/26706716/39230459-83beac38-48a1-11e8-8cd4-11b97817f1f8.png) |

| Daily | 2 Weeks |
| --- | --- |
| ![image](https://user-images.githubusercontent.com/26706716/39230685-60a2a1d6-48a2-11e8-9d46-ce5693277a64.png) | ![image](https://user-images.githubusercontent.com/26706716/39230638-281d5266-48a2-11e8-84d8-ab289f372051.png) |

### Easy to Use: Dragging and Resizing a Schedule

| Dragging | Resizing |
| --- | --- |
| ![image](https://user-images.githubusercontent.com/26706716/39230930-591031f8-48a3-11e8-8f62-e12e6c19920c.gif) | ![image](https://user-images.githubusercontent.com/26706716/39231671-c926d0da-48a5-11e8-959d-35fd32f2c522.gif) |


## Ready to Use: Default Popups

| Creation Popup | Detail Popup |
| --- | --- |
| ![image](https://user-images.githubusercontent.com/26706716/39230798-d151a9ae-48a2-11e8-842d-b19b40432f48.png) | ![image](https://user-images.githubusercontent.com/26706716/39230820-e73fa11c-48a2-11e8-9348-8e3d81979a78.png) |

## 🎨 Features

* Supports various view types: daily, weekly, monthly(6 weeks, 2 weeks, 3 weeks)
* Supports efficient management of milestone and task schedules
* Supports the narrow width of weekend
* Supports changing start day of week
* Supports customizing the date and schedule information UI(including a header and a footer of grid cell)
* Supports adjusting a schedule by mouse dragging
* Supports customizing UI by theme

## 🐾 Examples

* [Basic](https://nhn.github.io/tui.calendar/latest/tutorial-example00-basic) : Example of using default options.

Here are more [examples](https://nhn.github.io/tui.calendar/latest/tutorial-example00-basic) and play with TOAST UI Calendar!

## 🔧 Pull Request Steps

TOAST UI products are open source, so you can create a pull request(PR) after you fix issues.
Run npm scripts and develop yourself with the following process.

### Setup

Fork `develop` branch into your personal repository.
Clone it to local computer. Install node modules.
Before starting development, you should check to haveany errors.

``` sh
$ git clone https://github.com/{owner}/tui.calendar.git
$ cd tui.calendar
$ npm install
$ npm run test
```

### Develop

Let's start development!
You can see your code is reflected as soon as you saving the codes by running a server.
Don't miss adding test cases and then make green rights.

#### Run webpack-dev-server

``` sh
$ npm run serve
```

#### Run karma test

``` sh
$ npm run test
```

### Pull Request

Before PR, check to test lastly and then check any errors.
If it has no error, commit and then push it!

For more information on PR's step, please see links of Contributing section.

## 💬 Contributing

* [Code of Conduct](https://github.com/nhn/tui.calendar/blob/master/CODE_OF_CONDUCT.md)
* [Contributing guideline](https://github.com/nhn/tui.calendar/blob/master/CONTRIBUTING.md)
* [Issue guideline](https://github.com/nhn/tui.calendar/blob/master/docs/ISSUE_TEMPLATE.md)
* [Commit convention](https://github.com/nhn/tui.calendar/blob/main/docs/COMMIT_MESSAGE_CONVENTION.md)

## 🌏 Browser Support
| <img src="https://user-images.githubusercontent.com/1215767/34348387-a2e64588-ea4d-11e7-8267-a43365103afe.png" alt="Chrome" width="16px" height="16px" /> Chrome | <img src="https://user-images.githubusercontent.com/1215767/34348590-250b3ca2-ea4f-11e7-9efb-da953359321f.png" alt="IE" width="16px" height="16px" /> Internet Explorer | <img src="https://user-images.githubusercontent.com/1215767/34348380-93e77ae8-ea4d-11e7-8696-9a989ddbbbf5.png" alt="Edge" width="16px" height="16px" /> Edge | <img src="https://user-images.githubusercontent.com/1215767/34348394-a981f892-ea4d-11e7-9156-d128d58386b9.png" alt="Safari" width="16px" height="16px" /> Safari | <img src="https://user-images.githubusercontent.com/1215767/34348383-9e7ed492-ea4d-11e7-910c-03b39d52f496.png" alt="Firefox" width="16px" height="16px" /> Firefox |
| :---------: | :---------: | :---------: | :---------: | :---------: |
| Latest | 9+ | Latest | Latest | Latest |

## 🔩 Dependency

* [tui-date-picker](https://github.com/nhn/tui.date-picker) >= 3.0.0 is optional.
* [tui-time-picker](https://github.com/nhn/tui.time-picker) >= 1.0.0 is optional.

## 🍞 TOAST UI Family
* [TOAST UI Grid](https://github.com/nhn/tui.grid)
* [TOAST UI Chart](https://github.com/nhn/tui.chart)
* [TOAST UI Editor](https://github.com/nhn/tui.editor)
* [TOAST UI Image-Editor](https://github.com/nhn/tui.image-editor)
* [TOAST UI Components](https://github.com/nhn?q=tui)

## 🚀 Used By
* [TOAST Dooray! - Collaboration Service (Project, Messenger, Mail, Calendar, Drive, Wiki, Contacts)](https://dooray.com)
* [NCP - Commerce Platform](https://www.e-ncp.com/)
* [shopby](https://www.godo.co.kr/shopby/main.gd)
* [payco-shopping](https://shopping.payco.com/)
* [iamTeacher](https://teacher.iamservice.net)
* [linder](https://www.linder.kr)

## 📜 License

This software is licensed under the [MIT](https://github.com/nhn/tui.calendar/blob/master/LICENSE) © [NHN](https://github.com/nhn).
