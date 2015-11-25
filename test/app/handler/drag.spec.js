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
        var mockInst;


        beforeEach(function() {
            spyOn(ne.dooray.calendar.domevent, 'getMouseButton').and.returnValue(0);

            mockInst = jasmine.createSpyObj('Drag', ['invoke', 'fire', '_toggleDragEvent', '_getEventData', '_clearData']);
            mockInst._getEventData = Drag.prototype._getEventData;
            mockInst._distance = 0;
            mockInst._dragStartFired = false;
        });

        it('_dragStart fired only once every drag sessions.', function() {
            mockInst.options = {
                distance: 10
            };

            mockInst._distance = 9;

            var mockEvent = {
                target: 'hello'
            };

            mockInst.invoke.and.returnValue(true);
            Drag.prototype._onMouseDown.call(mockInst, mockEvent);

            // 9px 움직였다고 가정
            mockInst._distance = 9;
            Drag.prototype._onMouseMove.call(mockInst, mockEvent);
            Drag.prototype._onMouseMove.call(mockInst, mockEvent);
            Drag.prototype._onMouseMove.call(mockInst, mockEvent);
            Drag.prototype._onMouseMove.call(mockInst, mockEvent);

            expect(mockInst.invoke.calls.count()).toBe(1);
        });

        it('can ignore specific condition by exclude option.', function() {
            mockInst.options = {
                distance: 0,
                exclude: function(target) {
                    return target === 'hello';
                }
            };

            var mockEvent = {
                target: 'hello'
            };

            mockInst.invoke.and.returnValue(true);
            Drag.prototype._onMouseDown.call(mockInst, mockEvent);
            Drag.prototype._onMouseMove.call(mockInst, mockEvent);

            expect(mockInst.invoke).not.toHaveBeenCalled();
        });

        it('makes custom event data from mousedown events', function() {
            mockInst.options = {
                distance: 10
            };

            mockInst._distance = 10;

            var mockEvent = {
                target: 'hello'
            };

            mockInst.invoke.and.returnValue(true);
            Drag.prototype._onMouseDown.call(mockInst, mockEvent);

            // 10px 이동했다고 가정
            mockInst._distance = 10;
            Drag.prototype._onMouseMove.call(mockInst, mockEvent);

            expect(mockInst.invoke).toHaveBeenCalledWith('dragStart', {
                target: 'hello',
                originEvent: mockEvent
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

