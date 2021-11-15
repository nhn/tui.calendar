'use strict';

var config = require('config');
var domutil = require('common/domutil');
var TZDate = require('common/timezone').Date;
var ScheduleCreationPopup = require('../../../src/js/view/popup/scheduleCreationPopup');

/**
 * NOTE: Due to external dependency(tui-date-picker) and testing environment,
 * couldn't add detailed test cases. Writing more intergrated test would draw a better coverage.
 * e.g.) Changeing date range picker values
 */
describe('ScheduleCreationPopup date range picker', function() {
    var container, popup;
    var startPickerId = config.cssPrefix + 'schedule-start-date';
    var endPickerId = config.cssPrefix + 'schedule-end-date';
    var mockTimedViewModel = {
        start: new TZDate('2015-05-01T09:00:00'),
        end: new TZDate('2015-05-01T10:00:00'),
        guide: jasmine.createSpyObj('guide', ['clearGuideElement'])
    };
    var mockAllDayViewModel = {
        start: new TZDate('2015-05-01T09:00:00'),
        end: new TZDate('2015-05-01T10:00:00'),
        isAllDay: true,
        guide: jasmine.createSpyObj('guide', ['clearGuideElement'])
    };

    function getInputValue(inputId) {
        var input = document.getElementById(inputId);

        return input ? input.value : null;
    }

    function clickAllDaySection() {
        var clickEvent = new MouseEvent('click', {bubbles: true});

        document.querySelector(config.classname('.section-allday')).dispatchEvent(clickEvent);
    }

    beforeEach(function() {
        fixture.load('view.html');
        container = document.getElementById('container');
        popup = new ScheduleCreationPopup(container, [], false);
    });

    afterEach(function() {
        fixture.cleanup();
        popup.destroy();
    });

    it('should render start & end dates on the date range picker', function() {
        var popupNode = document.querySelector(config.classname('.popup-container'));
        popup.render(mockTimedViewModel);

        expect(popupNode).toBeDefined();
        expect(getInputValue(startPickerId)).toBe('2015-05-01 09:00');
        expect(getInputValue(endPickerId)).toBe('2015-05-01 10:00');
    });

    it('should not show time values for allday events at initial render', function() {
        popup.render(mockAllDayViewModel);

        expect(getInputValue(startPickerId)).toBe('2015-05-01');
        expect(getInputValue(endPickerId)).toBe('2015-05-01');
    });

    it('should be able to switch between timed and allday range pickers', function() {
        popup.render(mockTimedViewModel);
        clickAllDaySection();

        expect(getInputValue(startPickerId)).toBe('2015-05-01');
        expect(getInputValue(endPickerId)).toBe('2015-05-01');

        clickAllDaySection();

        expect(getInputValue(startPickerId)).toBe('2015-05-01 09:00');
        expect(getInputValue(endPickerId)).toBe('2015-05-01 10:00');
    });

    it('should set default start & end time when start editing allday events', function() {
        var mockViewModel = Object.create(mockAllDayViewModel);
        mockViewModel.schedule = {id: ''};

        popup.render(mockAllDayViewModel);

        clickAllDaySection();

        expect(getInputValue(startPickerId)).toBe('2015-05-01 12:00');
        expect(getInputValue(endPickerId)).toBe('2015-05-01 13:00');
    });
});

