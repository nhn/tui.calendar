/*eslint-disable*/
var domutil = require('common/domutil');
var domevent = require('common/domevent');
var AlldayCore = require('handler/allday/core');
var datetime = require('common/datetime');

describe('handler:AlldayCore', function() {
    var result;

    describe('_retriveScheduleData()', function() {
        beforeEach(function() {
            spyOn(domutil, 'getSize').and.returnValue([300, 30]);
        });

        it('return function that return schedule data by mouse events.', function() {
            var mockWeekdayView = jasmine.createSpyObj('Weekday', ['getRenderDateRange', 'getRenderDateGrids']);
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
            var grids = datetime.getGridLeftAndWidth(5, false, 0);
            var range = datetime.range(
                datetime.start(datetime.parse(mockAlldayView.options.renderStartDate)),
                datetime.end(datetime.parse(mockAlldayView.options.renderEndDate)),
                datetime.MILLISECONDS_PER_DAY
            );

            mockAlldayView.children.single.and.returnValue(mockWeekdayView);
            mockWeekdayView.getRenderDateRange.and.returnValue(range);
            mockWeekdayView.getRenderDateGrids.and.returnValue(grids);

            // Simulate mouse event action.
            // drag start position (11일)
            spyOn(domevent, 'getMousePosition').and.returnValue([90, 10]);
            result = AlldayCore._retriveScheduleData.call(null, mockAlldayView);
            // drag end position (12일)
            domevent.getMousePosition.and.returnValue([160, 10]);

            expect(result(mouseEvent)).toEqual({
                relatedView: mockAlldayView,
                dragStartXIndex: 1,
                datesInRange: 5,
                xIndex: 2,
                triggerEvent: mouseEvent.type,
                grids: grids,
                range: range
            });

            // drag start position (12일)
            domevent.getMousePosition.and.returnValue([121, 25]);
            result = AlldayCore._retriveScheduleData.call(null, mockAlldayView);
            // drag end position (10일)
            domevent.getMousePosition.and.returnValue([59, 25]);
            expect(result(mouseEvent)).toEqual({
                relatedView: mockAlldayView,
                dragStartXIndex: 2,
                datesInRange: 5,
                xIndex: 0,
                triggerEvent: mouseEvent.type,
                grids: grids,
                range: range
            });
        });
    });
});

