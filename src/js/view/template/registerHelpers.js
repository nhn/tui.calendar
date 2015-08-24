/**
 * @fileoverview Register developed custom handlebars helper.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var helper = require('./helper');
var Handlebars = require('hbsfy/runtime');

util.forEach(helper, function(helper, name) {
    Handlebars.registerHelper(name, helper);
}, this);

