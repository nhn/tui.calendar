/*!code-snippet v1.0.6 | NHN Entertainment*/
/**********
 * array.js
 **********/

/**
 * @fileoverview This module has some functions for handling array.
 * @author NHN Ent.
 *         FE Development Team <jiung.kang@nhnent.com>
 * @dependency type.js
 */

(function(tui) {
    'use strict';
    if (!tui) {
        tui = window.tui = {};
    }
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    var aps = Array.prototype.slice;

    /**
     * Generate an integer Array containing an arithmetic progression.
     * @param {number} start
     * @param {number} stop
     * @param {number} step
     * @memberof tui.util
     * @returns {Array}
     * @example
     *
     *   var arr = tui.util.range(5);
     *   console.log(arr); // [0,1,2,3,4]
     *
     *   arr = tui.util.range(1, 5);
     *   console.log(arr); // [1,2,3,4]
     *
     *   arr = tui.util.range(2, 10, 2);
     *   console.log(arr); // [2,4,6,8]
     *
     *   arr = tui.util.range(10, 2, -2);
     *   console.log(arr); // [10,8,6,4]
     */
    var range = function(start, stop, step) {
        var arr = [],
            flag;

        if (tui.util.isUndefined(stop)) {
            stop = start || 0;
            start = 0;
        }

        step = step || 1;
        flag = step < 0 ? -1 : 1;
        stop *= flag;

        for(; start * flag < stop; start += step) {
            arr.push(start);
        }

        return arr;
    };

    /**
     * Zip together multiple lists into a single array
     * @param {...Array}
     * @memberof tui.util
     * @returns {Array}
     * @example
     *
     *   var result = tui.util.zip([1, 2, 3], ['a', 'b','c'], [true, false, true]);
     *
     *   console.log(result[0]); // [1, 'a', true]
     *   console.log(result[1]); // [2, 'b', false]
     *   console.log(result[2]); // [3, 'c', true]
     */
    var zip = function() {
        var arr2d = aps.call(arguments),
            result = [];

        tui.util.forEach(arr2d, function(arr) {
            tui.util.forEach(arr, function(value, index) {
                if (!result[index]) {
                    result[index] = [];
                }
                result[index].push(value);
            });
        });

        return result;
    };

    tui.util.range = range;
    tui.util.zip = zip;
})(window.tui);

/**********
 * browser.js
 **********/

/**
 * @fileoverview This module detects the kind of well-known browser and version.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @namespace tui.util
 */

(function(tui) {
    'use strict';
    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    /* istanbul ignore if */
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * This object has an information that indicate the kind of browser.<br>
     * The list below is a detectable browser list.
     *  - ie7 ~ ie11
     *  - chrome
     *  - firefox
     *  - safari
     * @memberof tui.util
     * @example
     *  tui.util.browser.chrome === true;    // chrome
     *  tui.util.browser.firefox === true;    // firefox
     *  tui.util.browser.safari === true;    // safari
     *  tui.util.browser.msie === true;    // IE
     *  tui.util.browser.other === true;    // other browser
     *  tui.util.browser.version;    // browser version
     */
    var browser = {
        chrome: false,
        firefox: false,
        safari: false,
        msie: false,
        others: false,
        version: 0
    };

    var nav = window.navigator,
        appName = nav.appName.replace(/\s/g, '_'),
        userAgent = nav.userAgent;

    var rIE = /MSIE\s([0-9]+[.0-9]*)/,
        rIE11 = /Trident.*rv:11\./,
        versionRegex = {
            'firefox': /Firefox\/(\d+)\./,
            'chrome': /Chrome\/(\d+)\./,
            'safari': /Version\/([\d\.]+)\sSafari\/(\d+)/
        };

    var key, tmp;

    var detector = {
        'Microsoft_Internet_Explorer': function() {
            // ie8 ~ ie10
            browser.msie = true;
            browser.version = parseFloat(userAgent.match(rIE)[1]);
        },
        'Netscape': function() {
            var detected = false;

            if (rIE11.exec(userAgent)) {
                browser.msie = true;
                browser.version = 11;
            } else {
                for (key in versionRegex) {
                    if (versionRegex.hasOwnProperty(key)) {
                        tmp = userAgent.match(versionRegex[key]);
                        if (tmp && tmp.length > 1) {
                            browser[key] = detected = true;
                            browser.version = parseFloat(tmp[1] || 0);
                            break;
                        }
                    }
                }
            }
            if (!detected) {
                browser.others = true;
            }
        }
    };

    detector[appName]();
    tui.util.browser = browser;
})(window.tui);

/**********
 * collection.js
 **********/

/**
 * @fileoverview This module has some functions for handling object as collection.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency type.js, object.js
 */

(function(tui) {
    'use strict';
    if (!tui) {
        tui = window.tui = {};
    }
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * This variable saves whether the 'indexOf' method is in Array.prototype or not.<br>
     * And it will be checked only once when the page is loaded.
     * @type {boolean}
     */
    var hasIndexOf = !!Array.prototype.indexOf;

    /**
     * Execute the provided callback once for each element present in the array(or Array-like object) in ascending order.<br>
     * If the callback function returns false, the loop will be stopped.<br>
     * Callback function(iteratee) is invoked with three arguments:
     *  - The value of the element
     *  - The index of the element
     *  - The array(or Array-like object) being traversed
     * @param {Array} arr The array(or Array-like object) that will be traversed
     * @param {function} iteratee Callback function
     * @param {Object} [context] Context(this) of callback function
     * @memberof tui.util
     * @example
     *  var sum = 0;
     *
     *  forEachArray([1,2,3], function(value){
     *      sum += value;
     *   });
     *  alert(sum); // 6
     */
    function forEachArray(arr, iteratee, context) {
        var index = 0,
            len = arr.length;

        context = context || null;

        for (; index < len; index++) {
            if (iteratee.call(context, arr[index], index, arr) === false) {
                break;
            }
        }
    }


    /**
     * Execute the provided callback once for each property of object which actually exist.<br>
     * If the callback function returns false, the loop will be stopped.<br>
     * Callback function(iteratee) is invoked with three arguments:
     *  - The value of the property
     *  - The name of the property
     *  - The object being traversed
     * @param {Object} obj The object that will be traversed
     * @param {function} iteratee  Callback function
     * @param {Object} [context] Context(this) of callback function
     * @memberof tui.util
     * @example
     *  var sum = 0;
     *
     *  forEachOwnProperties({a:1,b:2,c:3}, function(value){
     *      sum += value;
     *  });
     *  alert(sum); // 6
     **/
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

    /**
     * Execute the provided callback once for each property of object(or element of array) which actually exist.<br>
     * If the object is Array-like object(ex-arguments object), It needs to transform to Array.(see 'ex2' of example).<br>
     * If the callback function returns false, the loop will be stopped.<br>
     * Callback function(iteratee) is invoked with three arguments:
     *  - The value of the property(or The value of the element)
     *  - The name of the property(or The index of the element)
     *  - The object being traversed
     * @param {Object} obj The object that will be traversed
     * @param {function} iteratee Callback function
     * @param {Object} [context] Context(this) of callback function
     * @memberof tui.util
     * @example
     *  //ex1
     *  var sum = 0;
     *
     *  forEach([1,2,3], function(value){
     *      sum += value;
     *  });
     *  alert(sum); // 6
     *
     *  //ex2 - In case of Array-like object
     *  function sum(){
     *      var factors = Array.prototype.slice.call(arguments);
     *      forEach(factors, function(value){
     *           //......
     *      });
     *  }
     */
    function forEach(obj, iteratee, context) {
        if (tui.util.isArray(obj)) {
            tui.util.forEachArray(obj, iteratee, context);
        } else {
            tui.util.forEachOwnProperties(obj, iteratee, context);
        }
    }

    /**
     * Execute the provided callback function once for each element in an array, in order, and constructs a new array from the results.<br>
     * If the object is Array-like object(ex-arguments object), It needs to transform to Array.(see 'ex2' of forEach example)<br>
     * Callback function(iteratee) is invoked with three arguments:
     *  - The value of the property(or The value of the element)
     *  - The name of the property(or The index of the element)
     *  - The object being traversed
     * @param {Object} obj The object that will be traversed
     * @param {function} iteratee Callback function
     * @param {Object} [context] Context(this) of callback function
     * @returns {Array} A new array composed of returned values from callback function
     * @memberof tui.util
     * @example
     *  var result = map([0,1,2,3], function(value) {
     *      return value + 1;
     *  });
     *
     *  alert(result);  // 1,2,3,4
     */
    function map(obj, iteratee, context) {
        var resultArray = [];

        context = context || null;

        tui.util.forEach(obj, function() {
            resultArray.push(iteratee.apply(context, arguments));
        });

        return resultArray;
    }

    /**
     * Execute the callback function once for each element present in the array(or Array-like object or plain object).<br>
     * If the object is Array-like object(ex-arguments object), It needs to transform to Array.(see 'ex2' of forEach example)<br>
     * Callback function(iteratee) is invoked with four arguments:
     *  - The previousValue
     *  - The currentValue
     *  - The index
     *  - The object being traversed
     * @param {Object} obj The object that will be traversed
     * @param {function} iteratee Callback function
     * @param {Object} [context] Context(this) of callback function
     * @returns {*} The result value
     * @memberof tui.util
     * @example
     *  var result = reduce([0,1,2,3], function(stored, value) {
     *      return stored + value;
     *  });
     *
     *  alert(result); // 6
     */
    function reduce(obj, iteratee, context) {
        var keys,
            index = 0,
            length,
            store;

        context = context || null;

        if (!tui.util.isArray(obj)) {
            keys = tui.util.keys(obj);
        }

        length = keys ? keys.length : obj.length;

        store = obj[keys ? keys[index++] : index++];

        for (; index < length; index++) {
            store = iteratee.call(context, store, obj[keys ? keys[index] : index]);
        }

        return store;
    }
    /**
     * Transform the Array-like object to Array.<br>
     * In low IE (below 8), Array.prototype.slice.call is not perfect. So, try-catch statement is used.
     * @param {*} arrayLike Array-like object
     * @return {Array} Array
     * @memberof tui.util
     * @example
     *  var arrayLike = {
     *      0: 'one',
     *      1: 'two',
     *      2: 'three',
     *      3: 'four',
     *      length: 4
     *  };
     *  var result = toArray(arrayLike);
     *
     *  alert(result instanceof Array); // true
     *  alert(result); // one,two,three,four
     */
    function toArray(arrayLike) {
        var arr;
        try {
            arr = Array.prototype.slice.call(arrayLike);
        } catch (e) {
            arr = [];
            forEachArray(arrayLike, function(value) {
                arr.push(value);
            });
        }
        return arr;
    }

    /**
     * Create a new array or plain object with all elements(or properties) that pass the test implemented by the provided function.<br>
     * Callback function(iteratee) is invoked with three arguments:
     *  - The value of the property(or The value of the element)
     *  - The name of the property(or The index of the element)
     *  - The object being traversed
     * @param {Object} obj Object(plain object or Array) that will be traversed
     * @param {function} iteratee Callback function
     * @param {Object} [context] Context(this) of callback function
     * @returns {Object} plain object or Array
     * @memberof tui.util
     * @example
     *  var result1 = filter([0,1,2,3], function(value) {
     *      return (value % 2 === 0);
     *  });
     *  alert(result1); // 0,2
     *
     *  var result2 = filter({a : 1, b: 2, c: 3}, function(value) {
     *      return (value % 2 !== 0);
     *  });
     *  alert(result2.a); // 1
     *  alert(result2.b); // undefined
     *  alert(result2.c); // 3
     */
    var filter = function(obj, iteratee, context) {
        var result,
            add;

        context = context || null;

        if (!tui.util.isObject(obj) || !tui.util.isFunction(iteratee)) {
            throw new Error('wrong parameter');
        }

        if (tui.util.isArray(obj)) {
            result = [];
            add = function(result, args) {
                result.push(args[0]);
            };
        } else {
            result = {};
            add = function(result, args) {
                result[args[1]] = args[0];
            };
        }

        tui.util.forEach(obj, function() {
            if (iteratee.apply(context, arguments)) {
                add(result, arguments);
            }
        }, context);

        return result;
    };

    /**
     * Returns the first index at which a given element can be found in the array from start index(default 0), or -1 if it is not present.<br>
     * It compares searchElement to elements of the Array using strict equality (the same method used by the ===, or triple-equals, operator).
     * @param {*} searchElement Element to locate in the array
     * @param {Array} array Array that will be traversed.
     * @param {number} startIndex Start index in array for searching (default 0)
     * @memberof tui.util
     * @return {number} the First index at which a given element, or -1 if it is not present
     * @example
     *
     *   var arr = ['one', 'two', 'three', 'four'],
     *       idx1,
     *       idx2;
     *
     *   idx1 = tui.util.inArray('one', arr, 3);
     *   alert(idx1); // -1
     *
     *   idx2 = tui.util.inArray('one', arr);
     *   alert(idx2); // 0
     */
    var inArray = function(searchElement, array, startIndex) {
        if (!tui.util.isArray(array)) {
            return -1;
        }

        if (hasIndexOf) {
            return Array.prototype.indexOf.call(array, searchElement, startIndex);
        }

        var i,
            length = array.length;

        // set startIndex
        if (tui.util.isUndefined(startIndex)) {
            startIndex = 0;
        } else if (startIndex >= length || startIndex < 0) {
            return -1;
        }

        // search
        for (i = startIndex; i < length; i++) {
            if (array[i] === searchElement) {
                return i;
            }
        }

        return -1;
    };

    /**
     * fetching a property
     * @param {Array} arr target collection
     * @param {String|Number} property property name
     * @memberof tui.util
     * @returns {Array}
     * @example
     *   var objArr = [
     *         {'abc': 1, 'def': 2, 'ghi': 3},
     *         {'abc': 4, 'def': 5, 'ghi': 6},
     *         {'abc': 7, 'def': 8, 'ghi': 9}
     *       ],
     *       arr2d = [
     *         [1, 2, 3],
     *         [4, 5, 6],
     *         [7, 8, 9]
     *       ],
     *       result;
     *
     *   result = tui.util.pluck(objArr, 'abc');
     *   console.log(result) // [1, 4, 7]
     *
     *   result = tui.util.pluck(arr2d, 2);
     *   console.log(result) // [3, 6, 9]
     */
    var pluck = function(arr, property) {
        var result = tui.util.map(arr, function(item) {
            return item[property];
        });
        return result;
    };

    tui.util.forEachOwnProperties = forEachOwnProperties;
    tui.util.forEachArray = forEachArray;
    tui.util.forEach = forEach;
    tui.util.toArray = toArray;
    tui.util.map = map;
    tui.util.reduce = reduce;
    tui.util.filter = filter;
    tui.util.inArray = inArray;
    tui.util.pluck = pluck;

})(window.tui);

