(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/**
 * Dooray Calendar
 * @version 0.1.15
 */
/* eslint vars-on-top:0, strict:0 */

/**********
 * Common
 **********/
require('./src/js/view/template/registerHelpers');
var config = require('./src/js/config');
var dirty = require('./src/js/common/dirty');
var datetime = require('./src/js/common/datetime');
var array = require('./src/js/common/array');
var domevent = require('./src/js/common/domevent');
var domutil = require('./src/js/common/domutil');
var Collection = require('./src/js/common/collection');
var model = require('./src/js/common/model');
var common = require('./src/js/common/common');
var reqAnimFrame = require('./src/js/common/reqAnimFrame');
var AJAX = require('./src/js/common/ajax');
var VLayout = require('./src/js/common/vlayout');
var VPanel = require('./src/js/common/vpanel');

/**********
 * Models
 **********/
var Point = require('./src/js/common/point');
var CalEvent = require('./src/js/model/calEvent');
var CalEventViewModel = require('./src/js/model/viewModel/calEvent');

/**********
 * Views
 **********/
var View = require('./src/js/view/view');
View.prototype.cssPrefix = config.cssPrefix;

var MonthWeek = require('./src/js/view/monthweek');
var Week = require('./src/js/view/week/week');
var DayName = require('./src/js/view/week/dayname');
var TimeGrid = require('./src/js/view/week/timeGrid');
var Time = require('./src/js/view/week/time');

/**********
 * Handlers
 **********/
var Drag = require('./src/js/handler/drag');
var TimeCore = require('./src/js/handler/time/core');
var TimeClick = require('./src/js/handler/time/click');
var TimeCreation = require('./src/js/handler/time/creation');
var TimeCreationGuide = require('./src/js/handler/time/creationGuide');
var TimeMove = require('./src/js/handler/time/move');
var TimeMoveGuide = require('./src/js/handler/time/moveGuide');
var TimeResize = require('./src/js/handler/time/resize');
var TimeResizeGuide = require('./src/js/handler/time/resizeGuide');

var AlldayCore = require('./src/js/handler/allday/core');
var AlldayClick = require('./src/js/handler/allday/click');
var AlldayCreation = require('./src/js/handler/allday/creation');
var AlldayCreationGuide = require('./src/js/handler/allday/creationGuide');
var AlldayMove = require('./src/js/handler/allday/move');
var AlldayMoveGuide = require('./src/js/handler/allday/moveGuide');
var AlldayResize = require('./src/js/handler/allday/resize');
var AlldayResizeGuide = require('./src/js/handler/allday/resizeGuide');

/**********
 * Factory
 **********/
var controllerFactory = require('./src/js/factory/controller');

/**********
 * SERVICE MODULE
 **********/
var MiniCalendar = require('./src/js/dooray/view/minicalendar');
var DoorayEvent = require('./src/js/dooray/model/calEvent');
var DoorayController = require('./src/js/dooray/controller/base');
var TaskView = require('./src/js/dooray/view/taskview');
var MilestoneClick = require('./src/js/dooray/handler/milestoneClick');
var TaskClick = require('./src/js/dooray/handler/taskClick');

/**********
 * Calendar Factory
 **********/

var Calendar = require('./src/js/factory/calendar');
var ServiceCalendar = require('./src/js/dooray/factory/calendar');

/** @namespace ne.dooray.calendar */
global.tui.util.defineNamespace('ne.dooray.calendar', {
    // common
    config: config,
    dirty: dirty,
    datetime: datetime,
    array: array,
    domevent: domevent,
    domutil: domutil,
    Collection: Collection,
    model: model,
    common: common,
    reqAnimFrame: reqAnimFrame,
    AJAX: AJAX,
    Point: Point, 
    VLayout: VLayout,
    VPanel: VPanel,

    // model
    CalEvent: CalEvent,
    CalEventViewModel: CalEventViewModel,

    // view
    View: View,
    Week: Week,
    DayName: DayName,
    TimeGrid: TimeGrid,
    Time: Time,
    MonthWeek: MonthWeek,

    // handler, guide
    Drag: Drag,

    TimeCore: TimeCore,
    TimeClick: TimeClick,
    TimeCreation: TimeCreation,
    TimeCreationGuide: TimeCreationGuide,
    TimeMove: TimeMove,
    TimeMoveGuide: TimeMoveGuide,
    TimeResize: TimeResize,
    TimeResizeGuide: TimeResizeGuide,

    AlldayCore: AlldayCore,
    AlldayClick: AlldayClick,
    AlldayCreation: AlldayCreation,
    AlldayCreationGuide: AlldayCreationGuide,
    AlldayMove: AlldayMove,
    AlldayMoveGuide: AlldayMoveGuide,
    AlldayResize: AlldayResize,
    AlldayResizeGuide: AlldayResizeGuide,

    // only for test
    ControllerFactory: controllerFactory,

    // service modules
    DoorayEvent: DoorayEvent,
    DoorayController: DoorayController,
    MiniCalendar: MiniCalendar,
    TaskView: TaskView,
    MilestoneClick: MilestoneClick,
    TaskClick: TaskClick,

    // factory class
    OriginCalendar: Calendar,
    FullCalendar: ServiceCalendar
});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./src/js/common/ajax":22,"./src/js/common/array":23,"./src/js/common/collection":25,"./src/js/common/common":26,"./src/js/common/datetime":27,"./src/js/common/dirty":28,"./src/js/common/domevent":29,"./src/js/common/domutil":30,"./src/js/common/model":31,"./src/js/common/point":32,"./src/js/common/reqAnimFrame":33,"./src/js/common/vlayout":34,"./src/js/common/vpanel":35,"./src/js/config":36,"./src/js/dooray/controller/base":39,"./src/js/dooray/factory/calendar":40,"./src/js/dooray/handler/milestoneClick":42,"./src/js/dooray/handler/taskClick":43,"./src/js/dooray/model/calEvent":44,"./src/js/dooray/view/minicalendar":48,"./src/js/dooray/view/taskview":50,"./src/js/factory/calendar":52,"./src/js/factory/controller":53,"./src/js/handler/allday/click":55,"./src/js/handler/allday/core":56,"./src/js/handler/allday/creation":57,"./src/js/handler/allday/creationGuide":58,"./src/js/handler/allday/move":59,"./src/js/handler/allday/moveGuide":60,"./src/js/handler/allday/resize":61,"./src/js/handler/allday/resizeGuide":62,"./src/js/handler/drag":63,"./src/js/handler/time/click":64,"./src/js/handler/time/core":65,"./src/js/handler/time/creation":66,"./src/js/handler/time/creationGuide":67,"./src/js/handler/time/move":68,"./src/js/handler/time/moveGuide":69,"./src/js/handler/time/resize":70,"./src/js/handler/time/resizeGuide":71,"./src/js/model/calEvent":72,"./src/js/model/viewModel/calEvent":73,"./src/js/view/monthweek":75,"./src/js/view/template/registerHelpers":79,"./src/js/view/view":84,"./src/js/view/week/dayname":86,"./src/js/view/week/time":87,"./src/js/view/week/timeGrid":88,"./src/js/view/week/week":89}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = require('./handlebars/base');

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var base = _interopRequireWildcard(_handlebarsBase);

var _handlebarsSafeString = require('./handlebars/safe-string');

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = require('./handlebars/exception');

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = require('./handlebars/utils');

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = require('./handlebars/runtime');

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = require('./handlebars/no-conflict');

// For compatibility and usage outside of module systems, make the Handlebars object a namespace

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

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


},{"./handlebars/base":3,"./handlebars/exception":6,"./handlebars/no-conflict":16,"./handlebars/runtime":17,"./handlebars/safe-string":18,"./handlebars/utils":19}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _helpers = require('./helpers');

var _decorators = require('./decorators');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.4';
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


},{"./decorators":4,"./exception":6,"./helpers":7,"./logger":15,"./utils":19}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = require('./decorators/inline');

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}


},{"./decorators/inline":5}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

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


},{"../utils":19}],6:[function(require,module,exports){
'use strict';

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

  if (loc) {
    this.lineNumber = line;
    this.column = column;
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];


},{}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = require('./helpers/block-helper-missing');

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = require('./helpers/each');

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = require('./helpers/helper-missing');

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = require('./helpers/if');

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = require('./helpers/log');

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = require('./helpers/lookup');

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = require('./helpers/with');

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


},{"./helpers/block-helper-missing":8,"./helpers/each":9,"./helpers/helper-missing":10,"./helpers/if":11,"./helpers/log":12,"./helpers/lookup":13,"./helpers/with":14}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

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


},{"../utils":19}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('../utils');

var _exception = require('../exception');

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


},{"../exception":6,"../utils":19}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = require('../exception');

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


},{"../exception":6}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

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


},{"../utils":19}],12:[function(require,module,exports){
'use strict';

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


},{}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];


},{}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

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


},{"../utils":19}],15:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('./utils');

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


},{"./utils":19}],16:[function(require,module,exports){
(function (global){
/* global window */
'use strict';

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
  };
};

module.exports = exports['default'];


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
'use strict';

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

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _base = require('./base');

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
        depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
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
    if (depths && context !== depths[0]) {
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
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    options.data = _base.createFrame(options.data);
    partialBlock = options.data['partial-block'] = options.fn;

    if (partialBlock.partials) {
      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
    }
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


},{"./base":3,"./exception":6,"./utils":19}],18:[function(require,module,exports){
// Build out our basic SafeString type
'use strict';

exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];


},{}],19:[function(require,module,exports){
'use strict';

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

// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
exports.toString = toString;
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

// Older IE versions do not directly support indexOf so we must implement our own, sadly.
exports.isArray = isArray;

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


},{}],20:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime')['default'];

},{"./dist/cjs/handlebars.runtime":2}],21:[function(require,module,exports){
module.exports = require("handlebars/runtime")["default"];

},{"handlebars/runtime":20}],22:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Module for full management of requesting AJAX from server.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;

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
 * @return {(XMLHttpRequest|ActiveXObject)} 비동기 통신 지원 객체
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
 * @return {*} 가공된 데이터
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
        url = url + separator + '_=' + +(new Date());
    }

    xhr = this._createXHR();
    xhr.open(options.method, url, options.async);
    xhr.setRequestHeader('type', options.type);
    xhr.setRequestHeader('content-type', options.contentType);
    xhr.onreadystatechange = util.bind(this._onReadyStateChange, this, options, xhr);
    xhr.send(data ? data : null);
};

