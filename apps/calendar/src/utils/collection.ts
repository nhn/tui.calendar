import { isFunction, isNil, isNumber, isString } from '@src/utils/type';

export type ItemID = string | number;
export type Item = {
  _id?: ItemID;
  [k: string | number]: any;
};

export type Filter<ItemType> = (item: ItemType) => boolean;

/**
 * Generic collection base on ES6 Map.
 *
 * It needs function for get model's unique id.
 *
 * if the function is not supplied then it uses default function {@link Collection#getItemID}
 * @param {function} [getItemIDFn] function for get model's id.
 */
export default class Collection<ItemType extends Item> {
  private internalMap: Map<ItemID, ItemType> = new Map();

  constructor(getItemIDFn?: (item: ItemType) => ItemID) {
    if (isFunction(getItemIDFn)) {
      this.getItemID = getItemIDFn;
    }
  }

  /**
   * Combine supplied function filters and condition.
   * @param {...Filter} filterFns - function filters
   * @returns {function} combined filter
   */
  static and<ItemType>(...filterFns: Array<Filter<ItemType>>) {
    const { length } = filterFns;

    return (item: ItemType) => {
      for (let i = 0; i < length; i += 1) {
        if (!filterFns[i].call(null, item)) {
          return false;
        }
      }

      return true;
    };
  }

  /**
   * Combine multiple function filters with OR clause.
   * @param {...function} filterFns - function filters
   * @returns {function} combined filter
   */
  static or<ItemType>(...filterFns: Array<Filter<ItemType>>) {
    const { length } = filterFns;

    if (!length) {
      return () => false;
    }

    return (item: ItemType) => {
      let result = filterFns[0].call(null, item);

      for (let i = 1; i < length; i += 1) {
        result = result || filterFns[i].call(null, item);
      }

      return result;
    };
  }

  /**
   * get model's unique id.
   * @param {object} item model instance.
   * @returns {string | number} model unique id.
   */
  getItemID(item: ItemType): ItemID {
    return item?._id ?? '';
  }

  getFirstItem(): ItemType | null {
    const iterator = this.internalMap.values();

    return iterator.next().value;
  }

  /**
   * add models.
   * @param {Object[]} items - models to add this collection.
   */
  add(...items: ItemType[]): Collection<ItemType> {
    items.forEach((item) => {
      const id = this.getItemID(item);

      this.internalMap.set(id, item);
    });

    return this;
  }

  /**
   * remove models.
   * @param {Array.<(Object|string|number)>} items model instances or unique ids to delete.
   */
  remove(...items: Array<ItemType | ItemID>): ItemType[] | ItemType {
    const removeResult: ItemType[] = [];

    items.forEach((item) => {
      const id: ItemID = isString(item) || isNumber(item) ? item : this.getItemID(item);

      if (!this.internalMap.has(id)) {
        return;
      }

      removeResult.push(this.internalMap.get(id) as ItemType);
      this.internalMap['delete'](id);
    });

    return removeResult.length === 1 ? removeResult[0] : removeResult;
  }

  /**
   * check collection has specific model.
   * @param {(object|string|number)} id model instance or id to check
   * @returns {boolean} is has model?
   */
  has(item: ItemType | ItemID): boolean {
    const id: ItemID = isString(item) || isNumber(item) ? item : this.getItemID(item);

    return this.internalMap.has(id);
  }

  get(item: ItemType | ItemID): ItemType | null {
    const id: ItemID = isString(item) || isNumber(item) ? item : this.getItemID(item);

    return this.internalMap.get(id) ?? null;
  }

  /**
   * invoke callback when model exist in collection.
   * @param {(string|number)} id model unique id.
   * @param {function} callback the callback.
   */
  doWhenHas(id: ItemID, callback: (item: ItemType) => void) {
    const item = this.internalMap.get(id);

    if (isNil(item)) {
      return;
    }

    callback(item);
  }

  /**
   * Search model. and return new collection.
   * @param {function} filterFn filter function.
   * @returns {Collection} new collection with filtered models.
   * @example
   * collection.filter(function(item) {
   *     return item.edited === true;
   * });
   *
   * function filter1(item) {
   *     return item.edited === false;
   * }
   *
   * function filter2(item) {
   *     return item.disabled === false;
   * }
   *
   * collection.filter(Collection.and(filter1, filter2));
   *
   * collection.filter(Collection.or(filter1, filter2));
   */
  filter(filterFn: Filter<ItemType>): Collection<ItemType> {
    const result = new Collection<ItemType>();

    if (this.hasOwnProperty('getItemID')) {
      result.getItemID = this.getItemID;
    }

    this.internalMap.forEach((item) => {
      if (filterFn(item) === true) {
        result.add(item);
      }
    });

    return result;
  }

  /**
   * Group element by specific key values.
   *
   * if key parameter is function then invoke it and use returned value.
   * @param {(string|number|function)} groupByFn key property or getter function.
   * @returns {object.<string|number, Collection>} grouped object
   * @example
   * // pass `string`, `number`, `boolean` type value then group by property value.
   * collection.groupBy('gender');    // group by 'gender' property value.
   * collection.groupBy(50);          // group by '50' property value.
   *
   * // pass `function` then group by return value. each invocation `function` is called with `(item)`.
   * collection.groupBy(function(item) {
   *     if (item.score > 60) {
   *         return 'pass';
   *     }
   *     return 'fail';
   * });
   */
  groupBy(
    groupByFn: string | number | ((item: ItemType) => string | number)
  ): Record<string, Collection<ItemType>> {
    const result: Record<string, Collection<ItemType>> = {};

    this.internalMap.forEach((item) => {
      let key = isFunction(groupByFn) ? groupByFn(item) : item[groupByFn];

      if (isFunction(key)) {
        key = key.call(item);
      }

      result[key] ??= new Collection<ItemType>(this.getItemID);
      result[key].add(item);
    });

    return result;
  }

  /**
   * Return the first item in collection that satisfies the provided function.
   * @param {function} [findFn] - function filter
   * @returns {object|null} item.
   */
  find(findFn: Filter<ItemType>): ItemType | null {
    let result: ItemType | null = null;
    const items = this.internalMap.values();
    let next = items.next();

    while (next.done === false) {
      if (findFn(next.value)) {
        result = next.value;
        break;
      }
      next = items.next();
    }

    return result;
  }

  /**
   * sort a basis of supplied compare function.
   * @param {function} compareFn compareFunction
   * @returns {array} sorted array.
   */
  sort(compareFn: (a: ItemType, b: ItemType) => number): ItemType[] {
    return this.toArray().sort(compareFn);
  }

  /**
   * iterate each model element.
   *
   * when iteratee return false then break the loop.
   * @param {function} iteratee iteratee(item, index, items)
   */
  each(iteratee: (item: ItemType, key: keyof ItemType) => boolean | void) {
    const entries = this.internalMap.entries();
    let next = entries.next();

    while (next.done === false) {
      const [key, value] = next.value;
      if (iteratee(value, key) === false) {
        break;
      }
      next = entries.next();
    }
  }

  /**
   * remove all models in collection.
   */
  clear() {
    this.internalMap.clear();
  }

  /**
   * return new array with collection items.
   * @returns {array} new array.
   */
  toArray(): ItemType[] {
    return Array.from(this.internalMap.values());
  }

  get size(): number {
    return this.internalMap.size;
  }
}
