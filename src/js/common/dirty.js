/**
 * @fileoverview 특정 프로퍼티가 변경 여부를 플래깅할 수 있는 모듈
 * @author FE개발팀 김민형 minhyeong.kim@nhnent.com
 */

'use strict';

/**
 * 더티 플래깅 기능을 제공하는 믹스인 모듈
 *
 * *주의: 더티 플래깅을 하기 위해서는 반드시 객체의 속성 편집을 제공되는 API로만 해야 한다*
 * @module util/dirty
 * @example
 * var obj = { hello: 'good', test: '123' };
 * dirty.mixin(obj);
 *
 * obj.set('hello', 'world');
 * obj.isDirty();    // true
 * obj.isPropChanged('hello');    // true
 * obj.isPropChanged('test');    // false
 * obj.dirty(false);
 *
 * obj.isDirty();    // false
 * obj.isPropChanged('hello');    // false
 */

var common = ne.util,
    existy = common.isExisty,
    pick = common.pick,
    isFunc = common.isFunction;

/**
 * 특정 객체에 믹스인하면 객체의 변경사항을 알 수 있는 기능을 추가하는 모듈
 *
 * *주의: 더티 플래깅을 하기 위해서는 반드시 객체의 속성 편집을 제공되는 API로만 해야 한다*
 * @exports dirty
 * @mixin
 */
var dirty = {
    /**
     * 객체에 프로퍼티 설정, 더티 플래깅
     */
    set: function(k, v) {
        var originValue = this[k];

        if (originValue === v) {
            return;
        }

        this[k] = v;

        if (!this._changed) {
            /**
             * 변경된 프로퍼티 이름 저장
             *
             * {@link module:util/dirty.dirty}를 false로 호출 시 비워진다
             * @memberof dirty
             * @name _changed
             * @type {Object}
             */
            this._changed = {};
        }

        this._changed[k] = true;

        /**
         * 변경사항 존재 여부 저장
         * @type {Boolean}
         * @name _dirty
         * @memberof dirty
         */
        this._dirty = true;
    },

    /**
     * 객체의 더티 플래그를 확인
     */
    isDirty: function() {
        return !!this._dirty;
    },

    /**
     * 객체의 더티 플래그를 직접 설정
     * @param {Boolean} [toDirty=true]
     */
    dirty: function(toDirty) {
        toDirty = existy(toDirty) ? toDirty : true;

        /* istanbul ignore else */
        if (!toDirty) {
            this._changed = {};
        }

        this._dirty = toDirty;
    },

    /**
     * 인자로 제공된 이름의 프로퍼티를 안전히 제거
     * @param {String} propName 제거할 프로퍼티명
     */
    deleteProp: function(propName) {
        delete this[propName];
        delete this._changed[propName];
    },

    /**
     * 인자로 제공된 이름의 프로퍼티의 변경 여부를 검사
     * @param {String} propName 변경여부확인 원하는 프로퍼티명
     */
    isPropChanged: function(propName) {
        return this._changed[propName] === true;
    },

    /**
     * 더티 플래깅 기능을 제공된 객체에 믹스인
     * @param {Object} target
     * @memberof module:util/dirty
     * @example
     * // 객체에 믹스인
     * var obj = {};
     * dirty.mixin(obj);
     * // 프로토타입에 믹스인
     * function Animal() {}
     * dirty.mixin(Animal.prototype);
     */
    mixin: function(target) {
        var methodFilterR = /(^_|mixin|wrap)/;

        common.forEachOwnProperties(dirty, function(o, k) {
            if (!methodFilterR.test(k)) {
                target[k] = dirty[k];
            }
        });
    },

    /**
     * 객체의 메서드 호출 후 더티 플래깅을 자동 처리하도록 메서드 래핑
     *
     * 프로토타입 객체에 래핑하는 경우 꼭 래핑하는 메서드를 만들어준 후 호출해야 한다
     * @param {Object} target 더티 플래그 메서드 래핑을 원하는 대상 객체
     * @param {(String|Object)} methodName
     *  래핑할 메서드명 또는 메서드명: 플래그값 객체
     * @param {Boolean} [flag=true]
     *  false전달 시 래핑된 메서드 수행 후 더티 플래그를 false로 설정하도록 설정가능
     * @memberof module:util/dirty
     * @example
     * function Animal(name) {
     *     this.name = name;
     * }
     * Animal.prototype.growl = jasmine.createSpy('growl');
     * Animal.prototype.test = function() {
     *     return this.name;
     * };
     *
     * dirty.mixin(Animal.prototype);
     * // 아래처럼 단일로 등록 또는
     * dirty.wrap(Animal.prototype, 'growl', true);
     * // 메서드명: 플래그값 객체
     * dirty.wrap(Animap.prototype, {
     *     growl: true,
     *     test: false
     * });
     *
     */
    wrap: function(target, methodName, flag) {
        var wrap = dirty.wrap,
            fn;

        if (common.isObject(methodName)) {
            common.forEachOwnProperties(methodName, function(flag, methodName) {
                wrap(target, methodName, flag);
            });
            return;
        }

        flag = existy(flag) ? flag : true;

        if (!target._wrapper) {
            /**
             * 자동 더티 체크를 위해 해당 객체에 추가되는 유틸 함수
             *
             * 이 메서드가 유실되면 더티 플래깅 기능에 문제 발생 가능
             * @name _wrapper
             * @memberof dirty
             */
            target._wrapper = function(fn, flagToSet) {
                return function() {
                    var args = Array.prototype.slice.call(arguments);
                    var result = fn.apply(this, args);
                    this._dirty = flagToSet;
                    return result;
                };
            };
        }

        if (existy(pick(target, methodName)) &&
            isFunc(target[methodName]) &&
            !existy(pick(target, methodName, '_wrapped'))) {
            fn = target[methodName];
            target[methodName] = target._wrapper(fn, flag);
            target[methodName]._wrapped = true;
        }
    }
};

module.exports = dirty;

