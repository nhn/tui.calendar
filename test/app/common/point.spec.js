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

        it('x, y 파라미터를 통해 생성할 수 있다', function() {
            var p1 = new Point(10, 20);

            expect(p1 + '').toBe('Point(10, 20)');
        });

        it('Point.n() static 메서드로도 생성할 수 있다', function() {
            var p1 = Point.n(10, 20);

            expect(p1 + '').toBe('Point(10, 20)');
        });

        it('Point.n() static 메서드는 첫 번째 인자를 [x, y] 배열로 생성할 수 있다', function() {
            var p1 = Point.n([10, 20]);

            expect(p1 + '').toBe('Point(10, 20)');
        });

        it('생성 시 세 번째 인자를 true로 주면 좌표를 반올림한 후 생성한다', function() {
            var p1 = new Point(10, 20.5, true);

            expect(p1 + '').toBe('Point(10, 21)');
        });

    });

    it('기본적인 연산, 올림, 반올림, round가 가능하다.', function() {

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

    it('두 점 사이의 거리를 잴 수 있다.', function() {

        var p1 = new Point(10, 10);

        var p2 = new Point(10, 20);

        expect(p1.distanceTo(p2)).toBe(10);
        expect(p1.distanceTo(p2)).not.toBe(20);

    });

    it('두 점이 같은 위치인지 확인할 수 있다', function() {
        var p1 = new Point(10, 10);

        var p2 = new Point(10, 20);

        expect(p1.equals(p2)).toBeFalsy();
    });

    it('reverse 메서드를 통해 점 위치를 0,0 기준으로 반전할 수 있다', function() {
        var p1 = new Point(-20, 5);

        var rp1 = p1.reverse();

        expect(rp1.toString()).toBe(new Point(20, -5).toString());

    });

    it('rotate() 를 통해 Point를 특정 Point기준으로 회전시킬 수 있다', function() {
        var p1 = new Point(0, 0);

        var p2 = new Point(0, 10);

        p1 = p1.rotate(90, p2);

        expect(p1 + '').toBe(new Point(10, 10) + '');
    });

    it('getRatio()스테틱 메서드로 비율계산을 쉽게 할 수 있다', function() {
        var p1 = new Point(10, 10);
        var p2 = Point.getRatio(p1, 1, 2);
        var p3 = Point.getRatio(p1, 1, 1);

        expect(p2 + '').toBe('Point(20, 20)');
        expect(p3 + '').toBe('Point(10, 10)');
    });

});


