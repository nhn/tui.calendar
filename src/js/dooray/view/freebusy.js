/**
 * @fileoverview Freebusy component
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;

var config = require('../../config'),
    common = require('../../common/common'),
    datetime = require('../../common/datetime'),
    Collection = require('../../common/collection'),
    domutil = require('../../common/domutil'),
    View = require('../../view/view'),
    tmpl = require('./freebusy.hbs');

/**
 * @constructor
 * @extends {View}
 * @mixes CustomEvents
 * @param {object} options - options for Freebusy component
 * @param {HTMLDivElement} container - container element for Freebusy component
 */
function Freebusy(options, container) {
    if (!(this instanceof Freebusy)) {
        return new Freebusy(options, container);
    }

    container = domutil.appendHTMLElement(
        'div', 
        container, 
        config.classname('clear') + ' ' +
        config.classname('freebusy-container')
    );

    View.call(this, container);

    /**
     * @type {Colleciton}
     */
    this.users = new Collection(function(user) {
        if (!user.id) {
            config.throwError('Freebusy: id 가 없는 사용자를 추가할 수 없습니다.');
        }

        return user.id;
    });

    this.render();
}

util.inherit(Freebusy, View);

/**
 * Get total milliseconds from hour, minutes, seconds part of supplied date object.
 * @private
 * @param {Date|string} date - date
 * @returns {number} hour + minutes + seconds millseconds value
 */
Freebusy.prototype._getMilliseconds = function(date) {
    var raw = datetime.raw(util.isDate(date) ? date : new Date(date)),
        mils = 0;

    mils = datetime.millisecondsFrom('hour', raw.h) +
        datetime.millisecondsFrom('minutes', raw.m) +
        datetime.millisecondsFrom('seconds', raw.s);

    return mils;
};

/**
 * @typedef {object} Block
 * @property {string} from - start time string of event
 * @property {string} to - end time string of event
 */

/**
 * Calculate relative bound of each blocks
 * @param {Block} block - each blocks in user data
 * @returns {array} [0]: left, [1]: width
 */
Freebusy.prototype._getBlockBound = function(block) {
    var from = this._getMilliseconds(block.from),
        to = this._getMilliseconds(block.to),
        left,
        width;

    left = common.ratio(datetime.MILLISECONDS_PER_DAY, 100, from);
    width = common.ratio(datetime.MILLISECONDS_PER_DAY, 100, (to - from));

    return [left, width];
};

/**
 * Get view model for rendering
 * @returns {object} view model for rendering
 */
Freebusy.prototype._getViewModel = function() {
    var viewModel = {
            names: [],
            freebusy: []
        },
        names = viewModel.names,
        freebusy = viewModel.freebusy;

    this.users.each(function(user) {
        names.push(user.name);
        
        util.forEach(user.freebusy, function(block) {
            freebusy.push(this._getBlockBound(block));
        }, this);
    }, this);

    return viewModel;
};

/**
 * @override
 */
Freebusy.prototype.render = function() {
    this.container.innerHTML = tmpl();
};

Freebusy.prototype.addUser = function() {};

Freebusy.prototype.addUsers = function() {};

Freebusy.prototype.removeUser = function() {};

Freebusy.prototype.removeUsers = function() {};

Freebusy.prototype.clear = function() {};

Freebusy.prototype.select = function() {};

module.exports = Freebusy;

