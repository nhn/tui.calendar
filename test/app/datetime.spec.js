/*eslint-disable*/
var dt = ne.dooray.calendar.datetime;
describe('datetime', function() {

    describe('clone()', function() {
        it('clone Date object', function() {
            var d1 = new Date();
            var cloned = dt.clone(d1);

            expect(d1.getTime() === cloned.getTime()).toBe(true);
        });
    });

    describe('compare()', function() {
        it('return -1 when first supplied date latest then second.', function() {
            var d1 = new Date();
            var d2 = new Date();

            d2.setMinutes(d2.getMinutes() + 30);

            expect(dt.compare(d2, d1)).toBe(-1);
        });

        it('return 0 when two date are equals.', function() {
            var d1 = new Date();
            var d2 = new Date(d1.getTime());

            expect(dt.compare(d1, d2)).toBe(0);
        });

        it('return 1 when second date latest then first.', function() {
            var d1 = new Date();
            var d2 = new Date();

            d2.setMinutes(d2.getMinutes() + 30);

            expect(dt.compare(d1, d2)).toBe(1);
        });
    });

    it('toUTC() convert non UTC date to UTC.', function() {
        var d = new Date('1970-01-01T00:00:00Z'),
            utc = dt.toUTC(d);

        expect(Math.abs(utc - d)).toBe(9 * 60 * 60 * 1000);
        expect(d).not.toEqual(utc);
    });

    describe('isValid()', function() {
        it('return true when supplied parameter is valid dates.', function() {
            var valid = new Date(),
                notDate = null,
                notValid = new Date('qweqd');

            expect(dt.isValid(valid)).toBe(true);
            expect(dt.isValid(notDate)).toBe(false);
            expect(dt.isValid(notValid)).toBe(false);
        });
    });

    describe('leftPad()', function() {
        it('pad zero to supplied number and length.', function() {
            var num = 2;
            expect(dt.leftPad(num, 2)).toBe('02');
            expect(dt.leftPad(num, 3)).toBe('002');
            num = 2300;

            expect(dt.leftPad(num, 5)).toBe('02300');
        });

        it('if number string length longer longer then length then just convert string and return it.', function() {
            var num = 3000;

            expect(dt.leftPad(num, 2)).toBe('3000');
        });
    });

    describe('format()', function() {
        it('return formatted date string as basis of supplied string.', function() {
            var birth = new Date('1988-09-25');
            expect(dt.format(birth, '')).toBe('');
            expect(dt.format(birth, 'YYYY')).toBe('1988');
            expect(dt.format(birth, 'MM')).toBe('09');
            expect(dt.format(birth, 'DD')).toBe('25');
            expect(dt.format(birth, 'YYYYMMDD')).toBe('19880925');
        });
    });
});
