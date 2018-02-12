/**
 * @fileoverview Factory module for control all other factory.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = require('tui-code-snippet'),
    Handlebars = require('handlebars-template-loader/runtime');
var dw = require('../common/dw'),
    datetime = require('../common/datetime'),
    Layout = require('../view/layout'),
    Drag = require('../handler/drag'),
    controllerFactory = require('./controller'),
    weekViewFactory = require('./weekView'),
    monthViewFactory = require('./monthView'),
    TZDate = require('../common/timezone').Date,
    config = require('../config'),
    timezone = require('../common/timezone');

var mmin = Math.min;

/**
 * @typedef {object} Schedule
 * @property {string} id - unique schedule id depends on calendar id
 * @property {string} calendarId - unique calendar id
 * @property {string} title - schedule title
 * @property {string} start - start time
 * @property {string} end - end time
 * @property {boolean} isAllDay - all day schedule
 * @property {string} category - schedule type('milestone', 'task', allday', 'time')
 * @property {string} dueDateClass - task schedule type string
 *                                   (any string value is ok and mandatory if category is 'task')
 * @property {boolean} isPending - in progress flag to do something like network job(The schedule will be transparent.)
 * @property {boolean} isFocused - focused schedule flag
 * @property {boolean} isVisible - schedule visibility flag
 * @property {boolean} isReadOnly - schedule read-only flag
 * @property {string} [color] - schedule text color
 * @property {string} [bgColor] - schedule background color
 * @property {string} [borderColor] - schedule left border color
 * @property {string} customStyle - schedule's custom css class
 * @property {any} raw - user data
 */

/**
 * @typedef {object} RenderRange - rendered range
 * @property {Date} start - start date
 * @property {Date} end - end date
 */

/**
 * @typedef {object} Options - calendar option object
 * @property {string} [cssPrefix] - CSS classname prefix
 *  @property {string} [defaultView='week'] - default view of calendar
 *  @property {string} [defaultDate=null] - default date to render calendar. if not supplied, use today.
 *  @property {object} [calendarColor] - preset calendar colors
 *   @property {string} [calendarColor.color] - calendar color
 *   @property {string} [calendarColor.bgColor] - calendar background color
 *   @property {string} [calendarColor.borderColor] - calendar left border color
 *   @property {boolean} [calendarColor.render] - immediately apply colors when setCalendarColor called.
 *  @property {boolean} [taskView=true] - show the milestone and task in weekly, daily view
 *  @property {object} [template] - template option
 *   @property {function} [template.milestoneTitle] - milestone title(at left column) template function
 *   @property {function} [template.milestone] - milestone template function
 *   @property {function} [template.taskTitle] - task title(at left column) template function
 *   @property {function} [template.task] - task template function
 *   @property {function} [template.alldayTitle] - allday title(at left column) template function
 *   @property {function} [template.allday] - allday template function
 *   @property {function} [template.time] - time template function
 *   @property {function} [template.monthMoreTitleDate] - month more layer title template function
 *   @property {function} [template.monthMoreClose] - month more layer close button template function
 *   @property {function} [template.monthGridHeader] - month grid header(date, decorator, title) template function
 *   @property {function} [template.monthGridFooter] - month grid footer(date, decorator, title) template function
 *   @property {function} [template.monthGridHeaderExceed] - month grid header(exceed schedule count) template function
 *   @property {function} [template.monthGridFooterExceed] - month grid footer(exceed schedule count) template function
 *   @property {function} [template.weekDayname] - weekly dayname template function
 *   @property {function} [template.monthDayname] - monthly dayname template function
 *  @property {object} [week] - options for week view
 *   @property {number} [week.startDayOfWeek=0] - start day of week
 *   @property {Array.<number>} [week.panelHeights] - each panel height px(Milestone, Task, Allday View Panel)
 *   @property {Array.<string>} [week.daynames] - day names in weekly and daily.
 * Default values are ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
 *   @property {boolean} [week.narrowWeekend=false] - make weekend column narrow(1/2 width)
 *   @property {boolean} [week.workweek=false] - show only 5 days except for weekend
 *  @property {object} [month] - options for month view
 *   @property {Array.<string>} [month.daynames] - day names in monthly.
 * Default values are ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
 *   @property {number} [month.startDayOfWeek=0] - start day of week
 *   @property {boolean} [month.narrowWeekend=false] - make weekend column narrow(1/2 width)
 *   @property {boolean} [month.visibleWeeksCount=6] - visible week count in monthly(0 or null are same with 6)
 *   @property {number} [month.visibleScheduleCount] - visible schedule count in monthly grid
 *   @property {object} [month.moreLayerSize] - more layer size
 *    @property {object} [month.moreLayerSize.width=null] - css width value(px, 'auto').
 *                                                           The default value 'null' is to fit a grid cell.
 *    @property {object} [month.moreLayerSize.height=null] - css height value(px, 'auto').
 *                                                            The default value 'null' is to fit a grid cell.
 *   @property {object} [month.grid] - grid's header and footer information
 *    @property {object} [month.grid.header] - grid's header informatioin
 *     @property {number} [month.grid.header.height=34] - grid's header height
 *    @property {object} [month.grid.footer] - grid's footer informatioin
 *     @property {number} [month.grid.footer.height=34] - grid's footer height
 *  @property {Array.<Schedule>} [schedules] - array of Schedule data for add calendar after initialize.
 */

