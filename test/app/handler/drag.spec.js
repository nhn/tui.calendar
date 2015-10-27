/*eslint-disable*/
var Drag = ne.dooray.calendar.Drag;
describe('Handler/Drag', function() {
    describe('_onMouseUp', function() {
        it('emit "click" when not emitted drag event between mousedown and mousedown', function() {
            spyOn(ne.dooray.calendar.domevent, 'preventDefault');
            var mock = {
                options: {
                    distance: 10
                },
                _distance: 0,
                _isMoved: false,
                _toggleDragEvent: function() {},
                fire: jasmine.createSpy('Handler/Drag'),
                _getEventData: Drag.prototype._getEventData
            };

            Drag.prototype._onMouseUp.call(mock, 'hello');
            expect(mock.fire).toHaveBeenCalledWith('click', {
                target: undefined,
                originEvent: 'hello'
            });

            // alternative to mock._isMoved = true;
            Drag.prototype._onMouseMove.call(mock, 'hello');

            Drag.prototype._onMouseUp.call(mock, 'hello');
            expect(mock.fire).toHaveBeenCalledWith('dragEnd', {
                target: undefined,
                originEvent: 'hello'
            });
        });
    });

    describe('dragging', function() {
        beforeEach(function() {
            spyOn(ne.dooray.calendar.domevent, 'getMouseButton').and.returnValue(0);
        });

        it('_dragStart fired only once every drag sessions.', function() {
            var mock = {
                options: {
                    distance: 10
                },
                _distance: 9, 
                _dragStartFired: false,
                invoke: jasmine.createSpy('Handler/Drag'),
                fire: jasmine.createSpy('fire'),
                _toggleDragEvent: function() {},
                _getEventData: Drag.prototype._getEventData
            };
            var input = {
                iam: 'mouseEvent',
                target: 'hello'
            };

            mock.invoke.and.returnValue(true);
            Drag.prototype._onMouseDown.call(mock, input);
            // 9px 움직였다고 가정
            mock._distance = 9;
            Drag.prototype._onMouseMove.call(mock, input);
            Drag.prototype._onMouseMove.call(mock, input);
            Drag.prototype._onMouseMove.call(mock, input);
            Drag.prototype._onMouseMove.call(mock, input);

            expect(mock.invoke.calls.count()).toBe(1);
        });

        it('makes custom event data from mousedown events', function() {
            var mock = {
                options: {
                    distance: 10
                },
                _distance: 10,
                _dragStartFired: false,
                invoke: jasmine.createSpy('Handler/Drag'),
                fire: jasmine.createSpy('fire'),
                _toggleDragEvent: function() {},
                _getEventData: Drag.prototype._getEventData
            };
            var input = {
                iam: 'mouseEvent',
                target: 'hello'
            };

            mock.invoke.and.returnValue(true);
            Drag.prototype._onMouseDown.call(mock, input);
            // 10px 이동했다고 가정
            mock._distance = 10;
            Drag.prototype._onMouseMove.call(mock, input);

            expect(mock.invoke).toHaveBeenCalledWith('dragStart', {
                target: 'hello',
                originEvent: input
            });
        });

        it('return false when implemented dragStart handler then stop drag.', function() {
            var mock = {
                options: {
                    distance: 10
                },
                _distance: 10,
                invoke: jasmine.createSpy('Handler/Drag'),
                _toggleDragEvent: jasmine.createSpy('Handler/Drag#_toggleDragEvent'),
                _getEventData: Drag.prototype._getEventData
            };

            mock.invoke.and.returnValue(false);

            Drag.prototype._onMouseMove.call(mock, {});

            expect(mock._toggleDragEvent).toHaveBeenCalled();
        });

        it('only primary mouse button can start drag events.', function() {
            ne.dooray.calendar.domevent.getMouseButton.and.returnValue(1);

            var mock = {
                options: {
                    distance: 10
                },
                _distance: 0,
                invoke: jasmine.createSpy('Handler/Drag'),
                _toggleDragEvent: jasmine.createSpy('Handler/Drag#_toggleDragEvent'),
                _getEventData: Drag.prototype._getEventData
            };

            mock.invoke.and.returnValue(true);
            Drag.prototype._onMouseDown.call(mock, {});

            expect(mock._toggleDragEvent).not.toHaveBeenCalled();
        });
    });

    describe('_toggleDragEvent', function() {
        beforeEach(function() {
            spyOn(ne.dooray.calendar.domutil, 'enableTextSelection');
            spyOn(ne.dooray.calendar.domutil, 'disableTextSelection');
            spyOn(ne.dooray.calendar.domutil, 'enableImageDrag');
            spyOn(ne.dooray.calendar.domutil, 'disableImageDrag');
            spyOn(ne.dooray.calendar.domevent, 'on');
            spyOn(ne.dooray.calendar.domevent, 'off');
        });

        it('toggle events for drags', function() {
            Drag.prototype._toggleDragEvent(true);
            expect(ne.dooray.calendar.domutil.disableTextSelection).toHaveBeenCalled();

            Drag.prototype._toggleDragEvent(false);
            expect(ne.dooray.calendar.domevent.off).toHaveBeenCalled();
        });
    });
});

