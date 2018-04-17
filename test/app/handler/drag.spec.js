/*eslint-disable*/
var domutil = require('common/domutil');
var domevent = require('common/domevent');
var Drag = require('handler/drag');

describe('Handler/Drag', function() {
    var mockInst;

    beforeEach(function() {
        mockInst = jasmine.createSpyObj('Drag', ['invoke', 'fire', '_toggleDragEvent', '_getEventData', '_clearData']);
        mockInst._getEventData = Drag.prototype._getEventData;
        mockInst._distance = 0;
        mockInst._dragStartFired = false;
    });

    describe('_onMouseUp', function() {

        it('emit "click" when not emitted drag event between mousedown and mousedown', function() {
            var i, length;
            spyOn(domevent, 'preventDefault');
            mockInst.options = {
                distance: 10
            };
            mockInst._isMoved = false;

            Drag.prototype._onMouseUp.call(mockInst, 'hello');
            expect(mockInst.fire).toHaveBeenCalledWith('click', {
                target: undefined,
                originEvent: 'hello'
            });

            // alternative to mockInst._isMoved = true;
            length = mockInst.options.distance + 1;
            for (i = 0; i < length; i += 1) {
                Drag.prototype._onMouseMove.call(mockInst, 'hello');
            }

            Drag.prototype._onMouseUp.call(mockInst, 'hello');
            expect(mockInst.fire).toHaveBeenCalledWith('dragEnd', {
                target: undefined,
                originEvent: 'hello'
            });
        });
    });

    describe('dragging', function() {
        beforeEach(function() {
            spyOn(domevent, 'getMouseButton').and.returnValue(0);
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

            // Assuming 9px moved
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

            // Assumed 10px moved
            mockInst._distance = 10;
            Drag.prototype._onMouseMove.call(mockInst, mockEvent);

            expect(mockInst.invoke).toHaveBeenCalledWith('dragStart', {
                target: 'hello',
                originEvent: mockEvent
            });
        });

        it('return false when implemented dragStart handler then stop drag.', function() {
            mockInst.options = {
                distance: 10
            };
            mockInst._distance = 10;

            mockInst.invoke.and.returnValue(false);
            Drag.prototype._onMouseMove.call(mockInst, {});
            expect(mockInst._toggleDragEvent).toHaveBeenCalled();
        });

        it('only primary mouse button can start drag events.', function() {
            domevent.getMouseButton.and.returnValue(1);

            mockInst.options = {
                distance: 10
            };

            mockInst.invoke.and.returnValue(true);
            Drag.prototype._onMouseDown.call(mockInst, {});

            expect(mockInst._toggleDragEvent).not.toHaveBeenCalled();
        });
    });

    describe('_toggleDragEvent', function() {
        beforeEach(function() {
            spyOn(domutil, 'enableTextSelection');
            spyOn(domutil, 'disableTextSelection');
            spyOn(domutil, 'enableImageDrag');
            spyOn(domutil, 'disableImageDrag');
            spyOn(domevent, 'on');
            spyOn(domevent, 'off');
        });

        it('toggle events for drags', function() {
            Drag.prototype._toggleDragEvent(true);
            expect(domutil.disableTextSelection).toHaveBeenCalled();

            Drag.prototype._toggleDragEvent(false);
            expect(domevent.off).toHaveBeenCalled();
        });
    });
});
