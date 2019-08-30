import Calendar, { ISchedule, IEventObject } from 'tui-calendar';

const querySelectorEl = document.querySelector('#div') ||
  document.getElementById('div') ||
  document.createElement('div') ||
  '#cal';

const calendar = new Calendar(querySelectorEl, {
    defaultView: 'week',
    taskView: true,
    scheduleView: ['allday', 'time'],
    template: {
        milestoneTitle() {
            return 'Milestone';
        },
        milestone(schedule: ISchedule) {
            return `<span style="color: red;">${schedule.title}</span>`;
        },
        taskTitle() {
            return 'Task';
        },
        task(schedule: ISchedule) {
            return `$nbsp;#${schedule.title}`;
        },
        alldayTitle() {
            return 'All Day';
        },
        allday(schedule: ISchedule) {
            return `<span style="color: blue;">${schedule.title}</span>`;
        },
        time(schedule: ISchedule) {
            return `${schedule.title}(${schedule.start})`;
        },
        goingDuration(model: ISchedule) {
            const SIXTY_MINUTES:number = 60;
            const goingDuration = model.goingDuration || 0;
            const hour = parseInt('1000', 10);
            const minutes = goingDuration % SIXTY_MINUTES;

            return `GoingTime ${hour}:${minutes}`;
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
        visibleWeeksCount: 6,
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
            return Boolean(schedule.title);
        }
    },
    useCreationPopup: false,
    useDetailPopup: false,
    disableDblClick: true,
    disableClick: false,
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
        end: '2018-10-31T12:30:00+09:00',
        raw: {
          hasTest: true,
          name: 'string name',
          info: {
            age: 10
          },
          child: 3
        }
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
    'common.today.color': '#135de6',

    // creation guide style
    'common.creationGuide.backgroundColor': 'rgba(19, 93, 230, 0.1)',
    'common.creationGuide.border': '1px solid #135de6',

    // month header 'dayname'
    'month.dayname.height': '42px',
    'month.dayname.borderLeft': 'none',
    'month.dayname.paddingLeft': '8px',
    'month.dayname.paddingRight': '0',
    'month.dayname.fontSize': '13px',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',

    // month day grid cell 'day'
    'month.holidayExceptThisMonth.color': '#f3acac',
    'month.dayExceptThisMonth.color': '#bbb',
    'month.weekend.backgroundColor': '#fafafa',
    'month.day.fontSize': '16px',

    // month schedule style
    'month.schedule.height': '18px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '10px',
    'month.schedule.marginRight': '10px',

    // month more view
    'month.moreView.boxShadow': 'none',
    'month.moreView.paddingBottom': '0',
    'month.moreViewTitle.height': '28px',
    'month.moreViewTitle.marginBottom': '0',
    'month.moreViewTitle.backgroundColor': '#f4f4f4',
    'month.moreViewTitle.borderBottom': '1px solid #ddd',
    'month.moreViewTitle.padding': '0 10px',
    'month.moreViewList.padding': '10px',

    // week header 'dayname'
    'week.dayname.height': '41px',
    'week.dayname.borderTop': '1px solid #ddd',
    'week.dayname.borderBottom': '1px solid #ddd',
    'week.dayname.borderLeft': '1px solid #ddd',
    'week.dayname.paddingLeft': '5px',
    'week.dayname.backgroundColor': 'inherit',
    'week.dayname.textAlign': 'left',
    'week.today.color': '#135de6',
    'week.pastDay.color': '#999',

    // week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #ddd',
    'week.vpanelSplitter.height': '3px',

    // week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #ddd',

    'week.daygridLeft.width': '77px',
    'week.daygridLeft.backgroundColor': '',
    'week.daygridLeft.paddingRight': '5px',
    'week.daygridLeft.borderRight': '1px solid #ddd',

    'week.today.backgroundColor': 'inherit',
    'week.weekend.backgroundColor': 'inherit',

    // week timegrid 'timegrid'
    'week.timegridLeft.width': '77px',
    'week.timegridLeft.backgroundColor': '#fafafa',
    'week.timegridLeft.borderRight': '1px solid #ddd',
    'week.timegridLeft.fontSize': '12px',
    'week.timegridLeftTimezoneLabel.height': '51px',
    'week.timegridLeftAdditionalTimezone.backgroundColor': '#fdfdfd',

    'week.timegridOneHour.height': '48px',
    'week.timegridHalfHour.height': '24px',
    'week.timegridHalfHour.borderBottom': '1px dotted #f9f9f9',
    'week.timegridHorizontalLine.borderBottom': '1px solid #eee',

    'week.timegrid.paddingRight': '10px',
    'week.timegrid.borderRight': '1px solid #ddd',
    'week.timegridSchedule.borderRadius': '0',
    'week.timegridSchedule.paddingLeft': '0',

    'week.currentTime.color': '#135de6',
    'week.currentTime.fontSize': '12px',
    'week.currentTime.fontWeight': 'bold',

    'week.pastTime.color': '#999',
    'week.pastTime.fontWeight': 'normal',

    'week.futureTime.color': '#333',
    'week.futureTime.fontWeight': 'normal',

    'week.currentTimeLinePast.border': '1px solid rgba(19, 93, 230, 0.3)',
    'week.currentTimeLineBullet.backgroundColor': '#135de6',
    'week.currentTimeLineToday.border': '1px solid #135de6',
    'week.currentTimeLineFuture.border': '1px solid #135de6',

    // week creation guide style
    'week.creationGuide.color': '#135de6',
    'week.creationGuide.fontSize': '12px',
    'week.creationGuide.fontWeight': 'bold',

    // week daygrid schedule style
    'week.dayGridSchedule.borderRadius': '0',
    'week.dayGridSchedule.height': '18px',
    'week.dayGridSchedule.marginTop': '2px',
    'week.dayGridSchedule.marginLeft': '10px',
    'week.dayGridSchedule.marginRight': '10px'
};

calendar.setTheme(theme);
calendar.today();
calendar.toggleSchedules('Major Lecture', false, true);
calendar.toggleScheduleView(true);
calendar.updateSchedule('1', 'Major Lecture', {
    title: 'Digital Design'
});

calendar.on('beforeUpdateSchedule', (scheduleData: IEventObject) => {
    const {schedule, start, end} = scheduleData;

    if (schedule.id && schedule.calendarId) {
        calendar.updateSchedule(schedule.id, schedule.calendarId, {
            start,
            end
        });
    }
});

calendar.on({
    afterRenderSchedule(schedule) {
        console.log('afterRenderSchedule: ', schedule);
    },
    beforeCreateSchedule(schedule) {
        console.log('beforeCreateSchedule: ', schedule);
    },
    beforeDeleteSchedule(eventSechedule) {
        console.log('beforeDeleteSchedule: ', eventSechedule);
    },
    beforeUpdateSchedule(e) {
        console.log('beforeUpdateSchedule : ', e);
    },
    clickDayname(date) {
        console.log('clickDayname : ', date)
    },
    clickMore(e) {
        console.log('clickMore : ', e);
    },
    clickSchedule(e) {
        console.log('clickSchedule : ', e);
    },
    clickTimezonesCollapseBtn(isCollapse) {
        console.log('clickTimezonesCollapseBtn', isCollapse);
    }
});

