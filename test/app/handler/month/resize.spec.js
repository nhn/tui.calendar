describe('handler:month/resize', function() {
    var MonthResize = ne.dooray.calendar.MonthResize,
        controllerFactory = ne.dooray.calendar.ControllerFactory,
        ctrl, eventInst, mockInst, mockCache;

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
            modelID: eventInst.cid(),
            starts: new Date('2015-04-01T00:00:00+09:00'),
            ends: new Date('2015-05-02T23:59:59+09:00')
        };

        MonthResize.prototype._updateEvent.call(mockInst, mockCache);

        expect(mockInst.fire).toHaveBeenCalledWith(
            'beforeUpdateEvent',
            {
                model: eventInst,
                starts: new Date('2015-05-01T00:00:00+09:00'),
                ends: new Date('2015-05-02T23:59:59+09:00')
            }
        );
    });
});
