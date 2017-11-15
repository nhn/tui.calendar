/**
 * @fileoverview Freebusy component
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var isValidHM = /^\d\d:\d\d$/;
var Handlebars = require('handlebars-template-loader/runtime');

var config = require('../../config');
var common = require('../../common/common');
var datetime = require('../../common/datetime');
var Collection = require('../../common/collection');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var View = require('../../view/view');
var baseTmpl = require('./freebusybase.hbs');
var tmpl = require('./freebusy.hbs');
var TZDate = require('../../common/timezone').Date;

var dayArr = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
var MS_WHOLE_RANGE = datetime.millisecondsFrom('hour', 12); // 8:00 부터 19:00 까지의 시간 (ms)
var MS_RANGE_START = datetime.millisecondsFrom('hour', 8);
var MS_RANGE_END = datetime.millisecondsFrom('hour', 20);

var CLS_CONTAINER = config.classname('freebusy-container');
var CLS_BASE = config.classname('freebusy-base');
var CLS_CONTROLLER = config.classname('freebusy-controller');

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
 *  @param {Array} [options.times] - time range
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
        config.classname('clear') + ' ' + CLS_CONTAINER
    );
    domutil.appendHTMLElement('div', container, CLS_BASE);
    domutil.appendHTMLElement('div', container, CLS_CONTROLLER);

    View.call(this, container);

    opt = this.options = util.extend({
        headerHeight: 28,
        itemHeight: 29,
        nameWidth: 104,
        users: [],
        recommends: [],
        selectStart: '',
        selectEnd: '',
        times: dayArr
    }, options);

    this._calculateTimeRange();

    util.forEach(opt.template, function(func, name) {
        if (func) {
            Handlebars.registerHelper('freebusy-' + name + '-tmpl', func);
        }
    });

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
        click: this._onSelect,
        mousemove: this._onSelect,
        mouseout: this.unselectOver,
        mouseleave: this.unselectOver
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
    domevent.off(container, 'click', this._onSelect, this);
    domevent.off(container, 'mousemove', this.selectOver, this);
    domevent.off(container, 'mouseout', this.unselectOver, this);
    domevent.off(container, 'mouseleave', this.unselectOver, this);

    util.forEach(this.options.template, function(func, name) {
        if (func) {
            Handlebars.unregisterHelper('freebusy-' + name + '-tmpl');
        }
    });

    container.innerHTML = '';
    this.selectStart = this.selectEnd = this.options = this.users = this.selectOverStart = this.selectOverEnd = null;
};

/**********
 * Mouse Event Handlers
 **********/

/**
 * @fires Freebusy#click
 * @param {MouseEvent} clickEventData - click mouse event data
 */
