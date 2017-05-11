/* eslint complexity: 0 */
/**
 * @fileoverview Helpers for handlebar templates.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = tui.util;
var Handlebars = require('handlebars-template-loader/runtime');
var datetime = require('../../common/datetime');
var common = require('../../common/common');
var config = require('../../config');

/**
 * Get CSS syntax for element size
 * @param {number} value - size value to apply element
 * @param {string} postfix - postfix string ex) px, em, %
 * @param {string} prefix - property name ex) width, height
 * @returns {string} CSS syntax
 */
function getElSize(value, postfix, prefix) {
    prefix = prefix || '';
    if (util.isNumber(value)) {
        return prefix + ':' + value + postfix;
    }

    return prefix + ':auto';
}

Handlebars.registerHelper({
    /**
     * Stamp supplied object
     *
     * Commonly use for rendering object's unique ID to rendered view
     * @param {object} obj - object to stamp
     * @returns {number} stamp value
     */
    'stamp': function(obj) {
        return util.stamp(obj);
    },

    /**
     * Whether supplied object are equal?
     * @param {*} a - a
     * @param {*} b - b
     * @returns {boolean} result of operation
     */
    'equal': function(a, b) {
        return a === b;
    },

    /**
     * OR
     * @param {*} a - a
     * @param {*} b - b
     * @returns {boolean} or
     */
    'or': function(a, b) {
        return a || b;
    },

    /**
     * Compare object or apply logical operation by customizable oper parameter
     * @param {*} a - a
     * @param {string} oper - operator ex) '==', '<'
     * @param {*} b - b
     * @param {Handlebars} options - handlebar options
     * @returns {boolean} result of operation
     */
    'fi': function(a, oper, b, options) {
        switch (oper) {
            case '==':
                return (a == b) ? options.fn(this) : options.inverse(this);  // eslint-disable-line
            case '===':
                return (a === b) ? options.fn(this) : options.inverse(this);
            case '<':
                return (a < b) ? options.fn(this) : options.inverse(this);
            case '||':
                return (a || b) ? options.fn(this) : options.inverse(this);
            default:
                break;
        }
    },

    /**
     * Get hhmm formatted time str
     * @param {Date} date - date object
     * @returns {string} formatted value
     */
    'hhmm': function(date) {
        return datetime.format(date, 'HH:mm');
    },

    /**
     * Get `width` stylesheet string
     * @param {number} width - width percentage
     * @returns {string} css style part
     */
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

    'month-eventBlock': function(viewModel, blockHeight, blockWidth, paddingTop) {
        var top = getElSize(viewModel.top * blockHeight + paddingTop, 'px', 'top');
        var left = getElSize(viewModel.left * blockWidth, '%', 'left');
        var width = getElSize(viewModel.width * blockWidth, '%', 'width');
        var height = getElSize(viewModel.height, 'px', 'height');

        return [top, left, width, height].join(';');
    },

    'holiday': function(day) {
        var cssClass = '';

        if (day === 0) {
            cssClass = config.classname('holiday-sun');
        }

        if (day === 6) {
            cssClass = config.classname('holiday-sat');
        }

        return cssClass;
    },

    /**
     * Add supplied two parameter
     * @param {*} a - a
     * @param {*} b - b
     * @returns {number} result of operation
     */
    'add': function(a, b) {
        return a + b;
    },

    /**
     * Multiply supplied two parameter
     * @param {*} a - a
     * @param {*} b - b
     * @returns {number} result of operation
     */
    'multiply': function(a, b) {
        return a * b;
    },

    /**
     * Divide supplied two parameter
     * @param {*} a - a
     * @param {*} b - b
     * @returns {number} result of operation
     */
    'divide': function(a, b) {
        return a / b;
    },

    /**
     * Subtract supplied two parameter
     * @param {*} a - a
     * @param {*} b - b
     * @returns {number} result of operation
     */
    'subtract': function(a, b) {
        return a - b;
    },

    /**
     * Get css prefix in global configuration
     * @returns {string} css prefix
     */
    'CSS_PREFIX': function() {
        return config.cssPrefix;
    },


    /**********
     * Default event template
     **********/

    'milestone-tmpl': function(model) {
        return '<span class="' +
            config.classname('dot') +
            '" style="background-color:' +
            model.bgColor +
            '"></span> ' +
            common.stripTags(model.title);
    },

    'milestoneTitle-tmpl': function() {
        return '마일스톤';
    },

    'task-tmpl': function(model) {
        return '<span class="' +
            config.classname('dot') +
            '" style="background-color:' +
            model.bgColor +
            '"></span> ' +
            common.stripTags(model.title);
    },

    'taskTitle-tmpl': function() {
        return '업무';
    },

    'alldayTitle-tmpl': function() {
        return '종일';
    },

    'allday-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'time-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'split-time-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'minicalendar-tmpl': function(model) {},  // eslint-disable-line

    'freebusy-title-tmpl': function(model) {
        return model.name;
    }
});
