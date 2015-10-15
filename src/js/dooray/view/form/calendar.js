/**
 * @fileoverview 캘린더 생성/수정 폼 컴포넌트
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../../../common/domutil');
var domevent = require('../../../common/domevent');
var View = require('../../../view/view');
var tmpl = require('./calendar.hbs');

var CALENDAR_TYPE_LIST = [{
    value: 'private',
    label: '개인 캘린더'
}, {
    value: 'shared',
    label: '공유 캘린더'
}];

var PRIVATE_LIST = [{
    value: 'opaque_view',
    label: '단순 조회'
}, {
    value: 'view',
    label: '조회'
}, {
    value: 'read_write',
    label: '위임'
}];

var SHARE_LIST = [{
    value: 'view',
    label: '조회'
}, {
    value: 'read_write',
    label: '수정/삭제'
}, {
    value: 'all',
    label: '모든권한'
}];

/**
 * @constructor
 * @extends {View}
 * @param {API} api - instance of api module
 * @param {object} options - options
 *  @param {string} [options.projectCode] - project code for creation
 *  @param {boolean} [options.isCreateMode=true] - mode. set true then `creation`, false then `modify`
 *  @param {boolean} [options.isPrivate] - 개인 캘린더 여부
 *  @param {string} [options.method=POST] - http method
 *  @param {string} [options.action] - url
 *  @param {object} [options.formData] - 미리 채워 둘 폼 데이터 (없어도 무방)
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
        method: 'POST',
        action: '/wapi/task-tracker/projects/{{projectCode}}/calendars',
        
        calendarList: CALENDAR_TYPE_LIST,
        privateList : PRIVATE_LIST,
        shareList: SHARE_LIST,
        formData: {
            type: 'private'
        } 
    }, options);

    domevent.on(container, {
        'submit': this._onSubmit,
        'change': this._onChange,
        'click': this._onClick
    }, this);

    this.render();
}

util.inherit(CalendarForm, View);

/**
 * 캘린더 폼으로부터 객체 형태의 데이터를 추출함
 * @returns {object} 폼 데이터
 */
CalendarForm.prototype.getFormData = function() {
    var formData = domutil.getFormData(domutil.find('form', this.container)),
        userId = formData['userId[]'] || [],
        authority = formData['authority[]'] || [],
        result = {
            name: formData.name,
            color: formData.color,
            type: formData.type,
            share: []
        };

    userId = util.isArray(userId) ? userId : [userId];
    authority = util.isArray(authority) ? authority : [authority];

    util.forEach(userId, function(id, index) {
        result.share.push({
            id: id,
            authority: authority[index]
        });
    });

    return result;
};

/**
 * @override
 * @param {object} [formData] - 폼 데이터를 넘기면 렌더링 시 적용한다
 */
CalendarForm.prototype.render = function(formData) {
    var options = this.options;

    if (formData) {
        options.formData = formData;
    }

    this.container.innerHTML = tmpl(options);
};

/**
 * 캘린더 유형 변경 시 핸들러
 * @param {Event} e - 캘린더 유형 셀렉트박스 변경 이벤트 객체
 */
CalendarForm.prototype._onChange = function(e) {
    if (e.target.name === 'type') {
        this.render(this.getFormData());
    }
};

/**
 * 공유설정 추가 버튼 클릭 핸들러
 * @param {Event} e - 버튼 클릭 이벤트
 */
CalendarForm.prototype._onClick = function(e) {
    var that = this,
        formData;

    if (e.target.type === 'button') {
        formData = that.getFormData();
        formData.share.push({id: '', authority: ''});
        that.render(formData);

        util.debounce(function() {
            domutil.find('input', that.container, function(el) {
                return el.name === 'userId[]';
            }).pop().focus();
        }, 0)();
    }
};

/**
 * 생성/수정 버튼 클릭 시 핸들러
 * @param {Event} e - 전송 이벤트 객체
 */
CalendarForm.prototype._onSubmit = function(e) {
    domevent.stop(e);
    console.log(this.getFormData());
};

module.exports = CalendarForm;

