/* eslint complexity: 0, no-shadow: 0, max-nested-callbacks: 0  */
/**
 * @fileoverview Utility modules for manipulate DOM elements.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var domevent = require('./domevent');
var Collection = require('./collection');
var util = require('tui-code-snippet');

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
        var parent;

        if (!el) {
            return null;
        }

        parent = el.parentNode;

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

                    return el.currentStyle[prop] || null;
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

/* eslint-disable */
var userSelectProperty = domutil.testProp([
    'userSelect',
    'WebkitUserSelect',
    'OUserSelect',
    'MozUserSelect',
    'msUserSelect'
]);
var supportSelectStart = 'onselectstart' in document;
var prevSelectStyle = '';

/* eslint-enable */

/**
 * Disable browser's text selection behaviors.
 * @method
 */
domutil.disableTextSelection = (function() {
    if (supportSelectStart) {
        return function(dom, onSelectstartHandler) {
            domevent.on(dom, 'selectstart', onSelectstartHandler || domevent.preventDefault);
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
        return function(dom, onSelectstartHandler) {
            domevent.off(window, 'selectstart', onSelectstartHandler || domevent.preventDefault);
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
