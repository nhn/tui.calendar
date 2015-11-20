/**
 * @fileoverview Freebusy component
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');
var View = require('../../view/view');
var tmpl = require('./freebusy.hbs');

/**
 * @constructor
 * @extends {View}
 * @mixes CustomEvents
 * @param {object} options - options for Freebusy component
 * @param {HTMLDivElement} container - container element for Freebusy component
 */
function Freebusy(options, container) {
    if (!(this instanceof Freebusy)) {
        return new Freebusy(options, container);
    }

    container = domutil.appendHTMLElement(
        'div', 
        container, 
        config.classname('clear') + ' ' +
        config.classname('freebusy-container')
    );

    View.call(this, container);

    this.render();
}

util.inherit(Freebusy, View);

Freebusy.prototype.render = function() {
    this.container.innerHTML = tmpl();
};

module.exports = Freebusy;

