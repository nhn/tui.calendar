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
            expect(document.querySelector('.view-' + util.stamp(view))).toEqual(view.container);
        });

        it('setting default container.', function() {
            var el = document.getElementById('container');
            view = new View(null, el);
            expect(view.container).toEqual(el);
        });
    });

    describe('addChild', function() {
        it('Can add child views.', function() {
            view = new View();
            var view2 = new View();

            view.addChild(view2);

            expect(view.childs.has(util.stamp(view2)));
        });

        it('Can add some process before added.', function() {
            view = new View();
            var view2 = new View();
            var spy = jasmine.createSpy('beforeAdd');

            view.addChild(view2, spy);

            expect(spy).toHaveBeenCalledWith(view);
            expect(view.childs.has(util.stamp(view2)));
        });
    });

    describe('resize()', function() {
        it('capture resize event or invokes and send to child views.', function() {
            view = new View(null, document.getElementById('container2'));
            expect(view.resize()).toEqual({
                x: 10,
                y: 10,
                width: 250,
                height: 200
            });
            expect(view.resize().x).not.toBe(50);
        });
    });
});

