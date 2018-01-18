/*eslint-disable*/
var common = require('common/common');

describe('module:common', function() {
    it('ratio()', function() {
        expect(common.ratio(10, 5, 2)).toBe(1);
        expect(common.ratio(20, 10, 5)).not.toBe(1);
        expect(common.ratio(20, 10, 5)).toBe(2.5);
    });

    it('nearest()', function() {
        expect(common.nearest(0.5, [0.3, 0.6, 0.9])).toBe(0.6);
        expect(common.nearest(13, [5, 9, 11, 12, 15])).toBe(12);
        expect(common.nearest(0.12, [0.5, 0.1, 0.11, 0.3])).toBe(0.11);
        expect(common.nearest(0.12, [0.5, 0.1, 0.11, 0.3])).not.toBe(0.5);
    });

    it('mixin()', function() {
        var from = {
            a: 123
        };
        var to = function() {};

        common.mixin(from, to);

        expect(to.prototype.a).toBe(123);
        expect(to.a).toBeUndefined();
    });

    describe('pick2()', function() {
        it('pick2 can use return value by method chaining.', function() {
            var obj = {
                one: {
                    two: 'hello',
                    method: function() {return 'good';},
                    test: jasmine.createSpy('common')
                }
            };

            expect(common.pick2(obj, 'one', 'two').val()).toBe('hello');
            expect(common.pick2(obj, 'one', 'two').then(function(val) { return val + ' world'; })).toBe('hello world');
            expect(common.pick2(obj, 'one', 'two').then(function() { return this + ' world'; })).toBe('hello world');
            expect(common.pick2(obj, 'one').then('method')).toBe('good');
            expect(common.pick2(obj, 'def').then('good')).toBeUndefined();

            common.pick2(obj, 'one').then('test', 'number');
            expect(obj.one.test).toHaveBeenCalledWith('number');
        });

        it('then() is not invoke when supplid path\'s parameter is not exist.', function() {
            var obj = {
                one: {}
            };

            var spy = jasmine.createSpy('pick2:then');

            common.pick2(obj, 'two').then(spy);

            expect(spy).not.toHaveBeenCalled();
        });
    });

    it('limit can applying limitation supplied number', function() {
        expect(common.limit(3, [0], [2])).toBe(2);
        expect(common.limit(-20, [0], [2])).toBe(0);
        expect(common.limit(10, [0, 15], [20])).toBe(15);
    });

    it('get first element in 2d array.', function() {
        var arr = [
            [0, 1, 2],
            [3, 4, 5]
        ];

        expect(common.firstIn2dArray(arr)).toBe(0);
        expect(common.firstIn2dArray(arr)).not.toBe(3);
    });

    it('get last element in 2d array.', function() {
        var arr = [
            [0, 1, 2],
            [3, 4, 5]
        ];

        expect(common.lastIn2dArray(arr)).toBe(5);
        expect(common.lastIn2dArray(arr)).not.toBe(0);
    });
});
