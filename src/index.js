/**
 * @fileoverview The entry file of fullcalendar
 * @author NHN Ent. FE Development Team
 */

'use strict';

var util = require('tui-code-snippet');

require('./css/main.styl');
require('./js/view/template/helper');

if (util.sendHostname) {
    util.sendHostname('calendar');
}

module.exports = require('./js/factory/calendar');
