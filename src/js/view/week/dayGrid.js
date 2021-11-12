/**
 * @fileoverview DayGrid in weekly view
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config'),
    common = require('../../common/common'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil'),
    TZDate = require('../../common/timezone').Date,
    View = require('../../view/view'),
    DayGridSchedule = require('./dayGridSchedule'),
    baseTmpl = require('../template/week/dayGrid.hbs'),
    reqAnimFrame = require('../../common/reqAnimFrame');
var mmax = Math.max,
    mmin = Math.min;

/**
 * @constructor
 * @extends {View}
 * @param {string} name - view name
 * @param {object} options - options for DayGridSchedule view
 * @param {number} [options.heightPercent] - height percent of view
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to
 *  make create easy.
 * @param {number} [options.scheduleHeight=18] - height of each schedule block.
 * @param {number} [options.scheduleGutter=2] - gutter height of each schedule block.
 * @param {HTMLDIVElement} container - DOM element to use container for this
 *  view.
 * @param {Theme} theme - theme instance
 */
function DayGrid(name, options, container, theme) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('daygrid-layout')
    );
    View.call(this, container);

    name = name || 'daygrid';

    this.options = util.extend({
        viewName: name,
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        renderStartDate: '',
        renderEndDate: '',
        containerBottomGutter: 18,
        scheduleHeight: parseInt(theme.week.dayGridSchedule.height, 10),
        scheduleGutter: parseInt(theme.week.dayGridSchedule.marginTop, 10),
        scheduleContainerTop: 1,
        timezones: options.timezones,
        isReadOnly: options.isReadOnly,
        getViewModelFunc: function(viewModel) {
            return viewModel.schedulesInDateRange[name];
        },
        setViewModelFunc: function(viewModel, matrices) {
            viewModel.schedulesInDateRange[name] = matrices;
        }
    }, options.week);

    this.handler = {};
    this.vPanel = null;

    this.state.collapsed = true;
}

util.inherit(DayGrid, View);

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
DayGrid.prototype.getBaseViewModel = function(viewModel) {
    var opt = this.options,
        daynames = opt.daynames,
        range = viewModel.range,
        grids = viewModel.grids,
        matrices = opt.getViewModelFunc(viewModel),
        exceedDate = {},
        panel = getPanel(opt.panels, opt.viewName),
        panelHeight = this.getViewBound().height,
        collapsed = this.state.collapsed,
        heightForcedSet = this.vPanel ? this.vPanel.getHeightForcedSet() : false,
        timezonesCollapsed = viewModel.state.timezonesCollapsed,
        styles = this._getStyles(viewModel.theme, timezonesCollapsed);

    var baseViewModel, visibleScheduleCount;
    var now = new TZDate().toLocalTime();

    if (panel.showExpandableButton) {
        if (!heightForcedSet) {
            if (collapsed) {
                panelHeight = mmax(panelHeight, panel.maxHeight);
            } else {
                panelHeight = mmin(panelHeight, panel.maxExpandableHeight);
            }
        }

        visibleScheduleCount = Math.floor(panelHeight / (opt.scheduleHeight + opt.scheduleGutter));
        if (collapsed) {
            exceedDate = this.parent.controller.getExceedDate(visibleScheduleCount,
                matrices,
                viewModel.range
            );
            matrices = this.parent.controller.excludeExceedSchedules(matrices, visibleScheduleCount);
            opt.setViewModelFunc(viewModel, matrices);
        }
    }

    baseViewModel = {
        viewName: opt.viewName,
        range: range,
        grids: grids,
        days: util.map(viewModel.range, function(d, index) {
            var day = d.getDay();
            var ymd = datetime.format(d, 'YYYYMMDD');
            var isToday = datetime.isSameDate(now, d);

            return {
                day: day,
                dayName: daynames[day],
                isToday: isToday,
                date: d.getDate(),
                renderDate: datetime.format(d, 'YYYY-MM-DD'),
                hiddenSchedules: exceedDate[ymd] || 0,
                width: grids[index] ? grids[index].width : 0,
                left: grids[index] ? grids[index].left : 0,
                backgroundColor: viewModel.range.length > 1 ?
                    getWeekBackgroundColor(day, isToday, styles) : styles.backgroundColor
            };
        }),
        exceedDate: exceedDate,
        showExpandableButton: panel.showExpandableButton,
        collapsed: collapsed,
        collapseBtnIndex: this.state.clickedExpandBtnIndex,
        styles: styles
    };

    return baseViewModel;
};

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
DayGrid.prototype.render = function(viewModel) {
    var opt = this.options,
        container = this.container,
        baseViewModel = this.getBaseViewModel(viewModel),
        scheduleContainerTop = this.options.scheduleContainerTop;
    var dayGridSchedule;

    container.innerHTML = baseTmpl(baseViewModel);

    this.children.clear();

    dayGridSchedule = new DayGridSchedule(
        opt,
        domutil.find(config.classname('.container'), container)
    );
    this.addChild(dayGridSchedule);

    dayGridSchedule.on('afterRender', function(weekdayViewModel) {
        baseViewModel.height = weekdayViewModel.minHeight + scheduleContainerTop;
    });

    this.children.each(function(childView) {
        childView.render(viewModel);
    }, this);

    this.fire('afterRender', baseViewModel);
};

