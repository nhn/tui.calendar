# v2 마이그레이션 가이드

## 목차

- [개요](#개요)
- [변경](#변경)
  - [`schedule`에서 `event`로 용어 변경](#schedule에서-event로-용어-변경)
  - [`invoke` 대신 `getInstance` 메서드 사용](#invoke-대신-getinstance-메서드-사용)

## 개요

TOAST UI Calendar v2.0에서 변경된 점이 Vue Wrapper에 그대로 반영되었다. TOAST UI Calendar의 변경점은 [TOAST UI Caledar v2 마이그레이션 가이드](/docs/ko/guide/migration-guide-v2.md)를 참고한다.

해당 문서에서는 Vue Wrapper에서만 변경된 점을 정리한다.

## 변경

### `schedule`에서 `event`로 용어 변경

v2에서는 일정이라는 의미에 맞게 기존 `schedule`에서 `event`로 네이밍이 변경되었다. 이에 일정
데이터를 넘기는 `schedules`라는 Prop이 `events`로 바뀌었다.

### `invoke` 대신 `getInstance` 메서드 사용

v1에서는 `invoke`라는 함수를 이용하여 캘린더 인스턴스 메서드를 간접적으로 호출할 수 있었다. v2에서는 `getInstance`라는 메서드를 사용하여 캘린더 인스턴스를 리턴받아 직접 인스턴스 메서드를 호출할 수 있다.

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
