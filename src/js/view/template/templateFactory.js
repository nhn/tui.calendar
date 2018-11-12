'use strict';

var util = require('tui-code-snippet');
var datetime = require('../../common/datetime');
var common = require('../../common/common');
var config = require('../../config');

var SIXTY_MINUTES = 60;

/**
 * @type {Template}
 */
var templates = {
    /**********
     * Default schedule template
     **********/

    'milestone-tmpl': function(model) {
        var icon = config.classname('icon');
        var iconName = config.classname('ic-milestone');

        return '<span class="' + icon + ' ' + iconName + '"></span><span style="background-color: ' + model.bgColor + '">' + common.stripTags(model.title) + '</span>';
    },

    'milestoneTitle-tmpl': function() {
        var className = config.classname('left-content');

        return '<span class="' + className + '">Milestone</span>';
    },

    'task-tmpl': function(model) {
        return '#' + model.title;
    },

    'taskTitle-tmpl': function() {
        var className = config.classname('left-content');

        return '<span class="' + className + '">Task</span>';
    },

    'alldayTitle-tmpl': function() {
        var className = config.classname('left-content');

        return '<span class="' + className + '">All Day</span>';
    },

    'allday-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'time-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'monthMoreTitleDate-tmpl': function(date, dayname) {
        var classDay = config.classname('month-more-title-day');
        var classDayLabel = config.classname('month-more-title-day-label');
        var day = util.pick(date.split('.'), 2);

        return '<span class="' + classDay + '">' + day + '</span> <span class="' + classDayLabel + '">' + dayname + '</span>';
    },

    'monthMoreClose-tmpl': function() {
        return '';
    },

    'monthGridHeader-tmpl': function(model) {
        var date = parseInt(model.date.split('-')[2], 10);
        var classNames = [];

        classNames.push(config.classname('weekday-grid-date'));
        if (model.isToday) {
            classNames.push(config.classname('weekday-grid-date-decorator'));
        }

        return '<span class="' + classNames.join(' ') + '">' + date + '</span>';
    },

    'monthGridHeaderExceed-tmpl': function(hiddenSchedules) {
        var className = config.classname('weekday-grid-more-schedules');

        return '<span class="' + className + '">' + hiddenSchedules + ' more</span>';
    },

    'monthGridFooter-tmpl': function() {
        return '';
    },

    /* eslint no-unused-vars: 0 */
    'monthGridFooterExceed-tmpl': function(hiddenSchedules) {
        return '';
    },

    'weekDayname-tmpl': function(model) {
        var classDate = config.classname('dayname-date');
        var className = config.classname('dayname-name');

        return '<span class="' + classDate + '">' + model.date + '</span>&nbsp;&nbsp;<span class="' + className + '">' + model.dayName + '</span>';
    },

    'monthDayname-tmpl': function(model) {
        return model.label;
    },

    'weekGridFooterExceed-tmpl': function(hiddenSchedules) {
        return '+' + hiddenSchedules;
    },

    'dayGridTitle-tmpl': function(viewName) {
        var tmpl = this.get(viewName + 'Title-tmpl');
        if (tmpl) {
            return tmpl(viewName);
        }

        return viewName;
    },

    'schedule-tmpl': function(model) {
        var tmpl = this.get(model.category + '-tmpl');
        if (tmpl) {
            return tmpl(model);
        }

        return '';
    },

    'collapseBtnTitle-tmpl': function() {
        var iconName = config.classname('icon');
        var closeIconName = config.classname('ic-arrow-solid-top');

        return '<span class="' + iconName + ' ' + closeIconName + '"></span>';
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
    'popupDetailDate-tmpl': function(isAllDay, start, end) {
        var isSameDate = datetime.isSameDate(start, end);
        var endFormat = (isSameDate ? '' : 'YYYY.MM.DD ') + 'hh:mm tt';

        if (isAllDay) {
            return datetime.format(start, 'YYYY.MM.DD') + (isSameDate ? '' : ' - ' + datetime.format(end, 'YYYY.MM.DD'));
        }

        return (datetime.format(start, 'YYYY.MM.DD hh:mm tt') + ' - ' + datetime.format(end, endFormat));
    },
    'popupDetailLocation-tmpl': function(schedule) {
        return schedule.location;
    },
    'popupDetailUser-tmpl': function(schedule) {
        var creator = util.pick(schedule, 'raw', 'creator', 'name');

        return creator;
    },
    'popupDetailState-tmpl': function(schedule) {
        return schedule.state || 'Busy';
    },
    'popupEdit-tmpl': function() {
        return 'Edit';
    },
    'popupDelete-tmpl': function() {
        return 'Delete';
    },
    'timezoneDisplayLabel-tmpl': function(timezoneOffset, displayLabel) {
        var gmt, hour, minutes;

        if (util.isUndefined(displayLabel)) {
            gmt = timezoneOffset < 0 ? '-' : '+';
            hour = Math.abs(parseInt(timezoneOffset / SIXTY_MINUTES, 10));
            minutes = Math.abs(timezoneOffset % 60);
            displayLabel = gmt + datetime.leadingZero(hour, 2) + ':' + datetime.leadingZero(minutes, 2);
        }

        return displayLabel;
    },
    'timegridDisplayPrimayTime-tmpl': function(time) {
        var meridiem = time.hour < 12 ? 'am' : 'pm';

        return time.hour + ' ' + meridiem;
    },
    'timegridDisplayTime-tmpl': function(time) {
        return datetime.leadingZero(time.hour, 2) + ':' + datetime.leadingZero(time.minutes, 2);
    }
};

module.exports = {
    set: function(name, template) {
        templates[name + '-tmpl'] = template;
    },
    get: function(name) {
        return templates[name + '-tmpl'];
    }
};
