/*eslint-disable*/
var Collection = require('common/collection');

describe('Collection', function() {
    var undef = (function() {})(),
        c;

    beforeEach(function() {
        c = new Collection();
    });

    describe('constructor()', function() {
        it('can customize method that extract ID from item.', function() {
            var col = new Collection(function(item) {
                return item.myID;
            });

            col.add({ myID: 3 });
            expect(col.items['3']).toEqual({ myID: 3 });
        });
    });

    describe('getItemID()', function() {
        it('get ID from item.', function() {
            var item = { _id: 7 };
            expect(c.getItemID(item)).toBe('7');
        });
    });

    describe('add()', function() {
        it('add item to collection.', function() {
            c.add({ _id: 25 });
            expect(c.length).toBe(1);
            expect(c.items['25']).toBeDefined();
        });

        it('add duplicated model then overwrite it.', function() {
            c.add({ _id: 25 });
            c.add({ _id: 25, hello: 'world' });
            expect(c.items['25'].hello).toBe('world');
        });

        it('can use multiple arguments item.', function() {
            c.add({ _id: 2 }, { _id: 4 });

            expect(c.length).toBe(2);
            expect(c.items).toEqual({ '2': { _id: 2 }, '4': { _id: 4 } });
        });
    });

    describe('remove()', function() {
        var item1,
        item2,
        item3;

        beforeEach(function() {
            item1 = { _id: 1 };
            item2 = { _id: 2 };
            item3 = { _id: 4 };

            c.add(item1, item2, item3);
        });

        it('method don\'t work when collection is empty', function() {
            var col = new Collection();
            col.remove(2);
            expect(col.length).toBe(0);
        });

        it('can\'t delete other item', function() {
            c.remove(3);
            expect(c.length).toBe(3);
        });

        it('remove own item.', function() {
            expect(c.remove(2)).toBe(item2);
            expect(c.length).toBe(2);
        });

        it('can remove multiple item.', function() {
            expect(c.remove(1, 2)).toEqual([item1, item2]);
            expect(c.length).toBe(1);
        });

        it('also accept item itself.', function() {
            c.remove(item1, item2);
            expect(c.length).toBe(1);
            expect(c.items['4']).toBe(item3);
            expect(c.items['2']).toBeUndefined();
        });
    });

    describe('clear()', function() {
        var item1,
        item2,
        item3;

        beforeEach(function() {
            item1 = { _id: 1 };
            item2 = { _id: 2 };
            item3 = { _id: 4 };

            c.add(item1, item2, item3);
        });

        it('method don\'t work when collection is empty', function() {
            var col = new Collection();
            col.clear();
            expect(col.length).toBe(0);
        });

        it('remove all of collection items.', function() {
            c.clear();
            expect(c.length).toBe(0);
            expect(c.items).toEqual({});
        });
    });

    describe('has()', function() {
        var item1,
        item2,
        item3;

        beforeEach(function() {
            item1 = { _id: 1 };
            item2 = { _id: 2 };
            item3 = { _id: 4 };

            c.add(item1, item2, item3);
        });

        it('method don\'t work when collection is empty', function() {
            var col = new Collection();
            expect(col.has(item1)).toBe(false);
        });

        it('return true when collection has that object.', function() {
            expect(c.has(item1)).toBe(true);
            expect(c.has({})).toBe(false);
        });

        it('check item existance by id.', function() {
            expect(c.has(2)).toBe(true);
            expect(c.has(14)).toBe(false);
        });

        it('can use filter function instead of id.', function() {
            var callCount = 0;

            expect(c.has(function(item) {
                callCount += 1;
                return item._id === 2;
            })).toBe(true);

            expect(callCount).toBe(2);

            expect(c.has(function(item) {
                return item.name === '123';
            })).toBe(false);
        });
    });

    describe('find()', function() {
        var item1,
        item2,
        item3;

        beforeEach(function() {
            item1 = { _id: 1, value: 20 };
            item2 = { _id: 2, value: 50 };
            item3 = { _id: 4, value: 2 };

            c.add(item1, item2, item3);
        });

        it('return new collection that filled with filtered items.', function() {
            var filtered = c.find(function(item) {
                return item.value >= 20;
            });

            expect(filtered.length).toBe(2);
        });

        it('when collection\'s getItemID customized. then return collection has same func.', function() {
            var cust = function(item) {
                return item.ID;
            };
            var col = new Collection(cust);

            col.add({ ID: 3 });

            var filtered = col.find(function(item) {
                return item.ID === 3;
            });

            expect(filtered.getItemID === cust).toBe(true);
        });
    });

    describe('Collection.and()', function() {
        var item1,
            item2,
            item3;

        beforeEach(function() {
            item1 = { _id: 1, value: 20 };
            item2 = { _id: 2, value: 50 };
            item3 = { _id: 4, value: 2 };

            c.add(item1, item2, item3);
        });

        it('combind multiple function filter AND clause.', function() {
            function filter1(item) {
                return item._id === 2;
            }

            function filter2(item) {
                return item.value === 50;
            }

            function filter3(item) {
                return item.label === '';
            }

            var combinedFilter = Collection.and(filter1, filter2);
            var result = c.find(combinedFilter);

            var expected = new Collection();
            expected.add(item2);
            expect(result).toEqual(expected);

            result = c.find(Collection.and(filter1, filter2, filter3));
            expect(result.length).toBe(0);

            expect(c.find(combinedFilter).length).toBe(1);
        });
    });

    describe('Collection.or()', function() {
        var item1,
            item2,
            item3;

        beforeEach(function() {
            item1 = { _id: 1, value: 20 };
            item2 = { _id: 2, value: 50 };
            item3 = { _id: 4, value: 2 };

            c.add(item1, item2, item3);
        });

        it('combine multiple function filter with OR clause.', function() {
            function filter1(item) {
                return item._id === 2;
            }

            function filter2(item) {
                return item.value === 2;
            }

            var combined = Collection.or(filter1, filter2);
            var result = c.find(combined);

            expect(result.length).toBe(2);
            expect(result.has(1)).toBe(false);

            expect(c.find(function(model) { return model._id === 2 || model.value === 2; })).toEqual(result);
        });
    });

    describe('Mixed and(), or() filter', function() {
        var item1,
            item2,
            item3;

        beforeEach(function() {
            item1 = { _id: 1, value: 20 };
            item2 = { _id: 2, value: 50 };
            item3 = { _id: 4, value: 2 };
            item4 = { _id: 5, value: 50 };

            c.add(item1, item2, item3, item4);
        });

        it('mixed and, or filter also available for find()', function() {
            function filter1(item) {
                return item.value === 20;
            }
            function filter2(item) {
                return item._id === 1;
            }
            function filter3(item) {
                return item.value === 50;
            }

            var or = Collection.or(filter1, filter3);
            var and = Collection.and(filter2, or);
            // _id === 1 && ( value === 20 || value === 50 )

            var result = c.find(and);

            expect(c.find(function(model) {
                return model._id === 1 &&
                    (model.value === 20 || model.value === 50);
            })).toEqual(result);
        });

        it('mixed and, or combined filter2', function() {
            function filter1(item) {
                return item.value === 50;
            }
            function filter2(item) {
                return item._id === 2;
            }
            function filter3(item) {
                return item._id === 5;
            }
            var or = Collection.or(filter2, filter3);
            var and = Collection.and(or, filter1);
            var result = c.find(and);
            expect(c.find(function(model) {
                return (model._id === 2 || model._id === 5) && model.value === 50;
            })).toEqual(result);
        });
    });

    describe('groupBy()', function() {
        var item1,
        item2,
        item3;

        beforeEach(function() {
            item1 = {_id: 1, value: 20, isGood: false, '30': 'a', 'true': 'c', no: function() { return this.value; }};
            item2 = {_id: 2, value: 50, isGood: true, '30': 'b', 'true': 'c', no: function() { return this.value; }};
            item3 = {_id: 4, value: 2, isGood: true, '30': 'b', 'true': 'd', no: function() { return this.value; }};

            c.add(item1, item2, item3);
        });

        it('group all elements by number values.', function() {
            var grouped = c.groupBy('value');

            var c1 = new Collection(c.getItemID);
            c1.add(item1);
            var c2 = new Collection(c.getItemID);
            c2.add(item2);
            var c3 = new Collection(c.getItemID);
            c3.add(item3);

            expect(grouped).toEqual({
                '20': c1,
                '50': c2,
                '2': c3
            });
        });

        it('group by number property', function() {
            var grouped = c.groupBy(30);

            var c1 = new Collection(c.getItemID);
            c1.add.apply(c1, [item1]);
            var c2 = new Collection(c.getItemID);
            c2.add.apply(c2, [item2, item3]);

            expect(grouped.a).toEqual(c1);
            expect(grouped.b).toEqual(c2);
        });

        it('group by boolean values.', function() {
            var grouped = c.groupBy('isGood');

            var c1 = new Collection(c.getItemID);
            c1.add(item1);
            var c2 = new Collection(c.getItemID);
            c2.add(item2, item3);

            expect(grouped).toEqual({
                'false': c1,
                'true': c2
            });
        });

        it('if base value is function then use returned value', function() {
            var grouped = c.groupBy('no');

            var c1 = new Collection(c.getItemID);
            c1.add(item1);
            var c2 = new Collection(c.getItemID);
            c2.add(item2);
            var c3 = new Collection(c.getItemID);
            c3.add(item3);

            expect(grouped).toEqual({
                '20': c1,
                '50': c2,
                '2': c3
            });
        });

        it('group by custom functions', function() {
            var grouped = c.groupBy(function(item) {
                return item.value > 10 ? 'upper' : 'lower';
            });

            var c1 = new Collection(c.getItemID);
            c1.add.apply(c1, [item1, item2]);
            var c2 = new Collection(c.getItemID);
            c2.add.apply(c2, [item3]);

            expect(grouped.upper).toEqual(c1);
            expect(grouped.lower).toEqual(c2);
        });

        it('create each collection with keys when array of key values supplied by first arguments.', function() {
            var grouped = c.groupBy(['20', '50']);

            expect(grouped['20'].constructor).toBe(Collection);
            expect(grouped['50'].constructor).toBe(Collection);

            // can supply group function after key array.
            grouped = c.groupBy(['20', '50'], function (item) {
                return item.value + '';
            });

            var c1 = new Collection(c.getItemID);
            c1.add(item1);
            var c2 = new Collection(c.getItemID);
            c2.add(item2);
            var c3 = new Collection(c.getItemID);
            c3.add(item3);
            expect(grouped).toEqual({
                '20': c1,
                '50': c2,
                '2': c3
            });
        });
    });

    describe('sort()', function() {
        var item1,
        item2,
        item3;

        beforeEach(function() {
            item1 = { _id: 1, value: 20 };
            item2 = { _id: 2, value: 50 };
            item3 = { _id: 4, value: 2 };

            c.add(item1, item2, item3);
        });

        it('no sort when compareFunction not supplied.', function() {
            var arr = c.sort();

            expect(arr).toEqual([
                    item1,
                    item2,
                    item3
            ]);
        });

        it('sort own items by given compare function.', function() {
            var arr = c.sort(function(a, b) {
                if (a.value < b.value) {
                    return -1;
                } else if (a.value === b.value) {
                    return 0;
                } else {
                    return 1;
                }
            });

            expect(arr[0]).toBe(item3);
            expect(arr[1]).toBe(item1);
            expect(arr[2]).toBe(item2);
        });
    });

    describe('each()', function() {
        var item1,
        item2,
        item3,
            spy;

        beforeEach(function() {
            item1 = { _id: 1, value: 20 };
            item2 = { _id: 2, value: 50 };
            item3 = { _id: 4, value: 2 };

            c.add(item1, item2, item3);

            spy = jasmine.createSpy('each');
        });

        it('iterate own items.', function() {
            c.each(spy);

            expect(spy.calls.argsFor(2)).toEqual(
                    jasmine.arrayContaining([{ _id: 4, value: 2 }, '4'])
                    );
        });

        it('break loop when iteratee return false.', function() {
            spy.and.callFake(function(item) {
                if (item.value === 50) {
                    return false;
                }
            });

            c.each(spy);

            expect(spy.calls.count()).toBe(2);
            expect(spy.calls.argsFor(2)).toEqual([]);
        });
    });

    describe('doWhenHas()', function() {
        it('invoke supplied method when collection has model.', function() {
            var item1 = { _id: 1 };
            var spy1 = jasmine.createSpy('spy1');
            var spy2 = jasmine.createSpy('spy2');

            c.add(item1);

            c.doWhenHas(1, spy1);
            c.doWhenHas(2, spy2);

            expect(spy1).toHaveBeenCalledWith(item1);
            expect(spy2).not.toHaveBeenCalled();
        });
    });

    describe('single()', function() {
        it('return single element in collection.', function() {
            var item1 = {_id:1},
                item2 = {_id:2},
                item3 = {_id:5};

            c.add(item3, item2, item1);

            expect([item1, item2, item3]).toContain(c.single());
        });

        it('return first single item that meet with supplied function filter', function() {
            var item1 = {_id:1},
                item2 = {_id:2},
                item3 = {_id:5};

            c.add(item3, item2, item1);

            var result = c.single(function(model) {
                return model._id === 2;
            });

            expect(result).toBe(item2);
        });

        it('return undefined when no item.', function() {
            var item1 = {_id:1};

            expect(c.single()).toBe(undef);

            c.add(item1);

            expect(c.single(function() { return false; })).toBe(undef);
        });
    });

    describe('merge()', function() {
        it('return new collection with merged supplied collections.', function() {
            var item1 = {_id:1},
                item2 = {_id:2},
                item3 = {_id:5},
                c2 = new Collection();

            c.add(item1);
            c2.add(item2, item3);

            var merged = Collection.merge(c, c2);
            expect(merged.length).toBe(3);
            expect(merged.items).toEqual({
                1: item1,
                2: item2,
                5: item3
            });
        });

        it('newly create collection has same getItemIDFn with first argumented collection.', function() {
            var item1 = {_id:1},
                item2 = {_id:2},
                item3 = {_id:5},
                c2 = new Collection();

            c.add(item1);
            c2.add(item2, item3);

            var merged = Collection.merge(c, c2);

            expect(merged.getItemID).toBe(c.getItemID);
        });

        it('item with same id did not affect total item counts', function() {
            var item1 = {_id:1},
                item2 = {_id:2},
                item3 = {_id:5},
                item4 = {_id:1, hello: 'world'},
                item5 = {_id:2},
                item6 = {_id:5},
                c2 = new Collection();

            c.add(item1, item2, item3);
            c2.add(item4, item5, item6);

            var merged = Collection.merge(c, c2);

            expect(merged.length).toBe(3);
            expect(merged.items['1']).toEqual({_id: 1, hello: 'world'});
        });
    });

    describe('toArray()', function() {
        it('return new array with collection items.', function() {
            var item1 = {_id:1},
                item2 = {_id:2},
                item3 = {_id:5};

            c.add(item1, item2, item3);
            expect(c.toArray()).toEqual([item1, item2, item3]);
        });
    });
});

