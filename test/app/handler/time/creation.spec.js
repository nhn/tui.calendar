/*eslint-disable*/
var domutil = require('common/domutil');
var TimeCreation = require('handler/time/creation');
var TZDate = require('common/timezone').Date;

describe('handler/time.creation', function() {
    it('checkExpectedCondition() can judge activation of time.creation handler by event target.', function() {
        var target = document.createElement('div');

        expect(TimeCreation.prototype.checkExpectedCondition(target)).toBe(false);
    });

    it('activate time.creation handler when mousedown time grids.', function() {
        var target = document.createElement('div');
        domutil.addClass(target, '/* @echo CSS_PREFIX */time-date');
        domutil.addClass(target, 'tui-view-20');

        var mock = {
            timeGridView: {
                children: {
                    items: {
                        '20': 'good'
                    }
                }
            }
        };

        expect(TimeCreation.prototype.checkExpectedCondition.call(mock, target)).toBe('good');
    });

    it('activate time.creation handler when mousedown on gutter element between schedules.', function() {
        var target = document.createElement('div');
        domutil.addClass(target, '/* @echo CSS_PREFIX */time-date');
        domutil.addClass(target, 'tui-view-20');

        var gutter = document.createElement('div');
        domutil.addClass(gutter, '/* @echo CSS_PREFIX */time-date-schedule-block-wrap');

        target.appendChild(gutter);

        var mock = {
            timeGridView: {
                children: {
                    items: {
                        '20': 'good'
                    }
                }
            }
        };

        expect(TimeCreation.prototype.checkExpectedCondition.call(mock, gutter)).toBe('good');
    });

    describe('_createSchedule()', function() {
        var baseControllerMock,
            mock;

        beforeEach(function() {
            spyOn(window, 'prompt').and.returnValue('my schedule');
            baseControllerMock = jasmine.createSpyObj('Base', ['createSchedule']);
            mock = {
                baseController: baseControllerMock,
                guide: jasmine.createSpyObj('timeCreation', ['clearGuideElement']),
                fire: jasmine.createSpy('fire')
            };
        });

        it('try to create schedule by dragend schedule data.', function() {
            var scheduleData = {
                relatedView: {
                    getDate: function() {
                        return new TZDate(2015, 4, 5);
                    }
                },
                createRange: [
                    (new TZDate(2015, 4, 5, 1).getTime()),
                    (new TZDate(2015, 4, 5, 1, 30).getTime())
                ],
                nearestGridTimeY: (new TZDate(2015, 4, 5, 1, 30).getTime()),
                triggerEvent: 'dragend'
            };

            TimeCreation.prototype._createSchedule.call(mock, scheduleData);

            expect(mock.fire).toHaveBeenCalledWith('beforeCreateSchedule', {
                isAllDay: false,
                start: new TZDate(2015, 4, 5, 1),
                end: new TZDate(2015, 4, 5, 1, 30),
                guide: mock.guide,
                triggerEventName: 'dragend'
            });
        });

        it('can invoke base#createSchedule by click schedule data.', function() {
            var scheduleData = {
                relatedView: {
                    getDate: function() {
                        return new TZDate(2015, 4, 5);
                    }
                },
                nearestGridTimeY: (new TZDate(2015, 4, 5, 1, 30).getTime()),
                triggerEvent: 'click'
            };

            TimeCreation.prototype._createSchedule.call(mock, scheduleData);

            expect(mock.fire).toHaveBeenCalledWith('beforeCreateSchedule', {
                isAllDay: false,
                start: new TZDate(2015, 4, 5, 1, 30),
                end: new TZDate(2015, 4, 5, 2),
                guide: mock.guide,
                triggerEventName: 'click'
            });

        });
    });
});