/**
 * @typedef {class} CustomEvents
 * https://nhnent.github.io/tui.code-snippet/latest/tui.util.CustomEvents.html
 */

/**
 * @typedef {object} TimeCreationGuide - time creation guide instance to present selected time period
 * @property {HTMLElement} guideElement - guide element
 * @property {Object.<string, HTMLElement>} guideElements - map by key. It can be used in monthly view
 * @property {function} clearGuideElement - hide the creation guide
 * @example
 * calendar.on('beforeCreateSchedule', function(event) {
 *     var guide = event.guide;
 *     // use guideEl$'s left, top to locate your schedule creation popup
 *     var guideEl$ = guide.guideElement ? 
 *          guide.guideElement : guide.guideElements[Object.keys(guide.guideElements)[0]];
 * 
 *     // after that call this to hide the creation guide
 *     guide.clearGuideElement();
 * });
 */

/**
 * Calendar class
 * @constructor
 * @mixes CustomEvents
 * @param {HTMLElement|string} container - container element or selector id
 * @param {Options} options - calendar options
 * @example
 * var calendar = new tui.Calendar(document.getElementById('calendar'), {
 *     defaultView: 'week',
 *     taskView: true,
 *     template: {
 *         milestone: function(schedule) {
 *             return '<span style="color:red;"><i class="fa fa-flag"></i> ' + schedule.title + '</span>';
 *         },
 *         milestoneTitle: function() {
 *             return 'Milestone';
 *         },
 *         task: function(schedule) {
 *             return '&nbsp;&nbsp;#' + schedule.title;
 *         },
 *         taskTitle: function() {
 *             return '<label><input type="checkbox" />Task</label>';
 *         },
 *         allday: function(schedule) {
 *             return schedule.title + ' <i class="fa fa-refresh"></i>';
 *         },
 *         alldayTitle: function() {
 *             return 'All Day';
 *         },
 *         time: function(schedule) {
 *             return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
 *         }
 *     },
 *     month: {
 *         daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
 *         startDayOfWeek: 0,
 *         narrowWeekend: true
 *     },
 *     week: {
 *         daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
 *         panelHeights: [80, 80, 120],
 *         startDayOfWeek: 0,
 *         narrowWeekend: true
 *     }
 * });
 */
function Calendar(container, options) {
    var opt;

    if (util.isString(container)) {
        container = document.querySelector(container);
    }

    /**
     * calendar options
     * @type {Options}
     */
    this.options = opt = util.extend({
        calendarColor: {},
        groupFunc: function(viewModel) {
            var model = viewModel.model;

            if (model.category === 'time' && (model.end - model.start > datetime.MILLISECONDS_PER_DAY)) {
                return 'allday';
            }
            return model.category;
        },
        controller: null,
        defaultView: 'week',
        taskView: true,
        defaultDate: new TZDate(),
        template: util.extend({
            allday: null,
            time: null
        }, util.pick(options, 'template') || {}),
        week: util.extend({}, util.pick(options, 'week') || {}),
        month: util.extend({}, util.pick(options, 'month') || {}),
        schedules: []
    }, options);

    this.options.week = util.extend({
        startDayOfWeek: 0,
        workweek: false
    }, util.pick(this.options, 'week') || {});

    this.options.month = util.extend({
        scheduleFilter: function(schedule) {
            return Boolean(schedule.isVisible) &&
                (schedule.category === 'allday' || schedule.category === 'time');
        }
    }, util.pick(options, 'month') || {});

    /**
     * Calendar color map
     * @type {object}
     * @private
     */
    this.calendarColor = opt.calendarColor;

    /**
     * @type {HTMLElement}
     * @private
     */
    this.container = container;

    /**
     * Current rendered date
     * @type {Date}
     * @readonly
     */
    this.renderDate = opt.defaultDate;

    /**
     * start and end date of weekly, monthly
     * @type {RenderRange}
     * @readonly
     */
    this.renderRange = {
        start: null,
        end: null
    };

    /**
     * base controller
     * @type {Base}
     * @private
     */
    this.controller = opt.controller || this.createController();

    /**
     * layout view (layout manager)
     * @type {Layout}
     * @private
     */
    this.layout = new Layout(container);

    /**
     * global drag handler
     * @type {Drag}
     * @private
     */
    this.dragHandler = new Drag({distance: 10}, this.layout.container);

    /**
     * current rendered view name. ('day', 'week', 'month')
     * @type {string}
     * @default 'week'
     * @readonly
     */
    this.viewName = opt.defaultView;

    /**
     * previous rendered view name
     * @type {string}
     * @private
     */
    this.prevViewName = this.viewName;

    /**
     * Refresh method. it can be ref different functions for each view modes.
     * @type {function}
     * @private
     */
    this.refreshMethod = null;

    /**
     * Scroll to now. It can be called for 'week', 'day' view modes.
     * @type {function}
     * @private
     */
    this.scrollToNowMethod = null;

    this.initialize();
}

