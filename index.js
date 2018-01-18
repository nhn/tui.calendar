/* eslint vars-on-top:0, strict:0 */
require('./src/css/main.styl');
require('./src/js/view/template/helper');

var DoorayEvent = require('./src/js/dooray/model/calEvent');
var MiniCalendar = require('./src/js/dooray/view/minicalendar');
var Freebusy = require('./src/js/dooray/view/freebusy');
var OriginCalendar = require('./src/js/factory/calendar');
var FullCalendar = require('./src/js/dooray/factory/calendar');
var SplitTimeCalendar = require('./src/js/dooray/factory/SplitTimeCalendar');
var timezone = require('./src/js/common/timezone');
var datetime = require('./src/js/common/datetime');

/** @namespace ne.dooray.calendar */
global.tui.util.defineNamespace('ne.dooray.calendar', /** @lends ne.dooray.calendar */{
    // service modules
    DoorayEvent: DoorayEvent,
    MiniCalendar: MiniCalendar,
    Freebusy: Freebusy,

    // factory class
    OriginCalendar: OriginCalendar,
    FullCalendar: FullCalendar,
    SplitTimeCalendar: SplitTimeCalendar,

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

