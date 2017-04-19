/**
 * @fileoverview Model for views
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var TZDate = require('../../common/timezone').Date;

/**
 * CalEvent ViewModel
 * @constructor
 * @param {CalEvent} event CalEvent instance.
 */
function CalEventViewModel(event) {
    /**
     * The model of event.
     * @type {CalEvent}
     */
    this.model = event;

    /**
     * @type {number}
     */
    this.top = 0;

    /**
     * @type {number}
     */
    this.left = 0;

    /**
     * @type {number}
     */
    this.width = 0;

    /**
     * @type {number}
     */
    this.height = 0;

    /**
     * Represent event has collide with other events when rendering.
     * @type {boolean}
     */
    this.hasCollide = false;

    /**
     * Extra space at rigth side of this event.
     * @type {number}
     */
    this.extraSpace = 0;

    /**
     * represent this event block is not visible after rendered.
     *
     * in month view, some viewmodel in date need to hide when already rendered before dates.
     *
     * set true then it just shows empty space.
     * @type {boolean}
     */
    this.hidden = false;

    /**
     * whether the event includes multiple dates
     */
    this.isMultiDates = false;

    /**
     * represent render start date used at rendering.
     *
     * if set null then use model's 'starts' property.
     * @type {TZDate}
     */
    this.renderStarts = null;

    /**
     * whether the actual start-date is before the render-start-date
     * @type {boolean}
     */
    this.exceedLeft = false;

    /**
     * represent render end date used at rendering.
     *
     * if set null then use model's 'ends' property.
     * @type {TZDate}
     */
    this.renderEnds = null;

    /**
     * whether the actual end-date is after the render-end-date
     * @type {boolean}
     */
    this.exceedRight = false;
}

/**********
 * static props
 **********/

/**
 * CalEventViewModel factory method.
 * @param {CalEvent} event CalEvent instance.
 * @returns {CalEventViewModel} CalEventViewModel instance.
 */
CalEventViewModel.create = function(event) {
    return new CalEventViewModel(event);
};


/**********
 * prototype props
 **********/

/**
 * return renderStarts property to render properly when specific event that exceed rendering date range.
 *
 * if renderStarts is not set. return model's starts property.
 * @override
 * @returns {Date} render start date.
 */
CalEventViewModel.prototype.getStarts = function() {
    if (this.renderStarts) {
        return this.renderStarts;
    }

    return this.model.starts;
};

/**
 * return renderStarts property to render properly when specific event that exceed rendering date range.
 *
 * if renderEnds is not set. return model's ends property.
 * @override
 * @returns {Date} render end date.
 */
CalEventViewModel.prototype.getEnds = function() {
    if (this.renderEnds) {
        return this.renderEnds;
    }

    return this.model.ends;
};

/**
 * @returns {number} unique number for model.
 */
CalEventViewModel.prototype.cid = function() {
    return util.stamp(this.model);
};

/**
 * Shadowing valueOf method for event sorting.
 * @returns {CalEvent} The model of event.
 */
CalEventViewModel.prototype.valueOf = function() {
    return this.model;
};

/**
 * Link duration method
 * @returns {number} CalEvent#duration result.
 */
CalEventViewModel.prototype.duration = function() {
    return this.model.duration();
};

/**
 * Link collidesWith method
 * @param {CalEvent|CalEventViewModel} viewModel - Model or viewmodel instance of CalEvents.
 * @returns {boolean} CalEvent#collidesWith result.
 */
CalEventViewModel.prototype.collidesWith = function(viewModel) {
    var ownStarts = this.getStarts(),
        ownEnds = this.getEnds(),
        starts = viewModel.getStarts(),
        ends = viewModel.getEnds();

    if ((starts > ownStarts && starts < ownEnds) ||
        (ends > ownStarts && ends < ownEnds) ||
        (starts <= ownStarts && ends >= ownEnds)) {
        return true;
    }
    return false;
};

module.exports = CalEventViewModel;

