/**
 * @fileoverview View of time.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../datetime');
var domutil = require('../common/domutil');
var View = require('./view');
var EventViewModel = require('../model/viewModel/event');
var timeTmpl = require('./template/time.hbs');

var forEachArr = util.forEachArray;
var HOUR_TO_MILLISECONDS = 60 * 60 * 1000;

/**
 * @constructor
 * @extends {View}
 * @param {number} width Date element width (percent)
 * @param {object} options Options
 * @param {string} options.ymd YYYMMDD string for this view
 * @param {boolean} options.isToday when set true then assign today design class to container.
 * @param {number} options.hourStart Can limit of render hour start.
 * @param {number} options.hourEnd Can limit of render hour end.
 * @param {HTMLElement} container Element to use container for this view.
 */
function Time(width, options, container) {
    View.call(this, null, container);

    container.style.width = width + '%';

    this.options = util.extend({
        ymd: '',
        isToday: false,
        hourStart: 0,
        hourEnd: 24
    }, options || {});

    if (this.options.isToday) {
        domutil.addClass(this.container, 'view-time-date-today');
    }
}

util.inherit(Time, View);

//TODO: REFACTORING!!!
Time.prototype.setViewModel = function(matrices) {
    var options = this.options,
        hourStart = options.hourStart,
        hourEnd = options.hourEnd,
        containerBound = this.getViewBound(),
        leftPercents,
        widthPercent,
        maxRowLength,
        todayStart,
        viewModel,
        nextEvent,
        baseMil,
        height,
        width,
        top,
        i;

    forEachArr(matrices, function(matrix) {
        maxRowLength = 1;
        forEachArr(matrix, function(row) {
            maxRowLength = Math.max(maxRowLength, row.length);
        });

        widthPercent = 100 / maxRowLength;

        leftPercents = [];
        for (i = 0; i < maxRowLength; i += 1) {
            leftPercents[i] = widthPercent * i;
        }

        forEachArr(matrix, function(row) {
            forEachArr(row, function(event, col, scope) {
                if (event) {
                    todayStart = datetime.start(event.starts);

                    top = event.starts - todayStart;

                    if (hourStart) {
                        top -= hourStart * HOUR_TO_MILLISECONDS;
                    }

                    baseMil = ((hourEnd - hourStart) * HOUR_TO_MILLISECONDS);

                    top = (containerBound.height * top) / baseMil;
                    height = (containerBound.height * event.duration()) / baseMil;

                    // Matrix의 다음 이벤트와 겹치지 않는 이벤트일땐 width을 제거함
                    nextEvent = scope[col + 1];
                    if (col > 0 && nextEvent && !event.collidesWith(nextEvent)) {
                        width = null;
                    } else {
                        width = widthPercent;
                    }

                    viewModel = EventViewModel.create(event);
                    viewModel.width = width;
                    viewModel.height = height;
                    viewModel.top = top;
                    viewModel.left = leftPercents[col];

                    scope[col] = viewModel;
                }
            });
        });
    });
};

Time.prototype.render = function(matrices) {
    this.setViewModel(matrices);
    this.container.innerHTML = timeTmpl({
        matrices: matrices
    });
};

module.exports = Time;

