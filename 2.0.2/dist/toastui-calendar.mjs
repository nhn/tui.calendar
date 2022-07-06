/*!
 * TOAST UI Calendar 2nd Edition
 * @version 2.0.2 | Wed Jul 06 2022
 * @author NHN Cloud FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a5, b4) => {
  for (var prop in b4 || (b4 = {}))
    if (__hasOwnProp.call(b4, prop))
      __defNormalProp(a5, prop, b4[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b4)) {
      if (__propIsEnum.call(b4, prop))
        __defNormalProp(a5, prop, b4[prop]);
    }
  return a5;
};
var __spreadProps = (a5, b4) => __defProps(a5, __getOwnPropDescs(b4));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// ../../node_modules/tui-code-snippet/type/isUndefined.js
var require_isUndefined = __commonJS({
  "../../node_modules/tui-code-snippet/type/isUndefined.js"(exports, module) {
    "use strict";
    function isUndefined2(obj) {
      return obj === void 0;
    }
    module.exports = isUndefined2;
  }
});

// ../../node_modules/tui-code-snippet/array/range.js
var require_range = __commonJS({
  "../../node_modules/tui-code-snippet/array/range.js"(exports, module) {
    "use strict";
    var isUndefined2 = require_isUndefined();
    function range3(start, stop, step) {
      var arr = [];
      var flag;
      if (isUndefined2(stop)) {
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
    module.exports = range3;
  }
});

// ../../node_modules/tui-code-snippet/type/isBoolean.js
var require_isBoolean = __commonJS({
  "../../node_modules/tui-code-snippet/type/isBoolean.js"(exports, module) {
    "use strict";
    function isBoolean(obj) {
      return typeof obj === "boolean" || obj instanceof Boolean;
    }
    module.exports = isBoolean;
  }
});

// ../../node_modules/tui-code-snippet/type/isNumber.js
var require_isNumber = __commonJS({
  "../../node_modules/tui-code-snippet/type/isNumber.js"(exports, module) {
    "use strict";
    function isNumber(obj) {
      return typeof obj === "number" || obj instanceof Number;
    }
    module.exports = isNumber;
  }
});

// ../../node_modules/tui-code-snippet/type/isObject.js
var require_isObject = __commonJS({
  "../../node_modules/tui-code-snippet/type/isObject.js"(exports, module) {
    "use strict";
    function isObject(obj) {
      return obj === Object(obj);
    }
    module.exports = isObject;
  }
});

// ../../node_modules/tui-code-snippet/type/isString.js
var require_isString = __commonJS({
  "../../node_modules/tui-code-snippet/type/isString.js"(exports, module) {
    "use strict";
    function isString2(obj) {
      return typeof obj === "string" || obj instanceof String;
    }
    module.exports = isString2;
  }
});

// ../../node_modules/dompurify/dist/purify.js
var require_purify = __commonJS({
  "../../node_modules/dompurify/dist/purify.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.DOMPurify = factory());
    })(exports, function() {
      "use strict";
      function _typeof(obj) {
        "@babel/helpers - typeof";
        return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
          return typeof obj2;
        } : function(obj2) {
          return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, _typeof(obj);
      }
      function _setPrototypeOf(o5, p5) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o6, p6) {
          o6.__proto__ = p6;
          return o6;
        };
        return _setPrototypeOf(o5, p5);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          }));
          return true;
        } catch (e3) {
          return false;
        }
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct;
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a5 = [null];
            a5.push.apply(a5, args2);
            var Constructor2 = Function.bind.apply(Parent2, a5);
            var instance = new Constructor2();
            if (Class2)
              _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr))
          return _arrayLikeToArray(arr);
      }
      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
          return Array.from(iter);
      }
      function _unsupportedIterableToArray(o5, minLen) {
        if (!o5)
          return;
        if (typeof o5 === "string")
          return _arrayLikeToArray(o5, minLen);
        var n4 = Object.prototype.toString.call(o5).slice(8, -1);
        if (n4 === "Object" && o5.constructor)
          n4 = o5.constructor.name;
        if (n4 === "Map" || n4 === "Set")
          return Array.from(o5);
        if (n4 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n4))
          return _arrayLikeToArray(o5, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i5 = 0, arr2 = new Array(len); i5 < len; i5++)
          arr2[i5] = arr[i5];
        return arr2;
      }
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var hasOwnProperty = Object.hasOwnProperty, setPrototypeOf = Object.setPrototypeOf, isFrozen = Object.isFrozen, getPrototypeOf = Object.getPrototypeOf, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var freeze = Object.freeze, seal = Object.seal, create = Object.create;
      var _ref = typeof Reflect !== "undefined" && Reflect, apply = _ref.apply, construct = _ref.construct;
      if (!apply) {
        apply = function apply2(fun, thisValue, args) {
          return fun.apply(thisValue, args);
        };
      }
      if (!freeze) {
        freeze = function freeze2(x6) {
          return x6;
        };
      }
      if (!seal) {
        seal = function seal2(x6) {
          return x6;
        };
      }
      if (!construct) {
        construct = function construct2(Func, args) {
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
        return function(thisArg) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return apply(func, thisArg, args);
        };
      }
      function unconstruct(func) {
        return function() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return construct(func, args);
        };
      }
      function addToSet(set, array) {
        if (setPrototypeOf) {
          setPrototypeOf(set, null);
        }
        var l5 = array.length;
        while (l5--) {
          var element = array[l5];
          if (typeof element === "string") {
            var lcElement = stringToLowerCase(element);
            if (lcElement !== element) {
              if (!isFrozen(array)) {
                array[l5] = lcElement;
              }
              element = lcElement;
            }
          }
          set[element] = true;
        }
        return set;
      }
      function clone3(object) {
        var newObject = create(null);
        var property;
        for (property in object) {
          if (apply(hasOwnProperty, object, [property])) {
            newObject[property] = object[property];
          }
        }
        return newObject;
      }
      function lookupGetter(object, prop) {
        while (object !== null) {
          var desc = getOwnPropertyDescriptor(object, prop);
          if (desc) {
            if (desc.get) {
              return unapply(desc.get);
            }
            if (typeof desc.value === "function") {
              return unapply(desc.value);
            }
          }
          object = getPrototypeOf(object);
        }
        function fallbackValue(element) {
          console.warn("fallback value for", element);
          return null;
        }
        return fallbackValue;
      }
      var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
      var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
      var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
      var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
      var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]);
      var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
      var text = freeze(["#text"]);
      var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]);
      var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
      var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
      var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
      var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
      var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
      var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
      var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
      var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
      var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
      var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
      var DOCTYPE_NAME = seal(/^html$/i);
      var getGlobal = function getGlobal2() {
        return typeof window === "undefined" ? null : window;
      };
      var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, document2) {
        if (_typeof(trustedTypes) !== "object" || typeof trustedTypes.createPolicy !== "function") {
          return null;
        }
        var suffix = null;
        var ATTR_NAME = "data-tt-policy-suffix";
        if (document2.currentScript && document2.currentScript.hasAttribute(ATTR_NAME)) {
          suffix = document2.currentScript.getAttribute(ATTR_NAME);
        }
        var policyName = "dompurify" + (suffix ? "#" + suffix : "");
        try {
          return trustedTypes.createPolicy(policyName, {
            createHTML: function createHTML(html2) {
              return html2;
            }
          });
        } catch (_5) {
          console.warn("TrustedTypes policy " + policyName + " could not be created.");
          return null;
        }
      };
      function createDOMPurify() {
        var window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
        var DOMPurify2 = function DOMPurify3(root) {
          return createDOMPurify(root);
        };
        DOMPurify2.version = "2.3.8";
        DOMPurify2.removed = [];
        if (!window2 || !window2.document || window2.document.nodeType !== 9) {
          DOMPurify2.isSupported = false;
          return DOMPurify2;
        }
        var originalDocument = window2.document;
        var document2 = window2.document;
        var DocumentFragment = window2.DocumentFragment, HTMLTemplateElement = window2.HTMLTemplateElement, Node = window2.Node, Element2 = window2.Element, NodeFilter = window2.NodeFilter, _window$NamedNodeMap = window2.NamedNodeMap, NamedNodeMap = _window$NamedNodeMap === void 0 ? window2.NamedNodeMap || window2.MozNamedAttrMap : _window$NamedNodeMap, HTMLFormElement = window2.HTMLFormElement, DOMParser = window2.DOMParser, trustedTypes = window2.trustedTypes;
        var ElementPrototype = Element2.prototype;
        var cloneNode = lookupGetter(ElementPrototype, "cloneNode");
        var getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
        var getChildNodes = lookupGetter(ElementPrototype, "childNodes");
        var getParentNode = lookupGetter(ElementPrototype, "parentNode");
        if (typeof HTMLTemplateElement === "function") {
          var template = document2.createElement("template");
          if (template.content && template.content.ownerDocument) {
            document2 = template.content.ownerDocument;
          }
        }
        var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
        var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML("") : "";
        var _document = document2, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
        var importNode = originalDocument.importNode;
        var documentMode = {};
        try {
          documentMode = clone3(document2).documentMode ? document2.documentMode : {};
        } catch (_5) {
        }
        var hooks = {};
        DOMPurify2.isSupported = typeof getParentNode === "function" && implementation && typeof implementation.createHTMLDocument !== "undefined" && documentMode !== 9;
        var MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE;
        var IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
        var ALLOWED_TAGS = null;
        var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray(html$1), _toConsumableArray(svg$1), _toConsumableArray(svgFilters), _toConsumableArray(mathMl$1), _toConsumableArray(text)));
        var ALLOWED_ATTR = null;
        var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray(html), _toConsumableArray(svg), _toConsumableArray(mathMl), _toConsumableArray(xml)));
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
        var FORBID_TAGS = null;
        var FORBID_ATTR = null;
        var ALLOW_ARIA_ATTR = true;
        var ALLOW_DATA_ATTR = true;
        var ALLOW_UNKNOWN_PROTOCOLS = false;
        var SAFE_FOR_TEMPLATES = false;
        var WHOLE_DOCUMENT = false;
        var SET_CONFIG = false;
        var FORCE_BODY = false;
        var RETURN_DOM = false;
        var RETURN_DOM_FRAGMENT = false;
        var RETURN_TRUSTED_TYPE = false;
        var SANITIZE_DOM = true;
        var KEEP_CONTENT = true;
        var IN_PLACE = false;
        var USE_PROFILES = {};
        var FORBID_CONTENTS = null;
        var DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
        var DATA_URI_TAGS = null;
        var DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
        var URI_SAFE_ATTRIBUTES = null;
        var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
        var MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
        var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
        var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
        var NAMESPACE = HTML_NAMESPACE;
        var IS_EMPTY_INPUT = false;
        var PARSER_MEDIA_TYPE;
        var SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
        var DEFAULT_PARSER_MEDIA_TYPE = "text/html";
        var transformCaseFunc;
        var CONFIG = null;
        var formElement = document2.createElement("form");
        var isRegexOrFunction = function isRegexOrFunction2(testValue) {
          return testValue instanceof RegExp || testValue instanceof Function;
        };
        var _parseConfig = function _parseConfig2(cfg) {
          if (CONFIG && CONFIG === cfg) {
            return;
          }
          if (!cfg || _typeof(cfg) !== "object") {
            cfg = {};
          }
          cfg = clone3(cfg);
          ALLOWED_TAGS = "ALLOWED_TAGS" in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
          ALLOWED_ATTR = "ALLOWED_ATTR" in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
          URI_SAFE_ATTRIBUTES = "ADD_URI_SAFE_ATTR" in cfg ? addToSet(clone3(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
          DATA_URI_TAGS = "ADD_DATA_URI_TAGS" in cfg ? addToSet(clone3(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS) : DEFAULT_DATA_URI_TAGS;
          FORBID_CONTENTS = "FORBID_CONTENTS" in cfg ? addToSet({}, cfg.FORBID_CONTENTS) : DEFAULT_FORBID_CONTENTS;
          FORBID_TAGS = "FORBID_TAGS" in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
          FORBID_ATTR = "FORBID_ATTR" in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
          USE_PROFILES = "USE_PROFILES" in cfg ? cfg.USE_PROFILES : false;
          ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
          ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
          ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
          SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
          WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
          RETURN_DOM = cfg.RETURN_DOM || false;
          RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
          RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
          FORCE_BODY = cfg.FORCE_BODY || false;
          SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
          KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
          IN_PLACE = cfg.IN_PLACE || false;
          IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$1;
          NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
          }
          if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
            CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
          }
          if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
            CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
          }
          PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE;
          transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? function(x6) {
            return x6;
          } : stringToLowerCase;
          if (SAFE_FOR_TEMPLATES) {
            ALLOW_DATA_ATTR = false;
          }
          if (RETURN_DOM_FRAGMENT) {
            RETURN_DOM = true;
          }
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
          if (cfg.ADD_TAGS) {
            if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
              ALLOWED_TAGS = clone3(ALLOWED_TAGS);
            }
            addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
          }
          if (cfg.ADD_ATTR) {
            if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
              ALLOWED_ATTR = clone3(ALLOWED_ATTR);
            }
            addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
          }
          if (cfg.ADD_URI_SAFE_ATTR) {
            addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
          }
          if (cfg.FORBID_CONTENTS) {
            if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
              FORBID_CONTENTS = clone3(FORBID_CONTENTS);
            }
            addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS);
          }
          if (KEEP_CONTENT) {
            ALLOWED_TAGS["#text"] = true;
          }
          if (WHOLE_DOCUMENT) {
            addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
          }
          if (ALLOWED_TAGS.table) {
            addToSet(ALLOWED_TAGS, ["tbody"]);
            delete FORBID_TAGS.tbody;
          }
          if (freeze) {
            freeze(cfg);
          }
          CONFIG = cfg;
        };
        var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
        var HTML_INTEGRATION_POINTS = addToSet({}, ["foreignobject", "desc", "title", "annotation-xml"]);
        var COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
        var ALL_SVG_TAGS = addToSet({}, svg$1);
        addToSet(ALL_SVG_TAGS, svgFilters);
        addToSet(ALL_SVG_TAGS, svgDisallowed);
        var ALL_MATHML_TAGS = addToSet({}, mathMl$1);
        addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
        var _checkValidNamespace = function _checkValidNamespace2(element) {
          var parent = getParentNode(element);
          if (!parent || !parent.tagName) {
            parent = {
              namespaceURI: HTML_NAMESPACE,
              tagName: "template"
            };
          }
          var tagName = stringToLowerCase(element.tagName);
          var parentTagName = stringToLowerCase(parent.tagName);
          if (element.namespaceURI === SVG_NAMESPACE) {
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === "svg";
            }
            if (parent.namespaceURI === MATHML_NAMESPACE) {
              return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
            }
            return Boolean(ALL_SVG_TAGS[tagName]);
          }
          if (element.namespaceURI === MATHML_NAMESPACE) {
            if (parent.namespaceURI === HTML_NAMESPACE) {
              return tagName === "math";
            }
            if (parent.namespaceURI === SVG_NAMESPACE) {
              return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
            }
            return Boolean(ALL_MATHML_TAGS[tagName]);
          }
          if (element.namespaceURI === HTML_NAMESPACE) {
            if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
              return false;
            }
            if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
              return false;
            }
            return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
          }
          return false;
        };
        var _forceRemove = function _forceRemove2(node) {
          arrayPush(DOMPurify2.removed, {
            element: node
          });
          try {
            node.parentNode.removeChild(node);
          } catch (_5) {
            try {
              node.outerHTML = emptyHTML;
            } catch (_6) {
              node.remove();
            }
          }
        };
        var _removeAttribute = function _removeAttribute2(name, node) {
          try {
            arrayPush(DOMPurify2.removed, {
              attribute: node.getAttributeNode(name),
              from: node
            });
          } catch (_5) {
            arrayPush(DOMPurify2.removed, {
              attribute: null,
              from: node
            });
          }
          node.removeAttribute(name);
          if (name === "is" && !ALLOWED_ATTR[name]) {
            if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
              try {
                _forceRemove(node);
              } catch (_5) {
              }
            } else {
              try {
                node.setAttribute(name, "");
              } catch (_5) {
              }
            }
          }
        };
        var _initDocument = function _initDocument2(dirty) {
          var doc;
          var leadingWhitespace;
          if (FORCE_BODY) {
            dirty = "<remove></remove>" + dirty;
          } else {
            var matches = stringMatch(dirty, /^[\r\n\t ]+/);
            leadingWhitespace = matches && matches[0];
          }
          if (PARSER_MEDIA_TYPE === "application/xhtml+xml") {
            dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
          }
          var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
          if (NAMESPACE === HTML_NAMESPACE) {
            try {
              doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
            } catch (_5) {
            }
          }
          if (!doc || !doc.documentElement) {
            doc = implementation.createDocument(NAMESPACE, "template", null);
            try {
              doc.documentElement.innerHTML = IS_EMPTY_INPUT ? "" : dirtyPayload;
            } catch (_5) {
            }
          }
          var body = doc.body || doc.documentElement;
          if (dirty && leadingWhitespace) {
            body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
          }
          if (NAMESPACE === HTML_NAMESPACE) {
            return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
          }
          return WHOLE_DOCUMENT ? doc.documentElement : body;
        };
        var _createIterator = function _createIterator2(root) {
          return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
        };
        var _isClobbered = function _isClobbered2(elm) {
          return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function");
        };
        var _isNode = function _isNode2(object) {
          return _typeof(Node) === "object" ? object instanceof Node : object && _typeof(object) === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string";
        };
        var _executeHook = function _executeHook2(entryPoint, currentNode, data) {
          if (!hooks[entryPoint]) {
            return;
          }
          arrayForEach(hooks[entryPoint], function(hook) {
            hook.call(DOMPurify2, currentNode, data, CONFIG);
          });
        };
        var _sanitizeElements = function _sanitizeElements2(currentNode) {
          var content;
          _executeHook("beforeSanitizeElements", currentNode, null);
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          if (regExpTest(/[\u0080-\uFFFF]/, currentNode.nodeName)) {
            _forceRemove(currentNode);
            return true;
          }
          var tagName = transformCaseFunc(currentNode.nodeName);
          _executeHook("uponSanitizeElement", currentNode, {
            tagName,
            allowedTags: ALLOWED_TAGS
          });
          if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
            _forceRemove(currentNode);
            return true;
          }
          if (tagName === "select" && regExpTest(/<template/i, currentNode.innerHTML)) {
            _forceRemove(currentNode);
            return true;
          }
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName))
                return false;
              if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName))
                return false;
            }
            if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
              var parentNode = getParentNode(currentNode) || currentNode.parentNode;
              var childNodes = getChildNodes(currentNode) || currentNode.childNodes;
              if (childNodes && parentNode) {
                var childCount = childNodes.length;
                for (var i5 = childCount - 1; i5 >= 0; --i5) {
                  parentNode.insertBefore(cloneNode(childNodes[i5], true), getNextSibling(currentNode));
                }
              }
            }
            _forceRemove(currentNode);
            return true;
          }
          if (currentNode instanceof Element2 && !_checkValidNamespace(currentNode)) {
            _forceRemove(currentNode);
            return true;
          }
          if ((tagName === "noscript" || tagName === "noembed") && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
            _forceRemove(currentNode);
            return true;
          }
          if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
            content = currentNode.textContent;
            content = stringReplace(content, MUSTACHE_EXPR$1, " ");
            content = stringReplace(content, ERB_EXPR$1, " ");
            if (currentNode.textContent !== content) {
              arrayPush(DOMPurify2.removed, {
                element: currentNode.cloneNode()
              });
              currentNode.textContent = content;
            }
          }
          _executeHook("afterSanitizeElements", currentNode, null);
          return false;
        };
        var _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
          if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
            return false;
          }
          if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName))
            ;
          else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName))
            ;
          else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
            if (_basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value)))
              ;
            else {
              return false;
            }
          } else if (URI_SAFE_ATTRIBUTES[lcName])
            ;
          else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, "")))
            ;
          else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag])
            ;
          else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, "")))
            ;
          else if (!value)
            ;
          else {
            return false;
          }
          return true;
        };
        var _basicCustomElementTest = function _basicCustomElementTest2(tagName) {
          return tagName.indexOf("-") > 0;
        };
        var _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
          var attr;
          var value;
          var lcName;
          var l5;
          _executeHook("beforeSanitizeAttributes", currentNode, null);
          var attributes = currentNode.attributes;
          if (!attributes) {
            return;
          }
          var hookEvent = {
            attrName: "",
            attrValue: "",
            keepAttr: true,
            allowedAttributes: ALLOWED_ATTR
          };
          l5 = attributes.length;
          while (l5--) {
            attr = attributes[l5];
            var _attr = attr, name = _attr.name, namespaceURI = _attr.namespaceURI;
            value = name === "value" ? attr.value : stringTrim(attr.value);
            lcName = transformCaseFunc(name);
            hookEvent.attrName = lcName;
            hookEvent.attrValue = value;
            hookEvent.keepAttr = true;
            hookEvent.forceKeepAttr = void 0;
            _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
            value = hookEvent.attrValue;
            if (hookEvent.forceKeepAttr) {
              continue;
            }
            _removeAttribute(name, currentNode);
            if (!hookEvent.keepAttr) {
              continue;
            }
            if (regExpTest(/\/>/i, value)) {
              _removeAttribute(name, currentNode);
              continue;
            }
            if (SAFE_FOR_TEMPLATES) {
              value = stringReplace(value, MUSTACHE_EXPR$1, " ");
              value = stringReplace(value, ERB_EXPR$1, " ");
            }
            var lcTag = transformCaseFunc(currentNode.nodeName);
            if (!_isValidAttribute(lcTag, lcName, value)) {
              continue;
            }
            try {
              if (namespaceURI) {
                currentNode.setAttributeNS(namespaceURI, name, value);
              } else {
                currentNode.setAttribute(name, value);
              }
              arrayPop(DOMPurify2.removed);
            } catch (_5) {
            }
          }
          _executeHook("afterSanitizeAttributes", currentNode, null);
        };
        var _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
          var shadowNode;
          var shadowIterator = _createIterator(fragment);
          _executeHook("beforeSanitizeShadowDOM", fragment, null);
          while (shadowNode = shadowIterator.nextNode()) {
            _executeHook("uponSanitizeShadowNode", shadowNode, null);
            if (_sanitizeElements(shadowNode)) {
              continue;
            }
            if (shadowNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM2(shadowNode.content);
            }
            _sanitizeAttributes(shadowNode);
          }
          _executeHook("afterSanitizeShadowDOM", fragment, null);
        };
        DOMPurify2.sanitize = function(dirty, cfg) {
          var body;
          var importedNode;
          var currentNode;
          var oldNode;
          var returnNode;
          IS_EMPTY_INPUT = !dirty;
          if (IS_EMPTY_INPUT) {
            dirty = "<!-->";
          }
          if (typeof dirty !== "string" && !_isNode(dirty)) {
            if (typeof dirty.toString !== "function") {
              throw typeErrorCreate("toString is not a function");
            } else {
              dirty = dirty.toString();
              if (typeof dirty !== "string") {
                throw typeErrorCreate("dirty is not a string, aborting");
              }
            }
          }
          if (!DOMPurify2.isSupported) {
            if (_typeof(window2.toStaticHTML) === "object" || typeof window2.toStaticHTML === "function") {
              if (typeof dirty === "string") {
                return window2.toStaticHTML(dirty);
              }
              if (_isNode(dirty)) {
                return window2.toStaticHTML(dirty.outerHTML);
              }
            }
            return dirty;
          }
          if (!SET_CONFIG) {
            _parseConfig(cfg);
          }
          DOMPurify2.removed = [];
          if (typeof dirty === "string") {
            IN_PLACE = false;
          }
          if (IN_PLACE) {
            if (dirty.nodeName) {
              var tagName = transformCaseFunc(dirty.nodeName);
              if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
                throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
              }
            }
          } else if (dirty instanceof Node) {
            body = _initDocument("<!---->");
            importedNode = body.ownerDocument.importNode(dirty, true);
            if (importedNode.nodeType === 1 && importedNode.nodeName === "BODY") {
              body = importedNode;
            } else if (importedNode.nodeName === "HTML") {
              body = importedNode;
            } else {
              body.appendChild(importedNode);
            }
          } else {
            if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) {
              return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
            }
            body = _initDocument(dirty);
            if (!body) {
              return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
            }
          }
          if (body && FORCE_BODY) {
            _forceRemove(body.firstChild);
          }
          var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
          while (currentNode = nodeIterator.nextNode()) {
            if (currentNode.nodeType === 3 && currentNode === oldNode) {
              continue;
            }
            if (_sanitizeElements(currentNode)) {
              continue;
            }
            if (currentNode.content instanceof DocumentFragment) {
              _sanitizeShadowDOM(currentNode.content);
            }
            _sanitizeAttributes(currentNode);
            oldNode = currentNode;
          }
          oldNode = null;
          if (IN_PLACE) {
            return dirty;
          }
          if (RETURN_DOM) {
            if (RETURN_DOM_FRAGMENT) {
              returnNode = createDocumentFragment.call(body.ownerDocument);
              while (body.firstChild) {
                returnNode.appendChild(body.firstChild);
              }
            } else {
              returnNode = body;
            }
            if (ALLOWED_ATTR.shadowroot) {
              returnNode = importNode.call(originalDocument, returnNode, true);
            }
            return returnNode;
          }
          var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
          if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
            serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
          }
          if (SAFE_FOR_TEMPLATES) {
            serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$1, " ");
            serializedHTML = stringReplace(serializedHTML, ERB_EXPR$1, " ");
          }
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
        };
        DOMPurify2.setConfig = function(cfg) {
          _parseConfig(cfg);
          SET_CONFIG = true;
        };
        DOMPurify2.clearConfig = function() {
          CONFIG = null;
          SET_CONFIG = false;
        };
        DOMPurify2.isValidAttribute = function(tag, attr, value) {
          if (!CONFIG) {
            _parseConfig({});
          }
          var lcTag = transformCaseFunc(tag);
          var lcName = transformCaseFunc(attr);
          return _isValidAttribute(lcTag, lcName, value);
        };
        DOMPurify2.addHook = function(entryPoint, hookFunction) {
          if (typeof hookFunction !== "function") {
            return;
          }
          hooks[entryPoint] = hooks[entryPoint] || [];
          arrayPush(hooks[entryPoint], hookFunction);
        };
        DOMPurify2.removeHook = function(entryPoint) {
          if (hooks[entryPoint]) {
            return arrayPop(hooks[entryPoint]);
          }
        };
        DOMPurify2.removeHooks = function(entryPoint) {
          if (hooks[entryPoint]) {
            hooks[entryPoint] = [];
          }
        };
        DOMPurify2.removeAllHooks = function() {
          hooks = {};
        };
        return DOMPurify2;
      }
      var purify = createDOMPurify();
      return purify;
    });
  }
});

// ../../node_modules/isomorphic-dompurify/browser.js
var require_browser = __commonJS({
  "../../node_modules/isomorphic-dompurify/browser.js"(exports, module) {
    module.exports = window.DOMPurify || (window.DOMPurify = require_purify().default || require_purify());
  }
});

// ../../node_modules/tui-time-picker/dist/tui-time-picker.js
var require_tui_time_picker = __commonJS({
  "../../node_modules/tui-time-picker/dist/tui-time-picker.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
      else if (typeof define === "function" && define.amd)
        define([], factory);
      else if (typeof exports === "object")
        exports["TimePicker"] = factory();
      else
        root["tui"] = root["tui"] || {}, root["tui"]["TimePicker"] = factory();
    })(window, function() {
      return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
          }
          var module2 = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
          };
          modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
          module2.l = true;
          return module2.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports2, name, getter) {
          if (!__webpack_require__.o(exports2, name)) {
            Object.defineProperty(exports2, name, { enumerable: true, get: getter });
          }
        };
        __webpack_require__.r = function(exports2) {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
          }
          Object.defineProperty(exports2, "__esModule", { value: true });
        };
        __webpack_require__.t = function(value, mode) {
          if (mode & 1)
            value = __webpack_require__(value);
          if (mode & 8)
            return value;
          if (mode & 4 && typeof value === "object" && value && value.__esModule)
            return value;
          var ns = /* @__PURE__ */ Object.create(null);
          __webpack_require__.r(ns);
          Object.defineProperty(ns, "default", { enumerable: true, value });
          if (mode & 2 && typeof value != "string")
            for (var key in value)
              __webpack_require__.d(ns, key, function(key2) {
                return value[key2];
              }.bind(null, key));
          return ns;
        };
        __webpack_require__.n = function(module2) {
          var getter = module2 && module2.__esModule ? function getDefault() {
            return module2["default"];
          } : function getModuleExports() {
            return module2;
          };
          __webpack_require__.d(getter, "a", getter);
          return getter;
        };
        __webpack_require__.o = function(object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "dist";
        return __webpack_require__(__webpack_require__.s = 20);
      }([
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isArray = __webpack_require__(3);
          function inArray(searchElement, array, startIndex) {
            var i5;
            var length;
            startIndex = startIndex || 0;
            if (!isArray(array)) {
              return -1;
            }
            if (Array.prototype.indexOf) {
              return Array.prototype.indexOf.call(array, searchElement, startIndex);
            }
            length = array.length;
            for (i5 = startIndex; startIndex >= 0 && i5 < length; i5 += 1) {
              if (array[i5] === searchElement) {
                return i5;
              }
            }
            return -1;
          }
          module2.exports = inArray;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
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
          module2.exports = forEachArray;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function extend(target, objects) {
            var hasOwnProp = Object.prototype.hasOwnProperty;
            var source, prop, i5, len;
            for (i5 = 1, len = arguments.length; i5 < len; i5 += 1) {
              source = arguments[i5];
              for (prop in source) {
                if (hasOwnProp.call(source, prop)) {
                  target[prop] = source[prop];
                }
              }
            }
            return target;
          }
          module2.exports = extend;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isArray(obj) {
            return obj instanceof Array;
          }
          module2.exports = isArray;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isArray = __webpack_require__(3);
          var forEachArray = __webpack_require__(1);
          var forEachOwnProperties = __webpack_require__(16);
          function forEach(obj, iteratee, context) {
            if (isArray(obj)) {
              forEachArray(obj, iteratee, context);
            } else {
              forEachOwnProperties(obj, iteratee, context);
            }
          }
          module2.exports = forEach;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isUndefined2(obj) {
            return obj === void 0;
          }
          module2.exports = isUndefined2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isString2(obj) {
            return typeof obj === "string" || obj instanceof String;
          }
          module2.exports = isString2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inArray = __webpack_require__(0);
          var forEach = __webpack_require__(4);
          var isArray = __webpack_require__(3);
          var isString2 = __webpack_require__(6);
          var extend = __webpack_require__(2);
          var EXPRESSION_REGEXP = /{{\s?|\s?}}/g;
          var BRACKET_NOTATION_REGEXP = /^[a-zA-Z0-9_@]+\[[a-zA-Z0-9_@"']+\]$/;
          var BRACKET_REGEXP = /\[\s?|\s?\]/;
          var DOT_NOTATION_REGEXP = /^[a-zA-Z_]+\.[a-zA-Z_]+$/;
          var DOT_REGEXP = /\./;
          var STRING_NOTATION_REGEXP = /^["']\w+["']$/;
          var STRING_REGEXP = /"|'/g;
          var NUMBER_REGEXP = /^-?\d+\.?\d*$/;
          var EXPRESSION_INTERVAL = 2;
          var BLOCK_HELPERS = {
            "if": handleIf,
            "each": handleEach,
            "with": handleWith
          };
          var isValidSplit = "a".split(/a/).length === 3;
          var splitByRegExp = function() {
            if (isValidSplit) {
              return function(text, regexp) {
                return text.split(regexp);
              };
            }
            return function(text, regexp) {
              var result = [];
              var prevIndex = 0;
              var match, index;
              if (!regexp.global) {
                regexp = new RegExp(regexp, "g");
              }
              match = regexp.exec(text);
              while (match !== null) {
                index = match.index;
                result.push(text.slice(prevIndex, index));
                prevIndex = index + match[0].length;
                match = regexp.exec(text);
              }
              result.push(text.slice(prevIndex));
              return result;
            };
          }();
          function getValueFromContext(exp, context) {
            var splitedExps;
            var value = context[exp];
            if (exp === "true") {
              value = true;
            } else if (exp === "false") {
              value = false;
            } else if (STRING_NOTATION_REGEXP.test(exp)) {
              value = exp.replace(STRING_REGEXP, "");
            } else if (BRACKET_NOTATION_REGEXP.test(exp)) {
              splitedExps = exp.split(BRACKET_REGEXP);
              value = getValueFromContext(splitedExps[0], context)[getValueFromContext(splitedExps[1], context)];
            } else if (DOT_NOTATION_REGEXP.test(exp)) {
              splitedExps = exp.split(DOT_REGEXP);
              value = getValueFromContext(splitedExps[0], context)[splitedExps[1]];
            } else if (NUMBER_REGEXP.test(exp)) {
              value = parseFloat(exp);
            }
            return value;
          }
          function extractElseif(ifExps, sourcesInsideBlock) {
            var exps = [ifExps];
            var sourcesInsideIf = [];
            var otherIfCount = 0;
            var start = 0;
            forEach(sourcesInsideBlock, function(source, index) {
              if (source.indexOf("if") === 0) {
                otherIfCount += 1;
              } else if (source === "/if") {
                otherIfCount -= 1;
              } else if (!otherIfCount && (source.indexOf("elseif") === 0 || source === "else")) {
                exps.push(source === "else" ? ["true"] : source.split(" ").slice(1));
                sourcesInsideIf.push(sourcesInsideBlock.slice(start, index));
                start = index + 1;
              }
            });
            sourcesInsideIf.push(sourcesInsideBlock.slice(start));
            return {
              exps,
              sourcesInsideIf
            };
          }
          function handleIf(exps, sourcesInsideBlock, context) {
            var analyzed = extractElseif(exps, sourcesInsideBlock);
            var result = false;
            var compiledSource = "";
            forEach(analyzed.exps, function(exp, index) {
              result = handleExpression(exp, context);
              if (result) {
                compiledSource = compile(analyzed.sourcesInsideIf[index], context);
              }
              return !result;
            });
            return compiledSource;
          }
          function handleEach(exps, sourcesInsideBlock, context) {
            var collection = handleExpression(exps, context);
            var additionalKey = isArray(collection) ? "@index" : "@key";
            var additionalContext = {};
            var result = "";
            forEach(collection, function(item, key) {
              additionalContext[additionalKey] = key;
              additionalContext["@this"] = item;
              extend(context, additionalContext);
              result += compile(sourcesInsideBlock.slice(), context);
            });
            return result;
          }
          function handleWith(exps, sourcesInsideBlock, context) {
            var asIndex = inArray("as", exps);
            var alias = exps[asIndex + 1];
            var result = handleExpression(exps.slice(0, asIndex), context);
            var additionalContext = {};
            additionalContext[alias] = result;
            return compile(sourcesInsideBlock, extend(context, additionalContext)) || "";
          }
          function extractSourcesInsideBlock(sources, start, end) {
            var sourcesInsideBlock = sources.splice(start + 1, end - start);
            sourcesInsideBlock.pop();
            return sourcesInsideBlock;
          }
          function handleBlockHelper(helperKeyword, sourcesToEnd, context) {
            var executeBlockHelper = BLOCK_HELPERS[helperKeyword];
            var helperCount = 1;
            var startBlockIndex = 0;
            var endBlockIndex;
            var index = startBlockIndex + EXPRESSION_INTERVAL;
            var expression = sourcesToEnd[index];
            while (helperCount && isString2(expression)) {
              if (expression.indexOf(helperKeyword) === 0) {
                helperCount += 1;
              } else if (expression.indexOf("/" + helperKeyword) === 0) {
                helperCount -= 1;
                endBlockIndex = index;
              }
              index += EXPRESSION_INTERVAL;
              expression = sourcesToEnd[index];
            }
            if (helperCount) {
              throw Error(helperKeyword + " needs {{/" + helperKeyword + "}} expression.");
            }
            sourcesToEnd[startBlockIndex] = executeBlockHelper(sourcesToEnd[startBlockIndex].split(" ").slice(1), extractSourcesInsideBlock(sourcesToEnd, startBlockIndex, endBlockIndex), context);
            return sourcesToEnd;
          }
          function handleExpression(exps, context) {
            var result = getValueFromContext(exps[0], context);
            if (result instanceof Function) {
              return executeFunction(result, exps.slice(1), context);
            }
            return result;
          }
          function executeFunction(helper, argExps, context) {
            var args = [];
            forEach(argExps, function(exp) {
              args.push(getValueFromContext(exp, context));
            });
            return helper.apply(null, args);
          }
          function compile(sources, context) {
            var index = 1;
            var expression = sources[index];
            var exps, firstExp, result;
            while (isString2(expression)) {
              exps = expression.split(" ");
              firstExp = exps[0];
              if (BLOCK_HELPERS[firstExp]) {
                result = handleBlockHelper(firstExp, sources.splice(index, sources.length - index), context);
                sources = sources.concat(result);
              } else {
                sources[index] = handleExpression(exps, context);
              }
              index += EXPRESSION_INTERVAL;
              expression = sources[index];
            }
            return sources.join("");
          }
          function template(text, context) {
            return compile(splitByRegExp(text, EXPRESSION_REGEXP), context);
          }
          module2.exports = template;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var extend = __webpack_require__(2);
          var isExisty = __webpack_require__(23);
          var isString2 = __webpack_require__(6);
          var isObject = __webpack_require__(25);
          var isArray = __webpack_require__(3);
          var isFunction2 = __webpack_require__(26);
          var forEach = __webpack_require__(4);
          var R_EVENTNAME_SPLIT = /\s+/g;
          function CustomEvents2() {
            this.events = null;
            this.contexts = null;
          }
          CustomEvents2.mixin = function(func) {
            extend(func.prototype, CustomEvents2.prototype);
          };
          CustomEvents2.prototype._getHandlerItem = function(handler, context) {
            var item = { handler };
            if (context) {
              item.context = context;
            }
            return item;
          };
          CustomEvents2.prototype._safeEvent = function(eventName) {
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
          CustomEvents2.prototype._safeContext = function() {
            var context = this.contexts;
            if (!context) {
              context = this.contexts = [];
            }
            return context;
          };
          CustomEvents2.prototype._indexOfContext = function(ctx) {
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
          CustomEvents2.prototype._memorizeContext = function(ctx) {
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
          CustomEvents2.prototype._forgetContext = function(ctx) {
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
          CustomEvents2.prototype._bindEvent = function(eventName, handler, context) {
            var events = this._safeEvent(eventName);
            this._memorizeContext(context);
            events.push(this._getHandlerItem(handler, context));
          };
          CustomEvents2.prototype.on = function(eventName, handler, context) {
            var self2 = this;
            if (isString2(eventName)) {
              eventName = eventName.split(R_EVENTNAME_SPLIT);
              forEach(eventName, function(name) {
                self2._bindEvent(name, handler, context);
              });
            } else if (isObject(eventName)) {
              context = handler;
              forEach(eventName, function(func, name) {
                self2.on(name, func, context);
              });
            }
          };
          CustomEvents2.prototype.once = function(eventName, handler, context) {
            var self2 = this;
            if (isObject(eventName)) {
              context = handler;
              forEach(eventName, function(func, name) {
                self2.once(name, func, context);
              });
              return;
            }
            function onceHandler() {
              handler.apply(context, arguments);
              self2.off(eventName, onceHandler, context);
            }
            this.on(eventName, onceHandler, context);
          };
          CustomEvents2.prototype._spliceMatches = function(arr, predicate) {
            var i5 = 0;
            var len;
            if (!isArray(arr)) {
              return;
            }
            for (len = arr.length; i5 < len; i5 += 1) {
              if (predicate(arr[i5]) === true) {
                arr.splice(i5, 1);
                len -= 1;
                i5 -= 1;
              }
            }
          };
          CustomEvents2.prototype._matchHandler = function(handler) {
            var self2 = this;
            return function(item) {
              var needRemove = handler === item.handler;
              if (needRemove) {
                self2._forgetContext(item.context);
              }
              return needRemove;
            };
          };
          CustomEvents2.prototype._matchContext = function(context) {
            var self2 = this;
            return function(item) {
              var needRemove = context === item.context;
              if (needRemove) {
                self2._forgetContext(item.context);
              }
              return needRemove;
            };
          };
          CustomEvents2.prototype._matchHandlerAndContext = function(handler, context) {
            var self2 = this;
            return function(item) {
              var matchHandler = handler === item.handler;
              var matchContext = context === item.context;
              var needRemove = matchHandler && matchContext;
              if (needRemove) {
                self2._forgetContext(item.context);
              }
              return needRemove;
            };
          };
          CustomEvents2.prototype._offByEventName = function(eventName, handler) {
            var self2 = this;
            var andByHandler = isFunction2(handler);
            var matchHandler = self2._matchHandler(handler);
            eventName = eventName.split(R_EVENTNAME_SPLIT);
            forEach(eventName, function(name) {
              var handlerItems = self2._safeEvent(name);
              if (andByHandler) {
                self2._spliceMatches(handlerItems, matchHandler);
              } else {
                forEach(handlerItems, function(item) {
                  self2._forgetContext(item.context);
                });
                self2.events[name] = [];
              }
            });
          };
          CustomEvents2.prototype._offByHandler = function(handler) {
            var self2 = this;
            var matchHandler = this._matchHandler(handler);
            forEach(this._safeEvent(), function(handlerItems) {
              self2._spliceMatches(handlerItems, matchHandler);
            });
          };
          CustomEvents2.prototype._offByObject = function(obj, handler) {
            var self2 = this;
            var matchFunc;
            if (this._indexOfContext(obj) < 0) {
              forEach(obj, function(func, name) {
                self2.off(name, func);
              });
            } else if (isString2(handler)) {
              matchFunc = this._matchContext(obj);
              self2._spliceMatches(this._safeEvent(handler), matchFunc);
            } else if (isFunction2(handler)) {
              matchFunc = this._matchHandlerAndContext(handler, obj);
              forEach(this._safeEvent(), function(handlerItems) {
                self2._spliceMatches(handlerItems, matchFunc);
              });
            } else {
              matchFunc = this._matchContext(obj);
              forEach(this._safeEvent(), function(handlerItems) {
                self2._spliceMatches(handlerItems, matchFunc);
              });
            }
          };
          CustomEvents2.prototype.off = function(eventName, handler) {
            if (isString2(eventName)) {
              this._offByEventName(eventName, handler);
            } else if (!arguments.length) {
              this.events = {};
              this.contexts = [];
            } else if (isFunction2(eventName)) {
              this._offByHandler(eventName);
            } else if (isObject(eventName)) {
              this._offByObject(eventName, handler);
            }
          };
          CustomEvents2.prototype.fire = function(eventName) {
            this.invoke.apply(this, arguments);
          };
          CustomEvents2.prototype.invoke = function(eventName) {
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
          CustomEvents2.prototype.hasListener = function(eventName) {
            return this.getListenerLength(eventName) > 0;
          };
          CustomEvents2.prototype.getListenerLength = function(eventName) {
            var events = this._safeEvent(eventName);
            return events.length;
          };
          module2.exports = CustomEvents2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inherit = __webpack_require__(27);
          var extend = __webpack_require__(2);
          function defineClass(parent, props) {
            var obj;
            if (!props) {
              props = parent;
              parent = null;
            }
            obj = props.init || function() {
            };
            if (parent) {
              inherit(obj, parent);
            }
            if (props.hasOwnProperty("static")) {
              extend(obj, props["static"]);
              delete props["static"];
            }
            extend(obj.prototype, props);
            return obj;
          }
          module2.exports = defineClass;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isString2 = __webpack_require__(6);
          var forEach = __webpack_require__(4);
          var safeEvent = __webpack_require__(17);
          function on2(element, types, handler, context) {
            if (isString2(types)) {
              forEach(types.split(/\s+/g), function(type) {
                bindEvent(element, type, handler, context);
              });
              return;
            }
            forEach(types, function(func, type) {
              bindEvent(element, type, func, handler);
            });
          }
          function bindEvent(element, type, handler, context) {
            function eventHandler(e3) {
              handler.call(context || element, e3 || window.event);
            }
            if ("addEventListener" in element) {
              element.addEventListener(type, eventHandler);
            } else if ("attachEvent" in element) {
              element.attachEvent("on" + type, eventHandler);
            }
            memorizeHandler(element, type, handler, eventHandler);
          }
          function memorizeHandler(element, type, handler, wrappedHandler) {
            var events = safeEvent(element, type);
            var existInEvents = false;
            forEach(events, function(obj) {
              if (obj.handler === handler) {
                existInEvents = true;
                return false;
              }
              return true;
            });
            if (!existInEvents) {
              events.push({
                handler,
                wrappedHandler
              });
            }
          }
          module2.exports = on2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isString2 = __webpack_require__(6);
          var forEach = __webpack_require__(4);
          var safeEvent = __webpack_require__(17);
          function off(element, types, handler) {
            if (isString2(types)) {
              forEach(types.split(/\s+/g), function(type) {
                unbindEvent(element, type, handler);
              });
              return;
            }
            forEach(types, function(func, type) {
              unbindEvent(element, type, func);
            });
          }
          function unbindEvent(element, type, handler) {
            var events = safeEvent(element, type);
            var index;
            if (!handler) {
              forEach(events, function(item) {
                removeHandler(element, type, item.wrappedHandler);
              });
              events.splice(0, events.length);
            } else {
              forEach(events, function(item, idx) {
                if (handler === item.handler) {
                  removeHandler(element, type, item.wrappedHandler);
                  index = idx;
                  return false;
                }
                return true;
              });
              events.splice(index, 1);
            }
          }
          function removeHandler(element, type, handler) {
            if ("removeEventListener" in element) {
              element.removeEventListener(type, handler);
            } else if ("detachEvent" in element) {
              element.detachEvent("on" + type, handler);
            }
          }
          module2.exports = off;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var matches = __webpack_require__(30);
          function closest(element, selector) {
            var parent = element.parentNode;
            if (matches(element, selector)) {
              return element;
            }
            while (parent && parent !== document) {
              if (matches(parent, selector)) {
                return parent;
              }
              parent = parent.parentNode;
            }
            return null;
          }
          module2.exports = closest;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function removeElement(element) {
            if (element && element.parentNode) {
              element.parentNode.removeChild(element);
            }
          }
          module2.exports = removeElement;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isHTMLNode(html) {
            if (typeof HTMLElement === "object") {
              return html && (html instanceof HTMLElement || !!html.nodeType);
            }
            return !!(html && html.nodeType);
          }
          module2.exports = isHTMLNode;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inArray = __webpack_require__(0);
          var forEachArray = __webpack_require__(1);
          var sendHostname2 = __webpack_require__(35);
          var uniqueId = 0;
          var utils = {
            getUniqueId: function() {
              uniqueId += 1;
              return uniqueId;
            },
            formatTime: function(value, format) {
              var PADDING_ZERO_TYPES = ["hh", "mm"];
              value = String(value);
              return inArray(format, PADDING_ZERO_TYPES) >= 0 && value.length === 1 ? "0" + value : value;
            },
            getMeridiemHour: function(hour) {
              hour %= 12;
              if (hour === 0) {
                hour = 12;
              }
              return hour;
            },
            getRangeArr: function(start, end, step) {
              var arr = [];
              var i5;
              step = step || 1;
              if (start > end) {
                for (i5 = end; i5 >= start; i5 -= step) {
                  arr.push(i5);
                }
              } else {
                for (i5 = start; i5 <= end; i5 += step) {
                  arr.push(i5);
                }
              }
              return arr;
            },
            fill: function(start, end, value, target) {
              var arr = target || [];
              var replaceEnd = Math.min(arr.length - 1, end);
              var i5;
              for (i5 = start; i5 <= replaceEnd; i5 += 1) {
                arr[i5] = value;
              }
              for (i5 = replaceEnd; i5 <= end; i5 += 1) {
                arr.push(value);
              }
              return arr;
            },
            getTarget: function(ev) {
              return ev.target || ev.srcElement;
            },
            sendHostName: function() {
              sendHostname2("time-picker", "UA-129987462-1");
            },
            getDisabledMinuteArr: function(enableRanges, minuteStep) {
              var arr = this.fill(0, Math.floor(60 / minuteStep) - 2, false);
              function setDisabled(enableRange) {
                var beginDisabledMinute = Math.ceil(enableRange.begin / minuteStep);
                var endDisabledMinute = Math.floor(enableRange.end / minuteStep);
                arr = this.fill(beginDisabledMinute, endDisabledMinute, true, arr);
              }
              forEachArray(enableRanges, setDisabled.bind(this));
              return arr;
            },
            setDisabled: function(el, isDisabled) {
              el.disabled = isDisabled;
            }
          };
          module2.exports = utils;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
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
          module2.exports = forEachOwnProperties;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var EVENT_KEY = "_feEventKey";
          function safeEvent(element, type) {
            var events = element[EVENT_KEY];
            var handlers;
            if (!events) {
              events = element[EVENT_KEY] = {};
            }
            handlers = events[type];
            if (!handlers) {
              handlers = events[type] = [];
            }
            return handlers;
          }
          module2.exports = safeEvent;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isUndefined2 = __webpack_require__(5);
          function getClass(element) {
            if (!element || !element.className) {
              return "";
            }
            if (isUndefined2(element.className.baseVal)) {
              return element.className;
            }
            return element.className.baseVal;
          }
          module2.exports = getClass;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isArray = __webpack_require__(3);
          var isUndefined2 = __webpack_require__(5);
          function setClassName(element, cssClass) {
            cssClass = isArray(cssClass) ? cssClass.join(" ") : cssClass;
            cssClass = cssClass.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            if (isUndefined2(element.className.baseVal)) {
              element.className = cssClass;
              return;
            }
            element.className.baseVal = cssClass;
          }
          module2.exports = setClassName;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          __webpack_require__(21);
          module2.exports = __webpack_require__(22);
        },
        function(module2, exports2, __webpack_require__) {
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inArray = __webpack_require__(0);
          var forEachArray = __webpack_require__(1);
          var CustomEvents2 = __webpack_require__(8);
          var defineClass = __webpack_require__(9);
          var extend = __webpack_require__(2);
          var on2 = __webpack_require__(10);
          var off = __webpack_require__(11);
          var addClass = __webpack_require__(29);
          var closest = __webpack_require__(12);
          var removeElement = __webpack_require__(13);
          var removeClass = __webpack_require__(32);
          var isHTMLNode = __webpack_require__(14);
          var isNumber = __webpack_require__(33);
          var Spinbox = __webpack_require__(34);
          var Selectbox = __webpack_require__(38);
          var util = __webpack_require__(15);
          var localeTexts = __webpack_require__(40);
          var tmpl = __webpack_require__(41);
          var meridiemTmpl = __webpack_require__(42);
          var SELECTOR_HOUR_ELEMENT = ".tui-timepicker-hour";
          var SELECTOR_MINUTE_ELEMENT = ".tui-timepicker-minute";
          var SELECTOR_MERIDIEM_ELEMENT = ".tui-timepicker-meridiem";
          var CLASS_NAME_LEFT_MERIDIEM = "tui-has-left";
          var CLASS_NAME_HIDDEN = "tui-hidden";
          var CLASS_NAME_CHECKED = "tui-timepicker-meridiem-checked";
          var INPUT_TYPE_SPINBOX = "spinbox";
          var INPUT_TYPE_SELECTBOX = "selectbox";
          var START_NUMBER_OF_TIME = 0;
          var END_NUMBER_OF_MINUTE = 59;
          var END_NUMBER_OF_HOUR = 23;
          var END_NUMBER_OF_HOUR_WITH_MERIDIEM = 12;
          var mergeDefaultOptions = function(options) {
            return extend({
              language: "en",
              initialHour: 0,
              initialMinute: 0,
              showMeridiem: true,
              inputType: "selectbox",
              hourStep: 1,
              minuteStep: 1,
              meridiemPosition: "right",
              format: "h:m",
              disabledHours: [],
              disabledMinutes: {},
              usageStatistics: true
            }, options);
          };
          var TimePicker = defineClass({
            static: {
              localeTexts
            },
            init: function(container, options) {
              options = mergeDefaultOptions(options);
              this.id = util.getUniqueId();
              this.container = isHTMLNode(container) ? container : document.querySelector(container);
              this.element = null;
              this.meridiemElement = null;
              this.amEl = null;
              this.pmEl = null;
              this.showMeridiem = options.showMeridiem;
              this.meridiemPosition = options.meridiemPosition;
              this.hourInput = null;
              this.minuteInput = null;
              this.hour = options.initialHour;
              this.minute = options.initialMinute;
              this.hourStep = options.hourStep;
              this.minuteStep = options.minuteStep;
              this.disabledHours = options.disabledHours;
              this.disabledMinutes = options.disabledMinutes;
              this.inputType = options.inputType;
              this.localeText = localeTexts[options.language];
              this.format = this.getValidTimeFormat(options.format);
              this.render();
              this.setEvents();
              if (options.usageStatistics) {
                util.sendHostName();
              }
            },
            setEvents: function() {
              this.hourInput.on("change", this.onChangeTimeInput, this);
              this.minuteInput.on("change", this.onChangeTimeInput, this);
              if (this.showMeridiem) {
                if (this.inputType === INPUT_TYPE_SELECTBOX) {
                  on2(this.meridiemElement.querySelector("select"), "change", this.onChangeMeridiem, this);
                } else if (this.inputType === INPUT_TYPE_SPINBOX) {
                  on2(this.meridiemElement, "click", this.onChangeMeridiem, this);
                }
              }
            },
            removeEvents: function() {
              this.off();
              this.hourInput.destroy();
              this.minuteInput.destroy();
              if (this.showMeridiem) {
                if (this.inputType === INPUT_TYPE_SELECTBOX) {
                  off(this.meridiemElement.querySelector("select"), "change", this.onChangeMeridiem, this);
                } else if (this.inputType === INPUT_TYPE_SPINBOX) {
                  off(this.meridiemElement, "click", this.onChangeMeridiem, this);
                }
              }
            },
            render: function() {
              var context = {
                showMeridiem: this.showMeridiem,
                isSpinbox: this.inputType === "spinbox"
              };
              if (this.showMeridiem) {
                extend(context, {
                  meridiemElement: this.makeMeridiemHTML()
                });
              }
              if (this.element) {
                removeElement(this.element);
              }
              this.container.innerHTML = tmpl(context);
              this.element = this.container.firstChild;
              this.renderTimeInputs();
              if (this.showMeridiem) {
                this.setMeridiemElement();
              }
            },
            setMeridiemElement: function() {
              if (this.meridiemPosition === "left") {
                addClass(this.element, CLASS_NAME_LEFT_MERIDIEM);
              }
              this.meridiemElement = this.element.querySelector(SELECTOR_MERIDIEM_ELEMENT);
              this.amEl = this.meridiemElement.querySelector('[value="AM"]');
              this.pmEl = this.meridiemElement.querySelector('[value="PM"]');
              this.syncToMeridiemElements();
            },
            makeMeridiemHTML: function() {
              var localeText = this.localeText;
              return meridiemTmpl({
                am: localeText.am,
                pm: localeText.pm,
                radioId: this.id,
                isSpinbox: this.inputType === "spinbox"
              });
            },
            renderTimeInputs: function() {
              var hour = this.hour;
              var showMeridiem = this.showMeridiem;
              var hourElement = this.element.querySelector(SELECTOR_HOUR_ELEMENT);
              var minuteElement = this.element.querySelector(SELECTOR_MINUTE_ELEMENT);
              var BoxComponent = this.inputType.toLowerCase() === "selectbox" ? Selectbox : Spinbox;
              var formatExplode = this.format.split(":");
              var hourItems = this.getHourItems();
              if (showMeridiem) {
                hour = util.getMeridiemHour(hour);
              }
              this.hourInput = new BoxComponent(hourElement, {
                initialValue: hour,
                items: hourItems,
                format: formatExplode[0],
                disabledItems: this.makeDisabledStatItems(hourItems)
              });
              this.minuteInput = new BoxComponent(minuteElement, {
                initialValue: this.minute,
                items: this.getMinuteItems(),
                format: formatExplode[1]
              });
            },
            makeDisabledStatItems: function(hourItems) {
              var result = [];
              var disabledHours = this.disabledHours.slice();
              if (this.showMeridiem) {
                disabledHours = this.meridiemableTime(disabledHours);
              }
              forEachArray(hourItems, function(hour) {
                result.push(inArray(hour, disabledHours) >= 0);
              });
              return result;
            },
            meridiemableTime: function(disabledHours) {
              var diffHour = 0;
              var startHour = 0;
              var endHour = 11;
              var result = [];
              if (this.hour >= 12) {
                diffHour = 12;
                startHour = 12;
                endHour = 23;
              }
              forEachArray(disabledHours, function(hour) {
                if (hour >= startHour && hour <= endHour) {
                  result.push(hour - diffHour === 0 ? 12 : hour - diffHour);
                }
              });
              return result;
            },
            getValidTimeFormat: function(format) {
              if (!format.match(/^[h]{1,2}:[m]{1,2}$/i)) {
                return "h:m";
              }
              return format.toLowerCase();
            },
            syncToMeridiemElements: function() {
              var selectedEl = this.hour >= 12 ? this.pmEl : this.amEl;
              var notSelectedEl = selectedEl === this.pmEl ? this.amEl : this.pmEl;
              selectedEl.setAttribute("selected", true);
              selectedEl.setAttribute("checked", true);
              addClass(selectedEl, CLASS_NAME_CHECKED);
              notSelectedEl.removeAttribute("selected");
              notSelectedEl.removeAttribute("checked");
              removeClass(notSelectedEl, CLASS_NAME_CHECKED);
            },
            syncToInputs: function() {
              var hour = this.hour;
              var minute = this.minute;
              if (this.showMeridiem) {
                hour = util.getMeridiemHour(hour);
              }
              this.hourInput.setValue(hour);
              this.minuteInput.setValue(minute);
            },
            onChangeMeridiem: function(ev) {
              var hour = this.hour;
              var target = util.getTarget(ev);
              if (target.value && closest(target, SELECTOR_MERIDIEM_ELEMENT)) {
                hour = this.to24Hour(target.value === "PM", hour);
                this.setTime(hour, this.minute);
                this.setDisabledHours();
                this.setDisabledMinutes(hour);
              }
            },
            onChangeTimeInput: function() {
              var hour = this.hourInput.getValue();
              var minute = this.minuteInput.getValue();
              var isPM = this.hour >= 12;
              if (this.showMeridiem) {
                hour = this.to24Hour(isPM, hour);
              }
              this.setTime(hour, minute);
              this.setDisabledMinutes(hour);
            },
            to24Hour: function(isPM, hour) {
              hour %= 12;
              if (isPM) {
                hour += 12;
              }
              return hour;
            },
            setDisabledHours: function() {
              var hourItems = this.getHourItems();
              var disabledItems = this.makeDisabledStatItems(hourItems);
              this.hourInput.setDisabledItems(disabledItems);
            },
            setDisabledMinutes: function(hour) {
              var disabledItems;
              disabledItems = this.disabledMinutes[hour] || [];
              this.minuteInput.setDisabledItems(disabledItems);
            },
            getHourItems: function() {
              var step = this.hourStep;
              return this.showMeridiem ? util.getRangeArr(1, 12, step) : util.getRangeArr(0, 23, step);
            },
            getMinuteItems: function() {
              return util.getRangeArr(0, 59, this.minuteStep);
            },
            validItems: function(hour, minute) {
              if (!isNumber(hour) || !isNumber(minute)) {
                return false;
              }
              if (this.showMeridiem) {
                hour = util.getMeridiemHour(hour);
              }
              return inArray(hour, this.getHourItems()) > -1 && inArray(minute, this.getMinuteItems()) > -1;
            },
            setHourStep: function(step) {
              this.hourStep = step;
              this.hourInput.fire("changeItems", this.getHourItems());
            },
            getHourStep: function() {
              return this.hourStep;
            },
            setMinuteStep: function(step) {
              this.minuteStep = step;
              this.minuteInput.fire("changeItems", this.getMinuteItems());
            },
            getMinuteStep: function() {
              return this.minuteStep;
            },
            show: function() {
              removeClass(this.element, CLASS_NAME_HIDDEN);
            },
            hide: function() {
              addClass(this.element, CLASS_NAME_HIDDEN);
            },
            setHour: function(hour) {
              return this.setTime(hour, this.minute);
            },
            setMinute: function(minute) {
              return this.setTime(this.hour, minute);
            },
            setTime: function(hour, minute) {
              if (!this.validItems(hour, minute)) {
                return;
              }
              this.hour = hour;
              this.minute = minute;
              this.syncToInputs();
              if (this.showMeridiem) {
                this.syncToMeridiemElements();
              }
              this.fire("change", {
                hour: this.hour,
                minute: this.minute
              });
            },
            setRange: function(begin, end) {
              var beginHour = begin.hour;
              var beginMin = begin.minute;
              var endHour, endMin;
              if (!this.isValidRange(begin, end)) {
                return;
              }
              if (end) {
                endHour = end.hour;
                endMin = end.minute;
              }
              this.setRangeHour(beginHour, endHour);
              this.setRangeMinute(beginHour, beginMin, endHour, endMin);
              this.applyRange(beginHour, beginMin, endHour);
            },
            setRangeHour: function(beginHour, endHour) {
              var disabledHours = util.getRangeArr(START_NUMBER_OF_TIME, beginHour - 1);
              if (endHour) {
                disabledHours = disabledHours.concat(util.getRangeArr(endHour + 1, END_NUMBER_OF_HOUR));
              }
              this.disabledHours = disabledHours.slice();
            },
            setRangeMinute: function(beginHour, beginMin, endHour, endMin) {
              var disabledMinRanges = [];
              if (!beginHour && !beginMin) {
                return;
              }
              disabledMinRanges.push({
                begin: START_NUMBER_OF_TIME,
                end: beginMin
              });
              if (endHour && endMin) {
                disabledMinRanges.push({
                  begin: endMin,
                  end: END_NUMBER_OF_MINUTE
                });
                if (beginHour === endHour) {
                  this.disabledMinutes[beginHour] = util.getDisabledMinuteArr(disabledMinRanges, this.minuteStep).slice();
                  return;
                }
                this.disabledMinutes[endHour] = util.getDisabledMinuteArr([disabledMinRanges[1]], this.minuteStep).slice();
              }
              this.disabledMinutes[beginHour] = util.getDisabledMinuteArr([disabledMinRanges[0]], this.minuteStep).slice();
            },
            applyRange: function(beginHour, beginMin, endHour) {
              var targetHour = beginHour;
              var targetMinute = Math.ceil(beginMin / this.minuteStep) * this.minuteStep;
              if (this.isLaterThanSetTime(beginHour, beginMin)) {
                if (this.hourStep !== 1 && beginHour % this.hourStep !== 1) {
                  targetHour = beginHour + beginHour % this.hourStep + 1;
                  targetMinute = 0;
                }
                this.setTime(targetHour, targetMinute);
              }
              this.setDisabledHours();
              if (this.showMeridiem) {
                this.syncToMeridiemElements();
                util.setDisabled(this.amEl, beginHour >= END_NUMBER_OF_HOUR_WITH_MERIDIEM);
                util.setDisabled(this.pmEl, endHour < END_NUMBER_OF_HOUR_WITH_MERIDIEM);
              }
            },
            resetMinuteRange: function() {
              var i5;
              this.disabledMinutes = {};
              for (i5 = 0; i5 <= END_NUMBER_OF_HOUR; i5 += 1) {
                this.setDisabledMinutes(this.hour);
              }
            },
            isValidRange: function(begin, end) {
              var beginHour = begin.hour;
              var beginMin = begin.minute;
              var endHour, endMin;
              if (!this.isValidTime(beginHour, beginMin)) {
                return false;
              }
              if (!end) {
                return true;
              }
              endHour = end.hour;
              endMin = end.minute;
              return this.isValidTime(endHour, endMin) && this.compareTimes(begin, end) > 0;
            },
            isValidTime: function(hour, minute) {
              return hour >= START_NUMBER_OF_TIME && hour <= END_NUMBER_OF_HOUR && minute >= START_NUMBER_OF_TIME && minute <= END_NUMBER_OF_MINUTE;
            },
            isLaterThanSetTime: function(hour, minute) {
              return hour > this.hour || hour === this.hour && minute > this.minute;
            },
            compareTimes: function(begin, end) {
              var first2 = new Date(0);
              var second = new Date(0);
              first2.setHours(begin.hour, begin.minute);
              second.setHours(end.hour, end.minute);
              return second.getTime() - first2.getTime();
            },
            getHour: function() {
              return this.hour;
            },
            getMinute: function() {
              return this.minute;
            },
            changeLanguage: function(language) {
              this.localeText = localeTexts[language];
              this.render();
            },
            destroy: function() {
              this.removeEvents();
              removeElement(this.element);
              this.container = this.showMeridiem = this.hourInput = this.minuteInput = this.hour = this.minute = this.inputType = this.element = this.meridiemElement = this.amEl = this.pmEl = null;
            }
          });
          CustomEvents2.mixin(TimePicker);
          module2.exports = TimePicker;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isUndefined2 = __webpack_require__(5);
          var isNull = __webpack_require__(24);
          function isExisty(param) {
            return !isUndefined2(param) && !isNull(param);
          }
          module2.exports = isExisty;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isNull(obj) {
            return obj === null;
          }
          module2.exports = isNull;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isObject(obj) {
            return obj === Object(obj);
          }
          module2.exports = isObject;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isFunction2(obj) {
            return obj instanceof Function;
          }
          module2.exports = isFunction2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var createObject = __webpack_require__(28);
          function inherit(subType, superType) {
            var prototype = createObject(superType.prototype);
            prototype.constructor = subType;
            subType.prototype = prototype;
          }
          module2.exports = inherit;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function createObject(obj) {
            function F3() {
            }
            F3.prototype = obj;
            return new F3();
          }
          module2.exports = createObject;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEach = __webpack_require__(4);
          var inArray = __webpack_require__(0);
          var getClass = __webpack_require__(18);
          var setClassName = __webpack_require__(19);
          function addClass(element) {
            var cssClass = Array.prototype.slice.call(arguments, 1);
            var classList = element.classList;
            var newClass = [];
            var origin;
            if (classList) {
              forEach(cssClass, function(name) {
                element.classList.add(name);
              });
              return;
            }
            origin = getClass(element);
            if (origin) {
              cssClass = [].concat(origin.split(/\s+/), cssClass);
            }
            forEach(cssClass, function(cls2) {
              if (inArray(cls2, newClass) < 0) {
                newClass.push(cls2);
              }
            });
            setClassName(element, newClass);
          }
          module2.exports = addClass;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inArray = __webpack_require__(0);
          var toArray = __webpack_require__(31);
          var elProto2 = Element.prototype;
          var matchSelector2 = elProto2.matches || elProto2.webkitMatchesSelector || elProto2.mozMatchesSelector || elProto2.msMatchesSelector || function(selector) {
            var doc = this.document || this.ownerDocument;
            return inArray(this, toArray(doc.querySelectorAll(selector))) > -1;
          };
          function matches(element, selector) {
            return matchSelector2.call(element, selector);
          }
          module2.exports = matches;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEachArray = __webpack_require__(1);
          function toArray(arrayLike) {
            var arr;
            try {
              arr = Array.prototype.slice.call(arrayLike);
            } catch (e3) {
              arr = [];
              forEachArray(arrayLike, function(value) {
                arr.push(value);
              });
            }
            return arr;
          }
          module2.exports = toArray;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEachArray = __webpack_require__(1);
          var inArray = __webpack_require__(0);
          var getClass = __webpack_require__(18);
          var setClassName = __webpack_require__(19);
          function removeClass(element) {
            var cssClass = Array.prototype.slice.call(arguments, 1);
            var classList = element.classList;
            var origin, newClass;
            if (classList) {
              forEachArray(cssClass, function(name) {
                classList.remove(name);
              });
              return;
            }
            origin = getClass(element).split(/\s+/);
            newClass = [];
            forEachArray(origin, function(name) {
              if (inArray(name, cssClass) < 0) {
                newClass.push(name);
              }
            });
            setClassName(element, newClass);
          }
          module2.exports = removeClass;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isNumber(obj) {
            return typeof obj === "number" || obj instanceof Number;
          }
          module2.exports = isNumber;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inArray = __webpack_require__(0);
          var forEachArray = __webpack_require__(1);
          var CustomEvents2 = __webpack_require__(8);
          var defineClass = __webpack_require__(9);
          var extend = __webpack_require__(2);
          var on2 = __webpack_require__(10);
          var off = __webpack_require__(11);
          var closest = __webpack_require__(12);
          var removeElement = __webpack_require__(13);
          var isHTMLNode = __webpack_require__(14);
          var util = __webpack_require__(15);
          var tmpl = __webpack_require__(37);
          var SELECTOR_UP_BUTTON = ".tui-timepicker-btn-up";
          var SELECTOR_DOWN_BUTTON = ".tui-timepicker-btn-down";
          var Spinbox = defineClass({
            init: function(container, options) {
              options = extend({
                items: []
              }, options);
              this._container = isHTMLNode(container) ? container : document.querySelector(container);
              this._element = null;
              this._inputElement = null;
              this._items = options.items;
              this._disabledItems = options.disabledItems || [];
              this._selectedIndex = Math.max(0, inArray(options.initialValue, this._items));
              this._format = options.format;
              this._render();
              this._setEvents();
            },
            _render: function() {
              var index = inArray(this.getValue(), this._items);
              var context;
              if (this._disabledItems[index]) {
                this._selectedIndex = this._findEnabledIndex();
              }
              context = {
                maxLength: this._getMaxLength(),
                initialValue: this.getValue(),
                format: this._format,
                formatTime: util.formatTime
              };
              this._container.innerHTML = tmpl(context);
              this._element = this._container.firstChild;
              this._inputElement = this._element.querySelector("input");
            },
            _findEnabledIndex: function() {
              return inArray(false, this._disabledItems);
            },
            _getMaxLength: function() {
              var lengths = [];
              forEachArray(this._items, function(item) {
                lengths.push(String(item).length);
              });
              return Math.max.apply(null, lengths);
            },
            setDisabledItems: function(disabledItems) {
              this._disabledItems = disabledItems;
              this._changeToInputValue();
            },
            _setEvents: function() {
              on2(this._container, "click", this._onClickHandler, this);
              on2(this._inputElement, "keydown", this._onKeydownInputElement, this);
              on2(this._inputElement, "change", this._onChangeHandler, this);
              this.on("changeItems", function(items) {
                this._items = items;
                this._render();
              }, this);
            },
            _removeEvents: function() {
              this.off();
              off(this._container, "click", this._onClickHandler, this);
              off(this._inputElement, "keydown", this._onKeydownInputElement, this);
              off(this._inputElement, "change", this._onChangeHandler, this);
            },
            _onClickHandler: function(ev) {
              var target = util.getTarget(ev);
              if (closest(target, SELECTOR_DOWN_BUTTON)) {
                this._setNextValue(true);
              } else if (closest(target, SELECTOR_UP_BUTTON)) {
                this._setNextValue(false);
              }
            },
            _setNextValue: function(isDown) {
              var index = this._selectedIndex;
              if (isDown) {
                index = index ? index - 1 : this._items.length - 1;
              } else {
                index = index < this._items.length - 1 ? index + 1 : 0;
              }
              if (this._disabledItems[index]) {
                this._selectedIndex = index;
                this._setNextValue(isDown);
              } else {
                this.setValue(this._items[index]);
              }
            },
            _onKeydownInputElement: function(ev) {
              var keyCode = ev.which || ev.keyCode;
              var isDown;
              if (closest(util.getTarget(ev), "input")) {
                switch (keyCode) {
                  case 38:
                    isDown = false;
                    break;
                  case 40:
                    isDown = true;
                    break;
                  default:
                    return;
                }
                this._setNextValue(isDown);
              }
            },
            _onChangeHandler: function(ev) {
              if (closest(util.getTarget(ev), "input")) {
                this._changeToInputValue();
              }
            },
            _changeToInputValue: function() {
              var newValue = Number(this._inputElement.value);
              var newIndex = inArray(newValue, this._items);
              if (this._disabledItems[newIndex]) {
                newIndex = this._findEnabledIndex();
                newValue = this._items[newIndex];
              } else if (newIndex === this._selectedIndex) {
                return;
              }
              if (newIndex === -1) {
                this.setValue(this._items[this._selectedIndex]);
              } else {
                this._selectedIndex = newIndex;
                this.fire("change", {
                  value: newValue
                });
              }
            },
            setValue: function(value) {
              this._inputElement.value = util.formatTime(value, this._format);
              this._changeToInputValue();
            },
            getValue: function() {
              return this._items[this._selectedIndex];
            },
            destroy: function() {
              this._removeEvents();
              removeElement(this._element);
              this._container = this._element = this._inputElement = this._items = this._selectedIndex = null;
            }
          });
          CustomEvents2.mixin(Spinbox);
          module2.exports = Spinbox;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isUndefined2 = __webpack_require__(5);
          var imagePing = __webpack_require__(36);
          var ms7days = 7 * 24 * 60 * 60 * 1e3;
          function isExpired(date2) {
            var now = new Date().getTime();
            return now - date2 > ms7days;
          }
          function sendHostname2(appName, trackingId) {
            var url = "https://www.google-analytics.com/collect";
            var hostname = location.hostname;
            var hitType = "event";
            var eventCategory = "use";
            var applicationKeyForStorage = "TOAST UI " + appName + " for " + hostname + ": Statistics";
            var date2 = window.localStorage.getItem(applicationKeyForStorage);
            if (!isUndefined2(window.tui) && window.tui.usageStatistics === false) {
              return;
            }
            if (date2 && !isExpired(date2)) {
              return;
            }
            window.localStorage.setItem(applicationKeyForStorage, new Date().getTime());
            setTimeout(function() {
              if (document.readyState === "interactive" || document.readyState === "complete") {
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
            }, 1e3);
          }
          module2.exports = sendHostname2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEachOwnProperties = __webpack_require__(16);
          function imagePing(url, trackingInfo) {
            var trackingElement = document.createElement("img");
            var queryString = "";
            forEachOwnProperties(trackingInfo, function(value, key) {
              queryString += "&" + key + "=" + value;
            });
            queryString = queryString.substring(1);
            trackingElement.src = url + "?" + queryString;
            trackingElement.style.display = "none";
            document.body.appendChild(trackingElement);
            document.body.removeChild(trackingElement);
            return trackingElement;
          }
          module2.exports = imagePing;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var template = __webpack_require__(7);
          module2.exports = function(context) {
            var source = '<div class="tui-timepicker-btn-area">  <input type="text" class="tui-timepicker-spinbox-input"        maxlength="{{maxLength}}"        size="{{maxLength}}"        value="{{formatTime initialValue format}}"        aria-label="TimePicker spinbox value">  <button type="button" class="tui-timepicker-btn tui-timepicker-btn-up">    <span class="tui-ico-t-btn">Increase</span>  </button>  <button type="button" class="tui-timepicker-btn tui-timepicker-btn-down">    <span class="tui-ico-t-btn">Decrease</span>  </button></div>';
            return template(source, context);
          };
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inArray = __webpack_require__(0);
          var CustomEvents2 = __webpack_require__(8);
          var defineClass = __webpack_require__(9);
          var extend = __webpack_require__(2);
          var on2 = __webpack_require__(10);
          var off = __webpack_require__(11);
          var closest = __webpack_require__(12);
          var removeElement = __webpack_require__(13);
          var isHTMLNode = __webpack_require__(14);
          var util = __webpack_require__(15);
          var tmpl = __webpack_require__(39);
          var Selectbox = defineClass({
            init: function(container, options) {
              options = extend({
                items: []
              }, options);
              this._container = isHTMLNode(container) ? container : document.querySelector(container);
              this._items = options.items || [];
              this._disabledItems = options.disabledItems || [];
              this._selectedIndex = Math.max(0, inArray(options.initialValue, this._items));
              this._format = options.format;
              this._element = null;
              this._render();
              this._setEvents();
            },
            _render: function() {
              var context;
              this._changeEnabledIndex();
              context = {
                items: this._items,
                format: this._format,
                initialValue: this.getValue(),
                disabledItems: this._disabledItems,
                formatTime: util.formatTime,
                equals: function(a5, b4) {
                  return a5 === b4;
                }
              };
              if (this._element) {
                this._removeElement();
              }
              this._container.innerHTML = tmpl(context);
              this._element = this._container.firstChild;
              on2(this._element, "change", this._onChangeHandler, this);
            },
            _changeEnabledIndex: function() {
              var index = inArray(this.getValue(), this._items);
              if (this._disabledItems[index]) {
                this._selectedIndex = inArray(false, this._disabledItems);
              }
            },
            setDisabledItems: function(disabledItems) {
              this._disabledItems = disabledItems;
              this._render();
            },
            _setEvents: function() {
              this.on("changeItems", function(items) {
                this._items = items;
                this._render();
              }, this);
            },
            _removeEvents: function() {
              this.off();
            },
            _removeElement: function() {
              off(this._element, "change", this._onChangeHandler, this);
              removeElement(this._element);
            },
            _onChangeHandler: function(ev) {
              if (closest(util.getTarget(ev), "select")) {
                this._setNewValue();
              }
            },
            _setNewValue: function() {
              var newValue = Number(this._element.value);
              this._selectedIndex = inArray(newValue, this._items);
              this.fire("change", {
                value: newValue
              });
            },
            getValue: function() {
              return this._items[this._selectedIndex];
            },
            setValue: function(value) {
              var newIndex = inArray(value, this._items);
              if (newIndex > -1 && newIndex !== this._selectedIndex) {
                this._selectedIndex = newIndex;
                this._element.value = value;
                this._setNewValue();
              }
            },
            destroy: function() {
              this._removeEvents();
              this._removeElement();
              this._container = this._items = this._selectedIndex = this._element = null;
            }
          });
          CustomEvents2.mixin(Selectbox);
          module2.exports = Selectbox;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var template = __webpack_require__(7);
          module2.exports = function(context) {
            var source = '<select class="tui-timepicker-select" aria-label="Time">  {{each items}}    {{if equals initialValue @this}}      <option value="{{@this}}" selected {{if disabledItems[@index]}}disabled{{/if}}>{{formatTime @this format}}</option>    {{else}}      <option value="{{@this}}" {{if disabledItems[@index]}}disabled{{/if}}>{{formatTime @this format}}</option>    {{/if}}  {{/each}}</select>';
            return template(source, context);
          };
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          module2.exports = {
            en: {
              am: "AM",
              pm: "PM"
            },
            ko: {
              am: "\uC624\uC804",
              pm: "\uC624\uD6C4"
            }
          };
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var template = __webpack_require__(7);
          module2.exports = function(context) {
            var source = '<div class="tui-timepicker">  <div class="tui-timepicker-body">    <div class="tui-timepicker-row">      {{if isSpinbox}}        <div class="tui-timepicker-column tui-timepicker-spinbox tui-timepicker-hour"></div>        <span class="tui-timepicker-column tui-timepicker-colon"><span class="tui-ico-colon">:</span></span>        <div class="tui-timepicker-column tui-timepicker-spinbox tui-timepicker-minute"></div>        {{if showMeridiem}}          {{meridiemElement}}        {{/if}}      {{else}}        <div class="tui-timepicker-column tui-timepicker-selectbox tui-timepicker-hour"></div>        <span class="tui-timepicker-column tui-timepicker-colon"><span class="tui-ico-colon">:</span></span>        <div class="tui-timepicker-column tui-timepicker-selectbox tui-timepicker-minute"></div>        {{if showMeridiem}}          {{meridiemElement}}        {{/if}}      {{/if}}    </div>  </div></div>';
            return template(source, context);
          };
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var template = __webpack_require__(7);
          module2.exports = function(context) {
            var source = '{{if isSpinbox}}  <div class="tui-timepicker-column tui-timepicker-checkbox tui-timepicker-meridiem">    <div class="tui-timepicker-check-area">      <ul class="tui-timepicker-check-lst">        <li class="tui-timepicker-check">          <div class="tui-timepicker-radio">            <input type="radio"                  name="optionsRadios-{{radioId}}"                  value="AM"                  class="tui-timepicker-radio-am"                  id="tui-timepicker-radio-am-{{radioId}}">            <label for="tui-timepicker-radio-am-{{radioId}}" class="tui-timepicker-radio-label">              <span class="tui-timepicker-input-radio"></span>{{am}}            </label>          </div>        </li>        <li class="tui-timepicker-check">          <div class="tui-timepicker-radio">            <input type="radio"                  name="optionsRadios-{{radioId}}"                  value="PM"                  class="tui-timepicker-radio-pm"                  id="tui-timepicker-radio-pm-{{radioId}}">            <label for="tui-timepicker-radio-pm-{{radioId}}" class="tui-timepicker-radio-label">              <span class="tui-timepicker-input-radio"></span>{{pm}}            </label>          </div>        </li>      </ul>    </div>  </div>{{else}}  <div class="tui-timepicker-column tui-timepicker-selectbox tui-is-add-picker tui-timepicker-meridiem">    <select class="tui-timepicker-select" aria-label="AM/PM">      <option value="AM">{{am}}</option>      <option value="PM">{{pm}}</option>    </select>  </div>{{/if}}';
            return template(source, context);
          };
        }
      ]);
    });
  }
});

// ../../node_modules/tui-date-picker/dist/tui-date-picker.js
var require_tui_date_picker = __commonJS({
  "../../node_modules/tui-date-picker/dist/tui-date-picker.js"(exports, module) {
    (function webpackUniversalModuleDefinition(root, factory) {
      if (typeof exports === "object" && typeof module === "object")
        module.exports = factory(require_tui_time_picker());
      else if (typeof define === "function" && define.amd)
        define(["tui-time-picker"], factory);
      else if (typeof exports === "object")
        exports["DatePicker"] = factory(require_tui_time_picker());
      else
        root["tui"] = root["tui"] || {}, root["tui"]["DatePicker"] = factory(root["tui"]["TimePicker"]);
    })(window, function(__WEBPACK_EXTERNAL_MODULE__43__) {
      return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
          }
          var module2 = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
          };
          modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
          module2.l = true;
          return module2.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports2, name, getter) {
          if (!__webpack_require__.o(exports2, name)) {
            Object.defineProperty(exports2, name, { enumerable: true, get: getter });
          }
        };
        __webpack_require__.r = function(exports2) {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
          }
          Object.defineProperty(exports2, "__esModule", { value: true });
        };
        __webpack_require__.t = function(value, mode) {
          if (mode & 1)
            value = __webpack_require__(value);
          if (mode & 8)
            return value;
          if (mode & 4 && typeof value === "object" && value && value.__esModule)
            return value;
          var ns = /* @__PURE__ */ Object.create(null);
          __webpack_require__.r(ns);
          Object.defineProperty(ns, "default", { enumerable: true, value });
          if (mode & 2 && typeof value != "string")
            for (var key in value)
              __webpack_require__.d(ns, key, function(key2) {
                return value[key2];
              }.bind(null, key));
          return ns;
        };
        __webpack_require__.n = function(module2) {
          var getter = module2 && module2.__esModule ? function getDefault() {
            return module2["default"];
          } : function getModuleExports() {
            return module2;
          };
          __webpack_require__.d(getter, "a", getter);
          return getter;
        };
        __webpack_require__.o = function(object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "dist";
        return __webpack_require__(__webpack_require__.s = 34);
      }([
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inherit = __webpack_require__(35);
          var extend = __webpack_require__(7);
          function defineClass(parent, props) {
            var obj;
            if (!props) {
              props = parent;
              parent = null;
            }
            obj = props.init || function() {
            };
            if (parent) {
              inherit(obj, parent);
            }
            if (props.hasOwnProperty("static")) {
              extend(obj, props["static"]);
              delete props["static"];
            }
            extend(obj.prototype, props);
            return obj;
          }
          module2.exports = defineClass;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          module2.exports = {
            TYPE_DATE: "date",
            TYPE_MONTH: "month",
            TYPE_YEAR: "year",
            TYPE_HOUR: "hour",
            TYPE_MINUTE: "minute",
            TYPE_MERIDIEM: "meridiem",
            MIN_DATE: new Date(1900, 0, 1),
            MAX_DATE: new Date(2999, 11, 31),
            DEFAULT_LANGUAGE_TYPE: "en",
            CLASS_NAME_SELECTED: "tui-is-selected",
            CLASS_NAME_PREV_MONTH_BTN: "tui-calendar-btn-prev-month",
            CLASS_NAME_PREV_YEAR_BTN: "tui-calendar-btn-prev-year",
            CLASS_NAME_NEXT_YEAR_BTN: "tui-calendar-btn-next-year",
            CLASS_NAME_NEXT_MONTH_BTN: "tui-calendar-btn-next-month",
            CLASS_NAME_TITLE_TODAY: "tui-calendar-title-today",
            DEFAULT_WEEK_START_DAY: "Sun",
            WEEK_START_DAY_MAP: {
              sun: 0,
              mon: 1,
              tue: 2,
              wed: 3,
              thu: 4,
              fri: 5,
              sat: 6
            }
          };
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
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
          module2.exports = forEachArray;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isArray = __webpack_require__(6);
          function inArray(searchElement, array, startIndex) {
            var i5;
            var length;
            startIndex = startIndex || 0;
            if (!isArray(array)) {
              return -1;
            }
            if (Array.prototype.indexOf) {
              return Array.prototype.indexOf.call(array, searchElement, startIndex);
            }
            length = array.length;
            for (i5 = startIndex; startIndex >= 0 && i5 < length; i5 += 1) {
              if (array[i5] === searchElement) {
                return i5;
              }
            }
            return -1;
          }
          module2.exports = inArray;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEachArray = __webpack_require__(2);
          var isHTMLNode = __webpack_require__(46);
          var sendHostname2 = __webpack_require__(47);
          var currentId = 0;
          var utils = {
            getTarget: function(ev) {
              return ev.target || ev.srcElement;
            },
            getElement: function(param) {
              return isHTMLNode(param) ? param : document.querySelector(param);
            },
            getSelector: function(elem) {
              var selector = "";
              if (elem.id) {
                selector = "#" + elem.id;
              } else if (elem.className) {
                selector = "." + elem.className.split(" ")[0];
              }
              return selector;
            },
            generateId: function() {
              currentId += 1;
              return currentId;
            },
            filter: function(arr, iteratee) {
              var result = [];
              forEachArray(arr, function(item) {
                if (iteratee(item)) {
                  result.push(item);
                }
              });
              return result;
            },
            sendHostName: function() {
              sendHostname2("date-picker", "UA-129987462-1");
            }
          };
          module2.exports = utils;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isDate = __webpack_require__(28);
          var isNumber = __webpack_require__(15);
          var constants = __webpack_require__(1);
          var TYPE_DATE = constants.TYPE_DATE;
          var TYPE_MONTH = constants.TYPE_MONTH;
          var TYPE_YEAR = constants.TYPE_YEAR;
          var utils = {
            getWeeksCount: function(year, month) {
              var firstDay = utils.getFirstDay(year, month), lastDate = utils.getLastDayInMonth(year, month);
              return Math.ceil((firstDay + lastDate) / 7);
            },
            isValidDate: function(date2) {
              return isDate(date2) && !isNaN(date2.getTime());
            },
            getFirstDay: function(year, month) {
              return new Date(year, month - 1, 1).getDay();
            },
            getFirstDayTimestamp: function(year, month) {
              return new Date(year, month, 1).getTime();
            },
            getLastDayInMonth: function(year, month) {
              return new Date(year, month, 0).getDate();
            },
            prependLeadingZero: function(number) {
              var prefix = "";
              if (number < 10) {
                prefix = "0";
              }
              return prefix + number;
            },
            getMeridiemHour: function(hour) {
              hour %= 12;
              if (hour === 0) {
                hour = 12;
              }
              return hour;
            },
            getSafeNumber: function(any, defaultNumber) {
              if (isNaN(defaultNumber) || !isNumber(defaultNumber)) {
                throw Error("The defaultNumber must be a valid number.");
              }
              if (isNaN(any)) {
                return defaultNumber;
              }
              return Number(any);
            },
            getDateOfWeek: function(year, month, weekNumber, dayNumber) {
              var firstDayOfMonth = new Date(year, month - 1).getDay();
              var dateOffset = firstDayOfMonth - dayNumber - 1;
              return new Date(year, month - 1, weekNumber * 7 - dateOffset);
            },
            getRangeArr: function(start, end) {
              var arr = [];
              var i5;
              if (start > end) {
                for (i5 = end; i5 >= start; i5 -= 1) {
                  arr.push(i5);
                }
              } else {
                for (i5 = start; i5 <= end; i5 += 1) {
                  arr.push(i5);
                }
              }
              return arr;
            },
            cloneWithStartOf: function(date2, type) {
              type = type || TYPE_DATE;
              date2 = new Date(date2);
              date2.setHours(0, 0, 0, 0);
              switch (type) {
                case TYPE_DATE:
                  break;
                case TYPE_MONTH:
                  date2.setDate(1);
                  break;
                case TYPE_YEAR:
                  date2.setMonth(0, 1);
                  break;
                default:
                  throw Error("Unsupported type: " + type);
              }
              return date2;
            },
            cloneWithEndOf: function(date2, type) {
              type = type || TYPE_DATE;
              date2 = new Date(date2);
              date2.setHours(23, 59, 59, 999);
              switch (type) {
                case TYPE_DATE:
                  break;
                case TYPE_MONTH:
                  date2.setMonth(date2.getMonth() + 1, 0);
                  break;
                case TYPE_YEAR:
                  date2.setMonth(11, 31);
                  break;
                default:
                  throw Error("Unsupported type: " + type);
              }
              return date2;
            },
            compare: function(dateA, dateB, cmpLevel) {
              var aTimestamp, bTimestamp;
              if (!(utils.isValidDate(dateA) && utils.isValidDate(dateB))) {
                return NaN;
              }
              if (!cmpLevel) {
                aTimestamp = dateA.getTime();
                bTimestamp = dateB.getTime();
              } else {
                aTimestamp = utils.cloneWithStartOf(dateA, cmpLevel).getTime();
                bTimestamp = utils.cloneWithStartOf(dateB, cmpLevel).getTime();
              }
              if (aTimestamp > bTimestamp) {
                return 1;
              }
              return aTimestamp === bTimestamp ? 0 : -1;
            },
            isSame: function(dateA, dateB, cmpLevel) {
              return utils.compare(dateA, dateB, cmpLevel) === 0;
            },
            inRange: function(start, end, target, cmpLevel) {
              return utils.compare(start, target, cmpLevel) < 1 && utils.compare(end, target, cmpLevel) > -1;
            }
          };
          module2.exports = utils;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isArray(obj) {
            return obj instanceof Array;
          }
          module2.exports = isArray;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function extend(target, objects) {
            var hasOwnProp = Object.prototype.hasOwnProperty;
            var source, prop, i5, len;
            for (i5 = 1, len = arguments.length; i5 < len; i5 += 1) {
              source = arguments[i5];
              for (prop in source) {
                if (hasOwnProp.call(source, prop)) {
                  target[prop] = source[prop];
                }
              }
            }
            return target;
          }
          module2.exports = extend;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var extend = __webpack_require__(7);
          var isExisty = __webpack_require__(37);
          var isString2 = __webpack_require__(13);
          var isObject = __webpack_require__(22);
          var isArray = __webpack_require__(6);
          var isFunction2 = __webpack_require__(39);
          var forEach = __webpack_require__(9);
          var R_EVENTNAME_SPLIT = /\s+/g;
          function CustomEvents2() {
            this.events = null;
            this.contexts = null;
          }
          CustomEvents2.mixin = function(func) {
            extend(func.prototype, CustomEvents2.prototype);
          };
          CustomEvents2.prototype._getHandlerItem = function(handler, context) {
            var item = { handler };
            if (context) {
              item.context = context;
            }
            return item;
          };
          CustomEvents2.prototype._safeEvent = function(eventName) {
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
          CustomEvents2.prototype._safeContext = function() {
            var context = this.contexts;
            if (!context) {
              context = this.contexts = [];
            }
            return context;
          };
          CustomEvents2.prototype._indexOfContext = function(ctx) {
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
          CustomEvents2.prototype._memorizeContext = function(ctx) {
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
          CustomEvents2.prototype._forgetContext = function(ctx) {
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
          CustomEvents2.prototype._bindEvent = function(eventName, handler, context) {
            var events = this._safeEvent(eventName);
            this._memorizeContext(context);
            events.push(this._getHandlerItem(handler, context));
          };
          CustomEvents2.prototype.on = function(eventName, handler, context) {
            var self2 = this;
            if (isString2(eventName)) {
              eventName = eventName.split(R_EVENTNAME_SPLIT);
              forEach(eventName, function(name) {
                self2._bindEvent(name, handler, context);
              });
            } else if (isObject(eventName)) {
              context = handler;
              forEach(eventName, function(func, name) {
                self2.on(name, func, context);
              });
            }
          };
          CustomEvents2.prototype.once = function(eventName, handler, context) {
            var self2 = this;
            if (isObject(eventName)) {
              context = handler;
              forEach(eventName, function(func, name) {
                self2.once(name, func, context);
              });
              return;
            }
            function onceHandler() {
              handler.apply(context, arguments);
              self2.off(eventName, onceHandler, context);
            }
            this.on(eventName, onceHandler, context);
          };
          CustomEvents2.prototype._spliceMatches = function(arr, predicate) {
            var i5 = 0;
            var len;
            if (!isArray(arr)) {
              return;
            }
            for (len = arr.length; i5 < len; i5 += 1) {
              if (predicate(arr[i5]) === true) {
                arr.splice(i5, 1);
                len -= 1;
                i5 -= 1;
              }
            }
          };
          CustomEvents2.prototype._matchHandler = function(handler) {
            var self2 = this;
            return function(item) {
              var needRemove = handler === item.handler;
              if (needRemove) {
                self2._forgetContext(item.context);
              }
              return needRemove;
            };
          };
          CustomEvents2.prototype._matchContext = function(context) {
            var self2 = this;
            return function(item) {
              var needRemove = context === item.context;
              if (needRemove) {
                self2._forgetContext(item.context);
              }
              return needRemove;
            };
          };
          CustomEvents2.prototype._matchHandlerAndContext = function(handler, context) {
            var self2 = this;
            return function(item) {
              var matchHandler = handler === item.handler;
              var matchContext = context === item.context;
              var needRemove = matchHandler && matchContext;
              if (needRemove) {
                self2._forgetContext(item.context);
              }
              return needRemove;
            };
          };
          CustomEvents2.prototype._offByEventName = function(eventName, handler) {
            var self2 = this;
            var andByHandler = isFunction2(handler);
            var matchHandler = self2._matchHandler(handler);
            eventName = eventName.split(R_EVENTNAME_SPLIT);
            forEach(eventName, function(name) {
              var handlerItems = self2._safeEvent(name);
              if (andByHandler) {
                self2._spliceMatches(handlerItems, matchHandler);
              } else {
                forEach(handlerItems, function(item) {
                  self2._forgetContext(item.context);
                });
                self2.events[name] = [];
              }
            });
          };
          CustomEvents2.prototype._offByHandler = function(handler) {
            var self2 = this;
            var matchHandler = this._matchHandler(handler);
            forEach(this._safeEvent(), function(handlerItems) {
              self2._spliceMatches(handlerItems, matchHandler);
            });
          };
          CustomEvents2.prototype._offByObject = function(obj, handler) {
            var self2 = this;
            var matchFunc;
            if (this._indexOfContext(obj) < 0) {
              forEach(obj, function(func, name) {
                self2.off(name, func);
              });
            } else if (isString2(handler)) {
              matchFunc = this._matchContext(obj);
              self2._spliceMatches(this._safeEvent(handler), matchFunc);
            } else if (isFunction2(handler)) {
              matchFunc = this._matchHandlerAndContext(handler, obj);
              forEach(this._safeEvent(), function(handlerItems) {
                self2._spliceMatches(handlerItems, matchFunc);
              });
            } else {
              matchFunc = this._matchContext(obj);
              forEach(this._safeEvent(), function(handlerItems) {
                self2._spliceMatches(handlerItems, matchFunc);
              });
            }
          };
          CustomEvents2.prototype.off = function(eventName, handler) {
            if (isString2(eventName)) {
              this._offByEventName(eventName, handler);
            } else if (!arguments.length) {
              this.events = {};
              this.contexts = [];
            } else if (isFunction2(eventName)) {
              this._offByHandler(eventName);
            } else if (isObject(eventName)) {
              this._offByObject(eventName, handler);
            }
          };
          CustomEvents2.prototype.fire = function(eventName) {
            this.invoke.apply(this, arguments);
          };
          CustomEvents2.prototype.invoke = function(eventName) {
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
          CustomEvents2.prototype.hasListener = function(eventName) {
            return this.getListenerLength(eventName) > 0;
          };
          CustomEvents2.prototype.getListenerLength = function(eventName) {
            var events = this._safeEvent(eventName);
            return events.length;
          };
          module2.exports = CustomEvents2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isArray = __webpack_require__(6);
          var forEachArray = __webpack_require__(2);
          var forEachOwnProperties = __webpack_require__(23);
          function forEach(obj, iteratee, context) {
            if (isArray(obj)) {
              forEachArray(obj, iteratee, context);
            } else {
              forEachOwnProperties(obj, iteratee, context);
            }
          }
          module2.exports = forEach;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          module2.exports = {
            en: {
              titles: {
                DD: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                D: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                MMM: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                MMMM: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December"
                ]
              },
              titleFormat: "MMMM yyyy",
              todayFormat: "To\\d\\ay: DD, MMMM d, yyyy",
              time: "Time",
              date: "Date"
            },
            ko: {
              titles: {
                DD: ["\uC77C\uC694\uC77C", "\uC6D4\uC694\uC77C", "\uD654\uC694\uC77C", "\uC218\uC694\uC77C", "\uBAA9\uC694\uC77C", "\uAE08\uC694\uC77C", "\uD1A0\uC694\uC77C"],
                D: ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"],
                MMM: ["1\uC6D4", "2\uC6D4", "3\uC6D4", "4\uC6D4", "5\uC6D4", "6\uC6D4", "7\uC6D4", "8\uC6D4", "9\uC6D4", "10\uC6D4", "11\uC6D4", "12\uC6D4"],
                MMMM: ["1\uC6D4", "2\uC6D4", "3\uC6D4", "4\uC6D4", "5\uC6D4", "6\uC6D4", "7\uC6D4", "8\uC6D4", "9\uC6D4", "10\uC6D4", "11\uC6D4", "12\uC6D4"]
              },
              titleFormat: "yyyy.MM",
              todayFormat: "\uC624\uB298: yyyy.MM.dd (D)",
              date: "\uB0A0\uC9DC",
              time: "\uC2DC\uAC04"
            }
          };
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inArray = __webpack_require__(3);
          var forEach = __webpack_require__(9);
          var isArray = __webpack_require__(6);
          var isString2 = __webpack_require__(13);
          var extend = __webpack_require__(7);
          var EXPRESSION_REGEXP = /{{\s?|\s?}}/g;
          var BRACKET_NOTATION_REGEXP = /^[a-zA-Z0-9_@]+\[[a-zA-Z0-9_@"']+\]$/;
          var BRACKET_REGEXP = /\[\s?|\s?\]/;
          var DOT_NOTATION_REGEXP = /^[a-zA-Z_]+\.[a-zA-Z_]+$/;
          var DOT_REGEXP = /\./;
          var STRING_NOTATION_REGEXP = /^["']\w+["']$/;
          var STRING_REGEXP = /"|'/g;
          var NUMBER_REGEXP = /^-?\d+\.?\d*$/;
          var EXPRESSION_INTERVAL = 2;
          var BLOCK_HELPERS = {
            "if": handleIf,
            "each": handleEach,
            "with": handleWith
          };
          var isValidSplit = "a".split(/a/).length === 3;
          var splitByRegExp = function() {
            if (isValidSplit) {
              return function(text, regexp) {
                return text.split(regexp);
              };
            }
            return function(text, regexp) {
              var result = [];
              var prevIndex = 0;
              var match, index;
              if (!regexp.global) {
                regexp = new RegExp(regexp, "g");
              }
              match = regexp.exec(text);
              while (match !== null) {
                index = match.index;
                result.push(text.slice(prevIndex, index));
                prevIndex = index + match[0].length;
                match = regexp.exec(text);
              }
              result.push(text.slice(prevIndex));
              return result;
            };
          }();
          function getValueFromContext(exp, context) {
            var splitedExps;
            var value = context[exp];
            if (exp === "true") {
              value = true;
            } else if (exp === "false") {
              value = false;
            } else if (STRING_NOTATION_REGEXP.test(exp)) {
              value = exp.replace(STRING_REGEXP, "");
            } else if (BRACKET_NOTATION_REGEXP.test(exp)) {
              splitedExps = exp.split(BRACKET_REGEXP);
              value = getValueFromContext(splitedExps[0], context)[getValueFromContext(splitedExps[1], context)];
            } else if (DOT_NOTATION_REGEXP.test(exp)) {
              splitedExps = exp.split(DOT_REGEXP);
              value = getValueFromContext(splitedExps[0], context)[splitedExps[1]];
            } else if (NUMBER_REGEXP.test(exp)) {
              value = parseFloat(exp);
            }
            return value;
          }
          function extractElseif(ifExps, sourcesInsideBlock) {
            var exps = [ifExps];
            var sourcesInsideIf = [];
            var otherIfCount = 0;
            var start = 0;
            forEach(sourcesInsideBlock, function(source, index) {
              if (source.indexOf("if") === 0) {
                otherIfCount += 1;
              } else if (source === "/if") {
                otherIfCount -= 1;
              } else if (!otherIfCount && (source.indexOf("elseif") === 0 || source === "else")) {
                exps.push(source === "else" ? ["true"] : source.split(" ").slice(1));
                sourcesInsideIf.push(sourcesInsideBlock.slice(start, index));
                start = index + 1;
              }
            });
            sourcesInsideIf.push(sourcesInsideBlock.slice(start));
            return {
              exps,
              sourcesInsideIf
            };
          }
          function handleIf(exps, sourcesInsideBlock, context) {
            var analyzed = extractElseif(exps, sourcesInsideBlock);
            var result = false;
            var compiledSource = "";
            forEach(analyzed.exps, function(exp, index) {
              result = handleExpression(exp, context);
              if (result) {
                compiledSource = compile(analyzed.sourcesInsideIf[index], context);
              }
              return !result;
            });
            return compiledSource;
          }
          function handleEach(exps, sourcesInsideBlock, context) {
            var collection = handleExpression(exps, context);
            var additionalKey = isArray(collection) ? "@index" : "@key";
            var additionalContext = {};
            var result = "";
            forEach(collection, function(item, key) {
              additionalContext[additionalKey] = key;
              additionalContext["@this"] = item;
              extend(context, additionalContext);
              result += compile(sourcesInsideBlock.slice(), context);
            });
            return result;
          }
          function handleWith(exps, sourcesInsideBlock, context) {
            var asIndex = inArray("as", exps);
            var alias = exps[asIndex + 1];
            var result = handleExpression(exps.slice(0, asIndex), context);
            var additionalContext = {};
            additionalContext[alias] = result;
            return compile(sourcesInsideBlock, extend(context, additionalContext)) || "";
          }
          function extractSourcesInsideBlock(sources, start, end) {
            var sourcesInsideBlock = sources.splice(start + 1, end - start);
            sourcesInsideBlock.pop();
            return sourcesInsideBlock;
          }
          function handleBlockHelper(helperKeyword, sourcesToEnd, context) {
            var executeBlockHelper = BLOCK_HELPERS[helperKeyword];
            var helperCount = 1;
            var startBlockIndex = 0;
            var endBlockIndex;
            var index = startBlockIndex + EXPRESSION_INTERVAL;
            var expression = sourcesToEnd[index];
            while (helperCount && isString2(expression)) {
              if (expression.indexOf(helperKeyword) === 0) {
                helperCount += 1;
              } else if (expression.indexOf("/" + helperKeyword) === 0) {
                helperCount -= 1;
                endBlockIndex = index;
              }
              index += EXPRESSION_INTERVAL;
              expression = sourcesToEnd[index];
            }
            if (helperCount) {
              throw Error(helperKeyword + " needs {{/" + helperKeyword + "}} expression.");
            }
            sourcesToEnd[startBlockIndex] = executeBlockHelper(sourcesToEnd[startBlockIndex].split(" ").slice(1), extractSourcesInsideBlock(sourcesToEnd, startBlockIndex, endBlockIndex), context);
            return sourcesToEnd;
          }
          function handleExpression(exps, context) {
            var result = getValueFromContext(exps[0], context);
            if (result instanceof Function) {
              return executeFunction(result, exps.slice(1), context);
            }
            return result;
          }
          function executeFunction(helper, argExps, context) {
            var args = [];
            forEach(argExps, function(exp) {
              args.push(getValueFromContext(exp, context));
            });
            return helper.apply(null, args);
          }
          function compile(sources, context) {
            var index = 1;
            var expression = sources[index];
            var exps, firstExp, result;
            while (isString2(expression)) {
              exps = expression.split(" ");
              firstExp = exps[0];
              if (BLOCK_HELPERS[firstExp]) {
                result = handleBlockHelper(firstExp, sources.splice(index, sources.length - index), context);
                sources = sources.concat(result);
              } else {
                sources[index] = handleExpression(exps, context);
              }
              index += EXPRESSION_INTERVAL;
              expression = sources[index];
            }
            return sources.join("");
          }
          function template(text, context) {
            return compile(splitByRegExp(text, EXPRESSION_REGEXP), context);
          }
          module2.exports = template;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isUndefined2(obj) {
            return obj === void 0;
          }
          module2.exports = isUndefined2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isString2(obj) {
            return typeof obj === "string" || obj instanceof String;
          }
          module2.exports = isString2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function removeElement(element) {
            if (element && element.parentNode) {
              element.parentNode.removeChild(element);
            }
          }
          module2.exports = removeElement;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isNumber(obj) {
            return typeof obj === "number" || obj instanceof Number;
          }
          module2.exports = isNumber;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEach = __webpack_require__(9);
          var inArray = __webpack_require__(3);
          var getClass = __webpack_require__(17);
          var setClassName = __webpack_require__(24);
          function addClass(element) {
            var cssClass = Array.prototype.slice.call(arguments, 1);
            var classList = element.classList;
            var newClass = [];
            var origin;
            if (classList) {
              forEach(cssClass, function(name) {
                element.classList.add(name);
              });
              return;
            }
            origin = getClass(element);
            if (origin) {
              cssClass = [].concat(origin.split(/\s+/), cssClass);
            }
            forEach(cssClass, function(cls2) {
              if (inArray(cls2, newClass) < 0) {
                newClass.push(cls2);
              }
            });
            setClassName(element, newClass);
          }
          module2.exports = addClass;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isUndefined2 = __webpack_require__(12);
          function getClass(element) {
            if (!element || !element.className) {
              return "";
            }
            if (isUndefined2(element.className.baseVal)) {
              return element.className;
            }
            return element.className.baseVal;
          }
          module2.exports = getClass;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEachArray = __webpack_require__(2);
          var inArray = __webpack_require__(3);
          var getClass = __webpack_require__(17);
          var setClassName = __webpack_require__(24);
          function removeClass(element) {
            var cssClass = Array.prototype.slice.call(arguments, 1);
            var classList = element.classList;
            var origin, newClass;
            if (classList) {
              forEachArray(cssClass, function(name) {
                classList.remove(name);
              });
              return;
            }
            origin = getClass(element).split(/\s+/);
            newClass = [];
            forEachArray(origin, function(name) {
              if (inArray(name, cssClass) < 0) {
                newClass.push(name);
              }
            });
            setClassName(element, newClass);
          }
          module2.exports = removeClass;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var on2 = __webpack_require__(31);
          var off = __webpack_require__(33);
          var mouseTouchEvent = {
            _isMobile: function() {
              return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
            }(),
            _getEventType: function(type) {
              if (this._isMobile) {
                if (type === "mousedown") {
                  type = "touchstart";
                } else if (type === "click") {
                  type = "touchend";
                }
              }
              return type;
            },
            on: function(element, type, handler, context) {
              on2(element, this._getEventType(type), handler, context);
            },
            off: function(element, type, handler) {
              off(element, this._getEventType(type), handler);
            }
          };
          module2.exports = mouseTouchEvent;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var defineClass = __webpack_require__(0);
          var removeElement = __webpack_require__(14);
          var localeText = __webpack_require__(10);
          var DEFAULT_LANGUAGE_TYPE = __webpack_require__(1).DEFAULT_LANGUAGE_TYPE;
          var LayerBase = defineClass({
            init: function(language) {
              language = language || DEFAULT_LANGUAGE_TYPE;
              this._element = null;
              this._localeText = localeText[language];
              this._type = "base";
            },
            _makeContext: function() {
              throwOverrideError(this.getType(), "_makeContext");
            },
            render: function() {
              throwOverrideError(this.getType(), "render");
            },
            getDateElements: function() {
              throwOverrideError(this.getType(), "getDateElements");
            },
            getType: function() {
              return this._type;
            },
            changeLanguage: function(language) {
              this._localeText = localeText[language];
            },
            remove: function() {
              if (this._element) {
                removeElement(this._element);
              }
              this._element = null;
            }
          });
          function throwOverrideError(layerType, methodName) {
            throw new Error(layerType + ' layer does not have the "' + methodName + '" method.');
          }
          module2.exports = LayerBase;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inArray = __webpack_require__(3);
          var forEachArray = __webpack_require__(2);
          var defineClass = __webpack_require__(0);
          var CustomEvents2 = __webpack_require__(8);
          var addClass = __webpack_require__(16);
          var closest = __webpack_require__(25);
          var getData = __webpack_require__(26);
          var hasClass = __webpack_require__(27);
          var removeClass = __webpack_require__(18);
          var removeElement = __webpack_require__(14);
          var extend = __webpack_require__(7);
          var isArray = __webpack_require__(6);
          var isDate = __webpack_require__(28);
          var isNumber = __webpack_require__(15);
          var isObject = __webpack_require__(22);
          var TimePicker = __webpack_require__(43);
          var Calendar2 = __webpack_require__(29);
          var RangeModel = __webpack_require__(56);
          var constants = __webpack_require__(1);
          var localeTexts = __webpack_require__(10);
          var dateUtil = __webpack_require__(5);
          var util = __webpack_require__(4);
          var mouseTouchEvent = __webpack_require__(19);
          var tmpl = __webpack_require__(58);
          var DatePickerInput = __webpack_require__(59);
          var DEFAULT_WEEK_START_DAY = constants.DEFAULT_WEEK_START_DAY;
          var DEFAULT_LANGUAGE_TYPE = constants.DEFAULT_LANGUAGE_TYPE;
          var TYPE_DATE = constants.TYPE_DATE;
          var TYPE_MONTH = constants.TYPE_MONTH;
          var TYPE_YEAR = constants.TYPE_YEAR;
          var CLASS_NAME_NEXT_YEAR_BTN = constants.CLASS_NAME_NEXT_YEAR_BTN;
          var CLASS_NAME_NEXT_MONTH_BTN = constants.CLASS_NAME_NEXT_MONTH_BTN;
          var CLASS_NAME_PREV_YEAR_BTN = constants.CLASS_NAME_PREV_YEAR_BTN;
          var CLASS_NAME_PREV_MONTH_BTN = constants.CLASS_NAME_PREV_MONTH_BTN;
          var CLASS_NAME_SELECTED = constants.CLASS_NAME_SELECTED;
          var CLASS_NAME_TITLE_TODAY = constants.CLASS_NAME_TITLE_TODAY;
          var CLASS_NAME_SELECTABLE = "tui-is-selectable";
          var CLASS_NAME_BLOCKED = "tui-is-blocked";
          var CLASS_NAME_CHECKED = "tui-is-checked";
          var CLASS_NAME_SELECTOR_BUTTON = "tui-datepicker-selector-button";
          var CLASS_NAME_TODAY = "tui-calendar-today";
          var CLASS_NAME_HIDDEN = "tui-hidden";
          var SELECTOR_BODY = ".tui-datepicker-body";
          var SELECTOR_DATE_ICO = ".tui-ico-date";
          var SELECTOR_CALENDAR_TITLE = ".tui-calendar-title";
          var SELECTOR_CALENDAR_CONTAINER = ".tui-calendar-container";
          var SELECTOR_TIMEPICKER_CONTAINER = ".tui-timepicker-container";
          var mergeDefaultOption = function(option) {
            option = extend({
              language: DEFAULT_LANGUAGE_TYPE,
              calendar: {},
              input: {
                element: null,
                format: null
              },
              timePicker: null,
              date: null,
              showAlways: false,
              type: TYPE_DATE,
              selectableRanges: null,
              openers: [],
              autoClose: true,
              usageStatistics: true,
              weekStartDay: DEFAULT_WEEK_START_DAY
            }, option);
            option.selectableRanges = option.selectableRanges || [[constants.MIN_DATE, constants.MAX_DATE]];
            if (!isObject(option.calendar)) {
              throw new Error("Calendar option must be an object");
            }
            if (!isObject(option.input)) {
              throw new Error("Input option must be an object");
            }
            if (!isArray(option.selectableRanges)) {
              throw new Error("Selectable-ranges must be a 2d-array");
            }
            option.localeText = localeTexts[option.language];
            option.calendar.language = option.language;
            option.calendar.type = option.type;
            option.timePicker = option.timePicker || option.timepicker;
            return option;
          };
          var DatePicker2 = defineClass({
            static: {
              localeTexts
            },
            init: function(container, options) {
              options = mergeDefaultOption(options);
              this._language = options.language;
              this._container = util.getElement(container);
              this._container.innerHTML = tmpl(extend(options, {
                isTab: options.timePicker && options.timePicker.layoutType === "tab"
              }));
              this._element = this._container.firstChild;
              this._calendar = new Calendar2(this._element.querySelector(SELECTOR_CALENDAR_CONTAINER), extend(options.calendar, {
                usageStatistics: options.usageStatistics,
                weekStartDay: options.weekStartDay
              }));
              this._timePicker = null;
              this._datepickerInput = null;
              this._date = null;
              this._rangeModel = null;
              this._openers = [];
              this._isEnabled = true;
              this._id = "tui-datepicker-" + util.generateId();
              this._type = options.type;
              this.showAlways = options.showAlways;
              this.autoClose = options.autoClose;
              this._initializeDatePicker(options);
            },
            _initializeDatePicker: function(option) {
              this.setRanges(option.selectableRanges);
              this._setEvents();
              this._initTimePicker(option.timePicker, option.usageStatistics);
              this.setInput(option.input.element);
              this.setDateFormat(option.input.format);
              this.setDate(option.date);
              forEachArray(option.openers, this.addOpener, this);
              if (!this.showAlways) {
                this._hide();
              }
              if (this.getType() === TYPE_DATE) {
                addClass(this._element.querySelector(SELECTOR_BODY), "tui-datepicker-type-date");
              }
            },
            _setEvents: function() {
              mouseTouchEvent.on(this._element, "click", this._onClickHandler, this);
              this._calendar.on("draw", this._onDrawCalendar, this);
            },
            _removeEvents: function() {
              mouseTouchEvent.off(this._element, "click", this._onClickHandler, this);
              this._calendar.off();
            },
            _setDocumentEvents: function() {
              mouseTouchEvent.on(document, "mousedown", this._onMousedownDocument, this);
            },
            _removeDocumentEvents: function() {
              mouseTouchEvent.off(document, "mousedown", this._onMousedownDocument);
            },
            _setOpenerEvents: function(opener) {
              mouseTouchEvent.on(opener, "click", this.toggle, this);
            },
            _removeOpenerEvents: function(opener) {
              mouseTouchEvent.off(opener, "click", this.toggle);
            },
            _initTimePicker: function(opTimePicker, usageStatistics) {
              var layoutType;
              if (!opTimePicker) {
                return;
              }
              layoutType = opTimePicker.layoutType || "";
              if (isObject(opTimePicker)) {
                opTimePicker.usageStatistics = usageStatistics;
              } else {
                opTimePicker = {
                  usageStatistics
                };
              }
              this._timePicker = new TimePicker(this._element.querySelector(SELECTOR_TIMEPICKER_CONTAINER), opTimePicker);
              if (layoutType.toLowerCase() === "tab") {
                this._timePicker.hide();
              }
              this._timePicker.on("change", function(ev) {
                var prevDate;
                if (this._date) {
                  prevDate = new Date(this._date);
                  this.setDate(prevDate.setHours(ev.hour, ev.minute));
                }
              }, this);
            },
            _changePicker: function(target) {
              var btnSelector = "." + CLASS_NAME_SELECTOR_BUTTON;
              var selectedBtn = closest(target, btnSelector);
              var isDateElement = !!selectedBtn.querySelector(SELECTOR_DATE_ICO);
              if (isDateElement) {
                this._calendar.show();
                this._timePicker.hide();
              } else {
                this._calendar.hide();
                this._timePicker.show();
              }
              removeClass(this._element.querySelector("." + CLASS_NAME_CHECKED), CLASS_NAME_CHECKED);
              addClass(selectedBtn, CLASS_NAME_CHECKED);
            },
            _isOpener: function(element) {
              var el = util.getElement(element);
              return inArray(el, this._openers) > -1;
            },
            _setTodayClassName: function(el) {
              var timestamp, isToday;
              if (this.getCalendarType() !== TYPE_DATE) {
                return;
              }
              timestamp = Number(getData(el, "timestamp"));
              isToday = timestamp === new Date().setHours(0, 0, 0, 0);
              if (isToday) {
                addClass(el, CLASS_NAME_TODAY);
              } else {
                removeClass(el, CLASS_NAME_TODAY);
              }
            },
            _setSelectableClassName: function(el) {
              var elDate = new Date(Number(getData(el, "timestamp")));
              if (this._isSelectableOnCalendar(elDate)) {
                addClass(el, CLASS_NAME_SELECTABLE);
                removeClass(el, CLASS_NAME_BLOCKED);
              } else {
                removeClass(el, CLASS_NAME_SELECTABLE);
                addClass(el, CLASS_NAME_BLOCKED);
              }
            },
            _setSelectedClassName: function(el) {
              var elDate = new Date(Number(getData(el, "timestamp")));
              if (this._isSelectedOnCalendar(elDate)) {
                addClass(el, CLASS_NAME_SELECTED);
              } else {
                removeClass(el, CLASS_NAME_SELECTED);
              }
            },
            _isSelectableOnCalendar: function(date2) {
              var type = this.getCalendarType();
              var start = dateUtil.cloneWithStartOf(date2, type).getTime();
              var end = dateUtil.cloneWithEndOf(date2, type).getTime();
              return this._rangeModel.hasOverlap(start, end);
            },
            _isSelectedOnCalendar: function(date2) {
              var curDate = this.getDate();
              var calendarType = this.getCalendarType();
              return curDate && dateUtil.isSame(curDate, date2, calendarType);
            },
            _show: function() {
              removeClass(this._element, CLASS_NAME_HIDDEN);
            },
            _hide: function() {
              addClass(this._element, CLASS_NAME_HIDDEN);
            },
            _syncToInput: function() {
              if (!this._date) {
                return;
              }
              this._datepickerInput.setDate(this._date);
            },
            _syncFromInput: function(shouldRollback) {
              var isFailed = false;
              var date2;
              try {
                date2 = this._datepickerInput.getDate();
                if (this.isSelectable(date2)) {
                  if (this._timePicker) {
                    this._timePicker.setTime(date2.getHours(), date2.getMinutes());
                  }
                  this.setDate(date2);
                } else {
                  isFailed = true;
                }
              } catch (err) {
                this.fire("error", {
                  type: "ParsingError",
                  message: err.message
                });
                isFailed = true;
              } finally {
                if (isFailed) {
                  if (shouldRollback) {
                    this._syncToInput();
                  } else {
                    this.setNull();
                  }
                }
              }
            },
            _onMousedownDocument: function(ev) {
              var target = util.getTarget(ev);
              var selector = util.getSelector(target);
              var isContain = selector ? this._element.querySelector(selector) : false;
              var isInput = this._datepickerInput.is(target);
              var isInOpener = inArray(target, this._openers) > -1;
              var shouldClose = !(this.showAlways || isInput || isContain || isInOpener);
              if (shouldClose) {
                this.close();
              }
            },
            _onClickHandler: function(ev) {
              var target = util.getTarget(ev);
              if (closest(target, "." + CLASS_NAME_SELECTABLE)) {
                ev.preventDefault();
                this._updateDate(target);
              } else if (closest(target, "." + CLASS_NAME_TITLE_TODAY)) {
                ev.preventDefault();
                this._updateDateToToday();
              } else if (closest(target, SELECTOR_CALENDAR_TITLE)) {
                this.drawUpperCalendar(this._date);
              } else if (closest(target, "." + CLASS_NAME_SELECTOR_BUTTON)) {
                this._changePicker(target);
              }
            },
            _updateDateToToday: function() {
              this.setDate(Date.now());
              this.close();
            },
            _updateDate: function(target) {
              var timestamp = Number(getData(target, "timestamp"));
              var newDate = new Date(timestamp);
              var timePicker = this._timePicker;
              var prevDate = this._date;
              var calendarType = this.getCalendarType();
              var pickerType = this.getType();
              if (calendarType !== pickerType) {
                this.drawLowerCalendar(newDate);
              } else {
                if (timePicker) {
                  newDate.setHours(timePicker.getHour(), timePicker.getMinute());
                } else if (prevDate) {
                  newDate.setHours(prevDate.getHours(), prevDate.getMinutes());
                }
                this.setDate(newDate);
                if (!this.showAlways && this.autoClose) {
                  this.close();
                }
              }
            },
            _onDrawCalendar: function(eventData) {
              forEachArray(eventData.dateElements, function(el) {
                this._setTodayClassName(el);
                this._setSelectableClassName(el);
                this._setSelectedClassName(el);
              }, this);
              this._setDisplayHeadButtons();
              this.fire("draw", eventData);
            },
            _setDisplayHeadButtons: function() {
              var nextYearDate = this._calendar.getNextYearDate();
              var prevYearDate = this._calendar.getPrevYearDate();
              var maxTimestamp = this._rangeModel.getMaximumValue();
              var minTimestamp = this._rangeModel.getMinimumValue();
              var nextYearBtn = this._element.querySelector("." + CLASS_NAME_NEXT_YEAR_BTN);
              var prevYearBtn = this._element.querySelector("." + CLASS_NAME_PREV_YEAR_BTN);
              var nextMonthDate, prevMonthDate, nextMonBtn, prevMonBtn;
              if (this.getCalendarType() === TYPE_DATE) {
                nextMonthDate = dateUtil.cloneWithStartOf(this._calendar.getNextDate(), TYPE_MONTH);
                prevMonthDate = dateUtil.cloneWithEndOf(this._calendar.getPrevDate(), TYPE_MONTH);
                nextMonBtn = this._element.querySelector("." + CLASS_NAME_NEXT_MONTH_BTN);
                prevMonBtn = this._element.querySelector("." + CLASS_NAME_PREV_MONTH_BTN);
                this._setDisplay(nextMonBtn, nextMonthDate.getTime() <= maxTimestamp);
                this._setDisplay(prevMonBtn, prevMonthDate.getTime() >= minTimestamp);
                prevYearDate.setDate(1);
                nextYearDate.setDate(1);
              } else {
                prevYearDate.setMonth(12, 0);
                nextYearDate.setMonth(0, 1);
              }
              this._setDisplay(nextYearBtn, nextYearDate.getTime() <= maxTimestamp);
              this._setDisplay(prevYearBtn, prevYearDate.getTime() >= minTimestamp);
            },
            _setDisplay: function(el, shouldShow) {
              if (el) {
                if (shouldShow) {
                  removeClass(el, CLASS_NAME_HIDDEN);
                } else {
                  addClass(el, CLASS_NAME_HIDDEN);
                }
              }
            },
            _onChangeInput: function() {
              this._syncFromInput(true);
            },
            _isChanged: function(date2) {
              var prevDate = this.getDate();
              return !prevDate || date2.getTime() !== prevDate.getTime();
            },
            _refreshFromRanges: function() {
              if (!this.isSelectable(this._date)) {
                this.setNull();
              } else {
                this._calendar.draw();
              }
            },
            getCalendarType: function() {
              return this._calendar.getType();
            },
            getType: function() {
              return this._type;
            },
            isSelectable: function(date2) {
              var type = this.getType();
              var start, end;
              if (!dateUtil.isValidDate(date2)) {
                return false;
              }
              start = dateUtil.cloneWithStartOf(date2, type).getTime();
              end = dateUtil.cloneWithEndOf(date2, type).getTime();
              return this._rangeModel.hasOverlap(start, end);
            },
            isSelected: function(date2) {
              return dateUtil.isValidDate(date2) && dateUtil.isSame(this._date, date2, this.getType());
            },
            setRanges: function(ranges) {
              var result = [];
              forEachArray(ranges, function(range3) {
                var start = new Date(range3[0]).getTime();
                var end = new Date(range3[1]).getTime();
                result.push([start, end]);
              });
              this._rangeModel = new RangeModel(result);
              this._refreshFromRanges();
            },
            setType: function(type) {
              this._type = type;
            },
            addRange: function(start, end) {
              start = new Date(start).getTime();
              end = new Date(end).getTime();
              this._rangeModel.add(start, end);
              this._refreshFromRanges();
            },
            removeRange: function(start, end, type) {
              start = new Date(start);
              end = new Date(end);
              if (type) {
                start = dateUtil.cloneWithStartOf(start, type);
                end = dateUtil.cloneWithEndOf(end, type);
              }
              this._rangeModel.exclude(start.getTime(), end.getTime());
              this._refreshFromRanges();
            },
            addOpener: function(opener) {
              opener = util.getElement(opener);
              if (!this._isOpener(opener)) {
                this._openers.push(opener);
                this._setOpenerEvents(opener);
              }
            },
            removeOpener: function(opener) {
              var index;
              opener = util.getElement(opener);
              index = inArray(opener, this._openers);
              if (index > -1) {
                this._removeOpenerEvents(opener);
                this._openers.splice(index, 1);
              }
            },
            removeAllOpeners: function() {
              forEachArray(this._openers, function(opener) {
                this._removeOpenerEvents(opener);
              }, this);
              this._openers = [];
            },
            open: function() {
              if (this.isOpened() || !this._isEnabled) {
                return;
              }
              this._calendar.draw({
                date: this._date,
                type: this._type
              });
              this._show();
              if (!this.showAlways) {
                this._setDocumentEvents();
              }
              this.fire("open");
            },
            drawUpperCalendar: function(date2) {
              var calendarType = this.getCalendarType();
              if (calendarType === TYPE_DATE) {
                this._calendar.draw({
                  date: date2,
                  type: TYPE_MONTH
                });
              } else if (calendarType === TYPE_MONTH) {
                this._calendar.draw({
                  date: date2,
                  type: TYPE_YEAR
                });
              }
            },
            drawLowerCalendar: function(date2) {
              var calendarType = this.getCalendarType();
              var pickerType = this.getType();
              var isLast = calendarType === pickerType;
              if (isLast) {
                return;
              }
              if (calendarType === TYPE_MONTH) {
                this._calendar.draw({
                  date: date2,
                  type: TYPE_DATE
                });
              } else if (calendarType === TYPE_YEAR) {
                this._calendar.draw({
                  date: date2,
                  type: TYPE_MONTH
                });
              }
            },
            close: function() {
              if (!this.isOpened()) {
                return;
              }
              this._removeDocumentEvents();
              this._hide();
              this.fire("close");
            },
            toggle: function() {
              if (this.isOpened()) {
                this.close();
              } else {
                this.open();
              }
            },
            getDate: function() {
              if (!this._date) {
                return null;
              }
              return new Date(this._date);
            },
            setDate: function(date2) {
              var isValidInput, newDate, shouldUpdate;
              if (date2 === null) {
                this.setNull();
                return;
              }
              isValidInput = isNumber(date2) || isDate(date2);
              newDate = new Date(date2);
              shouldUpdate = isValidInput && this._isChanged(newDate) && this.isSelectable(newDate);
              if (shouldUpdate) {
                newDate = new Date(date2);
                this._date = newDate;
                this._calendar.draw({ date: newDate });
                if (this._timePicker) {
                  this._timePicker.setTime(newDate.getHours(), newDate.getMinutes());
                }
                this._syncToInput();
                this.fire("change");
              }
            },
            setNull: function() {
              var calendarDate = this._calendar.getDate();
              var isChagned = this._date !== null;
              this._date = null;
              if (this._datepickerInput) {
                this._datepickerInput.clearText();
              }
              if (this._timePicker) {
                this._timePicker.setTime(0, 0);
              }
              if (!this.isSelectable(calendarDate)) {
                this._calendar.draw({
                  date: new Date(this._rangeModel.getMinimumValue())
                });
              } else {
                this._calendar.draw();
              }
              if (isChagned) {
                this.fire("change");
              }
            },
            setDateFormat: function(format) {
              this._datepickerInput.setFormat(format);
              this._syncToInput();
            },
            isOpened: function() {
              return !hasClass(this._element, CLASS_NAME_HIDDEN);
            },
            getTimePicker: function() {
              return this._timePicker;
            },
            getCalendar: function() {
              return this._calendar;
            },
            getLocaleText: function() {
              return localeTexts[this._language] || localeTexts[DEFAULT_LANGUAGE_TYPE];
            },
            setInput: function(element, options) {
              var prev = this._datepickerInput;
              var localeText = this.getLocaleText();
              var prevFormat;
              options = options || {};
              if (prev) {
                prevFormat = prev.getFormat();
                prev.destroy();
              }
              this._datepickerInput = new DatePickerInput(element, {
                format: options.format || prevFormat,
                id: this._id,
                localeText
              });
              this._datepickerInput.on({
                change: this._onChangeInput,
                click: this.open
              }, this);
              if (options.syncFromInput) {
                this._syncFromInput();
              } else {
                this._syncToInput();
              }
            },
            enable: function() {
              if (this._isEnabled) {
                return;
              }
              this._isEnabled = true;
              this._datepickerInput.enable();
              forEachArray(this._openers, function(opener) {
                opener.removeAttribute("disabled");
                this._setOpenerEvents(opener);
              }, this);
            },
            disable: function() {
              if (!this._isEnabled) {
                return;
              }
              this._isEnabled = false;
              this.close();
              this._datepickerInput.disable();
              forEachArray(this._openers, function(opener) {
                opener.setAttribute("disabled", true);
                this._removeOpenerEvents(opener);
              }, this);
            },
            isDisabled: function() {
              return !this._isEnabled;
            },
            addCssClass: function(className2) {
              addClass(this._element, className2);
            },
            removeCssClass: function(className2) {
              removeClass(this._element, className2);
            },
            getDateElements: function() {
              return this._calendar.getDateElements();
            },
            findOverlappedRange: function(startDate, endDate) {
              var startTimestamp = new Date(startDate).getTime();
              var endTimestamp = new Date(endDate).getTime();
              var overlappedRange = this._rangeModel.findOverlappedRange(startTimestamp, endTimestamp);
              return [new Date(overlappedRange[0]), new Date(overlappedRange[1])];
            },
            changeLanguage: function(language) {
              this._language = language;
              this._calendar.changeLanguage(this._language);
              this._datepickerInput.changeLocaleTitles(this.getLocaleText().titles);
              this.setDateFormat(this._datepickerInput.getFormat());
              if (this._timePicker) {
                this._timePicker.changeLanguage(this._language);
              }
            },
            destroy: function() {
              this._removeDocumentEvents();
              this._calendar.destroy();
              if (this._timePicker) {
                this._timePicker.destroy();
              }
              if (this._datepickerInput) {
                this._datepickerInput.destroy();
              }
              this._removeEvents();
              removeElement(this._element);
              this.removeAllOpeners();
              this._calendar = this._timePicker = this._datepickerInput = this._container = this._element = this._date = this._rangeModel = this._openers = this._isEnabled = this._id = null;
            }
          });
          CustomEvents2.mixin(DatePicker2);
          module2.exports = DatePicker2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isObject(obj) {
            return obj === Object(obj);
          }
          module2.exports = isObject;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
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
          module2.exports = forEachOwnProperties;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isArray = __webpack_require__(6);
          var isUndefined2 = __webpack_require__(12);
          function setClassName(element, cssClass) {
            cssClass = isArray(cssClass) ? cssClass.join(" ") : cssClass;
            cssClass = cssClass.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            if (isUndefined2(element.className.baseVal)) {
              element.className = cssClass;
              return;
            }
            element.className.baseVal = cssClass;
          }
          module2.exports = setClassName;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var matches = __webpack_require__(40);
          function closest(element, selector) {
            var parent = element.parentNode;
            if (matches(element, selector)) {
              return element;
            }
            while (parent && parent !== document) {
              if (matches(parent, selector)) {
                return parent;
              }
              parent = parent.parentNode;
            }
            return null;
          }
          module2.exports = closest;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var convertToKebabCase = __webpack_require__(42);
          function getData(element, key) {
            if (element.dataset) {
              return element.dataset[key];
            }
            return element.getAttribute("data-" + convertToKebabCase(key));
          }
          module2.exports = getData;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inArray = __webpack_require__(3);
          var getClass = __webpack_require__(17);
          function hasClass(element, cssClass) {
            var origin;
            if (element.classList) {
              return element.classList.contains(cssClass);
            }
            origin = getClass(element).split(/\s+/);
            return inArray(cssClass, origin) > -1;
          }
          module2.exports = hasClass;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isDate(obj) {
            return obj instanceof Date;
          }
          module2.exports = isDate;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var defineClass = __webpack_require__(0);
          var CustomEvents2 = __webpack_require__(8);
          var addClass = __webpack_require__(16);
          var hasClass = __webpack_require__(27);
          var removeClass = __webpack_require__(18);
          var removeElement = __webpack_require__(14);
          var extend = __webpack_require__(7);
          var Header = __webpack_require__(44);
          var Body = __webpack_require__(49);
          var localeTexts = __webpack_require__(10);
          var constants = __webpack_require__(1);
          var dateUtil = __webpack_require__(5);
          var util = __webpack_require__(4);
          var DEFAULT_WEEK_START_DAY = constants.DEFAULT_WEEK_START_DAY;
          var DEFAULT_LANGUAGE_TYPE = constants.DEFAULT_LANGUAGE_TYPE;
          var TYPE_DATE = constants.TYPE_DATE;
          var TYPE_MONTH = constants.TYPE_MONTH;
          var TYPE_YEAR = constants.TYPE_YEAR;
          var CLASS_NAME_PREV_MONTH_BTN = constants.CLASS_NAME_PREV_MONTH_BTN;
          var CLASS_NAME_PREV_YEAR_BTN = constants.CLASS_NAME_PREV_YEAR_BTN;
          var CLASS_NAME_NEXT_YEAR_BTN = constants.CLASS_NAME_NEXT_YEAR_BTN;
          var CLASS_NAME_NEXT_MONTH_BTN = constants.CLASS_NAME_NEXT_MONTH_BTN;
          var CLASS_NAME_CALENDAR_MONTH = "tui-calendar-month";
          var CLASS_NAME_CALENDAR_YEAR = "tui-calendar-year";
          var CLASS_NAME_HIDDEN = "tui-hidden";
          var HEADER_SELECTOR = ".tui-calendar-header";
          var BODY_SELECTOR = ".tui-calendar-body";
          var Calendar2 = defineClass({
            static: {
              localeTexts
            },
            init: function(container, options) {
              options = extend({
                language: DEFAULT_LANGUAGE_TYPE,
                showToday: true,
                showJumpButtons: false,
                date: new Date(),
                type: TYPE_DATE,
                usageStatistics: true,
                weekStartDay: DEFAULT_WEEK_START_DAY
              }, options);
              this._container = util.getElement(container);
              this._container.innerHTML = '<div class="tui-calendar">    <div class="tui-calendar-header"></div>    <div class="tui-calendar-body"></div></div>';
              this._element = this._container.firstChild;
              this._date = null;
              this._type = null;
              this._header = null;
              this._body = null;
              this._initHeader(options);
              this._initBody(options);
              this.draw({
                date: options.date,
                type: options.type
              });
              if (options.usageStatistics) {
                util.sendHostName();
              }
            },
            _initHeader: function(options) {
              var headerContainer = this._element.querySelector(HEADER_SELECTOR);
              this._header = new Header(headerContainer, options);
              this._header.on("click", function(ev) {
                var target = util.getTarget(ev);
                if (hasClass(target, CLASS_NAME_PREV_MONTH_BTN)) {
                  this.drawPrev();
                } else if (hasClass(target, CLASS_NAME_PREV_YEAR_BTN)) {
                  this._onClickPrevYear();
                } else if (hasClass(target, CLASS_NAME_NEXT_MONTH_BTN)) {
                  this.drawNext();
                } else if (hasClass(target, CLASS_NAME_NEXT_YEAR_BTN)) {
                  this._onClickNextYear();
                }
              }, this);
            },
            _initBody: function(options) {
              var bodyContainer = this._element.querySelector(BODY_SELECTOR);
              this._body = new Body(bodyContainer, options);
            },
            _onClickPrevYear: function() {
              if (this.getType() === TYPE_DATE) {
                this.draw({
                  date: this._getRelativeDate(-12)
                });
              } else {
                this.drawPrev();
              }
            },
            _onClickNextYear: function() {
              if (this.getType() === TYPE_DATE) {
                this.draw({
                  date: this._getRelativeDate(12)
                });
              } else {
                this.drawNext();
              }
            },
            _isValidType: function(type) {
              return type === TYPE_DATE || type === TYPE_MONTH || type === TYPE_YEAR;
            },
            _shouldUpdate: function(date2, type) {
              var prevDate = this._date;
              if (!dateUtil.isValidDate(date2)) {
                throw new Error("Invalid date");
              }
              if (!this._isValidType(type)) {
                throw new Error("Invalid layer type");
              }
              return !prevDate || prevDate.getFullYear() !== date2.getFullYear() || prevDate.getMonth() !== date2.getMonth() || this.getType() !== type;
            },
            _render: function() {
              var date2 = this._date;
              var type = this.getType();
              this._header.render(date2, type);
              this._body.render(date2, type);
              removeClass(this._element, CLASS_NAME_CALENDAR_MONTH, CLASS_NAME_CALENDAR_YEAR);
              switch (type) {
                case TYPE_MONTH:
                  addClass(this._element, CLASS_NAME_CALENDAR_MONTH);
                  break;
                case TYPE_YEAR:
                  addClass(this._element, CLASS_NAME_CALENDAR_YEAR);
                  break;
                default:
                  break;
              }
            },
            _getRelativeDate: function(step) {
              var prev = this._date;
              return new Date(prev.getFullYear(), prev.getMonth() + step);
            },
            draw: function(options) {
              var date2, type;
              options = options || {};
              date2 = options.date || this._date;
              type = (options.type || this.getType()).toLowerCase();
              if (this._shouldUpdate(date2, type)) {
                this._date = date2;
                this._type = type;
                this._render();
              }
              this.fire("draw", {
                date: this._date,
                type,
                dateElements: this._body.getDateElements()
              });
            },
            show: function() {
              removeClass(this._element, CLASS_NAME_HIDDEN);
            },
            hide: function() {
              addClass(this._element, CLASS_NAME_HIDDEN);
            },
            drawNext: function() {
              this.draw({
                date: this.getNextDate()
              });
            },
            drawPrev: function() {
              this.draw({
                date: this.getPrevDate()
              });
            },
            getNextDate: function() {
              if (this.getType() === TYPE_DATE) {
                return this._getRelativeDate(1);
              }
              return this.getNextYearDate();
            },
            getPrevDate: function() {
              if (this.getType() === TYPE_DATE) {
                return this._getRelativeDate(-1);
              }
              return this.getPrevYearDate();
            },
            getNextYearDate: function() {
              switch (this.getType()) {
                case TYPE_DATE:
                case TYPE_MONTH:
                  return this._getRelativeDate(12);
                case TYPE_YEAR:
                  return this._getRelativeDate(108);
                default:
                  throw new Error("Unknown layer type");
              }
            },
            getPrevYearDate: function() {
              switch (this.getType()) {
                case TYPE_DATE:
                case TYPE_MONTH:
                  return this._getRelativeDate(-12);
                case TYPE_YEAR:
                  return this._getRelativeDate(-108);
                default:
                  throw new Error("Unknown layer type");
              }
            },
            changeLanguage: function(language) {
              this._header.changeLanguage(language);
              this._body.changeLanguage(language);
              this._render();
            },
            getDate: function() {
              return new Date(this._date);
            },
            getType: function() {
              return this._type;
            },
            getDateElements: function() {
              return this._body.getDateElements();
            },
            addCssClass: function(className2) {
              addClass(this._element, className2);
            },
            removeCssClass: function(className2) {
              removeClass(this._element, className2);
            },
            destroy: function() {
              this._header.destroy();
              this._body.destroy();
              removeElement(this._element);
              this._type = this._date = this._container = this._element = this._header = this._body = null;
            }
          });
          CustomEvents2.mixin(Calendar2);
          module2.exports = Calendar2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inArray = __webpack_require__(3);
          var forEachArray = __webpack_require__(2);
          var defineClass = __webpack_require__(0);
          var util = __webpack_require__(4);
          var dateUtil = __webpack_require__(5);
          var constants = __webpack_require__(1);
          var localeTexts = __webpack_require__(10);
          var rFormableKeys = /\\?(yyyy|yy|mmmm|mmm|mm|m|dd|d|hh|h|a)/gi;
          var mapForConverting = {
            yyyy: {
              expression: "(\\d{4}|\\d{2})",
              type: constants.TYPE_YEAR
            },
            yy: {
              expression: "(\\d{4}|\\d{2})",
              type: constants.TYPE_YEAR
            },
            y: {
              expression: "(\\d{4}|\\d{2})",
              type: constants.TYPE_YEAR
            },
            M: {
              expression: "(1[012]|0[1-9]|[1-9])",
              type: constants.TYPE_MONTH
            },
            MM: {
              expression: "(1[012]|0[1-9]|[1-9])",
              type: constants.TYPE_MONTH
            },
            MMM: {
              expression: "(1[012]|0[1-9]|[1-9])",
              type: constants.TYPE_MONTH
            },
            MMMM: {
              expression: "(1[012]|0[1-9]|[1-9])",
              type: constants.TYPE_MONTH
            },
            mmm: {
              expression: "(1[012]|0[1-9]|[1-9])",
              type: constants.TYPE_MONTH
            },
            mmmm: {
              expression: "(1[012]|0[1-9]|[1-9])",
              type: constants.TYPE_MONTH
            },
            dd: {
              expression: "([12]\\d{1}|3[01]|0[1-9]|[1-9])",
              type: constants.TYPE_DATE
            },
            d: {
              expression: "([12]\\d{1}|3[01]|0[1-9]|[1-9])",
              type: constants.TYPE_DATE
            },
            D: {
              expression: "([12]\\d{1}|3[01]|0[1-9]|[1-9])",
              type: constants.TYPE_DATE
            },
            DD: {
              expression: "([12]\\d{1}|3[01]|0[1-9]|[1-9])",
              type: constants.TYPE_DATE
            },
            h: {
              expression: "(d{1}|0\\d{1}|1\\d{1}|2[0123])",
              type: constants.TYPE_HOUR
            },
            hh: {
              expression: "(d{1}|[01]\\d{1}|2[0123])",
              type: constants.TYPE_HOUR
            },
            H: {
              expression: "(d{1}|0\\d{1}|1\\d{1}|2[0123])",
              type: constants.TYPE_HOUR
            },
            HH: {
              expression: "(d{1}|[01]\\d{1}|2[0123])",
              type: constants.TYPE_HOUR
            },
            m: {
              expression: "(d{1}|[012345]\\d{1})",
              type: constants.TYPE_MINUTE
            },
            mm: {
              expression: "(d{1}|[012345]\\d{1})",
              type: constants.TYPE_MINUTE
            },
            a: {
              expression: "([ap]m)",
              type: constants.TYPE_MERIDIEM
            },
            A: {
              expression: "([ap]m)",
              type: constants.TYPE_MERIDIEM
            }
          };
          var DateTimeFormatter = defineClass({
            init: function(rawStr, titles) {
              this._rawStr = rawStr;
              this._keyOrder = null;
              this._regExp = null;
              this._titles = titles || localeTexts.en.titles;
              this._parseFormat();
            },
            _parseFormat: function() {
              var regExpStr = "^";
              var matchedKeys = this._rawStr.match(rFormableKeys);
              var keyOrder = [];
              matchedKeys = util.filter(matchedKeys, function(key) {
                return key[0] !== "\\";
              });
              forEachArray(matchedKeys, function(key, index) {
                if (!/m/i.test(key)) {
                  key = key.toLowerCase();
                }
                regExpStr += mapForConverting[key].expression + "[\\D\\s]*";
                keyOrder[index] = mapForConverting[key].type;
              });
              regExpStr += "$";
              this._keyOrder = keyOrder;
              this._regExp = new RegExp(regExpStr, "gi");
            },
            parse: function(str) {
              var dateHash = {
                year: 0,
                month: 1,
                date: 1,
                hour: 0,
                minute: 0
              };
              var hasMeridiem = false;
              var isPM = false;
              var matched;
              this._regExp.lastIndex = 0;
              matched = this._regExp.exec(str);
              if (!matched) {
                throw Error('DateTimeFormatter: Not matched - "' + str + '"');
              }
              forEachArray(this._keyOrder, function(name, index) {
                var value = matched[index + 1];
                if (name === constants.TYPE_MERIDIEM && /[ap]m/i.test(value)) {
                  hasMeridiem = true;
                  isPM = /pm/i.test(value);
                } else {
                  value = Number(value);
                  if (value !== 0 && !value) {
                    throw Error("DateTimeFormatter: Unknown value - " + matched[index + 1]);
                  }
                  if (name === constants.TYPE_YEAR && value < 100) {
                    value += 2e3;
                  }
                  dateHash[name] = value;
                }
              });
              if (hasMeridiem) {
                isPM = isPM || dateHash.hour > 12;
                dateHash.hour %= 12;
                if (isPM) {
                  dateHash.hour += 12;
                }
              }
              return new Date(dateHash.year, dateHash.month - 1, dateHash.date, dateHash.hour, dateHash.minute);
            },
            getRawString: function() {
              return this._rawStr;
            },
            format: function(dateObj) {
              var year = dateObj.getFullYear();
              var month = dateObj.getMonth() + 1;
              var dayInMonth = dateObj.getDate();
              var day = dateObj.getDay();
              var hour = dateObj.getHours();
              var minute = dateObj.getMinutes();
              var meridiem = "a";
              var replaceMap;
              if (inArray(constants.TYPE_MERIDIEM, this._keyOrder) > -1) {
                meridiem = hour >= 12 ? "pm" : "am";
                hour = dateUtil.getMeridiemHour(hour);
              }
              replaceMap = {
                yyyy: year,
                yy: String(year).substr(2, 2),
                M: month,
                MM: dateUtil.prependLeadingZero(month),
                MMM: this._titles.MMM[month - 1],
                MMMM: this._titles.MMMM[month - 1],
                d: dayInMonth,
                dd: dateUtil.prependLeadingZero(dayInMonth),
                D: this._titles.D[day],
                DD: this._titles.DD[day],
                hh: dateUtil.prependLeadingZero(hour),
                h: hour,
                mm: dateUtil.prependLeadingZero(minute),
                m: minute,
                A: meridiem.toUpperCase(),
                a: meridiem
              };
              return this._rawStr.replace(rFormableKeys, function(key) {
                if (key[0] === "\\") {
                  return key.substr(1);
                }
                return replaceMap[key] || replaceMap[key.toLowerCase()] || "";
              });
            }
          });
          module2.exports = DateTimeFormatter;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isString2 = __webpack_require__(13);
          var forEach = __webpack_require__(9);
          var safeEvent = __webpack_require__(32);
          function on2(element, types, handler, context) {
            if (isString2(types)) {
              forEach(types.split(/\s+/g), function(type) {
                bindEvent(element, type, handler, context);
              });
              return;
            }
            forEach(types, function(func, type) {
              bindEvent(element, type, func, handler);
            });
          }
          function bindEvent(element, type, handler, context) {
            function eventHandler(e3) {
              handler.call(context || element, e3 || window.event);
            }
            if ("addEventListener" in element) {
              element.addEventListener(type, eventHandler);
            } else if ("attachEvent" in element) {
              element.attachEvent("on" + type, eventHandler);
            }
            memorizeHandler(element, type, handler, eventHandler);
          }
          function memorizeHandler(element, type, handler, wrappedHandler) {
            var events = safeEvent(element, type);
            var existInEvents = false;
            forEach(events, function(obj) {
              if (obj.handler === handler) {
                existInEvents = true;
                return false;
              }
              return true;
            });
            if (!existInEvents) {
              events.push({
                handler,
                wrappedHandler
              });
            }
          }
          module2.exports = on2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var EVENT_KEY = "_feEventKey";
          function safeEvent(element, type) {
            var events = element[EVENT_KEY];
            var handlers;
            if (!events) {
              events = element[EVENT_KEY] = {};
            }
            handlers = events[type];
            if (!handlers) {
              handlers = events[type] = [];
            }
            return handlers;
          }
          module2.exports = safeEvent;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isString2 = __webpack_require__(13);
          var forEach = __webpack_require__(9);
          var safeEvent = __webpack_require__(32);
          function off(element, types, handler) {
            if (isString2(types)) {
              forEach(types.split(/\s+/g), function(type) {
                unbindEvent(element, type, handler);
              });
              return;
            }
            forEach(types, function(func, type) {
              unbindEvent(element, type, func);
            });
          }
          function unbindEvent(element, type, handler) {
            var events = safeEvent(element, type);
            var index;
            if (!handler) {
              forEach(events, function(item) {
                removeHandler(element, type, item.wrappedHandler);
              });
              events.splice(0, events.length);
            } else {
              forEach(events, function(item, idx) {
                if (handler === item.handler) {
                  removeHandler(element, type, item.wrappedHandler);
                  index = idx;
                  return false;
                }
                return true;
              });
              events.splice(index, 1);
            }
          }
          function removeHandler(element, type, handler) {
            if ("removeEventListener" in element) {
              element.removeEventListener(type, handler);
            } else if ("detachEvent" in element) {
              element.detachEvent("on" + type, handler);
            }
          }
          module2.exports = off;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var DatePicker2 = __webpack_require__(21);
          var DateRangePicker = __webpack_require__(60);
          var Calendar2 = __webpack_require__(29);
          __webpack_require__(61);
          DatePicker2.createCalendar = function(wrapperElement, options) {
            return new Calendar2(wrapperElement, options);
          };
          DatePicker2.createRangePicker = function(options) {
            return new DateRangePicker(options);
          };
          module2.exports = DatePicker2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var createObject = __webpack_require__(36);
          function inherit(subType, superType) {
            var prototype = createObject(superType.prototype);
            prototype.constructor = subType;
            subType.prototype = prototype;
          }
          module2.exports = inherit;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function createObject(obj) {
            function F3() {
            }
            F3.prototype = obj;
            return new F3();
          }
          module2.exports = createObject;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isUndefined2 = __webpack_require__(12);
          var isNull = __webpack_require__(38);
          function isExisty(param) {
            return !isUndefined2(param) && !isNull(param);
          }
          module2.exports = isExisty;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isNull(obj) {
            return obj === null;
          }
          module2.exports = isNull;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isFunction2(obj) {
            return obj instanceof Function;
          }
          module2.exports = isFunction2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var inArray = __webpack_require__(3);
          var toArray = __webpack_require__(41);
          var elProto2 = Element.prototype;
          var matchSelector2 = elProto2.matches || elProto2.webkitMatchesSelector || elProto2.mozMatchesSelector || elProto2.msMatchesSelector || function(selector) {
            var doc = this.document || this.ownerDocument;
            return inArray(this, toArray(doc.querySelectorAll(selector))) > -1;
          };
          function matches(element, selector) {
            return matchSelector2.call(element, selector);
          }
          module2.exports = matches;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEachArray = __webpack_require__(2);
          function toArray(arrayLike) {
            var arr;
            try {
              arr = Array.prototype.slice.call(arrayLike);
            } catch (e3) {
              arr = [];
              forEachArray(arrayLike, function(value) {
                arr.push(value);
              });
            }
            return arr;
          }
          module2.exports = toArray;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function convertToKebabCase(key) {
            return key.replace(/([A-Z])/g, function(match) {
              return "-" + match.toLowerCase();
            });
          }
          module2.exports = convertToKebabCase;
        },
        function(module2, exports2) {
          module2.exports = __WEBPACK_EXTERNAL_MODULE__43__;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var defineClass = __webpack_require__(0);
          var CustomEvents2 = __webpack_require__(8);
          var closest = __webpack_require__(25);
          var removeElement = __webpack_require__(14);
          var localeTexts = __webpack_require__(10);
          var headerTmpl = __webpack_require__(45);
          var DateTimeFormatter = __webpack_require__(30);
          var constants = __webpack_require__(1);
          var util = __webpack_require__(4);
          var mouseTouchEvent = __webpack_require__(19);
          var TYPE_DATE = constants.TYPE_DATE;
          var TYPE_MONTH = constants.TYPE_MONTH;
          var TYPE_YEAR = constants.TYPE_YEAR;
          var CLASS_NAME_TITLE_MONTH = "tui-calendar-title-month";
          var CLASS_NAME_TITLE_YEAR = "tui-calendar-title-year";
          var CLASS_NAME_TITLE_YEAR_TO_YEAR = "tui-calendar-title-year-to-year";
          var SELECTOR_INNER_ELEM = ".tui-calendar-header-inner";
          var SELECTOR_INFO_ELEM = ".tui-calendar-header-info";
          var SELECTOR_BTN = ".tui-calendar-btn";
          var YEAR_TITLE_FORMAT = "yyyy";
          var Header = defineClass({
            init: function(container, option) {
              this._container = util.getElement(container);
              this._innerElement = null;
              this._infoElement = null;
              this._showToday = option.showToday;
              this._showJumpButtons = option.showJumpButtons;
              this._yearMonthTitleFormatter = null;
              this._yearTitleFormatter = null;
              this._todayFormatter = null;
              this._setFormatters(localeTexts[option.language]);
              this._setEvents(option);
            },
            _setFormatters: function(localeText) {
              this._yearMonthTitleFormatter = new DateTimeFormatter(localeText.titleFormat, localeText.titles);
              this._yearTitleFormatter = new DateTimeFormatter(YEAR_TITLE_FORMAT, localeText.titles);
              this._todayFormatter = new DateTimeFormatter(localeText.todayFormat, localeText.titles);
            },
            _setEvents: function() {
              mouseTouchEvent.on(this._container, "click", this._onClickHandler, this);
            },
            _removeEvents: function() {
              this.off();
              mouseTouchEvent.off(this._container, "click", this._onClickHandler);
            },
            _onClickHandler: function(ev) {
              var target = util.getTarget(ev);
              if (closest(target, SELECTOR_BTN)) {
                this.fire("click", ev);
              }
            },
            _getTitleClass: function(type) {
              switch (type) {
                case TYPE_DATE:
                  return CLASS_NAME_TITLE_MONTH;
                case TYPE_MONTH:
                  return CLASS_NAME_TITLE_YEAR;
                case TYPE_YEAR:
                  return CLASS_NAME_TITLE_YEAR_TO_YEAR;
                default:
                  return "";
              }
            },
            _getTitleText: function(date2, type) {
              var currentYear, start, end;
              switch (type) {
                case TYPE_DATE:
                  return this._yearMonthTitleFormatter.format(date2);
                case TYPE_MONTH:
                  return this._yearTitleFormatter.format(date2);
                case TYPE_YEAR:
                  currentYear = date2.getFullYear();
                  start = new Date(currentYear - 4, 0, 1);
                  end = new Date(currentYear + 4, 0, 1);
                  return this._yearTitleFormatter.format(start) + " - " + this._yearTitleFormatter.format(end);
                default:
                  return "";
              }
            },
            changeLanguage: function(language) {
              this._setFormatters(localeTexts[language]);
            },
            render: function(date2, type) {
              var context = {
                showToday: this._showToday,
                showJumpButtons: this._showJumpButtons,
                todayText: this._todayFormatter.format(new Date()),
                isDateCalendar: type === TYPE_DATE,
                titleClass: this._getTitleClass(type),
                title: this._getTitleText(date2, type)
              };
              this._container.innerHTML = headerTmpl(context).replace(/^\s+|\s+$/g, "");
              this._innerElement = this._container.querySelector(SELECTOR_INNER_ELEM);
              if (context.showToday) {
                this._infoElement = this._container.querySelector(SELECTOR_INFO_ELEM);
              }
            },
            destroy: function() {
              this._removeEvents();
              removeElement(this._innerElement);
              removeElement(this._infoElement);
              this._container = this._showToday = this._showJumpButtons = this._yearMonthTitleFormatter = this._yearTitleFormatter = this._todayFormatter = this._innerElement = this._infoElement = null;
            }
          });
          CustomEvents2.mixin(Header);
          module2.exports = Header;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var template = __webpack_require__(11);
          module2.exports = function(context) {
            var source = '{{if isDateCalendar}}  {{if showJumpButtons}}    <div class="tui-calendar-header-inner tui-calendar-has-btns">      <button class="tui-calendar-btn tui-calendar-btn-prev-year">Prev year</button>      <button class="tui-calendar-btn tui-calendar-btn-prev-month">Prev month</button>      <em class="tui-calendar-title {{titleClass}}">{{title}}</em>      <button class="tui-calendar-btn tui-calendar-btn-next-month">Next month</button>      <button class="tui-calendar-btn tui-calendar-btn-next-year">Next year</button>    </div>  {{else}}    <div class="tui-calendar-header-inner">      <button class="tui-calendar-btn tui-calendar-btn-prev-month">Prev month</button>      <em class="tui-calendar-title {{titleClass}}">{{title}}</em>      <button class="tui-calendar-btn tui-calendar-btn-next-month">Next month</button>    </div>  {{/if}}{{else}}  <div class="tui-calendar-header-inner">    <button class="tui-calendar-btn tui-calendar-btn-prev-year">Prev year</button>    <em class="tui-calendar-title {{titleClass}}">{{title}}</em>    <button class="tui-calendar-btn tui-calendar-btn-next-year">Next year</button>  </div>{{/if}}{{if showToday}}  <div class="tui-calendar-header-info">    <p class="tui-calendar-title-today">{{todayText}}</p>  </div>{{/if}}';
            return template(source, context);
          };
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          function isHTMLNode(html) {
            if (typeof HTMLElement === "object") {
              return html && (html instanceof HTMLElement || !!html.nodeType);
            }
            return !!(html && html.nodeType);
          }
          module2.exports = isHTMLNode;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var isUndefined2 = __webpack_require__(12);
          var imagePing = __webpack_require__(48);
          var ms7days = 7 * 24 * 60 * 60 * 1e3;
          function isExpired(date2) {
            var now = new Date().getTime();
            return now - date2 > ms7days;
          }
          function sendHostname2(appName, trackingId) {
            var url = "https://www.google-analytics.com/collect";
            var hostname = location.hostname;
            var hitType = "event";
            var eventCategory = "use";
            var applicationKeyForStorage = "TOAST UI " + appName + " for " + hostname + ": Statistics";
            var date2 = window.localStorage.getItem(applicationKeyForStorage);
            if (!isUndefined2(window.tui) && window.tui.usageStatistics === false) {
              return;
            }
            if (date2 && !isExpired(date2)) {
              return;
            }
            window.localStorage.setItem(applicationKeyForStorage, new Date().getTime());
            setTimeout(function() {
              if (document.readyState === "interactive" || document.readyState === "complete") {
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
            }, 1e3);
          }
          module2.exports = sendHostname2;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEachOwnProperties = __webpack_require__(23);
          function imagePing(url, trackingInfo) {
            var trackingElement = document.createElement("img");
            var queryString = "";
            forEachOwnProperties(trackingInfo, function(value, key) {
              queryString += "&" + key + "=" + value;
            });
            queryString = queryString.substring(1);
            trackingElement.src = url + "?" + queryString;
            trackingElement.style.display = "none";
            document.body.appendChild(trackingElement);
            document.body.removeChild(trackingElement);
            return trackingElement;
          }
          module2.exports = imagePing;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEachArray = __webpack_require__(2);
          var defineClass = __webpack_require__(0);
          var DateLayer = __webpack_require__(50);
          var MonthLayer = __webpack_require__(52);
          var YearLayer = __webpack_require__(54);
          var constants = __webpack_require__(1);
          var TYPE_DATE = constants.TYPE_DATE;
          var TYPE_MONTH = constants.TYPE_MONTH;
          var TYPE_YEAR = constants.TYPE_YEAR;
          var Body = defineClass({
            init: function(bodyContainer, options) {
              var language = options.language;
              var weekStartDay = options.weekStartDay;
              this._container = bodyContainer;
              this._dateLayer = new DateLayer(language, weekStartDay);
              this._monthLayer = new MonthLayer(language);
              this._yearLayer = new YearLayer(language);
              this._currentLayer = this._dateLayer;
            },
            _getLayer: function(type) {
              switch (type) {
                case TYPE_DATE:
                  return this._dateLayer;
                case TYPE_MONTH:
                  return this._monthLayer;
                case TYPE_YEAR:
                  return this._yearLayer;
                default:
                  return this._currentLayer;
              }
            },
            _eachLayer: function(fn2) {
              forEachArray([this._dateLayer, this._monthLayer, this._yearLayer], fn2);
            },
            changeLanguage: function(language) {
              this._eachLayer(function(layer) {
                layer.changeLanguage(language);
              });
            },
            render: function(date2, type) {
              var nextLayer = this._getLayer(type);
              var prevLayer = this._currentLayer;
              prevLayer.remove();
              nextLayer.render(date2, this._container);
              this._currentLayer = nextLayer;
            },
            getDateElements: function() {
              return this._currentLayer.getDateElements();
            },
            destroy: function() {
              this._eachLayer(function(layer) {
                layer.remove();
              });
              this._container = this._currentLayer = this._dateLayer = this._monthLayer = this._yearLayer = null;
            }
          });
          module2.exports = Body;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var defineClass = __webpack_require__(0);
          var dateUtil = __webpack_require__(5);
          var bodyTmpl = __webpack_require__(51);
          var LayerBase = __webpack_require__(20);
          var TYPE_DATE = __webpack_require__(1).TYPE_DATE;
          var WEEK_START_DAY_MAP = __webpack_require__(1).WEEK_START_DAY_MAP;
          var DATE_SELECTOR = ".tui-calendar-date";
          var DAYS_OF_WEEK = 7;
          var DateLayer = defineClass(LayerBase, {
            init: function(language, weekStartDay) {
              LayerBase.call(this, language);
              this.weekStartDay = WEEK_START_DAY_MAP[String(weekStartDay).toLowerCase()] || 0;
            },
            _type: TYPE_DATE,
            _makeContext: function(date2) {
              var daysShort = this._localeText.titles.D;
              var year, month, days, i5;
              date2 = date2 || new Date();
              year = date2.getFullYear();
              month = date2.getMonth() + 1;
              if (this.weekStartDay) {
                days = daysShort.slice();
                for (i5 = 0; i5 < this.weekStartDay; i5 += 1) {
                  days.push(days.shift());
                }
                daysShort = days;
              }
              return {
                Sun: daysShort[0],
                Mon: daysShort[1],
                Tue: daysShort[2],
                Wed: daysShort[3],
                Thu: daysShort[4],
                Fri: daysShort[5],
                Sat: daysShort[6],
                year,
                month,
                weeks: this._getWeeks(year, month)
              };
            },
            _getWeeks: function(year, month) {
              var weekNumber = 0;
              var weeksCount = 6;
              var weeks = [];
              var week, dates, i5;
              while (weekNumber < weeksCount) {
                dates = [];
                for (i5 = this.weekStartDay; i5 < DAYS_OF_WEEK + this.weekStartDay; i5 += 1) {
                  dates.push(dateUtil.getDateOfWeek(year, month, weekNumber, i5));
                }
                week = this._getWeek(year, month, dates);
                if (this.weekStartDay && !_isFirstWeek(weekNumber, week[0].dayInMonth)) {
                  weeks.push(this._getFirstWeek(year, month));
                  weeksCount -= 1;
                }
                weeks.push(week);
                weekNumber += 1;
              }
              return weeks;
            },
            _getWeek: function(currentYear, currentMonth, dates) {
              var firstDateOfCurrentMonth = new Date(currentYear, currentMonth - 1, 1);
              var lastDateOfCurrentMonth = new Date(currentYear, currentMonth, 0);
              var contexts = [];
              var i5 = 0;
              var length = dates.length;
              var date2, className2;
              for (; i5 < length; i5 += 1) {
                className2 = "tui-calendar-date";
                date2 = dates[i5];
                if (date2 < firstDateOfCurrentMonth) {
                  className2 += " tui-calendar-prev-month";
                }
                if (date2 > lastDateOfCurrentMonth) {
                  className2 += " tui-calendar-next-month";
                }
                if (date2.getDay() === 0) {
                  className2 += " tui-calendar-sun";
                } else if (date2.getDay() === 6) {
                  className2 += " tui-calendar-sat";
                }
                contexts.push({
                  dayInMonth: date2.getDate(),
                  className: className2,
                  timestamp: date2.getTime()
                });
              }
              return contexts;
            },
            render: function(date2, container) {
              var context = this._makeContext(date2);
              container.innerHTML = bodyTmpl(context);
              this._element = container.firstChild;
            },
            getDateElements: function() {
              return this._element.querySelectorAll(DATE_SELECTOR);
            },
            _getFirstWeek: function(year, month) {
              var firstWeekDates = [];
              var i5;
              for (i5 = this.weekStartDay; i5 < DAYS_OF_WEEK + this.weekStartDay; i5 += 1) {
                firstWeekDates.push(dateUtil.getDateOfWeek(year, month, -1, i5));
              }
              return this._getWeek(year, month, firstWeekDates);
            }
          });
          function _isFirstWeek(weekIndex, dayInMonth) {
            return weekIndex || dayInMonth === 1 || dayInMonth > DAYS_OF_WEEK;
          }
          module2.exports = DateLayer;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var template = __webpack_require__(11);
          module2.exports = function(context) {
            var source = '<table class="tui-calendar-body-inner" cellspacing="0" cellpadding="0">  <caption><span>Dates</span></caption>  <thead class="tui-calendar-body-header">    <tr>      <th class="tui-sun" scope="col">{{Sun}}</th>      <th scope="col">{{Mon}}</th>      <th scope="col">{{Tue}}</th>      <th scope="col">{{Wed}}</th>      <th scope="col">{{Thu}}</th>      <th scope="col">{{Fri}}</th>      <th class="tui-sat" scope="col">{{Sat}}</th>    </tr>  </thead>  <tbody>    {{each weeks}}    <tr class="tui-calendar-week">      {{each @this}}      <td class="{{@this["className"]}}" data-timestamp="{{@this["timestamp"]}}">{{@this["dayInMonth"]}}</td>      {{/each}}    </tr>    {{/each}}  </tbody></table>';
            return template(source, context);
          };
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var defineClass = __webpack_require__(0);
          var bodyTmpl = __webpack_require__(53);
          var LayerBase = __webpack_require__(20);
          var TYPE_MONTH = __webpack_require__(1).TYPE_MONTH;
          var dateUtil = __webpack_require__(5);
          var DATE_SELECTOR = ".tui-calendar-month";
          var MonthLayer = defineClass(LayerBase, {
            init: function(language) {
              LayerBase.call(this, language);
            },
            _type: TYPE_MONTH,
            _makeContext: function(date2) {
              var monthsShort = this._localeText.titles.MMM;
              return {
                year: date2.getFullYear(),
                Jan: monthsShort[0],
                Feb: monthsShort[1],
                Mar: monthsShort[2],
                Apr: monthsShort[3],
                May: monthsShort[4],
                Jun: monthsShort[5],
                Jul: monthsShort[6],
                Aug: monthsShort[7],
                Sep: monthsShort[8],
                Oct: monthsShort[9],
                Nov: monthsShort[10],
                Dec: monthsShort[11],
                getFirstDayTimestamp: dateUtil.getFirstDayTimestamp
              };
            },
            render: function(date2, container) {
              var context = this._makeContext(date2);
              container.innerHTML = bodyTmpl(context);
              this._element = container.firstChild;
            },
            getDateElements: function() {
              return this._element.querySelectorAll(DATE_SELECTOR);
            }
          });
          module2.exports = MonthLayer;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var template = __webpack_require__(11);
          module2.exports = function(context) {
            var source = '<table class="tui-calendar-body-inner">  <caption><span>Months</span></caption>  <tbody>    <tr class="tui-calendar-month-group">      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 0}}>{{Jan}}</td>      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 1}}>{{Feb}}</td>      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 2}}>{{Mar}}</td>      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 3}}>{{Apr}}</td>    </tr>    <tr class="tui-calendar-month-group">      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 4}}>{{May}}</td>      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 5}}>{{Jun}}</td>      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 6}}>{{Jul}}</td>      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 7}}>{{Aug}}</td>    </tr>    <tr class="tui-calendar-month-group">      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 8}}>{{Sep}}</td>      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 9}}>{{Oct}}</td>      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 10}}>{{Nov}}</td>      <td class="tui-calendar-month" data-timestamp={{getFirstDayTimestamp year 11}}>{{Dec}}</td>    </tr>  </tbody></table>';
            return template(source, context);
          };
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var defineClass = __webpack_require__(0);
          var bodyTmpl = __webpack_require__(55);
          var LayerBase = __webpack_require__(20);
          var TYPE_YEAR = __webpack_require__(1).TYPE_YEAR;
          var dateUtil = __webpack_require__(5);
          var DATE_SELECTOR = ".tui-calendar-year";
          var YearLayer = defineClass(LayerBase, {
            init: function(language) {
              LayerBase.call(this, language);
            },
            _type: TYPE_YEAR,
            _makeContext: function(date2) {
              var year = date2.getFullYear();
              return {
                yearGroups: [
                  dateUtil.getRangeArr(year - 4, year - 2),
                  dateUtil.getRangeArr(year - 1, year + 1),
                  dateUtil.getRangeArr(year + 2, year + 4)
                ],
                getFirstDayTimestamp: dateUtil.getFirstDayTimestamp
              };
            },
            render: function(date2, container) {
              var context = this._makeContext(date2);
              container.innerHTML = bodyTmpl(context);
              this._element = container.firstChild;
            },
            getDateElements: function() {
              return this._element.querySelectorAll(DATE_SELECTOR);
            }
          });
          module2.exports = YearLayer;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var template = __webpack_require__(11);
          module2.exports = function(context) {
            var source = '<table class="tui-calendar-body-inner">  <caption><span>Years</span></caption>  <tbody>    {{each yearGroups}}    <tr class="tui-calendar-year-group">      {{each @this}}      <td class="tui-calendar-year" data-timestamp={{getFirstDayTimestamp @this 0}}>        {{@this}}      </td>      {{/each}}    </tr>    {{/each}}  </tbody></table>';
            return template(source, context);
          };
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEachArray = __webpack_require__(2);
          var defineClass = __webpack_require__(0);
          var isNumber = __webpack_require__(15);
          var Range = __webpack_require__(57);
          var util = __webpack_require__(4);
          var RangeModel = defineClass({
            init: function(ranges) {
              ranges = ranges || [];
              this._ranges = [];
              forEachArray(ranges, function(range3) {
                this.add(range3[0], range3[1]);
              }, this);
            },
            contains: function(start, end) {
              var i5 = 0;
              var length = this._ranges.length;
              var range3;
              for (; i5 < length; i5 += 1) {
                range3 = this._ranges[i5];
                if (range3.contains(start, end)) {
                  return true;
                }
              }
              return false;
            },
            hasOverlap: function(start, end) {
              var i5 = 0;
              var length = this._ranges.length;
              var range3;
              for (; i5 < length; i5 += 1) {
                range3 = this._ranges[i5];
                if (range3.isOverlapped(start, end)) {
                  return true;
                }
              }
              return false;
            },
            add: function(start, end) {
              var overlapped = false;
              var i5 = 0;
              var len = this._ranges.length;
              var range3;
              for (; i5 < len; i5 += 1) {
                range3 = this._ranges[i5];
                overlapped = range3.isOverlapped(start, end);
                if (overlapped) {
                  range3.merge(start, end);
                  break;
                }
                if (start < range3.start) {
                  break;
                }
              }
              if (!overlapped) {
                this._ranges.splice(i5, 0, new Range(start, end));
              }
            },
            getMinimumValue: function() {
              return this._ranges[0].start;
            },
            getMaximumValue: function() {
              var length = this._ranges.length;
              return this._ranges[length - 1].end;
            },
            exclude: function(start, end) {
              if (!isNumber(end)) {
                end = start;
              }
              forEachArray(this._ranges, function(range3) {
                var rangeEnd;
                if (range3.isOverlapped(start, end)) {
                  rangeEnd = range3.end;
                  range3.exclude(start, end);
                  if (end + 1 <= rangeEnd) {
                    this.add(end + 1, rangeEnd);
                  }
                }
              }, this);
              this._ranges = util.filter(this._ranges, function(range3) {
                return !range3.isEmpty();
              });
            },
            findOverlappedRange: function(start, end) {
              var i5 = 0;
              var len = this._ranges.length;
              var range3;
              for (; i5 < len; i5 += 1) {
                range3 = this._ranges[i5];
                if (range3.isOverlapped(start, end)) {
                  return [range3.start, range3.end];
                }
              }
              return null;
            }
          });
          module2.exports = RangeModel;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var defineClass = __webpack_require__(0);
          var isNumber = __webpack_require__(15);
          var Range = defineClass({
            init: function(start, end) {
              this.setRange(start, end);
            },
            setRange: function(start, end) {
              if (!isNumber(end)) {
                end = start;
              }
              this.start = Math.min(start, end);
              this.end = Math.max(start, end);
            },
            merge: function(start, end) {
              if (!isNumber(start) || !isNumber(end) || !this.isOverlapped(start, end)) {
                return;
              }
              this.start = Math.min(start, this.start);
              this.end = Math.max(end, this.end);
            },
            isEmpty: function() {
              return !isNumber(this.start) || !isNumber(this.end);
            },
            setEmpty: function() {
              this.start = this.end = null;
            },
            contains: function(start, end) {
              if (!isNumber(end)) {
                end = start;
              }
              return this.start <= start && end <= this.end;
            },
            isOverlapped: function(start, end) {
              if (!isNumber(end)) {
                end = start;
              }
              return this.start <= end && this.end >= start;
            },
            exclude: function(start, end) {
              if (start <= this.start && end >= this.end) {
                this.setEmpty();
              } else if (this.contains(start)) {
                this.setRange(this.start, start - 1);
              } else if (this.contains(end)) {
                this.setRange(end + 1, this.end);
              }
            }
          });
          module2.exports = Range;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var template = __webpack_require__(11);
          module2.exports = function(context) {
            var source = '<div class="tui-datepicker">  {{if timePicker}}    {{if isTab}}      <div class="tui-datepicker-selector">        <button type="button" class="tui-datepicker-selector-button tui-is-checked" aria-label="selected">          <span class="tui-ico-date"></span>{{localeText["date"]}}        </button>        <button type="button" class="tui-datepicker-selector-button">          <span class="tui-ico-time"></span>{{localeText["time"]}}        </button>      </div>      <div class="tui-datepicker-body">        <div class="tui-calendar-container"></div>        <div class="tui-timepicker-container"></div>      </div>    {{else}}      <div class="tui-datepicker-body">        <div class="tui-calendar-container"></div>      </div>      <div class="tui-datepicker-footer">        <div class="tui-timepicker-container"></div>      </div>    {{/if}}  {{else}}    <div class="tui-datepicker-body">      <div class="tui-calendar-container"></div>    </div>  {{/if}}</div>';
            return template(source, context);
          };
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var defineClass = __webpack_require__(0);
          var CustomEvents2 = __webpack_require__(8);
          var on2 = __webpack_require__(31);
          var off = __webpack_require__(33);
          var DateTimeFormatter = __webpack_require__(30);
          var mouseTouchEvent = __webpack_require__(19);
          var util = __webpack_require__(4);
          var DEFAULT_FORMAT = "yyyy-MM-dd";
          var DatePickerInput = defineClass({
            init: function(inputElement, option) {
              option.format = option.format || DEFAULT_FORMAT;
              this._input = util.getElement(inputElement);
              this._id = option.id;
              this._titles = option.localeText.titles;
              this._formatter = new DateTimeFormatter(option.format, this._titles);
              this._setEvents();
            },
            changeLocaleTitles: function(titles) {
              this._titles = titles;
            },
            _setEvents: function() {
              if (this._input) {
                on2(this._input, "change", this._onChangeHandler, this);
                mouseTouchEvent.on(this._input, "click", this._onClickHandler, this);
              }
            },
            _removeEvents: function() {
              this.off();
              if (this._input) {
                off(this._input, "change", this._onChangeHandler);
                mouseTouchEvent.off(this._input, "click", this._onClickHandler);
              }
            },
            _onChangeHandler: function() {
              this.fire("change");
            },
            _onClickHandler: function() {
              this.fire("click");
            },
            is: function(el) {
              return this._input === el;
            },
            enable: function() {
              if (this._input) {
                this._input.removeAttribute("disabled");
              }
            },
            disable: function() {
              if (this._input) {
                this._input.setAttribute("disabled", true);
              }
            },
            getFormat: function() {
              return this._formatter.getRawString();
            },
            setFormat: function(format) {
              if (!format) {
                return;
              }
              this._formatter = new DateTimeFormatter(format, this._titles);
            },
            clearText: function() {
              if (this._input) {
                this._input.value = "";
              }
            },
            setDate: function(date2) {
              if (this._input) {
                this._input.value = this._formatter.format(date2);
              }
            },
            getDate: function() {
              var value = "";
              if (this._input) {
                value = this._input.value;
              }
              return this._formatter.parse(value);
            },
            destroy: function() {
              this._removeEvents();
              this._input = this._id = this._formatter = null;
            }
          });
          CustomEvents2.mixin(DatePickerInput);
          module2.exports = DatePickerInput;
        },
        function(module2, exports2, __webpack_require__) {
          "use strict";
          var forEachArray = __webpack_require__(2);
          var defineClass = __webpack_require__(0);
          var CustomEvents2 = __webpack_require__(8);
          var addClass = __webpack_require__(16);
          var getData = __webpack_require__(26);
          var removeClass = __webpack_require__(18);
          var extend = __webpack_require__(7);
          var DatePicker2 = __webpack_require__(21);
          var dateUtil = __webpack_require__(5);
          var constants = __webpack_require__(1);
          var util = __webpack_require__(4);
          var CLASS_NAME_RANGE_PICKER = "tui-rangepicker";
          var CLASS_NAME_SELECTED = constants.CLASS_NAME_SELECTED;
          var CLASS_NAME_SELECTED_RANGE = "tui-is-selected-range";
          var DateRangePicker = defineClass({
            init: function(options) {
              var startpickerOpt, endpickerOpt;
              options = options || {};
              startpickerOpt = options.startpicker;
              endpickerOpt = options.endpicker;
              if (!startpickerOpt) {
                throw new Error('The "startpicker" option is required.');
              }
              if (!endpickerOpt) {
                throw new Error('The "endpicker" option is required.');
              }
              this._startpicker = null;
              this._endpicker = null;
              this._isRangeSet = false;
              this._preEndPickerDate = new Date().getDate();
              this._initializePickers(options);
              this._syncRangesToEndpicker();
            },
            _initializePickers: function(options) {
              var startpickerContainer = util.getElement(options.startpicker.container);
              var endpickerContainer = util.getElement(options.endpicker.container);
              var startInput = util.getElement(options.startpicker.input);
              var endInput = util.getElement(options.endpicker.input);
              var startpickerOpt = extend({}, options, {
                input: {
                  element: startInput,
                  format: options.format
                },
                date: options.startpicker.date,
                weekStartDay: options.startpicker.weekStartDay
              });
              var endpickerOpt = extend({}, options, {
                input: {
                  element: endInput,
                  format: options.format
                },
                date: options.endpicker.date,
                weekStartDay: options.endpicker.weekStartDay
              });
              this._startpicker = new DatePicker2(startpickerContainer, startpickerOpt);
              this._startpicker.addCssClass(CLASS_NAME_RANGE_PICKER);
              this._startpicker.on("change", this._onChangeStartpicker, this);
              this._startpicker.on("draw", this._onDrawPicker, this);
              this._endpicker = new DatePicker2(endpickerContainer, endpickerOpt);
              this._endpicker.addCssClass(CLASS_NAME_RANGE_PICKER);
              this._endpicker.on("change", this._onChangeEndpicker, this);
              this._endpicker.on("draw", this._onDrawPicker, this);
            },
            _onDrawPicker: function(eventData) {
              var calendarType = eventData.type;
              var startDate = this._startpicker.getDate();
              var endDate = this._endpicker.getDate();
              if (!startDate) {
                return;
              }
              if (!endDate) {
                endDate = new Date(NaN);
              }
              forEachArray(eventData.dateElements, function(el) {
                var elDate = new Date(Number(getData(el, "timestamp")));
                var isInRange = dateUtil.inRange(startDate, endDate, elDate, calendarType);
                var isSelected = dateUtil.isSame(startDate, elDate, calendarType) || dateUtil.isSame(endDate, elDate, calendarType);
                this._setRangeClass(el, isInRange);
                this._setSelectedClass(el, isSelected);
              }, this);
            },
            _setRangeClass: function(el, isInRange) {
              if (isInRange) {
                addClass(el, CLASS_NAME_SELECTED_RANGE);
              } else {
                removeClass(el, CLASS_NAME_SELECTED_RANGE);
              }
            },
            _setSelectedClass: function(el, isSelected) {
              if (isSelected) {
                addClass(el, CLASS_NAME_SELECTED);
              } else {
                removeClass(el, CLASS_NAME_SELECTED);
              }
            },
            _syncRangesToEndpicker: function() {
              var startDate = this._startpicker.getDate();
              var overlappedRange;
              if (startDate) {
                overlappedRange = this._startpicker.findOverlappedRange(dateUtil.cloneWithStartOf(startDate).getTime(), dateUtil.cloneWithEndOf(startDate).getTime());
                this._endpicker.enable();
                this._endpicker.setRanges([[startDate.getTime(), overlappedRange[1].getTime()]]);
                this._setTimeRangeOnEndPicker();
              } else {
                this._endpicker.setNull();
                this._endpicker.disable();
              }
            },
            _onChangeStartpicker: function() {
              this._syncRangesToEndpicker();
              this.fire("change:start");
            },
            _onChangeEndpicker: function() {
              var date2;
              var endPickerDate = this._endpicker.getDate();
              if (endPickerDate) {
                date2 = endPickerDate.getDate();
                if (this._preEndPickerDate !== date2) {
                  this._setTimeRangeOnEndPicker();
                }
                this._preEndPickerDate = date2;
              } else {
                this._preEndPickerDate = null;
              }
              this.fire("change:end");
            },
            _setTimeRangeOnEndPicker: function() {
              var pickerDate, timeRange;
              var endTimePicker = this._endpicker._timePicker;
              if (!endTimePicker) {
                return;
              }
              pickerDate = this._endpicker.getDate() || this._startpicker.getDate();
              timeRange = this._getTimeRangeFromStartPicker();
              if (pickerDate && timeRange[pickerDate.getDate()]) {
                endTimePicker.setRange(timeRange[pickerDate.getDate()]);
                this._isRangeSet = true;
              } else if (this._isRangeSet) {
                endTimePicker.setRange({ hour: 0, minute: 0 });
                endTimePicker.resetMinuteRange();
                this._isRangeSet = false;
              }
            },
            _getTimeRangeFromStartPicker: function() {
              var startDate = this._startpicker.getDate();
              var timeRange = {};
              timeRange[startDate.getDate()] = {
                hour: startDate.getHours(),
                minute: startDate.getMinutes()
              };
              return timeRange;
            },
            getStartpicker: function() {
              return this._startpicker;
            },
            getEndpicker: function() {
              return this._endpicker;
            },
            setStartDate: function(date2) {
              this._startpicker.setDate(date2);
            },
            getStartDate: function() {
              return this._startpicker.getDate();
            },
            getEndDate: function() {
              return this._endpicker.getDate();
            },
            setEndDate: function(date2) {
              this._endpicker.setDate(date2);
            },
            setRanges: function(ranges) {
              this._startpicker.setRanges(ranges);
              this._syncRangesToEndpicker();
            },
            addRange: function(start, end) {
              this._startpicker.addRange(start, end);
              this._syncRangesToEndpicker();
            },
            removeRange: function(start, end, type) {
              this._startpicker.removeRange(start, end, type);
              this._syncRangesToEndpicker();
            },
            changeLanguage: function(language) {
              this._startpicker.changeLanguage(language);
              this._endpicker.changeLanguage(language);
            },
            destroy: function() {
              this.off();
              this._startpicker.destroy();
              this._endpicker.destroy();
              this._startpicker = this._endpicker = null;
            }
          });
          CustomEvents2.mixin(DateRangePicker);
          module2.exports = DateRangePicker;
        },
        function(module2, exports2, __webpack_require__) {
        }
      ]);
    });
  }
});

// ../../node_modules/tui-code-snippet/collection/forEachOwnProperties.js
var require_forEachOwnProperties = __commonJS({
  "../../node_modules/tui-code-snippet/collection/forEachOwnProperties.js"(exports, module) {
    "use strict";
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
  }
});

// ../../node_modules/tui-code-snippet/request/imagePing.js
var require_imagePing = __commonJS({
  "../../node_modules/tui-code-snippet/request/imagePing.js"(exports, module) {
    "use strict";
    var forEachOwnProperties = require_forEachOwnProperties();
    function imagePing(url, trackingInfo) {
      var trackingElement = document.createElement("img");
      var queryString = "";
      forEachOwnProperties(trackingInfo, function(value, key) {
        queryString += "&" + key + "=" + value;
      });
      queryString = queryString.substring(1);
      trackingElement.src = url + "?" + queryString;
      trackingElement.style.display = "none";
      document.body.appendChild(trackingElement);
      document.body.removeChild(trackingElement);
      return trackingElement;
    }
    module.exports = imagePing;
  }
});

// ../../node_modules/tui-code-snippet/request/sendHostname.js
var require_sendHostname = __commonJS({
  "../../node_modules/tui-code-snippet/request/sendHostname.js"(exports, module) {
    "use strict";
    var isUndefined2 = require_isUndefined();
    var imagePing = require_imagePing();
    var ms7days = 7 * 24 * 60 * 60 * 1e3;
    function isExpired(date2) {
      var now = new Date().getTime();
      return now - date2 > ms7days;
    }
    function sendHostname2(appName, trackingId) {
      var url = "https://www.google-analytics.com/collect";
      var hostname = location.hostname;
      var hitType = "event";
      var eventCategory = "use";
      var applicationKeyForStorage = "TOAST UI " + appName + " for " + hostname + ": Statistics";
      var date2 = window.localStorage.getItem(applicationKeyForStorage);
      if (!isUndefined2(window.tui) && window.tui.usageStatistics === false) {
        return;
      }
      if (date2 && !isExpired(date2)) {
        return;
      }
      window.localStorage.setItem(applicationKeyForStorage, new Date().getTime());
      setTimeout(function() {
        if (document.readyState === "interactive" || document.readyState === "complete") {
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
      }, 1e3);
    }
    module.exports = sendHostname2;
  }
});

// ../../node_modules/tui-code-snippet/object/extend.js
var require_extend = __commonJS({
  "../../node_modules/tui-code-snippet/object/extend.js"(exports, module) {
    "use strict";
    function extend(target, objects) {
      var hasOwnProp = Object.prototype.hasOwnProperty;
      var source, prop, i5, len;
      for (i5 = 1, len = arguments.length; i5 < len; i5 += 1) {
        source = arguments[i5];
        for (prop in source) {
          if (hasOwnProp.call(source, prop)) {
            target[prop] = source[prop];
          }
        }
      }
      return target;
    }
    module.exports = extend;
  }
});

// ../../node_modules/tui-code-snippet/type/isNull.js
var require_isNull = __commonJS({
  "../../node_modules/tui-code-snippet/type/isNull.js"(exports, module) {
    "use strict";
    function isNull(obj) {
      return obj === null;
    }
    module.exports = isNull;
  }
});

// ../../node_modules/tui-code-snippet/type/isExisty.js
var require_isExisty = __commonJS({
  "../../node_modules/tui-code-snippet/type/isExisty.js"(exports, module) {
    "use strict";
    var isUndefined2 = require_isUndefined();
    var isNull = require_isNull();
    function isExisty(param) {
      return !isUndefined2(param) && !isNull(param);
    }
    module.exports = isExisty;
  }
});

// ../../node_modules/tui-code-snippet/type/isArray.js
var require_isArray = __commonJS({
  "../../node_modules/tui-code-snippet/type/isArray.js"(exports, module) {
    "use strict";
    function isArray(obj) {
      return obj instanceof Array;
    }
    module.exports = isArray;
  }
});

// ../../node_modules/tui-code-snippet/type/isFunction.js
var require_isFunction = __commonJS({
  "../../node_modules/tui-code-snippet/type/isFunction.js"(exports, module) {
    "use strict";
    function isFunction2(obj) {
      return obj instanceof Function;
    }
    module.exports = isFunction2;
  }
});

// ../../node_modules/tui-code-snippet/collection/forEachArray.js
var require_forEachArray = __commonJS({
  "../../node_modules/tui-code-snippet/collection/forEachArray.js"(exports, module) {
    "use strict";
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
  }
});

// ../../node_modules/tui-code-snippet/collection/forEach.js
var require_forEach = __commonJS({
  "../../node_modules/tui-code-snippet/collection/forEach.js"(exports, module) {
    "use strict";
    var isArray = require_isArray();
    var forEachArray = require_forEachArray();
    var forEachOwnProperties = require_forEachOwnProperties();
    function forEach(obj, iteratee, context) {
      if (isArray(obj)) {
        forEachArray(obj, iteratee, context);
      } else {
        forEachOwnProperties(obj, iteratee, context);
      }
    }
    module.exports = forEach;
  }
});

// ../../node_modules/tui-code-snippet/customEvents/customEvents.js
var require_customEvents = __commonJS({
  "../../node_modules/tui-code-snippet/customEvents/customEvents.js"(exports, module) {
    "use strict";
    var extend = require_extend();
    var isExisty = require_isExisty();
    var isString2 = require_isString();
    var isObject = require_isObject();
    var isArray = require_isArray();
    var isFunction2 = require_isFunction();
    var forEach = require_forEach();
    var R_EVENTNAME_SPLIT = /\s+/g;
    function CustomEvents2() {
      this.events = null;
      this.contexts = null;
    }
    CustomEvents2.mixin = function(func) {
      extend(func.prototype, CustomEvents2.prototype);
    };
    CustomEvents2.prototype._getHandlerItem = function(handler, context) {
      var item = { handler };
      if (context) {
        item.context = context;
      }
      return item;
    };
    CustomEvents2.prototype._safeEvent = function(eventName) {
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
    CustomEvents2.prototype._safeContext = function() {
      var context = this.contexts;
      if (!context) {
        context = this.contexts = [];
      }
      return context;
    };
    CustomEvents2.prototype._indexOfContext = function(ctx) {
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
    CustomEvents2.prototype._memorizeContext = function(ctx) {
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
    CustomEvents2.prototype._forgetContext = function(ctx) {
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
    CustomEvents2.prototype._bindEvent = function(eventName, handler, context) {
      var events = this._safeEvent(eventName);
      this._memorizeContext(context);
      events.push(this._getHandlerItem(handler, context));
    };
    CustomEvents2.prototype.on = function(eventName, handler, context) {
      var self2 = this;
      if (isString2(eventName)) {
        eventName = eventName.split(R_EVENTNAME_SPLIT);
        forEach(eventName, function(name) {
          self2._bindEvent(name, handler, context);
        });
      } else if (isObject(eventName)) {
        context = handler;
        forEach(eventName, function(func, name) {
          self2.on(name, func, context);
        });
      }
    };
    CustomEvents2.prototype.once = function(eventName, handler, context) {
      var self2 = this;
      if (isObject(eventName)) {
        context = handler;
        forEach(eventName, function(func, name) {
          self2.once(name, func, context);
        });
        return;
      }
      function onceHandler() {
        handler.apply(context, arguments);
        self2.off(eventName, onceHandler, context);
      }
      this.on(eventName, onceHandler, context);
    };
    CustomEvents2.prototype._spliceMatches = function(arr, predicate) {
      var i5 = 0;
      var len;
      if (!isArray(arr)) {
        return;
      }
      for (len = arr.length; i5 < len; i5 += 1) {
        if (predicate(arr[i5]) === true) {
          arr.splice(i5, 1);
          len -= 1;
          i5 -= 1;
        }
      }
    };
    CustomEvents2.prototype._matchHandler = function(handler) {
      var self2 = this;
      return function(item) {
        var needRemove = handler === item.handler;
        if (needRemove) {
          self2._forgetContext(item.context);
        }
        return needRemove;
      };
    };
    CustomEvents2.prototype._matchContext = function(context) {
      var self2 = this;
      return function(item) {
        var needRemove = context === item.context;
        if (needRemove) {
          self2._forgetContext(item.context);
        }
        return needRemove;
      };
    };
    CustomEvents2.prototype._matchHandlerAndContext = function(handler, context) {
      var self2 = this;
      return function(item) {
        var matchHandler = handler === item.handler;
        var matchContext = context === item.context;
        var needRemove = matchHandler && matchContext;
        if (needRemove) {
          self2._forgetContext(item.context);
        }
        return needRemove;
      };
    };
    CustomEvents2.prototype._offByEventName = function(eventName, handler) {
      var self2 = this;
      var andByHandler = isFunction2(handler);
      var matchHandler = self2._matchHandler(handler);
      eventName = eventName.split(R_EVENTNAME_SPLIT);
      forEach(eventName, function(name) {
        var handlerItems = self2._safeEvent(name);
        if (andByHandler) {
          self2._spliceMatches(handlerItems, matchHandler);
        } else {
          forEach(handlerItems, function(item) {
            self2._forgetContext(item.context);
          });
          self2.events[name] = [];
        }
      });
    };
    CustomEvents2.prototype._offByHandler = function(handler) {
      var self2 = this;
      var matchHandler = this._matchHandler(handler);
      forEach(this._safeEvent(), function(handlerItems) {
        self2._spliceMatches(handlerItems, matchHandler);
      });
    };
    CustomEvents2.prototype._offByObject = function(obj, handler) {
      var self2 = this;
      var matchFunc;
      if (this._indexOfContext(obj) < 0) {
        forEach(obj, function(func, name) {
          self2.off(name, func);
        });
      } else if (isString2(handler)) {
        matchFunc = this._matchContext(obj);
        self2._spliceMatches(this._safeEvent(handler), matchFunc);
      } else if (isFunction2(handler)) {
        matchFunc = this._matchHandlerAndContext(handler, obj);
        forEach(this._safeEvent(), function(handlerItems) {
          self2._spliceMatches(handlerItems, matchFunc);
        });
      } else {
        matchFunc = this._matchContext(obj);
        forEach(this._safeEvent(), function(handlerItems) {
          self2._spliceMatches(handlerItems, matchFunc);
        });
      }
    };
    CustomEvents2.prototype.off = function(eventName, handler) {
      if (isString2(eventName)) {
        this._offByEventName(eventName, handler);
      } else if (!arguments.length) {
        this.events = {};
        this.contexts = [];
      } else if (isFunction2(eventName)) {
        this._offByHandler(eventName);
      } else if (isObject(eventName)) {
        this._offByObject(eventName, handler);
      }
    };
    CustomEvents2.prototype.fire = function(eventName) {
      this.invoke.apply(this, arguments);
    };
    CustomEvents2.prototype.invoke = function(eventName) {
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
    CustomEvents2.prototype.hasListener = function(eventName) {
      return this.getListenerLength(eventName) > 0;
    };
    CustomEvents2.prototype.getListenerLength = function(eventName) {
      var events = this._safeEvent(eventName);
      return events.length;
    };
    module.exports = CustomEvents2;
  }
});

// ../../node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var i;
var t;
var o;
var r;
var f;
var e = {};
var c = [];
var s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function a(n4, l5) {
  for (var u5 in l5)
    n4[u5] = l5[u5];
  return n4;
}
function h(n4) {
  var l5 = n4.parentNode;
  l5 && l5.removeChild(n4);
}
function v(l5, u5, i5) {
  var t4, o5, r5, f5 = {};
  for (r5 in u5)
    r5 == "key" ? t4 = u5[r5] : r5 == "ref" ? o5 = u5[r5] : f5[r5] = u5[r5];
  if (arguments.length > 2 && (f5.children = arguments.length > 3 ? n.call(arguments, 2) : i5), typeof l5 == "function" && l5.defaultProps != null)
    for (r5 in l5.defaultProps)
      f5[r5] === void 0 && (f5[r5] = l5.defaultProps[r5]);
  return y(l5, f5, t4, o5, null);
}
function y(n4, i5, t4, o5, r5) {
  var f5 = { type: n4, props: i5, key: t4, ref: o5, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: r5 == null ? ++u : r5 };
  return r5 == null && l.vnode != null && l.vnode(f5), f5;
}
function d(n4) {
  return n4.children;
}
function _(n4, l5) {
  this.props = n4, this.context = l5;
}
function k(n4, l5) {
  if (l5 == null)
    return n4.__ ? k(n4.__, n4.__.__k.indexOf(n4) + 1) : null;
  for (var u5; l5 < n4.__k.length; l5++)
    if ((u5 = n4.__k[l5]) != null && u5.__e != null)
      return u5.__e;
  return typeof n4.type == "function" ? k(n4) : null;
}
function b(n4) {
  var l5, u5;
  if ((n4 = n4.__) != null && n4.__c != null) {
    for (n4.__e = n4.__c.base = null, l5 = 0; l5 < n4.__k.length; l5++)
      if ((u5 = n4.__k[l5]) != null && u5.__e != null) {
        n4.__e = n4.__c.base = u5.__e;
        break;
      }
    return b(n4);
  }
}
function m(n4) {
  (!n4.__d && (n4.__d = true) && t.push(n4) && !g.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(g);
}
function g() {
  for (var n4; g.__r = t.length; )
    n4 = t.sort(function(n5, l5) {
      return n5.__v.__b - l5.__v.__b;
    }), t = [], n4.some(function(n5) {
      var l5, u5, i5, t4, o5, r5;
      n5.__d && (o5 = (t4 = (l5 = n5).__v).__e, (r5 = l5.__P) && (u5 = [], (i5 = a({}, t4)).__v = t4.__v + 1, j(r5, t4, i5, l5.__n, r5.ownerSVGElement !== void 0, t4.__h != null ? [o5] : null, u5, o5 == null ? k(t4) : o5, t4.__h), z(u5, t4), t4.__e != o5 && b(t4)));
    });
}
function w(n4, l5, u5, i5, t4, o5, r5, f5, s5, a5) {
  var h5, v5, p5, _5, b4, m4, g6, w5 = i5 && i5.__k || c, A5 = w5.length;
  for (u5.__k = [], h5 = 0; h5 < l5.length; h5++)
    if ((_5 = u5.__k[h5] = (_5 = l5[h5]) == null || typeof _5 == "boolean" ? null : typeof _5 == "string" || typeof _5 == "number" || typeof _5 == "bigint" ? y(null, _5, null, null, _5) : Array.isArray(_5) ? y(d, { children: _5 }, null, null, null) : _5.__b > 0 ? y(_5.type, _5.props, _5.key, null, _5.__v) : _5) != null) {
      if (_5.__ = u5, _5.__b = u5.__b + 1, (p5 = w5[h5]) === null || p5 && _5.key == p5.key && _5.type === p5.type)
        w5[h5] = void 0;
      else
        for (v5 = 0; v5 < A5; v5++) {
          if ((p5 = w5[v5]) && _5.key == p5.key && _5.type === p5.type) {
            w5[v5] = void 0;
            break;
          }
          p5 = null;
        }
      j(n4, _5, p5 = p5 || e, t4, o5, r5, f5, s5, a5), b4 = _5.__e, (v5 = _5.ref) && p5.ref != v5 && (g6 || (g6 = []), p5.ref && g6.push(p5.ref, null, _5), g6.push(v5, _5.__c || b4, _5)), b4 != null ? (m4 == null && (m4 = b4), typeof _5.type == "function" && _5.__k === p5.__k ? _5.__d = s5 = x(_5, s5, n4) : s5 = P(n4, _5, p5, w5, b4, s5), typeof u5.type == "function" && (u5.__d = s5)) : s5 && p5.__e == s5 && s5.parentNode != n4 && (s5 = k(p5));
    }
  for (u5.__e = m4, h5 = A5; h5--; )
    w5[h5] != null && (typeof u5.type == "function" && w5[h5].__e != null && w5[h5].__e == u5.__d && (u5.__d = k(i5, h5 + 1)), N(w5[h5], w5[h5]));
  if (g6)
    for (h5 = 0; h5 < g6.length; h5++)
      M(g6[h5], g6[++h5], g6[++h5]);
}
function x(n4, l5, u5) {
  for (var i5, t4 = n4.__k, o5 = 0; t4 && o5 < t4.length; o5++)
    (i5 = t4[o5]) && (i5.__ = n4, l5 = typeof i5.type == "function" ? x(i5, l5, u5) : P(u5, i5, i5, t4, i5.__e, l5));
  return l5;
}
function A(n4, l5) {
  return l5 = l5 || [], n4 == null || typeof n4 == "boolean" || (Array.isArray(n4) ? n4.some(function(n5) {
    A(n5, l5);
  }) : l5.push(n4)), l5;
}
function P(n4, l5, u5, i5, t4, o5) {
  var r5, f5, e3;
  if (l5.__d !== void 0)
    r5 = l5.__d, l5.__d = void 0;
  else if (u5 == null || t4 != o5 || t4.parentNode == null)
    n:
      if (o5 == null || o5.parentNode !== n4)
        n4.appendChild(t4), r5 = null;
      else {
        for (f5 = o5, e3 = 0; (f5 = f5.nextSibling) && e3 < i5.length; e3 += 2)
          if (f5 == t4)
            break n;
        n4.insertBefore(t4, o5), r5 = o5;
      }
  return r5 !== void 0 ? r5 : t4.nextSibling;
}
function C(n4, l5, u5, i5, t4) {
  var o5;
  for (o5 in u5)
    o5 === "children" || o5 === "key" || o5 in l5 || H(n4, o5, null, u5[o5], i5);
  for (o5 in l5)
    t4 && typeof l5[o5] != "function" || o5 === "children" || o5 === "key" || o5 === "value" || o5 === "checked" || u5[o5] === l5[o5] || H(n4, o5, l5[o5], u5[o5], i5);
}
function $(n4, l5, u5) {
  l5[0] === "-" ? n4.setProperty(l5, u5) : n4[l5] = u5 == null ? "" : typeof u5 != "number" || s.test(l5) ? u5 : u5 + "px";
}
function H(n4, l5, u5, i5, t4) {
  var o5;
  n:
    if (l5 === "style")
      if (typeof u5 == "string")
        n4.style.cssText = u5;
      else {
        if (typeof i5 == "string" && (n4.style.cssText = i5 = ""), i5)
          for (l5 in i5)
            u5 && l5 in u5 || $(n4.style, l5, "");
        if (u5)
          for (l5 in u5)
            i5 && u5[l5] === i5[l5] || $(n4.style, l5, u5[l5]);
      }
    else if (l5[0] === "o" && l5[1] === "n")
      o5 = l5 !== (l5 = l5.replace(/Capture$/, "")), l5 = l5.toLowerCase() in n4 ? l5.toLowerCase().slice(2) : l5.slice(2), n4.l || (n4.l = {}), n4.l[l5 + o5] = u5, u5 ? i5 || n4.addEventListener(l5, o5 ? T : I, o5) : n4.removeEventListener(l5, o5 ? T : I, o5);
    else if (l5 !== "dangerouslySetInnerHTML") {
      if (t4)
        l5 = l5.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (l5 !== "href" && l5 !== "list" && l5 !== "form" && l5 !== "tabIndex" && l5 !== "download" && l5 in n4)
        try {
          n4[l5] = u5 == null ? "" : u5;
          break n;
        } catch (n5) {
        }
      typeof u5 == "function" || (u5 != null && (u5 !== false || l5[0] === "a" && l5[1] === "r") ? n4.setAttribute(l5, u5) : n4.removeAttribute(l5));
    }
}
function I(n4) {
  this.l[n4.type + false](l.event ? l.event(n4) : n4);
}
function T(n4) {
  this.l[n4.type + true](l.event ? l.event(n4) : n4);
}
function j(n4, u5, i5, t4, o5, r5, f5, e3, c5) {
  var s5, h5, v5, y4, p5, k4, b4, m4, g6, x6, A5, P4, C3, $3 = u5.type;
  if (u5.constructor !== void 0)
    return null;
  i5.__h != null && (c5 = i5.__h, e3 = u5.__e = i5.__e, u5.__h = null, r5 = [e3]), (s5 = l.__b) && s5(u5);
  try {
    n:
      if (typeof $3 == "function") {
        if (m4 = u5.props, g6 = (s5 = $3.contextType) && t4[s5.__c], x6 = s5 ? g6 ? g6.props.value : s5.__ : t4, i5.__c ? b4 = (h5 = u5.__c = i5.__c).__ = h5.__E : ("prototype" in $3 && $3.prototype.render ? u5.__c = h5 = new $3(m4, x6) : (u5.__c = h5 = new _(m4, x6), h5.constructor = $3, h5.render = O), g6 && g6.sub(h5), h5.props = m4, h5.state || (h5.state = {}), h5.context = x6, h5.__n = t4, v5 = h5.__d = true, h5.__h = []), h5.__s == null && (h5.__s = h5.state), $3.getDerivedStateFromProps != null && (h5.__s == h5.state && (h5.__s = a({}, h5.__s)), a(h5.__s, $3.getDerivedStateFromProps(m4, h5.__s))), y4 = h5.props, p5 = h5.state, v5)
          $3.getDerivedStateFromProps == null && h5.componentWillMount != null && h5.componentWillMount(), h5.componentDidMount != null && h5.__h.push(h5.componentDidMount);
        else {
          if ($3.getDerivedStateFromProps == null && m4 !== y4 && h5.componentWillReceiveProps != null && h5.componentWillReceiveProps(m4, x6), !h5.__e && h5.shouldComponentUpdate != null && h5.shouldComponentUpdate(m4, h5.__s, x6) === false || u5.__v === i5.__v) {
            h5.props = m4, h5.state = h5.__s, u5.__v !== i5.__v && (h5.__d = false), h5.__v = u5, u5.__e = i5.__e, u5.__k = i5.__k, u5.__k.forEach(function(n5) {
              n5 && (n5.__ = u5);
            }), h5.__h.length && f5.push(h5);
            break n;
          }
          h5.componentWillUpdate != null && h5.componentWillUpdate(m4, h5.__s, x6), h5.componentDidUpdate != null && h5.__h.push(function() {
            h5.componentDidUpdate(y4, p5, k4);
          });
        }
        if (h5.context = x6, h5.props = m4, h5.__v = u5, h5.__P = n4, A5 = l.__r, P4 = 0, "prototype" in $3 && $3.prototype.render)
          h5.state = h5.__s, h5.__d = false, A5 && A5(u5), s5 = h5.render(h5.props, h5.state, h5.context);
        else
          do {
            h5.__d = false, A5 && A5(u5), s5 = h5.render(h5.props, h5.state, h5.context), h5.state = h5.__s;
          } while (h5.__d && ++P4 < 25);
        h5.state = h5.__s, h5.getChildContext != null && (t4 = a(a({}, t4), h5.getChildContext())), v5 || h5.getSnapshotBeforeUpdate == null || (k4 = h5.getSnapshotBeforeUpdate(y4, p5)), C3 = s5 != null && s5.type === d && s5.key == null ? s5.props.children : s5, w(n4, Array.isArray(C3) ? C3 : [C3], u5, i5, t4, o5, r5, f5, e3, c5), h5.base = u5.__e, u5.__h = null, h5.__h.length && f5.push(h5), b4 && (h5.__E = h5.__ = null), h5.__e = false;
      } else
        r5 == null && u5.__v === i5.__v ? (u5.__k = i5.__k, u5.__e = i5.__e) : u5.__e = L(i5.__e, u5, i5, t4, o5, r5, f5, c5);
    (s5 = l.diffed) && s5(u5);
  } catch (n5) {
    u5.__v = null, (c5 || r5 != null) && (u5.__e = e3, u5.__h = !!c5, r5[r5.indexOf(e3)] = null), l.__e(n5, u5, i5);
  }
}
function z(n4, u5) {
  l.__c && l.__c(u5, n4), n4.some(function(u6) {
    try {
      n4 = u6.__h, u6.__h = [], n4.some(function(n5) {
        n5.call(u6);
      });
    } catch (n5) {
      l.__e(n5, u6.__v);
    }
  });
}
function L(l5, u5, i5, t4, o5, r5, f5, c5) {
  var s5, a5, v5, y4 = i5.props, p5 = u5.props, d5 = u5.type, _5 = 0;
  if (d5 === "svg" && (o5 = true), r5 != null) {
    for (; _5 < r5.length; _5++)
      if ((s5 = r5[_5]) && "setAttribute" in s5 == !!d5 && (d5 ? s5.localName === d5 : s5.nodeType === 3)) {
        l5 = s5, r5[_5] = null;
        break;
      }
  }
  if (l5 == null) {
    if (d5 === null)
      return document.createTextNode(p5);
    l5 = o5 ? document.createElementNS("http://www.w3.org/2000/svg", d5) : document.createElement(d5, p5.is && p5), r5 = null, c5 = false;
  }
  if (d5 === null)
    y4 === p5 || c5 && l5.data === p5 || (l5.data = p5);
  else {
    if (r5 = r5 && n.call(l5.childNodes), a5 = (y4 = i5.props || e).dangerouslySetInnerHTML, v5 = p5.dangerouslySetInnerHTML, !c5) {
      if (r5 != null)
        for (y4 = {}, _5 = 0; _5 < l5.attributes.length; _5++)
          y4[l5.attributes[_5].name] = l5.attributes[_5].value;
      (v5 || a5) && (v5 && (a5 && v5.__html == a5.__html || v5.__html === l5.innerHTML) || (l5.innerHTML = v5 && v5.__html || ""));
    }
    if (C(l5, p5, y4, o5, c5), v5)
      u5.__k = [];
    else if (_5 = u5.props.children, w(l5, Array.isArray(_5) ? _5 : [_5], u5, i5, t4, o5 && d5 !== "foreignObject", r5, f5, r5 ? r5[0] : i5.__k && k(i5, 0), c5), r5 != null)
      for (_5 = r5.length; _5--; )
        r5[_5] != null && h(r5[_5]);
    c5 || ("value" in p5 && (_5 = p5.value) !== void 0 && (_5 !== l5.value || d5 === "progress" && !_5 || d5 === "option" && _5 !== y4.value) && H(l5, "value", _5, y4.value, false), "checked" in p5 && (_5 = p5.checked) !== void 0 && _5 !== l5.checked && H(l5, "checked", _5, y4.checked, false));
  }
  return l5;
}
function M(n4, u5, i5) {
  try {
    typeof n4 == "function" ? n4(u5) : n4.current = u5;
  } catch (n5) {
    l.__e(n5, i5);
  }
}
function N(n4, u5, i5) {
  var t4, o5;
  if (l.unmount && l.unmount(n4), (t4 = n4.ref) && (t4.current && t4.current !== n4.__e || M(t4, null, u5)), (t4 = n4.__c) != null) {
    if (t4.componentWillUnmount)
      try {
        t4.componentWillUnmount();
      } catch (n5) {
        l.__e(n5, u5);
      }
    t4.base = t4.__P = null;
  }
  if (t4 = n4.__k)
    for (o5 = 0; o5 < t4.length; o5++)
      t4[o5] && N(t4[o5], u5, typeof n4.type != "function");
  i5 || n4.__e == null || h(n4.__e), n4.__e = n4.__d = void 0;
}
function O(n4, l5, u5) {
  return this.constructor(n4, u5);
}
function S(u5, i5, t4) {
  var o5, r5, f5;
  l.__ && l.__(u5, i5), r5 = (o5 = typeof t4 == "function") ? null : t4 && t4.__k || i5.__k, f5 = [], j(i5, u5 = (!o5 && t4 || i5).__k = v(d, null, [u5]), r5 || e, e, i5.ownerSVGElement !== void 0, !o5 && t4 ? [t4] : r5 ? null : i5.firstChild ? n.call(i5.childNodes) : null, f5, !o5 && t4 ? t4 : r5 ? r5.__e : i5.firstChild, o5), z(f5, u5);
}
function B(l5, u5, i5) {
  var t4, o5, r5, f5 = a({}, l5.props);
  for (r5 in u5)
    r5 == "key" ? t4 = u5[r5] : r5 == "ref" ? o5 = u5[r5] : f5[r5] = u5[r5];
  return arguments.length > 2 && (f5.children = arguments.length > 3 ? n.call(arguments, 2) : i5), y(l5.type, f5, t4 || l5.key, o5 || l5.ref, null);
}
function D(n4, l5) {
  var u5 = { __c: l5 = "__cC" + f++, __: n4, Consumer: function(n5, l6) {
    return n5.children(l6);
  }, Provider: function(n5) {
    var u6, i5;
    return this.getChildContext || (u6 = [], (i5 = {})[l5] = this, this.getChildContext = function() {
      return i5;
    }, this.shouldComponentUpdate = function(n6) {
      this.props.value !== n6.value && u6.some(m);
    }, this.sub = function(n6) {
      u6.push(n6);
      var l6 = n6.componentWillUnmount;
      n6.componentWillUnmount = function() {
        u6.splice(u6.indexOf(n6), 1), l6 && l6.call(n6);
      };
    }), n5.children;
  } };
  return u5.Provider.__ = u5.Consumer.contextType = u5;
}
n = c.slice, l = { __e: function(n4, l5, u5, i5) {
  for (var t4, o5, r5; l5 = l5.__; )
    if ((t4 = l5.__c) && !t4.__)
      try {
        if ((o5 = t4.constructor) && o5.getDerivedStateFromError != null && (t4.setState(o5.getDerivedStateFromError(n4)), r5 = t4.__d), t4.componentDidCatch != null && (t4.componentDidCatch(n4, i5 || {}), r5 = t4.__d), r5)
          return t4.__E = t4;
      } catch (l6) {
        n4 = l6;
      }
  throw n4;
} }, u = 0, i = function(n4) {
  return n4 != null && n4.constructor === void 0;
}, _.prototype.setState = function(n4, l5) {
  var u5;
  u5 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), typeof n4 == "function" && (n4 = n4(a({}, u5), this.props)), n4 && a(u5, n4), n4 != null && this.__v && (l5 && this.__h.push(l5), m(this));
}, _.prototype.forceUpdate = function(n4) {
  this.__v && (this.__e = true, n4 && this.__h.push(n4), m(this));
}, _.prototype.render = d, t = [], o = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;

// ../../node_modules/preact/hooks/dist/hooks.module.js
var t2;
var u2;
var r2;
var o2;
var i2 = 0;
var c2 = [];
var f2 = [];
var e2 = l.__b;
var a2 = l.__r;
var v2 = l.diffed;
var l2 = l.__c;
var m2 = l.unmount;
function p(t4, r5) {
  l.__h && l.__h(u2, t4, i2 || r5), i2 = 0;
  var o5 = u2.__H || (u2.__H = { __: [], __h: [] });
  return t4 >= o5.__.length && o5.__.push({ __V: f2 }), o5.__[t4];
}
function y2(n4) {
  return i2 = 1, d2(z2, n4);
}
function d2(n4, r5, o5) {
  var i5 = p(t2++, 2);
  return i5.t = n4, i5.__c || (i5.__ = [o5 ? o5(r5) : z2(void 0, r5), function(n5) {
    var t4 = i5.t(i5.__[0], n5);
    i5.__[0] !== t4 && (i5.__ = [t4, i5.__[1]], i5.__c.setState({}));
  }], i5.__c = u2), i5.__;
}
function _2(r5, o5) {
  var i5 = p(t2++, 3);
  !l.__s && w2(i5.__H, o5) && (i5.__ = r5, i5.u = o5, u2.__H.__h.push(i5));
}
function h2(r5, o5) {
  var i5 = p(t2++, 4);
  !l.__s && w2(i5.__H, o5) && (i5.__ = r5, i5.u = o5, u2.__h.push(i5));
}
function s2(n4) {
  return i2 = 5, F(function() {
    return { current: n4 };
  }, []);
}
function F(n4, u5) {
  var r5 = p(t2++, 7);
  return w2(r5.__H, u5) ? (r5.__V = n4(), r5.u = u5, r5.__h = n4, r5.__V) : r5.__;
}
function T2(n4, t4) {
  return i2 = 8, F(function() {
    return n4;
  }, t4);
}
function q(n4) {
  var r5 = u2.context[n4.__c], o5 = p(t2++, 9);
  return o5.c = n4, r5 ? (o5.__ == null && (o5.__ = true, r5.sub(u2)), r5.props.value) : n4.__;
}
function b2() {
  for (var t4; t4 = c2.shift(); )
    if (t4.__P)
      try {
        t4.__H.__h.forEach(j2), t4.__H.__h.forEach(k2), t4.__H.__h = [];
      } catch (u5) {
        t4.__H.__h = [], l.__e(u5, t4.__v);
      }
}
l.__b = function(n4) {
  u2 = null, e2 && e2(n4);
}, l.__r = function(n4) {
  a2 && a2(n4), t2 = 0;
  var o5 = (u2 = n4.__c).__H;
  o5 && (r2 === u2 ? (o5.__h = [], u2.__h = [], o5.__.forEach(function(n5) {
    n5.__V = f2, n5.u = void 0;
  })) : (o5.__h.forEach(j2), o5.__h.forEach(k2), o5.__h = [])), r2 = u2;
}, l.diffed = function(t4) {
  v2 && v2(t4);
  var i5 = t4.__c;
  i5 && i5.__H && (i5.__H.__h.length && (c2.push(i5) !== 1 && o2 === l.requestAnimationFrame || ((o2 = l.requestAnimationFrame) || function(n4) {
    var t5, u5 = function() {
      clearTimeout(r5), g2 && cancelAnimationFrame(t5), setTimeout(n4);
    }, r5 = setTimeout(u5, 100);
    g2 && (t5 = requestAnimationFrame(u5));
  })(b2)), i5.__H.__.forEach(function(n4) {
    n4.u && (n4.__H = n4.u), n4.__V !== f2 && (n4.__ = n4.__V), n4.u = void 0, n4.__V = f2;
  })), r2 = u2 = null;
}, l.__c = function(t4, u5) {
  u5.some(function(t5) {
    try {
      t5.__h.forEach(j2), t5.__h = t5.__h.filter(function(n4) {
        return !n4.__ || k2(n4);
      });
    } catch (r5) {
      u5.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), u5 = [], l.__e(r5, t5.__v);
    }
  }), l2 && l2(t4, u5);
}, l.unmount = function(t4) {
  m2 && m2(t4);
  var u5, r5 = t4.__c;
  r5 && r5.__H && (r5.__H.__.forEach(function(n4) {
    try {
      j2(n4);
    } catch (n5) {
      u5 = n5;
    }
  }), u5 && l.__e(u5, r5.__v));
};
var g2 = typeof requestAnimationFrame == "function";
function j2(n4) {
  var t4 = u2, r5 = n4.__c;
  typeof r5 == "function" && (n4.__c = void 0, r5()), u2 = t4;
}
function k2(n4) {
  var t4 = u2;
  n4.__c = n4.__(), u2 = t4;
}
function w2(n4, t4) {
  return !n4 || n4.length !== t4.length || t4.some(function(t5, u5) {
    return t5 !== n4[u5];
  });
}
function z2(n4, t4) {
  return typeof t4 == "function" ? t4(n4) : t4;
}

// ../../node_modules/immer/dist/immer.esm.mjs
function n2(n4) {
  for (var r5 = arguments.length, t4 = Array(r5 > 1 ? r5 - 1 : 0), e3 = 1; e3 < r5; e3++)
    t4[e3 - 1] = arguments[e3];
  if (true) {
    var i5 = Y[n4], o5 = i5 ? typeof i5 == "function" ? i5.apply(null, t4) : i5 : "unknown error nr: " + n4;
    throw Error("[Immer] " + o5);
  }
  throw Error("[Immer] minified error nr: " + n4 + (t4.length ? " " + t4.map(function(n5) {
    return "'" + n5 + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function r3(n4) {
  return !!n4 && !!n4[Q];
}
function t3(n4) {
  return !!n4 && (function(n5) {
    if (!n5 || typeof n5 != "object")
      return false;
    var r5 = Object.getPrototypeOf(n5);
    if (r5 === null)
      return true;
    var t4 = Object.hasOwnProperty.call(r5, "constructor") && r5.constructor;
    return t4 === Object || typeof t4 == "function" && Function.toString.call(t4) === Z;
  }(n4) || Array.isArray(n4) || !!n4[L2] || !!n4.constructor[L2] || s3(n4) || v3(n4));
}
function i3(n4, r5, t4) {
  t4 === void 0 && (t4 = false), o3(n4) === 0 ? (t4 ? Object.keys : nn)(n4).forEach(function(e3) {
    t4 && typeof e3 == "symbol" || r5(e3, n4[e3], n4);
  }) : n4.forEach(function(t5, e3) {
    return r5(e3, t5, n4);
  });
}
function o3(n4) {
  var r5 = n4[Q];
  return r5 ? r5.i > 3 ? r5.i - 4 : r5.i : Array.isArray(n4) ? 1 : s3(n4) ? 2 : v3(n4) ? 3 : 0;
}
function u3(n4, r5) {
  return o3(n4) === 2 ? n4.has(r5) : Object.prototype.hasOwnProperty.call(n4, r5);
}
function a3(n4, r5) {
  return o3(n4) === 2 ? n4.get(r5) : n4[r5];
}
function f3(n4, r5, t4) {
  var e3 = o3(n4);
  e3 === 2 ? n4.set(r5, t4) : e3 === 3 ? (n4.delete(r5), n4.add(t4)) : n4[r5] = t4;
}
function c3(n4, r5) {
  return n4 === r5 ? n4 !== 0 || 1 / n4 == 1 / r5 : n4 != n4 && r5 != r5;
}
function s3(n4) {
  return X && n4 instanceof Map;
}
function v3(n4) {
  return q2 && n4 instanceof Set;
}
function p2(n4) {
  return n4.o || n4.t;
}
function l3(n4) {
  if (Array.isArray(n4))
    return Array.prototype.slice.call(n4);
  var r5 = rn(n4);
  delete r5[Q];
  for (var t4 = nn(r5), e3 = 0; e3 < t4.length; e3++) {
    var i5 = t4[e3], o5 = r5[i5];
    o5.writable === false && (o5.writable = true, o5.configurable = true), (o5.get || o5.set) && (r5[i5] = { configurable: true, writable: true, enumerable: o5.enumerable, value: n4[i5] });
  }
  return Object.create(Object.getPrototypeOf(n4), r5);
}
function d3(n4, e3) {
  return e3 === void 0 && (e3 = false), y3(n4) || r3(n4) || !t3(n4) ? n4 : (o3(n4) > 1 && (n4.set = n4.add = n4.clear = n4.delete = h3), Object.freeze(n4), e3 && i3(n4, function(n5, r5) {
    return d3(r5, true);
  }, true), n4);
}
function h3() {
  n2(2);
}
function y3(n4) {
  return n4 == null || typeof n4 != "object" || Object.isFrozen(n4);
}
function b3(r5) {
  var t4 = tn[r5];
  return t4 || n2(18, r5), t4;
}
function _3() {
  return U || n2(0), U;
}
function j3(n4, r5) {
  r5 && (b3("Patches"), n4.u = [], n4.s = [], n4.v = r5);
}
function O2(n4) {
  g3(n4), n4.p.forEach(S2), n4.p = null;
}
function g3(n4) {
  n4 === U && (U = n4.l);
}
function w3(n4) {
  return U = { p: [], l: U, h: n4, m: true, _: 0 };
}
function S2(n4) {
  var r5 = n4[Q];
  r5.i === 0 || r5.i === 1 ? r5.j() : r5.O = true;
}
function P2(r5, e3) {
  e3._ = e3.p.length;
  var i5 = e3.p[0], o5 = r5 !== void 0 && r5 !== i5;
  return e3.h.g || b3("ES5").S(e3, r5, o5), o5 ? (i5[Q].P && (O2(e3), n2(4)), t3(r5) && (r5 = M2(e3, r5), e3.l || x2(e3, r5)), e3.u && b3("Patches").M(i5[Q].t, r5, e3.u, e3.s)) : r5 = M2(e3, i5, []), O2(e3), e3.u && e3.v(e3.u, e3.s), r5 !== H2 ? r5 : void 0;
}
function M2(n4, r5, t4) {
  if (y3(r5))
    return r5;
  var e3 = r5[Q];
  if (!e3)
    return i3(r5, function(i5, o6) {
      return A2(n4, e3, r5, i5, o6, t4);
    }, true), r5;
  if (e3.A !== n4)
    return r5;
  if (!e3.P)
    return x2(n4, e3.t, true), e3.t;
  if (!e3.I) {
    e3.I = true, e3.A._--;
    var o5 = e3.i === 4 || e3.i === 5 ? e3.o = l3(e3.k) : e3.o;
    i3(e3.i === 3 ? new Set(o5) : o5, function(r6, i5) {
      return A2(n4, e3, o5, r6, i5, t4);
    }), x2(n4, o5, false), t4 && n4.u && b3("Patches").R(e3, t4, n4.u, n4.s);
  }
  return e3.o;
}
function A2(e3, i5, o5, a5, c5, s5) {
  if (c5 === o5 && n2(5), r3(c5)) {
    var v5 = M2(e3, c5, s5 && i5 && i5.i !== 3 && !u3(i5.D, a5) ? s5.concat(a5) : void 0);
    if (f3(o5, a5, v5), !r3(v5))
      return;
    e3.m = false;
  }
  if (t3(c5) && !y3(c5)) {
    if (!e3.h.F && e3._ < 1)
      return;
    M2(e3, c5), i5 && i5.A.l || x2(e3, c5);
  }
}
function x2(n4, r5, t4) {
  t4 === void 0 && (t4 = false), n4.h.F && n4.m && d3(r5, t4);
}
function z3(n4, r5) {
  var t4 = n4[Q];
  return (t4 ? p2(t4) : n4)[r5];
}
function I2(n4, r5) {
  if (r5 in n4)
    for (var t4 = Object.getPrototypeOf(n4); t4; ) {
      var e3 = Object.getOwnPropertyDescriptor(t4, r5);
      if (e3)
        return e3;
      t4 = Object.getPrototypeOf(t4);
    }
}
function k3(n4) {
  n4.P || (n4.P = true, n4.l && k3(n4.l));
}
function E(n4) {
  n4.o || (n4.o = l3(n4.t));
}
function R(n4, r5, t4) {
  var e3 = s3(r5) ? b3("MapSet").N(r5, t4) : v3(r5) ? b3("MapSet").T(r5, t4) : n4.g ? function(n5, r6) {
    var t5 = Array.isArray(n5), e4 = { i: t5 ? 1 : 0, A: r6 ? r6.A : _3(), P: false, I: false, D: {}, l: r6, t: n5, k: null, o: null, j: null, C: false }, i5 = e4, o5 = en;
    t5 && (i5 = [e4], o5 = on);
    var u5 = Proxy.revocable(i5, o5), a5 = u5.revoke, f5 = u5.proxy;
    return e4.k = f5, e4.j = a5, f5;
  }(r5, t4) : b3("ES5").J(r5, t4);
  return (t4 ? t4.A : _3()).p.push(e3), e3;
}
function D2(e3) {
  return r3(e3) || n2(22, e3), function n4(r5) {
    if (!t3(r5))
      return r5;
    var e4, u5 = r5[Q], c5 = o3(r5);
    if (u5) {
      if (!u5.P && (u5.i < 4 || !b3("ES5").K(u5)))
        return u5.t;
      u5.I = true, e4 = F2(r5, c5), u5.I = false;
    } else
      e4 = F2(r5, c5);
    return i3(e4, function(r6, t4) {
      u5 && a3(u5.t, r6) === t4 || f3(e4, r6, n4(t4));
    }), c5 === 3 ? new Set(e4) : e4;
  }(e3);
}
function F2(n4, r5) {
  switch (r5) {
    case 2:
      return new Map(n4);
    case 3:
      return Array.from(n4);
  }
  return l3(n4);
}
var G;
var U;
var W = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol";
var X = typeof Map != "undefined";
var q2 = typeof Set != "undefined";
var B2 = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined";
var H2 = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G);
var L2 = W ? Symbol.for("immer-draftable") : "__$immer_draftable";
var Q = W ? Symbol.for("immer-state") : "__$immer_state";
var Y = { 0: "Illegal state", 1: "Immer drafts cannot have computed properties", 2: "This object has been frozen and should not be mutated", 3: function(n4) {
  return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n4;
}, 4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.", 5: "Immer forbids circular references", 6: "The first or second argument to `produce` must be a function", 7: "The third argument to `produce` must be a function or undefined", 8: "First argument to `createDraft` must be a plain object, an array, or an immerable object", 9: "First argument to `finishDraft` must be a draft returned by `createDraft`", 10: "The given draft is already finalized", 11: "Object.defineProperty() cannot be used on an Immer draft", 12: "Object.setPrototypeOf() cannot be used on an Immer draft", 13: "Immer only supports deleting array indices", 14: "Immer only supports setting array indices and the 'length' property", 15: function(n4) {
  return "Cannot apply patch, path doesn't resolve: " + n4;
}, 16: 'Sets cannot have "replace" patches.', 17: function(n4) {
  return "Unsupported patch operation: " + n4;
}, 18: function(n4) {
  return "The plugin for '" + n4 + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n4 + "()` when initializing your application.";
}, 20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available", 21: function(n4) {
  return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n4 + "'";
}, 22: function(n4) {
  return "'current' expects a draft, got: " + n4;
}, 23: function(n4) {
  return "'original' expects a draft, got: " + n4;
}, 24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed" };
var Z = "" + Object.prototype.constructor;
var nn = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(n4) {
  return Object.getOwnPropertyNames(n4).concat(Object.getOwnPropertySymbols(n4));
} : Object.getOwnPropertyNames;
var rn = Object.getOwnPropertyDescriptors || function(n4) {
  var r5 = {};
  return nn(n4).forEach(function(t4) {
    r5[t4] = Object.getOwnPropertyDescriptor(n4, t4);
  }), r5;
};
var tn = {};
var en = { get: function(n4, r5) {
  if (r5 === Q)
    return n4;
  var e3 = p2(n4);
  if (!u3(e3, r5))
    return function(n5, r6, t4) {
      var e4, i6 = I2(r6, t4);
      return i6 ? "value" in i6 ? i6.value : (e4 = i6.get) === null || e4 === void 0 ? void 0 : e4.call(n5.k) : void 0;
    }(n4, e3, r5);
  var i5 = e3[r5];
  return n4.I || !t3(i5) ? i5 : i5 === z3(n4.t, r5) ? (E(n4), n4.o[r5] = R(n4.A.h, i5, n4)) : i5;
}, has: function(n4, r5) {
  return r5 in p2(n4);
}, ownKeys: function(n4) {
  return Reflect.ownKeys(p2(n4));
}, set: function(n4, r5, t4) {
  var e3 = I2(p2(n4), r5);
  if (e3 == null ? void 0 : e3.set)
    return e3.set.call(n4.k, t4), true;
  if (!n4.P) {
    var i5 = z3(p2(n4), r5), o5 = i5 == null ? void 0 : i5[Q];
    if (o5 && o5.t === t4)
      return n4.o[r5] = t4, n4.D[r5] = false, true;
    if (c3(t4, i5) && (t4 !== void 0 || u3(n4.t, r5)))
      return true;
    E(n4), k3(n4);
  }
  return n4.o[r5] === t4 && typeof t4 != "number" && (t4 !== void 0 || r5 in n4.o) || (n4.o[r5] = t4, n4.D[r5] = true, true);
}, deleteProperty: function(n4, r5) {
  return z3(n4.t, r5) !== void 0 || r5 in n4.t ? (n4.D[r5] = false, E(n4), k3(n4)) : delete n4.D[r5], n4.o && delete n4.o[r5], true;
}, getOwnPropertyDescriptor: function(n4, r5) {
  var t4 = p2(n4), e3 = Reflect.getOwnPropertyDescriptor(t4, r5);
  return e3 ? { writable: true, configurable: n4.i !== 1 || r5 !== "length", enumerable: e3.enumerable, value: t4[r5] } : e3;
}, defineProperty: function() {
  n2(11);
}, getPrototypeOf: function(n4) {
  return Object.getPrototypeOf(n4.t);
}, setPrototypeOf: function() {
  n2(12);
} };
var on = {};
i3(en, function(n4, r5) {
  on[n4] = function() {
    return arguments[0] = arguments[0][0], r5.apply(this, arguments);
  };
}), on.deleteProperty = function(r5, t4) {
  return isNaN(parseInt(t4)) && n2(13), on.set.call(this, r5, t4, void 0);
}, on.set = function(r5, t4, e3) {
  return t4 !== "length" && isNaN(parseInt(t4)) && n2(14), en.set.call(this, r5[0], t4, e3, r5[0]);
};
var un = function() {
  function e3(r5) {
    var e4 = this;
    this.g = B2, this.F = true, this.produce = function(r6, i6, o5) {
      if (typeof r6 == "function" && typeof i6 != "function") {
        var u5 = i6;
        i6 = r6;
        var a5 = e4;
        return function(n4) {
          var r7 = this;
          n4 === void 0 && (n4 = u5);
          for (var t4 = arguments.length, e5 = Array(t4 > 1 ? t4 - 1 : 0), o6 = 1; o6 < t4; o6++)
            e5[o6 - 1] = arguments[o6];
          return a5.produce(n4, function(n5) {
            var t5;
            return (t5 = i6).call.apply(t5, [r7, n5].concat(e5));
          });
        };
      }
      var f5;
      if (typeof i6 != "function" && n2(6), o5 !== void 0 && typeof o5 != "function" && n2(7), t3(r6)) {
        var c5 = w3(e4), s5 = R(e4, r6, void 0), v5 = true;
        try {
          f5 = i6(s5), v5 = false;
        } finally {
          v5 ? O2(c5) : g3(c5);
        }
        return typeof Promise != "undefined" && f5 instanceof Promise ? f5.then(function(n4) {
          return j3(c5, o5), P2(n4, c5);
        }, function(n4) {
          throw O2(c5), n4;
        }) : (j3(c5, o5), P2(f5, c5));
      }
      if (!r6 || typeof r6 != "object") {
        if ((f5 = i6(r6)) === void 0 && (f5 = r6), f5 === H2 && (f5 = void 0), e4.F && d3(f5, true), o5) {
          var p5 = [], l5 = [];
          b3("Patches").M(r6, f5, p5, l5), o5(p5, l5);
        }
        return f5;
      }
      n2(21, r6);
    }, this.produceWithPatches = function(n4, r6) {
      if (typeof n4 == "function")
        return function(r7) {
          for (var t5 = arguments.length, i7 = Array(t5 > 1 ? t5 - 1 : 0), o6 = 1; o6 < t5; o6++)
            i7[o6 - 1] = arguments[o6];
          return e4.produceWithPatches(r7, function(r8) {
            return n4.apply(void 0, [r8].concat(i7));
          });
        };
      var t4, i6, o5 = e4.produce(n4, r6, function(n5, r7) {
        t4 = n5, i6 = r7;
      });
      return typeof Promise != "undefined" && o5 instanceof Promise ? o5.then(function(n5) {
        return [n5, t4, i6];
      }) : [o5, t4, i6];
    }, typeof (r5 == null ? void 0 : r5.useProxies) == "boolean" && this.setUseProxies(r5.useProxies), typeof (r5 == null ? void 0 : r5.autoFreeze) == "boolean" && this.setAutoFreeze(r5.autoFreeze);
  }
  var i5 = e3.prototype;
  return i5.createDraft = function(e4) {
    t3(e4) || n2(8), r3(e4) && (e4 = D2(e4));
    var i6 = w3(this), o5 = R(this, e4, void 0);
    return o5[Q].C = true, g3(i6), o5;
  }, i5.finishDraft = function(r5, t4) {
    var e4 = r5 && r5[Q];
    e4 && e4.C || n2(9), e4.I && n2(10);
    var i6 = e4.A;
    return j3(i6, t4), P2(void 0, i6);
  }, i5.setAutoFreeze = function(n4) {
    this.F = n4;
  }, i5.setUseProxies = function(r5) {
    r5 && !B2 && n2(20), this.g = r5;
  }, i5.applyPatches = function(n4, t4) {
    var e4;
    for (e4 = t4.length - 1; e4 >= 0; e4--) {
      var i6 = t4[e4];
      if (i6.path.length === 0 && i6.op === "replace") {
        n4 = i6.value;
        break;
      }
    }
    e4 > -1 && (t4 = t4.slice(e4 + 1));
    var o5 = b3("Patches").$;
    return r3(n4) ? o5(n4, t4) : this.produce(n4, function(n5) {
      return o5(n5, t4);
    });
  }, e3;
}();
var an = new un();
var fn = an.produce;
var cn = an.produceWithPatches.bind(an);
var sn = an.setAutoFreeze.bind(an);
var vn = an.setUseProxies.bind(an);
var pn = an.applyPatches.bind(an);
var ln = an.createDraft.bind(an);
var dn = an.finishDraft.bind(an);
var immer_esm_default = fn;

// src/time/datetime.ts
var import_range = __toESM(require_range());

// src/constants/style.ts
var DEFAULT_DAY_NAME_MARGIN_LEFT = "0";
var MONTH_EVENT_HEIGHT = 24;
var MONTH_EVENT_MARGIN_TOP = 2;
var MONTH_CELL_PADDING_TOP = 3;
var MONTH_CELL_BAR_HEIGHT = 27;
var MONTH_MORE_VIEW_PADDING = 5;
var MONTH_MORE_VIEW_MIN_WIDTH = 280;
var MONTH_MORE_VIEW_HEADER_HEIGHT = 44;
var MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM = 12;
var MONTH_MORE_VIEW_HEADER_PADDING_TOP = 12;
var MONTH_MORE_VIEW_HEADER_PADDING = "12px 17px 0";
var WEEK_DAY_NAME_HEIGHT = 42;
var WEEK_DAY_NAME_BORDER = 1;
var WEEK_EVENT_MARGIN_TOP = 2;
var DEFAULT_PANEL_HEIGHT = 72;
var DEFAULT_EVENT_COLORS = {
  color: "#000",
  backgroundColor: "#a1b56c",
  dragBackgroundColor: "#a1b56c",
  borderColor: "#000"
};

// src/utils/type.ts
var import_isUndefined = __toESM(require_isUndefined());
var import_isBoolean = __toESM(require_isBoolean());
var import_isNumber = __toESM(require_isNumber());
var import_isObject = __toESM(require_isObject());
var import_isString = __toESM(require_isString());
var import_isUndefined2 = __toESM(require_isUndefined());
function isNil(value) {
  return (0, import_isUndefined.default)(value) || value === null;
}
function isPresent(value) {
  return !isNil(value);
}
function isFunction(value) {
  return typeof value === "function";
}

// src/helpers/css.ts
var CSS_PREFIX = "toastui-calendar-";
function cls(...args) {
  const result = [];
  args.forEach((arg) => {
    if (!arg) {
      return;
    }
    if ((0, import_isString.default)(arg)) {
      result.push(arg);
    } else {
      Object.keys(arg).forEach((className2) => {
        if (arg[className2]) {
          result.push(className2);
        }
      });
    }
  });
  return result.map((str) => `${CSS_PREFIX}${str}`).join(" ");
}
function toPercent(value) {
  return `${value}%`;
}
function toPx(value) {
  return `${value}px`;
}
function getEventColors(uiModel, calendarColor) {
  const eventColors = uiModel.model.getColors();
  return Object.keys(DEFAULT_EVENT_COLORS).reduce((colors, _key) => {
    var _a, _b;
    const key = _key;
    colors[key] = (_b = (_a = eventColors[key]) != null ? _a : calendarColor[key]) != null ? _b : DEFAULT_EVENT_COLORS[key];
    return colors;
  }, {});
}

// ../../libs/date/src/localDate.js
var import_isString2 = __toESM(require_isString());
var rISO8601 = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.)?([0-9]+)?([+-]\d\d(?::?\d\d)?|\s*Z)?$/;
function throwNotSupported() {
  throw new Error("This operation is not supported.");
}
function getDateTime(dateString) {
  const match = rISO8601.exec(dateString);
  if (match) {
    const [, y4, M4, d5, h5, m4, s5, , ms, zoneInfo] = match;
    return {
      y: Number(y4),
      M: Number(M4) - 1,
      d: Number(d5),
      h: Number(h5),
      m: Number(m4),
      s: Number(s5),
      ms: Number(ms) || 0,
      zoneInfo
    };
  }
  return null;
}
function createFromDateString(dateString) {
  const info = getDateTime(dateString);
  if (info && !info.zoneInfo) {
    const { y: y4, M: M4, d: d5, h: h5, m: m4, s: s5, ms } = info;
    return new Date(y4, M4, d5, h5, m4, s5, ms);
  }
  return null;
}
var LocalDate = class {
  constructor(...args) {
    const [firstArg] = args;
    if (firstArg instanceof Date) {
      this.d = new Date(firstArg.getTime());
    } else if ((0, import_isString2.default)(firstArg) && args.length === 1) {
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
};
var getterMethods = [
  "getTime",
  "getTimezoneOffset",
  "getFullYear",
  "getMonth",
  "getDate",
  "getHours",
  "getMinutes",
  "getSeconds",
  "getMilliseconds",
  "getDay"
];
var setterMethods = [
  "setTime",
  "setFullYear",
  "setMonth",
  "setDate",
  "setHours",
  "setMinutes",
  "setSeconds",
  "setMilliseconds"
];
getterMethods.forEach((methodName) => {
  LocalDate.prototype[methodName] = function(...args) {
    return this.d[methodName](...args);
  };
});
setterMethods.forEach((methodName) => {
  LocalDate.prototype[methodName] = function(...args) {
    return this.d[methodName](...args);
  };
});

// ../../libs/date/src/utcDate.js
var UTCDate = class extends LocalDate {
  clone() {
    return new UTCDate(this.d);
  }
  getTimezoneOffset() {
    return 0;
  }
};
var getterProperties = [
  "FullYear",
  "Month",
  "Date",
  "Hours",
  "Minutes",
  "Seconds",
  "Milliseconds",
  "Day"
];
var setterProperties = [
  "FullYear",
  "Month",
  "Date",
  "Hours",
  "Minutes",
  "Seconds",
  "Milliseconds"
];
getterProperties.forEach((prop) => {
  const methodName = `get${prop}`;
  UTCDate.prototype[methodName] = function(...args) {
    return this.d[`getUTC${prop}`](...args);
  };
});
setterProperties.forEach((prop) => {
  const methodName = `set${prop}`;
  UTCDate.prototype[methodName] = function(...args) {
    return this.d[`setUTC${prop}`](...args);
  };
});

// src/constants/error.ts
var INVALID_DATETIME_FORMAT = "Invalid DateTime Format";
var INVALID_TIMEZONE_NAME = "Invalid IANA Timezone Name";
var INVALID_VIEW_TYPE = "Invalid View Type";

// src/constants/message.ts
var MESSAGE_PREFIX = "@toast-ui/calendar: ";

// src/utils/error.ts
var InvalidTimezoneNameError = class extends Error {
  constructor(timezoneName) {
    super(`${MESSAGE_PREFIX}${INVALID_TIMEZONE_NAME} - ${timezoneName}`);
    this.name = "InvalidTimezoneNameError";
  }
};
var InvalidDateTimeFormatError = class extends Error {
  constructor(dateTimeString) {
    super(`${MESSAGE_PREFIX}${INVALID_DATETIME_FORMAT} - ${dateTimeString}`);
    this.name = "InvalidDateTimeFormatError";
  }
};
var InvalidViewTypeError = class extends Error {
  constructor(viewType) {
    super(`${MESSAGE_PREFIX}${INVALID_VIEW_TYPE} - ${viewType}`);
    this.name = "InvalidViewTypeError";
  }
};

// src/utils/logger.ts
var logger = {
  error: (firstArg, ...restArgs) => {
    console.error(`${MESSAGE_PREFIX}${firstArg}`, ...restArgs);
  },
  warn: (firstArg, ...restArgs) => {
    console.warn(`${MESSAGE_PREFIX}${firstArg}`, ...restArgs);
  }
};

// src/time/timezone.ts
var Constructor = LocalDate;
function date(...args) {
  return new Constructor(...args);
}
function getLocalTimezoneOffset() {
  return -new Date().getTimezoneOffset();
}
function calculateTimezoneOffset(timezoneName, targetDate = new TZDate()) {
  if (!isIntlDateTimeFormatSupported()) {
    logger.warn("Intl.DateTimeFormat is not fully supported. So It will return the local timezone offset only.\nYou can use a polyfill to fix this issue.");
    return -targetDate.getTimezoneOffset();
  }
  validateIANATimezoneName(timezoneName);
  const token = tokenizeTZDate(targetDate, timezoneName);
  const utcDate = tokenToUtcDate(token);
  return Math.round((utcDate.getTime() - targetDate.getTime()) / 60 / 1e3);
}
var dtfCache = {};
var timezoneNameValidationCache = {};
function isIntlDateTimeFormatSupported() {
  var _a, _b, _c;
  return isFunction((_c = (_b = (_a = window == null ? void 0 : window.Intl) == null ? void 0 : _a.DateTimeFormat) == null ? void 0 : _b.prototype) == null ? void 0 : _c.formatToParts);
}
function validateIANATimezoneName(timezoneName) {
  if (timezoneNameValidationCache[timezoneName]) {
    return true;
  }
  try {
    Intl.DateTimeFormat("en-US", { timeZone: timezoneName });
    timezoneNameValidationCache[timezoneName] = true;
    return true;
  } catch (e3) {
    throw new InvalidTimezoneNameError(timezoneName);
  }
}
function getDateTimeFormat(timezoneName) {
  if (dtfCache[timezoneName]) {
    return dtfCache[timezoneName];
  }
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: timezoneName,
    hourCycle: "h23",
    hour12: false,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
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

// src/time/date.ts
function getTZOffsetMSDifference(offset) {
  return (getLocalTimezoneOffset() - offset) * MS_PER_MINUTES;
}
var TZDate = class {
  constructor(...args) {
    this.tzOffset = null;
    if (args[0] instanceof TZDate) {
      this.d = date(args[0].getTime());
    } else {
      this.d = date(...args);
    }
  }
  toString() {
    return this.d.toString();
  }
  addFullYear(y4) {
    this.setFullYear(this.getFullYear() + y4);
    return this;
  }
  addMonth(m4) {
    this.setMonth(this.getMonth() + m4);
    return this;
  }
  addDate(d5) {
    this.setDate(this.getDate() + d5);
    return this;
  }
  addHours(h5) {
    this.setHours(this.getHours() + h5);
    return this;
  }
  addMinutes(M4) {
    this.setMinutes(this.getMinutes() + M4);
    return this;
  }
  addSeconds(s5) {
    this.setSeconds(this.getSeconds() + s5);
    return this;
  }
  addMilliseconds(ms) {
    this.setMilliseconds(this.getMilliseconds() + ms);
    return this;
  }
  setWithRaw(y4, m4, d5, h5, M4, s5, ms) {
    this.setFullYear(y4, m4, d5);
    this.setHours(h5, M4, s5, ms);
    return this;
  }
  toDate() {
    return this.d.toDate();
  }
  valueOf() {
    return this.getTime();
  }
  getTimezoneOffset() {
    var _a;
    return (_a = this.tzOffset) != null ? _a : this.d.getTimezoneOffset();
  }
  getTime() {
    return this.d.getTime();
  }
  getFullYear() {
    return this.d.getFullYear();
  }
  getMonth() {
    return this.d.getMonth();
  }
  getDate() {
    return this.d.getDate();
  }
  getHours() {
    return this.d.getHours();
  }
  getMinutes() {
    return this.d.getMinutes();
  }
  getSeconds() {
    return this.d.getSeconds();
  }
  getMilliseconds() {
    return this.d.getMilliseconds();
  }
  getDay() {
    return this.d.getDay();
  }
  setTime(t4) {
    return this.d.setTime(t4);
  }
  setFullYear(y4, m4 = this.getMonth(), d5 = this.getDate()) {
    return this.d.setFullYear(y4, m4, d5);
  }
  setMonth(m4, d5 = this.getDate()) {
    return this.d.setMonth(m4, d5);
  }
  setDate(d5) {
    return this.d.setDate(d5);
  }
  setHours(h5, M4 = this.getMinutes(), s5 = this.getSeconds(), ms = this.getMilliseconds()) {
    return this.d.setHours(h5, M4, s5, ms);
  }
  setMinutes(M4, s5 = this.getSeconds(), ms = this.getMilliseconds()) {
    return this.d.setMinutes(M4, s5, ms);
  }
  setSeconds(s5, ms = this.getMilliseconds()) {
    return this.d.setSeconds(s5, ms);
  }
  setMilliseconds(ms) {
    return this.d.setMilliseconds(ms);
  }
  tz(tzValue) {
    if (tzValue === "Local") {
      return new TZDate(this.getTime());
    }
    const tzOffset = (0, import_isString.default)(tzValue) ? calculateTimezoneOffset(tzValue, this) : tzValue;
    const newTZDate = new TZDate(this.getTime() - getTZOffsetMSDifference(tzOffset));
    newTZDate.tzOffset = tzOffset;
    return newTZDate;
  }
  local(tzValue) {
    if (isPresent(tzValue)) {
      const tzOffset = (0, import_isString.default)(tzValue) ? calculateTimezoneOffset(tzValue, this) : tzValue;
      return new TZDate(this.getTime() + getTZOffsetMSDifference(tzOffset));
    }
    return new TZDate(this.getTime() + (isPresent(this.tzOffset) ? getTZOffsetMSDifference(this.tzOffset) : 0));
  }
};

// src/utils/object.ts
function pick(obj, ...propNames) {
  return propNames.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
function clone(source) {
  return Object.assign(Object.create(Object.getPrototypeOf(source)), source);
}
function mergeObject(target, source = {}) {
  if (!(0, import_isObject.default)(source)) {
    return target;
  }
  Object.keys(source).forEach((k4) => {
    const targetKey = k4;
    const sourceKey = k4;
    if (!Array.isArray(source[sourceKey]) && (0, import_isObject.default)(target[targetKey]) && (0, import_isObject.default)(source[sourceKey]) && !(source[sourceKey] instanceof TZDate)) {
      target[targetKey] = mergeObject(target[targetKey], source[sourceKey]);
    } else {
      target[targetKey] = source[sourceKey];
    }
  });
  return target;
}

// src/model/eventUIModel.ts
var eventUIPropsKey = [
  "top",
  "left",
  "width",
  "height",
  "hasCollide",
  "extraSpace",
  "hidden",
  "exceedLeft",
  "exceedRight",
  "croppedStart",
  "croppedEnd",
  "goingDurationHeight",
  "modelDurationHeight",
  "comingDurationHeight"
];
var EventUIModel = class {
  constructor(event) {
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.hasCollide = false;
    this.extraSpace = 0;
    this.hidden = false;
    this.exceedLeft = false;
    this.exceedRight = false;
    this.croppedStart = false;
    this.croppedEnd = false;
    this.goingDurationHeight = 0;
    this.modelDurationHeight = 100;
    this.comingDurationHeight = 0;
    this.model = event;
  }
  getUIProps() {
    return pick(this, ...eventUIPropsKey);
  }
  setUIProps(props) {
    Object.assign(this, props);
  }
  getStarts() {
    if (this.renderStarts) {
      return this.renderStarts;
    }
    return this.model.getStarts();
  }
  getEnds() {
    if (this.renderEnds) {
      return this.renderEnds;
    }
    return this.model.getEnds();
  }
  cid() {
    return this.model.cid();
  }
  valueOf() {
    return this.model;
  }
  duration() {
    return this.model.duration();
  }
  collidesWith(uiModel, usingTravelTime = true) {
    return collidesWith({
      start: this.getStarts().getTime(),
      end: this.getEnds().getTime(),
      targetStart: uiModel.getStarts().getTime(),
      targetEnd: uiModel.getEnds().getTime(),
      goingDuration: this.model.goingDuration,
      comingDuration: this.model.comingDuration,
      targetGoingDuration: uiModel.valueOf().goingDuration,
      targetComingDuration: uiModel.valueOf().comingDuration,
      usingTravelTime
    });
  }
  clone() {
    const eventUIModelProps = this.getUIProps();
    const clonedEventUIModel = new EventUIModel(this.model);
    clonedEventUIModel.setUIProps(eventUIModelProps);
    if (this.renderStarts) {
      clonedEventUIModel.renderStarts = new TZDate(this.renderStarts);
    }
    if (this.renderEnds) {
      clonedEventUIModel.renderEnds = new TZDate(this.renderEnds);
    }
    return clonedEventUIModel;
  }
};

// src/utils/array.ts
function compareBooleansASC(a5, b4) {
  if (a5 !== b4) {
    return a5 ? -1 : 1;
  }
  return 0;
}
function compareNumbersASC(a5, b4) {
  return Number(a5) - Number(b4);
}
function compareStringsASC(_a, _b) {
  const a5 = String(_a);
  const b4 = String(_b);
  if (a5 === b4) {
    return 0;
  }
  return a5 > b4 ? 1 : -1;
}
function compareEventsASC(a5, b4) {
  const modelA = a5 instanceof EventUIModel ? a5.model : a5;
  const modelB = b4 instanceof EventUIModel ? b4.model : b4;
  const alldayCompare = compareBooleansASC(modelA.isAllday || modelA.hasMultiDates, modelB.isAllday || modelB.hasMultiDates);
  if (alldayCompare) {
    return alldayCompare;
  }
  const startsCompare = compare(a5.getStarts(), b4.getStarts());
  if (startsCompare) {
    return startsCompare;
  }
  const durationA = a5.duration();
  const durationB = b4.duration();
  if (durationA < durationB) {
    return 1;
  }
  if (durationA > durationB) {
    return -1;
  }
  return modelA.cid() - modelB.cid();
}
function bsearch(arr, search, fn2, compareFn) {
  let minIndex = 0;
  let maxIndex = arr.length - 1;
  let currentIndex;
  let value;
  let comp;
  compareFn = compareFn || compareStringsASC;
  while (minIndex <= maxIndex) {
    currentIndex = (minIndex + maxIndex) / 2 | 0;
    value = fn2 ? fn2(arr[currentIndex]) : arr[currentIndex];
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
var array_default = {
  bsearch,
  compare: {
    event: {
      asc: compareEventsASC
    },
    num: {
      asc: compareNumbersASC
    }
  }
};
function first(array) {
  return array[0];
}
function last(array) {
  return array[array.length - 1];
}
function findLastIndex(array, predicate) {
  for (let i5 = array.length - 1; i5 >= 0; i5 -= 1) {
    if (predicate(array[i5])) {
      return i5;
    }
  }
  return -1;
}
function fill(length, value) {
  if (length > 0) {
    return Array.from({ length }, () => {
      if (Array.isArray(value)) {
        return value.slice();
      }
      return value;
    });
  }
  return [];
}

// src/time/datetime.ts
var WEEK_DAYS = 7;
var dateFormatRx = /^(\d{4}[-|/]*\d{2}[-|/]*\d{2})\s?(\d{2}:\d{2}:\d{2})?$/;
var memo = {
  millisecondsTo: {},
  millisecondsFrom: {}
};
var convByTimeUnit = [24, 60, 60, 1e3];
function leadingZero(number, length) {
  let zero = "";
  let i5 = 0;
  if (String(number).length > length) {
    return String(number);
  }
  for (; i5 < length - 1; i5 += 1) {
    zero += "0";
  }
  return (zero + number).slice(length * -1);
}
function getHourForMeridiem(date2) {
  let hour = date2.getHours();
  if (hour === 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour = hour % 12;
  }
  return hour;
}
var tokenFunc = {
  YYYYMMDD(date2) {
    return [
      date2.getFullYear(),
      leadingZero(date2.getMonth() + 1, 2),
      leadingZero(date2.getDate(), 2)
    ].join("");
  },
  YYYY(date2) {
    return String(date2.getFullYear());
  },
  MM(date2) {
    return leadingZero(date2.getMonth() + 1, 2);
  },
  DD(date2) {
    return leadingZero(date2.getDate(), 2);
  },
  "HH:mm": function(date2) {
    const hour = date2.getHours();
    const minutes = date2.getMinutes();
    return `${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },
  "hh:mm": function(date2) {
    const hour = getHourForMeridiem(date2);
    const minutes = date2.getMinutes();
    return `${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },
  hh(date2) {
    const hour = getHourForMeridiem(date2);
    return String(hour);
  },
  tt(date2) {
    const hour = date2.getHours();
    return hour < 12 ? "am" : "pm";
  }
};
var MS_PER_DAY = 864e5;
var MS_PER_MINUTES = 6e4;
var MS_EVENT_MIN_DURATION = 20 * MS_PER_MINUTES;
var MS_PER_THIRTY_MINUTES = 30 * 60 * 1e3;
function toFormat(date2, strFormat) {
  let result = strFormat;
  Object.entries(tokenFunc).forEach(([token, converter]) => {
    result = result.replace(token, converter(date2));
  });
  return result;
}
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
function millisecondsFrom(type, value) {
  const cache = memo.millisecondsFrom;
  const key = type + value;
  if (cache[key]) {
    return cache[key];
  }
  const result = convMilliseconds(type, value, (m4, v5) => m4 * v5);
  if (!result) {
    return 0;
  }
  cache[key] = result;
  return cache[key];
}
function toStartOfDay(date2) {
  const d5 = date2 ? new TZDate(date2) : new TZDate();
  d5.setHours(0, 0, 0, 0);
  return d5;
}
function makeDateRange(startDate, endDate, step) {
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  const date2 = new TZDate(startDate);
  const result = [];
  let cursor = startTime;
  while (cursor <= endTime && endTime >= date2.getTime()) {
    result.push(new TZDate(date2));
    cursor = cursor + step;
    date2.addMilliseconds(step);
  }
  return result;
}
function clone2(date2) {
  return new TZDate(date2);
}
function compare(d1, d22) {
  const _d1 = d1.getTime();
  const _d2 = d22.getTime();
  if (_d1 < _d2) {
    return -1;
  }
  if (_d1 > _d2) {
    return 1;
  }
  return 0;
}
function isSameYear(d1, d22) {
  return d1.getFullYear() === d22.getFullYear();
}
function isSameMonth(d1, d22) {
  return isSameYear(d1, d22) && d1.getMonth() === d22.getMonth();
}
function isSameDate(d1, d22) {
  return isSameMonth(d1, d22) && d1.getDate() === d22.getDate();
}
function max(d1, d22) {
  return compare(d1, d22) === 1 ? d1 : d22;
}
function min(d1, d22) {
  return compare(d1, d22) === -1 ? d1 : d22;
}
function parse(str, fixMonth = -1) {
  const matches = str.match(dateFormatRx);
  let separator;
  let ymd;
  let hms;
  if (!matches) {
    throw new InvalidDateTimeFormatError(str);
  }
  if (str.length > 8) {
    separator = ~str.indexOf("/") ? "/" : "-";
    const result = matches.splice(1);
    ymd = result[0].split(separator);
    hms = result[1] ? result[1].split(":") : [0, 0, 0];
  } else {
    const [result] = matches;
    ymd = [result.substr(0, 4), result.substr(4, 2), result.substr(6, 2)];
    hms = [0, 0, 0];
  }
  return new TZDate().setWithRaw(Number(ymd[0]), Number(ymd[1]) + fixMonth, Number(ymd[2]), Number(hms[0]), Number(hms[1]), Number(hms[2]), 0);
}
function toEndOfDay(date2) {
  const d5 = date2 ? new TZDate(date2) : new TZDate();
  d5.setHours(23, 59, 59, 999);
  return d5;
}
function isWeekend(day) {
  return day === 0 /* SUN */ || day === 6 /* SAT */;
}
function isSunday(day) {
  return day === 0 /* SUN */;
}
function isSaturday(day) {
  return day === 6 /* SAT */;
}
function toStartOfMonth(date2) {
  const startDate = new TZDate(date2);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);
  return startDate;
}
function toEndOfMonth(date2) {
  const endDate = toStartOfMonth(date2);
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(endDate.getDate() - 1);
  endDate.setHours(23, 59, 59, 999);
  return endDate;
}
function getRowStyleInfo(days, narrowWeekend, startDayOfWeek, workweek) {
  const limitDaysToApplyNarrowWeekend = 5;
  const uniformWidth = 100 / days;
  const wideWidth = days > limitDaysToApplyNarrowWeekend ? 100 / (days - 1) : uniformWidth;
  let accumulatedWidth = 0;
  const dates = (0, import_range.default)(startDayOfWeek, 7).concat((0, import_range.default)(days)).slice(0, 7);
  narrowWeekend = workweek ? false : narrowWeekend;
  const rowStyleInfo = dates.map((day) => {
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
  const { length } = rowStyleInfo;
  const cellWidthMap = fill(length, fill(length, 0));
  rowStyleInfo.forEach(({ width }, index) => {
    for (let i5 = 0; i5 <= index; i5 += 1) {
      for (let j5 = index; j5 < length; j5 += 1) {
        cellWidthMap[i5][j5] += width;
      }
    }
  });
  cellWidthMap[0][length - 1] = 100;
  return {
    rowStyleInfo,
    cellWidthMap: cellWidthMap.map((widthList) => widthList.map(toPercent))
  };
}
function addMilliseconds(d5, step) {
  const date2 = clone2(d5);
  date2.setMilliseconds(d5.getMilliseconds() + step);
  return date2;
}
function addMinutes(d5, step) {
  const date2 = clone2(d5);
  date2.setMinutes(d5.getMinutes() + step);
  return date2;
}
function setTimeStrToDate(d5, timeStr) {
  const date2 = clone2(d5);
  date2.setHours(...timeStr.split(":").map(Number));
  return date2;
}
function addDate(d5, step) {
  const date2 = clone2(d5);
  date2.setDate(d5.getDate() + step);
  return date2;
}
function subtractDate(d5, steps) {
  const date2 = clone2(d5);
  date2.setDate(d5.getDate() - steps);
  return date2;
}
function addMonths(d5, step = 1) {
  const date2 = clone2(d5);
  if (step !== 0) {
    const dayOfMonth = date2.getDate();
    const endOfDesiredMonth = new TZDate(date2.getTime());
    endOfDesiredMonth.setMonth(date2.getMonth() + step + 1, 0);
    const daysInMonth = endOfDesiredMonth.getDate();
    if (dayOfMonth >= daysInMonth) {
      return endOfDesiredMonth;
    }
    date2.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
  }
  return date2;
}
function getDateDifference(d1, d22) {
  const _d1 = new TZDate(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const _d2 = new TZDate(d22.getFullYear(), d22.getMonth(), d22.getDate()).getTime();
  return Math.round((_d1 - _d2) / MS_PER_DAY);
}

// src/helpers/events.ts
function hasCollision(start, end, targetStart, targetEnd) {
  return targetStart > start && targetStart < end || targetEnd > start && targetEnd < end || targetStart <= start && targetEnd >= end;
}
function collidesWith({
  start,
  end,
  targetStart,
  targetEnd,
  goingDuration,
  comingDuration,
  targetGoingDuration,
  targetComingDuration,
  usingTravelTime
}) {
  if (Math.abs(end - start) < MS_EVENT_MIN_DURATION) {
    end += MS_EVENT_MIN_DURATION;
  }
  if (Math.abs(end - start) < MS_EVENT_MIN_DURATION) {
    end += MS_EVENT_MIN_DURATION;
  }
  if (usingTravelTime) {
    start -= millisecondsFrom("minute", goingDuration);
    end += millisecondsFrom("minute", comingDuration);
    targetStart -= millisecondsFrom("minute", targetGoingDuration);
    targetEnd += millisecondsFrom("minute", targetComingDuration);
  }
  return hasCollision(start, end, targetStart, targetEnd);
}
function isSameEvent(event, eventId, calendarId) {
  return event.id === eventId && event.calendarId === calendarId;
}

// src/utils/stamp.ts
function idGenerator() {
  let id = 0;
  return {
    next() {
      id += 1;
      return id;
    }
  };
}
var getId = function() {
  const generator = idGenerator();
  return () => generator.next();
}();
function stamp(obj) {
  if (!obj.__fe_id) {
    obj.__fe_id = getId();
  }
  return obj.__fe_id;
}

// src/model/eventModel.ts
var EventModel = class {
  constructor(event = {}) {
    this.id = "";
    this.calendarId = "";
    this.title = "";
    this.body = "";
    this.isAllday = false;
    this.start = new TZDate();
    this.end = new TZDate();
    this.goingDuration = 0;
    this.comingDuration = 0;
    this.location = "";
    this.attendees = [];
    this.category = "time";
    this.dueDateClass = "";
    this.recurrenceRule = "";
    this.state = "Busy";
    this.isVisible = true;
    this.isPending = false;
    this.isFocused = false;
    this.isReadOnly = false;
    this.isPrivate = false;
    this.customStyle = {};
    this.raw = null;
    this.hasMultiDates = false;
    stamp(this);
    this.init(event);
  }
  init({
    id = "",
    calendarId = "",
    title = "",
    body = "",
    isAllday: isAllday2 = false,
    start = new TZDate(),
    end = new TZDate(),
    goingDuration = 0,
    comingDuration = 0,
    location: location2 = "",
    attendees = [],
    category = "time",
    dueDateClass = "",
    recurrenceRule = "",
    state = "Busy",
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
  } = {}) {
    this.id = id;
    this.calendarId = calendarId;
    this.title = title;
    this.body = body;
    this.isAllday = category === "allday" ? true : isAllday2;
    this.goingDuration = goingDuration;
    this.comingDuration = comingDuration;
    this.location = location2;
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
    if (category === "milestone" || category === "task") {
      this.start = new TZDate(this.end);
    }
  }
  setAlldayPeriod(start, end) {
    let startedAt;
    let endedAt;
    if ((0, import_isString.default)(start)) {
      startedAt = parse(start.substring(0, 10));
    } else {
      startedAt = new TZDate(start || Date.now());
    }
    if ((0, import_isString.default)(end)) {
      endedAt = parse(end.substring(0, 10));
    } else {
      endedAt = new TZDate(end || this.start);
    }
    this.start = startedAt;
    this.start.setHours(0, 0, 0);
    this.end = endedAt || new TZDate(this.start);
    this.end.setHours(23, 59, 59);
  }
  setTimePeriod(start, end) {
    this.start = new TZDate(start || Date.now());
    this.end = new TZDate(end || this.start);
    if (!end) {
      this.end.setMinutes(this.end.getMinutes() + 30);
    }
    this.hasMultiDates = this.end.getTime() - this.start.getTime() > MS_PER_DAY;
  }
  getStarts() {
    return this.start;
  }
  getEnds() {
    return this.end;
  }
  cid() {
    return stamp(this);
  }
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
  collidesWith(event, usingTravelTime = true) {
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
      usingTravelTime
    });
  }
  toEventObject() {
    return {
      id: this.id,
      calendarId: this.calendarId,
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
};
EventModel.schema = {
  required: ["title"],
  dateRange: ["start", "end"]
};
function isTimeEvent({ model }) {
  const { category, isAllday: isAllday2, hasMultiDates } = model;
  return category === "time" && !isAllday2 && !hasMultiDates;
}

// src/utils/collection.ts
var Collection = class {
  constructor(getItemIDFn) {
    this.internalMap = /* @__PURE__ */ new Map();
    if (isFunction(getItemIDFn)) {
      this.getItemID = getItemIDFn;
    }
  }
  static and(...filterFns) {
    const { length } = filterFns;
    return (item) => {
      for (let i5 = 0; i5 < length; i5 += 1) {
        if (!filterFns[i5].call(null, item)) {
          return false;
        }
      }
      return true;
    };
  }
  static or(...filterFns) {
    const { length } = filterFns;
    if (!length) {
      return () => false;
    }
    return (item) => {
      let result = filterFns[0].call(null, item);
      for (let i5 = 1; i5 < length; i5 += 1) {
        result = result || filterFns[i5].call(null, item);
      }
      return result;
    };
  }
  getItemID(item) {
    var _a;
    return (_a = item == null ? void 0 : item._id) != null ? _a : "";
  }
  getFirstItem() {
    const iterator = this.internalMap.values();
    return iterator.next().value;
  }
  add(...items) {
    items.forEach((item) => {
      const id = this.getItemID(item);
      this.internalMap.set(id, item);
    });
    return this;
  }
  remove(...items) {
    const removeResult = [];
    items.forEach((item) => {
      const id = (0, import_isString.default)(item) || (0, import_isNumber.default)(item) ? item : this.getItemID(item);
      if (!this.internalMap.has(id)) {
        return;
      }
      removeResult.push(this.internalMap.get(id));
      this.internalMap["delete"](id);
    });
    return removeResult.length === 1 ? removeResult[0] : removeResult;
  }
  has(item) {
    const id = (0, import_isString.default)(item) || (0, import_isNumber.default)(item) ? item : this.getItemID(item);
    return this.internalMap.has(id);
  }
  get(item) {
    var _a;
    const id = (0, import_isString.default)(item) || (0, import_isNumber.default)(item) ? item : this.getItemID(item);
    return (_a = this.internalMap.get(id)) != null ? _a : null;
  }
  doWhenHas(id, callback) {
    const item = this.internalMap.get(id);
    if (isNil(item)) {
      return;
    }
    callback(item);
  }
  filter(filterFn) {
    const result = new Collection();
    if (this.hasOwnProperty("getItemID")) {
      result.getItemID = this.getItemID;
    }
    this.internalMap.forEach((item) => {
      if (filterFn(item) === true) {
        result.add(item);
      }
    });
    return result;
  }
  groupBy(groupByFn) {
    const result = {};
    this.internalMap.forEach((item) => {
      var _a;
      let key = isFunction(groupByFn) ? groupByFn(item) : item[groupByFn];
      if (isFunction(key)) {
        key = key.call(item);
      }
      (_a = result[key]) != null ? _a : result[key] = new Collection(this.getItemID);
      result[key].add(item);
    });
    return result;
  }
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
  sort(compareFn) {
    return this.toArray().sort(compareFn);
  }
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
  clear() {
    this.internalMap.clear();
  }
  toArray() {
    return Array.from(this.internalMap.values());
  }
  get size() {
    return this.internalMap.size;
  }
};

// src/controller/base.ts
function createEventCollection(...initItems) {
  const collection = new Collection((event) => event.cid());
  if (initItems.length) {
    collection.add(...initItems);
  }
  return collection;
}
function getDateRange(start, end) {
  return makeDateRange(toStartOfDay(start), toEndOfDay(end), MS_PER_DAY);
}
function isAllday(event) {
  return event.isAllday || event.category === "time" && Number(event.end) - Number(event.start) > MS_PER_DAY;
}
function filterByCategory(uiModel) {
  const { model } = uiModel;
  if (isAllday(model)) {
    return "allday";
  }
  return model.category;
}
function addToMatrix(idsOfDay, event) {
  const containDates = getDateRange(event.getStarts(), event.getEnds());
  containDates.forEach((date2) => {
    const ymd = toFormat(date2, "YYYYMMDD");
    const matrix = idsOfDay[ymd] = idsOfDay[ymd] || [];
    matrix.push(event.cid());
  });
}
function removeFromMatrix(idsOfDay, event) {
  const modelID = event.cid();
  Object.values(idsOfDay).forEach((ids) => {
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
function createEvents(calendarData, events = []) {
  return events.map((eventData) => createEvent(calendarData, eventData));
}
function updateEvent(calendarData, eventId, calendarId, eventData) {
  const { idsOfDay } = calendarData;
  const event = calendarData.events.find((item) => isSameEvent(item, eventId, calendarId));
  if (!event) {
    return false;
  }
  event.init(__spreadValues(__spreadValues({}, event), eventData));
  removeFromMatrix(idsOfDay, event);
  addToMatrix(idsOfDay, event);
  return true;
}
function deleteEvent(calendarData, event) {
  removeFromMatrix(calendarData.idsOfDay, event);
  calendarData.events.remove(event);
  return event;
}
function clearEvents(calendarData) {
  calendarData.idsOfDay = {};
  calendarData.events.clear();
}

// src/slices/calendar.ts
function createCalendarSlice(calendars = []) {
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
    createEvents: (events) => set(immer_esm_default((state) => {
      createEvents(state.calendar, events);
    })),
    updateEvent: ({ event, eventData }) => set(immer_esm_default((state) => {
      updateEvent(state.calendar, event.id, event.calendarId, eventData);
    })),
    deleteEvent: (event) => set(immer_esm_default((state) => {
      deleteEvent(state.calendar, event);
    })),
    clearEvents: () => set(immer_esm_default((state) => {
      clearEvents(state.calendar);
    })),
    setCalendars: (calendars) => set(immer_esm_default((state) => {
      state.calendar.calendars = calendars;
    })),
    setCalendarColor: (calendarId, colorOptions) => set(immer_esm_default((state) => {
      const calendars = state.calendar.calendars.map((calendar) => {
        if (calendar.id === calendarId) {
          return __spreadValues(__spreadValues({}, calendar), colorOptions);
        }
        return calendar;
      });
      const events = state.calendar.events.toArray().map((event) => {
        var _a, _b, _c, _d;
        if (event.calendarId === calendarId) {
          event.color = (_a = colorOptions.color) != null ? _a : event.color;
          event.backgroundColor = (_b = colorOptions.backgroundColor) != null ? _b : event.backgroundColor;
          event.borderColor = (_c = colorOptions.borderColor) != null ? _c : event.borderColor;
          event.dragBackgroundColor = (_d = colorOptions.dragBackgroundColor) != null ? _d : event.dragBackgroundColor;
        }
        return event;
      });
      const collection = createEventCollection(...events);
      state.calendar.calendars = calendars;
      state.calendar.events = collection;
    })),
    setCalendarVisibility: (calendarIds, isVisible) => set(immer_esm_default((state) => {
      const events = state.calendar.events.toArray();
      state.calendar.events = createEventCollection(...events.map((event) => {
        if (calendarIds.includes(event.calendarId)) {
          event.isVisible = isVisible;
        }
        return event;
      }));
    }))
  };
}

// src/slices/dnd.ts
function createDndSlice() {
  return {
    dnd: {
      draggingItemType: null,
      draggingState: 0 /* IDLE */,
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
    initDrag: (initState) => {
      set(immer_esm_default((state) => {
        state.dnd = __spreadProps(__spreadValues(__spreadValues({}, state.dnd), initState), {
          draggingState: 1 /* INIT */
        });
      }));
    },
    setDragging: (newState) => {
      set(immer_esm_default((state) => {
        state.dnd = __spreadProps(__spreadValues(__spreadValues({}, state.dnd), newState), {
          draggingState: 2 /* DRAGGING */
        });
      }));
    },
    cancelDrag: () => {
      set(immer_esm_default((state) => {
        state.dnd = createDndSlice().dnd;
        state.dnd.draggingState = 3 /* CANCELED */;
      }));
    },
    reset: () => {
      set(immer_esm_default((state) => {
        state.dnd = createDndSlice().dnd;
      }));
    },
    setDraggingEventUIModel: (eventUIModel) => {
      set(immer_esm_default((state) => {
        var _a;
        state.dnd.draggingEventUIModel = (_a = eventUIModel == null ? void 0 : eventUIModel.clone()) != null ? _a : null;
      }));
    }
  };
}

// src/slices/gridSelection.ts
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
      set(immer_esm_default((state) => {
        state.gridSelection[type] = gridSelection;
      }));
    },
    addGridSelection: (type, gridSelection) => {
      set(immer_esm_default((state) => {
        if (type === "dayGridMonth" && gridSelection) {
          state.gridSelection.accumulated[type] = [
            ...state.gridSelection.accumulated[type],
            gridSelection
          ];
          state.gridSelection.dayGridMonth = null;
        }
      }));
    },
    clearAll: () => set(immer_esm_default((state) => {
      state.gridSelection = createGridSelectionSlice().gridSelection;
    }))
  };
}

// src/constants/layout.ts
var DEFAULT_RESIZER_LENGTH = 3;

// src/slices/layout.ts
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
      dayGridRows: {}
    }
  };
}
function createWeekViewLayoutDispatchers(set) {
  return {
    setLastPanelType: (type) => {
      set(immer_esm_default((state) => {
        state.weekViewLayout.lastPanelType = type;
        if (type) {
          state.weekViewLayout.dayGridRows[type].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, type, state.layout);
        }
      }));
    },
    updateLayoutHeight: (height) => set(immer_esm_default((state) => {
      const { lastPanelType } = state.weekViewLayout;
      state.layout = height;
      if (lastPanelType) {
        state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, lastPanelType, height);
      }
    })),
    updateDayGridRowHeight: ({ rowName, height }) => set(immer_esm_default((state) => {
      const { lastPanelType } = state.weekViewLayout;
      state.weekViewLayout.dayGridRows[rowName] = { height };
      if (lastPanelType) {
        state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, lastPanelType, state.layout);
      }
    })),
    updateDayGridRowHeightByDiff: ({ rowName, diff }) => set(immer_esm_default((state) => {
      var _a, _b, _c;
      const { lastPanelType } = state.weekViewLayout;
      const height = (_c = (_b = (_a = state.weekViewLayout.dayGridRows) == null ? void 0 : _a[rowName]) == null ? void 0 : _b.height) != null ? _c : DEFAULT_PANEL_HEIGHT;
      state.weekViewLayout.dayGridRows[rowName] = { height: height + diff };
      if (lastPanelType) {
        state.weekViewLayout.dayGridRows[lastPanelType].height = getRestPanelHeight(state.weekViewLayout.dayGridRows, lastPanelType, state.layout);
      }
    }))
  };
}

// src/utils/string.ts
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// src/helpers/dayName.ts
var DEFAULT_DAY_NAMES = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
var getDayName = (dayIndex) => {
  return DEFAULT_DAY_NAMES[dayIndex];
};
function getDayNames(days, weekDayNamesOption) {
  return days.map((day) => {
    const dayIndex = day.getDay();
    const dayName = weekDayNamesOption.length > 0 ? weekDayNamesOption[dayIndex] : capitalize(getDayName(dayIndex));
    return {
      date: day.getDate(),
      day: day.getDay(),
      dayName,
      isToday: true,
      renderDate: "date",
      dateInstance: day
    };
  });
}

// src/slices/options.ts
function initializeWeekOptions(weekOptions = {}) {
  return __spreadValues({
    startDayOfWeek: 0 /* SUN */,
    dayNames: [],
    narrowWeekend: false,
    workweek: false,
    showNowIndicator: true,
    showTimezoneCollapseButton: false,
    timezonesCollapsed: false,
    hourStart: 0,
    hourEnd: 24,
    eventView: true,
    taskView: true
  }, weekOptions);
}
function initializeTimezoneOptions(timezoneOptions = {}) {
  return __spreadValues({
    zones: []
  }, timezoneOptions);
}
function initializeMonthOptions(monthOptions = {}) {
  const month = __spreadValues({
    dayNames: [],
    visibleWeeksCount: 0,
    workweek: false,
    narrowWeekend: false,
    startDayOfWeek: 0 /* SUN */,
    isAlways6Weeks: true,
    visibleEventCount: 6
  }, monthOptions);
  if (month.dayNames.length === 0) {
    month.dayNames = DEFAULT_DAY_NAMES.slice();
  }
  return month;
}
function initializeGridSelectionOptions(options) {
  if ((0, import_isBoolean.default)(options)) {
    return {
      enableDblClick: options,
      enableClick: options
    };
  }
  return __spreadValues({
    enableDblClick: true,
    enableClick: true
  }, options);
}
var initialEventFilter = (event) => !!event.isVisible;
function createOptionsSlice(options = {}) {
  var _a, _b, _c, _d, _e, _f;
  return {
    options: {
      defaultView: (_a = options.defaultView) != null ? _a : "week",
      useFormPopup: (_b = options.useFormPopup) != null ? _b : false,
      useDetailPopup: (_c = options.useDetailPopup) != null ? _c : false,
      isReadOnly: (_d = options.isReadOnly) != null ? _d : false,
      week: initializeWeekOptions(options.week),
      month: initializeMonthOptions(options.month),
      gridSelection: initializeGridSelectionOptions(options.gridSelection),
      usageStatistics: (_e = options.usageStatistics) != null ? _e : true,
      eventFilter: (_f = options.eventFilter) != null ? _f : initialEventFilter,
      timezone: initializeTimezoneOptions(options.timezone)
    }
  };
}
function createOptionsDispatchers(set) {
  return {
    setOptions: (newOptions = {}) => set(immer_esm_default((state) => {
      mergeObject(state.options, newOptions);
    }))
  };
}

// src/slices/popup.ts
function createPopupSlice() {
  return {
    popup: {
      ["seeMore" /* SeeMore */]: null,
      ["form" /* Form */]: null,
      ["detail" /* Detail */]: null
    }
  };
}
function createPopupDispatchers(set) {
  return {
    showSeeMorePopup: (param) => set(immer_esm_default((state) => {
      state.popup["seeMore" /* SeeMore */] = param;
      state.popup["form" /* Form */] = null;
      state.popup["detail" /* Detail */] = null;
    })),
    showFormPopup: (param) => set(immer_esm_default((state) => {
      state.popup["form" /* Form */] = param;
      state.popup["seeMore" /* SeeMore */] = null;
      state.popup["detail" /* Detail */] = null;
    })),
    showDetailPopup: (param, isOpenedInSeeMorePopup) => set(immer_esm_default((state) => {
      state.popup["detail" /* Detail */] = param;
      state.popup["form" /* Form */] = null;
      if (!isOpenedInSeeMorePopup) {
        state.popup["seeMore" /* SeeMore */] = null;
      }
    })),
    hideSeeMorePopup: () => set(immer_esm_default((state) => {
      state.popup["seeMore" /* SeeMore */] = null;
    })),
    hideFormPopup: () => set(immer_esm_default((state) => {
      state.popup["form" /* Form */] = null;
    })),
    hideDetailPopup: () => set(immer_esm_default((state) => {
      state.popup["detail" /* Detail */] = null;
    })),
    hideAllPopup: () => set(immer_esm_default((state) => {
      state.popup["seeMore" /* SeeMore */] = null;
      state.popup["form" /* Form */] = null;
      state.popup["detail" /* Detail */] = null;
    }))
  };
}

// src/utils/noop.ts
var noop = () => {
};

// src/utils/dom.ts
var CSS_AUTO_REGEX = /^auto$|^$|%/;
function getStyle(el, style) {
  let value = el.style[style];
  if ((!value || value === "auto") && document.defaultView) {
    const css = document.defaultView.getComputedStyle(el, null);
    value = css ? css[style] : null;
  }
  return value === "auto" ? null : value;
}
function getPosition(el) {
  if ((CSS_AUTO_REGEX.test(el.style.left || "") || CSS_AUTO_REGEX.test(el.style.top || "")) && "getBoundingClientRect" in el) {
    const { left, top } = el.getBoundingClientRect();
    return { x: left, y: top };
  }
  return {
    x: parseFloat(el.style.left || String(0)),
    y: parseFloat(el.style.top || String(0))
  };
}
function invalidateSizeValue(value) {
  if ((0, import_isString.default)(value)) {
    return CSS_AUTO_REGEX.test(value);
  }
  return value === null;
}
function getSize(el) {
  const w5 = getStyle(el, "width");
  const h5 = getStyle(el, "height");
  if ((invalidateSizeValue(w5) || invalidateSizeValue(h5)) && el.getBoundingClientRect) {
    const { width, height } = el.getBoundingClientRect();
    return {
      width: width || el.offsetWidth,
      height: height || el.offsetHeight
    };
  }
  return {
    width: parseFloat(w5 != null ? w5 : "0"),
    height: parseFloat(h5 != null ? h5 : "0")
  };
}
var ElementClass = typeof Element === "undefined" ? noop : Element;
var elProto = ElementClass.prototype;
var matchSelector = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector || function(selector) {
  return Array.from(document.querySelectorAll(selector)).includes(this);
};
function getRelativePosition(position, relativeElement) {
  const clientX = Array.isArray(position) ? position[0] : position.clientX;
  const clientY = Array.isArray(position) ? position[1] : position.clientY;
  if (!relativeElement) {
    return [clientX, clientY];
  }
  const { left, top } = relativeElement.getBoundingClientRect();
  return [clientX - left - relativeElement.clientLeft, clientY - top - relativeElement.clientTop];
}
function stripTags(str) {
  return str.replace(/<([^>]+)>/gi, "");
}

// src/template/default.tsx
var SIXTY_MINUTES = 60;
var templates = {
  milestone(model) {
    const classNames22 = cls("icon", "ic-milestone");
    return /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("span", {
      className: classNames22
    }), /* @__PURE__ */ v("span", {
      style: {
        backgroundColor: model.backgroundColor
      }
    }, stripTags(model.title)));
  },
  milestoneTitle() {
    return /* @__PURE__ */ v("span", {
      className: cls("left-content")
    }, "Milestone");
  },
  task(model) {
    return `#${model.title}`;
  },
  taskTitle() {
    return /* @__PURE__ */ v("span", {
      className: cls("left-content")
    }, "Task");
  },
  alldayTitle() {
    return /* @__PURE__ */ v("span", {
      className: cls("left-content")
    }, "All Day");
  },
  allday(model) {
    return stripTags(model.title);
  },
  time(model) {
    const { start, title } = model;
    if (start) {
      return /* @__PURE__ */ v("span", null, /* @__PURE__ */ v("strong", null, toFormat(start, "HH:mm")), "\xA0", /* @__PURE__ */ v("span", null, stripTags(title)));
    }
    return stripTags(title);
  },
  goingDuration(model) {
    const { goingDuration } = model;
    const hour = Math.floor(goingDuration / SIXTY_MINUTES);
    const minutes = goingDuration % SIXTY_MINUTES;
    return `GoingTime ${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },
  comingDuration(model) {
    const { comingDuration } = model;
    const hour = Math.floor(comingDuration / SIXTY_MINUTES);
    const minutes = comingDuration % SIXTY_MINUTES;
    return `ComingTime ${leadingZero(hour, 2)}:${leadingZero(minutes, 2)}`;
  },
  monthMoreTitleDate(moreTitle) {
    const { date: date2, day } = moreTitle;
    const classNameDay = cls("more-title-date");
    const classNameDayLabel = cls("more-title-day");
    const dayName = capitalize(getDayName(day));
    return /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("span", {
      className: classNameDay
    }, date2), /* @__PURE__ */ v("span", {
      className: classNameDayLabel
    }, dayName));
  },
  monthMoreClose() {
    return "";
  },
  monthGridHeader(model) {
    const date2 = parseInt(model.date.split("-")[2], 10);
    const classNames22 = cls("weekday-grid-date", { "weekday-grid-date-decorator": model.isToday });
    return /* @__PURE__ */ v("span", {
      className: classNames22
    }, date2);
  },
  monthGridHeaderExceed(hiddenEvents) {
    const className2 = cls("weekday-grid-more-events");
    return /* @__PURE__ */ v("span", {
      className: className2
    }, hiddenEvents, " more");
  },
  monthGridFooter(_model) {
    return "";
  },
  monthGridFooterExceed(_hiddenEvents) {
    return "";
  },
  monthDayName(model) {
    return model.label;
  },
  weekDayName(model) {
    const classDate = cls("day-name__date");
    const className2 = cls("day-name__name");
    return /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("span", {
      className: classDate
    }, model.date), "\xA0\xA0", /* @__PURE__ */ v("span", {
      className: className2
    }, model.dayName));
  },
  weekGridFooterExceed(hiddenEvents) {
    return `+${hiddenEvents}`;
  },
  collapseBtnTitle() {
    const className2 = cls("collapse-btn-icon");
    return /* @__PURE__ */ v("span", {
      className: className2
    });
  },
  timezoneDisplayLabel({ displayLabel, timezoneOffset }) {
    if (isNil(displayLabel) && isPresent(timezoneOffset)) {
      const sign = timezoneOffset < 0 ? "-" : "+";
      const hours = Math.abs(timezoneOffset / SIXTY_MINUTES);
      const minutes = Math.abs(timezoneOffset % SIXTY_MINUTES);
      return `GMT${sign}${leadingZero(hours, 2)}:${leadingZero(minutes, 2)}`;
    }
    return displayLabel;
  },
  timegridDisplayPrimaryTime(props) {
    const { time } = props;
    return toFormat(time, "hh tt");
  },
  timegridDisplayTime(props) {
    const { time } = props;
    return toFormat(time, "HH:mm");
  },
  timegridNowIndicatorLabel(timezone) {
    const { time, format = "HH:mm" } = timezone;
    return toFormat(time, format);
  },
  popupIsAllday() {
    return "All day";
  },
  popupStateFree() {
    return "Free";
  },
  popupStateBusy() {
    return "Busy";
  },
  titlePlaceholder() {
    return "Subject";
  },
  locationPlaceholder() {
    return "Location";
  },
  startDatePlaceholder() {
    return "Start date";
  },
  endDatePlaceholder() {
    return "End date";
  },
  popupSave() {
    return "Save";
  },
  popupUpdate() {
    return "Update";
  },
  popupEdit() {
    return "Edit";
  },
  popupDelete() {
    return "Delete";
  },
  popupDetailTitle({ title }) {
    return title;
  },
  popupDetailDate({ isAllday: isAllday2, start, end }) {
    const dayFormat = "YYYY.MM.DD";
    const timeFormat = "hh:mm tt";
    const detailFormat = `${dayFormat} ${timeFormat}`;
    const startDate = toFormat(start, isAllday2 ? dayFormat : timeFormat);
    const endDateFormat = isSameDate(start, end) ? timeFormat : detailFormat;
    if (isAllday2) {
      return `${startDate}${isSameDate(start, end) ? "" : ` - ${toFormat(end, dayFormat)}`}`;
    }
    return `${toFormat(start, detailFormat)} - ${toFormat(end, endDateFormat)}`;
  },
  popupDetailLocation({ location: location2 }) {
    return location2;
  },
  popupDetailAttendees({ attendees = [] }) {
    return attendees.join(", ");
  },
  popupDetailState({ state }) {
    return state || "Busy";
  },
  popupDetailRecurrenceRule({ recurrenceRule }) {
    return recurrenceRule;
  },
  popupDetailBody({ body }) {
    return body;
  }
};

// src/slices/template.ts
function createTemplateSlice(templateConfig = {}) {
  return {
    template: __spreadValues(__spreadValues({}, templates), templateConfig)
  };
}
function createTemplateDispatchers(set) {
  return {
    setTemplate: (template) => set(immer_esm_default((state) => {
      state.template = __spreadValues(__spreadValues({}, state.template), template);
    }))
  };
}

// src/slices/view.ts
function createViewSlice(initialView = "week") {
  const renderDate = new TZDate();
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
    changeView: (nextView) => set(immer_esm_default((state) => {
      state.view.currentView = nextView;
    })),
    setRenderDate: (date2) => set(immer_esm_default((state) => {
      state.view.renderDate = toStartOfDay(date2);
    }))
  };
}

// src/store/index.ts
var isSSR = (0, import_isUndefined2.default)(window) || !window.navigator;
var useIsomorphicLayoutEffect = isSSR ? _2 : h2;
function createStoreContext() {
  const StoreContext = D(null);
  function StoreProvider2({
    children,
    store
  }) {
    return v(StoreContext.Provider, { value: store, children });
  }
  const useStore2 = (selector, equalityFn = Object.is) => {
    const storeCtx = q(StoreContext);
    if (isNil(storeCtx)) {
      throw new Error("StoreProvider is not found");
    }
    const [, notify] = d2((notifyCount) => notifyCount + 1, 0);
    const state = storeCtx.getState();
    const stateRef = s2(state);
    const selectorRef = s2(selector);
    const equalityFnRef = s2(equalityFn);
    const hasErrorRef = s2(false);
    const currentSliceRef = s2();
    if ((0, import_isUndefined2.default)(currentSliceRef.current)) {
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
    });
    const stateBeforeSubscriptionRef = s2(state);
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
        } catch (e3) {
          console.error("[toastui-calendar] failed to update state", e3 == null ? void 0 : e3.message);
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
  const useInternalStore2 = () => {
    const storeCtx = q(StoreContext);
    if (isNil(storeCtx)) {
      throw new Error("StoreProvider is not found");
    }
    return F(() => storeCtx, [storeCtx]);
  };
  return {
    StoreProvider: StoreProvider2,
    useStore: useStore2,
    useInternalStore: useInternalStore2
  };
}

// src/store/internal.ts
function createStore(storeCreator2) {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partialStateCreator) => {
    const nextState = partialStateCreator(state);
    if (nextState !== state) {
      const previousState = state;
      state = __spreadValues(__spreadValues({}, state), nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribe = (listener, selector, equalityFn) => {
    let _listener = listener;
    if (selector) {
      let currentSlice = selector(state);
      const _equalityFn = equalityFn != null ? equalityFn : Object.is;
      _listener = () => {
        const nextSlice = selector(state);
        if (!_equalityFn(currentSlice, nextSlice)) {
          const previousSlice = currentSlice;
          currentSlice = nextSlice;
          listener(currentSlice, previousSlice);
        }
      };
    }
    listeners.add(_listener);
    return () => listeners.delete(_listener);
  };
  const clearListeners = () => listeners.clear();
  const internal = { setState, getState, subscribe, clearListeners };
  state = storeCreator2(setState, getState, internal);
  return internal;
}

// src/contexts/calendarStore.ts
var storeCreator = (options) => (set) => {
  return __spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, createOptionsSlice(options)), createTemplateSlice(options.template)), createPopupSlice()), createWeekViewLayoutSlice()), createCalendarSlice(options.calendars)), createViewSlice(options.defaultView)), createDndSlice()), createGridSelectionSlice()), {
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
var initCalendarStore = (options = {}) => createStore(storeCreator(options));
var { StoreProvider, useStore, useInternalStore } = createStoreContext();
function useDispatch(group) {
  return useStore(T2((state) => {
    if (!group) {
      return state.dispatch;
    }
    return state.dispatch[group];
  }, [group]));
}

// src/selectors/index.ts
function topLevelStateSelector(group) {
  return (state) => state[group];
}
var popupSelector = topLevelStateSelector("popup");
var calendarSelector = topLevelStateSelector("calendar");
var weekViewLayoutSelector = topLevelStateSelector("weekViewLayout");
var templateSelector = topLevelStateSelector("template");
var viewSelector = topLevelStateSelector("view");
var optionsSelector = topLevelStateSelector("options");
var dndSelector = topLevelStateSelector("dnd");

// src/utils/sanitizer.ts
var import_isomorphic_dompurify = __toESM(require_browser());
var TEMP_TARGET_ATTRIBUTE = "data-target-temp";
function addAttributeHooks() {
  import_isomorphic_dompurify.default.addHook("beforeSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
      const targetValue = node.getAttribute("target");
      if (targetValue) {
        node.setAttribute(TEMP_TARGET_ATTRIBUTE, targetValue);
      } else {
        node.setAttribute("target", "_self");
      }
    }
  });
  import_isomorphic_dompurify.default.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A" && node.hasAttribute(TEMP_TARGET_ATTRIBUTE)) {
      node.setAttribute("target", node.getAttribute(TEMP_TARGET_ATTRIBUTE));
      node.removeAttribute(TEMP_TARGET_ATTRIBUTE);
      if (node.getAttribute("target") === "_blank") {
        node.setAttribute("rel", "noopener");
      }
    }
  });
}
function removeAttributeHooks() {
  import_isomorphic_dompurify.default.removeAllHooks();
}
function sanitize(str) {
  return import_isomorphic_dompurify.default.sanitize(str);
}

// src/components/template.tsx
function Template({ template, param, as: tagName = "div" }) {
  var _a;
  const templates2 = useStore(templateSelector);
  const templateFunc = templates2[template];
  if (isNil(templateFunc)) {
    return null;
  }
  const htmlOrVnode = templateFunc(param);
  return (0, import_isString.default)(htmlOrVnode) ? v(tagName, {
    className: cls(`template-${template}`),
    dangerouslySetInnerHTML: {
      __html: sanitize(htmlOrVnode)
    }
  }) : B(htmlOrVnode, {
    className: `${(_a = htmlOrVnode.props.className) != null ? _a : ""} ${cls(`template-${template}`)}`
  });
}

// src/contexts/eventBus.tsx
var EventBusContext = D(null);
var EventBusProvider = EventBusContext.Provider;
var useEventBus = () => {
  const eventBus = q(EventBusContext);
  if (!eventBus) {
    throw new Error("useEventBus must be used within a EventBusProvider");
  }
  return eventBus;
};

// src/selectors/timezone.ts
var primaryTimezoneSelector = (state) => {
  var _a, _b, _c, _d, _e;
  return (_e = (_d = (_c = (_b = (_a = state.options) == null ? void 0 : _a.timezone) == null ? void 0 : _b.zones) == null ? void 0 : _c[0]) == null ? void 0 : _d.timezoneName) != null ? _e : "Local";
};
var customOffsetCalculatorSelector = (state) => {
  var _a, _b;
  return (_b = (_a = state.options) == null ? void 0 : _a.timezone) == null ? void 0 : _b.customOffsetCalculator;
};
var timezonesSelector = (state) => {
  var _a;
  return (_a = state.options.timezone.zones) != null ? _a : [];
};

// src/hooks/timezone/useTZConverter.ts
function useTZConverter() {
  const customOffsetCalculator = useStore(customOffsetCalculatorSelector);
  const hasCustomOffsetCalculator = isPresent(customOffsetCalculator);
  return T2((timezoneName, tzDate = new TZDate()) => tzDate.tz(hasCustomOffsetCalculator ? customOffsetCalculator(timezoneName, tzDate.getTime()) : timezoneName), [customOffsetCalculator, hasCustomOffsetCalculator]);
}

// src/hooks/timezone/usePrimaryTimezone.ts
function usePrimaryTimezone() {
  const primaryTimezoneName = useStore(primaryTimezoneSelector);
  const tzConverter = useTZConverter();
  const getNow = T2(() => tzConverter(primaryTimezoneName), [primaryTimezoneName, tzConverter]);
  return [primaryTimezoneName, getNow];
}

// src/components/dayGridCommon/dayName.tsx
function isWeekDayName(type, dayName) {
  return type === "week";
}
function getWeekDayNameColor({
  dayName,
  theme,
  today
}) {
  var _a, _b;
  const { day, dateInstance } = dayName;
  const isToday = isSameDate(today, dateInstance);
  const isPastDay = !isToday && dateInstance < today;
  if (isSunday(day)) {
    return theme.common.holiday.color;
  }
  if (isPastDay) {
    return (_a = theme.week) == null ? void 0 : _a.pastDay.color;
  }
  if (isSaturday(day)) {
    return theme.common.saturday.color;
  }
  if (isToday) {
    return (_b = theme.week) == null ? void 0 : _b.today.color;
  }
  return theme.common.dayName.color;
}
function getMonthDayNameColor({
  dayName,
  theme
}) {
  const { day } = dayName;
  if (isSunday(day)) {
    return theme.common.holiday.color;
  }
  if (isSaturday(day)) {
    return theme.common.saturday.color;
  }
  return theme.common.dayName.color;
}
function DayName({ dayName, style, type, theme }) {
  const eventBus = useEventBus();
  const [, getNow] = usePrimaryTimezone();
  const today = getNow();
  const { day } = dayName;
  const color = type === "week" ? getWeekDayNameColor({ dayName, theme, today }) : getMonthDayNameColor({ dayName, theme });
  const templateType = `${type}DayName`;
  const handleClick = () => {
    if (isWeekDayName(type, dayName)) {
      eventBus.fire("clickDayName", { date: toFormat(dayName.dateInstance, "YYYY-MM-DD") });
    }
  };
  return /* @__PURE__ */ v("div", {
    className: cls("day-name-item", type),
    style
  }, /* @__PURE__ */ v("span", {
    className: cls({ [`holiday-${getDayName(day)}`]: isWeekend(day) }),
    style: { color },
    onClick: handleClick,
    "data-testid": `dayName-${type}-${getDayName(day)}`
  }, /* @__PURE__ */ v(Template, {
    template: templateType,
    param: dayName
  })));
}

// src/selectors/theme.ts
var commonThemeSelector = topLevelStateSelector("common");
var weekThemeSelector = topLevelStateSelector("week");
var monthThemeSelector = topLevelStateSelector("month");
var weekDayGridLeftSelector = (theme) => theme.week.dayGridLeft;
var weekTimeGridLeftSelector = (theme) => theme.week.timeGridLeft;
var monthMoreViewSelector = (theme) => theme.month.moreView;
var monthGridCellSelector = (theme) => theme.month.gridCell;

// src/constants/theme.ts
var DEFAULT_COMMON_THEME = {
  border: "1px solid #e5e5e5",
  backgroundColor: "white",
  holiday: {
    color: "#ff4040"
  },
  saturday: {
    color: "#333"
  },
  dayName: {
    color: "#333"
  },
  today: {
    color: "#fff"
  },
  gridSelection: {
    backgroundColor: "rgba(81, 92, 230, 0.05)",
    border: "1px solid #515ce6"
  }
};
var DEFAULT_WEEK_THEME = {
  dayName: {
    borderLeft: "none",
    borderTop: "1px solid #e5e5e5",
    borderBottom: "1px solid #e5e5e5",
    backgroundColor: "inherit"
  },
  weekend: {
    backgroundColor: "inherit"
  },
  today: {
    color: "inherit",
    backgroundColor: "rgba(81, 92, 230, 0.05)"
  },
  pastDay: {
    color: "#bbb"
  },
  panelResizer: {
    border: "1px solid #e5e5e5"
  },
  dayGrid: {
    borderRight: "1px solid #e5e5e5",
    backgroundColor: "inherit"
  },
  dayGridLeft: {
    borderRight: "1px solid #e5e5e5",
    backgroundColor: "inherit",
    width: "72px"
  },
  timeGrid: {
    borderRight: "1px solid #e5e5e5"
  },
  timeGridLeft: {
    backgroundColor: "inherit",
    borderRight: "1px solid #e5e5e5",
    width: "72px"
  },
  timeGridLeftAdditionalTimezone: {
    backgroundColor: "white"
  },
  timeGridHalfHourLine: {
    borderBottom: "none"
  },
  timeGridHourLine: {
    borderBottom: "1px solid #e5e5e5"
  },
  nowIndicatorLabel: {
    color: "#515ce6"
  },
  nowIndicatorPast: {
    border: "1px dashed #515ce6"
  },
  nowIndicatorBullet: {
    backgroundColor: "#515ce6"
  },
  nowIndicatorToday: {
    border: "1px solid #515ce6"
  },
  nowIndicatorFuture: {
    border: "none"
  },
  pastTime: {
    color: "#bbb"
  },
  futureTime: {
    color: "#333"
  },
  gridSelection: {
    color: "#515ce6"
  }
};
var DEFAULT_MONTH_THEME = {
  dayName: {
    borderLeft: "none",
    backgroundColor: "inherit"
  },
  holidayExceptThisMonth: {
    color: "rgba(255, 64, 64, 0.4)"
  },
  dayExceptThisMonth: {
    color: "rgba(51, 51, 51, 0.4)"
  },
  weekend: {
    backgroundColor: "inherit"
  },
  moreView: {
    border: "1px solid #d5d5d5",
    boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    width: null,
    height: null
  },
  gridCell: {
    headerHeight: 31,
    footerHeight: null
  },
  moreViewTitle: {
    backgroundColor: "inherit"
  }
};

// src/theme/common.ts
function createCommonTheme(commonTheme = {}) {
  return {
    common: mergeObject(DEFAULT_COMMON_THEME, commonTheme)
  };
}

// src/theme/dispatch.ts
function createThemeDispatch(set) {
  return {
    setTheme: (theme) => {
      set(immer_esm_default((state) => {
        state.common = mergeObject(state.common, theme.common);
        state.week = mergeObject(state.week, theme.week);
        state.month = mergeObject(state.month, theme.month);
      }));
    },
    setCommonTheme: (commonTheme) => {
      set(immer_esm_default((state) => {
        state.common = mergeObject(state.common, commonTheme);
      }));
    },
    setWeekTheme: (weekTheme) => {
      set(immer_esm_default((state) => {
        state.week = mergeObject(state.week, weekTheme);
      }));
    },
    setMonthTheme: (monthTheme) => {
      set(immer_esm_default((state) => {
        state.month = mergeObject(state.month, monthTheme);
      }));
    }
  };
}

// src/theme/month.ts
function createMonthTheme(monthTheme = {}) {
  return {
    month: mergeObject(DEFAULT_MONTH_THEME, monthTheme)
  };
}

// src/theme/week.ts
function createWeekTheme(weekTheme = {}) {
  return {
    week: mergeObject(DEFAULT_WEEK_THEME, weekTheme)
  };
}

// src/contexts/themeStore.tsx
var themeStoreCreator = (themeOptions = {}) => (set) => {
  return __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, createCommonTheme(themeOptions == null ? void 0 : themeOptions.common)), createWeekTheme(themeOptions == null ? void 0 : themeOptions.week)), createMonthTheme(themeOptions == null ? void 0 : themeOptions.month)), {
    dispatch: __spreadValues({}, createThemeDispatch(set))
  });
};
var initThemeStore = (themeOptions = {}) => createStore(themeStoreCreator(themeOptions));
var {
  StoreProvider: ThemeProvider,
  useInternalStore: useInternalThemeStore,
  useStore: useTheme
} = createStoreContext();
function useCommonTheme() {
  return useTheme(commonThemeSelector);
}
function useMonthTheme() {
  return useTheme(monthThemeSelector);
}

// src/components/dayGridCommon/gridHeader.tsx
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
function GridHeader({
  dayNames,
  marginLeft = DEFAULT_DAY_NAME_MARGIN_LEFT,
  rowStyleInfo,
  type = "month"
}) {
  var _a, _b;
  const theme = useTheme(type === "month" ? monthDayNameSelector : weekDayNameSelector);
  const _c = (_b = (_a = theme[type]) == null ? void 0 : _a.dayName) != null ? _b : {}, { backgroundColor = "white", borderLeft = null } = _c, rest = __objRest(_c, ["backgroundColor", "borderLeft"]);
  const { borderTop = null, borderBottom = null } = rest;
  return /* @__PURE__ */ v("div", {
    "data-testid": `grid-header-${type}`,
    className: cls("day-names", type),
    style: {
      backgroundColor,
      borderTop,
      borderBottom
    }
  }, /* @__PURE__ */ v("div", {
    className: cls("day-name-container"),
    style: { marginLeft }
  }, dayNames.map((dayName, index) => /* @__PURE__ */ v(DayName, {
    type,
    key: `dayNames-${dayName.day}`,
    dayName,
    style: {
      width: toPercent(rowStyleInfo[index].width),
      left: toPercent(rowStyleInfo[index].left),
      borderLeft
    },
    theme
  }))));
}

// src/helpers/grid.ts
var import_range2 = __toESM(require_range());

// src/constants/grid.ts
var DEFAULT_VISIBLE_WEEKS = 6;

// src/controller/core.ts
function getCollisionGroup(events, usingTravelTime = true) {
  const collisionGroups = [];
  let previousEventList;
  if (!events.length) {
    return collisionGroups;
  }
  collisionGroups[0] = [events[0].cid()];
  events.slice(1).forEach((event, index) => {
    previousEventList = events.slice(0, index + 1).reverse();
    const found = previousEventList.find((previous) => event.collidesWith(previous, usingTravelTime));
    if (!found) {
      collisionGroups.push([event.cid()]);
    } else {
      collisionGroups.slice().reverse().some((group) => {
        if (~group.indexOf(found.cid())) {
          group.push(event.cid());
          return true;
        }
        return false;
      });
    }
  });
  return collisionGroups;
}
function getLastRowInColumn(matrix, col) {
  let { length: row } = matrix;
  while (row > 0) {
    row -= 1;
    if (!(0, import_isUndefined2.default)(matrix[row][col])) {
      return row;
    }
  }
  return -1;
}
function getMatrices(collection, collisionGroups, usingTravelTime = true) {
  const result = [];
  collisionGroups.forEach((group) => {
    const matrix = [[]];
    group.forEach((eventID) => {
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
          if ((0, import_isUndefined2.default)(matrix[nextRow])) {
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
function getEventInDateRangeFilter(start, end) {
  return (model) => {
    const ownStarts = model.getStarts();
    const ownEnds = model.getEnds();
    return !(ownEnds < start || ownStarts > end);
  };
}
function positionUIModels(start, end, matrices, iteratee) {
  const ymdListToRender = makeDateRange(start, end, MS_PER_DAY).map((date2) => toFormat(date2, "YYYYMMDD"));
  matrices.forEach((matrix) => {
    matrix.forEach((column) => {
      column.forEach((uiModel, index) => {
        if (!uiModel) {
          return;
        }
        const ymd = toFormat(uiModel.getStarts(), "YYYYMMDD");
        const dateLength = makeDateRange(toStartOfDay(uiModel.getStarts()), toEndOfDay(uiModel.getEnds()), MS_PER_DAY).length;
        uiModel.top = index;
        uiModel.left = ymdListToRender.indexOf(ymd);
        uiModel.width = dateLength;
        iteratee == null ? void 0 : iteratee(uiModel);
      });
    });
  });
}
function limit(start, end, uiModel) {
  if (uiModel.getStarts() < start) {
    uiModel.exceedLeft = true;
    uiModel.renderStarts = new TZDate(start);
  }
  if (uiModel.getEnds() > end) {
    uiModel.exceedRight = true;
    uiModel.renderEnds = new TZDate(end);
  }
  return uiModel;
}
function limitRenderRange(start, end, uiModelColl) {
  if (uiModelColl instanceof Collection) {
    uiModelColl.each((uiModel) => {
      limit(start, end, uiModel);
      return true;
    });
    return null;
  }
  return limit(start, end, uiModelColl);
}
function convertToUIModel(eventCollection) {
  const uiModelColl = new Collection((uiModel) => {
    return uiModel.cid();
  });
  eventCollection.each(function(event) {
    uiModelColl.add(new EventUIModel(event));
  });
  return uiModelColl;
}

// src/controller/month.ts
function _isAllday({ model }) {
  return model.isAllday || model.hasMultiDates;
}
function _isNotAllday(uiModel) {
  return !_isAllday(uiModel);
}
function _weightTopValue(uiModel) {
  uiModel.top = uiModel.top || 0;
  uiModel.top += 1;
}
function _adjustRenderRange(start, end, uiModelColl) {
  uiModelColl.each((uiModel) => {
    if (uiModel.model.isAllday || uiModel.model.hasMultiDates) {
      limitRenderRange(toStartOfDay(start), toEndOfDay(end), uiModel);
    }
  });
}
function _getAlldayMaxTopIndexAtYMD(idsOfDay, ymd, uiModelAlldayColl) {
  const topIndexesInDate = [];
  idsOfDay[ymd].forEach((cid) => {
    uiModelAlldayColl.doWhenHas(cid, (uiModel) => {
      topIndexesInDate.push(uiModel.top);
    });
  });
  if (topIndexesInDate.length > 0) {
    return Math.max(...topIndexesInDate);
  }
  return 0;
}
function _adjustTimeTopIndex(idsOfDay, uiModelColl) {
  const vAlldayColl = uiModelColl.filter(_isAllday);
  const sortedTimeEvents = uiModelColl.filter(_isNotAllday).sort(array_default.compare.event.asc);
  const maxIndexInYMD = {};
  sortedTimeEvents.forEach((timeUIModel) => {
    const eventYMD = toFormat(timeUIModel.getStarts(), "YYYYMMDD");
    let alldayMaxTopInYMD = maxIndexInYMD[eventYMD];
    if ((0, import_isUndefined2.default)(alldayMaxTopInYMD)) {
      alldayMaxTopInYMD = maxIndexInYMD[eventYMD] = _getAlldayMaxTopIndexAtYMD(idsOfDay, eventYMD, vAlldayColl);
    }
    maxIndexInYMD[eventYMD] = timeUIModel.top = alldayMaxTopInYMD + 1;
  });
}
function _stackTimeFromTop(idsOfDay, uiModelColl) {
  const uiModelAlldayColl = uiModelColl.filter(_isAllday);
  const sortedTimeEvents = uiModelColl.filter(_isNotAllday).sort(array_default.compare.event.asc);
  const indiceInYMD = {};
  sortedTimeEvents.forEach((timeUIModel) => {
    const eventYMD = toFormat(timeUIModel.getStarts(), "YYYYMMDD");
    let topArrayInYMD = indiceInYMD[eventYMD];
    if ((0, import_isUndefined2.default)(topArrayInYMD)) {
      topArrayInYMD = indiceInYMD[eventYMD] = [];
      idsOfDay[eventYMD].forEach((cid) => {
        uiModelAlldayColl.doWhenHas(cid, (uiModel) => {
          topArrayInYMD.push(uiModel.top);
        });
      });
    }
    if (topArrayInYMD.indexOf(timeUIModel.top) >= 0) {
      const maxTopInYMD = Math.max(...topArrayInYMD) + 1;
      for (let i5 = 1; i5 <= maxTopInYMD; i5 += 1) {
        timeUIModel.top = i5;
        if (topArrayInYMD.indexOf(timeUIModel.top) < 0) {
          break;
        }
      }
    }
    topArrayInYMD.push(timeUIModel.top);
  });
}
function _addMultiDatesInfo(uiModelColl) {
  uiModelColl.each((uiModel) => {
    const { model } = uiModel;
    const start = model.getStarts();
    const end = model.getEnds();
    model.hasMultiDates = !isSameDate(start, end);
    if (!model.isAllday && model.hasMultiDates) {
      uiModel.renderStarts = toStartOfDay(start);
      uiModel.renderEnds = toEndOfDay(end);
    }
  });
}
function findByDateRange(calendarData, condition) {
  const { start, end, andFilters = [], alldayFirstMode = false } = condition;
  const { events, idsOfDay } = calendarData;
  const filterFn = Collection.and(...[getEventInDateRangeFilter(start, end)].concat(andFilters));
  const coll = events.filter(filterFn);
  const uiModelColl = convertToUIModel(coll);
  _addMultiDatesInfo(uiModelColl);
  _adjustRenderRange(start, end, uiModelColl);
  const vList = uiModelColl.sort(array_default.compare.event.asc);
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

// src/controller/week.ts
function generateTimeArrayInRow(matrix) {
  var _a, _b;
  const map = [];
  const maxColLen = Math.max(...matrix.map((col2) => col2.length));
  let cursor = [];
  let row;
  let col;
  let event;
  let start;
  let end;
  for (col = 1; col < maxColLen; col += 1) {
    row = 0;
    event = (_a = matrix == null ? void 0 : matrix[row]) == null ? void 0 : _a[col];
    while (event) {
      const { goingDuration, comingDuration } = event.valueOf();
      start = event.getStarts().getTime() - millisecondsFrom("minute", goingDuration);
      end = event.getEnds().getTime() + millisecondsFrom("minute", comingDuration);
      if (Math.abs(end - start) < MS_EVENT_MIN_DURATION) {
        end += MS_EVENT_MIN_DURATION;
      }
      cursor.push([start, end]);
      row += 1;
      event = (_b = matrix == null ? void 0 : matrix[row]) == null ? void 0 : _b[col];
    }
    map.push(cursor);
    cursor = [];
  }
  return map;
}
function searchFunc(index) {
  return (block) => block[index];
}
function hasCollision2(arr, start, end) {
  if (!(arr == null ? void 0 : arr.length)) {
    return false;
  }
  const compare2 = array_default.compare.num.asc;
  const startStart = Math.abs(array_default.bsearch(arr, start, searchFunc(0), compare2));
  const startEnd = Math.abs(array_default.bsearch(arr, start, searchFunc(1), compare2));
  const endStart = Math.abs(array_default.bsearch(arr, end, searchFunc(0), compare2));
  const endEnd = Math.abs(array_default.bsearch(arr, end, searchFunc(1), compare2));
  return !(startStart === startEnd && startEnd === endStart && endStart === endEnd);
}
function getCollides(matrices) {
  matrices.forEach((matrix) => {
    const binaryMap = generateTimeArrayInRow(matrix);
    const maxRowLength = Math.max(...matrix.map((row) => row.length));
    matrix.forEach((row) => {
      row.forEach((uiModel, col) => {
        if (!uiModel) {
          return;
        }
        const { goingDuration, comingDuration } = uiModel.valueOf();
        let startTime = uiModel.getStarts().getTime();
        let endTime = uiModel.getEnds().getTime();
        if (Math.abs(endTime - startTime) < MS_EVENT_MIN_DURATION) {
          endTime += MS_EVENT_MIN_DURATION;
        }
        startTime -= millisecondsFrom("minute", goingDuration);
        endTime += millisecondsFrom("minute", comingDuration);
        endTime -= 1;
        for (let i5 = col + 1; i5 < maxRowLength; i5 += 1) {
          const collided = hasCollision2(binaryMap[i5 - 1], startTime, endTime);
          if (collided) {
            uiModel.hasCollide = true;
            break;
          }
          uiModel.extraSpace += 1;
        }
      });
    });
  });
  return matrices;
}
function _makeHourRangeFilter(hStart, hEnd) {
  return (uiModel) => {
    const ownHourStart = uiModel.getStarts();
    const ownHourEnd = uiModel.getEnds();
    const ownHourStartTime = ownHourStart.getTime();
    const ownHourEndTime = ownHourEnd.getTime();
    const yyyy = ownHourStart.getFullYear();
    const mm = ownHourStart.getMonth();
    const dd = ownHourStart.getDate();
    const hourStart = new TZDate(yyyy, mm, dd).setHours(hStart);
    const hourEnd = new TZDate(yyyy, mm, dd).setHours(hEnd);
    return ownHourStartTime >= hourStart && ownHourStartTime < hourEnd || ownHourEndTime > hourStart && ownHourEndTime <= hourEnd || ownHourStartTime < hourStart && ownHourEndTime > hourStart || ownHourEndTime > hourEnd && ownHourStartTime < hourEnd;
  };
}
function _makeGetUIModelFuncForTimeView(hourStart, hourEnd) {
  if (hourStart === 0 && hourEnd === 24) {
    return (uiModelColl) => {
      return uiModelColl.sort(array_default.compare.event.asc);
    };
  }
  return (uiModelColl) => {
    return uiModelColl.filter(_makeHourRangeFilter(hourStart, hourEnd)).sort(array_default.compare.event.asc);
  };
}
function splitEventByDateRange(idsOfDay, start, end, uiModelColl) {
  const result = {};
  const range3 = getDateRange(start, end);
  range3.forEach((date2) => {
    const ymd = toFormat(date2, "YYYYMMDD");
    const ids = idsOfDay[ymd];
    const collection = result[ymd] = new Collection((event) => {
      return event.cid();
    });
    if (ids && ids.length) {
      ids.forEach((id) => {
        uiModelColl.doWhenHas(id, (event) => {
          collection.add(event);
        });
      });
    }
  }, {});
  return result;
}
function getUIModelForTimeView(idsOfDay, condition) {
  const { start, end, uiModelTimeColl, hourStart, hourEnd } = condition;
  const ymdSplitted = splitEventByDateRange(idsOfDay, start, end, uiModelTimeColl);
  const result = {};
  const _getUIModel = _makeGetUIModelFuncForTimeView(hourStart, hourEnd);
  const usingTravelTime = true;
  Object.entries(ymdSplitted).forEach(([ymd, uiModelColl]) => {
    const uiModels = _getUIModel(uiModelColl);
    const collisionGroups = getCollisionGroup(uiModels, usingTravelTime);
    const matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);
    result[ymd] = getCollides(matrices);
  });
  return result;
}
function _addMultiDatesInfo2(uiModelColl) {
  uiModelColl.each((uiModel) => {
    const { model } = uiModel;
    model.hasMultiDates = true;
    uiModel.renderStarts = toStartOfDay(model.getStarts());
    uiModel.renderEnds = toEndOfDay(model.getEnds());
  });
}
function getUIModelForAlldayView(start, end, uiModelColl) {
  if (!uiModelColl || !uiModelColl.size) {
    return [];
  }
  _addMultiDatesInfo2(uiModelColl);
  limitRenderRange(start, end, uiModelColl);
  const uiModels = uiModelColl.sort(array_default.compare.event.asc);
  const usingTravelTime = true;
  const collisionGroups = getCollisionGroup(uiModels, usingTravelTime);
  const matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);
  positionUIModels(start, end, matrices);
  return matrices;
}
function findByDateRange2(calendarData, condition) {
  var _a, _b;
  const { start, end, panels, andFilters = [], options } = condition;
  const { events, idsOfDay } = calendarData;
  const hourStart = (_a = options == null ? void 0 : options.hourStart) != null ? _a : 0;
  const hourEnd = (_b = options == null ? void 0 : options.hourEnd) != null ? _b : 24;
  const filterFn = Collection.and(...[getEventInDateRangeFilter(start, end)].concat(andFilters));
  const uiModelColl = convertToUIModel(events.filter(filterFn));
  const group = uiModelColl.groupBy(filterByCategory);
  return panels.reduce((acc, cur) => {
    const { name, type } = cur;
    if (isNil(group[name])) {
      return acc;
    }
    return __spreadProps(__spreadValues({}, acc), {
      [name]: type === "daygrid" ? getUIModelForAlldayView(start, end, group[name]) : getUIModelForTimeView(idsOfDay, {
        start,
        end,
        uiModelTimeColl: group[name],
        hourStart,
        hourEnd
      })
    });
  }, {
    milestone: [],
    task: [],
    allday: [],
    time: {}
  });
}

// src/utils/math.ts
function limit2(value, minArr, maxArr) {
  const v5 = Math.max(value, ...minArr);
  return Math.min(v5, ...maxArr);
}
function ratio(a5, b4, y4) {
  return b4 * y4 / a5;
}
function isBetween(value, min2, max2) {
  return min2 <= value && value <= max2;
}

// src/helpers/grid.ts
var EVENT_HEIGHT = 22;
var TOTAL_WIDTH = 100;
function forEachMatrix3d(matrices, iteratee) {
  matrices.forEach((matrix) => {
    matrix.forEach((row) => {
      row.forEach((value, index) => {
        iteratee(value, index);
      });
    });
  });
}
function isWithinHeight(containerHeight, eventHeight) {
  return ({ top }) => containerHeight >= top * eventHeight;
}
function isExceededHeight(containerHeight, eventHeight) {
  return ({ top }) => containerHeight < top * eventHeight;
}
function getExceedCount(uiModel, containerHeight, eventHeight) {
  return uiModel.filter(isExceededHeight(containerHeight, eventHeight)).length;
}
var getWeekendCount = (row) => row.filter((cell) => isWeekend(cell.getDay())).length;
function getGridWidthAndLeftPercentValues(row, narrowWeekend, totalWidth) {
  const weekendCount = getWeekendCount(row);
  const gridCellCount = row.length;
  const isAllWeekend = weekendCount === gridCellCount;
  const widthPerDay = totalWidth / (narrowWeekend && !isAllWeekend ? gridCellCount * 2 - weekendCount : gridCellCount);
  const widthList = row.map((cell) => {
    const day = cell.getDay();
    if (!narrowWeekend || isAllWeekend) {
      return widthPerDay;
    }
    return isWeekend(day) ? widthPerDay : widthPerDay * 2;
  });
  const leftList = widthList.reduce((acc, _5, index) => index ? [...acc, acc[index - 1] + widthList[index - 1]] : [0], []);
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
var isInGrid = (gridDate) => {
  return (uiModel) => {
    const eventStart = toStartOfDay(uiModel.getStarts());
    const eventEnd = toStartOfDay(uiModel.getEnds());
    return eventStart <= gridDate && gridDate <= eventEnd;
  };
};
function getGridDateIndex(date2, row) {
  return row.findIndex((cell) => date2 >= toStartOfDay(cell) && date2 <= toEndOfDay(cell));
}
var getLeftAndWidth = (startIndex, endIndex, row, narrowWeekend) => {
  const { widthList } = getGridWidthAndLeftPercentValues(row, narrowWeekend, TOTAL_WIDTH);
  return {
    left: !startIndex ? 0 : getWidth(widthList, 0, startIndex - 1),
    width: getWidth(widthList, startIndex != null ? startIndex : 0, endIndex < 0 ? row.length - 1 : endIndex)
  };
};
var getEventLeftAndWidth = (start, end, row, narrowWeekend) => {
  const { widthList } = getGridWidthAndLeftPercentValues(row, narrowWeekend, TOTAL_WIDTH);
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
function getEventUIModelWithPosition(uiModel, row, narrowWeekend = false) {
  const modelStart = uiModel.getStarts();
  const modelEnd = uiModel.getEnds();
  const { width, left } = getEventLeftAndWidth(modelStart, modelEnd, row, narrowWeekend);
  uiModel.width = width;
  uiModel.left = left;
  return uiModel;
}
function getRenderedEventUIModels(row, calendarData, narrowWeekend) {
  const { idsOfDay } = calendarData;
  const eventUIModels = findByDateRange(calendarData, {
    start: row[0],
    end: toEndOfDay(row[row.length - 1])
  });
  const idEventModelMap = [];
  forEachMatrix3d(eventUIModels, (uiModel) => {
    const cid = uiModel.model.cid();
    idEventModelMap[cid] = getEventUIModelWithPosition(uiModel, row, narrowWeekend);
  });
  const gridDateEventModelMap = Object.keys(idsOfDay).reduce((acc, ymd) => {
    const ids = idsOfDay[ymd];
    acc[ymd] = ids.map((cid) => idEventModelMap[cid]).filter((vm) => !!vm);
    return acc;
  }, {});
  return {
    uiModels: Object.values(idEventModelMap),
    gridDateEventModelMap
  };
}
var getDayGridEventModels = (eventModels, row, narrowWeekend = false) => {
  forEachMatrix3d(eventModels, (uiModel) => {
    const modelStart = uiModel.getStarts();
    const modelEnd = uiModel.getEnds();
    const { width, left } = getEventLeftAndWidth(modelStart, modelEnd, row, narrowWeekend);
    uiModel.width = width;
    uiModel.left = left;
    uiModel.top += 1;
  });
  return flattenMatrix3d(eventModels);
};
var getModels = (models) => models.filter((model) => !!model);
function flattenMatrix3d(matrices) {
  return matrices.flatMap((matrix) => matrix.flatMap((models) => getModels(models)));
}
var getTimeGridEventModels = (eventMatrix) => Array.from(new Set(Object.values(eventMatrix).reduce((result, matrix3d) => result.concat(...flattenMatrix3d(matrix3d)), [])));
var getDayGridEvents = (row, calendarData, { narrowWeekend, hourStart, hourEnd }) => {
  const panels = [
    {
      name: "milestone",
      type: "daygrid",
      show: true
    },
    {
      name: "task",
      type: "daygrid",
      show: true
    },
    {
      name: "allday",
      type: "daygrid",
      show: true
    },
    {
      name: "time",
      type: "timegrid",
      show: true
    }
  ];
  const eventModels = findByDateRange2(calendarData, {
    start: toStartOfDay(row[0]),
    end: toEndOfDay(row[row.length - 1]),
    panels,
    andFilters: [],
    options: {
      hourStart,
      hourEnd
    }
  });
  return Object.keys(eventModels).reduce((acc, cur) => {
    const events = eventModels[cur];
    return __spreadProps(__spreadValues({}, acc), {
      [cur]: Array.isArray(events) ? getDayGridEventModels(events, row, narrowWeekend) : getTimeGridEventModels(events)
    });
  }, {
    milestone: [],
    allday: [],
    task: [],
    time: []
  });
};
function createDateMatrixOfMonth(renderTargetDate, {
  workweek = false,
  visibleWeeksCount = 0,
  startDayOfWeek = 0,
  isAlways6Weeks = true
}) {
  const targetDate = new TZDate(renderTargetDate);
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
  return (0, import_range2.default)(0, totalWeeksOfMatrix).map((weekIndex) => (0, import_range2.default)(0, WEEK_DAYS).reduce((weekRow, dayOfWeek) => {
    const steps = weekIndex * WEEK_DAYS + dayOfWeek;
    const currentDay = (steps + dayOfFirstDateOfMatrix) % WEEK_DAYS;
    if (!workweek || workweek && !isWeekend(currentDay)) {
      const date2 = addDate(firstDateOfMatrix, steps);
      weekRow.push(date2);
    }
    return weekRow;
  }, []));
}
function getWeekDates(renderDate, { startDayOfWeek = 0 /* SUN */, workweek }) {
  const renderDay = renderDate.getDay();
  const now = toStartOfDay(renderDate);
  const nowDay = now.getDay();
  const prevWeekCount = startDayOfWeek - WEEK_DAYS;
  return (0, import_range2.default)(startDayOfWeek, WEEK_DAYS + startDayOfWeek).reduce((acc, day) => {
    const date2 = addDate(now, day - nowDay + (startDayOfWeek > renderDay ? prevWeekCount : 0));
    if (workweek && isWeekend(date2.getDay())) {
      return acc;
    }
    acc.push(date2);
    return acc;
  }, []);
}
function getColumnsData(datesOfWeek, narrowWeekend = false) {
  const datesCount = datesOfWeek.length;
  const shouldApplyNarrowWeekend = datesCount > 5 && narrowWeekend;
  const defaultWidthByColumns = shouldApplyNarrowWeekend ? 100 / (datesCount - 1) : 100 / datesCount;
  return datesOfWeek.map((date2) => {
    const width = shouldApplyNarrowWeekend && isWeekend(date2.getDay()) ? defaultWidthByColumns / 2 : defaultWidthByColumns;
    return {
      date: date2,
      width
    };
  }).reduce((result, currentDateAndWidth, index) => {
    const prev = result[index - 1];
    result.push(__spreadProps(__spreadValues({}, currentDateAndWidth), {
      left: index === 0 ? 0 : prev.left + prev.width
    }));
    return result;
  }, []);
}
function createTimeGridData(datesOfWeek, options) {
  var _a;
  const columns = getColumnsData(datesOfWeek, (_a = options.narrowWeekend) != null ? _a : false);
  const steps = (options.hourEnd - options.hourStart) * 2;
  const baseHeight = 100 / steps;
  const rows = (0, import_range2.default)(steps).map((step, index) => {
    const isOdd = index % 2 === 1;
    const hour = options.hourStart + Math.floor(step / 2);
    const startTime = `${hour}:${isOdd ? "30" : "00"}`.padStart(5, "0");
    const endTime = (isOdd ? `${hour + 1}:00` : `${hour}:30`).padStart(5, "0");
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
function getRelativeMousePosition({ clientX, clientY }, { left, top, clientLeft, clientTop }) {
  return [clientX - left - clientLeft, clientY - top - clientTop];
}
function getIndexFromPosition(arrayLength, maxRange, currentPosition) {
  const calculatedIndex = Math.floor(ratio(maxRange, arrayLength, currentPosition));
  return limit2(calculatedIndex, [0], [arrayLength - 1]);
}
function createGridPositionFinder({
  rowsCount,
  columnsCount,
  container
}) {
  if (isNil(container)) {
    return () => null;
  }
  return function gridPositionFinder(mousePosition) {
    const {
      left: containerLeft,
      top: containerTop,
      width,
      height
    } = container.getBoundingClientRect();
    const [left, top] = getRelativeMousePosition(mousePosition, {
      left: containerLeft,
      top: containerTop,
      clientLeft: container.clientLeft,
      clientTop: container.clientTop
    });
    if (left < 0 || top < 0 || left > width || top > height) {
      return null;
    }
    return {
      columnIndex: getIndexFromPosition(columnsCount, width, left),
      rowIndex: getIndexFromPosition(rowsCount, height, top)
    };
  };
}

// src/components/dayGridCommon/gridSelection.tsx
function commonGridSelectionSelector(theme) {
  return theme.common.gridSelection;
}
function GridSelection({ type, gridSelectionData, weekDates, narrowWeekend }) {
  const { backgroundColor, border } = useTheme(commonGridSelectionSelector);
  const { startCellIndex, endCellIndex } = gridSelectionData;
  const { left, width } = getLeftAndWidth(Math.min(startCellIndex, endCellIndex), Math.max(startCellIndex, endCellIndex), weekDates, narrowWeekend);
  const style = {
    left: toPercent(left),
    width: toPercent(width),
    height: toPercent(100),
    backgroundColor,
    border
  };
  return width > 0 ? /* @__PURE__ */ v("div", {
    className: cls(type, "grid-selection"),
    style
  }) : null;
}

// src/helpers/gridSelection.ts
function createSortedGridSelection(initPos, currentPos, isReversed) {
  return {
    startColumnIndex: isReversed ? currentPos.columnIndex : initPos.columnIndex,
    startRowIndex: isReversed ? currentPos.rowIndex : initPos.rowIndex,
    endColumnIndex: isReversed ? initPos.columnIndex : currentPos.columnIndex,
    endRowIndex: isReversed ? initPos.rowIndex : currentPos.rowIndex
  };
}
function calculateTimeGridSelectionByCurrentIndex(timeGridSelection, columnIndex) {
  if (isNil(timeGridSelection)) {
    return null;
  }
  const { startColumnIndex, endColumnIndex, endRowIndex, startRowIndex } = timeGridSelection;
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
    resultGridSelection.endRowIndex = 47;
  } else if (startColumnIndex !== endColumnIndex) {
    if (startColumnIndex === columnIndex) {
      resultGridSelection.endRowIndex = 47;
    } else if (endColumnIndex === columnIndex) {
      resultGridSelection.startRowIndex = 0;
    }
  }
  return resultGridSelection;
}
var timeGridSelectionHelper = {
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
  const { startRowIndex, startColumnIndex, endRowIndex, endColumnIndex } = gridSelection;
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
  return { startCellIndex, endCellIndex };
}
var dayGridMonthSelectionHelper = {
  sortSelection: (initPos, currentPos) => {
    const isReversed = initPos.rowIndex > currentPos.rowIndex || initPos.rowIndex === currentPos.rowIndex && initPos.columnIndex > currentPos.columnIndex;
    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  getDateFromCollection: (dateCollection, gridSelection) => {
    const dateMatrix = dateCollection;
    return [
      dateMatrix[gridSelection.startRowIndex][gridSelection.startColumnIndex],
      dateMatrix[gridSelection.endRowIndex][gridSelection.endColumnIndex]
    ];
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

// src/components/dayGridWeek/alldayGridSelection.tsx
function dayGridWeekSelectionSelector(state) {
  return alldayGridRowSelectionHelper.calculateSelection(state.gridSelection.dayGridWeek);
}
function AlldayGridSelection({ weekDates, narrowWeekend }) {
  const calculatedGridSelection = useStore(dayGridWeekSelectionSelector);
  if (isNil(calculatedGridSelection)) {
    return null;
  }
  return /* @__PURE__ */ v(GridSelection, {
    type: "allday",
    gridSelectionData: calculatedGridSelection,
    weekDates,
    narrowWeekend
  });
}

// ../../node_modules/preact/compat/dist/compat.module.js
function C2(n4, t4) {
  for (var e3 in t4)
    n4[e3] = t4[e3];
  return n4;
}
function S3(n4, t4) {
  for (var e3 in n4)
    if (e3 !== "__source" && !(e3 in t4))
      return true;
  for (var r5 in t4)
    if (r5 !== "__source" && n4[r5] !== t4[r5])
      return true;
  return false;
}
function E2(n4) {
  this.props = n4;
}
function g4(n4, t4) {
  function e3(n5) {
    var e4 = this.props.ref, r6 = e4 == n5.ref;
    return !r6 && e4 && (e4.call ? e4(null) : e4.current = null), t4 ? !t4(this.props, n5) || !r6 : S3(this.props, n5);
  }
  function r5(t5) {
    return this.shouldComponentUpdate = e3, v(n4, t5);
  }
  return r5.displayName = "Memo(" + (n4.displayName || n4.name) + ")", r5.prototype.isReactComponent = true, r5.__f = true, r5;
}
(E2.prototype = new _()).isPureReactComponent = true, E2.prototype.shouldComponentUpdate = function(n4, t4) {
  return S3(this.props, n4) || S3(this.state, t4);
};
var w4 = l.__b;
l.__b = function(n4) {
  n4.type && n4.type.__f && n4.ref && (n4.props.ref = n4.ref, n4.ref = null), w4 && w4(n4);
};
var R2 = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function x4(n4) {
  function t4(t5) {
    var e3 = C2({}, t5);
    return delete e3.ref, n4(e3, t5.ref || null);
  }
  return t4.$$typeof = R2, t4.render = t4, t4.prototype.isReactComponent = t4.__f = true, t4.displayName = "ForwardRef(" + (n4.displayName || n4.name) + ")", t4;
}
var A4 = l.__e;
l.__e = function(n4, t4, e3, r5) {
  if (n4.then) {
    for (var u5, o5 = t4; o5 = o5.__; )
      if ((u5 = o5.__c) && u5.__c)
        return t4.__e == null && (t4.__e = e3.__e, t4.__k = e3.__k), u5.__c(n4, t4);
  }
  A4(n4, t4, e3, r5);
};
var O3 = l.unmount;
function L3() {
  this.__u = 0, this.t = null, this.__b = null;
}
function U2(n4) {
  var t4 = n4.__.__c;
  return t4 && t4.__e && t4.__e(n4);
}
function M3() {
  this.u = null, this.o = null;
}
l.unmount = function(n4) {
  var t4 = n4.__c;
  t4 && t4.__R && t4.__R(), t4 && n4.__h === true && (n4.type = null), O3 && O3(n4);
}, (L3.prototype = new _()).__c = function(n4, t4) {
  var e3 = t4.__c, r5 = this;
  r5.t == null && (r5.t = []), r5.t.push(e3);
  var u5 = U2(r5.__v), o5 = false, i5 = function() {
    o5 || (o5 = true, e3.__R = null, u5 ? u5(l5) : l5());
  };
  e3.__R = i5;
  var l5 = function() {
    if (!--r5.__u) {
      if (r5.state.__e) {
        var n5 = r5.state.__e;
        r5.__v.__k[0] = function n6(t6, e4, r6) {
          return t6 && (t6.__v = null, t6.__k = t6.__k && t6.__k.map(function(t7) {
            return n6(t7, e4, r6);
          }), t6.__c && t6.__c.__P === e4 && (t6.__e && r6.insertBefore(t6.__e, t6.__d), t6.__c.__e = true, t6.__c.__P = r6)), t6;
        }(n5, n5.__c.__P, n5.__c.__O);
      }
      var t5;
      for (r5.setState({ __e: r5.__b = null }); t5 = r5.t.pop(); )
        t5.forceUpdate();
    }
  }, f5 = t4.__h === true;
  r5.__u++ || f5 || r5.setState({ __e: r5.__b = r5.__v.__k[0] }), n4.then(i5, i5);
}, L3.prototype.componentWillUnmount = function() {
  this.t = [];
}, L3.prototype.render = function(n4, t4) {
  if (this.__b) {
    if (this.__v.__k) {
      var e3 = document.createElement("div"), r5 = this.__v.__k[0].__c;
      this.__v.__k[0] = function n5(t5, e4, r6) {
        return t5 && (t5.__c && t5.__c.__H && (t5.__c.__H.__.forEach(function(n6) {
          typeof n6.__c == "function" && n6.__c();
        }), t5.__c.__H = null), (t5 = C2({}, t5)).__c != null && (t5.__c.__P === r6 && (t5.__c.__P = e4), t5.__c = null), t5.__k = t5.__k && t5.__k.map(function(t6) {
          return n5(t6, e4, r6);
        })), t5;
      }(this.__b, e3, r5.__O = r5.__P);
    }
    this.__b = null;
  }
  var u5 = t4.__e && v(d, null, n4.fallback);
  return u5 && (u5.__h = null), [v(d, null, t4.__e ? null : n4.children), u5];
};
var T3 = function(n4, t4, e3) {
  if (++e3[1] === e3[0] && n4.o.delete(t4), n4.props.revealOrder && (n4.props.revealOrder[0] !== "t" || !n4.o.size))
    for (e3 = n4.u; e3; ) {
      for (; e3.length > 3; )
        e3.pop()();
      if (e3[1] < e3[0])
        break;
      n4.u = e3 = e3[2];
    }
};
function D3(n4) {
  return this.getChildContext = function() {
    return n4.context;
  }, n4.children;
}
function I3(n4) {
  var t4 = this, e3 = n4.i;
  t4.componentWillUnmount = function() {
    S(null, t4.l), t4.l = null, t4.i = null;
  }, t4.i && t4.i !== e3 && t4.componentWillUnmount(), n4.__v ? (t4.l || (t4.i = e3, t4.l = { nodeType: 1, parentNode: e3, childNodes: [], appendChild: function(n5) {
    this.childNodes.push(n5), t4.i.appendChild(n5);
  }, insertBefore: function(n5, e4) {
    this.childNodes.push(n5), t4.i.appendChild(n5);
  }, removeChild: function(n5) {
    this.childNodes.splice(this.childNodes.indexOf(n5) >>> 1, 1), t4.i.removeChild(n5);
  } }), S(v(D3, { context: t4.context }, n4.__v), t4.l)) : t4.l && t4.componentWillUnmount();
}
function W2(n4, t4) {
  var e3 = v(I3, { __v: n4, i: t4 });
  return e3.containerInfo = t4, e3;
}
(M3.prototype = new _()).__e = function(n4) {
  var t4 = this, e3 = U2(t4.__v), r5 = t4.o.get(n4);
  return r5[0]++, function(u5) {
    var o5 = function() {
      t4.props.revealOrder ? (r5.push(u5), T3(t4, n4, r5)) : u5();
    };
    e3 ? e3(o5) : o5();
  };
}, M3.prototype.render = function(n4) {
  this.u = null, this.o = /* @__PURE__ */ new Map();
  var t4 = A(n4.children);
  n4.revealOrder && n4.revealOrder[0] === "b" && t4.reverse();
  for (var e3 = t4.length; e3--; )
    this.o.set(t4[e3], this.u = [1, 0, this.u]);
  return n4.children;
}, M3.prototype.componentDidUpdate = M3.prototype.componentDidMount = function() {
  var n4 = this;
  this.o.forEach(function(t4, e3) {
    T3(n4, e3, t4);
  });
};
var P3 = typeof Symbol != "undefined" && Symbol.for && Symbol.for("react.element") || 60103;
var V = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|shape|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var $2 = typeof document != "undefined";
var j4 = function(n4) {
  return (typeof Symbol != "undefined" && typeof Symbol() == "symbol" ? /fil|che|rad/i : /fil|che|ra/i).test(n4);
};
_.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n4) {
  Object.defineProperty(_.prototype, n4, { configurable: true, get: function() {
    return this["UNSAFE_" + n4];
  }, set: function(t4) {
    Object.defineProperty(this, n4, { configurable: true, writable: true, value: t4 });
  } });
});
var H3 = l.event;
function Z2() {
}
function Y2() {
  return this.cancelBubble;
}
function q4() {
  return this.defaultPrevented;
}
l.event = function(n4) {
  return H3 && (n4 = H3(n4)), n4.persist = Z2, n4.isPropagationStopped = Y2, n4.isDefaultPrevented = q4, n4.nativeEvent = n4;
};
var G2;
var J = { configurable: true, get: function() {
  return this.class;
} };
var K = l.vnode;
l.vnode = function(n4) {
  var t4 = n4.type, e3 = n4.props, r5 = e3;
  if (typeof t4 == "string") {
    var u5 = t4.indexOf("-") === -1;
    for (var o5 in r5 = {}, e3) {
      var i5 = e3[o5];
      $2 && o5 === "children" && t4 === "noscript" || o5 === "value" && "defaultValue" in e3 && i5 == null || (o5 === "defaultValue" && "value" in e3 && e3.value == null ? o5 = "value" : o5 === "download" && i5 === true ? i5 = "" : /ondoubleclick/i.test(o5) ? o5 = "ondblclick" : /^onchange(textarea|input)/i.test(o5 + t4) && !j4(e3.type) ? o5 = "oninput" : /^onfocus$/i.test(o5) ? o5 = "onfocusin" : /^onblur$/i.test(o5) ? o5 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o5) ? o5 = o5.toLowerCase() : u5 && V.test(o5) ? o5 = o5.replace(/[A-Z0-9]/, "-$&").toLowerCase() : i5 === null && (i5 = void 0), /^oninput$/i.test(o5) && (o5 = o5.toLowerCase(), r5[o5] && (o5 = "oninputCapture")), r5[o5] = i5);
    }
    t4 == "select" && r5.multiple && Array.isArray(r5.value) && (r5.value = A(e3.children).forEach(function(n5) {
      n5.props.selected = r5.value.indexOf(n5.props.value) != -1;
    })), t4 == "select" && r5.defaultValue != null && (r5.value = A(e3.children).forEach(function(n5) {
      n5.props.selected = r5.multiple ? r5.defaultValue.indexOf(n5.props.value) != -1 : r5.defaultValue == n5.props.value;
    })), n4.props = r5, e3.class != e3.className && (J.enumerable = "className" in e3, e3.className != null && (r5.class = e3.className), Object.defineProperty(r5, "className", J));
  }
  n4.$$typeof = P3, K && K(n4);
};
var Q2 = l.__r;
l.__r = function(n4) {
  Q2 && Q2(n4), G2 = n4.__c;
};
function un2(n4) {
  return !!n4.__k && (S(null, n4), true);
}

// src/components/dayGridWeek/gridCell.tsx
function ExceedCount({ index, exceedCount, isClicked, onClickExceedCount }) {
  const clickExceedCount = () => onClickExceedCount(index);
  const style = { display: isClicked ? "none" : "" };
  return exceedCount && !isClicked ? /* @__PURE__ */ v("span", {
    className: cls("weekday-exceed-in-week"),
    onClick: clickExceedCount,
    style
  }, /* @__PURE__ */ v(Template, {
    template: "weekGridFooterExceed",
    param: exceedCount
  })) : null;
}
function CollapseButton({ isClicked, isClickedIndex, onClickCollapseButton }) {
  return isClicked && isClickedIndex ? /* @__PURE__ */ v("span", {
    className: cls("weekday-exceed-in-week"),
    onClick: onClickCollapseButton
  }, /* @__PURE__ */ v(Template, {
    template: "collapseBtnTitle"
  })) : null;
}
function GridCell({
  width,
  left,
  index,
  exceedCount,
  isClicked,
  onClickExceedCount,
  isClickedIndex,
  onClickCollapseButton,
  isLastCell
}) {
  const { borderRight, backgroundColor } = useTheme(T2((theme) => theme.week.dayGrid, []));
  const style = {
    width,
    left,
    borderRight: isLastCell ? "none" : borderRight,
    backgroundColor
  };
  return /* @__PURE__ */ v("div", {
    className: cls("panel-grid"),
    style
  }, /* @__PURE__ */ v(ExceedCount, {
    index,
    exceedCount,
    isClicked,
    onClickExceedCount
  }), /* @__PURE__ */ v(CollapseButton, {
    isClickedIndex,
    isClicked,
    onClickCollapseButton
  }));
}

// src/components/dayGridWeek/gridCells.tsx
var GridCells = g4(function GridCells2({
  uiModels,
  weekDates,
  narrowWeekend,
  height,
  clickedIndex,
  isClickedCount,
  onClickExceedCount,
  onClickCollapseButton
}) {
  const eventTopMargin = 2;
  const { widthList, leftList } = getGridWidthAndLeftPercentValues(weekDates, narrowWeekend, TOTAL_WIDTH);
  const lastCellIndex = weekDates.length - 1;
  return /* @__PURE__ */ v(d, null, weekDates.map((cell, index) => {
    const width = toPercent(widthList[index]);
    const left = toPercent(leftList[index]);
    const uiModelsInCell = uiModels.filter(isInGrid(cell));
    const exceedCount = getExceedCount(uiModelsInCell, height, EVENT_HEIGHT + eventTopMargin);
    const isClickedIndex = index === clickedIndex;
    const isLastCell = index === lastCellIndex;
    return /* @__PURE__ */ v(GridCell, {
      key: `panel-grid-${cell.getDate()}`,
      width,
      left,
      index,
      exceedCount,
      isClicked: isClickedCount,
      onClickExceedCount,
      isClickedIndex,
      onClickCollapseButton,
      isLastCell
    });
  }));
});

// src/components/events/horizontalEventResizeIcon.tsx
function HorizontalEventResizeIcon({ onMouseDown }) {
  return /* @__PURE__ */ v("span", {
    className: `${cls("weekday-resize-handle")} ${cls("handle-y")}`,
    onMouseDown,
    "data-testid": "horizontal-event-resize-icon"
  }, /* @__PURE__ */ v("i", {
    className: `${cls("icon")} ${cls("ic-handle-y")}`
  }));
}

// src/contexts/layoutContainer.tsx
var LayoutContainerContext = D(null);
var LayoutContainerProvider = LayoutContainerContext.Provider;
var useLayoutContainer = () => {
  const ref = q(LayoutContainerContext);
  if ((0, import_isUndefined2.default)(ref)) {
    throw new Error("LayoutContainerProvider is not found");
  }
  return ref;
};

// src/helpers/drag.ts
var DRAGGING_TYPE_CONSTANTS = {
  panelResizer: "panelResizer"
};
var DRAGGING_TYPE_CREATORS = {
  resizeEvent: (area, id) => `event/${area}/resize/${id}`,
  moveEvent: (area, id) => `event/${area}/move/${id}`,
  gridSelection: (type) => `gridSelection/${type}`
};

// src/hooks/calendar/useCalendarById.ts
function useCalendarById(calendarId) {
  return useStore(T2((state) => state.calendar.calendars.find((cal) => cal.id === calendarId), [calendarId]));
}

// src/hooks/calendar/useCalendarColor.ts
function useCalendarColor(model) {
  var _a;
  const calendar = useCalendarById((_a = model == null ? void 0 : model.calendarId) != null ? _a : null);
  return F(() => ({
    color: calendar == null ? void 0 : calendar.color,
    borderColor: calendar == null ? void 0 : calendar.borderColor,
    backgroundColor: calendar == null ? void 0 : calendar.backgroundColor,
    dragBackgroundColor: calendar == null ? void 0 : calendar.dragBackgroundColor
  }), [calendar]);
}

// src/constants/keyboard.ts
var KEYCODE = {
  ["Escape" /* ESCAPE */]: 27
};

// src/constants/mouse.ts
var MINIMUM_DRAG_MOUSE_DISTANCE = 3;

// src/hooks/common/useTransientUpdate.ts
function useTransientUpdate(selector, subscriber) {
  const store = useInternalStore();
  const selectorRef = s2(selector);
  const subscriberRef = s2(subscriber);
  _2(() => {
    selectorRef.current = selector;
    subscriberRef.current = subscriber;
  }, [selector, subscriber]);
  _2(() => store.subscribe((slice) => subscriberRef.current(slice), (state) => selectorRef.current(state)), [selector, store]);
}

// src/utils/keyboard.ts
function isKeyPressed(e3, key) {
  return e3.key ? e3.key === key : e3.keyCode === KEYCODE[key];
}

// src/hooks/common/useDrag.ts
function isLeftClick(buttonNum) {
  return buttonNum === 0;
}
function isMouseMoved(initX, initY, x6, y4) {
  return Math.abs(initX - x6) >= MINIMUM_DRAG_MOUSE_DISTANCE || Math.abs(initY - y4) >= MINIMUM_DRAG_MOUSE_DISTANCE;
}
function useDrag(draggingItemType, { onInit, onDragStart, onDrag, onMouseUp, onPressESCKey } = {}) {
  const { initDrag, setDragging, cancelDrag, reset } = useDispatch("dnd");
  const store = useInternalStore();
  const dndSliceRef = s2(store.getState().dnd);
  useTransientUpdate(dndSelector, (dndState) => {
    dndSliceRef.current = dndState;
  });
  const [isStarted, setStarted] = y2(false);
  const handleMouseMoveRef = s2(null);
  const handleMouseUpRef = s2(null);
  const handleKeyDownRef = s2(null);
  const handleMouseDown = T2((e3) => {
    if (!isLeftClick(e3.button)) {
      return;
    }
    if (e3.currentTarget) {
      e3.currentTarget.ondragstart = function() {
        return false;
      };
    }
    e3.preventDefault();
    setStarted(true);
    initDrag({
      draggingItemType,
      initX: e3.clientX,
      initY: e3.clientY
    });
    onInit == null ? void 0 : onInit(e3, dndSliceRef.current);
  }, [onInit, draggingItemType, initDrag]);
  const handleMouseMove = T2((e3) => {
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
    if (isPresent(initX) && isPresent(initY) && !isMouseMoved(initX, initY, e3.clientX, e3.clientY)) {
      return;
    }
    if (draggingState <= 1 /* INIT */) {
      setDragging({ x: e3.clientX, y: e3.clientY });
      onDragStart == null ? void 0 : onDragStart(e3, dndSliceRef.current);
      return;
    }
    setDragging({ x: e3.clientX, y: e3.clientY });
    onDrag == null ? void 0 : onDrag(e3, dndSliceRef.current);
  }, [draggingItemType, onDrag, onDragStart, setDragging, reset]);
  const handleMouseUp = T2((e3) => {
    e3.stopPropagation();
    if (isStarted) {
      onMouseUp == null ? void 0 : onMouseUp(e3, dndSliceRef.current);
      setStarted(false);
      reset();
    }
  }, [isStarted, onMouseUp, reset]);
  const handleKeyDown = T2((e3) => {
    if (isKeyPressed(e3, "Escape" /* ESCAPE */)) {
      setStarted(false);
      cancelDrag();
      onPressESCKey == null ? void 0 : onPressESCKey(e3, dndSliceRef.current);
    }
  }, [onPressESCKey, cancelDrag]);
  _2(() => {
    handleMouseMoveRef.current = handleMouseMove;
    handleMouseUpRef.current = handleMouseUp;
    handleKeyDownRef.current = handleKeyDown;
  }, [handleKeyDown, handleMouseMove, handleMouseUp]);
  _2(() => {
    const wrappedHandleMouseMove = (e3) => {
      var _a;
      return (_a = handleMouseMoveRef.current) == null ? void 0 : _a.call(handleMouseMoveRef, e3);
    };
    const wrappedHandleMouseUp = (e3) => {
      var _a;
      return (_a = handleMouseUpRef.current) == null ? void 0 : _a.call(handleMouseUpRef, e3);
    };
    const wrappedHandleKeyDown = (e3) => {
      var _a;
      return (_a = handleKeyDownRef.current) == null ? void 0 : _a.call(handleKeyDownRef, e3);
    };
    if (isStarted) {
      document.addEventListener("mousemove", wrappedHandleMouseMove);
      document.addEventListener("mouseup", wrappedHandleMouseUp);
      document.addEventListener("keydown", wrappedHandleKeyDown);
      return () => {
        document.removeEventListener("mousemove", wrappedHandleMouseMove);
        document.removeEventListener("mouseup", wrappedHandleMouseUp);
        document.removeEventListener("keydown", wrappedHandleKeyDown);
      };
    }
    return noop;
  }, [isStarted, reset]);
  return handleMouseDown;
}

// src/utils/preact.ts
function passConditionalProp(condition, prop) {
  return condition ? prop : void 0;
}

// src/components/events/horizontalEvent.tsx
function getMargins(flat) {
  return {
    vertical: flat ? 5 : 2,
    horizontal: 8
  };
}
function getBorderRadius(exceedLeft, exceedRight) {
  const leftBorderRadius = exceedLeft ? 0 : "2px";
  const rightBorderRadius = exceedRight ? 0 : "2px";
  return `${leftBorderRadius} ${rightBorderRadius} ${rightBorderRadius} ${leftBorderRadius}`;
}
function getEventItemStyle({
  uiModel,
  flat,
  eventHeight,
  isDraggingTarget,
  calendarColor
}) {
  const { exceedLeft, exceedRight } = uiModel;
  const { color, backgroundColor, dragBackgroundColor, borderColor } = getEventColors(uiModel, calendarColor);
  const defaultItemStyle = {
    color,
    backgroundColor: isDraggingTarget ? dragBackgroundColor : backgroundColor,
    borderLeft: exceedLeft ? "none" : `3px solid ${borderColor}`,
    borderRadius: getBorderRadius(exceedLeft, exceedRight),
    overflow: "hidden",
    height: eventHeight,
    lineHeight: toPx(eventHeight),
    opacity: isDraggingTarget ? 0.5 : 1
  };
  const margins = getMargins(flat);
  return flat ? __spreadValues({
    marginTop: margins.vertical
  }, defaultItemStyle) : __spreadValues({
    marginLeft: exceedLeft ? 0 : margins.horizontal,
    marginRight: exceedRight ? 0 : margins.horizontal
  }, defaultItemStyle);
}
function getContainerStyle({
  flat,
  uiModel,
  resizingWidth,
  movingLeft,
  eventHeight,
  headerHeight
}) {
  const { top, left, width, model } = uiModel;
  const margins = getMargins(flat);
  const baseStyle = flat ? {} : {
    width: resizingWidth || toPercent(width),
    left: toPercent(movingLeft != null ? movingLeft : left),
    top: (top - 1) * (eventHeight + margins.vertical) + headerHeight,
    position: "absolute"
  };
  return Object.assign(baseStyle, model.customStyle);
}
function getTestId({ model }) {
  const calendarId = model.calendarId ? `${model.calendarId}-` : "";
  const id = model.id ? `${model.id}-` : "";
  return `${calendarId}${id}${model.title}`;
}
var classNames = {
  eventBody: cls("weekday-event"),
  eventTitle: cls("weekday-event-title"),
  eventDot: cls("weekday-event-dot"),
  moveEvent: cls("dragging--move-event"),
  resizeEvent: cls("dragging--resize-horizontal-event")
};
function HorizontalEvent({
  flat = false,
  uiModel,
  eventHeight,
  headerHeight,
  resizingWidth = null,
  movingLeft = null
}) {
  const { currentView } = useStore(viewSelector);
  const { useDetailPopup, isReadOnly: isReadOnlyCalendar } = useStore(optionsSelector);
  const { setDraggingEventUIModel } = useDispatch("dnd");
  const { showDetailPopup } = useDispatch("popup");
  const layoutContainer = useLayoutContainer();
  const eventBus = useEventBus();
  const calendarColor = useCalendarColor(uiModel.model);
  const [isDraggingTarget, setIsDraggingTarget] = y2(false);
  const eventContainerRef = s2(null);
  const { isReadOnly, id, calendarId } = uiModel.model;
  const isDraggableEvent2 = !isReadOnlyCalendar && !isReadOnly && isNil(resizingWidth) && isNil(movingLeft);
  const startDragEvent = (className2) => {
    setDraggingEventUIModel(uiModel);
    layoutContainer == null ? void 0 : layoutContainer.classList.add(className2);
  };
  const endDragEvent = (className2) => {
    setIsDraggingTarget(false);
    layoutContainer == null ? void 0 : layoutContainer.classList.remove(className2);
  };
  useTransientUpdate(dndSelector, ({ draggingEventUIModel, draggingState }) => {
    if (draggingState === 2 /* DRAGGING */ && (draggingEventUIModel == null ? void 0 : draggingEventUIModel.cid()) === uiModel.cid() && isNil(resizingWidth) && isNil(movingLeft)) {
      setIsDraggingTarget(true);
    } else {
      setIsDraggingTarget(false);
    }
  });
  _2(() => {
    if (isDraggableEvent2) {
      eventBus.fire("afterRenderEvent", uiModel.model.toEventObject());
    }
  }, []);
  const onResizeStart = useDrag(DRAGGING_TYPE_CREATORS.resizeEvent("dayGrid", `${uiModel.cid()}`), {
    onDragStart: () => startDragEvent(classNames.resizeEvent),
    onMouseUp: () => endDragEvent(classNames.resizeEvent),
    onPressESCKey: () => endDragEvent(classNames.resizeEvent)
  });
  const onMoveStart = useDrag(DRAGGING_TYPE_CREATORS.moveEvent("dayGrid", `${uiModel.cid()}`), {
    onDragStart: () => {
      if (isDraggableEvent2) {
        startDragEvent(classNames.moveEvent);
      }
    },
    onMouseUp: (e3, { draggingState }) => {
      endDragEvent(classNames.moveEvent);
      const isClick = draggingState <= 1 /* INIT */;
      if (isClick && useDetailPopup && eventContainerRef.current) {
        showDetailPopup({
          event: uiModel.model,
          eventRect: eventContainerRef.current.getBoundingClientRect()
        }, flat);
      }
      eventBus.fire("clickEvent", { event: uiModel.model.toEventObject(), nativeEvent: e3 });
    },
    onPressESCKey: () => endDragEvent(classNames.moveEvent)
  });
  const handleResizeStart = (e3) => {
    e3.stopPropagation();
    if (isDraggableEvent2) {
      onResizeStart(e3);
    }
  };
  const handleMoveStart = (e3) => {
    e3.stopPropagation();
    onMoveStart(e3);
  };
  const isDotEvent = !isDraggingTarget && currentView === "month" && uiModel.model.category === "time" && isSameDate(uiModel.model.start, uiModel.model.end);
  const shouldHideResizeHandler = !isDraggableEvent2 || flat || isDraggingTarget || uiModel.exceedRight;
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
  return /* @__PURE__ */ v("div", {
    className: cls("weekday-event-block", {
      "weekday-exceed-left": uiModel.exceedLeft,
      "weekday-exceed-right": uiModel.exceedRight
    }),
    style: containerStyle,
    "data-testid": passConditionalProp(isDraggableEvent2, getTestId(uiModel)),
    "data-calendar-id": calendarId,
    "data-event-id": id,
    ref: eventContainerRef
  }, /* @__PURE__ */ v("div", {
    className: classNames.eventBody,
    style: __spreadProps(__spreadValues({}, eventItemStyle), {
      backgroundColor: isDotEvent ? null : eventItemStyle.backgroundColor,
      borderLeft: isDotEvent ? null : eventItemStyle.borderLeft
    }),
    onMouseDown: handleMoveStart
  }, isDotEvent ? /* @__PURE__ */ v("span", {
    className: classNames.eventDot,
    style: { backgroundColor: eventItemStyle.backgroundColor }
  }) : null, /* @__PURE__ */ v("span", {
    className: classNames.eventTitle
  }, /* @__PURE__ */ v(Template, {
    template: uiModel.model.category,
    param: uiModel.model
  })), !shouldHideResizeHandler ? /* @__PURE__ */ v(HorizontalEventResizeIcon, {
    onMouseDown: handleResizeStart
  }) : null));
}

// src/hooks/common/useWhen.ts
function useWhen(callback, condition) {
  const callbackRef = s2(callback);
  _2(() => {
    callbackRef.current = callback;
  }, [callback]);
  _2(() => {
    const invoke = () => callbackRef.current();
    if (condition) {
      invoke();
    }
  }, [condition]);
}

// src/hooks/event/useCurrentPointerPositionInGrid.ts
function useCurrentPointerPositionInGrid(gridPositionFinder) {
  const [currentGridPos, setCurrentGridPos] = y2(null);
  useTransientUpdate(dndSelector, (dndState) => {
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
  const clearCurrentGridPos = T2(() => setCurrentGridPos(null), []);
  return [currentGridPos, clearCurrentGridPos];
}

// src/hooks/event/useDraggingEvent.ts
var getTargetEventId = (itemType, area, behavior) => {
  function isEventDraggingType(_itemType) {
    return new RegExp(`^event/${area}/${behavior}/\\d+$`).test(_itemType);
  }
  if (isNil(itemType)) {
    return null;
  }
  return isEventDraggingType(itemType) ? last(itemType.split("/")) : null;
};
function useDraggingEvent(area, behavior) {
  const [isDraggingEnd, setIsDraggingEnd] = y2(false);
  const [isDraggingCanceled, setIsDraggingCanceled] = y2(false);
  const [draggingEvent, setDraggingEvent] = y2(null);
  useTransientUpdate(dndSelector, ({ draggingItemType, draggingEventUIModel, draggingState }) => {
    const targetEventId = getTargetEventId(draggingItemType, area, behavior);
    const hasMatchingTargetEvent = Number(targetEventId) === (draggingEventUIModel == null ? void 0 : draggingEventUIModel.cid());
    const isIdle = draggingState === 0 /* IDLE */;
    const isCanceled = draggingState === 3 /* CANCELED */;
    if (isNil(draggingEvent) && hasMatchingTargetEvent) {
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

// src/hooks/dayGridWeek/useAlldayGridRowEventMove.ts
function useAlldayGridRowEventMove({ rowStyleInfo, gridPositionFinder }) {
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: movingEvent,
    clearDraggingEvent
  } = useDraggingEvent("dayGrid", "move");
  const startGridXRef = s2(null);
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const { columnIndex } = currentGridPos != null ? currentGridPos : {};
  const targetEventStartGridX = F(() => isNil(movingEvent) ? null : rowStyleInfo.findIndex(({ left }) => left === movingEvent.left), [rowStyleInfo, movingEvent]);
  const currentMovingLeft = F(() => {
    if (isNil(columnIndex) || isNil(startGridXRef.current) || isNil(targetEventStartGridX)) {
      return null;
    }
    const newColumnIndex = targetEventStartGridX + columnIndex - startGridXRef.current;
    return newColumnIndex < 0 ? -rowStyleInfo[-newColumnIndex].left : rowStyleInfo[newColumnIndex].left;
  }, [columnIndex, rowStyleInfo, targetEventStartGridX]);
  _2(() => {
    if (isNil(startGridXRef.current) && isPresent(columnIndex)) {
      startGridXRef.current = columnIndex;
    }
  }, [columnIndex]);
  useWhen(() => {
    const shouldUpdate = !isDraggingCanceled && isPresent(movingEvent) && isPresent(columnIndex) && isPresent(currentMovingLeft) && columnIndex !== startGridXRef.current;
    if (shouldUpdate && isPresent(startGridXRef.current)) {
      const dateOffset = columnIndex - startGridXRef.current;
      const newStartDate = new TZDate(movingEvent.model.getStarts());
      const newEndDate = new TZDate(movingEvent.model.getEnds());
      newStartDate.addDate(dateOffset);
      newEndDate.addDate(dateOffset);
      eventBus.fire("beforeUpdateEvent", {
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

// src/components/dayGridWeek/movingEventShadow.tsx
function MovingEventShadow({
  rowStyleInfo,
  gridPositionFinder
}) {
  const { movingEvent, movingLeft } = useAlldayGridRowEventMove({
    rowStyleInfo,
    gridPositionFinder
  });
  if (isNil(movingEvent)) {
    return null;
  }
  return /* @__PURE__ */ v(HorizontalEvent, {
    uiModel: movingEvent,
    eventHeight: EVENT_HEIGHT,
    headerHeight: 0,
    movingLeft
  });
}

// src/hooks/dayGridWeek/useAlldayGridRowEventResize.ts
function getEventColIndex(uiModel, row) {
  const start = getGridDateIndex(uiModel.getStarts(), row);
  const end = getGridDateIndex(uiModel.getEnds(), row);
  return { start, end };
}
function useAlldayGridRowEventResize({
  weekDates,
  gridColWidthMap,
  gridPositionFinder
}) {
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: resizingEvent,
    clearDraggingEvent
  } = useDraggingEvent("dayGrid", "resize");
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const { columnIndex } = currentGridPos != null ? currentGridPos : {};
  const targetEventGridIndices = F(() => {
    if (resizingEvent) {
      return getEventColIndex(resizingEvent, weekDates);
    }
    return { start: -1, end: -1 };
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
      eventBus.fire("beforeUpdateEvent", {
        event: resizingEvent.model.toEventObject(),
        changes: { end: targetDate }
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

// src/components/dayGridWeek/resizingEventShadow.tsx
function ResizingEventShadow({ weekDates, gridColWidthMap, gridPositionFinder }) {
  const { resizingEvent, resizingWidth } = useAlldayGridRowEventResize({
    weekDates,
    gridColWidthMap,
    gridPositionFinder
  });
  if (isNil(resizingEvent)) {
    return null;
  }
  return /* @__PURE__ */ v(HorizontalEvent, {
    uiModel: resizingEvent,
    eventHeight: EVENT_HEIGHT,
    headerHeight: 0,
    resizingWidth
  });
}

// src/hooks/common/useDOMNode.ts
function useDOMNode() {
  const [node, setNode] = y2(null);
  const setNodeRef = T2((ref) => {
    if (ref) {
      setNode(ref);
    }
  }, []);
  return [node, setNodeRef];
}

// src/hooks/dayGridWeek/useGridRowHeightController.ts
function useGridRowHeightController(maxTop, category) {
  const [clickedIndex, setClickedIndex] = y2(0);
  const [isClickedCount, setClickedCount] = y2(false);
  const { updateDayGridRowHeight } = useDispatch("weekViewLayout");
  const onClickExceedCount = T2((index) => {
    setClickedCount(true);
    setClickedIndex(index);
    updateDayGridRowHeight({
      rowName: category,
      height: (maxTop + 1) * EVENT_HEIGHT
    });
  }, [category, maxTop, updateDayGridRowHeight]);
  const onClickCollapseButton = T2(() => {
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

// src/utils/requestTimeout.ts
function requestTimeout(fn2, delay, registerCancel) {
  let start;
  const loop = (timestamp) => {
    if (!start) {
      start = timestamp;
    }
    const elapsed = timestamp - start;
    if (elapsed >= delay) {
      fn2();
      registerCancel(noop);
      return;
    }
    const raf2 = requestAnimationFrame(loop);
    registerCancel(() => cancelAnimationFrame(raf2));
  };
  const raf = requestAnimationFrame(loop);
  registerCancel(() => cancelAnimationFrame(raf));
}

// src/hooks/common/useClickPrevention.ts
function useClickPrevention({
  onClick,
  onDblClick,
  delay = 300
}) {
  const cancelCallback = s2(noop);
  const registerCancel = (fn2) => {
    cancelCallback.current = fn2;
  };
  const cancelScheduledWork = () => {
    cancelCallback.current();
  };
  _2(() => cancelScheduledWork, []);
  const handleClick = (e3) => {
    cancelScheduledWork();
    requestTimeout(onClick.bind(null, e3), delay, registerCancel);
  };
  const handleDblClick = (e3) => {
    cancelScheduledWork();
    onDblClick(e3);
  };
  return [handleClick, handleDblClick];
}

// src/hooks/gridSelection/useGridSelection.ts
var GRID_SELECTION_TYPE_MAP = {
  dayGridMonth: "month",
  dayGridWeek: "allday",
  timeGrid: "time"
};
function sortDates(a5, b4) {
  const isIncreased = a5 < b4;
  return isIncreased ? [a5, b4] : [b4, a5];
}
function useGridSelection({
  type,
  selectionSorter,
  dateGetter,
  dateCollection,
  gridPositionFinder
}) {
  const { useFormPopup, gridSelection: gridSelectionOptions } = useStore(optionsSelector);
  const { enableDblClick, enableClick } = gridSelectionOptions;
  const { setGridSelection, addGridSelection, clearAll } = useDispatch("gridSelection");
  const { hideAllPopup, showFormPopup } = useDispatch("popup");
  const eventBus = useEventBus();
  const layoutContainer = useLayoutContainer();
  const [initMousePosition, setInitMousePosition] = y2(null);
  const [initGridPosition, setInitGridPosition] = y2(null);
  const isSelectingGridRef = s2(false);
  const gridSelectionRef = s2(null);
  useTransientUpdate(T2((state) => state.gridSelection[type], [type]), (gridSelection) => {
    gridSelectionRef.current = gridSelection;
  });
  useTransientUpdate(dndSelector, ({ draggingState, draggingItemType }) => {
    isSelectingGridRef.current = draggingItemType === currentGridSelectionType && draggingState >= 1 /* INIT */;
  });
  const currentGridSelectionType = DRAGGING_TYPE_CREATORS.gridSelection(type);
  const setGridSelectionByPosition = (e3) => {
    const gridPosition = gridPositionFinder(e3);
    if (isPresent(initGridPosition) && isPresent(gridPosition)) {
      setGridSelection(type, selectionSorter(initGridPosition, gridPosition));
    }
  };
  const [handleClickWithDebounce, handleDblClickPreventingClick] = useClickPrevention({
    onClick: (e3) => {
      if (enableClick) {
        onMouseUp(e3, true);
      }
    },
    onDblClick: (e3) => {
      if (enableDblClick) {
        onMouseUp(e3, true);
      }
    },
    delay: 250
  });
  const onMouseUpWithClick = (e3) => {
    const isClick = e3.detail <= 1;
    if (!enableClick && (!enableDblClick || isClick)) {
      return;
    }
    if (enableClick) {
      if (isClick) {
        handleClickWithDebounce(e3);
      } else {
        handleDblClickPreventingClick(e3);
      }
      return;
    }
    onMouseUp(e3, true);
  };
  const onMouseUp = (e3, isClickEvent) => {
    var _a;
    if (isClickEvent) {
      setGridSelectionByPosition(e3);
    }
    if (isPresent(gridSelectionRef.current)) {
      const [startDate, endDate] = sortDates(...dateGetter(dateCollection, gridSelectionRef.current));
      if (useFormPopup && isPresent(initMousePosition)) {
        const popupArrowPointPosition = {
          top: (e3.clientY + initMousePosition.y) / 2,
          left: (e3.clientX + initMousePosition.x) / 2
        };
        showFormPopup({
          isCreationPopup: true,
          title: "",
          location: "",
          start: startDate,
          end: endDate,
          isAllday: type !== "timeGrid",
          isPrivate: false,
          popupArrowPointPosition,
          close: clearAll
        });
      }
      const gridSelectionSelector = `.${cls(GRID_SELECTION_TYPE_MAP[type])}.${cls("grid-selection")}`;
      const gridSelectionElements = Array.from((_a = layoutContainer == null ? void 0 : layoutContainer.querySelectorAll(gridSelectionSelector)) != null ? _a : []);
      eventBus.fire("selectDateTime", {
        start: startDate.toDate(),
        end: endDate.toDate(),
        isAllday: type !== "timeGrid",
        nativeEvent: e3,
        gridSelectionElements
      });
    }
  };
  const clearGridSelection = T2(() => {
    setInitMousePosition(null);
    setInitGridPosition(null);
    setGridSelection(type, null);
  }, [setGridSelection, type]);
  const onMouseDown = useDrag(currentGridSelectionType, {
    onInit: (e3) => {
      if (useFormPopup) {
        setInitMousePosition({
          x: e3.clientX,
          y: e3.clientY
        });
        hideAllPopup();
      }
      const gridPosition = gridPositionFinder(e3);
      if (isPresent(gridPosition)) {
        setInitGridPosition(gridPosition);
      }
      if (!useFormPopup) {
        addGridSelection(type, gridSelectionRef.current);
      }
    },
    onDragStart: (e3) => {
      setGridSelectionByPosition(e3);
    },
    onDrag: (e3) => {
      if (isSelectingGridRef.current) {
        setGridSelectionByPosition(e3);
      }
    },
    onMouseUp: (e3, { draggingState }) => {
      e3.stopPropagation();
      const isClickEvent = draggingState <= 1 /* INIT */;
      if (isClickEvent) {
        onMouseUpWithClick(e3);
      } else {
        onMouseUp(e3, isClickEvent);
      }
    },
    onPressESCKey: clearGridSelection
  });
  _2(() => clearGridSelection, [clearGridSelection]);
  return onMouseDown;
}

// src/components/dayGridWeek/alldayGridRow.tsx
var rowTitleTemplate = `alldayTitle`;
function AlldayGridRow({
  events,
  weekDates,
  height = DEFAULT_PANEL_HEIGHT,
  options = {},
  rowStyleInfo,
  gridColWidthMap
}) {
  const { isReadOnly } = useStore(optionsSelector);
  const dayGridLeftTheme = useTheme(weekDayGridLeftSelector);
  const [panelContainer, setPanelContainerRef] = useDOMNode();
  const { narrowWeekend = false } = options;
  const maxTop = F(() => Math.max(0, ...events.map(({ top }) => top)), [events]);
  const gridPositionFinder = F(() => createGridPositionFinder({
    container: panelContainer,
    rowsCount: 1,
    columnsCount: weekDates.length
  }), [weekDates, panelContainer]);
  const { clickedIndex, isClickedCount, onClickExceedCount, onClickCollapseButton } = useGridRowHeightController(maxTop, "allday");
  const horizontalEvents = F(() => events.filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP)).map((uiModel) => /* @__PURE__ */ v(HorizontalEvent, {
    key: `allday-DayEvent-${uiModel.cid()}`,
    uiModel,
    eventHeight: EVENT_HEIGHT,
    headerHeight: 0
  })), [events, height]);
  const startGridSelection = useGridSelection({
    type: "dayGridWeek",
    gridPositionFinder,
    dateCollection: weekDates,
    selectionSorter: alldayGridRowSelectionHelper.sortSelection,
    dateGetter: alldayGridRowSelectionHelper.getDateFromCollection
  });
  const onMouseDown = (e3) => {
    const target = e3.target;
    if (isReadOnly || !target.classList.contains(cls("panel-grid"))) {
      return;
    }
    startGridSelection(e3);
  };
  return /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("div", {
    className: cls("panel-title"),
    style: dayGridLeftTheme
  }, /* @__PURE__ */ v(Template, {
    template: rowTitleTemplate,
    param: "alldayTitle"
  })), /* @__PURE__ */ v("div", {
    className: cls("allday-panel"),
    ref: setPanelContainerRef,
    onMouseDown
  }, /* @__PURE__ */ v("div", {
    className: cls("panel-grid-wrapper")
  }, /* @__PURE__ */ v(GridCells, {
    uiModels: events,
    weekDates,
    narrowWeekend,
    height,
    clickedIndex,
    isClickedCount,
    onClickExceedCount,
    onClickCollapseButton
  })), /* @__PURE__ */ v("div", {
    className: cls(`panel-allday-events`)
  }, horizontalEvents), /* @__PURE__ */ v(ResizingEventShadow, {
    weekDates,
    gridPositionFinder,
    gridColWidthMap
  }), /* @__PURE__ */ v(MovingEventShadow, {
    rowStyleInfo,
    gridPositionFinder
  }), /* @__PURE__ */ v(AlldayGridSelection, {
    weekDates,
    narrowWeekend
  })));
}

// src/components/dayGridWeek/otherGridRow.tsx
function OtherGridRow({
  events,
  weekDates,
  category,
  height = DEFAULT_PANEL_HEIGHT,
  options = {}
}) {
  const dayGridLeftTheme = useTheme(weekDayGridLeftSelector);
  const maxTop = F(() => Math.max(0, ...events.map(({ top }) => top)), [events]);
  const { narrowWeekend = false } = options;
  const rowTitleTemplate2 = `${category}Title`;
  const { clickedIndex, isClickedCount, onClickExceedCount, onClickCollapseButton } = useGridRowHeightController(maxTop, category);
  const horizontalEvents = F(() => events.filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP)).map((uiModel) => /* @__PURE__ */ v(HorizontalEvent, {
    key: `${category}-DayEvent-${uiModel.cid()}`,
    uiModel,
    eventHeight: EVENT_HEIGHT,
    headerHeight: 0
  })), [category, events, height]);
  return /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("div", {
    className: cls("panel-title"),
    style: dayGridLeftTheme
  }, /* @__PURE__ */ v(Template, {
    template: rowTitleTemplate2,
    param: category
  })), /* @__PURE__ */ v("div", {
    className: cls("allday-panel")
  }, /* @__PURE__ */ v("div", {
    className: cls("panel-grid-wrapper")
  }, /* @__PURE__ */ v(GridCells, {
    uiModels: events,
    weekDates,
    narrowWeekend,
    height,
    clickedIndex,
    isClickedCount,
    onClickExceedCount,
    onClickCollapseButton
  })), /* @__PURE__ */ v("div", {
    className: cls(`panel-${category}-events`)
  }, horizontalEvents)));
}

// src/components/popup/eventDetailSectionDetail.tsx
var classNames2 = {
  detailItem: cls("detail-item"),
  detailItemIndent: cls("detail-item", "detail-item-indent"),
  detailItemSeparate: cls("detail-item", "detail-item-separate"),
  sectionDetail: cls("popup-section", "section-detail"),
  content: cls("content"),
  locationIcon: cls("icon", "ic-location-b"),
  repeatIcon: cls("icon", "ic-repeat-b"),
  userIcon: cls("icon", "ic-user-b"),
  stateIcon: cls("icon", "ic-state-b"),
  calendarDotIcon: cls("icon", "calendar-dot")
};
function EventDetailSectionDetail({ event }) {
  var _a, _b;
  const { location: location2, recurrenceRule, attendees, state, calendarId, body } = event;
  const calendar = useCalendarById(calendarId);
  return /* @__PURE__ */ v("div", {
    className: classNames2.sectionDetail
  }, location2 && /* @__PURE__ */ v("div", {
    className: classNames2.detailItem
  }, /* @__PURE__ */ v("span", {
    className: classNames2.locationIcon
  }), /* @__PURE__ */ v("span", {
    className: classNames2.content
  }, /* @__PURE__ */ v(Template, {
    template: "popupDetailLocation",
    param: event,
    as: "span"
  }))), recurrenceRule && /* @__PURE__ */ v("div", {
    className: classNames2.detailItem
  }, /* @__PURE__ */ v("span", {
    className: classNames2.repeatIcon
  }), /* @__PURE__ */ v("span", {
    className: classNames2.content
  }, /* @__PURE__ */ v(Template, {
    template: "popupDetailRecurrenceRule",
    param: event,
    as: "span"
  }))), attendees && /* @__PURE__ */ v("div", {
    className: classNames2.detailItemIndent
  }, /* @__PURE__ */ v("span", {
    className: classNames2.userIcon
  }), /* @__PURE__ */ v("span", {
    className: classNames2.content
  }, /* @__PURE__ */ v(Template, {
    template: "popupDetailAttendees",
    param: event,
    as: "span"
  }))), state && /* @__PURE__ */ v("div", {
    className: classNames2.detailItem
  }, /* @__PURE__ */ v("span", {
    className: classNames2.stateIcon
  }), /* @__PURE__ */ v("span", {
    className: classNames2.content
  }, /* @__PURE__ */ v(Template, {
    template: "popupDetailState",
    param: event,
    as: "span"
  }))), calendar && /* @__PURE__ */ v("div", {
    className: classNames2.detailItem
  }, /* @__PURE__ */ v("span", {
    className: classNames2.calendarDotIcon,
    style: {
      backgroundColor: (_a = calendar == null ? void 0 : calendar.backgroundColor) != null ? _a : ""
    }
  }), /* @__PURE__ */ v("span", {
    className: classNames2.content
  }, (_b = calendar == null ? void 0 : calendar.name) != null ? _b : "")), body && /* @__PURE__ */ v("div", {
    className: classNames2.detailItemSeparate
  }, /* @__PURE__ */ v("span", {
    className: classNames2.content
  }, /* @__PURE__ */ v(Template, {
    template: "popupDetailBody",
    param: event,
    as: "span"
  }))));
}

// src/components/popup/eventDetailSectionHeader.tsx
var classNames3 = {
  sectionHeader: cls("popup-section", "section-header"),
  content: cls("content"),
  eventTitle: cls("event-title")
};
function EventDetailSectionHeader({ event }) {
  return /* @__PURE__ */ v("div", {
    className: classNames3.sectionHeader
  }, /* @__PURE__ */ v("div", {
    className: classNames3.eventTitle
  }, /* @__PURE__ */ v(Template, {
    template: "popupDetailTitle",
    param: event,
    as: "span"
  })), /* @__PURE__ */ v("div", {
    className: classNames3.content
  }, /* @__PURE__ */ v(Template, {
    template: "popupDetailDate",
    param: event,
    as: "span"
  })));
}

// src/constants/popup.ts
var SEE_MORE_POPUP_SLOT_CLASS_NAME = cls("see-more-popup-slot");
var EVENT_FORM_POPUP_SLOT_CLASS_NAME = cls("event-form-popup-slot");
var EVENT_DETAIL_POPUP_SLOT_CLASS_NAME = cls("event-detail-popup-slot");
var HALF_OF_POPUP_ARROW_HEIGHT = 8;
var BOOLEAN_KEYS_OF_EVENT_MODEL_DATA = [
  "isPrivate",
  "isAllday",
  "isPending",
  "isFocused",
  "isVisible",
  "isReadOnly"
];

// src/contexts/floatingLayer.tsx
var FloatingLayerContext = D(null);
function FloatingLayerProvider({ children }) {
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
  return /* @__PURE__ */ v(FloatingLayerContext.Provider, {
    value: floatingLayer
  }, children, /* @__PURE__ */ v("div", {
    ref: containerRefCallback,
    className: cls("floating-layer")
  }, /* @__PURE__ */ v("div", {
    ref: seeMorePopupSlotRefCallback,
    className: SEE_MORE_POPUP_SLOT_CLASS_NAME
  }), /* @__PURE__ */ v("div", {
    ref: formPopupSlotRefCallback,
    className: EVENT_FORM_POPUP_SLOT_CLASS_NAME
  }), /* @__PURE__ */ v("div", {
    ref: detailPopupSlotRefCallback,
    className: EVENT_DETAIL_POPUP_SLOT_CLASS_NAME
  })));
}
var useFloatingLayer = (floatingLayerType) => {
  var _a;
  const floatingLayers = q(FloatingLayerContext);
  if ((0, import_isUndefined2.default)(floatingLayers)) {
    throw new Error("FloatingLayerProvider is not found");
  }
  return (_a = floatingLayers == null ? void 0 : floatingLayers[floatingLayerType]) != null ? _a : null;
};

// src/helpers/popup.ts
function isTopOutOfLayout(top, layoutRect, popupRect) {
  return top + popupRect.height > layoutRect.top + layoutRect.height;
}
function isLeftOutOfLayout(left, layoutRect, popupRect) {
  return left + popupRect.width > layoutRect.left + layoutRect.width;
}

// src/selectors/popup.ts
var eventFormPopupParamSelector = (state) => {
  return state.popup["form" /* Form */];
};
var eventDetailPopupParamSelector = (state) => {
  return state.popup["detail" /* Detail */];
};
var seeMorePopupParamSelector = (state) => {
  return state.popup["seeMore" /* SeeMore */];
};

// src/components/popup/eventDetailPopup.tsx
var classNames4 = {
  popupContainer: cls("popup-container"),
  detailContainer: cls("detail-container"),
  topLine: cls("popup-top-line"),
  border: cls("popup-arrow-border"),
  fill: cls("popup-arrow-fill"),
  sectionButton: cls("popup-section", "section-button"),
  content: cls("content"),
  editIcon: cls("icon", "ic-edit"),
  deleteIcon: cls("icon", "ic-delete"),
  editButton: cls("edit-button"),
  deleteButton: cls("delete-button"),
  verticalLine: cls("vertical-line")
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
  return [Math.max(top, layoutRect.top), Math.max(left, layoutRect.left)];
}
function calculatePopupArrowPosition(eventRect, layoutRect, popupRect) {
  const top = eventRect.top + eventRect.height / 2;
  const popupLeft = eventRect.left + eventRect.width;
  const isOutOfLayout = popupLeft + popupRect.width > layoutRect.left + layoutRect.width;
  const direction = isOutOfLayout ? "right" /* right */ : "left" /* left */;
  return { top, direction };
}
function EventDetailPopup() {
  const popupParams = useStore(eventDetailPopupParamSelector);
  const { event, eventRect } = popupParams != null ? popupParams : {};
  const { showFormPopup, hideDetailPopup } = useDispatch("popup");
  const calendarColor = useCalendarColor(event);
  const layoutContainer = useLayoutContainer();
  const detailPopupSlot = useFloatingLayer("detailPopupSlot");
  const eventBus = useEventBus();
  const popupContainerRef = s2(null);
  const [style, setStyle] = y2({});
  const [arrowTop, setArrowTop] = y2(0);
  const [arrowDirection, setArrowDirection] = y2("left" /* left */);
  const popupArrowClassName = F(() => {
    const right = arrowDirection === "right" /* right */;
    const left = arrowDirection === "left" /* left */;
    return cls("popup-arrow", { right, left });
  }, [arrowDirection]);
  h2(() => {
    if (popupContainerRef.current && eventRect && layoutContainer) {
      const layoutRect = layoutContainer.getBoundingClientRect();
      const popupRect = popupContainerRef.current.getBoundingClientRect();
      const [top, left] = calculatePopupPosition(eventRect, layoutRect, popupRect);
      const { top: arrowTopPosition, direction } = calculatePopupArrowPosition(eventRect, layoutRect, popupRect);
      setStyle({ top, left });
      setArrowTop(arrowTopPosition - top - HALF_OF_POPUP_ARROW_HEIGHT);
      setArrowDirection(direction);
    }
  }, [eventRect, layoutContainer]);
  if (isNil(event) || isNil(eventRect) || isNil(detailPopupSlot)) {
    return null;
  }
  const {
    title = "",
    isAllday: isAllday2 = false,
    start = new TZDate(),
    end = new TZDate(),
    location: location2,
    state,
    isReadOnly,
    isPrivate
  } = event;
  const popupArrowPointPosition = {
    top: eventRect.top + eventRect.height / 2,
    left: eventRect.left + eventRect.width / 2
  };
  const onClickEditButton = () => showFormPopup({
    isCreationPopup: false,
    event,
    title,
    location: location2,
    start,
    end,
    isAllday: isAllday2,
    isPrivate,
    eventState: state,
    popupArrowPointPosition
  });
  const onClickDeleteButton = () => {
    eventBus.fire("beforeDeleteEvent", event.toEventObject());
    hideDetailPopup();
  };
  return W2(/* @__PURE__ */ v("div", {
    role: "dialog",
    className: classNames4.popupContainer,
    ref: popupContainerRef,
    style
  }, /* @__PURE__ */ v("div", {
    className: classNames4.detailContainer
  }, /* @__PURE__ */ v(EventDetailSectionHeader, {
    event
  }), /* @__PURE__ */ v(EventDetailSectionDetail, {
    event
  }), !isReadOnly && /* @__PURE__ */ v("div", {
    className: classNames4.sectionButton
  }, /* @__PURE__ */ v("button", {
    type: "button",
    className: classNames4.editButton,
    onClick: onClickEditButton
  }, /* @__PURE__ */ v("span", {
    className: classNames4.editIcon
  }), /* @__PURE__ */ v("span", {
    className: classNames4.content
  }, /* @__PURE__ */ v(Template, {
    template: "popupEdit",
    as: "span"
  }))), /* @__PURE__ */ v("div", {
    className: classNames4.verticalLine
  }), /* @__PURE__ */ v("button", {
    type: "button",
    className: classNames4.deleteButton,
    onClick: onClickDeleteButton
  }, /* @__PURE__ */ v("span", {
    className: classNames4.deleteIcon
  }), /* @__PURE__ */ v("span", {
    className: classNames4.content
  }, /* @__PURE__ */ v(Template, {
    template: "popupDelete",
    as: "span"
  }))))), /* @__PURE__ */ v("div", {
    className: classNames4.topLine,
    style: { backgroundColor: calendarColor.backgroundColor }
  }), /* @__PURE__ */ v("div", {
    className: popupArrowClassName
  }, /* @__PURE__ */ v("div", {
    className: classNames4.border,
    style: { top: arrowTop }
  }, /* @__PURE__ */ v("div", {
    className: classNames4.fill
  })))), detailPopupSlot);
}

// src/components/popup/calendarDropdownMenu.tsx
var classNames5 = {
  dropdownMenu: cls("dropdown-menu"),
  dropdownMenuItem: cls("dropdown-menu-item"),
  dotIcon: cls("icon", "dot"),
  content: cls("content")
};
function DropdownMenuItem({ index, name, backgroundColor, onClick }) {
  return /* @__PURE__ */ v("li", {
    className: classNames5.dropdownMenuItem,
    onClick: (e3) => onClick(e3, index)
  }, /* @__PURE__ */ v("span", {
    className: classNames5.dotIcon,
    style: { backgroundColor }
  }), /* @__PURE__ */ v("span", {
    className: classNames5.content
  }, name));
}
function CalendarDropdownMenu({ calendars, setOpened, onChangeIndex }) {
  const handleDropdownMenuItemClick = (e3, index) => {
    e3.stopPropagation();
    setOpened(false);
    onChangeIndex(index);
  };
  return /* @__PURE__ */ v("ul", {
    className: classNames5.dropdownMenu
  }, calendars.map(({ name, backgroundColor = "000" }, index) => /* @__PURE__ */ v(DropdownMenuItem, {
    key: `dropdown-${name}-${index}`,
    index,
    name,
    backgroundColor,
    onClick: handleDropdownMenuItemClick
  })));
}

// src/components/popup/popupSection.tsx
function PopupSection({
  children,
  classNames: classNames22 = [],
  onClick = noop
}) {
  return /* @__PURE__ */ v("div", {
    className: cls("popup-section", ...classNames22),
    onClick
  }, children);
}

// src/hooks/common/useDropdownState.ts
function useDropdownState() {
  const [isOpened, setOpened] = y2(false);
  const toggleDropdown = () => setOpened((prev) => !prev);
  return { isOpened, setOpened, toggleDropdown };
}

// src/hooks/popup/useFormState.ts
function formStateReducer(state, action) {
  switch (action.type) {
    case "setCalendarId" /* setCalendarId */:
      return __spreadProps(__spreadValues({}, state), { calendarId: action.calendarId });
    case "setPrivate" /* setPrivate */:
      return __spreadProps(__spreadValues({}, state), { isPrivate: action.isPrivate });
    case "setAllday" /* setAllday */:
      return __spreadProps(__spreadValues({}, state), { isAllday: action.isAllday });
    case "setState" /* setState */:
      return __spreadProps(__spreadValues({}, state), { state: action.state });
    default:
      return state;
  }
}
function useFormState(initialState) {
  return d2(formStateReducer, initialState);
}

// src/components/popup/calendarSelector.tsx
var classNames6 = {
  popupSection: ["dropdown-section", "calendar-section"],
  popupSectionItem: cls("popup-section-item", "popup-button"),
  dotIcon: cls("icon", "dot"),
  content: cls("content", "event-calendar")
};
function CalendarSelector({ calendars, selectedCalendarId, formStateDispatch }) {
  const { isOpened, setOpened, toggleDropdown } = useDropdownState();
  const selectedCalendar = calendars.find((calendar) => calendar.id === selectedCalendarId);
  const { backgroundColor = "", name = "" } = selectedCalendar != null ? selectedCalendar : {};
  const changeIndex = (index) => formStateDispatch({ type: "setCalendarId" /* setCalendarId */, calendarId: calendars[index].id });
  return /* @__PURE__ */ v(PopupSection, {
    onClick: toggleDropdown,
    classNames: classNames6.popupSection
  }, /* @__PURE__ */ v("button", {
    type: "button",
    className: classNames6.popupSectionItem
  }, /* @__PURE__ */ v("span", {
    className: classNames6.dotIcon,
    style: { backgroundColor }
  }), /* @__PURE__ */ v("span", {
    className: classNames6.content
  }, name), /* @__PURE__ */ v("span", {
    className: cls("icon", "ic-dropdown-arrow", { open: isOpened })
  })), isOpened && /* @__PURE__ */ v(CalendarDropdownMenu, {
    calendars,
    setOpened,
    onChangeIndex: changeIndex
  }));
}

// src/components/popup/closePopupButton.tsx
var classNames7 = {
  closeButton: cls("popup-button", "popup-close"),
  closeIcon: cls("icon", "ic-close")
};
function ClosePopupButton({ type, close }) {
  const { hideAllPopup } = useDispatch("popup");
  const onClickHandler = () => {
    hideAllPopup();
    if (isFunction(close)) {
      close();
    }
  };
  return /* @__PURE__ */ v("button", {
    type: "button",
    className: classNames7.closeButton,
    onClick: onClickHandler
  }, type === "moreEvents" ? /* @__PURE__ */ v(Template, {
    template: "monthMoreClose"
  }) : /* @__PURE__ */ v("i", {
    className: classNames7.closeIcon
  }));
}

// src/components/popup/confirmPopupButton.tsx
var classNames8 = {
  confirmButton: cls("popup-button", "popup-confirm")
};
function ConfirmPopupButton({ children }) {
  return /* @__PURE__ */ v("button", {
    type: "submit",
    className: classNames8.confirmButton
  }, /* @__PURE__ */ v("span", null, children));
}

// src/components/popup/dateSelector.tsx
var import_tui_date_picker = __toESM(require_tui_date_picker());

// src/hooks/template/useStringOnlyTemplate.ts
function useStringOnlyTemplate({
  template,
  model,
  defaultValue = ""
}) {
  const templates2 = useStore(templateSelector);
  const templateFunc = templates2[template];
  if (isNil(templateFunc)) {
    return defaultValue;
  }
  let result = templateFunc(model);
  if (!(0, import_isString.default)(result)) {
    result = defaultValue;
  }
  return result;
}

// src/components/popup/dateSelector.tsx
var classNames9 = {
  datePickerContainer: cls("datepicker-container"),
  datePicker: cls("popup-section-item", "popup-date-picker"),
  allday: cls("popup-section-item", "popup-section-allday"),
  dateIcon: cls("icon", "ic-date"),
  dateDash: cls("popup-date-dash"),
  content: cls("content")
};
var DateSelector = x4(function DateSelector2({ start, end, isAllday: isAllday2 = false, formStateDispatch }, ref) {
  const { usageStatistics } = useStore(optionsSelector);
  const startPickerContainerRef = s2(null);
  const startPickerInputRef = s2(null);
  const endPickerContainerRef = s2(null);
  const endPickerInputRef = s2(null);
  const startDatePlaceholder = useStringOnlyTemplate({
    template: "startDatePlaceholder",
    defaultValue: "Start Date"
  });
  const endDatePlaceholder = useStringOnlyTemplate({
    template: "endDatePlaceholder",
    defaultValue: "End Date"
  });
  const toggleAllday = () => formStateDispatch({ type: "setAllday" /* setAllday */, isAllday: !isAllday2 });
  _2(() => {
    if (startPickerContainerRef.current && startPickerInputRef.current && endPickerContainerRef.current && endPickerInputRef.current) {
      const startDate = new TZDate(start);
      const endDate = new TZDate(end);
      if (isAllday2) {
        startDate.setHours(12, 0, 0);
        endDate.setHours(13, 0, 0);
      }
      ref.current = import_tui_date_picker.default.createRangePicker({
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
        format: isAllday2 ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm",
        timePicker: isAllday2 ? false : {
          showMeridiem: false,
          usageStatistics
        },
        usageStatistics
      });
    }
  }, [start, end, isAllday2, usageStatistics, ref]);
  return /* @__PURE__ */ v(PopupSection, null, /* @__PURE__ */ v("div", {
    className: classNames9.datePicker
  }, /* @__PURE__ */ v("span", {
    className: classNames9.dateIcon
  }), /* @__PURE__ */ v("input", {
    name: "start",
    className: classNames9.content,
    placeholder: startDatePlaceholder,
    ref: startPickerInputRef
  }), /* @__PURE__ */ v("div", {
    className: classNames9.datePickerContainer,
    ref: startPickerContainerRef
  })), /* @__PURE__ */ v("span", {
    className: classNames9.dateDash
  }, "-"), /* @__PURE__ */ v("div", {
    className: classNames9.datePicker
  }, /* @__PURE__ */ v("span", {
    className: classNames9.dateIcon
  }), /* @__PURE__ */ v("input", {
    name: "end",
    className: classNames9.content,
    placeholder: endDatePlaceholder,
    ref: endPickerInputRef
  }), /* @__PURE__ */ v("div", {
    className: classNames9.datePickerContainer,
    ref: endPickerContainerRef
  })), /* @__PURE__ */ v("div", {
    className: classNames9.allday,
    onClick: toggleAllday
  }, /* @__PURE__ */ v("span", {
    className: cls("icon", {
      "ic-checkbox-normal": !isAllday2,
      "ic-checkbox-checked": isAllday2
    })
  }), /* @__PURE__ */ v("span", {
    className: classNames9.content
  }, /* @__PURE__ */ v(Template, {
    template: "popupIsAllday"
  })), /* @__PURE__ */ v("input", {
    name: "isAllday",
    type: "checkbox",
    className: cls("hidden-input"),
    value: isAllday2 ? "true" : "false",
    checked: isAllday2
  })));
});

// src/components/popup/stateDropdownMenu.tsx
var EVENT_STATES = ["Busy", "Free"];
var classNames10 = {
  popupSectionItem: cls("popup-section-item", "dropdown-menu-item"),
  dropdownMenu: cls("dropdown-menu"),
  icon: cls("icon"),
  content: cls("content")
};
function StateDropdownMenu({ setOpened, setEventState }) {
  const onClickDropdown = (e3, state) => {
    e3.stopPropagation();
    setOpened(false);
    setEventState(state);
  };
  return /* @__PURE__ */ v("ul", {
    className: classNames10.dropdownMenu
  }, EVENT_STATES.map((state) => /* @__PURE__ */ v("li", {
    key: state,
    className: classNames10.popupSectionItem,
    onClick: (e3) => onClickDropdown(e3, state)
  }, /* @__PURE__ */ v("span", {
    className: classNames10.icon
  }), /* @__PURE__ */ v("span", {
    className: classNames10.content
  }, state === "Busy" ? /* @__PURE__ */ v(Template, {
    template: "popupStateBusy"
  }) : /* @__PURE__ */ v(Template, {
    template: "popupStateFree"
  })))));
}

// src/components/popup/eventStateSelector.tsx
var classNames11 = {
  popupSection: ["dropdown-section", "state-section"],
  popupSectionItem: cls("popup-section-item", "popup-button"),
  stateIcon: cls("icon", "ic-state"),
  arrowIcon: cls("icon", "ic-dropdown-arrow"),
  content: cls("content", "event-state")
};
function EventStateSelector({ eventState = "Busy", formStateDispatch }) {
  const { isOpened, setOpened, toggleDropdown } = useDropdownState();
  const handleChangeEventState = (state) => formStateDispatch({ type: "setState" /* setState */, state });
  return /* @__PURE__ */ v(PopupSection, {
    onClick: toggleDropdown,
    classNames: classNames11.popupSection
  }, /* @__PURE__ */ v("button", {
    type: "button",
    className: classNames11.popupSectionItem
  }, /* @__PURE__ */ v("span", {
    className: classNames11.stateIcon
  }), /* @__PURE__ */ v("span", {
    className: classNames11.content
  }, eventState === "Busy" ? /* @__PURE__ */ v(Template, {
    template: "popupStateBusy"
  }) : /* @__PURE__ */ v(Template, {
    template: "popupStateFree"
  })), /* @__PURE__ */ v("span", {
    className: classNames11.arrowIcon
  })), isOpened && /* @__PURE__ */ v(StateDropdownMenu, {
    setOpened,
    setEventState: handleChangeEventState
  }));
}

// src/components/popup/locationInputBox.tsx
var classNames12 = {
  popupSectionItem: cls("popup-section-item", "popup-section-location"),
  locationIcon: cls("icon", "ic-location"),
  content: cls("content")
};
function LocationInputBox({ location: location2 }) {
  const locationPlaceholder = useStringOnlyTemplate({
    template: "locationPlaceholder",
    defaultValue: "Location"
  });
  return /* @__PURE__ */ v(PopupSection, null, /* @__PURE__ */ v("div", {
    className: classNames12.popupSectionItem
  }, /* @__PURE__ */ v("span", {
    className: classNames12.locationIcon
  }), /* @__PURE__ */ v("input", {
    name: "location",
    className: classNames12.content,
    placeholder: locationPlaceholder,
    value: location2
  })));
}

// src/components/popup/titleInputBox.tsx
var classNames13 = {
  popupSectionItem: cls("popup-section-item", "popup-section-title"),
  privateButton: cls("popup-section-item", "popup-section-private", "popup-button"),
  titleIcon: cls("icon", "ic-title"),
  content: cls("content")
};
function TitleInputBox({ title, isPrivate = false, formStateDispatch }) {
  const titlePlaceholder = useStringOnlyTemplate({
    template: "titlePlaceholder",
    defaultValue: "Subject"
  });
  const togglePrivate = () => formStateDispatch({ type: "setPrivate" /* setPrivate */, isPrivate: !isPrivate });
  return /* @__PURE__ */ v(PopupSection, null, /* @__PURE__ */ v("div", {
    className: classNames13.popupSectionItem
  }, /* @__PURE__ */ v("span", {
    className: classNames13.titleIcon
  }), /* @__PURE__ */ v("input", {
    name: "title",
    className: classNames13.content,
    placeholder: titlePlaceholder,
    value: title,
    required: true
  })), /* @__PURE__ */ v("button", {
    type: "button",
    className: classNames13.privateButton,
    onClick: togglePrivate
  }, /* @__PURE__ */ v("span", {
    className: cls("icon", { "ic-private": isPrivate, "ic-public": !isPrivate })
  }), /* @__PURE__ */ v("input", {
    name: "isPrivate",
    type: "checkbox",
    className: cls("hidden-input"),
    value: isPrivate ? "true" : "false",
    checked: isPrivate
  })));
}

// src/components/popup/eventFormPopup.tsx
var classNames14 = {
  popupContainer: cls("popup-container"),
  formContainer: cls("form-container"),
  popupArrowBorder: cls("popup-arrow-border"),
  popupArrowFill: cls("popup-arrow-fill")
};
function calculatePopupPosition2(popupArrowPointPosition, layoutRect, popupRect) {
  let top = popupArrowPointPosition.top - popupRect.height - HALF_OF_POPUP_ARROW_HEIGHT;
  let left = popupArrowPointPosition.left - popupRect.width / 2;
  let direction = "bottom" /* bottom */;
  if (top < layoutRect.top) {
    direction = "top" /* top */;
    top = popupArrowPointPosition.top + HALF_OF_POPUP_ARROW_HEIGHT;
  }
  if (isTopOutOfLayout(top, layoutRect, popupRect)) {
    top = layoutRect.top + layoutRect.height - popupRect.height;
  }
  if (isLeftOutOfLayout(left, layoutRect, popupRect)) {
    left = layoutRect.left + layoutRect.width - popupRect.width;
  }
  return { top, left: Math.max(left, layoutRect.left), direction };
}
function isBooleanKey(key) {
  return BOOLEAN_KEYS_OF_EVENT_MODEL_DATA.indexOf(key) !== -1;
}
function getChanges(event, eventObject) {
  return Object.entries(eventObject).reduce((changes, [key, value]) => {
    const eventObjectKey = key;
    if (event[eventObjectKey] instanceof TZDate) {
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
  var _a, _b, _c;
  const { calendars } = useStore(calendarSelector);
  const { hideAllPopup } = useDispatch("popup");
  const popupParams = useStore(eventFormPopupParamSelector);
  const {
    title,
    location: location2,
    start,
    end,
    isAllday: isAllday2 = false,
    isPrivate = false,
    eventState = "Busy",
    popupArrowPointPosition,
    close,
    isCreationPopup,
    event
  } = popupParams != null ? popupParams : {};
  const eventBus = useEventBus();
  const formPopupSlot = useFloatingLayer("formPopupSlot");
  const [formState, formStateDispatch] = useFormState({
    title,
    location: location2,
    start,
    end,
    isAllday: isAllday2,
    isPrivate,
    state: eventState
  });
  const datePickerRef = s2(null);
  const popupContainerRef = s2(null);
  const [style, setStyle] = y2({});
  const [arrowLeft, setArrowLeft] = y2(0);
  const [arrowDirection, setArrowDirection] = y2("bottom" /* bottom */);
  const layoutContainer = useLayoutContainer();
  const popupArrowClassName = F(() => {
    const top = arrowDirection === "top" /* top */;
    const bottom = arrowDirection === "bottom" /* bottom */;
    return cls("popup-arrow", { top, bottom });
  }, [arrowDirection]);
  h2(() => {
    if (popupContainerRef.current && popupArrowPointPosition && layoutContainer) {
      const layoutRect = layoutContainer.getBoundingClientRect();
      const popupRect = popupContainerRef.current.getBoundingClientRect();
      const { top, left, direction } = calculatePopupPosition2(popupArrowPointPosition, layoutRect, popupRect);
      const arrowLeftPosition = popupArrowPointPosition.left - left;
      setStyle({ left, top });
      setArrowLeft(arrowLeftPosition);
      setArrowDirection(direction);
    }
  }, [layoutContainer, popupArrowPointPosition]);
  if (isNil(start) || isNil(end) || isNil(formPopupSlot)) {
    return null;
  }
  const onSubmit = (e3) => {
    var _a2, _b2;
    e3.preventDefault();
    const formData = new FormData(e3.target);
    const eventData = __spreadValues({}, formState);
    formData.forEach((data, key) => {
      eventData[key] = isBooleanKey(key) ? data === "true" : data;
    });
    eventData.start = new TZDate((_a2 = datePickerRef.current) == null ? void 0 : _a2.getStartDate());
    eventData.end = new TZDate((_b2 = datePickerRef.current) == null ? void 0 : _b2.getEndDate());
    if (isCreationPopup) {
      eventBus.fire("beforeCreateEvent", eventData);
    } else if (event) {
      const changes = getChanges(event, eventData);
      eventBus.fire("beforeUpdateEvent", { event: event.toEventObject(), changes });
    }
    hideAllPopup();
  };
  const selectedCalendarId = (_c = (_a = formState.calendarId) != null ? _a : event == null ? void 0 : event.calendarId) != null ? _c : (_b = calendars[0]) == null ? void 0 : _b.id;
  return W2(/* @__PURE__ */ v("div", {
    role: "dialog",
    className: classNames14.popupContainer,
    ref: popupContainerRef,
    style
  }, /* @__PURE__ */ v("form", {
    onSubmit
  }, /* @__PURE__ */ v("div", {
    className: classNames14.formContainer
  }, (calendars == null ? void 0 : calendars.length) ? /* @__PURE__ */ v(CalendarSelector, {
    selectedCalendarId,
    calendars,
    formStateDispatch
  }) : /* @__PURE__ */ v(PopupSection, null), /* @__PURE__ */ v(TitleInputBox, {
    title,
    isPrivate: formState.isPrivate,
    formStateDispatch
  }), /* @__PURE__ */ v(LocationInputBox, {
    location: location2
  }), /* @__PURE__ */ v(DateSelector, {
    start,
    end,
    isAllday: formState.isAllday,
    formStateDispatch,
    ref: datePickerRef
  }), /* @__PURE__ */ v(EventStateSelector, {
    eventState: formState.state,
    formStateDispatch
  }), /* @__PURE__ */ v(ClosePopupButton, {
    type: "form",
    close
  }), /* @__PURE__ */ v(PopupSection, null, /* @__PURE__ */ v(ConfirmPopupButton, null, isCreationPopup ? /* @__PURE__ */ v(Template, {
    template: "popupSave"
  }) : /* @__PURE__ */ v(Template, {
    template: "popupUpdate"
  })))), /* @__PURE__ */ v("div", {
    className: popupArrowClassName
  }, /* @__PURE__ */ v("div", {
    className: classNames14.popupArrowBorder,
    style: { left: arrowLeft }
  }, /* @__PURE__ */ v("div", {
    className: classNames14.popupArrowFill
  }))))), formPopupSlot);
}

// src/components/popup/popupOverlay.tsx
function shownPopupParamSelector(state) {
  return Object.values(state.popup).find((popup) => isPresent(popup));
}
function PopupOverlay() {
  const shownPopupParam = useStore(shownPopupParamSelector);
  const { hideAllPopup } = useDispatch("popup");
  const isPopupShown = isPresent(shownPopupParam);
  const onClick = (ev) => {
    var _a;
    ev.stopPropagation();
    (_a = shownPopupParam == null ? void 0 : shownPopupParam.close) == null ? void 0 : _a.call(shownPopupParam);
    hideAllPopup();
  };
  return /* @__PURE__ */ v("div", {
    className: cls("popup-overlay"),
    style: { display: isPopupShown ? "block" : "none" },
    onClick
  });
}

// src/components/popup/seeMoreEventsPopup.tsx
var classNames15 = {
  container: cls("see-more-container"),
  seeMore: cls("see-more"),
  header: cls("see-more-header"),
  list: cls("month-more-list")
};
function SeeMoreEventsPopup() {
  const popupParams = useStore(seeMorePopupParamSelector);
  const { date: date2, events = [], popupPosition } = popupParams != null ? popupParams : {};
  const { moreView, moreViewTitle } = useMonthTheme();
  const seeMorePopupSlot = useFloatingLayer("seeMorePopupSlot");
  const eventBus = useEventBus();
  const moreEventsPopupContainerRef = s2(null);
  const isHidden = isNil(date2) || isNil(popupPosition) || isNil(seeMorePopupSlot);
  _2(() => {
    if (!isHidden && moreEventsPopupContainerRef.current) {
      eventBus.fire("clickMoreEventsBtn", {
        date: date2.toDate(),
        target: moreEventsPopupContainerRef.current
      });
    }
  }, [date2, eventBus, isHidden]);
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
    ymd: toFormat(date2, "YYYY-MM-DD"),
    day: date2.getDay(),
    date: date2.getDate().toString().padStart(2, "0")
  };
  const moreViewListStyle = {
    height: `calc(100% - ${MONTH_MORE_VIEW_HEADER_HEIGHT + MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM + MONTH_MORE_VIEW_HEADER_PADDING_TOP}px)`
  };
  return W2(/* @__PURE__ */ v("div", {
    role: "dialog",
    className: classNames15.container,
    style: popupPosition,
    ref: moreEventsPopupContainerRef
  }, /* @__PURE__ */ v("div", {
    className: classNames15.seeMore,
    style: moreView
  }, /* @__PURE__ */ v("div", {
    className: classNames15.header,
    style
  }, /* @__PURE__ */ v(Template, {
    template: "monthMoreTitleDate",
    param: moreTitle
  }), /* @__PURE__ */ v(ClosePopupButton, {
    type: "moreEvents"
  })), /* @__PURE__ */ v("div", {
    className: classNames15.list,
    style: moreViewListStyle
  }, events.map((uiModel) => /* @__PURE__ */ v(HorizontalEvent, {
    key: `see-more-event-item-${uiModel.cid()}`,
    uiModel,
    eventHeight: MONTH_EVENT_HEIGHT,
    headerHeight: MONTH_MORE_VIEW_HEADER_HEIGHT,
    flat: true
  }))))), seeMorePopupSlot);
}

// src/components/layout.tsx
function getLayoutStylesFromInfo(width, height) {
  const styles = { height: toPercent(100) };
  if (width) {
    styles.width = width;
  }
  if (height) {
    styles.height = height;
  }
  return styles;
}
function Layout({
  children,
  width,
  height,
  className: className2 = "",
  autoAdjustPanels = false
}) {
  const { backgroundColor } = useTheme(commonThemeSelector);
  const [container, containerRefCallback] = useDOMNode();
  const { setLastPanelType, updateLayoutHeight } = useDispatch("weekViewLayout");
  const layoutClassName = F(() => `${cls("layout")} ${className2}`, [className2]);
  h2(() => {
    if (container) {
      const onResizeWindow = () => updateLayoutHeight(container.offsetHeight);
      onResizeWindow();
      window.addEventListener("resize", onResizeWindow);
      return () => window.removeEventListener("resize", onResizeWindow);
    }
    return noop;
  }, [container, updateLayoutHeight]);
  h2(() => {
    if (container && autoAdjustPanels) {
      const childArray = A(children);
      const lastChild = childArray[childArray.length - 1];
      if (!(0, import_isString.default)(lastChild) && !(0, import_isNumber.default)(lastChild) && !isNil(lastChild)) {
        setLastPanelType(lastChild.props.name);
      }
    }
  }, [children, setLastPanelType, autoAdjustPanels, container]);
  return /* @__PURE__ */ v(LayoutContainerProvider, {
    value: container
  }, /* @__PURE__ */ v("div", {
    ref: containerRefCallback,
    className: layoutClassName,
    style: __spreadProps(__spreadValues({}, getLayoutStylesFromInfo(width, height)), { backgroundColor })
  }, container ? children : null), /* @__PURE__ */ v(EventFormPopup, null), /* @__PURE__ */ v(EventDetailPopup, null), /* @__PURE__ */ v(SeeMoreEventsPopup, null), /* @__PURE__ */ v(PopupOverlay, null));
}

// src/components/panelResizer.tsx
function getDefaultStyle(height, border) {
  return {
    height,
    width: "100%",
    cursor: "row-resize",
    borderTop: border,
    borderBottom: border
  };
}
function PanelResizer({ name, height }) {
  const border = useTheme(T2((theme) => theme.week.panelResizer.border, []));
  const style = getDefaultStyle(height, border);
  const defaultGuideStyle = __spreadProps(__spreadValues({}, style), {
    display: "none",
    border: "none",
    backgroundColor: "#999"
  });
  const [guideStyle, setGuideStyle] = y2(defaultGuideStyle);
  const startPos = s2(null);
  const { updateDayGridRowHeightByDiff } = useDispatch("weekViewLayout");
  const onMouseDown = useDrag(DRAGGING_TYPE_CONSTANTS.panelResizer, {
    onDragStart: (e3) => {
      startPos.current = { left: e3.pageX, top: e3.pageY };
    },
    onDrag: (e3) => {
      if (startPos.current) {
        const top = e3.pageY - startPos.current.top;
        setGuideStyle((prev) => __spreadProps(__spreadValues({}, prev), { top, display: null }));
      }
    },
    onMouseUp: (e3) => {
      if (startPos.current) {
        const diff = e3.pageY - startPos.current.top;
        startPos.current = null;
        setGuideStyle(defaultGuideStyle);
        updateDayGridRowHeightByDiff({ rowName: name, diff });
      }
    }
  });
  return /* @__PURE__ */ v("div", {
    style: { position: "relative" }
  }, /* @__PURE__ */ v("div", {
    className: cls("panel-resizer"),
    style,
    onMouseDown
  }), /* @__PURE__ */ v("div", {
    className: cls("panel-resizer-guide"),
    style: guideStyle
  }));
}

// src/components/panel.tsx
function getPanelSide(side, maxExpandableSide) {
  return maxExpandableSide ? Math.min(maxExpandableSide, side) : side;
}
function getPanelStyle({
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
}) {
  const style = {};
  if (initialWidth) {
    style.width = getPanelSide(initialWidth, maxExpandableWidth);
    style.height = "100%";
  }
  if (initialHeight) {
    style.width = "100%";
    style.height = getPanelSide(initialHeight, maxExpandableHeight);
  }
  if (overflowX) {
    style.overflowX = "auto";
  }
  if (overflowY) {
    style.overflowY = "auto";
  }
  return __spreadProps(__spreadValues({}, style), { minHeight, maxHeight, minWidth, maxWidth });
}
var Panel = x4(function Panel2({
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
}, ref) {
  const { updateDayGridRowHeight } = useDispatch("weekViewLayout");
  const { height: dayGridRowHeight } = useStore(T2((state) => {
    var _a;
    return (_a = state.weekViewLayout.dayGridRows[name]) != null ? _a : {};
  }, [name]));
  const height = dayGridRowHeight != null ? dayGridRowHeight : initialHeight;
  h2(() => {
    updateDayGridRowHeight({ rowName: name, height: initialHeight });
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
    if (isNil(resizable) || (0, import_isBoolean.default)(resizable)) {
      return !!resizable;
    }
    return resizable.includes(name);
  }, [resizable, name]);
  return /* @__PURE__ */ v(d, null, /* @__PURE__ */ v("div", {
    className: cls("panel", name),
    style: styles,
    ref
  }, children), isResizable ? /* @__PURE__ */ v(PanelResizer, {
    name,
    width: resizerWidth,
    height: resizerHeight
  }) : null);
});

// src/components/timeGrid/index.ts
var className = "timegrid";
var addTimeGridPrefix = (selector) => `${className}-${selector}`;
var timeFormats = {
  second: "HH:mm:ss",
  minute: "HH:mm",
  hour: "HH:mm",
  date: "HH:mm",
  month: "MM.DD",
  year: "YYYY.MM.DD"
};

// src/components/events/timeEvent.tsx
var classNames16 = {
  time: cls("event-time"),
  content: cls("event-time-content"),
  travelTime: cls("travel-time"),
  resizeHandleX: cls("resize-handler-x"),
  moveEvent: cls("dragging--move-event"),
  resizeEvent: cls("dragging--resize-vertical-event")
};
function getStyles({
  uiModel,
  isDraggingTarget,
  hasNextStartTime,
  calendarColor
}) {
  const {
    top,
    left,
    height,
    width,
    goingDurationHeight,
    modelDurationHeight,
    comingDurationHeight,
    croppedStart,
    croppedEnd
  } = uiModel;
  const travelBorderColor = "white";
  const borderRadius = 2;
  const paddingLeft = 2;
  const defaultMarginBottom = 2;
  const marginLeft = left > 0 ? paddingLeft : 0;
  const { color, backgroundColor, borderColor, dragBackgroundColor } = getEventColors(uiModel, calendarColor);
  const containerStyle = {
    width: width >= 0 ? `calc(${toPercent(width)} - ${marginLeft}px)` : "",
    height: `calc(${toPercent(height)} - ${defaultMarginBottom}px)`,
    top: toPercent(top),
    left: toPercent(left),
    borderRadius,
    borderLeft: `3px solid ${borderColor}`,
    marginLeft,
    color,
    backgroundColor: isDraggingTarget ? dragBackgroundColor : backgroundColor,
    opacity: isDraggingTarget ? 0.5 : 1,
    zIndex: hasNextStartTime ? 1 : 0
  };
  const goingDurationStyle = {
    height: toPercent(goingDurationHeight),
    borderBottom: `1px dashed ${travelBorderColor}`
  };
  const modelDurationStyle = {
    height: toPercent(modelDurationHeight)
  };
  const comingDurationStyle = {
    height: toPercent(comingDurationHeight),
    borderTop: `1px dashed ${travelBorderColor}`
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
function isDraggableEvent({
  uiModel,
  isReadOnlyCalendar,
  isDraggingTarget,
  hasNextStartTime
}) {
  const { model } = uiModel;
  return !isReadOnlyCalendar && !model.isReadOnly && !isDraggingTarget && !hasNextStartTime;
}
function TimeEvent({ uiModel, nextStartTime, isResizingGuide = false }) {
  const { useDetailPopup, isReadOnly: isReadOnlyCalendar } = useStore(optionsSelector);
  const calendarColor = useCalendarColor(uiModel.model);
  const layoutContainer = useLayoutContainer();
  const { showDetailPopup } = useDispatch("popup");
  const { setDraggingEventUIModel } = useDispatch("dnd");
  const eventBus = useEventBus();
  const eventContainerRef = s2(null);
  const [isDraggingTarget, setIsDraggingTarget] = y2(false);
  const { model, goingDurationHeight, modelDurationHeight, comingDurationHeight, croppedEnd } = uiModel;
  const { id, calendarId, customStyle } = model;
  const hasNextStartTime = isPresent(nextStartTime);
  const { containerStyle, goingDurationStyle, modelDurationStyle, comingDurationStyle } = getStyles({ uiModel, isDraggingTarget, hasNextStartTime, calendarColor });
  useTransientUpdate(dndSelector, ({ draggingEventUIModel, draggingState }) => {
    if (draggingState === 2 /* DRAGGING */ && (draggingEventUIModel == null ? void 0 : draggingEventUIModel.cid()) === uiModel.cid() && !hasNextStartTime && !isResizingGuide) {
      setIsDraggingTarget(true);
    } else {
      setIsDraggingTarget(false);
    }
  });
  _2(() => {
    if (!isResizingGuide) {
      eventBus.fire("afterRenderEvent", uiModel.model.toEventObject());
    }
  }, []);
  const startDragEvent = (className2) => {
    setDraggingEventUIModel(uiModel);
    layoutContainer == null ? void 0 : layoutContainer.classList.add(className2);
  };
  const endDragEvent = (className2) => {
    setIsDraggingTarget(false);
    layoutContainer == null ? void 0 : layoutContainer.classList.remove(className2);
  };
  const onMoveStart = useDrag(DRAGGING_TYPE_CREATORS.moveEvent("timeGrid", `${uiModel.cid()}`), {
    onDragStart: () => {
      if (isDraggable) {
        startDragEvent(classNames16.moveEvent);
      }
    },
    onMouseUp: (e3, { draggingState }) => {
      endDragEvent(classNames16.moveEvent);
      const isClick = draggingState <= 1 /* INIT */;
      if (isClick && useDetailPopup && eventContainerRef.current) {
        showDetailPopup({
          event: uiModel.model,
          eventRect: eventContainerRef.current.getBoundingClientRect()
        }, false);
      }
      eventBus.fire("clickEvent", { event: uiModel.model.toEventObject(), nativeEvent: e3 });
    },
    onPressESCKey: () => endDragEvent(classNames16.moveEvent)
  });
  const handleMoveStart = (e3) => {
    e3.stopPropagation();
    onMoveStart(e3);
  };
  const onResizeStart = useDrag(DRAGGING_TYPE_CREATORS.resizeEvent("timeGrid", `${uiModel.cid()}`), {
    onDragStart: () => startDragEvent(classNames16.resizeEvent),
    onMouseUp: () => endDragEvent(classNames16.resizeEvent),
    onPressESCKey: () => endDragEvent(classNames16.resizeEvent)
  });
  const handleResizeStart = (e3) => {
    e3.stopPropagation();
    onResizeStart(e3);
  };
  const isDraggable = isDraggableEvent({
    uiModel,
    isReadOnlyCalendar,
    isDraggingTarget,
    hasNextStartTime
  });
  const shouldShowResizeHandle = isDraggable && !croppedEnd;
  return /* @__PURE__ */ v("div", {
    "data-testid": `time-event-${model.title}-${uiModel.cid()}`,
    "data-calendar-id": calendarId,
    "data-event-id": id,
    className: classNames16.time,
    style: __spreadValues(__spreadValues({}, containerStyle), customStyle),
    onMouseDown: handleMoveStart,
    ref: eventContainerRef
  }, goingDurationHeight ? /* @__PURE__ */ v("div", {
    className: classNames16.travelTime,
    style: goingDurationStyle
  }, /* @__PURE__ */ v(Template, {
    template: "goingDuration",
    param: model
  })) : null, modelDurationHeight ? /* @__PURE__ */ v("div", {
    className: classNames16.content,
    style: modelDurationStyle
  }, /* @__PURE__ */ v(Template, {
    template: "time",
    param: __spreadProps(__spreadValues({}, model.toEventObject()), {
      start: hasNextStartTime ? nextStartTime : model.start
    })
  })) : null, comingDurationHeight ? /* @__PURE__ */ v("div", {
    className: classNames16.travelTime,
    style: comingDurationStyle
  }, /* @__PURE__ */ v(Template, {
    template: "comingDuration",
    param: model
  })) : null, shouldShowResizeHandle ? /* @__PURE__ */ v("div", {
    className: classNames16.resizeHandleX,
    onMouseDown: handleResizeStart
  }) : null);
}

// src/components/timeGrid/gridSelectionByColumn.tsx
function GridSelection2({ top, height, text }) {
  const { backgroundColor, border } = useTheme(T2((theme) => theme.common.gridSelection, []));
  const color = useTheme(T2((theme) => theme.week.gridSelection.color, []));
  const style = {
    top: toPercent(top),
    height: toPercent(height),
    backgroundColor,
    border
  };
  return /* @__PURE__ */ v("div", {
    className: cls("time", "grid-selection"),
    style,
    "data-testid": `time-grid-selection-${top}-${height}`
  }, text.length > 0 ? /* @__PURE__ */ v("span", {
    className: cls("grid-selection-label"),
    style: { color }
  }, text) : null);
}
function GridSelectionByColumn({ columnIndex, timeGridRows }) {
  const gridSelectionData = useStore(T2((state) => timeGridSelectionHelper.calculateSelection(state.gridSelection.timeGrid, columnIndex), [columnIndex]));
  const gridSelectionProps = F(() => {
    if (!gridSelectionData) {
      return null;
    }
    const { startRowIndex, endRowIndex, isStartingColumn, isSelectingMultipleColumns } = gridSelectionData;
    const { top: startRowTop, startTime: startRowStartTime } = timeGridRows[startRowIndex];
    const {
      top: endRowTop,
      height: endRowHeight,
      endTime: endRowEndTime
    } = timeGridRows[endRowIndex];
    const gridSelectionHeight = endRowTop + endRowHeight - startRowTop;
    let text = `${startRowStartTime} - ${endRowEndTime}`;
    if (isSelectingMultipleColumns) {
      text = isStartingColumn ? startRowStartTime : "";
    }
    return {
      top: startRowTop,
      height: gridSelectionHeight,
      text
    };
  }, [gridSelectionData, timeGridRows]);
  if (isNil(gridSelectionProps)) {
    return null;
  }
  return /* @__PURE__ */ v(GridSelection2, __spreadValues({}, gridSelectionProps));
}

// src/hooks/timeGrid/useTimeGridEventResize.ts
function useTimeGridEventResize({
  gridPositionFinder,
  totalUIModels,
  columnIndex,
  timeGridData
}) {
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: resizingStartUIModel,
    clearDraggingEvent
  } = useDraggingEvent("timeGrid", "resize");
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const [guideUIModel, setGuideUIModel] = y2(null);
  const clearStates = T2(() => {
    setGuideUIModel(null);
    clearDraggingEvent();
    clearCurrentGridPos();
  }, [clearCurrentGridPos, clearDraggingEvent]);
  const baseResizingInfo = F(() => {
    if (isNil(resizingStartUIModel)) {
      return null;
    }
    const { columns, rows } = timeGridData;
    const resizeTargetUIModelColumns = totalUIModels.map((uiModels) => uiModels.filter((uiModel) => uiModel.cid() === resizingStartUIModel.cid()));
    const findRowIndexOf = (targetDate, targetColumnIndex) => (row) => {
      const rowStartTZDate = setTimeStrToDate(columns[targetColumnIndex].date, row.startTime);
      const rowEndTZDate = setTimeStrToDate(timeGridData.columns[targetColumnIndex].date, row.endTime);
      return rowStartTZDate <= targetDate && targetDate < rowEndTZDate;
    };
    const eventStartDateColumnIndex = resizeTargetUIModelColumns.findIndex((row) => row.length > 0);
    const startTZDate = resizeTargetUIModelColumns[eventStartDateColumnIndex][0].getStarts();
    let eventStartDateRowIndex = rows.findIndex(findRowIndexOf(startTZDate, eventStartDateColumnIndex));
    eventStartDateRowIndex = eventStartDateRowIndex >= 0 ? eventStartDateRowIndex : 0;
    const eventEndDateColumnIndex = findLastIndex(resizeTargetUIModelColumns, (row) => row.length > 0);
    const endTZDate = resizeTargetUIModelColumns[eventEndDateColumnIndex][0].getEnds();
    let eventEndDateRowIndex = rows.findIndex(findRowIndexOf(endTZDate, eventEndDateColumnIndex));
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
  const minimumHeight = F(() => baseResizingInfo ? timeGridData.rows[0].height : 0, [baseResizingInfo, timeGridData.rows]);
  _2(() => {
    if (canCalculateGuideUIModel) {
      const { eventStartDateRowIndex, eventStartDateColumnIndex, eventEndDateColumnIndex } = baseResizingInfo;
      if (columnIndex === eventEndDateColumnIndex && eventStartDateColumnIndex === eventEndDateColumnIndex) {
        const clonedUIModel = resizingStartUIModel.clone();
        clonedUIModel.setUIProps({
          height: Math.max(minimumHeight, timeGridData.rows[currentGridPos.rowIndex].top - timeGridData.rows[eventStartDateRowIndex].top + minimumHeight)
        });
        setGuideUIModel(clonedUIModel);
      }
    }
  }, [
    baseResizingInfo,
    canCalculateGuideUIModel,
    columnIndex,
    currentGridPos,
    resizingStartUIModel,
    timeGridData.rows,
    minimumHeight
  ]);
  _2(() => {
    if (canCalculateGuideUIModel) {
      const { resizeTargetUIModelColumns, eventStartDateColumnIndex, eventEndDateColumnIndex } = baseResizingInfo;
      if ((columnIndex === eventStartDateColumnIndex || columnIndex === eventEndDateColumnIndex) && eventStartDateColumnIndex !== eventEndDateColumnIndex) {
        let clonedUIModel;
        if (columnIndex === eventStartDateColumnIndex) {
          clonedUIModel = resizeTargetUIModelColumns[columnIndex][0].clone();
        } else {
          clonedUIModel = resizingStartUIModel.clone();
          clonedUIModel.setUIProps({
            height: timeGridData.rows[currentGridPos.rowIndex].top + minimumHeight
          });
        }
        setGuideUIModel(clonedUIModel);
      }
    }
  }, [
    baseResizingInfo,
    canCalculateGuideUIModel,
    columnIndex,
    currentGridPos,
    resizingStartUIModel,
    timeGridData.rows,
    minimumHeight
  ]);
  useWhen(() => {
    const shouldUpdate = !isDraggingCanceled && isPresent(baseResizingInfo) && isPresent(currentGridPos) && isPresent(resizingStartUIModel) && baseResizingInfo.eventEndDateColumnIndex === columnIndex;
    if (shouldUpdate) {
      const { eventEndDateColumnIndex, eventStartDateRowIndex, eventStartDateColumnIndex } = baseResizingInfo;
      const targetEndDate = setTimeStrToDate(timeGridData.columns[columnIndex].date, timeGridData.rows[eventStartDateColumnIndex === eventEndDateColumnIndex ? Math.max(currentGridPos.rowIndex, eventStartDateRowIndex) : currentGridPos.rowIndex].endTime);
      eventBus.fire("beforeUpdateEvent", {
        event: resizingStartUIModel.model.toEventObject(),
        changes: {
          end: targetEndDate
        }
      });
    }
    clearStates();
  }, isDraggingEnd);
  return guideUIModel;
}

// src/components/timeGrid/resizingGuideByColumn.tsx
function ResizingGuideByColumn({
  gridPositionFinder,
  totalUIModels,
  columnIndex,
  timeGridData
}) {
  const guideUIModel = useTimeGridEventResize({
    gridPositionFinder,
    totalUIModels,
    columnIndex,
    timeGridData
  });
  if (isNil(guideUIModel)) {
    return null;
  }
  return /* @__PURE__ */ v(TimeEvent, {
    uiModel: guideUIModel,
    isResizingGuide: true
  });
}

// src/components/timeGrid/column.tsx
var classNames17 = {
  column: cls("column"),
  backgrounds: cls("background-events"),
  events: cls("events")
};
function VerticalEvents({ eventUIModels }) {
  const style = { marginRight: 8 };
  return /* @__PURE__ */ v("div", {
    className: classNames17.events,
    style
  }, eventUIModels.map((eventUIModel) => /* @__PURE__ */ v(TimeEvent, {
    key: `${eventUIModel.valueOf()}-${eventUIModel.cid()}`,
    uiModel: eventUIModel
  })));
}
function backgroundColorSelector(theme) {
  return {
    defaultBackgroundColor: theme.week.dayGrid.backgroundColor,
    todayBackgroundColor: theme.week.today.backgroundColor,
    weekendBackgroundColor: theme.week.weekend.backgroundColor
  };
}
function getBackgroundColor({
  today,
  columnDate,
  defaultBackgroundColor,
  todayBackgroundColor,
  weekendBackgroundColor
}) {
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
var Column = g4(function Column2({
  columnDate,
  columnWidth,
  columnIndex,
  totalUIModels,
  gridPositionFinder,
  timeGridData,
  isLastColumn
}) {
  const { rows: timeGridRows } = timeGridData;
  const borderRight = useTheme(T2((theme) => theme.week.timeGrid.borderRight, []));
  const backgroundColorTheme = useTheme(backgroundColorSelector);
  const [, getNow] = usePrimaryTimezone();
  const today = getNow();
  const backgroundColor = getBackgroundColor(__spreadValues({ today, columnDate }, backgroundColorTheme));
  const style = {
    width: columnWidth,
    backgroundColor,
    borderRight: isLastColumn ? "none" : borderRight
  };
  const uiModelsByColumn = totalUIModels[columnIndex];
  return /* @__PURE__ */ v("div", {
    className: classNames17.column,
    style,
    "data-testid": `timegrid-column-${columnDate.getDay()}`
  }, /* @__PURE__ */ v(VerticalEvents, {
    eventUIModels: uiModelsByColumn
  }), /* @__PURE__ */ v(ResizingGuideByColumn, {
    gridPositionFinder,
    totalUIModels,
    columnIndex,
    timeGridData
  }), /* @__PURE__ */ v(GridSelectionByColumn, {
    columnIndex,
    timeGridRows
  }));
});

// src/components/timeGrid/gridLines.tsx
function gridLineBorderSelector(theme) {
  return {
    halfHourLineBorder: theme.week.timeGridHalfHourLine.borderBottom,
    hourLineBorder: theme.week.timeGridHourLine.borderBottom
  };
}
var GridLines = g4(function GridLines2({
  timeGridRows
}) {
  const { halfHourLineBorder, hourLineBorder } = useTheme(gridLineBorderSelector);
  return /* @__PURE__ */ v("div", {
    className: cls("gridlines")
  }, timeGridRows.map((time, index) => {
    const isUpperLine = index % 2 === 0;
    return /* @__PURE__ */ v("div", {
      key: `gridline-${time.startTime}-${time.endTime}`,
      className: cls("gridline-half"),
      style: {
        top: toPercent(time.top),
        height: toPercent(time.height),
        borderBottom: isUpperLine ? halfHourLineBorder : hourLineBorder
      },
      "data-testid": `gridline-${time.startTime}-${time.endTime}`
    });
  }));
});

// src/hooks/timeGrid/useTimeGridEventMove.ts
var THIRTY_MINUTES = 30;
function getCurrentIndexByTime(time) {
  const hour = time.getHours();
  const minutes = time.getMinutes();
  return hour * 2 + Math.floor(minutes / THIRTY_MINUTES);
}
function getMovingEventPosition({
  draggingEvent,
  columnDiff,
  rowDiff,
  timeGridDataRows,
  currentDate
}) {
  const rowHeight = timeGridDataRows[0].height;
  const maxHeight = rowHeight * timeGridDataRows.length;
  const millisecondsDiff = rowDiff * MS_PER_THIRTY_MINUTES + columnDiff * MS_PER_DAY;
  const nextStart = addMilliseconds(draggingEvent.getStarts(), millisecondsDiff);
  const nextEnd = addMilliseconds(draggingEvent.getEnds(), millisecondsDiff);
  const startIndex = getCurrentIndexByTime(nextStart);
  const endIndex = getCurrentIndexByTime(nextEnd);
  const isStartAtPrevDate = nextStart.getDate() < currentDate.getDate();
  const isEndAtNextDate = nextEnd.getDate() > currentDate.getDate();
  const indexDiff = endIndex - (isStartAtPrevDate ? 0 : startIndex);
  const top = isStartAtPrevDate ? 0 : timeGridDataRows[startIndex].top;
  const height = isEndAtNextDate ? maxHeight : indexDiff * rowHeight;
  return { top, height };
}
var initXSelector = (state) => state.dnd.initX;
var initYSelector = (state) => state.dnd.initY;
function useTimeGridEventMove({
  gridPositionFinder,
  timeGridData
}) {
  const initX = useStore(initXSelector);
  const initY = useStore(initYSelector);
  const eventBus = useEventBus();
  const { isDraggingEnd, isDraggingCanceled, draggingEvent, clearDraggingEvent } = useDraggingEvent("timeGrid", "move");
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const initGridPosRef = s2(null);
  _2(() => {
    if (isPresent(initX) && isPresent(initY)) {
      initGridPosRef.current = gridPositionFinder({
        clientX: initX,
        clientY: initY
      });
    }
  }, [gridPositionFinder, initX, initY]);
  const gridDiff = F(() => {
    if (isNil(initGridPosRef.current) || isNil(currentGridPos)) {
      return null;
    }
    return {
      columnDiff: currentGridPos.columnIndex - initGridPosRef.current.columnIndex,
      rowDiff: currentGridPos.rowIndex - initGridPosRef.current.rowIndex
    };
  }, [currentGridPos]);
  const startDateTime = F(() => {
    if (isNil(draggingEvent)) {
      return null;
    }
    return draggingEvent.getStarts();
  }, [draggingEvent]);
  const clearState = T2(() => {
    clearCurrentGridPos();
    clearDraggingEvent();
    initGridPosRef.current = null;
  }, [clearCurrentGridPos, clearDraggingEvent]);
  const nextStartTime = F(() => {
    if (isNil(gridDiff) || isNil(startDateTime)) {
      return null;
    }
    return addMilliseconds(startDateTime, gridDiff.rowDiff * MS_PER_THIRTY_MINUTES + gridDiff.columnDiff * MS_PER_DAY);
  }, [gridDiff, startDateTime]);
  const movingEvent = F(() => {
    if (isNil(draggingEvent) || isNil(currentGridPos) || isNil(gridDiff)) {
      return null;
    }
    const clonedEvent = draggingEvent.clone();
    const { top, height } = getMovingEventPosition({
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
      eventBus.fire("beforeUpdateEvent", {
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

// src/components/timeGrid/movingEventShadow.tsx
function MovingEventShadow2({
  gridPositionFinder,
  timeGridData
}) {
  const { movingEvent, nextStartTime } = useTimeGridEventMove({
    gridPositionFinder,
    timeGridData
  });
  if (isNil(movingEvent)) {
    return null;
  }
  return /* @__PURE__ */ v(TimeEvent, {
    uiModel: movingEvent,
    nextStartTime
  });
}

// src/test/testIds.ts
var TEST_IDS = {
  NOW_INDICATOR: "timegrid-now-indicator",
  NOW_INDICATOR_LABEL: "timegrid-now-indicator-label"
};

// src/components/timeGrid/nowIndicator.tsx
var classNames18 = {
  line: cls(addTimeGridPrefix("now-indicator")),
  left: cls(addTimeGridPrefix("now-indicator-left")),
  marker: cls(addTimeGridPrefix("now-indicator-marker")),
  today: cls(addTimeGridPrefix("now-indicator-today")),
  right: cls(addTimeGridPrefix("now-indicator-right"))
};
function nowIndicatorTheme(theme) {
  return {
    pastBorder: theme.week.nowIndicatorPast.border,
    todayBorder: theme.week.nowIndicatorToday.border,
    futureBorder: theme.week.nowIndicatorFuture.border,
    bulletBackgroundColor: theme.week.nowIndicatorBullet.backgroundColor
  };
}
function NowIndicator({ top, columnWidth, columnCount, columnIndex }) {
  const { pastBorder, todayBorder, futureBorder, bulletBackgroundColor } = useTheme(nowIndicatorTheme);
  const layoutContainer = useLayoutContainer();
  const eventBus = useEventBus();
  const indicatorRef = s2(null);
  const leftLine = {
    left: toPercent(columnWidth * columnIndex),
    width: toPercent(columnWidth * columnIndex)
  };
  const rightLine = {
    left: toPercent(columnWidth * (columnIndex + 1)),
    width: toPercent(columnWidth * (columnCount - columnIndex + 1))
  };
  _2(() => {
    const scrollToNow = (behavior) => {
      var _a;
      const scrollArea = (_a = layoutContainer == null ? void 0 : layoutContainer.querySelector(`.${cls("panel")}.${cls("time")}`)) != null ? _a : null;
      if (scrollArea && indicatorRef.current) {
        const { offsetHeight: scrollAreaOffsetHeight } = scrollArea;
        const { offsetTop: targetOffsetTop } = indicatorRef.current;
        const newScrollTop = targetOffsetTop - scrollAreaOffsetHeight / 2;
        if (scrollArea.scrollTo) {
          scrollArea.scrollTo({ top: newScrollTop, behavior });
        } else {
          scrollArea.scrollTop = newScrollTop;
        }
      }
    };
    eventBus.on("scrollToNow", scrollToNow);
    return () => eventBus.off("scrollToNow", scrollToNow);
  }, [eventBus, layoutContainer]);
  _2(() => {
    eventBus.fire("scrollToNow", "smooth");
  }, [eventBus]);
  return /* @__PURE__ */ v("div", {
    ref: indicatorRef,
    className: classNames18.line,
    style: { top: toPercent(top) },
    "data-testid": TEST_IDS.NOW_INDICATOR
  }, /* @__PURE__ */ v("div", {
    className: classNames18.left,
    style: { width: leftLine.width, borderTop: pastBorder }
  }), /* @__PURE__ */ v("div", {
    className: classNames18.marker,
    style: { left: leftLine.left, backgroundColor: bulletBackgroundColor }
  }), /* @__PURE__ */ v("div", {
    className: classNames18.today,
    style: {
      left: leftLine.left,
      width: toPercent(columnWidth),
      borderTop: todayBorder
    }
  }), /* @__PURE__ */ v("div", {
    className: classNames18.right,
    style: {
      left: rightLine.left,
      borderTop: futureBorder
    }
  }));
}

// src/components/timeGrid/nowIndicatorLabel.tsx
var classNames19 = {
  now: addTimeGridPrefix("current-time"),
  dayDifference: addTimeGridPrefix("day-difference")
};
function NowIndicatorLabel({ unit, top, now, zonedNow }) {
  const color = useTheme(T2((theme) => theme.week.nowIndicatorLabel.color, []));
  const dateDifference = F(() => {
    return getDateDifference(zonedNow, now);
  }, [zonedNow, now]);
  const model = {
    unit,
    time: zonedNow,
    format: timeFormats[unit]
  };
  return /* @__PURE__ */ v("div", {
    className: cls(classNames19.now),
    style: { top: toPercent(top), color },
    "data-testid": TEST_IDS.NOW_INDICATOR_LABEL
  }, dateDifference !== 0 && /* @__PURE__ */ v("span", {
    className: cls(classNames19.dayDifference)
  }, `[${dateDifference > 0 ? "+" : "-"}${Math.abs(dateDifference)}]`), /* @__PURE__ */ v(Template, {
    template: "timegridNowIndicatorLabel",
    param: model,
    as: "span"
  }));
}

// src/selectors/options.ts
var monthVisibleEventCountSelector = (state) => {
  var _a;
  return (_a = state.options.month.visibleEventCount) != null ? _a : 6;
};
var showNowIndicatorOptionSelector = (state) => state.options.week.showNowIndicator;
var showTimezoneCollapseButtonOptionSelector = (state) => {
  var _a;
  return (_a = state.options.week.showTimezoneCollapseButton) != null ? _a : false;
};
var timezonesCollapsedOptionSelector = (state) => {
  var _a;
  return (_a = state.options.week.timezonesCollapsed) != null ? _a : false;
};

// src/components/timeGrid/timeColumn.tsx
var classNames20 = {
  timeColumn: addTimeGridPrefix("time-column"),
  hourRows: addTimeGridPrefix("hour-rows"),
  time: addTimeGridPrefix("time"),
  timeLabel: addTimeGridPrefix("time-label"),
  first: addTimeGridPrefix("time-first"),
  last: addTimeGridPrefix("time-last"),
  hidden: addTimeGridPrefix("time-hidden")
};
function backgroundColorSelector2(theme) {
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
function HourRows({ rowsInfo, isPrimary, borderRight, width, nowIndicatorState }) {
  var _a;
  const showNowIndicator = useStore(showNowIndicatorOptionSelector);
  const { primaryTimezoneBackgroundColor, subTimezoneBackgroundColor } = useTheme(backgroundColorSelector2);
  const { pastTimeColor, futureTimeColor } = useTheme(timeColorSelector);
  const zonedNow = isPresent(nowIndicatorState) ? addMinutes(nowIndicatorState.now, (_a = rowsInfo[0].diffFromPrimaryTimezone) != null ? _a : 0) : null;
  const backgroundColor = isPrimary ? primaryTimezoneBackgroundColor : subTimezoneBackgroundColor;
  return /* @__PURE__ */ v("div", {
    role: "rowgroup",
    className: cls(classNames20.hourRows),
    style: { width: toPercent(width), borderRight, backgroundColor }
  }, rowsInfo.map(({ date: date2, top, className: className2 }) => {
    const isPast = isPresent(zonedNow) && date2 < zonedNow;
    const color = isPast ? pastTimeColor : futureTimeColor;
    return /* @__PURE__ */ v("div", {
      key: date2.getTime(),
      className: className2,
      style: {
        top: toPercent(top),
        color
      },
      role: "row"
    }, /* @__PURE__ */ v(Template, {
      template: `timegridDisplay${isPrimary ? "Primary" : ""}Time`,
      param: { time: date2 },
      as: "span"
    }));
  }), showNowIndicator && isPresent(nowIndicatorState) && isPresent(zonedNow) && /* @__PURE__ */ v(NowIndicatorLabel, {
    unit: "hour",
    top: nowIndicatorState.top,
    now: nowIndicatorState.now,
    zonedNow
  }));
}
var TimeColumn = g4(function TimeColumn2({ timeGridRows, nowIndicatorState }) {
  const showNowIndicator = useStore(showNowIndicatorOptionSelector);
  const timezones = useStore(timezonesSelector);
  const timezonesCollapsed = useStore(timezonesCollapsedOptionSelector);
  const tzConverter = useTZConverter();
  const { width, borderRight } = useTheme(weekTimeGridLeftSelector);
  const rowsByHour = F(() => timeGridRows.filter((_5, index) => index % 2 === 0 || index === timeGridRows.length - 1), [timeGridRows]);
  const hourRowsPropsMapper = T2((row, index, diffFromPrimaryTimezone) => {
    const shouldHideRow = ({ top: rowTop, height: rowHeight }) => {
      if (!showNowIndicator || isNil(nowIndicatorState)) {
        return false;
      }
      const indicatorTop = nowIndicatorState.top;
      return rowTop - rowHeight <= indicatorTop && indicatorTop <= rowTop + rowHeight;
    };
    const isFirst = index === 0;
    const isLast = index === rowsByHour.length - 1;
    const className2 = cls(classNames20.time, {
      [classNames20.first]: isFirst,
      [classNames20.last]: isLast,
      [classNames20.hidden]: shouldHideRow(row)
    });
    let date2 = setTimeStrToDate(new TZDate(), isLast ? row.endTime : row.startTime);
    if (isPresent(diffFromPrimaryTimezone)) {
      date2 = addMinutes(date2, diffFromPrimaryTimezone);
    }
    return {
      date: date2,
      top: row.top,
      className: className2,
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
    return otherTimezones.reverse().map((timezone) => {
      const { timezoneName } = timezone;
      const primaryTimezoneOffset = tzConverter(primaryTimezone.timezoneName).getTimezoneOffset();
      const currentTimezoneOffset = tzConverter(timezoneName).getTimezoneOffset();
      const diffFromPrimaryTimezone = currentTimezoneOffset - primaryTimezoneOffset;
      return rowsByHour.map((row, index) => hourRowsPropsMapper(row, index, diffFromPrimaryTimezone));
    });
  }, [hourRowsPropsMapper, otherTimezones, primaryTimezone, rowsByHour, tzConverter]);
  return /* @__PURE__ */ v("div", {
    className: cls(classNames20.timeColumn),
    style: { width },
    "data-testid": "timegrid-time-column"
  }, !timezonesCollapsed && otherTimezoneHourRowsProps.map((rowsInfo) => /* @__PURE__ */ v(HourRows, {
    key: rowsInfo[0].diffFromPrimaryTimezone,
    rowsInfo,
    isPrimary: false,
    borderRight,
    width: hourRowsWidth,
    nowIndicatorState
  })), /* @__PURE__ */ v(HourRows, {
    rowsInfo: primaryTimezoneHourRowsProps,
    isPrimary: true,
    borderRight,
    width: timezonesCollapsed ? 100 : hourRowsWidth,
    nowIndicatorState
  }));
});

// src/controller/times.ts
function getTopPercentByTime(date2, start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const time = limit2(date2.getTime(), [startTime], [endTime]) - startTime;
  const max2 = endTime - startTime;
  const topPercent = ratio(max2, 100, time);
  return limit2(topPercent, [0], [100]);
}
function getTopHeightByTime(start, end, minTime, maxTime) {
  const top = getTopPercentByTime(start, minTime, maxTime);
  const bottom = getTopPercentByTime(end, minTime, maxTime);
  const height = bottom - top;
  return {
    top,
    height
  };
}

// src/controller/column.ts
var MIN_HEIGHT_PERCENT = 1;
var MIN_MODEL_HEIGHT_PERCENT = 20;
function isBetween2(startColumnTime, endColumnTime) {
  return (uiModel) => {
    const { goingDuration = 0, comingDuration = 0 } = uiModel.model;
    const ownStarts = addMinutes(uiModel.getStarts(), -goingDuration);
    const ownEnds = addMinutes(uiModel.getEnds(), comingDuration);
    return !(ownEnds <= startColumnTime || ownStarts >= endColumnTime);
  };
}
function hasGoingDuration(uiModel, options) {
  const { goingStart, startColumnTime } = options;
  const { goingDuration = 0 } = uiModel.valueOf();
  return goingDuration && startColumnTime <= goingStart;
}
function hasComingDuration(uiModel, options) {
  const { comingEnd, endColumnTime } = options;
  const { comingDuration = 0 } = uiModel.valueOf();
  return comingDuration && endColumnTime >= comingEnd;
}
function setInnerHeights(uiModel, options) {
  const { renderStart, renderEnd, modelStart, modelEnd } = options;
  let modelDurationHeight = 100;
  if (hasGoingDuration(uiModel, options)) {
    const { height: goingDurationHeight } = getTopHeightByTime(renderStart, modelStart, renderStart, renderEnd);
    uiModel.goingDurationHeight = goingDurationHeight;
    modelDurationHeight -= goingDurationHeight;
  }
  if (hasComingDuration(uiModel, options)) {
    const { height: comingDurationHeight } = getTopHeightByTime(modelEnd, renderEnd, renderStart, renderEnd);
    uiModel.comingDurationHeight = comingDurationHeight;
    modelDurationHeight -= comingDurationHeight;
  }
  if (modelDurationHeight <= MIN_MODEL_HEIGHT_PERCENT && renderStart < modelEnd) {
    modelDurationHeight = MIN_MODEL_HEIGHT_PERCENT;
  }
  uiModel.modelDurationHeight = modelDurationHeight;
}
function setCroppedEdges(uiModel, options) {
  const { goingStart, comingEnd, startColumnTime, endColumnTime } = options;
  if (goingStart < startColumnTime) {
    uiModel.croppedStart = true;
  }
  if (comingEnd > endColumnTime) {
    uiModel.croppedEnd = true;
  }
}
function setDimension(uiModel, options) {
  const { renderStart, renderEnd, startColumnTime, endColumnTime, baseWidth, columnIndex } = options;
  const { top, height } = getTopHeightByTime(renderStart, renderEnd, startColumnTime, endColumnTime);
  const left = baseWidth * columnIndex;
  uiModel.top = top;
  uiModel.left = left;
  uiModel.width = baseWidth;
  uiModel.height = height < MIN_HEIGHT_PERCENT ? MIN_HEIGHT_PERCENT : height;
}
function setRenderInfo(uiModel, columnIndex, baseWidth, startColumnTime, endColumnTime) {
  const { goingDuration = 0, comingDuration = 0 } = uiModel.valueOf();
  const modelStart = uiModel.getStarts();
  const modelEnd = uiModel.getEnds();
  const goingStart = addMinutes(modelStart, -goingDuration);
  const comingEnd = addMinutes(modelEnd, comingDuration);
  const renderStart = max(goingStart, startColumnTime);
  const renderEnd = min(comingEnd, endColumnTime);
  const renderInfoOptions = {
    baseWidth,
    columnIndex,
    modelStart,
    modelEnd,
    renderStart,
    renderEnd,
    goingStart,
    comingEnd,
    startColumnTime,
    endColumnTime
  };
  setDimension(uiModel, renderInfoOptions);
  setInnerHeights(uiModel, renderInfoOptions);
  setCroppedEdges(uiModel, renderInfoOptions);
}
function setRenderInfoOfUIModels(events, startColumnTime, endColumnTime) {
  const uiModels = events.filter(isTimeEvent).filter(isBetween2(startColumnTime, endColumnTime)).sort(array_default.compare.event.asc);
  const uiModelColl = createEventCollection(...uiModels);
  const usingTravelTime = true;
  const collisionGroups = getCollisionGroup(uiModels, usingTravelTime);
  const matrices = getCollides(getMatrices(uiModelColl, collisionGroups, usingTravelTime));
  matrices.forEach((matrix) => {
    const maxRowLength = Math.max(...matrix.map((row) => row.length));
    const baseWidth = 100 / maxRowLength;
    matrix.forEach((row) => {
      row.forEach((uiModel, col) => {
        setRenderInfo(uiModel, col, baseWidth, startColumnTime, endColumnTime);
      });
    });
  });
  return uiModels;
}

// src/hooks/common/useInterval.ts
function useInterval(callback, delay) {
  const savedCallback = s2(callback);
  _2(() => {
    savedCallback.current = callback;
  }, [callback]);
  _2(() => {
    const tick = () => savedCallback.current();
    const intervalDelay = delay != null ? delay : -1;
    if (intervalDelay > 0) {
      const id = setInterval(tick, intervalDelay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// src/hooks/common/useIsMounted.ts
function useIsMounted() {
  const isMountedRef = s2(true);
  _2(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  return T2(() => isMountedRef.current, []);
}

// src/components/timeGrid/timeGrid.tsx
var classNames21 = {
  timegrid: cls(className),
  scrollArea: cls(addTimeGridPrefix("scroll-area"))
};
function TimeGrid({ timeGridData, events }) {
  const { isReadOnly } = useStore(optionsSelector);
  const showNowIndicator = useStore(showNowIndicatorOptionSelector);
  const [, getNow] = usePrimaryTimezone();
  const isMounted = useIsMounted();
  const { width: timeGridLeftWidth } = useTheme(weekTimeGridLeftSelector);
  const [nowIndicatorState, setNowIndicatorState] = y2(null);
  const { columns, rows } = timeGridData;
  const lastColumnIndex = columns.length - 1;
  const totalUIModels = F(() => columns.map(({ date: date2 }) => events.filter(isBetween2(toStartOfDay(date2), toEndOfDay(date2))).map((uiModel) => uiModel.clone())).map((uiModelsByColumn, columnIndex) => setRenderInfoOfUIModels(uiModelsByColumn, setTimeStrToDate(columns[columnIndex].date, first(rows).startTime), setTimeStrToDate(columns[columnIndex].date, last(rows).endTime))), [columns, rows, events]);
  const currentDateData = F(() => {
    const now = getNow();
    const currentDateIndexInColumns = columns.findIndex((column) => isSameDate(column.date, now));
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
    container: columnsContainer
  }), [columns.length, columnsContainer, rows.length]);
  const onMouseDown = useGridSelection({
    type: "timeGrid",
    gridPositionFinder,
    selectionSorter: timeGridSelectionHelper.sortSelection,
    dateGetter: timeGridSelectionHelper.getDateFromCollection,
    dateCollection: timeGridData
  });
  const updateTimeGridIndicator = T2(() => {
    if (isPresent(currentDateData)) {
      const { startTime, endTime } = currentDateData;
      const now = getNow();
      if (startTime <= now && now <= endTime) {
        setNowIndicatorState({
          top: getTopPercentByTime(now, startTime, endTime),
          now
        });
      }
    }
  }, [currentDateData, getNow]);
  h2(() => {
    var _a;
    if (isMounted()) {
      if (((_a = currentDateData == null ? void 0 : currentDateData.currentDateIndex) != null ? _a : -1) >= 0) {
        updateTimeGridIndicator();
      } else {
        setNowIndicatorState(null);
      }
    }
  }, [currentDateData, isMounted, updateTimeGridIndicator]);
  useInterval(updateTimeGridIndicator, isPresent(currentDateData) ? MS_PER_MINUTES : null);
  return /* @__PURE__ */ v("div", {
    className: classNames21.timegrid
  }, /* @__PURE__ */ v("div", {
    className: classNames21.scrollArea
  }, /* @__PURE__ */ v(TimeColumn, {
    timeGridRows: rows,
    nowIndicatorState
  }), /* @__PURE__ */ v("div", {
    className: cls("columns"),
    style: { left: timeGridLeftWidth },
    ref: setColumnsContainer,
    onMouseDown: passConditionalProp(!isReadOnly, onMouseDown)
  }, /* @__PURE__ */ v(GridLines, {
    timeGridRows: rows
  }), /* @__PURE__ */ v(MovingEventShadow2, {
    gridPositionFinder,
    timeGridData
  }), columns.map((column, index) => /* @__PURE__ */ v(Column, {
    key: column.date.toString(),
    timeGridData,
    columnDate: column.date,
    columnWidth: toPercent(column.width),
    columnIndex: index,
    totalUIModels,
    gridPositionFinder,
    isLastColumn: index === lastColumnIndex
  })), showNowIndicator && isPresent(currentDateData) && isPresent(nowIndicatorState) ? /* @__PURE__ */ v(NowIndicator, {
    top: nowIndicatorState.top,
    columnWidth: columns[0].width,
    columnCount: columns.length,
    columnIndex: currentDateData.currentDateIndex
  }) : null)));
}

// src/components/timeGrid/timezoneCollapseButton.tsx
function TimezoneCollapseButton({ isCollapsed }) {
  const eventBus = useEventBus();
  const iconClassName = cls("icon", {
    "ic-arrow-right": isCollapsed,
    "ic-arrow-left": !isCollapsed
  });
  return /* @__PURE__ */ v("button", {
    className: cls(addTimeGridPrefix("timezone-collapse-button")),
    "aria-expanded": !isCollapsed,
    onClick: () => eventBus.fire("clickTimezonesCollapseBtn", isCollapsed)
  }, /* @__PURE__ */ v("span", {
    className: iconClassName,
    role: "img"
  }));
}

// src/components/timeGrid/timezoneLabels.tsx
function TimezoneLabel({ label, offset, tooltip, width = 100, left }) {
  return /* @__PURE__ */ v("div", {
    title: tooltip,
    className: cls(addTimeGridPrefix("timezone-label")),
    style: {
      width: toPercent(width),
      height: toPercent(100),
      left: toPercent(left)
    },
    role: "gridcell"
  }, /* @__PURE__ */ v(Template, {
    template: "timezoneDisplayLabel",
    param: { displayLabel: label, timezoneOffset: offset },
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
function TimezoneLabels({ top }) {
  const timezones = useStore(timezonesSelector);
  const { width } = useTheme(weekTimeGridLeftSelector);
  const tzConverter = useTZConverter();
  const { showTimezoneCollapseButton, timezonesCollapsed } = useTimezoneCollapseOptions();
  if (timezones.length <= 1) {
    return null;
  }
  const timezoneLabelProps = timezones.map(({ displayLabel, timezoneName, tooltip }) => {
    return !(0, import_isUndefined2.default)(displayLabel) ? { label: displayLabel, offset: null, tooltip: tooltip != null ? tooltip : timezoneName } : {
      label: null,
      offset: tzConverter(timezoneName).getTimezoneOffset(),
      tooltip: tooltip != null ? tooltip : timezoneName
    };
  });
  const [primaryTimezone, ...restTimezones] = timezoneLabelProps;
  const subTimezones = restTimezones.reverse();
  const timezonesCount = timezonesCollapsed ? 1 : timezones.length;
  const timezoneLabelWidth = 100 / timezonesCount;
  return /* @__PURE__ */ v("div", {
    style: {
      top,
      width
    },
    role: "columnheader",
    className: cls("timezone-labels-slot")
  }, !timezonesCollapsed && subTimezones.map((subTimezone, index) => {
    var _a;
    return /* @__PURE__ */ v(TimezoneLabel, __spreadValues({
      key: `subTimezone-${(_a = subTimezone.label) != null ? _a : subTimezone.offset}`,
      width: timezoneLabelWidth,
      left: timezoneLabelWidth * index
    }, subTimezone));
  }), showTimezoneCollapseButton && /* @__PURE__ */ v(TimezoneCollapseButton, {
    isCollapsed: timezonesCollapsed
  }), /* @__PURE__ */ v(TimezoneLabel, __spreadValues({
    width: timezoneLabelWidth,
    left: timezoneLabelWidth * subTimezones.length
  }, primaryTimezone)));
}

// src/constants/view.ts
var VIEW_TYPE = {
  MONTH: "month",
  WEEK: "week",
  DAY: "day"
};
var DEFAULT_TASK_PANEL = ["milestone", "task"];
var DEFAULT_EVENT_PANEL = ["allday", "time"];

// src/helpers/view.ts
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

// src/hooks/timezone/useEventsWithTimezone.ts
function useEventsWithTimezone(events) {
  const primaryTimezoneName = useStore(primaryTimezoneSelector);
  const tzConverter = useTZConverter();
  return F(() => {
    if (primaryTimezoneName === "Local") {
      return events;
    }
    const {
      timedEvents = createEventCollection(),
      totalEvents = createEventCollection()
    } = events.groupBy((eventModel) => eventModel.category === "time" ? "timedEvents" : "totalEvents");
    timedEvents.each((eventModel) => {
      const clonedEventModel = clone(eventModel);
      clonedEventModel.start = tzConverter(primaryTimezoneName, clonedEventModel.start);
      clonedEventModel.end = tzConverter(primaryTimezoneName, clonedEventModel.end);
      totalEvents.add(clonedEventModel);
    });
    return totalEvents;
  }, [events, primaryTimezoneName, tzConverter]);
}

// src/hooks/calendar/useCalendarData.ts
function useCalendarData(calendar, ...filters) {
  const filteredEvents = F(() => calendar.events.filter(Collection.and(...filters)), [calendar.events, filters]);
  const filteredEventsWithTimezone = useEventsWithTimezone(filteredEvents);
  return F(() => __spreadProps(__spreadValues({}, calendar), {
    events: filteredEventsWithTimezone
  }), [calendar, filteredEventsWithTimezone]);
}

// src/hooks/timeGrid/useTimeGridScrollSync.ts
function isTimeGridDraggingType(draggingItemType) {
  return /^(event|gridSelection)\/timeGrid/.test(draggingItemType != null ? draggingItemType : "");
}
function useTimeGridScrollSync(scrollArea, rowCount) {
  useTransientUpdate(dndSelector, ({ y: y4, draggingItemType, draggingState }) => {
    if (isPresent(scrollArea) && isTimeGridDraggingType(draggingItemType) && draggingState === 2 /* DRAGGING */ && isPresent(y4)) {
      const { offsetTop, offsetHeight, scrollHeight } = scrollArea;
      const scrollBoundary = Math.floor(scrollHeight / rowCount);
      const layoutHeight = offsetTop + offsetHeight;
      if (y4 < offsetTop + scrollBoundary) {
        const scrollDiff = y4 - (offsetTop + scrollBoundary);
        scrollArea.scrollTop = Math.max(0, scrollArea.scrollTop + scrollDiff);
      } else if (y4 > layoutHeight - scrollBoundary) {
        const scrollDiff = y4 - (layoutHeight - scrollBoundary);
        scrollArea.scrollTop = Math.min(offsetHeight, scrollArea.scrollTop + scrollDiff);
      }
    }
  });
}

// src/hooks/timeGrid/useTimezoneLabelsTop.ts
function timegridHeightSelector(state) {
  var _a, _b, _c;
  return (_c = (_b = (_a = state.weekViewLayout) == null ? void 0 : _a.dayGridRows) == null ? void 0 : _b.time) == null ? void 0 : _c.height;
}
function useTimezoneLabelsTop(timePanel) {
  const timeGridPanelHeight = useStore(timegridHeightSelector);
  const [stickyTop, setStickyTop] = y2(null);
  h2(() => {
    if (isPresent(timeGridPanelHeight) && timePanel) {
      setStickyTop(timePanel.offsetTop);
    }
  }, [timeGridPanelHeight, timePanel]);
  return stickyTop;
}

// src/components/view/day.tsx
function useDayViewState() {
  const calendar = useStore(calendarSelector);
  const options = useStore(optionsSelector);
  const { dayGridRows: gridRowLayout, lastPanelType } = useStore(weekViewLayoutSelector);
  const { renderDate } = useStore(viewSelector);
  return F(() => ({
    calendar,
    options,
    gridRowLayout,
    lastPanelType,
    renderDate
  }), [calendar, options, gridRowLayout, lastPanelType, renderDate]);
}
function Day2() {
  var _a, _b;
  const { calendar, options, gridRowLayout, lastPanelType, renderDate } = useDayViewState();
  const gridHeaderMarginLeft = useTheme(T2((theme) => theme.week.dayGridLeft.width, []));
  const [timePanel, setTimePanelRef] = useDOMNode();
  const weekOptions = options.week;
  const { narrowWeekend, startDayOfWeek, workweek, hourStart, hourEnd, eventView, taskView } = weekOptions;
  const days = F(() => [renderDate], [renderDate]);
  const dayNames = getDayNames(days, (_b = (_a = options.week) == null ? void 0 : _a.dayNames) != null ? _b : []);
  const { rowStyleInfo, cellWidthMap } = getRowStyleInfo(days.length, narrowWeekend, startDayOfWeek, workweek);
  const calendarData = useCalendarData(calendar, options.eventFilter);
  const dayGridEvents = getDayGridEvents(days, calendarData, {
    narrowWeekend,
    hourStart,
    hourEnd
  });
  const timeGridData = F(() => createTimeGridData(days, {
    hourStart,
    hourEnd,
    narrowWeekend
  }), [days, hourEnd, hourStart, narrowWeekend]);
  const activePanels = getActivePanels(taskView, eventView);
  const gridRows = activePanels.map((key) => {
    var _a2, _b2;
    if (key === "time") {
      return null;
    }
    const rowType = key;
    return /* @__PURE__ */ v(Panel, {
      key: rowType,
      name: rowType,
      resizable: rowType !== lastPanelType
    }, rowType === "allday" ? /* @__PURE__ */ v(AlldayGridRow, {
      events: dayGridEvents[rowType],
      rowStyleInfo,
      gridColWidthMap: cellWidthMap,
      weekDates: days,
      height: (_a2 = gridRowLayout[rowType]) == null ? void 0 : _a2.height,
      options: weekOptions
    }) : /* @__PURE__ */ v(OtherGridRow, {
      category: rowType,
      events: dayGridEvents[rowType],
      weekDates: days,
      height: (_b2 = gridRowLayout[rowType]) == null ? void 0 : _b2.height,
      options: weekOptions,
      gridColWidthMap: cellWidthMap
    }));
  });
  useTimeGridScrollSync(timePanel, timeGridData.rows.length);
  const stickyTop = useTimezoneLabelsTop(timePanel);
  return /* @__PURE__ */ v(Layout, {
    className: cls("day-view"),
    autoAdjustPanels: true
  }, /* @__PURE__ */ v(Panel, {
    name: "day-view-day-names",
    initialHeight: WEEK_DAY_NAME_HEIGHT + WEEK_DAY_NAME_BORDER
  }, /* @__PURE__ */ v(GridHeader, {
    type: "week",
    dayNames,
    marginLeft: gridHeaderMarginLeft,
    rowStyleInfo
  })), gridRows, activePanels.includes("time") ? /* @__PURE__ */ v(Panel, {
    name: "time",
    autoSize: 1,
    ref: setTimePanelRef
  }, /* @__PURE__ */ v(TimeGrid, {
    events: dayGridEvents.time,
    timeGridData
  }), /* @__PURE__ */ v(TimezoneLabels, {
    top: stickyTop
  })) : null);
}

// src/components/dayGridMonth/accumulatedGridSelection.tsx
function AccumulatedGridSelection({ rowIndex, weekDates, narrowWeekend }) {
  const gridSelectionDataByRow = useStore(T2((state) => state.gridSelection.accumulated.dayGridMonth.map((gridSelection) => dayGridMonthSelectionHelper.calculateSelection(gridSelection, rowIndex, weekDates.length)), [rowIndex, weekDates]));
  return /* @__PURE__ */ v("div", {
    className: cls("accumulated-grid-selection")
  }, gridSelectionDataByRow.map((gridSelectionData) => gridSelectionData ? /* @__PURE__ */ v(GridSelection, {
    type: "accumulated",
    gridSelectionData,
    weekDates,
    narrowWeekend
  }) : null));
}

// src/components/dayGridMonth/moreEventsButton.tsx
function MoreEventsButton({ type, number, onClickButton, className: className2 }) {
  const { reset } = useDispatch("dnd");
  const handleMouseDown = (e3) => {
    e3.stopPropagation();
  };
  const handleClick = () => {
    reset();
    onClickButton();
  };
  const exceedButtonTemplate = `monthGrid${type === "header" /* header */ ? "Header" : "Footer"}Exceed`;
  return /* @__PURE__ */ v("button", {
    type: "button",
    onMouseDown: handleMouseDown,
    onClick: handleClick,
    className: className2
  }, /* @__PURE__ */ v(Template, {
    template: exceedButtonTemplate,
    param: number
  }));
}

// src/components/dayGridMonth/cellHeader.tsx
function getDateColor({
  date: date2,
  theme,
  renderDate,
  isToday
}) {
  const dayIndex = date2.getDay();
  const thisMonth = renderDate.getMonth();
  const isSameMonth2 = thisMonth === date2.getMonth();
  const {
    common: { holiday, saturday, today, dayName },
    month: { dayExceptThisMonth, holidayExceptThisMonth }
  } = theme;
  if (isToday) {
    return today.color;
  }
  if (isSunday(dayIndex)) {
    return isSameMonth2 ? holiday.color : holidayExceptThisMonth.color;
  }
  if (isSaturday(dayIndex)) {
    return isSameMonth2 ? saturday.color : dayExceptThisMonth.color;
  }
  if (!isSameMonth2) {
    return dayExceptThisMonth.color;
  }
  return dayName.color;
}
function useCellHeaderTheme() {
  const common = useCommonTheme();
  const month = useMonthTheme();
  return F(() => ({ common, month }), [common, month]);
}
function CellHeader({
  type = "header" /* header */,
  exceedCount = 0,
  date: date2,
  onClickExceedCount
}) {
  const { renderDate } = useStore(viewSelector);
  const [, getNow] = usePrimaryTimezone();
  const theme = useCellHeaderTheme();
  const height = theme.month.gridCell[`${type}Height`];
  const ymd = toFormat(date2, "YYYYMMDD");
  const todayYmd = toFormat(getNow(), "YYYYMMDD");
  const isToday = ymd === todayYmd;
  const templateParam = {
    date: toFormat(date2, "YYYY-MM-DD"),
    day: date2.getDay(),
    hiddenEventCount: exceedCount,
    isOtherMonth: date2.getMonth() !== renderDate.getMonth(),
    isToday: ymd === todayYmd,
    month: date2.getMonth(),
    ymd
  };
  const gridCellDateStyle = { color: getDateColor({ date: date2, theme, isToday, renderDate }) };
  const monthGridTemplate = `monthGrid${capitalize(type)}`;
  if (isNil(height)) {
    return null;
  }
  return /* @__PURE__ */ v("div", {
    className: cls(`grid-cell-${type}`),
    style: { height }
  }, /* @__PURE__ */ v("span", {
    className: cls("grid-cell-date"),
    style: gridCellDateStyle
  }, /* @__PURE__ */ v(Template, {
    template: monthGridTemplate,
    param: templateParam
  })), exceedCount ? /* @__PURE__ */ v(MoreEventsButton, {
    type,
    number: exceedCount,
    onClickButton: onClickExceedCount,
    className: cls("grid-cell-more-events")
  }) : null);
}

// src/components/dayGridMonth/gridCell.tsx
function getSeeMorePopupSize({
  grid,
  offsetWidth,
  eventLength,
  layerSize
}) {
  const minHeight = getSize(grid).height + MONTH_MORE_VIEW_PADDING * 2;
  let width = offsetWidth + MONTH_MORE_VIEW_PADDING * 2;
  const { width: moreViewWidth, height: moreViewHeight } = layerSize;
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
  return { width, height };
}
function getSeeMorePopupPosition(position, popupSize, appContainerSize) {
  const { width: containerWidth, height: containerHeight } = appContainerSize;
  const [leftPos, topPos] = position;
  const { width, height } = popupSize;
  const calendarWidth = leftPos * containerWidth / 100;
  const calendarHeight = topPos * containerHeight / 100;
  const isOverWidth = calendarWidth + width >= containerWidth;
  const isOverHeight = calendarHeight + height >= containerHeight;
  const left = toPercent(leftPos);
  const top = toPercent(topPos);
  if (isOverWidth) {
    return isOverHeight ? { right: 0, bottom: 0 } : { right: 0, top };
  }
  return isOverHeight ? { left, bottom: 0 } : { left, top };
}
function getSeeMorePopupRect({
  layoutContainer,
  grid,
  cell,
  popupSize
}) {
  const appContainerSize = getSize(layoutContainer);
  const pos = getRelativePosition({
    clientX: getPosition(cell).x,
    clientY: getPosition(grid).y
  }, layoutContainer);
  let left = pos[0] - MONTH_MORE_VIEW_PADDING;
  let top = pos[1] - MONTH_MORE_VIEW_PADDING;
  left = ratio(appContainerSize.width, 100, left);
  top = ratio(appContainerSize.height, 100, top);
  const popupPosition = getSeeMorePopupPosition([left, top], popupSize, appContainerSize);
  return __spreadValues(__spreadValues({}, popupSize), popupPosition);
}
function usePopupPosition(eventLength, parentContainer, layoutContainer) {
  const { width: moreViewWidth, height: moreViewHeight } = useTheme(monthMoreViewSelector);
  const [container, containerRefCallback] = useDOMNode();
  const [popupPosition, setPopupPosition] = y2(null);
  _2(() => {
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
        grid: parentContainer,
        layoutContainer,
        popupSize
      });
      setPopupPosition(rect);
    }
  }, [layoutContainer, container, eventLength, parentContainer, moreViewWidth, moreViewHeight]);
  return { popupPosition, containerRefCallback };
}
function weekendBackgroundColorSelector(theme) {
  return theme.month.weekend.backgroundColor;
}
function GridCell2({ date: date2, events = [], style, parentContainer, contentAreaHeight }) {
  const layoutContainer = useLayoutContainer();
  const { showSeeMorePopup } = useDispatch("popup");
  const backgroundColor = useTheme(weekendBackgroundColorSelector);
  const { popupPosition, containerRefCallback } = usePopupPosition(events.length, parentContainer, layoutContainer);
  const onOpenSeeMorePopup = T2(() => {
    if (popupPosition) {
      showSeeMorePopup({
        date: date2,
        popupPosition,
        events
      });
    }
  }, [date2, events, popupPosition, showSeeMorePopup]);
  const exceedCount = getExceedCount(events, contentAreaHeight, MONTH_EVENT_HEIGHT + MONTH_EVENT_MARGIN_TOP);
  return /* @__PURE__ */ v("div", {
    className: cls("daygrid-cell"),
    style: __spreadProps(__spreadValues({}, style), { backgroundColor: isWeekend(date2.getDay()) ? backgroundColor : "inherit" }),
    ref: containerRefCallback
  }, /* @__PURE__ */ v(CellHeader, {
    type: "header" /* header */,
    exceedCount,
    date: date2,
    onClickExceedCount: onOpenSeeMorePopup
  }), /* @__PURE__ */ v(CellHeader, {
    type: "footer" /* footer */,
    exceedCount,
    date: date2,
    onClickExceedCount: onOpenSeeMorePopup
  }));
}

// src/components/dayGridMonth/gridRow.tsx
var GridRow = g4(function GridRow2({
  week,
  rowInfo,
  gridDateEventModelMap = {},
  contentAreaHeight
}) {
  const [container, containerRefCallback] = useDOMNode();
  const border = useTheme(T2((theme) => theme.common.border, []));
  return /* @__PURE__ */ v("div", {
    className: cls("weekday-grid"),
    style: { borderTop: border },
    ref: containerRefCallback
  }, week.map((date2, columnIndex) => {
    const dayIndex = date2.getDay();
    const { width, left } = rowInfo[columnIndex];
    const ymd = toFormat(toStartOfDay(date2), "YYYYMMDD");
    return /* @__PURE__ */ v(GridCell2, {
      key: `daygrid-cell-${dayIndex}`,
      date: date2,
      style: {
        width: toPercent(width),
        left: toPercent(left)
      },
      parentContainer: container,
      events: gridDateEventModelMap[ymd],
      contentAreaHeight
    });
  }));
});

// src/components/dayGridMonth/gridSelectionByRow.tsx
function GridSelectionByRow({ weekDates, narrowWeekend, rowIndex }) {
  const gridSelectionDataByRow = useStore(T2((state) => dayGridMonthSelectionHelper.calculateSelection(state.gridSelection.dayGridMonth, rowIndex, weekDates.length), [rowIndex, weekDates.length]));
  if (isNil(gridSelectionDataByRow)) {
    return null;
  }
  return /* @__PURE__ */ v(GridSelection, {
    type: "month",
    gridSelectionData: gridSelectionDataByRow,
    weekDates,
    narrowWeekend
  });
}

// src/components/dayGridMonth/monthEvents.tsx
var MonthEvents = g4(function MonthEvents2({
  contentAreaHeight,
  eventHeight = EVENT_HEIGHT,
  events,
  name,
  className: className2
}) {
  const { headerHeight } = useTheme(monthGridCellSelector);
  const dayEvents = events.filter(isWithinHeight(contentAreaHeight, eventHeight + MONTH_EVENT_MARGIN_TOP)).map((uiModel) => /* @__PURE__ */ v(HorizontalEvent, {
    key: `${name}-DayEvent-${uiModel.cid()}`,
    uiModel,
    eventHeight,
    headerHeight: headerHeight != null ? headerHeight : MONTH_CELL_BAR_HEIGHT
  }));
  return /* @__PURE__ */ v("div", {
    className: className2
  }, dayEvents);
});

// src/hooks/dayGridMonth/useDayGridMonthEventMove.ts
function useDayGridMonthEventMove({
  dateMatrix,
  rowInfo,
  gridPositionFinder,
  rowIndex
}) {
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: movingEvent,
    clearDraggingEvent
  } = useDraggingEvent("dayGrid", "move");
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const movingEventUIModel = F(() => {
    var _a, _b;
    let shadowEventUIModel = null;
    if (movingEvent && (currentGridPos == null ? void 0 : currentGridPos.rowIndex) === rowIndex) {
      shadowEventUIModel = movingEvent;
      shadowEventUIModel.left = rowInfo[(_a = currentGridPos == null ? void 0 : currentGridPos.columnIndex) != null ? _a : 0].left;
      shadowEventUIModel.width = rowInfo[(_b = currentGridPos == null ? void 0 : currentGridPos.columnIndex) != null ? _b : 0].width;
    }
    return shadowEventUIModel;
  }, [movingEvent, currentGridPos == null ? void 0 : currentGridPos.rowIndex, currentGridPos == null ? void 0 : currentGridPos.columnIndex, rowIndex, rowInfo]);
  useWhen(() => {
    const shouldUpdate = !isDraggingCanceled && isPresent(movingEventUIModel) && isPresent(currentGridPos);
    if (shouldUpdate) {
      const preStartDate = movingEventUIModel.model.getStarts();
      const eventDuration = movingEventUIModel.duration();
      const currentDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.columnIndex];
      const timeOffsetPerDay = getDateDifference(currentDate, preStartDate) * MS_PER_DAY;
      const newStartDate = new TZDate(preStartDate.getTime() + timeOffsetPerDay);
      const newEndDate = new TZDate(newStartDate.getTime() + eventDuration);
      eventBus.fire("beforeUpdateEvent", {
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

// src/components/dayGridMonth/movingEventShadow.tsx
function MovingEventShadow3({ dateMatrix, gridPositionFinder, rowInfo, rowIndex }) {
  const movingEvent = useDayGridMonthEventMove({
    dateMatrix,
    rowInfo,
    gridPositionFinder,
    rowIndex
  });
  if (isNil(movingEvent)) {
    return null;
  }
  return /* @__PURE__ */ v(HorizontalEvent, {
    uiModel: movingEvent,
    movingLeft: movingEvent.left,
    eventHeight: EVENT_HEIGHT,
    headerHeight: MONTH_CELL_PADDING_TOP + MONTH_CELL_BAR_HEIGHT
  });
}

// src/hooks/dayGridMonth/useDayGridMonthEventResize.ts
function getRowPosOfUIModel(uiModel, dateRow) {
  const startColumnIndex = Math.max(getGridDateIndex(uiModel.getStarts(), dateRow), 0);
  const endColumnIndex = getGridDateIndex(uiModel.getEnds(), dateRow);
  return {
    startColumnIndex,
    endColumnIndex
  };
}
function useDayGridMonthEventResize({
  dateMatrix,
  gridPositionFinder,
  renderedUIModels,
  cellWidthMap,
  rowIndex
}) {
  const eventBus = useEventBus();
  const {
    isDraggingEnd,
    isDraggingCanceled,
    draggingEvent: resizingStartUIModel,
    clearDraggingEvent
  } = useDraggingEvent("dayGrid", "resize");
  const [currentGridPos, clearCurrentGridPos] = useCurrentPointerPositionInGrid(gridPositionFinder);
  const [guideProps, setGuideProps] = y2(null);
  const clearStates = T2(() => {
    setGuideProps(null);
    clearCurrentGridPos();
    clearDraggingEvent();
  }, [clearCurrentGridPos, clearDraggingEvent]);
  const baseResizingInfo = F(() => {
    if (isNil(resizingStartUIModel)) {
      return null;
    }
    const resizeTargetUIModelRows = renderedUIModels.map(({ uiModels }) => uiModels.filter((uiModel) => uiModel.cid() === resizingStartUIModel.cid()));
    const eventStartDateRowIndex = resizeTargetUIModelRows.findIndex((row) => row.length > 0);
    const eventEndDateRowIndex = findLastIndex(resizeTargetUIModelRows, (row) => row.length > 0);
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
  const canCalculateProps = isPresent(baseResizingInfo) && isPresent(resizingStartUIModel) && isPresent(currentGridPos);
  _2(() => {
    if (canCalculateProps && rowIndex === baseResizingInfo.eventStartDateRowIndex) {
      const { eventStartDateRowIndex, eventStartDateColumnIndex } = baseResizingInfo;
      const clonedUIModel = baseResizingInfo.resizeTargetUIModelRows[eventStartDateRowIndex][0].clone();
      let height;
      if (eventStartDateRowIndex === currentGridPos.rowIndex) {
        height = cellWidthMap[eventStartDateColumnIndex][Math.max(eventStartDateColumnIndex, currentGridPos.columnIndex)];
      } else if (eventStartDateRowIndex > currentGridPos.rowIndex) {
        height = cellWidthMap[eventStartDateColumnIndex][eventStartDateColumnIndex];
      } else {
        height = cellWidthMap[eventStartDateColumnIndex][dateMatrix[rowIndex].length - 1];
        clonedUIModel.setUIProps({ exceedRight: true });
      }
      setGuideProps([clonedUIModel, height]);
    }
  }, [baseResizingInfo, canCalculateProps, cellWidthMap, currentGridPos, dateMatrix, rowIndex]);
  _2(() => {
    if (canCalculateProps && baseResizingInfo.eventStartDateRowIndex < rowIndex && rowIndex < currentGridPos.rowIndex) {
      const clonedUIModel = resizingStartUIModel.clone();
      clonedUIModel.setUIProps({ left: 0, exceedLeft: true, exceedRight: true });
      setGuideProps([clonedUIModel, "100%"]);
    }
  }, [baseResizingInfo, canCalculateProps, currentGridPos, resizingStartUIModel, rowIndex]);
  _2(() => {
    if (canCalculateProps && baseResizingInfo.eventStartDateRowIndex < currentGridPos.rowIndex && rowIndex === currentGridPos.rowIndex) {
      const clonedUIModel = resizingStartUIModel.clone();
      clonedUIModel.setUIProps({ left: 0, exceedLeft: true });
      setGuideProps([clonedUIModel, cellWidthMap[0][currentGridPos.columnIndex]]);
    }
  }, [
    baseResizingInfo,
    canCalculateProps,
    cellWidthMap,
    currentGridPos,
    resizingStartUIModel,
    rowIndex
  ]);
  _2(() => {
    if (canCalculateProps && rowIndex > baseResizingInfo.eventStartDateRowIndex && rowIndex > currentGridPos.rowIndex) {
      setGuideProps(null);
    }
  }, [canCalculateProps, currentGridPos, baseResizingInfo, rowIndex]);
  useWhen(() => {
    if (canCalculateProps) {
      const { eventStartDateColumnIndex, eventStartDateRowIndex } = baseResizingInfo;
      const shouldUpdate = !isDraggingCanceled && (currentGridPos.rowIndex === eventStartDateRowIndex && currentGridPos.columnIndex >= eventStartDateColumnIndex || currentGridPos.rowIndex > eventStartDateRowIndex);
      if (shouldUpdate) {
        const targetEndDate = dateMatrix[currentGridPos.rowIndex][currentGridPos.columnIndex];
        eventBus.fire("beforeUpdateEvent", {
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

// src/components/dayGridMonth/resizingGuideByRow.tsx
function ResizingGuideByRow({
  dateMatrix,
  cellWidthMap,
  gridPositionFinder,
  renderedUIModels,
  rowIndex
}) {
  const resizingGuideProps = useDayGridMonthEventResize({
    dateMatrix,
    gridPositionFinder,
    cellWidthMap,
    renderedUIModels,
    rowIndex
  });
  if (isNil(resizingGuideProps)) {
    return null;
  }
  const [uiModel, resizingWidth] = resizingGuideProps;
  return /* @__PURE__ */ v("div", {
    className: cls("weekday-events")
  }, /* @__PURE__ */ v(HorizontalEvent, {
    key: `resizing-event-${uiModel.cid()}`,
    uiModel,
    eventHeight: MONTH_EVENT_HEIGHT,
    headerHeight: MONTH_CELL_PADDING_TOP + MONTH_CELL_BAR_HEIGHT,
    resizingWidth
  }));
}

// src/components/dayGridMonth/dayGridMonth.tsx
var TOTAL_PERCENT_HEIGHT = 100;
function useCellContentAreaHeight(eventHeight) {
  const visibleEventCount = useStore(monthVisibleEventCountSelector);
  const { headerHeight: themeHeaderHeight, footerHeight: themeFooterHeight } = useTheme(monthGridCellSelector);
  const ref = s2(null);
  const [cellContentAreaHeight, setCellContentAreaHeight] = y2(0);
  _2(() => {
    if (ref.current) {
      const rowHeight = getSize(ref.current).height;
      const headerHeight = MONTH_CELL_PADDING_TOP + (themeHeaderHeight != null ? themeHeaderHeight : MONTH_CELL_BAR_HEIGHT);
      const footerHeight = themeFooterHeight != null ? themeFooterHeight : 0;
      const baseContentAreaHeight = rowHeight - headerHeight - footerHeight;
      const visibleEventCountHeight = visibleEventCount * (eventHeight + MONTH_EVENT_MARGIN_TOP);
      setCellContentAreaHeight(Math.min(baseContentAreaHeight, visibleEventCountHeight));
    }
  }, [themeFooterHeight, themeHeaderHeight, eventHeight, visibleEventCount]);
  return { ref, cellContentAreaHeight };
}
function DayGridMonth({ dateMatrix = [], rowInfo = [], cellWidthMap = [] }) {
  const [gridContainer, setGridContainerRef] = useDOMNode();
  const calendar = useStore(calendarSelector);
  const { ref, cellContentAreaHeight } = useCellContentAreaHeight(MONTH_EVENT_HEIGHT);
  const { eventFilter, month: monthOptions, isReadOnly } = useStore(optionsSelector);
  const { narrowWeekend } = monthOptions;
  const rowHeight = TOTAL_PERCENT_HEIGHT / dateMatrix.length;
  const gridPositionFinder = F(() => createGridPositionFinder({
    container: gridContainer,
    rowsCount: dateMatrix.length,
    columnsCount: dateMatrix[0].length
  }), [dateMatrix, gridContainer]);
  const calendarData = useCalendarData(calendar, eventFilter);
  const renderedEventUIModels = F(() => dateMatrix.map((week) => getRenderedEventUIModels(week, calendarData, narrowWeekend)), [calendarData, dateMatrix, narrowWeekend]);
  const onMouseDown = useGridSelection({
    type: "dayGridMonth",
    gridPositionFinder,
    dateCollection: dateMatrix,
    dateGetter: dayGridMonthSelectionHelper.getDateFromCollection,
    selectionSorter: dayGridMonthSelectionHelper.sortSelection
  });
  return /* @__PURE__ */ v("div", {
    ref: setGridContainerRef,
    onMouseDown: passConditionalProp(!isReadOnly, onMouseDown),
    className: cls("month-daygrid")
  }, dateMatrix.map((week, rowIndex) => {
    const { uiModels, gridDateEventModelMap } = renderedEventUIModels[rowIndex];
    return /* @__PURE__ */ v("div", {
      key: `dayGrid-events-${rowIndex}`,
      className: cls("month-week-item"),
      style: { height: toPercent(rowHeight) },
      ref
    }, /* @__PURE__ */ v("div", {
      className: cls("weekday")
    }, /* @__PURE__ */ v(GridRow, {
      gridDateEventModelMap,
      week,
      rowInfo,
      contentAreaHeight: cellContentAreaHeight
    }), /* @__PURE__ */ v(MonthEvents, {
      name: "month",
      events: uiModels,
      contentAreaHeight: cellContentAreaHeight,
      eventHeight: MONTH_EVENT_HEIGHT,
      className: cls("weekday-events")
    }), /* @__PURE__ */ v(GridSelectionByRow, {
      weekDates: week,
      narrowWeekend,
      rowIndex
    }), /* @__PURE__ */ v(AccumulatedGridSelection, {
      rowIndex,
      weekDates: week,
      narrowWeekend
    })), /* @__PURE__ */ v(ResizingGuideByRow, {
      dateMatrix,
      gridPositionFinder,
      rowIndex,
      cellWidthMap,
      renderedUIModels: renderedEventUIModels
    }), /* @__PURE__ */ v(MovingEventShadow3, {
      dateMatrix,
      gridPositionFinder,
      rowIndex,
      rowInfo
    }));
  }));
}

// src/components/view/month.tsx
function getMonthDayNames(options) {
  const { dayNames, startDayOfWeek, workweek } = options.month;
  const dayIndices = [...Array(7)].map((_5, i5) => (startDayOfWeek + i5) % 7);
  const monthDayNames = dayIndices.map((i5) => ({
    day: i5,
    label: capitalize(dayNames[i5])
  }));
  return monthDayNames.filter((dayNameInfo) => workweek ? !isWeekend(dayNameInfo.day) : true);
}
function Month() {
  const options = useStore(optionsSelector);
  const { renderDate } = useStore(viewSelector);
  const dayNames = getMonthDayNames(options);
  const monthOptions = options.month;
  const { narrowWeekend, startDayOfWeek, workweek } = monthOptions;
  const dateMatrix = F(() => createDateMatrixOfMonth(renderDate, monthOptions), [monthOptions, renderDate]);
  const { rowStyleInfo, cellWidthMap } = F(() => getRowStyleInfo(dayNames.length, narrowWeekend, startDayOfWeek, workweek), [dayNames.length, narrowWeekend, startDayOfWeek, workweek]);
  const rowInfo = rowStyleInfo.map((cellStyleInfo, index) => __spreadProps(__spreadValues({}, cellStyleInfo), {
    date: dateMatrix[0][index]
  }));
  return /* @__PURE__ */ v(Layout, {
    className: cls("month")
  }, /* @__PURE__ */ v(GridHeader, {
    type: "month",
    dayNames,
    options: monthOptions,
    rowStyleInfo
  }), /* @__PURE__ */ v(DayGridMonth, {
    dateMatrix,
    rowInfo,
    cellWidthMap
  }));
}

// src/components/view/week.tsx
function useWeekViewState() {
  const options = useStore(optionsSelector);
  const calendar = useStore(calendarSelector);
  const { dayGridRows: gridRowLayout, lastPanelType } = useStore(weekViewLayoutSelector);
  const { renderDate } = useStore(viewSelector);
  return F(() => ({
    options,
    calendar,
    gridRowLayout,
    lastPanelType,
    renderDate
  }), [calendar, gridRowLayout, lastPanelType, options, renderDate]);
}
function Week() {
  var _a, _b;
  const { options, calendar, gridRowLayout, lastPanelType, renderDate } = useWeekViewState();
  const gridHeaderMarginLeft = useTheme(T2((theme) => theme.week.dayGridLeft.width, []));
  const [timePanel, setTimePanelRef] = useDOMNode();
  const weekOptions = options.week;
  const { narrowWeekend, startDayOfWeek, workweek, hourStart, hourEnd, eventView, taskView } = weekOptions;
  const weekDates = F(() => getWeekDates(renderDate, weekOptions), [renderDate, weekOptions]);
  const dayNames = getDayNames(weekDates, (_b = (_a = options.week) == null ? void 0 : _a.dayNames) != null ? _b : []);
  const { rowStyleInfo, cellWidthMap } = getRowStyleInfo(weekDates.length, narrowWeekend, startDayOfWeek, workweek);
  const calendarData = useCalendarData(calendar, options.eventFilter);
  const eventByPanel = F(() => getDayGridEvents(weekDates, calendarData, {
    narrowWeekend,
    hourStart,
    hourEnd
  }), [calendarData, hourEnd, hourStart, narrowWeekend, weekDates]);
  const timeGridData = F(() => createTimeGridData(weekDates, {
    hourStart,
    hourEnd,
    narrowWeekend
  }), [hourEnd, hourStart, narrowWeekend, weekDates]);
  const activePanels = getActivePanels(taskView, eventView);
  const dayGridRows = activePanels.map((key) => {
    var _a2, _b2;
    if (key === "time") {
      return null;
    }
    const rowType = key;
    return /* @__PURE__ */ v(Panel, {
      name: rowType,
      key: rowType,
      resizable: rowType !== lastPanelType
    }, rowType === "allday" ? /* @__PURE__ */ v(AlldayGridRow, {
      events: eventByPanel[rowType],
      rowStyleInfo,
      gridColWidthMap: cellWidthMap,
      weekDates,
      height: (_a2 = gridRowLayout[rowType]) == null ? void 0 : _a2.height,
      options: weekOptions
    }) : /* @__PURE__ */ v(OtherGridRow, {
      category: rowType,
      events: eventByPanel[rowType],
      weekDates,
      height: (_b2 = gridRowLayout[rowType]) == null ? void 0 : _b2.height,
      options: weekOptions,
      gridColWidthMap: cellWidthMap
    }));
  });
  const hasTimePanel = F(() => activePanels.includes("time"), [activePanels]);
  useTimeGridScrollSync(timePanel, timeGridData.rows.length);
  const stickyTop = useTimezoneLabelsTop(timePanel);
  return /* @__PURE__ */ v(Layout, {
    className: cls("week-view"),
    autoAdjustPanels: true
  }, /* @__PURE__ */ v(Panel, {
    name: "week-view-day-names",
    initialHeight: WEEK_DAY_NAME_HEIGHT + WEEK_DAY_NAME_BORDER * 2
  }, /* @__PURE__ */ v(GridHeader, {
    type: "week",
    dayNames,
    marginLeft: gridHeaderMarginLeft,
    options: weekOptions,
    rowStyleInfo
  })), dayGridRows, hasTimePanel ? /* @__PURE__ */ v(Panel, {
    name: "time",
    autoSize: 1,
    ref: setTimePanelRef
  }, /* @__PURE__ */ v(TimeGrid, {
    events: eventByPanel.time,
    timeGridData
  }), /* @__PURE__ */ v(TimezoneLabels, {
    top: stickyTop
  })) : null);
}

// src/components/view/main.tsx
var views = {
  month: Month,
  week: Week,
  day: Day2
};
function Main() {
  const { currentView } = useStore(viewSelector);
  const CurrentViewComponent = F(() => views[currentView] || (() => null), [currentView]);
  return /* @__PURE__ */ v(CurrentViewComponent, null);
}

// ../../node_modules/preact-render-to-string/dist/index.mjs
var r4 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
var n3 = /[&<>"]/;
function o4(e3) {
  var t4 = String(e3);
  return n3.test(t4) ? t4.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") : t4;
}
var a4 = function(e3, t4) {
  return String(e3).replace(/(\n+)/g, "$1" + (t4 || "	"));
};
var i4 = function(e3, t4, r5) {
  return String(e3).length > (t4 || 40) || !r5 && String(e3).indexOf("\n") !== -1 || String(e3).indexOf("<") !== -1;
};
var l4 = {};
function s4(e3) {
  var t4 = "";
  for (var n4 in e3) {
    var o5 = e3[n4];
    o5 != null && o5 !== "" && (t4 && (t4 += " "), t4 += n4[0] == "-" ? n4 : l4[n4] || (l4[n4] = n4.replace(/([A-Z])/g, "-$1").toLowerCase()), t4 += ": ", t4 += o5, typeof o5 == "number" && r4.test(n4) === false && (t4 += "px"), t4 += ";");
  }
  return t4 || void 0;
}
function f4(e3, t4) {
  for (var r5 in t4)
    e3[r5] = t4[r5];
  return e3;
}
function u4(e3, t4) {
  return Array.isArray(t4) ? t4.reduce(u4, e3) : t4 != null && t4 !== false && e3.push(t4), e3;
}
var c4 = { shallow: true };
var p4 = [];
var _4 = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;
var d4 = /[\s\n\\/='"\0<>]/;
function v4() {
  this.__d = true;
}
m3.render = m3;
var g5 = function(e3, t4) {
  return m3(e3, t4, c4);
};
var h4 = [];
function m3(t4, r5, n4) {
  r5 = r5 || {}, n4 = n4 || {};
  var o5 = l.__s;
  l.__s = true;
  var a5 = x5(t4, r5, n4);
  return l.__c && l.__c(t4, h4), h4.length = 0, l.__s = o5, a5;
}
function x5(r5, n4, l5, c5, g6, h5) {
  if (r5 == null || typeof r5 == "boolean")
    return "";
  if (typeof r5 != "object")
    return o4(r5);
  var m4 = l5.pretty, y4 = m4 && typeof m4 == "string" ? m4 : "	";
  if (Array.isArray(r5)) {
    for (var b4 = "", S4 = 0; S4 < r5.length; S4++)
      m4 && S4 > 0 && (b4 += "\n"), b4 += x5(r5[S4], n4, l5, c5, g6, h5);
    return b4;
  }
  var w5, k4 = r5.type, O4 = r5.props, C3 = false;
  if (typeof k4 == "function") {
    if (C3 = true, !l5.shallow || !c5 && l5.renderRootComponent !== false) {
      if (k4 === d) {
        var A5 = [];
        return u4(A5, r5.props.children), x5(A5, n4, l5, l5.shallowHighOrder !== false, g6, h5);
      }
      var H4, j5 = r5.__c = { __v: r5, context: n4, props: r5.props, setState: v4, forceUpdate: v4, __d: true, __h: [] };
      l.__b && l.__b(r5);
      var F3 = l.__r;
      if (k4.prototype && typeof k4.prototype.render == "function") {
        var M4 = k4.contextType, T4 = M4 && n4[M4.__c], $3 = M4 != null ? T4 ? T4.props.value : M4.__ : n4;
        (j5 = r5.__c = new k4(O4, $3)).__v = r5, j5._dirty = j5.__d = true, j5.props = O4, j5.state == null && (j5.state = {}), j5._nextState == null && j5.__s == null && (j5._nextState = j5.__s = j5.state), j5.context = $3, k4.getDerivedStateFromProps ? j5.state = f4(f4({}, j5.state), k4.getDerivedStateFromProps(j5.props, j5.state)) : j5.componentWillMount && (j5.componentWillMount(), j5.state = j5._nextState !== j5.state ? j5._nextState : j5.__s !== j5.state ? j5.__s : j5.state), F3 && F3(r5), H4 = j5.render(j5.props, j5.state, j5.context);
      } else
        for (var L4 = k4.contextType, E3 = L4 && n4[L4.__c], D4 = L4 != null ? E3 ? E3.props.value : L4.__ : n4, N2 = 0; j5.__d && N2++ < 25; )
          j5.__d = false, F3 && F3(r5), H4 = k4.call(r5.__c, O4, D4);
      return j5.getChildContext && (n4 = f4(f4({}, n4), j5.getChildContext())), l.diffed && l.diffed(r5), x5(H4, n4, l5, l5.shallowHighOrder !== false, g6, h5);
    }
    k4 = (w5 = k4).displayName || w5 !== Function && w5.name || function(e3) {
      var t4 = (Function.prototype.toString.call(e3).match(/^\s*function\s+([^( ]+)/) || "")[1];
      if (!t4) {
        for (var r6 = -1, n5 = p4.length; n5--; )
          if (p4[n5] === e3) {
            r6 = n5;
            break;
          }
        r6 < 0 && (r6 = p4.push(e3) - 1), t4 = "UnnamedComponent" + r6;
      }
      return t4;
    }(w5);
  }
  var P4, R3, U3 = "<" + k4;
  if (O4) {
    var W3 = Object.keys(O4);
    l5 && l5.sortAttributes === true && W3.sort();
    for (var q5 = 0; q5 < W3.length; q5++) {
      var z4 = W3[q5], I4 = O4[z4];
      if (z4 !== "children") {
        if (!d4.test(z4) && (l5 && l5.allAttributes || z4 !== "key" && z4 !== "ref" && z4 !== "__self" && z4 !== "__source")) {
          if (z4 === "defaultValue")
            z4 = "value";
          else if (z4 === "className") {
            if (O4.class !== void 0)
              continue;
            z4 = "class";
          } else
            g6 && z4.match(/^xlink:?./) && (z4 = z4.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if (z4 === "htmlFor") {
            if (O4.for)
              continue;
            z4 = "for";
          }
          z4 === "style" && I4 && typeof I4 == "object" && (I4 = s4(I4)), z4[0] === "a" && z4[1] === "r" && typeof I4 == "boolean" && (I4 = String(I4));
          var V2 = l5.attributeHook && l5.attributeHook(z4, I4, n4, l5, C3);
          if (V2 || V2 === "")
            U3 += V2;
          else if (z4 === "dangerouslySetInnerHTML")
            R3 = I4 && I4.__html;
          else if (k4 === "textarea" && z4 === "value")
            P4 = I4;
          else if ((I4 || I4 === 0 || I4 === "") && typeof I4 != "function") {
            if (!(I4 !== true && I4 !== "" || (I4 = z4, l5 && l5.xml))) {
              U3 += " " + z4;
              continue;
            }
            if (z4 === "value") {
              if (k4 === "select") {
                h5 = I4;
                continue;
              }
              k4 === "option" && h5 == I4 && O4.selected === void 0 && (U3 += " selected");
            }
            U3 += " " + z4 + '="' + o4(I4) + '"';
          }
        }
      } else
        P4 = I4;
    }
  }
  if (m4) {
    var Z3 = U3.replace(/\n\s*/, " ");
    Z3 === U3 || ~Z3.indexOf("\n") ? m4 && ~U3.indexOf("\n") && (U3 += "\n") : U3 = Z3;
  }
  if (U3 += ">", d4.test(k4))
    throw new Error(k4 + " is not a valid HTML tag name in " + U3);
  var B3, G3 = _4.test(k4) || l5.voidElements && l5.voidElements.test(k4), J2 = [];
  if (R3)
    m4 && i4(R3) && (R3 = "\n" + y4 + a4(R3, y4)), U3 += R3;
  else if (P4 != null && u4(B3 = [], P4).length) {
    for (var K2 = m4 && ~U3.indexOf("\n"), Q3 = false, X2 = 0; X2 < B3.length; X2++) {
      var Y3 = B3[X2];
      if (Y3 != null && Y3 !== false) {
        var ee = x5(Y3, n4, l5, true, k4 === "svg" || k4 !== "foreignObject" && g6, h5);
        if (m4 && !K2 && i4(ee) && (K2 = true), ee)
          if (m4) {
            var te = ee.length > 0 && ee[0] != "<";
            Q3 && te ? J2[J2.length - 1] += ee : J2.push(ee), Q3 = te;
          } else
            J2.push(ee);
      }
    }
    if (m4 && K2)
      for (var re = J2.length; re--; )
        J2[re] = "\n" + y4 + a4(J2[re], y4);
  }
  if (J2.length || R3)
    U3 += J2.join("");
  else if (l5 && l5.xml)
    return U3.substring(0, U3.length - 1) + " />";
  return !G3 || B3 || R3 ? (m4 && ~U3.indexOf("\n") && (U3 += "\n"), U3 += "</" + k4 + ">") : U3 = U3.replace(/>$/, " />"), U3;
}
m3.shallowRender = g5;
var dist_default = m3;

// src/factory/calendarCore.tsx
var import_sendHostname = __toESM(require_sendHostname());

// src/calendarContainer.tsx
function CalendarContainer({ theme, store, eventBus, children }) {
  return /* @__PURE__ */ v(EventBusProvider, {
    value: eventBus
  }, /* @__PURE__ */ v(ThemeProvider, {
    store: theme
  }, /* @__PURE__ */ v(StoreProvider, {
    store
  }, /* @__PURE__ */ v(FloatingLayerProvider, null, children))));
}

// src/constants/statistics.ts
var GA_TRACKING_ID = "UA-129951699-1";

// src/utils/eventBus.ts
var import_customEvents = __toESM(require_customEvents());
var EventBusImpl = class extends import_customEvents.default {
  on(eventName, handler) {
    super.on(eventName, handler);
    return this;
  }
  off(eventName, handler) {
    super.off(eventName, handler);
    return this;
  }
  fire(eventName, ...args) {
    super.fire(eventName, ...args);
    return this;
  }
  once(eventName, handler) {
    super.once(eventName, handler);
    return this;
  }
};

// src/factory/calendarCore.tsx
var CalendarCore = class {
  constructor(container, options = {}) {
    var _a;
    this.container = (0, import_isString.default)(container) ? (_a = document == null ? void 0 : document.querySelector(container)) != null ? _a : null : container;
    this.theme = initThemeStore(options.theme);
    this.eventBus = new EventBusImpl();
    this.store = initCalendarStore(options);
    this.renderRange = this.calculateRenderRange(toStartOfDay());
    addAttributeHooks();
    if (this.getStoreState().options.usageStatistics === true) {
      (0, import_sendHostname.default)("calendar", GA_TRACKING_ID);
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
  destroy() {
    if (this.container) {
      un2(this.container);
    }
    this.store.clearListeners();
    this.eventBus.off();
    removeAttributeHooks();
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        delete this[key];
      }
    }
  }
  calculateMonthRenderDate({
    renderDate,
    offset,
    monthOptions
  }) {
    let newRenderDate = new TZDate(renderDate);
    const { visibleWeeksCount } = monthOptions;
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
      renderRange: { start, end }
    };
  }
  calculateWeekRenderDate({
    renderDate,
    offset,
    weekOptions
  }) {
    const newRenderDate = new TZDate(renderDate);
    newRenderDate.addDate(offset * 7);
    const weekDates = getWeekDates(newRenderDate, weekOptions);
    const [start] = weekDates;
    const end = last(weekDates);
    return {
      renderDate: newRenderDate,
      renderRange: { start, end }
    };
  }
  calculateDayRenderDate({ renderDate, offset }) {
    const newRenderDate = new TZDate(renderDate);
    newRenderDate.addDate(offset);
    const start = toStartOfDay(newRenderDate);
    const end = toEndOfDay(newRenderDate);
    return {
      renderDate: newRenderDate,
      renderRange: { start, end }
    };
  }
  move(offset) {
    if (isNil(offset)) {
      return;
    }
    const { currentView, renderDate } = this.getStoreState().view;
    const { options } = this.getStoreState();
    const { setRenderDate } = this.getStoreDispatchers().view;
    const newRenderDate = new TZDate(renderDate);
    let calculatedRenderDate = {
      renderDate: newRenderDate,
      renderRange: { start: new TZDate(newRenderDate), end: new TZDate(newRenderDate) }
    };
    if (currentView === "month") {
      calculatedRenderDate = this.calculateMonthRenderDate({
        renderDate,
        offset,
        monthOptions: options.month
      });
    } else if (currentView === "week") {
      calculatedRenderDate = this.calculateWeekRenderDate({
        renderDate,
        offset,
        weekOptions: options.week
      });
    } else if (currentView === "day") {
      calculatedRenderDate = this.calculateDayRenderDate({ renderDate, offset });
    }
    setRenderDate(calculatedRenderDate.renderDate);
    this.renderRange = calculatedRenderDate.renderRange;
  }
  createEvents(events) {
    const { createEvents: createEvents2 } = this.getStoreDispatchers("calendar");
    createEvents2(events);
  }
  getEventModel(eventId, calendarId) {
    const { events } = this.getStoreState("calendar");
    return events.find(({ id, calendarId: eventCalendarId }) => id === eventId && eventCalendarId === calendarId);
  }
  getEvent(eventId, calendarId) {
    var _a, _b;
    return (_b = (_a = this.getEventModel(eventId, calendarId)) == null ? void 0 : _a.toEventObject()) != null ? _b : null;
  }
  updateEvent(eventId, calendarId, changes) {
    const { updateEvent: updateEvent2 } = this.getStoreDispatchers("calendar");
    const event = this.getEventModel(eventId, calendarId);
    if (event) {
      updateEvent2({ event, eventData: changes });
    }
  }
  deleteEvent(eventId, calendarId) {
    const { deleteEvent: deleteEvent2 } = this.getStoreDispatchers("calendar");
    const event = this.getEventModel(eventId, calendarId);
    if (event) {
      deleteEvent2(event);
    }
  }
  setCalendarVisibility(calendarId, isVisible) {
    const { setCalendarVisibility } = this.getStoreDispatchers("calendar");
    const calendarIds = Array.isArray(calendarId) ? calendarId : [calendarId];
    setCalendarVisibility(calendarIds, isVisible);
  }
  render() {
    if (isPresent(this.container)) {
      S(/* @__PURE__ */ v(CalendarContainer, {
        theme: this.theme,
        store: this.store,
        eventBus: this.eventBus
      }, this.getComponent()), this.container);
    }
    return this;
  }
  renderToString() {
    return dist_default(/* @__PURE__ */ v(CalendarContainer, {
      theme: this.theme,
      store: this.store,
      eventBus: this.eventBus
    }, this.getComponent()));
  }
  clear() {
    const { clearEvents: clearEvents2 } = this.getStoreDispatchers("calendar");
    clearEvents2();
  }
  scrollToNow(scrollBehavior = "auto") {
    this.eventBus.fire("scrollToNow", scrollBehavior);
  }
  calculateRenderRange(renderDate) {
    const { currentView } = this.getStoreState().view;
    const { options } = this.getStoreState();
    const newRenderDate = new TZDate(renderDate);
    let newRenderRange = { start: new TZDate(newRenderDate), end: new TZDate(newRenderDate) };
    if (currentView === "month") {
      newRenderRange = this.calculateMonthRenderDate({
        renderDate,
        offset: 0,
        monthOptions: options.month
      }).renderRange;
    } else if (currentView === "week") {
      newRenderRange = this.calculateWeekRenderDate({
        renderDate,
        offset: 0,
        weekOptions: options.week
      }).renderRange;
    } else if (currentView === "day") {
      newRenderRange = this.calculateDayRenderDate({ renderDate, offset: 0 }).renderRange;
    }
    return newRenderRange;
  }
  today() {
    const { setRenderDate } = this.getStoreDispatchers().view;
    const today = new TZDate();
    setRenderDate(today);
    this.renderRange = this.calculateRenderRange(today);
  }
  setDate(date2) {
    const { setRenderDate } = this.getStoreDispatchers("view");
    const dateToChange = new TZDate(date2);
    setRenderDate(dateToChange);
    this.renderRange = this.calculateRenderRange(dateToChange);
  }
  next() {
    this.move(1);
  }
  prev() {
    this.move(-1);
  }
  setCalendarColor(calendarId, colorOptions) {
    const { setCalendarColor } = this.getStoreDispatchers().calendar;
    setCalendarColor(calendarId, colorOptions);
  }
  changeView(viewName) {
    const { changeView } = this.getStoreDispatchers("view");
    changeView(viewName);
    this.renderRange = this.calculateRenderRange(this.getDate());
  }
  getElement(eventId, calendarId) {
    const event = this.getEvent(eventId, calendarId);
    if (event && this.container) {
      return this.container.querySelector(`[data-event-id="${eventId}"][data-calendar-id="${calendarId}"]`);
    }
    return null;
  }
  setTheme(theme) {
    const { setTheme } = this.theme.getState().dispatch;
    setTheme(theme);
  }
  getOptions() {
    const { options, template } = this.getStoreState();
    const _a = this.theme.getState(), { dispatch } = _a, theme = __objRest(_a, ["dispatch"]);
    return __spreadProps(__spreadValues({}, options), {
      template,
      theme
    });
  }
  setOptions(options) {
    const _a = options, { theme, template } = _a, restOptions = __objRest(_a, ["theme", "template"]);
    const { setTheme } = this.theme.getState().dispatch;
    const {
      options: { setOptions },
      template: { setTemplate }
    } = this.getStoreDispatchers();
    if (isPresent(theme)) {
      setTheme(theme);
    }
    if (isPresent(template)) {
      setTemplate(template);
    }
    setOptions(restOptions);
  }
  getDate() {
    const { renderDate } = this.getStoreState().view;
    return renderDate;
  }
  getDateRangeStart() {
    return this.renderRange.start;
  }
  getDateRangeEnd() {
    return this.renderRange.end;
  }
  getViewName() {
    const { currentView } = this.getStoreState("view");
    return currentView;
  }
  setCalendars(calendars) {
    const { setCalendars } = this.getStoreDispatchers().calendar;
    setCalendars(calendars);
  }
  openFormPopup(event) {
    const { showFormPopup } = this.getStoreDispatchers().popup;
    const eventModel = new EventModel(event);
    const { title, location: location2, start, end, isAllday: isAllday2, isPrivate, state: eventState } = eventModel;
    showFormPopup({
      isCreationPopup: true,
      event: eventModel,
      title,
      location: location2,
      start,
      end,
      isAllday: isAllday2,
      isPrivate,
      eventState
    });
  }
  clearGridSelections() {
    const { clearAll } = this.getStoreDispatchers().gridSelection;
    clearAll();
  }
  fire(eventName, ...args) {
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
};

// src/factory/calendar.tsx
function isValidViewType(viewType) {
  return !!Object.values(VIEW_TYPE).find((type) => type === viewType);
}
var Calendar = class extends CalendarCore {
  constructor(container, options = {}) {
    super(container, options);
    const { defaultView = "week" } = options;
    if (!isValidViewType(defaultView)) {
      throw new InvalidViewTypeError(defaultView);
    }
    this.render();
  }
  getComponent() {
    return /* @__PURE__ */ v(Main, null);
  }
};

// src/factory/day.tsx
var Day3 = class extends CalendarCore {
  constructor(container, options = {}) {
    super(container, options);
    this.render();
  }
  getComponent() {
    return /* @__PURE__ */ v(Day2, null);
  }
};

// src/factory/month.tsx
var Month2 = class extends CalendarCore {
  constructor(container, options = {}) {
    super(container, options);
    this.render();
  }
  getComponent() {
    return /* @__PURE__ */ v(Month, null);
  }
  hideMoreView() {
    const { hideSeeMorePopup } = this.getStoreDispatchers().popup;
    hideSeeMorePopup();
  }
};

// src/factory/week.tsx
var Week2 = class extends CalendarCore {
  constructor(container, options = {}) {
    super(container, options);
    this.render();
  }
  getComponent() {
    return /* @__PURE__ */ v(Week, null);
  }
};

// src/index.ts
var src_default = Calendar;
export {
  Day3 as Day,
  Month2 as Month,
  TZDate,
  Week2 as Week,
  src_default as default
};
/*!
 * TOAST UI Date Picker
 * @version 4.3.1
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */
/*!
 * TOAST UI Time Picker
 * @version 2.1.4
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */
/*! @license DOMPurify 2.3.8 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.8/LICENSE */
