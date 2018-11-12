'use strict';

var util = require('tui-code-snippet');
var toVNode = require('snabbdom/tovnode')['default'];
var config = require('../../config');

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

module.exports = {
    htmlToVNodes: function(html) {
        var container = document.createElement('div');
        var vnode = null;

        container.innerHTML = html;
        vnode = toVNode(container);

        return vnode.children;
    },
    styleStringToObject: function(stylesString) {
        var styles = stylesString ? stylesString.split(';') : [];
        var styleObject = {};
        util.forEach(styles, function(style) {
            var keyValue = style.split(':');
            if (!util.isUndefined(keyValue[0]) && !util.isUndefined(keyValue[1])) {
                styleObject[keyValue[0]] = keyValue[1];
            }
        });

        return styleObject;
    },
    objectToStyleString: function(object) {
        var styles = [];
        util.forEach(object, function(value, key) {
            styles.push(key + ': ' + value + ';');
        });

        return styles.join(' ');
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
    }
};
