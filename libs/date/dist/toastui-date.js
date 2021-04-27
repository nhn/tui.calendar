/*!
 * TOAST UI Date
 * @version 0.0.3 | Mon Apr 26 2021
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Date"] = factory();
	else
		root["toastui"] = root["toastui"] || {}, root["toastui"]["Date"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is a string or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a string or not.
 * If the given variable is a string, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is string?
 * @memberof module:type
 */
function isString(obj) {
  return typeof obj === 'string' || obj instanceof String;
}

module.exports = isString;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "LocalDate", function() { return /* reexport */ localDate_LocalDate; });
__webpack_require__.d(__webpack_exports__, "UTCDate", function() { return /* reexport */ utcDate_UTCDate; });
__webpack_require__.d(__webpack_exports__, "MomentDate", function() { return /* reexport */ MomentDate; });

// EXTERNAL MODULE: ./node_modules/tui-code-snippet/type/isString.js
var isString = __webpack_require__(0);
var isString_default = /*#__PURE__*/__webpack_require__.n(isString);

// CONCATENATED MODULE: ./src/localDate.js

/**
 * datetime regex from https://www.regexpal.com/94925
 * timezone regex from moment
 */

const rISO8601 = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.)?([0-9]+)?([+-]\d\d(?::?\d\d)?|\s*Z)?$/;

function throwNotSupported() {
  throw new Error('This operation is not supported.');
}

function getDateTime(dateString) {
  const match = rISO8601.exec(dateString);

  if (match) {
    const [, y, M, d, h, m, s,, ms, zoneInfo] = match;
    return {
      y: Number(y),
      M: Number(M) - 1,
      d: Number(d),
      h: Number(h),
      m: Number(m),
      s: Number(s),
      ms: Number(ms) || 0,
      zoneInfo
    };
  }

  return null;
}

function createFromDateString(dateString) {
  const info = getDateTime(dateString);

  if (info && !info.zoneInfo) {
    const {
      y,
      M,
      d,
      h,
      m,
      s,
      ms
    } = info;
    return new Date(y, M, d, h, m, s, ms);
  }

  return null;
}

class localDate_LocalDate {
  constructor(...args) {
    const [firstArg] = args;

    if (firstArg instanceof Date) {
      this.d = new Date(firstArg.getTime());
    } else if (isString_default()(firstArg) && args.length === 1) {
      this.d = createFromDateString(firstArg);
    }

    if (!this.d) {
      this.d = new Date(...args);
    }
  }

  setTimezoneOffset() {
    throwNotSupported();
  }

  setTimezoneName() {
    throwNotSupported();
  }

  clone() {
    return new localDate_LocalDate(this.d);
  }

  toDate() {
    return new Date(this.d.getTime());
  }

  toString() {
    return this.d.toString();
  }

}
const getterMethods = ['getTime', 'getTimezoneOffset', 'getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds', 'getDay'];
const setterMethods = ['setTime', 'setFullYear', 'setMonth', 'setDate', 'setHours', 'setMinutes', 'setSeconds', 'setMilliseconds'];
getterMethods.forEach(methodName => {
  localDate_LocalDate.prototype[methodName] = function (...args) {
    return this.d[methodName](...args);
  };
});
setterMethods.forEach(methodName => {
  localDate_LocalDate.prototype[methodName] = function (...args) {
    return this.d[methodName](...args);
  };
});
// CONCATENATED MODULE: ./src/utcDate.js

class utcDate_UTCDate extends localDate_LocalDate {
  clone() {
    return new utcDate_UTCDate(this.d);
  }

  getTimezoneOffset() {
    return 0;
  }

}
const getterProperties = ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds', 'Milliseconds', 'Day'];
const setterProperties = ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds', 'Milliseconds'];
getterProperties.forEach(prop => {
  const methodName = `get${prop}`;

  utcDate_UTCDate.prototype[methodName] = function (...args) {
    return this.d[`getUTC${prop}`](...args);
  };
});
setterProperties.forEach(prop => {
  const methodName = `set${prop}`;

  utcDate_UTCDate.prototype[methodName] = function (...args) {
    return this.d[`setUTC${prop}`](...args);
  };
});
// CONCATENATED MODULE: ./src/momentDate.js
let moment;
class MomentDate {
  static setMoment(m) {
    moment = m;
    return MomentDate;
  }

  constructor(...args) {
    if (!moment) {
      throw new Error('MomentDate requires Moment constructor. Use "MomentDate.setMoment(moment);".');
    }

    this.m = moment(...args);
  }

  setTimezoneOffset(offset) {
    this.m.utcOffset(-offset);
    return this;
  }

  setTimezoneName(zoneName) {
    if (this.m.tz) {
      this.m.tz(zoneName);
    } else {
      throw new Error('It requires moment-timezone. Use "MomentDate.setMoment()" with moment-timezone');
    }

    return this;
  }

  clone() {
    return new MomentDate(this.m);
  }

  toDate() {
    return this.m.toDate();
  }

  toString() {
    return this.m.format();
  }

  getTime() {
    return this.m.valueOf();
  }

  getTimezoneOffset() {
    const offset = -this.m.utcOffset();
    return Math.abs(offset) ? offset : 0;
  }

  getFullYear() {
    return this.m.year();
  }

  getMonth() {
    return this.m.month();
  }

  getDate() {
    return this.m.date();
  }

  getHours() {
    return this.m.hours();
  }

  getMinutes() {
    return this.m.minutes();
  }

  getSeconds() {
    return this.m.seconds();
  }

  getMilliseconds() {
    return this.m.milliseconds();
  }

  getDay() {
    return this.m.day();
  }

  setTime(t) {
    this.m = moment(t);
    return this.getTime();
  }

  setFullYear(y, m = this.getMonth(), d = this.getDate()) {
    this.m.year(y).month(m).date(d);
    return this.getTime();
  }

  setMonth(m, d = this.m.date()) {
    this.m.month(m).date(d);
    return this.getTime();
  }

  setDate(d) {
    this.m.date(d);
    return this.getTime();
  }

  setHours(h, m = this.getMinutes(), s = this.getSeconds(), ms = this.getMilliseconds()) {
    this.m.hours(h).minutes(m).seconds(s).milliseconds(ms);
    return this.getTime();
  }

  setMinutes(m, s = this.getSeconds(), ms = this.getMilliseconds()) {
    this.m.minutes(m).seconds(s).milliseconds(ms);
    return this.getTime();
  }

  setSeconds(s, ms = this.getMilliseconds()) {
    this.m.seconds(s).milliseconds(ms);
    return this.getTime();
  }

  setMilliseconds(ms) {
    this.m.milliseconds(ms);
    return this.getTime();
  }

}
// CONCATENATED MODULE: ./src/index.js



/* harmony default export */ var src = __webpack_exports__["default"] = ({
  LocalDate: localDate_LocalDate,
  UTCDate: utcDate_UTCDate,
  MomentDate: MomentDate
});


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=toastui-date.js.map