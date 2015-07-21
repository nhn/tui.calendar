/**
 * @fileoverview View of time.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var View = require('./view');

/**
 * @constructor
 * @extends {View}
 */
function Time() {
    View.apply(this, arguments);
}

util.inherit(Time, View);

module.exports = Time;

