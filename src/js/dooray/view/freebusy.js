/**
 * @fileoverview Freebusy component
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util,
    dayArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    isValidHM = /^\d\d:\d\d$/;

var config = require('../../config'),
    common = require('../../common/common'),
    datetime = require('../../common/datetime'),
    Collection = require('../../common/collection'),
    domutil = require('../../common/domutil'),
    domevent = require('../../common/domevent'),
    View = require('../../view/view'),
    tmpl = require('./freebusy.hbs');

/**
 * @constructor
 * @extends {View}
 * @mixes CustomEvents
 * @param {object} options - options for Freebusy component
 *  @param {number} [options.headerHeight=20] - header height
 *  @param {number} [options.itemHeight=20] - item height
 *  @param {number} [options.nameWidth=100] - name area width
 *  @param {User[]} [options.users] - initial users
 *  @param {Block[]} [options.recommends] - recommendation time blocks
 *  @param {string} [options.selectStart] - hh:mm formatted select start
 *  @param {String} [options.selectEnd] - hh:mm formatted select end
 * @param {HTMLDivElement} container - container element for Freebusy component
 */
function Freebusy(options, container) {
    var opt;

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

    opt = this.options = util.extend({
        headerHeight: 20,
        itemHeight: 20,
        nameWidth: 100,
        users: [],
        recommends: [],
        selectStart: '',
        selectEnd: ''
    }, options);

    /**
     * @type {string}
     */
    this.selectStart = opt.selectStart;

    /**
     * @type {string}
     */
    this.selectEnd = opt.selectEnd;

    /**
     * @type {Colleciton}
     */
    this.users = new Collection(function(user) {
        if (!user.id) {
            config.throwError('Freebusy: id 가 없는 사용자를 추가할 수 없습니다.');
        }

        return user.id;
    });

    if (opt.users.length) {
        this.addUsers(opt.users);
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
    this.selectStart = this.selectEnd = this.options = this.users = null;
};

/**********
 * Mouse Event Handlers
 **********/

/**
 * @fires Freebusy#click
 * @param {MouseEvent} clickEventData - click mouse event data
 */
Freebusy.prototype._onClick = function(clickEventData) {
    var opt = this.options,
        target = clickEventData.srcElement || clickEventData.target,
        isValid = domutil.closest(target, config.classname('.freebusy-leftmargin')),
        container, containerWidth,
        mouseX, timeX, dateX, nearMinutesX;

    if (!isValid) {
        return;
    }

    container = this.container;
    containerWidth = this.getViewBound().width - opt.nameWidth;
    mouseX = domevent.getMousePosition(clickEventData, container)[0] - opt.nameWidth;
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
 * Add recommends blocks
 * @param {Block[]} blocks - blocks
 * @param {boolean} [skipRender=false] - set true then skip render after add recommends
 */
Freebusy.prototype.addRecommends = function(blocks, skipRender) {
    var opt = this.options;
    opt.recommends = opt.recommends.concat(blocks);

    if (!skipRender) {
        this.render();
    }
};

/**
 * Clear recommends blocks
 * @param {boolean} [skipRender=false] - set true then skip render after clear recommends
 */
Freebusy.prototype.clearRecommends = function(skipRender) {
    this.options.recommends = [];

    if (!skipRender) {
        this.render();
    }
};

/**
 * get view block for selection state in instance
 * @param {string} start - hh:mm formatted string for select start
 * @param {string} end - hh:mm formatted string for select end
 * @returns {number[]} block bound
 */
Freebusy.prototype._getSelectionBlock = function(start, end) {
    var oneHour = datetime.MILLISECONDS_PER_HOUR,
        oneMinutes = datetime.MILLISECONDS_PER_MINUTES;

    if (!isValidHM.test(start) || !isValidHM.test(end)) {
        return false;
    }

    start = start.split(':');
    end = end.split(':');

    return this._getBlockBound({
        from: datetime.toUTC(new Date((oneHour * start[0]) + (oneMinutes * start[1]))),
        to: datetime.toUTC(new Date((oneHour * end[0]) + (oneMinutes * end[1])))
    });
};

/**
 * Get view model for rendering
 * @returns {object} view model for rendering
 */
Freebusy.prototype._getViewModel = function() {
    var opt = this.options,
        users = this.users,
        userLength = users.length,
        viewModel = {
            headerHeight: opt.headerHeight,
            nameWidth: opt.nameWidth,
            itemHeight: opt.itemHeight,
            bodyHeight: (userLength * opt.itemHeight),
            containerHeight: (userLength * opt.itemHeight) + opt.headerHeight,

            times: dayArr,
            timeWidth: 100 / dayArr.length,
            freebusy: {},
            recommends: [],
            selection: this._getSelectionBlock(this.selectStart, this.selectEnd) 
        };

    users.each(function(user) {
        viewModel.freebusy[user.id] = {
            name: user.name,
            busy: util.map(user.freebusy, function(block) {
                return this._getBlockBound(block);
            }, this)
        };
    }, this);

    util.forEach(opt.recommends, function(block) {
        viewModel.recommends.push(this._getBlockBound(block));
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
 * @param {boolean} [skipRender=false] - set true then skip render after add user
 */
Freebusy.prototype.addUser = function(user, skipRender) {
    this.users.add(user);

    if (!skipRender) {
        this.render();
    }
};

/**
 * Add mutiple user
 * @param {User[]} users - users to add
 * @param {boolean} [skipRender=false] - set true then skip render after add user
 */
Freebusy.prototype.addUsers = function(users, skipRender) {
    util.forEach(users, function(user) {
        this.addUser(user, skipRender);
    }, this);

    if (!skipRender) {
        this.render();
    }
};

/**
 * Remove single user
 * @param {string} id - id to delete
 * @param {boolean} [skipRender=false] - set true then skip render after remove user
 */
Freebusy.prototype.removeUser = function(id, skipRender) {
    this.users.remove(id);

    if (!skipRender) {
        this.render();
    }
};

/**
 * Remove mutiple user
 * @param {string[]} idArr - array of id to delete
 * @param {boolean} [skipRender=false] - set true then skip render after remove user
 */
Freebusy.prototype.removeUsers = function(idArr, skipRender) {
    util.forEach(idArr, function(id) {
        this.removeUser(id, skipRender);
    }, this);

    if (!skipRender) {
        this.render();
    }
};

/**
 * Clear all users
 * @param {boolean} [skipRender=false] - set true then skip render after clear views
 */
Freebusy.prototype.clear = function(skipRender) {
    this.users.clear();
    this.clearRecommends(true);
    this.unselect();

    if (!skipRender) {
        this.render();
    }
};

/**
 * Select specific time
 * @param {string} start - hh:mm formatted string value
 * @param {string} end - hh:mm formatted string value
 */
Freebusy.prototype.select = function(start, end) {
    this.selectStart = start;
    this.selectEnd = end;

    this.render();
};

/**
 * Unselect selected time
 * @param {boolean} [skipRender=false] - set true then skip render after unselect
 */
Freebusy.prototype.unselect = function(skipRender) {
    this.selectStart = this.selectEnd = '';

    if (!skipRender) {
        this.render();
    }
};

util.CustomEvents.mixin(Freebusy);

module.exports = Freebusy;

