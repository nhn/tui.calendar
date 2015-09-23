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
            expect(document.querySelector('.schedule-view-' + util.stamp(view))).toEqual(view.container);
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

    it('recursivly() can invoke function each child views recursivly.', function() {
            view = new View();
            var view2 = new View();
            var view3 = new View();

            view.addChild(view2);
            view2.addChild(view3);

            spyOn(view3, 'recursivly');

            view.recursivly(function() {});

            expect(view3.recursivly).toHaveBeenCalled();
    });

    describe('destroy', function() {
        var view2;
        beforeEach(function() {
            view = new View();
            view2 = new View();

            view.addChild(view2);
        });

        it('destroy child views recursivly.', function() {
            spyOn(View.prototype, '_destroy').and.callThrough();

            view.destroy();
            expect(View.prototype._destroy.calls.count()).toBe(2);
            expect(view2).toEqual(jasmine.objectContaining({
                __fe_id: jasmine.any(Number),
                id: null,
                childs: null,
                container: null
            }));
        });
    });

    describe('removeChild', function() {
        var view2;

        beforeEach(function() {
            view = new View();
            view2 = new View();
            
            view.addChild(view2);
        });

        it('Can remove child view.', function() {
            view.removeChild(util.stamp(view2));
            expect(view.childs.length).toBe(0);
        });

        it('Can remove child view by instance itself.', function() {
            view.removeChild(view2);
            expect(view.childs.length).toBe(0);
        });

        it('Can execute some process before view removed.', function() {
            var spy = jasmine.createSpy('beforeRemove');
            view.removeChild(view2, spy);
            expect(spy).toHaveBeenCalledWith(view);
        });
    });

    describe('render', function() {
        var view2;

        beforeEach(function() {
            view = new View();
            view2 = new View();
            
            view.addChild(view2);
        });

        it('invoke render method recursivly.', function() {
            spyOn(view2, 'render');

            view.render();

            expect(view2.render).toHaveBeenCalled();
        });
    });

    describe('getViewBound()', function() {
        it('calculate view\'s container element bounds.', function() {
            view = new View(null, document.getElementById('container2'));
            expect(view.getViewBound()).toEqual({
                x: 10,
                y: 10,
                width: 250,
                height: 200
            });
            expect(view.getViewBound().x).not.toBe(50);

        });
    });

    describe('resize()', function() {
        it('can send recursivly to each parent instances.', function() {
            view._onResize = jasmine.createSpy('viewOnResize');
            var view2 = new View(null, document.getElementById('container3'));

            view.addChild(view2);
            view2.resize(view2);

            expect(view._onResize).toHaveBeenCalledWith(view2);
        });

        it('send resize message properly.', function() {
            view._onResize = jasmine.createSpy('viewOnResize');
            var view2 = new View(null, document.getElementById('container3'));
            var view3 = new View(null, document.getElementById('container4'));

            // view <- view2 <- view3
            view.addChild(view2);
            view2.addChild(view3);

            view3.resize(view3);
            expect(view._onResize).toHaveBeenCalledWith(view3);
        });
    });
});