/**
 * Create controller instance
 * @returns {Base} controller instance
 * @private
 */
Calendar.prototype.createController = function() {
    return controllerFactory(this.options);
};

/**
 * Create week view instance by dependent module instances
 * @param {Base} controller - controller
 * @param {HTMLElement} container - container element
 * @param {Drag} dragHandler - global drag handler
 * @param {object} options - options for week view
 * @returns {Week} week view instance
 * @private
 */
Calendar.prototype.createWeekView = function(controller, container, dragHandler, options) {
    return weekViewFactory(
        controller,
        container,
        dragHandler,
        options
    );
};

/**
 * Create week view instance by dependent module instances
 * @param {Base} controller - controller
 * @param {HTMLElement} container - container element
 * @param {Drag} dragHandler - global drag handler
 * @param {object} options - options for week view
 * @returns {Month} month view instance
 * @private
 */
Calendar.prototype.createMonthView = function(controller, container, dragHandler, options) {
    return monthViewFactory(
        controller,
        container,
        dragHandler,
        options
    );
};

/**
 * destroy calendar instance.
 */
Calendar.prototype.destroy = function() {
    this.dragHandler.destroy();
    this.controller.off();
    this.layout.clear();
    this.layout.destroy();

    util.forEach(this.options.template, function(func, name) {
        if (func) {
            Handlebars.unregisterHelper(name + '-tmpl');
        }
    });

    this.options = this.renderDate = this.controller =
        this.layout = this.dragHandler = this.viewName = this.prevViewName =
        this.refreshMethod = this.scrollToNowMethod = null;
};

/**
 * Initialize calendar
 * @private
 */
Calendar.prototype.initialize = function() {
    var controller = this.controller,
        viewName = this.viewName,
        opt = this.options;

    this.layout.controller = controller;

    if (opt.schedules && opt.schedules.length) {
        this.createSchedules(opt.schedules, true);
    }

    util.forEach(opt.template, function(func, name) {
        if (func) {
            Handlebars.registerHelper(name + '-tmpl', func);
        }
    });

    this.toggleView(viewName, true);
};

/**********
 * CRUD Methods
 **********/

/**
 * Create schedules and render calendar.
 * @param {Array.<Schedule>} schedules - schedule data list
 * @param {boolean} [silent=false] - no auto render after creation when set true
 * @example
 * calendar.createSchedules([
 *     {
 *         id: '1',
 *         calendarId: '1',
 *         title: 'my schedule',
 *         category: 'time',
 *         dueDateClass: '',
 *         start: '2018-01-18T22:30:00+09:00',
 *         end: '2018-01-19T02:30:00+09:00'
 *     },
 *     {
 *         id: '2',
 *         calendarId: '1',
 *         title: 'second schedule',
 *         category: 'time',
 *         dueDateClass: '',
 *         start: '2018-01-18T17:30:00+09:00',
 *         end: '2018-01-19T17:31:00+09:00'
 *     }
 * ]);
 */
Calendar.prototype.createSchedules = function(schedules, silent) {
    var calColor = this.calendarColor;

    util.forEach(schedules, function(obj) {
        var color = calColor[obj.calendarId];

        if (color) {
            obj.color = color.color;
            obj.bgColor = color.bgColor;
            obj.borderColor = color.borderColor;
        }
    });

    this.controller.createSchedules(schedules, silent);

    if (!silent) {
        this.render();
    }
};

/**
 * Get schedule by schedule id and calendar id.
 * @param {string} id - ID of schedule
 * @param {string} calendarId - calendarId of schedule
 * @returns {Schedule} schedule object
 * @example
 * var schedule = calendar.getSchedule(scheduleId, calendarId);
 * console.log(schedule.title);
 */
