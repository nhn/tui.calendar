/**
 * @fileoverview Module for manage calendar REST API requests.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Ajax = require('../common/ajax');

// 캘린더 API 기본 PATH
var ROOT_PATH = '/wapi/task-tracker';

/**********
 * CALENDAR
 **********/

/**
 * 해당 프로젝트의 캘린더 목록 확인
 * @memberof CalendarAPI
 * @param {string} [projectCode='*'] - 프로젝트 코드 '*' 사용가능
 * @param {object} ajaxOptions - ajax 모듈에 사용할 옵션 객체
 */ 
function getCalendars(projectCode, ajaxOptions) {
    var url = 'projects/{{projectCode}}/calendars';
    projectCode = projectCode || '*';
    url = ROOT_PATH + '/' + url.replace('{{projectCode}}', projectCode);

    ajaxOptions = ajaxOptions || {};

    new Ajax().ajax(url, ajaxOptions);
}

/**
 * 캘린더 만들기
 * @memberof CalendarAPI
 * @param {string} projectCode - 프로젝트 코드
 * @param {service/model/calendar} data - 캘린더 생성 관련 데이터
 * @param {object} ajaxOptions - ajax 모듈에 사용할 옵션 객체
 */
function postCalendars(projectCode, data, ajaxOptions) {
    var url = 'projects/{{projectCode}}/calendars';
    projectCode = projectCode || '*';
    url = ROOT_PATH + '/' + url.replace('{{projectCode}}', projectCode);

    ajaxOptions = ajaxOptions || {};
    ajaxOptions.data = JSON.stringify([data]);
    ajaxOptions.method = 'POST';

    new Ajax().ajax(url, ajaxOptions);
}

/**********
 * TASK
 **********/

/**
 * 일정 목록 조회
 * @memberof CalendarAPI
 * @param {string} [projectCode='*'] - 프로젝트 코드
 * @param {string} [calendarId='*'] - 캘린더 ID
 * @param {string} [timeMin] - 조회시작일자
 * @param {string} [timeMax] - 조회 종료일자
 * @param {object} [ajaxOptions] - ajax 모듈에 사용할 옵션 객체
 */
function getCalendarTasks(projectCode, calendarId, timeMin, timeMax, ajaxOptions) {
    var url = 'projects/{{projectCode}}/calendars/{{calendarId}}/tasks' +
        '?calendars={{calendars}}&timeMin={{timeMin}}&timeMax={{timeMax}}',
        encode = window.encodeURIComponent;

    calendarId = calendarId.replace(/\s/g, '');

    url = ROOT_PATH + '/' + url.replace('{{projectCode}}', projectCode || '*')
        .replace('{{calendarId}}', ~calendarId.indexOf(',') ? '*' : calendarId || '*')
        .replace('{{calendars}}', ~calendarId.indexOf(',') ? calendarId : '')
        .replace('{{timeMin}}', encode(timeMin) || '')
        .replace('{{timeMax}}', encode(timeMax) || '');

    new Ajax().ajax(url, ajaxOptions || {});
}


/**********
 * Free Busy
 **********/

/**
 * @param {string[]} to - 대상 사용자 목록
 * @param {string} [timeMin] - 조회시작일자
 * @param {string} [timeMax] - 조회 종료일자
 * @param {string} type - '' or 'summary'
 * @param {object} [ajaxOptions] - ajax 모듈에 사용할 옵션 객체
 */
function getFreeBusy(to, timeMin, timeMax, type, ajaxOptions) {
    var url = 'projects/*/calendars/*/freebusy?to={{to}}&' + 
        'timeMin={{timeMin}}&timeMax={{timeMax}}&type={{type}}',
        encode = window.encodeURIComponent;

    to = util.map(to, function(id) { return encode(id); }).join(',');

    url = ROOT_PATH + '/' + url.replace('{{to}}', to)
        .replace('{{timeMin}}', encode(timeMin))
        .replace('{{timeMax}}', encode(timeMax))
        .replace('{{type}}', type || 'summary');

    new Ajax().ajax(url, ajaxOptions || {});
}

/**
 * 캘린더에 관련된 API호출 기능을 모아둔 믹스인 모듈. service/calendar 모듈에서 사용한다.
 * @mixin CalendarAPI
 */
module.exports = /** @lends CalendarAPI */ {
    getCalendars: getCalendars,
    postCalendars: postCalendars,
    getCalendarTasks: getCalendarTasks,
    getFreeBusy: getFreeBusy
};
