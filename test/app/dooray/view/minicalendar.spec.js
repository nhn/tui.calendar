var MiniCalendar = require('dooray/view/minicalendar');

describe('service:view/MiniCalendar', function() {
    var undef = (function() {})(),
        mockInst;

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

    describe('_getViewModel()', function() {
        it('create mini calendar viewmodel by Date, startDayOfWeek, today', function() {
            var renderMonth = new Date('2015-09-01T00:00:00+09:00');
            var today = new Date('2015-10-02T11:36:00+09:00');

            mockInst.selectedDate = today;

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
                date: 30,
                cssClass: 'dooray-calendar-minicalendar-2015-08-30 dooray-calendar-minicalendar-other-month'
            });

            // 10/2 autoselected
            expect(actual.calendar[4][5].cssClass).toContain('selected');
        });

        it('when cached hlData then apply it to highlight dates for represent the date has schedule.', function() {
            var renderMonth = new Date('2015-09-01T00:00:00+09:00');
            var today = new Date('2015-09-02T11:36:00+09:00');
            var hlData = {'2015-09-03': {'has-schedule': true}};
            mockInst.hlData = hlData;
            mockInst.selectedDate = today;

            var actual = MiniCalendar.prototype._getViewModel.call(mockInst, renderMonth, 0);

            expect(actual.calendar[0][4].cssClass).toContain('has-schedule');
        });
    });

    describe('focus feature', function() {
        var inst;

        beforeEach(function() {
            inst = MiniCalendar(null, document.createElement('div'));
            spyOn(inst, 'render');
        });

        it('_addHlData() can add highlight data without exception', function() {
            expect(function() {
                inst._addHlData('2015-05-01', 'test');
            }).not.toThrow();
        });

        it('_setHlDateRange() can add hightlight data by start, end date range', function() {
            inst._setHlDateRange(new Date('2015-05-01'), new Date('2015-05-03'), 'test');

            expect(inst.hlData).toEqual(jasmine.objectContaining({
                // skip check today, selected
                '2015-05-01': {'test': true},
                '2015-05-02': {'test': true},
                '2015-05-03': {'test': true}
            }));
        });

        it('clearFocusData() remove all "focused" highlight data.', function() {
            inst.hlData['2015-05-02'] = {'focused': true};
            inst.hlData['2015-05-03'] = {'focused': true};

            inst.clearFocusData();

            expect(inst.hlData['2015-05-02']).toEqual({});
            expect(inst.hlData['2015-05-03']).toEqual({});
        });
    });
});
