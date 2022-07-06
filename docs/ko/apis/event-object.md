# EventObject

## 설명

EventObject는 일정 정보를 담은 순수 자바스크립트 객체이다. 이벤트를 생성할 때, 특정 이벤트를 찾을 때, 인스턴스 이벤트를 다룰 때 등 다양한 API에서 사용되는 값이다.

```js
const calendar = new Calendar('#container');
calendar.createEvents([
  {
    id: '1',
    calendarId: 'cal1',
    title: 'timed event',
    body: 'TOAST UI Calendar',
    start: '2022-06-01T10:00:00',
    end: '2022-06-01T11:00:00',
    location: 'Meeting Room A',
    attendees: ['A', 'B', 'C'],
    category: 'time',
    state: 'Free',
    isReadOnly: true,
    color: '#fff',
    backgroundColor: '#ccc',
    customStyle: {
      fontStyle: 'italic',
      fontSize: '15px',
    },
  }, // EventObject
]);

const timedEvent = calendar.getEvent('1', 'cal1'); // EventObject
calendar.on('clickEvent', ({ event }) => {
  console.log(event); // EventObject
});
```

## EventObject 객체

EventObject는 아래와 같은 프로퍼티로 이루어져 있다. 일부 항목은 추가 설명이 있으며, 링크를 누르면 이동한다.

```ts
interface EventObject {
  id?: string;
  calendarId?: string;
  title?: string;
  body?: string;
  isAllday?: boolean;
  start?: Date | string | number | TZDate;
  end?: Date | string | number | TZDate;
  goingDuration?: number;
  comingDuration?: number;
  location?: string;
  attendees?: string[];
  category?: 'milestone' | 'task' | 'allday' | 'time';
  recurrenceRule?: string;
  state?: 'Busy' | 'Free';
  isVisible?: boolean;
  isPending?: boolean;
  isFocused?: boolean;
  isReadOnly?: boolean;
  isPrivate?: boolean;
  color?: string;
  backgroundColor?: string;
  dragBackgroundColor?: string;
  borderColor?: string;
  customStyle?: JSX.CSSProperties;
  raw?: any;
}
```

