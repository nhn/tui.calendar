/*!
 * TOAST UI Calendar 2nd Edition
 * @version 2.1.3 | Tue Aug 16 2022
 * @author NHN Cloud FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tui-date-picker"));
	else if(typeof define === 'function' && define.amd)
		define(["tui-date-picker"], factory);
	else if(typeof exports === 'object')
		exports["tui"] = factory(require("tui-date-picker"));
	else
		root["tui"] = root["tui"] || {}, root["tui"]["Calendar"] = factory(root["tui"]["DatePicker"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__4268__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(6733);
var tryToString = __webpack_require__(9821);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 8505:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(6733);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 9736:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(95);
var create = __webpack_require__(2391);
var defineProperty = (__webpack_require__(1787).f);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 6637:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = (__webpack_require__(966).charAt);

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ 1176:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(5052);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 9540:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(905);
var toAbsoluteIndex = __webpack_require__(3231);
var lengthOfArrayLike = __webpack_require__(9646);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 7079:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 1589:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1601);
var isCallable = __webpack_require__(6733);
var classofRaw = __webpack_require__(7079);
var wellKnownSymbol = __webpack_require__(95);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 1590:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 7081:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(8270);
var ownKeys = __webpack_require__(4826);
var getOwnPropertyDescriptorModule = __webpack_require__(7933);
var definePropertyModule = __webpack_require__(1787);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 7528:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 3723:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var IteratorPrototype = (__webpack_require__(693).IteratorPrototype);
var create = __webpack_require__(2391);
var createPropertyDescriptor = __webpack_require__(5358);
var setToStringTag = __webpack_require__(4555);
var Iterators = __webpack_require__(5495);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 5762:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var definePropertyModule = __webpack_require__(1787);
var createPropertyDescriptor = __webpack_require__(5358);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 5358:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 4768:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(6733);
var definePropertyModule = __webpack_require__(1787);
var makeBuiltIn = __webpack_require__(6039);
var defineGlobalProperty = __webpack_require__(8400);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 8400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 7675:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var call = __webpack_require__(266);
var IS_PURE = __webpack_require__(4231);
var FunctionName = __webpack_require__(1805);
var isCallable = __webpack_require__(6733);
var createIteratorConstructor = __webpack_require__(3723);
var getPrototypeOf = __webpack_require__(7567);
var setPrototypeOf = __webpack_require__(6540);
var setToStringTag = __webpack_require__(4555);
var createNonEnumerableProperty = __webpack_require__(5762);
var defineBuiltIn = __webpack_require__(4768);
var wellKnownSymbol = __webpack_require__(95);
var Iterators = __webpack_require__(5495);
var IteratorsCore = __webpack_require__(693);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ 7400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 2635:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var isObject = __webpack_require__(5052);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 5694:
/***/ (function(module) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ 8865:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(2635);

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ 598:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(1333);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 6358:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var userAgent = __webpack_require__(598);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 3837:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 373:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);
var createPropertyDescriptor = __webpack_require__(5358);

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ 3103:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var getOwnPropertyDescriptor = (__webpack_require__(7933).f);
var createNonEnumerableProperty = __webpack_require__(5762);
var defineBuiltIn = __webpack_require__(4768);
var defineGlobalProperty = __webpack_require__(8400);
var copyConstructorProperties = __webpack_require__(7081);
var isForced = __webpack_require__(6541);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 4229:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 4954:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(7950);
var uncurryThis = __webpack_require__(5968);
var defineBuiltIn = __webpack_require__(4768);
var regexpExec = __webpack_require__(3466);
var fails = __webpack_require__(4229);
var wellKnownSymbol = __webpack_require__(95);
var createNonEnumerableProperty = __webpack_require__(5762);

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ 3171:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(7188);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 7188:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 266:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(7188);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 1805:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var hasOwn = __webpack_require__(8270);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 5968:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(7188);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 1333:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var isCallable = __webpack_require__(6733);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 5300:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(7111);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 17:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);
var toObject = __webpack_require__(2991);

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ 9859:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 8270:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);
var toObject = __webpack_require__(2991);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 5977:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 3777:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(1333);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 4394:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var fails = __webpack_require__(4229);
var createElement = __webpack_require__(2635);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 9337:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);
var fails = __webpack_require__(4229);
var classof = __webpack_require__(7079);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 835:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(6733);
var isObject = __webpack_require__(5052);
var setPrototypeOf = __webpack_require__(6540);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 8511:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);
var isCallable = __webpack_require__(6733);
var store = __webpack_require__(5353);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9679:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(5052);
var createNonEnumerableProperty = __webpack_require__(5762);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ 6407:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(8694);
var global = __webpack_require__(9859);
var uncurryThis = __webpack_require__(5968);
var isObject = __webpack_require__(5052);
var createNonEnumerableProperty = __webpack_require__(5762);
var hasOwn = __webpack_require__(8270);
var shared = __webpack_require__(5353);
var sharedKey = __webpack_require__(4399);
var hiddenKeys = __webpack_require__(5977);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 6733:
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 6541:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);
var isCallable = __webpack_require__(6733);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 5052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(6733);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 4231:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 9395:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(1333);
var isCallable = __webpack_require__(6733);
var isPrototypeOf = __webpack_require__(1321);
var USE_SYMBOL_AS_UID = __webpack_require__(6969);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 693:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(4229);
var isCallable = __webpack_require__(6733);
var create = __webpack_require__(2391);
var getPrototypeOf = __webpack_require__(7567);
var defineBuiltIn = __webpack_require__(4768);
var wellKnownSymbol = __webpack_require__(95);
var IS_PURE = __webpack_require__(4231);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es-x/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 5495:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 9646:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(4237);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6039:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);
var isCallable = __webpack_require__(6733);
var hasOwn = __webpack_require__(8270);
var DESCRIPTORS = __webpack_require__(7400);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(1805).CONFIGURABLE);
var inspectSource = __webpack_require__(8511);
var InternalStateModule = __webpack_require__(6407);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 917:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 3839:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(6358);
var fails = __webpack_require__(4229);

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var isCallable = __webpack_require__(6733);
var inspectSource = __webpack_require__(8511);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 635:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(3326);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 2391:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(1176);
var definePropertiesModule = __webpack_require__(219);
var enumBugKeys = __webpack_require__(3837);
var hiddenKeys = __webpack_require__(5977);
var html = __webpack_require__(3777);
var documentCreateElement = __webpack_require__(2635);
var sharedKey = __webpack_require__(4399);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 219:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7137);
var definePropertyModule = __webpack_require__(1787);
var anObject = __webpack_require__(1176);
var toIndexedObject = __webpack_require__(905);
var objectKeys = __webpack_require__(5632);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 1787:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var IE8_DOM_DEFINE = __webpack_require__(4394);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7137);
var anObject = __webpack_require__(1176);
var toPropertyKey = __webpack_require__(9310);

var $TypeError = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 7933:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var call = __webpack_require__(266);
var propertyIsEnumerableModule = __webpack_require__(9195);
var createPropertyDescriptor = __webpack_require__(5358);
var toIndexedObject = __webpack_require__(905);
var toPropertyKey = __webpack_require__(9310);
var hasOwn = __webpack_require__(8270);
var IE8_DOM_DEFINE = __webpack_require__(4394);

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8151:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(140);
var enumBugKeys = __webpack_require__(3837);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 894:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 7567:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(8270);
var isCallable = __webpack_require__(6733);
var toObject = __webpack_require__(2991);
var sharedKey = __webpack_require__(4399);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(7528);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es-x/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 1321:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);
var hasOwn = __webpack_require__(8270);
var toIndexedObject = __webpack_require__(905);
var indexOf = (__webpack_require__(9540).indexOf);
var hiddenKeys = __webpack_require__(5977);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 5632:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(140);
var enumBugKeys = __webpack_require__(3837);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 9195:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 6540:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(5968);
var anObject = __webpack_require__(1176);
var aPossiblePrototype = __webpack_require__(8505);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 2914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(266);
var isCallable = __webpack_require__(6733);
var isObject = __webpack_require__(5052);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 4826:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(1333);
var uncurryThis = __webpack_require__(5968);
var getOwnPropertyNamesModule = __webpack_require__(8151);
var getOwnPropertySymbolsModule = __webpack_require__(894);
var anObject = __webpack_require__(1176);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 6060:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = (__webpack_require__(1787).f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ 8115:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(266);
var anObject = __webpack_require__(1176);
var isCallable = __webpack_require__(6733);
var classof = __webpack_require__(7079);
var regexpExec = __webpack_require__(3466);

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw $TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ 3466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__(266);
var uncurryThis = __webpack_require__(5968);
var toString = __webpack_require__(3326);
var regexpFlags = __webpack_require__(895);
var stickyHelpers = __webpack_require__(5650);
var shared = __webpack_require__(3036);
var create = __webpack_require__(2391);
var getInternalState = (__webpack_require__(6407).get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(2926);
var UNSUPPORTED_NCG = __webpack_require__(461);

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 895:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1176);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 5650:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);
var global = __webpack_require__(9859);

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ 2926:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);
var global = __webpack_require__(9859);

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ 461:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);
var global = __webpack_require__(9859);

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ 8885:
/***/ (function(module) {

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 4555:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = (__webpack_require__(1787).f);
var hasOwn = __webpack_require__(8270);
var wellKnownSymbol = __webpack_require__(95);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 4399:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(3036);
var uid = __webpack_require__(1441);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var defineGlobalProperty = __webpack_require__(8400);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 3036:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(4231);
var store = __webpack_require__(5353);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.23.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.23.5/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 966:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);
var toIntegerOrInfinity = __webpack_require__(3329);
var toString = __webpack_require__(3326);
var requireObjectCoercible = __webpack_require__(8885);

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 3231:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(3329);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 905:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(9337);
var requireObjectCoercible = __webpack_require__(8885);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 3329:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trunc = __webpack_require__(917);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 4237:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(3329);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 2991:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(8885);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 2066:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(266);
var isObject = __webpack_require__(5052);
var isSymbol = __webpack_require__(9395);
var getMethod = __webpack_require__(5300);
var ordinaryToPrimitive = __webpack_require__(2914);
var wellKnownSymbol = __webpack_require__(95);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 9310:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(2066);
var isSymbol = __webpack_require__(9395);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1601:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(95);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 3326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(1589);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 9821:
/***/ (function(module) {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 1441:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 6969:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(3839);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 7137:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var fails = __webpack_require__(4229);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 95:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var shared = __webpack_require__(3036);
var hasOwn = __webpack_require__(8270);
var uid = __webpack_require__(1441);
var NATIVE_SYMBOL = __webpack_require__(3839);
var USE_SYMBOL_AS_UID = __webpack_require__(6969);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 3949:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(1333);
var hasOwn = __webpack_require__(8270);
var createNonEnumerableProperty = __webpack_require__(5762);
var isPrototypeOf = __webpack_require__(1321);
var setPrototypeOf = __webpack_require__(6540);
var copyConstructorProperties = __webpack_require__(7081);
var proxyAccessor = __webpack_require__(6060);
var inheritIfRequired = __webpack_require__(835);
var normalizeStringArgument = __webpack_require__(635);
var installErrorCause = __webpack_require__(9679);
var clearErrorStack = __webpack_require__(1590);
var ERROR_STACK_INSTALLABLE = __webpack_require__(373);
var DESCRIPTORS = __webpack_require__(7400);
var IS_PURE = __webpack_require__(4231);

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ 9529:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var $includes = (__webpack_require__(9540).includes);
var fails = __webpack_require__(4229);
var addToUnscopables = __webpack_require__(9736);

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ 5735:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(905);
var addToUnscopables = __webpack_require__(9736);
var Iterators = __webpack_require__(5495);
var InternalStateModule = __webpack_require__(6407);
var defineProperty = (__webpack_require__(1787).f);
var defineIterator = __webpack_require__(7675);
var IS_PURE = __webpack_require__(4231);
var DESCRIPTORS = __webpack_require__(7400);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }


/***/ }),

/***/ 3985:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(9736);

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('flatMap');


/***/ }),

/***/ 7694:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(9736);

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('flat');


/***/ }),

/***/ 1372:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(3103);
var global = __webpack_require__(9859);
var apply = __webpack_require__(3171);
var wrapErrorConstructorWithCause = __webpack_require__(3949);

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global[WEB_ASSEMBLY];

var FORCED = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ 7950:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var exec = __webpack_require__(3466);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 5940:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__(3171);
var call = __webpack_require__(266);
var uncurryThis = __webpack_require__(5968);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(4954);
var fails = __webpack_require__(4229);
var anObject = __webpack_require__(1176);
var isCallable = __webpack_require__(6733);
var toIntegerOrInfinity = __webpack_require__(3329);
var toLength = __webpack_require__(4237);
var toString = __webpack_require__(3326);
var requireObjectCoercible = __webpack_require__(8885);
var advanceStringIndex = __webpack_require__(6637);
var getMethod = __webpack_require__(5300);
var getSubstitution = __webpack_require__(17);
var regExpExec = __webpack_require__(8115);
var wellKnownSymbol = __webpack_require__(95);

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ 6886:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var DOMIterables = __webpack_require__(5694);
var DOMTokenListPrototype = __webpack_require__(8865);
var ArrayIteratorMethods = __webpack_require__(5735);
var createNonEnumerableProperty = __webpack_require__(5762);
var wellKnownSymbol = __webpack_require__(95);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ 5368:
/***/ (function(module) {

/*! @license DOMPurify 2.3.8 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.8/LICENSE */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var hasOwnProperty = Object.hasOwnProperty,
      setPrototypeOf = Object.setPrototypeOf,
      isFrozen = Object.isFrozen,
      getPrototypeOf = Object.getPrototypeOf,
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var freeze = Object.freeze,
      seal = Object.seal,
      create = Object.create; // eslint-disable-line import/no-mutable-exports

  var _ref = typeof Reflect !== 'undefined' && Reflect,
      apply = _ref.apply,
      construct = _ref.construct;

  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }

  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }

  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }

  if (!construct) {
    construct = function construct(Func, args) {
      return _construct(Func, _toConsumableArray(args));
    };
  }

  var arrayForEach = unapply(Array.prototype.forEach);
  var arrayPop = unapply(Array.prototype.pop);
  var arrayPush = unapply(Array.prototype.push);
  var stringToLowerCase = unapply(String.prototype.toLowerCase);
  var stringMatch = unapply(String.prototype.match);
  var stringReplace = unapply(String.prototype.replace);
  var stringIndexOf = unapply(String.prototype.indexOf);
  var stringTrim = unapply(String.prototype.trim);
  var regExpTest = unapply(RegExp.prototype.test);
  var typeErrorCreate = unconstruct(TypeError);
  function unapply(func) {
    return function (thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return apply(func, thisArg, args);
    };
  }
  function unconstruct(func) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return construct(func, args);
    };
  }
  /* Add properties to a lookup table */

  function addToSet(set, array) {
    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }

    var l = array.length;

    while (l--) {
      var element = array[l];

      if (typeof element === 'string') {
        var lcElement = stringToLowerCase(element);

        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }

          element = lcElement;
        }
      }

      set[element] = true;
    }

    return set;
  }
  /* Shallow clone an object */

  function clone(object) {
    var newObject = create(null);
    var property;

    for (property in object) {
      if (apply(hasOwnProperty, object, [property])) {
        newObject[property] = object[property];
      }
    }

    return newObject;
  }
  /* IE10 doesn't support __lookupGetter__ so lets'
   * simulate it. It also automatically checks
   * if the prop is function or getter and behaves
   * accordingly. */

  function lookupGetter(object, prop) {
    while (object !== null) {
      var desc = getOwnPropertyDescriptor(object, prop);

      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }

        if (typeof desc.value === 'function') {
          return unapply(desc.value);
        }
      }

      object = getPrototypeOf(object);
    }

    function fallbackValue(element) {
      console.warn('fallback value for', element);
      return null;
    }

    return fallbackValue;
  }

  var html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']); // SVG

  var svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
  var svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']); // List of SVG elements that are disallowed by default.
  // We still need to know them so that we can do namespace
  // checks properly in case one wants to add them to
  // allow-list.

  var svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'fedropshadow', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
  var mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover']); // Similarly to SVG, we want to know all MathML elements,
  // even those that we disallow by default.

  var mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
  var text = freeze(['#text']);

  var html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);
  var svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
  var mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
  var xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode

  var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape

  var ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape

  var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );
  var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
  );
  var DOCTYPE_NAME = seal(/^html$/i);

  var getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };
  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {Document} document The document object (to determine policy name suffix)
   * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported).
   */


  var _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, document) {
    if (_typeof(trustedTypes) !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    } // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.


    var suffix = null;
    var ATTR_NAME = 'data-tt-policy-suffix';

    if (document.currentScript && document.currentScript.hasAttribute(ATTR_NAME)) {
      suffix = document.currentScript.getAttribute(ATTR_NAME);
    }

    var policyName = 'dompurify' + (suffix ? '#' + suffix : '');

    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML: function createHTML(html) {
          return html;
        }
      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };

  function createDOMPurify() {
    var window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

    var DOMPurify = function DOMPurify(root) {
      return createDOMPurify(root);
    };
    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */


    DOMPurify.version = '2.3.8';
    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */

    DOMPurify.removed = [];

    if (!window || !window.document || window.document.nodeType !== 9) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;
      return DOMPurify;
    }

    var originalDocument = window.document;
    var document = window.document;
    var DocumentFragment = window.DocumentFragment,
        HTMLTemplateElement = window.HTMLTemplateElement,
        Node = window.Node,
        Element = window.Element,
        NodeFilter = window.NodeFilter,
        _window$NamedNodeMap = window.NamedNodeMap,
        NamedNodeMap = _window$NamedNodeMap === void 0 ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap,
        HTMLFormElement = window.HTMLFormElement,
        DOMParser = window.DOMParser,
        trustedTypes = window.trustedTypes;
    var ElementPrototype = Element.prototype;
    var cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
    var getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
    var getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
    var getParentNode = lookupGetter(ElementPrototype, 'parentNode'); // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.

    if (typeof HTMLTemplateElement === 'function') {
      var template = document.createElement('template');

      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }

    var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);

    var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML('') : '';
    var _document = document,
        implementation = _document.implementation,
        createNodeIterator = _document.createNodeIterator,
        createDocumentFragment = _document.createDocumentFragment,
        getElementsByTagName = _document.getElementsByTagName;
    var importNode = originalDocument.importNode;
    var documentMode = {};

    try {
      documentMode = clone(document).documentMode ? document.documentMode : {};
    } catch (_) {}

    var hooks = {};
    /**
     * Expose whether this browser supports running the full DOMPurify.
     */

    DOMPurify.isSupported = typeof getParentNode === 'function' && implementation && typeof implementation.createHTMLDocument !== 'undefined' && documentMode !== 9;
    var MUSTACHE_EXPR$1 = MUSTACHE_EXPR,
        ERB_EXPR$1 = ERB_EXPR,
        DATA_ATTR$1 = DATA_ATTR,
        ARIA_ATTR$1 = ARIA_ATTR,
        IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA,
        ATTR_WHITESPACE$1 = ATTR_WHITESPACE;
    var IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */

    var ALLOWED_TAGS = null;
    var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(html$1), _toConsumableArray(svg$1), _toConsumableArray(svgFilters), _toConsumableArray(mathMl$1), _toConsumableArray(text)));
    /* Allowed attribute names */

    var ALLOWED_ATTR = null;
    var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray(html), _toConsumableArray(svg), _toConsumableArray(mathMl), _toConsumableArray(xml)));
    /*
     * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */

    var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */

    var FORBID_TAGS = null;
    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */

    var FORBID_ATTR = null;
    /* Decide if ARIA attributes are okay */

    var ALLOW_ARIA_ATTR = true;
    /* Decide if custom data attributes are okay */

    var ALLOW_DATA_ATTR = true;
    /* Decide if unknown protocols are okay */

    var ALLOW_UNKNOWN_PROTOCOLS = false;
    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */

    var SAFE_FOR_TEMPLATES = false;
    /* Decide if document with <html>... should be returned */

    var WHOLE_DOCUMENT = false;
    /* Track whether config is already set on this instance of DOMPurify. */

    var SET_CONFIG = false;
    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */

    var FORCE_BODY = false;
    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */

    var RETURN_DOM = false;
    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */

    var RETURN_DOM_FRAGMENT = false;
    /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */

    var RETURN_TRUSTED_TYPE = false;
    /* Output should be free from DOM clobbering attacks? */

    var SANITIZE_DOM = true;
    /* Keep element content when removing element? */

    var KEEP_CONTENT = true;
    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */

    var IN_PLACE = false;
    /* Allow usage of profiles like html, svg and mathMl */

    var USE_PROFILES = {};
    /* Tags to ignore content of when KEEP_CONTENT is true */

    var FORBID_CONTENTS = null;
    var DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
    /* Tags that are safe for data: URIs */

    var DATA_URI_TAGS = null;
    var DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
    /* Attributes safe for values like "javascript:" */

    var URI_SAFE_ATTRIBUTES = null;
    var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
    var MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
    /* Document namespace */

    var NAMESPACE = HTML_NAMESPACE;
    var IS_EMPTY_INPUT = false;
    /* Parsing of strict XHTML documents */

    var PARSER_MEDIA_TYPE;
    var SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
    var DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
    var transformCaseFunc;
    /* Keep a reference to config to pass to hooks */

    var CONFIG = null;
    /* Ideally, do not touch anything below this line */

    /* ______________________________________________ */

    var formElement = document.createElement('form');

    var isRegexOrFunction = function isRegexOrFunction(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity


    var _parseConfig = function _parseConfig(cfg) {
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      /* Shield configuration object from tampering */


      if (!cfg || _typeof(cfg) !== 'object') {
        cfg = {};
      }
      /* Shield configuration object from prototype pollution */


      cfg = clone(cfg);
      /* Set configuration parameters */

      ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
      URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS) : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = 'FORBID_CONTENTS' in cfg ? addToSet({}, cfg.FORBID_CONTENTS) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
      FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
      USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true

      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true

      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false

      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false

      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false

      RETURN_DOM = cfg.RETURN_DOM || false; // Default false

      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false

      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false

      FORCE_BODY = cfg.FORCE_BODY || false; // Default false

      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true

      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true

      IN_PLACE = cfg.IN_PLACE || false; // Default false

      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$1;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;

      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }

      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }

      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }

      PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE; // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.

      transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? function (x) {
        return x;
      } : stringToLowerCase;

      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }

      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      /* Parse profile info */


      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, _toConsumableArray(text));
        ALLOWED_ATTR = [];

        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }

        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      /* Merge configuration parameters */


      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }

        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
      }

      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }

        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
      }

      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
      }

      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }

        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS);
      }
      /* Add #text in case KEEP_CONTENT is set to true */


      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }
      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */


      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }
      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */


      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      } // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.


      if (freeze) {
        freeze(cfg);
      }

      CONFIG = cfg;
    };

    var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
    var HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']); // Certain elements are allowed in both SVG and HTML
    // namespace. We need to specify them explicitly
    // so that they don't get erroneously deleted from
    // HTML namespace.

    var COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
    /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */

    var ALL_SVG_TAGS = addToSet({}, svg$1);
    addToSet(ALL_SVG_TAGS, svgFilters);
    addToSet(ALL_SVG_TAGS, svgDisallowed);
    var ALL_MATHML_TAGS = addToSet({}, mathMl$1);
    addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
    /**
     *
     *
     * @param  {Element} element a DOM element whose namespace is being checked
     * @returns {boolean} Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */

    var _checkValidNamespace = function _checkValidNamespace(element) {
      var parent = getParentNode(element); // In JSDOM, if we're inside shadow DOM, then parentNode
      // can be null. We just simulate parent in this case.

      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: HTML_NAMESPACE,
          tagName: 'template'
        };
      }

      var tagName = stringToLowerCase(element.tagName);
      var parentTagName = stringToLowerCase(parent.tagName);

      if (element.namespaceURI === SVG_NAMESPACE) {
        // The only way to switch from HTML namespace to SVG
        // is via <svg>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'svg';
        } // The only way to switch from MathML to SVG is via
        // svg if parent is either <annotation-xml> or MathML
        // text integration points.


        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        } // We only allow elements that are defined in SVG
        // spec. All others are disallowed in SVG namespace.


        return Boolean(ALL_SVG_TAGS[tagName]);
      }

      if (element.namespaceURI === MATHML_NAMESPACE) {
        // The only way to switch from HTML namespace to MathML
        // is via <math>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'math';
        } // The only way to switch from SVG to MathML is via
        // <math> and HTML integration points


        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
        } // We only allow elements that are defined in MathML
        // spec. All others are disallowed in MathML namespace.


        return Boolean(ALL_MATHML_TAGS[tagName]);
      }

      if (element.namespaceURI === HTML_NAMESPACE) {
        // The only way to switch from SVG to HTML is via
        // HTML integration points, and from MathML to HTML
        // is via MathML text integration points
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }

        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        } // We disallow tags that are specific for MathML
        // or SVG and should never appear in HTML namespace


        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      } // The code should never reach this place (this means
      // that the element somehow got namespace that is not
      // HTML, SVG or MathML). Return false just in case.


      return false;
    };
    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */


    var _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });

      try {
        // eslint-disable-next-line unicorn/prefer-dom-node-remove
        node.parentNode.removeChild(node);
      } catch (_) {
        try {
          node.outerHTML = emptyHTML;
        } catch (_) {
          node.remove();
        }
      }
    };
    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */


    var _removeAttribute = function _removeAttribute(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }

      node.removeAttribute(name); // We void attribute values for unremovable "is"" attributes

      if (name === 'is' && !ALLOWED_ATTR[name]) {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(node);
          } catch (_) {}
        } else {
          try {
            node.setAttribute(name, '');
          } catch (_) {}
        }
      }
    };
    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */


    var _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      var doc;
      var leadingWhitespace;

      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        var matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }

      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml') {
        // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
      }

      var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */

      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_) {}
      }
      /* Use createHTMLDocument in case DOMParser is not available */


      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, 'template', null);

        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? '' : dirtyPayload;
        } catch (_) {// Syntax error if dirtyPayload is invalid xml
        }
      }

      var body = doc.body || doc.documentElement;

      if (dirty && leadingWhitespace) {
        body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }
      /* Work on whole document or just its body */


      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
      }

      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };
    /**
     * _createIterator
     *
     * @param  {Document} root document/fragment to create iterator for
     * @return {Iterator} iterator instance
     */


    var _createIterator = function _createIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
    };
    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */


    var _isClobbered = function _isClobbered(elm) {
      return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function');
    };
    /**
     * _isNode
     *
     * @param  {Node} obj object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */


    var _isNode = function _isNode(object) {
      return _typeof(Node) === 'object' ? object instanceof Node : object && _typeof(object) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string';
    };
    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */


    var _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }

      arrayForEach(hooks[entryPoint], function (hook) {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };
    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */


    var _sanitizeElements = function _sanitizeElements(currentNode) {
      var content;
      /* Execute a hook if present */

      _executeHook('beforeSanitizeElements', currentNode, null);
      /* Check if element is clobbered or can clobber */


      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Check if tagname contains Unicode */


      if (regExpTest(/[\u0080-\uFFFF]/, currentNode.nodeName)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Now let's check the element's type and name */


      var tagName = transformCaseFunc(currentNode.nodeName);
      /* Execute a hook if present */

      _executeHook('uponSanitizeElement', currentNode, {
        tagName: tagName,
        allowedTags: ALLOWED_TAGS
      });
      /* Detect mXSS attempts abusing namespace confusion */


      if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Mitigate a problem with templates inside select */


      if (tagName === 'select' && regExpTest(/<template/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Remove element if anything forbids its presence */


      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Check if we have a custom element to handle */
        if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) return false;
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) return false;
        }
        /* Keep content except for bad-listed elements */


        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          var parentNode = getParentNode(currentNode) || currentNode.parentNode;
          var childNodes = getChildNodes(currentNode) || currentNode.childNodes;

          if (childNodes && parentNode) {
            var childCount = childNodes.length;

            for (var i = childCount - 1; i >= 0; --i) {
              parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
            }
          }
        }

        _forceRemove(currentNode);

        return true;
      }
      /* Check whether element has a valid namespace */


      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);

        return true;
      }

      if ((tagName === 'noscript' || tagName === 'noembed') && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Sanitize element content to be template-safe */


      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        /* Get the element's text content */
        content = currentNode.textContent;
        content = stringReplace(content, MUSTACHE_EXPR$1, ' ');
        content = stringReplace(content, ERB_EXPR$1, ' ');

        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeElements', currentNode, null);

      return false;
    };
    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity


    var _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }
      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */


      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if ( // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
          return false;
        }
        /* Check value is safe. First, is attr inert? If so, is safe */

      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if (!value) ; else {
        return false;
      }

      return true;
    };
    /**
     * _basicCustomElementCheck
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     * @param {string} tagName name of the tag of the node to sanitize
     */


    var _basicCustomElementTest = function _basicCustomElementTest(tagName) {
      return tagName.indexOf('-') > 0;
    };
    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */


    var _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      var attr;
      var value;
      var lcName;
      var l;
      /* Execute a hook if present */

      _executeHook('beforeSanitizeAttributes', currentNode, null);

      var attributes = currentNode.attributes;
      /* Check if we have attributes; if not we might have a text node */

      if (!attributes) {
        return;
      }

      var hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      l = attributes.length;
      /* Go backwards over all attributes; safely remove bad ones */

      while (l--) {
        attr = attributes[l];
        var _attr = attr,
            name = _attr.name,
            namespaceURI = _attr.namespaceURI;
        value = name === 'value' ? attr.value : stringTrim(attr.value);
        lcName = transformCaseFunc(name);
        /* Execute a hook if present */

        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set

        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);

        value = hookEvent.attrValue;
        /* Did the hooks approve of the attribute? */

        if (hookEvent.forceKeepAttr) {
          continue;
        }
        /* Remove attribute */


        _removeAttribute(name, currentNode);
        /* Did the hooks approve of the attribute? */


        if (!hookEvent.keepAttr) {
          continue;
        }
        /* Work around a security issue in jQuery 3.0 */


        if (regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);

          continue;
        }
        /* Sanitize attribute content to be template-safe */


        if (SAFE_FOR_TEMPLATES) {
          value = stringReplace(value, MUSTACHE_EXPR$1, ' ');
          value = stringReplace(value, ERB_EXPR$1, ' ');
        }
        /* Is `value` valid for this attribute? */


        var lcTag = transformCaseFunc(currentNode.nodeName);

        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }
        /* Handle invalid data-* attribute set by try-catching it */


        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }

          arrayPop(DOMPurify.removed);
        } catch (_) {}
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeAttributes', currentNode, null);
    };
    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */


    var _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      var shadowNode;

      var shadowIterator = _createIterator(fragment);
      /* Execute a hook if present */


      _executeHook('beforeSanitizeShadowDOM', fragment, null);

      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);
        /* Sanitize tags and elements */


        if (_sanitizeElements(shadowNode)) {
          continue;
        }
        /* Deep shadow DOM detected */


        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(shadowNode);
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };
    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} configuration object
     */
    // eslint-disable-next-line complexity


    DOMPurify.sanitize = function (dirty, cfg) {
      var body;
      var importedNode;
      var currentNode;
      var oldNode;
      var returnNode;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */

      IS_EMPTY_INPUT = !dirty;

      if (IS_EMPTY_INPUT) {
        dirty = '<!-->';
      }
      /* Stringify, in case dirty is an object */


      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        // eslint-disable-next-line no-negated-condition
        if (typeof dirty.toString !== 'function') {
          throw typeErrorCreate('toString is not a function');
        } else {
          dirty = dirty.toString();

          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        }
      }
      /* Check we can run. Otherwise fall back or ignore */


      if (!DOMPurify.isSupported) {
        if (_typeof(window.toStaticHTML) === 'object' || typeof window.toStaticHTML === 'function') {
          if (typeof dirty === 'string') {
            return window.toStaticHTML(dirty);
          }

          if (_isNode(dirty)) {
            return window.toStaticHTML(dirty.outerHTML);
          }
        }

        return dirty;
      }
      /* Assign config vars */


      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      /* Clean up removed elements */


      DOMPurify.removed = [];
      /* Check if dirty is correctly typed for IN_PLACE */

      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }

      if (IN_PLACE) {
        /* Do some early pre-sanitization to avoid unsafe root nodes */
        if (dirty.nodeName) {
          var tagName = transformCaseFunc(dirty.nodeName);

          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
          }
        }
      } else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!---->');
        importedNode = body.ownerDocument.importNode(dirty, true);

        if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        /* Initialize the document to work on */


        body = _initDocument(dirty);
        /* Check we have a DOM node from the data */

        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
        }
      }
      /* Remove first element node (ours) if FORCE_BODY is set */


      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      /* Get node iterator */


      var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
      /* Now start iterating over the created document */


      while (currentNode = nodeIterator.nextNode()) {
        /* Fix IE's strange behavior with manipulated textNodes #89 */
        if (currentNode.nodeType === 3 && currentNode === oldNode) {
          continue;
        }
        /* Sanitize tags and elements */


        if (_sanitizeElements(currentNode)) {
          continue;
        }
        /* Shadow DOM detected, sanitize it */


        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(currentNode);

        oldNode = currentNode;
      }

      oldNode = null;
      /* If we sanitized `dirty` in-place, return it. */

      if (IN_PLACE) {
        return dirty;
      }
      /* Return sanitized string or DOM */


      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);

          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-dom-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }

        if (ALLOWED_ATTR.shadowroot) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }

        return returnNode;
      }

      var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      /* Serialize doctype if allowed */

      if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
      }
      /* Sanitize final string template-safe */


      if (SAFE_FOR_TEMPLATES) {
        serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$1, ' ');
        serializedHTML = stringReplace(serializedHTML, ERB_EXPR$1, ' ');
      }

      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */


    DOMPurify.setConfig = function (cfg) {
      _parseConfig(cfg);

      SET_CONFIG = true;
    };
    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */


    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };
    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {string} tag Tag name of containing element.
     * @param  {string} attr Attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */


    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }

      var lcTag = transformCaseFunc(tag);
      var lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */


    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }

      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };
    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     * @return {Function} removed(popped) hook
     */


    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        return arrayPop(hooks[entryPoint]);
      }
    };
    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */


    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };
    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     *
     */


    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };

    return DOMPurify;
  }

  var purify = createDOMPurify();

  return purify;

}));
//# sourceMappingURL=purify.js.map


/***/ }),

/***/ 4304:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = window.DOMPurify || (window.DOMPurify = (__webpack_require__(5368)["default"]) || __webpack_require__(5368));

/***/ }),

/***/ 7386:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Generate an integer Array containing an arithmetic progression.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isUndefined = __webpack_require__(3929);

/**
 * Generate an integer Array containing an arithmetic progression.
 * @param {number} start - start index
 * @param {number} stop - stop index
 * @param {number} step - next visit index = current index + step
 * @returns {Array}
 * @memberof module:array
 * @example
 * // ES6
 * import range from 'tui-code-snippet/array/range';
 * 
 * // CommonJS
 * const range = require('tui-code-snippet/array/range');
 *
 * range(5); // [0, 1, 2, 3, 4]
 * range(1, 5); // [1,2,3,4]
 * range(2, 10, 2); // [2,4,6,8]
 * range(10, 2, -2); // [10,8,6,4]
 */
function range(start, stop, step) {
  var arr = [];
  var flag;

  if (isUndefined(stop)) {
    stop = start || 0;
    start = 0;
  }

  step = step || 1;
  flag = step < 0 ? -1 : 1;
  stop *= flag;

  for (; start * flag < stop; start += step) {
    arr.push(start);
  }

  return arr;
}

module.exports = range;


/***/ }),

/***/ 1690:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Execute the provided callback once for each property of object(or element of array) which actually exist.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isArray = __webpack_require__(7322);
var forEachArray = __webpack_require__(893);
var forEachOwnProperties = __webpack_require__(6956);

/**
 * @module collection
 */

/**
 * Execute the provided callback once for each property of object(or element of array) which actually exist.
 * If the object is Array-like object(ex-arguments object), It needs to transform to Array.(see 'ex2' of example).
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the property(or The value of the element)
 *  2) The name of the property(or The index of the element)
 *  3) The object being traversed
 * @param {Object} obj The object that will be traversed
 * @param {function} iteratee Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * // ES6
 * import forEach from 'tui-code-snippet/collection/forEach'; 
 * 
 * // CommonJS
 * const forEach = require('tui-code-snippet/collection/forEach'); 
 *
 * let sum = 0;
 *
 * forEach([1,2,3], function(value){
 *   sum += value;
 * });
 * alert(sum); // 6
 *
 * // In case of Array-like object
 * const array = Array.prototype.slice.call(arrayLike); // change to array
 * forEach(array, function(value){
 *   sum += value;
 * });
 */
function forEach(obj, iteratee, context) {
  if (isArray(obj)) {
    forEachArray(obj, iteratee, context);
  } else {
    forEachOwnProperties(obj, iteratee, context);
  }
}

module.exports = forEach;


/***/ }),

/***/ 893:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Execute the provided callback once for each element present in the array(or Array-like object) in ascending order.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Execute the provided callback once for each element present
 * in the array(or Array-like object) in ascending order.
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the element
 *  2) The index of the element
 *  3) The array(or Array-like object) being traversed
 * @param {Array|Arguments|NodeList} arr The array(or Array-like object) that will be traversed
 * @param {function} iteratee Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * // ES6
 * import forEachArray from 'tui-code-snippet/collection/forEachArray';
 * 
 * // CommonJS
 * const forEachArray = require('tui-code-snippet/collection/forEachArray'); 
 *
 * let sum = 0;
 *
 * forEachArray([1,2,3], function(value){
 *   sum += value;
 * });
 * alert(sum); // 6
 */
function forEachArray(arr, iteratee, context) {
  var index = 0;
  var len = arr.length;

  context = context || null;

  for (; index < len; index += 1) {
    if (iteratee.call(context, arr[index], index, arr) === false) {
      break;
    }
  }
}

module.exports = forEachArray;


/***/ }),

/***/ 6956:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Execute the provided callback once for each property of object which actually exist.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Execute the provided callback once for each property of object which actually exist.
 * If the callback function returns false, the loop will be stopped.
 * Callback function(iteratee) is invoked with three arguments:
 *  1) The value of the property
 *  2) The name of the property
 *  3) The object being traversed
 * @param {Object} obj The object that will be traversed
 * @param {function} iteratee  Callback function
 * @param {Object} [context] Context(this) of callback function
 * @memberof module:collection
 * @example
 * // ES6
 * import forEachOwnProperties from 'tui-code-snippet/collection/forEachOwnProperties';
 * 
 * // CommonJS
 * const forEachOwnProperties = require('tui-code-snippet/collection/forEachOwnProperties'); 
 *
 * let sum = 0;
 *
 * forEachOwnProperties({a:1,b:2,c:3}, function(value){
 *   sum += value;
 * });
 * alert(sum); // 6
 */
function forEachOwnProperties(obj, iteratee, context) {
  var key;

  context = context || null;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (iteratee.call(context, obj[key], key, obj) === false) {
        break;
      }
    }
  }
}

module.exports = forEachOwnProperties;


/***/ }),

/***/ 2278:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview This module provides some functions for custom events. And it is implemented in the observer design pattern.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var extend = __webpack_require__(7969);
var isExisty = __webpack_require__(7065);
var isString = __webpack_require__(758);
var isObject = __webpack_require__(5758);
var isArray = __webpack_require__(7322);
var isFunction = __webpack_require__(4294);
var forEach = __webpack_require__(1690);

var R_EVENTNAME_SPLIT = /\s+/g;

/**
 * @class
 * @example
 * // ES6
 * import CustomEvents from 'tui-code-snippet/customEvents/customEvents';
 * 
 * // CommonJS
 * const CustomEvents = require('tui-code-snippet/customEvents/customEvents'); 
 */
function CustomEvents() {
  /**
     * @type {HandlerItem[]}
     */
  this.events = null;

  /**
     * only for checking specific context event was binded
     * @type {object[]}
     */
  this.contexts = null;
}

/**
 * Mixin custom events feature to specific constructor
 * @param {function} func - constructor
 * @example
 * //ES6
 * import CustomEvents from 'tui-code-snippet/customEvents/customEvents'; 
 * 
 * // CommonJS
 * const CustomEvents = require('tui-code-snippet/customEvents/customEvents'); 
 *
 * function Model() {
 *     this.name = '';
 * }
 * CustomEvents.mixin(Model);
 *
 * const model = new Model();
 * model.on('change', function() { this.name = 'model'; }, this);
 * model.fire('change');
 * alert(model.name); // 'model';
 */
CustomEvents.mixin = function(func) {
  extend(func.prototype, CustomEvents.prototype);
};

/**
 * Get HandlerItem object
 * @param {function} handler - handler function
 * @param {object} [context] - context for handler
 * @returns {HandlerItem} HandlerItem object
 * @private
 */
CustomEvents.prototype._getHandlerItem = function(handler, context) {
  var item = {handler: handler};

  if (context) {
    item.context = context;
  }

  return item;
};

/**
 * Get event object safely
 * @param {string} [eventName] - create sub event map if not exist.
 * @returns {(object|array)} event object. if you supplied `eventName`
 *  parameter then make new array and return it
 * @private
 */
CustomEvents.prototype._safeEvent = function(eventName) {
  var events = this.events;
  var byName;

  if (!events) {
    events = this.events = {};
  }

  if (eventName) {
    byName = events[eventName];

    if (!byName) {
      byName = [];
      events[eventName] = byName;
    }

    events = byName;
  }

  return events;
};

/**
 * Get context array safely
 * @returns {array} context array
 * @private
 */
CustomEvents.prototype._safeContext = function() {
  var context = this.contexts;

  if (!context) {
    context = this.contexts = [];
  }

  return context;
};

/**
 * Get index of context
 * @param {object} ctx - context that used for bind custom event
 * @returns {number} index of context
 * @private
 */
CustomEvents.prototype._indexOfContext = function(ctx) {
  var context = this._safeContext();
  var index = 0;

  while (context[index]) {
    if (ctx === context[index][0]) {
      return index;
    }

    index += 1;
  }

  return -1;
};

/**
 * Memorize supplied context for recognize supplied object is context or
 *  name: handler pair object when off()
 * @param {object} ctx - context object to memorize
 * @private
 */
CustomEvents.prototype._memorizeContext = function(ctx) {
  var context, index;

  if (!isExisty(ctx)) {
    return;
  }

  context = this._safeContext();
  index = this._indexOfContext(ctx);

  if (index > -1) {
    context[index][1] += 1;
  } else {
    context.push([ctx, 1]);
  }
};

/**
 * Forget supplied context object
 * @param {object} ctx - context object to forget
 * @private
 */
CustomEvents.prototype._forgetContext = function(ctx) {
  var context, contextIndex;

  if (!isExisty(ctx)) {
    return;
  }

  context = this._safeContext();
  contextIndex = this._indexOfContext(ctx);

  if (contextIndex > -1) {
    context[contextIndex][1] -= 1;

    if (context[contextIndex][1] <= 0) {
      context.splice(contextIndex, 1);
    }
  }
};

/**
 * Bind event handler
 * @param {(string|{name:string, handler:function})} eventName - custom
 *  event name or an object {eventName: handler}
 * @param {(function|object)} [handler] - handler function or context
 * @param {object} [context] - context for binding
 * @private
 */
CustomEvents.prototype._bindEvent = function(eventName, handler, context) {
  var events = this._safeEvent(eventName);
  this._memorizeContext(context);
  events.push(this._getHandlerItem(handler, context));
};

/**
 * Bind event handlers
 * @param {(string|{name:string, handler:function})} eventName - custom
 *  event name or an object {eventName: handler}
 * @param {(function|object)} [handler] - handler function or context
 * @param {object} [context] - context for binding
 * //-- #1. Get Module --//
 * // ES6
 * import CustomEvents from 'tui-code-snippet/customEvents/customEvents'; 
 * 
 * // CommonJS
 * const CustomEvents = require('tui-code-snippet/customEvents/customEvents'); 
 *
 * //-- #2. Use method --//
 * // # 2.1 Basic Usage
 * CustomEvents.on('onload', handler);
 *
 * // # 2.2 With context
 * CustomEvents.on('onload', handler, myObj);
 *
 * // # 2.3 Bind by object that name, handler pairs
 * CustomEvents.on({
 *     'play': handler,
 *     'pause': handler2
 * });
 *
 * // # 2.4 Bind by object that name, handler pairs with context object
 * CustomEvents.on({
 *     'play': handler
 * }, myObj);
 */
CustomEvents.prototype.on = function(eventName, handler, context) {
  var self = this;

  if (isString(eventName)) {
    // [syntax 1, 2]
    eventName = eventName.split(R_EVENTNAME_SPLIT);
    forEach(eventName, function(name) {
      self._bindEvent(name, handler, context);
    });
  } else if (isObject(eventName)) {
    // [syntax 3, 4]
    context = handler;
    forEach(eventName, function(func, name) {
      self.on(name, func, context);
    });
  }
};

/**
 * Bind one-shot event handlers
 * @param {(string|{name:string,handler:function})} eventName - custom
 *  event name or an object {eventName: handler}
 * @param {function|object} [handler] - handler function or context
 * @param {object} [context] - context for binding
 */
CustomEvents.prototype.once = function(eventName, handler, context) {
  var self = this;

  if (isObject(eventName)) {
    context = handler;
    forEach(eventName, function(func, name) {
      self.once(name, func, context);
    });

    return;
  }

  function onceHandler() { // eslint-disable-line require-jsdoc
    handler.apply(context, arguments);
    self.off(eventName, onceHandler, context);
  }

  this.on(eventName, onceHandler, context);
};

/**
 * Splice supplied array by callback result
 * @param {array} arr - array to splice
 * @param {function} predicate - function return boolean
 * @private
 */
CustomEvents.prototype._spliceMatches = function(arr, predicate) {
  var i = 0;
  var len;

  if (!isArray(arr)) {
    return;
  }

  for (len = arr.length; i < len; i += 1) {
    if (predicate(arr[i]) === true) {
      arr.splice(i, 1);
      len -= 1;
      i -= 1;
    }
  }
};

/**
 * Get matcher for unbind specific handler events
 * @param {function} handler - handler function
 * @returns {function} handler matcher
 * @private
 */
CustomEvents.prototype._matchHandler = function(handler) {
  var self = this;

  return function(item) {
    var needRemove = handler === item.handler;

    if (needRemove) {
      self._forgetContext(item.context);
    }

    return needRemove;
  };
};

/**
 * Get matcher for unbind specific context events
 * @param {object} context - context
 * @returns {function} object matcher
 * @private
 */
CustomEvents.prototype._matchContext = function(context) {
  var self = this;

  return function(item) {
    var needRemove = context === item.context;

    if (needRemove) {
      self._forgetContext(item.context);
    }

    return needRemove;
  };
};

/**
 * Get matcher for unbind specific hander, context pair events
 * @param {function} handler - handler function
 * @param {object} context - context
 * @returns {function} handler, context matcher
 * @private
 */
CustomEvents.prototype._matchHandlerAndContext = function(handler, context) {
  var self = this;

  return function(item) {
    var matchHandler = (handler === item.handler);
    var matchContext = (context === item.context);
    var needRemove = (matchHandler && matchContext);

    if (needRemove) {
      self._forgetContext(item.context);
    }

    return needRemove;
  };
};

/**
 * Unbind event by event name
 * @param {string} eventName - custom event name to unbind
 * @param {function} [handler] - handler function
 * @private
 */
CustomEvents.prototype._offByEventName = function(eventName, handler) {
  var self = this;
  var andByHandler = isFunction(handler);
  var matchHandler = self._matchHandler(handler);

  eventName = eventName.split(R_EVENTNAME_SPLIT);

  forEach(eventName, function(name) {
    var handlerItems = self._safeEvent(name);

    if (andByHandler) {
      self._spliceMatches(handlerItems, matchHandler);
    } else {
      forEach(handlerItems, function(item) {
        self._forgetContext(item.context);
      });

      self.events[name] = [];
    }
  });
};

/**
 * Unbind event by handler function
 * @param {function} handler - handler function
 * @private
 */
CustomEvents.prototype._offByHandler = function(handler) {
  var self = this;
  var matchHandler = this._matchHandler(handler);

  forEach(this._safeEvent(), function(handlerItems) {
    self._spliceMatches(handlerItems, matchHandler);
  });
};

/**
 * Unbind event by object(name: handler pair object or context object)
 * @param {object} obj - context or {name: handler} pair object
 * @param {function} handler - handler function
 * @private
 */
CustomEvents.prototype._offByObject = function(obj, handler) {
  var self = this;
  var matchFunc;

  if (this._indexOfContext(obj) < 0) {
    forEach(obj, function(func, name) {
      self.off(name, func);
    });
  } else if (isString(handler)) {
    matchFunc = this._matchContext(obj);

    self._spliceMatches(this._safeEvent(handler), matchFunc);
  } else if (isFunction(handler)) {
    matchFunc = this._matchHandlerAndContext(handler, obj);

    forEach(this._safeEvent(), function(handlerItems) {
      self._spliceMatches(handlerItems, matchFunc);
    });
  } else {
    matchFunc = this._matchContext(obj);

    forEach(this._safeEvent(), function(handlerItems) {
      self._spliceMatches(handlerItems, matchFunc);
    });
  }
};

/**
 * Unbind custom events
 * @param {(string|object|function)} eventName - event name or context or
 *  {name: handler} pair object or handler function
 * @param {(function)} handler - handler function
 * @example
 * //-- #1. Get Module --//
 * // ES6
 * import CustomEvents from 'tui-code-snippet/customEvents/customEvents'; 
 * 
 * // CommonJS
 * const CustomEvents = require('tui-code-snippet/customEvents/customEvents'); 
 *
 * //-- #2. Use method --//
 * // # 2.1 off by event name
 * CustomEvents.off('onload');
 *
 * // # 2.2 off by event name and handler
 * CustomEvents.off('play', handler);
 *
 * // # 2.3 off by handler
 * CustomEvents.off(handler);
 *
 * // # 2.4 off by context
 * CustomEvents.off(myObj);
 *
 * // # 2.5 off by context and handler
 * CustomEvents.off(myObj, handler);
 *
 * // # 2.6 off by context and event name
 * CustomEvents.off(myObj, 'onload');
 *
 * // # 2.7 off by an Object.<string, function> that is {eventName: handler}
 * CustomEvents.off({
 *   'play': handler,
 *   'pause': handler2
 * });
 *
 * // # 2.8 off the all events
 * CustomEvents.off();
 */
CustomEvents.prototype.off = function(eventName, handler) {
  if (isString(eventName)) {
    // [syntax 1, 2]
    this._offByEventName(eventName, handler);
  } else if (!arguments.length) {
    // [syntax 8]
    this.events = {};
    this.contexts = [];
  } else if (isFunction(eventName)) {
    // [syntax 3]
    this._offByHandler(eventName);
  } else if (isObject(eventName)) {
    // [syntax 4, 5, 6]
    this._offByObject(eventName, handler);
  }
};

/**
 * Fire custom event
 * @param {string} eventName - name of custom event
 */
CustomEvents.prototype.fire = function(eventName) {  // eslint-disable-line
  this.invoke.apply(this, arguments);
};

/**
 * Fire a event and returns the result of operation 'boolean AND' with all
 *  listener's results.
 *
 * So, It is different from {@link CustomEvents#fire}.
 *
 * In service code, use this as a before event in component level usually
 *  for notifying that the event is cancelable.
 * @param {string} eventName - Custom event name
 * @param {...*} data - Data for event
 * @returns {boolean} The result of operation 'boolean AND'
 * @example
 * const map = new Map();
 * map.on({
 *   'beforeZoom': function() {
 *     // It should cancel the 'zoom' event by some conditions.
 *     if (that.disabled && this.getState()) {
 *       return false;
 *     }
 *     return true;
 *   }
 * });
 *
 * if (this.invoke('beforeZoom')) {    // check the result of 'beforeZoom'
 *   // if true,
 *   // doSomething
 * }
 */
CustomEvents.prototype.invoke = function(eventName) {
  var events, args, index, item;

  if (!this.hasListener(eventName)) {
    return true;
  }

  events = this._safeEvent(eventName);
  args = Array.prototype.slice.call(arguments, 1);
  index = 0;

  while (events[index]) {
    item = events[index];

    if (item.handler.apply(item.context, args) === false) {
      return false;
    }

    index += 1;
  }

  return true;
};

/**
 * Return whether at least one of the handlers is registered in the given
 *  event name.
 * @param {string} eventName - Custom event name
 * @returns {boolean} Is there at least one handler in event name?
 */
CustomEvents.prototype.hasListener = function(eventName) {
  return this.getListenerLength(eventName) > 0;
};

/**
 * Return a count of events registered.
 * @param {string} eventName - Custom event name
 * @returns {number} number of event
 */
CustomEvents.prototype.getListenerLength = function(eventName) {
  var events = this._safeEvent(eventName);

  return events.length;
};

module.exports = CustomEvents;


/***/ }),

/***/ 7969:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Extend the target object from other objects.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * @module object
 */

/**
 * Extend the target object from other objects.
 * @param {object} target - Object that will be extended
 * @param {...object} objects - Objects as sources
 * @returns {object} Extended object
 * @memberof module:object
 */
function extend(target, objects) { // eslint-disable-line no-unused-vars
  var hasOwnProp = Object.prototype.hasOwnProperty;
  var source, prop, i, len;

  for (i = 1, len = arguments.length; i < len; i += 1) {
    source = arguments[i];
    for (prop in source) {
      if (hasOwnProp.call(source, prop)) {
        target[prop] = source[prop];
      }
    }
  }

  return target;
}

module.exports = extend;


/***/ }),

/***/ 4254:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Request image ping.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var forEachOwnProperties = __webpack_require__(6956);

/**
 * @module request
 */

/**
 * Request image ping.
 * @param {String} url url for ping request
 * @param {Object} trackingInfo infos for make query string
 * @returns {HTMLElement}
 * @memberof module:request
 * @example
 * // ES6
 * import imagePing from 'tui-code-snippet/request/imagePing';
 * 
 * // CommonJS
 * const imagePing = require('tui-code-snippet/request/imagePing');
 *
 * imagePing('https://www.google-analytics.com/collect', {
 *   v: 1,
 *   t: 'event',
 *   tid: 'trackingid',
 *   cid: 'cid',
 *   dp: 'dp',
 *   dh: 'dh'
 * });
 */
function imagePing(url, trackingInfo) {
  var trackingElement = document.createElement('img');
  var queryString = '';
  forEachOwnProperties(trackingInfo, function(value, key) {
    queryString += '&' + key + '=' + value;
  });
  queryString = queryString.substring(1);

  trackingElement.src = url + '?' + queryString;

  trackingElement.style.display = 'none';
  document.body.appendChild(trackingElement);
  document.body.removeChild(trackingElement);

  return trackingElement;
}

module.exports = imagePing;


/***/ }),

/***/ 1391:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Send hostname on DOMContentLoaded.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isUndefined = __webpack_require__(3929);
var imagePing = __webpack_require__(4254);

var ms7days = 7 * 24 * 60 * 60 * 1000;

/**
 * Check if the date has passed 7 days
 * @param {number} date - milliseconds
 * @returns {boolean}
 * @private
 */
function isExpired(date) {
  var now = new Date().getTime();

  return now - date > ms7days;
}

/**
 * Send hostname on DOMContentLoaded.
 * To prevent hostname set tui.usageStatistics to false.
 * @param {string} appName - application name
 * @param {string} trackingId - GA tracking ID
 * @ignore
 */
function sendHostname(appName, trackingId) {
  var url = 'https://www.google-analytics.com/collect';
  var hostname = location.hostname;
  var hitType = 'event';
  var eventCategory = 'use';
  var applicationKeyForStorage = 'TOAST UI ' + appName + ' for ' + hostname + ': Statistics';
  var date = window.localStorage.getItem(applicationKeyForStorage);

  // skip if the flag is defined and is set to false explicitly
  if (!isUndefined(window.tui) && window.tui.usageStatistics === false) {
    return;
  }

  // skip if not pass seven days old
  if (date && !isExpired(date)) {
    return;
  }

  window.localStorage.setItem(applicationKeyForStorage, new Date().getTime());

  setTimeout(function() {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      imagePing(url, {
        v: 1,
        t: hitType,
        tid: trackingId,
        cid: hostname,
        dp: hostname,
        dh: appName,
        el: appName,
        ec: eventCategory
      });
    }
  }, 1000);
}

module.exports = sendHostname;


/***/ }),

/***/ 7322:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Check whether the given variable is an instance of Array or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is an instance of Array or not.
 * If the given variable is an instance of Array, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is array instance?
 * @memberof module:type
 */
function isArray(obj) {
  return obj instanceof Array;
}

module.exports = isArray;


/***/ }),

/***/ 1326:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Check whether the given variable is a string or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a boolean or not.
 *  If the given variable is a boolean, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is boolean?
 * @memberof module:type
 */
function isBoolean(obj) {
  return typeof obj === 'boolean' || obj instanceof Boolean;
}

module.exports = isBoolean;


/***/ }),

/***/ 7065:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Check whether the given variable is existing or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



var isUndefined = __webpack_require__(3929);
var isNull = __webpack_require__(2934);

/**
 * Check whether the given variable is existing or not.
 * If the given variable is not null and not undefined, returns true.
 * @param {*} param - Target for checking
 * @returns {boolean} Is existy?
 * @memberof module:type
 * @example
 * // ES6
 * import isExisty from 'tui-code-snippet/type/isExisty');
 * 
 * // CommonJS
 * const isExisty = require('tui-code-snippet/type/isExisty');
 *
 * isExisty(''); //true
 * isExisty(0); //true
 * isExisty([]); //true
 * isExisty({}); //true
 * isExisty(null); //false
 * isExisty(undefined); //false
*/
function isExisty(param) {
  return !isUndefined(param) && !isNull(param);
}

module.exports = isExisty;


/***/ }),

/***/ 4294:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Check whether the given variable is a function or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a function or not.
 * If the given variable is a function, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is function?
 * @memberof module:type
 */
function isFunction(obj) {
  return obj instanceof Function;
}

module.exports = isFunction;


/***/ }),

/***/ 2934:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Check whether the given variable is null or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is null or not.
 * If the given variable(arguments[0]) is null, returns true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is null?
 * @memberof module:type
 */
function isNull(obj) {
  return obj === null;
}

module.exports = isNull;


/***/ }),

/***/ 321:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Check whether the given variable is a number or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is a number or not.
 * If the given variable is a number, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is number?
 * @memberof module:type
 */
function isNumber(obj) {
  return typeof obj === 'number' || obj instanceof Number;
}

module.exports = isNumber;


/***/ }),

/***/ 5758:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Check whether the given variable is an object or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is an object or not.
 * If the given variable is an object, return true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is object?
 * @memberof module:type
 */
function isObject(obj) {
  return obj === Object(obj);
}

module.exports = isObject;


/***/ }),

/***/ 758:
/***/ (function(module) {

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

/***/ 3929:
/***/ (function(module) {

"use strict";
/**
 * @fileoverview Check whether the given variable is undefined or not.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */



/**
 * Check whether the given variable is undefined or not.
 * If the given variable is undefined, returns true.
 * @param {*} obj - Target for checking
 * @returns {boolean} Is undefined?
 * @memberof module:type
 */
function isUndefined(obj) {
  return obj === undefined; // eslint-disable-line no-undefined
}

module.exports = isUndefined;


/***/ }),

/***/ 4268:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__4268__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// extracted by mini-css-extract-plugin

}();
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ src_0; }
});

// UNUSED EXPORTS: Day, Month, TZDate, Week

;// CONCATENATED MODULE: ../../node_modules/preact/dist/preact.module.js
var n,preact_module_l,u,i,t,o,r,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n)}function h(l,u,i){var t,o,r,f={};for(r in u)"key"==r?t=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):i),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return v(l,f,t,o,null)}function v(n,i,t,o,r){var f={type:n,props:i,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++u:r};return null==r&&null!=preact_module_l.vnode&&preact_module_l.vnode(f),f}function y(){return{current:null}}function p(n){return n.children}function d(n,l){this.props=n,this.context=l}function _(n,l){if(null==l)return n.__?_(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?_(n):null}function k(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return k(n)}}function b(n){(!n.__d&&(n.__d=!0)&&t.push(n)&&!g.__r++||o!==preact_module_l.debounceRendering)&&((o=preact_module_l.debounceRendering)||setTimeout)(g)}function g(){for(var n;g.__r=t.length;)n=t.sort(function(n,l){return n.__v.__b-l.__v.__b}),t=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=s({},t)).__v=t.__v+1,j(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?_(t):o,t.__h),z(u,t),t.__e!=o&&k(t)))})}function w(n,l,u,i,t,o,r,c,s,a){var h,y,d,k,b,g,w,x=i&&i.__k||e,C=x.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k||"bigint"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(p,{children:k},null,null,null):k.__b>0?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(d=x[h])||d&&k.key==d.key&&k.type===d.type)x[h]=void 0;else for(y=0;y<C;y++){if((d=x[y])&&k.key==d.key&&k.type===d.type){x[y]=void 0;break}d=null}j(n,k,d=d||f,t,o,r,c,s,a),b=k.__e,(y=k.ref)&&d.ref!=y&&(w||(w=[]),d.ref&&w.push(d.ref,null,k),w.push(y,k.__c||b,k)),null!=b?(null==g&&(g=b),"function"==typeof k.type&&k.__k===d.__k?k.__d=s=m(k,s,n):s=A(n,k,d,x,b,s),"function"==typeof u.type&&(u.__d=s)):s&&d.__e==s&&s.parentNode!=n&&(s=_(d))}for(u.__e=g,h=C;h--;)null!=x[h]&&("function"==typeof u.type&&null!=x[h].__e&&x[h].__e==u.__d&&(u.__d=_(i,h+1)),N(x[h],x[h]));if(w)for(h=0;h<w.length;h++)M(w[h],w[++h],w[++h])}function m(n,l,u){for(var i,t=n.__k,o=0;t&&o<t.length;o++)(i=t[o])&&(i.__=n,l="function"==typeof i.type?m(i,l,u):A(u,i,i,t,i.__e,l));return l}function x(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){x(n,l)}):l.push(n)),l}function A(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else{for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o}return void 0!==r?r:t.nextSibling}function C(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||H(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||H(n,o,l[o],u[o],i)}function $(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||c.test(l)?u:u+"px"}function H(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||$(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||$(n.style,l,u[l])}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?T:I,o):n.removeEventListener(l,o?T:I,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l))}}function I(n){this.l[n.type+!1](preact_module_l.event?preact_module_l.event(n):n)}function T(n){this.l[n.type+!0](preact_module_l.event?preact_module_l.event(n):n)}function j(n,u,i,t,o,r,f,e,c){var a,h,v,y,_,k,b,g,m,x,A,C,$,H=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=preact_module_l.__b)&&a(u);try{n:if("function"==typeof H){if(g=u.props,m=(a=H.contextType)&&t[a.__c],x=a?m?m.props.value:a.__:t,i.__c?b=(h=u.__c=i.__c).__=h.__E:("prototype"in H&&H.prototype.render?u.__c=h=new H(g,x):(u.__c=h=new d(g,x),h.constructor=H,h.render=O),m&&m.sub(h),h.props=g,h.state||(h.state={}),h.context=x,h.__n=t,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=H.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=s({},h.__s)),s(h.__s,H.getDerivedStateFromProps(g,h.__s))),y=h.props,_=h.state,v)null==H.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(null==H.getDerivedStateFromProps&&g!==y&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(g,x),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(g,h.__s,x)||u.__v===i.__v){h.props=g,h.state=h.__s,u.__v!==i.__v&&(h.__d=!1),h.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u)}),h.__h.length&&f.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(g,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(y,_,k)})}if(h.context=x,h.props=g,h.__v=u,h.__P=n,A=preact_module_l.__r,C=0,"prototype"in H&&H.prototype.render)h.state=h.__s,h.__d=!1,A&&A(u),a=h.render(h.props,h.state,h.context);else do{h.__d=!1,A&&A(u),a=h.render(h.props,h.state,h.context),h.state=h.__s}while(h.__d&&++C<25);h.state=h.__s,null!=h.getChildContext&&(t=s(s({},t),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(k=h.getSnapshotBeforeUpdate(y,_)),$=null!=a&&a.type===p&&null==a.key?a.props.children:a,w(n,Array.isArray($)?$:[$],u,i,t,o,r,f,e,c),h.base=u.__e,u.__h=null,h.__h.length&&f.push(h),b&&(h.__E=h.__=null),h.__e=!1}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=L(i.__e,u,i,t,o,r,f,c);(a=preact_module_l.diffed)&&a(u)}catch(n){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),preact_module_l.__e(n,u,i)}}function z(n,u){preact_module_l.__c&&preact_module_l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u)})}catch(n){preact_module_l.__e(n,u.__v)}})}function L(l,u,i,t,o,r,e,c){var s,h,v,y=i.props,p=u.props,d=u.type,k=0;if("svg"===d&&(o=!0),null!=r)for(;k<r.length;k++)if((s=r[k])&&"setAttribute"in s==!!d&&(d?s.localName===d:3===s.nodeType)){l=s,r[k]=null;break}if(null==l){if(null===d)return document.createTextNode(p);l=o?document.createElementNS("http://www.w3.org/2000/svg",d):document.createElement(d,p.is&&p),r=null,c=!1}if(null===d)y===p||c&&l.data===p||(l.data=p);else{if(r=r&&n.call(l.childNodes),h=(y=i.props||f).dangerouslySetInnerHTML,v=p.dangerouslySetInnerHTML,!c){if(null!=r)for(y={},k=0;k<l.attributes.length;k++)y[l.attributes[k].name]=l.attributes[k].value;(v||h)&&(v&&(h&&v.__html==h.__html||v.__html===l.innerHTML)||(l.innerHTML=v&&v.__html||""))}if(C(l,p,y,o,c),v)u.__k=[];else if(k=u.props.children,w(l,Array.isArray(k)?k:[k],u,i,t,o&&"foreignObject"!==d,r,e,r?r[0]:i.__k&&_(i,0),c),null!=r)for(k=r.length;k--;)null!=r[k]&&a(r[k]);c||("value"in p&&void 0!==(k=p.value)&&(k!==l.value||"progress"===d&&!k||"option"===d&&k!==y.value)&&H(l,"value",k,y.value,!1),"checked"in p&&void 0!==(k=p.checked)&&k!==l.checked&&H(l,"checked",k,y.checked,!1))}return l}function M(n,u,i){try{"function"==typeof n?n(u):n.current=u}catch(n){preact_module_l.__e(n,i)}}function N(n,u,i){var t,o;if(preact_module_l.unmount&&preact_module_l.unmount(n),(t=n.ref)&&(t.current&&t.current!==n.__e||M(t,null,u)),null!=(t=n.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount()}catch(n){preact_module_l.__e(n,u)}t.base=t.__P=null}if(t=n.__k)for(o=0;o<t.length;o++)t[o]&&N(t[o],u,"function"!=typeof n.type);i||null==n.__e||a(n.__e),n.__e=n.__d=void 0}function O(n,l,u){return this.constructor(n,u)}function P(u,i,t){var o,r,e;preact_module_l.__&&preact_module_l.__(u,i),r=(o="function"==typeof t)?null:t&&t.__k||i.__k,e=[],j(i,u=(!o&&t||i).__k=h(p,null,[u]),r||f,f,void 0!==i.ownerSVGElement,!o&&t?[t]:r?null:i.firstChild?n.call(i.childNodes):null,e,!o&&t?t:r?r.__e:i.firstChild,o),z(e,u)}function S(n,l){P(n,l,S)}function q(l,u,i){var t,o,r,f=s({},l.props);for(r in u)"key"==r?t=u[r]:"ref"==r?o=u[r]:f[r]=u[r];return arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):i),v(l.type,f,t||l.key,o||l.ref,null)}function B(n,l){var u={__c:l="__cC"+r++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(b)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n=e.slice,preact_module_l={__e:function(n,l,u,i){for(var t,o,r;l=l.__;)if((t=l.__c)&&!t.__)try{if((o=t.constructor)&&null!=o.getDerivedStateFromError&&(t.setState(o.getDerivedStateFromError(n)),r=t.__d),null!=t.componentDidCatch&&(t.componentDidCatch(n,i||{}),r=t.__d),r)return t.__E=t}catch(l){n=l}throw n}},u=0,i=function(n){return null!=n&&void 0===n.constructor},d.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(s({},u),this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),b(this))},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),b(this))},d.prototype.render=p,t=[],g.__r=0,r=0;
//# sourceMappingURL=preact.module.js.map

;// CONCATENATED MODULE: ../../node_modules/preact/hooks/dist/hooks.module.js
var hooks_module_t,hooks_module_u,hooks_module_r,hooks_module_o,hooks_module_i=0,hooks_module_c=[],hooks_module_f=[],hooks_module_e=preact_module_l.__b,hooks_module_a=preact_module_l.__r,hooks_module_v=preact_module_l.diffed,l=preact_module_l.__c,hooks_module_m=preact_module_l.unmount;function hooks_module_p(t,r){preact_module_l.__h&&preact_module_l.__h(hooks_module_u,t,hooks_module_i||r),hooks_module_i=0;var o=hooks_module_u.__H||(hooks_module_u.__H={__:[],__h:[]});return t>=o.__.length&&o.__.push({__V:hooks_module_f}),o.__[t]}function hooks_module_y(n){return hooks_module_i=1,hooks_module_d(hooks_module_z,n)}function hooks_module_d(n,r,o){var i=hooks_module_p(hooks_module_t++,2);return i.t=n,i.__c||(i.__=[o?o(r):hooks_module_z(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}))}],i.__c=hooks_module_u),i.__}function hooks_module_(r,o){var i=hooks_module_p(hooks_module_t++,3);!preact_module_l.__s&&hooks_module_w(i.__H,o)&&(i.__=r,i.u=o,hooks_module_u.__H.__h.push(i))}function hooks_module_h(r,o){var i=hooks_module_p(hooks_module_t++,4);!preact_module_l.__s&&hooks_module_w(i.__H,o)&&(i.__=r,i.u=o,hooks_module_u.__h.push(i))}function hooks_module_s(n){return hooks_module_i=5,F(function(){return{current:n}},[])}function hooks_module_A(n,t,u){hooks_module_i=6,hooks_module_h(function(){return"function"==typeof n?(n(t()),function(){return n(null)}):n?(n.current=t(),function(){return n.current=null}):void 0},null==u?u:u.concat(n))}function F(n,u){var r=hooks_module_p(hooks_module_t++,7);return hooks_module_w(r.__H,u)?(r.__V=n(),r.u=u,r.__h=n,r.__V):r.__}function hooks_module_T(n,t){return hooks_module_i=8,F(function(){return n},t)}function hooks_module_q(n){var r=hooks_module_u.context[n.__c],o=hooks_module_p(hooks_module_t++,9);return o.c=n,r?(null==o.__&&(o.__=!0,r.sub(hooks_module_u)),r.props.value):n.__}function hooks_module_x(t,u){preact_module_l.useDebugValue&&preact_module_l.useDebugValue(u?u(t):t)}function V(n){var r=hooks_module_p(hooks_module_t++,10),o=hooks_module_y();return r.__=n,hooks_module_u.componentDidCatch||(hooks_module_u.componentDidCatch=function(n){r.__&&r.__(n),o[1](n)}),[o[0],function(){o[1](void 0)}]}function hooks_module_b(){for(var t;t=hooks_module_c.shift();)if(t.__P)try{t.__H.__h.forEach(hooks_module_j),t.__H.__h.forEach(hooks_module_k),t.__H.__h=[]}catch(u){t.__H.__h=[],preact_module_l.__e(u,t.__v)}}preact_module_l.__b=function(n){hooks_module_u=null,hooks_module_e&&hooks_module_e(n)},preact_module_l.__r=function(n){hooks_module_a&&hooks_module_a(n),hooks_module_t=0;var o=(hooks_module_u=n.__c).__H;o&&(hooks_module_r===hooks_module_u?(o.__h=[],hooks_module_u.__h=[],o.__.forEach(function(n){n.__V=hooks_module_f,n.u=void 0})):(o.__h.forEach(hooks_module_j),o.__h.forEach(hooks_module_k),o.__h=[])),hooks_module_r=hooks_module_u},preact_module_l.diffed=function(t){hooks_module_v&&hooks_module_v(t);var i=t.__c;i&&i.__H&&(i.__H.__h.length&&(1!==hooks_module_c.push(i)&&hooks_module_o===preact_module_l.requestAnimationFrame||((hooks_module_o=preact_module_l.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),hooks_module_g&&cancelAnimationFrame(t),setTimeout(n)},r=setTimeout(u,100);hooks_module_g&&(t=requestAnimationFrame(u))})(hooks_module_b)),i.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.__V!==hooks_module_f&&(n.__=n.__V),n.u=void 0,n.__V=hooks_module_f})),hooks_module_r=hooks_module_u=null},preact_module_l.__c=function(t,u){u.some(function(t){try{t.__h.forEach(hooks_module_j),t.__h=t.__h.filter(function(n){return!n.__||hooks_module_k(n)})}catch(r){u.some(function(n){n.__h&&(n.__h=[])}),u=[],preact_module_l.__e(r,t.__v)}}),l&&l(t,u)},preact_module_l.unmount=function(t){hooks_module_m&&hooks_module_m(t);var u,r=t.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{hooks_module_j(n)}catch(n){u=n}}),u&&preact_module_l.__e(u,r.__v))};var hooks_module_g="function"==typeof requestAnimationFrame;function hooks_module_j(n){var t=hooks_module_u,r=n.__c;"function"==typeof r&&(n.__c=void 0,r()),hooks_module_u=t}function hooks_module_k(n){var t=hooks_module_u;n.__c=n.__(),hooks_module_u=t}function hooks_module_w(n,t){return!n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function hooks_module_z(n,t){return"function"==typeof t?t(n):t}
//# sourceMappingURL=hooks.module.js.map

// EXTERNAL MODULE: ../../node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(6886);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(9529);
;// CONCATENATED MODULE: ../../node_modules/immer/dist/immer.esm.mjs
function immer_esm_n(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];if(false){ var i, o; }throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map((function(n){return"'"+n+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function immer_esm_r(n){return!!n&&!!n[Q]}function immer_esm_t(n){return!!n&&(function(n){if(!n||"object"!=typeof n)return!1;var r=Object.getPrototypeOf(n);if(null===r)return!0;var t=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return t===Object||"function"==typeof t&&Function.toString.call(t)===Z}(n)||Array.isArray(n)||!!n[immer_esm_L]||!!n.constructor[immer_esm_L]||immer_esm_s(n)||immer_esm_v(n))}function immer_esm_e(t){return immer_esm_r(t)||immer_esm_n(23,t),t[Q].t}function immer_esm_i(n,r,t){void 0===t&&(t=!1),0===immer_esm_o(n)?(t?Object.keys:nn)(n).forEach((function(e){t&&"symbol"==typeof e||r(e,n[e],n)})):n.forEach((function(t,e){return r(e,t,n)}))}function immer_esm_o(n){var r=n[Q];return r?r.i>3?r.i-4:r.i:Array.isArray(n)?1:immer_esm_s(n)?2:immer_esm_v(n)?3:0}function immer_esm_u(n,r){return 2===immer_esm_o(n)?n.has(r):Object.prototype.hasOwnProperty.call(n,r)}function immer_esm_a(n,r){return 2===immer_esm_o(n)?n.get(r):n[r]}function immer_esm_f(n,r,t){var e=immer_esm_o(n);2===e?n.set(r,t):3===e?(n.delete(r),n.add(t)):n[r]=t}function immer_esm_c(n,r){return n===r?0!==n||1/n==1/r:n!=n&&r!=r}function immer_esm_s(n){return X&&n instanceof Map}function immer_esm_v(n){return immer_esm_q&&n instanceof Set}function immer_esm_p(n){return n.o||n.t}function immer_esm_l(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var r=rn(n);delete r[Q];for(var t=nn(r),e=0;e<t.length;e++){var i=t[e],o=r[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(r[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]})}return Object.create(Object.getPrototypeOf(n),r)}function immer_esm_d(n,e){return void 0===e&&(e=!1),immer_esm_y(n)||immer_esm_r(n)||!immer_esm_t(n)?n:(immer_esm_o(n)>1&&(n.set=n.add=n.clear=n.delete=immer_esm_h),Object.freeze(n),e&&immer_esm_i(n,(function(n,r){return immer_esm_d(r,!0)}),!0),n)}function immer_esm_h(){immer_esm_n(2)}function immer_esm_y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function immer_esm_b(r){var t=tn[r];return t||immer_esm_n(18,r),t}function immer_esm_m(n,r){tn[n]||(tn[n]=r)}function immer_esm_(){return true||0,U}function immer_esm_j(n,r){r&&(immer_esm_b("Patches"),n.u=[],n.s=[],n.v=r)}function immer_esm_O(n){immer_esm_g(n),n.p.forEach(immer_esm_S),n.p=null}function immer_esm_g(n){n===U&&(U=n.l)}function immer_esm_w(n){return U={p:[],l:U,h:n,m:!0,_:0}}function immer_esm_S(n){var r=n[Q];0===r.i||1===r.i?r.j():r.O=!0}function immer_esm_P(r,e){e._=e.p.length;var i=e.p[0],o=void 0!==r&&r!==i;return e.h.g||immer_esm_b("ES5").S(e,r,o),o?(i[Q].P&&(immer_esm_O(e),immer_esm_n(4)),immer_esm_t(r)&&(r=immer_esm_M(e,r),e.l||immer_esm_x(e,r)),e.u&&immer_esm_b("Patches").M(i[Q].t,r,e.u,e.s)):r=immer_esm_M(e,i,[]),immer_esm_O(e),e.u&&e.v(e.u,e.s),r!==immer_esm_H?r:void 0}function immer_esm_M(n,r,t){if(immer_esm_y(r))return r;var e=r[Q];if(!e)return immer_esm_i(r,(function(i,o){return immer_esm_A(n,e,r,i,o,t)}),!0),r;if(e.A!==n)return r;if(!e.P)return immer_esm_x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=immer_esm_l(e.k):e.o;immer_esm_i(3===e.i?new Set(o):o,(function(r,i){return immer_esm_A(n,e,o,r,i,t)})),immer_esm_x(n,o,!1),t&&n.u&&immer_esm_b("Patches").R(e,t,n.u,n.s)}return e.o}function immer_esm_A(e,i,o,a,c,s){if( false&&0,immer_esm_r(c)){var v=immer_esm_M(e,c,s&&i&&3!==i.i&&!immer_esm_u(i.D,a)?s.concat(a):void 0);if(immer_esm_f(o,a,v),!immer_esm_r(v))return;e.m=!1}if(immer_esm_t(c)&&!immer_esm_y(c)){if(!e.h.F&&e._<1)return;immer_esm_M(e,c),i&&i.A.l||immer_esm_x(e,c)}}function immer_esm_x(n,r,t){void 0===t&&(t=!1),n.h.F&&n.m&&immer_esm_d(r,t)}function immer_esm_z(n,r){var t=n[Q];return(t?immer_esm_p(t):n)[r]}function immer_esm_I(n,r){if(r in n)for(var t=Object.getPrototypeOf(n);t;){var e=Object.getOwnPropertyDescriptor(t,r);if(e)return e;t=Object.getPrototypeOf(t)}}function immer_esm_k(n){n.P||(n.P=!0,n.l&&immer_esm_k(n.l))}function E(n){n.o||(n.o=immer_esm_l(n.t))}function R(n,r,t){var e=immer_esm_s(r)?immer_esm_b("MapSet").N(r,t):immer_esm_v(r)?immer_esm_b("MapSet").T(r,t):n.g?function(n,r){var t=Array.isArray(n),e={i:t?1:0,A:r?r.A:immer_esm_(),P:!1,I:!1,D:{},l:r,t:n,k:null,o:null,j:null,C:!1},i=e,o=en;t&&(i=[e],o=on);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(r,t):immer_esm_b("ES5").J(r,t);return(t?t.A:immer_esm_()).p.push(e),e}function D(e){return immer_esm_r(e)||immer_esm_n(22,e),function n(r){if(!immer_esm_t(r))return r;var e,u=r[Q],c=immer_esm_o(r);if(u){if(!u.P&&(u.i<4||!immer_esm_b("ES5").K(u)))return u.t;u.I=!0,e=immer_esm_F(r,c),u.I=!1}else e=immer_esm_F(r,c);return immer_esm_i(e,(function(r,t){u&&immer_esm_a(u.t,r)===t||immer_esm_f(e,r,n(t))})),3===c?new Set(e):e}(e)}function immer_esm_F(n,r){switch(r){case 2:return new Map(n);case 3:return Array.from(n)}return immer_esm_l(n)}function immer_esm_N(){function t(n,r){var t=s[n];return t?t.enumerable=r:s[n]=t={configurable:!0,enumerable:r,get:function(){var r=this[Q];return false&&0,en.get(r,n)},set:function(r){var t=this[Q]; false&&0,en.set(t,n,r)}},t}function e(n){for(var r=n.length-1;r>=0;r--){var t=n[r][Q];if(!t.P)switch(t.i){case 5:a(t)&&immer_esm_k(t);break;case 4:o(t)&&immer_esm_k(t)}}}function o(n){for(var r=n.t,t=n.k,e=nn(t),i=e.length-1;i>=0;i--){var o=e[i];if(o!==Q){var a=r[o];if(void 0===a&&!immer_esm_u(r,o))return!0;var f=t[o],s=f&&f[Q];if(s?s.t!==a:!immer_esm_c(f,a))return!0}}var v=!!r[Q];return e.length!==nn(r).length+(v?0:1)}function a(n){var r=n.k;if(r.length!==n.t.length)return!0;var t=Object.getOwnPropertyDescriptor(r,r.length-1);if(t&&!t.get)return!0;for(var e=0;e<r.length;e++)if(!r.hasOwnProperty(e))return!0;return!1}function f(r){r.O&&immer_esm_n(3,JSON.stringify(immer_esm_p(r)))}var s={};immer_esm_m("ES5",{J:function(n,r){var e=Array.isArray(n),i=function(n,r){if(n){for(var e=Array(r.length),i=0;i<r.length;i++)Object.defineProperty(e,""+i,t(i,!0));return e}var o=rn(r);delete o[Q];for(var u=nn(o),a=0;a<u.length;a++){var f=u[a];o[f]=t(f,n||!!o[f].enumerable)}return Object.create(Object.getPrototypeOf(r),o)}(e,n),o={i:e?5:4,A:r?r.A:immer_esm_(),P:!1,I:!1,D:{},l:r,t:n,k:i,o:null,O:!1,C:!1};return Object.defineProperty(i,Q,{value:o,writable:!0}),i},S:function(n,t,o){o?immer_esm_r(t)&&t[Q].A===n&&e(n.p):(n.u&&function n(r){if(r&&"object"==typeof r){var t=r[Q];if(t){var e=t.t,o=t.k,f=t.D,c=t.i;if(4===c)immer_esm_i(o,(function(r){r!==Q&&(void 0!==e[r]||immer_esm_u(e,r)?f[r]||n(o[r]):(f[r]=!0,immer_esm_k(t)))})),immer_esm_i(e,(function(n){void 0!==o[n]||immer_esm_u(o,n)||(f[n]=!1,immer_esm_k(t))}));else if(5===c){if(a(t)&&(immer_esm_k(t),f.length=!0),o.length<e.length)for(var s=o.length;s<e.length;s++)f[s]=!1;else for(var v=e.length;v<o.length;v++)f[v]=!0;for(var p=Math.min(o.length,e.length),l=0;l<p;l++)o.hasOwnProperty(l)||(f[l]=!0),void 0===f[l]&&n(o[l])}}}}(n.p[0]),e(n.p))},K:function(n){return 4===n.i?o(n):a(n)}})}function immer_esm_T(){function e(n){if(!immer_esm_t(n))return n;if(Array.isArray(n))return n.map(e);if(immer_esm_s(n))return new Map(Array.from(n.entries()).map((function(n){return[n[0],e(n[1])]})));if(immer_esm_v(n))return new Set(Array.from(n).map(e));var r=Object.create(Object.getPrototypeOf(n));for(var i in n)r[i]=e(n[i]);return immer_esm_u(n,immer_esm_L)&&(r[immer_esm_L]=n[immer_esm_L]),r}function f(n){return immer_esm_r(n)?e(n):n}var c="add";immer_esm_m("Patches",{$:function(r,t){return t.forEach((function(t){for(var i=t.path,u=t.op,f=r,s=0;s<i.length-1;s++){var v=immer_esm_o(f),p=""+i[s];0!==v&&1!==v||"__proto__"!==p&&"constructor"!==p||immer_esm_n(24),"function"==typeof f&&"prototype"===p&&immer_esm_n(24),"object"!=typeof(f=immer_esm_a(f,p))&&immer_esm_n(15,i.join("/"))}var l=immer_esm_o(f),d=e(t.value),h=i[i.length-1];switch(u){case"replace":switch(l){case 2:return f.set(h,d);case 3:immer_esm_n(16);default:return f[h]=d}case c:switch(l){case 1:return"-"===h?f.push(d):f.splice(h,0,d);case 2:return f.set(h,d);case 3:return f.add(d);default:return f[h]=d}case"remove":switch(l){case 1:return f.splice(h,1);case 2:return f.delete(h);case 3:return f.delete(t.value);default:return delete f[h]}default:immer_esm_n(17,u)}})),r},R:function(n,r,t,e){switch(n.i){case 0:case 4:case 2:return function(n,r,t,e){var o=n.t,s=n.o;immer_esm_i(n.D,(function(n,i){var v=immer_esm_a(o,n),p=immer_esm_a(s,n),l=i?immer_esm_u(o,n)?"replace":c:"remove";if(v!==p||"replace"!==l){var d=r.concat(n);t.push("remove"===l?{op:l,path:d}:{op:l,path:d,value:p}),e.push(l===c?{op:"remove",path:d}:"remove"===l?{op:c,path:d,value:f(v)}:{op:"replace",path:d,value:f(v)})}}))}(n,r,t,e);case 5:case 1:return function(n,r,t,e){var i=n.t,o=n.D,u=n.o;if(u.length<i.length){var a=[u,i];i=a[0],u=a[1];var s=[e,t];t=s[0],e=s[1]}for(var v=0;v<i.length;v++)if(o[v]&&u[v]!==i[v]){var p=r.concat([v]);t.push({op:"replace",path:p,value:f(u[v])}),e.push({op:"replace",path:p,value:f(i[v])})}for(var l=i.length;l<u.length;l++){var d=r.concat([l]);t.push({op:c,path:d,value:f(u[l])})}i.length<u.length&&e.push({op:"replace",path:r.concat(["length"]),value:i.length})}(n,r,t,e);case 3:return function(n,r,t,e){var i=n.t,o=n.o,u=0;i.forEach((function(n){if(!o.has(n)){var i=r.concat([u]);t.push({op:"remove",path:i,value:n}),e.unshift({op:c,path:i,value:n})}u++})),u=0,o.forEach((function(n){if(!i.has(n)){var o=r.concat([u]);t.push({op:c,path:o,value:n}),e.unshift({op:"remove",path:o,value:n})}u++}))}(n,r,t,e)}},M:function(n,r,t,e){t.push({op:"replace",path:[],value:r===immer_esm_H?void 0:r}),e.push({op:"replace",path:[],value:n})}})}function immer_esm_C(){function r(n,r){function t(){this.constructor=n}a(n,r),n.prototype=(t.prototype=r.prototype,new t)}function e(n){n.o||(n.D=new Map,n.o=new Map(n.t))}function o(n){n.o||(n.o=new Set,n.t.forEach((function(r){if(immer_esm_t(r)){var e=R(n.A.h,r,n);n.p.set(r,e),n.o.add(e)}else n.o.add(r)})))}function u(r){r.O&&immer_esm_n(3,JSON.stringify(immer_esm_p(r)))}var a=function(n,r){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var t in r)r.hasOwnProperty(t)&&(n[t]=r[t])})(n,r)},f=function(){function n(n,r){return this[Q]={i:2,l:r,A:r?r.A:immer_esm_(),P:!1,I:!1,o:void 0,D:void 0,t:n,k:this,C:!1,O:!1},this}r(n,Map);var o=n.prototype;return Object.defineProperty(o,"size",{get:function(){return immer_esm_p(this[Q]).size}}),o.has=function(n){return immer_esm_p(this[Q]).has(n)},o.set=function(n,r){var t=this[Q];return u(t),immer_esm_p(t).has(n)&&immer_esm_p(t).get(n)===r||(e(t),immer_esm_k(t),t.D.set(n,!0),t.o.set(n,r),t.D.set(n,!0)),this},o.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),e(r),immer_esm_k(r),r.t.has(n)?r.D.set(n,!1):r.D.delete(n),r.o.delete(n),!0},o.clear=function(){var n=this[Q];u(n),immer_esm_p(n).size&&(e(n),immer_esm_k(n),n.D=new Map,immer_esm_i(n.t,(function(r){n.D.set(r,!1)})),n.o.clear())},o.forEach=function(n,r){var t=this;immer_esm_p(this[Q]).forEach((function(e,i){n.call(r,t.get(i),i,t)}))},o.get=function(n){var r=this[Q];u(r);var i=immer_esm_p(r).get(n);if(r.I||!immer_esm_t(i))return i;if(i!==r.t.get(n))return i;var o=R(r.A.h,i,r);return e(r),r.o.set(n,o),o},o.keys=function(){return immer_esm_p(this[Q]).keys()},o.values=function(){var n,r=this,t=this.keys();return(n={})[immer_esm_V]=function(){return r.values()},n.next=function(){var n=t.next();return n.done?n:{done:!1,value:r.get(n.value)}},n},o.entries=function(){var n,r=this,t=this.keys();return(n={})[immer_esm_V]=function(){return r.entries()},n.next=function(){var n=t.next();if(n.done)return n;var e=r.get(n.value);return{done:!1,value:[n.value,e]}},n},o[immer_esm_V]=function(){return this.entries()},n}(),c=function(){function n(n,r){return this[Q]={i:3,l:r,A:r?r.A:immer_esm_(),P:!1,I:!1,o:void 0,t:n,k:this,p:new Map,O:!1,C:!1},this}r(n,Set);var t=n.prototype;return Object.defineProperty(t,"size",{get:function(){return immer_esm_p(this[Q]).size}}),t.has=function(n){var r=this[Q];return u(r),r.o?!!r.o.has(n)||!(!r.p.has(n)||!r.o.has(r.p.get(n))):r.t.has(n)},t.add=function(n){var r=this[Q];return u(r),this.has(n)||(o(r),immer_esm_k(r),r.o.add(n)),this},t.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),o(r),immer_esm_k(r),r.o.delete(n)||!!r.p.has(n)&&r.o.delete(r.p.get(n))},t.clear=function(){var n=this[Q];u(n),immer_esm_p(n).size&&(o(n),immer_esm_k(n),n.o.clear())},t.values=function(){var n=this[Q];return u(n),o(n),n.o.values()},t.entries=function(){var n=this[Q];return u(n),o(n),n.o.entries()},t.keys=function(){return this.values()},t[immer_esm_V]=function(){return this.values()},t.forEach=function(n,r){for(var t=this.values(),e=t.next();!e.done;)n.call(r,e.value,e.value,this),e=t.next()},n}();immer_esm_m("MapSet",{N:function(n,r){return new f(n,r)},T:function(n,r){return new c(n,r)}})}function J(){immer_esm_N(),immer_esm_C(),immer_esm_T()}function K(n){return n}function immer_esm_$(n){return n}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,immer_esm_q="undefined"!=typeof Set,immer_esm_B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,immer_esm_H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),immer_esm_L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",immer_esm_V="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Y={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(n){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+n},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(n){return"Cannot apply patch, path doesn't resolve: "+n},16:'Sets cannot have "replace" patches.',17:function(n){return"Unsupported patch operation: "+n},18:function(n){return"The plugin for '"+n+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+n+"()` when initializing your application."},20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(n){return"produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+n+"'"},22:function(n){return"'current' expects a draft, got: "+n},23:function(n){return"'original' expects a draft, got: "+n},24:"Patching reserved attributes like __proto__, prototype and constructor is not allowed"},Z=""+Object.prototype.constructor,nn="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,rn=Object.getOwnPropertyDescriptors||function(n){var r={};return nn(n).forEach((function(t){r[t]=Object.getOwnPropertyDescriptor(n,t)})),r},tn={},en={get:function(n,r){if(r===Q)return n;var e=immer_esm_p(n);if(!immer_esm_u(e,r))return function(n,r,t){var e,i=immer_esm_I(r,t);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,r);var i=e[r];return n.I||!immer_esm_t(i)?i:i===immer_esm_z(n.t,r)?(E(n),n.o[r]=R(n.A.h,i,n)):i},has:function(n,r){return r in immer_esm_p(n)},ownKeys:function(n){return Reflect.ownKeys(immer_esm_p(n))},set:function(n,r,t){var e=immer_esm_I(immer_esm_p(n),r);if(null==e?void 0:e.set)return e.set.call(n.k,t),!0;if(!n.P){var i=immer_esm_z(immer_esm_p(n),r),o=null==i?void 0:i[Q];if(o&&o.t===t)return n.o[r]=t,n.D[r]=!1,!0;if(immer_esm_c(t,i)&&(void 0!==t||immer_esm_u(n.t,r)))return!0;E(n),immer_esm_k(n)}return n.o[r]===t&&"number"!=typeof t&&(void 0!==t||r in n.o)||(n.o[r]=t,n.D[r]=!0,!0)},deleteProperty:function(n,r){return void 0!==immer_esm_z(n.t,r)||r in n.t?(n.D[r]=!1,E(n),immer_esm_k(n)):delete n.D[r],n.o&&delete n.o[r],!0},getOwnPropertyDescriptor:function(n,r){var t=immer_esm_p(n),e=Reflect.getOwnPropertyDescriptor(t,r);return e?{writable:!0,configurable:1!==n.i||"length"!==r,enumerable:e.enumerable,value:t[r]}:e},defineProperty:function(){immer_esm_n(11)},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){immer_esm_n(12)}},on={};immer_esm_i(en,(function(n,r){on[n]=function(){return arguments[0]=arguments[0][0],r.apply(this,arguments)}})),on.deleteProperty=function(r,t){return false&&0,on.set.call(this,r,t,void 0)},on.set=function(r,t,e){return false&&0,en.set.call(this,r[0],t,e,r[0])};var un=function(){function e(r){var e=this;this.g=immer_esm_B,this.F=!0,this.produce=function(r,i,o){if("function"==typeof r&&"function"!=typeof i){var u=i;i=r;var a=e;return function(n){var r=this;void 0===n&&(n=u);for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a.produce(n,(function(n){var t;return(t=i).call.apply(t,[r,n].concat(e))}))}}var f;if("function"!=typeof i&&immer_esm_n(6),void 0!==o&&"function"!=typeof o&&immer_esm_n(7),immer_esm_t(r)){var c=immer_esm_w(e),s=R(e,r,void 0),v=!0;try{f=i(s),v=!1}finally{v?immer_esm_O(c):immer_esm_g(c)}return"undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return immer_esm_j(c,o),immer_esm_P(n,c)}),(function(n){throw immer_esm_O(c),n})):(immer_esm_j(c,o),immer_esm_P(f,c))}if(!r||"object"!=typeof r){if(void 0===(f=i(r))&&(f=r),f===immer_esm_H&&(f=void 0),e.F&&immer_esm_d(f,!0),o){var p=[],l=[];immer_esm_b("Patches").M(r,f,p,l),o(p,l)}return f}immer_esm_n(21,r)},this.produceWithPatches=function(n,r){if("function"==typeof n)return function(r){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return e.produceWithPatches(r,(function(r){return n.apply(void 0,[r].concat(i))}))};var t,i,o=e.produce(n,r,(function(n,r){t=n,i=r}));return"undefined"!=typeof Promise&&o instanceof Promise?o.then((function(n){return[n,t,i]})):[o,t,i]},"boolean"==typeof(null==r?void 0:r.useProxies)&&this.setUseProxies(r.useProxies),"boolean"==typeof(null==r?void 0:r.autoFreeze)&&this.setAutoFreeze(r.autoFreeze)}var i=e.prototype;return i.createDraft=function(e){immer_esm_t(e)||immer_esm_n(8),immer_esm_r(e)&&(e=D(e));var i=immer_esm_w(this),o=R(this,e,void 0);return o[Q].C=!0,immer_esm_g(i),o},i.finishDraft=function(r,t){var e=r&&r[Q]; false&&(0);var i=e.A;return immer_esm_j(i,t),immer_esm_P(void 0,i)},i.setAutoFreeze=function(n){this.F=n},i.setUseProxies=function(r){r&&!immer_esm_B&&immer_esm_n(20),this.g=r},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}e>-1&&(t=t.slice(e+1));var o=immer_esm_b("Patches").$;return immer_esm_r(n)?o(n,t):this.produce(n,(function(n){return o(n,t)}))},e}(),an=new un,fn=an.produce,cn=an.produceWithPatches.bind(an),sn=an.setAutoFreeze.bind(an),vn=an.setUseProxies.bind(an),pn=an.applyPatches.bind(an),ln=an.createDraft.bind(an),dn=an.finishDraft.bind(an);/* harmony default export */ var immer_esm = (fn);
//# sourceMappingURL=immer.esm.js.map

// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(5940);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/array/range.js
var range = __webpack_require__(7386);
var range_default = /*#__PURE__*/__webpack_require__.n(range);
;// CONCATENATED MODULE: ./src/constants/style.ts
// common day name
const DEFAULT_DAY_NAME_MARGIN_LEFT = '0'; // month day name

const MONTH_DAY_NAME_HEIGHT = 31; // month event

const MONTH_EVENT_BORDER_RADIUS = 2;
const MONTH_EVENT_HEIGHT = 24;
const MONTH_EVENT_MARGIN_TOP = 2;
const MONTH_EVENT_MARGIN_LEFT = 8;
const MONTH_EVENT_MARGIN_RIGHT = 8; // month cell

const MONTH_CELL_PADDING_TOP = 3;
const MONTH_CELL_BAR_HEIGHT = 27; // month more view

const MONTH_MORE_VIEW_PADDING = 5;
const MONTH_MORE_VIEW_MIN_WIDTH = 280;
const MONTH_MORE_VIEW_HEADER_HEIGHT = 44;
const MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM = 12;
const MONTH_MORE_VIEW_HEADER_PADDING_TOP = 12;
const MONTH_MORE_VIEW_HEADER_PADDING = '12px 17px 0'; // week day name

const WEEK_DAY_NAME_HEIGHT = 42;
const WEEK_DAY_NAME_BORDER = 1; // week panel resizer

const WEEK_PANEL_RESIZER_HEIGHT = 3; // week event

const WEEK_EVENT_BORDER_RADIUS = 2;
const WEEK_EVENT_HEIGHT = 24;
const WEEK_EVENT_MARGIN_TOP = 2;
const WEEK_EVENT_MARGIN_LEFT = 8;
const WEEK_EVENT_MARGIN_RIGHT = 8;
const DEFAULT_PANEL_HEIGHT = 72; // default color values for events

const DEFAULT_EVENT_COLORS = {
  color: '#000',
  backgroundColor: '#a1b56c',
  dragBackgroundColor: '#a1b56c',
  borderColor: '#000'
};
const TIME_EVENT_CONTAINER_MARGIN_LEFT = 2;
const COLLAPSED_DUPLICATE_EVENT_WIDTH_PX = 9;
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/type/isString.js
var isString = __webpack_require__(758);
var isString_default = /*#__PURE__*/__webpack_require__.n(isString);
;// CONCATENATED MODULE: ./src/helpers/css.ts


const CSS_PREFIX = 'toastui-calendar-';
function cls() {
  const result = [];

  for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    args[_key2] = arguments[_key2];
  }

  args.forEach(arg => {
    if (!arg) {
      return;
    }

    if (isString_default()(arg)) {
      result.push(arg);
    } else {
      Object.keys(arg).forEach(className => {
        if (arg[className]) {
          result.push(className);
        }
      });
    }
  });
  return result.map(str => "".concat(CSS_PREFIX).concat(str)).join(' ');
}
function toPercent(value) {
  return "".concat(value, "%");
}
function toPx(value) {
  return "".concat(value, "px");
}
/**
 * ex)
 * extractPercentPx('calc(100% - 22px)') // { percent: 100, px: -22 }
 * extractPercentPx('100%') // { percent: 100, px: 0 }
 * extractPercentPx('-22px') // { percent: 0, px: -22 }
 */

function extractPercentPx(value) {
  const percentRegexp = /(\d+)%/;
  const percentResult = value.match(percentRegexp);
  const pxRegexp = /(-?)\s?(\d+)px/;
  const pxResult = value.match(pxRegexp);
  return {
    percent: percentResult ? parseInt(percentResult[1], 10) : 0,
    px: pxResult ? parseInt("".concat(pxResult[1]).concat(pxResult[2]), 10) : 0
  };
}
function getEventColors(uiModel, calendarColor) {
  const eventColors = uiModel.model.getColors();
  return Object.keys(DEFAULT_EVENT_COLORS).reduce((colors, _key) => {
    var _ref, _eventColors$key;

    const key = _key;
    colors[key] = (_ref = (_eventColors$key = eventColors[key]) !== null && _eventColors$key !== void 0 ? _eventColors$key : calendarColor[key]) !== null && _ref !== void 0 ? _ref : DEFAULT_EVENT_COLORS[key];
    return colors;
  }, {});
}
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(1372);
;// CONCATENATED MODULE: ../../libs/date/src/localDate.js



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

class LocalDate {
  constructor() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

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
    return new LocalDate(this.d);
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
  LocalDate.prototype[methodName] = function () {
    return this.d[methodName](...arguments);
  };
});
setterMethods.forEach(methodName => {
  LocalDate.prototype[methodName] = function () {
    return this.d[methodName](...arguments);
  };
});
;// CONCATENATED MODULE: ../../libs/date/src/utcDate.js


class UTCDate extends LocalDate {
  clone() {
    return new UTCDate(this.d);
  }

  getTimezoneOffset() {
    return 0;
  }

}
const getterProperties = ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds', 'Milliseconds', 'Day'];
const setterProperties = ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds', 'Milliseconds'];
getterProperties.forEach(prop => {
  const methodName = "get".concat(prop);

  UTCDate.prototype[methodName] = function () {
    return this.d["getUTC".concat(prop)](...arguments);
  };
});
setterProperties.forEach(prop => {
  const methodName = "set".concat(prop);

  UTCDate.prototype[methodName] = function () {
    return this.d["setUTC".concat(prop)](...arguments);
  };
});
;// CONCATENATED MODULE: ../../libs/date/src/momentDate.js


let moment;
class MomentDate {
  static setMoment(m) {
    moment = m;
    return MomentDate;
  }

  constructor() {
    if (!moment) {
      throw new Error('MomentDate requires Moment constructor. Use "MomentDate.setMoment(moment);".');
    }

    this.m = moment(...arguments);
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

  setFullYear(y) {
    let m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMonth();
    let d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getDate();
    this.m.year(y).month(m).date(d);
    return this.getTime();
  }

  setMonth(m) {
    let d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.m.date();
    this.m.month(m).date(d);
    return this.getTime();
  }

  setDate(d) {
    this.m.date(d);
    return this.getTime();
  }

  setHours(h) {
    let m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMinutes();
    let s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getSeconds();
    let ms = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.getMilliseconds();
    this.m.hours(h).minutes(m).seconds(s).milliseconds(ms);
    return this.getTime();
  }

  setMinutes(m) {
    let s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getSeconds();
    let ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getMilliseconds();
    this.m.minutes(m).seconds(s).milliseconds(ms);
    return this.getTime();
  }

  setSeconds(s) {
    let ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMilliseconds();
    this.m.seconds(s).milliseconds(ms);
    return this.getTime();
  }

  setMilliseconds(ms) {
    this.m.milliseconds(ms);
    return this.getTime();
  }

}
;// CONCATENATED MODULE: ../../libs/date/src/index.js



/* harmony default export */ var src = ({
  LocalDate: LocalDate,
  UTCDate: UTCDate,
  MomentDate: MomentDate
});

;// CONCATENATED MODULE: ./src/constants/error.ts
const INVALID_DATETIME_FORMAT = 'Invalid DateTime Format';
const INVALID_TIMEZONE_NAME = 'Invalid IANA Timezone Name';
const INVALID_VIEW_TYPE = 'Invalid View Type';
;// CONCATENATED MODULE: ./src/constants/message.ts
const MESSAGE_PREFIX = '@toast-ui/calendar: ';
;// CONCATENATED MODULE: ./src/utils/error.ts



/**
 * Define custom errors for calendar
 * These errors are exposed to the user.
 *
 * We can throw the default `Error` instance for internal errors.
 */

class InvalidTimezoneNameError extends Error {
  constructor(timezoneName) {
    super("".concat(MESSAGE_PREFIX).concat(INVALID_TIMEZONE_NAME, " - ").concat(timezoneName));
    this.name = 'InvalidTimezoneNameError';
  }

}
class InvalidDateTimeFormatError extends Error {
  constructor(dateTimeString) {
    super("".concat(MESSAGE_PREFIX).concat(INVALID_DATETIME_FORMAT, " - ").concat(dateTimeString));
    this.name = 'InvalidDateTimeFormatError';
  }

}
class InvalidViewTypeError extends Error {
  constructor(viewType) {
    super("".concat(MESSAGE_PREFIX).concat(INVALID_VIEW_TYPE, " - ").concat(viewType));
    this.name = 'InvalidViewTypeError';
  }

}
;// CONCATENATED MODULE: ./src/utils/logger.ts


/* eslint-disable no-console */

const logger = {
  error: function (firstArg) {
    for (var _len = arguments.length, restArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      restArgs[_key - 1] = arguments[_key];
    }

    console.error("".concat(MESSAGE_PREFIX).concat(firstArg), ...restArgs);
  },
  warn: function (firstArg) {
    for (var _len2 = arguments.length, restArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      restArgs[_key2 - 1] = arguments[_key2];
    }

    console.warn("".concat(MESSAGE_PREFIX).concat(firstArg), ...restArgs);
  }
};
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/type/isUndefined.js
var isUndefined = __webpack_require__(3929);
var isUndefined_default = /*#__PURE__*/__webpack_require__.n(isUndefined);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/type/isBoolean.js
var isBoolean = __webpack_require__(1326);
var isBoolean_default = /*#__PURE__*/__webpack_require__.n(isBoolean);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/type/isNumber.js
var isNumber = __webpack_require__(321);
var isNumber_default = /*#__PURE__*/__webpack_require__.n(isNumber);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/type/isObject.js
var isObject = __webpack_require__(5758);
var isObject_default = /*#__PURE__*/__webpack_require__.n(isObject);
;// CONCATENATED MODULE: ./src/utils/type.ts

function type_isNil(value) {
  return isUndefined_default()(value) || value === null;
}
function isPresent(value) {
  return !type_isNil(value);
}
function isFunction(value) {
  return typeof value === 'function';
}





;// CONCATENATED MODULE: ./src/time/timezone.ts






let Constructor = LocalDate;
function setDateConstructor(constructor) {
  Constructor = constructor;
}
function date() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new Constructor(...args);
} // Get the timezone offset from the system using the calendar.

function getLocalTimezoneOffset() {
  return -new Date().getTimezoneOffset();
}
/**
 * Calculate timezone offset from UTC.
 *
 * Target date is needed for the case when the timezone is applicable to DST.
 */

function calculateTimezoneOffset(timezoneName) {
  let targetDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new date_TZDate();

  if (!isIntlDateTimeFormatSupported()) {
    logger.warn('Intl.DateTimeFormat is not fully supported. So It will return the local timezone offset only.\nYou can use a polyfill to fix this issue.');
    return -targetDate.toDate().getTimezoneOffset();
  }

  validateIANATimezoneName(timezoneName);
  const token = tokenizeTZDate(targetDate, timezoneName);
  const utcDate = tokenToUtcDate(token);
  return Math.round((utcDate.getTime() - targetDate.getTime()) / 60 / 1000);
} // Reference: https://stackoverflow.com/a/30280636/16702531
// If there's no timezoneName, it handles Native OS timezone.

function isUsingDST(targetDate, timezoneName) {
  if (timezoneName) {
    validateIANATimezoneName(timezoneName);
  }

  const jan = new date_TZDate(targetDate.getFullYear(), 0, 1);
  const jul = new date_TZDate(targetDate.getFullYear(), 6, 1);

  if (timezoneName) {
    return Math.max(-calculateTimezoneOffset(timezoneName, jan), -calculateTimezoneOffset(timezoneName, jul)) !== -calculateTimezoneOffset(timezoneName, targetDate);
  }

  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset()) !== targetDate.toDate().getTimezoneOffset();
}
const dtfCache = {};
const timezoneNameValidationCache = {};

function isIntlDateTimeFormatSupported() {
  var _Intl, _Intl$DateTimeFormat, _Intl$DateTimeFormat$;

  /**
   * Intl.DateTimeFormat & IANA Timezone Data should be supported.
   * also, hourCycle options should be supported.
   */
  return isFunction((_Intl = Intl) === null || _Intl === void 0 ? void 0 : (_Intl$DateTimeFormat = _Intl.DateTimeFormat) === null || _Intl$DateTimeFormat === void 0 ? void 0 : (_Intl$DateTimeFormat$ = _Intl$DateTimeFormat.prototype) === null || _Intl$DateTimeFormat$ === void 0 ? void 0 : _Intl$DateTimeFormat$.formatToParts);
}

function validateIANATimezoneName(timezoneName) {
  if (timezoneNameValidationCache[timezoneName]) {
    return true;
  }

  try {
    // Just try to create a dtf with the timezoneName.
    // eslint-disable-next-line new-cap
    Intl.DateTimeFormat('en-US', {
      timeZone: timezoneName
    });
    timezoneNameValidationCache[timezoneName] = true;
    return true;
  } catch {
    // Usually it throws `RangeError` when the timezoneName is invalid.
    throw new InvalidTimezoneNameError(timezoneName);
  }
}

function getDateTimeFormat(timezoneName) {
  if (dtfCache[timezoneName]) {
    return dtfCache[timezoneName];
  }

  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: timezoneName,
    hourCycle: 'h23',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
  dtfCache[timezoneName] = dtf;
  return dtf;
}

const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};

function tokenizeTZDate(tzDate, timezoneName) {
  const dtf = getDateTimeFormat(timezoneName);
  const formatted = dtf.formatToParts(tzDate.toDate());
  return formatted.reduce((result, cur) => {
    const pos = typeToPos[cur.type];

    if (isPresent(pos)) {
      result[pos] = parseInt(cur.value, 10);
    }

    return result;
  }, []);
}

function tokenToUtcDate(token) {
  const [year, monthPlusOne, day, hour, minute, second] = token;
  const month = monthPlusOne - 1;
  return new Date(Date.UTC(year, month, day, hour % 24, minute, second));
}
;// CONCATENATED MODULE: ./src/time/date.ts


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function getTZOffsetMSDifference(offset) {
  return (getLocalTimezoneOffset() - offset) * MS_PER_MINUTES;
}
/**
 * Custom Date Class to handle timezone offset.
 *
 * For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/tzdate.md|TZDate} in guide.
 *
 * @class TZDate
 * @param {number|TZDate|Date|string} date - date value to be converted. If date is number or string, it should be eligible to parse by Date constructor.
 */


class date_TZDate {
  constructor() {
    _defineProperty(this, "tzOffset", null);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args[0] instanceof date_TZDate) {
      this.d = date(args[0].getTime());
    } else {
      this.d = date(...args);
    }
  }
  /**
   * Get the string representation of the date.
   * @returns {string} string representation of the date.
   */


  toString() {
    return this.d.toString();
  }
  /**
   * Add years to the instance.
   * @param {number} y - number of years to be added.
   * @returns {TZDate} - returns the instance itself.
   */


  addFullYear(y) {
    this.setFullYear(this.getFullYear() + y);
    return this;
  }
  /**
   * Add months to the instance.
   * @param {number} m - number of months to be added.
   * @returns {TZDate} - returns the instance itself.
   */


  addMonth(m) {
    this.setMonth(this.getMonth() + m);
    return this;
  }
  /**
   * Add dates to the instance.
   * @param {number} d - number of days to be added.
   * @returns {TZDate} - returns the instance itself.
   */


  addDate(d) {
    this.setDate(this.getDate() + d);
    return this;
  }
  /**
   * Add hours to the instance.
   * @param {number} h - number of hours to be added.
   * @returns {TZDate} - returns the instance itself.
   */


  addHours(h) {
    this.setHours(this.getHours() + h);
    return this;
  }
  /**
   * Add minutes to the instance.
   * @param {number} M - number of minutes to be added.
   * @returns {TZDate} - returns the instance itself.
   */


  addMinutes(M) {
    this.setMinutes(this.getMinutes() + M);
    return this;
  }
  /**
   * Add seconds to the instance.
   * @param {number} s - number of seconds to be added.
   * @returns {TZDate} - returns the instance itself.
   */


  addSeconds(s) {
    this.setSeconds(this.getSeconds() + s);
    return this;
  }
  /**
   * Add milliseconds to the instance.
   * @param {number} ms - number of milliseconds to be added.
   * @returns {TZDate} - returns the instance itself.
   */


  addMilliseconds(ms) {
    this.setMilliseconds(this.getMilliseconds() + ms);
    return this;
  }
  /* eslint-disable max-params*/

  /**
   * Set the date and time all at once.
   * @param {number} y - year
   * @param {number} m - month
   * @param {number} d - date
   * @param {number} h - hours
   * @param {number} M - minutes
   * @param {number} s - seconds
   * @param {number} ms - milliseconds
   * @returns {TZDate} - returns the instance itself.
   */


  setWithRaw(y, m, d, h, M, s, ms) {
    this.setFullYear(y, m, d);
    this.setHours(h, M, s, ms);
    return this;
  }
  /**
   * Convert the instance to the native `Date` object.
   * @returns {Date} - The native `Date` object.
   */


  toDate() {
    return this.d.toDate();
  }
  /**
   * Get the value of the date. (milliseconds since 1970-01-01 00:00:00 (UTC+0))
   * @returns {number} - value of the date.
   */


  valueOf() {
    return this.getTime();
  }
  /**
   * Get the timezone offset from UTC in minutes.
   * @returns {number} - timezone offset in minutes.
   */


  getTimezoneOffset() {
    var _this$tzOffset;

    return (_this$tzOffset = this.tzOffset) !== null && _this$tzOffset !== void 0 ? _this$tzOffset : this.d.getTimezoneOffset();
  } // Native properties

  /**
   * Get milliseconds which is converted by timezone
   * @returns {number} milliseconds
   */


  getTime() {
    return this.d.getTime();
  }
  /**
   * Get the year of the instance.
   * @returns {number} - full year
   */


  getFullYear() {
    return this.d.getFullYear();
  }
  /**
   * Get the month of the instance. (zero-based)
   * @returns {number} - month
   */


  getMonth() {
    return this.d.getMonth();
  }
  /**
   * Get the date of the instance.
   * @returns {number} - date
   */


  getDate() {
    return this.d.getDate();
  }
  /**
   * Get the hours of the instance.
   * @returns {number} - hours
   */


  getHours() {
    return this.d.getHours();
  }
  /**
   * Get the minutes of the instance.
   * @returns {number} - minutes
   */


  getMinutes() {
    return this.d.getMinutes();
  }
  /**
   * Get the seconds of the instance.
   * @returns {number} - seconds
   */


  getSeconds() {
    return this.d.getSeconds();
  }
  /**
   * Get the milliseconds of the instance.
   * @returns {number} - milliseconds
   */


  getMilliseconds() {
    return this.d.getMilliseconds();
  }
  /**
   * Get the day of the week of the instance.
   * @returns {number} - day of the week
   */


  getDay() {
    return this.d.getDay();
  }
  /**
   * Sets the instance to the time represented by a number of milliseconds since 1970-01-01 00:00:00 (UTC+0).
   * @param {number} t - number of milliseconds
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */


  setTime(t) {
    return this.d.setTime(t);
  }
  /**
   * Sets the year-month-date of the instance. Equivalent to calling `setFullYear` of `Date` object.
   * @param {number} y - year
   * @param {number} m - month (zero-based)
   * @param {number} d - date
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */


  setFullYear(y) {
    let m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMonth();
    let d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getDate();
    return this.d.setFullYear(y, m, d);
  }
  /**
   * Sets the month of the instance. Equivalent to calling `setMonth` of `Date` object.
   * @param {number} m - month (zero-based)
   * @param {number} d - date
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */


  setMonth(m) {
    let d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getDate();
    return this.d.setMonth(m, d);
  }
  /**
   * Sets the date of the instance. Equivalent to calling `setDate` of `Date` object.
   * @param {number} d - date
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */


  setDate(d) {
    return this.d.setDate(d);
  }
  /**
   * Sets the hours of the instance. Equivalent to calling `setHours` of `Date` object.
   * @param {number} h - hours
   * @param {number} M - minutes
   * @param {number} s - seconds
   * @param {number} ms - milliseconds
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */


  setHours(h) {
    let M = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMinutes();
    let s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getSeconds();
    let ms = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.getMilliseconds();
    return this.d.setHours(h, M, s, ms);
  }
  /**
   * Sets the minutes of the instance. Equivalent to calling `setMinutes` of `Date` object.
   * @param {number} M - minutes
   * @param {number} s - seconds
   * @param {number} ms - milliseconds
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */


  setMinutes(M) {
    let s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getSeconds();
    let ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getMilliseconds();
    return this.d.setMinutes(M, s, ms);
  }
  /**
   * Sets the seconds of the instance. Equivalent to calling `setSeconds` of `Date` object.
   * @param {number} s - seconds
   * @param {number} ms - milliseconds
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */


  setSeconds(s) {
    let ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMilliseconds();
    return this.d.setSeconds(s, ms);
  }
  /**
   * Sets the milliseconds of the instance. Equivalent to calling `setMilliseconds` of `Date` object.
   * @param {number} ms - milliseconds
   * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
   */


  setMilliseconds(ms) {
    return this.d.setMilliseconds(ms);
  }
  /**
   * Set the timezone offset of the instance.
   * @param {string|number} tzValue - The name of timezone(IANA name) or timezone offset(in minutes).
   * @returns {TZDate} - New instance with the timezone offset.
   */


  tz(tzValue) {
    if (tzValue === 'Local') {
      return new date_TZDate(this.getTime());
    }

    const tzOffset = isString_default()(tzValue) ? calculateTimezoneOffset(tzValue, this) : tzValue;
    const newTZDate = new date_TZDate(this.getTime() - getTZOffsetMSDifference(tzOffset));
    newTZDate.tzOffset = tzOffset;
    return newTZDate;
  }
  /**
   * Get the new instance following the system's timezone.
   * If the system timezone is different from the timezone of the instance,
   * the instance is converted to the system timezone.
   *
   * Instance's `tzOffset` property will be ignored if there is a `tzValue` parameter.
   *
   * @param {string|number} tzValue - The name of timezone(IANA name) or timezone offset(in minutes).
   * @returns {TZDate} - New instance with the system timezone.
   */


  local(tzValue) {
    if (isPresent(tzValue)) {
      const tzOffset = isString_default()(tzValue) ? calculateTimezoneOffset(tzValue, this) : tzValue;
      return new date_TZDate(this.getTime() + getTZOffsetMSDifference(tzOffset));
    }

    return new date_TZDate(this.getTime() + (isPresent(this.tzOffset) ? getTZOffsetMSDifference(this.tzOffset) : 0));
  }

}
;// CONCATENATED MODULE: ./src/utils/object.ts


function pick(obj) {
  for (var _len = arguments.length, propNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    propNames[_key - 1] = arguments[_key];
  }

  return propNames.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}
/**
 * Clone an instance of a ES6 class.
 *
 * The cloned instance will have the (most of) same properties as the original.
 *
 * Reference: https://stackoverflow.com/a/44782052
 */

function object_clone(source) {
  return Object.assign(Object.create(Object.getPrototypeOf(source)), source);
}
/**
 * Merge two objects together. And It has some pitfalls.
 *
 * For performance reason this function only mutates the target object.
 *
 * Also, it only merges values of nested objects. Array or TZDate instance will be totally replaced.
 *
 * Other non-basic objects are not supported.
 *
 * Since it mutates the target object, avoid using it outside immer `produce` function.
 */

function mergeObject(target) {
  let source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!isObject_default()(source)) {
    return target;
  }

  Object.keys(source).forEach(k => {
    const targetKey = k;
    const sourceKey = k;

    if (!Array.isArray(source[sourceKey]) && isObject_default()(target[targetKey]) && isObject_default()(source[sourceKey]) && !(source[sourceKey] instanceof date_TZDate)) {
      target[targetKey] = mergeObject(target[targetKey], source[sourceKey]);
    } else {
      target[targetKey] = source[sourceKey];
    }
  });
  return target;
}
;// CONCATENATED MODULE: ./src/model/eventUIModel.ts


function eventUIModel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const eventUIPropsKey = ['top', 'left', 'width', 'height', 'exceedLeft', 'exceedRight', 'croppedStart', 'croppedEnd', 'goingDurationHeight', 'modelDurationHeight', 'comingDurationHeight', 'duplicateEvents', 'duplicateEventIndex', 'duplicateStarts', 'duplicateEnds', 'duplicateLeft', 'duplicateWidth', 'collapse', 'isMain'];
/**
 * Set of UI-related properties for calendar event.
 * @class
 * @param {EventModel} event EventModel instance.
 */

class EventUIModel {
  // If it is one of duplicate events, represents the left value of a group of duplicate events.
  // If it is one of duplicate events, represents the width value of a group of duplicate events.

  /**
   * whether the actual start-date is before the render-start-date
   * @type {boolean}
   */

  /**
   * whether the actual end-date is after the render-end-date
   * @type {boolean}
   */

  /**
   * whether the actual start-date is before the render-start-date for column
   * @type {boolean}
   */

  /**
   * whether the actual end-date is after the render-end-date for column
   * @type {boolean}
   */

  /**
   * @type {number} percent
   */

  /**
   * @type {number} percent
   */

  /**
   * @type {number} percent
   */

  /**
   * the sorted list of duplicate events.
   * @type {EventUIModel[]}
   */

  /**
   * the index of this event among the duplicate events.
   * @type {number}
   */

  /**
   * represent the left value of a duplicate event.
   * ex) calc(50% - 24px), calc(50%), ...
   *
   * @type {string}
   */

  /**
   * represent the width value of a duplicate event.
   * ex) calc(50% - 24px), 9px, ...
   *
   * @type {string}
   */

  /**
   * whether the event is collapsed or not among the duplicate events.
   * @type {boolean}
   */

  /**
   * whether the event is main or not.
   * The main event is expanded on the initial rendering.
   * @type {boolean}
   */
  constructor(event) {
    eventUIModel_defineProperty(this, "top", 0);

    eventUIModel_defineProperty(this, "left", 0);

    eventUIModel_defineProperty(this, "width", 0);

    eventUIModel_defineProperty(this, "height", 0);

    eventUIModel_defineProperty(this, "exceedLeft", false);

    eventUIModel_defineProperty(this, "exceedRight", false);

    eventUIModel_defineProperty(this, "croppedStart", false);

    eventUIModel_defineProperty(this, "croppedEnd", false);

    eventUIModel_defineProperty(this, "goingDurationHeight", 0);

    eventUIModel_defineProperty(this, "modelDurationHeight", 100);

    eventUIModel_defineProperty(this, "comingDurationHeight", 0);

    eventUIModel_defineProperty(this, "duplicateEvents", []);

    eventUIModel_defineProperty(this, "duplicateEventIndex", -1);

    eventUIModel_defineProperty(this, "duplicateLeft", '');

    eventUIModel_defineProperty(this, "duplicateWidth", '');

    eventUIModel_defineProperty(this, "collapse", false);

    eventUIModel_defineProperty(this, "isMain", false);

    this.model = event;
  }

  getUIProps() {
    return pick(this, ...eventUIPropsKey);
  }

  setUIProps(props) {
    Object.assign(this, props);
  }
  /**
   * return renderStarts property to render properly when specific event that exceed rendering date range.
   *
   * if renderStarts is not set. return model's start property.
   */


  getStarts() {
    if (this.renderStarts) {
      return this.renderStarts;
    }

    return this.model.getStarts();
  }
  /**
   * return renderStarts property to render properly when specific event that exceed rendering date range.
   *
   * if renderEnds is not set. return model's end property.
   */


  getEnds() {
    if (this.renderEnds) {
      return this.renderEnds;
    }

    return this.model.getEnds();
  }
  /**
   * @returns {number} unique number for model.
   */


  cid() {
    return this.model.cid();
  }
  /**
   * Shadowing valueOf method for event sorting.
   */


  valueOf() {
    return this.model;
  }
  /**
   * Link duration method
   * @returns {number} EventModel#duration result.
   */


  duration() {
    return this.model.duration();
  }

  collidesWith(uiModel) {
    let usingTravelTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const infos = [];
    [this, uiModel].forEach(event => {
      const isDuplicateEvent = event instanceof EventUIModel && event.duplicateEvents.length > 0;

      if (isDuplicateEvent) {
        infos.push({
          start: event.duplicateStarts,
          end: event.duplicateEnds,
          goingDuration: 0,
          comingDuration: 0
        });
      } else {
        infos.push({
          start: event.getStarts(),
          end: event.getEnds(),
          goingDuration: event.valueOf().goingDuration,
          comingDuration: event.valueOf().comingDuration
        });
      }
    });
    const [thisInfo, targetInfo] = infos;
    return collidesWith({
      start: thisInfo.start.getTime(),
      end: thisInfo.end.getTime(),
      targetStart: targetInfo.start.getTime(),
      targetEnd: targetInfo.end.getTime(),
      goingDuration: thisInfo.goingDuration,
      comingDuration: thisInfo.comingDuration,
      targetGoingDuration: targetInfo.goingDuration,
      targetComingDuration: targetInfo.comingDuration,
      usingTravelTime // Daygrid does not use travelTime, TimeGrid uses travelTime.

    });
  }

  clone() {
    const eventUIModelProps = this.getUIProps();
    const clonedEventUIModel = new EventUIModel(this.model);
    clonedEventUIModel.setUIProps(eventUIModelProps);

    if (this.renderStarts) {
      clonedEventUIModel.renderStarts = new date_TZDate(this.renderStarts);
    }

    if (this.renderEnds) {
      clonedEventUIModel.renderEnds = new date_TZDate(this.renderEnds);
    }

    return clonedEventUIModel;
  }

}
;// CONCATENATED MODULE: ./src/utils/array.ts



function compareBooleansASC(a, b) {
  if (a !== b) {
    return a ? -1 : 1;
  }

  return 0;
}

function compareNumbersASC(a, b) {
  return Number(a) - Number(b);
}

function compareStringsASC(_a, _b) {
  const a = String(_a);
  const b = String(_b);

  if (a === b) {
    return 0;
  }

  return a > b ? 1 : -1;
} // eslint-disable-next-line complexity


function compareEventsASC(a, b) {
  const modelA = a instanceof EventUIModel ? a.model : a;
  const modelB = b instanceof EventUIModel ? b.model : b;
  const alldayCompare = compareBooleansASC(modelA.isAllday || modelA.hasMultiDates, modelB.isAllday || modelB.hasMultiDates);

  if (alldayCompare) {
    return alldayCompare;
  }

  const startsCompare = compare(a.getStarts(), b.getStarts());

  if (startsCompare) {
    return startsCompare;
  }

  const durationA = a.duration();
  const durationB = b.duration();

  if (durationA < durationB) {
    return 1;
  }

  if (durationA > durationB) {
    return -1;
  }

  return modelA.cid() - modelB.cid();
}

function bsearch(arr, search, fn, compareFn) {
  let minIndex = 0;
  let maxIndex = arr.length - 1;
  let currentIndex;
  let value;
  let comp;
  compareFn = compareFn || compareStringsASC;

  while (minIndex <= maxIndex) {
    currentIndex = (minIndex + maxIndex) / 2 | 0; // Math.floor

    value = fn ? fn(arr[currentIndex]) : arr[currentIndex];
    comp = compareFn(value, search);

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
/* harmony default export */ var array = ({
  bsearch,
  compare: {
    event: {
      asc: compareEventsASC
    },
    num: {
      asc: compareNumbersASC
    }
  }
});
function first(array) {
  return array[0];
}
function last(array) {
  return array[array.length - 1];
}
function findLastIndex(array, predicate) {
  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (predicate(array[i])) {
      return i;
    }
  }

  return -1;
}
function fill(length, value) {
  if (length > 0) {
    return Array.from({
      length
    }, () => {
      if (Array.isArray(value)) {
        return value.slice();
      }

      return value;
    });
  }

  return [];
}
;// CONCATENATED MODULE: ./src/time/datetime.ts







let Day;

(function (Day) {
  Day[Day["SUN"] = 0] = "SUN";
  Day[Day["MON"] = 1] = "MON";
  Day[Day["TUE"] = 2] = "TUE";
  Day[Day["WED"] = 3] = "WED";
  Day[Day["THU"] = 4] = "THU";
  Day[Day["FRI"] = 5] = "FRI";
  Day[Day["SAT"] = 6] = "SAT";
})(Day || (Day = {}));

const WEEK_DAYS = 7;
const dateFormatRx = /^(\d{4}[-|/]*\d{2}[-|/]*\d{2})\s?(\d{2}:\d{2}:\d{2})?$/;
const memo = {
  millisecondsTo: {},
  millisecondsFrom: {}
};
const convByTimeUnit = [24, 60, 60, 1000];
/**
 * pad left zero characters
 */

function leadingZero(number, length) {
  let zero = '';
  let i = 0;

  if (String(number).length > length) {
    return String(number);
  }

  for (; i < length - 1; i += 1) {
    zero += '0';
  }

  return (zero + number).slice(length * -1);
}

function getHourForMeridiem(date) {
  let hour = date.getHours();

  if (hour === 0) {
    hour = 12;
  }

  if (hour > 12) {
    hour = hour % 12;
  }

  return hour;
}

const tokenFunc = {
  YYYYMMDD(date) {
    return [date.getFullYear(), leadingZero(date.getMonth() + 1, 2), leadingZero(date.getDate(), 2)].join('');
  },

  YYYY(date) {
    return String(date.getFullYear());
  },

  MM(date) {
    return leadingZero(date.getMonth() + 1, 2);
  },

  DD(date) {
    return leadingZero(date.getDate(), 2);
  },

  'HH:mm': function (date) {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return "".concat(leadingZero(hour, 2), ":").concat(leadingZero(minutes, 2));
  },
  'hh:mm': function (date) {
    const hour = getHourForMeridiem(date);
    const minutes = date.getMinutes();
    return "".concat(leadingZero(hour, 2), ":").concat(leadingZero(minutes, 2));
  },

  hh(date) {
    const hour = getHourForMeridiem(date);
    return String(hour);
  },

  tt(date) {
    const hour = date.getHours();
    return hour < 12 ? 'am' : 'pm';
  }

};
const MS_PER_DAY = 86400000;
const MS_PER_HOUR = 3600000;
const MS_PER_MINUTES = 60000;
/**
 * The number of milliseconds 20 minutes for event min duration
 */

const MS_EVENT_MIN_DURATION = 20 * MS_PER_MINUTES;
const MS_PER_THIRTY_MINUTES = 30 * 60 * 1000;
const SIXTY_SECONDS = 60;
/**
 * Return formatted string as basis of supplied string.
 *
 * Supported Token Lists.
 *
 * - YYYY => 1988
 * - MM => 01 ~ 12
 * - DD => 01 ~ 31
 * - YYYYMMDD => 19880925
 */

function datetime_toFormat(date, strFormat) {
  let result = strFormat;
  Object.entries(tokenFunc).forEach(_ref => {
    let [token, converter] = _ref;
    result = result.replace(token, converter(date));
  });
  return result;
}
/**
 * convert to milliseconds
 */

function convMilliseconds(type, value, iteratee) {
  const index = {
    date: 0,
    hour: 1,
    minute: 2,
    second: 3
  };

  if (!(type in index) || isNaN(value)) {
    return 0;
  }

  return [value].concat(convByTimeUnit.slice(index[type])).reduce(iteratee);
}
/**
 * Convert value to milliseconds
 */


function millisecondsFrom(type, value) {
  const cache = memo.millisecondsFrom;
  const key = type + value;

  if (cache[key]) {
    return cache[key];
  }

  const result = convMilliseconds(type, value, (m, v) => m * v);

  if (!result) {
    return 0;
  }

  cache[key] = result;
  return cache[key];
}
/**
 * Return 00:00:00 supplied date
 */

function toStartOfDay(date) {
  const d = date ? new date_TZDate(date) : new date_TZDate();
  d.setHours(0, 0, 0, 0);
  return d;
}
/**
 * Make date array from supplied parameters
 */

function makeDateRange(startDate, endDate, step) {
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  const date = new date_TZDate(startDate);
  const result = [];
  let cursor = startTime;

  while (cursor <= endTime && endTime >= date.getTime()) {
    result.push(new date_TZDate(date));
    cursor = cursor + step;
    date.addMilliseconds(step);
  }

  return result;
}
/**
 * Clone supplied date
 */

function datetime_clone(date) {
  return new date_TZDate(date);
}
/**
 * Compare two dates.
 *
 * when first date is latest then seconds then return -1.
 *
 * return +1 reverse, and return 0 is same.
 */

function compare(d1, d2) {
  const _d1 = d1.getTime();

  const _d2 = d2.getTime();

  if (_d1 < _d2) {
    return -1;
  }

  if (_d1 > _d2) {
    return 1;
  }

  return 0;
}
function isSameYear(d1, d2) {
  return d1.getFullYear() === d2.getFullYear();
}
function isSameMonth(d1, d2) {
  return isSameYear(d1, d2) && d1.getMonth() === d2.getMonth();
}
function isSameDate(d1, d2) {
  return isSameMonth(d1, d2) && d1.getDate() === d2.getDate();
}
function max(d1, d2) {
  return compare(d1, d2) === 1 ? d1 : d2;
}
function min(d1, d2) {
  return compare(d1, d2) === -1 ? d1 : d2;
}
/**
 * Convert date string to date object.
 * Only listed below formats available.
 *
 * - YYYYMMDD
 * - YYYY/MM/DD
 * - YYYY-MM-DD
 * - YYYY/MM/DD HH:mm:SS
 * - YYYY-MM-DD HH:mm:SS
 */

function parse(str) {
  let fixMonth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  const matches = str.match(dateFormatRx);
  let separator;
  let ymd;
  let hms;

  if (!matches) {
    throw new InvalidDateTimeFormatError(str);
  }

  if (str.length > 8) {
    // YYYY/MM/DD
    // YYYY-MM-DD
    // YYYY/MM/DD HH:mm:SS
    // YYYY-MM-DD HH:mm:SS
    separator = ~str.indexOf('/') ? '/' : '-';
    const result = matches.splice(1);
    ymd = result[0].split(separator);
    hms = result[1] ? result[1].split(':') : [0, 0, 0];
  } else {
    // YYYYMMDD
    const [result] = matches;
    ymd = [result.substr(0, 4), result.substr(4, 2), result.substr(6, 2)];
    hms = [0, 0, 0];
  }

  return new date_TZDate().setWithRaw(Number(ymd[0]), Number(ymd[1]) + fixMonth, Number(ymd[2]), Number(hms[0]), Number(hms[1]), Number(hms[2]), 0);
}
/**
 * Return 23:59:59 supplied date.
 * If you want to use milliseconds, use format 'YYYY-MM-DDTHH:mm:ss.sssZ' based on http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
 */

function toEndOfDay(date) {
  const d = date ? new date_TZDate(date) : new date_TZDate();
  d.setHours(23, 59, 59, 999);
  return d;
}
function isWeekend(day) {
  return day === Day.SUN || day === Day.SAT;
}
function isSunday(day) {
  return day === Day.SUN;
}
function isSaturday(day) {
  return day === Day.SAT;
}
/**
 * Whether date is between supplied dates with date value?
 */

function isBetweenWithDate(d, d1, d2) {
  const format = 'YYYYMMDD';
  const n = parseInt(datetime_toFormat(d, format), 10);
  const n1 = parseInt(datetime_toFormat(d1, format), 10);
  const n2 = parseInt(datetime_toFormat(d2, format), 10);
  return n1 <= n && n <= n2;
}
function toStartOfMonth(date) {
  const startDate = new date_TZDate(date);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);
  return startDate;
}
function toStartOfYear(d) {
  return new TZDate(d.getFullYear(), 0, 1, 0, 0, 0, 0);
}
function toEndOfMonth(date) {
  const endDate = toStartOfMonth(date);
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);
  endDate.setHours(23, 59, 59, 999);
  return endDate;
}
/**
 * Calculate grid left(%), width(%) by narrowWeekend, startDayOfWeek, workweek
 */

function getRowStyleInfo(days, narrowWeekend, startDayOfWeek, workweek) {
  const limitDaysToApplyNarrowWeekend = 5;
  const uniformWidth = 100 / days;
  const wideWidth = days > limitDaysToApplyNarrowWeekend ? 100 / (days - 1) : uniformWidth;
  let accumulatedWidth = 0;
  const dates = range_default()(startDayOfWeek, WEEK_DAYS).concat(range_default()(days)).slice(0, WEEK_DAYS);
  narrowWeekend = workweek ? false : narrowWeekend;
  const rowStyleInfo = dates.map(day => {
    let width = narrowWeekend ? wideWidth : uniformWidth;

    if (days > limitDaysToApplyNarrowWeekend && narrowWeekend && isWeekend(day)) {
      width = wideWidth / 2;
    }

    const model = {
      width,
      left: accumulatedWidth
    };
    accumulatedWidth += width;
    return model;
  });
  const {
    length
  } = rowStyleInfo;
  const cellWidthMap = fill(length, fill(length, 0));
  rowStyleInfo.forEach((_ref2, index) => {
    let {
      width
    } = _ref2;

    for (let i = 0; i <= index; i += 1) {
      for (let j = index; j < length; j += 1) {
        cellWidthMap[i][j] += width;
      }
    }
  });
  cellWidthMap[0][length - 1] = 100;
  return {
    rowStyleInfo,
    cellWidthMap: cellWidthMap.map(widthList => widthList.map(toPercent))
  };
}
function addMilliseconds(d, step) {
  const date = datetime_clone(d);
  date.setMilliseconds(d.getMilliseconds() + step);
  return date;
}
function addMinutes(d, step) {
  const date = datetime_clone(d);
  date.setMinutes(d.getMinutes() + step);
  return date;
}
function addHours(d, step) {
  const date = datetime_clone(d);
  date.setHours(d.getHours() + step);
  return date;
}
function setTimeStrToDate(d, timeStr) {
  const date = datetime_clone(d);
  date.setHours(...timeStr.split(':').map(Number));
  return date;
}
function addDate(d, step) {
  const date = datetime_clone(d);
  date.setDate(d.getDate() + step);
  return date;
}
function subtractDate(d, steps) {
  const date = datetime_clone(d);
  date.setDate(d.getDate() - steps);
  return date;
}
/**
 * Inspired by `date-fns`
 *
 * See more: https://github.com/date-fns/date-fns/blob/master/src/addMonths/index.ts
 */

function addMonths(d) {
  let step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  const date = datetime_clone(d);

  if (step !== 0) {
    const dayOfMonth = date.getDate();
    const endOfDesiredMonth = new date_TZDate(date.getTime());
    endOfDesiredMonth.setMonth(date.getMonth() + step + 1, 0);
    const daysInMonth = endOfDesiredMonth.getDate();

    if (dayOfMonth >= daysInMonth) {
      return endOfDesiredMonth;
    }

    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
  }

  return date;
}
function addYear(d, step) {
  const date = datetime_clone(d);
  date.setFullYear(d.getFullYear() + step);
  return date;
}
function getDateDifference(d1, d2) {
  const _d1 = new date_TZDate(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();

  const _d2 = new date_TZDate(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();

  return Math.round((_d1 - _d2) / MS_PER_DAY);
}
;// CONCATENATED MODULE: ./src/helpers/events.ts


function hasCollision(start, end, targetStart, targetEnd) {
  return targetStart > start && targetStart < end || targetEnd > start && targetEnd < end || targetStart <= start && targetEnd >= end;
}

function collidesWith(_ref) {
  let {
    start,
    end,
    targetStart,
    targetEnd,
    goingDuration,
    comingDuration,
    targetGoingDuration,
    targetComingDuration,
    usingTravelTime
  } = _ref;

  if (Math.abs(end - start) < MS_EVENT_MIN_DURATION) {
    end += MS_EVENT_MIN_DURATION;
  }

  if (Math.abs(end - start) < MS_EVENT_MIN_DURATION) {
    end += MS_EVENT_MIN_DURATION;
  }

  if (usingTravelTime) {
    start -= millisecondsFrom('minute', goingDuration);
    end += millisecondsFrom('minute', comingDuration);
    targetStart -= millisecondsFrom('minute', targetGoingDuration);
    targetEnd += millisecondsFrom('minute', targetComingDuration);
  }

  return hasCollision(start, end, targetStart, targetEnd);
}
function isSameEvent(event, eventId, calendarId) {
  return event.id === eventId && event.calendarId === calendarId;
}
function isVisibleEvent(event) {
  return event.isVisible;
}
;// CONCATENATED MODULE: ./src/utils/stamp.ts


function idGenerator() {
  let id = 0;
  return {
    next() {
      id += 1;
      return id;
    }

  };
}

const getId = function () {
  const generator = idGenerator();
  return () => generator.next();
}();

function stamp(obj) {
  if (!obj.__fe_id) {
    // eslint-disable-next-line camelcase
    obj.__fe_id = getId();
  }

  return obj.__fe_id;
}
function hasStamp(obj) {
  return !isNil(obj.__fe_id);
}
;// CONCATENATED MODULE: ./src/model/eventModel.ts
function eventModel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class EventModel {
  /**
   * whether the event includes multiple dates
   */
  constructor() {
    let event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    eventModel_defineProperty(this, "id", '');

    eventModel_defineProperty(this, "calendarId", '');

    eventModel_defineProperty(this, "title", '');

    eventModel_defineProperty(this, "body", '');

    eventModel_defineProperty(this, "isAllday", false);

    eventModel_defineProperty(this, "start", new date_TZDate());

    eventModel_defineProperty(this, "end", new date_TZDate());

    eventModel_defineProperty(this, "goingDuration", 0);

    eventModel_defineProperty(this, "comingDuration", 0);

    eventModel_defineProperty(this, "location", '');

    eventModel_defineProperty(this, "attendees", []);

    eventModel_defineProperty(this, "category", 'time');

    eventModel_defineProperty(this, "dueDateClass", '');

    eventModel_defineProperty(this, "recurrenceRule", '');

    eventModel_defineProperty(this, "state", 'Busy');

    eventModel_defineProperty(this, "isVisible", true);

    eventModel_defineProperty(this, "isPending", false);

    eventModel_defineProperty(this, "isFocused", false);

    eventModel_defineProperty(this, "isReadOnly", false);

    eventModel_defineProperty(this, "isPrivate", false);

    eventModel_defineProperty(this, "customStyle", {});

    eventModel_defineProperty(this, "raw", null);

    eventModel_defineProperty(this, "hasMultiDates", false);

    // initialize model id
    stamp(this);
    this.init(event);
  }

  init() {
    let {
      id = '',
      calendarId = '',
      title = '',
      body = '',
      isAllday = false,
      start = new date_TZDate(),
      end = new date_TZDate(),
      goingDuration = 0,
      comingDuration = 0,
      location = '',
      attendees = [],
      category = 'time',
      dueDateClass = '',
      recurrenceRule = '',
      state = 'Busy',
      isVisible = true,
      isPending = false,
      isFocused = false,
      isReadOnly = false,
      isPrivate = false,
      color,
      backgroundColor,
      dragBackgroundColor,
      borderColor,
      customStyle = {},
      raw = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.id = id;
    this.calendarId = calendarId;
    this.title = title;
    this.body = body;
    this.isAllday = category === 'allday' ? true : isAllday;
    this.goingDuration = goingDuration;
    this.comingDuration = comingDuration;
    this.location = location;
    this.attendees = attendees;
    this.category = category;
    this.dueDateClass = dueDateClass;
    this.recurrenceRule = recurrenceRule;
    this.state = state;
    this.isVisible = isVisible;
    this.isPending = isPending;
    this.isFocused = isFocused;
    this.isReadOnly = isReadOnly;
    this.isPrivate = isPrivate;
    this.color = color;
    this.backgroundColor = backgroundColor;
    this.dragBackgroundColor = dragBackgroundColor;
    this.borderColor = borderColor;
    this.customStyle = customStyle;
    this.raw = raw;

    if (this.isAllday) {
      this.setAlldayPeriod(start, end);
    } else {
      this.setTimePeriod(start, end);
    }

    if (category === 'milestone' || category === 'task') {
      this.start = new date_TZDate(this.end);
    }
  }

  setAlldayPeriod(start, end) {
    // If it is an all-day, only the date information of the string is used.
    let startedAt;
    let endedAt;

    if (isString_default()(start)) {
      startedAt = parse(start.substring(0, 10));
    } else {
      startedAt = new date_TZDate(start || Date.now());
    }

    if (isString_default()(end)) {
      endedAt = parse(end.substring(0, 10));
    } else {
      endedAt = new date_TZDate(end || this.start);
    }

    this.start = startedAt;
    this.start.setHours(0, 0, 0);
    this.end = endedAt || new date_TZDate(this.start);
    this.end.setHours(23, 59, 59);
  }

  setTimePeriod(start, end) {
    this.start = new date_TZDate(start || Date.now());
    this.end = new date_TZDate(end || this.start);

    if (!end) {
      this.end.setMinutes(this.end.getMinutes() + 30);
    } // if over 24 hours


    this.hasMultiDates = this.end.getTime() - this.start.getTime() > MS_PER_DAY;
  }
  /**
   * @returns {TZDate} render start date.
   */


  getStarts() {
    return this.start;
  }
  /**
   * @returns {TZDate} render end date.
   */


  getEnds() {
    return this.end;
  }
  /**
   * @returns {number} instance unique id.
   */


  cid() {
    return stamp(this);
  }
  /**
   * Check two  are equals (means title, isAllday, start, end are same)
   * @param {EventModel}  event model instance to compare.
   * @returns {boolean} Return false when not same.
   */
  // eslint-disable-next-line complexity


  equals(event) {
    if (this.id !== event.id) {
      return false;
    }

    if (this.title !== event.title) {
      return false;
    }

    if (this.body !== event.body) {
      return false;
    }

    if (this.isAllday !== event.isAllday) {
      return false;
    }

    if (compare(this.getStarts(), event.getStarts()) !== 0) {
      return false;
    }

    if (compare(this.getEnds(), event.getEnds()) !== 0) {
      return false;
    }

    if (this.color !== event.color) {
      return false;
    }

    if (this.backgroundColor !== event.backgroundColor) {
      return false;
    }

    if (this.dragBackgroundColor !== event.dragBackgroundColor) {
      return false;
    }

    if (this.borderColor !== event.borderColor) {
      return false;
    }

    return true;
  }
  /**
   * return duration between start and end.
   * @returns {number} duration milliseconds (UTC)
   */


  duration() {
    const start = Number(this.getStarts());
    const end = Number(this.getEnds());
    let duration;

    if (this.isAllday) {
      duration = Number(toEndOfDay(end)) - Number(toStartOfDay(start));
    } else {
      duration = end - start;
    }

    return duration;
  }

  valueOf() {
    return this;
  }
  /**
   * Returns true if the given EventModel coincides with the same time as the
   * calling EventModel.
   * @param {EventModel | EventUIModel} event The other event to compare with this EventModel.
   * @param {boolean = true} usingTravelTime When calculating collision, whether to calculate with travel time.
   * @returns {boolean} If the other event occurs within the same time as the first object.
   */


  collidesWith(event) {
    let usingTravelTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    event = event instanceof EventUIModel ? event.model : event;
    return collidesWith({
      start: Number(this.getStarts()),
      end: Number(this.getEnds()),
      targetStart: Number(event.getStarts()),
      targetEnd: Number(event.getEnds()),
      goingDuration: this.goingDuration,
      comingDuration: this.comingDuration,
      targetGoingDuration: event.goingDuration,
      targetComingDuration: event.comingDuration,
      usingTravelTime // Daygrid does not use travelTime, TimeGrid uses travelTime.

    });
  }

  toEventObject() {
    return {
      id: this.id,
      calendarId: this.calendarId,
      __cid: this.cid(),
      title: this.title,
      body: this.body,
      isAllday: this.isAllday,
      start: this.start,
      end: this.end,
      goingDuration: this.goingDuration,
      comingDuration: this.comingDuration,
      location: this.location,
      attendees: this.attendees,
      category: this.category,
      dueDateClass: this.dueDateClass,
      recurrenceRule: this.recurrenceRule,
      state: this.state,
      isVisible: this.isVisible,
      isPending: this.isPending,
      isFocused: this.isFocused,
      isReadOnly: this.isReadOnly,
      isPrivate: this.isPrivate,
      color: this.color,
      backgroundColor: this.backgroundColor,
      dragBackgroundColor: this.dragBackgroundColor,
      borderColor: this.borderColor,
      customStyle: this.customStyle,
      raw: this.raw
    };
  }

  getColors() {
    return {
      color: this.color,
      backgroundColor: this.backgroundColor,
      dragBackgroundColor: this.dragBackgroundColor,
      borderColor: this.borderColor
    };
  }

} // export function isBackgroundEvent({ model }: EventUIModel) {
//   return model.category === 'background';
// }

eventModel_defineProperty(EventModel, "schema", {
  required: ['title'],
  dateRange: ['start', 'end']
});

function isTimeEvent(_ref) {
  let {
    model
  } = _ref;
  const {
    category,
    isAllday,
    hasMultiDates
  } = model;
  return category === 'time' && !isAllday && !hasMultiDates;
}
;// CONCATENATED MODULE: ./src/utils/collection.ts


function collection_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * Generic collection base on ES6 Map.
 *
 * It needs function for get model's unique id.
 *
 * if the function is not supplied then it uses default function {@link Collection#getItemID}
 * @param {function} [getItemIDFn] function for get model's id.
 */
class Collection {
  constructor(getItemIDFn) {
    collection_defineProperty(this, "internalMap", new Map());

    if (isFunction(getItemIDFn)) {
      this.getItemID = getItemIDFn;
    }
  }
  /**
   * Combine supplied function filters and condition.
   * @param {...Filter} filterFns - function filters
   * @returns {function} combined filter
   */


  static and() {
    for (var _len = arguments.length, filterFns = new Array(_len), _key = 0; _key < _len; _key++) {
      filterFns[_key] = arguments[_key];
    }

    const {
      length
    } = filterFns;
    return item => {
      for (let i = 0; i < length; i += 1) {
        if (!filterFns[i].call(null, item)) {
          return false;
        }
      }

      return true;
    };
  }
  /**
   * Combine multiple function filters with OR clause.
   * @param {...function} filterFns - function filters
   * @returns {function} combined filter
   */


  static or() {
    for (var _len2 = arguments.length, filterFns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      filterFns[_key2] = arguments[_key2];
    }

    const {
      length
    } = filterFns;

    if (!length) {
      return () => false;
    }

    return item => {
      let result = filterFns[0].call(null, item);

      for (let i = 1; i < length; i += 1) {
        result = result || filterFns[i].call(null, item);
      }

      return result;
    };
  }
  /**
   * get model's unique id.
   * @param {object} item model instance.
   * @returns {string | number} model unique id.
   */


  getItemID(item) {
    var _item$_id;

    return (_item$_id = item === null || item === void 0 ? void 0 : item._id) !== null && _item$_id !== void 0 ? _item$_id : '';
  }

  getFirstItem() {
    const iterator = this.internalMap.values();
    return iterator.next().value;
  }
  /**
   * add models.
   * @param {Object[]} items - models to add this collection.
   */


  add() {
    for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      items[_key3] = arguments[_key3];
    }

    items.forEach(item => {
      const id = this.getItemID(item);
      this.internalMap.set(id, item);
    });
    return this;
  }
  /**
   * remove models.
   * @param {Array.<(Object|string|number)>} items model instances or unique ids to delete.
   */


  remove() {
    const removeResult = [];

    for (var _len4 = arguments.length, items = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      items[_key4] = arguments[_key4];
    }

    items.forEach(item => {
      const id = isString_default()(item) || isNumber_default()(item) ? item : this.getItemID(item);

      if (!this.internalMap.has(id)) {
        return;
      }

      removeResult.push(this.internalMap.get(id));
      this.internalMap['delete'](id);
    });
    return removeResult.length === 1 ? removeResult[0] : removeResult;
  }
  /**
   * check collection has specific model.
   * @param {(object|string|number)} id model instance or id to check
   * @returns {boolean} is has model?
   */


  has(item) {
    const id = isString_default()(item) || isNumber_default()(item) ? item : this.getItemID(item);
    return this.internalMap.has(id);
  }

  get(item) {
    var _this$internalMap$get;

    const id = isString_default()(item) || isNumber_default()(item) ? item : this.getItemID(item);
    return (_this$internalMap$get = this.internalMap.get(id)) !== null && _this$internalMap$get !== void 0 ? _this$internalMap$get : null;
  }
  /**
   * invoke callback when model exist in collection.
   * @param {(string|number)} id model unique id.
   * @param {function} callback the callback.
   */


  doWhenHas(id, callback) {
    const item = this.internalMap.get(id);

    if (type_isNil(item)) {
      return;
    }

    callback(item);
  }
  /**
   * Search model. and return new collection.
   * @param {function} filterFn filter function.
   * @returns {Collection} new collection with filtered models.
   * @example
   * collection.filter(function(item) {
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
   * collection.filter(Collection.and(filter1, filter2));
   *
   * collection.filter(Collection.or(filter1, filter2));
   */


  filter(filterFn) {
    const result = new Collection();

    if (this.hasOwnProperty('getItemID')) {
      result.getItemID = this.getItemID;
    }

    this.internalMap.forEach(item => {
      if (filterFn(item) === true) {
        result.add(item);
      }
    });
    return result;
  }
  /**
   * Group element by specific key values.
   *
   * if key parameter is function then invoke it and use returned value.
   * @param {(string|number|function)} groupByFn key property or getter function.
   * @returns {object.<string|number, Collection>} grouped object
   * @example
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
   */


  groupBy(groupByFn) {
    const result = {};
    this.internalMap.forEach(item => {
      var _key5, _result$_key;

      let key = isFunction(groupByFn) ? groupByFn(item) : item[groupByFn];

      if (isFunction(key)) {
        key = key.call(item);
      }

      (_result$_key = result[_key5 = key]) !== null && _result$_key !== void 0 ? _result$_key : result[_key5] = new Collection(this.getItemID);
      result[key].add(item);
    });
    return result;
  }
  /**
   * Return the first item in collection that satisfies the provided function.
   * @param {function} [findFn] - function filter
   * @returns {object|null} item.
   */


  find(findFn) {
    let result = null;
    const items = this.internalMap.values();
    let next = items.next();

    while (next.done === false) {
      if (findFn(next.value)) {
        result = next.value;
        break;
      }

      next = items.next();
    }

    return result;
  }
  /**
   * sort a basis of supplied compare function.
   * @param {function} compareFn compareFunction
   * @returns {array} sorted array.
   */


  sort(compareFn) {
    return this.toArray().sort(compareFn);
  }
  /**
   * iterate each model element.
   *
   * when iteratee return false then break the loop.
   * @param {function} iteratee iteratee(item, index, items)
   */


  each(iteratee) {
    const entries = this.internalMap.entries();
    let next = entries.next();

    while (next.done === false) {
      const [key, value] = next.value;

      if (iteratee(value, key) === false) {
        break;
      }

      next = entries.next();
    }
  }
  /**
   * remove all models in collection.
   */


  clear() {
    this.internalMap.clear();
  }
  /**
   * return new array with collection items.
   * @returns {array} new array.
   */


  toArray() {
    return Array.from(this.internalMap.values());
  }

  get size() {
    return this.internalMap.size;
  }

}
;// CONCATENATED MODULE: ./src/controller/base.ts






/**
 * Make a event collection
 * @returns {Collection<EventModel>} instance
 */
function createEventCollection() {
  const collection = new Collection(event => event.cid());

  if (arguments.length) {
    collection.add(...arguments);
  }

  return collection;
}
/**
 * Calculate contain dates in event.
 * @param {TZDate} start - start date of range
 * @param {TZDate} end - end date of range
 * @returns {array} contain dates.
 */

function getDateRange(start, end) {
  return makeDateRange(toStartOfDay(start), toEndOfDay(end), MS_PER_DAY);
}
function isAllday(event) {
  return event.isAllday || event.category === 'time' && Number(event.end) - Number(event.start) > MS_PER_DAY;
}
/**
 * function for group each event models.
 * @type {function}
 * @param {EventUIModel} uiModel - ui model instance
 * @returns {string} group key
 */

function filterByCategory(uiModel) {
  const {
    model
  } = uiModel;

  if (isAllday(model)) {
    return 'allday';
  }

  return model.category;
}
/****************
 * Events CRUD
 ****************/

/**
 * Set date matrix to supplied event model instance.
 * @param {IDS_OF_DAY} idsOfDay - ids of day
 * @param {EventModel} event - instance of event model.
 */

function addToMatrix(idsOfDay, event) {
  const containDates = getDateRange(event.getStarts(), event.getEnds());
  containDates.forEach(date => {
    const ymd = datetime_toFormat(date, 'YYYYMMDD');
    const matrix = idsOfDay[ymd] = idsOfDay[ymd] || [];
    matrix.push(event.cid());
  });
}
/**
 * Remove event's id from matrix.
 * @param {IDS_OF_DAY} idsOfDay - ids of day
 * @param {EventModel} event - instance of event model
 */

function removeFromMatrix(idsOfDay, event) {
  const modelID = event.cid();
  Object.values(idsOfDay).forEach(ids => {
    const index = ids.indexOf(modelID);

    if (~index) {
      ids.splice(index, 1);
    }
  });
}
function addEvent(calendarData, event) {
  calendarData.events.add(event);
  addToMatrix(calendarData.idsOfDay, event);
  return event;
}
function createEvent(calendarData, eventData) {
  const event = new EventModel(eventData);
  return addEvent(calendarData, event);
}
function createEvents(calendarData) {
  let events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return events.map(eventData => createEvent(calendarData, eventData));
}
/**
 * Update an event.
 * @param {CalendarData} calendarData - data of calendar
 * @param {string} eventId - event id
 * @param {string} calendarId - calendar id
 * @param {EventObject} eventData - event data
 * @returns {boolean} success or failure
 */

function updateEvent(calendarData, eventId, calendarId, eventData) {
  const {
    idsOfDay
  } = calendarData;
  const event = calendarData.events.find(item => isSameEvent(item, eventId, calendarId));

  if (!event) {
    return false;
  }

  event.init({ ...event,
    ...eventData
  });
  removeFromMatrix(idsOfDay, event);
  addToMatrix(idsOfDay, event);
  return true;
}
/**
 * Delete event instance from controller.
 * @param {CalendarData} calendarData - data of calendar
 * @param {EventModel} event - event model instance to delete
 * @returns {EventModel} deleted model instance.
 */

function deleteEvent(calendarData, event) {
  removeFromMatrix(calendarData.idsOfDay, event);
  calendarData.events.remove(event);
  return event;
}
function clearEvents(calendarData) {
  calendarData.idsOfDay = {};
  calendarData.events.clear();
}
/**
 * Set calendar list
 * @param {CalendarData} calendarData - data of calendar
 * @param {Array.<Calendar>} calendars - calendar list
 */

function setCalendars(calendarData, calendars) {
  calendarData.calendars = calendars;
}
/**
 * Return events in supplied date range.
 *
 * available only YMD.
 * @param {CalendarData} calendarData - data of calendar
 * @param {{start: TZDate, end: TZDate}} condition - condition of find range
 * @returns {object.<string, Collection>} event collection grouped by dates.
 */

function findByDateRange(calendarData, condition) {
  const {
    start,
    end
  } = condition;
  const {
    events,
    idsOfDay
  } = calendarData;
  const range = getDateRange(start, end);
  const result = {};
  let ids;
  let ymd;
  let uiModels;
  range.forEach(date => {
    ymd = toFormat(date, 'YYYYMMDD');
    ids = idsOfDay[ymd];
    uiModels = result[ymd] = [];

    if (ids && ids.length) {
      uiModels.push(...ids.map(id => events.get(id)));
    }
  });
  return result;
}
;// CONCATENATED MODULE: ./src/slices/calendar.ts




function createCalendarSlice() {
  let calendars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    calendar: {
      calendars,
      events: createEventCollection(),
      idsOfDay: {}
    }
  };
}
function createCalendarDispatchers(set) {
  return {
    createEvents: events => set(immer_esm(state => {
      createEvents(state.calendar, events);
    })),
    updateEvent: _ref => {
      let {
        event,
        eventData
      } = _ref;
      return set(immer_esm(state => {
        updateEvent(state.calendar, event.id, event.calendarId, eventData);
      }));
    },
    deleteEvent: event => set(immer_esm(state => {
      deleteEvent(state.calendar, event);
    })),
    clearEvents: () => set(immer_esm(state => {
      clearEvents(state.calendar);
    })),
    setCalendars: calendars => set(immer_esm(state => {
      state.calendar.calendars = calendars;
    })),
    setCalendarColor: (calendarId, colorOptions) => set(immer_esm(state => {
      const calendars = state.calendar.calendars.map(calendar => {
        if (calendar.id === calendarId) {
          return { ...calendar,
            ...colorOptions
          };
        }

        return calendar;
      });
      const events = state.calendar.events.toArray().map(event => {
        if (event.calendarId === calendarId) {
          var _colorOptions$color, _colorOptions$backgro, _colorOptions$borderC, _colorOptions$dragBac;

          event.color = (_colorOptions$color = colorOptions.color) !== null && _colorOptions$color !== void 0 ? _colorOptions$color : event.color;
          event.backgroundColor = (_colorOptions$backgro = colorOptions.backgroundColor) !== null && _colorOptions$backgro !== void 0 ? _colorOptions$backgro : event.backgroundColor;
          event.borderColor = (_colorOptions$borderC = colorOptions.borderColor) !== null && _colorOptions$borderC !== void 0 ? _colorOptions$borderC : event.borderColor;
          event.dragBackgroundColor = (_colorOptions$dragBac = colorOptions.dragBackgroundColor) !== null && _colorOptions$dragBac !== void 0 ? _colorOptions$dragBac : event.dragBackgroundColor;
        }

        return event;
      });
      const collection = createEventCollection(...events);
      state.calendar.calendars = calendars;
      state.calendar.events = collection;
    })),
    setCalendarVisibility: (calendarIds, isVisible) => set(immer_esm(state => {
      const events = state.calendar.events.toArray();
      state.calendar.events = createEventCollection(...events.map(event => {
        if (calendarIds.includes(event.calendarId)) {
          event.isVisible = isVisible;
        }

        return event;
      }));
    }))
  };
}
;// CONCATENATED MODULE: ./src/slices/dnd.ts

let DraggingState;

(function (DraggingState) {
  DraggingState[DraggingState["IDLE"] = 0] = "IDLE";
  DraggingState[DraggingState["INIT"] = 1] = "INIT";
  DraggingState[DraggingState["DRAGGING"] = 2] = "DRAGGING";
  DraggingState[DraggingState["CANCELED"] = 3] = "CANCELED";
})(DraggingState || (DraggingState = {}));

function createDndSlice() {
  return {
    dnd: {
      draggingItemType: null,
      draggingState: DraggingState.IDLE,
      initX: null,
      initY: null,
      x: null,
      y: null,
      draggingEventUIModel: null
    }
  };
}
function createDndDispatchers(set) {
  return {
    initDrag: initState => {
      set(immer_esm(state => {
        state.dnd = { ...state.dnd,
          ...initState,
          draggingState: DraggingState.INIT
        };
      }));
    },
    setDragging: newState => {
      set(immer_esm(state => {
        state.dnd = { ...state.dnd,
          ...newState,
          draggingState: DraggingState.DRAGGING
        };
      }));
    },
    cancelDrag: () => {
      set(immer_esm(state => {
        state.dnd = createDndSlice().dnd;
        state.dnd.draggingState = DraggingState.CANCELED;
      }));
    },
    reset: () => {
      set(immer_esm(state => {
        state.dnd = createDndSlice().dnd;
      }));
    },
    setDraggingEventUIModel: eventUIModel => {
      set(immer_esm(state => {
        var _eventUIModel$clone;

        state.dnd.draggingEventUIModel = (_eventUIModel$clone = eventUIModel === null || eventUIModel === void 0 ? void 0 : eventUIModel.clone()) !== null && _eventUIModel$clone !== void 0 ? _eventUIModel$clone : null;
      }));
    }
  };
}
;// CONCATENATED MODULE: ./src/slices/gridSelection.ts


function createGridSelectionSlice() {
  return {
    gridSelection: {
      dayGridMonth: null,
      dayGridWeek: null,
      timeGrid: null,
      accumulated: {
        dayGridMonth: []
      }
    }
  };
}
function createGridSelectionDispatchers(set) {
  return {
    setGridSelection: (type, gridSelection) => {
      set(immer_esm(state => {
        state.gridSelection[type] = gridSelection;
      }));
    },
    addGridSelection: (type, gridSelection) => {
      set(immer_esm(state => {
        if (type === 'dayGridMonth' && gridSelection) {
          state.gridSelection.accumulated[type] = [...state.gridSelection.accumulated[type], gridSelection];
          state.gridSelection.dayGridMonth = null;
        }
      }));
    },
    clearAll: () => set(immer_esm(state => {
      state.gridSelection = createGridSelectionSlice().gridSelection;
    }))
  };
}
;// CONCATENATED MODULE: ./src/constants/layout.ts
const DEFAULT_RESIZER_LENGTH = 3;
const DEFAULT_DUPLICATE_EVENT_CID = -1;
;// CONCATENATED MODULE: ./src/slices/layout.ts




function getRestPanelHeight(dayGridRowsState, lastPanelType, initHeight) {
  return Object.keys(dayGridRowsState).reduce((acc, rowName) => {
    if (rowName === lastPanelType) {
      return acc;
    }

    return acc - dayGridRowsState[rowName].height - DEFAULT_RESIZER_LENGTH;
  }, initHeight);
}

function createWeekViewLayoutSlice() {
  return {
    layout: 500,
    weekViewLayout: {
      lastPanelType: null,
      dayGridRows: {},
      selectedDuplicateEventCid: DEFAULT_DUPLICATE_EVENT_CID
    }
  };
}
function createWeekViewLayoutDispatchers(set) {
  return {
    setLastPanelType: type => {
      set(immer_esm(state => {
        state.weekViewLayout.lastPanelType = type;

        if (type) {
          state.weekViewLayout.dayGridRows[type].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, type, state.layout);
        }
      }));
    },
    updateLayoutHeight: height => set(immer_esm(state => {
      const {
        lastPanelType
      } = state.weekViewLayout;
      state.layout = height;

      if (lastPanelType) {
        state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, lastPanelType, height);
      }
    })),
    updateDayGridRowHeight: _ref => {
      let {
        rowName,
        height
      } = _ref;
      return set(immer_esm(state => {
        const {
          lastPanelType
        } = state.weekViewLayout;
        state.weekViewLayout.dayGridRows[rowName] = {
          height
        };

        if (lastPanelType) {
          state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, lastPanelType, state.layout);
        }
      }));
    },
    updateDayGridRowHeightByDiff: _ref2 => {
      let {
        rowName,
        diff
      } = _ref2;
      return set(immer_esm(state => {
        var _state$weekViewLayout, _state$weekViewLayout2, _state$weekViewLayout3;

        const {
          lastPanelType
        } = state.weekViewLayout;
        const height = (_state$weekViewLayout = (_state$weekViewLayout2 = state.weekViewLayout.dayGridRows) === null || _state$weekViewLayout2 === void 0 ? void 0 : (_state$weekViewLayout3 = _state$weekViewLayout2[rowName]) === null || _state$weekViewLayout3 === void 0 ? void 0 : _state$weekViewLayout3.height) !== null && _state$weekViewLayout !== void 0 ? _state$weekViewLayout : DEFAULT_PANEL_HEIGHT;
        state.weekViewLayout.dayGridRows[rowName] = {
          height: height + diff
        };

        if (lastPanelType) {
          state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, lastPanelType, state.layout);
        }
      }));
    },
    setSelectedDuplicateEventCid: cid => set(immer_esm(state => {
      state.weekViewLayout.selectedDuplicateEventCid = cid !== null && cid !== void 0 ? cid : DEFAULT_DUPLICATE_EVENT_CID;
    }))
  };
}
;// CONCATENATED MODULE: ./src/utils/string.ts
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
;// CONCATENATED MODULE: ./src/helpers/dayName.ts

const DEFAULT_DAY_NAMES = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const getDayName = dayIndex => {
  return DEFAULT_DAY_NAMES[dayIndex];
};
function getDayNames(days, weekDayNamesOption) {
  return days.map(day => {
    const dayIndex = day.getDay();
    const dayName = weekDayNamesOption.length > 0 ? weekDayNamesOption[dayIndex] : capitalize(getDayName(dayIndex));
    return {
      date: day.getDate(),
      day: day.getDay(),
      dayName,
      isToday: true,
      renderDate: 'date',
      dateInstance: day
    };
  });
}
;// CONCATENATED MODULE: ./src/slices/options.ts







function initializeCollapseDuplicateEvents(options) {
  if (!options) {
    return false;
  }

  const initialCollapseDuplicateEvents = {
    getDuplicateEvents: (targetEvent, events) => events.filter(event => event.title === targetEvent.title && compare(event.start, targetEvent.start) === 0 && compare(event.end, targetEvent.end) === 0).sort((a, b) => a.calendarId > b.calendarId ? 1 : -1),
    getMainEvent: events => last(events)
  };

  if (isBoolean_default()(options)) {
    return initialCollapseDuplicateEvents;
  }

  return { ...initialCollapseDuplicateEvents,
    ...options
  };
}

function initializeWeekOptions() {
  let weekOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const week = {
    startDayOfWeek: Day.SUN,
    dayNames: [],
    narrowWeekend: false,
    workweek: false,
    showNowIndicator: true,
    showTimezoneCollapseButton: false,
    timezonesCollapsed: false,
    hourStart: 0,
    hourEnd: 24,
    eventView: true,
    taskView: true,
    collapseDuplicateEvents: false,
    ...weekOptions
  };
  week.collapseDuplicateEvents = initializeCollapseDuplicateEvents(week.collapseDuplicateEvents);
  return week;
}

function initializeTimezoneOptions() {
  let timezoneOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    zones: [],
    ...timezoneOptions
  };
}

function initializeMonthOptions() {
  let monthOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const month = {
    dayNames: [],
    visibleWeeksCount: 0,
    workweek: false,
    narrowWeekend: false,
    startDayOfWeek: Day.SUN,
    isAlways6Weeks: true,
    visibleEventCount: 6,
    ...monthOptions
  };

  if (month.dayNames.length === 0) {
    month.dayNames = DEFAULT_DAY_NAMES.slice();
  }

  return month;
}

function initializeGridSelectionOptions(options) {
  if (isBoolean_default()(options)) {
    return {
      enableDblClick: options,
      enableClick: options
    };
  }

  return {
    enableDblClick: true,
    enableClick: true,
    ...options
  };
}

const initialEventFilter = event => !!event.isVisible; // TODO: some of options has default values. so it should be `Required` type.
// But it needs a complex type such as `DeepRequired`.
// maybe leveraging library like `ts-essential` might be helpful.


// eslint-disable-next-line complexity
function createOptionsSlice() {
  var _options$defaultView, _options$useFormPopup, _options$useDetailPop, _options$isReadOnly, _options$usageStatist, _options$eventFilter;

  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    options: {
      defaultView: (_options$defaultView = options.defaultView) !== null && _options$defaultView !== void 0 ? _options$defaultView : 'week',
      useFormPopup: (_options$useFormPopup = options.useFormPopup) !== null && _options$useFormPopup !== void 0 ? _options$useFormPopup : false,
      useDetailPopup: (_options$useDetailPop = options.useDetailPopup) !== null && _options$useDetailPop !== void 0 ? _options$useDetailPop : false,
      isReadOnly: (_options$isReadOnly = options.isReadOnly) !== null && _options$isReadOnly !== void 0 ? _options$isReadOnly : false,
      week: initializeWeekOptions(options.week),
      month: initializeMonthOptions(options.month),
      gridSelection: initializeGridSelectionOptions(options.gridSelection),
      usageStatistics: (_options$usageStatist = options.usageStatistics) !== null && _options$usageStatist !== void 0 ? _options$usageStatist : true,
      eventFilter: (_options$eventFilter = options.eventFilter) !== null && _options$eventFilter !== void 0 ? _options$eventFilter : initialEventFilter,
      timezone: initializeTimezoneOptions(options.timezone)
    }
  };
}
function createOptionsDispatchers(set) {
  return {
    setOptions: function () {
      let newOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return set(immer_esm(state => {
        var _newOptions$week;

        if (newOptions.gridSelection) {
          newOptions.gridSelection = initializeGridSelectionOptions(newOptions.gridSelection);
        }

        if ((_newOptions$week = newOptions.week) !== null && _newOptions$week !== void 0 && _newOptions$week.collapseDuplicateEvents) {
          newOptions.week.collapseDuplicateEvents = initializeCollapseDuplicateEvents(newOptions.week.collapseDuplicateEvents);
        }

        mergeObject(state.options, newOptions);
      }));
    }
  };
}
;// CONCATENATED MODULE: ./src/slices/popup.ts

let PopupType;

(function (PopupType) {
  PopupType["SeeMore"] = "seeMore";
  PopupType["Form"] = "form";
  PopupType["Detail"] = "detail";
})(PopupType || (PopupType = {}));

function createPopupSlice() {
  return {
    popup: {
      [PopupType.SeeMore]: null,
      [PopupType.Form]: null,
      [PopupType.Detail]: null
    }
  };
}
function createPopupDispatchers(set) {
  return {
    showSeeMorePopup: param => set(immer_esm(state => {
      state.popup[PopupType.SeeMore] = param;
      state.popup[PopupType.Form] = null;
      state.popup[PopupType.Detail] = null;
    })),
    showFormPopup: param => set(immer_esm(state => {
      state.popup[PopupType.Form] = param;
      state.popup[PopupType.SeeMore] = null;
      state.popup[PopupType.Detail] = null;
    })),
    showDetailPopup: (param, isOpenedInSeeMorePopup) => set(immer_esm(state => {
      state.popup[PopupType.Detail] = param;
      state.popup[PopupType.Form] = null;

      if (!isOpenedInSeeMorePopup) {
        state.popup[PopupType.SeeMore] = null;
      }
    })),
    hideSeeMorePopup: () => set(immer_esm(state => {
      state.popup[PopupType.SeeMore] = null;
    })),
    hideFormPopup: () => set(immer_esm(state => {
      state.popup[PopupType.Form] = null;
    })),
    hideDetailPopup: () => set(immer_esm(state => {
      state.popup[PopupType.Detail] = null;
    })),
    hideAllPopup: () => set(immer_esm(state => {
      state.popup[PopupType.SeeMore] = null;
      state.popup[PopupType.Form] = null;
      state.popup[PopupType.Detail] = null;
    }))
  };
}
;// CONCATENATED MODULE: ./src/utils/noop.ts
const noop = () => {// do nothing
};
;// CONCATENATED MODULE: ./src/utils/dom.ts




const CSS_AUTO_REGEX = /^auto$|^$|%/;

function getStyle(el, style) {
  let value = el.style[style];

  if ((!value || value === 'auto') && document.defaultView) {
    const css = document.defaultView.getComputedStyle(el, null);
    value = css ? css[style] : null;
  }

  return value === 'auto' ? null : value;
} // eslint-disable-next-line complexity


function getPosition(el) {
  if ((CSS_AUTO_REGEX.test(el.style.left || '') || CSS_AUTO_REGEX.test(el.style.top || '')) && 'getBoundingClientRect' in el) {
    // When the element's left or top is 'auto'
    const {
      left,
      top
    } = el.getBoundingClientRect();
    return {
      x: left,
      y: top
    };
  }

  return {
    x: parseFloat(el.style.left || String(0)),
    y: parseFloat(el.style.top || String(0))
  };
}

function invalidateSizeValue(value) {
  if (isString_default()(value)) {
    return CSS_AUTO_REGEX.test(value);
  }

  return value === null;
}

function getSize(el) {
  const w = getStyle(el, 'width');
  const h = getStyle(el, 'height');

  if ((invalidateSizeValue(w) || invalidateSizeValue(h)) && el.getBoundingClientRect) {
    const {
      width,
      height
    } = el.getBoundingClientRect();
    return {
      width: width || el.offsetWidth,
      height: height || el.offsetHeight
    };
  }

  return {
    width: parseFloat(w !== null && w !== void 0 ? w : '0'),
    height: parseFloat(h !== null && h !== void 0 ? h : '0')
  };
}
function isOverlapped(el1, el2) {
  const r1 = el1.getBoundingClientRect();
  const r2 = el2.getBoundingClientRect();
  return !(r1.top > r2.bottom || r1.right < r2.left || r1.bottom < r2.top || r1.left > r2.right);
} // for ssr
// eslint-disable-next-line @typescript-eslint/no-empty-function

const ElementClass = typeof Element === 'undefined' ? noop : Element;
const elProto = ElementClass.prototype;

const matchSelector = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector || function (selector) {
  return Array.from(document.querySelectorAll(selector)).includes(this);
};

function matches(element, selector) {
  return matchSelector.call(element, selector);
}

function closest(element, selector) {
  if (matches(element, selector)) {
    return element;
  }

  let parent = element.parentNode;

  while (parent && parent !== document) {
    if (matches(parent, selector)) {
      return parent;
    }

    parent = parent.parentNode;
  }

  return null;
}
function stripTags(str) {
  return str.replace(/<([^>]+)>/gi, '');
}
;// CONCATENATED MODULE: ./src/template/default.tsx







const SIXTY_MINUTES = 60;
const templates = {
  milestone(model) {
    const classNames = cls('icon', 'ic-milestone');
    return h(p, null, h("span", {
      className: classNames
    }), h("span", {
      style: {
        backgroundColor: model.backgroundColor
      }
    }, stripTags(model.title)));
  },

  milestoneTitle() {
    return h("span", {
      className: cls('left-content')
    }, "Milestone");
  },

  task(model) {
    return "#".concat(model.title);
  },

  taskTitle() {
    return h("span", {
      className: cls('left-content')
    }, "Task");
  },

  alldayTitle() {
    return h("span", {
      className: cls('left-content')
    }, "All Day");
  },

  allday(model) {
    return stripTags(model.title);
  },

  time(model) {
    const {
      start,
      title
    } = model;

    if (start) {
      return h("span", null, h("strong", null, datetime_toFormat(start, 'HH:mm')), "\xA0", h("span", null, stripTags(title)));
    }

    return stripTags(title);
  },

  goingDuration(model) {
    const {
      goingDuration
    } = model;
    const hour = Math.floor(goingDuration / SIXTY_MINUTES);
    const minutes = goingDuration % SIXTY_MINUTES;
    return "GoingTime ".concat(leadingZero(hour, 2), ":").concat(leadingZero(minutes, 2));
  },

  comingDuration(model) {
    const {
      comingDuration
    } = model;
    const hour = Math.floor(comingDuration / SIXTY_MINUTES);
    const minutes = comingDuration % SIXTY_MINUTES;
    return "ComingTime ".concat(leadingZero(hour, 2), ":").concat(leadingZero(minutes, 2));
  },

  monthMoreTitleDate(moreTitle) {
    const {
      date,
      day
    } = moreTitle;
    const classNameDay = cls('more-title-date');
    const classNameDayLabel = cls('more-title-day');
    const dayName = capitalize(getDayName(day));
    return h(p, null, h("span", {
      className: classNameDay
    }, date), h("span", {
      className: classNameDayLabel
    }, dayName));
  },

  monthMoreClose() {
    return '';
  },

  monthGridHeader(model) {
    const date = parseInt(model.date.split('-')[2], 10);
    const classNames = cls('weekday-grid-date', {
      'weekday-grid-date-decorator': model.isToday
    });
    return h("span", {
      className: classNames
    }, date);
  },

  monthGridHeaderExceed(hiddenEvents) {
    const className = cls('weekday-grid-more-events');
    return h("span", {
      className: className
    }, hiddenEvents, " more");
  },

  monthGridFooter(_model) {
    return '';
  },

  monthGridFooterExceed(_hiddenEvents) {
    return '';
  },

  monthDayName(model) {
    return model.label;
  },

  weekDayName(model) {
    const classDate = cls('day-name__date');
    const className = cls('day-name__name');
    return h(p, null, h("span", {
      className: classDate
    }, model.date), "\xA0\xA0", h("span", {
      className: className
    }, model.dayName));
  },

  weekGridFooterExceed(hiddenEvents) {
    return "+".concat(hiddenEvents);
  },

  collapseBtnTitle() {
    const className = cls('collapse-btn-icon');
    return h("span", {
      className: className
    });
  },

  timezoneDisplayLabel(_ref) {
    let {
      displayLabel,
      timezoneOffset
    } = _ref;

    if (type_isNil(displayLabel) && isPresent(timezoneOffset)) {
      const sign = timezoneOffset < 0 ? '-' : '+';
      const hours = Math.abs(timezoneOffset / SIXTY_MINUTES);
      const minutes = Math.abs(timezoneOffset % SIXTY_MINUTES);
      return "GMT".concat(sign).concat(leadingZero(hours, 2), ":").concat(leadingZero(minutes, 2));
    }

    return displayLabel;
  },

  timegridDisplayPrimaryTime(props) {
    const {
      time
    } = props;
    return datetime_toFormat(time, 'hh tt');
  },

  timegridDisplayTime(props) {
    const {
      time
    } = props;
    return datetime_toFormat(time, 'HH:mm');
  },

  timegridNowIndicatorLabel(timezone) {
    const {
      time,
      format = 'HH:mm'
    } = timezone;
    return datetime_toFormat(time, format);
  },

  popupIsAllday() {
    return 'All day';
  },

  popupStateFree() {
    return 'Free';
  },

  popupStateBusy() {
    return 'Busy';
  },

  titlePlaceholder() {
    return 'Subject';
  },

  locationPlaceholder() {
    return 'Location';
  },

  startDatePlaceholder() {
    return 'Start date';
  },

  endDatePlaceholder() {
    return 'End date';
  },

  popupSave() {
    return 'Save';
  },

  popupUpdate() {
    return 'Update';
  },

  popupEdit() {
    return 'Edit';
  },

  popupDelete() {
    return 'Delete';
  },

  popupDetailTitle(_ref2) {
    let {
      title
    } = _ref2;
    return title;
  },

  popupDetailDate(_ref3) {
    let {
      isAllday,
      start,
      end
    } = _ref3;
    const dayFormat = 'YYYY.MM.DD';
    const timeFormat = 'hh:mm tt';
    const detailFormat = "".concat(dayFormat, " ").concat(timeFormat);
    const startDate = datetime_toFormat(start, isAllday ? dayFormat : timeFormat);
    const endDateFormat = isSameDate(start, end) ? timeFormat : detailFormat;

    if (isAllday) {
      return "".concat(startDate).concat(isSameDate(start, end) ? '' : " - ".concat(datetime_toFormat(end, dayFormat)));
    }

    return "".concat(datetime_toFormat(start, detailFormat), " - ").concat(datetime_toFormat(end, endDateFormat));
  },

  popupDetailLocation(_ref4) {
    let {
      location
    } = _ref4;
    return location;
  },

  popupDetailAttendees(_ref5) {
    let {
      attendees = []
    } = _ref5;
    return attendees.join(', ');
  },

  popupDetailState(_ref6) {
    let {
      state
    } = _ref6;
    return state || 'Busy';
  },

  popupDetailRecurrenceRule(_ref7) {
    let {
      recurrenceRule
    } = _ref7;
    return recurrenceRule;
  },

  popupDetailBody(_ref8) {
    let {
      body
    } = _ref8;
    return body;
  }

};
;// CONCATENATED MODULE: ./src/slices/template.ts


function createTemplateSlice() {
  let templateConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    template: { ...templates,
      ...templateConfig
    }
  };
}
function createTemplateDispatchers(set) {
  return {
    setTemplate: template => set(immer_esm(state => {
      state.template = { ...state.template,
        ...template
      };
    }))
  };
}
;// CONCATENATED MODULE: ./src/slices/view.ts



function createViewSlice() {
  let initialView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'week';
  const renderDate = new date_TZDate();
  renderDate.setHours(0, 0, 0, 0);
  return {
    view: {
      currentView: initialView,
      renderDate
    }
  };
}
function createViewDispatchers(set) {
  return {
    changeView: nextView => set(immer_esm(state => {
      state.view.currentView = nextView;
    })),
    setRenderDate: date => set(immer_esm(state => {
      state.view.renderDate = toStartOfDay(date);
    }))
  };
}
;// CONCATENATED MODULE: ./src/store/index.ts






/**
 * Inspired by Zustand
 *
 * See more: https://github.com/pmndrs/zustand
 */
const isSSR = isUndefined_default()(window) || !window.navigator;
const useIsomorphicLayoutEffect = isSSR ? hooks_module_ : hooks_module_h;
function createStoreContext() {
  const StoreContext = B(null);

  function StoreProvider(_ref) {
    let {
      children,
      store
    } = _ref;
    return h(StoreContext.Provider, {
      value: store,
      children
    });
  }

  const useStore = function (selector) {
    let equalityFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.is;
    const storeCtx = hooks_module_q(StoreContext);

    if (type_isNil(storeCtx)) {
      throw new Error('StoreProvider is not found');
    } // a little trick to invoke re-render to notify hook consumers(usually components)


    const [, notify] = hooks_module_d(notifyCount => notifyCount + 1, 0);
    const state = storeCtx.getState();
    const stateRef = hooks_module_s(state);
    const selectorRef = hooks_module_s(selector);
    const equalityFnRef = hooks_module_s(equalityFn);
    const hasErrorRef = hooks_module_s(false); // `null` can be a valid state slice.

    const currentSliceRef = hooks_module_s();

    if (isUndefined_default()(currentSliceRef.current)) {
      currentSliceRef.current = selector(state);
    }

    let newStateSlice;
    let hasNewStateSlice = false;
    const shouldGetNewSlice = stateRef.current !== state || selectorRef.current !== selector || equalityFnRef.current !== equalityFn || hasErrorRef.current;

    if (shouldGetNewSlice) {
      newStateSlice = selector(state);
      hasNewStateSlice = !equalityFn(currentSliceRef.current, newStateSlice);
    }

    useIsomorphicLayoutEffect(() => {
      if (hasNewStateSlice) {
        currentSliceRef.current = newStateSlice;
      }

      stateRef.current = state;
      selectorRef.current = selector;
      equalityFnRef.current = equalityFn;
      hasErrorRef.current = false;
    }); // NOTE: There is edge case that state is changed before subscription

    const stateBeforeSubscriptionRef = hooks_module_s(state);
    useIsomorphicLayoutEffect(() => {
      const listener = () => {
        try {
          const nextState = storeCtx.getState();
          const nextStateSlice = selectorRef.current(nextState);
          const shouldUpdateState = !equalityFnRef.current(currentSliceRef.current, nextStateSlice);

          if (shouldUpdateState) {
            stateRef.current = nextState;
            currentSliceRef.current = newStateSlice;
            notify();
          }
        } catch (e) {
          // This will be rarely happened, unless we don't pass the arguments to actions properly.
          // eslint-disable-next-line no-console
          console.error('[toastui-calendar] failed to update state', e === null || e === void 0 ? void 0 : e.message);
          hasErrorRef.current = true;
          notify();
        }
      };

      const unsubscribe = storeCtx.subscribe(listener);

      if (storeCtx.getState() !== stateBeforeSubscriptionRef.current) {
        listener();
      }

      return unsubscribe;
    }, []);
    return hasNewStateSlice ? newStateSlice : currentSliceRef.current;
  };
  /**
   * For handling often occurring state changes (Transient updates)
   * See more: https://github.com/pmndrs/zustand/blob/master/readme.md#transient-updates-for-often-occuring-state-changes
   */


  const useInternalStore = () => {
    const storeCtx = hooks_module_q(StoreContext);

    if (type_isNil(storeCtx)) {
      throw new Error('StoreProvider is not found');
    }

    return F(() => storeCtx, [storeCtx]);
  };

  return {
    StoreProvider,
    useStore,
    useInternalStore
  };
}
;// CONCATENATED MODULE: ./src/store/internal.ts

function createStore(storeCreator) {
  let state;
  const listeners = new Set();

  const setState = partialStateCreator => {
    const nextState = partialStateCreator(state);

    if (nextState !== state) {
      const previousState = state;
      state = { ...state,
        ...nextState
      };
      listeners.forEach(listener => listener(state, previousState));
    }
  };

  const getState = () => state;

  const subscribe = (listener, selector, equalityFn) => {
    let _listener = listener;

    if (selector) {
      let currentSlice = selector(state);

      const _equalityFn = equalityFn !== null && equalityFn !== void 0 ? equalityFn : Object.is;

      _listener = () => {
        const nextSlice = selector(state);

        if (!_equalityFn(currentSlice, nextSlice)) {
          const previousSlice = currentSlice;
          currentSlice = nextSlice;
          listener(currentSlice, previousSlice);
        }
      };
    }

    listeners.add(_listener); // eslint-disable-next-line dot-notation

    return () => listeners.delete(_listener);
  };

  const clearListeners = () => listeners.clear();

  const internal = {
    setState,
    getState,
    subscribe,
    clearListeners
  };
  state = storeCreator(setState, getState, internal);
  return internal;
}
;// CONCATENATED MODULE: ./src/contexts/calendarStore.ts












const storeCreator = options => set => {
  return { ...createOptionsSlice(options),
    ...createTemplateSlice(options.template),
    ...createPopupSlice(),
    ...createWeekViewLayoutSlice(),
    ...createCalendarSlice(options.calendars),
    ...createViewSlice(options.defaultView),
    ...createDndSlice(),
    ...createGridSelectionSlice(),
    dispatch: {
      options: createOptionsDispatchers(set),
      popup: createPopupDispatchers(set),
      weekViewLayout: createWeekViewLayoutDispatchers(set),
      calendar: createCalendarDispatchers(set),
      view: createViewDispatchers(set),
      dnd: createDndDispatchers(set),
      gridSelection: createGridSelectionDispatchers(set),
      template: createTemplateDispatchers(set)
    }
  };
};

const initCalendarStore = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return createStore(storeCreator(options));
};
const {
  StoreProvider,
  useStore,
  useInternalStore
} = createStoreContext();

function useDispatch(group) {
  return useStore(hooks_module_T(state => {
    if (!group) {
      return state.dispatch;
    }

    return state.dispatch[group];
  }, [group]));
}
;// CONCATENATED MODULE: ./src/selectors/index.ts
function topLevelStateSelector(group) {
  return state => state[group];
}
const popupSelector = topLevelStateSelector('popup');
const calendarSelector = topLevelStateSelector('calendar');
const weekViewLayoutSelector = topLevelStateSelector('weekViewLayout');
const templateSelector = topLevelStateSelector('template');
const viewSelector = topLevelStateSelector('view');
const optionsSelector = topLevelStateSelector('options');
const dndSelector = topLevelStateSelector('dnd');
// EXTERNAL MODULE: ../../node_modules/isomorphic-dompurify/browser.js
var browser = __webpack_require__(4304);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);
;// CONCATENATED MODULE: ./src/utils/sanitizer.ts
 // For temporarily saving original target value

const TEMP_TARGET_ATTRIBUTE = 'data-target-temp';
/**
 * Add DOMPurify hook to handling exceptional rules for certain HTML attributes.
 * Should be set when the calendar instance is created.
 */

function addAttributeHooks() {
  browser_default().addHook('beforeSanitizeAttributes', node => {
    // Preserve default target attribute value
    if (node.tagName === 'A') {
      const targetValue = node.getAttribute('target');

      if (targetValue) {
        node.setAttribute(TEMP_TARGET_ATTRIBUTE, targetValue);
      } else {
        node.setAttribute('target', '_self'); // set default value
      }
    }
  });
  browser_default().addHook('afterSanitizeAttributes', node => {
    if (node.tagName === 'A' && node.hasAttribute(TEMP_TARGET_ATTRIBUTE)) {
      node.setAttribute('target', node.getAttribute(TEMP_TARGET_ATTRIBUTE));
      node.removeAttribute(TEMP_TARGET_ATTRIBUTE); // Additionally set `rel="noopener"` to prevent another security issue.

      if (node.getAttribute('target') === '_blank') {
        node.setAttribute('rel', 'noopener');
      }
    }
  });
}
/**
 * Remove all attribute sanitizing hooks.
 * Use it in `Calendar#destroy`.
 */

function removeAttributeHooks() {
  browser_default().removeAllHooks();
}
/**
 * Prevent XSS attack by sanitizing input string values via DOMPurify
 */

function sanitize(str) {
  return browser_default().sanitize(str);
}
;// CONCATENATED MODULE: ./src/components/template.tsx






function Template(_ref) {
  var _htmlOrVnode$props$cl;

  let {
    template,
    param,
    as: tagName = 'div'
  } = _ref;
  const templates = useStore(templateSelector);
  const templateFunc = templates[template];

  if (type_isNil(templateFunc)) {
    return null;
  }

  const htmlOrVnode = templateFunc(param);
  return isString_default()(htmlOrVnode) ? h(tagName, {
    className: cls("template-".concat(template)),
    dangerouslySetInnerHTML: {
      __html: sanitize(htmlOrVnode)
    }
  }) : q(htmlOrVnode, {
    className: "".concat((_htmlOrVnode$props$cl = htmlOrVnode.props.className) !== null && _htmlOrVnode$props$cl !== void 0 ? _htmlOrVnode$props$cl : '', " ").concat(cls("template-".concat(template)))
  });
}
;// CONCATENATED MODULE: ./src/contexts/eventBus.tsx



const EventBusContext = B(null);
const EventBusProvider = EventBusContext.Provider;
const useEventBus = () => {
  const eventBus = hooks_module_q(EventBusContext);

  if (!eventBus) {
    throw new Error('useEventBus must be used within a EventBusProvider');
  }

  return eventBus;
};
;// CONCATENATED MODULE: ./src/selectors/timezone.ts
const primaryTimezoneSelector = state => {
  var _state$options$timezo, _state$options, _state$options$timezo2, _state$options$timezo3, _state$options$timezo4;

  return (_state$options$timezo = (_state$options = state.options) === null || _state$options === void 0 ? void 0 : (_state$options$timezo2 = _state$options.timezone) === null || _state$options$timezo2 === void 0 ? void 0 : (_state$options$timezo3 = _state$options$timezo2.zones) === null || _state$options$timezo3 === void 0 ? void 0 : (_state$options$timezo4 = _state$options$timezo3[0]) === null || _state$options$timezo4 === void 0 ? void 0 : _state$options$timezo4.timezoneName) !== null && _state$options$timezo !== void 0 ? _state$options$timezo : 'Local';
};
const customOffsetCalculatorSelector = state => {
  var _state$options2, _state$options2$timez;

  return (_state$options2 = state.options) === null || _state$options2 === void 0 ? void 0 : (_state$options2$timez = _state$options2.timezone) === null || _state$options2$timez === void 0 ? void 0 : _state$options2$timez.customOffsetCalculator;
};
const timezonesSelector = state => {
  var _state$options$timezo5;

  return (_state$options$timezo5 = state.options.timezone.zones) !== null && _state$options$timezo5 !== void 0 ? _state$options$timezo5 : [];
};
;// CONCATENATED MODULE: ./src/hooks/timezone/useTZConverter.ts





function useTZConverter() {
  const customOffsetCalculator = useStore(customOffsetCalculatorSelector);
  const hasCustomOffsetCalculator = isPresent(customOffsetCalculator);
  return hooks_module_T(function (timezoneName) {
    let tzDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new date_TZDate();
    return tzDate.tz(hasCustomOffsetCalculator ? customOffsetCalculator(timezoneName, tzDate.getTime()) : timezoneName);
  }, [customOffsetCalculator, hasCustomOffsetCalculator]);
}
;// CONCATENATED MODULE: ./src/hooks/timezone/usePrimaryTimezone.ts




function usePrimaryTimezone() {
  const primaryTimezoneName = useStore(primaryTimezoneSelector);
  const tzConverter = useTZConverter();
  const getNow = hooks_module_T(() => tzConverter(primaryTimezoneName), [primaryTimezoneName, tzConverter]);
  return [primaryTimezoneName, getNow];
}
;// CONCATENATED MODULE: ./src/components/dayGridCommon/dayName.tsx









function isWeekDayName(type, dayName) {
  return type === 'week';
}

function getWeekDayNameColor(_ref) {
  let {
    dayName,
    theme,
    today
  } = _ref;
  const {
    day,
    dateInstance
  } = dayName;
  const isToday = isSameDate(today, dateInstance);
  const isPastDay = !isToday && dateInstance < today;

  if (isSunday(day)) {
    return theme.common.holiday.color;
  }

  if (isPastDay) {
    var _theme$week;

    return (_theme$week = theme.week) === null || _theme$week === void 0 ? void 0 : _theme$week.pastDay.color;
  }

  if (isSaturday(day)) {
    return theme.common.saturday.color;
  }

  if (isToday) {
    var _theme$week2;

    return (_theme$week2 = theme.week) === null || _theme$week2 === void 0 ? void 0 : _theme$week2.today.color;
  }

  return theme.common.dayName.color;
}

function getMonthDayNameColor(_ref2) {
  let {
    dayName,
    theme
  } = _ref2;
  const {
    day
  } = dayName;

  if (isSunday(day)) {
    return theme.common.holiday.color;
  }

  if (isSaturday(day)) {
    return theme.common.saturday.color;
  }

  return theme.common.dayName.color;
}

function DayName(_ref3) {
  let {
    dayName,
    style,
    type,
    theme
  } = _ref3;
  const eventBus = useEventBus();
  const [, getNow] = usePrimaryTimezone();
  const today = getNow();
  const {
    day
  } = dayName;
  const color = type === 'week' ? getWeekDayNameColor({
    dayName: dayName,
    theme,
    today
  }) : getMonthDayNameColor({
    dayName: dayName,
    theme
  });
  const templateType = "".concat(type, "DayName");

  const handleClick = () => {
    if (isWeekDayName(type, dayName)) {
      eventBus.fire('clickDayName', {
        date: datetime_toFormat(dayName.dateInstance, 'YYYY-MM-DD')
      });
    }
  };

  return h("div", {
    className: cls('day-name-item', type),
    style: style
  }, h("span", {
    className: cls({
      ["holiday-".concat(getDayName(day))]: isWeekend(day)
    }),
    style: {
      color
    },
    onClick: handleClick,
    "data-testid": "dayName-".concat(type, "-").concat(getDayName(day))
  }, h(Template, {
    template: templateType,
    param: dayName
  })));
}
;// CONCATENATED MODULE: ./src/selectors/theme.ts


/**
 * Selectors for the theme state.
 * Use selectors with `useTheme` hooks only.
 */
const commonThemeSelector = topLevelStateSelector('common');
const theme_weekThemeSelector = topLevelStateSelector('week');
const monthThemeSelector = topLevelStateSelector('month');
const weekDayGridLeftSelector = theme => theme.week.dayGridLeft;
const weekTimeGridLeftSelector = theme => theme.week.timeGridLeft;
const monthMoreViewSelector = theme => theme.month.moreView;
const monthGridCellSelector = theme => theme.month.gridCell;
;// CONCATENATED MODULE: ./src/constants/theme.ts
const DEFAULT_COMMON_THEME = {
  border: '1px solid #e5e5e5',
  backgroundColor: 'white',
  holiday: {
    color: '#ff4040'
  },
  saturday: {
    color: '#333'
  },
  dayName: {
    color: '#333'
  },
  today: {
    color: '#fff'
  },
  gridSelection: {
    backgroundColor: 'rgba(81, 92, 230, 0.05)',
    border: '1px solid #515ce6'
  }
};
const DEFAULT_WEEK_THEME = {
  dayName: {
    borderLeft: 'none',
    borderTop: '1px solid #e5e5e5',
    borderBottom: '1px solid #e5e5e5',
    backgroundColor: 'inherit'
  },
  weekend: {
    backgroundColor: 'inherit'
  },
  today: {
    color: 'inherit',
    backgroundColor: 'rgba(81, 92, 230, 0.05)'
  },
  pastDay: {
    color: '#bbb'
  },
  panelResizer: {
    border: '1px solid #e5e5e5'
  },
  dayGrid: {
    borderRight: '1px solid #e5e5e5',
    backgroundColor: 'inherit'
  },
  dayGridLeft: {
    borderRight: '1px solid #e5e5e5',
    backgroundColor: 'inherit',
    width: '72px'
  },
  timeGrid: {
    borderRight: '1px solid #e5e5e5'
  },
  timeGridLeft: {
    backgroundColor: 'inherit',
    borderRight: '1px solid #e5e5e5',
    width: '72px'
  },
  timeGridLeftAdditionalTimezone: {
    backgroundColor: 'white'
  },
  timeGridHalfHourLine: {
    borderBottom: 'none'
  },
  timeGridHourLine: {
    borderBottom: '1px solid #e5e5e5'
  },
  nowIndicatorLabel: {
    color: '#515ce6'
  },
  nowIndicatorPast: {
    border: '1px dashed #515ce6'
  },
  nowIndicatorBullet: {
    backgroundColor: '#515ce6'
  },
  nowIndicatorToday: {
    border: '1px solid #515ce6'
  },
  nowIndicatorFuture: {
    border: 'none'
  },
  pastTime: {
    color: '#bbb'
  },
  futureTime: {
    color: '#333'
  },
  gridSelection: {
    color: '#515ce6'
  }
};
const DEFAULT_MONTH_THEME = {
  dayName: {
    borderLeft: 'none',
    backgroundColor: 'inherit'
  },
  holidayExceptThisMonth: {
    color: 'rgba(255, 64, 64, 0.4)'
  },
  dayExceptThisMonth: {
    color: 'rgba(51, 51, 51, 0.4)'
  },
  weekend: {
    backgroundColor: 'inherit'
  },
  moreView: {
    border: '1px solid #d5d5d5',
    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    width: null,
    height: null
  },
  gridCell: {
    headerHeight: 31,
    footerHeight: null
  },
  moreViewTitle: {
    backgroundColor: 'inherit'
  }
};
;// CONCATENATED MODULE: ./src/theme/common.ts


function createCommonTheme() {
  let commonTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    common: mergeObject(DEFAULT_COMMON_THEME, commonTheme)
  };
}
;// CONCATENATED MODULE: ./src/theme/dispatch.ts


function createThemeDispatch(set) {
  return {
    setTheme: theme => {
      set(immer_esm(state => {
        state.common = mergeObject(state.common, theme.common);
        state.week = mergeObject(state.week, theme.week);
        state.month = mergeObject(state.month, theme.month);
      }));
    },
    setCommonTheme: commonTheme => {
      set(immer_esm(state => {
        state.common = mergeObject(state.common, commonTheme);
      }));
    },
    setWeekTheme: weekTheme => {
      set(immer_esm(state => {
        state.week = mergeObject(state.week, weekTheme);
      }));
    },
    setMonthTheme: monthTheme => {
      set(immer_esm(state => {
        state.month = mergeObject(state.month, monthTheme);
      }));
    }
  };
}
;// CONCATENATED MODULE: ./src/theme/month.ts


function createMonthTheme() {
  let monthTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    month: mergeObject(DEFAULT_MONTH_THEME, monthTheme)
  };
}
;// CONCATENATED MODULE: ./src/theme/week.ts


function createWeekTheme() {
  let weekTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    week: mergeObject(DEFAULT_WEEK_THEME, weekTheme)
  };
}
;// CONCATENATED MODULE: ./src/contexts/themeStore.tsx









const themeStoreCreator = function () {
  let themeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return set => {
    return { ...createCommonTheme(themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.common),
      ...createWeekTheme(themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.week),
      ...createMonthTheme(themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.month),
      dispatch: { ...createThemeDispatch(set)
      }
    };
  };
};

const initThemeStore = function () {
  let themeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return createStore(themeStoreCreator(themeOptions));
};
const {
  StoreProvider: ThemeProvider,
  useInternalStore: useInternalThemeStore,
  useStore: useTheme
} = createStoreContext();

function useThemeDispatch() {
  return useTheme(useCallback(state => state.dispatch, []));
}
function useCommonTheme() {
  return useTheme(commonThemeSelector);
}
function useWeekTheme() {
  return useTheme(weekThemeSelector);
}
function useMonthTheme() {
  return useTheme(monthThemeSelector);
}
function useAllTheme() {
  return useTheme(useCallback(_ref => {
    let {
      common,
      week,
      month
    } = _ref;
    return {
      common,
      week,
      month
    };
  }, []));
}
;// CONCATENATED MODULE: ./src/components/dayGridCommon/gridHeader.tsx






function weekDayNameSelector(theme) {
  return {
    common: {
      saturday: theme.common.saturday,
      holiday: theme.common.holiday,
      today: theme.common.today,
      dayName: theme.common.dayName
    },
    week: {
      pastDay: theme.week.pastDay,
      today: theme.week.today,
      dayName: theme.week.dayName
    }
  };
}

function monthDayNameSelector(theme) {
  return {
    common: {
      saturday: theme.common.saturday,
      holiday: theme.common.holiday,
      today: theme.common.today,
      dayName: theme.common.dayName
    },
    month: {
      dayName: theme.month.dayName
    }
  };
}

function GridHeader(_ref) {
  var _theme$type$dayName, _theme$type;

  let {
    dayNames,
    marginLeft = DEFAULT_DAY_NAME_MARGIN_LEFT,
    rowStyleInfo,
    type = 'month'
  } = _ref;
  const theme = useTheme(type === 'month' ? monthDayNameSelector : weekDayNameSelector);
  const {
    backgroundColor = 'white',
    borderLeft = null,
    ...rest
  } = (_theme$type$dayName = (_theme$type = theme[type]) === null || _theme$type === void 0 ? void 0 : _theme$type.dayName) !== null && _theme$type$dayName !== void 0 ? _theme$type$dayName : {};
  const {
    borderTop = null,
    borderBottom = null
  } = rest;
  return h("div", {
    "data-testid": "grid-header-".concat(type),
    className: cls('day-names', type),
    style: {
      backgroundColor,
      borderTop,
      borderBottom
    }
  }, h("div", {
    className: cls('day-name-container'),
    style: {
      marginLeft
    }
  }, dayNames.map((dayName, index) => h(DayName, {
    type: type,
    key: "dayNames-".concat(dayName.day),
    dayName: dayName,
    style: {
      width: toPercent(rowStyleInfo[index].width),
      left: toPercent(rowStyleInfo[index].left),
      borderLeft
    },
    theme: theme
  }))));
}
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.unscopables.flat-map.js
var es_array_unscopables_flat_map = __webpack_require__(3985);
;// CONCATENATED MODULE: ./src/constants/grid.ts
const DEFAULT_VISIBLE_WEEKS = 6;
let CellBarType;

(function (CellBarType) {
  CellBarType["header"] = "header";
  CellBarType["footer"] = "footer";
})(CellBarType || (CellBarType = {}));
;// CONCATENATED MODULE: ./src/controller/core.ts






/**
 * Calculate collision group.
 * @param {Array<EventModel|EventUIModel>} events list of ui models.
 * @param {boolean} [usingTravelTime = true]
 * @returns {Array<number[]>} Collision Group.
 */
function getCollisionGroup(events) {
  let usingTravelTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const collisionGroups = [];
  let previousEventList;

  if (!events.length) {
    return collisionGroups;
  }

  collisionGroups[0] = [events[0].cid()];
  events.slice(1).forEach((event, index) => {
    previousEventList = events.slice(0, index + 1).reverse(); // If overlapping previous events, find a Collision Group of overlapping events and add this events

    const found = previousEventList.find(previous => event.collidesWith(previous, usingTravelTime));

    if (!found) {
      // This event is a event that does not overlap with the previous event, so a new Collision Group is constructed.
      collisionGroups.push([event.cid()]);
    } else {
      collisionGroups.slice().reverse().some(group => {
        if (~group.indexOf(found.cid())) {
          // If you find a previous event that overlaps, include it in the Collision Group to which it belongs.
          group.push(event.cid());
          return true; // returning true can stop this loop
        }

        return false;
      });
    }
  });
  return collisionGroups;
}
/**
 * Get row length by column index in 2d matrix.
 * @param {array[]} matrix Matrix
 * @param {number} col Column index.
 * @returns {number} Last row number in column or -1
 */

function getLastRowInColumn(matrix, col) {
  let {
    length: row
  } = matrix;

  while (row > 0) {
    row -= 1;

    if (!isUndefined_default()(matrix[row][col])) {
      return row;
    }
  }

  return -1;
}
/**
 * Calculate matrix for appointment block element placing.
 * @param {Collection} collection model collection.
 * @param {Array<number[]>} collisionGroups Collision groups for event set.
 * @param {boolean} [usingTravelTime = true]
 * @returns {array} matrices
 */

function getMatrices(collection, collisionGroups) {
  let usingTravelTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const result = [];
  collisionGroups.forEach(group => {
    const matrix = [[]];
    group.forEach(eventID => {
      const event = collection.get(eventID);
      let col = 0;
      let found = false;
      let nextRow;
      let lastRowInColumn;

      while (!found) {
        lastRowInColumn = getLastRowInColumn(matrix, col);

        if (lastRowInColumn === -1) {
          matrix[0].push(event);
          found = true;
        } else if (!event.collidesWith(matrix[lastRowInColumn][col], usingTravelTime)) {
          nextRow = lastRowInColumn + 1;

          if (isUndefined_default()(matrix[nextRow])) {
            matrix[nextRow] = [];
          }

          matrix[nextRow][col] = event;
          found = true;
        }

        col += 1;
      }
    });
    result.push(matrix);
  });
  return result;
}
/**
 * Filter that get event model in supplied date ranges.
 * @param {TZDate} start - start date
 * @param {TZDate} end - end date
 * @returns {function} event filter function
 */

function getEventInDateRangeFilter(start, end) {
  return model => {
    const ownStarts = model.getStarts();
    const ownEnds = model.getEnds(); // shorthand condition of
    //
    // (ownStarts >= start && ownEnds <= end) ||
    // (ownStarts < start && ownEnds >= start) ||
    // (ownEnds > end && ownStarts <= end)

    return !(ownEnds < start || ownStarts > end);
  };
}
/**
 * Position each ui model for placing into container
 * @param {TZDate} start - start date to render
 * @param {TZDate} end - end date to render
 * @param {Matrix3d} matrices - matrices from controller
 * @param {function} [iteratee] - iteratee function invoke each ui models
 */

function positionUIModels(start, end, matrices, iteratee) {
  const ymdListToRender = makeDateRange(start, end, MS_PER_DAY).map(date => datetime_toFormat(date, 'YYYYMMDD'));
  matrices.forEach(matrix => {
    matrix.forEach(column => {
      column.forEach((uiModel, index) => {
        if (!uiModel) {
          return;
        }

        const ymd = datetime_toFormat(uiModel.getStarts(), 'YYYYMMDD');
        const dateLength = makeDateRange(toStartOfDay(uiModel.getStarts()), toEndOfDay(uiModel.getEnds()), MS_PER_DAY).length;
        uiModel.top = index;
        uiModel.left = ymdListToRender.indexOf(ymd);
        uiModel.width = dateLength;
        iteratee === null || iteratee === void 0 ? void 0 : iteratee(uiModel);
      });
    });
  });
}
/**
 * Limit render range for ui models
 * @param {TZDate} start
 * @param {TZDate} end
 * @param {EventUIModel} uiModel - ui model instance
 * @returns {EventUIModel} ui model that limited render range
 */

function limit(start, end, uiModel) {
  if (uiModel.getStarts() < start) {
    uiModel.exceedLeft = true;
    uiModel.renderStarts = new date_TZDate(start);
  }

  if (uiModel.getEnds() > end) {
    uiModel.exceedRight = true;
    uiModel.renderEnds = new date_TZDate(end);
  }

  return uiModel;
}
/**
 * Limit start, end date each ui model for render properly
 * @param {TZDate} start - start date to render
 * @param {TZDate} end - end date to render
 * @param {Collection<EventUIModel>|EventUIModel} uiModelColl - collection of EventUIModel or EventUIModel
 * @returns {?EventUIModel} return ui model when third parameter is
 *  ui model
 */


function limitRenderRange(start, end, uiModelColl) {
  if (uiModelColl instanceof Collection) {
    uiModelColl.each(uiModel => {
      limit(start, end, uiModel);
      return true;
    });
    return null;
  }

  return limit(start, end, uiModelColl);
}
/**
 * Convert event model collection to ui model collection.
 * @param {Collection} eventCollection - collection of event model
 * @returns {Collection} collection of event ui model
 */

function convertToUIModel(eventCollection) {
  const uiModelColl = new Collection(uiModel => {
    return uiModel.cid();
  });
  eventCollection.each(function (event) {
    uiModelColl.add(new EventUIModel(event));
  });
  return uiModelColl;
}
;// CONCATENATED MODULE: ./src/controller/month.ts







/**
 * Filter function for find allday event
 * @param {EventUIModel} uiModel - ui model
 * @returns {boolean} whether model is allday event?
 */
function _isAllday(_ref) {
  let {
    model
  } = _ref;
  return model.isAllday || model.hasMultiDates;
}
/**
 * Filter function for find time event
 * @param {EventUIModel} uiModel - ui model
 * @returns {boolean} whether model is time event?
 */


function _isNotAllday(uiModel) {
  return !_isAllday(uiModel);
}
/**
 * Weight top value +1 for month view render
 * @param {EventUIModel} uiModel - ui model
 */


function _weightTopValue(uiModel) {
  uiModel.top = uiModel.top || 0;
  uiModel.top += 1;
}
/**
 * Adjust render range to render properly.
 *
 * Limit start, end for each allday events and expand start, end for
 * each time events
 * @param {TZDate} start - render start date
 * @param {TZDate} end - render end date
 * @param {Collection} uiModelColl - collection of ui model.
 */


function _adjustRenderRange(start, end, uiModelColl) {
  uiModelColl.each(uiModel => {
    if (uiModel.model.isAllday || uiModel.model.hasMultiDates) {
      limitRenderRange(toStartOfDay(start), toEndOfDay(end), uiModel);
    }
  });
}
/**
 * Get max top index value for allday events in specific date (YMD)
 * @param idsOfDay
 * @param {string} ymd - yyyymmdd formatted value
 * @param {Collection} uiModelAlldayColl - collection of allday events
 * @returns {number} max top index value in date
 */


function _getAlldayMaxTopIndexAtYMD(idsOfDay, ymd, uiModelAlldayColl) {
  const topIndexesInDate = [];
  idsOfDay[ymd].forEach(cid => {
    uiModelAlldayColl.doWhenHas(cid, uiModel => {
      topIndexesInDate.push(uiModel.top);
    });
  });

  if (topIndexesInDate.length > 0) {
    return Math.max(...topIndexesInDate);
  }

  return 0;
}
/**
 * Adjust time ui model's top index value
 * @param idsOfDay
 * @param {Collection} uiModelColl - collection of ui ui model
 */


function _adjustTimeTopIndex(idsOfDay, uiModelColl) {
  const vAlldayColl = uiModelColl.filter(_isAllday);
  const sortedTimeEvents = uiModelColl.filter(_isNotAllday).sort(array.compare.event.asc);
  const maxIndexInYMD = {};
  sortedTimeEvents.forEach(timeUIModel => {
    const eventYMD = datetime_toFormat(timeUIModel.getStarts(), 'YYYYMMDD');
    let alldayMaxTopInYMD = maxIndexInYMD[eventYMD];

    if (isUndefined_default()(alldayMaxTopInYMD)) {
      alldayMaxTopInYMD = maxIndexInYMD[eventYMD] = _getAlldayMaxTopIndexAtYMD(idsOfDay, eventYMD, vAlldayColl);
    }

    maxIndexInYMD[eventYMD] = timeUIModel.top = alldayMaxTopInYMD + 1;
  });
}
/**
 * Adjust time ui model's top index value
 * @param {IDS_OF_DAY} idsOfDay - ids of days
 * @param {Collection} uiModelColl - collection of ui ui model
 */


function _stackTimeFromTop(idsOfDay, uiModelColl) {
  const uiModelAlldayColl = uiModelColl.filter(_isAllday);
  const sortedTimeEvents = uiModelColl.filter(_isNotAllday).sort(array.compare.event.asc);
  const indiceInYMD = {};
  sortedTimeEvents.forEach(timeUIModel => {
    const eventYMD = datetime_toFormat(timeUIModel.getStarts(), 'YYYYMMDD');
    let topArrayInYMD = indiceInYMD[eventYMD];

    if (isUndefined_default()(topArrayInYMD)) {
      topArrayInYMD = indiceInYMD[eventYMD] = [];
      idsOfDay[eventYMD].forEach(cid => {
        uiModelAlldayColl.doWhenHas(cid, uiModel => {
          topArrayInYMD.push(uiModel.top);
        });
      });
    }

    if (topArrayInYMD.indexOf(timeUIModel.top) >= 0) {
      const maxTopInYMD = Math.max(...topArrayInYMD) + 1;

      for (let i = 1; i <= maxTopInYMD; i += 1) {
        timeUIModel.top = i;

        if (topArrayInYMD.indexOf(timeUIModel.top) < 0) {
          break;
        }
      }
    }

    topArrayInYMD.push(timeUIModel.top);
  });
}
/**
 * Convert multi-date time event to all-day event
 * @param {Collection} uiModelColl - collection of ui models.
 * property.
 */


function _addMultiDatesInfo(uiModelColl) {
  uiModelColl.each(uiModel => {
    const {
      model
    } = uiModel;
    const start = model.getStarts();
    const end = model.getEnds();
    model.hasMultiDates = !isSameDate(start, end);

    if (!model.isAllday && model.hasMultiDates) {
      uiModel.renderStarts = toStartOfDay(start);
      uiModel.renderEnds = toEndOfDay(end);
    }
  });
}
/**
 * Find event and get ui model for specific month
 * @returns {object} ui model data
 * @param calendarData
 * @param condition
 */


function month_findByDateRange(calendarData, condition) {
  const {
    start,
    end,
    andFilters = [],
    alldayFirstMode = false
  } = condition;
  const {
    events,
    idsOfDay
  } = calendarData;
  const filterFn = Collection.and(...[getEventInDateRangeFilter(start, end)].concat(andFilters));
  const coll = events.filter(filterFn);
  const uiModelColl = convertToUIModel(coll);

  _addMultiDatesInfo(uiModelColl);

  _adjustRenderRange(start, end, uiModelColl);

  const vList = uiModelColl.sort(array.compare.event.asc);
  const usingTravelTime = false;
  const collisionGroup = getCollisionGroup(vList, usingTravelTime);
  const matrices = getMatrices(uiModelColl, collisionGroup, usingTravelTime);
  positionUIModels(start, end, matrices, _weightTopValue);

  if (alldayFirstMode) {
    _adjustTimeTopIndex(idsOfDay, uiModelColl);
  } else {
    _stackTimeFromTop(idsOfDay, uiModelColl);
  }

  return matrices;
}
;// CONCATENATED MODULE: ./src/controller/week.ts









/**********
 * TIME GRID VIEW
 **********/

/**
 * make a filter function that is not included range of start, end hour
 * @param {number} hStart - hour start
 * @param {number} hEnd - hour end
 * @returns {function} - filtering function
 */
function _makeHourRangeFilter(hStart, hEnd) {
  // eslint-disable-next-line complexity
  return uiModel => {
    const ownHourStart = uiModel.getStarts();
    const ownHourEnd = uiModel.getEnds();
    const ownHourStartTime = ownHourStart.getTime();
    const ownHourEndTime = ownHourEnd.getTime();
    const yyyy = ownHourStart.getFullYear();
    const mm = ownHourStart.getMonth();
    const dd = ownHourStart.getDate();
    const hourStart = new date_TZDate(yyyy, mm, dd).setHours(hStart);
    const hourEnd = new date_TZDate(yyyy, mm, dd).setHours(hEnd);
    return ownHourStartTime >= hourStart && ownHourStartTime < hourEnd || ownHourEndTime > hourStart && ownHourEndTime <= hourEnd || ownHourStartTime < hourStart && ownHourEndTime > hourStart || ownHourEndTime > hourEnd && ownHourStartTime < hourEnd;
  };
}
/**
 * make ui model function depending on start and end hour
 * if time view options has start or end hour condition
 * it add filter
 * @param {number} hourStart - start hour to be shown
 * @param {number} hourEnd - end hour to be shown
 * @returns {function} function
 */

function _makeGetUIModelFuncForTimeView(hourStart, hourEnd) {
  if (hourStart === 0 && hourEnd === 24) {
    return uiModelColl => {
      return uiModelColl.sort(array.compare.event.asc);
    };
  }

  return uiModelColl => {
    return uiModelColl.filter(_makeHourRangeFilter(hourStart, hourEnd)).sort(array.compare.event.asc);
  };
}
/**
 * split event model by ymd.
 * @param {IDS_OF_DAY} idsOfDay - ids of days
 * @param {TZDate} start - start date
 * @param {TZDate} end - end date
 * @param {Collection<EventUIModel>} uiModelColl - collection of ui models.
 * @returns {object.<string, Collection>} splitted event model collections.
 */

function splitEventByDateRange(idsOfDay, start, end, uiModelColl) {
  const result = {};
  const range = getDateRange(start, end);
  range.forEach(date => {
    const ymd = datetime_toFormat(date, 'YYYYMMDD');
    const ids = idsOfDay[ymd];
    const collection = result[ymd] = new Collection(event => {
      return event.cid();
    });

    if (ids && ids.length) {
      ids.forEach(id => {
        uiModelColl.doWhenHas(id, event => {
          collection.add(event);
        });
      });
    }
  }, {});
  return result;
}
/**
 * create ui model for time view part
 * @param {IDS_OF_DAY} idsOfDay - model controller
 * @param {object} condition - find options
 *  @param {TZDate} condition.start - start date.
 *  @param {TZDate} condition.end - end date.
 *  @param {Collection} condition.uiModelTimeColl - collection of ui models.
 *  @param {number} condition.hourStart - start hour to be shown
 *  @param {number} condition.hourEnd - end hour to be shown
 * @returns {object} ui model for time part.
 */

function getUIModelForTimeView(idsOfDay, condition) {
  const {
    start,
    end,
    uiModelTimeColl,
    hourStart,
    hourEnd
  } = condition;
  const ymdSplitted = splitEventByDateRange(idsOfDay, start, end, uiModelTimeColl);
  const result = {};

  const _getUIModel = _makeGetUIModelFuncForTimeView(hourStart, hourEnd);

  const usingTravelTime = true;
  Object.entries(ymdSplitted).forEach(_ref => {
    let [ymd, uiModelColl] = _ref;

    const uiModels = _getUIModel(uiModelColl);

    const collisionGroups = getCollisionGroup(uiModels, usingTravelTime);
    const matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);
    result[ymd] = matrices;
  });
  return result;
}
/**********
 * ALLDAY VIEW
 **********/

/**
 * Set hasMultiDates flag to true and set date ranges for rendering
 * @param {Collection} uiModelColl - collection of ui models.
 */

function week_addMultiDatesInfo(uiModelColl) {
  uiModelColl.each(uiModel => {
    const {
      model
    } = uiModel;
    model.hasMultiDates = true;
    uiModel.renderStarts = toStartOfDay(model.getStarts());
    uiModel.renderEnds = toEndOfDay(model.getEnds());
  });
}
/**
 * create ui model for allday view part
 * @param {TZDate} start start date.
 * @param {TZDate} end end date.
 * @param {Collection} uiModelColl - ui models of allday event.
 * @returns {DayGridEventMatrix} matrix of allday event ui models.
 */

function getUIModelForAlldayView(start, end, uiModelColl) {
  if (!uiModelColl || !uiModelColl.size) {
    return [];
  }

  week_addMultiDatesInfo(uiModelColl);

  limitRenderRange(start, end, uiModelColl);
  const uiModels = uiModelColl.sort(array.compare.event.asc);
  const usingTravelTime = true;
  const collisionGroups = getCollisionGroup(uiModels, usingTravelTime);
  const matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);
  positionUIModels(start, end, matrices);
  return matrices;
}
/**********
 * READ
 **********/

/**
 * Populate events in date range.
 * @param {CalendarData} calendarData - data store
 * @param {object} condition - find options
 *  @param {IDS_OF_DAY} condition.idsOfDay - model controller
 *  @param {TZDate} condition.start start date.
 *  @param {TZDate} condition.end end date.
 *  @param {Array.<object>} condition.panels - event panels like 'milestone', 'task', 'allday', 'time'
 *  @param {function[]} condition.[andFilters] - optional filters to applying search query
 *  @param {Object} condition.options - week view options
 * @returns {object} events grouped by dates.
 */

function week_findByDateRange(calendarData, condition) {
  var _options$hourStart, _options$hourEnd;

  const {
    start,
    end,
    panels,
    andFilters = [],
    options
  } = condition;
  const {
    events,
    idsOfDay
  } = calendarData;
  const hourStart = (_options$hourStart = options === null || options === void 0 ? void 0 : options.hourStart) !== null && _options$hourStart !== void 0 ? _options$hourStart : 0;
  const hourEnd = (_options$hourEnd = options === null || options === void 0 ? void 0 : options.hourEnd) !== null && _options$hourEnd !== void 0 ? _options$hourEnd : 24;
  const filterFn = Collection.and(...[getEventInDateRangeFilter(start, end)].concat(andFilters));
  const uiModelColl = convertToUIModel(events.filter(filterFn));
  const group = uiModelColl.groupBy(filterByCategory);
  return panels.reduce((acc, cur) => {
    const {
      name,
      type
    } = cur;

    if (type_isNil(group[name])) {
      return acc;
    }

    return { ...acc,
      [name]: type === 'daygrid' ? getUIModelForAlldayView(start, end, group[name]) : getUIModelForTimeView(idsOfDay, {
        start,
        end,
        uiModelTimeColl: group[name],
        hourStart,
        hourEnd
      })
    };
  }, {
    milestone: [],
    task: [],
    allday: [],
    time: {}
  });
}
;// CONCATENATED MODULE: ./src/utils/math.ts

function math_limit(value, minArr, maxArr) {
  const v = Math.max(value, ...minArr);
  return Math.min(v, ...maxArr);
}
/**
 * a : b = y : x;
 * ==
 * x = (b * y) / a;
 */

function ratio(a, b, y) {
  return b * y / a;
}
function isBetween(value, min, max) {
  return min <= value && value <= max;
}
;// CONCATENATED MODULE: ./src/helpers/grid.ts











const EVENT_HEIGHT = 22;
const TOTAL_WIDTH = 100;

function forEachMatrix3d(matrices, iteratee) {
  matrices.forEach(matrix => {
    matrix.forEach(row => {
      row.forEach((value, index) => {
        iteratee(value, index);
      });
    });
  });
}

function isWithinHeight(containerHeight, eventHeight) {
  return _ref => {
    let {
      top
    } = _ref;
    return containerHeight >= top * eventHeight;
  };
}
function isExceededHeight(containerHeight, eventHeight) {
  return _ref2 => {
    let {
      top
    } = _ref2;
    return containerHeight < top * eventHeight;
  };
}
function getExceedCount(uiModel, containerHeight, eventHeight) {
  return uiModel.filter(isExceededHeight(containerHeight, eventHeight)).length;
}

const getWeekendCount = row => row.filter(cell => isWeekend(cell.getDay())).length;

function getGridWidthAndLeftPercentValues(row, narrowWeekend, totalWidth) {
  const weekendCount = getWeekendCount(row);
  const gridCellCount = row.length;
  const isAllWeekend = weekendCount === gridCellCount;
  const widthPerDay = totalWidth / (narrowWeekend && !isAllWeekend ? gridCellCount * 2 - weekendCount : gridCellCount);
  const widthList = row.map(cell => {
    const day = cell.getDay();

    if (!narrowWeekend || isAllWeekend) {
      return widthPerDay;
    }

    return isWeekend(day) ? widthPerDay : widthPerDay * 2;
  });
  const leftList = widthList.reduce((acc, _, index) => index ? [...acc, acc[index - 1] + widthList[index - 1]] : [0], []);
  return {
    widthList,
    leftList
  };
}
function getWidth(widthList, start, end) {
  return widthList.reduce((acc, width, index) => {
    if (start <= index && index <= end) {
      return acc + width;
    }

    return acc;
  }, 0);
}
const isInGrid = gridDate => {
  return uiModel => {
    const eventStart = toStartOfDay(uiModel.getStarts());
    const eventEnd = toStartOfDay(uiModel.getEnds());
    return eventStart <= gridDate && gridDate <= eventEnd;
  };
};
function getGridDateIndex(date, row) {
  return row.findIndex(cell => date >= toStartOfDay(cell) && date <= toEndOfDay(cell));
}
const getLeftAndWidth = (startIndex, endIndex, row, narrowWeekend) => {
  const {
    widthList
  } = getGridWidthAndLeftPercentValues(row, narrowWeekend, TOTAL_WIDTH);
  return {
    left: !startIndex ? 0 : getWidth(widthList, 0, startIndex - 1),
    width: getWidth(widthList, startIndex !== null && startIndex !== void 0 ? startIndex : 0, endIndex < 0 ? row.length - 1 : endIndex)
  };
};
const getEventLeftAndWidth = (start, end, row, narrowWeekend) => {
  const {
    widthList
  } = getGridWidthAndLeftPercentValues(row, narrowWeekend, TOTAL_WIDTH);
  let gridStartIndex = 0;
  let gridEndIndex = row.length - 1;
  row.forEach((cell, index) => {
    if (cell <= start) {
      gridStartIndex = index;
    }

    if (cell <= end) {
      gridEndIndex = index;
    }
  });
  return {
    width: getWidth(widthList, gridStartIndex, gridEndIndex),
    left: !gridStartIndex ? 0 : getWidth(widthList, 0, gridStartIndex - 1)
  };
};

function getEventUIModelWithPosition(uiModel, row) {
  let narrowWeekend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const modelStart = uiModel.getStarts();
  const modelEnd = uiModel.getEnds();
  const {
    width,
    left
  } = getEventLeftAndWidth(modelStart, modelEnd, row, narrowWeekend);
  uiModel.width = width;
  uiModel.left = left;
  return uiModel;
}

function getRenderedEventUIModels(row, calendarData, narrowWeekend) {
  const {
    idsOfDay
  } = calendarData;
  const eventUIModels = month_findByDateRange(calendarData, {
    start: row[0],
    end: toEndOfDay(row[row.length - 1])
  });
  const idEventModelMap = [];
  forEachMatrix3d(eventUIModels, uiModel => {
    const cid = uiModel.model.cid();
    idEventModelMap[cid] = getEventUIModelWithPosition(uiModel, row, narrowWeekend);
  });
  const gridDateEventModelMap = Object.keys(idsOfDay).reduce((acc, ymd) => {
    const ids = idsOfDay[ymd];
    acc[ymd] = ids.map(cid => idEventModelMap[cid]).filter(vm => !!vm);
    return acc;
  }, {});
  return {
    uiModels: Object.values(idEventModelMap),
    gridDateEventModelMap
  };
}

const getDayGridEventModels = function (eventModels, row) {
  let narrowWeekend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  forEachMatrix3d(eventModels, uiModel => {
    const modelStart = uiModel.getStarts();
    const modelEnd = uiModel.getEnds();
    const {
      width,
      left
    } = getEventLeftAndWidth(modelStart, modelEnd, row, narrowWeekend);
    uiModel.width = width;
    uiModel.left = left;
    uiModel.top += 1;
  });
  return flattenMatrix3d(eventModels);
};

const getModels = models => models.filter(model => !!model);

function flattenMatrix3d(matrices) {
  return matrices.flatMap(matrix => matrix.flatMap(models => getModels(models)));
} // TODO: Check it works well when the `narrowWeekend` option is true


const getTimeGridEventModels = eventMatrix => // NOTE: there are same ui models in different rows. so we need to get unique ui models.
Array.from(new Set(Object.values(eventMatrix).reduce((result, matrix3d) => result.concat(...flattenMatrix3d(matrix3d)), [])));

const getWeekViewEvents = (row, calendarData, _ref3) => {
  let {
    narrowWeekend,
    hourStart,
    hourEnd,
    weekStartDate,
    weekEndDate
  } = _ref3;
  const panels = [{
    name: 'milestone',
    type: 'daygrid',
    show: true
  }, {
    name: 'task',
    type: 'daygrid',
    show: true
  }, {
    name: 'allday',
    type: 'daygrid',
    show: true
  }, {
    name: 'time',
    type: 'timegrid',
    show: true
  }];
  const eventModels = week_findByDateRange(calendarData, {
    start: weekStartDate,
    end: weekEndDate,
    panels,
    andFilters: [],
    options: {
      hourStart,
      hourEnd
    }
  });
  return Object.keys(eventModels).reduce((acc, cur) => {
    const events = eventModels[cur];
    return { ...acc,
      [cur]: Array.isArray(events) ? getDayGridEventModels(events, row, narrowWeekend) : getTimeGridEventModels(events)
    };
  }, {
    milestone: [],
    allday: [],
    task: [],
    time: []
  });
};
function createDateMatrixOfMonth(renderTargetDate, _ref4) {
  let {
    workweek = false,
    visibleWeeksCount = 0,
    startDayOfWeek = 0,
    isAlways6Weeks = true
  } = _ref4;
  const targetDate = new date_TZDate(renderTargetDate);
  const shouldApplyVisibleWeeksCount = visibleWeeksCount > 0;
  const baseDate = shouldApplyVisibleWeeksCount ? targetDate : toStartOfMonth(targetDate);
  const firstDateOfMatrix = subtractDate(baseDate, baseDate.getDay() - startDayOfWeek + (baseDate.getDay() < startDayOfWeek ? WEEK_DAYS : 0));
  const dayOfFirstDateOfMatrix = firstDateOfMatrix.getDay();
  const totalDatesCountOfMonth = toEndOfMonth(targetDate).getDate();
  const initialDifference = getDateDifference(firstDateOfMatrix, baseDate);
  const totalDatesOfMatrix = totalDatesCountOfMonth + Math.abs(initialDifference);
  let totalWeeksOfMatrix = DEFAULT_VISIBLE_WEEKS;

  if (shouldApplyVisibleWeeksCount) {
    totalWeeksOfMatrix = visibleWeeksCount;
  } else if (isAlways6Weeks === false) {
    totalWeeksOfMatrix = Math.ceil(totalDatesOfMatrix / WEEK_DAYS);
  }

  return range_default()(0, totalWeeksOfMatrix).map(weekIndex => range_default()(0, WEEK_DAYS).reduce((weekRow, dayOfWeek) => {
    const steps = weekIndex * WEEK_DAYS + dayOfWeek;
    const currentDay = (steps + dayOfFirstDateOfMatrix) % WEEK_DAYS;

    if (!workweek || workweek && !isWeekend(currentDay)) {
      const date = addDate(firstDateOfMatrix, steps);
      weekRow.push(date);
    }

    return weekRow;
  }, []));
}
function getWeekDates(renderDate, _ref5) {
  let {
    startDayOfWeek = Day.SUN,
    workweek
  } = _ref5;
  const now = toStartOfDay(renderDate);
  const nowDay = now.getDay();
  const prevDateCount = nowDay - startDayOfWeek;
  const weekDayList = prevDateCount >= 0 ? range_default()(-prevDateCount, WEEK_DAYS - prevDateCount) : range_default()(-WEEK_DAYS - prevDateCount, -prevDateCount);
  return weekDayList.reduce((acc, day) => {
    const date = addDate(now, day);

    if (workweek && isWeekend(date.getDay())) {
      return acc;
    }

    acc.push(date);
    return acc;
  }, []);
} // @TODO: replace `getRowStyleInfo` to this function

function getColumnsData(datesOfWeek) {
  let narrowWeekend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const datesCount = datesOfWeek.length;
  const shouldApplyNarrowWeekend = datesCount > 5 && narrowWeekend;
  const defaultWidthByColumns = shouldApplyNarrowWeekend ? 100 / (datesCount - 1) : 100 / datesCount;
  return datesOfWeek.map(date => {
    const width = shouldApplyNarrowWeekend && isWeekend(date.getDay()) ? defaultWidthByColumns / 2 : defaultWidthByColumns;
    return {
      date,
      width
    };
  }).reduce((result, currentDateAndWidth, index) => {
    const prev = result[index - 1];
    result.push({ ...currentDateAndWidth,
      left: index === 0 ? 0 : prev.left + prev.width
    });
    return result;
  }, []);
}
function createTimeGridData(datesOfWeek, options) {
  var _options$narrowWeeken;

  const columns = getColumnsData(datesOfWeek, (_options$narrowWeeken = options.narrowWeekend) !== null && _options$narrowWeeken !== void 0 ? _options$narrowWeeken : false);
  const steps = (options.hourEnd - options.hourStart) * 2;
  const baseHeight = 100 / steps;
  const rows = range_default()(steps).map((step, index) => {
    const isOdd = index % 2 === 1;
    const hour = options.hourStart + Math.floor(step / 2);
    const startTime = "".concat(hour, ":").concat(isOdd ? '30' : '00').padStart(5, '0');
    const endTime = (isOdd ? "".concat(hour + 1, ":00") : "".concat(hour, ":30")).padStart(5, '0');
    return {
      top: baseHeight * index,
      height: baseHeight,
      startTime,
      endTime
    };
  });
  return {
    columns,
    rows
  };
}

function getRelativeMousePosition(_ref6, _ref7) {
  let {
    clientX,
    clientY
  } = _ref6;
  let {
    left,
    top,
    clientLeft,
    clientTop
  } = _ref7;
  return [clientX - left - clientLeft, clientY - top - clientTop];
}

function getIndexFromPosition(arrayLength, maxRange, currentPosition) {
  const calculatedIndex = Math.floor(ratio(maxRange, arrayLength, currentPosition));
  return math_limit(calculatedIndex, [0], [arrayLength - 1]);
}

function createGridPositionFinder(_ref8) {
  let {
    rowsCount,
    columnsCount,
    container,
    narrowWeekend = false,
    startDayOfWeek = Day.SUN
  } = _ref8;

  if (type_isNil(container)) {
    return () => null;
  }

  const dayRange = range_default()(startDayOfWeek, startDayOfWeek + columnsCount).map(day => day % WEEK_DAYS);
  const narrowColumnCount = narrowWeekend ? dayRange.filter(day => isWeekend(day)).length : 0;
  return function gridPositionFinder(mousePosition) {
    const {
      left: containerLeft,
      top: containerTop,
      width: containerWidth,
      height: containerHeight
    } = container.getBoundingClientRect();
    const [left, top] = getRelativeMousePosition(mousePosition, {
      left: containerLeft,
      top: containerTop,
      clientLeft: container.clientLeft,
      clientTop: container.clientTop
    });

    if (left < 0 || top < 0 || left > containerWidth || top > containerHeight) {
      return null;
    }

    const unitWidth = narrowWeekend ? containerWidth / (columnsCount - narrowColumnCount + 1) : containerWidth / columnsCount;
    const columnWidthList = dayRange.map(dayOfWeek => narrowWeekend && isWeekend(dayOfWeek) ? unitWidth / 2 : unitWidth);
    const columnLeftList = [];
    columnWidthList.forEach((width, index) => {
      if (index === 0) {
        columnLeftList.push(0);
      } else {
        columnLeftList.push(columnLeftList[index - 1] + columnWidthList[index - 1]);
      }
    });
    const columnIndex = findLastIndex(columnLeftList, columnLeft => left >= columnLeft);
    return {
      columnIndex,
      rowIndex: getIndexFromPosition(rowsCount, containerHeight, top)
    };
  };
}
;// CONCATENATED MODULE: ./src/components/dayGridCommon/gridSelection.tsx





function commonGridSelectionSelector(theme) {
  return theme.common.gridSelection;
}

function GridSelection(_ref) {
  let {
    type,
    gridSelectionData,
    weekDates,
    narrowWeekend
  } = _ref;
  const {
    backgroundColor,
    border
  } = useTheme(commonGridSelectionSelector);
  const {
    startCellIndex,
    endCellIndex
  } = gridSelectionData;
  const {
    left,
    width
  } = getLeftAndWidth(Math.min(startCellIndex, endCellIndex), Math.max(startCellIndex, endCellIndex), weekDates, narrowWeekend);
  const style = {
    left: toPercent(left),
    width: toPercent(width),
    height: toPercent(100),
    backgroundColor,
    border
  };
  return width > 0 ? h("div", {
    className: cls(type, 'grid-selection'),
    style: style
  }) : null;
}
;// CONCATENATED MODULE: ./src/helpers/gridSelection.ts




function createSortedGridSelection(initPos, currentPos, isReversed) {
  return {
    startColumnIndex: isReversed ? currentPos.columnIndex : initPos.columnIndex,
    startRowIndex: isReversed ? currentPos.rowIndex : initPos.rowIndex,
    endColumnIndex: isReversed ? initPos.columnIndex : currentPos.columnIndex,
    endRowIndex: isReversed ? initPos.rowIndex : currentPos.rowIndex
  };
}

function calculateTimeGridSelectionByCurrentIndex(timeGridSelection, columnIndex, maxRowIndex) {
  if (type_isNil(timeGridSelection)) {
    return null;
  }

  const {
    startColumnIndex,
    endColumnIndex,
    endRowIndex,
    startRowIndex
  } = timeGridSelection;

  if (!isBetween(columnIndex, startColumnIndex, endColumnIndex)) {
    return null;
  }

  const hasMultipleColumns = startColumnIndex !== endColumnIndex;
  const isStartingColumn = columnIndex === startColumnIndex;
  const resultGridSelection = {
    startRowIndex,
    endRowIndex,
    isSelectingMultipleColumns: hasMultipleColumns,
    isStartingColumn
  };

  if (startColumnIndex < columnIndex && columnIndex < endColumnIndex) {
    resultGridSelection.startRowIndex = 0;
    resultGridSelection.endRowIndex = maxRowIndex;
  } else if (startColumnIndex !== endColumnIndex) {
    if (startColumnIndex === columnIndex) {
      resultGridSelection.endRowIndex = maxRowIndex;
    } else if (endColumnIndex === columnIndex) {
      resultGridSelection.startRowIndex = 0;
    }
  }

  return resultGridSelection;
}

const timeGridSelectionHelper = {
  sortSelection: (initPos, currentPos) => {
    const isReversed = initPos.columnIndex > currentPos.columnIndex || initPos.columnIndex === currentPos.columnIndex && initPos.rowIndex > currentPos.rowIndex;
    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  getDateFromCollection: (dateCollection, gridSelection) => {
    const timeGridData = dateCollection;
    const startDate = setTimeStrToDate(timeGridData.columns[gridSelection.startColumnIndex].date, timeGridData.rows[gridSelection.startRowIndex].startTime);
    const endDate = setTimeStrToDate(timeGridData.columns[gridSelection.endColumnIndex].date, timeGridData.rows[gridSelection.endRowIndex].endTime);
    return [startDate, endDate];
  },
  calculateSelection: calculateTimeGridSelectionByCurrentIndex
};

function calculateDayGridMonthSelectionByCurrentIndex(gridSelection, currentIndex, weekLength) {
  if (!(isPresent(gridSelection) && isPresent(currentIndex) && isPresent(weekLength))) {
    return null;
  }

  const {
    startRowIndex,
    startColumnIndex,
    endRowIndex,
    endColumnIndex
  } = gridSelection;

  if (!isBetween(currentIndex, Math.min(startRowIndex, endRowIndex), Math.max(startRowIndex, endRowIndex))) {
    return null;
  }

  let startCellIndex = startColumnIndex;
  let endCellIndex = endColumnIndex;

  if (startRowIndex < currentIndex) {
    startCellIndex = 0;
  }

  if (endRowIndex > currentIndex) {
    endCellIndex = weekLength - 1;
  }

  return {
    startCellIndex,
    endCellIndex
  };
}

const dayGridMonthSelectionHelper = {
  sortSelection: (initPos, currentPos) => {
    const isReversed = initPos.rowIndex > currentPos.rowIndex || initPos.rowIndex === currentPos.rowIndex && initPos.columnIndex > currentPos.columnIndex;
    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  getDateFromCollection: (dateCollection, gridSelection) => {
    const dateMatrix = dateCollection;
    return [dateMatrix[gridSelection.startRowIndex][gridSelection.startColumnIndex], dateMatrix[gridSelection.endRowIndex][gridSelection.endColumnIndex]];
  },
  calculateSelection: calculateDayGridMonthSelectionByCurrentIndex
};

function calculateAlldayGridRowSelectionByCurrentIndex(gridSelection) {
  return isPresent(gridSelection) ? {
    startCellIndex: gridSelection.startColumnIndex,
    endCellIndex: gridSelection.endColumnIndex
  } : null;
}

const alldayGridRowSelectionHelper = {
  sortSelection: (initPos, currentPos) => {
    const isReversed = initPos.columnIndex > currentPos.columnIndex;
    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  getDateFromCollection: (dateCollection, gridSelection) => {
    const weekDates = dateCollection;
    return [weekDates[gridSelection.startColumnIndex], weekDates[gridSelection.endColumnIndex]];
  },
  calculateSelection: calculateAlldayGridRowSelectionByCurrentIndex
};
;// CONCATENATED MODULE: ./src/components/dayGridWeek/alldayGridSelection.tsx






function dayGridWeekSelectionSelector(state) {
  return alldayGridRowSelectionHelper.calculateSelection(state.gridSelection.dayGridWeek);
}

function AlldayGridSelection(_ref) {
  let {
    weekDates,
    narrowWeekend
  } = _ref;
  const calculatedGridSelection = useStore(dayGridWeekSelectionSelector);

  if (type_isNil(calculatedGridSelection)) {
    return null;
  }

  return h(GridSelection, {
    type: "allday",
    gridSelectionData: calculatedGridSelection,
    weekDates: weekDates,
    narrowWeekend: narrowWeekend
  });
}
;// CONCATENATED MODULE: ../../node_modules/preact/compat/dist/compat.module.js
function compat_module_S(n,t){for(var e in t)n[e]=t[e];return n}function compat_module_C(n,t){for(var e in n)if("__source"!==e&&!(e in t))return!0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return!0;return!1}function compat_module_E(n){this.props=n}function compat_module_g(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return!r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:compat_module_C(this.props,n)}function r(t){return this.shouldComponentUpdate=e,h(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(compat_module_E.prototype=new d).isPureReactComponent=!0,compat_module_E.prototype.shouldComponentUpdate=function(n,t){return compat_module_C(this.props,n)||compat_module_C(this.state,t)};var compat_module_w=preact_module_l.__b;preact_module_l.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),compat_module_w&&compat_module_w(n)};var compat_module_x="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function compat_module_R(n){function t(t){var e=compat_module_S({},t);return delete e.ref,n(e,t.ref||null)}return t.$$typeof=compat_module_x,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var compat_module_N=function(n,t){return null==n?null:x(x(n).map(t))},compat_module_k={map:compat_module_N,forEach:compat_module_N,count:function(n){return n?x(n).length:0},only:function(n){var t=x(n);if(1!==t.length)throw"Children.only";return t[0]},toArray:x},compat_module_A=preact_module_l.__e;preact_module_l.__e=function(n,t,e,r){if(n.then)for(var u,o=t;o=o.__;)if((u=o.__c)&&u.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),u.__c(n,t);compat_module_A(n,t,e,r)};var compat_module_O=preact_module_l.unmount;function compat_module_T(){this.__u=0,this.t=null,this.__b=null}function compat_module_L(n){var t=n.__.__c;return t&&t.__a&&t.__a(n)}function compat_module_U(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n},function(n){r=n}),r)throw r;if(!e)throw t;return h(e,u)}return u.displayName="Lazy",u.__f=!0,u}function compat_module_D(){this.u=null,this.o=null}preact_module_l.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&!0===n.__h&&(n.type=null),compat_module_O&&compat_module_O(n)},(compat_module_T.prototype=new d).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=compat_module_L(r.__v),o=!1,i=function(){o||(o=!0,e.__R=null,u?u(l):l())};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__a){var n=r.state.__a;r.__v.__k[0]=function n(t,e,r){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)}),t.__c&&t.__c.__P===e&&(t.__e&&r.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=r)),t}(n,n.__c.__P,n.__c.__O)}var t;for(r.setState({__a:r.__b=null});t=r.t.pop();)t.forceUpdate()}},f=!0===t.__h;r.__u++||f||r.setState({__a:r.__b=r.__v.__k[0]}),n.then(i,i)},compat_module_T.prototype.componentWillUnmount=function(){this.t=[]},compat_module_T.prototype.render=function(n,t){if(this.__b){if(this.__v.__k){var e=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function n(t,e,r){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c()}),t.__c.__H=null),null!=(t=compat_module_S({},t)).__c&&(t.__c.__P===r&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)})),t}(this.__b,e,r.__O=r.__P)}this.__b=null}var u=t.__a&&h(p,null,n.fallback);return u&&(u.__h=null),[h(p,null,t.__a?null:n.children),u]};var compat_module_F=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2]}};function compat_module_I(n){return this.getChildContext=function(){return n.context},n.children}function compat_module_M(n){var t=this,e=n.i;t.componentWillUnmount=function(){P(null,t.l),t.l=null,t.i=null},t.i&&t.i!==e&&t.componentWillUnmount(),n.__v?(t.l||(t.i=e,t.l={nodeType:1,parentNode:e,childNodes:[],appendChild:function(n){this.childNodes.push(n),t.i.appendChild(n)},insertBefore:function(n,e){this.childNodes.push(n),t.i.appendChild(n)},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),t.i.removeChild(n)}}),P(h(compat_module_I,{context:t.context},n.__v),t.l)):t.l&&t.componentWillUnmount()}function compat_module_V(n,t){var e=h(compat_module_M,{__v:n,i:t});return e.containerInfo=t,e}(compat_module_D.prototype=new d).__a=function(n){var t=this,e=compat_module_L(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),compat_module_F(t,n,r)):u()};e?e(o):o()}},compat_module_D.prototype.render=function(n){this.u=null,this.o=new Map;var t=x(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},compat_module_D.prototype.componentDidUpdate=compat_module_D.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){compat_module_F(n,e,t)})};var compat_module_W="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,compat_module_P=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|shape|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,compat_module_$="undefined"!=typeof document,compat_module_j=function(n){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function compat_module_z(n,t,e){return null==t.__k&&(t.textContent=""),P(n,t),"function"==typeof e&&e(),n?n.__c:null}function compat_module_B(n,t,e){return S(n,t),"function"==typeof e&&e(),n?n.__c:null}d.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(d.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t})}})});var compat_module_H=preact_module_l.event;function compat_module_Z(){}function compat_module_Y(){return this.cancelBubble}function compat_module_q(){return this.defaultPrevented}preact_module_l.event=function(n){return compat_module_H&&(n=compat_module_H(n)),n.persist=compat_module_Z,n.isPropagationStopped=compat_module_Y,n.isDefaultPrevented=compat_module_q,n.nativeEvent=n};var compat_module_G,compat_module_J={configurable:!0,get:function(){return this.class}},compat_module_K=preact_module_l.vnode;preact_module_l.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){var u=-1===t.indexOf("-");for(var o in r={},e){var i=e[o];compat_module_$&&"children"===o&&"noscript"===t||"value"===o&&"defaultValue"in e&&null==i||("defaultValue"===o&&"value"in e&&null==e.value?o="value":"download"===o&&!0===i?i="":/ondoubleclick/i.test(o)?o="ondblclick":/^onchange(textarea|input)/i.test(o+t)&&!compat_module_j(e.type)?o="oninput":/^onfocus$/i.test(o)?o="onfocusin":/^onblur$/i.test(o)?o="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o)?o=o.toLowerCase():u&&compat_module_P.test(o)?o=o.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===i&&(i=void 0),/^oninput$/i.test(o)&&(o=o.toLowerCase(),r[o]&&(o="oninputCapture")),r[o]=i)}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=x(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value)})),"select"==t&&null!=r.defaultValue&&(r.value=x(e.children).forEach(function(n){n.props.selected=r.multiple?-1!=r.defaultValue.indexOf(n.props.value):r.defaultValue==n.props.value})),n.props=r,e.class!=e.className&&(compat_module_J.enumerable="className"in e,null!=e.className&&(r.class=e.className),Object.defineProperty(r,"className",compat_module_J))}n.$$typeof=compat_module_W,compat_module_K&&compat_module_K(n)};var compat_module_Q=preact_module_l.__r;preact_module_l.__r=function(n){compat_module_Q&&compat_module_Q(n),compat_module_G=n.__c};var compat_module_X={ReactCurrentDispatcher:{current:{readContext:function(n){return compat_module_G.__n[n.__c].props.value}}}},compat_module_nn="17.0.2";function compat_module_tn(n){return h.bind(null,n)}function compat_module_en(n){return!!n&&n.$$typeof===compat_module_W}function compat_module_rn(n){return compat_module_en(n)?q.apply(null,arguments):n}function compat_module_un(n){return!!n.__k&&(P(null,n),!0)}function compat_module_on(n){return n&&(n.base||1===n.nodeType&&n)||null}var compat_module_ln=function(n,t){return n(t)},compat_module_fn=function(n,t){return n(t)},compat_module_cn=p;function compat_module_an(n){n()}function compat_module_sn(n){return n}function hn(){return[!1,compat_module_an]}var compat_module_vn=hooks_module_h;function compat_module_dn(t,r){var u=hooks_module_y(r),o=u[0],i=u[1];return hooks_module_(function(){return t(function(){i(r())})},[t,r]),o}/* harmony default export */ var compat_module = ({useState:hooks_module_y,useReducer:hooks_module_d,useEffect:hooks_module_,useLayoutEffect:hooks_module_h,useInsertionEffect:hooks_module_h,useTransition:hn,useDeferredValue:compat_module_sn,useSyncExternalStore:compat_module_dn,startTransition:compat_module_an,useRef:hooks_module_s,useImperativeHandle:hooks_module_A,useMemo:F,useCallback:hooks_module_T,useContext:hooks_module_q,useDebugValue:hooks_module_x,version:"17.0.2",Children:compat_module_k,render:compat_module_z,hydrate:compat_module_B,unmountComponentAtNode:compat_module_un,createPortal:compat_module_V,createElement:h,createContext:B,createFactory:compat_module_tn,cloneElement:compat_module_rn,createRef:y,Fragment:p,isValidElement:compat_module_en,findDOMNode:compat_module_on,Component:d,PureComponent:compat_module_E,memo:compat_module_g,forwardRef:compat_module_R,flushSync:compat_module_fn,unstable_batchedUpdates:compat_module_ln,StrictMode:p,Suspense:compat_module_T,SuspenseList:compat_module_D,lazy:compat_module_U,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:compat_module_X});
//# sourceMappingURL=compat.module.js.map

;// CONCATENATED MODULE: ./src/components/dayGridWeek/gridCell.tsx






function ExceedCount(_ref) {
  let {
    index,
    exceedCount,
    isClicked,
    onClickExceedCount
  } = _ref;

  const clickExceedCount = () => onClickExceedCount(index);

  const style = {
    display: isClicked ? 'none' : ''
  };
  return exceedCount && !isClicked ? h("span", {
    className: cls('weekday-exceed-in-week'),
    onClick: clickExceedCount,
    style: style
  }, h(Template, {
    template: "weekGridFooterExceed",
    param: exceedCount
  })) : null;
}

function CollapseButton(_ref2) {
  let {
    isClicked,
    isClickedIndex,
    onClickCollapseButton
  } = _ref2;
  return isClicked && isClickedIndex ? h("span", {
    className: cls('weekday-exceed-in-week'),
    onClick: onClickCollapseButton
  }, h(Template, {
    template: "collapseBtnTitle"
  })) : null;
}

function GridCell(_ref3) {
  let {
    width,
    left,
    index,
    exceedCount,
    isClicked,
    onClickExceedCount,
    isClickedIndex,
    onClickCollapseButton,
    isLastCell
  } = _ref3;
  const {
    borderRight,
    backgroundColor
  } = useTheme(hooks_module_T(theme => theme.week.dayGrid, []));
  const style = {
    width,
    left,
    borderRight: isLastCell ? 'none' : borderRight,
    backgroundColor
  };
  return h("div", {
    className: cls('panel-grid'),
    style: style
  }, h(ExceedCount, {
    index: index,
    exceedCount: exceedCount,
    isClicked: isClicked,
    onClickExceedCount: onClickExceedCount
  }), h(CollapseButton, {
    isClickedIndex: isClickedIndex,
    isClicked: isClicked,
    onClickCollapseButton: onClickCollapseButton
  }));
}
;// CONCATENATED MODULE: ./src/components/dayGridWeek/gridCells.tsx





const GridCells = compat_module_g(function GridCells(_ref) {
  let {
    uiModels,
    weekDates,
    narrowWeekend,
    height,
    clickedIndex,
    isClickedCount,
    onClickExceedCount,
    onClickCollapseButton
  } = _ref;
  // @TODO: get margin value dynamically
  const eventTopMargin = 2;
  const {
    widthList,
    leftList
  } = getGridWidthAndLeftPercentValues(weekDates, narrowWeekend, TOTAL_WIDTH);
  const lastCellIndex = weekDates.length - 1;
  return h(p, null, weekDates.map((cell, index) => {
    const width = toPercent(widthList[index]);
    const left = toPercent(leftList[index]);
    const uiModelsInCell = uiModels.filter(isInGrid(cell));
    const exceedCount = getExceedCount(uiModelsInCell, height, EVENT_HEIGHT + eventTopMargin);
    const isClickedIndex = index === clickedIndex;
    const isLastCell = index === lastCellIndex;
    return h(GridCell, {
      key: "panel-grid-".concat(cell.getDate()),
      width: width,
      left: left,
      index: index,
      exceedCount: exceedCount,
      isClicked: isClickedCount,
      onClickExceedCount: onClickExceedCount,
      isClickedIndex: isClickedIndex,
      onClickCollapseButton: onClickCollapseButton,
      isLastCell: isLastCell
    });
  }));
});
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.unscopables.flat.js
var es_array_unscopables_flat = __webpack_require__(7694);
;// CONCATENATED MODULE: ./src/components/events/horizontalEventResizeIcon.tsx


function HorizontalEventResizeIcon(_ref) {
  let {
    onMouseDown
  } = _ref;
  return h("span", {
    className: "".concat(cls('weekday-resize-handle'), " ").concat(cls('handle-y')),
    onMouseDown: onMouseDown,
    "data-testid": "horizontal-event-resize-icon"
  }, h("i", {
    className: "".concat(cls('icon'), " ").concat(cls('ic-handle-y'))
  }));
}
;// CONCATENATED MODULE: ./src/contexts/layoutContainer.tsx




const LayoutContainerContext = B(null);
const LayoutContainerProvider = LayoutContainerContext.Provider;
const useLayoutContainer = () => {
  const ref = hooks_module_q(LayoutContainerContext);

  if (isUndefined_default()(ref)) {
    throw new Error('LayoutContainerProvider is not found');
  }

  return ref;
};
;// CONCATENATED MODULE: ./src/helpers/drag.ts
const DRAGGING_TYPE_CONSTANTS = {
  panelResizer: 'panelResizer'
};
const DRAGGING_TYPE_CREATORS = {
  resizeEvent: (area, id) => "event/".concat(area, "/resize/").concat(id),
  moveEvent: (area, id) => "event/".concat(area, "/move/").concat(id),
  gridSelection: type => "gridSelection/".concat(type)
};
;// CONCATENATED MODULE: ./src/hooks/calendar/useCalendarById.ts


function useCalendarById(calendarId) {
  return useStore(hooks_module_T(state => state.calendar.calendars.find(cal => cal.id === calendarId), [calendarId]));
}
;// CONCATENATED MODULE: ./src/hooks/calendar/useCalendarColor.ts


function useCalendarColor(model) {
  var _model$calendarId;

  const calendar = useCalendarById((_model$calendarId = model === null || model === void 0 ? void 0 : model.calendarId) !== null && _model$calendarId !== void 0 ? _model$calendarId : null);
  return F(() => ({
    color: calendar === null || calendar === void 0 ? void 0 : calendar.color,
    borderColor: calendar === null || calendar === void 0 ? void 0 : calendar.borderColor,
    backgroundColor: calendar === null || calendar === void 0 ? void 0 : calendar.backgroundColor,
    dragBackgroundColor: calendar === null || calendar === void 0 ? void 0 : calendar.dragBackgroundColor
  }), [calendar]);
}
;// CONCATENATED MODULE: ./src/constants/keyboard.ts
let KEY;

(function (KEY) {
  KEY["ESCAPE"] = "Escape";
})(KEY || (KEY = {}));

const KEYCODE = {
  [KEY.ESCAPE]: 27
};
;// CONCATENATED MODULE: ./src/constants/mouse.ts
const MINIMUM_DRAG_MOUSE_DISTANCE = 3;
;// CONCATENATED MODULE: ./src/hooks/common/useTransientUpdate.ts


// Transient Updates for better performance
// Reference: https://github.com/pmndrs/zustand#transient-updates-for-often-occuring-state-changes
function useTransientUpdate(selector, subscriber) {
  const store = useInternalStore();
  const selectorRef = hooks_module_s(selector);
  const subscriberRef = hooks_module_s(subscriber);
  hooks_module_(() => {
    selectorRef.current = selector;
    subscriberRef.current = subscriber;
  }, [selector, subscriber]);
  hooks_module_(() => store.subscribe(slice => subscriberRef.current(slice), state => selectorRef.current(state)), [selector, store]);
}
;// CONCATENATED MODULE: ./src/utils/keyboard.ts

function isKeyPressed(e, key) {
  return e.key ? e.key === key : e.keyCode === KEYCODE[key];
}
;// CONCATENATED MODULE: ./src/hooks/common/useDrag.ts












function isLeftClick(buttonNum) {
  return buttonNum === 0;
}

function isMouseMoved(initX, initY, x, y) {
  return Math.abs(initX - x) >= MINIMUM_DRAG_MOUSE_DISTANCE || Math.abs(initY - y) >= MINIMUM_DRAG_MOUSE_DISTANCE;
}

function useDrag(draggingItemType) {
  let {
    onInit,
    onDragStart,
    onDrag,
    onMouseUp,
    onPressESCKey
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    initDrag,
    setDragging,
    cancelDrag,
    reset
  } = useDispatch('dnd');
  const store = useInternalStore();
  const dndSliceRef = hooks_module_s(store.getState().dnd);
  useTransientUpdate(dndSelector, dndState => {
    dndSliceRef.current = dndState;
  });
  const [isStarted, setStarted] = hooks_module_y(false);
  const handleMouseMoveRef = hooks_module_s(null);
  const handleMouseUpRef = hooks_module_s(null);
  const handleKeyDownRef = hooks_module_s(null);
  const handleMouseDown = hooks_module_T(e => {
    if (!isLeftClick(e.button)) {
      return;
    }

    if (e.currentTarget) {
      e.currentTarget.ondragstart = function () {
        return false;
      };
    } // prevent text selection on dragging


    e.preventDefault();
    setStarted(true);
    initDrag({
      draggingItemType,
      initX: e.clientX,
      initY: e.clientY
    });
    onInit === null || onInit === void 0 ? void 0 : onInit(e, dndSliceRef.current);
  }, [onInit, draggingItemType, initDrag]);
  const handleMouseMove = hooks_module_T(e => {
    const {
      initX,
      initY,
      draggingState,
      draggingItemType: currentDraggingItemType
    } = dndSliceRef.current;

    if (currentDraggingItemType !== draggingItemType) {
      setStarted(false);
      reset();
      return;
    }

    if (isPresent(initX) && isPresent(initY) && !isMouseMoved(initX, initY, e.clientX, e.clientY)) {
      return;
    }

    if (draggingState <= DraggingState.INIT) {
      setDragging({
        x: e.clientX,
        y: e.clientY
      });
      onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(e, dndSliceRef.current);
      return;
    }

    setDragging({
      x: e.clientX,
      y: e.clientY
    });
    onDrag === null || onDrag === void 0 ? void 0 : onDrag(e, dndSliceRef.current);
  }, [draggingItemType, onDrag, onDragStart, setDragging, reset]);
  const handleMouseUp = hooks_module_T(e => {
    e.stopPropagation();

    if (isStarted) {
      onMouseUp === null || onMouseUp === void 0 ? void 0 : onMouseUp(e, dndSliceRef.current);
      setStarted(false);
      reset();
    }
  }, [isStarted, onMouseUp, reset]);
  const handleKeyDown = hooks_module_T(e => {
    if (isKeyPressed(e, KEY.ESCAPE)) {
      setStarted(false);
      cancelDrag();
      onPressESCKey === null || onPressESCKey === void 0 ? void 0 : onPressESCKey(e, dndSliceRef.current);
    }
  }, [onPressESCKey, cancelDrag]);
  hooks_module_(() => {
    handleMouseMoveRef.current = handleMouseMove;
    handleMouseUpRef.current = handleMouseUp;
    handleKeyDownRef.current = handleKeyDown;
  }, [handleKeyDown, handleMouseMove, handleMouseUp]);
  hooks_module_(() => {
    const wrappedHandleMouseMove = e => {
      var _handleMouseMoveRef$c;

      return (_handleMouseMoveRef$c = handleMouseMoveRef.current) === null || _handleMouseMoveRef$c === void 0 ? void 0 : _handleMouseMoveRef$c.call(handleMouseMoveRef, e);
    };

    const wrappedHandleMouseUp = e => {
      var _handleMouseUpRef$cur;

      return (_handleMouseUpRef$cur = handleMouseUpRef.current) === null || _handleMouseUpRef$cur === void 0 ? void 0 : _handleMouseUpRef$cur.call(handleMouseUpRef, e);
    };

    const wrappedHandleKeyDown = e => {
      var _handleKeyDownRef$cur;

      return (_handleKeyDownRef$cur = handleKeyDownRef.current) === null || _handleKeyDownRef$cur === void 0 ? void 0 : _handleKeyDownRef$cur.call(handleKeyDownRef, e);
    };

    if (isStarted) {
      document.addEventListener('mousemove', wrappedHandleMouseMove);
      document.addEventListener('mouseup', wrappedHandleMouseUp);
      document.addEventListener('keydown', wrappedHandleKeyDown);
      return () => {
        document.removeEventListener('mousemove', wrappedHandleMouseMove);
        document.removeEventListener('mouseup', wrappedHandleMouseUp);
        document.removeEventListener('keydown', wrappedHandleKeyDown);
      };
    }

    return noop;
  }, [isStarted, reset]);
  return handleMouseDown;
}
;// CONCATENATED MODULE: ./src/utils/preact.ts
/**
 * Pass the prop to component conditionally.
 * just passing `undefined` violates the ESLint rule, and it's less readable.
 * So let's use this function to pass the conditional prop.
 */
function passConditionalProp(condition, prop) {
  // eslint-disable-next-line no-undefined
  return condition ? prop : undefined;
}
;// CONCATENATED MODULE: ./src/components/events/horizontalEvent.tsx




















function getMargins(flat) {
  return {
    vertical: flat ? 5 : 2,
    horizontal: 8
  };
}

function getBorderRadius(exceedLeft, exceedRight) {
  const leftBorderRadius = exceedLeft ? 0 : '2px';
  const rightBorderRadius = exceedRight ? 0 : '2px';
  return "".concat(leftBorderRadius, " ").concat(rightBorderRadius, " ").concat(rightBorderRadius, " ").concat(leftBorderRadius);
}

function getEventItemStyle(_ref) {
  let {
    uiModel,
    flat,
    eventHeight,
    isDraggingTarget,
    calendarColor
  } = _ref;
  const {
    exceedLeft,
    exceedRight
  } = uiModel;
  const {
    color,
    backgroundColor,
    dragBackgroundColor,
    borderColor
  } = getEventColors(uiModel, calendarColor);
  const defaultItemStyle = {
    color,
    backgroundColor: isDraggingTarget ? dragBackgroundColor : backgroundColor,
    borderLeft: exceedLeft ? 'none' : "3px solid ".concat(borderColor),
    borderRadius: getBorderRadius(exceedLeft, exceedRight),
    overflow: 'hidden',
    height: eventHeight,
    lineHeight: toPx(eventHeight),
    opacity: isDraggingTarget ? 0.5 : 1
  };
  const margins = getMargins(flat);
  return flat ? {
    marginTop: margins.vertical,
    ...defaultItemStyle
  } : {
    marginLeft: exceedLeft ? 0 : margins.horizontal,
    marginRight: exceedRight ? 0 : margins.horizontal,
    ...defaultItemStyle
  };
}

function getContainerStyle(_ref2) {
  let {
    flat,
    uiModel,
    resizingWidth,
    movingLeft,
    eventHeight,
    headerHeight
  } = _ref2;
  const {
    top,
    left,
    width,
    model
  } = uiModel;
  const margins = getMargins(flat);
  const baseStyle = flat ? {} : {
    width: resizingWidth || toPercent(width),
    left: toPercent(movingLeft !== null && movingLeft !== void 0 ? movingLeft : left),
    top: (top - 1) * (eventHeight + margins.vertical) + headerHeight,
    position: 'absolute'
  };
  return Object.assign(baseStyle, model.customStyle);
}

function getTestId(_ref3) {
  let {
    model
  } = _ref3;
  const calendarId = model.calendarId ? "".concat(model.calendarId, "-") : '';
  const id = model.id ? "".concat(model.id, "-") : '';
  return "".concat(calendarId).concat(id).concat(model.title);
}

const classNames = {
  eventBody: cls('weekday-event'),
  eventTitle: cls('weekday-event-title'),
  eventDot: cls('weekday-event-dot'),
  moveEvent: cls('dragging--move-event'),
  resizeEvent: cls('dragging--resize-horizontal-event')
}; // eslint-disable-next-line complexity

function HorizontalEvent(_ref4) {
  let {
    flat = false,
    uiModel,
    eventHeight,
    headerHeight,
    resizingWidth = null,
    movingLeft = null
  } = _ref4;
  const {
    currentView
  } = useStore(viewSelector);
  const {
    useDetailPopup,
    isReadOnly: isReadOnlyCalendar
  } = useStore(optionsSelector);
  const {
    setDraggingEventUIModel
  } = useDispatch('dnd');
  const {
    showDetailPopup
  } = useDispatch('popup');
  const layoutContainer = useLayoutContainer();
  const eventBus = useEventBus();
  const calendarColor = useCalendarColor(uiModel.model);
  const [isDraggingTarget, setIsDraggingTarget] = hooks_module_y(false);
  const eventContainerRef = hooks_module_s(null);
  const {
    isReadOnly,
    id,
    calendarId
  } = uiModel.model;
  const isDraggableEvent = !isReadOnlyCalendar && !isReadOnly && type_isNil(resizingWidth) && type_isNil(movingLeft);

  const startDragEvent = className => {
    setDraggingEventUIModel(uiModel);
    layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.classList.add(className);
  };

  const endDragEvent = className => {
    setIsDraggingTarget(false);
    layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.classList.remove(className);
  };

  useTransientUpdate(dndSelector, _ref5 => {
    let {
      draggingEventUIModel,
      draggingState
    } = _ref5;

    if (draggingState === DraggingState.DRAGGING && (draggingEventUIModel === null || draggingEventUIModel === void 0 ? void 0 : draggingEventUIModel.cid()) === uiModel.cid() && type_isNil(resizingWidth) && type_isNil(movingLeft)) {
      setIsDraggingTarget(true);
    } else {
      setIsDraggingTarget(false);
    }
  });
  hooks_module_(() => {
    if (isDraggableEvent) {
      eventBus.fire('afterRenderEvent', uiModel.model.toEventObject());
    } // This effect is only for the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  const onResizeStart = useDrag(DRAGGING_TYPE_CREATORS.resizeEvent('dayGrid', "".concat(uiModel.cid())), {
    onDragStart: () => startDragEvent(classNames.resizeEvent),
    onMouseUp: () => endDragEvent(classNames.resizeEvent),
    onPressESCKey: () => endDragEvent(classNames.resizeEvent)
  });
  const onMoveStart = useDrag(DRAGGING_TYPE_CREATORS.moveEvent('dayGrid', "".concat(uiModel.cid())), {
    onDragStart: () => {
      if (isDraggableEvent) {
        startDragEvent(classNames.moveEvent);
      }
    },
    onMouseUp: (e, _ref6) => {
      let {
        draggingState
      } = _ref6;
      endDragEvent(classNames.moveEvent);
      const isClick = draggingState <= DraggingState.INIT;

      if (isClick && useDetailPopup && eventContainerRef.current) {
        showDetailPopup({
          event: uiModel.model,
          eventRect: eventContainerRef.current.getBoundingClientRect()
        }, flat);
      }

      if (isClick) {
        eventBus.fire('clickEvent', {
          event: uiModel.model.toEventObject(),
          nativeEvent: e
        });
      }
    },
    onPressESCKey: () => endDragEvent(classNames.moveEvent)
  });

  const handleResizeStart = e => {
    e.stopPropagation();

    if (isDraggableEvent) {
      onResizeStart(e);
    }
  };

  const handleMoveStart = e => {
    e.stopPropagation();
    onMoveStart(e);
  };

  const isDotEvent = !isDraggingTarget && currentView === 'month' && uiModel.model.category === 'time' && isSameDate(uiModel.model.start, uiModel.model.end);
  const shouldHideResizeHandler = !isDraggableEvent || flat || isDraggingTarget || uiModel.exceedRight;
  const containerStyle = getContainerStyle({
    uiModel,
    eventHeight,
    headerHeight,
    flat,
    movingLeft,
    resizingWidth
  });
  const eventItemStyle = getEventItemStyle({
    uiModel,
    flat,
    eventHeight,
    isDraggingTarget,
    calendarColor
  });
  return h("div", {
    className: cls('weekday-event-block', {
      'weekday-exceed-left': uiModel.exceedLeft,
      'weekday-exceed-right': uiModel.exceedRight
    }),
    style: containerStyle,
    "data-testid": passConditionalProp(isDraggableEvent, getTestId(uiModel)),
    "data-calendar-id": calendarId,
    "data-event-id": id,
    ref: eventContainerRef
  }, h("div", {
    className: classNames.eventBody,
    style: { ...eventItemStyle,
      backgroundColor: isDotEvent ? null : eventItemStyle.backgroundColor,
      borderLeft: isDotEvent ? null : eventItemStyle.borderLeft
    },
    onMouseDown: handleMoveStart
  }, isDotEvent ? h("span", {
    className: classNames.eventDot,
    style: {
      backgroundColor: eventItemStyle.backgroundColor
    }
  }) : null, h("span", {
    className: classNames.eventTitle
  }, h(Template, {
    template: uiModel.model.category,
    param: uiModel.model
  })), !shouldHideResizeHandler ? h(HorizontalEventResizeIcon, {
    onMouseDown: handleResizeStart
  }) : null));
}
;// CONCATENATED MODULE: ./src/hooks/common/useWhen.ts

/**
 * Check the condition and call the callback if the condition is true.
 * callback is always referencing the latest value
 * so that it doesn't have to register all values in the callback as deps to useEffect.
 * But it's not suitable when you need to keep tracking the value related to condition.
 *
 * @example
 * // when the condition is true, the callback is called.
 * useWhen(() => {
 *   if (shouldUpdateEvent) {
 *     // update event
 *   }
 * }, isDraggingEnd)
 *
 * @example
 * // avoid this when you need to keep updating `setGridDiff` by `currentGridPos` and `initGridPosition`.
 * useWhen(() => {
 *   // it will fire once.
 *   setGridDiff({
 *     columnIndex: currentGridPos.columnIndex - initGridPosition.columnIndex,
 *     rowIndex: currentGridPos.rowIndex - initGridPosition.rowIndex,
 *   });
 * }, isPresent(currentGridPos) && isPresent(initGridPosition));
 *
 * // You need to use `useEffect` this time.
 * useEffect(() => {
 *   setGridDiff({
 *     columnIndex: currentGridPos.columnIndex - initGridPosition.columnIndex,
 *     rowIndex: currentGridPos.rowIndex - initGridPosition.rowIndex,
 *   });
 * }, [currentGridPos, initGridPosition]);
 */

function useWhen(callback, condition) {
  const callbackRef = hooks_module_s(callback);
  hooks_module_(() => {
    callbackRef.current = callback;
  }, [callback]);
  hooks_module_(() => {
    const invoke = () => callbackRef.current();

    if (condition) {
      invoke();
    }
  }, [condition]);
}
;// CONCATENATED MODULE: ./src/hooks/event/useCurrentPointerPositionInGrid.ts





function useCurrentPointerPositionInGrid(gridPositionFinder) {
  const [currentGridPos, setCurrentGridPos] = hooks_module_y(null);
  useTransientUpdate(dndSelector, dndState => {
    if (isPresent(dndState.x) && isPresent(dndState.y)) {
      const gridPosition = gridPositionFinder({
        clientX: dndState.x,
        clientY: dndState.y
      });

      if (gridPosition) {
        setCurrentGridPos(gridPosition);
      }
    }
  });
  const clearCurrentGridPos = hooks_module_T(() => setCurrentGridPos(null), []);
  return [currentGridPos, clearCurrentGridPos];
}
;// CONCATENATED MODULE: ./src/hooks/event/useDraggingEvent.ts








const getTargetEventId = (itemType, area, behavior) => {
  function isEventDraggingType(_itemType) {
    return new RegExp("^event/".concat(area, "/").concat(behavior, "/\\d+$")).test(_itemType);
  }

  if (type_isNil(itemType)) {
    return null;
  }

  return isEventDraggingType(itemType) ? last(itemType.split('/')) : null;
};

function useDraggingEvent(area, behavior) {
  const [isDraggingEnd, setIsDraggingEnd] = hooks_module_y(false);
  const [isDraggingCanceled, setIsDraggingCanceled] = hooks_module_y(false);
  const [draggingEvent, setDraggingEvent] = hooks_module_y(null);
  useTransientUpdate(dndSelector, _ref => {
    let {
      draggingItemType,
      draggingEventUIModel,
      draggingState
    } = _ref;
    const targetEventId = getTargetEventId(draggingItemType, area, behavior);
    const hasMatchingTargetEvent = Number(targetEventId) === (draggingEventUIModel === null || draggingEventUIModel === void 0 ? void 0 : draggingEventUIModel.cid());
    const isIdle = draggingState === DraggingState.IDLE;
    const isCanceled = draggingState === DraggingState.CANCELED;

    if (type_isNil(draggingEvent) && hasMatchingTargetEvent) {
      setDraggingEvent(draggingEventUIModel);
    }

    if (isPresent(draggingEvent) && (isIdle || isCanceled)) {
      setIsDraggingEnd(true);
      setIsDraggingCanceled(isCanceled);
    }
  });

  const clearDraggingEvent = () => {
    setDraggingEvent(null);
    setIsDraggingEnd(false);
    setIsDraggingCanceled(false);
  };

  return {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent,
    clearDraggingEvent
  };
}
;// CONCATENATED MODULE: ./src/hooks/dayGridWeek/useAlldayGridRowEventMove.ts








function useAlldayGridRowEventMove(_ref) {
  let {
    rowStyleInfo,
    gridPositionFinder
  } = _ref;
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: movingEvent,
    clearDraggingEvent
  } = useDraggingEvent('dayGrid', 'move');
  const startGridXRef = hooks_module_s(null);
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const {
    columnIndex
  } = currentGridPos !== null && currentGridPos !== void 0 ? currentGridPos : {};
  const targetEventStartGridX = F(() => type_isNil(movingEvent) ? null : rowStyleInfo.findIndex(_ref2 => {
    let {
      left
    } = _ref2;
    return left === movingEvent.left;
  }), [rowStyleInfo, movingEvent]);
  const currentMovingLeft = F(() => {
    if (type_isNil(columnIndex) || type_isNil(startGridXRef.current) || type_isNil(targetEventStartGridX)) {
      return null;
    }

    const newColumnIndex = targetEventStartGridX + columnIndex - startGridXRef.current;
    return newColumnIndex < 0 ? -rowStyleInfo[-newColumnIndex].left : rowStyleInfo[newColumnIndex].left;
  }, [columnIndex, rowStyleInfo, targetEventStartGridX]);
  hooks_module_(() => {
    if (type_isNil(startGridXRef.current) && isPresent(columnIndex)) {
      startGridXRef.current = columnIndex;
    }
  }, [columnIndex]);
  useWhen(() => {
    const shouldUpdate = !isDraggingCanceled && isPresent(movingEvent) && isPresent(columnIndex) && isPresent(currentMovingLeft) && columnIndex !== startGridXRef.current;

    if (shouldUpdate && isPresent(startGridXRef.current)) {
      const dateOffset = columnIndex - startGridXRef.current;
      const newStartDate = new date_TZDate(movingEvent.model.getStarts());
      const newEndDate = new date_TZDate(movingEvent.model.getEnds());
      newStartDate.addDate(dateOffset);
      newEndDate.addDate(dateOffset);
      eventBus.fire('beforeUpdateEvent', {
        event: movingEvent.model.toEventObject(),
        changes: {
          start: newStartDate,
          end: newEndDate
        }
      });
    }

    clearDraggingEvent();
    clearCurrentGridPos();
    startGridXRef.current = null;
  }, isDraggingEnd);
  return F(() => ({
    movingEvent,
    movingLeft: currentMovingLeft
  }), [currentMovingLeft, movingEvent]);
}
;// CONCATENATED MODULE: ./src/components/dayGridWeek/movingEventShadow.tsx





function MovingEventShadow(_ref) {
  let {
    rowStyleInfo,
    gridPositionFinder
  } = _ref;
  const {
    movingEvent,
    movingLeft
  } = useAlldayGridRowEventMove({
    rowStyleInfo,
    gridPositionFinder
  });

  if (type_isNil(movingEvent)) {
    return null;
  }

  return h(HorizontalEvent, {
    uiModel: movingEvent,
    eventHeight: EVENT_HEIGHT,
    headerHeight: 0,
    movingLeft: movingLeft
  });
}
;// CONCATENATED MODULE: ./src/hooks/dayGridWeek/useAlldayGridRowEventResize.ts









function getEventColIndex(uiModel, row) {
  const start = getGridDateIndex(uiModel.getStarts(), row);
  const end = getGridDateIndex(uiModel.getEnds(), row);
  return {
    start,
    end
  };
}

function useAlldayGridRowEventResize(_ref) {
  let {
    weekDates,
    gridColWidthMap,
    gridPositionFinder
  } = _ref;
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: resizingEvent,
    clearDraggingEvent
  } = useDraggingEvent('dayGrid', 'resize');
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const {
    columnIndex
  } = currentGridPos !== null && currentGridPos !== void 0 ? currentGridPos : {};
  const targetEventGridIndices = F(() => {
    if (resizingEvent) {
      return getEventColIndex(resizingEvent, weekDates);
    }

    return {
      start: -1,
      end: -1
    };
  }, [weekDates, resizingEvent]);
  const resizingWidth = F(() => {
    if (targetEventGridIndices.start > -1 && isPresent(columnIndex)) {
      return gridColWidthMap[targetEventGridIndices.start][columnIndex];
    }

    return null;
  }, [columnIndex, gridColWidthMap, targetEventGridIndices.start]);
  useWhen(() => {
    const shouldUpdateEvent = !isDraggingCanceled && isPresent(resizingEvent) && isPresent(columnIndex) && targetEventGridIndices.start <= columnIndex && targetEventGridIndices.end !== columnIndex;

    if (shouldUpdateEvent) {
      const targetDate = weekDates[columnIndex];
      eventBus.fire('beforeUpdateEvent', {
        event: resizingEvent.model.toEventObject(),
        changes: {
          end: targetDate
        }
      });
    }

    clearCurrentGridPos();
    clearDraggingEvent();
  }, isDraggingEnd);
  return F(() => ({
    resizingEvent,
    resizingWidth
  }), [resizingWidth, resizingEvent]);
}
;// CONCATENATED MODULE: ./src/components/dayGridWeek/resizingEventShadow.tsx





function ResizingEventShadow(_ref) {
  let {
    weekDates,
    gridColWidthMap,
    gridPositionFinder
  } = _ref;
  const {
    resizingEvent,
    resizingWidth
  } = useAlldayGridRowEventResize({
    weekDates,
    gridColWidthMap,
    gridPositionFinder
  });

  if (type_isNil(resizingEvent)) {
    return null;
  }

  return h(HorizontalEvent, {
    uiModel: resizingEvent,
    eventHeight: EVENT_HEIGHT,
    headerHeight: 0,
    resizingWidth: resizingWidth
  });
}
;// CONCATENATED MODULE: ./src/hooks/common/useDOMNode.ts


function useDOMNode() {
  const [node, setNode] = hooks_module_y(null);
  const setNodeRef = hooks_module_T(ref => {
    if (ref) {
      setNode(ref);
    }
  }, []);
  return [node, setNodeRef];
}
;// CONCATENATED MODULE: ./src/hooks/dayGridWeek/useGridRowHeightController.ts





function useGridRowHeightController(maxTop, category) {
  const [clickedIndex, setClickedIndex] = hooks_module_y(0);
  const [isClickedCount, setClickedCount] = hooks_module_y(false);
  const {
    updateDayGridRowHeight
  } = useDispatch('weekViewLayout');
  const onClickExceedCount = hooks_module_T(index => {
    setClickedCount(true);
    setClickedIndex(index);
    updateDayGridRowHeight({
      rowName: category,
      height: (maxTop + 1) * EVENT_HEIGHT
    });
  }, [category, maxTop, updateDayGridRowHeight]);
  const onClickCollapseButton = hooks_module_T(() => {
    setClickedCount(false);
    updateDayGridRowHeight({
      rowName: category,
      height: DEFAULT_PANEL_HEIGHT
    });
  }, [category, updateDayGridRowHeight]);
  return {
    clickedIndex,
    isClickedCount,
    onClickExceedCount,
    onClickCollapseButton
  };
}
;// CONCATENATED MODULE: ./src/utils/requestTimeout.ts
 // Reference: https://medium.com/trabe/preventing-click-events-on-double-click-with-react-the-performant-way-1416ab03b835

function requestTimeout(fn, delay, registerCancel) {
  let start;

  const loop = timestamp => {
    if (!start) {
      start = timestamp;
    }

    const elapsed = timestamp - start;

    if (elapsed >= delay) {
      fn();
      registerCancel(noop);
      return;
    }

    const raf = requestAnimationFrame(loop);
    registerCancel(() => cancelAnimationFrame(raf));
  };

  const raf = requestAnimationFrame(loop);
  registerCancel(() => cancelAnimationFrame(raf));
}
;// CONCATENATED MODULE: ./src/hooks/common/useClickPrevention.ts


 // Reference: https://medium.com/trabe/preventing-click-events-on-double-click-with-react-the-performant-way-1416ab03b835

function useClickPrevention(_ref) {
  let {
    onClick,
    onDblClick,
    delay = 300
  } = _ref;
  const cancelCallback = hooks_module_s(noop);

  const registerCancel = fn => {
    cancelCallback.current = fn;
  };

  const cancelScheduledWork = () => {
    cancelCallback.current();
  }; // Cancels the current scheduled work before the "unmount"


  hooks_module_(() => cancelScheduledWork, []);

  const handleClick = e => {
    cancelScheduledWork();
    requestTimeout(onClick.bind(null, e), delay, registerCancel);
  };

  const handleDblClick = e => {
    cancelScheduledWork();
    onDblClick(e);
  };

  return [handleClick, handleDblClick];
}
;// CONCATENATED MODULE: ./src/hooks/gridSelection/useGridSelection.ts













const GRID_SELECTION_TYPE_MAP = {
  dayGridMonth: 'month',
  dayGridWeek: 'allday',
  timeGrid: 'time'
};

function sortDates(a, b) {
  const isIncreased = a < b;
  return isIncreased ? [a, b] : [b, a];
}

function useGridSelection(_ref) {
  let {
    type,
    selectionSorter,
    dateGetter,
    dateCollection,
    gridPositionFinder
  } = _ref;
  const {
    useFormPopup,
    gridSelection: gridSelectionOptions
  } = useStore(optionsSelector);
  const {
    enableDblClick,
    enableClick
  } = gridSelectionOptions;
  const {
    setGridSelection,
    addGridSelection,
    clearAll
  } = useDispatch('gridSelection');
  const {
    hideAllPopup,
    showFormPopup
  } = useDispatch('popup');
  const eventBus = useEventBus();
  const layoutContainer = useLayoutContainer();
  const [initMousePosition, setInitMousePosition] = hooks_module_y(null);
  const [initGridPosition, setInitGridPosition] = hooks_module_y(null);
  const isSelectingGridRef = hooks_module_s(false);
  const gridSelectionRef = hooks_module_s(null);
  useTransientUpdate(hooks_module_T(state => state.gridSelection[type], [type]), gridSelection => {
    gridSelectionRef.current = gridSelection;
  });
  useTransientUpdate(dndSelector, _ref2 => {
    let {
      draggingState,
      draggingItemType
    } = _ref2;
    isSelectingGridRef.current = draggingItemType === currentGridSelectionType && draggingState >= DraggingState.INIT;
  });
  const currentGridSelectionType = DRAGGING_TYPE_CREATORS.gridSelection(type);

  const setGridSelectionByPosition = e => {
    const gridPosition = gridPositionFinder(e);

    if (isPresent(initGridPosition) && isPresent(gridPosition)) {
      setGridSelection(type, selectionSorter(initGridPosition, gridPosition));
    }
  };

  const [handleClickWithDebounce, handleDblClickPreventingClick] = useClickPrevention({
    onClick: e => {
      if (enableClick) {
        onMouseUp(e, true);
      }
    },
    onDblClick: e => {
      if (enableDblClick) {
        onMouseUp(e, true);
      }
    },
    delay: 250 // heuristic value

  });

  const onMouseUpWithClick = e => {
    const isClick = e.detail <= 1;

    if (!enableClick && (!enableDblClick || isClick)) {
      return;
    }

    if (enableClick) {
      if (isClick) {
        handleClickWithDebounce(e);
      } else {
        handleDblClickPreventingClick(e);
      }

      return;
    }

    onMouseUp(e, true);
  };

  const onMouseUp = (e, isClickEvent) => {
    // The grid selection is created on mouseup in case of the click event.
    if (isClickEvent) {
      setGridSelectionByPosition(e);
    }

    if (isPresent(gridSelectionRef.current)) {
      var _layoutContainer$quer;

      const [startDate, endDate] = sortDates(...dateGetter(dateCollection, gridSelectionRef.current));

      if (useFormPopup && isPresent(initMousePosition)) {
        const popupArrowPointPosition = {
          top: (e.clientY + initMousePosition.y) / 2,
          left: (e.clientX + initMousePosition.x) / 2
        };
        showFormPopup({
          isCreationPopup: true,
          title: '',
          location: '',
          start: startDate,
          end: endDate,
          isAllday: type !== 'timeGrid',
          isPrivate: false,
          popupArrowPointPosition,
          close: clearAll
        });
      }

      const gridSelectionSelector = ".".concat(cls(GRID_SELECTION_TYPE_MAP[type]), ".").concat(cls('grid-selection'));
      const gridSelectionElements = Array.from((_layoutContainer$quer = layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.querySelectorAll(gridSelectionSelector)) !== null && _layoutContainer$quer !== void 0 ? _layoutContainer$quer : []);
      eventBus.fire('selectDateTime', {
        start: startDate.toDate(),
        end: endDate.toDate(),
        isAllday: type !== 'timeGrid',
        nativeEvent: e,
        gridSelectionElements
      });
    }
  };

  const clearGridSelection = hooks_module_T(() => {
    setInitMousePosition(null);
    setInitGridPosition(null);
    setGridSelection(type, null);
  }, [setGridSelection, type]);
  const onMouseDown = useDrag(currentGridSelectionType, {
    onInit: e => {
      if (useFormPopup) {
        setInitMousePosition({
          x: e.clientX,
          y: e.clientY
        });
        hideAllPopup();
      }

      const gridPosition = gridPositionFinder(e);

      if (isPresent(gridPosition)) {
        setInitGridPosition(gridPosition);
      }

      if (!useFormPopup) {
        addGridSelection(type, gridSelectionRef.current);
      }
    },
    onDragStart: e => {
      // The grid selection is created on mousemove in case of the drag event.
      setGridSelectionByPosition(e);
    },
    onDrag: e => {
      if (isSelectingGridRef.current) {
        setGridSelectionByPosition(e);
      }
    },
    onMouseUp: (e, _ref3) => {
      let {
        draggingState
      } = _ref3;
      e.stopPropagation();
      const isClickEvent = draggingState <= DraggingState.INIT;

      if (isClickEvent) {
        onMouseUpWithClick(e);
      } else {
        onMouseUp(e, isClickEvent);
      }
    },
    onPressESCKey: clearGridSelection
  });
  hooks_module_(() => clearGridSelection, [clearGridSelection]);
  return onMouseDown;
}
;// CONCATENATED MODULE: ./src/components/dayGridWeek/alldayGridRow.tsx





















const rowTitleTemplate = "alldayTitle";
function AlldayGridRow(_ref) {
  let {
    events,
    weekDates,
    height = DEFAULT_PANEL_HEIGHT,
    options = {},
    rowStyleInfo,
    gridColWidthMap
  } = _ref;
  const {
    isReadOnly
  } = useStore(optionsSelector);
  const dayGridLeftTheme = useTheme(weekDayGridLeftSelector);
  const [panelContainer, setPanelContainerRef] = useDOMNode();
  const {
    narrowWeekend = false,
    startDayOfWeek = Day.SUN
  } = options;
  const maxTop = F(() => Math.max(0, ...events.map(_ref2 => {
    let {
      top
    } = _ref2;
    return top;
  })), [events]);
  const gridPositionFinder = F(() => createGridPositionFinder({
    container: panelContainer,
    rowsCount: 1,
    columnsCount: weekDates.length,
    narrowWeekend,
    startDayOfWeek
  }), [panelContainer, weekDates.length, narrowWeekend, startDayOfWeek]);
  const {
    clickedIndex,
    isClickedCount,
    onClickExceedCount,
    onClickCollapseButton
  } = useGridRowHeightController(maxTop, 'allday');
  const horizontalEvents = F(() => events.filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP)).map(uiModel => h(HorizontalEvent, {
    key: "allday-DayEvent-".concat(uiModel.cid()),
    uiModel: uiModel,
    eventHeight: EVENT_HEIGHT,
    headerHeight: 0
  })), [events, height]);
  const startGridSelection = useGridSelection({
    type: 'dayGridWeek',
    gridPositionFinder,
    dateCollection: weekDates,
    selectionSorter: alldayGridRowSelectionHelper.sortSelection,
    dateGetter: alldayGridRowSelectionHelper.getDateFromCollection
  });

  const onMouseDown = e => {
    const target = e.target;

    if (isReadOnly || !target.classList.contains(cls('panel-grid'))) {
      return;
    }

    startGridSelection(e);
  };

  return h(p, null, h("div", {
    className: cls('panel-title'),
    style: dayGridLeftTheme
  }, h(Template, {
    template: rowTitleTemplate,
    param: "alldayTitle"
  })), h("div", {
    className: cls('allday-panel'),
    ref: setPanelContainerRef,
    onMouseDown: onMouseDown
  }, h("div", {
    className: cls('panel-grid-wrapper')
  }, h(GridCells, {
    uiModels: events,
    weekDates: weekDates,
    narrowWeekend: narrowWeekend,
    height: height,
    clickedIndex: clickedIndex,
    isClickedCount: isClickedCount,
    onClickExceedCount: onClickExceedCount,
    onClickCollapseButton: onClickCollapseButton
  })), h("div", {
    className: cls("panel-allday-events")
  }, horizontalEvents), h(ResizingEventShadow, {
    weekDates: weekDates,
    gridPositionFinder: gridPositionFinder,
    gridColWidthMap: gridColWidthMap
  }), h(MovingEventShadow, {
    rowStyleInfo: rowStyleInfo,
    gridPositionFinder: gridPositionFinder
  }), h(AlldayGridSelection, {
    weekDates: weekDates,
    narrowWeekend: narrowWeekend
  })));
}
;// CONCATENATED MODULE: ./src/components/dayGridWeek/otherGridRow.tsx












function OtherGridRow(_ref) {
  let {
    events,
    weekDates,
    category,
    height = DEFAULT_PANEL_HEIGHT,
    options = {}
  } = _ref;
  const dayGridLeftTheme = useTheme(weekDayGridLeftSelector);
  const maxTop = F(() => Math.max(0, ...events.map(_ref2 => {
    let {
      top
    } = _ref2;
    return top;
  })), [events]);
  const {
    narrowWeekend = false
  } = options;
  const rowTitleTemplate = "".concat(category, "Title");
  const {
    clickedIndex,
    isClickedCount,
    onClickExceedCount,
    onClickCollapseButton
  } = useGridRowHeightController(maxTop, category);
  const horizontalEvents = F(() => events.filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP)).map(uiModel => h(HorizontalEvent, {
    key: "".concat(category, "-DayEvent-").concat(uiModel.cid()),
    uiModel: uiModel,
    eventHeight: EVENT_HEIGHT,
    headerHeight: 0
  })), [category, events, height]);
  return h(p, null, h("div", {
    className: cls('panel-title'),
    style: dayGridLeftTheme
  }, h(Template, {
    template: rowTitleTemplate,
    param: category
  })), h("div", {
    className: cls('allday-panel')
  }, h("div", {
    className: cls('panel-grid-wrapper')
  }, h(GridCells, {
    uiModels: events,
    weekDates: weekDates,
    narrowWeekend: narrowWeekend,
    height: height,
    clickedIndex: clickedIndex,
    isClickedCount: isClickedCount,
    onClickExceedCount: onClickExceedCount,
    onClickCollapseButton: onClickCollapseButton
  })), h("div", {
    className: cls("panel-".concat(category, "-events"))
  }, horizontalEvents)));
}
;// CONCATENATED MODULE: ./src/components/popup/eventDetailSectionDetail.tsx




const eventDetailSectionDetail_classNames = {
  detailItem: cls('detail-item'),
  detailItemIndent: cls('detail-item', 'detail-item-indent'),
  detailItemSeparate: cls('detail-item', 'detail-item-separate'),
  sectionDetail: cls('popup-section', 'section-detail'),
  content: cls('content'),
  locationIcon: cls('icon', 'ic-location-b'),
  repeatIcon: cls('icon', 'ic-repeat-b'),
  userIcon: cls('icon', 'ic-user-b'),
  stateIcon: cls('icon', 'ic-state-b'),
  calendarDotIcon: cls('icon', 'calendar-dot')
}; // eslint-disable-next-line complexity

function EventDetailSectionDetail(_ref) {
  var _calendar$backgroundC, _calendar$name;

  let {
    event
  } = _ref;
  const {
    location,
    recurrenceRule,
    attendees,
    state,
    calendarId,
    body
  } = event;
  const calendar = useCalendarById(calendarId);
  return h("div", {
    className: eventDetailSectionDetail_classNames.sectionDetail
  }, location && h("div", {
    className: eventDetailSectionDetail_classNames.detailItem
  }, h("span", {
    className: eventDetailSectionDetail_classNames.locationIcon
  }), h("span", {
    className: eventDetailSectionDetail_classNames.content
  }, h(Template, {
    template: "popupDetailLocation",
    param: event,
    as: "span"
  }))), recurrenceRule && h("div", {
    className: eventDetailSectionDetail_classNames.detailItem
  }, h("span", {
    className: eventDetailSectionDetail_classNames.repeatIcon
  }), h("span", {
    className: eventDetailSectionDetail_classNames.content
  }, h(Template, {
    template: "popupDetailRecurrenceRule",
    param: event,
    as: "span"
  }))), attendees && h("div", {
    className: eventDetailSectionDetail_classNames.detailItemIndent
  }, h("span", {
    className: eventDetailSectionDetail_classNames.userIcon
  }), h("span", {
    className: eventDetailSectionDetail_classNames.content
  }, h(Template, {
    template: "popupDetailAttendees",
    param: event,
    as: "span"
  }))), state && h("div", {
    className: eventDetailSectionDetail_classNames.detailItem
  }, h("span", {
    className: eventDetailSectionDetail_classNames.stateIcon
  }), h("span", {
    className: eventDetailSectionDetail_classNames.content
  }, h(Template, {
    template: "popupDetailState",
    param: event,
    as: "span"
  }))), calendar && h("div", {
    className: eventDetailSectionDetail_classNames.detailItem
  }, h("span", {
    className: eventDetailSectionDetail_classNames.calendarDotIcon,
    style: {
      backgroundColor: (_calendar$backgroundC = calendar === null || calendar === void 0 ? void 0 : calendar.backgroundColor) !== null && _calendar$backgroundC !== void 0 ? _calendar$backgroundC : ''
    }
  }), h("span", {
    className: eventDetailSectionDetail_classNames.content
  }, (_calendar$name = calendar === null || calendar === void 0 ? void 0 : calendar.name) !== null && _calendar$name !== void 0 ? _calendar$name : '')), body && h("div", {
    className: eventDetailSectionDetail_classNames.detailItemSeparate
  }, h("span", {
    className: eventDetailSectionDetail_classNames.content
  }, h(Template, {
    template: "popupDetailBody",
    param: event,
    as: "span"
  }))));
}
;// CONCATENATED MODULE: ./src/components/popup/eventDetailSectionHeader.tsx



const eventDetailSectionHeader_classNames = {
  sectionHeader: cls('popup-section', 'section-header'),
  content: cls('content'),
  eventTitle: cls('event-title')
};
function EventDetailSectionHeader(_ref) {
  let {
    event
  } = _ref;
  return h("div", {
    className: eventDetailSectionHeader_classNames.sectionHeader
  }, h("div", {
    className: eventDetailSectionHeader_classNames.eventTitle
  }, h(Template, {
    template: "popupDetailTitle",
    param: event,
    as: "span"
  })), h("div", {
    className: eventDetailSectionHeader_classNames.content
  }, h(Template, {
    template: "popupDetailDate",
    param: event,
    as: "span"
  })));
}
;// CONCATENATED MODULE: ./src/constants/popup.ts

const SEE_MORE_POPUP_SLOT_CLASS_NAME = cls('see-more-popup-slot');
const EVENT_FORM_POPUP_SLOT_CLASS_NAME = cls('event-form-popup-slot');
const EVENT_DETAIL_POPUP_SLOT_CLASS_NAME = cls('event-detail-popup-slot');
const HALF_OF_POPUP_ARROW_HEIGHT = 8;
const BOOLEAN_KEYS_OF_EVENT_MODEL_DATA = ['isPrivate', 'isAllday', 'isPending', 'isFocused', 'isVisible', 'isReadOnly'];
let DetailPopupArrowDirection;

(function (DetailPopupArrowDirection) {
  DetailPopupArrowDirection["right"] = "right";
  DetailPopupArrowDirection["left"] = "left";
})(DetailPopupArrowDirection || (DetailPopupArrowDirection = {}));

let FormPopupArrowDirection;

(function (FormPopupArrowDirection) {
  FormPopupArrowDirection["top"] = "top";
  FormPopupArrowDirection["bottom"] = "bottom";
})(FormPopupArrowDirection || (FormPopupArrowDirection = {}));
;// CONCATENATED MODULE: ./src/contexts/floatingLayer.tsx








const FloatingLayerContext = B(null);
function FloatingLayerProvider(_ref) {
  let {
    children
  } = _ref;
  const [containerRef, containerRefCallback] = useDOMNode();
  const [seeMorePopupSlotRef, seeMorePopupSlotRefCallback] = useDOMNode();
  const [formPopupSlotRef, formPopupSlotRefCallback] = useDOMNode();
  const [detailPopupSlotRef, detailPopupSlotRefCallback] = useDOMNode();
  const floatingLayer = {
    container: containerRef,
    seeMorePopupSlot: seeMorePopupSlotRef,
    formPopupSlot: formPopupSlotRef,
    detailPopupSlot: detailPopupSlotRef
  };
  return h(FloatingLayerContext.Provider, {
    value: floatingLayer
  }, children, h("div", {
    ref: containerRefCallback,
    className: cls('floating-layer')
  }, h("div", {
    ref: seeMorePopupSlotRefCallback,
    className: SEE_MORE_POPUP_SLOT_CLASS_NAME
  }), h("div", {
    ref: formPopupSlotRefCallback,
    className: EVENT_FORM_POPUP_SLOT_CLASS_NAME
  }), h("div", {
    ref: detailPopupSlotRefCallback,
    className: EVENT_DETAIL_POPUP_SLOT_CLASS_NAME
  })));
}
const useFloatingLayer = floatingLayerType => {
  var _floatingLayers$float;

  const floatingLayers = hooks_module_q(FloatingLayerContext);

  if (isUndefined_default()(floatingLayers)) {
    throw new Error('FloatingLayerProvider is not found');
  }

  return (_floatingLayers$float = floatingLayers === null || floatingLayers === void 0 ? void 0 : floatingLayers[floatingLayerType]) !== null && _floatingLayers$float !== void 0 ? _floatingLayers$float : null;
};
;// CONCATENATED MODULE: ./src/helpers/popup.ts
function isTopOutOfLayout(top, layoutRect, popupRect) {
  return top + popupRect.height > layoutRect.top + layoutRect.height;
}
function isLeftOutOfLayout(left, layoutRect, popupRect) {
  return left + popupRect.width > layoutRect.left + layoutRect.width;
}
;// CONCATENATED MODULE: ./src/selectors/popup.ts

const eventFormPopupParamSelector = state => {
  return state.popup[PopupType.Form];
};
const eventDetailPopupParamSelector = state => {
  return state.popup[PopupType.Detail];
};
const seeMorePopupParamSelector = state => {
  return state.popup[PopupType.SeeMore];
};
;// CONCATENATED MODULE: ./src/components/popup/eventDetailPopup.tsx



















const eventDetailPopup_classNames = {
  popupContainer: cls('popup-container'),
  detailContainer: cls('detail-container'),
  topLine: cls('popup-top-line'),
  border: cls('popup-arrow-border'),
  fill: cls('popup-arrow-fill'),
  sectionButton: cls('popup-section', 'section-button'),
  content: cls('content'),
  editIcon: cls('icon', 'ic-edit'),
  deleteIcon: cls('icon', 'ic-delete'),
  editButton: cls('edit-button'),
  deleteButton: cls('delete-button'),
  verticalLine: cls('vertical-line')
};

function calculatePopupPosition(eventRect, layoutRect, popupRect) {
  let top = eventRect.top + eventRect.height / 2 - popupRect.height / 2;
  let left = eventRect.left + eventRect.width;

  if (isTopOutOfLayout(top, layoutRect, popupRect)) {
    top = layoutRect.top + layoutRect.height - popupRect.height;
  }

  if (isLeftOutOfLayout(left, layoutRect, popupRect)) {
    left = eventRect.left - popupRect.width;
  }

  return [Math.max(top, layoutRect.top) + window.scrollY, Math.max(left, layoutRect.left) + window.scrollX];
}

function calculatePopupArrowPosition(eventRect, layoutRect, popupRect) {
  const top = eventRect.top + eventRect.height / 2 + window.scrollY;
  const popupLeft = eventRect.left + eventRect.width;
  const isOutOfLayout = popupLeft + popupRect.width > layoutRect.left + layoutRect.width;
  const direction = isOutOfLayout ? DetailPopupArrowDirection.right : DetailPopupArrowDirection.left;
  return {
    top,
    direction
  };
}

function EventDetailPopup() {
  const {
    useFormPopup
  } = useStore(optionsSelector);
  const popupParams = useStore(eventDetailPopupParamSelector);
  const {
    event,
    eventRect
  } = popupParams !== null && popupParams !== void 0 ? popupParams : {};
  const {
    showFormPopup,
    hideDetailPopup
  } = useDispatch('popup');
  const calendarColor = useCalendarColor(event);
  const layoutContainer = useLayoutContainer();
  const detailPopupSlot = useFloatingLayer('detailPopupSlot');
  const eventBus = useEventBus();
  const popupContainerRef = hooks_module_s(null);
  const [style, setStyle] = hooks_module_y({});
  const [arrowTop, setArrowTop] = hooks_module_y(0);
  const [arrowDirection, setArrowDirection] = hooks_module_y(DetailPopupArrowDirection.left);
  const popupArrowClassName = F(() => {
    const right = arrowDirection === DetailPopupArrowDirection.right;
    const left = arrowDirection === DetailPopupArrowDirection.left;
    return cls('popup-arrow', {
      right,
      left
    });
  }, [arrowDirection]);
  hooks_module_h(() => {
    if (popupContainerRef.current && eventRect && layoutContainer) {
      const layoutRect = layoutContainer.getBoundingClientRect();
      const popupRect = popupContainerRef.current.getBoundingClientRect();
      const [top, left] = calculatePopupPosition(eventRect, layoutRect, popupRect);
      const {
        top: arrowTopPosition,
        direction
      } = calculatePopupArrowPosition(eventRect, layoutRect, popupRect);
      setStyle({
        top,
        left
      });
      setArrowTop(arrowTopPosition - top - HALF_OF_POPUP_ARROW_HEIGHT);
      setArrowDirection(direction);
    }
  }, [eventRect, layoutContainer]);

  if (type_isNil(event) || type_isNil(eventRect) || type_isNil(detailPopupSlot)) {
    return null;
  }

  const {
    title = '',
    isAllday = false,
    start = new date_TZDate(),
    end = new date_TZDate(),
    location,
    state,
    isReadOnly,
    isPrivate
  } = event;
  const popupArrowPointPosition = {
    top: eventRect.top + eventRect.height / 2,
    left: eventRect.left + eventRect.width / 2
  };

  const onClickEditButton = () => {
    if (useFormPopup) {
      showFormPopup({
        isCreationPopup: false,
        event,
        title,
        location,
        start,
        end,
        isAllday,
        isPrivate,
        eventState: state,
        popupArrowPointPosition
      });
    } else {
      eventBus.fire('beforeUpdateEvent', {
        event: event.toEventObject(),
        changes: {}
      });
    }
  };

  const onClickDeleteButton = () => {
    eventBus.fire('beforeDeleteEvent', event.toEventObject());
    hideDetailPopup();
  };

  return compat_module_V(h("div", {
    role: "dialog",
    className: eventDetailPopup_classNames.popupContainer,
    ref: popupContainerRef,
    style: style
  }, h("div", {
    className: eventDetailPopup_classNames.detailContainer
  }, h(EventDetailSectionHeader, {
    event: event
  }), h(EventDetailSectionDetail, {
    event: event
  }), !isReadOnly && h("div", {
    className: eventDetailPopup_classNames.sectionButton
  }, h("button", {
    type: "button",
    className: eventDetailPopup_classNames.editButton,
    onClick: onClickEditButton
  }, h("span", {
    className: eventDetailPopup_classNames.editIcon
  }), h("span", {
    className: eventDetailPopup_classNames.content
  }, h(Template, {
    template: "popupEdit",
    as: "span"
  }))), h("div", {
    className: eventDetailPopup_classNames.verticalLine
  }), h("button", {
    type: "button",
    className: eventDetailPopup_classNames.deleteButton,
    onClick: onClickDeleteButton
  }, h("span", {
    className: eventDetailPopup_classNames.deleteIcon
  }), h("span", {
    className: eventDetailPopup_classNames.content
  }, h(Template, {
    template: "popupDelete",
    as: "span"
  }))))), h("div", {
    className: eventDetailPopup_classNames.topLine,
    style: {
      backgroundColor: calendarColor.backgroundColor
    }
  }), h("div", {
    className: popupArrowClassName
  }, h("div", {
    className: eventDetailPopup_classNames.border,
    style: {
      top: arrowTop
    }
  }, h("div", {
    className: eventDetailPopup_classNames.fill
  })))), detailPopupSlot);
}
;// CONCATENATED MODULE: ./src/components/popup/calendarDropdownMenu.tsx


const calendarDropdownMenu_classNames = {
  dropdownMenu: cls('dropdown-menu'),
  dropdownMenuItem: cls('dropdown-menu-item'),
  dotIcon: cls('icon', 'dot'),
  content: cls('content')
};

function DropdownMenuItem(_ref) {
  let {
    index,
    name,
    backgroundColor,
    onClick
  } = _ref;
  return h("li", {
    className: calendarDropdownMenu_classNames.dropdownMenuItem,
    onClick: e => onClick(e, index)
  }, h("span", {
    className: calendarDropdownMenu_classNames.dotIcon,
    style: {
      backgroundColor
    }
  }), h("span", {
    className: calendarDropdownMenu_classNames.content
  }, name));
}

function CalendarDropdownMenu(_ref2) {
  let {
    calendars,
    setOpened,
    onChangeIndex
  } = _ref2;

  const handleDropdownMenuItemClick = (e, index) => {
    e.stopPropagation();
    setOpened(false);
    onChangeIndex(index);
  };

  return h("ul", {
    className: calendarDropdownMenu_classNames.dropdownMenu
  }, calendars.map((_ref3, index) => {
    let {
      name,
      backgroundColor = '000'
    } = _ref3;
    return h(DropdownMenuItem, {
      key: "dropdown-".concat(name, "-").concat(index),
      index: index,
      name: name,
      backgroundColor: backgroundColor,
      onClick: handleDropdownMenuItemClick
    });
  }));
}
;// CONCATENATED MODULE: ./src/components/popup/popupSection.tsx




function PopupSection(_ref) {
  let {
    children,
    classNames = [],
    onClick = noop
  } = _ref;
  return h("div", {
    className: cls('popup-section', ...classNames),
    onClick: onClick
  }, children);
}
;// CONCATENATED MODULE: ./src/hooks/common/useDropdownState.ts


function useDropdownState() {
  const [isOpened, setOpened] = hooks_module_y(false);

  const toggleDropdown = () => setOpened(prev => !prev);

  return {
    isOpened,
    setOpened,
    toggleDropdown
  };
}
;// CONCATENATED MODULE: ./src/hooks/popup/useFormState.ts

let FormStateActionType;

(function (FormStateActionType) {
  FormStateActionType["init"] = "init";
  FormStateActionType["setCalendarId"] = "setCalendarId";
  FormStateActionType["setTitle"] = "setTitle";
  FormStateActionType["setLocation"] = "setLocation";
  FormStateActionType["setPrivate"] = "setPrivate";
  FormStateActionType["setAllday"] = "setAllday";
  FormStateActionType["setState"] = "setState";
  FormStateActionType["reset"] = "reset";
})(FormStateActionType || (FormStateActionType = {}));

const defaultFormState = {
  title: '',
  location: '',
  isAllday: false,
  isPrivate: false,
  state: 'Busy'
}; // eslint-disable-next-line complexity

function formStateReducer(state, action) {
  switch (action.type) {
    case FormStateActionType.init:
      return { ...defaultFormState,
        ...action.event
      };

    case FormStateActionType.setCalendarId:
      return { ...state,
        calendarId: action.calendarId
      };

    case FormStateActionType.setTitle:
      return { ...state,
        title: action.title
      };

    case FormStateActionType.setLocation:
      return { ...state,
        location: action.location
      };

    case FormStateActionType.setPrivate:
      return { ...state,
        isPrivate: action.isPrivate
      };

    case FormStateActionType.setAllday:
      return { ...state,
        isAllday: action.isAllday
      };

    case FormStateActionType.setState:
      return { ...state,
        state: action.state
      };

    case FormStateActionType.reset:
      return { ...state,
        ...defaultFormState
      };

    default:
      return state;
  }
}

function useFormState(initCalendarId) {
  return hooks_module_d(formStateReducer, {
    calendarId: initCalendarId,
    ...defaultFormState
  });
}
;// CONCATENATED MODULE: ./src/components/popup/calendarSelector.tsx






const calendarSelector_classNames = {
  popupSection: ['dropdown-section', 'calendar-section'],
  popupSectionItem: cls('popup-section-item', 'popup-button'),
  dotIcon: cls('icon', 'dot'),
  content: cls('content', 'event-calendar')
};
function CalendarSelector(_ref) {
  let {
    calendars,
    selectedCalendarId,
    formStateDispatch
  } = _ref;
  const {
    isOpened,
    setOpened,
    toggleDropdown
  } = useDropdownState();
  const selectedCalendar = calendars.find(calendar => calendar.id === selectedCalendarId);
  const {
    backgroundColor = '',
    name = ''
  } = selectedCalendar !== null && selectedCalendar !== void 0 ? selectedCalendar : {};

  const changeIndex = index => formStateDispatch({
    type: FormStateActionType.setCalendarId,
    calendarId: calendars[index].id
  });

  return h(PopupSection, {
    onClick: toggleDropdown,
    classNames: calendarSelector_classNames.popupSection
  }, h("button", {
    type: "button",
    className: calendarSelector_classNames.popupSectionItem
  }, h("span", {
    className: calendarSelector_classNames.dotIcon,
    style: {
      backgroundColor
    }
  }), h("span", {
    className: calendarSelector_classNames.content
  }, name), h("span", {
    className: cls('icon', 'ic-dropdown-arrow', {
      open: isOpened
    })
  })), isOpened && h(CalendarDropdownMenu, {
    calendars: calendars,
    setOpened: setOpened,
    onChangeIndex: changeIndex
  }));
}
;// CONCATENATED MODULE: ./src/components/popup/closePopupButton.tsx





const closePopupButton_classNames = {
  closeButton: cls('popup-button', 'popup-close'),
  closeIcon: cls('icon', 'ic-close')
};
function ClosePopupButton(_ref) {
  let {
    type,
    close
  } = _ref;
  const {
    hideAllPopup
  } = useDispatch('popup');

  const onClickHandler = () => {
    hideAllPopup();

    if (isFunction(close)) {
      close();
    }
  };

  return h("button", {
    type: "button",
    className: closePopupButton_classNames.closeButton,
    onClick: onClickHandler
  }, type === 'moreEvents' ? h(Template, {
    template: "monthMoreClose"
  }) : h("i", {
    className: closePopupButton_classNames.closeIcon
  }));
}
;// CONCATENATED MODULE: ./src/components/popup/confirmPopupButton.tsx


const confirmPopupButton_classNames = {
  confirmButton: cls('popup-button', 'popup-confirm')
};
function ConfirmPopupButton(_ref) {
  let {
    children
  } = _ref;
  return h("button", {
    type: "submit",
    className: confirmPopupButton_classNames.confirmButton
  }, h("span", null, children));
}
// EXTERNAL MODULE: external {"commonjs":"tui-date-picker","commonjs2":"tui-date-picker","import":"tui-date-picker","amd":"tui-date-picker","root":["tui","DatePicker"]}
var external_commonjs_tui_date_picker_commonjs2_tui_date_picker_import_tui_date_picker_amd_tui_date_picker_root_tui_DatePicker_ = __webpack_require__(4268);
var external_commonjs_tui_date_picker_commonjs2_tui_date_picker_import_tui_date_picker_amd_tui_date_picker_root_tui_DatePicker_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_tui_date_picker_commonjs2_tui_date_picker_import_tui_date_picker_amd_tui_date_picker_root_tui_DatePicker_);
;// CONCATENATED MODULE: ./src/hooks/template/useStringOnlyTemplate.ts



function useStringOnlyTemplate(_ref) {
  let {
    template,
    model,
    defaultValue = ''
  } = _ref;
  const templates = useStore(templateSelector);
  const templateFunc = templates[template];

  if (type_isNil(templateFunc)) {
    return defaultValue;
  }

  let result = templateFunc(model);

  if (!isString_default()(result)) {
    result = defaultValue;
  }

  return result;
}
;// CONCATENATED MODULE: ./src/components/popup/dateSelector.tsx












const dateSelector_classNames = {
  datePickerContainer: cls('datepicker-container'),
  datePicker: cls('popup-section-item', 'popup-date-picker'),
  allday: cls('popup-section-item', 'popup-section-allday'),
  dateIcon: cls('icon', 'ic-date'),
  dateDash: cls('popup-date-dash'),
  content: cls('content')
};
const DateSelector = compat_module_R(function DateSelector(_ref, ref) {
  let {
    start,
    end,
    isAllday = false,
    formStateDispatch
  } = _ref;
  const {
    usageStatistics
  } = useStore(optionsSelector);
  const startPickerContainerRef = hooks_module_s(null);
  const startPickerInputRef = hooks_module_s(null);
  const endPickerContainerRef = hooks_module_s(null);
  const endPickerInputRef = hooks_module_s(null);
  const startDatePlaceholder = useStringOnlyTemplate({
    template: 'startDatePlaceholder',
    defaultValue: 'Start Date'
  });
  const endDatePlaceholder = useStringOnlyTemplate({
    template: 'endDatePlaceholder',
    defaultValue: 'End Date'
  });

  const toggleAllday = () => formStateDispatch({
    type: FormStateActionType.setAllday,
    isAllday: !isAllday
  });

  hooks_module_(() => {
    if (startPickerContainerRef.current && startPickerInputRef.current && endPickerContainerRef.current && endPickerInputRef.current) {
      const startDate = new date_TZDate(start);
      const endDate = new date_TZDate(end); // NOTE: Setting default start/end time when editing allday event first time.
      // This logic refers to Apple calendar's behavior.

      if (isAllday) {
        startDate.setHours(12, 0, 0);
        endDate.setHours(13, 0, 0);
      }

      ref.current = external_commonjs_tui_date_picker_commonjs2_tui_date_picker_import_tui_date_picker_amd_tui_date_picker_root_tui_DatePicker_default().createRangePicker({
        startpicker: {
          date: startDate.toDate(),
          input: startPickerInputRef.current,
          container: startPickerContainerRef.current
        },
        endpicker: {
          date: endDate.toDate(),
          input: endPickerInputRef.current,
          container: endPickerContainerRef.current
        },
        format: isAllday ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm',
        timePicker: isAllday ? false : {
          showMeridiem: false,
          usageStatistics
        },
        usageStatistics
      });
    }
  }, [start, end, isAllday, usageStatistics, ref]);
  return h(PopupSection, null, h("div", {
    className: dateSelector_classNames.datePicker
  }, h("span", {
    className: dateSelector_classNames.dateIcon
  }), h("input", {
    name: "start",
    className: dateSelector_classNames.content,
    placeholder: startDatePlaceholder,
    ref: startPickerInputRef
  }), h("div", {
    className: dateSelector_classNames.datePickerContainer,
    ref: startPickerContainerRef
  })), h("span", {
    className: dateSelector_classNames.dateDash
  }, "-"), h("div", {
    className: dateSelector_classNames.datePicker
  }, h("span", {
    className: dateSelector_classNames.dateIcon
  }), h("input", {
    name: "end",
    className: dateSelector_classNames.content,
    placeholder: endDatePlaceholder,
    ref: endPickerInputRef
  }), h("div", {
    className: dateSelector_classNames.datePickerContainer,
    ref: endPickerContainerRef
  })), h("div", {
    className: dateSelector_classNames.allday,
    onClick: toggleAllday
  }, h("span", {
    className: cls('icon', {
      'ic-checkbox-normal': !isAllday,
      'ic-checkbox-checked': isAllday
    })
  }), h("span", {
    className: dateSelector_classNames.content
  }, h(Template, {
    template: "popupIsAllday"
  })), h("input", {
    name: "isAllday",
    type: "checkbox",
    className: cls('hidden-input'),
    value: isAllday ? 'true' : 'false',
    checked: isAllday
  })));
});
;// CONCATENATED MODULE: ./src/components/popup/stateDropdownMenu.tsx



const EVENT_STATES = ['Busy', 'Free'];
const stateDropdownMenu_classNames = {
  popupSectionItem: cls('popup-section-item', 'dropdown-menu-item'),
  dropdownMenu: cls('dropdown-menu'),
  icon: cls('icon'),
  content: cls('content')
};
function StateDropdownMenu(_ref) {
  let {
    setOpened,
    setEventState
  } = _ref;

  const onClickDropdown = (e, state) => {
    e.stopPropagation();
    setOpened(false);
    setEventState(state);
  };

  return h("ul", {
    className: stateDropdownMenu_classNames.dropdownMenu
  }, EVENT_STATES.map(state => h("li", {
    key: state,
    className: stateDropdownMenu_classNames.popupSectionItem,
    onClick: e => onClickDropdown(e, state)
  }, h("span", {
    className: stateDropdownMenu_classNames.icon
  }), h("span", {
    className: stateDropdownMenu_classNames.content
  }, state === 'Busy' ? h(Template, {
    template: "popupStateBusy"
  }) : h(Template, {
    template: "popupStateFree"
  })))));
}
;// CONCATENATED MODULE: ./src/components/popup/eventStateSelector.tsx







const eventStateSelector_classNames = {
  popupSection: ['dropdown-section', 'state-section'],
  popupSectionItem: cls('popup-section-item', 'popup-button'),
  stateIcon: cls('icon', 'ic-state'),
  arrowIcon: cls('icon', 'ic-dropdown-arrow'),
  content: cls('content', 'event-state')
};
function EventStateSelector(_ref) {
  let {
    eventState = 'Busy',
    formStateDispatch
  } = _ref;
  const {
    isOpened,
    setOpened,
    toggleDropdown
  } = useDropdownState();

  const handleChangeEventState = state => formStateDispatch({
    type: FormStateActionType.setState,
    state
  });

  return h(PopupSection, {
    onClick: toggleDropdown,
    classNames: eventStateSelector_classNames.popupSection
  }, h("button", {
    type: "button",
    className: eventStateSelector_classNames.popupSectionItem
  }, h("span", {
    className: eventStateSelector_classNames.stateIcon
  }), h("span", {
    className: eventStateSelector_classNames.content
  }, eventState === 'Busy' ? h(Template, {
    template: "popupStateBusy"
  }) : h(Template, {
    template: "popupStateFree"
  })), h("span", {
    className: eventStateSelector_classNames.arrowIcon
  })), isOpened && h(StateDropdownMenu, {
    setOpened: setOpened,
    setEventState: handleChangeEventState
  }));
}
;// CONCATENATED MODULE: ./src/components/popup/locationInputBox.tsx





const locationInputBox_classNames = {
  popupSectionItem: cls('popup-section-item', 'popup-section-location'),
  locationIcon: cls('icon', 'ic-location'),
  content: cls('content')
};
function LocationInputBox(_ref) {
  let {
    location,
    formStateDispatch
  } = _ref;
  const locationPlaceholder = useStringOnlyTemplate({
    template: 'locationPlaceholder',
    defaultValue: 'Location'
  });

  const handleLocationChange = e => {
    formStateDispatch({
      type: FormStateActionType.setLocation,
      location: e.currentTarget.value
    });
  };

  return h(PopupSection, null, h("div", {
    className: locationInputBox_classNames.popupSectionItem
  }, h("span", {
    className: locationInputBox_classNames.locationIcon
  }), h("input", {
    name: "location",
    className: locationInputBox_classNames.content,
    placeholder: locationPlaceholder,
    value: location,
    onChange: handleLocationChange
  })));
}
;// CONCATENATED MODULE: ./src/components/popup/titleInputBox.tsx





const titleInputBox_classNames = {
  popupSectionItem: cls('popup-section-item', 'popup-section-title'),
  privateButton: cls('popup-section-item', 'popup-section-private', 'popup-button'),
  titleIcon: cls('icon', 'ic-title'),
  content: cls('content')
};
function TitleInputBox(_ref) {
  let {
    title,
    isPrivate = false,
    formStateDispatch
  } = _ref;
  const titlePlaceholder = useStringOnlyTemplate({
    template: 'titlePlaceholder',
    defaultValue: 'Subject'
  });

  const togglePrivate = () => formStateDispatch({
    type: FormStateActionType.setPrivate,
    isPrivate: !isPrivate
  });

  const handleInputChange = e => {
    formStateDispatch({
      type: FormStateActionType.setTitle,
      title: e.currentTarget.value
    });
  };

  return h(PopupSection, null, h("div", {
    className: titleInputBox_classNames.popupSectionItem
  }, h("span", {
    className: titleInputBox_classNames.titleIcon
  }), h("input", {
    name: "title",
    className: titleInputBox_classNames.content,
    placeholder: titlePlaceholder,
    value: title,
    onChange: handleInputChange,
    required: true
  })), h("button", {
    type: "button",
    className: titleInputBox_classNames.privateButton,
    onClick: togglePrivate
  }, h("span", {
    className: cls('icon', {
      'ic-private': isPrivate,
      'ic-public': !isPrivate
    })
  }), h("input", {
    name: "isPrivate",
    type: "checkbox",
    className: cls('hidden-input'),
    value: isPrivate ? 'true' : 'false',
    checked: isPrivate
  })));
}
;// CONCATENATED MODULE: ./src/components/popup/eventFormPopup.tsx


























const eventFormPopup_classNames = {
  popupContainer: cls('popup-container'),
  formContainer: cls('form-container'),
  popupArrowBorder: cls('popup-arrow-border'),
  popupArrowFill: cls('popup-arrow-fill')
};

function eventFormPopup_calculatePopupPosition(popupArrowPointPosition, layoutRect, popupRect) {
  let top = popupArrowPointPosition.top - popupRect.height - HALF_OF_POPUP_ARROW_HEIGHT;
  let left = popupArrowPointPosition.left - popupRect.width / 2;
  let direction = FormPopupArrowDirection.bottom;

  if (top < layoutRect.top) {
    direction = FormPopupArrowDirection.top;
    top = popupArrowPointPosition.top + HALF_OF_POPUP_ARROW_HEIGHT;
  }

  if (isTopOutOfLayout(top, layoutRect, popupRect)) {
    top = layoutRect.top + layoutRect.height - popupRect.height;
  }

  if (isLeftOutOfLayout(left, layoutRect, popupRect)) {
    left = layoutRect.left + layoutRect.width - popupRect.width;
  }

  return {
    top: top + window.scrollY,
    left: Math.max(left, layoutRect.left) + window.scrollX,
    direction
  };
}

function isBooleanKey(key) {
  return BOOLEAN_KEYS_OF_EVENT_MODEL_DATA.indexOf(key) !== -1;
}

function getChanges(event, eventObject) {
  return Object.entries(eventObject).reduce((changes, _ref) => {
    let [key, value] = _ref;
    const eventObjectKey = key;

    if (event[eventObjectKey] instanceof date_TZDate) {
      // NOTE: handle TZDate
      if (compare(event[eventObjectKey], value) !== 0) {
        changes[eventObjectKey] = value;
      }
    } else if (event[eventObjectKey] !== value) {
      changes[eventObjectKey] = value;
    }

    return changes;
  }, {});
}

function EventFormPopup() {
  var _calendars$;

  const {
    calendars
  } = useStore(calendarSelector);
  const {
    hideAllPopup
  } = useDispatch('popup');
  const popupParams = useStore(eventFormPopupParamSelector);
  const {
    start,
    end,
    popupArrowPointPosition,
    close,
    isCreationPopup,
    event
  } = popupParams !== null && popupParams !== void 0 ? popupParams : {};
  const eventBus = useEventBus();
  const formPopupSlot = useFloatingLayer('formPopupSlot');
  const [formState, formStateDispatch] = useFormState((_calendars$ = calendars[0]) === null || _calendars$ === void 0 ? void 0 : _calendars$.id);
  const datePickerRef = hooks_module_s(null);
  const popupContainerRef = hooks_module_s(null);
  const [style, setStyle] = hooks_module_y({});
  const [arrowLeft, setArrowLeft] = hooks_module_y(0);
  const [arrowDirection, setArrowDirection] = hooks_module_y(FormPopupArrowDirection.bottom);
  const layoutContainer = useLayoutContainer();
  const popupArrowClassName = F(() => {
    const top = arrowDirection === FormPopupArrowDirection.top;
    const bottom = arrowDirection === FormPopupArrowDirection.bottom;
    return cls('popup-arrow', {
      top,
      bottom
    });
  }, [arrowDirection]);
  hooks_module_h(() => {
    if (popupContainerRef.current && popupArrowPointPosition && layoutContainer) {
      const layoutRect = layoutContainer.getBoundingClientRect();
      const popupRect = popupContainerRef.current.getBoundingClientRect();
      const {
        top,
        left,
        direction
      } = eventFormPopup_calculatePopupPosition(popupArrowPointPosition, layoutRect, popupRect);
      const arrowLeftPosition = popupArrowPointPosition.left - left;
      setStyle({
        left,
        top
      });
      setArrowLeft(arrowLeftPosition);
      setArrowDirection(direction);
    }
  }, [layoutContainer, popupArrowPointPosition]); // Sync store's popupParams with formState when editing event

  hooks_module_(() => {
    if (isPresent(popupParams) && isPresent(event)) {
      formStateDispatch({
        type: FormStateActionType.init,
        event: {
          title: popupParams.title,
          location: popupParams.location,
          isAllday: popupParams.isAllday,
          isPrivate: popupParams.isPrivate,
          calendarId: event.calendarId,
          state: popupParams.eventState
        }
      });
    }
  }, [calendars, event, formStateDispatch, popupParams]); // Reset form states when closing the popup

  hooks_module_(() => {
    if (type_isNil(popupParams)) {
      formStateDispatch({
        type: FormStateActionType.reset
      });
    }
  }, [formStateDispatch, popupParams]);

  if (type_isNil(start) || type_isNil(end) || type_isNil(formPopupSlot)) {
    return null;
  }

  const onSubmit = e => {
    var _datePickerRef$curren, _datePickerRef$curren2;

    e.preventDefault();
    const formData = new FormData(e.target);
    const eventData = { ...formState
    };
    formData.forEach((data, key) => {
      eventData[key] = isBooleanKey(key) ? data === 'true' : data;
    });
    eventData.start = new date_TZDate((_datePickerRef$curren = datePickerRef.current) === null || _datePickerRef$curren === void 0 ? void 0 : _datePickerRef$curren.getStartDate());
    eventData.end = new date_TZDate((_datePickerRef$curren2 = datePickerRef.current) === null || _datePickerRef$curren2 === void 0 ? void 0 : _datePickerRef$curren2.getEndDate());

    if (isCreationPopup) {
      eventBus.fire('beforeCreateEvent', eventData);
    } else if (event) {
      const changes = getChanges(event, eventData);
      eventBus.fire('beforeUpdateEvent', {
        event: event.toEventObject(),
        changes
      });
    }

    hideAllPopup();
  };

  return compat_module_V(h("div", {
    role: "dialog",
    className: eventFormPopup_classNames.popupContainer,
    ref: popupContainerRef,
    style: style
  }, h("form", {
    onSubmit: onSubmit
  }, h("div", {
    className: eventFormPopup_classNames.formContainer
  }, calendars !== null && calendars !== void 0 && calendars.length ? h(CalendarSelector, {
    selectedCalendarId: formState.calendarId,
    calendars: calendars,
    formStateDispatch: formStateDispatch
  }) : h(PopupSection, null), h(TitleInputBox, {
    title: formState.title,
    isPrivate: formState.isPrivate,
    formStateDispatch: formStateDispatch
  }), h(LocationInputBox, {
    location: formState.location,
    formStateDispatch: formStateDispatch
  }), h(DateSelector, {
    start: start,
    end: end,
    isAllday: formState.isAllday,
    formStateDispatch: formStateDispatch,
    ref: datePickerRef
  }), h(EventStateSelector, {
    eventState: formState.state,
    formStateDispatch: formStateDispatch
  }), h(ClosePopupButton, {
    type: "form",
    close: close
  }), h(PopupSection, null, h(ConfirmPopupButton, null, isCreationPopup ? h(Template, {
    template: "popupSave"
  }) : h(Template, {
    template: "popupUpdate"
  })))), h("div", {
    className: popupArrowClassName
  }, h("div", {
    className: eventFormPopup_classNames.popupArrowBorder,
    style: {
      left: arrowLeft
    }
  }, h("div", {
    className: eventFormPopup_classNames.popupArrowFill
  }))))), formPopupSlot);
}
;// CONCATENATED MODULE: ./src/components/popup/popupOverlay.tsx





function shownPopupParamSelector(state) {
  return Object.values(state.popup).find(popup => isPresent(popup));
}

function PopupOverlay() {
  const shownPopupParam = useStore(shownPopupParamSelector);
  const {
    hideAllPopup
  } = useDispatch('popup');
  const isPopupShown = isPresent(shownPopupParam);

  const onClick = ev => {
    var _shownPopupParam$clos;

    ev.stopPropagation();
    shownPopupParam === null || shownPopupParam === void 0 ? void 0 : (_shownPopupParam$clos = shownPopupParam.close) === null || _shownPopupParam$clos === void 0 ? void 0 : _shownPopupParam$clos.call(shownPopupParam);
    hideAllPopup();
  };

  return h("div", {
    className: cls('popup-overlay'),
    style: {
      display: isPopupShown ? 'block' : 'none'
    },
    onClick: onClick
  });
}
;// CONCATENATED MODULE: ./src/components/popup/seeMoreEventsPopup.tsx















const seeMoreEventsPopup_classNames = {
  container: cls('see-more-container'),
  seeMore: cls('see-more'),
  header: cls('see-more-header'),
  list: cls('month-more-list')
};
function SeeMoreEventsPopup() {
  const popupParams = useStore(seeMorePopupParamSelector);
  const {
    date,
    events = [],
    popupPosition
  } = popupParams !== null && popupParams !== void 0 ? popupParams : {};
  const {
    moreView,
    moreViewTitle
  } = useMonthTheme();
  const seeMorePopupSlot = useFloatingLayer('seeMorePopupSlot');
  const eventBus = useEventBus();
  const moreEventsPopupContainerRef = hooks_module_s(null);
  const isHidden = type_isNil(date) || type_isNil(popupPosition) || type_isNil(seeMorePopupSlot);
  hooks_module_(() => {
    if (!isHidden && moreEventsPopupContainerRef.current) {
      eventBus.fire('clickMoreEventsBtn', {
        date: date.toDate(),
        target: moreEventsPopupContainerRef.current
      });
    }
  }, [date, eventBus, isHidden]);

  if (isHidden) {
    return null;
  }

  const style = {
    height: MONTH_MORE_VIEW_HEADER_HEIGHT,
    marginBottom: MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM,
    padding: MONTH_MORE_VIEW_HEADER_PADDING,
    backgroundColor: moreViewTitle.backgroundColor
  };
  const moreTitle = {
    ymd: datetime_toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    date: date.getDate().toString().padStart(2, '0')
  };
  const moreViewListStyle = {
    height: "calc(100% - ".concat(MONTH_MORE_VIEW_HEADER_HEIGHT + MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM + MONTH_MORE_VIEW_HEADER_PADDING_TOP, "px)")
  };
  return compat_module_V(h("div", {
    role: "dialog",
    className: seeMoreEventsPopup_classNames.container,
    style: popupPosition,
    ref: moreEventsPopupContainerRef
  }, h("div", {
    className: seeMoreEventsPopup_classNames.seeMore,
    style: moreView
  }, h("div", {
    className: seeMoreEventsPopup_classNames.header,
    style: style
  }, h(Template, {
    template: "monthMoreTitleDate",
    param: moreTitle
  }), h(ClosePopupButton, {
    type: "moreEvents"
  })), h("div", {
    className: seeMoreEventsPopup_classNames.list,
    style: moreViewListStyle
  }, events.map(uiModel => h(HorizontalEvent, {
    key: "see-more-event-item-".concat(uiModel.cid()),
    uiModel: uiModel,
    eventHeight: MONTH_EVENT_HEIGHT,
    headerHeight: MONTH_MORE_VIEW_HEADER_HEIGHT,
    flat: true
  }))))), seeMorePopupSlot);
}
;// CONCATENATED MODULE: ./src/components/layout.tsx
















function getLayoutStylesFromInfo(width, height) {
  const styles = {
    height: toPercent(100)
  };

  if (width) {
    styles.width = width;
  }

  if (height) {
    styles.height = height;
  }

  return styles;
} // TODO: consider `direction` and `resizeMode`


function Layout(_ref) {
  let {
    children,
    width,
    height,
    className = '',
    autoAdjustPanels = false
  } = _ref;
  const {
    backgroundColor
  } = useTheme(commonThemeSelector);
  const [container, containerRefCallback] = useDOMNode();
  const {
    setLastPanelType,
    updateLayoutHeight
  } = useDispatch('weekViewLayout');
  const layoutClassName = F(() => "".concat(cls('layout'), " ").concat(className), [className]);
  hooks_module_h(() => {
    if (container) {
      const onResizeWindow = () => updateLayoutHeight(container.offsetHeight);

      onResizeWindow();
      window.addEventListener('resize', onResizeWindow);
      return () => window.removeEventListener('resize', onResizeWindow);
    }

    return noop;
  }, [container, updateLayoutHeight]);
  hooks_module_h(() => {
    if (container && autoAdjustPanels) {
      const childArray = x(children);
      const lastChild = childArray[childArray.length - 1];

      if (!isString_default()(lastChild) && !isNumber_default()(lastChild) && !type_isNil(lastChild)) {
        setLastPanelType(lastChild.props.name);
      }
    }
  }, [children, setLastPanelType, autoAdjustPanels, container]);
  return h(LayoutContainerProvider, {
    value: container
  }, h("div", {
    ref: containerRefCallback,
    className: layoutClassName,
    style: { ...getLayoutStylesFromInfo(width, height),
      backgroundColor
    }
  }, container ? children : null), h(EventFormPopup, null), h(EventDetailPopup, null), h(SeeMoreEventsPopup, null), h(PopupOverlay, null));
}
;// CONCATENATED MODULE: ./src/components/panelResizer.tsx









function getDefaultStyle(height, border) {
  return {
    height,
    width: '100%',
    cursor: 'row-resize',
    borderTop: border,
    borderBottom: border
  };
}

function PanelResizer(_ref) {
  let {
    name,
    height
  } = _ref;
  const border = useTheme(hooks_module_T(theme => theme.week.panelResizer.border, []));
  const style = getDefaultStyle(height, border);
  const defaultGuideStyle = { ...style,
    display: 'none',
    border: 'none',
    backgroundColor: '#999'
  };
  const [guideStyle, setGuideStyle] = hooks_module_y(defaultGuideStyle);
  const startPos = hooks_module_s(null);
  const {
    updateDayGridRowHeightByDiff
  } = useDispatch('weekViewLayout');
  const onMouseDown = useDrag(DRAGGING_TYPE_CONSTANTS.panelResizer, {
    onDragStart: e => {
      startPos.current = {
        left: e.pageX,
        top: e.pageY
      };
    },
    onDrag: e => {
      if (startPos.current) {
        const top = e.pageY - startPos.current.top;
        setGuideStyle(prev => ({ ...prev,
          top,
          display: null
        }));
      }
    },
    onMouseUp: e => {
      if (startPos.current) {
        const diff = e.pageY - startPos.current.top;
        startPos.current = null;
        setGuideStyle(defaultGuideStyle);
        updateDayGridRowHeightByDiff({
          rowName: name,
          diff
        });
      }
    }
  });
  return h("div", {
    style: {
      position: 'relative'
    }
  }, h("div", {
    className: cls('panel-resizer'),
    style: style,
    onMouseDown: onMouseDown
  }), h("div", {
    className: cls('panel-resizer-guide'),
    style: guideStyle
  }));
}
;// CONCATENATED MODULE: ./src/components/panel.tsx











function getPanelSide(side, maxExpandableSide) {
  return maxExpandableSide ? Math.min(maxExpandableSide, side) : side;
}

function getPanelStyle(_ref) {
  let {
    initialHeight,
    initialWidth,
    overflowX,
    overflowY,
    maxExpandableWidth,
    maxExpandableHeight,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth
  } = _ref;
  const style = {};

  if (initialWidth) {
    style.width = getPanelSide(initialWidth, maxExpandableWidth);
    style.height = '100%';
  }

  if (initialHeight) {
    style.width = '100%';
    style.height = getPanelSide(initialHeight, maxExpandableHeight);
  }

  if (overflowX) {
    style.overflowX = 'auto';
  }

  if (overflowY) {
    style.overflowY = 'auto';
  }

  return { ...style,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth
  };
}

const Panel = compat_module_R(function Panel(_ref2, ref) {
  let {
    name,
    initialWidth = DEFAULT_PANEL_HEIGHT,
    initialHeight = DEFAULT_PANEL_HEIGHT,
    overflowX,
    overflowY,
    maxExpandableWidth,
    maxExpandableHeight,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    resizerWidth = DEFAULT_RESIZER_LENGTH,
    resizerHeight = DEFAULT_RESIZER_LENGTH,
    resizable,
    children
  } = _ref2;
  const {
    updateDayGridRowHeight
  } = useDispatch('weekViewLayout');
  const {
    height: dayGridRowHeight
  } = useStore(hooks_module_T(state => {
    var _state$weekViewLayout;

    return (_state$weekViewLayout = state.weekViewLayout.dayGridRows[name]) !== null && _state$weekViewLayout !== void 0 ? _state$weekViewLayout : {};
  }, [name]));
  const height = dayGridRowHeight !== null && dayGridRowHeight !== void 0 ? dayGridRowHeight : initialHeight;
  hooks_module_h(() => {
    updateDayGridRowHeight({
      rowName: name,
      height: initialHeight
    });
  }, [initialHeight, name, updateDayGridRowHeight]);
  const styles = getPanelStyle({
    initialWidth,
    initialHeight: height,
    overflowX,
    overflowY,
    maxExpandableWidth,
    maxExpandableHeight,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth
  });
  const isResizable = F(() => {
    if (type_isNil(resizable) || isBoolean_default()(resizable)) {
      return !!resizable;
    }

    return resizable.includes(name);
  }, [resizable, name]);
  return h(p, null, h("div", {
    className: cls('panel', name),
    style: styles,
    ref: ref
  }, children), isResizable ? h(PanelResizer, {
    name: name,
    width: resizerWidth,
    height: resizerHeight
  }) : null);
});
;// CONCATENATED MODULE: ./src/components/timeGrid/index.ts
const className = 'timegrid';
const addTimeGridPrefix = selector => "".concat(className, "-").concat(selector);
const timeFormats = {
  second: 'HH:mm:ss',
  minute: 'HH:mm',
  hour: 'HH:mm',
  date: 'HH:mm',
  month: 'MM.DD',
  year: 'YYYY.MM.DD'
};
;// CONCATENATED MODULE: ./src/components/events/timeEvent.tsx

















const timeEvent_classNames = {
  time: cls('event-time'),
  content: cls('event-time-content'),
  travelTime: cls('travel-time'),
  resizeHandleX: cls('resize-handler-x'),
  moveEvent: cls('dragging--move-event'),
  resizeEvent: cls('dragging--resize-vertical-event')
};

function getMarginLeft(left) {
  const {
    percent,
    px
  } = extractPercentPx("".concat(left));
  return left > 0 || percent > 0 || px > 0 ? TIME_EVENT_CONTAINER_MARGIN_LEFT : 0;
}

function getContainerWidth(width, marginLeft) {
  if (isString_default()(width)) {
    return width;
  }

  if (width >= 0) {
    return "calc(".concat(toPercent(width), " - ").concat(marginLeft, "px)");
  }

  return '';
}

function getStyles(_ref) {
  let {
    uiModel,
    isDraggingTarget,
    hasNextStartTime,
    calendarColor,
    minHeight
  } = _ref;
  const {
    top,
    left,
    height,
    width,
    duplicateLeft,
    duplicateWidth,
    goingDurationHeight,
    modelDurationHeight,
    comingDurationHeight,
    croppedStart,
    croppedEnd
  } = uiModel; // TODO: check and get theme values

  const travelBorderColor = 'white';
  const borderRadius = 2;
  const defaultMarginBottom = 2;
  const marginLeft = getMarginLeft(left);
  const {
    color,
    backgroundColor,
    borderColor,
    dragBackgroundColor
  } = getEventColors(uiModel, calendarColor);
  const containerStyle = {
    width: getContainerWidth(duplicateWidth || width, marginLeft),
    height: "calc(".concat(toPercent(Math.max(height, minHeight)), " - ").concat(defaultMarginBottom, "px)"),
    top: toPercent(top),
    left: duplicateLeft || toPercent(left),
    borderRadius,
    borderLeft: "3px solid ".concat(borderColor),
    marginLeft,
    color,
    backgroundColor: isDraggingTarget ? dragBackgroundColor : backgroundColor,
    opacity: isDraggingTarget ? 0.5 : 1,
    zIndex: hasNextStartTime ? 1 : 0
  };
  const goingDurationStyle = {
    height: toPercent(goingDurationHeight),
    borderBottom: "1px dashed ".concat(travelBorderColor)
  };
  const modelDurationStyle = {
    height: toPercent(modelDurationHeight)
  };
  const comingDurationStyle = {
    height: toPercent(comingDurationHeight),
    borderTop: "1px dashed ".concat(travelBorderColor)
  };

  if (croppedStart) {
    containerStyle.borderTopLeftRadius = 0;
    containerStyle.borderTopRightRadius = 0;
  }

  if (croppedEnd) {
    containerStyle.borderBottomLeftRadius = 0;
    containerStyle.borderBottomRightRadius = 0;
  }

  return {
    containerStyle,
    goingDurationStyle,
    modelDurationStyle,
    comingDurationStyle
  };
}

function isDraggableEvent(_ref2) {
  let {
    uiModel,
    isReadOnlyCalendar,
    isDraggingTarget,
    hasNextStartTime
  } = _ref2;
  const {
    model
  } = uiModel;
  return !isReadOnlyCalendar && !model.isReadOnly && !isDraggingTarget && !hasNextStartTime;
} // eslint-disable-next-line complexity


function TimeEvent(_ref3) {
  let {
    uiModel,
    nextStartTime,
    isResizingGuide = false,
    minHeight = 0
  } = _ref3;
  const {
    useDetailPopup,
    isReadOnly: isReadOnlyCalendar,
    week: weekOptions
  } = useStore(optionsSelector);
  const calendarColor = useCalendarColor(uiModel.model);
  const {
    collapseDuplicateEvents
  } = weekOptions;
  const layoutContainer = useLayoutContainer();
  const {
    showDetailPopup
  } = useDispatch('popup');
  const {
    setDraggingEventUIModel
  } = useDispatch('dnd');
  const {
    setSelectedDuplicateEventCid
  } = useDispatch('weekViewLayout');
  const eventBus = useEventBus();
  const eventContainerRef = hooks_module_s(null);
  const [isDraggingTarget, setIsDraggingTarget] = hooks_module_y(false);
  const {
    model,
    goingDurationHeight,
    modelDurationHeight,
    comingDurationHeight,
    croppedEnd
  } = uiModel;
  const {
    id,
    calendarId,
    customStyle
  } = model;
  const hasNextStartTime = isPresent(nextStartTime);
  const {
    containerStyle,
    goingDurationStyle,
    modelDurationStyle,
    comingDurationStyle
  } = getStyles({
    uiModel,
    isDraggingTarget,
    hasNextStartTime,
    calendarColor,
    minHeight
  });
  const isGuide = hasNextStartTime || isResizingGuide;
  useTransientUpdate(dndSelector, _ref4 => {
    let {
      draggingEventUIModel,
      draggingState
    } = _ref4;

    if (draggingState === DraggingState.DRAGGING && (draggingEventUIModel === null || draggingEventUIModel === void 0 ? void 0 : draggingEventUIModel.cid()) === uiModel.cid() && !hasNextStartTime && !isResizingGuide) {
      setIsDraggingTarget(true);
    } else {
      setIsDraggingTarget(false);
    }
  });
  hooks_module_(() => {
    if (!isResizingGuide) {
      eventBus.fire('afterRenderEvent', uiModel.model.toEventObject());
    } // This effect is only for the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const startDragEvent = className => {
    setDraggingEventUIModel(uiModel);
    layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.classList.add(className);
  };

  const endDragEvent = className => {
    setIsDraggingTarget(false);
    layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.classList.remove(className);
  };

  const onMoveStart = useDrag(DRAGGING_TYPE_CREATORS.moveEvent('timeGrid', "".concat(uiModel.cid())), {
    onDragStart: () => {
      if (isDraggable) {
        startDragEvent(timeEvent_classNames.moveEvent);
      }
    },
    onMouseUp: (e, _ref5) => {
      let {
        draggingState
      } = _ref5;
      endDragEvent(timeEvent_classNames.moveEvent);
      const isClick = draggingState <= DraggingState.INIT;

      if (isClick && collapseDuplicateEvents) {
        const selectedDuplicateEventCid = uiModel.duplicateEvents.length > 0 ? uiModel.cid() : DEFAULT_DUPLICATE_EVENT_CID;
        setSelectedDuplicateEventCid(selectedDuplicateEventCid);
      }

      if (isClick && useDetailPopup && eventContainerRef.current) {
        showDetailPopup({
          event: uiModel.model,
          eventRect: eventContainerRef.current.getBoundingClientRect()
        }, false);
      }

      if (isClick) {
        eventBus.fire('clickEvent', {
          event: uiModel.model.toEventObject(),
          nativeEvent: e
        });
      }
    },
    onPressESCKey: () => endDragEvent(timeEvent_classNames.moveEvent)
  });

  const handleMoveStart = e => {
    e.stopPropagation();
    onMoveStart(e);
  };

  const onResizeStart = useDrag(DRAGGING_TYPE_CREATORS.resizeEvent('timeGrid', "".concat(uiModel.cid())), {
    onDragStart: () => startDragEvent(timeEvent_classNames.resizeEvent),
    onMouseUp: () => endDragEvent(timeEvent_classNames.resizeEvent),
    onPressESCKey: () => endDragEvent(timeEvent_classNames.resizeEvent)
  });

  const handleResizeStart = e => {
    e.stopPropagation();
    onResizeStart(e);
  };

  const isDraggable = isDraggableEvent({
    uiModel,
    isReadOnlyCalendar,
    isDraggingTarget,
    hasNextStartTime
  });
  const shouldShowResizeHandle = isDraggable && !croppedEnd;
  return h("div", {
    "data-testid": "".concat(isGuide ? 'guide-' : '', "time-event-").concat(model.title, "-").concat(uiModel.cid()),
    "data-calendar-id": calendarId,
    "data-event-id": id,
    className: timeEvent_classNames.time,
    style: { ...containerStyle,
      ...customStyle
    },
    onMouseDown: handleMoveStart,
    ref: eventContainerRef
  }, goingDurationHeight ? h("div", {
    className: timeEvent_classNames.travelTime,
    style: goingDurationStyle
  }, h(Template, {
    template: "goingDuration",
    param: model
  })) : null, modelDurationHeight ? h("div", {
    className: timeEvent_classNames.content,
    style: modelDurationStyle
  }, h(Template, {
    template: "time",
    param: { ...model.toEventObject(),
      start: hasNextStartTime ? nextStartTime : model.start
    }
  })) : null, comingDurationHeight ? h("div", {
    className: timeEvent_classNames.travelTime,
    style: comingDurationStyle
  }, h(Template, {
    template: "comingDuration",
    param: model
  })) : null, shouldShowResizeHandle ? h("div", {
    className: timeEvent_classNames.resizeHandleX,
    onMouseDown: handleResizeStart
  }) : null);
}
;// CONCATENATED MODULE: ./src/components/timeGrid/gridSelectionByColumn.tsx








function gridSelectionByColumn_GridSelection(_ref) {
  let {
    top,
    height,
    text
  } = _ref;
  const {
    backgroundColor,
    border
  } = useTheme(hooks_module_T(theme => theme.common.gridSelection, []));
  const color = useTheme(hooks_module_T(theme => theme.week.gridSelection.color, []));
  const style = {
    top: toPercent(top),
    height: toPercent(height),
    backgroundColor,
    border
  };
  return h("div", {
    className: cls('time', 'grid-selection'),
    style: style,
    "data-testid": "time-grid-selection-".concat(top, "-").concat(height)
  }, text.length > 0 ? h("span", {
    className: cls('grid-selection-label'),
    style: {
      color
    }
  }, text) : null);
}

function GridSelectionByColumn(_ref2) {
  let {
    columnIndex,
    timeGridRows
  } = _ref2;
  const gridSelectionData = useStore(hooks_module_T(state => timeGridSelectionHelper.calculateSelection(state.gridSelection.timeGrid, columnIndex, timeGridRows.length - 1), [columnIndex, timeGridRows]));
  const gridSelectionProps = F(() => {
    if (!gridSelectionData) {
      return null;
    }

    const {
      startRowIndex,
      endRowIndex,
      isStartingColumn,
      isSelectingMultipleColumns
    } = gridSelectionData;
    const {
      top: startRowTop,
      startTime: startRowStartTime
    } = timeGridRows[startRowIndex];
    const {
      top: endRowTop,
      height: endRowHeight,
      endTime: endRowEndTime
    } = timeGridRows[endRowIndex];
    const gridSelectionHeight = endRowTop + endRowHeight - startRowTop;
    let text = "".concat(startRowStartTime, " - ").concat(endRowEndTime);

    if (isSelectingMultipleColumns) {
      text = isStartingColumn ? startRowStartTime : '';
    }

    return {
      top: startRowTop,
      height: gridSelectionHeight,
      text
    };
  }, [gridSelectionData, timeGridRows]);

  if (type_isNil(gridSelectionProps)) {
    return null;
  }

  return h(gridSelectionByColumn_GridSelection, gridSelectionProps);
}
;// CONCATENATED MODULE: ./src/hooks/timeGrid/useTimeGridEventResize.ts









function useTimeGridEventResize(_ref) {
  let {
    gridPositionFinder,
    totalUIModels,
    columnIndex,
    timeGridData
  } = _ref;
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: resizingStartUIModel,
    clearDraggingEvent
  } = useDraggingEvent('timeGrid', 'resize');
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const [guideUIModel, setGuideUIModel] = hooks_module_y(null);
  const clearStates = hooks_module_T(() => {
    setGuideUIModel(null);
    clearDraggingEvent();
    clearCurrentGridPos();
  }, [clearCurrentGridPos, clearDraggingEvent]);
  const baseResizingInfo = F(() => {
    if (type_isNil(resizingStartUIModel)) {
      return null;
    }

    const {
      columns,
      rows
    } = timeGridData;
    /**
     * Filter UIModels that are made from the target event.
     */

    const resizeTargetUIModelColumns = totalUIModels.map(uiModels => uiModels.filter(uiModel => uiModel.cid() === resizingStartUIModel.cid()));

    const findRowIndexOf = (targetDate, targetColumnIndex) => row => {
      const rowStartTZDate = setTimeStrToDate(columns[targetColumnIndex].date, row.startTime);
      const rowEndTZDate = setTimeStrToDate(timeGridData.columns[targetColumnIndex].date, row.endTime);
      return rowStartTZDate <= targetDate && targetDate < rowEndTZDate;
    };

    const eventStartDateColumnIndex = resizeTargetUIModelColumns.findIndex(row => row.length > 0);
    const resizingStartEventUIModel = resizeTargetUIModelColumns[eventStartDateColumnIndex][0];
    const {
      goingDuration = 0
    } = resizingStartEventUIModel.model;
    const renderStart = addMinutes(resizingStartEventUIModel.getStarts(), -goingDuration);
    const eventStartDateRowIndex = Math.max(rows.findIndex(findRowIndexOf(renderStart, eventStartDateColumnIndex)), 0); // when it is -1, the event starts before the current view.

    const eventEndDateColumnIndex = findLastIndex(resizeTargetUIModelColumns, row => row.length > 0);
    const resizingEndEventUIModel = resizeTargetUIModelColumns[eventEndDateColumnIndex][0];
    const {
      comingDuration = 0
    } = resizingEndEventUIModel.model;
    const renderEnd = addMinutes(resizingEndEventUIModel.getStarts(), comingDuration);
    let eventEndDateRowIndex = rows.findIndex(findRowIndexOf(renderEnd, eventEndDateColumnIndex)); // when it is -1, the event ends after the current view.

    eventEndDateRowIndex = eventEndDateRowIndex >= 0 ? eventEndDateRowIndex : rows.length - 1;
    return {
      eventStartDateColumnIndex,
      eventStartDateRowIndex,
      eventEndDateColumnIndex,
      eventEndDateRowIndex,
      resizeTargetUIModelColumns
    };
  }, [resizingStartUIModel, timeGridData, totalUIModels]);
  const canCalculateGuideUIModel = isPresent(baseResizingInfo) && isPresent(resizingStartUIModel) && isPresent(currentGridPos);
  const oneRowHeight = F(() => baseResizingInfo ? timeGridData.rows[0].height : 0, [baseResizingInfo, timeGridData.rows]); // When drag an one-day event

  hooks_module_(() => {
    if (canCalculateGuideUIModel) {
      const {
        eventStartDateRowIndex,
        eventStartDateColumnIndex,
        eventEndDateColumnIndex
      } = baseResizingInfo;

      if (columnIndex === eventEndDateColumnIndex && eventStartDateColumnIndex === eventEndDateColumnIndex) {
        const clonedUIModel = resizingStartUIModel.clone();
        const {
          height,
          goingDurationHeight,
          comingDurationHeight
        } = clonedUIModel;
        const newHeight = Math.max(oneRowHeight + goingDurationHeight * height / 100 + comingDurationHeight * height / 100, timeGridData.rows[currentGridPos.rowIndex].top - timeGridData.rows[eventStartDateRowIndex].top + oneRowHeight);
        const newGoingDurationHeight = goingDurationHeight * height / newHeight;
        const newComingDurationHeight = comingDurationHeight * height / newHeight;
        clonedUIModel.setUIProps({
          height: newHeight,
          goingDurationHeight: newGoingDurationHeight,
          comingDurationHeight: newComingDurationHeight,
          modelDurationHeight: 100 - (newGoingDurationHeight + newComingDurationHeight)
        });
        setGuideUIModel(clonedUIModel);
      }
    }
  }, [baseResizingInfo, canCalculateGuideUIModel, columnIndex, currentGridPos, resizingStartUIModel, timeGridData.rows, oneRowHeight]); // When drag a two-day event (but less than 24 hours)

  hooks_module_(() => {
    if (canCalculateGuideUIModel) {
      const {
        resizeTargetUIModelColumns,
        eventStartDateColumnIndex,
        eventEndDateColumnIndex
      } = baseResizingInfo;

      if ((columnIndex === eventStartDateColumnIndex || columnIndex === eventEndDateColumnIndex) && eventStartDateColumnIndex !== eventEndDateColumnIndex) {
        let clonedUIModel;

        if (columnIndex === eventStartDateColumnIndex) {
          // first column
          clonedUIModel = resizeTargetUIModelColumns[columnIndex][0].clone();
        } else {
          // last column
          clonedUIModel = resizingStartUIModel.clone();
          clonedUIModel.setUIProps({
            height: timeGridData.rows[currentGridPos.rowIndex].top + oneRowHeight
          });
        }

        setGuideUIModel(clonedUIModel);
      }
    }
  }, [baseResizingInfo, canCalculateGuideUIModel, columnIndex, currentGridPos, resizingStartUIModel, timeGridData.rows, oneRowHeight]);
  useWhen(() => {
    const shouldUpdate = !isDraggingCanceled && isPresent(baseResizingInfo) && isPresent(currentGridPos) && isPresent(resizingStartUIModel) && baseResizingInfo.eventEndDateColumnIndex === columnIndex;

    if (shouldUpdate) {
      const {
        comingDuration = 0
      } = resizingStartUIModel.model;
      const targetEndDate = addMinutes(setTimeStrToDate(timeGridData.columns[columnIndex].date, timeGridData.rows[currentGridPos.rowIndex].endTime), -comingDuration);
      const minEndDate = addMinutes(resizingStartUIModel.getStarts(), 30);
      eventBus.fire('beforeUpdateEvent', {
        event: resizingStartUIModel.model.toEventObject(),
        changes: {
          end: max(minEndDate, targetEndDate)
        }
      });
    }

    clearStates();
  }, isDraggingEnd);
  return guideUIModel;
}
;// CONCATENATED MODULE: ./src/components/timeGrid/resizingGuideByColumn.tsx




function ResizingGuideByColumn(_ref) {
  let {
    gridPositionFinder,
    totalUIModels,
    columnIndex,
    timeGridData
  } = _ref;
  const guideUIModel = useTimeGridEventResize({
    gridPositionFinder,
    totalUIModels,
    columnIndex,
    timeGridData
  });

  if (type_isNil(guideUIModel)) {
    return null;
  }

  return h(TimeEvent, {
    uiModel: guideUIModel,
    isResizingGuide: true
  });
}
;// CONCATENATED MODULE: ./src/components/timeGrid/column.tsx











const column_classNames = {
  column: cls('column'),
  backgrounds: cls('background-events'),
  events: cls('events')
}; // TODO: implement BackgroundEvents
// function BackgroundEvents({
//   eventUIModels,
//   startTime,
//   endTime,
// }: {
//   eventUIModels: EventUIModel[];
//   startTime: TZDate;
//   endTime: TZDate;
// }) {
//   const backgroundEvents = eventUIModels.filter(isBackgroundEvent);
//   return (
//     <div className={classNames.backgrounds}>
//       {backgroundEvents.map((eventUIModel, index) => {
//         const { top, height } = getTopHeightByTime(
//           eventUIModel.model.start,
//           eventUIModel.model.end,
//           startTime,
//           endTime
//         );
//         return (
//           <BackgroundEvent
//             uiModel={eventUIModel}
//             top={toPercent(top)}
//             height={toPercent(height)}
//             key={`backgroundEvent-${index}`}
//           />
//         );
//       })}
//     </div>
//   );
// }

function VerticalEvents(_ref) {
  let {
    eventUIModels,
    minEventHeight
  } = _ref;
  // @TODO: use dynamic value
  const style = {
    marginRight: 8
  };
  return h("div", {
    className: column_classNames.events,
    style: style
  }, eventUIModels.map(eventUIModel => h(TimeEvent, {
    key: "".concat(eventUIModel.valueOf(), "-").concat(eventUIModel.cid()),
    uiModel: eventUIModel,
    minHeight: minEventHeight
  })));
}

function backgroundColorSelector(theme) {
  return {
    defaultBackgroundColor: theme.week.dayGrid.backgroundColor,
    todayBackgroundColor: theme.week.today.backgroundColor,
    weekendBackgroundColor: theme.week.weekend.backgroundColor
  };
}

function getBackgroundColor(_ref2) {
  let {
    today,
    columnDate,
    defaultBackgroundColor,
    todayBackgroundColor,
    weekendBackgroundColor
  } = _ref2;
  const isTodayColumn = isSameDate(today, columnDate);
  const isWeekendColumn = isWeekend(columnDate.getDay());

  if (isTodayColumn) {
    return todayBackgroundColor;
  }

  if (isWeekendColumn) {
    return weekendBackgroundColor;
  }

  return defaultBackgroundColor;
}

const Column = compat_module_g(function Column(_ref3) {
  let {
    columnDate,
    columnWidth,
    columnIndex,
    totalUIModels,
    gridPositionFinder,
    timeGridData,
    isLastColumn
  } = _ref3;
  const {
    rows: timeGridRows
  } = timeGridData;
  const borderRight = useTheme(hooks_module_T(theme => theme.week.timeGrid.borderRight, []));
  const backgroundColorTheme = useTheme(backgroundColorSelector);
  const [, getNow] = usePrimaryTimezone();
  const today = getNow(); // const [startTime, endTime] = useMemo(() => {
  //   const { startTime: startTimeStr } = first(timeGridRows);
  //   const { endTime: endTimeStr } = last(timeGridRows);
  //   const start = setTimeStrToDate(columnDate, startTimeStr);
  //   const end = setTimeStrToDate(columnDate, endTimeStr);
  //   return [start, end];
  // }, [columnDate, timeGridRows]);

  const backgroundColor = getBackgroundColor({
    today,
    columnDate,
    ...backgroundColorTheme
  });
  const style = {
    width: columnWidth,
    backgroundColor,
    borderRight: isLastColumn ? 'none' : borderRight
  };
  const uiModelsByColumn = totalUIModels[columnIndex];
  const minEventHeight = timeGridRows[0].height;
  return h("div", {
    className: column_classNames.column,
    style: style,
    "data-testid": "timegrid-column-".concat(columnDate.getDay())
  }, h(VerticalEvents, {
    eventUIModels: uiModelsByColumn,
    minEventHeight: minEventHeight
  }), h(ResizingGuideByColumn, {
    gridPositionFinder: gridPositionFinder,
    totalUIModels: totalUIModels,
    columnIndex: columnIndex,
    timeGridData: timeGridData
  }), h(GridSelectionByColumn, {
    columnIndex: columnIndex,
    timeGridRows: timeGridRows
  }));
});
;// CONCATENATED MODULE: ./src/components/timeGrid/gridLines.tsx





function gridLineBorderSelector(theme) {
  return {
    halfHourLineBorder: theme.week.timeGridHalfHourLine.borderBottom,
    hourLineBorder: theme.week.timeGridHourLine.borderBottom
  };
}

const GridLines = compat_module_g(function GridLines(_ref) {
  let {
    timeGridRows
  } = _ref;
  const {
    halfHourLineBorder,
    hourLineBorder
  } = useTheme(gridLineBorderSelector);
  return h("div", {
    className: cls('gridlines')
  }, timeGridRows.map((time, index) => {
    const isUpperLine = index % 2 === 0;
    return h("div", {
      key: "gridline-".concat(time.startTime, "-").concat(time.endTime),
      className: cls('gridline-half'),
      style: {
        top: toPercent(time.top),
        height: toPercent(time.height),
        borderBottom: isUpperLine ? halfHourLineBorder : hourLineBorder
      },
      "data-testid": "gridline-".concat(time.startTime, "-").concat(time.endTime)
    });
  }));
});
;// CONCATENATED MODULE: ./src/hooks/timeGrid/useTimeGridEventMove.ts









const THIRTY_MINUTES = 30;

function getCurrentIndexByTime(time, hourStart) {
  const hour = time.getHours() - hourStart;
  const minutes = time.getMinutes();
  return hour * 2 + Math.floor(minutes / THIRTY_MINUTES);
}

function getMovingEventPosition(_ref) {
  let {
    draggingEvent,
    columnDiff,
    rowDiff,
    timeGridDataRows,
    currentDate
  } = _ref;
  const rowHeight = timeGridDataRows[0].height;
  const maxHeight = rowHeight * timeGridDataRows.length;
  const millisecondsDiff = rowDiff * MS_PER_THIRTY_MINUTES + columnDiff * MS_PER_DAY;
  const hourStart = Number(timeGridDataRows[0].startTime.split(':')[0]);
  const {
    goingDuration = 0,
    comingDuration = 0
  } = draggingEvent.model;
  const goingStart = addMinutes(draggingEvent.getStarts(), -goingDuration);
  const comingEnd = addMinutes(draggingEvent.getEnds(), comingDuration);
  const nextStart = addMilliseconds(goingStart, millisecondsDiff);
  const nextEnd = addMilliseconds(comingEnd, millisecondsDiff);
  const startIndex = Math.max(getCurrentIndexByTime(nextStart, hourStart), 0);
  const endIndex = Math.min(getCurrentIndexByTime(nextEnd, hourStart), timeGridDataRows.length - 1);
  const isStartAtPrevDate = nextStart.getFullYear() < currentDate.getFullYear() || nextStart.getMonth() < currentDate.getMonth() || nextStart.getDate() < currentDate.getDate();
  const isEndAtNextDate = nextEnd.getFullYear() > currentDate.getFullYear() || nextEnd.getMonth() > currentDate.getMonth() || nextEnd.getDate() > currentDate.getDate();
  const indexDiff = endIndex - (isStartAtPrevDate ? 0 : startIndex);
  const top = isStartAtPrevDate ? 0 : timeGridDataRows[startIndex].top;
  const height = isEndAtNextDate ? maxHeight : Math.max(indexDiff, 1) * rowHeight;
  return {
    top,
    height
  };
}

const initXSelector = state => state.dnd.initX;

const initYSelector = state => state.dnd.initY;

function useTimeGridEventMove(_ref2) {
  let {
    gridPositionFinder,
    timeGridData
  } = _ref2;
  const initX = useStore(initXSelector);
  const initY = useStore(initYSelector);
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent,
    clearDraggingEvent
  } = useDraggingEvent('timeGrid', 'move');
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const initGridPosRef = hooks_module_s(null);
  hooks_module_(() => {
    if (isPresent(initX) && isPresent(initY)) {
      initGridPosRef.current = gridPositionFinder({
        clientX: initX,
        clientY: initY
      });
    }
  }, [gridPositionFinder, initX, initY]);
  const gridDiff = F(() => {
    if (type_isNil(initGridPosRef.current) || type_isNil(currentGridPos)) {
      return null;
    }

    return {
      columnDiff: currentGridPos.columnIndex - initGridPosRef.current.columnIndex,
      rowDiff: currentGridPos.rowIndex - initGridPosRef.current.rowIndex
    };
  }, [currentGridPos]);
  const startDateTime = F(() => {
    if (type_isNil(draggingEvent)) {
      return null;
    }

    return draggingEvent.getStarts();
  }, [draggingEvent]);
  const clearState = hooks_module_T(() => {
    clearCurrentGridPos();
    clearDraggingEvent();
    initGridPosRef.current = null;
  }, [clearCurrentGridPos, clearDraggingEvent]);
  const nextStartTime = F(() => {
    if (type_isNil(gridDiff) || type_isNil(startDateTime)) {
      return null;
    }

    return addMilliseconds(startDateTime, gridDiff.rowDiff * MS_PER_THIRTY_MINUTES + gridDiff.columnDiff * MS_PER_DAY);
  }, [gridDiff, startDateTime]);
  const movingEvent = F(() => {
    if (type_isNil(draggingEvent) || type_isNil(currentGridPos) || type_isNil(gridDiff)) {
      return null;
    }

    const clonedEvent = draggingEvent.clone();
    const {
      top,
      height
    } = getMovingEventPosition({
      draggingEvent: clonedEvent,
      columnDiff: gridDiff.columnDiff,
      rowDiff: gridDiff.rowDiff,
      timeGridDataRows: timeGridData.rows,
      currentDate: timeGridData.columns[currentGridPos.columnIndex].date
    });
    clonedEvent.setUIProps({
      left: timeGridData.columns[currentGridPos.columnIndex].left,
      width: timeGridData.columns[currentGridPos.columnIndex].width,
      top,
      height
    });
    return clonedEvent;
  }, [currentGridPos, draggingEvent, gridDiff, timeGridData.columns, timeGridData.rows]);
  useWhen(() => {
    const shouldUpdate = !isDraggingCanceled && isPresent(draggingEvent) && isPresent(currentGridPos) && isPresent(gridDiff) && isPresent(nextStartTime) && (gridDiff.rowDiff !== 0 || gridDiff.columnDiff !== 0);

    if (shouldUpdate) {
      const duration = draggingEvent.duration();
      const nextEndTime = addMilliseconds(nextStartTime, duration);
      eventBus.fire('beforeUpdateEvent', {
        event: draggingEvent.model.toEventObject(),
        changes: {
          start: nextStartTime,
          end: nextEndTime
        }
      });
    }

    clearState();
  }, isDraggingEnd);
  return {
    movingEvent,
    nextStartTime
  };
}
;// CONCATENATED MODULE: ./src/components/timeGrid/movingEventShadow.tsx




function movingEventShadow_MovingEventShadow(_ref) {
  let {
    gridPositionFinder,
    timeGridData
  } = _ref;
  const {
    movingEvent,
    nextStartTime
  } = useTimeGridEventMove({
    gridPositionFinder,
    timeGridData
  });

  if (type_isNil(movingEvent)) {
    return null;
  }

  return h(TimeEvent, {
    uiModel: movingEvent,
    nextStartTime: nextStartTime
  });
}
;// CONCATENATED MODULE: ./src/test/testIds.ts
const TEST_IDS = {
  NOW_INDICATOR: 'timegrid-now-indicator',
  NOW_INDICATOR_LABEL: 'timegrid-now-indicator-label'
};
;// CONCATENATED MODULE: ./src/components/timeGrid/nowIndicator.tsx








const nowIndicator_classNames = {
  line: cls(addTimeGridPrefix('now-indicator')),
  left: cls(addTimeGridPrefix('now-indicator-left')),
  marker: cls(addTimeGridPrefix('now-indicator-marker')),
  today: cls(addTimeGridPrefix('now-indicator-today')),
  right: cls(addTimeGridPrefix('now-indicator-right'))
};

function nowIndicatorTheme(theme) {
  return {
    pastBorder: theme.week.nowIndicatorPast.border,
    todayBorder: theme.week.nowIndicatorToday.border,
    futureBorder: theme.week.nowIndicatorFuture.border,
    bulletBackgroundColor: theme.week.nowIndicatorBullet.backgroundColor
  };
}

function NowIndicator(_ref) {
  let {
    top,
    columnWidth,
    columnCount,
    columnIndex
  } = _ref;
  const {
    pastBorder,
    todayBorder,
    futureBorder,
    bulletBackgroundColor
  } = useTheme(nowIndicatorTheme);
  const layoutContainer = useLayoutContainer();
  const eventBus = useEventBus();
  const indicatorRef = hooks_module_s(null);
  const leftLine = {
    left: toPercent(columnWidth * columnIndex),
    width: toPercent(columnWidth * columnIndex)
  };
  const rightLine = {
    left: toPercent(columnWidth * (columnIndex + 1)),
    width: toPercent(columnWidth * (columnCount - columnIndex + 1))
  };
  hooks_module_(() => {
    const scrollToNow = behavior => {
      var _layoutContainer$quer;

      const scrollArea = (_layoutContainer$quer = layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.querySelector(".".concat(cls('panel'), ".").concat(cls('time')))) !== null && _layoutContainer$quer !== void 0 ? _layoutContainer$quer : null;

      if (scrollArea && indicatorRef.current) {
        const {
          offsetHeight: scrollAreaOffsetHeight
        } = scrollArea;
        const {
          offsetTop: targetOffsetTop
        } = indicatorRef.current;
        const newScrollTop = targetOffsetTop - scrollAreaOffsetHeight / 2; // NOTE: IE11 doesn't support `scrollTo`

        if (scrollArea.scrollTo) {
          scrollArea.scrollTo({
            top: newScrollTop,
            behavior
          });
        } else {
          scrollArea.scrollTop = newScrollTop;
        }
      }
    };

    eventBus.on('scrollToNow', scrollToNow);
    return () => eventBus.off('scrollToNow', scrollToNow);
  }, [eventBus, layoutContainer]);
  hooks_module_(() => {
    eventBus.fire('scrollToNow', 'smooth');
  }, [eventBus]);
  return h("div", {
    ref: indicatorRef,
    className: nowIndicator_classNames.line,
    style: {
      top: toPercent(top)
    },
    "data-testid": TEST_IDS.NOW_INDICATOR
  }, h("div", {
    className: nowIndicator_classNames.left,
    style: {
      width: leftLine.width,
      borderTop: pastBorder
    }
  }), h("div", {
    className: nowIndicator_classNames.marker,
    style: {
      left: leftLine.left,
      backgroundColor: bulletBackgroundColor
    }
  }), h("div", {
    className: nowIndicator_classNames.today,
    style: {
      left: leftLine.left,
      width: toPercent(columnWidth),
      borderTop: todayBorder
    }
  }), h("div", {
    className: nowIndicator_classNames.right,
    style: {
      left: rightLine.left,
      borderTop: futureBorder
    }
  }));
}
;// CONCATENATED MODULE: ./src/components/timeGrid/nowIndicatorLabel.tsx








const nowIndicatorLabel_classNames = {
  now: addTimeGridPrefix('current-time'),
  dayDifference: addTimeGridPrefix('day-difference')
};
function NowIndicatorLabel(_ref) {
  let {
    unit,
    top,
    now,
    zonedNow
  } = _ref;
  const color = useTheme(hooks_module_T(theme => theme.week.nowIndicatorLabel.color, []));
  const dateDifference = F(() => {
    return getDateDifference(zonedNow, now);
  }, [zonedNow, now]);
  const model = {
    unit,
    time: zonedNow,
    format: timeFormats[unit]
  };
  return h("div", {
    className: cls(nowIndicatorLabel_classNames.now),
    style: {
      top: toPercent(top),
      color
    },
    "data-testid": TEST_IDS.NOW_INDICATOR_LABEL
  }, dateDifference !== 0 && h("span", {
    className: cls(nowIndicatorLabel_classNames.dayDifference)
  }, "[".concat(dateDifference > 0 ? '+' : '-').concat(Math.abs(dateDifference), "]")), h(Template, {
    template: "timegridNowIndicatorLabel",
    param: model,
    as: "span"
  }));
}
;// CONCATENATED MODULE: ./src/selectors/options.ts
const monthVisibleEventCountSelector = state => {
  var _state$options$month$;

  return (_state$options$month$ = state.options.month.visibleEventCount) !== null && _state$options$month$ !== void 0 ? _state$options$month$ : 6;
};
const showNowIndicatorOptionSelector = state => state.options.week.showNowIndicator;
const showTimezoneCollapseButtonOptionSelector = state => {
  var _state$options$week$s;

  return (_state$options$week$s = state.options.week.showTimezoneCollapseButton) !== null && _state$options$week$s !== void 0 ? _state$options$week$s : false;
};
const timezonesCollapsedOptionSelector = state => {
  var _state$options$week$t;

  return (_state$options$week$t = state.options.week.timezonesCollapsed) !== null && _state$options$week$t !== void 0 ? _state$options$week$t : false;
};
;// CONCATENATED MODULE: ./src/components/timeGrid/timeColumn.tsx

















const timeColumn_classNames = {
  timeColumn: addTimeGridPrefix('time-column'),
  hourRows: addTimeGridPrefix('hour-rows'),
  time: addTimeGridPrefix('time'),
  timeLabel: addTimeGridPrefix('time-label'),
  first: addTimeGridPrefix('time-first'),
  last: addTimeGridPrefix('time-last'),
  hidden: addTimeGridPrefix('time-hidden')
};

function timeColumn_backgroundColorSelector(theme) {
  return {
    primaryTimezoneBackgroundColor: theme.week.timeGridLeft.backgroundColor,
    subTimezoneBackgroundColor: theme.week.timeGridLeftAdditionalTimezone.backgroundColor
  };
}

function timeColorSelector(theme) {
  return {
    pastTimeColor: theme.week.pastTime.color,
    futureTimeColor: theme.week.futureTime.color
  };
}

function HourRows(_ref) {
  var _rowsInfo$0$diffFromP;

  let {
    rowsInfo,
    isPrimary,
    borderRight,
    width,
    nowIndicatorState
  } = _ref;
  const showNowIndicator = useStore(showNowIndicatorOptionSelector);
  const {
    primaryTimezoneBackgroundColor,
    subTimezoneBackgroundColor
  } = useTheme(timeColumn_backgroundColorSelector);
  const {
    pastTimeColor,
    futureTimeColor
  } = useTheme(timeColorSelector);
  const zonedNow = isPresent(nowIndicatorState) ? addMinutes(nowIndicatorState.now, (_rowsInfo$0$diffFromP = rowsInfo[0].diffFromPrimaryTimezone) !== null && _rowsInfo$0$diffFromP !== void 0 ? _rowsInfo$0$diffFromP : 0) : null;
  const backgroundColor = isPrimary ? primaryTimezoneBackgroundColor : subTimezoneBackgroundColor;
  return h("div", {
    role: "rowgroup",
    className: cls(timeColumn_classNames.hourRows),
    style: {
      width: toPercent(width),
      borderRight,
      backgroundColor
    }
  }, rowsInfo.map(_ref2 => {
    let {
      date,
      top,
      className
    } = _ref2;
    const isPast = isPresent(zonedNow) && date < zonedNow;
    const color = isPast ? pastTimeColor : futureTimeColor;
    return h("div", {
      key: date.getTime(),
      className: className,
      style: {
        top: toPercent(top),
        color
      },
      role: "row"
    }, h(Template, {
      template: "timegridDisplay".concat(isPrimary ? 'Primary' : '', "Time"),
      param: {
        time: date
      },
      as: "span"
    }));
  }), showNowIndicator && isPresent(nowIndicatorState) && isPresent(zonedNow) && h(NowIndicatorLabel, {
    unit: "hour",
    top: nowIndicatorState.top,
    now: nowIndicatorState.now,
    zonedNow: zonedNow
  }));
}

const TimeColumn = compat_module_g(function TimeColumn(_ref3) {
  let {
    timeGridRows,
    nowIndicatorState
  } = _ref3;
  const showNowIndicator = useStore(showNowIndicatorOptionSelector);
  const timezones = useStore(timezonesSelector);
  const timezonesCollapsed = useStore(timezonesCollapsedOptionSelector);
  const tzConverter = useTZConverter();
  const {
    width,
    borderRight
  } = useTheme(weekTimeGridLeftSelector);
  const rowsByHour = F(() => timeGridRows.filter((_, index) => index % 2 === 0 || index === timeGridRows.length - 1), [timeGridRows]);
  const hourRowsPropsMapper = hooks_module_T((row, index, diffFromPrimaryTimezone) => {
    const shouldHideRow = _ref4 => {
      let {
        top: rowTop,
        height: rowHeight
      } = _ref4;

      if (!showNowIndicator || type_isNil(nowIndicatorState)) {
        return false;
      }

      const indicatorTop = nowIndicatorState.top;
      return rowTop - rowHeight <= indicatorTop && indicatorTop <= rowTop + rowHeight;
    };

    const isFirst = index === 0;
    const isLast = index === rowsByHour.length - 1;
    const className = cls(timeColumn_classNames.time, {
      [timeColumn_classNames.first]: isFirst,
      [timeColumn_classNames.last]: isLast,
      [timeColumn_classNames.hidden]: shouldHideRow(row)
    });
    let date = setTimeStrToDate(new date_TZDate(), isLast ? row.endTime : row.startTime);

    if (isPresent(diffFromPrimaryTimezone)) {
      date = addMinutes(date, diffFromPrimaryTimezone);
    }

    return {
      date,
      top: row.top,
      className,
      diffFromPrimaryTimezone
    };
  }, [rowsByHour, nowIndicatorState, showNowIndicator]);
  const [primaryTimezone, ...otherTimezones] = timezones;
  const hourRowsWidth = otherTimezones.length > 0 ? 100 / (otherTimezones.length + 1) : 100;
  const primaryTimezoneHourRowsProps = rowsByHour.map((row, index) => hourRowsPropsMapper(row, index));
  const otherTimezoneHourRowsProps = F(() => {
    if (otherTimezones.length === 0) {
      return [];
    }

    return otherTimezones.reverse().map(timezone => {
      const {
        timezoneName
      } = timezone;
      const primaryTimezoneOffset = tzConverter(primaryTimezone.timezoneName).getTimezoneOffset();
      const currentTimezoneOffset = tzConverter(timezoneName).getTimezoneOffset();
      const diffFromPrimaryTimezone = currentTimezoneOffset - primaryTimezoneOffset;
      return rowsByHour.map((row, index) => hourRowsPropsMapper(row, index, diffFromPrimaryTimezone));
    });
  }, [hourRowsPropsMapper, otherTimezones, primaryTimezone, rowsByHour, tzConverter]);
  return h("div", {
    className: cls(timeColumn_classNames.timeColumn),
    style: {
      width
    },
    "data-testid": "timegrid-time-column"
  }, !timezonesCollapsed && otherTimezoneHourRowsProps.map(rowsInfo => h(HourRows, {
    key: rowsInfo[0].diffFromPrimaryTimezone,
    rowsInfo: rowsInfo,
    isPrimary: false,
    borderRight: borderRight,
    width: hourRowsWidth,
    nowIndicatorState: nowIndicatorState
  })), h(HourRows, {
    rowsInfo: primaryTimezoneHourRowsProps,
    isPrimary: true,
    borderRight: borderRight,
    width: timezonesCollapsed ? 100 : hourRowsWidth,
    nowIndicatorState: nowIndicatorState
  }));
});
;// CONCATENATED MODULE: ./src/controller/times.ts



/**
 * @param date
 * @param {TZDate} [start] - start time
 * @param {TZDate} [end] - end time
 * @returns {number} The percent value represent current time between start and end
 */
function getTopPercentByTime(date, start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const time = math_limit(date.getTime(), [startTime], [endTime]) - startTime;
  const max = endTime - startTime;
  const topPercent = ratio(max, 100, time);
  return math_limit(topPercent, [0], [100]);
}
/**
 * @typedef {Object} VerticalPositionsByTime
 * @property {number} top - top percent
 * @property {number} height - height percent
 */

/**
 *
 * @param {TZDate} start target time which is converted to percent value
 * @param {TZDate} end target time which is converted to percent value
 * @param {TZDate} minTime start time
 * @param {TZDate} maxTime end time
 * @returns {VerticalPositionsByTime} verticalPositions
 */

function getTopHeightByTime(start, end, minTime, maxTime) {
  const top = getTopPercentByTime(start, minTime, maxTime);
  const bottom = getTopPercentByTime(end, minTime, maxTime);
  const height = bottom - top;
  return {
    top,
    height
  };
}

function setValueByUnit(time, value, unit) {
  if (unit === 'minute') {
    time.setMinutes(value, 0, 0);
  } else if (unit === 'hour') {
    time.setHours(value, 0, 0, 0);
  } else if (unit === 'date') {
    time.setHours(0, 0, 0, 0);
    time.setDate(value + 1);
  } else if (unit === 'month') {
    time.setHours(0, 0, 0, 0);
    time.setMonth(value, 1);
  } else if (unit === 'year') {
    time.setHours(0, 0, 0, 0);
    time.setFullYear(value, 0, 1);
  }

  return time;
}
/**
 * Get a previous grid time before the time
 * @param {TZDate} time - target time
 * @param slot
 * @param unit
 * @returns {TZDate} - next grid time
 */


function getPrevGridTime(time, slot, unit) {
  let index = 0;
  let prevGridTime = setValueByUnit(clone(time), slot * index, unit);
  let nextGridTime;
  index += 1;

  do {
    nextGridTime = setValueByUnit(clone(time), slot * index, unit);
    index += 1;

    if (nextGridTime < time) {
      prevGridTime = clone(nextGridTime);
    }
  } while (nextGridTime <= time);

  return prevGridTime;
}
/**
 * Get a next grid time after the time
 * @param {TZDate} time - target time
 * @param slot
 * @param unit
 * @returns {TZDate} - next grid time
 */

function getNextGridTime(time, slot, unit) {
  let index = 0;
  let nextGridTime;

  do {
    nextGridTime = setValueByUnit(clone(time), slot * index, unit);
    index += 1;
  } while (nextGridTime < time);

  return nextGridTime;
}
;// CONCATENATED MODULE: ./src/controller/column.ts










const MIN_HEIGHT_PERCENT = 1;

/**
 * Filter that get events in supplied date ranges.
 * @param {TZDate} startColumnTime - start date
 * @param {TZDate} endColumnTime - end date
 * @returns {function} event filter function
 */
function column_isBetween(startColumnTime, endColumnTime) {
  return uiModel => {
    const {
      goingDuration = 0,
      comingDuration = 0
    } = uiModel.model;
    const ownStarts = addMinutes(uiModel.getStarts(), -goingDuration);
    const ownEnds = addMinutes(uiModel.getEnds(), comingDuration);
    return !(ownEnds <= startColumnTime || ownStarts >= endColumnTime);
  };
}

function setInnerHeights(uiModel, options) {
  const {
    renderStart,
    renderEnd,
    modelStart,
    modelEnd
  } = options;
  const {
    goingDuration = 0,
    comingDuration = 0
  } = uiModel.model;
  let modelDurationHeight = 100;

  if (goingDuration > 0) {
    const {
      height: goingDurationHeight
    } = getTopHeightByTime(renderStart, modelStart, renderStart, renderEnd);
    uiModel.goingDurationHeight = goingDurationHeight;
    modelDurationHeight -= goingDurationHeight;
  }

  if (comingDuration > 0) {
    const {
      height: comingDurationHeight
    } = getTopHeightByTime(modelEnd, renderEnd, renderStart, renderEnd);
    uiModel.comingDurationHeight = comingDurationHeight;
    modelDurationHeight -= comingDurationHeight;
  }

  uiModel.modelDurationHeight = modelDurationHeight;
}

function setCroppedEdges(uiModel, options) {
  const {
    goingStart,
    comingEnd,
    startColumnTime,
    endColumnTime
  } = options;

  if (goingStart < startColumnTime) {
    uiModel.croppedStart = true;
  }

  if (comingEnd > endColumnTime) {
    uiModel.croppedEnd = true;
  }
}

function getDuplicateLeft(uiModel, baseLeft) {
  const {
    duplicateEvents,
    duplicateEventIndex
  } = uiModel;
  const prevEvent = duplicateEvents[duplicateEventIndex - 1];
  let left = baseLeft;

  if (prevEvent) {
    // duplicateLeft = prevEvent.duplicateLeft + prevEvent.duplicateWidth + marginLeft
    const {
      percent: leftPercent,
      px: leftPx
    } = extractPercentPx("".concat(prevEvent.duplicateLeft));
    const {
      percent: widthPercent,
      px: widthPx
    } = extractPercentPx("".concat(prevEvent.duplicateWidth));
    const percent = leftPercent + widthPercent;
    const px = leftPx + widthPx + TIME_EVENT_CONTAINER_MARGIN_LEFT;

    if (percent !== 0) {
      left = "calc(".concat(toPercent(percent), " ").concat(px > 0 ? '+' : '-', " ").concat(toPx(Math.abs(px)), ")");
    } else {
      left = toPx(px);
    }
  } else {
    left = toPercent(left);
  }

  return left;
}

function getDuplicateWidth(uiModel, baseWidth) {
  const {
    collapse
  } = uiModel; // if it is collapsed, (COLLAPSED_DUPLICATE_EVENT_WIDTH_PX)px
  // if it is expanded, (baseWidth)% - (other duplicate events' width + marginLeft)px - (its marginLeft)px

  return collapse ? "".concat(COLLAPSED_DUPLICATE_EVENT_WIDTH_PX, "px") : "calc(".concat(toPercent(baseWidth), " - ").concat(toPx((COLLAPSED_DUPLICATE_EVENT_WIDTH_PX + TIME_EVENT_CONTAINER_MARGIN_LEFT) * (uiModel.duplicateEvents.length - 1) + TIME_EVENT_CONTAINER_MARGIN_LEFT), ")");
}

function setDimension(uiModel, options) {
  const {
    startColumnTime,
    endColumnTime,
    baseWidth,
    columnIndex,
    renderStart,
    renderEnd
  } = options;
  const {
    duplicateEvents
  } = uiModel;
  const {
    top,
    height
  } = getTopHeightByTime(renderStart, renderEnd, startColumnTime, endColumnTime);
  const dimension = {
    top,
    left: baseWidth * columnIndex,
    width: baseWidth,
    height: Math.max(MIN_HEIGHT_PERCENT, height),
    duplicateLeft: '',
    duplicateWidth: ''
  };

  if (duplicateEvents.length > 0) {
    dimension.duplicateLeft = getDuplicateLeft(uiModel, dimension.left);
    dimension.duplicateWidth = getDuplicateWidth(uiModel, dimension.width);
  }

  uiModel.setUIProps(dimension);
}

function getRenderInfoOptions(uiModel, columnIndex, baseWidth, startColumnTime, endColumnTime) {
  const {
    goingDuration = 0,
    comingDuration = 0
  } = uiModel.model;
  const modelStart = uiModel.getStarts();
  const modelEnd = uiModel.getEnds();
  const goingStart = addMinutes(modelStart, -goingDuration);
  const comingEnd = addMinutes(modelEnd, comingDuration);
  const renderStart = max(goingStart, startColumnTime);
  const renderEnd = min(comingEnd, endColumnTime);
  return {
    baseWidth,
    columnIndex,
    modelStart,
    modelEnd,
    renderStart,
    renderEnd,
    goingStart,
    comingEnd,
    startColumnTime,
    endColumnTime,
    duplicateEvents: uiModel.duplicateEvents
  };
}

function setRenderInfo(_ref) {
  let {
    uiModel,
    columnIndex,
    baseWidth,
    startColumnTime,
    endColumnTime,
    isDuplicateEvent = false
  } = _ref;

  if (!isDuplicateEvent && uiModel.duplicateEvents.length > 0) {
    uiModel.duplicateEvents.forEach(event => {
      setRenderInfo({
        uiModel: event,
        columnIndex,
        baseWidth,
        startColumnTime,
        endColumnTime,
        isDuplicateEvent: true
      });
    });
    return;
  }

  const renderInfoOptions = getRenderInfoOptions(uiModel, columnIndex, baseWidth, startColumnTime, endColumnTime);
  setDimension(uiModel, renderInfoOptions);
  setInnerHeights(uiModel, renderInfoOptions);
  setCroppedEdges(uiModel, renderInfoOptions);
}

function setDuplicateEvents(uiModels, options, selectedDuplicateEventCid) {
  const {
    getDuplicateEvents,
    getMainEvent
  } = options;
  const eventObjects = uiModels.map(uiModel => uiModel.model.toEventObject());
  uiModels.forEach(targetUIModel => {
    if (targetUIModel.collapse || targetUIModel.duplicateEvents.length > 0) {
      return;
    }

    const duplicateEvents = getDuplicateEvents(targetUIModel.model.toEventObject(), eventObjects);

    if (duplicateEvents.length <= 1) {
      return;
    }

    const mainEvent = getMainEvent(duplicateEvents);
    const duplicateEventUIModels = duplicateEvents.map(event => uiModels.find(uiModel => uiModel.cid() === event.__cid));
    const isSelectedGroup = !!(selectedDuplicateEventCid > DEFAULT_DUPLICATE_EVENT_CID && duplicateEvents.find(event => event.__cid === selectedDuplicateEventCid));
    const duplicateStarts = duplicateEvents.reduce((acc, _ref2) => {
      let {
        start,
        goingDuration
      } = _ref2;
      const renderStart = addMinutes(start, -goingDuration);
      return min(acc, renderStart);
    }, duplicateEvents[0].start);
    const duplicateEnds = duplicateEvents.reduce((acc, _ref3) => {
      let {
        end,
        comingDuration
      } = _ref3;
      const renderEnd = addMinutes(end, comingDuration);
      return max(acc, renderEnd);
    }, duplicateEvents[0].end);
    duplicateEventUIModels.forEach((event, index) => {
      const isMain = event.cid() === mainEvent.__cid;

      const collapse = !(isSelectedGroup && event.cid() === selectedDuplicateEventCid || !isSelectedGroup && isMain);
      event.setUIProps({
        duplicateEvents: duplicateEventUIModels,
        duplicateEventIndex: index,
        collapse,
        isMain,
        duplicateStarts,
        duplicateEnds
      });
    });
  });
  return uiModels;
}
/**
 * Convert to EventUIModel and make rendering information of events
 * @param {EventUIModel[]} events - event list
 * @param {TZDate} startColumnTime - start date
 * @param {TZDate} endColumnTime - end date
 */


function setRenderInfoOfUIModels(events, startColumnTime, endColumnTime, selectedDuplicateEventCid, collapseDuplicateEventsOptions) {
  const uiModels = events.filter(isTimeEvent).filter(column_isBetween(startColumnTime, endColumnTime)).sort(array.compare.event.asc);

  if (collapseDuplicateEventsOptions) {
    setDuplicateEvents(uiModels, collapseDuplicateEventsOptions, selectedDuplicateEventCid);
  }

  const expandedEvents = uiModels.filter(uiModel => !uiModel.collapse);
  const uiModelColl = createEventCollection(...expandedEvents);
  const usingTravelTime = true;
  const collisionGroups = getCollisionGroup(expandedEvents, usingTravelTime);
  const matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);
  matrices.forEach(matrix => {
    const maxRowLength = Math.max(...matrix.map(row => row.length));
    const baseWidth = Math.round(100 / maxRowLength);
    matrix.forEach(row => {
      row.forEach((uiModel, columnIndex) => {
        setRenderInfo({
          uiModel,
          columnIndex,
          baseWidth,
          startColumnTime,
          endColumnTime
        });
      });
    });
  });
  return uiModels;
}
;// CONCATENATED MODULE: ./src/hooks/common/useInterval.ts

function useInterval(callback, delay) {
  const savedCallback = hooks_module_s(callback); // Remember the latest callback.

  hooks_module_(() => {
    savedCallback.current = callback;
  }, [callback]); // Set up the interval.
  // eslint-disable-next-line consistent-return

  hooks_module_(() => {
    const tick = () => savedCallback.current();

    const intervalDelay = delay !== null && delay !== void 0 ? delay : -1;

    if (intervalDelay > 0) {
      const id = setInterval(tick, intervalDelay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
;// CONCATENATED MODULE: ./src/hooks/common/useIsMounted.ts

function useIsMounted() {
  const isMountedRef = hooks_module_s(true);
  hooks_module_(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return hooks_module_T(() => isMountedRef.current, []);
}
;// CONCATENATED MODULE: ./src/components/timeGrid/timeGrid.tsx




























const timeGrid_classNames = {
  timegrid: cls(className),
  scrollArea: cls(addTimeGridPrefix('scroll-area'))
};
function TimeGrid(_ref) {
  let {
    timeGridData,
    events
  } = _ref;
  const {
    isReadOnly,
    week: {
      narrowWeekend,
      startDayOfWeek,
      collapseDuplicateEvents
    }
  } = useStore(optionsSelector);
  const showNowIndicator = useStore(showNowIndicatorOptionSelector);
  const selectedDuplicateEventCid = useStore(state => state.weekViewLayout.selectedDuplicateEventCid);
  const [, getNow] = usePrimaryTimezone();
  const isMounted = useIsMounted();
  const {
    width: timeGridLeftWidth
  } = useTheme(weekTimeGridLeftSelector);
  const [nowIndicatorState, setNowIndicatorState] = hooks_module_y(null);
  const {
    columns,
    rows
  } = timeGridData;
  const lastColumnIndex = columns.length - 1;
  const totalUIModels = F(() => columns.map(_ref2 => {
    let {
      date
    } = _ref2;
    return events.filter(column_isBetween(toStartOfDay(date), toEndOfDay(date))) // NOTE: prevent shared reference between columns
    .map(uiModel => uiModel.clone());
  }).map((uiModelsByColumn, columnIndex) => setRenderInfoOfUIModels(uiModelsByColumn, setTimeStrToDate(columns[columnIndex].date, first(rows).startTime), setTimeStrToDate(columns[columnIndex].date, last(rows).endTime), selectedDuplicateEventCid, collapseDuplicateEvents)), [columns, rows, events, selectedDuplicateEventCid, collapseDuplicateEvents]);
  const currentDateData = F(() => {
    const now = getNow();
    const currentDateIndexInColumns = columns.findIndex(column => isSameDate(column.date, now));

    if (currentDateIndexInColumns < 0) {
      return null;
    }

    const startTime = setTimeStrToDate(columns[currentDateIndexInColumns].date, timeGridData.rows[0].startTime);
    const endTime = setTimeStrToDate(columns[currentDateIndexInColumns].date, last(timeGridData.rows).endTime);
    return {
      startTime,
      endTime,
      currentDateIndex: currentDateIndexInColumns
    };
  }, [columns, getNow, timeGridData.rows]);
  const [columnsContainer, setColumnsContainer] = useDOMNode();
  const gridPositionFinder = F(() => createGridPositionFinder({
    rowsCount: rows.length,
    columnsCount: columns.length,
    container: columnsContainer,
    narrowWeekend,
    startDayOfWeek
  }), [columns.length, columnsContainer, narrowWeekend, rows.length, startDayOfWeek]);
  const onMouseDown = useGridSelection({
    type: 'timeGrid',
    gridPositionFinder,
    selectionSorter: timeGridSelectionHelper.sortSelection,
    dateGetter: timeGridSelectionHelper.getDateFromCollection,
    dateCollection: timeGridData
  });
  const updateTimeGridIndicator = hooks_module_T(() => {
    if (isPresent(currentDateData)) {
      const {
        startTime,
        endTime
      } = currentDateData;
      const now = getNow();

      if (startTime <= now && now <= endTime) {
        setNowIndicatorState({
          top: getTopPercentByTime(now, startTime, endTime),
          now
        });
      }
    }
  }, [currentDateData, getNow]); // Calculate initial setTimeIndicatorTop

  hooks_module_h(() => {
    if (isMounted()) {
      var _currentDateData$curr;

      if (((_currentDateData$curr = currentDateData === null || currentDateData === void 0 ? void 0 : currentDateData.currentDateIndex) !== null && _currentDateData$curr !== void 0 ? _currentDateData$curr : -1) >= 0) {
        updateTimeGridIndicator();
      } else {
        setNowIndicatorState(null);
      }
    }
  }, [currentDateData, isMounted, updateTimeGridIndicator]); // Set interval to update timeIndicatorTop

  useInterval(updateTimeGridIndicator, isPresent(currentDateData) ? MS_PER_MINUTES : null);
  return h("div", {
    className: timeGrid_classNames.timegrid
  }, h("div", {
    className: timeGrid_classNames.scrollArea
  }, h(TimeColumn, {
    timeGridRows: rows,
    nowIndicatorState: nowIndicatorState
  }), h("div", {
    className: cls('columns'),
    style: {
      left: timeGridLeftWidth
    },
    ref: setColumnsContainer,
    onMouseDown: passConditionalProp(!isReadOnly, onMouseDown)
  }, h(GridLines, {
    timeGridRows: rows
  }), h(movingEventShadow_MovingEventShadow, {
    gridPositionFinder: gridPositionFinder,
    timeGridData: timeGridData
  }), columns.map((column, index) => h(Column, {
    key: column.date.toString(),
    timeGridData: timeGridData,
    columnDate: column.date,
    columnWidth: toPercent(column.width),
    columnIndex: index,
    totalUIModels: totalUIModels,
    gridPositionFinder: gridPositionFinder,
    isLastColumn: index === lastColumnIndex
  })), showNowIndicator && isPresent(currentDateData) && isPresent(nowIndicatorState) ? h(NowIndicator, {
    top: nowIndicatorState.top,
    columnWidth: columns[0].width,
    columnCount: columns.length,
    columnIndex: currentDateData.currentDateIndex
  }) : null)));
}
;// CONCATENATED MODULE: ./src/components/timeGrid/timezoneCollapseButton.tsx




function TimezoneCollapseButton(_ref) {
  let {
    isCollapsed
  } = _ref;
  const eventBus = useEventBus();
  const iconClassName = cls('icon', {
    'ic-arrow-right': isCollapsed,
    'ic-arrow-left': !isCollapsed
  });
  return h("button", {
    className: cls(addTimeGridPrefix('timezone-collapse-button')),
    "aria-expanded": !isCollapsed,
    onClick: () => eventBus.fire('clickTimezonesCollapseBtn', isCollapsed)
  }, h("span", {
    className: iconClassName,
    role: "img"
  }));
}
;// CONCATENATED MODULE: ./src/components/timeGrid/timezoneLabels.tsx
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
















function TimezoneLabel(_ref) {
  let {
    label,
    offset,
    tooltip,
    width = 100,
    left
  } = _ref;
  return h("div", {
    title: tooltip,
    className: cls(addTimeGridPrefix('timezone-label')),
    style: {
      width: toPercent(width),
      height: toPercent(100),
      left: toPercent(left)
    },
    role: "gridcell"
  }, h(Template, {
    template: "timezoneDisplayLabel",
    param: {
      displayLabel: label,
      timezoneOffset: offset
    },
    as: "span"
  }));
}

function useTimezoneCollapseOptions() {
  const showTimezoneCollapseButton = useStore(showTimezoneCollapseButtonOptionSelector);
  const timezonesCollapsed = useStore(timezonesCollapsedOptionSelector);
  return F(() => {
    return {
      showTimezoneCollapseButton,
      timezonesCollapsed
    };
  }, [showTimezoneCollapseButton, timezonesCollapsed]);
}

function TimezoneLabels(_ref2) {
  let {
    top
  } = _ref2;
  const timezones = useStore(timezonesSelector);
  const {
    width
  } = useTheme(weekTimeGridLeftSelector);
  const tzConverter = useTZConverter();
  const {
    showTimezoneCollapseButton,
    timezonesCollapsed
  } = useTimezoneCollapseOptions();

  if (timezones.length <= 1) {
    return null;
  }

  const timezoneLabelProps = timezones.map(_ref3 => {
    let {
      displayLabel,
      timezoneName,
      tooltip
    } = _ref3;
    return !isUndefined_default()(displayLabel) ? {
      label: displayLabel,
      offset: null,
      tooltip: tooltip !== null && tooltip !== void 0 ? tooltip : timezoneName
    } : {
      label: null,
      offset: tzConverter(timezoneName).getTimezoneOffset(),
      tooltip: tooltip !== null && tooltip !== void 0 ? tooltip : timezoneName
    };
  });
  const [primaryTimezone, ...restTimezones] = timezoneLabelProps;
  const subTimezones = restTimezones.reverse();
  const timezonesCount = timezonesCollapsed ? 1 : timezones.length;
  const timezoneLabelWidth = 100 / timezonesCount;
  return h("div", {
    style: {
      top,
      width
    },
    role: "columnheader",
    className: cls('timezone-labels-slot')
  }, !timezonesCollapsed && subTimezones.map((subTimezone, index) => {
    var _subTimezone$label;

    return h(TimezoneLabel, _extends({
      key: "subTimezone-".concat((_subTimezone$label = subTimezone.label) !== null && _subTimezone$label !== void 0 ? _subTimezone$label : subTimezone.offset),
      width: timezoneLabelWidth,
      left: timezoneLabelWidth * index
    }, subTimezone));
  }), showTimezoneCollapseButton && h(TimezoneCollapseButton, {
    isCollapsed: timezonesCollapsed
  }), h(TimezoneLabel, _extends({
    width: timezoneLabelWidth,
    left: timezoneLabelWidth * subTimezones.length
  }, primaryTimezone)));
}
;// CONCATENATED MODULE: ./src/constants/view.ts
const VIEW_TYPE = {
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day'
};
const DEFAULT_TASK_PANEL = ['milestone', 'task'];
const DEFAULT_EVENT_PANEL = ['allday', 'time'];
;// CONCATENATED MODULE: ./src/helpers/view.ts


function getActivePanels(taskView, eventView) {
  const activePanels = [];

  if (taskView === true) {
    activePanels.push(...DEFAULT_TASK_PANEL);
  } else if (Array.isArray(taskView)) {
    activePanels.push(...taskView);
  }

  if (eventView === true) {
    activePanels.push(...DEFAULT_EVENT_PANEL);
  } else if (Array.isArray(eventView)) {
    activePanels.push(...eventView);
  }

  return activePanels;
}
;// CONCATENATED MODULE: ./src/hooks/timezone/useEventsWithTimezone.ts








function useEventsWithTimezone(events) {
  const primaryTimezoneName = useStore(primaryTimezoneSelector);
  const tzConverter = useTZConverter();
  return F(() => {
    if (primaryTimezoneName === 'Local') {
      return events;
    }

    const isSystemUsingDST = isUsingDST(new date_TZDate());
    const {
      timedEvents = createEventCollection(),
      totalEvents = createEventCollection()
    } = events.groupBy(eventModel => eventModel.category === 'time' ? 'timedEvents' : 'totalEvents');
    timedEvents.each(eventModel => {
      const clonedEventModel = object_clone(eventModel);
      let zonedStart = tzConverter(primaryTimezoneName, clonedEventModel.start);
      let zonedEnd = tzConverter(primaryTimezoneName, clonedEventModel.end); // Adjust the start and end time to the system timezone.

      if (isSystemUsingDST) {
        if (!isUsingDST(zonedStart)) {
          zonedStart = zonedStart.addHours(1);
        }

        if (!isUsingDST(zonedEnd)) {
          zonedEnd = zonedEnd.addHours(1);
        }
      } else {
        if (isUsingDST(zonedStart)) {
          zonedStart = zonedStart.addHours(-1);
        }

        if (isUsingDST(zonedEnd)) {
          zonedEnd = zonedEnd.addHours(-1);
        }
      }

      clonedEventModel.start = zonedStart;
      clonedEventModel.end = zonedEnd;
      totalEvents.add(clonedEventModel);
    });
    return totalEvents;
  }, [events, primaryTimezoneName, tzConverter]);
}
;// CONCATENATED MODULE: ./src/hooks/calendar/useCalendarData.ts




function useCalendarData(calendar) {
  for (var _len = arguments.length, filters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    filters[_key - 1] = arguments[_key];
  }

  const filteredEvents = F(() => calendar.events.filter(Collection.and(...filters)), [calendar.events, filters]);
  const filteredEventsWithTimezone = useEventsWithTimezone(filteredEvents);
  return F(() => ({ ...calendar,
    events: filteredEventsWithTimezone
  }), [calendar, filteredEventsWithTimezone]);
}
;// CONCATENATED MODULE: ./src/hooks/timeGrid/useTimeGridScrollSync.ts





function isTimeGridDraggingType(draggingItemType) {
  return /^(event|gridSelection)\/timeGrid/.test(draggingItemType !== null && draggingItemType !== void 0 ? draggingItemType : '');
}

function useTimeGridScrollSync(scrollArea, rowCount) {
  useTransientUpdate(dndSelector, _ref => {
    let {
      y,
      draggingItemType,
      draggingState
    } = _ref;

    if (isPresent(scrollArea) && isTimeGridDraggingType(draggingItemType) && draggingState === DraggingState.DRAGGING && isPresent(y)) {
      const {
        offsetTop,
        offsetHeight,
        scrollHeight
      } = scrollArea; // Set minimum scroll boundary to the height of one row.

      const scrollBoundary = Math.floor(scrollHeight / rowCount);
      const layoutHeight = offsetTop + offsetHeight;

      if (y < offsetTop + scrollBoundary) {
        const scrollDiff = y - (offsetTop + scrollBoundary);
        scrollArea.scrollTop = Math.max(0, scrollArea.scrollTop + scrollDiff);
      } else if (y > layoutHeight - scrollBoundary) {
        const scrollDiff = y - (layoutHeight - scrollBoundary);
        scrollArea.scrollTop = Math.min(offsetHeight, scrollArea.scrollTop + scrollDiff);
      }
    }
  });
}
;// CONCATENATED MODULE: ./src/hooks/timeGrid/useTimezoneLabelsTop.ts





function timegridHeightSelector(state) {
  var _state$weekViewLayout, _state$weekViewLayout2, _state$weekViewLayout3;

  // TODO: change `dayGridRows` to `panels`
  return (_state$weekViewLayout = state.weekViewLayout) === null || _state$weekViewLayout === void 0 ? void 0 : (_state$weekViewLayout2 = _state$weekViewLayout.dayGridRows) === null || _state$weekViewLayout2 === void 0 ? void 0 : (_state$weekViewLayout3 = _state$weekViewLayout2.time) === null || _state$weekViewLayout3 === void 0 ? void 0 : _state$weekViewLayout3.height;
}

function useTimezoneLabelsTop(timePanel) {
  const timeGridPanelHeight = useStore(timegridHeightSelector);
  const [stickyTop, setStickyTop] = hooks_module_y(null);
  hooks_module_h(() => {
    if (isPresent(timeGridPanelHeight) && timePanel) {
      setStickyTop(timePanel.offsetTop);
    }
  }, [timeGridPanelHeight, timePanel]);
  return stickyTop;
}
;// CONCATENATED MODULE: ./src/components/view/day.tsx


























function useDayViewState() {
  const calendar = useStore(calendarSelector);
  const options = useStore(optionsSelector);
  const {
    dayGridRows: gridRowLayout,
    lastPanelType
  } = useStore(weekViewLayoutSelector);
  const {
    renderDate
  } = useStore(viewSelector);
  return F(() => ({
    calendar,
    options,
    gridRowLayout,
    lastPanelType,
    renderDate
  }), [calendar, options, gridRowLayout, lastPanelType, renderDate]);
}

function day_Day() {
  var _options$week$dayName, _options$week;

  const {
    calendar,
    options,
    gridRowLayout,
    lastPanelType,
    renderDate
  } = useDayViewState();
  const primaryTimezoneName = useStore(primaryTimezoneSelector);
  const gridHeaderMarginLeft = useTheme(hooks_module_T(theme => theme.week.dayGridLeft.width, []));
  const [timePanel, setTimePanelRef] = useDOMNode();
  const weekOptions = options.week;
  const {
    narrowWeekend,
    startDayOfWeek,
    workweek,
    hourStart,
    hourEnd,
    eventView,
    taskView
  } = weekOptions;
  const days = F(() => [renderDate], [renderDate]);
  const dayNames = getDayNames(days, (_options$week$dayName = (_options$week = options.week) === null || _options$week === void 0 ? void 0 : _options$week.dayNames) !== null && _options$week$dayName !== void 0 ? _options$week$dayName : []);
  const {
    rowStyleInfo,
    cellWidthMap
  } = getRowStyleInfo(days.length, narrowWeekend, startDayOfWeek, workweek);
  const calendarData = useCalendarData(calendar, options.eventFilter);
  const dayGridEvents = F(() => {
    const getFilterRange = () => {
      if (primaryTimezoneName === 'Local') {
        return [toStartOfDay(days[0]), toEndOfDay(days[0])];
      } // NOTE: Extend filter range because of timezone offset differences


      return [toStartOfDay(addDate(days[0], -1)), toEndOfDay(addDate(days[0], 1))];
    };

    const [weekStartDate, weekEndDate] = getFilterRange();
    return getWeekViewEvents(days, calendarData, {
      narrowWeekend,
      hourStart,
      hourEnd,
      weekStartDate,
      weekEndDate
    });
  }, [calendarData, days, hourEnd, hourStart, narrowWeekend, primaryTimezoneName]);
  const timeGridData = F(() => createTimeGridData(days, {
    hourStart,
    hourEnd,
    narrowWeekend
  }), [days, hourEnd, hourStart, narrowWeekend]);
  const activePanels = getActivePanels(taskView, eventView);
  const gridRows = activePanels.map(key => {
    var _gridRowLayout$rowTyp, _gridRowLayout$rowTyp2;

    if (key === 'time') {
      return null;
    }

    const rowType = key;
    return h(Panel, {
      key: rowType,
      name: rowType,
      resizable: rowType !== lastPanelType
    }, rowType === 'allday' ? h(AlldayGridRow, {
      events: dayGridEvents[rowType],
      rowStyleInfo: rowStyleInfo,
      gridColWidthMap: cellWidthMap,
      weekDates: days,
      height: (_gridRowLayout$rowTyp = gridRowLayout[rowType]) === null || _gridRowLayout$rowTyp === void 0 ? void 0 : _gridRowLayout$rowTyp.height,
      options: weekOptions
    }) : h(OtherGridRow, {
      category: rowType,
      events: dayGridEvents[rowType],
      weekDates: days,
      height: (_gridRowLayout$rowTyp2 = gridRowLayout[rowType]) === null || _gridRowLayout$rowTyp2 === void 0 ? void 0 : _gridRowLayout$rowTyp2.height,
      options: weekOptions,
      gridColWidthMap: cellWidthMap
    }));
  });
  useTimeGridScrollSync(timePanel, timeGridData.rows.length);
  const stickyTop = useTimezoneLabelsTop(timePanel);
  return h(Layout, {
    className: cls('day-view'),
    autoAdjustPanels: true
  }, h(Panel, {
    name: "day-view-day-names",
    initialHeight: WEEK_DAY_NAME_HEIGHT + WEEK_DAY_NAME_BORDER
  }, h(GridHeader, {
    type: "week",
    dayNames: dayNames,
    marginLeft: gridHeaderMarginLeft,
    rowStyleInfo: rowStyleInfo
  })), gridRows, activePanels.includes('time') ? h(Panel, {
    name: "time",
    autoSize: 1,
    ref: setTimePanelRef
  }, h(TimeGrid, {
    events: dayGridEvents.time,
    timeGridData: timeGridData
  }), h(TimezoneLabels, {
    top: stickyTop
  })) : null);
}
;// CONCATENATED MODULE: ./src/components/dayGridMonth/accumulatedGridSelection.tsx






function AccumulatedGridSelection(_ref) {
  let {
    rowIndex,
    weekDates,
    narrowWeekend
  } = _ref;
  const gridSelectionDataByRow = useStore(hooks_module_T(state => state.gridSelection.accumulated.dayGridMonth.map(gridSelection => dayGridMonthSelectionHelper.calculateSelection(gridSelection, rowIndex, weekDates.length)), [rowIndex, weekDates]));
  return h("div", {
    className: cls('accumulated-grid-selection')
  }, gridSelectionDataByRow.map(gridSelectionData => gridSelectionData ? h(GridSelection, {
    type: "accumulated",
    gridSelectionData: gridSelectionData,
    weekDates: weekDates,
    narrowWeekend: narrowWeekend
  }) : null));
}
;// CONCATENATED MODULE: ./src/components/dayGridMonth/moreEventsButton.tsx




function MoreEventsButton(_ref) {
  let {
    type,
    number,
    onClickButton,
    className
  } = _ref;
  const {
    reset
  } = useDispatch('dnd'); // prevent unexpected grid selection when clicking on the button

  const handleMouseDown = e => {
    e.stopPropagation();
  };

  const handleClick = () => {
    reset();
    onClickButton();
  };

  const exceedButtonTemplate = "monthGrid".concat(type === CellBarType.header ? 'Header' : 'Footer', "Exceed");
  return h("button", {
    type: "button",
    onMouseDown: handleMouseDown,
    onClick: handleClick,
    className: className
  }, h(Template, {
    template: exceedButtonTemplate,
    param: number
  }));
}
;// CONCATENATED MODULE: ./src/components/dayGridMonth/cellHeader.tsx















function getDateColor(_ref) {
  let {
    date,
    theme,
    renderDate,
    isToday
  } = _ref;
  const dayIndex = date.getDay();
  const thisMonth = renderDate.getMonth();
  const isSameMonth = thisMonth === date.getMonth();
  const {
    common: {
      holiday,
      saturday,
      today,
      dayName
    },
    month: {
      dayExceptThisMonth,
      holidayExceptThisMonth
    }
  } = theme;

  if (isToday) {
    return today.color;
  }

  if (isSunday(dayIndex)) {
    return isSameMonth ? holiday.color : holidayExceptThisMonth.color;
  }

  if (isSaturday(dayIndex)) {
    return isSameMonth ? saturday.color : dayExceptThisMonth.color;
  }

  if (!isSameMonth) {
    return dayExceptThisMonth.color;
  }

  return dayName.color;
}

function useCellHeaderTheme() {
  const common = useCommonTheme();
  const month = useMonthTheme();
  return F(() => ({
    common,
    month
  }), [common, month]);
}

function CellHeader(_ref2) {
  let {
    type = CellBarType.header,
    exceedCount = 0,
    date,
    onClickExceedCount
  } = _ref2;
  const {
    renderDate
  } = useStore(viewSelector);
  const [, getNow] = usePrimaryTimezone();
  const theme = useCellHeaderTheme();
  const height = theme.month.gridCell["".concat(type, "Height")];
  const ymd = datetime_toFormat(date, 'YYYYMMDD');
  const todayYmd = datetime_toFormat(getNow(), 'YYYYMMDD');
  const isToday = ymd === todayYmd;
  const templateParam = {
    date: datetime_toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    hiddenEventCount: exceedCount,
    isOtherMonth: date.getMonth() !== renderDate.getMonth(),
    isToday: ymd === todayYmd,
    month: date.getMonth(),
    ymd
  };
  const gridCellDateStyle = {
    color: getDateColor({
      date,
      theme,
      isToday,
      renderDate
    })
  };
  const monthGridTemplate = "monthGrid".concat(capitalize(type));

  if (type_isNil(height)) {
    return null;
  }

  return h("div", {
    className: cls("grid-cell-".concat(type)),
    style: {
      height
    }
  }, h("span", {
    className: cls('grid-cell-date'),
    style: gridCellDateStyle
  }, h(Template, {
    template: monthGridTemplate,
    param: templateParam
  })), exceedCount ? h(MoreEventsButton, {
    type: type,
    number: exceedCount,
    onClickButton: onClickExceedCount,
    className: cls('grid-cell-more-events')
  }) : null);
}
;// CONCATENATED MODULE: ./src/components/dayGridMonth/gridCell.tsx
















function getSeeMorePopupSize(_ref) {
  let {
    grid,
    offsetWidth,
    eventLength,
    layerSize
  } = _ref;
  const minHeight = getSize(grid).height + MONTH_MORE_VIEW_PADDING * 2;
  let width = offsetWidth + MONTH_MORE_VIEW_PADDING * 2;
  const {
    width: moreViewWidth,
    height: moreViewHeight
  } = layerSize;
  const MAX_DISPLAY_EVENT_COUNT = 10;
  width = Math.max(width, MONTH_MORE_VIEW_MIN_WIDTH);
  let height = MONTH_MORE_VIEW_HEADER_HEIGHT + MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM + MONTH_MORE_VIEW_PADDING;
  const eventHeight = MONTH_EVENT_HEIGHT + MONTH_EVENT_MARGIN_TOP;

  if (eventLength <= MAX_DISPLAY_EVENT_COUNT) {
    height += eventHeight * eventLength;
  } else {
    height += eventHeight * MAX_DISPLAY_EVENT_COUNT;
  }

  if (moreViewWidth) {
    width = moreViewWidth;
  }

  if (moreViewHeight) {
    height = moreViewHeight;
  }

  if (isNaN(height) || height < minHeight) {
    height = minHeight;
  }

  return {
    width,
    height
  };
}

function getSeeMorePopupPosition(popupSize, appContainerSize, cellRect) {
  const {
    width: containerWidth,
    height: containerHeight,
    left: containerLeft,
    top: containerTop
  } = appContainerSize;
  const {
    width: popupWidth,
    height: popupHeight
  } = popupSize;
  const containerRight = containerLeft + containerWidth;
  const containerBottom = containerTop + containerHeight;
  let left = cellRect.left + cellRect.width / 2 - popupWidth / 2;
  let {
    top
  } = cellRect;
  const isLeftOutOfContainer = left < containerLeft;
  const isRightOutOfContainer = left + popupWidth > containerRight;
  const isUpperOutOfContainer = top < containerTop;
  const isLowerOutOfContainer = top + popupHeight > containerBottom;

  if (isLeftOutOfContainer) {
    left = containerLeft;
  }

  if (isRightOutOfContainer) {
    left = containerRight - popupWidth;
  }

  if (isUpperOutOfContainer) {
    top = containerTop;
  }

  if (isLowerOutOfContainer) {
    top = containerBottom - popupHeight;
  }

  return {
    top: top + window.scrollY,
    left: left + window.scrollX
  };
}

function getSeeMorePopupRect(_ref2) {
  let {
    layoutContainer,
    cell,
    popupSize
  } = _ref2;
  const containerRect = layoutContainer.getBoundingClientRect();
  const cellRect = cell.getBoundingClientRect();
  const popupPosition = getSeeMorePopupPosition(popupSize, containerRect, cellRect);
  return { ...popupSize,
    ...popupPosition
  };
}

function usePopupPosition(eventLength, parentContainer, layoutContainer) {
  const {
    width: moreViewWidth,
    height: moreViewHeight
  } = useTheme(monthMoreViewSelector);
  const [container, containerRefCallback] = useDOMNode();
  const [popupPosition, setPopupPosition] = hooks_module_y(null);
  hooks_module_(() => {
    if (layoutContainer && parentContainer && container) {
      const popupSize = getSeeMorePopupSize({
        grid: parentContainer,
        offsetWidth: container.offsetWidth,
        eventLength,
        layerSize: {
          width: moreViewWidth,
          height: moreViewHeight
        }
      });
      const rect = getSeeMorePopupRect({
        cell: container,
        layoutContainer,
        popupSize
      });
      setPopupPosition(rect);
    }
  }, [layoutContainer, container, eventLength, parentContainer, moreViewWidth, moreViewHeight]);
  return {
    popupPosition,
    containerRefCallback
  };
}

function weekendBackgroundColorSelector(theme) {
  return theme.month.weekend.backgroundColor;
}

function gridCell_GridCell(_ref3) {
  let {
    date,
    events = [],
    style,
    parentContainer,
    contentAreaHeight
  } = _ref3;
  const layoutContainer = useLayoutContainer();
  const {
    showSeeMorePopup
  } = useDispatch('popup');
  const backgroundColor = useTheme(weekendBackgroundColorSelector);
  const {
    popupPosition,
    containerRefCallback
  } = usePopupPosition(events.length, parentContainer, layoutContainer);
  const onOpenSeeMorePopup = hooks_module_T(() => {
    if (popupPosition) {
      showSeeMorePopup({
        date,
        popupPosition,
        events
      });
    }
  }, [date, events, popupPosition, showSeeMorePopup]);
  const exceedCount = getExceedCount(events, contentAreaHeight, MONTH_EVENT_HEIGHT + MONTH_EVENT_MARGIN_TOP);
  return h("div", {
    className: cls('daygrid-cell'),
    style: { ...style,
      backgroundColor: isWeekend(date.getDay()) ? backgroundColor : 'inherit'
    },
    ref: containerRefCallback
  }, h(CellHeader, {
    type: CellBarType.header,
    exceedCount: exceedCount,
    date: date,
    onClickExceedCount: onOpenSeeMorePopup
  }), h(CellHeader, {
    type: CellBarType.footer,
    exceedCount: exceedCount,
    date: date,
    onClickExceedCount: onOpenSeeMorePopup
  }));
}
;// CONCATENATED MODULE: ./src/components/dayGridMonth/gridRow.tsx









const GridRow = compat_module_g(function GridRow(_ref) {
  let {
    week,
    rowInfo,
    gridDateEventModelMap = {},
    contentAreaHeight
  } = _ref;
  const [container, containerRefCallback] = useDOMNode();
  const border = useTheme(hooks_module_T(theme => theme.common.border, []));
  return h("div", {
    className: cls('weekday-grid'),
    style: {
      borderTop: border
    },
    ref: containerRefCallback
  }, week.map((date, columnIndex) => {
    const dayIndex = date.getDay();
    const {
      width,
      left
    } = rowInfo[columnIndex];
    const ymd = datetime_toFormat(toStartOfDay(date), 'YYYYMMDD');
    return h(gridCell_GridCell, {
      key: "daygrid-cell-".concat(dayIndex),
      date: date,
      style: {
        width: toPercent(width),
        left: toPercent(left)
      },
      parentContainer: container,
      events: gridDateEventModelMap[ymd],
      contentAreaHeight: contentAreaHeight
    });
  }));
});
;// CONCATENATED MODULE: ./src/components/dayGridMonth/gridSelectionByRow.tsx






function GridSelectionByRow(_ref) {
  let {
    weekDates,
    narrowWeekend,
    rowIndex
  } = _ref;
  const gridSelectionDataByRow = useStore(hooks_module_T(state => dayGridMonthSelectionHelper.calculateSelection(state.gridSelection.dayGridMonth, rowIndex, weekDates.length), [rowIndex, weekDates.length]));

  if (type_isNil(gridSelectionDataByRow)) {
    return null;
  }

  return h(GridSelection, {
    type: "month",
    gridSelectionData: gridSelectionDataByRow,
    weekDates: weekDates,
    narrowWeekend: narrowWeekend
  });
}
;// CONCATENATED MODULE: ./src/components/dayGridMonth/monthEvents.tsx







const MonthEvents = compat_module_g(function MonthEvents(_ref) {
  let {
    contentAreaHeight,
    eventHeight = EVENT_HEIGHT,
    events,
    name,
    className
  } = _ref;
  const {
    headerHeight
  } = useTheme(monthGridCellSelector);
  const dayEvents = events.filter(isWithinHeight(contentAreaHeight, eventHeight + MONTH_EVENT_MARGIN_TOP)).map(uiModel => h(HorizontalEvent, {
    key: "".concat(name, "-DayEvent-").concat(uiModel.cid()),
    uiModel: uiModel,
    eventHeight: eventHeight,
    headerHeight: headerHeight !== null && headerHeight !== void 0 ? headerHeight : MONTH_CELL_BAR_HEIGHT
  }));
  return h("div", {
    className: className
  }, dayEvents);
});
;// CONCATENATED MODULE: ./src/hooks/dayGridMonth/useDayGridMonthEventMove.ts









function useDayGridMonthEventMove(_ref) {
  let {
    dateMatrix,
    rowInfo,
    gridPositionFinder,
    rowIndex
  } = _ref;
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: movingEvent,
    clearDraggingEvent
  } = useDraggingEvent('dayGrid', 'move');
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const movingEventUIModel = F(() => {
    let shadowEventUIModel = null;

    if (movingEvent && (currentGridPos === null || currentGridPos === void 0 ? void 0 : currentGridPos.rowIndex) === rowIndex) {
      var _currentGridPos$colum, _currentGridPos$colum2;

      shadowEventUIModel = movingEvent;
      shadowEventUIModel.left = rowInfo[(_currentGridPos$colum = currentGridPos === null || currentGridPos === void 0 ? void 0 : currentGridPos.columnIndex) !== null && _currentGridPos$colum !== void 0 ? _currentGridPos$colum : 0].left;
      shadowEventUIModel.width = rowInfo[(_currentGridPos$colum2 = currentGridPos === null || currentGridPos === void 0 ? void 0 : currentGridPos.columnIndex) !== null && _currentGridPos$colum2 !== void 0 ? _currentGridPos$colum2 : 0].width;
    }

    return shadowEventUIModel;
  }, [movingEvent, currentGridPos === null || currentGridPos === void 0 ? void 0 : currentGridPos.rowIndex, currentGridPos === null || currentGridPos === void 0 ? void 0 : currentGridPos.columnIndex, rowIndex, rowInfo]);
  useWhen(() => {
    const shouldUpdate = !isDraggingCanceled && isPresent(movingEventUIModel) && isPresent(currentGridPos);

    if (shouldUpdate) {
      const preStartDate = movingEventUIModel.model.getStarts();
      const eventDuration = movingEventUIModel.duration();
      const currentDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.columnIndex];
      const timeOffsetPerDay = getDateDifference(currentDate, preStartDate) * MS_PER_DAY;
      const newStartDate = new date_TZDate(preStartDate.getTime() + timeOffsetPerDay);
      const newEndDate = new date_TZDate(newStartDate.getTime() + eventDuration);
      eventBus.fire('beforeUpdateEvent', {
        event: movingEventUIModel.model.toEventObject(),
        changes: {
          start: newStartDate,
          end: newEndDate
        }
      });
    }

    clearDraggingEvent();
    clearCurrentGridPos();
  }, isDraggingEnd);
  return movingEventUIModel;
}
;// CONCATENATED MODULE: ./src/components/dayGridMonth/movingEventShadow.tsx






function dayGridMonth_movingEventShadow_MovingEventShadow(_ref) {
  let {
    dateMatrix,
    gridPositionFinder,
    rowInfo,
    rowIndex
  } = _ref;
  const movingEvent = useDayGridMonthEventMove({
    dateMatrix,
    rowInfo,
    gridPositionFinder,
    rowIndex
  });

  if (type_isNil(movingEvent)) {
    return null;
  }

  return h(HorizontalEvent, {
    uiModel: movingEvent,
    movingLeft: movingEvent.left,
    eventHeight: EVENT_HEIGHT,
    headerHeight: MONTH_CELL_PADDING_TOP + MONTH_CELL_BAR_HEIGHT
  });
}
;// CONCATENATED MODULE: ./src/hooks/dayGridMonth/useDayGridMonthEventResize.ts










function getRowPosOfUIModel(uiModel, dateRow) {
  const startColumnIndex = Math.max(getGridDateIndex(uiModel.getStarts(), dateRow), 0);
  const endColumnIndex = getGridDateIndex(uiModel.getEnds(), dateRow);
  return {
    startColumnIndex,
    endColumnIndex
  };
}

function useDayGridMonthEventResize(_ref) {
  let {
    dateMatrix,
    gridPositionFinder,
    renderedUIModels,
    cellWidthMap,
    rowIndex
  } = _ref;
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: resizingStartUIModel,
    clearDraggingEvent
  } = useDraggingEvent('dayGrid', 'resize');
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const [guideProps, setGuideProps] = hooks_module_y(null); // Shadow -> Guide

  const clearStates = hooks_module_T(() => {
    setGuideProps(null);
    clearCurrentGridPos();
    clearDraggingEvent();
  }, [clearCurrentGridPos, clearDraggingEvent]);
  const baseResizingInfo = F(() => {
    if (type_isNil(resizingStartUIModel)) {
      return null;
    }
    /**
     * Filter UIModels that are made from the target event.
     */


    const resizeTargetUIModelRows = renderedUIModels.map(_ref2 => {
      let {
        uiModels
      } = _ref2;
      return uiModels.filter(uiModel => uiModel.cid() === resizingStartUIModel.cid());
    });
    const eventStartDateRowIndex = resizeTargetUIModelRows.findIndex(row => row.length > 0);
    const eventEndDateRowIndex = findLastIndex(resizeTargetUIModelRows, row => row.length > 0);
    const eventStartUIModelPos = getRowPosOfUIModel(resizeTargetUIModelRows[eventStartDateRowIndex][0], dateMatrix[eventStartDateRowIndex]);
    const eventEndUIModelPos = getRowPosOfUIModel(resizeTargetUIModelRows[eventEndDateRowIndex][0], dateMatrix[eventEndDateRowIndex]);
    return {
      eventStartDateColumnIndex: eventStartUIModelPos.startColumnIndex,
      eventStartDateRowIndex,
      eventEndDateColumnIndex: eventEndUIModelPos.endColumnIndex,
      eventEndDateRowIndex,
      resizeTargetUIModelRows
    };
  }, [dateMatrix, renderedUIModels, resizingStartUIModel]);
  const canCalculateProps = isPresent(baseResizingInfo) && isPresent(resizingStartUIModel) && isPresent(currentGridPos); // Calculate the first row of the dragging event

  hooks_module_(() => {
    if (canCalculateProps && rowIndex === baseResizingInfo.eventStartDateRowIndex) {
      const {
        eventStartDateRowIndex,
        eventStartDateColumnIndex
      } = baseResizingInfo;
      const clonedUIModel = baseResizingInfo.resizeTargetUIModelRows[eventStartDateRowIndex][0].clone();
      let height;

      if (eventStartDateRowIndex === currentGridPos.rowIndex) {
        height = cellWidthMap[eventStartDateColumnIndex][Math.max(eventStartDateColumnIndex, currentGridPos.columnIndex)];
      } else if (eventStartDateRowIndex > currentGridPos.rowIndex) {
        height = cellWidthMap[eventStartDateColumnIndex][eventStartDateColumnIndex];
      } else {
        height = cellWidthMap[eventStartDateColumnIndex][dateMatrix[rowIndex].length - 1];
        clonedUIModel.setUIProps({
          exceedRight: true
        });
      }

      setGuideProps([clonedUIModel, height]);
    }
  }, [baseResizingInfo, canCalculateProps, cellWidthMap, currentGridPos, dateMatrix, rowIndex]); // Calculate middle rows of the dragging event

  hooks_module_(() => {
    if (canCalculateProps && baseResizingInfo.eventStartDateRowIndex < rowIndex && rowIndex < currentGridPos.rowIndex) {
      const clonedUIModel = resizingStartUIModel.clone();
      clonedUIModel.setUIProps({
        left: 0,
        exceedLeft: true,
        exceedRight: true
      });
      setGuideProps([clonedUIModel, '100%']);
    }
  }, [baseResizingInfo, canCalculateProps, currentGridPos, resizingStartUIModel, rowIndex]); // Calculate the last row of the dragging event

  hooks_module_(() => {
    if (canCalculateProps && baseResizingInfo.eventStartDateRowIndex < currentGridPos.rowIndex && rowIndex === currentGridPos.rowIndex) {
      const clonedUIModel = resizingStartUIModel.clone();
      clonedUIModel.setUIProps({
        left: 0,
        exceedLeft: true
      });
      setGuideProps([clonedUIModel, cellWidthMap[0][currentGridPos.columnIndex]]);
    }
  }, [baseResizingInfo, canCalculateProps, cellWidthMap, currentGridPos, resizingStartUIModel, rowIndex]); // Reset props on out of bound

  hooks_module_(() => {
    if (canCalculateProps && rowIndex > baseResizingInfo.eventStartDateRowIndex && rowIndex > currentGridPos.rowIndex) {
      setGuideProps(null);
    }
  }, [canCalculateProps, currentGridPos, baseResizingInfo, rowIndex]);
  useWhen(() => {
    if (canCalculateProps) {
      /**
       * Is current grid position is the same or later comparing to the position of the start date?
       */
      const {
        eventStartDateColumnIndex,
        eventStartDateRowIndex
      } = baseResizingInfo;
      const shouldUpdate = !isDraggingCanceled && (currentGridPos.rowIndex === eventStartDateRowIndex && currentGridPos.columnIndex >= eventStartDateColumnIndex || currentGridPos.rowIndex > eventStartDateRowIndex);

      if (shouldUpdate) {
        const targetEndDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.columnIndex];
        eventBus.fire('beforeUpdateEvent', {
          event: resizingStartUIModel.model.toEventObject(),
          changes: {
            end: targetEndDate
          }
        });
      }
    }

    clearStates();
  }, isDraggingEnd);
  return guideProps;
}
;// CONCATENATED MODULE: ./src/components/dayGridMonth/resizingGuideByRow.tsx







function ResizingGuideByRow(_ref) {
  let {
    dateMatrix,
    cellWidthMap,
    gridPositionFinder,
    renderedUIModels,
    rowIndex
  } = _ref;
  const resizingGuideProps = useDayGridMonthEventResize({
    dateMatrix,
    gridPositionFinder,
    cellWidthMap,
    renderedUIModels,
    rowIndex
  });

  if (type_isNil(resizingGuideProps)) {
    return null;
  }

  const [uiModel, resizingWidth] = resizingGuideProps;
  return h("div", {
    className: cls('weekday-events')
  }, h(HorizontalEvent, {
    key: "resizing-event-".concat(uiModel.cid()),
    uiModel: uiModel,
    eventHeight: MONTH_EVENT_HEIGHT,
    headerHeight: MONTH_CELL_PADDING_TOP + MONTH_CELL_BAR_HEIGHT,
    resizingWidth: resizingWidth
  }));
}
;// CONCATENATED MODULE: ./src/components/dayGridMonth/dayGridMonth.tsx























const TOTAL_PERCENT_HEIGHT = 100;

function useCellContentAreaHeight(eventHeight) {
  const visibleEventCount = useStore(monthVisibleEventCountSelector);
  const {
    headerHeight: themeHeaderHeight,
    footerHeight: themeFooterHeight
  } = useTheme(monthGridCellSelector);
  const ref = hooks_module_s(null);
  const [cellContentAreaHeight, setCellContentAreaHeight] = hooks_module_y(0);
  hooks_module_(() => {
    if (ref.current) {
      const rowHeight = getSize(ref.current).height;
      const headerHeight = MONTH_CELL_PADDING_TOP + (themeHeaderHeight !== null && themeHeaderHeight !== void 0 ? themeHeaderHeight : MONTH_CELL_BAR_HEIGHT);
      const footerHeight = themeFooterHeight !== null && themeFooterHeight !== void 0 ? themeFooterHeight : 0;
      const baseContentAreaHeight = rowHeight - headerHeight - footerHeight;
      const visibleEventCountHeight = visibleEventCount * (eventHeight + MONTH_EVENT_MARGIN_TOP);
      setCellContentAreaHeight(Math.min(baseContentAreaHeight, visibleEventCountHeight));
    }
  }, [themeFooterHeight, themeHeaderHeight, eventHeight, visibleEventCount]);
  return {
    ref,
    cellContentAreaHeight
  };
}

function DayGridMonth(_ref) {
  let {
    dateMatrix = [],
    rowInfo = [],
    cellWidthMap = []
  } = _ref;
  const [gridContainer, setGridContainerRef] = useDOMNode();
  const calendar = useStore(calendarSelector); // TODO: event height need to be dynamic

  const {
    ref,
    cellContentAreaHeight
  } = useCellContentAreaHeight(MONTH_EVENT_HEIGHT);
  const {
    eventFilter,
    month: monthOptions,
    isReadOnly
  } = useStore(optionsSelector);
  const {
    narrowWeekend,
    startDayOfWeek
  } = monthOptions;
  const rowHeight = TOTAL_PERCENT_HEIGHT / dateMatrix.length;
  const gridPositionFinder = F(() => createGridPositionFinder({
    container: gridContainer,
    rowsCount: dateMatrix.length,
    columnsCount: dateMatrix[0].length,
    narrowWeekend,
    startDayOfWeek
  }), [dateMatrix, gridContainer, narrowWeekend, startDayOfWeek]);
  const calendarData = useCalendarData(calendar, eventFilter);
  const renderedEventUIModels = F(() => dateMatrix.map(week => getRenderedEventUIModels(week, calendarData, narrowWeekend)), [calendarData, dateMatrix, narrowWeekend]);
  const onMouseDown = useGridSelection({
    type: 'dayGridMonth',
    gridPositionFinder,
    dateCollection: dateMatrix,
    dateGetter: dayGridMonthSelectionHelper.getDateFromCollection,
    selectionSorter: dayGridMonthSelectionHelper.sortSelection
  });
  return h("div", {
    ref: setGridContainerRef,
    onMouseDown: passConditionalProp(!isReadOnly, onMouseDown),
    className: cls('month-daygrid')
  }, dateMatrix.map((week, rowIndex) => {
    const {
      uiModels,
      gridDateEventModelMap
    } = renderedEventUIModels[rowIndex];
    return h("div", {
      key: "dayGrid-events-".concat(rowIndex),
      className: cls('month-week-item'),
      style: {
        height: toPercent(rowHeight)
      },
      ref: ref
    }, h("div", {
      className: cls('weekday')
    }, h(GridRow, {
      gridDateEventModelMap: gridDateEventModelMap,
      week: week,
      rowInfo: rowInfo,
      contentAreaHeight: cellContentAreaHeight
    }), h(MonthEvents, {
      name: "month",
      events: uiModels,
      contentAreaHeight: cellContentAreaHeight,
      eventHeight: MONTH_EVENT_HEIGHT,
      className: cls('weekday-events')
    }), h(GridSelectionByRow, {
      weekDates: week,
      narrowWeekend: narrowWeekend,
      rowIndex: rowIndex
    }), h(AccumulatedGridSelection, {
      rowIndex: rowIndex,
      weekDates: week,
      narrowWeekend: narrowWeekend
    })), h(ResizingGuideByRow, {
      dateMatrix: dateMatrix,
      gridPositionFinder: gridPositionFinder,
      rowIndex: rowIndex,
      cellWidthMap: cellWidthMap,
      renderedUIModels: renderedEventUIModels
    }), h(dayGridMonth_movingEventShadow_MovingEventShadow, {
      dateMatrix: dateMatrix,
      gridPositionFinder: gridPositionFinder,
      rowIndex: rowIndex,
      rowInfo: rowInfo
    }));
  }));
}
;// CONCATENATED MODULE: ./src/components/view/month.tsx













function getMonthDayNames(options) {
  const {
    dayNames,
    startDayOfWeek,
    workweek
  } = options.month;
  const dayIndices = [...Array(7)].map((_, i) => (startDayOfWeek + i) % 7);
  const monthDayNames = dayIndices.map(i => ({
    day: i,
    label: capitalize(dayNames[i])
  }));
  return monthDayNames.filter(dayNameInfo => workweek ? !isWeekend(dayNameInfo.day) : true);
}

function Month() {
  const options = useStore(optionsSelector);
  const {
    renderDate
  } = useStore(viewSelector);
  const dayNames = getMonthDayNames(options);
  const monthOptions = options.month;
  const {
    narrowWeekend,
    startDayOfWeek,
    workweek
  } = monthOptions;
  const dateMatrix = F(() => createDateMatrixOfMonth(renderDate, monthOptions), [monthOptions, renderDate]);
  const {
    rowStyleInfo,
    cellWidthMap
  } = F(() => getRowStyleInfo(dayNames.length, narrowWeekend, startDayOfWeek, workweek), [dayNames.length, narrowWeekend, startDayOfWeek, workweek]);
  const rowInfo = rowStyleInfo.map((cellStyleInfo, index) => ({ ...cellStyleInfo,
    date: dateMatrix[0][index]
  }));
  return h(Layout, {
    className: cls('month')
  }, h(GridHeader, {
    type: "month",
    dayNames: dayNames,
    options: monthOptions,
    rowStyleInfo: rowStyleInfo
  }), h(DayGridMonth, {
    dateMatrix: dateMatrix,
    rowInfo: rowInfo,
    cellWidthMap: cellWidthMap
  }));
}
;// CONCATENATED MODULE: ./src/components/view/week.tsx



























function useWeekViewState() {
  const options = useStore(optionsSelector);
  const calendar = useStore(calendarSelector);
  const {
    dayGridRows: gridRowLayout,
    lastPanelType
  } = useStore(weekViewLayoutSelector);
  const {
    renderDate
  } = useStore(viewSelector);
  return F(() => ({
    options,
    calendar,
    gridRowLayout,
    lastPanelType,
    renderDate
  }), [calendar, gridRowLayout, lastPanelType, options, renderDate]);
}

function Week() {
  var _options$week$dayName, _options$week;

  const {
    options,
    calendar,
    gridRowLayout,
    lastPanelType,
    renderDate
  } = useWeekViewState();
  const gridHeaderMarginLeft = useTheme(hooks_module_T(theme => theme.week.dayGridLeft.width, []));
  const primaryTimezoneName = useStore(primaryTimezoneSelector);
  const [timePanel, setTimePanelRef] = useDOMNode();
  const weekOptions = options.week;
  const {
    narrowWeekend,
    startDayOfWeek,
    workweek,
    hourStart,
    hourEnd,
    eventView,
    taskView
  } = weekOptions;
  const weekDates = F(() => getWeekDates(renderDate, weekOptions), [renderDate, weekOptions]);
  const dayNames = getDayNames(weekDates, (_options$week$dayName = (_options$week = options.week) === null || _options$week === void 0 ? void 0 : _options$week.dayNames) !== null && _options$week$dayName !== void 0 ? _options$week$dayName : []);
  const {
    rowStyleInfo,
    cellWidthMap
  } = getRowStyleInfo(weekDates.length, narrowWeekend, startDayOfWeek, workweek);
  const calendarData = useCalendarData(calendar, options.eventFilter);
  const eventByPanel = F(() => {
    const getFilterRange = () => {
      if (primaryTimezoneName === 'Local') {
        return [toStartOfDay(first(weekDates)), toEndOfDay(last(weekDates))];
      } // NOTE: Extend filter range because of timezone offset differences


      return [toStartOfDay(addDate(first(weekDates), -1)), toEndOfDay(addDate(last(weekDates), 1))];
    };

    const [weekStartDate, weekEndDate] = getFilterRange();
    return getWeekViewEvents(weekDates, calendarData, {
      narrowWeekend,
      hourStart,
      hourEnd,
      weekStartDate,
      weekEndDate
    });
  }, [calendarData, hourEnd, hourStart, narrowWeekend, primaryTimezoneName, weekDates]);
  const timeGridData = F(() => createTimeGridData(weekDates, {
    hourStart,
    hourEnd,
    narrowWeekend
  }), [hourEnd, hourStart, narrowWeekend, weekDates]);
  const activePanels = getActivePanels(taskView, eventView);
  const dayGridRows = activePanels.map(key => {
    var _gridRowLayout$rowTyp, _gridRowLayout$rowTyp2;

    if (key === 'time') {
      return null;
    }

    const rowType = key;
    return h(Panel, {
      name: rowType,
      key: rowType,
      resizable: rowType !== lastPanelType
    }, rowType === 'allday' ? h(AlldayGridRow, {
      events: eventByPanel[rowType],
      rowStyleInfo: rowStyleInfo,
      gridColWidthMap: cellWidthMap,
      weekDates: weekDates,
      height: (_gridRowLayout$rowTyp = gridRowLayout[rowType]) === null || _gridRowLayout$rowTyp === void 0 ? void 0 : _gridRowLayout$rowTyp.height,
      options: weekOptions
    }) : h(OtherGridRow, {
      category: rowType,
      events: eventByPanel[rowType],
      weekDates: weekDates,
      height: (_gridRowLayout$rowTyp2 = gridRowLayout[rowType]) === null || _gridRowLayout$rowTyp2 === void 0 ? void 0 : _gridRowLayout$rowTyp2.height,
      options: weekOptions,
      gridColWidthMap: cellWidthMap
    }));
  });
  const hasTimePanel = F(() => activePanels.includes('time'), [activePanels]);
  useTimeGridScrollSync(timePanel, timeGridData.rows.length);
  const stickyTop = useTimezoneLabelsTop(timePanel);
  return h(Layout, {
    className: cls('week-view'),
    autoAdjustPanels: true
  }, h(Panel, {
    name: "week-view-day-names",
    initialHeight: WEEK_DAY_NAME_HEIGHT + WEEK_DAY_NAME_BORDER * 2
  }, h(GridHeader, {
    type: "week",
    dayNames: dayNames,
    marginLeft: gridHeaderMarginLeft,
    options: weekOptions,
    rowStyleInfo: rowStyleInfo
  })), dayGridRows, hasTimePanel ? h(Panel, {
    name: "time",
    autoSize: 1,
    ref: setTimePanelRef
  }, h(TimeGrid, {
    events: eventByPanel.time,
    timeGridData: timeGridData
  }), h(TimezoneLabels, {
    top: stickyTop
  })) : null);
}
;// CONCATENATED MODULE: ./src/components/view/main.tsx







const views = {
  month: Month,
  week: Week,
  day: day_Day
};
function Main() {
  const {
    currentView
  } = useStore(viewSelector);
  const CurrentViewComponent = F(() => views[currentView] || (() => null), [currentView]);
  return h(CurrentViewComponent, null);
}
;// CONCATENATED MODULE: ../../node_modules/preact-render-to-string/dist/index.mjs
var dist_r=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i,dist_n=/[&<>"]/;function dist_o(e){var t=String(e);return dist_n.test(t)?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):t}var dist_a=function(e,t){return String(e).replace(/(\n+)/g,"$1"+(t||"\t"))},dist_i=function(e,t,r){return String(e).length>(t||40)||!r&&-1!==String(e).indexOf("\n")||-1!==String(e).indexOf("<")},dist_l={};function dist_s(e){var t="";for(var n in e){var o=e[n];null!=o&&""!==o&&(t&&(t+=" "),t+="-"==n[0]?n:dist_l[n]||(dist_l[n]=n.replace(/([A-Z])/g,"-$1").toLowerCase()),t+=": ",t+=o,"number"==typeof o&&!1===dist_r.test(n)&&(t+="px"),t+=";")}return t||void 0}function dist_f(e,t){for(var r in t)e[r]=t[r];return e}function dist_u(e,t){return Array.isArray(t)?t.reduce(dist_u,e):null!=t&&!1!==t&&e.push(t),e}var dist_c={shallow:!0},dist_p=[],dist_=/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/,dist_d=/[\s\n\\/='"\0<>]/;function dist_v(){this.__d=!0}dist_m.render=dist_m;var dist_g=function(e,t){return dist_m(e,t,dist_c)},dist_h=[];function dist_m(t,r,n){r=r||{},n=n||{};var o=preact_module_l.__s;preact_module_l.__s=!0;var a=dist_x(t,r,n);return preact_module_l.__c&&preact_module_l.__c(t,dist_h),dist_h.length=0,preact_module_l.__s=o,a}function dist_x(r,n,l,c,g,h){if(null==r||"boolean"==typeof r)return"";if("object"!=typeof r)return dist_o(r);var m=l.pretty,y=m&&"string"==typeof m?m:"\t";if(Array.isArray(r)){for(var b="",S=0;S<r.length;S++)m&&S>0&&(b+="\n"),b+=dist_x(r[S],n,l,c,g,h);return b}var k,w=r.type,O=r.props,C=!1;if("function"==typeof w){if(C=!0,!l.shallow||!c&&!1!==l.renderRootComponent){if(w===p){var A=[];return dist_u(A,r.props.children),dist_x(A,n,l,!1!==l.shallowHighOrder,g,h)}var H,j=r.__c={__v:r,context:n,props:r.props,setState:dist_v,forceUpdate:dist_v,__d:!0,__h:[]};preact_module_l.__b&&preact_module_l.__b(r);var F=preact_module_l.__r;if(w.prototype&&"function"==typeof w.prototype.render){var M=w.contextType,T=M&&n[M.__c],$=null!=M?T?T.props.value:M.__:n;(j=r.__c=new w(O,$)).__v=r,j._dirty=j.__d=!0,j.props=O,null==j.state&&(j.state={}),null==j._nextState&&null==j.__s&&(j._nextState=j.__s=j.state),j.context=$,w.getDerivedStateFromProps?j.state=dist_f(dist_f({},j.state),w.getDerivedStateFromProps(j.props,j.state)):j.componentWillMount&&(j.componentWillMount(),j.state=j._nextState!==j.state?j._nextState:j.__s!==j.state?j.__s:j.state),F&&F(r),H=j.render(j.props,j.state,j.context)}else for(var L=w.contextType,E=L&&n[L.__c],D=null!=L?E?E.props.value:L.__:n,N=0;j.__d&&N++<25;)j.__d=!1,F&&F(r),H=w.call(r.__c,O,D);return j.getChildContext&&(n=dist_f(dist_f({},n),j.getChildContext())),preact_module_l.diffed&&preact_module_l.diffed(r),dist_x(H,n,l,!1!==l.shallowHighOrder,g,h)}w=(k=w).displayName||k!==Function&&k.name||function(e){var t=(Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/)||"")[1];if(!t){for(var r=-1,n=dist_p.length;n--;)if(dist_p[n]===e){r=n;break}r<0&&(r=dist_p.push(e)-1),t="UnnamedComponent"+r}return t}(k)}var P,R,U="<"+w;if(O){var W=Object.keys(O);l&&!0===l.sortAttributes&&W.sort();for(var q=0;q<W.length;q++){var z=W[q],I=O[z];if("children"!==z){if(!dist_d.test(z)&&(l&&l.allAttributes||"key"!==z&&"ref"!==z&&"__self"!==z&&"__source"!==z)){if("defaultValue"===z)z="value";else if("defaultChecked"===z)z="checked";else if("defaultSelected"===z)z="selected";else if("className"===z){if(void 0!==O.class)continue;z="class"}else g&&/^xlink:?./.test(z)&&(z=z.toLowerCase().replace(/^xlink:?/,"xlink:"));if("htmlFor"===z){if(O.for)continue;z="for"}"style"===z&&I&&"object"==typeof I&&(I=dist_s(I)),"a"===z[0]&&"r"===z[1]&&"boolean"==typeof I&&(I=String(I));var V=l.attributeHook&&l.attributeHook(z,I,n,l,C);if(V||""===V)U+=V;else if("dangerouslySetInnerHTML"===z)R=I&&I.__html;else if("textarea"===w&&"value"===z)P=I;else if((I||0===I||""===I)&&"function"!=typeof I){if(!(!0!==I&&""!==I||(I=z,l&&l.xml))){U=U+" "+z;continue}if("value"===z){if("select"===w){h=I;continue}"option"===w&&h==I&&void 0===O.selected&&(U+=" selected")}U=U+" "+z+'="'+dist_o(I)+'"'}}}else P=I}}if(m){var Z=U.replace(/\n\s*/," ");Z===U||~Z.indexOf("\n")?m&&~U.indexOf("\n")&&(U+="\n"):U=Z}if(U+=">",dist_d.test(w))throw new Error(w+" is not a valid HTML tag name in "+U);var B,G=dist_.test(w)||l.voidElements&&l.voidElements.test(w),J=[];if(R)m&&dist_i(R)&&(R="\n"+y+dist_a(R,y)),U+=R;else if(null!=P&&dist_u(B=[],P).length){for(var K=m&&~U.indexOf("\n"),Q=!1,X=0;X<B.length;X++){var Y=B[X];if(null!=Y&&!1!==Y){var ee=dist_x(Y,n,l,!0,"svg"===w||"foreignObject"!==w&&g,h);if(m&&!K&&dist_i(ee)&&(K=!0),ee)if(m){var te=ee.length>0&&"<"!=ee[0];Q&&te?J[J.length-1]+=ee:J.push(ee),Q=te}else J.push(ee)}}if(m&&K)for(var re=J.length;re--;)J[re]="\n"+y+dist_a(J[re],y)}if(J.length||R)U+=J.join("");else if(l&&l.xml)return U.substring(0,U.length-1)+" />";return!G||B||R?(m&&~U.indexOf("\n")&&(U+="\n"),U=U+"</"+w+">"):U=U.replace(/>$/," />"),U}dist_m.shallowRender=dist_g;/* harmony default export */ var dist = (dist_m);
//# sourceMappingURL=index.module.js.map

// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/request/sendHostname.js
var sendHostname = __webpack_require__(1391);
var sendHostname_default = /*#__PURE__*/__webpack_require__.n(sendHostname);
;// CONCATENATED MODULE: ./src/calendarContainer.tsx





function CalendarContainer(_ref) {
  let {
    theme,
    store,
    eventBus,
    children
  } = _ref;
  return h(EventBusProvider, {
    value: eventBus
  }, h(ThemeProvider, {
    store: theme
  }, h(StoreProvider, {
    store: store
  }, h(FloatingLayerProvider, null, children))));
}
;// CONCATENATED MODULE: ./src/constants/statistics.ts
const GA_TRACKING_ID = 'UA-129951699-1';
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/customEvents/customEvents.js
var customEvents = __webpack_require__(2278);
var customEvents_default = /*#__PURE__*/__webpack_require__.n(customEvents);
;// CONCATENATED MODULE: ./src/utils/eventBus.ts


class EventBusImpl extends (customEvents_default()) {
  on(eventName, handler) {
    super.on(eventName, handler);
    return this;
  }

  off(eventName, handler) {
    super.off(eventName, handler);
    return this;
  }

  fire(eventName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    super.fire(eventName, ...args);
    return this;
  }

  once(eventName, handler) {
    super.once(eventName, handler);
    return this;
  }

}
;// CONCATENATED MODULE: ./src/factory/calendarCore.tsx


















/**
 * {@link https://nhn.github.io/tui.code-snippet/latest/CustomEvents CustomEvents} document at {@link https://github.com/nhn/tui.code-snippet tui-code-snippet}
 * @typedef {CustomEvents} CustomEvents
 */

/**
 * Define Calendars to group events.
 *
 * @typedef {object} CalendarInfo
 * @property {string} id - Calendar id.
 * @property {string} name - Calendar name.
 * @property {string} color - Text color of events.
 * @property {string} borderColor - Left border color of events.
 * @property {string} backgroundColor - Background color of events.
 * @property {string} dragBackgroundColor - Background color of events during dragging.
 */

/**
 * Timezone options of the calendar instance.
 *
 * For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#timezone|Timezone options} in guide.
 *
 * @typedef {object} TimezoneOptions
 * @example
 * const calendar = new Calendar('#container', {
 *   timezone: {
 *     // @property {string} zones[].timezoneName - Timezone name. it should be one of IANA timezone names.
 *     // @property {string} [zones[].displayLabel] - Display label of timezone.
 *     // @property {string} [zones[].tooltip] - Tooltip of the element of the display label.
 *     zones: [
 *       {
 *         timezoneName: 'Asia/Seoul',
 *         displayLabel: 'UTC+9:00',
 *         tooltip: 'Seoul'
 *       },
 *       {
 *         timezoneName: 'Europe/London',
 *         displayLabel: 'UTC+1:00',
 *         tooltip: 'BST'
 *       }
 *     ],
 *     // This function will be called for rendering components for each timezone.
 *     // You don't have to use it if you're able to `Intl.DateTimeFormat` API with `timeZone` option.
 *     // this function should return timezone offset from UTC.
 *     // for instance, using moment-timezone:
 *     customOffsetCalculator: (timezoneName, timestamp) => {
 *       return moment.tz(timezoneName).utcOffset(timestamp);
 *     }
 *   }
 * });
 * @property {Array.<object>} zones - Timezone data.
 * @property {string} zones[].timezoneName - Timezone name. it should be one of IANA timezone names.
 * @property {string} [zones[].displayLabel] - Display label of timezone.
 * @property {string} [zones[].tooltip] - Tooltip of the element of the display label.
 * @property {function} customOffsetCalculator - Custom offset calculator when you're not able to leverage `Intl.DateTimeFormat` API.
 */

/**
 * Object to create/modify events.
 * @typedef {object} EventObject
 * @property {string} [id] - Event id.
 * @property {string} [calendarId] - Calendar id.
 * @property {string} [title] - Event title.
 * @property {string} [body] - Body content of the event.
 * @property {string} [isAllday] - Whether the event is all day or not.
 * @property {string|number|Date|TZDate} [start] - Start time of the event.
 * @property {string|number|Date|TZDate} [end] - End time of the event.
 * @property {number} [goingDuration] - Travel time which is taken to go in minutes.
 * @property {number} [comingDuration] - Travel time which is taken to come back in minutes.
 * @property {string} [location] - Location of the event.
 * @property {Array.<string>} [attendees] - Attendees of the event.
 * @property {string} [category] - Category of the event. Available categories are 'milestone', 'task', 'time' and 'allday'.
 * @property {string} [dueDateClass] - Classification of work events. (before work, before lunch, before work)
 * @property {string} [recurrenceRule] - Recurrence rule of the event.
 * @property {string} [state] - State of the event. Available states are 'Busy', 'Free'.
 * @property {boolean} [isVisible] - Whether the event is visible or not.
 * @property {boolean} [isPending] - Whether the event is pending or not.
 * @property {boolean} [isFocused] - Whether the event is focused or not.
 * @property {boolean} [isReadOnly] - Whether the event is read only or not.
 * @property {boolean} [isPrivate] - Whether the event is private or not.
 * @property {string} [color] - Text color of the event.
 * @property {string} [backgroundColor] - Background color of the event.
 * @property {string} [dragBackgroundColor] - Background color of the event during dragging.
 * @property {string} [borderColor] - Left border color of the event.
 * @property {object} [customStyle] - Custom style of the event. The key of CSS property should be camelCase (e.g. {'fontSize': '12px'})
 * @property {*} [raw] - Raw data of the event. it's an arbitrary property for anything.
 */

/**
 * CalendarCore class
 *
 * @class CalendarCore
 * @mixes CustomEvents
 * @param {string|Element} container - container element or selector.
 * @param {object} options - calendar options. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/calendar.md|Calendar options} in guide.
 *   @param {string} [options.defaultView="week"] - Initial view type. Available values are: 'day', 'week', 'month'.
 *   @param {boolean} [options.useFormPopup=false] - Whether to use the default form popup when creating/modifying events.
 *   @param {boolean} [options.useDetailPopup=false] - Whether to use the default detail popup when clicking events.
 *   @param {boolean} [options.isReadOnly=false] - Whether the calendar is read-only.
 *   @param {boolean} [options.usageStatistics=true] - Whether to allow collect hostname and send the information to google analytics.
 *                                              For more information, check out the {@link https://github.com/nhn/tui.calendar/blob/main/apps/calendar/README.md#collect-statistics-on-the-use-of-open-source|documentation}.
 *   @param {function} [options.eventFilter] - A function that returns true if the event should be displayed. The default filter checks if the event's `isVisible` property is true.
 *   @param {object} [options.week] - Week option of the calendar instance.
 *     @param {number} [options.week.startDayOfWeek=0] - Start day of the week. Available values are 0 (Sunday) to 6 (Saturday).
 *     @param {Array.<string>} [options.week.dayNames] - Names of days of the week. Should be 7 items starting from Sunday to Saturday. If not specified, the default names are used.
 *                                               Default values are ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].
 *     @param {boolean} [options.week.workweek=false] - Whether to exclude Saturday and Sunday.
 *     @param {boolean} [options.week.showTimezoneCollapseButton=true] - Whether to show the timezone collapse button.
 *     @param {boolean} [options.week.timezonesCollapsed=false] - Whether to collapse the timezones.
 *     @param {number} [options.week.hourStart=0] - Start hour of the day. Available values are 0 to 24.
 *     @param {number} [options.week.hourEnd=24] - End hour of the day. Available values are 0 to 24. Must be greater than `hourStart`.
 *     @param {boolean} [options.week.narrowWeekend=false] - Whether to narrow down width of weekends to half.
 *     @param {boolean|Array.<string>} [options.week.eventView=true] - Determine which view to display events. Available values are 'allday' and 'time'. set to `false` to disable event view.
 *     @param {boolean|Array.<string>} [options.week.taskView=true] - Determine which view to display tasks. Available values are 'milestone' and 'task'. set to `false` to disable task view.
 *     @param {boolean|object} [options.week.collapseDuplicateEvents=false] - Whether to collapse duplicate events. If you want to filter duplicate events and choose the main event based on your requirements, set `getDuplicateEvents` and `getMainEvent`. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md#weekcollapseduplicateevents|Options} in guide.
 *   @param {object} options.month - Month option of the calendar instance.
 *     @param {number} [options.month.startDayOfWeek=0] - Start day of the week. Available values are 0 (Sunday) to 6 (Saturday).
 *     @param {Array.<string>} [options.month.dayNames] - Names of days of the week. Should be 7 items starting from Sunday to Saturday. If not specified, the default names are used.
 *                                                Default values are ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].
 *     @param {boolean} [options.month.workweek=false] - Whether to exclude Saturday and Sunday.
 *     @param {boolean} [options.month.narrowWeekend=false] - Whether to narrow down width of weekends to half.
 *     @param {number} [options.month.visibleWeeksCount=0] - Number of weeks to display. 0 means display all weeks.
 *   @param {Array.<CalendarInfo>} [options.calendars] - Calendars to group events.
 *   @param {boolean|object} [options.gridSelection=true] - Whether to enable grid selection. or it's option. it's enabled when the value is `true` and object and will be disabled when `isReadOnly` is true.
 *     @param {boolean} options.gridSelection.enableDbClick - Whether to enable double click to select area.
 *     @param {boolean} options.gridSelection.enableClick - Whether to enable click to select area.
 *   @param {TimezoneOptions} options.timezone - Timezone option of the calendar instance. For more information about timezone, check out the {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md|Options} in guide.
 *   @param {Theme} options.theme - Theme option of the calendar instance. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/theme.md|Theme} in guide.
 *   @param {TemplateConfig} options.template - Template option of the calendar instance. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/template.md|Template} in guide.
 */
class CalendarCore {
  /**
   * start and end date of weekly, monthly
   * @private
   */
  constructor(container) {
    var _document$querySelect, _document;

    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // NOTE: Handling server side rendering. When container is not specified,
    this.container = isString_default()(container) ? (_document$querySelect = (_document = document) === null || _document === void 0 ? void 0 : _document.querySelector(container)) !== null && _document$querySelect !== void 0 ? _document$querySelect : null : container;
    this.theme = initThemeStore(options.theme);
    this.eventBus = new EventBusImpl();
    this.store = initCalendarStore(options);
    this.renderRange = this.calculateRenderRange(toStartOfDay());
    addAttributeHooks(); // NOTE: To make sure the user really wants to do this. Ignore any invalid values.

    if (this.getStoreState().options.usageStatistics === true) {
      sendHostname_default()('calendar', GA_TRACKING_ID);
    }
  }

  getStoreState(group) {
    const state = this.store.getState();
    return group ? state[group] : state;
  }

  getStoreDispatchers(group) {
    const dispatchers = this.store.getState().dispatch;
    return group ? dispatchers[group] : dispatchers;
  }
  /**
   * Destroys the instance.
   */


  destroy() {
    if (this.container) {
      compat_module_un(this.container);
    }

    this.store.clearListeners();
    this.theme.clearListeners();
    this.eventBus.off();
    removeAttributeHooks();

    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        delete this[key];
      }
    }
  }

  calculateMonthRenderDate(_ref) {
    let {
      renderDate,
      offset,
      monthOptions
    } = _ref;
    let newRenderDate = new date_TZDate(renderDate);
    const {
      visibleWeeksCount
    } = monthOptions;

    if (visibleWeeksCount > 0) {
      newRenderDate = addDate(newRenderDate, offset * 7 * visibleWeeksCount);
    } else {
      newRenderDate = addMonths(newRenderDate, offset);
    }

    const dateMatrix = createDateMatrixOfMonth(newRenderDate, monthOptions);
    const [[start]] = dateMatrix;
    const end = last(last(dateMatrix));
    return {
      renderDate: newRenderDate,
      renderRange: {
        start,
        end
      }
    };
  }

  calculateWeekRenderDate(_ref2) {
    let {
      renderDate,
      offset,
      weekOptions
    } = _ref2;
    const newRenderDate = new date_TZDate(renderDate);
    newRenderDate.addDate(offset * 7);
    const weekDates = getWeekDates(newRenderDate, weekOptions);
    const [start] = weekDates;
    const end = last(weekDates);
    return {
      renderDate: newRenderDate,
      renderRange: {
        start,
        end
      }
    };
  }

  calculateDayRenderDate(_ref3) {
    let {
      renderDate,
      offset
    } = _ref3;
    const newRenderDate = new date_TZDate(renderDate);
    newRenderDate.addDate(offset);
    const start = toStartOfDay(newRenderDate);
    const end = toEndOfDay(newRenderDate);
    return {
      renderDate: newRenderDate,
      renderRange: {
        start,
        end
      }
    };
  }
  /**
   * Move the rendered date to the next/prev range.
   *
   * The range of movement differs depending on the current view, Basically:
   *   - In month view, it moves to the next/prev month.
   *   - In week view, it moves to the next/prev week.
   *   - In day view, it moves to the next/prev day.
   *
   * Also, the range depends on the options like how many visible weeks/months should be rendered.
   *
   * @param {number} offset The offset to move by.
   *
   * @example
   * // Move to the next month in month view.
   * calendar.move(1);
   *
   * // Move to the next year in month view.
   * calendar.move(12);
   *
   * // Move to yesterday in day view.
   * calendar.move(-1);
   */


  move(offset) {
    if (type_isNil(offset)) {
      return;
    }

    const {
      currentView,
      renderDate
    } = this.getStoreState().view;
    const {
      options
    } = this.getStoreState();
    const {
      setRenderDate
    } = this.getStoreDispatchers().view;
    const newRenderDate = new date_TZDate(renderDate);
    let calculatedRenderDate = {
      renderDate: newRenderDate,
      renderRange: {
        start: new date_TZDate(newRenderDate),
        end: new date_TZDate(newRenderDate)
      }
    };

    if (currentView === 'month') {
      calculatedRenderDate = this.calculateMonthRenderDate({
        renderDate,
        offset,
        monthOptions: options.month
      });
    } else if (currentView === 'week') {
      calculatedRenderDate = this.calculateWeekRenderDate({
        renderDate,
        offset,
        weekOptions: options.week
      });
    } else if (currentView === 'day') {
      calculatedRenderDate = this.calculateDayRenderDate({
        renderDate,
        offset
      });
    }

    setRenderDate(calculatedRenderDate.renderDate);
    this.renderRange = calculatedRenderDate.renderRange;
  }
  /**********
   * CRUD Methods
   **********/

  /**
   * Create events and render calendar.
   * @param {Array.<EventObject>} events - list of {@link EventObject}
   * @example
   * calendar.createEvents([
   *   {
   *     id: '1',
   *     calendarId: '1',
   *     title: 'my event',
   *     category: 'time',
   *     dueDateClass: '',
   *     start: '2018-01-18T22:30:00+09:00',
   *     end: '2018-01-19T02:30:00+09:00',
   *   },
   *   {
   *     id: '2',
   *     calendarId: '1',
   *     title: 'second event',
   *     category: 'time',
   *     dueDateClass: '',
   *     start: '2018-01-18T17:30:00+09:00',
   *     end: '2018-01-19T17:31:00+09:00',
   *   },
   * ]);
   */


  createEvents(events) {
    const {
      createEvents
    } = this.getStoreDispatchers('calendar');
    createEvents(events);
  }

  getEventModel(eventId, calendarId) {
    const {
      events
    } = this.getStoreState('calendar');
    return events.find(_ref4 => {
      let {
        id,
        calendarId: eventCalendarId
      } = _ref4;
      return id === eventId && eventCalendarId === calendarId;
    });
  }
  /**
   * Get an {@link EventObject} with event's id and calendar's id.
   *
   * @param {string} eventId - event's id
   * @param {string} calendarId - calendar's id of the event
   * @returns {EventObject|null} event. If the event can't be found, it returns null.
   *
   * @example
   * const event = calendar.getEvent(eventId, calendarId);
   *
   * console.log(event.title);
   */


  getEvent(eventId, calendarId) {
    var _this$getEventModel$t, _this$getEventModel;

    return (_this$getEventModel$t = (_this$getEventModel = this.getEventModel(eventId, calendarId)) === null || _this$getEventModel === void 0 ? void 0 : _this$getEventModel.toEventObject()) !== null && _this$getEventModel$t !== void 0 ? _this$getEventModel$t : null;
  }
  /**
   * Update an event.
   *
   * @param {string} eventId - ID of an event to update
   * @param {string} calendarId - The calendarId of the event to update
   * @param {EventObject} changes - The new {@link EventObject} data to apply to the event
   *
   * @example
   * calendar.on('beforeUpdateEvent', function ({ event, changes }) {
   *   const { id, calendarId } = event;
   *
   *   calendar.updateEvent(id, calendarId, changes);
   * });
   */


  updateEvent(eventId, calendarId, changes) {
    const {
      updateEvent
    } = this.getStoreDispatchers('calendar');
    const event = this.getEventModel(eventId, calendarId);

    if (event) {
      updateEvent({
        event,
        eventData: changes
      });
    }
  }
  /**
   * Delete an event.
   *
   * @param {string} eventId - event's id to delete
   * @param {string} calendarId - The CalendarId of the event to delete
   */


  deleteEvent(eventId, calendarId) {
    const {
      deleteEvent
    } = this.getStoreDispatchers('calendar');
    const event = this.getEventModel(eventId, calendarId);

    if (event) {
      deleteEvent(event);
    }
  }
  /**********
   * General Methods
   **********/

  /**
   * Set events' visibility by calendar ID
   *
   * @param {string|Array.<string>} calendarId - The calendar id or ids to change visibility
   * @param {boolean} isVisible - If set to true, show the events. If set to false, hide the events.
   */


  setCalendarVisibility(calendarId, isVisible) {
    const {
      setCalendarVisibility
    } = this.getStoreDispatchers('calendar');
    const calendarIds = Array.isArray(calendarId) ? calendarId : [calendarId];
    setCalendarVisibility(calendarIds, isVisible);
  }
  /**
   * Render the calendar.
   *
   * @example
   * calendar.render();
   *
   * @example
   * // Re-render the calendar when resizing a window.
   * window.addEventListener('resize', () => {
   *   calendar.render();
   * });
   */


  render() {
    if (isPresent(this.container)) {
      P(h(CalendarContainer, {
        theme: this.theme,
        store: this.store,
        eventBus: this.eventBus
      }, this.getComponent()), this.container);
    }

    return this;
  }
  /**
   * For SSR(Server Side Rendering), Return the HTML string of the whole calendar.
   *
   * @returns {string} HTML string
   */


  renderToString() {
    return dist(h(CalendarContainer, {
      theme: this.theme,
      store: this.store,
      eventBus: this.eventBus
    }, this.getComponent()));
  }
  /**
   * Delete all events and clear view
   *
   * @example
   * calendar.clear();
   */


  clear() {
    const {
      clearEvents
    } = this.getStoreDispatchers('calendar');
    clearEvents();
  }
  /**
   * Scroll to current time on today in case of daily, weekly view.
   * Nothing happens in the monthly view.
   *
   * @example
   * function onNewEvents(events) {
   *   calendar.createEvents(events);
   *   calendar.scrollToNow('smooth');
   * }
   */


  scrollToNow() {
    let scrollBehavior = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
    this.eventBus.fire('scrollToNow', scrollBehavior);
  }

  calculateRenderRange(renderDate) {
    const {
      currentView
    } = this.getStoreState().view;
    const {
      options
    } = this.getStoreState();
    const newRenderDate = new date_TZDate(renderDate);
    let newRenderRange = {
      start: new date_TZDate(newRenderDate),
      end: new date_TZDate(newRenderDate)
    };

    if (currentView === 'month') {
      newRenderRange = this.calculateMonthRenderDate({
        renderDate,
        offset: 0,
        monthOptions: options.month
      }).renderRange;
    } else if (currentView === 'week') {
      newRenderRange = this.calculateWeekRenderDate({
        renderDate,
        offset: 0,
        weekOptions: options.week
      }).renderRange;
    } else if (currentView === 'day') {
      newRenderRange = this.calculateDayRenderDate({
        renderDate,
        offset: 0
      }).renderRange;
    }

    return newRenderRange;
  }
  /**
   * Move to today.
   *
   * @example
   * function onClickTodayBtn() {
   *   calendar.today();
   * }
   */


  today() {
    const {
      setRenderDate
    } = this.getStoreDispatchers().view;
    const today = new date_TZDate();
    setRenderDate(today);
    this.renderRange = this.calculateRenderRange(today);
  }
  /**
   * Move to specific date.
   *
   * @param {Date|string|number|TZDate} date - The date to move. it should be eligible parameter to create a `Date` instance if `date` is string or number.
   * @example
   * calendar.on('clickDayName', (event) => {
   *   if (calendar.getViewName() === 'week') {
   *     const dateToMove = new Date(event.date);
   *
   *     calendar.setDate(dateToMove);
   *     calendar.changeView('day');
   *   }
   * });
   */


  setDate(date) {
    const {
      setRenderDate
    } = this.getStoreDispatchers('view');
    const dateToChange = new date_TZDate(date);
    setRenderDate(dateToChange);
    this.renderRange = this.calculateRenderRange(dateToChange);
  }
  /**
   * Move the calendar forward to the next range.
   *
   * @example
   * function moveToNextOrPrevRange(offset) {
   *   if (offset === -1) {
   *     calendar.prev();
   *   } else if (offset === 1) {
   *     calendar.next();
   *   }
   * }
   */


  next() {
    this.move(1);
  }
  /**
   * Move the calendar backward to the previous range.
   *
   * @example
   * function moveToNextOrPrevRange(offset) {
   *   if (offset === -1) {
   *     calendar.prev();
   *   } else if (offset === 1) {
   *     calendar.next();
   *   }
   * }
   */


  prev() {
    this.move(-1);
  }
  /**
   * Change color values of events belong to a certain calendar.
   *
   * @param {string} calendarId - The calendar ID
   * @param {object} colorOptions - The color values of the calendar
   *   @param {string} colorOptions.color - The text color of the events
   *   @param {string} colorOptions.borderColor - Left border color of events
   *   @param {string} colorOptions.backgroundColor - Background color of events
   *   @param {string} colorOptions.dragBackgroundColor - Background color of events during dragging
   *
   * @example
   * calendar.setCalendarColor('1', {
   *     color: '#e8e8e8',
   *     backgroundColor: '#585858',
   *     borderColor: '#a1b56c',
   *     dragBackgroundColor: '#585858',
   * });
   * calendar.setCalendarColor('2', {
   *     color: '#282828',
   *     backgroundColor: '#dc9656',
   *     borderColor: '#a1b56c',
   *     dragBackgroundColor: '#dc9656',
   * });
   * calendar.setCalendarColor('3', {
   *     color: '#a16946',
   *     backgroundColor: '#ab4642',
   *     borderColor: '#a1b56c',
   *     dragBackgroundColor: '#ab4642',
   * });
   */


  setCalendarColor(calendarId, colorOptions) {
    const {
      setCalendarColor
    } = this.getStoreDispatchers().calendar;
    setCalendarColor(calendarId, colorOptions);
  }
  /**
   * Change current view type.
   *
   * @param {string} viewName - The new view name to change to. Available values are 'month', 'week', 'day'.
   *
   * @example
   * // change to daily view
   * calendar.changeView('day');
   *
   * // change to weekly view
   * calendar.changeView('week');
   *
   * // change to monthly view
   * calendar.changeView('month');
   */


  changeView(viewName) {
    const {
      changeView
    } = this.getStoreDispatchers('view');
    changeView(viewName);
    this.renderRange = this.calculateRenderRange(this.getDate());
  }
  /**
   * Get the DOM element of the event by event id and calendar id
   *
   * @param {string} eventId - ID of event
   * @param {string} calendarId - calendarId of event
   * @returns {HTMLElement} event element if found or null
   *
   * @example
   * const element = calendar.getElement(eventId, calendarId);
   *
   * console.log(element);
   */


  getElement(eventId, calendarId) {
    const event = this.getEvent(eventId, calendarId);

    if (event && this.container) {
      return this.container.querySelector("[data-event-id=\"".concat(eventId, "\"][data-calendar-id=\"").concat(calendarId, "\"]"));
    }

    return null;
  }
  /**
   * Set the theme of the calendar.
   *
   * @param {Theme} theme - The theme object to apply. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/theme.md|Theme} in guide.
   *
   * @example
   * calendar.setTheme({
   *   common: {
   *     gridSelection: {
   *       backgroundColor: '#333',
   *     },
   *   },
   *   week: {
   *     nowIndicatorLabel: {
   *       color: '#00FF00',
   *     },
   *   },
   *   month: {
   *     dayName: {
   *       borderLeft: '1px solid #e5e5e5',
   *     },
   *   },
   * });
   */


  setTheme(theme) {
    const {
      setTheme
    } = this.theme.getState().dispatch;
    setTheme(theme);
  }
  /**
   * Get current options.
   *
   * @returns {Options} - The current options of the instance
   */


  getOptions() {
    const {
      options,
      template
    } = this.getStoreState();
    const {
      dispatch,
      ...theme
    } = this.theme.getState();
    return { ...options,
      template,
      theme
    };
  }
  /**
   * Set options of calendar. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md|Options} in guide.
   *
   * @param {Options} options - The options to set
   */


  setOptions(options) {
    // destructure options here for tui.doc to generate docs correctly
    const {
      theme,
      template,
      ...restOptions
    } = options;
    const {
      setTheme
    } = this.theme.getState().dispatch;
    const {
      options: {
        setOptions
      },
      template: {
        setTemplate
      }
    } = this.getStoreDispatchers();

    if (isPresent(theme)) {
      setTheme(theme);
    }

    if (isPresent(template)) {
      setTemplate(template);
    }

    setOptions(restOptions);
  }
  /**
   * Get current rendered date. (see {@link TZDate} for further information)
   *
   * @returns {TZDate}
   */


  getDate() {
    const {
      renderDate
    } = this.getStoreState().view;
    return renderDate;
  }
  /**
   * Start time of rendered date range. (see {@link TZDate} for further information)
   *
   * @returns {TZDate}
   */


  getDateRangeStart() {
    return this.renderRange.start;
  }
  /**
   * End time of rendered date range. (see {@link TZDate} for further information)
   *
   * @returns {TZDate}
   */


  getDateRangeEnd() {
    return this.renderRange.end;
  }
  /**
   * Get current view name('day', 'week', 'month').
   *
   * @returns {string} current view name ('day', 'week', 'month')
   */


  getViewName() {
    const {
      currentView
    } = this.getStoreState('view');
    return currentView;
  }
  /**
   * Set calendar list.
   *
   * @param {CalendarInfo[]} calendars - list of calendars
   */


  setCalendars(calendars) {
    const {
      setCalendars
    } = this.getStoreDispatchers().calendar;
    setCalendars(calendars);
  } // TODO: specify position of popup

  /**
   * Open event form popup with predefined form values.
   *
   * @param {EventObject} event - The predefined {@link EventObject} data to show in form.
   */


  openFormPopup(event) {
    const {
      showFormPopup
    } = this.getStoreDispatchers().popup;
    const eventModel = new EventModel(event);
    const {
      title,
      location,
      start,
      end,
      isAllday,
      isPrivate,
      state: eventState
    } = eventModel;
    showFormPopup({
      isCreationPopup: true,
      event: eventModel,
      title,
      location,
      start,
      end,
      isAllday,
      isPrivate,
      eventState
    });
  }

  clearGridSelections() {
    const {
      clearAll
    } = this.getStoreDispatchers().gridSelection;
    clearAll();
  }

  fire(eventName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    this.eventBus.fire(eventName, ...args);
    return this;
  }

  off(eventName, handler) {
    this.eventBus.off(eventName, handler);
    return this;
  }

  on(eventName, handler) {
    this.eventBus.on(eventName, handler);
    return this;
  }

  once(eventName, handler) {
    this.eventBus.once(eventName, handler);
    return this;
  }

}
;// CONCATENATED MODULE: ./src/factory/calendar.tsx






// TODO: move this function to a separate file such as util
function isValidViewType(viewType) {
  return !!Object.values(VIEW_TYPE).find(type => type === viewType);
}
/**
 * Calendar class
 *
 * @class Calendar
 * @extends CalendarCore
 * @param {object} options - Calendar options. Check out {@link CalendarCore} for more information.
 */


class Calendar extends CalendarCore {
  constructor(container) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(container, options);
    const {
      defaultView = 'week'
    } = options;

    if (!isValidViewType(defaultView)) {
      throw new InvalidViewTypeError(defaultView);
    }

    this.render();
  }

  getComponent() {
    return h(Main, null);
  }

}
;// CONCATENATED MODULE: ./src/index.ts





/* harmony default export */ var src_0 = (Calendar);

}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});