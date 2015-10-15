/**
 * @fileoverview Interface for DoorayBase controller to allow talk with dooray API server
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var common = require('../../common/common');
var datetime = require('../../common/datetime');
var calendarAPI = require('../calendarAPI');
var Collection = require('../../common/collection');
var noop = (function() {});

// model
var DoorayEvent = require('../model/event');
var CalendarReference = require('../model/calendar');

/**
 * @constructor
 * @param {object} options - options for API module
 * @param {function} [options.beforeRequest] - function invoke before all request sending
 * @param {function} [options.afterResponse] - function invoke after all request reponded
 */
function API(options) {
    /**
     * @type {object}
     */
    this.options = util.extend({
        member: null,
        beforeRequest: noop,
        afterResponse: noop
    }, options);
}

/**
 * 모든 API통신이 실패했을 때 동작하는 콜백 핸들러 반환
 * @param {function} callback - 사용자 콜백 함수
 * @returns {function} - API실패 핸들러 함수
 */
API.prototype._onFailFunc = function(callback) {
    return function() {
        callback(true, null);
    };
};

/**
 * 캘린더 목록 조회 함수 캘린더 목록을 콜렉션 형태로 반환한다
 * @param {string} [projectCode='*'] - 조회할 프로젝트
 * @param {function} callback - common nodejs collback function. 첫 번째 인자는 오류, 두 번째 인자는 캘린더 콜렉션을 반환한다
 */
API.prototype.getCalendars = function(projectCode, callback) {
    var options = this.options,
        onFail = this._onFailFunc(callback),
        calendars = new Collection(function(calendarRef) {
            return calendarRef.id + '';
        });

    calendarAPI.getCalendars(projectCode, {
        success: function(res) {
            var dataObject = util.pick(res, 'result', 'calendars');

            if (dataObject && dataObject.length) {
                calendars.add.apply(calendars, util.map(dataObject, function(data) {
                    var inst = new CalendarReference();
                    inst.unmarshal(data);
                    return inst;
                }));
            }

            callback(false, calendars);
        },
        error: onFail,
        fail: onFail,
        complete: options.afterResponse
    });

    options.beforeRequest();
};

API.prototype.postCalendar = function(data, callback) {
    var options = this.options,
        member = options.member,
        onFail = this._onFailFunc(callback),
        projectCode;

    if (data.type === 'private') {
        // 개인 캘린더의 경우 projectCode는 @userCode
        projectCode = '@' + member.userCode;
        data.delegation = [];
        // data.delegation = data.delegation || [];
        data.delegation.push({
            user: {
                id: member.orgMemberId 
            },
            permission: 'read_write'
        });
    }

    calendarAPI.postCalendars(projectCode, data, {
        success: function(res) {
            callback(false, res);
        },
        error: onFail,
        fail: onFail,
        complete: options.afterResponse
    });

    options.beforeRequest();
};

/**
 * 일정 목록을 조회한다
 * @param {string} [projectCode='*'] - 프로젝트 코드
 * @param {string} [calendarId='*'] - 캘린더 ID
 * @param {string|Date} [timeMin] - 조회시작일자 Timezone offset 을 포함한 UTC필요
 * @param {string|Date} [timeMax] - 조회 종료일자 Timezone offset 을 포함한 UTC필요
 * @param {function} callback - 콜백 함수. 첫 번째 인자는 오류 여부, 두 번째 인자는 일정 콜렉션
 */
API.prototype.getTasks = function(projectCode, calendarId, timeMin, timeMax, callback) {
    var options = this.options,
        onFail = this._onFailFunc(callback),
        tasks = common.createEventCollection();

    timeMin = util.isDateSafe(timeMin) ? datetime.format(timeMin, 'LOCAL') : timeMin;
    timeMax = util.isDateSafe(timeMax) ? datetime.format(timeMax, 'LOCAL') : timeMax;

    calendarAPI.getCalendarTasks(projectCode, calendarId, timeMin, timeMax, {
        success: function(res) {
            var dataObject = util.pick(res, 'result', 'tasks');

            if (dataObject && dataObject.length) {
                tasks.add.apply(tasks, util.map(dataObject, function(data) {
                    var inst = new DoorayEvent();
                    inst.unmarshal(data);
                    return inst;
                }));
            }

            callback(false, tasks);
        },
        error: onFail,
        fail: onFail,
        complete: options.afterResponse
    });

    options.beforeRequest();
};

module.exports = API;

