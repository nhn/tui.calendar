/**
 * @fileoverview Model for views
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;

/**
 * Event ViewModel
 * TODO: useless.
 * @constructor
 * @param {Event} event Event instance.
 */
function EventViewModel(event) {
    /**
     * The model of event.
     * @type {Event}
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
}

/**********
 * static props
 **********/

/**
 * EventViewModel factory method.
 * @param {Event} event Event instance.
 * @returns {EventViewModel} EventViewModel instance.
 */
EventViewModel.create = function(event) {
    return new EventViewModel(event);
};


/**********
 * prototype props
 **********/

/**
 * @returns {number} unique number for model.
 */
EventViewModel.prototype.id = function() {
    return util.stamp(this.model);
};

/**
 * Shadowing valueOf method for event sorting.
 * @returns {Event} The model of event.
 */
EventViewModel.prototype.valueOf = function() {
    return this.model;
};

/**
 * Link duration method
 * @returns {number} Event#duration result.
 */
EventViewModel.prototype.duration = function() {
    return this.model.duration();
};

/**
 * Link collidesWith method
 * @param {Event|EventViewModel} viewModel - Model or viewmodel instance of Events.
 * @returns {boolean} Event#collidesWith result.
 */
EventViewModel.prototype.collidesWith = function(viewModel) {
    return this.model.collidesWith(viewModel.valueOf());
};

module.exports = EventViewModel;

