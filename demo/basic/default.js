'use strict';
(function(window, calendar) {
    var cal, resizeThrottled;

    cal = window.cal = calendar.OriginCalendar({
        defaultView: 'month',
        events: [{
            title: 'A',
            isAllDay: true,
            starts: '2016-08-15T00:00:00+09:00',
            ends: '2016-08-17T23:59:59+09:00'
        }, {
            title: 'B',
            isAllDay: true,
            starts: '2016-08-17T00:00:00+09:00',
            ends: '2016-08-17T23:59:59+09:00'
        }, {
            title: 'C',
            isAllDay: true,
            starts: '2016-08-15T09:00:00+09:00',
            ends: '2016-08-17T10:00:00+09:00'
        }, {
            title: 'D',
            isAllDay: false,
            starts: '2016-08-17T09:00:00+09:00',
            ends: '2016-08-17T10:00:00+09:00'
        }, {
            title: 'E',
            isAllDay: false,
            starts: '2016-08-17T11:00:00+09:00',
            ends: '2016-08-17T12:00:00+09:00'
        }, {
            title: 'F',
            isAllDay: false,
            starts: '2016-08-17T13:00:00+09:00',
            ends: '2016-08-17T14:00:00+09:00'
        }]
    }, document.getElementById('calendar'));

    cal.on({
        'beforeCreateEvent': function(e) {
            e.title = prompt('name of new event');
            if (e.title) {
                cal.createEvents([e]);
            }
        }
    });

    /**********
     * Control
     **********/
    function onClick(e) {
        var action = calendar.domutil.getData(e.target, 'action');

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

    calendar.domevent.on(document.querySelector('.control'), 'click', onClick);

    resizeThrottled = tui.util.throttle(function() {
        cal.refresh();
    }, 50);

    window.addEventListener('resize', resizeThrottled);
})(window, ne.dooray.calendar);
