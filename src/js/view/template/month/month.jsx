'use strict';

/* eslint-disable no-unused-vars */
var Snabbdom = require('snabbdom-pragma');
var util = require('tui-code-snippet');
var Templates = require('../templateFactory');
var Helpers = require('../templateHelper');
var config = require('../../../config');

var htmlToVNodes = Helpers.htmlToVNodes;

var DayName = function(props) {
    var monthDayname = Templates.get('monthDayname');

    var model = props.dayname;
    var last = props.last;
    var styles = props.styles;

    var itemStyle = {
        position: 'absolute',
        width: model.width + '%',
        left: model.left + '%',
        'padding-left': styles.paddingLeft,
        'padding-right': styles.paddingRight,
        'line-height': styles.height
    };
    var className = Helpers.holiday(model.day);

    if (!last) {
        itemStyle['border-right'] = styles.borderLeft;
    }

    return <div className={config.classname('month-dayname-item')}
        style={itemStyle}>
        <span className={className} style={{color: model.color}}>
            {htmlToVNodes(monthDayname(model))}
        </span>
    </div>;
};

/**
 * render month container
 * @param {object} model - data model
 * @returns {VNode}
 */
var MonthDayName = function(model) {
    var daynames = model.daynames;
    var styles = model.styles;
    var dayNameStyle = {
        'border-top': styles.borderTop,
        height: styles.height,
        'font-size': styles.fontSize,
        'background-color': styles.backgroundColor,
        'text-align': styles.textAlign,
        'font-weight': styles.fontWeight
    };

    return <div className={config.classname('month-dayname')} style={dayNameStyle}>
        {
            util.map(daynames, function(dayname, index, arr) {
                return <DayName dayname={dayname} last={index === arr.length - 1} styles={styles} />;
            })
        }
    </div>;
};

module.exports = MonthDayName;
