import { isFunction, isNil, isNumber, isString } from '@src/utils/type';

export type ItemID = string | number;
export type Item = {
  _id?: ItemID;
  [k: string | number]: any;
};

export type Filter<ItemType> = (item: ItemType) => boolean;

/**
 * Common collection.
 *
 * It need function for get model's unique id.
 *
 * if the function is not supplied then it use default function {@link Collection#getItemID}
 * @param {function} [getItemIDFn] function for get model's id.
 */
export default class Collection<ItemType extends Item> extends Map<ItemID, ItemType> {
  constructor(getItemIDFn?: (item: ItemType) => ItemID) {
    super();

    if (isFunction(getItemIDFn)) {
      this.getItemID = getItemIDFn;
    }
  }

  /**
   * Combind supplied function filters and condition.
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
    const iterator = this.values();

    return iterator.next().value;
  }

  /**
   * add models.
   * @param {Object[]} items - models to add this collection.
   */
  add(...items: ItemType[]): Collection<ItemType> {
    items.forEach((item) => {
      this.set(this.getItemID(item), item);
    });

    return this;
  }

  /**
   * remove models.
   * @param {Array.<(Object|string|number)>} items model instances or unique ids to delete.
   */
  remove(...items: Array<ItemType | ItemID>) {
    items.forEach((item) => {
      const id: ItemID = isString(item) || isNumber(item) ? item : this.getItemID(item);

      this['delete'](id);
    });
  }

  /**
   * check collection has specific model.
   * @param {(object|string|number)} id model instance or id to check
   * @returns {boolean} is has model?
   */
  has(item: ItemType | ItemID): boolean {
    const id: ItemID = isString(item) || isNumber(item) ? item : this.getItemID(item);

    return this.has(id);
  }

  /**
   * invoke callback when model exist in collection.
   * @param {(string|number)} id model unique id.
   * @param {function} callback the callback.
   */
  doWhenHas(id: ItemID, callback: (item: ItemType) => void) {
    const item = this.get(id);

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
   * collection.find(function(item) {
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
   * collection.find(Collection.and(filter1, filter2));
   *
   * collection.find(Collection.or(filter1, filter2));
   */
  filter(filterFn: Filter<ItemType>) {
    const result = new Collection<ItemType>();

    if (this.hasOwnProperty('getItemID')) {
      result.getItemID = this.getItemID;
    }

    this.forEach((item) => {
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
  groupBy(groupByFn: string | number | ((item: ItemType) => string | number)) {
    const result: Record<string, Collection<ItemType>> = {};

    this.forEach((item) => {
      const key = isFunction(groupByFn) ? groupByFn(item) : item[groupByFn];

      let collection = result[key];
      if (!collection) {
        collection = result[key] = new Collection<ItemType>(this.getItemID);
      }
      collection.add(item);
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

    this.each((item) => {
      if (findFn(item)) {
        result = item;

        return false; // returning false can stop this loop
      }

      return true;
    });

    return result;
  }

  /**
   * sort a basis of supplied compare function.
   * @param {function} compareFn compareFunction
   * @returns {array} sorted array.
   */
  sort(compareFn: (a: ItemType, b: ItemType) => number) {
    return this.toArray().sort(compareFn);
  }

  /**
   * iterate each model element.
   *
   * when iteratee return false then break the loop.
   * @param {function} iteratee iteratee(item, index, items)
   */
  each(
    iteratee: (
      item: ItemType,
      key: keyof ItemType,
      collection: Collection<ItemType>
    ) => boolean | void
  ) {
    const iterator = this.entries();
    for (let i = 0; i < this.size; i += 1) {
      const [key, value] = iterator.next().value;
      const result = iteratee(value, key, this);

      if (result === false) {
        break;
      }
    }
  }

  /**
   * return new array with collection items.
   * @returns {array} new array.
   */
  toArray() {
    const result: ItemType[] = [];

    this.forEach((item) => {
      result.push(item);
    });

    return result;
  }
}
