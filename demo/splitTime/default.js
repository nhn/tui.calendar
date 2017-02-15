/* eslint no-console: 0, complexity: 0 */
'use strict';
(function(window, calendar) {

    //* Only listed below formats avaliable.
    //*
    //* - YYYYMMDD
    //* - YYYY/MM/DD
    //* - YYYY-MM-DD
    //* - YYYY/MM/DD HH:mm:SS
    //* - YYYY-MM-DD HH:mm:SS
    //TODO: 해당부분 수정 요망.
    var currentDate = '2016-11-12 ';

    var calendarSet = {
        '1': {
            color: '#e8e8e8',
            bgColor: '#585858',
            render: false
        },
        '2': {
            color: '#282828',
            bgColor: '#dc9656',
            render: false
        },
        '3': {
            color: '#a16946',
            bgColor: '#ab4642',
            render: false
        }
      };

    var cal1, cal2, cal3, cal4, cal5, cal6

    cal1 = calendar.SplitTimeCalendar({
        template: {
            time: function(model) {
                console.log(model)
                return model.title + model.origin.starts + '~' + model.origin.ends;
            }
        },
        renderStartDate: currentDate + '11:00:00',
        renderEndDate: currentDate + '12:00:00',
        calendarColor: calendarSet
    }, document.getElementById('calendar1'));

    cal1.createEvents([{
        id: '1',
        calendarID: '1',
        title: '스크럼',
        category: 'time',
        dueDateClass: '',
        starts: currentDate + '09:40:00',
        ends: currentDate + '10:40:00'
    }, {
        id: '2',
        calendarID: '2',
        title: '[홍길동]연차',
        category: 'time',
        dueDateClass: '',
        starts: currentDate + '15:00:00+09:00',
        ends: currentDate + '20:40:59+09:00'
    }, {
        id: '2123',
        calendarID: '3',
        title: '[3홍길동]연차',
        category: 'time',
        dueDateClass: '',
        starts: currentDate + '16:00:00+09:00',
        ends: currentDate + '16:59:59+09:00'
    }], true);

    cal1.render();

    cal1.on('clickEvent', function (e) {
        console.log('click', e)
    });

    cal2 = calendar.SplitTimeCalendar({
        template: {
            time: function(model) {
                return model.title + model.origin.starts + '~' + model.origin.ends;
            }
        },
        renderStartDate: currentDate + '11:30:00',
        renderEndDate: currentDate + '14:00:00',
        showTimeRange: 3,
        calendarColor: calendarSet
    }, document.getElementById('calendar2'));

    cal2.createEvents([{
        id: '1',
        calendarID: '1',
        title: '스크럼',
        category: 'time',
        dueDateClass: '',
        starts: currentDate + '11:40:00',
        ends: currentDate + '13:40:00+09:00'
    }, {
        id: '2',
        calendarID: '2',
        title: '[홍길동]연차',
        category: 'time',
        dueDateClass: '',
        starts: currentDate + '09:00:00',
        ends: currentDate + '15:40:59'
    }, {
        id: '2123',
        calendarID: '3',
        title: '[3홍길동]연차',
        category: 'time',
        dueDateClass: '',
        starts: currentDate + '10:00:00',
        ends: currentDate + '20:59:59'
    }], true);

    cal2.render();

    cal3 = calendar.SplitTimeCalendar({
        template: {
            time: function(model) {
                return model.title + model.origin.starts + '~' + model.origin.ends;
            }
        },
        renderStartDate: currentDate + '11:00:00',
        renderEndDate: currentDate + '12:30:00',
        calendarColor: calendarSet
    }, document.getElementById('calendar3'));

    cal3.createEvents([{
        id: '1',
        calendarID: '1',
        title: '나오면 안돼',
        category: 'time',
        dueDateClass: '',
        starts: currentDate + '10:40:00',
        ends: currentDate + '11:40:00+09:00'
    }, {
        id: '2',
        calendarID: '2',
        title: '[홍길동]연차',
        category: 'time',
        dueDateClass: '',
        starts: currentDate + '07:00:00',
        ends: currentDate + '08:40:59'
    }, {
        id: '2123',
        calendarID: '3',
        title: '[3홍길동]연차',
        category: 'time',
        dueDateClass: '',
        starts: currentDate + '08:30:00',
        ends: currentDate + '15:59:59'
    }, {
        id: '2222',
        calendarID: '4',
        title: 'ㅎㅎ',
        category: 'time',
        dueDateClass: '',
        starts: currentDate + '12:00:00',
        ends: currentDate + '13:59:59'
    }], true);

    cal3.render();

    cal4 = calendar.FullCalendar({
        defaultView: 'week',
        template: {
            milestone: function(model) {
                return '<span style="color:red;"><i class="fa fa-flag"></i> ' + model.title + '</span>';
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
                return model.title + ' <i class="fa fa-refresh"></i><br />' + model.starts;
            }
        },
        week: {
            panelHeights: [80, 80, 120]
        }
    }, document.getElementById('calendar4'));

    cal4.setCalendarColor('1', {
        color: '#e8e8e8',
        bgColor: '#585858',
        render: false
    });
    cal4.setCalendarColor('2', {
        color: '#282828',
        bgColor: '#dc9656',
        render: false
    });
    cal4.setCalendarColor('3', {
        color: '#a16946',
        bgColor: '#ab4642',
        render: false
    });

    cal4.createEvents([{
        id: '1',
        calendarID: '1',
        title: '스크럼',
        category: 'time',
        dueDateClass: '',
        starts: '2016-11-03T09:40:00+09:00',
        ends: '2016-11-03T10:40:00+09:00'
    }, {
        id: '2',
        calendarID: '2',
        title: '[홍길동]연차',
        category: 'allday',
        dueDateClass: '',
        starts: '2016-08-17T00:00:00+09:00',
        ends: '2016-08-17T23:59:59+09:00'
    }, {
        id: '2123',
        calendarID: '1',
        title: '[3홍길동]연차',
        category: 'time',
        dueDateClass: '',
        starts: '2016-08-18T00:00:00+09:00',
        ends: '2016-08-18T23:59:59+09:00'
    }, {
        id: '1232',
        calendarID: '2',
        title: '[4홍길동]연차',
        category: 'time',
        dueDateClass: '',
        starts: '2016-08-19T00:00:00+09:00',
        ends: '2016-08-19T23:59:59+09:00'
    }, {
        id: '3',
        calendarID: '3',
        title: '테스트 마일스톤1',
        category: 'milestone',
        dueDateClass: '',
        starts: '',
        ends: '2016-08-17T23:59:59+09:00'
    }, {
        id: '4',
        calendarID: '3',
        title: '테스트 업무',
        category: 'task',
        dueDateClass: 'morning',
        starts: '',
        ends: '2016-08-17T23:59:59+09:00'
    }], true);

    cal4.render();

    window.cal1 = cal1;
    window.cal2 = cal2;
    window.cal3 = cal3;
    window.cal4 = cal4;
    window.cal5 = cal5;
    window.cal6 = cal6;

})(window, ne.dooray.calendar);
