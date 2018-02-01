var util = require('tui-code-snippet');
var View = require('view/view');
var Calendar = require('factory/calendar');
var controllerFactory = require('factory/controller');
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

        controller = controllerFactory();
        spyOn(controller, 'createSchedules');
        spyOn(Calendar.prototype, '_toggleViewSchedule');

        inst = new Calendar(document.getElementById('container'), {
            defaultView: 'week',
            controller: controller
        });

        spyOn(inst, 'render');
    });

    afterEach(function() {
        fixture.cleanup();
        inst.destroy();
    });

    describe('CRUD', function() {
        it('createSchedules() can create Schedule model from dataObject list', function() {
            inst.createSchedules('hello world', true);
            expect(controller.createSchedules).toHaveBeenCalledWith('hello world', true);
            expect(inst.render).not.toHaveBeenCalled();

            inst.createSchedules('hello world');
            expect(inst.render).toHaveBeenCalled();
        });

        it('updateSchedule() can update Schedule model', function() {
            var schedule = jasmine.createSpyObj('Schedule', ['set', 'cid', 'dirty']);
            var id = util.stamp(schedule);
            var calendarId = schedule.calendarId;
            schedule.id = id;
            schedule.cid.and.returnValue(id);
            controller.schedules.add(schedule);
            spyOn(controller, 'updateSchedule');

            inst.updateSchedule(id, calendarId, {'hello': 'world'});

            expect(controller.updateSchedule).toHaveBeenCalledWith(schedule, {'hello': 'world'});
            expect(inst.render).toHaveBeenCalled();
        });

        it('deleteSchedule() can delete Schedule model in collection.', function() {
            var schedule = jasmine.createSpyObj('Schedule', ['set', 'cid', 'dirty']);
            var id = util.stamp(schedule);
            var calendarId = schedule.calendarId;
            schedule.id = id;
            schedule.cid.and.returnValue(id);
            controller.schedules.add(schedule);

            expect(controller.schedules.length).toBe(1);

            inst.deleteSchedule(id, calendarId);

            expect(controller.schedules.length).toBe(0);
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

    describe('getElement()', function() {
        it('can return the HTMLElement by schedule id and calendar id', function() {
            var schedule = jasmine.createSpyObj('Schedule', ['set', 'cid', 'dirty']);
            var id = util.stamp(schedule);
            var calendarId = schedule.calendarId;
            schedule.id = id;
            schedule.cid.and.returnValue(id);

            inst.controller.schedules.add(schedule);
            spyOn(document, 'querySelector').and.callThrough();

            inst.getElement(id, calendarId);
            expect(document.querySelector).toHaveBeenCalled();
        });
    });
});
