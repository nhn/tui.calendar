/**
 * @fileoverview Utility module for array sort, binary search.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var array = {
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
    bsearch: function(arr, search, fn, compare) {
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
    },

    /**
     * @namespace array.compare
     * @namespace array.compare.num
     * @namespace array.compare.str
     */
    compare: {
        num: {
            /**
             * compare function for array sort.
             *
             * sort array by number ascending.
             * @param {number} _a The number to compare.
             * @param {number} _b The number to compare.
             * @returns {number} Result of comparison.
             */
            asc: function (_a, _b) {
                var a = +_a,
                    b = +_b;

                return a - b;
            },

            /**
             * compare function for array sort.
             *
             * sort array by number descending.
             * @param {number} _a The number to compare.
             * @param {number} _b The number to compare.
             * @returns {number} Result of comparison.
             */
            desc: function(_a, _b) {
                var a = +_a,
                    b = +_b;

                return b - a;
            }
        },

        str: {
            /**
             * compare function for array sort.
             *
             * sort array by string ascending
             * @param {string} _a The string to compare.
             * @param {string} _b The string to compare.
             * @returns {number} Result of comparison.
             */
            asc: function(_a, _b) {
                var a = _a + '',
                    b = _b + '';

                if (a > b) {
                    return 1;
                } else if (a < b) {
                    return -1;
                }

                return 0;
            },

            /**
             * compare function for array sort.
             *
             * sort array by string descending
             * @param {string} _a The string to compare.
             * @param {string} _b The string to compare.
             * @returns {number} Result of comparison.
             */
            desc: function(_a, _b) {
                var a = _a + '',
                    b = _b + '';

                if (a > b) {
                    return -1;
                } else if (a < b) {
                    return 1;
                }

                return 0;
            },

            /**
             * compare function for array sort.
             *
             * sort array by string ascending with ignore case.
             * @param {string} _a The string to compare.
             * @param {string} _b The string to compare.
             * @returns {number} Result of comparison.
             */
            ascIgnoreCase: function(_a, _b) {
                var a = (_a + '').toLowerCase(),
                    b = (_b + '').toLowerCase();

                if (a > b) {
                    return 1;
                } else if (a < b) {
                    return -1;
                }

                return 0;
            },

            /**
             * compare function for array sort.
             *
             * sort array by string descending with ignore case.
             * @param {string} _a The string to compare.
             * @param {string} _b The string to compare.
             * @returns {number} Result of comparison.
             */
            descIgnoreCase: function(_a, _b) {
                var a = (_a + '').toLowerCase(),
                    b = (_b + '').toLowerCase();

                if (a > b) {
                    return -1;
                } else if (a < b) {
                    return 1;
                }

                return 0;
            }
        }
    }
};

module.exports = array;

