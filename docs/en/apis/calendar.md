# Calendar class

## Description

You can use the `Calendar` class to create a calendar instance. You need to specify where you want the instance to be created (the HTML element), and set the appropriate options if necessary.

Add a container element where TOAST UI Calendar will be created. **This element must have an appropriate height. (600px or higher is recommended)**

```js
import { Calendar } from '@toast-ui/calendar';

// Passing elements directly
const container = document.querySelector('#container');
const calendar = new Calendar(container);

// Using CSS selectors
const calendar = new Calendar('#container');
```

Options can be set as the second argument when creating a calendar instance. Options that are not specified are set to default values. For more information on options, see the [Options documentation](./options.md).

```js
const calendar = new Calendar(container, {
  // Options of the calendar instance
  defaultView: 'month',
  isReadOnly: true,
  timezone: {
    // ...
  },
  theme: {
    // ...
  },
  template: {
    // ...
  },
});
```

After creating an instance, you can control the operation of the calendar using the calendar [instance method](#instance-methods) and register event handlers in the [instance event](#instance-events).

```js
const calendar = new Calendar('#container');

// Registering an instance event
calendar.on('beforeCreateEvent', (eventObj) => {
  // Calling the instance method when the instance event is invoked
  calendar.createEvents([
    {
      ...eventObj,
      id: uuid(),
    },
  ]);
});
```

## Instance methods

💡 Click on a method to see more detailed explanations and usage examples.

| Method                                          | Description                                                                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [render](#render)                               | Renders the calendar instance to the screen.                                                                                          |
| [renderToString](#rendertostring)               | Returns the rendering result of the current calendar instance as an HTML string for use in server-side rendering.                     |
| [destroy](#destroy)                             | Destroys the calendar instance.                                                                                                       |
| [getEvent](#getevent)                           | Gets the data of the target event.                                                                                                    |
| [createEvents](#createevents)                   | Creates one or more calendar events.                                                                                                  |
| [updateEvent](#updateevent)                     | Updates the contents of the target event.                                                                                             |
| [deleteEvent](#deleteevent)                     | Deletes the target event.                                                                                                             |
| [clear](#clear)                                 | Removes all events stored in the calendar instance.                                                                                   |
| [today](#today)                                 | Moves to the range containing the current date.                                                                                       |
| [move](#move)                                   | According to the view, it moves the range by a given number.                                                                          |
| [prev](#prev)                                   | Moves to the previous range of the current screen. The range of movement depends on the range of the view.                            |
| [next](#next)                                   | Moves to the next range of the current screen. The range of movement depends on the range of the view.                                |
| [setDate](#setdate)                             | Moves to the range containing the specified date.                                                                                     |
| [changeView](#changeview)                       | Changes the view of the calendar instance to Monthly/Weekly/Day.                                                                      |
| [getElement](#getelement)                       | Finds the HTML element where a specific event was rendered. If not found, `null` is returned.                                         |
| [setTheme](#settheme)                           | Changes the theme of the calendar instance.                                                                                           |
| [getOptions](#getoptions)                       | Gets the options set in the calendar instance.                                                                                        |
| [setOptions](#setoptions)                       | Changes the options of the calendar instance.                                                                                         |
| [getDate](#getdate)                             | Gets the base date for displaying range of the calendar instance.                                                                     |
| [getDateRangeStart](#getdaterangestart)         | Gets the start date for displaying range of the calendar instance.                                                                    |
| [getDateRangeEnd](#getdaterangeend)             | Gets the end date for displaying range of the calendar instance.                                                                      |
| [getViewName](#getviewname)                     | Gets the view type of the calendar instance. (Monthly / Weekly / Daily)                                                               |
| [setCalendars](#setcalendars)                   | Changes calendar information.                                                                                                         |
| [setCalendarVisibility](#setcalendarvisibility) | Hides or shows all events included in the specified event group.                                                                      |
| [setCalendarColor](#setcalendarcolor)           | Changes the color value of all events included in the specified event group.                                                          |
| [scrollToNow](#scrolltonow)                     | If a displayed range contains the current time in the weekly/daily view, it immediately scrolls to the current time area.             |
| [openFormPopup](#openformpopup)                 | Displays the popup for creating the event. The value of the popup is filled according to the parameter.                               |
| [clearGridSelections](#cleargridselections)     | Removes all date/time selection elements currently displayed in the calendar.                                                         |
| [fire](#fire)                                   | Executes arbitrary instance events. A detailed description is provided in the [Instance Events](#instance-events) section.            |
| [off](#off)                                     | Unregisters an instance event. A detailed description is provided in the [Instance Events](#instance-events) section.                 |
| [on](#on)                                       | Registers an instance event. A detailed description is provided in the [Instance Events](#instance-events) section.                   |
| [once](#once)                                   | Registers an instance event to fire only once. A detailed description is provided in the [Instance Events](#instance-events) section. |

### render

- Type: `render(): Calendar`
- Returns: `Calendar` - the calendar instance

This method is automatically called when a calendar instance is created in the browser environment.

When called for the first time, the calendar element is inserted under the HTML element passed as an argument when creating the instance, and if the `render` method is called directly, it is re-rendered.

If no HTML container is passed when instantiating, nothing happens.

After calling the method, it returns the calendar instance itself.

```js
// Nothing happens
const calendar = new Calendar();
calendar.render();

// Automatically rendered once when there is an element
const calendar = new Calendar('#container');

// Re-render the instance above
calendar.render();
```

[⬆️ Back to the list](#instance-methods)

### renderToString

- Type: `renderToString(): string`
- Returns: `string` - HTML string

Generates and returns an HTML string to be rendered by the calendar instance based on the given option value. It can be used in a server-side rendering environment.

```js
const isSSR = typeof window === 'undefined';

// For client, the calendar will be mounted to the `#container` after initializing the instance, but nothing happens in the server. 
const calendar = new Calendar('#container');

if (isSSR) {
  const calendarHTML = calendar.renderToString();
  // Send the HTML to the client from the server
}
```

[⬆️ Back to the list](#instance-methods)

### destroy

- Type: `destroy(): void`

Destroys the element rendered via the calendar instance, making the instance an empty object.

[⬆️ Back to the list](#instance-methods)

### getEvent

- Type: `getEvent(eventId: string, calendarId: string): EventObject`
- Parameters
  - `eventId` - the unique ID of the event
  - `calendarId` - the unique ID of the calendar
- Returns: `EventObject` - an object containing event information

Finds events stored within the calendar instance. Event-specific `eventId` and calendar-specific `calendarId` values are required.

```js
const calendar = new Calendar('#container', {
  calendars: [
    {
      id: 'cal1',
      name: 'Work',
    },
  ],
});

calendar.createEvents([
  {
    id: 'event1',
    calendarId: 'cal1',
    title: 'Weekly Meeting',
    start: '2022-05-30T09:00:00',
    end: '2022-05-30T10:00:00',
  },
]);

const firstEvent = calendar.getEvent('event1', 'cal1');

console.log(firstEvent.title); // 'Weekly Meeting'
```

[⬆️ Back to the list](#instance-methods)

### createEvents

- Type: `createEvents(events: EventObject[]): void`
- Parameters
  - `EventObject[]` - an array of event information to create

Creates one or more events. An array must also be passed even creating a single event.

Refer to the [EventObject](./event-object.md) document for information required to create an event.

```js
// Creating a single event
const calendar = new Calendar('#container', {
  calendars: [
    {
      id: 'cal1',
      name: 'Work',
    },
  ],
});

// Creating multiple events
calendar.createEvents([
  {
    id: 'event1',
    calendarId: 'cal1',
    title: 'Weekly Meeting',
    start: '2022-05-30T09:00:00',
    end: '2022-05-30T10:00:00',
  },
]);

const firstEvent = calendar.getEvent('event1', 'cal1');

console.log(firstEvent.title); // 'Weekly Meeting'
```

[⬆️ Back to the list](#instance-methods)

### updateEvent

- Type: `updateEvent(eventId: string, calendarId: string, changes: EventObject): void`
- Parameters
  - `eventId` - the unique ID of the event
  - `calendarId` - the unique ID of the calendar
  - `changes` - the changes you want to apply

Changes the information of the generated event. To find an event, you need an event-specific `eventId`, a calendar-specific `calendarId`, and an object containing the information you want to change. The properties and values to be changed must match the properties of the `EventObject`.

```js
// First, assume that the event is created as shown below..
calendar.createEvents([
  {
    id: 'event1',
    calendarId: 'cal1',
    title: 'Weekly Meeting',
    start: '2022-05-30T09:00:00',
    end: '2022-05-30T10:00:00',
  },
]);

// When changing only one property, title
calendar.updateEvent('event1', 'cal1', {
  title: 'Weekly Meeting (Canceled)',
});

// When changing multiple properties
calendar.updateEvent('event1', 'cal1', {
  title: 'Going vacation',
  state: 'Free',
  start: '2022-05-30T00:00:00',
  end: '2022-06-03T23:59:59',
});
```

[⬆️ Back to the list](#instance-methods)

### deleteEvent

- Type: `deleteEvent(eventId: string, calendarId: string): void`
- Parameters
  - `eventId` - the unique ID of the event
  - `calendarId` - the unique ID of the calendar

Deletes the target event.

```js
// First, assume that the event is created as shown below..
calendar.createEvents([
  {
    id: 'event1',
    calendarId: 'cal1',
    title: 'Weekly Meeting',
    start: '2022-05-30T09:00:00',
    end: '2022-05-30T10:00:00',
  },
]);

calendar.deleteEvent('event1', 'cal1');

// If you try to find the event, it does not exist.
const deletedEvent = calendar.getEvent('event1', 'cal1');
console.log(deletedEvent); // null
```

[⬆️ Back to the list](#instance-methods)

### clear

- Type: `clear(): void`

Removes all events stored in the calendar instance.

[⬆️ Back to the list](#instance-methods)

### today

- Type: `today(): void`

Moves the display range of the calendar instance to the current date.

[⬆️ Back to the list](#instance-methods)

### move

- Type: `move(offset: number): void`
- Parameters
  - `offset` - Enter the range to move to as an integer. Nothing happens when there is no parameter.

Moves the display range of the calendar instance forward or backward. A positive number moves the display range to the future based on the current range, and a negative number moves it to the past.

The moving range is different for each month/week/day depending on the monthly/weekly/daily view, and there may be detailed differences depending on the set option.

```js
// Move to last year in month view
calendar.move(-12);

// Move back 3 days in the day view
calendar.move(3);
```

[⬆️ Back to the list](#instance-methods)

### prev

- Type: `prev(): void`

Moves the display range of the calendar instance to the previous range by one unit.

The moving range is different for each month/week/day depending on the monthly/weekly/daily view, and there may be detailed differences depending on the set option.

[⬆️ Back to the list](#instance-methods)

### next

- Type: `next(): void`

Moves the display range of the calendar instance to the next range by one unit.

The moving range is different for each month/week/day depending on the monthly/weekly/daily view, and there may be detailed differences depending on the set option.

[⬆️ Back to the list](#instance-methods)

### setDate

- Type: `setDate(date: DateType): void`
- Parameters
  - `date` - an object or string containing time information. You can pass a `Date` object, a string used to create a `Date` object, or a `TZDate` object.

Changes the date on which the calendar instance displays the view. As a result, the display range is moved based on `date`.

Unlike the `move` method, which moves the view by range, `setDate` allows you to move the view directly to a specific date.

```js
// Going to March 2022 in the monthly view (string)
calendar.setDate('2022-03-01');

// Passing the Date object directly
calendar.setDate(new Date(2022, 4, 1));
```

[⬆️ Back to the list](#instance-methods)

### changeView

- Type: `changeView(viewName: ViewType): void`
- Parameters
  - `viewName` - The type of view you want to select. You can pass `'month'`, `'week'` or `'day'`.

Changes the view of the calendar instance to Monthly/Weekly/Day.

```js
// Changing to monthly view
calendar.changeView('month');

// Changing to weekly view
calendar.changeView('week');

// Changing to daily view
calendar.changeView('day');
```

[⬆️ Back to the list](#instance-methods)

### getElement

- Type: `getElement(eventId: string, calendarId: string): HTMLElement | null`
- Parameters
  - `eventId` - the unique ID of the event
  - `calendarId` - the unique ID of the calendar
- Returns: `HTMLElement | null` - If an event is found, the HTML element of the event is returned, otherwise `null` is returned.

Retrieves and returns the actual HTML element of the event that the calendar instance is rendering.

If no event is found, `null` is returned.

[⬆️ Back to the list](#instance-methods)

### setTheme

- Type: `setTheme(theme: DeepPartial<ThemeState>): void`
- Parameters: `theme` - object containing theme settings

Changes the theme of the calendar instance. For available themes, refer to the [theme documentation](./theme.md).

```js
// Example of changing the weekend background color in the monthly view
calendar.setTheme({
  month: {
    weekend: {
      backgroundColor: 'aliceblue',
    },
  },
});
```

[⬆️ Back to the list](#instance-methods)

### getOptions

- Type: `getOptions(): void`

Returns all options for the current calendar instance.

[⬆️ Back to the list](#instance-methods)

### setOptions

- Type: `setOptions(options: Options): void`
- Parameters
  - `options` - the options object used by the calendar instance

Changes the options of the current calendar instance. For each option and detailed operation, refer to the [option document](./options.md).

```js
// Example of changing the primary time zone
calendar.setOptions({
  timezone: {
    zones: [
      {
        timezoneName: 'Europe/London',
      },
    ],
  },
});
```

[⬆️ Back to the list](#instance-methods)

### getDate

- Type: `getDate(): TZDate`
- Returns: `TZDate` - object containing time information

Returns information of the base date used to render the current view of the calendar instance.

[⬆️ Back to the list](#instance-methods)

### getDateRangeStart

- Type: `getDateRangeStart(): TZDate`
- Returns: `TZDate` - object containing time information

Returns the start time of the range of dates the calendar instance is currently rendering.

[⬆️ Back to the list](#instance-methods)

### getDateRangeEnd

- Type: `getDateRangeEnd(): TZDate`
- Returns: `TZDate` - object containing time information

Returns the end time of the range of dates the calendar instance is currently rendering.

[⬆️ Back to the list](#instance-methods)

### getViewName

- Type: `getViewName(): ViewType`
- Returns: `ViewType` - the type of the current calendar view. It is divided into `month`, `week`, and `day`.

Returns the view type currently displayed by the calendar instance.

[⬆️ Back to the list](#instance-methods)

### setCalendars

- Type: `setCalendars(calendars: CalendarInfo[]): void`
- Parameters
  - `calendars` - an array of calendar information. Calendar information has the following types. See the [calendar](./event-object.md#calendarcalendarid) documentation for details.

```ts
interface CalendarInfo {
  id: string;
  name: string;
  color?: string;
  bgColor?: string;
  dragBgColor?: string;
  borderColor?: string;
}
```

Set up one or more calendars.

```js
calendar.setCalendars([
  {
    id: 'cal1',
    name: 'Personal',
    color: '#ffffff',
    backgroundColor: '#9e5fff',
    dragBackgroundColor: '#9e5fff',
    borderColor: '#9e5fff',
  },
  {
    id: 'cal2',
    name: 'Work',
    color: '#00a9ff',
    backgroundColor: '#00a9ff',
    dragBackgroundColor: '#00a9ff',
    borderColor: '#00a9ff',
  },
]);
```

[⬆️ Back to the list](#instance-methods)

### setCalendarVisibility

- Type: `setCalendarVisibility(calendarId: string | string[], isVisible: boolean): void`
- Parameters
  - `calendarId` - Unique ID of the calendar to show/hide. You can pass one or several as an array.
  - `isVisible` - A value to show or hide all events belonging to this calendar. If `true`, all events are visible, and if `false`, all events are invisible.

Shows or hides all events included in a specific calendar.

[⬆️ Back to the list](#instance-methods)

### setCalendarColor

- Type: `setCalendarColor(calendarId: string, colorOptions: CalendarColor): void`
- Parameters
  - `calendarId` - the unique ID of the calendar
  - `colorOptions` - The color values to apply. Please refer to the [calendar documentation](./event-object.md#calendarcalendarid) for details.

Changes the color value of all events included in the specified event group.

[⬆️ Back to the list](#instance-methods)

### scrollToNow

- Type: `scrollToNow(scrollBehavior?: 'auto' | 'smooth'): void`

When the current time is displayed in the weekly view or the daily view, the scroll moves to the position where the current time is. In IE11, even if `'smooth'` is passed, it does not work.

[⬆️ Back to the list](#instance-methods)

### openFormPopup

- Type: `createEvents(events: EventObject[]): void`
- Parameters
  - `event` - an object containing event information. For details, refer to the [EventObject document](./event-object.md).

When the `useFormPopup` option is `true`, a popup for creating an event is displayed without going through an interaction.

The event data passed as a parameter is displayed as specified in the input field in the popup.

```js
calendar.openFormPopup({
  id: 'some-event-id',
  calendarId: 'cal1',
  title: 'Go to live concert',
  start: '2022-05-31T09:00:00',
  end: '2022-05-31T12:00:00',
  category: 'time',
});
```

[⬆️ Back to the list](#instance-methods)

### clearGridSelections

- Type: `clearGridSelections(): void`

Removes all date/time selection elements currently displayed in the calendar.

```js
calendar.clearGridSelections();
```

[⬆️ Back to the list](#instance-methods)

### fire

- Type: `fire(eventName: string, ...args: any[]): Calendar`
- Parameters
  - `eventName` - the name of the event
  - `...args` - parameters to pass to the event handler
- Returns: current calendar instance

Executes arbitrary [instance events](#instance-events). If an event is registered, all parameters after the first parameter are passed to the registered event handler.

To register an instance event. A detailed description is provided in the [Instance Events](#instance-events) section.

```js
// Let’s assume that the following event is registered.
calendar.on('beforeCreateEvent', (data) => {
  console.log(`from: ${data.start.toDateString()} to ${data.end.toDateString()}`);
});

calendar.fire('beforeCreateEvent', {
  start: new Date('2022-05-31'),
  end: new Date('2022-06-01'),
});
// output: 'from Tue May 31 2022 to Wed Jun 01 2022'
```

[⬆️ Back to the list](#instance-methods)

### off

- Type: `off(eventName: string, handler?: (...args: any[]) => void): Calendar`
- Parameters
  - `eventName` - the name of the event
  - `handler` - the handler function registered for the event
- Returns: current calendar instance

Cancels the registered instance event. If a handler is not passed, all handlers registered for the event are unregistered.

If a handler is passed as a parameter, only that handler is unregistered.

To register an instance event. A detailed description is provided in the [Instance Events](#instance-events) section.

```js
const someEventHandler = () => {
  console.log('some event fired');
};

calendar.on('some-event', someEventHandler);

calendar.fire('some-event');
// output: 'some event fired'

calendar.off('some-event', someEventHandler);

calendar.fire('some-event'); // Nothing happens
```

[⬆️ Back to the list](#instance-methods)

### on

- Type: `on(eventName: string, handler: (...args: any[]) => void): Calendar`
- Parameters
  - `eventName` - the name of the event
  - `handler` - the handler function registered for the event
- Returns: current calendar instance

Registers an instance event. If the registered event name is called through the `fire` method, all handlers registered through `on` are executed.

To register an instance event. A detailed description is provided in the [Instance Events](#instance-events) section.

```js
// Registering an event
calendar.on('beforeCreateEvent', (data) => {
  console.log(`from: ${data.start.toDateString()} to ${data.end.toDateString()}`);
});

calendar.fire('beforeCreateEvent', {
  start: new Date('2022-05-31'),
  end: new Date('2022-06-01'),
});
// output: 'from Tue May 31 2022 to Wed Jun 01 2022'
```

[⬆️ Back to the list](#instance-methods)

### once

- Type: `once(eventName: string, handler: (...args: any[]) => void): Calendar`
- Parameters
  - `eventName` - the name of the event
  - `handler` - the handler function registered for the event
- Returns: current calendar instance

Registers an instance event. If the registered event name is called through the `fire` method, all handlers registered through `once` are executed only once.

To register an instance event. A detailed description is provided in the [Instance Events](#instance-events) section.

```js
// Registering an event once
calendar.once('beforeCreateEvent', (data) => {
  console.log(`from: ${data.start.toDateString()} to ${data.end.toDateString()}`);
});

calendar.fire('beforeCreateEvent', {
  start: new Date('2022-05-31'),
  end: new Date('2022-06-01'),
});
// output: 'from Tue May 31 2022 to Wed Jun 01 2022'

calendar.fire('beforeCreateEvent', {
  start: new Date('2022-06-01'),
  end: new Date('2022-06-02'),
});
// Nothing happens
```

[⬆️ Back to the list](#instance-methods)

## Instance events

All actions of the calendar cannot be controlled by methods only. This is because you never know when a user interaction, such as a click or drag-and-drop, will occur.

TOAST UI Calendar provides instance events. If necessary, you can set to receive events and execute desired actions. In addition, you can set up your own events.

```js
// Registering custom events and event handlers
calendar.on('myCustomEvent', (currentView) => {
  calendar.changeView(currentView === 'week' ? 'day' : 'month');
});

// Executing custom events
calendar.fire('myCustomEvent', calendar.getViewName());
```

### List of instance events

The list of predefined instance events is as follows.

| Event name                                            | Description                                                                                                                    |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [selectDateTime](#selectdatetime)                     | Occurs when dragging and dropping a specific date or time then dropping                                                        |
| [beforeCreateEvent](#beforecreateevent)               | Occurs when the ‘Save’ button is pressed in the default event creation/modification popup                                      |
| [beforeUpdateEvent](#beforeupdateevent)               | Occurs when the ‘Save’ button is pressed in the default event creation/modification popup or an event is dragged and dropped   |
| [beforeDeleteEvent](#beforedeleteevent)               | Occurs when the ‘Delete’ button is pressed in the default event details popup                                                   |
| [afterRenderEvent](#afterrenderevent)                 | Occurs when each event is rendered                                                                                             |
| [clickDayName](#clickdayname)                         | Occurs when a day of the week at the top of the calendar is clicked                                                            |
| [clickEvent](#clickevent)                             | Occurs when an event is clicked                                                                                                |
| [clickMoreEventsBtn](#clickmoreeventsbtn)             | Occurs when you click the 'More' button that appears because the number of events in each cell of the monthly view is exceeded |
| [clickTimezoneCollapseBtn](#clicktimezonecollapsebtn) | Occurs when you click the collapse button that appears when multiple time zones are displayed in the weekly or daily view      |

Each event passes specific parameters to the event handler function when it is executed.

### selectDateTime

- Parameters: `info: SelectDateTimeInfo` - Contains information about the selected time.

```ts
interface SelectDateTimeInfo {
  start: Date;
  end: Date;
  isAllday: boolean;
  nativeEvent?: MouseEvent; // Native mouse event on mouse release
  gridSelectionElements: Element[]; // List of elements corresponding to the selection area
}
```

When `isReadOnly` among the calendar instance options is `false`, a specific date or time can be selected by clicking or dragging and dropping an empty space in the calendar area.

At this time, information of the selected time can be obtained through the `selectDateTime` event. And you can use the element directly through `gridSelectionElements` to calculate the position, etc.

![Selecting dates in the month view](../../assets/select-date-time-1.gif)
![Selecting time in the week/day view](../../assets/select-date-time-2.gif)

[⬆️ Back to the list](#list-of-instance-events)

### beforeCreateEvent

- Parameters: `event: EventObject` - Information entered in the event creation popup is passed. For more information on the object to be passed, refer to the [EventObject document](./event-object.md).

When `useFormPopup` of calendar instance options is `true`, the default event creation popup can be used.

When the ‘Save’ button is pressed in this event creation popup, the `beforeCreateEvent` instance event occurs.

```js
// Creating an event through popup
calendar.on('beforeCreateEvent', (eventObj) => {
  calendar.createEvents([
    {
      ...eventObj,
      id: uuid(),
    },
  ]);
});
```

[⬆️ Back to the list](#list-of-instance-events)

### beforeUpdateEvent

- Parameter: `updatedEventInfo: UpdatedEventInfo` - Contains existing event information and modified event information. For more information on the object to be passed, refer to the [EventObject document](./event-object.md).

```ts
interface UpdatedEventInfo {
  event: EventObject;
  changes: EventObject;
}
```

The `event` property is information of the existing event, and the `changes` property contains only properties and values that are different from the existing event information.

In the following cases, `beforeUpdateEvent` is executed.

- When `useFormPopup` and `useDetailPopup` of the calendar instance options are both `true` and the ‘Update’ button is pressed after modifying the event through the event details popup
  - ![Event execution through popup](../../assets/before-update-event-1.gif)
- When the `useDetailPopup` option is `true` and the `useFormPopup` is `false`, the 'Edit' button inside the event details popup is pressed. 
- When moving or resizing events by drag and drop, while `isReadOnly` is not `true` among calendar instance options and also `isReadOnly` is not `true` in the properties of individual events.
  - ![Event execution via drag and drop](../../assets/before-update-event-2.gif)

```js
// Basic example of updating an event
calendar.on('beforeUpdateEvent', ({ event, change }) => {
  calendar.updateEvent(event.id, event.calendarId, change);
});
```

[⬆️ Back to the list](#list-of-instance-events)

### beforeDeleteEvent

- Parameters: `event: EventObject` - Information of the event to be deleted. For more information on the object to be passed, refer to the [EventObject document](./event-object.md).

You can select an event through the event details popup and press the ‘Delete’ button when `isReadOnly` in the calendar instance options and `isReadOnly` for individual event properties are not `true`, and also the `useDetailPopup` option is `true`.

Given that conditions above are satisfied, when the ‘Delete’ button is pressed, `beforeDeleteEvent` is executed.

![Fire beforeDeleteEvent event via popup](../../assets/before-delete-event.gif)

```js
// Basic example of deleting an event
calendar.on('beforeDeleteEvent', (eventObj) => {
  calendar.deleteEvent(eventObj.id, eventObj.calendarId);
});
```

[⬆️ Back to the list](#list-of-instance-events)

### afterRenderEvent

- Parameters: `event: EventObject` - Information of the rendered event. For more information on the object to be passed, refer to the [EventObject document](./event-object.md).

Fired whenever each event is rendered within the calendar.

Whenever an event is rendered due to event creation, modification, deletion, etc., **all events visible on the screen** execute `afterRenderEvent`.

### clickDayName

- Parameters: `dayNameInfo: DayNameInfo` - The information of the clicked date is displayed as a string in `YYYY-MM-DD` format.

The header area of the weekly/daily view displays the day of the week and date of the currently viewed time range. When a specific day of the week in this header is clicked, the `clickDayName` event is executed.

**This event does not occur in the monthly view.**

![Fire clickDayName event when a date is clicked](../../assets/click-dayName.gif)

### clickEvent

- Parameters: `eventInfo: EventInfo` - Information of the clicked event with a native `MouseEvent`.

```ts
interface EventInfo {
  event: EventObject;
  nativeEvent: MouseEvent;
}
```

For more information about the event information, refer to the [EventObject document](./event-object.md).

When clicking each event rendered in the calendar, a `clickEvent` event is fired.

⚠️ This event is not executed when `isReadOnly` among the calendar instance options is `true` or `isReadOnly` among the properties of the event to be clicked is `true`.

[⬆️ Back to the list](#list-of-instance-events)

### clickMoreEventsBtn

- Parameters: `moreEventsBtnInfo: MoreEventsBtnInfo` - Related information of the clicked button.

```ts
interface MoreEventsBtnInfo {
  date: Date; // Date of the clicked button
  target: HTMLDivElement; // DOM element of the popup that appears when the button is clicked
}
```

In the monthly view, the 'more' button is displayed when there are too many events for one date and can no longer be displayed on the screen. When this button is clicked, the `clickMoreEventsBtn` event is executed.

![more event button in monthly view](../../assets/click-more-events-btn.png)

[⬆️ Back to the list](#list-of-instance-events)

### clickTimezonesCollapseBtn

- Parameters: `prevCollapsedState` - The previous collapsed state of the clicked button is passed as either `true` or `false`.

In the weekly/daily view, if two or more [timezones](./options.md#timezone) are used in the calendar instance option and the `week.showTimezoneCollapsedButton` option is `true`, a button to collapse or expand other time zones is displayed. When this button is clicked, the `clickTimezonesCollapseBtn` event is fired.

![time zone collapse button](../../assets/click-timezones-collapse-btn.png)

```js
// Example changing the left side of the weekly/daily view when clicking the collapse button
calendar.on('clickTimezonesCollapseBtn', (prevCollapsedState) => {
  const shouldCollapse = prevCollapsedState === false;

  calendar.setOptions({
    week: {
      timezonesCollapsed: !prevCollapsedState,
    },
    theme: {
      week: {
        timeGridLeft: shouldCollapse ? '72px' : '150px',
      },
    },
  });
});
```

[⬆️ Back to the list](#list-of-instance-events)

### Custom instance events

Apart from predefined events, users can register separate custom instance events as needed.

When you use an event name not listed above and specify the event through `once` or `on` and then the `fire` method is called, the event is executed.

The methods required to set and execute the event are as follows.

- [on](#on)
- [once](#once)
- [fire](#fire)
- [off](#off)

```js
calendar.on('myCustomEvent', (e) => {
  console.log('myCustomEvent fired', e);
});

calendar.fire('myCustomEvent', {
  myCustomEvent: 'myCustomEvent',
});
```

[⬆️ Back to the list](#list-of-instance-events)
