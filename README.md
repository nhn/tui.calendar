# dooray-calendar

## API documentation.

### Usage

#### Calendar Component

```javascript
var calendar = ne.dooray.calendar.ViewFactory({
    defaultView: 'week',
    week: {
        renderStartDate: '2015-09-11',
        renderEndDate: '2015-09-17'
    },
    month: {
        renderMonth: '2015-09'
    },
    timeline: {},
    events: []
}, document.getElementById('div'));

calendar.changeView('month');
calendar.changeView('week');


// CRUD
calendar.controller.events.find(function(event) {
    // return event.isAllday;
    return event.startsAt < new Date('2015-08-01');
});
calendar.controller.createEvent({
    title: '주간회의',
    isAllDay: false,
    starts: '2015-05-01T09:30:00+09:00',
    ends: '2015-05-01T10:00:00+09:00'
});
calendar.controller.updateEvent('{eventID}', {
    title: '주간회의 - 2차'
});
calendar.controller.deleteEvent('{eventID}');


// Event binding.
calendar.on({
    'event:beforeCreate': function(data) {
        return false;    // cancel create event actions.
    },
    'event:afterCreate': function() {
    },


    'event:beforeUpdate': function() {},
    'event:afterUpdate': function() {},

    'event:beforeDelete': function() {},
    'event:afterDelete': function() {},

    'event:click': function(model) {
        // 입력 양식 채우기
        updateEventForm.fill(model.parameterize());

        updateEventForm.show();    // 미정 (부모 엘리먼트를 토글할수도 있음)
        updateEventForm.hide();
    },
    'event:mouseover': function() {},
    'event:mouseout': function() {}
});
```

#### Create Event Form Component

```javascript
var createEventForm = ne.dooray.calendar.FormFactory('Create', {
}, document.getElementById('create-event'));

createEventForm.on({
    'success': function() {},
    'fail': function() {},
    'complete': function() {}
});

createEventForm.on('submit', function(data) {
    console.log(data.title);    // '캘린더 회의'
    calendar.controller.createEvent(data);
});

```

#### Update Event Form Component

```javascript
var updateEventForm = ne.dooray.calendar.FormFactory('Update', {
}, document.getElementById('update-event'));

// 폼 채우기
updateEventForm.fill({
    title: '주간회의',
    isAllday: false,
    starts: '2015-05-01T09:30:00+09:00',
    ends: '2015-05-01T10:00:00+09:00'
});

updateEventForm.on({
    'success': function(e) {},
    'fail': function(e) {
        e.resultCode;    // '1366' ... etc.
    },
    'complete': function(e) {
        calendar.render();
    }
});
```

## contribution guide

- Don't use browserify require() outside of source codes. (test, service code, etc...)
- Don't use bower modules.
- Prefer factory pattern rather than OOP.

