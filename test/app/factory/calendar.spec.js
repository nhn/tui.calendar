var View = require('view/view');
var Calendar = require('factory/calendar');
var ControllerFactory = require('factory/controller');
var TimeGrid = require('view/week/timeGrid');
var TZDate = require('common/timezone').Date;

describe('Calendar', function() {
    var controller,
        inst;

    beforeEach(function() {
        fixture.load('view.html');

        // IE9 에서 scrollTop을 조정하려고 할 때 unspecified error발생하는 문제 해결용
        spyOn(TimeGrid.prototype, 'scrollToNow');
        spyOn(View.prototype, 'getViewBound').and.returnValue({height: 100});

        controller = ControllerFactory();
        spyOn(controller, 'createEvents');
        spyOn(Calendar.prototype, '_toggleViewEvent');

        inst = Calendar({
            defaultView: 'week',
            controller: controller
        }, document.getElementById('container'));

        spyOn(inst, 'render');
    });

    afterEach(function() {
        fixture.cleanup();
        inst.destroy();
    });

    describe('CRUD', function() {
        it('createEvents() can create CalEvent model from dataObject list', function() {
            inst.createEvents('hello world', true);
            expect(controller.createEvents).toHaveBeenCalledWith('hello world', true);
            expect(inst.render).not.toHaveBeenCalled();

            inst.createEvents('hello world');
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

    it('getWeekDayRange() can calculate start, end date by supplied date', function() {
        // 18(수)을 일요일 시작으로 계산하면 15(일) ~ 21(토)
        expect(inst.getWeekDayRange(new TZDate('2015-11-18'), 0)).toEqual([
            new TZDate('2015-11-15'),
            new TZDate('2015-11-21')
        ]);

        // 17(화)를 수요일 기준으로 계산하면 한 주 빠른 11(수) ~ 17(화)
        expect(inst.getWeekDayRange(new TZDate('2015-11-17'), 3)).toEqual([
            new TZDate('2015-11-11'),
            new TZDate('2015-11-17')
        ]);
    });

    it('setOptionRecurseively() can modify child view\'s option recursively.', function() {
        var weekView = inst.layout.children.single();
        var timeGrid = weekView.children.single(function(childView) {
            return childView.viewName === 'timegrid';
        });

        inst.setOptionRecurseively(weekView, function(viewOption) {
            viewOption.hello = 'world';
        });

        expect(timeGrid.options.hello).toBe('world');
    });

    describe('setDate()', function() {
        beforeEach(function() {
            spyOn(inst, 'refreshChildView');
        });

        it('can change render date range for calendar.', function() {
            inst.setDate('2015-11-01');

            expect(inst.renderDate).toEqual(new TZDate('2015-11-01T00:00:00+09:00'));
        });
    });
});
