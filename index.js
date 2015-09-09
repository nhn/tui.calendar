/*eslint-disable*/

/**********
 * Common
 **********/
require('code-snippet');
require('./src/js/view/template/registerHelpers');
var dirty = require('./src/js/common/dirty');
var datetime = require('./src/js/datetime');
var array = require('./src/js/common/array');
var domevent = require('./src/js/common/domevent');
var domutil = require('./src/js/common/domutil');
var Colleciton = require('./src/js/common/collection');
var model = require('./src/js/common/model');
var common = require('./src/js/common/common');
var reqAnimFrame = require('./src/js/common/reqAnimFrame');

/**********
 * Controllers
 **********/
var ControllerFactory = require('./src/js/controller/factory');

/**********
 * Models
 **********/
var Point = require('./src/js/common/point');
var Event = require('./src/js/model/event');

/**********
 * Views
 **********/
var ViewFactory = require('./src/js/view/factory.js');
var View = require('./src/js/view/view');
var Week = require('./src/js/view/week');
var DayName = require('./src/js/view/dayname');
var TimeGrid = require('./src/js/view/timeGrid');
var Time = require('./src/js/view/time');

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

/**
 * @namespace ne.dooray.calendar
 */
ne.util.defineNamespace('ne.dooray.calendar', {
    dirty: dirty,
    datetime: datetime,
    array: array,
    domevent: domevent,
    domutil: domutil,
    Collection: Colleciton,
    model: model,
    common: common,
    reqAnimFrame: reqAnimFrame,

    ControllerFactory: ControllerFactory,

    Point: Point, 
    Event: Event,

    ViewFactory: ViewFactory,
    View: View,
    Week: Week,
    DayName: DayName,
    TimeGrid: TimeGrid,
    Time: Time,

    EventViewModel: EventViewModel,

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
    AlldayCreationGuide: AlldayCreationGuide
});
