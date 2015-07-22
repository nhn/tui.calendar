/*eslint-disable*/
var TimeGrid = ne.dooray.calendar.TimeGrid;
describe('View/TimeGrid', function() {
    var proto;

    beforeEach(function() {
        proto = TimeGrid.prototype;
    });

    it('_getBaseViewModel()', function() {
        var expected = {
            hours: [
                {hour: 3},
                {hour: 4},
                {hour: 5},
                {hour: 6},
                {hour: 7},
                {hour: 8},
                {hour: 9},
                {hour: 10}
            ]
        };
        var obj = {
            options: {
                hourStart: 3,
                hourEnd: 11
            }
        };

        var result = proto._getBaseViewModel.call(obj);

        expect(result).toEqual(expected);
    });

    describe('_getHourmarkerViewModel()', function() {
        var originDate,
            current,
            start,
            obj;

        beforeEach(function() {
            originDate = window.Date;
            spyOn(window, 'Date');
            obj = {
                _getGridSize: function() { return [200, 300]; },
                _getBaseViewModel: function() { return {hours: {length: 9}} },
                options: {
                    hourStart: 3,
                    hourEnd: 11
                }
            };

            current = new originDate('2015-05-05T07:30:00+09:00');
            start = new originDate('2015-05-05T00:00:00+09:00');

            window.Date.and.returnValue(current);
            spyOn(ne.dooray.calendar.datetime, 'start').and.returnValue(start);
        });

        it('Calculate hourmarker viewModel accuratly.', function() {
            var expected = {
                top: 150,
                text: '07:30'
            };

            var result = proto._getHourmarkerViewModel.call(obj);
            
            expect(result).toEqual(expected);
        });

        it('Return false when grid rendered yet.', function() {
            spyOn(obj, '_getGridSize').and.returnValue(false);

            var result = proto._getHourmarkerViewModel.call(obj);

            expect(result).toBe(false);
        });
    });
});
