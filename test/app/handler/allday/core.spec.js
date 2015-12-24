/*eslint-disable*/
var AlldayCore = window.ne.dooray.calendar.AlldayCore;
describe('handler:AlldayCore', function() {
    var result;

    describe('_retriveEventData()', function() {
        beforeEach(function() {
            spyOn(window.ne.dooray.calendar.domutil, 'getSize').and.returnValue([300, 30]);
        });

        it('return function that return event data by mouse events.', function() {
            var mockAlldayView = {
                options: {
                    renderStartDate: '2015-08-10',
                    renderEndDate: '2015-08-14'
                },
                childs: jasmine.createSpyObj('Collection', ['single'])
            };

            mockAlldayView.childs.single.and.returnValue(true);

            // Simulate mouse event action.
            // drag start position (11일)
            spyOn(window.ne.dooray.calendar.domevent, 'getMousePosition').and.returnValue([90, 10]);
            result = AlldayCore._retriveEventData.call(null, mockAlldayView);
            // drag end position (12일)
            window.ne.dooray.calendar.domevent.getMousePosition.and.returnValue([160, 10]);

            expect(result()).toEqual({
                relatedView: mockAlldayView,
                dragStartXIndex: 1,
                datesInRange: 5,
                xIndex: 2
            });

            // drag start position (12일)
            window.ne.dooray.calendar.domevent.getMousePosition.and.returnValue([121, 25]);
            result = AlldayCore._retriveEventData.call(null, mockAlldayView);
            // drag end position (10일)
            window.ne.dooray.calendar.domevent.getMousePosition.and.returnValue([59, 25]);
            expect(result()).toEqual({
                relatedView: mockAlldayView,
                dragStartXIndex: 2,
                datesInRange: 5,
                xIndex: 0
            });
        });
    });
});

