/*eslint-disable*/
describe('handler/time.move', function() {
    var domutil = ne.dooray.calendar.domutil;
    var TimeMove = ne.dooray.calendar.TimeMove;
    var mockInstance;

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
                            return new Date('2015-05-01T09:30:00+09:00');
                        },
                        getEnds: function() {
                            return new Date('2015-05-01T10:30:00+09:00');
                        },
                        starts: new Date('2015-05-01T09:30:00+09:00'),
                        ends: new Date('2015-05-01T10:30:00+09:00'),
                        duration: function() {
                            return new Date('1970-01-01T10:00:00+09:00');
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
            var oneHour = ne.dooray.calendar.datetime.millisecondsFrom('hour', 1);
            var eventData = {
                targetModelID: 20,
                nearestRange: [0, oneHour],
                relatedView: {
                    getDate: function() { return new Date('2015-05-01T00:00:00+09:00'); }
                },
                currentView: {
                    getDate: function() { return new Date('2015-05-01T00:00:00+09:00'); }
                }
            };

            TimeMove.prototype._updateEvent.call(mockInstance, eventData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateEvent', {
                model: baseControllerMock.events.items[20],
                starts: new Date('2015-05-01T10:00:00+09:00'),
                ends: new Date('2015-05-01T11:00:00+09:00')
            });
        });

        it('limit updatable start and ends.', function() {
            var oneHour = ne.dooray.calendar.datetime.millisecondsFrom('hour', 1);
            baseControllerMock.events.items['20'].starts = new Date('2015-05-01T00:00:00+09:00');
            baseControllerMock.events.items['20'].starts = new Date('2015-05-01T00:30:00+09:00');
            baseControllerMock.events.items['20'].getStarts = function() {
                return new Date('2015-05-01T00:00:00+09:00')
            };
            baseControllerMock.events.items['20'].getEnds = function() {
                return new Date('2015-05-01T00:30:00+09:00')
            };
            baseControllerMock.events.items['20'].duration = function() {
                return new Date((new Date('2015-05-01T00:30:00+09:00').getTime()) - (new Date('2015-05-01T00:00:00+09:00').getTime()));
            };

            var eventData = {
                targetModelID: 20,
                nearestRange: [oneHour, 0],
                relatedView: {
                    getDate: function() { return new Date('2015-05-01T00:00:00+09:00'); }
                },
                currentView: {
                    getDate: function() { return new Date('2015-05-01T00:00:00+09:00'); }
                }
            };

            TimeMove.prototype._updateEvent.call(mockInstance, eventData);
            
            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateEvent', {
                model: baseControllerMock.events.items[20],
                starts: new Date('2015-05-01T00:00:00+09:00'),
                ends: new Date('2015-05-01T00:30:00+09:00')
            });

            baseControllerMock.updateEvent.calls.reset();
            eventData.nearestRange = [0, ne.dooray.calendar.datetime.millisecondsFrom('hour', 25)];
            TimeMove.prototype._updateEvent.call(mockInstance, eventData);

            expect(mockInstance.fire).toHaveBeenCalledWith('beforeUpdateEvent', {
                model: baseControllerMock.events.items[20],
                starts: new Date('2015-05-01T23:29:59+09:00'),
                ends: new Date('2015-05-01T23:59:59+09:00')
            });
        });
    });
});
