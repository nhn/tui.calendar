'use strict';

/* eslint-disable no-unused-vars */
var Snabbdom = require('snabbdom-pragma');
var h = require('snabbdom/h')['default']; // helper function for creating vnodes
var util = require('tui-code-snippet');
var Templates = require('../templateFactory');
var Helpers = require('../templateHelper');
var config = require('../../../config');

var htmlToVNodes = Helpers.htmlToVNodes;
var styleStringToObject = Helpers.styleStringToObject;
var toStyles = Helpers.objectToStyleString;
var monthScheduleBlock = Helpers['month-scheduleBlock'];

var WeekdaySchedule = function(props) {
    var allday = Templates.get('allday');
    var time = Templates.get('time');

    var model = props.model;
    var matrices = model.matrices;
    var styles = model.styles;

    var renderLimitIdx = model.renderLimitIdx;
    var dates = model.dates;
    var scheduleBlockHeight = model.scheduleBlockHeight;
    var gridHeaderHeight = model.gridHeaderHeight;
    var scheduleBlockGutter = model.scheduleBlockGutter;
    var scheduleHeight = model.scheduleHeight;

    var schedules = [];
    var renderAlldaySchedule = function(viewModel) {
        var vnode;
        var isFocused = viewModel.model.isFocused;
        var alldayStyles = util.extend({
            height: scheduleHeight + 'px',
            'line-height': scheduleHeight + 'px',
            'border-radius': styles.borderRadius,
            color: isFocused ? '#ffffff' : viewModel.model.color,
            'background-color': isFocused ? viewModel.model.color : viewModel.model.bgColor,
            'border-color': isFocused ? viewModel.model.color : viewModel.model.borderColor
        }, styleStringToObject(viewModel.model.customStyles));
        var dataset = {
            'scheduleId': viewModel.model.id,
            'calendarId': viewModel.model.calendarId
        };
        var classNames = [config.classname('weekday-schedule')];

        if (isFocused) {
            classNames.push(config.classname('weekday-schedule-focused'));
        }

        if (!viewModel.exceedLeft) {
            alldayStyles['margin-left'] = styles.marginLeft;
        }
        if (!viewModel.exceedRight) {
            alldayStyles['margin-right'] = styles.marginRight;
        }

        return (
            <div dataset={dataset} className={classNames.join(' ')} style={alldayStyles}>
                <span className={config.classname('weekday-schedule-title')} title={viewModel.model.title}>
                    {htmlToVNodes(allday(viewModel.model))}
                </span>
                {!viewModel.isReadOnly && !viewModel.model.isReadOnly && <span className={config.classname('weekday-resize-handle') + ' ' + config.classname('handle-y')} style={{'line-height': scheduleHeight + 'px'}}>&nbsp;</span>}
            </div>);
    };

    var renderNormalSchedule = function(viewModel) {
        var vnode;
        var isFocused = viewModel.model.isFocused;
        var normalStyles = util.extend({
            height: scheduleHeight + 'px',
            'line-height': scheduleHeight + 'px'
        }, styleStringToObject(viewModel.model.customStyles));
        var bulletStyles = {
            top: styles.scheduleBulletTop + 'px',
            background: isFocused ? '#ffffff' : viewModel.model.borderColor
        };
        var titleStyles = {
            color: isFocused ? '#ffffff' : '#333'
        };
        var dataset = {
            'scheduleId': viewModel.model.id,
            'calendarId': viewModel.model.calendarId
        };

        if (isFocused) {
            titleStyles['background-color'] = viewModel.model.color;
        }

        return (
            <div dataset={dataset}
                className={config.classname('weekday-schedule') + ' ' + config.classname('weekday-schedule-time')} style={normalStyles}>
                <span className={config.classname('weekday-schedule-bullet')} style={bulletStyles}></span>
                <span className={config.classname('weekday-schedule-title')} style={titleStyles} title={viewModel.model.title}>
                    {htmlToVNodes(time(viewModel.model))}
                </span>
            </div>);
    };

    var renderSchedule = function(viewModel) {
        var vnode;
        var scheduleBlockStyles = util.extend({
            'margin-top': scheduleBlockGutter + 'px'
        }, styleStringToObject(monthScheduleBlock(viewModel, dates, scheduleBlockHeight, gridHeaderHeight)));

        var classNames = [];
        classNames.push(config.classname('weekday-schedule-block'));
        classNames.push(config.classname('weekday-schedule-block-' + util.stamp(viewModel.model)));

        if (viewModel.exceedLeft) {
            classNames.push(config.classname('weekday-exceed-left'));
        }
        if (viewModel.exceedRight) {
            classNames.push(config.classname('weekday-exceed-right'));
        }

        return (
            <div
                dataset={{id: util.stamp(viewModel.model)}}
                className={classNames.join(' ')}
                style={scheduleBlockStyles}>
                {(viewModel.model.isAllday || viewModel.hasMultiDates) ?
                    renderAlldaySchedule(viewModel) : renderNormalSchedule(viewModel)}
            </div>);
    };

    util.forEach(matrices, function(matrix) {
        util.forEach(matrix, function(column) {
            util.forEach(column, function(viewModel) {
                if (!viewModel || viewModel.top >= renderLimitIdx) {
                    return;
                }

                schedules.push(renderSchedule(viewModel));
            });
        });
    });

    return schedules;
};

module.exports = WeekdaySchedule;
