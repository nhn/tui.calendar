var TimeResizeGuide = ne.dooray.calendar.TimeCreationGuide;
describe('handler/time.creation.guide', function() {
    var mockTimeCreation,
        inst;

    beforeEach(function() {
        mockTimeCreation = jasmine.createSpyObj('TimeCreation');
        inst = new TimeResizeGuide(mockTimeCreation);
    });

    // var mockInstance;
    //
    // beforeEach(function() {
    //     mockInstance = jasmine.createSpyObj('TimeCreationGuide', ['_refreshGuideElement']);
    //     timeViewMock = jasmine.createSpyObj('Time', ['getViewBound']);
    //     timeViewMock.options = {
    //         hourStart: 0,
    //         hourEnd: 24
    //     };
    //
    //     mockInstance.guideElement = document.createElement('div');
    //     timeViewMock.container = document.createElement('div');
    // });
    //
    // it('_onDragStart calculate guide element\'s top, height properly.', function() {
    //     var eventData = {
    //         relatedView: timeViewMock,
    //         nearestGridY: 12
    //     };
    //
    //     timeViewMock.getViewBound.and.returnValue({height: 230});
    //
    //     TimeResizeGuide.prototype._onDragStart.call(mockInstance, eventData);
    //
    //     expect(mockInstance._refreshGuideElement).toHaveBeenCalledWith(115, jasmine.any(Number));
    // });
    //
    // it('_onDrag calculate guide element\'s top, height properly.', function() {
    //     var eventData = {
    //         relatedView: timeViewMock,
    //         nearestGridY: 12
    //     };
    //     timeViewMock.getViewBound.and.returnValue({height: 230});
    //     TimeResizeGuide.prototype._onDragStart.call(mockInstance, eventData);
    //
    //
    //     // forward dragging. 
    //     mockInstance._refreshGuideElement.calls.reset();
    //     eventData.nearestGridY = 12.5;
    //     TimeResizeGuide.prototype._onDrag.call(mockInstance, eventData);
    //     expect(mockInstance._refreshGuideElement).toHaveBeenCalledWith(115, jasmine.any(Number));
    //
    //     // backward dragging.
    //     mockInstance._refreshGuideElement.calls.reset();
    //     eventData.nearestGridY = 10;
    //     TimeResizeGuide.prototype._onDrag.call(mockInstance, eventData);
    //     var args = mockInstance._refreshGuideElement.calls.argsFor(0);
    //     expect(args[0]).toBeCloseTo(95.8, 0);
    //     expect(args[1]).toBeCloseTo(23.9, 0);
    //     
    // });
});

