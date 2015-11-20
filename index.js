/* eslint vars-on-top:0, strict:0 */

/**********
 * Common
 **********/
require('tui-code-snippet');
require('./src/js/view/template/registerHelpers');
var config = require('./src/js/config');
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
var FillRemainHeight = require('./src/js/common/fillRemainHeight');

/**********
 * Models
 **********/
var Point = require('./src/js/common/point');
var CalEvent = require('./src/js/model/calEvent');
var CalEventViewModel = require('./src/js/model/viewModel/calEvent');

/**********
 * Views
 **********/
var View = require('./src/js/view/view');
View.prototype.cssPrefix = config.cssPrefix;

var MonthWeek = require('./src/js/view/monthweek');
var Week = require('./src/js/view/week/week');
var DayName = require('./src/js/view/week/dayname');
var TimeGrid = require('./src/js/view/week/timeGrid');
var Time = require('./src/js/view/week/time');

/**********
 * Handlers
 **********/
var Drag = require('./src/js/handler/drag');
var TimeCore = require('./src/js/handler/time/core');
var TimeClick = require('./src/js/handler/time/click');
var TimeCreation = require('./src/js/handler/time/creation');
var TimeCreationGuide = require('./src/js/handler/time/creationGuide');
var TimeMove = require('./src/js/handler/time/move');
var TimeMoveGuide = require('./src/js/handler/time/moveGuide');
var TimeResize = require('./src/js/handler/time/resize');
var TimeResizeGuide = require('./src/js/handler/time/resizeGuide');

var AlldayCore = require('./src/js/handler/allday/core');
var AlldayClick = require('./src/js/handler/allday/click');
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

/**********
 * SERVICE MODULE
 **********/
var MiniCalendar = require('./src/js/dooray/view/minicalendar');
var DoorayEvent = require('./src/js/dooray/model/calEvent');
var DoorayController = require('./src/js/dooray/controller/base');
var TaskView = require('./src/js/dooray/view/taskview');
var MilestoneClick = require('./src/js/dooray/handler/milestoneClick');
var TaskClick = require('./src/js/dooray/handler/taskClick');
var Freebusy = require('./src/js/dooray/view/freebusy');

/**********
 * Calendar Factory
 **********/

var Calendar = require('./src/js/factory/calendar');
var ServiceCalendar = require('./src/js/dooray/factory/calendar');

/** @namespace ne.dooray.calendar */
global.tui.util.defineNamespace('ne.dooray.calendar', {
    // common
    config: config,
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
    FillRemainHeight: FillRemainHeight,

    // model
    CalEvent: CalEvent,
    CalEventViewModel: CalEventViewModel,

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
    TimeClick: TimeClick,
    TimeCreation: TimeCreation,
    TimeCreationGuide: TimeCreationGuide,
    TimeMove: TimeMove,
    TimeMoveGuide: TimeMoveGuide,
    TimeResize: TimeResize,
    TimeResizeGuide: TimeResizeGuide,

    AlldayCore: AlldayCore,
    AlldayClick: AlldayClick,
    AlldayCreation: AlldayCreation,
    AlldayCreationGuide: AlldayCreationGuide,
    AlldayMove: AlldayMove,
    AlldayMoveGuide: AlldayMoveGuide,
    AlldayResize: AlldayResize,
    AlldayResizeGuide: AlldayResizeGuide,

    // only for test
    ControllerFactory: controllerFactory,

    // service modules
    DoorayEvent: DoorayEvent,
    DoorayController: DoorayController,
    MiniCalendar: MiniCalendar,
    TaskView: TaskView,
    MilestoneClick: MilestoneClick,
    TaskClick: TaskClick,
    Freebusy: Freebusy,

    // factory class
    OriginCalendar: Calendar,
    FullCalendar: ServiceCalendar
});

