'use strict';

var MonthCreation = require('handler/month/creation');
var TZDate = require('common/timezone').Date;

describe('MonthCreation', function() {
    var proto;

    beforeEach(function() {
        proto = MonthCreation.prototype;
    });

    describe('_adjustStartAndEndTime()', function() {
        it('provides exact clicking day when near 24 o\'clock', function() {
            var result;

            jasmine.clock().install();
            jasmine.clock().mockDate(new Date('2018-03-07T23:37:00+09:00'));

            result = proto._adjustStartAndEndTime(
                new TZDate('2018-03-07T00:00:00+09:00'),
                new TZDate('2018-03-07T00:00:00+09:00')
            );

            expect(result).toEqual({
                start: new TZDate('2018-03-07T23:30:00+09:00'),
                end: new TZDate('2018-03-08T00:30:00+09:00')
            });

            jasmine.clock().uninstall();
        });
    });
});
