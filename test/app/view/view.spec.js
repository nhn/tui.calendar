/*eslint-disable*/
var View = ne.dooray.calendar.View;
describe('View', function() {
    var view;

    beforeEach(function() {
        loadFixtures('view.html');
    });

    describe('View()', function() {
        it('throw error when container element not supplied.', function() {
            expect(function() {
                new View();
            }).toThrow();
        });

        it('setting default container.', function() {
            var el = document.getElementById('container');
            view = new View(null, el);
            expect(view.container).toEqual(el);
        });

        it('can use container element id for constructor', function() {
            var el = document.getElementById('container');
            view = new View(null, 'container');
            expect(view.container).toEqual(el);
        });
    });
});
