/*eslint-disable*/
describe('handler/time.creation', function() {
    var domutil = ne.dooray.calendar.domutil;
    var TimeCreation = ne.dooray.calendar.TimeCreation;

    it('checkExpectedCondition() can judge activation of time.creation handler by event target.', function() {
        var target = document.createElement('div');

        expect(TimeCreation.prototype.checkExpectedCondition(target)).toBe(false);
    });

    it('activate time.creation handler when mousedown time grids.', function() {
        var target = document.createElement('div');
        domutil.addClass(target, '/* @echo CSS_PREFIX */time-date');
        domutil.addClass(target, '/* @echo CSS_PREFIX */20');

        var mock = {
            timeGridView: {
                childs: {
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
        domutil.addClass(target, '/* @echo CSS_PREFIX */20');

        var gutter = document.createElement('div');
        domutil.addClass(gutter, '/* @echo CSS_PREFIX */time-date-event-block');

        target.appendChild(gutter);

        var mock = {
            timeGridView: {
                childs: {
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
                        return new Date('2015-05-05T00:00:00+09:00');
                    }
                },
                createRange: [
                    (new Date('2015-05-05T01:00:00+09:00').getTime()),
                    (new Date('2015-05-05T01:30:00+09:00').getTime())
                ],
                nearestGridTimeY: (new Date('2015-05-05T01:30:00+09:00').getTime())
            };

            TimeCreation.prototype._createEvent.call(mock, eventData);

            expect(mock.fire).toHaveBeenCalledWith('beforeCreateEvent', {
                isAllDay: false,
                starts: new Date('2015-05-05T01:00:00+09:00'),
                ends: new Date('2015-05-05T01:30:00+09:00')
            });
        });

        it('can invoke base#createEvent by click event data.', function() {
            var eventData = {
                relatedView: {
                    getDate: function() {
                        return new Date('2015-05-05T00:00:00+09:00');
                    }
                },
                nearestGridTimeY: (new Date('2015-05-05T01:30:00+09:00').getTime())
            };

            TimeCreation.prototype._createEvent.call(mock, eventData);

            expect(mock.fire).toHaveBeenCalledWith('beforeCreateEvent', {
                isAllDay: false,
                starts: new Date('2015-05-05T01:30:00+09:00'),
                ends: new Date('2015-05-05T02:00:00+09:00')
            });

        });
    });
});
