import Calendar from 'tui-calendar';

const querySelectorEl = document.querySelector('#div');
const elementByIdEl = document.getElementById('div');
const createEl = document.createElement('div');
const stringEl = '#div';

const calendar = new Calendar(stringEl, {
    defaultView: 'week',
    taskView: true,
    scheduleView: ['allday', 'time'],
    template: {
        milestoneTitle() {
            return 'Milestone';
        },
        milestone(schedule) {
            return `<span style="color: red;">${schedule.title}</span>`;
        },
        taskTitle() {
            return 'Task';
        },
        task(schedule) {
            return `$nbsp;#${schedule.title}`;
        },
        alldayTitle() {
            return 'All Day';
        },
        allday(schedule) {
            return `<span style="color: blue;">${schedule.title}</span>`;
        },
        time(schedule) {
            return `${schedule.title}(${schedule.start})`;
        }
    },
    week: {
        startDayOfWeek: 0,
        narrowWeekend: true,
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    month: {
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        startDayOfWeek: 0,
        visibleWeeksCount: true,
        isAlways6Week: true,
        workweek: true,
        moreLayerSize: {
            width: '200px',
            height: '150px'
        },
        grid: {
            header: {
                height: 50
            }
        },
        scheduleFilter(schedule) {
            return schedule.title;
        }
    },
    useCreationPopup: false,
    useDetailPopup: false,
    disableDblClick: true,
    isReadOnly: true
});

calendar.changeView('month');
calendar.clear(true);
calendar.createSchedules([
    {
        id: '1',
        calendarId: 'Major Lecture',
        title: 'Data Structure',
        category: 'time',
        start: '2018-10-31T10:30:00+09:00',
        end: '2018-10-31T12:30:00+09:00'
    },
    {
        id: '2',
        calendarId: 'General Lecture',
        title: 'Health and Nutrition',
        category: 'time',
        dueDateClass: '',
        start: '2018-10-31T14:30:00+09:00',
        end: '2018-10-31T16:30:00+09:00',
        isReadOnly: true
    }
]);
calendar.deleteSchedule('1', 'Major Lecture');
calendar.destroy();
calendar.getDate();
calendar.getDateRangeEnd();
calendar.getDateRangeStart();
calendar.getElement('1', 'Major Lecture');
calendar.getOptions();
calendar.getSchedule('1', 'Major Lecture');
calendar.getViewName();
calendar.hideMoreView();
calendar.next();
calendar.openCreationPopup({
    id: '3',
    calendarId: 'Major Legture',
    title: 'Algorithm',
    category: 'task',
    dueDateClass: 'major',
    start: '2018-10-31T10:30:00+09:00',
    end: '2018-10-31T12:30:00+09:00'
});
calendar.prev();
calendar.render();
calendar.scrollToNow();
calendar.setCalendarColor('1', {
    color: '#f00',
    bgColor: '#0f0',
    borderColor: '#00f'
}, false);
calendar.setCalendars([
    {
        id: 'Major Lecture',
        name: 'Birthdays',
        color: '#ffffff',
        bgColor: '#ffbb3b',
        dragBgColor: '#ffbb3b',
        borderColor: '#ffbb3b'
    }
]);
calendar.setDate('2018-01-01');
calendar.setDate(new Date());
calendar.setOptions({
    taskView: ['milestone', 'task']
}, true);

const theme = {
    'common.border': '1px solid #ddd',
    'common.backgroundColor': 'white',
    'common.holiday.color': '#f54f3d',
    'common.saturday.color': '#333',
    'common.dayname.color': '#333',
    'common.today.123': '123'
};

calendar.setTheme(theme);
calendar.today();
calendar.toggleSchedules('Major Lecture', false, true);
calendar.toggleScheduleView(true);
calendar.updateSchedule('1', 'Major Lecture', {
    title: 'Digital Design'
});

calendar.on('beforeUpdateSchedule', scheduleData => {
    const {schedule, start, end} = scheduleData;

    calendar.updateSchedule(schedule.id, schedule.calendarId, {
        start,
        end
    });
});

calendar.on({
    clickMore(e) {
        console.log('clickMore : ', e);
    },
    clickSchedule(e) {
        console.log('clickSchedule : ', e);
    },
    clickDayname(date) {
        console.log('clickDayname : ', date)
    }
});

