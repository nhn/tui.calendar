'use strict';

var MonthResize = require('handler/month/resize');
var controllerFactory = require('factory/controller');
var TZDate = require('common/timezone').Date;

describe('handler:month/resize', function() {
    var ctrl, scheduleInst, mockInst, mockCache;

    it('should fire update schedule properly.', function() {
        ctrl = controllerFactory();

        mockInst = {
            baseController: ctrl,
            fire: jasmine.createSpy('fire')
        };

        scheduleInst = ctrl.createSchedule({
            title: 'test',
            isAllDay: true,
            start: '2015-05-01T00:00:00+09:00',
            end: '2015-05-01T23:59:59+09:00'
        });

        mockCache = {
            schedule: scheduleInst,
            start: new TZDate('2015-04-01T00:00:00+09:00'),
            end: new TZDate('2015-05-02T23:59:59+09:00')
        };

        MonthResize.prototype._updateSchedule.call(mockInst, mockCache);

        expect(mockInst.fire).toHaveBeenCalledWith(
            'beforeUpdateSchedule',
            {
                schedule: scheduleInst,
                changes: {
                    end: new TZDate('2015-05-02T23:59:59+09:00')
                },
                start: new TZDate('2015-05-01T00:00:00+09:00'),
                end: new TZDate('2015-05-02T23:59:59+09:00')
            }
        );
    });
});
