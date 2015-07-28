/**
 * @fileoverview Factory module for view.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

// Parent views
var Week = require('./week');

// Sub views
var DayName = require('./dayname');
var TimeGrid = require('./timeGrid');

// Handlers
var Drag = require('../handler/drag');

module.exports = function(name, options, container) {
    var weekView,
        dayNameView,
        timeGridView;

    if (name === 'Week') {
        weekView = new Week(null, options, container);

        dayNameView = new DayName(weekView.container);
        weekView.addChild(dayNameView);

        timeGridView = new TimeGrid(options, weekView.container);
        weekView.addChild(timeGridView);

        var d = new Drag(weekView.container);
        d.on({
            'dragStart': function(e) {
                console.log('dragStart', e);
            },
            'drag': function(e) {
                console.log('drag', e);
            },
            'dragEnd': function(e) {
                console.log('dragEnd', e);
            }
        });

        return weekView;
    }
};

