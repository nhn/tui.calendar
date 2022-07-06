# Template

## Description

Template is a feature that support custom rendering. When creating a calendar instance, custom rendering can be done with template options, and template options can be changed with `setOptions`.

```js
const calendar = new Calendar('#container', {
  template: {
    milestone(event) {
      return `<span style="color: red;">${event.title}</span>`;
    },
  },
});

calendar.setOptions({
  template: {
    milestone(event) {
      return `<span style="color: blue;">${event.title}</span>`;
    },
  },
});
```

## Template list

Each property of the template is a function that returns a VNode of `preact` or a string, and the parameters vary depending on the type of template. Below is the full list of templates.

| Template name                                             | Parameters                       | Description                                                                                                |
| --------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [milestone](#milestone)                                   | [EventObject](./event-object.md) | Milestone events in weekly/daily view                                                                      |
| [milestoneTitle](#milestonetitle)                         | None                             | The left area of the milestone panel in the weekly/daily view                                              |
| [task](#task)                                             | [EventObject](./event-object.md) | Task events in weekly/daily view                                                                           |
| [taskTitle](#tasktitle)                                   | None                             | The left area of the task panel in the weekly/daily view                                                   |
| [allday](#allday)                                         | [EventObject](./event-object.md) | All day events in weekly/daily view                                                                        |
| [alldayTitle](#alldaytitle)                               | None                             | The left area of the allday panel in the weekly/daily view                                                 |
| [time](#time)                                             | [EventObject](./event-object.md) | Timed events in weekly/daily view                                                                          |
| [goingDuration](#goingduration)                           | [EventObject](./event-object.md) | Travel time to a certain location of timed event in weekly/daily view                                      |
| [comingDuration](#comingduration)                         | [EventObject](./event-object.md) | Return time of timed event of weekly/daily view                                                            |
| [monthMoreTitleDate](#monthmoretitledate)                 | TemplateMoreTitleDate            | Title date of the ‘more events’ popup of monthly view                                                      |
| [monthMoreClose](#monthmoreclose)                         | None                             | Close button of the ‘more events’ popup of monthly view                                                    |
| [monthGridHeader](#monthgridheader)                       | TemplateMonthGrid                | Header area of cell in monthly view                                                                        |
| [monthGridHeaderExceed](#monthgridheaderexceed)           | <code>number</code>              | A component that displays the number of exceeding events in the header area of a cell of the monthly view. |
| [monthGridFooter](#monthgridfooter)                       | TemplateMonthGrid                | Footer area of cell in monthly view                                                                        |
| [monthGridFooterExceed](#monthgridfooterexceed)           | <code>number</code>              | A component that displays the number of exceeding events in the footer area of a cell of the monthly view. |
| [monthDayName](#monthdayname)                             | TemplateMonthDayName             | Day of the week names in the monthly view                                                                  |
| [weekDayName](#weekdayname)                               | TemplateWeekDayName              | Day of the week names in the weekly view                                                                   |
| [weekGridFooterExceed](#weekgridfooterexceed)             | <code>number</code>              | A component displaying exceeded events in allday panel in weekly/daily view                                |
| [collapseBtnTitle](#collapsebtntitle)                     | None                             | Collapse button component of allday panel in weekly/daily view                                             |
| [timezoneDisplayLabel](#timezonedisplaylabel)             | TemplateTimezone                 | Label of time zones in weekly/daily view                                                                   |
| [timegridDisplayPrimaryTime](#timegriddisplayprimarytime) | TemplateNow                      | Hours of primary time zone in weekly/daily view                                                            |
| [timegridDisplayTime](#timegriddisplaytime)               | TemplateNow                      | Hours of time zones other than the primary time zone of the weekly/daily view                              |
| [timegridNowIndicatorLabel](#timegridnowindicatorlabel)   | TemplateNow                      | Current time in weekly/daily view                                                                          |
| [popupIsAllday](#popupisallday)                           | None                             | Text of ‘All day’ in event form popup                                                                      |
| [popupStateFree](#popupstatefree)                         | None                             | Text of ‘Free’ status in event form popup                                                                  |
| [popupStateBusy](#popupstatebusy)                         | None                             | Text of ‘Busy’ status in event form popup                                                                  |
| [titlePlaceholder](#titleplaceholder)                     | None                             | Event name placeholder in event form popup                                                                 |
| [locationPlaceholder](#locationplaceholder)               | None                             | Event location placeholder in event form popup                                                             |
| [startDatePlaceholder](#startdateplaceholder)             | None                             | Event start date placeholder in event form popup                                                           |
| [endDatePlaceholder](#enddateplaceholder)                 | None                             | Event end date placeholder in event form popup                                                             |
| [popupSave](#popupsave)                                   | None                             | Text of the save button in event form popup                                                                |
| [popupUpdate](#popupupdate)                               | None                             | Text of the update button in event form popup                                                              |
| [popupEdit](#popupedit)                                   | None                             | Text of the edit button in event details popup                                                             |
| [popupDelete](#popupdelete)                               | None                             | Text of the delete button in event details popup                                                           |
| [popupDetailTitle](#popupdetailtitle)                     | [EventObject](./event-object.md) | Event title in the event details popup                                                                     |
| [popupDetailDate](#popupdetaildate)                       | [EventObject](./event-object.md) | Duration of the event in the event details popup                                                           |
| [popupDetailLocation](#popupdetaillocation)               | [EventObject](./event-object.md) | Location of the event in the event details popup                                                           |
| [popupDetailAttendees](#popupdetailattendees)             | [EventObject](./event-object.md) | Attendees of the event in the event details popup                                                          |
| [popupDetailState](#popupdetailstate)                     | [EventObject](./event-object.md) | State of the event in the event details popup                                                              |
| [popupDetailRecurrenceRule](#popupdetailrecurrencerule)   | [EventObject](./event-object.md) | Recurrence rule of the event in the event details popup                                                    |
| [popupDetailBody](#popupdetailbody)                       | [EventObject](./event-object.md) | Event details of the event in the event details popup                                                      |

## Usage examples

### milestone panel

![milestone](../../assets/template_milestone.png)

#### milestone

You can customize the milestone event of the weekly/daily view by using the [`EventObject`](./event-object.md) parameter.

```js
calendar.setOptions({
  template: {
    milestone(event) {
      return `<span style:"color: blue;">${event.title}</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### milestoneTitle

You can customize the area on the left side of the milestone panel in the weekly/daily view.

```js
calendar.setOptions({
  template: {
    milestoneTitle() {
      return `<span>Milestone events</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### task panel

![task](../../assets/template_task.png)

#### task

You can customize the task events of the weekly/daily view using the [`EventObject`](./event-object.md) parameter.

```js
calendar.setOptions({
  template: {
    task(event) {
      return `<span style="color: red;">${event.title}</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### taskTitle

You can customize the area on the left side of the task panel in the weekly/daily view.

```js
calendar.setOptions({
  template: {
    taskTitle() {
      return `<span>Task events</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### allday panel

![allday](../../assets/template_allday.png)

#### allday

You can customize the allday event of the weekly/daily view by using the [`EventObject`](./event-object.md) parameter.

```js
calendar.setOptions({
  template: {
    allday(event) {
      return `<span style="color: green;">${event.title}</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### alldayTitle

You can customize the area on the left side of the allday panel in the weekly/daily view.

```js
calendar.setOptions({
  template: {
    allday() {
      return `<span>Allday events</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### timed events

![time](../../assets/template_timed.png)

#### time

You can customize the timed event of the weekly/daily view by using the [`EventObject`](./event-object.md) parameter. This part excludes travel time and return time.

```js
calendar.setOptions({
  template: {
    time(event) {
      return `<span style="color: black;">${event.title}</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### goingDuration

By using the [`EventObject`](./event-object.md) parameter, you can customize the travel time from the weekly/daily view to a certain location of the timed event.

```js
calendar.setOptions({
  template: {
    goingDuration(event) {
      return `<span>${event.goingDuration}</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### comingDuration

By using the [`EventObject`](./event-object.md) parameter, you can customize the travel time from the weekly/daily view to a certain location of the timed event.

```js
calendar.setOptions({
  template: {
    comingDuration(event) {
      return `<span>${event.comingDuration}</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### ‘More events’ popup of monthly view

![more-events-popup](../../assets/template_moreEventsPopup.png)

#### monthMoreTitleDate

```ts
interface TemplateMoreTitleDate {
  ymd: string; // `YYYY-MM-DD` string format data of the date
  date: number; // Date number of the date
  day: number; // Day of the week for the date
}
```

You can customize the date of the Show More popup.

```js
calendar.setOptions({
  template: {
    monthMoreTitleDate(moreTitle) {
      const { date } = moreTitle;

      return `<span>${date}</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### monthMoreClose

You can customize the close button for the Show More popup. By default, the close button is not displayed.

```js
calendar.setOptions({
  template: {
    monthMoreClose() {
      return '';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### Header and Footer of monthly view

![grid-header-footer](../../assets/template_gridHeaderFooter.png)

```ts
interface TemplateMonthGrid {
  date: string; // day of the date
  day: number; // day of the week on that date
  hiddenEventCount: number; // number of events not displayed
  isOtherMonth: boolean; // Whether the date is in a different month from the current month view
  isToday: boolean; // Whether it is today's date
  month: number; // the month number
  ymd: string; // `YYYY-MM-DD` string format data of the date
}
```

#### monthGridHeader

The header area of the monthly view cell can be customized. It receives the `TemplateMonthGrid` object as a parameter.

```js
calendar.setOptions({
  template: {
    monthGridHeader(model) {
      const date = parseInt(model.date.split('-')[2], 10);

      return `<span>${date}</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### monthGridHeaderExceed

You can customize the component that displays the number of events exceeding in the header area of the monthly view cell. Receives the number of events exceeded as a parameter.

```js
calendar.setOptions({
  template: {
    monthGridHeaderExceed(hiddenEvents) {
      return `<span>${hiddenEvents} more</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### monthGridFooter

The footer area of the monthly view cell can be customized. It receives the `TemplateMonthGrid` object as a parameter. By default, nothing is displayed.

```js
calendar.setOptions({
  template: {
    monthGridFooter() {
      return '';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### monthGridFooterExceed

You can customize the component that displays the number of events exceeding in the footer area of the monthly view cell. Receives the number of events exceeded as a parameter. By default, nothing is displayed.

```js
calendar.setOptions({
  template: {
    monthGridFooterExceed() {
      return '';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### Day names

#### monthDayName

![month-dayname](../../assets/template_monthDayName.png)

```ts
interface TemplateMonthDayName {
  day: number; // The day of the week for that date
  label: string; // Basic English abbreviation string for the day of the week
}
```

You can customize the day name of the week in the monthly view.

```js
calendar.setOptions({
  template: {
    monthDayName(model) {
      return model.label;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### weekDayName

![week-dayname](../../assets/template_weekDayName.png)

```ts
interface TemplateWeekDayName {
  date: number; // day of the week
  day: number; // The day of the week
  dayName: string; // Basic English abbreviation string for the day of the week
  isToday: boolean; // Whether the day of the week is today
  renderDate: string; // Base date of weekly/daily view rendering
  dateInstance: TZDate; // `Date` object for the day of the week
}
```

You can customize the day name of the week in the weekly/daily view.

```js
calendar.setOptions({
  template: {
    weekDayName(model) {
      return `<span>${model.date}</span>&nbsp;&nbsp;<span>${model.dayName}</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### weekGridFooterExceed

![week-exceed](../../assets/template_weekExceed.png)

You can customize the component that displays exceeding events in the allday panel of the weekly/daily view. Receives the number of events exceeded as a parameter.

```js
calendar.setOptions({
  template: {
    weekGridFooterExceed(hiddenEvents) {
      return `+${hiddenEvents}`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### collapseBtnTitle

![collapse-btn](../../assets/template_collapseBtn.png)

You can customize the collapse button component of the weekly/daily view.

```js
calendar.setOptions({
  template: {
    collapseBtnTitle() {
      return `<span>↑</span>`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### timezoneDisplayLabel

![timezone-display](../../assets/template_timezoneDisplay.png)

You can customize the label of the time zone in the weekly/daily view that uses two or more time zones.

```js
calendar.setOptions({
  template: {
    timezoneDisplayLabel({ timezoneOffset }) {
      const sign = timezoneOffset < 0 ? '-' : '+';
      const hours = Math.abs(timezoneOffset / 60);
      const minutes = Math.abs(timezoneOffset % 60);

      return `GMT${sign}${hours}:${minutes}`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### Display Time

![timegrid-time](../../assets/template_timegridTime.png)

```ts
type TimeUnit = 'second' | 'minute' | 'hour' | 'date' | 'month' | 'year';

interface TemplateNow {
  unit: TimeUnit; // Unit of time
  time: TZDate; // the time
  format: string; // format of the time
}
```

[⬆️ Back to the list](#template-list)

#### timegridDisplayPrimaryTime

You can customize the displayed time of the primary time zone.

```js
calendar.setOptions({
  template: {
    timegridDisplayPrimaryTime({ time }) {
      return `primary timezone: ${time}`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### timegridDisplayTime

You can customize the displayed time of time zones, except for the primary time zone.

```js
calendar.setOptions({
  template: {
    timegridDisplayTime({ time }) {
      return `sub timezone: ${time}`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### timegridNowIndicatorLabel

You can customize the current time text displayed on the current time indicator.

```js
calendar.setOptions({
  template: {
    timegridNowIndicatorLabel({ time }) {
      return `current time: ${time}`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### Event form popup

![popup-create](../../assets/template_popupCreate.png)

#### popupIsAllday

You can customize the ‘All day’ text in the event form popup.

```js
calendar.setOptions({
  template: {
    popupIsAllday() {
      return 'All day';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### popupStateFree

You can customize the ‘Free’ state of the event in the event form popup.

```js
calendar.setOptions({
  template: {
    popupStateFree() {
      return 'Free';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### popupStateBusy

You can customize the ‘Busy’ state of the event in the event form popup.

```js
calendar.setOptions({
  template: {
    popupStateBusy() {
      return 'Busy';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### titlePlaceholder

You can customize the placeholder for the event title in the event form popup. It must return a string.

```js
calendar.setOptions({
  template: {
    titlePlaceholder() {
      return 'Title';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### locationPlaceholder

You can customize the placeholder for the event location in the event form popup. It must return a string.

```js
calendar.setOptions({
  template: {
    locationPlaceholder() {
      return 'Location';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### startDatePlaceholder

You can customize the start date placeholder for the event in the event form popup. It must return a string.

```js
calendar.setOptions({
  template: {
    startDatePlaceholder() {
      return 'Start date';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### endDatePlaceholder

You can customize the end date placeholder for the event in the event form popup. It must return a string.

```js
calendar.setOptions({
  template: {
    endDatePlaceholder() {
      return 'End date';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### popupSave

You can customize the text of the save button in the event form popup.

```js
calendar.setOptions({
  template: {
    popupSave() {
      return 'Add';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### Event edit popup

![popup-edit](../../assets/template_popupEdit.png)

#### popupUpdate

You can customize the text of the update button in the event form popup.

```js
calendar.setOptions({
  template: {
    popupUpdate() {
      return 'Update';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

### Event details popup

![popup-detail](../../assets/template_popupDetail.png)

#### popupEdit

You can customize the text of the edit button in the event details popup.

```js
calendar.setOptions({
  template: {
    popupEdit() {
      return 'Edit';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### popupDelete

You can customize the text of the delete button in the event details popup.

```js
calendar.setOptions({
  template: {
    popupDelete() {
      return 'Delete';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### popupDetailTitle

You can customize the event title in the event details popup.

```js
calendar.setOptions({
  template: {
    popupDetailTitle({ title }) {
      return title;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### popupDetailDate

You can customize the duration of the event in the event details popup.

```js
calendar.setOptions({
  template: {
    popupDetailDate({ start, end }) {
      return `${start.toString()} - ${end.toString()}`;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### popupDetailLocation

You can customize the location of the event in the event details popup.

```js
calendar.setOptions({
  template: {
    popupDetailLocation({ location }) {
      return location;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### popupDetailAttendees

You can customize the attendees of the event in the event details popup.

```js
calendar.setOptions({
  template: {
    popupDetailAttendees({ attendees = [] }) {
      return attendees.join(', ');
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### popupDetailState

You can customize the state of the event in the event details popup.

```js
calendar.setOptions({
  template: {
    popupDetailState({ state }) {
      return state || 'Busy';
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### popupDetailRecurrenceRule

You can customize the event recurrence rule in the event details popup.

```js
calendar.setOptions({
  template: {
    popupDetailRecurrenceRule({ recurrenceRule }) {
      return recurrenceRule;
    },
  },
});
```

[⬆️ Back to the list](#template-list)

#### popupDetailBody

You can customize the contents of the event in the event details popup.

```js
calendar.setOptions({
  template: {
    popupDetailBody({ body }) {
      return body;
    },
  },
});
```

[⬆️ Back to the list](#template-list)
