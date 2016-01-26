describe('handler:month/guide', function() {
    var undef = (function() {})(),
        common = ne.dooray.calendar.common,
        MonthGuide = ne.dooray.calendar.MonthGuide,
        proto = MonthGuide.prototype,
        mockInst,
        expected,
        actual;

    it('_getOriginWeekIndicate() should calc indicate properly.', function() {
        mockInst = {
            days: 5,
            ratio: function(v) {
                return common.ratio(5, 100, v);
            }
        };

        // 1, 1 에서 2, 2 로 드래그 시 드래그 시작 주 의 가이드 엘리먼트 계산
        expected = {
            left: 20,
            width: 80,
            exceedL: undef,
            exceedR: true
        };
        actual = proto._getOriginWeekIndicate.call(mockInst, 1, 1, 2, 2);
        expect(actual).toEqual(expected);

        // 2,3 ~ 5,3 드래그 시 계산
        expected = {
            left: 40,
            width: 80,
            exceedL: undef,
            exceedR: undef
        };
        actual = proto._getOriginWeekIndicate.call(mockInst, 2, 3, 5, 3);
        expect(actual).toEqual(expected);

        // 2,3 ~ 1,0
        expected = {
            left: 0,
            width: 60,
            exceedL: true,
            exceedR: undef
        };
        actual = proto._getOriginWeekIndicate.call(mockInst, 2, 3, 1, 0);
        expect(actual).toEqual(expected);
    });

    it('_getCurrentWeekIndicate() should calc indicate properly.', function() {
        mockInst = {
            days: 5,
            ratio: function(v) {
                return common.ratio(5, 100, v);
            }
        };

        // x,2 ~ 1,4 드래그 시 마우스 커서가 위치한 주 의 가이드 엘리먼트 계산
        expected = {
            left: 0,
            width: 40,
            exceedL: true,
            exceedR: undef 
        };
        actual = proto._getCurrentWeekIndicate.call(mockInst, 2, 1, 4);
        expect(actual).toEqual(expected);

        // x,4 ~ 3,2
        expected = {
            left: 60,
            width: 40,
            exceedL: undef,
            exceedR: true
        };
        actual = proto._getCurrentWeekIndicate.call(mockInst, 4, 3, 2);
        expect(actual).toEqual(expected);
    });

    describe('update()', function() {
        beforeEach(function() {
            spyOn(ne.dooray.calendar.domutil, 'remove');
        });

        it('should delete unnecessary guide element before start guide effect.', function() {
            mockInst = jasmine.createSpyObj('month/guide', [
                '_getGuideElement',
                '_getOriginWeekIndicate',
                '_getCurrentWeekIndicate',
                '_getContainWeekIndicate',
                '_updateGuides'
            ]);

            mockInst.startIndex = [1, 1];
            mockInst.guideElements = {
                0: true,
                1: true
            };

            proto.update.call(mockInst, 2, 2);

            expect(mockInst.guideElements).toEqual({
                1: true
            });
        });
    });

    describe('_getIndexByDate()', function() {
        var w1 = {
                options: {
                    renderStartDate: '2015-12-27',
                    renderEndDate: '2016-01-02'
                }
            },
            w2 = {
                options: {
                    renderStartDate: '2016-01-03',
                    renderEndDate: '2016-01-09'
                }
            },
            mockInst,
            date;

        beforeEach(function() {
            mockInst = {
                weeks: [w1, w2]
            };
        });

        it('should cal x, y index by date properly.', function() {
            date = new Date('2015-12-29T09:30:00+09:00');
            expect(proto._getIndexByDate.call(mockInst, date)).toEqual([2, 0]);

            date = new Date('2016-01-06T00:00:00+09:00');
            expect(proto._getIndexByDate.call(mockInst, date)).toEqual([3, 1]);
        });

        it('should return undef when supplied date is not render range of view.', function() {
            date = new Date('2015-01-01T09:30:00+09:00');
            expect(proto._getIndexByDate.call(mockInst, date)).toBeUndefined();
        });
    });
});

