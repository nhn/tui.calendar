/*eslint-disable*/
require('code-snippet');
require('moment');
var Event = require('./src/js/model/event');
var Model = require('./src/js/model/model');
var Colleciton = require('./src/js/model/collection');
ne.util.defineNamespace('ne.dooray.calendar', {
    Model: Model,
    Collection: Colleciton,
    Event: Event
});
