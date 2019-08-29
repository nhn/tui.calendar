'use strict';

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

        // Fixed an unspecified error when trying to adjust scrollTop in IE9
        spyOn(TimeGrid.prototype, 'scrollToNow');
        spyOn(View.prototype, 'getViewBound').and.returnValue({height: 100});

        controller = controllerFactory();
        spyOn(controller, 'createSchedules');
        spyOn(Calendar.prototype, '_toggleViewSchedule');

        inst = new Calendar(document.getElementById('container'), {
            defaultView: 'week'
        });
        inst._controller = controller;

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
        // If you calculate 18(Wed) as the start of Sunday, it is 15(Sun) ~ 21(Sat)
        expect(inst._getWeekDayRange(new TZDate('2015-11-18'), 0)).toEqual([
            new TZDate(2015, 10, 15),
            new TZDate(2015, 10, 21)
        ]);

        // 17(Tue) is calculated on Wednesday, and it is 11(Wed) ~ 17(Tue)
        expect(inst._getWeekDayRange(new TZDate('2015-11-17'), 3)).toEqual([
            new TZDate(2015, 10, 11),
            new TZDate(2015, 10, 17)
        ]);
    });

    describe('setDate()', function() {
        it('can change render date range for calendar.', function() {
            inst.setDate('2015-11-01');

            expect(inst.getDate().getTime()).toEqual(new TZDate('2015-11-01T00:00:00+09:00').getTime());
        });
    });

    describe('getElement()', function() {
        it('can return the HTMLElement by schedule id and calendar id', function() {
            var schedule = jasmine.createSpyObj('Schedule', ['set', 'cid', 'dirty']);
            var id = util.stamp(schedule);
            var calendarId = schedule.calendarId;
            schedule.id = id;
            schedule.cid.and.returnValue(id);

            inst._controller.schedules.add(schedule);
            spyOn(document, 'querySelector').and.callThrough();

            inst.getElement(id, calendarId);

            expect(document.querySelector).toHaveBeenCalled();
        });
    });
});
