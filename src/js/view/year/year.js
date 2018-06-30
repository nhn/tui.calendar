
/**
 * @fileoverview Year view
 * @author jbpark <pjb0811@gmail.com>
 */
'use strict';

var util = require('tui-code-snippet');
var View = require('../view');
var domutil = require('../../common/domutil');
var config = require('../../config');
var Month = require('../month/month');
var tmpl = require('../template/year/monthTitle.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} props - props
 * @param {object} props.options - options
 * @param {HTMLElement} props.container - container element
 * @param {object} props.controllers - controller instance
 */
function Year(props) {
    this.props = props;
    this.props.containers = Array.from({length: 12}, this.appendMonthContainer.bind(this));
}

util.inherit(Year, View);

Year.prototype.viewName = 'year';

/**
 * Append month containers
 * @returns {HTMLElement} month containers
 */
Year.prototype.appendMonthContainer = function() {
    return domutil.appendHTMLElement('div', this.props.container, config.classname('month-container'));
};

/**
 * Render year view
 * @override
 */
Year.prototype.render = function() {
    this.props.containers.map(this.renderMonth.bind(this));
};

/**
 * Render month view of selected year
 * @param {HTMLElement} container - month container
 * @param {number} i - index
 * @returns {HTMLElement} month containers
 */
Year.prototype.renderMonth = function(container, i) {
    var options = this.props.options;
    var monthController = this.props.controllers.Month;
    var year, month, content, monthView;
    year = options.year.startYear;
    month = i < 9 ? '0' + (i + 1) : (i + 1);
    options.month.renderMonth = year + '-' + month;
    container.innerHTML = tmpl({
        title: month + '월'
    });

    content = domutil.appendHTMLElement('div', container, config.classname('month'));
    monthView = new Month(options.month, content, monthController);
    monthView.render();

    return container;
};

/**
 * Destroy year view
 * @override
 */
Year.prototype.destroy = function() {};

module.exports = Year;