/**********
 * customEvent.js
 **********/

/**
 * @fileoverview
 *  This module provides some functions for custom events.<br>
 *  And it is implemented in the observer design pattern.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency type.js, collection.js object.js
 */

(function(tui) {
    'use strict';
    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }

    /* istanbul ignore if */
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * A unit of event handler item.
     * @ignore
     * @typedef {Object} handlerItem
     * @property {function} fn - event handler
     * @property {*} ctx - context of event handler
     */

    /**
     * A data structure for storing handlerItems bound with a specific context
     *  and is a unit item of ctxEvents.<br>
     * Handlers in this item, will be executed with same event.
     * @ignore
     * @typedef {Object.<string, handlerItem>} ctxEventsItem
     * @example
     *  ctxEventsItem = {
     *      1_1: {
     *          fn: function(){...},
     *          ctx: context1
     *      },
     *      2_1: {
     *          fn: function(){...},
     *          ctx: context1
     *      }
     *  }
     */

    /**
     * A data structure for storing ctxEventsItem and length for each event(or event name).
     * @ignore
     * @typedef {Object.<string, (ctxEventsItem|number)>} ctxEvents
     * @example
     *  ctxEvents = {
     *      eventName1_idx: {
     *          1_1: {
     *              fn: function(){...},
     *              ctx: context1
     *          },
     *          2_1: {
     *              fn: function(){...},
     *              ctx: context1
     *          }
     *      },
     *      eventName1_len: 2,
     *      eventName2_idx: {
     *          3_2: {
     *              fn: function(){...},
     *              ctx: context2
     *          },
     *          4_2: {
     *              fn: function(){...},
     *              ctx: context2
     *          }
     *      },
     *      eventName2_len: 2
     *  };
     */


    /**
     * @constructor
     * @memberof tui.util
     */
    function CustomEvents() {
        /**
         * Caching a data structure that has normal event handlers which are not bound with a specific context.
         * @type {object.<string, handlerItem[]>}
         * @private
         */
        this._events = null;

        /**
         * Caching a {ctxEvents}
         * @type {ctxEvents}
         * @private
         */
        this._ctxEvents = null;
    }


    /**********
     * static
     **********/

    /**
     * Use for making a constructor to be able to do CustomEvent's functions.
     * @param {function} func - Constructor
     * @example
     *  function Model() {
     *      this.name = '';
     *  }
     *  tui.util.CustomEvents.mixin(Model);
     *
     *  var model = new Model();
     *  model.on('change', function() { this.name = 'model'; }, this);
     *  model.fire('change');
     *  alert(model.name); // 'model';
     */
    CustomEvents.mixin = function(func) {
        tui.util.extend(func.prototype, CustomEvents.prototype);
    };

    /**********
     * private
     **********/

    /**
     * Work similarly to Array.prototype.forEach(),
     *  however does Array.prototype.splice() additionally.<br>
     * Callback(iteratee) function is invoked with four arguments:
     *  - The value of the element
     *  - The index of the element
     *  - The array being traversed
     *  - A special callback function that decreases the length of array
     * @param {Array} arr - Array that will be traversed
     * @param {function} iteratee - Callback function
     */
    CustomEvents.prototype._forEachArraySplice = function(arr, iteratee) {
        var i,
            len,
            item,
            decrease = function() {
                arr.splice(i, 1);
                len -= 1;
                i -= 1;
            };

        if (!tui.util.isExisty(arr) || !tui.util.isArray(arr)) {
            return;
        }

        for (i = 0, len = arr.length; i < len; i++) {
            item = arr[i];

            if (iteratee(item, i, arr, decrease) === false) {
                return;
            }
        }
    };

    /**********
     * context event handler
     **********/

    /**
     * Execute the callback once for each ctxEventsItem.<br>
     * Callback function(iteratee) is invoked with three arguments:
     *  - {ctxEventsItem} A unit item of ctxEvents
     *  - {string} A key (ex - 'eventName_idx' or 'eventName_len')
     *  - {ctxEvents} A ctxEvents being traversed
     * @param {function} iteratee - Callback function
     * @private
     */
    CustomEvents.prototype._eachCtxEvents = function(iteratee) {
        var events = this._ctxEvents;
        tui.util.forEachOwnProperties(events, iteratee);
    };

    /**
     * Execute the callback once
     *  for each handler item that is value of the key including a specific string(=id, arguments[1]).<br>
     * Callback function(iteratee) is invoked with two arguments:
     *  - handlerItem
     *  - handlerItemId
     * @param {ctxEventsItem} ctxEventsItem - A data structure storing handlerItems.
     * @param {string} id - An id of handler for searching
     * @param {function} iteratee - Callback function
     * @private
     */
    CustomEvents.prototype._eachCtxHandlerItemByContainId = function(ctxEventsItem, id, iteratee) {
        tui.util.forEachOwnProperties(ctxEventsItem, function(handlerItem, handlerItemId) {
            if (handlerItemId.indexOf(id) > -1) {
                iteratee(handlerItem, handlerItemId);
            }
        });
    };

    /**
     * Execute the callback once
     *  for each case of when the provided handler(arguments[0]) is equal to a handler in ctxEventsItem.<br>
     * Callback function(iteratee) is invoked with four arguments:
     *  - handlerItem
     *  - handlerItemId
     *  - ctxEventsItem
     *  - eventKey, A Name of custom event (ex - 'eventName_idx')
     * @param {function} handler - Event handler
     * @param {function} iteratee - Callback function
     * @private
     */
    CustomEvents.prototype._eachCtxEventByHandler = function(handler, iteratee) {
        var handlerId = tui.util.stamp(handler),
            eachById = this._eachCtxHandlerItemByContainId;

        this._eachCtxEvents(function(ctxEventsItem, eventKey) {
            eachById(ctxEventsItem, handlerId, function(handlerItem, handlerItemId) {
                iteratee(handlerItem, handlerItemId, ctxEventsItem, eventKey);
            });
        });
    };

    /**
     * Execute the callback once
     *  for each case of when the provided context(arguments[0]) is equal to a context in ctxEventsItem.<br>
     * Callback function(iteratee) is invoked with four arguments:
     *  - handlerItem
     *  - handlerItemId
     *  - ctxEventsItem
     *  - eventKey, A Name of custom event with postfix (ex - 'eventName_idx')
     * @param {*} context - Context for searching
     * @param {function} iteratee - Callback function
     * @private
     */
    CustomEvents.prototype._eachCtxEventByContext = function(context, iteratee) {
        var contextId = tui.util.stamp(context),
            eachById = this._eachCtxHandlerItemByContainId;

        this._eachCtxEvents(function(ctxEventsItem, eventKey) {
            eachById(ctxEventsItem, contextId, function(handlerItem, handlerItemId) {
                iteratee(handlerItem, handlerItemId, ctxEventsItem, eventKey);
            });
        });
    };

    /**
     * Execute the callback once for each handler of ctxEventsItem of the provided eventName(arguments[0]).<br>
     * Callback function(iteratee) is invoked with four arguments:
     *  - handlerItem
     *  - handlerItemId
     *  - ctxEventsItem
     *  - eventKey, A Name of custom event with postfix (ex - 'eventName_idx')
     * @param {string} eventName - Custom event name
     * @param {function} iteratee - Callback function
     * @private
     */
    CustomEvents.prototype._eachCtxEventByEventName = function(eventName, iteratee) {
        if (!this._ctxEvents) {
            return;
        }

        var key = this._getCtxKey(eventName),
            ctxEventsItem = this._ctxEvents[key],
            args;

        tui.util.forEachOwnProperties(ctxEventsItem, function() {
            args = Array.prototype.slice.call(arguments);
            args.push(key);
            iteratee.apply(null, args);
        });
    };

    /**********
     * normal event handler
     **********/

    /**
     * Execute the callback once
     *  for each handler in instance equal to the provided handler(arguments[0]).<br>
     * Callback function(iteratee) is invoked with five arguments:
     *  - handlerItem
     *  - index of handlerItem array
     *  - eventList by handler
     *  - eventKey, A Name of custom event with postfix (ex - 'eventName_idx')
     *  - decrease, A special callback function that decreases the length of array.
     * @param {function} handler - A handler for searching
     * @param {function} iteratee - Callback function
     * @private
     */
    CustomEvents.prototype._eachEventByHandler = function(handler, iteratee) {
        var events = this._events,
            forEachArrayDecrease = this._forEachArraySplice,
            idx = 0;

        tui.util.forEachOwnProperties(events, function(eventList, eventKey) {
            forEachArrayDecrease(eventList, function(handlerItem, index, eventList, decrease) {
                if (handlerItem.fn === handler) {
                    iteratee(handlerItem, idx, eventList, eventKey, decrease);
                    idx += 1;
                }
            });
        });
    };

    /**
     * Execute the callback once for each handler of normal events of the provided eventName.<br>
     * Callback function(iteratee) is invoked with four arguments:
     *  - handler
     *  - index of handler-list
     *  - handler-list
     *  - decrease, A special callback function that decreases the length of array
     * @param {string} eventName - Custom event name
     * @param {function} iteratee - Callback function
     * @private
     */
    CustomEvents.prototype._eachEventByEventName = function(eventName, iteratee) {
        var events;

        if (!this._events) {
            return;
        }

        events = this._events[eventName];
        if (!tui.util.isExisty(events)) {
            return;
        }

        this._forEachArraySplice(events, iteratee);
    };

    /**
     * Return a new key for saving a handler with a context in event name.
     * @param {string} eventName A event name
     * @returns {string} Key
     * @private
     */
    CustomEvents.prototype._getCtxKey = function(eventName) {
        return eventName + '_idx';
    };

    /**
     * Return a new key for saving length of handlers in event name.
     * @param {string} eventName A event name
     * @returns {string} Key
     * @private
     */
    CustomEvents.prototype._getCtxLenKey = function(eventName) {
        return eventName + '_len';
    };

    /**
     * Return a new key for storing to ctxEventsItem.
     * @param {function} func A event handler
     * @param {*} ctx A context in handler
     * @returns {string} Key
     * @private
     */
    CustomEvents.prototype._getHandlerKey = function(func, ctx) {
        return tui.util.stamp(func) + '_' + tui.util.stamp(ctx);
    };


    /**
     * Set the length of handlers in ctxEventsItem.
     * @param {string} lenKey - A key for saving the length of handlers in `this._ctxEvents`
     * @param {number} change - A variation value of length
     * @private
     */
    CustomEvents.prototype._setCtxLen = function(lenKey, change) {
        var events = this._ctxEvents;

        if (!tui.util.isExisty(events[lenKey])) {
            events[lenKey] = 0;
        }

        events[lenKey] += change;
    };


    /**
     * Store a {handlerItem} to instance.
     * @param {string} eventName - Custom event name
     * @param {*} context - Context for binding
     * @param {function} handler - Handler function
     * @private
     */
    CustomEvents.prototype._addCtxEvent = function(eventName, context, handler) {
        var events = this._ctxEvents,
            key = this._getCtxKey(eventName),
            event;

        if (!tui.util.isExisty(events)) {
            events = this._ctxEvents = {};
        }

        event = events[key];
        if (!tui.util.isExisty(event)) {
            event = events[key] = {};
        }

        var lenKey = this._getCtxLenKey(eventName),
            handlerItemId = this._getHandlerKey(handler, context);

        event[handlerItemId] = {
            fn: handler,
            ctx: context
        };

        this._setCtxLen(lenKey, +1);
    };

    /**
     * Store a event handler without context to instance.
     * @param {string} eventName - Custom event name
     * @param {function} handler - Handler function
     * @private
     */
    CustomEvents.prototype._addNormalEvent = function(eventName, handler) {
        var events = this._events,
            event;

        if (!tui.util.isExisty(events)) {
            events = this._events = {};
        }

        event = events[eventName];
        if (!tui.util.isExisty(event)) {
            event = events[eventName] = [];
        }

        event.push({ fn: handler });
    };


    /**
     * Take the event handler off by handler(arguments[0])
     * @param {function} handler - Handler for offing
     * @private
     */
    CustomEvents.prototype._offByHandler = function(handler) {
        var ctxEvents = this._ctxEvents,
            lenKey;

        this._eachCtxEventByHandler(handler, function(handlerItem, hanId, ctxItems, eventKey) {
            lenKey = eventKey.replace('_idx', '_len');
            delete ctxItems[hanId];
            ctxEvents[lenKey] -= 1;
        });

        this._eachEventByHandler(handler, function(handlerItem, index, items, eventKey, decrease) {
            items.splice(index, 1);
            decrease();
        });
    };

    /**
     * Take the event handler off by context with event name
     * @param {*} context - Context
     * @param {(string|function)} [eventName] - Custom event name
     * @private
     */
    CustomEvents.prototype._offByContext = function(context, eventName) {
        var ctxEvents = this._ctxEvents,
            hasArgs = tui.util.isExisty(eventName),
            matchEventName,
            matchHandler,
            lenKey;

        this._eachCtxEventByContext(context, function(handlerItem, hanId, ctxItems, eventKey) {
            lenKey = eventKey.replace('_idx', '_len');

            matchEventName = hasArgs && tui.util.isString(eventName) && eventKey.indexOf(eventName) > -1;
            matchHandler = hasArgs && tui.util.isFunction(eventName) && handlerItem.fn === eventName;

            if (!hasArgs || (matchEventName || matchHandler)) {
                delete ctxItems[hanId];
                ctxEvents[lenKey] -= 1;
            }
        });
    };

    /**
     * Take the event handler off by event name with handler
     * @param {string} eventName - Custom event name
     * @param {function} [handler] - Event handler
     * @private
     */
    CustomEvents.prototype._offByEventName = function(eventName, handler) {
        var ctxEvents = this._ctxEvents,
            hasHandler = tui.util.isExisty(handler),
            lenKey;

        this._eachCtxEventByEventName(eventName, function(handlerItem, hanId, ctxItems, eventKey) {
            lenKey = eventKey.replace('_idx', '_len');
            if (!hasHandler || (hasHandler && handlerItem.fn === handler)) {
                delete ctxItems[hanId];
                ctxEvents[lenKey] -= 1;
            }
        });

        this._eachEventByEventName(eventName, function(handlerItem, index, items, decrease) {
            if (!hasHandler || (hasHandler && handlerItem.fn === handler)) {
                items.splice(index, 1);
                decrease();
            }
        });

    };

    /**********
     * public
     **********/

    /**
     * Attach the event handler with event name and context.
     * @param {(string|{name:string, handler:function})} eventName - Custom event name or an object {eventName: handler}
     * @param {(function|*)} [handler] - Handler function or context
     * @param {*} [context] - Context for binding
     * @example
     *  // 1. Basic
     *  customEvent.on('onload', handler);
     *
     *  // 2. With context
     *  customEvent.on('onload', handler, myObj);
     *
     *  // 3. Attach with an object
     *  customEvent.on({
     *    'play': handler,
     *    'pause': handler2
     *  });
     *
     *  // 4. Attach with an object with context
     *  customEvent.on({
     *    'play': handler
     *  }, myObj);
     */
    CustomEvents.prototype.on = function(eventName, handler, context) {
        var eventNameList;

        if (tui.util.isObject(eventName)) {
            // {eventName: handler}
            context = handler;
            tui.util.forEachOwnProperties(eventName, function(handler, name) {
                 this.on(name, handler, context);
            }, this);
            return;
        } else if (tui.util.isString(eventName) && eventName.indexOf(' ') > -1) {
            // processing of multiple events by split event name
            eventNameList = eventName.split(' ');
            tui.util.forEachArray(eventNameList, function(name) {
                this.on(name, handler, context);
            }, this);
            return;
        }

        var ctxId;

        if (tui.util.isExisty(context)) {
            ctxId = tui.util.stamp(context);
        }

        if (tui.util.isExisty(ctxId)) {
            this._addCtxEvent(eventName, context, handler);
        } else {
            this._addNormalEvent(eventName, handler);
        }
    };

    /**
     * Detach the event handler.
     * @param {(string|{name:string, handler:function})} eventName - Custom event name or an object {eventName: handler}
     * @param {function} [handler] Handler function
     * @example
     * // 1. off by context
     * customEvent.off(myObj);
     *
     * // 2. off by event name
     * customEvent.off('onload');
     *
     * // 3. off by handler
     * customEvent.off(handler);
     *
     * // 4. off by event name and handler
     * customEvent.off('play', handler);
     *
     * // 5. off by context and handler
     * customEvent.off(myObj, handler);
     *
     * // 6. off by context and event name
     * customEvent.off(myObj, 'onload');
     *
     * // 7. off by an Object.<string, function> that is {eventName: handler}
     * customEvent.off({
     *   'play': handler,
     *   'pause': handler2
     * });
     *
     * // 8. off the all events
     * customEvent.off();
     */
    CustomEvents.prototype.off = function(eventName, handler) {
        if (!arguments.length) {
            // 8. off the all events
            this._events = null;
            this._ctxEvents = null;
            return;
        }

        if (tui.util.isFunction(eventName)) {
            // 3. off by handler
            this._offByHandler(eventName);

        } else if (tui.util.isObject(eventName)) {
            if (tui.util.hasStamp(eventName)) {
                // 1, 5, 6 off by context
                this._offByContext(eventName, handler);
            } else {
                // 4. off by an Object.<string, function>
                tui.util.forEachOwnProperties(eventName, function(handler, name) {
                    this.off(name, handler);
                }, this);
            }

        } else {
            // 2, 4 off by event name
            this._offByEventName(eventName, handler);

        }
    };

    /**
     * Return a count of events registered.
     * @param {string} eventName - Custom event name
     * @returns {*}
     */
    CustomEvents.prototype.getListenerLength = function(eventName) {
        var ctxEvents = this._ctxEvents,
            events = this._events,
            existy = tui.util.isExisty,
            lenKey = this._getCtxLenKey(eventName);

        var normal = (existy(events) && tui.util.isArray(events[eventName])) ? events[eventName].length : 0,
            ctx = (existy(ctxEvents) && existy(ctxEvents[lenKey])) ? ctxEvents[lenKey] : 0;

        return normal + ctx;
    };

    /**
     * Return whether at least one of the handlers is registered in the given event name.
     * @param {string} eventName - Custom event name
     * @returns {boolean} Is there at least one handler in event name?
     */
    CustomEvents.prototype.hasListener = function(eventName) {
        return this.getListenerLength(eventName) > 0;
    };



    /**
     * Fire a event and returns the result of operation 'boolean AND' with all listener's results.<br>
     * So, It is different from {@link CustomEvents#fire}.<br>
     * In service code,
     *  use this as a before event in component level usually for notifying that the event is cancelable.
     * @param {string} eventName - Custom event name
     * @param {...*} data - Data for event
     * @returns {boolean} The result of operation 'boolean AND'
     * @example
     *  if (this.invoke('beforeZoom')) {    // check the result of 'beforeZoom'
     *      // if true,
     *      // doSomething
     *  }
     *
     *  // In service code,
     *  map.on({
     *      'beforeZoom': function() {
     *          if (that.disabled && this.getState()) {    // It should cancel the 'zoom' event by some conditions.
     *              return false;
     *          }
     *          return true;
     *      }
     *  });
     */
    CustomEvents.prototype.invoke = function(eventName, data) {
        if (!this.hasListener(eventName)) {
            return true;
        }

        var args = Array.prototype.slice.call(arguments, 1),
            self = this,
            result = true,
            existy = tui.util.isExisty;

        this._eachEventByEventName(eventName, function(item) {
            if (existy(item) && item.fn.apply(self, args) === false) {
                result = false;
            }
        });

        this._eachCtxEventByEventName(eventName, function(item) {
            if (existy(item) && item.fn.apply(item.ctx, args) === false) {
                result = false;
            }
        });

        return result;
    };

    /**
     * Fire a event by event name with data.
     * @param {string} eventName - Custom event name
     * @param {...*} data - Data for event
     * @return {Object} this
     * @example
     *  instance.on('move', function(direction) {
     *      var direction = direction;
     *  });
     *  instance.fire('move', 'left');
     */
    CustomEvents.prototype.fire = function(eventName, data) {
        this.invoke.apply(this, arguments);
        return this;
    };

    /**
     * Attach a one-shot event.
     * @param {(object|string)} eventName - Custom event name or an object {eventName: handler}
     * @param {function} fn - Handler function
     * @param {*} [context] - Context for binding
     */
    CustomEvents.prototype.once = function(eventName, fn, context) {
        var that = this;

        if (tui.util.isObject(eventName)) {
            tui.util.forEachOwnProperties(eventName, function(handler, eventName) {
                this.once(eventName, handler, fn);
            }, this);

            return;
        }

        function onceHandler() {
            fn.apply(context, arguments);
            that.off(eventName, onceHandler, context);
        }

        this.on(eventName, onceHandler, context);
    };

    tui.util.CustomEvents = CustomEvents;

})(window.tui);