Calendar.prototype.getSchedule = function(id, calendarId) {
    return this.controller.schedules.single(function(model) {
        return model.id === id && model.calendarId === calendarId;
    });
};

/**
 * Update the schedule
 * @param {string} id - ID of schedule to update 
 * @param {string} calendarId - calendarId of schedule to update
 * @param {Schedule} scheduleData - schedule data to update
 * @example
 * calendar.on('beforeUpdateSchedule', function(event) {
 *     var schedule = event.schedule;
 *     var startTime = event.start;
 *     var endTime = event.end;
 *     calendar.updateSchedule(schedule.id, schedule.calendarId, {
 *         start: startTime,
 *         end: endTime
 *     });
 * });
 */
Calendar.prototype.updateSchedule = function(id, calendarId, scheduleData) {
    var ctrl = this.controller,
        ownSchedules = ctrl.schedules,
        schedule = ownSchedules.single(function(model) {
            return model.id === id && model.calendarId === calendarId;
        });

    if (schedule) {
        ctrl.updateSchedule(schedule, scheduleData);
        this.render();
    }
};

/**
 * Delete schedule.
 * @fires Calendar#beforeDeleteSchedule
 * @param {string} id - ID of schedule to delete
 * @param {string} calendarId - calendarId of schedule to delete
 */
Calendar.prototype.deleteSchedule = function(id, calendarId) {
    var ctrl = this.controller,
        ownSchedules = ctrl.schedules,
        schedule = ownSchedules.single(function(model) {
            return model.id === id && model.calendarId === calendarId;
        });

    if (!schedule) {
        return;
    }

    /**
     * Fire this event when delete a schedule.
     * @event Calendar#beforeDeleteSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to delete
     * @example
     * calendar.on('beforeDeleteSchedule', function() {
     *     alert('The schedule is removed.');
     * });
     */
    this.fire('beforeDeleteSchedule', {
        schedule: schedule
    });

    ctrl.deleteSchedule(schedule);
    this.render();
};

/**********
 * Private Methods
 **********/

/**
 * Set child view's options recursively
 * @param {View} view - parent view
 * @param {function} func - option manipulate function
 * @private
 */
Calendar.prototype.setOptionRecurseively = function(view, func) {
    view.recursive(function(childView) {
        var opt = childView.options;

        if (!opt) {
            return;
        }

        func(opt);
    });
};

/**
 * @param {string|Date} date - date to show in calendar
 * @param {number} [startDayOfWeek=0] - start day of week
 * @param {boolean} [workweek=false] - only show work week
 * @returns {array} render range
 * @private
 */
Calendar.prototype.getWeekDayRange = function(date, startDayOfWeek, workweek) {
    var day, start, end, range,
        msFrom = datetime.millisecondsFrom;

    startDayOfWeek = (startDayOfWeek || 0); // eslint-disable-line
    date = util.isDate(date) ? date : new TZDate(date);
    day = date.getDay();

    // calculate default render range first.
    start = new TZDate(
        Number(date) -
        msFrom('day', day) +
        msFrom('day', startDayOfWeek)
    );

    end = new TZDate(Number(start) + msFrom('day', 6));

    if (day < startDayOfWeek) {
        start = new TZDate(Number(start) - msFrom('day', 7));
        end = new TZDate(Number(end) - msFrom('day', 7));
    }

    if (workweek) {
        range = datetime.range(
            datetime.start(start),
            datetime.end(end),
            datetime.MILLISECONDS_PER_DAY
        );

        range = util.filter(range, function(weekday) {
            return !datetime.isWeekend(weekday.getDay());
        });

        start = range[0];
        end = range[range.length - 1];
    }

    return [start, end];
};

/**
 * Toggle schedules visibility by calendar ID
 * @param {string} calendarId - calendar id value
 * @param {boolean} toHide - set true to hide schedules
 * @param {boolean} render - set true then render after change visible property each models
 * @private
 */
Calendar.prototype._toggleSchedulesByCalendarID = function(calendarId, toHide, render) {
    var ownSchedules = this.controller.schedules;

    calendarId = util.isArray(calendarId) ? calendarId : [calendarId];

    ownSchedules.each(function(schedule) {
        if (~util.inArray(schedule.calendarId, calendarId)) {
            schedule.set('visible', !toHide);
        }
    });

    if (render) {
        this.render();
    }
};

/**********
 * General Methods
 **********/

/**
 * Render the calendar.
 * @example
 * var silent = true;
 * calendar.clear();
 * calendar.createSchedules(schedules, silent);
 * calendar.render();
 */
Calendar.prototype.render = function() {
    this.layout.render();
};

/**
 * Delete all schedules and clear view.
 * @example
 * calendar.clear();
 * calendar.createSchedules(schedules, true);
 * calendar.render();
 */
