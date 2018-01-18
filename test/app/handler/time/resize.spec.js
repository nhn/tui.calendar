/*eslint-disable*/
var domutil = require('common/domutil');
var datetime = require('common/datetime');
var TimeResize = require('handler/time/resize');
var TZDate = require('common/timezone').Date;

describe('TimeResize', function() {
    var mockInstance;

    it('checkExpectCondition()', function() {
        var target = document.createElement('div');
        var parent = document.createElement('div');
        expect(TimeResize.prototype.checkExpectCondition(target)).toBe(false);

        domutil.addClass(target, '/* @echo CSS_PREFIX */time-resize-handle');
        expect(TimeResize.prototype.checkExpectCondition(target)).toBe(false);

        domutil.addClass(parent, '/* @echo CSS_PREFIX */time-date');
        domutil.addClass(parent, 'tui-view-20');

        parent.appendChild(target);

        mockInstance = {
            timeGridView: {
                children: {
                    items: {
                        '20': 'hello'
                    }
                }
            }
        };

        expect(TimeResize.prototype.checkExpectCondition.call(mockInstance, target)).toBe('hello');

        domutil.removeClass(parent, 'tui-view-20');
        expect(TimeResize.prototype.checkExpectCondition.call(mockInstance, target)).toBe(false);
    });

    describe('_updateEvent()', function() {
        var baseControllerMock;

        beforeEach(function() {
            baseControllerMock = jasmine.createSpyObj('Base', ['updateEvent']);
            baseControllerMock.events = {
                items: {
                    '20': {
                        getStarts: function() {
                            return new TZDate(2015, 4, 1, 9, 30);
                        },
                        getEnds: function() {
                            return new TZDate(2015, 4, 1, 10, 30);
                        },
                        starts: new TZDate(2015, 4, 1, 9, 30),
                        ends: new TZDate(2015, 4, 1, 10, 30),
                        duration: function() {
                            return new TZDate(datetime.millisecondsFrom('hour', 1));
                        }
                    }
                }
            }

            mockInstance = {
                baseController: baseControllerMock,
                fire: jasmine.createSpy('fire')
            };
        });

        it('update event model by event data.', function() {
            var oneHour = datetime.millisecondsFrom('hour', 1);
            var eventData = {
                targetModelID: 20,
                nearestRange: [0, oneHour],
                relatedView: {
                    getDate: function() {
                        return new TZDate(2015, 4, 1);
                    }
                }
            };
            TimeResize.prototype._updateEvent.call(mockInstance, eventData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateEvent', {
                model: baseControllerMock.events.items[20],
                starts: new TZDate(2015, 4, 1, 9, 30),
                ends: new TZDate(2015, 4, 1, 11)
            });
        });

        it('can\'t update event duration less than 30 minutes.', function() {
            var oneHour = datetime.millisecondsFrom('hour', 1);
            var eventData = {
                targetModelID: 20,
                // backward resize!
                nearestRange: [oneHour, 0],
                relatedView: {
                    getDate: function() {
                        return new TZDate(2015, 4, 1);
                    }
                }
            };
            TimeResize.prototype._updateEvent.call(mockInstance, eventData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateEvent', {
                model: baseControllerMock.events.items[20],
                starts: new TZDate(2015, 4, 1, 9, 30),
                ends: new TZDate(2015, 4, 1, 10)
            });
        });

        it('can\' update ends exceed 23:59:59:999', function() {
            var twoDay = datetime.millisecondsFrom('hour', 48);
            var eventData = {
                targetModelID: 20,
                nearestRange: [0, twoDay],
                relatedView: {
                    getDate: function() {
                        return new TZDate(2015, 4, 1);
                    }
                }
            };
            TimeResize.prototype._updateEvent.call(mockInstance, eventData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateEvent', {
                model: baseControllerMock.events.items[20],
                starts: new TZDate(2015, 4, 1, 9, 30),
                ends: new TZDate(2015, 4, 1, 23, 59, 59)
            });
        });

    });
});
