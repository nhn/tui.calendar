/* eslint no-console: 0, complexity: 0 */
'use strict';
(function(window, FullCalendar) {
    var cal, resizeThrottled, idx = 20;
    var baseDate = new Date(), formattedDate = tui.util.formatDate('YYYY-MM-DD', baseDate);
    var daynames = [
        '일',
        '월',
        '화',
        '수',
        '목',
        '금',
        '토'
    ];
    var lastClickScheduleModel;
    // FullCalendar.setTimezoneOffset(540);

    cal = new FullCalendar({
        defaultView: 'week',
        taskView: true,
        template: {
            milestone: function(model) {
                return '<span style="color:red;"><i class="fa fa-flag"></i> ' + model.title + '</span>';
            },
            milestoneTitle: function() {
                return '마일스톤';
            },
            task: function(model) {
                return '&nbsp;&nbsp;#' + model.title;
            },
            taskTitle: function() {
                return '<label><input type="checkbox" /> 업무</label>';
            },
            allday: function(model) {
                return model.title + ' <i class="fa fa-refresh"></i>';
            },
            time: function(model) {
                return model.title + ' <i class="fa fa-refresh"></i>' + model.starts;
            }
        },
        month: {
            daynames: daynames
        },
        week: {
            daynames: daynames,
            panelHeights: [80, 80, 120]
        }
    }, document.getElementById('calendar'));

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
            title: '스크럼',
            category: 'time',
            dueDateClass: '',
            starts: '2018-01-18T22:30:00+09:00',
            ends: '2018-01-19T02:30:00+09:00'
        },
        {
            id: '2',
            calendarId: '1',
            title: '2차 QA',
            category: 'time',
            dueDateClass: '',
            starts: '2018-01-18T17:30:00+09:00',
            ends: '2018-01-19T17:31:00+09:00'
        },
        {
            id: '3',
            calendarId: '2',
            title: '[추가 추가 일정]',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T18:00:00+09:00',
            ends: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '4',
            calendarId: '2',
            title: '[추가 추가 일정]',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T18:00:00+09:00',
            ends: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '5',
            calendarId: '2',
            title: '[추가 추가 일정]',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T18:00:00+09:00',
            ends: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '6',
            calendarId: '2',
            title: '[추가 추가 일정]',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T18:00:00+09:00',
            ends: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '7',
            calendarId: '2',
            title: '[추가 추가 일정]',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T18:00:00+09:00',
            ends: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '8',
            calendarId: '2',
            title: '[종일일정입니다!]',
            category: 'allday',
            dueDateClass: '',
            starts: formattedDate + 'T00:00:00+09:00',
            ends: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '9',
            calendarId: '2',
            title: '[추가 추가 일정]',
            category: 'milestone',
            dueDateClass: '',
            starts: formattedDate + 'T00:00:00+09:00',
            ends: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '10',
            calendarId: '2',
            title: '테스트 업무',
            category: 'task',
            dueDateClass: 'lunch',
            starts: formattedDate + 'T00:00:00+09:00',
            ends: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '11',
            calendarId: '2',
            title: '[종일일정입니다2!]',
            category: 'allday',
            dueDateClass: '',
            starts: formattedDate + 'T00:00:00+09:00',
            ends: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '12',
            calendarId: '2',
            title: '[종일일정입니다3!]',
            category: 'allday',
            dueDateClass: '',
            starts: formattedDate + 'T00:00:00+09:00',
            ends: formattedDate + 'T00:00:00+09:00'
        }
    ]);

    cal.render();

    // 일정 클릭 이벤트 핸들러
    cal.on({
        'clickSchedule': function(e) {
            var model = e.model;
            console.log('click', e);
            if (lastClickScheduleModel) {
                cal.updateSchedule(lastClickScheduleModel.id, lastClickScheduleModel.calendarId, {isFocused: false});
            }
            cal.updateSchedule(model.id, model.calendarId, {isFocused: true});
            lastClickScheduleModel = model;
        },
        'clickDayname': function(date) {
            console.log('clickDayname', date);
        },
        'beforeCreateSchedule': function(e) {
            var message = 'start: ' + new Date(e.starts) +
                            '\nend: ' + new Date(e.ends) +
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
                starts: e.starts,
                ends: e.ends,
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
            cal.updateSchedule(e.model.id, e.model.calendarId, {
                starts: e.starts,
                ends: e.ends
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
            default:
                return;
        }
    }


    // 일정 클릭 이벤트 핸들러
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

    window.cal = cal;
})(window, tui.FullCalendar);
