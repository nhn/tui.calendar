/**
 * @fileoverview Floating layer for writing new schedules
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var View = require('../../view/view');
var FloatingLayer = require('../../common/floatingLayer');
var util = require('tui-code-snippet');
var DatePicker = require('tui-date-picker');
var TZDate = require('../../common/timezone').Date;
var config = require('../../config'),
    domevent = require('../../common/domevent'),
    domutil = require('../../common/domutil');
var tmpl = require('../template/popup/scheduleCreationPopup.hbs');
var mmax = Math.max;
var mmin = Math.min;
var MAX_WEEK_OF_MONTH = 5;

/**
 * @constructor
 * @extends {View}
 * @param {HTMLElement} container - container element
 * @param {Array.<Calendar>} calendars - calendar list used to create new schedule
 */
function ScheduleCreationPopup(container, calendars) {
    var self = this;
    View.call(this, container);
    /**
     * @type {FloatingLayer}
     */
    this.layer = new FloatingLayer(null, container);

    /**
     * cached view model
     * @type {object}
     */
    this._viewModel = null;
    this._selectedCal = null;
    this.calendars = calendars;
    this._focusedDropdown = null;
    this._onClickListeners = [
        this._selectDropdownMenuItem.bind(this),
        this._closeDropdownMenuView.bind(this, null),
        this._closePopup.bind(this),
        this._toggleDropdownMenuView.bind(this),
        this._toggleIsAllday.bind(this),
        this._toggleIsPrivate.bind(this),
        this._onClickSaveSchedule.bind(this)
    ];

    domevent.on(container, 'click', this._onClick, this);
}

util.inherit(ScheduleCreationPopup, View);

/**
 * Mousedown event handler for hiding popup layer when user mousedown outside of
 * layer
 * @param {MouseEvent} mouseDownEvent - mouse event object
 */
ScheduleCreationPopup.prototype._onMouseDown = function(mouseDownEvent) {
    var target = (mouseDownEvent.target || mouseDownEvent.srcElement),
        popupLayer = domutil.closest(target, config.classname('.floating-layer'));

    if (popupLayer) {
        return;
    }

    this.hide();
};

/**
 * @override
 */
ScheduleCreationPopup.prototype.destroy = function() {
    this.layer.destroy();
    this.layer = null;
    domevent.off(this.container, 'click', this._onClick, this);
    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
    View.prototype.destroy.call(this);
};

/**
 * @override
 * Click event handler for close button
 * @param {MouseEvent} clickEvent - mouse event object
 */
ScheduleCreationPopup.prototype._onClick = function(clickEvent) {
    var target = (clickEvent.target || clickEvent.srcElement);

    util.forEach(this._onClickListeners, function(listener) {
        return !listener(target);
    });
};

/**
 * Test click event target is close button, and return layer is closed(hidden)
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether popup layer is closed or not
 */
ScheduleCreationPopup.prototype._closePopup = function(target) {
    var className = config.classname('popup-close');

    if (domutil.hasClass(target, className) || domutil.closest(target, '.' + className)) {
        this.hide();

        return true;
    }

    return false;
};

/**
 * Toggle dropdown menu view, when user clicks dropdown button
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether user clicked dropdown button or not
 */
ScheduleCreationPopup.prototype._toggleDropdownMenuView = function(target) {
    var className = config.classname('dropdown-button');
    var dropdownBtn = domutil.hasClass(target, className) ? target : domutil.closest(target, '.' + className);

    if (!dropdownBtn) {
        return false;
    }

    if (domutil.hasClass(config.classname('open'))) {
        this._closeDropdownMenuView(dropdownBtn.parentNode);
    } else {
        this._openDropdownMenuView(dropdownBtn.parentNode);
    }

    return true;
};

/**
 * Close drop down menu
 * @param {HTMLElement} dropdown - dropdown element that has a opened dropdown menu
 */
ScheduleCreationPopup.prototype._closeDropdownMenuView = function(dropdown) {
    dropdown = dropdown || this._focusedDropdown;
    if (dropdown) {
        domutil.removeClass(dropdown, config.classname('open'));
        this._focusedDropdown = null;
    }
};

/**
 * Open drop down menu
 * @param {HTMLElement} dropdown - dropdown element that has a closed dropdown menu
 */
ScheduleCreationPopup.prototype._openDropdownMenuView = function(dropdown) {
    domutil.addClass(dropdown, config.classname('open'));
    this._focusedDropdown = dropdown;
};

/**
 * If click dropdown menu item, close dropdown menu
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether 
 */
