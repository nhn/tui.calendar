# TOAST UI Calendar
tui-calendar

## Feature
* Various view types: daily, weekly, monthly
* Narrow weekend
* Start Day of Week

## Documentation
* API: [https://github.nhnent.com/pages/fe/application-dooray-calendar/latest/](https://github.nhnent.com/pages/fe/application-dooray-calendar/latest/)
* Examples: [https://github.nhnent.com/pages/fe/application-dooray-calendar/latest/tutorial-example01-basic.html](https://github.nhnent.com/pages/fe/application-dooray-calendar/latest/tutorial-example01-basic.html)

## Dependency
* [tui.code-snippet: 1.2.9](https://github.com/nhnent/tui.code-snippet/releases/tag/v1.2.9)

## Tested Browsers
* Browser:
   * IE11
   * Edge
   * Chrome
   * Firefox
   * Safari

## Usage
### Use `bower`
Install the latest version using `bower` command:

```
$ bower install https://github.nhnent.com/fe/application-dooray-calendar
```


### Download
* [Download bundle files from `dist` folder](https://github.nhnent.com/fe/application-dooray-calendar/tree/production/dist)
* [Download all sources for each version](https://github.nhnent.com/fe/application-dooray-calendar/releases)

### Initialize a calendar

```javascript
var calendar = new tui.Calendar(document.getElementById('calendar'), {
    defaultView: 'week',
    taskView: true,
    template: {
        milestone: function(schedule) {
            return '<span style="color:red;"><i class="fa fa-flag"></i> ' + schedule.title + '</span>';
        },
        milestoneTitle: function() {
            return 'Milestone';
        },
        task: function(schedule) {
            return '&nbsp;&nbsp;#' + schedule.title;
        },
        taskTitle: function() {
            return '<label><input type="checkbox" />Task</label>';
        },
        allday: function(schedule) {
            return schedule.title + ' <i class="fa fa-refresh"></i>';
        },
        time: function(schedule) {
            return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
        }
    },
    month: {
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        startDayOfWeek: 0,
        narrowWeekend: true,
        workweek: false
    },
    week: {
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        panelHeights: [80, 80, 120],
        startDayOfWeek: 0,
        narrowWeekend: true,
        workweek: false
    }
});
```

### Manipulate schedules

Create schedules. Update a schedule, Delete a schedule.

#### Create schedules

```javascript
calendar.createSchedules([
    {
        id: '1',
        calendarId: '1',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-01-18T22:30:00+09:00',
        end: '2018-01-19T02:30:00+09:00'
    },
    {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-01-18T17:30:00+09:00',
        end: '2018-01-19T17:31:00+09:00',
        isReadOnly: true    // schedule is read-only
    }
]);
```

#### Update a schedule

```javascript
calendar.updateSchedule(schedule.id, schedule.calendarId, {
    start: startTime,
    end: endTime
});
```

#### Delete a schedule

```javascript
calendar.deleteSchedule(schedule.id, schedule.calendarId);
```

#### Set a schedule as read-only

`Schedule.isReadOnly` indicates a schedule's read-only attribute.

```javascript
calendar.createSchedule({
    title: 'read-only schedule',
    isReadOnly: true
});
```

### Add event handlers
Examples to add event handlers

#### 'beforeCreateSchedule'

When select time period(daily, weekly, monthly) in only AllDay, Time types

```javascript
calendar.on('beforeCreateSchedule', function(event) {
    var startTime = event.start;
    var endTime = event.end;
    var isAllDay = event.isAllDay;
    var guide = event.guide;
    var triggerEventName = event.triggerEventName;
    var schedule;

    if (triggerEventName === 'click') {
        // open writing simple schedule popup
        schedule = {...};
    } else if (triggerEventName === 'dblclick') {
        // open writing detail schedule popup
        schedule = {...};
    }

    calendar.createSchedules([schedule]);
});
```

#### 'beforeUpdateSchedule'

Update the schedule when dragging it.

```javascript
calendar.on('beforeUpdateSchedule', function(event) {
    var schedule = event.schedule;
    var startTime = event.start;
    var endTime = event.end;

    calendar.updateSchedule(schedule.id, schedule.calendarId, {
        start: startTime,
        end: endTime
    });
});
```

#### 'clickSchedule'

Open a detail schedule information or focus it

```javascript
calendar.on('clickSchedule', function(event) {
    var schedule = event.schedule;

    if (lastClickSchedule) {
        calendar.updateSchedule(lastClickSchedule.id, lastClickSchedule.calendarId, {
            isFocused: false
        });
    }
    calendar.updateSchedule(schedule.id, schedule.calendarId, {
        isFocused: true
    });

    lastClickSchedule = schedule;

    // open detail view
});
```

### Move to today/prev/next

#### Today

```javascript
calendar.today();
```

#### Prev

```javascript
calendar.prev();
```

#### Next

```javascript
calendar.next();
```

### Toggle view type

```javascript
// daily view
calendar.toggleView('day', true);

// weekly view
calendar.toggleView('week', true);

// monthly view(default 6 weeks view)
calendar.options.month.visibleWeeksCount = 6; // or null
calendar.toggleView('month', true);

// 2 weeks monthly view
calendar.options.month.visibleWeeksCount = 2;
calendar.toggleView('month', true);

// 3 weeks monthly view
calendar.options.month.visibleWeeksCount = 3;
calendar.toggleView('month', true);

// narrow weekend
calendar.options.month.narrowWeekend = true;
calendar.options.week.narrowWeekend = true;
calendar.toggleView(calendar.viewName, true);

// change start day of week(from monday)
calendar.options.month.startDayOfWeek = 1;
calendar.options.week.startDayOfWeek = 1;
calendar.toggleView(calendar.viewName, true);

// work week
calendar.options.month.workweek = true;
calendar.options.week.workweek = true;
cal.toggleView(cal.viewName, true);
```