/**********
 * defineClass.js
 **********/

/**
 * @fileoverview
 *  This module provides a function to make a constructor that can inherit from the other constructors like the CLASS easily.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency inheritance.js, object.js
 */

(function(tui) {
    'use strict';
    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    /* istanbul ignore if */
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * Help a constructor to be defined and to inherit from the other constructors
     * @param {*} [parent] Parent constructor
     * @param {Object} props Members of constructor
     *  @param {Function} props.init Initialization method
     *  @param {Object} [props.static] Static members of constructor
     * @returns {*} Constructor
     * @memberof tui.util
     * @example
     *  var Parent = defineClass({
     *      init: function() {
     *          this.name = 'made by def';
     *      },
     *      method: function() {
     *          //..can do something with this
     *      },
     *      static: {
     *          staticMethod: function() {
     *               //..do something
     *          }
     *      }
     *  });
     *
     *  var Child = defineClass(Parent, {
     *      method2: function() {}
     *  });
     *
     *  Parent.staticMethod();
     *
     *  var parentInstance = new Parent();
     *  console.log(parentInstance.name); //made by def
     *  parentInstance.staticMethod(); // Error
     *
     *  var childInstance = new Child();
     *  childInstance.method();
     *  childInstance.method2();
     */
    tui.util.defineClass = function(parent, props) {
        var obj;

        if (!props) {
            props = parent;
            parent = null;
        }

        obj = props.init || function(){};

        if(parent) {
            tui.util.inherit(obj, parent);
        }

        if (props.hasOwnProperty('static')) {
            tui.util.extend(obj, props.static);
            delete props.static;
        }

        tui.util.extend(obj.prototype, props);

        return obj;
    };

})(window.tui);

/**********
 * defineModule.js
 **********/

/**
 * @fileoverview Define module
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency type.js, defineNamespace.js
 */
(function(tui) {
    'use strict';
    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    /* istanbul ignore if */
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    var util = tui.util,
        INITIALIZATION_METHOD_NAME = 'initialize';

    /**
     * Define module
     * @param {string} namespace - Namespace of module
     * @param {Object} moduleDefinition - Object literal for module
     * @returns {Object} Defined module
     * @memberof tui.util
     * @example
     *     var myModule = tui.util.defineModule('modules.myModule', {
     *          name: 'john',
     *          message: '',
     *          initialize: function() {
     *              this.message = 'hello world';
     *          },
     *          getMessage: function() {
     *              return this.name + ': ' + this.message
     *          }
     *     });
     *
     *     console.log(myModule.getMessage());  // 'john: hello world';
     *     console.log(window.modules.myModule.getMessage());   // 'john: hello world';
     */
    function defineModule(namespace, moduleDefinition) {
        var base = moduleDefinition || {};

        if (util.isFunction(base[INITIALIZATION_METHOD_NAME])) {
            base[INITIALIZATION_METHOD_NAME]();
            delete base[INITIALIZATION_METHOD_NAME];
        }

        return util.defineNamespace(namespace, base, true);
    }
    tui.util.defineModule = defineModule;
})(window.tui);

/**********
 * defineNamespace.js
 **********/

/**
 * @fileoverview Define namespace
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency inheritance.js, object.js, collection.js
 */
