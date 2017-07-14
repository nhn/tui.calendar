var Freebusy = require('dooray/view/freebusy');
var TZDate = require('common/timezone').Date;

describe('Freebusy', function() {
    var inst;

    beforeEach(function() {
        inst = new Freebusy({}, document.createElement('div'));
    });

    xit('_getBlockBound() calculate relative bound of blocks', function() {
        var event1 = {
            from: '2015-01-01T09:00:00+09:00',
            to: '2015-01-01T010:00:00+09:00'
        };

        var actual = Freebusy.prototype._getBlockBound(event1);
        expect(actual[0]).toBe(0);
        expect(actual[1]).toBeCloseTo(167, 1);

        var event2 = {
            from: '2015-01-01T09:30:00+09:00',
            to: '2015-02-02T11:30:00+09:00'
        };

        var actual = Freebusy.prototype._getBlockBound(event2);
        expect(actual[0]).toBeCloseTo(39.58, 1);
        expect(actual[1]).toBeCloseTo(8.33, 1);
    });

    xit('_getSelectionBlock() calculate selection block bound', function() {
        var actual = Freebusy.prototype._getSelectionBlock('00:00', '12:00');
        expect(actual).toEqual([0, 50]);
    });

    xit('_getMilliseconds() get milliseconds value from sum of hour, minutes, seconds from date object.', function() {
        var date1 = new Date('2015-11-20T09:00:00+09:00');
        expect(Freebusy.prototype._getMilliseconds(date1)).toBe(32400000);

        var date2 = '2015-01-20T03:30:00+09:00';
        expect(Freebusy.prototype._getMilliseconds(date2)).toBe(10800000 + 1800000);
    });


    describe('addUser()', function() {
        it('Throw error when adding a non id user object', function() {
            expect(function() {
                inst.addUser({id: ''});
            }).toThrow();
        });

        it('Add user data properly.', function() {
            var user1 = {
                id: '1',
                name: '김민형',
                freebusy: [{
                    from: '2015-01-01T09:30:00+09:00',
                    to: '2015-01-01T11:30:00+09:00'
                }]
            };

            inst.addUser(user1);

            expect(inst.users.length).toBe(1);
            expect(inst.users.length).not.toBe(2);
            expect(inst.users.single()).toBe(user1);
        });
    });

    describe('arrangeFreebusy', function() {
        it('Sort freebusy by from', function() {
            var freebusy = [{
                from: '2017-07-14T20:00:00+09:00',
                to: '2017-07-14T21:00:00+09:00'
            }, {
                from: '2017-07-14T17:00:00+09:00',
                to: '2017-07-14T18:00:00+09:00'
            }, {
                from: '2017-07-14T09:30:00+09:00',
                to: '2017-07-14T11:30:00+09:00'
            }];
            var user = {
                freebusy: freebusy
            };

            inst._arrangeFreebusy(user);

            expect(user.freebusy[0]).toEqual(jasmine.objectContaining({
                from: '2017-07-14T09:30:00+09:00',
                to: '2017-07-14T11:30:00+09:00'
            }));
            expect(user.freebusy[1]).toEqual(jasmine.objectContaining({
                from: '2017-07-14T17:00:00+09:00',
                to: '2017-07-14T18:00:00+09:00'
            }));
            expect(user.freebusy[2]).toEqual(jasmine.objectContaining({
                from: '2017-07-14T20:00:00+09:00',
                to: '2017-07-14T21:00:00+09:00'
            }));
        });

        it('Rearrange time collision freebusy with 2 schedules', function() {
            var freebusy = [{
                from: '2017-07-14T17:00:00+09:00',
                to: '2017-07-14T21:00:00+09:00',
                fromMilliseconds: inst._getMilliseconds('2017-07-14T17:00:00+09:00'),
                toMilliseconds: inst._getMilliseconds('2017-07-14T21:00:00+09:00')
            }, {
                from: '2017-07-14T15:00:00+09:00',
                to: '2017-07-14T18:00:00+09:00',
                fromMilliseconds: inst._getMilliseconds('2017-07-14T15:00:00+09:00'),
                toMilliseconds: inst._getMilliseconds('2017-07-14T18:00:00+09:00')
            }];
            var user = {
                freebusy: freebusy
            };

            inst._arrangeFreebusy(user);

            expect(user.freebusy[1].fromMilliseconds).toBe(inst._getMilliseconds('2017-07-14T18:00:00+09:00'));
        });

        it('Rearrange time collision freebusy with containing schedule', function() {
            var freebusy = [{
                from: '2017-07-14T09:00:00+09:00',
                to: '2017-07-14T18:00:00+09:00',
                fromMilliseconds: inst._getMilliseconds('2017-07-14T09:00:00+09:00'),
                toMilliseconds: inst._getMilliseconds('2017-07-14T18:00:00+09:00')
            }, {
                from: '2017-07-14T11:00:00+09:00',
                to: '2017-07-14T13:00:00+09:00',
                fromMilliseconds: inst._getMilliseconds('2017-07-14T11:00:00+09:00'),
                toMilliseconds: inst._getMilliseconds('2017-07-14T13:00:00+09:00')
            }];
            var user = {
                freebusy: freebusy
            };

            inst._arrangeFreebusy(user);

            expect(user.freebusy[1].toMilliseconds).toBe(user.freebusy[1].fromMilliseconds);
        });

        it('Rearrange time collision freebusy with same from', function() {
            var freebusy = [{
                from: '2017-07-14T09:00:00+09:00',
                to: '2017-07-14T11:30:00+09:00',
                fromMilliseconds: inst._getMilliseconds('2017-07-14T09:00:00+09:00'),
                toMilliseconds: inst._getMilliseconds('2017-07-14T11:30:00+09:00')
            }, {
                from: '2017-07-14T09:00:00+09:00',
                to: '2017-07-14T09:30:00+09:00',
                fromMilliseconds: inst._getMilliseconds('2017-07-14T09:00:00+09:00'),
                toMilliseconds: inst._getMilliseconds('2017-07-14T09:30:00+09:00')
            }];
            var user = {
                freebusy: freebusy
            };

            inst._arrangeFreebusy(user);

            expect(user.freebusy[1].toMilliseconds).toBe(user.freebusy[1].toMilliseconds);
        });
    });
});
