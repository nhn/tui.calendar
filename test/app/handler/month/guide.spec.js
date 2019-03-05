'use strict';

var common = require('common/common');
var domutil = require('common/domutil');
var TZDate = require('common/timezone').Date;
var MonthGuide = require('handler/month/guide');

describe('handler:month/guide', function() {
    var undef = (function() {})(),
        proto = MonthGuide.prototype,
        mockInst,
        expected,
        actual;

    it('_getOriginIndicate() should calc indicate properly.', function() {
        mockInst = {
            days: 5,
            _getRatioValueInWeek: function(v) {
                return common.ratio(5, 100, v);
            }
        };

        // Drag from (1, 1) to (2, 2)Start Dragging Note Guide element calculation
        expected = {
            left: 20,
            width: 80,
            exceedL: undef,
            exceedR: true
        };
        actual = proto._getOriginIndicate.call(mockInst, [1, 1], [2, 2]);

        expect(actual).toEqual(expected);

        // 2,3 ~ 5,3 Calculations at Drag
        expected = {
            left: 40,
            width: 80,
            exceedL: undef,
            exceedR: undef
        };
        actual = proto._getOriginIndicate.call(mockInst, [2, 3], [5, 3]);

        expect(actual).toEqual(expected);

        // 2,3 ~ 1,0
        expected = {
            left: 0,
            width: 60,
            exceedL: true,
            exceedR: undef
        };
        actual = proto._getOriginIndicate.call(mockInst, [2, 3], [1, 0]);

        expect(actual).toEqual(expected);
    });

    it('_getMouseIndicate() should calc indicate properly.', function() {
        mockInst = {
            days: 5,
            _getRatioValueInWeek: function(v) {
                return common.ratio(5, 100, v);
            }
        };

        // 0,2 ~ 1,4 Principal guide element calculation with mouse cursor at drag
        expected = {
            left: 0,
            width: 40,
            exceedL: true,
            exceedR: undef
        };
        actual = proto._getMouseIndicate.call(mockInst, [0, 2], [1, 4]);

        expect(actual).toEqual(expected);

        // 3,4 ~ 2,4
        expected = {
            left: 40,
            width: 20,
            exceedL: undef,
            exceedR: undef
        };
        actual = proto._getMouseIndicate.call(mockInst, [3, 4], [2, 4]);

        expect(actual).toEqual(expected);

        // 3,2 ~ 2,3
        expected = {
            left: 0,
            width: 60,
            exceedL: true,
            exceedR: undef
        };
        actual = proto._getMouseIndicate.call(mockInst, [3, 2], [2, 3]);

        expect(actual).toEqual(expected);
    });

    describe('update()', function() {
        beforeEach(function() {
            spyOn(domutil, 'remove');
        });

        it('should delete unnecessary guide element before start guide effect.', function() {
            mockInst = jasmine.createSpyObj('month/guide', [
                '_getGuideElement',
                '_getLimitedCoord',
                '_getOriginIndicate',
                '_getMouseIndicate',
                '_getContainIndicate',
                '_removeGuideElements',
                '_updateGuides'
            ]);

            mockInst._getExcludesInRange = proto._getExcludesInRange;
            mockInst._getGuideElement.and.returnValue(true);

            // When the guide element is present at 0, 1
            mockInst.options = {
                isResizeMode: false
            };
            mockInst.guideElements = {
                0: true,
                1: true
            };

            // Dragging from 1, 1 to 2, 2
            mockInst.startCoord = [1, 1];
            mockInst._getLimitedCoord.and.returnValue([2, 2]);
            proto.update.call(mockInst, 2, 2);

            // Remove the guide element of 0
            expect(mockInst._removeGuideElements).toHaveBeenCalledWith([0]);

            // Update 1st and 2nd guide elements
            expect(mockInst._updateGuides).toHaveBeenCalledWith({
                1: jasmine.any(Object),
                2: jasmine.any(Object)
            });
        });
    });

    describe('_getCoordByDate()', function() {
        var w1 = {
                options: {
                    renderStartDate: new TZDate('2015-12-27'),
                    renderEndDate: new TZDate('2016-01-02')
                }
            },
            w2 = {
                options: {
                    renderStartDate: new TZDate('2016-01-03'),
                    renderEndDate: new TZDate('2016-01-09')
                }
            },
            date;

        beforeEach(function() {
            mockInst = {
                weeks: [w1, w2],
                days: 7
            };
        });

        it('should calculate coordinate by date properly.', function() {
            date = new TZDate('2015-12-29T09:30:00');

            expect(proto._getCoordByDate.call(mockInst, date)).toEqual([2, 0]);

            date = new TZDate('2016-01-06T00:00:00');

            expect(proto._getCoordByDate.call(mockInst, date)).toEqual([3, 1]);

            date = new TZDate('2016-01-13T09:30:00');

            expect(proto._getCoordByDate.call(mockInst, date)).toEqual([3, 2]);

            date = new TZDate('2015-12-15T00:00:00');

            expect(proto._getCoordByDate.call(mockInst, date)).toEqual([2, -2]);

            mockInst.days = 5;
            w1.options.renderEndDate = new TZDate('2015-12-31');
            w2.options.renderStartDate = new TZDate('2016-01-01');
            w2.options.renderEndDate = new TZDate('2016-01-05');

            date = new TZDate('2015-12-24T00:00:00');

            expect(proto._getCoordByDate.call(mockInst, date)).toEqual([2, -1]);
        });
    });

    it('should limit dragging indexes by month grid and supplied parameters.', function() {
        var fn = proto._getLimitedCoord;
        mockInst = {
            weeks: [1, 2, 3, 4, 5],
            days: 7
        };

        expect(fn.call(mockInst, [-1, -1])).toEqual([0, 0]);
        expect(fn.call(mockInst, [2, 2])).toEqual([2, 2]);
        expect(fn.call(mockInst, [1, 1], [2, 2])).toEqual([2, 2]);
        expect(fn.call(mockInst, [1, 2], [2, 3])).toEqual([2, 3]);
        expect(fn.call(mockInst, [2, 3], null, [1, 2])).toEqual([1, 2]);

        expect(fn.call(mockInst, [-10, 2], [0, 2])).toEqual([0, 2]);
        expect(fn.call(mockInst, [10, 2], [0, 2])).toEqual([6, 2]);
    });

    it('should calc excluded range in specific range.', function() {
        var fn = proto._getExcludesInRange,
            range = [2, 3, 4, 5],
            supplied = [1, 5, 6, 7];

        expected = [1, 6, 7];

        expect(fn(range, supplied)).toEqual(expected);
        expect(fn([4, 5, 6], [1, 2, 5, 7, 8])).toEqual([1, 2, 7, 8]);
    });
});

