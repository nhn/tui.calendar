/*eslint-disable*/
require('code-snippet');
require('./src/js/view/template/helper');
var dirty = require('./src/js/common/dirty');
var datetime = require('./src/js/datetime');
var array = require('./src/js/common/array');
var Event = require('./src/js/model/event');
var Model = require('./src/js/common/model');
var Colleciton = require('./src/js/common/collection');
var Base = require('./src/js/controller/base');
var EventViewModel = require('./src/js/model/eventViewModel');
ne.util.defineNamespace('ne.dooray.calendar', {
    dirty: dirty,
    datetime: datetime,
    array: array,
    Model: Model,
    Collection: Colleciton,
    Event: Event,
    Base: Base,
    EventViewModel: EventViewModel
});
