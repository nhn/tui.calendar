var TaskView = require('view/week/taskview');
var datetime = require('common/datetime');

describe('week:view/TaskView', function() {
    var mockInst;

    beforeEach(function() {
        mockInst = {
            options: {
                lineHeight: 12,
                renderStartDate: '2015-05-01',
                renderEndDate: '2015-05-02'
            }
        };
    });

    describe('_getBaseViewModel()', function() {
        it('일정이 없어도 렌더 일자에 대한 정보는 반환한다.', function() {
            var actual = TaskView.prototype._getBaseViewModel.call(mockInst, {
                grids: datetime.getGridLeftAndWidth(2, 0, false),
                schedulesInDateRange: {
                    task: {
                        '2015-05-01': {morning: {length: 0}, lunch: {length: 0}, evening: {length: 0}, isToday: false},
                        '2015-05-02': {morning: {length: 0}, lunch: {length: 0}, evening: {length: 0}, isToday: false}
                    }
                }
            });
            var expected = {
                schedules: {
                    '2015-05-01': {morning: {length: 0}, lunch: {length: 0}, evening: {length: 0}, isToday: false, left: 0, width: 50},
                    '2015-05-02': {morning: {length: 0}, lunch: {length: 0}, evening: {length: 0}, isToday: false, left: 50, width: 50}
                },
                height: 0
            };

            expect(actual).toEqual(expected);
        });

        it('상위 뷰에서 업무일정 정보가 내려오면 템플릿에 맞게 schedules 프로퍼티에 넣는다.', function() {
            var viewModel = {
                grids: datetime.getGridLeftAndWidth(2, 0, false),
                schedulesInDateRange: {
                    task: {
                        '2015-05-02': {hello: {length: 2}}
                    }
                },
                range: datetime.range(
                    datetime.start(datetime.parse(mockInst.options.renderStartDate)),
                    datetime.end(datetime.parse(mockInst.options.renderEndDate)),
                    datetime.MILLISECONDS_PER_DAY
                )
            };
            var actual = TaskView.prototype._getBaseViewModel.call(mockInst, viewModel);
            var expected = {
                schedules: {
                    '2015-05-01': {
                        morning: {length: 0},
                        lunch: {length: 0},
                        evening: {length: 0},
                        isToday: false,
                        left: 0,
                        width: 50
                    },
                    '2015-05-02': {
                        hello: {length: 2},
                        isToday: false,
                        left: 50,
                        width: 50
                    }
                },
                height: 40
            };

            expect(actual).toEqual(expected);

            viewModel = {
                grids: datetime.getGridLeftAndWidth(2, 0, false),
                schedulesInDateRange: {
                    task: {
                        '2015-05-02': {hello: {length: 8}}
                    }
                },
                range: datetime.range(
                    datetime.start(datetime.parse(mockInst.options.renderStartDate)),
                    datetime.end(datetime.parse(mockInst.options.renderEndDate)),
                    datetime.MILLISECONDS_PER_DAY
                )
            };

            actual = TaskView.prototype._getBaseViewModel.call(mockInst, viewModel);
            expected = {
                schedules: {
                    '2015-05-01': {
                        morning: {length: 0},
                        lunch: {length: 0},
                        evening: {length: 0},
                        isToday: false,
                        left: 0,
                        width: 50
                    },
                    '2015-05-02': {
                        hello: {length: 8},
                        isToday: false,
                        left: 50,
                        width: 50
                    }
                },
                height: 160 // (아이템 수 8 * 12)px
            };

            expect(actual).toEqual(expected);
        });
    });
});