| 프로퍼티                                    | 기본값                    | 설명                                                                                                                                                                                                              |
| ------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                          | <code>''</code>           | 일정 ID                                                                                                                                                                                                           |
| [calendarId](#캘린더calendarid)             | <code>''</code>           | 캘린더 ID                                                                                                                                                                                                         |
| title                                       | <code>''</code>           | 일정 제목                                                                                                                                                                                                         |
| body                                        | <code>''</code>           | 일정 내용                                                                                                                                                                                                         |
| [isAllday](#isallday)                       | <code>false</code>        | 종일 일정 여부                                                                                                                                                                                                    |
| start                                       | <code>new TZDate()</code> | 일정이 시작하는 일시. 일정을 생성할 때는 <code>Date</code>, <code>string</code>, <code>number</code>, <code>TZDate</code>로 지정할 수 있으며, 캘린더 API 파라미터 또는 반환값에서는 <code>TZDate</code> 객체이다. |
| end                                         | <code>new TZDate()</code> | 일정이 끝나는 일시. 일정을 생성할 때는 <code>Date</code>, <code>string</code>, <code>number</code>, <code>TZDate</code>로 지정할 수 있으며, 캘린더 API 파라미터 또는 반환값에서는 <code>TZDate</code> 객체이다.   |
| goingDuration                               | <code>0</code>            | 일정 장소까지 이동하는 데 걸리는 시간. 분 단위의 숫자이다.                                                                                                                                                        |
| comingDuration                              | <code>0</code>            | 일정 다음 장소까지 이동하는 데 걸리는 시간. 분 단위의 숫자이다.                                                                                                                                                   |
| location                                    | <code>''</code>           | 일정 장소                                                                                                                                                                                                         |
| attendees                                   | <code>[]</code>           | 일정 참석자 목록                                                                                                                                                                                                  |
| [category](#category)                       | <code>'time'</code>       | 일정 카테고리. <code>milestone</code>, <code>task</code>, <code>allday</code>, <code>time</code> 중 하나이다.                                                                                                     |
| dueDateClass                                | <code>''</code>           | task 일정 카테고리. 어떤 문자열도 가능하다.                                                                                                                                                                       |
| recurrenceRule                              | <code>''</code>           | 일정 반복 규칙                                                                                                                                                                                                    |
| state                                       | <code>'Busy'</code>       | 일정 상태. 바쁨(<code>Busy</code>), 한가함(<code>Free</code>) 중 하나이다.                                                                                                                                        |
| isVisible                                   | <code>true</code>         | 일정 표시 여부                                                                                                                                                                                                    |
| [isPending](#ispending-isfocused-isprivate) | <code>false</code>        | 미정인 일정 여부                                                                                                                                                                                                  |
| [isFocused](#ispending-isfocused-isprivate) | <code>false</code>        | 일정 강조 여부                                                                                                                                                                                                    |
| [isReadOnly](#isreadonly)                   | <code>false</code>        | 수정 가능한 일정 여부                                                                                                                                                                                             |
| [isPrivate](#ispending-isfocused-isprivate) | <code>false</code>        | 개인적인 일정 여부                                                                                                                                                                                                |
| [color](#스타일-관련-속성)                  | <code>'#000'</code>       | 일정 요소의 텍스트 색상                                                                                                                                                                                           |
| [backgroundColor](#스타일-관련-속성)        | <code>'#a1b56c'</code>    | 일정 요소의 배경 색상                                                                                                                                                                                             |
| [dragBackgroundColor](#스타일-관련-속성)    | <code>'#a1b56c'</code>    | 일정 요소를 드래그했을 때 배경 색상                                                                                                                                                                               |
| [borderColor](#스타일-관련-속성)            | <code>'#000'</code>       | 일정 요소의 좌측 테두리 색상                                                                                                                                                                                      |
| [customStyle](#스타일-관련-속성)            | <code>{}</code>           | 일정 요소에 적용할 스타일. [CSS 카멜케이스 프로퍼티를 가진 자바스크립트 객체](https://ko.reactjs.org/docs/dom-elements.html#style)이다.                                                                           |
| raw                                         | <code>null</code>         | 실제 일정 데이터                                                                                                                                                                                                  |

## 추가 설명

### 캘린더(calendarId)

캘린더는 이벤트를 그룹짓기 위해 사용하는 객체이다. 하나의 이벤트는 하나의 캘린더에 속하며, 고유의 ID, 이름, 색상값을 가진다.

```ts
interface CalendarInfo {
  id: string;
  name: string;
  color?: string;
  backgroundColor?: string;
  dragBackgroundColor?: string;
  borderColor?: string;
}
```

하나 이상의 캘린더를 설정하기 위해 인스턴스 생성 시 옵션 값으로 전달하여 지정하거나, `setCalendars` 메서드를 사용할 수 있다.

```js
// 인스턴스 생성 시
const calendar = new Calendar('#container', {
  calendars: [
    {
      id: 'cal1',
      name: 'My Calendar',
    },
    {
      id: 'cal2',
      name: 'Another Calendar',
    },
  ],
});

// 인스턴스 생성 후
calendar.setCalendars([
  {
    id: 'cal1',
    name: 'My Calendar',
  },
  {
    id: 'cal2',
    name: 'Another Calendar',
  },
]);
```

캘린더에 컬러 값을 설정하거나 이벤트에 컬러 값을 설정한 경우 다음과 같은 우선순위로 컬러가 적용된다.

1. 이벤트 고유의 컬러 값
2. 캘린더의 컬러 값
3. 둘 다 지정되지 않은 경우 기본값

```js
calendar.setCalendars([
  {
    id: 'cal1',
    name: 'My Calendar',
    color: '#000',
    backgroundColor: '#a1b56c',
    dragBackgroundColor: '#a1b56c',
    borderColor: '#000',
  },
  {
    id: 'cal2',
    name: 'Another Calendar',
  },
]);

calendar.createEvents([
  {
    id: '1',
    calendarId: 'cal1',
    title: 'Event 1',
    isAllDay: true,
    start: new Date('2018-08-01'),
    end: new Date('2018-08-02'),
    // 아래의 세 컬러는 cal1의 컬러 값을 무시한다.
    color: '#fff',
    backgroundColor: '#3c056d',
    dragBackgroundColor: '#3c056d',
    // borderColor: '#a73eaf' // 주석처리되었기 때문에 cal1의 '#000' 이 적용된다.
  },
  // 이 이벤트는 cal2에 속하지만, cal2가 아무런 컬러를 지정하지 않았기 때문에 기본값이 된다.
  {
    id: '2',
    calendarId: 'cal2',
    title: 'Event 2',
    isAllDay: true,
    start: new Date('2018-08-01'),
    end: new Date('2018-08-02'),
  },
]);
```

### isAllday

![isAllday](../../assets/EventObject_isAllday.png)

종일 일정 여부를 나타낸다.

종일 일정은 `isAllday` 외에도 여러 방법으로 적용할 수 있다. 아래의 경우 중 하나라도 해당하면 종일 일정 패널에 나타난다.

- `isAllday`가 `true`인 경우
- `category`가 `allday`인 경우
- 일정 기간이 24시간 이상인 경우

### category

![category](../../assets/EventObject_category.png)

카테고리에 맞는 패널에 일정이 그려진다. `milestone`, `task`, `allday`, `time` 중 하나이다.

### isReadOnly

![isReadOnly](../../assets/EventObject_isReadOnly.png)

수정 가능한 일정 여부를 나타낸다. `isReadOnly`가 `true`인 경우 일정 이동, 일정 리사이징이 되지 않으며 일정 상세 팝업에서 편집 버튼이 노출되지 않는다.

### isPending, isFocused, isPrivate

`isPending`은 미정인 일정 여부를, `isFocused`는 일정 강조 여부를, `isPrivate`는 개인적인 일정 여부를 나타낸다. 기본적으로 렌더링에 영향을 주지 않으며, 해당 값에 따라 일정을 다르게 표시하고 싶을 때는 [템플릿](./template.md) 기능을 사용한다.

```js
const calendar = new Calendar('#container', {
  template: {
    time({ title, isPending, isFocused, isPrivate }) {
      if (isPending) {
        return `Pending: ${title}`;
      }

      if (isFocused) {
        return `Focused: ${title}`;
      }

      if (isPrivate) {
        return `Private: ${title}`;
      }

      return title;
    },
  },
});
```

자세한 예시는 [템플릿 문서](./template.md#time)를 참고한다.

### 스타일 관련 속성

![style](../../assets/EventObject_style.png)

`color`, `backgroundColor`, `dragBackgroundColor`, `borderColor`, `customStyle`으로 일정 요소의 스타일을 커스터마이징 할 수 있다. `color`, `backgroundColor`, `dragBackgroundColor`, `borderColor`는 [CSS color 자료형](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)으로 지정할 수 있으며, `customStyle`은 [CSS 카멜케이스 프로퍼티를 가진 자바스크립트 객체](https://ko.reactjs.org/docs/dom-elements.html#style)로 지정할 수 있다.
