# 시작하기

## 목차

- [Vue 2 설치하기](#vue-2-설치하기)
- [설치하기](#설치하기)
  - [패키지 매니저 사용하기](#패키지-매니저-사용하기)
    - [npm](#npm)
- [사용하기](#사용하기)
  - [자바스크립트](#자바스크립트)
    - [불러오기](#불러오기)
    - [레거시 브라우저용 번들 파일 불러오기](#레거시-브라우저용-번들-파일-불러오기)
  - [CSS](#css)
- [Vue에서 사용하기](#vue에서-사용하기)
  - [Props](#props)
  - [이벤트](#이벤트)
  - [메서드](#메서드)
    - [getRootElement](#getrootelement)
    - [getInstance](#getinstance)
- [기본적인 사용 방법](#기본적인-사용-방법)
  - [Google Analytics(GA)를 위한 hostname 수집 거부하기](#google-analyticsga를-위한-hostname-수집-거부하기)

## Vue 2 설치하기

TOAST UI 캘린더 Vue Wrapper를 사용하려면 [Vue 2](https://v2.vuejs.org/)를 설치해야 한다. Vue 3는 지원하지 않는다.

## 설치하기

TOAST UI 제품들은 패키지 매니저를 이용하거나, 직접 소스 코드를 다운받아 사용할 수 있다. 하지만 패키지 매니저 사용을 권장한다.

### 패키지 매니저 사용하기

TOAST UI 제품들은 [npm](https://www.npmjs.com/) 패키지 매니저에 등록되어 있다.
각 패키지 매니저가 제공하는 CLI 도구를 사용하면 쉽게 패키지를 설치할 수 있다. npm 사용을 위해선 [Node.js](https://nodejs.org)를 미리 설치해야 한다.

#### npm

```sh
npm install @toast-ui/vue-calendar # 최신 버전
npm install @toast-ui/vue-calendar@<version> # 특정 버전
```

## 사용하기

### 자바스크립트

#### 불러오기

TOAST UI 캘린더 Vue Wrapper는 아래 세 가지 방법으로 불러올 수 있다.

```js
/* Node.js 환경에서 ES6 모듈 */
import Calendar from '@toast-ui/vue-calendar';
```

```js
/* Node.js 환경에서 CommonJS */
const Calendar = require('@toast-ui/vue-calendar');
```

```js
/* 브라우저 환경에서 namespace */
const Calendar = tui.VueCalendar;
```

#### 레거시 브라우저용 번들 파일 불러오기

TOAST UI 캘린더 Vue Wrapper는 레거시 브라우저용 번들 파일을 따로 제공하고 있다. 기본 번들은 모던 브라우저의 최신 2개 버전을 안정적으로 지원한다. 하지만 기본 번들은 IE11을 위한 폴리필이 포함되어있지 않으므로 IE11 혹은 일정 수준 이하의 레거시 브라우저를 지원하기 위해서는 다음과 같이 폴리필이 포함된 IE11 번들을 추가해야 한다.

IE11의 번들 크기는 기본 번들보다 2배 가량 크기 때문에 반드시 지원 범위를 잘 고려하여 불필요하게 번들 사이즈를 늘리지 않도록 유의해야 한다.

```js
/* Node.js 환경에서 ES6 모듈 */
import Calendar from '@toast-ui/vue-calendar/ie11';
```

```js
/* Node.js 환경에서 CommonJS */
const Calendar = require('@toast-ui/vue-calendar/ie11');
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

## Vue에서 사용하기

Vue 인스턴스나 컴포넌트에서 TOAST UI 캘린더 Vue Wrapper를 불러와서 사용할 수 있다.

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

TOAST UI 캘린더의 [옵션](/docs/ko/apis/options.md)은 Vue 컴포넌트의 Props으로 구현되어 있다. `defaultView`는 `view`라는 이름이고, 그 외는 동일한 이름이다.

옵션 외에도 `events` prop을 이용해 일정 데이터를 바로 추가할 수도 있다.

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

### 이벤트

Vue의 `v-on` 디렉티브를 이용하여 캘린더 인스턴스 이벤트를 핸들링할 수 있다. 각 이벤트의 자세한 내용은 [TOAST UI 캘린더 인스턴스 이벤트 문서](/docs/ko/apis/calendar.md#인스턴스-이벤트)를 참고한다.

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

### 메서드

💡 메서드를 클릭하면 더 자세한 설명과 사용 예시를 볼 수 있다.

| 메서드 | 설명 |
| --- | --- |
| [getRootElement](#getrootelement) | TOAST UI 캘린더가 마운트된 요소를 리턴한다. |
| [getInstance](#getinstance) | TOAST UI 캘린더 인스턴스를 리턴한다. |

#### getRootElement

- 타입: `getRootElement(): HTMLDivElement`
- 리턴: `HTMLDivElement` - TOAST UI 캘린더가 마운트된 요소

TOAST UI 캘린더가 마운트된 요소를 리턴한다.

#### getInstance

- 타입: `getInstance(): Calendar`
- 리턴: `Calendar` - TOAST UI 캘린더 인스턴스

TOAST UI 캘린더 인스턴스를 리턴한다. 이를 이용하여 [캘린더 인스턴스 메서드](/docs/ko/apis/calendar.md#인스턴스-메서드)를 사용할 수 있다.

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

## 기본적인 사용 방법

### Google Analytics(GA)를 위한 hostname 수집 거부하기

[TOAST UI 캘린더](https://github.com/nhn/tui.calendar)는 [GA](https://analytics.google.com/analytics/web/)를 적용하여 오픈 소스 사용에 대한 통계를 수집하여 전 세계에서 얼마나 널리 사용되는지 확인한다.
이는 프로젝트의 향후 진행을 결정하는 중요한 지표 역할을 한다.
`location.hostname`(예를 들어 "ui.toast.com")을 수집하며 사용량에 대한 통계를 측정하기 위해서만 사용된다.

만약 이를 거부하려면 [`usageStatistics` prop](/docs/ko/apis/options.md#usagestatistics)을 `false`로 설정한다.

```html
<template>
  <Calendar :usage-statistics="false"/>
</template>
```
