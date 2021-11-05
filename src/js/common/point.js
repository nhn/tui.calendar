/**
 * @fileoverview
 * Class for represent two dimensional x, y coordinates.
 *
 * It suppliy a group of functions for manipulate coordinates.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 * @example
 * var p = point(10, 10);
 * var r1 = p.add(Point(5, 5));
 * console.log(p.toString())    // "Point(10, 10)"
 * console.log(r1.toString())    // "Point(15, 15)"
 *
 * var p2 = new Point(10, 10);
 * p2._add(point(5, 5));
 * console.log(p2.toString())   // "Point(15, 15)"
 */
'use strict';

var util = require('tui-code-snippet');

/**
 * Class for represent two dimentional x, y coordinates.
 * @constructor
 * @param {number} x The number of X coordinates.
 * @param {number} y The number of Y coordinates.
 * @param {boolean} [useRound=false] set true when each coordinates are rounded before initialize.
 * @example
 * var t = new Point(13, 5);
 */
function Point(x, y, useRound) {
    /**
     * @type {number}
     */
    this.x = (useRound ? Math.round(x) : x);

    /**
     * @type {number}
     */
    this.y = (useRound ? Math.round(y) : y);
}

/**********
 * static props
 **********/

/**
 * Calculate point ratio.
 * @param {Point} point The instance of point.
 * @param {number} factor From factor
 * @param {number} toFactor To factor
 * @returns {Point} Point instance calculated.
 */
Point.getRatio = function(point, factor, toFactor) {
    if (factor === toFactor) {
        return point.clone();
    }

    return point.multiplyBy(toFactor)._divideBy(factor);
};

/**
 * Syntatic sugar of new Point()
 * @param {(Point|number|number[])} x X coordinate value.
 * @param {(number|boolean)} [y] Y coordinate value or boolean value for coordinates round.
 * @param {boolean} [useRound] Set true then round initial coordinate values.
 * @returns {Point} The instance of point.
 * @example
 * var p1 = point(10, 15);
 * var p2 = point([10, 15]);
 */
Point.n = function(x, y, useRound) {
    if (x instanceof Point) {
        return x;
    }

    if (util.isArray(x)) {
        return new Point(x[0], x[1], y);
    }

    return new Point(x, y, useRound);
};

/**********
 * prototype props
 **********/

/**
 * Clone points
 * @returns {Point} The point instance cloned.
 */
Point.prototype.clone = function() {
    return new Point(this.x, this.y);
};

/**
 * Add points.
 * @param {Point} point The point instance to add.
 * @returns {Point} Point calculated.
 */
Point.prototype.add = function(point) {
    return this.clone()._add(Point.n(point));
};

/**
 * Add self points.
 * @param {Point} point The point instance to add.
 * @returns {Point} Point calculated.
 */
Point.prototype._add = function(point) {
    this.x += point.x;
    this.y += point.y;

    return this;
};

/**
 * Subtract points.
 * @param {Point} point The point instance to subtract.
 * @returns {Point} Point calculated.
 */
Point.prototype.subtract = function(point) {
    return this.clone()._subtract(Point.n(point));
};

/**
 * Subtract points. (manipulate self)
 * @param {Point} point The point instance to subtract.
 * @returns {Point} Point calculated.
 */
Point.prototype._subtract = function(point) {
    this.x -= point.x;
    this.y -= point.y;

    return this;
};

/**
 * Divide points.
 * @param {number} num The number to divide.
 * @returns {Point} Point calculated.
 */
Point.prototype.divideBy = function(num) {
    return this.clone()._divideBy(num);
};

/**
 * Divide points. (manipulate self)
 * @param {number} num The number to divide.
 * @returns {Point} Point calculated.
 */
Point.prototype._divideBy = function(num) {
    this.x /= num;
    this.y /= num;

    return this;
};

/**
 * Multiply coordinates.
 * @param {number} num Thyen number to multiply
 * @returns {Point} Point calculated.
 */
