/*eslint-disable*/
var Point = require('common/point');

describe('Point', function() {
    describe('toArray()', function() {
        it('return coordinates to array.', function() {
            var p1 = new Point(10, 5);
            var p2 = new Point(10.234, 5.234);

            expect(p1.toArray()).toEqual([10, 5]);
            expect(p2.toArray()).toEqual([10.234, 5.234]);
        });
    });

    describe('initializer', function() {

        it('It can be generated via the x, y parameters', function() {
            var p1 = new Point(10, 20);

            expect(p1 + '').toBe('Point(10, 20)');
        });

        it('It can also be created with the static method Point.n()', function() {
            var p1 = Point.n(10, 20);

            expect(p1 + '').toBe('Point(10, 20)');
        });

        it('The Point.n() static method can generate the first argument as an array [x, y]', function() {
            var p1 = Point.n([10, 20]);

            expect(p1 + '').toBe('Point(10, 20)');
        });

        it('If you give the third argument as true when you create it, it rounds the coordinates and creates it.', function() {
            var p1 = new Point(10, 20.5, true);

            expect(p1 + '').toBe('Point(10, 21)');
        });

    });

    it('Basic operations, rounding, rounding, and rounding are possible.', function() {

        var gets = function(x, y) {
            return new Point(x, y).toString();
        };

        var p1 = new Point(10, 10);

        p1 = p1.add(new Point(10, 10));

        expect(p1.toString()).toBe(gets(20, 20));

        p1 = p1.multiplyBy(5);

        expect(p1.toString()).toBe(gets(100, 100));

        p1 = p1.subtract(new Point(10, 10));

        expect(p1.toString()).toBe(gets(90, 90));

        p1 = p1.divideBy(2);

        expect(p1.toString()).toBe(gets(45, 45));

        p1 = new Point(0.5, 0.5);

        expect(p1.toString()).toBe(gets(0.5, 0.5));

        p1 = p1.floor();

        expect(p1.toString()).toBe(gets(0, 0));


        p1 = new Point(0.5, 0.5);

        p1 = p1.ceil();

        expect(p1.toString()).toBe(gets(1, 1));


        p1 = new Point(0.3, 0.3);

        p1 = p1.round();

        expect(p1.toString()).toBe(gets(0, 0));


    });

    it('The distance between two points can be measured.', function() {

        var p1 = new Point(10, 10);

        var p2 = new Point(10, 20);

        expect(p1.distanceTo(p2)).toBe(10);
        expect(p1.distanceTo(p2)).not.toBe(20);

    });

    it('I can see if the two points are in the same position', function() {
        var p1 = new Point(10, 10);

        var p2 = new Point(10, 20);

        expect(p1.equals(p2)).toBeFalsy();
    });

    it('The reverse method allows you to invert the point position to 0,0', function() {
        var p1 = new Point(-20, 5);

        var rp1 = p1.reverse();

        expect(rp1.toString()).toBe(new Point(20, -5).toString());

    });

    it('rotate() allows you to rotate the Point relative to a specific Point', function() {
        var p1 = new Point(0, 0);

        var p2 = new Point(0, 10);

        p1 = p1.rotate(90, p2);

        expect(p1 + '').toBe(new Point(10, 10) + '');
    });

    it('getRatio() Static method makes it easy to calculate the ratio', function() {
        var p1 = new Point(10, 10);
        var p2 = Point.getRatio(p1, 1, 2);
        var p3 = Point.getRatio(p1, 1, 1);

        expect(p2 + '').toBe('Point(20, 20)');
        expect(p3 + '').toBe('Point(10, 10)');
    });

});


