var MiniCalendar = window.ne.dooray.calendar.service.MiniCalendar;
describe('service:view/MiniCalendar', function() {
    var mockInst;

    beforeEach(function() {
        mockInst = {
            options: {
                renderMonth: jasmine.createSpyObj('Date', ['setMonth', 'getMonth']),
                daynames: ['일', '월', '화', '수', '목', '금', '토']
            },
            render: jasmine.createSpy('render')
        };
    });

    describe('nav()', function() {

        it('can move rendered month.', function() {
            var button = document.createElement('button');
            mockInst.options.renderMonth.getMonth.and.returnValue(5);

            // click next button
            button.className = 'schedule-view-minicalendar-next';
            MiniCalendar.prototype.nav.call(mockInst, button);
            expect(mockInst.options.renderMonth.setMonth).toHaveBeenCalledWith(6);


            // click prev button
            button.className = 'schedule-view-minicalendar-prev';
            MiniCalendar.prototype.nav.call(mockInst, button);
            expect(mockInst.options.renderMonth.setMonth).toHaveBeenCalledWith(4);
        });
    });

    it('getSelectedDate() can get selected date in minicalendar', function() {
        // click date button is 2015-01-15
        var button = document.createElement('div');
        button.setAttribute('data-y', 2015);
        button.setAttribute('data-m', 0);
        button.setAttribute('data-d', 15);
        spyOn(window.ne.dooray.calendar.domutil, 'find').and.returnValue(button);

        // check result
        var actual = MiniCalendar.prototype.getSelectedDate.call({});
        expect(actual).toEqual(new Date('2015-01-15T00:00:00+09:00'));
    });

    describe('_getViewModel()', function() {
        it('create mini calendar viewmodel by Date, startDayOfWeek, today', function() {
            var renderMonth = new Date('2015-09-01T00:00:00+09:00');
            var today = new Date('2015-10-02T11:36:00+09:00');

            // September!
            var actual = MiniCalendar.prototype._getViewModel.call(mockInst, renderMonth, 0, today);
            expect(actual).toEqual({
                title: '2015.09',
                dayname: jasmine.any(Array),
                startDayOfWeek: 0,
                calendar: jasmine.any(Array)
            });

            // 8/30 is previous date
            expect(actual.calendar[0][0]).toEqual({
                y: 2015,
                m: 7,
                d: 30,
                isOtherDate: true,
                weekend: true
            });

            // autoselect 9/1 because it first date of september
            expect(actual.calendar[0][2].focused).toBe(true);

            // 10/2 is next month. no autoselect
            expect(actual.calendar[4][5].focused).not.toBeDefined();
        });

        it('when today included render month then autoselect today', function() {
            var renderMonth = new Date('2015-09-01T00:00:00+09:00');
            var today = new Date('2015-09-02T11:36:00+09:00');
            var actual = MiniCalendar.prototype._getViewModel.call(mockInst, renderMonth, 0, today);

            expect(actual.calendar[0][3].focused).toBe(true);
        });

        it('when supplied events data then add to date.', function() {
            var renderMonth = new Date('2015-09-01T00:00:00+09:00');
            var today = new Date('2015-09-02T11:36:00+09:00');
            var events = ['2015-09-03'];
            var actual = MiniCalendar.prototype._getViewModel.call(mockInst, renderMonth, 0, today, events);

            expect(actual.calendar[0][4].hasEvents).toBe(true);
        });
    });
});