Point.prototype.multiplyBy = function(num) {
    return this.clone()._multiplyBy(num);
};

/**
 * Multiply self coordinates.
 * @param {number} num The number to multiply.
 * @returns {Point} Point calculated.
 */
Point.prototype._multiplyBy = function(num) {
    this.x *= num;
    this.y *= num;

    return this;
};

/**
 * Round coordinates.
 * @returns {Point} Point calculated.
 */
Point.prototype.round = function() {
    return this.clone()._round();
};

/**
 * Round self coordinates.
 * @returns {Point} Point calculated.
 */
Point.prototype._round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    return this;
};

/**
 * Reverse values between positive and negative.
 * @returns {Point} Point calculated.
 */
Point.prototype.reverse = function() {
    return this.clone()._reverse();
};

/**
 * Reverse self values between positive and negative.
 * @returns {Point} Point calculated.
 */
Point.prototype._reverse = function() {
    this.x *= -1;
    this.y *= -1;

    return this;
};

/**
 * Floor coordinates.
 * @returns {Point} Point calculated.
 */
Point.prototype.floor = function() {
    return this.clone()._floor();
};

/**
 * Floor self coordinates.
 * @returns {Point} Point calculated.
 */
Point.prototype._floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);

    return this;
};

/**
 * Ceil coordinates.
 * @returns {Point} Point calculated.
 */
Point.prototype.ceil = function() {
    return this.clone()._ceil();
};

/**
 * Ceil self coordinates.
 * @returns {Point} Point calculated.
 */
Point.prototype._ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);

    return this;
};

/**
 * Rotate point.
 * @param {number} deg The number of rotate degree.
 * @param {Point} [center=this] Center point instance to use rotate center. use own when not supplied.
 * @param {number} [cos] Cosine values for rotate. it useful when multi point rotate.
 * @param {number} [sin] Sine values for rotate. it useful when multi point rotate.
 * @returns {Point} The point instance rotated.
 */
Point.prototype.rotate = function(deg, center, cos, sin) {
    return this.clone()._rotate(deg, center, cos, sin);
};

/**
 * Rotate self.
 * @param {number} deg The number of rotate degree.
 * @param {Point} [center=this] Center point instance to use rotate center. use own when not supplied.
 * @param {number} [cos] Cosine values for rotate. it useful when multi point rotate.
 * @param {number} [sin] Sine values for rotate. it useful when multi point rotate.
 * @returns {Point} The point instance rotated.
 */
Point.prototype._rotate = function(deg, center, cos, sin) {
    var rad = deg * (Math.PI / 180),
        x,
        y;

    cos = cos || parseFloat(Math.cos(rad).toFixed(8));
    sin = sin || parseFloat(Math.sin(rad).toFixed(8));

    this._subtract(center);

    x = this.x;
    y = this.y;

    this.x = (x * cos) - (y * sin);
    this.y = (x * sin) + (y * cos);

    this._add(center);

    return this;
};

/**
 * Calculate distance between two points.
 * @param {Point} point Point instance.
 * @returns {number} The number of distance between two points.
 */
Point.prototype.distanceTo = function(point) {
    var x,
        y;

    point = Point.n(point);

    x = point.x - this.x;
    y = point.y - this.y;

    return Math.sqrt((x * x) + (y * y));
};

/**
 * Check point equals.
 * @param {Point} point Point instance to compare
 * @returns {boolean} equality
 */
Point.prototype.equals = function(point) {
    point = Point.n(point);

    return point.x === this.x && point.y === this.y;
};

/**
 * Return formatted string. 'Point(x, y)'
 * @returns {string} string
 */
Point.prototype.toString = function() {
    return 'Point(' + this.x + ', ' + this.y + ')';
};

/**
 * Return coordinates to array. [x, y]
 * @returns {number[]} coordinate array.
 */
Point.prototype.toArray = function() {
    return [this.x, this.y];
};

module.exports = Point;
