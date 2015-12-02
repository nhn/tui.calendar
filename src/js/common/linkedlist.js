/**
 * @fileoverview JavaScript Linked list
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var LinkedListItem = require('./linkedlistitem');

/**
 * @constructor
 */
function LinkedList() {
    /**
     * @type {number}
     */
    this._idx = 0;

    /**
     * @type {object}
     */
    this._list = {};

    /**
     * @type {object}
     */
    this._removed = {};

    /**
     * @type {number}
     */
    this.length = 0;
}

/**
 * traverse prev, next items by idx
 * @param {number} idx - number of traverse starting position.
 * @returns {array} prev, next item
 */
LinkedList.prototype._traverse = function(idx) {
    var cursor = idx,
        ownList = this._list,
        removed = this._removed,
        result = [];

    do {
        cursor -= 1;
    } while (!ownList[cursor] && removed[cursor])

    result.push(ownList[cursor]);

    cursor = idx;

    do {
        cursor += 1;
    } while (!ownList[cursor] && removed[cursor])

    result.push(ownList[cursor]);

    return result;
};

/**
 * add item to linked list
 * @param {object} item - data to preserve
 * @returns {LinkedListItem} item instance.
 */
LinkedList.prototype.add = function(item) {
    var idx = this._idx, inst, trav;

    inst = new LinkedListItem(idx, item);
    this._list[idx] = inst;
    this._idx += 1;
    this.length += 1;

    trav = this._traverse(idx);
    inst._prev = trav[0];
    inst._next = trav[1];

    if (trav[0]) {
        trav[0]._next = inst;
    }

    return inst;
};

/**
 * remove item from linked list
 * @param {LinkedListItem} item - item instance to remove
 */
LinkedList.prototype.remove = function(item) {
    var idx = item.id,
        trav;

    if (!this._list[idx]) {
        return;
    }

    trav = this._traverse(idx);
    this.length -= 1;
    this._removed[idx] = true;

    if (trav[0]) {
        trav[0]._next = trav[1];
    }

    if (trav[1]) {
        trav[1]._prev = trav[0];
    }
        
    delete this._list[idx];
};

module.exports = LinkedList;

