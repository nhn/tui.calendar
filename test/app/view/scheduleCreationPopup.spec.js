'use strict';

var ScheduleCreationpPopup = require('../../../src/js/view/popup/scheduleCreationPopup');
var TZDate = require('common/timezone').Date;

/* eslint-disable object-property-newline */
describe('ScheduleCreationpPopup#_calcRenderingData', function() {
    var popupSize, containerSize;

    beforeEach(function() {
        popupSize = {width: 200, height: 80};
        containerSize = {top: 50, left: 100, bottom: 300, right: 500, width: 500, height: 300};
    });

    it('it is usually placed at the top center of the guide element', function() {
        var guideBound = {top: 200, left: 100, bottom: 200, right: 400};
        var posData = ScheduleCreationpPopup.prototype._calcRenderingData(popupSize, containerSize, guideBound);

        expect(posData.x).toBe(50);
        expect(posData.y).toBe(67);
        expect(posData.arrow.direction).toBe('arrow-bottom');
        expect(posData.arrow.position).toBeUndefined();
    });

    it('if it overflows the top of the container, it should be placed under the guide element', function() {
        var guideBound = {top: 100, left: 100, bottom: 200, right: 400};
        var posData = ScheduleCreationpPopup.prototype._calcRenderingData(popupSize, containerSize, guideBound);

        expect(posData.x).toBe(50);
        expect(posData.y).toBe(153);
        expect(posData.arrow.direction).toBe('arrow-top');
        expect(posData.arrow.position).toBeUndefined();
    });

    it('when overflowing to the left of the container, the left value is set to 0 and the left value of the arrow is also set.', function() {
        var guideBound = {top: 200, left: 50, bottom: 200, right: 200};
        var posData = ScheduleCreationpPopup.prototype._calcRenderingData(popupSize, containerSize, guideBound);

        expect(posData.x).toBe(0);
        expect(posData.arrow.position).toBeDefined();
    });

    it('when it overflows to the right of the container, the popup is aligned to the right and the left value of the arrow should be set', function() {
        var guideBound = {top: 200, left: 400, bottom: 200, right: 500};
        var posData = ScheduleCreationpPopup.prototype._calcRenderingData(popupSize, containerSize, guideBound);

        expect(posData.x).toBe(200);
        expect(posData.arrow.position).toBeDefined();
    });
});

describe('ScheduleCreationpPopup#_getRangeDate', function() {
    it('when it is an all-day schedule, set the hour and minute', function() {
        var start = new TZDate('2020/04/24 10:00:00');
        var end = new TZDate('2020/04/24 15:00:00');
        var rangeDate = ScheduleCreationpPopup.prototype._getRangeDate(start, end, true);

        expect(rangeDate.start).toEqual(new TZDate('2020/04/24 00:00:00'));
        expect(rangeDate.end).toEqual(new TZDate('2020/04/24 23:59:59'));
    });

    it('when it is an all-day schedule, if the end date is the start time of the day, it is set as the last time of the previous day', function() {
        var start = new TZDate('2020/04/24 00:00:00');
        var end = new TZDate('2020/04/25 00:00:00');
        var rangeDate = ScheduleCreationpPopup.prototype._getRangeDate(start, end, true);

        expect(rangeDate.start).toEqual(new TZDate('2020/04/24 00:00:00'));
        expect(rangeDate.end).toEqual(new TZDate('2020/04/24 23:59:59'));
    });

    it('when it is not an all-day schedule, if the end date is entered user date', function() {
        var start = new TZDate('2020/04/24 00:00:00');
        var end = new TZDate('2020/04/25 00:00:00');
        var rangeDate = ScheduleCreationpPopup.prototype._getRangeDate(start, end, false);

        expect(rangeDate.start).toEqual(new TZDate('2020/04/24 00:00:00'));
        expect(rangeDate.end).toEqual(new TZDate('2020/04/25 00:00:00'));
    });
});
