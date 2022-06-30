# v2 Migration Guide

## Table of Contents

- [Overview](#overview)
- [Changed](#changed)
  - [Change term from `schedule` to `event`](#change-term-from-schedule-to-event)

## Overview

Changes made in TOAST UI Calendar v2.0 are reflected in React Wrapper. For more information about changes in TOAST UI Calendar v2.0, refer to the [TOAST UI Caledar v2 Migration Guide](/docs/en/guide/migration-guide-v2.md).

This guide summarizes the changes only in React Wrapper.

## Changed

### Change term from `schedule` to `event`

In v2, the name was changed from `schedule` to `event` to match the meaning of events in the calendar. So, the `schedules` prop has been renamed to `events`.