(function(tui) {

    'use strict';
    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    /* istanbul ignore if */
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * Define namespace
     * @param {string} name - Module name
     * @param {(object|function)} props - A set of modules or one module
     * @param {boolean} isOverride flag - What if module already define, override or not
     * @returns {(object|function)} Defined namespace
     * @memberof tui.util
     * @example
     * var neComp = defineNamespace('ne.component');
     * neComp.listMenu = tui.util.defineClass({
     *      init: function() {
     *          // code
     *      }
     * });
     */
    var defineNamespace = function(name, props, isOverride) {
        var namespace,
            lastspace,
            result,
            module = getNamespace(name);

        if (!isOverride && isValidType(module)) {
            return module;
        }

        namespace = name.split('.');
        lastspace = namespace.pop();
        namespace.unshift(window);

        result = tui.util.reduce(namespace, function(obj, name) {
            obj[name] = obj[name] || {};
            return obj[name];
        });

        result[lastspace] = isValidType(props) ? props : {};

        return result[lastspace];

    };

    /**
     * Get namespace
     * @param {string} name - namespace
     * @returns {*}
     */
    var getNamespace = function(name) {
        var namespace,
            result;

        namespace = name.split('.');
        namespace.unshift(window);

        result = tui.util.reduce(namespace, function(obj, name) {
            return obj && obj[name];
        });
        return result;
    };

    /**
     * Check valid type
     * @param {*} module
     * @returns {boolean}
     */
    var isValidType = function(module) {
        return (tui.util.isObject(module) || tui.util.isFunction(module));
    };

    tui.util.defineNamespace = defineNamespace;

})(window.tui);

/**********
 * enum.js
 **********/

/**
 * @fileoverview This module provides a Enum Constructor.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency type, collection.js
 */

(function(tui) {

'use strict';

/* istanbul ignore if */
if (!tui) {
    tui = window.tui = {};
}
if (!tui.util) {
    tui.util = window.tui.util = {};
}

/**
 * Check whether the defineProperty() method is supported.
 * @type {boolean}
 */
var isSupportDefinedProperty = (function () {
    try {
        Object.defineProperty({}, 'x', {});
        return true;
    } catch (e) {
        return false;
    }
}());

/**
 * A unique value of a constant.
 * @type {number}
 */
var enumValue = 0;

/**
 * Make a constant-list that has unique values.<br>
 * In modern browsers (except IE8 and lower),<br>
 *  a value defined once can not be changed.
 *
 * @param {...string | string[]} itemList Constant-list (An array of string is available)
 * @exports Enum
 * @constructor
 * @class
 * @memberof tui.util
 * @examples
 *  //create
 *  var MYENUM = new Enum('TYPE1', 'TYPE2');
 *  var MYENUM2 = new Enum(['TYPE1', 'TYPE2']);
 *
 *  //usage
 *  if (value === MYENUM.TYPE1) {
 *       ....
 *  }
 *
 *  //add (If a duplicate name is inputted, will be disregarded.)
 *  MYENUM.set('TYPE3', 'TYPE4');
 *
 *  //get name of a constant by a value
 *  MYENUM.getName(MYENUM.TYPE1); // 'TYPE1'이 리턴된다.
 *
 *  // In modern browsers (except IE8 and lower), a value can not be changed in constants.
 *  var originalValue = MYENUM.TYPE1;
 *  MYENUM.TYPE1 = 1234; // maybe TypeError
 *  MYENUM.TYPE1 === originalValue; // true
 *
 **/
function Enum(itemList) {
    if (itemList) {
        this.set.apply(this, arguments);
    }
}

/**
 * Define a constants-list
 * @param {...string| string[]} itemList Constant-list (An array of string is available)
 */
Enum.prototype.set = function(itemList) {
    var self = this;

    if (!tui.util.isArray(itemList)) {
        itemList = tui.util.toArray(arguments);
    }

    tui.util.forEach(itemList, function itemListIteratee(item) {
        self._addItem(item);
    });
};

/**
 * Return a key of the constant.
 * @param {number} value A value of the constant.
 * @returns {string|undefined} Key of the constant.
 */
Enum.prototype.getName = function(value) {
    var foundedKey,
        self = this;

    tui.util.forEach(this, function(itemValue, key) {
        if (self._isEnumItem(key) && value === itemValue) {
            foundedKey = key;
            return false;
        }
    });

    return foundedKey;
};

/**
 * Create a constant.
 * @private
 * @param {string} name Constant name. (It will be a key of a constant)
 */
Enum.prototype._addItem = function(name) {
    var value;

    if (!this.hasOwnProperty(name)) {
        value = this._makeEnumValue();

        if (isSupportDefinedProperty) {
            Object.defineProperty(this, name, {
                enumerable: true,
                configurable: false,
                writable: false,
                value: value
            });
        } else {
            this[name] = value;
        }
    }
};

/**
 * Return a unique value for assigning to a constant.
 * @private
 * @returns {number} A unique value
 */
Enum.prototype._makeEnumValue = function() {
    var value;

    value = enumValue;
    enumValue += 1;

    return value;
};

/**
 * Return whether a constant from the given key is in instance or not.
 * @param {string} key - A constant key
 * @returns {boolean} Result
 * @private
 */
Enum.prototype._isEnumItem = function(key) {
    return tui.util.isNumber(this[key]);
};

tui.util.Enum = Enum;

})(window.tui);

/**********
 * exMap.js
 **********/

/**
 * @fileoverview
 *  Implements the ExMap (Extended Map) object.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency Map.js, collection.js
 */

(function(tui) {
    'use strict';

    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    // Caching tui.util for performance enhancing
    var util = tui.util,
        mapAPIsForRead = ['get', 'has', 'forEach', 'keys', 'values', 'entries'],
        mapAPIsForDelete = ['delete', 'clear'];

    /**
     * The ExMap object is Extended Version of the tui.util.Map object.<br>
     * and added some useful feature to make it easy to manage the Map object.
     * @constructor
     * @param {Array} initData - Array of key-value pairs (2-element Arrays).
     *      Each key-value pair will be added to the new Map
     * @memberof tui.util
     */
    function ExMap(initData) {
        this._map = new util.Map(initData);
        this.size = this._map.size;
    }

    util.forEachArray(mapAPIsForRead, function(name) {
        ExMap.prototype[name] = function() {
            return this._map[name].apply(this._map, arguments);
        };
    });

    util.forEachArray(mapAPIsForDelete, function(name) {
        ExMap.prototype[name] = function() {
            var result = this._map[name].apply(this._map, arguments);
            this.size = this._map.size;
            return result;
        };
    });

    ExMap.prototype.set = function() {
        this._map.set.apply(this._map, arguments);
        this.size = this._map.size;
        return this;
    };

    /**
     * Sets all of the key-value pairs in the specified object to the Map object.
     * @param  {Object} object - Plain object that has a key-value pair
     */
    ExMap.prototype.setObject = function(object) {
        util.forEachOwnProperties(object, function(value, key) {
            this.set(key, value);
        }, this);
    };

    /**
     * Removes the elements associated with keys in the specified array.
     * @param  {Array} keys - Array that contains keys of the element to remove
     */
    ExMap.prototype.deleteByKeys = function(keys) {
        util.forEachArray(keys, function(key) {
            this['delete'](key);
        }, this);
    };

    /**
     * Sets all of the key-value pairs in the specified Map object to this Map object.
     * @param  {Map} map - Map object to be merged into this Map object
     */
    ExMap.prototype.merge = function(map) {
        map.forEach(function(value, key) {
            this.set(key, value);
        }, this);
    };

    /**
     * Looks through each key-value pair in the map and returns the new ExMap object of
     * all key-value pairs that pass a truth test implemented by the provided function.
     * @param  {function} predicate - Function to test each key-value pair of the Map object.<br>
     *      Invoked with arguments (value, key). Return true to keep the element, false otherwise.
     * @return {ExMap} A new ExMap object
     */
    ExMap.prototype.filter = function(predicate) {
        var filtered = new ExMap();

        this.forEach(function(value, key) {
            if (predicate(value, key)) {
                filtered.set(key, value);
            }
        });

        return filtered;
    };

    util.ExMap = ExMap;
})(window.tui);

/**********
 * formatDate.js
 **********/

/**
 * @fileoverview This module has a function for date format.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency type.js
 */

(function(tui) {
    'use strict';

    var tokens = /[\\]*YYYY|[\\]*YY|[\\]*MMMM|[\\]*MMM|[\\]*MM|[\\]*M|[\\]*DD|[\\]*D|[\\]*HH|[\\]*H|[\\]*A/gi,
        MONTH_STR = ["Invalid month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        MONTH_DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        replaceMap = {
            M: function(date) {
                return Number(date.month);
            },
            MM: function(date) {
                var month = date.month;
                return (Number(month) < 10) ? '0' + month : month;
            },
            MMM: function(date) {
                return MONTH_STR[Number(date.month)].substr(0, 3);
            },
            MMMM: function(date) {
                return MONTH_STR[Number(date.month)];
            },
            D: function(date) {
                return Number(date.date);
            },
            d: function(date) {
                return replaceMap.D(date);
            },
            DD: function(date) {
                var dayInMonth = date.date;
                return (Number(dayInMonth) < 10) ? '0' + dayInMonth : dayInMonth;
            },
            dd: function(date) {
                return replaceMap.DD(date);
            },
            YY: function(date) {
                return Number(date.year) % 100;
            },
            yy: function(date) {
                return replaceMap.YY(date);
            },
            YYYY: function(date) {
                var prefix = '20',
                    year = date.year;
                if (year > 69 && year < 100) {
                    prefix = '19';
                }
                return (Number(year) < 100) ? prefix + String(year) : year;
            },
            yyyy: function(date) {
                return replaceMap.YYYY(date);
            },
            A: function(date) {
                return date.meridian;
            },
            a: function(date) {
                return date.meridian.toLowerCase();
            },
            hh: function(date) {
                var hour = date.hour;
                return (Number(hour) < 10) ? '0' + hour : hour;
            },
            HH: function(date) {
                return replaceMap.hh(date);
            },
            h: function(date) {
                return String(Number(date.hour));
            },
            H: function(date) {
                return replaceMap.h(date);
            },
            m: function(date) {
                return String(Number(date.minute));
            },
            mm: function(date) {
                var minute = date.minute;
                return (Number(minute) < 10) ? '0' + minute : minute;
            }
        };

    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    /* istanbul ignore if */
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * Check whether the given variables are valid date or not.
     * @param {number} year - Year
     * @param {number} month - Month
     * @param {number} date - Day in month.
     * @returns {boolean} Is valid?
     */
    function isValidDate(year, month, date) {
        var isValidYear,
            isValidMonth,
            isValid,
            lastDayInMonth;

        year = Number(year);
        month = Number(month);
        date = Number(date);

        isValidYear = (year > -1 && year < 100) || (year > 1969) && (year < 2070);
        isValidMonth = (month > 0) && (month < 13);

        if (!isValidYear || !isValidMonth) {
            return false;
        }

        lastDayInMonth = MONTH_DAYS[month];
        if (month === 2 && year % 4 === 0) {
            if (year % 100 !== 0 || year % 400 === 0) {
                lastDayInMonth = 29;
            }
        }

        isValid = (date > 0) && (date <= lastDayInMonth);
        return isValid;
    }

    /**
     * Return a string that transformed from the given form and date.
     * @param {string} form - Date form
     * @param {Date|Object} date - Date object
     * @returns {boolean|string} A transformed string or false.
     * @memberOf tui.util
     * @example
     *  // key         | Shorthand
     *  // ------------|-----------------------
     *  // years       | YY / YYYY / yy / yyyy
     *  // months(n)   | M / MM
     *  // months(str) | MMM / MMMM
     *  // days        | D / DD / d / dd
     *  // hours       | H / HH / h / hh
     *  // minutes     | m / mm
     *  // AM/PM       | A / a
     *
     *  var dateStr1 = formatDate('yyyy-MM-dd', {
     *      year: 2014,
     *      month: 12,
     *      date: 12
     *  });
     *  alert(dateStr1); // '2014-12-12'
     *
     *  var dateStr2 = formatDate('MMM DD YYYY HH:mm', {
     *      year: 1999,
     *      month: 9,
     *      date: 9,
     *      hour: 0,
     *      minute: 2
     *  })
     *  alert(dateStr2); // 'Sep 09 1999 00:02'
     *
     *  var dt = new Date(2010, 2, 13),
     *      dateStr3 = formatDate('yyyy년 M월 dd일', dt);
     *
     *  alert(dateStr3); // '2010년 3월 13일'
     */
    function formatDate(form, date) {
        var meridian,
            nDate,
            resultStr;

        if (tui.util.isDate(date)) {
            nDate = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                date: date.getDate(),
                hour: date.getHours(),
                minute: date.getMinutes()
            };
        } else {
            nDate = {
                year: date.year,
                month: date.month,
                date: date.date,
                hour: date.hour,
                minute: date.minute
            };
        }

        if (!isValidDate(nDate.year, nDate.month, nDate.date)) {
            return false;
        }

        nDate.meridian = '';
        if (/[^\\][aA]\b/g.test(form)) {
            meridian = (nDate.hour > 12) ? 'PM' : 'AM';
            nDate.hour %= 12;
            nDate.meridian = meridian;
        }

        resultStr = form.replace(tokens, function(key) {
            if (key.indexOf('\\') > -1) {
                return key.replace(/\\/g, '');
            } else {
                return replaceMap[key](nDate) || '';
            }
        });
        return resultStr;
    }

    tui.util.formatDate = formatDate;
})(window.tui);


