'use strict';

/*eslint-disable*/

var ScheduleList = [];

var SCHEDULE_CATEGORY = [
    'milestone',
    'task'
    // 'allday',
    // 'time'
];

function ScheduleInfo() {
    this.id = null;
    this.calendarId = null;

    this.title = null;
    this.isAllday = false;
    this.start = null;
    this.end = null;
    this.category = '';
    this.dueDateClass = '';

    this.color = null;
    this.bgColor = null;
    this.borderColor = null;
    this.customStyle = '';

    this.isFocused = false;
    this.isPending = false;
    this.isVisible = true;
    this.isReadOnly = false;

    this.raw = {
        memo: '',
        hasToOrCc: false,
        hasRecurrenceRule: false,
        location: null,
        class: 'public', // or 'private'
        creator: {
            name: '',
            avatar: '',
            company: '',
            email: '',
            phone: ''
        }
    };
}

function generateTime(schedule, renderStart, renderEnd) {
    var baseDate = new Date(renderStart);
    var singleday = chance.bool({likelihood: 70});
    var startDate = moment(renderStart.getTime())
    var endDate = moment(renderEnd.getTime());
    var diffDate = endDate.diff(startDate, 'days');


    schedule.isAllday = chance.bool({likelihood: 30});
    if (schedule.isAllday) {
        schedule.category = 'allday';
    } else if (chance.bool({likelihood: 30})) {
        schedule.category = SCHEDULE_CATEGORY[chance.integer({min: 0, max: 1})];
        if (schedule.category === SCHEDULE_CATEGORY[1]) {
            schedule.dueDateClass = 'morning';
        }
    } else {
        schedule.category = 'time';
    }

    startDate.add(chance.integer({min: 0, max: diffDate}), 'days');
    startDate.hours(chance.integer({min: 0, max: 23}))
    startDate.minutes(chance.bool() ? 0 : 30);
    schedule.start = startDate.toDate();

    endDate = moment(startDate);
    if (schedule.isAllday) {
        endDate.add(chance.integer({min: 0, max: 3}), 'days');
    }

    schedule.end = endDate
        .add(chance.integer({min: 1, max: 4}), 'hour')
        .toDate();
}

function generateRandomSchedule(calendar, renderStart, renderEnd) {
    var schedule = new ScheduleInfo();

    schedule.id = chance.guid();
    schedule.calendarId = calendar.id;

    schedule.title = chance.sentence({words: 3});
    schedule.isReadOnly = chance.bool({likelihood: 20});
    generateTime(schedule, renderStart, renderEnd);

    schedule.color = calendar.textColor;
    schedule.bgColor = calendar.bgColor;
    schedule.borderColor = calendar.borderColor;

    if (schedule.category === 'milestone') {
        schedule.bgColor = 'transparent';
        schedule.borderColor = 'transparent';
    }

    schedule.raw.memo = chance.sentence();
    schedule.raw.hasToOrCc = chance.bool({likelihood: 70});
    schedule.raw.hasRecurrenceRule = chance.bool({likelihood: 20});
    schedule.raw.location = chance.address();
    schedule.raw.class = chance.bool({likelihood: 10}) ? 'private' : 'public';
    schedule.raw.creator.name = chance.name();
    schedule.raw.creator.avatar = chance.avatar();
    schedule.raw.creator.company = chance.company();
    schedule.raw.creator.email = chance.email();
    schedule.raw.creator.phone = chance.phone();

    ScheduleList.push(schedule);
}

function generateSchedule(viewName, renderStart, renderEnd) {
    ScheduleList = [];
    CalendarList.forEach(function(calendar) {
        var i = 0, length = 10;
        if (viewName === 'month') {
            length = 15;
        } else if (viewName === 'day') {
            length = 4;
        }
        for (; i < length; i += 1) {
            generateRandomSchedule(calendar, renderStart, renderEnd);
        }
    });
}
