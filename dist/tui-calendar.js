/*!
 * TOAST UI Calendar
 * @version 1.8.0 | Tue Nov 06 2018
 * @author NHNEnt FE Development Lab <dl_javascript@nhnent.com>
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tui-code-snippet"), require("tui-date-picker"));
	else if(typeof define === 'function' && define.amd)
		define(["tui-code-snippet", "tui-date-picker"], factory);
	else if(typeof exports === 'object')
		exports["Calendar"] = factory(require("tui-code-snippet"), require("tui-date-picker"));
	else
		root["tui"] = root["tui"] || {}, root["tui"]["Calendar"] = factory((root["tui"] && root["tui"]["util"]), (root["tui"] && root["tui"]["DatePicker"]));
})(window, function(__WEBPACK_EXTERNAL_MODULE_tui_code_snippet__, __WEBPACK_EXTERNAL_MODULE_tui_date_picker__) {
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
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/handlebars-template-loader/runtime/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/handlebars-template-loader/runtime/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! handlebars/runtime */ "./node_modules/handlebars/runtime.js");

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars.runtime.js":
/*!****************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars.runtime.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = __webpack_require__(/*! ./handlebars/base */ "./node_modules/handlebars/dist/cjs/handlebars/base.js");

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(/*! ./handlebars/safe-string */ "./node_modules/handlebars/dist/cjs/handlebars/safe-string.js");

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = __webpack_require__(/*! ./handlebars/exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = __webpack_require__(/*! ./handlebars/utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = __webpack_require__(/*! ./handlebars/runtime */ "./node_modules/handlebars/dist/cjs/handlebars/runtime.js");

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = __webpack_require__(/*! ./handlebars/no-conflict */ "./node_modules/handlebars/dist/cjs/handlebars/no-conflict.js");

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OEJBQXNCLG1CQUFtQjs7SUFBN0IsSUFBSTs7Ozs7b0NBSU8sMEJBQTBCOzs7O21DQUMzQix3QkFBd0I7Ozs7K0JBQ3ZCLG9CQUFvQjs7SUFBL0IsS0FBSzs7aUNBQ1Esc0JBQXNCOztJQUFuQyxPQUFPOztvQ0FFSSwwQkFBMEI7Ozs7O0FBR2pELFNBQVMsTUFBTSxHQUFHO0FBQ2hCLE1BQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRTFDLE9BQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLElBQUUsQ0FBQyxVQUFVLG9DQUFhLENBQUM7QUFDM0IsSUFBRSxDQUFDLFNBQVMsbUNBQVksQ0FBQztBQUN6QixJQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNqQixJQUFFLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDOztBQUU3QyxJQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztBQUNoQixJQUFFLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQzNCLFdBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDbkMsQ0FBQzs7QUFFRixTQUFPLEVBQUUsQ0FBQztDQUNYOztBQUVELElBQUksSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUVyQixrQ0FBVyxJQUFJLENBQUMsQ0FBQzs7QUFFakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQzs7cUJBRVIsSUFBSSIsImZpbGUiOiJoYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBiYXNlIGZyb20gJy4vaGFuZGxlYmFycy9iYXNlJztcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcbmltcG9ydCBTYWZlU3RyaW5nIGZyb20gJy4vaGFuZGxlYmFycy9zYWZlLXN0cmluZyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vaGFuZGxlYmFycy9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9oYW5kbGViYXJzL3V0aWxzJztcbmltcG9ydCAqIGFzIHJ1bnRpbWUgZnJvbSAnLi9oYW5kbGViYXJzL3J1bnRpbWUnO1xuXG5pbXBvcnQgbm9Db25mbGljdCBmcm9tICcuL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QnO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgbGV0IGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IFNhZmVTdHJpbmc7XG4gIGhiLkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcbiAgaGIuVXRpbHMgPSBVdGlscztcbiAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgaGIuVk0gPSBydW50aW1lO1xuICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG5sZXQgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbm5vQ29uZmxpY3QoaW5zdCk7XG5cbmluc3RbJ2RlZmF1bHQnXSA9IGluc3Q7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3Q7XG4iXX0=


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/base.js":
/*!*************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/base.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

var _exception = __webpack_require__(/*! ./exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");

var _exception2 = _interopRequireDefault(_exception);

var _helpers = __webpack_require__(/*! ./helpers */ "./node_modules/handlebars/dist/cjs/handlebars/helpers.js");

var _decorators = __webpack_require__(/*! ./decorators */ "./node_modules/handlebars/dist/cjs/handlebars/decorators.js");

var _logger = __webpack_require__(/*! ./logger */ "./node_modules/handlebars/dist/cjs/handlebars/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.11';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7cUJBQTRDLFNBQVM7O3lCQUMvQixhQUFhOzs7O3VCQUNFLFdBQVc7OzBCQUNSLGNBQWM7O3NCQUNuQyxVQUFVOzs7O0FBRXRCLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQzs7QUFDekIsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7OztBQUU1QixJQUFNLGdCQUFnQixHQUFHO0FBQzlCLEdBQUMsRUFBRSxhQUFhO0FBQ2hCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxVQUFVO0FBQ2IsR0FBQyxFQUFFLGtCQUFrQjtBQUNyQixHQUFDLEVBQUUsaUJBQWlCO0FBQ3BCLEdBQUMsRUFBRSxVQUFVO0NBQ2QsQ0FBQzs7O0FBRUYsSUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUM7O0FBRTlCLFNBQVMscUJBQXFCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7QUFDbkUsTUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQzdCLE1BQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQztBQUMvQixNQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7O0FBRW5DLGtDQUF1QixJQUFJLENBQUMsQ0FBQztBQUM3Qix3Q0FBMEIsSUFBSSxDQUFDLENBQUM7Q0FDakM7O0FBRUQscUJBQXFCLENBQUMsU0FBUyxHQUFHO0FBQ2hDLGFBQVcsRUFBRSxxQkFBcUI7O0FBRWxDLFFBQU0scUJBQVE7QUFDZCxLQUFHLEVBQUUsb0JBQU8sR0FBRzs7QUFFZixnQkFBYyxFQUFFLHdCQUFTLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDakMsUUFBSSxnQkFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO0FBQ3RDLFVBQUksRUFBRSxFQUFFO0FBQUUsY0FBTSwyQkFBYyx5Q0FBeUMsQ0FBQyxDQUFDO09BQUU7QUFDM0Usb0JBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM1QixNQUFNO0FBQ0wsVUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDekI7R0FDRjtBQUNELGtCQUFnQixFQUFFLDBCQUFTLElBQUksRUFBRTtBQUMvQixXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDM0I7O0FBRUQsaUJBQWUsRUFBRSx5QkFBUyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3ZDLFFBQUksZ0JBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxvQkFBTyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdCLE1BQU07QUFDTCxVQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRTtBQUNsQyxjQUFNLHlFQUEwRCxJQUFJLG9CQUFpQixDQUFDO09BQ3ZGO0FBQ0QsVUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7S0FDL0I7R0FDRjtBQUNELG1CQUFpQixFQUFFLDJCQUFTLElBQUksRUFBRTtBQUNoQyxXQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDNUI7O0FBRUQsbUJBQWlCLEVBQUUsMkJBQVMsSUFBSSxFQUFFLEVBQUUsRUFBRTtBQUNwQyxRQUFJLGdCQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7QUFDdEMsVUFBSSxFQUFFLEVBQUU7QUFBRSxjQUFNLDJCQUFjLDRDQUE0QyxDQUFDLENBQUM7T0FBRTtBQUM5RSxvQkFBTyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQy9CLE1BQU07QUFDTCxVQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUM1QjtHQUNGO0FBQ0QscUJBQW1CLEVBQUUsNkJBQVMsSUFBSSxFQUFFO0FBQ2xDLFdBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUM5QjtDQUNGLENBQUM7O0FBRUssSUFBSSxHQUFHLEdBQUcsb0JBQU8sR0FBRyxDQUFDOzs7UUFFcEIsV0FBVztRQUFFLE1BQU0iLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlRnJhbWUsIGV4dGVuZCwgdG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdEhlbHBlcnN9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnN9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSAnNC4wLjExJztcbmV4cG9ydCBjb25zdCBDT01QSUxFUl9SRVZJU0lPTiA9IDc7XG5cbmV4cG9ydCBjb25zdCBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz09IDEueC54JyxcbiAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICA2OiAnPj0gMi4wLjAtYmV0YS4xJyxcbiAgNzogJz49IDQuMC4wJ1xufTtcblxuY29uc3Qgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzLCBkZWNvcmF0b3JzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcbiAgdGhpcy5kZWNvcmF0b3JzID0gZGVjb3JhdG9ycyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuICByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKHRoaXMpO1xufVxuXG5IYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZ2dlci5sb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lLCBwYXJ0aWFsKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKGBBdHRlbXB0aW5nIHRvIHJlZ2lzdGVyIGEgcGFydGlhbCBjYWxsZWQgXCIke25hbWV9XCIgYXMgdW5kZWZpbmVkYCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGRlY29yYXRvcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuZGVjb3JhdG9ycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVjb3JhdG9yc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG4gIH1cbn07XG5cbmV4cG9ydCBsZXQgbG9nID0gbG9nZ2VyLmxvZztcblxuZXhwb3J0IHtjcmVhdGVGcmFtZSwgbG9nZ2VyfTtcbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/decorators.js":
/*!*******************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/decorators.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = __webpack_require__(/*! ./decorators/inline */ "./node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js");

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Z0NBQTJCLHFCQUFxQjs7OztBQUV6QyxTQUFTLHlCQUF5QixDQUFDLFFBQVEsRUFBRTtBQUNsRCxnQ0FBZSxRQUFRLENBQUMsQ0FBQztDQUMxQiIsImZpbGUiOiJkZWNvcmF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZ2lzdGVySW5saW5lIGZyb20gJy4vZGVjb3JhdG9ycy9pbmxpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyhpbnN0YW5jZSkge1xuICByZWdpc3RlcklubGluZShpbnN0YW5jZSk7XG59XG5cbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js":
/*!**************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQXFCLFVBQVU7O3FCQUVoQixVQUFTLFFBQVEsRUFBRTtBQUNoQyxVQUFRLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFVBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQzNFLFFBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ25CLFdBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFNBQUcsR0FBRyxVQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRS9CLFlBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsaUJBQVMsQ0FBQyxRQUFRLEdBQUcsY0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxRCxZQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLGlCQUFTLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUM5QixlQUFPLEdBQUcsQ0FBQztPQUNaLENBQUM7S0FDSDs7QUFFRCxTQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUU3QyxXQUFPLEdBQUcsQ0FBQztHQUNaLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVyRGVjb3JhdG9yKCdpbmxpbmUnLCBmdW5jdGlvbihmbiwgcHJvcHMsIGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIGxldCByZXQgPSBmbjtcbiAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG4gICAgICBwcm9wcy5wYXJ0aWFscyA9IHt9O1xuICAgICAgcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcGFydGlhbHMgc3RhY2sgZnJhbWUgcHJpb3IgdG8gZXhlYy5cbiAgICAgICAgbGV0IG9yaWdpbmFsID0gY29udGFpbmVyLnBhcnRpYWxzO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBleHRlbmQoe30sIG9yaWdpbmFsLCBwcm9wcy5wYXJ0aWFscyk7XG4gICAgICAgIGxldCByZXQgPSBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3JpZ2luYWw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByb3BzLnBhcnRpYWxzW29wdGlvbnMuYXJnc1swXV0gPSBvcHRpb25zLmZuO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG4iXX0=


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/exception.js":
/*!******************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/exception.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsSUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFbkcsU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUNoQyxNQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUc7TUFDdEIsSUFBSSxZQUFBO01BQ0osTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLEdBQUcsRUFBRTtBQUNQLFFBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUN0QixVQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRTFCLFdBQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7R0FDeEM7O0FBRUQsTUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7O0FBRzFELE9BQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO0FBQ2hELFFBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDOUM7OztBQUdELE1BQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQzNCLFNBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDMUM7O0FBRUQsTUFBSTtBQUNGLFFBQUksR0FBRyxFQUFFO0FBQ1AsVUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Ozs7QUFJdkIsVUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO0FBQ3pCLGNBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNwQyxlQUFLLEVBQUUsTUFBTTtBQUNiLG9CQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7T0FDSixNQUFNO0FBQ0wsWUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7T0FDdEI7S0FDRjtHQUNGLENBQUMsT0FBTyxHQUFHLEVBQUU7O0dBRWI7Q0FDRjs7QUFFRCxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7O3FCQUVuQixTQUFTIiwiZmlsZSI6ImV4Y2VwdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIGxldCBsb2MgPSBub2RlICYmIG5vZGUubG9jLFxuICAgICAgbGluZSxcbiAgICAgIGNvbHVtbjtcbiAgaWYgKGxvYykge1xuICAgIGxpbmUgPSBsb2Muc3RhcnQubGluZTtcbiAgICBjb2x1bW4gPSBsb2Muc3RhcnQuY29sdW1uO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG4gIH1cblxuICBsZXQgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGxvYykge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcblxuICAgICAgLy8gV29yayBhcm91bmQgaXNzdWUgdW5kZXIgc2FmYXJpIHdoZXJlIHdlIGNhbid0IGRpcmVjdGx5IHNldCB0aGUgY29sdW1uIHZhbHVlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbHVtbicsIHtcbiAgICAgICAgICB2YWx1ZTogY29sdW1uLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKG5vcCkge1xuICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers.js":
/*!****************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = __webpack_require__(/*! ./helpers/block-helper-missing */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js");

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = __webpack_require__(/*! ./helpers/each */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/each.js");

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = __webpack_require__(/*! ./helpers/helper-missing */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js");

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = __webpack_require__(/*! ./helpers/if */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/if.js");

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = __webpack_require__(/*! ./helpers/log */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/log.js");

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = __webpack_require__(/*! ./helpers/lookup */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js");

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = __webpack_require__(/*! ./helpers/with */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/with.js");

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7eUNBQXVDLGdDQUFnQzs7OzsyQkFDOUMsZ0JBQWdCOzs7O29DQUNQLDBCQUEwQjs7Ozt5QkFDckMsY0FBYzs7OzswQkFDYixlQUFlOzs7OzZCQUNaLGtCQUFrQjs7OzsyQkFDcEIsZ0JBQWdCOzs7O0FBRWxDLFNBQVMsc0JBQXNCLENBQUMsUUFBUSxFQUFFO0FBQy9DLHlDQUEyQixRQUFRLENBQUMsQ0FBQztBQUNyQywyQkFBYSxRQUFRLENBQUMsQ0FBQztBQUN2QixvQ0FBc0IsUUFBUSxDQUFDLENBQUM7QUFDaEMseUJBQVcsUUFBUSxDQUFDLENBQUM7QUFDckIsMEJBQVksUUFBUSxDQUFDLENBQUM7QUFDdEIsNkJBQWUsUUFBUSxDQUFDLENBQUM7QUFDekIsMkJBQWEsUUFBUSxDQUFDLENBQUM7Q0FDeEIiLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVyRWFjaCBmcm9tICcuL2hlbHBlcnMvZWFjaCc7XG5pbXBvcnQgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJJZiBmcm9tICcuL2hlbHBlcnMvaWYnO1xuaW1wb3J0IHJlZ2lzdGVyTG9nIGZyb20gJy4vaGVscGVycy9sb2cnO1xuaW1wb3J0IHJlZ2lzdGVyTG9va3VwIGZyb20gJy4vaGVscGVycy9sb29rdXAnO1xuaW1wb3J0IHJlZ2lzdGVyV2l0aCBmcm9tICcuL2hlbHBlcnMvd2l0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJFYWNoKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJJZihpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb29rdXAoaW5zdGFuY2UpO1xuICByZWdpc3RlcldpdGgoaW5zdGFuY2UpO1xufVxuIl19


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBc0QsVUFBVTs7cUJBRWpELFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3ZFLFFBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPO1FBQ3pCLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7QUFDcEIsYUFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakIsTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUMvQyxhQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QixNQUFNLElBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUMzQixVQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFlBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUNmLGlCQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCOztBQUVELGVBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ2hELE1BQU07QUFDTCxlQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN0QjtLQUNGLE1BQU07QUFDTCxVQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixZQUFJLElBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdFLGVBQU8sR0FBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztPQUN4Qjs7QUFFRCxhQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDN0I7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJibG9jay1oZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/each.js":
/*!*********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/each.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

var _exception = __webpack_require__(/*! ../exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O3FCQUErRSxVQUFVOzt5QkFDbkUsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixZQUFNLDJCQUFjLDZCQUE2QixDQUFDLENBQUM7S0FDcEQ7O0FBRUQsUUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFDZixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU87UUFDekIsQ0FBQyxHQUFHLENBQUM7UUFDTCxHQUFHLEdBQUcsRUFBRTtRQUNSLElBQUksWUFBQTtRQUNKLFdBQVcsWUFBQSxDQUFDOztBQUVoQixRQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixpQkFBVyxHQUFHLHlCQUFrQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQ2pGOztBQUVELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsVUFBSSxHQUFHLG1CQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQzs7QUFFRCxhQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtBQUN6QyxVQUFJLElBQUksRUFBRTtBQUNSLFlBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUN6QixZQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7O0FBRW5CLFlBQUksV0FBVyxFQUFFO0FBQ2YsY0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO09BQ0Y7O0FBRUQsU0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzdCLFlBQUksRUFBRSxJQUFJO0FBQ1YsbUJBQVcsRUFBRSxtQkFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDL0UsQ0FBQyxDQUFDO0tBQ0o7O0FBRUQsUUFBSSxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQzFDLFVBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNwQixhQUFLLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QyxjQUFJLENBQUMsSUFBSSxPQUFPLEVBQUU7QUFDaEIseUJBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1dBQy9DO1NBQ0Y7T0FDRixNQUFNO0FBQ0wsWUFBSSxRQUFRLFlBQUEsQ0FBQzs7QUFFYixhQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRTtBQUN2QixjQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Ozs7QUFJL0IsZ0JBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQiwyQkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDaEM7QUFDRCxvQkFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLGFBQUMsRUFBRSxDQUFDO1dBQ0w7U0FDRjtBQUNELFlBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQix1QkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RDO09BQ0Y7S0FDRjs7QUFFRCxRQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDWCxTQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JCOztBQUVELFdBQU8sR0FBRyxDQUFDO0dBQ1osQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoiZWFjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = __webpack_require__(/*! ../exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozt5QkFBc0IsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsaUNBQWdDO0FBQ3ZFLFFBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O0FBRTFCLGFBQU8sU0FBUyxDQUFDO0tBQ2xCLE1BQU07O0FBRUwsWUFBTSwyQkFBYyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDdkY7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJoZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbigvKiBbYXJncywgXW9wdGlvbnMgKi8pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHJ1Y3QuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb21lb25lIGlzIGFjdHVhbGx5IHRyeWluZyB0byBjYWxsIHNvbWV0aGluZywgYmxvdyB1cC5cbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ01pc3NpbmcgaGVscGVyOiBcIicgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH0pO1xufVxuIl19


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/if.js":
/*!*******************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/if.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBa0MsVUFBVTs7cUJBRTdCLFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUMzRCxRQUFJLGtCQUFXLFdBQVcsQ0FBQyxFQUFFO0FBQUUsaUJBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQUU7Ozs7O0FBS3RFLFFBQUksQUFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxJQUFLLGVBQVEsV0FBVyxDQUFDLEVBQUU7QUFDdkUsYUFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCLE1BQU07QUFDTCxhQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7R0FDRixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQy9ELFdBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztHQUN2SCxDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJpZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcbn1cbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/log.js":
/*!********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/log.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsa0NBQWlDO0FBQzlELFFBQUksSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5QyxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0MsVUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6Qjs7QUFFRCxRQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZCxRQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtBQUM5QixXQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO0FBQ3JELFdBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM1QjtBQUNELFFBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7O0FBRWhCLFlBQVEsQ0FBQyxHQUFHLE1BQUEsQ0FBWixRQUFRLEVBQVMsSUFBSSxDQUFDLENBQUM7R0FDeEIsQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKC8qIG1lc3NhZ2UsIG9wdGlvbnMgKi8pIHtcbiAgICBsZXQgYXJncyA9IFt1bmRlZmluZWRdLFxuICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIGxldCBsZXZlbCA9IDE7XG4gICAgaWYgKG9wdGlvbnMuaGFzaC5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuaGFzaC5sZXZlbDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmRhdGEubGV2ZWw7XG4gICAgfVxuICAgIGFyZ3NbMF0gPSBsZXZlbDtcblxuICAgIGluc3RhbmNlLmxvZyguLi4gYXJncyk7XG4gIH0pO1xufVxuIl19


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js":
/*!***********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ3JELFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUMxQixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJsb29rdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG4iXX0=


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/with.js":
/*!*********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/with.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvd2l0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUErRSxVQUFVOztxQkFFMUUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLENBQUMsZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNyQixVQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3hCLFVBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQy9CLFlBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2hGOztBQUVELGFBQU8sRUFBRSxDQUFDLE9BQU8sRUFBRTtBQUNqQixZQUFJLEVBQUUsSUFBSTtBQUNWLG1CQUFXLEVBQUUsbUJBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7T0FDaEUsQ0FBQyxDQUFDO0tBQ0osTUFBTTtBQUNMLGFBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtHQUNGLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6IndpdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/logger.js":
/*!***************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/logger.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUFzQixTQUFTOztBQUUvQixJQUFJLE1BQU0sR0FBRztBQUNYLFdBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUM3QyxPQUFLLEVBQUUsTUFBTTs7O0FBR2IsYUFBVyxFQUFFLHFCQUFTLEtBQUssRUFBRTtBQUMzQixRQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUM3QixVQUFJLFFBQVEsR0FBRyxlQUFRLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDOUQsVUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBQ2pCLGFBQUssR0FBRyxRQUFRLENBQUM7T0FDbEIsTUFBTTtBQUNMLGFBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO09BQzdCO0tBQ0Y7O0FBRUQsV0FBTyxLQUFLLENBQUM7R0FDZDs7O0FBR0QsS0FBRyxFQUFFLGFBQVMsS0FBSyxFQUFjO0FBQy9CLFNBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVsQyxRQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUU7QUFDL0UsVUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxVQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztBQUNwQixjQUFNLEdBQUcsS0FBSyxDQUFDO09BQ2hCOzt3Q0FQbUIsT0FBTztBQUFQLGVBQU87OztBQVEzQixhQUFPLENBQUMsTUFBTSxPQUFDLENBQWYsT0FBTyxFQUFZLE9BQU8sQ0FBQyxDQUFDO0tBQzdCO0dBQ0Y7Q0FDRixDQUFDOztxQkFFYSxNQUFNIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5kZXhPZn0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSxcbiAgbGV2ZWw6ICdpbmZvJyxcblxuICAvLyBNYXBzIGEgZ2l2ZW4gbGV2ZWwgdmFsdWUgdG8gdGhlIGBtZXRob2RNYXBgIGluZGV4ZXMgYWJvdmUuXG4gIGxvb2t1cExldmVsOiBmdW5jdGlvbihsZXZlbCkge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbGV2ZWxNYXAgPSBpbmRleE9mKGxvZ2dlci5tZXRob2RNYXAsIGxldmVsLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKGxldmVsTWFwID49IDApIHtcbiAgICAgICAgbGV2ZWwgPSBsZXZlbE1hcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldmVsID0gcGFyc2VJbnQobGV2ZWwsIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH0sXG5cbiAgLy8gQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgLi4ubWVzc2FnZSkge1xuICAgIGxldmVsID0gbG9nZ2VyLmxvb2t1cExldmVsKGxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxvb2t1cExldmVsKGxvZ2dlci5sZXZlbCkgPD0gbGV2ZWwpIHtcbiAgICAgIGxldCBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgIGlmICghY29uc29sZVttZXRob2RdKSB7ICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIG1ldGhvZCA9ICdsb2cnO1xuICAgICAgfVxuICAgICAgY29uc29sZVttZXRob2RdKC4uLm1lc3NhZ2UpOyAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/no-conflict.js":
/*!********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/no-conflict.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* global window */


exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUNlLFVBQVMsVUFBVSxFQUFFOztBQUVsQyxNQUFJLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLE1BQU07TUFDdEQsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRWxDLFlBQVUsQ0FBQyxVQUFVLEdBQUcsWUFBVztBQUNqQyxRQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO0FBQ2xDLFVBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0tBQy9CO0FBQ0QsV0FBTyxVQUFVLENBQUM7R0FDbkIsQ0FBQztDQUNIIiwiZmlsZSI6Im5vLWNvbmZsaWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oSGFuZGxlYmFycykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBsZXQgcm9vdCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93LFxuICAgICAgJEhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnM7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEhhbmRsZWJhcnMubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LkhhbmRsZWJhcnMgPT09IEhhbmRsZWJhcnMpIHtcbiAgICAgIHJvb3QuSGFuZGxlYmFycyA9ICRIYW5kbGViYXJzO1xuICAgIH1cbiAgICByZXR1cm4gSGFuZGxlYmFycztcbiAgfTtcbn1cbiJdfQ==

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/runtime.js":
/*!****************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/runtime.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

var Utils = _interopRequireWildcard(_utils);

var _exception = __webpack_require__(/*! ./exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");

var _exception2 = _interopRequireDefault(_exception);

var _base = __webpack_require__(/*! ./base */ "./node_modules/handlebars/dist/cjs/handlebars/base.js");

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQXVCLFNBQVM7O0lBQXBCLEtBQUs7O3lCQUNLLGFBQWE7Ozs7b0JBQzhCLFFBQVE7O0FBRWxFLFNBQVMsYUFBYSxDQUFDLFlBQVksRUFBRTtBQUMxQyxNQUFNLGdCQUFnQixHQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztNQUN2RCxlQUFlLDBCQUFvQixDQUFDOztBQUUxQyxNQUFJLGdCQUFnQixLQUFLLGVBQWUsRUFBRTtBQUN4QyxRQUFJLGdCQUFnQixHQUFHLGVBQWUsRUFBRTtBQUN0QyxVQUFNLGVBQWUsR0FBRyx1QkFBaUIsZUFBZSxDQUFDO1VBQ25ELGdCQUFnQixHQUFHLHVCQUFpQixnQkFBZ0IsQ0FBQyxDQUFDO0FBQzVELFlBQU0sMkJBQWMseUZBQXlGLEdBQ3ZHLHFEQUFxRCxHQUFHLGVBQWUsR0FBRyxtREFBbUQsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNoSyxNQUFNOztBQUVMLFlBQU0sMkJBQWMsd0ZBQXdGLEdBQ3RHLGlEQUFpRCxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNuRjtHQUNGO0NBQ0Y7O0FBRU0sU0FBUyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTs7QUFFMUMsTUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNSLFVBQU0sMkJBQWMsbUNBQW1DLENBQUMsQ0FBQztHQUMxRDtBQUNELE1BQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO0FBQ3ZDLFVBQU0sMkJBQWMsMkJBQTJCLEdBQUcsT0FBTyxZQUFZLENBQUMsQ0FBQztHQUN4RTs7QUFFRCxjQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDOzs7O0FBSWxELEtBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFNUMsV0FBUyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUN2RCxRQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsYUFBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEQsVUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2YsZUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7T0FDdkI7S0FDRjs7QUFFRCxXQUFPLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RFLFFBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFeEUsUUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7QUFDakMsYUFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN6RixZQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzNEO0FBQ0QsUUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ2xCLFVBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUNsQixZQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDNUMsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM1QixrQkFBTTtXQUNQOztBQUVELGVBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QztBQUNELGNBQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQzNCO0FBQ0QsYUFBTyxNQUFNLENBQUM7S0FDZixNQUFNO0FBQ0wsWUFBTSwyQkFBYyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRywwREFBMEQsQ0FBQyxDQUFDO0tBQ2pIO0dBQ0Y7OztBQUdELE1BQUksU0FBUyxHQUFHO0FBQ2QsVUFBTSxFQUFFLGdCQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDMUIsVUFBSSxFQUFFLElBQUksSUFBSSxHQUFHLENBQUEsQUFBQyxFQUFFO0FBQ2xCLGNBQU0sMkJBQWMsR0FBRyxHQUFHLElBQUksR0FBRyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsQ0FBQztPQUM3RDtBQUNELGFBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xCO0FBQ0QsVUFBTSxFQUFFLGdCQUFTLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDN0IsVUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUMxQixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVCLFlBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDeEMsaUJBQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO09BQ0Y7S0FDRjtBQUNELFVBQU0sRUFBRSxnQkFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ2pDLGFBQU8sT0FBTyxPQUFPLEtBQUssVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO0tBQ3hFOztBQUVELG9CQUFnQixFQUFFLEtBQUssQ0FBQyxnQkFBZ0I7QUFDeEMsaUJBQWEsRUFBRSxvQkFBb0I7O0FBRW5DLE1BQUUsRUFBRSxZQUFTLENBQUMsRUFBRTtBQUNkLFVBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixTQUFHLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDdkMsYUFBTyxHQUFHLENBQUM7S0FDWjs7QUFFRCxZQUFRLEVBQUUsRUFBRTtBQUNaLFdBQU8sRUFBRSxpQkFBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUU7QUFDbkUsVUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7VUFDakMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsVUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLFdBQVcsSUFBSSxtQkFBbUIsRUFBRTtBQUN4RCxzQkFBYyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO09BQzNGLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRTtBQUMxQixzQkFBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7T0FDOUQ7QUFDRCxhQUFPLGNBQWMsQ0FBQztLQUN2Qjs7QUFFRCxRQUFJLEVBQUUsY0FBUyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQzNCLGFBQU8sS0FBSyxJQUFJLEtBQUssRUFBRSxFQUFFO0FBQ3ZCLGFBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO09BQ3ZCO0FBQ0QsYUFBTyxLQUFLLENBQUM7S0FDZDtBQUNELFNBQUssRUFBRSxlQUFTLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDN0IsVUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQzs7QUFFMUIsVUFBSSxLQUFLLElBQUksTUFBTSxJQUFLLEtBQUssS0FBSyxNQUFNLEFBQUMsRUFBRTtBQUN6QyxXQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQ3ZDOztBQUVELGFBQU8sR0FBRyxDQUFDO0tBQ1o7O0FBRUQsZUFBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOztBQUU1QixRQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJO0FBQ2pCLGdCQUFZLEVBQUUsWUFBWSxDQUFDLFFBQVE7R0FDcEMsQ0FBQzs7QUFFRixXQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQWdCO1FBQWQsT0FBTyx5REFBRyxFQUFFOztBQUNoQyxRQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUV4QixPQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BCLFFBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLEVBQUU7QUFDNUMsVUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDaEM7QUFDRCxRQUFJLE1BQU0sWUFBQTtRQUNOLFdBQVcsR0FBRyxZQUFZLENBQUMsY0FBYyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7QUFDL0QsUUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFO0FBQzFCLFVBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUNsQixjQUFNLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7T0FDM0YsTUFBTTtBQUNMLGNBQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQ3BCO0tBQ0Y7O0FBRUQsYUFBUyxJQUFJLENBQUMsT0FBTyxnQkFBZTtBQUNsQyxhQUFPLEVBQUUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDckg7QUFDRCxRQUFJLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN0RyxXQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDL0I7QUFDRCxLQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFFakIsS0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFTLE9BQU8sRUFBRTtBQUM3QixRQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUNwQixlQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRWxFLFVBQUksWUFBWSxDQUFDLFVBQVUsRUFBRTtBQUMzQixpQkFBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO09BQ3RFO0FBQ0QsVUFBSSxZQUFZLENBQUMsVUFBVSxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUU7QUFDekQsaUJBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztPQUM1RTtLQUNGLE1BQU07QUFDTCxlQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDcEMsZUFBUyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ3RDLGVBQVMsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztLQUMzQztHQUNGLENBQUM7O0FBRUYsS0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRTtBQUNsRCxRQUFJLFlBQVksQ0FBQyxjQUFjLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDL0MsWUFBTSwyQkFBYyx3QkFBd0IsQ0FBQyxDQUFDO0tBQy9DO0FBQ0QsUUFBSSxZQUFZLENBQUMsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ3JDLFlBQU0sMkJBQWMseUJBQXlCLENBQUMsQ0FBQztLQUNoRDs7QUFFRCxXQUFPLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztHQUNqRixDQUFDO0FBQ0YsU0FBTyxHQUFHLENBQUM7Q0FDWjs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRTtBQUM1RixXQUFTLElBQUksQ0FBQyxPQUFPLEVBQWdCO1FBQWQsT0FBTyx5REFBRyxFQUFFOztBQUNqQyxRQUFJLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDM0IsUUFBSSxNQUFNLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sS0FBSyxTQUFTLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUEsQUFBQyxFQUFFO0FBQ2hHLG1CQUFhLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUM7O0FBRUQsV0FBTyxFQUFFLENBQUMsU0FBUyxFQUNmLE9BQU8sRUFDUCxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQ3JDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUNwQixXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUN4RCxhQUFhLENBQUMsQ0FBQztHQUNwQjs7QUFFRCxNQUFJLEdBQUcsaUJBQWlCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzs7QUFFekUsTUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDakIsTUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDeEMsTUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsSUFBSSxDQUFDLENBQUM7QUFDNUMsU0FBTyxJQUFJLENBQUM7Q0FDYjs7QUFFTSxTQUFTLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUN4RCxNQUFJLENBQUMsT0FBTyxFQUFFO0FBQ1osUUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGdCQUFnQixFQUFFO0FBQ3JDLGFBQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ3pDLE1BQU07QUFDTCxhQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUM7R0FDRixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTs7QUFFekMsV0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7QUFDdkIsV0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDckM7QUFDRCxTQUFPLE9BQU8sQ0FBQztDQUNoQjs7QUFFTSxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTs7QUFFdkQsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDMUUsU0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDdkIsTUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2YsV0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztHQUN2RTs7QUFFRCxNQUFJLFlBQVksWUFBQSxDQUFDO0FBQ2pCLE1BQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRTs7QUFDckMsYUFBTyxDQUFDLElBQUksR0FBRyxrQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXpDLFVBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDcEIsa0JBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsbUJBQW1CLENBQUMsT0FBTyxFQUFnQjtZQUFkLE9BQU8seURBQUcsRUFBRTs7OztBQUkvRixlQUFPLENBQUMsSUFBSSxHQUFHLGtCQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxlQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLG1CQUFtQixDQUFDO0FBQ3BELGVBQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztPQUM3QixDQUFDO0FBQ0YsVUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ2YsZUFBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztPQUNwRTs7R0FDRjs7QUFFRCxNQUFJLE9BQU8sS0FBSyxTQUFTLElBQUksWUFBWSxFQUFFO0FBQ3pDLFdBQU8sR0FBRyxZQUFZLENBQUM7R0FDeEI7O0FBRUQsTUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO0FBQ3pCLFVBQU0sMkJBQWMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUMsQ0FBQztHQUM1RSxNQUFNLElBQUksT0FBTyxZQUFZLFFBQVEsRUFBRTtBQUN0QyxXQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDbEM7Q0FDRjs7QUFFTSxTQUFTLElBQUksR0FBRztBQUFFLFNBQU8sRUFBRSxDQUFDO0NBQUU7O0FBRXJDLFNBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDL0IsTUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLE1BQU0sSUFBSSxJQUFJLENBQUEsQUFBQyxFQUFFO0FBQzlCLFFBQUksR0FBRyxJQUFJLEdBQUcsa0JBQVksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3JDLFFBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO0dBQ3JCO0FBQ0QsU0FBTyxJQUFJLENBQUM7Q0FDYjs7QUFFRCxTQUFTLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO0FBQ3pFLE1BQUksRUFBRSxDQUFDLFNBQVMsRUFBRTtBQUNoQixRQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixRQUFJLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUYsU0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDM0I7QUFDRCxTQUFPLElBQUksQ0FBQztDQUNiIiwiZmlsZSI6InJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgQ09NUElMRVJfUkVWSVNJT04sIFJFVklTSU9OX0NIQU5HRVMsIGNyZWF0ZUZyYW1lIH0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gIGNvbnN0IGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICAgIGN1cnJlbnRSZXZpc2lvbiA9IENPTVBJTEVSX1JFVklTSU9OO1xuXG4gIGlmIChjb21waWxlclJldmlzaW9uICE9PSBjdXJyZW50UmV2aXNpb24pIHtcbiAgICBpZiAoY29tcGlsZXJSZXZpc2lvbiA8IGN1cnJlbnRSZXZpc2lvbikge1xuICAgICAgY29uc3QgcnVudGltZVZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhbiBvbGRlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgcnVudGltZVZlcnNpb25zICsgJykgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uICgnICsgY29tcGlsZXJWZXJzaW9ucyArICcpLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgY29tcGlsZXJJbmZvWzFdICsgJykuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMsIGVudikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoIWVudikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ05vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZScpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1Vua25vd24gdGVtcGxhdGUgb2JqZWN0OiAnICsgdHlwZW9mIHRlbXBsYXRlU3BlYyk7XG4gIH1cblxuICB0ZW1wbGF0ZVNwZWMubWFpbi5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWMubWFpbl9kO1xuXG4gIC8vIE5vdGU6IFVzaW5nIGVudi5WTSByZWZlcmVuY2VzIHJhdGhlciB0aGFuIGxvY2FsIHZhciByZWZlcmVuY2VzIHRocm91Z2hvdXQgdGhpcyBzZWN0aW9uIHRvIGFsbG93XG4gIC8vIGZvciBleHRlcm5hbCB1c2VycyB0byBvdmVycmlkZSB0aGVzZSBhcyBwc3VlZG8tc3VwcG9ydGVkIEFQSXMuXG4gIGVudi5WTS5jaGVja1JldmlzaW9uKHRlbXBsYXRlU3BlYy5jb21waWxlcik7XG5cbiAgZnVuY3Rpb24gaW52b2tlUGFydGlhbFdyYXBwZXIocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAgIGNvbnRleHQgPSBVdGlscy5leHRlbmQoe30sIGNvbnRleHQsIG9wdGlvbnMuaGFzaCk7XG4gICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgb3B0aW9ucy5pZHNbMF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhcnRpYWwgPSBlbnYuVk0ucmVzb2x2ZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcbiAgICBsZXQgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcblxuICAgIGlmIChyZXN1bHQgPT0gbnVsbCAmJiBlbnYuY29tcGlsZSkge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdID0gZW52LmNvbXBpbGUocGFydGlhbCwgdGVtcGxhdGVTcGVjLmNvbXBpbGVyT3B0aW9ucywgZW52KTtcbiAgICAgIHJlc3VsdCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXShjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBpZiAob3B0aW9ucy5pbmRlbnQpIHtcbiAgICAgICAgbGV0IGxpbmVzID0gcmVzdWx0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpZiAoIWxpbmVzW2ldICYmIGkgKyAxID09PSBsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaW5lc1tpXSA9IG9wdGlvbnMuaW5kZW50ICsgbGluZXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgbGV0IGNvbnRhaW5lciA9IHtcbiAgICBzdHJpY3Q6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgaWYgKCEobmFtZSBpbiBvYmopKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1wiJyArIG5hbWUgKyAnXCIgbm90IGRlZmluZWQgaW4gJyArIG9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgIH0sXG4gICAgbG9va3VwOiBmdW5jdGlvbihkZXB0aHMsIG5hbWUpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY3VycmVudCA9PT0gJ2Z1bmN0aW9uJyA/IGN1cnJlbnQuY2FsbChjb250ZXh0KSA6IGN1cnJlbnQ7XG4gICAgfSxcblxuICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG5cbiAgICBmbjogZnVuY3Rpb24oaSkge1xuICAgICAgbGV0IHJldCA9IHRlbXBsYXRlU3BlY1tpXTtcbiAgICAgIHJldC5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWNbaSArICdfZCddO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgcHJvZ3JhbXM6IFtdLFxuICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICAgIGxldCBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0sXG4gICAgICAgICAgZm4gPSB0aGlzLmZuKGkpO1xuICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzIHx8IGJsb2NrUGFyYW1zIHx8IGRlY2xhcmVkQmxvY2tQYXJhbXMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uKHZhbHVlLCBkZXB0aCkge1xuICAgICAgd2hpbGUgKHZhbHVlICYmIGRlcHRoLS0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5fcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgIGxldCBvYmogPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgKHBhcmFtICE9PSBjb21tb24pKSB7XG4gICAgICAgIG9iaiA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICAvLyBBbiBlbXB0eSBvYmplY3QgdG8gdXNlIGFzIHJlcGxhY2VtZW50IGZvciBudWxsLWNvbnRleHRzXG4gICAgbnVsbENvbnRleHQ6IE9iamVjdC5zZWFsKHt9KSxcblxuICAgIG5vb3A6IGVudi5WTS5ub29wLFxuICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG4gIH07XG5cbiAgZnVuY3Rpb24gcmV0KGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuXG4gICAgcmV0Ll9zZXR1cChvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCAmJiB0ZW1wbGF0ZVNwZWMudXNlRGF0YSkge1xuICAgICAgZGF0YSA9IGluaXREYXRhKGNvbnRleHQsIGRhdGEpO1xuICAgIH1cbiAgICBsZXQgZGVwdGhzLFxuICAgICAgICBibG9ja1BhcmFtcyA9IHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyA/IFtdIDogdW5kZWZpbmVkO1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzKSB7XG4gICAgICBpZiAob3B0aW9ucy5kZXB0aHMpIHtcbiAgICAgICAgZGVwdGhzID0gY29udGV4dCAhPSBvcHRpb25zLmRlcHRoc1swXSA/IFtjb250ZXh0XS5jb25jYXQob3B0aW9ucy5kZXB0aHMpIDogb3B0aW9ucy5kZXB0aHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXB0aHMgPSBbY29udGV4dF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpbihjb250ZXh0LyosIG9wdGlvbnMqLykge1xuICAgICAgcmV0dXJuICcnICsgdGVtcGxhdGVTcGVjLm1haW4oY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICB9XG4gICAgbWFpbiA9IGV4ZWN1dGVEZWNvcmF0b3JzKHRlbXBsYXRlU3BlYy5tYWluLCBtYWluLCBjb250YWluZXIsIG9wdGlvbnMuZGVwdGhzIHx8IFtdLCBkYXRhLCBibG9ja1BhcmFtcyk7XG4gICAgcmV0dXJuIG1haW4oY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0LmlzVG9wID0gdHJ1ZTtcblxuICByZXQuX3NldHVwID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsKSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmhlbHBlcnMsIGVudi5oZWxwZXJzKTtcblxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsKSB7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLnBhcnRpYWxzLCBlbnYucGFydGlhbHMpO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsIHx8IHRlbXBsYXRlU3BlYy51c2VEZWNvcmF0b3JzKSB7XG4gICAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuZGVjb3JhdG9ycywgZW52LmRlY29yYXRvcnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IG9wdGlvbnMuaGVscGVycztcbiAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9wdGlvbnMucGFydGlhbHM7XG4gICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IG9wdGlvbnMuZGVjb3JhdG9ycztcbiAgICB9XG4gIH07XG5cbiAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uKGksIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zICYmICFibG9ja1BhcmFtcykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIGJsb2NrIHBhcmFtcycpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocyAmJiAhZGVwdGhzKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgcGFyZW50IGRlcHRocycpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIHRlbXBsYXRlU3BlY1tpXSwgZGF0YSwgMCwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gIH07XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gIGZ1bmN0aW9uIHByb2coY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGN1cnJlbnREZXB0aHMgPSBkZXB0aHM7XG4gICAgaWYgKGRlcHRocyAmJiBjb250ZXh0ICE9IGRlcHRoc1swXSAmJiAhKGNvbnRleHQgPT09IGNvbnRhaW5lci5udWxsQ29udGV4dCAmJiBkZXB0aHNbMF0gPT09IG51bGwpKSB7XG4gICAgICBjdXJyZW50RGVwdGhzID0gW2NvbnRleHRdLmNvbmNhdChkZXB0aHMpO1xuICAgIH1cblxuICAgIHJldHVybiBmbihjb250YWluZXIsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsXG4gICAgICAgIG9wdGlvbnMuZGF0YSB8fCBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtcyAmJiBbb3B0aW9ucy5ibG9ja1BhcmFtc10uY29uY2F0KGJsb2NrUGFyYW1zKSxcbiAgICAgICAgY3VycmVudERlcHRocyk7XG4gIH1cblxuICBwcm9nID0gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcyk7XG5cbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IGRlcHRocyA/IGRlcHRocy5sZW5ndGggOiAwO1xuICBwcm9nLmJsb2NrUGFyYW1zID0gZGVjbGFyZWRCbG9ja1BhcmFtcyB8fCAwO1xuICByZXR1cm4gcHJvZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgaWYgKCFwYXJ0aWFsKSB7XG4gICAgaWYgKG9wdGlvbnMubmFtZSA9PT0gJ0BwYXJ0aWFsLWJsb2NrJykge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdO1xuICAgIH1cbiAgfSBlbHNlIGlmICghcGFydGlhbC5jYWxsICYmICFvcHRpb25zLm5hbWUpIHtcbiAgICAvLyBUaGlzIGlzIGEgZHluYW1pYyBwYXJ0aWFsIHRoYXQgcmV0dXJuZWQgYSBzdHJpbmdcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJ0aWFsO1xuICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW3BhcnRpYWxdO1xuICB9XG4gIHJldHVybiBwYXJ0aWFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIC8vIFVzZSB0aGUgY3VycmVudCBjbG9zdXJlIGNvbnRleHQgdG8gc2F2ZSB0aGUgcGFydGlhbC1ibG9jayBpZiB0aGlzIHBhcnRpYWxcbiAgY29uc3QgY3VycmVudFBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgb3B0aW9ucy5wYXJ0aWFsID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoID0gb3B0aW9ucy5pZHNbMF0gfHwgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoO1xuICB9XG5cbiAgbGV0IHBhcnRpYWxCbG9jaztcbiAgaWYgKG9wdGlvbnMuZm4gJiYgb3B0aW9ucy5mbiAhPT0gbm9vcCkge1xuICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgLy8gV3JhcHBlciBmdW5jdGlvbiB0byBnZXQgYWNjZXNzIHRvIGN1cnJlbnRQYXJ0aWFsQmxvY2sgZnJvbSB0aGUgY2xvc3VyZVxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG4gICAgcGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBmdW5jdGlvbiBwYXJ0aWFsQmxvY2tXcmFwcGVyKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAvLyBSZXN0b3JlIHRoZSBwYXJ0aWFsLWJsb2NrIGZyb20gdGhlIGNsb3N1cmUgZm9yIHRoZSBleGVjdXRpb24gb2YgdGhlIGJsb2NrXG4gICAgICAvLyBpLmUuIHRoZSBwYXJ0IGluc2lkZSB0aGUgYmxvY2sgb2YgdGhlIHBhcnRpYWwgY2FsbC5cbiAgICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGN1cnJlbnRQYXJ0aWFsQmxvY2s7XG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBpZiAoZm4ucGFydGlhbHMpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHMgPSBVdGlscy5leHRlbmQoe30sIG9wdGlvbnMucGFydGlhbHMsIGZuLnBhcnRpYWxzKTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkICYmIHBhcnRpYWxCbG9jaykge1xuICAgIHBhcnRpYWwgPSBwYXJ0aWFsQmxvY2s7XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gIH0gZWxzZSBpZiAocGFydGlhbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHBhcnRpYWwoY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7IHJldHVybiAnJzsgfVxuXG5mdW5jdGlvbiBpbml0RGF0YShjb250ZXh0LCBkYXRhKSB7XG4gIGlmICghZGF0YSB8fCAhKCdyb290JyBpbiBkYXRhKSkge1xuICAgIGRhdGEgPSBkYXRhID8gY3JlYXRlRnJhbWUoZGF0YSkgOiB7fTtcbiAgICBkYXRhLnJvb3QgPSBjb250ZXh0O1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKSB7XG4gIGlmIChmbi5kZWNvcmF0b3IpIHtcbiAgICBsZXQgcHJvcHMgPSB7fTtcbiAgICBwcm9nID0gZm4uZGVjb3JhdG9yKHByb2csIHByb3BzLCBjb250YWluZXIsIGRlcHRocyAmJiBkZXB0aHNbMF0sIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIFV0aWxzLmV4dGVuZChwcm9nLCBwcm9wcyk7XG4gIH1cbiAgcmV0dXJuIHByb2c7XG59XG4iXX0=


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/safe-string.js":
/*!********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/safe-string.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Build out our basic SafeString type


exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDMUIsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Q0FDdEI7O0FBRUQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUN2RSxTQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQ3pCLENBQUM7O3FCQUVhLFVBQVUiLCJmaWxlIjoic2FmZS1zdHJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2FmZVN0cmluZztcbiJdfQ==


/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/utils.js":
/*!**************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/utils.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLE1BQU0sR0FBRztBQUNiLEtBQUcsRUFBRSxPQUFPO0FBQ1osS0FBRyxFQUFFLE1BQU07QUFDWCxLQUFHLEVBQUUsTUFBTTtBQUNYLEtBQUcsRUFBRSxRQUFRO0FBQ2IsS0FBRyxFQUFFLFFBQVE7QUFDYixLQUFHLEVBQUUsUUFBUTtBQUNiLEtBQUcsRUFBRSxRQUFRO0NBQ2QsQ0FBQzs7QUFFRixJQUFNLFFBQVEsR0FBRyxZQUFZO0lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUM7O0FBRTdCLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN2QixTQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwQjs7QUFFTSxTQUFTLE1BQU0sQ0FBQyxHQUFHLG9CQUFtQjtBQUMzQyxPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6QyxTQUFLLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM1QixVQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDM0QsV0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUM5QjtLQUNGO0dBQ0Y7O0FBRUQsU0FBTyxHQUFHLENBQUM7Q0FDWjs7QUFFTSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzs7Ozs7O0FBS2hELElBQUksVUFBVSxHQUFHLG9CQUFTLEtBQUssRUFBRTtBQUMvQixTQUFPLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQztDQUNwQyxDQUFDOzs7QUFHRixJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNuQixVQUlNLFVBQVUsR0FKaEIsVUFBVSxHQUFHLFVBQVMsS0FBSyxFQUFFO0FBQzNCLFdBQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssbUJBQW1CLENBQUM7R0FDcEYsQ0FBQztDQUNIO1FBQ08sVUFBVSxHQUFWLFVBQVU7Ozs7O0FBSVgsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxVQUFTLEtBQUssRUFBRTtBQUN0RCxTQUFPLEFBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixHQUFHLEtBQUssQ0FBQztDQUNqRyxDQUFDOzs7OztBQUdLLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDcEMsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRCxRQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDdEIsYUFBTyxDQUFDLENBQUM7S0FDVjtHQUNGO0FBQ0QsU0FBTyxDQUFDLENBQUMsQ0FBQztDQUNYOztBQUdNLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0FBQ3ZDLE1BQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFOztBQUU5QixRQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQzNCLGFBQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3hCLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ3pCLGFBQU8sRUFBRSxDQUFDO0tBQ1gsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2xCLGFBQU8sTUFBTSxHQUFHLEVBQUUsQ0FBQztLQUNwQjs7Ozs7QUFLRCxVQUFNLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQztHQUN0Qjs7QUFFRCxNQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUFFLFdBQU8sTUFBTSxDQUFDO0dBQUU7QUFDOUMsU0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUM3Qzs7QUFFTSxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDN0IsTUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQ3pCLFdBQU8sSUFBSSxDQUFDO0dBQ2IsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUMvQyxXQUFPLElBQUksQ0FBQztHQUNiLE1BQU07QUFDTCxXQUFPLEtBQUssQ0FBQztHQUNkO0NBQ0Y7O0FBRU0sU0FBUyxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQ2xDLE1BQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDL0IsT0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDdkIsU0FBTyxLQUFLLENBQUM7Q0FDZDs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLFNBQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRU0sU0FBUyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFO0FBQ2pELFNBQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBSSxFQUFFLENBQUM7Q0FDcEQiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuIl19


/***/ }),

/***/ "./node_modules/handlebars/runtime.js":
/*!********************************************!*\
  !*** ./node_modules/handlebars/runtime.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(/*! ./dist/cjs/handlebars.runtime */ "./node_modules/handlebars/dist/cjs/handlebars.runtime.js")['default'];


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/css/main.styl":
/*!***************************!*\
  !*** ./src/css/main.styl ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview The entry file of fullcalendar
 * @author NHN Ent. FE Development Team
 */



var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var Calendar = __webpack_require__(/*! ./js/factory/calendar */ "./src/js/factory/calendar.js");

__webpack_require__(/*! ./css/main.styl */ "./src/css/main.styl");
__webpack_require__(/*! ./js/view/template/helper */ "./src/js/view/template/helper.js");

if (util.sendHostname) {
    util.sendHostname('calendar');
}

// for jquery
if (global.jQuery) {
    global.jQuery.fn.tuiCalendar = function() {
        var options, instance;

        var el = this.get(0);
        var args = Array.prototype.slice.apply(arguments);

        if (el) {
            options = util.pick(args, 0) || {};

            instance = global.jQuery.data(el, 'tuiCalendar');

            if (instance) {
                if (typeof options === 'string' && instance[options]) {
                    return instance[options].apply(instance, args.slice(1));
                }
            } else {
                instance = new Calendar(el, options);
                global.jQuery.data(el, 'tuiCalendar', instance);
            }
        }

        return this;
    };
}

module.exports = Calendar;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/common/array.js":
/*!********************************!*\
  !*** ./src/js/common/array.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility module for array sort, binary search.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var datetime = __webpack_require__(/*! ../common/datetime */ "./src/js/common/datetime.js");

/**
 * A module for sorting array.
 * @module array
 */

/**********
 * Search
 **********/

/**
 * search item index using binary search algorithm.
 *
 * the array must be sorted.
 * @param {array} arr array to search.
 * @param {(string|number|boolean)} search value to search.
 * @param {function} [fn] iteratee for retrieve each element's value to search.
 * @param {function} [compare] compare function for specific sort status. default is string ascending.
 * @returns {number} The number of item index searched. return negative number when no exist that item.
 * It can use insert index after Math.abs()
 * @example
 *
 * var arr = [1, 3, 7, 11, 15, 23];
 *
 * function sortNumber(a, b) {
 *     return a - b;
 * }
 *
 * bsearch(arr, 15, null, sortNumber);    // 4
 * bsearch(arr, 21, null, sortNumber);    // -5
 *
 * arr.splice(Math.abs(bsearch(arr, 21, null, sortNumber)), 0, 21);
 * // [1, 2, 7, 11, 15, 21, 23]
 */
function bsearch(arr, search, fn, compare) {
    var minIndex = 0,
        maxIndex = arr.length - 1,
        currentIndex,
        value,
        comp;

    compare = compare || stringASC;

    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0; // Math.floor
        value = fn ? fn(arr[currentIndex]) : arr[currentIndex];
        comp = compare(value, search);

        if (comp < 0) {
            minIndex = currentIndex + 1;
        } else if (comp > 0) {
            maxIndex = currentIndex - 1;
        } else {
            return currentIndex;
        }
    }

    return ~maxIndex;
}

/**********
 * Compare Functions
 **********/

/**
 * compare function for array sort.
 *
 * sort array by ascending.
 * @param {boolean} a The boolean to compare
 * @param {boolean} b The boolean to compare.
 * @returns {number} Result of comparison.
 */
function booleanASC(a, b) {
    if (a !== b) {
        return a ? -1 : 1;
    }

    return 0;
}

/**
 * compare function for array sort.
 *
 * sort array by descending.
 * @param {boolean} a The boolean to compare
 * @param {boolean} b The boolean to compare.
 * @returns {number} Result of comparison.
 */
function booleanDESC(a, b) {
    if (a !== b) {
        return a ? 1 : -1;
    }

    return 0;
}

/**
 * compare function for array sort.
 *
 * sort array by number ascending.
 * @param {number} _a The number to compare.
 * @param {number} _b The number to compare.
 * @returns {number} Result of comparison.
 */
function numberASC(_a, _b) {
    var a = Number(_a),
        b = Number(_b);

    return a - b;
}

/**
 * compare function for array sort.
 *
 * sort array by number descending.
 * @param {number} _a The number to compare.
 * @param {number} _b The number to compare.
 * @returns {number} Result of comparison.
 */
function numberDESC(_a, _b) {
    var a = Number(_a),
        b = Number(_b);

    return b - a;
}

/**
 * compare function for array sort.
 *
 * sort array by string ascending
 * @param {string} _a The string to compare.
 * @param {string} _b The string to compare.
 * @returns {number} Result of comparison.
 */
function stringASC(_a, _b) {
    var a = String(_a),
        b = String(_b);

    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }

    return 0;
}

/**
 * compare function for array sort.
 *
 * sort array by string descending
 * @param {string} _a The string to compare.
 * @param {string} _b The string to compare.
 * @returns {number} Result of comparison.
 */
function stringDESC(_a, _b) {
    var a = String(_a),
        b = String(_b);

    if (a > b) {
        return -1;
    }
    if (a < b) {
        return 1;
    }

    return 0;
}

/**
 * compare function for array sort.
 *
 * sort array by string ascending with ignore case.
 * @param {string} _a The string to compare.
 * @param {string} _b The string to compare.
 * @returns {number} Result of comparison.
 */
function stringASCIgnoreCase(_a, _b) {
    var a = String(_a).toLowerCase(),
        b = String(_b).toLowerCase();

    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }

    return 0;
}

/**
 * compare function for array sort.
 *
 * sort array by string descending with ignore case.
 * @param {string} _a The string to compare.
 * @param {string} _b The string to compare.
 * @returns {number} Result of comparison.
 */
function stringDESCIgnoreCase(_a, _b) {
    var a = String(_a).toLowerCase(),
        b = String(_b).toLowerCase();

    if (a > b) {
        return -1;
    }
    if (a < b) {
        return 1;
    }

    return 0;
}

/**
 * Compare schedule models for sort.
 *
 * 1. all day schedule first.
 * 2. early start.
 * 3. longest duration.
 * 4. early created.
 * @param {Schedule|ScheduleViewModel} a The object schedule instance.
 * @param {Schedule|ScheduleViewModel} b The object schedule instance.
 * @returns {number} Result of comparison.
 */
function scheduleASC(a, b) {
    var durationA, durationB;
    var allDayCompare, startsCompare;
    var modelA = a.valueOf();
    var modelB = b.valueOf();

    allDayCompare = booleanASC(modelA.isAllDay || a.hasMultiDates, modelB.isAllDay || b.hasMultiDates);

    if (allDayCompare) {
        return allDayCompare;
    }

    startsCompare = datetime.compare(a.getStarts(), b.getStarts());

    if (startsCompare) {
        return startsCompare;
    }

    durationA = a.duration().getTime();
    durationB = b.duration().getTime();

    if (durationA < durationB) {
        return 1;
    }
    if (durationA > durationB) {
        return -1;
    }

    return util.stamp(modelA) - util.stamp(modelB);
}

module.exports = {
    bsearch: bsearch,
    compare: {
        schedule: {
            asc: scheduleASC
        },
        bool: {
            asc: booleanASC,
            desc: booleanDESC
        },
        num: {
            asc: numberASC,
            desc: numberDESC
        },
        str: {
            asc: stringASC,
            desc: stringDESC,
            ascIgnoreCase: stringASCIgnoreCase,
            descIgnoreCase: stringDESCIgnoreCase
        }
    }
};



/***/ }),

/***/ "./src/js/common/autoScroll.js":
/*!*************************************!*\
  !*** ./src/js/common/autoScroll.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview Add autoscroll feature to elements that prevented text selection.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var domevent = __webpack_require__(/*! ../common/domevent */ "./src/js/common/domevent.js");
var domutil = __webpack_require__(/*! ../common/domutil */ "./src/js/common/domutil.js");
var Point = __webpack_require__(/*! ../common/point */ "./src/js/common/point.js");

var SCROLL_INTERVAL = 30;
var SCROLL_MAX = 15;
var SCROLL_CLICK_INCREASED = 2; // In IE, the offset of the actual UI pixel when the scroll bar is clicked is offset.

/**
 * Add autoscroll feature to elements that prevented text selection.
 * @constructor
 * @param {HTMLElement} container - HTMLElement to add autoscroll features.
 */
function AutoScroll(container) {
    /**
     * @type {HTMLElement}
     */
    this.container = container;

    /**
     * @type {AutoScroll.DIRECTION}
     */
    this._direction = AutoScroll.DIRECTION.INSIDE;

    /**
     * @type {number}
     */
    this._offset = 0;

    /**
     * interval to scrolling
     * @type {number}
     */
    this._intervalID = 0;

    domevent.on(container, {
        'mousedown': this._onMouseDown
    }, this);
}

/**
 * @enum
 */
AutoScroll.DIRECTION = {
    INSIDE: 0,
    TOP: 1,
    RIGHT: 2,
    BOTTOM: 3,
    LEFT: 4
};

/**
 * Instance destroy method.
 */
AutoScroll.prototype.destroy = function() {
    domevent.off(this.container, {
        'mousedown': this._onMouseDown,
        'mousemove': this._onMouseMove,
        'mouseup': this._onMouseUp
    }, this);

    window.clearInterval(this._intervalID);
    this._intervalID = this._direction = this.container = null;
};

/**
 * Normalize ClientRect and calculate each position of edges.
 * @param {ClientRect} clientRect - ClientRect object of element.
 * @returns {object} edges.
 */
AutoScroll.prototype._getEdgePositions = function(clientRect) {
    return {
        top: clientRect.top,
        right: clientRect.left + clientRect.width,
        bottom: clientRect.bottom,
        left: clientRect.left
    };
};

/**
 * Get element real size ("real size" -> size without scrollbar)
 * @param {HTMLElement} el - element want to know real size ("real size" -> size without scrollbar)
 * @returns {number[]} real size [width, height]
 */
AutoScroll.prototype.getRealSize = function(el) {
    var computed = domutil.getComputedStyle(el),
        border,
        padding;

    border = parseFloat(computed.getPropertyValue('border-top-width')) +
        parseFloat(computed.getPropertyValue('border-bottom-width'));
    padding = parseFloat(computed.getPropertyValue('padding-top')) +
        parseFloat(computed.getPropertyValue('padding-bottom'));

    return [el.clientWidth + border + padding, el.clientHeight + border + padding];
};

/**
 * Check supplied element has scrollbar.
 * @param {HTMLElement} el - element want to know has scrollbar.
 * @returns {boolean[]} has scrollbar? [horizontal, vertical]
 */
AutoScroll.prototype.hasScrollbar = function(el) {
    var realSize = this.getRealSize(el);

    return [
        el.offsetWidth > Math.ceil(realSize[0]),
        el.offsetHeight > Math.ceil(realSize[1])
    ];
};

/**
 * @param {HTMLElement} el - element want to know.
 * @param {MouseEvent} mouseEvent - mouse event object.
 * @returns {boolean} mouse pointer is on the scrollbar?
 */
AutoScroll.prototype.isOnScrollbar = function(el, mouseEvent) {
    var realSize = this.getRealSize(el),
        pos = domevent.getMousePosition(mouseEvent, el),
        mouseInScrollbar = false;

    mouseInScrollbar = (realSize[0] - SCROLL_CLICK_INCREASED < pos[0] ||
                        realSize[1] - SCROLL_CLICK_INCREASED < pos[1]);

    return mouseInScrollbar;
};

/**
 * MouseDown event handler
 * @param {MouseEvent} mouseDownEvent - mouse down event
 */
AutoScroll.prototype._onMouseDown = function(mouseDownEvent) {
    // only primary button can start drag.
    if (domevent.getMouseButton(mouseDownEvent) !== 0) {
        return;
    }

    // deactivate autoscroll feature when mouse is on the scrollbar. (IE)
    if (util.browser.msie && this.isOnScrollbar(this.container, mouseDownEvent)) {
        return;
    }

    window.clearInterval(this._intervalID);
    this._intervalID = window.setInterval(util.bind(this._onTick, this), SCROLL_INTERVAL);

    domevent.on(global, {
        'mousemove': this._onMouseMove,
        'mouseup': this._onMouseUp
    }, this);
};

/**
 * MouseMove event handler
 * @param {MouseEvent} mouseEvent - mouse move event object.
 */
AutoScroll.prototype._onMouseMove = function(mouseEvent) {
    var edge = this._getEdgePositions(this.container.getBoundingClientRect()),
        pos = Point.n(domevent.getMousePosition(mouseEvent));

    if (pos.y >= edge.top && pos.y <= edge.bottom &&
        pos.x >= edge.left && pos.x <= edge.right) {
        this._direction = AutoScroll.DIRECTION.INSIDE;

        return;
    }

    if (pos.y < edge.top) {
        this._direction = AutoScroll.DIRECTION.TOP;
        this._offset = edge.top - pos.y;

        return;
    }

    if (pos.y > edge.bottom) {
        this._direction = AutoScroll.DIRECTION.BOTTOM;
        this._offset = pos.y - edge.bottom;

        return;
    }

    if (pos.x < edge.left) {
        this._direction = AutoScroll.DIRECTION.LEFT;
        this._offset = edge.left - pos.x;

        return;
    }

    this._direction = AutoScroll.DIRECTION.RIGHT;
    this._offset = pos.x - edge.right;
};

/**
 * MouseUp event handler.
 */
AutoScroll.prototype._onMouseUp = function() {
    window.clearInterval(this._intervalID);
    this._intervalID = 0;
    this._direction = AutoScroll.DIRECTION.INSIDE;
    this._offset = 0;

    domevent.off(global, {
        'mousemove': this._onMouseMove,
        'mouseup': this._onMouseUp
    }, this);
};

/**
 * Interval tick event handler
 */
AutoScroll.prototype._onTick = function() {
    var direction = this._direction,
        container,
        factor;

    if (!direction) {
        return;
    }

    container = this.container;
    factor = Math.min(this._offset, SCROLL_MAX);

    switch (direction) {
        case AutoScroll.DIRECTION.TOP:
            container.scrollTop -= factor;
            break;
        case AutoScroll.DIRECTION.RIGHT:
            container.scrollLeft += factor;
            break;
        case AutoScroll.DIRECTION.BOTTOM:
            container.scrollTop += factor;
            break;
        default:
            container.scrollLeft -= factor;
            break;
    }
};

module.exports = AutoScroll;


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/common/collection.js":
/*!*************************************!*\
  !*** ./src/js/common/collection.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Common collections.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var forEachProp = util.forEachOwnProperties,
    forEachArr = util.forEachArray,
    isFunc = util.isFunction,
    isObj = util.isObject;

var aps = Array.prototype.slice;

/**
 * Common collection.
 *
 * It need function for get model's unique id.
 *
 * if the function is not supplied then it use default function {@link Collection#getItemID}
 * @constructor
 * @param {function} [getItemIDFn] function for get model's id.
 */
function Collection(getItemIDFn) {
    /**
     * @type {object.<string, *>}
     */
    this.items = {};

    /**
     * @type {number}
     */
    this.length = 0;

    if (isFunc(getItemIDFn)) {
        /**
         * @type {function}
         */
        this.getItemID = getItemIDFn;
    }
}

/**********
 * static props
 **********/

/**
 * Combind supplied function filters and condition.
 * @param {...function} filters - function filters
 * @returns {function} combined filter
 */
Collection.and = function(filters) {
    var cnt;

    filters = aps.call(arguments);
    cnt = filters.length;

    return function(item) {
        var i = 0;

        for (; i < cnt; i += 1) {
            if (!filters[i].call(null, item)) {
                return false;
            }
        }

        return true;
    };
};

/**
 * Combine multiple function filters with OR clause.
 * @param {...function} filters - function filters
 * @returns {function} combined filter
 */
Collection.or = function(filters) {
    var cnt;

    filters = aps.call(arguments);
    cnt = filters.length;

    return function(item) {
        var i = 1,
            result = filters[0].call(null, item);

        for (; i < cnt; i += 1) {
            result = (result || filters[i].call(null, item));
        }

        return result;
    };
};

/**
 * Merge several collections.
 *
 * You can\'t merge collections different _getScheduleID functions. Take case of use.
 * @param {...Collection} collections collection arguments to merge
 * @returns {Collection} merged collection.
 */
Collection.merge = function(collections) {    // eslint-disable-line
    var cols = aps.call(arguments),
        newItems = {},
        merged = new Collection(cols[0].getItemID),
        extend = util.extend;

    forEachArr(cols, function(col) {
        extend(newItems, col.items);
    });

    merged.items = newItems;
    merged.length = util.keys(merged.items).length;

    return merged;
};

/**********
 * prototype props
 **********/

/**
 * get model's unique id.
 * @param {object} item model instance.
 * @returns {number} model unique id.
 */
Collection.prototype.getItemID = function(item) {
    return String(item._id);
};

/**
 * add models.
 * @param {...*} item models to add this collection.
 */
Collection.prototype.add = function(item) {
    var self = this,
        id,
        ownItems;

    if (arguments.length > 1) {
        forEachArr(aps.call(arguments), function(o) {
            self.add(o);
        });

        return;
    }

    id = this.getItemID(item);
    ownItems = this.items;

    if (!ownItems[id]) {
        this.length += 1;
    }
    ownItems[id] = item;
};

/**
 * remove models.
 * @param {...(object|string|number)} id model instance or unique id to delete.
 * @returns {array} deleted model list.
 */
Collection.prototype.remove = function(id) {
    var self = this,
        removed = [],
        ownItems,
        itemToRemove;

    if (!this.length) {
        return removed;
    }

    if (arguments.length > 1) {
        removed = util.map(aps.call(arguments), function(_id) {
            return self.remove(_id);
        });

        return removed;
    }

    ownItems = this.items;

    if (isObj(id)) {
        id = this.getItemID(id);
    }

    if (!ownItems[id]) {
        return removed;
    }

    this.length -= 1;
    itemToRemove = ownItems[id];
    delete ownItems[id];

    return itemToRemove;
};

/**
 * remove all models in collection.
 */
Collection.prototype.clear = function() {
    this.items = {};
    this.length = 0;
};

/**
 * check collection has specific model.
 * @param {(object|string|number|function)} id model instance or id or filter function to check
 * @returns {boolean} is has model?
 */
Collection.prototype.has = function(id) {
    var isFilter,
        has;

    if (!this.length) {
        return false;
    }

    isFilter = isFunc(id);
    has = false;

    if (isFilter) {
        this.each(function(item) {
            if (id(item) === true) {
                has = true;

                return false; // returning false can stop this loop
            }

            return true;
        });
    } else {
        id = isObj(id) ? this.getItemID(id) : id;
        has = util.isExisty(this.items[id]);
    }

    return has;
};

/**
 * invoke callback when model exist in collection.
 * @param {(string|number)} id model unique id.
 * @param {function} fn the callback.
 * @param {*} [context] callback context.
 */
Collection.prototype.doWhenHas = function(id, fn, context) {
    var item = this.items[id];

    if (!util.isExisty(item)) {
        return;
    }

    fn.call(context || this, item);
};

/**
 * Search model. and return new collection.
 * @param {function} filter filter function.
 * @returns {Collection} new collection with filtered models.
 * @example
 * collection.find(function(item) {
 *     return item.edited === true;
 * });
 *
 * function filter1(item) {
 *     return item.edited === false;
 * }
 *
 * function filter2(item) {
 *     return item.disabled === false;
 * }
 *
 * collection.find(Collection.and(filter1, filter2));
 *
 * collection.find(Collection.or(filter1, filter2));
 */
Collection.prototype.find = function(filter) {
    var result = new Collection();

    if (this.hasOwnProperty('getItemID')) {
        result.getItemID = this.getItemID;
    }

    this.each(function(item) {
        if (filter(item) === true) {
            result.add(item);
        }
    });

    return result;
};

/**
 * Group element by specific key values.
 *
 * if key parameter is function then invoke it and use returned value.
 * @param {(string|number|function|array)} key key property or getter function.
 *  if string[] supplied, create each collection before grouping.
 * @param {function} [groupFunc] - function that return each group's key
 * @returns {object.<string, Collection>} grouped object
 * @example
 *
 * // pass `string`, `number`, `boolean` type value then group by property value.
 * collection.groupBy('gender');    // group by 'gender' property value.
 * collection.groupBy(50);          // group by '50' property value.
 *
 * // pass `function` then group by return value. each invocation `function` is called with `(item)`.
 * collection.groupBy(function(item) {
 *     if (item.score > 60) {
 *         return 'pass';
 *     }
 *     return 'fail';
 * });
 *
 * // pass `array` with first arguments then create each collection before grouping.
 * collection.groupBy(['go', 'ruby', 'javascript']);
 * // result: { 'go': empty Collection, 'ruby': empty Collection, 'javascript': empty Collection }
 *
 * // can pass `function` with `array` then group each elements.
 * collection.groupBy(['go', 'ruby', 'javascript'], function(item) {
 *     if (item.isFast) {
 *         return 'go';
 *     }
 *
 *     return item.name;
 * });
 */
Collection.prototype.groupBy = function(key, groupFunc) {
    var result = {},
        collection,
        baseValue,
        keyIsFunc = isFunc(key),
        getItemIDFn = this.getItemID;

    if (util.isArray(key)) {
        util.forEachArray(key, function(k) {
            result[String(k)] = new Collection(getItemIDFn);
        });

        if (!groupFunc) {
            return result;
        }

        key = groupFunc;
        keyIsFunc = true;
    }

    this.each(function(item) {
        if (keyIsFunc) {
            baseValue = key(item);
        } else {
            baseValue = item[key];

            if (isFunc(baseValue)) {
                baseValue = baseValue.apply(item);
            }
        }

        collection = result[baseValue];

        if (!collection) {
            collection = result[baseValue] = new Collection(getItemIDFn);
        }

        collection.add(item);
    });

    return result;
};

/**
 * Return single item in collection.
 *
 * Returned item is inserted in this collection firstly.
 * @param {function} [filter] - function filter
 * @returns {object} item.
 */
Collection.prototype.single = function(filter) {
    var result,
        useFilter = util.isFunction(filter);

    this.each(function(item) {
        if (!useFilter) {
            result = item;

            return false; // returning false can stop this loop
        }
        if (filter(item)) {
            result = item;

            return false; // returning false can stop this loop
        }

        return true;
    }, this);

    return result;
};

/**
 * sort a basis of supplied compare function.
 * @param {function} compareFunction compareFunction
 * @returns {array} sorted array.
 */
Collection.prototype.sort = function(compareFunction) {
    var arr = [];

    this.each(function(item) {
        arr.push(item);
    });

    if (isFunc(compareFunction)) {
        arr = arr.sort(compareFunction);
    }

    return arr;
};

/**
 * iterate each model element.
 *
 * when iteratee return false then break the loop.
 * @param {function} iteratee iteratee(item, index, items)
 * @param {*} [context] context
 */
Collection.prototype.each = function(iteratee, context) {
    forEachProp(this.items, iteratee, context || this);
};

/**
 * return new array with collection items.
 * @returns {array} new array.
 */
Collection.prototype.toArray = function() {
    if (!this.length) {
        return [];
    }

    return util.map(this.items, function(item) {
        return item;
    });
};

module.exports = Collection;



/***/ }),

/***/ "./src/js/common/common.js":
/*!*********************************!*\
  !*** ./src/js/common/common.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview common/general utilities.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var aps = Array.prototype.slice;

var domutil = __webpack_require__(/*! ../common/domutil */ "./src/js/common/domutil.js"),
    Collection = __webpack_require__(/*! ../common/collection */ "./src/js/common/collection.js");

/**
 * Default schedule id getter for collection
 * @param {Schedule} schedule - schedule instance
 * @returns {string} schedule id
 */
function scheduleIDGetter(schedule) {
    return schedule.cid();
}

module.exports = {
    /**
     * @param {...*} initItems - items to add newly created collection.
     * @returns {Collection} new collection for schedule models.
     */
    createScheduleCollection: function(initItems) {    // eslint-disable-line
        var collection = new Collection(scheduleIDGetter);

        if (arguments.length) {
            collection.add.apply(collection, arguments);
        }

        return collection;
    },

    /**
     * Get ratio value.
     *
     * a : b = y : X;
     *
     * =
     *
     * X = (b * y) / a;
     * @param {number} a - a
     * @param {number} b - b
     * @param {number} y - y
     * @returns {number} ratio value
     */
    ratio: function(a, b, y) {
        // a : b = y : x;
        return (b * y) / a;
    },

    /**
     * Find nearest value from supplied params.
     * @param {number} value - value to find.
     * @param {array} nearest - nearest array.
     * @returns {number} nearest value
     */
    nearest: function(value, nearest) {
        var diff = util.map(nearest, function(v) {
                return Math.abs(value - v);
            }),
            nearestIndex = util.inArray(Math.min.apply(null, diff), diff);

        return nearest[nearestIndex];
    },

    /**
     * pick value from object then return utility object to treat it.
     * @param {object} obj - object to search supplied path property.
     * @param {...string} paths - rest parameter that string value to search property in object.
     * @returns {object} pick object.
     */
    pick2: function(obj, paths) {    // eslint-disable-line
        var result = util.pick.apply(null, arguments),
            pick;

        pick = {
            /**
             * @returns {*} picked value.
             */
            val: function() {
                return result;
            },

            /**
             * invoke supplied function in picked object.
             *
             * the callback context is set picked object.
             * @param {string|function} fn - function to invoke in picked object.
             * @returns {*} result of invoke.
             */
            then: function(fn) {
                var args;

                if (!result) {
                    return undefined;    //eslint-disable-line
                }

                args = aps.call(arguments, 1);

                if (util.isString(fn)) {
                    return (util.pick(result, fn) || function() {}).apply(result, args);
                }

                return fn.call(result, result);
            }
        };

        return pick;
    },

    /**
     * Mixin method.
     *
     * (extend methods except property name 'mixin')
     * @param {object} from - mixin object.
     * @param {object} to - object to mixin.
     */
    mixin: function(from, to) {
        util.extend(to.prototype, from);
    },

    /**
     * Limit supplied value base on `minArr`, `maxArr`
     * @param {number} value - value
     * @param {array} minArr - min
     * @param {array} maxArr - max
     * @returns {number} limited value
     */
    limit: function(value, minArr, maxArr) {
        var v = Math.max.apply(null, [value].concat(minArr));
        v = Math.min.apply(null, [v].concat(maxArr));

        return v;
    },

    stripTags: function(str) {
        return str.replace(/<([^>]+)>/ig, '');
    },

    /**
     * Get first value in 2-dimentional array.
     * @param {Array.<Array>} arr2d - 2-dimentional array
     * @returns {*} first value in 2d array
     */
    firstIn2dArray: function(arr2d) {
        return util.pick(arr2d, '0', '0');
    },

    /**
     * Get last value in 2-dimentional array.
     * @param {Array.<Array>} arr2d - 2-dimentional array
     * @returns {*} last value in 2d array
     */
    lastIn2dArray: function(arr2d) {
        var lastRow = arr2d.length - 1,
            lastCol = arr2d[lastRow].length - 1;

        return util.pick(arr2d, lastRow, lastCol);
    },

    /**
     * Set 'title' attribute for all element that has exceeded content in
     * container
     * @param {string} selector - CSS selector {@see domutil#find}
     * @param {HTMLElement} container - container element
     * @param {boolean} force - force to apply
     */
    setAutoEllipsis: function(selector, container, force) {
        util.forEach(domutil.find(selector, container, true), function(el) {
            if (force || el.offsetWidth < el.scrollWidth) {
                el.setAttribute('title', domutil.getData(el, 'title'));
            }
        });
    },

    /**
     * Set the value at path of object.
     * @param {object} object - the object to modify
     * @param {string} path -the path of property to set
     * @param {*} value - the value to set
     */
    set: function(object, path, value) {
        var names = path.split('.');
        var store = object;

        util.forEach(names, function(name, index) {
            store[name] = store[name] || {};

            if (index === names.length - 1) {
                store[name] = value;
            } else {
                store = store[name];
            }
        });
    },

    /**
     * shift a array
     * @param {Array.<any>} array - array
     * @param {number} shift - positive or negative integer to shift
     * @returns {Array.<any>} shifted array
     */
    shiftArray: function(array, shift) {
        var length = Math.abs(shift);
        var i;

        if (shift > 0) {
            for (i = 0; i < length; i += 1) {
                array.push(array.shift());
            }
        } else if (shift < 0) {
            for (i = 0; i < length; i += 1) {
                array.unshift(array.pop());
            }
        }

        return array;
    },

    /**
     * take elements from array between start and end.
     * @param {Array.<any>} array - array
     * @param {number} start - start index
     * @param {number} end - end index
     * @returns {Array.<any>}
     */
    takeArray: function(array, start, end) {
        var length = array.length;
        var rightCount = length - end;
        var leftCount = start;

        // remove right
        array.splice(end, rightCount);
        // remove left
        array.splice(0, leftCount);

        return array;
    },

    /**
     * shift hours
     * @param {number} hours - hours
     * @param {number} shift - positive or negative integer to shift
     * @returns {number} shifted hours
     */
    shiftHours: function(hours, shift) {
        if (shift > 0) {
            hours = (hours + shift) % 24;
        } else if (shift < 0) {
            hours += shift;
            hours = hours > 0 ? hours : 24 + hours;
        }

        return hours;
    },

    /**
     * Parse css value into number and units
     * @param {string} cssValue - css value like '72px'
     * @returns {Array} [number, unit]
     */
    parseUnit: function(cssValue) {
        var number = parseFloat(cssValue, 10);
        var unit = cssValue.match(/[\d.\-+]*\s*(.*)/)[1] || '';

        return [number, unit];
    },

    find: function(array, iteratee, contextopt) {
        var found;

        util.forEach(array, function(item) {
            if (iteratee) {
                found = iteratee(item);
            }

            if (found) {
                found = item;

                return false;
            }

            return true;
        }, contextopt);

        return found;
    }
};



/***/ }),

/***/ "./src/js/common/datetime.js":
/*!***********************************!*\
  !*** ./src/js/common/datetime.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview datetime utility module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var TZDate = __webpack_require__(/*! ./timezone */ "./src/js/common/timezone.js").Date,
    dw = __webpack_require__(/*! ../common/dw */ "./src/js/common/dw.js");
var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
/* eslint-disable no-useless-escape */
var dateFormatRx = /^(\d{4}[-|\/]*\d{2}[-|\/]*\d{2})\s?(\d{2}:\d{2}:\d{2})?$/;
var datetime, tokenFunc;

var memo = {
    millisecondsTo: {},
    millisecondsFrom: {}
};

tokenFunc = {
    /**
     * @param {TZDate} date date object.
     * @returns {string} YYYYMMDD
     */
    'YYYYMMDD': function(date) {
        return [
            date.getFullYear(),
            datetime.leadingZero(date.getMonth() + 1, 2),
            datetime.leadingZero(date.getDate(), 2)
        ].join('');
    },
    /**
     * @param {TZDate} date date object
     * @returns {string} four digit year number
     */
    'YYYY': function(date) {
        return String(date.getFullYear());
    },

    /**
     * @param {TZDate} date date object
     * @returns {string} two digit month number
     */
    'MM': function(date) {
        return datetime.leadingZero(date.getMonth() + 1, 2);
    },

    /**
     * @param {TZDate} date date object
     * @returns {string} two digit date number
     */
    'DD': function(date) {
        return datetime.leadingZero(date.getDate(), 2);
    },

    /**
     * @param {TZDate} date date object
     * @returns {string} HH:mm
     */
    'HH:mm': function(date) {
        var hour = date.getHours(),
            minutes = date.getMinutes();

        return datetime.leadingZero(hour, 2) + ':' +
            datetime.leadingZero(minutes, 2);
    },

    /**
     * @param {TZDate} date date object
     * @returns {string} hh:mm
     */
    'hh:mm': function(date) {
        var hour = Math.floor(date.getHours() % 12),
            minutes = date.getMinutes();

        return datetime.leadingZero(hour, 2) + ':' +
            datetime.leadingZero(minutes, 2);
    },

    /**
     * @param {TZDate} date date object
     * @returns {string} tt
     */
    'tt': function(date) {
        var hour = date.getHours();

        return hour < 12 ? 'am' : 'pm';
    }
};

datetime = {
    /**
     * The number of milliseconds one day.
     * @type {number}
     */
    MILLISECONDS_PER_DAY: 86400000,

    /**
     * The number of milliseconds one hour.
     * @type {number}
     */
    MILLISECONDS_PER_HOUR: 3600000,

    /**
     * The number of milliseconds one minutes.
     * @type {number}
     */
    MILLISECONDS_PER_MINUTES: 60000,

    /**
     * The number of milliseconds 20 minutes for schedule min duration
     * @type {number}
     */
    MILLISECONDS_SCHEDULE_MIN_DURATION: 20 * 60000,

    /**
     * convert milliseconds
     * @param {string} type - type of value.
     * @param {number} value - value to convert.
     * @param {function} iteratee - iteratee function to use reduce.
     * @returns {number} converted value.
     */
    _convMilliseconds: function(type, value, iteratee) {
        var conv = [24, 60, 60, 1000],
            index = {
                day: 0,
                hour: 1,
                minutes: 2,
                seconds: 3
            };

        if (!(type in index) || global.isNaN(value)) {
            return false;
        }

        return util.reduce([value].concat(conv.slice(index[type])), iteratee);
    },

    /**
     * Convert milliseconds value to other type
     * @param {type} type convert to type want to. support "day", "hour",
     *  "minutes", "seconds" only.
     * @param {value} value - value to convert.
     * @returns {number} converted value.
     */
    millisecondsTo: function(type, value) {
        var cache = memo.millisecondsTo,
            key = type + value;

        if (cache[key]) {
            return cache[key];
        }

        cache[key] = datetime._convMilliseconds(type, value, function(m, v) {
            return m / v;
        });

        return cache[key];
    },

    /**
     * Convert value to milliseconds
     * @param {type} type - type of supplied value. support "hour", "minutes", "seconds" only.
     * @param {value} value - value to convert.
     * @returns {number} converted value.
     */
    millisecondsFrom: function(type, value) {
        var cache = memo.millisecondsFrom,
            key = type + value;

        if (cache[key]) {
            return cache[key];
        }

        cache[key] = datetime._convMilliseconds(type, value, function(m, v) {
            return m * v;
        });

        return cache[key];
    },

    /**
     * Make date array from supplied paramters.
     * @param {TZDate} start Start date.
     * @param {TZDate} end End date.
     * @param {number} step The number of milliseconds to use increment.
     * @returns {array} Date array.
     */
    range: function(start, end, step) {
        var startTime = start.getTime();
        var endTime = end.getTime();
        var cursor = startTime;
        var date = dw(startTime);
        var result = [];

        while (cursor <= endTime && endTime >= date.d.getTime()) {
            result.push(new TZDate(date.d));
            cursor = cursor + step;
            date.addDate(1);
        }

        return result;
    },

    /**
     * Clone supplied date.
     * @param {TZDate} date date object to clone.
     * @returns {TZDate} Cloned date object
     */
    clone: function(date) {
        return new TZDate(date.getTime());
    },

    /**
     * Compare two dates.
     *
     * when first date is latest then seconds then return -1.
     *
     * return +1 reverse, and return 0 is same.
     * @param {TZDate} d1 Date object to compare.
     * @param {TZDate} d2 Date object to compare.
     * @returns {number} result of compare
     */
    compare: function(d1, d2) {
        var _d1 = d1.getTime(),
            _d2 = d2.getTime();

        if (_d1 < _d2) {
            return -1;
        }
        if (_d1 > _d2) {
            return 1;
        }

        return 0;
    },

    /**
     * @param {TZDate} d1 - date one
     * @param {TZDate} d2 - date two
     * @returns {boolean} is two date are same year, month?
     */
    isSameMonth: function(d1, d2) {
        return (d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth());
    },

    /**
     * @param {TZDate} d1 - date one
     * @param {TZDate} d2 - date two
     * @returns {boolean} is two date are same year, month, date?
     */
    isSameDate: function(d1, d2) {
        var sameMonth = datetime.isSameMonth(d1, d2);

        return sameMonth && (d1.getDate() === d2.getDate());
    },

    /**
     * Check supplied parameter is valid date object.
     * @param {*} d Object to validate.
     * @returns {boolean} return true when parameter is valid date object.
     */
    isValid: function(d) {
        if (d instanceof TZDate) {
            return !window.isNaN(d.getTime());
        }

        return false;
    },

    /**
     * convert non local date to UTC date.
     * @param {TZDate} d Date to convert UTC.
     * @returns {TZDate} The UTC Date.
     */
    toUTC: function(d) {
        var l = d.getTime(),
            offset = datetime.millisecondsFrom('minutes', new Date().getTimezoneOffset());

        return new TZDate(l + offset);
    },

    /**
     * pad left zero characters.
     * @param {number} number number value to pad zero.
     * @param {number} length pad length to want.
     * @returns {string} padded string.
     */
    leadingZero: function(number, length) {
        var zero = '',
            i = 0;

        if (String(number).length > length) {
            return String(number);
        }

        for (; i < (length - 1); i += 1) {
            zero += '0';
        }

        return (zero + number).slice(length * -1);
    },

    /**
     * Convert date string to date object.
     *
     * Only listed below formats avaliable.
     *
     * - YYYYMMDD
     * - YYYY/MM/DD
     * - YYYY-MM-DD
     * - YYYY/MM/DD HH:mm:SS
     * - YYYY-MM-DD HH:mm:SS
     *
     * @param {string} str Formatted string.
     * @param {number} [fixMonth=-1] - number for fix month calculating.
     * @returns {(Date|boolean)} Converted Date object. when supplied str is not available then return false.
     */
    parse: function(str, fixMonth) {
        var separator,
            matches = str.match(dateFormatRx),
            ymd,
            hms;

        if (util.isUndefined(fixMonth)) {
            fixMonth = -1;
        }

        if (!matches) {
            return false;
        }

        if (str.length > 8) {
            // YYYY/MM/DD
            // YYYY-MM-DD
            // YYYY/MM/DD HH:mm:SS
            // YYYY-MM-DD HH:mm:SS
            separator = ~str.indexOf('/') ? '/' : '-';
            matches = matches.splice(1);

            ymd = matches[0].split(separator);
            hms = matches[1] ? matches[1].split(':') : [0, 0, 0];
        } else {
            // YYYYMMDD
            matches = matches[0];
            ymd = [matches.substr(0, 4), matches.substr(4, 2), matches.substr(6, 2)];
            hms = [0, 0, 0];
        }

        return new TZDate(
            Number(ymd[0]),
            Number(ymd[1]) + fixMonth,
            Number(ymd[2]),
            Number(hms[0]),
            Number(hms[1]),
            Number(hms[2])
        );
    },

    /**
     * Return date object from Date.
     * @param {TZDate} date date
     * @returns {object} Date object.
     */
    raw: function(date) {
        return {
            y: date.getFullYear(),
            M: date.getMonth(),
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            ms: date.getMilliseconds()
        };
    },

    /**
     * Return 00:00:00 supplied date.
     * @param {TZDate} date date.
     * @returns {TZDate} start date.
     */
    start: function(date) {
        var d = new TZDate(date.getTime());
        d.setHours(0, 0, 0, 0);

        return d;
    },

    /**
     * Return 23:59:59 supplied date.
     * @param {TZDate} date date.
     * @returns {TZDate} end date.
     */
    end: function(date) {
        var d = new TZDate(date.getTime());
        d.setHours(23, 59, 59, 0);

        return d;
    },

    /**
     * Return formatted string as basis of supplied string.
     *
     * Supported Token Lists.
     *
     * - YYYY => 1988
     * - MM => 01 ~ 12
     * - DD => 01 ~ 31
     * - YYYYMMDD => 19880925
     * @param {TZDate} date String want to formatted.
     * @param {string} format format str.
     * @returns {string}  Formatted date string.
     */
    format: function(date, format) {
        var result = format;
        util.forEachOwnProperties(tokenFunc, function(converter, token) {
            result = result.replace(token, converter(date));
        });

        return result;
    },

    /**
     * Get start date of specific month
     * @param {TZDate} date - date to get start date
     * @returns {TZDate} start date of supplied month
     */
    startDateOfMonth: function(date) {
        var startDate = new TZDate(Number(date));

        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);

        return startDate;
    },

    /**
     * Get end date of specific month
     * @param {TZDate} date - date to get end date
     * @returns {TZDate} end date of supplied month
     */
    endDateOfMonth: function(date) {
        var endDate = datetime.startDateOfMonth(date);

        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);
        endDate.setHours(23, 59, 59);

        return endDate;
    },

    /**
     * Return 2-dimensional array month calendar
     *
     * dates that different month with given date are negative values
     * @param {TZDate} month - date want to calculate month calendar
     * @param {object} options - options
     * @param {number} [options.startDayOfWeek=0] - start day of week
     * @param {boolean} options.isAlways6Week - whether the number of weeks are always 6
     * @param {number} options.visibleWeeksCount visible weeks count
     * @param {boolean} options.workweek - only show work week
     * @param {function} [iteratee] - iteratee for customizing calendar object
     * @returns {Array.<string[]>} calendar 2d array
     */
    arr2dCalendar: function(month, options, iteratee) {
        var weekArr,
            start, end,
            startIndex, endIndex,
            totalDate, afterDates,
            cursor, week,
            calendar = [],
            startDayOfWeek = options.startDayOfWeek,
            isAlways6Week = util.isUndefined(options.isAlways6Week) ? true : options.isAlways6Week,
            visibleWeeksCount = options.visibleWeeksCount,
            workweek = options.workweek;

        if (visibleWeeksCount) {
            start = new TZDate(month);
            end = dw(new TZDate(month));
            end.addDate(7 * (visibleWeeksCount - 1));
            end = end.d;
        } else {
            start = datetime.startDateOfMonth(month);
            end = datetime.endDateOfMonth(month);
        }

        // create day number array by startDayOfWeek number
        // 4 -> [4, 5, 6, 0, 1, 2, 3]
        // 2 -> [2, 3, 4, 5, 6, 0, 1]
        weekArr = util.range(startDayOfWeek, 7).concat(util.range(7)).slice(0, 7);
        startIndex = util.inArray(start.getDay(), weekArr);
        endIndex = util.inArray(end.getDay(), weekArr);
        // free dates after last date of this month
        afterDates = 7 - (endIndex + 1);

        if (visibleWeeksCount) {
            totalDate = 7 * visibleWeeksCount;
        } else {
            totalDate = isAlways6Week ? (7 * 6) : (startIndex + end.getDate() + afterDates);
        }
        cursor = new TZDate(new TZDate(start).setDate(start.getDate() - startIndex));
        // iteratee all dates to render
        util.forEachArray(util.range(totalDate), function(i) {
            var date;

            if (!(i % 7)) {
                // group each date by week
                week = calendar[i / 7] = [];
            }

            date = new TZDate(cursor);
            date = iteratee ? iteratee(date) : date;
            if (!workweek || !datetime.isWeekend(date.getDay())) {
                week.push(date);
            }

            // add date
            cursor.setDate(cursor.getDate() + 1);
        });

        return calendar;
    },

    /**
     * Calculate grid left(%), width(%) by narrowWeekend, startDayOfWeek, workweek
     *
     * @param {number} days - day length of week
     * @param {boolean} narrowWeekend - narrow weekend
     * @param {number} startDayOfWeek - start day of week
     * @param {boolean} workweek - only show work week
     * @returns {Array} day, left, width
     */
    getGridLeftAndWidth: function(days, narrowWeekend, startDayOfWeek, workweek) {
        var limitDaysToApplyNarrowWeekend = 5;
        var uniformWidth = 100 / days;
        var wideWidth = days > limitDaysToApplyNarrowWeekend ? 100 / (days - 1) : uniformWidth;
        var accumulatedWidth = 0;
        var dates = util.range(startDayOfWeek, 7).concat(util.range(days)).slice(0, 7);

        if (workweek) {
            dates = util.filter(dates, function(day) {
                return !datetime.isWeekend(day);
            });
        }

        narrowWeekend = workweek ? false : narrowWeekend;

        return util.map(dates, function(day) {
            var model;
            var width = narrowWeekend ? wideWidth : uniformWidth;
            if (days > limitDaysToApplyNarrowWeekend && narrowWeekend && datetime.isWeekend(day)) {
                width = wideWidth / 2;
            }

            model = {
                day: day,
                width: width,
                left: accumulatedWidth
            };

            accumulatedWidth += width;

            return model;
        });
    },

    /**
     * Get that day is weekend
     * @param {number} day number
     * @returns {boolean} true if weekend or false
     */
    isWeekend: function(day) {
        return day === 0 || day === 6;
    }
};

module.exports = datetime;


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/common/dirty.js":
/*!********************************!*\
  !*** ./src/js/common/dirty.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Dirty flagging module for objects.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var common = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var existy = common.isExisty,
    pick = common.pick,
    isFunc = common.isFunction;

/**
 * Mixin module for dirty flagging on specific objects.
 * @mixin
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
var dirty = {
    /**
     * Set property value with dirty flagging.
     * @param {string} propName Property name.
     * @param {*} value Proprty value.
     */
    set: function(propName, value) {
        var originValue = this[propName];

        if (originValue === value) {
            return;
        }

        this[propName] = value;

        if (!this._changed) {
            /**
             * Save changed properties.
             * @memberof dirty
             * @name _changed
             * @type {Object}
             */
            this._changed = {};
        }

        this._changed[propName] = true;

        /**
         * Dirty flag
         * @type {Boolean}
         * @name _dirty
         * @memberof dirty
         */
        this._dirty = true;
    },

    /**
     * Check dirty flag.
     * @returns {boolean} Property is changed.
     */
    isDirty: function() {
        return !!this._dirty;
    },

    /**
     * Set dirty flag manually.
     * @param {Boolean} [toDirty=true] This will set dirty flag directly.
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
     * Delete property safety.
     * @param {String} propName The name of property.
     */
    deleteProp: function(propName) {
        delete this[propName];

        if (this._changed) {
            delete this._changed[propName];
        }
    },

    /**
     * Check the changes with specific property.
     * @param {String} propName The name of property you want.
     * @returns {boolean} Is property changed?
     */
    isPropChanged: function(propName) {
        if (!this._changed) {
            return false;
        }

        return this._changed[propName] === true;
    },

    /**
     * Mixin to specific objects.
     * @param {Object} target The object to mix this module.
     * @memberof module:util/dirty
     * @example
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
     * Wrapper method for dirty flagging.
     *
     * This method invoke after invoked specific method that added by you.
     *
     * The method want to add are must exist before add.
     * @param {object} target Target object to method wrap.
     * @param {(string|object)} methodName
     *  Method name to wrap or methodName: flag objects.
     * @param {boolean} [flag=true]
     *  this will used to flagging by dirty flagger after invoke the methods added by you.
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
     * // single
     * dirty.wrap(Animal.prototype, 'growl', true);
     * // multiple
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
            common.forEachOwnProperties(methodName, function(_flag, _name) {
                wrap(target, _name, _flag);
            });

            return;
        }

        flag = existy(flag) ? flag : true;

        if (!target._wrapper) {
            /**
             * @param {function} _fn Original method to wrap.
             * @param {boolean} flagToSet The boolean value to using dirty flagging.
             * @returns {*} The result value of original method.
             * @name _wrapper
             * @memberof dirty
             */
            target._wrapper = function(_fn, flagToSet) {
                return function() {
                    var args = Array.prototype.slice.call(arguments);
                    var result = _fn.apply(this, args); // eslint-disable-line
                    this._dirty = flagToSet; // eslint-disable-line

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



/***/ }),

/***/ "./src/js/common/domevent.js":
/*!***********************************!*\
  !*** ./src/js/common/domevent.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint complexity: 0 */
/**
 * @fileoverview Utility module for handling DOM events.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var browser = util.browser,
    eventKey = '_evt',
    DRAG = {
        START: ['touchstart', 'mousedown'],
        END: {
            mousedown: 'mouseup',
            touchstart: 'touchend',
            pointerdown: 'touchend',
            MSPointerDown: 'touchend'
        },
        MOVE: {
            mousedown: 'mousemove',
            touchstart: 'touchmove',
            pointerdown: 'touchmove',
            MSPointerDown: 'touchmove'
        }
    };

var domevent = {
    /**
     * Bind dom events.
     * @param {HTMLElement} obj HTMLElement to bind events.
     * @param {(string|object)} types Space splitted events names or eventName:handler object.
     * @param {*} fn handler function or context for handler method.
     * @param {*} [context] context object for handler method.
     */
    on: function(obj, types, fn, context) {
        if (util.isString(types)) {
            util.forEach(types.split(' '), function(type) {
                domevent._on(obj, type, fn, context);
            });

            return;
        }

        util.forEachOwnProperties(types, function(handler, type) {
            domevent._on(obj, type, handler, fn);
        });
    },

    /**
     * DOM event binding.
     * @param {HTMLElement} obj HTMLElement to bind events.
     * @param {String} type The name of events.
     * @param {*} fn handler function
     * @param {*} [context] context object for handler method.
     * @private
     */
    _on: function(obj, type, fn, context) {
        var id,
            handler,
            originHandler;

        id = type + util.stamp(fn) + (context ? '_' + util.stamp(context) : '');

        if (obj[eventKey] && obj[eventKey][id]) {
            return;
        }

        handler = function(e) {
            fn.call(context || obj, e || window.event);
        };

        originHandler = handler;

        if ('addEventListener' in obj) {
            if (type === 'mouseenter' || type === 'mouseleave') {
                handler = function(e) {
                    e = e || window.event;
                    if (!domevent._checkMouse(obj, e)) {
                        return;
                    }
                    originHandler(e);
                };
                obj.addEventListener((type === 'mouseenter') ?
                    'mouseover' : 'mouseout', handler, false);
            } else {
                if (type === 'mousewheel') {
                    obj.addEventListener('DOMMouseScroll', handler, false);
                }

                obj.addEventListener(type, handler, false);
            }
        } else if ('attachEvent' in obj) {
            obj.attachEvent('on' + type, handler);
        }

        obj[eventKey] = obj[eventKey] || {};
        obj[eventKey][id] = handler;
    },

    /**
     * Unbind DOM Event handler.
     * @param {HTMLElement} obj HTMLElement to unbind.
     * @param {(string|object)} types Space splitted events names or eventName:handler object.
     * @param {*} fn handler function or context for handler method.
     * @param {*} [context] context object for handler method.
     */
    off: function(obj, types, fn, context) {
        if (util.isString(types)) {
            util.forEach(types.split(' '), function(type) {
                domevent._off(obj, type, fn, context);
            });

            return;
        }

        util.forEachOwnProperties(types, function(handler, type) {
            domevent._off(obj, type, handler, fn);
        });
    },

    /**
     * Unbind DOM event handler.
     * @param {HTMLElement} obj HTMLElement to unbind.
     * @param {String} type The name of event to unbind.
     * @param {function()} fn Event handler that supplied when binding.
     * @param {*} context context object that supplied when binding.
     * @private
     */
    _off: function(obj, type, fn, context) {
        var id = type + util.stamp(fn) + (context ? '_' + util.stamp(context) : ''),
            handler = obj[eventKey] && obj[eventKey][id];

        if (!handler) {
            return;
        }

        if ('removeEventListener' in obj) {
            if (type === 'mouseenter' || type === 'mouseleave') {
                obj.removeEventListener((type === 'mouseenter') ?
                    'mouseover' : 'mouseout', handler, false);
            } else {
                if (type === 'mousewheel') {
                    obj.removeEventListener('DOMMouseScroll', handler, false);
                }

                obj.removeEventListener(type, handler, false);
            }
        } else if ('detachEvent' in obj) {
            try {
                obj.detachEvent('on' + type, handler);
            } catch (e) {}    //eslint-disable-line
        }

        delete obj[eventKey][id];

        if (util.keys(obj[eventKey]).length) {
            return;
        }

        // throw exception when deleting host object's property in below IE8
        if (util.browser.msie && util.browser.version < 9) {
            obj[eventKey] = null;

            return;
        }

        delete obj[eventKey];
    },

    /**
     * Bind DOM event. this event will unbind after invokes.
     * @param {HTMLElement} obj HTMLElement to bind events.
     * @param {(string|object)} types Space splitted events names or eventName:handler object.
     * @param {*} fn handler function or context for handler method.
     * @param {*} [context] context object for handler method.
     */
    once: function(obj, types, fn, context) {
        var self = this;

        if (util.isObject(types)) {
            util.forEachOwnProperties(types, function(handler, type) {
                domevent.once(obj, type, handler, fn);
            });

            return;
        }

        /**
         * Handler for temporary usage for once implementation
         */
        function onceHandler() {
            fn.apply(context || obj, arguments);
            self._off(obj, types, onceHandler, context);
        }

        domevent.on(obj, types, onceHandler, context);
    },

    /**
     * Cancel event bubbling.
     * @param {Event} e Event object.
     */
    stopPropagation: function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    },

    /**
     * Cancel browser default actions.
     * @param {Event} e Event object.
     */
    preventDefault: function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },

    /**
     * Syntatic sugar of stopPropagation and preventDefault
     * @param {Event} e Event object.
     */
    stop: function(e) {
        domevent.preventDefault(e);
        domevent.stopPropagation(e);
    },

    /**
     * Stop scroll events.
     * @param {HTMLElement} el HTML element to prevent scroll.
     */
    disableScrollPropagation: function(el) {
        domevent.on(el, 'mousewheel MozMousePixelScroll', domevent.stopPropagation);
    },

    /**
     * Stop all events related with click.
     * @param {HTMLElement} el HTML element to prevent all event related with click.
     */
    disableClickPropagation: function(el) {
        domevent.on(el, DRAG.START.join(' ') + ' click dblclick', domevent.stopPropagation);
    },

    /**
     * Get mouse position from mouse event.
     *
     * If supplied relatveElement parameter then return relative position based on element.
     * @param {Event} mouseEvent Mouse event object
     * @param {HTMLElement} relativeElement HTML element that calculate relative position.
     * @returns {number[]} mouse position.
     */
    getMousePosition: function(mouseEvent, relativeElement) {
        var rect;

        if (!relativeElement) {
            return [mouseEvent.clientX, mouseEvent.clientY];
        }

        rect = relativeElement.getBoundingClientRect();

        return [
            mouseEvent.clientX - rect.left - relativeElement.clientLeft,
            mouseEvent.clientY - rect.top - relativeElement.clientTop
        ];
    },

    /**
     * Normalize mouse wheel event that different each browsers.
     * @param {MouseEvent} e Mouse wheel event.
     * @returns {Number} delta
     */
    getWheelDelta: function(e) {
        var delta = 0;

        if (e.wheelDelta) {
            delta = e.wheelDelta / 120;
        }

        if (e.detail) {
            delta = -e.detail / 3;
        }

        return delta;
    },

    /**
     * prevent firing mouseleave event when mouse entered child elements.
     * @param {HTMLElement} el HTML element
     * @param {MouseEvent} e Mouse event
     * @returns {Boolean} leave?
     * @private
     */
    _checkMouse: function(el, e) {
        var related = e.relatedTarget;

        if (!related) {
            return true;
        }

        try {
            while (related && (related !== el)) {
                related = related.parentNode;
            }
        } catch (err) {
            return false;
        }

        return (related !== el);
    },

    /**
     * Trigger specific events to html element.
     * @param {HTMLElement} obj HTMLElement
     * @param {string} type Event type name
     * @param {object} [eventData] Event data
     */
    trigger: function(obj, type, eventData) {
        var rMouseEvent = /(mouse|click)/;
        if (util.isUndefined(eventData) && rMouseEvent.exec(type)) {
            eventData = domevent.mouseEvent(type);
        }

        if (obj.dispatchEvent) {
            obj.dispatchEvent(eventData);
        } else if (obj.fireEvent) {
            obj.fireEvent('on' + type, eventData);
        }
    },

    /**
     * Create virtual mouse event.
     *
     * Tested at
     *
     * - IE7 ~ IE11
     * - Chrome
     * - Firefox
     * - Safari
     * @param {string} type Event type
     * @param {object} [eventObj] Event data
     * @returns {MouseEvent} Virtual mouse event.
     */
    mouseEvent: function(type, eventObj) {
        var evt,
            e;

        e = util.extend({
            bubbles: true,
            cancelable: (type !== 'mousemove'),
            view: window,
            wheelDelta: 0,
            detail: 0,
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            button: 0,
            relatedTarget: undefined  // eslint-disable-line
        }, eventObj);

        // prevent throw error when inserting wheelDelta property to mouse event on below IE8
        if (browser.msie && browser.version < 9) {
            delete e.wheelDelta;
        }

        if (typeof document.createEvent === 'function') {
            evt = document.createEvent('MouseEvents');
            evt.initMouseEvent(type,
                e.bubbles, e.cancelable, e.view, e.detail,
                e.screenX, e.screenY, e.clientX, e.clientY,
                e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
                e.button, document.body.parentNode
            );
        } else if (document.createEventObject) {
            evt = document.createEventObject();

            util.forEach(e, function(value, propName) {
                evt[propName] = value;
            }, this);
            evt.button = {0: 1,
                1: 4,
                2: 2}[evt.button] || evt.button;
        }

        return evt;
    },

    /**
     * Normalize mouse event's button attributes.
     *
     * Can detect which button is clicked by this method.
     *
     * Meaning of return numbers
     *
     * - 0: primary mouse button
     * - 1: wheel button or center button
     * - 2: secondary mouse button
     * @param {MouseEvent} mouseEvent - The mouse event object want to know.
     * @returns {number} - The value of meaning which button is clicked?
     */
    getMouseButton: function(mouseEvent) {
        var button,
            primary = '0,1,3,5,7',
            secondary = '2,6',
            wheel = '4';

        /* istanbul ignore else */
        if (document.implementation.hasFeature('MouseEvents', '2.0')) {
            return mouseEvent.button;
        }

        button = String(mouseEvent.button);
        if (primary.indexOf(button) > -1) {
            return 0;
        }
        if (secondary.indexOf(button) > -1) {
            return 2;
        }
        if (~wheel.indexOf(button)) {
            return 1;
        }

        return -1;
    }
};

module.exports = domevent;



/***/ }),

/***/ "./src/js/common/domutil.js":
/*!**********************************!*\
  !*** ./src/js/common/domutil.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint complexity: 0, no-shadow: 0, max-nested-callbacks: 0  */
/**
 * @fileoverview Utility modules for manipulate DOM elements.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var domevent = __webpack_require__(/*! ./domevent */ "./src/js/common/domevent.js");
var Collection = __webpack_require__(/*! ./collection */ "./src/js/common/collection.js");
var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var posKey = '_pos',
    domutil;

var CSS_AUTO_REGEX = /^auto$|^$|%/;

/**
 * Trim leading, trailing whitespace
 * @param {string} str - string to trim
 * @returns {string} trimmed string
 */
function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

domutil = {
    /**
     * Create DOM element and return it.
     * @param {string} tagName Tag name to append.
     * @param {HTMLElement} [container] HTML element will be parent to created element.
     * if not supplied, will use **document.body**
     * @param {string} [className] Design class names to appling created element.
     * @returns {HTMLElement} HTML element created.
     */
    appendHTMLElement: function(tagName, container, className) {
        var el;

        className = className || '';

        el = document.createElement(tagName);
        el.className = className;

        if (container) {
            container.appendChild(el);
        } else {
            document.body.appendChild(el);
        }

        return el;
    },

    /**
     * Remove element from parent node.
     * @param {HTMLElement} el - element to remove.
     */
    remove: function(el) {
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    },

    /**
     * Get element by id
     * @param {string} id element id attribute
     * @returns {HTMLElement} element
     */
    get: function(id) {
        return document.getElementById(id);
    },

    /**
     * Check supplied element is matched selector.
     * @param {HTMLElement} el - element to check
     * @param {string} selector - selector string to check
     * @returns {boolean} match?
     */
    _matcher: function(el, selector) {
        var cssClassSelector = /^\./,
            idSelector = /^#/;

        if (cssClassSelector.test(selector)) {
            return domutil.hasClass(el, selector.replace('.', ''));
        }
        if (idSelector.test(selector)) {
            return el.id === selector.replace('#', '');
        }

        return el.nodeName.toLowerCase() === selector.toLowerCase();
    },

    /**
     * Find DOM element by specific selectors.
     * below three selector only supported.
     *
     * 1. css selector
     * 2. id selector
     * 3. nodeName selector
     * @param {string} selector selector
     * @param {(HTMLElement|string)} [root] You can assign root element to find
     *  if not supplied, document.body will use.
     * @param {boolean|function} [multiple=false] - set true then return all
     *  elements that meet condition, if set function then use it filter function.
     * @returns {HTMLElement} HTML element finded.
     */
    find: function(selector, root, multiple) {
        var result = [],
            found = false,
            isFirst = util.isUndefined(multiple) || multiple === false,
            isFilter = util.isFunction(multiple);

        if (util.isString(root)) {
            root = domutil.get(root);
        }

        root = root || window.document.body;

        /**
         * Function for recursive find specific node
         * @param {HTMLElement} el - element to search
         * @param {string} selector - selector
         */
        function recurse(el, selector) {
            var childNodes = el.childNodes,
                i = 0,
                len = childNodes.length,
                cursor;

            for (; i < len; i += 1) {
                cursor = childNodes[i];

                if (cursor.nodeName === '#text') {
                    continue;
                }

                if (domutil._matcher(cursor, selector)) {
                    if ((isFilter && multiple(cursor)) || !isFilter) {
                        result.push(cursor);
                    }

                    if (isFirst) {
                        found = true;
                        break;
                    }
                } else if (cursor.childNodes.length > 0) {
                    recurse(cursor, selector);
                    if (found) {
                        break;
                    }
                }
            }
        }

        recurse(root, selector);

        return isFirst ? (result[0] || null) : result;
    },

    /**
     * Find parent element recursively.
     * @param {HTMLElement} el - base element to start find.
     * @param {string} selector - selector string for find
     * @param {boolean} excludeEl - exclude the base element to find
     * @returns {HTMLElement} - element finded or null.
     */
    closest: function(el, selector, excludeEl) {
        var parent = el.parentNode;

        if (!excludeEl && domutil._matcher(el, selector)) {
            return el;
        }

        while (parent && parent !== window.document.body) {
            if (domutil._matcher(parent, selector)) {
                return parent;
            }

            parent = parent.parentNode;
        }

        return null;
    },

    /**
     * Return texts inside element.
     * @param {HTMLElement} el target element
     * @returns {string} text inside node
     */
    text: function(el) {
        var ret = '',
            i = 0,
            nodeType = el.nodeType;

        if (nodeType) {
            if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                // nodes that available contain other nodes
                if (typeof el.textContent === 'string') {
                    return el.textContent;
                }

                for (el = el.firstChild; el; el = el.nextSibling) {
                    ret += domutil.text(el);
                }
            } else if (nodeType === 3 || nodeType === 4) {
                // TEXT, CDATA SECTION
                return el.nodeValue;
            }
        } else {
            for (; el[i]; i += 1) {
                ret += domutil.text(el[i]);
            }
        }

        return ret;
    },

    /**
     * Set data attribute to target element
     * @param {HTMLElement} el - element to set data attribute
     * @param {string} key - key
     * @param {string|number} data - data value
     */
    setData: function(el, key, data) {
        if ('dataset' in el) {
            el.dataset[key] = data;

            return;
        }

        el.setAttribute('data-' + key, data);
    },

    /**
     * Get data value from data-attribute
     * @param {HTMLElement} el - target element
     * @param {string} key - key
     * @returns {string} value
     */
    getData: function(el, key) {
        if ('dataset' in el) {
            return el.dataset[key];
        }

        return el.getAttribute('data-' + key);
    },

    /**
     * Check element has specific design class name.
     * @param {HTMLElement} el target element
     * @param {string} name css class
     * @returns {boolean} return true when element has that css class name
     */
    hasClass: function(el, name) {
        var className;

        if (!util.isUndefined(el.classList)) {
            return el.classList.contains(name);
        }

        className = domutil.getClass(el);

        return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
    },

    /**
     * Add design class to HTML element.
     * @param {HTMLElement} el target element
     * @param {string} name css class name
     */
    addClass: function(el, name) {
        var className;

        if (!util.isUndefined(el.classList)) {
            util.forEachArray(name.split(' '), function(value) {
                el.classList.add(value);
            });
        } else if (!domutil.hasClass(el, name)) {
            className = domutil.getClass(el);
            domutil.setClass(el, (className ? className + ' ' : '') + name);
        }
    },

    /**
     *
     * Overwrite design class to HTML element.
     * @param {HTMLElement} el target element
     * @param {string} name css class name
     */
    setClass: function(el, name) {
        if (util.isUndefined(el.className.baseVal)) {
            el.className = name;
        } else {
            el.className.baseVal = name;
        }
    },

    /**
     * Element에 cssClass속성을 제거하는 메서드
     * Remove specific design class from HTML element.
     * @param {HTMLElement} el target element
     * @param {string} name class name to remove
     */
    removeClass: function(el, name) {
        var removed = '';

        if (!util.isUndefined(el.classList)) {
            el.classList.remove(name);
        } else {
            removed = (' ' + domutil.getClass(el) + ' ').replace(' ' + name + ' ', ' ');
            domutil.setClass(el, trim(removed));
        }
    },

    /**
     * Get HTML element's design classes.
     * @param {HTMLElement} el target element
     * @returns {string} element css class name
     */
    getClass: function(el) {
        if (!el || !el.className) {
            return '';
        }

        return util.isUndefined(el.className.baseVal) ? el.className : el.className.baseVal;
    },

    /**
     * Get specific CSS style value from HTML element.
     * @param {HTMLElement} el target element
     * @param {string} style css attribute name
     * @returns {(string|null)} css style value
     */
    getStyle: function(el, style) {
        var value = el.style[style] || (el.currentStyle && el.currentStyle[style]),
            css;

        if ((!value || value === 'auto') && document.defaultView) {
            css = document.defaultView.getComputedStyle(el, null);
            value = css ? css[style] : null;
        }

        return value === 'auto' ? null : value;
    },

    /**
     * get element's computed style values.
     *
     * in lower IE8. use polyfill function that return object. it has only one function 'getPropertyValue'
     * @param {HTMLElement} el - element want to get style.
     * @returns {object} virtual CSSStyleDeclaration object.
     */
    getComputedStyle: function(el) {
        var defaultView = document.defaultView;

        if (!defaultView || !defaultView.getComputedStyle) {
            return {
                getPropertyValue: function(prop) {
                    /* eslint-disable no-useless-escape */
                    var re = /(\-([a-z]){1})/g;
                    if (prop === 'float') {
                        prop = 'styleFloat';
                    }

                    if (re.test(prop)) {
                        prop = prop.replace(re, function() {
                            return arguments[2].toUpperCase();
                        });
                    }

                    return el.currentStyle[prop] ? el.currentStyle[prop] : null;
                }
            };
        }

        return document.defaultView.getComputedStyle(el);
    },

    /**
     * Set position CSS style.
     * @param {HTMLElement} el target element
     * @param {number} [x=0] left pixel value.
     * @param {number} [y=0] top pixel value.
     */
    setPosition: function(el, x, y) {
        x = util.isUndefined(x) ? 0 : x;
        y = util.isUndefined(y) ? 0 : y;

        el[posKey] = [x, y];

        el.style.left = util.isNumber(x) ? (x + 'px') : x;
        el.style.top = util.isNumber(y) ? (y + 'px') : y;
    },

    /**
     * Set position CSS style with left, top, right, bottom
     * @param {HTMLElement} el target element
     * @param {object} ltrb object of left, top, right, bottom
     * @param {number} [ltrb.left] left pixel value.
     * @param {number} [ltrb.top] top pixel value.
     * @param {number} [ltrb.right] right pixel value.
     * @param {number} [ltrb.bottom] bottom pixel value.
     */
    setLTRB: function(el, ltrb) {
        var props = ['left', 'top', 'right', 'bottom'];
        var value;
        props.forEach(function(prop) {
            value = util.isUndefined(ltrb[prop]) ? '' : ltrb[prop];
            el.style[prop] = util.isNumber(value) ? (value + 'px') : value;
        });
    },

    /**
     * Get position from HTML element.
     * @param {HTMLElement} el target element
     * @param {boolean} [clear=false] clear cache before calculating position.
     * @returns {number[]} point
     */
    getPosition: function(el, clear) {
        var left,
            top,
            bound;

        if (clear) {
            el[posKey] = null;
        }

        if (el[posKey]) {
            return el[posKey];
        }

        left = 0;
        top = 0;

        if ((CSS_AUTO_REGEX.test(el.style.left) || CSS_AUTO_REGEX.test(el.style.top)) &&
            'getBoundingClientRect' in el) {
            // When the element's left or top is 'auto'
            bound = el.getBoundingClientRect();

            left = bound.left;
            top = bound.top;
        } else {
            left = parseFloat(el.style.left || 0);
            top = parseFloat(el.style.top || 0);
        }

        return [left, top];
    },

    /**
     * Return element's size
     * @param {HTMLElement} el target element
     * @returns {number[]} width, height
     */
    getSize: function(el) {
        var bound,
            width = domutil.getStyle(el, 'width'),
            height = domutil.getStyle(el, 'height');

        if ((CSS_AUTO_REGEX.test(width) || CSS_AUTO_REGEX.test(height) ||
             util.isNull(width) || util.isNull(height)) &&
            'getBoundingClientRect' in el) {
            bound = el.getBoundingClientRect();
            width = bound.width || el.offsetWidth;
            height = bound.height || el.offsetHeight;
        } else {
            width = parseFloat(width || 0);
            height = parseFloat(height || 0);
        }

        return [width, height];
    },

    /**
     * Fallback of getBoundingClientRect
     * @param {HTMLElement} el - element
     * @returns {object} rect
     */
    getBCRect: function(el) {
        var rect = el.getBoundingClientRect();

        rect = util.extend({
            width: el.offsetWidth,
            height: el.offsetHeight
        }, rect);

        return rect;
    },

    /**
     * Check specific CSS style is available.
     * @param {array} props property name to testing
     * @returns {(string|boolean)} return true when property is available
     * @example
     * var props = ['transform', '-webkit-transform'];
     * domutil.testProp(props);    // 'transform'
     */
    testProp: function(props) {
        var style = document.documentElement.style,
            i = 0,
            len = props.length;

        for (; i < len; i += 1) {
            if (props[i] in style) {
                return props[i];
            }
        }

        return false;
    },

    /**
     * Get form data
     * @param {HTMLFormElement} formElement - form element to extract data
     * @returns {object} form data
     */
    getFormData: function(formElement) {
        var groupedByName = new Collection(function() {
                return this.length;
            }),
            noDisabledFilter = function(el) {
                return !el.disabled;
            },
            output = {};

        groupedByName.add.apply(
            groupedByName,
            domutil.find('input', formElement, noDisabledFilter)
                .concat(domutil.find('select', formElement, noDisabledFilter))
                .concat(domutil.find('textarea', formElement, noDisabledFilter))
        );

        groupedByName = groupedByName.groupBy(function(el) {
            return (el && el.getAttribute('name')) || '_other';
        });

        util.forEach(groupedByName, function(elements, name) {
            if (name === '_other') {
                return;
            }

            elements.each(function(el) {
                var nodeName = el.nodeName.toLowerCase(),
                    type = el.type,
                    result = [];

                if (type === 'radio') {
                    result = [elements.find(function(el) {
                        return el.checked;
                    }).toArray().pop()];
                } else if (type === 'checkbox') {
                    result = elements.find(function(el) {
                        return el.checked;
                    }).toArray();
                } else if (nodeName === 'select') {
                    elements.find(function(el) {
                        return !!el.childNodes.length;
                    }).each(function(el) {
                        result = result.concat(
                            domutil.find('option', el, function(opt) {
                                return opt.selected;
                            })
                        );
                    });
                } else {
                    result = elements.find(function(el) {
                        return el.value !== '';
                    }).toArray();
                }

                result = util.map(result, function(el) {
                    return el.value;
                });

                if (!result.length) {
                    result = '';
                } else if (result.length === 1) {
                    result = result[0];
                }

                output[name] = result;
            });
        });

        return output;
    }
};

/*eslint-disable*/
var userSelectProperty = domutil.testProp([
    'userSelect',
    'WebkitUserSelect',
    'OUserSelect',
    'MozUserSelect',
    'msUserSelect'
]);
var supportSelectStart = 'onselectstart' in document;
var prevSelectStyle = '';
/* eslint-enable*/

/**
 * Disable browser's text selection behaviors.
 * @method
 */
domutil.disableTextSelection = (function() {
    if (supportSelectStart) {
        return function(dom) {
            domevent.on(dom, 'selectstart', domevent.preventDefault);
        };
    }

    return function(dom) {
        var style = dom.style;
        prevSelectStyle = style[userSelectProperty];
        style[userSelectProperty] = 'none';
    };
})();

/**
 * Enable browser's text selection behaviors.
 * @method
 */
domutil.enableTextSelection = (function() {
    if (supportSelectStart) {
        return function() {
            domevent.off(window, 'selectstart', domevent.preventDefault);
        };
    }

    return function() {
        document.documentElement.style[userSelectProperty] = prevSelectStyle;
    };
})();

/**
 * Disable browser's image drag behaviors.
 */
domutil.disableImageDrag = function() {
    domevent.on(window, 'dragstart', domevent.preventDefault);
};

/**
 * Enable browser's image drag behaviors.
 */
domutil.enableImageDrag = function() {
    domevent.off(window, 'dragstart', domevent.preventDefault);
};

module.exports = domutil;


/***/ }),

/***/ "./src/js/common/dw.js":
/*!*****************************!*\
  !*** ./src/js/common/dw.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Wrapper module for easy calc date object
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var TZDate = __webpack_require__(/*! ../common/timezone */ "./src/js/common/timezone.js").Date;

/**
 * @constructor
 * @param {Date} date to wrapping DW class
 */
function DW(date) {
    if (!(this instanceof DW)) {
        return new DW(date);
    }

    if (!(date instanceof TZDate)) {
        date = new TZDate(date);
    }

    /**
     * @type {Date}
     */
    this.d = date;
}

/**
 * Return d property when supplied object is DW. else return itself
 * @param {*} obj - object
 * @returns {Date} date
 */
DW.prototype.safe = function(obj) {
    if (obj.constructor === DW) {
        return obj.d;
    }

    return obj;
};

/**
 * Clone DW object
 * @returns {DW} cloned dwrap object
 */
DW.prototype.clone = function() {
    return new DW(new TZDate(Number(this.d)));
};

/**
 * Add days
 * @param {number} day - day to add
 * @returns {DW} wrapper object
 */
DW.prototype.addDate = function(day) {
    this.d.setDate(this.d.getDate() + day);

    return this;
};

/**
 * Add month.
 * @param {number} m - month to add
 * @returns {DW} wrapper object
 */
DW.prototype.addMonth = function(m) {
    var currentMonth = this.d.getMonth();
    var currentDay = this.d.getDate();
    var leapYear = this._isLeapYear();
    var targetMonth = currentMonth + m;
    var clone = this.clone();
    var targetDaysOfMonth = currentDay;

    if (m) {
        if (targetMonth === 1) {
            targetDaysOfMonth = leapYear ? 29 : 28;
        } else {
            if (m > 0) {
                clone.d.setMonth(targetMonth + 1, 0);
            } else {
                clone.d.setMonth(currentMonth, 0);
            }
            targetDaysOfMonth = clone.d.getDate();
        }
    }

    this.d.setMonth(targetMonth, Math.min(currentDay, targetDaysOfMonth));

    return this;
};

/**
 * Is leap year or not
 * @returns {boolean}
 */
DW.prototype._isLeapYear = function() {
    var year = this.d.getFullYear();

    return ((year % 4 === 0) && (year % 100 !== 0)) || !(year % 400);
};

/**
 * Set hour, minutes, seconds, milliseconds
 * @param {number} h - hours
 * @param {number} m - minutes
 * @param {number} s - seconds
 * @param {number} ms - milliseconds
 * @returns {DW} wrapper object
 */
DW.prototype.setHours = function(h, m, s, ms) {
    this.d.setHours(h, m, s, ms);

    return this;
};

/**
 * Whether date is between supplied dates?
 * @param {Date|DW} d1 - from date
 * @param {Date|DW} d2 - to date
 * @returns {boolean} is between?
 */
DW.prototype.isBetween = function(d1, d2) {
    var safe = this.safe;

    return safe(d1) <= this.d && this.d <= safe(d2);
};

module.exports = DW;


/***/ }),

/***/ "./src/js/common/floatingLayer.js":
/*!****************************************!*\
  !*** ./src/js/common/floatingLayer.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Floating layer module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../config */ "./src/js/config.js"),
    domutil = __webpack_require__(/*! ../common/domutil */ "./src/js/common/domutil.js"),
    View = __webpack_require__(/*! ../view/view */ "./src/js/view/view.js");

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for floating layer module
 * @param {HTMLElement} container - parent continer for floating layer
 */
function FloatingLayer(options, container) {
    var sibling = container[FloatingLayer.PROP_KEY],
        layerContainer;

    if (!sibling) {
        sibling = container[FloatingLayer.PROP_KEY] = [];
    }

    sibling.push(this);

    /**
     * @type {Collection}
     */
    this.sibling = sibling;

    /**
     * @type {number}
     */
    this.zIndex = this.getLargestZIndex() || FloatingLayer.INIT_ZINDEX;

    layerContainer = document.createElement('div');
    layerContainer.style.display = 'none';
    layerContainer.style.position = 'absolute';
    domutil.addClass(layerContainer, config.classname('floating-layer'));
    container.appendChild(layerContainer);

    View.call(this, layerContainer);

    /**
     * @type {HTMLElement}
     */
    this.parent = container;
}

util.inherit(FloatingLayer, View);

/**
 * @const
 */
FloatingLayer.PROP_KEY = '__fe_floating_layer';

/**
 * @const
 */
FloatingLayer.INIT_ZINDEX = 999;

/**
 * Destroy floating layer instance. if there no instnace in parent container
 *
 * remove instance cache property in container element
 */
FloatingLayer.prototype.destroy = function() {
    var parent = this.parent,
        sibling = this.sibling,
        i = 0, cnt = sibling.length;

    for (; i < cnt; i += 1) {
        if (sibling[i] === this) {
            sibling.splice(i, 1);
            break;
        }
    }

    if (!sibling.length) {
        try {
            delete parent[FloatingLayer.PROP_KEY];
        } catch (e) {
            parent[FloatingLayer.PROP_KEY] = null;
        }

        parent.style.position = '';
    }

    domutil.remove(this.container);

    this.sibling = null;

    View.prototype.destroy.call(this);
};

/**
 * @returns {boolean} whether layer is visible?
 */
FloatingLayer.prototype.isVisible = function() {
    return this.container.style.display !== 'none';
};

/**
 * Set layer position
 * @param {number} x - x coordinate of layer
 * @param {number} y - y coordinate of layer
 */
FloatingLayer.prototype.setPosition = function(x, y) {
    domutil.setPosition(this.container, x, y);
};

/**
 * Set layer left, top, right, bottom position
 * @param {object} ltrb object of left, top, right, bottom
 * @param {number} [ltrb.left] left pixel value.
 * @param {number} [ltrb.top] top pixel value.
 * @param {number} [ltrb.right] right pixel value.
 * @param {number} [ltrb.bottom] bottom pixel value.
 */
FloatingLayer.prototype.setLTRB = function(ltrb) {
    domutil.setLTRB(this.container, ltrb);
};

/**
 * Set layer size
 * @param {number|string} w - layer width
 * @param {number|string} h - layer height
 */
FloatingLayer.prototype.setSize = function(w, h) {
    var container = this.container;

    w = util.isNumber(w) ? w + 'px' : w;
    h = util.isNumber(h) ? h + 'px' : h;

    container.style.width = w;
    container.style.height = h;
};

/**
 * Set layer content
 * @param {string} html - html string
 */
FloatingLayer.prototype.setContent = function(html) {
    this.container.innerHTML = html;
};

/**
 * Get largest z-index from sibling layers
 * @returns {number} largest z-index value
 */
FloatingLayer.prototype.getLargestZIndex = function() {
    var zIndexes = util.map(this.sibling, function(layer) {
        return layer.zIndex;
    });

    return Math.max.apply(null, zIndexes);
};

/**
 * Set focus to layer
 */
FloatingLayer.prototype.focus = function() {
    var zIndexForShow = this.getLargestZIndex() + 1;
    this.container.style.zIndex = this.zIndex = zIndexForShow;
};

/**
 * Show layer
 */
FloatingLayer.prototype.show = function() {
    this.focus();
    this.container.style.display = 'block';
};

/**
 * Hide layer
 */
FloatingLayer.prototype.hide = function() {
    this.container.style.display = 'none';
};

module.exports = FloatingLayer;



/***/ }),

/***/ "./src/js/common/model.js":
/*!********************************!*\
  !*** ./src/js/common/model.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Mixin module for models.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var TZDate = __webpack_require__(/*! ../common/timezone */ "./src/js/common/timezone.js").Date;
var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var spaceRx = /^\s*|\s*$/g,
    model;

var datetime = __webpack_require__(/*! ../common/datetime */ "./src/js/common/datetime.js");

/**
 * Mixin module for models.
 * @mixin
 */
model = {
    /**
     * string trim
     * @param {string} str string to trim
     * @returns {string} trimed string
     */
    trim: function(str) {
        return str.replace(spaceRx, '');
    },
    /**
     * The collections of validator functions.
     */
    validators: {
        /**
         * check all of supplied fields(property) is not undefined or empty string.
         * @param {object} instance model instance.
         * @param {string[]} fields property names to check.
         * @returns {boolean} return true when supplied fields are not undefined or empty string.
         */
        required: function(instance, fields) {
            var valid = true,
                isValid = function(obj) {
                    return !util.isUndefined(obj) && model.trim(obj) !== '';
                };

            util.forEach(fields, function(fieldName) {
                valid = isValid(instance[fieldName]);

                return valid;
            });

            return valid;
        },

        /**
         * check supplied fields are valid dates and valid date ranges.
         * @param {object} instance model instance.
         * @param {Date[]} fields array of date range (start, end)
         * @returns {boolean} is valid date range?
         */
        dateRange: function(instance, fields) {
            var start, end;

            if (!util.isExisty(instance) || fields.length !== 2) {
                return true;
            }

            start = new TZDate(instance[fields[0]]);
            end = new TZDate(instance[fields[1]]);

            if (!datetime.isValid(start) || !datetime.isValid(end)) {
                return false;
            }

            if (datetime.compare(start, end) === 1) {
                return false;
            }

            return true;
        }
    },

    /**
     * Check validate for model instance.
     *
     * The validate are works on a basis of constructor's "schema" property.
     *
     * You can customize validators add some method to model#validators.
     * @returns {Boolean} model is valid?
     */
    isValid: function() {
        var self = this,
            schema = this.constructor.schema,
            validators = model.validators,
            validator,
            valid = true;

        if (!schema) {
            return true;
        }

        util.forEach(schema, function(values, validatorName) {
            validator = validators[validatorName];

            if (validator) {
                valid = validator(self, values);

                return valid; // returning false can stop this loop
            }

            return true;
        });

        return valid;
    },

    /**
     * Make data object form instance.
     *
     * It return object fill with all owned properties but exclude functions.
     * @returns {object} Data object
     */
    parameterize: function() {
        var param = {},
            isFunc = util.isFunction;

        util.forEach(this, function(value, propName) {
            if (!isFunc(value)) {
                param[propName] = value;
            }
        });

        return param;
    },

    /**
     * Mixin model module to supplied target.
     * @param {Object} target The object of want to mixed.
     * @example
     * function Man() {
     *     this.name = 'john';
     * }
     * model.mixin(Man.prototype);
     */
    mixin: function(target) {
        util.forEach(model, function(method, name) {
            if (name !== 'mixin') {
                target[name] = method;
            }
        });
    }
};

module.exports = model;



/***/ }),

/***/ "./src/js/common/point.js":
/*!********************************!*\
  !*** ./src/js/common/point.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview
 * Class for represent two dimensional x, y coordinates.
 *
 * It suppliy a group of functions for manipulate coordinates.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @example
 * var p = point(10, 10);
 * var r1 = p.add(Point(5, 5));
 * console.log(p.toString())    // "Point(10, 10)"
 * console.log(r1.toString())    // "Point(15, 15)"
 *
 * var p2 = new Point(10, 10);
 * p2._add(point(5, 5));
 * console.log(p2.toString())   // "Point(15, 15)"
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

/**
 * Class for represent two dimentional x, y coordinates.
 * @constructor
 * @param {number} x The number of X coordinates.
 * @param {number} y The number of Y coordinates.
 * @param {boolean} [useRound=false] set true when each coordinates are rounded before initialize.
 * @example
 * var t = new Point(13, 5);
 */
function Point(x, y, useRound) {
    /**
     * @type {number}
     */
    this.x = (useRound ? Math.round(x) : x);

    /**
     * @type {number}
     */
    this.y = (useRound ? Math.round(y) : y);
}

/**********
 * static props
 **********/

/**
 * Calculate point ratio.
 * @param {Point} point The instance of point.
 * @param {number} factor From factor
 * @param {number} toFactor To factor
 * @returns {Point} Point instance calculated.
 */
Point.getRatio = function(point, factor, toFactor) {
    if (factor === toFactor) {
        return point.clone();
    }

    return point.multiplyBy(toFactor)._divideBy(factor);
};

/**
 * Syntatic sugar of new Point()
 * @param {(Point|number|number[])} x X coordinate value.
 * @param {(number|boolean)} [y] Y coordinate value or boolean value for coordinates round.
 * @param {boolean} [useRound] Set true then round initial coordinate values.
 * @returns {Point} The instance of point.
 * @example
 * var p1 = point(10, 15);
 * var p2 = point([10, 15]);
 */
Point.n = function(x, y, useRound) {
    if (x instanceof Point) {
        return x;
    }

    if (util.isArray(x)) {
        return new Point(x[0], x[1], y);
    }

    return new Point(x, y, useRound);
};

/**********
 * prototype props
 **********/

/**
 * Clone points
 * @returns {Point} The point instance cloned.
 */
Point.prototype.clone = function() {
    return new Point(this.x, this.y);
};

/**
 * Add points.
 * @param {Point} point The point instance to add.
 * @returns {Point} Point calculated.
 */
Point.prototype.add = function(point) {
    return this.clone()._add(Point.n(point));
};

/**
 * Add self points.
 * @param {Point} point The point instance to add.
 * @returns {Point} Point calculated.
 */
Point.prototype._add = function(point) {
    this.x += point.x;
    this.y += point.y;

    return this;
};

/**
 * Subtract points.
 * @param {Point} point The point instance to subtract.
 * @returns {Point} Point calculated.
 */
Point.prototype.subtract = function(point) {
    return this.clone()._subtract(Point.n(point));
};

/**
 * Subtract points. (manipulate self)
 * @param {Point} point The point instance to subtract.
 * @returns {Point} Point calculated.
 */
Point.prototype._subtract = function(point) {
    this.x -= point.x;
    this.y -= point.y;

    return this;
};

/**
 * Divide points.
 * @param {number} num The number to divide.
 * @returns {Point} Point calculated.
 */
Point.prototype.divideBy = function(num) {
    return this.clone()._divideBy(num);
};

/**
 * Divide points. (manipulate self)
 * @param {number} num The number to divide.
 * @returns {Point} Point calculated.
 */
Point.prototype._divideBy = function(num) {
    this.x /= num;
    this.y /= num;

    return this;
};

/**
 * Multiply coordinates.
 * @param {number} num Thyen number to multiply
 * @returns {Point} Point calculated.
 */
Point.prototype.multiplyBy = function(num) {
    return this.clone()._multiplyBy(num);
};

/**
 * Multiply self coordinates.
 * @param {number} num The number to multiply.
 * @returns {Point} Point calculated.
 */
Point.prototype._multiplyBy = function(num) {
    this.x *= num;
    this.y *= num;

    return this;
};

/**
 * Round coordinates.
 * @returns {Point} Point calculated.
 */
Point.prototype.round = function() {
    return this.clone()._round();
};

/**
 * Round self coordinates.
 * @returns {Point} Point calculated.
 */
Point.prototype._round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    return this;
};

/**
 * Reverse values between positive and negative.
 * @returns {Point} Point calculated.
 */
Point.prototype.reverse = function() {
    return this.clone()._reverse();
};

/**
 * Reverse self values between positive and negative.
 * @returns {Point} Point calculated.
 */
Point.prototype._reverse = function() {
    this.x *= -1;
    this.y *= -1;

    return this;
};

/**
 * Floor coordinates.
 * @returns {Point} Point calculated.
 */
Point.prototype.floor = function() {
    return this.clone()._floor();
};

/**
 * Floor self coordinates.
 * @returns {Point} Point calculated.
 */
Point.prototype._floor = function() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);

    return this;
};

/**
 * Ceil coordinates.
 * @returns {Point} Point calculated.
 */
Point.prototype.ceil = function() {
    return this.clone()._ceil();
};

/**
 * Ceil self coodinates.
 * @returns {Point} Point calculated.
 */
Point.prototype._ceil = function() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);

    return this;
};

/**
 * Rotate point.
 * @param {number} deg The number of rotate degree.
 * @param {Point} [center=this] Center point instance to use rotate center. use own when not supplied.
 * @param {number} [cos] Cosine values for rotate. it useful when multi point rotate.
 * @param {number} [sin] Sine values for rotate. it useful when multi point rotate.
 * @returns {Point} The point instance rotated.
 */
Point.prototype.rotate = function(deg, center, cos, sin) {
    return this.clone()._rotate(deg, center, cos, sin);
};

/**
 * Rotate self.
 * @param {number} deg The number of rotate degree.
 * @param {Point} [center=this] Center point instance to use rotate center. use own when not supplied.
 * @param {number} [cos] Cosine values for rotate. it useful when multi point rotate.
 * @param {number} [sin] Sine values for rotate. it useful when multi point rotate.
 * @returns {Point} The point instance rotated.
 */
Point.prototype._rotate = function(deg, center, cos, sin) {
    var rad = deg * (Math.PI / 180),
        x,
        y;

    cos = cos || parseFloat(Math.cos(rad).toFixed(8));
    sin = sin || parseFloat(Math.sin(rad).toFixed(8));

    this._subtract(center);

    x = this.x;
    y = this.y;

    this.x = (x * cos) - (y * sin);
    this.y = (x * sin) + (y * cos);

    this._add(center);

    return this;
};

/**
 * Calculate distance between two points.
 * @param {Point} point Point instance.
 * @returns {number} The number of distance between two points.
 */
Point.prototype.distanceTo = function(point) {
    var x,
        y;

    point = Point.n(point);

    x = point.x - this.x;
    y = point.y - this.y;

    return Math.sqrt((x * x) + (y * y));
};

/**
 * Check point equals.
 * @param {Point} point Point instance to compare
 * @returns {boolean} equality
 */
Point.prototype.equals = function(point) {
    point = Point.n(point);

    return point.x === this.x && point.y === this.y;
};

/**
 * Return formatted string. 'Point(x, y)'
 * @returns {string} string
 */
Point.prototype.toString = function() {
    return 'Point(' + this.x + ', ' + this.y + ')';
};

/**
 * Return coodinates to array. [x, y]
 * @returns {number[]} coordinate array.
 */
Point.prototype.toArray = function() {
    return [this.x, this.y];
};

module.exports = Point;



/***/ }),

/***/ "./src/js/common/reqAnimFrame.js":
/*!***************************************!*\
  !*** ./src/js/common/reqAnimFrame.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview RequestAnimFrame
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var requestFn,
    cancelFn;

/**
 * Get name with vendor prefix
 * @param {string} name - name to prepend prefix
 * @returns {string} vendor prefixed name
 */
function getPrefixed(name) {
    return global['webkit' + name] || global['moz' + name] || global['ms' + name];
}

requestFn = global.requestAnimationFrame ||
    getPrefixed('RequestAnimationFrame') ||
    function(fn, context) {
        fn.call(context);
    };

cancelFn = global.cancelAnimationFrame ||
    getPrefixed('CancelAnimationFrame') ||
    getPrefixed('CancelRequestAnimationFrame') ||
    function() {};

/**
 * @module module:reqAnimFrame
 */

module.exports = {
    /**
     * Shim of requestAnimationFrame
     * @param {function} fn callback function
     * @param {*} context context for callback
     * @returns {number} Unique id
     */
    requestAnimFrame: function(fn, context) {
        return requestFn.call(global, util.bind(fn, context));
    },

    /**
     * Shim of cancelAnimationFrame
     * @param {number} id requestAnimationFrame id
     */
    cancelAnimFrame: function(id) {
        if (!id) {
            return;
        }

        cancelFn.call(global, id);
    }
};


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/common/timezone.js":
/*!***********************************!*\
  !*** ./src/js/common/timezone.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview timezone
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */


var MIN_TO_MS = 60 * 1000;
var customOffsetMs = getTimezoneOffset();
var timezoneOffsetCallback = null;
var setByTimezoneOption = false;

var getterMethods = [
    'getDate',
    'getDay',
    'getFullYear',
    'getHours',
    'getMilliseconds',
    'getMinutes',
    'getMonth',
    'getSeconds'
];

var setterMethods = [
    'setDate',
    'setFullYear',
    'setHours',
    'setMilliseconds',
    'setMinutes',
    'setMonth',
    'setSeconds'
];

/**
 * Get the timezone offset by timestampe
 * @param {number} timestamp - timestamp
 * @returns {number} timezone offset
 * @private
 */
function getTimezoneOffset(timestamp) {
    timestamp = timestamp || Date.now();

    return new Date(timestamp).getTimezoneOffset() * MIN_TO_MS;
}

/**
 * Get the custome timezone offset by timestampe
 * @param {number} timestamp - timestamp
 * @returns {number} timezone offset
 * @private
 */
function getCustomTimezoneOffset(timestamp) {
    if (!setByTimezoneOption && timezoneOffsetCallback) {
        return timezoneOffsetCallback(timestamp) * MIN_TO_MS;
    }

    return customOffsetMs;
}

/**
 * Create a Date instance with multiple arguments
 * @param {Array} args - arguments
 * @returns {Date}
 * @private
 */
function createDateWithMultipleArgs(args) {
    var utc = Date.UTC.apply(null, args);

    return new Date(utc + getTimezoneOffset(utc));
}

/**
 * Create a Date instance with argument
 * @param {Date|TZDate|string|number} arg - arguments
 * @returns {Date}
 * @private
 */
function createDateWithSingleArg(arg) {
    var time;

    if (arg instanceof Date || arg instanceof TZDate) {
        time = arg.getTime();
    } else if ((typeof arg) === 'string') {
        time = Date.parse(arg);
    } else if ((typeof arg) === 'number') {
        time = arg;
    } else if (arg === null) {
        time = 0;
    } else {
        throw new Error('Invalid Type');
    }

    return new Date(time - getCustomTimezoneOffset(time) + getTimezoneOffset(time));
}

/**
 * Timezone Date Class
 * @constructor
 */
function TZDate() {
    var date;

    switch (arguments.length) {
        case 0:
            date = createDateWithSingleArg(Date.now());
            break;
        case 1:
            date = createDateWithSingleArg(arguments[0]);
            break;
        default:
            date = createDateWithMultipleArgs(arguments);
    }

    this._date = date;
}

/**
 * Get milliseconds which is converted by timezone
 * @returns {number} milliseconds
 */
TZDate.prototype.getTime = function() {
    var time = this._date.getTime();

    return time + getCustomTimezoneOffset(time) - getTimezoneOffset(time);
};

/**
 * toUTCString
 * @returns {Date}
 */
TZDate.prototype.toUTCString = function() {
    return this._date.toUTCString();
};

/**
 * to Date
 * @returns {Date}
 */
TZDate.prototype.toDate = function() {
    return this._date;
};

TZDate.prototype.valueOf = function() {
    return this.getTime();
};

getterMethods.forEach(function(methodName) {
    TZDate.prototype[methodName] = function() {
        return this._date[methodName].apply(this._date, arguments);
    };
});

setterMethods.forEach(function(methodName) {
    TZDate.prototype[methodName] = function() {
        this._date[methodName].apply(this._date, arguments);

        return this.getTime();
    };
});

module.exports = {
    Date: TZDate,

    /**
     * Set offset
     * @param {number} offset - timezone offset based on minutes
     */
    setOffset: function(offset) {
        customOffsetMs = offset * MIN_TO_MS;
    },

    /**
     * Set offset
     * @param {number} offset - timezone offset based on minutes
     */
    setOffsetByTimezoneOption: function(offset) {
        this.setOffset(-offset);
        setByTimezoneOption = true;
    },

    /**
     * Get offset in case of `setByTimezoneOption`. Or return 0.
     * @returns {number} timezone offset offset minutes
     */
    getOffset: function() {
        if (setByTimezoneOption) {
            return customOffsetMs / MIN_TO_MS;
        }

        return 0;
    },

    /**
     * Set a callback function to get timezone offset by timestamp
     * @param {function} callback - callback function
     */
    setOffsetCallback: function(callback) {
        timezoneOffsetCallback = callback;
    },

    /**
     * (Use this method only for testing)
     * Reset system timezone and custom timezone
     */
    restoreOffset: function() {
        customOffsetMs = getTimezoneOffset();
    }
};


/***/ }),

/***/ "./src/js/common/vlayout.js":
/*!**********************************!*\
  !*** ./src/js/common/vlayout.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Layout module that supplied split height, resize height features.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../config */ "./src/js/config.js"),
    common = __webpack_require__(/*! ./common */ "./src/js/common/common.js"),
    domutil = __webpack_require__(/*! ./domutil */ "./src/js/common/domutil.js"),
    domevent = __webpack_require__(/*! ./domevent */ "./src/js/common/domevent.js"),
    View = __webpack_require__(/*! ../view/view */ "./src/js/view/view.js"),
    VPanel = __webpack_require__(/*! ./vpanel */ "./src/js/common/vpanel.js"),
    Drag = __webpack_require__(/*! ../handler/drag */ "./src/js/handler/drag.js");

var mAbs = Math.abs;

/**
 * @typedef PanelOptions
 * @type {object}
 * @property {number} [minHeight=0] - minimum height of panel
 * @property {number} [height=0] - current panel height
 * @property {boolean} [splitter=false] - is this panel uses splitter?
 * @property {boolean} [autoHeight=false] - is this panel uses remain height of container?
 * @property {string} [className=''] - className string for add created element
 */

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for VLayout module
 *  @param {PanelOptions[]} [options.panels] - panels to add layout when initialize
 *  @param {number[]} [options.panelHeights] - panel height list
 * @param {HTMLElement} container - container element
 * @param {Theme} theme - theme instance
 */
function VLayout(options, container, theme) {
    var opt, tempHeights;

    if (!(this instanceof VLayout)) {
        return new VLayout(options, container);
    }

    View.call(this, container);

    domutil.addClass(container, config.classname('vlayout-container'));

    /**
     * @type {object}
     */
    opt = this.options = util.extend({
        panels: [],
        panelHeights: []
    }, options);

    /**
     * @type {VPanel[]}
     */
    this.panels = [];

    /**
     * @type {Drag}
     */
    this._drag = new Drag({
        distance: 10,
        exclude: function(target) {
            return !domutil.hasClass(target, config.classname('splitter'));
        }
    }, container);

    this._drag.on({
        dragStart: this._onDragStart,
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    /**
     * @type {object}
     */
    this._dragData = null;

    /**
     * @type {Theme}
     */
    this.theme = theme;

    if (opt.panels.length) {
        if (opt.panelHeights.length) {
            tempHeights = opt.panelHeights.slice();
            util.forEach(opt.panels, function(panelOpt) {
                if (!panelOpt.isSplitter && !panelOpt.autoHeight) {
                    panelOpt.height = tempHeights.shift();
                }
            });
        }

        this.addPanels(opt.panels, this.container);
    }

    this.refresh();
}

util.inherit(VLayout, View);

/**
 * Get current panels height in layout
 * @returns {number[]} height of panels with `autoHeight` false
 */
VLayout.prototype.getLayoutData = function() {
    var heightList = [];

    util.forEach(this.panels, function(panel) {
        if (panel.isSplitter() || panel.options.autoHeight) {
            return;
        }

        heightList.push(panel.getHeight());
    });

    return heightList;
};

/**
 * Set panels height in layout
 * @param {number[]} heightList of panels with `autoHeight` false
 */
VLayout.prototype.setLayoutData = function(heightList) {
    if (!heightList.length) {
        return;
    }

    util.forEach(this.panels, function(panel) {
        if (panel.isSplitter() || panel.options.autoHeight) {
            return;
        }

        panel.setHeight(null, heightList.shift());
    });

    this.refresh();
};

/**
 * Get next panel instance by specific panel
 * @param {VPanel} panel - panel instance
 * @returns {VPanel} next panel
 */
VLayout.prototype.nextPanel = function(panel) {
    return this.panels[panel.index + 1];
};

/**
 * Get previous panel instance by specific panel
 * @param {VPanel} panel - panel instance
 * @returns {VPanel} previous panel
 */
VLayout.prototype.prevPanel = function(panel) {
    return this.panels[panel.index - 1];
};

/**
 * Initialize resizing guide element
 * @param {HTMLElement} element - element to use guide element after cloned
 * @param {number} top - top pixel value for guide element
 * @returns {HTMLElement} cloned element == guide element
 */
VLayout.prototype._initializeGuideElement = function(element, top) {
    var cloned = element.cloneNode(true);

    domutil.addClass(cloned, config.classname('splitter-guide'));
    this._refreshGuideElement(cloned, top);
    this.container.appendChild(cloned);

    return cloned;
};

/**
 * Refresh guide element position
 * @param {HTMLElement} element - guide element
 * @param {number} top - top pixel value for guide element
 */
VLayout.prototype._refreshGuideElement = function(element, top) {
    element.style.top = top + 'px';
};

/**
 * Clear guide element position
 * @param {HTMLElement} element - guide element
 */
VLayout.prototype._clearGuideElement = function(element) {
    domutil.remove(element);
};

/**
 * Resize overall panels size
 * @param {VPanel} splPanel - splitter panel instance
 * @param {number} startY - dragstart Y position
 * @param {number} mouseY - dragend Y position
 */
VLayout.prototype._resize = function(splPanel, startY, mouseY) {
    var diffY = startY - mouseY,
        resizedHeight = mAbs(diffY),
        resizeMap = [],
        toDown = mouseY > startY,
        backwardMethod = toDown ? 'prevPanel' : 'nextPanel',
        forwardMethod = toDown ? 'nextPanel' : 'prevPanel',
        cursor, resizeInfo;

    cursor = this[backwardMethod](splPanel);
    resizeInfo = cursor.getResizeInfoByGrowth(resizedHeight);
    resizeMap.push([cursor, resizeInfo[0]]);

    for (cursor = this[forwardMethod](cursor);
        util.isExisty(cursor);
        cursor = this[forwardMethod](cursor)) {
        if (cursor.isSplitter()) {
            continue;
        }

        resizeInfo = cursor.getResizeInfoByGrowth(-resizedHeight);
        resizeMap.push([cursor, resizeInfo[0]]);
        resizedHeight -= resizeInfo[1];
    }

    util.forEach(resizeMap, function(pair) {
        pair[0].setHeight(null, pair[1], true);
        pair[0].fire('resize');
    });
};

/**
 * Get summation of splitter and panel's minimum height upper and below of supplied splitter
 * @param {VPanel} splPanel - splitter panel instance
 * @returns {number[]} upper and below splitter's height and panel minimum height summation.
 */
VLayout.prototype._getMouseYAdditionalLimit = function(splPanel) {
    var upper = 0,
        below = 0,
        cursor,
        func = function(panel) {
            if (panel.isSplitter()) {
                return panel.getHeight();
            }

            return panel.options.minHeight;
        };

    for (cursor = this.prevPanel(splPanel);
        util.isExisty(cursor);
        cursor = this.prevPanel(cursor)) {
        upper += func(cursor);
    }

    for (cursor = this.nextPanel(splPanel);
        util.isExisty(cursor);
        cursor = this.nextPanel(cursor)) {
        below += func(cursor);
    }

    return [upper, below];
};

/**********
 * Drag Handlers
 **********/

/**
 * Drag start schedule handler
 * @param {object} e - drag start schedule data
 */
VLayout.prototype._onDragStart = function(e) {
    var oEvent = e.originEvent,
        target = e.target,
        splIndex = domutil.getData(target, 'panelIndex'),
        splPanel = this.panels[splIndex],
        splHeight = splPanel.getHeight(),
        splOffsetY = domevent.getMousePosition(oEvent, target)[1],
        mouseY = domevent.getMousePosition(oEvent, this.container)[1],
        guideElement = this._initializeGuideElement(target, mouseY);

    splPanel.addClass(config.classname('splitter-focused'));

    this._dragData = {
        splPanel: splPanel,
        splOffsetY: splOffsetY,
        guideElement: guideElement,
        startY: mouseY - splOffsetY,
        minY: 0,
        maxY: this.getViewBound().height - splHeight
    };

    if (!util.browser.msie) {
        domutil.addClass(document.body, config.classname('resizing'));
    }
};

/**
 * Drag schedule handler
 * @param {object} e - drag schedule data
 */
VLayout.prototype._onDrag = function(e) {
    var dragData = this._dragData,
        mouseY = domevent.getMousePosition(e.originEvent, this.container)[1];

    mouseY = common.limit(mouseY - dragData.splOffsetY, [dragData.minY], [dragData.maxY]);

    this._refreshGuideElement(dragData.guideElement, mouseY);
};

/**
 * Drag end schedule handler
 * @fires VLayout#resize
 * @param {object} e - dragend schedule data
 */
VLayout.prototype._onDragEnd = function(e) {
    var dragData = this._dragData,
        asideMinMax = this._getMouseYAdditionalLimit(dragData.splPanel),
        mouseY = domevent.getMousePosition(e.originEvent, this.container)[1];

    // mouseY value can't exceed summation of splitter height and panel's minimum height based on target splitter.
    mouseY = common.limit(
        mouseY - dragData.splOffsetY,
        [dragData.minY + asideMinMax[0]],
        [dragData.maxY - asideMinMax[1]]
    );

    this._resize(dragData.splPanel, dragData.startY, mouseY);

    /**
     * @event VLayout#resize
     * @type {object}
     * @property {number[]} layoutData - layout data after resized
     */
    this.fire('resize', {
        layoutData: this.getLayoutData()
    });

    this._dragData = null;
    this._clearGuideElement(dragData.guideElement);
    dragData.splPanel.removeClass(config.classname('splitter-focused'));
    domutil.removeClass(document.body, config.classname('resizing'));
};

/**********
 * Methods
 **********/

/**
 * refresh each panels
 */
VLayout.prototype.refresh = function() {
    var panelToFillHeight = [];
    var layoutHeight = this.getViewBound().height;
    var usedHeight = 0;
    var remainHeight;

    if (!layoutHeight) {
        return;
    }

    util.forEach(this.panels, function(panel) {
        if (panel.options.autoHeight) {
            panelToFillHeight.push(panel);
        } else {
            usedHeight += panel.getHeight();
        }
    });

    remainHeight = (layoutHeight - usedHeight) / panelToFillHeight.length;

    util.forEach(panelToFillHeight, function(panel) {
        panel.setHeight(null, remainHeight);
    });
};

/**
 * add panel
 * @param {PanelOptions} options - options for panel
 * @param {container} [container] - container element
 */
VLayout.prototype.addPanel = function(options, container) {
    var element = document.createElement('div'),
        panels = this.panels,
        index = panels.length;

    options = util.extend({
        index: index
    }, options);

    panels.push(new VPanel(options, element, this.theme));

    container.appendChild(element);
};

/**
 * Add multiple panel
 * @param {PanelOptions[]} options - panel options list
 * @param {HTMLElement} container - container element
 */
VLayout.prototype.addPanels = function(options, container) {
    var self = this,
        frag = document.createDocumentFragment();

    util.forEach(options, function(option) {
        self.addPanel(option, frag);
    });

    container.appendChild(frag);
};

/**
 * Get a panel by name
 * @param {string} name - panel's name
 * @returns {VPanel}
 */
VLayout.prototype.getPanelByName = function(name) {
    var found;
    util.forEach(this.panels, function(panel) {
        if (panel.name === name) {
            found = panel;
        }
    });

    return found;
};

module.exports = VLayout;


/***/ }),

/***/ "./src/js/common/vpanel.js":
/*!*********************************!*\
  !*** ./src/js/common/vpanel.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Panel class for VLayout module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../config */ "./src/js/config.js"),
    common = __webpack_require__(/*! ./common */ "./src/js/common/common.js"),
    domutil = __webpack_require__(/*! ./domutil */ "./src/js/common/domutil.js"),
    View = __webpack_require__(/*! ../view/view */ "./src/js/view/view.js");

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for VPanel
 *  @param {number} options.index - index of panel in vlayout
 *  @param {number} [options.minHeight=0] - minimum height of panel
 *  @param {number} [options.height] - initial height of panel
 *  @param {boolean} [options.isSplitter=false] - set true then this panel works splitter
 *  @param {boolean} [options.autoHeight=false] - set true then this panel use remain height after other panel resized.
 *  @param {string} [options.className] - additional class name to add element
 * @param {HTMLElement} container - container element
 * @param {Theme} theme - theme instance
 */
function VPanel(options, container, theme) {
    View.call(this, container);

    /**
     * @type {object}
     */
    this.options = util.extend({
        index: 0,
        name: '0',
        minHeight: 0,
        maxHeight: null,
        height: null,
        isSplitter: false,
        autoHeight: false,
        className: ''
    }, options);

    /**
     * @type {number}
     */
    this.index = this.options.index;

    /**
     * @type {string}
     */
    this.name = this.options.name || String(this.index);

    this.isHeightForcedSet = false;

    /**
     * @type {Theme}
     */
    this.theme = theme;

    this._initPanel(this.options, container);
}

util.inherit(VPanel, View);

/**
 * whether this panel is splitter?
 * @returns {boolean} panel is splitter?
 */
VPanel.prototype.isSplitter = function() {
    return this.options.isSplitter;
};

/**
 * set max height of panel
 * @param {number} maxHeight - maxHeight
 */
VPanel.prototype.setMaxHeight = function(maxHeight) {
    if (!this.options.autoHeight) {
        this.options.maxHeight = maxHeight;
    }
};

/**
 * set forced height flag
 * @param {boolean} set - enable or not
 */
VPanel.prototype.setHeightForcedSet = function(set) {
    this.isHeightForcedSet = set;
};

/**
 * get forced height flag
 * @returns {boolean} set - enable or not
 */
VPanel.prototype.getHeightForcedSet = function() {
    return this.isHeightForcedSet;
};

/**
 * set height of html element
 * @param {HTMLElement} [container] - container element
 * @param {number} newHeight - height
 * @param {boolean} force - whether ignore max-length
 */
VPanel.prototype.setHeight = function(container, newHeight, force) {
    var maxHeight = this.options.maxHeight;
    var minHeight = this.options.minHeight;
    var autoHeight = this.options.autoHeight;
    container = container || this.container;

    // 한번 force 호출이 일어난 이후에는 force 호출만 허용한다
    if (!force && this.isHeightForcedSet && !autoHeight) {
        return;
    }

    if (force) {
        this.isHeightForcedSet = true;
    } else if (maxHeight) {
        newHeight = Math.min(newHeight, maxHeight);
    }
    newHeight = Math.max(minHeight, newHeight);

    container.style.height = newHeight + 'px';
};

/**
 * Calculate new height of panel and remains by supplied height growth
 * @param {number} growth - growth value
 * @returns {number[]} newHeight, remainHeight
 */
VPanel.prototype.getResizeInfoByGrowth = function(growth) {
    var height = this.getHeight(),
        newHeight = height + growth,
        resizeTo = Math.max(0, newHeight, this.options.minHeight);

    return [resizeTo, height - resizeTo];
};

/**
 * get outer height of panel element
 * @returns {number} outer height of panel element
 */
VPanel.prototype.getHeight = function() {
    return domutil.getSize(this.container)[1];
};

/**
 * add design class to panel element
 * @param {string} className - classname string
 */
VPanel.prototype.addClass = function(className) {
    domutil.addClass(this.container, className);
};

/**
 * remove design class to panel element
 * @param {string} className - classname string
 */
VPanel.prototype.removeClass = function(className) {
    domutil.removeClass(this.container, className);
};

/**
 * initialize panel element
 * @param {PanelOptions} options - options for panel
 * @param {HTMLDivElement} container - panel element
 */
VPanel.prototype._initPanel = function(options, container) {
    var height;

    domutil.setData(container, 'panelIndex', options.index);

    if (options.isSplitter) {
        domutil.addClass(container, config.classname('splitter'));
        this.applyTheme();

        return;
    }

    if (options.className) {
        domutil.addClass(container, options.className);
    }

    if (options.autoHeight) {
        domutil.setData(container, 'autoHeight', true);
    } else {
        height = common.limit(options.height || 0,
            [options.minHeight],
            [options.maxHeight || options.height]
        );

        options.height = height;
        this.setHeight(container, height);
    }
};

VPanel.prototype.applyTheme = function() {
    var style = this.container.style;
    var theme = this.theme;

    if (!theme) {
        return;
    }

    style.borderTop = theme.week.vpanelSplitter.border || theme.common.border;
    style.borderBottom = theme.week.vpanelSplitter.border || theme.common.border;
    style.height = theme.week.vpanelSplitter.height;
};

module.exports = VPanel;



/***/ }),

/***/ "./src/js/config.js":
/*!**************************!*\
  !*** ./src/js/config.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Global configuration object module. This @echo syntax will change preprocess context. See gulpfile.js
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var cssPrefix = 'tui-full-calendar-',
    alldayGetViewID = new RegExp('^' + cssPrefix + 'weekday[\\s]tui-view-(\\d+)'),
    alldayCheckPermission = new RegExp('^' + cssPrefix + 'schedule(-title)?$'),
    timeGetViewID = new RegExp('^' + cssPrefix + 'time-date[\\s]tui-view-(\\d+)');

var config = {
    throwError: function(msg) {
        throw new Error(msg);
    },

    cssPrefix: cssPrefix,

    classname: function(str) {
        str = str || '';

        if (str.charAt(0) === '.') {
            return '.' + config.cssPrefix + str.slice(1);
        }

        return config.cssPrefix + str;
    },

    allday: {
        getViewIDRegExp: alldayGetViewID,
        checkCondRegExp: alldayCheckPermission
    },

    daygrid: {
        getViewIDRegExp: alldayGetViewID,
        checkCondRegExp: alldayCheckPermission
    },

    time: {
        getViewIDRegExp: timeGetViewID
    }
};

module.exports = config;



/***/ }),

/***/ "./src/js/controller/base.js":
/*!***********************************!*\
  !*** ./src/js/controller/base.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Base calendar controller
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var Schedule = __webpack_require__(/*! ../model/schedule */ "./src/js/model/schedule.js");
var ScheduleViewModel = __webpack_require__(/*! ../model/viewModel/scheduleViewModel */ "./src/js/model/viewModel/scheduleViewModel.js");
var datetime = __webpack_require__(/*! ../common/datetime */ "./src/js/common/datetime.js");
var common = __webpack_require__(/*! ../common/common */ "./src/js/common/common.js");
var Theme = __webpack_require__(/*! ../theme/theme */ "./src/js/theme/theme.js");

/**
 * @constructor
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @param {themeConfig} [options.theme] - theme object
 * @mixes util.CustomEvents
 */
function Base(options) {
    options = options || {};

    /**
     * function for group each schedule models.
     * @type {function}
     * @param {ScheduleViewModel} viewModel - view model instance
     * @returns {string} group key
     */
    this.groupFunc = options.groupFunc || function(viewModel) {
        var model = viewModel.model;

        if (viewModel.model.isAllDay) {
            return 'allday';
        }

        if (model.category === 'time' && (model.end - model.start > datetime.MILLISECONDS_PER_DAY)) {
            return 'allday';
        }

        return model.category;
    };

    /**
     * schedules collection.
     * @type {Collection}
     */
    this.schedules = common.createScheduleCollection();

    /**
     * Matrix for multidate schedules.
     * @type {object.<string, array>}
     */
    this.dateMatrix = {};

    /**
     * Theme
     * @type {Theme}
     */
    this.theme = new Theme(options.theme);

    /**
     * Calendar list
     * @type {Array.<Calendar>}
     */
    this.calendars = [];
}

/**
 * Calculate contain dates in schedule.
 * @private
 * @param {Schedule} schedule The instance of schedule.
 * @returns {array} contain dates.
 */
Base.prototype._getContainDatesInSchedule = function(schedule) {
    var range = datetime.range(
        datetime.start(schedule.getStarts()),
        datetime.end(schedule.getEnds()),
        datetime.MILLISECONDS_PER_DAY
    );

    return range;
};

/****************
 * CRUD Schedule
 ****************/

/**
 * Create an schedule instance from raw data.
 * @emits Base#beforeCreateSchedule
 * @emits Base#createdSchedule
 * @param {object} options Data object to create schedule.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {Schedule} The instance of Schedule that created.
 */
Base.prototype.createSchedule = function(options, silent) {
    var schedule,
        scheduleData = {
            data: options
        };

    /**
     * @event Base#beforeCreateSchedule
     * @type {Calendar~Schedule[]}
     */
    if (!this.invoke('beforeCreateSchedule', scheduleData)) {
        return null;
    }

    schedule = this.addSchedule(Schedule.create(options));

    if (!silent) {
        /**
         * @event Base#createdSchedule
         * @type {Schedule}
         */
        this.fire('createdSchedule', schedule);
    }

    return schedule;
};

/**
 * @emits Base#beforeCreateSchedule
 * @emits Base#createdSchedule
 * @param {Calendar~Schedule[]} dataList - dataObject list to create schedule.
 * @param {boolean} [silent=false] - set true then don't fire events.
 * @returns {Schedule[]} The instance list of Schedule that created.
 */
Base.prototype.createSchedules = function(dataList, silent) {
    var self = this;

    return util.map(dataList, function(data) {
        return self.createSchedule(data, silent);
    });
};

/**
 * Update an schedule.
 * @emits Base#updateSchedule
 * @param {Schedule} schedule - schedule instance to update
 * @param {object} options updated object data.
 * @returns {Schedule} updated schedule instance
 */
Base.prototype.updateSchedule = function(schedule, options) {
    var start = options.start || schedule.start;
    var end = options.end || schedule.end;

    options = options || {};

    if (options.title) {
        schedule.set('title', options.title);
    }

    if (options.start || options.end) {
        if (schedule.isAllDay) {
            schedule.setAllDayPeriod(start, end);
        } else {
            schedule.setTimePeriod(start, end);
        }
    }

    if (options.color) {
        schedule.set('color', options.color);
    }

    if (options.bgColor) {
        schedule.set('bgColor', options.bgColor);
    }

    if (options.borderColor) {
        schedule.set('borderColor', options.borderColor);
    }

    if (options.origin) {
        schedule.set('origin', options.origin);
    }

    if (!util.isUndefined(options.isAllDay)) {
        schedule.set('isAllDay', options.isAllDay);
    }

    if (!util.isUndefined(options.isPending)) {
        schedule.set('isPending', options.isPending);
    }

    if (!util.isUndefined(options.isFocused)) {
        schedule.set('isFocused', options.isFocused);
    }

    if (options.location) {
        schedule.set('location', options.location);
    }

    if (options.state) {
        schedule.set('state', options.state);
    }

    this._removeFromMatrix(schedule);
    this._addToMatrix(schedule);

    /**
     * @event Base#updateSchedule
     */
    this.fire('updateSchedule');

    return schedule;
};

/**
 * Delete schedule instance from controller.
 * @param {Schedule} schedule - schedule instance to delete
 * @returns {Schedule} deleted model instance.
 */
Base.prototype.deleteSchedule = function(schedule) {
    this._removeFromMatrix(schedule);
    this.schedules.remove(schedule);

    return schedule;
};

/**
 * Set date matrix to supplied schedule instance.
 * @param {Schedule} schedule - instance of schedule.
 */
Base.prototype._addToMatrix = function(schedule) {
    var ownMatrix = this.dateMatrix;
    var containDates = this._getContainDatesInSchedule(schedule);

    util.forEach(containDates, function(date) {
        var ymd = datetime.format(date, 'YYYYMMDD'),
            matrix = ownMatrix[ymd] = ownMatrix[ymd] || [];

        matrix.push(util.stamp(schedule));
    });
};

/**
 * Remove schedule's id from matrix.
 * @param {Schedule} schedule - instance of schedule
 */
Base.prototype._removeFromMatrix = function(schedule) {
    var modelID = util.stamp(schedule);

    util.forEach(this.dateMatrix, function(matrix) {
        var index = util.inArray(modelID, matrix);

        if (~index) {
            matrix.splice(index, 1);
        }
    }, this);
};

/**
 * Add an schedule instance.
 * @emits Base#addedSchedule
 * @param {Schedule} schedule The instance of Schedule.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {Schedule} The instance of Schedule that added.
 */
Base.prototype.addSchedule = function(schedule, silent) {
    this.schedules.add(schedule);
    this._addToMatrix(schedule);

    if (!silent) {
        /**
         * @event Base#addedSchedule
         * @type {object}
         */
        this.fire('addedSchedule', schedule);
    }

    return schedule;
};

/**
 * split schedule model by ymd.
 * @param {Date} start - start date
 * @param {Date} end - end date
 * @param {Collection} scheduleCollection - collection of schedule model.
 * @returns {object.<string, Collection>} splitted schedule model collections.
 */
Base.prototype.splitScheduleByDateRange = function(start, end, scheduleCollection) {
    var range = datetime.range(
            datetime.start(start),
            datetime.end(end),
            datetime.MILLISECONDS_PER_DAY
        ),
        ownMatrix = this.dateMatrix,
        result = {};

    util.forEachArray(range, function(date) {
        var ymd = datetime.format(date, 'YYYYMMDD'),
            matrix = ownMatrix[ymd],
            collection;

        collection = result[ymd] = common.createScheduleCollection();

        if (matrix && matrix.length) {
            util.forEachArray(matrix, function(id) {
                scheduleCollection.doWhenHas(id, function(schedule) {
                    collection.add(schedule);
                });
            });
        }
    });

    return result;
};

/**
 * Return schedules in supplied date range.
 *
 * available only YMD.
 * @param {Date} start start date.
 * @param {Date} end end date.
 * @returns {object.<string, Collection>} schedule collection grouped by dates.
 */
Base.prototype.findByDateRange = function(start, end) {
    var range = datetime.range(
            datetime.start(start),
            datetime.end(end),
            datetime.MILLISECONDS_PER_DAY
        ),
        ownSchedules = this.schedules.items,
        ownMatrix = this.dateMatrix,
        dformat = datetime.format,
        result = {},
        matrix,
        ymd,
        viewModels;

    util.forEachArray(range, function(date) {
        ymd = dformat(date, 'YYYYMMDD');
        matrix = ownMatrix[ymd];
        viewModels = result[ymd] = common.createScheduleCollection();

        if (matrix && matrix.length) {
            viewModels.add.apply(viewModels, util.map(matrix, function(id) {
                return ScheduleViewModel.create(ownSchedules[id]);
            }));
        }
    });

    return result;
};

Base.prototype.clearSchedules = function() {
    this.dateMatrix = {};
    this.schedules.clear();
    /**
     * for inner view when clear schedules
     * @event Base#clearSchedules
     * @type {Schedule}
     */
    this.fire('clearSchedules');
};

/**
 * Set a theme.
 * @param {themeConfig} theme - theme keys, styles
 * @returns {Array.<string>} keys - error keys not predefined.
 */
Base.prototype.setTheme = function(theme) {
    return this.theme.setStyles(theme);
};

/**
 * @typedef {Calendar}
 * @property {string|number} id - calendar id
 * @property {string} name - calendar name
 * @property {string} color - text color when schedule is displayed
 * @property {string} bgColor - background color schedule is displayed
 * @property {string} borderColor - color of left border or bullet point when schedule is displayed
 * @property {boolean} [checked] - whether to show calendar's schedules or not
 */

/**
 * Set calendar list
 * @param {Array.<Calendar>} calendars - calendar list
 */
Base.prototype.setCalendars = function(calendars) {
    this.calendars = calendars;
};

// mixin
util.CustomEvents.mixin(Base);

module.exports = Base;


/***/ }),

/***/ "./src/js/controller/viewMixin/core.js":
/*!*********************************************!*\
  !*** ./src/js/controller/viewMixin/core.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Core methods for schedule block placing
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var forEachArr = util.forEachArray,
    aps = Array.prototype.slice;

var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;
var Collection = __webpack_require__(/*! ../../common/collection */ "./src/js/common/collection.js");
var ScheduleViewModel = __webpack_require__(/*! ../../model/viewModel/scheduleViewModel */ "./src/js/model/viewModel/scheduleViewModel.js");

var Core = {
    /**
     * Calculate collision group.
     * @param {array} viewModels List of viewmodels.
     * @returns {array} Collision Group.
     */
    getCollisionGroup: function(viewModels) {
        var collisionGroups = [],
            foundPrevCollisionSchedule = false,
            previousScheduleList;

        if (!viewModels.length) {
            return collisionGroups;
        }

        collisionGroups[0] = [util.stamp(viewModels[0].valueOf())];
        forEachArr(viewModels.slice(1), function(schedule, index) {
            foundPrevCollisionSchedule = false;
            previousScheduleList = aps.apply(viewModels, [0, index + 1]).reverse();

            forEachArr(previousScheduleList, function(previous) {
                if (schedule.collidesWith(previous)) {
                    // If overlapping previous schedules, find a Collision Group of overlapping schedules and add this schedules
                    foundPrevCollisionSchedule = true;

                    forEachArr(collisionGroups.slice(0).reverse(), function(group) {
                        if (~util.inArray(util.stamp(previous.valueOf()), group)) {
                            // If you find a previous schedule that overlaps, include it in the Collision Group to which it belongs.
                            group.push(util.stamp(schedule.valueOf()));

                            return false; // returning false can stop this loop
                        }

                        return true;
                    });

                    return false; // returning false can stop this loop
                }

                return true;
            });

            if (!foundPrevCollisionSchedule) {
                // This schedule is a schedule that does not overlap with the previous schedule, so a new Collision Group is constructed.
                collisionGroups.push([util.stamp(schedule.valueOf())]);
            }
        });

        return collisionGroups;
    },

    /**
     * Get row length by column index in 2d matrix.
     * @param {array[]} arr2d Matrix
     * @param {number} col Column index.
     * @returns {number} Last row number in column.
     */
    getLastRowInColumn: function(arr2d, col) {
        var row = arr2d.length;

        while (row > 0) {
            row -= 1;
            if (!util.isUndefined(arr2d[row][col])) {
                return row;
            }
        }

        return false;
    },

    /**
     * Calculate matrix for appointment block element placing.
     * @param {Collection} collection model collection.
     * @param {array[]} collisionGroups Collision groups for schedule set.
     * @returns {array} matrices
     */
    getMatrices: function(collection, collisionGroups) {
        var result = [],
            getLastRowInColumn = Core.getLastRowInColumn;

        forEachArr(collisionGroups, function(group) {
            var matrix = [[]];

            forEachArr(group, function(scheduleID) {
                var schedule = collection.items[scheduleID],
                    col = 0,
                    found = false,
                    nextRow,
                    lastRowInColumn;

                while (!found) {
                    lastRowInColumn = getLastRowInColumn(matrix, col);

                    if (lastRowInColumn === false) {
                        matrix[0].push(schedule);
                        found = true;
                    } else if (!schedule.collidesWith(matrix[lastRowInColumn][col])) {
                        nextRow = lastRowInColumn + 1;
                        if (util.isUndefined(matrix[nextRow])) {
                            matrix[nextRow] = [];
                        }
                        matrix[nextRow][col] = schedule;
                        found = true;
                    }

                    col += 1;
                }
            });

            result.push(matrix);
        });

        return result;
    },

    /**
     * Filter that get schedule model in supplied date ranges.
     * @param {Date} start - start date
     * @param {Date} end - end date
     * @returns {function} schedule filter function
     */
    getScheduleInDateRangeFilter: function(start, end) {
        return function(model) {
            var ownStarts = model.getStarts(),
                ownEnds = model.getEnds();

            // shorthand condition of
            //
            // (ownStarts >= start && ownEnds <= end) ||
            // (ownStarts < start && ownEnds >= start) ||
            // (ownEnds > end && ownStarts <= end)
            return !(ownEnds < start || ownStarts > end);
        };
    },

    /**
     * Position each view model for placing into container
     * @param {Date} start - start date to render
     * @param {Date} end - end date to render
     * @param {array} matrices - matrices from controller
     * @param {function} [iteratee] - iteratee function invoke each view models
     */
    positionViewModels: function(start, end, matrices, iteratee) {
        var ymdListToRender;

        ymdListToRender = util.map(
            datetime.range(start, end, datetime.MILLISECONDS_PER_DAY),
            function(date) {
                return datetime.format(date, 'YYYYMMDD');
            }
        );

        forEachArr(matrices, function(matrix) {
            forEachArr(matrix, function(column) {
                forEachArr(column, function(viewModel, index) {
                    var ymd, dateLength;

                    if (!viewModel) {
                        return;
                    }

                    ymd = datetime.format(viewModel.getStarts(), 'YYYYMMDD');
                    dateLength = datetime.range(
                        datetime.start(viewModel.getStarts()),
                        datetime.end(viewModel.getEnds()),
                        datetime.MILLISECONDS_PER_DAY
                    ).length;

                    viewModel.top = index;
                    viewModel.left = util.inArray(ymd, ymdListToRender);
                    viewModel.width = dateLength;

                    if (iteratee) {
                        iteratee(viewModel);
                    }
                });
            });
        });
    },

    /**
     * Limit start, end date each view model for render properly
     * @param {Date} start - start date to render
     * @param {Date} end - end date to render
     * @param {Collection|ScheduleViewModel} viewModelColl - schedule view
     *  model collection or ScheduleViewModel
     * @returns {ScheduleViewModel} return view model when third parameter is
     *  view model
     */
    limitRenderRange: function(start, end, viewModelColl) {
        /**
         * Limit render range for view models
         * @param {ScheduleViewModel} viewModel - view model instance
         * @returns {ScheduleViewModel} view model that limited render range
         */
        function limit(viewModel) {
            if (viewModel.getStarts() < start) {
                viewModel.exceedLeft = true;
                viewModel.renderStarts = new TZDate(start.getTime());
            }

            if (viewModel.getEnds() > end) {
                viewModel.exceedRight = true;
                viewModel.renderEnds = new TZDate(end.getTime());
            }

            return viewModel;
        }

        if (viewModelColl.constructor === Collection) {
            viewModelColl.each(limit);

            return null;
        }

        return limit(viewModelColl);
    },

    /**
     * Convert schedule model collection to view model collection.
     * @param {Collection} modelColl - collection of schedule model
     * @returns {Collection} collection of schedule view model
     */
    convertToViewModel: function(modelColl) {
        var viewModelColl;

        viewModelColl = new Collection(function(viewModel) {
            return viewModel.cid();
        });

        modelColl.each(function(model) {
            viewModelColl.add(ScheduleViewModel.create(model));
        });

        return viewModelColl;
    }
};

module.exports = Core;



/***/ }),

/***/ "./src/js/controller/viewMixin/month.js":
/*!**********************************************!*\
  !*** ./src/js/controller/viewMixin/month.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Controller mixin for Month View
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var array = __webpack_require__(/*! ../../common/array */ "./src/js/common/array.js"),
    datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js"),
    Collection = __webpack_require__(/*! ../../common/collection */ "./src/js/common/collection.js");
var mmax = Math.max;

var Month = {
    /**
     * Filter function for find time schedule
     * @param {ScheduleViewModel} viewModel - schedule view model
     * @returns {boolean} whether model is time schedule?
     */
    _onlyTimeFilter: function(viewModel) {
        return !viewModel.model.isAllDay && !viewModel.hasMultiDates;
    },

    /**
     * Filter function for find allday schedule
     * @param {ScheduleViewModel} viewModel - schedule view model
     * @returns {boolean} whether model is allday schedule?
     */
    _onlyAlldayFilter: function(viewModel) {
        return viewModel.model.isAllDay || viewModel.hasMultiDates;
    },

    /**
     * Weight top value +1 for month view render
     * @param {ScheduleViewModel} viewModel - schedule view model
     */
    _weightTopValue: function(viewModel) {
        viewModel.top = viewModel.top || 0;
        viewModel.top += 1;
    },

    /**
     * Adjust render range to render properly.
     *
     * Limit start, end for each allday schedules and expand start, end for
     * each time schedules
     * @this Base
     * @param {Date} start - render start date
     * @param {Date} end - render end date
     * @param {Collection} vColl - view model collection
     * property.
     */
    _adjustRenderRange: function(start, end, vColl) {
        var ctrlCore = this.Core;

        vColl.each(function(viewModel) {
            if (viewModel.model.isAllDay || viewModel.hasMultiDates) {
                ctrlCore.limitRenderRange(start, end, viewModel);
            }
        });
    },

    /**
     * Get max top index value for allday schedules in specific date (YMD)
     * @this Base
     * @param {string} ymd - yyyymmdd formatted value
     * @param {Collection} vAlldayColl - collection of allday schedules
     * @returns {number} max top index value in date
     */
    _getAlldayMaxTopIndexAtYMD: function(ymd, vAlldayColl) {
        var dateMatrix = this.dateMatrix,
            topIndexesInDate = [];
        util.forEach(dateMatrix[ymd], function(cid) {
            vAlldayColl.doWhenHas(cid, function(viewModel) {
                topIndexesInDate.push(viewModel.top);
            });
        });

        if (topIndexesInDate.length > 0) {
            return mmax.apply(null, topIndexesInDate);
        }

        return 0;
    },

    /**
     * Adjust time view model's top index value
     * @this Base
     * @param {Collection} vColl - collection of schedules
     */
    _adjustTimeTopIndex: function(vColl) {
        var ctrlMonth = this.Month;
        var getAlldayMaxTopIndexAtYMD = ctrlMonth._getAlldayMaxTopIndexAtYMD;
        var vAlldayColl = vColl.find(ctrlMonth._onlyAlldayFilter);
        var sortedTimeSchedules = vColl.find(ctrlMonth._onlyTimeFilter).sort(array.compare.schedule.asc);
        var maxIndexInYMD = {};

        sortedTimeSchedules.forEach(function(timeViewModel) {
            var scheduleYMD = datetime.format(timeViewModel.getStarts(), 'YYYYMMDD');
            var alldayMaxTopInYMD = maxIndexInYMD[scheduleYMD];

            if (util.isUndefined(alldayMaxTopInYMD)) {
                alldayMaxTopInYMD = maxIndexInYMD[scheduleYMD] =
                    getAlldayMaxTopIndexAtYMD(scheduleYMD, vAlldayColl);
            }
            maxIndexInYMD[scheduleYMD] = timeViewModel.top =
                (alldayMaxTopInYMD + 1);
        });
    },

    /**
     * Adjust time view model's top index value
     * @this Base
     * @param {Collection} vColl - collection of schedules
     */
    _stackTimeFromTop: function(vColl) {
        var ctrlMonth = this.Month;
        var vAlldayColl = vColl.find(ctrlMonth._onlyAlldayFilter);
        var sortedTimeSchedules = vColl.find(ctrlMonth._onlyTimeFilter).sort(array.compare.schedule.asc);
        var indiceInYMD = {};
        var dateMatrix = this.dateMatrix;

        sortedTimeSchedules.forEach(function(timeViewModel) {
            var scheduleYMD = datetime.format(timeViewModel.getStarts(), 'YYYYMMDD');
            var topArrayInYMD = indiceInYMD[scheduleYMD];
            var maxTopInYMD;
            var i;

            if (util.isUndefined(topArrayInYMD)) {
                topArrayInYMD = indiceInYMD[scheduleYMD] = [];
                util.forEach(dateMatrix[scheduleYMD], function(cid) {
                    vAlldayColl.doWhenHas(cid, function(viewModel) {
                        topArrayInYMD.push(viewModel.top);
                    });
                });
            }

            if (util.inArray(timeViewModel.top, topArrayInYMD) >= 0) {
                maxTopInYMD = mmax.apply(null, topArrayInYMD) + 1;
                for (i = 1; i <= maxTopInYMD; i += 1) {
                    timeViewModel.top = i;
                    if (util.inArray(timeViewModel.top, topArrayInYMD) < 0) {
                        break;
                    }
                }
            }
            topArrayInYMD.push(timeViewModel.top);
        });
    },

    /**
     * Convert multi-date time schedule to all-day schedule
     * @this Base
     * @param {Collection} vColl - view model collection
     * property.
     */
    _addMultiDatesInfo: function(vColl) {
        vColl.each(function(viewModel) {
            var model = viewModel.model;
            var start = model.getStarts();
            var end = model.getEnds();

            viewModel.hasMultiDates = !datetime.isSameDate(start, end);

            if (!model.isAllDay && viewModel.hasMultiDates) {
                viewModel.renderStarts = datetime.start(start);
                viewModel.renderEnds = datetime.end(end);
            }
        });
    },

    /**
     * Find schedule and get view model for specific month
     * @this Base
     * @param {Date} start - start date to find schedules
     * @param {Date} end - end date to find schedules
     * @param {function[]} [andFilters] - optional filters to applying search query
     * @param {boolean} [alldayFirstMode=false] if true, time schedule is lower than all-day schedule. Or stack schedules from the top.
     * @returns {object} view model data
     */
    findByDateRange: function(start, end, andFilters, alldayFirstMode) {
        var ctrlCore = this.Core,
            ctrlMonth = this.Month,
            filter = ctrlCore.getScheduleInDateRangeFilter(start, end),
            coll, vColl, vList,
            collisionGroup,
            matrices;

        alldayFirstMode = alldayFirstMode || false;
        andFilters = andFilters || [];
        filter = Collection.and.apply(null, [filter].concat(andFilters));

        coll = this.schedules.find(filter);
        vColl = ctrlCore.convertToViewModel(coll);
        ctrlMonth._addMultiDatesInfo(vColl);
        ctrlMonth._adjustRenderRange(start, end, vColl);
        vList = vColl.sort(array.compare.schedule.asc);

        collisionGroup = ctrlCore.getCollisionGroup(vList);
        matrices = ctrlCore.getMatrices(vColl, collisionGroup);
        ctrlCore.positionViewModels(start, end, matrices, ctrlMonth._weightTopValue);
        if (alldayFirstMode) {
            ctrlMonth._adjustTimeTopIndex(vColl);
        } else {
            ctrlMonth._stackTimeFromTop(vColl);
        }

        return matrices;
    }
};

module.exports = Month;



/***/ }),

/***/ "./src/js/controller/viewMixin/week.js":
/*!*********************************************!*\
  !*** ./src/js/controller/viewMixin/week.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint no-shadow: 0 */
/**
 * @fileoverview Controller mixin modules for day views.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var Collection = __webpack_require__(/*! ../../common/collection */ "./src/js/common/collection.js");
var array = __webpack_require__(/*! ../../common/array */ "./src/js/common/array.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;

var SCHEDULE_MIN_DURATION = datetime.MILLISECONDS_SCHEDULE_MIN_DURATION;

/**
 * @mixin Base.Week
 */
var Week = {
    /**********
     * TIME GRID VIEW
     **********/

    /**
     * Make array with start and end times on schedules.
     * @this Base.Week
     * @param {array[]} matrix - matrix from controller.
     * @returns {array[]} starttime, endtime array (exclude first row's schedules)
     */
    generateTimeArrayInRow: function(matrix) {
        var row,
            col,
            schedule,
            start,
            end,
            map = [],
            cursor = [],
            maxColLen = Math.max.apply(null, util.map(matrix, function(col) {
                return col.length;
            }));

        for (col = 1; col < maxColLen; col += 1) {
            row = 0;
            schedule = util.pick(matrix, row, col);

            while (schedule) {
                start = schedule.getStarts().getTime() - datetime.millisecondsFrom('minutes', schedule.valueOf().goingDuration);
                end = schedule.getEnds().getTime() + datetime.millisecondsFrom('minutes', schedule.valueOf().comingDuration);

                if (Math.abs(end - start) < SCHEDULE_MIN_DURATION) {
                    end += SCHEDULE_MIN_DURATION;
                }

                cursor.push([start, end]);

                row += 1;
                schedule = util.pick(matrix, row, col);
            }

            map.push(cursor);
            cursor = [];
        }

        return map;
    },

    /**
     * Get collision information from list
     * @this Base
     * @param {array.<number[]>} arr - list to detecting collision. [[start, end], [start, end]]
     * @param {number} start - schedule start time that want to detect collisions.
     * @param {number} end - schedule end time that want to detect collisions.
     * @returns {boolean} target has collide in supplied array?
     */
    hasCollide: function(arr, start, end) {
        var startStart,
            startEnd,
            endStart,
            endEnd,
            getFunc = function(index) {
                return function(block) {
                    return block[index];
                };
            },
            abs = Math.abs,
            compare = array.compare.num.asc,
            hasCollide;

        if (!arr.length) {
            return false;
        }

        startStart = abs(array.bsearch(arr, start, getFunc(0), compare));
        startEnd = abs(array.bsearch(arr, start, getFunc(1), compare));
        endStart = abs(array.bsearch(arr, end, getFunc(0), compare));
        endEnd = abs(array.bsearch(arr, end, getFunc(1), compare));
        hasCollide = !(startStart === startEnd && startEnd === endStart && endStart === endEnd);

        return hasCollide;
    },

    /**
     * Initialize values to viewmodels for detect real collision at rendering phase.
     * @this Base
     * @param {array[]} matrices - Matrix data.
     */
    getCollides: function(matrices) {
        util.forEachArray(matrices, function(matrix) {
            var binaryMap,
                maxRowLength;

            binaryMap = Week.generateTimeArrayInRow(matrix);
            maxRowLength = Math.max.apply(null, util.map(matrix, function(row) {
                return row.length;
            }));

            util.forEachArray(matrix, function(row) {
                util.forEachArray(row, function(viewModel, col) {
                    var startTime,
                        endTime,
                        hasCollide,
                        i;

                    if (!viewModel) {
                        return;
                    }

                    startTime = viewModel.getStarts().getTime();
                    endTime = viewModel.getEnds().getTime();

                    if (Math.abs(endTime - startTime) < SCHEDULE_MIN_DURATION) {
                        endTime += SCHEDULE_MIN_DURATION;
                    }

                    startTime -= datetime.millisecondsFrom('minutes', viewModel.valueOf().goingDuration);
                    endTime += datetime.millisecondsFrom('minutes', viewModel.valueOf().comingDuration);

                    endTime -= 1;

                    for (i = (col + 1); i < maxRowLength; i += 1) {
                        hasCollide = Week.hasCollide(binaryMap[i - 1], startTime, endTime);

                        if (hasCollide) {
                            viewModel.hasCollide = true;
                            break;
                        }

                        viewModel.extraSpace += 1;
                    }
                });
            });
        });
    },

    /**
     * create view model for time view part
     * @this Base
     * @param {Date} start - start date.
     * @param {Date} end - end date.
     * @param {Collection} time - view model collection.
     * @param {number} hourStart - start hour to be shown
     * @param {number} hourEnd - end hour to be shown
     * @returns {object} view model for time part.
     */
    getViewModelForTimeView: function(start, end, time, hourStart, hourEnd) {
        var self = this,
            ymdSplitted = this.splitScheduleByDateRange(start, end, time),
            result = {};

        var _getViewModel = Week._makeGetViewModelFuncForTimeView(hourStart, hourEnd);

        util.forEach(ymdSplitted, function(collection, ymd) {
            var viewModels = _getViewModel(collection);
            var collisionGroups, matrices;

            collisionGroups = self.Core.getCollisionGroup(viewModels);
            matrices = self.Core.getMatrices(collection, collisionGroups);
            self.Week.getCollides(matrices);

            result[ymd] = matrices;
        });

        return result;
    },

    /**
     * make view model function depending on start and end hour
     * if time view option has start or end hour condition
     * it add filter
     * @param {number} hourStart - start hour to be shown
     * @param {number} hourEnd - end hour to be shown
     * @returns {function} function
     */
    _makeGetViewModelFuncForTimeView: function(hourStart, hourEnd) {
        if (hourStart === 0 && hourEnd === 24) {
            return function(collection) {
                return collection.sort(array.compare.schedule.asc);
            };
        }

        return function(collection) {
            return collection.find(Week._makeHourRangeFilter(hourStart, hourEnd))
                .sort(array.compare.schedule.asc);
        };
    },

    /**
     * make a filter function that is not included range of start, end hour
     * @param {number} hStart - hour start
     * @param {number} hEnd - hour end
     * @returns {function} - filtering function
     */
    _makeHourRangeFilter: function(hStart, hEnd) {
        return function(schedule) {
            var ownHourStart = schedule.model.start;
            var ownHourEnd = schedule.model.end;
            var yyyy = ownHourStart.getFullYear();
            var mm = ownHourStart.getMonth();
            var dd = ownHourStart.getDate();

            var hourStart = new TZDate(yyyy, mm, dd).setHours(hStart);
            var hourEnd = new TZDate(yyyy, mm, dd).setHours(hEnd);

            return (ownHourStart >= hourStart && ownHourStart < hourEnd) ||
                (ownHourEnd > hourStart && ownHourEnd <= hourEnd) ||
                (ownHourStart < hourStart && ownHourEnd > hourStart) ||
                (ownHourEnd > hourEnd && ownHourStart < hourEnd);
        };
    },

    /**********
     * ALLDAY VIEW
     **********/

    /**
     * Set hasMultiDates flag to true and set date ranges for rendering
     * @this Base
     * @param {Collection} vColl - view model collection
     */
    _addMultiDatesInfo: function(vColl) {
        vColl.each(function(viewModel) {
            var model = viewModel.model;
            viewModel.hasMultiDates = true;
            viewModel.renderStarts = datetime.start(model.getStarts());
            viewModel.renderEnds = datetime.end(model.getEnds());
        });
    },

    /**
     * create view model for allday view part
     * @this Base
     * @param {Date} start start date.
     * @param {Date} end end date.
     * @param {Collection} viewModelColl - allday schedule viewModel viewModels.
     * @returns {object} allday viewModel.
     */
    getViewModelForAlldayView: function(start, end, viewModelColl) {
        var ctrlCore = this.Core,
            ctrlWeek = this.Week,
            viewModels,
            collisionGroups,
            matrices;

        if (!viewModelColl || !viewModelColl.length) {
            return [];
        }

        ctrlWeek._addMultiDatesInfo(viewModelColl);
        ctrlCore.limitRenderRange(start, end, viewModelColl);

        viewModels = viewModelColl.sort(array.compare.schedule.asc);
        collisionGroups = ctrlCore.getCollisionGroup(viewModels);

        matrices = ctrlCore.getMatrices(viewModelColl, collisionGroups);
        ctrlCore.positionViewModels(start, end, matrices);

        return matrices;
    },

    /**********
     * READ
     **********/

    /**
     * Populate schedules in date range.
     * @this Base
     * @param {Date} start start date.
     * @param {Date} end end date.
     * @param {Array.<object>} panels - schedule panels like 'milestone', 'task', 'allday', 'time'
     * @param {function[]} [andFilters] - optional filters to applying search query
     * @param {Object} options - week view options
     * @returns {object} schedules grouped by dates.
     */
    findByDateRange: function(start, end, panels, andFilters, options) {
        var ctrlCore = this.Core,
            ctrlWeek = this.Week,
            filter = ctrlCore.getScheduleInDateRangeFilter(start, end),
            scheduleTypes = util.pluck(panels, 'name'),
            hourStart = util.pick(options, 'hourStart'),
            hourEnd = util.pick(options, 'hourEnd'),
            modelColl,
            group;

        andFilters = andFilters || [];
        filter = Collection.and.apply(null, [filter].concat(andFilters));

        modelColl = this.schedules.find(filter);
        modelColl = ctrlCore.convertToViewModel(modelColl);

        group = modelColl.groupBy(scheduleTypes, this.groupFunc);
        util.forEach(panels, function(panel) {
            var name = panel.name;
            if (panel.type === 'daygrid') {
                group[name] = ctrlWeek.getViewModelForAlldayView(start, end, group[name]);
            } else if (panel.type === 'timegrid') {
                group[name] = ctrlWeek.getViewModelForTimeView(start, end, group[name], hourStart, hourEnd);
            }
        });

        return group;
    },

    /* eslint max-nested-callbacks: 0 */
    /**
     * Make exceed date information
     * @param {number} maxCount - exceed schedule count
     * @param {Array} eventsInDateRange  - matrix of ScheduleViewModel
     * @param {Array.<TZDate>} range - date range of one week
     * @returns {object} exceedDate
     */
    getExceedDate: function(maxCount, eventsInDateRange, range) {
        var exceedDate = {};

        util.forEach(range, function(date) {
            var ymd = datetime.format(date, 'YYYYMMDD');
            exceedDate[ymd] = 0;
        });

        util.forEach(eventsInDateRange, function(matrix) {
            util.forEach(matrix, function(column) {
                util.forEach(column, function(viewModel) {
                    var period;
                    if (!viewModel || viewModel.top < maxCount) {
                        return;
                    }

                    period = datetime.range(
                        viewModel.getStarts(),
                        viewModel.getEnds(),
                        datetime.MILLISECONDS_PER_DAY
                    );

                    util.forEach(period, function(date) {
                        var ymd = datetime.format(date, 'YYYYMMDD');
                        exceedDate[ymd] += 1;
                    });
                });
            });
        });

        return exceedDate;
    },

    /**
     * Exclude overflow schedules from matrices
     * @param {array} matrices - The matrices for schedule placing.
     * @param {number} visibleScheduleCount - maximum visible count on panel
     * @returns {array} - The matrices for schedule placing except overflowed schedules.
     */
    excludeExceedSchedules: function(matrices, visibleScheduleCount) {
        return matrices.map(function(matrix) {
            return matrix.map(function(row) {
                if (row.length > visibleScheduleCount) {
                    return row.filter(function(item) {
                        return item.top < visibleScheduleCount;
                    }, this);
                }

                return row;
            }, this);
        }, this);
    }
};

module.exports = Week;



/***/ }),

/***/ "./src/js/factory/calendar.js":
/*!************************************!*\
  !*** ./src/js/factory/calendar.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Factory module for control all other factory.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet"),
    Handlebars = __webpack_require__(/*! handlebars-template-loader/runtime */ "./node_modules/handlebars-template-loader/runtime/index.js");
var dw = __webpack_require__(/*! ../common/dw */ "./src/js/common/dw.js"),
    datetime = __webpack_require__(/*! ../common/datetime */ "./src/js/common/datetime.js"),
    Layout = __webpack_require__(/*! ../view/layout */ "./src/js/view/layout.js"),
    Drag = __webpack_require__(/*! ../handler/drag */ "./src/js/handler/drag.js"),
    controllerFactory = __webpack_require__(/*! ./controller */ "./src/js/factory/controller.js"),
    weekViewFactory = __webpack_require__(/*! ./weekView */ "./src/js/factory/weekView.js"),
    monthViewFactory = __webpack_require__(/*! ./monthView */ "./src/js/factory/monthView.js"),
    TZDate = __webpack_require__(/*! ../common/timezone */ "./src/js/common/timezone.js").Date,
    config = __webpack_require__(/*! ../config */ "./src/js/config.js"),
    timezone = __webpack_require__(/*! ../common/timezone */ "./src/js/common/timezone.js"),
    reqAnimFrame = __webpack_require__(/*! ../common/reqAnimFrame */ "./src/js/common/reqAnimFrame.js");

var mmin = Math.min;

/**
 * Schedule information
 * @typedef {object} Schedule
 * @property {string} id - unique schedule id depends on calendar id
 * @property {string} calendarId - unique calendar id
 * @property {string} title - schedule title
 * @property {string|TZDate} start - start time. It's 'string' for input. It's 'TZDate' for output like event handler.
 * @property {string|TZDate} end - end time. It's 'string' for input. It's 'TZDate' for output like event handler.
 * @property {number} goingDuration - travel time:  going duration
 * @property {number} comingDuration - travel time: coming duration
 * @property {boolean} isAllDay - all day schedule
 * @property {string} category - schedule type('milestone', 'task', allday', 'time')
 * @property {string} dueDateClass - task schedule type string
 *                                   (any string value is ok and mandatory if category is 'task')
 * @property {string} location - location
 * @property {Array.<string>} attendees - attendees
 * @property {any} recurrenceRule - recurrence rule
 * @property {boolean} isPending - in progress flag to do something like network job(The schedule will be transparent.)
 * @property {boolean} isFocused - focused schedule flag
 * @property {boolean} isVisible - schedule visibility flag
 * @property {boolean} isReadOnly - schedule read-only flag
 * @property {boolean} isPrivate - private schedule
 * @property {string} [color] - schedule text color
 * @property {string} [bgColor] - schedule background color
 * @property {string} [dragBgColor] - schedule background color when dragging it
 * @property {string} [borderColor] - schedule left border color
 * @property {string} customStyle - schedule's custom css class
 * @property {any} raw - user data
 */

/**
 * Template functions to support customer renderer
 * @typedef {object} Template
 * @property {function} [milestoneTitle] - milestone title(at left column) template function
 * @property {function} [milestone] - milestone template function
   @property {function} [taskTitle] - task title(at left column) template function
 * @property {function} [task] - task template function
 * @property {function} [alldayTitle] - allday title(at left column) template function
 * @property {function} [allday] - allday template function
 * @property {function} [time] - time template function
 * @property {function} [monthMoreTitleDate] - month more layer title template function
 * @property {function} [monthMoreClose] - month more layer close button template function
 * @property {function} [monthGridHeader] - month grid header(date, decorator, title) template function
 * @property {function} [monthGridFooter] - month grid footer(date, decorator, title) template function
 * @property {function} [monthGridHeaderExceed] - month grid header(exceed schedule count) template function
 * @property {function} [monthGridFooterExceed] - month grid footer(exceed schedule count) template function
 * @property {function} [weekDayname] - weekly dayname template function
 *  @property {function} [monthDayname] - monthly dayname template function
 */

/**
 * Options for daily, weekly view.
 * @typedef {object} WeekOptions
 * @property {number} [startDayOfWeek=0] - start day of week
 * @property {Array.<string>} [daynames] - day names in weekly and daily.
 *                    Default values are ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
 * @property {boolean} [narrowWeekend=false] - make weekend column narrow(1/2 width)
 * @property {boolean} [workweek=false] - show only 5 days except for weekend
 * @property {boolean} [showTimezoneCollapseButton=false] - show a collapse button to close multiple timezones
 * @property {boolean} [timezonesCollapsed=false] - An initial multiple timezones collapsed state
 * @property {number} [hourStart=0] - Can limit of render hour start.
 * @property {number} [hourEnd=24] - Can limit of render hour end.
 */

/**
 * Options for monthly view.
 * @typedef {object} MonthOptions
 * @property {Array.<string>} [daynames] - day names in monthly.
 * Default values are ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
 * @property {number} [startDayOfWeek=0] - start day of week
 * @property {boolean} [narrowWeekend=false] - make weekend column narrow(1/2 width)
 * @property {boolean} [visibleWeeksCount=6] - visible week count in monthly(0 or null are same with 6)
 * @property {boolean} [isAlways6Week=true] - Always show 6 weeks. If false, show 5 weeks or 6 weeks based on the month.
 * @property {boolean} [workweek=false] - show only 5 days except for weekend
 * @property {number} [visibleScheduleCount] - visible schedule count in monthly grid
 * @property {object} [moreLayerSize] - more layer size
 * @property {object} [moreLayerSize.width=null] - css width value(px, 'auto').
 *                                                       The default value 'null' is to fit a grid cell.
 * @property {object} [moreLayerSize.height=null] - css height value(px, 'auto').
 *                                                        The default value 'null' is to fit a grid cell.
 * @property {object} [grid] - grid's header and footer information
 *  @property {object} [grid.header] - grid's header informatioin
 *   @property {number} [grid.header.height=34] - grid's header height
 *  @property {object} [grid.footer] - grid's footer informatioin
 *   @property {number} [grid.footer.height=34] - grid's footer height
 * @property {function} [scheduleFilter=null] - Filter schedules on month view. A parameter is {Schedule} object.
 */

/**
 * @typedef {object} CalendarColor
 * @property {string} [color] - calendar color
 * @property {string} [bgColor] - calendar background color
 * @property {string} [borderColor] - calendar left border color
 */

/**
 * @typedef {object} Timezone
 * @property {number} [timezoneOffset] - minutes for your timezone offset. If null, use the browser's timezone. Refer to Date.prototype.getTimezoneOffset()
 * @property {string} [displayLabel] -  display label of your timezone at weekly/daily view(ex> 'GMT+09:00')
 * @property {string} [tooltip] -  tooltip(ex> 'Seoul')
 * @example
 * var timezoneName = moment.tz.guess();
 * var cal = new Calendar('#calendar', {
 *  timezones: [{
 *      timezoneOffset: 540,
 *      displayLabel: 'GMT+09:00',
 *      tooltip: 'Seoul'
 *  }, {
 *      timezoneOffset: -420,
 *      displayLabel: 'GMT-08:00',
 *      tooltip: 'Los Angeles'
 *  }]
 * });
 */

/**
 * @typedef {object} Options - calendar option object
 * @property {string} [defaultView='week'] - default view of calendar
 * @property {boolean|Array.<string>} [taskView=true] - show the milestone and task in weekly, daily view. If the value is array, it can be <b>['milestone', 'task']</b>.
 * @property {boolean|Array.<string>} [scheduleView=true] - show the all day and time grid in weekly, daily view.  If the value is array, it can be <b>['allday', 'time']</b>.
 * @property {themeConfig} [theme=themeConfig] - custom theme options
 * @property {Template} [template={}] - template options
 * @property {WeekOptions} [week={}] - options for week view
 * @property {MonthOptions} [month={}] - options for month view
 * @property {Array.<Calendar>} [calendars=[]] - list of Calendars that can be used to add new schedule
 * @property {boolean} [useCreationPopup=false] - whether use default creation popup or not
 * @property {boolean} [useDetailPopup=false] - whether use default detail popup or not
 * @property {Array.<Timezone>} [timezones] - timezone array.
 *  The first Timezone element is primary and can override Calendar#setTimezoneOffset function.
 *  The rest timezone elements are shown in left timegrid of weekly/daily view.
 * @property {boolean} [disableDblClick=false] - disable double click to create a schedule
 * @property {boolean} [isReadOnly=false] - Calendar is read-only mode and a user can't create and modify any schedule.
 */

/**
 * {@link https://nhnent.github.io/tui.code-snippet/latest/tui.util.CustomEvents.html CustomEvents} document at {@link https://github.com/nhnent/tui.code-snippet tui-code-snippet}
 * @typedef {class} CustomEvents
 */

/**
 * @typedef {object} TimeCreationGuide - time creation guide instance to present selected time period
 * @property {HTMLElement} guideElement - guide element
 * @property {Object.<string, HTMLElement>} guideElements - map by key. It can be used in monthly view
 * @property {function} clearGuideElement - hide the creation guide
 * @example
 * calendar.on('beforeCreateSchedule', function(event) {
 *     var guide = event.guide;
 *     // use guideEl$'s left, top to locate your schedule creation popup
 *     var guideEl$ = guide.guideElement ?
 *          guide.guideElement : guide.guideElements[Object.keys(guide.guideElements)[0]];
 *
 *     // after that call this to hide the creation guide
 *     guide.clearGuideElement();
 * });
 */

/**
 * Calendar class
 * @constructor
 * @mixes CustomEvents
 * @param {HTMLElement|string} container - container element or selector id
 * @param {Options} options - calendar options
 * @example
 * var calendar = new tui.Calendar(document.getElementById('calendar'), {
 *     defaultView: 'week',
 *     taskView: true,    // can be also ['milestone', 'task']
 *     scheduleView: true,  // can be also ['allday', 'time']
 *     template: {
 *         milestone: function(schedule) {
 *             return '<span style="color:red;"><i class="fa fa-flag"></i> ' + schedule.title + '</span>';
 *         },
 *         milestoneTitle: function() {
 *             return 'Milestone';
 *         },
 *         task: function(schedule) {
 *             return '&nbsp;&nbsp;#' + schedule.title;
 *         },
 *         taskTitle: function() {
 *             return '<label><input type="checkbox" />Task</label>';
 *         },
 *         allday: function(schedule) {
 *             return schedule.title + ' <i class="fa fa-refresh"></i>';
 *         },
 *         alldayTitle: function() {
 *             return 'All Day';
 *         },
 *         time: function(schedule) {
 *             return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
 *         }
 *     },
 *     month: {
 *         daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
 *         startDayOfWeek: 0,
 *         narrowWeekend: true
 *     },
 *     week: {
 *         daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
 *         startDayOfWeek: 0,
 *         narrowWeekend: true
 *     }
 * });
 */
function Calendar(container, options) {
    var opt = options;

    if (util.isString(container)) {
        container = document.querySelector(container);
    }

    /**
     * Calendar color map
     * @type {object}
     * @private
     */
    this._calendarColor = {};

    /**
     * Current rendered date
     * @type {TZDate}
     * @private
     */
    this._renderDate = new TZDate();

    /**
     * start and end date of weekly, monthly
     * @type {object}
     * @private
     */
    this._renderRange = {
        start: null,
        end: null
    };

    /**
     * base controller
     * @type {Base}
     * @private
     */
    this._controller = _createController(options);
    this._controller.setCalendars(options.calendars);

    /**
     * layout view (layout manager)
     * @type {Layout}
     * @private
     */
    this._layout = new Layout(container, this._controller.theme);

    /**
     * global drag handler
     * @type {Drag}
     * @private
     */
    this._dragHandler = new Drag({distance: 10}, this._layout.container);

    /**
     * current rendered view name. ('day', 'week', 'month')
     * @type {string}
     * @default 'week'
     * @private
     */
    this._viewName = opt.defaultView || 'week';

    /**
     * Refresh method. it can be ref different functions for each view modes.
     * @type {function}
     * @private
     */
    this._refreshMethod = null;

    /**
     * Scroll to now. It can be called for 'week', 'day' view modes.
     * @type {function}
     * @private
     */
    this._scrollToNowMethod = null;

    /**
     * It's true if Calendar.prototype.scrollToNow() is called.
     * @type {boolean}
     * @private
     */
    this._requestScrollToNow = false;

    /**
     * Open schedule creation popup
     * @type {function}
     * @private
     */
    this._openCreationPopup = null;

    /**
     * Hide the more view
     * @type {function}
     * @private
     */
    this._hideMoreView = null;

    /**
     * Unique id for requestAnimFrame()
     * @type {number}
     * @private
     */
    this._requestRender = 0;

    /**
     * calendar options
     * @type {Options}
     * @private
     */
    this._options = {};

    this._initialize(options);
}

/**
 * destroy calendar instance.
 */
Calendar.prototype.destroy = function() {
    this._dragHandler.destroy();
    this._controller.off();
    this._layout.clear();
    this._layout.destroy();

    util.forEach(this._options.template, function(func, name) {
        if (func) {
            Handlebars.unregisterHelper(name + '-tmpl');
        }
    });

    this._options = this._renderDate = this._controller =
        this._layout = this._dragHandler = this._viewName =
        this._refreshMethod = this._scrollToNowMethod = null;
};

/**
 * Initialize calendar
 * @param {Options} options - calendar options
 * @private
 */
Calendar.prototype._initialize = function(options) {
    var controller = this._controller,
        viewName = this._viewName,
        timezones = options.timezones || [];

    this._options = util.extend({
        defaultView: viewName,
        taskView: true,
        scheduleView: true,
        template: util.extend({
            allday: null,
            time: null
        }, util.pick(options, 'template') || {}),
        week: util.extend({}, util.pick(options, 'week') || {}),
        month: util.extend({}, util.pick(options, 'month') || {}),
        calendars: [],
        useCreationPopup: false,
        useDetailPopup: false,
        timezones: options.timezones || [{
            timezoneOffset: 0,
            displayLabel: '',
            tooltip: ''
        }],
        disableDblClick: false,
        isReadOnly: false
    }, options);

    this._options.week = util.extend({
        startDayOfWeek: 0,
        workweek: false
    }, util.pick(this._options, 'week') || {});

    this._options.month = util.extend({
        startDayOfWeek: 0,
        workweek: false,
        scheduleFilter: function(schedule) {
            return Boolean(schedule.isVisible) &&
                (schedule.category === 'allday' || schedule.category === 'time');
        }
    }, util.pick(options, 'month') || {});

    if (this._options.isReadOnly) {
        this._options.useCreationPopup = false;
    }

    this._layout.controller = controller;

    util.forEach(this._options.template, function(func, name) {
        if (func) {
            Handlebars.registerHelper(name + '-tmpl', func);
        }
    });

    util.forEach(this._options.calendars || [], function(calendar) {
        this.setCalendarColor(calendar.id, calendar, true);
    }, this);

    // set by primary timezone
    if (timezones.length) {
        timezone.setOffsetByTimezoneOption(timezones[0].timezoneOffset);
    }

    this.changeView(viewName, true);
};

/**********
 * CRUD Methods
 **********/

/**
 * Create schedules and render calendar.
 * @param {Array.<Schedule>} schedules - schedule data list
 * @param {boolean} [silent=false] - no auto render after creation when set true
 * @example
 * calendar.createSchedules([
 *     {
 *         id: '1',
 *         calendarId: '1',
 *         title: 'my schedule',
 *         category: 'time',
 *         dueDateClass: '',
 *         start: '2018-01-18T22:30:00+09:00',
 *         end: '2018-01-19T02:30:00+09:00'
 *     },
 *     {
 *         id: '2',
 *         calendarId: '1',
 *         title: 'second schedule',
 *         category: 'time',
 *         dueDateClass: '',
 *         start: '2018-01-18T17:30:00+09:00',
 *         end: '2018-01-19T17:31:00+09:00'
 *     }
 * ]);
 */
Calendar.prototype.createSchedules = function(schedules, silent) {
    var calColor = this._calendarColor;

    util.forEach(schedules, function(obj) {
        var color = calColor[obj.calendarId];

        if (color) {
            obj.color = color.color;
            obj.bgColor = color.bgColor;
            obj.borderColor = color.borderColor;
        }
    });

    this._controller.createSchedules(schedules, silent);

    if (!silent) {
        this.render();
    }
};

/**
 * Get a schedule object by schedule id and calendar id.
 * @param {string} scheduleId - ID of schedule
 * @param {string} calendarId - calendarId of the schedule
 * @returns {Schedule} schedule object
 * @example
 * var schedule = calendar.getSchedule(scheduleId, calendarId);
 * console.log(schedule.title);
 */
Calendar.prototype.getSchedule = function(scheduleId, calendarId) {
    return this._controller.schedules.single(function(model) {
        return model.id === scheduleId && model.calendarId === calendarId;
    });
};

/**
 * Update the schedule
 * @param {string} scheduleId - ID of a schedule to update
 * @param {string} calendarId - calendarId of the schedule to update
 * @param {Schedule} scheduleData - schedule data to update
 * @param {boolean} [silent=false] - no auto render after creation when set true
 * @example
 * calendar.on('beforeUpdateSchedule', function(event) {
 *     var schedule = event.schedule;
 *     var startTime = event.start;
 *     var endTime = event.end;
 *     calendar.updateSchedule(schedule.id, schedule.calendarId, {
 *         start: startTime,
 *         end: endTime
 *     });
 * });
 */
Calendar.prototype.updateSchedule = function(scheduleId, calendarId, scheduleData, silent) {
    var ctrl = this._controller,
        ownSchedules = ctrl.schedules,
        schedule = ownSchedules.single(function(model) {
            return model.id === scheduleId && model.calendarId === calendarId;
        });

    if (schedule) {
        ctrl.updateSchedule(schedule, scheduleData);

        if (!silent) {
            this.render();
        }
    }
};

/**
 * Delete a schedule.
 * @param {string} scheduleId - ID of schedule to delete
 * @param {string} calendarId - calendarId of the schedule to delete
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
Calendar.prototype.deleteSchedule = function(scheduleId, calendarId, silent) {
    var ctrl = this._controller,
        ownSchedules = ctrl.schedules,
        schedule = ownSchedules.single(function(model) {
            return model.id === scheduleId && model.calendarId === calendarId;
        });

    if (!schedule) {
        return;
    }

    ctrl.deleteSchedule(schedule);
    if (!silent) {
        this.render();
    }
};

/**********
 * Private Methods
 **********/

/**
 * @param {string|Date} date - date to show in calendar
 * @param {number} [startDayOfWeek=0] - start day of week
 * @param {boolean} [workweek=false] - only show work week
 * @returns {array} render range
 * @private
 */
Calendar.prototype._getWeekDayRange = function(date, startDayOfWeek, workweek) {
    var day, start, end, range,
        msFrom = datetime.millisecondsFrom;

    startDayOfWeek = (startDayOfWeek || 0); // eslint-disable-line
    date = util.isDate(date) ? date : new TZDate(date);
    day = date.getDay();

    // calculate default render range first.
    start = new TZDate(
        Number(date) -
        msFrom('day', day) +
        msFrom('day', startDayOfWeek)
    );

    end = new TZDate(Number(start) + msFrom('day', 6));

    if (day < startDayOfWeek) {
        start = new TZDate(Number(start) - msFrom('day', 7));
        end = new TZDate(Number(end) - msFrom('day', 7));
    }

    if (workweek) {
        range = datetime.range(
            datetime.start(start),
            datetime.end(end),
            datetime.MILLISECONDS_PER_DAY
        );

        range = util.filter(range, function(weekday) {
            return !datetime.isWeekend(weekday.getDay());
        });

        start = range[0];
        end = range[range.length - 1];
    }

    return [start, end];
};

/**
 * Toggle schedules' visibility by calendar ID
 * @param {string} calendarId - calendar id value
 * @param {boolean} toHide - set true to hide schedules
 * @param {boolean} [render=true] - set true then render after change visible property each models
 */
Calendar.prototype.toggleSchedules = function(calendarId, toHide, render) {
    var ownSchedules = this._controller.schedules;

    render = util.isExisty(render) ? render : true;
    calendarId = util.isArray(calendarId) ? calendarId : [calendarId];

    ownSchedules.each(function(schedule) {
        if (~util.inArray(schedule.calendarId, calendarId)) {
            schedule.set('isVisible', !toHide);
        }
    });

    if (render) {
        this.render();
    }
};

/**********
 * General Methods
 **********/

/**
 * Render the calendar. The real rendering occurs after requestAnimationFrame.
 * If you have to render immediately, use the 'immediately' parameter as true.
 * @param {boolean} [immediately=false] - Render it immediately
 * @example
 * var silent = true;
 * calendar.clear();
 * calendar.createSchedules(schedules, silent);
 * calendar.render();
 * @example
 * // Render a calendar when resizing a window.
 * window.addEventListener('resize', function() {
 *     calendar.render();
 * });
 */
Calendar.prototype.render = function(immediately) {
    if (this._requestRender) {
        reqAnimFrame.cancelAnimFrame(this._requestRender);
    }

    if (immediately) {
        this._renderFunc();
    } else {
        this._requestRender = reqAnimFrame.requestAnimFrame(this._renderFunc, this);
    }
};

/**
 * Render and refresh all layout and process requests.
 * @private
 */
Calendar.prototype._renderFunc = function() {
    if (this._refreshMethod) {
        this._refreshMethod();
    }
    if (this._layout) {
        this._layout.render();
    }
    if (this._scrollToNowMethod && this._requestScrollToNow) {
        this._scrollToNowMethod();
    }

    this._requestScrollToNow = false;
    this._requestRender = null;
};

/**
 * Delete all schedules and clear view. The real rendering occurs after requestAnimationFrame.
 * If you have to render immediately, use the 'immediately' parameter as true.
 * @param {boolean} [immediately=false] - Render it immediately
 * @example
 * calendar.clear();
 * calendar.createSchedules(schedules, true);
 * calendar.render();
 */
Calendar.prototype.clear = function(immediately) {
    this._controller.clearSchedules();
    this.render(immediately);
};

/**
 * Scroll to current time on today in case of daily, weekly view
 * @example
 * function onNewSchedules(schedules) {
 *     calendar.createSchedules(schedules);
 *     if (calendar.getViewName() !== 'month') {
 *         calendar.scrollToNow();
 *     }
 * }
 */
Calendar.prototype.scrollToNow = function() {
    if (this._scrollToNowMethod) {
        this._requestScrollToNow = true;
        // this._scrollToNowMethod() will be called at next frame rendering.
    }
};

/**
 * Move to today.
 * @example
 * function onClickTodayBtn() {
 *     calendar.today();
 * }
 */
Calendar.prototype.today = function() {
    this._renderDate = new TZDate();

    this._setViewName(this._viewName);
    this.move();
    this.render();
};

/**
 * Move the calendar amount of offset value
 * @param {number} offset - offset value.
 * @private
 * @example
 * // move previous week when "week" view.
 * // move previous month when "month" view.
 * calendar.move(-1);
 */
Calendar.prototype.move = function(offset) {
    var renderDate = dw(this._renderDate),
        viewName = this._viewName,
        view = this._getCurrentView(),
        recursiveSet = _setOptionRecurseively,
        startDate, endDate, tempDate,
        startDayOfWeek, visibleWeeksCount, workweek, isAlways6Week, datetimeOptions;

    offset = util.isExisty(offset) ? offset : 0;

    if (viewName === 'month') {
        startDayOfWeek = util.pick(this._options, 'month', 'startDayOfWeek') || 0;
        visibleWeeksCount = mmin(util.pick(this._options, 'month', 'visibleWeeksCount') || 0, 6);
        workweek = util.pick(this._options, 'month', 'workweek') || false;
        isAlways6Week = util.pick(this._options, 'month', 'isAlways6Week');

        if (visibleWeeksCount) {
            datetimeOptions = {
                startDayOfWeek: startDayOfWeek,
                isAlways6Week: false,
                visibleWeeksCount: visibleWeeksCount,
                workweek: workweek
            };

            renderDate.addDate(offset * 7 * datetimeOptions.visibleWeeksCount);
            tempDate = datetime.arr2dCalendar(this._renderDate, datetimeOptions);

            recursiveSet(view, function(childView, opt) {
                opt.renderMonth = datetime.format(renderDate.d, 'YYYY-MM-DD');
            });
        } else {
            datetimeOptions = {
                startDayOfWeek: startDayOfWeek,
                isAlways6Week: isAlways6Week,
                workweek: workweek
            };

            renderDate.addMonth(offset);
            tempDate = datetime.arr2dCalendar(this._renderDate, datetimeOptions);

            recursiveSet(view, function(childView, opt) {
                opt.renderMonth = datetime.format(renderDate.d, 'YYYY-MM');
            });
        }

        startDate = tempDate[0][0];
        endDate = tempDate[tempDate.length - 1][tempDate[tempDate.length - 1].length - 1];
    } else if (viewName === 'week') {
        renderDate.addDate(offset * 7);
        startDayOfWeek = util.pick(this._options, 'week', 'startDayOfWeek') || 0;
        workweek = util.pick(this._options, 'week', 'workweek') || false;
        tempDate = this._getWeekDayRange(renderDate.d, startDayOfWeek, workweek);

        startDate = tempDate[0];
        endDate = tempDate[1];

        recursiveSet(view, function(childView, opt) {
            opt.renderStartDate = datetime.format(startDate, 'YYYY-MM-DD');
            opt.renderEndDate = datetime.format(endDate, 'YYYY-MM-DD');

            childView.setState({
                collapsed: true
            });
        });
    } else if (viewName === 'day') {
        renderDate.addDate(offset);
        startDate = endDate = renderDate.d;

        recursiveSet(view, function(childView, opt) {
            opt.renderStartDate = datetime.format(startDate, 'YYYY-MM-DD');
            opt.renderEndDate = datetime.format(endDate, 'YYYY-MM-DD');

            childView.setState({
                collapsed: true
            });
        });
    }

    this._renderDate = renderDate.d;
    this._renderRange = {
        start: startDate,
        end: endDate
    };
};

/**
 * Move to specific date
 * @param {(Date|string)} date - date to move
 * @example
 * calendar.on('clickDayname', function(event) {
 *     if (calendar.getViewName() === 'week') {
 *         calendar.setDate(new Date(event.date));
 *         calendar.changeView('day', true);
 *     }
 * });
 */
Calendar.prototype.setDate = function(date) {
    if (util.isString(date)) {
        date = datetime.parse(date);
    }

    this._renderDate = new TZDate(Number(date));
    this._setViewName(this._viewName);
    this.move(0);
    this.render();
};

/**
 * Move the calendar forward a day, a week, a month, 2 weeks, 3 weeks.
 * @example
 * function moveToNextOrPrevRange(val) {
    if (val === -1) {
        calendar.prev();
    } else if (val === 1) {
        calendar.next();
    }
}
 */
Calendar.prototype.next = function() {
    this.move(1);
    this.render();
};

/**
 * Move the calendar backward a day, a week, a month, 2 weeks, 3 weeks.
 * @example
 * function moveToNextOrPrevRange(val) {
    if (val === -1) {
        calendar.prev();
    } else if (val === 1) {
        calendar.next();
    }
}
 */
Calendar.prototype.prev = function() {
    this.move(-1);
    this.render();
};

/**
 * Return current rendered view.
 * @returns {View} current view instance
 * @private
 */
Calendar.prototype._getCurrentView = function() {
    var viewName = this._viewName;

    if (viewName === 'day') {
        viewName = 'week';
    }

    return util.pick(this._layout.children.items, viewName);
};

/**
 * Change calendar's schedule color with option
 * @param {string} calendarId - calendar ID
 * @param {CalendarColor} option - color data object
 * @param {boolean} [silent=false] - no auto render after creation when set true
 * @example
 * calendar.setCalendarColor('1', {
 *     color: '#e8e8e8',
 *     bgColor: '#585858',
 *     borderColor: '#a1b56c'
 * });
 * calendar.setCalendarColor('2', {
 *     color: '#282828',
 *     bgColor: '#dc9656',
 *     borderColor: '#a1b56c'
 * });
 * calendar.setCalendarColor('3', {
 *     color: '#a16946',
 *     bgColor: '#ab4642',
 *     borderColor: '#a1b56c'
 * });
 */
Calendar.prototype.setCalendarColor = function(calendarId, option, silent) {
    var calColor = this._calendarColor,
        ownSchedules = this._controller.schedules,
        ownColor = calColor[calendarId];

    if (!util.isObject(option)) {
        config.throwError('Calendar#changeCalendarColor(): color 는 {color: \'\', bgColor: \'\'} 형태여야 합니다.');
    }

    ownColor = calColor[calendarId] = util.extend({
        color: '#000',
        bgColor: '#a1b56c',
        borderColor: '#a1b56c'
    }, option);

    ownSchedules.each(function(model) {
        if (model.calendarId !== calendarId) {
            return;
        }

        model.color = ownColor.color;
        model.bgColor = ownColor.bgColor;
        model.borderColor = ownColor.borderColor;
    });

    if (!silent) {
        this.render();
    }
};

/**********
 * Custom Events
 **********/

/**
 * A bridge-based event handler for connecting a click handler to a user click event handler for each view
 * @fires Calendar#clickSchedule
 * @param {object} clickScheduleData - The event data of 'clickSchedule' handler
 * @private
 */
Calendar.prototype._onClick = function(clickScheduleData) {
    /**
     * Fire this event when click a schedule.
     * @event Calendar#clickSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance
     * @property {MouseEvent} event - MouseEvent
     * @example
     * calendar.on('clickSchedule', function(event) {
     *     var schedule = event.schedule;
     *
     *     if (lastClickSchedule) {
     *         calendar.updateSchedule(lastClickSchedule.id, lastClickSchedule.calendarId, {
     *             isFocused: false
     *         });
     *     }
     *     calendar.updateSchedule(schedule.id, schedule.calendarId, {
     *         isFocused: true
     *     });
     *
     *     lastClickSchedule = schedule;
     *     // open detail view
     * });
     */
    this.fire('clickSchedule', clickScheduleData);
};

/**
 * A bridge-based event handler for connecting a click handler to a user click event handler for each view
 * @fires Calendar#clickMore
 * @param {object} clickMoreSchedule - The event data of 'clickMore' handler
 * @private
 */
Calendar.prototype._onClickMore = function(clickMoreSchedule) {
    /**
     * Fire this event when click a schedule.
     * @event Calendar#clickMore
     * @type {object}
     * @property {Date} date - clicked date
     * @property {HTMLElement} target - more element
     * @example
     * calendar.on('clickMore', function(event) {
     *     console.log('clickMore', event.date, event.target);
     * });
     */
    this.fire('clickMore', clickMoreSchedule);
};

/**
 * dayname click event handler
 * @fires Calendar#clickDayname
 * @param {object} clickScheduleData - The event data of 'clickDayname' handler
 * @private
 */
Calendar.prototype._onClickDayname = function(clickScheduleData) {
    /**
     * Fire this event when click a day name in weekly.
     * @event Calendar#clickDayname
     * @type {object}
     * @property {string} date - date string by format 'YYYY-MM-DD'
     * @example
     * calendar.on('clickDayname', function(event) {
     *     if (calendar.getViewName() === 'week') {
     *         calendar.setDate(new Date(event.date));
     *         calendar.changeView('day', true);
     *     }
     * });
     */
    this.fire('clickDayname', clickScheduleData);
};

/**
 * @fires {Calendar#n('beforeCreateSchedule', function}
 * @param {object} createScheduleData - select schedule data from allday, time
 * @private
 */
Calendar.prototype._onBeforeCreate = function(createScheduleData) {
    if (this._options.useCreationPopup && !createScheduleData.useCreationPopup) {
        if (this._showCreationPopup) {
            this._showCreationPopup(createScheduleData);

            return;
        }
    }
    /**
     * Fire this event when select time period in daily, weekly, monthly.
     * @event Calendar#beforeCreateSchedule
     * @type {object}
     * @property {boolean} isAllDay - allday schedule
     * @property {Date} start - selected start time
     * @property {Date} end - selected end time
     * @property {TimeCreationGuide} guide - TimeCreationGuide instance
     * @property {string} triggerEventName - event name like 'click', 'dblclick'
     * @example
     * calendar.on('beforeCreateSchedule', function(event) {
     *     var startTime = event.start;
     *     var endTime = event.end;
     *     var isAllDay = event.isAllDay;
     *     var guide = event.guide;
     *     var triggerEventName = event.triggerEventName;
     *     var schedule;
     *
     *     if (triggerEventName === 'click') {
     *         // open writing simple schedule popup
     *         schedule = {...};
     *     } else if (triggerEventName === 'dblclick') {
     *         // open writing detail schedule popup
     *         schedule = {...};
     *     }
     *
     *     calendar.createSchedules([schedule]);
     * });
     */
    this.fire('beforeCreateSchedule', createScheduleData);
};

/**
 * @fires Calendar#beforeUpdateSchedule
 * @param {object} updateScheduleData - update schedule data
 * @private
 */
Calendar.prototype._onBeforeUpdate = function(updateScheduleData) {
    /**
     * Fire this event when drag a schedule to change time in daily, weekly, monthly.
     * @event Calendar#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to update
     * @property {Date} start - start time to update
     * @property {Date} end - end time to update
     * @example
     * calendar.on('beforeUpdateSchedule', function(event) {
     *     var schedule = event.schedule;
     *     var startTime = event.start;
     *     var endTime = event.end;
     *
     *     calendar.updateSchedule(schedule.id, schedule.calendarId, {
     *         start: startTime,
     *         end: endTime
     *     });
     * });
     */
    this.fire('beforeUpdateSchedule', updateScheduleData);
};

/**
 * @fires Calendar#beforeDeleteSchedule
 * @param {object} deleteScheduleData - delete schedule data
 * @private
 */
Calendar.prototype._onBeforeDelete = function(deleteScheduleData) {
    /**
     * Fire this event when delete a schedule.
     * @event Calendar#beforeDeleteSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to delete
     * @example
     * calendar.on('beforeDeleteSchedule', function(event) {
     *     var schedule = event.schedule;
     *     alert('The schedule is removed.', schedule);
     * });
     */
    this.fire('beforeDeleteSchedule', deleteScheduleData);
};

/**
 * @fires Calendar#afterRenderSchedule
 * @param {Schedule} scheduleData - schedule data
 * @private
 */
Calendar.prototype._onAfterRenderSchedule = function(scheduleData) {
    /**
     * Fire this event by every single schedule after rendering whole calendar.
     * @event Calendar#afterRenderSchedule
     * @type {object}
     * @property {Schedule} schedule - a rendered schedule instance
     * @example
     * calendar.on('afterRenderSchedule', function(event) {
     *     var schedule = event.schedule;
     *     var element = calendar.getElement(schedule.id, schedule.calendarId);
     *     // use the element
     *     console.log(element);
     * });
     */
    this.fire('afterRenderSchedule', scheduleData);
};

/**
 * @fires Calendar#clickTimezonesCollapseBtn
 * @param {boolean} timezonesCollapsed - timezones collapsed flag
 * @private
 */
Calendar.prototype._onClickTimezonesCollapseBtn = function(timezonesCollapsed) {
    /**
     * Fire this event by clicking timezones collapse button
     * @event Calendar#clickTimezonesCollapseBtn
     * @type {object}
     * @property {boolean} timezonesCollapsed - timezones collapes flag
     * @example
     * calendar.on('clickTimezonesCollapseBtn', function(timezonesCollapsed) {
     *     console.log(timezonesCollapsed);
     * });
     */
    this.fire('clickTimezonesCollapseBtn', timezonesCollapsed);
};

/**
 * Toggle calendar factory class, main view, wallview event connection
 * @param {boolean} isAttach - attach events if true.
 * @param {Week|Month} view - Weekly view or Monthly view
 * @private
 */
Calendar.prototype._toggleViewSchedule = function(isAttach, view) {
    var self = this,
        handler = view.handler,
        method = isAttach ? 'on' : 'off';

    util.forEach(handler.click, function(clickHandler) {
        clickHandler[method]('clickSchedule', self._onClick, self);
    });

    util.forEach(handler.dayname, function(clickHandler) {
        clickHandler[method]('clickDayname', self._onClickDayname, self);
    });

    util.forEach(handler.creation, function(creationHandler) {
        creationHandler[method]('beforeCreateSchedule', self._onBeforeCreate, self);
        creationHandler[method]('beforeDeleteSchedule', self._onBeforeDelete, self);
    });

    util.forEach(handler.move, function(moveHandler) {
        moveHandler[method]('beforeUpdateSchedule', self._onBeforeUpdate, self);
    });

    util.forEach(handler.resize, function(resizeHandler) {
        resizeHandler[method]('beforeUpdateSchedule', self._onBeforeUpdate, self);
    });

    // bypass events from view
    view[method]('afterRenderSchedule', self._onAfterRenderSchedule, self);
    view[method]('clickTimezonesCollapseBtn', self._onClickTimezonesCollapseBtn, self);
    view[method]('clickMore', self._onClickMore, self);
};

/**
 * Change current view with view name('day', 'week', 'month')
 * @param {string} newViewName - new view name to render
 * @param {boolean} force - force render despite of current view and new view are equal
 * @example
 * // daily view
 * calendar.changeView('day', true);
 *
 * // weekly view
 * calendar.changeView('week', true);
 *
 * // monthly view(default 6 weeks view)
 * calendar.setOptions({month: {visibleWeeksCount: 6}}, true); // or null
 * calendar.changeView('month', true);
 *
 * // 2 weeks monthly view
 * calendar.setOptions({month: {visibleWeeksCount: 2}}, true);
 * calendar.changeView('month', true);
 *
 * // 3 weeks monthly view
 * calendar.setOptions({month: {visibleWeeksCount: 3}}, true);
 * calendar.changeView('month', true);
 *
 * // narrow weekend
 * calendar.setOptions({month: {narrowWeekend: true}}, true);
 * calendar.setOptions({week: {narrowWeekend: true}}, true);
 * calendar.changeView(calendar.getViewName(), true);
 *
 * // change start day of week(from monday)
 * calendar.setOptions({week: {startDayOfWeek: 1}}, true);
 * calendar.setOptions({month: {startDayOfWeek: 1}}, true);
 * calendar.changeView(calendar.getViewName(), true);
 *
 * // work week
 * calendar.setOptions({week: {workweek: true}}, true);
 * calendar.setOptions({month: {workweek: true}}, true);
 * calendar.changeView(calendar.getViewName(), true);
 */
Calendar.prototype.changeView = function(newViewName, force) {
    var self = this,
        layout = this._layout,
        controller = this._controller,
        dragHandler = this._dragHandler,
        options = this._options,
        viewName = this._viewName,
        created;

    if (!force && viewName === newViewName) {
        return;
    }

    this._setViewName(newViewName);

    // convert day to week
    if (viewName === 'day') {
        viewName = 'week';
    }

    if (newViewName === 'day') {
        newViewName = 'week';
    }
    layout.children.doWhenHas(viewName, function(view) {
        self._toggleViewSchedule(false, view);
    });

    layout.clear();

    if (newViewName === 'month') {
        created = _createMonthView(
            controller,
            layout.container,
            dragHandler,
            options
        );
    } else if (newViewName === 'week' || newViewName === 'day') {
        created = _createWeekView(
            controller,
            layout.container,
            dragHandler,
            options
        );
    }

    layout.addChild(created.view);

    layout.children.doWhenHas(newViewName, function(view) {
        self._toggleViewSchedule(true, view);
    });

    this._refreshMethod = created.refresh;
    this._scrollToNowMethod = created.scrollToNow;
    this._openCreationPopup = created.openCreationPopup;
    this._showCreationPopup = created.showCreationPopup;
    this._hideMoreView = created.hideMoreView;

    this.move();
    this.render();
};

/**
 * @deprecated
 * Toggle task view('Milestone', 'Task') panel
 * @param {boolean} enabled - use task view
 * @example
 * // There is no milestone, task, so hide those view panel
 * calendar.toggleTaskView(false);
 *
 * // There are some milestone, task, so show those view panel.
 * calendar.toggleTaskView(true);
 */
Calendar.prototype.toggleTaskView = function(enabled) {
    var viewName = this._viewName,
        options = this._options;

    options.taskView = enabled;

    this.changeView(viewName, true);
};

/**
 * @deprecated
 * Toggle schedule view('AllDay', TimeGrid') panel
 * @param {boolean} enabled - use task view
 * @example
 * // hide those view panel to show only 'Milestone', 'Task'
 * calendar.toggleScheduleView(false);
 *
 * // show those view panel.
 * calendar.toggleScheduleView(true);
 */
Calendar.prototype.toggleScheduleView = function(enabled) {
    var viewName = this._viewName,
        options = this._options;

    options.scheduleView = enabled;

    this.changeView(viewName, true);
};

/**
 * Set current view name
 * @param {string} viewName - new view name to render
 * @private
 */
Calendar.prototype._setViewName = function(viewName) {
    this._viewName = viewName;
};

/**
 * Get a schedule element by schedule id and calendar id.
 * @param {string} scheduleId - ID of schedule
 * @param {string} calendarId - calendarId of schedule
 * @returns {HTMLElement} schedule element if found or null
 * @example
 * var element = calendar.getElement(scheduleId, calendarId);
 * console.log(element);
 */
Calendar.prototype.getElement = function(scheduleId, calendarId) {
    var schedule = this.getSchedule(scheduleId, calendarId);
    if (schedule) {
        return document.querySelector('[data-schedule-id="' + scheduleId + '"][data-calendar-id="' + calendarId + '"]');
    }

    return null;
};

/**
 * Set a theme. If some keys are not defined in the preset, will be return.
 * @param {object} theme - multiple styles map
 * @returns {Array.<string>} keys - error keys not predefined.
 * @example
 * cal.setTheme({
    'month.dayname.height': '31px',
    'common.dayname.color': '#333',
    'month.dayname.borderBottom': '1px solid #e5e5e5' // Not valid key  will be return.
 * });
 */
Calendar.prototype.setTheme = function(theme) {
    var result = this._controller.setTheme(theme);
    this.render(true);

    return result;
};

/**
 * Set options of calendar
 * @param {Options} options - options to set
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
Calendar.prototype.setOptions = function(options, silent) {
    util.forEach(options, function(value, name) {
        if (util.isObject(value) && !util.isArray(value)) {
            util.forEach(value, function(innerValue, innerName) {
                this._options[name][innerName] = innerValue;
            }, this);
        } else {
            this._options[name] = value;
        }
    }, this);

    if (!silent) {
        this.changeView(this._viewName, true);
    }
};

/**
 * Get current options.
 * @returns {Options} options
 */
Calendar.prototype.getOptions = function() {
    return this._options;
};

/**
 * Current rendered date
 * @returns {TZDate}
 */
Calendar.prototype.getDate = function() {
    return this._renderDate;
};

/**
 * Start time of rendered date range
 * @returns {TZDate}
 */
Calendar.prototype.getDateRangeStart = function() {
    return this._renderRange.start;
};

/**
 * End time of rendered date range
 * @returns {TZDate}
 */
Calendar.prototype.getDateRangeEnd = function() {
    return this._renderRange.end;
};

/**
 * Get current view name('day', 'week', 'month')
 * @returns {string} view name
 */
Calendar.prototype.getViewName = function() {
    return this._viewName;
};

/**
 * Set calendar list
 * @param {Array.<Object>} calendars - calendar list
 */
Calendar.prototype.setCalendars = function(calendars) {
    this._controller.setCalendars(calendars);
    this.render();
};

/**
 * Open schedule creation popup
 * @param {Schedule} schedule - preset schedule data
 */
Calendar.prototype.openCreationPopup = function(schedule) {
    if (this._openCreationPopup) {
        this._openCreationPopup(schedule);
    }
};

/**
 * Hide the more view
 */
Calendar.prototype.hideMoreView = function() {
    if (this._hideMoreView) {
        this._hideMoreView();
    }
};

/**
 * Set timezone offset
 * @param {number} offset - offset (min)
 * @static
 * @deprecated
 * @example
 * var timezoneName = moment.tz.guess();
 * tui.Calendar.setTimezoneOffset(moment.tz.zone(timezoneName).utcOffset(moment()));
 */
Calendar.setTimezoneOffset = function(offset) {
    timezone.setOffset(offset);
};

/**
 * Set a callback function to get timezone offset by timestamp
 * @param {function} callback - callback function
 * @static
 * @deprecated
 * @example
 * var timezoneName = moment.tz.guess();
 * tui.Calendar.setTimezoneOffsetCallback(function(timestamp) {
 *      return moment.tz.zone(timezoneName).utcOffset(timestamp));
 * });
 */
Calendar.setTimezoneOffsetCallback = function(callback) {
    timezone.setOffsetCallback(callback);
};

/**
 * Create controller instance
 * @returns {Base} controller instance
 * @param {Options} options - calendar options
 * @private
 */
function _createController(options) {
    return controllerFactory(options);
}

/**
 * Create week view instance by dependent module instances
 * @param {Base} controller - controller
 * @param {HTMLElement} container - container element
 * @param {Drag} dragHandler - global drag handler
 * @param {object} options - options for week view
 * @returns {Week} week view instance
 * @private
 */
function _createWeekView(controller, container, dragHandler, options) {
    return weekViewFactory(
        controller,
        container,
        dragHandler,
        options
    );
}

/**
 * Create week view instance by dependent module instances
 * @param {Base} controller - controller
 * @param {HTMLElement} container - container element
 * @param {Drag} dragHandler - global drag handler
 * @param {object} options - options for week view
 * @returns {Month} month view instance
 * @private
 */
function _createMonthView(controller, container, dragHandler, options) {
    return monthViewFactory(
        controller,
        container,
        dragHandler,
        options
    );
}

/**
 * Set child view's options recursively
 * @param {View} view - parent view
 * @param {function} func - option manipulate function
 * @private
 */
function _setOptionRecurseively(view, func) {
    view.recursive(function(childView) {
        var opt = childView.options;

        if (!opt) {
            return;
        }

        func(childView, opt);
    });
}

util.CustomEvents.mixin(Calendar);

module.exports = Calendar;


/***/ }),

/***/ "./src/js/factory/controller.js":
/*!**************************************!*\
  !*** ./src/js/factory/controller.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Controller factory module.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var Base = __webpack_require__(/*! ../controller/base */ "./src/js/controller/base.js"),
    Core = __webpack_require__(/*! ../controller/viewMixin/core */ "./src/js/controller/viewMixin/core.js"),
    Week = __webpack_require__(/*! ../controller/viewMixin/week */ "./src/js/controller/viewMixin/week.js"),
    Month = __webpack_require__(/*! ../controller/viewMixin/month */ "./src/js/controller/viewMixin/month.js");

/**
 * Mixin object. create object property to target and mix to that
 * @param {object} from - source object
 * @param {object} to - target object
 * @param {string} propertyName - property name
 */
function mixin(from, to, propertyName) {
    var obj = to[propertyName] = {};

    util.forEach(from, function(method, methodName) {
        obj[methodName] = util.bind(method, to);
    });
}

/**
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @returns {Base} The controller instance.
 */
module.exports = function(options) {
    var controller = new Base(options);

    mixin(Core, controller, 'Core');
    mixin(Week, controller, 'Week');
    mixin(Month, controller, 'Month');

    // for Theme
    controller.Core.theme = controller.theme;
    controller.Week.theme = controller.theme;
    controller.Month.theme = controller.theme;

    return controller;
};


/***/ }),

/***/ "./src/js/factory/monthView.js":
/*!*************************************!*\
  !*** ./src/js/factory/monthView.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Month view factory module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../config */ "./src/js/config.js"),
    array = __webpack_require__(/*! ../common/array */ "./src/js/common/array.js"),
    datetime = __webpack_require__(/*! ../common/datetime */ "./src/js/common/datetime.js"),
    domutil = __webpack_require__(/*! ../common/domutil */ "./src/js/common/domutil.js"),
    common = __webpack_require__(/*! ../common/common */ "./src/js/common/common.js"),
    Month = __webpack_require__(/*! ../view/month/month */ "./src/js/view/month/month.js"),
    MonthClick = __webpack_require__(/*! ../handler/month/click */ "./src/js/handler/month/click.js"),
    MonthCreation = __webpack_require__(/*! ../handler/month/creation */ "./src/js/handler/month/creation.js"),
    MonthResize = __webpack_require__(/*! ../handler/month/resize */ "./src/js/handler/month/resize.js"),
    MonthMove = __webpack_require__(/*! ../handler/month/move */ "./src/js/handler/month/move.js"),
    More = __webpack_require__(/*! ../view/month/more */ "./src/js/view/month/more.js"),
    ScheduleCreationPopup = __webpack_require__(/*! ../view/popup/scheduleCreationPopup */ "./src/js/view/popup/scheduleCreationPopup.js"),
    ScheduleDetailPopup = __webpack_require__(/*! ../view/popup/scheduleDetailPopup */ "./src/js/view/popup/scheduleDetailPopup.js"),
    Schedule = __webpack_require__(/*! ../model/schedule */ "./src/js/model/schedule.js");

/**
 * Get the view model for more layer
 * @param {TZDate} date - date has more schedules
 * @param {HTMLElement} target - target element
 * @param {Collection} schedules - schedule collection
 * @param {string[]} daynames - daynames to use upside of month more view
 * @returns {object} view model
 */
function getViewModelForMoreLayer(date, target, schedules, daynames) {
    schedules.each(function(schedule) {
        var model = schedule.model;
        schedule.hasMultiDates = !datetime.isSameDate(model.start, model.end);
    });

    return {
        target: target,
        date: datetime.format(date, 'YYYY.MM.DD'),
        dayname: daynames[date.getDay()],
        schedules: schedules.sort(array.compare.schedule.asc)
    };
}

/**
 * @param {Base} baseController - controller instance
 * @param {HTMLElement} layoutContainer - container element for month view
 * @param {Drag} dragHandler - drag handler instance
 * @param {object} options - options
 * @returns {object} view instance and refresh method
 */
function createMonthView(baseController, layoutContainer, dragHandler, options) {
    var monthViewContainer, monthView, moreView, createView;
    var clickHandler, creationHandler, resizeHandler, moveHandler, clearSchedulesHandler, onUpdateSchedule;
    var onShowCreationPopup, onSaveNewSchedule, onShowEditPopup;
    var detailView, onShowDetailPopup, onDeleteSchedule, onEditSchedule;

    monthViewContainer = domutil.appendHTMLElement(
        'div', layoutContainer, config.classname('month'));

    monthView = new Month(options, monthViewContainer, baseController.Month);
    moreView = new More(options.month, layoutContainer, baseController.theme);

    // handlers
    clickHandler = new MonthClick(dragHandler, monthView, baseController);
    if (!options.isReadOnly) {
        creationHandler = new MonthCreation(dragHandler, monthView, baseController, options);
        resizeHandler = new MonthResize(dragHandler, monthView, baseController);
        moveHandler = new MonthMove(dragHandler, monthView, baseController);
    }

    clearSchedulesHandler = function() {
        if (moreView) {
            moreView.hide();
        }
    };

    onUpdateSchedule = function() {
        if (moreView) {
            moreView.refresh();
        }
    };

    // binding +n click schedule
    clickHandler.on('clickMore', function(clickMoreSchedule) {
        var date = clickMoreSchedule.date,
            target = clickMoreSchedule.target,
            schedules = util.pick(baseController.findByDateRange(
                datetime.start(date),
                datetime.end(date)
            ), clickMoreSchedule.ymd);

        schedules.items = util.filter(schedules.items, function(item) {
            return options.month.scheduleFilter(item.model);
        });

        if (schedules && schedules.length) {
            moreView.render(getViewModelForMoreLayer(date, target, schedules, monthView.options.daynames));

            schedules.each(function(scheduleViewModel) {
                if (scheduleViewModel) {
                    /**
                     * @event More#afterRenderSchedule
                     */
                    monthView.fire('afterRenderSchedule', {schedule: scheduleViewModel.model});
                }
            });

            monthView.fire('clickMore', {
                date: clickMoreSchedule.date,
                target: moreView.getMoreViewElement()
            });
        }
    });

    // binding popup for schedules creation
    if (options.useCreationPopup) {
        createView = new ScheduleCreationPopup(layoutContainer, baseController.calendars);

        onSaveNewSchedule = function(scheduleData) {
            creationHandler.fire('beforeCreateSchedule', util.extend(scheduleData, {
                useCreationPopup: true
            }));
        };
        createView.on('beforeCreateSchedule', onSaveNewSchedule);
    }

    // binding popup for schedule detail
    if (options.useDetailPopup) {
        detailView = new ScheduleDetailPopup(layoutContainer, baseController.calendars);
        onShowDetailPopup = function(eventData) {
            var scheduleId = eventData.schedule.calendarId;
            eventData.calendar = common.find(baseController.calendars, function(calendar) {
                return calendar.id === scheduleId;
            });

            if (options.isReadOnly) {
                eventData.schedule = util.extend({}, eventData.schedule, {isReadOnly: true});
            }

            detailView.render(eventData);
        };
        onDeleteSchedule = function(eventData) {
            if (creationHandler) {
                creationHandler.fire('beforeDeleteSchedule', eventData);
            }
        };
        onEditSchedule = function(eventData) {
            moveHandler.fire('beforeUpdateSchedule', eventData);
        };

        clickHandler.on('clickSchedule', onShowDetailPopup);

        detailView.on('beforeDeleteSchedule', onDeleteSchedule);

        if (options.useCreationPopup) {
            onShowEditPopup = function(eventData) {
                createView.setCalendars(baseController.calendars);
                createView.render(eventData);
            };
            createView.on('beforeUpdateSchedule', onEditSchedule);
            detailView.on('beforeUpdateSchedule', onShowEditPopup);
        } else {
            detailView.on('beforeUpdateSchedule', onEditSchedule);
        }
    }

    // binding clear schedules
    baseController.on('clearSchedules', clearSchedulesHandler);

    // bind update schedule event
    baseController.on('updateSchedule', onUpdateSchedule);

    if (moveHandler) {
        moveHandler.on('monthMoveStart_from_morelayer', function() {
            moreView.hide();
        });
    }

    monthView.handler = {
        click: {
            'default': clickHandler
        }
    };

    if (!options.isReadOnly) {
        monthView.handler = util.extend(monthView.handler, {
            creation: {
                'default': creationHandler
            },
            resize: {
                'default': resizeHandler
            },
            move: {
                'default': moveHandler
            }
        });
    }

    monthView._beforeDestroy = function() {
        moreView.destroy();
        baseController.off('clearSchedules', clearSchedulesHandler);
        baseController.off('updateSchedule', onUpdateSchedule);

        util.forEach(monthView.handler, function(type) {
            util.forEach(type, function(handler) {
                handler.off();
                handler.destroy();
            });
        });

        if (options.useCreationPopup && options.useDetailPopup) {
            createView.off('beforeUpdateSchedule', onUpdateSchedule);
        }

        if (options.useCreationPopup) {
            if (creationHandler) {
                creationHandler.off('beforeCreateSchedule', onShowCreationPopup);
            }
            createView.off('saveSchedule', onSaveNewSchedule);
            createView.destroy();
        }

        if (options.useDetailPopup) {
            clickHandler.off('clickSchedule', onShowDetailPopup);
            detailView.off('beforeUpdateSchedule', onUpdateSchedule);
            detailView.off('beforeDeleteSchedule', onDeleteSchedule);
            detailView.destroy();
        }
    };

    // add controller
    monthView.controller = baseController.Month;

    return {
        view: monthView,
        refresh: function() {
            monthView.vLayout.refresh();
        },
        openCreationPopup: function(schedule) {
            if (createView && creationHandler) {
                creationHandler.invokeCreationClick(Schedule.create(schedule));
            }
        },
        showCreationPopup: function(eventData) {
            if (createView) {
                createView.setCalendars(baseController.calendars);
                createView.render(eventData);
            }
        },
        hideMoreView: function() {
            if (moreView) {
                moreView.hide();
            }
        }
    };
}

module.exports = createMonthView;



/***/ }),

/***/ "./src/js/factory/weekView.js":
/*!************************************!*\
  !*** ./src/js/factory/weekView.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Factory module for WeekView
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../config */ "./src/js/config.js");
var domutil = __webpack_require__(/*! ../common/domutil */ "./src/js/common/domutil.js");
var common = __webpack_require__(/*! ../common/common */ "./src/js/common/common.js");
var VLayout = __webpack_require__(/*! ../common/vlayout */ "./src/js/common/vlayout.js");
var reqAnimFrame = __webpack_require__(/*! ../common/reqAnimFrame */ "./src/js/common/reqAnimFrame.js");
var Schedule = __webpack_require__(/*! ../model/schedule */ "./src/js/model/schedule.js");
// Parent views
var Week = __webpack_require__(/*! ../view/week/week */ "./src/js/view/week/week.js");

// Sub views
var DayName = __webpack_require__(/*! ../view/week/dayname */ "./src/js/view/week/dayname.js");
var DayGrid = __webpack_require__(/*! ../view/week/dayGrid */ "./src/js/view/week/dayGrid.js");
var TimeGrid = __webpack_require__(/*! ../view/week/timeGrid */ "./src/js/view/week/timeGrid.js");
var ScheduleCreationPopup = __webpack_require__(/*! ../view/popup/scheduleCreationPopup */ "./src/js/view/popup/scheduleCreationPopup.js");
var ScheduleDetailPopup = __webpack_require__(/*! ../view/popup/scheduleDetailPopup */ "./src/js/view/popup/scheduleDetailPopup.js");

// Handlers
var DayNameClick = __webpack_require__(/*! ../handler/time/clickDayname */ "./src/js/handler/time/clickDayname.js");
var DayGridClick = __webpack_require__(/*! ../handler/daygrid/click */ "./src/js/handler/daygrid/click.js");
var DayGridCreation = __webpack_require__(/*! ../handler/daygrid/creation */ "./src/js/handler/daygrid/creation.js");
var DayGridMove = __webpack_require__(/*! ../handler/daygrid/move */ "./src/js/handler/daygrid/move.js");
var DayGridResize = __webpack_require__(/*! ../handler/daygrid/resize */ "./src/js/handler/daygrid/resize.js");
var TimeClick = __webpack_require__(/*! ../handler/time/click */ "./src/js/handler/time/click.js");
var TimeCreation = __webpack_require__(/*! ../handler/time/creation */ "./src/js/handler/time/creation.js");
var TimeMove = __webpack_require__(/*! ../handler/time/move */ "./src/js/handler/time/move.js");
var TimeResize = __webpack_require__(/*! ../handler/time/resize */ "./src/js/handler/time/resize.js");

var DAYGRID_HANDLDERS = {
    'click': DayGridClick,
    'creation': DayGridCreation,
    'move': DayGridMove,
    'resize': DayGridResize
};
var TIMEGRID_HANDLERS = {
    'click': TimeClick,
    'creation': TimeCreation,
    'move': TimeMove,
    'resize': TimeResize
};
var DEFAULT_PANELS = [
    {
        name: 'milestone',
        type: 'daygrid',
        minHeight: 20,
        maxHeight: 80,
        showExpandableButton: true,
        maxExpandableHeight: 210,
        handlers: ['click'],
        show: true
    },
    {
        name: 'task',
        type: 'daygrid',
        minHeight: 40,
        maxHeight: 120,
        showExpandableButton: true,
        maxExpandableHeight: 210,
        handlers: ['click', 'move'],
        show: true
    },
    {
        name: 'allday',
        type: 'daygrid',
        minHeight: 30,
        maxHeight: 80,
        showExpandableButton: true,
        maxExpandableHeight: 210,
        handlers: ['click', 'creation', 'move', 'resize'],
        show: true
    },
    {
        name: 'time',
        type: 'timegrid',
        autoHeight: true,
        handlers: ['click', 'creation', 'move', 'resize'],
        show: true
    }
];

/* eslint-disable complexity*/
module.exports = function(baseController, layoutContainer, dragHandler, options) {
    var panels = [],
        vpanels = [];
    var weekView, dayNameContainer, dayNameView, vLayoutContainer, vLayout;
    var createView, onSaveNewSchedule, onSetCalendars, lastVPanel;
    var detailView, onShowDetailPopup, onDeleteSchedule, onShowEditPopup, onEditSchedule;
    var taskView = options.taskView;
    var scheduleView = options.scheduleView;
    var viewVisibilities = {
        'milestone': util.isArray(taskView) ? util.inArray('milestone', taskView) >= 0 : taskView,
        'task': util.isArray(taskView) ? util.inArray('task', taskView) >= 0 : taskView,
        'allday': util.isArray(scheduleView) ? util.inArray('allday', scheduleView) >= 0 : scheduleView,
        'time': util.isArray(scheduleView) ? util.inArray('time', scheduleView) >= 0 : scheduleView
    };

    // Make panels by view sequence and visibilities
    util.forEach(DEFAULT_PANELS, function(panel) {
        var name = panel.name;

        panel = util.extend({}, panel);
        panels.push(panel);

        // Change visibilities
        panel.show = viewVisibilities[name];

        if (panel.show) {
            if (vpanels.length) {
                vpanels.push({
                    isSplitter: true
                });
            }
            vpanels.push(util.extend({}, panel));
        }
    });

    if (vpanels.length) {
        lastVPanel = vpanels[vpanels.length - 1];
        lastVPanel.autoHeight = true;
        lastVPanel.maxHeight = null;
        lastVPanel.showExpandableButton = false;

        util.forEach(panels, function(panel) {
            if (panel.name === lastVPanel.name) {
                panel.showExpandableButton = false;

                return false;
            }

            return true;
        });
    }

    util.extend(options.week, {panels: panels});

    weekView = new Week(null, options.week, layoutContainer, panels);
    weekView.handler = {
        click: {},
        dayname: {},
        creation: {},
        move: {},
        resize: {}
    };

    dayNameContainer = domutil.appendHTMLElement('div', weekView.container, config.classname('dayname-layout'));

    /**********
     * Day name (top row(Mon, Tue, Wed...))
     **********/
    dayNameView = new DayName(options, dayNameContainer, baseController.theme);
    weekView.handler.dayname.date = new DayNameClick(dragHandler, dayNameView, baseController);
    weekView.addChild(dayNameView);

    /**********
     * Initialize vertical layout module
     **********/
    vLayoutContainer = domutil.appendHTMLElement('div', weekView.container, config.classname('vlayout-area'));
    vLayoutContainer.style.height = (domutil.getSize(weekView.container)[1] - dayNameView.container.offsetHeight) + 'px';

    vLayout = new VLayout({
        panels: vpanels,
        panelHeights: options.week.panelHeights || []
    }, vLayoutContainer, baseController.theme);

    weekView.vLayout = vLayout;

    util.forEach(panels, function(panel) {
        var name = panel.name;
        var handlers = panel.handlers;
        var view;

        if (!panel.show) {
            return;
        }

        if (panel.type === 'daygrid') {
            /**********
             * Schedule panel by Grid
             **********/
            view = new DayGrid(name, options, vLayout.getPanelByName(panel.name).container, baseController.theme);
            view.on('afterRender', function(viewModel) {
                vLayout.getPanelByName(name).setHeight(null, viewModel.height);
            });

            weekView.addChild(view);

            util.forEach(handlers, function(type) {
                if (!options.isReadOnly || type === 'click') {
                    weekView.handler[type][name] =
                        new DAYGRID_HANDLDERS[type](dragHandler, view, baseController, options);
                    view.addHandler(type, weekView.handler[type][name], vLayout.getPanelByName(name));
                }
            });
        } else if (panel.type === 'timegrid') {
            /**********
             * Schedule panel by TimeGrid
             **********/
            view = new TimeGrid(name, options, vLayout.getPanelByName(name).container);
            weekView.addChild(view);
            util.forEach(handlers, function(type) {
                if (!options.isReadOnly || type === 'click') {
                    weekView.handler[type][name] =
                        new TIMEGRID_HANDLERS[type](dragHandler, view, baseController, options);
                }
            });

            view.on('clickTimezonesCollapsedBtn', function() {
                var timezonesCollapsed = !weekView.state.timezonesCollapsed;

                weekView.setState({
                    timezonesCollapsed: timezonesCollapsed
                });
                reqAnimFrame.requestAnimFrame(function() {
                    if (!weekView.invoke('clickTimezonesCollapseBtn', timezonesCollapsed)) {
                        weekView.render();
                    }
                });
            });
        }
    });

    vLayout.on('resize', function() {
        reqAnimFrame.requestAnimFrame(function() {
            weekView.render();
        });
    });

    // binding create schedules event
    if (options.useCreationPopup) {
        createView = new ScheduleCreationPopup(layoutContainer, baseController.calendars);

        onSaveNewSchedule = function(scheduleData) {
            util.extend(scheduleData, {
                useCreationPopup: true
            });
            if (scheduleData.isAllDay) {
                weekView.handler.creation.allday.fire('beforeCreateSchedule', scheduleData);
            } else {
                weekView.handler.creation.time.fire('beforeCreateSchedule', scheduleData);
            }
        };
        createView.on('beforeCreateSchedule', onSaveNewSchedule);
    }

    onSetCalendars = function(calendars) {
        if (createView) {
            createView.setCalendars(calendars);
        }
    };

    baseController.on('setCalendars', onSetCalendars);

    // binding popup for schedule detail
    if (options.useDetailPopup) {
        detailView = new ScheduleDetailPopup(layoutContainer, baseController.calendars);
        onShowDetailPopup = function(eventData) {
            var scheduleId = eventData.schedule.calendarId;
            eventData.calendar = common.find(baseController.calendars, function(calendar) {
                return calendar.id === scheduleId;
            });

            if (options.isReadOnly) {
                eventData.schedule = util.extend({}, eventData.schedule, {isReadOnly: true});
            }

            detailView.render(eventData);
        };
        onDeleteSchedule = function(eventData) {
            if (eventData.isAllDay) {
                weekView.handler.creation.allday.fire('beforeDeleteSchedule', eventData);
            } else {
                weekView.handler.creation.time.fire('beforeDeleteSchedule', eventData);
            }
        };
        onEditSchedule = function(eventData) {
            if (eventData.isAllDay) {
                weekView.handler.move.allday.fire('beforeUpdateSchedule', eventData);
            } else {
                weekView.handler.move.time.fire('beforeUpdateSchedule', eventData);
            }
        };

        util.forEach(weekView.handler.click, function(panel) {
            panel.on('clickSchedule', onShowDetailPopup);
        });
        if (options.useCreationPopup) {
            onShowEditPopup = function(eventData) {
                var calendars = baseController.calendars;
                eventData.isEditMode = true;
                createView.setCalendars(calendars);
                createView.render(eventData);
            };
            createView.on('beforeUpdateSchedule', onEditSchedule);
            detailView.on('beforeUpdateSchedule', onShowEditPopup);
        } else {
            detailView.on('beforeUpdateSchedule', onEditSchedule);
        }
        detailView.on('beforeDeleteSchedule', onDeleteSchedule);
    }

    weekView.on('afterRender', function() {
        vLayout.refresh();
    });

    // add controller
    weekView.controller = baseController.Week;

    // add destroy
    weekView._beforeDestroy = function() {
        util.forEach(weekView.handler, function(type) {
            util.forEach(type, function(handler) {
                handler.off();
                handler.destroy();
            });
        });

        if (options.useCreationPopup) {
            createView.off('beforeCreateSchedule', onSaveNewSchedule);
            createView.destroy();
        }

        if (options.useDetailPopup) {
            detailView.off('beforeDeleteSchedule', onDeleteSchedule);
            detailView.destroy();
        }

        weekView.off();
    };

    return {
        view: weekView,
        refresh: function() {
            var weekViewHeight = weekView.getViewBound().height,
                daynameViewHeight = domutil.getBCRect(
                    dayNameView.container
                ).height;

            vLayout.container.style.height =
                weekViewHeight - daynameViewHeight + 'px';
            vLayout.refresh();
        },
        scrollToNow: function() {
            weekView.children.each(function(childView) {
                if (childView.scrollToNow) {
                    childView.scrollToNow();
                }
            });
        },
        openCreationPopup: function(schedule) {
            if (createView) {
                if (schedule.isAllDay) {
                    weekView.handler.creation.allday.invokeCreationClick(Schedule.create(schedule));
                } else {
                    weekView.handler.creation.time.invokeCreationClick(Schedule.create(schedule));
                }
            }
        },
        showCreationPopup: function(eventData) {
            if (createView) {
                createView.setCalendars(baseController.calendars);
                createView.render(eventData);
            }
        }
    };
};


/***/ }),

/***/ "./src/js/handler/daygrid/click.js":
/*!*****************************************!*\
  !*** ./src/js/handler/daygrid/click.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Click handle module for daygrid schedules
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var DayGridMove = __webpack_require__(/*! ./move */ "./src/js/handler/daygrid/move.js");

/**
 * @constructor
 * @implements {Handler}
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {DayGrid} [view] - daygrid view instance.
 * @param {Base} [controller] - Base controller instance.
 */
function DayGridClick(dragHandler, view, controller) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {DayGrid}
     */
    this.view = view;

    /**
     * @type {Base}
     */
    this.controller = controller;

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destroy handler module
 */
DayGridClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.view = this.controller = this.dragHandler = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {string} - model id
 */
DayGridClick.prototype.checkExpectCondition = DayGridMove.prototype.checkExpectedCondition;

/**
 * Click event handler
 * @param {object} clickEvent - click event data
 * @emits DayGridClick#clickSchedule
 * @emits DayGridClick#collapse
 * @emits DayGridClick#expand
 */
DayGridClick.prototype._onClick = function(clickEvent) {
    var self = this,
        target = clickEvent.target,
        dayGridScheduleView = this.checkExpectCondition(target),
        scheduleCollection = this.controller.schedules,
        collapseBtnElement = domutil.closest(
            target,
            config.classname('.weekday-collapse-btn')
        ),
        expandBtnElement = domutil.closest(
            target,
            config.classname('.weekday-exceed-in-week')
        ),
        containsTarget = this.view.container.contains(target);
    var blockElement, scheduleElement;

    if (!containsTarget) {
        return;
    }

    if (collapseBtnElement) {
        /**
         * click collpase btn event
         * @events DayGridClick#collapse
         */
        self.fire('collapse');

        return;
    }

    if (expandBtnElement) {
        this.view.setState({
            clickedExpandBtnIndex: parseInt(domutil.getData(expandBtnElement, 'index'), 10)
        });

        /**
         * click expand btn event
         * @events DayGridClick#expand
         */
        self.fire('expand');

        return;
    }

    if (!dayGridScheduleView) {
        return;
    }

    scheduleElement = domutil.closest(target, config.classname('.weekday-schedule'));
    if (scheduleElement) {
        blockElement = domutil.closest(target, config.classname('.weekday-schedule-block'));
        scheduleCollection.doWhenHas(domutil.getData(blockElement, 'id'), function(schedule) {
            /**
             * @events DayGridClick#clickSchedule
             * @type {object}
             * @property {Schedule} schedule - schedule instance
             * @property {MouseEvent} event - MouseEvent object
             */
            self.fire('clickSchedule', {
                schedule: schedule,
                event: clickEvent.originEvent
            });
        });
    }
};

util.CustomEvents.mixin(DayGridClick);

module.exports = DayGridClick;


/***/ }),

/***/ "./src/js/handler/daygrid/core.js":
/*!****************************************!*\
  !*** ./src/js/handler/daygrid/core.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint no-shadow: 0 */
/**
 * @fileoverview Base mixin object for handler/daygrid
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var domevent = __webpack_require__(/*! ../../common/domevent */ "./src/js/common/domevent.js");
var common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");

var mmax = Math.max,
    mmin = Math.min;

/**
 * @mixin dayGridCore
 */
var dayGridCore = {
    /**
     * @param {view} view - view instance.
     * @param {MouseEvent} mouseEvent - mouse schedule object.
     * @returns {function|boolean} function that return schedule data by mouse events.
     */
    _retriveScheduleData: function(view, mouseEvent) {
        var weekdayView = view.children.single(),
            container,
            datesInRange,
            containerWidth,
            mousePos,
            dragStartXIndex,
            grids,
            range;

        if (!weekdayView) {
            return false;
        }

        container = weekdayView.container;
        range = weekdayView.getRenderDateRange();
        datesInRange = range.length;
        grids = weekdayView.getRenderDateGrids();

        containerWidth = domutil.getSize(container)[0];
        mousePos = domevent.getMousePosition(mouseEvent, container);
        dragStartXIndex = getX(grids, common.ratio(containerWidth, 100, mousePos[0]));

        /**
         * @param {MouseEvent} mouseEvent - mouse schedule in drag actions.
         * @returns {object} schedule data.
         */
        return function(mouseEvent) {
            var pos = domevent.getMousePosition(mouseEvent, container),
                mouseX = pos[0],
                xIndex = getX(grids, common.ratio(containerWidth, 100, mouseX));

            // apply limitation of creation schedule X index.
            xIndex = mmax(xIndex, 0);
            xIndex = mmin(xIndex, datesInRange - 1);

            return {
                relatedView: view,
                dragStartXIndex: dragStartXIndex,
                datesInRange: datesInRange,
                xIndex: xIndex,
                triggerEvent: mouseEvent.type,
                grids: grids,
                range: range
            };
        };
    },

    /**
     * @param {view} view - view instance.
     * @param {TZDate} startDate - start date
     * @returns {function|boolean} function that return schedule data by mouse events.
     */
    _retriveScheduleDataFromDate: function(view, startDate) {
        var weekdayView = view.children.single(),
            datesInRange,
            dragStartXIndex = 0,
            grids,
            range;

        if (!weekdayView) {
            return false;
        }

        range = weekdayView.getRenderDateRange();
        datesInRange = range.length;
        grids = weekdayView.getRenderDateGrids();

        util.forEach(range, function(date, index) {
            if (datetime.isSameDate(date, startDate)) {
                dragStartXIndex = index;
            }
        });

        /**
         * @param {TZDate} targetDate - target date
         * @returns {object} schedule data.
         */
        return function(targetDate) {
            var xIndex = 0;

            util.forEach(range, function(date, index) {
                if (datetime.isSameDate(date, targetDate)) {
                    xIndex = index;
                }
            });

            // apply limitation of creation schedule X index.
            xIndex = mmax(xIndex, 0);
            xIndex = mmin(xIndex, datesInRange - 1);

            return {
                relatedView: view,
                dragStartXIndex: dragStartXIndex,
                datesInRange: datesInRange,
                xIndex: xIndex,
                triggerEvent: 'manual',
                grids: grids,
                range: range
            };
        };
    }
};

/**
 * Get the left index
 * @param {Array} grids - grid size information
 * @param {number} left - left position(percent)
 * @returns {number} grid left index
 */
function getX(grids, left) {
    var i = 0;
    var length = grids.length;
    var grid;
    if (left < 0) {
        left = 0;
    }

    for (; i < length; i += 1) {
        grid = grids[i];
        if (grid.left <= left && left <= (grid.left + grid.width)) {
            return i;
        }
    }

    return i;
}

module.exports = dayGridCore;



/***/ }),

/***/ "./src/js/handler/daygrid/creation.js":
/*!********************************************!*\
  !*** ./src/js/handler/daygrid/creation.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Handler module for WeekdayInWeek view's creation actions.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var domevent = __webpack_require__(/*! ../../common/domevent */ "./src/js/common/domevent.js");
var dayGridCore = __webpack_require__(/*! ./core */ "./src/js/handler/daygrid/core.js");
var DayGridCreationGuide = __webpack_require__(/*! ./creationGuide */ "./src/js/handler/daygrid/creationGuide.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;

var CLICK_DELAY = 300;

/**
 * @constructor
 * @implements {Handler}
 * @mixes dayGridCore
 * @mixes CutomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {DayGrid} [view] - DayGrid view instance.
 * @param {Base} [controller] - Base controller instance.
 * @param {Options} [options] - calendar Options
 */
function DayGridCreation(dragHandler, view, controller, options) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * view instance.
     * @type {DayGrid}
     */
    this.view = view;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.controller = controller;

    /**
     * @type {function}
     */
    this.getScheduleDataFunc = null;

    /**
     * @type {DayGridCreationGuide}
     */
    this.guide = new DayGridCreationGuide(this);

    /**
     * @type {boolean}
     */
    this._requestOnClick = false;

    dragHandler.on('dragStart', this._onDragStart, this);
    dragHandler.on('click', this._onClick, this);

    if (options.disableDblClick) {
        CLICK_DELAY = 0;
    } else {
        domevent.on(view.container, 'dblclick', this._onDblClick, this);
    }
}

/**
 * Destroy method
 */
DayGridCreation.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);

    if (this.view && this.view.container) {
        domevent.off(this.view.container, 'dblclick', this._onDblClick, this);
    }

    this.dragHandler = this.view = this.controller = this.getScheduleDataFunc = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|WeekdayInWeek} return WeekdayInWeek view instance when satiate condition.
 */
DayGridCreation.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target).trim();
    var excludeTarget = true;
    var matches, schedulesElement;

    if (domutil.closest(target, config.classname('.weekday-exceed-in-week'))
        || domutil.closest(target, config.classname('.weekday-collapse-btn'))
    ) {
        return false;
    }

    if (domutil.closest(target, config.classname('.weekday-schedule-block'), excludeTarget)) {
        return false;
    }

    schedulesElement = domutil.closest(target, config.classname('.weekday-schedules'));
    if (!schedulesElement && cssClass !== config.classname('weekday-schedules')) {
        return false;
    }

    target = schedulesElement ? schedulesElement.parentNode : target.parentNode;
    cssClass = domutil.getClass(target);
    matches = cssClass.match(config.daygrid.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.view.children.items, matches[1]);
};

/**
 * Request schedule model creation to controller by custom schedules.
 * @fires {DayGridCreation#beforeCreateSchedule}
 * @param {object} scheduleData - schedule data from DayGridCreation module.
 */
DayGridCreation.prototype._createSchedule = function(scheduleData) {
    var dateRange = scheduleData.range,
        startXIndex = scheduleData.dragStartXIndex,
        xIndex = scheduleData.xIndex,
        start, end;

    // when inverse start, end then change it.
    if (xIndex < startXIndex) {
        startXIndex = xIndex + startXIndex;
        xIndex = startXIndex - xIndex;
        startXIndex = startXIndex - xIndex;
    }

    start = new TZDate(dateRange[startXIndex].getTime());
    end = datetime.end(dateRange[xIndex]);

    /**
     * @event {DayGridCreation#beforeCreateSchedule}
     * @type {object}
     * @property {string} category - schedule category
     * @property {boolean} isAllDay - whether schedule is fired in view area?
     * @property {Date} start - select start time
     * @property {Date} end - select end time
     * @property {DayGridCreationGuide} guide - DayGridCreationGuide instance
     * @property {string} triggerEventName - event name
     */
    this.fire('beforeCreateSchedule', {
        category: this.view.options.viewName,
        isAllDay: true,
        start: start,
        end: end,
        guide: this.guide,
        triggerEventName: scheduleData.triggerEvent
    });
};

/**
 * DragStart event handler method.
 * @emits DayGridCreation#dragstart
 * @param {object} dragStartEventData - Drag#dragStart event handler schedule data.
 */
DayGridCreation.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        getScheduleDataFunc,
        scheduleData;

    if (!result) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    getScheduleDataFunc = this._retriveScheduleData(this.view, dragStartEventData.originEvent);
    this.getScheduleDataFunc = getScheduleDataFunc;

    scheduleData = getScheduleDataFunc(dragStartEventData.originEvent);

    /**
     * @event DayGridCreation#dragstart
     * @type {object}
     * @property {DayGridView} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('dragstart', scheduleData);
};

/**
 * Drag event handler method.
 * @emits DayGridCreation#drag
 * @param {object} dragEventData - Drag#drag event handler scheduledata.
 */
DayGridCreation.prototype._onDrag = function(dragEventData) {
    var getScheduleDataFunc = this.getScheduleDataFunc,
        scheduleData;

    if (!getScheduleDataFunc) {
        return;
    }

    scheduleData = getScheduleDataFunc(dragEventData.originEvent);

    /**
     * @event DayGridCreation#drag
     * @type {object}
     * @property {DayGridView} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('drag', scheduleData);
};

/**
 * DragEnd event hander method.
 * @emits DayGridCreation#dragend
 * @param {object} dragEndEventData - Drag#dragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 */
DayGridCreation.prototype._onDragEnd = function(dragEndEventData, overrideEventName) {
    var getScheduleDataFunc = this.getScheduleDataFunc;
    var scheduleData;

    if (!getScheduleDataFunc) {
        return;
    }

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    scheduleData = getScheduleDataFunc(dragEndEventData.originEvent);

    this._createSchedule(scheduleData);

    /**
     * @event DayGridCreation#dragend
     * @type {object}
     * @property {DayGridView} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'dragend', scheduleData);

    this.getScheduleDataFunc = null;
};

/**
 * Click event handler method.
 * @emits DayGridCreation#click
 * @param {object} clickEventData - Drag#click event handler data.
 */
DayGridCreation.prototype._onClick = function(clickEventData) {
    var self = this;
    var getScheduleDataFunc, scheduleData;

    if (!this.checkExpectedCondition(clickEventData.target)) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(this.view, clickEventData.originEvent);
    scheduleData = getScheduleDataFunc(clickEventData.originEvent);

    this._requestOnClick = true;
    setTimeout(function() {
        if (self._requestOnClick) {
            self.fire('click', scheduleData);
            self._createSchedule(scheduleData);
        }
        self._requestOnClick = false;
    }, CLICK_DELAY);
};

/**
 * Dblclick event handler method.
 * @emits DayGridCreation#click
 * @param {object} clickEventData - Drag#Click event handler data.
 */
DayGridCreation.prototype._onDblClick = function(clickEventData) {
    var getScheduleDataFunc, scheduleData;

    if (!this.checkExpectedCondition(clickEventData.target)) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(this.view, clickEventData);
    scheduleData = getScheduleDataFunc(clickEventData);

    this.fire('click', scheduleData);

    this._createSchedule(scheduleData);

    this._requestOnClick = false;
};

/**
 * Invoke creation click
 * @param {Schedule} schedule - schedule instance
 */
DayGridCreation.prototype.invokeCreationClick = function(schedule) {
    var getScheduleDataFunc, scheduleData;

    getScheduleDataFunc = this._retriveScheduleDataFromDate(this.view, schedule.start);
    scheduleData = getScheduleDataFunc(schedule.start);

    this.fire('click', scheduleData);

    this._createSchedule(scheduleData);
};

common.mixin(dayGridCore, DayGridCreation);
util.CustomEvents.mixin(DayGridCreation);

module.exports = DayGridCreation;


/***/ }),

/***/ "./src/js/handler/daygrid/creationGuide.js":
/*!*************************************************!*\
  !*** ./src/js/handler/daygrid/creationGuide.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Guide element for DayGrid.Creation
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var reqAnimFrame = __webpack_require__(/*! ../../common/reqAnimFrame */ "./src/js/common/reqAnimFrame.js");

/**
 * Class for DayGrid.Creation dragging effect.
 * @constructor
 * @param {DayGridCreation} creation - instance of DayGridCreation.
 */
function DayGridCreationGuide(creation) {
    /**
     * @type {DayGridCreation}
     */
    this.creation = creation;

    /**
     * @type {HTMLDIVElement}
     */
    this.scheduleContainer = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = document.createElement('div');

    this.initializeGuideElement();
    this.applyTheme(creation.controller.theme);

    creation.on({
        dragstart: this._createGuideElement,
        drag: this._onDrag,
        click: this._createGuideElement
    }, this);
}

/**
 * Destroy method
 */
DayGridCreationGuide.prototype.destroy = function() {
    this.clearGuideElement();
    this.creation.off(this);
    this.creation = this.scheduleContainer = this.guideElement = null;
};

/**
 * initialize guide element's default style.
 */
DayGridCreationGuide.prototype.initializeGuideElement = function() {
    domutil.addClass(this.guideElement, config.classname('daygrid-guide-creation-block'));
};

/**
 * Drag event handler
 * @param {object} scheduleData - schedule data from DayGrid.Creation handler.
 */
DayGridCreationGuide.prototype._onDrag = function(scheduleData) {
    this._refreshGuideElement(scheduleData, true);
};

/**
 * Get element width based on narrowWeekend
 * @param {number} dragStartIndex - grid start index
 * @param {number} dragEndIndex - grid end index
 * @param {Array} grids - dates information
 * @returns {number} element width
 */
DayGridCreationGuide.prototype._getGuideWidth = function(dragStartIndex, dragEndIndex, grids) {
    var width = 0;
    var i = dragStartIndex;
    for (; i <= dragEndIndex; i += 1) {
        width += grids[i] ? grids[i].width : 0;
    }

    return width;
};

/**
 * Refresh guide element.
 * @param {object} scheduleData - schedule data from DayGrid.Creation handler.
 * @param {boolean} defer - If set to true, set style in the next frame
 */
DayGridCreationGuide.prototype._refreshGuideElement = function(scheduleData, defer) {
    var guideElement = this.guideElement,
        data = scheduleData,
        dragStartXIndex = data.dragStartXIndex < data.xIndex ? data.dragStartXIndex : data.xIndex,
        dragEndXIndex = data.dragStartXIndex < data.xIndex ? data.xIndex : data.dragStartXIndex,
        leftPercent,
        widthPercent;

    leftPercent = data.grids[dragStartXIndex] ? data.grids[dragStartXIndex].left : 0;
    widthPercent = this._getGuideWidth(dragStartXIndex, dragEndXIndex, data.grids);

    /** eslint-disable require-jsdoc */
    function setStyle() {
        guideElement.style.display = 'block';
        guideElement.style.left = leftPercent + '%';
        guideElement.style.width = widthPercent + '%';
    }

    if (defer) {
        reqAnimFrame.requestAnimFrame(setStyle);
    } else {
        setStyle();
    }
};

/**
 * Clear guide element.
 */
DayGridCreationGuide.prototype.clearGuideElement = function() {
    var guideElement = this.guideElement;

    domutil.remove(guideElement);

    guideElement.style.display = 'none';
    guideElement.style.left = '';
    guideElement.style.width = '';
};

/**
 * Create guide element
 * @param {object} dragStartEventData - schedule data object of DayGrid.Creation.
 */
DayGridCreationGuide.prototype._createGuideElement = function(dragStartEventData) {
    var creation = this.creation,
        view = creation.view,
        container = view.container,
        scheduleContainer = domutil.find(config.classname('.weekday-grid'), container);

    scheduleContainer.appendChild(this.guideElement);
    this._refreshGuideElement(dragStartEventData);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - event data object of DayGrid.Creation.
 */
DayGridCreationGuide.prototype._onDrag = function(dragEventData) {
    this._refreshGuideElement(dragEventData);
};

DayGridCreationGuide.prototype.applyTheme = function(theme) {
    var style = this.guideElement.style;

    style.backgroundColor = theme.common.creationGuide.backgroundColor;
    style.border = theme.common.creationGuide.border;
};

module.exports = DayGridCreationGuide;


/***/ }),

/***/ "./src/js/handler/daygrid/move.js":
/*!****************************************!*\
  !*** ./src/js/handler/daygrid/move.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Move handler for DayGrid view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var dayGridCore = __webpack_require__(/*! ./core */ "./src/js/handler/daygrid/core.js");
var DayGridMoveGuide = __webpack_require__(/*! ./moveGuide */ "./src/js/handler/daygrid/moveGuide.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;

/**
 * @constructor
 * @implements {Handler}
 * @mixes dayGridCore
 * @mixes CustomEvents
 * @param {Drag} dragHandler - Drag handler instance.
 * @param {DayGrid} view - view instance.
 * @param {Base} controller - Base controller instance.
 */
function DayGridMove(dragHandler, view, controller) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * view instance.
     * @type {DayGrid}
     */
    this.view = view;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.controller = controller;

    /**
     * Temporary variable for dragstart event data.
     * @type {object}
     */
    this._dragStart = null;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);

    /**
     * @type {DayGridMoveGuide}
     */
    this.guide = new DayGridMoveGuide(this);
}

DayGridMove.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.view = this.controller =
        this.guide = this._dragStart = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|DayGridSchedule} return DayGridSchedule view instance when satiate condition.
 */
DayGridMove.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        parentView,
        matches;

    if (~cssClass.indexOf(config.classname('weekday-resize-handle'))) {
        return false;
    }

    parentView = domutil.closest(target, config.classname('.weekday'));

    if (!parentView) {
        return false;
    }

    cssClass = domutil.getClass(parentView);
    matches = cssClass.match(config.daygrid.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.view.children.items, matches[1]);
};

/**
 * DragStart event handler method.
 * @emits DayGridMove#dragstart
 * @param {object} dragStartEventData - Drag#dragStart event handler event data.
 */
DayGridMove.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        controller = this.controller,
        excludeTarget = true,
        scheduleBlockElement,
        modelID,
        targetModel,
        getScheduleDataFunc,
        scheduleData;

    if (!result) {
        return;
    }

    scheduleBlockElement = domutil.closest(target, config.classname('.weekday-schedule-block'), excludeTarget);
    if (!scheduleBlockElement) {
        return;
    }

    modelID = domutil.getData(scheduleBlockElement, 'id');
    targetModel = controller.schedules.items[modelID];

    if (!targetModel) {
        return;
    }

    if (targetModel.isReadOnly) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(this.view, dragStartEventData.originEvent);
    this.getScheduleDataFunc = getScheduleDataFunc;
    scheduleData = this._dragStart = getScheduleDataFunc(dragStartEventData.originEvent);

    util.extend(scheduleData, {
        scheduleBlockElement: scheduleBlockElement,
        model: targetModel
    });

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event DayGridMove#dragstart
     * @type {object}
     * @property {DayGrid} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     * @property {Schedule} model - data object of model isntance.
     * @property {HTMLDivElement} scheduleBlockElement - target schedule block element.
     */
    this.fire('dragstart', scheduleData);
};

/**
 * Drag event handler method.
 * @emits DayGridMove#drag
 * @param {object} dragEventData - Drag#drag event handler eventdata.
 */
DayGridMove.prototype._onDrag = function(dragEventData) {
    var getScheduleDataFunc = this.getScheduleDataFunc;

    if (!getScheduleDataFunc) {
        return;
    }

    /**
     * @schedule DayGridMove#drag
     * @type {object}
     * @property {DayGrid} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('drag', getScheduleDataFunc(dragEventData.originEvent));
};

/**
 * Request update schedule model to base controller.
 * @fires DayGridMove#beforeUpdateSchedule
 * @param {object} scheduleData - schedule data from DayGridMove handler module.
 */
DayGridMove.prototype._updateSchedule = function(scheduleData) {
    var schedule = scheduleData.targetModel,
        dateOffset = scheduleData.xIndex - scheduleData.dragStartXIndex,
        newStarts = new TZDate(schedule.start.getTime()),
        newEnds = new TZDate(schedule.end.getTime());

    newStarts = new TZDate(newStarts.setDate(newStarts.getDate() + dateOffset));
    newEnds = new TZDate(newEnds.setDate(newEnds.getDate() + dateOffset));

    /**
     * @event DayGridMove#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to update
     * @property {Date} start - start time to update
     * @property {Date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        start: newStarts,
        end: newEnds
    });
};

/**
 * DragEnd event hander method.
 * @emits DayGridMove#dragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {?boolean} skipUpdate - true then skip update schedule model.
 */
DayGridMove.prototype._onDragEnd = function(dragEndEventData, overrideEventName, skipUpdate) {
    var getScheduleDataFunc = this.getScheduleDataFunc,
        dragStart = this._dragStart,
        scheduleData;

    if (!getScheduleDataFunc || !dragStart) {
        return;
    }

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    scheduleData = getScheduleDataFunc(dragEndEventData.originEvent);
    util.extend(scheduleData, {
        targetModel: dragStart.model
    });

    if (!skipUpdate) {
        this._updateSchedule(scheduleData);
    }

    /**
     * @event DayGridMove#dragend
     * @type {object}
     * @property {DayGrid} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'dragend', scheduleData);

    this.getScheduleDataFunc = this._dragStart = null;
};

/**
 * Click event handler method.
 * @emits DayGridMove#click
 * @param {object} clickEventData - Drag#Click event handler data.
 */
DayGridMove.prototype._onClick = function(clickEventData) {
    /**
     * @event DayGridMove#click
     * @type {object}
     * @property {DayGrid} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this._onDragEnd(clickEventData, 'click', true);
};

common.mixin(dayGridCore, DayGridMove);
util.CustomEvents.mixin(DayGridMove);

module.exports = DayGridMove;



/***/ }),

/***/ "./src/js/handler/daygrid/moveGuide.js":
/*!*********************************************!*\
  !*** ./src/js/handler/daygrid/moveGuide.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview Effect module for DayGrid.Move
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var reqAnimFrame = __webpack_require__(/*! ../../common/reqAnimFrame */ "./src/js/common/reqAnimFrame.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;

/**
 * Class for DayGrid.Move dragging effect.
 * @constructor
 * @param {DayGridMove} daygridMove - instance of DayGridMove.
 */
function DayGridMoveGuide(daygridMove) {
    /**
     * @type {DayGridMove}
     */
    this.daygridMove = daygridMove;

    /**
     * The element that actually contains the event element
     * @type {HTMLDIVElement}
     */
    this.scheduleContainer = null;

    /**
     * @type {number}
     */
    this._dragStartXIndex = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = null;

    /**
     * @type {HTMLElement[]}
     */
    this.elements = null;

    daygridMove.on({
        'dragstart': this._onDragStart,
        'drag': this._onDrag,
        'dragend': this._clearGuideElement,
        'click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
DayGridMoveGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.daygridMove.off(this);
    this.daygridMove = this.scheduleContainer = this._dragStartXIndex =
        this.elements = this.guideElement = null;
};

/**
 * Clear guide element.
 */
DayGridMoveGuide.prototype._clearGuideElement = function() {
    this._showOriginScheduleBlocks();

    domutil.remove(this.guideElement);

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('dragging'));
    }

    this._dragStartXIndex = this.getScheduleDataFunc = this.guideElement = null;
};

/**
 * Dim element blocks
 * @param {number} modelID - Schedule model instance ID
 */
DayGridMoveGuide.prototype._hideOriginScheduleBlocks = function(modelID) {
    var className = config.classname('weekday-schedule-block-dragging-dim');
    var scheduleBlocks = domutil.find(
        config.classname('.weekday-schedule-block'),
        this.daygridMove.view.container,
        true
    );

    this.elements = util.filter(scheduleBlocks, function(schedule) {
        return domutil.getData(schedule, 'id') === modelID;
    });

    util.forEach(this.elements, function(el) {
        domutil.addClass(el, className);
    });
};

/**
 * Show element blocks
 */
DayGridMoveGuide.prototype._showOriginScheduleBlocks = function() {
    var className = config.classname('weekday-schedule-block-dragging-dim');

    util.forEach(this.elements, function(el) {
        domutil.removeClass(el, className);
    });
};

/**
 * Highlight element blocks 
 * @param {Schedule} model - model
 * @param {HTMLElement} parent - parent element
 */
DayGridMoveGuide.prototype._highlightScheduleBlocks = function(model, parent) {
    var elements = domutil.find(config.classname('.weekday-schedule'), parent, true);

    util.forEach(elements, function(el) {
        el.style.margin = '0';

        if (!model.isFocused) {
            el.style.backgroundColor = model.dragBgColor;
            el.style.borderLeftColor = model.borderColor;
            el.style.color = '#ffffff';
        }
    });
};

/**
 * Refresh guide element.
 * @param {number} leftPercent - left percent of guide element.
 * @param {number} widthPercent - width percent of guide element.
 * @param {boolean} isExceededLeft - schedule start is faster then render start date?
 * @param {boolean} isExceededRight - schedule end is later then render end date?
 */
DayGridMoveGuide.prototype.refreshGuideElement = function(leftPercent, widthPercent, isExceededLeft, isExceededRight) {
    var guideElement = this.guideElement;

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.left = leftPercent + '%';
        guideElement.style.width = widthPercent + '%';

        if (isExceededLeft) {
            domutil.addClass(guideElement, config.classname('weekday-exceed-left'));
        } else {
            domutil.removeClass(guideElement, config.classname('weekday-exceed-left'));
        }

        if (isExceededRight) {
            domutil.addClass(guideElement, config.classname('weekday-exceed-right'));
        } else {
            domutil.removeClass(guideElement, config.classname('weekday-exceed-right'));
        }
    });
};

/**
 * Get schedule block information from schedule data.
 *
 * For example, there is single schedule has 10 length. but render range in view is 5 then
 * rendered block must be cut out to render properly. in this case, this method return
 * how many block are cut before rendering.
 *
 * @param {object} dragStartEventData - schedule data from DayGrid.Move handler.
 * @returns {function} function that return schedule block information.
 */
DayGridMoveGuide.prototype._getScheduleBlockDataFunc = function(dragStartEventData) {
    var model = dragStartEventData.model,
        datesInRange = dragStartEventData.datesInRange,
        range = dragStartEventData.range,
        baseWidthPercent = (100 / datesInRange),
        originScheduleStarts = datetime.start(model.start),
        originScheduleEnds = datetime.end(model.end),
        renderStartDate = datetime.start(range[0]),
        renderEndDate = datetime.end(range[range.length - 1]),
        fromLeft = (new TZDate(originScheduleStarts.getTime() -
            renderStartDate.getTime())) / datetime.MILLISECONDS_PER_DAY || 0,
        fromRight = (new TZDate(originScheduleEnds.getTime() -
            renderEndDate.getTime())) / datetime.MILLISECONDS_PER_DAY || 0;

    return function(indexOffset) {
        return {
            baseWidthPercent: baseWidthPercent,
            fromLeft: fromLeft + indexOffset,
            fromRight: fromRight + indexOffset
        };
    };
};

/**
 * DragStart event handler.
 * @param {object} dragStartEventData - schedule data.
 */
DayGridMoveGuide.prototype._onDragStart = function(dragStartEventData) {
    var container = this.daygridMove.view.container,
        guideElement = this.guideElement = dragStartEventData.scheduleBlockElement.cloneNode(true),
        scheduleContainer;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('dragging'));
    }

    this._hideOriginScheduleBlocks(String(dragStartEventData.model.cid()));

    scheduleContainer = domutil.find(config.classname('.weekday-schedules'), container);
    domutil.appendHTMLElement('div', guideElement, config.classname('weekday-schedule-cover'));
    scheduleContainer.appendChild(guideElement);

    this._dragStartXIndex = dragStartEventData.xIndex;
    this.getScheduleDataFunc = this._getScheduleBlockDataFunc(dragStartEventData);

    this._highlightScheduleBlocks(dragStartEventData.model, guideElement);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - schedule data.
 */
DayGridMoveGuide.prototype._onDrag = function(dragEventData) {
    var getScheduleDataFunc = this.getScheduleDataFunc,
        dragStartXIndex = this._dragStartXIndex,
        datesInRange = dragEventData.datesInRange,
        grids = dragEventData.grids,
        scheduleData,
        isExceededLeft,
        isExceededRight,
        originLength,
        leftIndex,
        size,
        newLeft,
        newWidth;

    if (!getScheduleDataFunc) {
        return;
    }

    scheduleData = getScheduleDataFunc(dragEventData.xIndex - dragStartXIndex);
    isExceededLeft = scheduleData.fromLeft < 0;
    isExceededRight = scheduleData.fromRight > 0;

    leftIndex = Math.max(0, scheduleData.fromLeft);
    originLength = (scheduleData.fromLeft * -1) + (datesInRange + scheduleData.fromRight);
    size = isExceededLeft ? (originLength + scheduleData.fromLeft) : originLength;
    size = isExceededRight ? (size - scheduleData.fromRight) : size;

    newLeft = grids[leftIndex] ? grids[leftIndex].left : 0;
    newWidth = getScheduleBlockWidth(leftIndex, size, grids);

    this.refreshGuideElement(newLeft, newWidth, isExceededLeft, isExceededRight);
};

/**
 * Get schedule width based on grids
 * @param {number} left - left index
 * @param {number} size - schedule width
 * @param {Array} grids - dates information
 * @returns {number} element width
 */
function getScheduleBlockWidth(left, size, grids) {
    var width = 0;
    var i = 0;
    var length = grids.length;
    for (; i < size; i += 1) {
        left = (left + i) % length;
        if (left < length) {
            width += grids[left] ? grids[left].width : 0;
        }
    }

    return width;
}

module.exports = DayGridMoveGuide;


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/handler/daygrid/resize.js":
/*!******************************************!*\
  !*** ./src/js/handler/daygrid/resize.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Resize handler module for DayGrid view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js");
var dayGridCore = __webpack_require__(/*! ./core */ "./src/js/handler/daygrid/core.js");
var DayGridResizeGuide = __webpack_require__(/*! ./resizeGuide */ "./src/js/handler/daygrid/resizeGuide.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;

/**
 * @constructor
 * @implements {Handler}
 * @mixes dayGridCore
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {DayGrid} [view] - view instance.
 * @param {Base} [controller] - Base controller instance.
 */
function DayGridResize(dragHandler, view, controller) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * view instance.
     * @type {DayGrid}
     */
    this.view = view;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.controller = controller;

    /**
     * Temporary variable for dragStart event data.
     * @type {object}
     */
    this._dragStart = null;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);

    /**
     * @type {DayGridResizeGuide}
     */
    this.guide = new DayGridResizeGuide(this);
}

/**
 * Destroy method
 */
DayGridResize.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.view = this.controller =
        this.guide = this._dragStart = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|WeekdayInWeek} return WeekdayInWeek view instance when satiate condition.
 */
DayGridResize.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (!~cssClass.indexOf(config.classname('weekday-resize-handle'))) {
        return false;
    }

    target = domutil.closest(target, config.classname('.weekday'));

    if (!target) {
        return false;
    }

    cssClass = domutil.getClass(target);
    matches = cssClass.match(config.daygrid.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.view.children.items, matches[1]);
};

/**
 * DragStart event handler.
 * @emits DayGridResize#dragstart
 * @param {object} dragStartEventData - schedule data.
 */
DayGridResize.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        controller = this.controller,
        scheduleBlockElement,
        modelID,
        targetModel,
        getScheduleDataFunc,
        scheduleData;

    if (!result) {
        return;
    }

    scheduleBlockElement = domutil.closest(target, config.classname('.weekday-schedule-block'));
    modelID = domutil.getData(scheduleBlockElement, 'id');
    targetModel = controller.schedules.items[modelID];

    if (!targetModel) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(this.view, dragStartEventData.originEvent);
    this.getScheduleDataFunc = getScheduleDataFunc;
    scheduleData = this._dragStart = getScheduleDataFunc(dragStartEventData.originEvent);

    util.extend(scheduleData, {
        scheduleBlockElement: scheduleBlockElement,
        model: targetModel
    });

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event DayGridResize#dragstart
     * @type {object}
     * @property {View} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     * @property {Schedule} model - data object of model isntance.
     * @property {HTMLDivElement} scheduleBlockElement - target schedule block element.
     */
    this.fire('dragstart', scheduleData);
};

/**
 * Drag event handler method.
 * @emits DayGridResize#drag
 * @param {object} dragEventData - Drag#drag event handler scheduledata.
 */
DayGridResize.prototype._onDrag = function(dragEventData) {
    var getScheduleDataFunc = this.getScheduleDataFunc;

    if (!getScheduleDataFunc) {
        return;
    }

    /**
     * @event DayGridResize#drag
     * @type {object}
     * @property {View} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('drag', getScheduleDataFunc(dragEventData.originEvent));
};

/**
 * Request update schedule instance to base controller.
 * @fires DayGridResize#beforeUpdateSchedule
 * @param {object} scheduleData - schedule data from DayGridResize handler.
 */
DayGridResize.prototype._updateSchedule = function(scheduleData) {
    var schedule = scheduleData.targetModel,
        dateOffset = scheduleData.xIndex - scheduleData.dragStartXIndex,
        newEnds = new TZDate(schedule.end.getTime());

    newEnds = new TZDate(newEnds.setDate(newEnds.getDate() + dateOffset));
    newEnds = new TZDate(Math.max(datetime.end(schedule.start).getTime(), newEnds.getTime()));

    /**
     * @event DayGridResize#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to update
     * @property {date} start - start time to update
     * @property {date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        start: schedule.getStarts(),
        end: newEnds
    });
};

/**
 * DragEnd event hander method.
 * @emits DayGridResize#dragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {?boolean} skipUpdate - true then skip update schedule model.
 */
DayGridResize.prototype._onDragEnd = function(dragEndEventData, overrideEventName, skipUpdate) {
    var getScheduleDataFunc = this.getScheduleDataFunc,
        dragStart = this._dragStart,
        scheduleData;

    if (!getScheduleDataFunc || !dragStart) {
        return;
    }

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    scheduleData = getScheduleDataFunc(dragEndEventData.originEvent);
    util.extend(scheduleData, {
        targetModel: dragStart.model
    });

    if (!skipUpdate) {
        this._updateSchedule(scheduleData);
    }

    /**
     * @event DayGridResize#dragend
     * @type {object}
     * @property {View} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'dragend', scheduleData);

    this.getScheduleDataFunc = this._dragStart = null;
};

/**
 * Click event handler method.
 * @emits DayGridResize#click
 * @param {object} clickEventData - Drag#Click event handler data.
 */
DayGridResize.prototype._onClick = function(clickEventData) {
    /**
     * @event DayGridResize#click
     * @type {object}
     * @property {View} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this._onDragEnd(clickEventData, 'click', true);
};

common.mixin(dayGridCore, DayGridResize);
util.CustomEvents.mixin(DayGridResize);

module.exports = DayGridResize;



/***/ }),

/***/ "./src/js/handler/daygrid/resizeGuide.js":
/*!***********************************************!*\
  !*** ./src/js/handler/daygrid/resizeGuide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview Resize Guide module.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var reqAnimFrame = __webpack_require__(/*! ../../common/reqAnimFrame */ "./src/js/common/reqAnimFrame.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;

/**
 * @constructor
 * @param {DayGridResize} resizeHandler - instance of DayGridResize
 */
function DayGridResizeGuide(resizeHandler) {
    /**
     * @type {DayGridResize}
     */
    this.resizeHandler = resizeHandler;

    /**
     * The element that actually contains the event element
     * @type {HTMLDIVElement}
     */
    this.scheduleContainer = null;

    /**
     * @type {function}
     */
    this.getScheduleDataFunc = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.scheduleBlockElement = null;

    resizeHandler.on({
        'dragstart': this._onDragStart,
        'drag': this._onDrag,
        'dragend': this._clearGuideElement,
        'click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
DayGridResizeGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.resizeHandler.off(this);
    this.resizeHandler = this.scheduleContainer = this.getScheduleDataFunc =
        this.guideElement = this.scheduleBlockElement = null;
};

/**
 * Clear guide element.
 */
DayGridResizeGuide.prototype._clearGuideElement = function() {
    domutil.remove(this.guideElement);

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('resizing-x'));
    }

    if (this.scheduleBlockElement) {
        domutil.removeClass(this.scheduleBlockElement, config.classname('weekday-schedule-block-dragging-dim'));
    }

    this.getScheduleDataFunc = null;
};

/**
 * Refresh guide element
 * @param {number} newWidth - new width percentage value to resize guide element.
 */
DayGridResizeGuide.prototype.refreshGuideElement = function(newWidth) {
    var guideElement = this.guideElement;

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.width = newWidth + '%';
    });
};

/**
 * Return function that calculate guide element's new width percentage value.
 * @param {object} dragStartEventData - dragstart schedule data.
 * @returns {function} return function that calculate guide element new width percentage.
 */
DayGridResizeGuide.prototype.getGuideElementWidthFunc = function(dragStartEventData) {
    var model = dragStartEventData.model,
        viewOptions = this.resizeHandler.view.options,
        fromLeft = parseInt((new TZDate(
            model.start.getTime() - datetime.parse(viewOptions.renderStartDate)
        )) / datetime.MILLISECONDS_PER_DAY, 10) || 0,
        grids = dragStartEventData.grids;

    return function(xIndex) {
        var width = 0;
        var i = 0;
        var length = grids.length;
        width += grids[fromLeft] ? grids[fromLeft].width : 0;

        for (; i < length; i += 1) {
            if (i > fromLeft && i <= xIndex) {
                width += grids[i] ? grids[i].width : 0;
            }
        }

        return width;
    };
};

/**
 * DragStart event handler.
 * @param {object} dragStartEventData - schedule data.
 */
DayGridResizeGuide.prototype._onDragStart = function(dragStartEventData) {
    var container = this.resizeHandler.view.container,
        scheduleBlockElement = this.scheduleBlockElement = dragStartEventData.scheduleBlockElement,
        guideElement = this.guideElement = scheduleBlockElement.cloneNode(true),
        scheduleContainer;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('resizing-x'));
    }

    scheduleContainer = domutil.find(config.classname('.weekday-schedules'), container);
    domutil.addClass(guideElement, config.classname('daygrid-guide-move'));
    domutil.addClass(scheduleBlockElement, config.classname('weekday-schedule-block-dragging-dim'));

    scheduleContainer.appendChild(guideElement);

    this.getScheduleDataFunc = this.getGuideElementWidthFunc(dragStartEventData);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - schedule data.
 */
DayGridResizeGuide.prototype._onDrag = function(dragEventData) {
    var func = this.getScheduleDataFunc;

    if (!func) {
        return;
    }

    this.refreshGuideElement(func(dragEventData.xIndex));
};

module.exports = DayGridResizeGuide;


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/handler/drag.js":
/*!********************************!*\
  !*** ./src/js/handler/drag.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview Drag handler for calendar.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var domutil = __webpack_require__(/*! ../common/domutil */ "./src/js/common/domutil.js");
var domevent = __webpack_require__(/*! ../common/domevent */ "./src/js/common/domevent.js");

/**
 * @constructor
 * @mixes CustomEvents
 * @param {object} options - options for drag handler
 * @param {number} [options.distance=10] - distance in pixels after mouse must move before dragging should start
 * @param {function} [options.exclude] - filter function for don't fire drag events that specific conditions.
 * @param {HTMLElement} container element to watching drag interaction.
 */
function Drag(options, container) {
    domevent.on(container, 'mousedown', this._onMouseDown, this);

    this.options = util.extend({
        distance: 10,
        exclude: null
    }, options);

    /**
     * @type {HTMLElement}
     */
    this.container = container;

    /**
     * Flag for represent current dragging session has been cancelled for exclude option.
     * @type {boolean}
     */
    this._cancelled = false;

    /**
     * @type {boolean}
     */
    this._isMoved = false;

    /**
     * dragging distance in pixel between mousedown and firing dragStart events
     * @type {number}
     */
    this._distance = 0;

    /**
     * @type {boolean}
     */
    this._dragStartFired = false;

    /**
     * @type {object}
     */
    this._dragStartEventData = null;
}

/**
 * Destroy method.
 */
Drag.prototype.destroy = function() {
    domevent.off(this.container, 'mousedown', this._onMouseDown, this);
    this._isMoved = null;
    this.container = null;
};

/**
 * Clear cache data for single dragging session.
 */
Drag.prototype._clearData = function() {
    this._cancelled = false;
    this._distance = 0;
    this._isMoved = false;
    this._dragStartFired = false;
    this._dragStartEventData = null;
};

/**
 * Toggle events for mouse dragging.
 * @param {boolean} toBind - bind events related with dragging when supplied "true"
 */
Drag.prototype._toggleDragEvent = function(toBind) {
    var container = this.container,
        domMethod,
        method;

    if (toBind) {
        domMethod = 'on';
        method = 'disable';
    } else {
        domMethod = 'off';
        method = 'enable';
    }

    domutil[method + 'TextSelection'](container);
    domutil[method + 'ImageDrag'](container);
    domevent[domMethod](global.document, {
        mousemove: this._onMouseMove,
        mouseup: this._onMouseUp
    }, this);
};

/**
 * Normalize mouse event object.
 * @param {MouseEvent} mouseEvent - mouse event object.
 * @returns {object} normalized mouse event data.
 */
Drag.prototype._getEventData = function(mouseEvent) {
    return {
        target: mouseEvent.target || mouseEvent.srcElement,
        originEvent: mouseEvent
    };
};

/**
 * MouseDown DOM event handler.
 * @param {MouseEvent} mouseDownEvent MouseDown event object.
 */
Drag.prototype._onMouseDown = function(mouseDownEvent) {
    var opt = this.options,
        target = (mouseDownEvent.srcElement || mouseDownEvent.target);

    // only primary button can start drag.
    if (domevent.getMouseButton(mouseDownEvent) !== 0) {
        return;
    }

    if (opt.exclude && opt.exclude(target)) {
        this._cancelled = true;

        return;
    }

    this._clearData();
    this._dragStartEventData = this._getEventData(mouseDownEvent);

    this._toggleDragEvent(true);

    // EventTarget.target is not changed in mousemove event even if mouse is over the other element.
    // It's different with other browsers(IE, Chrome, Safari)
    if (util.browser.firefox) {
        domevent.preventDefault(mouseDownEvent);
    }
};

/**
 * MouseMove DOM event handler.
 * @emits Drag#drag
 * @emits Drag#dragStart
 * @param {MouseEvent} mouseMoveEvent MouseMove event object.
 */
Drag.prototype._onMouseMove = function(mouseMoveEvent) {
    var distance;

    if (this._cancelled) {
        this._clearData();

        return;
    }

    distance = this.options.distance;
    // prevent automatic scrolling.
    domevent.preventDefault(mouseMoveEvent);

    if (this._distance < distance) {
        this._distance += 1;

        return;
    }
    this._isMoved = true;

    if (!this._dragStartFired) {
        this._dragStartFired = true;

        /**
         * Drag start events. cancelable.
         * @event Drag#dragStart
         * @type {object}
         * @property {HTMLElement} target - target element in this event.
         * @property {MouseEvent} originEvent - original mouse event object.
         */
        if (!this.invoke('dragStart', this._dragStartEventData)) {
            this._toggleDragEvent(false);
            this._clearData();

            return;
        }
    }

    /**
     * CalEvents while dragging.
     * @event Drag#drag
     * @type {object}
     * @property {HTMLElement} target - target element in this event.
     * @property {MouseEvent} originEvent - original mouse event object.
     */
    this.fire('drag', this._getEventData(mouseMoveEvent));
};

/**
 * MouseUp DOM event handler.
 * @param {MouseEvent} mouseUpEvent MouseUp event object.
 * @emits Drag#dragEnd
 * @emits Drag#click
 */
Drag.prototype._onMouseUp = function(mouseUpEvent) {
    if (this._cancelled) {
        return;
    }

    this._toggleDragEvent(false);

    // emit "click" event when not emitted drag event between mousedown and mouseup.
    if (this._isMoved) {
        this._isMoved = false;
        /**
         * Drag end events.
         * @event Drag#dragEnd
         * @type {MouseEvent}
         * @property {HTMLElement} target - target element in this event.
         * @property {MouseEvent} originEvent - original mouse event object.
         */
        this.fire('dragEnd', this._getEventData(mouseUpEvent));
    } else {
        /**
         * Click events.
         * @event Drag#click
         * @type {MouseEvent}
         * @property {HTMLElement} target - target element in this event.
         * @property {MouseEvent} originEvent - original mouse event object.
         */
        this.fire('click', this._getEventData(mouseUpEvent));
    }

    this._clearData();
};

util.CustomEvents.mixin(Drag);

module.exports = Drag;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/handler/month/click.js":
/*!***************************************!*\
  !*** ./src/js/handler/month/click.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Click handler for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");

/**
 * @constructor
 * @implements {Handler}
 * @mixes util.CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Month} [monthView] - Month view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function MonthClick(dragHandler, monthView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Month}
     */
    this.monthView = monthView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destructor
 */
MonthClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.monthView = this.baseController = this.dragHandler = null;
};

/**
 * @fires MonthClick#clickMore
 * @param {object} clickEvent - click event object
 */
MonthClick.prototype._onClick = function(clickEvent) {
    var self = this,
        moreElement,
        scheduleCollection = this.baseController.schedules,
        blockElement = domutil.closest(clickEvent.target, config.classname('.weekday-schedule-block'))
                    || domutil.closest(clickEvent.target, config.classname('.month-more-schedule'));

    moreElement = domutil.closest(
        clickEvent.target,
        config.classname('.weekday-exceed-in-month')
    );

    if (moreElement) {
        self.fire('clickMore', {
            date: datetime.parse(domutil.getData(moreElement, 'ymd')),
            target: moreElement,
            ymd: domutil.getData(moreElement, 'ymd')
        });
    }

    if (blockElement) {
        scheduleCollection.doWhenHas(domutil.getData(blockElement, 'id'), function(schedule) {
            /**
             * @events AlldayClick#clickSchedule
             * @type {object}
             * @property {Schedule} schedule - schedule instance
             * @property {MouseEvent} event - MouseEvent object
             */
            self.fire('clickSchedule', {
                schedule: schedule,
                event: clickEvent.originEvent
            });
        });
    }
};

util.CustomEvents.mixin(MonthClick);

module.exports = MonthClick;



/***/ }),

/***/ "./src/js/handler/month/core.js":
/*!**************************************!*\
  !*** ./src/js/handler/month/core.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Module for calculate date by month view and mouse event object
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js"),
    domevent = __webpack_require__(/*! ../../common/domevent */ "./src/js/common/domevent.js");
var mfloor = Math.floor;

/**
 * Get high order function that can calc date in mouse point
 * @param {Month} monthView - month view
 * @returns {function} function return event data by mouse event object
 */
function getMousePosDate(monthView) {
    var weekColl = monthView.children,
        weeks = weekColl.sort(function(a, b) {
            return util.stamp(a) - util.stamp(b);
        }),
        weekCount = weekColl.length,
        days = weekColl.single().getRenderDateRange(),
        dayCount = days.length,
        relativeContainer = util.pick(monthView.vLayout.panels[1], 'container'),
        size = domutil.getSize(relativeContainer),
        grids = monthView.grids;

    /**
     * Get the left index
     * @param {number} left - left position(percent)
     * @returns {number} grid left index
     */
    function getX(left) {
        var i = 0;
        var length = grids.length;
        var grid;
        for (; i < length; i += 1) {
            grid = grids[i];
            if (grid.left <= left && left <= (grid.left + grid.width)) {
                return i;
            }
        }

        return i;
    }

    /**
     * Get date related with mouse event object
     * @param {object} mouseEvent - click event data
     * @returns {object} data related with mouse event
     */
    function getDate(mouseEvent) {
        var pos = domevent.getMousePosition(mouseEvent, relativeContainer),
            x = getX(common.ratio(size[0], 100, pos[0])),
            y = mfloor(common.ratio(size[1], weekCount, pos[1])),
            weekdayView, date;

        weekdayView = util.pick(weeks, y);

        if (!weekdayView) {
            return null;
        }

        date = util.pick(weekdayView.getRenderDateRange(), x);

        if (!date) {
            return null;
        }

        return {
            x: x,
            y: y,
            sizeX: dayCount,
            sizeY: weekCount,
            date: date,
            weekdayView: weekdayView,
            triggerEvent: mouseEvent.type
        };
    }

    return getDate;
}

module.exports = getMousePosDate;


/***/ }),

/***/ "./src/js/handler/month/creation.js":
/*!******************************************!*\
  !*** ./src/js/handler/month/creation.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Creation handler for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var array = __webpack_require__(/*! ../../common/array */ "./src/js/common/array.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var domevent = __webpack_require__(/*! ../../common/domevent */ "./src/js/common/domevent.js");
var getMousePosDate = __webpack_require__(/*! ./core */ "./src/js/handler/month/core.js");
var Guide = __webpack_require__(/*! ./creationGuide */ "./src/js/handler/month/creationGuide.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;

var CLICK_DELAY = 300;

/**
 * @constructor
 * @param {Drag} dragHandler - Drag handler instance.
 * @param {Month} monthView - Month view instance.
 * @param {Base} baseController - Base controller instance.
 * @param {Options} [options] - calendar Options
 */
function MonthCreation(dragHandler, monthView, baseController, options) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Month}
     */
    this.monthView = monthView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {function}
     */
    this.getScheduleData = null;

    /**
     * Cache for dragging session
     * @type {object}
     */
    this._cache = null;

    /**
     * @type {MonthCreationGuide}
     */
    this.guide = new Guide(this);

    /**
     * @type {boolean}
     */
    this._requestOnClick = false;

    dragHandler.on('dragStart', this._onDragStart, this);
    dragHandler.on('click', this._onClick, this);

    if (options.disableDblClick) {
        CLICK_DELAY = 0;
    } else {
        domevent.on(monthView.container, 'dblclick', this._onDblClick, this);
    }
}

/**
 * Destructor
 */
MonthCreation.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.guide.destroy();

    if (this.monthView && this.monthView.container) {
        domevent.off(this.monthView.container, 'dblclick', this._onDblClick, this);
    }

    this.dragHandler = this.monthView = this.baseController =
        this.getScheduleData = this._cache = this.guide = null;
};

/**
 * Fire before create schedule
 * @fires {MonthCreation#beforeCreateSchedule}
 * @param {object} eventData - cache data from single dragging session
 */
MonthCreation.prototype._createSchedule = function(eventData) {
    /**
     * @event {MonthCreation#beforeCreateSchedule}
     * @type {object}
     * @property {boolean} isAllDay - whether schedule is fired in allday view area?
     * @property {Date} start - select start time
     * @property {Date} end - select end time
     * @property {TimeCreationGuide} guide - TimeCreationGuide instance
     * @property {string} triggerEventName - event name
     */
    this.fire('beforeCreateSchedule', {
        isAllDay: eventData.isAllDay,
        start: eventData.start,
        end: eventData.end,
        guide: this.guide.guide,
        triggerEventName: eventData.triggerEvent
    });
};

/**
 * DragStart event handler
 * @fires {MonthCreation#monthCreationDragstart}
 * @param {object} dragStartEvent - dragStart event data
 */
MonthCreation.prototype._onDragStart = function(dragStartEvent) {
    var eventData;

    if (!isElementWeekdayGrid(dragStartEvent.target)) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getScheduleData = getMousePosDate(this.monthView);

    eventData = this.getScheduleData(dragStartEvent.originEvent);

    this._cache = {
        start: new TZDate(Number(eventData.date))
    };

    /**
     * @event {MonthCreation#monthCreationDragstart}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthCreationDragstart', eventData);
};

/**
 * Drag event handler
 * @fires {MonthCreation#monthCreationDrag}
 * @param {object} dragEvent - drag event data
 */
MonthCreation.prototype._onDrag = function(dragEvent) {
    var eventData;

    if (!this.getScheduleData) {
        return;
    }

    eventData = this.getScheduleData(dragEvent.originEvent);

    if (!eventData) {
        return;
    }

    /**
     * @event {MonthCreation#monthCreationDrag}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthCreationDrag', eventData);
};

/**
 * DragEnd event handler
 * @fires {MonthCreation#monthCreationDragend}
 * @param {object} dragEndEvent - drag end event data
 */
MonthCreation.prototype._onDragEnd = function(dragEndEvent) {
    var cache = this._cache;
    var eventData;
    var times;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    if (!this.getScheduleData) {
        return;
    }

    eventData = this.getScheduleData(dragEndEvent.originEvent);

    if (eventData) {
        cache.end = new TZDate(Number(eventData.date));
        cache.isAllDay = true;

        times = [
            Number(cache.start),
            Number(cache.end)
        ].sort(array.compare.num.asc);

        cache.start = new TZDate(times[0]);
        cache.end = datetime.end(new TZDate(times[1]));

        this._createSchedule(cache);
    }

    /**
     * @event {MonthCreation#monthCreationDragend}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthCreationDragend', eventData);

    this.getScheduleData = this._cache = null;
};

/**
 * Dblclick event handler
 * @fires {MonthCreation#monthCreationDragstart}
 * @param {MouseEvent} e - Native MouseEvent
 */
MonthCreation.prototype._onDblClick = function(e) {
    var eventData, range;

    if (!isElementWeekdayGrid(e.target)) {
        return;
    }

    eventData = getMousePosDate(this.monthView)(e);

    this.fire('monthCreationClick', eventData);

    range = this._adjustStartAndEndTime(new TZDate(Number(eventData.date)), new TZDate(Number(eventData.date)));

    this._createSchedule({
        start: range.start,
        end: range.end,
        isAllDay: false,
        triggerEvent: eventData.triggerEvent
    });

    this._requestOnClick = false;
};

/**
 * Click event handler
 * @fires {MonthCreation#monthCreationDragstart}
 * @param {MouseEvent} e - Native MouseEvent
 */
MonthCreation.prototype._onClick = function(e) {
    var self = this;
    var eventData, range;

    if (!isElementWeekdayGrid(e.target)) {
        return;
    }

    eventData = getMousePosDate(this.monthView)(e.originEvent);

    this._requestOnClick = true;
    setTimeout(function() {
        if (self._requestOnClick) {
            self.fire('monthCreationClick', eventData);

            range = self._adjustStartAndEndTime(new TZDate(Number(eventData.date)), new TZDate(Number(eventData.date)));

            self._createSchedule({
                start: range.start,
                end: range.end,
                isAllDay: false,
                triggerEvent: eventData.triggerEvent
            });
        }
        self._requestOnClick = false;
    }, CLICK_DELAY);
};

/**
 * Adjust time to our o'clock
 * @param {TZDate} start - start time
 * @param {TZDate} end - end time
 * @returns {Object} start and end
 */
MonthCreation.prototype._adjustStartAndEndTime = function(start, end) {
    var now = new TZDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    // adjust start to less time. Adjusting had been greater time in monthly view when clicking grid
    if (minutes <= 30) {
        minutes = 0;
    } else {
        minutes = 30;
    }
    start.setHours(hours, minutes, 0, 0);
    end.setHours(hours + 1, minutes, 0, 0);

    return {
        start: start,
        end: end
    };
};

/**
 * Invoke creation click
 * @param {Schedule} schedule - schedule instance
 */
MonthCreation.prototype.invokeCreationClick = function(schedule) {
    var eventData = {
        model: schedule
    };

    this.fire('monthCreationClick', eventData);

    this._createSchedule({
        start: schedule.start,
        end: schedule.end,
        isAllDay: schedule.isAllDay,
        triggerEvent: 'manual'
    });
};

/**
 * Returns whether the given element is Weekday-Schedule.
 * @param {HTMLElement} el - target element
 * @returns {boolean}
 */
function isElementWeekdayGrid(el) {
    return domutil.closest(el, config.classname('.weekday-grid'))
        && !domutil.closest(el, config.classname('.weekday-exceed-in-month'));
}

util.CustomEvents.mixin(MonthCreation);

module.exports = MonthCreation;


/***/ }),

/***/ "./src/js/handler/month/creationGuide.js":
/*!***********************************************!*\
  !*** ./src/js/handler/month/creationGuide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Creation guide module for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var MonthGuide = __webpack_require__(/*! ./guide */ "./src/js/handler/month/guide.js");

/**
 * @constructor
 * @param {MonthCreation} monthCreation - instance of MonthCreation
 */
function MonthCreationGuide(monthCreation) {
    /**
     * @type {MonthCreation}
     */
    this.monthCreation = monthCreation;

    /**
     * @type {MonthGuide}
     */
    this.guide = null;

    monthCreation.on({
        monthCreationDragstart: this._createGuideElement,
        monthCreationDrag: this._onDrag,
        monthCreationDragend: this._onDragEnd,
        monthCreationClick: this._createGuideElement
    }, this);
}

/**
 * Destructor
 */
MonthCreationGuide.prototype.destroy = function() {
    this.monthCreation.off(this);

    if (this.guide) {
        this.guide.destroy();
    }

    this.guide = this.monthCreation = null;
};

/**
 * Drag start event handler
 * @param {object} dragStartEvent - schedule data from MonthCreation
 */
MonthCreationGuide.prototype._createGuideElement = function(dragStartEvent) {
    var options = {
        isCreationMode: true,
        height: '100%',
        top: 0
    };

    this.guide = new MonthGuide(options, this.monthCreation.monthView);
    this.guide.start(dragStartEvent);
};

/**
 * Drag event handler
 * @param {object} dragEvent - schedule data from MonthCreation
 */
MonthCreationGuide.prototype._onDrag = function(dragEvent) {
    this.guide.update(dragEvent.x, dragEvent.y);
};

/**
 * Drag end event handler
 */
MonthCreationGuide.prototype._onDragEnd = function() {
    // Do nothing. User calls destroy directly.
    this.guide = null;
};

module.exports = MonthCreationGuide;


/***/ }),

/***/ "./src/js/handler/month/guide.hbs":
/*!****************************************!*\
  !*** ./src/js/handler/month/guide.hbs ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "<div class=\""
    + alias1(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-creation-guide\" style=\"border: "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.border : stack1), depth0))
    + "; background-color: "
    + alias1(alias2(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.backgroundColor : stack1), depth0))
    + ";\"></div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule\"\n        style=\"height: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.scheduleHeight : stack1), depth0))
    + "; line-height: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.scheduleHeight : stack1), depth0))
    + "; margin-top: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.scheduleGutter : stack1), depth0))
    + "; border-radius:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.borderRadius : stack1), depth0))
    + "; margin-left: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.marginLeft : stack1), depth0))
    + "; margin-right: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.marginRight : stack1), depth0))
    + ";\n            color:"
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + ";border-color:"
    + alias4(((helper = (helper = helpers.borderColor || (depth0 != null ? depth0.borderColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"borderColor","hash":{},"data":data}) : helper)))
    + ";background-color:"
    + alias4(((helper = (helper = helpers.bgColor || (depth0 != null ? depth0.bgColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bgColor","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-title\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isAllDay : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "        </div>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-resize-handle handle-y\" style=\"line-height: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.scheduleHeight : stack1), depth0))
    + ";\">&nbsp;</div>\n    </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                "
    + ((stack1 = (helpers["allday-tmpl"] || (depth0 && depth0["allday-tmpl"]) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"allday-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                "
    + ((stack1 = (helpers["time-tmpl"] || (depth0 && depth0["time-tmpl"]) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"time-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-guide-block\" style=\"top:"
    + alias4(((helper = (helper = helpers.top || (depth0 != null ? depth0.top : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"top","hash":{},"data":data}) : helper)))
    + ";height:"
    + alias4(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data}) : helper)))
    + ";display:none\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isCreationMode : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/handler/month/guide.js":
/*!***************************************!*\
  !*** ./src/js/handler/month/guide.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Guide element controller for creation, resize in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js"),
    datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js"),
    dw = __webpack_require__(/*! ../../common/dw */ "./src/js/common/dw.js"),
    tmpl = __webpack_require__(/*! ./guide.hbs */ "./src/js/handler/month/guide.hbs");
var mmax = Math.max,
    mmin = Math.min,
    mabs = Math.abs,
    mfloor = Math.floor;

/**
 * @constructor
 * @param {object} [options] - options
 * @param {boolean} [options.useHandle=false] - whether displaying resize handle on
 *  guide element?
 * @param {boolean} [options.isResizeMode=false] - whether resize mode?
 * @param {Month} monthView - Month view instance
 */
function MonthGuide(options, monthView) {
    var self = this;

    /**
     * @type {object}
     */
    this.options = util.extend({
        top: 0,
        height: '20px',
        bgColor: '#f7ca88',
        label: 'New event',
        isResizeMode: false,
        isCreationMode: false,
        styles: this._getStyles(monthView.controller.theme)
    }, options);

    /**
     * @type {Month}
     */
    this.view = monthView;

    /**
     * @type {WeekdayInMonth[]}
     */
    this.weeks = monthView.children.sort(function(a, b) {
        return util.stamp(a) - util.stamp(b);
    });

    /**
     * @type {number}
     */
    this.days = monthView.children.single().getRenderDateRange().length;

    /**
     * @type {function}
     */
    this.ratio = util.bind(function(value) {
        return common.ratio(self.days, 100, value);
    });

    /**
     * start coordinate of guide effect. (x, y) (days, weeks) effect can't
     *  start lower than this coordinate.
     * @type {number[]}
     */
    this.startCoord = [0, 0];

    /**
     * @type {Object.<string, HTMLElement>}
     */
    this.guideElements = {};

    /**
     * horizontal grid information
     * @type {Object}
     */
    this.grids = monthView.grids;
}

/**
 * Destructor
 */
MonthGuide.prototype.destroy = function() {
    this.clear();

    this.options = this.view = this.weeks = this.days =
        this.ratio = this.startCoord = this.guideElements = null;
};

MonthGuide.prototype.clearGuideElement = function() {
    this.destroy();
};

/**
 * Get ratio value in week.
 * @param {number} value - value for calc ratio in week
 * @returns {number} percent value
 */
MonthGuide.prototype._getRatioValueInWeek = function(value) {
    var grid = this.grids[value] || {left: 100};

    return grid.left;
};

/**
 * Create guide element
 * @returns {HTMLElement} guide element
 */
MonthGuide.prototype._createGuideElement = function() {
    var guide = document.createElement('div');

    guide.innerHTML = tmpl(this.options);

    return guide.firstChild;
};

/**
 * Get guide element. if not exist then create one
 * @param {number} y - y coordinate
 * @returns {?HTMLElement} guide element
 */
MonthGuide.prototype._getGuideElement = function(y) {
    var guideElements = this.guideElements,
        guide = guideElements[y],
        weekdayView = this.weeks[y],
        container;

    if (!weekdayView) {
        return null;
    }

    if (!guide) {
        guide = this._createGuideElement();
        container = weekdayView.container;
        container.appendChild(guide);
        guideElements[y] = guide;
    }

    return guide;
};

/**
 * Get coordinate by supplied date in month
 * @param {Date} date - date to find coordinate
 * @returns {number[]} coordinate (x, y)
 */
MonthGuide.prototype._getCoordByDate = function(date) {
    var weeks = this.weeks,
        days = this.days,
        getIdxFromDiff = function(d1, d2) {
            return mfloor(datetime.millisecondsTo('day', mabs(d2 - d1)));
        },
        monthStart = datetime.parse(weeks[0].options.renderStartDate),
        isBefore = date < monthStart,
        dateDW = dw(date),
        startDW = dw(monthStart),
        endDW = startDW.clone().addDate(isBefore ? -days : days),
        x = getIdxFromDiff(dateDW.d, startDW.d),
        y = 0;

    while (!dateDW.isBetween(startDW, endDW)) {
        startDW.addDate(isBefore ? -days : days);
        endDW = startDW.clone().addDate(days);
        x = getIdxFromDiff(dateDW.d, startDW.d);
        y += (isBefore ? -1 : 1);
    }

    return [x, y];
};

/**
 * Get limited coordinate by supplied coodinates
 * @param {number[]} coord - coordinate need to limit
 * @param {number[]} [min] - minimum limitaion of coordinate
 * @param {number[]} [max] - maximum limitation of coordinate
 * @returns {number[]} limited coordiate
 */
MonthGuide.prototype._getLimitedCoord = function(coord, min, max) {
    var toIndex = 1,
        x = coord[0],
        y = coord[1],
        result;

    min = min || [0, 0];
    max = max || [this.days - toIndex, this.weeks.length - toIndex];

    if (y < min[1]) {
        result = min.slice(0);
    } else if (y > max[1]) {
        result = max.slice(0);
    } else {
        x = mmax(min[0], x);
        x = mmin(max[0], x);
        result = [x, y];
    }

    return result;
};

/**
 * Prepare guide element modification
 * @param {object} dragStartEvent - dragStart schedule data from *guide
 */
MonthGuide.prototype.start = function(dragStartEvent) {
    var opt = this.options,
        target = dragStartEvent.target,
        model = dragStartEvent.model,
        x = dragStartEvent.x,
        y = dragStartEvent.y,
        renderMonth = datetime.parse(this.view.options.renderMonth + '-01'),
        temp;

    if (opt.isCreationMode) {
        if (model && !datetime.isSameMonth(renderMonth, model.start)) {
            model.start.setMonth(renderMonth.getMonth());
            model.start.setDate(1);
            model.end.setMonth(renderMonth.getMonth());
            model.end.setDate(1);
        }
    } else {
        temp = this._getCoordByDate(model.getStarts());
        x = temp[0];
        y = temp[1];

        util.extend(this.options, {
            top: parseInt(target.style.top, 10) + 'px',
            height: parseInt(target.style.height, 10) + 'px',
            label: model.title
        }, model);
    }

    if (util.isUndefined(x) || util.isUndefined(y)) {
        temp = this._getCoordByDate(model.getStarts());
        x = temp[0];
        y = temp[1];
    }

    this.startCoord = [x, y];
    this.update(x, y);
};

/**
 * Data for update several guide elements
 * @typedef UpdateIndication
 * @type {object}
 * @property {HTMLElement} guide - guide element
 * @property {number} left - left style value
 * @property {number} width - width style value
 * @property {boolean} [exceedL=false] - whether schedule is exceeded past weeks?
 * @property {boolean} [exceedR=false] - whether schedule is exceeded future weeks?
 */

/**
 * Modify HTML element that uses for guide element
 * @param {UpdateIndication[]} inds - indication of update severel guide element
 */
MonthGuide.prototype._updateGuides = function(inds) {
    util.forEach(inds, function(ind) {
        var guide = ind.guide,
            exceedLClass = config.classname('month-exceed-left'),
            exceedRClass = config.classname('month-exceed-right');

        guide.style.display = 'block';
        guide.style.left = ind.left + '%';
        guide.style.width = ind.width + '%';

        if (ind.exceedL) {
            domutil.addClass(guide, exceedLClass);
        } else {
            domutil.removeClass(guide, exceedLClass);
        }

        if (ind.exceedR) {
            domutil.addClass(guide, exceedRClass);
        } else {
            domutil.removeClass(guide, exceedRClass);
        }
    });
};

/**
 * Get guide element indicate for origin week
 * @param {number[]} startCoord - drag start coordinate
 * @param {number[]} mouseCoord - mouse coordinate
 * @returns {object} indicate
 */
MonthGuide.prototype._getOriginIndicate = function(startCoord, mouseCoord) {
    var left = mmin(startCoord[0], mouseCoord[0]),
        right = mmax(startCoord[0], mouseCoord[0]) + 1,
        exceedL, exceedR;

    if (mouseCoord[1] > startCoord[1]) {
        left = startCoord[0];
        right = this.days;
        exceedR = true;
    } else if (mouseCoord[1] < startCoord[1]) {
        left = 0;
        right = startCoord[0] + 1;
        exceedL = true;
    }

    return {
        left: this._getRatioValueInWeek(left),
        width: this._getRatioValueInWeek(right) -
            this._getRatioValueInWeek(left),
        exceedL: exceedL,
        exceedR: exceedR
    };
};

/**
 * Get guide element indicate for week related with mouse position
 * @param {number[]} startCoord - drag start coordinate
 * @param {number[]} mouseCoord - mouse coordinate
 * @returns {object} indicate
 */
MonthGuide.prototype._getMouseIndicate = function(startCoord, mouseCoord) {
    var left = mouseCoord[0],
        right = mouseCoord[0] + 1,
        exceedL, exceedR;

    if (mouseCoord[1] > startCoord[1]) {
        left = 0;
        exceedL = true;
    } else if (mouseCoord[1] < startCoord[1]) {
        right = this.days;
        exceedR = true;
    }

    return {
        left: this._getRatioValueInWeek(left),
        width: this._getRatioValueInWeek(right) -
            this._getRatioValueInWeek(left),
        exceedL: exceedL,
        exceedR: exceedR
    };
};

/**
 * Get guide element indicate for contained weeks
 * @returns {object} indicate
 */
MonthGuide.prototype._getContainIndicate = function() {
    return {
        left: 0,
        width: 100,
        exceedL: true,
        exceedR: true
    };
};

/**
 * Remove several guide element that supplied by parameter
 * @param {number[]} yCoords - array of y coordinate to remove guide element
 */
MonthGuide.prototype._removeGuideElements = function(yCoords) {
    var guides = this.guideElements;

    util.forEach(yCoords, function(y) {
        domutil.remove(guides[y]);
        delete guides[y];
    });
};

/**
 * Get excluded numbers in range
 * @param {number[]} range - the range. value must be sequencial.
 * @param {number[]} numbers - numbers to check
 * @returns {number[]} excluded numbers
 */
MonthGuide.prototype._getExcludesInRange = function(range, numbers) {
    var min = mmin.apply(null, range),
        max = mmax.apply(null, range),
        excludes = [];

    util.forEach(numbers, function(num) {
        num = parseInt(num, 10);
        if (num < min || num > max) {
            excludes.push(num);
        }
    });

    return excludes;
};

/**
 * Update guide elements by coordinate in month grid from mousemove event
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 */
MonthGuide.prototype.update = function(x, y) {
    var self = this,
        startCoord = this.startCoord,
        mouseCoord = [x, y],
        limitedCoord = this.options.isResizeMode ?
            this._getLimitedCoord(mouseCoord, startCoord) : mouseCoord,
        renderedYIndex = util.keys(this.guideElements),
        yCoordsToUpdate = util.range(
            mmin(startCoord[1], limitedCoord[1]),
            mmax(startCoord[1], limitedCoord[1]) + 1
        ),
        yCoordsToRemove = this._getExcludesInRange(
            yCoordsToUpdate,
            renderedYIndex
        ),
        renderIndication = {};

    this._removeGuideElements(yCoordsToRemove);

    util.forEach(yCoordsToUpdate, function(guideYCoord) {
        var guide = self._getGuideElement(guideYCoord),
            indicate;

        if (!guide) {
            return;
        }

        if (guideYCoord === startCoord[1]) {
            indicate = self._getOriginIndicate(startCoord, limitedCoord);
        } else if (guideYCoord === mouseCoord[1]) {
            indicate = self._getMouseIndicate(startCoord, mouseCoord);
        } else {
            indicate = self._getContainIndicate();
        }

        renderIndication[guideYCoord] = util.extend({
            guide: guide
        }, indicate);
    });

    this._updateGuides(renderIndication);
};

/**
 * Clear all guide elements
 */
MonthGuide.prototype.clear = function() {
    util.forEach(this.guideElements, function(element) {
        domutil.remove(element);
    });

    this.guideElements = {};
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
MonthGuide.prototype._getStyles = function(theme) {
    var styles = {};

    if (theme) {
        styles.border = theme.common.creationGuide.border;
        styles.backgroundColor = theme.common.creationGuide.backgroundColor;
        styles.scheduleHeight = theme.month.schedule.height;
        styles.scheduleGutter = theme.month.schedule.marginTop;
        styles.marginLeft = theme.month.schedule.marginLeft;
        styles.marginRight = theme.month.schedule.marginRight;
        styles.borderRadius = theme.month.schedule.borderRadius;
    }

    return styles;
};

module.exports = MonthGuide;



/***/ }),

/***/ "./src/js/handler/month/move.js":
/*!**************************************!*\
  !*** ./src/js/handler/month/move.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Move handler for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js"),
    datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js"),
    getMousePosData = __webpack_require__(/*! ./core */ "./src/js/handler/month/core.js"),
    MonthMoveGuide = __webpack_require__(/*! ./moveGuide */ "./src/js/handler/month/moveGuide.js"),
    TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;

/**
 * @constructor
 * @mixes CustomEvents
 * @param {Drag} dragHandler - Drag handler instance.
 * @param {Month} monthView - Month view instance.
 * @param {Base} baseController - Base controller instance.
 */
function MonthMove(dragHandler, monthView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Month}
     */
    this.monthView = monthView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {function}
     */
    this.getScheduleData = null;

    /**
     * @type {object}
     */
    this._cache = null;

    /**
     * @type {MonthMoveGuide}
     */
    this.guide = new MonthMoveGuide(this);

    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destructor
 */
MonthMove.prototype.destroy = function() {
    this.dragHandler.off(this);

    this.dragHandler = this.monthView = this.baseController = null;
};

/**
 * Update target schedule
 * @fires {MonthMove#beforeUpdateSchedule}
 * @param {object} scheduleCache - cache object that result of single dragging
 *  session.
 */
MonthMove.prototype.updateSchedule = function(scheduleCache) {
    var schedule = scheduleCache.model;
    var duration = schedule.duration().getTime();
    var startDateRaw = datetime.raw(schedule.start);
    var dragEndTime = Number(scheduleCache.end);
    var newStartDate = new TZDate(dragEndTime);

    newStartDate.setHours(startDateRaw.h, startDateRaw.m, startDateRaw.s, startDateRaw.ms);

    /**
     * @event MonthMove#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to update
     * @property {Date} start - start time to update
     * @property {Date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        start: newStartDate,
        end: new TZDate(newStartDate.getTime() + duration)
    });
};

/**
 * Get schedule block to clone for month guide effect
 * @param {HTMLElement} target - target element that related with drag schedule
 * @returns {HTMLElement} element to create guide effect
 */
MonthMove.prototype.getMonthScheduleBlock = function(target) {
    var blockSelector = config.classname('.weekday-schedule-block');

    return domutil.closest(target, blockSelector);
};

/**
 * Get schedule block from more layer
 * @param {HTMLElement} target - element to check
 * @returns {HTMLElement} schedule element
 */
MonthMove.prototype.getMoreLayerScheduleBlock = function(target) {
    var className = config.classname('.month-more-schedule');

    return domutil.closest(target, className);
};

/**
 * Check handler has permission to handle fired schedule
 * @fires {MonthMove#monthMoveStart_from_morelayer}
 * @param {HTMLElement} target - target element of fired schedule
 * @returns {(string|null)} model instance ID related with schedule. if handle
 *  has not permission to handle the schedule then return null.
 */
MonthMove.prototype.hasPermissionToHandle = function(target) {
    var modelID = null;
    var blockElement;

    if (domutil.hasClass(target, config.classname('weekday-resize-handle'))) {
        return null;
    }

    blockElement = this.getMonthScheduleBlock(target);

    if (blockElement) {
        modelID = domutil.getData(blockElement, 'id');
    } else {
        blockElement = this.getMoreLayerScheduleBlock(target);

        if (blockElement) {
            modelID = domutil.getData(blockElement, 'id');
            /**
             * Fire for notificate that the drag schedule start at more layer view.
             * @event {MonthMove#monthMoveStart_from_morelayer}
             */
            this.fire('monthMoveStart_from_morelayer');
        }
    }

    return modelID;
};

/**
 * Event handler for Drag#dragStart
 * @fires {MonthMove#monthMoveDragstart}
 * @param {object} dragStartEvent - drag start schedule data
 */
MonthMove.prototype._onDragStart = function(dragStartEvent) {
    var target = dragStartEvent.target,
        modelID = this.hasPermissionToHandle(target),
        model = this.baseController.schedules.items[modelID],
        scheduleData;

    if (!modelID || !model || model.isReadOnly || model.isPending) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getScheduleData = getMousePosData(this.monthView);

    scheduleData = this.getScheduleData(dragStartEvent.originEvent);
    scheduleData.originEvent = dragStartEvent.originEvent;
    scheduleData.target = this.getMonthScheduleBlock(target);
    scheduleData.model = model;

    this._cache = {
        model: model,
        target: target,
        start: new TZDate(Number(scheduleData.date))
    };

    /**
     * @event {MonthMove#monthMoveDragstart}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     * @property {HTMLElement} target - schedule block element
     * @property {Schedule} model - model instance
     */
    this.fire('monthMoveDragstart', scheduleData);
};

/**
 * @fires {MonthMove#monthMoveDrag}
 * @param {object} dragEvent - drag event data
 */
MonthMove.prototype._onDrag = function(dragEvent) {
    var scheduleData;

    if (!this.getScheduleData) {
        return;
    }

    scheduleData = util.extend({
        originEvent: dragEvent.originEvent
    }, this.getScheduleData(dragEvent.originEvent));

    if (!scheduleData) {
        return;
    }

    /**
     * @event {MonthMove#monthMoveDrag}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthMoveDrag', scheduleData);
};

/**
 * Event handler for Drag#dragEnd
 * @fires {MonthMove#monthMoveDragend}
 * @param {object} dragEndEvent - dragend event data
 */
MonthMove.prototype._onDragEnd = function(dragEndEvent) {
    var cache = this._cache;
    var scheduleData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    if (!this.getScheduleData) {
        return;
    }

    scheduleData = this.getScheduleData(dragEndEvent.originEvent);

    if (scheduleData) {
        cache.end = new TZDate(Number(scheduleData.date));
        this.updateSchedule(cache);
    }

    /**
     * @event {MonthResize#monthMoveDragend}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthMoveDragend', scheduleData);

    this.getScheduleData = this._cache = null;
};

util.CustomEvents.mixin(MonthMove);

module.exports = MonthMove;



/***/ }),

/***/ "./src/js/handler/month/moveGuide.hbs":
/*!********************************************!*\
  !*** ./src/js/handler/month/moveGuide.hbs ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            border-left:3px solid "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + ";\n            ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-bullet "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-bullet-focused\" style=\"top: "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.scheduleBulletTop : stack1), depth0))
    + "px;\"></span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-title-focused\"";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            "
    + ((stack1 = (helpers["allday-tmpl"] || (depth0 && depth0["allday-tmpl"]) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.model : depth0),{"name":"allday-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            "
    + ((stack1 = (helpers["time-tmpl"] || (depth0 && depth0["time-tmpl"]) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.model : depth0),{"name":"time-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-guide "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-guide-focused\"\n     style=\"top: -50%;\n            left: -50%;\n            width: 100%;\n            color: #ffffff;\n            background-color:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.dragBgColor : stack1), depth0))
    + ";\n            height:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.scheduleHeight : stack1), depth0))
    + "px;\n            line-height:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.scheduleHeight : stack1), depth0))
    + "px;\n            border-radius: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.borderRadius : stack1), depth0))
    + ";\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isAllDay : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n"
    + ((stack1 = helpers.unless.call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isAllDay : stack1),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-move-guide "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-title "
    + ((stack1 = helpers.unless.call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isAllDay : stack1),{"name":"unless","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isAllDay : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-guide-cover\" style=\"height:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.scheduleHeight : stack1), depth0))
    + "px; border-radius: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.borderRadius : stack1), depth0))
    + ";\"></div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/handler/month/moveGuide.js":
/*!*******************************************!*\
  !*** ./src/js/handler/month/moveGuide.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview Module for modification of guide element for move in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js"),
    domevent = __webpack_require__(/*! ../../common/domevent */ "./src/js/common/domevent.js"),
    FloatingLayer = __webpack_require__(/*! ../../common/floatingLayer */ "./src/js/common/floatingLayer.js"),
    tmpl = __webpack_require__(/*! ./moveGuide.hbs */ "./src/js/handler/month/moveGuide.hbs"),
    Schedule = __webpack_require__(/*! ../../model/schedule */ "./src/js/model/schedule.js");

/**
 * @constructor
 * @param {MonthMove} monthMove - month/move module instance
 */
function MonthMoveGuide(monthMove) {
    /**
     * @type {MonthMove}
     */
    this.monthMove = monthMove;

    /**
     * @type {HTMLElement[]}
     */
    this.elements = null;

    /**
     * @type {FloatingLayer}
     */
    this.layer = null;

    monthMove.on({
        monthMoveDragstart: this._onDragStart,
        monthMoveDrag: this._onDrag,
        monthMoveDragend: this._onDragEnd
    }, this);
}

/**
 * Destructor
 */
MonthMoveGuide.prototype.destroy = function() {
    this.monthMove.off(this);
    this._clearGridBgColor();

    if (this.layer) {
        this.layer.destroy();
    }

    if (this.element) {
        domutil.remove(this.element);
    }

    this.monthMove = this.elements = this.layer = null;
};

/**
 * Hide element blocks for resize effect
 * @param {number} modelID - Schedule model instance ID
 */
MonthMoveGuide.prototype._hideOriginScheduleBlocks = function(modelID) {
    var className = config.classname('weekday-schedule-block-dragging-dim');

    this.elements = domutil.find(
        config.classname('.weekday-schedule-block-' + modelID),
        this.monthMove.monthView.container,
        true
    );

    util.forEach(this.elements, function(el) {
        domutil.addClass(el, className);
    });
};

/**
 * Show element blocks
 */
MonthMoveGuide.prototype._showOriginScheduleBlocks = function() {
    var className = config.classname('weekday-schedule-block-dragging-dim');

    util.forEach(this.elements, function(el) {
        domutil.removeClass(el, className);
    });
};

/**
 * Clear background color for filled grid element.
 */
MonthMoveGuide.prototype._clearGridBgColor = function() {
    var selector = config.classname('.weekday-filled'),
        className = config.classname('weekday-filled'),
        beforeGridElement = domutil.find(selector,
            this.monthMove.monthView.container);

    if (beforeGridElement) {
        domutil.removeClass(beforeGridElement, className);
    }
};

/**
 * Fill background color of date grids relatied with model updates.
 * @param {object} dragEvent - drag event data from MonthMoveGuide#_onDrag
 */
MonthMoveGuide.prototype._updateGridBgColor = function(dragEvent) {
    var gridElements = domutil.find(config.classname('.weekday-grid-line'), this.monthMove.monthView.container, true),
        className = config.classname('weekday-filled'),
        targetIndex = (dragEvent.x + (dragEvent.sizeX * dragEvent.y));

    this._clearGridBgColor();

    if (!gridElements || !gridElements[targetIndex]) {
        return;
    }

    domutil.addClass(gridElements[targetIndex], className);
};

/**
 * Handler for MonthMove#dragStart
 * @param {object} dragStartEvent - dragStart schedule data object
 */
MonthMoveGuide.prototype._onDragStart = function(dragStartEvent) {
    var monthView = this.monthMove.monthView,
        firstWeekdayView = monthView.children.single(),
        weekdayOptions = firstWeekdayView.options,
        widthPercent = 100 / firstWeekdayView.getRenderDateRange().length,
        height = weekdayOptions.scheduleGutter + weekdayOptions.scheduleHeight,
        container = monthView.container,
        mousePos = domevent.getMousePosition(dragStartEvent.originEvent, container),
        model = dragStartEvent.model,
        layer = new FloatingLayer(null, container);

    this._hideOriginScheduleBlocks(model.cid());

    this.layer = layer;
    layer.setSize(widthPercent + '%', height);
    layer.setPosition(mousePos[0], mousePos[1]);
    layer.setContent(tmpl({
        model: util.extend(
            Schedule.create(model),
            model
        ),
        styles: {
            scheduleHeight: weekdayOptions.scheduleHeight,
            scheduleBulletTop: weekdayOptions.scheduleHeight / 3,
            borderRadius: monthView.controller.theme.month.schedule.borderRadius
        }
    }));
    layer.show();

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('dragging'));
    }
};

/**
 * Handler for MonthMove#drag
 * @param {object} dragEvent - drag event data object
 */
MonthMoveGuide.prototype._onDrag = function(dragEvent) {
    var container = this.monthMove.monthView.container,
        mousePos = domevent.getMousePosition(
            dragEvent.originEvent,
            container
        );

    this._updateGridBgColor(dragEvent);

    if (!this.layer) {
        return;
    }

    this.layer.setPosition(mousePos[0], mousePos[1]);
};

/**
 * Handler for MonthMove#dragEnd
 */
MonthMoveGuide.prototype._onDragEnd = function() {
    this._showOriginScheduleBlocks();

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('dragging'));
    }

    this._clearGridBgColor();
    this.layer.destroy();
    this.layer = null;
};

module.exports = MonthMoveGuide;


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/handler/month/resize.js":
/*!****************************************!*\
  !*** ./src/js/handler/month/resize.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Module for resize schedule in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js"),
    getMousePosData = __webpack_require__(/*! ./core */ "./src/js/handler/month/core.js"),
    MonthResizeGuide = __webpack_require__(/*! ./resizeGuide */ "./src/js/handler/month/resizeGuide.js"),
    TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;

/**
 * @constructor
 * @param {Drag} dragHandler - Drag handler instance.
 * @param {Month} monthView - Month view instance.
 * @param {Base} baseController - Base controller instance.
 */
function MonthResize(dragHandler, monthView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Month}
     */
    this.monthView = monthView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {function}
     */
    this.getScheduleData = null;

    /**
     * @type {object}
     */
    this._cache = null;

    /**
     * @type {MonthResizeGuide}
     */
    this.guide = new MonthResizeGuide(this);

    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destructor
 */
MonthResize.prototype.destroy = function() {
    this.dragHandler.off(this);

    this.dragHandler = this.monthView = this.baseController = null;
};

/**
 * Fire event for update model
 * @fires {MonthResize#beforeUpdateSchedule}
 * @param {object} scheduleCache - cache object that result of single dragging
 *  session.
 */
MonthResize.prototype._updateSchedule = function(scheduleCache) {
    // You can not change the start date of the event. Only the end time can be changed.
    var newEnd = datetime.end(new TZDate(Number(scheduleCache.end))),
        schedule = scheduleCache.schedule;

    /**
     * @event MonthResize#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to update
     * @property {Date} start - start time to update
     * @property {Date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        start: new TZDate(Number(schedule.getStarts())),
        end: newEnd
    });
};

/**
 * Event handler for Drag#dragStart
 * @fires {MonthResize#monthResizeDragstart}
 * @param {object} dragStartEvent - drag start event data
 */
MonthResize.prototype._onDragStart = function(dragStartEvent) {
    var target = dragStartEvent.target,
        modelID, schedule,
        scheduleData;

    if (!domutil.hasClass(target, config.classname('weekday-resize-handle'))) {
        return;
    }

    target = domutil.closest(target, config.classname('.weekday-schedule-block'));

    if (!target) {
        return;
    }

    modelID = domutil.getData(target, 'id');
    schedule = this.baseController.schedules.items[modelID];

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getScheduleData = getMousePosData(this.monthView);
    scheduleData = this.getScheduleData(dragStartEvent.originEvent);
    scheduleData.target = target;
    scheduleData.model = schedule;

    this._cache = {
        schedule: schedule,
        target: target,
        start: new TZDate(Number(scheduleData.date))
    };

    /**
     * @event {MonthCreation#monthResizeDragstart}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     * @property {HTMLElement} target - schedule block element
     * @property {Schedule} model - model instance
     */
    this.fire('monthResizeDragstart', scheduleData);
};

/**
 * @fires {MonthResize#monthResizeDrag}
 * @param {object} dragEvent - drag event data
 */
MonthResize.prototype._onDrag = function(dragEvent) {
    var scheduleData;

    if (!this.getScheduleData) {
        return;
    }

    scheduleData = this.getScheduleData(dragEvent.originEvent);

    if (!scheduleData) {
        return;
    }

    /**
     * @event {MonthResize#monthResizeDrag}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthResizeDrag', scheduleData);
};

/**
 * @fires {MonthResize#monthResizeDragend}
 * @param {object} dragEndEvent - drag end event data
 */
MonthResize.prototype._onDragEnd = function(dragEndEvent) {
    var cache = this._cache,
        scheduleData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    if (!this.getScheduleData) {
        return;
    }

    scheduleData = this.getScheduleData(dragEndEvent.originEvent);

    if (scheduleData) {
        cache.end = new TZDate(Number(scheduleData.date));
        this._updateSchedule(cache);
    }

    /**
     * @event {MonthResize#monthResizeDragend}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthResizeDragend', scheduleData);

    this.getScheduleData = this._cache = null;
};

util.CustomEvents.mixin(MonthResize);

module.exports = MonthResize;



/***/ }),

/***/ "./src/js/handler/month/resizeGuide.js":
/*!*********************************************!*\
  !*** ./src/js/handler/month/resizeGuide.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview Module for modification of guide element in schedule resize
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js"),
    MonthGuide = __webpack_require__(/*! ./guide */ "./src/js/handler/month/guide.js");

/**
 * @constructor
 * @param {MonthResize} monthResize - month/resize module instance
 */
function MonthResizeGuide(monthResize) {
    /**
     * @type {MonthResize}
     */
    this.monthResize = monthResize;

    /**
     * @type {HTMLElement[]}
     */
    this.elements = null;

    /**
     * @type {MonthGuide}
     */
    this.guide = null;

    monthResize.on({
        monthResizeDragstart: this._onDragStart,
        monthResizeDrag: this._onDrag,
        monthResizeDragend: this._onDragEnd
    }, this);
}

/**
 * Destructor
 */
MonthResizeGuide.prototype.destroy = function() {
    this.monthResize.off(this);
    this.guide.destroy();

    this.guide = this.monthResize = null;
};

/**
 * Hide element blocks for resize effect
 * @param {number} modelID - Schedule model instance ID
 */
MonthResizeGuide.prototype._hideScheduleBlocks = function(modelID) {
    this.elements = domutil.find(
        config.classname('.weekday-schedule-block-' + modelID),
        this.monthResize.monthView.container,
        true
    );

    util.forEach(this.elements, function(el) {
        el.style.display = 'none';
    });
};

/**
 * Show element blocks
 */
MonthResizeGuide.prototype._showScheduleBlocks = function() {
    util.forEach(this.elements, function(el) {
        el.style.display = 'block';
    });
};

/**
 * Drag start event handler
 * @param {object} dragStartEvent - schedule data from MonthResize
 */
MonthResizeGuide.prototype._onDragStart = function(dragStartEvent) {
    this.guide = new MonthGuide({
        isResizeMode: true
    }, this.monthResize.monthView);

    this._hideScheduleBlocks(dragStartEvent.model.cid());

    this.guide.start(dragStartEvent);

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('resizing-x'));
    }
};

/**
 * Drag event handler
 * @param {object} dragEvent - event data from MonthCreation
 */
MonthResizeGuide.prototype._onDrag = function(dragEvent) {
    this.guide.update(dragEvent.x, dragEvent.y);
};

/**
 * Drag end event handler
 */
MonthResizeGuide.prototype._onDragEnd = function() {
    this._showScheduleBlocks();

    this.guide.destroy();
    this.elements = this.guide = null;

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('resizing-x'));
    }
};

module.exports = MonthResizeGuide;


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/handler/time/click.js":
/*!**************************************!*\
  !*** ./src/js/handler/time/click.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Allday event click event hander module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");

/**
 * @constructor
 * @implements {Handler}
 * @mixes util.CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function TimeClick(dragHandler, timeGridView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {TimeGrid}
     */
    this.timeGridView = timeGridView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destroy method
 */
TimeClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.timeGridView = this.baseController = this.dragHandler = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {string} - model id
 */
TimeClick.prototype.checkExpectCondition = function(target) {
    var container,
        matches;

    container = domutil.closest(target, config.classname('.time-date'));

    if (!container) {
        return false;
    }

    matches = domutil.getClass(container).match(config.time.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.children.items, Number(matches[1]));
};

/**
 * Click event hander
 * @param {object} clickEvent - click event from {@link Drag}
 * @emits TimeClick#clickEvent
 */
TimeClick.prototype._onClick = function(clickEvent) {
    var self = this,
        target = clickEvent.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, config.classname('.time-date-schedule-block')),
        schedulesCollection = this.baseController.schedules;

    if (!timeView || !blockElement) {
        return;
    }

    schedulesCollection.doWhenHas(domutil.getData(blockElement, 'id'), function(schedule) {
        /**
         * @events TimeClick#clickSchedule
         * @type {object}
         * @property {Schedule} schedule - schedule instance
         * @property {MouseEvent} event - MouseEvent object
         */
        self.fire('clickSchedule', {
            schedule: schedule,
            event: clickEvent.originEvent
        });
    });
};

util.CustomEvents.mixin(TimeClick);

module.exports = TimeClick;



/***/ }),

/***/ "./src/js/handler/time/clickDayname.js":
/*!*********************************************!*\
  !*** ./src/js/handler/time/clickDayname.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Dayname click event hander module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");

/**
 * @constructor
 * @implements {Handler}
 * @mixes util.CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {DayName} [dayNameView] - DayName view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function DayNameClick(dragHandler, dayNameView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {DayName}
     */
    this.dayNameView = dayNameView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destroy method
 */
DayNameClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.dayNameView = this.baseController = this.dragHandler = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {string} - model id
 */
DayNameClick.prototype.checkExpectCondition = function(target) {
    var container = domutil.closest(target, config.classname('.dayname-date-area'));

    if (!container) {
        return false;
    }

    return true;
};

/**
 * Click event hander
 * @param {object} clickEvent - click event from {@link Drag}
 * @emits DayNameClick#clickDayname
 */
DayNameClick.prototype._onClick = function(clickEvent) {
    var self = this,
        target = clickEvent.target,
        daynameView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, config.classname('.dayname'));

    if (!daynameView || !blockElement) {
        return;
    }

    /**
     * @events DayNameClick#clickDayname
     * @type {object}
     * @property {string} date - click date
     */
    self.fire('clickDayname', {
        date: domutil.getData(blockElement, 'date')
    });
};

util.CustomEvents.mixin(DayNameClick);

module.exports = DayNameClick;



/***/ }),

/***/ "./src/js/handler/time/core.js":
/*!*************************************!*\
  !*** ./src/js/handler/time/core.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Core methods for dragging actions
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var domevent = __webpack_require__(/*! ../../common/domevent */ "./src/js/common/domevent.js");
var Point = __webpack_require__(/*! ../../common/point */ "./src/js/common/point.js");

/**
 * @mixin Time.Core
 */
var timeCore = {
    /**
     * Get Y index ratio(hour) in time grids by supplied parameters.
     * @param {number} baseMil - base milliseconds number for supplied height.
     * @param {number} height - container element height.
     * @param {number} y - Y coordinate to calculate hour ratio.
     * @returns {number} hour index ratio value.
     */
    _calcGridYIndex: function(baseMil, height, y) {
        // get ratio from right expression > point.y : x = session.height : baseMil
        // and convert milliseconds value to hours.
        var result = datetime.millisecondsTo('hour', (y * baseMil) / height),
            floored = result | 0,
            nearest = common.nearest(result - floored, [0, 1]);

        return floored + (nearest ? 0.5 : 0);
    },

    /**
     * Get function to makes event data from Time and mouseEvent
     * @param {Time} timeView - Instance of time view.
     * @returns {function} - Function that return event data from mouse event.
     */
    _retriveScheduleData: function(timeView) {
        var self = this,
            container = timeView.container,
            options = timeView.options,
            viewHeight = timeView.getViewBound().height,
            viewTime = Number(timeView.getDate()),
            hourLength = options.hourEnd - options.hourStart,
            baseMil = datetime.millisecondsFrom('hour', hourLength);

        /**
         * @param {MouseEvent} mouseEvent - mouse event object to get common event data.
         * @param {object} [extend] - object to extend event data before return.
         * @returns {object} - common event data for time.*
         */
        return util.bind(function(mouseEvent, extend) {
            var mouseY = Point.n(domevent.getMousePosition(mouseEvent, container)).y,
                gridY = common.ratio(viewHeight, hourLength, mouseY),
                timeY = viewTime + datetime.millisecondsFrom('hour', gridY),
                nearestGridY = self._calcGridYIndex(baseMil, viewHeight, mouseY),
                nearestGridTimeY = viewTime + datetime.millisecondsFrom('hour', nearestGridY + options.hourStart);

            return util.extend({
                target: mouseEvent.target || mouseEvent.srcElement,
                relatedView: timeView,
                originEvent: mouseEvent,
                mouseY: mouseY,
                gridY: gridY,
                timeY: timeY,
                nearestGridY: nearestGridY,
                nearestGridTimeY: nearestGridTimeY,
                triggerEvent: mouseEvent.type
            }, extend);
        }, this);
    },

    /**
     * Get function to makes event data from Time and mouseEvent
     * @param {Time} timeView - Instance of time view.
     * @param {number} xIndex - Time view index
     * @returns {function} - Function that return event data from mouse event.
     */
    _retriveScheduleDataFromDate: function(timeView) {
        var viewTime = Number(timeView.getDate());

        /**
         * @param {TZDate} startDate - start date
         * @param {TZDate} endDate - end date
         * @param {number} hourStart Can limit of render hour start.
         * @returns {object} - common event data for time.*
         */
        return util.bind(function(startDate, endDate, hourStart) {
            var gridY, timeY, nearestGridY, nearestGridTimeY, nearestGridEndY, nearestGridEndTimeY;

            gridY = startDate.getHours() - hourStart + getNearestHour(startDate.getMinutes());
            timeY = viewTime + datetime.millisecondsFrom('hour', gridY);
            nearestGridY = gridY;
            nearestGridTimeY = viewTime + datetime.millisecondsFrom('hour', nearestGridY);
            nearestGridEndY = endDate.getHours() - hourStart + getNearestHour(endDate.getMinutes());
            nearestGridEndTimeY = viewTime + datetime.millisecondsFrom('hour', nearestGridEndY);

            return util.extend({
                target: timeView,
                relatedView: timeView,
                gridY: gridY,
                timeY: timeY,
                nearestGridY: nearestGridY,
                nearestGridTimeY: nearestGridTimeY,
                nearestGridEndY: nearestGridEndY,
                nearestGridEndTimeY: nearestGridEndTimeY,
                triggerEvent: 'manual',
                hourStart: hourStart
            });
        }, this);
    },

    /**
     * Mixin method.
     * @param {(TimeCreation|TimeMove)} obj - Constructor functions
     */
    mixin: function(obj) {
        var proto = obj.prototype;
        util.forEach(timeCore, function(method, methodName) {
            if (methodName === 'mixin') {
                return;
            }

            proto[methodName] = method;
        });
    }
};

/**
 * Get the nearest hour
 * @param {number} minutes - minutes
 * @returns {number} hour
 */
function getNearestHour(minutes) {
    var nearestHour;
    if (minutes === 0) {
        nearestHour = 0;
    } else if (minutes > 30) {
        nearestHour = 1;
    } else if (minutes <= 30) {
        nearestHour = 0.5;
    }

    return nearestHour;
}

module.exports = timeCore;



/***/ }),

/***/ "./src/js/handler/time/creation.js":
/*!*****************************************!*\
  !*** ./src/js/handler/time/creation.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Handling creation events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var array = __webpack_require__(/*! ../../common/array */ "./src/js/common/array.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var domevent = __webpack_require__(/*! ../../common/domevent */ "./src/js/common/domevent.js");
var TimeCreationGuide = __webpack_require__(/*! ./creationGuide */ "./src/js/handler/time/creationGuide.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;
var timeCore = __webpack_require__(/*! ./core */ "./src/js/handler/time/core.js");

var CLICK_DELAY = 300;

/**
 * @constructor
 * @implements {Handler}
 * @mixes timeCore
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 * @param {Options} [options] - calendar Options
 */
function TimeCreation(dragHandler, timeGridView, baseController, options) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * TimeGrid view instance.
     * @type {TimeGrid}
     */
    this.timeGridView = timeGridView;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {TimeCreationGuide}
     */
    this.guide = new TimeCreationGuide(this);

    /**
     * Temporary function for single drag session's calc.
     * @type {function}
     */
    this._getScheduleDataFunc = null;

    /**
     * Temporary function for drag start data cache.
     * @type {object}
     */
    this._dragStart = null;

    /**
     * @type {boolean}
     */
    this._requestOnClick = false;

    dragHandler.on('dragStart', this._onDragStart, this);
    dragHandler.on('click', this._onClick, this);

    if (options.disableDblClick) {
        CLICK_DELAY = 0;
    } else {
        domevent.on(timeGridView.container, 'dblclick', this._onDblClick, this);
    }
}

/**
 * Destroy method
 */
TimeCreation.prototype.destroy = function() {
    var timeGridView = this.timeGridView;

    this.guide.destroy();
    this.dragHandler.off(this);

    if (timeGridView && timeGridView.container) {
        domevent.off(timeGridView.container, 'dblclick', this._onDblClick, this);
    }

    this.dragHandler = this.timeGridView = this.baseController =
        this._getScheduleDataFunc = this._dragStart = this.guide = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {(boolean|Time)} - return Time view instance when satiate condition.
 */
TimeCreation.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (cssClass === config.classname('time-date-schedule-block-wrap')) {
        target = target.parentNode;
        cssClass = domutil.getClass(target);
    }

    matches = cssClass.match(config.time.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.children.items, matches[1]);
};

/**
 * Drag#dragStart event handler.
 * @emits TimeCreation#timeCreationDragstart
 * @param {object} dragStartEventData - Drag#dragStart event data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeCreation.prototype._onDragStart = function(dragStartEventData, overrideEventName, revise) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        getScheduleDataFunc,
        eventData;

    if (!result) {
        return;
    }

    getScheduleDataFunc = this._getScheduleDataFunc = this._retriveScheduleData(result);
    eventData = this._dragStart = getScheduleDataFunc(dragStartEventData.originEvent);

    if (revise) {
        revise(eventData);
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    /**
     * @event TimeCreation#timeCreationDragstart
     * @type {object}
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     */
    this.fire(overrideEventName || 'timeCreationDragstart', eventData);
};

/**
 * Drag#drag event handler
 * @emits TimeCreation#timeCreationDrag
 * @param {object} dragEventData - event data from Drag#drag.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeCreation.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var getScheduleDataFunc = this._getScheduleDataFunc,
        eventData;

    if (!getScheduleDataFunc) {
        return;
    }

    eventData = getScheduleDataFunc(dragEventData.originEvent);

    if (revise) {
        revise(eventData);
    }

    /**
     * @event TimeCreation#timeCreationDrag
     * @type {object}
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     */
    this.fire(overrideEventName || 'timeCreationDrag', eventData);
};

/**
 * @fires TimeCreation#beforeCreateSchedule
 * @param {object} eventData - event data object from TimeCreation#timeCreationDragend
 * or TimeCreation#timeCreationClick
 */
TimeCreation.prototype._createSchedule = function(eventData) {
    var relatedView = eventData.relatedView,
        createRange = eventData.createRange,
        nearestGridTimeY = eventData.nearestGridTimeY,
        nearestGridEndTimeY = eventData.nearestGridEndTimeY ? eventData.nearestGridEndTimeY : nearestGridTimeY + datetime.millisecondsFrom('minutes', 30),
        baseDate,
        dateStart,
        dateEnd,
        start,
        end;

    if (!createRange) {
        createRange = [
            nearestGridTimeY,
            nearestGridEndTimeY
        ];
    }

    baseDate = new TZDate(relatedView.getDate());
    dateStart = datetime.start(baseDate);
    dateEnd = datetime.end(baseDate);
    start = Math.max(dateStart.getTime(), createRange[0]);
    end = Math.min(dateEnd.getTime(), createRange[1]);

    /**
     * @event TimeCreation#beforeCreateSchedule
     * @type {object}
     * @property {boolean} isAllDay - whether schedule is fired in allday view area?
     * @property {Date} start - select start time
     * @property {Date} end - select end time
     * @property {TimeCreationGuide} guide - TimeCreationGuide instance
     * @property {string} triggerEventName - event name
     */
    this.fire('beforeCreateSchedule', {
        isAllDay: false,
        start: new TZDate(start),
        end: new TZDate(end),
        guide: this.guide,
        triggerEventName: eventData.triggerEvent
    });
};

/**
 * Drag#dragEnd event handler
 * @emits TimeCreation#timeCreationDragend
 * @param {object} dragEndEventData - event data from Drag#dragend
 */
TimeCreation.prototype._onDragEnd = function(dragEndEventData) {
    var self = this,
        dragStart = this._dragStart;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    /**
     * Function for manipulate event data before firing event
     * @param {object} eventData - event data
     */
    function reviseFunc(eventData) {
        var range = [
            dragStart.nearestGridTimeY,
            eventData.nearestGridTimeY
        ].sort(array.compare.num.asc);
        range[1] += datetime.millisecondsFrom('hour', 0.5);

        eventData.createRange = range;

        self._createSchedule(eventData);
    }

    /**
     * @event TimeCreation#timeCreationDragend
     * @type {object}
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {number[]} createRange - milliseconds range between drag start and end to create.
     */
    this._onDrag(dragEndEventData, 'timeCreationDragend', reviseFunc);

    this._dragStart = this._getScheduleDataFunc = null;
};

/**
 * Drag#click event handler
 * @emits TimeCreation#timeCreationClick
 * @param {object} clickEventData - event data from Drag#click.
 */
TimeCreation.prototype._onClick = function(clickEventData) {
    var self = this;
    var condResult, getScheduleDataFunc, eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    condResult = this.checkExpectedCondition(clickEventData.target);
    if (!condResult) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(condResult);
    eventData = getScheduleDataFunc(clickEventData.originEvent);

    this._requestOnClick = true;
    setTimeout(function() {
        if (self._requestOnClick) {
            self.fire('timeCreationClick', eventData);
            self._createSchedule(eventData);
        }
        self._requestOnClick = false;
    }, CLICK_DELAY);
    this._dragStart = this._getScheduleDataFunc = null;
};

/**
 * Dblclick event handler
 * @param {MouseEvent} e - Native MouseEvent
 */
TimeCreation.prototype._onDblClick = function(e) {
    var condResult, getScheduleDataFunc, eventData;

    condResult = this.checkExpectedCondition(e.target);
    if (!condResult) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(condResult);
    eventData = getScheduleDataFunc(e);

    this.fire('timeCreationClick', eventData);

    this._createSchedule(eventData);

    this._requestOnClick = false;
};

/**
 * Invoke creation click
 * @param {Schedule} schedule - schedule instance
 */
TimeCreation.prototype.invokeCreationClick = function(schedule) {
    var opt = this.timeGridView.options,
        range = datetime.range(
            datetime.parse(opt.renderStartDate),
            datetime.parse(opt.renderEndDate),
            datetime.MILLISECONDS_PER_DAY),
        hourStart = opt.hourStart,
        targetDate = schedule.start;
    var getScheduleDataFunc, eventData, timeView;

    util.forEach(range, function(date, index) {
        if (datetime.isSameDate(date, targetDate)) {
            timeView = this.timeGridView.children.toArray()[index];
        }
    }, this);

    // If start date is not in current date, set start date as first date.
    if (!timeView) {
        timeView = this.timeGridView.children.toArray()[0];
    }

    getScheduleDataFunc = this._retriveScheduleDataFromDate(timeView);
    eventData = getScheduleDataFunc(schedule.start, schedule.end, hourStart);

    this.fire('timeCreationClick', eventData);

    this._createSchedule(eventData);
};

timeCore.mixin(TimeCreation);
util.CustomEvents.mixin(TimeCreation);

module.exports = TimeCreation;


/***/ }),

/***/ "./src/js/handler/time/creationGuide.js":
/*!**********************************************!*\
  !*** ./src/js/handler/time/creationGuide.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview Module for Time.Creation effect while dragging.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var reqAnimFrame = __webpack_require__(/*! ../../common/reqAnimFrame */ "./src/js/common/reqAnimFrame.js");
var ratio = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js").ratio;
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;
var MIN30 = (datetime.MILLISECONDS_PER_MINUTES * 30);
var MIN60 = (datetime.MILLISECONDS_PER_MINUTES * 60);

/**
 * Class for Time.Creation dragging effect.
 * @constructor
 * @param {TimeCreation} timeCreation - instance of TimeCreation.
 */
function TimeCreationGuide(timeCreation) {
    /**
     * Guide element for creation effect.
     * @type {HTMLElement}
     */
    this.guideElement = global.document.createElement('div');

    /**
     * @type {HTMLDivElement}
     */
    this.guideTimeElement = domutil.appendHTMLElement(
        'span',
        this.guideElement,
        config.classname('time-guide-creation-label')
    );

    domutil.addClass(this.guideElement, config.classname('time-guide-creation'));

    /**
     * @type {TimeCreation}
     */
    this.timeCreation = timeCreation;

    /**
     * @type {array}
     */
    this._styleUnit = null;

    /**
     * @type {array}
     */
    this._styleStart = null;

    /**
     * @type {function}
     */
    this._styleFunc = null;

    timeCreation.on({
        timeCreationDragstart: this._createGuideElement,
        timeCreationDrag: this._onDrag,
        timeCreationClick: this._createGuideElement
    }, this);

    this.applyTheme(timeCreation.baseController.theme);
}

/**
 * Destroy method.
 */
TimeCreationGuide.prototype.destroy = function() {
    this.clearGuideElement();
    this.timeCreation.off(this);
    this.timeCreation = this._styleUnit = this._styleStart =
        this._styleFunc = this.guideElement = this.guideTimeElement = null;
};

/**
 * Clear guide element.
 */
TimeCreationGuide.prototype.clearGuideElement = function() {
    var guideElement = this.guideElement,
        timeElement = this.guideTimeElement;

    domutil.remove(guideElement);

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.display = 'none';
        guideElement.style.top = '';
        guideElement.style.height = '';
        timeElement.innerHTML = '';
    });
};

/**
 * Refresh guide element
 * @param {number} top - The number of guide element's style top
 * @param {number} height - The number of guide element's style height
 * @param {Date} start - start time of schedule to create
 * @param {Date} end - end time of schedule to create
 * @param {boolean} bottomLabel - is label need to render bottom of guide element?
 */
TimeCreationGuide.prototype._refreshGuideElement = function(top, height, start, end, bottomLabel) {
    var guideElement = this.guideElement;
    var timeElement = this.guideTimeElement;

    guideElement.style.top = top + 'px';
    guideElement.style.height = height + 'px';
    guideElement.style.display = 'block';

    timeElement.innerHTML = datetime.format(new TZDate(start), 'HH:mm') +
        ' - ' + datetime.format(new TZDate(end), 'HH:mm');

    if (bottomLabel) {
        domutil.removeClass(timeElement, config.classname('time-guide-bottom'));
    } else {
        domutil.addClass(timeElement, config.classname('time-guide-bottom'));
    }
};

/**
 * Get unit data of calculating new style of guide element by user interaction
 * @param {Time} relatedView - time view instance related with schedule
 * @returns {array} unit data.
 */
TimeCreationGuide.prototype._getUnitData = function(relatedView) {
    var viewOpt = relatedView.options,
        viewHeight = relatedView.getViewBound().height,
        hourLength = viewOpt.hourEnd - viewOpt.hourStart,
        todayStart = datetime.parse(viewOpt.ymd),
        todayEnd = datetime.end(todayStart);

    todayStart.setHours(0, 0, 0, 0);
    todayStart.setHours(viewOpt.hourStart);

    // [0] height of view
    // [1] hour length of view
    // [2] start time of view
    // [3] end time of view
    // [4] height of view for one hour
    return [
        viewHeight,
        hourLength,
        Number(todayStart),
        Number(todayEnd),
        viewHeight / hourLength
    ];
};

/**
 * Applying limitation to supplied data and return it.
 * @param {number} top - top pixel of guide element
 * @param {number} height - height pixel of guide element
 * @param {number} start - relative time value of dragstart point
 * @param {number} end - relative time value of dragend point
 * @returns {array} limited style data
 */
TimeCreationGuide.prototype._limitStyleData = function(top, height, start, end) {
    var unitData = this._styleUnit;

    top = common.limit(top, [0], [unitData[0]]);
    height = common.limit(top + height, [0], [unitData[0]]) - top;
    start = common.limit(start, [unitData[2]], [unitData[3]]);
    end = common.limit(end, [unitData[2]], [unitData[3]]);

    return [top, height, start, end];
};

/**
 * Get function to calculate guide element UI data from supplied units
 * @param {number} viewHeight - total height of view's container element
 * @param {number} hourLength - hour length that rendered in time view
 * @param {number} todayStart - time for view's start date
 * @returns {function} UI data calculator function
 */
TimeCreationGuide.prototype._getStyleDataFunc = function(viewHeight, hourLength, todayStart) {
    var todayEnd = Number(datetime.end(new TZDate(Number(todayStart))));

    /**
     * Get top, time value from schedule dat
     * @param {object} scheduleData - schedule data object
     * @returns {number[]} top, time
     */
    function getStyleData(scheduleData) {
        var gridY = scheduleData.nearestGridY,
            gridTimeY = scheduleData.nearestGridTimeY,
            gridEndTimeY = scheduleData.nearestGridEndTimeY || gridTimeY + MIN30,
            top, startTime, endTime;

        top = common.limit(ratio(hourLength, viewHeight, gridY), [0], [viewHeight]);
        startTime = common.limit(gridTimeY, [todayStart], [todayEnd]);
        endTime = common.limit(gridEndTimeY, [todayStart], [todayEnd]);

        return [top, startTime, endTime];
    }

    return getStyleData;
};

/**
 * DragStart event handler
 * @param {object} dragStartEventData - dragStart schedule data.
 */
TimeCreationGuide.prototype._createGuideElement = function(dragStartEventData) {
    var relatedView = dragStartEventData.relatedView,
        hourStart = datetime.millisecondsFrom('hour', dragStartEventData.hourStart),
        unitData, styleFunc, styleData, result, top, height, start, end;

    unitData = this._styleUnit = this._getUnitData(relatedView);
    styleFunc = this._styleFunc = this._getStyleDataFunc.apply(this, unitData);
    styleData = this._styleStart = styleFunc(dragStartEventData);

    start = styleData[1] + hourStart;
    end = styleData[2] + hourStart || (start + MIN30);
    top = styleData[0];
    height = (unitData[4] * (end - start) / MIN60);

    result = this._limitStyleData(
        top,
        height,
        start,
        end
    );

    this._refreshGuideElement.apply(this, result);

    relatedView.container.appendChild(this.guideElement);
};

/**
 * Drag event handler
 * @param {object} dragEventData - drag schedule data.
 */
TimeCreationGuide.prototype._onDrag = function(dragEventData) {
    var styleFunc = this._styleFunc,
        unitData = this._styleUnit,
        startStyle = this._styleStart,
        refreshGuideElement = this._refreshGuideElement.bind(this),
        heightOfHalfHour,
        endStyle,
        result;

    if (!styleFunc || !unitData || !startStyle) {
        return;
    }

    heightOfHalfHour = (unitData[4] / 2);
    endStyle = styleFunc(dragEventData);

    if (endStyle[0] > startStyle[0]) {
        result = this._limitStyleData(
            startStyle[0],
            (endStyle[0] - startStyle[0]) + heightOfHalfHour,
            startStyle[1],
            (endStyle[1] + MIN30)
        );
    } else {
        result = this._limitStyleData(
            endStyle[0],
            (startStyle[0] - endStyle[0]) + heightOfHalfHour,
            endStyle[1],
            (startStyle[1] + MIN30)
        );
        result.push(true);
    }

    reqAnimFrame.requestAnimFrame(function() {
        refreshGuideElement.apply(null, result);
    });
};

TimeCreationGuide.prototype.applyTheme = function(theme) {
    var style = this.guideElement.style;
    var timeStyle = this.guideTimeElement.style;

    // block
    style.backgroundColor = theme.common.creationGuide.backgroundColor;
    style.border = theme.common.creationGuide.border;

    // label
    timeStyle.color = theme.week.creationGuide.color;
    timeStyle.fontSize = theme.week.creationGuide.fontSize;
    timeStyle.fontWeight = theme.week.creationGuide.fontWeight;
};

module.exports = TimeCreationGuide;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/handler/time/move.js":
/*!*************************************!*\
  !*** ./src/js/handler/time/move.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Handling move schedules from drag handler and time grid view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;
var timeCore = __webpack_require__(/*! ./core */ "./src/js/handler/time/core.js");
var TimeMoveGuide = __webpack_require__(/*! ./moveGuide */ "./src/js/handler/time/moveGuide.js");

/**
 * @constructor
 * @implements {Handler}
 * @mixes timeCore
 * @mixes util.CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function TimeMove(dragHandler, timeGridView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {TimeGrid}
     */
    this.timeGridView = timeGridView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {function}
     */
    this._getScheduleDataFunc = null;

    /**
     * @type {object}
     */
    this._dragStart = null;

    /**
     * @type {TimeMoveGuide}
     */
    this._guide = new TimeMoveGuide(this);

    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destroy method.
 */
TimeMove.prototype.destroy = function() {
    this._guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.timeGridView = this.baseController =
        this._getScheduleDataFunc = this._dragStart = this._guide = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {boolean|object} - return object when satiate condition.
 */
TimeMove.prototype.checkExpectCondition = function(target) {
    if (!domutil.closest(target, config.classname('.time-schedule'))) {
        return false;
    }

    return this._getTimeView(target);
};

/**
 * Get Time view container from supplied element.
 * @param {HTMLElement} target - element to find time view container.
 * @returns {object|boolean} - return time view instance when finded.
 */
TimeMove.prototype._getTimeView = function(target) {
    var container = domutil.closest(target, config.classname('.time-date')),
        matches;

    if (!container) {
        return false;
    }

    matches = domutil.getClass(container).match(config.time.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.children.items, Number(matches[1]));
};

/**
 * @emits TimeMove#timeMoveDragstart
 * @param {object} dragStartEventData - Drag#dragStart schedule data.
 */
TimeMove.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, config.classname('.time-date-schedule-block')),
        getScheduleDataFunc,
        scheduleData,
        ctrl = this.baseController,
        targetModelID,
        targetModel;

    if (!timeView || !blockElement) {
        return;
    }

    targetModelID = domutil.getData(blockElement, 'id');
    targetModel = ctrl.schedules.items[targetModelID];

    if (targetModel.isReadOnly) {
        return;
    }

    getScheduleDataFunc = this._getScheduleDataFunc = this._retriveScheduleData(timeView);
    scheduleData = this._dragStart = getScheduleDataFunc(
        dragStartEventData.originEvent, {
            targetModelID: targetModelID,
            model: targetModel
        }
    );

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event TimeMove#timeMoveDragstart
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move schedule.
     * @property {Schedule} model - model instance
     */
    this.fire('timeMoveDragstart', scheduleData);
};

/**
 * @emits TimeMove#timeMoveDrag
 * @param {MouseEvent} dragEventData - mousemove event object
 * @param {string} [overrideEventName] - name of emitting event to override.
 * @param {function} [revise] - supply function for revise schedule data before emit.
 */
TimeMove.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var getScheduleDataFunc = this._getScheduleDataFunc,
        timeView = this._getTimeView(dragEventData.target),
        dragStart = this._dragStart,
        scheduleData;

    if (!timeView || !getScheduleDataFunc || !dragStart) {
        return;
    }

    scheduleData = getScheduleDataFunc(dragEventData.originEvent, {
        currentView: timeView,
        targetModelID: dragStart.targetModelID
    });

    if (revise) {
        revise(scheduleData);
    }

    /**
     * @event TimeMove#timeMoveDrag
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with drag start position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {Time} currentView - time view instance related with current mouse position.
     * @property {string} targetModelID - The model unique id emitted move schedule.
     */
    this.fire(overrideEventName || 'timeMoveDrag', scheduleData);
};

/**
 * Update model instance by dragend event results.
 * @fires TimeMove#beforeUpdateSchedule
 * @param {object} scheduleData - schedule data from TimeMove#timeMoveDragend
 */
TimeMove.prototype._updateSchedule = function(scheduleData) {
    var ctrl = this.baseController,
        modelID = scheduleData.targetModelID,
        range = scheduleData.nearestRange,
        timeDiff = range[1] - range[0],
        dateDiff = 0,
        schedule = ctrl.schedules.items[modelID],
        relatedView = scheduleData.relatedView,
        currentView = scheduleData.currentView,
        newStarts,
        newEnds;

    if (!schedule || !currentView) {
        return;
    }

    timeDiff -= datetime.millisecondsFrom('minutes', 30);
    newStarts = new TZDate(schedule.getStarts().getTime() + timeDiff);
    newEnds = new TZDate(schedule.getEnds().getTime() + timeDiff);

    if (currentView) {
        dateDiff = currentView.getDate() - relatedView.getDate();
    }

    newStarts = new TZDate(newStarts.getTime() + dateDiff);
    newEnds = new TZDate(newEnds.getTime() + dateDiff);

    /**
     * @event TimeMove#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to update
     * @property {Date} start - start time to update
     * @property {Date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        start: newStarts,
        end: newEnds
    });
};

/**
 * @emits TimeMove#timeMoveDragend
 * @param {MouseEvent} dragEndEventData - mouseup mouse event object.
 */
TimeMove.prototype._onDragEnd = function(dragEndEventData) {
    var getScheduleDataFunc = this._getScheduleDataFunc,
        currentView = this._getTimeView(dragEndEventData.target),
        dragStart = this._dragStart,
        scheduleData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getScheduleDataFunc || !dragStart) {
        return;
    }

    scheduleData = getScheduleDataFunc(dragEndEventData.originEvent, {
        currentView: currentView,
        targetModelID: dragStart.targetModelID
    });

    scheduleData.range = [
        dragStart.timeY,
        scheduleData.timeY + datetime.millisecondsFrom('hour', 0.5)
    ];

    scheduleData.nearestRange = [
        dragStart.nearestGridTimeY,
        scheduleData.nearestGridTimeY + datetime.millisecondsFrom('hour', 0.5)
    ];

    this._updateSchedule(scheduleData);

    /**
     * @event TimeMove#timeMoveDragend
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with drag start position.
     * @property {Time} currentView - time view instance related with current mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move schedule.
     * @property {number[]} range - milliseconds range between drag start and end.
     * @property {number[]} nearestRange - milliseconds range related with nearestGridY between start and end.
     */
    this.fire('timeMoveDragend', scheduleData);
};

/**
 * @emits TimeMove#timeMoveClick
 * @param {MouseEvent} clickEventData - click mouse event object.
 */
TimeMove.prototype._onClick = function(clickEventData) {
    var getScheduleDataFunc = this._getScheduleDataFunc,
        dragStart = this._dragStart,
        scheduleData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getScheduleDataFunc || !dragStart) {
        return;
    }

    scheduleData = getScheduleDataFunc(clickEventData.originEvent, {
        targetModelID: dragStart.targetModelID
    });

    /**
     * @event TimeMove#timeMoveClick
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with drag start position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move schedule.
     */
    this.fire('timeMoveClick', scheduleData);
};

timeCore.mixin(TimeMove);
util.CustomEvents.mixin(TimeMove);

module.exports = TimeMove;



/***/ }),

/***/ "./src/js/handler/time/moveGuide.js":
/*!******************************************!*\
  !*** ./src/js/handler/time/moveGuide.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview Module for Time.Move effect while dragging.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var reqAnimFrame = __webpack_require__(/*! ../../common/reqAnimFrame */ "./src/js/common/reqAnimFrame.js");
var ratio = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js").ratio;
var FloatingLayer = __webpack_require__(/*! ../../common/floatingLayer */ "./src/js/common/floatingLayer.js");
var tmpl = __webpack_require__(/*! ../../view/template/week/timeMoveGuide.hbs */ "./src/js/view/template/week/timeMoveGuide.hbs");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;
var Schedule = __webpack_require__(/*! ../../model/schedule */ "./src/js/model/schedule.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js");

var SCHEDULE_MIN_DURATION = datetime.MILLISECONDS_SCHEDULE_MIN_DURATION;

/**
 * Class for Time.Move effect.
 * @constructor
 * @param {TimeMove} timeMove - The instance of TimeMove.
 */
function TimeMoveGuide(timeMove) {
    /**
     * @type {FloatingLayer}
     */
    this._guideLayer = null;

    /**
     * @Type {Schedule}
     */
    this._model = null;

    /**
     * @type {object}
     */
    this._viewModel = null;

    /**
     * @type {object}
     */
    this._lastDrag = null;

    /**
     * @type {HTMLElement}
     */
    this.guideElement = null;

    /**
     * @type {TimeMove}
     */
    this.timeMove = timeMove;

    /**
     * @type {HTMLElement}
     */
    this._container = null;

    /**
     * @type {function}
     */
    this._getTopFunc = null;

    /**
     * @type {number}
     */
    this._startGridY = 0;

    /**
     * @type {number}
     */
    this._startTopPixel = 0;

    timeMove.on({
        'timeMoveDragstart': this._onDragStart,
        'timeMoveDrag': this._onDrag,
        'timeMoveDragend': this._clearGuideElement,
        'timeMoveClick': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
TimeMoveGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.timeMove.off(this);
    if (this._guideLayer) {
        this._guideLayer.destroy();
    }
    this.guideElement = this.timeMove = this._container = this._guideLayer = this._lastDrag =
        this._getTopFunc = this._startGridY = this._startTopPixel = this._viewModel = null;
};

/**
 * Clear guide element.
 */
TimeMoveGuide.prototype._clearGuideElement = function() {
    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('dragging'));
    }
    if (this._guideLayer) {
        this._guideLayer.destroy();
    }

    this._showOriginScheduleBlocks();

    this.guideElement = this._getTopFunc = this._guideLayer = this._model = this._lastDrag =
        this._startGridY = this._startTopPixel = this._viewModel = null;
};

/**
 * Dim element blocks
 * @param {number} modelID - Schedule model instance ID
 */
TimeMoveGuide.prototype._hideOriginScheduleBlocks = function() {
    var className = config.classname('time-date-schedule-block-dragging-dim');
    if (this.guideElement) {
        domutil.addClass(this.guideElement, className);
    }
};

/**
 * Show element blocks
 */
TimeMoveGuide.prototype._showOriginScheduleBlocks = function() {
    var className = config.classname('time-date-schedule-block-dragging-dim');
    if (this.guideElement) {
        domutil.removeClass(this.guideElement, className);
    }
};

/**
 * Refresh guide element
 * @param {string} top - guide element's style top.
 * @param {Schedule} model - updated model
 * @param {object} viewModel - view model
 */
TimeMoveGuide.prototype._refreshGuideElement = function(top, model, viewModel) {
    var self = this;

    reqAnimFrame.requestAnimFrame(function() {
        if (!self._guideLayer) {
            return;
        }
        self._guideLayer.setPosition(0, top);
        self._guideLayer.setContent(tmpl(util.extend({model: model}, viewModel)));
    });
};

/**
 * TimeMove#timeMoveDragstart event handler
 * @param {object} dragStartEventData - dragstart event data
 */
TimeMoveGuide.prototype._onDragStart = function(dragStartEventData) {
    var guideElement = domutil.closest(
        dragStartEventData.target,
        config.classname('.time-date-schedule-block')
    );
    var duration, modelDuration, goingDuration, comingDuration;

    if (!guideElement) {
        return;
    }

    this._startTopPixel = parseFloat(guideElement.style.top);
    this._startGridY = dragStartEventData.nearestGridY;
    this.guideElement = guideElement;
    this._container = dragStartEventData.relatedView.container;

    this._model = util.extend(
        Schedule.create(dragStartEventData.model),
        dragStartEventData.model
    );

    modelDuration = this._model.duration().getTime();
    modelDuration = modelDuration > SCHEDULE_MIN_DURATION ? modelDuration : SCHEDULE_MIN_DURATION;
    goingDuration = datetime.millisecondsFrom('minutes', this._model.goingDuration);
    comingDuration = datetime.millisecondsFrom('minutes', this._model.comingDuration);
    duration = goingDuration + modelDuration + comingDuration;

    this._lastDrag = dragStartEventData;
    this._viewModel = {
        hasGoingDuration: goingDuration > 0,
        hasComingDuration: comingDuration > 0,
        goingDurationHeight: common.ratio(duration, goingDuration, 100),
        modelDurationHeight: common.ratio(duration, modelDuration, 100),
        comingDurationHeight: common.ratio(duration, comingDuration, 100)
    };

    this._resetGuideLayer();
    this._hideOriginScheduleBlocks();
};

/**
 * TimeMove#timeMoveDrag event handler
 * @param {object} dragEventData - drag event data
 */
TimeMoveGuide.prototype._onDrag = function(dragEventData) {
    var timeView = dragEventData.currentView,
        viewOptions = timeView.options,
        viewHeight = timeView.getViewBound().height,
        guideHeight = parseFloat(this.guideElement.style.height),
        hourLength = viewOptions.hourEnd - viewOptions.hourStart,
        gridYOffset = dragEventData.nearestGridY - this._startGridY,
        gridYOffsetPixel = ratio(hourLength, viewHeight, gridYOffset),
        timeDiff = dragEventData.nearestGridTimeY - this._lastDrag.nearestGridTimeY,
        bottomLimit,
        top;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('dragging'));
    }

    if (this._container !== timeView.container) {
        this._container = timeView.container;
        this._resetGuideLayer();
    }

    top = this._startTopPixel + gridYOffsetPixel;
    bottomLimit = viewHeight - guideHeight;

    top = Math.max(top, 0);
    top = Math.min(top, bottomLimit);

    // update time
    this._model.start = new TZDate(this._model.getStarts().getTime() + timeDiff);
    this._model.end = new TZDate(this._model.getEnds().getTime() + timeDiff);
    this._lastDrag = dragEventData;

    this._refreshGuideElement(top, this._model, this._viewModel);
};

TimeMoveGuide.prototype._resetGuideLayer = function() {
    if (this._guideLayer) {
        this._guideLayer.destroy();
        this._guideLayer = null;
    }
    this._guideLayer = new FloatingLayer(null, this._container);
    this._guideLayer.setSize(this._container.getBoundingClientRect().width, this.guideElement.style.height);
    this._guideLayer.setPosition(0, this.guideElement.style.top);
    this._guideLayer.setContent(tmpl(util.extend({model: this._model}, this._viewModel)));
    this._guideLayer.show();
};

module.exports = TimeMoveGuide;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/handler/time/resize.js":
/*!***************************************!*\
  !*** ./src/js/handler/time/resize.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Handling resize schedules from drag handler and time grid view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;
var timeCore = __webpack_require__(/*! ./core */ "./src/js/handler/time/core.js");
var TimeResizeGuide = __webpack_require__(/*! ./resizeGuide */ "./src/js/handler/time/resizeGuide.js");

/**
 * @constructor
 * @implements {Handler}
 * @mixes timeCore
 * @mixes util.CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function TimeResize(dragHandler, timeGridView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {TimeGrid}
     */
    this.timeGridView = timeGridView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {function}
     */
    this._getScheduleDataFunc = null;

    /**
     * @type {object}
     */
    this._dragStart = null;

    /**
     * @type {TimeResizeGuide}
     */
    this._guide = new TimeResizeGuide(this);

    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destroy method
 */
TimeResize.prototype.destroy = function() {
    this._guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.timeGridView = this.baseController =
        this._getScheduleDataFunc = this._dragStart = this._guide = null;
};

/**
 * @param {HTMLElement} target - element to check condition.
 * @returns {object|boolean} - return time view instance or false
 */
TimeResize.prototype.checkExpectCondition = function(target) {
    var container,
        matches;

    if (!domutil.hasClass(target, config.classname('time-resize-handle'))) {
        return false;
    }

    container = domutil.closest(target, config.classname('.time-date'));

    if (!container) {
        return false;
    }

    matches = domutil.getClass(container).match(config.time.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.children.items, Number(matches[1]));
};

/**
 * @emits TimeResize#timeResizeDragstart
 * @param {object} dragStartEventData - event data of Drag#dragstart
 */
TimeResize.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, config.classname('.time-date-schedule-block')),
        ctrl = this.baseController,
        targetModelID,
        getScheduleDataFunc,
        scheduleData;

    if (!timeView || !blockElement) {
        return;
    }

    targetModelID = domutil.getData(blockElement, 'id');
    getScheduleDataFunc = this._getScheduleDataFunc = this._retriveScheduleData(timeView);
    scheduleData = this._dragStart = getScheduleDataFunc(
        dragStartEventData.originEvent, {
            targetModelID: targetModelID,
            schedule: ctrl.schedules.items[targetModelID]
        }
    );

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event TimeResize#timeResizeDragstart
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move schedule.
     * @property {Schedule} schedule - schedule data
     */
    this.fire('timeResizeDragstart', scheduleData);
};

/**
 * Drag#drag event handler
 * @emits TimeResize#timeResizeDrag
 * @param {object} dragEventData - event data of Drag#drag custom event.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise schedule data before emit.
 */
TimeResize.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var getScheduleDataFunc = this._getScheduleDataFunc,
        startScheduleData = this._dragStart,
        scheduleData;

    if (!getScheduleDataFunc || !startScheduleData) {
        return;
    }

    scheduleData = getScheduleDataFunc(dragEventData.originEvent, {
        targetModelID: startScheduleData.targetModelID
    });

    if (revise) {
        revise(scheduleData);
    }

    /**
     * @event TimeResize#timeResizeDrag
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with drag start position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move schedule.
     */
    this.fire(overrideEventName || 'timeResizeDrag', scheduleData);
};

/**
 * Update model instance by dragend event results.
 * @fires TimeResize#beforeUpdateSchedule
 * @param {object} scheduleData - schedule data from TimeResize#timeResizeDragend
 */
TimeResize.prototype._updateSchedule = function(scheduleData) {
    var ctrl = this.baseController,
        modelID = scheduleData.targetModelID,
        range = scheduleData.nearestRange,
        timeDiff = range[1] - range[0],
        schedule = ctrl.schedules.items[modelID],
        relatedView = scheduleData.relatedView,
        dateEnd,
        newEnds,
        baseDate;

    if (!schedule) {
        return;
    }

    timeDiff -= datetime.millisecondsFrom('minutes', 30);

    baseDate = new TZDate(relatedView.getDate());
    dateEnd = datetime.end(baseDate);
    newEnds = new TZDate(schedule.getEnds().getTime() + timeDiff);

    if (newEnds > dateEnd) {
        newEnds = new TZDate(dateEnd.getTime());
    }

    if (newEnds.getTime() - schedule.getStarts().getTime() < datetime.millisecondsFrom('minutes', 30)) {
        newEnds = new TZDate(schedule.getStarts().getTime() + datetime.millisecondsFrom('minutes', 30));
    }

    /**
     * @event TimeResize#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to update
     * @property {Date} start - start time to update
     * @property {Date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        start: schedule.getStarts(),
        end: newEnds
    });
};

/**
 * Drag#dragEnd event handler
 * @emits TimeResize#timeResizeDragend
 * @param {MouseEvent} dragEndEventData - Mouse event of Drag#dragEnd custom event.
 */
TimeResize.prototype._onDragEnd = function(dragEndEventData) {
    var getScheduleDataFunc = this._getScheduleDataFunc,
        dragStart = this._dragStart,
        scheduleData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getScheduleDataFunc || !dragStart) {
        return;
    }

    scheduleData = getScheduleDataFunc(dragEndEventData.originEvent, {
        targetModelID: dragStart.targetModelID
    });

    scheduleData.range = [
        dragStart.timeY,
        scheduleData.timeY + datetime.millisecondsFrom('hour', 0.5)
    ];

    scheduleData.nearestRange = [
        dragStart.nearestGridTimeY,
        scheduleData.nearestGridTimeY + datetime.millisecondsFrom('hour', 0.5)
    ];

    this._updateSchedule(scheduleData);

    /**
     * @event TimeResize#timeResizeDragend
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with drag start position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move schedule.
     * @property {number[]} range - milliseconds range between drag start and end.
     * @property {number[]} nearestRange - milliseconds range related with nearestGridY between start and end.
     */
    this.fire('timeResizeDragend', scheduleData);

    this._getScheduleDataFunc = this._dragStart = null;
};

/**
 * @emits TimeResize#timeResizeClick
 */
TimeResize.prototype._onClick = function() {
    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event TimeResize#timeResizeClick
     */
    this.fire('timeResizeClick');
};

timeCore.mixin(TimeResize);
util.CustomEvents.mixin(TimeResize);

module.exports = TimeResize;



/***/ }),

/***/ "./src/js/handler/time/resizeGuide.js":
/*!********************************************!*\
  !*** ./src/js/handler/time/resizeGuide.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * @fileoverview Module for Time.Resize effect while dragging.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var reqAnimFrame = __webpack_require__(/*! ../../common/reqAnimFrame */ "./src/js/common/reqAnimFrame.js");
var ratio = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js").ratio;
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");

/**
 * Class for Time.Resize effect.
 * @constructor
 * @param {TimeResize} timeResize - the instance of TimeResize handler.
 */
function TimeResizeGuide(timeResize) {
    /**
     * @type {HTMLElement}
     */
    this.guideElement = null;

    /**
     * @type {TimeResize}
     */
    this.timeResize = timeResize;

    /**
     * @type {function}
     */
    this._getTopFunc = null;

    /**
     * @type {HTMLElement}
     */
    this._originScheduleElement = null;

    /**
     * @type {number}
     */
    this._startTopPixel = 0;

    /**
     * @type {number}
     */
    this._startHeightPixel = 0;

    /**
     * @type {number}
     */
    this._startGridY = 0;

    /**
     * @type {Schedule}
     */
    this._schedule = null;

    timeResize.on({
        'timeResizeDragstart': this._onDragStart,
        'timeResizeDrag': this._onDrag,
        'timeResizeDragend': this._clearGuideElement,
        'timeResizeClick': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
TimeResizeGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.timeResize.off(this);
    this.guideElement = this.timeResize = this._getTopFunc =
        this._originScheduleElement = this._startHeightPixel =
        this._startGridY = this._startTopPixel = null;
};

/**
 * Clear guide element.
 */
TimeResizeGuide.prototype._clearGuideElement = function() {
    var guideElement = this.guideElement,
        originElement = this._originScheduleElement;

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('resizing'));
    }

    if (originElement) {
        originElement.style.display = 'block';
    }

    domutil.remove(guideElement);

    this.guideElement = this._getTopFunc = this._originScheduleElement =
        this._startHeightPixel = this._startGridY = this._startTopPixel = null;
};

/**
 * Refresh guide element
 * @param {number} guideHeight - guide element's style height.
 * @param {number} minTimeHeight - time element's min height
 * @param {number} timeHeight - time element's height.
 */
TimeResizeGuide.prototype._refreshGuideElement = function(guideHeight, minTimeHeight, timeHeight) {
    var guideElement = this.guideElement;
    var timeElement;

    if (!guideElement) {
        return;
    }

    timeElement = domutil.find(config.classname('.time-schedule-content-time'), guideElement);

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.height = guideHeight + 'px';
        guideElement.style.display = 'block';

        if (timeElement) {
            timeElement.style.height = timeHeight + 'px';
            timeElement.style.minHeight = minTimeHeight + 'px';
        }
    });
};

/**
 * TimeMove#timeMoveDragstart event handler
 * @param {object} dragStartEventData - dragstart event data
 */
TimeResizeGuide.prototype._onDragStart = function(dragStartEventData) {
    var originElement = domutil.closest(
            dragStartEventData.target,
            config.classname('.time-date-schedule-block')
        ),
        schedule = dragStartEventData.schedule,
        guideElement;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('resizing'));
    }

    if (!originElement || !schedule) {
        return;
    }

    this._startGridY = dragStartEventData.nearestGridY;
    this._startHeightPixel = parseFloat(originElement.style.height);
    this._startTopPixel = parseFloat(originElement.style.top);

    this._originScheduleElement = originElement;
    this._schedule = schedule;

    guideElement = this.guideElement = originElement.cloneNode(true);
    domutil.addClass(guideElement, config.classname('time-guide-resize'));

    originElement.style.display = 'none';
    dragStartEventData.relatedView.container.appendChild(guideElement);
};

/**
 * @param {object} dragEventData - event data from Drag#drag.
 */
TimeResizeGuide.prototype._onDrag = function(dragEventData) {
    var timeView = dragEventData.relatedView,
        viewOptions = timeView.options,
        viewHeight = timeView.getViewBound().height,
        hourLength = viewOptions.hourEnd - viewOptions.hourStart,
        guideElement = this.guideElement,
        guideTop = parseFloat(guideElement.style.top),
        gridYOffset = dragEventData.nearestGridY - this._startGridY,
        // hourLength : viewHeight = gridYOffset : X;
        gridYOffsetPixel = ratio(hourLength, viewHeight, gridYOffset),
        goingDuration = this._schedule.goingDuration,
        modelDuration = this._schedule.duration().getTime() / datetime.MILLISECONDS_PER_MINUTES,
        comingDuration = this._schedule.comingDuration,
        minutesLength = hourLength * 60,
        timeHeight,
        timeMinHeight,
        minHeight,
        maxHeight,
        height;

    height = (this._startHeightPixel + gridYOffsetPixel);
    // at least large than 30min from schedule start time.
    minHeight = guideTop + ratio(hourLength, viewHeight, 0.5);
    minHeight -= this._startTopPixel;
    timeMinHeight = minHeight;
    minHeight += ratio(minutesLength, viewHeight, goingDuration) + ratio(minutesLength, viewHeight, comingDuration);
    // smaller than 24h
    maxHeight = viewHeight - guideTop;

    height = Math.max(height, minHeight);
    height = Math.min(height, maxHeight);

    timeHeight = ratio(minutesLength, viewHeight, modelDuration) + gridYOffsetPixel;

    this._refreshGuideElement(height, timeMinHeight, timeHeight);
};

module.exports = TimeResizeGuide;


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/js/model/schedule.js":
/*!**********************************!*\
  !*** ./src/js/model/schedule.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint complexity: 0 */
/**
 * @fileoverview Model of schedule.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var TZDate = __webpack_require__(/*! ../common/timezone */ "./src/js/common/timezone.js").Date;
var datetime = __webpack_require__(/*! ../common/datetime */ "./src/js/common/datetime.js");
var dirty = __webpack_require__(/*! ../common/dirty */ "./src/js/common/dirty.js");
var model = __webpack_require__(/*! ../common/model */ "./src/js/common/model.js");

var SCHEDULE_MIN_DURATION = datetime.MILLISECONDS_SCHEDULE_MIN_DURATION;

/**
 * Schedule category
 * @readonly
 * @enum {string}
 */
var SCHEDULE_CATEGORY = {
    /** milestone */
    MILESTONE: 'milestone',

    /** task */
    TASK: 'task',

    /** all-day schedule */
    ALLDAY: 'allday',

    /** normal schedule */
    TIME: 'time'
};

/**
 * The model of calendar schedules.
 * @constructor
 * @mixes dirty
 * @mixes model
 */
function Schedule() {
    /**
     * `Optional` unique id for various use.
     * @type {string}
     */
    this.id = '';

    /**
     * title for schedule.
     * @type {string}
     */
    this.title = '';

    /**
     * is schedule is all day schedule?
     * @type {boolean}
     */
    this.isAllDay = false;

    /**
     * schedule start
     * @type {TZDate}
     */
    this.start = null;

    /**
     * schedule end
     * @type {TZDate}
     */
    this.end = null;

    /**
     * schedule text color
     * @type {string}
     */
    this.color = '#000';

    /**
     * schedule block visibility
     * @type {boolean}
     */
    this.isVisible = true;

    /**
     * schedule background color
     * @type {string}
     */
    this.bgColor = '#a1b56c';

    /**
     * schedule background color when dragging it
     * @type {string}
     */
    this.dragBgColor = '#a1b56c';

    /**
     * schedule left border color
     * @type {string}
     */
    this.borderColor = '#000';

    /**
     * calendar ID
     * @type {string}
     */
    this.calendarId = '';

    /**
     * Schedule category(milestone, task, allday, time)
     * @type {string}
     */
    this.category = '';

    /**
     * Classification of work schedules (before work, before lunch, before work)
     * @type {string}
     */
    this.dueDateClass = '';

    /**
     * Custom style for schedule element
     * @type {string}
     */
    this.customStyle = '';

    /**
     * in progress flag to do something
     * @type {boolean}
     */
    this.isPending = false;

    /**
     * focused schedule flag
     * @type {boolean}
     */
    this.isFocused = false;

    /**
     * read-only schedule flag
     * @type {boolean}
     */
    this.isReadOnly = false;

    /**
     * private schedule
     * @type {boolean}
     */
    this.isPrivate = false;

    /**
     * location
     * @type {string}
     */
    this.location = '';

    /**
     * attendees
     * @type {Array.<string>}
     */
    this.attendees = [];

    /**
     * recurrence rule
     * @type {any}
     */
    this.recurrenceRule = '';

    /**
     * state. 'Busy' is default.
     * @type {string}
     */
    this.state = '';

    /**
     * travelTime: going-Duration minutes
     * @type {number}
     */
    this.goingDuration = 0;

    /**
     * travelTime: coming-Duration minutes
     * @type {number}
     */
    this.comingDuration = 0;

    /**
     * Separate data storage space independent of rendering.
     * @type {object}
     */
    this.raw = null;

    // initialize model id
    util.stamp(this);
}

/**********
 * static props
 **********/

Schedule.schema = {
    required: ['title'],
    dateRange: ['start', 'end']
};

/**
 * create schedule model from json(object) data.
 * @param {object} data object for model.
 * @returns {Schedule} Schedule model instance.
 */
Schedule.create = function(data) {
    var inst = new Schedule();
    inst.init(data);

    return inst;
};

/**********
 * prototype props
 **********/

/**
 * Initialize schedule instance.
 * @param {object} options options.
 */
Schedule.prototype.init = function(options) {
    options = util.extend({}, options);
    if (options.category === SCHEDULE_CATEGORY.ALLDAY) {
        options.isAllDay = true;
    }

    this.id = options.id || '';
    this.title = options.title || '';
    this.isAllDay = util.isExisty(options.isAllDay) ? options.isAllDay : false;
    this.isVisible = util.isExisty(options.isVisible) ? options.isVisible : true;

    this.color = options.color || this.color;
    this.bgColor = options.bgColor || this.bgColor;
    this.dragBgColor = options.dragBgColor || this.dragBgColor;
    this.borderColor = options.borderColor || this.borderColor;
    this.calendarId = options.calendarId || '';
    this.category = options.category || '';
    this.dueDateClass = options.dueDateClass || '';
    this.customStyle = options.customStyle || '';
    this.location = options.location || '';
    this.attendees = options.attendees || [];
    this.recurrenceRule = options.recurrenceRule || '';
    this.isPrivate = options.isPrivate || false;
    this.isPending = options.isPending || false;
    this.isFocused = options.isFocused || false;
    this.isReadOnly = options.isReadOnly || false;
    this.goingDuration = options.goingDuration || 0;
    this.comingDuration = options.comingDuration || 0;
    this.state = options.state || '';

    if (this.isAllDay) {
        this.setAllDayPeriod(options.start, options.end);
    } else {
        this.setTimePeriod(options.start, options.end);
    }

    if (options.category === SCHEDULE_CATEGORY.MILESTONE ||
        options.category === SCHEDULE_CATEGORY.TASK) {
        this.start = new TZDate(this.end);
    }

    this.raw = options.raw || null;
};

Schedule.prototype.setAllDayPeriod = function(start, end) {
    // If it is an all-day schedule, only the date information of the string is used.
    if (util.isString(start)) {
        start = datetime.parse(start.substring(0, 10));
    }
    if (util.isString(end)) {
        end = datetime.parse(end.substring(0, 10));
    }

    this.start = start;
    this.start.setHours(0, 0, 0);
    this.end = end || new TZDate(this.start);
    this.end.setHours(23, 59, 59);
};

Schedule.prototype.setTimePeriod = function(start, end) {
    this.start = new TZDate(start || Date.now());
    this.end = new TZDate(end || this.start);

    if (!end) {
        this.end.setMinutes(this.end.getMinutes() + 30);
    }
};

/**
 * @returns {Date} render start date.
 */
Schedule.prototype.getStarts = function() {
    return this.start;
};

/**
 * @returns {Date} render end date.
 */
Schedule.prototype.getEnds = function() {
    return this.end;
};

/**
 * @returns {number} instance unique id.
 */
Schedule.prototype.cid = function() {
    return util.stamp(this);
};

/**
 * Check two schedule are equals (means title, isAllDay, start, end are same)
 * @param {Schedule} schedule Schedule model instance to compare.
 * @returns {boolean} Return false when not same.
 */
Schedule.prototype.equals = function(schedule) {
    if (this.id !== schedule.id) {
        return false;
    }

    if (this.title !== schedule.title) {
        return false;
    }

    if (this.isAllDay !== schedule.isAllDay) {
        return false;
    }

    if (datetime.compare(this.getStarts(), schedule.getStarts()) !== 0) {
        return false;
    }

    if (datetime.compare(this.getEnds(), schedule.getEnds()) !== 0) {
        return false;
    }

    if (this.color !== schedule.color) {
        return false;
    }

    if (this.bgColor !== schedule.bgColor) {
        return false;
    }

    if (this.dragBgColor !== schedule.dragBgColor) {
        return false;
    }

    if (this.borderColor !== schedule.borderColor) {
        return false;
    }

    return true;
};

/**
 * return duration between start and end.
 * @returns {Date} duration (UTC)
 */
Schedule.prototype.duration = function() {
    var start = this.getStarts(),
        end = this.getEnds(),
        duration;

    if (this.isAllDay) {
        duration = new TZDate(datetime.end(end) - datetime.start(start));
    } else {
        duration = new TZDate(end - start);
    }

    return duration;
};

/**
 * Returns true if the given Schedule coincides with the same time as the
 * calling Schedule.
 * @param {Schedule} schedule The other schedule to compare with this Schedule.
 * @returns {boolean} If the other schedule occurs within the same time as the first object.
 */
Schedule.prototype.collidesWith = function(schedule) {
    var ownStarts = this.getStarts(),
        ownEnds = this.getEnds(),
        start = schedule.getStarts(),
        end = schedule.getEnds();
    var ownGoingDuration = datetime.millisecondsFrom('minutes', this.goingDuration),
        ownComingDuration = datetime.millisecondsFrom('minutes', this.comingDuration),
        goingDuration = datetime.millisecondsFrom('minutes', schedule.goingDuration),
        comingDuration = datetime.millisecondsFrom('minutes', schedule.comingDuration);

    if (Math.abs(ownEnds - ownStarts) < SCHEDULE_MIN_DURATION) {
        ownEnds += SCHEDULE_MIN_DURATION;
    }

    if (Math.abs(end - start) < SCHEDULE_MIN_DURATION) {
        end += SCHEDULE_MIN_DURATION;
    }

    ownStarts -= ownGoingDuration;
    ownEnds += ownComingDuration;
    start -= goingDuration;
    end += comingDuration;

    if ((start > ownStarts && start < ownEnds) ||
        (end > ownStarts && end < ownEnds) ||
        (start <= ownStarts && end >= ownEnds)) {
        return true;
    }

    return false;
};

model.mixin(Schedule.prototype);
dirty.mixin(Schedule.prototype);

module.exports = Schedule;


/***/ }),

/***/ "./src/js/model/viewModel/scheduleViewModel.js":
/*!*****************************************************!*\
  !*** ./src/js/model/viewModel/scheduleViewModel.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Model for views
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");

var SCHEDULE_MIN_DURATION = datetime.MILLISECONDS_SCHEDULE_MIN_DURATION;

/**
 * Schedule ViewModel
 * @constructor
 * @param {Schedule} schedule Schedule instance.
 */
function ScheduleViewModel(schedule) {
    /**
     * The model of schedule.
     * @type {Schedule}
     */
    this.model = schedule;

    /**
     * @type {number}
     */
    this.top = 0;

    /**
     * @type {number}
     */
    this.left = 0;

    /**
     * @type {number}
     */
    this.width = 0;

    /**
     * @type {number}
     */
    this.height = 0;

    /**
     * Represent schedule has collide with other schedules when rendering.
     * @type {boolean}
     */
    this.hasCollide = false;

    /**
     * Extra space at rigth side of this schedule.
     * @type {number}
     */
    this.extraSpace = 0;

    /**
     * represent this schedule block is not visible after rendered.
     *
     * in month view, some viewmodel in date need to hide when already rendered before dates.
     *
     * set true then it just shows empty space.
     * @type {boolean}
     */
    this.hidden = false;

    /**
     * whether the schedule includes multiple dates
     */
    this.hasMultiDates = false;

    /**
     * represent render start date used at rendering.
     *
     * if set null then use model's 'start' property.
     * @type {TZDate}
     */
    this.renderStarts = null;

    /**
     * whether the actual start-date is before the render-start-date
     * @type {boolean}
     */
    this.exceedLeft = false;

    /**
     * represent render end date used at rendering.
     *
     * if set null then use model's 'end' property.
     * @type {TZDate}
     */
    this.renderEnds = null;

    /**
     * whether the actual end-date is after the render-end-date
     * @type {boolean}
     */
    this.exceedRight = false;
}

/**********
 * static props
 **********/

/**
 * ScheduleViewModel factory method.
 * @param {Schedule} schedule Schedule instance.
 * @returns {ScheduleViewModel} ScheduleViewModel instance.
 */
ScheduleViewModel.create = function(schedule) {
    return new ScheduleViewModel(schedule);
};

/**********
 * prototype props
 **********/

/**
 * return renderStarts property to render properly when specific schedule that exceed rendering date range.
 *
 * if renderStarts is not set. return model's start property.
 * @override
 * @returns {Date} render start date.
 */
ScheduleViewModel.prototype.getStarts = function() {
    if (this.renderStarts) {
        return this.renderStarts;
    }

    return this.model.start;
};

/**
 * return renderStarts property to render properly when specific schedule that exceed rendering date range.
 *
 * if renderEnds is not set. return model's end property.
 * @override
 * @returns {Date} render end date.
 */
ScheduleViewModel.prototype.getEnds = function() {
    if (this.renderEnds) {
        return this.renderEnds;
    }

    return this.model.end;
};

/**
 * @returns {number} unique number for model.
 */
ScheduleViewModel.prototype.cid = function() {
    return util.stamp(this.model);
};

/**
 * Shadowing valueOf method for schedule sorting.
 * @returns {Schedule} The model of schedule.
 */
ScheduleViewModel.prototype.valueOf = function() {
    return this.model;
};

/**
 * Link duration method
 * @returns {number} Schedule#duration result.
 */
ScheduleViewModel.prototype.duration = function() {
    return this.model.duration();
};

/**
 * Link collidesWith method
 * @param {Schedule|ScheduleViewModel} viewModel - Model or viewmodel instance of Schedule.
 * @returns {boolean} Schedule#collidesWith result.
 */
ScheduleViewModel.prototype.collidesWith = function(viewModel) {
    var ownStarts = this.getStarts(),
        ownEnds = this.getEnds(),
        start = viewModel.getStarts(),
        end = viewModel.getEnds();
    var ownGoingDuration = datetime.millisecondsFrom('minutes', this.valueOf().goingDuration),
        ownComingDuration = datetime.millisecondsFrom('minutes', this.valueOf().comingDuration),
        goingDuration = datetime.millisecondsFrom('minutes', viewModel.valueOf().goingDuration),
        comingDuration = datetime.millisecondsFrom('minutes', viewModel.valueOf().comingDuration);

    if (Math.abs(ownEnds - ownStarts) < SCHEDULE_MIN_DURATION) {
        ownEnds += SCHEDULE_MIN_DURATION;
    }

    if (Math.abs(end - start) < SCHEDULE_MIN_DURATION) {
        end += SCHEDULE_MIN_DURATION;
    }

    ownStarts -= ownGoingDuration;
    ownEnds += ownComingDuration;
    start -= goingDuration;
    end += comingDuration;

    if ((start > ownStarts && start < ownEnds) ||
        (end > ownStarts && end < ownEnds) ||
        (start <= ownStarts && end >= ownEnds)) {
        return true;
    }

    return false;
};

module.exports = ScheduleViewModel;



/***/ }),

/***/ "./src/js/theme/standard.js":
/*!**********************************!*\
  !*** ./src/js/theme/standard.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview The standard theme
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


/**
 * "common" prefix is for entire calendar. "common" properties can be overriden by "week", "month".
 * "week" prefix is for weekly and daily view.
 * "month" prefix is for monthly view.
 */
var theme = {
    'common.border': '1px solid #e5e5e5',
    'common.backgroundColor': 'white',
    'common.holiday.color': '#ff4040',
    'common.saturday.color': '#333',
    'common.dayname.color': '#333',
    'common.today.color': '#333',

    // creation guide style
    'common.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'common.creationGuide.border': '1px solid #515ce6',

    // month header 'dayname'
    'month.dayname.height': '31px',
    'month.dayname.borderLeft': 'none',
    'month.dayname.paddingLeft': '10px',
    'month.dayname.paddingRight': '0',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontSize': '12px',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',

    // month day grid cell 'day'
    'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
    'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
    'month.weekend.backgroundColor': 'none',
    'month.day.fontSize': '14px',

    // month schedule style
    'month.schedule.borderRadius': '2px',
    'month.schedule.height': '24px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '8px',
    'month.schedule.marginRight': '8px',

    // month more view
    'month.moreView.border': '1px solid #d5d5d5',
    'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
    'month.moreView.backgroundColor': 'white',
    'month.moreView.paddingBottom': '17px',
    'month.moreViewTitle.height': '44px',
    'month.moreViewTitle.marginBottom': '12px',
    'month.moreViewTitle.borderBottom': 'none',
    'month.moreViewTitle.padding': '12px 17px 0 17px',
    'month.moreViewList.padding': '0 17px',

    // week header 'dayname'
    'week.dayname.height': '42px',
    'week.dayname.borderTop': '1px solid #e5e5e5',
    'week.dayname.borderBottom': '1px solid #e5e5e5',
    'week.dayname.borderLeft': 'none',
    'week.dayname.paddingLeft': '0',
    'week.dayname.backgroundColor': 'inherit',
    'week.dayname.textAlign': 'left',
    'week.today.color': 'inherit',
    'week.pastDay.color': '#bbb',

    // week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #e5e5e5',
    'week.vpanelSplitter.height': '3px',

    // week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #e5e5e5',
    'week.daygrid.backgroundColor': 'inherit',

    'week.daygridLeft.width': '72px',
    'week.daygridLeft.backgroundColor': 'inherit',
    'week.daygridLeft.paddingRight': '8px',
    'week.daygridLeft.borderRight': '1px solid #e5e5e5',

    'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'week.weekend.backgroundColor': 'inherit',

    // week timegrid 'timegrid'
    'week.timegridLeft.width': '72px',
    'week.timegridLeft.backgroundColor': 'inherit',
    'week.timegridLeft.borderRight': '1px solid #e5e5e5',
    'week.timegridLeft.fontSize': '11px',

    'week.timegridOneHour.height': '52px',
    'week.timegridHalfHour.height': '26px',
    'week.timegridHalfHour.borderBottom': 'none',
    'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

    'week.timegrid.paddingRight': '8px',
    'week.timegrid.borderRight': '1px solid #e5e5e5',
    'week.timegridSchedule.borderRadius': '2px',
    'week.timegridSchedule.paddingLeft': '2px',

    'week.currentTime.color': '#515ce6',
    'week.currentTime.fontSize': '11px',
    'week.currentTime.fontWeight': 'normal',

    'week.currentTimeLinePast.border': '1px dashed #515ce6',
    'week.currentTimeLineBullet.backgroundColor': '#515ce6',
    'week.currentTimeLineToday.border': '1px solid #515ce6',
    'week.currentTimeLineFuture.border': 'none',

    // week creation guide style
    'week.creationGuide.color': '#515ce6',
    'week.creationGuide.fontSize': '11px',
    'week.creationGuide.fontWeight': 'bold',

    // week daygrid schedule style
    'week.dayGridSchedule.borderRadius': '2px',
    'week.dayGridSchedule.height': '24px',
    'week.dayGridSchedule.marginTop': '2px',
    'week.dayGridSchedule.marginLeft': '8px',
    'week.dayGridSchedule.marginRight': '8px'
};

module.exports = theme;


/***/ }),

/***/ "./src/js/theme/theme.js":
/*!*******************************!*\
  !*** ./src/js/theme/theme.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview The all configuration of a theme
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var themeStandard = __webpack_require__(/*! ./standard */ "./src/js/theme/standard.js");
var themeConfig = __webpack_require__(/*! ./themeConfig */ "./src/js/theme/themeConfig.js");
var common = __webpack_require__(/*! ../common/common */ "./src/js/common/common.js");

/**
 * Theme manager
 * @param {object} customTheme - custom theme
 */
function Theme(customTheme) {
    var theme = customTheme || themeStandard;

    /**
     * @type {util.HashMap}
     */
    this._map = new util.HashMap();

    this.setStyles(theme);
}

/**
 * Get a style with key
 * @param {string} key - key for getting a style
 * @returns {string|undefined} style  
 */
Theme.prototype.getStyle = function(key) {
    return this._map.get(key);
};

/**
 * Set a style
 * @param {string} key - key for setting a style
 * @param {string} style - style value
 * @returns {boolean} true if the give key is valid or false
 */
Theme.prototype.setStyle = function(key, style) {
    var styles = {};
    styles[key] = style;

    return this.setStyles(styles).length === 0;
};

/**
 * Set styles
 * @param {object} styles - multiple styles map
 * @returns {Array.<string>} error keys
 */
Theme.prototype.setStyles = function(styles) {
    var errors = [];

    util.forEach(styles, function(style, key) {
        if (util.isUndefined(themeConfig[key])) {
            errors.push(key);
        } else {
            this._map.set(key, style);
            common.set(this, key, style);
        }
    }, this);

    // apply missing styles which have to be default
    util.forEach(themeConfig, function(style, key) {
        if (!this.getStyle(key)) {
            this._map.set(key, style);
            common.set(this, key, style);
        }
    }, this);

    return errors;
};

/**
 * Delete all styles
 */
Theme.prototype.clear = function() {
    var keys = this._map.keys();
    var categories = {};
    util.forEach(keys, function(key) {
        var category = key.split('.')[0];
        if (!categories[category]) {
            categories[category] = category;
        }
    });

    util.forEach(categories, function(child) {
        delete this[child];
    }, this);

    this._map.removeAll();
};

module.exports = Theme;


/***/ }),

/***/ "./src/js/theme/themeConfig.js":
/*!*************************************!*\
  !*** ./src/js/theme/themeConfig.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview The all configuration of a theme
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


/**
 * Full configuration for theme.
 * "common" prefix is for entire calendar. "common" properties can be overriden by "week", "month".
 * "week" prefix is for weekly and daily view.
 * "month" prefix is for monthly view.
 * @typedef {object} themeConfig
 * @example
 // default keys and styles
 var themeConfig = {
    'common.border': '1px solid #e5e5e5',
    'common.backgroundColor': 'white',
    'common.holiday.color': '#ff4040',
    'common.saturday.color': '#135de6',
    'common.dayname.color': '#333',
    'common.today.color': '#135de6',

    // creation guide style
    'common.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'common.creationGuide.border': '1px solid #515ce6',

    // month header 'dayname'
    'month.dayname.height': '31px',
    'month.dayname.borderLeft': '1px solid #e5e5e5',
    'month.dayname.paddingLeft': '10px',
    'month.dayname.paddingRight': '10px',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontSize': '12px',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',

    // month day grid cell 'day'
    'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
    'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
    'month.weekend.backgroundColor': 'inherit',
    'month.day.fontSize': '14px',

    // month schedule style
    'month.schedule.borderRadius': '2px',
    'month.schedule.height': '24px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '8px',
    'month.schedule.marginRight': '8px',

    // month more view
    'month.moreView.border': '1px solid #d5d5d5',
    'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
    'month.moreView.backgroundColor': 'white',
    'month.moreView.paddingBottom': '17px',
    'month.moreViewTitle.height': '44px',
    'month.moreViewTitle.marginBottom': '12px',
    'month.moreViewTitle.backgroundColor': 'white',
    'month.moreViewTitle.borderBottom': 'none',
    'month.moreViewTitle.padding': '12px 17px 0 17px',
    'month.moreViewList.padding': '0 17px 17px 17px',

    // week header 'dayname'
    'week.dayname.height': '42px',
    'week.dayname.borderTop': '1px solid #e5e5e5',
    'week.dayname.borderBottom': '1px solid #e5e5e5',
    'week.dayname.borderLeft': 'inherit',
    'week.dayname.paddingLeft': '0',
    'week.dayname.backgroundColor': 'inherit',
    'week.dayname.textAlign': 'left',
    'week.today.color': '#333',

    // week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #e5e5e5',
    'week.vpanelSplitter.height': '3px',

    // week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #e5e5e5',
    'week.daygrid.backgroundColor': 'inherit',

    'week.daygridLeft.width': '72px',
    'week.daygridLeft.backgroundColor': 'inherit',
    'week.daygridLeft.paddingRight': '8px',
    'week.daygridLeft.borderRight': '1px solid #e5e5e5',

    'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'week.weekend.backgroundColor': 'inherit',

    // week timegrid 'timegrid'
    'week.timegridLeft.width': '72px',
    'week.timegridLeft.backgroundColor': 'inherit',
    'week.timegridLeft.borderRight': '1px solid #e5e5e5',
    'week.timegridLeft.fontSize': '11px',
    'week.timegridLeftTimezoneLabel.height': '20px',

    'week.timegridOneHour.height': '52px',
    'week.timegridHalfHour.height': '26px',
    'week.timegridHalfHour.borderBottom': 'none',
    'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

    'week.timegrid.paddingRight': '8px',
    'week.timegrid.borderRight': '1px solid #e5e5e5',
    'week.timegridSchedule.borderRadius': '2px',
    'week.timegridSchedule.paddingLeft': '2px',

    'week.currentTime.color': '#515ce6',
    'week.currentTime.fontSize': '11px',
    'week.currentTime.fontWeight': 'normal',

    'week.pastTime.color': '#333',
    'week.pastTime.fontWeight': 'normal',

    'week.futureTime.color': '#333',
    'week.futureTime.fontWeight': 'normal',

    'week.currentTimeLinePast.border': '1px dashed #515ce6',
    'week.currentTimeLineBullet.backgroundColor': '#515ce6',
    'week.currentTimeLineToday.border': '1px solid #515ce6',
    'week.currentTimeLineFuture.border': 'none',

    // week creation guide style
    'week.creationGuide.color': '#515ce6',
    'week.creationGuide.fontSize': '11px',
    'week.creationGuide.fontWeight': 'bold',

    // week daygrid schedule style
    'week.dayGridSchedule.borderRadius': '2px',
    'week.dayGridSchedule.height': '24px',
    'week.dayGridSchedule.marginTop': '2px',
    'week.dayGridSchedule.marginLeft': '8px',
    'week.dayGridSchedule.marginRight': '8px'
};
 */
var themeConfig = {
    'common.border': '1px solid #e5e5e5',
    'common.backgroundColor': 'white',
    'common.holiday.color': '#ff4040',
    'common.saturday.color': '#333',
    'common.dayname.color': '#333',
    'common.today.color': '#333',

    // creation guide style
    'common.creationGuide.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'common.creationGuide.border': '1px solid #515ce6',

    // month header 'dayname'
    'month.dayname.height': '31px',
    'month.dayname.borderLeft': '1px solid #e5e5e5',
    'month.dayname.paddingLeft': '10px',
    'month.dayname.paddingRight': '10px',
    'month.dayname.backgroundColor': 'inherit',
    'month.dayname.fontSize': '12px',
    'month.dayname.fontWeight': 'normal',
    'month.dayname.textAlign': 'left',

    // month day grid cell 'day'
    'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',
    'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',
    'month.weekend.backgroundColor': 'inherit',
    'month.day.fontSize': '14px',

    // month schedule style
    'month.schedule.borderRadius': '2px',
    'month.schedule.height': '24px',
    'month.schedule.marginTop': '2px',
    'month.schedule.marginLeft': '8px',
    'month.schedule.marginRight': '8px',

    // month more view
    'month.moreView.border': '1px solid #d5d5d5',
    'month.moreView.boxShadow': '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
    'month.moreView.backgroundColor': 'white',
    'month.moreView.paddingBottom': '17px',
    'month.moreViewTitle.height': '44px',
    'month.moreViewTitle.marginBottom': '12px',
    'month.moreViewTitle.backgroundColor': 'inherit',
    'month.moreViewTitle.borderBottom': 'none',
    'month.moreViewTitle.padding': '12px 17px 0 17px',
    'month.moreViewList.padding': '0 17px',

    // week header 'dayname'
    'week.dayname.height': '42px',
    'week.dayname.borderTop': '1px solid #e5e5e5',
    'week.dayname.borderBottom': '1px solid #e5e5e5',
    'week.dayname.borderLeft': 'inherit',
    'week.dayname.paddingLeft': '0',
    'week.dayname.backgroundColor': 'inherit',
    'week.dayname.textAlign': 'left',
    'week.today.color': '#333',
    'week.pastDay.color': '#bbb',

    // week vertical panel 'vpanel'
    'week.vpanelSplitter.border': '1px solid #e5e5e5',
    'week.vpanelSplitter.height': '3px',

    // week daygrid 'daygrid'
    'week.daygrid.borderRight': '1px solid #e5e5e5',
    'week.daygrid.backgroundColor': 'inherit',

    'week.daygridLeft.width': '72px',
    'week.daygridLeft.backgroundColor': 'inherit',
    'week.daygridLeft.paddingRight': '8px',
    'week.daygridLeft.borderRight': '1px solid #e5e5e5',

    'week.today.backgroundColor': 'rgba(81, 92, 230, 0.05)',
    'week.weekend.backgroundColor': 'inherit',

    // week timegrid 'timegrid'
    'week.timegridLeft.width': '72px',
    'week.timegridLeft.backgroundColor': 'inherit',
    'week.timegridLeft.borderRight': '1px solid #e5e5e5',
    'week.timegridLeft.fontSize': '11px',
    'week.timegridLeftTimezoneLabel.height': '40px',
    'week.timegridLeftAdditionalTimezone.backgroundColor': 'white',

    'week.timegridOneHour.height': '52px',
    'week.timegridHalfHour.height': '26px',
    'week.timegridHalfHour.borderBottom': 'none',
    'week.timegridHorizontalLine.borderBottom': '1px solid #e5e5e5',

    'week.timegrid.paddingRight': '8px',
    'week.timegrid.borderRight': '1px solid #e5e5e5',
    'week.timegridSchedule.borderRadius': '2px',
    'week.timegridSchedule.paddingLeft': '2px',

    'week.currentTime.color': '#515ce6',
    'week.currentTime.fontSize': '11px',
    'week.currentTime.fontWeight': 'normal',

    'week.pastTime.color': '#bbb',
    'week.pastTime.fontWeight': 'normal',

    'week.futureTime.color': '#333',
    'week.futureTime.fontWeight': 'normal',

    'week.currentTimeLinePast.border': '1px dashed #515ce6',
    'week.currentTimeLineBullet.backgroundColor': '#515ce6',
    'week.currentTimeLineToday.border': '1px solid #515ce6',
    'week.currentTimeLineFuture.border': 'none',

    // week creation guide style
    'week.creationGuide.color': '#515ce6',
    'week.creationGuide.fontSize': '11px',
    'week.creationGuide.fontWeight': 'bold',

    // week daygrid schedule style
    'week.dayGridSchedule.borderRadius': '2px',
    'week.dayGridSchedule.height': '24px',
    'week.dayGridSchedule.marginTop': '2px',
    'week.dayGridSchedule.marginLeft': '8px',
    'week.dayGridSchedule.marginRight': '8px'
};

module.exports = themeConfig;


/***/ }),

/***/ "./src/js/view/layout.js":
/*!*******************************!*\
  !*** ./src/js/view/layout.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Layout view. wrap all view containers at outside.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../config */ "./src/js/config.js");
var domutil = __webpack_require__(/*! ../common/domutil */ "./src/js/common/domutil.js");
var Collection = __webpack_require__(/*! ../common/collection */ "./src/js/common/collection.js");
var View = __webpack_require__(/*! ./view */ "./src/js/view/view.js");

/**
 * Layout view for toggle each child view. It will controlled via navigation UI.
 * @constructor
 * @extends {View}
 * @param {HTMLElement} container Container element to use layout view.
 * @param {Theme} theme - theme instance
 */
function Layout(container, theme) {
    container = domutil.appendHTMLElement('div', container, config.classname('layout'));

    /**
     * @type {HTMLElement}
     */
    this.container = container;

    /*eslint-disable*/
    /**
     * @type {Collection} Child view collection.
     */
    this.children = new Collection(function(childView) {
        return childView.viewName;
    });
    /* eslint-enable*/

    /**
     * @type {Theme}
     */
    this.theme = theme;

    this.applyTheme();
}

util.inherit(Layout, View);

/**
 * Clear child views.
 */
Layout.prototype.clear = function() {
    this.children.each(function(childView) {
        childView.destroy();
    });

    this.children.clear();
    this.container.innerHTML = '';
};

/**
 * Remove child view.
 * @override
 * @param {(string|View)} viewName - name of view or instance.
 */
Layout.prototype.removeChild = function(viewName) {
    this.children.remove(viewName);
};

/**
 * Toggle child views.
 * @param {string} viewName - Name of view.
 */
Layout.prototype.toggleChildView = function(viewName) {
    var container,
        prefix = ['add', 'remove'],
        flag;

    this.children.each(function(childView) {
        container = childView.container;
        flag = Number(childView.viewName === viewName);
        domutil[prefix[flag] + 'Class'](container, config.classname('hidden'));
    });
};

Layout.prototype.applyTheme = function() {
    var style = this.container.style;
    var theme = this.theme.common;

    // background color
    style.backgroundColor = theme.backgroundColor;
};

module.exports = Layout;



/***/ }),

/***/ "./src/js/view/month/month.js":
/*!************************************!*\
  !*** ./src/js/view/month/month.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js"),
    TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date,
    tmpl = __webpack_require__(/*! ../template/month/month.hbs */ "./src/js/view/template/month/month.hbs"),
    View = __webpack_require__(/*! ../view */ "./src/js/view/view.js"),
    VLayout = __webpack_require__(/*! ../..//common/vlayout */ "./src/js/common/vlayout.js"),
    WeekdayInMonth = __webpack_require__(/*! ./weekdayInMonth */ "./src/js/view/month/weekdayInMonth.js");
var mmin = Math.min;

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options
 * @param {function} [options.scheduleFilter] - schedule filter
 * @param {number} [options.startDayOfWeek=0] - start day of week
 * @param {string} [options.renderMonth='2015-12'] - render month
 * @param {string[]} [options.daynames] - daynames to use upside of month view
 * @param {HTMLElement} container - container element
 * @param {Base.Month} controller - controller instance
 */
function Month(options, container, controller) {
    var theme = controller ? controller.theme : null;
    var monthOption;

    options = options || {};
    monthOption = options ? options.month : {};

    View.call(this, container);

    /**
     * @type {Base.Month}
     */
    this.controller = controller;

    /**
     * @type {VLayout}
     */
    this.vLayout = new VLayout({
        panels: [
            {height: parseInt(controller.theme.month.dayname.height, 10) || 42},
            {autoHeight: true}
        ]
    }, container, theme);

    /**
     * @type {string}
     */
    this.options = util.extend({
        scheduleFilter: function(schedule) {
            return Boolean(schedule.isVisible);
        },
        startDayOfWeek: 0,
        renderMonth: '2018-01',
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        narrowWeekend: false,
        visibleWeeksCount: null,
        isAlways6Week: true,
        isReadOnly: options.isReadOnly,
        grid: {
            header: {
                height: 34
            },
            footer: {
                height: 3
            }
        }
    }, monthOption);

    this.options.grid.header = util.extend({
        height: 34
    }, util.pick(monthOption, 'grid', 'header'));
    this.options.grid.footer = util.extend({
        height: 3
    }, util.pick(monthOption, 'grid', 'footer'));

    /**
     * horizontal grid information
     * @type {Object}
     */
    this.grids = datetime.getGridLeftAndWidth(
        this.options.daynames.length,
        this.options.narrowWeekend,
        this.options.startDayOfWeek);
}

util.inherit(Month, View);

/**
 * Name of view. for managing subview at layout view
 * @type {string}
 */
Month.prototype.viewName = 'month';

/**
 * Get calendar array by supplied date
 * @param {string} renderMonthStr - month to render YYYY-MM, weeks2/3 to render YYYY-MM-DD
 * @returns {array.<Date[]>} calendar array
 */
Month.prototype._getMonthCalendar = function(renderMonthStr) {
    var date = datetime.parse(renderMonthStr) || datetime.parse(renderMonthStr + '-01');
    var startDayOfWeek = this.options.startDayOfWeek || 0;
    var visibleWeeksCount = mmin(this.options.visibleWeeksCount || 0, 6);
    var workweek = this.options.workweek || false;
    var datetimeOptions, calendar;

    if (this.options.visibleWeeksCount) {
        datetimeOptions = {
            startDayOfWeek: startDayOfWeek,
            isAlways6Week: false,
            visibleWeeksCount: visibleWeeksCount,
            workweek: workweek
        };
    } else {
        datetimeOptions = {
            startDayOfWeek: startDayOfWeek,
            isAlways6Week: this.options.isAlways6Week,
            workweek: workweek
        };
    }

    calendar = datetime.arr2dCalendar(date, datetimeOptions);

    return calendar;
};

/**
 * Create children view (week) and add children
 * @param {HTMLElement} container - container element to render weeks
 * @param {array.<Date[]>} calendar - calendar array from datetime#arr2dCalendar
 * @param {Theme} theme - theme instance
 */
Month.prototype._renderChildren = function(container, calendar, theme) {
    var self = this;
    var weekCount = calendar.length;
    var heightPercent = 100 / weekCount;
    var opt = this.options;
    var renderMonth = opt.renderMonth;
    var narrowWeekend = opt.narrowWeekend;
    var startDayOfWeek = opt.startDayOfWeek;
    var visibleWeeksCount = opt.visibleWeeksCount;
    var visibleScheduleCount = opt.visibleScheduleCount;
    var gridOption = opt.grid;
    var isReadOnly = opt.isReadOnly;

    container.innerHTML = '';
    this.children.clear();

    util.forEach(calendar, function(weekArr) {
        var start = new TZDate(Number(weekArr[0])),
            end = new TZDate(Number(weekArr[weekArr.length - 1])),
            weekdayViewContainer,
            weekdayView;

        weekdayViewContainer = domutil.appendHTMLElement(
            'div', container, config.classname('month-week-item'));

        weekdayView = new WeekdayInMonth({
            renderMonth: renderMonth,
            heightPercent: heightPercent,
            renderStartDate: datetime.format(start, 'YYYY-MM-DD'),
            renderEndDate: datetime.format(end, 'YYYY-MM-DD'),
            narrowWeekend: narrowWeekend,
            startDayOfWeek: startDayOfWeek,
            visibleWeeksCount: visibleWeeksCount,
            visibleScheduleCount: visibleScheduleCount,
            grid: gridOption,
            scheduleHeight: parseInt(theme.month.schedule.height, 10),
            scheduleGutter: parseInt(theme.month.schedule.marginTop, 10),
            isReadOnly: isReadOnly
        }, weekdayViewContainer);

        self.addChild(weekdayView);
    });
};

/**
 * Render month view
 * @override
 */
Month.prototype.render = function() {
    var self = this,
        opt = this.options,
        vLayout = this.vLayout,
        controller = this.controller,
        daynames = opt.daynames,
        workweek = opt.workweek,
        calendar = this._getMonthCalendar(opt.renderMonth),
        scheduleFilter = opt.scheduleFilter,
        theme = controller ? controller.theme : null,
        styles = this._getStyles(theme),
        grids,
        daynameViewModel,
        baseViewModel;

    grids = this.grids = datetime.getGridLeftAndWidth(
        opt.daynames.length,
        opt.narrowWeekend,
        opt.startDayOfWeek
    );

    daynameViewModel = util.map(
        util.range(opt.startDayOfWeek, 7).concat(util.range(7)).slice(0, 7),
        function(day, index) {
            return {
                day: day,
                label: daynames[day],
                width: grids[index] ? grids[index].width : 0,
                left: grids[index] ? grids[index].left : 0,
                color: this._getDayNameColor(theme, day)
            };
        },
        this
    );

    if (workweek) {
        grids = this.grids = datetime.getGridLeftAndWidth(5, opt.narrowWeekend, opt.startDayOfWeek, workweek);

        daynameViewModel = util.filter(daynameViewModel, function(daynameModel) {
            return !datetime.isWeekend(daynameModel.day);
        });

        util.forEach(daynameViewModel, function(daynameModel, index) {
            daynameModel.width = grids[index] ? grids[index].width : 0;
            daynameModel.left = grids[index] ? grids[index].left : 0;
        });
    }

    baseViewModel = {
        daynames: daynameViewModel,
        styles: styles
    };

    vLayout.panels[0].container.innerHTML = tmpl(baseViewModel);

    this._renderChildren(vLayout.panels[1].container, calendar, theme);

    baseViewModel.panelHeight = vLayout.panels[1].getHeight();

    this.children.each(function(childView) {
        var start = datetime.parse(childView.options.renderStartDate);
        var end = datetime.parse(childView.options.renderEndDate);
        var eventsInDateRange = controller.findByDateRange(
            datetime.start(start),
            datetime.end(end),
            scheduleFilter
        );
        var dateRange = datetime.range(
            datetime.start(start),
            datetime.end(end),
            datetime.MILLISECONDS_PER_DAY);
        var viewModel = {
            eventsInDateRange: eventsInDateRange,
            range: dateRange.slice(0, grids.length),
            grids: grids,
            panelHeight: baseViewModel.panelHeight,
            theme: theme
        };

        childView.render(viewModel);

        self._invokeAfterRenderSchedule(eventsInDateRange);
    });
};

/**
 * Fire 'afterRenderSchedule' event
 * @param {Array} matrices - schedule matrices from view model
 * @fires Month#afterRenderSchedule
 */
Month.prototype._invokeAfterRenderSchedule = function(matrices) {
    var self = this;
    util.forEachArray(matrices, function(matrix) {
        util.forEachArray(matrix, function(column) {
            util.forEachArray(column, function(scheduleViewModel) {
                if (scheduleViewModel && !scheduleViewModel.hidden) {
                    /**
                     * @event Month#afterRenderSchedule
                     */
                    self.fire('afterRenderSchedule', {schedule: scheduleViewModel.model});
                }
            });
        });
    });
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
Month.prototype._getStyles = function(theme) {
    var styles = {};
    var dayname;

    if (theme) {
        dayname = theme.month.dayname;

        styles.borderTop = dayname.borderTop || theme.common.border;
        styles.borderLeft = dayname.borderLeft || theme.common.border;
        styles.height = dayname.height;
        styles.paddingLeft = dayname.paddingLeft;
        styles.paddingRight = dayname.paddingRight;
        styles.fontSize = dayname.fontSize;
        styles.backgroundColor = dayname.backgroundColor;
        styles.fontWeight = dayname.fontWeight;
        styles.textAlign = dayname.textAlign;
    }

    return styles;
};

/**
 * Get a day name color
 * @param {Theme} theme - theme instance
 * @param {number} day - day number
 * @returns {string} style - color style
 */
Month.prototype._getDayNameColor = function(theme, day) {
    var color = '';

    if (theme) {
        if (day === 0) {
            color = theme.common.holiday.color;
        } else if (day === 6) {
            color = theme.common.saturday.color;
        } else {
            color = theme.common.dayname.color;
        }
    }

    return color;
};

module.exports = Month;



/***/ }),

/***/ "./src/js/view/month/more.js":
/*!***********************************!*\
  !*** ./src/js/view/month/more.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Floating layer for displaying schedule in specific date
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var OUT_PADDING = 5;
var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    domevent = __webpack_require__(/*! ../../common/domevent */ "./src/js/common/domevent.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js"),
    View = __webpack_require__(/*! ../../view/view */ "./src/js/view/view.js"),
    FloatingLayer = __webpack_require__(/*! ../../common/floatingLayer */ "./src/js/common/floatingLayer.js"),
    common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js"),
    tmpl = __webpack_require__(/*! ../template/month/more.hbs */ "./src/js/view/template/month/more.hbs");

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options
 * @param {object} [options.moreLayerSize] - more layer size
 * @param {object} [options.moreLayerSize.width=null] - css width value(px, auto).
 *                                                           The default value 'null' is to fit a grid cell.
 * @param {object} [options.moreLayerSize.height=null] - css height value(px, auto).
 *                                                            The default value 'null' is to fit a grid cell.
 * @param {HTMLElement} container = container element
 * @param {Theme} theme - theme instance
 */
function More(options, container, theme) {
    View.call(this, container);

    /**
     * @type {FloatingLayer}
     */
    this.layer = new FloatingLayer(null, container);

    /**
     * cached view model
     * @type {object}
     */
    this._viewModel = null;

    /**
     * @type {object}
     */
    this.options = util.extend({
        moreLayerSize: {
            width: null,
            height: null
        },
        scheduleHeight: parseInt(theme.month.schedule.height, 10) || 18,
        scheduleGutter: parseInt(theme.month.schedule.marginTop, 10) || 2,
        scheduleBulletTop: (parseInt(theme.month.schedule.height, 10) || 18) / 3,
        borderRadius: theme.month.schedule.borderRadius
    }, options);

    /**
     * @type {Theme}
     */
    this.theme = theme;

    domevent.on(container, 'click', this._onClick, this);
}

util.inherit(More, View);

/**
 * Click event handler for close button
 * @param {MouseEvent} clickEvent - mouse event object
 */
More.prototype._onClick = function(clickEvent) {
    var target = (clickEvent.target || clickEvent.srcElement);
    var className = config.classname('month-more-close');

    if (!domutil.hasClass(target, className) && !domutil.closest(target, '.' + className)) {
        return;
    }

    this.hide();
};

/**
 * Mousedown event handler for hiding more layer when user mousedown outside of
 * layer
 * @param {MouseEvent} mouseDownEvent - mouse event object
 */
More.prototype._onMouseDown = function(mouseDownEvent) {
    var target = (mouseDownEvent.target || mouseDownEvent.srcElement),
        moreLayer = domutil.closest(target, config.classname('.month-more'));

    if (moreLayer) {
        return;
    }

    this.hide();
};

/**
 * Get new position for more layer by +n element itself
 * @param {HTMLElement} target - parent grid-line element of +n element
 * @param {HTMLElement} weekItem - weekItem container element
 * @returns {number[]} new position of more layer
 */
More.prototype._getRenderPosition = function(target, weekItem) {
    var pos = domevent.getMousePosition({
        clientX: domutil.getPosition(target)[0],
        clientY: domutil.getPosition(weekItem)[1]
    }, this.container);
    var containerSize = domutil.getSize(this.container);
    var left = pos[0] - OUT_PADDING;
    var top = pos[1] - OUT_PADDING;

    left = common.ratio(containerSize[0], 100, left) + '%';
    top = common.ratio(containerSize[1], 100, top) + '%';

    return [left, top];
};

/**
 * @override
 */
More.prototype.destroy = function() {
    this.layer.destroy();
    this.layer = null;
    domevent.off(this.container, 'click', this._onClick, this);
    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
    View.prototype.destroy.call(this);
};

/**
 * @override
 * @param {object} viewModel - view model from factory/monthView
 */
More.prototype.render = function(viewModel) {
    var target = domutil.closest(viewModel.target, config.classname('.weekday-grid-line'));
    var weekItem = domutil.closest(target, config.classname('.month-week-item'));
    var layer = this.layer;
    var self = this;
    var pos = this._getRenderPosition(target, weekItem);
    var minHeight = domutil.getSize(weekItem)[1] + (OUT_PADDING * 2);
    var width = target.offsetWidth + (OUT_PADDING * 2);
    var opt = this.options;
    var optMoreLayerSize = opt.moreLayerSize;
    var styles = this._getStyles(this.theme);
    var maxVisibleSchedulesInLayer = 10;
    var height = '';

    this._viewModel = util.extend(viewModel, {
        scheduleGutter: opt.scheduleGutter,
        scheduleHeight: opt.scheduleHeight,
        scheduleBulletTop: opt.scheduleBulletTop,
        borderRadius: opt.borderRadius,
        styles: styles
    });

    height = parseInt(styles.titleHeight, 10);
    height += parseInt(styles.titleMarginBottom, 10);
    if (viewModel.schedules.length <= maxVisibleSchedulesInLayer) {
        height += (opt.scheduleGutter + opt.scheduleHeight) * viewModel.schedules.length;
    } else {
        height += (opt.scheduleGutter + opt.scheduleHeight) * maxVisibleSchedulesInLayer;
    }
    height += parseInt(styles.paddingBottom, 10);
    height += OUT_PADDING; // for border

    if (optMoreLayerSize.width) {
        width = optMoreLayerSize.width;
    }

    if (optMoreLayerSize.height) {
        height = optMoreLayerSize.height;
    }

    if (isNaN(height) || height < minHeight) {
        height = minHeight;
    }

    layer.setContent(tmpl(viewModel));
    if (weekItem.parentElement.lastElementChild === weekItem) {
        layer.setLTRB({
            left: pos[0],
            bottom: 0
        });
    } else {
        layer.setPosition(pos[0], pos[1]);
    }
    layer.setSize(width, height);

    layer.show();

    util.debounce(function() {
        domevent.on(document.body, 'mousedown', self._onMouseDown, self);
    })();
};

/**
 * Hide layer
 */
More.prototype.hide = function() {
    this.layer.hide();
    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
};

/**
 * refresh layer
 */
More.prototype.refresh = function() {
    if (this._viewModel) {
        this.layer.setContent(tmpl(this._viewModel));
    }
};

/**
 * Return more layer root element
 * @returns {HTMLElement} root element
 */
More.prototype.getMoreViewElement = function() {
    return domutil.find(config.classname('.month-more'), this.layer.container);
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
More.prototype._getStyles = function(theme) {
    var styles = {};
    var listHeight = '';

    if (theme) {
        styles.border = theme.month.moreView.border || theme.common.border;
        styles.boxShadow = theme.month.moreView.boxShadow;
        styles.backgroundColor = theme.month.moreView.backgroundColor || theme.common.backgroundColor;
        styles.paddingBottom = theme.month.moreView.paddingBottom;
        styles.titleHeight = theme.month.moreViewTitle.height;
        styles.titleMarginBottom = theme.month.moreViewTitle.marginBottom;
        styles.titleBackgroundColor = theme.month.moreViewTitle.backgroundColor;
        styles.titleBorderBottom = theme.month.moreViewTitle.borderBottom;
        styles.titlePadding = theme.month.moreViewTitle.padding;
        styles.listPadding = theme.month.moreViewList.padding;
        listHeight = 'calc(100%';

        if (parseInt(styles.titleHeight, 10)) {
            listHeight += ' - ' + styles.titleHeight;
        }
        if (parseInt(styles.titleMarginBottom, 10)) {
            listHeight += ' - ' + styles.titleMarginBottom;
        }
        listHeight += ')';
        styles.listHeight = listHeight;
    }

    return styles;
};

module.exports = More;


/***/ }),

/***/ "./src/js/view/month/weekdayInMonth.js":
/*!*********************************************!*\
  !*** ./src/js/view/month/weekdayInMonth.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Monthday in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    common = __webpack_require__(/*! ../../common/common.js */ "./src/js/common/common.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js"),
    View = __webpack_require__(/*! ../../view/view */ "./src/js/view/view.js"),
    Weekday = __webpack_require__(/*! ../weekday */ "./src/js/view/weekday.js"),
    baseTmpl = __webpack_require__(/*! ../template/month/weekdayInMonth.hbs */ "./src/js/view/template/month/weekdayInMonth.hbs"),
    scheduleTmpl = __webpack_require__(/*! ../template/month/weekdayInMonthSchedule.hbs */ "./src/js/view/template/month/weekdayInMonthSchedule.hbs");
var mfloor = Math.floor,
    mmin = Math.min;

/**
 * @constructor
 * @extends {Weekday}
 * @param {object} options - options for WeekdayInWeek view
 * @param {number} [options.heightPercent] - height percent of view
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to
 *  make create easy.
 * @param {number} [options.scheduleHeight=18] - height of each schedule block.
 * @param {number} [options.scheduleGutter=2] - gutter height of each schedule block.
 * @param {HTMLDIVElement} container - DOM element to use container for this
 *  view.
 */
function WeekdayInMonth(options, container) {
    Weekday.call(this, options, container);
    container.style.height = options.heightPercent + '%';
}

util.inherit(WeekdayInMonth, Weekday);

/**
 * Get schedule container element's bound properly by override
 *
 * View#getViewBound.
 * @override
 */
WeekdayInMonth.prototype.getViewBound = function() {
    var bound = View.prototype.getViewBound.call(this);

    return bound;
};

/**
 * Get limit index of schedule block in current view
 * @param {number} panelHeight - panel's height for pre-calculation
 * @returns {number} limit index
 */
WeekdayInMonth.prototype._getRenderLimitIndex = function(panelHeight) {
    var opt = this.options;
    var containerHeight = panelHeight || this.getViewBound().height;
    var gridHeaderHeight = util.pick(opt, 'grid', 'header', 'height') || 0;
    var gridFooterHeight = util.pick(opt, 'grid', 'footer', 'height') || 0;
    var visibleScheduleCount = opt.visibleScheduleCount || 0;
    var count;

    containerHeight -= (gridHeaderHeight + gridFooterHeight);

    count = mfloor(containerHeight / (opt.scheduleHeight + opt.scheduleGutter));

    if (!visibleScheduleCount) {
        visibleScheduleCount = count;
    }

    return mmin(count, visibleScheduleCount); // subtraction for '+n' label block
};

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
WeekdayInMonth.prototype.getBaseViewModel = function(viewModel) {
    var opt = this.options,
        gridHeaderHeight = util.pick(opt, 'grid', 'header', 'height') || 0,
        gridFooterHeight = util.pick(opt, 'grid', 'footer', 'height') || 0,
        renderLimitIdx = this._getRenderLimitIndex() + 1,
        exceedDate = this.getExceedDate(renderLimitIdx, viewModel.eventsInDateRange, viewModel.range),
        styles = this._getStyles(viewModel.theme);
    var baseViewModel;

    viewModel = util.extend({
        exceedDate: exceedDate
    }, viewModel);

    baseViewModel = Weekday.prototype.getBaseViewModel.call(this, viewModel);

    baseViewModel = util.extend({
        matrices: viewModel.eventsInDateRange,
        gridHeaderHeight: gridHeaderHeight,
        gridFooterHeight: gridFooterHeight,
        renderLimitIdx: renderLimitIdx,
        isReadOnly: opt.isReadOnly,
        styles: styles
    }, baseViewModel);

    return baseViewModel;
};

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
WeekdayInMonth.prototype.render = function(viewModel) {
    var container = this.container,
        baseViewModel = this.getBaseViewModel(viewModel),
        scheduleContainer;

    if (!this.options.visibleWeeksCount) {
        setIsOtherMonthFlag(baseViewModel.dates, this.options.renderMonth, viewModel.theme);
    }

    container.innerHTML = baseTmpl(baseViewModel);

    scheduleContainer = domutil.find(
        config.classname('.weekday-schedules'),
        container
    );

    if (!scheduleContainer) {
        return;
    }

    scheduleContainer.innerHTML = scheduleTmpl(baseViewModel);

    common.setAutoEllipsis(
        config.classname('.weekday-schedule-title'),
        container,
        true
    );
};

WeekdayInMonth.prototype._beforeDestroy = function() {
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
WeekdayInMonth.prototype._getStyles = function(theme) {
    var styles = {};

    if (theme) {
        styles.borderTop = theme.common.border;
        styles.borderLeft = theme.common.border;
        styles.fontSize = theme.month.day.fontSize;
        styles.borderRadius = theme.month.schedule.borderRadius;
        styles.marginLeft = theme.month.schedule.marginLeft;
        styles.marginRight = theme.month.schedule.marginRight;
        styles.scheduleBulletTop = this.options.scheduleHeight / 3;
    }

    return styles;
};

/**
 * 현재 달이 아닌 날짜에 대해 isOtherMonth = true 플래그를 추가한다.
 * @param {Array} dates - 날짜정보 배열
 * @param {string} renderMonthStr - 현재 렌더링중인 월 (YYYYMM)
 * @param {Theme} theme - theme instance
 */
function setIsOtherMonthFlag(dates, renderMonthStr, theme) {
    var renderMonth = Number(renderMonthStr.substring(5));

    util.forEach(dates, function(dateObj) {
        var isOtherMonth = dateObj.month !== renderMonth;
        dateObj.isOtherMonth = isOtherMonth;

        if (isOtherMonth) {
            dateObj.color = Weekday.prototype._getDayNameColor(theme, dateObj.day, dateObj.isToday, isOtherMonth);
        }
    });
}

module.exports = WeekdayInMonth;


/***/ }),

/***/ "./src/js/view/popup/scheduleCreationPopup.js":
/*!****************************************************!*\
  !*** ./src/js/view/popup/scheduleCreationPopup.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Floating layer for writing new schedules
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var View = __webpack_require__(/*! ../../view/view */ "./src/js/view/view.js");
var FloatingLayer = __webpack_require__(/*! ../../common/floatingLayer */ "./src/js/common/floatingLayer.js");
var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var DatePicker = __webpack_require__(/*! tui-date-picker */ "tui-date-picker");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    domevent = __webpack_require__(/*! ../../common/domevent */ "./src/js/common/domevent.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js"),
    common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js");
var tmpl = __webpack_require__(/*! ../template/popup/scheduleCreationPopup.hbs */ "./src/js/view/template/popup/scheduleCreationPopup.hbs");
var MAX_WEEK_OF_MONTH = 6;
var ARROW_WIDTH_HALF = 8;

/**
 * @constructor
 * @extends {View}
 * @param {HTMLElement} container - container element
 * @param {Array.<Calendar>} calendars - calendar list used to create new schedule
 */
function ScheduleCreationPopup(container, calendars) {
    View.call(this, container);
    /**
     * @type {FloatingLayer}
     */
    this.layer = new FloatingLayer(null, container);

    /**
     * cached view model
     * @type {object}
     */
    this._viewModel = null;
    this._selectedCal = null;
    this._schedule = null;
    this.calendars = calendars;
    this._focusedDropdown = null;
    this._onClickListeners = [
        this._selectDropdownMenuItem.bind(this),
        this._closeDropdownMenuView.bind(this, null),
        this._closePopup.bind(this),
        this._toggleDropdownMenuView.bind(this),
        this._toggleIsAllday.bind(this),
        this._toggleIsPrivate.bind(this),
        this._onClickSaveSchedule.bind(this)
    ];

    domevent.on(container, 'click', this._onClick, this);
}

util.inherit(ScheduleCreationPopup, View);

/**
 * Mousedown event handler for hiding popup layer when user mousedown outside of
 * layer
 * @param {MouseEvent} mouseDownEvent - mouse event object
 */
ScheduleCreationPopup.prototype._onMouseDown = function(mouseDownEvent) {
    var target = (mouseDownEvent.target || mouseDownEvent.srcElement),
        popupLayer = domutil.closest(target, config.classname('.floating-layer'));

    if (popupLayer) {
        return;
    }

    this.hide();
};

/**
 * @override
 */
ScheduleCreationPopup.prototype.destroy = function() {
    this.layer.destroy();
    this.layer = null;
    domevent.off(this.container, 'click', this._onClick, this);
    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
    View.prototype.destroy.call(this);
};

/**
 * @override
 * Click event handler for close button
 * @param {MouseEvent} clickEvent - mouse event object
 */
ScheduleCreationPopup.prototype._onClick = function(clickEvent) {
    var target = (clickEvent.target || clickEvent.srcElement);

    util.forEach(this._onClickListeners, function(listener) {
        return !listener(target);
    });
};

/**
 * Test click event target is close button, and return layer is closed(hidden)
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether popup layer is closed or not
 */
ScheduleCreationPopup.prototype._closePopup = function(target) {
    var className = config.classname('popup-close');

    if (domutil.hasClass(target, className) || domutil.closest(target, '.' + className)) {
        this.hide();

        return true;
    }

    return false;
};

/**
 * Toggle dropdown menu view, when user clicks dropdown button
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether user clicked dropdown button or not
 */
ScheduleCreationPopup.prototype._toggleDropdownMenuView = function(target) {
    var className = config.classname('dropdown-button');
    var dropdownBtn = domutil.hasClass(target, className) ? target : domutil.closest(target, '.' + className);

    if (!dropdownBtn) {
        return false;
    }

    if (domutil.hasClass(config.classname('open'))) {
        this._closeDropdownMenuView(dropdownBtn.parentNode);
    } else {
        this._openDropdownMenuView(dropdownBtn.parentNode);
    }

    return true;
};

/**
 * Close drop down menu
 * @param {HTMLElement} dropdown - dropdown element that has a opened dropdown menu
 */
ScheduleCreationPopup.prototype._closeDropdownMenuView = function(dropdown) {
    dropdown = dropdown || this._focusedDropdown;
    if (dropdown) {
        domutil.removeClass(dropdown, config.classname('open'));
        this._focusedDropdown = null;
    }
};

/**
 * Open drop down menu
 * @param {HTMLElement} dropdown - dropdown element that has a closed dropdown menu
 */
ScheduleCreationPopup.prototype._openDropdownMenuView = function(dropdown) {
    domutil.addClass(dropdown, config.classname('open'));
    this._focusedDropdown = dropdown;
};

/**
 * If click dropdown menu item, close dropdown menu
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether
 */
ScheduleCreationPopup.prototype._selectDropdownMenuItem = function(target) {
    var itemClassName = config.classname('dropdown-menu-item');
    var iconClassName = config.classname('icon');
    var contentClassName = config.classname('content');
    var selectedItem = domutil.hasClass(target, itemClassName) ? target : domutil.closest(target, '.' + itemClassName);
    var bgColor, title, dropdown, dropdownBtn;

    if (!selectedItem) {
        return false;
    }

    bgColor = domutil.find('.' + iconClassName, selectedItem).style.backgroundColor || 'transparent';
    title = domutil.find('.' + contentClassName, selectedItem).innerHTML;

    dropdown = domutil.closest(selectedItem, config.classname('.dropdown'));
    dropdownBtn = domutil.find(config.classname('.dropdown-button'), dropdown);
    domutil.find('.' + contentClassName, dropdownBtn).innerText = title;

    if (domutil.hasClass(dropdown, config.classname('section-calendar'))) {
        domutil.find('.' + iconClassName, dropdownBtn).style.backgroundColor = bgColor;
        this._selectedCal = common.find(this.calendars, function(cal) {
            return cal.id === domutil.getData(selectedItem, 'calendarId');
        });
    }

    domutil.removeClass(dropdown, config.classname('open'));

    return true;
};

/**
 * Toggle allday checkbox state
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether event target is allday section or not
 */
ScheduleCreationPopup.prototype._toggleIsAllday = function(target) {
    var className = config.classname('section-allday');
    var alldaySection = domutil.hasClass(target, className) ? target : domutil.closest(target, '.' + className);
    var checkbox;

    if (alldaySection) {
        checkbox = domutil.find(config.classname('.checkbox-square'), alldaySection);
        checkbox.checked = !checkbox.checked;

        return true;
    }

    return false;
};

/**
 * Toggle private button
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether event target is private section or not
 */
ScheduleCreationPopup.prototype._toggleIsPrivate = function(target) {
    var className = config.classname('section-private');
    var privateSection = domutil.hasClass(target, className) ? target : domutil.closest(target, '.' + className);

    if (privateSection) {
        if (domutil.hasClass(privateSection, config.classname('public'))) {
            domutil.removeClass(privateSection, config.classname('public'));
        } else {
            domutil.addClass(privateSection, config.classname('public'));
        }

        return true;
    }

    return false;
};

/**
 * Save new schedule if user clicked save button
 * @emits ScheduleCreationPopup#saveSchedule
 * @param {HTMLElement} target click event target
 * @returns {boolean} whether save button is clicked or not
 */
ScheduleCreationPopup.prototype._onClickSaveSchedule = function(target) {
    var className = config.classname('popup-save');
    var cssPrefix = config.cssPrefix;
    var title, isPrivate, location, isAllDay, startDate, endDate, state;
    var start, end, calendarId;

    if (!domutil.hasClass(target, className) && !domutil.closest(target, '.' + className)) {
        return false;
    }

    title = domutil.get(cssPrefix + 'schedule-title');
    startDate = new TZDate(this.rangePicker.getStartDate());
    endDate = new TZDate(this.rangePicker.getEndDate());

    if (!title.value) {
        title.focus();

        return true;
    }

    if (!startDate && !endDate) {
        return true;
    }

    isPrivate = !domutil.hasClass(domutil.get(cssPrefix + 'schedule-private'), config.classname('public'));
    location = domutil.get(cssPrefix + 'schedule-location');
    state = domutil.get(cssPrefix + 'schedule-state');
    isAllDay = !!domutil.get(cssPrefix + 'schedule-allday').checked;

    if (isAllDay) {
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
    }

    start = new TZDate(startDate);
    end = new TZDate(endDate);

    if (this._selectedCal) {
        calendarId = this._selectedCal.id;
    }

    if (this._isEditMode) {
        this.fire('beforeUpdateSchedule', {
            schedule: {
                calendarId: calendarId || this._schedule.calendarId,
                title: title.value,
                location: location.value,
                raw: {
                    class: isPrivate ? 'private' : 'public'
                },
                start: start,
                end: end,
                isAllDay: isAllDay,
                state: state.innerText,
                triggerEventName: 'click',
                id: this._schedule.id
            },
            start: start,
            end: end,
            calendar: this._selectedCal,
            triggerEventName: 'click'
        });
    } else {
        /**
         * @event ScheduleCreationPopup#beforeCreateSchedule
         * @type {object}
         * @property {Schedule} schedule - new schedule instance to be added
         */
        this.fire('beforeCreateSchedule', {
            calendarId: calendarId,
            title: title.value,
            location: location.value,
            raw: {
                class: isPrivate ? 'private' : 'public'
            },
            start: new TZDate(startDate),
            end: new TZDate(endDate),
            isAllDay: isAllDay,
            state: state.innerText
        });
    }

    this.hide();

    return true;
};

/**
 * @override
 * @param {object} viewModel - view model from factory/monthView
 */
ScheduleCreationPopup.prototype.render = function(viewModel) {
    var calendars = this.calendars;
    var layer = this.layer;
    var self = this;
    var boxElement, guideElements;

    viewModel.zIndex = this.layer.zIndex + 5;
    viewModel.calendars = calendars;
    if (calendars.length) {
        viewModel.selectedCal = this._selectedCal = calendars[0];
    }

    this._isEditMode = viewModel.schedule && viewModel.schedule.id;
    if (this._isEditMode) {
        boxElement = viewModel.target;
        viewModel = this._makeEditModeData(viewModel);
    } else {
        this.guide = viewModel.guide;
        guideElements = this._getGuideElements(this.guide);
        boxElement = guideElements.length ? guideElements[0] : null;
    }
    layer.setContent(tmpl(viewModel));
    this._createDatepicker(viewModel.start, viewModel.end);
    layer.show();

    this._setPopupPositionAndArrowDirection(boxElement.getBoundingClientRect());

    util.debounce(function() {
        domevent.on(document.body, 'mousedown', self._onMouseDown, self);
    })();
};

/**
 * Make view model for edit mode
 * @param {object} viewModel - original view model from 'beforeCreateEditPopup'
 * @returns {object} - edit mode view model
 */
ScheduleCreationPopup.prototype._makeEditModeData = function(viewModel) {
    var schedule = viewModel.schedule;
    var title, isPrivate, location, startDate, endDate, isAllDay, state;
    var raw = schedule.raw || {};
    var calendars = this.calendars;

    var id = schedule.id;
    title = schedule.title;
    isPrivate = raw['class'] === 'private';
    location = schedule.location;
    startDate = schedule.start;
    endDate = schedule.end;
    isAllDay = schedule.isAllDay;
    state = schedule.state;

    viewModel.selectedCal = this._selectedCal = common.find(this.calendars, function(cal) {
        return cal.id === viewModel.schedule.calendarId;
    });

    this._schedule = schedule;

    return {
        id: id,
        selectedCal: this._selectedCal,
        calendars: calendars,
        title: title,
        isPrivate: isPrivate,
        location: location,
        isAllDay: isAllDay,
        state: state,
        start: startDate,
        end: endDate,
        raw: {
            class: isPrivate ? 'private' : 'public'
        },
        zIndex: this.layer.zIndex + 5,
        isEditMode: this._isEditMode
    };
};

/**
 * Set popup position and arrow direction to apear near guide element
 * @param {MonthCreationGuide|TimeCreationGuide|DayGridCreationGuide} guideBound - creation guide element
 */
ScheduleCreationPopup.prototype._setPopupPositionAndArrowDirection = function(guideBound) {
    var layer = domutil.find(config.classname('.popup'), this.layer.container);
    var layerSize = {
        width: layer.offsetWidth,
        height: layer.offsetHeight
    };
    var windowSize = {
        right: window.innerWidth,
        bottom: window.innerHeight
    };
    var parentRect = this.layer.parent.getBoundingClientRect();
    var parentBounds = {
        left: parentRect.left,
        top: parentRect.top
    };
    var pos;

    pos = this._calcRenderingData(layerSize, windowSize, guideBound);
    pos.x -= parentBounds.left;
    pos.y -= (parentBounds.top + 6);
    this.layer.setPosition(pos.x, pos.y);
    this._setArrowDirection(pos.arrow);
};

/**
 * Get guide elements from creation guide object
 * It is used to calculate rendering position of popup
 * It will be disappeared when hiding popup
 * @param {MonthCreationGuide|TimeCreationGuide|AlldayCreationGuide} guide - creation guide
 * @returns {Array.<HTMLElement>} creation guide element
 */
ScheduleCreationPopup.prototype._getGuideElements = function(guide) {
    var guideElements = [];
    var i = 0;

    if (guide.guideElement) {
        guideElements.push(guide.guideElement);
    } else if (guide.guideElements) {
        for (; i < MAX_WEEK_OF_MONTH; i += 1) {
            if (guide.guideElements[i]) {
                guideElements.push(guide.guideElements[i]);
            }
        }
    }

    return guideElements;
};

/**
 * Get guide element's bound data which only includes top, right, bottom, left
 * @param {Array.<HTMLElement>} guideElements - creation guide elements
 * @returns {Object} - popup bound data
 */
ScheduleCreationPopup.prototype._getBoundOfFirstRowGuideElement = function(guideElements) {
    var bound;

    if (!guideElements.length) {
        return null;
    }

    bound = guideElements[0].getBoundingClientRect();

    return {
        top: bound.top,
        left: bound.left,
        bottom: bound.bottom,
        right: bound.right
    };
};

/**
 * Calculate rendering position usering guide elements
 * @param {{width: {number}, height: {number}}} layerSize - popup layer's width and height
 * @param {{top: {number}, left: {number}, right: {number}, bottom: {number}}} parentSize - width and height of the upper layer, that acts as a border of popup
 * @param {{top: {number}, left: {number}, right: {number}, bottom: {number}}} guideBound - guide element bound data
 * @returns {PopupRenderingData} rendering position of popup and popup arrow
 */
ScheduleCreationPopup.prototype._calcRenderingData = function(layerSize, parentSize, guideBound) {
    var guideHorizontalCenter = (guideBound.left + guideBound.right) / 2;
    var x = guideHorizontalCenter - (layerSize.width / 2);
    var y = guideBound.top - layerSize.height + 3;
    var arrowDirection = 'arrow-bottom';
    var arrowLeft;

    if (y < 0) {
        y = guideBound.bottom + 9;
        arrowDirection = 'arrow-top';
    }

    if (x > 0 && (x + layerSize.width > parentSize.right)) {
        x = parentSize.right - layerSize.width;
    }

    if (x < 0) {
        x = 0;
    }

    if (guideHorizontalCenter - x !== layerSize.width / 2) {
        arrowLeft = guideHorizontalCenter - x - ARROW_WIDTH_HALF;
    }

    /**
     * @typedef {Object} PopupRenderingData
     * @property {number} x - left position
     * @property {number} y - top position
     * @property {string} arrow.direction - direction of popup arrow
     * @property {number} [arrow.position] - relative position of popup arrow, if it is not set, arrow appears on the middle of popup
     */
    return {
        x: x,
        y: y,
        arrow: {
            direction: arrowDirection,
            position: arrowLeft
        }
    };
};

/**
 * Set arrow's direction and position
 * @param {Object} arrow rendering data for popup arrow
 */
ScheduleCreationPopup.prototype._setArrowDirection = function(arrow) {
    var direction = arrow.direction || 'arrow-bottom';
    var arrowEl = domutil.get(config.classname('popup-arrow'));
    var borderElement = domutil.find(config.classname('.popup-arrow-border', arrowEl));

    if (direction !== config.classname('arrow-bottom')) {
        domutil.removeClass(arrowEl, config.classname('arrow-bottom'));
        domutil.addClass(arrowEl, config.classname(direction));
    }

    if (arrow.position) {
        borderElement.style.left = arrow.position + 'px';
    }
};

/**
 * Create date range picker using start date and end date
 * @param {TZDate} start - start date
 * @param {TZDate} end - end date
 */
ScheduleCreationPopup.prototype._createDatepicker = function(start, end) {
    var cssPrefix = config.cssPrefix;
    this.rangePicker = DatePicker.createRangePicker({
        startpicker: {
            date: new TZDate(start.getTime()).toDate(),
            input: '#' + cssPrefix + 'schedule-start-date',
            container: '#' + cssPrefix + 'startpicker-container'
        },
        endpicker: {
            date: new TZDate(end.getTime()).toDate(),
            input: '#' + cssPrefix + 'schedule-end-date',
            container: '#' + cssPrefix + 'endpicker-container'
        },
        format: 'yyyy-MM-dd HH:mm',
        timepicker: {
            showMeridiem: false
        },
        usageStatistics: true
    });
};

/**
 * Hide layer
 */
ScheduleCreationPopup.prototype.hide = function() {
    this.layer.hide();

    if (this.guide) {
        this.guide.clearGuideElement();
        this.guide = null;
    }

    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
};

/**
 * refresh layer
 */
ScheduleCreationPopup.prototype.refresh = function() {
    if (this._viewModel) {
        this.layer.setContent(this.tmpl(this._viewModel));
    }
};

/**
 * Set calendar list
 * @param {Array.<Calendar>} calendars - calendar list
 */
ScheduleCreationPopup.prototype.setCalendars = function(calendars) {
    this.calendars = calendars || [];
};

module.exports = ScheduleCreationPopup;


/***/ }),

/***/ "./src/js/view/popup/scheduleDetailPopup.js":
/*!**************************************************!*\
  !*** ./src/js/view/popup/scheduleDetailPopup.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Floating layer for  showing detail schedule
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var View = __webpack_require__(/*! ../../view/view */ "./src/js/view/view.js");
var FloatingLayer = __webpack_require__(/*! ../../common/floatingLayer */ "./src/js/common/floatingLayer.js");
var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    domevent = __webpack_require__(/*! ../../common/domevent */ "./src/js/common/domevent.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var tmpl = __webpack_require__(/*! ../template/popup/scheduleDetailPopup.hbs */ "./src/js/view/template/popup/scheduleDetailPopup.hbs");
var ARROW_WIDTH_HALF = 8;

/**
 * @constructor
 * @extends {View}
 * @param {HTMLElement} container - container element
 */
function ScheduleDetailPopup(container) {
    View.call(this, container);
    /**
     * @type {FloatingLayer}
     */
    this.layer = new FloatingLayer(null, container);

    /**
     * cached view model
     * @type {object}
     */
    this._viewModel = null;
    this._schedule = null;
    this._calendar = null;

    domevent.on(container, 'click', this._onClick, this);
}

util.inherit(ScheduleDetailPopup, View);

/**
 * Mousedown event handler for hiding popup layer when user mousedown outside of
 * layer
 * @param {MouseEvent} mouseDownEvent - mouse event object
 */
ScheduleDetailPopup.prototype._onMouseDown = function(mouseDownEvent) {
    var target = (mouseDownEvent.target || mouseDownEvent.srcElement),
        popupLayer = domutil.closest(target, config.classname('.floating-layer'));

    if (popupLayer) {
        return;
    }

    this.hide();
};

/**
 * @override
 */
ScheduleDetailPopup.prototype.destroy = function() {
    this.layer.destroy();
    this.layer = null;
    domevent.off(this.container, 'click', this._onClick, this);
    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
    View.prototype.destroy.call(this);
};

/**
 * @override
 * Click event handler for close button
 * @param {MouseEvent} clickEvent - mouse event object
 */
ScheduleDetailPopup.prototype._onClick = function(clickEvent) {
    var target = (clickEvent.target || clickEvent.srcElement);

    this._onClickEditSchedule(target);

    this._onClickDeleteSchedule(target);
};

/**
 * @fires ScheduleDetailPopup#clickEditSchedule
 * @param {HTMLElement} target - event target
 */
ScheduleDetailPopup.prototype._onClickEditSchedule = function(target) {
    var className = config.classname('popup-edit');

    if (domutil.hasClass(target, className) || domutil.closest(target, '.' + className)) {
        this.fire('beforeUpdateSchedule', {
            schedule: this._schedule,
            triggerEventName: 'click',
            target: this._scheduleEl
        });

        this.hide();
    }
};

/**
 * @fires ScheduleDetailPopup#clickEditSchedule
 * @param {HTMLElement} target - event target
 */
ScheduleDetailPopup.prototype._onClickDeleteSchedule = function(target) {
    var className = config.classname('popup-delete');

    if (domutil.hasClass(target, className) || domutil.closest(target, '.' + className)) {
        this.fire('beforeDeleteSchedule', {
            schedule: this._schedule
        });

        this.hide();
    }
};

/**
 * @override
 * @param {object} viewModel - view model from factory/monthView
 */
ScheduleDetailPopup.prototype.render = function(viewModel) {
    var layer = this.layer;
    var self = this;

    layer.setContent(tmpl({
        schedule: viewModel.schedule,
        calendar: viewModel.calendar
    }));
    layer.show();
    this._setPopupPositionAndArrowDirection(viewModel.event);

    this._schedule = viewModel.schedule;
    this._calendar = viewModel.calendar;

    util.debounce(function() {
        domevent.on(document.body, 'mousedown', self._onMouseDown, self);
    })();
};

/**
 * Set popup position and arrow direction to apear near guide element
 * @param {Event} event - creation guide element
 */
ScheduleDetailPopup.prototype._setPopupPositionAndArrowDirection = function(event) {
    var layer = domutil.find(config.classname('.popup'), this.layer.container);
    var layerSize = {
        width: layer.offsetWidth,
        height: layer.offsetHeight
    };
    var windowSize = {
        right: window.innerWidth,
        bottom: window.innerHeight
    };
    var parentRect = this.layer.parent.getBoundingClientRect();
    var parentBounds = {
        left: parentRect.left,
        top: parentRect.top
    };
    var scheduleEl = event.target || event.srcElement;
    var blockEl = domutil.closest(scheduleEl, config.classname('.time-date-schedule-block'))
        || domutil.closest(scheduleEl, config.classname('.weekday-schedule'))
        || scheduleEl;
    var scheduleBound = blockEl.getBoundingClientRect();
    var pos;

    this._scheduleEl = blockEl;

    pos = this._calcRenderingData(layerSize, windowSize, scheduleBound);
    pos.x -= parentBounds.left + 4;
    pos.y -= (parentBounds.top + ARROW_WIDTH_HALF);
    this.layer.setPosition(pos.x, pos.y);
    this._setArrowDirection(pos.arrow);
};

/**
 * Calculate rendering position usering guide elements
 * @param {{width: {number}, height: {number}}} layerSize - popup layer's width and height
 * @param {{top: {number}, left: {number}, right: {number}, bottom: {number}}} parentSize - width and height of the upper layer, that acts as a border of popup
 * @param {{top: {number}, left: {number}, right: {number}, bottom: {number}}} guideBound - guide element bound data
 * @returns {PopupRenderingData} rendering position of popup and popup arrow
 */
ScheduleDetailPopup.prototype._calcRenderingData = function(layerSize, parentSize, guideBound) {
    var guideVerticalCenter = (guideBound.top + guideBound.bottom) / 2;
    var x = guideBound.right;
    var y = guideVerticalCenter;
    var arrowDirection = 'arrow-left';
    var arrowTop;

    if (y < 0) {
        y = y + (layerSize.height / 2) - guideVerticalCenter;
    }

    if (x > 0 && (x + layerSize.width > parentSize.right)) {
        x = guideBound.left - layerSize.width - ARROW_WIDTH_HALF - 3;
        arrowDirection = 'arrow-right';
    }

    if (x < 0) {
        x = 0;
    }

    if (guideBound.right > x + layerSize.width) {
        arrowDirection = 'arrow-right';
    }

    /**
     * @typedef {Object} PopupRenderingData
     * @property {number} x - left position
     * @property {number} y - top position
     * @property {string} arrow.direction - direction of popup arrow
     * @property {number} [arrow.position] - relative position of popup arrow, if it is not set, arrow appears on the middle of popup
     */
    return {
        x: x + ARROW_WIDTH_HALF,
        y: y - (layerSize.height / 2) + ARROW_WIDTH_HALF,
        arrow: {
            direction: arrowDirection,
            position: arrowTop
        }
    };
};

/**
 * Set arrow's direction and position
 * @param {Object} arrow rendering data for popup arrow
 */
ScheduleDetailPopup.prototype._setArrowDirection = function(arrow) {
    var direction = arrow.direction || 'arrow-left';
    var arrowEl = domutil.find(config.classname('.popup-arrow'), this.layer.container);
    var borderElement = domutil.find(config.classname('.popup-arrow-border', arrowEl));

    if (direction !== config.classname('arrow-left')) {
        domutil.removeClass(arrowEl, config.classname('arrow-left'));
        domutil.addClass(arrowEl, config.classname(direction));
    }

    if (arrow.position) {
        borderElement.style.top = arrow.position + 'px';
    }
};

/**
 * Hide layer
 */
ScheduleDetailPopup.prototype.hide = function() {
    this.layer.hide();

    if (this.guide) {
        this.guide.clearGuideElement();
        this.guide = null;
    }

    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
};

/**
 * refresh layer
 */
ScheduleDetailPopup.prototype.refresh = function() {
    if (this._viewModel) {
        this.layer.setContent(this.tmpl(this._viewModel));
    }
};

module.exports = ScheduleDetailPopup;


/***/ }),

/***/ "./src/js/view/template/helper.js":
/*!****************************************!*\
  !*** ./src/js/view/template/helper.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint complexity: 0 */
/**
 * @fileoverview Helpers for handlebar templates.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var Handlebars = __webpack_require__(/*! handlebars-template-loader/runtime */ "./node_modules/handlebars-template-loader/runtime/index.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var mmax = Math.max;
var SIXTY_MINUTES = 60;

/**
 * Get CSS syntax for element size
 * @param {number} value - size value to apply element
 * @param {string} postfix - postfix string ex) px, em, %
 * @param {string} prefix - property name ex) width, height
 * @returns {string} CSS syntax
 */
function getElSize(value, postfix, prefix) {
    prefix = prefix || '';
    if (util.isNumber(value)) {
        return prefix + ':' + value + postfix;
    }

    return prefix + ':auto';
}

/**
 * Get element left based on narrowWeekend
 * @param {object} viewModel - view model
 * @param {Array} grids - dates information
 * @returns {number} element left
 */
function getElLeft(viewModel, grids) {
    return grids[viewModel.left] ? grids[viewModel.left].left : 0;
}

/**
 * Get element width based on narrowWeekend
 * @param {object} viewModel - view model
 * @param {Array} grids - dates information
 * @returns {number} element width
 */
function getElWidth(viewModel, grids) {
    var width = 0;
    var i = 0;
    var length = grids.length;
    var left;
    for (; i < viewModel.width; i += 1) {
        left = (viewModel.left + i) % length;
        left += parseInt((viewModel.left + i) / length, 10);
        if (left < length) {
            width += grids[left] ? grids[left].width : 0;
        }
    }

    return width;
}

Handlebars.registerHelper({
    /**
     * Stamp supplied object
     *
     * Commonly use for rendering object's unique ID to rendered view
     * @param {object} obj - object to stamp
     * @returns {number} stamp value
     */
    'stamp': function(obj) {
        return util.stamp(obj);
    },

    /**
     * Whether supplied object are equal?
     * @param {*} a - a
     * @param {*} b - b
     * @returns {boolean} result of operation
     */
    'equal': function(a, b) {
        return a === b;
    },

    /**
     * OR
     * @param {*} a - a
     * @param {*} b - b
     * @returns {boolean} or
     */
    'or': function(a, b) {
        return a || b;
    },

    /**
     * AND
     * @param {*} a - a
     * @param {*} b - b
     * @returns {boolean} or
     */
    'and': function(a, b) {
        return a && b;
    },

    /**
     * Compare object or apply logical operation by customizable oper parameter
     * @param {*} a - a
     * @param {string} oper - operator ex) '==', '<'
     * @param {*} b - b
     * @param {Handlebars} options - handlebar options
     * @returns {boolean} result of operation
     */
    'fi': function(a, oper, b, options) {
        switch (oper) {
            case '==':
                return (a == b) ? options.fn(this) : options.inverse(this);  // eslint-disable-line
            case '===':
                return (a === b) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (a !== b) ? options.fn(this) : options.inverse(this);
            case '<':
                return (a < b) ? options.fn(this) : options.inverse(this);
            case '||':
                return (a || b) ? options.fn(this) : options.inverse(this);
            default:
                throw new Error('Not match operation');
        }
    },

    /**
     * Get hhmm formatted time str
     * @param {Date} date - date object
     * @returns {string} formatted value
     */
    'hhmm': function(date) {
        return datetime.format(date, 'HH:mm');
    },

    /**
     * Get `width` stylesheet string
     * @param {number} width - width percentage
     * @returns {string} css style part
     */
    'common-width': function(width) {
        return getElSize(width, '%', 'width');
    },

    /**
     * Get element left based on narrowWeekend
     * @param {object} viewModel - view model
     * @param {Array} grids - dates information
     * @returns {number} element left
     */
    'grid-left': function(viewModel, grids) {
        return getElLeft(viewModel, grids);
    },

    /**
     * Get element width based on narrowWeekend
     * @param {object} viewModel - view model
     * @param {Array} grids - dates information
     * @returns {number} element width
     */
    'grid-width': function(viewModel, grids) {
        return getElWidth(viewModel, grids);
    },

    /**
     * Use in time.hbs
     * @param {ScheduleViewModel} viewModel viewModel
     * @returns {string} element size css class
     */
    'time-scheduleBlock': function(viewModel) {
        var top = getElSize(viewModel.top, 'px', 'top'),
            left = getElSize(viewModel.left, '%', 'left'),
            width = getElSize(viewModel.width, '%', 'width'),
            height = getElSize(viewModel.height, 'px', 'height');

        return [top, left, width, height].join(';');
    },

    'month-scheduleBlock': function(viewModel, grids, blockHeight, paddingTop) {
        var top = getElSize(((viewModel.top - 1) * blockHeight) + paddingTop, 'px', 'top');
        var left = getElSize(grids[viewModel.left] ? grids[viewModel.left].left : 0, '%', 'left');
        var width = getElSize(getElWidth(viewModel, grids), '%', 'width');
        var height = getElSize(viewModel.height, 'px', 'height');

        return [top, left, width, height].join(';');
    },

    'holiday': function(day) {
        var cssClass = '';

        if (day === 0) {
            cssClass = config.classname('holiday-sun');
        }

        if (day === 6) {
            cssClass = config.classname('holiday-sat');
        }

        return cssClass;
    },

    /**
     * Add supplied two parameter
     * @param {*} a - a
     * @param {*} b - b
     * @returns {number} result of operation
     */
    'add': function(a, b) {
        return a + b;
    },

    /**
     * Multiply supplied two parameter
     * @param {*} a - a
     * @param {*} b - b
     * @returns {number} result of operation
     */
    'multiply': function(a, b) {
        return a * b;
    },

    /**
     * Divide supplied two parameter
     * @param {*} a - a
     * @param {*} b - b
     * @returns {number} result of operation
     */
    'divide': function(a, b) {
        return a / b;
    },

    /**
     * Subtract supplied two parameter
     * @param {*} a - a
     * @param {*} b - b
     * @returns {number} result of operation
     */
    'subtract': function(a, b) {
        return a - b;
    },

    'getRight': function(a, b) {
        return mmax(0, 100 - (a + b));
    },

    /**
     * Get css prefix in global configuration
     * @returns {string} css prefix
     */
    'CSS_PREFIX': function() {
        return config.cssPrefix;
    },

    'reverse': function(array) {
        return array.slice().reverse();
    },

    /**********
     * Default schedule template
     **********/

    'milestone-tmpl': function(model) {
        var icon = config.classname('icon');
        var iconName = config.classname('ic-milestone');

        return '<span class="' + icon + ' ' + iconName + '"></span><span style="background-color: ' + model.bgColor + '">' + common.stripTags(model.title) + '</span>';
    },

    'milestoneTitle-tmpl': function() {
        var className = config.classname('left-content');

        return '<span class="' + className + '">Milestone</span>';
    },

    'task-tmpl': function(model) {
        return '#' + model.title;
    },

    'taskTitle-tmpl': function() {
        var className = config.classname('left-content');

        return '<span class="' + className + '">Task</span>';
    },

    'alldayTitle-tmpl': function() {
        var className = config.classname('left-content');

        return '<span class="' + className + '">All Day</span>';
    },

    'allday-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'time-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'goingDuration-tmpl': function(model) {
        var goingDuration = model.goingDuration;
        var hour = parseInt(goingDuration / SIXTY_MINUTES, 10);
        var minutes = goingDuration % SIXTY_MINUTES;

        return 'GoingTime ' + datetime.leadingZero(hour, 2) + ':' + datetime.leadingZero(minutes, 2);
    },

    'comingDuration-tmpl': function(model) {
        var goingDuration = model.goingDuration;
        var hour = parseInt(goingDuration / SIXTY_MINUTES, 10);
        var minutes = goingDuration % SIXTY_MINUTES;

        return 'ComingTime ' + datetime.leadingZero(hour, 2) + ':' + datetime.leadingZero(minutes, 2);
    },

    'monthMoreTitleDate-tmpl': function(date, dayname) {
        var classDay = config.classname('month-more-title-day');
        var classDayLabel = config.classname('month-more-title-day-label');
        var day = util.pick(date.split('.'), 2);

        return '<span class="' + classDay + '">' + day + '</span> <span class="' + classDayLabel + '">' + dayname + '</span>';
    },

    'monthMoreClose-tmpl': function() {
        return '';
    },

    'monthGridHeader-tmpl': function(model) {
        var date = parseInt(model.date.split('-')[2], 10);
        var classNames = [];

        classNames.push(config.classname('weekday-grid-date'));
        if (model.isToday) {
            classNames.push(config.classname('weekday-grid-date-decorator'));
        }

        return '<span class="' + classNames.join(' ') + '">' + date + '</span>';
    },

    'monthGridHeaderExceed-tmpl': function(hiddenSchedules) {
        var className = config.classname('weekday-grid-more-schedules');

        return '<span class="' + className + '">' + hiddenSchedules + ' more</span>';
    },

    'monthGridFooter-tmpl': function() {
        return '';
    },

    /* eslint no-unused-vars: 0 */
    'monthGridFooterExceed-tmpl': function(hiddenSchedules) {
        return '';
    },

    'weekDayname-tmpl': function(model) {
        var classDate = config.classname('dayname-date');
        var className = config.classname('dayname-name');

        return '<span class="' + classDate + '">' + model.date + '</span>&nbsp;&nbsp;<span class="' + className + '">' + model.dayName + '</span>';
    },

    'monthDayname-tmpl': function(model) {
        return model.label;
    },

    'weekGridFooterExceed-tmpl': function(hiddenSchedules) {
        return '+' + hiddenSchedules;
    },

    'dayGridTitle-tmpl': function(viewName) {
        var tmpl = Handlebars.helpers[viewName + 'Title-tmpl'];
        if (tmpl) {
            return tmpl(viewName);
        }

        return viewName;
    },

    'schedule-tmpl': function(model) {
        var tmpl = Handlebars.helpers[model.category + '-tmpl'];
        if (tmpl) {
            return tmpl(model);
        }

        return '';
    },

    'collapseBtnTitle-tmpl': function() {
        var iconName = config.classname('icon');
        var closeIconName = config.classname('ic-arrow-solid-top');

        return '<span class="' + iconName + ' ' + closeIconName + '"></span>';
    },

    'popupIsAllDay-tmpl': function() {
        return 'All day';
    },

    'popupStateFree-tmpl': function() {
        return 'Free';
    },

    'popupStateBusy-tmpl': function() {
        return 'Busy';
    },

    'titlePlaceholder-tmpl': function() {
        return 'Subject';
    },

    'locationPlaceholder-tmpl': function() {
        return 'Location';
    },

    'startDatePlaceholder-tmpl': function() {
        return 'Start date';
    },

    'endDatePlaceholder-tmpl': function() {
        return 'End date';
    },
    'popupSave-tmpl': function() {
        return 'Save';
    },
    'popupUpdate-tmpl': function() {
        return 'Update';
    },
    'popupDetailDate-tmpl': function(isAllDay, start, end) {
        var isSameDate = datetime.isSameDate(start, end);
        var endFormat = (isSameDate ? '' : 'YYYY.MM.DD ') + 'hh:mm tt';

        if (isAllDay) {
            return datetime.format(start, 'YYYY.MM.DD') + (isSameDate ? '' : ' - ' + datetime.format(end, 'YYYY.MM.DD'));
        }

        return (datetime.format(start, 'YYYY.MM.DD hh:mm tt') + ' - ' + datetime.format(end, endFormat));
    },
    'popupDetailLocation-tmpl': function(schedule) {
        return schedule.location;
    },
    'popupDetailUser-tmpl': function(schedule) {
        var creator = util.pick(schedule, 'raw', 'creator', 'name');

        return creator;
    },
    'popupDetailState-tmpl': function(schedule) {
        return schedule.state || 'Busy';
    },
    'popupEdit-tmpl': function() {
        return 'Edit';
    },
    'popupDelete-tmpl': function() {
        return 'Delete';
    },
    'timezoneDisplayLabel-tmpl': function(timezoneOffset, displayLabel) {
        var gmt, hour, minutes;

        if (util.isUndefined(displayLabel)) {
            gmt = timezoneOffset < 0 ? '-' : '+';
            hour = Math.abs(parseInt(timezoneOffset / SIXTY_MINUTES, 10));
            minutes = Math.abs(timezoneOffset % SIXTY_MINUTES);
            displayLabel = gmt + datetime.leadingZero(hour, 2) + ':' + datetime.leadingZero(minutes, 2);
        }

        return displayLabel;
    },
    'timegridDisplayPrimayTime-tmpl': function(time) {
        var meridiem = time.hour < 12 ? 'am' : 'pm';

        return time.hour + ' ' + meridiem;
    },
    'timegridDisplayTime-tmpl': function(time) {
        return datetime.leadingZero(time.hour, 2) + ':' + datetime.leadingZero(time.minutes, 2);
    }
});


/***/ }),

/***/ "./src/js/view/template/month/month.hbs":
/*!**********************************************!*\
  !*** ./src/js/view/template/month/month.hbs ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-dayname-item\"\n         style=\"position: absolute;\n                width: "
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + "%;\n                left: "
    + alias4(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"left","hash":{},"data":data}) : helper)))
    + "%;\n                padding-left: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.paddingLeft), depth0))
    + ";\n                padding-right: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.paddingRight), depth0))
    + ";\n                line-height: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.height), depth0))
    + ";\n"
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                \">\n        <span class=\""
    + alias4((helpers.holiday || (depth0 && depth0.holiday) || alias2).call(alias1,(depth0 != null ? depth0.day : depth0),{"name":"holiday","hash":{},"data":data}))
    + "\" style=\"color: "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\">\n            "
    + ((stack1 = (helpers["monthDayname-tmpl"] || (depth0 && depth0["monthDayname-tmpl"]) || alias2).call(alias1,depth0,{"name":"monthDayname-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "\n        </span>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                border-right: "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderLeft), depth0))
    + ";\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda;

  return "<div class=\""
    + alias2(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-dayname\"\n    style=\"border-top: "
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.borderTop : stack1), depth0))
    + "; height: "
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.height : stack1), depth0))
    + "; font-size: "
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.fontSize : stack1), depth0))
    + "; background-color: "
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.backgroundColor : stack1), depth0))
    + "; text-align: "
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.textAlign : stack1), depth0))
    + "; font-weight: "
    + alias2(alias3(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.fontWeight : stack1), depth0))
    + ";\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.daynames : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/month/more.hbs":
/*!*********************************************!*\
  !*** ./src/js/view/template/month/more.hbs ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.fi || (depth0 && depth0.fi) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isAllDay : stack1),"||",(depth0 != null ? depth0.hasMultiDates : depth0),{"name":"fi","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda, alias5="function";

  return "<div data-id=\""
    + alias3((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\"\n                data-schedule-id=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-calendar-id=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.calendarId : stack1), depth0))
    + "\"\n                class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-more-schedule "
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-more-allday "
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-title\"\n                style=\"height: "
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; line-height: "
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; margin-top: "
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.scheduleGutter), depth0))
    + "px; border-radius: "
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.borderRadius), depth0))
    + ";\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "                    \n                    "
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.customStyle : stack1), depth0))
    + "\">\n                    "
    + ((stack1 = (helpers["allday-tmpl"] || (depth0 && depth0["allday-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"allday-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        color: #ffffff; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; border-left:3px solid "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + ";\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.bgColor : stack1), depth0))
    + ";  border-left:3px solid "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + "\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.fi || (depth0 && depth0.fi) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.category : stack1),"===","time",{"name":"fi","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda, alias5="function";

  return "                <div data-id=\""
    + alias3((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\"\n                    data-schedule-id=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-calendar-id=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.calendarId : stack1), depth0))
    + "\"\n                    class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-more-schedule "
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule "
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-time\"\n                    style=\"height: "
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; line-height: "
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; margin-top: "
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.scheduleGutter), depth0))
    + "px;"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.customStyle : stack1), depth0))
    + "\">\n                    <span class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-bullet\"\n                        style=\"top: "
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.scheduleBulletTop), depth0))
    + "px;\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n                    <span class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-title\"\n                        style=\""
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "\"\n                        data-title=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.title : stack1), depth0))
    + "\">"
    + ((stack1 = (helpers["time-tmpl"] || (depth0 && depth0["time-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"time-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n                </div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "                                background: #ffffff\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                                background:"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + "\n                            ";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n                                color: #ffffff;\n                                background-color: "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "                                color:#333;\n                            ";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda, alias5="function";

  return "<div data-id=\""
    + alias3((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\"\n                    data-schedule-id=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-calendar-id=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.calendarId : stack1), depth0))
    + "\"\n                    class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-more-schedule "
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"\n                    style=\"height:"
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; line-height:"
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; border-radius: "
    + alias3(alias4(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderRadius), depth0))
    + ";\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.exceedLeft : depth0),{"name":"unless","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.exceedRight : depth0),{"name":"unless","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.program(26, data, 0),"data":data})) != null ? stack1 : "")
    + "                        "
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.customStyle : stack1), depth0))
    + "\">\n                    <span class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias5 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-title\"\n                                    data-title=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.title : stack1), depth0))
    + "\">"
    + ((stack1 = (helpers["schedule-tmpl"] || (depth0 && depth0["schedule-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"schedule-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n                </div>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-focused ";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        margin-left: "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.marginLeft), depth0))
    + ";\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        margin-right: "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.marginRight), depth0))
    + ";\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        color: #ffffff; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; border-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + ";\n";
},"26":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.bgColor : stack1), depth0))
    + "; border-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + ";\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-more\" style=\"padding-bottom: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.paddingBottom : stack1), depth0))
    + "; border: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.border : stack1), depth0))
    + "; box-shadow: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.boxShadow : stack1), depth0))
    + "; background-color: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.backgroundColor : stack1), depth0))
    + ";\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-more-title\"\n        style=\"height: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.titleHeight : stack1), depth0))
    + "; margin-bottom: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.titleMarginBottom : stack1), depth0))
    + "; background-color: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.titleBackgroundColor : stack1), depth0))
    + "; border-bottom: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.titleBorderBottom : stack1), depth0))
    + "; padding: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.titlePadding : stack1), depth0))
    + ";\">\n        <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-more-title-date\">"
    + ((stack1 = (helpers["monthMoreTitleDate-tmpl"] || (depth0 && depth0["monthMoreTitleDate-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.date : depth0),(depth0 != null ? depth0.dayname : depth0),{"name":"monthMoreTitleDate-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n        <button type=\"button\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-more-close\">"
    + ((stack1 = ((helper = (helper = helpers["monthMoreClose-tmpl"] || (depth0 != null ? depth0["monthMoreClose-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"monthMoreClose-tmpl","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\n    </div>\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "month-more-list\" style=\"padding: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.listPadding : stack1), depth0))
    + "; height: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.listHeight : stack1), depth0))
    + ";\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.schedules : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/month/weekdayInMonth.hbs":
/*!*******************************************************!*\
  !*** ./src/js/view/template/month/weekdayInMonth.hbs ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-grid-line "
    + alias4((helpers.holiday || (depth0 && depth0.holiday) || alias2).call(alias1,(depth0 != null ? depth0.day : depth0),{"name":"holiday","hash":{},"data":data}))
    + ((stack1 = (helpers.fi || (depth0 && depth0.fi) || alias2).call(alias1,(depth0 != null ? depth0.date : depth0),"!==",1,{"name":"fi","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isToday : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isOtherMonth : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"\n        style=\"width:"
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + "%; left:"
    + alias4(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"left","hash":{},"data":data}) : helper)))
    + "%; background-color: "
    + alias4(((helper = (helper = helpers.backgroundColor || (depth0 != null ? depth0.backgroundColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundColor","hash":{},"data":data}) : helper)))
    + "; font-size: "
    + alias4(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.fontSize), depth0))
    + ";\n"
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        \">\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-grid-header\">\n            <span style=\"color: "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\">"
    + ((stack1 = (helpers["monthGridHeader-tmpl"] || (depth0 && depth0["monthGridHeader-tmpl"]) || alias2).call(alias1,depth0,{"name":"monthGridHeader-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hiddenSchedules : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-grid-footer\">\n            <span style=\"color: "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\">"
    + ((stack1 = (helpers["monthGridFooter-tmpl"] || (depth0 && depth0["monthGridFooter-tmpl"]) || alias2).call(alias1,depth0,{"name":"monthGridFooter-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hiddenSchedules : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "near-month-day";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "today";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "extra-date";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        border-right:"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderLeft), depth0))
    + ";\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-exceed-in-month\" data-ymd=\""
    + alias4(((helper = (helper = helpers.ymd || (depth0 != null ? depth0.ymd : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ymd","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = (helpers["monthGridHeaderExceed-tmpl"] || (depth0 && depth0["monthGridHeaderExceed-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.hiddenSchedules : depth0),{"name":"monthGridHeaderExceed-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-exceed-in-month\" data-ymd=\""
    + alias4(((helper = (helper = helpers.ymd || (depth0 != null ? depth0.ymd : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ymd","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = (helpers["monthGridFooterExceed-tmpl"] || (depth0 && depth0["monthGridFooterExceed-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.hiddenSchedules : depth0),{"name":"monthGridFooterExceed-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-border\"\n    style=\"\n    border-top: "
    + alias4(container.lambda(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.borderTop : stack1), depth0))
    + ";\n\"></div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-grid\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.dates : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedules\"></div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/month/weekdayInMonthSchedule.hbs":
/*!***************************************************************!*\
  !*** ./src/js/view/template/month/weekdayInMonthSchedule.hbs ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = (helpers.fi || (depth0 && depth0.fi) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.top : depth0),"<",((stack1 = (data && data.root)) && stack1.renderLimitIdx),{"name":"fi","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<div data-id=\""
    + alias3((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\"\n         class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-block\n                "
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-block-"
    + alias3((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\n            "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.exceedLeft : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.exceedRight : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"\n         style=\""
    + alias3((helpers["month-scheduleBlock"] || (depth0 && depth0["month-scheduleBlock"]) || alias2).call(alias1,depth0,((stack1 = (data && data.root)) && stack1.dates),((stack1 = (data && data.root)) && stack1.scheduleBlockHeight),((stack1 = (data && data.root)) && stack1.gridHeaderHeight),{"name":"month-scheduleBlock","hash":{},"data":data}))
    + ";\n                margin-top:"
    + alias3(container.lambda(((stack1 = (data && data.root)) && stack1.scheduleBlockGutter), depth0))
    + "px\">\n"
    + ((stack1 = (helpers.fi || (depth0 && depth0.fi) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isAllDay : stack1),"||",(depth0 != null ? depth0.hasMultiDates : depth0),{"name":"fi","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(23, data, 0),"data":data})) != null ? stack1 : "")
    + "    </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-exceed-left";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-exceed-right";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "        <div data-schedule-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-calendar-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.calendarId : stack1), depth0))
    + "\" class=\""
    + alias2(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"\n             style=\"height:"
    + alias2(alias1(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; line-height:"
    + alias2(alias1(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; border-radius: "
    + alias2(alias1(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderRadius), depth0))
    + ";\n"
    + ((stack1 = helpers.unless.call(alias3,(depth0 != null ? depth0.exceedLeft : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(alias3,(depth0 != null ? depth0.exceedRight : depth0),{"name":"unless","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data})) != null ? stack1 : "")
    + "                    "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.customStyle : stack1), depth0))
    + "\">\n            <span class=\""
    + alias2(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-title\"\n                  data-title=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.title : stack1), depth0))
    + "\">"
    + ((stack1 = (helpers["allday-tmpl"] || (depth0 && depth0["allday-tmpl"]) || alias4).call(alias3,(depth0 != null ? depth0.model : depth0),{"name":"allday-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n            "
    + ((stack1 = helpers.unless.call(alias3,(helpers.or || (depth0 && depth0.or) || alias4).call(alias3,((stack1 = (data && data.root)) && stack1.isReadOnly),((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isReadOnly : stack1),{"name":"or","hash":{},"data":data}),{"name":"unless","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-focused ";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    margin-left: "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.marginLeft), depth0))
    + ";\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    margin-right: "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.marginRight), depth0))
    + ";\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    color: #ffffff; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; border-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + ";\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.bgColor : stack1), depth0))
    + "; border-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + ";\n";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "<span class=\""
    + alias1(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-resize-handle handle-y\" style=\"line-height: "
    + alias1(container.lambda(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px;\">&nbsp;</span>";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.fi || (depth0 && depth0.fi) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.category : stack1),"===","time",{"name":"fi","hash":{},"fn":container.program(24, data, 0),"inverse":container.program(33, data, 0),"data":data})) != null ? stack1 : "");
},"24":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "                <div data-schedule-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-calendar-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.calendarId : stack1), depth0))
    + "\" class=\""
    + alias2(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule "
    + alias2(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-time\"\n                    style=\"height:"
    + alias2(alias1(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; line-height:"
    + alias2(alias1(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.customStyle : stack1), depth0))
    + "\">\n                    <span class=\""
    + alias2(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-bullet\"\n                        style=\"top: "
    + alias2(alias1(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.scheduleBulletTop), depth0))
    + "px;\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.program(27, data, 0),"data":data})) != null ? stack1 : "")
    + "                            \"\n                    ></span>\n                    <span class=\""
    + alias2(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-title\"\n                        style=\"\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.program(31, data, 0),"data":data})) != null ? stack1 : "")
    + "                            \"\n                        data-title=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.title : stack1), depth0))
    + "\">"
    + ((stack1 = (helpers["time-tmpl"] || (depth0 && depth0["time-tmpl"]) || alias4).call(alias3,(depth0 != null ? depth0.model : depth0),{"name":"time-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n                </div>\n";
},"25":function(container,depth0,helpers,partials,data) {
    return "                                background: #ffffff\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                                background:"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + "\n";
},"29":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                                color: #ffffff;\n                                background-color: "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "\n";
},"31":function(container,depth0,helpers,partials,data) {
    return "                                color:#333;\n";
},"33":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "<div data-schedule-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-calendar-id=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.calendarId : stack1), depth0))
    + "\" class=\""
    + alias2(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"\n                    style=\"height:"
    + alias2(alias1(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; line-height:"
    + alias2(alias1(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; border-radius: "
    + alias2(alias1(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderRadius), depth0))
    + ";\n"
    + ((stack1 = helpers.unless.call(alias3,(depth0 != null ? depth0.exceedLeft : depth0),{"name":"unless","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(alias3,(depth0 != null ? depth0.exceedRight : depth0),{"name":"unless","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(38, data, 0),"inverse":container.program(40, data, 0),"data":data})) != null ? stack1 : "")
    + "                        "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.customStyle : stack1), depth0))
    + "\">\n                    <span class=\""
    + alias2(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-title\"\n                                    data-title=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.title : stack1), depth0))
    + "\">"
    + ((stack1 = (helpers["schedule-tmpl"] || (depth0 && depth0["schedule-tmpl"]) || alias4).call(alias3,(depth0 != null ? depth0.model : depth0),{"name":"schedule-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n                </div>\n";
},"34":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        margin-left: "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.marginLeft), depth0))
    + ";\n";
},"36":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        margin-right: "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.marginRight), depth0))
    + ";\n";
},"38":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        color: #ffffff; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; border-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + ";\n";
},"40":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                        color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.bgColor : stack1), depth0))
    + "; border-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + ";\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.matrices : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/popup/scheduleCreationPopup.hbs":
/*!**************************************************************!*\
  !*** ./src/js/view/template/popup/scheduleCreationPopup.hbs ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "hide";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <li class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section-item "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dropdown-menu-item\" data-calendar-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n                        <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "calendar-dot\" style=\"background-color: "
    + alias4(((helper = (helper = helpers.bgColor || (depth0 != null ? depth0.bgColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bgColor","hash":{},"data":data}) : helper)))
    + "\"></span>\n                        <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n                    </li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "public";
},"7":function(container,depth0,helpers,partials,data) {
    return " checked";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"state","hash":{},"data":data}) : helper)));
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers["popupStateBusy-tmpl"] || (depth0 != null ? depth0["popupStateBusy-tmpl"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"popupStateBusy-tmpl","hash":{},"data":data}) : helper)));
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers["popupUpdate-tmpl"] || (depth0 != null ? depth0["popupUpdate-tmpl"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"popupUpdate-tmpl","hash":{},"data":data}) : helper)));
},"15":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers["popupSave-tmpl"] || (depth0 != null ? depth0["popupSave-tmpl"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"popupSave-tmpl","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-container\">\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dropdown "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "close "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-calendar"
    + ((stack1 = helpers.unless.call(alias1,((stack1 = (depth0 != null ? depth0.calendars : depth0)) != null ? stack1.length : stack1),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <button class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "button "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dropdown-button "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section-item\">\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "calendar-dot\" style=\"background-color: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.selectedCal : depth0)) != null ? stack1.bgColor : stack1), depth0))
    + "\"></span>\n                <span id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "schedule-calendar\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.selectedCal : depth0)) != null ? stack1.name : stack1), depth0))
    + "</span>\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dropdown-arrow\"></span>\n                </span>\n            </button>\n            <ul class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dropdown-menu\" style=\"z-index: "
    + alias4(((helper = (helper = helpers.zIndex || (depth0 != null ? depth0.zIndex : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"zIndex","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.calendars : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n        </div>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section\">\n            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section-item "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-title\">\n            <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-title\"></span>\n            <input id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "schedule-title\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\" placeholder=\""
    + alias4(((helper = (helper = helpers["titlePlaceholder-tmpl"] || (depth0 != null ? depth0["titlePlaceholder-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"titlePlaceholder-tmpl","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"></span>\n            </div>\n            <button id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "schedule-private\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "button "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-private"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.isPrivate : depth0),{"name":"unless","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-private\"></span>\n            </button>\n        </div>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section\">\n            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section-item "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-location\">\n            <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-location\"></span>\n                <input id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "schedule-location\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\" placeholder=\""
    + alias4(((helper = (helper = helpers["locationPlaceholder-tmpl"] || (depth0 != null ? depth0["locationPlaceholder-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"locationPlaceholder-tmpl","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.location || (depth0 != null ? depth0.location : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"location","hash":{},"data":data}) : helper)))
    + "\"></span>\n            </div>\n        </div>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section\">\n            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section-item "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-start-date\">\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-date\"></span>\n                <input id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "schedule-start-date\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\" placeholder=\""
    + alias4(((helper = (helper = helpers["startDatePlaceholder-tmpl"] || (depth0 != null ? depth0["startDatePlaceholder-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"startDatePlaceholder-tmpl","hash":{},"data":data}) : helper)))
    + "\"></span>\n                <div id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "startpicker-container\" style=\"margin-left: -1px; position: relative\"></div>\n            </div>\n            <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-date-dash\">-</span>\n            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section-item "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-end-date\">\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-date\"></span>\n                <input id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "schedule-end-date\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\" placeholder=\""
    + alias4(((helper = (helper = helpers["endDatePlaceholder-tmpl"] || (depth0 != null ? depth0["endDatePlaceholder-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"endDatePlaceholder-tmpl","hash":{},"data":data}) : helper)))
    + "\"></span>\n                <div id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "endpicker-container\" style=\"margin-left: -1px; position: relative\"></div>\n            </div>\n            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section-item "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-allday\">\n                <input id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "schedule-allday\" type=\"checkbox\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "checkbox-square\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isAllDay : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "></input>\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-checkbox\"></span>\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4(((helper = (helper = helpers["popupIsAllDay-tmpl"] || (depth0 != null ? depth0["popupIsAllDay-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"popupIsAllDay-tmpl","hash":{},"data":data}) : helper)))
    + "</span>\n            </div>\n        </div>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dropdown "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "close "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-state\">\n            <button class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "button "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dropdown-button "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section-item\">\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-state\"></span>\n                <span id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "schedule-state\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.state : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "</span>\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dropdown-arrow\"></span>\n            </button>\n            <ul class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dropdown-menu\" style=\"z-index: "
    + alias4(((helper = (helper = helpers.zIndex || (depth0 != null ? depth0.zIndex : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"zIndex","hash":{},"data":data}) : helper)))
    + "\">\n                <li class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section-item "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dropdown-menu-item\">\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "none\"></span>\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4(((helper = (helper = helpers["popupStateBusy-tmpl"] || (depth0 != null ? depth0["popupStateBusy-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"popupStateBusy-tmpl","hash":{},"data":data}) : helper)))
    + "</span>\n                </li>\n                <li class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section-item "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dropdown-menu-item\">\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "none\"></span>\n                <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4(((helper = (helper = helpers["popupStateFree-tmpl"] || (depth0 != null ? depth0["popupStateFree-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"popupStateFree-tmpl","hash":{},"data":data}) : helper)))
    + "</span>\n                </li>\n            </ul>\n        </div>\n        <button class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "button "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-close\"><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-close\"></span></button>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-button-save\"><button class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "button "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "confirm "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-save\"><span>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isEditMode : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "</span></button></div>\n    </div>\n    <div id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-arrow\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-arrow "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "arrow-bottom\">\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-arrow-border\">\n            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-arrow-fill\"></div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/popup/scheduleDetailPopup.hbs":
/*!************************************************************!*\
  !*** ./src/js/view/template/popup/scheduleDetailPopup.hbs ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-detail-item\"><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-location-b\"></span><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4((helpers["popupDetailLocation-tmpl"] || (depth0 && depth0["popupDetailLocation-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.schedule : depth0),{"name":"popupDetailLocation-tmpl","hash":{},"data":data}))
    + "</span></div>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-detail-item\"><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-user-b\"></span><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4((helpers["popupDetailUser-tmpl"] || (depth0 && depth0["popupDetailUser-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.schedule : depth0),{"name":"popupDetailUser-tmpl","hash":{},"data":data}))
    + "</span></div>";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-detail-item\"><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-state-b\"></span><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4((helpers["popupDetailState-tmpl"] || (depth0 && depth0["popupDetailState-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.schedule : depth0),{"name":"popupDetailState-tmpl","hash":{},"data":data}))
    + "</span></div>";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-detail-item\"><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "calendar-dot\" style=\"background-color: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.schedule : depth0)) != null ? stack1.bgColor : stack1), depth0))
    + "\"></span><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.calendar : depth0)) != null ? stack1.name : stack1), depth0))
    + "</span></div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-button\">\n      <button class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-edit\"><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-edit\"></span><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4(((helper = (helper = helpers["popupEdit-tmpl"] || (depth0 != null ? depth0["popupEdit-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"popupEdit-tmpl","hash":{},"data":data}) : helper)))
    + "</span></button>\n      <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-vertical-line\"></div>\n      <button class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-delete\"><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-delete\"></span><span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4(((helper = (helper = helpers["popupDelete-tmpl"] || (depth0 != null ? depth0["popupDelete-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"popupDelete-tmpl","hash":{},"data":data}) : helper)))
    + "</span></button>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-detail\">\n  <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-container\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-section "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-header\">\n      <div>\n        <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "schedule-private "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-private\"></span>\n        <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "schedule-title\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.schedule : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span>\n      </div>\n      <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-detail-date "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "content\">"
    + alias4((helpers["popupDetailDate-tmpl"] || (depth0 && depth0["popupDetailDate-tmpl"]) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.schedule : depth0)) != null ? stack1.isAllDay : stack1),((stack1 = (depth0 != null ? depth0.schedule : depth0)) != null ? stack1.start : stack1),((stack1 = (depth0 != null ? depth0.schedule : depth0)) != null ? stack1.end : stack1),{"name":"popupDetailDate-tmpl","hash":{},"data":data}))
    + "</div>\n    </div>\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "section-detail\">\n        "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.schedule : depth0)) != null ? stack1.location : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.schedule : depth0)) != null ? stack1.attendees : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.schedule : depth0)) != null ? stack1.state : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.calendar : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.schedule : depth0)) != null ? stack1.isReadOnly : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "  </div>\n  <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-top-line\" style=\"background-color: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.schedule : depth0)) != null ? stack1.bgColor : stack1), depth0))
    + "\"></div>\n  <div id=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-arrow\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-arrow "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "arrow-left\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-arrow-border\">\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "popup-arrow-fill\"></div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/week/dayGrid.hbs":
/*!***********************************************!*\
  !*** ./src/js/view/template/week/dayGrid.hbs ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-grid-line\"\n                style=\"left:"
    + alias4(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"left","hash":{},"data":data}) : helper)))
    + "%; width:"
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + "%; background-color: "
    + alias4(((helper = (helper = helpers.backgroundColor || (depth0 != null ? depth0.backgroundColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundColor","hash":{},"data":data}) : helper)))
    + ";\n"
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            \"></div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    border-right: "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderRight), depth0))
    + ";\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.days : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (data && data.root)) && stack1.collapsed),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.hiddenSchedules : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-exceed-in-week\" style=\"z-index: 1; right:"
    + alias4((helpers.getRight || (depth0 && depth0.getRight) || alias2).call(alias1,(depth0 != null ? depth0.left : depth0),(depth0 != null ? depth0.width : depth0),{"name":"getRight","hash":{},"data":data}))
    + "%;\" data-index=\""
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4((helpers["weekGridFooterExceed-tmpl"] || (depth0 && depth0["weekGridFooterExceed-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.hiddenSchedules : depth0),{"name":"weekGridFooterExceed-tmpl","hash":{},"data":data}))
    + "</span>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.fi || (depth0 && depth0.fi) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.key),"===",((stack1 = (data && data.root)) && stack1.collapseBtnIndex),{"name":"fi","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                    <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-collapse-btn\" style=\"z-index: 1; right:"
    + alias4((helpers.getRight || (depth0 && depth0.getRight) || alias2).call(alias1,(depth0 != null ? depth0.left : depth0),(depth0 != null ? depth0.width : depth0),{"name":"getRight","hash":{},"data":data}))
    + "%;\">"
    + ((stack1 = ((helper = (helper = helpers["collapseBtnTitle-tmpl"] || (depth0 != null ? depth0["collapseBtnTitle-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collapseBtnTitle-tmpl","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + alias4(((helper = (helper = helpers.viewName || (depth0 != null ? depth0.viewName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"viewName","hash":{},"data":data}) : helper)))
    + "-left "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "left\" style=\"border-right: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.leftBorderRight : stack1), depth0))
    + "; width: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.leftWidth : stack1), depth0))
    + "; background-color: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.leftBackgroundColor : stack1), depth0))
    + "; padding-right: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.leftPaddingRight : stack1), depth0))
    + ";\">\n    "
    + ((stack1 = (helpers["dayGridTitle-tmpl"] || (depth0 && depth0["dayGridTitle-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.viewName : depth0),{"name":"dayGridTitle-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "\n</div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + alias4(((helper = (helper = helpers.viewName || (depth0 != null ? depth0.viewName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"viewName","hash":{},"data":data}) : helper)))
    + "-right "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "right\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "container\">\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-grid\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.days : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.showExpandableButton),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/week/dayGridSchedule.hbs":
/*!*******************************************************!*\
  !*** ./src/js/view/template/week/dayGridSchedule.hbs ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n    "
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n    "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function", alias5=container.lambda;

  return "\n    <div data-id=\""
    + alias3((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\"\n        class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-block\n            "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.exceedLeft : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n            "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.exceedRight : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"\n        style=\"top:"
    + alias3((helpers.multiply || (depth0 && depth0.multiply) || alias2).call(alias1,(depth0 != null ? depth0.top : depth0),((stack1 = (data && data.root)) && stack1.scheduleBlockHeight),{"name":"multiply","hash":{},"data":data}))
    + "px;\n                left:"
    + alias3((helpers["grid-left"] || (depth0 && depth0["grid-left"]) || alias2).call(alias1,depth0,((stack1 = (data && data.root)) && stack1.dates),{"name":"grid-left","hash":{},"data":data}))
    + "%;\n                width:"
    + alias3((helpers["grid-width"] || (depth0 && depth0["grid-width"]) || alias2).call(alias1,depth0,((stack1 = (data && data.root)) && stack1.dates),{"name":"grid-width","hash":{},"data":data}))
    + "%\">\n        <div data-schedule-id=\""
    + alias3(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-calendar-id=\""
    + alias3(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.calendarId : stack1), depth0))
    + "\" class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"\n            style=\"height:"
    + alias3(alias5(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; line-height:"
    + alias3(alias5(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px; border-radius: "
    + alias3(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderRadius), depth0))
    + ";\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "            "
    + alias3(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.customStyle : stack1), depth0))
    + "\">\n            <span class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-title\" title=\""
    + alias3(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.title : stack1), depth0))
    + "\">"
    + ((stack1 = (helpers["schedule-tmpl"] || (depth0 && depth0["schedule-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"schedule-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n            "
    + ((stack1 = helpers.unless.call(alias1,(helpers.or || (depth0 && depth0.or) || alias2).call(alias1,((stack1 = (data && data.root)) && stack1.isReadOnly),((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isReadOnly : stack1),{"name":"or","hash":{},"data":data}),{"name":"unless","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n    </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-exceed-left";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-exceed-right";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedule-focused ";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    color: #ffffff; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; border-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + ";\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.bgColor : stack1), depth0))
    + "; border-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + ";\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "<span class=\""
    + alias1(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-resize-handle handle-y\" style=\"line-height:"
    + alias1(container.lambda(((stack1 = (data && data.root)) && stack1.scheduleHeight), depth0))
    + "px;\">&nbsp;</span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "weekday-schedules "
    + alias4(((helper = (helper = helpers.collapsed || (depth0 != null ? depth0.collapsed : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collapsed","hash":{},"data":data}) : helper)))
    + "\"style=\"top:"
    + alias4(container.lambda(((stack1 = (data && data.root)) && stack1.scheduleContainerTop), depth0))
    + "px;\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.matrices : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/week/daynames.hbs":
/*!************************************************!*\
  !*** ./src/js/view/template/week/daynames.hbs ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dayname "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isToday : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias4((helpers.holiday || (depth0 && depth0.holiday) || alias2).call(alias1,(depth0 != null ? depth0.day : depth0),{"name":"holiday","hash":{},"data":data}))
    + "\"\n     data-date=\""
    + alias4(((helper = (helper = helpers.renderDate || (depth0 != null ? depth0.renderDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"renderDate","hash":{},"data":data}) : helper)))
    + "\"\n     style=\""
    + alias4((helpers["common-width"] || (depth0 && depth0["common-width"]) || alias2).call(alias1,(depth0 != null ? depth0.width : depth0),{"name":"common-width","hash":{},"data":data}))
    + ";left:"
    + alias4(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"left","hash":{},"data":data}) : helper)))
    + "%; line-height: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.height), depth0))
    + "; border-left: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderLeft), depth0))
    + "; padding-left: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.paddingLeft), depth0))
    + ";\">\n    <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dayname-date-area\" style=\"color: "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\">\n        "
    + ((stack1 = (helpers["weekDayname-tmpl"] || (depth0 && depth0["weekDayname-tmpl"]) || alias2).call(alias1,depth0,{"name":"weekDayname-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "\n    </span>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "today";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\""
    + alias2(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dayname-leftmargin\" style=\"margin-left: "
    + alias2(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.marginLeft), depth0))
    + ";\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.dayNames : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/week/time.hbs":
/*!********************************************!*\
  !*** ./src/js/view/template/week/time.hbs ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-date-schedule-block "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isPending : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-id=\""
    + alias4((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\"\n            style=\""
    + alias4((helpers["time-scheduleBlock"] || (depth0 && depth0["time-scheduleBlock"]) || alias2).call(alias1,depth0,{"name":"time-scheduleBlock","hash":{},"data":data}))
    + ";\n"
    + ((stack1 = (helpers.fi || (depth0 && depth0.fi) || alias2).call(alias1,(depth0 != null ? depth0.left : depth0),"!==",0,{"name":"fi","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            \">\n            <div data-schedule-id=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.id : stack1), depth0))
    + "\" data-calendar-id=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.calendarId : stack1), depth0))
    + "\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"\n                style=\"\n"
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.croppedEnd : depth0),{"name":"unless","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.croppedStart : depth0),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "                 "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.customStyle : stack1), depth0))
    + "\"\n            >\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasGoingDuration : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-content "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-content-time\" style=\"height: "
    + alias4(((helper = (helper = helpers.modelDurationHeight || (depth0 != null ? depth0.modelDurationHeight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"modelDurationHeight","hash":{},"data":data}) : helper)))
    + "px;\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data})) != null ? stack1 : "")
    + "                "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasComingDuration : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n                    "
    + ((stack1 = (helpers["time-tmpl"] || (depth0 && depth0["time-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"time-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "\n                </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasComingDuration : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n            "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.croppedEnd : depth0),{"name":"unless","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-date-schedule-block-pending";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    padding-left: "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.paddingLeft), depth0))
    + ";\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-focused ";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    border-bottom-left-radius: "
    + alias2(alias1(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderRadius), depth0))
    + ";\n                    border-bottom-right-radius: "
    + alias2(alias1(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderRadius), depth0))
    + ";\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    border-top-left-radius: "
    + alias2(alias1(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderRadius), depth0))
    + ";\n                    border-top-right-radius: "
    + alias2(alias1(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderRadius), depth0))
    + ";\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    color: #ffffff; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; border-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + ";\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "                    color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; background-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.bgColor : stack1), depth0))
    + "; border-color:"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + ";\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-content "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-content-travel-time\" style=\"height: "
    + alias4(((helper = (helper = helpers.goingDurationHeight || (depth0 != null ? depth0.goingDurationHeight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"goingDurationHeight","hash":{},"data":data}) : helper)))
    + "px;\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data})) != null ? stack1 : "")
    + "                border-bottom: 1px dashed "
    + alias4(((helper = (helper = helpers.travelBorderColor || (depth0 != null ? depth0.travelBorderColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"travelBorderColor","hash":{},"data":data}) : helper)))
    + ";\">"
    + ((stack1 = (helpers["goingDuration-tmpl"] || (depth0 && depth0["goingDuration-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"goingDuration-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    border-color:"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + ";\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    border-color:"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + ";\n";
},"24":function(container,depth0,helpers,partials,data) {
    var helper;

  return "border-bottom: 1px dashed "
    + container.escapeExpression(((helper = (helper = helpers.travelBorderColor || (depth0 != null ? depth0.travelBorderColor : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"travelBorderColor","hash":{},"data":data}) : helper)))
    + ";";
},"26":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-content "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-content-travel-time\" style=\"height: "
    + alias4(((helper = (helper = helpers.comingDurationHeight || (depth0 != null ? depth0.comingDurationHeight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comingDurationHeight","hash":{},"data":data}) : helper)))
    + "px;\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.isFocused : stack1),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(27, data, 0),"data":data})) != null ? stack1 : "")
    + ";\">"
    + ((stack1 = (helpers["comingDuration-tmpl"] || (depth0 && depth0["comingDuration-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"comingDuration-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    border-color:"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + ";\n                ";
},"29":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "<div class=\""
    + alias1(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-resize-handle handle-x\" style=\"margin-left: "
    + alias1(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.paddingLeft), depth0))
    + ";\">&nbsp;</div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return "<div class=\""
    + alias2(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-date-schedule-block-wrap\" style=\"margin-right: "
    + alias2(container.lambda(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.marginRight : stack1), depth0))
    + ";\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.matrices : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/week/timeGrid.hbs":
/*!************************************************!*\
  !*** ./src/js/view/template/week/timeGrid.hbs ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-timezone\" data-timezone-index=\""
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" style=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hidden : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "position: absolute; top: 0; width: "
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + "%; left: "
    + alias4(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"left","hash":{},"data":data}) : helper)))
    + "%; border-right: "
    + alias4(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.leftBorderRight), depth0))
    + "; background-color: "
    + alias4(((helper = (helper = helpers.backgroundColor || (depth0 != null ? depth0.backgroundColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundColor","hash":{},"data":data}) : helper)))
    + ";\" >\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isPrimary : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "display:none;";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.timeSlots : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.showHourMarker),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hour\" style=\"height: "
    + alias4(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.oneHourHeight), depth0))
    + "; color: "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + "; font-weight: "
    + alias4(((helper = (helper = helpers.fontWeight || (depth0 != null ? depth0.fontWeight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fontWeight","hash":{},"data":data}) : helper)))
    + ";\">\n                    <span style=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hidden : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = (helpers["timegridDisplayPrimayTime-tmpl"] || (depth0 && depth0["timegridDisplayPrimayTime-tmpl"]) || alias2).call(alias1,depth0,{"name":"timegridDisplayPrimayTime-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n                </div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "display:none";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "                <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker\" style=\"top:"
    + alias4(alias5(((stack1 = (data && data.root)) && stack1.hourmarkerTop), depth0))
    + "%; margin-top: calc(6px - "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.halfHourHeight), depth0))
    + "); height: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.halfHourHeight), depth0))
    + ";\">\n                    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker-time\" style=\"color: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.currentTimeColor), depth0))
    + "; font-size: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.currentTimeFontSize), depth0))
    + "; font-weight: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.currentTimeFontWeight), depth0))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.hourmarkerText || (depth0 != null ? depth0.hourmarkerText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hourmarkerText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n                </div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.timeSlots : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.showHourMarker),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hour\" style=\"height: "
    + alias4(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.oneHourHeight), depth0))
    + "; color: "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + "; font-weight: "
    + alias4(((helper = (helper = helpers.fontWeight || (depth0 != null ? depth0.fontWeight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fontWeight","hash":{},"data":data}) : helper)))
    + ";\">\n                    <span style=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hidden : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = (helpers["timegridDisplayTime-tmpl"] || (depth0 && depth0["timegridDisplayTime-tmpl"]) || alias2).call(alias1,depth0,{"name":"timegridDisplayTime-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n                </div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "                <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker\" style=\"top:"
    + alias4(alias5(((stack1 = (data && data.root)) && stack1.hourmarkerTop), depth0))
    + "%; margin-top: calc(6px - "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.halfHourHeight), depth0))
    + "); height: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.halfHourHeight), depth0))
    + ";\">\n                    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker-time\" style=\"color: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.currentTimeColor), depth0))
    + "; font-size: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.currentTimeFontSize), depth0))
    + ";\">"
    + ((stack1 = ((helper = (helper = helpers.hourmarkerText || (depth0 != null ? depth0.hourmarkerText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hourmarkerText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n                </div>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-gridline\" style=\"height: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.oneHourHeight), depth0))
    + ";\n"
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        \">\n            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-gridline-half\" style=\"height: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.halfHourHeight), depth0))
    + "; border-bottom: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.halfHourBorderBottom), depth0))
    + ";\"></div>\n        </div>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            border-bottom: "
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.borderBottom), depth0))
    + ";\n";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker\" style=\"top:"
    + alias4(((helper = (helper = helpers.hourmarkerTop || (depth0 != null ? depth0.hourmarkerTop : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hourmarkerTop","hash":{},"data":data}) : helper)))
    + "%\">\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker-line-left\" style=\"width:"
    + alias4(((helper = (helper = helpers.todaymarkerLeft || (depth0 != null ? depth0.todaymarkerLeft : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"todaymarkerLeft","hash":{},"data":data}) : helper)))
    + "%; border-top: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.currentTimeLeftBorderTop : stack1), depth0))
    + ";\"></div>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-todaymarker\" style=\"left:"
    + alias4(((helper = (helper = helpers.todaymarkerLeft || (depth0 != null ? depth0.todaymarkerLeft : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"todaymarkerLeft","hash":{},"data":data}) : helper)))
    + "%; background-color: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.currentTimeBulletBackgroundColor : stack1), depth0))
    + "; \">today</div>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker-line-today\" style=\"left:"
    + alias4(((helper = (helper = helpers.todaymarkerLeft || (depth0 != null ? depth0.todaymarkerLeft : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"todaymarkerLeft","hash":{},"data":data}) : helper)))
    + "%; width: "
    + alias4(((helper = (helper = helpers.todaymarkerWidth || (depth0 != null ? depth0.todaymarkerWidth : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"todaymarkerWidth","hash":{},"data":data}) : helper)))
    + "%; border-top: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.currentTimeTodayBorderTop : stack1), depth0))
    + ";\"></div>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker-line-right\" style=\"left:"
    + alias4(((helper = (helper = helpers.todaymarkerRight || (depth0 != null ? depth0.todaymarkerRight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"todaymarkerRight","hash":{},"data":data}) : helper)))
    + "%; border-top: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.currentTimeRightBorderTop : stack1), depth0))
    + ";\"></div>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-left\" style=\"width: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.leftWidth : stack1), depth0))
    + "; font-size: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.styles : depth0)) != null ? stack1.leftFontSize : stack1), depth0))
    + ";\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.timezones : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-right\" style=\"margin-left: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.leftWidth), depth0))
    + ";\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-h-grid\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.hoursLabels : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-schedules\">\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-schedules-container\"></div>\n    </div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.showHourMarker : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/week/timeMoveGuide.hbs":
/*!*****************************************************!*\
  !*** ./src/js/view/template/week/timeMoveGuide.hbs ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-content "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-content-travel-time\" style=\"border-color:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + "; border-bottom: 1px dashed "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; height: "
    + alias4(((helper = (helper = helpers.goingDurationHeight || (depth0 != null ? depth0.goingDurationHeight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"goingDurationHeight","hash":{},"data":data}) : helper)))
    + "%;\">"
    + ((stack1 = (helpers["goingDuration-tmpl"] || (depth0 && depth0["goingDuration-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"goingDuration-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-content "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-content-travel-time\" style=\"border-color:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + "; border-top: 1px dashed "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "; height: "
    + alias4(((helper = (helper = helpers.comingDurationHeight || (depth0 != null ? depth0.comingDurationHeight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comingDurationHeight","hash":{},"data":data}) : helper)))
    + "%;\">"
    + ((stack1 = (helpers["comingDuration-tmpl"] || (depth0 && depth0["comingDuration-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"comingDuration-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\""
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-resize-handle handle-x\">&nbsp;</div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-date-schedule-block\" data-id=\""
    + alias4((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\" style=\"width: 100%; height: 100%;\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-date-schedule-block-focused\" style=\"color: #ffffff; background-color:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.dragBgColor : stack1), depth0))
    + ";\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasGoingDuration : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-schedule-content\" style=\"height: "
    + alias4(((helper = (helper = helpers.modelDurationHeight || (depth0 != null ? depth0.modelDurationHeight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"modelDurationHeight","hash":{},"data":data}) : helper)))
    + "%; border-color:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.borderColor : stack1), depth0))
    + ";\">\n                "
    + ((stack1 = (helpers["time-tmpl"] || (depth0 && depth0["time-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"time-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "\n            </div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasComingDuration : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.croppedEnd : depth0),{"name":"unless","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-date-schedule-block-cover\"></div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./src/js/view/template/week/timezoneSticky.hbs":
/*!******************************************************!*\
  !*** ./src/js/view/template/week/timezoneSticky.hbs ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ./node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-timezone-label-container\" style=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hidden : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "background-color: "
    + alias4(((helper = (helper = helpers.backgroundColor || (depth0 != null ? depth0.backgroundColor : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"backgroundColor","hash":{},"data":data}) : helper)))
    + "; height: 100%; width: "
    + alias4(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"width","hash":{},"data":data}) : helper)))
    + "%; left: "
    + alias4(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"left","hash":{},"data":data}) : helper)))
    + "%; font-size: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.leftFontSize), depth0))
    + "; border-right: "
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.leftBorderRight), depth0))
    + ";\">\n    <div title=\""
    + alias4(((helper = (helper = helpers.tooltip || (depth0 != null ? depth0.tooltip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tooltip","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-timezone-label-cell\" data-timezone=\""
    + alias4(((helper = (helper = helpers.displayLabel || (depth0 != null ? depth0.displayLabel : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayLabel","hash":{},"data":data}) : helper)))
    + "\" style=\"height: 100%; width: 100%;\">\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.and || (depth0 && depth0.and) || alias2).call(alias1,(depth0 != null ? depth0.isPrimary : depth0),((stack1 = (data && data.root)) && stack1.showTimezoneCollapseButton),{"name":"and","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-timezone-label\">"
    + ((stack1 = (helpers["timezoneDisplayLabel-tmpl"] || (depth0 && depth0["timezoneDisplayLabel-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.timezoneOffset : depth0),(depth0 != null ? depth0.displayLabel : depth0),{"name":"timezoneDisplayLabel-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n    </div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "display:none;";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-timezone-close-btn\" style=\"border: 1px solid #ddd; top:2px; bottom: 2px; width: 10px; border-left: none;\">\n                <span style=\"color: #777; height: calc("
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.displayTimezoneLabelHeight), depth0))
    + " - 6px); line-height: calc("
    + alias4(alias5(((stack1 = ((stack1 = (data && data.root)) && stack1.styles)) && stack1.displayTimezoneLabelHeight), depth0))
    + " - 6px);\">\n                    <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "icon "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (data && data.root)) && stack1.timezonesCollapsed),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n                </span>\n            </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-arrow-right";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "ic-arrow-left";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.each.call(alias1,(helpers.reverse || (depth0 && depth0.reverse) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.timezones : depth0),{"name":"reverse","hash":{},"data":data}),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

/***/ }),

/***/ "./src/js/view/view.js":
/*!*****************************!*\
  !*** ./src/js/view/view.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview The base class of views.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var domutil = __webpack_require__(/*! ../common/domutil */ "./src/js/common/domutil.js");
var Collection = __webpack_require__(/*! ../common/collection */ "./src/js/common/collection.js");

/**
 * Base class of views.
 *
 * All views create own container element inside supplied container element.
 * @constructor
 * @param {HTMLElement} container Default container element for view.
 *  you can use this element for this.container syntax.
 */
function View(container) {
    var id = util.stamp(this);

    if (util.isUndefined(container)) {
        container = domutil.appendHTMLElement('div');
    }

    domutil.addClass(container, this.cssprefix(id));

    /**
     * unique id
     * @type {number}
     */
    this.id = id;

    /**
     * base element of view.
     * @type {HTMLDIVElement}
     */
    this.container = container;

    /*eslint-disable*/
    /**
     * child views.
     * @type {Collection}
     */
    this.children = new Collection(function(view) {
        return util.stamp(view);
    });
    /* eslint-enable*/

    /**
     * parent view instance.
     * @type {View}
     */
    this.parent = null;

    /**
     * state of view
     */
    this.state = {};
}

/**
 * CSS classname prefix
 * @type {string}
 */
View.prototype.cssPrefix = 'tui-view-';

/**
 * Add child views.
 * @param {View} view The view instance to add.
 * @param {function} [fn] Function for invoke before add. parent view class is supplied first arguments.
 */
View.prototype.addChild = function(view, fn) {
    if (fn) {
        fn.call(view, this);
    }
    // add parent view
    view.parent = this;

    this.children.add(view);
};

/**
 * Remove added child view.
 * @param {(number|View)} id View id or instance itself to remove.
 * @param {function} [fn] Function for invoke before remove. parent view class is supplied first arguments.
 */
View.prototype.removeChild = function(id, fn) {
    var view = util.isNumber(id) ? this.children.items[id] : id;

    id = util.stamp(view);

    if (fn) {
        fn.call(view, this);
    }

    this.children.remove(id);
};

/**
 * Render view recursively.
 */
View.prototype.render = function() {
    this.children.each(function(childView) {
        childView.render();
    });
};

/**
 * Invoke function recursively.
 * @param {function} fn - function to invoke child view recursively
 * @param {boolean} [skipThis=false] - set true then skip invoke with this(root) view.
 */
View.prototype.recursive = function(fn, skipThis) {
    if (!util.isFunction(fn)) {
        return;
    }

    if (!skipThis) {
        fn(this);
    }

    this.children.each(function(childView) {
        childView.recursive(fn);
    });
};

/**
 * Resize view recursively to parent.
 */
View.prototype.resize = function() {
    var args = Array.prototype.slice.call(arguments),
        parent = this.parent;

    while (parent) {
        if (util.isFunction(parent._onResize)) {
            parent._onResize.apply(parent, args);
        }

        parent = parent.parent;
    }
};

/**
 * Invoking method before destroying.
 */
View.prototype._beforeDestroy = function() {};

/**
 * Clear properties
 */
View.prototype._destroy = function() {
    this._beforeDestroy();
    this.children.clear();
    this.container.innerHTML = '';

    this.id = this.parent = this.children = this.container = null;
};

/*eslint-disable*/
/**
 * Destroy child view recursively.
 */
View.prototype.destroy = function(isChildView) {
    this.children.each(function(childView) {
        childView.destroy(true);
        childView._destroy();
    });

    if (isChildView) {
        return;
    }

    this._destroy();
};
/* eslint-enable*/

/**
 * Calculate view's container element bound.
 * @returns {object} The bound of container element.
 */
View.prototype.getViewBound = function() {
    var container = this.container,
        position = domutil.getPosition(container),
        size = domutil.getSize(container);

    return {
        x: position[0],
        y: position[1],
        width: size[0],
        height: size[1]
    };
};

/**
 * Return view default CSS prefix
 * @param {string} [className] - if supplied then return prefix added class name
 * @returns {string} CSS prefix value
 */
View.prototype.cssprefix = function(className) {
    return this.cssPrefix + (className || '');
};

/**
 * set state
 * @param {object} state - state
 */
View.prototype.setState = function(state) {
    util.extend(this.state, state);
};

util.CustomEvents.mixin(View);

module.exports = View;



/***/ }),

/***/ "./src/js/view/week/dayGrid.js":
/*!*************************************!*\
  !*** ./src/js/view/week/dayGrid.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview DayGrid in weekly view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js"),
    common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js"),
    datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js"),
    domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js"),
    TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date,
    View = __webpack_require__(/*! ../../view/view */ "./src/js/view/view.js"),
    DayGridSchedule = __webpack_require__(/*! ./dayGridSchedule */ "./src/js/view/week/dayGridSchedule.js"),
    baseTmpl = __webpack_require__(/*! ../template/week/dayGrid.hbs */ "./src/js/view/template/week/dayGrid.hbs"),
    reqAnimFrame = __webpack_require__(/*! ../../common/reqAnimFrame */ "./src/js/common/reqAnimFrame.js");
var mmax = Math.max,
    mmin = Math.min;

/**
 * @constructor
 * @extends {Weekday}
 * @param {string} name - view name
 * @param {object} options - options for DayGridSchedule view
 * @param {number} [options.heightPercent] - height percent of view
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to
 *  make create easy.
 * @param {number} [options.scheduleHeight=18] - height of each schedule block.
 * @param {number} [options.scheduleGutter=2] - gutter height of each schedule block.
 * @param {HTMLDIVElement} container - DOM element to use container for this
 *  view.
 * @param {Theme} theme - theme instance
 */
function DayGrid(name, options, container, theme) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('daygrid-layout')
    );
    View.call(this, container);

    name = name || 'daygrid';

    this.options = util.extend({
        viewName: name,
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        renderStartDate: '',
        renderEndDate: '',
        containerBottomGutter: 18,
        scheduleHeight: parseInt(theme.week.dayGridSchedule.height, 10),
        scheduleGutter: parseInt(theme.week.dayGridSchedule.marginTop, 10),
        scheduleContainerTop: 1,
        timezones: options.timezones,
        isReadOnly: options.isReadOnly,
        getViewModelFunc: function(viewModel) {
            return viewModel.schedulesInDateRange[name];
        },
        setViewModelFunc: function(viewModel, matrices) {
            viewModel.schedulesInDateRange[name] = matrices;
        }
    }, options.week);

    this.handler = {};
    this.vPanel = null;

    this.state.collapsed = true;
}

util.inherit(DayGrid, View);

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
DayGrid.prototype.getBaseViewModel = function(viewModel) {
    var opt = this.options,
        daynames = opt.daynames,
        range = viewModel.range,
        grids = viewModel.grids,
        matrices = opt.getViewModelFunc(viewModel),
        exceedDate = {},
        panel = getPanel(opt.panels, opt.viewName),
        panelHeight = this.getViewBound().height,
        collapsed = this.state.collapsed,
        heightForcedSet = this.vPanel ? this.vPanel.getHeightForcedSet() : false,
        timezonesCollapsed = viewModel.state.timezonesCollapsed,
        styles = this._getStyles(viewModel.theme, timezonesCollapsed);

    var baseViewModel, visibleScheduleCount;

    if (panel.showExpandableButton) {
        if (!heightForcedSet) {
            if (collapsed) {
                panelHeight = mmax(panelHeight, panel.maxHeight);
            } else {
                panelHeight = mmin(panelHeight, panel.maxExpandableHeight);
            }
        }

        visibleScheduleCount = Math.floor(panelHeight / (opt.scheduleHeight + opt.scheduleGutter));
        if (collapsed) {
            exceedDate = this.parent.controller.getExceedDate(visibleScheduleCount,
                matrices,
                viewModel.range
            );
            matrices = this.parent.controller.excludeExceedSchedules(matrices, visibleScheduleCount);
            opt.setViewModelFunc(viewModel, matrices);
        }
    }

    baseViewModel = {
        viewName: opt.viewName,
        range: range,
        grids: grids,
        days: util.map(viewModel.range, function(d, index) {
            var day = d.getDay();
            var ymd = datetime.format(d, 'YYYYMMDD');
            var isToday = datetime.isSameDate(d, new TZDate());

            return {
                day: day,
                dayName: daynames[day],
                isToday: isToday,
                date: d.getDate(),
                renderDate: datetime.format(d, 'YYYY-MM-DD'),
                hiddenSchedules: exceedDate[ymd] || 0,
                width: grids[index] ? grids[index].width : 0,
                left: grids[index] ? grids[index].left : 0,
                backgroundColor: viewModel.range.length > 1 ?
                    getWeekBackgroundColor(day, isToday, styles) : styles.backgroundColor
            };
        }),
        exceedDate: exceedDate,
        showExpandableButton: panel.showExpandableButton,
        collapsed: collapsed,
        collapseBtnIndex: this.state.clickedExpandBtnIndex,
        styles: styles
    };

    return baseViewModel;
};

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
DayGrid.prototype.render = function(viewModel) {
    var opt = this.options,
        container = this.container,
        baseViewModel = this.getBaseViewModel(viewModel),
        scheduleContainerTop = this.options.scheduleContainerTop;
    var dayGridSchedule;

    container.innerHTML = baseTmpl(baseViewModel);

    this.children.clear();

    dayGridSchedule = new DayGridSchedule(
        opt,
        domutil.find(config.classname('.container'), container)
    );
    this.addChild(dayGridSchedule);

    dayGridSchedule.on('afterRender', function(weekdayViewModel) {
        baseViewModel.height = weekdayViewModel.minHeight + scheduleContainerTop;
    });

    this.children.each(function(childView) {
        childView.render(viewModel);
    }, this);

    this.fire('afterRender', baseViewModel);
};

DayGrid.prototype._beforeDestroy = function() {
};

DayGrid.prototype.addHandler = function(type, handler, vPanel) {
    var self = this;

    this.handler[type] = handler;
    this.vPanel = vPanel;

    if (type === 'click') {
        handler.on('expand', function() {
            self.setState({
                collapsed: false
            });
        }, this);
        handler.on('collapse', function() {
            self.setState({
                collapsed: true
            });
        }, this);
    }
};

DayGrid.prototype._expand = function() {
    reqAnimFrame.requestAnimFrame(function() {
        var vPanel = this.vPanel;
        var opt = this.options;
        var panel = getPanel(opt.panels, opt.viewName);

        vPanel.setMaxHeight(panel.maxExpandableHeight);
        vPanel.setHeightForcedSet(false);
        vPanel.setHeight(null, panel.maxExpandableHeight);

        if (this.parent) {
            this.parent.render();
        }
    }, this);
};

DayGrid.prototype._collapse = function() {
    reqAnimFrame.requestAnimFrame(function() {
        var vPanel = this.vPanel;
        var opt = this.options;
        var panel = getPanel(opt.panels, opt.viewName);

        vPanel.setMaxHeight(panel.maxHeight);
        vPanel.setHeightForcedSet(false);
        vPanel.setHeight(null, panel.minHeight);

        if (this.parent) {
            this.parent.render();
        }
    }, this);
};

/**
 * set state
 * @param {object} state - state
 */
DayGrid.prototype.setState = function(state) {
    var collapsed = this.state.collapsed;
    View.prototype.setState.call(this, state);

    if (this.state.collapsed === collapsed) {
        return;
    }

    if (this.state.collapsed) {
        this._collapse();
    } else {
        this._expand();
    }
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @param {boolean} timezonesCollapsed - multiple timezones are collapsed.
 * @returns {object} styles - styles object
 */
DayGrid.prototype._getStyles = function(theme, timezonesCollapsed) {
    var styles = {};
    var timezonesLength = this.options.timezones.length;
    var collapsed = timezonesCollapsed;
    var numberAndUnit;

    if (theme) {
        styles.borderRight = theme.week.daygrid.borderRight || theme.common.border;
        styles.todayBackgroundColor = theme.week.today.backgroundColor;
        styles.weekendBackgroundColor = theme.week.weekend.backgroundColor;
        styles.backgroundColor = theme.week.daygrid.backgroundColor;
        styles.leftWidth = theme.week.daygridLeft.width;
        styles.leftBackgroundColor = theme.week.daygridLeft.backgroundColor;
        styles.leftPaddingRight = theme.week.daygridLeft.paddingRight;
        styles.leftBorderRight = theme.week.daygridLeft.borderRight;

        if (!collapsed && timezonesLength > 1) {
            numberAndUnit = common.parseUnit(styles.leftWidth);
            styles.leftWidth = (numberAndUnit[0] * timezonesLength) + numberAndUnit[1];
        }
    }

    return styles;
};

/**
 * Get a background color based on day.
 * @param {number} day - day number
 * @param {boolean} isToday - today flag
 * @param {object} styles - style object
 * @returns {string} backgroundColor
 */
function getWeekBackgroundColor(day, isToday, styles) {
    var backgroundColor = '';

    if (day === 0 || day === 6) {
        backgroundColor = styles.weekendBackgroundColor;
    } else if (isToday) {
        backgroundColor = styles.todayBackgroundColor;
    } else {
        backgroundColor = styles.backgroundColor;
    }

    return backgroundColor;
}

/**
 * get a panel infomation
 * @param {Array.<object[]>} panels - panel infomations
 * @param {string} name - panel name
 * @returns {object} panel information
 */
function getPanel(panels, name) {
    var found;

    util.forEach(panels, function(panel) {
        if (panel.name === name) {
            found = panel;
        }
    });

    return found;
}

module.exports = DayGrid;


/***/ }),

/***/ "./src/js/view/week/dayGridSchedule.js":
/*!*********************************************!*\
  !*** ./src/js/view/week/dayGridSchedule.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Weekday view for week
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var Weekday = __webpack_require__(/*! ../weekday */ "./src/js/view/weekday.js"),
    tmpl = __webpack_require__(/*! ../template/week/dayGridSchedule.hbs */ "./src/js/view/template/week/dayGridSchedule.hbs");
var mmax = Math.max;

/**
 * @constructor
 * @extends {Weekday}
 * @param {object} options - options for DayGridSchedule view
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to
 *  make create easy.
 * @param {number} [options.scheduleHeight=18] - height of each schedule block.
 * @param {number} [options.scheduleGutter=2] - gutter height of each schedule block.
 * @param {HTMLDIVElement} container - DOM element to use container for this
 *  view.
 */
function DayGridSchedule(options, container) {
    Weekday.call(this, options, container);

    this.collapsed = true;
}

util.inherit(DayGridSchedule, Weekday);

/**
 * Render Weekday view
 * @override
 */
DayGridSchedule.prototype.render = function(viewModel) {
    var container = this.container;
    var baseViewModel;

    baseViewModel = this.getBaseViewModel(viewModel);

    container.innerHTML = tmpl(baseViewModel);

    this.fire('afterRender', baseViewModel);
};

/**
 * returns maximum schedule count in day
 * @param {array} matrices - The matrices for schedule placing.
 * @returns {number} maximum schedule count in day
 */
DayGridSchedule.prototype._getMaxScheduleInDay = function(matrices) {
    return mmax.apply(
        null,
        util.map(matrices, function(matrix) {
            return Math.max.apply(null, util.map(matrix, function(row) {
                return row.length;
            }));
        })
    );
};

/**
 * returns minimum height for container.
 * @param {number} maxScheduleInDay - max schedule blocks in one day
 * @returns {number}
 */
DayGridSchedule.prototype._getMinHeight = function(maxScheduleInDay) {
    var opt = this.options;
    var contentHeight = (maxScheduleInDay * opt.scheduleHeight)
        + ((maxScheduleInDay - 1) * opt.scheduleGutter);

    // if (this.collapsed && this.aboutMe.maxHeight >= contentHeight + opt.containerBottomGutter) {
    //     contentHeight += opt.containerBottomGutter;
    // }

    return contentHeight;
};

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
DayGridSchedule.prototype.getBaseViewModel = function(viewModel) {
    var opt = this.options;
    var matrices = opt.getViewModelFunc(viewModel);
    var maxScheduleInDay = this._getMaxScheduleInDay(matrices);
    var baseViewModel;
    var styles = this._getStyles(viewModel.theme);

    baseViewModel = Weekday.prototype.getBaseViewModel.call(this, viewModel);

    baseViewModel = util.extend({
        minHeight: this._getMinHeight(maxScheduleInDay),
        matrices: matrices,
        scheduleContainerTop: this.options.scheduleContainerTop,
        maxScheduleInDay: maxScheduleInDay,
        isReadOnly: opt.isReadOnly,
        styles: styles
    }, baseViewModel);

    return baseViewModel;
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
DayGridSchedule.prototype._getStyles = function(theme) {
    var styles = {};

    if (theme) {
        styles.borderRadius = theme.week.dayGridSchedule.borderRadius;
    }

    return styles;
};

module.exports = DayGridSchedule;


/***/ }),

/***/ "./src/js/view/week/dayname.js":
/*!*************************************!*\
  !*** ./src/js/view/week/dayname.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview View for rendering daynames
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var View = __webpack_require__(/*! ../view */ "./src/js/view/view.js");
var daynameTmpl = __webpack_require__(/*! ../template/week/daynames.hbs */ "./src/js/view/template/week/daynames.hbs");

/**
 * @constructor
 * @param {object} options - options for dayname view
 * @param {HTMLElement} container Container element to use.
 * @param {Theme} theme - theme instance
 * @extends {View}
 */
function DayName(options, container, theme) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('dayname-container')
    );

    this.options = util.extend({
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        timezones: options.timezones
    }, options.week);

    /**
     * @type {Theme}
     */
    this.theme = theme;

    View.call(this, container);

    this.applyTheme();
}

util.inherit(DayName, View);

/**
 * Get default viewmodels.
 * @param {Date} start The date of start render
 * @param {Date} end The end of end render
 * @param {object} grids grid data(width, left, day)
 * @returns {array} viewmodel.
 */
DayName.prototype._getBaseViewModel = function(start, end, grids) {
    var daynames = this.options.daynames,
        theme = this.theme,
        now = new TZDate(),
        viewModel;

    viewModel = util.map(datetime.range(
        datetime.start(start),
        datetime.end(end),
        datetime.MILLISECONDS_PER_DAY
    ), function(d, i) {
        var day = d.getDay();
        var isToday = datetime.isSameDate(d, now);
        var isPastDay = d < now && !isToday;

        return {
            day: day,
            dayName: daynames[day],
            isToday: isToday,
            date: d.getDate(),
            left: grids[i] ? grids[i].left : 0,
            width: grids[i] ? grids[i].width : 0,
            renderDate: datetime.format(d, 'YYYY-MM-DD'),
            color: this._getDayNameColor(theme, day, isToday, isPastDay)
        };
    }, this);

    return viewModel;
};

/**
 * @override
 * @param {object} viewModel View model from parent (WeekView)
 */
DayName.prototype.render = function(viewModel) {
    var dayNames = this._getBaseViewModel(
        viewModel.renderStartDate,
        viewModel.renderEndDate,
        viewModel.grids
    );
    var timezonesCollapsed = viewModel.state.timezonesCollapsed;
    var styles = this._getStyles(this.theme, timezonesCollapsed);
    var baseViewModel = util.extend({}, {
        dayNames: dayNames,
        styles: styles
    });

    this.container.innerHTML = daynameTmpl(baseViewModel);
};

/**
 * Get a day name color
 * @param {Theme} theme - theme instance
 * @param {number} day - day number
 * @param {boolean} isToday - today flag
 * @param {boolean} isPastDay - is past day flag
 * @returns {string} style - color style
 */
DayName.prototype._getDayNameColor = function(theme, day, isToday, isPastDay) {
    var color = '';

    if (theme) {
        if (day === 0) {
            color = theme.common.holiday.color;
        } else if (isPastDay) {
            color = theme.week.pastDay.color || theme.common.dayname.color;
        } else if (day === 6) {
            color = theme.common.saturday.color;
        } else if (isToday) {
            color = theme.week.today.color || theme.common.today.color;
        } else {
            color = theme.common.dayname.color;
        }
    }

    return color;
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @param {boolean} timezonesCollapsed - multiple timezones are collapsed.
 * @returns {object} styles - styles object
 */
DayName.prototype._getStyles = function(theme, timezonesCollapsed) {
    var styles = {};
    var timezonesLength = this.options.timezones.length;
    var collapsed = timezonesCollapsed;
    var numberAndUnit;

    if (theme) {
        styles.borderTop = theme.week.dayname.borderTop || theme.common.border;
        styles.borderBottom = theme.week.dayname.borderBottom || theme.common.border;
        styles.borderLeft = theme.week.dayname.borderLeft || theme.common.border;
        styles.paddingLeft = theme.week.dayname.paddingLeft;
        styles.backgroundColor = theme.week.dayname.backgroundColor;
        styles.height = theme.week.dayname.height;
        styles.textAlign = theme.week.dayname.textAlign;
        styles.marginLeft = theme.week.daygridLeft.width;

        if (!collapsed && timezonesLength > 1) {
            numberAndUnit = common.parseUnit(styles.marginLeft);
            styles.marginLeft = (numberAndUnit[0] * timezonesLength) + numberAndUnit[1];
        }
    }

    return styles;
};

DayName.prototype.applyTheme = function() {
    var styles = this._getStyles(this.theme);
    var style = this.container.style;

    style.borderTop = styles.borderTop;
    style.borderBottom = styles.borderBottom;
    style.height = styles.height;
    style.backgroundColor = styles.backgroundColor;
    style.textAlign = styles.textAlign;

    return style;
};

module.exports = DayName;


/***/ }),

/***/ "./src/js/view/week/time.js":
/*!**********************************!*\
  !*** ./src/js/view/week/time.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview View of time.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;
var View = __webpack_require__(/*! ../view */ "./src/js/view/view.js");
var timeTmpl = __webpack_require__(/*! ../template/week/time.hbs */ "./src/js/view/template/week/time.hbs");

var forEachArr = util.forEachArray;
var SCHEDULE_MIN_DURATION = datetime.MILLISECONDS_SCHEDULE_MIN_DURATION;

/**
 * @constructor
 * @extends {View}
 * @param {object} options Options
 * @param {number} options.index Date index in week view.
 * @param {number} options.width Date element width (percent)
 * @param {string} options.ymd YYYMMDD string for this view
 * @param {boolean} options.isToday when set true then assign today design class to container.
 * @param {number} options.hourStart Can limit of render hour start.
 * @param {number} options.hourEnd Can limit of render hour end.
 * @param {HTMLElement} container Element to use container for this view.
 * @param {Theme} theme - theme instance
 */
function Time(options, container, theme) {
    View.call(this, container);

    this.options = util.extend({
        index: 0,
        width: 0,
        ymd: '',
        isToday: false,
        pending: false,
        hourStart: 0,
        hourEnd: 24,
        defaultMarginBottom: 2,
        minHeight: 18.5,
        isReadOnly: false
    }, options);

    this.timeTmpl = timeTmpl;

    /**
     * @type {Theme}
     */
    this.theme = theme;

    container.style.width = options.width + '%';
    container.style.left = options.left + '%';

    if (this.options.isToday) {
        domutil.addClass(this.container, config.classname('today'));
    }

    this.applyTheme();
}

util.inherit(Time, View);

/**
 * Convert YYYYMMDD formatted string date to Date.
 * @param {string} str formatted string.
 * @returns {Date} start of date.
 */
Time.prototype._parseDateGroup = function(str) {
    var y = parseInt(str.substr(0, 4), 10),
        m = parseInt(str.substr(4, 2), 10),
        d = parseInt(str.substr(6, 2), 10);

    return new TZDate(y, m - 1, d);
};

/**
 * calculate left and width
 * @param {ScheduleViewModel} viewModel - view model instance to calculate bound.
 * @param {object} options - options for calculating schedule element's bound.
 * @returns {object} - left and width
 */
Time.prototype._getScheduleViewBoundX = function(viewModel, options) {
    var width = options.baseWidth * (viewModel.extraSpace + 1);

    // set width auto when has no collisions.
    if (!viewModel.hasCollide) {
        width = null;
    }

    return {
        left: options.baseLeft[options.columnIndex],
        width: width
    };
};

/**
 * calculate top, height, croppedStart and croppedEnd
 * @param {ScheduleViewModel} viewModel - view model instance to calculate bound.
 * @param {object} options - options for calculating schedule element's bound.
 * @returns {object} - left and width
 */
Time.prototype._getScheduleViewBoundY = function(viewModel, options) {
    var baseMS = options.baseMS;
    var baseHeight = options.baseHeight;
    var croppedStart = false;
    var croppedEnd = false;
    var goingDuration = datetime.millisecondsFrom('minutes', viewModel.valueOf().goingDuration);
    var comingDuration = datetime.millisecondsFrom('minutes', viewModel.valueOf().comingDuration);
    var offsetStart = viewModel.valueOf().start - goingDuration - options.todayStart;
    // containerHeight : milliseconds in day = x : schedule's milliseconds
    var top = (baseHeight * offsetStart) / baseMS;
    var modelDuration = viewModel.duration().getTime();
    var height;
    var duration;
    var goingDurationHeight;
    var modelDurationHeight;
    var comingDurationHeight;

    modelDuration = modelDuration > SCHEDULE_MIN_DURATION ? modelDuration : SCHEDULE_MIN_DURATION;
    duration = modelDuration + goingDuration + comingDuration;
    height = (baseHeight * duration) / baseMS;

    goingDurationHeight = (baseHeight * goingDuration) / baseMS; // common.ratio(duration, goingDuration, 100);
    modelDurationHeight = (baseHeight * modelDuration) / baseMS; // common.ratio(duration, modelDuration, 100);
    comingDurationHeight = (baseHeight * comingDuration) / baseMS; // common.ratio(duration, comingDuration, 100);

    if (offsetStart < 0) {
        top = 0;
        height += ((baseHeight * offsetStart) / baseMS);
        croppedStart = true;
    }

    if (height + top > baseHeight) {
        height = baseHeight - top;
        croppedEnd = true;
    }

    return {
        top: top,
        height: Math.max(height, this.options.minHeight) - this.options.defaultMarginBottom,
        modelDurationHeight: modelDurationHeight,
        goingDurationHeight: goingDurationHeight,
        comingDurationHeight: comingDurationHeight,
        hasGoingDuration: goingDuration > 0,
        hasComingDuration: comingDuration > 0,
        croppedStart: croppedStart,
        croppedEnd: croppedEnd
    };
};

/**
 * @param {ScheduleViewModel} viewModel - view model instance to calculate bound.
 * @param {object} options - options for calculating schedule element's bound.
 * @param {Date} options.todayStart - date object represent schedule date's start (00:00:00)
 * @param {number} options.baseMS - the number of milliseconds to render schedule blocks.
 * @param {number} options.baseHeight - pixel value related with baseMS options.
 * @param {number[]} options.baseLeft - left position percents for each columns.
 * @param {number} options.baseWidth - the unit of schedule blocks width percent.
 * @param {number} options.columnIndex - the number index of schedule blocks.
 * it represent rendering index from left sides in view.
 * @returns {object} bound object for supplied view model.
 */
Time.prototype.getScheduleViewBound = function(viewModel, options) {
    var boundX = this._getScheduleViewBoundX(viewModel, options);
    var boundY = this._getScheduleViewBoundY(viewModel, options);
    var schedule = viewModel.model;
    var isReadOnly = util.pick(schedule, 'isReadOnly') || false;
    var travelBorderColor = schedule.isFocused ? '#ffffff' : schedule.borderColor;
    if (travelBorderColor === schedule.bgColor) {
        travelBorderColor = null; // follow text color
    }

    return util.extend({
        isReadOnly: isReadOnly,
        travelBorderColor: travelBorderColor
    }, boundX, boundY);
};

/**
 * Set viewmodels for rendering.
 * @param {string} ymd The date of schedules. YYYYMMDD format.
 * @param {array} matrices The matrices for schedule placing.
 * @param {number} containerHeight - container's height
 */
Time.prototype._getBaseViewModel = function(ymd, matrices, containerHeight) {
    var self = this,
        options = this.options,
        hourStart = options.hourStart,
        hourEnd = options.hourEnd,
        isReadOnly = options.isReadOnly,
        todayStart,
        baseMS;

    /**
     * Calculate each schedule element bounds relative with rendered hour milliseconds and
     * wrap each schedule model to viewmodels.
     */
    containerHeight = containerHeight || this.getViewBound().height;
    todayStart = this._parseDateGroup(ymd);
    todayStart.setHours(hourStart);
    baseMS = datetime.millisecondsFrom('hour', (hourEnd - hourStart));

    forEachArr(matrices, function(matrix) {
        var maxRowLength,
            widthPercent,
            leftPercents,
            i;

        maxRowLength = Math.max.apply(null, util.map(matrix, function(row) {
            return row.length;
        }));

        widthPercent = 100 / maxRowLength;

        leftPercents = [];
        for (i = 0; i < maxRowLength; i += 1) {
            leftPercents[i] = widthPercent * i;
        }

        forEachArr(matrix, function(row) {
            forEachArr(row, function(viewModel, col) {
                var viewBound;

                if (!viewModel) {
                    return;
                }

                viewBound = self.getScheduleViewBound(viewModel, {
                    todayStart: todayStart,
                    baseMS: baseMS,
                    baseLeft: leftPercents,
                    baseWidth: widthPercent,
                    baseHeight: containerHeight,
                    columnIndex: col,
                    isReadOnly: isReadOnly
                });

                util.extend(viewModel, viewBound);
            });
        });
    });
};

/**
 * @returns {Date} - Date of this view.
 */
Time.prototype.getDate = function() {
    return this._parseDateGroup(this.options.ymd);
};

/**
 * @override
 * @param {string} ymd The date of schedules. YYYYMMDD format
 * @param {array} matrices Matrices for placing schedules
 * @param {number} containerHeight - container's height
 */
Time.prototype.render = function(ymd, matrices, containerHeight) {
    this._getBaseViewModel(ymd, matrices, containerHeight);
    this.container.innerHTML = this.timeTmpl({
        matrices: matrices,
        styles: this._getStyles(this.theme)
    });
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
Time.prototype._getStyles = function(theme) {
    var styles = {};
    var options = this.options;

    if (theme) {
        styles.borderRight = theme.week.timegrid.borderRight || theme.common.border;
        styles.marginRight = theme.week.timegrid.paddingRight;
        styles.borderRadius = theme.week.timegridSchedule.borderRadius;
        styles.paddingLeft = theme.week.timegridSchedule.paddingLeft;
        styles.backgroundColor = options.isToday ? theme.week.today.backgroundColor : 'inherit';
    }

    return styles;
};

Time.prototype.applyTheme = function() {
    var style = this.container.style;
    var styles = this._getStyles(this.theme);

    style.borderRight = styles.borderRight;
    style.backgroundColor = styles.backgroundColor;
};

module.exports = Time;


/***/ }),

/***/ "./src/js/view/week/timeGrid.js":
/*!**************************************!*\
  !*** ./src/js/view/week/timeGrid.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview View for rendered schedules by times.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var common = __webpack_require__(/*! ../../common/common */ "./src/js/common/common.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var domevent = __webpack_require__(/*! ../../common/domevent */ "./src/js/common/domevent.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var Timezone = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js");
var reqAnimFrame = __webpack_require__(/*! ../../common/reqAnimFrame */ "./src/js/common/reqAnimFrame.js");
var View = __webpack_require__(/*! ../view */ "./src/js/view/view.js");
var Time = __webpack_require__(/*! ./time */ "./src/js/view/week/time.js");
var AutoScroll = __webpack_require__(/*! ../../common/autoScroll */ "./src/js/common/autoScroll.js");
var mainTmpl = __webpack_require__(/*! ../template/week/timeGrid.hbs */ "./src/js/view/template/week/timeGrid.hbs");
var timezoneStickyTmpl = __webpack_require__(/*! ../template/week/timezoneSticky.hbs */ "./src/js/view/template/week/timezoneSticky.hbs");
var TZDate = Timezone.Date;
var HOURMARKER_REFRESH_INTERVAL = 1000 * 60;
var SIXTY_SECONDS = 60;
var SIXTY_MINUTES = 60;

/**
 * Returns a list of time labels from start to end.
 * For hidden labels near the current time, set to hidden: true.
 * @param {object} opt - TimeGrid.options
 * @param {boolean} hasHourMarker - Whether the current time is displayed
 * @param {number} timezoneOffset - timezone offset
 * @param {object} styles - styles
 * @returns {Array.<Object>}
 */
function getHoursLabels(opt, hasHourMarker, timezoneOffset, styles) {
    var hourStart = opt.hourStart;
    var hourEnd = opt.hourEnd;
    var renderEndDate = datetime.parse(opt.renderEndDate);
    var shiftByOffset = parseInt(timezoneOffset / SIXTY_MINUTES, 10);
    var shiftMinutes = Math.abs(timezoneOffset % SIXTY_MINUTES);
    var now = new TZDate();
    var nowMinutes = now.getMinutes();
    var hoursRange = util.range(0, 24);
    var nowAroundHours = null;
    var nowHours, nowHoursIndex;

    if (shiftByOffset < 0 && shiftMinutes > 0) {
        shiftByOffset -= 1;
    }

    // shift the array and take elements between start and end
    common.shiftArray(hoursRange, shiftByOffset);
    common.takeArray(hoursRange, hourStart, hourEnd);

    nowHours = common.shiftHours(now.getHours(), shiftByOffset) % 24;
    nowHoursIndex = util.inArray(nowHours, hoursRange);

    if (hasHourMarker) {
        if (nowMinutes < 20) {
            nowAroundHours = nowHours;
        } else if (nowMinutes > 40) {
            nowAroundHours = nowHours + 1;
        }

        if (util.isNumber(nowAroundHours)) {
            nowAroundHours %= 24;
        }
    }

    return util.map(hoursRange, function(hour, index) {
        var color;
        var fontWeight;
        var isPast = (hasHourMarker && index <= nowHoursIndex) ||
                     (renderEndDate < now && !datetime.isSameDate(renderEndDate, now));

        if (isPast) {
            // past
            color = styles.pastTimeColor;
            fontWeight = styles.pastTimeFontWeight;
        } else {
            // future
            color = styles.futureTimeColor;
            fontWeight = styles.futureTimeFontWeight;
        }

        return {
            hour: hour,
            minutes: shiftMinutes,
            hidden: nowAroundHours === hour || index === 0,
            color: color || '',
            fontWeight: fontWeight || ''
        };
    });
}
/**
 * @constructor
 * @extends {View}
 * @param {string} name - view name
 * @param {object} options The object for view customization.
 * @param {string} options.renderStartDate - render start date. YYYY-MM-DD
 * @param {string} options.renderEndDate - render end date. YYYY-MM-DD
 * @param {number} [options.hourStart=0] You can change view's start hours.
 * @param {number} [options.hourEnd=0] You can change view's end hours.
 * @param {HTMLElement} panelElement panel element.
 */
function TimeGrid(name, options, panelElement) {
    var container = domutil.appendHTMLElement(
        'div',
        panelElement,
        config.classname('timegrid-container')
    );
    var stickyContainer = domutil.appendHTMLElement(
        'div',
        panelElement,
        config.classname('timegrid-sticky-container')
    );

    panelElement.style.position = 'relative'; // for stickyContainer

    name = name || 'time';

    View.call(this, container);

    if (!util.browser.safari) {
        /**
         * @type {AutoScroll}
         */
        this._autoScroll = new AutoScroll(container);
    }

    this.stickyContainer = stickyContainer;

    /**
     * Time view options.
     * @type {object}
     */
    this.options = util.extend({
        viewName: name,
        renderStartDate: '',
        renderEndDate: '',
        hourStart: 0,
        hourEnd: 24,
        timezones: options.timezones,
        isReadOnly: options.isReadOnly,
        showTimezoneCollapseButton: false
    }, options.week);

    if (this.options.timezones.length < 1) {
        this.options.timezones = [{
            timezoneOffset: Timezone.getOffset()
        }];
    }

    /**
     * Interval id for hourmarker animation.
     * @type {number}
     */
    this.intervalID = 0;

    /**
     * timer id for hourmarker initial state
     * @type {number}
     */
    this.timerID = 0;

    /**
     * @type {boolean}
     */
    this._scrolled = false;

    /**
     * cache parent's view model
     * @type {object}
     */
    this._cacheParentViewModel = null;

    /**
     * cache hoursLabels view model to render again TimeGrid
     * @type {object}
     */
    this._cacheHoursLabels = null;

    this.attachEvent();
}

util.inherit(TimeGrid, View);

/**********
 * Prototype props
 **********/

/**
 * @type {string}
 */
TimeGrid.prototype.viewName = 'timegrid';

/**
 * Destroy view.
 * @override
 */
TimeGrid.prototype._beforeDestroy = function() {
    clearInterval(this.intervalID);
    clearTimeout(this.timerID);

    if (this._autoScroll) {
        this._autoScroll.destroy();
    }

    domevent.off(this.stickyContainer, 'click', this._onClickStickyContainer, this);

    this._autoScroll = this.hourmarkers = this.intervalID =
    this.timerID = this._cacheParentViewModel = this.stickyContainer = null;
};

/**
 * @param {Date} [time] - date object to convert pixel in grids.
 * use **Date.now()** when not supplied.
 * @returns {number} The pixel value represent current time in grids.
 */
TimeGrid.prototype._getTopPercentByTime = function(time) {
    var opt = this.options,
        raw = datetime.raw(time || new TZDate()),
        hourLength = util.range(opt.hourStart, opt.hourEnd).length,
        maxMilliseconds = hourLength * datetime.MILLISECONDS_PER_HOUR,
        hmsMilliseconds = datetime.millisecondsFrom('hour', raw.h) +
            datetime.millisecondsFrom('minutes', raw.m) +
            datetime.millisecondsFrom('seconds', raw.s) +
            raw.ms,
        topPercent;

    topPercent = common.ratio(maxMilliseconds, 100, hmsMilliseconds);
    topPercent -= common.ratio(maxMilliseconds, 100, datetime.millisecondsFrom('hour', opt.hourStart));

    return common.limit(topPercent, [0], [100]);
};

/**
 * Get Hourmarker viewmodel.
 * @param {TZDate} now - now
 * @param {object} grids grid information(width, left, day)
 * @param {Array.<TZDate>} range render range
 * @returns {object} ViewModel of hourmarker.
 */
TimeGrid.prototype._getHourmarkerViewModel = function(now, grids, range) {
    var todaymarkerLeft = -1;
    var todaymarkerWidth = -1;
    var hourmarkerTexts = [];
    var opt = this.options;
    var primaryOffset = Timezone.getOffset();
    var timezones = opt.timezones;
    var viewModel;

    now = now || new TZDate();

    util.forEach(range, function(date, index) {
        if (datetime.isSameDate(now, date)) {
            todaymarkerLeft = grids[index] ? grids[index].left : 0;
            todaymarkerWidth = grids[index] ? grids[index].width : 0;
        }
    });

    util.forEach(timezones, function(timezone) {
        var timezoneDifference = timezone.timezoneOffset + primaryOffset;
        var hourmarker = new TZDate(now);
        var texts = [];
        var dateDifference;

        hourmarker.setMinutes(hourmarker.getMinutes() + timezoneDifference);

        dateDifference = hourmarker.getDate() - now.getDate();
        if (dateDifference < 0) {
            texts.push('[-' + Math.abs(dateDifference) + ']<br>');
        } else if (dateDifference > 0) {
            texts.push('[+' + Math.abs(dateDifference) + ']<br>');
        }

        texts.push(datetime.format(hourmarker, 'HH:mm'));
        hourmarkerTexts.push(texts.join(''));
    });

    viewModel = {
        currentHours: now.getHours(),
        hourmarkerTop: this._getTopPercentByTime(now),
        hourmarkerTexts: hourmarkerTexts,
        todaymarkerLeft: todaymarkerLeft,
        todaymarkerWidth: todaymarkerWidth,
        todaymarkerRight: todaymarkerLeft + todaymarkerWidth
    };

    return viewModel;
};

/**
 * Get timezone view model
 * @param {number} currentHours - current hour
 * @param {boolean} timezonesCollapsed - multiple timezones are collapsed.
 * @param {object} styles - styles
 * @returns {object} ViewModel
 */
TimeGrid.prototype._getTimezoneViewModel = function(currentHours, timezonesCollapsed, styles) {
    var opt = this.options;
    var primaryOffset = Timezone.getOffset();
    var timezones = opt.timezones;
    var timezonesLength = timezones.length;
    var timezoneViewModel = [];
    var collapsed = timezonesCollapsed;
    var width = collapsed ? 100 : 100 / timezonesLength;
    var now = new TZDate();
    var backgroundColor = styles.displayTimezoneLabelBackgroundColor;

    util.forEach(timezones, function(timezone, index) {
        var hourmarker = new TZDate(now);
        var texts = [];
        var timezoneDifference;
        var timeSlots;
        var dateDifference;

        timezoneDifference = timezone.timezoneOffset + primaryOffset;
        timeSlots = getHoursLabels(opt, currentHours >= 0, timezoneDifference, styles);

        hourmarker.setMinutes(hourmarker.getMinutes() + timezoneDifference);

        dateDifference = hourmarker.getDate() - now.getDate();
        if (dateDifference < 0) {
            texts.push('[-' + Math.abs(dateDifference) + ']<br>');
        } else if (dateDifference > 0) {
            texts.push('[+' + Math.abs(dateDifference) + ']<br>');
        }

        texts.push(datetime.format(hourmarker, 'HH:mm'));

        if (index > 0) {
            backgroundColor = styles.additionalTimezoneBackgroundColor;
        }

        timezoneViewModel.push({
            timeSlots: timeSlots,
            displayLabel: timezone.displayLabel,
            timezoneOffset: timezone.timezoneOffset,
            tooltip: timezone.tooltip || '',
            width: width,
            left: collapsed ? 0 : (timezones.length - index - 1) * width,
            isPrimary: index === 0,
            hourmarkerText: texts.join(''),
            backgroundColor: backgroundColor || '',
            hidden: index !== 0 && collapsed
        });
    });

    return timezoneViewModel;
};

/**
 * Get base viewModel.
 * @param {object} viewModel - view model
 * @returns {object} ViewModel
 */
TimeGrid.prototype._getBaseViewModel = function(viewModel) {
    var grids = viewModel.grids;
    var range = viewModel.range;
    var opt = this.options;
    var baseViewModel = this._getHourmarkerViewModel(new TZDate(), grids, range);
    var timezonesCollapsed = util.pick(viewModel, 'state', 'timezonesCollapsed');
    var styles = this._getStyles(viewModel.theme, timezonesCollapsed);

    return util.extend(baseViewModel, {
        timezones: this._getTimezoneViewModel(baseViewModel.todaymarkerLeft, timezonesCollapsed, styles),
        hoursLabels: getHoursLabels(opt, baseViewModel.todaymarkerLeft >= 0, 0, styles),
        styles: styles,
        showTimezoneCollapseButton: util.pick(opt, 'showTimezoneCollapseButton'),
        timezonesCollapsed: timezonesCollapsed
    });
};

/**
 * Reconcilation child views and render.
 * @param {object} viewModels Viewmodel
 * @param {object} grids grid information(width, left, day)
 * @param {HTMLElement} container Container element for each time view.
 * @param {Theme} theme - theme instance
 */
TimeGrid.prototype._renderChildren = function(viewModels, grids, container, theme) {
    var self = this,
        options = this.options,
        childOption,
        child,
        isToday,
        containerHeight,
        today = datetime.format(new TZDate(), 'YYYYMMDD'),
        i = 0;

    // clear contents
    container.innerHTML = '';
    this.children.clear();

    containerHeight = domutil.getSize(container.parentElement)[1];

    // reconcilation of child views
    util.forEach(viewModels, function(schedules, ymd) {
        isToday = ymd === today;

        childOption = {
            index: i,
            left: grids[i] ? grids[i].left : 0,
            width: grids[i] ? grids[i].width : 0,
            ymd: ymd,
            isToday: isToday,
            isPending: options.isPending,
            isFocused: options.isFocused,
            isReadOnly: options.isReadOnly,
            hourStart: options.hourStart,
            hourEnd: options.hourEnd
        };

        child = new Time(
            childOption,
            domutil.appendHTMLElement('div', container, config.classname('time-date')),
            theme
        );
        child.render(ymd, schedules, containerHeight);

        self.addChild(child);

        i += 1;
    });
};

/**
 * @override
 * @param {object} viewModel ViewModel list from Week view.
 */
TimeGrid.prototype.render = function(viewModel) {
    var opt = this.options,
        timeViewModel = viewModel.schedulesInDateRange[opt.viewName],
        container = this.container,
        grids = viewModel.grids,
        baseViewModel = this._getBaseViewModel(viewModel),
        scheduleLen = util.keys(timeViewModel).length;

    this._cacheParentViewModel = viewModel;
    this._cacheHoursLabels = baseViewModel.hoursLabels;

    if (!scheduleLen) {
        return;
    }

    baseViewModel.showHourMarker = baseViewModel.todaymarkerLeft >= 0;

    container.innerHTML = mainTmpl(baseViewModel);

    /**********
     * Render sticky container for timezone display label
     **********/
    this.renderStickyContainer(baseViewModel);

    /**********
     * Render children
     **********/
    this._renderChildren(
        timeViewModel,
        grids,
        domutil.find(config.classname('.timegrid-schedules-container'), container),
        viewModel.theme
    );

    this._hourLabels = domutil.find('ul', container);

    /**********
     * Render hourmarker
     **********/
    this.hourmarkers = domutil.find(config.classname('.timegrid-hourmarker'), container, true);

    if (!this._scrolled) {
        this._scrolled = true;
        this.scrollToNow();
    }
};

TimeGrid.prototype.renderStickyContainer = function(baseViewModel) {
    var stickyContainer = this.stickyContainer;

    stickyContainer.innerHTML = timezoneStickyTmpl(baseViewModel);

    stickyContainer.style.display = baseViewModel.timezones.length > 1 ? 'block' : 'none';
    stickyContainer.style.width = baseViewModel.styles.leftWidth;
    stickyContainer.style.height = baseViewModel.styles.displayTimezoneLabelHeight;
    stickyContainer.style.borderBottom = baseViewModel.styles.leftBorderRight;
};

/**
 * Refresh hourmarker element.
 */
TimeGrid.prototype.refreshHourmarker = function() {
    var hourmarkers = this.hourmarkers;
    var viewModel = this._cacheParentViewModel;
    var hoursLabels = this._cacheHoursLabels;
    var baseViewModel;

    if (!hourmarkers || !viewModel) {
        return;
    }

    baseViewModel = this._getBaseViewModel(viewModel);

    reqAnimFrame.requestAnimFrame(function() {
        var needsRender = false;

        util.forEach(hoursLabels, function(hoursLabel, index) {
            if (hoursLabel.hidden !== baseViewModel.hoursLabels[index].hidden) {
                needsRender = true;

                return false;
            }

            return true;
        });

        if (needsRender) {
            this.render(viewModel);
        } else {
            util.forEach(hourmarkers, function(hourmarker) {
                var todaymarker = domutil.find(config.classname('.timegrid-todaymarker'), hourmarker);
                var hourmarkerText = domutil.find(config.classname('.timegrid-hourmarker-time'), hourmarker);
                var timezone = domutil.closest(hourmarker, config.classname('.timegrid-timezone'));
                var timezoneIndex = timezone ? domutil.getData(timezone, 'timezoneIndex') : 0;

                hourmarker.style.top = baseViewModel.hourmarkerTop + '%';

                if (todaymarker) {
                    todaymarker.style.display = (baseViewModel.todaymarkerLeft >= 0) ? 'block' : 'none';
                }
                if (hourmarkerText) {
                    hourmarkerText.innerHTML = baseViewModel.hourmarkerTexts[timezoneIndex];
                }
            });
        }
    }, this);
};

/**
 * Attach events
 */
TimeGrid.prototype.attachEvent = function() {
    clearInterval(this.intervalID);
    clearTimeout(this.timerID);
    this.intervalID = this.timerID = null;

    this.timerID = setTimeout(util.bind(this.onTick, this), (SIXTY_SECONDS - new TZDate().getSeconds()) * 1000);

    domevent.on(this.stickyContainer, 'click', this._onClickStickyContainer, this);
};

/**
 * Scroll time grid to current hourmarker.
 */
TimeGrid.prototype.scrollToNow = function() {
    var container = this.container;
    var offsetTop,
        viewBound,
        scrollTop,
        scrollAmount,
        scrollBy,
        scrollFn;

    if (!this.hourmarkers || !this.hourmarkers.length) {
        return;
    }

    offsetTop = this.hourmarkers[0].offsetTop;
    viewBound = this.getViewBound();
    scrollTop = offsetTop;
    scrollAmount = viewBound.height / 4;
    scrollBy = 10;

    scrollFn = function() {
        if (scrollTop > offsetTop - scrollAmount) {
            scrollTop -= scrollBy;
            container.scrollTop = scrollTop;

            reqAnimFrame.requestAnimFrame(scrollFn);
        } else {
            container.scrollTop = offsetTop - scrollAmount;
        }
    };

    reqAnimFrame.requestAnimFrame(scrollFn);
};

/**********
 * Schedule handlers
 **********/

/**
 * Interval tick handler
 */
TimeGrid.prototype.onTick = function() {
    if (this.timerID) {
        clearTimeout(this.timerID);
        this.timerID = null;
    }

    if (!this.intervalID) {
        this.intervalID = setInterval(util.bind(this.onTick, this), HOURMARKER_REFRESH_INTERVAL);
    }
    this.refreshHourmarker();
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @param {boolean} timezonesCollapsed - multiple timezones are collapsed.
 * @returns {object} styles - styles object
 */
TimeGrid.prototype._getStyles = function(theme, timezonesCollapsed) {
    var styles = {};
    var timezonesLength = this.options.timezones.length;
    var collapsed = timezonesCollapsed;
    var numberAndUnit;

    if (theme) {
        styles.borderBottom = theme.week.timegridHorizontalLine.borderBottom || theme.common.border;
        styles.halfHourBorderBottom = theme.week.timegridHalfHour.borderBottom || theme.common.border;

        styles.todayBackgroundColor = theme.week.today.backgroundColor;
        styles.weekendBackgroundColor = theme.week.weekend.backgroundColor;
        styles.backgroundColor = theme.week.daygrid.backgroundColor;
        styles.leftWidth = theme.week.timegridLeft.width;
        styles.leftBackgroundColor = theme.week.timegridLeft.backgroundColor;
        styles.leftBorderRight = theme.week.timegridLeft.borderRight || theme.common.border;
        styles.leftFontSize = theme.week.timegridLeft.fontSize;
        styles.timezoneWidth = theme.week.timegridLeft.width;
        styles.additionalTimezoneBackgroundColor = theme.week.timegridLeftAdditionalTimezone.backgroundColor
                                                || styles.leftBackgroundColor;

        styles.displayTimezoneLabelHeight = theme.week.timegridLeftTimezoneLabel.height;
        styles.displayTimezoneLabelBackgroundColor = theme.week.timegridLeft.backgroundColor === 'inherit' ? 'white' : theme.week.timegridLeft.backgroundColor;

        styles.oneHourHeight = theme.week.timegridOneHour.height;
        styles.halfHourHeight = theme.week.timegridHalfHour.height;
        styles.quaterHourHeight = (parseInt(styles.halfHourHeight, 10) / 2) + 'px';

        styles.currentTimeColor = theme.week.currentTime.color;
        styles.currentTimeFontSize = theme.week.currentTime.fontSize;
        styles.currentTimeFontWeight = theme.week.currentTime.fontWeight;

        styles.pastTimeColor = theme.week.pastTime.color;
        styles.pastTimeFontWeight = theme.week.pastTime.fontWeight;

        styles.futureTimeColor = theme.week.futureTime.color;
        styles.futureTimeFontWeight = theme.week.futureTime.fontWeight;

        styles.currentTimeLeftBorderTop = theme.week.currentTimeLinePast.border;
        styles.currentTimeBulletBackgroundColor = theme.week.currentTimeLineBullet.backgroundColor;
        styles.currentTimeTodayBorderTop = theme.week.currentTimeLineToday.border;
        styles.currentTimeRightBorderTop = theme.week.currentTimeLineFuture.border;

        if (!collapsed && timezonesLength > 1) {
            numberAndUnit = common.parseUnit(styles.leftWidth);
            styles.leftWidth = (numberAndUnit[0] * timezonesLength) + numberAndUnit[1];
        }
    }

    return styles;
};

/**
 * @param {MouseEvent} event - mouse event object
 */
TimeGrid.prototype._onClickStickyContainer = function(event) {
    var target = event.target || event.srcElement;
    var closeBtn = domutil.closest(target, config.classname('.timegrid-timezone-close-btn'));

    if (!closeBtn) {
        return;
    }

    this.fire('clickTimezonesCollapsedBtn');
};

module.exports = TimeGrid;


/***/ }),

/***/ "./src/js/view/week/week.js":
/*!**********************************!*\
  !*** ./src/js/view/week/week.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview View of days UI.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../../config */ "./src/js/config.js");
var domutil = __webpack_require__(/*! ../../common/domutil */ "./src/js/common/domutil.js");
var datetime = __webpack_require__(/*! ../../common/datetime */ "./src/js/common/datetime.js");
var TZDate = __webpack_require__(/*! ../../common/timezone */ "./src/js/common/timezone.js").Date;
var View = __webpack_require__(/*! ../view */ "./src/js/view/view.js");

/**
 * FullCalendar uses only date information (YYYY-MM-DD)
 * SplitTimeCalendar uses a string containing time zone information, so it branches.
 * @param {String} dateString - date string
 * @returns {TZDate}
 */
function parseRangeDateString(dateString) {
    if (dateString.length === 10) {
        return datetime.parse(dateString);
    }

    return new TZDate(dateString);
}

/**
 * @constructor
 * @param {Base.Week} controller The controller mixin part.
 * @param {object} options View options
 * @param {string} [options.renderStartDate] Start date of render.
 *  if not supplied then use -3d from today. YYYY-MM-DD format.
 * @param {string} [options.renderEndDate] End date of render.
 *  if not supplied then use +3d from today. YYYY-MM-DD format.
 * @param {string} [options.cssPrefix] - CSS classname prefix
 * @param {HTMLElement} container The element to use container for this view.
 * @param {object} panels - schedule panels like 'milestone', 'task', 'allday', 'time'
 * @extends {View}
 */
function Week(controller, options, container, panels) {
    var range;

    container = domutil.appendHTMLElement('div', container);

    View.call(this, container);

    domutil.addClass(container, config.classname('week-container'));

    range = this._getRenderDateRange(new TZDate());

    /**
     * @type {object} Options for view.
     */
    this.options = util.extend({
        scheduleFilter: [function(schedule) {
            return Boolean(schedule.isVisible);
        }],
        renderStartDate: datetime.format(range.start, 'YYYY-MM-DD'),
        renderEndDate: datetime.format(range.end, 'YYYY-MM-DD'),
        narrowWeekend: false,
        startDayOfWeek: 0,
        workweek: false,
        showTimezoneCollapseButton: false,
        timezonesCollapsed: false,
        hourStart: 0,
        hourEnd: 24
    }, options);

    /**
     * Week controller mixin.
     * @type {Base.Week}
     */
    this.controller = controller;

    /**
     * Schedule Panels
     * @type {Array.<object>}
     */
    this.panels = panels;

    /**
     * Week view states
     * @type {object}
     */
    this.state = {
        timezonesCollapsed: this.options.timezonesCollapsed
    };
}

util.inherit(Week, View);

/**********
 * Override props
 **********/

/**
 * Render each child view with schedules in ranges.
 * @fires Week#afterRender
 * @override
 */
Week.prototype.render = function() {
    var self = this,
        options = this.options,
        scheduleFilter = options.scheduleFilter,
        narrowWeekend = options.narrowWeekend,
        startDayOfWeek = options.startDayOfWeek,
        workweek = options.workweek,
        theme = this.controller.theme || {},
        state = this.state;
    var renderStartDate, renderEndDate, schedulesInDateRange, viewModel, grids, range;

    renderStartDate = parseRangeDateString(options.renderStartDate);
    renderEndDate = parseRangeDateString(options.renderEndDate);

    range = datetime.range(
        datetime.start(renderStartDate),
        datetime.end(renderEndDate),
        datetime.MILLISECONDS_PER_DAY
    );

    if (options.workweek && datetime.compare(renderStartDate, renderEndDate)) {
        range = util.filter(range, function(date) {
            return !datetime.isWeekend(date.getDay());
        });

        renderStartDate = range[0];
        renderEndDate = range[range.length - 1];
    }

    schedulesInDateRange = this.controller.findByDateRange(
        datetime.start(renderStartDate),
        datetime.end(renderEndDate),
        this.panels,
        scheduleFilter,
        this.options
    );

    grids = datetime.getGridLeftAndWidth(
        range.length,
        narrowWeekend,
        startDayOfWeek,
        workweek
    );

    viewModel = {
        schedulesInDateRange: schedulesInDateRange,
        renderStartDate: renderStartDate,
        renderEndDate: renderEndDate,
        grids: grids,
        range: range,
        theme: theme,
        state: state
    };

    this.children.each(function(childView) {
        var matrices;
        var viewName = util.pick(childView.options, 'viewName');
        childView.render(viewModel);

        if (viewName) {
            matrices = viewModel.schedulesInDateRange[viewName]; // DayGrid limits schedule count by visibleScheduleCount after rendering it.

            if (util.isArray(matrices)) {
                self._invokeAfterRenderSchedule(matrices);
            } else {
                util.forEach(matrices, function(matricesOfDay) {
                    self._invokeAfterRenderSchedule(matricesOfDay);
                });
            }
        }
    });

    /**
     * @event Week#afterRender
     */
    this.fire('afterRender');
};

/**
 * Fire 'afterRenderSchedule' event
 * @param {Array} matrices - schedule matrices from view model
 * @fires Week#afterRenderSchedule
 */
Week.prototype._invokeAfterRenderSchedule = function(matrices) {
    var self = this;
    util.forEachArray(matrices, function(matrix) {
        util.forEachArray(matrix, function(column) {
            util.forEachArray(column, function(scheduleViewModel) {
                if (scheduleViewModel) {
                    /**
                     * @event Week#afterRenderSchedule
                     */
                    self.fire('afterRenderSchedule', {schedule: scheduleViewModel.model});
                }
            });
        });
    });
};

/**********
 * Prototype props
 **********/

Week.prototype.viewName = 'week';

/**
 * Calculate default render date range from supplied date.
 * @param {Date} baseDate base date.
 * @returns {object} date range.
 */
Week.prototype._getRenderDateRange = function(baseDate) {
    var base = datetime.start(baseDate),
        start = new TZDate(Number(base)),
        end = new TZDate(Number(base));

    start.setDate(start.getDate() - 3);
    end.setDate(end.getDate() + 3);

    return {
        start: start,
        end: end
    };
};

util.CustomEvents.mixin(Week);

module.exports = Week;



/***/ }),

/***/ "./src/js/view/weekday.js":
/*!********************************!*\
  !*** ./src/js/view/weekday.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Weekday view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */


var util = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");
var config = __webpack_require__(/*! ../config */ "./src/js/config.js"),
    domutil = __webpack_require__(/*! ../common/domutil */ "./src/js/common/domutil.js"),
    datetime = __webpack_require__(/*! ../common/datetime */ "./src/js/common/datetime.js"),
    TZDate = __webpack_require__(/*! ../common/timezone */ "./src/js/common/timezone.js").Date,
    View = __webpack_require__(/*! ./view */ "./src/js/view/view.js");

/**
 * @constructor
 * @extends {View}
 * @param {object} options - view options.
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to
 *  make create easy.
 * @param {number} [options.scheduleHeight=18] - height of each schedule block.
 * @param {number} [options.scheduleGutter=2] - gutter height of each schedule block.
 * @param {HTMLDIVElement} container - DOM element to use container for this
 *  view.
 */
function Weekday(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('weekday')
    );

    /**
     * @type {object}
     */
    this.options = util.extend({
        containerBottomGutter: 8,
        scheduleHeight: 18,
        scheduleGutter: 2,
        narrowWeekend: false,
        startDayOfWeek: 0,
        workweek: false
    }, options);

    /*
     * cache parent's view model
     * @type {object}
     */
    this._cacheParentViewModel = null;

    View.call(this, container);
}

util.inherit(Weekday, View);

/**
 * Get render date range
 * @returns {Date[]} rendered date range
 */
Weekday.prototype.getRenderDateRange = function() {
    return this._cacheParentViewModel.range;
};

/**
 * Get render date grids information
 * @returns {Date[]} rendered date grids information
 */
Weekday.prototype.getRenderDateGrids = function() {
    return this._cacheParentViewModel.grids;
};

/**
 * Get default view model.
 * @param {object} viewModel parent's view model
 * @returns {object} viewModel to rendering.
 */
Weekday.prototype.getBaseViewModel = function(viewModel) {
    var opt = this.options;
    var range = viewModel.range;
    var today = datetime.format(new TZDate(), 'YYYYMMDD');
    var gridWidth = (100 / range.length);
    var grids = viewModel.grids;
    var exceedDate = viewModel.exceedDate || {};
    var theme = viewModel.theme;

    this._cacheParentViewModel = viewModel;

    return {
        width: gridWidth,
        scheduleHeight: opt.scheduleHeight,
        scheduleBlockHeight: (opt.scheduleHeight + opt.scheduleGutter),
        scheduleBlockGutter: opt.scheduleGutter,
        dates: util.map(range, function(date, index) {
            var day = date.getDay();
            var ymd = datetime.format(date, 'YYYYMMDD');
            var isToday = ymd === today;

            return {
                date: datetime.format(date, 'YYYY-MM-DD'),
                month: date.getMonth() + 1,
                day: day,
                isToday: isToday,
                ymd: ymd,
                hiddenSchedules: exceedDate[ymd] || 0,
                width: grids[index] ? grids[index].width : 0,
                left: grids[index] ? grids[index].left : 0,
                color: this._getDayNameColor(theme, day, isToday),
                backgroundColor: this._getDayBackgroundColor(theme, day)
            };
        }, this)
    };
};

/* eslint max-nested-callbacks: 0 */
/**
 * Make exceed date information
 * @param {number} maxCount - exceed schedule count
 * @param {Array} eventsInDateRange  - matrix of ScheduleViewModel
 * @param {Array.<TZDate>} range - date range of one week
 * @returns {object} exceedDate
 */
Weekday.prototype.getExceedDate = function(maxCount, eventsInDateRange, range) {
    var exceedDate = this._initExceedDate(range);

    util.forEach(eventsInDateRange, function(matrix) {
        util.forEach(matrix, function(column) {
            util.forEach(column, function(viewModel) {
                var period;
                if (!viewModel || viewModel.top < maxCount) {
                    return;
                }

                // check that this schedule block is not visible after rendered.
                viewModel.hidden = true;

                period = datetime.range(
                    viewModel.getStarts(),
                    viewModel.getEnds(),
                    datetime.MILLISECONDS_PER_DAY
                );

                util.forEach(period, function(date) {
                    var ymd = datetime.format(date, 'YYYYMMDD');
                    exceedDate[ymd] += 1;
                });
            });
        });
    });

    return exceedDate;
};

/**
 * Initiate exceed date information
 * @param {Array.<TZDate>} range - date range of one week
 * @returns {Object} - initiated exceed date
 */
Weekday.prototype._initExceedDate = function(range) {
    var exceedDate = {};

    util.forEach(range, function(date) {
        var ymd = datetime.format(date, 'YYYYMMDD');
        exceedDate[ymd] = 0;
    });

    return exceedDate;
};

/**
 * Get a day name color
 * @param {Theme} theme - theme instance
 * @param {number} day - day number
 * @param {boolean} isToday - today flag
 * @param {boolean} isOtherMonth - not this month flag
 * @returns {string} style - color style
 */
Weekday.prototype._getDayNameColor = function(theme, day, isToday, isOtherMonth) {
    var color = '';

    if (theme) {
        if (day === 0) {
            color = isOtherMonth ? theme.month.holidayExceptThisMonth.color : theme.common.holiday.color;
        } else if (day === 6) {
            color = isOtherMonth ? theme.month.dayExceptThisMonth.color : theme.common.saturday.color;
        } else if (isToday) {
            color = theme.common.today.color;
        } else {
            color = isOtherMonth ? theme.month.dayExceptThisMonth.color : theme.common.dayname.color;
        }
    }

    return color;
};

/**
 * Get a day background color
 * @param {Theme} theme - theme instance
 * @param {number} day - day number
 * @returns {string} style - color style
 */
Weekday.prototype._getDayBackgroundColor = function(theme, day) {
    var color = '';

    if (theme) {
        if (day === 0 || day === 6) {
            color = theme.month.weekend.backgroundColor;
        } else {
            color = 'inherit';
        }
    }

    return color;
};

module.exports = Weekday;


/***/ }),

/***/ "tui-code-snippet":
/*!******************************************************************************************************************************!*\
  !*** external {"commonjs":"tui-code-snippet","commonjs2":"tui-code-snippet","amd":"tui-code-snippet","root":["tui","util"]} ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_tui_code_snippet__;

/***/ }),

/***/ "tui-date-picker":
/*!*********************************************************************************************************************************!*\
  !*** external {"commonjs":"tui-date-picker","commonjs2":"tui-date-picker","amd":"tui-date-picker","root":["tui","DatePicker"]} ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_tui_date_picker__;

/***/ })

/******/ });
});
//# sourceMappingURL=tui-calendar.js.map