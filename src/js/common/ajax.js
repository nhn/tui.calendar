/* eslint complexity: 0 */
/**
 * @fileoverview Module for full management of requesting AJAX from server.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');

/**
 * @constructor
 */
function AJAX() {}

AJAX.ERROR = {
    NOT_SUPPORT: '사용하시는 브라우저가 서비스 이용에 필요한 필수 기능을 지원하지 않습니다. 최신 버전의 브라우저를 사용해 주세요.'
};

/**********
 * ajax
 **********/

/**
 * 비동기 요청을 위한 객체를 만들어 반환한다
 * @returns {(XMLHttpRequest|ActiveXObject)} 비동기 통신 지원 객체
 */
AJAX.prototype._createXHR = function() {
    if (util.isExisty(util.pick(window, 'XMLHttpRequest'))) {
        return new XMLHttpRequest();
    } else if (util.isExisty(util.pick(window, 'ActiveXObject'))) {
        return new ActiveXObject('Microsoft.XMLHTTP'); // jshint ignore:line
    }

    window.alert(AJAX.ERROR.NOT_SUPPORT);
};

/**
 * 타입에 따라 데이터를 추가 가공한다
 *
 * TODO: 현재는 JSON데이터만 처리중이고 필요에 따라 늘어나야 한다
 * @param {string} dataType 데이터 타입
 * @param {*} data 가공할 데이터
 * @returns {*} 가공된 데이터
 */
AJAX.prototype._processRawData = function(dataType, data) {
    var result = data;
    if (dataType === 'json') {
        try {
            result = JSON.parse(data);
        } catch (e) {
            result = data;
        }
    }

    return result;
};

/**
 * XHR의 응답 데이터를 처리한다
 * @param {object} options - ajax옵션 객체
 * @param {(XMLHttpRequest|ActiveXObject)} xhr - 비동기 요청 객체
 */
AJAX.prototype._onReadyStateChange = function(options, xhr) {
    var status,
        response,
        responseHeader;

    if (xhr.readyState !== 4) {
        return;
    }

    status = xhr.status;

    if ((status >= 200 && status < 300) || status === 304) {
        response = this._processRawData(options.dataType, xhr.responseText);
        responseHeader = util.pick(response, 'header');

        if (!responseHeader) {
            options.error();
        } else if (responseHeader.isSuccessful) {
            options.success(response);
        } else {
            options.fail(response);
        }
    } else if (status !== 0) {
        options.error();
    }

    options.complete();
};


/**
 * ajax 요청을 수행한다.
 *
 * 요청 타입에 따른 추가 데이터 처리는 따로 하지 않으므로 사전에 미리 준비해야 한다
 * 예를 들어, get요청은 QueryString으로 url을 설정해야 하고, post등의 data를 사용하
 * 는 요청은 미리 stringfy된 값을 data옵션으로 전달해야 한다.
 *
 * @param {string} url ajax요청 할 url
 * @param {Object} options 옵션
 * @param {string} [options.method='POST'] 요청 시 사용할 http methods
 * @param {boolean} [options.async=true] 비동기 요청 사용 여부
 * @param {string} [options.type='application/json; charset=utf-8'] type 헤더 값
 * @param {string} [options.contentType='application/json'] Content-Type 헤더 값
 * @param {string} [options.dataType='json'] 서버에서 응답받기 바라는 결과의 타입
 * @param {function} [optoins.success] - isSuccessful true에 대한 콜백
 * @param {function} [options.fail] - isSuccessful false 에 대한 콜백
 * @param {function} [options.error] 요청에 대한 에러 발생 시 수행할 콜백
 * @param {function} [options.complete] 요청이 끝났을 때 (성공, 실패 여부와 무관) 수행하는 콜백
 * @param {bollean} [options.cache=true] - false 일 경우 timestamp 파라미터를 url에 붙여 캐시를 무시
 */
AJAX.prototype.ajax = function(url, options) {
    var xhr,
        data,
        separator,
        defaultOptions = {
            method: 'GET',
            async: true,
            type: 'application/json; charset=utf-8',
            contentType: 'application/json',
            dataType: 'json',
            success: function() {},
            fail: function() {},
            error: function() {},
            complete: function() {},
            cache: true
        };

    options = util.extend(defaultOptions, options);
    data = util.pick(options, 'data');
    if (!options.cache) {
        separator = ~url.indexOf('?') ? '&' : '?';
        url = url + separator + '_=' + Number(new Date());
    }

    xhr = this._createXHR();
    xhr.open(options.method, url, options.async);
    xhr.setRequestHeader('type', options.type);
    xhr.setRequestHeader('content-type', options.contentType);
    xhr.onreadystatechange = util.bind(this._onReadyStateChange, this, options, xhr);
    xhr.send(data ? data : null);
};

module.exports = AJAX;

