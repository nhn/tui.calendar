/*eslint-disable*/
require('code-snippet');
var datetime = require('./src/js/datetime');
var Event = require('./src/js/model/event');
var Model = require('./src/js/model/model');
var Colleciton = require('./src/js/common/collection');
var Base = require('./src/js/controller/base');
ne.util.defineNamespace('ne.dooray.calendar', {
    datetime: datetime,
    Model: Model,
    Collection: Colleciton,
    Event: Event,
    Base: Base
});
