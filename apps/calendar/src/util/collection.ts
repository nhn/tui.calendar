/**
 * @fileoverview Common collections.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import forEachArray from 'tui-code-snippet/collection/forEachArray';
import forEachOwnProperties from 'tui-code-snippet/collection/forEachOwnProperties';
import isArray from 'tui-code-snippet/type/isArray';
import isExisty from 'tui-code-snippet/type/isExisty';
import isFunction from 'tui-code-snippet/type/isFunction';
import isNumber from 'tui-code-snippet/type/isNumber';
import isObject from 'tui-code-snippet/type/isObject';
import isString from 'tui-code-snippet/type/isString';

export type Filter<T> = (item: T) => boolean;

/**
 * Common collection.
 *
 * It need function for get model's unique id.
 *
 * if the function is not supplied then it use default function {@link Collection#getItemID}
 * @param {function} [getItemIDFn] function for get model's id.
 */
export default class Collection<T extends Record<string | number, any>> {
  items: Record<string | number, T> = {};

  length = 0;

  constructor(getItemIDFn?: (item: T) => string | number) {
    if (isFunction(getItemIDFn)) {
      /**
       * @type {function}
       */
      this.getItemID = getItemIDFn;
    }
  }

  /**
   * Combind supplied function filters and condition.
   * @param {...Filter} filters - function filters
   * @returns {function} combined filter
   */
  static and<ItemType>(...filters: Array<Filter<ItemType>>) {
    const { length } = filters;

    return (item: ItemType) => {
      for (let i = 0; i < length; i += 1) {
        if (!filters[i].call(null, item)) {
          return false;
        }
      }

      return true;
    };
  }

  /**
   * Combine multiple function filters with OR clause.
   * @param {...function} filters - function filters
   * @returns {function} combined filter
   */
  static or<ItemType>(...filters: Array<Filter<ItemType>>) {
    const { length } = filters;

    if (!length) {
      return () => false;
    }

    return (item: ItemType) => {
      let result = filters[0].call(null, item);

      for (let i = 1; i < length; i += 1) {
        result = result || filters[i].call(null, item);
      }

      return result;
    };
  }

  /**
   * get model's unique id.
   * @param {object} item model instance.
   * @returns {string} model unique id.
   */
  getItemID(item: T): string | number {
    return String(item._id);
  }

  get(id: string): T | undefined {
    return this.items[id];
  }

  /**
   * add models.
   * @param {...*} item models to add this collection.
   */
  add(...items: T[]) {
    items.forEach((item) => {
      const id = this.getItemID(item);
      const ownItems = this.items;

      if (!ownItems[id]) {
        this.length += 1;
      }
      ownItems[id] = item;
    });
  }

  /**
   * remove models.
   * @param {Array<(object|string|number)>} items model instances or unique ids to delete.
   * @returns {Array|Item} deleted model list.
   */
  remove(...items: Array<T | string | number>) {
    const ownItems = this.items;

    const removedList = items
      .map((item) => {
        let id: string | number;

        if (!isString(item) && !isNumber(item)) {
          id = this.getItemID(item);
        } else {
          id = item;
        }

        if (!ownItems[id]) {
          return null;
        }

        this.length -= 1;
        const itemToRemove = ownItems[id];
        delete ownItems[id];

        return itemToRemove;
      })
      .filter((item: T | null) => item);

    if (items.length === 1) {
      return removedList[0];
    }

    return removedList;
  }

  /**
   * remove all models in collection.
   */
  clear() {
    this.items = {};
    this.length = 0;
  }

  /**
   * check collection has specific model.
   * @param {(object|string|number|function)} id model instance or id or filter function to check
   * @returns {boolean} is has model?
   */
  has(id: T | string | number | Filter<T>) {
    if (!this.length) {
      return false;
    }

    let has = false;

    if (isFunction(id)) {
      const filterFunc = id;

      this.each((item: T) => {
        if (filterFunc(item) === true) {
          has = true;

          return false; // returning false can stop this loop
        }

        return true;
      });
    } else {
      id = isObject(id) ? this.getItemID(id) : id;
      has = isExisty(this.items[id]);
    }

    return has;
  }

