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

    describe('_updateSchedule()', function() {
        var baseControllerMock;

        beforeEach(function() {
            baseControllerMock = jasmine.createSpyObj('Base', ['updateSchedule']);
            baseControllerMock.schedules = {
                items: {
                    '20': {
                        getStarts: function() {
                            return new TZDate(2015, 4, 1, 9, 30);
                        },
                        getEnds: function() {
                            return new TZDate(2015, 4, 1, 10, 30);
                        },
                        start: new TZDate(2015, 4, 1, 9, 30),
                        end: new TZDate(2015, 4, 1, 10, 30),
                        duration: function() {
                            return datetime.millisecondsFrom('hour', 1);
                        }
                    }
                }
            }

            mockInstance = {
                baseController: baseControllerMock,
                fire: jasmine.createSpy('fire')
            };
        });

        it('update schedule model by schedule data.', function() {
            var oneHour = datetime.millisecondsFrom('hour', 1);
            var scheduleData = {
                targetModelID: 20,
                nearestRange: [0, oneHour],
                relatedView: {
                    getDate: function() {
                        return new TZDate(2015, 4, 1);
                    }
                }
            };
            TimeResize.prototype._updateSchedule.call(mockInstance, scheduleData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateSchedule', {
                schedule: baseControllerMock.schedules.items[20],
                changes: {
                    end: new TZDate(2015, 4, 1, 11)
                },
                start: new TZDate(2015, 4, 1, 9, 30),
                end: new TZDate(2015, 4, 1, 11)
            });
        });

        it('can\'t update schedule duration less than 30 minutes.', function() {
            var scheduleData = {
                targetModelID: 20,
                // backward resize!
                nearestRange: [new TZDate(2015, 4, 1, 9, 30), new TZDate(2015, 4, 1, 9, 30).addMinutes(-60)],
                relatedView: {
                    getDate: function() {
                        return new TZDate(2015, 4, 1);
                    }
                }
            };
            TimeResize.prototype._updateSchedule.call(mockInstance, scheduleData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateSchedule', {
                schedule: baseControllerMock.schedules.items[20],
                changes: {
                    end: new TZDate(2015, 4, 1, 10)
                },
                start: new TZDate(2015, 4, 1, 9, 30),
                end: new TZDate(2015, 4, 1, 10)
            });
        });

        it('can\' update end exceed 23:59:59:999', function() {
            var twoDay = datetime.millisecondsFrom('hour', 48);
            var scheduleData = {
                targetModelID: 20,
                nearestRange: [0, twoDay],
                relatedView: {
                    getDate: function() {
                        return new TZDate(2015, 4, 1);
                    }
                }
            };
            TimeResize.prototype._updateSchedule.call(mockInstance, scheduleData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateSchedule', {
                schedule: baseControllerMock.schedules.items[20],
                changes: {
                    end: new TZDate(2015, 4, 1, 23, 59, 59)
                },
                start: new TZDate(2015, 4, 1, 9, 30),
                end: new TZDate(2015, 4, 1, 23, 59, 59)
            });
        });

    });
});
