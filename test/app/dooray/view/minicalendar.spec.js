var MiniCalendar = window.ne.dooray.calendar.MiniCalendar;
var undef = (function() {})();
describe('service:view/MiniCalendar', function() {
    var mockInst;

    beforeEach(function() {
        mockInst = {
            options: {
                renderMonth: jasmine.createSpyObj('Date', ['setMonth', 'getMonth']),
                daynames: ['일', '월', '화', '수', '목', '금', '토']
            },
            hlData: {},
            render: jasmine.createSpy('render'),
            getSelectedDate: jasmine.createSpy('getSelectedDate'),
            fire: jasmine.createSpy('fire')
        };
    });

    describe('_nav()', function() {
        it('can move rendered month.', function() {
            var button = document.createElement('button');
            mockInst.options.renderMonth.getMonth.and.returnValue(5);

            // click next button
            button.className = '/* @echo CSS_PREFIX */minicalendar-next';
            MiniCalendar.prototype._nav.call(mockInst, button);
            expect(mockInst.options.renderMonth.setMonth).toHaveBeenCalledWith(6);


            // click prev button
            button.className = '/* @echo CSS_PREFIX */minicalendar-prev';
            MiniCalendar.prototype._nav.call(mockInst, button);
            expect(mockInst.options.renderMonth.setMonth).toHaveBeenCalledWith(4);
        });

        it('invoke "change" custom event.', function() {
            var button = document.createElement('button');
            mockInst.options.renderMonth.getMonth.and.returnValue(5);

            // click next button
            button.className = '/* @echo CSS_PREFIX */minicalendar-next';
            MiniCalendar.prototype._nav.call(mockInst, button);

            expect(mockInst.fire).toHaveBeenCalled();
        });
    });

    it('getSelectedDate() can get selected date in minicalendar', function() {
        // click date button is 2015-01-15
        var button = document.createElement('div');
        button.className = '/* @echo CSS_PREFIX */minicalendar-2015-01-15';
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
            var actual = MiniCalendar.prototype._getViewModel.call(mockInst, renderMonth, 0);
            expect(actual).toEqual({
                title: '2015.09',
                dayname: jasmine.any(Array),
                startDayOfWeek: 0,
                calendar: jasmine.any(Array)
            });

            // 8/30 is previous date
            expect(actual.calendar[0][0]).toEqual({
                d: 30,
                ymd: '2015-08-30',
                hasSchedule: undef,
                isNotThisMonth: true,
                weekend: true,
                selected: false,
                today: false
            });

            // autoselect 9/1 because it first date of september
            expect(actual.calendar[0][2].selected).toBe(true);

            // 10/2 is next month. no autoselect
            expect(actual.calendar[4][5].selected).toBe(false);
        });

        it('when cached hlData then apply it to highlight dates for represent the date has schedule.', function() {
            var renderMonth = new Date('2015-09-01T00:00:00+09:00');
            var today = new Date('2015-09-02T11:36:00+09:00');
            var hlData = {'2015-09-03': true};
            mockInst.hlData = hlData;

            var actual = MiniCalendar.prototype._getViewModel.call(mockInst, renderMonth, 0);

            expect(actual.calendar[0][4].hasSchedule).toBe(true);
        });
    });

    describe('highlight', function() {
        var inst;

        beforeEach(function() {
            inst = MiniCalendar(null, document.createElement('div'));

            spyOn(inst, 'render');
        });

        it('highlightDate() cache data for minicalendar date hightlighting', function() {
            inst.highlightDate(['2015-05-01', '2015-05-12']);

            expect(inst.hlData).toEqual({
                '2015-05-01': true,
                '2015-05-12': true
            });

            expect(inst.render).toHaveBeenCalled();
        });

        it('set "silent" option true then does not render after highlightDate invoked.', function() {
            inst.highlightDate(['2015-05-01', '2015-05-12'], true);

            expect(inst.render).not.toHaveBeenCalled();
        });

        it('clearHighlightDate() clear cached data for highlighting specific event for represent the date has schedule.', function() {
            inst.highlightDate(['2015-05-01', '2015-05-12']);

            inst.clearHighlightDate();

            expect(inst.hlData).toEqual({});
        });
    });
});
