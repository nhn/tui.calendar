/*eslint-disable*/
var util = require('tui-code-snippet');
var array = require('common/array');
var Schedule = require('model/schedule');

describe('common/array', function() {

    describe('common compare methods', function() {
        describe('compare.num', function() {
            var arr;

            beforeEach(function() {
                arr = [8, 3, 11, 29, 31, 55, 25, 1];
            });

            it('asc', function() {
                arr.sort(array.compare.num.asc);
                expect(arr).toEqual([1, 3, 8, 11, 25, 29, 31, 55]);
            });

            it('desc', function() {
                arr.sort(array.compare.num.desc);
                expect(arr).toEqual([55, 31, 29, 25, 11, 8, 3, 1]);
            });
        });

        describe('compare.str', function() {
            var arr;

            beforeEach(function() {
                arr = ['x', 'a', 'f', 'e', 'c', 'c', 'd', 'B', 'Z'];
            });

            it('asc', function() {
                arr.sort(array.compare.str.asc);
                expect(arr).toEqual(['B', 'Z', 'a', 'c', 'c', 'd', 'e', 'f', 'x']);
            });

            it('desc', function() {
                arr.sort(array.compare.str.desc);
                expect(arr).toEqual(['x', 'f', 'e', 'd', 'c', 'c', 'a', 'Z', 'B']);
            });

            it('ascIgnoreCase', function() {
                arr.sort(array.compare.str.ascIgnoreCase);
                expect(arr).toEqual(['a', 'B', 'c', 'c', 'd', 'e', 'f', 'x', 'Z']);
            });

            it('descIgnoreCase', function() {
                arr.sort(array.compare.str.descIgnoreCase);
                expect(arr).toEqual(['Z', 'x', 'f', 'e', 'd', 'c', 'c', 'B', 'a']);
            });

            it('sort check', function() {
                arr = ['WA', 'TX', 'CA'];
                arr.sort(array.compare.str.asc);
                expect(arr).toEqual(['CA', 'TX', 'WA']);
            });
        });

        describe('boolean', function() {
            var arr;

            beforeEach(function() {
                arr = [false, true, false];
            });

            it('asc()', function() {
                arr.sort(array.compare.bool.asc);
                expect(arr).toEqual([true, false, false]);
            });

            it('desc()', function() {
                arr.sort(array.compare.bool.desc);
                expect(arr).toEqual([false, false, true]);
            });
        });

        describe('Schedule', function() {
            var mockData,
                schedules;

            beforeEach(function() {
                mockData = fixture.load('schedule_set_string2.json');
                schedules = [];
            });

            afterEach(function() {
                fixture.cleanup();
            });

            it('isAllDay ASC, start ASC, duration DESC, id ASC', function() {
                util.forEach(mockData, function(data) {
                    schedules.push(Schedule.create(data));
                });

                schedules.sort(array.compare.schedule.asc);

                expect(util.pluck(schedules, 'title')).toEqual([
                    'hunting',
                    '평가기간',
                    'drawing study',
                    'meeting',
                    'physical training',
                    'logical training2',
                    'logical training'
                ])
            });

            it('duration', function() {
                var expected = ['B', 'A'];

                fixtures = [{
                    title: 'A',
                    isAllDay: false,
                    start: '2015/05/03 12:00:00',
                    end: '2015/05/03 12:10:00'
                }, {
                    title: 'B',
                    isAllDay: false,
                    start: '2015/05/03 12:00:00',
                    end: '2015/05/03 12:20:00'
                }];

                util.forEach(fixtures, function(data) {
                    schedules.push(Schedule.create(data));
                });

                schedules.sort(array.compare.schedule.asc);

                expect(util.pluck(schedules, 'title')).toEqual(expected);
            });
        });
    });

    describe('binary search', function() {
        var arr = [];

        beforeEach(function() {
            arr = ['B', 'Z', 'a', 'c', 'd', 'e', 'f', 'x']; // asc
        });

        it('return correct index to insertion.', function() {
            arr = ['CA', 'WA'];
            expect(array.bsearch(arr, 'TX')).toBe(-1);
        });

        it('search item index using binary search.', function() {
            expect(array.bsearch(arr, 'd')).toBe(4);
            expect(array.bsearch(arr, 'f')).toBe(6);
            expect(array.bsearch(arr, 'B')).not.toBe(1);
            expect(array.bsearch(arr, 'q')).toBeLessThan(0);
        });

        it('it can be used to insert the element.', function() {
            arr.splice(Math.abs(array.bsearch(arr, 'g')), 0, 'g');
            expect(util.inArray('g', arr)).toBe(7);
        });

        it('search by custom functions.', function() {
            arr = [{a: 'B'}, {a: 'e'}, {a: 'f'}, {a: 'x'}, {a: 'z'}]; // asc
            expect(array.bsearch(arr, 'f', function(item) {return item.a;})).toBe(2);
        });

        it('can search different sort type array.', function() {
            arr = [7, 2, 5, 1, 8, 4, 7, 5, 2];
            arr.sort(array.compare.num.desc);

            // 8, 7, 7, 5, 5, 4, 2, 2, 1
            expect(array.bsearch(arr, 5, null, array.compare.num.desc)).toBe(4);
            expect(array.bsearch(arr, 7, null, array.compare.num.desc)).toBe(1);
        });

        it('can search complicated sort type array.', function() {
            arr = [{
                f: 2,
                s: 13
            }, {
                f: 1,
                s: 5
            }, {
                f: 1,
                s: 3
            }, {
                f: 2,
                s: 2
            }, {
                f: 0,
                s: 15
            }, {
                f: 8,
                s: 1
            }, {
                f: 5,
                s: 12
            }, {
                f: 5,
                s: 2
            }];

            // f ASC, b DESC
            function compare(_a, _b) {
                var a = _a,
                    b = _b;

                if (a.f > b.f) {
                    return 1;
                } else if (a.f < b.f) {
                    return -1;
                } else if (a.s > b.s) {
                    return -1;
                } else if (a.s < b.s) {
                    return 1;
                }

                return 0;
            }
            arr.sort(compare);

            expect(array.bsearch(arr, {f: 5}, null, compare)).toBe(5);
            expect(array.bsearch(arr, {f: 5, s: 2}, null, compare)).toBe(6);
        });
    });
});