/**********
 * func.js
 **********/

/**
 * @fileoverview This module provides a bind() function for context binding.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 */

(function(tui) {
    'use strict';

    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * Create a new function that, when called, has its this keyword set to the provided value.
     * @param {function} fn A original function before binding
     * @param {*} obj context of function in arguments[0]
     * @return {function()} A new bound function with context that is in arguments[1]
     * @memberof tui.util
     */
    function bind(fn, obj) {
        var slice = Array.prototype.slice;

        if (fn.bind) {
            return fn.bind.apply(fn, slice.call(arguments, 1));
        }

        /* istanbul ignore next */
        var args = slice.call(arguments, 2);

        /* istanbul ignore next */
        return function() {
            /* istanbul ignore next */
            return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
        };
    }

    tui.util.bind = bind;

})(window.tui);

/**********
 * hashMap.js
 **********/

/**
 * @fileoverview This module provides the HashMap constructor.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency type, collection.js
 */

(function(tui) {
    'use strict';

    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * All the data in hashMap begin with _MAPDATAPREFIX;
     * @type {string}
     * @private
     */
    var _MAPDATAPREFIX = 'å';

    /**
     * HashMap can handle the key-value pairs.<br>
     * Caution:<br>
     *  HashMap instance has a length property but is not an instance of Array.
     * @param {Object} [obj] A initial data for creation.
     * @constructor
     * @memberof tui.util
     * @example
     *  var hm = new tui.util.HashMap({
     *      'mydata': {
     *           'hello': 'imfine'
     *       },
     *      'what': 'time'
     *  });
     */
    function HashMap(obj) {
        /**
         * size
         * @type {number}
         */
        this.length = 0;

        if (obj) {
            this.setObject(obj);
        }
    }

    /**
     * Set a data from the given key with value or the given object.
     * @param {string|Object} key A string or object for key
     * @param {*} [value] A data
     * @example
     *  var hm = new HashMap();
     *
     *  hm.set('key', 'value');
     *  hm.set({
     *      'key1': 'data1',
     *      'key2': 'data2'
     *  });
     */
    HashMap.prototype.set = function(key, value) {
        if(arguments.length === 2) {
            this.setKeyValue(key, value);
        } else {
            this.setObject(key);
        }
    };

    /**
     * Set a data from the given key with value.
     * @param {string} key A string for key
     * @param {*} value A data
     * @example
     *  var hm = new HashMap();
     *  hm.setKeyValue('key', 'value');
     */
    HashMap.prototype.setKeyValue = function(key, value) {
        if (!this.has(key)) {
            this.length += 1;
        }
        this[this.encodeKey(key)] = value;
    };

    /**
     * Set a data from the given object.
     * @param {Object} obj A object for data
     * @example
     *  var hm = new HashMap();
     *
     *  hm.setObject({
     *      'key1': 'data1',
     *      'key2': 'data2'
     *  });
     */
    HashMap.prototype.setObject = function(obj) {
        var self = this;

        tui.util.forEachOwnProperties(obj, function(value, key) {
            self.setKeyValue(key, value);
        });
    };

    /**
     * Merge with the given another hashMap.
     * @param {HashMap} hashMap Another hashMap instance
     */
    HashMap.prototype.merge = function(hashMap) {
        var self = this;

        hashMap.each(function(value, key) {
            self.setKeyValue(key, value);
        });
    };

    /**
     * Encode the given key for hashMap.
     * @param {string} key A string for key
     * @returns {string} A encoded key
     * @private
     */
    HashMap.prototype.encodeKey = function(key) {
        return _MAPDATAPREFIX + key;
    };

    /**
     * Decode the given key in hashMap.
     * @param {string} key A string for key
     * @returns {string} A decoded key
     * @private
     */
    HashMap.prototype.decodeKey = function(key) {
        var decodedKey = key.split(_MAPDATAPREFIX);
        return decodedKey[decodedKey.length-1];
    };

    /**
     * Return the value from the given key.
     * @param {string} key A string for key
     * @returns {*} The value from a key
     * @example
     *  var hm = new HashMap();
     *  hm.set('key', 'value');
     *
     *  hm.get('key') // value
     */
    HashMap.prototype.get = function(key) {
        return this[this.encodeKey(key)];
    };

    /**
     * Check the existence of a value from the key.
     * @param {string} key A string for key
     * @returns {boolean} Indicating whether a value exists or not.
     * @example
     *  var hm = new HashMap();
     *  hm.set('key', 'value');
     *
     *  hm.has('key') // true
     */
    HashMap.prototype.has = function(key) {
        return this.hasOwnProperty(this.encodeKey(key));
    };

    /**
     * Remove a data(key-value pairs) from the given key or the given key-list.
     * @param {...string|string[]} key A string for key
     * @returns {string|string[]} A removed data
     * @example
     *  var hm = new HashMap();
     *  hm.set('key', 'value');
     *  hm.set('key2', 'value');
     *
     *  //ex1
     *  hm.remove('key');
     *
     *  //ex2
     *  hm.remove('key', 'key2');
     *
     *  //ex3
     *  hm.remove(['key', 'key2']);
     */
    HashMap.prototype.remove = function(key) {
        if (arguments.length > 1) {
            key = tui.util.toArray(arguments);
        }

        return tui.util.isArray(key) ? this.removeByKeyArray(key) : this.removeByKey(key);
    };

    /**
     * Remove data(key-value pair) from the given key.
     * @param {string} key A string for key
     * @returns {*|null} A removed data
     * @example
     *  var hm = new HashMap();
     *  hm.set('key', 'value');
     *
     *  hm.removeByKey('key')
     */
    HashMap.prototype.removeByKey = function(key) {
        var data = this.has(key) ? this.get(key) : null;

        if (data !== null) {
            delete this[this.encodeKey(key)];
            this.length -= 1;
        }

        return data;
    };

    /**
     * Remove a data(key-value pairs) from the given key-list.
     * @param {string[]} keyArray An array of keys
     * @returns {string[]} A removed data
     * @example
     *  var hm = new HashMap();
     *  hm.set('key', 'value');
     *  hm.set('key2', 'value');
     *
     *  hm.removeByKeyArray(['key', 'key2']);
     */
    HashMap.prototype.removeByKeyArray = function(keyArray) {
        var data = [],
            self = this;

        tui.util.forEach(keyArray, function(key) {
            data.push(self.removeByKey(key));
        });

        return data;
    };

    /**
     * Remove all the data
     */
    HashMap.prototype.removeAll = function() {
        var self = this;

        this.each(function(value, key) {
            self.remove(key);
        });
    };

    /**
     * Execute the provided callback once for each all the data.
     * @param {Function} iteratee Callback function
     * @example
     *  var hm = new HashMap();
     *  hm.set('key', 'value');
     *  hm.set('key2', 'value');
     *
     *  hm.each(function(value, key) {
     *      //do something...
     *  });
     */
    HashMap.prototype.each = function(iteratee) {
        var self = this,
            flag;

        tui.util.forEachOwnProperties(this, function(value, key) {
            if (key.charAt(0) === _MAPDATAPREFIX) {
                flag = iteratee(value, self.decodeKey(key));
            }

            if (flag === false) {
                return flag;
            }
        });
    };

    /**
     * Return the key-list stored.
     * @returns {Array} A key-list
     * @example
     *  var hm = new HashMap();
     *  hm.set('key', 'value');
     *  hm.set('key2', 'value');
     *
     *  hm.keys();  //['key', 'key2');
     */
    HashMap.prototype.keys = function() {
        var keys = [],
            self = this;

        this.each(function(value, key) {
            keys.push(self.decodeKey(key));
        });

        return keys;
    };

    /**
     * Work similarly to Array.prototype.map().<br>
     * It executes the provided callback that checks conditions once for each element of hashMap,<br>
     *  and returns a new array having elements satisfying the conditions
     * @param {Function} condition A function that checks conditions
     * @returns {Array} A new array having elements satisfying the conditions
     * @example
     *  //ex1
     *  var hm = new HashMap();
     *  hm.set('key', 'value');
     *  hm.set('key2', 'value');
     *
     *  hm.find(function(value, key) {
     *      return key === 'key2';
     *  }); // ['value']
     *
     *  //ex2
     *  var hm = new HashMap({
     *      'myobj1': {
     *           visible: true
     *       },
     *      'mybobj2': {
     *           visible: false
     *       }
     *  });
     *
     *  hm.find(function(obj, key) {
     *      return obj.visible === true;
     *  }); // [{visible: true}];
     */
    HashMap.prototype.find = function(condition) {
        var founds = [];

        this.each(function(value, key) {
            if (condition(value, key)) {
                founds.push(value);
            }
        });

        return founds;
    };

    /**
     * Return a new Array having all values.
     * @returns {Array} A new array having all values
     */
    HashMap.prototype.toArray = function() {
        var result = [];

        this.each(function(v) {
            result.push(v);
        });

        return result;
    };

    tui.util.HashMap = HashMap;

})(window.tui);

/**********
 * inheritance.js
 **********/

/**
 * @fileoverview This module provides some simple function for inheritance.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 */

(function(tui) {
    'use strict';
    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    /* istanbul ignore if */
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }



    /**
     * Create a new object with the specified prototype object and properties.
     * @param {Object} obj This object will be a prototype of the newly-created object.
     * @return {Object}
     * @memberof tui.util
     */
    function createObject() {
        function F() {}

        return function(obj) {
            F.prototype = obj;
            return new F();
        };
    }

    /**
     * Provide a simple inheritance in prototype-oriented.
     * Caution :
     *  Don't overwrite the prototype of child constructor.
     *
     * @param {function} subType Child constructor
     * @param {function} superType Parent constructor
     * @memberof tui.util
     * @example
     *  // Parent constructor
     *  function Animal(leg) {
     *      this.leg = leg;
     *  }
     *
     *  Animal.prototype.growl = function() {
     *      // ...
     *  };
     *
     *  // Child constructor
     *  function Person(name) {
     *      this.name = name;
     *  }
     *
     *  // Inheritance
     *  core.inherit(Person, Animal);
     *
     *  // After this inheritance, please use only the extending of property.
     *  // Do not overwrite prototype.
     *  Person.prototype.walk = function(direction) {
     *      // ...
     *  };
     */
    function inherit(subType, superType) {
        var prototype = tui.util.createObject(superType.prototype);
        prototype.constructor = subType;
        subType.prototype = prototype;
    }

    tui.util.createObject = createObject();
    tui.util.inherit = inherit;

})(window.tui);

/**********
 * map.js
 **********/

/**
 * @fileoverview
 *  Implements the Map object.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency type.js, collection.js
 */

