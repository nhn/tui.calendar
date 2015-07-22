/**
 * @fileoverview Factory module for view.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

// Parent views
var Week = require('./week');

// Sub views
var TimeGrid = require('./timeGrid');

module.exports = function(name, options, container) {
    var weekView,
        timeGridView;

    if (name === 'Week') {
        weekView = new Week(null, options, container);
        timeGridView = new TimeGrid(options, weekView.container);
        weekView.addChild(timeGridView);

        return weekView;
    }
};

