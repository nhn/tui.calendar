/**
 * @fileoverview Service factory module.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var Calendar = require('../factory/calendar');
var calendarAPI = require('./calendarAPI');

module.exports = function(options, container) {
    var instance = new Calendar(options, container);

    instance.api = calendarAPI;

    return instance;
}