(function(tui) {
    'use strict';

    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }


    // Caching tui.util for performance enhancing
    var util = tui.util,

    /**
     * Using undefined for a key can be ambiguous if there's deleted item in the array,<br>
     * which is also undefined when accessed by index.<br>
     * So use this unique object as an undefined key to distinguish it from deleted keys.
     * @private
     * @constant
     */
    _KEY_FOR_UNDEFINED = {},

    /**
     * For using NaN as a key, use this unique object as a NaN key.<br>
     * This makes it easier and faster to compare an object with each keys in the array<br>
     * through no exceptional comapring for NaN.
     */
    _KEY_FOR_NAN = {};

    /**
     * Constructor of MapIterator<br>
     * Creates iterator object with new keyword.
     * @constructor
     * @param  {Array} keys - The array of keys in the map
     * @param  {function} valueGetter - Function that returns certain value,
     *      taking key and keyIndex as arguments.
     */
    function MapIterator(keys, valueGetter) {
        this._keys = keys;
        this._valueGetter = valueGetter;
        this._length = this._keys.length;
        this._index = -1;
        this._done = false;
    }

    /**
     * Implementation of Iterator protocol.
     * @return {{done: boolean, value: *}} Object that contains done(boolean) and value.
     */
    MapIterator.prototype.next = function() {
        var data = {};
        do {
           this._index += 1;
       } while (util.isUndefined(this._keys[this._index]) && this._index < this._length);

        if (this._index >= this._length) {
            data.done = true;
        } else {
            data.done = false;
            data.value = this._valueGetter(this._keys[this._index], this._index);
        }
        return data;
    };

    /**
     * The Map object implements the ES6 Map specification as closely as possible.<br>
     * For using objects and primitive values as keys, this object uses array internally.<br>
     * So if the key is not a string, get(), set(), has(), delete() will operates in O(n),<br>
     * and it can cause performance issues with a large dataset.
     *
     * Features listed below are not supported. (can't be implented without native support)
     * - Map object is iterable<br>
     * - Iterable object can be used as an argument of constructor
     *
     * If the browser supports full implementation of ES6 Map specification, native Map obejct
     * will be used internally.
     * @constructor
     * @param  {Array} initData - Array of key-value pairs (2-element Arrays).
     *      Each key-value pair will be added to the new Map
     * @memberof tui.util
     */
    function Map(initData) {
        this._valuesForString = {};
        this._valuesForIndex = {};
        this._keys = [];

        if (initData) {
            this._setInitData(initData);
        }

        this.size = 0;
    }

    /**
     * Add all elements in the initData to the Map object.
     * @private
     * @param  {Array} initData - Array of key-value pairs to add to the Map object
     */
    Map.prototype._setInitData = function(initData) {
        if (!util.isArray(initData)) {
            throw new Error('Only Array is supported.');
        }
        util.forEachArray(initData, function(pair) {
            this.set(pair[0], pair[1]);
        }, this);
    };

    /**
     * Returns true if the specified value is NaN.<br>
     * For unsing NaN as a key, use this method to test equality of NaN<br>
     * because === operator doesn't work for NaN.
     * @private
     * @param {*} value - Any object to be tested
     * @return {boolean} True if value is NaN, false otherwise.
     */
    Map.prototype._isNaN = function(value) {
        return typeof value === 'number' && value !== value;
    };

    /**
     * Returns the index of the specified key.
     * @private
     * @param  {*} key - The key object to search for.
     * @return {number} The index of the specified key
     */
    Map.prototype._getKeyIndex = function(key) {
        var result = -1,
            value;

        if (util.isString(key)) {
            value = this._valuesForString[key];
            if (value) {
                result = value.keyIndex;
            }
        } else {
            result = util.inArray(key, this._keys);
        }
        return result;
    };

    /**
     * Returns the original key of the specified key.
     * @private
     * @param  {*} key - key
     * @return {*} Original key
     */
    Map.prototype._getOriginKey = function(key) {
        var originKey = key;
        if (key === _KEY_FOR_UNDEFINED) {
            originKey = undefined;
        } else if (key === _KEY_FOR_NAN) {
            originKey = NaN;
        }
        return originKey;
    };

    /**
     * Returns the unique key of the specified key.
     * @private
     * @param  {*} key - key
     * @return {*} Unique key
     */
    Map.prototype._getUniqueKey = function(key) {
        var uniqueKey = key;
        if (util.isUndefined(key)) {
            uniqueKey = _KEY_FOR_UNDEFINED;
        } else if (this._isNaN(key)) {
            uniqueKey = _KEY_FOR_NAN;
        }
        return uniqueKey;
    };

    /**
     * Returns the value object of the specified key.
     * @private
     * @param  {*} key - The key of the value object to be returned
     * @param  {number} keyIndex - The index of the key
     * @return {{keyIndex: number, origin: *}} Value object
     */
    Map.prototype._getValueObject = function(key, keyIndex) {
        if (util.isString(key)) {
            return this._valuesForString[key];
        } else {
            if (util.isUndefined(keyIndex)) {
                keyIndex = this._getKeyIndex(key);
            }
            if (keyIndex >= 0) {
                return this._valuesForIndex[keyIndex];
            }
        }
    };

    /**
     * Returns the original value of the specified key.
     * @private
     * @param  {*} key - The key of the value object to be returned
     * @param  {number} keyIndex - The index of the key
     * @return {*} Original value
     */
    Map.prototype._getOriginValue = function(key, keyIndex) {
        return this._getValueObject(key, keyIndex).origin;
    };

    /**
     * Returns key-value pair of the specified key.
     * @private
     * @param  {*} key - The key of the value object to be returned
     * @param  {number} keyIndex - The index of the key
     * @return {Array} Key-value Pair
     */
    Map.prototype._getKeyValuePair = function(key, keyIndex) {
        return [this._getOriginKey(key), this._getOriginValue(key, keyIndex)];
    };

    /**
     * Creates the wrapper object of original value that contains a key index
     * and returns it.
     * @private
     * @param  {type} origin - Original value
     * @param  {type} keyIndex - Index of the key
     * @return {{keyIndex: number, origin: *}} Value object
     */
    Map.prototype._createValueObject = function(origin, keyIndex) {
        return {
            keyIndex: keyIndex,
            origin: origin
        };
    };

    /**
     * Sets the value for the key in the Map object.
     * @param  {*} key - The key of the element to add to the Map object
     * @param  {*} value - The value of the element to add to the Map object
     * @return {Map} The Map object
     */
    Map.prototype.set = function(key, value) {
        var uniqueKey = this._getUniqueKey(key),
            keyIndex = this._getKeyIndex(uniqueKey),
            valueObject;

        if (keyIndex < 0) {
            keyIndex = this._keys.push(uniqueKey) - 1;
            this.size += 1;
        }
        valueObject = this._createValueObject(value, keyIndex);

        if (util.isString(key)) {
            this._valuesForString[key] = valueObject;
        } else {
            this._valuesForIndex[keyIndex] = valueObject;
        }
        return this;
    };

    /**
     * Returns the value associated to the key, or undefined if there is none.
     * @param  {*} key - The key of the element to return
     * @return {*} Element associated with the specified key
     */
    Map.prototype.get = function(key) {
        var uniqueKey = this._getUniqueKey(key),
            value = this._getValueObject(uniqueKey);

        return value && value.origin;
    };

    /**
     * Returns a new Iterator object that contains the keys for each element
     * in the Map object in insertion order.
     * @return {Iterator} A new Iterator object
     */
    Map.prototype.keys = function() {
        return new MapIterator(this._keys, util.bind(this._getOriginKey, this));
    };

    /**
     * Returns a new Iterator object that contains the values for each element
     * in the Map object in insertion order.
     * @return {Iterator} A new Iterator object
     */
    Map.prototype.values = function() {
        return new MapIterator(this._keys, util.bind(this._getOriginValue, this));
    };

    /**
     * Returns a new Iterator object that contains the [key, value] pairs
     * for each element in the Map object in insertion order.
     * @return {Iterator} A new Iterator object
     */
    Map.prototype.entries = function() {
        return new MapIterator(this._keys, util.bind(this._getKeyValuePair, this));
    };

    /**
     * Returns a boolean asserting whether a value has been associated to the key
     * in the Map object or not.
     * @param  {*} key - The key of the element to test for presence
     * @return {boolean} True if an element with the specified key exists;
     *          Otherwise false
     */
    Map.prototype.has = function(key) {
        return !!this._getValueObject(key);
    };

    /**
     * Removes the specified element from a Map object.
     * @param {*} key - The key of the element to remove
     */
     // cannot use reserved keyword as a property name in IE8 and under.
    Map.prototype['delete'] = function(key) {
        var keyIndex;

        if (util.isString(key)) {
            if (this._valuesForString[key]) {
                keyIndex = this._valuesForString[key].keyIndex;
                delete this._valuesForString[key];
            }
        } else {
            keyIndex = this._getKeyIndex(key);
            if (keyIndex >= 0) {
                delete this._valuesForIndex[keyIndex];
            }
        }

        if (keyIndex >= 0) {
            delete this._keys[keyIndex];
            this.size -= 1;
        }
    };

    /**
     * Executes a provided function once per each key/value pair in the Map object,
     * in insertion order.
     * @param  {function} callback - Function to execute for each element
     * @param  {thisArg} thisArg - Value to use as this when executing callback
     */
    Map.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || this;
        util.forEachArray(this._keys, function(key) {
            if (!util.isUndefined(key)) {
                callback.call(thisArg, this._getValueObject(key).origin, key, this);
            }
        }, this);
    };

    /**
     * Removes all elements from a Map object.
     */
    Map.prototype.clear = function() {
        Map.call(this);
    };

    // Use native Map object if exists.
    // But only latest versions of Chrome and Firefox support full implementation.
    (function() {
        var browser = util.browser;
        if (window.Map && (
            (browser.firefox && browser.version >= 37) ||
            (browser.chrome && browser.version >= 42) )) {
            Map = window.Map;
        }
    })();

    util.Map = Map;
})(window.tui);

/**********
 * object.js
 **********/

/**
 * @fileoverview This module has some functions for handling a plain object, json.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency type.js, collection.js
 */

(function(tui) {
    'use strict';
    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * Extend the target object from other objects.
     * @param {object} target - Object that will be extended
     * @param {...object} objects - Objects as sources
     * @return {object} Extended object
     * @memberOf tui.util
     */
    function extend(target, objects) {
        var source,
            prop,
            hasOwnProp = Object.prototype.hasOwnProperty,
            i,
            len;

        for (i = 1, len = arguments.length; i < len; i++) {
            source = arguments[i];
            for (prop in source) {
                if (hasOwnProp.call(source, prop)) {
                    target[prop] = source[prop];
                }
            }
        }
        return target;
    }

    /**
     * The last id of stamp
     * @type {number}
     */
    var lastId = 0;

    /**
     * Assign a unique id to an object
     * @param {object} obj - Object that will be assigned id.
     * @return {number} Stamped id
     * @memberOf tui.util
     */
    function stamp(obj) {
        obj.__fe_id = obj.__fe_id || ++lastId;
        return obj.__fe_id;
    }

    /**
     * Verify whether an object has a stamped id or not.
     * @param {object} obj
     * @returns {boolean}
     * @memberOf tui.util
     */
    function hasStamp(obj) {
        return tui.util.isExisty(tui.util.pick(obj, '__fe_id'));
    }

    /**
     * Reset the last id of stamp
     */
    function resetLastId() {
        lastId = 0;
    }

    /**
     * Return a key-list(array) of a given object
     * @param {object} obj - Object from which a key-list will be extracted
     * @returns {Array} A key-list(array)
     * @memberOf tui.util
     */
    function keys(obj) {
        var keys = [],
            key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }

        return keys;
    }

    /**
     * Return the equality for multiple objects(jsonObjects).<br>
     *  See {@link http://stackoverflow.com/questions/1068834/object-comparison-in-javascript}
     * @param {...object} object - Multiple objects for comparing.
     * @return {boolean} Equality
     * @example
     *
     *  var jsonObj1 = {name:'milk', price: 1000},
     *      jsonObj2 = {name:'milk', price: 1000},
     *      jsonObj3 = {name:'milk', price: 1000};
     *
     *  tui.util.compareJSON(jsonObj1, jsonObj2, jsonObj3);   // true
     *
     *
     *  var jsonObj4 = {name:'milk', price: 1000},
     *      jsonObj5 = {name:'beer', price: 3000};
     *
     *      tui.util.compareJSON(jsonObj4, jsonObj5); // false

     * @memberOf tui.util
     */
    function compareJSON(object) {
        var leftChain,
            rightChain,
            argsLen = arguments.length,
            i;

        function isSameObject(x, y) {
            var p;

            // remember that NaN === NaN returns false
            // and isNaN(undefined) returns true
            if (isNaN(x) &&
                isNaN(y) &&
                tui.util.isNumber(x) &&
                tui.util.isNumber(y)) {
                return true;
            }

            // Compare primitives and functions.
            // Check if both arguments link to the same object.
            // Especially useful on step when comparing prototypes
            if (x === y) {
                return true;
            }

            // Works in case when functions are created in constructor.
            // Comparing dates is a common scenario. Another built-ins?
            // We can even handle functions passed across iframes
            if ((tui.util.isFunction(x) && tui.util.isFunction(y)) ||
                (x instanceof Date && y instanceof Date) ||
                (x instanceof RegExp && y instanceof RegExp) ||
                (x instanceof String && y instanceof String) ||
                (x instanceof Number && y instanceof Number)) {
                return x.toString() === y.toString();
            }

            // At last checking prototypes as good a we can
            if (!(x instanceof Object && y instanceof Object)) {
                return false;
            }

            if (x.isPrototypeOf(y) ||
                y.isPrototypeOf(x) ||
                x.constructor !== y.constructor ||
                x.prototype !== y.prototype) {
                return false;
            }

            // check for infinitive linking loops
            if (tui.util.inArray(x, leftChain) > -1 ||
                tui.util.inArray(y, rightChain) > -1) {
                return false;
            }

            // Quick checking of one object beeing a subset of another.
            for (p in y) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }
            }

            //This for loop executes comparing with hasOwnProperty() and typeof for each property in 'x' object,
            //and verifying equality for x[property] and y[property].
            for (p in x) {
                if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                    return false;
                }
                else if (typeof y[p] !== typeof x[p]) {
                    return false;
                }

                if (typeof(x[p]) === 'object' || typeof(x[p]) === 'function') {
                    leftChain.push(x);
                    rightChain.push(y);

                    if (!isSameObject(x[p], y[p])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                } else if (x[p] !== y[p]) {
                    return false;
                }
            }

            return true;
        }

        if (argsLen < 1) {
            return true;
        }

        for (i = 1; i < argsLen; i++) {
            leftChain = [];
            rightChain = [];

            if (!isSameObject(arguments[0], arguments[i])) {
                return false;
            }
        }

        return true;
    }

    /**
     * Retrieve a nested item from the given object/array
     * @param {object|Array} obj - Object for retrieving
     * @param {...string|number} paths - Paths of property
     * @returns {*} Value
     * @example
     *  var obj = {
     *      'key1': 1,
     *      'nested' : {
     *          'key1': 11,
     *          'nested': {
     *              'key1': 21
     *          }
     *      }
     *  };
     *  tui.util.pick(obj, 'nested', 'nested', 'key1'); // 21
     *  tui.util.pick(obj, 'nested', 'nested', 'key2'); // undefined
     *
     *  var arr = ['a', 'b', 'c'];
     *  tui.util.pick(arr, 1); // 'b'
     */
    function pick(obj, paths) {
        var args = arguments,
            target = args[0],
            length = args.length,
            i;
        try {
            for (i = 1; i < length; i++) {
                target = target[args[i]];
            }
            return target;
        } catch(e) {
            return;
        }
    }

    tui.util.extend = extend;
    tui.util.stamp = stamp;
    tui.util.hasStamp = hasStamp;
    tui.util._resetLastId = resetLastId;
    tui.util.keys = Object.keys || keys;
    tui.util.compareJSON = compareJSON;
    tui.util.pick = pick;
})(window.tui);

