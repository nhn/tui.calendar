/*eslint-disable*/
var timeCreation = ne.dooray.calendar.TimeCreation;
describe('module:Time.Creation', function() {
    it('_nearest()', function() {
        expect(timeCreation._nearest(0.5, [0.3, 0.6, 0.9])).toBe(0.6);
        expect(timeCreation._nearest(13, [5, 9, 11, 12, 15])).toBe(12);
        expect(timeCreation._nearest(0.12, [0.5, 0.1, 0.11, 0.3])).toBe(0.11);
    });
});

