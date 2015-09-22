/*eslint-disable*/
var AlldayCore = window.ne.dooray.calendar.AlldayCore;
describe('handler:AlldayCore', function() {
    var result;

    describe('_retriveEventData()', function() {
        beforeEach(function() {
            spyOn(window.ne.dooray.calendar.domutil, 'getSize').and.returnValue([250 + 60, 30]);
        });

        it('return function that return event data by mouse events.', function() {
            var mockAlldayView = {
                options: {
                    renderStartDate: '2015-08-10',
                    renderEndDate: '2015-08-14'
                }
            };

            // Simulate mouse event action.
            // drag start position
            spyOn(window.ne.dooray.calendar.domevent, 'getMousePosition').and.returnValue([40 + 60, 10]);
            result = AlldayCore._retriveEventData.call(null, mockAlldayView);
            // drag end position
            window.ne.dooray.calendar.domevent.getMousePosition.and.returnValue([180 + 60, 10]);
            expect(result()).toEqual({
                relatedView: mockAlldayView,
                dragStartXIndex: 0,
                datesInRange: 5,
                xIndex: 3
            });

            // drag start position
            window.ne.dooray.calendar.domevent.getMousePosition.and.returnValue([60 + 60, 25]);
            result = AlldayCore._retriveEventData.call(null, mockAlldayView);
            // drag end position
            window.ne.dooray.calendar.domevent.getMousePosition.and.returnValue([20 + 60, 25]);
            expect(result()).toEqual({
                relatedView: mockAlldayView,
                dragStartXIndex: 1,
                datesInRange: 5,
                xIndex: 0
            });
        });
    });
});