/**********
 * string.js
 **********/

/**
 * @fileoverview This module has some functions for handling the string.
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 */

(function(tui) {
    'use strict';

    if (!tui) {
        tui = window.tui = {};
    }
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * Transform the given HTML Entity string into plain string
     * @param {String} htmlEntity - HTML Entity type string
     * @return {String} Plain string
     * @memberof tui.util
     * @example
     *  var htmlEntityString = "A &#39;quote&#39; is &lt;b&gt;bold&lt;/b&gt;"
     *  var result = decodeHTMLEntity(htmlEntityString); //"A 'quote' is <b>bold</b>"
     */
    function decodeHTMLEntity(htmlEntity) {
        var entities = {'&quot;' : '"', '&amp;' : '&', '&lt;' : '<', '&gt;' : '>', '&#39;' : '\'', '&nbsp;' : ' '};
        return htmlEntity.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/g, function(m0) {
            return entities[m0] ? entities[m0] : m0;
        });
    }

    /**
     * Transform the given string into HTML Entity string
     * @param {String} html - String for encoding
     * @return {String} HTML Entity
     * @memberof tui.util
     * @example
     *  var htmlEntityString = "<script> alert('test');</script><a href='test'>";
     *  var result = encodeHTMLEntity(htmlEntityString); //"&lt;script&gt; alert(&#39;test&#39;);&lt;/script&gt;&lt;a href=&#39;test&#39;&gt;"
     */
    function encodeHTMLEntity(html) {
        var entities = {'"': 'quot', '&': 'amp', '<': 'lt', '>': 'gt', '\'': '#39'};
        return html.replace(/[<>&"']/g, function(m0) {
            return entities[m0] ? '&' + entities[m0] + ';' : m0;
        });
    }

    /**
     * Return whether the string capable to transform into plain string is in the given string or not.
     * @param {String} string
     * @memberof tui.util
     * @return {boolean}
     */
    function hasEncodableString(string) {
        return /[<>&"']/.test(string);
    }

    /**
     * Return duplicate charters
     * @param {string} operandStr1 The operand string
     * @param {string} operandStr2 The operand string
     * @private
     * @memberof tui.util
     * @returns {string}
     * @example
     * tui.util.getDuplicatedChar('fe dev', 'nhn entertainment');
     * => 'e'
     * tui.util.getDuplicatedChar('fdsa', 'asdf');
     * => 'asdf'
     */
    function getDuplicatedChar(operandStr1, operandStr2) {
        var dupl,
            key,
            i = 0,
            len = operandStr1.length,
            pool = {};

        for (; i < len; i += 1) {
            key = operandStr1.charAt(i);
            pool[key] = 1;
        }

        for (i = 0, len = operandStr2.length; i < len; i += 1) {
            key = operandStr2.charAt(i);
            if(pool[key]) {
                pool[key] += 1;
            }
        }

        pool = tui.util.filter(pool, function(item) {
            return item > 1;
        });

        pool = tui.util.keys(pool).sort();
        dupl = pool.join('');

        return dupl;
    }

    tui.util.decodeHTMLEntity = decodeHTMLEntity;
    tui.util.encodeHTMLEntity = encodeHTMLEntity;
    tui.util.hasEncodableString = hasEncodableString;
    tui.util.getDuplicatedChar = getDuplicatedChar;

})(window.tui);

/**********
 * tricks.js
 **********/

/**
 * @fileoverview collections of some technic methods.
 * @author NHN Ent. FE Development Team <e0242.nhnent.com>
 */

/** @namespace tui */
/** @namespace tui.util */

(function(tui) {
    'use strict';
    var aps = Array.prototype.slice;

    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    /* istanbul ignore if */
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * Creates a debounced function that delays invoking fn until after delay milliseconds has elapsed
     * since the last time the debouced function was invoked.
     * @param {function} fn The function to debounce.
     * @param {number} [delay=0] The number of milliseconds to delay
     * @memberof tui.util
     * @returns {function} debounced function.
     * @example
     *
     * function someMethodToInvokeDebounced() {}
     *
     * var debounced = tui.util.debounce(someMethodToInvokeDebounced, 300);
     *
     * // invoke repeatedly
     * debounced();
     * debounced();
     * debounced();
     * debounced();
     * debounced();
     * debounced();    // last invoke of debounced()
     *
     * // invoke someMethodToInvokeDebounced() after 300 milliseconds.
     */
    function debounce(fn, delay) {
        var timer,
            args;

        /* istanbul ignore next */
        delay = delay || 0;

        function debounced() {
            args = aps.call(arguments);

            window.clearTimeout(timer);
            timer = window.setTimeout(function() {
                fn.apply(null, args);
            }, delay);
        }

        return debounced;
    }

    /**
     * return timestamp
     * @memberof tui.util
     * @returns {number} The number of milliseconds from Jan. 1970 00:00:00 (GMT)
     */
    function timestamp() {
        return +(new Date());
    }

    /**
     * Creates a throttled function that only invokes fn at most once per every interval milliseconds.
     *
     * You can use this throttle short time repeatedly invoking functions. (e.g MouseMove, Resize ...)
     *
     * if you need reuse throttled method. you must remove slugs (e.g. flag variable) related with throttling.
     * @param {function} fn function to throttle
     * @param {number} [interval=0] the number of milliseconds to throttle invocations to.
     * @memberof tui.util
     * @returns {function} throttled function
     * @example
     *
     * function someMethodToInvokeThrottled() {}
     *
     * var throttled = tui.util.throttle(someMethodToInvokeThrottled, 300);
     *
     * // invoke repeatedly
     * throttled();    // invoke (leading)
     * throttled();
     * throttled();    // invoke (near 300 milliseconds)
     * throttled();
     * throttled();
     * throttled();    // invoke (near 600 milliseconds)
     * // ...
     * // invoke (trailing)
     *
     * // if you need reuse throttled method. then invoke reset()
     * throttled.reset();
     */
    function throttle(fn, interval) {
        var base,
            _timestamp = tui.util.timestamp,
            debounced,
            isLeading = true,
            stamp,
            args,
            tick = function(_args) {
                fn.apply(null, _args);
                base = null;
            };

        /* istanbul ignore next */
        interval = interval || 0;

        debounced = tui.util.debounce(tick, interval);

        function throttled() {
            args = aps.call(arguments);

            if (isLeading) {
                tick(args);
                isLeading = false;
                return;
            }

            stamp = _timestamp();

            base = base || stamp;

            // pass array directly because `debounce()`, `tick()` are already use
            // `apply()` method to invoke developer's `fn` handler.
            //
            // also, this `debounced` line invoked every time for implements 
            // `trailing` features.
            debounced(args);

            if ((stamp - base) >= interval) {
                tick(args);
            }
        }

        function reset() {
            isLeading = true;
            base = null;
        }

        throttled.reset = reset;
        return throttled;
    }

    tui.util.timestamp = timestamp;
    tui.util.debounce = debounce;
    tui.util.throttle = throttle;
})(window.tui);


/**********
 * type.js
 **********/

/**
 * @fileoverview This module provides some functions to check the type of variable
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency collection.js
 */

(function(tui) {
    'use strict';
    /* istanbul ignore if */
    if (!tui) {
        tui = window.tui = {};
    }
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    /**
     * Check whether the given variable is existing or not.<br>
     *  If the given variable is not null and not undefined, returns true.
     * @param {*} param - Target for checking
     * @returns {boolean} Is existy?
     * @memberOf tui.util
     * @example
     *  tui.util.isExisty(''); //true
     *  tui.util.isExisty(0); //true
     *  tui.util.isExisty([]); //true
     *  tui.util.isExisty({}); //true
     *  tui.util.isExisty(null); //false
     *  tui.util.isExisty(undefined); //false
    */
    function isExisty(param) {
        return param != null;
    }

    /**
     * Check whether the given variable is undefined or not.<br>
     *  If the given variable is undefined, returns true.
     * @param {*} obj - Target for checking
     * @returns {boolean} Is undefined?
     * @memberOf tui.util
     */
    function isUndefined(obj) {
        return obj === undefined;
    }

    /**
     * Check whether the given variable is null or not.<br>
     *  If the given variable(arguments[0]) is null, returns true.
     * @param {*} obj - Target for checking
     * @returns {boolean} Is null?
     * @memberOf tui.util
     */
    function isNull(obj) {
        return obj === null;
    }

    /**
     * Check whether the given variable is truthy or not.<br>
     *  If the given variable is not null or not undefined or not false, returns true.<br>
     *  (It regards 0 as true)
     * @param {*} obj - Target for checking
     * @return {boolean} Is truthy?
     * @memberOf tui.util
     */
    function isTruthy(obj) {
        return isExisty(obj) && obj !== false;
    }

    /**
     * Check whether the given variable is falsy or not.<br>
     *  If the given variable is null or undefined or false, returns true.
     * @param {*} obj - Target for checking
     * @return {boolean} Is falsy?
     * @memberOf tui.util
     */
    function isFalsy(obj) {
        return !isTruthy(obj);
    }


    var toString = Object.prototype.toString;

    /**
     * Check whether the given variable is an arguments object or not.<br>
     *  If the given variable is an arguments object, return true.
     * @param {*} obj - Target for checking
     * @return {boolean} Is arguments?
     * @memberOf tui.util
     */
    function isArguments(obj) {
        var result = isExisty(obj) &&
            ((toString.call(obj) === '[object Arguments]') || !!obj.callee);

        return result;
    }

    /**
     * Check whether the given variable is an instance of Array or not.<br>
     *  If the given variable is an instance of Array, return true.
     * @param {*} obj - Target for checking
     * @return {boolean} Is array instance?
     * @memberOf tui.util
     */
    function isArray(obj) {
        return obj instanceof Array;
    }

    /**
     * Check whether the given variable is an object or not.<br>
     *  If the given variable is an object, return true.
     * @param {*} obj - Target for checking
     * @return {boolean} Is object?
     * @memberOf tui.util
     */
    function isObject(obj) {
        return obj === Object(obj);
    }

    /**
     * Check whether the given variable is a function or not.<br>
     *  If the given variable is a function, return true.
     * @param {*} obj - Target for checking
     * @return {boolean} Is function?
     * @memberOf tui.util
     */
    function isFunction(obj) {
        return obj instanceof Function;
    }

    /**
     * Check whether the given variable is a number or not.<br>
     *  If the given variable is a number, return true.
     * @param {*} obj - Target for checking
     * @return {boolean} Is number?
     * @memberOf tui.util
     */
    function isNumber(obj) {
        return typeof obj === 'number' || obj instanceof Number;
    }

    /**
     * Check whether the given variable is a string or not.<br>
     *  If the given variable is a string, return true.
     * @param {*} obj - Target for checking
     * @return {boolean} Is string?
     * @memberOf tui.util
     */
    function isString(obj) {
        return typeof obj === 'string' || obj instanceof String;
    }

    /**
     * Check whether the given variable is a boolean or not.<br>
     *  If the given variable is a boolean, return true.
     * @param {*} obj - Target for checking
     * @return {boolean} Is boolean?
     * @memberOf tui.util
     */
    function isBoolean(obj) {
        return typeof obj === 'boolean' || obj instanceof Boolean;
    }


    /**
     * Check whether the given variable is an instance of Array or not.<br>
     *  If the given variable is an instance of Array, return true.<br>
     *  (It is used for multiple frame environments)
     * @param {*} obj - Target for checking
     * @return {boolean} Is an instance of array?
     * @memberOf tui.util
     */
    function isArraySafe(obj) {
        return toString.call(obj) === '[object Array]';
    }

    /**
     * Check whether the given variable is a function or not.<br>
     *  If the given variable is a function, return true.<br>
     *  (It is used for multiple frame environments)
     * @param {*} obj - Target for checking
     * @return {boolean} Is a function?
     * @memberOf tui.util
     */
    function isFunctionSafe(obj) {
        return toString.call(obj) === '[object Function]';
    }

    /**
     * Check whether the given variable is a number or not.<br>
     *  If the given variable is a number, return true.<br>
     *  (It is used for multiple frame environments)
     * @param {*} obj - Target for checking
     * @return {boolean} Is a number?
     * @memberOf tui.util
     */
    function isNumberSafe(obj) {
        return toString.call(obj) === '[object Number]';
    }

    /**
     * Check whether the given variable is a string or not.<br>
     *  If the given variable is a string, return true.<br>
     *  (It is used for multiple frame environments)
     * @param {*} obj - Target for checking
     * @return {boolean} Is a string?
     * @memberOf tui.util
     */
    function isStringSafe(obj) {
        return toString.call(obj) === '[object String]';
    }

    /**
     * Check whether the given variable is a boolean or not.<br>
     *  If the given variable is a boolean, return true.<br>
     *  (It is used for multiple frame environments)
     * @param {*} obj - Target for checking
     * @return {boolean} Is a boolean?
     * @memberOf tui.util
     */
    function isBooleanSafe(obj) {
        return toString.call(obj) === '[object Boolean]';
    }

    /**
     * Check whether the given variable is a instance of HTMLNode or not.<br>
     *  If the given variables is a instance of HTMLNode, return true.
     * @param {*} html - Target for checking
     * @return {boolean} Is HTMLNode ?
     * @memberOf tui.util
     */
    function isHTMLNode(html) {
        if (typeof(HTMLElement) === 'object') {
            return (html && (html instanceof HTMLElement || !!html.nodeType));
        }
        return !!(html && html.nodeType);
    }

    /**
     * Check whether the given variable is a HTML tag or not.<br>
     *  If the given variables is a HTML tag, return true.
     * @param {*} html - Target for checking
     * @return {Boolean} Is HTML tag?
     * @memberOf tui.util
     */
    function isHTMLTag(html) {
        if (typeof(HTMLElement) === 'object') {
            return (html && (html instanceof HTMLElement));
        }
        return !!(html && html.nodeType && html.nodeType === 1);
    }

    /**
     * Check whether the given variable is empty(null, undefined, or empty array, empty object) or not.<br>
     *  If the given variables is empty, return true.
     * @param {*} obj - Target for checking
     * @return {boolean} Is empty?
     * @memberOf tui.util
     */
    function isEmpty(obj) {
        var hasKey = false;

        if (!isExisty(obj)) {
            return true;
        }

        if (isString(obj) && obj === '') {
            return true;
        }

        if (isArray(obj) || isArguments(obj)) {
            return obj.length === 0;
        }

        if (isObject(obj) && !isFunction(obj)) {
            tui.util.forEachOwnProperties(obj, function() {
                hasKey = true;
                return false;
            });

            return !hasKey;
        }

        return true;

    }

    /**
     * Check whether the given variable is not empty(not null, not undefined, or not empty array, not empty object) or not.<br>
     *  If the given variables is not empty, return true.
     * @param {*} obj - Target for checking
     * @return {boolean} Is not empty?
     * @memberOf tui.util
     */
    function isNotEmpty(obj) {
        return !isEmpty(obj);
    }

    /**
     * Check whether the given variable is an instance of Date or not.<br>
     *  If the given variables is an instance of Date, return true.
     * @param {*} obj - Target for checking
     * @returns {boolean} Is an instance of Date?
     * @memberOf tui.util
     */
    function isDate(obj) {
        return obj instanceof Date;
    }

    /**
     * Check whether the given variable is an instance of Date or not.<br>
     *  If the given variables is an instance of Date, return true.<br>
     *  (It is used for multiple frame environments)
     * @param {*} obj - Target for checking
     * @returns {boolean} Is an instance of Date?
     * @memberOf tui.util
     */
    function isDateSafe(obj) {
        return toString.call(obj) === '[object Date]';
    }


    tui.util.isExisty = isExisty;
    tui.util.isUndefined = isUndefined;
    tui.util.isNull = isNull;
    tui.util.isTruthy = isTruthy;
    tui.util.isFalsy = isFalsy;
    tui.util.isArguments = isArguments;
    tui.util.isArray = Array.isArray || isArray;
    tui.util.isArraySafe = Array.isArray || isArraySafe;
    tui.util.isObject = isObject;
    tui.util.isFunction = isFunction;
    tui.util.isFunctionSafe = isFunctionSafe;
    tui.util.isNumber = isNumber;
    tui.util.isNumberSafe = isNumberSafe;
    tui.util.isDate = isDate;
    tui.util.isDateSafe = isDateSafe;
    tui.util.isString = isString;
    tui.util.isStringSafe = isStringSafe;
    tui.util.isBoolean = isBoolean;
    tui.util.isBooleanSafe = isBooleanSafe;
    tui.util.isHTMLNode = isHTMLNode;
    tui.util.isHTMLTag = isHTMLTag;
    tui.util.isEmpty = isEmpty;
    tui.util.isNotEmpty = isNotEmpty;

})(window.tui);

