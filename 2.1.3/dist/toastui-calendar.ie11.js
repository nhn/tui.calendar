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

/***/ 7988:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isConstructor = __webpack_require__(2359);
var tryToString = __webpack_require__(9821);

var $TypeError = TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a constructor');
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

/***/ 7728:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isPrototypeOf = __webpack_require__(1321);

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw $TypeError('Incorrect invocation');
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

/***/ 2460:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails = __webpack_require__(4229);

module.exports = fails(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});


/***/ }),

/***/ 7065:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__(2991);
var toAbsoluteIndex = __webpack_require__(3231);
var lengthOfArrayLike = __webpack_require__(9646);

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ 6570:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $forEach = (__webpack_require__(9996).forEach);
var arrayMethodIsStrict = __webpack_require__(6038);

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es-x/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ 507:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(7636);
var call = __webpack_require__(266);
var toObject = __webpack_require__(2991);
var callWithSafeIterationClosing = __webpack_require__(4960);
var isArrayIteratorMethod = __webpack_require__(1943);
var isConstructor = __webpack_require__(2359);
var lengthOfArrayLike = __webpack_require__(9646);
var createProperty = __webpack_require__(2324);
var getIterator = __webpack_require__(8403);
var getIteratorMethod = __webpack_require__(8830);

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
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

/***/ 9996:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(7636);
var uncurryThis = __webpack_require__(5968);
var IndexedObject = __webpack_require__(9337);
var toObject = __webpack_require__(2991);
var lengthOfArrayLike = __webpack_require__(9646);
var arraySpeciesCreate = __webpack_require__(7501);

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ 1460:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);
var wellKnownSymbol = __webpack_require__(95);
var V8_VERSION = __webpack_require__(6358);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ 6038:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(4229);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ 9794:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toAbsoluteIndex = __webpack_require__(3231);
var lengthOfArrayLike = __webpack_require__(9646);
var createProperty = __webpack_require__(2324);

var $Array = Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};


/***/ }),

/***/ 1909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);

module.exports = uncurryThis([].slice);


/***/ }),

/***/ 3867:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arraySlice = __webpack_require__(9794);

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

module.exports = mergeSort;


/***/ }),

/***/ 8760:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(3718);
var isConstructor = __webpack_require__(2359);
var isObject = __webpack_require__(5052);
var wellKnownSymbol = __webpack_require__(95);

var SPECIES = wellKnownSymbol('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};


/***/ }),

/***/ 7501:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__(8760);

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ 4960:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(1176);
var iteratorClose = __webpack_require__(7281);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ 4575:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(95);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
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

/***/ 8081:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var defineProperty = (__webpack_require__(1787).f);
var create = __webpack_require__(2391);
var defineBuiltIns = __webpack_require__(8312);
var bind = __webpack_require__(7636);
var anInstance = __webpack_require__(7728);
var iterate = __webpack_require__(9003);
var defineIterator = __webpack_require__(7675);
var setSpecies = __webpack_require__(1832);
var DESCRIPTORS = __webpack_require__(7400);
var fastKey = (__webpack_require__(5926).fastKey);
var InternalStateModule = __webpack_require__(6407);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    defineBuiltIns(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    defineBuiltIns(Prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(Prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return Constructor;
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),

/***/ 9789:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var global = __webpack_require__(9859);
var uncurryThis = __webpack_require__(5968);
var isForced = __webpack_require__(6541);
var defineBuiltIn = __webpack_require__(4768);
var InternalMetadataModule = __webpack_require__(5926);
var iterate = __webpack_require__(9003);
var anInstance = __webpack_require__(7728);
var isCallable = __webpack_require__(6733);
var isObject = __webpack_require__(5052);
var fails = __webpack_require__(4229);
var checkCorrectnessOfIteration = __webpack_require__(4575);
var setToStringTag = __webpack_require__(4555);
var inheritIfRequired = __webpack_require__(835);

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY]);
    defineBuiltIn(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.enable();
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, NativePrototype);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, constructor: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
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

/***/ 8127:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(95);

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
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

/***/ 2324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__(9310);
var definePropertyModule = __webpack_require__(1787);
var createPropertyDescriptor = __webpack_require__(5358);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 6616:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var makeBuiltIn = __webpack_require__(6039);
var defineProperty = __webpack_require__(1787);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
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

/***/ 8312:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineBuiltIn = __webpack_require__(4768);

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
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

/***/ 8423:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var path = __webpack_require__(9276);
var hasOwn = __webpack_require__(8270);
var wrappedWellKnownSymbolModule = __webpack_require__(5391);
var defineProperty = (__webpack_require__(1787).f);

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ 9563:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var tryToString = __webpack_require__(9821);

var $TypeError = TypeError;

module.exports = function (O, P) {
  if (!delete O[P]) throw $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
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

/***/ 3064:
/***/ (function(module) {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
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

/***/ 2671:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(598);

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];


/***/ }),

/***/ 8639:
/***/ (function(module) {

module.exports = typeof window == 'object' && typeof Deno != 'object';


/***/ }),

/***/ 8506:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var UA = __webpack_require__(598);

module.exports = /MSIE|Trident/.test(UA);


/***/ }),

/***/ 8983:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(598);
var global = __webpack_require__(9859);

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;


/***/ }),

/***/ 2023:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(598);

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),

/***/ 8801:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(7079);
var global = __webpack_require__(9859);

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ 263:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(598);

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


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

/***/ 9811:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(598);

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];


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

/***/ 4990:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isArray = __webpack_require__(3718);
var lengthOfArrayLike = __webpack_require__(9646);
var doesNotExceedSafeInteger = __webpack_require__(3064);
var bind = __webpack_require__(7636);

// `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg) : false;
  var element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        doesNotExceedSafeInteger(targetIndex + 1);
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};

module.exports = flattenIntoArray;


/***/ }),

/***/ 8476:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-isextensible, es-x/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


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

/***/ 7636:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);
var aCallable = __webpack_require__(7111);
var NATIVE_BIND = __webpack_require__(7188);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


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

/***/ 4128:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(5968);
var aCallable = __webpack_require__(7111);
var isObject = __webpack_require__(5052);
var hasOwn = __webpack_require__(8270);
var arraySlice = __webpack_require__(1909);
var NATIVE_BIND = __webpack_require__(7188);

var $Function = Function;
var concat = uncurryThis([].concat);
var join = uncurryThis([].join);
var factories = {};

var construct = function (C, argsLength, args) {
  if (!hasOwn(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
module.exports = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
  var F = aCallable(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = concat(partArgs, arraySlice(arguments));
    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
  };
  if (isObject(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};


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

/***/ 8830:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(1589);
var getMethod = __webpack_require__(5300);
var Iterators = __webpack_require__(5495);
var wellKnownSymbol = __webpack_require__(95);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ 8403:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(266);
var aCallable = __webpack_require__(7111);
var anObject = __webpack_require__(1176);
var tryToString = __webpack_require__(9821);
var getIteratorMethod = __webpack_require__(8830);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
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

/***/ 4665:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  }
};


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

/***/ 5926:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var uncurryThis = __webpack_require__(5968);
var hiddenKeys = __webpack_require__(5977);
var isObject = __webpack_require__(5052);
var hasOwn = __webpack_require__(8270);
var defineProperty = (__webpack_require__(1787).f);
var getOwnPropertyNamesModule = __webpack_require__(8151);
var getOwnPropertyNamesExternalModule = __webpack_require__(166);
var isExtensible = __webpack_require__(5343);
var uid = __webpack_require__(1441);
var FREEZING = __webpack_require__(8476);

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis([].splice);
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1);
          break;
        }
      } return result;
    };

    $({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = module.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


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

/***/ 1943:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(95);
var Iterators = __webpack_require__(5495);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 3718:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(7079);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
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

/***/ 2359:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);
var fails = __webpack_require__(4229);
var isCallable = __webpack_require__(6733);
var classof = __webpack_require__(1589);
var getBuiltIn = __webpack_require__(1333);
var inspectSource = __webpack_require__(8511);

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ 193:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(8270);

module.exports = function (descriptor) {
  return descriptor !== undefined && (hasOwn(descriptor, 'value') || hasOwn(descriptor, 'writable'));
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

/***/ 8311:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(5052);
var classof = __webpack_require__(7079);
var wellKnownSymbol = __webpack_require__(95);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


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

/***/ 9003:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(7636);
var call = __webpack_require__(266);
var anObject = __webpack_require__(1176);
var tryToString = __webpack_require__(9821);
var isArrayIteratorMethod = __webpack_require__(1943);
var lengthOfArrayLike = __webpack_require__(9646);
var isPrototypeOf = __webpack_require__(1321);
var getIterator = __webpack_require__(8403);
var getIteratorMethod = __webpack_require__(8830);
var iteratorClose = __webpack_require__(7281);

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ 7281:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(266);
var anObject = __webpack_require__(1176);
var getMethod = __webpack_require__(5300);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
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

/***/ 4794:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var bind = __webpack_require__(7636);
var getOwnPropertyDescriptor = (__webpack_require__(7933).f);
var macrotask = (__webpack_require__(5795).set);
var IS_IOS = __webpack_require__(2023);
var IS_IOS_PEBBLE = __webpack_require__(8983);
var IS_WEBOS_WEBKIT = __webpack_require__(263);
var IS_NODE = __webpack_require__(8801);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = bind(promise.then, promise);
    notify = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind(macrotask, global);
    notify = function () {
      macrotask(flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ 5506:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(3839);

/* eslint-disable es-x/no-symbol -- safe */
module.exports = NATIVE_SYMBOL && !!Symbol['for'] && !!Symbol.keyFor;


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

/***/ 6485:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__(7111);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 635:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(3326);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 7272:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isRegExp = __webpack_require__(8311);

var $TypeError = TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw $TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ 47:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(7400);
var uncurryThis = __webpack_require__(5968);
var call = __webpack_require__(266);
var fails = __webpack_require__(4229);
var objectKeys = __webpack_require__(5632);
var getOwnPropertySymbolsModule = __webpack_require__(894);
var propertyIsEnumerableModule = __webpack_require__(9195);
var toObject = __webpack_require__(2991);
var IndexedObject = __webpack_require__(9337);

// eslint-disable-next-line es-x/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es-x/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


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

/***/ 166:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-object-getownpropertynames -- safe */
var classof = __webpack_require__(7079);
var toIndexedObject = __webpack_require__(905);
var $getOwnPropertyNames = (__webpack_require__(8151).f);
var arraySlice = __webpack_require__(9794);

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
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

/***/ 5343:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(4229);
var isObject = __webpack_require__(5052);
var classof = __webpack_require__(7079);
var ARRAY_BUFFER_NON_EXTENSIBLE = __webpack_require__(2460);

// eslint-disable-next-line es-x/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
module.exports = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;


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

/***/ 7664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var uncurryThis = __webpack_require__(5968);
var objectKeys = __webpack_require__(5632);
var toIndexedObject = __webpack_require__(905);
var $propertyIsEnumerable = (__webpack_require__(9195).f);

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push);

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};


/***/ }),

/***/ 4059:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(1601);
var classof = __webpack_require__(1589);

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


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

/***/ 9276:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);

module.exports = global;


/***/ }),

/***/ 4624:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ 8321:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var NativePromiseConstructor = __webpack_require__(4473);
var isCallable = __webpack_require__(6733);
var isForced = __webpack_require__(6541);
var inspectSource = __webpack_require__(8511);
var wellKnownSymbol = __webpack_require__(95);
var IS_BROWSER = __webpack_require__(8639);
var IS_PURE = __webpack_require__(4231);
var V8_VERSION = __webpack_require__(6358);

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var SPECIES = wellKnownSymbol('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution
  if (IS_PURE && !(NativePromisePrototype['catch'] && NativePromisePrototype['finally'])) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new NativePromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_PROMISE_REJECTION_EVENT;
});

module.exports = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
  SUBCLASSING: SUBCLASSING
};


/***/ }),

/***/ 4473:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);

module.exports = global.Promise;


/***/ }),

/***/ 7757:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(1176);
var isObject = __webpack_require__(5052);
var newPromiseCapability = __webpack_require__(6485);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ 6866:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NativePromiseConstructor = __webpack_require__(4473);
var checkCorrectnessOfIteration = __webpack_require__(4575);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(8321).CONSTRUCTOR);

module.exports = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function (iterable) {
  NativePromiseConstructor.all(iterable).then(undefined, function () { /* empty */ });
});


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

/***/ 3358:
/***/ (function(module) {

var Queue = function () {
  this.head = null;
  this.tail = null;
};

Queue.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    if (this.head) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      this.head = entry.next;
      if (this.tail === entry) this.tail = null;
      return entry.item;
    }
  }
};

module.exports = Queue;


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

/***/ 3349:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(266);
var hasOwn = __webpack_require__(8270);
var isPrototypeOf = __webpack_require__(1321);
var regExpFlags = __webpack_require__(895);

var RegExpPrototype = RegExp.prototype;

module.exports = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
    ? call(regExpFlags, R) : flags;
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

/***/ 2101:
/***/ (function(module) {

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es-x/no-object-is -- safe
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ 1832:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(1333);
var definePropertyModule = __webpack_require__(1787);
var wellKnownSymbol = __webpack_require__(95);
var DESCRIPTORS = __webpack_require__(7400);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
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

/***/ 7942:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var anObject = __webpack_require__(1176);
var aConstructor = __webpack_require__(7988);
var wellKnownSymbol = __webpack_require__(95);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


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

/***/ 7456:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// https://github.com/zloirock/core-js/issues/280
var userAgent = __webpack_require__(598);

module.exports = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent);


/***/ }),

/***/ 6650:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var uncurryThis = __webpack_require__(5968);
var toLength = __webpack_require__(4237);
var toString = __webpack_require__(3326);
var $repeat = __webpack_require__(3124);
var requireObjectCoercible = __webpack_require__(8885);

var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var ceil = Math.ceil;

// `String.prototype.{ padStart, padEnd }` methods implementation
var createMethod = function (IS_END) {
  return function ($this, maxLength, fillString) {
    var S = toString(requireObjectCoercible($this));
    var intMaxLength = toLength(maxLength);
    var stringLength = S.length;
    var fillStr = fillString === undefined ? ' ' : toString(fillString);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == '') return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};

module.exports = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod(true)
};


/***/ }),

/***/ 3124:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(3329);
var toString = __webpack_require__(3326);
var requireObjectCoercible = __webpack_require__(8885);

var $RangeError = RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n == Infinity) throw $RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ 1017:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);
var requireObjectCoercible = __webpack_require__(8885);
var toString = __webpack_require__(3326);
var whitespaces = __webpack_require__(1647);

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ 6481:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(266);
var getBuiltIn = __webpack_require__(1333);
var wellKnownSymbol = __webpack_require__(95);
var defineBuiltIn = __webpack_require__(4768);

module.exports = function () {
  var Symbol = getBuiltIn('Symbol');
  var SymbolPrototype = Symbol && Symbol.prototype;
  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    // eslint-disable-next-line no-unused-vars -- required for .length
    defineBuiltIn(SymbolPrototype, TO_PRIMITIVE, function (hint) {
      return call(valueOf, this);
    }, { arity: 1 });
  }
};


/***/ }),

/***/ 5795:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var apply = __webpack_require__(3171);
var bind = __webpack_require__(7636);
var isCallable = __webpack_require__(6733);
var hasOwn = __webpack_require__(8270);
var fails = __webpack_require__(4229);
var html = __webpack_require__(3777);
var arraySlice = __webpack_require__(1909);
var createElement = __webpack_require__(2635);
var validateArgumentsLength = __webpack_require__(7579);
var IS_IOS = __webpack_require__(2023);
var IS_NODE = __webpack_require__(8801);

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = arraySlice(arguments, 1);
    queue[++counter] = function () {
      apply(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    isCallable(global.postMessage) &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ 143:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(5968);

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


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

/***/ 7579:
/***/ (function(module) {

var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw $TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ 5391:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(95);

exports.f = wellKnownSymbol;


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

/***/ 1647:
/***/ (function(module) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


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

/***/ 8178:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var fails = __webpack_require__(4229);
var isArray = __webpack_require__(3718);
var isObject = __webpack_require__(5052);
var toObject = __webpack_require__(2991);
var lengthOfArrayLike = __webpack_require__(9646);
var doesNotExceedSafeInteger = __webpack_require__(3064);
var createProperty = __webpack_require__(2324);
var arraySpeciesCreate = __webpack_require__(7501);
var arrayMethodHasSpeciesSupport = __webpack_require__(1460);
var wellKnownSymbol = __webpack_require__(95);
var V8_VERSION = __webpack_require__(6358);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ 2656:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var fill = __webpack_require__(7065);
var addToUnscopables = __webpack_require__(9736);

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),

/***/ 5342:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var $filter = (__webpack_require__(9996).filter);
var arrayMethodHasSpeciesSupport = __webpack_require__(1460);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 9949:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var $findIndex = (__webpack_require__(9996).findIndex);
var addToUnscopables = __webpack_require__(9736);

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);


/***/ }),

/***/ 9228:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var $find = (__webpack_require__(9996).find);
var addToUnscopables = __webpack_require__(9736);

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ 4870:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var flattenIntoArray = __webpack_require__(4990);
var aCallable = __webpack_require__(7111);
var toObject = __webpack_require__(2991);
var lengthOfArrayLike = __webpack_require__(9646);
var arraySpeciesCreate = __webpack_require__(7501);

// `Array.prototype.flatMap` method
// https://tc39.es/ecma262/#sec-array.prototype.flatmap
$({ target: 'Array', proto: true }, {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A;
    aCallable(callbackfn);
    A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return A;
  }
});


/***/ }),

/***/ 7072:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var flattenIntoArray = __webpack_require__(4990);
var toObject = __webpack_require__(2991);
var lengthOfArrayLike = __webpack_require__(9646);
var toIntegerOrInfinity = __webpack_require__(3329);
var arraySpeciesCreate = __webpack_require__(7501);

// `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat
$({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});


/***/ }),

/***/ 7233:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var from = __webpack_require__(507);
var checkCorrectnessOfIteration = __webpack_require__(4575);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es-x/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


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

/***/ 6781:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var uncurryThis = __webpack_require__(5968);
var IndexedObject = __webpack_require__(9337);
var toIndexedObject = __webpack_require__(905);
var arrayMethodIsStrict = __webpack_require__(6038);

var un$Join = uncurryThis([].join);

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ 3450:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var $map = (__webpack_require__(9996).map);
var arrayMethodHasSpeciesSupport = __webpack_require__(1460);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 2501:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var isArray = __webpack_require__(3718);
var isConstructor = __webpack_require__(2359);
var isObject = __webpack_require__(5052);
var toAbsoluteIndex = __webpack_require__(3231);
var lengthOfArrayLike = __webpack_require__(9646);
var toIndexedObject = __webpack_require__(905);
var createProperty = __webpack_require__(2324);
var wellKnownSymbol = __webpack_require__(95);
var arrayMethodHasSpeciesSupport = __webpack_require__(1460);
var un$Slice = __webpack_require__(1909);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var $Array = Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === $Array || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ 3430:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var uncurryThis = __webpack_require__(5968);
var aCallable = __webpack_require__(7111);
var toObject = __webpack_require__(2991);
var lengthOfArrayLike = __webpack_require__(9646);
var deletePropertyOrThrow = __webpack_require__(9563);
var toString = __webpack_require__(3326);
var fails = __webpack_require__(4229);
var internalSort = __webpack_require__(3867);
var arrayMethodIsStrict = __webpack_require__(6038);
var FF = __webpack_require__(2671);
var IE_OR_EDGE = __webpack_require__(8506);
var V8 = __webpack_require__(6358);
var WEBKIT = __webpack_require__(9811);

var test = [];
var un$Sort = uncurryThis(test.sort);
var push = uncurryThis(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject(this);

    if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) deletePropertyOrThrow(array, index++);

    return array;
  }
});


/***/ }),

/***/ 9805:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var toObject = __webpack_require__(2991);
var toAbsoluteIndex = __webpack_require__(3231);
var toIntegerOrInfinity = __webpack_require__(3329);
var lengthOfArrayLike = __webpack_require__(9646);
var doesNotExceedSafeInteger = __webpack_require__(3064);
var arraySpeciesCreate = __webpack_require__(7501);
var createProperty = __webpack_require__(2324);
var deletePropertyOrThrow = __webpack_require__(9563);
var arrayMethodHasSpeciesSupport = __webpack_require__(1460);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


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

/***/ 6936:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var FUNCTION_NAME_EXISTS = (__webpack_require__(1805).EXISTS);
var uncurryThis = __webpack_require__(5968);
var defineProperty = (__webpack_require__(1787).f);

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ 6710:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var getBuiltIn = __webpack_require__(1333);
var apply = __webpack_require__(3171);
var call = __webpack_require__(266);
var uncurryThis = __webpack_require__(5968);
var fails = __webpack_require__(4229);
var isArray = __webpack_require__(3718);
var isCallable = __webpack_require__(6733);
var isObject = __webpack_require__(5052);
var isSymbol = __webpack_require__(9395);
var arraySlice = __webpack_require__(1909);
var NATIVE_SYMBOL = __webpack_require__(3839);

var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
  var symbol = getBuiltIn('Symbol')();
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) != '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) != '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithSymbolsFix = function (it, replacer) {
  var args = arraySlice(arguments);
  var $replacer = replacer;
  if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
  if (!isArray(replacer)) replacer = function (key, value) {
    if (isCallable($replacer)) value = call($replacer, this, key, value);
    if (!isSymbol(value)) return value;
  };
  args[1] = replacer;
  return apply($stringify, null, args);
};

var fixIllFormed = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
    }
  });
}


/***/ }),

/***/ 9294:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(9789);
var collectionStrong = __webpack_require__(8081);

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ 9321:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__(9294);


/***/ }),

/***/ 1245:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(7400);
var global = __webpack_require__(9859);
var uncurryThis = __webpack_require__(5968);
var isForced = __webpack_require__(6541);
var defineBuiltIn = __webpack_require__(4768);
var hasOwn = __webpack_require__(8270);
var inheritIfRequired = __webpack_require__(835);
var isPrototypeOf = __webpack_require__(1321);
var isSymbol = __webpack_require__(9395);
var toPrimitive = __webpack_require__(2066);
var fails = __webpack_require__(4229);
var getOwnPropertyNames = (__webpack_require__(8151).f);
var getOwnPropertyDescriptor = (__webpack_require__(7933).f);
var defineProperty = (__webpack_require__(1787).f);
var thisNumberValue = __webpack_require__(143);
var trim = (__webpack_require__(1017).trim);

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  defineBuiltIn(global, NUMBER, NumberWrapper, { constructor: true });
}


/***/ }),

/***/ 3105:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var assign = __webpack_require__(47);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es-x/no-object-assign -- required for testing
$({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ 5883:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var $entries = (__webpack_require__(7664).entries);

// `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries
$({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});


/***/ }),

/***/ 8625:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var fails = __webpack_require__(4229);
var toIndexedObject = __webpack_require__(905);
var nativeGetOwnPropertyDescriptor = (__webpack_require__(7933).f);
var DESCRIPTORS = __webpack_require__(7400);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ 2775:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var DESCRIPTORS = __webpack_require__(7400);
var ownKeys = __webpack_require__(4826);
var toIndexedObject = __webpack_require__(905);
var getOwnPropertyDescriptorModule = __webpack_require__(7933);
var createProperty = __webpack_require__(2324);

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ 2067:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var NATIVE_SYMBOL = __webpack_require__(3839);
var fails = __webpack_require__(4229);
var getOwnPropertySymbolsModule = __webpack_require__(894);
var toObject = __webpack_require__(2991);

// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FORCED = !NATIVE_SYMBOL || fails(function () { getOwnPropertySymbolsModule.f(1); });

// `Object.getOwnPropertySymbols` method
// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
$({ target: 'Object', stat: true, forced: FORCED }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : [];
  }
});


/***/ }),

/***/ 6928:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var fails = __webpack_require__(4229);
var toObject = __webpack_require__(2991);
var nativeGetPrototypeOf = __webpack_require__(7567);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(7528);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ 9170:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var is = __webpack_require__(2101);

// `Object.is` method
// https://tc39.es/ecma262/#sec-object.is
$({ target: 'Object', stat: true }, {
  is: is
});


/***/ }),

/***/ 4769:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var toObject = __webpack_require__(2991);
var nativeKeys = __webpack_require__(5632);
var fails = __webpack_require__(4229);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ 8188:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1601);
var defineBuiltIn = __webpack_require__(4768);
var toString = __webpack_require__(4059);

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ 7890:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var $values = (__webpack_require__(7664).values);

// `Object.values` method
// https://tc39.es/ecma262/#sec-object.values
$({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});


/***/ }),

/***/ 6032:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var call = __webpack_require__(266);
var aCallable = __webpack_require__(7111);
var newPromiseCapabilityModule = __webpack_require__(6485);
var perform = __webpack_require__(4624);
var iterate = __webpack_require__(9003);
var PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__(6866);

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 6135:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var IS_PURE = __webpack_require__(4231);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(8321).CONSTRUCTOR);
var NativePromiseConstructor = __webpack_require__(4473);
var getBuiltIn = __webpack_require__(1333);
var isCallable = __webpack_require__(6733);
var defineBuiltIn = __webpack_require__(4768);

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromiseConstructor)) {
  var method = getBuiltIn('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}


/***/ }),

/***/ 6087:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var IS_PURE = __webpack_require__(4231);
var IS_NODE = __webpack_require__(8801);
var global = __webpack_require__(9859);
var call = __webpack_require__(266);
var defineBuiltIn = __webpack_require__(4768);
var setPrototypeOf = __webpack_require__(6540);
var setToStringTag = __webpack_require__(4555);
var setSpecies = __webpack_require__(1832);
var aCallable = __webpack_require__(7111);
var isCallable = __webpack_require__(6733);
var isObject = __webpack_require__(5052);
var anInstance = __webpack_require__(7728);
var speciesConstructor = __webpack_require__(7942);
var task = (__webpack_require__(5795).set);
var microtask = __webpack_require__(4794);
var hostReportErrors = __webpack_require__(4665);
var perform = __webpack_require__(4624);
var Queue = __webpack_require__(3358);
var InternalStateModule = __webpack_require__(6407);
var NativePromiseConstructor = __webpack_require__(4473);
var PromiseConstructorDetection = __webpack_require__(8321);
var newPromiseCapabilityModule = __webpack_require__(6485);

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var PromiseConstructor = NativePromiseConstructor;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;

var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call(then, value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable(onRejected) && onRejected;
    reaction.domain = IS_NODE ? process.domain : undefined;
    if (state.state == PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
  }
}

$({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);


/***/ }),

/***/ 3439:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__(6087);
__webpack_require__(6032);
__webpack_require__(6135);
__webpack_require__(6767);
__webpack_require__(9320);
__webpack_require__(2047);


/***/ }),

/***/ 6767:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var call = __webpack_require__(266);
var aCallable = __webpack_require__(7111);
var newPromiseCapabilityModule = __webpack_require__(6485);
var perform = __webpack_require__(4624);
var iterate = __webpack_require__(9003);
var PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__(6866);

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 9320:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var call = __webpack_require__(266);
var newPromiseCapabilityModule = __webpack_require__(6485);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(8321).CONSTRUCTOR);

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    call(capability.reject, undefined, r);
    return capability.promise;
  }
});


/***/ }),

/***/ 2047:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var getBuiltIn = __webpack_require__(1333);
var IS_PURE = __webpack_require__(4231);
var NativePromiseConstructor = __webpack_require__(4473);
var FORCED_PROMISE_CONSTRUCTOR = (__webpack_require__(8321).CONSTRUCTOR);
var promiseResolve = __webpack_require__(7757);

var PromiseConstructorWrapper = getBuiltIn('Promise');
var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$({ target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
  }
});


/***/ }),

/***/ 1229:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var getBuiltIn = __webpack_require__(1333);
var apply = __webpack_require__(3171);
var bind = __webpack_require__(4128);
var aConstructor = __webpack_require__(7988);
var anObject = __webpack_require__(1176);
var isObject = __webpack_require__(5052);
var create = __webpack_require__(2391);
var fails = __webpack_require__(4229);

var nativeConstruct = getBuiltIn('Reflect', 'construct');
var ObjectPrototype = Object.prototype;
var push = [].push;

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});

var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});

var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aConstructor(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      apply(push, $args, args);
      return new (apply(bind, Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : ObjectPrototype);
    var result = apply(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ 4565:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var call = __webpack_require__(266);
var isObject = __webpack_require__(5052);
var anObject = __webpack_require__(1176);
var isDataDescriptor = __webpack_require__(193);
var getOwnPropertyDescriptorModule = __webpack_require__(7933);
var getPrototypeOf = __webpack_require__(7567);

// `Reflect.get` method
// https://tc39.es/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey);
  if (descriptor) return isDataDescriptor(descriptor)
    ? descriptor.value
    : descriptor.get === undefined ? undefined : call(descriptor.get, receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

$({ target: 'Reflect', stat: true }, {
  get: get
});


/***/ }),

/***/ 2215:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var global = __webpack_require__(9859);
var setToStringTag = __webpack_require__(4555);

$({ global: true }, { Reflect: {} });

// Reflect[@@toStringTag] property
// https://tc39.es/ecma262/#sec-reflect-@@tostringtag
setToStringTag(global.Reflect, 'Reflect', true);


/***/ }),

/***/ 7368:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var global = __webpack_require__(9859);
var uncurryThis = __webpack_require__(5968);
var isForced = __webpack_require__(6541);
var inheritIfRequired = __webpack_require__(835);
var createNonEnumerableProperty = __webpack_require__(5762);
var getOwnPropertyNames = (__webpack_require__(8151).f);
var isPrototypeOf = __webpack_require__(1321);
var isRegExp = __webpack_require__(8311);
var toString = __webpack_require__(3326);
var getRegExpFlags = __webpack_require__(3349);
var stickyHelpers = __webpack_require__(5650);
var proxyAccessor = __webpack_require__(6060);
var defineBuiltIn = __webpack_require__(4768);
var fails = __webpack_require__(4229);
var hasOwn = __webpack_require__(8270);
var enforceInternalState = (__webpack_require__(6407).enforce);
var setSpecies = __webpack_require__(1832);
var wellKnownSymbol = __webpack_require__(95);
var UNSUPPORTED_DOT_ALL = __webpack_require__(2926);
var UNSUPPORTED_NCG = __webpack_require__(461);

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var SyntaxError = global.SyntaxError;
var exec = uncurryThis(RegExpPrototype.exec);
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);
// TODO: Use only proper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS &&
  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      result += chr + charAt(string, ++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = charAt(string, index);
    if (chr === '\\') {
      chr = chr + charAt(string, ++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (exec(IS_NCG, stringSlice(string, index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || hasOwn(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named[named.length] = [groupname, groupid];
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = isPrototypeOf(RegExpPrototype, this);
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString(pattern);
    flags = flags === undefined ? '' : toString(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
      if (dotAll) flags = replace(flags, /s/g, '');
    }

    rawFlags = flags;

    if (MISSED_STICKY && 'sticky' in re1) {
      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
      if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
  }

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  defineBuiltIn(global, 'RegExp', RegExpWrapper, { constructor: true });
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ 4471:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var UNSUPPORTED_DOT_ALL = __webpack_require__(2926);
var classof = __webpack_require__(7079);
var defineBuiltInAccessor = __webpack_require__(6616);
var getInternalState = (__webpack_require__(6407).get);

var RegExpPrototype = RegExp.prototype;
var $TypeError = TypeError;

// `RegExp.prototype.dotAll` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
if (DESCRIPTORS && UNSUPPORTED_DOT_ALL) {
  defineBuiltInAccessor(RegExpPrototype, 'dotAll', {
    configurable: true,
    get: function dotAll() {
      if (this === RegExpPrototype) return undefined;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (classof(this) === 'RegExp') {
        return !!getInternalState(this).dotAll;
      }
      throw $TypeError('Incompatible receiver, RegExp required');
    }
  });
}


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

/***/ 1172:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7400);
var MISSED_STICKY = (__webpack_require__(5650).MISSED_STICKY);
var classof = __webpack_require__(7079);
var defineBuiltInAccessor = __webpack_require__(6616);
var getInternalState = (__webpack_require__(6407).get);

var RegExpPrototype = RegExp.prototype;
var $TypeError = TypeError;

// `RegExp.prototype.sticky` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
if (DESCRIPTORS && MISSED_STICKY) {
  defineBuiltInAccessor(RegExpPrototype, 'sticky', {
    configurable: true,
    get: function sticky() {
      if (this === RegExpPrototype) return undefined;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (classof(this) === 'RegExp') {
        return !!getInternalState(this).sticky;
      }
      throw $TypeError('Incompatible receiver, RegExp required');
    }
  });
}


/***/ }),

/***/ 1850:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(7950);
var $ = __webpack_require__(3103);
var call = __webpack_require__(266);
var uncurryThis = __webpack_require__(5968);
var isCallable = __webpack_require__(6733);
var isObject = __webpack_require__(5052);

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var $TypeError = TypeError;
var un$Test = uncurryThis(/./.test);

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable(exec)) return un$Test(this, str);
    var result = call(exec, this, str);
    if (result !== null && !isObject(result)) {
      throw new $TypeError('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});


/***/ }),

/***/ 8233:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var PROPER_FUNCTION_NAME = (__webpack_require__(1805).PROPER);
var defineBuiltIn = __webpack_require__(4768);
var anObject = __webpack_require__(1176);
var $toString = __webpack_require__(3326);
var fails = __webpack_require__(4229);
var getRegExpFlags = __webpack_require__(3349);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var pattern = $toString(R.source);
    var flags = $toString(getRegExpFlags(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}


/***/ }),

/***/ 2560:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var collection = __webpack_require__(9789);
var collectionStrong = __webpack_require__(8081);

// `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects
collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ 3244:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__(2560);


/***/ }),

/***/ 1235:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var uncurryThis = __webpack_require__(5968);
var notARegExp = __webpack_require__(7272);
var requireObjectCoercible = __webpack_require__(8885);
var toString = __webpack_require__(3326);
var correctIsRegExpLogic = __webpack_require__(8127);

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});


/***/ }),

/***/ 8673:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var charAt = (__webpack_require__(966).charAt);
var toString = __webpack_require__(3326);
var InternalStateModule = __webpack_require__(6407);
var defineIterator = __webpack_require__(7675);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 4069:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(266);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(4954);
var anObject = __webpack_require__(1176);
var toLength = __webpack_require__(4237);
var toString = __webpack_require__(3326);
var requireObjectCoercible = __webpack_require__(8885);
var getMethod = __webpack_require__(5300);
var advanceStringIndex = __webpack_require__(6637);
var regExpExec = __webpack_require__(8115);

// @@match logic
fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ 5734:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var $padStart = (__webpack_require__(6650).start);
var WEBKIT_BUG = __webpack_require__(7456);

// `String.prototype.padStart` method
// https://tc39.es/ecma262/#sec-string.prototype.padstart
$({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
  }
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

/***/ 8319:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__(3171);
var call = __webpack_require__(266);
var uncurryThis = __webpack_require__(5968);
var fixRegExpWellKnownSymbolLogic = __webpack_require__(4954);
var isRegExp = __webpack_require__(8311);
var anObject = __webpack_require__(1176);
var requireObjectCoercible = __webpack_require__(8885);
var speciesConstructor = __webpack_require__(7942);
var advanceStringIndex = __webpack_require__(6637);
var toLength = __webpack_require__(4237);
var toString = __webpack_require__(3326);
var getMethod = __webpack_require__(5300);
var arraySlice = __webpack_require__(9794);
var callRegExpExec = __webpack_require__(8115);
var regexpExec = __webpack_require__(3466);
var stickyHelpers = __webpack_require__(5650);
var fails = __webpack_require__(4229);

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis(/./.exec);
var push = uncurryThis($push);
var stringSlice = uncurryThis(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push(output, '');
      } else push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? call(splitter, separator, O, limit)
        : call(internalSplit, toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);


/***/ }),

/***/ 9956:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(3103);
var global = __webpack_require__(9859);
var call = __webpack_require__(266);
var uncurryThis = __webpack_require__(5968);
var IS_PURE = __webpack_require__(4231);
var DESCRIPTORS = __webpack_require__(7400);
var NATIVE_SYMBOL = __webpack_require__(3839);
var fails = __webpack_require__(4229);
var hasOwn = __webpack_require__(8270);
var isPrototypeOf = __webpack_require__(1321);
var anObject = __webpack_require__(1176);
var toIndexedObject = __webpack_require__(905);
var toPropertyKey = __webpack_require__(9310);
var $toString = __webpack_require__(3326);
var createPropertyDescriptor = __webpack_require__(5358);
var nativeObjectCreate = __webpack_require__(2391);
var objectKeys = __webpack_require__(5632);
var getOwnPropertyNamesModule = __webpack_require__(8151);
var getOwnPropertyNamesExternal = __webpack_require__(166);
var getOwnPropertySymbolsModule = __webpack_require__(894);
var getOwnPropertyDescriptorModule = __webpack_require__(7933);
var definePropertyModule = __webpack_require__(1787);
var definePropertiesModule = __webpack_require__(219);
var propertyIsEnumerableModule = __webpack_require__(9195);
var defineBuiltIn = __webpack_require__(4768);
var shared = __webpack_require__(3036);
var sharedKey = __webpack_require__(4399);
var hiddenKeys = __webpack_require__(5977);
var uid = __webpack_require__(1441);
var wellKnownSymbol = __webpack_require__(95);
var wrappedWellKnownSymbolModule = __webpack_require__(5391);
var defineWellKnownSymbol = __webpack_require__(8423);
var defineSymbolToPrimitive = __webpack_require__(6481);
var setToStringTag = __webpack_require__(4555);
var InternalStateModule = __webpack_require__(6407);
var $forEach = (__webpack_require__(9996).forEach);

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError = global.TypeError;
var QObject = global.QObject;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function (O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  defineBuiltIn(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  defineBuiltIn($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  definePropertiesModule.f = $defineProperties;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      defineBuiltIn(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames
});

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive();

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ 634:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(3103);
var DESCRIPTORS = __webpack_require__(7400);
var global = __webpack_require__(9859);
var uncurryThis = __webpack_require__(5968);
var hasOwn = __webpack_require__(8270);
var isCallable = __webpack_require__(6733);
var isPrototypeOf = __webpack_require__(1321);
var toString = __webpack_require__(3326);
var defineProperty = (__webpack_require__(1787).f);
var copyConstructorProperties = __webpack_require__(7081);

var NativeSymbol = global.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var symbolToString = uncurryThis(SymbolPrototype.toString);
  var symbolValueOf = uncurryThis(SymbolPrototype.valueOf);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  defineProperty(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = symbolValueOf(this);
      var string = symbolToString(symbol);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, constructor: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ 3352:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var getBuiltIn = __webpack_require__(1333);
var hasOwn = __webpack_require__(8270);
var toString = __webpack_require__(3326);
var shared = __webpack_require__(3036);
var NATIVE_SYMBOL_REGISTRY = __webpack_require__(5506);

var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.for` method
// https://tc39.es/ecma262/#sec-symbol.for
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  'for': function (key) {
    var string = toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = getBuiltIn('Symbol')(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  }
});


/***/ }),

/***/ 796:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__(8423);

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ 4115:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__(9956);
__webpack_require__(3352);
__webpack_require__(9717);
__webpack_require__(6710);
__webpack_require__(2067);


/***/ }),

/***/ 9717:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(3103);
var hasOwn = __webpack_require__(8270);
var isSymbol = __webpack_require__(9395);
var tryToString = __webpack_require__(9821);
var shared = __webpack_require__(3036);
var NATIVE_SYMBOL_REGISTRY = __webpack_require__(5506);

var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.keyFor` method
// https://tc39.es/ecma262/#sec-symbol.keyfor
$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(tryToString(sym) + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  }
});


/***/ }),

/***/ 1939:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(9859);
var DOMIterables = __webpack_require__(5694);
var DOMTokenListPrototype = __webpack_require__(8865);
var forEach = __webpack_require__(6570);
var createNonEnumerableProperty = __webpack_require__(5762);

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


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
var isExisty = __webpack_require__(6648);
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

/***/ 6648:
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

/***/ }),

/***/ 6665:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pV": function() { return /* binding */ N; }
/* harmony export */ });
/* unused harmony exports Immer, applyPatches, castDraft, castImmutable, createDraft, current, enableAllPlugins, enableMapSet, enablePatches, finishDraft, freeze, immerable, isDraft, isDraftable, nothing, original, produce, produceWithPatches, setAutoFreeze, setUseProxies */
function n(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];if(false){ var i, o; }throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map((function(n){return"'"+n+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function r(n){return!!n&&!!n[Q]}function t(n){return!!n&&(function(n){if(!n||"object"!=typeof n)return!1;var r=Object.getPrototypeOf(n);if(null===r)return!0;var t=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return t===Object||"function"==typeof t&&Function.toString.call(t)===Z}(n)||Array.isArray(n)||!!n[L]||!!n.constructor[L]||s(n)||v(n))}function e(t){return r(t)||n(23,t),t[Q].t}function i(n,r,t){void 0===t&&(t=!1),0===o(n)?(t?Object.keys:nn)(n).forEach((function(e){t&&"symbol"==typeof e||r(e,n[e],n)})):n.forEach((function(t,e){return r(e,t,n)}))}function o(n){var r=n[Q];return r?r.i>3?r.i-4:r.i:Array.isArray(n)?1:s(n)?2:v(n)?3:0}function u(n,r){return 2===o(n)?n.has(r):Object.prototype.hasOwnProperty.call(n,r)}function a(n,r){return 2===o(n)?n.get(r):n[r]}function f(n,r,t){var e=o(n);2===e?n.set(r,t):3===e?(n.delete(r),n.add(t)):n[r]=t}function c(n,r){return n===r?0!==n||1/n==1/r:n!=n&&r!=r}function s(n){return X&&n instanceof Map}function v(n){return q&&n instanceof Set}function p(n){return n.o||n.t}function l(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var r=rn(n);delete r[Q];for(var t=nn(r),e=0;e<t.length;e++){var i=t[e],o=r[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(r[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]})}return Object.create(Object.getPrototypeOf(n),r)}function d(n,e){return void 0===e&&(e=!1),y(n)||r(n)||!t(n)?n:(o(n)>1&&(n.set=n.add=n.clear=n.delete=h),Object.freeze(n),e&&i(n,(function(n,r){return d(r,!0)}),!0),n)}function h(){n(2)}function y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function b(r){var t=tn[r];return t||n(18,r),t}function m(n,r){tn[n]||(tn[n]=r)}function _(){return true||0,U}function j(n,r){r&&(b("Patches"),n.u=[],n.s=[],n.v=r)}function O(n){g(n),n.p.forEach(S),n.p=null}function g(n){n===U&&(U=n.l)}function w(n){return U={p:[],l:U,h:n,m:!0,_:0}}function S(n){var r=n[Q];0===r.i||1===r.i?r.j():r.O=!0}function P(r,e){e._=e.p.length;var i=e.p[0],o=void 0!==r&&r!==i;return e.h.g||b("ES5").S(e,r,o),o?(i[Q].P&&(O(e),n(4)),t(r)&&(r=M(e,r),e.l||x(e,r)),e.u&&b("Patches").M(i[Q].t,r,e.u,e.s)):r=M(e,i,[]),O(e),e.u&&e.v(e.u,e.s),r!==H?r:void 0}function M(n,r,t){if(y(r))return r;var e=r[Q];if(!e)return i(r,(function(i,o){return A(n,e,r,i,o,t)}),!0),r;if(e.A!==n)return r;if(!e.P)return x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o;i(3===e.i?new Set(o):o,(function(r,i){return A(n,e,o,r,i,t)})),x(n,o,!1),t&&n.u&&b("Patches").R(e,t,n.u,n.s)}return e.o}function A(e,i,o,a,c,s){if( false&&0,r(c)){var v=M(e,c,s&&i&&3!==i.i&&!u(i.D,a)?s.concat(a):void 0);if(f(o,a,v),!r(v))return;e.m=!1}if(t(c)&&!y(c)){if(!e.h.F&&e._<1)return;M(e,c),i&&i.A.l||x(e,c)}}function x(n,r,t){void 0===t&&(t=!1),n.h.F&&n.m&&d(r,t)}function z(n,r){var t=n[Q];return(t?p(t):n)[r]}function I(n,r){if(r in n)for(var t=Object.getPrototypeOf(n);t;){var e=Object.getOwnPropertyDescriptor(t,r);if(e)return e;t=Object.getPrototypeOf(t)}}function k(n){n.P||(n.P=!0,n.l&&k(n.l))}function E(n){n.o||(n.o=l(n.t))}function R(n,r,t){var e=s(r)?b("MapSet").N(r,t):v(r)?b("MapSet").T(r,t):n.g?function(n,r){var t=Array.isArray(n),e={i:t?1:0,A:r?r.A:_(),P:!1,I:!1,D:{},l:r,t:n,k:null,o:null,j:null,C:!1},i=e,o=en;t&&(i=[e],o=on);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(r,t):b("ES5").J(r,t);return(t?t.A:_()).p.push(e),e}function D(e){return r(e)||n(22,e),function n(r){if(!t(r))return r;var e,u=r[Q],c=o(r);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=F(r,c),u.I=!1}else e=F(r,c);return i(e,(function(r,t){u&&a(u.t,r)===t||f(e,r,n(t))})),3===c?new Set(e):e}(e)}function F(n,r){switch(r){case 2:return new Map(n);case 3:return Array.from(n)}return l(n)}function N(){function t(n,r){var t=s[n];return t?t.enumerable=r:s[n]=t={configurable:!0,enumerable:r,get:function(){var r=this[Q];return false&&0,en.get(r,n)},set:function(r){var t=this[Q]; false&&0,en.set(t,n,r)}},t}function e(n){for(var r=n.length-1;r>=0;r--){var t=n[r][Q];if(!t.P)switch(t.i){case 5:a(t)&&k(t);break;case 4:o(t)&&k(t)}}}function o(n){for(var r=n.t,t=n.k,e=nn(t),i=e.length-1;i>=0;i--){var o=e[i];if(o!==Q){var a=r[o];if(void 0===a&&!u(r,o))return!0;var f=t[o],s=f&&f[Q];if(s?s.t!==a:!c(f,a))return!0}}var v=!!r[Q];return e.length!==nn(r).length+(v?0:1)}function a(n){var r=n.k;if(r.length!==n.t.length)return!0;var t=Object.getOwnPropertyDescriptor(r,r.length-1);if(t&&!t.get)return!0;for(var e=0;e<r.length;e++)if(!r.hasOwnProperty(e))return!0;return!1}function f(r){r.O&&n(3,JSON.stringify(p(r)))}var s={};m("ES5",{J:function(n,r){var e=Array.isArray(n),i=function(n,r){if(n){for(var e=Array(r.length),i=0;i<r.length;i++)Object.defineProperty(e,""+i,t(i,!0));return e}var o=rn(r);delete o[Q];for(var u=nn(o),a=0;a<u.length;a++){var f=u[a];o[f]=t(f,n||!!o[f].enumerable)}return Object.create(Object.getPrototypeOf(r),o)}(e,n),o={i:e?5:4,A:r?r.A:_(),P:!1,I:!1,D:{},l:r,t:n,k:i,o:null,O:!1,C:!1};return Object.defineProperty(i,Q,{value:o,writable:!0}),i},S:function(n,t,o){o?r(t)&&t[Q].A===n&&e(n.p):(n.u&&function n(r){if(r&&"object"==typeof r){var t=r[Q];if(t){var e=t.t,o=t.k,f=t.D,c=t.i;if(4===c)i(o,(function(r){r!==Q&&(void 0!==e[r]||u(e,r)?f[r]||n(o[r]):(f[r]=!0,k(t)))})),i(e,(function(n){void 0!==o[n]||u(o,n)||(f[n]=!1,k(t))}));else if(5===c){if(a(t)&&(k(t),f.length=!0),o.length<e.length)for(var s=o.length;s<e.length;s++)f[s]=!1;else for(var v=e.length;v<o.length;v++)f[v]=!0;for(var p=Math.min(o.length,e.length),l=0;l<p;l++)o.hasOwnProperty(l)||(f[l]=!0),void 0===f[l]&&n(o[l])}}}}(n.p[0]),e(n.p))},K:function(n){return 4===n.i?o(n):a(n)}})}function T(){function e(n){if(!t(n))return n;if(Array.isArray(n))return n.map(e);if(s(n))return new Map(Array.from(n.entries()).map((function(n){return[n[0],e(n[1])]})));if(v(n))return new Set(Array.from(n).map(e));var r=Object.create(Object.getPrototypeOf(n));for(var i in n)r[i]=e(n[i]);return u(n,L)&&(r[L]=n[L]),r}function f(n){return r(n)?e(n):n}var c="add";m("Patches",{$:function(r,t){return t.forEach((function(t){for(var i=t.path,u=t.op,f=r,s=0;s<i.length-1;s++){var v=o(f),p=""+i[s];0!==v&&1!==v||"__proto__"!==p&&"constructor"!==p||n(24),"function"==typeof f&&"prototype"===p&&n(24),"object"!=typeof(f=a(f,p))&&n(15,i.join("/"))}var l=o(f),d=e(t.value),h=i[i.length-1];switch(u){case"replace":switch(l){case 2:return f.set(h,d);case 3:n(16);default:return f[h]=d}case c:switch(l){case 1:return"-"===h?f.push(d):f.splice(h,0,d);case 2:return f.set(h,d);case 3:return f.add(d);default:return f[h]=d}case"remove":switch(l){case 1:return f.splice(h,1);case 2:return f.delete(h);case 3:return f.delete(t.value);default:return delete f[h]}default:n(17,u)}})),r},R:function(n,r,t,e){switch(n.i){case 0:case 4:case 2:return function(n,r,t,e){var o=n.t,s=n.o;i(n.D,(function(n,i){var v=a(o,n),p=a(s,n),l=i?u(o,n)?"replace":c:"remove";if(v!==p||"replace"!==l){var d=r.concat(n);t.push("remove"===l?{op:l,path:d}:{op:l,path:d,value:p}),e.push(l===c?{op:"remove",path:d}:"remove"===l?{op:c,path:d,value:f(v)}:{op:"replace",path:d,value:f(v)})}}))}(n,r,t,e);case 5:case 1:return function(n,r,t,e){var i=n.t,o=n.D,u=n.o;if(u.length<i.length){var a=[u,i];i=a[0],u=a[1];var s=[e,t];t=s[0],e=s[1]}for(var v=0;v<i.length;v++)if(o[v]&&u[v]!==i[v]){var p=r.concat([v]);t.push({op:"replace",path:p,value:f(u[v])}),e.push({op:"replace",path:p,value:f(i[v])})}for(var l=i.length;l<u.length;l++){var d=r.concat([l]);t.push({op:c,path:d,value:f(u[l])})}i.length<u.length&&e.push({op:"replace",path:r.concat(["length"]),value:i.length})}(n,r,t,e);case 3:return function(n,r,t,e){var i=n.t,o=n.o,u=0;i.forEach((function(n){if(!o.has(n)){var i=r.concat([u]);t.push({op:"remove",path:i,value:n}),e.unshift({op:c,path:i,value:n})}u++})),u=0,o.forEach((function(n){if(!i.has(n)){var o=r.concat([u]);t.push({op:c,path:o,value:n}),e.unshift({op:"remove",path:o,value:n})}u++}))}(n,r,t,e)}},M:function(n,r,t,e){t.push({op:"replace",path:[],value:r===H?void 0:r}),e.push({op:"replace",path:[],value:n})}})}function C(){function r(n,r){function t(){this.constructor=n}a(n,r),n.prototype=(t.prototype=r.prototype,new t)}function e(n){n.o||(n.D=new Map,n.o=new Map(n.t))}function o(n){n.o||(n.o=new Set,n.t.forEach((function(r){if(t(r)){var e=R(n.A.h,r,n);n.p.set(r,e),n.o.add(e)}else n.o.add(r)})))}function u(r){r.O&&n(3,JSON.stringify(p(r)))}var a=function(n,r){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,r){n.__proto__=r}||function(n,r){for(var t in r)r.hasOwnProperty(t)&&(n[t]=r[t])})(n,r)},f=function(){function n(n,r){return this[Q]={i:2,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,D:void 0,t:n,k:this,C:!1,O:!1},this}r(n,Map);var o=n.prototype;return Object.defineProperty(o,"size",{get:function(){return p(this[Q]).size}}),o.has=function(n){return p(this[Q]).has(n)},o.set=function(n,r){var t=this[Q];return u(t),p(t).has(n)&&p(t).get(n)===r||(e(t),k(t),t.D.set(n,!0),t.o.set(n,r),t.D.set(n,!0)),this},o.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),e(r),k(r),r.t.has(n)?r.D.set(n,!1):r.D.delete(n),r.o.delete(n),!0},o.clear=function(){var n=this[Q];u(n),p(n).size&&(e(n),k(n),n.D=new Map,i(n.t,(function(r){n.D.set(r,!1)})),n.o.clear())},o.forEach=function(n,r){var t=this;p(this[Q]).forEach((function(e,i){n.call(r,t.get(i),i,t)}))},o.get=function(n){var r=this[Q];u(r);var i=p(r).get(n);if(r.I||!t(i))return i;if(i!==r.t.get(n))return i;var o=R(r.A.h,i,r);return e(r),r.o.set(n,o),o},o.keys=function(){return p(this[Q]).keys()},o.values=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.values()},n.next=function(){var n=t.next();return n.done?n:{done:!1,value:r.get(n.value)}},n},o.entries=function(){var n,r=this,t=this.keys();return(n={})[V]=function(){return r.entries()},n.next=function(){var n=t.next();if(n.done)return n;var e=r.get(n.value);return{done:!1,value:[n.value,e]}},n},o[V]=function(){return this.entries()},n}(),c=function(){function n(n,r){return this[Q]={i:3,l:r,A:r?r.A:_(),P:!1,I:!1,o:void 0,t:n,k:this,p:new Map,O:!1,C:!1},this}r(n,Set);var t=n.prototype;return Object.defineProperty(t,"size",{get:function(){return p(this[Q]).size}}),t.has=function(n){var r=this[Q];return u(r),r.o?!!r.o.has(n)||!(!r.p.has(n)||!r.o.has(r.p.get(n))):r.t.has(n)},t.add=function(n){var r=this[Q];return u(r),this.has(n)||(o(r),k(r),r.o.add(n)),this},t.delete=function(n){if(!this.has(n))return!1;var r=this[Q];return u(r),o(r),k(r),r.o.delete(n)||!!r.p.has(n)&&r.o.delete(r.p.get(n))},t.clear=function(){var n=this[Q];u(n),p(n).size&&(o(n),k(n),n.o.clear())},t.values=function(){var n=this[Q];return u(n),o(n),n.o.values()},t.entries=function(){var n=this[Q];return u(n),o(n),n.o.entries()},t.keys=function(){return this.values()},t[V]=function(){return this.values()},t.forEach=function(n,r){for(var t=this.values(),e=t.next();!e.done;)n.call(r,e.value,e.value,this),e=t.next()},n}();m("MapSet",{N:function(n,r){return new f(n,r)},T:function(n,r){return new c(n,r)}})}function J(){N(),C(),T()}function K(n){return n}function $(n){return n}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,q="undefined"!=typeof Set,B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",V="undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator",Y={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(n){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+n},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(n){return"Cannot apply patch, path doesn't resolve: "+n},16:'Sets cannot have "replace" patches.',17:function(n){return"Unsupported patch operation: "+n},18:function(n){return"The plugin for '"+n+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+n+"()` when initializing your application."},20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(n){return"produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+n+"'"},22:function(n){return"'current' expects a draft, got: "+n},23:function(n){return"'original' expects a draft, got: "+n},24:"Patching reserved attributes like __proto__, prototype and constructor is not allowed"},Z=""+Object.prototype.constructor,nn="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,rn=Object.getOwnPropertyDescriptors||function(n){var r={};return nn(n).forEach((function(t){r[t]=Object.getOwnPropertyDescriptor(n,t)})),r},tn={},en={get:function(n,r){if(r===Q)return n;var e=p(n);if(!u(e,r))return function(n,r,t){var e,i=I(r,t);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,r);var i=e[r];return n.I||!t(i)?i:i===z(n.t,r)?(E(n),n.o[r]=R(n.A.h,i,n)):i},has:function(n,r){return r in p(n)},ownKeys:function(n){return Reflect.ownKeys(p(n))},set:function(n,r,t){var e=I(p(n),r);if(null==e?void 0:e.set)return e.set.call(n.k,t),!0;if(!n.P){var i=z(p(n),r),o=null==i?void 0:i[Q];if(o&&o.t===t)return n.o[r]=t,n.D[r]=!1,!0;if(c(t,i)&&(void 0!==t||u(n.t,r)))return!0;E(n),k(n)}return n.o[r]===t&&"number"!=typeof t&&(void 0!==t||r in n.o)||(n.o[r]=t,n.D[r]=!0,!0)},deleteProperty:function(n,r){return void 0!==z(n.t,r)||r in n.t?(n.D[r]=!1,E(n),k(n)):delete n.D[r],n.o&&delete n.o[r],!0},getOwnPropertyDescriptor:function(n,r){var t=p(n),e=Reflect.getOwnPropertyDescriptor(t,r);return e?{writable:!0,configurable:1!==n.i||"length"!==r,enumerable:e.enumerable,value:t[r]}:e},defineProperty:function(){n(11)},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){n(12)}},on={};i(en,(function(n,r){on[n]=function(){return arguments[0]=arguments[0][0],r.apply(this,arguments)}})),on.deleteProperty=function(r,t){return false&&0,on.set.call(this,r,t,void 0)},on.set=function(r,t,e){return false&&0,en.set.call(this,r[0],t,e,r[0])};var un=function(){function e(r){var e=this;this.g=B,this.F=!0,this.produce=function(r,i,o){if("function"==typeof r&&"function"!=typeof i){var u=i;i=r;var a=e;return function(n){var r=this;void 0===n&&(n=u);for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a.produce(n,(function(n){var t;return(t=i).call.apply(t,[r,n].concat(e))}))}}var f;if("function"!=typeof i&&n(6),void 0!==o&&"function"!=typeof o&&n(7),t(r)){var c=w(e),s=R(e,r,void 0),v=!0;try{f=i(s),v=!1}finally{v?O(c):g(c)}return"undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return j(c,o),P(n,c)}),(function(n){throw O(c),n})):(j(c,o),P(f,c))}if(!r||"object"!=typeof r){if(void 0===(f=i(r))&&(f=r),f===H&&(f=void 0),e.F&&d(f,!0),o){var p=[],l=[];b("Patches").M(r,f,p,l),o(p,l)}return f}n(21,r)},this.produceWithPatches=function(n,r){if("function"==typeof n)return function(r){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return e.produceWithPatches(r,(function(r){return n.apply(void 0,[r].concat(i))}))};var t,i,o=e.produce(n,r,(function(n,r){t=n,i=r}));return"undefined"!=typeof Promise&&o instanceof Promise?o.then((function(n){return[n,t,i]})):[o,t,i]},"boolean"==typeof(null==r?void 0:r.useProxies)&&this.setUseProxies(r.useProxies),"boolean"==typeof(null==r?void 0:r.autoFreeze)&&this.setAutoFreeze(r.autoFreeze)}var i=e.prototype;return i.createDraft=function(e){t(e)||n(8),r(e)&&(e=D(e));var i=w(this),o=R(this,e,void 0);return o[Q].C=!0,g(i),o},i.finishDraft=function(r,t){var e=r&&r[Q]; false&&(0);var i=e.A;return j(i,t),P(void 0,i)},i.setAutoFreeze=function(n){this.F=n},i.setUseProxies=function(r){r&&!B&&n(20),this.g=r},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}e>-1&&(t=t.slice(e+1));var o=b("Patches").$;return r(n)?o(n,t):this.produce(n,(function(n){return o(n,t)}))},e}(),an=new un,fn=an.produce,cn=an.produceWithPatches.bind(an),sn=an.setAutoFreeze.bind(an),vn=an.setUseProxies.bind(an),pn=an.applyPatches.bind(an),ln=an.createDraft.bind(an),dn=an.finishDraft.bind(an);/* harmony default export */ __webpack_exports__["ZP"] = (fn);
//# sourceMappingURL=immer.esm.js.map


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
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6665);
(0,immer__WEBPACK_IMPORTED_MODULE_0__/* .enableES5 */ .pV)();
}();
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ src_0; }
});

// UNUSED EXPORTS: Day, Month, TZDate, Week

// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(9228);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(8188);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.object.values.js
var es_object_values = __webpack_require__(7890);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.object.get-prototype-of.js
var es_object_get_prototype_of = __webpack_require__(6928);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.reflect.to-string-tag.js
var es_reflect_to_string_tag = __webpack_require__(2215);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.reflect.construct.js
var es_reflect_construct = __webpack_require__(1229);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.error.cause.js
var es_error_cause = __webpack_require__(1372);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(4115);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(634);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(796);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(5735);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8673);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(6886);
;// CONCATENATED MODULE: ../../node_modules/preact/dist/preact.module.js
var n,preact_module_l,u,i,t,o,r,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n)}function h(l,u,i){var t,o,r,f={};for(r in u)"key"==r?t=u[r]:"ref"==r?o=u[r]:f[r]=u[r];if(arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):i),"function"==typeof l&&null!=l.defaultProps)for(r in l.defaultProps)void 0===f[r]&&(f[r]=l.defaultProps[r]);return v(l,f,t,o,null)}function v(n,i,t,o,r){var f={type:n,props:i,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==r?++u:r};return null==r&&null!=preact_module_l.vnode&&preact_module_l.vnode(f),f}function y(){return{current:null}}function p(n){return n.children}function d(n,l){this.props=n,this.context=l}function _(n,l){if(null==l)return n.__?_(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?_(n):null}function k(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return k(n)}}function b(n){(!n.__d&&(n.__d=!0)&&t.push(n)&&!g.__r++||o!==preact_module_l.debounceRendering)&&((o=preact_module_l.debounceRendering)||setTimeout)(g)}function g(){for(var n;g.__r=t.length;)n=t.sort(function(n,l){return n.__v.__b-l.__v.__b}),t=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=s({},t)).__v=t.__v+1,j(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?_(t):o,t.__h),z(u,t),t.__e!=o&&k(t)))})}function w(n,l,u,i,t,o,r,c,s,a){var h,y,d,k,b,g,w,x=i&&i.__k||e,C=x.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k||"bigint"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(p,{children:k},null,null,null):k.__b>0?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(d=x[h])||d&&k.key==d.key&&k.type===d.type)x[h]=void 0;else for(y=0;y<C;y++){if((d=x[y])&&k.key==d.key&&k.type===d.type){x[y]=void 0;break}d=null}j(n,k,d=d||f,t,o,r,c,s,a),b=k.__e,(y=k.ref)&&d.ref!=y&&(w||(w=[]),d.ref&&w.push(d.ref,null,k),w.push(y,k.__c||b,k)),null!=b?(null==g&&(g=b),"function"==typeof k.type&&k.__k===d.__k?k.__d=s=m(k,s,n):s=A(n,k,d,x,b,s),"function"==typeof u.type&&(u.__d=s)):s&&d.__e==s&&s.parentNode!=n&&(s=_(d))}for(u.__e=g,h=C;h--;)null!=x[h]&&("function"==typeof u.type&&null!=x[h].__e&&x[h].__e==u.__d&&(u.__d=_(i,h+1)),N(x[h],x[h]));if(w)for(h=0;h<w.length;h++)M(w[h],w[++h],w[++h])}function m(n,l,u){for(var i,t=n.__k,o=0;t&&o<t.length;o++)(i=t[o])&&(i.__=n,l="function"==typeof i.type?m(i,l,u):A(u,i,i,t,i.__e,l));return l}function x(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){x(n,l)}):l.push(n)),l}function A(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else{for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o}return void 0!==r?r:t.nextSibling}function C(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||H(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||H(n,o,l[o],u[o],i)}function $(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||c.test(l)?u:u+"px"}function H(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||$(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||$(n.style,l,u[l])}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?T:I,o):n.removeEventListener(l,o?T:I,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l))}}function I(n){this.l[n.type+!1](preact_module_l.event?preact_module_l.event(n):n)}function T(n){this.l[n.type+!0](preact_module_l.event?preact_module_l.event(n):n)}function j(n,u,i,t,o,r,f,e,c){var a,h,v,y,_,k,b,g,m,x,A,C,$,H=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=preact_module_l.__b)&&a(u);try{n:if("function"==typeof H){if(g=u.props,m=(a=H.contextType)&&t[a.__c],x=a?m?m.props.value:a.__:t,i.__c?b=(h=u.__c=i.__c).__=h.__E:("prototype"in H&&H.prototype.render?u.__c=h=new H(g,x):(u.__c=h=new d(g,x),h.constructor=H,h.render=O),m&&m.sub(h),h.props=g,h.state||(h.state={}),h.context=x,h.__n=t,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=H.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=s({},h.__s)),s(h.__s,H.getDerivedStateFromProps(g,h.__s))),y=h.props,_=h.state,v)null==H.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(null==H.getDerivedStateFromProps&&g!==y&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(g,x),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(g,h.__s,x)||u.__v===i.__v){h.props=g,h.state=h.__s,u.__v!==i.__v&&(h.__d=!1),h.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u)}),h.__h.length&&f.push(h);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(g,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(y,_,k)})}if(h.context=x,h.props=g,h.__v=u,h.__P=n,A=preact_module_l.__r,C=0,"prototype"in H&&H.prototype.render)h.state=h.__s,h.__d=!1,A&&A(u),a=h.render(h.props,h.state,h.context);else do{h.__d=!1,A&&A(u),a=h.render(h.props,h.state,h.context),h.state=h.__s}while(h.__d&&++C<25);h.state=h.__s,null!=h.getChildContext&&(t=s(s({},t),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(k=h.getSnapshotBeforeUpdate(y,_)),$=null!=a&&a.type===p&&null==a.key?a.props.children:a,w(n,Array.isArray($)?$:[$],u,i,t,o,r,f,e,c),h.base=u.__e,u.__h=null,h.__h.length&&f.push(h),b&&(h.__E=h.__=null),h.__e=!1}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=L(i.__e,u,i,t,o,r,f,c);(a=preact_module_l.diffed)&&a(u)}catch(n){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),preact_module_l.__e(n,u,i)}}function z(n,u){preact_module_l.__c&&preact_module_l.__c(u,n),n.some(function(u){try{n=u.__h,u.__h=[],n.some(function(n){n.call(u)})}catch(n){preact_module_l.__e(n,u.__v)}})}function L(l,u,i,t,o,r,e,c){var s,h,v,y=i.props,p=u.props,d=u.type,k=0;if("svg"===d&&(o=!0),null!=r)for(;k<r.length;k++)if((s=r[k])&&"setAttribute"in s==!!d&&(d?s.localName===d:3===s.nodeType)){l=s,r[k]=null;break}if(null==l){if(null===d)return document.createTextNode(p);l=o?document.createElementNS("http://www.w3.org/2000/svg",d):document.createElement(d,p.is&&p),r=null,c=!1}if(null===d)y===p||c&&l.data===p||(l.data=p);else{if(r=r&&n.call(l.childNodes),h=(y=i.props||f).dangerouslySetInnerHTML,v=p.dangerouslySetInnerHTML,!c){if(null!=r)for(y={},k=0;k<l.attributes.length;k++)y[l.attributes[k].name]=l.attributes[k].value;(v||h)&&(v&&(h&&v.__html==h.__html||v.__html===l.innerHTML)||(l.innerHTML=v&&v.__html||""))}if(C(l,p,y,o,c),v)u.__k=[];else if(k=u.props.children,w(l,Array.isArray(k)?k:[k],u,i,t,o&&"foreignObject"!==d,r,e,r?r[0]:i.__k&&_(i,0),c),null!=r)for(k=r.length;k--;)null!=r[k]&&a(r[k]);c||("value"in p&&void 0!==(k=p.value)&&(k!==l.value||"progress"===d&&!k||"option"===d&&k!==y.value)&&H(l,"value",k,y.value,!1),"checked"in p&&void 0!==(k=p.checked)&&k!==l.checked&&H(l,"checked",k,y.checked,!1))}return l}function M(n,u,i){try{"function"==typeof n?n(u):n.current=u}catch(n){preact_module_l.__e(n,i)}}function N(n,u,i){var t,o;if(preact_module_l.unmount&&preact_module_l.unmount(n),(t=n.ref)&&(t.current&&t.current!==n.__e||M(t,null,u)),null!=(t=n.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount()}catch(n){preact_module_l.__e(n,u)}t.base=t.__P=null}if(t=n.__k)for(o=0;o<t.length;o++)t[o]&&N(t[o],u,"function"!=typeof n.type);i||null==n.__e||a(n.__e),n.__e=n.__d=void 0}function O(n,l,u){return this.constructor(n,u)}function P(u,i,t){var o,r,e;preact_module_l.__&&preact_module_l.__(u,i),r=(o="function"==typeof t)?null:t&&t.__k||i.__k,e=[],j(i,u=(!o&&t||i).__k=h(p,null,[u]),r||f,f,void 0!==i.ownerSVGElement,!o&&t?[t]:r?null:i.firstChild?n.call(i.childNodes):null,e,!o&&t?t:r?r.__e:i.firstChild,o),z(e,u)}function S(n,l){P(n,l,S)}function q(l,u,i){var t,o,r,f=s({},l.props);for(r in u)"key"==r?t=u[r]:"ref"==r?o=u[r]:f[r]=u[r];return arguments.length>2&&(f.children=arguments.length>3?n.call(arguments,2):i),v(l.type,f,t||l.key,o||l.ref,null)}function B(n,l){var u={__c:l="__cC"+r++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(b)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n=e.slice,preact_module_l={__e:function(n,l,u,i){for(var t,o,r;l=l.__;)if((t=l.__c)&&!t.__)try{if((o=t.constructor)&&null!=o.getDerivedStateFromError&&(t.setState(o.getDerivedStateFromError(n)),r=t.__d),null!=t.componentDidCatch&&(t.componentDidCatch(n,i||{}),r=t.__d),r)return t.__E=t}catch(l){n=l}throw n}},u=0,i=function(n){return null!=n&&void 0===n.constructor},d.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(s({},u),this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),b(this))},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),b(this))},d.prototype.render=p,t=[],g.__r=0,r=0;
//# sourceMappingURL=preact.module.js.map

;// CONCATENATED MODULE: ../../node_modules/preact/hooks/dist/hooks.module.js
var hooks_module_t,hooks_module_u,hooks_module_r,hooks_module_o,hooks_module_i=0,hooks_module_c=[],hooks_module_f=[],hooks_module_e=preact_module_l.__b,hooks_module_a=preact_module_l.__r,hooks_module_v=preact_module_l.diffed,l=preact_module_l.__c,hooks_module_m=preact_module_l.unmount;function hooks_module_p(t,r){preact_module_l.__h&&preact_module_l.__h(hooks_module_u,t,hooks_module_i||r),hooks_module_i=0;var o=hooks_module_u.__H||(hooks_module_u.__H={__:[],__h:[]});return t>=o.__.length&&o.__.push({__V:hooks_module_f}),o.__[t]}function hooks_module_y(n){return hooks_module_i=1,hooks_module_d(hooks_module_z,n)}function hooks_module_d(n,r,o){var i=hooks_module_p(hooks_module_t++,2);return i.t=n,i.__c||(i.__=[o?o(r):hooks_module_z(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}))}],i.__c=hooks_module_u),i.__}function hooks_module_(r,o){var i=hooks_module_p(hooks_module_t++,3);!preact_module_l.__s&&hooks_module_w(i.__H,o)&&(i.__=r,i.u=o,hooks_module_u.__H.__h.push(i))}function hooks_module_h(r,o){var i=hooks_module_p(hooks_module_t++,4);!preact_module_l.__s&&hooks_module_w(i.__H,o)&&(i.__=r,i.u=o,hooks_module_u.__h.push(i))}function hooks_module_s(n){return hooks_module_i=5,F(function(){return{current:n}},[])}function hooks_module_A(n,t,u){hooks_module_i=6,hooks_module_h(function(){return"function"==typeof n?(n(t()),function(){return n(null)}):n?(n.current=t(),function(){return n.current=null}):void 0},null==u?u:u.concat(n))}function F(n,u){var r=hooks_module_p(hooks_module_t++,7);return hooks_module_w(r.__H,u)?(r.__V=n(),r.u=u,r.__h=n,r.__V):r.__}function hooks_module_T(n,t){return hooks_module_i=8,F(function(){return n},t)}function hooks_module_q(n){var r=hooks_module_u.context[n.__c],o=hooks_module_p(hooks_module_t++,9);return o.c=n,r?(null==o.__&&(o.__=!0,r.sub(hooks_module_u)),r.props.value):n.__}function hooks_module_x(t,u){preact_module_l.useDebugValue&&preact_module_l.useDebugValue(u?u(t):t)}function V(n){var r=hooks_module_p(hooks_module_t++,10),o=hooks_module_y();return r.__=n,hooks_module_u.componentDidCatch||(hooks_module_u.componentDidCatch=function(n){r.__&&r.__(n),o[1](n)}),[o[0],function(){o[1](void 0)}]}function hooks_module_b(){for(var t;t=hooks_module_c.shift();)if(t.__P)try{t.__H.__h.forEach(hooks_module_j),t.__H.__h.forEach(hooks_module_k),t.__H.__h=[]}catch(u){t.__H.__h=[],preact_module_l.__e(u,t.__v)}}preact_module_l.__b=function(n){hooks_module_u=null,hooks_module_e&&hooks_module_e(n)},preact_module_l.__r=function(n){hooks_module_a&&hooks_module_a(n),hooks_module_t=0;var o=(hooks_module_u=n.__c).__H;o&&(hooks_module_r===hooks_module_u?(o.__h=[],hooks_module_u.__h=[],o.__.forEach(function(n){n.__V=hooks_module_f,n.u=void 0})):(o.__h.forEach(hooks_module_j),o.__h.forEach(hooks_module_k),o.__h=[])),hooks_module_r=hooks_module_u},preact_module_l.diffed=function(t){hooks_module_v&&hooks_module_v(t);var i=t.__c;i&&i.__H&&(i.__H.__h.length&&(1!==hooks_module_c.push(i)&&hooks_module_o===preact_module_l.requestAnimationFrame||((hooks_module_o=preact_module_l.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),hooks_module_g&&cancelAnimationFrame(t),setTimeout(n)},r=setTimeout(u,100);hooks_module_g&&(t=requestAnimationFrame(u))})(hooks_module_b)),i.__H.__.forEach(function(n){n.u&&(n.__H=n.u),n.__V!==hooks_module_f&&(n.__=n.__V),n.u=void 0,n.__V=hooks_module_f})),hooks_module_r=hooks_module_u=null},preact_module_l.__c=function(t,u){u.some(function(t){try{t.__h.forEach(hooks_module_j),t.__h=t.__h.filter(function(n){return!n.__||hooks_module_k(n)})}catch(r){u.some(function(n){n.__h&&(n.__h=[])}),u=[],preact_module_l.__e(r,t.__v)}}),l&&l(t,u)},preact_module_l.unmount=function(t){hooks_module_m&&hooks_module_m(t);var u,r=t.__c;r&&r.__H&&(r.__H.__.forEach(function(n){try{hooks_module_j(n)}catch(n){u=n}}),u&&preact_module_l.__e(u,r.__v))};var hooks_module_g="function"==typeof requestAnimationFrame;function hooks_module_j(n){var t=hooks_module_u,r=n.__c;"function"==typeof r&&(n.__c=void 0,r()),hooks_module_u=t}function hooks_module_k(n){var t=hooks_module_u;n.__c=n.__(),hooks_module_u=t}function hooks_module_w(n,t){return!n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function hooks_module_z(n,t){return"function"==typeof t?t(n):t}
//# sourceMappingURL=hooks.module.js.map

// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(3450);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__(9529);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__(1235);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(2501);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(6936);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__(7233);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(7950);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.regexp.test.js
var es_regexp_test = __webpack_require__(1850);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(4769);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(8178);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(5342);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(8625);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(1939);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__(2775);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(3439);
// EXTERNAL MODULE: ../../node_modules/immer/dist/immer.esm.mjs
var immer_esm = __webpack_require__(6665);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__(1245);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__(9805);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(6781);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(5883);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__(5940);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__(4069);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__(8319);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/array/range.js
var range = __webpack_require__(7386);
var range_default = /*#__PURE__*/__webpack_require__.n(range);
;// CONCATENATED MODULE: ./src/constants/style.ts
// common day name
var DEFAULT_DAY_NAME_MARGIN_LEFT = '0'; // month day name

var MONTH_DAY_NAME_HEIGHT = 31; // month event

var MONTH_EVENT_BORDER_RADIUS = 2;
var MONTH_EVENT_HEIGHT = 24;
var MONTH_EVENT_MARGIN_TOP = 2;
var MONTH_EVENT_MARGIN_LEFT = 8;
var MONTH_EVENT_MARGIN_RIGHT = 8; // month cell

var MONTH_CELL_PADDING_TOP = 3;
var MONTH_CELL_BAR_HEIGHT = 27; // month more view

var MONTH_MORE_VIEW_PADDING = 5;
var MONTH_MORE_VIEW_MIN_WIDTH = 280;
var MONTH_MORE_VIEW_HEADER_HEIGHT = 44;
var MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM = 12;
var MONTH_MORE_VIEW_HEADER_PADDING_TOP = 12;
var MONTH_MORE_VIEW_HEADER_PADDING = '12px 17px 0'; // week day name

var WEEK_DAY_NAME_HEIGHT = 42;
var WEEK_DAY_NAME_BORDER = 1; // week panel resizer

var WEEK_PANEL_RESIZER_HEIGHT = 3; // week event

var WEEK_EVENT_BORDER_RADIUS = 2;
var WEEK_EVENT_HEIGHT = 24;
var WEEK_EVENT_MARGIN_TOP = 2;
var WEEK_EVENT_MARGIN_LEFT = 8;
var WEEK_EVENT_MARGIN_RIGHT = 8;
var DEFAULT_PANEL_HEIGHT = 72; // default color values for events

var DEFAULT_EVENT_COLORS = {
  color: '#000',
  backgroundColor: '#a1b56c',
  dragBackgroundColor: '#a1b56c',
  borderColor: '#000'
};
var TIME_EVENT_CONTAINER_MARGIN_LEFT = 2;
var COLLAPSED_DUPLICATE_EVENT_WIDTH_PX = 9;
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/type/isString.js
var isString = __webpack_require__(758);
var isString_default = /*#__PURE__*/__webpack_require__.n(isString);
;// CONCATENATED MODULE: ./src/helpers/css.ts










var CSS_PREFIX = 'toastui-calendar-';
function cls() {
  var result = [];

  for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    args[_key2] = arguments[_key2];
  }

  args.forEach(function (arg) {
    if (!arg) {
      return;
    }

    if (isString_default()(arg)) {
      result.push(arg);
    } else {
      Object.keys(arg).forEach(function (className) {
        if (arg[className]) {
          result.push(className);
        }
      });
    }
  });
  return result.map(function (str) {
    return "".concat(CSS_PREFIX).concat(str);
  }).join(' ');
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
  var percentRegexp = /(\d+)%/;
  var percentResult = value.match(percentRegexp);
  var pxRegexp = /(-?)\s?(\d+)px/;
  var pxResult = value.match(pxRegexp);
  return {
    percent: percentResult ? parseInt(percentResult[1], 10) : 0,
    px: pxResult ? parseInt("".concat(pxResult[1]).concat(pxResult[2]), 10) : 0
  };
}
function getEventColors(uiModel, calendarColor) {
  var eventColors = uiModel.model.getColors();
  return Object.keys(DEFAULT_EVENT_COLORS).reduce(function (colors, _key) {
    var _ref, _eventColors$key;

    var key = _key;
    colors[key] = (_ref = (_eventColors$key = eventColors[key]) !== null && _eventColors$key !== void 0 ? _eventColors$key : calendarColor[key]) !== null && _ref !== void 0 ? _ref : DEFAULT_EVENT_COLORS[key];
    return colors;
  }, {});
}
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(8233);
;// CONCATENATED MODULE: ../../libs/date/src/localDate.js
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



















/**
 * datetime regex from https://www.regexpal.com/94925
 * timezone regex from moment
 */

var rISO8601 = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.)?([0-9]+)?([+-]\d\d(?::?\d\d)?|\s*Z)?$/;

function throwNotSupported() {
  throw new Error('This operation is not supported.');
}

function getDateTime(dateString) {
  var match = rISO8601.exec(dateString);

  if (match) {
    var _match = _slicedToArray(match, 10),
        y = _match[1],
        M = _match[2],
        d = _match[3],
        h = _match[4],
        m = _match[5],
        s = _match[6],
        ms = _match[8],
        zoneInfo = _match[9];

    return {
      y: Number(y),
      M: Number(M) - 1,
      d: Number(d),
      h: Number(h),
      m: Number(m),
      s: Number(s),
      ms: Number(ms) || 0,
      zoneInfo: zoneInfo
    };
  }

  return null;
}

function createFromDateString(dateString) {
  var info = getDateTime(dateString);

  if (info && !info.zoneInfo) {
    var y = info.y,
        M = info.M,
        d = info.d,
        h = info.h,
        m = info.m,
        s = info.s,
        ms = info.ms;
    return new Date(y, M, d, h, m, s, ms);
  }

  return null;
}

var LocalDate = /*#__PURE__*/function () {
  function LocalDate() {
    _classCallCheck(this, LocalDate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var firstArg = args[0];

    if (firstArg instanceof Date) {
      this.d = new Date(firstArg.getTime());
    } else if (isString_default()(firstArg) && args.length === 1) {
      this.d = createFromDateString(firstArg);
    }

    if (!this.d) {
      this.d = _construct(Date, args);
    }
  }

  _createClass(LocalDate, [{
    key: "setTimezoneOffset",
    value: function setTimezoneOffset() {
      throwNotSupported();
    }
  }, {
    key: "setTimezoneName",
    value: function setTimezoneName() {
      throwNotSupported();
    }
  }, {
    key: "clone",
    value: function clone() {
      return new LocalDate(this.d);
    }
  }, {
    key: "toDate",
    value: function toDate() {
      return new Date(this.d.getTime());
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.d.toString();
    }
  }]);

  return LocalDate;
}();


var getterMethods = ['getTime', 'getTimezoneOffset', 'getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds', 'getMilliseconds', 'getDay'];
var setterMethods = ['setTime', 'setFullYear', 'setMonth', 'setDate', 'setHours', 'setMinutes', 'setSeconds', 'setMilliseconds'];
getterMethods.forEach(function (methodName) {
  LocalDate.prototype[methodName] = function () {
    var _this$d;

    return (_this$d = this.d)[methodName].apply(_this$d, arguments);
  };
});
setterMethods.forEach(function (methodName) {
  LocalDate.prototype[methodName] = function () {
    var _this$d2;

    return (_this$d2 = this.d)[methodName].apply(_this$d2, arguments);
  };
});
;// CONCATENATED MODULE: ../../libs/date/src/utcDate.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }













function utcDate_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function utcDate_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function utcDate_createClass(Constructor, protoProps, staticProps) { if (protoProps) utcDate_defineProperties(Constructor.prototype, protoProps); if (staticProps) utcDate_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) utcDate_setPrototypeOf(subClass, superClass); }

function utcDate_setPrototypeOf(o, p) { utcDate_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return utcDate_setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = utcDate_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function utcDate_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var UTCDate = /*#__PURE__*/function (_LocalDate) {
  _inherits(UTCDate, _LocalDate);

  var _super = _createSuper(UTCDate);

  function UTCDate() {
    utcDate_classCallCheck(this, UTCDate);

    return _super.apply(this, arguments);
  }

  utcDate_createClass(UTCDate, [{
    key: "clone",
    value: function clone() {
      return new UTCDate(this.d);
    }
  }, {
    key: "getTimezoneOffset",
    value: function getTimezoneOffset() {
      return 0;
    }
  }]);

  return UTCDate;
}(LocalDate);


var getterProperties = ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds', 'Milliseconds', 'Day'];
var setterProperties = ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds', 'Milliseconds'];
getterProperties.forEach(function (prop) {
  var methodName = "get".concat(prop);

  UTCDate.prototype[methodName] = function () {
    var _this$d;

    return (_this$d = this.d)["getUTC".concat(prop)].apply(_this$d, arguments);
  };
});
setterProperties.forEach(function (prop) {
  var methodName = "set".concat(prop);

  UTCDate.prototype[methodName] = function () {
    var _this$d2;

    return (_this$d2 = this.d)["setUTC".concat(prop)].apply(_this$d2, arguments);
  };
});
;// CONCATENATED MODULE: ../../libs/date/src/momentDate.js


function momentDate_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function momentDate_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function momentDate_createClass(Constructor, protoProps, staticProps) { if (protoProps) momentDate_defineProperties(Constructor.prototype, protoProps); if (staticProps) momentDate_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var moment;

var MomentDate = /*#__PURE__*/function () {
  function MomentDate() {
    momentDate_classCallCheck(this, MomentDate);

    if (!moment) {
      throw new Error('MomentDate requires Moment constructor. Use "MomentDate.setMoment(moment);".');
    }

    this.m = moment.apply(void 0, arguments);
  }

  momentDate_createClass(MomentDate, [{
    key: "setTimezoneOffset",
    value: function setTimezoneOffset(offset) {
      this.m.utcOffset(-offset);
      return this;
    }
  }, {
    key: "setTimezoneName",
    value: function setTimezoneName(zoneName) {
      if (this.m.tz) {
        this.m.tz(zoneName);
      } else {
        throw new Error('It requires moment-timezone. Use "MomentDate.setMoment()" with moment-timezone');
      }

      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new MomentDate(this.m);
    }
  }, {
    key: "toDate",
    value: function toDate() {
      return this.m.toDate();
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.m.format();
    }
  }, {
    key: "getTime",
    value: function getTime() {
      return this.m.valueOf();
    }
  }, {
    key: "getTimezoneOffset",
    value: function getTimezoneOffset() {
      var offset = -this.m.utcOffset();
      return Math.abs(offset) ? offset : 0;
    }
  }, {
    key: "getFullYear",
    value: function getFullYear() {
      return this.m.year();
    }
  }, {
    key: "getMonth",
    value: function getMonth() {
      return this.m.month();
    }
  }, {
    key: "getDate",
    value: function getDate() {
      return this.m.date();
    }
  }, {
    key: "getHours",
    value: function getHours() {
      return this.m.hours();
    }
  }, {
    key: "getMinutes",
    value: function getMinutes() {
      return this.m.minutes();
    }
  }, {
    key: "getSeconds",
    value: function getSeconds() {
      return this.m.seconds();
    }
  }, {
    key: "getMilliseconds",
    value: function getMilliseconds() {
      return this.m.milliseconds();
    }
  }, {
    key: "getDay",
    value: function getDay() {
      return this.m.day();
    }
  }, {
    key: "setTime",
    value: function setTime(t) {
      this.m = moment(t);
      return this.getTime();
    }
  }, {
    key: "setFullYear",
    value: function setFullYear(y) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMonth();
      var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getDate();
      this.m.year(y).month(m).date(d);
      return this.getTime();
    }
  }, {
    key: "setMonth",
    value: function setMonth(m) {
      var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.m.date();
      this.m.month(m).date(d);
      return this.getTime();
    }
  }, {
    key: "setDate",
    value: function setDate(d) {
      this.m.date(d);
      return this.getTime();
    }
  }, {
    key: "setHours",
    value: function setHours(h) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMinutes();
      var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getSeconds();
      var ms = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.getMilliseconds();
      this.m.hours(h).minutes(m).seconds(s).milliseconds(ms);
      return this.getTime();
    }
  }, {
    key: "setMinutes",
    value: function setMinutes(m) {
      var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getSeconds();
      var ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getMilliseconds();
      this.m.minutes(m).seconds(s).milliseconds(ms);
      return this.getTime();
    }
  }, {
    key: "setSeconds",
    value: function setSeconds(s) {
      var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMilliseconds();
      this.m.seconds(s).milliseconds(ms);
      return this.getTime();
    }
  }, {
    key: "setMilliseconds",
    value: function setMilliseconds(ms) {
      this.m.milliseconds(ms);
      return this.getTime();
    }
  }], [{
    key: "setMoment",
    value: function setMoment(m) {
      moment = m;
      return MomentDate;
    }
  }]);

  return MomentDate;
}();


;// CONCATENATED MODULE: ../../libs/date/src/index.js



/* harmony default export */ var src = ({
  LocalDate: LocalDate,
  UTCDate: UTCDate,
  MomentDate: MomentDate
});

// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.map.js
var es_map = __webpack_require__(9321);
;// CONCATENATED MODULE: ./src/constants/error.ts
var INVALID_DATETIME_FORMAT = 'Invalid DateTime Format';
var INVALID_TIMEZONE_NAME = 'Invalid IANA Timezone Name';
var INVALID_VIEW_TYPE = 'Invalid View Type';
;// CONCATENATED MODULE: ./src/constants/message.ts
var MESSAGE_PREFIX = '@toast-ui/calendar: ';
;// CONCATENATED MODULE: ./src/utils/error.ts
function error_typeof(obj) { "@babel/helpers - typeof"; return error_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, error_typeof(obj); }

















function error_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function error_createClass(Constructor, protoProps, staticProps) { if (protoProps) error_defineProperties(Constructor.prototype, protoProps); if (staticProps) error_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function error_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function error_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) error_setPrototypeOf(subClass, superClass); }

function error_createSuper(Derived) { var hasNativeReflectConstruct = error_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = error_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = error_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return error_possibleConstructorReturn(this, result); }; }

function error_possibleConstructorReturn(self, call) { if (call && (error_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return error_assertThisInitialized(self); }

function error_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return error_construct(Class, arguments, error_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return error_setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function error_construct(Parent, args, Class) { if (error_isNativeReflectConstruct()) { error_construct = Reflect.construct.bind(); } else { error_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) error_setPrototypeOf(instance, Class.prototype); return instance; }; } return error_construct.apply(null, arguments); }

function error_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function error_setPrototypeOf(o, p) { error_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return error_setPrototypeOf(o, p); }

function error_getPrototypeOf(o) { error_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return error_getPrototypeOf(o); }



/**
 * Define custom errors for calendar
 * These errors are exposed to the user.
 *
 * We can throw the default `Error` instance for internal errors.
 */

var InvalidTimezoneNameError = /*#__PURE__*/function (_Error) {
  error_inherits(InvalidTimezoneNameError, _Error);

  var _super = error_createSuper(InvalidTimezoneNameError);

  function InvalidTimezoneNameError(timezoneName) {
    var _this;

    error_classCallCheck(this, InvalidTimezoneNameError);

    _this = _super.call(this, "".concat(MESSAGE_PREFIX).concat(INVALID_TIMEZONE_NAME, " - ").concat(timezoneName));
    _this.name = 'InvalidTimezoneNameError';
    return _this;
  }

  return error_createClass(InvalidTimezoneNameError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var InvalidDateTimeFormatError = /*#__PURE__*/function (_Error2) {
  error_inherits(InvalidDateTimeFormatError, _Error2);

  var _super2 = error_createSuper(InvalidDateTimeFormatError);

  function InvalidDateTimeFormatError(dateTimeString) {
    var _this2;

    error_classCallCheck(this, InvalidDateTimeFormatError);

    _this2 = _super2.call(this, "".concat(MESSAGE_PREFIX).concat(INVALID_DATETIME_FORMAT, " - ").concat(dateTimeString));
    _this2.name = 'InvalidDateTimeFormatError';
    return _this2;
  }

  return error_createClass(InvalidDateTimeFormatError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var InvalidViewTypeError = /*#__PURE__*/function (_Error3) {
  error_inherits(InvalidViewTypeError, _Error3);

  var _super3 = error_createSuper(InvalidViewTypeError);

  function InvalidViewTypeError(viewType) {
    var _this3;

    error_classCallCheck(this, InvalidViewTypeError);

    _this3 = _super3.call(this, "".concat(MESSAGE_PREFIX).concat(INVALID_VIEW_TYPE, " - ").concat(viewType));
    _this3.name = 'InvalidViewTypeError';
    return _this3;
  }

  return error_createClass(InvalidViewTypeError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
;// CONCATENATED MODULE: ./src/utils/logger.ts


/* eslint-disable no-console */

var logger = {
  error: function error(firstArg) {
    var _console;

    for (var _len = arguments.length, restArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      restArgs[_key - 1] = arguments[_key];
    }

    (_console = console).error.apply(_console, ["".concat(MESSAGE_PREFIX).concat(firstArg)].concat(restArgs));
  },
  warn: function warn(firstArg) {
    var _console2;

    for (var _len2 = arguments.length, restArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      restArgs[_key2 - 1] = arguments[_key2];
    }

    (_console2 = console).warn.apply(_console2, ["".concat(MESSAGE_PREFIX).concat(firstArg)].concat(restArgs));
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
function timezone_slicedToArray(arr, i) { return timezone_arrayWithHoles(arr) || timezone_iterableToArrayLimit(arr, i) || timezone_unsupportedIterableToArray(arr, i) || timezone_nonIterableRest(); }

function timezone_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function timezone_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return timezone_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return timezone_arrayLikeToArray(o, minLen); }

function timezone_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function timezone_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function timezone_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

















function timezone_construct(Parent, args, Class) { if (timezone_isNativeReflectConstruct()) { timezone_construct = Reflect.construct.bind(); } else { timezone_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) timezone_setPrototypeOf(instance, Class.prototype); return instance; }; } return timezone_construct.apply(null, arguments); }

function timezone_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function timezone_setPrototypeOf(o, p) { timezone_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return timezone_setPrototypeOf(o, p); }






var Constructor = LocalDate;
function setDateConstructor(constructor) {
  Constructor = constructor;
}
function date() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return timezone_construct(Constructor, args);
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
  var targetDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new date_TZDate();

  if (!isIntlDateTimeFormatSupported()) {
    logger.warn('Intl.DateTimeFormat is not fully supported. So It will return the local timezone offset only.\nYou can use a polyfill to fix this issue.');
    return -targetDate.toDate().getTimezoneOffset();
  }

  validateIANATimezoneName(timezoneName);
  var token = tokenizeTZDate(targetDate, timezoneName);
  var utcDate = tokenToUtcDate(token);
  return Math.round((utcDate.getTime() - targetDate.getTime()) / 60 / 1000);
} // Reference: https://stackoverflow.com/a/30280636/16702531
// If there's no timezoneName, it handles Native OS timezone.

function isUsingDST(targetDate, timezoneName) {
  if (timezoneName) {
    validateIANATimezoneName(timezoneName);
  }

  var jan = new date_TZDate(targetDate.getFullYear(), 0, 1);
  var jul = new date_TZDate(targetDate.getFullYear(), 6, 1);

  if (timezoneName) {
    return Math.max(-calculateTimezoneOffset(timezoneName, jan), -calculateTimezoneOffset(timezoneName, jul)) !== -calculateTimezoneOffset(timezoneName, targetDate);
  }

  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset()) !== targetDate.toDate().getTimezoneOffset();
}
var dtfCache = {};
var timezoneNameValidationCache = {};

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
  } catch (_unused) {
    // Usually it throws `RangeError` when the timezoneName is invalid.
    throw new InvalidTimezoneNameError(timezoneName);
  }
}

function getDateTimeFormat(timezoneName) {
  if (dtfCache[timezoneName]) {
    return dtfCache[timezoneName];
  }

  var dtf = new Intl.DateTimeFormat('en-US', {
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

var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};

function tokenizeTZDate(tzDate, timezoneName) {
  var dtf = getDateTimeFormat(timezoneName);
  var formatted = dtf.formatToParts(tzDate.toDate());
  return formatted.reduce(function (result, cur) {
    var pos = typeToPos[cur.type];

    if (isPresent(pos)) {
      result[pos] = parseInt(cur.value, 10);
    }

    return result;
  }, []);
}

function tokenToUtcDate(token) {
  var _token = timezone_slicedToArray(token, 6),
      year = _token[0],
      monthPlusOne = _token[1],
      day = _token[2],
      hour = _token[3],
      minute = _token[4],
      second = _token[5];

  var month = monthPlusOne - 1;
  return new Date(Date.UTC(year, month, day, hour % 24, minute, second));
}
;// CONCATENATED MODULE: ./src/time/date.ts




function date_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function date_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function date_createClass(Constructor, protoProps, staticProps) { if (protoProps) date_defineProperties(Constructor.prototype, protoProps); if (staticProps) date_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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


var date_TZDate = /*#__PURE__*/function () {
  function TZDate() {
    date_classCallCheck(this, TZDate);

    _defineProperty(this, "tzOffset", null);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args[0] instanceof TZDate) {
      this.d = date(args[0].getTime());
    } else {
      this.d = date.apply(void 0, args);
    }
  }
  /**
   * Get the string representation of the date.
   * @returns {string} string representation of the date.
   */


  date_createClass(TZDate, [{
    key: "toString",
    value: function toString() {
      return this.d.toString();
    }
    /**
     * Add years to the instance.
     * @param {number} y - number of years to be added.
     * @returns {TZDate} - returns the instance itself.
     */

  }, {
    key: "addFullYear",
    value: function addFullYear(y) {
      this.setFullYear(this.getFullYear() + y);
      return this;
    }
    /**
     * Add months to the instance.
     * @param {number} m - number of months to be added.
     * @returns {TZDate} - returns the instance itself.
     */

  }, {
    key: "addMonth",
    value: function addMonth(m) {
      this.setMonth(this.getMonth() + m);
      return this;
    }
    /**
     * Add dates to the instance.
     * @param {number} d - number of days to be added.
     * @returns {TZDate} - returns the instance itself.
     */

  }, {
    key: "addDate",
    value: function addDate(d) {
      this.setDate(this.getDate() + d);
      return this;
    }
    /**
     * Add hours to the instance.
     * @param {number} h - number of hours to be added.
     * @returns {TZDate} - returns the instance itself.
     */

  }, {
    key: "addHours",
    value: function addHours(h) {
      this.setHours(this.getHours() + h);
      return this;
    }
    /**
     * Add minutes to the instance.
     * @param {number} M - number of minutes to be added.
     * @returns {TZDate} - returns the instance itself.
     */

  }, {
    key: "addMinutes",
    value: function addMinutes(M) {
      this.setMinutes(this.getMinutes() + M);
      return this;
    }
    /**
     * Add seconds to the instance.
     * @param {number} s - number of seconds to be added.
     * @returns {TZDate} - returns the instance itself.
     */

  }, {
    key: "addSeconds",
    value: function addSeconds(s) {
      this.setSeconds(this.getSeconds() + s);
      return this;
    }
    /**
     * Add milliseconds to the instance.
     * @param {number} ms - number of milliseconds to be added.
     * @returns {TZDate} - returns the instance itself.
     */

  }, {
    key: "addMilliseconds",
    value: function addMilliseconds(ms) {
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

  }, {
    key: "setWithRaw",
    value: function setWithRaw(y, m, d, h, M, s, ms) {
      this.setFullYear(y, m, d);
      this.setHours(h, M, s, ms);
      return this;
    }
    /**
     * Convert the instance to the native `Date` object.
     * @returns {Date} - The native `Date` object.
     */

  }, {
    key: "toDate",
    value: function toDate() {
      return this.d.toDate();
    }
    /**
     * Get the value of the date. (milliseconds since 1970-01-01 00:00:00 (UTC+0))
     * @returns {number} - value of the date.
     */

  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.getTime();
    }
    /**
     * Get the timezone offset from UTC in minutes.
     * @returns {number} - timezone offset in minutes.
     */

  }, {
    key: "getTimezoneOffset",
    value: function getTimezoneOffset() {
      var _this$tzOffset;

      return (_this$tzOffset = this.tzOffset) !== null && _this$tzOffset !== void 0 ? _this$tzOffset : this.d.getTimezoneOffset();
    } // Native properties

    /**
     * Get milliseconds which is converted by timezone
     * @returns {number} milliseconds
     */

  }, {
    key: "getTime",
    value: function getTime() {
      return this.d.getTime();
    }
    /**
     * Get the year of the instance.
     * @returns {number} - full year
     */

  }, {
    key: "getFullYear",
    value: function getFullYear() {
      return this.d.getFullYear();
    }
    /**
     * Get the month of the instance. (zero-based)
     * @returns {number} - month
     */

  }, {
    key: "getMonth",
    value: function getMonth() {
      return this.d.getMonth();
    }
    /**
     * Get the date of the instance.
     * @returns {number} - date
     */

  }, {
    key: "getDate",
    value: function getDate() {
      return this.d.getDate();
    }
    /**
     * Get the hours of the instance.
     * @returns {number} - hours
     */

  }, {
    key: "getHours",
    value: function getHours() {
      return this.d.getHours();
    }
    /**
     * Get the minutes of the instance.
     * @returns {number} - minutes
     */

  }, {
    key: "getMinutes",
    value: function getMinutes() {
      return this.d.getMinutes();
    }
    /**
     * Get the seconds of the instance.
     * @returns {number} - seconds
     */

  }, {
    key: "getSeconds",
    value: function getSeconds() {
      return this.d.getSeconds();
    }
    /**
     * Get the milliseconds of the instance.
     * @returns {number} - milliseconds
     */

  }, {
    key: "getMilliseconds",
    value: function getMilliseconds() {
      return this.d.getMilliseconds();
    }
    /**
     * Get the day of the week of the instance.
     * @returns {number} - day of the week
     */

  }, {
    key: "getDay",
    value: function getDay() {
      return this.d.getDay();
    }
    /**
     * Sets the instance to the time represented by a number of milliseconds since 1970-01-01 00:00:00 (UTC+0).
     * @param {number} t - number of milliseconds
     * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
     */

  }, {
    key: "setTime",
    value: function setTime(t) {
      return this.d.setTime(t);
    }
    /**
     * Sets the year-month-date of the instance. Equivalent to calling `setFullYear` of `Date` object.
     * @param {number} y - year
     * @param {number} m - month (zero-based)
     * @param {number} d - date
     * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
     */

  }, {
    key: "setFullYear",
    value: function setFullYear(y) {
      var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMonth();
      var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getDate();
      return this.d.setFullYear(y, m, d);
    }
    /**
     * Sets the month of the instance. Equivalent to calling `setMonth` of `Date` object.
     * @param {number} m - month (zero-based)
     * @param {number} d - date
     * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
     */

  }, {
    key: "setMonth",
    value: function setMonth(m) {
      var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getDate();
      return this.d.setMonth(m, d);
    }
    /**
     * Sets the date of the instance. Equivalent to calling `setDate` of `Date` object.
     * @param {number} d - date
     * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
     */

  }, {
    key: "setDate",
    value: function setDate(d) {
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

  }, {
    key: "setHours",
    value: function setHours(h) {
      var M = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMinutes();
      var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getSeconds();
      var ms = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.getMilliseconds();
      return this.d.setHours(h, M, s, ms);
    }
    /**
     * Sets the minutes of the instance. Equivalent to calling `setMinutes` of `Date` object.
     * @param {number} M - minutes
     * @param {number} s - seconds
     * @param {number} ms - milliseconds
     * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
     */

  }, {
    key: "setMinutes",
    value: function setMinutes(M) {
      var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getSeconds();
      var ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getMilliseconds();
      return this.d.setMinutes(M, s, ms);
    }
    /**
     * Sets the seconds of the instance. Equivalent to calling `setSeconds` of `Date` object.
     * @param {number} s - seconds
     * @param {number} ms - milliseconds
     * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
     */

  }, {
    key: "setSeconds",
    value: function setSeconds(s) {
      var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getMilliseconds();
      return this.d.setSeconds(s, ms);
    }
    /**
     * Sets the milliseconds of the instance. Equivalent to calling `setMilliseconds` of `Date` object.
     * @param {number} ms - milliseconds
     * @returns {number} - Passed milliseconds of the instance since 1970-01-01 00:00:00 (UTC+0).
     */

  }, {
    key: "setMilliseconds",
    value: function setMilliseconds(ms) {
      return this.d.setMilliseconds(ms);
    }
    /**
     * Set the timezone offset of the instance.
     * @param {string|number} tzValue - The name of timezone(IANA name) or timezone offset(in minutes).
     * @returns {TZDate} - New instance with the timezone offset.
     */

  }, {
    key: "tz",
    value: function tz(tzValue) {
      if (tzValue === 'Local') {
        return new TZDate(this.getTime());
      }

      var tzOffset = isString_default()(tzValue) ? calculateTimezoneOffset(tzValue, this) : tzValue;
      var newTZDate = new TZDate(this.getTime() - getTZOffsetMSDifference(tzOffset));
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

  }, {
    key: "local",
    value: function local(tzValue) {
      if (isPresent(tzValue)) {
        var tzOffset = isString_default()(tzValue) ? calculateTimezoneOffset(tzValue, this) : tzValue;
        return new TZDate(this.getTime() + getTZOffsetMSDifference(tzOffset));
      }

      return new TZDate(this.getTime() + (isPresent(this.tzOffset) ? getTZOffsetMSDifference(this.tzOffset) : 0));
    }
  }]);

  return TZDate;
}();


// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(3105);
;// CONCATENATED MODULE: ./src/utils/object.ts







function pick(obj) {
  for (var _len = arguments.length, propNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    propNames[_key - 1] = arguments[_key];
  }

  return propNames.reduce(function (acc, key) {
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
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!isObject_default()(source)) {
    return target;
  }

  Object.keys(source).forEach(function (k) {
    var targetKey = k;
    var sourceKey = k;

    if (!Array.isArray(source[sourceKey]) && isObject_default()(target[targetKey]) && isObject_default()(source[sourceKey]) && !(source[sourceKey] instanceof date_TZDate)) {
      target[targetKey] = mergeObject(target[targetKey], source[sourceKey]);
    } else {
      target[targetKey] = source[sourceKey];
    }
  });
  return target;
}
;// CONCATENATED MODULE: ./src/model/eventUIModel.ts






function eventUIModel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function eventUIModel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function eventUIModel_createClass(Constructor, protoProps, staticProps) { if (protoProps) eventUIModel_defineProperties(Constructor.prototype, protoProps); if (staticProps) eventUIModel_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function eventUIModel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var eventUIPropsKey = ['top', 'left', 'width', 'height', 'exceedLeft', 'exceedRight', 'croppedStart', 'croppedEnd', 'goingDurationHeight', 'modelDurationHeight', 'comingDurationHeight', 'duplicateEvents', 'duplicateEventIndex', 'duplicateStarts', 'duplicateEnds', 'duplicateLeft', 'duplicateWidth', 'collapse', 'isMain'];
/**
 * Set of UI-related properties for calendar event.
 * @class
 * @param {EventModel} event EventModel instance.
 */

var EventUIModel = /*#__PURE__*/function () {
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
  function EventUIModel(event) {
    eventUIModel_classCallCheck(this, EventUIModel);

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

  eventUIModel_createClass(EventUIModel, [{
    key: "getUIProps",
    value: function getUIProps() {
      return pick.apply(void 0, [this].concat(eventUIPropsKey));
    }
  }, {
    key: "setUIProps",
    value: function setUIProps(props) {
      Object.assign(this, props);
    }
    /**
     * return renderStarts property to render properly when specific event that exceed rendering date range.
     *
     * if renderStarts is not set. return model's start property.
     */

  }, {
    key: "getStarts",
    value: function getStarts() {
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

  }, {
    key: "getEnds",
    value: function getEnds() {
      if (this.renderEnds) {
        return this.renderEnds;
      }

      return this.model.getEnds();
    }
    /**
     * @returns {number} unique number for model.
     */

  }, {
    key: "cid",
    value: function cid() {
      return this.model.cid();
    }
    /**
     * Shadowing valueOf method for event sorting.
     */

  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.model;
    }
    /**
     * Link duration method
     * @returns {number} EventModel#duration result.
     */

  }, {
    key: "duration",
    value: function duration() {
      return this.model.duration();
    }
  }, {
    key: "collidesWith",
    value: function collidesWith(uiModel) {
      var usingTravelTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var infos = [];
      [this, uiModel].forEach(function (event) {
        var isDuplicateEvent = event instanceof EventUIModel && event.duplicateEvents.length > 0;

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
      var thisInfo = infos[0],
          targetInfo = infos[1];
      return events_collidesWith({
        start: thisInfo.start.getTime(),
        end: thisInfo.end.getTime(),
        targetStart: targetInfo.start.getTime(),
        targetEnd: targetInfo.end.getTime(),
        goingDuration: thisInfo.goingDuration,
        comingDuration: thisInfo.comingDuration,
        targetGoingDuration: targetInfo.goingDuration,
        targetComingDuration: targetInfo.comingDuration,
        usingTravelTime: usingTravelTime // Daygrid does not use travelTime, TimeGrid uses travelTime.

      });
    }
  }, {
    key: "clone",
    value: function clone() {
      var eventUIModelProps = this.getUIProps();
      var clonedEventUIModel = new EventUIModel(this.model);
      clonedEventUIModel.setUIProps(eventUIModelProps);

      if (this.renderStarts) {
        clonedEventUIModel.renderStarts = new date_TZDate(this.renderStarts);
      }

      if (this.renderEnds) {
        clonedEventUIModel.renderEnds = new date_TZDate(this.renderEnds);
      }

      return clonedEventUIModel;
    }
  }]);

  return EventUIModel;
}();


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
  var a = String(_a);
  var b = String(_b);

  if (a === b) {
    return 0;
  }

  return a > b ? 1 : -1;
} // eslint-disable-next-line complexity


function compareEventsASC(a, b) {
  var modelA = a instanceof EventUIModel ? a.model : a;
  var modelB = b instanceof EventUIModel ? b.model : b;
  var alldayCompare = compareBooleansASC(modelA.isAllday || modelA.hasMultiDates, modelB.isAllday || modelB.hasMultiDates);

  if (alldayCompare) {
    return alldayCompare;
  }

  var startsCompare = compare(a.getStarts(), b.getStarts());

  if (startsCompare) {
    return startsCompare;
  }

  var durationA = a.duration();
  var durationB = b.duration();

  if (durationA < durationB) {
    return 1;
  }

  if (durationA > durationB) {
    return -1;
  }

  return modelA.cid() - modelB.cid();
}

function bsearch(arr, search, fn, compareFn) {
  var minIndex = 0;
  var maxIndex = arr.length - 1;
  var currentIndex;
  var value;
  var comp;
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
  bsearch: bsearch,
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
  for (var i = array.length - 1; i >= 0; i -= 1) {
    if (predicate(array[i])) {
      return i;
    }
  }

  return -1;
}
function fill(length, value) {
  if (length > 0) {
    return Array.from({
      length: length
    }, function () {
      if (Array.isArray(value)) {
        return value.slice();
      }

      return value;
    });
  }

  return [];
}
;// CONCATENATED MODULE: ./src/time/datetime.ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || datetime_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return datetime_arrayLikeToArray(arr); }

function datetime_slicedToArray(arr, i) { return datetime_arrayWithHoles(arr) || datetime_iterableToArrayLimit(arr, i) || datetime_unsupportedIterableToArray(arr, i) || datetime_nonIterableRest(); }

function datetime_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function datetime_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return datetime_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return datetime_arrayLikeToArray(o, minLen); }

function datetime_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function datetime_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function datetime_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





























var Day;

(function (Day) {
  Day[Day["SUN"] = 0] = "SUN";
  Day[Day["MON"] = 1] = "MON";
  Day[Day["TUE"] = 2] = "TUE";
  Day[Day["WED"] = 3] = "WED";
  Day[Day["THU"] = 4] = "THU";
  Day[Day["FRI"] = 5] = "FRI";
  Day[Day["SAT"] = 6] = "SAT";
})(Day || (Day = {}));

var WEEK_DAYS = 7;
var dateFormatRx = /^(\d{4}[-|/]*\d{2}[-|/]*\d{2})\s?(\d{2}:\d{2}:\d{2})?$/;
var memo = {
  millisecondsTo: {},
  millisecondsFrom: {}
};
var convByTimeUnit = [24, 60, 60, 1000];
/**
 * pad left zero characters
 */

function leadingZero(number, length) {
  var zero = '';
  var i = 0;

  if (String(number).length > length) {
    return String(number);
  }

  for (; i < length - 1; i += 1) {
    zero += '0';
  }

  return (zero + number).slice(length * -1);
}

function getHourForMeridiem(date) {
  var hour = date.getHours();

  if (hour === 0) {
    hour = 12;
  }

  if (hour > 12) {
    hour = hour % 12;
  }

  return hour;
}

var tokenFunc = {
  YYYYMMDD: function YYYYMMDD(date) {
    return [date.getFullYear(), leadingZero(date.getMonth() + 1, 2), leadingZero(date.getDate(), 2)].join('');
  },
  YYYY: function YYYY(date) {
    return String(date.getFullYear());
  },
  MM: function MM(date) {
    return leadingZero(date.getMonth() + 1, 2);
  },
  DD: function DD(date) {
    return leadingZero(date.getDate(), 2);
  },
  'HH:mm': function HHMm(date) {
    var hour = date.getHours();
    var minutes = date.getMinutes();
    return "".concat(leadingZero(hour, 2), ":").concat(leadingZero(minutes, 2));
  },
  'hh:mm': function hhMm(date) {
    var hour = getHourForMeridiem(date);
    var minutes = date.getMinutes();
    return "".concat(leadingZero(hour, 2), ":").concat(leadingZero(minutes, 2));
  },
  hh: function hh(date) {
    var hour = getHourForMeridiem(date);
    return String(hour);
  },
  tt: function tt(date) {
    var hour = date.getHours();
    return hour < 12 ? 'am' : 'pm';
  }
};
var MS_PER_DAY = 86400000;
var MS_PER_HOUR = 3600000;
var MS_PER_MINUTES = 60000;
/**
 * The number of milliseconds 20 minutes for event min duration
 */

var MS_EVENT_MIN_DURATION = 20 * MS_PER_MINUTES;
var MS_PER_THIRTY_MINUTES = 30 * 60 * 1000;
var SIXTY_SECONDS = 60;
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
  var result = strFormat;
  Object.entries(tokenFunc).forEach(function (_ref) {
    var _ref2 = datetime_slicedToArray(_ref, 2),
        token = _ref2[0],
        converter = _ref2[1];

    result = result.replace(token, converter(date));
  });
  return result;
}
/**
 * convert to milliseconds
 */

function convMilliseconds(type, value, iteratee) {
  var index = {
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
  var cache = memo.millisecondsFrom;
  var key = type + value;

  if (cache[key]) {
    return cache[key];
  }

  var result = convMilliseconds(type, value, function (m, v) {
    return m * v;
  });

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
  var d = date ? new date_TZDate(date) : new date_TZDate();
  d.setHours(0, 0, 0, 0);
  return d;
}
/**
 * Make date array from supplied parameters
 */

function makeDateRange(startDate, endDate, step) {
  var startTime = startDate.getTime();
  var endTime = endDate.getTime();
  var date = new date_TZDate(startDate);
  var result = [];
  var cursor = startTime;

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
  var _d1 = d1.getTime();

  var _d2 = d2.getTime();

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
  var fixMonth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  var matches = str.match(dateFormatRx);
  var separator;
  var ymd;
  var hms;

  if (!matches) {
    throw new InvalidDateTimeFormatError(str);
  }

  if (str.length > 8) {
    // YYYY/MM/DD
    // YYYY-MM-DD
    // YYYY/MM/DD HH:mm:SS
    // YYYY-MM-DD HH:mm:SS
    separator = ~str.indexOf('/') ? '/' : '-';
    var result = matches.splice(1);
    ymd = result[0].split(separator);
    hms = result[1] ? result[1].split(':') : [0, 0, 0];
  } else {
    // YYYYMMDD
    var _matches = datetime_slicedToArray(matches, 1),
        _result = _matches[0];

    ymd = [_result.substr(0, 4), _result.substr(4, 2), _result.substr(6, 2)];
    hms = [0, 0, 0];
  }

  return new date_TZDate().setWithRaw(Number(ymd[0]), Number(ymd[1]) + fixMonth, Number(ymd[2]), Number(hms[0]), Number(hms[1]), Number(hms[2]), 0);
}
/**
 * Return 23:59:59 supplied date.
 * If you want to use milliseconds, use format 'YYYY-MM-DDTHH:mm:ss.sssZ' based on http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
 */

function toEndOfDay(date) {
  var d = date ? new date_TZDate(date) : new date_TZDate();
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
  var format = 'YYYYMMDD';
  var n = parseInt(datetime_toFormat(d, format), 10);
  var n1 = parseInt(datetime_toFormat(d1, format), 10);
  var n2 = parseInt(datetime_toFormat(d2, format), 10);
  return n1 <= n && n <= n2;
}
function toStartOfMonth(date) {
  var startDate = new date_TZDate(date);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);
  return startDate;
}
function toStartOfYear(d) {
  return new TZDate(d.getFullYear(), 0, 1, 0, 0, 0, 0);
}
function toEndOfMonth(date) {
  var endDate = toStartOfMonth(date);
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);
  endDate.setHours(23, 59, 59, 999);
  return endDate;
}
/**
 * Calculate grid left(%), width(%) by narrowWeekend, startDayOfWeek, workweek
 */

function getRowStyleInfo(days, narrowWeekend, startDayOfWeek, workweek) {
  var limitDaysToApplyNarrowWeekend = 5;
  var uniformWidth = 100 / days;
  var wideWidth = days > limitDaysToApplyNarrowWeekend ? 100 / (days - 1) : uniformWidth;
  var accumulatedWidth = 0;
  var dates = range_default()(startDayOfWeek, WEEK_DAYS).concat(range_default()(days)).slice(0, WEEK_DAYS);
  narrowWeekend = workweek ? false : narrowWeekend;
  var rowStyleInfo = dates.map(function (day) {
    var width = narrowWeekend ? wideWidth : uniformWidth;

    if (days > limitDaysToApplyNarrowWeekend && narrowWeekend && isWeekend(day)) {
      width = wideWidth / 2;
    }

    var model = {
      width: width,
      left: accumulatedWidth
    };
    accumulatedWidth += width;
    return model;
  });
  var length = rowStyleInfo.length;
  var cellWidthMap = fill(length, fill(length, 0));
  rowStyleInfo.forEach(function (_ref3, index) {
    var width = _ref3.width;

    for (var i = 0; i <= index; i += 1) {
      for (var j = index; j < length; j += 1) {
        cellWidthMap[i][j] += width;
      }
    }
  });
  cellWidthMap[0][length - 1] = 100;
  return {
    rowStyleInfo: rowStyleInfo,
    cellWidthMap: cellWidthMap.map(function (widthList) {
      return widthList.map(toPercent);
    })
  };
}
function addMilliseconds(d, step) {
  var date = datetime_clone(d);
  date.setMilliseconds(d.getMilliseconds() + step);
  return date;
}
function addMinutes(d, step) {
  var date = datetime_clone(d);
  date.setMinutes(d.getMinutes() + step);
  return date;
}
function addHours(d, step) {
  var date = datetime_clone(d);
  date.setHours(d.getHours() + step);
  return date;
}
function setTimeStrToDate(d, timeStr) {
  var date = datetime_clone(d);
  date.setHours.apply(date, _toConsumableArray(timeStr.split(':').map(Number)));
  return date;
}
function addDate(d, step) {
  var date = datetime_clone(d);
  date.setDate(d.getDate() + step);
  return date;
}
function subtractDate(d, steps) {
  var date = datetime_clone(d);
  date.setDate(d.getDate() - steps);
  return date;
}
/**
 * Inspired by `date-fns`
 *
 * See more: https://github.com/date-fns/date-fns/blob/master/src/addMonths/index.ts
 */

function addMonths(d) {
  var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var date = datetime_clone(d);

  if (step !== 0) {
    var dayOfMonth = date.getDate();
    var endOfDesiredMonth = new date_TZDate(date.getTime());
    endOfDesiredMonth.setMonth(date.getMonth() + step + 1, 0);
    var daysInMonth = endOfDesiredMonth.getDate();

    if (dayOfMonth >= daysInMonth) {
      return endOfDesiredMonth;
    }

    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
  }

  return date;
}
function addYear(d, step) {
  var date = datetime_clone(d);
  date.setFullYear(d.getFullYear() + step);
  return date;
}
function getDateDifference(d1, d2) {
  var _d1 = new date_TZDate(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();

  var _d2 = new date_TZDate(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();

  return Math.round((_d1 - _d2) / MS_PER_DAY);
}
;// CONCATENATED MODULE: ./src/helpers/events.ts


function hasCollision(start, end, targetStart, targetEnd) {
  return targetStart > start && targetStart < end || targetEnd > start && targetEnd < end || targetStart <= start && targetEnd >= end;
}

function events_collidesWith(_ref) {
  var start = _ref.start,
      end = _ref.end,
      targetStart = _ref.targetStart,
      targetEnd = _ref.targetEnd,
      goingDuration = _ref.goingDuration,
      comingDuration = _ref.comingDuration,
      targetGoingDuration = _ref.targetGoingDuration,
      targetComingDuration = _ref.targetComingDuration,
      usingTravelTime = _ref.usingTravelTime;

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
  var id = 0;
  return {
    next: function next() {
      id += 1;
      return id;
    }
  };
}

var getId = function () {
  var generator = idGenerator();
  return function () {
    return generator.next();
  };
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



function eventModel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function eventModel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function eventModel_createClass(Constructor, protoProps, staticProps) { if (protoProps) eventModel_defineProperties(Constructor.prototype, protoProps); if (staticProps) eventModel_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function eventModel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var EventModel = /*#__PURE__*/function () {
  /**
   * whether the event includes multiple dates
   */
  function EventModel() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    eventModel_classCallCheck(this, EventModel);

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

  eventModel_createClass(EventModel, [{
    key: "init",
    value: function init() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$id = _ref.id,
          id = _ref$id === void 0 ? '' : _ref$id,
          _ref$calendarId = _ref.calendarId,
          calendarId = _ref$calendarId === void 0 ? '' : _ref$calendarId,
          _ref$title = _ref.title,
          title = _ref$title === void 0 ? '' : _ref$title,
          _ref$body = _ref.body,
          body = _ref$body === void 0 ? '' : _ref$body,
          _ref$isAllday = _ref.isAllday,
          isAllday = _ref$isAllday === void 0 ? false : _ref$isAllday,
          _ref$start = _ref.start,
          start = _ref$start === void 0 ? new date_TZDate() : _ref$start,
          _ref$end = _ref.end,
          end = _ref$end === void 0 ? new date_TZDate() : _ref$end,
          _ref$goingDuration = _ref.goingDuration,
          goingDuration = _ref$goingDuration === void 0 ? 0 : _ref$goingDuration,
          _ref$comingDuration = _ref.comingDuration,
          comingDuration = _ref$comingDuration === void 0 ? 0 : _ref$comingDuration,
          _ref$location = _ref.location,
          location = _ref$location === void 0 ? '' : _ref$location,
          _ref$attendees = _ref.attendees,
          attendees = _ref$attendees === void 0 ? [] : _ref$attendees,
          _ref$category = _ref.category,
          category = _ref$category === void 0 ? 'time' : _ref$category,
          _ref$dueDateClass = _ref.dueDateClass,
          dueDateClass = _ref$dueDateClass === void 0 ? '' : _ref$dueDateClass,
          _ref$recurrenceRule = _ref.recurrenceRule,
          recurrenceRule = _ref$recurrenceRule === void 0 ? '' : _ref$recurrenceRule,
          _ref$state = _ref.state,
          state = _ref$state === void 0 ? 'Busy' : _ref$state,
          _ref$isVisible = _ref.isVisible,
          isVisible = _ref$isVisible === void 0 ? true : _ref$isVisible,
          _ref$isPending = _ref.isPending,
          isPending = _ref$isPending === void 0 ? false : _ref$isPending,
          _ref$isFocused = _ref.isFocused,
          isFocused = _ref$isFocused === void 0 ? false : _ref$isFocused,
          _ref$isReadOnly = _ref.isReadOnly,
          isReadOnly = _ref$isReadOnly === void 0 ? false : _ref$isReadOnly,
          _ref$isPrivate = _ref.isPrivate,
          isPrivate = _ref$isPrivate === void 0 ? false : _ref$isPrivate,
          color = _ref.color,
          backgroundColor = _ref.backgroundColor,
          dragBackgroundColor = _ref.dragBackgroundColor,
          borderColor = _ref.borderColor,
          _ref$customStyle = _ref.customStyle,
          customStyle = _ref$customStyle === void 0 ? {} : _ref$customStyle,
          _ref$raw = _ref.raw,
          raw = _ref$raw === void 0 ? null : _ref$raw;

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
  }, {
    key: "setAlldayPeriod",
    value: function setAlldayPeriod(start, end) {
      // If it is an all-day, only the date information of the string is used.
      var startedAt;
      var endedAt;

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
  }, {
    key: "setTimePeriod",
    value: function setTimePeriod(start, end) {
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

  }, {
    key: "getStarts",
    value: function getStarts() {
      return this.start;
    }
    /**
     * @returns {TZDate} render end date.
     */

  }, {
    key: "getEnds",
    value: function getEnds() {
      return this.end;
    }
    /**
     * @returns {number} instance unique id.
     */

  }, {
    key: "cid",
    value: function cid() {
      return stamp(this);
    }
    /**
     * Check two  are equals (means title, isAllday, start, end are same)
     * @param {EventModel}  event model instance to compare.
     * @returns {boolean} Return false when not same.
     */
    // eslint-disable-next-line complexity

  }, {
    key: "equals",
    value: function equals(event) {
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

  }, {
    key: "duration",
    value: function duration() {
      var start = Number(this.getStarts());
      var end = Number(this.getEnds());
      var duration;

      if (this.isAllday) {
        duration = Number(toEndOfDay(end)) - Number(toStartOfDay(start));
      } else {
        duration = end - start;
      }

      return duration;
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this;
    }
    /**
     * Returns true if the given EventModel coincides with the same time as the
     * calling EventModel.
     * @param {EventModel | EventUIModel} event The other event to compare with this EventModel.
     * @param {boolean = true} usingTravelTime When calculating collision, whether to calculate with travel time.
     * @returns {boolean} If the other event occurs within the same time as the first object.
     */

  }, {
    key: "collidesWith",
    value: function collidesWith(event) {
      var usingTravelTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      event = event instanceof EventUIModel ? event.model : event;
      return events_collidesWith({
        start: Number(this.getStarts()),
        end: Number(this.getEnds()),
        targetStart: Number(event.getStarts()),
        targetEnd: Number(event.getEnds()),
        goingDuration: this.goingDuration,
        comingDuration: this.comingDuration,
        targetGoingDuration: event.goingDuration,
        targetComingDuration: event.comingDuration,
        usingTravelTime: usingTravelTime // Daygrid does not use travelTime, TimeGrid uses travelTime.

      });
    }
  }, {
    key: "toEventObject",
    value: function toEventObject() {
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
  }, {
    key: "getColors",
    value: function getColors() {
      return {
        color: this.color,
        backgroundColor: this.backgroundColor,
        dragBackgroundColor: this.dragBackgroundColor,
        borderColor: this.borderColor
      };
    }
  }]);

  return EventModel;
}(); // export function isBackgroundEvent({ model }: EventUIModel) {
//   return model.category === 'background';
// }


eventModel_defineProperty(EventModel, "schema", {
  required: ['title'],
  dateRange: ['start', 'end']
});


function isTimeEvent(_ref2) {
  var model = _ref2.model;
  var category = model.category,
      isAllday = model.isAllday,
      hasMultiDates = model.hasMultiDates;
  return category === 'time' && !isAllday && !hasMultiDates;
}
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__(3430);
;// CONCATENATED MODULE: ./src/utils/collection.ts
function collection_slicedToArray(arr, i) { return collection_arrayWithHoles(arr) || collection_iterableToArrayLimit(arr, i) || collection_unsupportedIterableToArray(arr, i) || collection_nonIterableRest(); }

function collection_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function collection_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return collection_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return collection_arrayLikeToArray(o, minLen); }

function collection_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function collection_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function collection_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



















function collection_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function collection_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function collection_createClass(Constructor, protoProps, staticProps) { if (protoProps) collection_defineProperties(Constructor.prototype, protoProps); if (staticProps) collection_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function collection_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * Generic collection base on ES6 Map.
 *
 * It needs function for get model's unique id.
 *
 * if the function is not supplied then it uses default function {@link Collection#getItemID}
 * @param {function} [getItemIDFn] function for get model's id.
 */
var Collection = /*#__PURE__*/function () {
  function Collection(getItemIDFn) {
    collection_classCallCheck(this, Collection);

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


  collection_createClass(Collection, [{
    key: "getItemID",
    value:
    /**
     * get model's unique id.
     * @param {object} item model instance.
     * @returns {string | number} model unique id.
     */
    function getItemID(item) {
      var _item$_id;

      return (_item$_id = item === null || item === void 0 ? void 0 : item._id) !== null && _item$_id !== void 0 ? _item$_id : '';
    }
  }, {
    key: "getFirstItem",
    value: function getFirstItem() {
      var iterator = this.internalMap.values();
      return iterator.next().value;
    }
    /**
     * add models.
     * @param {Object[]} items - models to add this collection.
     */

  }, {
    key: "add",
    value: function add() {
      var _this = this;

      for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }

      items.forEach(function (item) {
        var id = _this.getItemID(item);

        _this.internalMap.set(id, item);
      });
      return this;
    }
    /**
     * remove models.
     * @param {Array.<(Object|string|number)>} items model instances or unique ids to delete.
     */

  }, {
    key: "remove",
    value: function remove() {
      var _this2 = this;

      var removeResult = [];

      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      items.forEach(function (item) {
        var id = isString_default()(item) || isNumber_default()(item) ? item : _this2.getItemID(item);

        if (!_this2.internalMap.has(id)) {
          return;
        }

        removeResult.push(_this2.internalMap.get(id));

        _this2.internalMap['delete'](id);
      });
      return removeResult.length === 1 ? removeResult[0] : removeResult;
    }
    /**
     * check collection has specific model.
     * @param {(object|string|number)} id model instance or id to check
     * @returns {boolean} is has model?
     */

  }, {
    key: "has",
    value: function has(item) {
      var id = isString_default()(item) || isNumber_default()(item) ? item : this.getItemID(item);
      return this.internalMap.has(id);
    }
  }, {
    key: "get",
    value: function get(item) {
      var _this$internalMap$get;

      var id = isString_default()(item) || isNumber_default()(item) ? item : this.getItemID(item);
      return (_this$internalMap$get = this.internalMap.get(id)) !== null && _this$internalMap$get !== void 0 ? _this$internalMap$get : null;
    }
    /**
     * invoke callback when model exist in collection.
     * @param {(string|number)} id model unique id.
     * @param {function} callback the callback.
     */

  }, {
    key: "doWhenHas",
    value: function doWhenHas(id, callback) {
      var item = this.internalMap.get(id);

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

  }, {
    key: "filter",
    value: function filter(filterFn) {
      var result = new Collection();

      if (this.hasOwnProperty('getItemID')) {
        result.getItemID = this.getItemID;
      }

      this.internalMap.forEach(function (item) {
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

  }, {
    key: "groupBy",
    value: function groupBy(groupByFn) {
      var _this3 = this;

      var result = {};
      this.internalMap.forEach(function (item) {
        var _key3, _result$_key;

        var key = isFunction(groupByFn) ? groupByFn(item) : item[groupByFn];

        if (isFunction(key)) {
          key = key.call(item);
        }

        (_result$_key = result[_key3 = key]) !== null && _result$_key !== void 0 ? _result$_key : result[_key3] = new Collection(_this3.getItemID);
        result[key].add(item);
      });
      return result;
    }
    /**
     * Return the first item in collection that satisfies the provided function.
     * @param {function} [findFn] - function filter
     * @returns {object|null} item.
     */

  }, {
    key: "find",
    value: function find(findFn) {
      var result = null;
      var items = this.internalMap.values();
      var next = items.next();

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

  }, {
    key: "sort",
    value: function sort(compareFn) {
      return this.toArray().sort(compareFn);
    }
    /**
     * iterate each model element.
     *
     * when iteratee return false then break the loop.
     * @param {function} iteratee iteratee(item, index, items)
     */

  }, {
    key: "each",
    value: function each(iteratee) {
      var entries = this.internalMap.entries();
      var next = entries.next();

      while (next.done === false) {
        var _next$value = collection_slicedToArray(next.value, 2),
            _key4 = _next$value[0],
            value = _next$value[1];

        if (iteratee(value, _key4) === false) {
          break;
        }

        next = entries.next();
      }
    }
    /**
     * remove all models in collection.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.internalMap.clear();
    }
    /**
     * return new array with collection items.
     * @returns {array} new array.
     */

  }, {
    key: "toArray",
    value: function toArray() {
      return Array.from(this.internalMap.values());
    }
  }, {
    key: "size",
    get: function get() {
      return this.internalMap.size;
    }
  }], [{
    key: "and",
    value: function and() {
      for (var _len3 = arguments.length, filterFns = new Array(_len3), _key5 = 0; _key5 < _len3; _key5++) {
        filterFns[_key5] = arguments[_key5];
      }

      var length = filterFns.length;
      return function (item) {
        for (var i = 0; i < length; i += 1) {
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

  }, {
    key: "or",
    value: function or() {
      for (var _len4 = arguments.length, filterFns = new Array(_len4), _key6 = 0; _key6 < _len4; _key6++) {
        filterFns[_key6] = arguments[_key6];
      }

      var length = filterFns.length;

      if (!length) {
        return function () {
          return false;
        };
      }

      return function (item) {
        var result = filterFns[0].call(null, item);

        for (var i = 1; i < length; i += 1) {
          result = result || filterFns[i].call(null, item);
        }

        return result;
      };
    }
  }]);

  return Collection;
}();


;// CONCATENATED MODULE: ./src/controller/base.ts
function base_toConsumableArray(arr) { return base_arrayWithoutHoles(arr) || base_iterableToArray(arr) || base_unsupportedIterableToArray(arr) || base_nonIterableSpread(); }

function base_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function base_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return base_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return base_arrayLikeToArray(o, minLen); }

function base_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function base_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return base_arrayLikeToArray(arr); }

function base_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { base_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function base_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





























/**
 * Make a event collection
 * @returns {Collection<EventModel>} instance
 */
function createEventCollection() {
  var collection = new Collection(function (event) {
    return event.cid();
  });

  if (arguments.length) {
    collection.add.apply(collection, arguments);
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
  var model = uiModel.model;

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
  var containDates = getDateRange(event.getStarts(), event.getEnds());
  containDates.forEach(function (date) {
    var ymd = datetime_toFormat(date, 'YYYYMMDD');
    var matrix = idsOfDay[ymd] = idsOfDay[ymd] || [];
    matrix.push(event.cid());
  });
}
/**
 * Remove event's id from matrix.
 * @param {IDS_OF_DAY} idsOfDay - ids of day
 * @param {EventModel} event - instance of event model
 */

function removeFromMatrix(idsOfDay, event) {
  var modelID = event.cid();
  Object.values(idsOfDay).forEach(function (ids) {
    var index = ids.indexOf(modelID);

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
  var event = new EventModel(eventData);
  return addEvent(calendarData, event);
}
function base_createEvents(calendarData) {
  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return events.map(function (eventData) {
    return createEvent(calendarData, eventData);
  });
}
/**
 * Update an event.
 * @param {CalendarData} calendarData - data of calendar
 * @param {string} eventId - event id
 * @param {string} calendarId - calendar id
 * @param {EventObject} eventData - event data
 * @returns {boolean} success or failure
 */

function base_updateEvent(calendarData, eventId, calendarId, eventData) {
  var idsOfDay = calendarData.idsOfDay;
  var event = calendarData.events.find(function (item) {
    return isSameEvent(item, eventId, calendarId);
  });

  if (!event) {
    return false;
  }

  event.init(_objectSpread(_objectSpread({}, event), eventData));
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

function base_deleteEvent(calendarData, event) {
  removeFromMatrix(calendarData.idsOfDay, event);
  calendarData.events.remove(event);
  return event;
}
function base_clearEvents(calendarData) {
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
  var start = condition.start,
      end = condition.end;
  var events = calendarData.events,
      idsOfDay = calendarData.idsOfDay;
  var range = getDateRange(start, end);
  var result = {};
  var ids;
  var ymd;
  var uiModels;
  range.forEach(function (date) {
    ymd = toFormat(date, 'YYYYMMDD');
    ids = idsOfDay[ymd];
    uiModels = result[ymd] = [];

    if (ids && ids.length) {
      var _uiModels;

      (_uiModels = uiModels).push.apply(_uiModels, base_toConsumableArray(ids.map(function (id) {
        return events.get(id);
      })));
    }
  });
  return result;
}
;// CONCATENATED MODULE: ./src/slices/calendar.ts
function calendar_toConsumableArray(arr) { return calendar_arrayWithoutHoles(arr) || calendar_iterableToArray(arr) || calendar_unsupportedIterableToArray(arr) || calendar_nonIterableSpread(); }

function calendar_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function calendar_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return calendar_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return calendar_arrayLikeToArray(o, minLen); }

function calendar_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function calendar_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return calendar_arrayLikeToArray(arr); }

function calendar_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function calendar_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function calendar_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? calendar_ownKeys(Object(source), !0).forEach(function (key) { calendar_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : calendar_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function calendar_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

























function createCalendarSlice() {
  var calendars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    calendar: {
      calendars: calendars,
      events: createEventCollection(),
      idsOfDay: {}
    }
  };
}
function createCalendarDispatchers(set) {
  return {
    createEvents: function createEvents(events) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        base_createEvents(state.calendar, events);
      }));
    },
    updateEvent: function updateEvent(_ref) {
      var event = _ref.event,
          eventData = _ref.eventData;
      return set((0,immer_esm/* default */.ZP)(function (state) {
        base_updateEvent(state.calendar, event.id, event.calendarId, eventData);
      }));
    },
    deleteEvent: function deleteEvent(event) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        base_deleteEvent(state.calendar, event);
      }));
    },
    clearEvents: function clearEvents() {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        base_clearEvents(state.calendar);
      }));
    },
    setCalendars: function setCalendars(calendars) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.calendar.calendars = calendars;
      }));
    },
    setCalendarColor: function setCalendarColor(calendarId, colorOptions) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        var calendars = state.calendar.calendars.map(function (calendar) {
          if (calendar.id === calendarId) {
            return calendar_objectSpread(calendar_objectSpread({}, calendar), colorOptions);
          }

          return calendar;
        });
        var events = state.calendar.events.toArray().map(function (event) {
          if (event.calendarId === calendarId) {
            var _colorOptions$color, _colorOptions$backgro, _colorOptions$borderC, _colorOptions$dragBac;

            event.color = (_colorOptions$color = colorOptions.color) !== null && _colorOptions$color !== void 0 ? _colorOptions$color : event.color;
            event.backgroundColor = (_colorOptions$backgro = colorOptions.backgroundColor) !== null && _colorOptions$backgro !== void 0 ? _colorOptions$backgro : event.backgroundColor;
            event.borderColor = (_colorOptions$borderC = colorOptions.borderColor) !== null && _colorOptions$borderC !== void 0 ? _colorOptions$borderC : event.borderColor;
            event.dragBackgroundColor = (_colorOptions$dragBac = colorOptions.dragBackgroundColor) !== null && _colorOptions$dragBac !== void 0 ? _colorOptions$dragBac : event.dragBackgroundColor;
          }

          return event;
        });
        var collection = createEventCollection.apply(void 0, calendar_toConsumableArray(events));
        state.calendar.calendars = calendars;
        state.calendar.events = collection;
      }));
    },
    setCalendarVisibility: function setCalendarVisibility(calendarIds, isVisible) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        var events = state.calendar.events.toArray();
        state.calendar.events = createEventCollection.apply(void 0, calendar_toConsumableArray(events.map(function (event) {
          if (calendarIds.includes(event.calendarId)) {
            event.isVisible = isVisible;
          }

          return event;
        })));
      }));
    }
  };
}
;// CONCATENATED MODULE: ./src/slices/dnd.ts








function dnd_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function dnd_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? dnd_ownKeys(Object(source), !0).forEach(function (key) { dnd_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : dnd_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function dnd_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var DraggingState;

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
    initDrag: function initDrag(initState) {
      set((0,immer_esm/* default */.ZP)(function (state) {
        state.dnd = dnd_objectSpread(dnd_objectSpread(dnd_objectSpread({}, state.dnd), initState), {}, {
          draggingState: DraggingState.INIT
        });
      }));
    },
    setDragging: function setDragging(newState) {
      set((0,immer_esm/* default */.ZP)(function (state) {
        state.dnd = dnd_objectSpread(dnd_objectSpread(dnd_objectSpread({}, state.dnd), newState), {}, {
          draggingState: DraggingState.DRAGGING
        });
      }));
    },
    cancelDrag: function cancelDrag() {
      set((0,immer_esm/* default */.ZP)(function (state) {
        state.dnd = createDndSlice().dnd;
        state.dnd.draggingState = DraggingState.CANCELED;
      }));
    },
    reset: function reset() {
      set((0,immer_esm/* default */.ZP)(function (state) {
        state.dnd = createDndSlice().dnd;
      }));
    },
    setDraggingEventUIModel: function setDraggingEventUIModel(eventUIModel) {
      set((0,immer_esm/* default */.ZP)(function (state) {
        var _eventUIModel$clone;

        state.dnd.draggingEventUIModel = (_eventUIModel$clone = eventUIModel === null || eventUIModel === void 0 ? void 0 : eventUIModel.clone()) !== null && _eventUIModel$clone !== void 0 ? _eventUIModel$clone : null;
      }));
    }
  };
}
;// CONCATENATED MODULE: ./src/slices/gridSelection.ts















function gridSelection_toConsumableArray(arr) { return gridSelection_arrayWithoutHoles(arr) || gridSelection_iterableToArray(arr) || gridSelection_unsupportedIterableToArray(arr) || gridSelection_nonIterableSpread(); }

function gridSelection_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function gridSelection_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return gridSelection_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return gridSelection_arrayLikeToArray(o, minLen); }

function gridSelection_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function gridSelection_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return gridSelection_arrayLikeToArray(arr); }

function gridSelection_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


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
    setGridSelection: function setGridSelection(type, gridSelection) {
      set((0,immer_esm/* default */.ZP)(function (state) {
        state.gridSelection[type] = gridSelection;
      }));
    },
    addGridSelection: function addGridSelection(type, gridSelection) {
      set((0,immer_esm/* default */.ZP)(function (state) {
        if (type === 'dayGridMonth' && gridSelection) {
          state.gridSelection.accumulated[type] = [].concat(gridSelection_toConsumableArray(state.gridSelection.accumulated[type]), [gridSelection]);
          state.gridSelection.dayGridMonth = null;
        }
      }));
    },
    clearAll: function clearAll() {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.gridSelection = createGridSelectionSlice().gridSelection;
      }));
    }
  };
}
;// CONCATENATED MODULE: ./src/constants/layout.ts
var DEFAULT_RESIZER_LENGTH = 3;
var DEFAULT_DUPLICATE_EVENT_CID = -1;
;// CONCATENATED MODULE: ./src/slices/layout.ts






function getRestPanelHeight(dayGridRowsState, lastPanelType, initHeight) {
  return Object.keys(dayGridRowsState).reduce(function (acc, rowName) {
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
    setLastPanelType: function setLastPanelType(type) {
      set((0,immer_esm/* default */.ZP)(function (state) {
        state.weekViewLayout.lastPanelType = type;

        if (type) {
          state.weekViewLayout.dayGridRows[type].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, type, state.layout);
        }
      }));
    },
    updateLayoutHeight: function updateLayoutHeight(height) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        var lastPanelType = state.weekViewLayout.lastPanelType;
        state.layout = height;

        if (lastPanelType) {
          state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, lastPanelType, height);
        }
      }));
    },
    updateDayGridRowHeight: function updateDayGridRowHeight(_ref) {
      var rowName = _ref.rowName,
          height = _ref.height;
      return set((0,immer_esm/* default */.ZP)(function (state) {
        var lastPanelType = state.weekViewLayout.lastPanelType;
        state.weekViewLayout.dayGridRows[rowName] = {
          height: height
        };

        if (lastPanelType) {
          state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, lastPanelType, state.layout);
        }
      }));
    },
    updateDayGridRowHeightByDiff: function updateDayGridRowHeightByDiff(_ref2) {
      var rowName = _ref2.rowName,
          diff = _ref2.diff;
      return set((0,immer_esm/* default */.ZP)(function (state) {
        var _state$weekViewLayout, _state$weekViewLayout2, _state$weekViewLayout3;

        var lastPanelType = state.weekViewLayout.lastPanelType;
        var height = (_state$weekViewLayout = (_state$weekViewLayout2 = state.weekViewLayout.dayGridRows) === null || _state$weekViewLayout2 === void 0 ? void 0 : (_state$weekViewLayout3 = _state$weekViewLayout2[rowName]) === null || _state$weekViewLayout3 === void 0 ? void 0 : _state$weekViewLayout3.height) !== null && _state$weekViewLayout !== void 0 ? _state$weekViewLayout : DEFAULT_PANEL_HEIGHT;
        state.weekViewLayout.dayGridRows[rowName] = {
          height: height + diff
        };

        if (lastPanelType) {
          state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, lastPanelType, state.layout);
        }
      }));
    },
    setSelectedDuplicateEventCid: function setSelectedDuplicateEventCid(cid) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.weekViewLayout.selectedDuplicateEventCid = cid !== null && cid !== void 0 ? cid : DEFAULT_DUPLICATE_EVENT_CID;
      }));
    }
  };
}
;// CONCATENATED MODULE: ./src/utils/string.ts

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
;// CONCATENATED MODULE: ./src/helpers/dayName.ts


var DEFAULT_DAY_NAMES = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var getDayName = function getDayName(dayIndex) {
  return DEFAULT_DAY_NAMES[dayIndex];
};
function getDayNames(days, weekDayNamesOption) {
  return days.map(function (day) {
    var dayIndex = day.getDay();
    var dayName = weekDayNamesOption.length > 0 ? weekDayNamesOption[dayIndex] : capitalize(getDayName(dayIndex));
    return {
      date: day.getDate(),
      day: day.getDay(),
      dayName: dayName,
      isToday: true,
      renderDate: 'date',
      dateInstance: day
    };
  });
}
;// CONCATENATED MODULE: ./src/slices/options.ts
function options_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function options_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? options_ownKeys(Object(source), !0).forEach(function (key) { options_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : options_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function options_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















function initializeCollapseDuplicateEvents(options) {
  if (!options) {
    return false;
  }

  var initialCollapseDuplicateEvents = {
    getDuplicateEvents: function getDuplicateEvents(targetEvent, events) {
      return events.filter(function (event) {
        return event.title === targetEvent.title && compare(event.start, targetEvent.start) === 0 && compare(event.end, targetEvent.end) === 0;
      }).sort(function (a, b) {
        return a.calendarId > b.calendarId ? 1 : -1;
      });
    },
    getMainEvent: function getMainEvent(events) {
      return last(events);
    }
  };

  if (isBoolean_default()(options)) {
    return initialCollapseDuplicateEvents;
  }

  return options_objectSpread(options_objectSpread({}, initialCollapseDuplicateEvents), options);
}

function initializeWeekOptions() {
  var weekOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var week = options_objectSpread({
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
    collapseDuplicateEvents: false
  }, weekOptions);

  week.collapseDuplicateEvents = initializeCollapseDuplicateEvents(week.collapseDuplicateEvents);
  return week;
}

function initializeTimezoneOptions() {
  var timezoneOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return options_objectSpread({
    zones: []
  }, timezoneOptions);
}

function initializeMonthOptions() {
  var monthOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var month = options_objectSpread({
    dayNames: [],
    visibleWeeksCount: 0,
    workweek: false,
    narrowWeekend: false,
    startDayOfWeek: Day.SUN,
    isAlways6Weeks: true,
    visibleEventCount: 6
  }, monthOptions);

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

  return options_objectSpread({
    enableDblClick: true,
    enableClick: true
  }, options);
}

var initialEventFilter = function initialEventFilter(event) {
  return !!event.isVisible;
}; // TODO: some of options has default values. so it should be `Required` type.
// But it needs a complex type such as `DeepRequired`.
// maybe leveraging library like `ts-essential` might be helpful.


// eslint-disable-next-line complexity
function createOptionsSlice() {
  var _options$defaultView, _options$useFormPopup, _options$useDetailPop, _options$isReadOnly, _options$usageStatist, _options$eventFilter;

  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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
    setOptions: function setOptions() {
      var newOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return set((0,immer_esm/* default */.ZP)(function (state) {
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
function popup_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var PopupType;

(function (PopupType) {
  PopupType["SeeMore"] = "seeMore";
  PopupType["Form"] = "form";
  PopupType["Detail"] = "detail";
})(PopupType || (PopupType = {}));

function createPopupSlice() {
  var _popup;

  return {
    popup: (_popup = {}, popup_defineProperty(_popup, PopupType.SeeMore, null), popup_defineProperty(_popup, PopupType.Form, null), popup_defineProperty(_popup, PopupType.Detail, null), _popup)
  };
}
function createPopupDispatchers(set) {
  return {
    showSeeMorePopup: function showSeeMorePopup(param) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.popup[PopupType.SeeMore] = param;
        state.popup[PopupType.Form] = null;
        state.popup[PopupType.Detail] = null;
      }));
    },
    showFormPopup: function showFormPopup(param) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.popup[PopupType.Form] = param;
        state.popup[PopupType.SeeMore] = null;
        state.popup[PopupType.Detail] = null;
      }));
    },
    showDetailPopup: function showDetailPopup(param, isOpenedInSeeMorePopup) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.popup[PopupType.Detail] = param;
        state.popup[PopupType.Form] = null;

        if (!isOpenedInSeeMorePopup) {
          state.popup[PopupType.SeeMore] = null;
        }
      }));
    },
    hideSeeMorePopup: function hideSeeMorePopup() {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.popup[PopupType.SeeMore] = null;
      }));
    },
    hideFormPopup: function hideFormPopup() {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.popup[PopupType.Form] = null;
      }));
    },
    hideDetailPopup: function hideDetailPopup() {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.popup[PopupType.Detail] = null;
      }));
    },
    hideAllPopup: function hideAllPopup() {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.popup[PopupType.SeeMore] = null;
        state.popup[PopupType.Form] = null;
        state.popup[PopupType.Detail] = null;
      }));
    }
  };
}
;// CONCATENATED MODULE: ./src/utils/noop.ts
var noop = function noop() {// do nothing
};
;// CONCATENATED MODULE: ./src/utils/dom.ts









var CSS_AUTO_REGEX = /^auto$|^$|%/;

function getStyle(el, style) {
  var value = el.style[style];

  if ((!value || value === 'auto') && document.defaultView) {
    var css = document.defaultView.getComputedStyle(el, null);
    value = css ? css[style] : null;
  }

  return value === 'auto' ? null : value;
} // eslint-disable-next-line complexity


function getPosition(el) {
  if ((CSS_AUTO_REGEX.test(el.style.left || '') || CSS_AUTO_REGEX.test(el.style.top || '')) && 'getBoundingClientRect' in el) {
    // When the element's left or top is 'auto'
    var _el$getBoundingClient = el.getBoundingClientRect(),
        left = _el$getBoundingClient.left,
        top = _el$getBoundingClient.top;

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
  var w = getStyle(el, 'width');
  var h = getStyle(el, 'height');

  if ((invalidateSizeValue(w) || invalidateSizeValue(h)) && el.getBoundingClientRect) {
    var _el$getBoundingClient2 = el.getBoundingClientRect(),
        width = _el$getBoundingClient2.width,
        height = _el$getBoundingClient2.height;

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
  var r1 = el1.getBoundingClientRect();
  var r2 = el2.getBoundingClientRect();
  return !(r1.top > r2.bottom || r1.right < r2.left || r1.bottom < r2.top || r1.left > r2.right);
} // for ssr
// eslint-disable-next-line @typescript-eslint/no-empty-function

var ElementClass = typeof Element === 'undefined' ? noop : Element;
var elProto = ElementClass.prototype;

var matchSelector = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector || function (selector) {
  return Array.from(document.querySelectorAll(selector)).includes(this);
};

function matches(element, selector) {
  return matchSelector.call(element, selector);
}

function closest(element, selector) {
  if (matches(element, selector)) {
    return element;
  }

  var parent = element.parentNode;

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











var SIXTY_MINUTES = 60;
var templates = {
  milestone: function milestone(model) {
    var classNames = cls('icon', 'ic-milestone');
    return h(p, null, h("span", {
      className: classNames
    }), h("span", {
      style: {
        backgroundColor: model.backgroundColor
      }
    }, stripTags(model.title)));
  },
  milestoneTitle: function milestoneTitle() {
    return h("span", {
      className: cls('left-content')
    }, "Milestone");
  },
  task: function task(model) {
    return "#".concat(model.title);
  },
  taskTitle: function taskTitle() {
    return h("span", {
      className: cls('left-content')
    }, "Task");
  },
  alldayTitle: function alldayTitle() {
    return h("span", {
      className: cls('left-content')
    }, "All Day");
  },
  allday: function allday(model) {
    return stripTags(model.title);
  },
  time: function time(model) {
    var start = model.start,
        title = model.title;

    if (start) {
      return h("span", null, h("strong", null, datetime_toFormat(start, 'HH:mm')), "\xA0", h("span", null, stripTags(title)));
    }

    return stripTags(title);
  },
  goingDuration: function goingDuration(model) {
    var goingDuration = model.goingDuration;
    var hour = Math.floor(goingDuration / SIXTY_MINUTES);
    var minutes = goingDuration % SIXTY_MINUTES;
    return "GoingTime ".concat(leadingZero(hour, 2), ":").concat(leadingZero(minutes, 2));
  },
  comingDuration: function comingDuration(model) {
    var comingDuration = model.comingDuration;
    var hour = Math.floor(comingDuration / SIXTY_MINUTES);
    var minutes = comingDuration % SIXTY_MINUTES;
    return "ComingTime ".concat(leadingZero(hour, 2), ":").concat(leadingZero(minutes, 2));
  },
  monthMoreTitleDate: function monthMoreTitleDate(moreTitle) {
    var date = moreTitle.date,
        day = moreTitle.day;
    var classNameDay = cls('more-title-date');
    var classNameDayLabel = cls('more-title-day');
    var dayName = capitalize(getDayName(day));
    return h(p, null, h("span", {
      className: classNameDay
    }, date), h("span", {
      className: classNameDayLabel
    }, dayName));
  },
  monthMoreClose: function monthMoreClose() {
    return '';
  },
  monthGridHeader: function monthGridHeader(model) {
    var date = parseInt(model.date.split('-')[2], 10);
    var classNames = cls('weekday-grid-date', {
      'weekday-grid-date-decorator': model.isToday
    });
    return h("span", {
      className: classNames
    }, date);
  },
  monthGridHeaderExceed: function monthGridHeaderExceed(hiddenEvents) {
    var className = cls('weekday-grid-more-events');
    return h("span", {
      className: className
    }, hiddenEvents, " more");
  },
  monthGridFooter: function monthGridFooter(_model) {
    return '';
  },
  monthGridFooterExceed: function monthGridFooterExceed(_hiddenEvents) {
    return '';
  },
  monthDayName: function monthDayName(model) {
    return model.label;
  },
  weekDayName: function weekDayName(model) {
    var classDate = cls('day-name__date');
    var className = cls('day-name__name');
    return h(p, null, h("span", {
      className: classDate
    }, model.date), "\xA0\xA0", h("span", {
      className: className
    }, model.dayName));
  },
  weekGridFooterExceed: function weekGridFooterExceed(hiddenEvents) {
    return "+".concat(hiddenEvents);
  },
  collapseBtnTitle: function collapseBtnTitle() {
    var className = cls('collapse-btn-icon');
    return h("span", {
      className: className
    });
  },
  timezoneDisplayLabel: function timezoneDisplayLabel(_ref) {
    var displayLabel = _ref.displayLabel,
        timezoneOffset = _ref.timezoneOffset;

    if (type_isNil(displayLabel) && isPresent(timezoneOffset)) {
      var sign = timezoneOffset < 0 ? '-' : '+';
      var hours = Math.abs(timezoneOffset / SIXTY_MINUTES);
      var minutes = Math.abs(timezoneOffset % SIXTY_MINUTES);
      return "GMT".concat(sign).concat(leadingZero(hours, 2), ":").concat(leadingZero(minutes, 2));
    }

    return displayLabel;
  },
  timegridDisplayPrimaryTime: function timegridDisplayPrimaryTime(props) {
    var time = props.time;
    return datetime_toFormat(time, 'hh tt');
  },
  timegridDisplayTime: function timegridDisplayTime(props) {
    var time = props.time;
    return datetime_toFormat(time, 'HH:mm');
  },
  timegridNowIndicatorLabel: function timegridNowIndicatorLabel(timezone) {
    var time = timezone.time,
        _timezone$format = timezone.format,
        format = _timezone$format === void 0 ? 'HH:mm' : _timezone$format;
    return datetime_toFormat(time, format);
  },
  popupIsAllday: function popupIsAllday() {
    return 'All day';
  },
  popupStateFree: function popupStateFree() {
    return 'Free';
  },
  popupStateBusy: function popupStateBusy() {
    return 'Busy';
  },
  titlePlaceholder: function titlePlaceholder() {
    return 'Subject';
  },
  locationPlaceholder: function locationPlaceholder() {
    return 'Location';
  },
  startDatePlaceholder: function startDatePlaceholder() {
    return 'Start date';
  },
  endDatePlaceholder: function endDatePlaceholder() {
    return 'End date';
  },
  popupSave: function popupSave() {
    return 'Save';
  },
  popupUpdate: function popupUpdate() {
    return 'Update';
  },
  popupEdit: function popupEdit() {
    return 'Edit';
  },
  popupDelete: function popupDelete() {
    return 'Delete';
  },
  popupDetailTitle: function popupDetailTitle(_ref2) {
    var title = _ref2.title;
    return title;
  },
  popupDetailDate: function popupDetailDate(_ref3) {
    var isAllday = _ref3.isAllday,
        start = _ref3.start,
        end = _ref3.end;
    var dayFormat = 'YYYY.MM.DD';
    var timeFormat = 'hh:mm tt';
    var detailFormat = "".concat(dayFormat, " ").concat(timeFormat);
    var startDate = datetime_toFormat(start, isAllday ? dayFormat : timeFormat);
    var endDateFormat = isSameDate(start, end) ? timeFormat : detailFormat;

    if (isAllday) {
      return "".concat(startDate).concat(isSameDate(start, end) ? '' : " - ".concat(datetime_toFormat(end, dayFormat)));
    }

    return "".concat(datetime_toFormat(start, detailFormat), " - ").concat(datetime_toFormat(end, endDateFormat));
  },
  popupDetailLocation: function popupDetailLocation(_ref4) {
    var location = _ref4.location;
    return location;
  },
  popupDetailAttendees: function popupDetailAttendees(_ref5) {
    var _ref5$attendees = _ref5.attendees,
        attendees = _ref5$attendees === void 0 ? [] : _ref5$attendees;
    return attendees.join(', ');
  },
  popupDetailState: function popupDetailState(_ref6) {
    var state = _ref6.state;
    return state || 'Busy';
  },
  popupDetailRecurrenceRule: function popupDetailRecurrenceRule(_ref7) {
    var recurrenceRule = _ref7.recurrenceRule;
    return recurrenceRule;
  },
  popupDetailBody: function popupDetailBody(_ref8) {
    var body = _ref8.body;
    return body;
  }
};
;// CONCATENATED MODULE: ./src/slices/template.ts








function template_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function template_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? template_ownKeys(Object(source), !0).forEach(function (key) { template_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : template_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function template_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function createTemplateSlice() {
  var templateConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    template: template_objectSpread(template_objectSpread({}, templates), templateConfig)
  };
}
function createTemplateDispatchers(set) {
  return {
    setTemplate: function setTemplate(template) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.template = template_objectSpread(template_objectSpread({}, state.template), template);
      }));
    }
  };
}
;// CONCATENATED MODULE: ./src/slices/view.ts



function createViewSlice() {
  var initialView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'week';
  var renderDate = new date_TZDate();
  renderDate.setHours(0, 0, 0, 0);
  return {
    view: {
      currentView: initialView,
      renderDate: renderDate
    }
  };
}
function createViewDispatchers(set) {
  return {
    changeView: function changeView(nextView) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.view.currentView = nextView;
      }));
    },
    setRenderDate: function setRenderDate(date) {
      return set((0,immer_esm/* default */.ZP)(function (state) {
        state.view.renderDate = toStartOfDay(date);
      }));
    }
  };
}
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.object.is.js
var es_object_is = __webpack_require__(9170);
;// CONCATENATED MODULE: ./src/store/index.ts
function store_slicedToArray(arr, i) { return store_arrayWithHoles(arr) || store_iterableToArrayLimit(arr, i) || store_unsupportedIterableToArray(arr, i) || store_nonIterableRest(); }

function store_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function store_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return store_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return store_arrayLikeToArray(o, minLen); }

function store_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function store_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function store_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



















/**
 * Inspired by Zustand
 *
 * See more: https://github.com/pmndrs/zustand
 */
var isSSR = isUndefined_default()(window) || !window.navigator;
var useIsomorphicLayoutEffect = isSSR ? hooks_module_ : hooks_module_h;
function createStoreContext() {
  var StoreContext = B(null);

  function StoreProvider(_ref) {
    var children = _ref.children,
        store = _ref.store;
    return h(StoreContext.Provider, {
      value: store,
      children: children
    });
  }

  var useStore = function useStore(selector) {
    var equalityFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.is;
    var storeCtx = hooks_module_q(StoreContext);

    if (type_isNil(storeCtx)) {
      throw new Error('StoreProvider is not found');
    } // a little trick to invoke re-render to notify hook consumers(usually components)


    var _ref2 = hooks_module_d(function (notifyCount) {
      return notifyCount + 1;
    }, 0),
        _ref3 = store_slicedToArray(_ref2, 2),
        notify = _ref3[1];

    var state = storeCtx.getState();
    var stateRef = hooks_module_s(state);
    var selectorRef = hooks_module_s(selector);
    var equalityFnRef = hooks_module_s(equalityFn);
    var hasErrorRef = hooks_module_s(false); // `null` can be a valid state slice.

    var currentSliceRef = hooks_module_s();

    if (isUndefined_default()(currentSliceRef.current)) {
      currentSliceRef.current = selector(state);
    }

    var newStateSlice;
    var hasNewStateSlice = false;
    var shouldGetNewSlice = stateRef.current !== state || selectorRef.current !== selector || equalityFnRef.current !== equalityFn || hasErrorRef.current;

    if (shouldGetNewSlice) {
      newStateSlice = selector(state);
      hasNewStateSlice = !equalityFn(currentSliceRef.current, newStateSlice);
    }

    useIsomorphicLayoutEffect(function () {
      if (hasNewStateSlice) {
        currentSliceRef.current = newStateSlice;
      }

      stateRef.current = state;
      selectorRef.current = selector;
      equalityFnRef.current = equalityFn;
      hasErrorRef.current = false;
    }); // NOTE: There is edge case that state is changed before subscription

    var stateBeforeSubscriptionRef = hooks_module_s(state);
    useIsomorphicLayoutEffect(function () {
      var listener = function listener() {
        try {
          var nextState = storeCtx.getState();
          var nextStateSlice = selectorRef.current(nextState);
          var shouldUpdateState = !equalityFnRef.current(currentSliceRef.current, nextStateSlice);

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

      var unsubscribe = storeCtx.subscribe(listener);

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


  var useInternalStore = function useInternalStore() {
    var storeCtx = hooks_module_q(StoreContext);

    if (type_isNil(storeCtx)) {
      throw new Error('StoreProvider is not found');
    }

    return F(function () {
      return storeCtx;
    }, [storeCtx]);
  };

  return {
    StoreProvider: StoreProvider,
    useStore: useStore,
    useInternalStore: useInternalStore
  };
}
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.set.js
var es_set = __webpack_require__(3244);
;// CONCATENATED MODULE: ./src/store/internal.ts
function internal_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function internal_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? internal_ownKeys(Object(source), !0).forEach(function (key) { internal_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : internal_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function internal_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













function createStore(storeCreator) {
  var state;
  var listeners = new Set();

  var setState = function setState(partialStateCreator) {
    var nextState = partialStateCreator(state);

    if (nextState !== state) {
      var previousState = state;
      state = internal_objectSpread(internal_objectSpread({}, state), nextState);
      listeners.forEach(function (listener) {
        return listener(state, previousState);
      });
    }
  };

  var getState = function getState() {
    return state;
  };

  var subscribe = function subscribe(listener, selector, equalityFn) {
    var _listener = listener;

    if (selector) {
      var currentSlice = selector(state);

      var _equalityFn = equalityFn !== null && equalityFn !== void 0 ? equalityFn : Object.is;

      _listener = function _listener() {
        var nextSlice = selector(state);

        if (!_equalityFn(currentSlice, nextSlice)) {
          var previousSlice = currentSlice;
          currentSlice = nextSlice;
          listener(currentSlice, previousSlice);
        }
      };
    }

    listeners.add(_listener); // eslint-disable-next-line dot-notation

    return function () {
      return listeners.delete(_listener);
    };
  };

  var clearListeners = function clearListeners() {
    return listeners.clear();
  };

  var internal = {
    setState: setState,
    getState: getState,
    subscribe: subscribe,
    clearListeners: clearListeners
  };
  state = storeCreator(setState, getState, internal);
  return internal;
}
;// CONCATENATED MODULE: ./src/contexts/calendarStore.ts








function calendarStore_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function calendarStore_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? calendarStore_ownKeys(Object(source), !0).forEach(function (key) { calendarStore_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : calendarStore_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function calendarStore_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













var storeCreator = function storeCreator(options) {
  return function (set) {
    return calendarStore_objectSpread(calendarStore_objectSpread(calendarStore_objectSpread(calendarStore_objectSpread(calendarStore_objectSpread(calendarStore_objectSpread(calendarStore_objectSpread(calendarStore_objectSpread(calendarStore_objectSpread({}, createOptionsSlice(options)), createTemplateSlice(options.template)), createPopupSlice()), createWeekViewLayoutSlice()), createCalendarSlice(options.calendars)), createViewSlice(options.defaultView)), createDndSlice()), createGridSelectionSlice()), {}, {
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
    });
  };
};

var initCalendarStore = function initCalendarStore() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return createStore(storeCreator(options));
};

var _createStoreContext = createStoreContext(),
    StoreProvider = _createStoreContext.StoreProvider,
    useStore = _createStoreContext.useStore,
    useInternalStore = _createStoreContext.useInternalStore;


function useDispatch(group) {
  return useStore(hooks_module_T(function (state) {
    if (!group) {
      return state.dispatch;
    }

    return state.dispatch[group];
  }, [group]));
}
;// CONCATENATED MODULE: ./src/selectors/index.ts
function topLevelStateSelector(group) {
  return function (state) {
    return state[group];
  };
}
var popupSelector = topLevelStateSelector('popup');
var calendarSelector = topLevelStateSelector('calendar');
var weekViewLayoutSelector = topLevelStateSelector('weekViewLayout');
var templateSelector = topLevelStateSelector('template');
var viewSelector = topLevelStateSelector('view');
var optionsSelector = topLevelStateSelector('options');
var dndSelector = topLevelStateSelector('dnd');
// EXTERNAL MODULE: ../../node_modules/isomorphic-dompurify/browser.js
var browser = __webpack_require__(4304);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);
;// CONCATENATED MODULE: ./src/utils/sanitizer.ts
 // For temporarily saving original target value

var TEMP_TARGET_ATTRIBUTE = 'data-target-temp';
/**
 * Add DOMPurify hook to handling exceptional rules for certain HTML attributes.
 * Should be set when the calendar instance is created.
 */

function addAttributeHooks() {
  browser_default().addHook('beforeSanitizeAttributes', function (node) {
    // Preserve default target attribute value
    if (node.tagName === 'A') {
      var targetValue = node.getAttribute('target');

      if (targetValue) {
        node.setAttribute(TEMP_TARGET_ATTRIBUTE, targetValue);
      } else {
        node.setAttribute('target', '_self'); // set default value
      }
    }
  });
  browser_default().addHook('afterSanitizeAttributes', function (node) {
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

  var template = _ref.template,
      param = _ref.param,
      _ref$as = _ref.as,
      tagName = _ref$as === void 0 ? 'div' : _ref$as;
  var templates = useStore(templateSelector);
  var templateFunc = templates[template];

  if (type_isNil(templateFunc)) {
    return null;
  }

  var htmlOrVnode = templateFunc(param);
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



var EventBusContext = B(null);
var EventBusProvider = EventBusContext.Provider;
var useEventBus = function useEventBus() {
  var eventBus = hooks_module_q(EventBusContext);

  if (!eventBus) {
    throw new Error('useEventBus must be used within a EventBusProvider');
  }

  return eventBus;
};
;// CONCATENATED MODULE: ./src/selectors/timezone.ts
var primaryTimezoneSelector = function primaryTimezoneSelector(state) {
  var _state$options$timezo, _state$options, _state$options$timezo2, _state$options$timezo3, _state$options$timezo4;

  return (_state$options$timezo = (_state$options = state.options) === null || _state$options === void 0 ? void 0 : (_state$options$timezo2 = _state$options.timezone) === null || _state$options$timezo2 === void 0 ? void 0 : (_state$options$timezo3 = _state$options$timezo2.zones) === null || _state$options$timezo3 === void 0 ? void 0 : (_state$options$timezo4 = _state$options$timezo3[0]) === null || _state$options$timezo4 === void 0 ? void 0 : _state$options$timezo4.timezoneName) !== null && _state$options$timezo !== void 0 ? _state$options$timezo : 'Local';
};
var customOffsetCalculatorSelector = function customOffsetCalculatorSelector(state) {
  var _state$options2, _state$options2$timez;

  return (_state$options2 = state.options) === null || _state$options2 === void 0 ? void 0 : (_state$options2$timez = _state$options2.timezone) === null || _state$options2$timez === void 0 ? void 0 : _state$options2$timez.customOffsetCalculator;
};
var timezonesSelector = function timezonesSelector(state) {
  var _state$options$timezo5;

  return (_state$options$timezo5 = state.options.timezone.zones) !== null && _state$options$timezo5 !== void 0 ? _state$options$timezo5 : [];
};
;// CONCATENATED MODULE: ./src/hooks/timezone/useTZConverter.ts





function useTZConverter() {
  var customOffsetCalculator = useStore(customOffsetCalculatorSelector);
  var hasCustomOffsetCalculator = isPresent(customOffsetCalculator);
  return hooks_module_T(function (timezoneName) {
    var tzDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new date_TZDate();
    return tzDate.tz(hasCustomOffsetCalculator ? customOffsetCalculator(timezoneName, tzDate.getTime()) : timezoneName);
  }, [customOffsetCalculator, hasCustomOffsetCalculator]);
}
;// CONCATENATED MODULE: ./src/hooks/timezone/usePrimaryTimezone.ts




function usePrimaryTimezone() {
  var primaryTimezoneName = useStore(primaryTimezoneSelector);
  var tzConverter = useTZConverter();
  var getNow = hooks_module_T(function () {
    return tzConverter(primaryTimezoneName);
  }, [primaryTimezoneName, tzConverter]);
  return [primaryTimezoneName, getNow];
}
;// CONCATENATED MODULE: ./src/components/dayGridCommon/dayName.tsx















function dayName_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function dayName_slicedToArray(arr, i) { return dayName_arrayWithHoles(arr) || dayName_iterableToArrayLimit(arr, i) || dayName_unsupportedIterableToArray(arr, i) || dayName_nonIterableRest(); }

function dayName_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function dayName_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dayName_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dayName_arrayLikeToArray(o, minLen); }

function dayName_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dayName_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function dayName_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









function isWeekDayName(type, dayName) {
  return type === 'week';
}

function getWeekDayNameColor(_ref) {
  var dayName = _ref.dayName,
      theme = _ref.theme,
      today = _ref.today;
  var day = dayName.day,
      dateInstance = dayName.dateInstance;
  var isToday = isSameDate(today, dateInstance);
  var isPastDay = !isToday && dateInstance < today;

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
  var dayName = _ref2.dayName,
      theme = _ref2.theme;
  var day = dayName.day;

  if (isSunday(day)) {
    return theme.common.holiday.color;
  }

  if (isSaturday(day)) {
    return theme.common.saturday.color;
  }

  return theme.common.dayName.color;
}

function DayName(_ref3) {
  var dayName = _ref3.dayName,
      style = _ref3.style,
      type = _ref3.type,
      theme = _ref3.theme;
  var eventBus = useEventBus();

  var _usePrimaryTimezone = usePrimaryTimezone(),
      _usePrimaryTimezone2 = dayName_slicedToArray(_usePrimaryTimezone, 2),
      getNow = _usePrimaryTimezone2[1];

  var today = getNow();
  var day = dayName.day;
  var color = type === 'week' ? getWeekDayNameColor({
    dayName: dayName,
    theme: theme,
    today: today
  }) : getMonthDayNameColor({
    dayName: dayName,
    theme: theme
  });
  var templateType = "".concat(type, "DayName");

  var handleClick = function handleClick() {
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
    className: cls(dayName_defineProperty({}, "holiday-".concat(getDayName(day)), isWeekend(day))),
    style: {
      color: color
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
var commonThemeSelector = topLevelStateSelector('common');
var theme_weekThemeSelector = topLevelStateSelector('week');
var monthThemeSelector = topLevelStateSelector('month');
var weekDayGridLeftSelector = function weekDayGridLeftSelector(theme) {
  return theme.week.dayGridLeft;
};
var weekTimeGridLeftSelector = function weekTimeGridLeftSelector(theme) {
  return theme.week.timeGridLeft;
};
var monthMoreViewSelector = function monthMoreViewSelector(theme) {
  return theme.month.moreView;
};
var monthGridCellSelector = function monthGridCellSelector(theme) {
  return theme.month.gridCell;
};
;// CONCATENATED MODULE: ./src/constants/theme.ts
var DEFAULT_COMMON_THEME = {
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
var DEFAULT_WEEK_THEME = {
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
var DEFAULT_MONTH_THEME = {
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
  var commonTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    common: mergeObject(DEFAULT_COMMON_THEME, commonTheme)
  };
}
;// CONCATENATED MODULE: ./src/theme/dispatch.ts


function createThemeDispatch(set) {
  return {
    setTheme: function setTheme(theme) {
      set((0,immer_esm/* default */.ZP)(function (state) {
        state.common = mergeObject(state.common, theme.common);
        state.week = mergeObject(state.week, theme.week);
        state.month = mergeObject(state.month, theme.month);
      }));
    },
    setCommonTheme: function setCommonTheme(commonTheme) {
      set((0,immer_esm/* default */.ZP)(function (state) {
        state.common = mergeObject(state.common, commonTheme);
      }));
    },
    setWeekTheme: function setWeekTheme(weekTheme) {
      set((0,immer_esm/* default */.ZP)(function (state) {
        state.week = mergeObject(state.week, weekTheme);
      }));
    },
    setMonthTheme: function setMonthTheme(monthTheme) {
      set((0,immer_esm/* default */.ZP)(function (state) {
        state.month = mergeObject(state.month, monthTheme);
      }));
    }
  };
}
;// CONCATENATED MODULE: ./src/theme/month.ts


function createMonthTheme() {
  var monthTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    month: mergeObject(DEFAULT_MONTH_THEME, monthTheme)
  };
}
;// CONCATENATED MODULE: ./src/theme/week.ts


function createWeekTheme() {
  var weekTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    week: mergeObject(DEFAULT_WEEK_THEME, weekTheme)
  };
}
;// CONCATENATED MODULE: ./src/contexts/themeStore.tsx








function themeStore_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function themeStore_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? themeStore_ownKeys(Object(source), !0).forEach(function (key) { themeStore_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : themeStore_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function themeStore_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var themeStoreCreator = function themeStoreCreator() {
  var themeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (set) {
    return themeStore_objectSpread(themeStore_objectSpread(themeStore_objectSpread(themeStore_objectSpread({}, createCommonTheme(themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.common)), createWeekTheme(themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.week)), createMonthTheme(themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.month)), {}, {
      dispatch: themeStore_objectSpread({}, createThemeDispatch(set))
    });
  };
};

var initThemeStore = function initThemeStore() {
  var themeOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return createStore(themeStoreCreator(themeOptions));
};

var themeStore_createStoreContext = createStoreContext(),
    ThemeProvider = themeStore_createStoreContext.StoreProvider,
    useInternalThemeStore = themeStore_createStoreContext.useInternalStore,
    useTheme = themeStore_createStoreContext.useStore;


function useThemeDispatch() {
  return useTheme(useCallback(function (state) {
    return state.dispatch;
  }, []));
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
  return useTheme(useCallback(function (_ref) {
    var common = _ref.common,
        week = _ref.week,
        month = _ref.month;
    return {
      common: common,
      week: week,
      month: month
    };
  }, []));
}
;// CONCATENATED MODULE: ./src/components/dayGridCommon/gridHeader.tsx


var _excluded = ["backgroundColor", "borderLeft"];


function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







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

  var dayNames = _ref.dayNames,
      _ref$marginLeft = _ref.marginLeft,
      marginLeft = _ref$marginLeft === void 0 ? DEFAULT_DAY_NAME_MARGIN_LEFT : _ref$marginLeft,
      rowStyleInfo = _ref.rowStyleInfo,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'month' : _ref$type;
  var theme = useTheme(type === 'month' ? monthDayNameSelector : weekDayNameSelector);

  var _ref2 = (_theme$type$dayName = (_theme$type = theme[type]) === null || _theme$type === void 0 ? void 0 : _theme$type.dayName) !== null && _theme$type$dayName !== void 0 ? _theme$type$dayName : {},
      _ref2$backgroundColor = _ref2.backgroundColor,
      backgroundColor = _ref2$backgroundColor === void 0 ? 'white' : _ref2$backgroundColor,
      _ref2$borderLeft = _ref2.borderLeft,
      borderLeft = _ref2$borderLeft === void 0 ? null : _ref2$borderLeft,
      rest = _objectWithoutProperties(_ref2, _excluded);

  var _ref3 = rest,
      _ref3$borderTop = _ref3.borderTop,
      borderTop = _ref3$borderTop === void 0 ? null : _ref3$borderTop,
      _ref3$borderBottom = _ref3.borderBottom,
      borderBottom = _ref3$borderBottom === void 0 ? null : _ref3$borderBottom;
  return h("div", {
    "data-testid": "grid-header-".concat(type),
    className: cls('day-names', type),
    style: {
      backgroundColor: backgroundColor,
      borderTop: borderTop,
      borderBottom: borderBottom
    }
  }, h("div", {
    className: cls('day-name-container'),
    style: {
      marginLeft: marginLeft
    }
  }, dayNames.map(function (dayName, index) {
    return h(DayName, {
      type: type,
      key: "dayNames-".concat(dayName.day),
      dayName: dayName,
      style: {
        width: toPercent(rowStyleInfo[index].width),
        left: toPercent(rowStyleInfo[index].left),
        borderLeft: borderLeft
      },
      theme: theme
    });
  })));
}
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.find-index.js
var es_array_find_index = __webpack_require__(9949);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.flat-map.js
var es_array_flat_map = __webpack_require__(4870);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.unscopables.flat-map.js
var es_array_unscopables_flat_map = __webpack_require__(3985);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.string.pad-start.js
var es_string_pad_start = __webpack_require__(5734);
;// CONCATENATED MODULE: ./src/constants/grid.ts
var DEFAULT_VISIBLE_WEEKS = 6;
var CellBarType;

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
  var usingTravelTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var collisionGroups = [];
  var previousEventList;

  if (!events.length) {
    return collisionGroups;
  }

  collisionGroups[0] = [events[0].cid()];
  events.slice(1).forEach(function (event, index) {
    previousEventList = events.slice(0, index + 1).reverse(); // If overlapping previous events, find a Collision Group of overlapping events and add this events

    var found = previousEventList.find(function (previous) {
      return event.collidesWith(previous, usingTravelTime);
    });

    if (!found) {
      // This event is a event that does not overlap with the previous event, so a new Collision Group is constructed.
      collisionGroups.push([event.cid()]);
    } else {
      collisionGroups.slice().reverse().some(function (group) {
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
  var row = matrix.length;

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
  var usingTravelTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var result = [];
  collisionGroups.forEach(function (group) {
    var matrix = [[]];
    group.forEach(function (eventID) {
      var event = collection.get(eventID);
      var col = 0;
      var found = false;
      var nextRow;
      var lastRowInColumn;

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
  return function (model) {
    var ownStarts = model.getStarts();
    var ownEnds = model.getEnds(); // shorthand condition of
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
  var ymdListToRender = makeDateRange(start, end, MS_PER_DAY).map(function (date) {
    return datetime_toFormat(date, 'YYYYMMDD');
  });
  matrices.forEach(function (matrix) {
    matrix.forEach(function (column) {
      column.forEach(function (uiModel, index) {
        if (!uiModel) {
          return;
        }

        var ymd = datetime_toFormat(uiModel.getStarts(), 'YYYYMMDD');
        var dateLength = makeDateRange(toStartOfDay(uiModel.getStarts()), toEndOfDay(uiModel.getEnds()), MS_PER_DAY).length;
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
    uiModelColl.each(function (uiModel) {
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
  var uiModelColl = new Collection(function (uiModel) {
    return uiModel.cid();
  });
  eventCollection.each(function (event) {
    uiModelColl.add(new EventUIModel(event));
  });
  return uiModelColl;
}
;// CONCATENATED MODULE: ./src/controller/month.ts
function month_toConsumableArray(arr) { return month_arrayWithoutHoles(arr) || month_iterableToArray(arr) || month_unsupportedIterableToArray(arr) || month_nonIterableSpread(); }

function month_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function month_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return month_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return month_arrayLikeToArray(o, minLen); }

function month_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function month_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return month_arrayLikeToArray(arr); }

function month_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
























/**
 * Filter function for find allday event
 * @param {EventUIModel} uiModel - ui model
 * @returns {boolean} whether model is allday event?
 */
function _isAllday(_ref) {
  var model = _ref.model;
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
  uiModelColl.each(function (uiModel) {
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
  var topIndexesInDate = [];
  idsOfDay[ymd].forEach(function (cid) {
    uiModelAlldayColl.doWhenHas(cid, function (uiModel) {
      topIndexesInDate.push(uiModel.top);
    });
  });

  if (topIndexesInDate.length > 0) {
    return Math.max.apply(Math, topIndexesInDate);
  }

  return 0;
}
/**
 * Adjust time ui model's top index value
 * @param idsOfDay
 * @param {Collection} uiModelColl - collection of ui ui model
 */


function _adjustTimeTopIndex(idsOfDay, uiModelColl) {
  var vAlldayColl = uiModelColl.filter(_isAllday);
  var sortedTimeEvents = uiModelColl.filter(_isNotAllday).sort(array.compare.event.asc);
  var maxIndexInYMD = {};
  sortedTimeEvents.forEach(function (timeUIModel) {
    var eventYMD = datetime_toFormat(timeUIModel.getStarts(), 'YYYYMMDD');
    var alldayMaxTopInYMD = maxIndexInYMD[eventYMD];

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
  var uiModelAlldayColl = uiModelColl.filter(_isAllday);
  var sortedTimeEvents = uiModelColl.filter(_isNotAllday).sort(array.compare.event.asc);
  var indiceInYMD = {};
  sortedTimeEvents.forEach(function (timeUIModel) {
    var eventYMD = datetime_toFormat(timeUIModel.getStarts(), 'YYYYMMDD');
    var topArrayInYMD = indiceInYMD[eventYMD];

    if (isUndefined_default()(topArrayInYMD)) {
      topArrayInYMD = indiceInYMD[eventYMD] = [];
      idsOfDay[eventYMD].forEach(function (cid) {
        uiModelAlldayColl.doWhenHas(cid, function (uiModel) {
          topArrayInYMD.push(uiModel.top);
        });
      });
    }

    if (topArrayInYMD.indexOf(timeUIModel.top) >= 0) {
      var maxTopInYMD = Math.max.apply(Math, month_toConsumableArray(topArrayInYMD)) + 1;

      for (var i = 1; i <= maxTopInYMD; i += 1) {
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
  uiModelColl.each(function (uiModel) {
    var model = uiModel.model;
    var start = model.getStarts();
    var end = model.getEnds();
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
  var start = condition.start,
      end = condition.end,
      _condition$andFilters = condition.andFilters,
      andFilters = _condition$andFilters === void 0 ? [] : _condition$andFilters,
      _condition$alldayFirs = condition.alldayFirstMode,
      alldayFirstMode = _condition$alldayFirs === void 0 ? false : _condition$alldayFirs;
  var events = calendarData.events,
      idsOfDay = calendarData.idsOfDay;
  var filterFn = Collection.and.apply(Collection, month_toConsumableArray([getEventInDateRangeFilter(start, end)].concat(andFilters)));
  var coll = events.filter(filterFn);
  var uiModelColl = convertToUIModel(coll);

  _addMultiDatesInfo(uiModelColl);

  _adjustRenderRange(start, end, uiModelColl);

  var vList = uiModelColl.sort(array.compare.event.asc);
  var usingTravelTime = false;
  var collisionGroup = getCollisionGroup(vList, usingTravelTime);
  var matrices = getMatrices(uiModelColl, collisionGroup, usingTravelTime);
  positionUIModels(start, end, matrices, _weightTopValue);

  if (alldayFirstMode) {
    _adjustTimeTopIndex(idsOfDay, uiModelColl);
  } else {
    _stackTimeFromTop(idsOfDay, uiModelColl);
  }

  return matrices;
}
;// CONCATENATED MODULE: ./src/controller/week.ts
function week_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function week_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? week_ownKeys(Object(source), !0).forEach(function (key) { week_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : week_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function week_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function week_toConsumableArray(arr) { return week_arrayWithoutHoles(arr) || week_iterableToArray(arr) || week_unsupportedIterableToArray(arr) || week_nonIterableSpread(); }

function week_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function week_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function week_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return week_arrayLikeToArray(arr); }

function week_slicedToArray(arr, i) { return week_arrayWithHoles(arr) || week_iterableToArrayLimit(arr, i) || week_unsupportedIterableToArray(arr, i) || week_nonIterableRest(); }

function week_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function week_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return week_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return week_arrayLikeToArray(o, minLen); }

function week_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function week_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function week_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






























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
  return function (uiModel) {
    var ownHourStart = uiModel.getStarts();
    var ownHourEnd = uiModel.getEnds();
    var ownHourStartTime = ownHourStart.getTime();
    var ownHourEndTime = ownHourEnd.getTime();
    var yyyy = ownHourStart.getFullYear();
    var mm = ownHourStart.getMonth();
    var dd = ownHourStart.getDate();
    var hourStart = new date_TZDate(yyyy, mm, dd).setHours(hStart);
    var hourEnd = new date_TZDate(yyyy, mm, dd).setHours(hEnd);
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
    return function (uiModelColl) {
      return uiModelColl.sort(array.compare.event.asc);
    };
  }

  return function (uiModelColl) {
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
  var result = {};
  var range = getDateRange(start, end);
  range.forEach(function (date) {
    var ymd = datetime_toFormat(date, 'YYYYMMDD');
    var ids = idsOfDay[ymd];
    var collection = result[ymd] = new Collection(function (event) {
      return event.cid();
    });

    if (ids && ids.length) {
      ids.forEach(function (id) {
        uiModelColl.doWhenHas(id, function (event) {
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
  var start = condition.start,
      end = condition.end,
      uiModelTimeColl = condition.uiModelTimeColl,
      hourStart = condition.hourStart,
      hourEnd = condition.hourEnd;
  var ymdSplitted = splitEventByDateRange(idsOfDay, start, end, uiModelTimeColl);
  var result = {};

  var _getUIModel = _makeGetUIModelFuncForTimeView(hourStart, hourEnd);

  var usingTravelTime = true;
  Object.entries(ymdSplitted).forEach(function (_ref) {
    var _ref2 = week_slicedToArray(_ref, 2),
        ymd = _ref2[0],
        uiModelColl = _ref2[1];

    var uiModels = _getUIModel(uiModelColl);

    var collisionGroups = getCollisionGroup(uiModels, usingTravelTime);
    var matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);
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
  uiModelColl.each(function (uiModel) {
    var model = uiModel.model;
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
  var uiModels = uiModelColl.sort(array.compare.event.asc);
  var usingTravelTime = true;
  var collisionGroups = getCollisionGroup(uiModels, usingTravelTime);
  var matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);
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

  var start = condition.start,
      end = condition.end,
      panels = condition.panels,
      _condition$andFilters = condition.andFilters,
      andFilters = _condition$andFilters === void 0 ? [] : _condition$andFilters,
      options = condition.options;
  var events = calendarData.events,
      idsOfDay = calendarData.idsOfDay;
  var hourStart = (_options$hourStart = options === null || options === void 0 ? void 0 : options.hourStart) !== null && _options$hourStart !== void 0 ? _options$hourStart : 0;
  var hourEnd = (_options$hourEnd = options === null || options === void 0 ? void 0 : options.hourEnd) !== null && _options$hourEnd !== void 0 ? _options$hourEnd : 24;
  var filterFn = Collection.and.apply(Collection, week_toConsumableArray([getEventInDateRangeFilter(start, end)].concat(andFilters)));
  var uiModelColl = convertToUIModel(events.filter(filterFn));
  var group = uiModelColl.groupBy(filterByCategory);
  return panels.reduce(function (acc, cur) {
    var name = cur.name,
        type = cur.type;

    if (type_isNil(group[name])) {
      return acc;
    }

    return week_objectSpread(week_objectSpread({}, acc), {}, week_defineProperty({}, name, type === 'daygrid' ? getUIModelForAlldayView(start, end, group[name]) : getUIModelForTimeView(idsOfDay, {
      start: start,
      end: end,
      uiModelTimeColl: group[name],
      hourStart: hourStart,
      hourEnd: hourEnd
    })));
  }, {
    milestone: [],
    task: [],
    allday: [],
    time: {}
  });
}
;// CONCATENATED MODULE: ./src/utils/math.ts















function math_toConsumableArray(arr) { return math_arrayWithoutHoles(arr) || math_iterableToArray(arr) || math_unsupportedIterableToArray(arr) || math_nonIterableSpread(); }

function math_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function math_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return math_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return math_arrayLikeToArray(o, minLen); }

function math_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function math_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return math_arrayLikeToArray(arr); }

function math_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function math_limit(value, minArr, maxArr) {
  var v = Math.max.apply(Math, [value].concat(math_toConsumableArray(minArr)));
  return Math.min.apply(Math, [v].concat(math_toConsumableArray(maxArr)));
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
function grid_slicedToArray(arr, i) { return grid_arrayWithHoles(arr) || grid_iterableToArrayLimit(arr, i) || grid_unsupportedIterableToArray(arr, i) || grid_nonIterableRest(); }

function grid_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function grid_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function grid_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function grid_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function grid_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? grid_ownKeys(Object(source), !0).forEach(function (key) { grid_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : grid_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function grid_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function grid_toConsumableArray(arr) { return grid_arrayWithoutHoles(arr) || grid_iterableToArray(arr) || grid_unsupportedIterableToArray(arr) || grid_nonIterableSpread(); }

function grid_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function grid_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return grid_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return grid_arrayLikeToArray(o, minLen); }

function grid_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function grid_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return grid_arrayLikeToArray(arr); }

function grid_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




































var EVENT_HEIGHT = 22;
var TOTAL_WIDTH = 100;

function forEachMatrix3d(matrices, iteratee) {
  matrices.forEach(function (matrix) {
    matrix.forEach(function (row) {
      row.forEach(function (value, index) {
        iteratee(value, index);
      });
    });
  });
}

function isWithinHeight(containerHeight, eventHeight) {
  return function (_ref) {
    var top = _ref.top;
    return containerHeight >= top * eventHeight;
  };
}
function isExceededHeight(containerHeight, eventHeight) {
  return function (_ref2) {
    var top = _ref2.top;
    return containerHeight < top * eventHeight;
  };
}
function getExceedCount(uiModel, containerHeight, eventHeight) {
  return uiModel.filter(isExceededHeight(containerHeight, eventHeight)).length;
}

var getWeekendCount = function getWeekendCount(row) {
  return row.filter(function (cell) {
    return isWeekend(cell.getDay());
  }).length;
};

function getGridWidthAndLeftPercentValues(row, narrowWeekend, totalWidth) {
  var weekendCount = getWeekendCount(row);
  var gridCellCount = row.length;
  var isAllWeekend = weekendCount === gridCellCount;
  var widthPerDay = totalWidth / (narrowWeekend && !isAllWeekend ? gridCellCount * 2 - weekendCount : gridCellCount);
  var widthList = row.map(function (cell) {
    var day = cell.getDay();

    if (!narrowWeekend || isAllWeekend) {
      return widthPerDay;
    }

    return isWeekend(day) ? widthPerDay : widthPerDay * 2;
  });
  var leftList = widthList.reduce(function (acc, _, index) {
    return index ? [].concat(grid_toConsumableArray(acc), [acc[index - 1] + widthList[index - 1]]) : [0];
  }, []);
  return {
    widthList: widthList,
    leftList: leftList
  };
}
function getWidth(widthList, start, end) {
  return widthList.reduce(function (acc, width, index) {
    if (start <= index && index <= end) {
      return acc + width;
    }

    return acc;
  }, 0);
}
var isInGrid = function isInGrid(gridDate) {
  return function (uiModel) {
    var eventStart = toStartOfDay(uiModel.getStarts());
    var eventEnd = toStartOfDay(uiModel.getEnds());
    return eventStart <= gridDate && gridDate <= eventEnd;
  };
};
function getGridDateIndex(date, row) {
  return row.findIndex(function (cell) {
    return date >= toStartOfDay(cell) && date <= toEndOfDay(cell);
  });
}
var getLeftAndWidth = function getLeftAndWidth(startIndex, endIndex, row, narrowWeekend) {
  var _getGridWidthAndLeftP = getGridWidthAndLeftPercentValues(row, narrowWeekend, TOTAL_WIDTH),
      widthList = _getGridWidthAndLeftP.widthList;

  return {
    left: !startIndex ? 0 : getWidth(widthList, 0, startIndex - 1),
    width: getWidth(widthList, startIndex !== null && startIndex !== void 0 ? startIndex : 0, endIndex < 0 ? row.length - 1 : endIndex)
  };
};
var getEventLeftAndWidth = function getEventLeftAndWidth(start, end, row, narrowWeekend) {
  var _getGridWidthAndLeftP2 = getGridWidthAndLeftPercentValues(row, narrowWeekend, TOTAL_WIDTH),
      widthList = _getGridWidthAndLeftP2.widthList;

  var gridStartIndex = 0;
  var gridEndIndex = row.length - 1;
  row.forEach(function (cell, index) {
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
  var narrowWeekend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var modelStart = uiModel.getStarts();
  var modelEnd = uiModel.getEnds();

  var _getEventLeftAndWidth = getEventLeftAndWidth(modelStart, modelEnd, row, narrowWeekend),
      width = _getEventLeftAndWidth.width,
      left = _getEventLeftAndWidth.left;

  uiModel.width = width;
  uiModel.left = left;
  return uiModel;
}

function getRenderedEventUIModels(row, calendarData, narrowWeekend) {
  var idsOfDay = calendarData.idsOfDay;
  var eventUIModels = month_findByDateRange(calendarData, {
    start: row[0],
    end: toEndOfDay(row[row.length - 1])
  });
  var idEventModelMap = [];
  forEachMatrix3d(eventUIModels, function (uiModel) {
    var cid = uiModel.model.cid();
    idEventModelMap[cid] = getEventUIModelWithPosition(uiModel, row, narrowWeekend);
  });
  var gridDateEventModelMap = Object.keys(idsOfDay).reduce(function (acc, ymd) {
    var ids = idsOfDay[ymd];
    acc[ymd] = ids.map(function (cid) {
      return idEventModelMap[cid];
    }).filter(function (vm) {
      return !!vm;
    });
    return acc;
  }, {});
  return {
    uiModels: Object.values(idEventModelMap),
    gridDateEventModelMap: gridDateEventModelMap
  };
}

var getDayGridEventModels = function getDayGridEventModels(eventModels, row) {
  var narrowWeekend = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  forEachMatrix3d(eventModels, function (uiModel) {
    var modelStart = uiModel.getStarts();
    var modelEnd = uiModel.getEnds();

    var _getEventLeftAndWidth2 = getEventLeftAndWidth(modelStart, modelEnd, row, narrowWeekend),
        width = _getEventLeftAndWidth2.width,
        left = _getEventLeftAndWidth2.left;

    uiModel.width = width;
    uiModel.left = left;
    uiModel.top += 1;
  });
  return flattenMatrix3d(eventModels);
};

var getModels = function getModels(models) {
  return models.filter(function (model) {
    return !!model;
  });
};

function flattenMatrix3d(matrices) {
  return matrices.flatMap(function (matrix) {
    return matrix.flatMap(function (models) {
      return getModels(models);
    });
  });
} // TODO: Check it works well when the `narrowWeekend` option is true


var getTimeGridEventModels = function getTimeGridEventModels(eventMatrix) {
  return (// NOTE: there are same ui models in different rows. so we need to get unique ui models.
    Array.from(new Set(Object.values(eventMatrix).reduce(function (result, matrix3d) {
      return result.concat.apply(result, grid_toConsumableArray(flattenMatrix3d(matrix3d)));
    }, [])))
  );
};

var getWeekViewEvents = function getWeekViewEvents(row, calendarData, _ref3) {
  var narrowWeekend = _ref3.narrowWeekend,
      hourStart = _ref3.hourStart,
      hourEnd = _ref3.hourEnd,
      weekStartDate = _ref3.weekStartDate,
      weekEndDate = _ref3.weekEndDate;
  var panels = [{
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
  var eventModels = week_findByDateRange(calendarData, {
    start: weekStartDate,
    end: weekEndDate,
    panels: panels,
    andFilters: [],
    options: {
      hourStart: hourStart,
      hourEnd: hourEnd
    }
  });
  return Object.keys(eventModels).reduce(function (acc, cur) {
    var events = eventModels[cur];
    return grid_objectSpread(grid_objectSpread({}, acc), {}, grid_defineProperty({}, cur, Array.isArray(events) ? getDayGridEventModels(events, row, narrowWeekend) : getTimeGridEventModels(events)));
  }, {
    milestone: [],
    allday: [],
    task: [],
    time: []
  });
};
function createDateMatrixOfMonth(renderTargetDate, _ref4) {
  var _ref4$workweek = _ref4.workweek,
      workweek = _ref4$workweek === void 0 ? false : _ref4$workweek,
      _ref4$visibleWeeksCou = _ref4.visibleWeeksCount,
      visibleWeeksCount = _ref4$visibleWeeksCou === void 0 ? 0 : _ref4$visibleWeeksCou,
      _ref4$startDayOfWeek = _ref4.startDayOfWeek,
      startDayOfWeek = _ref4$startDayOfWeek === void 0 ? 0 : _ref4$startDayOfWeek,
      _ref4$isAlways6Weeks = _ref4.isAlways6Weeks,
      isAlways6Weeks = _ref4$isAlways6Weeks === void 0 ? true : _ref4$isAlways6Weeks;
  var targetDate = new date_TZDate(renderTargetDate);
  var shouldApplyVisibleWeeksCount = visibleWeeksCount > 0;
  var baseDate = shouldApplyVisibleWeeksCount ? targetDate : toStartOfMonth(targetDate);
  var firstDateOfMatrix = subtractDate(baseDate, baseDate.getDay() - startDayOfWeek + (baseDate.getDay() < startDayOfWeek ? WEEK_DAYS : 0));
  var dayOfFirstDateOfMatrix = firstDateOfMatrix.getDay();
  var totalDatesCountOfMonth = toEndOfMonth(targetDate).getDate();
  var initialDifference = getDateDifference(firstDateOfMatrix, baseDate);
  var totalDatesOfMatrix = totalDatesCountOfMonth + Math.abs(initialDifference);
  var totalWeeksOfMatrix = DEFAULT_VISIBLE_WEEKS;

  if (shouldApplyVisibleWeeksCount) {
    totalWeeksOfMatrix = visibleWeeksCount;
  } else if (isAlways6Weeks === false) {
    totalWeeksOfMatrix = Math.ceil(totalDatesOfMatrix / WEEK_DAYS);
  }

  return range_default()(0, totalWeeksOfMatrix).map(function (weekIndex) {
    return range_default()(0, WEEK_DAYS).reduce(function (weekRow, dayOfWeek) {
      var steps = weekIndex * WEEK_DAYS + dayOfWeek;
      var currentDay = (steps + dayOfFirstDateOfMatrix) % WEEK_DAYS;

      if (!workweek || workweek && !isWeekend(currentDay)) {
        var date = addDate(firstDateOfMatrix, steps);
        weekRow.push(date);
      }

      return weekRow;
    }, []);
  });
}
function getWeekDates(renderDate, _ref5) {
  var _ref5$startDayOfWeek = _ref5.startDayOfWeek,
      startDayOfWeek = _ref5$startDayOfWeek === void 0 ? Day.SUN : _ref5$startDayOfWeek,
      workweek = _ref5.workweek;
  var now = toStartOfDay(renderDate);
  var nowDay = now.getDay();
  var prevDateCount = nowDay - startDayOfWeek;
  var weekDayList = prevDateCount >= 0 ? range_default()(-prevDateCount, WEEK_DAYS - prevDateCount) : range_default()(-WEEK_DAYS - prevDateCount, -prevDateCount);
  return weekDayList.reduce(function (acc, day) {
    var date = addDate(now, day);

    if (workweek && isWeekend(date.getDay())) {
      return acc;
    }

    acc.push(date);
    return acc;
  }, []);
} // @TODO: replace `getRowStyleInfo` to this function

function getColumnsData(datesOfWeek) {
  var narrowWeekend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var datesCount = datesOfWeek.length;
  var shouldApplyNarrowWeekend = datesCount > 5 && narrowWeekend;
  var defaultWidthByColumns = shouldApplyNarrowWeekend ? 100 / (datesCount - 1) : 100 / datesCount;
  return datesOfWeek.map(function (date) {
    var width = shouldApplyNarrowWeekend && isWeekend(date.getDay()) ? defaultWidthByColumns / 2 : defaultWidthByColumns;
    return {
      date: date,
      width: width
    };
  }).reduce(function (result, currentDateAndWidth, index) {
    var prev = result[index - 1];
    result.push(grid_objectSpread(grid_objectSpread({}, currentDateAndWidth), {}, {
      left: index === 0 ? 0 : prev.left + prev.width
    }));
    return result;
  }, []);
}
function createTimeGridData(datesOfWeek, options) {
  var _options$narrowWeeken;

  var columns = getColumnsData(datesOfWeek, (_options$narrowWeeken = options.narrowWeekend) !== null && _options$narrowWeeken !== void 0 ? _options$narrowWeeken : false);
  var steps = (options.hourEnd - options.hourStart) * 2;
  var baseHeight = 100 / steps;
  var rows = range_default()(steps).map(function (step, index) {
    var isOdd = index % 2 === 1;
    var hour = options.hourStart + Math.floor(step / 2);
    var startTime = "".concat(hour, ":").concat(isOdd ? '30' : '00').padStart(5, '0');
    var endTime = (isOdd ? "".concat(hour + 1, ":00") : "".concat(hour, ":30")).padStart(5, '0');
    return {
      top: baseHeight * index,
      height: baseHeight,
      startTime: startTime,
      endTime: endTime
    };
  });
  return {
    columns: columns,
    rows: rows
  };
}

function getRelativeMousePosition(_ref6, _ref7) {
  var clientX = _ref6.clientX,
      clientY = _ref6.clientY;
  var left = _ref7.left,
      top = _ref7.top,
      clientLeft = _ref7.clientLeft,
      clientTop = _ref7.clientTop;
  return [clientX - left - clientLeft, clientY - top - clientTop];
}

function getIndexFromPosition(arrayLength, maxRange, currentPosition) {
  var calculatedIndex = Math.floor(ratio(maxRange, arrayLength, currentPosition));
  return math_limit(calculatedIndex, [0], [arrayLength - 1]);
}

function createGridPositionFinder(_ref8) {
  var rowsCount = _ref8.rowsCount,
      columnsCount = _ref8.columnsCount,
      container = _ref8.container,
      _ref8$narrowWeekend = _ref8.narrowWeekend,
      narrowWeekend = _ref8$narrowWeekend === void 0 ? false : _ref8$narrowWeekend,
      _ref8$startDayOfWeek = _ref8.startDayOfWeek,
      startDayOfWeek = _ref8$startDayOfWeek === void 0 ? Day.SUN : _ref8$startDayOfWeek;

  if (type_isNil(container)) {
    return function () {
      return null;
    };
  }

  var dayRange = range_default()(startDayOfWeek, startDayOfWeek + columnsCount).map(function (day) {
    return day % WEEK_DAYS;
  });
  var narrowColumnCount = narrowWeekend ? dayRange.filter(function (day) {
    return isWeekend(day);
  }).length : 0;
  return function gridPositionFinder(mousePosition) {
    var _container$getBoundin = container.getBoundingClientRect(),
        containerLeft = _container$getBoundin.left,
        containerTop = _container$getBoundin.top,
        containerWidth = _container$getBoundin.width,
        containerHeight = _container$getBoundin.height;

    var _getRelativeMousePosi = getRelativeMousePosition(mousePosition, {
      left: containerLeft,
      top: containerTop,
      clientLeft: container.clientLeft,
      clientTop: container.clientTop
    }),
        _getRelativeMousePosi2 = grid_slicedToArray(_getRelativeMousePosi, 2),
        left = _getRelativeMousePosi2[0],
        top = _getRelativeMousePosi2[1];

    if (left < 0 || top < 0 || left > containerWidth || top > containerHeight) {
      return null;
    }

    var unitWidth = narrowWeekend ? containerWidth / (columnsCount - narrowColumnCount + 1) : containerWidth / columnsCount;
    var columnWidthList = dayRange.map(function (dayOfWeek) {
      return narrowWeekend && isWeekend(dayOfWeek) ? unitWidth / 2 : unitWidth;
    });
    var columnLeftList = [];
    columnWidthList.forEach(function (width, index) {
      if (index === 0) {
        columnLeftList.push(0);
      } else {
        columnLeftList.push(columnLeftList[index - 1] + columnWidthList[index - 1]);
      }
    });
    var columnIndex = findLastIndex(columnLeftList, function (columnLeft) {
      return left >= columnLeft;
    });
    return {
      columnIndex: columnIndex,
      rowIndex: getIndexFromPosition(rowsCount, containerHeight, top)
    };
  };
}
;// CONCATENATED MODULE: ./src/components/dayGridCommon/gridSelection.tsx





function commonGridSelectionSelector(theme) {
  return theme.common.gridSelection;
}

function GridSelection(_ref) {
  var type = _ref.type,
      gridSelectionData = _ref.gridSelectionData,
      weekDates = _ref.weekDates,
      narrowWeekend = _ref.narrowWeekend;

  var _useTheme = useTheme(commonGridSelectionSelector),
      backgroundColor = _useTheme.backgroundColor,
      border = _useTheme.border;

  var startCellIndex = gridSelectionData.startCellIndex,
      endCellIndex = gridSelectionData.endCellIndex;

  var _getLeftAndWidth = getLeftAndWidth(Math.min(startCellIndex, endCellIndex), Math.max(startCellIndex, endCellIndex), weekDates, narrowWeekend),
      left = _getLeftAndWidth.left,
      width = _getLeftAndWidth.width;

  var style = {
    left: toPercent(left),
    width: toPercent(width),
    height: toPercent(100),
    backgroundColor: backgroundColor,
    border: border
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

  var startColumnIndex = timeGridSelection.startColumnIndex,
      endColumnIndex = timeGridSelection.endColumnIndex,
      endRowIndex = timeGridSelection.endRowIndex,
      startRowIndex = timeGridSelection.startRowIndex;

  if (!isBetween(columnIndex, startColumnIndex, endColumnIndex)) {
    return null;
  }

  var hasMultipleColumns = startColumnIndex !== endColumnIndex;
  var isStartingColumn = columnIndex === startColumnIndex;
  var resultGridSelection = {
    startRowIndex: startRowIndex,
    endRowIndex: endRowIndex,
    isSelectingMultipleColumns: hasMultipleColumns,
    isStartingColumn: isStartingColumn
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

var timeGridSelectionHelper = {
  sortSelection: function sortSelection(initPos, currentPos) {
    var isReversed = initPos.columnIndex > currentPos.columnIndex || initPos.columnIndex === currentPos.columnIndex && initPos.rowIndex > currentPos.rowIndex;
    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  getDateFromCollection: function getDateFromCollection(dateCollection, gridSelection) {
    var timeGridData = dateCollection;
    var startDate = setTimeStrToDate(timeGridData.columns[gridSelection.startColumnIndex].date, timeGridData.rows[gridSelection.startRowIndex].startTime);
    var endDate = setTimeStrToDate(timeGridData.columns[gridSelection.endColumnIndex].date, timeGridData.rows[gridSelection.endRowIndex].endTime);
    return [startDate, endDate];
  },
  calculateSelection: calculateTimeGridSelectionByCurrentIndex
};

function calculateDayGridMonthSelectionByCurrentIndex(gridSelection, currentIndex, weekLength) {
  if (!(isPresent(gridSelection) && isPresent(currentIndex) && isPresent(weekLength))) {
    return null;
  }

  var startRowIndex = gridSelection.startRowIndex,
      startColumnIndex = gridSelection.startColumnIndex,
      endRowIndex = gridSelection.endRowIndex,
      endColumnIndex = gridSelection.endColumnIndex;

  if (!isBetween(currentIndex, Math.min(startRowIndex, endRowIndex), Math.max(startRowIndex, endRowIndex))) {
    return null;
  }

  var startCellIndex = startColumnIndex;
  var endCellIndex = endColumnIndex;

  if (startRowIndex < currentIndex) {
    startCellIndex = 0;
  }

  if (endRowIndex > currentIndex) {
    endCellIndex = weekLength - 1;
  }

  return {
    startCellIndex: startCellIndex,
    endCellIndex: endCellIndex
  };
}

var dayGridMonthSelectionHelper = {
  sortSelection: function sortSelection(initPos, currentPos) {
    var isReversed = initPos.rowIndex > currentPos.rowIndex || initPos.rowIndex === currentPos.rowIndex && initPos.columnIndex > currentPos.columnIndex;
    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  getDateFromCollection: function getDateFromCollection(dateCollection, gridSelection) {
    var dateMatrix = dateCollection;
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

var alldayGridRowSelectionHelper = {
  sortSelection: function sortSelection(initPos, currentPos) {
    var isReversed = initPos.columnIndex > currentPos.columnIndex;
    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  getDateFromCollection: function getDateFromCollection(dateCollection, gridSelection) {
    var weekDates = dateCollection;
    return [weekDates[gridSelection.startColumnIndex], weekDates[gridSelection.endColumnIndex]];
  },
  calculateSelection: calculateAlldayGridRowSelectionByCurrentIndex
};
;// CONCATENATED MODULE: ./src/components/dayGridWeek/alldayGridSelection.tsx






function dayGridWeekSelectionSelector(state) {
  return alldayGridRowSelectionHelper.calculateSelection(state.gridSelection.dayGridWeek);
}

function AlldayGridSelection(_ref) {
  var weekDates = _ref.weekDates,
      narrowWeekend = _ref.narrowWeekend;
  var calculatedGridSelection = useStore(dayGridWeekSelectionSelector);

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
function compat_module_S(n,t){for(var e in t)n[e]=t[e];return n}function compat_module_C(n,t){for(var e in n)if("__source"!==e&&!(e in t))return!0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return!0;return!1}function E(n){this.props=n}function compat_module_g(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return!r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:compat_module_C(this.props,n)}function r(t){return this.shouldComponentUpdate=e,h(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(E.prototype=new d).isPureReactComponent=!0,E.prototype.shouldComponentUpdate=function(n,t){return compat_module_C(this.props,n)||compat_module_C(this.state,t)};var compat_module_w=preact_module_l.__b;preact_module_l.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),compat_module_w&&compat_module_w(n)};var compat_module_x="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function R(n){function t(t){var e=compat_module_S({},t);return delete e.ref,n(e,t.ref||null)}return t.$$typeof=compat_module_x,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var compat_module_N=function(n,t){return null==n?null:x(x(n).map(t))},compat_module_k={map:compat_module_N,forEach:compat_module_N,count:function(n){return n?x(n).length:0},only:function(n){var t=x(n);if(1!==t.length)throw"Children.only";return t[0]},toArray:x},compat_module_A=preact_module_l.__e;preact_module_l.__e=function(n,t,e,r){if(n.then)for(var u,o=t;o=o.__;)if((u=o.__c)&&u.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),u.__c(n,t);compat_module_A(n,t,e,r)};var compat_module_O=preact_module_l.unmount;function compat_module_T(){this.__u=0,this.t=null,this.__b=null}function compat_module_L(n){var t=n.__.__c;return t&&t.__a&&t.__a(n)}function U(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n},function(n){r=n}),r)throw r;if(!e)throw t;return h(e,u)}return u.displayName="Lazy",u.__f=!0,u}function D(){this.u=null,this.o=null}preact_module_l.unmount=function(n){var t=n.__c;t&&t.__R&&t.__R(),t&&!0===n.__h&&(n.type=null),compat_module_O&&compat_module_O(n)},(compat_module_T.prototype=new d).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=compat_module_L(r.__v),o=!1,i=function(){o||(o=!0,e.__R=null,u?u(l):l())};e.__R=i;var l=function(){if(!--r.__u){if(r.state.__a){var n=r.state.__a;r.__v.__k[0]=function n(t,e,r){return t&&(t.__v=null,t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)}),t.__c&&t.__c.__P===e&&(t.__e&&r.insertBefore(t.__e,t.__d),t.__c.__e=!0,t.__c.__P=r)),t}(n,n.__c.__P,n.__c.__O)}var t;for(r.setState({__a:r.__b=null});t=r.t.pop();)t.forceUpdate()}},f=!0===t.__h;r.__u++||f||r.setState({__a:r.__b=r.__v.__k[0]}),n.then(i,i)},compat_module_T.prototype.componentWillUnmount=function(){this.t=[]},compat_module_T.prototype.render=function(n,t){if(this.__b){if(this.__v.__k){var e=document.createElement("div"),r=this.__v.__k[0].__c;this.__v.__k[0]=function n(t,e,r){return t&&(t.__c&&t.__c.__H&&(t.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c()}),t.__c.__H=null),null!=(t=compat_module_S({},t)).__c&&(t.__c.__P===r&&(t.__c.__P=e),t.__c=null),t.__k=t.__k&&t.__k.map(function(t){return n(t,e,r)})),t}(this.__b,e,r.__O=r.__P)}this.__b=null}var u=t.__a&&h(p,null,n.fallback);return u&&(u.__h=null),[h(p,null,t.__a?null:n.children),u]};var compat_module_F=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2]}};function compat_module_I(n){return this.getChildContext=function(){return n.context},n.children}function compat_module_M(n){var t=this,e=n.i;t.componentWillUnmount=function(){P(null,t.l),t.l=null,t.i=null},t.i&&t.i!==e&&t.componentWillUnmount(),n.__v?(t.l||(t.i=e,t.l={nodeType:1,parentNode:e,childNodes:[],appendChild:function(n){this.childNodes.push(n),t.i.appendChild(n)},insertBefore:function(n,e){this.childNodes.push(n),t.i.appendChild(n)},removeChild:function(n){this.childNodes.splice(this.childNodes.indexOf(n)>>>1,1),t.i.removeChild(n)}}),P(h(compat_module_I,{context:t.context},n.__v),t.l)):t.l&&t.componentWillUnmount()}function compat_module_V(n,t){var e=h(compat_module_M,{__v:n,i:t});return e.containerInfo=t,e}(D.prototype=new d).__a=function(n){var t=this,e=compat_module_L(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),compat_module_F(t,n,r)):u()};e?e(o):o()}},D.prototype.render=function(n){this.u=null,this.o=new Map;var t=x(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},D.prototype.componentDidUpdate=D.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){compat_module_F(n,e,t)})};var W="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,compat_module_P=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|shape|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,compat_module_$="undefined"!=typeof document,compat_module_j=function(n){return("undefined"!=typeof Symbol&&"symbol"==typeof Symbol()?/fil|che|rad/i:/fil|che|ra/i).test(n)};function compat_module_z(n,t,e){return null==t.__k&&(t.textContent=""),P(n,t),"function"==typeof e&&e(),n?n.__c:null}function compat_module_B(n,t,e){return S(n,t),"function"==typeof e&&e(),n?n.__c:null}d.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(d.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t})}})});var compat_module_H=preact_module_l.event;function Z(){}function Y(){return this.cancelBubble}function compat_module_q(){return this.defaultPrevented}preact_module_l.event=function(n){return compat_module_H&&(n=compat_module_H(n)),n.persist=Z,n.isPropagationStopped=Y,n.isDefaultPrevented=compat_module_q,n.nativeEvent=n};var G,J={configurable:!0,get:function(){return this.class}},K=preact_module_l.vnode;preact_module_l.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){var u=-1===t.indexOf("-");for(var o in r={},e){var i=e[o];compat_module_$&&"children"===o&&"noscript"===t||"value"===o&&"defaultValue"in e&&null==i||("defaultValue"===o&&"value"in e&&null==e.value?o="value":"download"===o&&!0===i?i="":/ondoubleclick/i.test(o)?o="ondblclick":/^onchange(textarea|input)/i.test(o+t)&&!compat_module_j(e.type)?o="oninput":/^onfocus$/i.test(o)?o="onfocusin":/^onblur$/i.test(o)?o="onfocusout":/^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o)?o=o.toLowerCase():u&&compat_module_P.test(o)?o=o.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===i&&(i=void 0),/^oninput$/i.test(o)&&(o=o.toLowerCase(),r[o]&&(o="oninputCapture")),r[o]=i)}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=x(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value)})),"select"==t&&null!=r.defaultValue&&(r.value=x(e.children).forEach(function(n){n.props.selected=r.multiple?-1!=r.defaultValue.indexOf(n.props.value):r.defaultValue==n.props.value})),n.props=r,e.class!=e.className&&(J.enumerable="className"in e,null!=e.className&&(r.class=e.className),Object.defineProperty(r,"className",J))}n.$$typeof=W,K&&K(n)};var Q=preact_module_l.__r;preact_module_l.__r=function(n){Q&&Q(n),G=n.__c};var X={ReactCurrentDispatcher:{current:{readContext:function(n){return G.__n[n.__c].props.value}}}},nn="17.0.2";function tn(n){return h.bind(null,n)}function en(n){return!!n&&n.$$typeof===W}function rn(n){return en(n)?q.apply(null,arguments):n}function un(n){return!!n.__k&&(P(null,n),!0)}function on(n){return n&&(n.base||1===n.nodeType&&n)||null}var ln=function(n,t){return n(t)},fn=function(n,t){return n(t)},cn=p;function an(n){n()}function sn(n){return n}function hn(){return[!1,an]}var vn=hooks_module_h;function dn(t,r){var u=hooks_module_y(r),o=u[0],i=u[1];return hooks_module_(function(){return t(function(){i(r())})},[t,r]),o}/* harmony default export */ var compat_module = ({useState:hooks_module_y,useReducer:hooks_module_d,useEffect:hooks_module_,useLayoutEffect:hooks_module_h,useInsertionEffect:hooks_module_h,useTransition:hn,useDeferredValue:sn,useSyncExternalStore:dn,startTransition:an,useRef:hooks_module_s,useImperativeHandle:hooks_module_A,useMemo:F,useCallback:hooks_module_T,useContext:hooks_module_q,useDebugValue:hooks_module_x,version:"17.0.2",Children:compat_module_k,render:compat_module_z,hydrate:compat_module_B,unmountComponentAtNode:un,createPortal:compat_module_V,createElement:h,createContext:B,createFactory:tn,cloneElement:rn,createRef:y,Fragment:p,isValidElement:en,findDOMNode:on,Component:d,PureComponent:E,memo:compat_module_g,forwardRef:R,flushSync:fn,unstable_batchedUpdates:ln,StrictMode:p,Suspense:compat_module_T,SuspenseList:D,lazy:U,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:X});
//# sourceMappingURL=compat.module.js.map

;// CONCATENATED MODULE: ./src/components/dayGridWeek/gridCell.tsx






function ExceedCount(_ref) {
  var index = _ref.index,
      exceedCount = _ref.exceedCount,
      isClicked = _ref.isClicked,
      onClickExceedCount = _ref.onClickExceedCount;

  var clickExceedCount = function clickExceedCount() {
    return onClickExceedCount(index);
  };

  var style = {
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
  var isClicked = _ref2.isClicked,
      isClickedIndex = _ref2.isClickedIndex,
      onClickCollapseButton = _ref2.onClickCollapseButton;
  return isClicked && isClickedIndex ? h("span", {
    className: cls('weekday-exceed-in-week'),
    onClick: onClickCollapseButton
  }, h(Template, {
    template: "collapseBtnTitle"
  })) : null;
}

function GridCell(_ref3) {
  var width = _ref3.width,
      left = _ref3.left,
      index = _ref3.index,
      exceedCount = _ref3.exceedCount,
      isClicked = _ref3.isClicked,
      onClickExceedCount = _ref3.onClickExceedCount,
      isClickedIndex = _ref3.isClickedIndex,
      onClickCollapseButton = _ref3.onClickCollapseButton,
      isLastCell = _ref3.isLastCell;

  var _useTheme = useTheme(hooks_module_T(function (theme) {
    return theme.week.dayGrid;
  }, [])),
      borderRight = _useTheme.borderRight,
      backgroundColor = _useTheme.backgroundColor;

  var style = {
    width: width,
    left: left,
    borderRight: isLastCell ? 'none' : borderRight,
    backgroundColor: backgroundColor
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








var GridCells = compat_module_g(function GridCells(_ref) {
  var uiModels = _ref.uiModels,
      weekDates = _ref.weekDates,
      narrowWeekend = _ref.narrowWeekend,
      height = _ref.height,
      clickedIndex = _ref.clickedIndex,
      isClickedCount = _ref.isClickedCount,
      onClickExceedCount = _ref.onClickExceedCount,
      onClickCollapseButton = _ref.onClickCollapseButton;
  // @TODO: get margin value dynamically
  var eventTopMargin = 2;

  var _getGridWidthAndLeftP = getGridWidthAndLeftPercentValues(weekDates, narrowWeekend, TOTAL_WIDTH),
      widthList = _getGridWidthAndLeftP.widthList,
      leftList = _getGridWidthAndLeftP.leftList;

  var lastCellIndex = weekDates.length - 1;
  return h(p, null, weekDates.map(function (cell, index) {
    var width = toPercent(widthList[index]);
    var left = toPercent(leftList[index]);
    var uiModelsInCell = uiModels.filter(isInGrid(cell));
    var exceedCount = getExceedCount(uiModelsInCell, height, EVENT_HEIGHT + eventTopMargin);
    var isClickedIndex = index === clickedIndex;
    var isLastCell = index === lastCellIndex;
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
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.flat.js
var es_array_flat = __webpack_require__(7072);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.unscopables.flat.js
var es_array_unscopables_flat = __webpack_require__(7694);
;// CONCATENATED MODULE: ./src/components/events/horizontalEventResizeIcon.tsx



function HorizontalEventResizeIcon(_ref) {
  var onMouseDown = _ref.onMouseDown;
  return h("span", {
    className: "".concat(cls('weekday-resize-handle'), " ").concat(cls('handle-y')),
    onMouseDown: onMouseDown,
    "data-testid": "horizontal-event-resize-icon"
  }, h("i", {
    className: "".concat(cls('icon'), " ").concat(cls('ic-handle-y'))
  }));
}
;// CONCATENATED MODULE: ./src/contexts/layoutContainer.tsx




var LayoutContainerContext = B(null);
var LayoutContainerProvider = LayoutContainerContext.Provider;
var useLayoutContainer = function useLayoutContainer() {
  var ref = hooks_module_q(LayoutContainerContext);

  if (isUndefined_default()(ref)) {
    throw new Error('LayoutContainerProvider is not found');
  }

  return ref;
};
;// CONCATENATED MODULE: ./src/helpers/drag.ts

var DRAGGING_TYPE_CONSTANTS = {
  panelResizer: 'panelResizer'
};
var DRAGGING_TYPE_CREATORS = {
  resizeEvent: function resizeEvent(area, id) {
    return "event/".concat(area, "/resize/").concat(id);
  },
  moveEvent: function moveEvent(area, id) {
    return "event/".concat(area, "/move/").concat(id);
  },
  gridSelection: function gridSelection(type) {
    return "gridSelection/".concat(type);
  }
};
;// CONCATENATED MODULE: ./src/hooks/calendar/useCalendarById.ts




function useCalendarById(calendarId) {
  return useStore(hooks_module_T(function (state) {
    return state.calendar.calendars.find(function (cal) {
      return cal.id === calendarId;
    });
  }, [calendarId]));
}
;// CONCATENATED MODULE: ./src/hooks/calendar/useCalendarColor.ts


function useCalendarColor(model) {
  var _model$calendarId;

  var calendar = useCalendarById((_model$calendarId = model === null || model === void 0 ? void 0 : model.calendarId) !== null && _model$calendarId !== void 0 ? _model$calendarId : null);
  return F(function () {
    return {
      color: calendar === null || calendar === void 0 ? void 0 : calendar.color,
      borderColor: calendar === null || calendar === void 0 ? void 0 : calendar.borderColor,
      backgroundColor: calendar === null || calendar === void 0 ? void 0 : calendar.backgroundColor,
      dragBackgroundColor: calendar === null || calendar === void 0 ? void 0 : calendar.dragBackgroundColor
    };
  }, [calendar]);
}
;// CONCATENATED MODULE: ./src/constants/keyboard.ts
function keyboard_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY;

(function (KEY) {
  KEY["ESCAPE"] = "Escape";
})(KEY || (KEY = {}));

var KEYCODE = keyboard_defineProperty({}, KEY.ESCAPE, 27);
;// CONCATENATED MODULE: ./src/constants/mouse.ts
var MINIMUM_DRAG_MOUSE_DISTANCE = 3;
;// CONCATENATED MODULE: ./src/hooks/common/useTransientUpdate.ts


// Transient Updates for better performance
// Reference: https://github.com/pmndrs/zustand#transient-updates-for-often-occuring-state-changes
function useTransientUpdate(selector, subscriber) {
  var store = useInternalStore();
  var selectorRef = hooks_module_s(selector);
  var subscriberRef = hooks_module_s(subscriber);
  hooks_module_(function () {
    selectorRef.current = selector;
    subscriberRef.current = subscriber;
  }, [selector, subscriber]);
  hooks_module_(function () {
    return store.subscribe(function (slice) {
      return subscriberRef.current(slice);
    }, function (state) {
      return selectorRef.current(state);
    });
  }, [selector, store]);
}
;// CONCATENATED MODULE: ./src/utils/keyboard.ts

function isKeyPressed(e, key) {
  return e.key ? e.key === key : e.keyCode === KEYCODE[key];
}
;// CONCATENATED MODULE: ./src/hooks/common/useDrag.ts














function useDrag_slicedToArray(arr, i) { return useDrag_arrayWithHoles(arr) || useDrag_iterableToArrayLimit(arr, i) || useDrag_unsupportedIterableToArray(arr, i) || useDrag_nonIterableRest(); }

function useDrag_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useDrag_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useDrag_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useDrag_arrayLikeToArray(o, minLen); }

function useDrag_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useDrag_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useDrag_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












function isLeftClick(buttonNum) {
  return buttonNum === 0;
}

function isMouseMoved(initX, initY, x, y) {
  return Math.abs(initX - x) >= MINIMUM_DRAG_MOUSE_DISTANCE || Math.abs(initY - y) >= MINIMUM_DRAG_MOUSE_DISTANCE;
}

function useDrag(draggingItemType) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      onInit = _ref.onInit,
      onDragStart = _ref.onDragStart,
      onDrag = _ref.onDrag,
      onMouseUp = _ref.onMouseUp,
      onPressESCKey = _ref.onPressESCKey;

  var _useDispatch = useDispatch('dnd'),
      initDrag = _useDispatch.initDrag,
      setDragging = _useDispatch.setDragging,
      cancelDrag = _useDispatch.cancelDrag,
      reset = _useDispatch.reset;

  var store = useInternalStore();
  var dndSliceRef = hooks_module_s(store.getState().dnd);
  useTransientUpdate(dndSelector, function (dndState) {
    dndSliceRef.current = dndState;
  });

  var _useState = hooks_module_y(false),
      _useState2 = useDrag_slicedToArray(_useState, 2),
      isStarted = _useState2[0],
      setStarted = _useState2[1];

  var handleMouseMoveRef = hooks_module_s(null);
  var handleMouseUpRef = hooks_module_s(null);
  var handleKeyDownRef = hooks_module_s(null);
  var handleMouseDown = hooks_module_T(function (e) {
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
      draggingItemType: draggingItemType,
      initX: e.clientX,
      initY: e.clientY
    });
    onInit === null || onInit === void 0 ? void 0 : onInit(e, dndSliceRef.current);
  }, [onInit, draggingItemType, initDrag]);
  var handleMouseMove = hooks_module_T(function (e) {
    var _dndSliceRef$current = dndSliceRef.current,
        initX = _dndSliceRef$current.initX,
        initY = _dndSliceRef$current.initY,
        draggingState = _dndSliceRef$current.draggingState,
        currentDraggingItemType = _dndSliceRef$current.draggingItemType;

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
  var handleMouseUp = hooks_module_T(function (e) {
    e.stopPropagation();

    if (isStarted) {
      onMouseUp === null || onMouseUp === void 0 ? void 0 : onMouseUp(e, dndSliceRef.current);
      setStarted(false);
      reset();
    }
  }, [isStarted, onMouseUp, reset]);
  var handleKeyDown = hooks_module_T(function (e) {
    if (isKeyPressed(e, KEY.ESCAPE)) {
      setStarted(false);
      cancelDrag();
      onPressESCKey === null || onPressESCKey === void 0 ? void 0 : onPressESCKey(e, dndSliceRef.current);
    }
  }, [onPressESCKey, cancelDrag]);
  hooks_module_(function () {
    handleMouseMoveRef.current = handleMouseMove;
    handleMouseUpRef.current = handleMouseUp;
    handleKeyDownRef.current = handleKeyDown;
  }, [handleKeyDown, handleMouseMove, handleMouseUp]);
  hooks_module_(function () {
    var wrappedHandleMouseMove = function wrappedHandleMouseMove(e) {
      var _handleMouseMoveRef$c;

      return (_handleMouseMoveRef$c = handleMouseMoveRef.current) === null || _handleMouseMoveRef$c === void 0 ? void 0 : _handleMouseMoveRef$c.call(handleMouseMoveRef, e);
    };

    var wrappedHandleMouseUp = function wrappedHandleMouseUp(e) {
      var _handleMouseUpRef$cur;

      return (_handleMouseUpRef$cur = handleMouseUpRef.current) === null || _handleMouseUpRef$cur === void 0 ? void 0 : _handleMouseUpRef$cur.call(handleMouseUpRef, e);
    };

    var wrappedHandleKeyDown = function wrappedHandleKeyDown(e) {
      var _handleKeyDownRef$cur;

      return (_handleKeyDownRef$cur = handleKeyDownRef.current) === null || _handleKeyDownRef$cur === void 0 ? void 0 : _handleKeyDownRef$cur.call(handleKeyDownRef, e);
    };

    if (isStarted) {
      document.addEventListener('mousemove', wrappedHandleMouseMove);
      document.addEventListener('mouseup', wrappedHandleMouseUp);
      document.addEventListener('keydown', wrappedHandleKeyDown);
      return function () {
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
function horizontalEvent_slicedToArray(arr, i) { return horizontalEvent_arrayWithHoles(arr) || horizontalEvent_iterableToArrayLimit(arr, i) || horizontalEvent_unsupportedIterableToArray(arr, i) || horizontalEvent_nonIterableRest(); }

function horizontalEvent_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function horizontalEvent_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return horizontalEvent_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return horizontalEvent_arrayLikeToArray(o, minLen); }

function horizontalEvent_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function horizontalEvent_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function horizontalEvent_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function horizontalEvent_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function horizontalEvent_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? horizontalEvent_ownKeys(Object(source), !0).forEach(function (key) { horizontalEvent_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : horizontalEvent_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function horizontalEvent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









































function getMargins(flat) {
  return {
    vertical: flat ? 5 : 2,
    horizontal: 8
  };
}

function getBorderRadius(exceedLeft, exceedRight) {
  var leftBorderRadius = exceedLeft ? 0 : '2px';
  var rightBorderRadius = exceedRight ? 0 : '2px';
  return "".concat(leftBorderRadius, " ").concat(rightBorderRadius, " ").concat(rightBorderRadius, " ").concat(leftBorderRadius);
}

function getEventItemStyle(_ref) {
  var uiModel = _ref.uiModel,
      flat = _ref.flat,
      eventHeight = _ref.eventHeight,
      isDraggingTarget = _ref.isDraggingTarget,
      calendarColor = _ref.calendarColor;
  var exceedLeft = uiModel.exceedLeft,
      exceedRight = uiModel.exceedRight;

  var _getEventColors = getEventColors(uiModel, calendarColor),
      color = _getEventColors.color,
      backgroundColor = _getEventColors.backgroundColor,
      dragBackgroundColor = _getEventColors.dragBackgroundColor,
      borderColor = _getEventColors.borderColor;

  var defaultItemStyle = {
    color: color,
    backgroundColor: isDraggingTarget ? dragBackgroundColor : backgroundColor,
    borderLeft: exceedLeft ? 'none' : "3px solid ".concat(borderColor),
    borderRadius: getBorderRadius(exceedLeft, exceedRight),
    overflow: 'hidden',
    height: eventHeight,
    lineHeight: toPx(eventHeight),
    opacity: isDraggingTarget ? 0.5 : 1
  };
  var margins = getMargins(flat);
  return flat ? horizontalEvent_objectSpread({
    marginTop: margins.vertical
  }, defaultItemStyle) : horizontalEvent_objectSpread({
    marginLeft: exceedLeft ? 0 : margins.horizontal,
    marginRight: exceedRight ? 0 : margins.horizontal
  }, defaultItemStyle);
}

function getContainerStyle(_ref2) {
  var flat = _ref2.flat,
      uiModel = _ref2.uiModel,
      resizingWidth = _ref2.resizingWidth,
      movingLeft = _ref2.movingLeft,
      eventHeight = _ref2.eventHeight,
      headerHeight = _ref2.headerHeight;
  var top = uiModel.top,
      left = uiModel.left,
      width = uiModel.width,
      model = uiModel.model;
  var margins = getMargins(flat);
  var baseStyle = flat ? {} : {
    width: resizingWidth || toPercent(width),
    left: toPercent(movingLeft !== null && movingLeft !== void 0 ? movingLeft : left),
    top: (top - 1) * (eventHeight + margins.vertical) + headerHeight,
    position: 'absolute'
  };
  return Object.assign(baseStyle, model.customStyle);
}

function getTestId(_ref3) {
  var model = _ref3.model;
  var calendarId = model.calendarId ? "".concat(model.calendarId, "-") : '';
  var id = model.id ? "".concat(model.id, "-") : '';
  return "".concat(calendarId).concat(id).concat(model.title);
}

var classNames = {
  eventBody: cls('weekday-event'),
  eventTitle: cls('weekday-event-title'),
  eventDot: cls('weekday-event-dot'),
  moveEvent: cls('dragging--move-event'),
  resizeEvent: cls('dragging--resize-horizontal-event')
}; // eslint-disable-next-line complexity

function HorizontalEvent(_ref4) {
  var _ref4$flat = _ref4.flat,
      flat = _ref4$flat === void 0 ? false : _ref4$flat,
      uiModel = _ref4.uiModel,
      eventHeight = _ref4.eventHeight,
      headerHeight = _ref4.headerHeight,
      _ref4$resizingWidth = _ref4.resizingWidth,
      resizingWidth = _ref4$resizingWidth === void 0 ? null : _ref4$resizingWidth,
      _ref4$movingLeft = _ref4.movingLeft,
      movingLeft = _ref4$movingLeft === void 0 ? null : _ref4$movingLeft;

  var _useStore = useStore(viewSelector),
      currentView = _useStore.currentView;

  var _useStore2 = useStore(optionsSelector),
      useDetailPopup = _useStore2.useDetailPopup,
      isReadOnlyCalendar = _useStore2.isReadOnly;

  var _useDispatch = useDispatch('dnd'),
      setDraggingEventUIModel = _useDispatch.setDraggingEventUIModel;

  var _useDispatch2 = useDispatch('popup'),
      showDetailPopup = _useDispatch2.showDetailPopup;

  var layoutContainer = useLayoutContainer();
  var eventBus = useEventBus();
  var calendarColor = useCalendarColor(uiModel.model);

  var _useState = hooks_module_y(false),
      _useState2 = horizontalEvent_slicedToArray(_useState, 2),
      isDraggingTarget = _useState2[0],
      setIsDraggingTarget = _useState2[1];

  var eventContainerRef = hooks_module_s(null);
  var _uiModel$model = uiModel.model,
      isReadOnly = _uiModel$model.isReadOnly,
      id = _uiModel$model.id,
      calendarId = _uiModel$model.calendarId;
  var isDraggableEvent = !isReadOnlyCalendar && !isReadOnly && type_isNil(resizingWidth) && type_isNil(movingLeft);

  var startDragEvent = function startDragEvent(className) {
    setDraggingEventUIModel(uiModel);
    layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.classList.add(className);
  };

  var endDragEvent = function endDragEvent(className) {
    setIsDraggingTarget(false);
    layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.classList.remove(className);
  };

  useTransientUpdate(dndSelector, function (_ref5) {
    var draggingEventUIModel = _ref5.draggingEventUIModel,
        draggingState = _ref5.draggingState;

    if (draggingState === DraggingState.DRAGGING && (draggingEventUIModel === null || draggingEventUIModel === void 0 ? void 0 : draggingEventUIModel.cid()) === uiModel.cid() && type_isNil(resizingWidth) && type_isNil(movingLeft)) {
      setIsDraggingTarget(true);
    } else {
      setIsDraggingTarget(false);
    }
  });
  hooks_module_(function () {
    if (isDraggableEvent) {
      eventBus.fire('afterRenderEvent', uiModel.model.toEventObject());
    } // This effect is only for the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  var onResizeStart = useDrag(DRAGGING_TYPE_CREATORS.resizeEvent('dayGrid', "".concat(uiModel.cid())), {
    onDragStart: function onDragStart() {
      return startDragEvent(classNames.resizeEvent);
    },
    onMouseUp: function onMouseUp() {
      return endDragEvent(classNames.resizeEvent);
    },
    onPressESCKey: function onPressESCKey() {
      return endDragEvent(classNames.resizeEvent);
    }
  });
  var onMoveStart = useDrag(DRAGGING_TYPE_CREATORS.moveEvent('dayGrid', "".concat(uiModel.cid())), {
    onDragStart: function onDragStart() {
      if (isDraggableEvent) {
        startDragEvent(classNames.moveEvent);
      }
    },
    onMouseUp: function onMouseUp(e, _ref6) {
      var draggingState = _ref6.draggingState;
      endDragEvent(classNames.moveEvent);
      var isClick = draggingState <= DraggingState.INIT;

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
    onPressESCKey: function onPressESCKey() {
      return endDragEvent(classNames.moveEvent);
    }
  });

  var handleResizeStart = function handleResizeStart(e) {
    e.stopPropagation();

    if (isDraggableEvent) {
      onResizeStart(e);
    }
  };

  var handleMoveStart = function handleMoveStart(e) {
    e.stopPropagation();
    onMoveStart(e);
  };

  var isDotEvent = !isDraggingTarget && currentView === 'month' && uiModel.model.category === 'time' && isSameDate(uiModel.model.start, uiModel.model.end);
  var shouldHideResizeHandler = !isDraggableEvent || flat || isDraggingTarget || uiModel.exceedRight;
  var containerStyle = getContainerStyle({
    uiModel: uiModel,
    eventHeight: eventHeight,
    headerHeight: headerHeight,
    flat: flat,
    movingLeft: movingLeft,
    resizingWidth: resizingWidth
  });
  var eventItemStyle = getEventItemStyle({
    uiModel: uiModel,
    flat: flat,
    eventHeight: eventHeight,
    isDraggingTarget: isDraggingTarget,
    calendarColor: calendarColor
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
    style: horizontalEvent_objectSpread(horizontalEvent_objectSpread({}, eventItemStyle), {}, {
      backgroundColor: isDotEvent ? null : eventItemStyle.backgroundColor,
      borderLeft: isDotEvent ? null : eventItemStyle.borderLeft
    }),
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
  var callbackRef = hooks_module_s(callback);
  hooks_module_(function () {
    callbackRef.current = callback;
  }, [callback]);
  hooks_module_(function () {
    var invoke = function invoke() {
      return callbackRef.current();
    };

    if (condition) {
      invoke();
    }
  }, [condition]);
}
;// CONCATENATED MODULE: ./src/hooks/event/useCurrentPointerPositionInGrid.ts














function useCurrentPointerPositionInGrid_slicedToArray(arr, i) { return useCurrentPointerPositionInGrid_arrayWithHoles(arr) || useCurrentPointerPositionInGrid_iterableToArrayLimit(arr, i) || useCurrentPointerPositionInGrid_unsupportedIterableToArray(arr, i) || useCurrentPointerPositionInGrid_nonIterableRest(); }

function useCurrentPointerPositionInGrid_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useCurrentPointerPositionInGrid_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useCurrentPointerPositionInGrid_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useCurrentPointerPositionInGrid_arrayLikeToArray(o, minLen); }

function useCurrentPointerPositionInGrid_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useCurrentPointerPositionInGrid_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useCurrentPointerPositionInGrid_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





function useCurrentPointerPositionInGrid(gridPositionFinder) {
  var _useState = hooks_module_y(null),
      _useState2 = useCurrentPointerPositionInGrid_slicedToArray(_useState, 2),
      currentGridPos = _useState2[0],
      setCurrentGridPos = _useState2[1];

  useTransientUpdate(dndSelector, function (dndState) {
    if (isPresent(dndState.x) && isPresent(dndState.y)) {
      var gridPosition = gridPositionFinder({
        clientX: dndState.x,
        clientY: dndState.y
      });

      if (gridPosition) {
        setCurrentGridPos(gridPosition);
      }
    }
  });
  var clearCurrentGridPos = hooks_module_T(function () {
    return setCurrentGridPos(null);
  }, []);
  return [currentGridPos, clearCurrentGridPos];
}
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__(7368);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.regexp.dot-all.js
var es_regexp_dot_all = __webpack_require__(4471);
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.regexp.sticky.js
var es_regexp_sticky = __webpack_require__(1172);
;// CONCATENATED MODULE: ./src/hooks/event/useDraggingEvent.ts
function useDraggingEvent_slicedToArray(arr, i) { return useDraggingEvent_arrayWithHoles(arr) || useDraggingEvent_iterableToArrayLimit(arr, i) || useDraggingEvent_unsupportedIterableToArray(arr, i) || useDraggingEvent_nonIterableRest(); }

function useDraggingEvent_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useDraggingEvent_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useDraggingEvent_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useDraggingEvent_arrayLikeToArray(o, minLen); }

function useDraggingEvent_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useDraggingEvent_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useDraggingEvent_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




























var getTargetEventId = function getTargetEventId(itemType, area, behavior) {
  function isEventDraggingType(_itemType) {
    return new RegExp("^event/".concat(area, "/").concat(behavior, "/\\d+$")).test(_itemType);
  }

  if (type_isNil(itemType)) {
    return null;
  }

  return isEventDraggingType(itemType) ? last(itemType.split('/')) : null;
};

function useDraggingEvent(area, behavior) {
  var _useState = hooks_module_y(false),
      _useState2 = useDraggingEvent_slicedToArray(_useState, 2),
      isDraggingEnd = _useState2[0],
      setIsDraggingEnd = _useState2[1];

  var _useState3 = hooks_module_y(false),
      _useState4 = useDraggingEvent_slicedToArray(_useState3, 2),
      isDraggingCanceled = _useState4[0],
      setIsDraggingCanceled = _useState4[1];

  var _useState5 = hooks_module_y(null),
      _useState6 = useDraggingEvent_slicedToArray(_useState5, 2),
      draggingEvent = _useState6[0],
      setDraggingEvent = _useState6[1];

  useTransientUpdate(dndSelector, function (_ref) {
    var draggingItemType = _ref.draggingItemType,
        draggingEventUIModel = _ref.draggingEventUIModel,
        draggingState = _ref.draggingState;
    var targetEventId = getTargetEventId(draggingItemType, area, behavior);
    var hasMatchingTargetEvent = Number(targetEventId) === (draggingEventUIModel === null || draggingEventUIModel === void 0 ? void 0 : draggingEventUIModel.cid());
    var isIdle = draggingState === DraggingState.IDLE;
    var isCanceled = draggingState === DraggingState.CANCELED;

    if (type_isNil(draggingEvent) && hasMatchingTargetEvent) {
      setDraggingEvent(draggingEventUIModel);
    }

    if (isPresent(draggingEvent) && (isIdle || isCanceled)) {
      setIsDraggingEnd(true);
      setIsDraggingCanceled(isCanceled);
    }
  });

  var clearDraggingEvent = function clearDraggingEvent() {
    setDraggingEvent(null);
    setIsDraggingEnd(false);
    setIsDraggingCanceled(false);
  };

  return {
    isDraggingEnd: isDraggingEnd,
    isDraggingCanceled: isDraggingCanceled,
    draggingEvent: draggingEvent,
    clearDraggingEvent: clearDraggingEvent
  };
}
;// CONCATENATED MODULE: ./src/hooks/dayGridWeek/useAlldayGridRowEventMove.ts















function useAlldayGridRowEventMove_slicedToArray(arr, i) { return useAlldayGridRowEventMove_arrayWithHoles(arr) || useAlldayGridRowEventMove_iterableToArrayLimit(arr, i) || useAlldayGridRowEventMove_unsupportedIterableToArray(arr, i) || useAlldayGridRowEventMove_nonIterableRest(); }

function useAlldayGridRowEventMove_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useAlldayGridRowEventMove_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useAlldayGridRowEventMove_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useAlldayGridRowEventMove_arrayLikeToArray(o, minLen); }

function useAlldayGridRowEventMove_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useAlldayGridRowEventMove_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useAlldayGridRowEventMove_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








function useAlldayGridRowEventMove(_ref) {
  var rowStyleInfo = _ref.rowStyleInfo,
      gridPositionFinder = _ref.gridPositionFinder;
  var eventBus = useEventBus();

  var _useDraggingEvent = useDraggingEvent('dayGrid', 'move'),
      isDraggingEnd = _useDraggingEvent.isDraggingEnd,
      isDraggingCanceled = _useDraggingEvent.isDraggingCanceled,
      movingEvent = _useDraggingEvent.draggingEvent,
      clearDraggingEvent = _useDraggingEvent.clearDraggingEvent;

  var startGridXRef = hooks_module_s(null);

  var _useCurrentPointerPos = useCurrentPointerPositionInGrid(gridPositionFinder),
      _useCurrentPointerPos2 = useAlldayGridRowEventMove_slicedToArray(_useCurrentPointerPos, 2),
      currentGridPos = _useCurrentPointerPos2[0],
      clearCurrentGridPos = _useCurrentPointerPos2[1];

  var _ref2 = currentGridPos !== null && currentGridPos !== void 0 ? currentGridPos : {},
      columnIndex = _ref2.columnIndex;

  var targetEventStartGridX = F(function () {
    return type_isNil(movingEvent) ? null : rowStyleInfo.findIndex(function (_ref3) {
      var left = _ref3.left;
      return left === movingEvent.left;
    });
  }, [rowStyleInfo, movingEvent]);
  var currentMovingLeft = F(function () {
    if (type_isNil(columnIndex) || type_isNil(startGridXRef.current) || type_isNil(targetEventStartGridX)) {
      return null;
    }

    var newColumnIndex = targetEventStartGridX + columnIndex - startGridXRef.current;
    return newColumnIndex < 0 ? -rowStyleInfo[-newColumnIndex].left : rowStyleInfo[newColumnIndex].left;
  }, [columnIndex, rowStyleInfo, targetEventStartGridX]);
  hooks_module_(function () {
    if (type_isNil(startGridXRef.current) && isPresent(columnIndex)) {
      startGridXRef.current = columnIndex;
    }
  }, [columnIndex]);
  useWhen(function () {
    var shouldUpdate = !isDraggingCanceled && isPresent(movingEvent) && isPresent(columnIndex) && isPresent(currentMovingLeft) && columnIndex !== startGridXRef.current;

    if (shouldUpdate && isPresent(startGridXRef.current)) {
      var dateOffset = columnIndex - startGridXRef.current;
      var newStartDate = new date_TZDate(movingEvent.model.getStarts());
      var newEndDate = new date_TZDate(movingEvent.model.getEnds());
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
  return F(function () {
    return {
      movingEvent: movingEvent,
      movingLeft: currentMovingLeft
    };
  }, [currentMovingLeft, movingEvent]);
}
;// CONCATENATED MODULE: ./src/components/dayGridWeek/movingEventShadow.tsx





function MovingEventShadow(_ref) {
  var rowStyleInfo = _ref.rowStyleInfo,
      gridPositionFinder = _ref.gridPositionFinder;

  var _useAlldayGridRowEven = useAlldayGridRowEventMove({
    rowStyleInfo: rowStyleInfo,
    gridPositionFinder: gridPositionFinder
  }),
      movingEvent = _useAlldayGridRowEven.movingEvent,
      movingLeft = _useAlldayGridRowEven.movingLeft;

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














function useAlldayGridRowEventResize_slicedToArray(arr, i) { return useAlldayGridRowEventResize_arrayWithHoles(arr) || useAlldayGridRowEventResize_iterableToArrayLimit(arr, i) || useAlldayGridRowEventResize_unsupportedIterableToArray(arr, i) || useAlldayGridRowEventResize_nonIterableRest(); }

function useAlldayGridRowEventResize_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useAlldayGridRowEventResize_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useAlldayGridRowEventResize_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useAlldayGridRowEventResize_arrayLikeToArray(o, minLen); }

function useAlldayGridRowEventResize_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useAlldayGridRowEventResize_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useAlldayGridRowEventResize_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









function getEventColIndex(uiModel, row) {
  var start = getGridDateIndex(uiModel.getStarts(), row);
  var end = getGridDateIndex(uiModel.getEnds(), row);
  return {
    start: start,
    end: end
  };
}

function useAlldayGridRowEventResize(_ref) {
  var weekDates = _ref.weekDates,
      gridColWidthMap = _ref.gridColWidthMap,
      gridPositionFinder = _ref.gridPositionFinder;
  var eventBus = useEventBus();

  var _useDraggingEvent = useDraggingEvent('dayGrid', 'resize'),
      isDraggingEnd = _useDraggingEvent.isDraggingEnd,
      isDraggingCanceled = _useDraggingEvent.isDraggingCanceled,
      resizingEvent = _useDraggingEvent.draggingEvent,
      clearDraggingEvent = _useDraggingEvent.clearDraggingEvent;

  var _useCurrentPointerPos = useCurrentPointerPositionInGrid(gridPositionFinder),
      _useCurrentPointerPos2 = useAlldayGridRowEventResize_slicedToArray(_useCurrentPointerPos, 2),
      currentGridPos = _useCurrentPointerPos2[0],
      clearCurrentGridPos = _useCurrentPointerPos2[1];

  var _ref2 = currentGridPos !== null && currentGridPos !== void 0 ? currentGridPos : {},
      columnIndex = _ref2.columnIndex;

  var targetEventGridIndices = F(function () {
    if (resizingEvent) {
      return getEventColIndex(resizingEvent, weekDates);
    }

    return {
      start: -1,
      end: -1
    };
  }, [weekDates, resizingEvent]);
  var resizingWidth = F(function () {
    if (targetEventGridIndices.start > -1 && isPresent(columnIndex)) {
      return gridColWidthMap[targetEventGridIndices.start][columnIndex];
    }

    return null;
  }, [columnIndex, gridColWidthMap, targetEventGridIndices.start]);
  useWhen(function () {
    var shouldUpdateEvent = !isDraggingCanceled && isPresent(resizingEvent) && isPresent(columnIndex) && targetEventGridIndices.start <= columnIndex && targetEventGridIndices.end !== columnIndex;

    if (shouldUpdateEvent) {
      var targetDate = weekDates[columnIndex];
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
  return F(function () {
    return {
      resizingEvent: resizingEvent,
      resizingWidth: resizingWidth
    };
  }, [resizingWidth, resizingEvent]);
}
;// CONCATENATED MODULE: ./src/components/dayGridWeek/resizingEventShadow.tsx





function ResizingEventShadow(_ref) {
  var weekDates = _ref.weekDates,
      gridColWidthMap = _ref.gridColWidthMap,
      gridPositionFinder = _ref.gridPositionFinder;

  var _useAlldayGridRowEven = useAlldayGridRowEventResize({
    weekDates: weekDates,
    gridColWidthMap: gridColWidthMap,
    gridPositionFinder: gridPositionFinder
  }),
      resizingEvent = _useAlldayGridRowEven.resizingEvent,
      resizingWidth = _useAlldayGridRowEven.resizingWidth;

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














function useDOMNode_slicedToArray(arr, i) { return useDOMNode_arrayWithHoles(arr) || useDOMNode_iterableToArrayLimit(arr, i) || useDOMNode_unsupportedIterableToArray(arr, i) || useDOMNode_nonIterableRest(); }

function useDOMNode_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useDOMNode_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useDOMNode_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useDOMNode_arrayLikeToArray(o, minLen); }

function useDOMNode_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useDOMNode_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useDOMNode_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function useDOMNode() {
  var _useState = hooks_module_y(null),
      _useState2 = useDOMNode_slicedToArray(_useState, 2),
      node = _useState2[0],
      setNode = _useState2[1];

  var setNodeRef = hooks_module_T(function (ref) {
    if (ref) {
      setNode(ref);
    }
  }, []);
  return [node, setNodeRef];
}
;// CONCATENATED MODULE: ./src/hooks/dayGridWeek/useGridRowHeightController.ts














function useGridRowHeightController_slicedToArray(arr, i) { return useGridRowHeightController_arrayWithHoles(arr) || useGridRowHeightController_iterableToArrayLimit(arr, i) || useGridRowHeightController_unsupportedIterableToArray(arr, i) || useGridRowHeightController_nonIterableRest(); }

function useGridRowHeightController_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useGridRowHeightController_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useGridRowHeightController_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useGridRowHeightController_arrayLikeToArray(o, minLen); }

function useGridRowHeightController_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useGridRowHeightController_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useGridRowHeightController_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





function useGridRowHeightController(maxTop, category) {
  var _useState = hooks_module_y(0),
      _useState2 = useGridRowHeightController_slicedToArray(_useState, 2),
      clickedIndex = _useState2[0],
      setClickedIndex = _useState2[1];

  var _useState3 = hooks_module_y(false),
      _useState4 = useGridRowHeightController_slicedToArray(_useState3, 2),
      isClickedCount = _useState4[0],
      setClickedCount = _useState4[1];

  var _useDispatch = useDispatch('weekViewLayout'),
      updateDayGridRowHeight = _useDispatch.updateDayGridRowHeight;

  var onClickExceedCount = hooks_module_T(function (index) {
    setClickedCount(true);
    setClickedIndex(index);
    updateDayGridRowHeight({
      rowName: category,
      height: (maxTop + 1) * EVENT_HEIGHT
    });
  }, [category, maxTop, updateDayGridRowHeight]);
  var onClickCollapseButton = hooks_module_T(function () {
    setClickedCount(false);
    updateDayGridRowHeight({
      rowName: category,
      height: DEFAULT_PANEL_HEIGHT
    });
  }, [category, updateDayGridRowHeight]);
  return {
    clickedIndex: clickedIndex,
    isClickedCount: isClickedCount,
    onClickExceedCount: onClickExceedCount,
    onClickCollapseButton: onClickCollapseButton
  };
}
;// CONCATENATED MODULE: ./src/utils/requestTimeout.ts
 // Reference: https://medium.com/trabe/preventing-click-events-on-double-click-with-react-the-performant-way-1416ab03b835

function requestTimeout(fn, delay, registerCancel) {
  var start;

  var loop = function loop(timestamp) {
    if (!start) {
      start = timestamp;
    }

    var elapsed = timestamp - start;

    if (elapsed >= delay) {
      fn();
      registerCancel(noop);
      return;
    }

    var raf = requestAnimationFrame(loop);
    registerCancel(function () {
      return cancelAnimationFrame(raf);
    });
  };

  var raf = requestAnimationFrame(loop);
  registerCancel(function () {
    return cancelAnimationFrame(raf);
  });
}
;// CONCATENATED MODULE: ./src/hooks/common/useClickPrevention.ts


 // Reference: https://medium.com/trabe/preventing-click-events-on-double-click-with-react-the-performant-way-1416ab03b835

function useClickPrevention(_ref) {
  var onClick = _ref.onClick,
      onDblClick = _ref.onDblClick,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? 300 : _ref$delay;
  var cancelCallback = hooks_module_s(noop);

  var registerCancel = function registerCancel(fn) {
    cancelCallback.current = fn;
  };

  var cancelScheduledWork = function cancelScheduledWork() {
    cancelCallback.current();
  }; // Cancels the current scheduled work before the "unmount"


  hooks_module_(function () {
    return cancelScheduledWork;
  }, []);

  var handleClick = function handleClick(e) {
    cancelScheduledWork();
    requestTimeout(onClick.bind(null, e), delay, registerCancel);
  };

  var handleDblClick = function handleDblClick(e) {
    cancelScheduledWork();
    onDblClick(e);
  };

  return [handleClick, handleDblClick];
}
;// CONCATENATED MODULE: ./src/hooks/gridSelection/useGridSelection.ts
















function useGridSelection_toConsumableArray(arr) { return useGridSelection_arrayWithoutHoles(arr) || useGridSelection_iterableToArray(arr) || useGridSelection_unsupportedIterableToArray(arr) || useGridSelection_nonIterableSpread(); }

function useGridSelection_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useGridSelection_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function useGridSelection_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return useGridSelection_arrayLikeToArray(arr); }

function useGridSelection_slicedToArray(arr, i) { return useGridSelection_arrayWithHoles(arr) || useGridSelection_iterableToArrayLimit(arr, i) || useGridSelection_unsupportedIterableToArray(arr, i) || useGridSelection_nonIterableRest(); }

function useGridSelection_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useGridSelection_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useGridSelection_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useGridSelection_arrayLikeToArray(o, minLen); }

function useGridSelection_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useGridSelection_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useGridSelection_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }













var GRID_SELECTION_TYPE_MAP = {
  dayGridMonth: 'month',
  dayGridWeek: 'allday',
  timeGrid: 'time'
};

function sortDates(a, b) {
  var isIncreased = a < b;
  return isIncreased ? [a, b] : [b, a];
}

function useGridSelection(_ref) {
  var type = _ref.type,
      selectionSorter = _ref.selectionSorter,
      dateGetter = _ref.dateGetter,
      dateCollection = _ref.dateCollection,
      gridPositionFinder = _ref.gridPositionFinder;

  var _useStore = useStore(optionsSelector),
      useFormPopup = _useStore.useFormPopup,
      gridSelectionOptions = _useStore.gridSelection;

  var enableDblClick = gridSelectionOptions.enableDblClick,
      enableClick = gridSelectionOptions.enableClick;

  var _useDispatch = useDispatch('gridSelection'),
      setGridSelection = _useDispatch.setGridSelection,
      addGridSelection = _useDispatch.addGridSelection,
      clearAll = _useDispatch.clearAll;

  var _useDispatch2 = useDispatch('popup'),
      hideAllPopup = _useDispatch2.hideAllPopup,
      showFormPopup = _useDispatch2.showFormPopup;

  var eventBus = useEventBus();
  var layoutContainer = useLayoutContainer();

  var _useState = hooks_module_y(null),
      _useState2 = useGridSelection_slicedToArray(_useState, 2),
      initMousePosition = _useState2[0],
      setInitMousePosition = _useState2[1];

  var _useState3 = hooks_module_y(null),
      _useState4 = useGridSelection_slicedToArray(_useState3, 2),
      initGridPosition = _useState4[0],
      setInitGridPosition = _useState4[1];

  var isSelectingGridRef = hooks_module_s(false);
  var gridSelectionRef = hooks_module_s(null);
  useTransientUpdate(hooks_module_T(function (state) {
    return state.gridSelection[type];
  }, [type]), function (gridSelection) {
    gridSelectionRef.current = gridSelection;
  });
  useTransientUpdate(dndSelector, function (_ref2) {
    var draggingState = _ref2.draggingState,
        draggingItemType = _ref2.draggingItemType;
    isSelectingGridRef.current = draggingItemType === currentGridSelectionType && draggingState >= DraggingState.INIT;
  });
  var currentGridSelectionType = DRAGGING_TYPE_CREATORS.gridSelection(type);

  var setGridSelectionByPosition = function setGridSelectionByPosition(e) {
    var gridPosition = gridPositionFinder(e);

    if (isPresent(initGridPosition) && isPresent(gridPosition)) {
      setGridSelection(type, selectionSorter(initGridPosition, gridPosition));
    }
  };

  var _useClickPrevention = useClickPrevention({
    onClick: function onClick(e) {
      if (enableClick) {
        onMouseUp(e, true);
      }
    },
    onDblClick: function onDblClick(e) {
      if (enableDblClick) {
        onMouseUp(e, true);
      }
    },
    delay: 250 // heuristic value

  }),
      _useClickPrevention2 = useGridSelection_slicedToArray(_useClickPrevention, 2),
      handleClickWithDebounce = _useClickPrevention2[0],
      handleDblClickPreventingClick = _useClickPrevention2[1];

  var onMouseUpWithClick = function onMouseUpWithClick(e) {
    var isClick = e.detail <= 1;

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

  var onMouseUp = function onMouseUp(e, isClickEvent) {
    // The grid selection is created on mouseup in case of the click event.
    if (isClickEvent) {
      setGridSelectionByPosition(e);
    }

    if (isPresent(gridSelectionRef.current)) {
      var _layoutContainer$quer;

      var _sortDates = sortDates.apply(void 0, useGridSelection_toConsumableArray(dateGetter(dateCollection, gridSelectionRef.current))),
          _sortDates2 = useGridSelection_slicedToArray(_sortDates, 2),
          startDate = _sortDates2[0],
          endDate = _sortDates2[1];

      if (useFormPopup && isPresent(initMousePosition)) {
        var popupArrowPointPosition = {
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
          popupArrowPointPosition: popupArrowPointPosition,
          close: clearAll
        });
      }

      var gridSelectionSelector = ".".concat(cls(GRID_SELECTION_TYPE_MAP[type]), ".").concat(cls('grid-selection'));
      var gridSelectionElements = Array.from((_layoutContainer$quer = layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.querySelectorAll(gridSelectionSelector)) !== null && _layoutContainer$quer !== void 0 ? _layoutContainer$quer : []);
      eventBus.fire('selectDateTime', {
        start: startDate.toDate(),
        end: endDate.toDate(),
        isAllday: type !== 'timeGrid',
        nativeEvent: e,
        gridSelectionElements: gridSelectionElements
      });
    }
  };

  var clearGridSelection = hooks_module_T(function () {
    setInitMousePosition(null);
    setInitGridPosition(null);
    setGridSelection(type, null);
  }, [setGridSelection, type]);
  var onMouseDown = useDrag(currentGridSelectionType, {
    onInit: function onInit(e) {
      if (useFormPopup) {
        setInitMousePosition({
          x: e.clientX,
          y: e.clientY
        });
        hideAllPopup();
      }

      var gridPosition = gridPositionFinder(e);

      if (isPresent(gridPosition)) {
        setInitGridPosition(gridPosition);
      }

      if (!useFormPopup) {
        addGridSelection(type, gridSelectionRef.current);
      }
    },
    onDragStart: function onDragStart(e) {
      // The grid selection is created on mousemove in case of the drag event.
      setGridSelectionByPosition(e);
    },
    onDrag: function onDrag(e) {
      if (isSelectingGridRef.current) {
        setGridSelectionByPosition(e);
      }
    },
    onMouseUp: function (_onMouseUp) {
      function onMouseUp(_x, _x2) {
        return _onMouseUp.apply(this, arguments);
      }

      onMouseUp.toString = function () {
        return _onMouseUp.toString();
      };

      return onMouseUp;
    }(function (e, _ref3) {
      var draggingState = _ref3.draggingState;
      e.stopPropagation();
      var isClickEvent = draggingState <= DraggingState.INIT;

      if (isClickEvent) {
        onMouseUpWithClick(e);
      } else {
        onMouseUp(e, isClickEvent);
      }
    }),
    onPressESCKey: clearGridSelection
  });
  hooks_module_(function () {
    return clearGridSelection;
  }, [clearGridSelection]);
  return onMouseDown;
}
;// CONCATENATED MODULE: ./src/components/dayGridWeek/alldayGridRow.tsx

















function alldayGridRow_toConsumableArray(arr) { return alldayGridRow_arrayWithoutHoles(arr) || alldayGridRow_iterableToArray(arr) || alldayGridRow_unsupportedIterableToArray(arr) || alldayGridRow_nonIterableSpread(); }

function alldayGridRow_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function alldayGridRow_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function alldayGridRow_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return alldayGridRow_arrayLikeToArray(arr); }

function alldayGridRow_slicedToArray(arr, i) { return alldayGridRow_arrayWithHoles(arr) || alldayGridRow_iterableToArrayLimit(arr, i) || alldayGridRow_unsupportedIterableToArray(arr, i) || alldayGridRow_nonIterableRest(); }

function alldayGridRow_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function alldayGridRow_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return alldayGridRow_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return alldayGridRow_arrayLikeToArray(o, minLen); }

function alldayGridRow_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function alldayGridRow_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function alldayGridRow_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





















var rowTitleTemplate = "alldayTitle";
function AlldayGridRow(_ref) {
  var events = _ref.events,
      weekDates = _ref.weekDates,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? DEFAULT_PANEL_HEIGHT : _ref$height,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options,
      rowStyleInfo = _ref.rowStyleInfo,
      gridColWidthMap = _ref.gridColWidthMap;

  var _useStore = useStore(optionsSelector),
      isReadOnly = _useStore.isReadOnly;

  var dayGridLeftTheme = useTheme(weekDayGridLeftSelector);

  var _useDOMNode = useDOMNode(),
      _useDOMNode2 = alldayGridRow_slicedToArray(_useDOMNode, 2),
      panelContainer = _useDOMNode2[0],
      setPanelContainerRef = _useDOMNode2[1];

  var _options$narrowWeeken = options.narrowWeekend,
      narrowWeekend = _options$narrowWeeken === void 0 ? false : _options$narrowWeeken,
      _options$startDayOfWe = options.startDayOfWeek,
      startDayOfWeek = _options$startDayOfWe === void 0 ? Day.SUN : _options$startDayOfWe;
  var maxTop = F(function () {
    return Math.max.apply(Math, [0].concat(alldayGridRow_toConsumableArray(events.map(function (_ref2) {
      var top = _ref2.top;
      return top;
    }))));
  }, [events]);
  var gridPositionFinder = F(function () {
    return createGridPositionFinder({
      container: panelContainer,
      rowsCount: 1,
      columnsCount: weekDates.length,
      narrowWeekend: narrowWeekend,
      startDayOfWeek: startDayOfWeek
    });
  }, [panelContainer, weekDates.length, narrowWeekend, startDayOfWeek]);

  var _useGridRowHeightCont = useGridRowHeightController(maxTop, 'allday'),
      clickedIndex = _useGridRowHeightCont.clickedIndex,
      isClickedCount = _useGridRowHeightCont.isClickedCount,
      onClickExceedCount = _useGridRowHeightCont.onClickExceedCount,
      onClickCollapseButton = _useGridRowHeightCont.onClickCollapseButton;

  var horizontalEvents = F(function () {
    return events.filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP)).map(function (uiModel) {
      return h(HorizontalEvent, {
        key: "allday-DayEvent-".concat(uiModel.cid()),
        uiModel: uiModel,
        eventHeight: EVENT_HEIGHT,
        headerHeight: 0
      });
    });
  }, [events, height]);
  var startGridSelection = useGridSelection({
    type: 'dayGridWeek',
    gridPositionFinder: gridPositionFinder,
    dateCollection: weekDates,
    selectionSorter: alldayGridRowSelectionHelper.sortSelection,
    dateGetter: alldayGridRowSelectionHelper.getDateFromCollection
  });

  var onMouseDown = function onMouseDown(e) {
    var target = e.target;

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

















function otherGridRow_toConsumableArray(arr) { return otherGridRow_arrayWithoutHoles(arr) || otherGridRow_iterableToArray(arr) || otherGridRow_unsupportedIterableToArray(arr) || otherGridRow_nonIterableSpread(); }

function otherGridRow_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function otherGridRow_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return otherGridRow_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return otherGridRow_arrayLikeToArray(o, minLen); }

function otherGridRow_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function otherGridRow_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return otherGridRow_arrayLikeToArray(arr); }

function otherGridRow_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }












function OtherGridRow(_ref) {
  var events = _ref.events,
      weekDates = _ref.weekDates,
      category = _ref.category,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? DEFAULT_PANEL_HEIGHT : _ref$height,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options;
  var dayGridLeftTheme = useTheme(weekDayGridLeftSelector);
  var maxTop = F(function () {
    return Math.max.apply(Math, [0].concat(otherGridRow_toConsumableArray(events.map(function (_ref2) {
      var top = _ref2.top;
      return top;
    }))));
  }, [events]);
  var _options$narrowWeeken = options.narrowWeekend,
      narrowWeekend = _options$narrowWeeken === void 0 ? false : _options$narrowWeeken;
  var rowTitleTemplate = "".concat(category, "Title");

  var _useGridRowHeightCont = useGridRowHeightController(maxTop, category),
      clickedIndex = _useGridRowHeightCont.clickedIndex,
      isClickedCount = _useGridRowHeightCont.isClickedCount,
      onClickExceedCount = _useGridRowHeightCont.onClickExceedCount,
      onClickCollapseButton = _useGridRowHeightCont.onClickCollapseButton;

  var horizontalEvents = F(function () {
    return events.filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP)).map(function (uiModel) {
      return h(HorizontalEvent, {
        key: "".concat(category, "-DayEvent-").concat(uiModel.cid()),
        uiModel: uiModel,
        eventHeight: EVENT_HEIGHT,
        headerHeight: 0
      });
    });
  }, [category, events, height]);
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
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.array.fill.js
var es_array_fill = __webpack_require__(2656);
;// CONCATENATED MODULE: ./src/components/popup/eventDetailSectionDetail.tsx





var eventDetailSectionDetail_classNames = {
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

  var event = _ref.event;
  var location = event.location,
      recurrenceRule = event.recurrenceRule,
      attendees = event.attendees,
      state = event.state,
      calendarId = event.calendarId,
      body = event.body;
  var calendar = useCalendarById(calendarId);
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



var eventDetailSectionHeader_classNames = {
  sectionHeader: cls('popup-section', 'section-header'),
  content: cls('content'),
  eventTitle: cls('event-title')
};
function EventDetailSectionHeader(_ref) {
  var event = _ref.event;
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

var SEE_MORE_POPUP_SLOT_CLASS_NAME = cls('see-more-popup-slot');
var EVENT_FORM_POPUP_SLOT_CLASS_NAME = cls('event-form-popup-slot');
var EVENT_DETAIL_POPUP_SLOT_CLASS_NAME = cls('event-detail-popup-slot');
var HALF_OF_POPUP_ARROW_HEIGHT = 8;
var BOOLEAN_KEYS_OF_EVENT_MODEL_DATA = ['isPrivate', 'isAllday', 'isPending', 'isFocused', 'isVisible', 'isReadOnly'];
var DetailPopupArrowDirection;

(function (DetailPopupArrowDirection) {
  DetailPopupArrowDirection["right"] = "right";
  DetailPopupArrowDirection["left"] = "left";
})(DetailPopupArrowDirection || (DetailPopupArrowDirection = {}));

var FormPopupArrowDirection;

(function (FormPopupArrowDirection) {
  FormPopupArrowDirection["top"] = "top";
  FormPopupArrowDirection["bottom"] = "bottom";
})(FormPopupArrowDirection || (FormPopupArrowDirection = {}));
;// CONCATENATED MODULE: ./src/contexts/floatingLayer.tsx














function floatingLayer_slicedToArray(arr, i) { return floatingLayer_arrayWithHoles(arr) || floatingLayer_iterableToArrayLimit(arr, i) || floatingLayer_unsupportedIterableToArray(arr, i) || floatingLayer_nonIterableRest(); }

function floatingLayer_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function floatingLayer_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return floatingLayer_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return floatingLayer_arrayLikeToArray(o, minLen); }

function floatingLayer_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function floatingLayer_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function floatingLayer_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var FloatingLayerContext = B(null);
function FloatingLayerProvider(_ref) {
  var children = _ref.children;

  var _useDOMNode = useDOMNode(),
      _useDOMNode2 = floatingLayer_slicedToArray(_useDOMNode, 2),
      containerRef = _useDOMNode2[0],
      containerRefCallback = _useDOMNode2[1];

  var _useDOMNode3 = useDOMNode(),
      _useDOMNode4 = floatingLayer_slicedToArray(_useDOMNode3, 2),
      seeMorePopupSlotRef = _useDOMNode4[0],
      seeMorePopupSlotRefCallback = _useDOMNode4[1];

  var _useDOMNode5 = useDOMNode(),
      _useDOMNode6 = floatingLayer_slicedToArray(_useDOMNode5, 2),
      formPopupSlotRef = _useDOMNode6[0],
      formPopupSlotRefCallback = _useDOMNode6[1];

  var _useDOMNode7 = useDOMNode(),
      _useDOMNode8 = floatingLayer_slicedToArray(_useDOMNode7, 2),
      detailPopupSlotRef = _useDOMNode8[0],
      detailPopupSlotRefCallback = _useDOMNode8[1];

  var floatingLayer = {
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
var useFloatingLayer = function useFloatingLayer(floatingLayerType) {
  var _floatingLayers$float;

  var floatingLayers = hooks_module_q(FloatingLayerContext);

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

var eventFormPopupParamSelector = function eventFormPopupParamSelector(state) {
  return state.popup[PopupType.Form];
};
var eventDetailPopupParamSelector = function eventDetailPopupParamSelector(state) {
  return state.popup[PopupType.Detail];
};
var seeMorePopupParamSelector = function seeMorePopupParamSelector(state) {
  return state.popup[PopupType.SeeMore];
};
;// CONCATENATED MODULE: ./src/components/popup/eventDetailPopup.tsx















function eventDetailPopup_slicedToArray(arr, i) { return eventDetailPopup_arrayWithHoles(arr) || eventDetailPopup_iterableToArrayLimit(arr, i) || eventDetailPopup_unsupportedIterableToArray(arr, i) || eventDetailPopup_nonIterableRest(); }

function eventDetailPopup_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function eventDetailPopup_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return eventDetailPopup_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return eventDetailPopup_arrayLikeToArray(o, minLen); }

function eventDetailPopup_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function eventDetailPopup_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function eventDetailPopup_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



















var eventDetailPopup_classNames = {
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
  var top = eventRect.top + eventRect.height / 2 - popupRect.height / 2;
  var left = eventRect.left + eventRect.width;

  if (isTopOutOfLayout(top, layoutRect, popupRect)) {
    top = layoutRect.top + layoutRect.height - popupRect.height;
  }

  if (isLeftOutOfLayout(left, layoutRect, popupRect)) {
    left = eventRect.left - popupRect.width;
  }

  return [Math.max(top, layoutRect.top) + window.scrollY, Math.max(left, layoutRect.left) + window.scrollX];
}

function calculatePopupArrowPosition(eventRect, layoutRect, popupRect) {
  var top = eventRect.top + eventRect.height / 2 + window.scrollY;
  var popupLeft = eventRect.left + eventRect.width;
  var isOutOfLayout = popupLeft + popupRect.width > layoutRect.left + layoutRect.width;
  var direction = isOutOfLayout ? DetailPopupArrowDirection.right : DetailPopupArrowDirection.left;
  return {
    top: top,
    direction: direction
  };
}

function EventDetailPopup() {
  var _useStore = useStore(optionsSelector),
      useFormPopup = _useStore.useFormPopup;

  var popupParams = useStore(eventDetailPopupParamSelector);

  var _ref = popupParams !== null && popupParams !== void 0 ? popupParams : {},
      event = _ref.event,
      eventRect = _ref.eventRect;

  var _useDispatch = useDispatch('popup'),
      showFormPopup = _useDispatch.showFormPopup,
      hideDetailPopup = _useDispatch.hideDetailPopup;

  var calendarColor = useCalendarColor(event);
  var layoutContainer = useLayoutContainer();
  var detailPopupSlot = useFloatingLayer('detailPopupSlot');
  var eventBus = useEventBus();
  var popupContainerRef = hooks_module_s(null);

  var _useState = hooks_module_y({}),
      _useState2 = eventDetailPopup_slicedToArray(_useState, 2),
      style = _useState2[0],
      setStyle = _useState2[1];

  var _useState3 = hooks_module_y(0),
      _useState4 = eventDetailPopup_slicedToArray(_useState3, 2),
      arrowTop = _useState4[0],
      setArrowTop = _useState4[1];

  var _useState5 = hooks_module_y(DetailPopupArrowDirection.left),
      _useState6 = eventDetailPopup_slicedToArray(_useState5, 2),
      arrowDirection = _useState6[0],
      setArrowDirection = _useState6[1];

  var popupArrowClassName = F(function () {
    var right = arrowDirection === DetailPopupArrowDirection.right;
    var left = arrowDirection === DetailPopupArrowDirection.left;
    return cls('popup-arrow', {
      right: right,
      left: left
    });
  }, [arrowDirection]);
  hooks_module_h(function () {
    if (popupContainerRef.current && eventRect && layoutContainer) {
      var layoutRect = layoutContainer.getBoundingClientRect();
      var popupRect = popupContainerRef.current.getBoundingClientRect();

      var _calculatePopupPositi = calculatePopupPosition(eventRect, layoutRect, popupRect),
          _calculatePopupPositi2 = eventDetailPopup_slicedToArray(_calculatePopupPositi, 2),
          top = _calculatePopupPositi2[0],
          left = _calculatePopupPositi2[1];

      var _calculatePopupArrowP = calculatePopupArrowPosition(eventRect, layoutRect, popupRect),
          arrowTopPosition = _calculatePopupArrowP.top,
          direction = _calculatePopupArrowP.direction;

      setStyle({
        top: top,
        left: left
      });
      setArrowTop(arrowTopPosition - top - HALF_OF_POPUP_ARROW_HEIGHT);
      setArrowDirection(direction);
    }
  }, [eventRect, layoutContainer]);

  if (type_isNil(event) || type_isNil(eventRect) || type_isNil(detailPopupSlot)) {
    return null;
  }

  var _event$title = event.title,
      title = _event$title === void 0 ? '' : _event$title,
      _event$isAllday = event.isAllday,
      isAllday = _event$isAllday === void 0 ? false : _event$isAllday,
      _event$start = event.start,
      start = _event$start === void 0 ? new date_TZDate() : _event$start,
      _event$end = event.end,
      end = _event$end === void 0 ? new date_TZDate() : _event$end,
      location = event.location,
      state = event.state,
      isReadOnly = event.isReadOnly,
      isPrivate = event.isPrivate;
  var popupArrowPointPosition = {
    top: eventRect.top + eventRect.height / 2,
    left: eventRect.left + eventRect.width / 2
  };

  var onClickEditButton = function onClickEditButton() {
    if (useFormPopup) {
      showFormPopup({
        isCreationPopup: false,
        event: event,
        title: title,
        location: location,
        start: start,
        end: end,
        isAllday: isAllday,
        isPrivate: isPrivate,
        eventState: state,
        popupArrowPointPosition: popupArrowPointPosition
      });
    } else {
      eventBus.fire('beforeUpdateEvent', {
        event: event.toEventObject(),
        changes: {}
      });
    }
  };

  var onClickDeleteButton = function onClickDeleteButton() {
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





var calendarDropdownMenu_classNames = {
  dropdownMenu: cls('dropdown-menu'),
  dropdownMenuItem: cls('dropdown-menu-item'),
  dotIcon: cls('icon', 'dot'),
  content: cls('content')
};

function DropdownMenuItem(_ref) {
  var index = _ref.index,
      name = _ref.name,
      backgroundColor = _ref.backgroundColor,
      _onClick = _ref.onClick;
  return h("li", {
    className: calendarDropdownMenu_classNames.dropdownMenuItem,
    onClick: function onClick(e) {
      return _onClick(e, index);
    }
  }, h("span", {
    className: calendarDropdownMenu_classNames.dotIcon,
    style: {
      backgroundColor: backgroundColor
    }
  }), h("span", {
    className: calendarDropdownMenu_classNames.content
  }, name));
}

function CalendarDropdownMenu(_ref2) {
  var calendars = _ref2.calendars,
      setOpened = _ref2.setOpened,
      onChangeIndex = _ref2.onChangeIndex;

  var handleDropdownMenuItemClick = function handleDropdownMenuItemClick(e, index) {
    e.stopPropagation();
    setOpened(false);
    onChangeIndex(index);
  };

  return h("ul", {
    className: calendarDropdownMenu_classNames.dropdownMenu
  }, calendars.map(function (_ref3, index) {
    var name = _ref3.name,
        _ref3$backgroundColor = _ref3.backgroundColor,
        backgroundColor = _ref3$backgroundColor === void 0 ? '000' : _ref3$backgroundColor;
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















function popupSection_toConsumableArray(arr) { return popupSection_arrayWithoutHoles(arr) || popupSection_iterableToArray(arr) || popupSection_unsupportedIterableToArray(arr) || popupSection_nonIterableSpread(); }

function popupSection_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function popupSection_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return popupSection_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return popupSection_arrayLikeToArray(o, minLen); }

function popupSection_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function popupSection_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return popupSection_arrayLikeToArray(arr); }

function popupSection_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




function PopupSection(_ref) {
  var children = _ref.children,
      _ref$classNames = _ref.classNames,
      classNames = _ref$classNames === void 0 ? [] : _ref$classNames,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? noop : _ref$onClick;
  return h("div", {
    className: cls.apply(void 0, ['popup-section'].concat(popupSection_toConsumableArray(classNames))),
    onClick: onClick
  }, children);
}
;// CONCATENATED MODULE: ./src/hooks/common/useDropdownState.ts














function useDropdownState_slicedToArray(arr, i) { return useDropdownState_arrayWithHoles(arr) || useDropdownState_iterableToArrayLimit(arr, i) || useDropdownState_unsupportedIterableToArray(arr, i) || useDropdownState_nonIterableRest(); }

function useDropdownState_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useDropdownState_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useDropdownState_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useDropdownState_arrayLikeToArray(o, minLen); }

function useDropdownState_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useDropdownState_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useDropdownState_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


function useDropdownState() {
  var _useState = hooks_module_y(false),
      _useState2 = useDropdownState_slicedToArray(_useState, 2),
      isOpened = _useState2[0],
      setOpened = _useState2[1];

  var toggleDropdown = function toggleDropdown() {
    return setOpened(function (prev) {
      return !prev;
    });
  };

  return {
    isOpened: isOpened,
    setOpened: setOpened,
    toggleDropdown: toggleDropdown
  };
}
;// CONCATENATED MODULE: ./src/hooks/popup/useFormState.ts








function useFormState_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function useFormState_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? useFormState_ownKeys(Object(source), !0).forEach(function (key) { useFormState_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : useFormState_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function useFormState_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var FormStateActionType;

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

var defaultFormState = {
  title: '',
  location: '',
  isAllday: false,
  isPrivate: false,
  state: 'Busy'
}; // eslint-disable-next-line complexity

function formStateReducer(state, action) {
  switch (action.type) {
    case FormStateActionType.init:
      return useFormState_objectSpread(useFormState_objectSpread({}, defaultFormState), action.event);

    case FormStateActionType.setCalendarId:
      return useFormState_objectSpread(useFormState_objectSpread({}, state), {}, {
        calendarId: action.calendarId
      });

    case FormStateActionType.setTitle:
      return useFormState_objectSpread(useFormState_objectSpread({}, state), {}, {
        title: action.title
      });

    case FormStateActionType.setLocation:
      return useFormState_objectSpread(useFormState_objectSpread({}, state), {}, {
        location: action.location
      });

    case FormStateActionType.setPrivate:
      return useFormState_objectSpread(useFormState_objectSpread({}, state), {}, {
        isPrivate: action.isPrivate
      });

    case FormStateActionType.setAllday:
      return useFormState_objectSpread(useFormState_objectSpread({}, state), {}, {
        isAllday: action.isAllday
      });

    case FormStateActionType.setState:
      return useFormState_objectSpread(useFormState_objectSpread({}, state), {}, {
        state: action.state
      });

    case FormStateActionType.reset:
      return useFormState_objectSpread(useFormState_objectSpread({}, state), defaultFormState);

    default:
      return state;
  }
}

function useFormState(initCalendarId) {
  return hooks_module_d(formStateReducer, useFormState_objectSpread({
    calendarId: initCalendarId
  }, defaultFormState));
}
;// CONCATENATED MODULE: ./src/components/popup/calendarSelector.tsx









var calendarSelector_classNames = {
  popupSection: ['dropdown-section', 'calendar-section'],
  popupSectionItem: cls('popup-section-item', 'popup-button'),
  dotIcon: cls('icon', 'dot'),
  content: cls('content', 'event-calendar')
};
function CalendarSelector(_ref) {
  var calendars = _ref.calendars,
      selectedCalendarId = _ref.selectedCalendarId,
      formStateDispatch = _ref.formStateDispatch;

  var _useDropdownState = useDropdownState(),
      isOpened = _useDropdownState.isOpened,
      setOpened = _useDropdownState.setOpened,
      toggleDropdown = _useDropdownState.toggleDropdown;

  var selectedCalendar = calendars.find(function (calendar) {
    return calendar.id === selectedCalendarId;
  });

  var _ref2 = selectedCalendar !== null && selectedCalendar !== void 0 ? selectedCalendar : {},
      _ref2$backgroundColor = _ref2.backgroundColor,
      backgroundColor = _ref2$backgroundColor === void 0 ? '' : _ref2$backgroundColor,
      _ref2$name = _ref2.name,
      name = _ref2$name === void 0 ? '' : _ref2$name;

  var changeIndex = function changeIndex(index) {
    return formStateDispatch({
      type: FormStateActionType.setCalendarId,
      calendarId: calendars[index].id
    });
  };

  return h(PopupSection, {
    onClick: toggleDropdown,
    classNames: calendarSelector_classNames.popupSection
  }, h("button", {
    type: "button",
    className: calendarSelector_classNames.popupSectionItem
  }, h("span", {
    className: calendarSelector_classNames.dotIcon,
    style: {
      backgroundColor: backgroundColor
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





var closePopupButton_classNames = {
  closeButton: cls('popup-button', 'popup-close'),
  closeIcon: cls('icon', 'ic-close')
};
function ClosePopupButton(_ref) {
  var type = _ref.type,
      close = _ref.close;

  var _useDispatch = useDispatch('popup'),
      hideAllPopup = _useDispatch.hideAllPopup;

  var onClickHandler = function onClickHandler() {
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


var confirmPopupButton_classNames = {
  confirmButton: cls('popup-button', 'popup-confirm')
};
function ConfirmPopupButton(_ref) {
  var children = _ref.children;
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
  var template = _ref.template,
      model = _ref.model,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? '' : _ref$defaultValue;
  var templates = useStore(templateSelector);
  var templateFunc = templates[template];

  if (type_isNil(templateFunc)) {
    return defaultValue;
  }

  var result = templateFunc(model);

  if (!isString_default()(result)) {
    result = defaultValue;
  }

  return result;
}
;// CONCATENATED MODULE: ./src/components/popup/dateSelector.tsx












var dateSelector_classNames = {
  datePickerContainer: cls('datepicker-container'),
  datePicker: cls('popup-section-item', 'popup-date-picker'),
  allday: cls('popup-section-item', 'popup-section-allday'),
  dateIcon: cls('icon', 'ic-date'),
  dateDash: cls('popup-date-dash'),
  content: cls('content')
};
var DateSelector = R(function DateSelector(_ref, ref) {
  var start = _ref.start,
      end = _ref.end,
      _ref$isAllday = _ref.isAllday,
      isAllday = _ref$isAllday === void 0 ? false : _ref$isAllday,
      formStateDispatch = _ref.formStateDispatch;

  var _useStore = useStore(optionsSelector),
      usageStatistics = _useStore.usageStatistics;

  var startPickerContainerRef = hooks_module_s(null);
  var startPickerInputRef = hooks_module_s(null);
  var endPickerContainerRef = hooks_module_s(null);
  var endPickerInputRef = hooks_module_s(null);
  var startDatePlaceholder = useStringOnlyTemplate({
    template: 'startDatePlaceholder',
    defaultValue: 'Start Date'
  });
  var endDatePlaceholder = useStringOnlyTemplate({
    template: 'endDatePlaceholder',
    defaultValue: 'End Date'
  });

  var toggleAllday = function toggleAllday() {
    return formStateDispatch({
      type: FormStateActionType.setAllday,
      isAllday: !isAllday
    });
  };

  hooks_module_(function () {
    if (startPickerContainerRef.current && startPickerInputRef.current && endPickerContainerRef.current && endPickerInputRef.current) {
      var startDate = new date_TZDate(start);
      var endDate = new date_TZDate(end); // NOTE: Setting default start/end time when editing allday event first time.
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
          usageStatistics: usageStatistics
        },
        usageStatistics: usageStatistics
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




var EVENT_STATES = ['Busy', 'Free'];
var stateDropdownMenu_classNames = {
  popupSectionItem: cls('popup-section-item', 'dropdown-menu-item'),
  dropdownMenu: cls('dropdown-menu'),
  icon: cls('icon'),
  content: cls('content')
};
function StateDropdownMenu(_ref) {
  var setOpened = _ref.setOpened,
      setEventState = _ref.setEventState;

  var onClickDropdown = function onClickDropdown(e, state) {
    e.stopPropagation();
    setOpened(false);
    setEventState(state);
  };

  return h("ul", {
    className: stateDropdownMenu_classNames.dropdownMenu
  }, EVENT_STATES.map(function (state) {
    return h("li", {
      key: state,
      className: stateDropdownMenu_classNames.popupSectionItem,
      onClick: function onClick(e) {
        return onClickDropdown(e, state);
      }
    }, h("span", {
      className: stateDropdownMenu_classNames.icon
    }), h("span", {
      className: stateDropdownMenu_classNames.content
    }, state === 'Busy' ? h(Template, {
      template: "popupStateBusy"
    }) : h(Template, {
      template: "popupStateFree"
    })));
  }));
}
;// CONCATENATED MODULE: ./src/components/popup/eventStateSelector.tsx







var eventStateSelector_classNames = {
  popupSection: ['dropdown-section', 'state-section'],
  popupSectionItem: cls('popup-section-item', 'popup-button'),
  stateIcon: cls('icon', 'ic-state'),
  arrowIcon: cls('icon', 'ic-dropdown-arrow'),
  content: cls('content', 'event-state')
};
function EventStateSelector(_ref) {
  var _ref$eventState = _ref.eventState,
      eventState = _ref$eventState === void 0 ? 'Busy' : _ref$eventState,
      formStateDispatch = _ref.formStateDispatch;

  var _useDropdownState = useDropdownState(),
      isOpened = _useDropdownState.isOpened,
      setOpened = _useDropdownState.setOpened,
      toggleDropdown = _useDropdownState.toggleDropdown;

  var handleChangeEventState = function handleChangeEventState(state) {
    return formStateDispatch({
      type: FormStateActionType.setState,
      state: state
    });
  };

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





var locationInputBox_classNames = {
  popupSectionItem: cls('popup-section-item', 'popup-section-location'),
  locationIcon: cls('icon', 'ic-location'),
  content: cls('content')
};
function LocationInputBox(_ref) {
  var location = _ref.location,
      formStateDispatch = _ref.formStateDispatch;
  var locationPlaceholder = useStringOnlyTemplate({
    template: 'locationPlaceholder',
    defaultValue: 'Location'
  });

  var handleLocationChange = function handleLocationChange(e) {
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





var titleInputBox_classNames = {
  popupSectionItem: cls('popup-section-item', 'popup-section-title'),
  privateButton: cls('popup-section-item', 'popup-section-private', 'popup-button'),
  titleIcon: cls('icon', 'ic-title'),
  content: cls('content')
};
function TitleInputBox(_ref) {
  var title = _ref.title,
      _ref$isPrivate = _ref.isPrivate,
      isPrivate = _ref$isPrivate === void 0 ? false : _ref$isPrivate,
      formStateDispatch = _ref.formStateDispatch;
  var titlePlaceholder = useStringOnlyTemplate({
    template: 'titlePlaceholder',
    defaultValue: 'Subject'
  });

  var togglePrivate = function togglePrivate() {
    return formStateDispatch({
      type: FormStateActionType.setPrivate,
      isPrivate: !isPrivate
    });
  };

  var handleInputChange = function handleInputChange(e) {
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
function eventFormPopup_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function eventFormPopup_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? eventFormPopup_ownKeys(Object(source), !0).forEach(function (key) { eventFormPopup_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : eventFormPopup_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function eventFormPopup_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function eventFormPopup_slicedToArray(arr, i) { return eventFormPopup_arrayWithHoles(arr) || eventFormPopup_iterableToArrayLimit(arr, i) || eventFormPopup_unsupportedIterableToArray(arr, i) || eventFormPopup_nonIterableRest(); }

function eventFormPopup_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function eventFormPopup_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return eventFormPopup_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return eventFormPopup_arrayLikeToArray(o, minLen); }

function eventFormPopup_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function eventFormPopup_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function eventFormPopup_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }













































var eventFormPopup_classNames = {
  popupContainer: cls('popup-container'),
  formContainer: cls('form-container'),
  popupArrowBorder: cls('popup-arrow-border'),
  popupArrowFill: cls('popup-arrow-fill')
};

function eventFormPopup_calculatePopupPosition(popupArrowPointPosition, layoutRect, popupRect) {
  var top = popupArrowPointPosition.top - popupRect.height - HALF_OF_POPUP_ARROW_HEIGHT;
  var left = popupArrowPointPosition.left - popupRect.width / 2;
  var direction = FormPopupArrowDirection.bottom;

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
    direction: direction
  };
}

function isBooleanKey(key) {
  return BOOLEAN_KEYS_OF_EVENT_MODEL_DATA.indexOf(key) !== -1;
}

function getChanges(event, eventObject) {
  return Object.entries(eventObject).reduce(function (changes, _ref) {
    var _ref2 = eventFormPopup_slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var eventObjectKey = key;

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

  var _useStore = useStore(calendarSelector),
      calendars = _useStore.calendars;

  var _useDispatch = useDispatch('popup'),
      hideAllPopup = _useDispatch.hideAllPopup;

  var popupParams = useStore(eventFormPopupParamSelector);

  var _ref3 = popupParams !== null && popupParams !== void 0 ? popupParams : {},
      start = _ref3.start,
      end = _ref3.end,
      popupArrowPointPosition = _ref3.popupArrowPointPosition,
      close = _ref3.close,
      isCreationPopup = _ref3.isCreationPopup,
      event = _ref3.event;

  var eventBus = useEventBus();
  var formPopupSlot = useFloatingLayer('formPopupSlot');

  var _useFormState = useFormState((_calendars$ = calendars[0]) === null || _calendars$ === void 0 ? void 0 : _calendars$.id),
      _useFormState2 = eventFormPopup_slicedToArray(_useFormState, 2),
      formState = _useFormState2[0],
      formStateDispatch = _useFormState2[1];

  var datePickerRef = hooks_module_s(null);
  var popupContainerRef = hooks_module_s(null);

  var _useState = hooks_module_y({}),
      _useState2 = eventFormPopup_slicedToArray(_useState, 2),
      style = _useState2[0],
      setStyle = _useState2[1];

  var _useState3 = hooks_module_y(0),
      _useState4 = eventFormPopup_slicedToArray(_useState3, 2),
      arrowLeft = _useState4[0],
      setArrowLeft = _useState4[1];

  var _useState5 = hooks_module_y(FormPopupArrowDirection.bottom),
      _useState6 = eventFormPopup_slicedToArray(_useState5, 2),
      arrowDirection = _useState6[0],
      setArrowDirection = _useState6[1];

  var layoutContainer = useLayoutContainer();
  var popupArrowClassName = F(function () {
    var top = arrowDirection === FormPopupArrowDirection.top;
    var bottom = arrowDirection === FormPopupArrowDirection.bottom;
    return cls('popup-arrow', {
      top: top,
      bottom: bottom
    });
  }, [arrowDirection]);
  hooks_module_h(function () {
    if (popupContainerRef.current && popupArrowPointPosition && layoutContainer) {
      var layoutRect = layoutContainer.getBoundingClientRect();
      var popupRect = popupContainerRef.current.getBoundingClientRect();

      var _calculatePopupPositi = eventFormPopup_calculatePopupPosition(popupArrowPointPosition, layoutRect, popupRect),
          top = _calculatePopupPositi.top,
          left = _calculatePopupPositi.left,
          direction = _calculatePopupPositi.direction;

      var arrowLeftPosition = popupArrowPointPosition.left - left;
      setStyle({
        left: left,
        top: top
      });
      setArrowLeft(arrowLeftPosition);
      setArrowDirection(direction);
    }
  }, [layoutContainer, popupArrowPointPosition]); // Sync store's popupParams with formState when editing event

  hooks_module_(function () {
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

  hooks_module_(function () {
    if (type_isNil(popupParams)) {
      formStateDispatch({
        type: FormStateActionType.reset
      });
    }
  }, [formStateDispatch, popupParams]);

  if (type_isNil(start) || type_isNil(end) || type_isNil(formPopupSlot)) {
    return null;
  }

  var onSubmit = function onSubmit(e) {
    var _datePickerRef$curren, _datePickerRef$curren2;

    e.preventDefault();
    var formData = new FormData(e.target);

    var eventData = eventFormPopup_objectSpread({}, formState);

    formData.forEach(function (data, key) {
      eventData[key] = isBooleanKey(key) ? data === 'true' : data;
    });
    eventData.start = new date_TZDate((_datePickerRef$curren = datePickerRef.current) === null || _datePickerRef$curren === void 0 ? void 0 : _datePickerRef$curren.getStartDate());
    eventData.end = new date_TZDate((_datePickerRef$curren2 = datePickerRef.current) === null || _datePickerRef$curren2 === void 0 ? void 0 : _datePickerRef$curren2.getEndDate());

    if (isCreationPopup) {
      eventBus.fire('beforeCreateEvent', eventData);
    } else if (event) {
      var changes = getChanges(event, eventData);
      eventBus.fire('beforeUpdateEvent', {
        event: event.toEventObject(),
        changes: changes
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
  return Object.values(state.popup).find(function (popup) {
    return isPresent(popup);
  });
}

function PopupOverlay() {
  var shownPopupParam = useStore(shownPopupParamSelector);

  var _useDispatch = useDispatch('popup'),
      hideAllPopup = _useDispatch.hideAllPopup;

  var isPopupShown = isPresent(shownPopupParam);

  var onClick = function onClick(ev) {
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



















var seeMoreEventsPopup_classNames = {
  container: cls('see-more-container'),
  seeMore: cls('see-more'),
  header: cls('see-more-header'),
  list: cls('month-more-list')
};
function SeeMoreEventsPopup() {
  var popupParams = useStore(seeMorePopupParamSelector);

  var _ref = popupParams !== null && popupParams !== void 0 ? popupParams : {},
      date = _ref.date,
      _ref$events = _ref.events,
      events = _ref$events === void 0 ? [] : _ref$events,
      popupPosition = _ref.popupPosition;

  var _useMonthTheme = useMonthTheme(),
      moreView = _useMonthTheme.moreView,
      moreViewTitle = _useMonthTheme.moreViewTitle;

  var seeMorePopupSlot = useFloatingLayer('seeMorePopupSlot');
  var eventBus = useEventBus();
  var moreEventsPopupContainerRef = hooks_module_s(null);
  var isHidden = type_isNil(date) || type_isNil(popupPosition) || type_isNil(seeMorePopupSlot);
  hooks_module_(function () {
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

  var style = {
    height: MONTH_MORE_VIEW_HEADER_HEIGHT,
    marginBottom: MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM,
    padding: MONTH_MORE_VIEW_HEADER_PADDING,
    backgroundColor: moreViewTitle.backgroundColor
  };
  var moreTitle = {
    ymd: datetime_toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    date: date.getDate().toString().padStart(2, '0')
  };
  var moreViewListStyle = {
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
  }, events.map(function (uiModel) {
    return h(HorizontalEvent, {
      key: "see-more-event-item-".concat(uiModel.cid()),
      uiModel: uiModel,
      eventHeight: MONTH_EVENT_HEIGHT,
      headerHeight: MONTH_MORE_VIEW_HEADER_HEIGHT,
      flat: true
    });
  })))), seeMorePopupSlot);
}
;// CONCATENATED MODULE: ./src/components/layout.tsx
function layout_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function layout_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? layout_ownKeys(Object(source), !0).forEach(function (key) { layout_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : layout_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function layout_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





















function layout_slicedToArray(arr, i) { return layout_arrayWithHoles(arr) || layout_iterableToArrayLimit(arr, i) || layout_unsupportedIterableToArray(arr, i) || layout_nonIterableRest(); }

function layout_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function layout_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return layout_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return layout_arrayLikeToArray(o, minLen); }

function layout_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function layout_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function layout_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
















function getLayoutStylesFromInfo(width, height) {
  var styles = {
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
  var children = _ref.children,
      width = _ref.width,
      height = _ref.height,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$autoAdjustPanels = _ref.autoAdjustPanels,
      autoAdjustPanels = _ref$autoAdjustPanels === void 0 ? false : _ref$autoAdjustPanels;

  var _useTheme = useTheme(commonThemeSelector),
      backgroundColor = _useTheme.backgroundColor;

  var _useDOMNode = useDOMNode(),
      _useDOMNode2 = layout_slicedToArray(_useDOMNode, 2),
      container = _useDOMNode2[0],
      containerRefCallback = _useDOMNode2[1];

  var _useDispatch = useDispatch('weekViewLayout'),
      setLastPanelType = _useDispatch.setLastPanelType,
      updateLayoutHeight = _useDispatch.updateLayoutHeight;

  var layoutClassName = F(function () {
    return "".concat(cls('layout'), " ").concat(className);
  }, [className]);
  hooks_module_h(function () {
    if (container) {
      var onResizeWindow = function onResizeWindow() {
        return updateLayoutHeight(container.offsetHeight);
      };

      onResizeWindow();
      window.addEventListener('resize', onResizeWindow);
      return function () {
        return window.removeEventListener('resize', onResizeWindow);
      };
    }

    return noop;
  }, [container, updateLayoutHeight]);
  hooks_module_h(function () {
    if (container && autoAdjustPanels) {
      var childArray = x(children);
      var lastChild = childArray[childArray.length - 1];

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
    style: layout_objectSpread(layout_objectSpread({}, getLayoutStylesFromInfo(width, height)), {}, {
      backgroundColor: backgroundColor
    })
  }, container ? children : null), h(EventFormPopup, null), h(EventDetailPopup, null), h(SeeMoreEventsPopup, null), h(PopupOverlay, null));
}
;// CONCATENATED MODULE: ./src/components/panelResizer.tsx
function panelResizer_slicedToArray(arr, i) { return panelResizer_arrayWithHoles(arr) || panelResizer_iterableToArrayLimit(arr, i) || panelResizer_unsupportedIterableToArray(arr, i) || panelResizer_nonIterableRest(); }

function panelResizer_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function panelResizer_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return panelResizer_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return panelResizer_arrayLikeToArray(o, minLen); }

function panelResizer_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function panelResizer_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function panelResizer_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function panelResizer_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function panelResizer_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? panelResizer_ownKeys(Object(source), !0).forEach(function (key) { panelResizer_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : panelResizer_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function panelResizer_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



























function getDefaultStyle(height, border) {
  return {
    height: height,
    width: '100%',
    cursor: 'row-resize',
    borderTop: border,
    borderBottom: border
  };
}

function PanelResizer(_ref) {
  var name = _ref.name,
      height = _ref.height;
  var border = useTheme(hooks_module_T(function (theme) {
    return theme.week.panelResizer.border;
  }, []));
  var style = getDefaultStyle(height, border);

  var defaultGuideStyle = panelResizer_objectSpread(panelResizer_objectSpread({}, style), {}, {
    display: 'none',
    border: 'none',
    backgroundColor: '#999'
  });

  var _useState = hooks_module_y(defaultGuideStyle),
      _useState2 = panelResizer_slicedToArray(_useState, 2),
      guideStyle = _useState2[0],
      setGuideStyle = _useState2[1];

  var startPos = hooks_module_s(null);

  var _useDispatch = useDispatch('weekViewLayout'),
      updateDayGridRowHeightByDiff = _useDispatch.updateDayGridRowHeightByDiff;

  var onMouseDown = useDrag(DRAGGING_TYPE_CONSTANTS.panelResizer, {
    onDragStart: function onDragStart(e) {
      startPos.current = {
        left: e.pageX,
        top: e.pageY
      };
    },
    onDrag: function onDrag(e) {
      if (startPos.current) {
        var top = e.pageY - startPos.current.top;
        setGuideStyle(function (prev) {
          return panelResizer_objectSpread(panelResizer_objectSpread({}, prev), {}, {
            top: top,
            display: null
          });
        });
      }
    },
    onMouseUp: function onMouseUp(e) {
      if (startPos.current) {
        var diff = e.pageY - startPos.current.top;
        startPos.current = null;
        setGuideStyle(defaultGuideStyle);
        updateDayGridRowHeightByDiff({
          rowName: name,
          diff: diff
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











function panel_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function panel_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? panel_ownKeys(Object(source), !0).forEach(function (key) { panel_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : panel_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function panel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











function getPanelSide(side, maxExpandableSide) {
  return maxExpandableSide ? Math.min(maxExpandableSide, side) : side;
}

function getPanelStyle(_ref) {
  var initialHeight = _ref.initialHeight,
      initialWidth = _ref.initialWidth,
      overflowX = _ref.overflowX,
      overflowY = _ref.overflowY,
      maxExpandableWidth = _ref.maxExpandableWidth,
      maxExpandableHeight = _ref.maxExpandableHeight,
      minHeight = _ref.minHeight,
      maxHeight = _ref.maxHeight,
      minWidth = _ref.minWidth,
      maxWidth = _ref.maxWidth;
  var style = {};

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

  return panel_objectSpread(panel_objectSpread({}, style), {}, {
    minHeight: minHeight,
    maxHeight: maxHeight,
    minWidth: minWidth,
    maxWidth: maxWidth
  });
}

var Panel = R(function Panel(_ref2, ref) {
  var name = _ref2.name,
      _ref2$initialWidth = _ref2.initialWidth,
      initialWidth = _ref2$initialWidth === void 0 ? DEFAULT_PANEL_HEIGHT : _ref2$initialWidth,
      _ref2$initialHeight = _ref2.initialHeight,
      initialHeight = _ref2$initialHeight === void 0 ? DEFAULT_PANEL_HEIGHT : _ref2$initialHeight,
      overflowX = _ref2.overflowX,
      overflowY = _ref2.overflowY,
      maxExpandableWidth = _ref2.maxExpandableWidth,
      maxExpandableHeight = _ref2.maxExpandableHeight,
      minHeight = _ref2.minHeight,
      maxHeight = _ref2.maxHeight,
      minWidth = _ref2.minWidth,
      maxWidth = _ref2.maxWidth,
      _ref2$resizerWidth = _ref2.resizerWidth,
      resizerWidth = _ref2$resizerWidth === void 0 ? DEFAULT_RESIZER_LENGTH : _ref2$resizerWidth,
      _ref2$resizerHeight = _ref2.resizerHeight,
      resizerHeight = _ref2$resizerHeight === void 0 ? DEFAULT_RESIZER_LENGTH : _ref2$resizerHeight,
      resizable = _ref2.resizable,
      children = _ref2.children;

  var _useDispatch = useDispatch('weekViewLayout'),
      updateDayGridRowHeight = _useDispatch.updateDayGridRowHeight;

  var _useStore = useStore(hooks_module_T(function (state) {
    var _state$weekViewLayout;

    return (_state$weekViewLayout = state.weekViewLayout.dayGridRows[name]) !== null && _state$weekViewLayout !== void 0 ? _state$weekViewLayout : {};
  }, [name])),
      dayGridRowHeight = _useStore.height;

  var height = dayGridRowHeight !== null && dayGridRowHeight !== void 0 ? dayGridRowHeight : initialHeight;
  hooks_module_h(function () {
    updateDayGridRowHeight({
      rowName: name,
      height: initialHeight
    });
  }, [initialHeight, name, updateDayGridRowHeight]);
  var styles = getPanelStyle({
    initialWidth: initialWidth,
    initialHeight: height,
    overflowX: overflowX,
    overflowY: overflowY,
    maxExpandableWidth: maxExpandableWidth,
    maxExpandableHeight: maxExpandableHeight,
    minHeight: minHeight,
    maxHeight: maxHeight,
    minWidth: minWidth,
    maxWidth: maxWidth
  });
  var isResizable = F(function () {
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
var className = 'timegrid';
var addTimeGridPrefix = function addTimeGridPrefix(selector) {
  return "".concat(className, "-").concat(selector);
};
var timeFormats = {
  second: 'HH:mm:ss',
  minute: 'HH:mm',
  hour: 'HH:mm',
  date: 'HH:mm',
  month: 'MM.DD',
  year: 'YYYY.MM.DD'
};
;// CONCATENATED MODULE: ./src/components/events/timeEvent.tsx
function timeEvent_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function timeEvent_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? timeEvent_ownKeys(Object(source), !0).forEach(function (key) { timeEvent_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : timeEvent_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function timeEvent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function timeEvent_slicedToArray(arr, i) { return timeEvent_arrayWithHoles(arr) || timeEvent_iterableToArrayLimit(arr, i) || timeEvent_unsupportedIterableToArray(arr, i) || timeEvent_nonIterableRest(); }

function timeEvent_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function timeEvent_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return timeEvent_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return timeEvent_arrayLikeToArray(o, minLen); }

function timeEvent_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function timeEvent_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function timeEvent_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




































var timeEvent_classNames = {
  time: cls('event-time'),
  content: cls('event-time-content'),
  travelTime: cls('travel-time'),
  resizeHandleX: cls('resize-handler-x'),
  moveEvent: cls('dragging--move-event'),
  resizeEvent: cls('dragging--resize-vertical-event')
};

function getMarginLeft(left) {
  var _extractPercentPx = extractPercentPx("".concat(left)),
      percent = _extractPercentPx.percent,
      px = _extractPercentPx.px;

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
  var uiModel = _ref.uiModel,
      isDraggingTarget = _ref.isDraggingTarget,
      hasNextStartTime = _ref.hasNextStartTime,
      calendarColor = _ref.calendarColor,
      minHeight = _ref.minHeight;
  var top = uiModel.top,
      left = uiModel.left,
      height = uiModel.height,
      width = uiModel.width,
      duplicateLeft = uiModel.duplicateLeft,
      duplicateWidth = uiModel.duplicateWidth,
      goingDurationHeight = uiModel.goingDurationHeight,
      modelDurationHeight = uiModel.modelDurationHeight,
      comingDurationHeight = uiModel.comingDurationHeight,
      croppedStart = uiModel.croppedStart,
      croppedEnd = uiModel.croppedEnd; // TODO: check and get theme values

  var travelBorderColor = 'white';
  var borderRadius = 2;
  var defaultMarginBottom = 2;
  var marginLeft = getMarginLeft(left);

  var _getEventColors = getEventColors(uiModel, calendarColor),
      color = _getEventColors.color,
      backgroundColor = _getEventColors.backgroundColor,
      borderColor = _getEventColors.borderColor,
      dragBackgroundColor = _getEventColors.dragBackgroundColor;

  var containerStyle = {
    width: getContainerWidth(duplicateWidth || width, marginLeft),
    height: "calc(".concat(toPercent(Math.max(height, minHeight)), " - ").concat(defaultMarginBottom, "px)"),
    top: toPercent(top),
    left: duplicateLeft || toPercent(left),
    borderRadius: borderRadius,
    borderLeft: "3px solid ".concat(borderColor),
    marginLeft: marginLeft,
    color: color,
    backgroundColor: isDraggingTarget ? dragBackgroundColor : backgroundColor,
    opacity: isDraggingTarget ? 0.5 : 1,
    zIndex: hasNextStartTime ? 1 : 0
  };
  var goingDurationStyle = {
    height: toPercent(goingDurationHeight),
    borderBottom: "1px dashed ".concat(travelBorderColor)
  };
  var modelDurationStyle = {
    height: toPercent(modelDurationHeight)
  };
  var comingDurationStyle = {
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
    containerStyle: containerStyle,
    goingDurationStyle: goingDurationStyle,
    modelDurationStyle: modelDurationStyle,
    comingDurationStyle: comingDurationStyle
  };
}

function isDraggableEvent(_ref2) {
  var uiModel = _ref2.uiModel,
      isReadOnlyCalendar = _ref2.isReadOnlyCalendar,
      isDraggingTarget = _ref2.isDraggingTarget,
      hasNextStartTime = _ref2.hasNextStartTime;
  var model = uiModel.model;
  return !isReadOnlyCalendar && !model.isReadOnly && !isDraggingTarget && !hasNextStartTime;
} // eslint-disable-next-line complexity


function TimeEvent(_ref3) {
  var uiModel = _ref3.uiModel,
      nextStartTime = _ref3.nextStartTime,
      _ref3$isResizingGuide = _ref3.isResizingGuide,
      isResizingGuide = _ref3$isResizingGuide === void 0 ? false : _ref3$isResizingGuide,
      _ref3$minHeight = _ref3.minHeight,
      minHeight = _ref3$minHeight === void 0 ? 0 : _ref3$minHeight;

  var _useStore = useStore(optionsSelector),
      useDetailPopup = _useStore.useDetailPopup,
      isReadOnlyCalendar = _useStore.isReadOnly,
      weekOptions = _useStore.week;

  var calendarColor = useCalendarColor(uiModel.model);
  var collapseDuplicateEvents = weekOptions.collapseDuplicateEvents;
  var layoutContainer = useLayoutContainer();

  var _useDispatch = useDispatch('popup'),
      showDetailPopup = _useDispatch.showDetailPopup;

  var _useDispatch2 = useDispatch('dnd'),
      setDraggingEventUIModel = _useDispatch2.setDraggingEventUIModel;

  var _useDispatch3 = useDispatch('weekViewLayout'),
      setSelectedDuplicateEventCid = _useDispatch3.setSelectedDuplicateEventCid;

  var eventBus = useEventBus();
  var eventContainerRef = hooks_module_s(null);

  var _useState = hooks_module_y(false),
      _useState2 = timeEvent_slicedToArray(_useState, 2),
      isDraggingTarget = _useState2[0],
      setIsDraggingTarget = _useState2[1];

  var model = uiModel.model,
      goingDurationHeight = uiModel.goingDurationHeight,
      modelDurationHeight = uiModel.modelDurationHeight,
      comingDurationHeight = uiModel.comingDurationHeight,
      croppedEnd = uiModel.croppedEnd;
  var id = model.id,
      calendarId = model.calendarId,
      customStyle = model.customStyle;
  var hasNextStartTime = isPresent(nextStartTime);

  var _getStyles = getStyles({
    uiModel: uiModel,
    isDraggingTarget: isDraggingTarget,
    hasNextStartTime: hasNextStartTime,
    calendarColor: calendarColor,
    minHeight: minHeight
  }),
      containerStyle = _getStyles.containerStyle,
      goingDurationStyle = _getStyles.goingDurationStyle,
      modelDurationStyle = _getStyles.modelDurationStyle,
      comingDurationStyle = _getStyles.comingDurationStyle;

  var isGuide = hasNextStartTime || isResizingGuide;
  useTransientUpdate(dndSelector, function (_ref4) {
    var draggingEventUIModel = _ref4.draggingEventUIModel,
        draggingState = _ref4.draggingState;

    if (draggingState === DraggingState.DRAGGING && (draggingEventUIModel === null || draggingEventUIModel === void 0 ? void 0 : draggingEventUIModel.cid()) === uiModel.cid() && !hasNextStartTime && !isResizingGuide) {
      setIsDraggingTarget(true);
    } else {
      setIsDraggingTarget(false);
    }
  });
  hooks_module_(function () {
    if (!isResizingGuide) {
      eventBus.fire('afterRenderEvent', uiModel.model.toEventObject());
    } // This effect is only for the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  var startDragEvent = function startDragEvent(className) {
    setDraggingEventUIModel(uiModel);
    layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.classList.add(className);
  };

  var endDragEvent = function endDragEvent(className) {
    setIsDraggingTarget(false);
    layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.classList.remove(className);
  };

  var onMoveStart = useDrag(DRAGGING_TYPE_CREATORS.moveEvent('timeGrid', "".concat(uiModel.cid())), {
    onDragStart: function onDragStart() {
      if (isDraggable) {
        startDragEvent(timeEvent_classNames.moveEvent);
      }
    },
    onMouseUp: function onMouseUp(e, _ref5) {
      var draggingState = _ref5.draggingState;
      endDragEvent(timeEvent_classNames.moveEvent);
      var isClick = draggingState <= DraggingState.INIT;

      if (isClick && collapseDuplicateEvents) {
        var selectedDuplicateEventCid = uiModel.duplicateEvents.length > 0 ? uiModel.cid() : DEFAULT_DUPLICATE_EVENT_CID;
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
    onPressESCKey: function onPressESCKey() {
      return endDragEvent(timeEvent_classNames.moveEvent);
    }
  });

  var handleMoveStart = function handleMoveStart(e) {
    e.stopPropagation();
    onMoveStart(e);
  };

  var onResizeStart = useDrag(DRAGGING_TYPE_CREATORS.resizeEvent('timeGrid', "".concat(uiModel.cid())), {
    onDragStart: function onDragStart() {
      return startDragEvent(timeEvent_classNames.resizeEvent);
    },
    onMouseUp: function onMouseUp() {
      return endDragEvent(timeEvent_classNames.resizeEvent);
    },
    onPressESCKey: function onPressESCKey() {
      return endDragEvent(timeEvent_classNames.resizeEvent);
    }
  });

  var handleResizeStart = function handleResizeStart(e) {
    e.stopPropagation();
    onResizeStart(e);
  };

  var isDraggable = isDraggableEvent({
    uiModel: uiModel,
    isReadOnlyCalendar: isReadOnlyCalendar,
    isDraggingTarget: isDraggingTarget,
    hasNextStartTime: hasNextStartTime
  });
  var shouldShowResizeHandle = isDraggable && !croppedEnd;
  return h("div", {
    "data-testid": "".concat(isGuide ? 'guide-' : '', "time-event-").concat(model.title, "-").concat(uiModel.cid()),
    "data-calendar-id": calendarId,
    "data-event-id": id,
    className: timeEvent_classNames.time,
    style: timeEvent_objectSpread(timeEvent_objectSpread({}, containerStyle), customStyle),
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
    param: timeEvent_objectSpread(timeEvent_objectSpread({}, model.toEventObject()), {}, {
      start: hasNextStartTime ? nextStartTime : model.start
    })
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
  var top = _ref.top,
      height = _ref.height,
      text = _ref.text;

  var _useTheme = useTheme(hooks_module_T(function (theme) {
    return theme.common.gridSelection;
  }, [])),
      backgroundColor = _useTheme.backgroundColor,
      border = _useTheme.border;

  var color = useTheme(hooks_module_T(function (theme) {
    return theme.week.gridSelection.color;
  }, []));
  var style = {
    top: toPercent(top),
    height: toPercent(height),
    backgroundColor: backgroundColor,
    border: border
  };
  return h("div", {
    className: cls('time', 'grid-selection'),
    style: style,
    "data-testid": "time-grid-selection-".concat(top, "-").concat(height)
  }, text.length > 0 ? h("span", {
    className: cls('grid-selection-label'),
    style: {
      color: color
    }
  }, text) : null);
}

function GridSelectionByColumn(_ref2) {
  var columnIndex = _ref2.columnIndex,
      timeGridRows = _ref2.timeGridRows;
  var gridSelectionData = useStore(hooks_module_T(function (state) {
    return timeGridSelectionHelper.calculateSelection(state.gridSelection.timeGrid, columnIndex, timeGridRows.length - 1);
  }, [columnIndex, timeGridRows]));
  var gridSelectionProps = F(function () {
    if (!gridSelectionData) {
      return null;
    }

    var startRowIndex = gridSelectionData.startRowIndex,
        endRowIndex = gridSelectionData.endRowIndex,
        isStartingColumn = gridSelectionData.isStartingColumn,
        isSelectingMultipleColumns = gridSelectionData.isSelectingMultipleColumns;
    var _timeGridRows$startRo = timeGridRows[startRowIndex],
        startRowTop = _timeGridRows$startRo.top,
        startRowStartTime = _timeGridRows$startRo.startTime;
    var _timeGridRows$endRowI = timeGridRows[endRowIndex],
        endRowTop = _timeGridRows$endRowI.top,
        endRowHeight = _timeGridRows$endRowI.height,
        endRowEndTime = _timeGridRows$endRowI.endTime;
    var gridSelectionHeight = endRowTop + endRowHeight - startRowTop;
    var text = "".concat(startRowStartTime, " - ").concat(endRowEndTime);

    if (isSelectingMultipleColumns) {
      text = isStartingColumn ? startRowStartTime : '';
    }

    return {
      top: startRowTop,
      height: gridSelectionHeight,
      text: text
    };
  }, [gridSelectionData, timeGridRows]);

  if (type_isNil(gridSelectionProps)) {
    return null;
  }

  return h(gridSelectionByColumn_GridSelection, gridSelectionProps);
}
;// CONCATENATED MODULE: ./src/hooks/timeGrid/useTimeGridEventResize.ts

















function useTimeGridEventResize_slicedToArray(arr, i) { return useTimeGridEventResize_arrayWithHoles(arr) || useTimeGridEventResize_iterableToArrayLimit(arr, i) || useTimeGridEventResize_unsupportedIterableToArray(arr, i) || useTimeGridEventResize_nonIterableRest(); }

function useTimeGridEventResize_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useTimeGridEventResize_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useTimeGridEventResize_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useTimeGridEventResize_arrayLikeToArray(o, minLen); }

function useTimeGridEventResize_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useTimeGridEventResize_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useTimeGridEventResize_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









function useTimeGridEventResize(_ref) {
  var gridPositionFinder = _ref.gridPositionFinder,
      totalUIModels = _ref.totalUIModels,
      columnIndex = _ref.columnIndex,
      timeGridData = _ref.timeGridData;
  var eventBus = useEventBus();

  var _useDraggingEvent = useDraggingEvent('timeGrid', 'resize'),
      isDraggingEnd = _useDraggingEvent.isDraggingEnd,
      isDraggingCanceled = _useDraggingEvent.isDraggingCanceled,
      resizingStartUIModel = _useDraggingEvent.draggingEvent,
      clearDraggingEvent = _useDraggingEvent.clearDraggingEvent;

  var _useCurrentPointerPos = useCurrentPointerPositionInGrid(gridPositionFinder),
      _useCurrentPointerPos2 = useTimeGridEventResize_slicedToArray(_useCurrentPointerPos, 2),
      currentGridPos = _useCurrentPointerPos2[0],
      clearCurrentGridPos = _useCurrentPointerPos2[1];

  var _useState = hooks_module_y(null),
      _useState2 = useTimeGridEventResize_slicedToArray(_useState, 2),
      guideUIModel = _useState2[0],
      setGuideUIModel = _useState2[1];

  var clearStates = hooks_module_T(function () {
    setGuideUIModel(null);
    clearDraggingEvent();
    clearCurrentGridPos();
  }, [clearCurrentGridPos, clearDraggingEvent]);
  var baseResizingInfo = F(function () {
    if (type_isNil(resizingStartUIModel)) {
      return null;
    }

    var columns = timeGridData.columns,
        rows = timeGridData.rows;
    /**
     * Filter UIModels that are made from the target event.
     */

    var resizeTargetUIModelColumns = totalUIModels.map(function (uiModels) {
      return uiModels.filter(function (uiModel) {
        return uiModel.cid() === resizingStartUIModel.cid();
      });
    });

    var findRowIndexOf = function findRowIndexOf(targetDate, targetColumnIndex) {
      return function (row) {
        var rowStartTZDate = setTimeStrToDate(columns[targetColumnIndex].date, row.startTime);
        var rowEndTZDate = setTimeStrToDate(timeGridData.columns[targetColumnIndex].date, row.endTime);
        return rowStartTZDate <= targetDate && targetDate < rowEndTZDate;
      };
    };

    var eventStartDateColumnIndex = resizeTargetUIModelColumns.findIndex(function (row) {
      return row.length > 0;
    });
    var resizingStartEventUIModel = resizeTargetUIModelColumns[eventStartDateColumnIndex][0];
    var _resizingStartEventUI = resizingStartEventUIModel.model.goingDuration,
        goingDuration = _resizingStartEventUI === void 0 ? 0 : _resizingStartEventUI;
    var renderStart = addMinutes(resizingStartEventUIModel.getStarts(), -goingDuration);
    var eventStartDateRowIndex = Math.max(rows.findIndex(findRowIndexOf(renderStart, eventStartDateColumnIndex)), 0); // when it is -1, the event starts before the current view.

    var eventEndDateColumnIndex = findLastIndex(resizeTargetUIModelColumns, function (row) {
      return row.length > 0;
    });
    var resizingEndEventUIModel = resizeTargetUIModelColumns[eventEndDateColumnIndex][0];
    var _resizingEndEventUIMo = resizingEndEventUIModel.model.comingDuration,
        comingDuration = _resizingEndEventUIMo === void 0 ? 0 : _resizingEndEventUIMo;
    var renderEnd = addMinutes(resizingEndEventUIModel.getStarts(), comingDuration);
    var eventEndDateRowIndex = rows.findIndex(findRowIndexOf(renderEnd, eventEndDateColumnIndex)); // when it is -1, the event ends after the current view.

    eventEndDateRowIndex = eventEndDateRowIndex >= 0 ? eventEndDateRowIndex : rows.length - 1;
    return {
      eventStartDateColumnIndex: eventStartDateColumnIndex,
      eventStartDateRowIndex: eventStartDateRowIndex,
      eventEndDateColumnIndex: eventEndDateColumnIndex,
      eventEndDateRowIndex: eventEndDateRowIndex,
      resizeTargetUIModelColumns: resizeTargetUIModelColumns
    };
  }, [resizingStartUIModel, timeGridData, totalUIModels]);
  var canCalculateGuideUIModel = isPresent(baseResizingInfo) && isPresent(resizingStartUIModel) && isPresent(currentGridPos);
  var oneRowHeight = F(function () {
    return baseResizingInfo ? timeGridData.rows[0].height : 0;
  }, [baseResizingInfo, timeGridData.rows]); // When drag an one-day event

  hooks_module_(function () {
    if (canCalculateGuideUIModel) {
      var eventStartDateRowIndex = baseResizingInfo.eventStartDateRowIndex,
          eventStartDateColumnIndex = baseResizingInfo.eventStartDateColumnIndex,
          eventEndDateColumnIndex = baseResizingInfo.eventEndDateColumnIndex;

      if (columnIndex === eventEndDateColumnIndex && eventStartDateColumnIndex === eventEndDateColumnIndex) {
        var clonedUIModel = resizingStartUIModel.clone();
        var height = clonedUIModel.height,
            goingDurationHeight = clonedUIModel.goingDurationHeight,
            comingDurationHeight = clonedUIModel.comingDurationHeight;
        var newHeight = Math.max(oneRowHeight + goingDurationHeight * height / 100 + comingDurationHeight * height / 100, timeGridData.rows[currentGridPos.rowIndex].top - timeGridData.rows[eventStartDateRowIndex].top + oneRowHeight);
        var newGoingDurationHeight = goingDurationHeight * height / newHeight;
        var newComingDurationHeight = comingDurationHeight * height / newHeight;
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

  hooks_module_(function () {
    if (canCalculateGuideUIModel) {
      var resizeTargetUIModelColumns = baseResizingInfo.resizeTargetUIModelColumns,
          eventStartDateColumnIndex = baseResizingInfo.eventStartDateColumnIndex,
          eventEndDateColumnIndex = baseResizingInfo.eventEndDateColumnIndex;

      if ((columnIndex === eventStartDateColumnIndex || columnIndex === eventEndDateColumnIndex) && eventStartDateColumnIndex !== eventEndDateColumnIndex) {
        var clonedUIModel;

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
  useWhen(function () {
    var shouldUpdate = !isDraggingCanceled && isPresent(baseResizingInfo) && isPresent(currentGridPos) && isPresent(resizingStartUIModel) && baseResizingInfo.eventEndDateColumnIndex === columnIndex;

    if (shouldUpdate) {
      var _resizingStartUIModel = resizingStartUIModel.model.comingDuration,
          comingDuration = _resizingStartUIModel === void 0 ? 0 : _resizingStartUIModel;
      var targetEndDate = addMinutes(setTimeStrToDate(timeGridData.columns[columnIndex].date, timeGridData.rows[currentGridPos.rowIndex].endTime), -comingDuration);
      var minEndDate = addMinutes(resizingStartUIModel.getStarts(), 30);
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
  var gridPositionFinder = _ref.gridPositionFinder,
      totalUIModels = _ref.totalUIModels,
      columnIndex = _ref.columnIndex,
      timeGridData = _ref.timeGridData;
  var guideUIModel = useTimeGridEventResize({
    gridPositionFinder: gridPositionFinder,
    totalUIModels: totalUIModels,
    columnIndex: columnIndex,
    timeGridData: timeGridData
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
function column_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function column_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? column_ownKeys(Object(source), !0).forEach(function (key) { column_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : column_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function column_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function column_slicedToArray(arr, i) { return column_arrayWithHoles(arr) || column_iterableToArrayLimit(arr, i) || column_unsupportedIterableToArray(arr, i) || column_nonIterableRest(); }

function column_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function column_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return column_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return column_arrayLikeToArray(o, minLen); }

function column_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function column_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function column_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }































var column_classNames = {
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
  var eventUIModels = _ref.eventUIModels,
      minEventHeight = _ref.minEventHeight;
  // @TODO: use dynamic value
  var style = {
    marginRight: 8
  };
  return h("div", {
    className: column_classNames.events,
    style: style
  }, eventUIModels.map(function (eventUIModel) {
    return h(TimeEvent, {
      key: "".concat(eventUIModel.valueOf(), "-").concat(eventUIModel.cid()),
      uiModel: eventUIModel,
      minHeight: minEventHeight
    });
  }));
}

function backgroundColorSelector(theme) {
  return {
    defaultBackgroundColor: theme.week.dayGrid.backgroundColor,
    todayBackgroundColor: theme.week.today.backgroundColor,
    weekendBackgroundColor: theme.week.weekend.backgroundColor
  };
}

function getBackgroundColor(_ref2) {
  var today = _ref2.today,
      columnDate = _ref2.columnDate,
      defaultBackgroundColor = _ref2.defaultBackgroundColor,
      todayBackgroundColor = _ref2.todayBackgroundColor,
      weekendBackgroundColor = _ref2.weekendBackgroundColor;
  var isTodayColumn = isSameDate(today, columnDate);
  var isWeekendColumn = isWeekend(columnDate.getDay());

  if (isTodayColumn) {
    return todayBackgroundColor;
  }

  if (isWeekendColumn) {
    return weekendBackgroundColor;
  }

  return defaultBackgroundColor;
}

var Column = compat_module_g(function Column(_ref3) {
  var columnDate = _ref3.columnDate,
      columnWidth = _ref3.columnWidth,
      columnIndex = _ref3.columnIndex,
      totalUIModels = _ref3.totalUIModels,
      gridPositionFinder = _ref3.gridPositionFinder,
      timeGridData = _ref3.timeGridData,
      isLastColumn = _ref3.isLastColumn;
  var timeGridRows = timeGridData.rows;
  var borderRight = useTheme(hooks_module_T(function (theme) {
    return theme.week.timeGrid.borderRight;
  }, []));
  var backgroundColorTheme = useTheme(backgroundColorSelector);

  var _usePrimaryTimezone = usePrimaryTimezone(),
      _usePrimaryTimezone2 = column_slicedToArray(_usePrimaryTimezone, 2),
      getNow = _usePrimaryTimezone2[1];

  var today = getNow(); // const [startTime, endTime] = useMemo(() => {
  //   const { startTime: startTimeStr } = first(timeGridRows);
  //   const { endTime: endTimeStr } = last(timeGridRows);
  //   const start = setTimeStrToDate(columnDate, startTimeStr);
  //   const end = setTimeStrToDate(columnDate, endTimeStr);
  //   return [start, end];
  // }, [columnDate, timeGridRows]);

  var backgroundColor = getBackgroundColor(column_objectSpread({
    today: today,
    columnDate: columnDate
  }, backgroundColorTheme));
  var style = {
    width: columnWidth,
    backgroundColor: backgroundColor,
    borderRight: isLastColumn ? 'none' : borderRight
  };
  var uiModelsByColumn = totalUIModels[columnIndex];
  var minEventHeight = timeGridRows[0].height;
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

var GridLines = compat_module_g(function GridLines(_ref) {
  var timeGridRows = _ref.timeGridRows;

  var _useTheme = useTheme(gridLineBorderSelector),
      halfHourLineBorder = _useTheme.halfHourLineBorder,
      hourLineBorder = _useTheme.hourLineBorder;

  return h("div", {
    className: cls('gridlines')
  }, timeGridRows.map(function (time, index) {
    var isUpperLine = index % 2 === 0;
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
function useTimeGridEventMove_slicedToArray(arr, i) { return useTimeGridEventMove_arrayWithHoles(arr) || useTimeGridEventMove_iterableToArrayLimit(arr, i) || useTimeGridEventMove_unsupportedIterableToArray(arr, i) || useTimeGridEventMove_nonIterableRest(); }

function useTimeGridEventMove_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useTimeGridEventMove_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useTimeGridEventMove_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useTimeGridEventMove_arrayLikeToArray(o, minLen); }

function useTimeGridEventMove_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useTimeGridEventMove_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useTimeGridEventMove_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
























var THIRTY_MINUTES = 30;

function getCurrentIndexByTime(time, hourStart) {
  var hour = time.getHours() - hourStart;
  var minutes = time.getMinutes();
  return hour * 2 + Math.floor(minutes / THIRTY_MINUTES);
}

function getMovingEventPosition(_ref) {
  var draggingEvent = _ref.draggingEvent,
      columnDiff = _ref.columnDiff,
      rowDiff = _ref.rowDiff,
      timeGridDataRows = _ref.timeGridDataRows,
      currentDate = _ref.currentDate;
  var rowHeight = timeGridDataRows[0].height;
  var maxHeight = rowHeight * timeGridDataRows.length;
  var millisecondsDiff = rowDiff * MS_PER_THIRTY_MINUTES + columnDiff * MS_PER_DAY;
  var hourStart = Number(timeGridDataRows[0].startTime.split(':')[0]);
  var _draggingEvent$model = draggingEvent.model,
      _draggingEvent$model$ = _draggingEvent$model.goingDuration,
      goingDuration = _draggingEvent$model$ === void 0 ? 0 : _draggingEvent$model$,
      _draggingEvent$model$2 = _draggingEvent$model.comingDuration,
      comingDuration = _draggingEvent$model$2 === void 0 ? 0 : _draggingEvent$model$2;
  var goingStart = addMinutes(draggingEvent.getStarts(), -goingDuration);
  var comingEnd = addMinutes(draggingEvent.getEnds(), comingDuration);
  var nextStart = addMilliseconds(goingStart, millisecondsDiff);
  var nextEnd = addMilliseconds(comingEnd, millisecondsDiff);
  var startIndex = Math.max(getCurrentIndexByTime(nextStart, hourStart), 0);
  var endIndex = Math.min(getCurrentIndexByTime(nextEnd, hourStart), timeGridDataRows.length - 1);
  var isStartAtPrevDate = nextStart.getFullYear() < currentDate.getFullYear() || nextStart.getMonth() < currentDate.getMonth() || nextStart.getDate() < currentDate.getDate();
  var isEndAtNextDate = nextEnd.getFullYear() > currentDate.getFullYear() || nextEnd.getMonth() > currentDate.getMonth() || nextEnd.getDate() > currentDate.getDate();
  var indexDiff = endIndex - (isStartAtPrevDate ? 0 : startIndex);
  var top = isStartAtPrevDate ? 0 : timeGridDataRows[startIndex].top;
  var height = isEndAtNextDate ? maxHeight : Math.max(indexDiff, 1) * rowHeight;
  return {
    top: top,
    height: height
  };
}

var initXSelector = function initXSelector(state) {
  return state.dnd.initX;
};

var initYSelector = function initYSelector(state) {
  return state.dnd.initY;
};

function useTimeGridEventMove(_ref2) {
  var gridPositionFinder = _ref2.gridPositionFinder,
      timeGridData = _ref2.timeGridData;
  var initX = useStore(initXSelector);
  var initY = useStore(initYSelector);
  var eventBus = useEventBus();

  var _useDraggingEvent = useDraggingEvent('timeGrid', 'move'),
      isDraggingEnd = _useDraggingEvent.isDraggingEnd,
      isDraggingCanceled = _useDraggingEvent.isDraggingCanceled,
      draggingEvent = _useDraggingEvent.draggingEvent,
      clearDraggingEvent = _useDraggingEvent.clearDraggingEvent;

  var _useCurrentPointerPos = useCurrentPointerPositionInGrid(gridPositionFinder),
      _useCurrentPointerPos2 = useTimeGridEventMove_slicedToArray(_useCurrentPointerPos, 2),
      currentGridPos = _useCurrentPointerPos2[0],
      clearCurrentGridPos = _useCurrentPointerPos2[1];

  var initGridPosRef = hooks_module_s(null);
  hooks_module_(function () {
    if (isPresent(initX) && isPresent(initY)) {
      initGridPosRef.current = gridPositionFinder({
        clientX: initX,
        clientY: initY
      });
    }
  }, [gridPositionFinder, initX, initY]);
  var gridDiff = F(function () {
    if (type_isNil(initGridPosRef.current) || type_isNil(currentGridPos)) {
      return null;
    }

    return {
      columnDiff: currentGridPos.columnIndex - initGridPosRef.current.columnIndex,
      rowDiff: currentGridPos.rowIndex - initGridPosRef.current.rowIndex
    };
  }, [currentGridPos]);
  var startDateTime = F(function () {
    if (type_isNil(draggingEvent)) {
      return null;
    }

    return draggingEvent.getStarts();
  }, [draggingEvent]);
  var clearState = hooks_module_T(function () {
    clearCurrentGridPos();
    clearDraggingEvent();
    initGridPosRef.current = null;
  }, [clearCurrentGridPos, clearDraggingEvent]);
  var nextStartTime = F(function () {
    if (type_isNil(gridDiff) || type_isNil(startDateTime)) {
      return null;
    }

    return addMilliseconds(startDateTime, gridDiff.rowDiff * MS_PER_THIRTY_MINUTES + gridDiff.columnDiff * MS_PER_DAY);
  }, [gridDiff, startDateTime]);
  var movingEvent = F(function () {
    if (type_isNil(draggingEvent) || type_isNil(currentGridPos) || type_isNil(gridDiff)) {
      return null;
    }

    var clonedEvent = draggingEvent.clone();

    var _getMovingEventPositi = getMovingEventPosition({
      draggingEvent: clonedEvent,
      columnDiff: gridDiff.columnDiff,
      rowDiff: gridDiff.rowDiff,
      timeGridDataRows: timeGridData.rows,
      currentDate: timeGridData.columns[currentGridPos.columnIndex].date
    }),
        top = _getMovingEventPositi.top,
        height = _getMovingEventPositi.height;

    clonedEvent.setUIProps({
      left: timeGridData.columns[currentGridPos.columnIndex].left,
      width: timeGridData.columns[currentGridPos.columnIndex].width,
      top: top,
      height: height
    });
    return clonedEvent;
  }, [currentGridPos, draggingEvent, gridDiff, timeGridData.columns, timeGridData.rows]);
  useWhen(function () {
    var shouldUpdate = !isDraggingCanceled && isPresent(draggingEvent) && isPresent(currentGridPos) && isPresent(gridDiff) && isPresent(nextStartTime) && (gridDiff.rowDiff !== 0 || gridDiff.columnDiff !== 0);

    if (shouldUpdate) {
      var duration = draggingEvent.duration();
      var nextEndTime = addMilliseconds(nextStartTime, duration);
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
    movingEvent: movingEvent,
    nextStartTime: nextStartTime
  };
}
;// CONCATENATED MODULE: ./src/components/timeGrid/movingEventShadow.tsx




function movingEventShadow_MovingEventShadow(_ref) {
  var gridPositionFinder = _ref.gridPositionFinder,
      timeGridData = _ref.timeGridData;

  var _useTimeGridEventMove = useTimeGridEventMove({
    gridPositionFinder: gridPositionFinder,
    timeGridData: timeGridData
  }),
      movingEvent = _useTimeGridEventMove.movingEvent,
      nextStartTime = _useTimeGridEventMove.nextStartTime;

  if (type_isNil(movingEvent)) {
    return null;
  }

  return h(TimeEvent, {
    uiModel: movingEvent,
    nextStartTime: nextStartTime
  });
}
;// CONCATENATED MODULE: ./src/test/testIds.ts
var TEST_IDS = {
  NOW_INDICATOR: 'timegrid-now-indicator',
  NOW_INDICATOR_LABEL: 'timegrid-now-indicator-label'
};
;// CONCATENATED MODULE: ./src/components/timeGrid/nowIndicator.tsx









var nowIndicator_classNames = {
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
  var top = _ref.top,
      columnWidth = _ref.columnWidth,
      columnCount = _ref.columnCount,
      columnIndex = _ref.columnIndex;

  var _useTheme = useTheme(nowIndicatorTheme),
      pastBorder = _useTheme.pastBorder,
      todayBorder = _useTheme.todayBorder,
      futureBorder = _useTheme.futureBorder,
      bulletBackgroundColor = _useTheme.bulletBackgroundColor;

  var layoutContainer = useLayoutContainer();
  var eventBus = useEventBus();
  var indicatorRef = hooks_module_s(null);
  var leftLine = {
    left: toPercent(columnWidth * columnIndex),
    width: toPercent(columnWidth * columnIndex)
  };
  var rightLine = {
    left: toPercent(columnWidth * (columnIndex + 1)),
    width: toPercent(columnWidth * (columnCount - columnIndex + 1))
  };
  hooks_module_(function () {
    var scrollToNow = function scrollToNow(behavior) {
      var _layoutContainer$quer;

      var scrollArea = (_layoutContainer$quer = layoutContainer === null || layoutContainer === void 0 ? void 0 : layoutContainer.querySelector(".".concat(cls('panel'), ".").concat(cls('time')))) !== null && _layoutContainer$quer !== void 0 ? _layoutContainer$quer : null;

      if (scrollArea && indicatorRef.current) {
        var _ref2 = scrollArea,
            scrollAreaOffsetHeight = _ref2.offsetHeight;
        var targetOffsetTop = indicatorRef.current.offsetTop;
        var newScrollTop = targetOffsetTop - scrollAreaOffsetHeight / 2; // NOTE: IE11 doesn't support `scrollTo`

        if (scrollArea.scrollTo) {
          scrollArea.scrollTo({
            top: newScrollTop,
            behavior: behavior
          });
        } else {
          scrollArea.scrollTop = newScrollTop;
        }
      }
    };

    eventBus.on('scrollToNow', scrollToNow);
    return function () {
      return eventBus.off('scrollToNow', scrollToNow);
    };
  }, [eventBus, layoutContainer]);
  hooks_module_(function () {
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









var nowIndicatorLabel_classNames = {
  now: addTimeGridPrefix('current-time'),
  dayDifference: addTimeGridPrefix('day-difference')
};
function NowIndicatorLabel(_ref) {
  var unit = _ref.unit,
      top = _ref.top,
      now = _ref.now,
      zonedNow = _ref.zonedNow;
  var color = useTheme(hooks_module_T(function (theme) {
    return theme.week.nowIndicatorLabel.color;
  }, []));
  var dateDifference = F(function () {
    return getDateDifference(zonedNow, now);
  }, [zonedNow, now]);
  var model = {
    unit: unit,
    time: zonedNow,
    format: timeFormats[unit]
  };
  return h("div", {
    className: cls(nowIndicatorLabel_classNames.now),
    style: {
      top: toPercent(top),
      color: color
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
var monthVisibleEventCountSelector = function monthVisibleEventCountSelector(state) {
  var _state$options$month$;

  return (_state$options$month$ = state.options.month.visibleEventCount) !== null && _state$options$month$ !== void 0 ? _state$options$month$ : 6;
};
var showNowIndicatorOptionSelector = function showNowIndicatorOptionSelector(state) {
  return state.options.week.showNowIndicator;
};
var showTimezoneCollapseButtonOptionSelector = function showTimezoneCollapseButtonOptionSelector(state) {
  var _state$options$week$s;

  return (_state$options$week$s = state.options.week.showTimezoneCollapseButton) !== null && _state$options$week$s !== void 0 ? _state$options$week$s : false;
};
var timezonesCollapsedOptionSelector = function timezonesCollapsedOptionSelector(state) {
  var _state$options$week$t;

  return (_state$options$week$t = state.options.week.timezonesCollapsed) !== null && _state$options$week$t !== void 0 ? _state$options$week$t : false;
};
;// CONCATENATED MODULE: ./src/components/timeGrid/timeColumn.tsx
function _toArray(arr) { return timeColumn_arrayWithHoles(arr) || timeColumn_iterableToArray(arr) || timeColumn_unsupportedIterableToArray(arr) || timeColumn_nonIterableRest(); }

function timeColumn_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function timeColumn_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return timeColumn_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return timeColumn_arrayLikeToArray(o, minLen); }

function timeColumn_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function timeColumn_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function timeColumn_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function timeColumn_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
































var timeColumn_classNames = {
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

  var rowsInfo = _ref.rowsInfo,
      isPrimary = _ref.isPrimary,
      borderRight = _ref.borderRight,
      width = _ref.width,
      nowIndicatorState = _ref.nowIndicatorState;
  var showNowIndicator = useStore(showNowIndicatorOptionSelector);

  var _useTheme = useTheme(timeColumn_backgroundColorSelector),
      primaryTimezoneBackgroundColor = _useTheme.primaryTimezoneBackgroundColor,
      subTimezoneBackgroundColor = _useTheme.subTimezoneBackgroundColor;

  var _useTheme2 = useTheme(timeColorSelector),
      pastTimeColor = _useTheme2.pastTimeColor,
      futureTimeColor = _useTheme2.futureTimeColor;

  var zonedNow = isPresent(nowIndicatorState) ? addMinutes(nowIndicatorState.now, (_rowsInfo$0$diffFromP = rowsInfo[0].diffFromPrimaryTimezone) !== null && _rowsInfo$0$diffFromP !== void 0 ? _rowsInfo$0$diffFromP : 0) : null;
  var backgroundColor = isPrimary ? primaryTimezoneBackgroundColor : subTimezoneBackgroundColor;
  return h("div", {
    role: "rowgroup",
    className: cls(timeColumn_classNames.hourRows),
    style: {
      width: toPercent(width),
      borderRight: borderRight,
      backgroundColor: backgroundColor
    }
  }, rowsInfo.map(function (_ref2) {
    var date = _ref2.date,
        top = _ref2.top,
        className = _ref2.className;
    var isPast = isPresent(zonedNow) && date < zonedNow;
    var color = isPast ? pastTimeColor : futureTimeColor;
    return h("div", {
      key: date.getTime(),
      className: className,
      style: {
        top: toPercent(top),
        color: color
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

var TimeColumn = compat_module_g(function TimeColumn(_ref3) {
  var timeGridRows = _ref3.timeGridRows,
      nowIndicatorState = _ref3.nowIndicatorState;
  var showNowIndicator = useStore(showNowIndicatorOptionSelector);
  var timezones = useStore(timezonesSelector);
  var timezonesCollapsed = useStore(timezonesCollapsedOptionSelector);
  var tzConverter = useTZConverter();

  var _useTheme3 = useTheme(weekTimeGridLeftSelector),
      width = _useTheme3.width,
      borderRight = _useTheme3.borderRight;

  var rowsByHour = F(function () {
    return timeGridRows.filter(function (_, index) {
      return index % 2 === 0 || index === timeGridRows.length - 1;
    });
  }, [timeGridRows]);
  var hourRowsPropsMapper = hooks_module_T(function (row, index, diffFromPrimaryTimezone) {
    var _cls;

    var shouldHideRow = function shouldHideRow(_ref4) {
      var rowTop = _ref4.top,
          rowHeight = _ref4.height;

      if (!showNowIndicator || type_isNil(nowIndicatorState)) {
        return false;
      }

      var indicatorTop = nowIndicatorState.top;
      return rowTop - rowHeight <= indicatorTop && indicatorTop <= rowTop + rowHeight;
    };

    var isFirst = index === 0;
    var isLast = index === rowsByHour.length - 1;
    var className = cls(timeColumn_classNames.time, (_cls = {}, timeColumn_defineProperty(_cls, timeColumn_classNames.first, isFirst), timeColumn_defineProperty(_cls, timeColumn_classNames.last, isLast), timeColumn_defineProperty(_cls, timeColumn_classNames.hidden, shouldHideRow(row)), _cls));
    var date = setTimeStrToDate(new date_TZDate(), isLast ? row.endTime : row.startTime);

    if (isPresent(diffFromPrimaryTimezone)) {
      date = addMinutes(date, diffFromPrimaryTimezone);
    }

    return {
      date: date,
      top: row.top,
      className: className,
      diffFromPrimaryTimezone: diffFromPrimaryTimezone
    };
  }, [rowsByHour, nowIndicatorState, showNowIndicator]);

  var _timezones = _toArray(timezones),
      primaryTimezone = _timezones[0],
      otherTimezones = _timezones.slice(1);

  var hourRowsWidth = otherTimezones.length > 0 ? 100 / (otherTimezones.length + 1) : 100;
  var primaryTimezoneHourRowsProps = rowsByHour.map(function (row, index) {
    return hourRowsPropsMapper(row, index);
  });
  var otherTimezoneHourRowsProps = F(function () {
    if (otherTimezones.length === 0) {
      return [];
    }

    return otherTimezones.reverse().map(function (timezone) {
      var timezoneName = timezone.timezoneName;
      var primaryTimezoneOffset = tzConverter(primaryTimezone.timezoneName).getTimezoneOffset();
      var currentTimezoneOffset = tzConverter(timezoneName).getTimezoneOffset();
      var diffFromPrimaryTimezone = currentTimezoneOffset - primaryTimezoneOffset;
      return rowsByHour.map(function (row, index) {
        return hourRowsPropsMapper(row, index, diffFromPrimaryTimezone);
      });
    });
  }, [hourRowsPropsMapper, otherTimezones, primaryTimezone, rowsByHour, tzConverter]);
  return h("div", {
    className: cls(timeColumn_classNames.timeColumn),
    style: {
      width: width
    },
    "data-testid": "timegrid-time-column"
  }, !timezonesCollapsed && otherTimezoneHourRowsProps.map(function (rowsInfo) {
    return h(HourRows, {
      key: rowsInfo[0].diffFromPrimaryTimezone,
      rowsInfo: rowsInfo,
      isPrimary: false,
      borderRight: borderRight,
      width: hourRowsWidth,
      nowIndicatorState: nowIndicatorState
    });
  }), h(HourRows, {
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
  var startTime = start.getTime();
  var endTime = end.getTime();
  var time = math_limit(date.getTime(), [startTime], [endTime]) - startTime;
  var max = endTime - startTime;
  var topPercent = ratio(max, 100, time);
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
  var top = getTopPercentByTime(start, minTime, maxTime);
  var bottom = getTopPercentByTime(end, minTime, maxTime);
  var height = bottom - top;
  return {
    top: top,
    height: height
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
  var index = 0;
  var prevGridTime = setValueByUnit(clone(time), slot * index, unit);
  var nextGridTime;
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
  var index = 0;
  var nextGridTime;

  do {
    nextGridTime = setValueByUnit(clone(time), slot * index, unit);
    index += 1;
  } while (nextGridTime < time);

  return nextGridTime;
}
;// CONCATENATED MODULE: ./src/controller/column.ts
function column_toConsumableArray(arr) { return column_arrayWithoutHoles(arr) || column_iterableToArray(arr) || controller_column_unsupportedIterableToArray(arr) || column_nonIterableSpread(); }

function column_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function controller_column_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return controller_column_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return controller_column_arrayLikeToArray(o, minLen); }

function column_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function column_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return controller_column_arrayLikeToArray(arr); }

function controller_column_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





























var MIN_HEIGHT_PERCENT = 1;

/**
 * Filter that get events in supplied date ranges.
 * @param {TZDate} startColumnTime - start date
 * @param {TZDate} endColumnTime - end date
 * @returns {function} event filter function
 */
function column_isBetween(startColumnTime, endColumnTime) {
  return function (uiModel) {
    var _uiModel$model = uiModel.model,
        _uiModel$model$goingD = _uiModel$model.goingDuration,
        goingDuration = _uiModel$model$goingD === void 0 ? 0 : _uiModel$model$goingD,
        _uiModel$model$coming = _uiModel$model.comingDuration,
        comingDuration = _uiModel$model$coming === void 0 ? 0 : _uiModel$model$coming;
    var ownStarts = addMinutes(uiModel.getStarts(), -goingDuration);
    var ownEnds = addMinutes(uiModel.getEnds(), comingDuration);
    return !(ownEnds <= startColumnTime || ownStarts >= endColumnTime);
  };
}

function setInnerHeights(uiModel, options) {
  var renderStart = options.renderStart,
      renderEnd = options.renderEnd,
      modelStart = options.modelStart,
      modelEnd = options.modelEnd;
  var _uiModel$model2 = uiModel.model,
      _uiModel$model2$going = _uiModel$model2.goingDuration,
      goingDuration = _uiModel$model2$going === void 0 ? 0 : _uiModel$model2$going,
      _uiModel$model2$comin = _uiModel$model2.comingDuration,
      comingDuration = _uiModel$model2$comin === void 0 ? 0 : _uiModel$model2$comin;
  var modelDurationHeight = 100;

  if (goingDuration > 0) {
    var _getTopHeightByTime = getTopHeightByTime(renderStart, modelStart, renderStart, renderEnd),
        goingDurationHeight = _getTopHeightByTime.height;

    uiModel.goingDurationHeight = goingDurationHeight;
    modelDurationHeight -= goingDurationHeight;
  }

  if (comingDuration > 0) {
    var _getTopHeightByTime2 = getTopHeightByTime(modelEnd, renderEnd, renderStart, renderEnd),
        comingDurationHeight = _getTopHeightByTime2.height;

    uiModel.comingDurationHeight = comingDurationHeight;
    modelDurationHeight -= comingDurationHeight;
  }

  uiModel.modelDurationHeight = modelDurationHeight;
}

function setCroppedEdges(uiModel, options) {
  var goingStart = options.goingStart,
      comingEnd = options.comingEnd,
      startColumnTime = options.startColumnTime,
      endColumnTime = options.endColumnTime;

  if (goingStart < startColumnTime) {
    uiModel.croppedStart = true;
  }

  if (comingEnd > endColumnTime) {
    uiModel.croppedEnd = true;
  }
}

function getDuplicateLeft(uiModel, baseLeft) {
  var duplicateEvents = uiModel.duplicateEvents,
      duplicateEventIndex = uiModel.duplicateEventIndex;
  var prevEvent = duplicateEvents[duplicateEventIndex - 1];
  var left = baseLeft;

  if (prevEvent) {
    // duplicateLeft = prevEvent.duplicateLeft + prevEvent.duplicateWidth + marginLeft
    var _extractPercentPx = extractPercentPx("".concat(prevEvent.duplicateLeft)),
        leftPercent = _extractPercentPx.percent,
        leftPx = _extractPercentPx.px;

    var _extractPercentPx2 = extractPercentPx("".concat(prevEvent.duplicateWidth)),
        widthPercent = _extractPercentPx2.percent,
        widthPx = _extractPercentPx2.px;

    var percent = leftPercent + widthPercent;
    var px = leftPx + widthPx + TIME_EVENT_CONTAINER_MARGIN_LEFT;

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
  var collapse = uiModel.collapse; // if it is collapsed, (COLLAPSED_DUPLICATE_EVENT_WIDTH_PX)px
  // if it is expanded, (baseWidth)% - (other duplicate events' width + marginLeft)px - (its marginLeft)px

  return collapse ? "".concat(COLLAPSED_DUPLICATE_EVENT_WIDTH_PX, "px") : "calc(".concat(toPercent(baseWidth), " - ").concat(toPx((COLLAPSED_DUPLICATE_EVENT_WIDTH_PX + TIME_EVENT_CONTAINER_MARGIN_LEFT) * (uiModel.duplicateEvents.length - 1) + TIME_EVENT_CONTAINER_MARGIN_LEFT), ")");
}

function setDimension(uiModel, options) {
  var startColumnTime = options.startColumnTime,
      endColumnTime = options.endColumnTime,
      baseWidth = options.baseWidth,
      columnIndex = options.columnIndex,
      renderStart = options.renderStart,
      renderEnd = options.renderEnd;
  var duplicateEvents = uiModel.duplicateEvents;

  var _getTopHeightByTime3 = getTopHeightByTime(renderStart, renderEnd, startColumnTime, endColumnTime),
      top = _getTopHeightByTime3.top,
      height = _getTopHeightByTime3.height;

  var dimension = {
    top: top,
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
  var _uiModel$model3 = uiModel.model,
      _uiModel$model3$going = _uiModel$model3.goingDuration,
      goingDuration = _uiModel$model3$going === void 0 ? 0 : _uiModel$model3$going,
      _uiModel$model3$comin = _uiModel$model3.comingDuration,
      comingDuration = _uiModel$model3$comin === void 0 ? 0 : _uiModel$model3$comin;
  var modelStart = uiModel.getStarts();
  var modelEnd = uiModel.getEnds();
  var goingStart = addMinutes(modelStart, -goingDuration);
  var comingEnd = addMinutes(modelEnd, comingDuration);
  var renderStart = max(goingStart, startColumnTime);
  var renderEnd = min(comingEnd, endColumnTime);
  return {
    baseWidth: baseWidth,
    columnIndex: columnIndex,
    modelStart: modelStart,
    modelEnd: modelEnd,
    renderStart: renderStart,
    renderEnd: renderEnd,
    goingStart: goingStart,
    comingEnd: comingEnd,
    startColumnTime: startColumnTime,
    endColumnTime: endColumnTime,
    duplicateEvents: uiModel.duplicateEvents
  };
}

function setRenderInfo(_ref) {
  var uiModel = _ref.uiModel,
      columnIndex = _ref.columnIndex,
      baseWidth = _ref.baseWidth,
      startColumnTime = _ref.startColumnTime,
      endColumnTime = _ref.endColumnTime,
      _ref$isDuplicateEvent = _ref.isDuplicateEvent,
      isDuplicateEvent = _ref$isDuplicateEvent === void 0 ? false : _ref$isDuplicateEvent;

  if (!isDuplicateEvent && uiModel.duplicateEvents.length > 0) {
    uiModel.duplicateEvents.forEach(function (event) {
      setRenderInfo({
        uiModel: event,
        columnIndex: columnIndex,
        baseWidth: baseWidth,
        startColumnTime: startColumnTime,
        endColumnTime: endColumnTime,
        isDuplicateEvent: true
      });
    });
    return;
  }

  var renderInfoOptions = getRenderInfoOptions(uiModel, columnIndex, baseWidth, startColumnTime, endColumnTime);
  setDimension(uiModel, renderInfoOptions);
  setInnerHeights(uiModel, renderInfoOptions);
  setCroppedEdges(uiModel, renderInfoOptions);
}

function setDuplicateEvents(uiModels, options, selectedDuplicateEventCid) {
  var getDuplicateEvents = options.getDuplicateEvents,
      getMainEvent = options.getMainEvent;
  var eventObjects = uiModels.map(function (uiModel) {
    return uiModel.model.toEventObject();
  });
  uiModels.forEach(function (targetUIModel) {
    if (targetUIModel.collapse || targetUIModel.duplicateEvents.length > 0) {
      return;
    }

    var duplicateEvents = getDuplicateEvents(targetUIModel.model.toEventObject(), eventObjects);

    if (duplicateEvents.length <= 1) {
      return;
    }

    var mainEvent = getMainEvent(duplicateEvents);
    var duplicateEventUIModels = duplicateEvents.map(function (event) {
      return uiModels.find(function (uiModel) {
        return uiModel.cid() === event.__cid;
      });
    });
    var isSelectedGroup = !!(selectedDuplicateEventCid > DEFAULT_DUPLICATE_EVENT_CID && duplicateEvents.find(function (event) {
      return event.__cid === selectedDuplicateEventCid;
    }));
    var duplicateStarts = duplicateEvents.reduce(function (acc, _ref2) {
      var start = _ref2.start,
          goingDuration = _ref2.goingDuration;
      var renderStart = addMinutes(start, -goingDuration);
      return min(acc, renderStart);
    }, duplicateEvents[0].start);
    var duplicateEnds = duplicateEvents.reduce(function (acc, _ref3) {
      var end = _ref3.end,
          comingDuration = _ref3.comingDuration;
      var renderEnd = addMinutes(end, comingDuration);
      return max(acc, renderEnd);
    }, duplicateEvents[0].end);
    duplicateEventUIModels.forEach(function (event, index) {
      var isMain = event.cid() === mainEvent.__cid;

      var collapse = !(isSelectedGroup && event.cid() === selectedDuplicateEventCid || !isSelectedGroup && isMain);
      event.setUIProps({
        duplicateEvents: duplicateEventUIModels,
        duplicateEventIndex: index,
        collapse: collapse,
        isMain: isMain,
        duplicateStarts: duplicateStarts,
        duplicateEnds: duplicateEnds
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
  var uiModels = events.filter(isTimeEvent).filter(column_isBetween(startColumnTime, endColumnTime)).sort(array.compare.event.asc);

  if (collapseDuplicateEventsOptions) {
    setDuplicateEvents(uiModels, collapseDuplicateEventsOptions, selectedDuplicateEventCid);
  }

  var expandedEvents = uiModels.filter(function (uiModel) {
    return !uiModel.collapse;
  });
  var uiModelColl = createEventCollection.apply(void 0, column_toConsumableArray(expandedEvents));
  var usingTravelTime = true;
  var collisionGroups = getCollisionGroup(expandedEvents, usingTravelTime);
  var matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);
  matrices.forEach(function (matrix) {
    var maxRowLength = Math.max.apply(Math, column_toConsumableArray(matrix.map(function (row) {
      return row.length;
    })));
    var baseWidth = Math.round(100 / maxRowLength);
    matrix.forEach(function (row) {
      row.forEach(function (uiModel, columnIndex) {
        setRenderInfo({
          uiModel: uiModel,
          columnIndex: columnIndex,
          baseWidth: baseWidth,
          startColumnTime: startColumnTime,
          endColumnTime: endColumnTime
        });
      });
    });
  });
  return uiModels;
}
;// CONCATENATED MODULE: ./src/hooks/common/useInterval.ts

function useInterval(callback, delay) {
  var savedCallback = hooks_module_s(callback); // Remember the latest callback.

  hooks_module_(function () {
    savedCallback.current = callback;
  }, [callback]); // Set up the interval.
  // eslint-disable-next-line consistent-return

  hooks_module_(function () {
    var tick = function tick() {
      return savedCallback.current();
    };

    var intervalDelay = delay !== null && delay !== void 0 ? delay : -1;

    if (intervalDelay > 0) {
      var id = setInterval(tick, intervalDelay);
      return function () {
        return clearInterval(id);
      };
    }
  }, [delay]);
}
;// CONCATENATED MODULE: ./src/hooks/common/useIsMounted.ts

function useIsMounted() {
  var isMountedRef = hooks_module_s(true);
  hooks_module_(function () {
    return function () {
      isMountedRef.current = false;
    };
  }, []);
  return hooks_module_T(function () {
    return isMountedRef.current;
  }, []);
}
;// CONCATENATED MODULE: ./src/components/timeGrid/timeGrid.tsx


















function timeGrid_slicedToArray(arr, i) { return timeGrid_arrayWithHoles(arr) || timeGrid_iterableToArrayLimit(arr, i) || timeGrid_unsupportedIterableToArray(arr, i) || timeGrid_nonIterableRest(); }

function timeGrid_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function timeGrid_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return timeGrid_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return timeGrid_arrayLikeToArray(o, minLen); }

function timeGrid_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function timeGrid_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function timeGrid_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




























var timeGrid_classNames = {
  timegrid: cls(className),
  scrollArea: cls(addTimeGridPrefix('scroll-area'))
};
function TimeGrid(_ref) {
  var timeGridData = _ref.timeGridData,
      events = _ref.events;

  var _useStore = useStore(optionsSelector),
      isReadOnly = _useStore.isReadOnly,
      _useStore$week = _useStore.week,
      narrowWeekend = _useStore$week.narrowWeekend,
      startDayOfWeek = _useStore$week.startDayOfWeek,
      collapseDuplicateEvents = _useStore$week.collapseDuplicateEvents;

  var showNowIndicator = useStore(showNowIndicatorOptionSelector);
  var selectedDuplicateEventCid = useStore(function (state) {
    return state.weekViewLayout.selectedDuplicateEventCid;
  });

  var _usePrimaryTimezone = usePrimaryTimezone(),
      _usePrimaryTimezone2 = timeGrid_slicedToArray(_usePrimaryTimezone, 2),
      getNow = _usePrimaryTimezone2[1];

  var isMounted = useIsMounted();

  var _useTheme = useTheme(weekTimeGridLeftSelector),
      timeGridLeftWidth = _useTheme.width;

  var _useState = hooks_module_y(null),
      _useState2 = timeGrid_slicedToArray(_useState, 2),
      nowIndicatorState = _useState2[0],
      setNowIndicatorState = _useState2[1];

  var columns = timeGridData.columns,
      rows = timeGridData.rows;
  var lastColumnIndex = columns.length - 1;
  var totalUIModels = F(function () {
    return columns.map(function (_ref2) {
      var date = _ref2.date;
      return events.filter(column_isBetween(toStartOfDay(date), toEndOfDay(date))) // NOTE: prevent shared reference between columns
      .map(function (uiModel) {
        return uiModel.clone();
      });
    }).map(function (uiModelsByColumn, columnIndex) {
      return setRenderInfoOfUIModels(uiModelsByColumn, setTimeStrToDate(columns[columnIndex].date, first(rows).startTime), setTimeStrToDate(columns[columnIndex].date, last(rows).endTime), selectedDuplicateEventCid, collapseDuplicateEvents);
    });
  }, [columns, rows, events, selectedDuplicateEventCid, collapseDuplicateEvents]);
  var currentDateData = F(function () {
    var now = getNow();
    var currentDateIndexInColumns = columns.findIndex(function (column) {
      return isSameDate(column.date, now);
    });

    if (currentDateIndexInColumns < 0) {
      return null;
    }

    var startTime = setTimeStrToDate(columns[currentDateIndexInColumns].date, timeGridData.rows[0].startTime);
    var endTime = setTimeStrToDate(columns[currentDateIndexInColumns].date, last(timeGridData.rows).endTime);
    return {
      startTime: startTime,
      endTime: endTime,
      currentDateIndex: currentDateIndexInColumns
    };
  }, [columns, getNow, timeGridData.rows]);

  var _useDOMNode = useDOMNode(),
      _useDOMNode2 = timeGrid_slicedToArray(_useDOMNode, 2),
      columnsContainer = _useDOMNode2[0],
      setColumnsContainer = _useDOMNode2[1];

  var gridPositionFinder = F(function () {
    return createGridPositionFinder({
      rowsCount: rows.length,
      columnsCount: columns.length,
      container: columnsContainer,
      narrowWeekend: narrowWeekend,
      startDayOfWeek: startDayOfWeek
    });
  }, [columns.length, columnsContainer, narrowWeekend, rows.length, startDayOfWeek]);
  var onMouseDown = useGridSelection({
    type: 'timeGrid',
    gridPositionFinder: gridPositionFinder,
    selectionSorter: timeGridSelectionHelper.sortSelection,
    dateGetter: timeGridSelectionHelper.getDateFromCollection,
    dateCollection: timeGridData
  });
  var updateTimeGridIndicator = hooks_module_T(function () {
    if (isPresent(currentDateData)) {
      var startTime = currentDateData.startTime,
          endTime = currentDateData.endTime;
      var now = getNow();

      if (startTime <= now && now <= endTime) {
        setNowIndicatorState({
          top: getTopPercentByTime(now, startTime, endTime),
          now: now
        });
      }
    }
  }, [currentDateData, getNow]); // Calculate initial setTimeIndicatorTop

  hooks_module_h(function () {
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
  }), columns.map(function (column, index) {
    return h(Column, {
      key: column.date.toString(),
      timeGridData: timeGridData,
      columnDate: column.date,
      columnWidth: toPercent(column.width),
      columnIndex: index,
      totalUIModels: totalUIModels,
      gridPositionFinder: gridPositionFinder,
      isLastColumn: index === lastColumnIndex
    });
  }), showNowIndicator && isPresent(currentDateData) && isPresent(nowIndicatorState) ? h(NowIndicator, {
    top: nowIndicatorState.top,
    columnWidth: columns[0].width,
    columnCount: columns.length,
    columnIndex: currentDateData.currentDateIndex
  }) : null)));
}
;// CONCATENATED MODULE: ./src/components/timeGrid/timezoneCollapseButton.tsx




function TimezoneCollapseButton(_ref) {
  var isCollapsed = _ref.isCollapsed;
  var eventBus = useEventBus();
  var iconClassName = cls('icon', {
    'ic-arrow-right': isCollapsed,
    'ic-arrow-left': !isCollapsed
  });
  return h("button", {
    className: cls(addTimeGridPrefix('timezone-collapse-button')),
    "aria-expanded": !isCollapsed,
    onClick: function onClick() {
      return eventBus.fire('clickTimezonesCollapseBtn', isCollapsed);
    }
  }, h("span", {
    className: iconClassName,
    role: "img"
  }));
}
;// CONCATENATED MODULE: ./src/components/timeGrid/timezoneLabels.tsx
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function timezoneLabels_toArray(arr) { return timezoneLabels_arrayWithHoles(arr) || timezoneLabels_iterableToArray(arr) || timezoneLabels_unsupportedIterableToArray(arr) || timezoneLabels_nonIterableRest(); }

function timezoneLabels_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function timezoneLabels_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return timezoneLabels_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return timezoneLabels_arrayLikeToArray(o, minLen); }

function timezoneLabels_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function timezoneLabels_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function timezoneLabels_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






























function TimezoneLabel(_ref) {
  var label = _ref.label,
      offset = _ref.offset,
      tooltip = _ref.tooltip,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 100 : _ref$width,
      left = _ref.left;
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
  var showTimezoneCollapseButton = useStore(showTimezoneCollapseButtonOptionSelector);
  var timezonesCollapsed = useStore(timezonesCollapsedOptionSelector);
  return F(function () {
    return {
      showTimezoneCollapseButton: showTimezoneCollapseButton,
      timezonesCollapsed: timezonesCollapsed
    };
  }, [showTimezoneCollapseButton, timezonesCollapsed]);
}

function TimezoneLabels(_ref2) {
  var top = _ref2.top;
  var timezones = useStore(timezonesSelector);

  var _useTheme = useTheme(weekTimeGridLeftSelector),
      width = _useTheme.width;

  var tzConverter = useTZConverter();

  var _useTimezoneCollapseO = useTimezoneCollapseOptions(),
      showTimezoneCollapseButton = _useTimezoneCollapseO.showTimezoneCollapseButton,
      timezonesCollapsed = _useTimezoneCollapseO.timezonesCollapsed;

  if (timezones.length <= 1) {
    return null;
  }

  var timezoneLabelProps = timezones.map(function (_ref3) {
    var displayLabel = _ref3.displayLabel,
        timezoneName = _ref3.timezoneName,
        tooltip = _ref3.tooltip;
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

  var _timezoneLabelProps = timezoneLabels_toArray(timezoneLabelProps),
      primaryTimezone = _timezoneLabelProps[0],
      restTimezones = _timezoneLabelProps.slice(1);

  var subTimezones = restTimezones.reverse();
  var timezonesCount = timezonesCollapsed ? 1 : timezones.length;
  var timezoneLabelWidth = 100 / timezonesCount;
  return h("div", {
    style: {
      top: top,
      width: width
    },
    role: "columnheader",
    className: cls('timezone-labels-slot')
  }, !timezonesCollapsed && subTimezones.map(function (subTimezone, index) {
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
var VIEW_TYPE = {
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day'
};
var DEFAULT_TASK_PANEL = ['milestone', 'task'];
var DEFAULT_EVENT_PANEL = ['allday', 'time'];
;// CONCATENATED MODULE: ./src/helpers/view.ts














function view_toConsumableArray(arr) { return view_arrayWithoutHoles(arr) || view_iterableToArray(arr) || view_unsupportedIterableToArray(arr) || view_nonIterableSpread(); }

function view_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function view_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return view_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return view_arrayLikeToArray(o, minLen); }

function view_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function view_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return view_arrayLikeToArray(arr); }

function view_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


function getActivePanels(taskView, eventView) {
  var activePanels = [];

  if (taskView === true) {
    activePanels.push.apply(activePanels, view_toConsumableArray(DEFAULT_TASK_PANEL));
  } else if (Array.isArray(taskView)) {
    activePanels.push.apply(activePanels, view_toConsumableArray(taskView));
  }

  if (eventView === true) {
    activePanels.push.apply(activePanels, view_toConsumableArray(DEFAULT_EVENT_PANEL));
  } else if (Array.isArray(eventView)) {
    activePanels.push.apply(activePanels, view_toConsumableArray(eventView));
  }

  return activePanels;
}
;// CONCATENATED MODULE: ./src/hooks/timezone/useEventsWithTimezone.ts








function useEventsWithTimezone(events) {
  var primaryTimezoneName = useStore(primaryTimezoneSelector);
  var tzConverter = useTZConverter();
  return F(function () {
    if (primaryTimezoneName === 'Local') {
      return events;
    }

    var isSystemUsingDST = isUsingDST(new date_TZDate());

    var _events$groupBy = events.groupBy(function (eventModel) {
      return eventModel.category === 'time' ? 'timedEvents' : 'totalEvents';
    }),
        _events$groupBy$timed = _events$groupBy.timedEvents,
        timedEvents = _events$groupBy$timed === void 0 ? createEventCollection() : _events$groupBy$timed,
        _events$groupBy$total = _events$groupBy.totalEvents,
        totalEvents = _events$groupBy$total === void 0 ? createEventCollection() : _events$groupBy$total;

    timedEvents.each(function (eventModel) {
      var clonedEventModel = object_clone(eventModel);
      var zonedStart = tzConverter(primaryTimezoneName, clonedEventModel.start);
      var zonedEnd = tzConverter(primaryTimezoneName, clonedEventModel.end); // Adjust the start and end time to the system timezone.

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
function useCalendarData_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function useCalendarData_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? useCalendarData_ownKeys(Object(source), !0).forEach(function (key) { useCalendarData_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : useCalendarData_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function useCalendarData_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











function useCalendarData(calendar) {
  for (var _len = arguments.length, filters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    filters[_key - 1] = arguments[_key];
  }

  var filteredEvents = F(function () {
    return calendar.events.filter(Collection.and.apply(Collection, filters));
  }, [calendar.events, filters]);
  var filteredEventsWithTimezone = useEventsWithTimezone(filteredEvents);
  return F(function () {
    return useCalendarData_objectSpread(useCalendarData_objectSpread({}, calendar), {}, {
      events: filteredEventsWithTimezone
    });
  }, [calendar, filteredEventsWithTimezone]);
}
;// CONCATENATED MODULE: ./src/hooks/timeGrid/useTimeGridScrollSync.ts







function isTimeGridDraggingType(draggingItemType) {
  return /^(event|gridSelection)\/timeGrid/.test(draggingItemType !== null && draggingItemType !== void 0 ? draggingItemType : '');
}

function useTimeGridScrollSync(scrollArea, rowCount) {
  useTransientUpdate(dndSelector, function (_ref) {
    var y = _ref.y,
        draggingItemType = _ref.draggingItemType,
        draggingState = _ref.draggingState;

    if (isPresent(scrollArea) && isTimeGridDraggingType(draggingItemType) && draggingState === DraggingState.DRAGGING && isPresent(y)) {
      var offsetTop = scrollArea.offsetTop,
          offsetHeight = scrollArea.offsetHeight,
          scrollHeight = scrollArea.scrollHeight; // Set minimum scroll boundary to the height of one row.

      var scrollBoundary = Math.floor(scrollHeight / rowCount);
      var layoutHeight = offsetTop + offsetHeight;

      if (y < offsetTop + scrollBoundary) {
        var scrollDiff = y - (offsetTop + scrollBoundary);
        scrollArea.scrollTop = Math.max(0, scrollArea.scrollTop + scrollDiff);
      } else if (y > layoutHeight - scrollBoundary) {
        var _scrollDiff = y - (layoutHeight - scrollBoundary);

        scrollArea.scrollTop = Math.min(offsetHeight, scrollArea.scrollTop + _scrollDiff);
      }
    }
  });
}
;// CONCATENATED MODULE: ./src/hooks/timeGrid/useTimezoneLabelsTop.ts














function useTimezoneLabelsTop_slicedToArray(arr, i) { return useTimezoneLabelsTop_arrayWithHoles(arr) || useTimezoneLabelsTop_iterableToArrayLimit(arr, i) || useTimezoneLabelsTop_unsupportedIterableToArray(arr, i) || useTimezoneLabelsTop_nonIterableRest(); }

function useTimezoneLabelsTop_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useTimezoneLabelsTop_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useTimezoneLabelsTop_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useTimezoneLabelsTop_arrayLikeToArray(o, minLen); }

function useTimezoneLabelsTop_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useTimezoneLabelsTop_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useTimezoneLabelsTop_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





function timegridHeightSelector(state) {
  var _state$weekViewLayout, _state$weekViewLayout2, _state$weekViewLayout3;

  // TODO: change `dayGridRows` to `panels`
  return (_state$weekViewLayout = state.weekViewLayout) === null || _state$weekViewLayout === void 0 ? void 0 : (_state$weekViewLayout2 = _state$weekViewLayout.dayGridRows) === null || _state$weekViewLayout2 === void 0 ? void 0 : (_state$weekViewLayout3 = _state$weekViewLayout2.time) === null || _state$weekViewLayout3 === void 0 ? void 0 : _state$weekViewLayout3.height;
}

function useTimezoneLabelsTop(timePanel) {
  var timeGridPanelHeight = useStore(timegridHeightSelector);

  var _useState = hooks_module_y(null),
      _useState2 = useTimezoneLabelsTop_slicedToArray(_useState, 2),
      stickyTop = _useState2[0],
      setStickyTop = _useState2[1];

  hooks_module_h(function () {
    if (isPresent(timeGridPanelHeight) && timePanel) {
      setStickyTop(timePanel.offsetTop);
    }
  }, [timeGridPanelHeight, timePanel]);
  return stickyTop;
}
;// CONCATENATED MODULE: ./src/components/view/day.tsx

















function day_slicedToArray(arr, i) { return day_arrayWithHoles(arr) || day_iterableToArrayLimit(arr, i) || day_unsupportedIterableToArray(arr, i) || day_nonIterableRest(); }

function day_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function day_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return day_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return day_arrayLikeToArray(o, minLen); }

function day_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function day_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function day_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

























function useDayViewState() {
  var calendar = useStore(calendarSelector);
  var options = useStore(optionsSelector);

  var _useStore = useStore(weekViewLayoutSelector),
      gridRowLayout = _useStore.dayGridRows,
      lastPanelType = _useStore.lastPanelType;

  var _useStore2 = useStore(viewSelector),
      renderDate = _useStore2.renderDate;

  return F(function () {
    return {
      calendar: calendar,
      options: options,
      gridRowLayout: gridRowLayout,
      lastPanelType: lastPanelType,
      renderDate: renderDate
    };
  }, [calendar, options, gridRowLayout, lastPanelType, renderDate]);
}

function day_Day() {
  var _options$week$dayName, _options$week;

  var _useDayViewState = useDayViewState(),
      calendar = _useDayViewState.calendar,
      options = _useDayViewState.options,
      gridRowLayout = _useDayViewState.gridRowLayout,
      lastPanelType = _useDayViewState.lastPanelType,
      renderDate = _useDayViewState.renderDate;

  var primaryTimezoneName = useStore(primaryTimezoneSelector);
  var gridHeaderMarginLeft = useTheme(hooks_module_T(function (theme) {
    return theme.week.dayGridLeft.width;
  }, []));

  var _useDOMNode = useDOMNode(),
      _useDOMNode2 = day_slicedToArray(_useDOMNode, 2),
      timePanel = _useDOMNode2[0],
      setTimePanelRef = _useDOMNode2[1];

  var weekOptions = options.week;
  var narrowWeekend = weekOptions.narrowWeekend,
      startDayOfWeek = weekOptions.startDayOfWeek,
      workweek = weekOptions.workweek,
      hourStart = weekOptions.hourStart,
      hourEnd = weekOptions.hourEnd,
      eventView = weekOptions.eventView,
      taskView = weekOptions.taskView;
  var days = F(function () {
    return [renderDate];
  }, [renderDate]);
  var dayNames = getDayNames(days, (_options$week$dayName = (_options$week = options.week) === null || _options$week === void 0 ? void 0 : _options$week.dayNames) !== null && _options$week$dayName !== void 0 ? _options$week$dayName : []);

  var _getRowStyleInfo = getRowStyleInfo(days.length, narrowWeekend, startDayOfWeek, workweek),
      rowStyleInfo = _getRowStyleInfo.rowStyleInfo,
      cellWidthMap = _getRowStyleInfo.cellWidthMap;

  var calendarData = useCalendarData(calendar, options.eventFilter);
  var dayGridEvents = F(function () {
    var getFilterRange = function getFilterRange() {
      if (primaryTimezoneName === 'Local') {
        return [toStartOfDay(days[0]), toEndOfDay(days[0])];
      } // NOTE: Extend filter range because of timezone offset differences


      return [toStartOfDay(addDate(days[0], -1)), toEndOfDay(addDate(days[0], 1))];
    };

    var _getFilterRange = getFilterRange(),
        _getFilterRange2 = day_slicedToArray(_getFilterRange, 2),
        weekStartDate = _getFilterRange2[0],
        weekEndDate = _getFilterRange2[1];

    return getWeekViewEvents(days, calendarData, {
      narrowWeekend: narrowWeekend,
      hourStart: hourStart,
      hourEnd: hourEnd,
      weekStartDate: weekStartDate,
      weekEndDate: weekEndDate
    });
  }, [calendarData, days, hourEnd, hourStart, narrowWeekend, primaryTimezoneName]);
  var timeGridData = F(function () {
    return createTimeGridData(days, {
      hourStart: hourStart,
      hourEnd: hourEnd,
      narrowWeekend: narrowWeekend
    });
  }, [days, hourEnd, hourStart, narrowWeekend]);
  var activePanels = getActivePanels(taskView, eventView);
  var gridRows = activePanels.map(function (key) {
    var _gridRowLayout$rowTyp, _gridRowLayout$rowTyp2;

    if (key === 'time') {
      return null;
    }

    var rowType = key;
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
  var stickyTop = useTimezoneLabelsTop(timePanel);
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
  var rowIndex = _ref.rowIndex,
      weekDates = _ref.weekDates,
      narrowWeekend = _ref.narrowWeekend;
  var gridSelectionDataByRow = useStore(hooks_module_T(function (state) {
    return state.gridSelection.accumulated.dayGridMonth.map(function (gridSelection) {
      return dayGridMonthSelectionHelper.calculateSelection(gridSelection, rowIndex, weekDates.length);
    });
  }, [rowIndex, weekDates]));
  return h("div", {
    className: cls('accumulated-grid-selection')
  }, gridSelectionDataByRow.map(function (gridSelectionData) {
    return gridSelectionData ? h(GridSelection, {
      type: "accumulated",
      gridSelectionData: gridSelectionData,
      weekDates: weekDates,
      narrowWeekend: narrowWeekend
    }) : null;
  }));
}
;// CONCATENATED MODULE: ./src/components/dayGridMonth/moreEventsButton.tsx




function MoreEventsButton(_ref) {
  var type = _ref.type,
      number = _ref.number,
      onClickButton = _ref.onClickButton,
      className = _ref.className;

  var _useDispatch = useDispatch('dnd'),
      reset = _useDispatch.reset; // prevent unexpected grid selection when clicking on the button


  var handleMouseDown = function handleMouseDown(e) {
    e.stopPropagation();
  };

  var handleClick = function handleClick() {
    reset();
    onClickButton();
  };

  var exceedButtonTemplate = "monthGrid".concat(type === CellBarType.header ? 'Header' : 'Footer', "Exceed");
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














function cellHeader_slicedToArray(arr, i) { return cellHeader_arrayWithHoles(arr) || cellHeader_iterableToArrayLimit(arr, i) || cellHeader_unsupportedIterableToArray(arr, i) || cellHeader_nonIterableRest(); }

function cellHeader_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function cellHeader_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return cellHeader_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return cellHeader_arrayLikeToArray(o, minLen); }

function cellHeader_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function cellHeader_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function cellHeader_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }















function getDateColor(_ref) {
  var date = _ref.date,
      theme = _ref.theme,
      renderDate = _ref.renderDate,
      isToday = _ref.isToday;
  var dayIndex = date.getDay();
  var thisMonth = renderDate.getMonth();
  var isSameMonth = thisMonth === date.getMonth();
  var _theme$common = theme.common,
      holiday = _theme$common.holiday,
      saturday = _theme$common.saturday,
      today = _theme$common.today,
      dayName = _theme$common.dayName,
      _theme$month = theme.month,
      dayExceptThisMonth = _theme$month.dayExceptThisMonth,
      holidayExceptThisMonth = _theme$month.holidayExceptThisMonth;

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
  var common = useCommonTheme();
  var month = useMonthTheme();
  return F(function () {
    return {
      common: common,
      month: month
    };
  }, [common, month]);
}

function CellHeader(_ref2) {
  var _ref2$type = _ref2.type,
      type = _ref2$type === void 0 ? CellBarType.header : _ref2$type,
      _ref2$exceedCount = _ref2.exceedCount,
      exceedCount = _ref2$exceedCount === void 0 ? 0 : _ref2$exceedCount,
      date = _ref2.date,
      onClickExceedCount = _ref2.onClickExceedCount;

  var _useStore = useStore(viewSelector),
      renderDate = _useStore.renderDate;

  var _usePrimaryTimezone = usePrimaryTimezone(),
      _usePrimaryTimezone2 = cellHeader_slicedToArray(_usePrimaryTimezone, 2),
      getNow = _usePrimaryTimezone2[1];

  var theme = useCellHeaderTheme();
  var height = theme.month.gridCell["".concat(type, "Height")];
  var ymd = datetime_toFormat(date, 'YYYYMMDD');
  var todayYmd = datetime_toFormat(getNow(), 'YYYYMMDD');
  var isToday = ymd === todayYmd;
  var templateParam = {
    date: datetime_toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    hiddenEventCount: exceedCount,
    isOtherMonth: date.getMonth() !== renderDate.getMonth(),
    isToday: ymd === todayYmd,
    month: date.getMonth(),
    ymd: ymd
  };
  var gridCellDateStyle = {
    color: getDateColor({
      date: date,
      theme: theme,
      isToday: isToday,
      renderDate: renderDate
    })
  };
  var monthGridTemplate = "monthGrid".concat(capitalize(type));

  if (type_isNil(height)) {
    return null;
  }

  return h("div", {
    className: cls("grid-cell-".concat(type)),
    style: {
      height: height
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



















function gridCell_slicedToArray(arr, i) { return gridCell_arrayWithHoles(arr) || gridCell_iterableToArrayLimit(arr, i) || gridCell_unsupportedIterableToArray(arr, i) || gridCell_nonIterableRest(); }

function gridCell_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function gridCell_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return gridCell_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return gridCell_arrayLikeToArray(o, minLen); }

function gridCell_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function gridCell_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function gridCell_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function gridCell_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function gridCell_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? gridCell_ownKeys(Object(source), !0).forEach(function (key) { gridCell_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : gridCell_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function gridCell_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















function getSeeMorePopupSize(_ref) {
  var grid = _ref.grid,
      offsetWidth = _ref.offsetWidth,
      eventLength = _ref.eventLength,
      layerSize = _ref.layerSize;
  var minHeight = getSize(grid).height + MONTH_MORE_VIEW_PADDING * 2;
  var width = offsetWidth + MONTH_MORE_VIEW_PADDING * 2;
  var moreViewWidth = layerSize.width,
      moreViewHeight = layerSize.height;
  var MAX_DISPLAY_EVENT_COUNT = 10;
  width = Math.max(width, MONTH_MORE_VIEW_MIN_WIDTH);
  var height = MONTH_MORE_VIEW_HEADER_HEIGHT + MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM + MONTH_MORE_VIEW_PADDING;
  var eventHeight = MONTH_EVENT_HEIGHT + MONTH_EVENT_MARGIN_TOP;

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
    width: width,
    height: height
  };
}

function getSeeMorePopupPosition(popupSize, appContainerSize, cellRect) {
  var containerWidth = appContainerSize.width,
      containerHeight = appContainerSize.height,
      containerLeft = appContainerSize.left,
      containerTop = appContainerSize.top;
  var popupWidth = popupSize.width,
      popupHeight = popupSize.height;
  var containerRight = containerLeft + containerWidth;
  var containerBottom = containerTop + containerHeight;
  var left = cellRect.left + cellRect.width / 2 - popupWidth / 2;
  var top = cellRect.top;
  var isLeftOutOfContainer = left < containerLeft;
  var isRightOutOfContainer = left + popupWidth > containerRight;
  var isUpperOutOfContainer = top < containerTop;
  var isLowerOutOfContainer = top + popupHeight > containerBottom;

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
  var layoutContainer = _ref2.layoutContainer,
      cell = _ref2.cell,
      popupSize = _ref2.popupSize;
  var containerRect = layoutContainer.getBoundingClientRect();
  var cellRect = cell.getBoundingClientRect();
  var popupPosition = getSeeMorePopupPosition(popupSize, containerRect, cellRect);
  return gridCell_objectSpread(gridCell_objectSpread({}, popupSize), popupPosition);
}

function usePopupPosition(eventLength, parentContainer, layoutContainer) {
  var _useTheme = useTheme(monthMoreViewSelector),
      moreViewWidth = _useTheme.width,
      moreViewHeight = _useTheme.height;

  var _useDOMNode = useDOMNode(),
      _useDOMNode2 = gridCell_slicedToArray(_useDOMNode, 2),
      container = _useDOMNode2[0],
      containerRefCallback = _useDOMNode2[1];

  var _useState = hooks_module_y(null),
      _useState2 = gridCell_slicedToArray(_useState, 2),
      popupPosition = _useState2[0],
      setPopupPosition = _useState2[1];

  hooks_module_(function () {
    if (layoutContainer && parentContainer && container) {
      var popupSize = getSeeMorePopupSize({
        grid: parentContainer,
        offsetWidth: container.offsetWidth,
        eventLength: eventLength,
        layerSize: {
          width: moreViewWidth,
          height: moreViewHeight
        }
      });
      var rect = getSeeMorePopupRect({
        cell: container,
        layoutContainer: layoutContainer,
        popupSize: popupSize
      });
      setPopupPosition(rect);
    }
  }, [layoutContainer, container, eventLength, parentContainer, moreViewWidth, moreViewHeight]);
  return {
    popupPosition: popupPosition,
    containerRefCallback: containerRefCallback
  };
}

function weekendBackgroundColorSelector(theme) {
  return theme.month.weekend.backgroundColor;
}

function gridCell_GridCell(_ref3) {
  var date = _ref3.date,
      _ref3$events = _ref3.events,
      events = _ref3$events === void 0 ? [] : _ref3$events,
      style = _ref3.style,
      parentContainer = _ref3.parentContainer,
      contentAreaHeight = _ref3.contentAreaHeight;
  var layoutContainer = useLayoutContainer();

  var _useDispatch = useDispatch('popup'),
      showSeeMorePopup = _useDispatch.showSeeMorePopup;

  var backgroundColor = useTheme(weekendBackgroundColorSelector);

  var _usePopupPosition = usePopupPosition(events.length, parentContainer, layoutContainer),
      popupPosition = _usePopupPosition.popupPosition,
      containerRefCallback = _usePopupPosition.containerRefCallback;

  var onOpenSeeMorePopup = hooks_module_T(function () {
    if (popupPosition) {
      showSeeMorePopup({
        date: date,
        popupPosition: popupPosition,
        events: events
      });
    }
  }, [date, events, popupPosition, showSeeMorePopup]);
  var exceedCount = getExceedCount(events, contentAreaHeight, MONTH_EVENT_HEIGHT + MONTH_EVENT_MARGIN_TOP);
  return h("div", {
    className: cls('daygrid-cell'),
    style: gridCell_objectSpread(gridCell_objectSpread({}, style), {}, {
      backgroundColor: isWeekend(date.getDay()) ? backgroundColor : 'inherit'
    }),
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















function gridRow_slicedToArray(arr, i) { return gridRow_arrayWithHoles(arr) || gridRow_iterableToArrayLimit(arr, i) || gridRow_unsupportedIterableToArray(arr, i) || gridRow_nonIterableRest(); }

function gridRow_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function gridRow_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return gridRow_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return gridRow_arrayLikeToArray(o, minLen); }

function gridRow_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function gridRow_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function gridRow_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var GridRow = compat_module_g(function GridRow(_ref) {
  var week = _ref.week,
      rowInfo = _ref.rowInfo,
      _ref$gridDateEventMod = _ref.gridDateEventModelMap,
      gridDateEventModelMap = _ref$gridDateEventMod === void 0 ? {} : _ref$gridDateEventMod,
      contentAreaHeight = _ref.contentAreaHeight;

  var _useDOMNode = useDOMNode(),
      _useDOMNode2 = gridRow_slicedToArray(_useDOMNode, 2),
      container = _useDOMNode2[0],
      containerRefCallback = _useDOMNode2[1];

  var border = useTheme(hooks_module_T(function (theme) {
    return theme.common.border;
  }, []));
  return h("div", {
    className: cls('weekday-grid'),
    style: {
      borderTop: border
    },
    ref: containerRefCallback
  }, week.map(function (date, columnIndex) {
    var dayIndex = date.getDay();
    var _rowInfo$columnIndex = rowInfo[columnIndex],
        width = _rowInfo$columnIndex.width,
        left = _rowInfo$columnIndex.left;
    var ymd = datetime_toFormat(toStartOfDay(date), 'YYYYMMDD');
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
  var weekDates = _ref.weekDates,
      narrowWeekend = _ref.narrowWeekend,
      rowIndex = _ref.rowIndex;
  var gridSelectionDataByRow = useStore(hooks_module_T(function (state) {
    return dayGridMonthSelectionHelper.calculateSelection(state.gridSelection.dayGridMonth, rowIndex, weekDates.length);
  }, [rowIndex, weekDates.length]));

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












var MonthEvents = compat_module_g(function MonthEvents(_ref) {
  var contentAreaHeight = _ref.contentAreaHeight,
      _ref$eventHeight = _ref.eventHeight,
      eventHeight = _ref$eventHeight === void 0 ? EVENT_HEIGHT : _ref$eventHeight,
      events = _ref.events,
      name = _ref.name,
      className = _ref.className;

  var _useTheme = useTheme(monthGridCellSelector),
      headerHeight = _useTheme.headerHeight;

  var dayEvents = events.filter(isWithinHeight(contentAreaHeight, eventHeight + MONTH_EVENT_MARGIN_TOP)).map(function (uiModel) {
    return h(HorizontalEvent, {
      key: "".concat(name, "-DayEvent-").concat(uiModel.cid()),
      uiModel: uiModel,
      eventHeight: eventHeight,
      headerHeight: headerHeight !== null && headerHeight !== void 0 ? headerHeight : MONTH_CELL_BAR_HEIGHT
    });
  });
  return h("div", {
    className: className
  }, dayEvents);
});
;// CONCATENATED MODULE: ./src/hooks/dayGridMonth/useDayGridMonthEventMove.ts














function useDayGridMonthEventMove_slicedToArray(arr, i) { return useDayGridMonthEventMove_arrayWithHoles(arr) || useDayGridMonthEventMove_iterableToArrayLimit(arr, i) || useDayGridMonthEventMove_unsupportedIterableToArray(arr, i) || useDayGridMonthEventMove_nonIterableRest(); }

function useDayGridMonthEventMove_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useDayGridMonthEventMove_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useDayGridMonthEventMove_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useDayGridMonthEventMove_arrayLikeToArray(o, minLen); }

function useDayGridMonthEventMove_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useDayGridMonthEventMove_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useDayGridMonthEventMove_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









function useDayGridMonthEventMove(_ref) {
  var dateMatrix = _ref.dateMatrix,
      rowInfo = _ref.rowInfo,
      gridPositionFinder = _ref.gridPositionFinder,
      rowIndex = _ref.rowIndex;
  var eventBus = useEventBus();

  var _useDraggingEvent = useDraggingEvent('dayGrid', 'move'),
      isDraggingEnd = _useDraggingEvent.isDraggingEnd,
      isDraggingCanceled = _useDraggingEvent.isDraggingCanceled,
      movingEvent = _useDraggingEvent.draggingEvent,
      clearDraggingEvent = _useDraggingEvent.clearDraggingEvent;

  var _useCurrentPointerPos = useCurrentPointerPositionInGrid(gridPositionFinder),
      _useCurrentPointerPos2 = useDayGridMonthEventMove_slicedToArray(_useCurrentPointerPos, 2),
      currentGridPos = _useCurrentPointerPos2[0],
      clearCurrentGridPos = _useCurrentPointerPos2[1];

  var movingEventUIModel = F(function () {
    var shadowEventUIModel = null;

    if (movingEvent && (currentGridPos === null || currentGridPos === void 0 ? void 0 : currentGridPos.rowIndex) === rowIndex) {
      var _currentGridPos$colum, _currentGridPos$colum2;

      shadowEventUIModel = movingEvent;
      shadowEventUIModel.left = rowInfo[(_currentGridPos$colum = currentGridPos === null || currentGridPos === void 0 ? void 0 : currentGridPos.columnIndex) !== null && _currentGridPos$colum !== void 0 ? _currentGridPos$colum : 0].left;
      shadowEventUIModel.width = rowInfo[(_currentGridPos$colum2 = currentGridPos === null || currentGridPos === void 0 ? void 0 : currentGridPos.columnIndex) !== null && _currentGridPos$colum2 !== void 0 ? _currentGridPos$colum2 : 0].width;
    }

    return shadowEventUIModel;
  }, [movingEvent, currentGridPos === null || currentGridPos === void 0 ? void 0 : currentGridPos.rowIndex, currentGridPos === null || currentGridPos === void 0 ? void 0 : currentGridPos.columnIndex, rowIndex, rowInfo]);
  useWhen(function () {
    var shouldUpdate = !isDraggingCanceled && isPresent(movingEventUIModel) && isPresent(currentGridPos);

    if (shouldUpdate) {
      var preStartDate = movingEventUIModel.model.getStarts();
      var eventDuration = movingEventUIModel.duration();
      var currentDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.columnIndex];
      var timeOffsetPerDay = getDateDifference(currentDate, preStartDate) * MS_PER_DAY;
      var newStartDate = new date_TZDate(preStartDate.getTime() + timeOffsetPerDay);
      var newEndDate = new date_TZDate(newStartDate.getTime() + eventDuration);
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
  var dateMatrix = _ref.dateMatrix,
      gridPositionFinder = _ref.gridPositionFinder,
      rowInfo = _ref.rowInfo,
      rowIndex = _ref.rowIndex;
  var movingEvent = useDayGridMonthEventMove({
    dateMatrix: dateMatrix,
    rowInfo: rowInfo,
    gridPositionFinder: gridPositionFinder,
    rowIndex: rowIndex
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

















function useDayGridMonthEventResize_slicedToArray(arr, i) { return useDayGridMonthEventResize_arrayWithHoles(arr) || useDayGridMonthEventResize_iterableToArrayLimit(arr, i) || useDayGridMonthEventResize_unsupportedIterableToArray(arr, i) || useDayGridMonthEventResize_nonIterableRest(); }

function useDayGridMonthEventResize_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function useDayGridMonthEventResize_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return useDayGridMonthEventResize_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return useDayGridMonthEventResize_arrayLikeToArray(o, minLen); }

function useDayGridMonthEventResize_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function useDayGridMonthEventResize_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useDayGridMonthEventResize_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










function getRowPosOfUIModel(uiModel, dateRow) {
  var startColumnIndex = Math.max(getGridDateIndex(uiModel.getStarts(), dateRow), 0);
  var endColumnIndex = getGridDateIndex(uiModel.getEnds(), dateRow);
  return {
    startColumnIndex: startColumnIndex,
    endColumnIndex: endColumnIndex
  };
}

function useDayGridMonthEventResize(_ref) {
  var dateMatrix = _ref.dateMatrix,
      gridPositionFinder = _ref.gridPositionFinder,
      renderedUIModels = _ref.renderedUIModels,
      cellWidthMap = _ref.cellWidthMap,
      rowIndex = _ref.rowIndex;
  var eventBus = useEventBus();

  var _useDraggingEvent = useDraggingEvent('dayGrid', 'resize'),
      isDraggingEnd = _useDraggingEvent.isDraggingEnd,
      isDraggingCanceled = _useDraggingEvent.isDraggingCanceled,
      resizingStartUIModel = _useDraggingEvent.draggingEvent,
      clearDraggingEvent = _useDraggingEvent.clearDraggingEvent;

  var _useCurrentPointerPos = useCurrentPointerPositionInGrid(gridPositionFinder),
      _useCurrentPointerPos2 = useDayGridMonthEventResize_slicedToArray(_useCurrentPointerPos, 2),
      currentGridPos = _useCurrentPointerPos2[0],
      clearCurrentGridPos = _useCurrentPointerPos2[1];

  var _useState = hooks_module_y(null),
      _useState2 = useDayGridMonthEventResize_slicedToArray(_useState, 2),
      guideProps = _useState2[0],
      setGuideProps = _useState2[1]; // Shadow -> Guide


  var clearStates = hooks_module_T(function () {
    setGuideProps(null);
    clearCurrentGridPos();
    clearDraggingEvent();
  }, [clearCurrentGridPos, clearDraggingEvent]);
  var baseResizingInfo = F(function () {
    if (type_isNil(resizingStartUIModel)) {
      return null;
    }
    /**
     * Filter UIModels that are made from the target event.
     */


    var resizeTargetUIModelRows = renderedUIModels.map(function (_ref2) {
      var uiModels = _ref2.uiModels;
      return uiModels.filter(function (uiModel) {
        return uiModel.cid() === resizingStartUIModel.cid();
      });
    });
    var eventStartDateRowIndex = resizeTargetUIModelRows.findIndex(function (row) {
      return row.length > 0;
    });
    var eventEndDateRowIndex = findLastIndex(resizeTargetUIModelRows, function (row) {
      return row.length > 0;
    });
    var eventStartUIModelPos = getRowPosOfUIModel(resizeTargetUIModelRows[eventStartDateRowIndex][0], dateMatrix[eventStartDateRowIndex]);
    var eventEndUIModelPos = getRowPosOfUIModel(resizeTargetUIModelRows[eventEndDateRowIndex][0], dateMatrix[eventEndDateRowIndex]);
    return {
      eventStartDateColumnIndex: eventStartUIModelPos.startColumnIndex,
      eventStartDateRowIndex: eventStartDateRowIndex,
      eventEndDateColumnIndex: eventEndUIModelPos.endColumnIndex,
      eventEndDateRowIndex: eventEndDateRowIndex,
      resizeTargetUIModelRows: resizeTargetUIModelRows
    };
  }, [dateMatrix, renderedUIModels, resizingStartUIModel]);
  var canCalculateProps = isPresent(baseResizingInfo) && isPresent(resizingStartUIModel) && isPresent(currentGridPos); // Calculate the first row of the dragging event

  hooks_module_(function () {
    if (canCalculateProps && rowIndex === baseResizingInfo.eventStartDateRowIndex) {
      var eventStartDateRowIndex = baseResizingInfo.eventStartDateRowIndex,
          eventStartDateColumnIndex = baseResizingInfo.eventStartDateColumnIndex;
      var clonedUIModel = baseResizingInfo.resizeTargetUIModelRows[eventStartDateRowIndex][0].clone();
      var height;

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

  hooks_module_(function () {
    if (canCalculateProps && baseResizingInfo.eventStartDateRowIndex < rowIndex && rowIndex < currentGridPos.rowIndex) {
      var clonedUIModel = resizingStartUIModel.clone();
      clonedUIModel.setUIProps({
        left: 0,
        exceedLeft: true,
        exceedRight: true
      });
      setGuideProps([clonedUIModel, '100%']);
    }
  }, [baseResizingInfo, canCalculateProps, currentGridPos, resizingStartUIModel, rowIndex]); // Calculate the last row of the dragging event

  hooks_module_(function () {
    if (canCalculateProps && baseResizingInfo.eventStartDateRowIndex < currentGridPos.rowIndex && rowIndex === currentGridPos.rowIndex) {
      var clonedUIModel = resizingStartUIModel.clone();
      clonedUIModel.setUIProps({
        left: 0,
        exceedLeft: true
      });
      setGuideProps([clonedUIModel, cellWidthMap[0][currentGridPos.columnIndex]]);
    }
  }, [baseResizingInfo, canCalculateProps, cellWidthMap, currentGridPos, resizingStartUIModel, rowIndex]); // Reset props on out of bound

  hooks_module_(function () {
    if (canCalculateProps && rowIndex > baseResizingInfo.eventStartDateRowIndex && rowIndex > currentGridPos.rowIndex) {
      setGuideProps(null);
    }
  }, [canCalculateProps, currentGridPos, baseResizingInfo, rowIndex]);
  useWhen(function () {
    if (canCalculateProps) {
      /**
       * Is current grid position is the same or later comparing to the position of the start date?
       */
      var eventStartDateColumnIndex = baseResizingInfo.eventStartDateColumnIndex,
          eventStartDateRowIndex = baseResizingInfo.eventStartDateRowIndex;
      var shouldUpdate = !isDraggingCanceled && (currentGridPos.rowIndex === eventStartDateRowIndex && currentGridPos.columnIndex >= eventStartDateColumnIndex || currentGridPos.rowIndex > eventStartDateRowIndex);

      if (shouldUpdate) {
        var targetEndDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.columnIndex];
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














function resizingGuideByRow_slicedToArray(arr, i) { return resizingGuideByRow_arrayWithHoles(arr) || resizingGuideByRow_iterableToArrayLimit(arr, i) || resizingGuideByRow_unsupportedIterableToArray(arr, i) || resizingGuideByRow_nonIterableRest(); }

function resizingGuideByRow_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function resizingGuideByRow_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return resizingGuideByRow_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return resizingGuideByRow_arrayLikeToArray(o, minLen); }

function resizingGuideByRow_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function resizingGuideByRow_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function resizingGuideByRow_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







function ResizingGuideByRow(_ref) {
  var dateMatrix = _ref.dateMatrix,
      cellWidthMap = _ref.cellWidthMap,
      gridPositionFinder = _ref.gridPositionFinder,
      renderedUIModels = _ref.renderedUIModels,
      rowIndex = _ref.rowIndex;
  var resizingGuideProps = useDayGridMonthEventResize({
    dateMatrix: dateMatrix,
    gridPositionFinder: gridPositionFinder,
    cellWidthMap: cellWidthMap,
    renderedUIModels: renderedUIModels,
    rowIndex: rowIndex
  });

  if (type_isNil(resizingGuideProps)) {
    return null;
  }

  var _resizingGuideProps = resizingGuideByRow_slicedToArray(resizingGuideProps, 2),
      uiModel = _resizingGuideProps[0],
      resizingWidth = _resizingGuideProps[1];

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















function dayGridMonth_slicedToArray(arr, i) { return dayGridMonth_arrayWithHoles(arr) || dayGridMonth_iterableToArrayLimit(arr, i) || dayGridMonth_unsupportedIterableToArray(arr, i) || dayGridMonth_nonIterableRest(); }

function dayGridMonth_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function dayGridMonth_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dayGridMonth_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dayGridMonth_arrayLikeToArray(o, minLen); }

function dayGridMonth_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dayGridMonth_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function dayGridMonth_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }























var TOTAL_PERCENT_HEIGHT = 100;

function useCellContentAreaHeight(eventHeight) {
  var visibleEventCount = useStore(monthVisibleEventCountSelector);

  var _useTheme = useTheme(monthGridCellSelector),
      themeHeaderHeight = _useTheme.headerHeight,
      themeFooterHeight = _useTheme.footerHeight;

  var ref = hooks_module_s(null);

  var _useState = hooks_module_y(0),
      _useState2 = dayGridMonth_slicedToArray(_useState, 2),
      cellContentAreaHeight = _useState2[0],
      setCellContentAreaHeight = _useState2[1];

  hooks_module_(function () {
    if (ref.current) {
      var rowHeight = getSize(ref.current).height;
      var headerHeight = MONTH_CELL_PADDING_TOP + (themeHeaderHeight !== null && themeHeaderHeight !== void 0 ? themeHeaderHeight : MONTH_CELL_BAR_HEIGHT);
      var footerHeight = themeFooterHeight !== null && themeFooterHeight !== void 0 ? themeFooterHeight : 0;
      var baseContentAreaHeight = rowHeight - headerHeight - footerHeight;
      var visibleEventCountHeight = visibleEventCount * (eventHeight + MONTH_EVENT_MARGIN_TOP);
      setCellContentAreaHeight(Math.min(baseContentAreaHeight, visibleEventCountHeight));
    }
  }, [themeFooterHeight, themeHeaderHeight, eventHeight, visibleEventCount]);
  return {
    ref: ref,
    cellContentAreaHeight: cellContentAreaHeight
  };
}

function DayGridMonth(_ref) {
  var _ref$dateMatrix = _ref.dateMatrix,
      dateMatrix = _ref$dateMatrix === void 0 ? [] : _ref$dateMatrix,
      _ref$rowInfo = _ref.rowInfo,
      rowInfo = _ref$rowInfo === void 0 ? [] : _ref$rowInfo,
      _ref$cellWidthMap = _ref.cellWidthMap,
      cellWidthMap = _ref$cellWidthMap === void 0 ? [] : _ref$cellWidthMap;

  var _useDOMNode = useDOMNode(),
      _useDOMNode2 = dayGridMonth_slicedToArray(_useDOMNode, 2),
      gridContainer = _useDOMNode2[0],
      setGridContainerRef = _useDOMNode2[1];

  var calendar = useStore(calendarSelector); // TODO: event height need to be dynamic

  var _useCellContentAreaHe = useCellContentAreaHeight(MONTH_EVENT_HEIGHT),
      ref = _useCellContentAreaHe.ref,
      cellContentAreaHeight = _useCellContentAreaHe.cellContentAreaHeight;

  var _useStore = useStore(optionsSelector),
      eventFilter = _useStore.eventFilter,
      monthOptions = _useStore.month,
      isReadOnly = _useStore.isReadOnly;

  var _ref2 = monthOptions,
      narrowWeekend = _ref2.narrowWeekend,
      startDayOfWeek = _ref2.startDayOfWeek;
  var rowHeight = TOTAL_PERCENT_HEIGHT / dateMatrix.length;
  var gridPositionFinder = F(function () {
    return createGridPositionFinder({
      container: gridContainer,
      rowsCount: dateMatrix.length,
      columnsCount: dateMatrix[0].length,
      narrowWeekend: narrowWeekend,
      startDayOfWeek: startDayOfWeek
    });
  }, [dateMatrix, gridContainer, narrowWeekend, startDayOfWeek]);
  var calendarData = useCalendarData(calendar, eventFilter);
  var renderedEventUIModels = F(function () {
    return dateMatrix.map(function (week) {
      return getRenderedEventUIModels(week, calendarData, narrowWeekend);
    });
  }, [calendarData, dateMatrix, narrowWeekend]);
  var onMouseDown = useGridSelection({
    type: 'dayGridMonth',
    gridPositionFinder: gridPositionFinder,
    dateCollection: dateMatrix,
    dateGetter: dayGridMonthSelectionHelper.getDateFromCollection,
    selectionSorter: dayGridMonthSelectionHelper.sortSelection
  });
  return h("div", {
    ref: setGridContainerRef,
    onMouseDown: passConditionalProp(!isReadOnly, onMouseDown),
    className: cls('month-daygrid')
  }, dateMatrix.map(function (week, rowIndex) {
    var _renderedEventUIModel = renderedEventUIModels[rowIndex],
        uiModels = _renderedEventUIModel.uiModels,
        gridDateEventModelMap = _renderedEventUIModel.gridDateEventModelMap;
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
function month_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function month_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? month_ownKeys(Object(source), !0).forEach(function (key) { month_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : month_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function month_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function view_month_toConsumableArray(arr) { return view_month_arrayWithoutHoles(arr) || view_month_iterableToArray(arr) || view_month_unsupportedIterableToArray(arr) || view_month_nonIterableSpread(); }

function view_month_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function view_month_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return view_month_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return view_month_arrayLikeToArray(o, minLen); }

function view_month_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function view_month_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return view_month_arrayLikeToArray(arr); }

function view_month_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
































function getMonthDayNames(options) {
  var _ref = options.month,
      dayNames = _ref.dayNames,
      startDayOfWeek = _ref.startDayOfWeek,
      workweek = _ref.workweek;

  var dayIndices = view_month_toConsumableArray(Array(7)).map(function (_, i) {
    return (startDayOfWeek + i) % 7;
  });

  var monthDayNames = dayIndices.map(function (i) {
    return {
      day: i,
      label: capitalize(dayNames[i])
    };
  });
  return monthDayNames.filter(function (dayNameInfo) {
    return workweek ? !isWeekend(dayNameInfo.day) : true;
  });
}

function Month() {
  var options = useStore(optionsSelector);

  var _useStore = useStore(viewSelector),
      renderDate = _useStore.renderDate;

  var dayNames = getMonthDayNames(options);
  var monthOptions = options.month;
  var narrowWeekend = monthOptions.narrowWeekend,
      startDayOfWeek = monthOptions.startDayOfWeek,
      workweek = monthOptions.workweek;
  var dateMatrix = F(function () {
    return createDateMatrixOfMonth(renderDate, monthOptions);
  }, [monthOptions, renderDate]);

  var _useMemo = F(function () {
    return getRowStyleInfo(dayNames.length, narrowWeekend, startDayOfWeek, workweek);
  }, [dayNames.length, narrowWeekend, startDayOfWeek, workweek]),
      rowStyleInfo = _useMemo.rowStyleInfo,
      cellWidthMap = _useMemo.cellWidthMap;

  var rowInfo = rowStyleInfo.map(function (cellStyleInfo, index) {
    return month_objectSpread(month_objectSpread({}, cellStyleInfo), {}, {
      date: dateMatrix[0][index]
    });
  });
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

















function view_week_slicedToArray(arr, i) { return view_week_arrayWithHoles(arr) || view_week_iterableToArrayLimit(arr, i) || view_week_unsupportedIterableToArray(arr, i) || view_week_nonIterableRest(); }

function view_week_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function view_week_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return view_week_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return view_week_arrayLikeToArray(o, minLen); }

function view_week_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function view_week_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function view_week_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


























function useWeekViewState() {
  var options = useStore(optionsSelector);
  var calendar = useStore(calendarSelector);

  var _useStore = useStore(weekViewLayoutSelector),
      gridRowLayout = _useStore.dayGridRows,
      lastPanelType = _useStore.lastPanelType;

  var _useStore2 = useStore(viewSelector),
      renderDate = _useStore2.renderDate;

  return F(function () {
    return {
      options: options,
      calendar: calendar,
      gridRowLayout: gridRowLayout,
      lastPanelType: lastPanelType,
      renderDate: renderDate
    };
  }, [calendar, gridRowLayout, lastPanelType, options, renderDate]);
}

function Week() {
  var _options$week$dayName, _options$week;

  var _useWeekViewState = useWeekViewState(),
      options = _useWeekViewState.options,
      calendar = _useWeekViewState.calendar,
      gridRowLayout = _useWeekViewState.gridRowLayout,
      lastPanelType = _useWeekViewState.lastPanelType,
      renderDate = _useWeekViewState.renderDate;

  var gridHeaderMarginLeft = useTheme(hooks_module_T(function (theme) {
    return theme.week.dayGridLeft.width;
  }, []));
  var primaryTimezoneName = useStore(primaryTimezoneSelector);

  var _useDOMNode = useDOMNode(),
      _useDOMNode2 = view_week_slicedToArray(_useDOMNode, 2),
      timePanel = _useDOMNode2[0],
      setTimePanelRef = _useDOMNode2[1];

  var weekOptions = options.week;
  var narrowWeekend = weekOptions.narrowWeekend,
      startDayOfWeek = weekOptions.startDayOfWeek,
      workweek = weekOptions.workweek,
      hourStart = weekOptions.hourStart,
      hourEnd = weekOptions.hourEnd,
      eventView = weekOptions.eventView,
      taskView = weekOptions.taskView;
  var weekDates = F(function () {
    return getWeekDates(renderDate, weekOptions);
  }, [renderDate, weekOptions]);
  var dayNames = getDayNames(weekDates, (_options$week$dayName = (_options$week = options.week) === null || _options$week === void 0 ? void 0 : _options$week.dayNames) !== null && _options$week$dayName !== void 0 ? _options$week$dayName : []);

  var _getRowStyleInfo = getRowStyleInfo(weekDates.length, narrowWeekend, startDayOfWeek, workweek),
      rowStyleInfo = _getRowStyleInfo.rowStyleInfo,
      cellWidthMap = _getRowStyleInfo.cellWidthMap;

  var calendarData = useCalendarData(calendar, options.eventFilter);
  var eventByPanel = F(function () {
    var getFilterRange = function getFilterRange() {
      if (primaryTimezoneName === 'Local') {
        return [toStartOfDay(first(weekDates)), toEndOfDay(last(weekDates))];
      } // NOTE: Extend filter range because of timezone offset differences


      return [toStartOfDay(addDate(first(weekDates), -1)), toEndOfDay(addDate(last(weekDates), 1))];
    };

    var _getFilterRange = getFilterRange(),
        _getFilterRange2 = view_week_slicedToArray(_getFilterRange, 2),
        weekStartDate = _getFilterRange2[0],
        weekEndDate = _getFilterRange2[1];

    return getWeekViewEvents(weekDates, calendarData, {
      narrowWeekend: narrowWeekend,
      hourStart: hourStart,
      hourEnd: hourEnd,
      weekStartDate: weekStartDate,
      weekEndDate: weekEndDate
    });
  }, [calendarData, hourEnd, hourStart, narrowWeekend, primaryTimezoneName, weekDates]);
  var timeGridData = F(function () {
    return createTimeGridData(weekDates, {
      hourStart: hourStart,
      hourEnd: hourEnd,
      narrowWeekend: narrowWeekend
    });
  }, [hourEnd, hourStart, narrowWeekend, weekDates]);
  var activePanels = getActivePanels(taskView, eventView);
  var dayGridRows = activePanels.map(function (key) {
    var _gridRowLayout$rowTyp, _gridRowLayout$rowTyp2;

    if (key === 'time') {
      return null;
    }

    var rowType = key;
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
  var hasTimePanel = F(function () {
    return activePanels.includes('time');
  }, [activePanels]);
  useTimeGridScrollSync(timePanel, timeGridData.rows.length);
  var stickyTop = useTimezoneLabelsTop(timePanel);
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







var views = {
  month: Month,
  week: Week,
  day: day_Day
};
function Main() {
  var _useStore = useStore(viewSelector),
      currentView = _useStore.currentView;

  var CurrentViewComponent = F(function () {
    return views[currentView] || function () {
      return null;
    };
  }, [currentView]);
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
  var theme = _ref.theme,
      store = _ref.store,
      eventBus = _ref.eventBus,
      children = _ref.children;
  return h(EventBusProvider, {
    value: eventBus
  }, h(ThemeProvider, {
    store: theme
  }, h(StoreProvider, {
    store: store
  }, h(FloatingLayerProvider, null, children))));
}
;// CONCATENATED MODULE: ./src/constants/statistics.ts
var GA_TRACKING_ID = 'UA-129951699-1';
// EXTERNAL MODULE: ../../node_modules/core-js/modules/es.reflect.get.js
var es_reflect_get = __webpack_require__(4565);
// EXTERNAL MODULE: ../../node_modules/tui-code-snippet/customEvents/customEvents.js
var customEvents = __webpack_require__(2278);
var customEvents_default = /*#__PURE__*/__webpack_require__.n(customEvents);
;// CONCATENATED MODULE: ./src/utils/eventBus.ts
function eventBus_typeof(obj) { "@babel/helpers - typeof"; return eventBus_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, eventBus_typeof(obj); }
















function eventBus_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function eventBus_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function eventBus_createClass(Constructor, protoProps, staticProps) { if (protoProps) eventBus_defineProperties(Constructor.prototype, protoProps); if (staticProps) eventBus_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = eventBus_getPrototypeOf(object); if (object === null) break; } return object; }

function eventBus_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) eventBus_setPrototypeOf(subClass, superClass); }

function eventBus_setPrototypeOf(o, p) { eventBus_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return eventBus_setPrototypeOf(o, p); }

function eventBus_createSuper(Derived) { var hasNativeReflectConstruct = eventBus_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = eventBus_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = eventBus_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return eventBus_possibleConstructorReturn(this, result); }; }

function eventBus_possibleConstructorReturn(self, call) { if (call && (eventBus_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return eventBus_assertThisInitialized(self); }

function eventBus_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function eventBus_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function eventBus_getPrototypeOf(o) { eventBus_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return eventBus_getPrototypeOf(o); }


var EventBusImpl = /*#__PURE__*/function (_CustomEvents) {
  eventBus_inherits(EventBusImpl, _CustomEvents);

  var _super = eventBus_createSuper(EventBusImpl);

  function EventBusImpl() {
    eventBus_classCallCheck(this, EventBusImpl);

    return _super.apply(this, arguments);
  }

  eventBus_createClass(EventBusImpl, [{
    key: "on",
    value: function on(eventName, handler) {
      _get(eventBus_getPrototypeOf(EventBusImpl.prototype), "on", this).call(this, eventName, handler);

      return this;
    }
  }, {
    key: "off",
    value: function off(eventName, handler) {
      _get(eventBus_getPrototypeOf(EventBusImpl.prototype), "off", this).call(this, eventName, handler);

      return this;
    }
  }, {
    key: "fire",
    value: function fire(eventName) {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_get2 = _get(eventBus_getPrototypeOf(EventBusImpl.prototype), "fire", this)).call.apply(_get2, [this, eventName].concat(args));

      return this;
    }
  }, {
    key: "once",
    value: function once(eventName, handler) {
      _get(eventBus_getPrototypeOf(EventBusImpl.prototype), "once", this).call(this, eventName, handler);

      return this;
    }
  }]);

  return EventBusImpl;
}((customEvents_default()));
;// CONCATENATED MODULE: ./src/factory/calendarCore.tsx

















var calendarCore_excluded = ["dispatch"],
    _excluded2 = ["theme", "template"];

function calendarCore_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function calendarCore_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? calendarCore_ownKeys(Object(source), !0).forEach(function (key) { calendarCore_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : calendarCore_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function calendarCore_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function calendarCore_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = calendarCore_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function calendarCore_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





function calendarCore_slicedToArray(arr, i) { return calendarCore_arrayWithHoles(arr) || calendarCore_iterableToArrayLimit(arr, i) || calendarCore_unsupportedIterableToArray(arr, i) || calendarCore_nonIterableRest(); }

function calendarCore_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function calendarCore_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return calendarCore_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return calendarCore_arrayLikeToArray(o, minLen); }

function calendarCore_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function calendarCore_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function calendarCore_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function calendarCore_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function calendarCore_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function calendarCore_createClass(Constructor, protoProps, staticProps) { if (protoProps) calendarCore_defineProperties(Constructor.prototype, protoProps); if (staticProps) calendarCore_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


















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
var CalendarCore = /*#__PURE__*/function () {
  /**
   * start and end date of weekly, monthly
   * @private
   */
  function CalendarCore(container) {
    var _document$querySelect, _document;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    calendarCore_classCallCheck(this, CalendarCore);

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

  calendarCore_createClass(CalendarCore, [{
    key: "getStoreState",
    value: function getStoreState(group) {
      var state = this.store.getState();
      return group ? state[group] : state;
    }
  }, {
    key: "getStoreDispatchers",
    value: function getStoreDispatchers(group) {
      var dispatchers = this.store.getState().dispatch;
      return group ? dispatchers[group] : dispatchers;
    }
    /**
     * Destroys the instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this.container) {
        un(this.container);
      }

      this.store.clearListeners();
      this.theme.clearListeners();
      this.eventBus.off();
      removeAttributeHooks();

      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          delete this[key];
        }
      }
    }
  }, {
    key: "calculateMonthRenderDate",
    value: function calculateMonthRenderDate(_ref) {
      var renderDate = _ref.renderDate,
          offset = _ref.offset,
          monthOptions = _ref.monthOptions;
      var newRenderDate = new date_TZDate(renderDate);
      var visibleWeeksCount = monthOptions.visibleWeeksCount;

      if (visibleWeeksCount > 0) {
        newRenderDate = addDate(newRenderDate, offset * 7 * visibleWeeksCount);
      } else {
        newRenderDate = addMonths(newRenderDate, offset);
      }

      var dateMatrix = createDateMatrixOfMonth(newRenderDate, monthOptions);

      var _dateMatrix = calendarCore_slicedToArray(dateMatrix, 1),
          _dateMatrix$ = calendarCore_slicedToArray(_dateMatrix[0], 1),
          start = _dateMatrix$[0];

      var end = last(last(dateMatrix));
      return {
        renderDate: newRenderDate,
        renderRange: {
          start: start,
          end: end
        }
      };
    }
  }, {
    key: "calculateWeekRenderDate",
    value: function calculateWeekRenderDate(_ref2) {
      var renderDate = _ref2.renderDate,
          offset = _ref2.offset,
          weekOptions = _ref2.weekOptions;
      var newRenderDate = new date_TZDate(renderDate);
      newRenderDate.addDate(offset * 7);
      var weekDates = getWeekDates(newRenderDate, weekOptions);

      var _weekDates = calendarCore_slicedToArray(weekDates, 1),
          start = _weekDates[0];

      var end = last(weekDates);
      return {
        renderDate: newRenderDate,
        renderRange: {
          start: start,
          end: end
        }
      };
    }
  }, {
    key: "calculateDayRenderDate",
    value: function calculateDayRenderDate(_ref3) {
      var renderDate = _ref3.renderDate,
          offset = _ref3.offset;
      var newRenderDate = new date_TZDate(renderDate);
      newRenderDate.addDate(offset);
      var start = toStartOfDay(newRenderDate);
      var end = toEndOfDay(newRenderDate);
      return {
        renderDate: newRenderDate,
        renderRange: {
          start: start,
          end: end
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

  }, {
    key: "move",
    value: function move(offset) {
      if (type_isNil(offset)) {
        return;
      }

      var _this$getStoreState$v = this.getStoreState().view,
          currentView = _this$getStoreState$v.currentView,
          renderDate = _this$getStoreState$v.renderDate;

      var _this$getStoreState = this.getStoreState(),
          options = _this$getStoreState.options;

      var setRenderDate = this.getStoreDispatchers().view.setRenderDate;
      var newRenderDate = new date_TZDate(renderDate);
      var calculatedRenderDate = {
        renderDate: newRenderDate,
        renderRange: {
          start: new date_TZDate(newRenderDate),
          end: new date_TZDate(newRenderDate)
        }
      };

      if (currentView === 'month') {
        calculatedRenderDate = this.calculateMonthRenderDate({
          renderDate: renderDate,
          offset: offset,
          monthOptions: options.month
        });
      } else if (currentView === 'week') {
        calculatedRenderDate = this.calculateWeekRenderDate({
          renderDate: renderDate,
          offset: offset,
          weekOptions: options.week
        });
      } else if (currentView === 'day') {
        calculatedRenderDate = this.calculateDayRenderDate({
          renderDate: renderDate,
          offset: offset
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

  }, {
    key: "createEvents",
    value: function createEvents(events) {
      var _this$getStoreDispatc = this.getStoreDispatchers('calendar'),
          createEvents = _this$getStoreDispatc.createEvents;

      createEvents(events);
    }
  }, {
    key: "getEventModel",
    value: function getEventModel(eventId, calendarId) {
      var _this$getStoreState2 = this.getStoreState('calendar'),
          events = _this$getStoreState2.events;

      return events.find(function (_ref4) {
        var id = _ref4.id,
            eventCalendarId = _ref4.calendarId;
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

  }, {
    key: "getEvent",
    value: function getEvent(eventId, calendarId) {
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

  }, {
    key: "updateEvent",
    value: function updateEvent(eventId, calendarId, changes) {
      var _this$getStoreDispatc2 = this.getStoreDispatchers('calendar'),
          updateEvent = _this$getStoreDispatc2.updateEvent;

      var event = this.getEventModel(eventId, calendarId);

      if (event) {
        updateEvent({
          event: event,
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

  }, {
    key: "deleteEvent",
    value: function deleteEvent(eventId, calendarId) {
      var _this$getStoreDispatc3 = this.getStoreDispatchers('calendar'),
          deleteEvent = _this$getStoreDispatc3.deleteEvent;

      var event = this.getEventModel(eventId, calendarId);

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

  }, {
    key: "setCalendarVisibility",
    value: function setCalendarVisibility(calendarId, isVisible) {
      var _this$getStoreDispatc4 = this.getStoreDispatchers('calendar'),
          setCalendarVisibility = _this$getStoreDispatc4.setCalendarVisibility;

      var calendarIds = Array.isArray(calendarId) ? calendarId : [calendarId];
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

  }, {
    key: "render",
    value: function render() {
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

  }, {
    key: "renderToString",
    value: function renderToString() {
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

  }, {
    key: "clear",
    value: function clear() {
      var _this$getStoreDispatc5 = this.getStoreDispatchers('calendar'),
          clearEvents = _this$getStoreDispatc5.clearEvents;

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

  }, {
    key: "scrollToNow",
    value: function scrollToNow() {
      var scrollBehavior = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
      this.eventBus.fire('scrollToNow', scrollBehavior);
    }
  }, {
    key: "calculateRenderRange",
    value: function calculateRenderRange(renderDate) {
      var currentView = this.getStoreState().view.currentView;

      var _this$getStoreState3 = this.getStoreState(),
          options = _this$getStoreState3.options;

      var newRenderDate = new date_TZDate(renderDate);
      var newRenderRange = {
        start: new date_TZDate(newRenderDate),
        end: new date_TZDate(newRenderDate)
      };

      if (currentView === 'month') {
        newRenderRange = this.calculateMonthRenderDate({
          renderDate: renderDate,
          offset: 0,
          monthOptions: options.month
        }).renderRange;
      } else if (currentView === 'week') {
        newRenderRange = this.calculateWeekRenderDate({
          renderDate: renderDate,
          offset: 0,
          weekOptions: options.week
        }).renderRange;
      } else if (currentView === 'day') {
        newRenderRange = this.calculateDayRenderDate({
          renderDate: renderDate,
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

  }, {
    key: "today",
    value: function today() {
      var setRenderDate = this.getStoreDispatchers().view.setRenderDate;
      var today = new date_TZDate();
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

  }, {
    key: "setDate",
    value: function setDate(date) {
      var _this$getStoreDispatc6 = this.getStoreDispatchers('view'),
          setRenderDate = _this$getStoreDispatc6.setRenderDate;

      var dateToChange = new date_TZDate(date);
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

  }, {
    key: "next",
    value: function next() {
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

  }, {
    key: "prev",
    value: function prev() {
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

  }, {
    key: "setCalendarColor",
    value: function setCalendarColor(calendarId, colorOptions) {
      var setCalendarColor = this.getStoreDispatchers().calendar.setCalendarColor;
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

  }, {
    key: "changeView",
    value: function changeView(viewName) {
      var _this$getStoreDispatc7 = this.getStoreDispatchers('view'),
          changeView = _this$getStoreDispatc7.changeView;

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

  }, {
    key: "getElement",
    value: function getElement(eventId, calendarId) {
      var event = this.getEvent(eventId, calendarId);

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

  }, {
    key: "setTheme",
    value: function setTheme(theme) {
      var setTheme = this.theme.getState().dispatch.setTheme;
      setTheme(theme);
    }
    /**
     * Get current options.
     *
     * @returns {Options} - The current options of the instance
     */

  }, {
    key: "getOptions",
    value: function getOptions() {
      var _this$getStoreState4 = this.getStoreState(),
          options = _this$getStoreState4.options,
          template = _this$getStoreState4.template;

      var _this$theme$getState = this.theme.getState(),
          dispatch = _this$theme$getState.dispatch,
          theme = calendarCore_objectWithoutProperties(_this$theme$getState, calendarCore_excluded);

      return calendarCore_objectSpread(calendarCore_objectSpread({}, options), {}, {
        template: template,
        theme: theme
      });
    }
    /**
     * Set options of calendar. For more information, see {@link https://github.com/nhn/tui.calendar/blob/main/docs/en/apis/options.md|Options} in guide.
     *
     * @param {Options} options - The options to set
     */

  }, {
    key: "setOptions",
    value: function setOptions(options) {
      // destructure options here for tui.doc to generate docs correctly
      var theme = options.theme,
          template = options.template,
          restOptions = calendarCore_objectWithoutProperties(options, _excluded2);

      var setTheme = this.theme.getState().dispatch.setTheme;

      var _this$getStoreDispatc8 = this.getStoreDispatchers(),
          setOptions = _this$getStoreDispatc8.options.setOptions,
          setTemplate = _this$getStoreDispatc8.template.setTemplate;

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

  }, {
    key: "getDate",
    value: function getDate() {
      var renderDate = this.getStoreState().view.renderDate;
      return renderDate;
    }
    /**
     * Start time of rendered date range. (see {@link TZDate} for further information)
     *
     * @returns {TZDate}
     */

  }, {
    key: "getDateRangeStart",
    value: function getDateRangeStart() {
      return this.renderRange.start;
    }
    /**
     * End time of rendered date range. (see {@link TZDate} for further information)
     *
     * @returns {TZDate}
     */

  }, {
    key: "getDateRangeEnd",
    value: function getDateRangeEnd() {
      return this.renderRange.end;
    }
    /**
     * Get current view name('day', 'week', 'month').
     *
     * @returns {string} current view name ('day', 'week', 'month')
     */

  }, {
    key: "getViewName",
    value: function getViewName() {
      var _this$getStoreState5 = this.getStoreState('view'),
          currentView = _this$getStoreState5.currentView;

      return currentView;
    }
    /**
     * Set calendar list.
     *
     * @param {CalendarInfo[]} calendars - list of calendars
     */

  }, {
    key: "setCalendars",
    value: function setCalendars(calendars) {
      var setCalendars = this.getStoreDispatchers().calendar.setCalendars;
      setCalendars(calendars);
    } // TODO: specify position of popup

    /**
     * Open event form popup with predefined form values.
     *
     * @param {EventObject} event - The predefined {@link EventObject} data to show in form.
     */

  }, {
    key: "openFormPopup",
    value: function openFormPopup(event) {
      var showFormPopup = this.getStoreDispatchers().popup.showFormPopup;
      var eventModel = new EventModel(event);
      var title = eventModel.title,
          location = eventModel.location,
          start = eventModel.start,
          end = eventModel.end,
          isAllday = eventModel.isAllday,
          isPrivate = eventModel.isPrivate,
          eventState = eventModel.state;
      showFormPopup({
        isCreationPopup: true,
        event: eventModel,
        title: title,
        location: location,
        start: start,
        end: end,
        isAllday: isAllday,
        isPrivate: isPrivate,
        eventState: eventState
      });
    }
  }, {
    key: "clearGridSelections",
    value: function clearGridSelections() {
      var clearAll = this.getStoreDispatchers().gridSelection.clearAll;
      clearAll();
    }
  }, {
    key: "fire",
    value: function fire(eventName) {
      var _this$eventBus;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_this$eventBus = this.eventBus).fire.apply(_this$eventBus, [eventName].concat(args));

      return this;
    }
  }, {
    key: "off",
    value: function off(eventName, handler) {
      this.eventBus.off(eventName, handler);
      return this;
    }
  }, {
    key: "on",
    value: function on(eventName, handler) {
      this.eventBus.on(eventName, handler);
      return this;
    }
  }, {
    key: "once",
    value: function once(eventName, handler) {
      this.eventBus.once(eventName, handler);
      return this;
    }
  }]);

  return CalendarCore;
}();


;// CONCATENATED MODULE: ./src/factory/calendar.tsx
function calendar_typeof(obj) { "@babel/helpers - typeof"; return calendar_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, calendar_typeof(obj); }

function calendar_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function calendar_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function calendar_createClass(Constructor, protoProps, staticProps) { if (protoProps) calendar_defineProperties(Constructor.prototype, protoProps); if (staticProps) calendar_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function calendar_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) calendar_setPrototypeOf(subClass, superClass); }

function calendar_setPrototypeOf(o, p) { calendar_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return calendar_setPrototypeOf(o, p); }

function calendar_createSuper(Derived) { var hasNativeReflectConstruct = calendar_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = calendar_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = calendar_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return calendar_possibleConstructorReturn(this, result); }; }

function calendar_possibleConstructorReturn(self, call) { if (call && (calendar_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return calendar_assertThisInitialized(self); }

function calendar_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function calendar_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function calendar_getPrototypeOf(o) { calendar_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return calendar_getPrototypeOf(o); }




















// TODO: move this function to a separate file such as util
function isValidViewType(viewType) {
  return !!Object.values(VIEW_TYPE).find(function (type) {
    return type === viewType;
  });
}
/**
 * Calendar class
 *
 * @class Calendar
 * @extends CalendarCore
 * @param {object} options - Calendar options. Check out {@link CalendarCore} for more information.
 */


var Calendar = /*#__PURE__*/function (_CalendarCore) {
  calendar_inherits(Calendar, _CalendarCore);

  var _super = calendar_createSuper(Calendar);

  function Calendar(container) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    calendar_classCallCheck(this, Calendar);

    _this = _super.call(this, container, options);
    var _options$defaultView = options.defaultView,
        defaultView = _options$defaultView === void 0 ? 'week' : _options$defaultView;

    if (!isValidViewType(defaultView)) {
      throw new InvalidViewTypeError(defaultView);
    }

    _this.render();

    return _this;
  }

  calendar_createClass(Calendar, [{
    key: "getComponent",
    value: function getComponent() {
      return h(Main, null);
    }
  }]);

  return Calendar;
}(CalendarCore);


;// CONCATENATED MODULE: ./src/index.ts





/* harmony default export */ var src_0 = (Calendar);

}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});