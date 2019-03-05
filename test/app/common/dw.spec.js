'use strict';

var dw = require('common/dw');

describe('dw', function() {
    var date;

    beforeEach(function() {
        date = new Date('2015-05-01T09:30:00');
    });

    it('should add days by addDate method.', function() {
        var d = dw(date);

        expect(d.addDate(3).d.getDate()).toBe(4);
        expect(d.addDate(-2).d.getDate()).toBe(2);
    });

    it('should clone itself properly.', function() {
        var d = dw(date),
            d2 = d.clone();

        d2.addDate(-1);

        expect(d2.d).not.toEqual(d.d);
    });

    it('should check date is contain date range.', function() {
        var d = dw(date),
            d1 = new Date('2015-05-01T00:00:00+09:00'),
            d2 = new Date('2015-05-02T23:59:59+09:00'),
            d3 = new Date('2015-05-01T09:30:00+09:00');

        expect(d.isBetween(d1, d2)).toBe(true);
        expect(d.isBetween(dw(d1), dw(d2))).toBe(true);
        expect(d.isBetween(d3, d2)).toBe(true);
    });
});
