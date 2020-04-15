/**
 * @fileoverview Floating layer for displaying schedule in specific date
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var OUT_PADDING = 5;
var VIEW_MIN_WIDTH = 280;
var util = require('tui-code-snippet');
var config = require('../../config'),
    domevent = require('../../common/domevent'),
    domutil = require('../../common/domutil'),
    View = require('../../view/view'),
    FloatingLayer = require('../../common/floatingLayer'),
    common = require('../../common/common'),
    tmpl = require('../template/month/more.hbs');

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
    var target = domevent.getEventTarget(clickEvent);
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
    var target = domevent.getEventTarget(mouseDownEvent),
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

    left = common.ratio(containerSize[0], 100, left);
    top = common.ratio(containerSize[1], 100, top);

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
    var containerSize = domutil.getSize(this.container);
    var calWidth = 0;
    var calHeight = 0;
    var isOverWidth = false;
    var isOverHeight = false;
    var leftPos = pos[0];
    var topPos = pos[1];

    this._viewModel = util.extend(viewModel, {
        scheduleGutter: opt.scheduleGutter,
        scheduleHeight: opt.scheduleHeight,
        scheduleBulletTop: opt.scheduleBulletTop,
        borderRadius: opt.borderRadius,
        styles: styles
    });

    width = Math.max(width, VIEW_MIN_WIDTH);
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

    calWidth = leftPos * containerSize[0] / 100;
    calHeight = topPos * containerSize[1] / 100;
    isOverWidth = calWidth + width >= containerSize[0];
    isOverHeight = calHeight + height >= containerSize[1];
    leftPos = leftPos + '%';
    topPos = topPos + '%';

    if (isOverWidth && isOverHeight) {
        layer.setLTRB({
            right: 0,
            bottom: 0
        });
    } else if (!isOverWidth && isOverHeight) {
        layer.setLTRB({
            left: leftPos,
            bottom: 0
        });
    } else if (isOverWidth && !isOverHeight) {
        layer.setLTRB({
            right: 0,
            top: topPos
        });
    } else {
        layer.setPosition(leftPos, topPos);
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
