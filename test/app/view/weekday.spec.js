var Weekday = require('view/weekday');

describe('Weekday view', function() {
    it('can calculate own render range', function() {
        var mockInst = {
                options: {
                    renderStartDate: '2015-01-01',
                    renderEndDate: '2015-01-05'
                }
            },
            actual;


        actual = Weekday.prototype.getRenderDateRange.call(mockInst);

        expect(actual).toEqual([
            new Date('2015-01-01T00:00:00+09:00'),
            new Date('2015-01-02T00:00:00+09:00'),
            new Date('2015-01-03T00:00:00+09:00'),
            new Date('2015-01-04T00:00:00+09:00'),
            new Date('2015-01-05T00:00:00+09:00')
        ]);
    });
});
