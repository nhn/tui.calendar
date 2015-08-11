/*eslint-disable*/
var Time = ne.dooray.calendar.Time;
describe('View/Time', function() {
    var proto,
        supplied;

    beforeEach(function() {
        proto = Time.prototype;
        supplied = [[2, 5], [8, 11], [14, 17]];
    });

    describe('_hasCollide()', function() {
        it('return false when supplied empty array', function() {
            expect(proto._hasCollide([], 3, 4)).toBe(false);
        });

        it('calculate collision information properly.', function() {
            var expected = {collision: 0, emptySpace:1};
            expect(proto._hasCollide(supplied, 6, 7)).toBe(false);
        });
    });

    describe('_generateRowMap()', function() {
        /**
         * |---|---|
         * | 1 | 2 |
         * |---|---|
         * | 3 | 5 |
         * |---|---|
         * | 4 |   |
         * |---|---|
         *
         * to
         *
         * [
         *     [[2.start, 2.end], [5.start, 5.end]]
         * ]
         */

        var supplied,
            expected;

        function TimeMock(start, end) {
            this.starts = {
                getTime: function() {return start;}
            };

            this.ends = {
                getTime: function() {return end;}
            };
        }

        function getTime(start, end) {
            return new TimeMock(start, end);
        }

        beforeEach(function() {
            supplied = [
                [getTime(1, 2), getTime(1, 2)],
                [getTime(4, 5), getTime(5, 6)],
                [getTime(7, 8)]
            ];

            expected = [
                [[1, 2], [5, 6]]
            ];
        });

        it('get rowmap properly.', function() {
            expect(proto._generateRowMap(supplied)).toEqual(expected);
        });
    });
});
