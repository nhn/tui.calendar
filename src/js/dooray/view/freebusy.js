/**
 * @fileoverview Freebusy component
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util,
    dayArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

var config = require('../../config'),
    common = require('../../common/common'),
    datetime = require('../../common/datetime'),
    Collection = require('../../common/collection'),
    domutil = require('../../common/domutil'),
    domevent = require('../../common/domevent'),
    View = require('../../view/view'),
    tmpl = require('./freebusy.hbs');

var PADDING_LEFT = 80;

/**
 * @constructor
 * @extends {View}
 * @mixes CustomEvents
 * @param {object} options - options for Freebusy component
 * @param {boolean} [options.showTimeHeader=true] - set true then show time header
 * @param {User[]} [options.users] - initial users
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

    this.options = util.extend({
        showTimeHeader: true
    }, options);

    /**
     * @type {Colleciton}
     */
    this.users = new Collection(function(user) {
        if (!user.id) {
            config.throwError('Freebusy: id 가 없는 사용자를 추가할 수 없습니다.');
        }

        return user.id;
    });

    if (this.options.users) {
        this.addUsers(this.options.users);
    }

    domutil.disableTextSelection(container);

    domevent.on(container, {
        click: this._onClick
    }, this);

    this.render();
}

util.inherit(Freebusy, View);

/**
 * Invoke before destroy
 * @private
 * @override
 */
Freebusy.prototype._beforeDestroy = function() {
    var container = this.container;
    domutil.enableTextSelection(container);
    domevent.off(container, 'click', this._onClick, this);

    container.innerHTML = '';
    this.options = this.users = null;
};

/**********
 * Mouse Event Handlers
 **********/

/**
 * @fires Freebusy#click
 * @param {MouseEvent} clickEventData - click mouse event data
 */
Freebusy.prototype._onClick = function(clickEventData) {
    var target = clickEventData.srcElement || clickEventData.target,
        isValid = domutil.closest(target, '.' + config.classname('freebusy-blocks')),
        container, containerWidth,
        mouseX, timeX, dateX, nearMinutesX;

    if (!isValid) {
        return;
    }

    container = this.container;
    containerWidth = this.getViewBound().width - PADDING_LEFT;
    mouseX = domevent.getMousePosition(clickEventData, container)[0] - PADDING_LEFT;
    timeX = common.ratio(containerWidth, datetime.MILLISECONDS_PER_DAY, mouseX);
    dateX = new Date(timeX);
    nearMinutesX = common.nearest(dateX.getUTCMinutes(), [0, 60]) / 2;

    /**
     * @event Freebusy#click
     * @type {object}
     * @property {string} time - hh:mm string
     */
    this.fire('click', {
        time: datetime.leadingZero(dateX.getUTCHours(), 2) + ':' + datetime.leadingZero(nearMinutesX, 2)
    });
};

/**********
 * Methods
 **********/

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
 * @typedef {object} User
 * @property {string} id - unique id for each users
 * @property {string} name - name of user
 * @property {Block[]} freebusy - freebusy data
 */

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
            showTimeHeader: this.options.showTimeHeader,
            times: dayArr,
            timeWidth: 100 / dayArr.length,
            freebusy: {} 
        };

    this.users.each(function(user) {
        viewModel.freebusy[user.id] = {
            name: user.name,
            busy: util.map(user.freebusy, function(block) {
                return this._getBlockBound(block);
            }, this)
        };
    }, this);

    return viewModel;
};

/**
 * @override
 */
Freebusy.prototype.render = function() {
    var container = this.container,
        viewModel = this._getViewModel();

    container.innerHTML = tmpl(viewModel);
};

/**
 * Add a single user
 * @param {User} user - user to add
 */
Freebusy.prototype.addUser = function(user) {
    this.users.add(user);
};

/**
 * Add mutiple user
 * @param {User[]} users - users to add
 */
Freebusy.prototype.addUsers = function(users) {
    util.forEach(users, function(user) {
        this.addUser(user);
    }, this);
};

/**
 * Remove single user
 * @param {string} id - id to delete
 */
Freebusy.prototype.removeUser = function(id) {
    this.users.remove(id);
};

/**
 * Remove mutiple user
 * @param {string[]} idArr - array of id to delete
 */
Freebusy.prototype.removeUsers = function(idArr) {
    util.forEach(idArr, function(id) {
        this.removeUser(id);
    }, this);
};

/**
 * Clear all users
 */
Freebusy.prototype.clear = function() {
    this.users.clear();
    this.render();
};

/**
 * Select specific time
 * @param {string} start - hh:mm formatted string value
 * @param {string} end - hh:mm formatted string value
 */
Freebusy.prototype.select = function(start, end) {

};

util.CustomEvents.mixin(Freebusy);

module.exports = Freebusy;

