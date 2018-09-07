/*eslint-disable*/
var util = require('tui-code-snippet');
var Guide = require('handler/time/resizeGuide');

describe('handler/time.resize.guide', function() {
    var mockInstance;

    it('_onDrag() calculate guide element\'s height properly.', function() {
        mockInstance = jasmine.createSpyObj('TimeResizeGuide', ['_refreshGuideElement']);
        util.extend(mockInstance, {
            guideElement: document.createElement('div'),
            _startGridY: 0,
            _startHeightPixel: 10,    // 1 hour
            _startTopPixel: 0,
            _schedule: {
                goingDuration: 0,
                comingDuration: 0,
                duration: function() {
                    return new Date();
                }
            }
        });

        mockInstance.guideElement.style.top = '0px';

        var scheduleData = {
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

        Guide.prototype._onDrag.call(mockInstance, scheduleData);

        var args = mockInstance._refreshGuideElement.calls.argsFor(0);

        expect(args[0]).toBeCloseTo(20, 0);
    });
});
