/*eslint-disable*/
var View = require('view/view');
var Week = require('view/week/week');
var TZDate = require('common/timezone').Date;
var timezoneMatchers = require('../../matcher/timezone');
var datetime = require('common/datetime');
var Theme = require('theme/theme');

describe('View/Week', function() {
    var view;

    beforeEach(function() {
        jasmine.addMatchers(timezoneMatchers);
        fixture.load('view.html');
        view = new Week(null, null, document.getElementById('container2'));
    });

    afterEach(function() {
        fixture.cleanup();
    });

    describe('render()', function() {
        it('send viewmodels from controllers.', function() {
            view.controller = jasmine.createSpyObj('Base.Week', ['findByDateRange']);
            view.controller.findByDateRange.and.returnValue('helloWorld');

            var child = new View();
            spyOn(child, 'render');
            view.addChild(child);

            view.render();

            expect(child.render).toHaveBeenCalledWith({
                schedulesInDateRange: 'helloWorld',
                renderStartDate: jasmine.any(TZDate),
                renderEndDate: jasmine.any(TZDate),
                grids: jasmine.any(Array),
                range: jasmine.any(Array),
                theme: jasmine.anything(),
                state: jasmine.anything()
            });
        });
    });

    describe('_getRenderDateRange()', function() {
        it('Calculate render dates from supplied date.', function() {
            var d = new TZDate('2015-05-02T12:30:00+09:00');

            var expectedStart = new TZDate(+d);
            expectedStart.setDate(expectedStart.getDate() - 3);
            expectedStart.setHours(0, 0, 0);

            var expectedEnd = new TZDate(+d);
            expectedEnd.setDate(expectedEnd.getDate() + 3);
            expectedEnd.setHours(0, 0, 0);

            var expected = {
                start: expectedStart,
                end: expectedEnd
            };

            var result = view._getRenderDateRange(d);

            expect(result.start).toEqualTZDate(expected.start);
            expect(result.end).toEqualTZDate(expected.end);
        });
    });
});
