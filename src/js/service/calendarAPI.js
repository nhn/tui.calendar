/**
 * @fileoverview Module for manage calendar REST API requests.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Ajax = require('../common/ajax');

// 캘린더 API 기본 PATH
var ROOT_PATH = '/task-tracker';

/**********
 * CALENDAR
 **********/

/**
 * 해당 프로젝트의 캘린더 목록 확인
 * @param {string} [projectCode='*'] - 프로젝트 코드 '*' 사용가능
 * @param {object} ajaxOptions - ajax 모듈에 사용할 옵션 객체
 */ 
function getCalendars(projectCode, ajaxOptions) {
    var url = 'projects/{{ projectCode }}/calendars';
    projectCode = projectCode || '*';
    url = ROOT_PATH + '/' + url.replace('{{ projectCode }}', projectCode);

    ajaxOptions = ajaxOptions || {};

    new Ajax().ajax(url, ajaxOptions);
}

/**
 * 캘린더 만들기
 * @param {string} projectCode - 프로젝트 코드
 * @param {service/model/calendar} data - 캘린더 생성 관련 데이터
 * @param {object} ajaxOptions - ajax 모듈에 사용할 옵션 객체
 */
function postCalendars(projectCode, data, ajaxOptions) {
    var url = 'projects/{{ projectCode }}/calendars';
    projectCode = projectCode || '*';
    url = ROOT_PATH + '/' + url.replace('{{ projectCode }}', projectCode);

    ajaxOptions = ajaxOptions || {};

    util.extend(ajaxOptions, {
        method: 'POST'
    });

    new Ajax().ajax(url, data, ajaxOptions);
}

/**********
 * TASK
 **********/

/**
 * 일정 목록 조회
 * @param {string} [projectCode='*'] - 프로젝트 코드
 * @param {string} [calendarId='*'] - 캘린더 ID
 * @param {string} [timeMin] - 조회시작일자
 * @param {string} [timeMax] - 조회 종료일자
 * @param {object} [ajaxOptions] - ajax 모듈에 사용할 옵션 객체
 */
function getCalendarTasks(projectCode, calendarId, timeMin, timeMax, ajaxOptions) {
    var url = 'projects/{{ projectCode }}/calendars/{{ calendarId }}/tasks' +
        '?calendars={{ calendars }}&timeMin={{ timeMin }}&timeMax={{ timeMax }}';

    calendarId = calendarId.replace(/\s/g, '');

    url = ROOT_PATH + '/' + url.replace('{{ projectCode }}', projectCode || '*')
        .replace('{{ calendarId }}', ~calendarId.indexOf(',') ? '*' : calendarId)
        .replace('{{ calendars }}', ~calendarId.indexOf(',') ? calendarId : '')
        .replace('{{ timeMin }}', timeMin || '')
        .replace('{{ timeMax }}', timeMax || '');

    new Ajax().ajax(url, ajaxOptions || {});
}

module.exports = {
    getCalendars: getCalendars,
    postCalendars: postCalendars,
    getCalendarTasks: getCalendarTasks
};
