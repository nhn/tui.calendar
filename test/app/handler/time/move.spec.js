/*eslint-disable*/
var domutil = require('common/domutil');
var datetime = require('common/datetime');
var TimeMove = require('handler/time/move');
var TZDate = require('common/timezone').Date;

describe('handler/time.move', function() {
    var util = tui.util,
        mockInstance;

    it('checkExpectedCondition()', function() {
        mockInstance = jasmine.createSpyObj('TimeMove', ['_getTimeView']);
        var target = document.createElement('div');
        expect(TimeMove.prototype.checkExpectCondition(target)).toBe(false);
        expect(mockInstance._getTimeView).not.toHaveBeenCalled();

        domutil.addClass(target, '/* @echo CSS_PREFIX */time-event');
        TimeMove.prototype.checkExpectCondition.call(mockInstance, target);

        expect(mockInstance._getTimeView).toHaveBeenCalledWith(target);
    });

    it('_getTimeView() return Time view instance by event target.', function() {
        var container = document.createElement('div');
        domutil.addClass(container, '/* @echo CSS_PREFIX */time-date');
        domutil.addClass(container, 'tui-view-20');

        var target = document.createElement('div');
        domutil.addClass(target, '/* @echo CSS_PREFIX */time-event');

        container.appendChild(target);

        mockInstance.timeGridView = {
            children: {
                items: {
                    20: 'good'
                }
            }
        };

        expect(TimeMove.prototype._getTimeView.call(mockInstance, target)).toBe('good');

        expect(TimeMove.prototype._getTimeView.call(mockInstance, document.createElement('div'))).toBe(false);

        domutil.removeClass(container, 'tui-view-20');
        expect(TimeMove.prototype._getTimeView.call(mockInstance, target)).toBe(false);
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
                    getDate: function() { return new TZDate(2015, 4, 1); }
                },
                currentView: {
                    getDate: function() { return new TZDate(2015, 4, 1); }
                }
            };
            TimeMove.prototype._updateEvent.call(mockInstance, eventData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateEvent', {
                model: baseControllerMock.events.items[20],
                starts: new TZDate(2015, 4, 1, 10),
                ends: new TZDate(2015, 4, 1, 11)
            });
        });

        it('limit updatable start and ends.', function() {
            var oneHour = datetime.millisecondsFrom('hour', 1);
            baseControllerMock.events.items['20'].starts = new TZDate(2015, 4, 1);
            baseControllerMock.events.items['20'].starts = new TZDate(2015, 4, 1, 0, 30);
            baseControllerMock.events.items['20'].getStarts = function() {
                return new TZDate(2015, 4, 1)
            };
            baseControllerMock.events.items['20'].getEnds = function() {
                return new TZDate(2015, 4, 1, 0, 30)
            };
            baseControllerMock.events.items['20'].duration = function() {
                return new TZDate(30 * 60 * 1000);
            };

            var eventData = {
                targetModelID: 20,
                nearestRange: [oneHour, 0],
                relatedView: {
                    getDate: function() { return new TZDate(2015, 4, 1); }
                },
                currentView: {
                    getDate: function() { return new TZDate(2015, 4, 1); }
                }
            };

            TimeMove.prototype._updateEvent.call(mockInstance, eventData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateEvent', {
                model: baseControllerMock.events.items[20],
                starts: new TZDate(2015, 4, 1),
                ends: new TZDate(2015, 4, 1, 0, 30)
            });

            baseControllerMock.updateEvent.calls.reset();
            eventData.nearestRange = [0, datetime.millisecondsFrom('hour', 25)];
            TimeMove.prototype._updateEvent.call(mockInstance, eventData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateEvent', {
                model: baseControllerMock.events.items[20],
                starts: new TZDate(2015, 4, 1, 23, 29, 59),
                ends: new TZDate(2015, 4, 1, 23, 59, 59)
            });
        });
    });
});
