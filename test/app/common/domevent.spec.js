/*eslint-disable*/
var domevent = require('common/domevent');
describe('module:domevent', function() {
    beforeEach(function() {
        fixture.load('domevent.html');
    });

    afterEach(function() {
        fixture.cleanup();
    });

    describe('on()', function() {
        it('can set context for event handlers', function() {
            var myObj = {};
            var btn = document.getElementById('btn1');
            var clickHandler = function() {
                expect(this).toBe(myObj);
            };

            domevent.on(btn, 'click', clickHandler, myObj);
            domevent.trigger(btn, 'click');
        });

        it('Set event handler to DOM element', function() {
            var btn = document.getElementById('btn1');
            var clickHandler = jasmine.createSpy('click');

            domevent.on(btn, 'click', clickHandler);
            domevent.trigger(btn, 'click');

            expect(clickHandler).toHaveBeenCalled();
        });

        it('Event name: can also be set as handler object', function() {
            var btn = document.getElementById('btn1');
            var handler = jasmine.createSpyObj('handler', ['click', 'mousedown']);

            domevent.on(btn, {
                'click': handler.click,
                'mousedown': handler.mousedown
            });

            domevent.trigger(btn, 'mousedown');
            domevent.trigger(btn, 'click');

            expect(handler.click).toHaveBeenCalled();
            expect(handler.mousedown).toHaveBeenCalled();
        });

        it('Can not bind more than once with same parameter', function() {
            var btn = document.getElementById('btn1');

            var clickCount = 0;
            function clickHandler() {
                clickCount += 1;
            }

            domevent.on(btn, 'click', clickHandler);
            domevent.on(btn, 'click', clickHandler);

            domevent.trigger(btn, 'click');

            expect(clickCount).toBe(1);
        });

        it('Provides normalization of mouse wheel events for different browsers', function() {
            var div = document.getElementById('div1');

            function wheelHandler(eventData) {
                var wheel = domevent.getWheelDelta(eventData);
                expect(typeof wheel).toBe('number');
            }

            domevent.on(div, 'mousewheel', wheelHandler);

            domevent.trigger(div, 'mousewheel', domevent.mouseEvent('mousewheel', { detail: 120 }));
        });

    });

    describe('off()', function() {
        var btn,
            div,
            handler;

        beforeEach(function() {
            btn = document.getElementById('btn1');
            div = document.getElementById('div1');
            handler = jasmine.createSpyObj('handler', ['click', 'mousedown', 'mouseenter', 'mouseleave', 'mousewheel']);
        });

        it('Removes event handlers from the DOM', function() {
            domevent.on(btn, 'click', handler.click);

            domevent.off(btn, 'click', handler.click);
            domevent.trigger(btn, 'click');

            expect(handler.click).not.toHaveBeenCalled();
        });

        it('Event name: multiple handlers can be released at once using a handler object', function() {
            domevent.on(btn, {
                'click': handler.click,
                'mousedown': handler.mousedown,
                'mousewheel': handler.mousewheel
            });

            domevent.off(btn, {
                'click': handler.click,
                'mousedown': handler.mousedown,
                'mousewheel': handler.mousewheel
            });
            domevent.trigger(btn, 'mousedown');
            domevent.trigger(btn, 'click');
            domevent.trigger(btn, 'mousewheel', domevent.mouseEvent('mousewheel', { detail: 120 }));

            expect(handler.click).not.toHaveBeenCalled();
            expect(handler.mousedown).not.toHaveBeenCalled();
            expect(handler.mousewheel).not.toHaveBeenCalled();

            domevent.on(div, {
                'mouseenter': handler.mouseenter,
                'mouseleave': handler.mouseleave
            });

            domevent.off(div, {
                'mouseenter': handler.mouseenter,
                'mouseleave': handler.mouseleave
            });

            domevent.trigger(div, 'mouseenter');
            domevent.trigger(div, 'mouseleave');

            expect(handler.mouseenter).not.toHaveBeenCalled();
            expect(handler.mouseleave).not.toHaveBeenCalled();
        });

        it('When all the registered events are released, the related property is completely removed.', function() {
            domevent.on(btn, {
                'click': handler.click,
                'mousedown': handler.mousedown,
                'mousewheel': handler.mousewheel
            });

            domevent.off(btn, {
                'click': handler.click,
                'mousedown': handler.mousedown,
                'mousewheel': handler.mousewheel
            });

            expect(btn._evt).toBeFalsy();
        });
    });

    describe('once()', function() {
        var btn;

        beforeEach(function() {
            btn = document.getElementById('btn1');
        });

        it('Event can be registered as a single event', function() {
            var clickCount = 0;
            function clickHandler() {
                clickCount += 1;
            }

            domevent.once(btn, 'click', clickHandler);

            domevent.trigger(btn, 'click');
            domevent.trigger(btn, 'click');

            expect(clickCount).toBe(1);
        });

        it('Event name: It is possible to register multiple handlers at once with one handler object', function() {
            var clickCount = 0,
                mouseDownCount = 0;

            function clickHandler() {
                clickCount += 1;
            }

            function mouseDownHandler() {
                mouseDownCount += 1;
            }

            domevent.once(btn, {
                'click': clickHandler,
                'mousedown': mouseDownHandler
            });

            domevent.trigger(btn, 'click');
            domevent.trigger(btn, 'click');
            domevent.trigger(btn, 'mousedown');
            domevent.trigger(btn, 'mousedown');

            expect(clickCount).toBe(1);
            expect(mouseDownCount).toBe(1);
        });
    });

    it('stopPropagation() prevents bubbling of events', function() {
        var wrap1 = document.getElementById('wrap1'),
            wrap2 = document.getElementById('wrap2');

        var handler = jasmine.createSpy('wrap1click');

        function wrap2click(e) {
            domevent.stopPropagation(e);
        }

        domevent.on(wrap1, 'click', handler);
        domevent.on(wrap2, 'click', wrap2click);

        domevent.trigger(wrap2, 'click');

        expect(handler).not.toHaveBeenCalled();
    });

    it('If you pass a container to getMousePosition(), you can easily calculate the mouse position based on a specific element', function() {
        var wrap1 = document.getElementById('wrap1'),
            wrap2 = document.getElementById('wrap2');

        function clickHandler(clickEvent) {
            var point = domevent.getMousePosition(clickEvent),
                relativePoint = domevent.getMousePosition(clickEvent, wrap2);

            expect(point).toEqual([30, 30]);
            expect(relativePoint).toEqual([0, 10]);
        }

        domevent.on(wrap2, 'click', clickHandler);

        domevent.trigger(wrap2, 'click', domevent.mouseEvent('click', { clientX: 30, clientY: 30 }));
    });

});
