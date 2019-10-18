/* eslint-disable @typescript-eslint/no-explicit-any */
import forEach from 'tui-code-snippet/collection/forEach';
import isExisty from 'tui-code-snippet/type/isExisty';
import pick from 'tui-code-snippet/object/pick';
import Schedule from '@src/model/schedule';

interface StampObj extends Record<string, any> {
  __fe_id?: number;
}

/**
 * The last id of stamp
 * @type {number}
 * @private
 */
let lastId = 0;

/**
 * Set the value at path of object.
 * @param {object} object - the object to modify
 * @param {string} path -the path of property to set
 * @param {*} value - the value to set
 */
export function set(object: Record<string, any>, path: string, value: any) {
  const names = path.split('.');
  let store = object;

  forEach(names, (name: string, index: number) => {
    store[name] = store[name] || {};

    if (index === names.length - 1) {
      store[name] = value;
    } else {
      store = store[name];
    }
  });
}

/**
 * Assign a unique id to an object
 * @param {object} obj - Object that will be assigned id.
 * @returns {number} Stamped id
 */
export function stamp(obj: StampObj): number {
  if (!obj.__fe_id) {
    lastId += 1;
    // eslint-disable-next-line @typescript-eslint/camelcase
    obj.__fe_id = lastId;
  }

  return obj.__fe_id;
}

/**
 * Verify whether an object has a stamped id or not.
 * @param {object} obj - adjusted object
 * @returns {boolean}
 */
export function hasStamp(obj: StampObj): boolean {
  return isExisty(pick(obj, '__fe_id'));
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function isSameSchedule(schedule: Schedule, scheduleId: string, calendarId: string) {
  return schedule.id === scheduleId && schedule.calendarId === calendarId;
}
