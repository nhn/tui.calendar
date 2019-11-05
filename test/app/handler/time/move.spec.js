/*eslint-disable*/
var util = require('tui-code-snippet');
var domutil = require('common/domutil');
var datetime = require('common/datetime');
var TimeMove = require('handler/time/move');
var TZDate = require('common/timezone').Date;

describe('handler/time.move', function() {
    var mockInstance;

    it('checkExpectedCondition()', function() {
        mockInstance = jasmine.createSpyObj('TimeMove', ['_getTimeView']);
        var target = document.createElement('div');
        expect(TimeMove.prototype.checkExpectCondition(target)).toBe(false);
        expect(mockInstance._getTimeView).not.toHaveBeenCalled();

        domutil.addClass(target, '/* @echo CSS_PREFIX */time-schedule');
        TimeMove.prototype.checkExpectCondition.call(mockInstance, target);

        expect(mockInstance._getTimeView).toHaveBeenCalledWith(target);
    });

    it('_getTimeView() return Time view instance by schedule target.', function() {
        var container = document.createElement('div');
        domutil.addClass(container, '/* @echo CSS_PREFIX */time-date');
        domutil.addClass(container, 'tui-view-20');

        var target = document.createElement('div');
        domutil.addClass(target, '/* @echo CSS_PREFIX */time-schedule');

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
                    getDate: function() { return new TZDate(2015, 4, 1); }
                },
                currentView: {
                    getDate: function() { return new TZDate(2015, 4, 1); }
                }
            };
            TimeMove.prototype._updateSchedule.call(mockInstance, scheduleData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateSchedule', {
                schedule: baseControllerMock.schedules.items[20],
                start: new TZDate(2015, 4, 1, 10),
                end: new TZDate(2015, 4, 1, 11),
                changes: {
                    start: new TZDate(2015, 4, 1, 10),
                    end: new TZDate(2015, 4, 1, 11)
                }
            });
        });

        it('limit updatable start and end.', function() {
            baseControllerMock.schedules.items['20'].start = new TZDate(2015, 4, 1);
            baseControllerMock.schedules.items['20'].end = new TZDate(2015, 4, 1, 0, 30);
            baseControllerMock.schedules.items['20'].getStarts = function() {
                return new TZDate(2015, 4, 1);
            };
            baseControllerMock.schedules.items['20'].getEnds = function() {
                return new TZDate(2015, 4, 1, 0, 30);
            };
            baseControllerMock.schedules.items['20'].duration = function() {
                return 30 * 60 * 1000;
            };

            var scheduleData = {
                targetModelID: 20,
                nearestRange: [new TZDate(2015, 4, 1), new TZDate(2015, 4, 1).addMinutes(30)],
                relatedView: {
                    getDate: function() { return new TZDate(2015, 4, 1); }
                },
                currentView: {
                    getDate: function() { return new TZDate(2015, 4, 1); }
                }
            };

            TimeMove.prototype._updateSchedule.call(mockInstance, scheduleData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateSchedule', {
                schedule: baseControllerMock.schedules.items[20],
                changes: {
                    start: new TZDate(2015, 4, 1),
                    end: new TZDate(2015, 4, 1, 0, 30)
                },
                start: new TZDate(2015, 4, 1),
                end: new TZDate(2015, 4, 1, 0, 30)
            });

            baseControllerMock.updateSchedule.calls.reset();
            scheduleData.nearestRange = [0, datetime.millisecondsFrom('hour', 25)];
            TimeMove.prototype._updateSchedule.call(mockInstance, scheduleData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateSchedule', {
                schedule: baseControllerMock.schedules.items[20],
                changes: {
                    start: new TZDate(2015, 4, 2, 0, 30),
                    end: new TZDate(2015, 4, 2, 1)
                },
                start: new TZDate(2015, 4, 2, 0, 30),
                end: new TZDate(2015, 4, 2, 1)
            });
        });
    });

    describe('event handlers', function() {
        describe('_onDragStart()', function() {

            beforeEach(function() {
                spyOn(domutil, 'closest');
                spyOn(domutil, 'getData');
            });

            it('cancel drag event when the schedule is read-only', function() {
                var mockController = {
                    schedules: {
                        items: {
                            '3': {
                                isReadOnly: true
                            }
                        }
                    }
                };

                var mockInst = {
                    baseController: mockController,
                    checkExpectCondition: jasmine.createSpy('checkExpectCondition'),
                    fire: jasmine.createSpy('fire')
                };

                mockInst.checkExpectCondition.and.returnValue({});
                domutil.getData.and.returnValue(3);
                domutil.closest.and.returnValue({});

                TimeMove.prototype._onDragStart.call(mockInst, {});

                expect(mockInst.fire).not.toHaveBeenCalled();
            })
        });
    });
});
