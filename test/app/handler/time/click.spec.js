'use strict';

var domutil = require('common/domutil');
var Collection = require('common/collection');
var TimeClick = require('handler/time/click');

describe('handler:TimeClick', function() {
    var mockInst, mockCollection;

    beforeEach(function() {
        // Assume that the controller has an object with id '2'
        mockCollection = new Collection();
        mockCollection.add({
            _id: '2',
            text: 'hello'
        });

        mockInst = jasmine.createSpyObj('TimeClick', ['checkExpectCondition', 'fire']);
        mockInst.baseController = {
            schedules: mockCollection
        };
        mockInst.checkExpectCondition.and.returnValue(true);

        spyOn(domutil, 'closest').and.returnValue(true);
    });

    it('_onClick fire custom event "time_click_click" when target element is related with one of event instance of base controllers.', function() {
        var vMouseEvent = {originEvent: 'test'};
        // When the click target element is related to a schedule with id '2'
        spyOn(domutil, 'getData').and.returnValue('2');

        // When you run
        TimeClick.prototype._onClick.call(mockInst, vMouseEvent);

        // The event occurs as follows
        expect(mockInst.fire).toHaveBeenCalledWith('clickSchedule', {
            schedule: {
                _id: '2',
                text: 'hello'
            },
            event: 'test'
        });
    });

    it('TimeClick doesn\'t fire custom event "time_click_click" when no target or target is not related with schedules.', function() {
        // Element is not related to TimeClick
        mockInst.checkExpectCondition.and.returnValue(false);

        // When you run
        TimeClick.prototype._onClick.call(mockInst, {});

        // No response
        expect(mockInst.fire).not.toHaveBeenCalled();
    });
});
