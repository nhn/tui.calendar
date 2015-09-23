/**
 * @fileoverview Module for full management of requesting API from server.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;

/**
 * @constructor
 */
function API() {}

/**********
 * ajax
 **********/

/**
 * 비동기 요청을 위한 객체를 만들어 반환한다
 * @return {(XMLHttpRequest|ActiveXObject)} 비동기 통신 지원 객체
 */
API.prototype._createXHR = function() {
    if (util.isExisty(util.pick(window, 'XMLHttpRequest'))) {
        return new XMLHttpRequest();
    } else if (util.isExisty(util.pick(window, 'ActiveXObject'))) {
        return new ActiveXObject('Microsoft.XMLHTTP'); // jshint ignore:line
    }

    window.alert('사용하시는 브라우저가 서비스 이용의 필수 기능을 지원하지 않습니다. 최신 버전의 브라우저를 사용해 주세요.');
};

/**
 * 타입에 따라 데이터를 추가 가공한다
 *
 * TODO: 현재는 JSON데이터만 처리중이고 필요에 따라 늘어나야 한다
 * @param {string} dataType 데이터 타입
 * @param {*} data 가공할 데이터
 * @return {*} 가공된 데이터
 */
API.prototype._processRawData = function(dataType, data) {
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
 * @param {object} options ajax옵션 객체
 * @param {(XMLHttpRequest|ActiveXObject)} xhr     비동기 요청 객체
 */
API.prototype._onReadyStateChange = function(options, xhr) {
    var status,
        response;

    if (xhr.readyState === 4) {
        status = xhr.status;

        // 정상적으로 응답을 받은 경우
        if ((status >= 200 && status < 300) || status === 304) {
            // 응답이 문제없는 경우
            response = this._processRawData(options.dataType, xhr.responseText);

            if (response.isSuccessful) {
                options.success(response.result);
            } else {
                options.fail(response.result, response.code);
            }
        } else if (status !== 0) {
            options.error();
        }

        options.complete();
    }
};


/**
 * ajax 요청
 * @param {string} url ajax요청 할 url
 * @param {Object} options 옵션
 * @param {string} [options.method='POST'] 요청 시 사용할 http methods
 * @param {boolean} [options.async=true] 비동기 요청 사용 여부
 * @param {string} [options.type='application/json; charset=utf-8'] type 헤더 값
 * @param {string} [options.contentType='application/json'] Content-Type 헤더 값
 * @param {function()} [options.beforeRequest] 요청 전 수행할 콜백
 * @param {function()} [options.error] 요청에 대한 에러 발생 시 수행할 콜백
 * @param {function()} [options.complete] 요청이 끝났을 때 (성공, 실패 여부와 무관) 수행하는 콜백
 */
API.prototype.ajax = function(url, options) {
    var xhr,
        defaultOptions = {
            method: 'GET',
            async: true,
            type: 'application/json; charset=utf-8',
            contentType: 'application/json',
            dataType: 'json',
            beforeRequest: function() {},
            success: function() {},
            fail: function() {},
            error: function() {},
            complete: function() {},
            cache: true
        },
        data,
        separator;

    options = util.extend(defaultOptions, options);
    data = util.isExisty(util.pick(options, 'data'));
    if (!data) {
        data = null;
    }

    options.beforeRequest(data);

    if (!options.cache) {
        separator = ~url.indexOf('?') ? '&' : '?';
        url = url + separator + '_=' + +(new Date());
    }

    xhr = this._createXHR();
    xhr.open(options.method, url, options.async);
    xhr.setRequestHeader('type', options.type);
    xhr.setRequestHeader('Content-Type', options.contentType);
    xhr.onreadystatechange = util.bind(this._onReadyStateChange, this, options, xhr);
    xhr.send();
};

module.exports = function() {
    var instance = API.instance;

    if (!instance) {
        instance =  API.instance = new API();
    }

    return instance;
}
