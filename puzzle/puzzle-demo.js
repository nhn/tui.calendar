'use strict';
(function(util, calendar) {
    var CALENDAR_HEIGHT = 920,
        CALENDAR_WIDTH = 220;

    var forEachArr = util.forEachArray;
    var inArray = util.inArray;
    var domutil = calendar.domutil;
    var aps = Array.prototype.slice;

    var rootElement;
    var dataList;
    var collisionGroups;
    var matrices;
    var events = {};
    var eventList = [];
    var frag;
    var container;

    function calcCollision(eventList) {
        var collisionGroups = [],
            foundPrevCollisionEvent = false,
            previousEventList;

        collisionGroups[0] = [util.stamp(eventList[0])];
        forEachArr(eventList.slice(1), function(event, index) {
            foundPrevCollisionEvent = false;
            previousEventList = aps.apply(eventList, [0, index + 1]).reverse();

            forEachArr(previousEventList, function(previous) {
                if (event.collidesWith(previous)) {
                    // 이전 일정들과 겹치는 경우 겹치는 일정의 Collision Group을
                    // 찾아 이 일정을 추가한다
                    foundPrevCollisionEvent = true;

                    forEachArr(collisionGroups.slice(0).reverse(), function(group) {
                        if (~inArray(util.stamp(previous), group)) {
                            // 겹치는 이전 일정을 찾은 경우 그 일정이 속한
                            // Collision Group에 이 일정을 포함시킨다.
                            group.push(util.stamp(event));
                            return false;
                        }
                    }, this);

                    return false;
                }
            });

            if (!foundPrevCollisionEvent) {
                // 이 일정은 이전일정과 겹치지 않는 일정이므로
                // 새 Collision Group을 구성한다.
                collisionGroups.push([util.stamp(event)]);
            }
        });

        return collisionGroups;
    }

    function getLastRowInColumn(matrix, col) {
        var row = matrix.length;

        while (row > 0) {
            row -= 1;
            if (!util.isUndefined(matrix[row][col])) {
                return row;
            }
        }

        return false;
    }

    function calcMatrices(events, collisionGroups) {
        var event,
            result = [],
            matrix,
            found,
            col,
            nextRow,
            lastRowInColumn;

        forEachArr(collisionGroups, function(group) {
            matrix = [[]];

            forEachArr(group, function(eventID) {
                event = events[eventID];
                col = 0;
                found = false;

                while (!found) {
                    lastRowInColumn = getLastRowInColumn(matrix, col);

                    if (lastRowInColumn === false) {
                        matrix[0].push(event);
                        found = true;
                    } else if (!event.collidesWith(matrix[lastRowInColumn][col])) {
                        nextRow = lastRowInColumn + 1;
                        if (util.isUndefined(matrix[nextRow])) {
                            matrix[nextRow] = [];
                        }
                        matrix[nextRow][col] = event;
                        found = true;
                    }

                    col += 1;
                }
            });

            result.push(matrix);
        });

        return result;
    }

    function drawEventsByMatrices(matrices, container) {
        var element,
            top,
            width,
            height,
            dateOffset = +new Date('2015/05/01'),
            maxRowLength,
            leftPositions,
            i;

        forEachArr(matrices, function(matrix) {
            maxRowLength = 1;
            forEachArr(matrix, function(row) {
                maxRowLength = Math.max(maxRowLength, row.length);
            });

            width = CALENDAR_WIDTH / maxRowLength;

            leftPositions = [];
            for (i = 0; i < maxRowLength; i += 1) {
                leftPositions[i] = width * i;
            }

            forEachArr(matrix, function(row) {
                forEachArr(row, function(event, col) {
                    if (event) {
                        element = domutil.appendHTMLElement('div', container, 'event');
                        element.innerHTML = event.title;

                        top = event.starts - dateOffset;
                        top = (CALENDAR_HEIGHT * top) / calendar.datetime.MILLISECONDS_PER_DAY;
                        height = (CALENDAR_HEIGHT * +event.duration()) / calendar.datetime.MILLISECONDS_PER_DAY;

                        element.style.width = (width - 9) + 'px';
                        element.style.height = height + 'px';
                        element.style.top = top + 'px';
                        element.style.left = leftPositions[col] + 'px';
                    }
                });
            });
        });
    }

    function refreshCurrentLine() {
        var now = new Date('2015/05/01'),
            offset,
            top;

        now.setHours(new Date().getHours(),
                     new Date().getMinutes(),
                     new Date().getSeconds());

        offset = +now - +new Date('2015/05/01');
        top = (CALENDAR_HEIGHT * offset) / calendar.datetime.MILLISECONDS_PER_DAY;

        document.querySelector('.current').style.top = top + 'px';
    }

    dataList = [{
        title: 'A',
        isAllDay: false,
        starts: '2015-05-01T10:20:00+09:00',
        ends: '2015-05-01T10:40:00+09:00'
    }, {
        title: 'B',
        isAllDay: false,
        starts: '2015-05-01T10:30:00+09:00',
        ends: '2015-05-01T11:30:00+09:00'
    }, {
        title: 'C',
        isAllDay: false,
        starts: '2015-05-01T11:20:00+09:00',
        ends: '2015-05-01T12:00:00+09:00'
    }, {
        title: 'D',
        isAllDay: false,
        starts: '2015-05-01T10:50:00+09:00',
        ends: '2015-05-01T11:10:00+09:00'
    }, {
        title: 'E',
        isAllDay: false,
        starts: '2015-05-01T13:20:00+09:00',
        ends: '2015-05-01T13:40:00+09:00'
    }, {
        title: 'F',
        isAllDay: false,
        starts: '2015-05-01T14:00:00+09:00',
        ends: '2015-05-01T14:20:00+09:00'
    }, {
        title: 'G',
        isAllDay: false,
        starts: '2015-05-01T14:10:00+09:00',
        ends: '2015-05-01T14:20:00+09:00'
    }, {
        title: 'H',
        isAllDay: false,
        starts: '2015-05-01T16:00:00+09:00',
        ends: '2015-05-01T18:00:00+09:00'
    }, {
        title: 'I',
        isAllDay: false,
        starts: '2015-05-01T17:00:00+09:00',
        ends: '2015-05-01T20:00:00+09:00'
    }, {
        title: 'J',
        isAllDay: false,
        starts: '2015-05-01T19:00:00+09:00',
        ends: '2015-05-01T21:00:00+09:00'
    }, {
        title: '출근',
        isAllDay: false,
        starts: '2015-05-01T09:30:00+09:00',
        ends: '2015-05-01T18:30:00+09:00'
    }, {
        title: '물고기 밥주기',
        isAllDay: false,
        starts: '2015-05-01T22:00:00+09:00',
        ends: '2015-05-01T22:10:00+09:00'
    }];

    // sort, placing
    eventList = util.map(dataList, function(data) {
        var event = calendar.Event.create(data);
        events[util.stamp(event)] = event;
        return event;
    });
    eventList.sort(calendar.array.compare.event.asc);
    collisionGroups = calcCollision(eventList);
    matrices = calcMatrices(events, collisionGroups);

    // render
    container = domutil.appendHTMLElement('div', document.getElementById('event-list'));
    frag = document.createDocumentFragment();
    // drawEvents(events, collisionGroups, frag);
    drawEventsByMatrices(matrices, frag);
    container.appendChild(frag);

    refreshCurrentLine();
})(ne.util, ne.dooray.calendar);