Calendar.prototype.clear = function() {
    this.controller.clearSchedules();
    this.render();
};

/**
 * Scroll to now in daily, weekly view
 * @example
 * function onNewSchedules(schedules) {
 *     calendar.createSchedules(schedules);
 *     if (calendar.viewName !== 'month') {
 *         calendar.scrollToNow();
 *     }
 * }
 */
Calendar.prototype.scrollToNow = function() {
    if (this.scrollToNowMethod) {
        this.scrollToNowMethod();
    }
};

/**
 * Refresh the calendar layout.
 * @example
 * window.addEventListener('resize', function() {
 *     calendar.refresh();
 * });
 */
Calendar.prototype.refresh = function() {
    if (this.refreshMethod) {
        this.refreshMethod();
    }

    this.render();
};

/**
 * Refresh child views
 * @param {string} [viewName] - the name of view to render. if not supplied then refresh all.
 * @private
 */
Calendar.prototype.refreshChildView = function(viewName) {
    if (!viewName) {
        this.render();
        return;
    }

    if (viewName === 'day') {
        viewName = 'week';
    }

    this.layout.children.items[viewName].render();
};

/**
 * Move to today.
 * @example
 * function onClickTodayBtn() {
 *     calendar.today();
 * }
 */
Calendar.prototype.today = function() {
    this.renderDate = new TZDate();

    this._setViewName(this.viewName); // see Calendar.move if (viewName === 'day') case using prevViewName 'week'se
    this.move();
    this.render();
};

/**
 * Move the calendar amount of offset value
 * @param {number} offset - offset value.
 * @private
 * @example
 * // move previous week when "week" view.
 * // move previous month when "month" view.
 * calendar.move(-1);
 */
Calendar.prototype.move = function(offset) {
    var renderDate = dw(this.renderDate),
        viewName = this.viewName,
        view = this.getCurrentView(),
        recursiveSet = this.setOptionRecurseively,
        startDate, endDate, tempDate,
        startDayOfWeek, visibleWeeksCount, workweek, datetimeOptions;

    offset = util.isExisty(offset) ? offset : 0;

    if (viewName === 'month') {
        startDayOfWeek = util.pick(this.options, 'month', 'startDayOfWeek') || 0;
        visibleWeeksCount = mmin(util.pick(this.options, 'month', 'visibleWeeksCount') || 0, 6);
        workweek = util.pick(this.options, 'month', 'workweek') || false;

        if (visibleWeeksCount) {
            datetimeOptions = {
                startDayOfWeek: startDayOfWeek,
                isAlways6Week: false,
                visibleWeeksCount: visibleWeeksCount,
                workweek: workweek
            };

            renderDate.addDate(offset * 7 * datetimeOptions.visibleWeeksCount);
            tempDate = datetime.arr2dCalendar(this.renderDate, datetimeOptions);

            recursiveSet(view, function(opt) {
                opt.renderMonth = datetime.format(renderDate.d, 'YYYY-MM-DD');
            });
        } else {
            datetimeOptions = {
                startDayOfWeek: startDayOfWeek,
                isAlways6Week: true,
                workweek: workweek
            };

            renderDate.addMonth(offset);
            tempDate = datetime.arr2dCalendar(this.renderDate, datetimeOptions);

            recursiveSet(view, function(opt) {
                opt.renderMonth = datetime.format(renderDate.d, 'YYYY-MM');
            });
        }

        startDate = tempDate[0][0];
        endDate = tempDate[tempDate.length - 1][tempDate[tempDate.length - 1].length - 1];
    } else if (viewName === 'week') {
        renderDate.addDate(offset * 7);
        startDayOfWeek = util.pick(this.options, 'week', 'startDayOfWeek') || 0;
        workweek = util.pick(this.options, 'week', 'workweek') || false;
        tempDate = this.getWeekDayRange(renderDate.d, startDayOfWeek, workweek);

        startDate = tempDate[0];
        endDate = tempDate[1];

        recursiveSet(view, function(opt) {
            opt.renderStartDate = datetime.format(startDate, 'YYYY-MM-DD');
            opt.renderEndDate = datetime.format(endDate, 'YYYY-MM-DD');
        });
    } else if (viewName === 'day') {
        renderDate.addDate(offset);
        startDate = endDate = renderDate.d;

        recursiveSet(view, function(opt) {
            opt.renderStartDate = datetime.format(startDate, 'YYYY-MM-DD');
            opt.renderEndDate = datetime.format(endDate, 'YYYY-MM-DD');
        });
    }

    this.renderDate = renderDate.d;
    this.renderRange = {
        start: startDate,
        end: endDate
    };
};

