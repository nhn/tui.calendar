describe('handler:MonthCore', function() {
    var core = ne.dooray.calendar.MonthCore,
        Month = ne.dooray.calendar.Month,
        WeekdayInMonth = ne.dooray.calendar.WeekdayInMonth,
        m;

    beforeEach(function() {
        var container = document.createElement('div');
        container.style.width = '70px';
        container.style.height = '100px';

        m = new Month(null, container);

        // 2016년 1월 달력의 첫주, 둘째주
        m.addChild(new WeekdayInMonth({
            renderStartDate: '2015-12-27',
            renderEndDate: '2016-01-02'
        }, document.createElement('div')));

        m.addChild(new WeekdayInMonth({
            renderStartDate: '2016-01-03',
            renderEndDate: '2016-01-09'
        }, document.createElement('div')));
    });

    it('should calc date by mouse event.', function() {
        var func = core(m);

        var mockMouseEvent = {
            clientX: 9,
            clientY: 20
        };

        expect(func(mockMouseEvent)).toEqual({
            x: 0,
            y: 0,
            date: new Date('2015-12-27T00:00:00+09:00')
        });

        mockMouseEvent = {
            clientX: 58,
            clientY: 60
        };

        expect(func(mockMouseEvent)).toEqual({
            x: 5,
            y: 1,
            date: new Date('2016-01-08T00:00:00+09:00')
        });
    });
});
