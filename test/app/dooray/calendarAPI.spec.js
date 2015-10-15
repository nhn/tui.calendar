var calendarAPI = window.ne.dooray.calendar.service.calendarAPI;
var undef = (function() {})();
describe('service/calendarAPI', function() {
    var ajaxSpy;

    beforeEach(function() {
        spyOn(window.ne.dooray.calendar.AJAX.prototype, 'ajax');
        ajaxSpy = window.ne.dooray.calendar.AJAX.prototype.ajax;
    });

    it('getCalendars()', function() {
        calendarAPI.getCalendars('123');

        expect(ajaxSpy).toHaveBeenCalledWith(
            '/wapi/task-tracker/projects/123/calendars',
            {}
        );

        calendarAPI.getCalendars();

        expect(ajaxSpy).toHaveBeenCalledWith(
            '/wapi/task-tracker/projects/*/calendars',
            {}
        )
    });

    it('postCalendars()', function() {
        calendarAPI.postCalendars('123', {hello: 'world'});

        expect(ajaxSpy).toHaveBeenCalledWith(
            '/wapi/task-tracker/projects/123/calendars',
            {
                method: 'POST',
                data: '[{"hello":"world"}]'
            }
        );
    });

    describe('getCalendarTasks()', function() {
        it('bug 프로젝트 내 \'1\' 캘린더의 2015년 1월 일정', function() {
            calendarAPI.getCalendarTasks(
                'bug', 
                '1', 
                '', 
                '2015-02-01T00:00:00+09:00'
            );

            expect(ajaxSpy).toHaveBeenCalledWith(
                '/wapi/task-tracker/projects/bug/calendars/1/tasks?calendars=&timeMin=&timeMax=2015-02-01T00:00:00+09:00',
                {}
            );
        });

        it('모든 프로젝트 내 1, 2, 3 캘린더의 1월 일정', function() {
            calendarAPI.getCalendarTasks(
                '*', 
                '1, 2, 3', 
                '', 
                '2015-02-01T00:00:00+09:00'
            );

            expect(ajaxSpy).toHaveBeenCalledWith(
                '/wapi/task-tracker/projects/*/calendars/*/tasks?calendars=1,2,3&timeMin=&timeMax=2015-02-01T00:00:00+09:00',
                {}
            );
            
        });
    });
});
