# v2 Migration Guide

## Table of Contents

- [Overview](#overview)
- [Changed](#changed)
  - [Change term from `schedule` to `event`](#change-term-from-schedule-to-event)
  - [Use `getInstance` method instead of `invoke`](#use-getinstance-method-instead-of-invoke)

## Overview

Changes made in TOAST UI Calendar v2.0 are reflected in Vue Wrapper. For more information about changes in TOAST UI Calendar v2.0, refer to the [TOAST UI Caledar v2 Migration Guide](/docs/en/guide/migration-guide-v2.md).

This guide summarizes the changes only in Vue Wrapper.

## Changed

### Change term from `schedule` to `event`

In v2, the name was changed from `schedule` to `event` to match the meaning of events in the calendar. So, the `schedules` prop has been renamed to `events`.

### Use `getInstance` method instead of `invoke`

In v1, the calendar instance methods were called indirectly by `invoke` method. Since v2, it provides `getInstance` method to get the calendar instance. You can use it to call the calendar instance methods.

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
