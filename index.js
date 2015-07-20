/*eslint-disable*/

/**********
 * Common
 **********/
require('code-snippet');
require('./src/js/view/template/helper');
var dirty = require('./src/js/common/dirty');
var datetime = require('./src/js/datetime');
var array = require('./src/js/common/array');
var domevent = require('./src/js/common/domevent');
var domutil = require('./src/js/common/domutil');
var Colleciton = require('./src/js/common/collection');
var model = require('./src/js/common/model');

/**********
 * Controllers
 **********/
var Base = require('./src/js/controller/base');
Base.Days = require('./src/js/controller/viewMixin/days');

/**********
 * Models
 **********/
var Point = require('./src/js/common/point');
var Event = require('./src/js/model/event');

/**********
 * Views
 **********/
var View = require('./src/js/view/view');

/**********
 * View Models
 **********/
var DaysViewModel = require('./src/js/view/model/days');

// exports
ne.util.defineNamespace('ne.dooray.calendar', {
    dirty: dirty,
    datetime: datetime,
    array: array,
    domevent: domevent,
    domutil: domutil,
    Collection: Colleciton,
    model: model,

    Base: Base,

    Point: Point, 
    Event: Event,

    View: View,

    DaysViewModel: DaysViewModel
});
