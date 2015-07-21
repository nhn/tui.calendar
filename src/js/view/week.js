/**
 * @fileoverview View of days UI.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var View = require('./view');

/**********
 * Sub views
 **********/
var TimeGrid = require('./timeGrid');

/**
 * @constructor
 * @param {Base.Days} controller The controller mixin part.
 * @param {HTMLElement} container The element to use container for this view.
 * @extends {View}
 */
function Week(controller, container) {
    View.call(this, null, container);

    /**
     * Week controller mixin.
     * @type {Base.Days}
     */
    this.controller = controller;

    domutil.addClass(container, 'view-days-container');
    domutil.disableTextSelection(container);

    this.addChild(new TimeGrid(
        null,
        domutil.appendHTMLElement(
            'div',
            container
        )
    ));
}

util.inherit(Week, View);

module.exports = Week;