ScheduleCreationPopup.prototype._selectDropdownMenuItem = function(target) {
    var className = config.classname('dropdown-menu-item');
    var selectedItem = domutil.hasClass(target, className) ? target : domutil.closest(target, '.' + className);
    var bgColor, title, dropdown, dropdownBtn;

    if (!selectedItem) {
        return false;
    }

    bgColor = domutil.find('.icon', selectedItem).style.backgroundColor || 'transparent';
    title = domutil.find('.content', selectedItem).innerHTML;

    dropdown = domutil.closest(selectedItem, config.classname('.dropdown'));
    dropdownBtn = domutil.find(config.classname('.dropdown-button'), dropdown);
    domutil.find('.content', dropdownBtn).innerText = title;

    if (domutil.hasClass(dropdown, config.classname('section-calendar'))) {
        domutil.find('.icon', dropdownBtn).style.backgroundColor = bgColor;
        this._selectedCal = this.calendars.find(function(cal) {
            return cal.id === domutil.getData(selectedItem, 'calendar-id');
        });
    }

    domutil.removeClass(dropdown, config.classname('open'));

    return true;
};

/**
 * Toggle allday checkbox state
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether event target is allday section or not
 */
ScheduleCreationPopup.prototype._toggleIsAllday = function(target) {
    var className = config.classname('section-allday');
    var alldaySection = domutil.hasClass(target, className) ? target : domutil.closest(target, '.' + className);
    var checkbox;

    if (alldaySection) {
        checkbox = domutil.find('.checkbox-square', alldaySection);
        checkbox.checked = !checkbox.checked;

        return true;
    }

    return false;
};

/**
 * Toggle private button
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether event target is private section or not
 */
ScheduleCreationPopup.prototype._toggleIsPrivate = function(target) {
    var className = config.classname('section-private');
    var privateSection = domutil.hasClass(target, className) ? target : domutil.closest(target, '.' + className);

    if (privateSection) {
        if (domutil.hasClass(privateSection, config.classname('public'))) {
            domutil.removeClass(privateSection, config.classname('public'));
        } else {
            domutil.addClass(privateSection, config.classname('public'));
        }

        return true;
    }

    return false;
};

/**
 * Save new schedule if user clicked save button
 * @emits ScheduleCreationPopup#saveSchedule
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether save button is clicked or not
 */
ScheduleCreationPopup.prototype._onClickSaveSchedule = function(target) {
    var className = config.classname('popup-save');
    var cssPrefix = config.cssPrefix;
    var title, isPrivate, location, isAllDay, startDate, endDate, state;

    if (!domutil.hasClass(target, className) && !domutil.closest(target, '.' + className)) {
        return false;
    }

    title = domutil.get(cssPrefix + 'schedule-title');
    if (!title.value) {
        title.focus();

        return true;
    }

    isPrivate = domutil.hasClass(domutil.get(cssPrefix + 'schedule-private'), 'private');
    location = domutil.get(cssPrefix + 'schedule-location');
    state = domutil.get(cssPrefix + 'schedule-state');
    isAllDay = domutil.get(cssPrefix + 'schedule-allday');
    startDate = this.rangePicker.getStartDate();
    endDate = this.rangePicker.getEndDate();

    if (isAllDay) {
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
    }

    /**
     * @event ScheduleCreationPopup#saveSchedule
     * @type {object}
     * @property {Schedule} schedule - new schedule instance to be added
     */
    this.fire('saveSchedule', {
        calendar: this._selectedCals,
        subject: title.value,
        startDate: startDate,
        endDate: endDate,
        isAllDay: isAllDay.checked,
        state: state.innerText,
        raw: {
            private: isPrivate,
            location: location.value
        }
    });

    this.hide();

    return true;
};

/**
 * @override
 * @param {object} viewModel - view model from factory/monthView
 */
ScheduleCreationPopup.prototype.render = function(viewModel) {
    var calendars = this.calendars;
    var layer = this.layer;
    var self = this;
    var pos;

    viewModel.floatingZIndex = this.layer.zIndex + 5;
    viewModel.isAllDay = viewModel.start.getDate() !== viewModel.end.getDate();
    viewModel.calendars = calendars;
    if (calendars.length) {
        viewModel.selectedCal = this._selectedCal = calendars[0];
    }

    layer.setContent(tmpl(viewModel));
    this._createDatepicker(viewModel.start, viewModel.end);
    layer.show();

    this.guideElements = this._getGuideElements(viewModel.guide);
    pos = this._calcRenderingData(this.guideElements);
    layer.setPosition(pos.x, pos.y);
    this._setArrowDirection(pos.arrow);

    util.debounce(function() {
        domevent.on(document.body, 'mousedown', self._onMouseDown, self);
    })();
};

/**
 * Get guide elements from creation guide object
 * It is used to calculate rendering position of popup
 * It will be disappeared when hiding popup
 * @param {MonthCreationGuide|TimeCreationGuide|AlldayCreationGuide} guide - creation guide
 * @returns {Array.<HTMLElement>} creation guide element
 */