  /**
   * invoke callback when model exist in collection.
   * @param {(string|number)} id model unique id.
   * @param {function} callback the callback.
   * @param {*} [context] callback context.
   */
  doWhenHas(id: string | number, callback?: (item: T) => void) {
    const item = this.items[id];

    if (!isExisty(item) || !callback) {
      return;
    }

    callback(item);
  }

  /**
   * Search model. and return new collection.
   * @param {function} filter filter function.
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
  find(filter: Filter<T>) {
    const result = new Collection<T>();

    if (this.hasOwnProperty('getItemID')) {
      result.getItemID = this.getItemID;
    }

    this.each((item) => {
      if (filter(item) === true) {
        result.add(item);
      }
    });

    return result;
  }

  /**
   * Group element by specific key values.
   *
   * if key parameter is function then invoke it and use returned value.
   * @param {(string|number|function|array)} key key property or getter function.
   *  if string[] supplied, create each collection before grouping.
   * @param {function} [groupFunc] - function that return each group's key
   * @returns {object.<string, Collection>} grouped object
   * @example
   *
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
   *
   * // pass `array` with first arguments then create each collection before grouping.
   * collection.groupBy(['go', 'ruby', 'javascript']);
   * // result: { 'go': empty Collection, 'ruby': empty Collection, 'javascript': empty Collection }
   *
   * // can pass `function` with `array` then group each elements.
   * collection.groupBy(['go', 'ruby', 'javascript'], function(item) {
   *     if (item.isFast) {
   *         return 'go';
   *     }
   *
   *     return item.name;
   * });
   */
  groupBy(
    key: string | number | Function | Array<string | number>,
    groupFunc?: (item: T) => string
  ) {
    const result: Record<string, Collection<T>> = {};
    const getItemIDFn = this.getItemID;
    let collection;
    let baseValue;

    if (isArray(key)) {
      forEachArray(key, (k: string | number) => {
        result[String(k)] = new Collection<T>(getItemIDFn);
      });

      if (!groupFunc) {
        return result;
      }

      key = groupFunc;
    }

    this.each((item) => {
      if (isFunction(key)) {
        baseValue = key(item);
      } else {
        baseValue = item[key as string | number]; // possible to be array, check this logic again

        if (isFunction(baseValue)) {
          baseValue = baseValue.apply(item);
        }
      }

      collection = result[baseValue];

      if (!collection) {
        collection = result[baseValue] = new Collection<T>(getItemIDFn);
      }

      collection.add(item);
    });

    return result;
  }

  /**
   * Return single item in collection.
   *
   * Returned item is inserted in this collection firstly.
   * @param {function} [filter] - function filter
   * @returns {object|null} item.
   */
  single(filter?: Filter<T>): T | null {
    const useFilter = isFunction(filter);
    let result: T | null = null;

    this.each(function (item) {
      if (!useFilter) {
        result = item;

        return false; // returning false can stop this loop
      }
      if (filter && filter(item)) {
        result = item;

        return false; // returning false can stop this loop
      }

      return true;
    });

    return result;
  }

  /**
   * sort a basis of supplied compare function.
   * @param {function} compareFunction compareFunction
   * @returns {array} sorted array.
   */
  sort(compareFunction?: (a: T, b: T) => number) {
    const arr = this.toArray();

    if (isFunction(compareFunction)) {
      return arr.sort(compareFunction);
    }

    return arr;
  }

  /**
   * iterate each model element.
   *
   * when iteratee return false then break the loop.
   * @param {function} iteratee iteratee(item, index, items)
   */
  each(iteratee: (item: T) => boolean | void) {
    forEachOwnProperties(this.items, iteratee, this);
  }

  /**
   * return new array with collection items.
   * @returns {array} new array.
   */
  toArray() {
    const array: T[] = [];

    this.each((item) => {
      array.push(item);
    });

    return array;
  }
}
