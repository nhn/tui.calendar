var LinkedList = ne.dooray.calendar.LinkedList;
describe('LinkedList', function() {
    var inst;

    beforeEach(function() {
        inst = new LinkedList();
    });

    it('_traverse', function() {
        var mockInst = {
            _list: {
                1: 'one',
                2: 'two',
                4: 'four',
                5: 'five'
            },
            _removed: {
                3: true
            }
        };

        var actual = LinkedList.prototype._traverse.call(mockInst, 4);
        expect(actual).toEqual(['two', 'five']);
        
        actual = LinkedList.prototype._traverse.call(mockInst, 2);
        expect(actual).toEqual(['one', 'four']);

        actual = LinkedList.prototype._traverse.call(mockInst, 1);
        expect(actual).toEqual([undefined, 'two']);

        actual = LinkedList.prototype._traverse.call(mockInst, 5);
        expect(actual).toEqual(['four', undefined]);

        actual = LinkedList.prototype._traverse.call(mockInst, 7);
        expect(actual).toEqual([undefined, undefined]);

        mockInst = {
            _list: {
                1: 'good'
            },
            _removed: {}
        };

        actual = LinkedList.prototype._traverse.call(mockInst, 1);
        expect(actual).toEqual([undefined, undefined]);
    });

    describe('Add, Remove test', function() {
        it('add object to linked list.', function() {
            var myObj = {
                hello: 'world'
            };

            var item = inst.add(myObj);

            expect(item.next).toBeDefined();
            expect(item.next()).toBeUndefined();
        });

        it('remove object from linked list.', function() {
            var myObj = {
                hello: 'world'
            };

            var item = inst.add(myObj);

            expect(item.data).toBe(myObj);

            inst.remove(item);

            expect(inst._list).toEqual({});
        });

        it('add multiple object', function() {
            var obj = {order: 1},
                obj2 = {order: 2},
                obj3 = {order: 3};

            obj = inst.add(obj);
            obj2 = inst.add(obj2);
            obj3 = inst.add(obj3);

            expect(inst.length).toBe(3);
            expect(obj2.next()).toBe(obj3);
            expect(obj3.next()).toBe(undefined);
            expect(obj.prev()).toBe(undefined);
        });

        it('remove test', function() {
            var obj = {order: 1},
                obj2 = {order: 2},
                obj3 = {order: 3};

            obj = inst.add(obj);
            obj2 = inst.add(obj2);
            obj3 = inst.add(obj3);

            inst.remove(obj2);

            expect(inst.length).toBe(2);
            expect(obj.next()).toBe(obj3);
            expect(obj3.prev()).toBe(obj);
            expect(obj.prev()).toBeUndefined();

            inst.remove(obj);

            expect(inst.length).toBe(1);
            expect(obj3.next()).toBeUndefined();
            expect(obj3.prev()).toBeUndefined();

            expect(inst._removed).toEqual({
                0: true,
                1: true
            });
        });
    });
});

