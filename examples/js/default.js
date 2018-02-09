/* eslint no-console: 0, complexity: 0 */
'use strict';
(function(window, Calendar) {
    var cal, resizeThrottled, idx = 20;
    var baseDate = new Date(), formattedDate = tui.util.formatDate('YYYY-MM-DD', baseDate);
    var daynames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var tempHolidays = {
        6: 'Holiday',
        17: 'Holiday',
        22: 'Holiday'
    };
    var lastClickSchedule;
    // Calendar.setTimezoneOffset(540);

    cal = new Calendar('#calendar', {
        defaultView: 'month',
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
        },
        month: {
            daynames: daynames,
            moreLayerSize: {
                height: 'auto'
            },
            grid: {
                footer: {
                    height: 10
                }
            },
            visibleScheduleCount: 4
        },
        week: {
            daynames: daynames,
            panelHeights: [80, 80, 120]
        }
    });

    cal.setCalendarColor('1', {
        color: '#e8e8e8',
        bgColor: '#585858',
        render: false
    });
    cal.setCalendarColor('2', {
        color: '#282828',
        bgColor: '#dc9656',
        render: false
    });
    cal.setCalendarColor('3', {
        color: '#a16946',
        bgColor: '#ab4642',
        render: false
    });

    cal.createSchedules([
        {
            id: '1',
            calendarId: '1',
            title: 'Scrum',
            category: 'time',
            dueDateClass: '',
            start: '2018-01-18T22:30:00+09:00',
            end: '2018-01-19T02:30:00+09:00'
        },
        {
            id: '2',
            calendarId: '1',
            title: '2nd QA',
            category: 'time',
            dueDateClass: '',
            start: '2018-01-18T17:30:00+09:00',
            end: '2018-01-19T17:31:00+09:00'
        },
        {
            id: '3',
            calendarId: '2',
            title: 'meeting',
            category: 'time',
            dueDateClass: '',
            start: formattedDate + 'T11:00:00+09:00',
            end: formattedDate + 'T12:59:59+09:00'
        },
        {
            id: '4',
            calendarId: '1',
            title: 'code review',
            category: 'time',
            dueDateClass: '',
            start: formattedDate + 'T13:30:00+09:00',
            end: formattedDate + 'T15:59:59+09:00'
        },
        {
            id: '5',
            calendarId: '2',
            title: 'schedule 1',
            category: 'time',
            dueDateClass: '',
            start: formattedDate + 'T18:00:00+09:00',
            end: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '6',
            calendarId: '3',
            title: 'schedule 2',
            category: 'time',
            dueDateClass: '',
            start: formattedDate + 'T18:00:00+09:00',
            end: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '7',
            calendarId: '1',
            title: 'schedule 3',
            category: 'time',
            dueDateClass: '',
            start: formattedDate + 'T18:00:00+09:00',
            end: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '8',
            calendarId: '2',
            title: 'interview',
            category: 'allday',
            dueDateClass: '',
            start: formattedDate + 'T00:00:00+09:00',
            end: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '9',
            calendarId: '2',
            title: 'TalkDay',
            category: 'milestone',
            dueDateClass: '',
            start: formattedDate + 'T00:00:00+09:00',
            end: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '10',
            calendarId: '1',
            title: 'Publish to npm',
            category: 'task',
            dueDateClass: 'lunch',
            start: formattedDate + 'T00:00:00+09:00',
            end: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '11',
            calendarId: '1',
            title: 'Conference',
            category: 'allday',
            dueDateClass: '',
            start: formattedDate + 'T00:00:00+09:00',
            end: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '12',
            calendarId: '2',
            title: 'All Day Important schedule',
            category: 'allday',
            dueDateClass: '',
            start: formattedDate + 'T00:00:00+09:00',
            end: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '13',
            calendarId: '2',
            title: 'ReadOnly allday',
            category: 'allday',
            dueDateClass: '',
            start: formattedDate + 'T09:00:00+09:00',
            end: formattedDate + 'T13:00:00+09:00',
            isReadOnly: true
        },
        {
            id: '14',
            calendarId: '1',
            title: 'ReadOnly schedule',
            category: 'time',
            dueDateClass: '',
            start: formattedDate + 'T09:00:00+09:00',
            end: formattedDate + 'T13:00:00+09:00',
            isReadOnly: true
        }
    ]);

    cal.render();

    // event handlers
    cal.on({
        'clickSchedule': function(e) {
            var schedule = e.schedule;
            console.log('click', e);
            if (lastClickSchedule) {
                cal.updateSchedule(lastClickSchedule.id, lastClickSchedule.calendarId, {isFocused: false});
            }
            cal.updateSchedule(schedule.id, schedule.calendarId, {isFocused: true});
            lastClickSchedule = schedule;
        },
        'clickDayname': function(date) {
            console.log('clickDayname', date);
        },
        'beforeCreateSchedule': function(e) {
            var message = 'start: ' + new Date(e.start) +
                            '\nend: ' + new Date(e.end) +
                            '\nallday: ' + e.isAllDay +
                            '\nName of schedule to create:';
            var title = prompt(message);

            if (!title) {
                e.guide.clearGuideElement();
                return;
            }
            console.log(e);

            cal.createSchedules([{
                id: String(idx),
                calendarId: '',
                title: title,
                isAllDay: e.isAllDay,
                start: e.start,
                end: e.end,
                category: e.isAllDay ? 'allday' : 'time',
                dueDateClass: '',
                raw: {
                    projectCode: '123'
                }
            }]);

            idx += 1;

            console.log('select', e);
        },
        'beforeUpdateSchedule': function(e) {
            cal.updateSchedule(e.schedule.id, e.schedule.calendarId, {
                start: e.start,
                end: e.end
            });

            console.log('update', e);
        },
        'beforeDeleteSchedule': function(e) {
            console.log('delete', e);
        },
        'resizePanel': function(e) {
            console.log('resizePanel', e);
        },
        'dragStartSchedule': function(e) {
            console.log('dragStartSchedule', e);
        },
        'dragEndSchedule': function(e) {
            console.log('dragEndSchedule', e);
        }
    });

    resizeThrottled = tui.util.throttle(function() {
        cal.refresh();
    }, 50);

    window.addEventListener('resize', resizeThrottled);

    /**********
     * Control
     **********/
    function onClick(e) {
        var action = e.target.dataset.action;

        switch (action) {
            case 'move-prev':
                cal.prev();
                break;
            case 'move-next':
                cal.next();
                break;
            case 'move-today':
                cal.today();
                break;
            case 'toggle-daily':
                cal.toggleView('day');
                break;
            case 'toggle-weekly':
                cal.toggleView('week');
                break;
            case 'toggle-monthly':
                cal.options.month.visibleWeeksCount = 0;
                cal.toggleView('month', true);
                break;
            case 'toggle-weeks2':
                cal.options.month.visibleWeeksCount = 2;
                cal.toggleView('month', true);
                break;
            case 'toggle-weeks3':
                cal.options.month.visibleWeeksCount = 3;
                cal.toggleView('month', true);
                break;
            case 'toggle-narrow-weekend':
                cal.options.month.narrowWeekend = !cal.options.month.narrowWeekend;
                cal.options.week.narrowWeekend = !cal.options.week.narrowWeekend;
                cal.toggleView(cal.viewName, true);
                break;
            case 'toggle-start-day-1':
                cal.options.month.startDayOfWeek = cal.options.month.startDayOfWeek ? 0 : 1;
                cal.options.week.startDayOfWeek = cal.options.week.startDayOfWeek ? 0 : 1;
                cal.toggleView(cal.viewName, true);
                break;
            case 'toggle-workweek':
                cal.options.month.workweek = !cal.options.month.workweek;
                cal.options.week.workweek = !cal.options.week.workweek;
                cal.toggleView(cal.viewName, true);
                break;
            default:
                return;
        }

        refreshRenderRange();
    }

    function refreshRenderRange() {
        var renderRange = document.getElementById('renderRange');
        renderRange.innerHTML =
            new Date(cal.renderRange.start.getTime()).toDateString() + ' ~ '
            + new Date(cal.renderRange.end.getTime()).toDateString();
    }

    // multiple event handler
    cal.on('clickSchedule', function() {
        console.log('click');
    });

    cal.on('beforeCreateSchedule', function(e) {
        console.log('beforeCreateSchedule', e);
    });

    cal.on('beforeUpdateSchedule', function(e) {
        console.log('beforeUpdateSchedule', e);
    });

    cal.on('beforeDeleteSchedule', function(e) {
        console.log('beforeDeleteSchedule', e);
    });

    document.querySelector('.control').addEventListener('click', onClick);

    refreshRenderRange();
    window.cal = cal;

    cal.getElement('3', '2');
})(window, tui.Calendar);
