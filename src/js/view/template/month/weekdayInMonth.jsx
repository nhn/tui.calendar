'use strict';

/* eslint-disable no-unused-vars */
var Snabbdom = require('snabbdom-pragma');
var h = require('snabbdom/h')['default']; // helper function for creating vnodes
var util = require('tui-code-snippet');
var Templates = require('../templateFactory');
var Helpers = require('../templateHelper');
var config = require('../../../config');

var WeekdaySchedules = require('./weekdayInMonthSchedule.jsx');

var htmlToVNodes = Helpers.htmlToVNodes;
var toStyles = Helpers.objectToStyleString;

var WeekdayBorder = function(props) {
    var styles = props.styles;

    return <div className={config.classname('weekday-border')} style={{'border-top': styles.borderTop}}></div>;
};

var WeekdayGrid = function(props) {
    var monthGridHeader = Templates.get('monthGridHeader');
    var monthGridHeaderExceed = Templates.get('monthGridHeaderExceed');
    var monthGridFooter = Templates.get('monthGridFooter');
    var monthGridFooterExceed = Templates.get('monthGridFooterExceed');

    var model = props.date;
    var last = props.last;
    var styles = props.styles;

    var day = model.day;
    var date = model.date;
    var isToday = model.isToday;
    var isOtherMonth = model.isOtherMonth;
    var width = model.width;
    var left = model.left;
    var backgroundColor = model.backgroundColor;
    var color = model.color;
    var hiddenSchedules = model.hiddenSchedules;
    var ymd = model.ymd;

    var gridLinestyle = {
        width: width + '%',
        left: left + '%',
        'background-color': backgroundColor,
        'font-size': styles.fontSize
    };

    var classNames = [config.classname('weekday-grid-line')];
    var holidayClassName = Helpers.holiday(day);
    if (holidayClassName) {
        classNames.push(holidayClassName);
    }

    if (date !== 1) {
        classNames.push(config.classname('near-month-day'));
    }
    if (isToday) {
        classNames.push(config.classname('today'));
    }
    if (isOtherMonth) {
        classNames.push(config.classname('extra-date'));
    }

    if (!last) {
        gridLinestyle['border-right'] = styles.borderLeft;
    }

    return (
        <div className={classNames.join(' ')} style={gridLinestyle}>
            <div className={config.classname('weekday-grid-header')}>
                <span style={{color: color}}>{htmlToVNodes(monthGridHeader(model))}</span>
                {hiddenSchedules !== 0 &&
                    <span className={config.classname('weekday-exceed-in-month')} dataset={{ymd: ymd}}>
                        {htmlToVNodes(monthGridHeaderExceed(hiddenSchedules))}
                    </span>
                }
            </div>
            <div className={config.classname('weekday-grid-footer')}>
                <span style={{color: color}}>{htmlToVNodes(monthGridFooter(model))}</span>
                {hiddenSchedules !== 0 &&
                    <span className={config.classname('weekday-exceed-in-month')} dataset={{ymd: ymd}}>{htmlToVNodes(monthGridFooterExceed(hiddenSchedules))}</span>
                }
            </div>
        </div>);
};

var Weekday = function(model) {
    var dates = model.dates;
    var styles = model.styles;

    return (
        <div>
            <WeekdayBorder styles={styles} />
            <div className={config.classname('weekday-grid')}>
                {
                    util.map(dates, function(date, index, arr) {
                        return <WeekdayGrid date={date} last={index === arr.length - 1} styles={styles} />;
                    })
                }
            </div>
            <div className={config.classname('weekday-schedules')}>
                <WeekdaySchedules model={model} />
            </div>
        </div>);
};

module.exports = Weekday;
