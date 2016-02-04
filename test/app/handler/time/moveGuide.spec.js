/*eslint-disable*/
describe('handler/time.move.guide', function() {
    var util = tui.util,
        Guide = ne.dooray.calendar.TimeMoveGuide,
        mockInstance;

    it('_onDrag() calculate guide element\'s top properly.', function() {
        mockInstance = jasmine.createSpyObj('TimeResizeGuide', ['_refreshGuideElement']);
        util.extend(mockInstance, {
            guideElement: document.createElement('div'),
            _startGridY: 0,
            _startHeightPixel: 10,    // 1 hour
            _startTopPixel: 0
        });

        mockInstance.guideElement.style.height = '20px';

        var eventData = {
            currentView: {
                options: {
                    hourStart: 0,
                    hourEnd: 24
                },
                getViewBound: function() {
                    return {height:230}
                }
            },
            nearestGridY: 1
        };

        Guide.prototype._onDrag.call(mockInstance, eventData);

        var args = mockInstance._refreshGuideElement.calls.argsFor(0);

        expect(args[0]).toBeCloseTo(10, 0);
    });
});
