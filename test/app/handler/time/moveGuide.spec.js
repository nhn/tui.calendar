/*eslint-disable*/
var util = require('tui-code-snippet');
var Guide = require('handler/time/moveGuide');

describe('handler/time.move.guide', function() {
    var mockInstance;

    it('_onDrag() calculate guide element\'s top properly.', function() {
        mockInstance = jasmine.createSpyObj('TimeResizeGuide', ['_refreshGuideElement']);
        util.extend(mockInstance, {
            guideElement: document.createElement('div'),
            _startGridY: 0,
            _startHeightPixel: 10,    // 1 hour
            _startTopPixel: 0,
            _model: { 
                getStarts: function() {
                    return new Date();
                },
                getEnds: function() {
                    return new Date();
                }
            }
        });

        mockInstance.guideElement.style.height = '20px';

        var scheduleData = {
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

        util.extend(mockInstance, {
            _lastDrag: scheduleData
        });

        Guide.prototype._onDrag.call(mockInstance, scheduleData);

        var args = mockInstance._refreshGuideElement.calls.argsFor(0);

        expect(args[0]).toBeCloseTo(10, 0);
    });
});
