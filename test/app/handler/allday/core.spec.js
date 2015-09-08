/*eslint-disable*/
var AlldayCore = window.ne.dooray.calendar.AlldayCore;
describe('handler:AlldayCore', function() {
    var result;

    describe('_retriveEventData()', function() {
        beforeEach(function() {
            spyOn(window.ne.dooray.calendar.domutil, 'getSize').and.returnValue([250, 30]);
        });

        it('return function that return event data by mouse events.', function() {
            var mockAlldayView = {
                options: {
                    renderStartDate: '2015-08-10',
                    renderEndDate: '2015-08-15'
                }
            };

            // Simulate mouse event action.
            spyOn(window.ne.dooray.calendar.domevent, 'getMousePosition').and.returnValue([180, 10]);
            result = AlldayCore._retriveEventData.call(null, mockAlldayView);
            expect(result()).toEqual({xIndex:3});

            window.ne.dooray.calendar.domevent.getMousePosition.and.returnValue([60, 25]);
            result = AlldayCore._retriveEventData.call(null, mockAlldayView);
            expect(result()).toEqual({xIndex:0});
        });
    });
});

