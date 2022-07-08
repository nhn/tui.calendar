# TZDate

## 설명

TZDate는 타임존을 처리하기 위해 만든 커스텀 날짜 클래스이다. 일정 생성 시 일정 시작 일시 또는 끝나는 일시를 TZDate로 지정할 수 있으며, 캘린더 API 중 일시와 관련된 값은 TZDate로 반환된다.

```js
import Calendar, { TZDate } from '@toast-ui/calendar';

const calendar = new Calendar('#container');
calendar.createEvents([
  {
    id: '1',
    calendarId: 'cal1',
    title: 'event',
    start: new TZDate('2022-06-01T10:00:00'), // TZDate
    end: new TZDate('2022-06-01T11:00:00'), // TZDate
  },
]);

console.log(calendar.getDate()); // TZDate
console.log(calendar.getEvent('1', 'cal1').start); // TZDate
```

## 인스턴스 생성

- 타입
  - `new TZDate(date?: number | string | Date | TZDate)`
  - `new TZDate(year: number, monthIndex: number, day?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number)`
- 파라미터
  - `date` 또는 개별 날짜 및 시각 구성 요소: 날짜와 시각을 나타내는 값

TZDate는 아래 파라미터로 생성할 수 있다.

1. 파라미터 없이: 파라미터가 없으면, 생성 순간의 날짜와 시각을 가지는 TZDate 인스턴스를 생성한다.
2. UNIX 타임스탬프 값
3. 타임스탬프 문자열
4. 개별 날짜 및 시각 구성 요소
5. Date 인스턴스
6. TZDate 인스턴스

