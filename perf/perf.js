(function() {

    var forEachArr = ne.util.forEachArray;

    function createEventsFromString(arr) {
        window.start = new Date();

        var events = [];

        forEachArr(arr, function(event) {
            var s = event.starts,
                e = event.ends;

            events.push({
                starts: new Date(event.starts),
                ends: new Date(event.ends)
            });
        });

        return events;
    }

    window.fromDateString = createEventsFromString;

    function createEventsFromDateObject(arr) {
        window.start = new Date();

        var events = [];

        forEachArr(arr, function(event) {
            var s = event.starts,
                e = event.ends;

            events.push({
                starts: new Date(s.y, s.M - 1, s.d, s.h, s.m, s.s),
                ends: new Date(e.y, e.M - 1, e.d, e.h, e.m, e.s)
            });
        });

        return events;
    }
    window.fromDateObject = createEventsFromDateObject;

    function createCustomEventFromDateObject(arr) {
        window.start = new Date();

        var events = [];

        forEachArr(arr, function(event) {
            var s = event.starts,
                e = event.ends;

            events.push({
                starts: s,
                ends: e 
            });
        });

        return events;
    }
    window.fromDateObjectCustomize = createCustomEventFromDateObject;

    function compare1(d1, d2) {
        var _d1 = d1.getTime(),
            _d2 = d2.getTime();

        if (_d1 > _d2) {
            return -1;
        } else if (_d1 < _d2) {
            return 1;
        }
        return 0;
    }

    var seq = ['y', 'M', 'd', 'h', 'm', 's'];
    function compare2(d1, d2) {
        var result = 0,
            left,
            right;

        forEachArr(seq, function(token) {
            left = d1[token];
            right = d2[token];

            if (left > right) {
                result = -1;
                return false;
            }

            if (right > left) {
                result = 1;
                return false;
            }
        });

        return result;
    }

    window.compare1 = compare1;
    window.compare2 = compare2;

    var d = new Date();

    function duration1(d1) {
        return new Date((d1.ends - d1.starts) + d.getTimezoneOffset() * 60000);
    }

    function duration2(d1) {
        var obj = {};

        forEachArr(seq, function(token) {
            obj[token] = d1.ends[token] - d1.starts[token];
        });

        return obj;
    }

    window.duration1 = duration1;
    window.duration2 = duration2;

    function compareDate(type, events, count) {
        var result = [];
        count = count || 500;

        var i = 0;

        if (type === 1 || type === 2) {
            forEachArr(events, function(event, index, arr) {
                var d1 = event,
                    d2 = arr[index + 1];

                if (d2) {
                    compare1(d1.starts, d2.starts);
                }

                if (i === count) {
                    return false;
                }
                i += 1;
            });

        } else {
            forEachArr(events, function(event, index, arr) {
                var d1 = event,
                    d2 = arr[index + 1];


                if (d2) {
                    compare2(d1.starts, d2.starts);
                }

                if (i === count) {
                    return false;
                }
                i += 1;
            });
        }

        return i;
    }
    window.compareDate = compareDate;

    window.durationDate = function(type, events, count) {
        count = count || 500;

        var i = 0,
            event;

        for(; i < count; i += 1) {
            event = events[i];

            if (type === 3) {
                duration2(event);
            } else {
                duration1(event);
            }
        }
    };

})();

