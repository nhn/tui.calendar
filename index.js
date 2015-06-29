/*eslint-disable*/
require('code-snippet');
var datetime = require('./src/js/datetime');
var Event = require('./src/js/model/event');
var Model = require('./src/js/model/model');
var Colleciton = require('./src/js/model/collection');
var SortController = require('./src/js/controller/sort');
ne.util.defineNamespace('ne.dooray.calendar', {
    datetime: datetime,
    Model: Model,
    Collection: Colleciton,
    Event: Event,
    SortController: SortController
});
