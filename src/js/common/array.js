/**
 * @fileoverview Utility module for array sort, binary search.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../datetime');


/**********
 * Search
 **********/

/**
 * search item index using binary search algorithm.
 *
 * the array must be sorted.
 * @param {array} arr array to search.
 * @param {(string|number|boolean)} search value to search.
 * @param {function} [fn] iteratee for retrieve each element's value to search.
 * @param {function} [compare] compare function for specific sort status. default is string ascending.
 * @returns {number} The number of item index searched.
 */
function bsearch(arr, search, fn, compare) {
    var minIndex = 0,
        maxIndex = arr.length - 1,
        currentIndex,
        value,
        comp;

    compare = compare || array.compare.str.asc;

    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        value = fn ? fn(arr[currentIndex]) : arr[currentIndex];
        comp = compare(value, search);

        if (comp < 0) {
            minIndex = currentIndex + 1;
        } else if (comp > 0) {
            maxIndex = currentIndex - 1;
        } else {
            return currentIndex;
        }
    }

    return ~maxIndex;
}

/**********
 * Compare Functions
 **********/

/**
 * compare function for array sort.
 *
 * sort array by ascending.
 * @param {boolean} a The boolean to compare
 * @param {boolean} b The boolean to compare.
 * @returns {number} Result of comparison.
 */
function booleanASC(a, b) {
    if (a !== b) {
        if (a) {
            return -1;
        }
        return 1;
    }
    return 0;
}

/**
 * compare function for array sort.
 *
 * sort array by descending.
 * @param {boolean} a The boolean to compare
 * @param {boolean} b The boolean to compare.
 * @returns {number} Result of comparison.
 */
function booleanDESC(a, b) {
    if (a !== b) {
        if (a) {
            return 1;
        }
        return -1;
    }
    return 0;
}

/**
 * compare function for array sort.
 *
 * sort array by number ascending.
 * @param {number} _a The number to compare.
 * @param {number} _b The number to compare.
 * @returns {number} Result of comparison.
 */
function numberASC(_a, _b) {
    var a = +_a,
        b = +_b;

    return a - b;
}

/**
 * compare function for array sort.
 *
 * sort array by number descending.
 * @param {number} _a The number to compare.
 * @param {number} _b The number to compare.
 * @returns {number} Result of comparison.
 */
function numberDESC(_a, _b) {
    var a = +_a,
        b = +_b;

    return b - a;
}

/**
 * compare function for array sort.
 *
 * sort array by string ascending
 * @param {string} _a The string to compare.
 * @param {string} _b The string to compare.
 * @returns {number} Result of comparison.
 */
function stringASC(_a, _b) {
    var a = _a + '',
        b = _b + '';

    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }

    return 0;
}

/**
 * compare function for array sort.
 *
 * sort array by string descending
 * @param {string} _a The string to compare.
 * @param {string} _b The string to compare.
 * @returns {number} Result of comparison.
 */
function stringDESC(_a, _b) {
    var a = _a + '',
        b = _b + '';

    if (a > b) {
        return -1;
    } else if (a < b) {
        return 1;
    }

    return 0;
}

/**
 * compare function for array sort.
 *
 * sort array by string ascending with ignore case.
 * @param {string} _a The string to compare.
 * @param {string} _b The string to compare.
 * @returns {number} Result of comparison.
 */
function stringASCIgnoreCase(_a, _b) {
    var a = (_a + '').toLowerCase(),
        b = (_b + '').toLowerCase();

    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }

    return 0;
}

/**
 * compare function for array sort.
 *
 * sort array by string descending with ignore case.
 * @param {string} _a The string to compare.
 * @param {string} _b The string to compare.
 * @returns {number} Result of comparison.
 */
function stringDESCIgnoreCase(_a, _b) {
    var a = (_a + '').toLowerCase(),
        b = (_b + '').toLowerCase();

    if (a > b) {
        return -1;
    } else if (a < b) {
        return 1;
    }

    return 0;
}

/**
 * Compare event models for sort.
 *
 * 1. all day event first.
 * 2. early starts.
 * 3. longest duration.
 * 4. early created.
 * @param {Event} a The object event instance.
 * @param {Event} b The object event instance.
 * @returns {number} Result of comparison.
 */
function eventASC(a, b) {
    /*
     * - 종일일정 먼저
     * - 시작시간 빠른 순
     * - 기간 긴 순
     * - 생성시간 빠른 순
     */
    var stampA = util.stamp(a),
        stampB = util.stamp(b),
        durationA = a.duration().getTime(),
        durationB = b.duration().getTime(),
        allDayCompare,
        startsCompare;

    allDayCompare = booleanASC(a.isAllDay, b.isAllDay);

    if (allDayCompare) {
        return allDayCompare;
    }

    startsCompare = datetime.compare(a.starts, b.starts);

    if (startsCompare) {
        return startsCompare;
    }

    if (durationA < durationB) {
        return 1;
    } else if (durationA > durationB) {
        return -1;
    }

    return stampA - stampB;
}

module.exports = {
    bsearch: bsearch,
    compare: {
        event: {
            asc: eventASC
        },
        bool: {
            asc: booleanASC,
            desc: booleanDESC
        },
        num: {
            asc: numberASC,
            desc: numberDESC
        },
        str: {
            asc: stringASC,
            desc: stringDESC,
            ascIgnoreCase: stringASCIgnoreCase,
            descIgnoreCase: stringDESCIgnoreCase
        }
    }
};