Freebusy.prototype._onSelect = function(clickEventData) {
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
    timeX = common.ratio(containerWidth, MS_WHOLE_RANGE, mouseX) + MS_RANGE_START;
    dateX = new Date(timeX);
    nearMinutesX = common.nearest(dateX.getUTCMinutes(), [0, 60]) / 2;

    /**
     * @event Freebusy#click
     * @type {object}
     * @property {string} time - hh:mm string
     */
    this.fire(clickEventData.type, {
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
    var raw = datetime.raw(new TZDate(date));
    var mils = datetime.millisecondsFrom('hour', raw.h) +
        datetime.millisecondsFrom('minutes', raw.m) +
        datetime.millisecondsFrom('seconds', raw.s);

    mils = common.limit(mils, [MS_RANGE_START], [MS_RANGE_END]);

    return mils - MS_RANGE_START;
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
    var from = block.fromMilliseconds || this._getMilliseconds(block.from);
    var to = block.toMilliseconds || this._getMilliseconds(block.to);
    var left, width;

    // right edge case
    if (to < from) {
        to = MS_WHOLE_RANGE;
    }

    left = common.ratio(MS_WHOLE_RANGE, 100, from);
    width = common.ratio(MS_WHOLE_RANGE, 100, (to - from));

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
 * get view block for selection state in instance, but return null if width is zero
 * @param {string} start - hh:mm formatted string for select start
 * @param {string} end - hh:mm formatted string for select end
 * @returns {number[]} block bound
 */
Freebusy.prototype._getSelectionBlock = function(start, end) {
    var startDate = new TZDate(0);
    var endDate = new TZDate(0);
    var bound;

    if (!isValidHM.test(start) || !isValidHM.test(end)) {
        return false;
    }

    start = start.split(':');
    end = end.split(':');

    startDate.setHours(start[0], start[1]);
    endDate.setHours(end[0], end[1]);

    bound = this._getBlockBound({
        from: startDate,
        to: endDate
    });

    if (bound[1] === 0) {
        return null;
    }

    return bound;
};

/**
 * Get view model for rendering
 * @returns {object} view model for rendering
 */
Freebusy.prototype._getViewModel = function() {
    var self = this,
        opt = this.options,
        users = this.users,
        userLength = users.length,
        noFlexScrollBarPadding = 1,
        viewModel = {
            headerHeight: opt.headerHeight,
            nameWidth: opt.nameWidth,
            itemHeight: opt.itemHeight,
            bodyHeight: (userLength * opt.itemHeight),
            containerHeight: (userLength * opt.itemHeight) + opt.headerHeight + noFlexScrollBarPadding,

            times: opt.times,
            timeWidth: 100 / opt.times.length,
            freebusy: {},
            recommends: [],
            selection: userLength ? this._getSelectionBlock(this.selectStart, this.selectEnd) : null,
            selectionOver: userLength ? this._getSelectionBlock(this.selectOverStart, this.selectOverEnd) : null
        };

    users.each(function(user) {
        viewModel.freebusy[user.id] = user;
    });

    util.forEach(opt.recommends, function(block) {
        var bound = self._getBlockBound(block);
        // Don't display recommends if check out of time range
        if (bound[1]) {
            viewModel.recommends.push(bound);
        }
    });

    return viewModel;
};

/**
 * @override
 */
Freebusy.prototype.render = function(skipBase) {
    var container = this.container;
    var viewModel = this._getViewModel();
    var baseEl = container.getElementsByClassName(CLS_BASE)[0];
    var controllerEl = container.getElementsByClassName(CLS_CONTROLLER)[0];

    if (!skipBase) {
        baseEl.innerHTML = baseTmpl(viewModel);
        this.fire('afterRender');
    }
    controllerEl.style.height = viewModel.bodyHeight + 'px';
    controllerEl.style.top = (viewModel.itemHeight - 1) + 'px';
    controllerEl.innerHTML = tmpl(viewModel);
};

/**
 * Add a single user
 * @param {User} user - user to add
 * @param {boolean} [skipRender=false] - set true then skip render after add user
 */
Freebusy.prototype.addUser = function(user, skipRender) {
    this.users.add(user);
    this._arrangeFreebusy(user);

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
    var self = this;

    util.forEach(users, function(user) {
        self.addUser(user, true);
    });

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
    var self = this;

    util.forEach(idArr, function(id) {
        self.removeUser(id, skipRender);
    });

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
    this.unselect(true);

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

    if (this.users.length) {
        this.render(true);
    }
};

/**
 * Unselect selected time
 * @param {boolean} [skipRender=false] - set true then skip render after unselect
 */
Freebusy.prototype.unselect = function(skipRender) {
    this.selectStart = this.selectEnd = '';
    this.selectOverStart = this.selectOverEnd = '';

    if (!skipRender) {
        this.render(true);
    }
};

/**
 * Select specific time
 * @param {string} start - hh:mm formatted string value
 * @param {string} end - hh:mm formatted string value
 */
Freebusy.prototype.selectOver = function(start, end) {
    this.selectOverStart = start;
    this.selectOverEnd = end;

    this.render(true);
};


Freebusy.prototype.unselectOver = function() {
    this.selectOverStart = this.selectOverEnd = '';
    this.render(true);
};

Freebusy.prototype._calculateTimeRange = function() {
    var times = this.options.times;
    MS_WHOLE_RANGE = datetime.millisecondsFrom('hour', times.length);
    MS_RANGE_START = datetime.millisecondsFrom('hour', times[0]);
    MS_RANGE_END = datetime.millisecondsFrom('hour', times[times.length - 1] + 1);
};

/**
 * Set time ranges
 * @param {Array} times - time ranges
 * @example
 * var times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
 * fb.setTimeRange(times);
 */
Freebusy.prototype.setTimeRange = function(times) {
    var self = this;

    this.options.times = times;
    this._calculateTimeRange();

    // Update fromMilliseconds, toMilliseconds
    this.users.each(function(user) {
        self._arrangeFreebusy(user);
    });

    this.render();
};

Freebusy.prototype._cacheFreebusyMilliseconds = function(user) {
    var self = this;
    user.freebusy.forEach(function(schedule) {
        schedule.fromMilliseconds = self._getMilliseconds(schedule.from);
        schedule.toMilliseconds = self._getMilliseconds(schedule.to);
    });
};

/**
 * Arrange freebusy time collision
 * @param {User} user - user object
 */
Freebusy.prototype._arrangeFreebusy = function(user) {
    var self = this;
    var freebusy;
    var previousSchedule;

    this._cacheFreebusyMilliseconds(user);

    user.freebusy.sort(function(schedule1, schedule2) {
        var diff = schedule1.fromMilliseconds - schedule2.fromMilliseconds;
        if (diff === 0) {
            diff = schedule1.toMilliseconds - schedule2.toMilliseconds;
        }
        return diff;
    });

    // Adjust overlapped block
    user.freebusy.forEach(function(schedule, index, array) {
        array.slice(index + 1).forEach(function(target) {
            if (schedule.toMilliseconds > target.fromMilliseconds) {
                target.fromMilliseconds = Math.min(schedule.toMilliseconds, target.toMilliseconds);
            }
        });
    });

    // Remove from === to
    freebusy = util.filter(user.freebusy, function(schedule) {
        return schedule.fromMilliseconds !== schedule.toMilliseconds;
    });

    // Merge consecutive blocks
    freebusy = util.filter(freebusy, function(schedule, index, array) {
        if (!previousSchedule && index > 0) {
            previousSchedule = array[index - 1];
        }

        if (previousSchedule && previousSchedule.toMilliseconds === schedule.fromMilliseconds) {
            previousSchedule.toMilliseconds = schedule.toMilliseconds;
            return false;
        }

        previousSchedule = null;

        return true;
    });

    // Prepare rendering block data
    user.busy = util.map(freebusy, function(block) {
        return self._getBlockBound(block);
    });
};

module.exports = Freebusy;