/**
 * Move to specific date
 * @param {(Date|string)} date - date to move
 * @example
 * calendar.on('clickDayname', function(event) {
 *     if (calendar.viewName === 'week') {
 *         calendar.setDate(new Date(event.date));
 *         calendar.toggleView('day', true);
 *     }
 * });
 */
Calendar.prototype.setDate = function(date) {
    if (util.isString(date)) {
        date = datetime.parse(date);
    }

    this.renderDate = new TZDate(Number(date));
    this._setViewName(this.viewName); // see Calendar.move if (viewName === 'day') case using prevViewName 'week'se
    this.move(0);
    this.render();
};

/**
 * Move the calendar forward a day, a week, a month
 * @example
 * function moveToNextOrPrevRange(val) {
    calendar.clear();
    if (val === -1) {
        calendar.prev();
    } else if (val === 1) {
        calendar.next();
    }
}
 */
Calendar.prototype.next = function() {
    this.move(1);
    this.render();
};

/**
 * Move the calendar backward a day, a week, a month
 * @example
 * function moveToNextOrPrevRange(val) {
    calendar.clear();
    if (val === -1) {
        calendar.prev();
    } else if (val === 1) {
        calendar.next();
    }
}
 */
Calendar.prototype.prev = function() {
    this.move(-1);
    this.render();
};

/**
 * Return current rendered view.
 * @returns {View} current view instance
 * @private
 */
Calendar.prototype.getCurrentView = function() {
    var viewName = this.viewName;

    if (viewName === 'day') {
        viewName = 'week';
    }

    return util.pick(this.layout.children.items, viewName);
};

/**
 * Change calendar's schedule color with option
 * @param {string} calendarId - calendar ID
 * @param {object} option - color data object
 *  @param {string} option.color - text color of schedule element
 *  @param {string} option.bgColor - bg color of schedule element
 *  @param {string} option.borderColor - border color of schedule element
 *  @param {boolean} [option.render=true] - set false then does not auto render.
 * @example
 * calendar.setCalendarColor('1', {
 *     color: '#e8e8e8',
 *     bgColor: '#585858',
 *     render: false
 * });
 * calendar.setCalendarColor('2', {
 *     color: '#282828',
 *     bgColor: '#dc9656',
 *     render: false
 * });
 * calendar.setCalendarColor('3', {
 *     color: '#a16946',
 *     bgColor: '#ab4642',
 *     render: true
 * });
 */
Calendar.prototype.setCalendarColor = function(calendarId, option) {
    var calColor = this.calendarColor,
        ownSchedules = this.controller.schedules,
        ownColor = calColor[calendarId];

    if (!util.isObject(option)) {
        config.throwError('Calendar#changeCalendarColor(): color 는 {color: \'\', bgColor: \'\'} 형태여야 합니다.');
    }

    ownColor = calColor[calendarId] = util.extend({
        color: '#000',
        bgColor: '#a1b56c',
        borderColor: '#a1b56c',
        render: true
    }, option);

    ownSchedules.each(function(model) {
        if (model.calendarId !== calendarId) {
            return;
        }

        model.color = ownColor.color;
        model.bgColor = ownColor.bgColor;
        model.borderColor = ownColor.borderColor;
    });

    if (ownColor.render) {
        this.render();
    }
};

/**
 * Show schedules visibility by calendar ID
 * @param {string|string[]} calendarId - calendar id value
 * @param {boolean} [render=true] - set false then doesn't render after change model's property.
 * @private
 */
Calendar.prototype.showSchedulesByCalendarID = function(calendarId, render) {
    render = util.isExisty(render) ? render : true;
    this._toggleSchedulesByCalendarID(calendarId, false, render);
};

/**
 * Hide schedules visibility by calendar ID
 * @param {string|string[]} calendarId - calendar id value
 * @param {boolean} [render=true] - set false then doesn't render after change model's property.
 * @private
 */
Calendar.prototype.hideSchedulesByCalendarID = function(calendarId, render) {
    render = util.isExisty(render) ? render : true;
    this._toggleSchedulesByCalendarID(calendarId, true, render);
};

/**********
 * Custom Events
 **********/

/**
 * 각 뷰의 클릭 핸들러와 사용자 클릭 이벤트 핸들러를 잇기 위한 브릿지 개념의 이벤트 핸들러
 * @fires Calendar#clickSchedule
 * @param {object} clickScheduleData - 'clickSchedule' 핸들러의 이벤트 데이터
 * @private
 */
