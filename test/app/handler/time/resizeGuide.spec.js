/*eslint-disable*/
describe('handler/time.resize.guide', function() {
    var util = tui.util,
        Guide = ne.dooray.calendar.TimeResizeGuide,
        mockInstance;

    it('_onDrag() calculate guide element\'s height properly.', function() {
        mockInstance = jasmine.createSpyObj('TimeResizeGuide', ['_refreshGuideElement']);
        util.extend(mockInstance, {
            guideElement: document.createElement('div'),
            _startGridY: 0,
            _startHeightPixel: 10,    // 1 hour
            _startTopPixel: 0
        });

        mockInstance.guideElement.style.top = '0px';

        var eventData = {
            relatedView: {
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

        expect(args[0]).toBeCloseTo(20, 0);
    });
});