module.exports = AJAX;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],23:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Utility module for array sort, binary search.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var datetime = require('../common/datetime');

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
        currentIndex = (minIndex + maxIndex) / 2 | 0;    // Math.floor
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
    var a = +_a,
        b = +_b;

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
    var a = +_a,
        b = +_b;

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
    var a = _a + '',
        b = _b + '';

    if (a > b) {
        return 1;
    } else if (a < b) {
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
    var a = _a + '',
        b = _b + '';

    if (a > b) {
        return -1;
    } else if (a < b) {
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
    var a = (_a + '').toLowerCase(),
        b = (_b + '').toLowerCase();

    if (a > b) {
        return 1;
    } else if (a < b) {
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
    var a = (_a + '').toLowerCase(),
        b = (_b + '').toLowerCase();

    if (a > b) {
        return -1;
    } else if (a < b) {
        return 1;
    }

    return 0;
}

/**
 * Compare event models for sort.
 *
 * 1. all day event first.
 * 2. early starts.
 * 3. longest duration.
 * 4. early created.
 * @param {CalEvent|CalEventViewModel} a The object event instance.
 * @param {CalEvent|CalEventViewModel} b The object event instance.
 * @returns {number} Result of comparison.
 */
function eventASC(a, b) {
    var durationA,
        durationB,
        allDayCompare,
        startsCompare;

    a = a.valueOf();
    b = b.valueOf();

    allDayCompare = booleanASC(a.isAllDay, b.isAllDay);

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
    } else if (durationA > durationB) {
        return -1;
    }

    return util.stamp(a) - util.stamp(b);
}


module.exports = {
    bsearch: bsearch,
    compare: {
        event: {
            asc: eventASC
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/datetime":27}],24:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Add autoscroll feature to elements that prevented text selection.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var domevent = require('../common/domevent');
var domutil = require('../common/domutil');
var Point = require('../common/point');

var SCROLL_INTERVAL = 30;
var SCROLL_MAX = 15;
var SCROLL_CLICK_INCREASED = 2;    // IE에서 스크롤 바 클릭 시 실제 UI pixel 보다 넓게 잡히는 현상 offset.

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
    return;
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/domevent":29,"../common/domutil":30,"../common/point":32}],25:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Common collections.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util,
    forEachProp = util.forEachOwnProperties,
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
 * You can\'t merge collections different _getEventID functions. Take case of use.
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
    return item._id + '';
};

/**
 * add models.
 * @param {...*} item models to add this collection.
 */
Collection.prototype.add = function(item) {
    var id,
        ownItems;

    if (arguments.length > 1) {
        forEachArr(aps.call(arguments), function(o) {
            this.add(o);
        }, this);

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
    var removed = [],
        ownItems,
        itemToRemove;

    if (!this.length) {
        return removed;
    }

    if (arguments.length > 1) {
        removed = util.map(aps.call(arguments), function(id) {
            return this.remove(id);
        }, this);

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
                return false;
            }
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
 * @param {(string|number|function|array)} key key property or getter function. if string[] supplied, create each collection before grouping.
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
        isFunc = util.isFunction,
        keyIsFunc = isFunc(key),
        getItemIDFn = this.getItemID;

    if (util.isArray(key)) {
        util.forEachArray(key, function(k) {
            result[k + ''] = new Collection(getItemIDFn);
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
            return false;
        } else if (filter(item)) {
            result = item;
            return false;
        }
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],26:[function(require,module,exports){
(function (global){
/**
 * @fileoverview common/general utilities.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Collection = require('../common/collection');
var aps = Array.prototype.slice;

function eventIDGetter(event) {
    return event.cid();
}

module.exports = {
    /**
     * @param {...*} initItems - items to add newly created collection.
     * @returns {Collection} new collection for event models.
     */
    createEventCollection: function(initItems) {    // eslint-disable-line
        var collection = new Collection(eventIDGetter);

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
     * @return {number} limited value
     */
    limit: function(value, minArr, maxArr) {
        var v = Math.max.apply(null, [value].concat(minArr));
        v = Math.min.apply(null, [v].concat(maxArr));
        return v;
    },

    stripTags: function(str) {
        return str.replace(/<([^>]+)>/ig, '');
    }
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/collection":25}],27:[function(require,module,exports){
(function (global){
/**
 * @fileoverview datetime utility module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util,
    opt = Object.prototype.toString;

var dateFormatRx = /^(\d{4}[-|\/]*\d{2}[-|\/]*\d{2})\s?(\d{2}:\d{2}:\d{2})?$/;

var datetime,
    tokenFunc;

var memo = {
    millisecondsTo: {},
    millisecondsFrom: {}
};

tokenFunc = {
    /**
     * @param {Date} date date object.
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
     * @param {Date} date date object
     * @returns {string} four digit year number
     */
    'YYYY': function(date) {
        return date.getFullYear() + '';
    },

    /**
     * @param {Date} date date object
     * @returns {string} two digit month number
     */
    'MM': function(date) {
        return datetime.leadingZero(date.getMonth() + 1, 2);
    },

    /**
     * @param {Date} date date object
     * @returns {string} two digit date number
     */
    'DD': function(date) {
        return datetime.leadingZero(date.getDate(), 2);
    },

    /**
     * @param {Date} date date object
     * @returns {string} HH:mm
     */
    'HH:mm': function(date) {
        var hour = date.getHours(),
            minutes = date.getMinutes();

        return datetime.leadingZero(hour, 2) + ':' +
            datetime.leadingZero(minutes, 2);
    },

    /**
     * format to local date
     * @param {Date} date date object
     * @returns {string} 1988-09-25T09:00:00+09:00
     */
    'LOCAL': function(date) {
        var timeZoneOffset = -date.getTimezoneOffset(),
            diff = timeZoneOffset >= 0 ? '+' : '-',
            pad = function(num) {
                return datetime.leadingZero(num, 2);
            };

        return date.getFullYear() 
            + '-' + pad(date.getMonth() + 1)
            + '-' + pad(date.getDate())
            + 'T' + pad(date.getHours())
            + ':' + pad(date.getMinutes()) 
            + ':' + pad(date.getSeconds()) 
            + diff + pad(timeZoneOffset / 60) 
            + ':' + pad(timeZoneOffset % 60);
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
     * convert milliseconds
     * @param {string} type - type of value.
     * @param {number} value - value to convert.
     * @param {function} iteratee - iteratee function to use reduce.
     * @returns {number} converted value.
     */
    _convMilliseconds: function(type, value, iteratee) {
        var conv = [60, 60, 1000],
            index = {
                hour: 0,
                minutes: 1,
                seconds: 2
            };

        if (!(type in index) || global.isNaN(value)) {
            return false;
        }

        return util.reduce([value].concat(conv.slice(index[type])), iteratee);
    },

    /**
     * Convert milliseconds value to other type
     * @param {type} type convert to type want to. support "hour", "minutes", "seconds" only.
     * @param {value} value - value to convert.
     * @returns {number} converted value.
     */
    millisecondsTo: function(type, value) {
        var cache = memo.millisecondsTo,
            key = type + value;

        if (cache[key]) {
            return cache[key];
        }

        cache[key] = datetime._convMilliseconds(type, value, function(memo, v) {
            return memo / v;
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

        cache[key] = datetime._convMilliseconds(type, value, function(memo, v) {
            return memo * v;
        });

        return cache[key];
    },

    /**
     * Make date array from supplied paramters.
     * @param {Date} start Start date.
     * @param {Date} end End date.
     * @param {number} step The number of milliseconds to use increment.
     * @returns {array} Date array.
     */
    range: function(start, end, step) {
        var cursor = new Date(start.getTime()),
            result = [];

        while (cursor <= end) {
            result.push(cursor);
            cursor = new Date(cursor.getTime() + step);
        }

        return result;
    },

    /**
     * Clone supplied date.
     * @param {Date} date date object to clone.
     * @returns {Date} Cloned date object
     */
    clone: function(date) {
        return new Date(date.getTime());
    },

    /**
     * Compare two dates.
     *
     * when first date is latest then seconds then return -1.
     *
     * return +1 reverse, and return 0 is same.
     * @param {Date} d1 Date object to compare.
     * @param {Date} d2 Date object to compare.
     * @returns {number} result of compare
     */
    compare: function(d1, d2) {
        var _d1 = d1.getTime(),
            _d2 = d2.getTime();

        if (_d1 < _d2) {
            return -1;
        } else if (_d1 > _d2) {
            return 1;
        }
        return 0;
    },

    /**
     * @param {Date} d1 - date one
     * @param {Date} d2 - date two
     * @returns {boolean} is two date are same year, month?
     */
    isSameMonth: function(d1, d2) {
        return (d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth());
    },

    /**
     * @param {Date} d1 - date one
     * @param {Date} d2 - date two
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
        if (opt.call(d) === '[object Date]') {
            return !window.isNaN(d.getTime());
        }
        return false;
    },

    /**
     * convert non local date to UTC date.
     * @param {Date} d Date to convert UTC.
     * @returns {Date} The UTC Date.
     */
    toUTC: function(d) {
        var l = d.getTime(),
            offset = datetime.millisecondsFrom('minutes', new Date().getTimezoneOffset());

        return new Date(l + offset);
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

        if ((number + '').length > length) {
            return number + '';
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

        return new Date(+ymd[0], +ymd[1] + fixMonth, +ymd[2], +hms[0], +hms[1], +hms[2]);
    },

    /**
     * Return date object from Date.
     * @param {Date} date date
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
     * @param {Date} date date.
     * @returns {Date} start date.
     */
    start: function(date) {
        var d = new Date(date.getTime());
        d.setHours(0, 0, 0, 0);

        return d;
    },

    /**
     * Return 23:59:59 supplied date.
     * @param {Date} date date.
     * @returns {Date} end date.
     */
    end: function(date) {
        var d = new Date(date.getTime());
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
     * @param {Date} date String want to formatted.
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
     * Return 2-dimensional array month calendar
     *
     * dates that different month with given date are negative values
     * @param {Date} month - date want to calculate month calendar
     * @param {number} [startDayOfWeek=0] - start day of week
     * @param {function} [iteratee] - iteratee for customizing calendar object
     * @returns {Array.<string[]>} calendar 2d array
     */
    arr2dCalendar: function(month, startDayOfWeek, iteratee) {
        var weekArr,
            starts, ends,
            startIndex, endIndex,
            afterDates,
            cursor, week,
            calendar = [];

        starts = new Date(new Date(+month).setDate(1));
        ends = new Date(new Date(+starts).setMonth(starts.getMonth() + 1));
        ends = new Date(new Date(+ends).setDate(ends.getDate() - 1));

        // create day number array by startDayOfWeek number
        // 4 -> [4, 5, 6, 0, 1, 2, 3]
        // 2 -> [2, 3, 4, 5, 6, 0, 1]
        weekArr = util.range(startDayOfWeek, 7).concat(util.range(7)).slice(0, 7);
        startIndex = util.inArray(starts.getDay(), weekArr);
        endIndex = util.inArray(ends.getDay(), weekArr);
        // free dates after last date of this month
        afterDates = 7 - (endIndex + 1);

        cursor = new Date(new Date(+starts).setDate(starts.getDate() - startIndex));
        // iteratee all dates to render
        util.forEachArray(util.range(startIndex + ends.getDate() + afterDates), function(i) {
            var date;

            if (!(i % 7)) {
                // group each date by week
                week = calendar[i / 7] = [];
            }

            date = new Date(+cursor);
            date = iteratee ? iteratee(date) : date;
            week.push(date);

            // add date
            cursor = new Date(cursor.setDate(cursor.getDate() + 1));
        });

        return calendar;
    }
};

module.exports = datetime;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],28:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Dirty flagging module for objects.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var common = global.tui.util,
    existy = common.isExisty,
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
            common.forEachOwnProperties(methodName, function(flag, methodName) {
                wrap(target, methodName, flag);
            });
            return;
        }

        flag = existy(flag) ? flag : true;

        if (!target._wrapper) {
            /**
             * @param {function} fn Original method to wrap.
             * @param {boolean} flagToSet The boolean value to using dirty flagging.
             * @returns {*} The result value of original method.
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],29:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Utility module for handling DOM events.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util,
    browser = util.browser,
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
        var that = this;

        if (util.isObject(types)) {
            util.forEachOwnProperties(types, function(handler, type) {
                domevent.once(obj, type, handler, fn);
            });
            return;
        }

        function onceHandler() {
            fn.apply(context || obj, arguments);
            that._off(obj, types, onceHandler, context);
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
            evt.button = {0: 1, 1: 4, 2: 2}[evt.button] || evt.button;
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

        button = mouseEvent.button + '';
        if (~primary.indexOf(button)) {
            return 0;
        } else if (~secondary.indexOf(button)) {
            return 2;
        } else if (~wheel.indexOf(button)) {
            return 1;
        }
    }
};

module.exports = domevent;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],30:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Utility modules for manipulate DOM elements.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var domevent = require('./domevent');
var Collection = require('./collection');

var util = global.tui.util,
    posKey = '_pos',
    domutil;

var CSS_AUTO_REGEX = /^auto$|^$|%/;

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
     * @return {boolean} match?
     */
    _matcher: function(el, selector) {
        var cssClassSelector = /^\./,
            idSelector = /^#/;

        if (cssClassSelector.test(selector)) {
            return domutil.hasClass(el, selector.replace('.', ''));
        } else if (idSelector.test(selector)) {
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
     * @param {(HTMLElement|string)} [root] You can assign root element to find. if not supplied, document.body will use.
     * @param {boolean|function} [multiple=false] - set true then return all elements that meet condition, if set function then use it filter function.
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
     * @returns {HTMLElement} - element finded or undefined.
     */
    closest: function(el, selector) {
        var parent = el.parentNode;

        if (domutil._matcher(el, selector)) {
            return el;
        }

        while (parent && parent !== window.document.body) {
            if (domutil._matcher(parent, selector)) {
                return parent;
            }

            parent = parent.parentNode;
        }
    },

    /**
     * Return texts inside element.
     * @param {HTMLElement} el target element
     * @return {string} text inside node
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
                    var re = /(\-([a-z]){1})/g;
                    if (prop === 'float') {
                        prop = 'styleFloat';
                    }

                    if (re.test(prop)) {
                        prop = prop.replace(re, function () {
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

        el.style.left = x + 'px';
        el.style.top = y + 'px';
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
            // 엘리먼트의 left또는 top이 'auto'일 때 수단
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
     * @return {number[]} width, height
     */
    getSize: function(el) {
        var bound,
            width = domutil.getStyle(el, 'width'),
            height = domutil.getStyle(el, 'height');

        if ((CSS_AUTO_REGEX.test(width) || CSS_AUTO_REGEX.test(height)) &&
            'getBoundingClientRect' in el) {
            bound = el.getBoundingClientRect();
            width = bound.width || el.offsetwidth;
            height = bound.height || el.offsetHeight;
        } else {
            width = parseFloat(width || 0);
            height = parseFloat(height || 0);
        }

        return [width, height];
    },

    /**
     * Check specific CSS style is available.
     * @param {array} props property name to testing
     * @return {(string|boolean)} return true when property is available
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
        var groupedByName = new Collection(function() { return this.length; }),
            noDisabledFilter = function(el) { return !el.disabled; },
            output = {};
            
        groupedByName.add.apply(
            groupedByName, 
            domutil.find('input', formElement, noDisabledFilter)
                .concat(domutil.find('select', formElement, noDisabledFilter))
                .concat(domutil.find('textarea', formElement, noDisabledFilter))
        );

        groupedByName = groupedByName.groupBy(function(el) {
            return el && el.getAttribute('name') || '_other';
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
                    result = [elements.find(function(el) { return el.checked; }).toArray().pop()];
                } else if (type === 'checkbox') {
                    result = elements.find(function(el) { return el.checked; }).toArray();
                } else if (nodeName === 'select') {
                    elements.find(function(el) { return !!el.childNodes.length; })
                        .each(function(el) {
                            result = result.concat(domutil.find('option', el, function(opt) {
                                return opt.selected;
                            }));
                        });
                } else {
                    result = elements.find(function(el) { return el.value !== ''; }).toArray();
                }

                result = util.map(result, function(el) { return el.value; });

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
/*eslint-enable*/

/**
 * Disable browser's text selection behaviors.
 * @method
 */
domutil.disableTextSelection = (function() {
    if (supportSelectStart) {
        return function() {
            domevent.on(window, 'selectstart', domevent.preventDefault);
        };
    }

    return function() {
        var style = document.documentElement.style;
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./collection":25,"./domevent":29}],31:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Mixin module for models.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util,
    spaceRx = /^\s*|\s*$/g,
    model;

var datetime = require('../common/datetime');

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
         * @param {Date[]} fields array of date range (starts, ends)
         * @returns {boolean} is valid date range?
         */
        dateRange: function(instance, fields) {
            var starts,
                ends;

            if (!util.isExisty(instance) || fields.length !== 2) {
                return true;
            }

            starts = new Date(instance[fields[0]]);
            ends = new Date(instance[fields[1]]);

            if (!datetime.isValid(starts) || !datetime.isValid(ends)) {
                return false;
            }

            if (datetime.compare(starts, ends) === 1) {
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
        var that = this,
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
                valid = validator(that, values);
                return valid;
            }
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/datetime":27}],32:[function(require,module,exports){
(function (global){
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
'use strict';

var util = global.tui.util;

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
 * @return {Point} Point calculated.
 */
Point.prototype.add = function(point) {
    return this.clone()._add(Point.n(point));
};

/**
 * Add self points.
 * @param {Point} point The point instance to add.
 * @return {Point} Point calculated.
 */
Point.prototype._add = function(point) {
    this.x += point.x;
    this.y += point.y;
    return this;
};

/**
 * Subtract points.
 * @param {Point} point The point instance to subtract.
 * @return {Point} Point calculated.
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
 * @return {Point} Point calculated.
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

    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;

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

    return Math.sqrt(x * x + y * y);
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],33:[function(require,module,exports){
(function (global){
/**
 * @fileoverview RequestAnimFrame
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var requestFn,
    cancelFn;

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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],34:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Layout module that supplied split height, resize height features.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    mAbs = Math.abs;

var config = require('../config'),
    common = require('./common'),
    domutil = require('./domutil'),
    domevent = require('./domevent'),
    View = require('../view/view'),
    VPanel = require('./vpanel'),
    Drag = require('../handler/drag');

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
 */
function VLayout(options, container) {
    var opt;

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
        distance: 0,
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

    if (opt.panels.length) {
        if (opt.panelHeights.length) {
            util.forEach(opt.panels, function(panelOpt) {
                if (!panelOpt.isSplitter && !panelOpt.autoHeight) {
                    panelOpt.height = opt.panelHeights.shift();
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
    resizeInfo = cursor.getResizeInfoByGrowth(+resizedHeight);
    resizeMap.push([cursor, resizeInfo[0]]);

    while (cursor = this[forwardMethod](cursor)) {
        if (cursor.isSplitter()) {
            continue;
        }

        resizeInfo = cursor.getResizeInfoByGrowth(-resizedHeight);
        resizeMap.push([cursor, resizeInfo[0]]);
        resizedHeight -= resizeInfo[1];

        if (resizedHeight < 0) {
            break;
        }
    }

    util.forEach(resizeMap, function(pair) {
        pair[0].setHeight(null, pair[1]);
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
        cursor = splPanel,
        func = function(panel) {
            if (panel.isSplitter()) {
                return panel.getHeight();
            }

            return panel.options.minHeight;
        };

    while (cursor = this.prevPanel(cursor)) {
        upper += func(cursor);
    }

    cursor = splPanel;

    while (cursor = this.nextPanel(cursor)) {
        below += func(cursor);
    }

    return [upper, below];
};

/**********
 * Drag Handlers
 **********/

/**
 * Drag start event handler
 * @param {object} e - drag start event data
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
 * Drag event handler
 * @param {object} e - drag event data
 */
VLayout.prototype._onDrag = function(e) {
    var dragData = this._dragData,
        mouseY = domevent.getMousePosition(e.originEvent, this.container)[1];

    mouseY = common.limit(mouseY - dragData.splOffsetY, [dragData.minY], [dragData.maxY]);

    this._refreshGuideElement(dragData.guideElement, mouseY);
};

/**
 * Drag end event handler
 * @fires VLayout#resize
 * @param {object} e - dragend event data
 */
VLayout.prototype._onDragEnd = function(e) {
    var dragData = this._dragData,
        asideMinMax = this._getMouseYAdditionalLimit(dragData.splPanel),
        mouseY = domevent.getMousePosition(e.originEvent, this.container)[1];

    // mouseY value can't exceed summation of splitter height and panel's minimum height based on target splitter.
    mouseY = common.limit(mouseY - dragData.splOffsetY, [dragData.minY + asideMinMax[0]], [dragData.maxY - asideMinMax[1]]);

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
    var panelToFillHeight = [],
        usedHeight = 0,
        remainHeight;

    util.forEach(this.panels, function(panel) {
        if (panel.options.autoHeight) {
            panelToFillHeight.push(panel);
        } else {
            usedHeight += panel.getHeight();
        }
    });

    remainHeight = (this.getViewBound().height - usedHeight) / panelToFillHeight.length;

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

    panels.push(new VPanel(options, element));

    container.appendChild(element);
};

/**
 * Add multiple panel
 * @param {PanelOptions[]} options - panel options list
 * @param {HTMLElement} container - container element
 */
VLayout.prototype.addPanels = function(options, container) {
    var frag = document.createDocumentFragment();

    util.forEach(options, function(option) {
        this.addPanel(option, frag);
    }, this);

    container.appendChild(frag);
};

util.CustomEvents.mixin(VLayout);

module.exports = VLayout;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../config":36,"../handler/drag":63,"../view/view":84,"./common":26,"./domevent":29,"./domutil":30,"./vpanel":35}],35:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Panel class for VLayout module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../config'),
    common = require('./common'),
    domutil = require('./domutil'),
    View = require('../view/view');

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
 */
function VPanel(options, container) {
    View.call(this, container);

    /**
     * @type {object}
     */
    this.options = util.extend({
        index: 0,
        minHeight: 0,
        height: null,
        isSplitter: false,
        autoHeight: false,
        className: ''
    }, options);

    /**
     * @type {number}
     */
    this.index = this.options.index;

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
 * set height of html element
 * @param {HTMLElement} [container] - container element
 * @param {number} newHeight - height
 */
VPanel.prototype.setHeight = function(container, newHeight) {
    container = container || this.container;
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
}

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

        this.setHeight(container, height);
    }
};

module.exports = VPanel;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../config":36,"../view/view":84,"./common":26,"./domutil":30}],36:[function(require,module,exports){
/* eslint-disable */
/**
 * @fileoverview Global configuration object module. This @echo syntax will change preprocess context. See gulpfile.js
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var config = {
    throwError: function(msg) {
        alert(msg);
    },

    cssPrefix: 'dcal-',

    classname: function(str) {
        return config.cssPrefix + (str + '');
    },

    minicalendar: {
        getDataRegExp: /dcal-minicalendar-(\d{4}-\d{2}-\d{2})/
    },

    allday: {
        getViewIDRegExp: /^dcal-allday-monthweek[\s]dcal-(\d+)/,
        checkCondRegExp: /^dcal-allday-event(-title)?$/
    },

    time: {
        getViewIDRegExp: /^dcal-time-date[\s]dcal-(\d+)/
    }
};

module.exports = config;


},{}],37:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Base calendar controller
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var CalEvent = require('../model/calEvent');
var CalEventViewModel = require('../model/viewModel/calEvent');
var datetime = require('../common/datetime');
var common = require('../common/common');

/**
 * @constructor
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @mixes util.CustomEvents
 */
function Base(options) {
    options = options || {};

    /**
     * function for group each event models.
     * @type {function}
     * @param {CalEventViewModel} viewModel - view model instance
     * @return {string} group key
     */
    this.groupFunc = options.groupFunc || function(viewModel) {
        if (viewModel.model.isAllDay) {
            return 'allday';
        }
        return 'time';
    }

    /**
     * events collection.
     * @type {Collection}
     */
    this.events = common.createEventCollection();

    /**
     * Matrix for multidate events.
     * @type {object.<string, array>}
     */
    this.dateMatrix = {};
}

/**
 * Calculate contain dates in event.
 * @private
 * @param {CalEvent} event The instance of event.
 * @returns {array} contain dates.
 */
Base.prototype._getContainDatesInEvent = function(event) {
    var range = datetime.range(
        datetime.start(event.getStarts()),
        datetime.start(event.getEnds()),
        datetime.MILLISECONDS_PER_DAY
    );

    return range;
};

/**********
 * CRUD
 **********/

/**
 * Create an event instance from raw data.
 * @emits Base#createdEvent
 * @param {object} options Data object to create event.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {CalEvent} The instance of CalEvent that created.
 */
Base.prototype.createEvent = function(options, silent) {
    var event = this.addEvent(CalEvent.create(options));

    if (!silent) {
        /**
         * @event Base#createdEvent
         * @type {CalEvent}
         */
        this.fire('createdEvent', event);
    }

    return event;
};

/**
 * @emits Base#beforeCreateEvent
 * @emits Base#createdEvent
 * @param {Calendar~CalEvent[]} dataList - dataObject list to create event.
 * @param {boolean} [silent=false] - set true then don't fire events.
 * @returns {CalEvent[]} The instance list of CalEvent that created.
 */
Base.prototype.createEvents = function(dataList, silent) {
    return util.map(dataList, function(data) {
        return this.createEvent(data, silent);
    }, this);
};

/**
 * Update an event.
 * @emits Base#updateEvent
 * @param {number} id The unique id of CalEvent instance.
 * @param {object} options updated object data.
 * @returns {CalEvent|boolean} updated event instance, when it fail then return false.
 */
Base.prototype.updateEvent = function(id, options) {
    var result = false;

    this.events.doWhenHas(id, function(model) {
        options = options || {};

        if (options.title) {
            model.set('title', options.title);
        }

        if (options.isAllDay) {
            model.set('isAllDay', options.isAllDay);
        }

        if (options.starts) {
            model.set('starts', new Date(options.starts));
        }

        if (options.ends) {
            model.set('ends', new Date(options.ends));
        }

        this._removeFromMatrix(model);
        this._addToMatrix(model);

        result = model;
    }, this);

    /**
     * @event Base#updateEvent
     */
    this.fire('updateEvent');

    return result;
};

/**
 * Delete event instance from controller.
 * @param {number} id - unique id of model instance.
 * @returns {CalEvent} deleted model instance.
 */
Base.prototype.deleteEvent = function(id) {
    var result = false;

    this.events.doWhenHas(id, function(event) {
        result = event;
        this._removeFromMatrix(event);
        this.events.remove(event);
    }, this);

    return result;
};

/**
 * Set date matrix to supplied event instance.
 * @param {CalEvent} event - instance of event.
 */
Base.prototype._addToMatrix = function(event) {
    var ownMatrix = this.dateMatrix,
        containDates = this._getContainDatesInEvent(event);

    util.forEach(containDates, function(date) {
        var ymd = datetime.format(date, 'YYYYMMDD'),
            matrix = ownMatrix[ymd] = ownMatrix[ymd] || [];

        matrix.push(util.stamp(event));
    });
};

/**
 * Remove event's id from matrix.
 * @param {CalEvent} event - instance of event
 */
Base.prototype._removeFromMatrix = function(event) {
    var modelID = util.stamp(event);

    util.forEach(this.dateMatrix, function(matrix) {
        var index = util.inArray(modelID, matrix);

        if (~index) {
            matrix.splice(index, 1);
        }
    }, this);
};

/**
 * Add an event instance.
 * @emits Base#addedEvent
 * @param {CalEvent} event The instance of CalEvent.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {CalEvent} The instance of CalEvent that added.
 */
Base.prototype.addEvent = function(event, silent) {
    this.events.add(event);
    this._addToMatrix(event);

    if (!silent) {
        /**
         * @event Base#addedEvent
         * @type {object}
         */
        this.fire('addedEvent', event);
    }

    return event;
};

/**
 * split event model by ymd.
 * @param {Date} starts - start date
 * @param {Date} ends - end date
 * @param {Collection} eventCollection - collection of event model.
 * @returns {object.<string, Collection>} splitted event model collections.
 */
Base.prototype.splitEventByDateRange = function(starts, ends, eventCollection) {
    var range = datetime.range(
            datetime.start(starts),
            datetime.start(ends),
            datetime.MILLISECONDS_PER_DAY
        ),
        ownMatrix = this.dateMatrix,
        result = {};

    util.forEachArray(range, function(date) {
        var ymd = datetime.format(date, 'YYYYMMDD'),
            matrix = ownMatrix[ymd],
            collection;

        collection = result[ymd] = common.createEventCollection();

        if (matrix && matrix.length) {
            util.forEachArray(matrix, function(id) {
                eventCollection.doWhenHas(id, function(event) {
                    collection.add(event);
                });
            });
        }
    });

    return result;
};

/**
 * Return events in supplied date range.
 *
 * available only YMD.
 * @param {Date} starts start date.
 * @param {Date} ends end date.
 * @returns {object.<string, Collection>} event collection grouped by dates.
 */
Base.prototype.findByDateRange = function(starts, ends) {
    var range = datetime.range(
            datetime.start(starts),
            datetime.start(ends),
            datetime.MILLISECONDS_PER_DAY
        ),
        ownEvents = this.events.items,
        ownMatrix = this.dateMatrix,
        dformat = datetime.format,
        result = {},
        matrix,
        ymd,
        viewModels;

    util.forEachArray(range, function(date) {
        ymd = dformat(date, 'YYYYMMDD');
        matrix = ownMatrix[ymd];
        viewModels = result[ymd] = common.createEventCollection();

        if (matrix && matrix.length) {
            viewModels.add.apply(viewModels, util.map(matrix, function(id) {
                return CalEventViewModel.create(ownEvents[id]);
            }));
        }
    });

    return result;
};

// mixin
util.CustomEvents.mixin(Base);

module.exports = Base;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/common":26,"../common/datetime":27,"../model/calEvent":72,"../model/viewModel/calEvent":73}],38:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Controller mixin modules for day views.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Collection = require('../../common/collection');
var datetime = require('../../common/datetime');
var common = require('../../common/common');
var array = require('../../common/array');
var CalEventViewModel = require('../../model/viewModel/calEvent');
var aps = Array.prototype.slice;

/**
 * @mixin Base.Week
 */
var Week = {
    /**********
     * COMMON
     **********/

    /**
     * Calculate collision group.
     * @this Base.Week
     * @param {array} viewModels List of viewmodels.
     * @returns {array} Collision Group.
     */
    getCollisionGroup: function(viewModels) {
        var collisionGroups = [],
            foundPrevCollisionEvent = false,
            previousEventList;

        if (!viewModels.length) {
            return collisionGroups;
        }

        collisionGroups[0] = [util.stamp(viewModels[0].valueOf())];
        util.forEachArray(viewModels.slice(1), function(event, index) {
            foundPrevCollisionEvent = false;
            previousEventList = aps.apply(viewModels, [0, index + 1]).reverse();

            util.forEachArray(previousEventList, function(previous) {
                if (event.collidesWith(previous)) {
                    // 이전 일정들과 겹치는 경우 겹치는 일정의 Collision Group을
                    // 찾아 이 일정을 추가한다
                    foundPrevCollisionEvent = true;

                    util.forEachArray(collisionGroups.slice(0).reverse(), function(group) {
                        if (~util.inArray(util.stamp(previous.valueOf()), group)) {
                            // 겹치는 이전 일정을 찾은 경우 그 일정이 속한
                            // Collision Group에 이 일정을 포함시킨다.
                            group.push(util.stamp(event.valueOf()));
                            return false;
                        }
                    });

                    return false;
                }
            });

            if (!foundPrevCollisionEvent) {
                // 이 일정은 이전일정과 겹치지 않는 일정이므로
                // 새 Collision Group을 구성한다.
                collisionGroups.push([util.stamp(event.valueOf())]);
            }
        });

        return collisionGroups;
    },

    /**
     * Get row length by column index in 2d matrix.
     * @this Base.Week
     * @param {array[]} arr2d Matrix
     * @param {number} col Column index.
     * @return {number} Last row number in column.
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
     * @this Base.Week
     * @param {Collection} collection model collection.
     * @param {array[]} collisionGroups Collision groups for event set.
     * @returns {array} matrices
     */
    getMatrices: function(collection, collisionGroups) {
        var result = [],
            getLastRowInColumn = Week.getLastRowInColumn;

        util.forEachArray(collisionGroups, function(group) {
            var matrix = [[]];

            util.forEachArray(group, function(eventID) {
                var event = collection.items[eventID],
                    col = 0,
                    found = false,
                    nextRow,
                    lastRowInColumn;

                while (!found) {
                    lastRowInColumn = getLastRowInColumn(matrix, col);

                    if (lastRowInColumn === false) {
                        matrix[0].push(event);
                        found = true;
                    } else if (!event.collidesWith(matrix[lastRowInColumn][col])) {
                        nextRow = lastRowInColumn + 1;
                        if (util.isUndefined(matrix[nextRow])) {
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
    },

    /**********
     * TIME GRID VIEW
     **********/

    /**
     * Make array with start and end times on events.
     * @this Base.Week
     * @param {array[]} matrix - matrix from controller.
     * @returns {array[]} starttime, endtime array (exclude first row's events)
     */
    generateTimeArrayInRow: function(matrix) {
        var row,
            col,
            event,
            map = [],
            cursor = [],
            maxColLen = Math.max.apply(null, util.map(matrix, function(col) {
                return col.length;
            }));

        for (col = 1; col < maxColLen; col += 1) {
            row = 0;
            event = util.pick(matrix, row, col);

            while (event) {
                cursor.push([event.getStarts().getTime(), event.getEnds().getTime()]);

                row += 1;
                event = util.pick(matrix, row, col);
            }

            map.push(cursor);
            cursor = [];
        }

        return map;
    },

    /**
     * Get collision information from list
     * @this Base.Week
     * @param {array.<number[]>} arr - list to detecting collision. [[start, end], [start, end]]
     * @param {number} start - event start time that want to detect collisions.
     * @param {number} end - event end time that want to detect collisions.
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
     * @this Base.Week
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

                    startTime = viewModel.getStarts().getTime() + 1;
                    endTime = viewModel.getEnds().getTime() - 1;

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
     * @this Base
     * @param {Date} starts - start date.
     * @param {Date} ends - end date.
     * @param {Collection} time - view model collection.
     * @returns {object} view model for time part.
     */
    getViewModelForTimeView: function(starts, ends, time) {
        var ymdSplitted = this.splitEventByDateRange(starts, ends, time),
            result = {};

        util.forEach(ymdSplitted, function(collection, ymd) {
            var viewModels = collection.sort(array.compare.event.asc),
                collisionGroups,
                matrices;

            collisionGroups = this.getCollisionGroup(viewModels);
            matrices = this.getMatrices(collection, collisionGroups);
            this.getCollides(matrices);

            result[ymd] = matrices;
        }, Week);

        return result;
    },

    /**********
     * ALLDAY VIEW
     **********/

    /**
     * create view model for allday view part.
     * @param {Date} starts start date.
     * @param {Date} ends end date.
     * @param {Collection} viewModels - allday event viewModel viewModels.
     * @returns {object} allday viewModel.
     */
    getViewModelForAlldayView: function(starts, ends, viewModels) {
        var list,
            ymdsToRender,
            collisionGroups,
            matrices;

        if (!viewModels || !viewModels.length) {
            return [];
        }

        ymdsToRender = util.map(
            datetime.range(starts, ends, datetime.MILLISECONDS_PER_DAY),
            function(date) {
                return datetime.format(date, 'YYYYMMDD');
            }
        );

        list = viewModels.sort(array.compare.event.asc);
        collisionGroups = Week.getCollisionGroup(list);
        matrices = Week.getMatrices(viewModels, collisionGroups);

        util.forEachArray(matrices, function(matrix) {
            util.forEachArray(matrix, function(column) {
                util.forEachArray(column, function(viewModel, index) {
                    var ymd, dateLength;

                    if (!viewModel) {
                        return;
                    }

                    ymd = datetime.format(viewModel.getStarts(), 'YYYYMMDD');
                    dateLength = datetime.range(
                        viewModel.getStarts(),
                        viewModel.getEnds(),
                        datetime.MILLISECONDS_PER_DAY
                    ).length;

                    viewModel.top = index;
                    viewModel.left = util.inArray(ymd, ymdsToRender);
                    viewModel.width = dateLength;
                });
            });
        });

        return matrices;
    },

    /**********
     * READ
     **********/

    /**
     * Populate events in date range.
     * @this Base
     * @param {Date} starts start date.
     * @param {Date} ends end date.
     * @param {object} [andFilter] - additional filter to AND clause
     * @returns {object} events grouped by dates.
     */
    findByDateRange: function(starts, ends, andFilter) {
        var that = this,
            events,
            viewModels,
            filter;

        filter = function(model) {
            var ownStarts = model.getStarts(),
                ownEnds = model.getEnds();

            return (ownStarts >= starts && ownEnds <= ends) ||
                (ownStarts < starts && ownEnds >= starts) ||
                (ownEnds > ends && ownStarts <= ends);
        };

        if (andFilter) {
            filter = Collection.and.apply(null, [filter].concat(andFilter));
        }

        // QUERY EVENTS
        events = this.events.find(filter);

        // CONVERT TO VIEWMODEL
        viewModels = common.createEventCollection.apply(
            null,
            util.map(events.items, function(event) {
                return CalEventViewModel.create(event);
            })
        ).groupBy(['allday', 'time'], this.groupFunc);

        // CUSTOMIZE VIEWMODEL FOR EACH VIEW
        util.forEach(viewModels, function(coll, key, obj) {
            if (key === 'allday') {
                coll.each(function(viewModel) {
                    var ownStarts = viewModel.getStarts(),
                        ownEnds = viewModel.getEnds();

                    if (ownStarts < starts) {
                        viewModel.renderStarts = new Date(starts.getTime());
                    }

                    if (ownEnds > ends) {
                        viewModel.renderEnds = new Date(ends.getTime());
                    }
                });

                obj.allday = util.bind(Week.getViewModelForAlldayView, that)(starts, ends, coll);
            } else if (key === 'time') {
                obj.time = util.bind(Week.getViewModelForTimeView, that)(starts, ends, coll);
            }
        });

        return viewModels;
    }
};

module.exports = Week;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/array":23,"../../common/collection":25,"../../common/common":26,"../../common/datetime":27,"../../model/viewModel/calEvent":73}],39:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Base controller for Dooray service project.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Base = require('../../controller/base');
var DoorayEvent = require('../model/calEvent');

/**
 * @constructor
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @extends {Base}
 */
function DoorayBase(options) {
    Base.call(this, options);
}

util.inherit(DoorayBase, Base);

/**********
 * CRUD override
 **********/

/**
 * Create an event instance from raw data.
 * @override
 * @emits Base#beforeCreateEvent
 * @emits Base#createdEvent
 * @param {ServiceCalendar~CalEvent} data - Data object to create event.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {DoorayEvent} The instance of CalEvent that created.
 */
DoorayBase.prototype.createEvent = function(data, silent) {
    var inst,
        eventData = {
            data: data
        };

    /**
     * @event Base#beforeCreateEvent
     * @type {ServiceCalendar~Events[]}
     */
    if (!this.invoke('beforeCreateEvent', eventData)) {
        return;
    }

    inst = this.addEvent(DoorayEvent.create(data));

    if (!silent) {
        /**
         * @event Base#createdEvent
         * @type {DoorayEvent}
         */
        this.fire('createdEvent', inst);
    }

    return inst;
};

/**
 * Update an event.
 * @emits DoorayBase#updateEvent
 * @param {CalEvent} calEvent - event instance to update 
 * @param {object} options updated object data
 * @returns {CalEvent|boolean} updated event instance, when it fail then return false
 */
DoorayBase.prototype.updateEvent = function(calEvent, options) {
    if (options.title) {
        calEvent.set('title', options.title);
    }

    if (options.isAllDay) {
        calEvent.set('isAllDay', options.isAllDay);
    }

    if (options.starts) {
        calEvent.set('starts', new Date(options.starts));
    }

    if (options.ends) {
        calEvent.set('ends', new Date(options.ends));
    }

    if (options.color) {
        calEvent.set('color', options.color);
    }

    if (options.bgColor) {
        calEvent.set('bgColor', options.bgColor);
    }

    this._removeFromMatrix(calEvent);
    this._addToMatrix(calEvent);

    /**
     * @event DoorayBase#updateEvent
     */
    this.fire('updateEvent');

    return true;
};

/**
 * Delete event instance from controller
 * @param {CalEvent} calEvent - event instance to delete
 * @returns {CalEvent} deleted model instance
 */
DoorayBase.prototype.deleteEvent = function(calEvent) {
    this._removeFromMatrix(calEvent);
    this.events.remove(calEvent);

    return true;
};


module.exports = DoorayBase;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../controller/base":37,"../model/calEvent":44}],40:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Calendar for service.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var Calendar = require('../../factory/calendar');
var DoorayBase = require('../controller/base');
var Week = require('../../controller/viewMixin/week');
var serviceWeekViewFactory = require('./weekView');

/**
 * @typedef {object} ServiceCalendar~DoorayEvent
 * @property {string} [id] - 일정의 uniqueID.
 * @property {string} [calendarID] - 각 일정을 캘린더별로 그룹지을 수 있는 값.
 * @property {string} title - 이벤트 제목
 * @property {string} category - 이벤트 타입
 * @property {string} dueDateClass - 업무 일정 분류 (category가 'task'일 때 유효)
 * @property {string} starts - 일정 시작 시간
 * @property {string} ends - 일정 종료 시간
 * @property {string} [color] - 일정 텍스트색
 * @property {string} [bgColor] - 일정 배경색
 */

/**
 * Calendar factor module for service (dooray)
 * @constructor
 * @extends {Calendar}
 * @param {object} options - options for calendar
 *  @param {string} [options.cssPrefix] - CSS classname prefix
 *  @param {function} [options.groupFunc] - function for group event models {@see Collection#groupBy}
 *  @param {function} [options.controller] - controller instance
 *  @param {string} [options.defaultView='week'] - default view of calendar
 *  @param {object} [options.calendarColor] - {@see ServiceCalendar~DoorayEvent} 의 calendarID별로 스타일을 미리 지정 가능
 *  @param {object} [options.week] - options for week view
 *   @param {number} [options.week.startDayOfWeek=0] - start day of week
 *   @param {string} options.week.renderStartDate - YYYY-MM-DD render start date
 *   @param {string} options.week.renderEndDate - YYYY-MM-DD render end date
 *   @param {string} [options.week.panelHeights] - each panel height
 *  @param {ServiceCalendar~DoorayEvent[]} options.events - 기본 일정 목록
 *  @param {object} [options.month] - options for month view
 *  @param {string} options.month.renderMonth - YYYY-MM render month
 * @param {HTMLDivElement} container = container element for calendar
 */
function ServiceCalendar(options, container) {
    var controller;

    if (!(this instanceof ServiceCalendar)) {
        return new ServiceCalendar(options, container);
    }

    /**
     * 서비스에서 사용되는 모델 구분용 옵션 함수
     * @param {CalEventViewModel} viewModel - DoorayEvent를 래핑한 뷰 모델
     * @returns {string} 구분 키 값
     */
    options.groupFunc = function(viewModel) {
        return viewModel.model.category;
    };

    // 컨트롤러 만들기
    controller = options.controller = (function() {
        var controller = new DoorayBase(options),
            originFindByDateRange;

        // 주뷰 컨트롤러 믹스인
        controller.Week = {};
        util.forEach(Week, function(method, methodName) {
            controller.Week[methodName] = util.bind(method, controller);
        });

        // 일정 조회 API에 기존 캘린더에 없었던 milstone, task를 지원하도록
        // 하기 위해 메서드를 오버라이딩한다.
        originFindByDateRange = controller.Week.findByDateRange;

        // visible이 true인 일정만 필터링 하기 위한 필터 함수
        function filterModelIsVisible(model) {
            return !!model.visible;
        }

        controller.Week.findByDateRange = function(starts, ends) {
            var dateRange = util.map(datetime.range(
                    datetime.start(starts),
                    datetime.end(ends),
                    datetime.MILLISECONDS_PER_DAY
                ), function(d) { return datetime.format(d, 'YYYY-MM-DD'); }),
                viewModel = originFindByDateRange(starts, ends, [filterModelIsVisible]);

            util.forEach(viewModel, function(coll, key, obj) {
                var groupedByYMD;

                // 마일스톤, 업무 뷰 뷰모델 가공
                if (key === 'task' || key === 'milestone') {
                    groupedByYMD = coll.groupBy(dateRange, function(viewModel) {
                        return datetime.format(viewModel.model.ends, 'YYYY-MM-DD');
                    });

                    if (key === 'task') {
                        util.forEach(groupedByYMD, function(coll, ymd, obj) {
                            obj[ymd] = coll.groupBy(function(viewModel) {
                                return viewModel.model.dueDateClass;
                            });
                        });
                    }

                    obj[key] = groupedByYMD;
                }
            });

            return viewModel;
        };

        return controller;
    })();

    // FullCalendar 기본 모듈은 category, dueDateClass 플래그를 모름. 때문에
    // 이곳에서 이벤트 핸들러를 등록해서 일정 생성 전에 isAllDay플래그를 보고
    // category를 수동으로 지정해준다
    controller.on('beforeCreateEvent', function(e) {
        var data = e.data;

        if (!data.category) {
            data.category = data.isAllDay ? 'allday' : 'time';
        }
    });

    /**
     * @type {object}
     */
    this.calendarColor = options.calendarColor || {};

    Calendar.call(this, options, container);
}

util.inherit(ServiceCalendar, Calendar);

/**********
 * CRUD override
 **********/

/**
 * Create events instance and render calendar.
 * @param {ServiceCalendar~DoorayEvent[]} dataObjectList - array of {@see ServiceCalendar~DoorayEvent[]} object
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
ServiceCalendar.prototype.createEvents = function(dataObjectList, silent) {
    var calColor = this.calendarColor;

    util.forEach(dataObjectList, function(obj) {
        var color = calColor[obj.calendarID];

        if (color) {
            obj.color = color.color;
            obj.bgColor = color.bgColor;
        }
    });

    Calendar.prototype.createEvents.call(this, dataObjectList, silent);
};

/**
 * @override
 * @param {string} id - id of event instance from server API
 * @returns {DoorayEvent} founded event instance.
 */
ServiceCalendar.prototype.getEvent = function(id) {
    return this.controller.events.single(function(model) {
        return model.id === id;
    });
};

/**
 * @override
 * @param {string} id - ID of event instance to update data
 * @param {object} data - data object to update event
 */
ServiceCalendar.prototype.updateEvent = function(id, data) {
    var ctrl = this.controller,
        ownEvents = ctrl.events,
        calEvent = ownEvents.single(function(model) {
            return model.id === id;
        });

    if (calEvent) {
        ctrl.updateEvent(calEvent, data);
        this.render();
    }
};

/**
 * Delete DoorayEvent instance
 * @override
 * @fires ServiceCalendar#beforeDeleteEvent
 * @param {string} id - ID of event to delete
 */
ServiceCalendar.prototype.deleteEvent = function(id) {
    var ctrl = this.controller,
        ownEvents = ctrl.events,
        calEvent = ownEvents.single(function(model) {
            return model.id === id;
        });

    if (!calEvent) {
        return;
    }

    /**
     * @event ServiceCalendar#beforeDeleteEvent
     * @type {object}
     * @property {CalEvent} model - model instance to delete
     */
    this.fire('beforeDeleteEvent', {
        model: calEvent 
    });
    
    ctrl.deleteEvent(calEvent);
    this.render();
};

/**********
 * Custom Events
 **********/

/**
 * 각 뷰의 클릭 핸들러와 사용자 클릭 이벤트 핸들러를 잇기 위한 브릿지 개념의 이벤트 핸들러
 * @emits ServiceCalendar#clickEvent
 * @param {object} clickEventData - 'clickEvent' 핸들러의 이벤트 데이터
 */
ServiceCalendar.prototype._onClick = function(clickEventData) {
    /**
     * @events ServiceCalendar#clickEvent
     * @type {object}
     * @property {DoorayEvent} model - 클릭 이벤트 블록과 관련된 일정 모델 인스턴스
     * @property {MouseEvent} jsEvent - 마우스 이벤트
     */
    this.fire('clickEvent', clickEventData);
};

/**
 * @fires {ServiceCalendar#beforeCreateEvent}
 * @param {object} createEventData - select event data from allday, time
 */
ServiceCalendar.prototype._onBeforeCreate = function(createEventData) {
    /**
     * @events ServiceCalendar#beforeCreateEvent
     * @type {object}
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeCreateEvent', createEventData);
};

/**
 * @fires ServiceCalendar#beforeUpdateEvent
 * @param {object} updateEventData - update event data
 */
ServiceCalendar.prototype._onBeforeUpdate = function(updateEventData) {
    /**
     * @event ServiceCalendar#beforeUpdateEvent
     * @type {object}
     * @property {CalEvent} model - model instance to update
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeUpdateEvent', updateEventData);
};

/**
 * @fires ServiceCalendar#resizePanel
 * @param {object} resizeEventData - resize event data object
 */
ServiceCalendar.prototype._onResizePanel = function(resizeEventData) {
    /**
     * @event ServiceCalendar#resizePanel
     * @type {object}
     * @property {number[]} layoutData - layout data after resized
     */
    this.fire('resizePanel', resizeEventData);
};

/**
 * 캘린더 팩토리 클래스와 주뷰, 월뷰의 이벤트 연결을 토글한다
 * @param {boolean} isAttach - true면 이벤트 연결함.
 * @param {Week|Month} view - 주뷰 또는 월뷰
 * @param {ServiceCalendar} calendar - 캘린더 팩토리 클래스
 */
ServiceCalendar.prototype._toggleViewEvent = function(isAttach, view, calendar) {
    var handler = view.handler,
        calendar = this,
        method = isAttach ? 'on' : 'off';

    util.forEach(handler.click, function(handlerInstance) {
        handlerInstance[method]('clickEvent', calendar._onClick, calendar);
    });

    util.forEach(handler.creation, function(handlerInstance) {
        handlerInstance[method]('beforeCreateEvent', calendar._onBeforeCreate, calendar);
    });

    util.forEach(handler.move, function(handlerInstance) {
        handlerInstance[method]('beforeUpdateEvent', calendar._onBeforeUpdate, calendar);
    });

    util.forEach(handler.resize, function(handlerInstance) {
        handlerInstance[method]('beforeUpdateEvent', calendar._onBeforeUpdate, calendar);
    });

    view.vlayout[method]('resize', calendar._onResizePanel, calendar);
};

/**********
 * Methods
 **********/

/**
 * 현재 화면의 각 영역에 대한 높이 값을 반환한다.
 * @returns {number[]} splitter와 autoHeight를 제외한 나머지 패널의 높이 배열
 */
ServiceCalendar.prototype.getLayoutData = function() {
    return this.layout.vlayout.getLayoutData();
};

/**
 * 같은 calendarID를 가진 모든 일정에 대해 글자색, 배경색을 재지정하고 뷰를 새로고침한다
 * @param {string} calendarID - calendarID value
 * @param {object} option - color data object
 *  @param {string} option.color - text color of event element
 *  @param {string} option.bgColor - bg color of event element
 *  @param {boolean} [option.render=true] - set false then does not auto render.
 */
ServiceCalendar.prototype.setCalendarColor = function(calendarID, option) {
    var calColor = this.calendarColor,
        ownEvents = this.controller.events,
        ownColor = calColor[calendarID];

    if (!util.isObject(option)) {
        config.throwError('Calendar#changeCalendarColor(): color 는 {color: \'\', bgColor: \'\'} 형태여야 합니다.');
    }

    ownColor = calColor[calendarID] = util.extend({
        color: '#000',
        bgColor: '#a1b56c',
        render: true
    }, option);

    ownEvents.each(function(model) {
        if (model.calendarID !== calendarID) {
            return;
        }

        model.color = ownColor.color;
        model.bgColor = ownColor.bgColor;
    });

    if (!!ownColor.render) {
        this.render();
    }
};

/**
 * Toggle events visibility by calendar ID
 * @param {string} calendarID - calendar id value
 * @param {boolean} toHide - set true to hide events
 * @param {boolean} render - set true then render after change visible property each models
 * @private
 */
ServiceCalendar.prototype._toggleEventsByCalendarID = function(calendarID, toHide, render) {
    var ownEvents = this.controller.events;

    calendarID = util.isArray(calendarID) ? calendarID : [calendarID];

    ownEvents.each(function(model) {
        if (~util.inArray(model.calendarID, calendarID)) {
            model.set('visible', !toHide);
        }
    });

    if (render) {
        this.render();
    }
};

/**
 * Show events visibility by calendar ID
 * @param {string|string[]} calendarID - calendar id value
 * @param {boolean} [render=true] - set false then doesn't render after change model's property.
 */
ServiceCalendar.prototype.showEventsByCalendarID = function(calendarID, render) {
    render = util.isExisty(render) ? render : true;
    this._toggleEventsByCalendarID(calendarID, false, render);
};

/**
 * Hide events visibility by calendar ID
 * @param {string|string[]} calendarID - calendar id value
 * @param {boolean} [render=true] - set false then doesn't render after change model's property.
 */
ServiceCalendar.prototype.hideEventsByCalendarID = function(calendarID, render) {
    render = util.isExisty(render) ? render : true;
    this._toggleEventsByCalendarID(calendarID, true, render);
};

/**
 * 주뷰, 월뷰 간 전환
 * @override
 * @param {string} viewName - 'week', 'month' 중 하나
 * @param {boolean} [force=false] - true 지정시 뷰 전환이 없어도 전환을 위한 동작을 수행한다
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
ServiceCalendar.prototype.toggleView = function(viewName, force, silent) {
    var layout = this.layout,
        controller = this.controller,
        dragHandler = this.dragHandler,
        options = this.options,
        created;

    if (!force && this.currentViewName === viewName) {
        return;
    }
    
    layout.childs.doWhenHas(viewName, function(view) {
        this._toggleViewEvent(false, view, this);
    }, this);
    layout.clear();

    if (viewName === 'week') {
        created = serviceWeekViewFactory(controller, layout.container, dragHandler, options);
        layout.addChild(created.view);
        this._refreshMethod = created.refresh;
    } else if (viewName === 'month') {
        //TODO: month view. 
    }

    layout.childs.doWhenHas(viewName, function(view) {
        this._toggleViewEvent(true, view, this);
    }, this);

    this.currentViewName = viewName;

    if (!silent) {
        this.render();
    }
};

module.exports = ServiceCalendar;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/datetime":27,"../../config":36,"../../controller/viewMixin/week":38,"../../factory/calendar":52,"../controller/base":39,"./weekView":41}],41:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Factory module for WeekView (customized for service)
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');
var VLayout = require('../../common/vlayout');

// Parent views
var Week = require('../../view/week/week');

// Sub views
var DayName = require('../../view/week/dayname');
var Milestone = require('../view/milestone');
var TaskView = require('../view/taskview');
var TimeGrid = require('../../view/week/timeGrid');
var Allday = require('../../view/week/allday');

// Handlers
var AlldayClick = require('../../handler/allday/click');
var AlldayCreation = require('../../handler/allday/creation');
var AlldayMove = require('../../handler/allday/move');
var AlldayResize = require('../../handler/allday/resize');
var TimeClick = require('../../handler/time/click');
var TimeCreation = require('../../handler/time/creation');
var TimeMove = require('../../handler/time/move');
var TimeResize = require('../../handler/time/resize');
var MilestoneClick = require('../handler/milestoneClick');
var TaskClick = require('../handler/taskClick');

// Base Templates
var weekViewTmpl = require('../../dooray/view/template/factory/weekView.hbs');

module.exports = function(baseController, layoutContainer, dragHandler, options) {
    var weekView,
        vlayoutContainer,
        vlayout,
        dayNameView,
        milestoneView,
        taskView,
        alldayView,
        timeGridView,
        milestoneClickHandler,
        taskClickHandler,
        alldayClickHandler,
        alldayCreationHandler,
        alldayMoveHandler,
        alldayResizeHandler,
        timeClickHandler,
        timeCreationHandler,
        timeMoveHandler,
        timeResizeHandler,

    weekView = new Week(null, options.week, layoutContainer);
    weekView.container.innerHTML = weekViewTmpl();

    /**********
     * 일자표기 (상단 일월화수...)
     **********/
    dayNameView = new DayName(null, domutil.find('.' + config.classname('dayname-layout'), weekView.container));
    weekView.addChild(dayNameView);

    /**********
     * 수직 레이아웃 모듈 초기화
     **********/
    vlayoutContainer = domutil.find('.' + config.classname('vlayout-area'), weekView.container);
    vlayoutContainer.style.height = (domutil.getSize(weekView.container)[1] - dayNameView.container.offsetHeight) + 'px';

    vlayout = new VLayout({
        panels: [
            {height: 56, minHeight: 56},
            {isSplitter: true},
            {height: 56, minHeight: 56},
            {isSplitter: true},
            {height: 68, minHeight: 68},
            {isSplitter: true},
            {autoHeight: true}
        ],
        panelHeights: options.week.panelHeights
    }, vlayoutContainer);
    weekView.vlayout = vlayout;

    /**********
     * 마일스톤
     **********/
    milestoneView = new Milestone(options.week, vlayout.panels[0].container);
    weekView.addChild(milestoneView);
    milestoneClickHandler = new MilestoneClick(dragHandler, milestoneView, baseController);

    /**********
     * 업무
     **********/
    taskView = new TaskView(options.week, vlayout.panels[2].container);
    weekView.addChild(taskView);
    taskClickHandler = new TaskClick(dragHandler, taskView, baseController);

    /**********
     * 종일일정
     **********/
    alldayView = new Allday(options.week, vlayout.panels[4].container);
    weekView.addChild(alldayView);
    alldayClickHandler = new AlldayClick(dragHandler, alldayView, baseController);
    alldayCreationHandler = new AlldayCreation(dragHandler, alldayView, baseController);
    alldayMoveHandler = new AlldayMove(dragHandler, alldayView, baseController);
    alldayResizeHandler = new AlldayResize(dragHandler, alldayView, baseController);

    /**********
     * 시간별 일정
     **********/
    timeGridView = new TimeGrid(options.week, vlayout.panels[6].container);
    weekView.addChild(timeGridView);
    timeClickHandler = new TimeClick(dragHandler, timeGridView, baseController);
    timeCreationHandler = new TimeCreation(dragHandler, timeGridView, baseController);
    timeMoveHandler = new TimeMove(dragHandler, timeGridView, baseController);
    timeResizeHandler = new TimeResize(dragHandler, timeGridView, baseController);

    weekView.on('afterRender', function() {
        vlayout.refresh();
    });

    weekView.handler = {
        click: {
            milestone: milestoneClickHandler,
            task: taskClickHandler,
            allday: alldayClickHandler,
            time: timeClickHandler
        },
        creation: {
            allday: alldayCreationHandler,
            time: timeCreationHandler
        },
        move: {
            allday: alldayMoveHandler,
            time: timeMoveHandler
        },
        resize: {
            allday: alldayResizeHandler,
            time: timeResizeHandler
        }
    };


    // add controller
    weekView.controller = baseController.Week;

    // add destroy
    weekView._beforeDestroy = function() {
        util.forEach(weekView.handlers, function(type) {
            util.forEach(type, function(handler) {
                handler.off();
                handler.destroy();
            });
        });

        weekView.off();
    };

    return {
        view: weekView,
        refresh: function() {
            vlayout.refresh();
        }
    };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/domutil":30,"../../common/vlayout":34,"../../config":36,"../../dooray/view/template/factory/weekView.hbs":51,"../../handler/allday/click":55,"../../handler/allday/creation":57,"../../handler/allday/move":59,"../../handler/allday/resize":61,"../../handler/time/click":64,"../../handler/time/creation":66,"../../handler/time/move":68,"../../handler/time/resize":70,"../../view/week/allday":85,"../../view/week/dayname":86,"../../view/week/timeGrid":88,"../../view/week/week":89,"../handler/milestoneClick":42,"../handler/taskClick":43,"../view/milestone":46,"../view/taskview":50}],42:[function(require,module,exports){
(function (global){
/**
 * @fileoverview 마일스톤 항목 클릭 이벤트 핸들러 모듈
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');

/**
 * 마일스톤 클릭 이벤트 핸들러 모듈
 * @constructor
 * @implelements {Handler}
 * @mixes util.CustomEvents
 * @param {Drag} dragHandler - dragHandler instance
 * @param {Milestone} milestoneView - milstone view instance
 * @param {Base} baseController - baseController instance
 */
function MilestoneClick(dragHandler, milestoneView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Milestone}
     */
    this.milestoneView = milestoneView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destroy
 */
MilestoneClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.dragHandler = this.milestoneView = this.baseController = null;
};

/**
 * @param {HTMLElement} target - check reponsibility to this handler module supplied element
 * @returns {boolean|string} return false when handler has no responsibility for supplied element. 
 * otherwise, return event model id that related with target element.
 */
MilestoneClick.prototype.checkExpectedCondition = function(target) {
    target = domutil.closest(target, '.' + config.classname('milestone-item'));
    
    if (!target) {
        return false;
    }

    return domutil.getData(target, 'id');
};

/**
 * @emits MilestoneClick#clickEvent
 * @param {object} clickEvent - click event object
 */
MilestoneClick.prototype._onClick = function(clickEvent) {
    var modelID = this.checkExpectedCondition(clickEvent.target);

    if (!modelID) {
        return;
    }

    this.baseController.events.doWhenHas(modelID, function(model) {
        /**
         * @events MilestoneClick#clickEvent
         * @type {object}
         * @property {CalEvent} model - model instance
         * @property {MouseEvent} jsEvent - MouseEvent object
         */
        this.fire('clickEvent', {
            model:  model,
            jsEvent: clickEvent.originEvent
        });
    }, this);
};

util.CustomEvents.mixin(MilestoneClick);

module.exports = MilestoneClick;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/domutil":30,"../../config":36}],43:[function(require,module,exports){
(function (global){
/**
 * @fileoverview 마일스톤 항목 클릭 이벤트 핸들러 모듈
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');

/**
 * 마일스톤 클릭 이벤트 핸들러 모듈
 * @constructor
 * @implelements {Handler}
 * @mixes util.CustomEvents
 * @param {Drag} dragHandler - dragHandler instance
 * @param {Task} taskView - milstone view instance
 * @param {Base} baseController - baseController instance
 */
function TaskClick(dragHandler, taskView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Task}
     */
    this.taskView = taskView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destroy
 */
TaskClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.dragHandler = this.taskView = this.baseController = null;
};

/**
 * @param {HTMLElement} target - check reponsibility to this handler module supplied element
 * @returns {boolean|string} return false when handler has no responsibility for supplied element. 
 * otherwise, return event model id that related with target element.
 */
TaskClick.prototype.checkExpectedCondition = function(target) {
    target = domutil.closest(target, '.' + config.classname('task-item'));

    if (!target) {
        return false;
    }

    return domutil.getData(target, 'id');
};

/**
 * @emits TaskClick#clickEvent
 * @param {object} clickEvent - click event object
 */
TaskClick.prototype._onClick = function(clickEvent) {
    var modelID = this.checkExpectedCondition(clickEvent.target);

    if (!modelID) {
        return;
    }

    this.baseController.events.doWhenHas(modelID, function(model) {
        /**
         * @events TaskClick#clickEvent
         * @type {object}
         * @property {CalEvent} model - model instance
         * @property {MouseEvent} jsEvent - MouseEvent object
         */
        this.fire('clickEvent', {
            model:  model,
            jsEvent: clickEvent.originEvent
        });
    }, this);
};

util.CustomEvents.mixin(TaskClick);

module.exports = TaskClick;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/domutil":30,"../../config":36}],44:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Extend model class for Dooray Calendar project.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var CalEvent = require('../../model/calEvent');

/**
 * 일정 카테고리
 * @readonly
 * @enum {string}
 */
var EVENT_CATEGORY = {
    /** 마일스톤 */
    MILESTONE: 'milestone',

    /** 업무 */
    TASK: 'task',
    
    /** 종일일정 */
    ALLDAY: 'allday',

    /** 시간별 일정 */
    TIME: 'time'
};

/**
 * CalEvent class for dooray project
 * @constructor
 * @extends {CalEvent}
 */
function DoorayEvent() {
    CalEvent.call(this);

    /**
     * 캘린더 ID
     * @type {string}
     */
    this.calendarID = '';

    /**
     * 일정 카테고리 (마일스톤, 업무, 종일일정, 시간별일정)
     * @type {string}
     */
    this.category = '';

    /**
     * 업무 일정의 경우 구분 (출근전, 점심전, 퇴근전)
     * @type {string}
     */
    this.dueDateClass = '';

    /**
     * 일정 노출 여부
     * @type {boolean}
     */
    this.visible = true;

    /**
     * 렌더링과 관계 없는 별도 데이터 저장 공간.
     * @type {object}
     */
    this.raw = null;
}

util.inherit(DoorayEvent, CalEvent);

/**
 * @override
 */
DoorayEvent.create = function(data) {
    var inst = new DoorayEvent();
    inst.init(data);

    return inst;
};

/**
 * @override
 * @param {object} options options.
 */
DoorayEvent.prototype.init = function(options) {
    options = options || {};

    CalEvent.prototype.init.call(this, options);

    this.isAllDay = options.category === EVENT_CATEGORY.ALLDAY;
    this.calendarID = options.calendarID;
    this.category = options.category;
    this.dueDateClass = options.dueDateClass;
    this.visible = util.isExisty(options.visible) ? options.visible : true;

    if (options.category === EVENT_CATEGORY.MILESTONE ||
        options.category === EVENT_CATEGORY.TASK) {
        this.starts = new Date(+this.ends);
        this.starts.setMinutes(this.starts.getMinutes() - 30);
    }

    this.raw = options.raw || null;
};

module.exports = DoorayEvent;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../model/calEvent":72}],45:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "milestone-day\" style=\"width:"
    + alias4(alias5(((stack1 = (data && data.root)) && stack1.width), depth0))
    + "%;left:"
    + alias4((helpers.multiply || (depth0 && depth0.multiply) || alias2).call(alias1,((stack1 = (data && data.root)) && stack1.width),(data && data.index),{"name":"multiply","hash":{},"data":data}))
    + "%;min-height:"
    + alias4(alias5(((stack1 = (data && data.root)) && stack1.height), depth0))
    + "px\">\n    <ul class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "milestone-list\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "<li data-id=\""
    + alias3((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\" \n        data-title=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.title : stack1), depth0))
    + "\" \n        class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "milestone-item\" \n        style=\"line-height:"
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.lineHeight), depth0))
    + "px;color:"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "\">"
    + ((stack1 = (helpers["milestone-tmpl"] || (depth0 && depth0["milestone-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"milestone-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "milestone-left\">\n    <span>마일스톤</span>\n</div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "milestone-right "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "clear\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.events : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

},{"hbsfy/runtime":21}],46:[function(require,module,exports){
(function (global){
/**
 * @fileoverview 마일스톤 뷰
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var View = require('../../view/view');
var tmpl = require('./milestone.hbs');

var PADDING_TOP = 2,
    PADDING_BOTTOM = 2;

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options
 * @param {string} options.renderStartDate - start date of allday view's render date. YYYY-MM-DD
 * @param {string} options.renderEndDate - end date of allday view's render date. YYYY-MM-DD
 * @param {number} [options.minHeight=52] - min-height of milestone view 
 * @param {number} [options.lineHeight=12] - line height of milestone view
 * @param {HTMLElement} container - container element
 */
function Milestone(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('milestone-container')
    );

    View.call(this, container);

    /**
     * @type {object}
     */
    this.options = util.extend({
        renderStartDate: '',
        renderEndDate: '',
        minHeight: 52,
        lineHeight: 12
    }, options);
}

util.inherit(Milestone, View);

/**
 * Get base viewmodel for task view
 * @param {object} [viewModel] - view model from parent view
 * @returns {object} view model for task view
 */
Milestone.prototype._getBaseViewModel = function(viewModel) {
    var options = this.options,
        events = {},
        range = datetime.range(
            datetime.start(datetime.parse(options.renderStartDate)),
            datetime.end(datetime.parse(options.renderEndDate)),
            datetime.MILLISECONDS_PER_DAY
        ),
        height;

    // 일정이 없는 경우라도 빈 객체를 생성
    util.forEach(range, function(d) {
        events[datetime.format(d, 'YYYY-MM-DD')] = {length: 0};
    });

    util.extend(events, viewModel);

    height = Math.max.apply(null, util.map(events, function(coll) {
        return coll.length;
    })) * options.lineHeight;

    height = Math.max(options.minHeight, height);

    return {
        events: events,
        width: 100 / range.length,
        minHeight: options.minHeight,
        height: height + PADDING_TOP + PADDING_BOTTOM,
        lineHeight: options.lineHeight
    };
};

/**
 * 마일스톤 뷰 렌더링
 * @override
 */
Milestone.prototype.render = function(viewModel) {
    var container = this.container,
        baseViewModel = this._getBaseViewModel(util.pick(viewModel.eventsInDateRange, 'milestone'));

    container.style.minHeight = this.options.minHeight + 'px';
    container.innerHTML = tmpl(baseViewModel);

    util.forEach(domutil.find('li', container, true), function(el) {
        if (el.offsetWidth < el.scrollWidth) {
            el.setAttribute('title', domutil.getData(el, 'title'));
        }
    });
};

module.exports = Milestone;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/datetime":27,"../../common/domutil":30,"../../config":36,"../../view/view":84,"./milestone.hbs":45}],47:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    return "<th>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</th>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<tr>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</tr>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<td class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-"
    + alias4(((helper = (helper = helpers.ymd || (depth0 != null ? depth0.ymd : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ymd","hash":{},"data":data}) : helper)))
    + " \n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isNotThisMonth : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.today : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasSchedule : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.weekend : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n<button type=\"button\" tabindex=\"-1\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-date\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-label\"><span>"
    + alias4(((helper = (helper = helpers.d || (depth0 != null ? depth0.d : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"d","hash":{},"data":data}) : helper)))
    + "</span></div>\n</button>\n</td>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-other ";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-focused ";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-today ";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-has-schedule ";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-weekend ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<table>\n<caption>\n    <button type=\"button\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-nav "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-prev\"><span>&lt;</span></button>\n    <span class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n    <button type=\"button\" class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-nav "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "minicalendar-next\"><span>&gt;</span></button>\n</caption>\n<thead><tr>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.dayname : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</tr></thead>\n<tbody>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.calendar : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</tbody>\n</table>\n";
},"useData":true});

},{"hbsfy/runtime":21}],48:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Minicalendar view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var View = require('../../view/view');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var datetime = require('../../common/datetime');
var tmpl = require('./minicalendar.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for minicalendar view
 *  @param {number} [options.startDayOfWeek=0] - start day of week. default 0 (sunday)
 *  @param {string|Date} [options.renderMonth] - month to render
 *  @param {string[]} [options.highlightDate] - dates to highlight
 *  @param {string[]} [options.daynames] - array of each days name.
 * @param {HTMLDivElement} container - element to use container
 */
function MiniCalendar(options, container) {
    var today = datetime.start(new Date());

    if (!(this instanceof MiniCalendar)) {
        return new MiniCalendar(options, container);
    }

    View.call(this, container);
    domutil.addClass(container, config.classname('minicalendar'));
    domevent.on(this.container, 'click', this._onClick, this);

    /**
     * @type {object}
     */
    options = this.options = util.extend({
        startDayOfWeek: 0,
        renderMonth: new Date(+today),
        highlightDate: [],
        daynames: ['일', '월', '화', '수', '목', '금', '토']
    }, options);

    // parse renderMonth options if it is an string
    if (util.isString(options.renderMonth)) {
        options.renderMonth = datetime.start(datetime.parse(options.renderMonth));
    }

    /**
     * 일자 강조 데이터
     * @type {object}
     */
    this.hlData = {};
    if (options.highlightDate.length) {
        this.highlightDate(options.highlightDate);
    }

    this.render();
}

util.inherit(MiniCalendar, View);

/**
 * Next, Prev button event handler
 * @fires Minicalendar#change
 * @param {HTMLButtonElement} buttonElement - next, prev button from _onClick event handler
 */
MiniCalendar.prototype._nav = function(buttonElement) {
    var isNext = domutil.hasClass(buttonElement, config.classname('minicalendar-next')),
        options = this.options,
        offset = isNext ? 1 : -1,
        eventData = {
            before: this.getSelectedDate()
        };

    options.renderMonth.setMonth(options.renderMonth.getMonth() + offset);

    this.render();

    eventData.after = this.getSelectedDate();

    /**
     * @event MiniCalendar#change
     * @type {object}
     * @property {Date} before - the date of before changed
     * @property {Date} after - the date of after changed
     */
    this.fire('change', eventData);
};

/**
 * Date button event handler
 * @fires Minicalendar#change
 * @param {HTMLButtonElement} buttonElement - date button from _onClick event handler
 */
MiniCalendar.prototype._date = function(buttonElement) {
    var td = domutil.closest(buttonElement, 'td'),
        today = (new Date()),
        previous,
        selected,
        eventData = {
            before: this.getSelectedDate()
        };

    if (td) {
        previous = domutil.find('.' + config.classname('minicalendar-focused'), this.container);

        if (previous) {
            domutil.removeClass(previous, config.classname('minicalendar-focused'));
        }

        domutil.addClass(td, config.classname('minicalendar-focused'));

        selected = this.getSelectedDate();

        if (datetime.isSameDate(selected, today)) {
            domutil.addClass(td, config.classname('minicalendar-today'));
        }

        eventData.after = selected;

        /**
         * @event MiniCalendar#change
         * @type {object}
         * @property {Date} before - the date of before changed
         * @property {Date} after - the date of after changed
         */
        this.fire('change', eventData);
    }
};

/**
 * Click event handler
 * @param {MouseEvent} clickEvent - click mouse event object
 */
MiniCalendar.prototype._onClick = function(clickEvent) {
    var target = clickEvent.srcElement || clickEvent.target,
        button = domutil.closest(target, 'button');

    if (!button) {
        return;
    }

    if (domutil.hasClass(button, config.classname('minicalendar-date'))) {
        this._date(button);
        return;
    }

    if (domutil.hasClass(button, config.classname('minicalendar-nav'))) {
        this._nav(button);
        return;
    }
};

/**
 * Get selected data
 * @returns {Date} selected date
 */
MiniCalendar.prototype.getSelectedDate = function() {
    var selected = domutil.find('.' + config.classname('minicalendar-focused'), this.container),
        matches;

    if (!selected) {
        return null;
    }

    matches = selected.className.match(config.minicalendar.getDataRegExp);

    if (!matches || matches.length < 2) {
        return;
    }

    return datetime.parse(matches[1]);
};

/**
 * select specific date.
 * @param {Date|string} date - date to select
 */
MiniCalendar.prototype.selectDate = function(date) {
    var _date, td, button;

    if (util.isString(date)) {
        date = datetime.parse(date);
    }

    _date = datetime.format(date, 'YYYY-MM-DD');
    td = domutil.find('.' + config.classname('minicalendar-') + _date, this.container);
    button = domutil.find('button', td);

    if (!td || !button) {
        return;
    }

    this._date(button);
};

/**
 * Get minicalendar view model
 * @param {Date} renderDate - Date to render minicalendar
 * @param {number} startDayOfWeek - number of start of week (0:sun ...)
 * @returns {object} viewmodel
 */
MiniCalendar.prototype._getViewModel = function(renderDate, startDayOfWeek) {
    var daynames = this.options.daynames,
        hlData = this.hlData,
        today = datetime.start(new Date()),
        isCurrentMonth = datetime.isSameMonth(renderDate, today),
        viewModel = {
            title: datetime.format(renderDate, 'YYYY.MM'),
            startDayOfWeek: startDayOfWeek
        };

    viewModel.dayname = util.map(
        util.range(startDayOfWeek, 7).concat(util.range(7)).slice(0, 7),
        function(i) { return daynames[i]; } 
    );

    viewModel.calendar = datetime.arr2dCalendar(renderDate, startDayOfWeek, function(date) {
        var d = date.getDate(),
            ymd = datetime.format(date, 'YYYY-MM-DD'),
            day = date.getDay(),
            selected = false,
            isToday = datetime.isSameDate(date, today),
            dateIsInThisMonth = datetime.isSameMonth(date, renderDate);

        if (dateIsInThisMonth) {
            if (isCurrentMonth) {
                if (isToday) {
                    selected = true;
                    isToday = true;
                }
            } else if (d === 1) {
                selected = true;
            }
        }

        return {
            d: d,
            ymd: ymd,
            hasSchedule: hlData[ymd],
            isNotThisMonth: !dateIsInThisMonth,
            weekend: (day === 0 || day === 6),
            selected: selected,
            today: isToday
        };
    });

    return viewModel;
};

/**
 * Render view
 */
MiniCalendar.prototype.render = function() {
    var container = this.container,
        options = this.options,
        renderDate = options.renderMonth,
        startDayOfWeek = options.startDayOfWeek,
        viewModel;

    viewModel = this._getViewModel(renderDate, startDayOfWeek);

    container.innerHTML = tmpl(viewModel);
};

/**
 * Cache data for highlight specific dates in calendar.
 * @param {string[]} dateStrList - the array of dates to highlight. (YYYY-MM-DD)
 * @param {boolean} [silent=false] - set true for prevent auto rendering.
 */
MiniCalendar.prototype.highlightDate = function(dateStrList, silent) {
    var ownData = this.hlData;

    util.forEach(dateStrList, function(ymd) {
        ownData[ymd] = true;
    });

    if (!silent) {
        this.render();
    }
};

/**
 * Clear cached data for highlighting specific date for represent the date has schedule.
 * @param {boolean} [silent=false] - set true for prevent auto rendering.
 */
MiniCalendar.prototype.clearHighlightDate = function(silent) {
    delete this.hlData;
    this.hlData = {};

    if (!silent) {
        this.render();
    }
};

util.CustomEvents.mixin(MiniCalendar);

module.exports = MiniCalendar;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/datetime":27,"../../common/domevent":29,"../../common/domutil":30,"../../config":36,"../../view/view":84,"./minicalendar.hbs":47}],49:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "task-day\" style=\"width:"
    + alias4(alias5(((stack1 = (data && data.root)) && stack1.width), depth0))
    + "%;left:"
    + alias4((helpers.multiply || (depth0 && depth0.multiply) || alias2).call(alias1,((stack1 = (data && data.root)) && stack1.width),(data && data.index),{"name":"multiply","hash":{},"data":data}))
    + "%;min-height:"
    + alias4(alias5(((stack1 = (data && data.root)) && stack1.height), depth0))
    + "px\">\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "task-day-wrap\">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.morning : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.lunch : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.evening : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "task-duedate-class\" style=\"line-height:"
    + alias4(container.lambda(((stack1 = (data && data.root)) && stack1.lineHeight), depth0))
    + "px\"><strong>출근 전</strong></div>\n    <ul class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "task-list\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.morning : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "<li data-id=\""
    + alias3((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\" \n        data-title=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.title : stack1), depth0))
    + "\" \n        class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "task-item\" \n        style=\"line-height:"
    + alias3(alias4(((stack1 = (data && data.root)) && stack1.lineHeight), depth0))
    + "px;color:"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + "\">"
    + ((stack1 = (helpers["task-tmpl"] || (depth0 && depth0["task-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"task-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "task-duedate-class\" style=\"line-height:"
    + alias4(container.lambda(((stack1 = (data && data.root)) && stack1.lineHeight), depth0))
    + "px\"><strong>점심 전</strong></div>\n    <ul class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "task-list\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.lunch : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "task-duedate-class\" style=\"line-height:"
    + alias4(container.lambda(((stack1 = (data && data.root)) && stack1.lineHeight), depth0))
    + "px\"><strong>퇴근 전</strong></div>\n    <ul class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "task-list\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.evening : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "task-left\">\n    <span>"
    + ((stack1 = ((helper = (helper = helpers["taskTitle-tmpl"] || (depth0 != null ? depth0["taskTitle-tmpl"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taskTitle-tmpl","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span>\n</div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "task-right schedule-view clear\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.events : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

},{"hbsfy/runtime":21}],50:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Task view for upper area of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var View = require('../../view/view');
var tmpl = require('./taskview.hbs');

var PADDING_TOP = 2,
    PADDING_BOTTOM = 2;

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for TaskView
 * @param {string} options.renderStartDate - start date of allday view's render date. YYYY-MM-DD
 * @param {string} options.renderEndDate - end date of allday view's render date. YYYY-MM-DD
 * @param {number} [options.minHeight=52] - min-height of taskview
 * @param {number} [options.lineHeight=12] - line height of milestone view
 * @param {HTMLElement} container - container element
 */
function TaskView(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('task-container')
    );

    View.call(this, container);

    /**
     * @type {object}
     */
    this.options = util.extend({
        renderStartDate: '',
        renderEndDate: '',
        minHeight: 52,
        lineHeight: 12
    }, options);
}

util.inherit(TaskView, View);

/**
 * Get base viewmodel for task view
 * @param {object} [viewModel] - view model from parent view
 * @returns {object} view model for task view
 */
TaskView.prototype._getBaseViewModel = function(viewModel) {
    var options = this.options,
        events = {},
        range = datetime.range(
            datetime.start(datetime.parse(options.renderStartDate)),
            datetime.end(datetime.parse(options.renderEndDate)),
            datetime.MILLISECONDS_PER_DAY
        ),
        height = 0,
        mmax = Math.max;

    util.forEach(range, function(d) {
        events[datetime.format(d, 'YYYY-MM-DD')] = {morning: {length: 0}, lunch: {length: 0}, evening: {length: 0}};
    });

    util.extend(events, viewModel);

    // (출근전, 점심전, 퇴근전 항목 수 * 12px) + (각 항목의 아이템 수 * 12px)
    height = mmax.apply(null, util.map(events, function(g) {
        var subcount = util.keys(g).length;

        util.forEach(g, function(coll) {
            subcount += coll.length;
        });

        return subcount;
    })) * options.lineHeight;

    height = mmax(options.minHeight, height);

    return {
        events: events,
        width: 100 / range.length,
        height: height + PADDING_TOP + PADDING_BOTTOM,
        lineHeight: options.lineHeight
    };
};

/**
 * 업무 뷰 렌더링
 * @override
 */
TaskView.prototype.render = function(viewModel) {
    var container = this.container,
        baseViewModel = this._getBaseViewModel(util.pick(viewModel.eventsInDateRange, 'task'));

    container.innerHTML = tmpl(baseViewModel);

    util.forEach(domutil.find('li', container, true), function(el) {
        if (el.offsetWidth < el.scrollWidth) {
            el.setAttribute('title', domutil.getData(el, 'title'));
        }
    });
};

module.exports = TaskView;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/datetime":27,"../../common/domutil":30,"../../config":36,"../../view/view":84,"./taskview.hbs":49}],51:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dayname-layout\"></div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "vlayout-area\"></div>\n";
},"useData":true});

},{"hbsfy/runtime":21}],52:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Factory module for control all other factory.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../config');
var common = require('../common/common');
var datetime = require('../common/datetime');
var Layout = require('../view/layout');
var Drag = require('../handler/drag');
var controllerFactory = require('./controller');
var weekViewFactory = require('./weekView');
var Handlebars = require('hbsfy/runtime');

/**
 * @typedef {object} Calendar~CalEvent
 * @property {string} title - 이벤트 제목
 * @property {boolean} isAllDay - 종일일정여부
 * @property {string} starts - 일정 시작 시간
 * @property {string} ends - 일정 종료 시간
 * @property {string} [color] - 일정 텍스트색
 * @property {string} [bgColor] - 일정 배경색
 */

/**
 * Calendar class
 * @constructor
 * @mixes util.CustomEvents
 * @param {object} options - options for calendar
 *  @param {function} [options.groupFunc] - function for group event models {@see Collection#groupBy}
 *  @param {function} [options.controller] - controller instance
 *  @param {string} [options.defaultView='week'] - default view of calendar
 *  @param {object} [options.template] - template option
 *   @param {function} [options.template.allday] - allday template function
 *   @param {function} [options.template.time] - time template function
 *  @param {object} [options.week] - options for week view
 *   @param {number} [options.week.startDayOfWeek=0] - start day of week
 *   @param {string} options.week.renderStartDate - YYYY-MM-DD render start date
 *   @param {string} options.week.renderEndDate - YYYY-MM-DD render end date
 *  @param {object} [options.month] - options for month view
 *   @param {string} options.month.renderMonth - YYYY-MM render month
 *  @param {Calendar~CalEvent[]} [options.events] - array of CalEvent data for add calendar after initialize.
 * @param {HTMLDivElement} container = container element for calendar
 */
function Calendar(options, container) {
    if (!(this instanceof Calendar)) {
        return new Calendar(options, container);
    }

    /**
     * base date of view (today() will use this property)
     * @type {Date}
     */
    this.baseDate = datetime.start(new Date());

    /**
     * default option from service page
     * @type {object}
     */
    this.options = this.setOptions(options);

    /**
     * original options for reference when ui reset
     * @type {object}
     */
    this.originOptions = JSON.parse(JSON.stringify(this.options));

    /**
     * base controller
     * @type {Base}
     */
    this.controller = options.controller || controllerFactory(options);

    /**
     * layout view (layout manager)
     * @type {Layout}
     */
    this.layout = new Layout(container);

    /**
     * global drag handler
     * @type {Drag}
     */
    this.dragHandler = new Drag({
        distance: 5
    }, this.layout.container);


    /**
     * current rendered view name.
     * @type {string}
     */
    this.currentViewName = options.defaultView || 'week';

    /**********
     * SETTING
     **********/
    this.layout.controller = this.controller;

    function refresh() {
        this.refreshChildView();
    }

    this.controller.on({
        updateEvent: refresh,
        createdEvent: refresh
    }, this);

    if (options.events && options.events.length) {
        this.createEvents(options.events, true);
    }

    /**
     * @type {Date}
     */
    this._currentStartDate = null;

    /**
     * @type {Date}
     */
    this._currentEndDate = null;

    /**
     * @type {function}
     */
    this._refreshMethod = null;

    this.initializeView();
}

/**********
 * CRUD Methods
 **********/

/**
 * Create events instance and render calendar.
 * @param {Calendar~Event[]} dataObjectList - array of {@see Calendar~Event} object
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
Calendar.prototype.createEvents = function(dataObjectList, silent) {
    this.controller.createEvents(dataObjectList, silent);

    if (!silent) {
        this.render();
    }
};

/**
 * Get event instance by event id
 * @param {string} id - ID of event instance
 * @returns {CalEvent} event instance
 */
Calendar.prototype.getEvent = function(id) {
    return util.pick(this.controller.events.items, id);
};

/**
 * Update event instance
 * @param {string} id - ID of event instance to update data
 * @param {object} data - object data to update instance
 */
Calendar.prototype.updateEvent = function(id, data) {
    var found;

    this.controller.events.doWhenHas(id, function(model) {
        found = model;
        util.forEach(data, function(value, key) {
            model.set(key, value);
        });
    });

    this.render();
    found.dirty(false);
};

/**
 * Delete event instance
 * @param {string} id - ID of event instance to delete
 */
Calendar.prototype.deleteEvent = function(id) {
    this.controller.events.remove(id);
    this.render();
};

/**********
 * Private Methods
 **********/

/**
 * Set child view's options recursively
 * @param {View} view - parent view
 * @param {function} func - option manipulate function
 * @private
 */
Calendar.prototype._setOptionRecurseively = function(view, func) {
    view.recursive(function(childView) {
        var opt = childView.options;

        if (!opt) {
            return;
        }

        func(opt);
    });
};

/**
 * @param {string|Date} date - date to show in calendar
 * @param {number} [startDayOfWeek=0] - start day of week
 * @return {array} render range
 * @private
 */
Calendar.prototype._getWeekRenderRange = function(date, startDayOfWeek) {
    var day, start, end;

    date = util.isDate(date) ? date : new Date(date);
    startDayOfWeek = (startDayOfWeek || 0);
    day = date.getDay();

    function mil(d) {
        return datetime.MILLISECONDS_PER_DAY * d;
    }

    // calculate default render range first.
    start = new Date(+date - mil(day) + mil(startDayOfWeek));
    end = new Date(+start + mil(6));

    if (day < startDayOfWeek) {
        start = new Date(+start - mil(7));
        end = new Date(+end - mil(7));
    }

    return [start, end];
};

/**********
 * General Methods
 **********/

/**
 * Delete all data and clear view.
 */
Calendar.prototype.clear = function() {
    this.controller.dateMatrix = {};
    this.controller.events.clear();
    this.render();
};

/**
 * Render calendar.
 */
Calendar.prototype.render = function() {
    this.layout.render();
};

/**
 * Refresh calendar layout.
 */
Calendar.prototype.refresh = function() {
    if (this._refreshMethod) {
        this._refreshMethod();
    }
};

/**
 * Initialize current view.
 */
Calendar.prototype.initializeView = function() {
    var currentViewName = this.currentViewName,
        options;

    this.toggleView(currentViewName, true, true);

    if (this.currentViewName === 'week') {
        options = this.options.week;
        this.setDate(options.renderStartDate, options.renderEndDate);
    } else {
        //TODO: month view.
    }
};

/**
 * Set calendar's render date range and refresh view
 * @param {string|Date} start - start date of render
 * @param {string|Date} end - end date of render
 */
Calendar.prototype.setDate = function(start, end) {
    var ymd = 'YYYY-MM-DD';
    start = util.isDate(start) ? start : new Date(start);

    if (this.currentViewName === 'week') {
        if (!end) {
            config.throwError('Calendar#setDate() Need 2 parameter (start, end) in "week" view.');
            return;
        }
        end = util.isDate(end) ? end : new Date(end);

        this._currentStartDate = new Date(+start);
        this._currentEndDate = new Date(+end);

        start = datetime.format(start, ymd);
        end = datetime.format(end, ymd);

        this._setOptionRecurseively(this.getCurrentView(), function(viewOption) {
            viewOption.renderStartDate = start;
            viewOption.renderEndDate = end;
        });
    } else {
        //TODO: month view.
    }

    this.refreshChildView(this.currentViewName);
};

/**
 * Move current render range to range that include supplied date
 * @param {string|Date} date - date to show
 */
Calendar.prototype.showDate = function(date) {
    var options = this.options;

    date = util.isDate(date) ? date : new Date(date);

    if (this.currentViewName === 'week') {
        this.setDate.apply(this, this._getWeekRenderRange(date, options.startDayOfWeek));
    } else {
        //TODO: month view.
    }
};

/**
 * Move to today.
 */
Calendar.prototype.today = function() {
    this.showDate(new Date());
};

/**
 * Move the calendar amount of offset value
 * @param {number} offset - offset value.
 * @example
 * // move previous week when "week" view.
 * // move previous month when "month" view.
 * calendar.move(-1);
 */
Calendar.prototype.move = function(offset) {
    var start = this._currentStartDate,
        end = this._currentEndDate,
        diff;

    if (this.currentViewName === 'week') {
        diff = ((end - start) + datetime.MILLISECONDS_PER_DAY) * (offset || 0);

        start = new Date(+start + diff);
        end = new Date(+end + diff);

        this.setDate(start, end);
    } else {
        //TODO: month view.
    }
};

/**
 * Move the calendar forward an arvitrary amount of unit
 */
Calendar.prototype.next = function() {
    this.move(1);
};

/**
 * Move the calendar backward an arvitrary amount of unit
 */
Calendar.prototype.prev = function() {
    this.move(-1);
};

/**
 * Return current rendered view.
 * @returns {View} current view instance
 */
Calendar.prototype.getCurrentView = function() {
    return util.pick(this.layout.childs.items, this.currentViewName);
}

/**
 * Toggle current view
 * @param {string} viewName - the name of view.
 * @param {boolean} force - force render despite of current view and new view are equal
 */
Calendar.prototype.toggleView = function(viewName, force) {
    var layout = this.layout,
        controller = this.controller,
        dragHandler = this.dragHandler,
        options = this.options,
        created;

    if (!force && this.currentViewName === viewName) {
        return;
    }

    this.currentViewName = viewName;
    layout.clear();

    if (viewName === 'week') {
        created = weekViewFactory(controller, layout.container, dragHandler, options);
        layout.addChild(created.view);
        this._refreshMethod = created.refresh;
    }
}

/**
 * Destroy calendar instance.
 */
Calendar.prototype.destroy = function() {
    this.dragHandler.destroy();
    this.controller.off();
    this.layout.clear();
    this.layout.destroy();

    this.options = this.baseDate = this.controller =
        this.layout = this.dragHandler = null;
}

/**
 * Refresh child views
 * @param {string} [viewName] - the name of view to render. if not supplied then refresh all.
 */
Calendar.prototype.refreshChildView = function(viewName) {
    if (!viewName) {
        this.render();
        return;
    }

    this.layout.childs.items[viewName].render();
};

/**
 * Create default option
 * @param {object} options - option from service page
 * @returns {object} default option. 
 */
Calendar.prototype.setOptions = function(options) {
    var today = this.baseDate,
        ymd = 'YYYY-MM-DD',
        renderRange,
        weekOpt = options.week,
        tmplOpt = options.template;

    options = util.extend({
        defaultView: 'week',    // 기본 주간 뷰 설정
        week: null,
        month: null 
    }, options);

    weekOpt = options.week = util.extend({
        startDayOfWeek: 0
    }, options.week);

    if (!weekOpt.renderStartDate || !weekOpt.renderEndDate) {
        renderRange = this._getWeekRenderRange(new Date(), weekOpt.startDayOfWeek);
        weekOpt.renderStartDate = datetime.format(renderRange[0], ymd);
        weekOpt.renderEndDate = datetime.format(renderRange[1], ymd);
    }

    if (!options.month) {
        options.month = {
            renderMonth: datetime.format(today, 'YYYY-MM')
        };
    }

    util.forEach(tmplOpt, function(func, name) {
        Handlebars.registerHelper(name + '-tmpl', func);
    });

    return options;
};

util.CustomEvents.mixin(Calendar);

module.exports = Calendar;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/common":26,"../common/datetime":27,"../config":36,"../handler/drag":63,"../view/layout":74,"./controller":53,"./weekView":54,"hbsfy/runtime":21}],53:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Controller factory module.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Base = require('../controller/base');
var Week = require('../controller/viewMixin/week');

/**
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @returns {Base} The controller instance.
 */
module.exports = function(options) {
    var controller = new Base(options);

    controller.Week = {};
    util.forEach(Week, function(method, methodName) {
        controller.Week[methodName] = util.bind(method, controller);
    });

    return controller;
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../controller/base":37,"../controller/viewMixin/week":38}],54:[function(require,module,exports){
/**
 * @fileoverview Factory module for WeekView
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var config = require('../config');
var domutil = require('../common/domutil');
var VLayout = require('../common/vlayout');
// Parent views
var Week = require('../view/week/week');
// Sub views
var DayName = require('../view/week/dayname');
var TimeGrid = require('../view/week/timeGrid');
var Allday = require('../view/week/allday');
// Handlers
var AlldayClick = require('../handler/allday/click');
var AlldayCreation = require('../handler/allday/creation');
var AlldayMove = require('../handler/allday/move');
var AlldayResize = require('../handler/allday/resize');
var TimeClick = require('../handler/time/click');
var TimeCreation = require('../handler/time/creation');
var TimeMove = require('../handler/time/move');
var TimeResize = require('../handler/time/resize');
// Base Templates
var weekViewTmpl = require('../view/template/factory/weekView.hbs');

module.exports = function(baseController, layoutContainer, dragHandler, options) {
    var weekView,
        vlayoutContainer,
        vlayout,
        dayNameView,
        alldayView,
        timeGridView,
        alldayClickHandler,
        alldayCreationHandler,
        alldayMoveHandler,
        alldayResizeHandler,
        timeClickHandler,
        timeCreationHandler,
        timeMoveHandler,
        timeResizeHandler;

    weekView = new Week(null, options.week, layoutContainer);
    weekView.container.innerHTML = weekViewTmpl();

    /**********
     * 일자표기 (상단 일월화수...)
     **********/
    dayNameView = new DayName(null, domutil.find('.' + config.classname('dayname-layout'), weekView.container));
    weekView.addChild(dayNameView);

    /**********
     * 수직 레이아웃 모듈 초기화
     **********/
    vlayoutContainer = domutil.find('.' + config.classname('vlayout-area'), weekView.container);
    vlayoutContainer.style.height = (domutil.getSize(weekView.container)[1] - dayNameView.container.offsetHeight) + 'px';

    vlayout = new VLayout({
        panels: [
            {height: 52, minHeight: 52},
            {isSplitter: true},
            {autoHeight: true}
        ]
    }, vlayoutContainer);

    /**********
     * 종일일정
     **********/
    alldayView = new Allday(options.week, vlayout.panels[0].container);
    weekView.addChild(alldayView);
    alldayClickHandler = new AlldayClick(dragHandler, alldayView, baseController);
    alldayCreationHandler = new AlldayCreation(dragHandler, alldayView, baseController);
    alldayMoveHandler = new AlldayMove(dragHandler, alldayView, baseController);
    alldayResizeHandler = new AlldayResize(dragHandler, alldayView, baseController);

    /**********
     * 시간별 일정
     **********/
    timeGridView = new TimeGrid(options.week, vlayout.panels[2].container);
    weekView.addChild(timeGridView);
    timeClickHandler = new TimeClick(dragHandler, timeGridView, baseController);
    timeCreationHandler = new TimeCreation(dragHandler, timeGridView, baseController);
    timeMoveHandler = new TimeMove(dragHandler, timeGridView, baseController);
    timeResizeHandler = new TimeResize(dragHandler, timeGridView, baseController);

    weekView.on('afterRender', function() {
        vlayout.refresh();
    });

    weekView.handlers = {
        click: {
            allday: alldayClickHandler,
            time: timeClickHandler
        },
        creation: {
            allday: alldayCreationHandler,
            time: timeCreationHandler
        },
        move: {
            allday: alldayMoveHandler,
            time: timeMoveHandler
        },
        resize: {
            allday: alldayResizeHandler,
            time: timeResizeHandler
        }
    };

    // add controller
    weekView.controller = baseController.Week;

    // add destroy
    weekView._beforeDestroy = function() {
        util.forEach(weekView.handlers, function(type) {
            util.forEach(type, function(handler) {
                handler.off();
                handler.destroy();
            });
        });
    };

    return {
        view: weekView,
        refresh: function() {
            vlayout.refresh();
        }
    };
};

},{"../common/domutil":30,"../common/vlayout":34,"../config":36,"../handler/allday/click":55,"../handler/allday/creation":57,"../handler/allday/move":59,"../handler/allday/resize":61,"../handler/time/click":64,"../handler/time/creation":66,"../handler/time/move":68,"../handler/time/resize":70,"../view/template/factory/weekView.hbs":76,"../view/week/allday":85,"../view/week/dayname":86,"../view/week/timeGrid":88,"../view/week/week":89}],55:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Click handle module for allday events
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');
var AlldayMove = require('./move');

/**
 * @constructor
 * @implements {Handler}
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - MonthWeek view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayClick(dragHandler, alldayView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Allday}
     */
    this.alldayView = alldayView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destroy handler module
 */
AlldayClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.alldayView = this.baseController = this.dragHandler = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {string} - model id
 */
AlldayClick.prototype.checkExpectCondition = AlldayMove.prototype.checkExpectedCondition;

/**
 * Click event handler
 * @param {object} clickEvent - click event data
 * @emits AlldayClick#clickEvent
 */
AlldayClick.prototype._onClick = function(clickEvent) {
    var target = clickEvent.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, '.' + config.classname('allday-event-block')),
        eventCollection = this.baseController.events;

    if (!timeView || !blockElement) {
        return;
    }

    eventCollection.doWhenHas(domutil.getData(blockElement, 'id'), function(model) {
        /**
         * @events AlldayClick#clickEvent
         * @type {object}
         * @property {CalEvent} model - model instance
         * @property {MouseEvent} jsEvent - MouseEvent object
         */
        this.fire('clickEvent', {
            model:  model,
            jsEvent: clickEvent.originEvent
        });
    }, this);
};

util.CustomEvents.mixin(AlldayClick);

module.exports = AlldayClick;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/domutil":30,"../../config":36,"./move":59}],56:[function(require,module,exports){
/**
 * @fileoverview Base mixin object for handler/allday
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var datetime = require('../../common/datetime');
var common = require('../../common/common');

var mmax = Math.max,
    mmin = Math.min,
    CONTAINER_PADDING_LEFT = 60;

/**
 * @mixin Allday.Core
 */
var alldayCore = {
    /**
     * @param {Allday} alldayView - view instance of allday.
     * @param {MouseEvent} mouseEvent - mouse event object.
     * @returns {function} function that return event data by mouse events.
     */
    _retriveEventData: function(alldayView, mouseEvent) {
        var container = alldayView.container,
            renderStartDate,
            renderEndDate,
            datesInRange,
            containerWidth,
            mousePos,
            dragStartXIndex;

        renderStartDate = datetime.parse(alldayView.options.renderStartDate);
        renderEndDate = datetime.end(datetime.parse(alldayView.options.renderEndDate));
        datesInRange = datetime.range(renderStartDate, renderEndDate, datetime.MILLISECONDS_PER_DAY).length;
        containerWidth = domutil.getSize(container)[0] - CONTAINER_PADDING_LEFT;    // subtract container left padding.

        mousePos = domevent.getMousePosition(mouseEvent, container);
        dragStartXIndex = common.ratio(containerWidth, datesInRange, mousePos[0] - CONTAINER_PADDING_LEFT) | 0;

        /**
         * @param {MouseEvent} mouseEvent - mouse event in drag actions.
         * @returns {object} event data.
         */
        return function(mouseEvent) {
            var pos = domevent.getMousePosition(mouseEvent, container),
                mouseX = pos[0] - CONTAINER_PADDING_LEFT,
                xIndex = common.ratio(containerWidth, datesInRange, mouseX) | 0;

            // apply limitation of creation event X index.
            xIndex = mmax(xIndex, 0);
            xIndex = mmin(xIndex, datesInRange - 1);

            return {
                relatedView: alldayView,
                dragStartXIndex: dragStartXIndex,
                datesInRange: datesInRange,
                xIndex: xIndex
            };
        };
    }
};

module.exports = alldayCore;


},{"../../common/common":26,"../../common/datetime":27,"../../common/domevent":29,"../../common/domutil":30}],57:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Handler module for MonthWeek view's creation actions.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var alldayCore = require('./core');
var AlldayCreationGuide = require('./creationGuide');

/**
 * @constructor
 * @implements {Handler}
 * @mixes AlldayCore
 * @mixes CutomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - MonthWeek view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayCreation(dragHandler, alldayView, baseController) {    // eslint-disable-line
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = null;

    /**
     * allday view instance.
     * @type {Allday}
     */
    this.alldayView = null;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.baseController = null;

    /**
     * @type {function}
     */
    this.getEventDataFunc = null;

    if (arguments.length) {
        this.connect.apply(this, arguments);
    }

    /**
     * @type {AlldayCreationGuide}
     */
    this.guide = new AlldayCreationGuide(this);
}

/**
 * Destroy method
 */
AlldayCreation.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.alldayView = this.baseController =
        this.getEventDataFunc = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|MonthWeek} return MonthWeek view instance when satiate condition.
 */
AlldayCreation.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (cssClass !== config.classname('monthweek-events')) {
        return false;
    }

    target = target.parentNode;
    cssClass = domutil.getClass(target);
    matches = cssClass.match(config.allday.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.alldayView.childs.items, matches[1]);
};

/**
 * Connect handler, view, controller.
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - MonthWeek view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
AlldayCreation.prototype.connect = function(dragHandler, alldayView, baseController) {
    this.dragHandler = dragHandler;
    this.alldayView = alldayView;
    this.baseController = baseController;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);
};

/**
 * Request event model creation to controller by custom events.
 * @fires {AlldayCreation#beforeCreateEvent}
 * @param {object} eventData - event data from AlldayCreation module.
 */
AlldayCreation.prototype._createEvent = function(eventData) {
    var viewOptions = eventData.relatedView.options,
        dateRange = datetime.range(
            datetime.start(datetime.parse(viewOptions.renderStartDate)),
            datetime.end(datetime.parse(viewOptions.renderEndDate)),
            datetime.MILLISECONDS_PER_DAY
        ),
        startXIndex = eventData.dragStartXIndex,
        xIndex = eventData.xIndex,
        starts, ends;

    // when inverse start, end then change it.
    if (xIndex < startXIndex) {
        startXIndex = xIndex + startXIndex;
        xIndex = startXIndex - xIndex;
        startXIndex = startXIndex - xIndex;
    }

    starts = new Date(dateRange[startXIndex].getTime());
    ends = datetime.end(dateRange[xIndex]);

    /**
     * @event {AlldayCreation#beforeCreateEvent}
     * @type {object}
     * @property {boolean} isAllDay - whether event is fired in allday view area?
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeCreateEvent', {
        isAllDay: true,
        starts: starts,
        ends: ends
    });
};

/**
 * DragStart event handler method.
 * @emits AlldayCreation#allday_creation_dragstart
 * @param {object} dragStartEventData - Drag#dragStart event handler event data.
 */
AlldayCreation.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        getEventDataFunc,
        eventData;

    if (!result) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    getEventDataFunc = this.getEventDataFunc = this._retriveEventData(this.alldayView, dragStartEventData.originEvent);
    eventData = getEventDataFunc(dragStartEventData.originEvent);

    /**
     * @event AlldayCreation#allday_creation_dragstart
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('allday_creation_dragstart', eventData);
};

/**
 * Drag event handler method.
 * @emits AlldayCreation#allday_creation_drag
 * @param {object} dragEventData - Drag#drag event handler eventdata.
 */
AlldayCreation.prototype._onDrag = function(dragEventData) {
    var getEventDataFunc = this.getEventDataFunc,
        eventData;

    if (!getEventDataFunc) {
        return;
    }

    eventData = getEventDataFunc(dragEventData.originEvent);

    /**
     * @event AlldayCreation#allday_creation_drag
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('allday_creation_drag', eventData);
};

/**
 * DragEnd event hander method.
 * @emits AlldayCreation#allday_creation_dragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 */
AlldayCreation.prototype._onDragEnd = function(dragEndEventData, overrideEventName) {
    var getEventDataFunc = this.getEventDataFunc,
        eventData;

    if (!getEventDataFunc) {
        return;
    }

    this.guide.clearGuideElement();

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    eventData = getEventDataFunc(dragEndEventData.originEvent);

    this._createEvent(eventData);

    /**
     * @event AlldayCreation#allday_creation_dragend
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'allday_creation_dragend', eventData);

    this.getEventDataFunc = null;
};

/**
 * Click event handler method.
 * @emits AlldayCreation#allday_creation_click
 * @param {object} clickEventData - Drag#Click event handler data.
 */
AlldayCreation.prototype._onClick = function(clickEventData) {
    /**
     * @event AlldayCreation#allday_creation_click
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this._onDragEnd(clickEventData, 'allday_creation_click');
};

common.mixin(alldayCore, AlldayCreation);
util.CustomEvents.mixin(AlldayCreation);

module.exports = AlldayCreation;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/common":26,"../../common/datetime":27,"../../common/domutil":30,"../../config":36,"./core":56,"./creationGuide":58}],58:[function(require,module,exports){
/**
 * @fileoverview Guide element for Allday.Creation
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var config = require('../../config');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');

var CREATE_NEW_LABEL = '새 일정';

/**
 * Class for Allday.Creation dragging effect.
 * @constructor
 * @param {AlldayCreation} alldayCreation - instance of AlldayCreation.
 */
function AlldayCreationGuide(alldayCreation) {
    /**
     * @type {AlldayCreation}
     */
    this.alldayCreation = alldayCreation;

    /**
     * @type {HTMLDIVElement}
     */
    this.eventContainer = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = document.createElement('div');

    this.initializeGuideElement();

    alldayCreation.on({
        'allday_creation_dragstart': this._onDragStart,
        'allday_creation_drag': this._onDrag,
        'allday_creation_click': this.clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
AlldayCreationGuide.prototype.destroy = function() {
    this.clearGuideElement();
    this.alldayCreation.off(this);
    this.alldayCreation = this.eventContainer =
        this.guideElement = null;
};

/**
 * initialize guide element's default style.
 */
AlldayCreationGuide.prototype.initializeGuideElement = function() {
    var guideElement = this.guideElement,
        spanElement;

    domutil.addClass(guideElement, config.classname('allday-guide-creation-block'));
    domutil.appendHTMLElement('div', guideElement, config.classname('allday-guide-creation'));

    spanElement = domutil.appendHTMLElement('span', guideElement);
    spanElement.innerHTML = CREATE_NEW_LABEL;
};

/**
 * Refresh guide element.
 * @param {object} eventData - event data from Allday.Creation handler.
 */
AlldayCreationGuide.prototype._refreshGuideElement = function(eventData) {
    var guideElement = this.guideElement,
        baseWidthPercent = (100 / eventData.datesInRange),
        dragStartXIndex = eventData.dragStartXIndex,
        xIndex = eventData.xIndex,
        length = xIndex - dragStartXIndex,
        leftPercent,
        widthPercent;

    // when revert dragging.
    if (length < 0) {
        dragStartXIndex = xIndex;
        length = Math.abs(length);
    }

    leftPercent = baseWidthPercent * dragStartXIndex;
    widthPercent = baseWidthPercent * (length + 1);

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.display = 'block';
        guideElement.style.left = leftPercent + '%';
        guideElement.style.width = widthPercent + '%';
    });
};

/**
 * Clear guide element.
 */
AlldayCreationGuide.prototype.clearGuideElement = function() {
    var guideElement = this.guideElement;

    domutil.remove(guideElement);

    guideElement.style.display = 'none';
    guideElement.style.left = '';
    guideElement.style.width = '';
};

/**
 * DragStart event handler.
 * @param {object} dragStartEventData - event data object of Allday.Creation.
 */
AlldayCreationGuide.prototype._onDragStart = function(dragStartEventData) {
    var alldayCreation = this.alldayCreation,
        alldayView = alldayCreation.alldayView,
        alldayContainerElement = alldayView.container,
        eventContainer = domutil.find('.' + config.classname('monthweek-events'), alldayContainerElement);

    eventContainer.appendChild(this.guideElement);
    this._refreshGuideElement(dragStartEventData);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - event data object of Allday.Creation.
 */
AlldayCreationGuide.prototype._onDrag = function(dragEventData) {
    this._refreshGuideElement(dragEventData);
};

module.exports = AlldayCreationGuide;


},{"../../common/domutil":30,"../../common/reqAnimFrame":33,"../../config":36}],59:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Move handler for Allday view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var AlldayCore = require('./core');
var AlldayMoveGuide = require('./moveGuide');

/**
 * @constructor
 * @implements {Handler}
 * @mixes AlldayCore
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - MonthWeek view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayMove(dragHandler, alldayView, baseController) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * allday view instance.
     * @type {Allday}
     */
    this.alldayView = alldayView;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * Temporary variable for dragstart event data.
     * @type {object}
     */
    this._dragStart = null;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);

    /**
     * @type {AlldayMoveGuide}
     */
    this.guide = new AlldayMoveGuide(this);
}

AlldayMove.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.alldayView = this.baseController =
        this.guide = this._dragStart = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|MonthWeek} return MonthWeek view instance when satiate condition.
 */
AlldayMove.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        parentView,
        matches;

    if (~cssClass.indexOf(config.classname('allday-resize-handle'))) {
        return false;
    }

    parentView = domutil.closest(target, '.' + config.classname('allday-monthweek'));

    if (!parentView) {
        return false;
    }

    cssClass = domutil.getClass(parentView);
    matches = cssClass.match(config.allday.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.alldayView.childs.items, matches[1]);
};

/**
 * DragStart event handler method.
 * @emits AlldayMove#allday_move_dragstart
 * @param {object} dragStartEventData - Drag#dragStart event handler event data.
 */
AlldayMove.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        controller = this.baseController,
        eventBlockElement,
        modelID,
        targetModel,
        getEventDataFunc,
        eventData;

    if (!result) {
        return;
    }

    eventBlockElement = domutil.closest(target, '.' + config.classname('allday-event-block'));
    if (!eventBlockElement) {
        return;
    }

    modelID = domutil.getData(eventBlockElement, 'id');
    targetModel = controller.events.items[modelID];

    if (!targetModel) {
        return;
    }

    getEventDataFunc = this.getEventDataFunc = this._retriveEventData(this.alldayView, dragStartEventData.originEvent);
    eventData = this._dragStart = getEventDataFunc(dragStartEventData.originEvent);

    util.extend(eventData, {
        eventBlockElement: eventBlockElement,
        model: targetModel
    });

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event AlldayMove#allday_move_dragstart
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     * @property {CalEvent} model - data object of model isntance.
     * @property {HTMLDivElement} eventBlockElement - target event block element.
     */
    this.fire('allday_move_dragstart', eventData);
};


/**
 * Drag event handler method.
 * @emits AlldayMove#allday_move_drag
 * @param {object} dragEventData - Drag#drag event handler eventdata.
 */
AlldayMove.prototype._onDrag = function(dragEventData) {
    var getEventDataFunc = this.getEventDataFunc;

    if (!getEventDataFunc) {
        return;
    }

    /**
     * @event AlldayMove#allday_move_drag
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('allday_move_drag', getEventDataFunc(dragEventData.originEvent));
};

/**
 * Request update event model to base controller.
 * @fires AlldayMove#beforeUpdateEvent
 * @param {object} eventData - event data from AlldayMove handler module.
 */
AlldayMove.prototype._updateEvent = function(eventData) {
    var model = eventData.targetModel,
        dateOffset = eventData.xIndex - eventData.dragStartXIndex,
        newStarts = new Date(model.starts.getTime()),
        newEnds = new Date(model.ends.getTime());

    newStarts = new Date(newStarts.setDate(newStarts.getDate() + dateOffset));
    newEnds = new Date(newEnds.setDate(newEnds.getDate() + dateOffset));

    /**
     * @event AlldayMove#beforeUpdateEvent
     * @type {object}
     * @property {CalEvent} model - model instance to update
     * @property {date} starts - start time to update
     * @property {date} ends - end time to update
     */
    this.fire('beforeUpdateEvent', {
        model: model,
        starts: newStarts,
        ends: newEnds
    });
};

/**
 * DragEnd event hander method.
 * @emits AlldayMove#allday_move_dragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {?boolean} skipUpdate - true then skip update event model.
 */
AlldayMove.prototype._onDragEnd = function(dragEndEventData, overrideEventName, skipUpdate) {
    var getEventDataFunc = this.getEventDataFunc,
        dragStart = this._dragStart,
        eventData;

    if (!getEventDataFunc || !dragStart) {
        return;
    }

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    eventData = getEventDataFunc(dragEndEventData.originEvent);
    util.extend(eventData, {
        targetModel: dragStart.model
    });
    
    if (!skipUpdate) {
        this._updateEvent(eventData);
    }

    /**
     * @event AlldayMove#allday_move_dragend
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'allday_move_dragend', eventData);

    this.getEventDataFunc = this._dragStart = null;
};

/**
 * Click event handler method.
 * @emits AlldayMove#allday_move_click
 * @param {object} clickEventData - Drag#Click event handler data.
 */
AlldayMove.prototype._onClick = function(clickEventData) {
    /**
     * @event AlldayMove#allday_move_click
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this._onDragEnd(clickEventData, 'allday_move_click', true);
};

common.mixin(AlldayCore, AlldayMove);
util.CustomEvents.mixin(AlldayMove);

module.exports = AlldayMove;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/common":26,"../../common/domutil":30,"../../config":36,"./core":56,"./moveGuide":60}],60:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Effect module for Allday.Move
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');

/**
 * Class for Allday.Move dragging effect.
 * @constructor
 * @param {AlldayMove} alldayMove - instance of AlldayMove.
 */
function AlldayMoveGuide(alldayMove) {
    /**
     * @type {AlldayMove}
     */
    this.alldayMove = alldayMove;

    /**
     * 실제로 이벤트 엘리먼트를 담는 엘리먼트
     * @type {HTMLDIVElement}
     */
    this.eventContainer = null;

    /**
     * @type {number}
     */
    this._dragStartXIndex = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = null;

    alldayMove.on({
        'allday_move_dragstart': this._onDragStart,
        'allday_move_drag': this._onDrag,
        'allday_move_dragend': this._clearGuideElement,
        'allday_move_click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
AlldayMoveGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.alldayMove.off(this);
    this.alldayMove = this.eventContainer = this._dragStartXIndex =
        this.guideElement = null;
};

/**
 * Clear guide element.
 */
AlldayMoveGuide.prototype._clearGuideElement = function() {
    domutil.remove(this.guideElement);

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('dragging'));
    }

    this._dragStartXIndex = this.getEventDataFunc = this.guideElement = null;
};

/**
 * Refresh guide element.
 * @param {number} leftPercent - left percent of guide element.
 * @param {number} widthPercent - width percent of guide element.
 * @param {boolean} isExceededLeft - event starts is faster then render start date?
 * @param {boolean} isExceededRight - event ends is later then render end date?
 */
AlldayMoveGuide.prototype.refreshGuideElement = function(leftPercent, widthPercent, isExceededLeft, isExceededRight) {
    var guideElement = this.guideElement;

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.left = leftPercent + '%';
        guideElement.style.width = widthPercent + '%';

        if (isExceededLeft) {
            domutil.addClass(guideElement, config.classname('allday-exceed-left'));
        } else {
            domutil.removeClass(guideElement, config.classname('allday-exceed-left'));
        }

        if (isExceededRight) {
            domutil.addClass(guideElement, config.classname('allday-exceed-right'));
        } else {
            domutil.removeClass(guideElement, config.classname('allday-exceed-right'));
        }
    });
};

/**
 * Get event block information from event data.
 *
 * For example, there is single event has 10 length. but render range in view is 5 then
 * rendered block must be cut out to render properly. in this case, this method return
 * how many block are cut before rendering.
 * 
 * 이벤트 데이터에서 이벤트 블록 엘리먼트 렌더링에 대한 필요 정보를 추출한다.
 *
 * ex) 렌더링 된 블록의 길이는 5지만 실제 이 이벤트는 10의 길이를 가지고 있을 때
 * 좌 우로 몇 만큼 잘려있는지에 관한 정보를 반환함.
 * @param {object} dragStartEventData - event data from Allday.Move handler.
 * @returns {function} function that return event block information.
 */
AlldayMoveGuide.prototype._getEventBlockDataFunc = function(dragStartEventData) {
    var model = dragStartEventData.model,
        datesInRange = dragStartEventData.datesInRange,
        baseWidthPercent = (100 / datesInRange),
        originEventStarts = datetime.start(model.starts),
        originEventEnds = datetime.end(model.ends),
        viewOptions = this.alldayMove.alldayView.options,
        renderStartDate = datetime.start(datetime.parse(viewOptions.renderStartDate)),
        renderEndDate = datetime.end(datetime.parse(viewOptions.renderEndDate)),
        fromLeft = (new Date(originEventStarts.getTime() - renderStartDate.getTime())) / datetime.MILLISECONDS_PER_DAY | 0,
        fromRight = (new Date(originEventEnds.getTime() - renderEndDate.getTime())) / datetime.MILLISECONDS_PER_DAY | 0;

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
 * @param {object} dragStartEventData - event data.
 */
AlldayMoveGuide.prototype._onDragStart = function(dragStartEventData) {
    var alldayViewContainer = this.alldayMove.alldayView.container,
        guideElement = this.guideElement = dragStartEventData.eventBlockElement.cloneNode(true),
        eventContainer;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('dragging'));
    }

    eventContainer = domutil.find('.' + config.classname('monthweek-events'), alldayViewContainer);
    domutil.addClass(guideElement, config.classname('allday-guide-move'));
    eventContainer.appendChild(guideElement);

    this._dragStartXIndex = dragStartEventData.xIndex;
    this.getEventDataFunc = this._getEventBlockDataFunc(dragStartEventData);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - event data.
 */
AlldayMoveGuide.prototype._onDrag = function(dragEventData) {
    var getEventDataFunc = this.getEventDataFunc,
        dragStartXIndex = this._dragStartXIndex,
        datesInRange = dragEventData.datesInRange,
        eventData,
        isExceededLeft,
        isExceededRight,
        originLength,
        newLeft,
        newWidth;

    if (!getEventDataFunc) {
        return;
    }

    eventData = getEventDataFunc(dragEventData.xIndex - dragStartXIndex);
    isExceededLeft = eventData.fromLeft < 0;
    isExceededRight = eventData.fromRight > 0;

    newLeft = Math.max(0, eventData.fromLeft);
    originLength = (eventData.fromLeft * -1) + (datesInRange + eventData.fromRight);
    newWidth = isExceededLeft ? (originLength + eventData.fromLeft) : originLength;
    newWidth = isExceededRight ? (newWidth - eventData.fromRight) : newWidth;

    newLeft *= eventData.baseWidthPercent;
    newWidth *= eventData.baseWidthPercent;

    this.refreshGuideElement(newLeft, newWidth, isExceededLeft, isExceededRight);
};

module.exports = AlldayMoveGuide;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/datetime":27,"../../common/domutil":30,"../../common/reqAnimFrame":33,"../../config":36}],61:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Resize handler module for Allday view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var common = require('../../common/common');
var AlldayCore = require('./core');
var AlldayResizeGuide = require('./resizeGuide');

/**
 * @constructor
 * @implements {Handler}
 * @mixes AlldayCore
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - MonthWeek view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayResize(dragHandler, alldayView, baseController) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * allday view instance.
     * @type {Allday}
     */
    this.alldayView = alldayView;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * Temporary variable for dragStart event data.
     * @type {object}
     */
    this._dragStart = null;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);

    /**
     * @type {AlldayResizeGuide}
     */
    this.guide = new AlldayResizeGuide(this);
}

/**
 * Destroy method
 */
AlldayResize.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.alldayView = this.baseController =
        this.guide = this._dragStart = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|MonthWeek} return MonthWeek view instance when satiate condition.
 */
AlldayResize.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (!~cssClass.indexOf(config.classname('allday-resize-handle'))) {
        return false;
    }

    target = domutil.closest(target, '.' + config.classname('allday-monthweek'));

    if (!target) {
        return false;
    }

    cssClass = domutil.getClass(target);
    matches = cssClass.match(config.allday.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.alldayView.childs.items, matches[1]);
};

/**
 * DragStart event handler.
 * @emits AlldayResize#allday_resize_dragstart
 * @param {object} dragStartEventData - event data.
 */
AlldayResize.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        controller = this.baseController,
        eventBlockElement,
        modelID,
        targetModel,
        getEventDataFunc,
        eventData;

    if (!result) {
        return;
    }

    eventBlockElement = domutil.closest(target, '.' + config.classname('allday-event-block'));
    modelID = domutil.getData(eventBlockElement, 'id');
    targetModel = controller.events.items[modelID];

    if (!targetModel) {
        return;
    }

    getEventDataFunc = this.getEventDataFunc = this._retriveEventData(this.alldayView, dragStartEventData.originEvent);
    eventData = this._dragStart = getEventDataFunc(dragStartEventData.originEvent);

    util.extend(eventData, {
        eventBlockElement: eventBlockElement,
        model: targetModel
    });

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event AlldayResize#allday_resize_dragstart
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     * @property {CalEvent} model - data object of model isntance.
     * @property {HTMLDivElement} eventBlockElement - target event block element.
     */
    this.fire('allday_resize_dragstart', eventData);
};

/**
 * Drag event handler method.
 * @emits AlldayResize#allday_resize_drag
 * @param {object} dragEventData - Drag#drag event handler eventdata.
 */
AlldayResize.prototype._onDrag = function(dragEventData) {
    var getEventDataFunc = this.getEventDataFunc;

    if (!getEventDataFunc) {
        return;
    }

    /**
     * @event AlldayResize#allday_resize_drag
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('allday_resize_drag', getEventDataFunc(dragEventData.originEvent));
};

/**
 * Request update event instance to base controller.
 * @fires AlldayResize#beforeUpdateEvent
 * @param {object} eventData - event data from AlldayResize handler.
 */
AlldayResize.prototype._updateEvent = function(eventData) {
    var model = eventData.targetModel,
        dateOffset = eventData.xIndex - eventData.dragStartXIndex,
        newEnds = new Date(model.ends.getTime());

    newEnds = new Date(newEnds.setDate(newEnds.getDate() + dateOffset));
    newEnds = new Date(Math.max(datetime.end(model.starts).getTime(), newEnds.getTime()));

    /**
     * @event AlldayResize#beforeUpdateEvent
     * @type {object}
     * @property {CalEvent} model - model instance to update
     * @property {date} starts - start time to update
     * @property {date} ends - end time to update
     */
    this.fire('beforeUpdateEvent', {
        model: model,
        starts: model.getStarts(),
        ends: newEnds
    });
};

/**
 * DragEnd event hander method.
 * @emits AlldayResize#allday_resize_dragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {?boolean} skipUpdate - true then skip update event model.
 */
AlldayResize.prototype._onDragEnd = function(dragEndEventData, overrideEventName, skipUpdate) {
    var getEventDataFunc = this.getEventDataFunc,
        dragStart = this._dragStart,
        eventData;

    if (!getEventDataFunc || !dragStart) {
        return;
    }

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    eventData = getEventDataFunc(dragEndEventData.originEvent);
    util.extend(eventData, {
        targetModel: dragStart.model
    });

    if (!skipUpdate) {
        this._updateEvent(eventData);
    }

    /**
     * @event AlldayResize#allday_resize_dragend
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'allday_resize_dragend', eventData);

    this.getEventDataFunc = this._dragStart = null;
};

/**
 * Click event handler method.
 * @emits AlldayResize#allday_resize_click
 * @param {object} clickEventData - Drag#Click event handler data.
 */
AlldayResize.prototype._onClick = function(clickEventData) {
    /**
     * @event AlldayResize#allday_resize_click
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this._onDragEnd(clickEventData, 'allday_resize_click', true);
};

common.mixin(AlldayCore, AlldayResize);
util.CustomEvents.mixin(AlldayResize);

module.exports = AlldayResize;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/common":26,"../../common/datetime":27,"../../common/domutil":30,"../../config":36,"./core":56,"./resizeGuide":62}],62:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Resize Guide module.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');
var datetime = require('../../common/datetime');
var reqAnimFrame = require('../../common/reqAnimFrame');


/**
 * @constructor
 * @param {AlldayResize} alldayResize - instance of AlldayResize
 */
function AlldayResizeGuide(alldayResize) {
    /**
     * @type {AlldayResize}
     */
    this.alldayResize = alldayResize;

    /**
     * 실제로 이벤트 엘리먼트를 담는 엘리먼트
     * @type {HTMLDIVElement}
     */
    this.eventContainer = null;

    /**
     * @type {function}
     */
    this.getEventDataFunc = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = null;

    alldayResize.on({
        'allday_resize_dragstart': this._onDragStart,
        'allday_resize_drag': this._onDrag,
        'allday_resize_dragend': this._clearGuideElement,
        'allday_resize_click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
AlldayResizeGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.alldayResize.off(this);
    this.alldayResize = this.eventContainer = this.getEventDataFunc =
        this.guideElement = null;
};

/**
 * Clear guide element.
 */
AlldayResizeGuide.prototype._clearGuideElement = function() {
    domutil.remove(this.guideElement);

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('resizing-x'));
    }

    this.getEventDataFunc = null;
};

/**
 * Refresh guide element
 * @param {number} newWidth - new width percentage value to resize guide element.
 */
AlldayResizeGuide.prototype.refreshGuideElement = function(newWidth) {
    var guideElement = this.guideElement;

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.width = newWidth + '%';
    });
};

/**
 * Return function that calculate guide element's new width percentage value.
 * @param {object} dragStartEventData - dragstart event data.
 * @returns {function} return function that calculate guide element new width percentage.
 */
AlldayResizeGuide.prototype.getGuideElementWidthFunc = function(dragStartEventData) {
    var model = dragStartEventData.model,
        viewOptions = this.alldayResize.alldayView.options,
        startDate = datetime.start(new Date(Math.max(model.starts.getTime(), datetime.parse(viewOptions.renderStartDate).getTime()))),
        endDate = datetime.end(new Date(Math.min(model.ends.getTime(), datetime.parse(viewOptions.renderEndDate).getTime()))),
        originLength = datetime.range(startDate, endDate, datetime.MILLISECONDS_PER_DAY).length,
        baseWidthPercent = 100 / dragStartEventData.datesInRange,
        dragStartIndex = dragStartEventData.xIndex;

    return function(xIndex) {
        var offset = xIndex - dragStartIndex,
            newLength = originLength + offset;

        newLength = Math.max(1, newLength);

        return newLength * baseWidthPercent;
    }
};

/**
 * DragStart event handler.
 * @param {object} dragStartEventData - event data.
 */
AlldayResizeGuide.prototype._onDragStart = function(dragStartEventData) {
    var alldayViewContainer = this.alldayResize.alldayView.container,
        guideElement = this.guideElement = dragStartEventData.eventBlockElement.cloneNode(true),
        eventContainer;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('resizing-x'));
    }

    eventContainer = domutil.find('.' + config.classname('monthweek-events'), alldayViewContainer);
    domutil.addClass(guideElement, config.classname('allday-guide-move'));
    eventContainer.appendChild(guideElement);

    this.getEventDataFunc = this.getGuideElementWidthFunc(dragStartEventData);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - event data.
 */
AlldayResizeGuide.prototype._onDrag = function(dragEventData) {
    var func = this.getEventDataFunc;

    if (!func) {
        return;
    }

    this.refreshGuideElement(func(dragEventData.xIndex));
};

module.exports = AlldayResizeGuide;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/datetime":27,"../../common/domutil":30,"../../common/reqAnimFrame":33,"../../config":36}],63:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Drag handler for calendar.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var domutil = require('../common/domutil');
var domevent = require('../common/domevent');

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

    this._isMoved = true;

    if (this._distance < distance) {
        this._distance += 1;
        return;
    }

    if (!this._dragStartFired) {
        this._dragStartFired = true;

        /**
         * Drag starts events. cancelable.
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


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/domevent":29,"../common/domutil":30}],64:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Allday event click event hander module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');

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

    container = domutil.closest(target, '.' + config.classname('time-date'));

    if (!container) {
        return false;
    }

    matches = domutil.getClass(container).match(config.time.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.childs.items, +matches[1]);
};

/**
 * Click event hander
 * @param {object} clickEvent - click event from {@link Drag}
 * @emits TimeClick#clickEvent
 */
TimeClick.prototype._onClick = function(clickEvent) {
    var target = clickEvent.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, '.' + config.classname('time-date-event-block')),
        eventCollection = this.baseController.events;

    if (!timeView || !blockElement) {
        return;
    }

    eventCollection.doWhenHas(domutil.getData(blockElement, 'id'), function(model) {
        /**
         * @events TimeClick#clickEvent
         * @type {object}
         * @property {CalEvent} model - model instance
         * @property {MouseEvent} jsEvent - MouseEvent object
         */
        this.fire('clickEvent', {
            model:  model,
            jsEvent: clickEvent.originEvent
        });
    }, this);
};

util.CustomEvents.mixin(TimeClick);

module.exports = TimeClick;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/domutil":30,"../../config":36}],65:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Core methods for dragging actions
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var common = require('../../common/common');
var datetime = require('../../common/datetime');
var domevent = require('../../common/domevent');
var Point = require('../../common/point');

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
    _retriveEventData: function(timeView) {
        var container = timeView.container,
            options = timeView.options,
            viewHeight = timeView.getViewBound().height,
            viewTime = +timeView.getDate(),
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
                nearestGridY = this._calcGridYIndex(baseMil, viewHeight, mouseY),
                nearestGridTimeY = viewTime + datetime.millisecondsFrom('hour', nearestGridY + options.hourStart);

            return util.extend({
                target: mouseEvent.target || mouseEvent.srcElement,
                relatedView: timeView,
                originEvent: mouseEvent,
                mouseY: mouseY,
                gridY: gridY,
                timeY: timeY,
                nearestGridY: nearestGridY,
                nearestGridTimeY: nearestGridTimeY
            }, extend);
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

module.exports = timeCore;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/common":26,"../../common/datetime":27,"../../common/domevent":29,"../../common/point":32}],66:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Handling creation events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var array = require('../../common/array');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var TimeCreationGuide = require('./creationGuide');
var timeCore = require('./core');

/**
 * @constructor
 * @implements {Handler}
 * @mixes timeCore
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function TimeCreation(dragHandler, timeGridView, baseController) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = null;

    /**
     * TimeGrid view instance.
     * @type {TimeGrid}
     */
    this.timeGridView = null;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.baseController = null;

    /**
     * @type {TimeCreationGuide}
     */
    this.guide = new TimeCreationGuide(this);

    /**
     * Temporary function for single drag session's calc.
     * @type {function}
     */
    this._getEventDataFunc = null;

    /**
     * Temporary function for drag start data cache.
     * @type {object}
     */
    this._dragStart = null;

    if (arguments.length) {
        this.connect.apply(this, arguments);
    }
}

/**
 * Destroy method
 */
TimeCreation.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.timeGridView = this.baseController =
        this._getEventDataFunc = this._dragStart = this.guide = null;
};

/**
 * Connect handler, view, controllers for event creations.
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
TimeCreation.prototype.connect = function(dragHandler, timeGridView, baseController) {
    this.dragHandler = dragHandler;
    this.timeGridView = timeGridView;
    this.baseController = baseController;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {(boolean|Time)} - return Time view instance when satiate condition.
 */
TimeCreation.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (cssClass === config.classname('time-date-event-block')) {
        target = target.parentNode;
        cssClass = domutil.getClass(target);
    }

    matches = cssClass.match(config.time.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.childs.items, matches[1]);
};

/**
 * Drag#dragStart event handler.
 * @emits TimeCreation#time_creation_dragstart
 * @param {object} dragStartEventData - Drag#dragStart event data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeCreation.prototype._onDragStart = function(dragStartEventData, overrideEventName, revise) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        getEventDataFunc,
        eventData;

    if (!result) {
        return;
    }

    getEventDataFunc = this._getEventDataFunc = this._retriveEventData(result);
    eventData = this._dragStart = getEventDataFunc(dragStartEventData.originEvent);

    if (revise) {
        revise(eventData);
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event TimeCreation#time_creation_dragstart
     * @type {object}
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     */
    this.fire(overrideEventName || 'time_creation_dragstart', eventData);
};

/**
 * Drag#drag event handler
 * @emits TimeCreation#time_creation_drag
 * @param {object} dragEventData - event data from Drag#drag.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeCreation.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var getEventDataFunc = this._getEventDataFunc,
        eventData;

    if (!getEventDataFunc) {
        return;
    }

    eventData = getEventDataFunc(dragEventData.originEvent);

    if (revise) {
        revise(eventData);
    }

    /**
     * @event TimeCreation#time_creation_drag
     * @type {object}
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     */
    this.fire(overrideEventName || 'time_creation_drag', eventData);
};

/**
 * @fires TimeCreation#beforeCreateEvent
 * @param {object} eventData - event data object from TimeCreation#time_creation_dragend
 * or TimeCreation#time_creation_click
 */
TimeCreation.prototype._createEvent = function(eventData) {
    var relatedView = eventData.relatedView,
        createRange = eventData.createRange,
        nearestGridTimeY = eventData.nearestGridTimeY,
        baseDate,
        dateStart,
        dateEnd,
        starts,
        ends;

    if (!createRange) {
        createRange = [
            nearestGridTimeY,
            nearestGridTimeY + datetime.millisecondsFrom('minutes', 30)
        ];
    }

    baseDate = new Date(relatedView.getDate());
    dateStart = datetime.start(baseDate);
    dateEnd = datetime.end(baseDate);
    starts = Math.max(dateStart.getTime(), createRange[0]);
    ends = Math.min(dateEnd.getTime(), createRange[1]);

    /**
     * @event TimeCreation#beforeCreateEvent
     * @type {object}
     * @property {boolean} isAllDay - whether event is fired in allday view area?
     * @property {Date} starts - select start time
     * @property {Date] ends - select end time
     */
    this.fire('beforeCreateEvent', {
        isAllDay: false,
        starts: new Date(starts),
        ends: new Date(ends)
    });
};

/**
 * Drag#dragEnd event handler
 * @emits TimeCreation#time_creation_dragend
 * @param {object} dragEndEventData - event data from Drag#dragend
 */
TimeCreation.prototype._onDragEnd = function(dragEndEventData) {
    var dragStart = this._dragStart;

    this.guide.clearGuideElement();

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    function reviseFunc(eventData) {
        var range = [
            dragStart.nearestGridTimeY,
            eventData.nearestGridTimeY
        ].sort(array.compare.num.asc);
        range[1] += datetime.millisecondsFrom('hour', 0.5);

        eventData.createRange = range;

        this._createEvent(eventData);
    }

    /**
     * @event TimeCreation#time_creation_dragend
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
    this._onDrag(dragEndEventData, 'time_creation_dragend', util.bind(reviseFunc, this));

    this._dragStart = this._getEventDataFunc = null;
};

/**
 * Drag#click event handler
 * @emits TimeCreation#time_creation_click
 * @param {object} clickEventData - event data from Drag#click.
 */
TimeCreation.prototype._onClick = function(clickEventData) {
    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    function reviseFunc(eventData) {
        this._createEvent(eventData);
    }

    /**
     * @event TimeCreation#time_creation_click
     * @type {object}
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     */
    this._onDrag(clickEventData, 'time_creation_click', util.bind(reviseFunc, this));

    this._dragStart = this._getEventDataFunc = null;
};

timeCore.mixin(TimeCreation);
util.CustomEvents.mixin(TimeCreation);

module.exports = TimeCreation;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/array":23,"../../common/datetime":27,"../../common/domutil":30,"../../config":36,"./core":65,"./creationGuide":67}],67:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Module for Time.Creation effect while dragging.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var common = require('../../common/common');
var datetime = require('../../common/datetime');
var config = require('../../config');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');
var ratio = require('../../common/common').ratio;
var MIN30 = (datetime.MILLISECONDS_PER_MINUTES * 30)

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
        'time_creation_dragstart': this._onDragStart,
        'time_creation_drag': this._onDrag,
        'time_creation_click': this.clearGuideElement
    }, this);
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
 * @param {Date} start - start time of event to create
 * @param {Date} end - end time of event to create
 * @param {boolean} bottomLabel - is label need to render bottom of guide element?
 */
TimeCreationGuide.prototype._refreshGuideElement = function(top, height, start, end, bottomLabel) {
    var guideElement = this.guideElement,
        timeElement = this.guideTimeElement;

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.top = top + 'px';
        guideElement.style.height = height + 'px';
        guideElement.style.display = 'block';

        timeElement.innerHTML = datetime.format(new Date(start), 'HH:mm') + 
            ' ~ ' + datetime.format(new Date(end), 'HH:mm');

        if (!!bottomLabel) {
            domutil.removeClass(timeElement, config.classname('time-guide-bottom'));
        } else {
            domutil.addClass(timeElement, config.classname('time-guide-bottom'));
        }
    });
};

/**
 * Get unit data of calculating new style of guide element by user interaction
 * @param {Time} relatedView - time view instance related with event
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
    return [viewHeight, hourLength, +todayStart, +todayEnd, viewHeight / hourLength];
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
    var todayEnd = +datetime.end(new Date(+todayStart));

    function getStyleData(eventData) {
        var gridY = eventData.nearestGridY,
            gridTimeY = eventData.nearestGridTimeY,
            top, time;

        top = common.limit(ratio(hourLength, viewHeight, gridY), [0], [viewHeight]);
        time = common.limit(gridTimeY, [todayStart], [todayEnd]);

        return [top, time];
    }
        
    return getStyleData;
};

/**
 * DragStart event handler
 * @param {object} dragStartEventData - dragStart event data.
 */
TimeCreationGuide.prototype._onDragStart = function(dragStartEventData) {
    var relatedView = dragStartEventData.relatedView,
        unitData, styleFunc, styleData, result;

    unitData = this._styleUnit = this._getUnitData(relatedView);
    styleFunc = this._styleFunc = this._getStyleDataFunc.apply(this, unitData);
    styleData = this._styleStart = styleFunc(dragStartEventData);

    result = this._limitStyleData(
        styleData[0],
        (unitData[4] / 2),
        styleData[1],
        (styleData[1] + MIN30)
    );

    this._refreshGuideElement.apply(this, result);

    relatedView.container.appendChild(this.guideElement);
};

/**
 * Drag event handler
 * @param {object} dragEventData - drag event data.
 */
TimeCreationGuide.prototype._onDrag = function(dragEventData) {
    var styleFunc = this._styleFunc,
        unitData = this._styleUnit,
        startStyle = this._styleStart,
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

        this._refreshGuideElement.apply(this, result);
    } else {
        result = this._limitStyleData(
            endStyle[0],
            (startStyle[0] - endStyle[0]) + heightOfHalfHour,
            endStyle[1],
            (startStyle[1] + MIN30)
        );

        this._refreshGuideElement.apply(this, result.concat([true]));
    }
};

module.exports = TimeCreationGuide;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/common":26,"../../common/datetime":27,"../../common/domutil":30,"../../common/reqAnimFrame":33,"../../config":36}],68:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Handling move events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var timeCore = require('./core');
var TimeMoveGuide = require('./moveGuide');

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
    this.dragHandler = null;

    /**
     * @type {TimeGrid}
     */
    this.timeGridView = null;

    /**
     * @type {Base}
     */
    this.baseController = null;

    /**
     * @type {function}
     */
    this._getEventDataFunc = null;

    /**
     * @type {object}
     */
    this._dragStart = null;

    /**
     * @type {TimeMoveGuide}
     */
    this._guide = new TimeMoveGuide(this);

    if (arguments.length) {
        this.connect.apply(this, arguments);
    }
}

/**
 * Destroy method.
 */
TimeMove.prototype.destroy = function() {
    this._guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.timeGridView = this.baseController =
        this._getEventDataFunc = this._dragStart = this._guide = null;
};

/**
 * Connect handler, view, controllers for event creations.
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
TimeMove.prototype.connect = function(dragHandler, timeGridView, baseController) {
    this.dragHandler = dragHandler;
    this.timeGridView = timeGridView;
    this.baseController = baseController;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {boolean|object} - return object when satiate condition.
 */
TimeMove.prototype.checkExpectCondition = function(target) {
    if (domutil.getClass(target) !== config.classname('time-event')) {
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
    var container = domutil.closest(target, '.' + config.classname('time-date')),
        matches;

    if (!container) {
        return false;
    }

    matches = domutil.getClass(container).match(config.time.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.childs.items, +matches[1]);
};

/**
 * @emits TimeMove#time_move_dragstart
 * @param {object} dragStartEventData - Drag#dragStart event data.
 */
TimeMove.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, '.' + config.classname('time-date-event-block')),
        getEventDataFunc,
        eventData;

    if (!timeView || !blockElement) {
        return;
    }

    getEventDataFunc = this._getEventDataFunc = this._retriveEventData(timeView);
    eventData = this._dragStart = getEventDataFunc(
        dragStartEventData.originEvent, {
            targetModelID: domutil.getData(blockElement, 'id')
        }
    );

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event TimeMove#time_move_dragstart
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move event.
     */
    this.fire('time_move_dragstart', eventData);
};

/**
 * @emits TimeMove#time_move_drag
 * @param {MouseEvent} dragEventData - mousemove event object
 * @param {string} [overrideEventName] - name of emitting event to override.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeMove.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var getEventDataFunc = this._getEventDataFunc,
        timeView = this._getTimeView(dragEventData.target),
        dragStart = this._dragStart,
        eventData;

    if (!timeView || !getEventDataFunc || !dragStart) {
        return;
    }

    eventData = getEventDataFunc(dragEventData.originEvent, {
        currentView: timeView,
        targetModelID: dragStart.targetModelID
    });

    if (revise) {
        revise(eventData);
    }

    /**
     * @event TimeMove#time_move_drag
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
     * @property {string} targetModelID - The model unique id emitted move event.
     */
    this.fire(overrideEventName || 'time_move_drag', eventData);
};

/**
 * Update model instance by dragend event results.
 * @fires TimeMove#beforeUpdateEvent
 * @param {object} eventData - event data from TimeMove#time_move_dragend
 */
TimeMove.prototype._updateEvent = function(eventData) {
    var ctrl = this.baseController,
        modelID = eventData.targetModelID,
        range = eventData.nearestRange,
        timeDiff = range[1] - range[0],
        dateDiff = 0,
        model = ctrl.events.items[modelID],
        relatedView = eventData.relatedView,
        currentView = eventData.currentView,
        eventDuration,
        dateStart,
        dateEnd,
        newStarts,
        newEnds,
        baseDate;

    if (!model || !currentView) {
        return;
    }

    timeDiff -= datetime.millisecondsFrom('minutes', 30);
    baseDate = new Date(relatedView.getDate());
    dateStart = datetime.start(baseDate);
    dateEnd = datetime.end(baseDate);
    newStarts = new Date(model.getStarts().getTime() + timeDiff);
    newEnds = new Date(model.getEnds().getTime() + timeDiff);
    eventDuration = model.duration();

    if (currentView) {
        dateDiff = currentView.getDate() - relatedView.getDate();
    }

    if (newStarts < dateStart) {
        newStarts = new Date(dateStart.getTime());
        newEnds = new Date(newStarts.getTime() + eventDuration.getTime());
    } else if (newEnds > dateEnd) {
        newEnds = new Date(dateEnd.getTime());
        newStarts = new Date(newEnds.getTime() - eventDuration.getTime());
    }

    newStarts = new Date(newStarts.getTime() + dateDiff);
    newEnds = new Date(newEnds.getTime() + dateDiff);

    /**
     * @event TimeMove#beforeUpdateEvent
     * @type {object}
     * @property {CalEvent} model - model instance to update
     * @property {date} starts - start time to update
     * @property {date} ends - end time to update
     */
    this.fire('beforeUpdateEvent', {
        model: model,
        starts: newStarts,
        ends: newEnds
    });
};

/**
 * @emits TimeMove#time_move_dragend
 * @param {MouseEvent} dragEndEventData - mouseup mouse event object.
 */
TimeMove.prototype._onDragEnd = function(dragEndEventData) {
    var getEventDataFunc = this._getEventDataFunc,
        currentView = this._getTimeView(dragEndEventData.target),
        dragStart = this._dragStart,
        eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getEventDataFunc || !dragStart) {
        return;
    }

    eventData = getEventDataFunc(dragEndEventData.originEvent, {
        currentView: currentView,
        targetModelID: dragStart.targetModelID
    });

    eventData.range = [
        dragStart.timeY,
        eventData.timeY + datetime.millisecondsFrom('hour', 0.5)
    ];

    eventData.nearestRange = [
        dragStart.nearestGridTimeY,
        eventData.nearestGridTimeY + datetime.millisecondsFrom('hour', 0.5)
    ];

    this._updateEvent(eventData);

    /**
     * @event TimeMove#time_move_dragend
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
     * @property {string} targetModelID - The model unique id emitted move event.
     * @property {number[]} range - milliseconds range between drag start and end.
     * @property {number[]} nearestRange - milliseconds range related with nearestGridY between start and end.
     */
    this.fire('time_move_dragend', eventData);
};

/**
 * @emits TimeMove#time_move_click
 * @param {MouseEvent} clickEventData - click mouse event object.
 */
TimeMove.prototype._onClick = function(clickEventData) {
    var getEventDataFunc = this._getEventDataFunc,
        dragStart = this._dragStart,
        eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getEventDataFunc || !dragStart) {
        return;
    }

    eventData = getEventDataFunc(clickEventData.originEvent, {
        targetModelID: dragStart.targetModelID
    });

    /**
     * @event TimeMove#time_move_click
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with drag start position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move event.
     */
    this.fire('time_move_click', eventData);
};

timeCore.mixin(TimeMove);
util.CustomEvents.mixin(TimeMove);

module.exports = TimeMove;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/datetime":27,"../../common/domutil":30,"../../config":36,"./core":65,"./moveGuide":69}],69:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Module for Time.Move effect while dragging.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');
var ratio = require('../../common/common').ratio;

/**
 * Class for Time.Move effect.
 * @constructor
 * @param {TimeMove} timeMove - The instance of TimeMove.
 */
function TimeMoveGuide(timeMove) {
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
        'time_move_dragstart': this._onDragStart,
        'time_move_drag': this._onDrag,
        'time_move_dragend': this._clearGuideElement,
        'time_move_click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
TimeMoveGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.timeMove.off(this);
    this.guideElement = this.timeMove = this._container =
        this._getTopFunc = this._startGridY = this._startTopPixel = null;
};

/**
 * Clear guide element.
 */
TimeMoveGuide.prototype._clearGuideElement = function() {
    var guideElement = this.guideElement;

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('dragging'));
    }

    domutil.remove(guideElement);

    this.guideElement = this._getTopFunc =
        this._startGridY = this._startTopPixel = null;
};

/**
 * Refresh guide element
 * @param {string} top - guide element's style top.
 */
TimeMoveGuide.prototype._refreshGuideElement = function(top) {
    var guideElement = this.guideElement;

    if (!guideElement) {
        return;
    }

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.top = top + 'px';
        guideElement.style.display = 'block';
    });
};

/**
 * TimeMove#time_move_dragstart event handler
 * @param {object} dragStartEventData - dragstart event data
 */
TimeMoveGuide.prototype._onDragStart = function(dragStartEventData) {
    var guideElement = domutil.closest(
        dragStartEventData.target,
        '.' + config.classname('time-date-event-block')
    );

    if (!guideElement) {
        return;
    }

    guideElement = guideElement.cloneNode(true);
    domutil.addClass(guideElement, config.classname('time-guide-move'));

    this._startTopPixel = parseFloat(guideElement.style.top);
    this._startGridY = dragStartEventData.nearestGridY;
    this.guideElement = guideElement;
    this._container = dragStartEventData.relatedView.container;
    this._container.appendChild(guideElement);
};

/**
 * TimeMove#time_move_drag event handler
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
        bottomLimit,
        top;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('dragging'));
    }

    if (this._container !== timeView.container) {
        this._container = timeView.container;
        this._container.appendChild(this.guideElement);
    }

    top = this._startTopPixel + gridYOffsetPixel;
    bottomLimit = viewHeight - guideHeight;

    top = Math.max(top, 0);
    top = Math.min(top, bottomLimit);

    this._refreshGuideElement(top);
};

module.exports = TimeMoveGuide;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/common":26,"../../common/domutil":30,"../../common/reqAnimFrame":33,"../../config":36}],70:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Handling resize events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var timeCore = require('./core');
var TimeResizeGuide = require('./resizeGuide');

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
    this.dragHandler = null;

    /**
     * @type {TimeGrid}
     */
    this.timeGridView = null;

    /**
     * @type {Base}
     */
    this.baseController = null;

    /**
     * @type {function}
     */
    this._getEventDataFunc = null;

    /**
     * @type {object}
     */
    this._dragStart = null;

    /**
     * @type {TimeResizeGuide}
     */
    this._guide = new TimeResizeGuide(this);

    if (arguments.length) {
        this.connect.apply(this, arguments);
    }
}

/**
 * Destroy method
 */
TimeResize.prototype.destroy = function() {
    this._guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.timeGridView = this.baseController =
        this._getEventDataFunc = this._dragStart = this._guide = null;
};

/**
 * Connect handler, view, controllers for event creations.
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
TimeResize.prototype.connect = function(dragHandler, timeGridView, baseController) {
    this.dragHandler = dragHandler;
    this.timeGridView = timeGridView;
    this.baseController = baseController;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);
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

    container = domutil.closest(target, '.' + config.classname('time-date'));

    if (!container) {
        return false;
    }

    matches = domutil.getClass(container).match(config.time.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.childs.items, +matches[1]);
};

/**
 * @emits TimeResize#time_resize_dragstart
 * @param {object} dragStartEventData - event data of Drag#dragstart
 */
TimeResize.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, '.' + config.classname('time-date-event-block')),
        getEventDataFunc,
        eventData;

    if (!timeView || !blockElement) {
        return;
    }

    getEventDataFunc = this._getEventDataFunc = this._retriveEventData(timeView);
    eventData = this._dragStart = getEventDataFunc(
        dragStartEventData.originEvent, {
            targetModelID: domutil.getData(blockElement, 'id')
        }
    );

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event TimeResize#time_resize_dragstart
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move event.
     */
    this.fire('time_resize_dragstart', eventData);
};

/**
 * Drag#drag event handler
 * @emits TimeResize#time_resize_drag
 * @param {object} dragEventData - event data of Drag#drag custom event.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeResize.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var getEventDataFunc = this._getEventDataFunc,
        startEventData = this._dragStart,
        eventData;

    if (!getEventDataFunc || !startEventData) {
        return;
    }

    eventData = getEventDataFunc(dragEventData.originEvent, {
        targetModelID: startEventData.targetModelID
    });

    if (revise) {
        revise(eventData);
    }

    /**
     * @event TimeResize#time_resize_drag
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with drag start position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move event.
     */
    this.fire(overrideEventName || 'time_resize_drag', eventData);
};

/**
 * Update model instance by dragend event results.
 * @fires TimeResize#beforeUpdateEvent
 * @param {object} eventData - event data from TimeResize#time_resize_dragend
 */
TimeResize.prototype._updateEvent = function(eventData) {
    var ctrl = this.baseController,
        modelID = eventData.targetModelID,
        range = eventData.nearestRange,
        timeDiff = range[1] - range[0],
        model = ctrl.events.items[modelID],
        relatedView = eventData.relatedView,
        dateEnd,
        newEnds,
        baseDate;

    if (!model) {
        return;
    }

    timeDiff -= datetime.millisecondsFrom('minutes', 30);

    baseDate = new Date(relatedView.getDate());
    dateEnd = datetime.end(baseDate);
    newEnds = new Date(model.getEnds().getTime() + timeDiff);

    if (newEnds > dateEnd) {
        newEnds = new Date(dateEnd.getTime());
    }

    if (newEnds.getTime() - model.getStarts().getTime() < datetime.millisecondsFrom('minutes', 30)) {
        newEnds = new Date(model.getStarts().getTime() + datetime.millisecondsFrom('minutes', 30));
    }

    /**
     * @event TimeResize#beforeUpdateEvent
     * @type {object}
     * @property {CalEvent} model - model instance to update
     * @property {date} starts - start time to update
     * @property {date} ends - end time to update
     */
    this.fire('beforeUpdateEvent', {
        model: model,
        starts: model.getStarts(),
        ends: newEnds
    });
};

/**
 * Drag#dragEnd event handler
 * @emits TimeResize#time_resize_dragend
 * @param {MouseEvent} dragEndEventData - Mouse event of Drag#dragEnd custom event.
 */
TimeResize.prototype._onDragEnd = function(dragEndEventData) {
    var getEventDataFunc = this._getEventDataFunc,
        dragStart = this._dragStart,
        eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getEventDataFunc || !dragStart) {
        return;
    }

    eventData = getEventDataFunc(dragEndEventData.originEvent, {
        targetModelID: dragStart.targetModelID
    });

    eventData.range = [
        dragStart.timeY,
        eventData.timeY + datetime.millisecondsFrom('hour', 0.5)
    ];

    eventData.nearestRange = [
        dragStart.nearestGridTimeY,
        eventData.nearestGridTimeY + datetime.millisecondsFrom('hour', 0.5)
    ];

    this._updateEvent(eventData);

    /**
     * @event TimeResize#time_resize_dragend
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with drag start position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move event.
     * @property {number[]} range - milliseconds range between drag start and end.
     * @property {number[]} nearestRange - milliseconds range related with nearestGridY between start and end.
     */
    this.fire('time_resize_dragend', eventData);

    this._getEventDataFunc = this._dragStart = null;
};

/**
 * @emits TimeResize#time_resize_click
 */
TimeResize.prototype._onClick = function() {
    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event TimeResize#time_resize_click
     */
    this.fire('time_resize_click');
};

timeCore.mixin(TimeResize);
util.CustomEvents.mixin(TimeResize);

module.exports = TimeResize;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/datetime":27,"../../common/domutil":30,"../../config":36,"./core":65,"./resizeGuide":71}],71:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Module for Time.Resize effect while dragging.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');
var ratio = require('../../common/common').ratio;

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
    this._originEventElement = null;

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

    timeResize.on({
        'time_resize_dragstart': this._onDragStart,
        'time_resize_drag': this._onDrag,
        'time_resize_dragend': this._clearGuideElement,
        'time_resize_click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
TimeResizeGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.timeResize.off(this);
    this.guideElement = this.timeResize = this._getTopFunc =
        this._originEventElement = this._startHeightPixel =
        this._startGridY = this._startTopPixel = null;
};

/**
 * Clear guide element.
 */
TimeResizeGuide.prototype._clearGuideElement = function() {
    var guideElement = this.guideElement,
        originElement = this._originEventElement;

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('resizing'));
    }

    if (originElement) {
        originElement.style.display = 'block';
    }

    domutil.remove(guideElement);

    this.guideElement = this._getTopFunc = this._originEventElement =
        this._startHeightPixel = this._startGridY = this._startTopPixel = null;
};

/**
 * Refresh guide element
 * @param {string} height - guide element's style height.
 */
TimeResizeGuide.prototype._refreshGuideElement = function(height) {
    var guideElement = this.guideElement;

    if (!guideElement) {
        return;
    }

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.height = height + 'px';
        guideElement.style.display = 'block';
    });
};


/**
 * TimeMove#time_move_dragstart event handler
 * @param {object} dragStartEventData - dragstart event data
 */
TimeResizeGuide.prototype._onDragStart = function(dragStartEventData) {
    var originElement = domutil.closest(
            dragStartEventData.target,
            '.' + config.classname('time-date-event-block')
        ),
        guideElement;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('resizing'));
    }

    if (!originElement) {
        return;
    }

    this._startGridY = dragStartEventData.nearestGridY;
    this._startHeightPixel = parseFloat(originElement.style.height);
    this._startTopPixel = parseFloat(originElement.style.top);

    this._originEventElement = originElement;
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
        minHeight,
        maxHeight,
        height;

    height = (this._startHeightPixel + gridYOffsetPixel);
    // at least large than 30min from event start time.
    minHeight = guideTop + ratio(hourLength, viewHeight, 0.5);
    minHeight -= this._startTopPixel;
    // smaller than 24h
    maxHeight = viewHeight - guideTop;

    height = Math.max(height, minHeight);
    height = Math.min(height, maxHeight);

    this._refreshGuideElement(height);
};

module.exports = TimeResizeGuide;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/common":26,"../../common/domutil":30,"../../common/reqAnimFrame":33,"../../config":36}],72:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Model of event.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var datetime = require('../common/datetime');
var dirty = require('../common/dirty');
var model = require('../common/model');

/**
 * The model of calendar events.
 * @constructor
 * @mixes dirty
 * @mixes model
 */
function CalEvent() {
    /**
     * `Optional` unique id for various use.
     * @type {string}
     */
    this.id = '';

    /**
     * title for event.
     * @type {string}
     */
    this.title = '';

    /**
     * is event is all day event?
     * @type {boolean}
     */
    this.isAllDay = false;

    /**
     * event starts
     * @type {Date}
     */
    this.starts = null;

    /**
     * event ends
     * @type {Date}
     */
    this.ends = null;

    /**
     * event text color
     * @type {string}
     */
    this.color = '#000';

    /**
     * event background color
     * @type {string}
     */
    this.bgColor = '#a1b56c';

    // initialize model id
    util.stamp(this);
}

/**********
 * static props
 **********/

CalEvent.schema = {
    required: ['title'],
    dateRange: ['starts', 'ends']
};

/**
 * create event model from json(object) data.
 * @param {object} data object for model.
 * @returns {CalEvent} CalEvent model instance.
 */
CalEvent.create = function(data) {
    var inst = new CalEvent();
    inst.init(data);

    return inst;
};

/**********
 * prototype props
 **********/

/**
 * Initialize event instance.
 * @param {object} options options.
 */
CalEvent.prototype.init = function(options) {
    options = options || {};

    this.id = options.id || '';
    this.title = options.title || '';
    this.isAllDay = util.isExisty(options.isAllDay) ? options.isAllDay : false;

    if (options.starts) {
        this.starts = new Date(options.starts);
    } else {
        this.starts = new Date();
    }

    if (options.ends) {
        this.ends = new Date(options.ends);
    } else {
        this.ends = new Date(this.starts.getTime());
        this.ends.setMinutes(this.ends.getMinutes() + 30);
    }

    this.color = options.color || this.color;
    this.bgColor = options.bgColor || this.bgColor;
};

/**
 * @returns {Date} render start date.
 */
CalEvent.prototype.getStarts = function() {
    return this.starts;
};

/**
 * @returns {Date} render end date.
 */
CalEvent.prototype.getEnds = function() {
    return this.ends;
};

/**
 * @returns {number} instance unique id.
 */
CalEvent.prototype.cid = function() {
    return util.stamp(this);
};

/**
 * Check two event are equals (means title, isAllDay, starts, ends are same)
 * @param {CalEvent} event CalEvent model instance to compare.
 * @returns {boolean} Return false when not same.
 */
CalEvent.prototype.equals = function(event) {
    if (this.id !== event.id) {
        return false;
    }

    if (this.title !== event.title) {
        return false;
    }

    if (this.isAllDay !== event.isAllDay) {
        return false;
    }

    if (datetime.compare(this.getStarts(), event.getStarts()) !== 0) {
        return false;
    }

    if (datetime.compare(this.getEnds(), event.getEnds()) !== 0) {
        return false;
    }

    if (this.color !== event.color) {
        return false;
    }

    if (this.bgColor !== event.bgColor) {
        return false;
    }

    return true;
};

/**
 * return duration between starts and ends.
 * @returns {Date} duration (UTC)
 */
CalEvent.prototype.duration = function() {
    var starts = this.getStarts(),
        ends = this.getEnds(),
        duration;

    if (this.isAllDay) {
        duration = new Date(datetime.end(ends) - datetime.start(starts));
    } else {
        duration = new Date(ends - starts);
    }

    return duration;
};

/**
 * Returns true if the given CalEvent coincides with the same time as the
 * calling CalEvent.
 * @param {CalEvent} event The other event to compare with this CalEvent.
 * @returns {boolean} If the other event occurs within the same time as the first object.
 */
CalEvent.prototype.collidesWith = function(event) {
    var ownStarts = this.getStarts(),
        ownEnds = this.getEnds(),
        starts = event.getStarts(),
        ends = event.getEnds();

    if ((starts > ownStarts && starts < ownEnds) ||
        (ends > ownStarts && ends < ownEnds) ||
        (starts <= ownStarts && ends >= ownEnds)) {
        return true;
    }
    return false;
};

model.mixin(CalEvent.prototype);
dirty.mixin(CalEvent.prototype);

module.exports = CalEvent;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/datetime":27,"../common/dirty":28,"../common/model":31}],73:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Model for views
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;

/**
 * CalEvent ViewModel
 * @constructor
 * @param {CalEvent} event CalEvent instance.
 */
function CalEventViewModel(event) {
    /**
     * The model of event.
     * @type {CalEvent}
     */
    this.model = event;

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
     * Represent event has collide with other events when rendering.
     * @type {boolean}
     */
    this.hasCollide = false;

    /**
     * Extra space at rigth side of this event.
     * @type {number}
     */
    this.extraSpace = 0;

    /**
     * represent this event block is not visible after rendered.
     *
     * in month view, some viewmodel in date need to hide when already rendered before dates.
     *
     * set true then it just shows empty space.
     * @type {boolean}
     */
    this.hidden = false;

    /**
     * represent render start date used at rendering.
     *
     * if set null then use model's 'starts' property.
     * @type {Date}
     */
    this.renderStarts = null;

    /**
     * represent render end date used at rendering.
     *
     * if set null then use model's 'ends' property.
     * @type {Date}
     */
    this.renderEnds = null;
}

/**********
 * static props
 **********/

/**
 * CalEventViewModel factory method.
 * @param {CalEvent} event CalEvent instance.
 * @returns {CalEventViewModel} CalEventViewModel instance.
 */
CalEventViewModel.create = function(event) {
    return new CalEventViewModel(event);
};


/**********
 * prototype props
 **********/

/**
 * return renderStarts property to render properly when specific event that exceed rendering date range.
 *
 * if renderStarts is not set. return model's starts property.
 * @override
 * @returns {Date} render start date.
 */
CalEventViewModel.prototype.getStarts = function() {
    if (this.renderStarts) {
        return this.renderStarts;
    }

    return this.model.starts;
};

/**
 * return renderStarts property to render properly when specific event that exceed rendering date range.
 *
 * if renderEnds is not set. return model's ends property.
 * @override
 * @returns {Date} render end date.
 */
CalEventViewModel.prototype.getEnds = function() {
    if (this.renderEnds) {
        return this.renderEnds;
    }

    return this.model.ends;
};

/**
 * @returns {number} unique number for model.
 */
CalEventViewModel.prototype.cid = function() {
    return util.stamp(this.model);
};

/**
 * Shadowing valueOf method for event sorting.
 * @returns {CalEvent} The model of event.
 */
CalEventViewModel.prototype.valueOf = function() {
    return this.model;
};

/**
 * Link duration method
 * @returns {number} CalEvent#duration result.
 */
CalEventViewModel.prototype.duration = function() {
    return this.model.duration();
};

/**
 * Link collidesWith method
 * @param {CalEvent|CalEventViewModel} viewModel - Model or viewmodel instance of CalEvents.
 * @returns {boolean} CalEvent#collidesWith result.
 */
CalEventViewModel.prototype.collidesWith = function(viewModel) {
    return this.model.collidesWith(viewModel.valueOf());
};

module.exports = CalEventViewModel;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],74:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Layout view. wrap all view containers at outside.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../config');
var domutil = require('../common/domutil');
var Collection = require('../common/collection');
var View = require('./view');

/**
 * Layout view for toggle each child view. It will controlled via navigation UI.
 * @constructor
 * @extends {View}
 * @param {HTMLElement} container Container element to use layout view.
 */
function Layout(container) {
    container = domutil.appendHTMLElement('div', container, config.classname('layout'));

    /**
     * @type {HTMLElement}
     */
    this.container = container;

    /*eslint-disable*/
    /**
     * @type {Collection} Child view collection.
     */
    this.childs = new Collection(function(childView) {
        return childView.viewName;
    });
    /*eslint-enable*/
}

util.inherit(Layout, View);

/**
 * Clear child views.
 */
Layout.prototype.clear = function() {
    this.childs.each(function(childView) {
        childView.destroy();
    });

    this.childs.clear();
    this.container.innerHTML = '';
};

/**
 * Remove child view.
 * @override
 * @param {(string|View)} viewName - name of view or instance.
 */
Layout.prototype.removeChild = function(viewName) {
    this.childs.remove(viewName);
};

/**
 * Toggle child views.
 * @param {string} viewName - Name of view.
 */
Layout.prototype.toggleChildView = function(viewName) {
    var container,
        prefix = ['add', 'remove'],
        flag;

    this.childs.each(function(childView) {
        container = childView.container;
        flag = +(childView.viewName === viewName);
        domutil[prefix[flag] + 'Class'](container, config.classname('hidden'));
    });
};

module.exports = Layout;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/collection":25,"../common/domutil":30,"../config":36,"./view":84}],75:[function(require,module,exports){
(function (global){
/**
 * @fileoverview View of week event container inside of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../config');
var domutil = require('../common/domutil');
var datetime = require('../common/datetime');
var View = require('./view');
var tmpl = require('./template/monthweek.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - view options.
 * @param {number} [options.containerHeight=40] - minimum height of event container element.
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to make create easy.
 * @param {number} [options.eventHeight=18] - height of each event block.
 * @param {number} [options.eventGutter=2] - gutter height of each event block.
 * @param {function} [options._getViewModelFunc] - function for extract partial view model data from whole view models.
 * @param {HTMLDIVElement} container - DOM element to use container for this view.
 */
function MonthWeek(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('allday-monthweek')
    );

    /**
     * @type {object}
     */
    options = this.options = util.extend({
        containerHeight: 40,
        containerBottomGutter: 8,
        eventHeight: 18,
        eventGutter: 2
    }, options);

    options.minHeight = options.containerHeight + options.containerBottomGutter;

    View.call(this, container);
}

util.inherit(MonthWeek, View);

/**
 * @param {object} viewModel - viewModel from parent views.
 * @returns {object} viewModel to rendering.
 */
MonthWeek.prototype._getBaseViewModel = function(viewModel) {
    var options = this.options,
        range = datetime.range(
            viewModel.renderStartDate,
            viewModel.renderEndDate,
            datetime.MILLISECONDS_PER_DAY
        ),
        matrices = options._getViewModelFunc(viewModel),
        widthPercent = 100 / range.length;

    return {
        width: widthPercent,
        height: options.containerHeight,
        eventBlockHeight: options.eventHeight + options.eventGutter,
        eventBlockGutter: options.eventGutter,
        eventHeight: options.eventHeight,
        eventGrid: util.map(range, function() {
            return widthPercent;
        }),
        matrices: matrices
    };
};

/**
 * @override
 * @param {object} viewModel - viewModel from parent views.
 */
MonthWeek.prototype.render = function(viewModel) {
    var baseViewModel = this._getBaseViewModel(viewModel),
        maxEventInDay = 0;

    maxEventInDay = Math.max.apply(null, util.map(baseViewModel.matrices, function(matrix) {
        return Math.max.apply(null, util.map(matrix, function(row) {
            return row.length;
        }));
    }));

    this.resize(maxEventInDay);

    this.container.innerHTML = tmpl(baseViewModel);
};

/**
 * Resize MonthWeek container and send information to parent views.
 * @override
 * @param {number} maxEventInDay - how largest event block in one day?
 */
MonthWeek.prototype.resize = function(maxEventInDay) {
    var options = this.options,
        newHeight = (maxEventInDay * (options.eventHeight + options.eventGutter)) + options.containerBottomGutter;

    newHeight = Math.max(newHeight, options.minHeight);
    
    this.container.style.minHeight = newHeight + 'px';
};

module.exports = MonthWeek;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/datetime":27,"../common/domutil":30,"../config":36,"./template/monthweek.hbs":78,"./view":84}],76:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51,"hbsfy/runtime":21}],77:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Helpers for handlebar templates.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var common = require('../../common/common');
var config = require('../../config');

function getElSize(value, postfix, prefix) {
    prefix = prefix || '';
    if (util.isNumber(value)) {
        return prefix + ':' + value + postfix;
    }

    return prefix + ':auto';
}

module.exports = {
    'stamp': function(obj) {
        return util.stamp(obj);
    },

    'equal': function(a, b) {
        return a === b;
    },

    'or': function(a, b) {
        return a || b;
    },

    'fi': function(a, oper, b, options) {
        switch (oper) {
            case '==':
                return (a == b) ? options.fn(this) : options.inverse(this);
            case '===':
                return  (a === b) ? options.fn(this) : options.inverse(this);
            default:
                break;
        }
    },

    'common-width': function(width) {
        return getElSize(width, '%', 'width');
    },

    /**
     * Use in time.hbs
     * @param {CalEventViewModel} eventViewModel viewModel
     * @returns {string} element size css class
     */
    'time-eventBlock': function(eventViewModel) {
        var top = getElSize(eventViewModel.top, 'px', 'top'),
            left = getElSize(eventViewModel.left, '%', 'left'),
            width = getElSize(eventViewModel.width, '%', 'width'),
            height = getElSize(eventViewModel.height, 'px', 'height');

        return [top, left, width, height].join(';');
    },

    /**
     * Use in dayname.hbs
     * @returns {string} css class
     */
    'dayname-isHolliday': function() {
        if (this.day === 0 || this.day === 6) {
            return config.classname('dayname') + ' ' + config.classname('holliday');
        }

        return config.classname('dayname');
    },

    'multiply': function(a, b) {
        return a * b;
    },

    'CSS_PREFIX': function() {
        return config.cssPrefix;
    },


    /**********
     * Default event template
     **********/

    'milestone-tmpl': function(model) {
        return '<span class="' + config.classname('dot') + '" style="background-color:' + model.bgColor + '"></span> ' + common.stripTags(model.title);
    },

    'task-tmpl': function(model) {
        return '<span class="' + config.classname('dot') + '" style="background-color:' + model.bgColor + '"></span> ' + common.stripTags(model.title);
    },

    'taskTitle-tmpl': function() {
        return '업무';
    },

    'allday-tmpl': function(model) {
        return common.stripTags(model.title);
    },

    'time-tmpl': function(model) {
        return common.stripTags(model.title);
    }
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/common":26,"../../config":36}],78:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "monthweek-grid-line\" style=\"width:"
    + alias3(container.lambda(depth0, depth0))
    + "%;left:"
    + alias3((helpers.multiply || (depth0 && depth0.multiply) || alias2).call(alias1,depth0,(data && data.index),{"name":"multiply","hash":{},"data":data}))
    + "%;\">&nbsp;</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " \n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " \n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},depth0,{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function", alias5=container.lambda;

  return " \n<div data-id=\""
    + alias3((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\" \n    class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "allday-event-block "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.renderStarts : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.renderEnds : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"\n    style=\"top:"
    + alias3((helpers.multiply || (depth0 && depth0.multiply) || alias2).call(alias1,(depth0 != null ? depth0.top : depth0),((stack1 = (data && data.root)) && stack1.eventBlockHeight),{"name":"multiply","hash":{},"data":data}))
    + "px;left:"
    + alias3((helpers.multiply || (depth0 && depth0.multiply) || alias2).call(alias1,(depth0 != null ? depth0.left : depth0),((stack1 = (data && data.root)) && stack1.width),{"name":"multiply","hash":{},"data":data}))
    + "%;width:"
    + alias3((helpers.multiply || (depth0 && depth0.multiply) || alias2).call(alias1,(depth0 != null ? depth0.width : depth0),((stack1 = (data && data.root)) && stack1.width),{"name":"multiply","hash":{},"data":data}))
    + "%;height:"
    + alias3(alias5(((stack1 = (data && data.root)) && stack1.eventBlockHeight), depth0))
    + "px;margin-top:"
    + alias3(alias5(((stack1 = (data && data.root)) && stack1.eventBlockGutter), depth0))
    + "px\">\n    <div class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "allday-event\" style=\"height:"
    + alias3(alias5(((stack1 = (data && data.root)) && stack1.eventHeight), depth0))
    + "px;color:"
    + alias3(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + ";background-color:"
    + alias3(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.bgColor : stack1), depth0))
    + "\">\n        <span class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "allday-event-title\">"
    + ((stack1 = (helpers["allday-tmpl"] || (depth0 && depth0["allday-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"allday-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>\n        <span class=\""
    + alias3(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "allday-resize-handle handle-y\">&nbsp;</span>\n    </div> \n</div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "allday-exceed-left";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return " "
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "allday-exceed-right";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "monthweek-grid\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.eventGrid : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "monthweek-events\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.matrices : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

},{"hbsfy/runtime":21}],79:[function(require,module,exports){
(function (global){
/**
 * @fileoverview Register developed custom handlebars helper.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var helper = require('./helper');
var Handlebars = require('hbsfy/runtime');

util.forEach(helper, function(helper, name) {
    Handlebars.registerHelper(name, helper);
}, this);


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./helper":77,"hbsfy/runtime":21}],80:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "allday-left\">\n    <span>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n</div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "allday-right\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "allday-monthweek-container\"></div>\n</div>\n";
},"useData":true});

},{"hbsfy/runtime":21}],81:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers["dayname-isHolliday"] || (depth0 != null ? depth0["dayname-isHolliday"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dayname-isHolliday","hash":{},"data":data}) : helper)))
    + "\" style=\""
    + alias4((helpers["common-width"] || (depth0 && depth0["common-width"]) || alias2).call(alias1,(depth0 != null ? depth0.width : depth0),{"name":"common-width","hash":{},"data":data}))
    + ";left:"
    + alias4((helpers.multiply || (depth0 && depth0.multiply) || alias2).call(alias1,(data && data.index),(depth0 != null ? depth0.width : depth0),{"name":"multiply","hash":{},"data":data}))
    + "%\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dayname-label\">"
    + alias4(((helper = (helper = helpers.dayName || (depth0 != null ? depth0.dayName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dayName","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dayname-date\">"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\""
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "dayname-leftmargin\">\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

},{"hbsfy/runtime":21}],82:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},depth0,{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-date-event-block\" data-id=\""
    + alias4((helpers.stamp || (depth0 && depth0.stamp) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"stamp","hash":{},"data":data}))
    + "\" style=\""
    + alias4((helpers["time-eventBlock"] || (depth0 && depth0["time-eventBlock"]) || alias2).call(alias1,depth0,{"name":"time-eventBlock","hash":{},"data":data}))
    + "\">\n            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-event\" style=\"color:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.color : stack1), depth0))
    + ";background-color:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.bgColor : stack1), depth0))
    + "\">"
    + ((stack1 = (helpers["time-tmpl"] || (depth0 && depth0["time-tmpl"]) || alias2).call(alias1,(depth0 != null ? depth0.model : depth0),{"name":"time-tmpl","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n            <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "time-resize-handle handle-x\">&nbsp;</div>\n        </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.matrices : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

},{"hbsfy/runtime":21}],83:[function(require,module,exports){
// hbsfy compiled Handlebars template
var HandlebarsCompiler = require('hbsfy/runtime');
module.exports = HandlebarsCompiler.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hour "
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hour-"
    + alias4(((helper = (helper = helpers.hour || (depth0 != null ? depth0.hour : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hour","hash":{},"data":data}) : helper)))
    + "\"><span>"
    + alias4(((helper = (helper = helpers.hour || (depth0 != null ? depth0.hour : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hour","hash":{},"data":data}) : helper)))
    + "</span></div>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\""
    + container.escapeExpression(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-gridline\"></div>\n    ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-left\">\n    "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.hours : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-right\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-h-grid\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.hours : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-events\">\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-events-container\"></div>\n    </div>\n</div>\n<div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker\" style=\"display:none;\">\n    <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker-wrap\">\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker-line\"></div>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-hourmarker-time\">00:00</div>\n        <div class=\""
    + alias4(((helper = (helper = helpers.CSS_PREFIX || (depth0 != null ? depth0.CSS_PREFIX : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"CSS_PREFIX","hash":{},"data":data}) : helper)))
    + "timegrid-todaymarker\">today</div>\n    </div>\n</div>\n";
},"useData":true});

},{"hbsfy/runtime":21}],84:[function(require,module,exports){
(function (global){
/**
 * @fileoverview The base class of views.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var domutil = require('../common/domutil');
var Collection = require('../common/collection');

/**
 * Base class of views.
 *
 * All views create own container element inside supplied container element.
 * @constructor
 * @param {HTMLElement} container Default container element for view. you can use this element for this.container syntax.
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
    this.childs = new Collection(function(view) {
        return util.stamp(view);
    });
    /*eslint-enable*/

    /**
     * parent view instance.
     * @type {View}
     */
    this.parent = null;
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

    this.childs.add(view);
};

/**
 * Remove added child view.
 * @param {(number|View)} id View id or instance itself to remove.
 * @param {function} [fn] Function for invoke before remove. parent view class is supplied first arguments.
 */
View.prototype.removeChild = function(id, fn) {
    var view = util.isNumber(id) ? this.childs.items[id] : id;

    id = util.stamp(view);

    if (fn) {
        fn.call(view, this);
    }

    this.childs.remove(id);
};

/**
 * Render view recursively.
 */
View.prototype.render = function() {
    this.childs.each(function(childView) {
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

    this.childs.each(function(childView) {
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
    this.childs.clear();
    this.container.innerHTML = '';

    this.id = this.parent = this.childs = this.container = null;
};

/*eslint-disable*/
/**
 * Destroy child view recursively.
 */
View.prototype.destroy = function(isChildView) {
    this.childs.each(function(childView) {
        childView.destroy(true);
        childView._destroy();
    });

    if (isChildView) {
        return;
    }

    this._destroy();
};
/*eslint-enable*/

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

module.exports = View;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/collection":25,"../common/domutil":30}],85:[function(require,module,exports){
(function (global){
/**
 * @fileoverview View of allday event container inside of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');
var View = require('../view');
var MonthWeek = require('../monthweek');
var mainTmpl = require('../template/week/allday.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options The object for view customization.
 * @param {string} options.renderStartDate - start date of allday view's render date. YYYY-MM-DD
 * @param {string} options.renderEndDate - end date of allday view's render date. YYYY-MM-DD
 * @param {number} [options.height=60] - minimum height of event container element.
 * @param {number} [options.eventBlockHeight=18] - height of each event block.
 * @param {number} [options.eventBlockGutter=2] - gutter height of each event block.
 * @param {function} [options._getViewModelFunc] - function for extract partial view model data from whole view models.
 * @param {HTMLElement} container Container element.
 */
function Allday(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('allday-container')
    );

    /**
     * rendering options.
     * @type {object}
     */
    this.options = util.extend({
        title: '종일일정',
        renderStartDate: '',
        renderEndDate: '',
        containerHeight: 60,
        containerBottomGutter: 8,
        eventHeight: 18,
        eventGutter: 2,
        _getViewModelFunc: function(viewModel) {
            return viewModel.eventsInDateRange.allday;
        }
    }, options);

    View.call(this, container);
}

util.inherit(Allday, View);

/**
 * create month week view model for render allday events in top of week views.
 * @override
 * @param {object} viewModel - viewModel from parent views.
 */
Allday.prototype.render = function(viewModel) {
    var container = this.container,
        monthWeekInst;

    container.innerHTML = mainTmpl(this.options);

    this.childs.clear();

    monthWeekInst = new MonthWeek(
        this.options, 
        domutil.find('.' + config.classname('allday-monthweek-container'), container)
    );

    this.addChild(monthWeekInst);

    this.childs.each(function(childView) {
        childView.render(viewModel);
    });
};

module.exports = Allday;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/domutil":30,"../../config":36,"../monthweek":75,"../template/week/allday.hbs":80,"../view":84}],86:[function(require,module,exports){
(function (global){
/**
 * @fileoverview View for rendering daynames
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var View = require('../view');
var daynameTmpl = require('../template/week/daynames.hbs');

/**
 * @constructor
 * @param {object} options - options for dayname view
 * @param {HTMLElement} container Container element to use.
 * @extends {View}
 */
function DayName(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('dayname-container')
    );

    this.options = util.extend({
        daynames: ['일', '월', '화', '수', '목', '금', '토']
    }, options);

    View.call(this, container);
}

util.inherit(DayName, View);

/**
 * Get default viewmodels.
 * @param {Date} start The date of start render
 * @param {Date} end The end of end render
 * @returns {array} viewmodel.
 */
DayName.prototype._getBaseViewModel = function(start, end) {
    var daynames = this.options.daynames,
        viewModel;

    viewModel = util.map(datetime.range(
        datetime.start(start),
        datetime.start(end),
        datetime.MILLISECONDS_PER_DAY
    ), function(d, i, arr) {
        var day = d.getDay();

        return {
            day: day,
            dayName: daynames[day],
            date: d.getDate(),
            width: 100 / arr.length
        };
    });

    return viewModel;
};

/**
 * @override
 * @param {object} viewModel View model from parent (WeekView)
 */
DayName.prototype.render = function(viewModel) {
    var _viewModel = this._getBaseViewModel(
        viewModel.renderStartDate,
        viewModel.renderEndDate
    );

    this.container.innerHTML = daynameTmpl(_viewModel);
};

module.exports = DayName;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/datetime":27,"../../common/domutil":30,"../../config":36,"../template/week/daynames.hbs":81,"../view":84}],87:[function(require,module,exports){
(function (global){
/**
 * @fileoverview View of time.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var View = require('../view');
var timeTmpl = require('../template/week/time.hbs');
var forEachArr = util.forEachArray;

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
 */
function Time(options, container) {
    View.call(this, container);

    this.options = util.extend({
        index: 0,
        width: 0,
        ymd: '',
        isToday: false,
        hourStart: 0,
        hourEnd: 24
    }, options);

    container.style.width = options.width + '%';
    container.style.left = (options.index * options.width) + '%';

    if (this.options.isToday) {
        domutil.addClass(this.container, config.classname('time-date-today'));
    }
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

    return new Date(y, m - 1, d);
};

/**
 * @param {CalEventViewModel} viewModel - view model instance to calculate bound.
 * @param {object} options - options for calculating event element's bound.
 * @param {Date} options.todayStart - date object represent event date's start (00:00:00)
 * @param {number} options.baseMS - the number of milliseconds to render event blocks.
 * @param {number} options.baseHeight - pixel value related with baseMS options.
 * @param {number[]} options.baseLeft - left position percents for each columns.
 * @param {number} options.baseWidth - the unit of event blocks width percent.
 * @param {number} options.columnIndex - the number index of event blocks.
 * it represent rendering index from left sides in view.
 * @returns {object} bound object for supplied view model.
 */
Time.prototype.getEventViewBound = function(viewModel, options) {
    var baseMS = options.baseMS,
        baseHeight = options.baseHeight,
        offsetStart,
        width,
        height,
        top;

    offsetStart = viewModel.valueOf().starts - options.todayStart;

    // containerHeight : milliseconds in day = x : event's milliseconds
    top = (baseHeight * offsetStart) / baseMS;
    height = (baseHeight * viewModel.duration()) / baseMS;
    width = options.baseWidth * (viewModel.extraSpace + 1);

    // set width auto when has no collisions.
    if (!viewModel.hasCollide) {
        width = null;
    }

    return {
        top: top,
        left: options.baseLeft[options.columnIndex],
        width: width,
        height: height
    };
};

/**
 * Set viewmodels for rendering.
 * @param {string} ymd The date of events. YYYYMMDD format.
 * @param {array} matrices The matrices for event placing.
 */
Time.prototype._getBaseViewModel = function(ymd, matrices) {
    var options = this.options,
        hourStart = options.hourStart,
        hourEnd = options.hourEnd,
        containerHeight,
        todayStart,
        baseMS;

    /**
     * Calculate each event element bounds relative with rendered hour milliseconds and
     * wrap each event model to viewmodels.
     */
    containerHeight = this.getViewBound().height;
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

                viewBound = this.getEventViewBound(viewModel, {
                    todayStart: todayStart,
                    baseMS: baseMS,
                    baseLeft: leftPercents,
                    baseWidth: widthPercent,
                    baseHeight: containerHeight,
                    columnIndex: col
                });

                util.extend(viewModel, viewBound);
            }, this);
        }, this);
    }, this);
};

/**
 * @returns {Date} - Date of this view.
 */
Time.prototype.getDate = function() {
    return this._parseDateGroup(this.options.ymd);
};


/**
 * @override
 * @param {string} ymd The date of events. YYYYMMDD format
 * @param {array} matrices Matrices for placing events
 */
Time.prototype.render = function(ymd, matrices) {
    this._getBaseViewModel(ymd, matrices);
    this.container.innerHTML = timeTmpl({
        matrices: matrices
    });
};

module.exports = Time;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/datetime":27,"../../common/domutil":30,"../../config":36,"../template/week/time.hbs":82,"../view":84}],88:[function(require,module,exports){
(function (global){
/**
 * @fileoverview View for rendered events by times.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');
var datetime = require('../../common/datetime');
var reqAnimFrame = require('../../common/reqAnimFrame');
var View = require('../view');
var Time = require('./time');
var AutoScroll = require('../../common/autoScroll');
var mainTmpl = require('../template/week/timeGrid.hbs');

var PIXEL_RENDER_ERROR = 0.5;
var HOURMARKER_REFRESH_INTERVAL = 1000 * 10;
var INITIAL_AUTOSCROLL_DELAY = util.browser.msie ? 100 : 50;

/**
 * @constructor
 * @extends {View}
 * @param {object} options The object for view customization.
 * @param {number} [options.hourStart=0] You can change view's start hours.
 * @param {number} [options.hourEnd=0] You can change view's end hours.
 * @param {HTMLElement} container Container element.
 */
function TimeGrid(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('timegrid-container')
    );

    View.call(this, container);

    if (!util.browser.safari) {
        /**
         * @type {AutoScroll}
         */
        this._autoScroll = new AutoScroll(container);
    }

    /**
     * Time view options.
     * @type {object}
     */
    this.options = util.extend({
        hourStart: 0,
        hourEnd: 24
    }, options);

    /**
     * Interval id for hourmarker animation.
     * @type {number}
     */
    this.intervalID = 0;

    /**
     * @type {boolean}
     */
    this._scrolled = false;

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
    window.clearInterval(this.intervalID);

    if (this._autoScroll) {
        this._autoScroll.destroy();
    }

    this._autoScroll = this.hourmarker = null;
};

/**
 * Get base viewModel.
 * @returns {object} ViewModel
 */
TimeGrid.prototype._getBaseViewModel = function() {
    var options = this.options,
        end = options.hourEnd,
        i = options.hourStart,
        hours = [];

    for (; i < end; i += 1) {
        hours.push({hour: i});
    }

    return {hours: hours};
};

/**
 * Reconcilation child views and render.
 * @param {object} viewModels Viewmodel
 * @param {number} width The width percent of each time view.
 * @param {HTMLElement} container Container element for each time view.
 */
TimeGrid.prototype._renderChilds = function(viewModels, width, container) {
    var options = this.options,
        childOption,
        child,
        isToday,
        today = datetime.format(new Date(), 'YYYYMMDD'),
        i = 0;

    // clear contents
    container.innerHTML = '';
    this.childs.clear();
    this.todaymarkerLeft = null;

    // reconcilation of child views
    util.forEach(viewModels, function(events, ymd) {
        isToday = ymd === today;

        if (isToday) {
            this.todaymarkerLeft = width * this.childs.length;
        }

        childOption = {
            index: i,
            width: width,
            ymd: ymd,
            isToday: isToday,
            hourStart: options.hourStart,
            hourEnd: options.hourEnd
        };

        child = new Time(
            childOption,
            domutil.appendHTMLElement('div', container, config.classname('time-date'))
        );
        child.render(ymd, events);

        this.addChild(child);

        i += 1;
    }, this);
};

/**
 * @override
 * @param {object} viewModel ViewModel list from Week view.
 */
TimeGrid.prototype.render = function(viewModel) {
    var timeViewModel = viewModel.eventsInDateRange.time,
        container = this.container,
        baseViewModel = this._getBaseViewModel(),
        eventLen = util.keys(timeViewModel).length;

    if (!eventLen) {
        return;
    }

    container.innerHTML = mainTmpl(baseViewModel);

    /**********
     * Render childs
     **********/
    this._renderChilds(
        timeViewModel,
        100 / eventLen,
        domutil.find('.' + config.classname('timegrid-events-container'), container)
    );

    this._hourLabels = domutil.find('ul', container);

    /**********
     * Render hourmarker
     **********/
    this.hourmarker = domutil.find('.' + config.classname('timegrid-hourmarker'), container);
    this.refreshHourmarker();

    if (!this._scrolled) {
        this._scrolled = true;
        this.scrollToNow();
    }
};

/**
 * Refresh hourmarker element.
 */
TimeGrid.prototype.refreshHourmarker = function() {
    var hourLabels = this._hourLabels,
        hourmarker = this.hourmarker,

        viewModel = this._getHourmarkerViewModel(),
        todaymarkerLeft = this.todaymarkerLeft,
        todaymarker,
        text,
        labelToVisible,
        labelToInvisible;

    if (!hourmarker || !viewModel) {
        return;
    }

    todaymarker = domutil.find('.' + config.classname('timegrid-todaymarker'), hourmarker);
    text = domutil.find('.' + config.classname('timegrid-hourmarker-time'), hourmarker);
    labelToVisible = domutil.find('.' + config.classname('invisible'), hourLabels);
    labelToInvisible = domutil.find('.' + config.classname('timegrid-hour-') + viewModel.hour, hourLabels);

    reqAnimFrame.requestAnimFrame(function() {
        if (labelToVisible !== labelToInvisible) {
            if (labelToVisible) {
                domutil.removeClass(labelToVisible, config.classname('invisible'));
            }

            if (labelToInvisible) {
                domutil.addClass(labelToInvisible, config.classname('invisible'));
            }
        }

        hourmarker.style.display = 'block';
        hourmarker.style.top = (viewModel.top - PIXEL_RENDER_ERROR) + 'px';

        if (!util.isNull(todaymarkerLeft)) {
            todaymarker.style.display = 'block';
            todaymarker.style.left = todaymarkerLeft + '%';
        } else {
            todaymarker.style.display = 'none';
        }

        text.innerHTML = viewModel.text;
    });
};

/**
 * Return grid size.
 * @returns {number[]} The size of grid element.
 */
TimeGrid.prototype._getGridSize = function() {
    var childNode = this.container.childNodes[0];

    if (!childNode) {
        return false;
    }

    return domutil.getSize(childNode);
};

/**
 * @param {Date} [time] - date object to convert pixel in grids.
 * use **Date.now()** when not supplied.
 * @returns {number} The pixel value represent current time in grids.
 */
TimeGrid.prototype._getTopByTime = function(time) {
    var now = util.isDate(time) ? new Date(time.getTime()) : new Date(),
        start = datetime.start(now),
        hourStart = this.options.hourStart,
        gridSize = this._getGridSize(),
        offset,
        top;

    if (!gridSize) {
        return 0;
    }

    offset = +now - +start;
    if (hourStart) {
        offset -= datetime.millisecondsFrom('hour', hourStart);
    }

    top = (offset * gridSize[1]) / (datetime.millisecondsFrom('hour', this._getBaseViewModel().hours.length));

    return top;
};

/**
 * Get Hourmarker viewmodel.
 * @returns {object} ViewModel of hourmarker.
 */
TimeGrid.prototype._getHourmarkerViewModel = function() {
    var now = new Date();

    return {
        top: this._getTopByTime(),
        hour: now.getHours(),
        text: datetime.format(now, 'HH:mm')
    };
};

/**
 * Attach events
 */
TimeGrid.prototype.attachEvent = function() {
    window.clearInterval(this.intervalID);
    this.intervalID = window.setInterval(util.bind(this.onTick, this), HOURMARKER_REFRESH_INTERVAL);
};

/**
 * Scroll time grid to current hourmarker.
 */
TimeGrid.prototype.scrollToNow = function() {
    var container = this.container;

    window.setTimeout(util.bind(function() {
        var currentHourTop = this._getTopByTime(),
            viewBound = this.getViewBound();

        container.scrollTop = (currentHourTop - (viewBound.height / 2));
    }, this), INITIAL_AUTOSCROLL_DELAY);
};

/**********
 * CalEvent handlers
 **********/

/**
 * Interval tick handler
 */
TimeGrid.prototype.onTick = function() {
    this.refreshHourmarker();
};

module.exports = TimeGrid;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/autoScroll":24,"../../common/datetime":27,"../../common/domutil":30,"../../common/reqAnimFrame":33,"../../config":36,"../template/week/timeGrid.hbs":83,"../view":84,"./time":87}],89:[function(require,module,exports){
(function (global){
/**
 * @fileoverview View of days UI.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');
var datetime = require('../../common/datetime');
var View = require('../view');

/**
 * @constructor
 * @param {Base.Week} controller The controller mixin part.
 * @param {object} options View options
 * @param {string} [options.renderStartDate] Start date of render. if not supplied then use -3d from today. YYYY-MM-DD format.
 * @param {string} [options.renderEndDate] End date of render. if not supplied then use +3d from today. YYYY-MM-DD format.
 * @param {string} [options.cssPrefix] - CSS classname prefix
 * @param {HTMLElement} container The element to use container for this view.
 * @extends {View}
 */
function Week(controller, options, container) {
    var range;

    container = domutil.appendHTMLElement('div', container);

    View.call(this, container);

    domutil.addClass(container, config.classname('week-container'));

    range = this._getRenderDateRange(new Date());

    /**
     * @type {object} Options for view.
     */
    this.options = util.extend({
        renderStartDate: datetime.format(range.start, 'YYYY-MM-DD'),
        renderEndDate: datetime.format(range.end, 'YYYY-MM-DD')
    }, options);

    /**
     * Week controller mixin.
     * @type {Base.Week}
     */
    this.controller = controller;
}

util.inherit(Week, View);

/**********
 * Override props
 **********/

/**
 * Render each child view with events in ranges.
 * @fires Week#afterRender
 * @override
 */
Week.prototype.render = function() {
    var options = this.options,
        renderStartDate = datetime.parse(options.renderStartDate),
        renderEndDate = datetime.parse(options.renderEndDate),
        eventsInDateRange = this.controller.findByDateRange(
            datetime.start(renderStartDate),
            datetime.end(renderEndDate)
        ),
        viewModel = {
            eventsInDateRange: eventsInDateRange,
            renderStartDate: renderStartDate,
            renderEndDate: renderEndDate
        };

    this.childs.each(function(childView) {
        childView.render(viewModel);
    });

    /**
     * @event Week#afterRender
     */
    this.fire('afterRender');
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
        start = new Date(+base),
        end = new Date(+base);

    start.setDate(start.getDate() - 3);
    end.setDate(end.getDate() + 3);

    return {
        start: start,
        end: end
    };
};

util.CustomEvents.mixin(Week);

module.exports = Week;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../common/datetime":27,"../../common/domutil":30,"../../config":36,"../view":84}]},{},[1]);
