var Calendar = ne.dooray.calendar.OriginCalendar;
var ControllerFactory = ne.dooray.calendar.ControllerFactory;

describe('Calendar', function() {
    var controller,
        container,
        inst;

    beforeEach(function() {
        container = document.createElement('div');
        controller = ControllerFactory();
        inst = Calendar({ 
            defaultView: 'week',
            controller: controller
        }, container);

        spyOn(controller, 'createEvents');
        spyOn(inst, 'render');
    });

    afterEach(function() {
        inst.destroy();
    });

    describe('CRUD', function() {
        it('createEvent() can create CalEvent model from dataObject list', function() {
            inst.createEvent('hello world', true);
            expect(controller.createEvents).toHaveBeenCalledWith('hello world', true);
            expect(inst.render).not.toHaveBeenCalled();

            inst.createEvent('hello world');
            expect(inst.render).toHaveBeenCalled();
        });

        it('updateEvent() can update CalEvent model', function() {
            var calEvent = jasmine.createSpyObj('CalEvent', ['set', 'cid', 'dirty']); 
            var id = tui.util.stamp(calEvent);
            calEvent.cid.and.returnValue(id);
            controller.events.add(calEvent);

            inst.updateEvent(id, {'hello': 'world'});

            expect(calEvent.set).toHaveBeenCalledWith('hello', 'world');
            expect(inst.render).toHaveBeenCalled();
        });

        it('deleteEvent() can delete CalEvent model in collection.', function() {
            var calEvent = jasmine.createSpyObj('CalEvent', ['set', 'cid', 'dirty']); 
            var id = tui.util.stamp(calEvent);
            calEvent.cid.and.returnValue(id);
            controller.events.add(calEvent);

            expect(controller.events.length).toBe(1);

            inst.deleteEvent(id);

            expect(controller.events.length).toBe(0);
        });
    });

    it('_getWeekRenderRange() can calculate start, end date by supplied date', function() {
        // 18(수)을 일요일 시작으로 계산하면 15(일) ~ 21(토)
        expect(inst._getWeekRenderRange(new Date('2015-11-18'), 0)).toEqual([
            new Date('2015-11-15'),
            new Date('2015-11-21')
        ]);

        // 17(화)를 수요일 기준으로 계산하면 한 주 빠른 11(수) ~ 17(화)
        expect(inst._getWeekRenderRange(new Date('2015-11-17'), 3)).toEqual([
            new Date('2015-11-11'),
            new Date('2015-11-17')
        ]);
    });

    it('_setOptionRecurseively() can modify child view\'s option recursively.', function() {
        var weekView = inst.layout.childs.single();
        var timeGrid = weekView.childs.single(function(childView) { return childView.viewName === 'timegrid'; });

        inst._setOptionRecurseively(weekView, function(viewOption) {
            viewOption.hello = 'world';
        });

        expect(timeGrid.options.hello).toBe('world');
    });

    describe('setDate()', function() {
        beforeEach(function() {
            spyOn(inst, 'refreshChildView');
        });

        it('can change render date range for calendar.', function() {
            inst.setDate('2015-11-01', '2015-11-07');

            expect(inst.layout.childs.items.week.options).toEqual({
                startDayOfWeek: 0,
                renderStartDate: '2015-11-01',
                renderEndDate: '2015-11-07'
            });
        });
    });
});
