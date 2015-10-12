/**
 * @fileoverview Calndar reference model for Dooray Calendar service
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.ne.util;
var enums = require('../enums');

/**
 * @constructor
 */
function CalendarReference() {
    /**
     * @type {string}
     */
    this.id = '';

    /**
     * @type {string}
     */
    this.name = '';

    /**
     * 캘린더 타입 (기본값: private)
     * @type {string}
     */
    this.type = enums.model.CALENDAR_ITEM_TYPE.PRIVATE;

    /**
     * 캘린더에 대한 사용자의 권한 (기본값: owner)
     * @type {string}
     */
    this.permission = enums.model.CALENDAR_ITEM_PERMISSION.OWNER;

    /**
     * 기본 캘린더 여부
     * @type {boolean}
     */
    this.isDefault = false;

    /**
     * 캘린더 색상 #을 제외한 6자리 hex코드 값
     * @type {string}
     */
    this.color = '';

    /**
     * @type {object}
     */
    this.raw = null;
}

/**
 * Unmarshal object from server API response data
 * @param {object} dataObject - data object from server API response
 */
CalendarReference.prototype.unmarshal = function(dataObject) {
    this.id = dataObject.id || '';

    this.name = dataObject.name || '';
    this.type = dataObject.type || '';
    this.permission = dataObject.permission || '';
    this.isDefault = dataObject['default'] ? true : false;
    this.color = dataObject.color || 'ffffff';
    this.raw = dataObject;
};

/**
 * Marshal object to communicate with dooray task tracker API server
 * @returns {object} data object can dooray server acceptable
 */
CalendarReference.prototype.marshal = function() {
    var result = util.extend({}, this.raw);

    result.name = this.name;
    result.type = this.type;
    result.permission = this.permission;
    result['default'] = this.isDefault;
    result.color = this.color;

    return result;
};

module.exports = CalendarReference;

