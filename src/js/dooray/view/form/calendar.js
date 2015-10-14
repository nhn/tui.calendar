/**
 * @fileoverview 캘린더 생성/수정 폼 컴포넌트
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Collection = require('../../../common/collection');
var domutil = require('../../../common/domutil');
var domevent = require('../../../common/domevent');
var View = require('../../../view/view');
var tmpl = require('./calendar.hbs');

function createDummyCollection() {
    return new Collection(function() {
        return this.length + '';
    });
}

/**
 * @constructor
 * @extends {View}
 * @param {API} api - instance of api module
 * @param {object} options - options
 * @param {HTMLElenent} container - container element
 */
function CalendarForm(api, options, container) {
    options = options || {};
    container = domutil.appendHTMLElement(
        'div', container, 'schedule-view-calendar-form');

    View.call(this, options, container);

    /**
     * @type {API}
     */
    this.api = api;

    /**
     * @type {object}
     */
    this.options = util.extend({
        projectCode: '*',
        isCreateMode: true,
        isPrivate: true,
        method: 'POST',
        action: '/wapi/task-tracker/projects/{{projectCode}}/calendars'
    }, options);

    domevent.on(container, 'submit', this._onSubmit);

    this.render();
}

util.inherit(CalendarForm, View);

/**
 * Get form data
 *
 * When output type is 'object', 'JSON' then input elements has duplicate name and type is not 'checkbox', 
 * 'radio' are can be omitted each values. because of JavaScript objects property name limitations.
 *
 * @param {string} [outputType='object'] - data output type. can use `object`, `json`, `queryString`.
 * @returns {object|string} form data
 */
CalendarForm.prototype.getFormData = function(outputType) {
    var container = this.container,
        groupByName = new Collection(function() { return this.length; }),
        output;

    function noDisabled(el) {
        return !el.disabled;
    }

    groupByName.add.apply(
        groupByName, 
        domutil.find('input', container, noDisabled)
            .concat(domutil.find('select', container, noDisabled))
            .concat(domutil.find('textarea', container, noDisabled))
    );

    // 인풋 타입은 name으로 한번 그룹
    groupByName = groupByName.groupBy(function(el) {
        var name = el.getAttribute('name');

        if (name) {
            return name;
        }

        return '_other';
    });

    output = {};
    util.forEach(groupByName, function(coll, name) {
        var tmp;

        if (name === '_other') {
            return;
        }

        coll.each(function(el) {
            var nodeName = el.nodeName.toLowerCase(),
                type = el.type;

            if (nodeName === 'select') {
                tmp = util.map(
                    coll.find(function(sel) { return sel.childNodes.length > 0; }).items,
                    function(sel) {
                        return util.pick(
                            domutil.find('option', sel, function(opt) { return opt.selected; }),
                            '0',
                            'value'
                        );
                    }
                );
                return;
            } else if (type === 'radio' || type === 'checkbox') {
                tmp = util.map(
                    coll.find(function(el) { return el.checked; }).items,
                    function(el) { return el.value; }
                );
                return;
            }

            tmp = [el.value];
        });

        if (!tmp.length) {
            tmp = '';
        } else if (tmp.length === 1) {
            tmp = tmp[0];
        }

        output[name] = tmp;
    });

    return output;
};

CalendarForm.prototype._onSubmit = function(e) {
    // domevent.stop(e);
    //
    // this.api.post
};

// CalendarForm.prototype._getBaseViewModel = function() {
//     var options = this.options,
//         url = options.action.replace(
//
//
// };

CalendarForm.prototype.render = function(projectCode, isCreateMode, isPrivate, method) {
    var options = this.options,
        action = '';

    projectCode = projectCode || options.projectCode;
    isCreateMode = util.isExisty(isCreateMode) ? isCreateMode : options.isCreateMode;
    isPrivate = util.isExisty(isPrivate) ? isPrivate: options.isPrivate;
    method = method || options.method;
    action = options.action.replace('{{projectCode}}', projectCode);

    this.container.innerHTML = tmpl({
        projectCode: projectCode,
        isCreateMode: isCreateMode,
        isPrivate: isPrivate,
        method: method,
        action: action
    });
};

module.exports = CalendarForm;

