/**
 * @fileoverview Service factory module.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var baseFactory = require('../factory/baseFactory');
var calendarAPI = require('./calendarAPI');

module.exports = function(options, container) {
    var calendar = baseFactory(options, container);

    calendar.api = calendarAPI;

    return calendar;
}
