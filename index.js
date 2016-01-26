/* eslint vars-on-top:0, strict:0 */
require('./src/js/view/template/registerHelpers');

/** @namespace ne.dooray.calendar */
global.tui.util.defineNamespace('ne.dooray.calendar', {
    // common
    config: require('./src/js/config'),
    dirty: require('./src/js/common/dirty'),
    datetime: require('./src/js/common/datetime'),
    array: require('./src/js/common/array'),
    domevent: require('./src/js/common/domevent'),
    domutil: require('./src/js/common/domutil'),
    Collection: require('./src/js/common/collection'),
    model: require('./src/js/common/model'),
    common: require('./src/js/common/common'),
    reqAnimFrame: require('./src/js/common/reqAnimFrame'),
    AJAX: require('./src/js/common/ajax'),
    Point: require('./src/js/common/point'), 
    VLayout: require('./src/js/common/vlayout'),
    VPanel: require('./src/js/common/vpanel'),
    FloatingLayer: require('./src/js/common/floatingLayer'),

    // model
    CalEvent: require('./src/js/model/calEvent'),
    CalEventViewModel: require('./src/js/model/viewModel/calEvent'),

    // view
    View: require('./src/js/view/view'),
    Week: require('./src/js/view/week/week'),
    DayName: require('./src/js/view/week/dayname'),
    Weekday: require('./src/js/view/weekday'),
    WeekdayInWeek: require('./src/js/view/week/weekdayInWeek'),
    TimeGrid: require('./src/js/view/week/timeGrid'),
    Time: require('./src/js/view/week/time'),
    Month: require('./src/js/view/month/month'),
    WeekdayInMonth: require('./src/js/view/month/weekdayInMonth'),

    // handler, guide
    Drag: require('./src/js/handler/drag'),

    TimeCore: require('./src/js/handler/time/core'),
    TimeClick: require('./src/js/handler/time/click'),
    TimeCreation: require('./src/js/handler/time/creation'),
    TimeCreationGuide: require('./src/js/handler/time/creationGuide'),
    TimeMove: require('./src/js/handler/time/move'),
    TimeMoveGuide: require('./src/js/handler/time/moveGuide'),
    TimeResize: require('./src/js/handler/time/resize'),
    TimeResizeGuide: require('./src/js/handler/time/resizeGuide'),

    AlldayCore: require('./src/js/handler/allday/core'),
    AlldayClick: require('./src/js/handler/allday/click'),
    AlldayCreation: require('./src/js/handler/allday/creation'),
    AlldayCreationGuide: require('./src/js/handler/allday/creationGuide'),
    AlldayMove: require('./src/js/handler/allday/move'),
    AlldayMoveGuide: require('./src/js/handler/allday/moveGuide'),
    AlldayResize: require('./src/js/handler/allday/resize'),
    AlldayResizeGuide: require('./src/js/handler/allday/resizeGuide'),

    MonthCore: require('./src/js/handler/month/core'),
    MonthGuide: require('./src/js/handler/month/guide'),
    MonthClick: require('./src/js/handler/month/click'),
    MonthCreation: require('./src/js/handler/month/creation'),
    MonthCreationGuide: require('./src/js/handler/month/creationGuide'),
    MonthResize: require('./src/js/handler/month/resize'),

    // service modules
    DoorayEvent: require('./src/js/dooray/model/calEvent'),
    DoorayController: require('./src/js/dooray/controller/base'),
    MiniCalendar: require('./src/js/dooray/view/minicalendar'),
    TaskView: require('./src/js/dooray/view/taskview'),
    MilestoneClick: require('./src/js/dooray/handler/milestoneClick'),
    TaskClick: require('./src/js/dooray/handler/taskClick'),
    Freebusy: require('./src/js/dooray/view/freebusy'),

    // factory class
    ControllerFactory: require('./src/js/factory/controller'),
    OriginCalendar: require('./src/js/factory/calendar'),
    FullCalendar: require('./src/js/dooray/factory/calendar')
});

