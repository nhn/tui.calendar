/**
 * @fileoverview Model for views
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

/**
 * Event ViewModel
 * @constructor
 * @param {Event} event Event instance.
 */
function EventViewModel(event) {
    /**
     * @type {Event} The model of event.
     */
    this.model = event;

    /**
     * @type {HTMLElement[]} The array of rendered elements.
     */
    this.elements = [];
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
 * Shadowing valueOf method for event sorting.
 * @returns {Event} The model of event.
 */
EventViewModel.prototype.valueOf = function() {
    return this.model;
};

// TODO: event handler, ... etc.

module.exports = EventViewModel;

