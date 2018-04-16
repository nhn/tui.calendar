/*eslint-disable*/
var DayName = require('view/week/dayname');
var datetime = require('common/datetime');

describe('view/dayName', function() {
    beforeEach(function() {
        jasmine.clock().mockDate(new Date(2015, 6, 26));
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it('Create viewmodel by date ranges.', function() {
        var expected = [{
            day: 0,
            dayName: '일',
            date: 26,
            width: 50,
            isToday: true,
            left: 0,
            renderDate: '2015-07-26',
            color: ''
        }, {
            day: 1,
            dayName: '월',
            date: 27,
            width: 50,
            isToday: false,
            left: 50,
            renderDate: '2015-07-27',
            color: ''
        }];
        var grids = datetime.getGridLeftAndWidth(2, 0, false);

        var result = DayName.prototype._getBaseViewModel.call(
            {
                options: {
                    daynames: ['일', '월', '화', '수', '목', '금', '토']
                },
                _getDayNameColor: function() {return ''}
            },
            new Date('2015-07-26'),
            new Date('2015-07-27'),
            grids
        );

        expect(result).toEqual(expected);
    });
});
