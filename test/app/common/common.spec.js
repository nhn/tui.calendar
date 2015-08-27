/*eslint-disable*/
var common = ne.dooray.calendar.common;
describe('module:common', function() {
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
});
