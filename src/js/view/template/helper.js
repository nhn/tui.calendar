/* eslint complexity: 0 */
/**
 * @fileoverview Helpers for handlebar templates.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var Handlebars = require('handlebars-template-loader/runtime');
var datetime = require('../../common/datetime');
var common = require('../../common/common');
var config = require('../../config');
var mmax = Math.max;

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

/**
 * Get element left based on narrowWeekend
 * @param {object} viewModel - view model
 * @param {Array} grids - dates information
 * @returns {number} element left
 */
function getElLeft(viewModel, grids) {
    return grids[viewModel.left] ? grids[viewModel.left].left : 0;
}

/**
 * Get element width based on narrowWeekend
 * @param {object} viewModel - view model
 * @param {Array} grids - dates information
 * @returns {number} element width
 */
function getElWidth(viewModel, grids) {
    var width = 0;
    var i = 0;
    var length = grids.length;
    var left;
    for (; i < viewModel.width; i += 1) {
        left = (viewModel.left + i) % length;
        left += parseInt((viewModel.left + i) / length, 10);
        if (left < length) {
            width += grids[left] ? grids[left].width : 0;
        }
    }

    return width;
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
            case '!==':
                return (a !== b) ? options.fn(this) : options.inverse(this);
            case '<':
                return (a < b) ? options.fn(this) : options.inverse(this);
            case '||':
                return (a || b) ? options.fn(this) : options.inverse(this);
            default:
                throw new Error('Not match operation');
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
     * Get element left based on narrowWeekend
     * @param {object} viewModel - view model
     * @param {Array} grids - dates information
     * @returns {number} element left
     */
    'grid-left': function(viewModel, grids) {
        return getElLeft(viewModel, grids);
    },

    /**
     * Get element width based on narrowWeekend
     * @param {object} viewModel - view model
     * @param {Array} grids - dates information
     * @returns {number} element width
     */
    'grid-width': function(viewModel, grids) {
        return getElWidth(viewModel, grids);
    },

    /**
     * Use in time.hbs
     * @param {ScheduleViewModel} viewModel viewModel
     * @returns {string} element size css class
     */
    'time-scheduleBlock': function(viewModel) {
        var top = getElSize(viewModel.top, 'px', 'top'),
            left = getElSize(viewModel.left, '%', 'left'),
            width = getElSize(viewModel.width, '%', 'width'),
            height = getElSize(viewModel.height, 'px', 'height');

        return [top, left, width, height].join(';');
    },

    'month-scheduleBlock': function(viewModel, grids, blockHeight, paddingTop) {
        var top = getElSize(((viewModel.top - 1) * blockHeight) + paddingTop, 'px', 'top');
        var left = getElSize(grids[viewModel.left] ? grids[viewModel.left].left : 0, '%', 'left');
        var width = getElSize(getElWidth(viewModel, grids), '%', 'width');
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

    'getRight': function(a, b) {
        return mmax(0, 100 - (a + b));
    },

    /**
     * Get css prefix in global configuration
     * @returns {string} css prefix
     */
    'CSS_PREFIX': function() {
        return config.cssPrefix;
    },

    /**********
     * Default schedule template
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
        return 'Milestone';
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
        return 'Task';
    },

    'alldayTitle-tmpl': function() {
        return 'AllDay';
    },

    'alldayCollapseBtnTitle-tmpl': function() {
        return '∧';
    },

    'allday-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'time-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'monthMoreTitleDate-tmpl': function(date) {
        return date;
    },

    'monthMoreClose-tmpl': function() {
        return 'close';
    },

    'monthGridHeader-tmpl': function(model) {
        return '<span class="tui-full-calendar-weekday-grid-date">' + model.date + '</span>';
    },

    /* eslint no-unused-vars: 0 */
    'monthGridHeaderExceed-tmpl': function(hiddenSchedules) {
        return '';
    },

    'monthGridFooter-tmpl': function() {
        return '';
    },

    /* eslint no-unused-vars: 0 */
    'monthGridFooterExceed-tmpl': function(hiddenSchedules) {
        return '';
    },

    'weekDayname-tmpl': function(model) {
        return '<span class="tui-full-calendar-dayname-date">' + model.date + '</span> ' + model.dayName;
    },

    'monthDayname-tmpl': function(model) {
        return model.label;
    },

    'weekGridFooterExceed-tmpl': function(hiddenSchedules) {
        return '+' + hiddenSchedules;
    },

    'dayGridTitle-tmpl': function(viewName) {
        var tmpl = Handlebars.helpers[viewName + 'Title-tmpl'];
        if (tmpl) {
            return tmpl(viewName);
        }

        return viewName;
    },

    'schedule-tmpl': function(model) {
        var tmpl = Handlebars.helpers[model.category + '-tmpl'];
        if (tmpl) {
            return tmpl(model);
        }

        return '';
    },

    'collapseBtnTitle-tmpl': function() {
        return '∧';
    },

    'popupIsAllDay-tmpl': function() {
        return 'All day';
    },

    'popupStateFree-tmpl': function() {
        return 'Free';
    },

    'popupStateBusy-tmpl': function() {
        return 'Busy';
    },

    'titlePlaceholder-tmpl': function() {
        return 'Subject';
    },

    'locationPlaceholder-tmpl': function() {
        return 'Location';
    },

    'startDatePlaceholder-tmpl': function() {
        return 'Start date';
    },

    'endDatePlaceholder-tmpl': function() {
        return 'End date';
    },
    'popupSave-tmpl': function() {
        return 'Save';
    },
    'popupUpdate-tmpl': function() {
        return 'Update';
    },
    'popupDetailDate-tmpl': function(start, end) {
        var isDateDifferent = start.getDate() !== end.getDate();
        var endFormat = (isDateDifferent ? 'YYYY.MM.DD ' : '') + 'hh:mm tt';

        return (datetime.format(start, 'YYYY.MM.DD hh:mm tt') + ' - ' + datetime.format(end, endFormat));
    },
    'popupDetailLocation-tmpl': function(schedule) {
        return schedule.raw.location;
    },
    'popupDetailUser-tmpl': function(schedule) {
        var creator = schedule.raw.creator;

        return creator ? creator.name : '';
    },
    'popupDetailState-tmpl': function(schedule) {
        return schedule.state || 'Busy';
    },
    'popupEdit-tmpl': function() {
        return 'Edit';
    },
    'popupDelete-tmpl': function() {
        return 'Delete';
    }
});
