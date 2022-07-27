# 시작하기

## 목차

- [설치하기](#설치하기)
  - [패키지 매니저 사용하기](#패키지-매니저-사용하기)
    - [npm](#npm)
- [사용하기](#사용하기)
  - [자바스크립트](#자바스크립트)
    - [불러오기](#불러오기)
    - [레거시 브라우저용 번들 파일 불러오기](#레거시-브라우저용-번들-파일-불러오기)
  - [CSS](#css)
- [React에서 사용하기](#react에서-사용하기)
  - [Props](#props)
    - [테마](#테마)
  - [인스턴스 메서드](#인스턴스-메서드)
  - [메서드](#메서드)
    - [getRootElement](#getrootelement)
    - [getInstance](#getinstance)
- [기본적인 사용 방법](#기본적인-사용-방법)
  - [Google Analytics(GA)를 위한 hostname 수집 거부하기](#google-analyticsga를-위한-hostname-수집-거부하기)
  - [⚠️ Props를 넘길 때 주의할 점](#️-props를-넘길-때-주의할-점)

## 설치하기

TOAST UI 제품들은 패키지 매니저를 이용하거나, 직접 소스 코드를 다운받아 사용할 수 있다. 하지만 패키지 매니저 사용을 권장한다.

### 패키지 매니저 사용하기

TOAST UI 제품들은 [npm](https://www.npmjs.com/) 패키지 매니저에 등록되어 있다.
각 패키지 매니저가 제공하는 CLI 도구를 사용하면 쉽게 패키지를 설치할 수 있다. npm 사용을 위해선 [Node.js](https://nodejs.org)를 미리 설치해야 한다.

#### npm

```sh
npm install @toast-ui/react-calendar # 최신 버전
npm install @toast-ui/react-calendar@<version> # 특정 버전
```

## 사용하기

### 자바스크립트

#### 불러오기

TOAST UI 캘린더 React Wrapper는 아래 세 가지 방법으로 불러올 수 있다.

```js
/* Node.js 환경에서 ES6 모듈 */
import Calendar from '@toast-ui/react-calendar';
```

```js
/* Node.js 환경에서 CommonJS */
const Calendar = require('@toast-ui/react-calendar');
```

```js
/* 브라우저 환경에서 namespace */
const Calendar = tui.ReactCalendar;
```

#### 레거시 브라우저용 번들 파일 불러오기

TOAST UI 캘린더 React Wrapper는 레거시 브라우저용 번들 파일을 따로 제공하고 있다. 기본 번들은 모던 브라우저의 최신 2개 버전을 안정적으로 지원한다. 하지만 기본 번들은 IE11을 위한 폴리필이 포함되어있지 않으므로 IE11 혹은 일정 수준 이하의 레거시 브라우저를 지원하기 위해서는 다음과 같이 폴리필이 포함된 IE11 번들을 추가해야 한다.

IE11의 번들 크기는 기본 번들보다 2배 가량 크기 때문에 반드시 지원 범위를 잘 고려하여 불필요하게 번들 사이즈를 늘리지 않도록 유의해야 한다.

```js
/* Node.js 환경에서 ES6 모듈 */
import Calendar from '@toast-ui/react-calendar/ie11';
```

```js
/* Node.js 환경에서 CommonJS */
const Calendar = require('@toast-ui/react-calendar/ie11');
```

### CSS

Calendar를 사용하기 위해서는 TOAST UI 캘린더의 CSS 파일을 추가해야 한다. import, require를 통해 CSS 파일을 불러오거나, CDN을 통해 불러올 수 있다.

```js
/* Node.js 환경에서 ES6 모듈 */
import '@toast-ui/calendar/dist/toastui-calendar.min.css'; // Calendar 스타일
```

```js
/* Node.js 환경에서 CommonJS */
require('@toast-ui/calendar/dist/toastui-calendar.min.css');
```

```html
<!-- CDN -->
<link rel="stylesheet" href="https://uicdn.toast.com/calendar/latest/toastui-calendar.min.css" />
```

## React에서 사용하기

컴포넌트에서 TOAST UI 캘린더 React Wrapper를 불러와서 사용할 수 있다.

```jsx
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

export function YourComponent() {
  return (
    <div>
      <Calendar />
    </div>
  );
}
```

### Props

TOAST UI 캘린더의 [옵션](/docs/ko/apis/options.md)은 React 컴포넌트의 Props으로 구현되어 있다. `defaultView`는 `view`라는 이름이고, 그 외는 동일한 이름이다.

옵션 외에도 `events` prop을 이용해 일정 데이터를 바로 추가할 수도 있다.

```jsx
export function MyComponent() {
  const calendars = [{ id: 'cal1', name: 'Personal' }];
  const initialEvents = [
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
  ];

  const onAfterRenderEvent = (event) => {
    console.log(event.title);
  };

  return (
    <div>
      <Calendar
        height="900px"
        view="month"
        month={{
          dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          visibleWeeksCount: 3,
        }}
        calendars={calendars}
        events={initialEvents}
        onAfterRenderEvent={onAfterRenderEvent}
      />
    </div>
  );
}
```

#### 테마

theme 객체를 사용해서 자신만의 테마를 적용할 수 있다. 더 자세한 정보는 [`theme`](/docs/ko/apis/theme.md) 문서를 참고한다.

### 인스턴스 메서드

[TOAST UI Calendar의 인스턴스 메서드](/docs/ko/apis/calendar.md#instance-methods)를 사용하기 위해선, 먼저 [`createRef()`](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs)를 이용해서 wrapper 컴포넌트에 대한 ref를 만들어야한다.
하지만 wrapper 컴포넌트에서 인스턴스 메서드를 직접 호출할 수 없다. 대신 `getInstance()` 메서드를 호출해서 인스턴스를 얻은 후에 인스턴스 메서드를 호출할 수 있다.

### 메서드

💡 메서드를 클릭하면 더 자세한 설명과 사용 예시를 볼 수 있다.

| 메서드                            | 설명                                        |
| --------------------------------- | ------------------------------------------- |
| [getRootElement](#getrootelement) | TOAST UI 캘린더가 마운트된 요소를 리턴한다. |
| [getInstance](#getinstance)       | TOAST UI 캘린더 인스턴스를 리턴한다.        |

#### getRootElement

- 타입: `getRootElement(): HTMLDivElement`
- 리턴: `HTMLDivElement` - TOAST UI 캘린더가 마운트된 요소

TOAST UI 캘린더가 마운트된 요소를 리턴한다.

#### getInstance

- 타입: `getInstance(): Calendar`
- 리턴: `Calendar` - TOAST UI 캘린더 인스턴스

TOAST UI 캘린더 인스턴스를 리턴한다. 이를 이용하여 [캘린더 인스턴스 메서드](/docs/ko/apis/calendar.md#인스턴스-메서드)를 사용할 수 있다.

## 기본적인 사용 방법

### Google Analytics(GA)를 위한 hostname 수집 거부하기

[TOAST UI 캘린더](https://github.com/nhn/tui.calendar)는 [GA](https://analytics.google.com/analytics/web/)를 적용하여 오픈 소스 사용에 대한 통계를 수집하여 전 세계에서 얼마나 널리 사용되는지 확인한다.
이는 프로젝트의 향후 진행을 결정하는 중요한 지표 역할을 한다.
`location.hostname`(예를 들어 "ui.toast.com")을 수집하며 사용량에 대한 통계를 측정하기 위해서만 사용된다.

만약 이를 거부하려면 [`usageStatistics` prop](/docs/ko/apis/options.md#usagestatistics)을 `false`로 설정한다.

```jsx
export function MyCalendar() {
  return (
    <div>
      <Calendar usageStatistics={false} />
    </div>
  );
}
```

### ⚠️ Props를 넘길 때 주의할 점

캘린더 React Wrapper 컴포넌트는 다시 렌더링할 때 `props`를 깊게 비교한다. 불필요한 재렌더링을 피하고 더 나은 성능을 위해서 props를 컴포넌트 밖에서 선언하거나, props가 컴포넌트 상태 변경에 영향을 받을 필요가 없는 경우 `useMemo`를 사용하는 것을 추천한다.

```jsx
const calendars = [
  {
    id: '0',
    name: 'Private',
    backgroundColor: '#9e5fff',
    borderColor: '#9e5fff',
  },
  {
    id: '1',
    name: 'Company',
    backgroundColor: '#00a9ff',
    borderColor: '#00a9ff',
  },
];

// 특히 컴포넌트 내에서 `template` prop을 선언하지 않는다.
const template = {
  milestone(event) {
    return `<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`;
  },
  allday(event) {
    return `[All day] ${event.title}`;
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
