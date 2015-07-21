/**
 * @fileoverview Model for views
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

/**
 * Days ViewModel
 * TODO: useless.
 * @constructor
 * @param {Event} event Event instance.
 */
function DaysViewModel(event) {
    /**
     * @type {Event} The model of event.
     */
    this.model = event;

    /**
     * @type {HTMLElement} The HTMLElement of rendered.
     */
    this.elements = null;

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
}

/**********
 * static props
 **********/

/**
 * EventViewModel factory method.
 * @param {Event} event Event instance.
 * @returns {DaysViewModel} DaysViewModel instance.
 */
DaysViewModel.create = function(event) {
    return new DaysViewModel(event);
};


/**********
 * prototype props
 **********/

/**
 * Shadowing valueOf method for event sorting.
 * @returns {Event} The model of event.
 */
DaysViewModel.prototype.valueOf = function() {
    return this.model;
};

// TODO: event handler, ... etc.

module.exports = DaysViewModel;

