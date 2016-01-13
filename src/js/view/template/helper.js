/**
 * @fileoverview Helpers for handlebar templates.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var datetime = require('../../common/datetime');
var common = require('../../common/common');
var config = require('../../config');

function getElSize(value, postfix, prefix) {
    prefix = prefix || '';
    if (util.isNumber(value)) {
        return prefix + ':' + value + postfix;
    }

    return prefix + ':auto';
}

module.exports = {
    'stamp': function(obj) {
        return util.stamp(obj);
    },

    'equal': function(a, b) {
        return a === b;
    },

    'or': function(a, b) {
        return a || b;
    },

    'fi': function(a, oper, b, options) {
        switch (oper) {
            case '==':
                return (a == b) ? options.fn(this) : options.inverse(this);
            case '===':
                return  (a === b) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (a <= b) ? options.fn(this) : options.inverse(this);
            default:
                break;
        }
    },

    'hhmm': function(date) {
        return datetime.format(date, 'HH:mm');
    },

    'common-width': function(width) {
        return getElSize(width, '%', 'width');
    },

    /**
     * Use in time.hbs
     * @param {CalEventViewModel} eventViewModel viewModel
     * @returns {string} element size css class
     */
    'time-eventBlock': function(eventViewModel) {
        var top = getElSize(eventViewModel.top, 'px', 'top'),
            left = getElSize(eventViewModel.left, '%', 'left'),
            width = getElSize(eventViewModel.width, '%', 'width'),
            height = getElSize(eventViewModel.height, 'px', 'height');

        return [top, left, width, height].join(';');
    },

    /**
     * Use in dayname.hbs
     * @returns {string} css class
     */
    'dayname-isHolliday': function() {
        if (this.day === 0 || this.day === 6) {
            return config.classname('dayname') + ' ' + config.classname('holliday');
        }

        return config.classname('dayname');
    },

    'add': function(a, b) {
        return a + b;
    },

    'multiply': function(a, b) {
        return a * b;
    },

    'divide': function(a, b) {
        return a / b;
    },

    'subtract': function(a, b) {
        return a - b;
    },

    'CSS_PREFIX': function() {
        return config.cssPrefix;
    },


    /**********
     * Default event template
     **********/

    'milestone-tmpl': function(model) {
        return '<span class="' + config.classname('dot') + '" style="background-color:' + model.bgColor + '"></span> ' + common.stripTags(model.title);
    },

    'task-tmpl': function(model) {
        return '<span class="' + config.classname('dot') + '" style="background-color:' + model.bgColor + '"></span> ' + common.stripTags(model.title);
    },

    'taskTitle-tmpl': function() {
        return '업무';
    },

    'allday-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'time-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'minicalendar-tmpl': function(model) {}
};

