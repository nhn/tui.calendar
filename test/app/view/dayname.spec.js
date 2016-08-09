/*eslint-disable*/
var DayName = require('view/week/dayname');

describe('view/dayName', function() {
    it('Create viewmodel by date ranges.', function() {
        var expected = [{
            day: 0,
            dayName: '일',
            date: 26,
            width: 50
        }, {
            day: 1,
            dayName: '월',
            date: 27,
            width: 50
        }];

        var result = DayName.prototype._getBaseViewModel.call({
                options: {
                    daynames: ['일', '월', '화', '수', '목', '금', '토']
                }
            },
            new Date('2015-07-26'),
            new Date('2015-07-27')
        );

        expect(result).toEqual(expected);
    });
});
