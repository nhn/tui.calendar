/*eslint-disable*/
var util = ne.util;
var View = ne.dooray.calendar.View;
describe('View', function() {
    var view;

    beforeEach(function() {
        loadFixtures('view.html');
    });

    describe('View()', function() {
        it('make an container element on body when container is not supplied.', function() {
            view = new View();
            expect(document.getElementById('view-' + util.stamp(view))).toBe(view.container);
        });

        it('setting default container.', function() {
            var el = document.getElementById('container');
            view = new View(null, el);
            expect(view.container).toEqual(el.childNodes[0]);
        });
    });
});
