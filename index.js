/* eslint vars-on-top:0, strict:0 */
require('./src/css/main.styl');
require('./src/js/view/template/helper');

var CalEvent = require('./src/js/model/calEvent');
var OriginCalendar = require('./src/js/factory/calendar');
var FullCalendar = require('./src/js/factory/calendar');
var timezone = require('./src/js/common/timezone');
var datetime = require('./src/js/common/datetime');

/** @namespace ne.dooray.calendar */
global.tui.util.defineNamespace('ne.dooray.calendar', /** @lends ne.dooray.calendar */{
    // service modules
    DoorayEvent: CalEvent,

    // factory class
    OriginCalendar: OriginCalendar,
    FullCalendar: FullCalendar,

    datetime: datetime,
    TZDate: timezone.Date,

    /**
     * Set timezone offset
     * @param {number} offset - offset (min)
     */
    setTimezoneOffset: function(offset) {
        timezone.setOffset(offset);
    }
});

