'use strict';

var ScheduleCreationpPopup = require('../../../src/js/view/popup/scheduleCreationPopup');

/* eslint-disable object-property-newline */
describe('ScheduleCreationpPopup#_calcRenderingData', function() {
    var popupSize, windowSize;

    beforeEach(function() {
        popupSize = {width: 200, height: 80};
        windowSize = {top: 0, left: 0, bottom: 300, right: 500, width: 500, height: 300};
    });

    it('should set position to top, center of guideElements', function() {
        var guideBound = {top: 100, left: 100, bottom: 200, right: 400};
        var posData = ScheduleCreationpPopup.prototype._calcRenderingData(popupSize, windowSize, guideBound);

        expect(posData.x).toBe(150);
        expect(posData.y).toBe(23);
        expect(posData.arrow.direction).toBe('arrow-bottom');
        expect(posData.arrow.position).toBeUndefined();
    });

    it('should set position to bottom center of guideElements, ', function() {
        var guideBound = {top: 75, left: 100, bottom: 120, right: 400};
        var posData = ScheduleCreationpPopup.prototype._calcRenderingData(popupSize, windowSize, guideBound);

        expect(posData.x).toBe(150);
        expect(posData.y).toBe(129);
        expect(posData.arrow.direction).toBe('arrow-top');
        expect(posData.arrow.position).toBeUndefined();
    });

    it('should shift to left, if popup is overflowed', function() {
        var guideBound = {top: 100, left: 400, bottom: 200, right: 500};
        var posData = ScheduleCreationpPopup.prototype._calcRenderingData(popupSize, windowSize, guideBound);

        expect(posData.x).toBe(300);
        expect(posData.y).toBe(23);
        expect(posData.arrow.direction).toBe('arrow-bottom');
        expect(posData.arrow.position).toBe(142);
    });

    it('should set position left 0 of screen, if popup is overflowed both left and right', function() {
        var guideBound = {top: 100, left: 100, bottom: 200, right: 400};
        var posData;

        popupSize = {width: 600, height: 80};
        posData = ScheduleCreationpPopup.prototype._calcRenderingData(popupSize, windowSize, guideBound);

        expect(posData.x).toBe(0);
        expect(posData.y).toBe(23);
        expect(posData.arrow.direction).toBe('arrow-bottom');
        expect(posData.arrow.position).toBe(242);
    });
});
