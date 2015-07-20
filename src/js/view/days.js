/**
 * @fileoverview View of days UI.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var View = require('./view');

/**
 * @constructor
 * @extends {View}
 */
function Days() {
    var container;

    View.apply(this, arguments);

    container = this.container;

    domutil.addClass(container, 'view-days-container');

    /**
     * Container element for AllDay view.
     * @type {HTMLDivElement}
     */
    this.allDayContainer = domutil.appendHTMLElement(
        'div',
        container,
        'view-allday-container'
    );

    /**
     * Container element for Task view.
     * @type {HTMLDivElement}
     */
    this.taskContainer = domutil.appendHTMLElement(
        'div',
        container,
        'view-task-container'
    );

    /**
     * Container element for Time view.
     * @type {HTMLDivElement}
     */
    this.timeContainer = domutil.appendHTMLElement(
        'div',
        container,
        'view-time-container'
    );
}

util.inherit(Days, View);

module.exports = Days;

