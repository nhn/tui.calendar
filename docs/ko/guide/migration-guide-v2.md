# v2 마이그레이션 가이드

## 목차

- [개요](#개요)
- [설치](#설치)
  - [패키지 및 파일 이름 변경](#패키지-및-파일-이름-변경)
  - [CDN 디렉토리 구조 변경](#cdn-디렉토리-구조-변경)
- [브라우저 지원 범위(IE >= 11)](#브라우저-지원-범위ie--11)
- [API 마이그레이션](#api-마이그레이션)
  - [`schedule`에서 `event`로 용어 변경](#schedule에서-event로-용어-변경)
  - [`currentTimeIndicator`, `currentTimeLine`에서 `nowIndicator`로 용어 변경](#currenttimeindicator-currenttimeline에서-nowindicator로-용어-변경)
  - [기능 개선](#기능-개선)
    - [렌더링 최적화](#렌더링-최적화)
    - [테마 개선](#테마-개선)
    - [view 관련 타입 개선](#view-관련-타입-개선)
    - [taskView, eventView 타입 개선](#taskview-eventview-타입-개선)
  - [변경](#변경)
    - [옵션 변경사항](#옵션-변경사항)
    - [인스턴스 메서드 변경사항](#인스턴스-메서드-변경사항)
    - [인스턴스 이벤트 변경사항](#인스턴스-이벤트-변경사항)
    - [템플릿 변경사항](#템플릿-변경사항)
  - [제거](#제거)
    - [렌더링 관련 파라미터 변경 사항](#렌더링-관련-파라미터-변경-사항)

## 개요

[preact](https://preactjs.com/)를 이용해 더 효율적으로 캘린더를 렌더링하는 TOAST UI Calendar v2.0이 출시되었다. v2에서는 번들 크기 개선 및 모던 개발 환경으로 업그레이드하여 다른 기능들을 추가하기 용이하게 만들기 위한 기반을 마련했다. 이를 이용해 캘린더를 사용하는 사용자들의 이해를 높일 수 있도록 마이그레이션을 가이드로 제공하고 있다.

## 설치

### 패키지 및 파일 이름 변경

패키지명이 `tui-calendar`에서 `@toast-ui/calendar`로 변경되었다.

```sh
# v1
npm install tui-calendar@<version> # 1.x 특정 버전

# v2
npm install @toast-ui/calendar # 최신 버전
npm install @toast-ui/calendar@<version> # 2.0 이후 특정 버전
```

파일명 또한 `tui-calendar`에서 `toastui-calendar`로 변경되었다.

```js
/* Node.js 환경에서 ES6 모듈 */
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

### CDN 디렉토리 구조 변경

CDN의 디렉토리 구조와 번들 파일 이름이 변경되었다. v1에서는 `https://uicdn.toast.com/tui-calendar/latest/tui-calendar.js`와 같이 `tui-calendar` 라는 폴더 내에 `tui-calendar`라는 파일이 존재했다. 하지만 v2에서는 `https://uicdn.toast.com/calendar/latest/toastui-calendar.js`처럼 `calendar` 폴더 내에 `toastui-calendar`라는 파일이 존재한다.

v1에서 사용하던 CDN 주소는 유지되지만, `/tui-calendar/latest/` 내부 파일은 TOAST UI Calendar의 최신버전이 아니라 v1의 최신 버전이다. 최신 버전을 사용하고 싶다면 `/calendar/latest/` 내부 파일을 사용해야 한다.

```sh
- uicdn.toast.com/
  ├─ tui-calendar/ # v1
  │  ├─ latest     # v1의 최신 버전
  │  │  ├─ tui-calendar.css
  │  │  ├─ tui-calendar.js
  │  │  ├─ tui-calendar.min.css
  │  │  ├─ tui-calendar.min.js
  │  ├─ v1.0.0/    # v1의 특정 버전
  │  │  ├─ ...
  ├─ calendar/     # v2 이상
  │  ├─ latest     # 최신 버전
  │  │  ├─ toastui-calendar.css
  │  │  ├─ toastui-calendar.js
  │  │  ├─ toastui-calendar.min.css
  │  │  ├─ toastui-calendar.min.js
  │  │  ├─ toastui-calendar.ie11.js
  │  │  ├─ toastui-calendar.ie11.min.js
  │  │  │  toastui-calendar.mjs
  │  ├─ v2.0.0/    # v2 이상 특정 버전
  │  │  ├─ ...
```

## 브라우저 지원 범위(IE >= 11)

v2부터 지원하는 브라우저 범위가 *인터넷 익스플로러 11 이상*으로 변경된다. v1에서는 인터넷 익스플로러 9 이상의 브라우저를 지원했지만 최신 개발 환경 및 [preact](https://preactjs.com/) X(10 버전)의 사용을 위해 지원 범위를 변경하게 되었다.

기본 번들은 모던 브라우저의 최신 2개 버전을 안정적으로 지원한다. 하지만 기본 번들은 IE 11을 위한 폴리필이 포함되어있지 않으므로 IE 11 혹은 일정 수준 이하의 레거시 브라우저를 지원하기 위해서는 다음과 같이 폴리필이 포함된 IE 11 번들을 추가해야 한다.
IE 11의 번들 크기는 기본 번들보다 30% 가량 크기 때문에 반드시 지원 범위를 잘 고려하여 불필요하게 번들 크기를 늘리지 않도록 유의해야 한다.

```ts
import Calendar from '@toast-ui/calendar/ie11';
```

## API 마이그레이션

v2를 사용하기 위해 API 마이그레이션이 필요한 API는 다음과 같다.

- [옵션](../apis/options.md)
- [테마](../apis/theme.md)
- [인스턴스 이벤트](../apis/calendar.md#인스턴스-이벤트)
- [인스턴스 메서드](../apis/calendar.md#인스턴스-메서드)

마이그레이션 진행 단위는 크게 _기능 개선_, _변경_, _제거_ 로 구분된다.

- [기능 개선](#기능-개선): 기능이 개선되거나 새로 추가된 API
- [변경](#변경): 기능은 유지되나 이름, 타입 등이 변경된 API
- [제거](#제거): 불필요하거나 스펙 아웃으로 제거된 API

v2에서는 날짜나 시간을 선택할 때의 영역을 나타내는 `creationGuide`는 `gridSelection`으로 변경되었다. 각 패널을 조절하던 `vpanelSplitter`는 `panelResizer`로 용어가 변경되었다.
`daygrid`나 `dayGridSchedule`처럼 통일되지 않은 용어들은 `dayGrid`나 `timeGrid`처럼 통일되었다.

### `schedule`에서 `event`로 용어 변경

v2에서는 일정이라는 의미에 맞게 기존 `schedule`에서 `event`로 네이밍이 변경되었다. 단순한 변수명 뿐만 아니라 `schedule`이 포함된 인스턴스 메서드, 인스턴스 이벤트 등의 관련된 API 모두가 `event`로 변경되었다.

### `currentTimeIndicator`, `currentTimeLine`에서 `nowIndicator`로 용어 변경

v1에서는 현재 시간선을 나타내는 용어로 `currentTimeIndicator`과 `currentTimeLine`이 혼용되었다. v2에서는 이를 `nowIndicator`로 통일했다.

### 기능 개선

#### 렌더링 최적화

v1에서는 캘린더의 렌더링을 직접적인 DOM 조작으로 처리했다. 이에 따라 캘린더를 조작할 때마다 불필요한 렌더링이 일어날 수 있었다.

v2에서는 가상 DOM을 이용해 불필요한 렌더링을 줄여 렌더링 속도를 개선하고 추후 서버 사이드 렌더링(SSR)을 지원하기 위해 [preact](https://preactjs.com/)를 도입하였다. 이에 따라 인스턴스 메서드 사용 시 렌더링을 제어하는 `force`, `silent` 등의 파라미터가 제거되었고 캘린더 내부의 상태에 따라 렌더링이 제어되어 인스턴스 메서드를 사용할 때 렌더링을 제어할 수 없게 되었다.

#### 테마 개선

[테마](../apis/theme.md)가 개선되었다. `.`으로 연결된 문자열 키 값으로 테마를 지정하는 방식에서 중첩 객체를 이용한 방식으로 개선되었다. 이에 따라 `setTheme` 메서드도 중첩 객체를 파라미터로 받아 처리하는 방식으로 개선되었다. 자세한 사항은 [테마](../apis/theme.md)에서 확인할 수 있다.

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

v1에서 사용하던 다음 프로퍼티들이 테마에서 제거되거나 이름이 변경되었다. 각종 색상 값들과 주간/일간뷰의 각 패널의 왼쪽 영역의 너비를 제외한 테마 값들은 전부 제거되었다.

- `month.dayname.height`
- `month.dayname.paddingLeft`
- `month.dayname.paddingRight`
- `month.dayname.fontSize`
- `month.dayname.fontWeight`
- `month.dayname.textAlign`
- `month.day.fontSize`
- `month.schedule` 전체
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
- `week.timegridSchedule` 전체
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
- `week.dayGridSchedule` 전체

제거된 테마 값은 대신 CSS를 활용해 속성을 적용할 수 있다. 다음은 제거된 테마 값에 연관된 CSS 파일이다.

| 제거된 테마 값                                           | 연관 파일 위치                                                   |
| -------------------------------------------------------- | ---------------------------------------------------------------- |
| <code>month.dayname</code> 관련                          | [dayNames.css](/apps/calendar/src/css/daygrid/dayNames.css)      |
| <code>month.shedule</code> 관련                          | [dayGrid.css](/apps/calendar/src/css/daygrid/dayGrid.css)        |
| <code>month.moreView</code> 관련                         | [seeMore.css](/apps/calendar/src/css/popup/seeMore.css)          |
| <code>week.dayname</code> 관련                           | [dayNames.css](/apps/calendar/src/css/daygrid/dayNames.css)      |
| <code>week.dayGridLeft</code> 관련                       | [allday.css](/apps/calendar/src/css/panel/allday.css)            |
| <code>week.timeGridLeft</code> 관련                      | [timeColumn.css](/apps/calendar/src/css/timegrid/timeColumn.css) |
| <code>week.timeGridSchedule</code> 관련                  | [time.css](/apps/calendar/src/css/events/time.css)               |
| <code>week.gridSelection</code>(v1의 creationGuide) 관련 | [column.css](/apps/calendar/src/css/timegrid/column.css)         |
| <code>week.dayGridSchedule</code> 관련                   | [dayGrid.css](/apps/calendar/src/css/daygrid/dayGrid.css)        |

#### view 관련 타입 개선

view와 관련된 인스턴스 메서드의 파라미터 및 반환 타입이 좀 더 명확히 나오게 되었다. 캘린더에서 사용하는 뷰의 종류는 월간뷰, 주간뷰 및 일간뷰의 3가지 뷰로 나눠지며 이는 캘린더에서 `'month'`, `'week'`, `'day'`의 타입을 가지도록 타입을 명확히 하였다.

| 메서드명                 | 변경사항                                |
| ------------------------ | --------------------------------------- |
| <code>changeView</code>  | 변경하려는 뷰 이름 파라미터의 타입 개선 |
| <code>getViewName</code> | 반환되는 뷰 이름의 타입 개선            |

#### taskView, eventView 타입 개선

주간/일간뷰에서 `milestone`, `task` 패널을 표시할지 여부를 나타내는 `taskView` 옵션과 `allday`, `time` 패널을 표시할지 여부를 나타내는 `eventView` 옵션의 타입이 명확하게 변경되었다.

```ts
const calendar = new Calendar('#calendar', {
  week: {
    taskView: ['task'],
    eventView: ['time'],
  },
});
```

### 변경

#### 옵션 변경사항

아래의 옵션이 옵션 객체 내에서 위치가 이동하거나 테마로 이동되었다.

| 옵션                              | 변경사항                                         | 추가 설명                                                  |
| --------------------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| options.taskView                  | options.week.taskView                            |                                                            |
| options.eventView                 | options.week.eventView                           |                                                            |
| options.disableDblClick           | options.gridSelection.enableDblClick             | 기본값이 <code>false</code>에서 <code>true</code>로 변경됨 |
| options.disableClick              | options.gridSelection.enableClick                | 기본값이 <code>false</code>에서 <code>true</code>로 변경됨 |
| options.timezone.offsetCalculator | options.timezone.customOffsetCalculator          |                                                            |
| options.month.grid                | [테마](../apis/theme.md)로 이동                  |                                                            |
| options.month.moreLayerSize       | [테마](../apis/theme.md)로 이동                  |                                                            |
| options.month.isAlways6Week       | <code>options.month.isAlways6Weeks</code>로 변경 |                                                            |
| options.month.daynames            | <code>options.month.dayNames</code>로 변경       |                                                            |
| options.week.daynames             | <code>options.week.dayNames</code>로 변경        |                                                            |

#### 인스턴스 메서드 변경사항

v1의 `creation popup`이라는 명칭이 v2에서 `form popup`이라는 명칭으로 변경됨에 따라 팝업을 띄우는 인스턴스 메서드 `openCreationPopup`도 `openFormPopup`으로 변경되었다.

```ts
// v1
calendar.openCreationPopup(schedule);
```

```ts
// v2
calendar.openFormPopup(event);
```

특정 캘린더 ID를 가진 일정들을 보이지 않게 하거나 보이게 하는 v1의 `toggleSchedules` 인스턴스 메서드는 보다 정확한 의미를 지닌 `setCalendarVisibility`로 변경되었다. 다음은 캘린더 id가 `'1'`인 일정들을 보이지 않게 하는 예제다.

```ts
// v1
calendar.toggleSchedules('1', true);
```

```ts
// v2
calendar.setCalendarVisibility('1', false);
```

#### 인스턴스 이벤트 변경사항

v1의 `clickMore` 인스턴스 이벤트가 좀 더 명확한 의미를 가진 `clickMoreEventsBtn`으로 변경되었다.

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

#### 템플릿 변경사항

v1의 `timegridCurrentTime`이 `timegridNowIndicatorLabel`로 이름이 변경되었다.

### 제거

v2에서는 [bower](https://bower.io/)에 대한 지원과 `jquery plugin`에 대한 지원을 중단했다.

#### 렌더링 관련 파라미터 변경 사항

다음 인스턴스 메서드들의 `force`, `silent` 또는 `immediately` 파라미터가 제거되었다. v2에서는 [preact](https://preactjs.com/)를 통한 렌더링 방식을 사용하므로 인위적으로 렌더링을 조절할 수 있는 해당 파라미터들은 제거되었다.

- `changeView`
- `clear`
- `createEvents` (v1의 `createSchedules`)
- `deleteEvent` (v1의 `deleteSchedule`)
- `render`
- `setCalendarColor`
- `setOptions`
- `updateEvent`
