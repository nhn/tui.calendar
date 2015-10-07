/**
 * @fileoverview View of week event container inside of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var datetime = require('../datetime');
var View = require('./view');
var tmpl = require('./template/monthweek.hbs');

var config = require('../config');
var FREE_HEIGHT_TO_CREATION = config.monthweek.view.FREE_HEIGHT_TO_CREATION;

/**
 * @constructor
 * @extends {View}
 * @param {object} options - view options.
 * @param {number} [options.height=60] - minimum height of event container element.
 * @param {number} [options.eventBlockHeight=18] - height of each event block.
 * @param {number} [options.eventBlockGutter=2] - gutter height of each event block.
 * @param {HTMLDIVElement} container - DOM element to use container for this view.
 */
function MonthWeek(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        'schedule-view-allday-monthweek'
    );

    /**
     * @type {object}
     */
    this.options = util.extend({
        height: 60,              // default value when Month view rendering.
        eventBlockHeight: 18,    // event block's height value.
        eventBlockGutter: 2      // gutter between each event blocks
    }, options);

    container.style.minHeight = this.options.height + FREE_HEIGHT_TO_CREATION + 'px';

    View.call(this, null, container);
}

util.inherit(MonthWeek, View);

/**
 * @param {object} viewModel - viewModel from parent views.
 * @returns {object} viewModel to rendering.
 */
MonthWeek.prototype._getBaseViewModel = function(viewModel) {
    var options = this.options,
        range = datetime.range(
            viewModel.renderStartDate,
            viewModel.renderEndDate,
            datetime.MILLISECONDS_PER_DAY
        ),
        matrices = viewModel.eventsInDateRange.allday,
        widthPercent = 100 / range.length;

    return {
        width: widthPercent,
        height: options.height,
        eventBlockHeight: options.eventBlockHeight + options.eventBlockGutter,
        eventBlockGutter: options.eventBlockGutter,
        eventGrid: util.map(range, function() {
            return widthPercent;
        }),
        matrices: matrices
    };
};

/**
 * @override
 * @param {object} viewModel - viewModel from parent views.
 */
MonthWeek.prototype.render = function(viewModel) {
    var baseViewModel = this._getBaseViewModel(viewModel),
        maxEventInDay = 0;

    maxEventInDay = Math.max.apply(null, util.map(baseViewModel.matrices, function(matrix) {
        return Math.max.apply(null, util.map(matrix, function(row) {
            return row.length;
        }));
    }));

    this.resize(maxEventInDay);

    this.container.innerHTML = tmpl(baseViewModel);
};

/**
 * Resize MonthWeek container and send information to parent views.
 * @override
 * @param {number} maxEventInDay - how largest event block in one day?
 */
MonthWeek.prototype.resize = function(maxEventInDay) {
    var options = this.options,
        newHeight = (maxEventInDay * (options.eventBlockHeight + options.eventBlockGutter));

    newHeight = Math.max(newHeight, options.height);
    
    this.container.style.height = newHeight + FREE_HEIGHT_TO_CREATION + 'px';
};

module.exports = MonthWeek;