ScheduleCreationPopup.prototype._getGuideElements = function(guide) {
    var guideElements = [];
    var i = 0;

    if (guide.timeCreation || guide.alldayCreation) {
        guideElements.push(guide.guideElement);
        this.guide = guide;
    } else if (guide.guideElements) {
        for (; i < MAX_WEEK_OF_MONTH; i += 1) {
            if (guide.guideElements[i]) {
                guideElements.push(guide.guideElements[i]);
            }
        }
        this.guide = guide;
    }

    return guideElements;
};

/**
 * Calculate rendering position usering guide elements
 * @param {Array.<HTMLElement>} guideElements - schedule creation guide elements when dragging calendar
 * @returns {PopupRenderingData} rendering position of popup and popup arrow
 */
ScheduleCreationPopup.prototype._calcRenderingData = function(guideElements) {
    var parentRect = this.layer.parent.getBoundingClientRect();
    var layerWidth = this.layer.container.offsetWidth;
    var layerHeight = this.layer.container.offsetHeight;
    var bounds = util.map(guideElements, function(element) {
        return element.getBoundingClientRect();
    });
    var boundsInFirstRow = util.filter(bounds, function(bound) {
        return bounds[0].top === bound.top;
    });
    var top = Number.MAX_VALUE;
    var left = Number.MAX_VALUE;
    var bottom = 0;
    var right = 0;
    var x, y, arrowDirection, arrowPoint;

    util.forEach(boundsInFirstRow, function(bound) {
        top = mmin(top, bound.top);
        left = mmin(left, bound.left);
        bottom = mmax(bottom, bound.bottom);
        right = mmax(right, bound.right);
    });

    if (top >= layerHeight) {
        y = top - layerHeight - 3;
        arrowDirection = 'bottom';
    } else {
        y = bottom + 4;
        arrowDirection = 'top';
    }

    x = (left + right - layerWidth) / 2;

    if (x + layerWidth >= window.innerWidth) {
        arrowPoint = (right - x + 2);
        x = window.innerWidth - layerWidth;
    }

    /**
     * @typedef {Object} PopupRenderingData
     * @property {number} x - left position
     * @property {number} y - top position
     * @property {string} arrow.direction - direction of popup arrow
     * @property {number} [arrow.point] - relative position of popup arrow, if it is not set, arrow appears on the middle of popup
     */
    return {
        x: x - parentRect.left - (layerWidth / 2),
        y: y - parentRect.top - layerHeight,
        arrow: {
            direction: arrowDirection,
            point: arrowPoint
        }
    };
};

/**
 * Set arrow's direction and position
 * @param {Object} arrow rendering data for popup arrow
 */
ScheduleCreationPopup.prototype._setArrowDirection = function(arrow) {
    var direction = arrow.direction || 'bottom';
    var arrowEl = domutil.get(config.classname('popup-arrow'));
    var borderElement = domutil.find(config.classname('.popup-arrow-border', arrowEl));

    if (direction !== 'bottom') {
        domutil.removeClass(arrowEl, 'bottom');
        domutil.addClass(arrowEl, direction);
    }

    if (arrow.point) {
        borderElement.style.left = arrow.point + 'px';
    }
};

/**
 * Create date range picker using start date and end date
 * @param {TZDate} start - start date
 * @param {TZDate} end - end date
 */
ScheduleCreationPopup.prototype._createDatepicker = function(start, end) {
    var cssPrefix = config.cssPrefix;
    this.rangePicker = DatePicker.createRangePicker({
        startpicker: {
            date: new TZDate(start),
            input: '#' + cssPrefix + 'schedule-start-date',
            container: '#' + cssPrefix + 'startpicker-container'
        },
        endpicker: {
            date: new TZDate(end),
            input: '#' + cssPrefix + 'schedule-end-date',
            container: '#' + cssPrefix + 'endpicker-container'
        },
        format: 'yyyy-MM-dd HH:mm',
        timepicker: {
            showMeridiem: false
        },
        usageStatistics: true
    });
};

/**
 * Hide layer
 */
ScheduleCreationPopup.prototype.hide = function() {
    var guideElements = this.guideElements;

    this.layer.hide();

    util.forEach(guideElements, function(element) {
        element.clearGuideElement();
    });
    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
};

/**
 * refresh layer
 */
ScheduleCreationPopup.prototype.refresh = function() {
    if (this._viewModel) {
        this.layer.setContent(this.tmpl(this._viewModel));
    }
};

/**
 * Set calendar list
 * @param {Array.<Calendar>} calendars - calendar list
 */
ScheduleCreationPopup.prototype.setCalendars = function(calendars) {
    this.calendars = calendars || [];
};

module.exports = ScheduleCreationPopup;
