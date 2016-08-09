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

        it('DOM엘리먼트에 이벤트 핸들러를 설정한다', function() {
            var btn = document.getElementById('btn1');
            var clickHandler = jasmine.createSpy('click');

            domevent.on(btn, 'click', clickHandler);
            domevent.trigger(btn, 'click');

            expect(clickHandler).toHaveBeenCalled();
        });

        it('이벤트명:핸들러 객체로도 설정할 수 있다', function() {
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

        it('동일 파라미터로 두번 이상 바인딩 불가', function() {
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

        it('브라우저마다 다른 마우스 휠 이벤트의 정규화 기능을 제공한다', function() {
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

        it('DOM에 걸린 이벤트 핸들러를 제거한다', function() {
            domevent.on(btn, 'click', handler.click);

            domevent.off(btn, 'click', handler.click);
            domevent.trigger(btn, 'click');

            expect(handler.click).not.toHaveBeenCalled();
        });

        it('이벤트명:핸들러 객체를 사용해 한번에 여러 핸들러를 해제할 수 있다', function() {
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

        it('등록된 이벤트가 전부 해제되면 관련 프로퍼티를 아예 제거한다.', function() {
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

        it('이벤트를 단발성으로 등록할 수 있다', function() {
            var clickCount = 0;
            function clickHandler() {
                clickCount += 1;
            }

            domevent.once(btn, 'click', clickHandler);

            domevent.trigger(btn, 'click');
            domevent.trigger(btn, 'click');

            expect(clickCount).toBe(1);
        });

        it('이벤트명:핸들러의 객체로 여러 핸들러를 단발성으로 한번에 등록할 수 있다', function() {
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

    it('stopPropagation() 으로 이벤트의 버블링을 방지할 수 있다', function() {
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

    it('getMousePosition()에 컨테이너를 넘기면 특정 엘리먼트 기준의 마우스 위치를 쉽게 계산할 수 있다', function() {
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
