/**
 * @fileoverview Floating layer for writing new schedules
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var View = require('../../view/view');
var FloatingLayer = require('../../common/floatingLayer');
var util = require('tui-code-snippet');
var DatePicker = require('tui-date-picker');
var config = require('../../config'),
    domevent = require('../../common/domevent'),
    domutil = require('../../common/domutil');
var tmpl = require('../template/popup/popupWrite.hbs');
var mmax = Math.max;
var mmin = Math.min;

/**
 * @constructor
 * @extends {View}
 * @param {HTMLElement} container = container element
 */
function PopupWrite(container) {
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
    this.tmpl = tmpl;
    this.focusedDropdown = null;
    this.currentCalendar = null;
    this.currentState = null;
    this.calendars = [];

    domevent.on(container, 'click', this._onClick, this);
}

util.inherit(PopupWrite, View);

/**
 * Mousedown event handler for hiding popup layer when user mousedown outside of
 * layer
 * @param {MouseEvent} mouseDownEvent - mouse event object
 */
PopupWrite.prototype._onMouseDown = function(mouseDownEvent) {
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
PopupWrite.prototype.destroy = function() {
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
PopupWrite.prototype._onClick = function(clickEvent) {
    var target = (clickEvent.target || clickEvent.srcElement);

    if (this._onClickCloseBtn(target)) {
        return;
    }

    if (!this.focusedDropdown && this._onOpenDropdownMenu(target)) {
        return;
    }

    this._onSelectDropdownItem(target);

    this._toggleAlldayCheck(target);

    this._toggleLockButton(target);

    this._onSaveSchedule(target);

    if (this.focusedDropdown) {
        this.focusedDropdown.style.display = 'none';
        this.focusedDropdown = null;
    }
};

/**
 * Test click event target is close button, and return layer is closed(hidden)
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether layer is closed or not
 */
PopupWrite.prototype._onClickCloseBtn = function(target) {
    var className = config.classname('popup-close');

    if (domutil.hasClass(target, className) || domutil.closest(target, '.' + className)) {
        if (this.focusedDropdown) {
            this.focusedDropdown.style.display = 'none';
        }
        this.hide();

        return true;
    }

    return false;
};

/**
 * Open dropdown menu, if user clicks dropdown button
 * @param {HTMLElement} target click event target
 * @returns {boolean} 
 */
PopupWrite.prototype._onOpenDropdownMenu = function(target) {
    if (target.id === 'dropdownCalendarBtn' || domutil.closest(target, '#dropdownCalendarBtn')) {
        this.focusedDropdown = document.getElementById('dropdownCalendarMenu');
        this.focusedDropdown.style.display = 'block';
    } else if (target.id === 'dropdownStateBtn' || domutil.closest(target, '#dropdownStateBtn')) {
        this.focusedDropdown = document.getElementById('dropdownStateMenu');
        this.focusedDropdown.style.display = 'block';
    }

    return !!this.focusedDropdown;
};

/**
 * If click dropdown menu item, close dropdown menu
 * @param {HTMLElement} target click event target 
 */
PopupWrite.prototype._onSelectDropdownItem = function(target) {
    var className = config.classname('dropdown-item');
    var listItem, dropdownMenu, dropdownBtnClassName, dropdownBtnIcon, dropdownBtnTitle;

    if (domutil.hasClass(target, className)) {
        listItem = target;
    } else {
        listItem = domutil.closest(target, '.' + className);
    }

    if (listItem) {
        dropdownMenu = listItem.parentNode;
        dropdownBtnClassName = dropdownMenu.id.replace('Menu', 'Btn');
        dropdownBtnIcon = document.getElementById(dropdownBtnClassName + 'Icon');
        dropdownBtnTitle = document.getElementById(dropdownBtnClassName + 'Title');

        if (dropdownBtnClassName === 'dropdownCalendarBtn') {
            dropdownBtnIcon.style.backgroundColor = listItem.childNodes[0].style.backgroundColor;
            this.currentCalendar = this.calendars[domutil.getData(listItem, 'index')];
        }

        dropdownBtnTitle.innerText = listItem.innerText;

        this.focusedDropdown.style.display = 'none';
        this.focusedDropdown = null;
    }
};

PopupWrite.prototype._toggleAlldayCheck = function(target) {
    var id = 'alldayCheck';

    if ((target.id === id) || domutil.closest(target, '#' + id)) {
        document.getElementById('popup-allday-checkbox').checked = !document.getElementById('popup-allday-checkbox').checked;
    }
};

PopupWrite.prototype._toggleLockButton = function(target) {
    var id = 'lockBtn';
    var lockBtnIcon;

    if ((target.id !== id) && !domutil.closest(target, '#' + id)) {
        return;
    }

    lockBtnIcon = document.getElementById('lockBtnIcon');

    if (domutil.hasClass(lockBtnIcon, 'ic-unlock')) {
        lockBtnIcon.className = 'icon ic-lock';
    } else {
        lockBtnIcon.className = 'icon ic-unlock';
    }
};

PopupWrite.prototype._onSaveSchedule = function(target) {
    var subject, location, state, isAllday;

    if (target.id !== 'saveBtn') {
        return;
    }

    subject = document.getElementById('subject-input');

    if (!subject.value) {
        subject.focus();

        return;
    }

    location = document.getElementById('location-input');
    state = document.getElementById('dropdownStateBtnTitle');
    isAllday = document.getElementById('popup-allday-checkbox');

    this.fire('saveSchedule', {
        calendar: this.currentCalendar,
        subject: subject.value,
        location: location.value,
        startDate: this.rangePicker.getStartDate(),
        endDate: this.rangePicker.getEndDate(),
        state: state.innerText,
        isAllday: isAllday.checked
    });

    this.hide();
};

/**
 * @override
 * @param {object} viewModel - view model from factory/monthView
 */
PopupWrite.prototype.render = function(viewModel) {
    var calendars = this.calendars;
    var layer = this.layer;
    var self = this;
    var pos;

    if (calendars.length) {
        viewModel.calendars = calendars;
        viewModel.currentCalendar = this.currentCalendar = calendars[0];
    }

    layer.setContent(this.tmpl(viewModel));
    this._createDatepicker(viewModel.start, viewModel.end);
    layer.show();

    pos = this._getRenderPosition(viewModel.guide.guideElements || [viewModel.guide.guideElement]);
    layer.setPosition(pos.x, pos.y);
    this._setArrowDirection(pos.arrow);

    util.debounce(function() {
        domevent.on(document.body, 'mousedown', self._onMouseDown, self);
    })();
};

PopupWrite.prototype._getRenderPosition = function(guideElements) {
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

    return {
        x: x - parentRect.left,
        y: y - parentRect.top,
        arrow: {
            direction: arrowDirection,
            point: arrowPoint
        }
    };
};

PopupWrite.prototype._setArrowDirection = function(arrow) {
    var borderElement = document.getElementById('arrow-border');
    var fillElement = document.getElementById('arrow-fill');

    if ((arrow.direction === 'top') && (domutil.hasClass(borderElement, config.classname('popup-bottom')))) {
        domutil.removeClass(borderElement, config.classname('popup-bottom'));
        domutil.removeClass(fillElement, config.classname('popup-bottom'));
        domutil.addClass(borderElement, config.classname('popup-top'));
        domutil.addClass(fillElement, config.classname('popup-top'));
    } else if ((arrow.direction === 'bottom') && (domutil.hasClass(borderElement, config.classname('popup-top')))) {
        domutil.removeClass(borderElement, config.classname('popup-top'));
        domutil.removeClass(fillElement, config.classname('popup-top'));
        domutil.addClass(borderElement, config.classname('popup-bottom'));
        domutil.addClass(fillElement, config.classname('popup-bottom'));
    }

    if (arrow.point) {
        borderElement.style.left = arrow.point + 'px';
    }
};

PopupWrite.prototype._createDatepicker = function(start, end) {
    this.rangePicker = DatePicker.createRangePicker({
        startpicker: {
            date: new Date(start),
            input: '#startpicker-input',
            container: '#startpicker-container'
        },
        endpicker: {
            date: new Date(end),
            input: '#endpicker-input',
            container: '#endpicker-container'
        },
        format: 'yyyy-MM-dd HH:mm',
        timepicker: {
            showMeridiem: false
        },
        usageStatistics: false
    });
    this.rangePicker.getStartpicker()._$container[0].style.zIndex = this.layer.zIndex + 2;
    this.rangePicker.getEndpicker()._$container[0].style.zIndex = this.layer.zIndex + 2;
};

/**
 * Hide layer
 */
PopupWrite.prototype.hide = function() {
    this.fire('beforeHidePopup');

    this.layer.hide();
    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
};

/**
 * refresh layer
 */
PopupWrite.prototype.refresh = function() {
    if (this._viewModel) {
        this.layer.setContent(this.tmpl(this._viewModel));
    }
};

PopupWrite.prototype.setCalendars = function(calendars) {
    this.calendars = calendars;
};

module.exports = PopupWrite;
