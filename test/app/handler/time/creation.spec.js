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

    it('activate time.creation handler when mousedown on gutter element between events.', function() {
        var target = document.createElement('div');
        domutil.addClass(target, '/* @echo CSS_PREFIX */time-date');
        domutil.addClass(target, 'tui-view-20');

        var gutter = document.createElement('div');
        domutil.addClass(gutter, '/* @echo CSS_PREFIX */time-date-event-block-wrap');

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

    describe('_createEvent()', function() {
        var baseControllerMock,
            mock;

        beforeEach(function() {
            spyOn(window, 'prompt').and.returnValue('my event');
            baseControllerMock = jasmine.createSpyObj('Base', ['createEvent']);
            mock = {
                baseController: baseControllerMock,
                guide: jasmine.createSpyObj('timeCreation', ['clearGuideElement']),
                fire: jasmine.createSpy('fire')
            };
        });

        it('try to create event by dragend event data.', function() {
            var eventData = {
                relatedView: {
                    getDate: function() {
                        return new TZDate(2015, 4, 5);
                    }
                },
                createRange: [
                    (new TZDate(2015, 4, 5, 1).getTime()),
                    (new TZDate(2015, 4, 5, 1, 30).getTime())
                ],
                nearestGridTimeY: (new TZDate(2015, 4, 5, 1, 30).getTime())
            };

            TimeCreation.prototype._createEvent.call(mock, eventData);

            expect(mock.fire).toHaveBeenCalledWith('beforeCreateEvent', {
                isAllDay: false,
                starts: new TZDate(2015, 4, 5, 1),
                ends: new TZDate(2015, 4, 5, 1, 30),
                guide: mock.guide
            });
        });

        it('can invoke base#createEvent by click event data.', function() {
            var eventData = {
                relatedView: {
                    getDate: function() {
                        return new TZDate(2015, 4, 5);
                    }
                },
                nearestGridTimeY: (new TZDate(2015, 4, 5, 1, 30).getTime())
            };

            TimeCreation.prototype._createEvent.call(mock, eventData);

            expect(mock.fire).toHaveBeenCalledWith('beforeCreateEvent', {
                isAllDay: false,
                starts: new TZDate(2015, 4, 5, 1, 30),
                ends: new TZDate(2015, 4, 5, 2),
                guide: mock.guide
            });

        });
    });
});
