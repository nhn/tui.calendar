# v2 마이그레이션 가이드

## 목차

- [개요](#개요)
- [변경](#변경)
  - [`schedule`에서 `event`로 용어 변경](#schedule에서-event로-용어-변경)

## 개요

TOAST UI Calendar v2.0에서 변경된 점이 React Wrapper에 그대로 반영되었다. TOAST UI Calendar의 변경점은 [TOAST UI Caledar v2 마이그레이션 가이드](/docs/ko/guide/migration-guide-v2.md)를 참고한다.

해당 문서에서는 React Wrapper에서만 변경된 점을 정리한다.

## 변경

### `schedule`에서 `event`로 용어 변경

v2에서는 일정이라는 의미에 맞게 기존 `schedule`에서 `event`로 네이밍이 변경되었다. 이에 일정
데이터를 넘기는 `schedules`라는 Prop이 `events`로 바뀌었다.
