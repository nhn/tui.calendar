var MonthResize = require('handler/month/resize');
var controllerFactory = require('factory/controller');
var TZDate = require('common/timezone').Date;

describe('handler:month/resize', function() {
    var ctrl, eventInst, mockInst, mockCache;

    it('should fire update event properly.', function() {
        ctrl = controllerFactory();

        mockInst = {
            baseController: ctrl,
            fire: jasmine.createSpy('fire')
        };

        eventInst = ctrl.createEvent({
            title: 'test',
            isAllDay: true,
            starts: '2015-05-01T00:00:00+09:00',
            ends: '2015-05-01T23:59:59+09:00'
        });

        mockCache = {
            model: eventInst,
            starts: new TZDate('2015-04-01T00:00:00+09:00'),
            ends: new TZDate('2015-05-02T23:59:59+09:00')
        };

        MonthResize.prototype._updateEvent.call(mockInst, mockCache);

        expect(mockInst.fire).toHaveBeenCalledWith(
            'beforeUpdateEvent',
            {
                model: eventInst,
                starts: new TZDate('2015-05-01T00:00:00+09:00'),
                ends: new TZDate('2015-05-02T23:59:59+09:00')
            }
        );
    });
});
