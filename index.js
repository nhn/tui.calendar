/* eslint vars-on-top:0, strict:0 */

/**********
 * Common
 **********/
require('code-snippet');
require('./src/js/view/template/registerHelpers');
var dirty = require('./src/js/common/dirty');
var datetime = require('./src/js/common/datetime');
var array = require('./src/js/common/array');
var domevent = require('./src/js/common/domevent');
var domutil = require('./src/js/common/domutil');
var Colleciton = require('./src/js/common/collection');
var model = require('./src/js/common/model');
var common = require('./src/js/common/common');
var reqAnimFrame = require('./src/js/common/reqAnimFrame');
var AJAX = require('./src/js/common/ajax');

/**********
 * Models
 **********/
var Point = require('./src/js/common/point');
var Event = require('./src/js/model/event');

/**********
 * Views
 **********/
var View = require('./src/js/view/view');
var MonthWeek = require('./src/js/view/monthweek');

var Week = require('./src/js/view/week/week');
var DayName = require('./src/js/view/week/dayname');
var TimeGrid = require('./src/js/view/week/timeGrid');
var Time = require('./src/js/view/week/time');


/**********
 * View Models
 **********/
var EventViewModel = require('./src/js/model/viewModel/event');

/**********
 * Handlers
 **********/
var Drag = require('./src/js/handler/drag');
var TimeCore = require('./src/js/handler/time/core');
var TimeCreation = require('./src/js/handler/time/creation');
var TimeCreationGuide = require('./src/js/handler/time/creationGuide');
var TimeMove = require('./src/js/handler/time/move');
var TimeMoveGuide = require('./src/js/handler/time/moveGuide');
var TimeResize = require('./src/js/handler/time/resize');
var TimeResizeGuide = require('./src/js/handler/time/resizeGuide');

var AlldayCore = require('./src/js/handler/allday/core');
var AlldayCreation = require('./src/js/handler/allday/creation');
var AlldayCreationGuide = require('./src/js/handler/allday/creationGuide');
var AlldayMove = require('./src/js/handler/allday/move');
var AlldayMoveGuide = require('./src/js/handler/allday/moveGuide');
var AlldayResize = require('./src/js/handler/allday/resize');
var AlldayResizeGuide = require('./src/js/handler/allday/resizeGuide');

/**********
 * Factory
 **********/
var controllerFactory = require('./src/js/factory/controller');

/** @namespace ne.dooray.calendar */

global.ne.util.defineNamespace('ne.dooray.calendar', {
    // common
    dirty: dirty,
    datetime: datetime,
    array: array,
    domevent: domevent,
    domutil: domutil,
    Collection: Colleciton,
    model: model,
    common: common,
    reqAnimFrame: reqAnimFrame,
    AJAX: AJAX,
    Point: Point, 

    // model
    Event: Event,
    EventViewModel: EventViewModel,

    // view
    View: View,
    Week: Week,
    DayName: DayName,
    TimeGrid: TimeGrid,
    Time: Time,
    MonthWeek: MonthWeek,

    // handler, guide
    Drag: Drag,

    TimeCore: TimeCore,
    TimeCreation: TimeCreation,
    TimeCreationGuide: TimeCreationGuide,
    TimeMove: TimeMove,
    TimeMoveGuide: TimeMoveGuide,
    TimeResize: TimeResize,
    TimeResizeGuide: TimeResizeGuide,

    AlldayCore: AlldayCore,
    AlldayCreation: AlldayCreation,
    AlldayCreationGuide: AlldayCreationGuide,
    AlldayMove: AlldayMove,
    AlldayMoveGuide: AlldayMoveGuide,
    AlldayResize: AlldayResize,
    AlldayResizeGuide: AlldayResizeGuide,

    // only for test
    ControllerFactory: controllerFactory
});

/**********
 * SERVICE MODULE
 **********/
var calendarAPI = require('./src/js/dooray/calendarAPI');
var API = require('./src/js/dooray/controller/api');
var MiniCalendar = require('./src/js/dooray/view/minicalendar');
var DoorayEvent = require('./src/js/dooray/model/event');

/** @namespace ne.dooray.calendar.service */

global.ne.util.defineNamespace('ne.dooray.calendar.service', {
    DoorayEvent: DoorayEvent,
    MiniCalendar: MiniCalendar,
    calendarAPI: calendarAPI,
    API: API
});

/**********
 * Calendar Factory
 **********/

var Calendar = require('./src/js/factory/calendar');
var ServiceCalendar = require('./src/js/dooray/factory/calendar');

global.ne.dooray.calendar.OriginCalendar = function (options, container) {
    return new Calendar(options, container);
};

global.ne.dooray.calendar.Calendar = function(options, container) {
    return new ServiceCalendar(options, container);
};

