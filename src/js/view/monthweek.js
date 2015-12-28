/**
 * @fileoverview View of week event container inside of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;

var config = require('../config'),
    domutil = require('../common/domutil'),
    datetime = require('../common/datetime'),
    View = require('./view'),
    tmpl = require('./template/monthweek.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - view options.
 * @param {number} [options.containerHeight=40] - minimum height of event container element.
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to make create easy.
 * @param {number} [options.eventHeight=18] - height of each event block.
 * @param {number} [options.eventGutter=2] - gutter height of each event block.
 * @param {number} [options._mode=MonthWeek.MONTHWEEK_MODE.WEEK] - monthweek render mode
 * @param {function} [options._getViewModelFunc] - function for extract partial view model data from whole view models.
 * @param {HTMLDIVElement} container - DOM element to use container for this view.
 */
function MonthWeek(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('monthweek')
    );

    /**
     * @type {object}
     */
    options = this.options = util.extend({
        containerHeight: 40,
        containerBottomGutter: 8,
        eventHeight: 18,
        eventGutter: 2,
        _mode: MonthWeek.MONTHWEEK_MODE.WEEK,
        _getViewModelFunc: function(viewModel) {
            return viewModel.allday;
        }
    }, options);

    View.call(this, container);
}

/**
 * @readonly
 * @enum {string}
 */
MonthWeek.MONTHWEEK_MODE = {
    /** render monthweek view for week mode */
    WEEK: 0,
    /** render monthweek view for month mode */
    MONTH: 1
};

util.inherit(MonthWeek, View);

/**
 * Get render date range
 * @returns {Date[]} rendered date range
 */
MonthWeek.prototype.getRenderDateRange = function() {
    var opt = this.options;

    return datetime.range(
        datetime.start(datetime.parse(opt.renderStartDate)),
        datetime.end(datetime.parse(opt.renderEndDate)),
        datetime.MILLISECONDS_PER_DAY
    );
};

/**
 * @param {object} viewModel - viewModel from parent views.
 * @returns {object} viewModel to rendering.
 */
MonthWeek.prototype._getBaseViewModel = function(viewModel) {
    var opt = this.options,
        range = this.getRenderDateRange(),
        matrices = opt._getViewModelFunc(viewModel),
        gridWidth = 100 / range.length;

    return {
        mode: opt._mode,
        width: gridWidth,
        eventBlockHeight: opt.eventHeight + opt.eventGutter,
        eventBlockGutter: opt.eventGutter,
        eventHeight: opt.eventHeight,
        marginTop: (opt._mode === MonthWeek.MONTHWEEK_MODE.MONTH) ? opt.eventHeight : 0,
        dates: util.map(range, function(date) {
            return date.getDate();
        }),
        matrices: matrices
    };
};

/**
 * @override
 * @param {object} viewModel - viewModel from parent views.
 */
MonthWeek.prototype.render = function(viewModel) {
    var opt = this.options,
        baseViewModel = this._getBaseViewModel(viewModel),
        maxEventInDay = 0;

    if (opt._mode === MonthWeek.MONTHWEEK_MODE.WEEK) {
        maxEventInDay = Math.max.apply(null, util.map(baseViewModel.matrices, function(matrix) {
            return Math.max.apply(null, util.map(matrix, function(row) {
                return row.length;
            }));
        }));

        this._setMinHeight(maxEventInDay);
    } else {
        //TODO: Implement view models for month mode
        //TODO: 월뷰 컨테이너에서 %로 나눠준 높이 기준으로 계산해야 함.
        this.container.style.height = opt.containerHeight + 'px';
        // maxEventInDay = Math.floor((opt.containerHeight - opt.eventHeight) / (opt.eventHeight + opt.eventGutter)) - 1;
        // console.log(maxEventInDay);
    }

    this.container.innerHTML = tmpl(baseViewModel);
};

/**
 * Set minimum height for container.
 * 
 * Need set min-height to container when wrapping container's height is smaller then monthweek container.
 *
 * If set height directly, vertical grids represent in each days are not cover wrapping container.
 * @param {number} maxEventInDay - how largest event block in one day?
 */
MonthWeek.prototype._setMinHeight = function(maxEventInDay) {
    var opt = this.options,
        newHeight = (maxEventInDay * (opt.eventHeight + opt.eventGutter)) + opt.containerBottomGutter;

    this.container.style.minHeight = newHeight + 'px';
};

module.exports = MonthWeek;

