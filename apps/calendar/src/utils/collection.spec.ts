import Collection from '@src/utils/collection';

type Item = Record<string, any>;

describe('Collection', () => {
  let c: Collection<Item>;

  beforeEach(() => {
    c = new Collection<Item>();
  });

  describe('constructor()', () => {
    it('can customize method that extract ID from item.', () => {
      const col = new Collection(function (item) {
        return item.myID;
      });

      col.add({ myID: 3 });

      expect(col.get(3)).toEqual({ myID: 3 });
    });
  });

  describe('getItemID()', () => {
    it('get ID from item.', () => {
      const item = { _id: 7 };

      expect(c.getItemID(item)).toBe(7);
    });
  });

  describe('getFirstItem()', () => {
    it('get the first item.', () => {
      c.add({ _id: 1 }, { _id: 2 });

      expect(c.getFirstItem()).toEqual({ _id: 1 });

      c.remove(1);

      expect(c.getFirstItem()).toEqual({ _id: 2 });
    });
  });

  describe('add()', () => {
    it('add item to collection.', () => {
      c.add({ _id: 25 });

      expect(c.size).toBe(1);
      expect(c.get(25)).toBeDefined();
    });

    it('add duplicated model then overwrite it.', () => {
      c.add({ _id: 25 });
      c.add({ _id: 25, hello: 'world' });

      const item = c.get(25);
      expect(item).toBeDefined();
      expect(item?.hello).toBe('world');
    });

    it('can use multiple arguments item.', () => {
      c.add({ _id: 2 }, { _id: 4 });

      expect(c.size).toBe(2);
      expect(c.get(2)).toEqual({ _id: 2 });
      expect(c.get(4)).toEqual({ _id: 4 });
    });
  });

  describe('remove()', () => {
    let item1: Item;
    let item2: Item;
    let item3: Item;

    beforeEach(() => {
      item1 = { _id: 1 };
      item2 = { _id: 2 };
      item3 = { _id: 4 };

      c.add(item1, item2, item3);
    });

    it("method doesn't work when collection is empty", () => {
      const col = new Collection();
      col.remove(2);

      expect(col.size).toBe(0);
    });

    it("can't delete other item", () => {
      c.remove(3);

      expect(c.size).toBe(3);
    });

    it('remove own item.', () => {
      expect(c.remove(2)).toBe(item2);
      expect(c.size).toBe(2);
    });

    it('can remove multiple item.', () => {
      expect(c.remove(1, 2)).toEqual([item1, item2]);
      expect(c.size).toBe(1);
    });

    it('also accept item itself.', () => {
      c.remove(item1, item2);

      expect(c.size).toBe(1);
      expect(c.get(4)).toBe(item3);
      expect(c.get(2)).toBeNull();
    });
  });

  describe('has()', () => {
    let item1: Item;
    let item2: Item;
    let item3: Item;

    beforeEach(() => {
      item1 = { _id: 1 };
      item2 = { _id: 2 };
      item3 = { _id: 4 };

      c.add(item1, item2, item3);
    });

    it("method doesn't work when collection is empty", () => {
      const col = new Collection();

      expect(col.has(item1)).toBe(false);
    });

    it('return true when collection has that object.', () => {
      expect(c.has(item1)).toBe(true);
      expect(c.has({})).toBe(false);
    });

    it('check item existance by id.', () => {
      expect(c.has(2)).toBe(true);
      expect(c.has(14)).toBe(false);
    });
  });

  describe('filter()', () => {
    let item1: Item;
    let item2: Item;
    let item3: Item;

    beforeEach(() => {
      item1 = { _id: 1, value: 20 };
      item2 = { _id: 2, value: 50 };
      item3 = { _id: 4, value: 2 };

      c.add(item1, item2, item3);
    });

    it('return new collection that filled with filtered items.', () => {
      const filtered = c.filter((item) => {
        if (!item.value) {
          return false;
        }

        return item.value >= 20;
      });

      expect(filtered.size).toBe(2);
    });

    it("when collection's getItemID customized. then return collection has same func.", () => {
      const cust = function (item: Item & { ID: number }) {
        return String(item.ID);
      };
      const col = new Collection(cust);

      col.add({ ID: 3 });

      const filtered = col.filter(function (item) {
        return item.ID === 3;
      });

      expect(filtered.getItemID).toBe(cust);
    });
  });

  describe('Collection.and()', () => {
    let item1: Item;
    let item2: Item;
    let item3: Item;

    beforeEach(() => {
      item1 = { _id: 1, value: 20 };
      item2 = { _id: 2, value: 50 };
      item3 = { _id: 4, value: 2 };

      c.add(item1, item2, item3);
    });

    it('combind multiple function filter AND clause.', () => {
      function filter1(item: Item) {
        return item._id === 2;
      }

      function filter2(item: Item) {
        return item.value === 50;
      }

      function filter3(item: Item) {
        return item.label === '';
      }

      const combinedFilter = Collection.and(filter1, filter2);
      let result = c.filter(combinedFilter);

      const expected = new Collection();
      expected.add(item2);

      expect(result).toEqual(expected);

      result = c.filter(Collection.and(filter1, filter2, filter3));

      expect(result.size).toBe(0);

      expect(c.filter(combinedFilter).size).toBe(1);
    });
  });

  describe('Collection.or()', () => {
    let item1: Item;
    let item2: Item;
    let item3: Item;

    beforeEach(() => {
      item1 = { _id: 1, value: 20 };
      item2 = { _id: 2, value: 50 };
      item3 = { _id: 4, value: 2 };

      c.add(item1, item2, item3);
    });

    it('combine multiple function filter with OR clause.', () => {
      function filter1(item: Item) {
        return item._id === 2;
      }

      function filter2(item: Item) {
        return item.value === 2;
      }

      const combined = Collection.or(filter1, filter2);
      const result = c.filter(combined);

      expect(result.size).toBe(2);
      expect(result.has(1)).toBe(false);

      expect(
        c.filter(function (model) {
          return model._id === 2 || model.value === 2;
        })
      ).toEqual(result);
    });
  });

  describe('Mixed and(), or() filter', () => {
    let item1: Item;
    let item2: Item;
    let item3: Item;
    let item4: Item;

    beforeEach(() => {
      item1 = { _id: 1, value: 20 };
      item2 = { _id: 2, value: 50 };
      item3 = { _id: 4, value: 2 };
      item4 = { _id: 5, value: 50 };

      c.add(item1, item2, item3, item4);
    });

    it('mixed and, or filter also available for find()', () => {
      function filter1(item: Item) {
        return item.value === 20;
      }
      function filter2(item: Item) {
        return item._id === 1;
      }
      function filter3(item: Item) {
        return item.value === 50;
      }

      const or = Collection.or(filter1, filter3);
      const and = Collection.and(filter2, or);
      // _id === 1 && ( value === 20 || value === 50 )

      const result = c.filter(and);

      expect(
        c.filter(function (model) {
          return model._id === 1 && (model.value === 20 || model.value === 50);
        })
      ).toEqual(result);
    });

    it('mixed and, or combined filter2', () => {
      function filter1(item: Item) {
        return item.value === 50;
      }
      function filter2(item: Item) {
        return item._id === 2;
      }
      function filter3(item: Item) {
        return item._id === 5;
      }
      const or = Collection.or(filter2, filter3);
      const and = Collection.and(or, filter1);
      const result = c.filter(and);

      expect(
        c.filter(function (model) {
          return (model._id === 2 || model._id === 5) && model.value === 50;
        })
      ).toEqual(result);
    });
  });

  describe('groupBy()', () => {
    let item1: Item;
    let item2: Item;
    let item3: Item;

    beforeEach(() => {
      item1 = {
        _id: 1,
        value: 20,
        isGood: false,
        '30': 'a',
        true: 'c',
        no() {
          return this.value;
        },
      };
      item2 = {
        _id: 2,
        value: 50,
        isGood: true,
        '30': 'b',
        true: 'c',
        no() {
          return this.value;
        },
      };
      item3 = {
        _id: 4,
        value: 2,
        isGood: true,
        '30': 'b',
        true: 'd',
        no() {
          return this.value;
        },
      };

      c.add(item1, item2, item3);
    });

    it('group all elements by number values.', () => {
      const grouped = c.groupBy('value');

      const c1 = new Collection(c.getItemID);
      c1.add(item1);
      const c2 = new Collection(c.getItemID);
      c2.add(item2);
      const c3 = new Collection(c.getItemID);
      c3.add(item3);

      expect(grouped).toEqual({
        '20': c1,
        '50': c2,
        '2': c3,
      });
    });

    it('group by number property', () => {
      const grouped = c.groupBy(30);

      const c1 = new Collection(c.getItemID);
      c1.add(item1);
      const c2 = new Collection(c.getItemID);
      c2.add(item2, item3);

      expect(grouped.a).toEqual(c1);
      expect(grouped.b).toEqual(c2);
    });

    it('group by boolean values.', () => {
      const grouped = c.groupBy('isGood');

      const c1 = new Collection(c.getItemID);
      c1.add(item1);
      const c2 = new Collection(c.getItemID);
      c2.add(item2, item3);

      expect(grouped).toEqual({
        false: c1,
        true: c2,
      });
    });

    it('if base value is function then use returned value', () => {
      const grouped = c.groupBy('no');

      const c1 = new Collection(c.getItemID);
      c1.add(item1);
      const c2 = new Collection(c.getItemID);
      c2.add(item2);
      const c3 = new Collection(c.getItemID);
      c3.add(item3);

      expect(grouped).toEqual({
        '20': c1,
        '50': c2,
        '2': c3,
      });
    });

    it('group by custom functions', () => {
      const grouped = c.groupBy((item: Item) => {
        return item.value > 10 ? 'upper' : 'lower';
      });

      const c1 = new Collection(c.getItemID);
      c1.add(item1, item2);
      const c2 = new Collection(c.getItemID);
      c2.add(item3);

      expect(grouped.upper).toEqual(c1);
      expect(grouped.lower).toEqual(c2);
    });
  });

  describe('sort()', () => {
    let item1: Item;
    let item2: Item;
    let item3: Item;

    beforeEach(() => {
      item1 = { _id: 1, value: 20 };
      item2 = { _id: 2, value: 50 };
      item3 = { _id: 4, value: 2 };

      c.add(item1, item2, item3);
    });

    it('sort own items by given compare function.', () => {
      const arr = c.sort(function (a, b) {
        if (a.value < b.value) {
          return -1;
        }
        if (a.value === b.value) {
          return 0;
        }

        return 1;
      });

      expect(arr[0]).toBe(item3);
      expect(arr[1]).toBe(item1);
      expect(arr[2]).toBe(item2);
    });
  });

  describe('each()', () => {
    let spy: jest.Mock;
    let item1: Item;
    let item2: Item;
    let item3: Item;

    beforeEach(() => {
      item1 = { _id: 1, value: 20 };
      item2 = { _id: 2, value: 50 };
      item3 = { _id: 4, value: 2 };

      c.add(item1, item2, item3);

      spy = jest.fn();
    });

    it('iterate own items.', () => {
      c.each(spy);

      expect(spy.mock.calls[2]).toEqual(expect.arrayContaining([{ _id: 4, value: 2 }, 4]));
    });

    it('break loop when iteratee return false.', () => {
      spy.mockImplementation((item: Item) => {
        if (item.value === 50) {
          return false;
        }

        return true;
      });

      c.each(spy);

      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('doWhenHas()', () => {
    it('invoke supplied method when collection has model.', () => {
      const item1 = { _id: 1 };

      const spy1 = jest.fn();
      const spy2 = jest.fn();

      c.add(item1);

      c.doWhenHas(1, spy1);
      c.doWhenHas(2, spy2);

      expect(spy1).toHaveBeenCalledWith(item1);
      expect(spy2).not.toHaveBeenCalled();
    });
  });

  describe('find()', () => {
    it('return first single item that meet with supplied function filter', () => {
      const item1 = { _id: 1 };
      const item2 = { _id: 2 };
      const item3 = { _id: 5 };

      c.add(item3, item2, item1);

      const result = c.find(function (model) {
        return model._id === 2;
      });

      expect(result).toBe(item2);
    });

    it('return null when no item.', () => {
      const item1 = { _id: 1 };
      c.add(item1);

      expect(
        c.find(() => {
          return false;
        })
      ).toBe(null);
    });
  });

  describe('toArray()', () => {
    it('return new array with collection items.', () => {
      const item1 = { _id: 1 };
      const item2 = { _id: 2 };
      const item3 = { _id: 5 };

      c.add(item1, item2, item3);

      expect(c.toArray()).toEqual([item1, item2, item3]);
    });
  });
});
