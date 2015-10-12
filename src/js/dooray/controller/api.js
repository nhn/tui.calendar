/**
 * @fileoverview Interface for DoorayBase controller to allow talk with dooray API server
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var calendarAPI = require('../calendarAPI');
var CalendarReference = require('../model/calendar');
var Collection = require('../../common/collection');
var noop = (function() {});

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
        onFail = this._onFailFunc(callback);

    calendarAPI.getCalendars(projectCode, {
        success: function(res) {
            var calendars = new Collection(function(calendarRef) {
                return calendarRef.id + '';
            });

            if (res.result.calendars.length) {
                calendars.add.apply(calendars, util.map(res.result.calendars, function(data) {
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

module.exports = API;

