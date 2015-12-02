/**
 * @fileoverview Linkedlist item
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;

/**
 * @constructor
 * @param {number} id - ID value
 * @param {object} data - data object to preserve
 */
function LinkedListItem(id, data) {
    /**
     * @type {number}
     */
    this.id = id;

    /**
     * @type {object}
     */
    this.data = data;

    /**
     * @type {LinkedListItem}
     */
    this._prev = null;

    /**
     * @type {LinkedListItem}
     */
    this._next = null;
}

/**
 * @param {number} direction - traversing direction. '-1' or '1'
 * @param {function} [filter] - filter function to traverse until result of invoke is true.
 * @returns {LinkedListItem} linked list item
 */
LinkedListItem.prototype._traverse = function(direction, filter) {
    var flag = direction > 0 ? '_next' : '_prev',
        item = this[flag];

    if (filter) {
        while (util.isExisty(item)) {
            if (filter(item)) {
                return item;
            }

            item = item[flag];
        }
    }

    return item;
};

/**
 * @param {function} [filter] - filter function to traverse until result of invoke is true.
 * @returns {LinkedListItem} linked list item
 */
LinkedListItem.prototype.next = function(filter) {
    return this._traverse(1, filter);
};

/**
 * @param {function} [filter] - filter function to traverse until result of invoke is true.
 * @returns {LinkedListItem} linked list item
 */
LinkedListItem.prototype.prev = function(filter) {
    return this._traverse(-1, filter);
};

module.exports = LinkedListItem;