Calendar.prototype._onClick = function(clickScheduleData) {
    /**
     * Fire this event when click a schedule.
     * @event Calendar#clickSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance
     * @property {MouseEvent} event - MouseEvent
     * @example
     * calendar.on('clickSchedule', function(event) {
     *     var schedule = event.schedule;
     * 
     *     if (lastClickSchedule) {
     *         calendar.updateSchedule(lastClickSchedule.id, lastClickSchedule.calendarId, {
     *             isFocused: false
     *         });
     *     }
     *     calendar.updateSchedule(schedule.id, schedule.calendarId, {
     *         isFocused: true
     *     });
     *
     *     lastClickSchedule = schedule;
     *     // open detail view
     * });
     */
    this.fire('clickSchedule', clickScheduleData);
};

/**
 * dayname 클릭 이벤트 핸들러
 * @fires Calendar#clickDayname
 * @param {object} clickScheduleData - 'clickDayname' 핸들러의 이벤트 데이터
 * @private
 */
Calendar.prototype._onClickDayname = function(clickScheduleData) {
    /**
     * Fire this event when click a day name in weekly.
     * @event Calendar#clickDayname
     * @type {object}
     * @property {string} date - date string by format 'YYYY-MM-DD'
     * @example
     * calendar.on('clickDayname', function(event) {
     *     if (calendar.viewName === 'week') {
     *         calendar.setDate(new Date(event.date));
     *         calendar.toggleView('day', true);
     *     }
     * });
     */
    this.fire('clickDayname', clickScheduleData);
};

/**
 * @fires {Calendar#beforeCreateSchedule}
 * @param {object} createScheduleData - select schedule data from allday, time
 * @private
 */
Calendar.prototype._onBeforeCreate = function(createScheduleData) {
    /**
     * Fire this event when select time period in daily, weekly, monthly.
     * @event Calendar#beforeCreateSchedule
     * @type {object}
     * @property {boolean} isAllDay - allday schedule
     * @property {Date} start - selected start time
     * @property {Date} end - selected end time
     * @property {TimeCreationGuide} guide - TimeCreationGuide instance
     * @property {string} triggerEventName - event name like 'click', 'dblclick'
     * @example
     * calendar.on('beforeCreateSchedule', function(event) {
     *     var startTime = event.start;
     *     var endTime = event.end;
     *     var isAllDay = event.isAllDay;
     *     var guide = event.guide;
     *     var triggerEventName = event.triggerEventName;
     *     var schedule;
     * 
     *     if (triggerEventName === 'click') {
     *         // open writing simple schedule popup
     *         schedule = {...};
     *     } else if (triggerEventName === 'dblclick') {
     *         // open writing detail schedule popup
     *         schedule = {...};
     *     }
     * 
     *     calendar.createSchedules([schedule]);
     * });
     */
    this.fire('beforeCreateSchedule', createScheduleData);
};

/**
 * @fires Calendar#beforeUpdateSchedule
 * @param {object} updateScheduleData - update schedule data
 * @private
 */
Calendar.prototype._onBeforeUpdate = function(updateScheduleData) {
    /**
     * Fire this event when drag a schedule to change time in daily, weekly, monthly.
     * @event Calendar#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to update
     * @property {Date} start - start time to update
     * @property {Date} end - end time to update
     * @example
     * calendar.on('beforeUpdateSchedule', function(event) {
     *     var schedule = event.schedule;
     *     var startTime = event.start;
     *     var endTime = event.end;
     *
     *     calendar.updateSchedule(schedule.id, schedule.calendarId, {
     *         start: startTime,
     *         end: endTime
     *     });
     * });
     */
    this.fire('beforeUpdateSchedule', updateScheduleData);
};

/**
 * @fires Calendar#resizePanel
 * @param {object} resizeScheduleData - resize schedule data object
 * @private
 */
Calendar.prototype._onResizePanel = function(resizeScheduleData) {
    /**
     * Fire this event when resize view panels(milestone, task, allday).
     * @event Calendar#resizePanel
     * @type {object}
     * @property {number[]} layoutData - layout data after resized
     * @example
     * calendar.on('resizePanel', function(layoutData) {
     *     console.log(layoutData);
     *     // do something to resize your UI if necessary.
     * });
     */
    this.fire('resizePanel', resizeScheduleData);
};

/**
 * 캘린더 팩토리 클래스와 주뷰, 월뷰의 이벤트 연결을 토글한다
 * @param {boolean} isAttach - true면 이벤트 연결함.
 * @param {Week|Month} view - 주뷰 또는 월뷰
 * @private
 */
