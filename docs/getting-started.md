# Getting Started

## Install

```sh
npm install --save tui-calendar
```

## Calendar

### HTML

Place a `<div></div>` where you want TOAST UI Calendar rendered.

```html
<body>
...
<div id="calendar" style="height: 800px;"></div>
...
</body>
```

### javascript

Initialize the Calendar class with given element to make an Calendar.

```javascript
var Calendar = require('tui-calendar'); /* CommonJS */
```

```javascript
import Calendar from 'tui-calendar'; /* ES6 */
```

Then you can create a calendar instance with [options](https://nhnent.github.io/tui.calendar/latest/global.html#Options) to set configuration.

```javascript
var calendar = new Calendar('#calendar', {
  defaultView: 'month',
  taskView: true,
  template: {
    monthGridHeader: function(model) {
      var date = new Date(model.date);
      var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
      return template;
    }
  }
});
```

## Usage

### Manipulate schedules

Create schedules. Update a schedule, Delete a schedule.

Find out `Schedule` object in [here](https://nhnent.github.io/tui.calendar/latest/global.html#Schedule)

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

    // focus the schedule
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

### Calendar options

Find out more options in [here](https://nhnent.github.io/tui.calendar/latest/global.html#Options)

```js
var calendar = new Calendar('#calendar', {
    ...
    month: {
        daynames: daynames,
        moreLayerSize: {
            height: 'auto'
        },
        grid: {
            header: {
                header: 34
            },
            footer: {
                height: 10
            }
        },
        narrowWeekend: true,
        startDayOfWeek: 1, // monday
        visibleWeeksCount: 3,
        visibleScheduleCount: 4
    },
    week: {
        daynames: daynames,
        panelHeights: [80, 80, 120],
        narrowWeekend: true,
        startDayOfWeek: 1 // monday
        alldayViewType: 'toggle' // default: scroll
    }
```


### Template(Customize UI)

You can add various template functions with Calendar constructor options.

```js
var calendar = new Calendar('#calendar', {
    ...
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
        alldayTitle: function() {
            return 'All Day';
        },
        time: function(schedule) {
            return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
        },
        monthMoreTitleDate: function(date) {
            date = new Date(date);
            return tui.util.formatDate('MM-DD', date) + '(' + daynames[date.getDay()] + ')';
        },
        monthMoreClose: function() {
            return '<i class="fa fa-close"></i>';
        },
        monthGridHeader: function(model) {
            var date = new Date(model.date);
            var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
            var today = model.isToday ? 'TDY' : '';
            if (today) {
                template += '<span class="tui-full-calendar-weekday-grid-date-decorator">' + today + '</span>';
            }
            if (tempHolidays[date.getDate()]) {
                template += '<span class="tui-full-calendar-weekday-grid-date-title">' + tempHolidays[date.getDate()] + '</span>';
            }
            return template;
        },
        monthGridHeaderExceed: function(hiddenSchedules) {
            return '<span class="calendar-more-schedules">+' + hiddenSchedules + '</span>';
        },

        monthGridFooter: function() {
            return '<div class="calendar-new-schedule-button">New Schedule</div>';
        },

        monthGridFooterExceed: function(hiddenSchedules) {
            return '<span class="calendar-footer-more-schedules">+ See ' + hiddenSchedules + ' more events</span>';
        },
        weekDayname: function(dayname) {
            return '<span class="calendar-week-dayname-name">' + dayname.dayName + '</span><br><span class="calendar-week-dayname-date">' + dayname.date + '</span>';
        },
        monthDayname: function(dayname) {
            return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        }
    }
});
```
