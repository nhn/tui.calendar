/*eslint-disable*/
var domutil = require('common/domutil');
var MonthMove = require('handler/month/move');
var TZDate = require('common/timezone').Date;

describe('handler:MonthMove', function() {
    var proto;

    beforeEach(function() {
        proto = MonthMove.prototype;
    });

    describe('event handlers', function() {
        var inst;

        beforeEach(function() {
            spyOn(domutil, 'closest');
            spyOn(domutil, 'getData');

            inst = new MonthMove({on:function() {}});
            spyOn(inst, 'updateSchedule');
        });

        describe('_onDragStart()', function() {

            it('cancel drag event when the schedule is read-only', function() {
                var mockController = {
                    schedules: {
                        items: {
                            '3': {
                                isReadOnly: true
                            }
                        }
                    }
                };

                var mockInst = {
                    baseController: mockController,
                    hasPermissionToHandle: jasmine.createSpy('hasPermissionToHandle'),
                    fire: jasmine.createSpy('fire')
                };

                mockInst.hasPermissionToHandle.and.returnValue(3);
                domutil.getData.and.returnValue(3); 
                domutil.closest.and.returnValue({});

                proto._onDragStart.call(mockInst, {});

                expect(mockInst.fire).not.toHaveBeenCalled();
            })
        });
    });
});