describe('ScheduleCreationPopup private schedule', function() {
    var container, popup;

    function getPrivateButton() {
        return document.getElementById(config.cssPrefix + 'schedule-private');
    }

    function togglePrivateButton() {
        getPrivateButton().click();
    }

    function clickSaveButton() {
        var saveButton = document.querySelector(config.classname('.popup-save'));
        saveButton.click();
    }

    beforeEach(function() {
        fixture.load('view.html');
        container = document.getElementById('container');
        popup = new ScheduleCreationPopup(container, [], false);
    });

    afterEach(function() {
        fixture.cleanup();
        popup.destroy();
    });

    it('should be able to create private schedule', function() {
        var creationEventData;
        var mockViewModel = {
            title: 'mock schedule',
            start: new TZDate('2015-05-01T09:00:00'),
            end: new TZDate('2015-05-01T10:00:00'),
            guide: jasmine.createSpyObj('guide', ['clearGuideElement'])
        };
        var spy = jasmine.createSpy('beforeCreateSchedule');
        popup.on('beforeCreateSchedule', spy);
        popup.render(mockViewModel);

        togglePrivateButton();
        clickSaveButton();

        creationEventData = spy.calls.argsFor(0)[0];

        expect(creationEventData.isPrivate).toBe(true);
    });

    it('should be able to update public schedule to private schedule', function() {
        var updateEventData;
        var mockEditModeViewModel = {
            schedule: {
                id: '1',
                title: 'mock schedule',
                start: new TZDate('2015-05-01T09:00:00'),
                end: new TZDate('2015-05-01T10:00:00'),
                guide: jasmine.createSpyObj('guide', ['clearGuideElement'])
            }
        };
        var spy = jasmine.createSpy('beforeUpdateSchedule');
        popup.on('beforeUpdateSchedule', spy);
        popup.render(mockEditModeViewModel);

        togglePrivateButton();
        clickSaveButton();

        updateEventData = spy.calls.argsFor(0)[0];

        expect(updateEventData.changes.isPrivate).toBe(true);
    });

    it('should render private status activated when editing private schedule', function() {
        var isPrivateEnabled;
        var mockEditModeViewModel = {
            schedule: {
                id: '1',
                title: 'mock schedule',
                start: new TZDate('2015-05-01T09:00:00'),
                end: new TZDate('2015-05-01T10:00:00'),
                guide: jasmine.createSpyObj('guide', ['clearGuideElement']),
                isPrivate: true
            }
        };
        popup.render(mockEditModeViewModel);

        isPrivateEnabled = !domutil.hasClass(getPrivateButton(), config.cssPrefix + 'public');
        expect(isPrivateEnabled).toBe(true);
    });
});

/* eslint-disable object-property-newline */
describe('ScheduleCreationPopup#_calcRenderingData', function() {
    var popupSize, containerSize;

    beforeEach(function() {
        popupSize = {width: 200, height: 80};
        containerSize = {top: 50, left: 100, bottom: 300, right: 500, width: 500, height: 300};
    });

    it('it is usually placed at the top center of the guide element', function() {
        var guideBound = {top: 200, left: 100, bottom: 200, right: 400};
        var posData = ScheduleCreationPopup.prototype._calcRenderingData(popupSize, containerSize, guideBound);

        expect(posData.x).toBe(50);
        expect(posData.y).toBe(67);
        expect(posData.arrow.direction).toBe('arrow-bottom');
        expect(posData.arrow.position).toBeUndefined();
    });

    it('if it overflows the top of the container, it should be placed under the guide element', function() {
        var guideBound = {top: 100, left: 100, bottom: 200, right: 400};
        var posData = ScheduleCreationPopup.prototype._calcRenderingData(popupSize, containerSize, guideBound);

        expect(posData.x).toBe(50);
        expect(posData.y).toBe(153);
        expect(posData.arrow.direction).toBe('arrow-top');
        expect(posData.arrow.position).toBeUndefined();
    });

    it('when overflowing to the left of the container, the left value is set to 0 and the left value of the arrow is also set.', function() {
        var guideBound = {top: 200, left: 50, bottom: 200, right: 200};
        var posData = ScheduleCreationPopup.prototype._calcRenderingData(popupSize, containerSize, guideBound);

        expect(posData.x).toBe(0);
        expect(posData.arrow.position).toBeDefined();
    });

    it('when it overflows to the right of the container, the popup is aligned to the right and the left value of the arrow should be set', function() {
        var guideBound = {top: 200, left: 400, bottom: 200, right: 500};
        var posData = ScheduleCreationPopup.prototype._calcRenderingData(popupSize, containerSize, guideBound);

        expect(posData.x).toBe(200);
        expect(posData.arrow.position).toBeDefined();
    });
});

describe('ScheduleCreationPopup#_getRangeDate', function() {
    it('when it is an all-day schedule, set the hour and minute', function() {
        var start = new TZDate('2020/04/24 10:00:00');
        var end = new TZDate('2020/04/24 15:00:00');
        var rangeDate = ScheduleCreationPopup.prototype._getRangeDate(start, end, true);

        expect(rangeDate.start).toEqual(new TZDate('2020/04/24 00:00:00'));
        expect(rangeDate.end).toEqual(new TZDate('2020/04/24 23:59:59'));
    });

    it('when it is not an all-day schedule, if the end date is entered user date', function() {
        var start = new TZDate('2020/04/24 00:00:00');
        var end = new TZDate('2020/04/25 00:00:00');
        var rangeDate = ScheduleCreationPopup.prototype._getRangeDate(start, end, false);

        expect(rangeDate.start).toEqual(new TZDate('2020/04/24 00:00:00'));
        expect(rangeDate.end).toEqual(new TZDate('2020/04/25 00:00:00'));
    });
});
