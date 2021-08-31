/**
 * @fileoverview View for rendering daynames
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var common = require('../../common/common');
var datetime = require('../../common/datetime');
var TZDate = require('../../common/timezone').Date;
var domutil = require('../../common/domutil');
var View = require('../view');
var daynameTmpl = require('../template/week/daynames.hbs');

/**
 * @constructor
 * @param {object} options - options for dayname view
 * @param {HTMLElement} container Container element to use.
 * @param {Theme} theme - theme instance
 * @extends {View}
 */
function DayName(options, container, theme) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('dayname-container')
    );

    this.options = util.extend({
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        timezones: options.timezones
    }, options.week);

    /**
     * @type {Theme}
     */
    this.theme = theme;

    View.call(this, container);

    this.applyTheme();
}

util.inherit(DayName, View);

/**
 * Get default viewmodels.
 * @param {Date} start The date of start render
 * @param {Date} end The end of end render
 * @param {object} grids grid data(width, left, day)
 * @returns {array} viewmodel.
 */
DayName.prototype._getBaseViewModel = function(start, end, grids) {
    var daynames = this.options.daynames,
        theme = this.theme,
        now = new TZDate().toLocalTime(),
        viewModel;

    viewModel = util.map(datetime.range(
        datetime.start(start),
        datetime.end(end),
        datetime.MILLISECONDS_PER_DAY
    ), function(d, i) {
        var day = d.getDay();
        var isToday = datetime.isSameDate(d, now);
        var isPastDay = d < now && !isToday;

        return {
            day: day,
            dayName: daynames[day],
            isToday: isToday,
            date: d.getDate(),
            left: grids[i] ? grids[i].left : 0,
            width: grids[i] ? grids[i].width : 0,
            renderDate: datetime.format(d, 'YYYY-MM-DD'),
            color: this._getDayNameColor(theme, day, isToday, isPastDay)
        };
    }, this);

    return viewModel;
};

/**
 * @override
 * @param {object} viewModel View model from parent (WeekView)
 */
DayName.prototype.render = function(viewModel) {
    var dayNames = this._getBaseViewModel(
        viewModel.renderStartDate,
        viewModel.renderEndDate,
        viewModel.grids
    );
    var timezonesCollapsed = viewModel.state.timezonesCollapsed;
    var styles = this._getStyles(this.theme, timezonesCollapsed);
    var baseViewModel = util.extend({}, {
        dayNames: dayNames,
        styles: styles
    });

    this.container.innerHTML = daynameTmpl(baseViewModel);
};

/**
 * Get a day name color
 * @param {Theme} theme - theme instance
 * @param {number} day - day number
 * @param {boolean} isToday - today flag
 * @param {boolean} isPastDay - is past day flag
 * @returns {string} style - color style
 */
DayName.prototype._getDayNameColor = function(theme, day, isToday, isPastDay) {
    var color = '';

    if (theme) {
        if (day === 0) {
            color = theme.common.holiday.color;
        } else if (isPastDay) {
            color = theme.week.pastDay.color || theme.common.dayname.color;
        } else if (day === 6) {
            color = theme.common.saturday.color;
        } else if (isToday) {
            color = theme.week.today.color || theme.common.today.color;
        } else {
            color = theme.common.dayname.color;
        }
    }

    return color;
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @param {boolean} timezonesCollapsed - multiple timezones are collapsed.
 * @returns {object} styles - styles object
 */
DayName.prototype._getStyles = function(theme, timezonesCollapsed) {
    var styles = {};
    var timezonesLength = this.options.timezones.length;
    var collapsed = timezonesCollapsed;
    var numberAndUnit;

    if (theme) {
        styles.borderTop = theme.week.dayname.borderTop || theme.common.border;
        styles.borderBottom = theme.week.dayname.borderBottom || theme.common.border;
        styles.borderLeft = theme.week.dayname.borderLeft || theme.common.border;
        styles.paddingLeft = theme.week.dayname.paddingLeft;
        styles.backgroundColor = theme.week.dayname.backgroundColor;
        styles.height = theme.week.dayname.height;
        styles.textAlign = theme.week.dayname.textAlign;
        styles.marginLeft = theme.week.daygridLeft.width;

        if (!collapsed && timezonesLength > 1) {
            numberAndUnit = common.parseUnit(styles.marginLeft);
            styles.marginLeft = (numberAndUnit[0] * timezonesLength) + numberAndUnit[1];
        }
    }

    return styles;
};

DayName.prototype.applyTheme = function() {
    var styles = this._getStyles(this.theme);
    var style = this.container.style;

    style.borderTop = styles.borderTop;
    style.borderBottom = styles.borderBottom;
    style.height = styles.height;
    style.backgroundColor = styles.backgroundColor;
    style.textAlign = styles.textAlign;

    return style;
};

module.exports = DayName;
