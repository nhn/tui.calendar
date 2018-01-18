var Weekday = require('view/weekday');
var TZDate = require('common/timezone').Date;
var timezoneMatchers = require('../../matcher/timezone');

describe('Weekday view', function() {
    beforeEach(function() {
        jasmine.addMatchers(timezoneMatchers);
    });

    it('can calculate own render range', function() {
        var mockInst = {
            options: {
                renderStartDate: '2015-01-01',
                renderEndDate: '2015-01-05'
            }
        };
        var actual = Weekday.prototype.getRenderDateRange.call(mockInst);

        expect(actual[0]).toEqualTZDate(new TZDate(2015, 0, 1));
        expect(actual[1]).toEqualTZDate(new TZDate(2015, 0, 2));
        expect(actual[2]).toEqualTZDate(new TZDate(2015, 0, 3));
        expect(actual[3]).toEqualTZDate(new TZDate(2015, 0, 4));
        expect(actual[4]).toEqualTZDate(new TZDate(2015, 0, 5));
    });
});
