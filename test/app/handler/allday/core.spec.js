/*eslint-disable*/
var domutil = require('common/domutil');
var domevent = require('common/domevent');
var AlldayCore = require('handler/allday/core');
describe('handler:AlldayCore', function() {
    var result;

    describe('_retriveEventData()', function() {
        beforeEach(function() {
            spyOn(domutil, 'getSize').and.returnValue([300, 30]);
        });

        it('return function that return event data by mouse events.', function() {
            var mockAlldayView = {
                options: {
                    renderStartDate: '2015-08-10',
                    renderEndDate: '2015-08-14'
                },
                children: jasmine.createSpyObj('Collection', ['single'])
            };
            var mouseEvent = {
                type: 'dragStart'
            };

            mockAlldayView.children.single.and.returnValue(true);

            // Simulate mouse event action.
            // drag start position (11일)
            spyOn(domevent, 'getMousePosition').and.returnValue([90, 10]);
            result = AlldayCore._retriveEventData.call(null, mockAlldayView);
            // drag end position (12일)
            domevent.getMousePosition.and.returnValue([160, 10]);

            expect(result(mouseEvent)).toEqual({
                relatedView: mockAlldayView,
                dragStartXIndex: 1,
                datesInRange: 5,
                xIndex: 2,
                triggerEvent: mouseEvent.type
            });

            // drag start position (12일)
            domevent.getMousePosition.and.returnValue([121, 25]);
            result = AlldayCore._retriveEventData.call(null, mockAlldayView);
            // drag end position (10일)
            domevent.getMousePosition.and.returnValue([59, 25]);
            expect(result(mouseEvent)).toEqual({
                relatedView: mockAlldayView,
                dragStartXIndex: 2,
                datesInRange: 5,
                xIndex: 0,
                triggerEvent: mouseEvent.type
            });
        });
    });
});

