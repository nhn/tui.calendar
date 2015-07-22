/*eslint-disable*/
var View = ne.dooray.calendar.View;
var Week = ne.dooray.calendar.Week;
describe('View/Week', function() {
    var view;

    beforeEach(function() {
        loadFixtures('view.html');
        view = new Week(null, null, document.getElementById('container2'));
    });

    it('Create child views', function() {
        expect(view.childs.length).not.toBe(0);
    });

    describe('render()', function() {
        it('send viewmodels from controllers.', function() {
            view.controller = jasmine.createSpyObj('Base.Week', ['findByDateRange']);
            view.controller.findByDateRange.and.returnValue('helloWorld');

            var child = new View();
            spyOn(child, 'render');
            view.addChild(child);

            view.render();

            expect(child.render).toHaveBeenCalledWith('helloWorld');
        });
    });

    describe('_getRenderDateRange()', function() {
        it('Calculate render dates from supplied date.', function() {
            var d = new Date('2015-05-02T12:30:00+09:00');

            var expectedStart = new Date(+d);
            expectedStart.setDate(expectedStart.getDate() - 3);
            expectedStart.setHours(0, 0, 0);
            
            var expectedEnd = new Date(+d);
            expectedEnd.setDate(expectedEnd.getDate() + 3);
            expectedEnd.setHours(0, 0, 0);

            var expected = {
                start: expectedStart,
                end: expectedEnd
            };

            var result = view._getRenderDateRange(d);

            expect(result).toEqual(expected);
        });
    });
});
