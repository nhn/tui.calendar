/* eslint no-console: 0, complexity: 0 */
'use strict';
(function(window, calendar) {
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
    var lastClickEventModel;
    // calendar.setTimezoneOffset(540);

    cal = calendar.FullCalendar({
        defaultView: 'day',
        isDoorayView: true,
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

    cal.createEvents([
        {
            id: '1',
            calendarId: '1',
            title: '스크럼',
            category: 'time',
            dueDateClass: '',
            starts: '2017-04-05T22:30:00+09:00',
            ends: '2017-04-06T02:30:00+09:00'
        },
        {
            id: '2',
            calendarId: '1',
            title: '2차 QA',
            category: 'time',
            dueDateClass: '',
            starts: '2017-04-06T17:30:00+09:00',
            ends: '2017-04-07T17:31:00+09:00'
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
            title: '[추가 추가 일정2]',
            category: 'milestone',
            dueDateClass: '',
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
        'clickEvent': function(e) {
            var model = e.model;
            console.log('click', e);
            if (lastClickEventModel) {
                cal.updateEvent(lastClickEventModel.id, lastClickEventModel.calendarId, {isFocused: false});
            }
            cal.updateEvent(model.id, model.calendarId, {isFocused: true});
            lastClickEventModel = model;
        },
        'clickDayname': function(date) {
            console.log('clickDayname', date);
        },
        'beforeCreateEvent': function(e) {
            var message = 'start: ' + new Date(e.starts) +
                            '\nend: ' + new Date(e.ends) +
                            '\nallday: ' + e.isAllDay +
                            '\nName of event to create:';
            var title = prompt(message);

            if (!title) {
                e.guide.clearGuideElement();
                return;
            }
            console.log(e);

            cal.createEvents([{
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
        'beforeUpdateEvent': function(e) {
            cal.updateEvent(e.model.id, e.model.calendarId, {
                starts: e.starts,
                ends: e.ends
            });

            console.log('update', e);
        },
        'beforeDeleteEvent': function(e) {
            console.log('delete', e);
        },
        'resizePanel': function(e) {
            console.log('resizePanel', e);
        },
        'dragStartEvent': function(e) {
            console.log('dragStartEvent', e);
        },
        'dragEndEvent': function(e) {
            console.log('dragEndEvent', e);
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
            case 'toggle-day':
                cal.toggleView('day');
                break;
            case 'toggle-week':
                cal.toggleView('week');
                break;
            case 'toggle-month':
                cal.toggleView('month');
                break;
            default:
                return;
        }
    }


    // 일정 클릭 이벤트 핸들러
    cal.on('clickEvent', function() {
        console.log('click');
    });

    cal.on('beforeCreateEvent', function(e) {
        console.log('beforeCreateEvent', e);
    });

    cal.on('beforeUpdateEvent', function(e) {
        console.log('beforeUpdateEvent', e);
    });

    cal.on('beforeDeleteEvent', function(e) {
        console.log('beforeDeleteEvent', e);
    });

    document.querySelector('.control').addEventListener('click', onClick);

    window.cal = cal;
})(window, ne.dooray.calendar);