DayGrid.prototype._beforeDestroy = function() {
};

DayGrid.prototype.addHandler = function(type, handler, vPanel) {
    var self = this;

    this.handler[type] = handler;
    this.vPanel = vPanel;

    if (type === 'click') {
        handler.on('expand', function() {
            self.setState({
                collapsed: false
            });
        }, this);
        handler.on('collapse', function() {
            self.setState({
                collapsed: true
            });
        }, this);
    }
};

DayGrid.prototype._expand = function() {
    reqAnimFrame.requestAnimFrame(function() {
        var vPanel = this.vPanel;
        var opt = this.options;
        var panel = getPanel(opt.panels, opt.viewName);

        vPanel.setMaxHeight(panel.maxExpandableHeight);
        vPanel.setHeightForcedSet(false);
        vPanel.setHeight(null, panel.maxExpandableHeight);

        if (this.parent) {
            this.parent.render();
        }
    }, this);
};

DayGrid.prototype._collapse = function() {
    reqAnimFrame.requestAnimFrame(function() {
        var vPanel = this.vPanel;
        var opt = this.options;
        var panel = getPanel(opt.panels, opt.viewName);

        vPanel.setMaxHeight(panel.maxHeight);
        vPanel.setHeightForcedSet(false);
        vPanel.setHeight(null, panel.minHeight);

        if (this.parent) {
            this.parent.render();
        }
    }, this);
};

/**
 * set state
 * @param {object} state - state
 */
DayGrid.prototype.setState = function(state) {
    var collapsed = this.state.collapsed;
    View.prototype.setState.call(this, state);

    if (this.state.collapsed === collapsed) {
        return;
    }

    if (this.state.collapsed) {
        this._collapse();
    } else {
        this._expand();
    }
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @param {boolean} timezonesCollapsed - multiple timezones are collapsed.
 * @returns {object} styles - styles object
 */
DayGrid.prototype._getStyles = function(theme, timezonesCollapsed) {
    var styles = {};
    var timezonesLength = this.options.timezones.length;
    var collapsed = timezonesCollapsed;
    var numberAndUnit;

    if (theme) {
        styles.borderRight = theme.week.daygrid.borderRight || theme.common.border;
        styles.todayBackgroundColor = theme.week.today.backgroundColor;
        styles.weekendBackgroundColor = theme.week.weekend.backgroundColor;
        styles.backgroundColor = theme.week.daygrid.backgroundColor;
        styles.leftWidth = theme.week.daygridLeft.width;
        styles.leftBackgroundColor = theme.week.daygridLeft.backgroundColor;
        styles.leftPaddingRight = theme.week.daygridLeft.paddingRight;
        styles.leftBorderRight = theme.week.daygridLeft.borderRight;

        if (!collapsed && timezonesLength > 1) {
            numberAndUnit = common.parseUnit(styles.leftWidth);
            styles.leftWidth = (numberAndUnit[0] * timezonesLength) + numberAndUnit[1];
        }
    }

    return styles;
};

/**
 * Get a background color based on day.
 * @param {number} day - day number
 * @param {boolean} isToday - today flag
 * @param {object} styles - style object
 * @returns {string} backgroundColor
 */
function getWeekBackgroundColor(day, isToday, styles) {
    var backgroundColor = '';

    if (day === 0 || day === 6) {
        backgroundColor = styles.weekendBackgroundColor;
    } else if (isToday) {
        backgroundColor = styles.todayBackgroundColor;
    } else {
        backgroundColor = styles.backgroundColor;
    }

    return backgroundColor;
}

/**
 * get a panel infomation
 * @param {Array.<object[]>} panels - panel infomations
 * @param {string} name - panel name
 * @returns {object} panel information
 */
function getPanel(panels, name) {
    var found;

    util.forEach(panels, function(panel) {
        if (panel.name === name) {
            found = panel;
        }
    });

    return found;
}

module.exports = DayGrid;
