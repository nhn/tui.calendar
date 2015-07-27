/*eslint-disable*/
var DayName = ne.dooray.calendar.DayName;
describe('view/dayName', function() {
    it('Create viewmodel by date ranges.', function() {
        var expected = [{
            dayName: '일',
            date: 26,
            width: 50
        }, {
            dayName: '월',
            date: 27,
            width: 50
        }];

        var result = DayName.prototype._getBaseViewModel(
            new Date('2015-07-26'),
            new Date('2015-07-27')
        );

        expect(result).toEqual(expected);
    });
});