TZDate 인스턴스를 제외한 나머지 파라미터는 `Date()` 생성자 파라미터와 동일하므로, 자세한 내용은 [`Date()` 생성자 파라미터](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#parameters)를 참고한다.

```js
import { TZDate } from '@toast-ui/calendar';

const now = new TZDate(); // 파라미터 없음
const date = new TZDate(1654052400000); // UNIX 타임스탬프 값
const date1 = new TZDate('2022-06-01T12:00:00'); // 타임스탬프 문자열
const date2 = new TZDate(2022, 5, 1, 12, 0, 0, 0); // 개별 날짜 및 시각 구성 요소
const now1 = new TZDate(new Date()); // Date 인스턴스
const now2 = new TZDate(new TZDate()); // TZDate 인스턴스
```

## 인스턴스 메서드

💡 메서드를 클릭하면 더 자세한 설명과 사용 예시를 볼 수 있다.

| 메서드                                  | 설명                                                                                                      |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [toString](#tostring)                   | TZDate 인스턴스 일시를 문자열로 반환한다.                                                                 |
| [toDate](#todate)                       | TZDate 인스턴스 일시를 Date 객체로 반환한다.                                                              |
| [valueOf](#valueof)                     | 1970년 1월 1일 UTC 이후 TZDate 인스턴스 일시까지 경과 시간(밀리초)을 반환한다.                            |
| [addFullYear](#addfullyear)             | 주어진 숫자 값만큼 연도를 더한다.                                                                         |
| [addMonth](#addmonth)                   | 주어진 숫자 값만큼 월을 더한다.                                                                           |
| [addDate](#adddate)                     | 주어진 숫자 값만큼 일자를 더한다.                                                                         |
| [addHours](#addhours)                   | 주어진 숫자 값만큼 시를 더한다.                                                                           |
| [addMinutes](#addminutes)               | 주어진 숫자 값만큼 분을 더한다.                                                                           |
| [addSeconds](#addseconds)               | 주어진 숫자 값만큼 초를 더한다.                                                                           |
| [addMilliseconds](#addmilliseconds)     | 주어진 숫자 값만큼 밀리초를 더한다.                                                                       |
| [getTime](#gettime)                     | 1970년 1월 1일 UTC 이후 TZDate 인스턴스 일시까지 경과 시간(밀리초)을 반환한다.                            |
| [getFullYear](#getfullyear)             | TZDate 인스턴스 일시의 연도를 반환한다.                                                                   |
| [getMonth](#getmonth)                   | TZDate 인스턴스 일시의 월을 반환한다. 월은 0부터 시작하는 값이다. (ex. 3월의 경우 `2`)                    |
| [getDate](#getdate)                     | TZDate 인스턴스 일시의 일자를 반환한다.                                                                   |
| [getDay](#getday)                       | TZDate 인스턴스 일시의 요일에 해당하는 숫자 값을 반환한다. 0은 일요일을 나타낸다.                         |
| [getHours](#gethours)                   | TZDate 인스턴스 일시의 시를 반환한다.                                                                     |
| [getMinutes](#getminutes)               | TZDate 인스턴스 일시의 분을 반환한다.                                                                     |
| [getSeconds](#getseconds)               | TZDate 인스턴스 일시의 초를 반환한다.                                                                     |
| [getMilliseconds](#getmilliseconds)     | TZDate 인스턴스 일시의 밀리초를 반환한다.                                                                 |
| [getTimezoneOffset](#gettimezoneoffset) | TZDate 인스턴스의 타임존 오프셋을 반환한다.                                                               |
| [setWithRaw](#setwithraw)               | TZDate 인스턴스 일시를 개별 날짜 및 시각 구성 요소로 지정한다.                                            |
| [setTime](#settime)                     | TZDate 인스턴스 일시를 1970년 1월 1일 UTC 이후 경과 시간(밀리초)으로 지정한다.                            |
| [setFullYear](#setfullyear)             | TZDate 인스턴스 일시의 연도를 주어진 숫자 값으로 지정한다.                                                |
| [setMonth](#setmonth)                   | TZDate 인스턴스 일시의 월을 주어진 숫자 값으로 지정한다. 월은 0부터 시작하는 값이다. (ex. 3월의 경우 `2`) |
| [setDate](#setdate)                     | TZDate 인스턴스 일시의 일자를 주어진 숫자 값으로 지정한다.                                                |
| [setHours](#sethours)                   | TZDate 인스턴스 일시의 시를 주어진 숫자 값으로 지정한다.                                                  |
| [setMinutes](#setminutes)               | TZDate 인스턴스 일시의 분을 주어진 숫자 값으로 지정한다.                                                  |
| [setSeconds](#setseconds)               | TZDate 인스턴스 일시의 초를 주어진 숫자 값으로 지정한다.                                                  |
| [setMilliseconds](#setmilliseconds)     | TZDate 인스턴스 일시의 밀리초를 주어진 숫자 값으로 지정한다.                                              |
| [tz](#tz)                               | 주어진 타임존을 따르는 새로운 TZDate 인스턴스를 반환한다.                                                 |
| [local](#local)                         | 시스템 타임존을 따르는 새로운 TZDate 인스턴스를 반환한다.                                                 |

### toString

- 타입: `toString(): string`
- 리턴: `string` - TZDate 인스턴스 일시를 나타내는 문자열

TZDate 인스턴스 일시를 문자열로 반환한다. [Date 객체의 `toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString) 함수와 동일한 포맷이다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### toDate

- 타입: `toDate(): Date`
- 리턴: `Date` - TZDate 인스턴스 일시를 나타내는 Date 객체

TZDate 인스턴스 일시를 자바스크립트 표준 내장 객체인 [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)로 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### valueOf

- 타입: `valueOf(): number`
- 리턴: `number` - 1970년 1월 1일 UTC 이후 TZDate 인스턴스 일시까지 경과 시간(밀리초)

1970년 1월 1일 UTC 이후 TZDate 인스턴스 일시까지 경과 시간(밀리초)을 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### addFullYear

- 타입: `addFullYear(y: number): TZDate`
- 파라미터
  - `y` - 추가할 연도만큼의 숫자 값
- 리턴: `TZDate` - 변경된 TZDate

주어진 숫자 값만큼 연도를 더한다. 기존 TZDate 인스턴스를 변경한 다음, 이를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### addMonth

- 타입: `addMonth(m: number): TZDate`
- 파라미터
  - `m` - 추가할 월만큼의 숫자 값
- 리턴: `TZDate` - 변경된 TZDate

주어진 숫자 값만큼 월을 더한다. 기존 TZDate 인스턴스를 변경한 다음, 이를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### addDate

- 타입: `addDate(d: number): TZDate`
- 파라미터
  - `d` - 추가할 날짜만큼의 숫자 값
- 리턴: `TZDate` - 변경된 TZDate

주어진 숫자 값만큼 일자를 더한다. 기존 TZDate 인스턴스를 변경한 다음, 이를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### addHours

- 타입: `addHours(h: number): TZDate`
- 파라미터
  - `h` - 추가할 시만큼의 숫자 값
- 리턴: `TZDate` - 변경된 TZDate

주어진 숫자 값만큼 시를 더한다. 기존 TZDate 인스턴스를 변경한 다음, 이를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### addMinutes

- 타입: `addMinutes(M: number): TZDate`
- 파라미터
  - `M` - 추가할 분만큼의 숫자 값
- 리턴: `TZDate` - 변경된 TZDate

주어진 숫자 값만큼 분을 더한다. 기존 TZDate 인스턴스를 변경한 다음, 이를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### addSeconds

- 타입: `addSeconds(s: number): TZDate`
- 파라미터
  - `s` - 추가할 초만큼의 숫자 값
- 리턴: `TZDate` - 변경된 TZDate

주어진 숫자 값만큼 초를 더한다. 기존 TZDate 인스턴스를 변경한 다음, 이를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### addMilliseconds

- 타입: `addMilliseconds(ms: number): TZDate`
- 파라미터
  - `ms` - 추가할 밀리초만큼의 숫자 값
- 리턴: `TZDate` - 변경된 TZDate

주어진 숫자 값만큼 밀리초를 더한다. 기존 TZDate 인스턴스를 변경한 다음, 이를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### getTime

- 타입: `getTime(): number`
- 리턴: `number` - 1970년 1월 1일 UTC 이후 TZDate 인스턴스 일시까지 경과 시간(밀리초)

1970년 1월 1일 UTC 이후 TZDate 인스턴스 일시까지 경과 시간(밀리초)을 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### getFullYear

- 타입: `getFullYear(): number`
- 리턴: `number` - TZDate 인스턴스 일시의 연도

TZDate 인스턴스 일시의 연도를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### getMonth

- 타입: `getMonth(): number`
- 리턴: `number` - TZDate 인스턴스 일시의 월

TZDate 인스턴스 일시의 월을 반환한다. 월은 0부터 시작하는 값이다. (ex. 3월의 경우 `2`)

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### getDate

- 타입: `getDate(): number`
- 리턴: `number` - TZDate 인스턴스 일시의 일자

TZDate 인스턴스 일시의 일자를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### getDay

- 타입: `getDay(): number`
- 리턴: `number` - TZDate 인스턴스 일시의 요일에 해당하는 숫자 값

TZDate 인스턴스 일시의 요일에 해당하는 숫자 값을 반환한다. 0은 일요일을 나타낸다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### getHours

- 타입: `getHours(): number`
- 리턴: `number` - TZDate 인스턴스 일시의 시

TZDate 인스턴스 일시의 시를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### getMinutes

- 타입: `getMinutes(): number`
- 리턴: `number` - TZDate 인스턴스 일시의 분

TZDate 인스턴스 일시의 분을 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### getSeconds

- 타입: `getSeconds(): number`
- 리턴: `number` - TZDate 인스턴스 일시의 초

TZDate 인스턴스 일시의 초를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### getMilliseconds

- 타입: `getMilliseconds(): number`
- 리턴: `number` - TZDate 인스턴스 일시의 밀리초

TZDate 인스턴스 일시의 밀리초를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### getTimezoneOffset

- 타입: `getTimezoneOffset(): number`
- 리턴: `number` - TZDate 인스턴스의 타임존 오프셋

TZDate 인스턴스의 타임존 오프셋을 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### setWithRaw

- 타입: `setWithRaw(y: number, m: number, d: number, h: number, M: number, s: number, ms: number): TZDate`
- 파라미터
  - `y`: 지정할 연도
  - `m`: 지정할 월
  - `d`: 지정할 일자
  - `h`: 지정할 시
  - `M`: 지정할 분
  - `s`: 지정할 초
  - `ms`: 지정할 밀리초
- 리턴: `TZDate` - 변경된 TZDate

TZDate 인스턴스 일시를 개별 날짜 및 시각 구성 요소로 지정한다. 기존 TZDate 인스턴스를 변경한 다음, 이를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### setTime

- 타입: `setTime(t: number): number`
- 파라미터
  - `t`: 지정할 1970년 1월 1일 UTC 이후 경과 시간(밀리초)
- 리턴: `number` - 1970년 1월 1일 UTC 이후 변경된 TZDate 인스턴스 일시까지 경과 시간(밀리초)

TZDate 인스턴스 일시를 1970년 1월 1일 UTC 이후 경과 시간(밀리초)으로 지정한다. 기존 TZDate 인스턴스를 변경한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### setFullYear

- 타입: `setFullYear(y: number, m?: number, d?: number): number`
- 파라미터
  - `y`: 지정할 연도
  - `m`: 지정할 월. 없다면 기존 TZDate 인스턴스 일시의 월이 유지된다.
  - `d`: 지정할 일자. 없다면 기존 TZDate 인스턴스 일시의 일자가 유지된다.
- 리턴: `number` - 1970년 1월 1일 UTC 이후 변경된 TZDate 인스턴스 일시까지 경과 시간(밀리초)

TZDate 인스턴스 일시의 연도를 주어진 숫자 값으로 지정한다. 월과 일자도 추가로 지정할 수 있다. 기존 TZDate 인스턴스를 변경한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### setMonth

- 타입: `setMonth(m: number, d?: number): number`
- 파라미터
  - `m`: 지정할 월
  - `d`: 지정할 일자. 없다면 기존 TZDate 인스턴스 일시의 일자가 유지된다.
- 리턴: `number` - 1970년 1월 1일 UTC 이후 변경된 TZDate 인스턴스 일시까지 경과 시간(밀리초)

TZDate 인스턴스 일시의 월을 주어진 숫자 값으로 지정한다. 월은 0부터 시작하는 값이다. (ex. 3월의 경우 `2`) 일자도 추가로 지정할 수 있다. 기존 TZDate 인스턴스를 변경한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### setDate

- 타입: `setDate(d: number): number`
- 파라미터
  - `d`: 지정할 일자
- 리턴: `number` - 1970년 1월 1일 UTC 이후 변경된 TZDate 인스턴스 일시까지 경과 시간(밀리초)

TZDate 인스턴스 일시의 일자를 주어진 숫자 값으로 지정한다. 기존 TZDate 인스턴스를 변경한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### setHours

- 타입: `setHours(h: number, M?: number, s?: number, ms?: number): number`
- 파라미터
  - `h`: 지정할 시
  - `M`: 지정할 분. 없다면 기존 TZDate 인스턴스 일시의 분이 유지된다.
  - `s`: 지정할 초. 없다면 기존 TZDate 인스턴스 일시의 초가 유지된다.
  - `ms`: 지정할 밀리초. 없다면 기존 TZDate 인스턴스 일시의 밀리초가 유지된다.
- 리턴: `number` - 1970년 1월 1일 UTC 이후 변경된 TZDate 인스턴스 일시까지 경과 시간(밀리초)

TZDate 인스턴스 일시의 시를 주어진 숫자 값으로 지정한다. 분, 초, 밀리초도 추가로 지정할 수 있다. 기존 TZDate 인스턴스를 변경한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### setMinutes

- 타입: `setMinutes(M: number, s?: number, ms?: number): number`
- 파라미터
  - `M`: 지정할 분
  - `s`: 지정할 초. 없다면 기존 TZDate 인스턴스 일시의 초가 유지된다.
  - `ms`: 지정할 밀리초. 없다면 기존 TZDate 인스턴스 일시의 밀리초가 유지된다.
- 리턴: `number` - 1970년 1월 1일 UTC 이후 변경된 TZDate 인스턴스 일시까지 경과 시간(밀리초)

TZDate 인스턴스 일시의 분을 주어진 숫자 값으로 지정한다. 초, 밀리초도 추가로 지정할 수 있다. 기존 TZDate 인스턴스를 변경한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### setSeconds

- 타입: `setSeconds(s: number, ms?: number): number`
- 파라미터
  - `s`: 지정할 초
  - `ms`: 지정할 밀리초. 없다면 기존 TZDate 인스턴스 일시의 밀리초가 유지된다.
- 리턴: `number` - 1970년 1월 1일 UTC 이후 변경된 TZDate 인스턴스 일시까지 경과 시간(밀리초)

TZDate 인스턴스 일시의 초를 주어진 숫자 값으로 지정한다. 밀리초도 추가로 지정할 수 있다. 기존 TZDate 인스턴스를 변경한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### setMilliseconds

- 타입: `setMilliseconds(ms: number): number`
- 파라미터
  - `ms`: 지정할 밀리초
- 리턴: `number` - 1970년 1월 1일 UTC 이후 변경된 TZDate 인스턴스 일시까지 경과 시간(밀리초)

TZDate 인스턴스 일시의 밀리초를 주어진 숫자 값으로 지정한다. 기존 TZDate 인스턴스를 변경한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### tz

- 타입: `tz(tzValue: string | 'Local' | number): TZDate`
- 파라미터
  - `tzValue`: 지정할 타임존
- 리턴: `TZDate` - 주어진 타임존을 따르는 새로운 TZDate 인스턴스

주어진 타임존을 따르는 새로운 TZDate 인스턴스를 반환한다. `tzValue`은 [IANA 타임존 데이터베이스](https://www.iana.org/time-zones)의 타임존 이름, 타임존 오프셋 숫자 값, `'Local'`로 지정할 수 있다. `'Local'`로 지정할 경우 시스템 타임존을 따른다. 기존 TZDate 인스턴스를 변경하지 않고, 새로운 TZDate 인스턴스를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)

### local

- 타입: `local(tzValue?: string | number): TZDate`
- 파라미터
  - `tzValue`: TZDate 인스턴스가 따르는 타임존. 없다면 TZDate 인스턴스의 타임존으로 계산한다.
- 리턴: `TZDate` - 시스템 타임존을 따르는 새로운 TZDate 인스턴스

시스템 타임존을 따르는 새로운 TZDate 인스턴스를 반환한다. `tzValue`는 TZDate 인스턴스가 자신에게 지정되어 있는 타임존이 아닌 다른 타임존을 따르고 있을 때 사용할 수 있다. 만약 `tzValue`가 없다면 TZDate 인스턴스의 타임존으로 계산한다. 기존 TZDate 인스턴스를 변경하지 않고, 새로운 TZDate 인스턴스를 반환한다.

[⬆️ 목록으로 돌아가기](#인스턴스-메서드)
