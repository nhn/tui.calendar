'use strict';

var ScheduleCreationPopup = require('../../../src/js/view/popup/scheduleCreationPopup');
var TZDate = require('common/timezone').Date;

/**
 * NOTE: Due to external dependency(tui-date-picker) and testing environment,
 * couldn't add detailed test cases. Writing more intergrated test would draw a better coverage.
 * e.g.) Changeing date range picker values
 */
describe('ScheduleCreationPopup date range picker', function() {
    var container, popup;
    var startPickerId = 'tui-full-calendar-schedule-start-date';
    var endPickerId = 'tui-full-calendar-schedule-end-date';
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
        var allDaySectionClassName = 'tui-full-calendar-section-allday';
        var clickEvent = new MouseEvent('click', {bubbles: true});

        document.querySelector('.' + allDaySectionClassName).dispatchEvent(clickEvent);
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
        var popupClassName = 'tui-full-calendar-popup-container';
        var popupNode = document.getElementsByClassName(popupClassName);
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
        return document.getElementById('tui-full-calendar-schedule-private');
    }

    function togglePrivateButton() {
        getPrivateButton().click();
    }

    function clickSaveButton() {
        var saveButton = document.querySelector('.tui-full-calendar-popup-save');
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
        var result;
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

        result = spy.calls.argsFor(0)[0];

        expect(result.isPrivate).toBe(true);
        expect(spy.calls.any()).toBe(true);
    });

    it('should be able to update public schedule to private schedule', function() {
        var result;
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

        result = spy.calls.argsFor(0)[0];

        expect(result.changes.isPrivate).toBe(true);
    });

    it('should render private status activated when editing private schedule', function() {
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

        expect(getPrivateButton().classList.contains('tui-full-calendar-public')).toBe(false);
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
