/**
 * @fileoverview The entry file of fullcalendar
 * @author NHN Ent. FE Development Team
 */

'use strict';

var util = require('tui-code-snippet');
var Calendar = require('./js/factory/calendar');
var GA_TRACKING_ID = 'UA-129951699-1';

require('./css/main.styl');
require('./js/view/template/helper');

if (util.sendHostname) {
    util.sendHostname('calendar', GA_TRACKING_ID);
}

// for jquery
if (global.jQuery) {
    global.jQuery.fn.tuiCalendar = function() {
        var options, instance;

        var el = this.get(0);
        var args = Array.prototype.slice.apply(arguments);

        if (el) {
            options = util.pick(args, 0) || {};

            instance = global.jQuery.data(el, 'tuiCalendar');

            if (instance) {
                if (typeof options === 'string' && instance[options]) {
                    return instance[options].apply(instance, args.slice(1));
                }
            } else {
                instance = new Calendar(el, options);
                global.jQuery.data(el, 'tuiCalendar', instance);
            }
        }

        return this;
    };
}

module.exports = Calendar;
