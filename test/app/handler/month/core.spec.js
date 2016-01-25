describe('handler:MonthCore', function() {
    var core = ne.dooray.calendar.MonthCore,
        Month = ne.dooray.calendar.Month,
        WeekdayInMonth = ne.dooray.calendar.WeekdayInMonth,
        m, w1, w2;

    beforeEach(function() {
        var container = document.createElement('div');
        container.style.width = '70px';
        container.style.height = '100px';

        // 2016년 1월 달력의 첫주, 둘째주
        m = new Month(null, container);

        // mock the container element
        m.vLayout.panels[1].container = container;

        w1 = new WeekdayInMonth({
            renderStartDate: '2015-12-27',
            renderEndDate: '2016-01-02'
        }, document.createElement('div'))

        w2 = new WeekdayInMonth({
            renderStartDate: '2016-01-03',
            renderEndDate: '2016-01-09'
        }, document.createElement('div'))

        m.addChild(w1);
        m.addChild(w2);
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
            sizeX: 7,
            sizeY: 2,
            date: new Date('2015-12-27T00:00:00+09:00'),
            weekdayView: w1
        });

        mockMouseEvent = {
            clientX: 58,
            clientY: 60
        };

        expect(func(mockMouseEvent)).toEqual({
            x: 5,
            y: 1,
            sizeX: 7,
            sizeY: 2,
            date: new Date('2016-01-08T00:00:00+09:00'),
            weekdayView: w2
        });
    });
});