Calendar.prototype._toggleViewSchedule = function(isAttach, view) {
    var self = this,
        handler = view.handler,
        isMonthView = view.viewName === 'month',
        method = isAttach ? 'on' : 'off';

    util.forEach(handler.click, function(clickHandler) {
        clickHandler[method]('clickSchedule', self._onClick, self);
    });

    util.forEach(handler.dayname, function(clickHandler) {
        clickHandler[method]('clickDayname', self._onClickDayname, self);
    });

    util.forEach(handler.creation, function(creationHandler) {
        creationHandler[method]('beforeCreateSchedule', self._onBeforeCreate, self);
    });

    util.forEach(handler.move, function(moveHandler) {
        moveHandler[method]('beforeUpdateSchedule', self._onBeforeUpdate, self);
    });

    util.forEach(handler.resize, function(resizeHandler) {
        resizeHandler[method]('beforeUpdateSchedule', self._onBeforeUpdate, self);
    });

    if (!isMonthView) {
        view.vLayout[method]('resize', self._onResizePanel, self);
    }
};

/**
 * Toggle current view
 * @param {string} newViewName - new view name to render
 * @param {boolean} force - force render despite of current view and new view are equal
 * @example
 * // daily view
 * calendar.toggleView('day', true);
 * 
 * // weekly view
 * calendar.toggleView('week', true);
 * 
 * // monthly view(default 6 weeks view)
 * calendar.options.month.visibleWeeksCount = 6; // or null
 * calendar.toggleView('month', true);
 * 
 * // 2 weeks monthly view
 * calendar.options.month.visibleWeeksCount = 2;
 * calendar.toggleView('month', true);
 * 
 * // 3 weeks monthly view
 * calendar.options.month.visibleWeeksCount = 3;
 * calendar.toggleView('month', true);
 * 
 * // narrow weekend
 * calendar.options.month.narrowWeekend = true;
 * calendar.options.week.narrowWeekend = true;
 * calendar.toggleView(calendar.viewName, true);
 * 
 * // change start day of week(from monday)
 * calendar.options.month.startDayOfWeek = 1;
 * calendar.options.week.startDayOfWeek = 1;
 * calendar.toggleView(calendar.viewName, true);
 */
Calendar.prototype.toggleView = function(newViewName, force) {
    var self = this,
        layout = this.layout,
        controller = this.controller,
        dragHandler = this.dragHandler,
        options = this.options,
        viewName = this.viewName,
        created;

    if (!force && viewName === newViewName) {
        return;
    }

    this._setViewName(newViewName);

    //convert day to week
    if (viewName === 'day') {
        viewName = 'week';
    }

    if (newViewName === 'day') {
        newViewName = 'week';
    }
    layout.children.doWhenHas(viewName, function(view) {
        self._toggleViewSchedule(false, view);
    });

    layout.clear();

    if (newViewName === 'month') {
        created = this.createMonthView(
            controller,
            layout.container,
            dragHandler,
            options
        );
    } else if (newViewName === 'week' || newViewName === 'day') {
        created = this.createWeekView(
            controller,
            layout.container,
            dragHandler,
            options
        );
    }

    layout.addChild(created.view);

    layout.children.doWhenHas(newViewName, function(view) {
        self._toggleViewSchedule(true, view);
    });

    this.refreshMethod = created.refresh;
    this.scrollToNowMethod = created.scrollToNow;

    this.move();
    this.render();
};

/**
 * Toggle task view panel
 * @param {boolean} enabled - use task view
 * @example
 * // There is no milestone, task, so hide those view panel
 * calendar.toggleTaskView(false);
 * 
 * // There are some milestone, task, so show those view panel.
 * calendar.toggleTaskView(true);
 */
Calendar.prototype.toggleTaskView = function(enabled) {
    var viewName = this.viewName,
        options = this.options;

    options.taskView = enabled;
    this.toggleView(viewName, true);
};

/**
 * Set current view name
 * @param {string} viewName - new view name to render
 * @private
 */
Calendar.prototype._setViewName = function(viewName) {
    this.prevViewName = this.viewName;
    this.viewName = viewName;
};

/**
 * Get schedule by schedule id and calendar id.
 * @param {string} scheduleId - ID of schedule
 * @param {string} calendarId - calendarId of schedule
 * @returns {HTMLElement} schedule element if found or null
 * @example
 * var element = calendar.getElement(scheduleId, calendarId);
 * console.log(element);
 */
Calendar.prototype.getElement = function(scheduleId, calendarId) {
    var schedule = this.getSchedule(scheduleId, calendarId);
    if (schedule) {
        return document.querySelector('[data-schedule-id="' + scheduleId + '"][data-calendar-id="' + calendarId + '"]');
    }

    return null;
};

/**
 * Set timezone offset
 * @param {number} offset - offset (min)
 * @static
 * @example
 * var timezoneName = moment.tz.guess();
 * tui.Calendar.setTimezoneOffset(moment.tz.zone(timezoneName).offset(moment()));
 */
Calendar.setTimezoneOffset = function(offset) {
    timezone.setOffset(offset);
};

util.CustomEvents.mixin(Calendar);

module.exports = Calendar;
