var LinkedListItem = ne.dooray.calendar.LinkedListItem;
describe('LinkedListItem', function() {
    var inst,
        inst2,
        inst3;

    beforeEach(function() {
        inst = new LinkedListItem(0, {order: 1});
        inst2 = new LinkedListItem(1, {order: 2});
        inst3 = new LinkedListItem(2, {order: 3});

        inst._next = inst2;
        inst2._prev = inst;
        inst2._next = inst3;
        inst3._prev = inst2;
    });

    describe('next()', function() {
        it('get next linkedlist item.', function() {
            expect(inst2.next()).toBe(inst3);
        });

        it('get next item that fullfill filter function conditions.', function() {
            expect(inst.next(function(item) { 
                return item.data.order === 3; 
            }).data).toBe(inst3.data);
        });
    });

    describe('prev()', function() {
        it('get next linkedlist item.', function() {
            expect(inst2.prev()).toBe(inst);
        });

        it('get next item that fullfill filter function conditions.', function() {
            expect(inst3.prev(function(item) {
                return item.data.order === 1; 
            }).data).toBe(inst.data);
        });

        it('no throw error when instance has not next items', function() {
            expect(function() {
                inst3.next();
            }).not.toThrow();

            expect(function() {
                inst3.next(function(item) {
                    return item.data.order === 1;
                });
            }).not.toThrow();
        });
    });
});