/**********
 * window.js
 **********/

/**
 * @fileoverview This module has some methods for handling popup-window
 * @author NHN Ent.
 *         FE Development Team <e0242@nhnent.com>
 * @dependency browser.js, type.js, object.js, collection.js, func.js, window.js
 */

(function(tui) {
    'use strict';
    if (!tui) {
        tui = window.tui = {};
    }
    if (!tui.util) {
        tui.util = window.tui.util = {};
    }

    var popup_id = 0;

    /**
     * Popup management class
     * @constructor
     * @memberof tui.util
     */
    function Popup() {

        /**
         * Caching the window-contexts of opened popups
         * @type {Object}
         */
        this.openedPopup = {};

        /**
         * In IE7, an error occurs when the closeWithParent property attaches to window object.<br>
         * So, It is for saving the value of closeWithParent instead of attaching to window object.
         * @type {Object}
         */
        this.closeWithParentPopup = {};

        /**
         * Post data bridge for IE11 popup
         * @type {string}
         */
        this.postBridgeUrl = '';
    }

    /**********
     * public methods
     **********/

    /**
     * Returns a popup-list administered by current window.
     * @param {string} [key] The key of popup.
     * @returns {Object} popup window list object
     */
    Popup.prototype.getPopupList = function(key) {
        var target;
        if (tui.util.isExisty(key)) {
            target = this.openedPopup[key];
        } else {
            target = this.openedPopup;
        }
        return target;
    };

    /**
     * Open popup
     * Caution:
     *  In IE11, when transfer data to popup by POST, must set the postBridgeUrl.
     *
     * @param {string} url - popup url
     * @param {Object} options
     *     @param {string} [options.popupName] - Key of popup window.<br>
     *      If the key is set, when you try to open by this key, the popup of this key is focused.<br>
     *      Or else a new popup window having this key is opened.
     *
     *     @param {string} [options.popupOptionStr=""] - Option string of popup window<br>
     *      It is same with the third parameter of window.open() method.<br>
     *      See {@link http://www.w3schools.com/jsref/met_win_open.asp}
     *
     *     @param {boolean} [options.closeWithParent=true] - Is closed when parent window closed?
     *
     *     @param {boolean} [options.useReload=false] - This property indicates whether reload the popup or not.<br>
     *      If true, the popup will be reloaded when you try to re-open the popup that has been opened.<br>
     *      When transmit the POST-data, some browsers alert a message for confirming whether retransmit or not.
     *
     *     @param {string} [options.postBridgeUrl=''] - Use this url to avoid a certain bug occuring when transmitting POST data to the popup in IE11.<br>
     *      This specific buggy situation is known to happen because IE11 tries to open the requested url not in a new popup window as intended, but in a new tab.<br>
     *      See {@link http://wiki.nhnent.com/pages/viewpage.action?pageId=240562844}
     *
     *     @param {string} [options.method=get] - The method of transmission when the form-data is transmitted to popup-window.
     *
     *     @param {Object} [options.param=null] - Using as parameters for transmission when the form-data is transmitted to popup-window.
     */
    Popup.prototype.openPopup = function(url, options) {
        options = tui.util.extend({
            popupName: 'popup_' + popup_id + '_' + (+new Date()),
            popupOptionStr: '',
            useReload: true,
            closeWithParent: true,
            method: 'get',
            param: {}
        }, options || {});

        options.method = options.method.toUpperCase();

        this.postBridgeUrl = options.postBridgeUrl || this.postBridgeUrl;

        var popup,
            formElement,
            useIEPostBridge = options.method === 'POST' && options.param &&
                tui.util.browser.msie && tui.util.browser.version === 11;

        if (!tui.util.isExisty(url)) {
            throw new Error('Popup#open() need popup url.');
        }

        popup_id += 1;

        /*
         * In form-data transmission
         * 1. Create a form before opening a popup.
         * 2. Transmit the form-data.
         * 3. Remove the form after transmission.
         */
        if (options.param) {
            if (options.method === 'GET') {
                url = url + (/\?/.test(url) ? '&' : '?') + this._parameterize(options.param);
            } else if (options.method === 'POST') {
                if (!useIEPostBridge) {
                    formElement = this.createForm(url, options.param, options.method, options.popupName);
                    url = 'about:blank';
                }
            }
        }

        popup = this.openedPopup[options.popupName];

        if (!tui.util.isExisty(popup)) {
            this.openedPopup[options.popupName] = popup = this._open(useIEPostBridge, options.param,
                url, options.popupName, options.popupOptionStr);

        } else {
            if (popup.closed) {
                this.openedPopup[options.popupName] = popup = this._open(useIEPostBridge, options.param,
                    url, options.popupName, options.popupOptionStr);

            } else {
                if (options.useReload) {
                    popup.location.replace(url);
                }
                popup.focus();
            }
        }

        this.closeWithParentPopup[options.popupName] = options.closeWithParent;

        if (!popup || popup.closed || tui.util.isUndefined(popup.closed)) {
            alert('please enable popup windows for this website');
        }

        if (options.param && options.method === 'POST' && !useIEPostBridge) {
            if (popup) {
                formElement.submit();
            }
            if (formElement.parentNode) {
                formElement.parentNode.removeChild(formElement);
            }
        }

        window.onunload = tui.util.bind(this.closeAllPopup, this);
    };

    /**
     * Close the popup
     * @param {boolean} [skipBeforeUnload] - If true, the 'window.onunload' will be null and skip unload event.
     * @param {Window} [popup] - Window-context of popup for closing. If omit this, current window-context will be closed.
     */
    Popup.prototype.close = function(skipBeforeUnload, popup) {
        skipBeforeUnload = tui.util.isExisty(skipBeforeUnload) ? skipBeforeUnload : false;

        var target = popup || window;

        if (skipBeforeUnload) {
            window.onunload = null;
        }

        if (!target.closed) {
            target.opener = window.location.href;
            target.close();
        }
    };

    /**
     * Close all the popups in current window.
     * @param {boolean} closeWithParent - If true, popups having the closeWithParentPopup property as true will be closed.
     */
    Popup.prototype.closeAllPopup = function(closeWithParent) {
        var hasArg = tui.util.isExisty(closeWithParent);

        tui.util.forEachOwnProperties(this.openedPopup, function(popup, key) {
            if ((hasArg && this.closeWithParentPopup[key]) || !hasArg) {
                this.close(false, popup);
            }
        }, this);
    };

    /**
     * Activate(or focus) the popup of the given name.
     * @param {string} popupName - Name of popup for activation
     */
    Popup.prototype.focus = function(popupName) {
        this.getPopupList(popupName).focus();
    };

    /**
     * Return an object made of parsing the query string.
     * @return {Object} An object having some information of the query string.
     * @private
     */
    Popup.prototype.parseQuery = function() {
        var search,
            pair,
            param = {};

        search = window.location.search.substr(1);
        tui.util.forEachArray(search.split('&'), function(part) {
            pair = part.split('=');
            param[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        });

        return param;
    };

    /**
     * Create a hidden form from the given arguments and return this form.
     * @param {string} action - URL for form transmission
     * @param {Object} [data] - Data for form transmission
     * @param {string} [method] - Method of transmission
     * @param {string} [target] - Target of transmission
     * @param {HTMLElement} [container] - Container element of form.
     * @returns {HTMLElement} Form element
     */
    Popup.prototype.createForm = function(action, data, method, target, container) {
        var form = document.createElement('form'),
            input;

        container = container || document.body;

        form.method = method || 'POST';
        form.action = action || '';
        form.target = target || '';
        form.style.display = 'none';

        tui.util.forEachOwnProperties(data, function(value, key) {
            input = document.createElement('input');
            input.name = key;
            input.type = 'hidden';
            input.value = value;
            form.appendChild(input);
        });

        container.appendChild(form);

        return form;
    };

    /**********
     * private methods
     **********/

    /**
     * Return an query string made by parsing the given object
     * @param {Object} object - An object that has information for query string
     * @returns {string} - Query string
     * @private
     */
    Popup.prototype._parameterize = function(object) {
        var query = [];

        tui.util.forEachOwnProperties(object, function(value, key) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        });

        return query.join('&');
    };

    /**
     * Open popup
     * @param {boolean} useIEPostBridge - A switch option whether to use alternative of tossing POST data to the popup window in IE11
     * @param {Object} param - A data for tossing to popup
     * @param {string} url - Popup url
     * @param {string} popupName - Popup name
     * @param {string} optionStr - Setting for popup, ex) 'width=640,height=320,scrollbars=yes'
     * @returns {Window} Window context of popup
     * @private
     */
    Popup.prototype._open = function(useIEPostBridge, param, url, popupName, optionStr) {
        var popup;

        if (useIEPostBridge) {
            popup = window.open(this.postBridgeUrl, popupName, optionStr);
            setTimeout(function() {
                popup.redirect(url, param);
            }, 100);
        } else {
            popup = window.open(url, popupName, optionStr);
        }

        return popup;
    };

    tui.util.popup = new Popup();
})(window.tui);
