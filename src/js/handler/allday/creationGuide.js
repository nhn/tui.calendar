/**
 * @fileoverview Guide element for Allday.Creation
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var domutil = require('../../common/domutil');

/**
 * Class for Allday.Creation dragging effect.
 * @constructor
 * @param {AlldayCreation} alldayCreation - instance of AlldayCreation.
 */
function AlldayCreationGuide(alldayCreation) {
    /**
     * @type {AlldayCreation}
     */
    this.alldayCreation = alldayCreation;

    /**
     * @type {HTMLDIVElement}
     */
    this.eventContainer = domutil.find('.schedule-view-monthweek-events', alldayCreation.container);

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = document.createElement('div');

    domutil.addClass(this.guideElement, 'schedule-view-allday-creation-guide');

    alldayCreation.on({
        'allday_creation_dragstart': this._onDragStart,
        'allday_creation_drag': this._onDrag,
        'allday_creation_dragend': this._onDragEnd,
        'allday_creation_click': this._onClick
    }, this);
}

AlldayCreationGuide.prototype._onDragStart = function(dragStartEventData) {};

AlldayCreationGuide.prototype._onDrag = function(dragEventData) {};

AlldayCreationGuide.prototype._onDragEnd = function(dragEndEventData) {};

AlldayCreationGuide.prototype._onClick = function(clickEventData) {};

module.exports = AlldayCreationGuide;

