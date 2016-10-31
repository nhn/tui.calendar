/* eslint no-console: 0, complexity: 0 */
'use strict';
(function(window, calendar) {
    var cal, resizeThrottled,
      idx = 5;

    cal = calendar.SplitCalendar({
        defaultView: 'day',
        template: {
            time: function(model) {
                return model.title + ' <i class="fa fa-refresh"></i><br />' + model.starts;
            }
        },
        week: {
            panelHeights: [80, 80, 120],
            hourStart: 8,
            hourEnd: 12,
            renderStartDate: '2016-10-31T09:40:00+09:00',
            renderEndDate: '2016-10-31T12:40:00+09:00'
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

    cal.createEvents([{
        id: '1',
        calendarID: '1',
        title: '스크럼',
        category: 'time',
        dueDateClass: '',
        starts: '2016-10-31T09:40:00+09:00',
        ends: '2016-10-31T10:40:00+09:00'
    }, {
        id: '2',
        calendarID: '2',
        title: '[홍길동]연차',
        category: 'time',
        dueDateClass: '',
        starts: '2016-10-31T00:00:00+09:00',
        ends: '2016-10-31T10:40:59+09:00'
    }, {
        id: '2123',
        calendarID: '3',
        title: '[3홍길동]연차',
        category: 'time',
        dueDateClass: '',
        starts: '2016-10-31T16:00:00+09:00',
        ends: '2016-10-31T16:59:59+09:00'
    }], true);

    cal.render();

     //일정 클릭 이벤트 핸들러
    cal.on({
        'resizePanel': function(e) {
            console.log('resizePanel', e);
        }
    });
    //
    //resizeThrottled = tui.util.throttle(function() {
    //    cal.refresh();
    //}, 50);
    //
    //window.addEventListener('resize', resizeThrottled);
    window.cal = cal;
})(window, ne.dooray.calendar);
