/**
 * @fileoverview Register developed custom handlebars helper.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var helper = require('./helper');
var Handlebars = require('hbsfy/runtime');

util.forEach(helper, function(h, name) {
    Handlebars.registerHelper(name, h);
});

