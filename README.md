# ![TOAST UI Calendar](https://user-images.githubusercontent.com/26706716/39230183-7f8ff186-48a0-11e8-8d9c-9699d2d0e471.png)

> 🍞📅 A JavaScript schedule calendar that is full featured. Now your service just got the customizable calendar.
<!-- [![npm](https://img.shields.io/npm/v/@toast-ui/calendar.svg)](https://www.npmjs.com/package/@toast-ui/calendar) -->
[![GitHub license](https://img.shields.io/github/license/nhn/tui.calendar.svg)](https://github.com/nhn/tui.calendar/blob/main/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.project-name/labels/help%20wanted)
[![code with hearth by NHN Cloud](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-NHN_Cloud-ff1414.svg)](https://github.com/nhn)

## 🚧 The new version is coming out

You're now looking at the `main` branch of the latest version of TOAST UI Calendar. You can try [the alpha version](https://github.com/nhn/tui.calendar/releases/tag/v2.0.0-alpha.0) of the new calendar.

```sh
npm install @toast-ui/calendar@2.0.0-alpha
```

For the current(and legacy) version, Please check out the [`v1` branch](https://github.com/nhn/tui.calendar/tree/v1).

## 📦 Packages

The functionality of TOAST UI Calendar is available when using the Plain JavaScript, React, Vue Component.

- [@toast-ui/calendar](https://github.com/nhn/tui.calendar/tree/main/apps/calendar) - Plain JavaScript component implemented by NHN.
- 🚧 React & Vue wrappers are coming with the public release.

## 📙 Documents

🚧 Documents are written in Korean at this moment, but we will add english version soon.

- [Getting Started (Korean)](https://nhn.github.io/tui.calendar/2.0.0-alpha/?path=/story/documentation-%ED%95%9C%EA%B5%AD%EC%96%B4-%EA%B0%80%EC%9D%B4%EB%93%9C-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0--page)
- [APIs (Korean)](https://nhn.github.io/tui.calendar/2.0.0-alpha)
- v2.0 Migration Guide
  - [한국어](https://nhn.github.io/tui.calendar/2.0.0-alpha/?path=/story/documentation-%ED%95%9C%EA%B5%AD%EC%96%B4-%EA%B0%80%EC%9D%B4%EB%93%9C-v2-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98-%EA%B0%80%EC%9D%B4%EB%93%9C--page)

## 📅 Features

### ✨ Monthly, Weekly, Daily and Various View Types

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

## 🎨 Other Features

- Supports various view types: daily, weekly, monthly(6 weeks, 2 weeks, 3 weeks)
- Supports efficient management of milestone and task schedules
- Supports the narrow width of weekend
- Supports changing start day of week
- Supports customizing the date and schedule information UI(including a header and a footer of grid cell)
- Supports adjusting a schedule by mouse dragging
- Supports customizing UI by theme

## 💬 Contributing

- [Code of Conduct](https://github.com/nhn/tui.calendar/blob/main/CODE_OF_CONDUCT.md)
- [Contributing guideline](https://github.com/nhn/tui.calendar/blob/main/CONTRIBUTING.md)
- [Issue guideline](https://github.com/nhn/tui.calendar/blob/main/docs/ISSUE_TEMPLATE.md)
- [Commit convention](https://github.com/nhn/tui.calendar/blob/main/docs/COMMIT_MESSAGE_CONVENTION.md)

## 🌏 Browser Support

| <img src="https://user-images.githubusercontent.com/1215767/34348387-a2e64588-ea4d-11e7-8267-a43365103afe.png" alt="Chrome" width="16px" height="16px" /> Chrome | <img src="https://user-images.githubusercontent.com/1215767/34348590-250b3ca2-ea4f-11e7-9efb-da953359321f.png" alt="IE" width="16px" height="16px" /> Internet Explorer | <img src="https://user-images.githubusercontent.com/1215767/34348380-93e77ae8-ea4d-11e7-8696-9a989ddbbbf5.png" alt="Edge" width="16px" height="16px" /> Edge | <img src="https://user-images.githubusercontent.com/1215767/34348394-a981f892-ea4d-11e7-9156-d128d58386b9.png" alt="Safari" width="16px" height="16px" /> Safari | <img src="https://user-images.githubusercontent.com/1215767/34348383-9e7ed492-ea4d-11e7-910c-03b39d52f496.png" alt="Firefox" width="16px" height="16px" /> Firefox |
| :---------: | :---------: | :---------: | :---------: | :---------: |
| Latest | 11+ | Latest | Latest | Latest |

## 🔩 Dependencies

- [Preact](https://github.com/preactjs/preact)
- [Immer](https://github.com/immerjs/immer)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- (Optional) [tui-date-picker](https://github.com/nhn/tui.date-picker)
- (Optional) [tui-time-picker](https://github.com/nhn/tui.time-picker)

## 🍞 TOAST UI Family

- [TOAST UI Grid](https://github.com/nhn/tui.grid)
- [TOAST UI Chart](https://github.com/nhn/tui.chart)
- [TOAST UI Editor](https://github.com/nhn/tui.editor)
- [TOAST UI Image-Editor](https://github.com/nhn/tui.image-editor)
- [TOAST UI Components](https://github.com/nhn?q=tui)

## 🚀 Used By

- [NHN Dooray! - Collaboration Service (Project, Messenger, Mail, Calendar, Drive, Wiki, Contacts)](https://dooray.com)
- [NCP - Commerce Platform](https://www.e-ncp.com/)
- [shopby](https://www.godo.co.kr/shopby/main.gd)
- [payco-shopping](https://shopping.payco.com/)
- [iamTeacher](https://teacher.iamservice.net)
- [linder](https://www.linder.kr)

## 📜 License

This software is licensed under the [MIT](https://github.com/nhn/tui.calendar/blob/main/LICENSE) © [NHN Cloud](https://github.com/nhn).
