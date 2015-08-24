/**
 * @fileoverview Utility modules for manipulate DOM elements.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var domevent = require('./domevent');

var util = global.ne.util,
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
     * @returns {HTMLElement} HTML element finded.
     */
    find: function(selector, root) {
        var target = null;

        if (typeof root === 'string') {
            root = domutil.get(root);
        }

        if (!root) {
            root = window.document.body;
        }

        /**
         * Find element recursivly
         * @param {HTMLElement} el root element
         * @param {string} selector selector
         */
        function findRecursive(el, selector) {
            var childNodes = el.childNodes,
                i,
                len,
                child;

            for (i = 0, len = childNodes.length; i < len; i += 1) {
                child = childNodes[i];

                if (child.nodeName === '#text') {
                    continue;
                }

                if (domutil._matcher(child, selector)) {
                    target = child;
                    return;
                } else if (child.childNodes.length > 0) {
                    findRecursive(child, selector);
                }
            }
        }

        findRecursive(root, selector);

        return target;
    },

    /**
     * Find parent element recursivly.
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

    setData: function(el, key, data) {
        if ('dataset' in el) {
            el.dataset[key] = data;
            return;
        }

        el.setAttribute('data-' + key, data);
    },

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
        if (!el.className) {
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
            width = bound.width;
            height = bound.height;
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

