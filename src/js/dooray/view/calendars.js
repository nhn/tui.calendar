/**
 * @fileoverview 서비스 좌측 캘린더 목록 뷰
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var View = require('../../view/view');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var tmpl = require('./calendars.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {HTMLDivElement} container - view container
 */
function Calendars(container) {
    View.call(this, null, container);

    // bind event
    domevent.on(container, 'change', this._onChange, this);

    this.render();
}

util.inherit(Calendars, View);

/**
 * @param {Collection} viewModel - collection for CalendarReference
 * @returns {object} view model
 */
Calendars.prototype._getViewModel = function(viewModel) {
    // 일반 캘린더와 프로젝트 캘린더를 나눈다
    var grouped = viewModel.groupBy(function(calendarRef) {
        var raw = calendarRef.raw;

        if (raw.owner) {
            return 'general';
        }

        return 'project'
    });

    return grouped;
};

/**
 * @override
 * @param {Collection} viewModel - collection for CalendarReference
 */
Calendars.prototype.render = function(viewModel) {
    if (viewModel) {
        viewModel = this._getViewModel(viewModel);
    }

    this.container.innerHTML = tmpl(viewModel);
};

Calendars.prototype.getSelectedCalendarID = function() {
    var container = this.container,
        inputs = domutil.find('input', container, function(el) {
            return el.checked;
        });

    return util.map(inputs, function(el) {
        return domutil.getData(el, 'id');
    });
};

/**
 * calendar checkbox onchange event handler
 * @emits Calendars#changeCalendarSelection
 * @param {Event} changeEventData - input event
 */
Calendars.prototype._onChange = function() {
    /**
     * @events Calendars#changeCalendarSelection
     * @type {string[]} calendar id list
     */
    this.fire('changeCalendarSelection', this.getSelectedCalendarID());
};

util.CustomEvents.mixin(Calendars);

module.exports = Calendars;

