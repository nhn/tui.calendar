/**
 * @fileoverview View of an week.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';
var util = global.ne.util;
var tmpl = require('./template/event.hbs');

var Event = require('../model/event');

var e = Event.create({
    title: 'test'
});

console.log(tmpl({events: [e]}));

/**
 * @constructor
 */
function Week(options) {
}

module.exports = Week;

